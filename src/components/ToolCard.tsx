import type { CollectionEntry } from 'astro:content';

interface ToolCardProps {
  tool: CollectionEntry<'tools'>;
  compact?: boolean;
}

export default function ToolCard({ tool, compact = false }: ToolCardProps) {
  return (
    <div className="border border-gray-200 rounded-lg p-4 hover:shadow-lg transition-shadow bg-white">
      <div className="flex items-start justify-between mb-2">
        <h3 className="text-lg font-bold text-gray-900">{tool.data.name}</h3>
        {tool.data.emoji && <span className="text-2xl">{tool.data.emoji}</span>}
      </div>
      
      {!compact && (
        <p className="text-gray-600 mb-3 line-clamp-3">
          {tool.data.description}
        </p>
      )}
      
      {tool.data.features && tool.data.features.length > 0 && (
        <div className="flex flex-wrap gap-1 mb-3">
          {tool.data.features.slice(0, compact ? 2 : 3).map((feature) => (
            <span 
              key={feature} 
              className="text-xs bg-gray-100 px-2 py-1 rounded text-gray-700"
            >
              {feature}
            </span>
          ))}
        </div>
      )}
      
      <div className="flex items-center justify-between text-sm">
        <span className="text-gray-500">{tool.data.category}</span>
        <a 
          href={`/tools/${tool.id}/`}
          className="text-blue-600 hover:text-blue-700 font-medium text-sm"
        >
          Details →
        </a>
      </div>
      
      {tool.data.lastVerified && (
        <div className="text-xs text-gray-400 mt-2">
          Last verified: {new Date(tool.data.lastVerified).toLocaleDateString()}
        </div>
      )}
    </div>
  );
}