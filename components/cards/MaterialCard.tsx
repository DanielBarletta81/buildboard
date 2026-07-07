import React from 'react';
import { Material } from '@/lib/types';

interface MaterialCardProps {
  material: Material;
}

export default function MaterialCard({ material }: MaterialCardProps) {
  return (
    <div className="bg-fog border border-harbor/20 rounded-lg p-4 mb-6 hover:shadow-lg transition-shadow">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-semibold text-ink text-lg leading-tight flex-1">
          {material.name}
        </h3>
        <span className="text-cedar font-mono text-sm ml-2">
          {material.quantity} {material.quantityUnit}
        </span>
      </div>
      
      <div className="text-harbor text-sm mb-2">
        <span className="inline-block px-2 py-1 bg-cedar/10 rounded text-cedar font-medium">
          {material.category}
        </span>
      </div>

      {material.dimensions && (
        <div className="text-sm text-ink/70 mb-2 font-mono">
          {material.dimensions.length && `${material.dimensions.length}"`}
          {material.dimensions.width && ` × ${material.dimensions.width}"`}
          {material.dimensions.thickness && ` × ${material.dimensions.thickness}"`}
          {material.dimensions.height && ` × ${material.dimensions.height}"`}
        </div>
      )}

      {material.specifications && (
        <p className="text-sm text-ink/80 mb-3 leading-relaxed">
          {material.specifications}
        </p>
      )}

      {material.estimatedCost && (
        <div className="flex items-center justify-between pt-2 border-t border-harbor/20">
          <span className="text-brass font-semibold">
            ${material.estimatedCost.toFixed(2)}
          </span>
          {material.supplier && (
            <span className="text-xs text-harbor">{material.supplier}</span>
          )}
        </div>
      )}

      {material.notes && (
        <p className="text-xs text-slate italic mt-2 pt-2 border-t border-harbor/10">
          {material.notes}
        </p>
      )}

      {material.tags && material.tags.length > 0 && (
        <div className="flex flex-wrap gap-1 mt-3">
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
