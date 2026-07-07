'use client';

import React from 'react';

interface ProgressStats {
  total: number;
  completed: number;
  percentage: number;
  boardProgress: Array<{
    boardId: string;
    boardName: string;
    total: number;
    completed: number;
  }>;
}

interface ProgressDashboardProps {
  progress: ProgressStats;
  estimatedCost?: number;
  actualCost: number;
  onResetProgress: () => void;
}

export default function ProgressDashboard({
  progress,
  estimatedCost,
  actualCost,
  onResetProgress,
}: ProgressDashboardProps) {
  const isOverBudget = estimatedCost && actualCost > estimatedCost;

  return (
    <div className="bg-white border border-harbor/20 rounded-lg p-4 mb-6 shadow-sm">
      <div className="flex items-center justify-between mb-4">
        <h3 className="font-bold text-ink text-lg">📊 Project Progress</h3>
        <button
          onClick={onResetProgress}
          className="text-xs text-harbor hover:text-red-600 transition-colors"
          title="Reset all progress"
        >
          Reset
        </button>
      </div>

      {/* Overall Progress Bar */}
      <div className="mb-4">
        <div className="flex items-center justify-between mb-2">
          <span className="text-sm font-medium text-ink">Overall Completion</span>
          <span className="text-sm font-bold text-slate">
            {progress.completed}/{progress.total} cards ({progress.percentage}%)
          </span>
        </div>
        <div className="w-full bg-fog rounded-full h-3 overflow-hidden">
          <div
            className="bg-gradient-to-r from-slate to-brass h-full rounded-full transition-all duration-500 ease-out"
            style={{ width: `${progress.percentage}%` }}
          />
        </div>
      </div>

      {/* Budget Tracking */}
      {estimatedCost && (
        <div className="mb-4 pb-4 border-b border-harbor/10">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium text-ink">Budget</span>
            <div className="text-right">
              <div className="text-sm">
                <span className={isOverBudget ? 'text-red-600 font-bold' : 'text-brass font-semibold'}>
                  ${actualCost.toFixed(2)}
                </span>
                <span className="text-harbor mx-1">/</span>
                <span className="text-harbor">${estimatedCost.toFixed(2)}</span>
              </div>
              {isOverBudget && (
                <div className="text-xs text-red-600">
                  Over by ${(actualCost - estimatedCost).toFixed(2)}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Board Progress */}
      <div className="space-y-2">
        <span className="text-xs font-semibold text-harbor uppercase tracking-wide">
          Board Progress
        </span>
        {progress.boardProgress.map(board => {
          const boardPercentage = board.total > 0
            ? Math.round((board.completed / board.total) * 100)
            : 0;

          return (
            <div key={board.boardId} className="flex items-center gap-2">
              <span className="text-xs text-ink w-28 flex-shrink-0 truncate">
                {board.boardName}
              </span>
              <div className="flex-1 bg-fog rounded-full h-2 overflow-hidden">
                <div
                  className="bg-slate h-full rounded-full transition-all duration-300"
                  style={{ width: `${boardPercentage}%` }}
                />
              </div>
              <span className="text-xs text-harbor w-16 text-right">
                {board.completed}/{board.total}
              </span>
            </div>
          );
        })}
      </div>

      {/* Completion Celebration */}
      {progress.percentage === 100 && (
        <div className="mt-4 p-3 bg-gradient-to-r from-brass/20 to-slate/20 rounded-lg border-2 border-brass text-center">
          <div className="text-2xl mb-1">🎉</div>
          <div className="text-sm font-bold text-ink">Project Complete!</div>
          <div className="text-xs text-harbor">Great work finishing this build!</div>
        </div>
      )}
    </div>
  );
}
