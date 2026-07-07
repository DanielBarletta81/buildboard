import React, { useState } from 'react';
import { Material, CardState } from '@/lib/types';

interface MaterialCardProps {
  material: Material;
  cardState: CardState;
  onToggleComplete: (cardId: string) => void;
  onToggleShoppingList: (cardId: string) => void;
  onUpdateActualCost: (cardId: string, cost: number) => void;
}

export default function MaterialCard({ 
  material, 
  cardState,
  onToggleComplete,
  onToggleShoppingList,
  onUpdateActualCost,
}: MaterialCardProps) {
  const [isEditingCost, setIsEditingCost] = useState(false);
  const [tempCost, setTempCost] = useState(cardState.actualCost?.toString() || '');

  const handleCostSave = () => {
    const cost = parseFloat(tempCost) || 0;
    onUpdateActualCost(material.id, cost);
    setIsEditingCost(false);
  };

  return (
    <div className={`bg-fog border rounded-lg p-4 mb-6 hover:shadow-lg transition-all ${
      cardState.completed ? 'border-green-500 border-2' : 'border-harbor/20'
    }`}>
      {/* Header with Checkbox */}
      <div className="flex items-start gap-3 mb-2">
        <button
          onClick={() => onToggleComplete(material.id)}
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
          {material.name}
        </h3>
        
        <span className="text-cedar font-mono text-sm ml-2">
          {material.quantity} {material.quantityUnit}
        </span>
      </div>
      
      <div className="text-harbor text-sm mb-2 ml-8">
        <span className="inline-block px-2 py-1 bg-cedar/10 rounded text-cedar font-medium">
          {material.category}
        </span>
      </div>

      {material.dimensions && (
        <div className="text-sm text-ink/70 mb-2 font-mono ml-8">
          {material.dimensions.length && `${material.dimensions.length}"`}
          {material.dimensions.width && ` × ${material.dimensions.width}"`}
          {material.dimensions.thickness && ` × ${material.dimensions.thickness}"`}
          {material.dimensions.height && ` × ${material.dimensions.height}"`}
        </div>
      )}

      {material.specifications && (
        <p className="text-sm text-ink/80 mb-3 leading-relaxed ml-8">
          {material.specifications}
        </p>
      )}

      {/* Cost Tracking */}
      <div className="flex items-center justify-between pt-2 border-t border-harbor/20 ml-8">
        {isEditingCost ? (
          <div className="flex items-center gap-2">
            <span className="text-xs text-harbor">Actual:</span>
            <input
              type="number"
              step="0.01"
              value={tempCost}
              onChange={(e) => setTempCost(e.target.value)}
              onBlur={handleCostSave}
              onKeyDown={(e) => e.key === 'Enter' && handleCostSave()}
              className="w-20 px-2 py-1 text-sm border border-harbor/30 rounded focus:border-slate focus:outline-none"
              autoFocus
            />
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <span className="text-brass font-semibold">
              {material.estimatedCost ? `~$${material.estimatedCost.toFixed(2)}` : 'Price TBD'}
            </span>
            {cardState.actualCost !== undefined && (
              <span className="text-xs text-slate">
                (Actual: ${cardState.actualCost.toFixed(2)})
              </span>
            )}
            <button
              onClick={() => {
                setTempCost(cardState.actualCost?.toString() || material.estimatedCost?.toString() || '');
                setIsEditingCost(true);
              }}
              className="text-xs text-harbor hover:text-slate underline"
            >
              {cardState.actualCost !== undefined ? 'edit' : 'track'}
            </button>
          </div>
        )}
        {material.supplier && (
          <span className="text-xs text-harbor">{material.supplier}</span>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-2 mt-3 ml-8">
        <button
          onClick={() => onToggleShoppingList(material.id)}
          className={`flex-1 px-3 py-1.5 text-xs font-medium rounded transition-all ${
            cardState.inShoppingList
              ? 'bg-brass text-white'
              : 'bg-brass/10 text-brass hover:bg-brass/20'
          }`}
        >
          {cardState.inShoppingList ? '✓ In Shopping List' : '+ Add to List'}
        </button>
        
        {material.productLinks && material.productLinks.length > 0 && (
          <a
            href={material.productLinks[0].url}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1.5 text-xs font-medium bg-slate/10 text-slate hover:bg-slate/20 rounded transition-all"
          >
            🔗 View
          </a>
        )}
      </div>

      {material.notes && (
        <p className="text-xs text-slate italic mt-2 pt-2 border-t border-harbor/10 ml-8">
          {material.notes}
        </p>
      )}

      {material.tags && material.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3 ml-8">
          {material.tags.slice(0, 3).map(tag => (
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
