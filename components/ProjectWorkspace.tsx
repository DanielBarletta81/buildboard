'use client';

import React, { useState } from 'react';
import { Project } from '@/lib/types';
import MasonryBoard from '@/components/MasonryBoard';
import ProgressDashboard from '@/components/ProgressDashboard';
import ShoppingList from '@/components/ShoppingList';
import { useProjectState } from '@/lib/hooks/useProjectState';

interface ProjectWorkspaceProps {
  project: Project;
}

export default function ProjectWorkspace({ project }: ProjectWorkspaceProps) {
  const [activeBoardId, setActiveBoardId] = useState(project.boards[0]?.id || null);
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<'all' | 'completed' | 'pending'>('all');
  const [showShoppingList, setShowShoppingList] = useState(false);

  const {
    projectState,
    toggleCardCompletion,
    toggleShoppingList,
    updateActualCost,
    getProgress,
    getCardState,
    resetProgress,
  } = useProjectState(project);

  const activeBoard = project.boards.find(b => b.id === activeBoardId);
  const progress = getProgress();
  const allCards = project.boards.flatMap(board => board.cards);

  return (
    <div className="min-h-screen bg-paper">
      {/* Project Header */}
      <header className="bg-fog border-b border-harbor/20 sticky top-0 z-10 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h1 className="text-3xl font-bold text-ink mb-1">{project.name}</h1>
              <p className="text-sm text-harbor">{project.description}</p>
            </div>
            <div className="flex gap-2 text-sm">
              <span className="px-3 py-1 bg-cedar/10 text-cedar rounded">
                {project.difficulty}
              </span>
              <span className="px-3 py-1 bg-slate/10 text-slate rounded">
                {project.estimatedTime}
              </span>
              {project.estimatedCost && (
                <span className="px-3 py-1 bg-brass/10 text-brass rounded font-semibold">
                  ~${project.estimatedCost}
                </span>
              )}
              <button
                onClick={() => setShowShoppingList(true)}
                className="px-3 py-1 bg-brass text-white rounded hover:bg-brass/90 transition-colors font-medium relative"
              >
                🛒 Shopping List
                {projectState.shoppingList.length > 0 && (
                  <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                    {projectState.shoppingList.length}
                  </span>
                )}
              </button>
            </div>
          </div>

          {/* Board Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {project.boards.map(board => {
              const boardProgress = progress.boardProgress.find(bp => bp.boardId === board.id);
              const boardPercentage = boardProgress 
                ? Math.round((boardProgress.completed / boardProgress.total) * 100)
                : 0;
              
              return (
                <button
                  key={board.id}
                  onClick={() => setActiveBoardId(board.id)}
                  className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all relative ${
                    activeBoardId === board.id
                      ? 'bg-slate text-white shadow-md'
                      : 'bg-white text-harbor hover:bg-harbor/10'
                  }`}
                >
                  <span className="mr-2">{board.icon}</span>
                  {board.name}
                  <span className="ml-2 text-xs opacity-75">
                    ({boardProgress?.completed || 0}/{board.cards.length})
                  </span>
                  {boardPercentage > 0 && (
                    <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 rounded-b-lg overflow-hidden">
                      <div 
                        className="h-full bg-green-400 transition-all duration-300"
                        style={{ width: `${boardPercentage}%` }}
                      />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>
      </header>

      {/* Search & Filters */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="flex gap-4 items-center">
          <input
            type="text"
            placeholder="Search cards..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="flex-1 max-w-md px-4 py-2 rounded-lg border border-harbor/30 focus:border-slate focus:outline-none focus:ring-2 focus:ring-slate/20 bg-white"
          />
          <div className="flex gap-2">
            <button
              onClick={() => setStatusFilter('all')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === 'all'
                  ? 'bg-slate text-white'
                  : 'bg-white text-harbor hover:bg-harbor/10'
              }`}
            >
              All
            </button>
            <button
              onClick={() => setStatusFilter('pending')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === 'pending'
                  ? 'bg-slate text-white'
                  : 'bg-white text-harbor hover:bg-harbor/10'
              }`}
            >
              Pending
            </button>
            <button
              onClick={() => setStatusFilter('completed')}
              className={`px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                statusFilter === 'completed'
                  ? 'bg-slate text-white'
                  : 'bg-white text-harbor hover:bg-harbor/10'
              }`}
            >
              Completed
            </button>
          </div>
        </div>
      </div>

      {/* Board Content */}
      <main className="max-w-7xl mx-auto px-4 pb-12">
        {/* Progress Dashboard */}
        <ProgressDashboard
          progress={progress}
          estimatedCost={project.estimatedCost}
          actualCost={projectState.totalSpent}
          onResetProgress={() => {
            if (confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
              resetProgress();
            }
          }}
        />

        {activeBoard && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-ink mb-1">{activeBoard.name}</h2>
              <p className="text-harbor">{activeBoard.description}</p>
            </div>
            <MasonryBoard 
              board={activeBoard} 
              searchQuery={searchQuery}
              statusFilter={statusFilter}
              getCardState={getCardState}
              onToggleComplete={toggleCardCompletion}
              onToggleShoppingList={toggleShoppingList}
              onUpdateActualCost={updateActualCost}
            />
          </div>
        )}
      </main>

      {/* Shopping List Modal */}
      {showShoppingList && (
        <ShoppingList
          shoppingList={projectState.shoppingList}
          allCards={allCards}
          onClose={() => setShowShoppingList(false)}
          onRemoveItem={toggleShoppingList}
        />
      )}
    </div>
  );
}
