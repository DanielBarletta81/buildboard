import React from 'react';
import { Tool } from '@/lib/types';

interface ToolCardProps {
  tool: Tool;
}

export default function ToolCard({ tool }: ToolCardProps) {
  const safetyColors = {
    low: 'text-green-700 bg-green-50',
    medium: 'text-yellow-700 bg-yellow-50',
    high: 'text-red-700 bg-red-50'
  };

  return (
    <div className="bg-fog border border-harbor/20 rounded-lg p-4 mb-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-ink text-lg leading-tight flex-1">
          {tool.name}
        </h3>
        {tool.required && (
          <span className="text-xs font-semibold px-2 py-1 bg-cedar text-white rounded ml-2">
            REQUIRED
          </span>
        )}
      </div>

      <div className="flex gap-2 mb-3">
        <span className="inline-block px-2 py-1 bg-harbor/10 rounded text-harbor text-xs font-medium">
          {tool.category}
        </span>
        {tool.safetyRating && (
          <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${safetyColors[tool.safetyRating]}`}>
            {tool.safetyRating} risk
          </span>
        )}
      </div>

      {tool.specifications && (
        <p className="text-sm text-ink/80 mb-2 leading-relaxed">
          {tool.specifications}
        </p>
      )}

      {tool.alternative && (
        <div className="text-xs text-slate bg-slate/5 rounded p-2 mb-2">
          <span className="font-medium">Alternative:</span> {tool.alternative}
        </div>
      )}

      {tool.notes && (
        <p className="text-sm text-ink/90 mt-2 pt-2 border-t border-harbor/20 leading-relaxed">
          💡 {tool.notes}
        </p>
      )}

      {tool.tags && tool.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3">
          {tool.tags.slice(0, 3).map(tag => (
            <span 
              key={tag} 
              className="text-xs px-2 py-0.5 bg-slate/10 text-slate rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
