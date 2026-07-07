import React from 'react';
import { Cut, CardState } from '@/lib/types';

interface CutCardProps {
  cut: Cut;
  cardState: CardState;
  onToggleComplete: (cardId: string) => void;
}

export default function CutCard({ cut, cardState, onToggleComplete }: CutCardProps) {
  const difficultyColors = {
    easy: 'text-green-700 bg-green-50',
    medium: 'text-yellow-700 bg-yellow-50',
    hard: 'text-red-700 bg-red-50'
  };

  return (
    <div className={`bg-fog border rounded-lg p-4 mb-6 hover:shadow-lg transition-all ${
      cardState.completed ? 'border-green-500 border-2' : 'border-slate/30'
    }`}>
      <div className="flex items-start gap-3 mb-2">
        <button
          onClick={() => onToggleComplete(cut.id)}
          className={`flex-shrink-0 w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
            cardState.completed
              ? 'bg-green-500 border-green-500'
              : 'border-harbor/40 hover:border-slate'
          }`}
          title={cardState.completed ? 'Mark as incomplete' : 'Mark as complete'}
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
          {cut.name}
        </h3>
        <span className="text-cedar font-mono text-sm ml-2">
          ×{cut.quantity}
        </span>
      </div>

      <div className="flex gap-2 mb-3 ml-8">
        <span className="inline-block px-2 py-1 bg-slate/10 rounded text-slate text-xs font-medium">
          {cut.material}
        </span>
        {cut.difficulty && (
          <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${difficultyColors[cut.difficulty]}`}>
            {cut.difficulty}
          </span>
        )}
      </div>

      <div className="bg-ink/5 rounded p-2 mb-3 font-mono text-sm ml-8">
        {cut.dimensions.length && (
          <div>Length: <span className="font-semibold">{cut.dimensions.length}{cut.dimensions.unit}</span></div>
        )}
        {cut.dimensions.width && (
          <div>Width: <span className="font-semibold">{cut.dimensions.width}{cut.dimensions.unit}</span></div>
        )}
        {cut.angle && (
          <div className="text-cedar">Angle: <span className="font-semibold">{cut.angle}°</span></div>
        )}
      </div>

      <p className="text-sm text-ink/90 mb-2 leading-relaxed ml-8">
        <span className="font-medium text-cedar">Purpose:</span> {cut.purpose}
      </p>

      {cut.instructions && (
        <p className="text-xs text-ink/70 mb-2 leading-relaxed border-l-2 border-harbor pl-2 ml-8">
          {cut.instructions}
        </p>
      )}

      {cut.toolsNeeded && cut.toolsNeeded.length > 0 && (
        <div className="text-xs text-slate mt-2 pt-2 border-t border-harbor/20 ml-8">
          🔨 Tools: {cut.toolsNeeded.join(', ')}
        </div>
      )}

      {cut.tags && cut.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3 ml-8">
          {cut.tags.slice(0, 3).map(tag => (
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
