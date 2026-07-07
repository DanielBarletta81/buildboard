'use client';

import React from 'react';
import Masonry from 'react-masonry-css';
import { Board, Card } from '@/lib/types';
import MaterialCard from './cards/MaterialCard';
import CutCard from './cards/CutCard';
import ToolCard from './cards/ToolCard';
import SafetyCard from './cards/SafetyCard';
import StepCard from './cards/StepCard';
import ArchitectureCard from './cards/ArchitectureCard';

interface MasonryBoardProps {
  board: Board;
  searchQuery?: string;
}

export default function MasonryBoard({ board, searchQuery }: MasonryBoardProps) {
  const breakpointColumns = {
    default: 4,
    1536: 3,
    1024: 2,
    768: 1
  };

  // Filter cards based on search query
  const filteredCards = searchQuery 
    ? board.cards.filter(card => {
        const searchLower = searchQuery.toLowerCase();
        const cardData = JSON.stringify(card).toLowerCase();
        return cardData.includes(searchLower);
      })
    : board.cards;

  const renderCard = (card: Card) => {
    switch (card.type) {
      case 'material':
        return <MaterialCard key={card.id} material={card as any} />;
      case 'cut':
        return <CutCard key={card.id} cut={card as any} />;
      case 'tool':
        return <ToolCard key={card.id} tool={card as any} />;
      case 'safety':
        return <SafetyCard key={card.id} safetyNote={card as any} />;
      case 'step':
        return <StepCard key={card.id} step={card as any} />;
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
