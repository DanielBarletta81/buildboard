import React from 'react';
import { InstructionStep, CardState } from '@/lib/types';

interface StepCardProps {
  step: InstructionStep;
  cardState: CardState;
  onToggleComplete: (cardId: string) => void;
}

export default function StepCard({ step, cardState, onToggleComplete }: StepCardProps) {
  const difficultyColors = {
    easy: 'text-green-700 bg-green-50',
    medium: 'text-yellow-700 bg-yellow-50',
    hard: 'text-red-700 bg-red-50'
  };

  return (
    <div className={`bg-fog border-2 rounded-lg p-5 mb-6 hover:shadow-xl transition-all ${
      cardState.completed ? 'border-green-500' : 'border-brass/30'
    }`}>
      <div className="flex items-start gap-3 mb-3">
        {/* Completion Checkbox */}
        <button
          onClick={() => onToggleComplete(step.id)}
          className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center font-bold text-lg transition-all ${
            cardState.completed
              ? 'bg-green-500 text-white'
              : 'bg-brass text-white hover:bg-brass/80'
          }`}
          title={cardState.completed ? 'Mark as incomplete' : 'Mark as complete'}
        >
          {cardState.completed ? '✓' : step.stepNumber}
        </button>
        
        <div className="flex-1">
          <h3 className={`font-bold text-ink text-xl leading-tight mb-1 ${
            cardState.completed ? 'line-through opacity-60' : ''
          }`}>
            {step.title}
          </h3>
          <div className="flex gap-2 flex-wrap">
            {step.estimatedTime && (
              <span className="text-xs px-2 py-1 bg-slate/10 text-slate rounded">
                ⏱️ {step.estimatedTime}
              </span>
            )}
            {step.difficulty && (
              <span className={`text-xs px-2 py-1 rounded font-medium ${difficultyColors[step.difficulty]}`}>
                {step.difficulty}
              </span>
            )}
            {cardState.completed && cardState.completedAt && (
              <span className="text-xs px-2 py-1 bg-green-50 text-green-700 rounded">
                ✓ {new Date(cardState.completedAt).toLocaleDateString()}
              </span>
            )}
          </div>
        </div>
      </div>

      <p className="text-sm text-ink leading-relaxed mb-4">
        {step.description}
      </p>

      {step.tips && step.tips.length > 0 && (
        <div className="bg-brass/10 border-l-4 border-brass rounded p-3 mb-3">
          <div className="font-semibold text-brass text-sm mb-1">💡 Pro Tips:</div>
          <ul className="space-y-1">
            {step.tips.map((tip, idx) => (
              <li key={idx} className="text-xs text-ink/80 leading-relaxed">
                • {tip}
              </li>
            ))}
          </ul>
        </div>
      )}

      {step.checkpoints && step.checkpoints.length > 0 && (
        <div className="bg-green-50 border-l-4 border-green-500 rounded p-3 mb-3">
          <div className="font-semibold text-green-700 text-sm mb-1">✓ Checkpoints:</div>
          <ul className="space-y-1">
            {step.checkpoints.map((checkpoint, idx) => (
              <li key={idx} className="text-xs text-ink/80 leading-relaxed">
                • {checkpoint}
              </li>
            ))}
          </ul>
        </div>
      )}

      <div className="grid grid-cols-1 gap-2 pt-3 border-t border-harbor/20 text-xs">
        {step.materialsNeeded && step.materialsNeeded.length > 0 && (
          <div>
            <span className="font-semibold text-cedar">📦 Materials:</span>
            <span className="text-ink/70 ml-1">{step.materialsNeeded.length} items</span>
          </div>
        )}
        {step.toolsNeeded && step.toolsNeeded.length > 0 && (
          <div>
            <span className="font-semibold text-slate">🔨 Tools:</span>
            <span className="text-ink/70 ml-1">{step.toolsNeeded.length} tools</span>
          </div>
        )}
        {step.safetyNotes && step.safetyNotes.length > 0 && (
          <div>
            <span className="font-semibold text-red-600">⚠️ Safety:</span>
            <span className="text-ink/70 ml-1">{step.safetyNotes.length} notes</span>
          </div>
        )}
      </div>

      {step.tags && step.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3">
          {step.tags.map(tag => (
            <span 
              key={tag} 
              className="text-xs px-2 py-0.5 bg-brass/10 text-brass rounded"
            >
              {tag}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
  
