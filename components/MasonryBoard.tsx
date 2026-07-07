'use client';

import React from 'react';
import Masonry from 'react-masonry-css';
import { Board, Card, CardState } from '@/lib/types';
import MaterialCard from './cards/MaterialCard';
import CutCard from './cards/CutCard';
import ToolCard from './cards/ToolCard';
import SafetyCard from './cards/SafetyCard';
import StepCard from './cards/StepCard';
import ArchitectureCard from './cards/ArchitectureCard';

interface MasonryBoardProps {
  board: Board;
  searchQuery?: string;
  statusFilter?: 'all' | 'completed' | 'pending';
  getCardState: (cardId: string) => CardState;
  onToggleComplete: (cardId: string) => void;
  onToggleShoppingList: (cardId: string) => void;
  onUpdateActualCost: (cardId: string, cost: number) => void;
}

export default function MasonryBoard({ 
  board, 
  searchQuery,
  statusFilter = 'all',
  getCardState,
  onToggleComplete,
  onToggleShoppingList,
  onUpdateActualCost,
}: MasonryBoardProps) {
  const breakpointColumns = {
    default: 4,
    1536: 3,
    1024: 2,
    768: 1
  };

  // Filter cards based on search query and status
  const filteredCards = board.cards.filter(card => {
    // Search filter
    if (searchQuery) {
      const searchLower = searchQuery.toLowerCase();
      const cardData = JSON.stringify(card).toLowerCase();
      if (!cardData.includes(searchLower)) return false;
    }

    // Status filter
    if (statusFilter !== 'all') {
      const cardState = getCardState(card.id);
      if (statusFilter === 'completed' && !cardState.completed) return false;
      if (statusFilter === 'pending' && cardState.completed) return false;
    }

    return true;
  });

  const renderCard = (card: Card) => {
    const cardState = getCardState(card.id);

    switch (card.type) {
      case 'material':
        return (
          <MaterialCard 
            key={card.id} 
            material={card as any} 
            cardState={cardState}
            onToggleComplete={onToggleComplete}
            onToggleShoppingList={onToggleShoppingList}
            onUpdateActualCost={onUpdateActualCost}
          />
        );
      case 'cut':
        return (
          <CutCard 
            key={card.id} 
            cut={card as any} 
            cardState={cardState}
            onToggleComplete={onToggleComplete}
          />
        );
      case 'tool':
        return (
          <ToolCard 
            key={card.id} 
            tool={card as any} 
            cardState={cardState}
            onToggleComplete={onToggleComplete}
          />
        );
      case 'safety':
        return <SafetyCard key={card.id} safetyNote={card as any} />;
      case 'step':
        return (
          <StepCard 
            key={card.id} 
            step={card as any} 
            cardState={cardState}
            onToggleComplete={onToggleComplete}
          />
        );
      case 'architecture':
        return <ArchitectureCard key={card.id} note={card as any} />;
      default:
        return null;
    }
  };

  return (
    <div className="w-full">
      <Masonry
        breakpointCols={breakpointColumns}
        className="flex -ml-6 w-auto"
        columnClassName="pl-6 bg-clip-padding"
      >
        {filteredCards.map(card => renderCard(card))}
      </Masonry>
      
      {filteredCards.length === 0 && (
        <div className="text-center py-12 text-harbor">
          <p className="text-lg">No cards match your search.</p>
        </div>
      )}
    </div>
  );
}
