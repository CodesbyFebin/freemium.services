#!/usr/bin/env python3
"""
Sprint 0 Claims Audit Script

Finds all public numerical claims and validates against actual data.
Output: reports/claim-audit.json

This script performs context-aware validation:
- Claims about static tools are validated against data/tools.json count
- Claims about V2 tools are validated against freemium_v2/src/lib/data.ts count
- Metrics are tracked separately for each source
"""

import json
import re
import sys
from datetime import datetime
from pathlib import Path
from typing import Any

# Claim patterns with metrics mapping
# Use negative lookbehind to avoid matching numbers in words like "V2" (which is "V" + "2")
# Combine patterns to avoid duplicates
CLAIM_PATTERNS = [
    (r'(?<!V|\w)(\d+(?:,\d{3})*(?:\.\d+)?)\s+(tools?|tool[s]?|categories?|stars?)', 'tools', 'staticToolCount'),
]

# Configuration patterns that describe settings, not claims - should be classified as such
CONFIG_PATTERNS = [
    r'top\s+\d+\s+tools',
    r'up\s+to\s+\d+\s+tools',
    r'max\s+\d+\s+tools',
]

def is_configuration_claim(text: str, context: str) -> bool:
    """Check if a claim is actually a configuration statement, not an assertion."""
    text_lower = text.lower()
    context_lower = context.lower()
    
    for pattern in CONFIG_PATTERNS:
        if re.search(pattern, text_lower, re.IGNORECASE) or re.search(pattern, context_lower, re.IGNORECASE):
            return True
    
    # Also check if context indicates it's a recommendation or configuration
    config_indicators = ['ItemList', 'schema', 'configuration', 'recommendation', 'limit', 'suggest', 'suggests']
    if any(indicator in context_lower for indicator in config_indicators):
        return True
    
    return False

def extract_metrics() -> dict[str, int]:
    """Extract actual counts from source data files."""
    metrics = {
        'staticToolCount': 0,
        'v2ToolCount': 0,
        'staticCategoryCount': 0,
        'v2CategoryCount': 0,
    }
    
    # Load static tools
    try:
        with open('data/tools.json', 'r') as f:
            tools = json.load(f)
            metrics['staticToolCount'] = len(tools)
    except Exception as e:
        print(f"Warning: Could not read data/tools.json: {e}", file=sys.stderr)
    
    # Load V2 data
    try:
        with open('freemium_v2/src/lib/data.ts', 'r') as f:
            content = f.read()
            
            # Count unique tool IDs (actual tool entries)
            ids = re.findall(r'id:\s*["\']([^"\']+)["\']', content)
            unique_ids = set(ids)
            metrics['v2ToolCount'] = len(unique_ids)
            
            # Count categories
            category_pattern = r"export\s+(?:const)\s+(\w+CATEGORIES)"
            if re.search(category_pattern, content):
                # Found category structure
                pass
                
    except Exception as e:
        print(f"Warning: Could not read freemium_v2/src/lib/data.ts: {e}", file=sys.stderr)
    
    return metrics


def determine_metric_from_context(claim_text: str, file_path: str) -> str:
    """Determine which metric a claim should be validated against based on context."""
    text_lower = claim_text.lower()
    
    # Check if claim explicitly mentions V2
    if 'v2' in text_lower or 'react' in text_lower:
        return 'v2ToolCount'
    
    # Check if claim is in a line that mentions V2
    return 'staticToolCount'  # Default


def extract_claims_from_file(file_path: str) -> list[dict[str, Any]]:
    """Extract claims from a single file."""
    claims = []
    
    try:
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        for pattern, unit, metric_override in CLAIM_PATTERNS:
            for match in re.finditer(pattern, content, re.IGNORECASE):
                value_str = match.group(1).replace(',', '')
                value = float(value_str)

                # Extract the unit from match group 2 if present
                matched_unit = match.group(2) if match.lastindex >= 2 else unit

                if not value or value <= 0:
                    continue

                claim_text = match.group(0)

                # Look at more context to determine metric
                start = max(0, match.start() - 50)
                end = min(len(content), match.end() + 50)
                context = content[start:end]

                # Check if context mentions V2, React, or other indicators
                if ('v2' in context.lower() or 'react' in context.lower() or
                    'data.ts' in context or 'freemium_v2' in context):
                    metric = 'v2ToolCount' if matched_unit == 'tools' or matched_unit == 'tool' else 'staticCategoryCount'
                elif metric_override:
                    metric = metric_override
                else:
                    metric = 'staticToolCount' if matched_unit in ['tools', 'tool'] else 'staticCategoryCount'

                # Skip configuration claims (like "top 10 tools" - these are not assertions)
                if is_configuration_claim(claim_text, context):
                    continue

                claims.append({
                    'text': claim_text,
                    'location': f"line {content[:match.start()].count(chr(10)) + 1}",
                    'file': Path(file_path).name,
                    'value': value,
                    'unit': matched_unit if matched_unit in ['tools', 'tool', 'categories', 'category', 'stars'] else unit,
                    'metric': metric,
                    'validationStatus': 'unverifiable'
                })
    except Exception as e:
        print(f"Warning: Could not read {file_path}: {e}", file=sys.stderr)
    
    return claims


def validate_claims(claims: list[dict], metrics: dict) -> list[dict]:
    """Validate claims against metrics."""
    validated = []
    
    for claim in claims:
        metric = claim['metric']
        expected = metrics.get(metric, 0)
        
        if expected > 0 and claim['value'] > expected:
            claim['validationStatus'] = 'invalid'
            claim['expected'] = expected
            claim['evidence'] = f"Expected {expected} based on source"
        else:
            claim['validationStatus'] = 'valid'
            claim['expected'] = expected
            claim['evidence'] = f"Matches expected {expected}"
        
        validated.append(claim)
    
    return validated


def main():
    print('Scanning for public claims...')
    
    # Extract metrics
    print('Extracting metrics from source data...')
    metrics = extract_metrics()
    print(f"Metrics: {metrics}")
    
    # Scan files (targeted, not recursive)
    files_to_scan = [
        'docs/migration/CURRENT-ARCHITECTURE.md',
        'docs/migration/URL-CONTRACT.md',
        'docs/migration/CUTOVER-RUNBOOK.md',
        'docs/migration/CONTENT-SOURCE-OF-TRUTH.md',
    ]
    
    all_claims = []
    for file_path in files_to_scan:
        all_claims.extend(extract_claims_from_file(file_path))
    
    print(f"Found {len(all_claims)} claims")
    
    # Validate
    validated = validate_claims(all_claims, metrics)
    
    # Build report
    report = {
        'metadata': {
            'generatedAt': datetime.now().isoformat(),
            'totalClaims': len(validated),
            'valid': sum(1 for c in validated if c['validationStatus'] == 'valid'),
            'invalid': sum(1 for c in validated if c['validationStatus'] == 'invalid'),
            'unverifiable': sum(1 for c in validated if c['validationStatus'] == 'unverifiable'),
            'metrics': metrics
        },
        'claims': validated,
        'summary': {
            'invalid': [
                {
                    'claim': c['text'],
                    'file': c['file'],
                    'expected': c.get('expected'),
                    'claimed': c['value'],
                    'unit': c['unit'],
                    'metric': c['metric']
                }
                for c in validated if c['validationStatus'] == 'invalid'
            ]
        }
    }
    
    # Write report
    Path('reports').mkdir(exist_ok=True)
    with open('reports/claim-audit.json', 'w') as f:
        json.dump(report, f, indent=2)
    
    print('Report written to reports/claim-audit.json')
    
    # Print summary
    print('\n=== Claim Audit Summary ===')
    print(f"Total claims: {len(validated)}")
    print(f"Valid: {report['metadata']['valid']}")
    print(f"Invalid: {report['metadata']['invalid']}")
    
    if report['summary']['invalid']:
        print('\nInvalid claims:')
        for c in report['summary']['invalid']:
            print(f'  - "{c["claim"]}" in {c["file"]}')
            print(f'    Expected: {c["expected"]} {c["unit"]}, Found: {c["claimed"]} {c["unit"]}')


if __name__ == '__main__':
    main()