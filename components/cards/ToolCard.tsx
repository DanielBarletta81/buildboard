import React from 'react';
import { Tool, CardState } from '@/lib/types';

interface ToolCardProps {
  tool: Tool;
  cardState: CardState;
  onToggleComplete: (cardId: string) => void;
}

export default function ToolCard({ tool, cardState, onToggleComplete }: ToolCardProps) {
  const safetyColors = {
    low: 'text-green-700 bg-green-50',
    medium: 'text-yellow-700 bg-yellow-50',
    high: 'text-red-700 bg-red-50'
  };

  return (
    <div className={`bg-fog border rounded-lg p-4 mb-6 hover:shadow-lg transition-all ${
      cardState.completed ? 'border-green-500 border-2' : 'border-harbor/20'
    }`}>
      <div className="flex items-start gap-3 mb-2">
        <button
          onClick={() => onToggleComplete(tool.id)}
          className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
            cardState.completed
              ? 'bg-green-500 border-green-500'
              : 'border-harbor/40 hover:border-slate'
          }`}
          title={cardState.completed ? 'Mark as checked' : 'Mark as checked'}
        >
          {cardState.completed && (
            <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
            </svg>
          )}
        </button>
        
        <h3 className={`font-semibold text-ink text-lg leading-tight flex-1 ${
          cardState.completed ? 'line-through opacity-60' : ''
        }`}>
          {tool.name}
        </h3>
        {tool.required && (
          <span className="text-xs font-semibold px-2 py-1 bg-cedar text-white rounded ml-2">
            REQUIRED
          </span>
        )}
      </div>

      <div className="flex gap-2 mb-3 ml-8">
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
        <p className="text-sm text-ink/80 mb-2 leading-relaxed ml-8">
          {tool.specifications}
        </p>
      )}

      {tool.alternative && (
        <div className="text-xs text-slate bg-slate/5 rounded p-2 mb-2 ml-8">
          <span className="font-medium">Alternative:</span> {tool.alternative}
        </div>
      )}

      {tool.notes && (
        <p className="text-sm text-ink/90 mt-2 pt-2 border-t border-harbor/20 leading-relaxed ml-8">
          💡 {tool.notes}
        </p>
      )}

      {tool.tags && tool.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3 ml-8">
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
