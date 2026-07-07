import React from 'react';
import { SafetyNote } from '@/lib/types';

interface SafetyCardProps {
  safetyNote: SafetyNote;
}

export default function SafetyCard({ safetyNote }: SafetyCardProps) {
  const severityConfig = {
    caution: {
      bg: 'bg-yellow-50',
      border: 'border-yellow-300',
      icon: '⚠️',
      label: 'CAUTION',
      labelColor: 'bg-yellow-600 text-white'
    },
    warning: {
      bg: 'bg-orange-50',
      border: 'border-orange-400',
      icon: '⚠️',
      label: 'WARNING',
      labelColor: 'bg-orange-600 text-white'
    },
    danger: {
      bg: 'bg-red-50',
      border: 'border-red-500',
      icon: '🛑',
      label: 'DANGER',
      labelColor: 'bg-red-700 text-white'
    }
  };

  const config = severityConfig[safetyNote.severity];

  return (
    <div className={`${config.bg} border-2 ${config.border} rounded-lg p-4 mb-6 hover:shadow-lg transition-shadow`}>
      <div className="flex items-start gap-3 mb-2">
        <span className="text-2xl">{config.icon}</span>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className={`text-xs font-bold px-2 py-1 rounded ${config.labelColor}`}>
              {config.label}
            </span>
            <span className="text-xs text-ink/60 font-medium">
              {safetyNote.category}
            </span>
          </div>
          <h3 className="font-bold text-ink text-lg leading-tight">
            {safetyNote.title}
          </h3>
        </div>
      </div>

      <p className="text-sm text-ink leading-relaxed mb-3 pl-11">
        {safetyNote.description}
      </p>

      {safetyNote.tags && safetyNote.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 pl-11">
          {safetyNote.tags.map(tag => (
            <span 
              key={tag} 
              className="text-xs px-2 py-0.5 bg-ink/10 text-ink rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
