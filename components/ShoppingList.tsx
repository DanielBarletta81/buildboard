'use client';

import React from 'react';
import { Material, Card } from '@/lib/types';

interface ShoppingListProps {
  shoppingList: string[];
  allCards: Card[];
  onClose: () => void;
  onRemoveItem: (cardId: string) => void;
}

export default function ShoppingList({
  shoppingList,
  allCards,
  onClose,
  onRemoveItem,
}: ShoppingListProps) {
  const shoppingItems = shoppingList
    .map(id => allCards.find(card => card.id === id))
    .filter(card => card && card.type === 'material') as Material[];

  const totalCost = shoppingItems.reduce(
    (sum, item) => sum + (item.estimatedCost || 0),
    0
  );

  const groupedBySupplier = shoppingItems.reduce((acc, item) => {
    const supplier = item.supplier || 'Other';
    if (!acc[supplier]) acc[supplier] = [];
    acc[supplier].push(item);
    return acc;
  }, {} as Record<string, Material[]>);

  const exportList = () => {
    const text = shoppingItems
      .map(item => {
        const dims = item.dimensions
          ? `${item.dimensions.length || ''}×${item.dimensions.width || ''}×${item.dimensions.thickness || ''}`
          : '';
        return `• ${item.name} - ${item.quantity} ${item.quantityUnit} ${dims} - ${item.supplier || 'N/A'} - $${item.estimatedCost?.toFixed(2) || '0.00'}`;
      })
      .join('\n');
    
    navigator.clipboard.writeText(text);
    alert('Shopping list copied to clipboard!');
  };

  return (
    <div className="fixed inset-0 bg-ink/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-paper rounded-xl shadow-2xl max-w-2xl w-full max-h-[80vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="bg-brass text-white px-6 py-4 flex items-center justify-between">
          <div>
            <h2 className="text-2xl font-bold">🛒 Shopping List</h2>
            <p className="text-brass/80 text-sm">
              {shoppingItems.length} {shoppingItems.length === 1 ? 'item' : 'items'} • Est. ${totalCost.toFixed(2)}
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 rounded-lg p-2 transition-colors"
          >
            <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          {shoppingItems.length === 0 ? (
            <div className="text-center py-12 text-harbor">
              <p className="text-lg mb-2">Your shopping list is empty</p>
              <p className="text-sm">Add materials from the Materials board to get started!</p>
            </div>
          ) : (
            <div className="space-y-6">
              {Object.entries(groupedBySupplier).map(([supplier, items]) => (
                <div key={supplier}>
                  <h3 className="font-bold text-ink mb-3 flex items-center gap-2">
                    <span className="text-lg">{supplier}</span>
                    <span className="text-xs text-harbor font-normal">
                      ({items.length} {items.length === 1 ? 'item' : 'items'})
                    </span>
                  </h3>
                  <div className="space-y-2">
                    {items.map(item => (
                      <div
                        key={item.id}
                        className="bg-fog border border-harbor/20 rounded-lg p-3 flex items-start gap-3 hover:shadow-md transition-shadow"
                      >
                        <button
                          onClick={() => onRemoveItem(item.id)}
                          className="flex-shrink-0 w-5 h-5 bg-red-500 hover:bg-red-600 text-white rounded flex items-center justify-center text-xs transition-colors"
                          title="Remove from list"
                        >
                          ×
                        </button>
                        <div className="flex-1">
                          <div className="flex items-start justify-between gap-2">
                            <div>
                              <h4 className="font-semibold text-ink">{item.name}</h4>
                              <p className="text-sm text-harbor">
                                {item.quantity} {item.quantityUnit}
                                {item.dimensions && (
                                  <span className="ml-2 font-mono text-xs">
                                    {item.dimensions.length && `${item.dimensions.length}"`}
                                    {item.dimensions.width && ` × ${item.dimensions.width}"`}
                                    {item.dimensions.thickness && ` × ${item.dimensions.thickness}"`}
                                  </span>
                                )}
                              </p>
                            </div>
                            <span className="text-brass font-semibold text-sm whitespace-nowrap">
                              ${item.estimatedCost?.toFixed(2) || '0.00'}
                            </span>
                          </div>
                          {item.specifications && (
                            <p className="text-xs text-ink/70 mt-1">{item.specifications}</p>
                          )}
                          {item.productLinks && item.productLinks.length > 0 && (
                            <a
                              href={item.productLinks[0].url}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs text-slate hover:text-slate/80 underline mt-1 inline-block"
                            >
                              View product →
                            </a>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer Actions */}
        {shoppingItems.length > 0 && (
          <div className="border-t border-harbor/20 px-6 py-4 bg-fog">
            <div className="flex items-center justify-between mb-3">
              <span className="font-semibold text-ink">Estimated Total:</span>
              <span className="text-2xl font-bold text-brass">${totalCost.toFixed(2)}</span>
            </div>
            <div className="flex gap-2">
              <button
                onClick={exportList}
                className="flex-1 px-4 py-2 bg-slate text-white rounded-lg hover:bg-slate/90 transition-colors font-medium"
              >
                📋 Copy List
              </button>
              <button
                onClick={() => {
                  const firstItem = shoppingItems[0];
                  if (firstItem?.productLinks?.[0]) {
                    window.open(firstItem.productLinks[0].url, '_blank');
                  } else if (firstItem?.supplier === 'Home Depot') {
                    window.open('https://www.homedepot.com', '_blank');
                  } else if (firstItem?.supplier === 'Lowes') {
                    window.open('https://www.lowes.com', '_blank');
                  }
                }}
                className="flex-1 px-4 py-2 bg-brass text-white rounded-lg hover:bg-brass/90 transition-colors font-medium"
              >
                🛍️ Shop Now
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
