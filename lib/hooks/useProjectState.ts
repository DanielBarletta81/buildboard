'use client';

import { useState, useEffect, useCallback } from 'react';
import { ProjectState, CardState, Project } from '@/lib/types';

const STORAGE_KEY = 'buildboard-project-state';

// Initialize default project state
const initializeProjectState = (projectId: string): ProjectState => ({
  projectId,
  cardStates: {},
  shoppingList: [],
  totalSpent: 0,
});

// Load state from localStorage
const loadProjectState = (projectId: string): ProjectState => {
  if (typeof window === 'undefined') return initializeProjectState(projectId);
  
  try {
    const stored = localStorage.getItem(`${STORAGE_KEY}-${projectId}`);
    if (stored) {
      const parsed = JSON.parse(stored);
      // Convert date strings back to Date objects
      Object.values(parsed.cardStates || {}).forEach((state: any) => {
        if (state.completedAt) state.completedAt = new Date(state.completedAt);
      });
      if (parsed.startedAt) parsed.startedAt = new Date(parsed.startedAt);
      if (parsed.completedAt) parsed.completedAt = new Date(parsed.completedAt);
      return parsed;
    }
  } catch (error) {
    console.error('Failed to load project state:', error);
  }
  
  return initializeProjectState(projectId);
};

// Save state to localStorage
const saveProjectState = (projectId: string, state: ProjectState) => {
  if (typeof window === 'undefined') return;
  
  try {
    localStorage.setItem(`${STORAGE_KEY}-${projectId}`, JSON.stringify(state));
  } catch (error) {
    console.error('Failed to save project state:', error);
  }
};

export const useProjectState = (project: Project) => {
  const [projectState, setProjectState] = useState<ProjectState>(() => 
    loadProjectState(project.id)
  );

  // Save to localStorage whenever state changes
  useEffect(() => {
    saveProjectState(project.id, projectState);
  }, [project.id, projectState]);

  // Toggle card completion
  const toggleCardCompletion = useCallback((cardId: string) => {
    setProjectState(prev => {
      const currentState = prev.cardStates[cardId] || { cardId, completed: false };
      const newCompleted = !currentState.completed;
      
      return {
        ...prev,
        cardStates: {
          ...prev.cardStates,
          [cardId]: {
            ...currentState,
            completed: newCompleted,
            completedAt: newCompleted ? new Date() : undefined,
          },
        },
      };
    });
  }, []);

  // Update card notes
  const updateCardNotes = useCallback((cardId: string, notes: string) => {
    setProjectState(prev => ({
      ...prev,
      cardStates: {
        ...prev.cardStates,
        [cardId]: {
          ...(prev.cardStates[cardId] || { cardId, completed: false }),
          notes,
        },
      },
    }));
  }, []);

  // Set card priority
  const setCardPriority = useCallback((cardId: string, priority: 'low' | 'medium' | 'high') => {
    setProjectState(prev => ({
      ...prev,
      cardStates: {
        ...prev.cardStates,
        [cardId]: {
          ...(prev.cardStates[cardId] || { cardId, completed: false }),
          priority,
        },
      },
    }));
  }, []);

  // Toggle shopping list
  const toggleShoppingList = useCallback((cardId: string) => {
    setProjectState(prev => {
      const currentState = prev.cardStates[cardId] || { cardId, completed: false };
      const inList = currentState.inShoppingList || false;
      
      return {
        ...prev,
        cardStates: {
          ...prev.cardStates,
          [cardId]: {
            ...currentState,
            inShoppingList: !inList,
          },
        },
        shoppingList: inList
          ? prev.shoppingList.filter(id => id !== cardId)
          : [...prev.shoppingList, cardId],
      };
    });
  }, []);

  // Update actual cost
  const updateActualCost = useCallback((cardId: string, actualCost: number) => {
    setProjectState(prev => {
      const oldCost = prev.cardStates[cardId]?.actualCost || 0;
      return {
        ...prev,
        cardStates: {
          ...prev.cardStates,
          [cardId]: {
            ...(prev.cardStates[cardId] || { cardId, completed: false }),
            actualCost,
          },
        },
        totalSpent: prev.totalSpent - oldCost + actualCost,
      };
    });
  }, []);

  // Calculate progress statistics
  const getProgress = useCallback(() => {
    const allCards = project.boards.flatMap(board => board.cards);
    const totalCards = allCards.length;
    const completedCards = allCards.filter(
      card => projectState.cardStates[card.id]?.completed
    ).length;

    // Board-specific progress
    const boardProgress = project.boards.map(board => ({
      boardId: board.id,
      boardName: board.name,
      total: board.cards.length,
      completed: board.cards.filter(
        card => projectState.cardStates[card.id]?.completed
      ).length,
    }));

    return {
      total: totalCards,
      completed: completedCards,
      percentage: totalCards > 0 ? Math.round((completedCards / totalCards) * 100) : 0,
      boardProgress,
    };
  }, [project.boards, projectState.cardStates]);

  // Get card state
  const getCardState = useCallback(
    (cardId: string): CardState => {
      return projectState.cardStates[cardId] || { cardId, completed: false };
    },
    [projectState.cardStates]
  );

  // Clear all progress (reset)
  const resetProgress = useCallback(() => {
    setProjectState(initializeProjectState(project.id));
  }, [project.id]);

  return {
    projectState,
    toggleCardCompletion,
    updateCardNotes,
    setCardPriority,
    toggleShoppingList,
    updateActualCost,
    getProgress,
    getCardState,
    resetProgress,
  };
};
