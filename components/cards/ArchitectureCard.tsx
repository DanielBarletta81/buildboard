import React from 'react';
import { ArchitectureNote } from '@/lib/types';

interface ArchitectureCardProps {
  note: ArchitectureNote;
}

export default function ArchitectureCard({ note }: ArchitectureCardProps) {
  const categoryIcons: Record<string, string> = {
    dimensions: '📐',
    design: '🎨',
    regulations: '📋',
    foundation: '🏗️',
    default: '📝'
  };

  const icon = categoryIcons[note.category] || categoryIcons.default;

  return (
    <div className="bg-fog border border-ink/20 rounded-lg p-4 mb-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start gap-2 mb-2">
        <span className="text-2xl">{icon}</span>
        <div className="flex-1">
          <div className="text-xs text-harbor font-medium mb-1 uppercase tracking-wide">
            {note.category}
          </div>
          <h3 className="font-semibold text-ink text-lg leading-tight">
            {note.title}
          </h3>
        </div>
      </div>

      <p className="text-sm text-ink/80 leading-relaxed mb-3">
        {note.description}
      </p>

      {note.specifications && (
        <div className="bg-ink/5 rounded p-2 mb-2 text-xs font-mono text-ink/70">
          {note.specifications}
        </div>
      )}

      {note.tags && note.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3">
          {note.tags.map(tag => (
            <span 
              key={tag} 
              className="text-xs px-2 py-0.5 bg-harbor/10 text-harbor rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
