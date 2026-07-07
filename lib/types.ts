// BuildBoard Type Definitions

export type CardType = 
  | 'material' 
  | 'cut' 
  | 'tool' 
  | 'safety' 
  | 'step' 
  | 'architecture' 
  | 'product'
  | 'note';

export type MeasurementUnit = 'in' | 'ft' | 'mm' | 'cm' | 'm';

export interface Dimensions {
  length?: number;
  width?: number;
  height?: number;
  thickness?: number;
  diameter?: number;
  unit: MeasurementUnit;
}

export interface Material {
  id: string;
  type: CardType;
  name: string;
  category: string; // lumber, fasteners, hardware, roofing, etc.
  quantity: number;
  quantityUnit: string; // sheets, boards, lbs, box, etc.
  dimensions?: Dimensions;
  specifications?: string;
  estimatedCost?: number;
  supplier?: string;
  productLinks?: ProductLink[];
  notes?: string;
  imageUrl?: string;
  tags?: string[];
  relatedCuts?: string[]; // IDs of cuts that use this material
}

export interface Cut {
  id: string;
  type: CardType;
  name: string;
  material: string; // Material name or ID
  quantity: number;
  dimensions: Dimensions;
  angle?: number; // degrees
  purpose: string; // What this cut is for
  instructions?: string;
  toolsNeeded?: string[]; // Tool IDs
  difficulty?: 'easy' | 'medium' | 'hard';
  safetyNotes?: string[]; // Safety note IDs
  diagramUrl?: string;
  tags?: string[];
  step?: number; // Which construction step uses this cut
}

export interface Tool {
  id: string;
  type: CardType;
  name: string;
  category: string; // power, hand, measuring, safety
  required: boolean;
  alternative?: string;
  specifications?: string;
  safetyRating?: 'low' | 'medium' | 'high';
  usedIn?: string[]; // Cut or step IDs
  productLinks?: ProductLink[];
  imageUrl?: string;
  notes?: string;
  tags?: string[];
}

export interface SafetyNote {
  id: string;
  type: CardType;
  title: string;
  severity: 'caution' | 'warning' | 'danger';
  category: string; // tool-safety, structural, environmental, ppe
  description: string;
  relatedTools?: string[];
  relatedSteps?: string[];
  imageUrl?: string;
  tags?: string[];
}

export interface InstructionStep {
  id: string;
  type: CardType;
  stepNumber: number;
  title: string;
  description: string;
  estimatedTime?: string;
  difficulty?: 'easy' | 'medium' | 'hard';
  materialsNeeded?: string[]; // Material IDs
  cutsNeeded?: string[]; // Cut IDs
  toolsNeeded?: string[]; // Tool IDs
  safetyNotes?: string[]; // Safety note IDs
  tips?: string[];
  imageUrl?: string;
  videoUrl?: string;
  diagramUrl?: string;
  checkpoints?: string[]; // Things to verify before moving on
  tags?: string[];
}

export interface ProductLink {
  id: string;
  name: string;
  supplier: string; // Home Depot, Lowes, Amazon, etc.
  url: string;
  price?: number;
  specifications?: string;
  inStock?: boolean;
}

export interface ArchitectureNote {
  id: string;
  type: CardType;
  title: string;
  category: string; // dimensions, design, regulations, foundation
  description: string;
  specifications?: string;
  imageUrl?: string;
  diagramUrl?: string;
  tags?: string[];
}

export interface Note {
  id: string;
  type: CardType;
  title: string;
  content: string;
  category?: string;
  tags?: string[];
  imageUrl?: string;
}

export type Card = 
  | Material 
  | Cut 
  | Tool 
  | SafetyNote 
  | InstructionStep 
  | ArchitectureNote
  | Note;

export interface Board {
  id: string;
  name: string;
  description: string;
  icon: string; // emoji or icon name
  cardType: CardType;
  cards: Card[];
  color?: string; // Theme color for board
  order: number; // Display order
}

export interface Project {
  id: string;
  name: string;
  description: string;
  category: string; // shed, deck, furniture, etc.
  difficulty: 'beginner' | 'intermediate' | 'advanced';
  estimatedTime: string;
  estimatedCost?: number;
  boards: Board[];
  coverImageUrl?: string;
  tags?: string[];
  createdAt: Date;
  updatedAt: Date;
  status?: 'planning' | 'in-progress' | 'completed';
}

// View state types
export interface ProjectViewState {
  activeBoard: string | null;
  viewMode: 'grid' | 'list' | 'timeline';
  filters: {
    tags?: string[];
    difficulty?: string[];
    category?: string[];
  };
  searchQuery?: string;
}
