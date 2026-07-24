import type { CollectionEntry } from 'astro:content';

interface ComparisonTableProps {
  comparison: CollectionEntry<'comparisons'>;
}

export default function ComparisonTable({ comparison }: ComparisonTableProps) {
  const toolA = comparison.data.toolA;
  const toolB = comparison.data.toolB;
  const toolAName = comparison.data.toolAName || toolA;
  const toolBName = comparison.data.toolBName || toolB;
  
  return (
    <div className="space-y-6">
      {/* Verdict Section */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
        <h3 className="text-lg font-bold text-blue-900 mb-2">Verdict</h3>
        <p className="text-blue-800">{comparison.data.verdict}</p>
      </div>
      
      {/* Feature Comparison Table */}
      <div className="overflow-x-auto">
        <table className="min-w-full border border-gray-200 rounded-lg overflow-hidden">
          <thead className="bg-gray-50">
            <tr>
              <th className="border px-4 py-2 text-left font-medium text-gray-700">Feature</th>
              <th className="border px-4 py-2 text-center font-medium text-gray-700">{toolAName}</th>
              <th className="border px-4 py-2 text-center font-medium text-gray-700">{toolBName}</th>
            </tr>
          </thead>
          <tbody>
            {comparison.data.features.map((feature, index) => (
              <tr 
                key={feature.name} 
                className={index % 2 === 0 ? 'bg-white' : 'bg-gray-50'}
              >
                <td className="border px-4 py-2 text-sm font-medium text-gray-900">
                  {feature.name}
                </td>
                <td className="border px-4 py-2 text-center text-sm">
                  {typeof feature.valA === 'boolean' ? (
                    feature.valA ? (
                      <span className="text-green-600 font-bold">✓</span>
                    ) : (
                      <span className="text-red-600">✗</span>
                    )
                  ) : (
                    <span className="text-gray-700">{feature.valA}</span>
                  )}
                </td>
                <td className="border px-4 py-2 text-center text-sm">
                  {typeof feature.valB === 'boolean' ? (
                    feature.valB ? (
                      <span className="text-green-600 font-bold">✓</span>
                    ) : (
                      <span className="text-red-600">✗</span>
                    )
                  ) : (
                    <span className="text-gray-700">{feature.valB}</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Recommendation */}
      <div className="mt-6">
        <h4 className="font-bold mb-2">Which should you choose?</h4>
        <p className="text-gray-700">
          {toolAName} is ideal for teams that need <strong>self-hosting</strong> and <strong>unlimited executions</strong>.
          {toolBName} is better for <strong>simplicity</strong> and <strong>non-technical users</strong>.
        </p>
      </div>
    </div>
  );
}