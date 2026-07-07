'use client';

import React, { useState } from 'react';
import { Project } from '@/lib/types';
import MasonryBoard from '@/components/MasonryBoard';

interface ProjectWorkspaceProps {
  project: Project;
}

export default function ProjectWorkspace({ project }: ProjectWorkspaceProps) {
  const [activeBoardId, setActiveBoardId] = useState(project.boards[0]?.id || null);
  const [searchQuery, setSearchQuery] = useState('');

  const activeBoard = project.boards.find(b => b.id === activeBoardId);

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
            </div>
          </div>

          {/* Board Tabs */}
          <div className="flex gap-2 overflow-x-auto pb-2">
            {project.boards.map(board => (
              <button
                key={board.id}
                onClick={() => setActiveBoardId(board.id)}
                className={`px-4 py-2 rounded-lg font-medium text-sm whitespace-nowrap transition-all ${
                  activeBoardId === board.id
                    ? 'bg-slate text-white shadow-md'
                    : 'bg-white text-harbor hover:bg-harbor/10'
                }`}
              >
                <span className="mr-2">{board.icon}</span>
                {board.name}
                <span className="ml-2 text-xs opacity-75">({board.cards.length})</span>
              </button>
            ))}
          </div>
        </div>
      </header>

      {/* Search Bar */}
      <div className="max-w-7xl mx-auto px-4 py-6">
        <input
          type="text"
          placeholder="Search cards..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="w-full max-w-md px-4 py-2 rounded-lg border border-harbor/30 focus:border-slate focus:outline-none focus:ring-2 focus:ring-slate/20 bg-white"
        />
      </div>

      {/* Board Content */}
      <main className="max-w-7xl mx-auto px-4 pb-12">
        {activeBoard && (
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-ink mb-1">{activeBoard.name}</h2>
              <p className="text-harbor">{activeBoard.description}</p>
            </div>
            <MasonryBoard board={activeBoard} searchQuery={searchQuery} />
          </div>
        )}
      </main>
    </div>
  );
}
