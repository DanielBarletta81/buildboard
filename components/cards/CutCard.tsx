import React from 'react';
import { Cut } from '@/lib/types';

interface CutCardProps {
  cut: Cut;
}

export default function CutCard({ cut }: CutCardProps) {
  const difficultyColors = {
    easy: 'text-green-700 bg-green-50',
    medium: 'text-yellow-700 bg-yellow-50',
    hard: 'text-red-700 bg-red-50'
  };

  return (
    <div className="bg-fog border border-slate/30 rounded-lg p-4 mb-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-ink text-lg leading-tight flex-1">
          {cut.name}
        </h3>
        <span className="text-cedar font-mono text-sm ml-2">
          ×{cut.quantity}
        </span>
      </div>

      <div className="flex gap-2 mb-3">
        <span className="inline-block px-2 py-1 bg-slate/10 rounded text-slate text-xs font-medium">
          {cut.material}
        </span>
        {cut.difficulty && (
          <span className={`inline-block px-2 py-1 rounded text-xs font-medium ${difficultyColors[cut.difficulty]}`}>
            {cut.difficulty}
          </span>
        )}
      </div>

      <div className="bg-ink/5 rounded p-2 mb-3 font-mono text-sm">
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

      <p className="text-sm text-ink/90 mb-2 leading-relaxed">
        <span className="font-medium text-cedar">Purpose:</span> {cut.purpose}
      </p>

      {cut.instructions && (
        <p className="text-xs text-ink/70 mb-2 leading-relaxed border-l-2 border-harbor pl-2">
          {cut.instructions}
        </p>
      )}

      {cut.toolsNeeded && cut.toolsNeeded.length > 0 && (
        <div className="text-xs text-slate mt-2 pt-2 border-t border-harbor/20">
          🔨 Tools: {cut.toolsNeeded.join(', ')}
        </div>
      )}

      {cut.tags && cut.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3">
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
