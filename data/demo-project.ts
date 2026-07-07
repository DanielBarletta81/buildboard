import { Project, Material, Cut, Tool, SafetyNote, InstructionStep, ArchitectureNote } from '@/lib/types';

// Materials for 10x10 Gambrel Shed Office
const materials: Material[] = [
  {
    id: 'mat-001',
    type: 'material',
    name: '4x4x10 Pressure Treated Post',
    category: 'lumber',
    quantity: 4,
    quantityUnit: 'posts',
    dimensions: { length: 120, width: 3.5, height: 3.5, unit: 'in' },
    specifications: 'Ground contact rated, pressure treated pine',
    estimatedCost: 18.97,
    supplier: 'Home Depot',
    notes: 'Foundation corner posts',
    tags: ['foundation', 'structural', 'pressure-treated'],
    relatedCuts: ['cut-001']
  },
  {
    id: 'mat-002',
    type: 'material',
    name: '2x6x10 Pressure Treated Lumber',
    category: 'lumber',
    quantity: 12,
    quantityUnit: 'boards',
    dimensions: { length: 120, width: 5.5, thickness: 1.5, unit: 'in' },
    specifications: 'Pressure treated pine for floor joists',
    estimatedCost: 12.48,
    supplier: 'Home Depot',
    tags: ['floor', 'structural', 'pressure-treated'],
    relatedCuts: ['cut-002', 'cut-003']
  },
  {
    id: 'mat-003',
    type: 'material',
    name: '2x4x8 Stud Grade Lumber',
    category: 'lumber',
    quantity: 40,
    quantityUnit: 'boards',
    dimensions: { length: 96, width: 3.5, thickness: 1.5, unit: 'in' },
    specifications: 'Kiln-dried spruce-pine-fir',
    estimatedCost: 4.87,
    supplier: 'Lowes',
    notes: 'Wall framing studs',
    tags: ['walls', 'framing', 'structural'],
    relatedCuts: ['cut-004', 'cut-005', 'cut-006']
  },
  {
    id: 'mat-004',
    type: 'material',
    name: '2x4x10 Select Lumber',
    category: 'lumber',
    quantity: 16,
    quantityUnit: 'boards',
    dimensions: { length: 120, width: 3.5, thickness: 1.5, unit: 'in' },
    specifications: 'Kiln-dried, select grade for gambrel roof',
    estimatedCost: 8.97,
    supplier: 'Lowes',
    tags: ['roof', 'framing', 'gambrel'],
    relatedCuts: ['cut-007', 'cut-008']
  },
  {
    id: 'mat-005',
    type: 'material',
    name: '3/4" Plywood Sheathing',
    category: 'lumber',
    quantity: 8,
    quantityUnit: 'sheets',
    dimensions: { length: 96, width: 48, thickness: 0.75, unit: 'in' },
    specifications: 'CDX plywood for floor and roof',
    estimatedCost: 42.98,
    supplier: 'Home Depot',
    tags: ['floor', 'roof', 'sheathing'],
    relatedCuts: ['cut-009', 'cut-010']
  },
  {
    id: 'mat-006',
    type: 'material',
    name: 'T1-11 Siding 4x8',
    category: 'siding',
    quantity: 10,
    quantityUnit: 'sheets',
    dimensions: { length: 96, width: 48, thickness: 0.625, unit: 'in' },
    specifications: '5/8" grooved plywood siding',
    estimatedCost: 36.98,
    supplier: 'Home Depot',
    notes: 'Exterior wall covering',
    tags: ['siding', 'exterior'],
    relatedCuts: ['cut-011']
  },
  {
    id: 'mat-007',
    type: 'material',
    name: 'Architectural Shingles',
    category: 'roofing',
    quantity: 3,
    quantityUnit: 'bundles',
    specifications: 'GAF Timberline HDZ - Charcoal',
    estimatedCost: 39.98,
    supplier: 'Home Depot',
    tags: ['roofing', 'weatherproofing'],
    notes: 'Covers approximately 120 sq ft'
  },
  {
    id: 'mat-008',
    type: 'material',
    name: 'Roofing Felt Paper',
    category: 'roofing',
    quantity: 1,
    quantityUnit: 'roll',
    specifications: '15lb felt, 432 sq ft coverage',
    estimatedCost: 28.97,
    supplier: 'Lowes',
    tags: ['roofing', 'weatherproofing']
  },
  {
    id: 'mat-009',
    type: 'material',
    name: '3" Deck Screws',
    category: 'fasteners',
    quantity: 2,
    quantityUnit: 'lbs',
    specifications: 'Exterior coated deck screws',
    estimatedCost: 15.98,
    supplier: 'Home Depot',
    tags: ['fasteners', 'deck', 'assembly']
  },
  {
    id: 'mat-010',
    type: 'material',
    name: '16d Galvanized Nails',
    category: 'fasteners',
    quantity: 5,
    quantityUnit: 'lbs',
    specifications: 'Hot-dipped galvanized common nails',
    estimatedCost: 12.48,
    supplier: 'Lowes',
    tags: ['fasteners', 'framing']
  },
  {
    id: 'mat-011',
    type: 'material',
    name: 'Roofing Nails',
    category: 'fasteners',
    quantity: 2,
    quantityUnit: 'lbs',
    specifications: '1-1/4" galvanized roofing nails',
    estimatedCost: 8.97,
    supplier: 'Home Depot',
    tags: ['fasteners', 'roofing']
  },
  {
    id: 'mat-012',
    type: 'material',
    name: 'Hurricane Ties',
    category: 'hardware',
    quantity: 16,
    quantityUnit: 'pieces',
    specifications: 'Simpson H2.5A ties',
    estimatedCost: 1.87,
    supplier: 'Home Depot',
    notes: 'Roof to wall connections',
    tags: ['hardware', 'structural', 'hurricane-rated']
  },
  {
    id: 'mat-013',
    type: 'material',
    name: 'Door Unit 36" Pre-hung',
    category: 'doors-windows',
    quantity: 1,
    quantityUnit: 'unit',
    dimensions: { width: 36, height: 80, unit: 'in' },
    estimatedCost: 198.00,
    supplier: 'Lowes',
    tags: ['door', 'entry']
  },
  {
    id: 'mat-014',
    type: 'material',
    name: 'Window 24x36 Single Hung',
    category: 'doors-windows',
    quantity: 2,
    quantityUnit: 'units',
    dimensions: { width: 24, height: 36, unit: 'in' },
    estimatedCost: 89.00,
    supplier: 'Home Depot',
    tags: ['window', 'natural-light']
  },
  {
    id: 'mat-015',
    type: 'material',
    name: 'Concrete Mix 80lb',
    category: 'foundation',
    quantity: 8,
    quantityUnit: 'bags',
    specifications: 'Quikrete fast-setting concrete',
    estimatedCost: 6.48,
    supplier: 'Home Depot',
    notes: 'For post foundations',
    tags: ['foundation', 'concrete']
  },
  {
    id: 'mat-016',
    type: 'material',
    name: 'Gravel Base',
    category: 'foundation',
    quantity: 0.5,
    quantityUnit: 'yards',
    specifications: '3/4" crushed stone',
    estimatedCost: 45.00,
    supplier: 'Local quarry',
    tags: ['foundation', 'drainage']
  },
  {
    id: 'mat-017',
    type: 'material',
    name: 'Drip Edge Flashing',
    category: 'roofing',
    quantity: 40,
    quantityUnit: 'feet',
    specifications: 'Aluminum drip edge',
    estimatedCost: 1.98,
    supplier: 'Home Depot',
    tags: ['roofing', 'flashing', 'weatherproofing']
  },
  {
    id: 'mat-018',
    type: 'material',
    name: 'Ridge Vent',
    category: 'roofing',
    quantity: 10,
    quantityUnit: 'feet',
    specifications: 'Cobra ridge vent',
    estimatedCost: 4.98,
    supplier: 'Lowes',
    tags: ['roofing', 'ventilation']
  }
];

// Cuts for the shed
const cuts: Cut[] = [
  {
    id: 'cut-001',
    type: 'cut',
    name: '4x4 Corner Posts (8ft)',
    material: '4x4x10 Pressure Treated Post',
    quantity: 4,
    dimensions: { length: 96, unit: 'in' },
    purpose: 'Foundation corner posts',
    instructions: 'Square cut ends for level installation',
    toolsNeeded: ['tool-001', 'tool-006'],
    difficulty: 'easy',
    tags: ['foundation'],
    step: 1
  },
  {
    id: 'cut-002',
    type: 'cut',
    name: 'Floor Joists (118")',
    material: '2x6x10 Pressure Treated Lumber',
    quantity: 10,
    dimensions: { length: 118, unit: 'in' },
    purpose: 'Main floor support joists',
    instructions: 'Cut to fit between rim joists with 1" overhang',
    toolsNeeded: ['tool-001', 'tool-006'],
    difficulty: 'easy',
    tags: ['floor', 'structural'],
    step: 2
  },
  {
    id: 'cut-003',
    type: 'cut',
    name: 'Rim Joists (120")',
    material: '2x6x10 Pressure Treated Lumber',
    quantity: 2,
    dimensions: { length: 120, unit: 'in' },
    purpose: 'Floor perimeter joists',
    instructions: 'No cuts needed - use full 10ft length',
    toolsNeeded: ['tool-006'],
    difficulty: 'easy',
    tags: ['floor', 'perimeter'],
    step: 2
  },
  {
    id: 'cut-004',
    type: 'cut',
    name: 'Wall Studs (92-5/8")',
    material: '2x4x8 Stud Grade Lumber',
    quantity: 32,
    dimensions: { length: 92.625, unit: 'in' },
    purpose: 'Standard wall studs for 8ft ceiling height',
    instructions: 'Precise cuts for proper wall height',
    toolsNeeded: ['tool-001', 'tool-006'],
    difficulty: 'medium',
    safetyNotes: ['safety-001'],
    tags: ['walls', 'framing'],
    step: 3
  },
  {
    id: 'cut-005',
    type: 'cut',
    name: 'Top/Bottom Plates (120")',
    material: '2x4x10 Select Lumber',
    quantity: 8,
    dimensions: { length: 120, unit: 'in' },
    purpose: 'Wall top and bottom plates',
    instructions: 'Use full 10ft boards, no cuts needed',
    toolsNeeded: ['tool-006'],
    difficulty: 'easy',
    tags: ['walls', 'plates'],
    step: 3
  },
  {
    id: 'cut-006',
    type: 'cut',
    name: 'Door Header (40")',
    material: '2x4x8 Stud Grade Lumber',
    quantity: 2,
    dimensions: { length: 40, unit: 'in' },
    purpose: 'Door rough opening header',
    instructions: 'Will be sandwiched with 1/2" plywood',
    toolsNeeded: ['tool-001', 'tool-006'],
    difficulty: 'easy',
    tags: ['door', 'header'],
    step: 3
  },
  {
    id: 'cut-007',
    type: 'cut',
    name: 'Lower Gambrel Rafters (60")',
    material: '2x4x10 Select Lumber',
    quantity: 10,
    dimensions: { length: 60, unit: 'in' },
    angle: 30,
    purpose: 'Lower slope of gambrel roof',
    instructions: '30° angle cut on one end for gambrel joint',
    toolsNeeded: ['tool-001', 'tool-006'],
    difficulty: 'hard',
    safetyNotes: ['safety-001', 'safety-003'],
    diagramUrl: '/diagrams/gambrel-cut.svg',
    tags: ['roof', 'gambrel', 'angle-cut'],
    step: 4
  },
  {
    id: 'cut-008',
    type: 'cut',
    name: 'Upper Gambrel Rafters (45")',
    material: '2x4x10 Select Lumber',
    quantity: 10,
    dimensions: { length: 45, unit: 'in' },
    angle: 60,
    purpose: 'Upper slope of gambrel roof',
    instructions: '60° angle cut on one end, 30° on other for peak',
    toolsNeeded: ['tool-001', 'tool-006'],
    difficulty: 'hard',
    safetyNotes: ['safety-001', 'safety-003'],
    diagramUrl: '/diagrams/gambrel-cut.svg',
    tags: ['roof', 'gambrel', 'angle-cut'],
    step: 4
  },
  {
    id: 'cut-009',
    type: 'cut',
    name: 'Floor Sheathing (48x120")',
    material: '3/4" Plywood Sheathing',
    quantity: 3,
    dimensions: { length: 120, width: 48, unit: 'in' },
    purpose: 'Floor deck',
    instructions: 'Rip to exact width if needed for edge boards',
    toolsNeeded: ['tool-002', 'tool-006'],
    difficulty: 'medium',
    safetyNotes: ['safety-002'],
    tags: ['floor', 'sheathing'],
    step: 2
  },
  {
    id: 'cut-010',
    type: 'cut',
    name: 'Roof Sheathing (Gambrel Fit)',
    material: '3/4" Plywood Sheathing',
    quantity: 5,
    dimensions: { length: 72, width: 48, unit: 'in' },
    purpose: 'Roof deck',
    instructions: 'Measure and cut to fit gambrel angles',
    toolsNeeded: ['tool-002', 'tool-006'],
    difficulty: 'hard',
    safetyNotes: ['safety-002', 'safety-004'],
    tags: ['roof', 'sheathing'],
    step: 5
  },
  {
    id: 'cut-011',
    type: 'cut',
    name: 'T1-11 Siding Panels',
    material: 'T1-11 Siding 4x8',
    quantity: 10,
    dimensions: { length: 96, width: 48, unit: 'in' },
    purpose: 'Exterior wall covering',
    instructions: 'Cut openings for door and windows',
    toolsNeeded: ['tool-002', 'tool-003', 'tool-006'],
    difficulty: 'medium',
    safetyNotes: ['safety-002'],
    tags: ['siding', 'exterior'],
    step: 6
  }
];

// Tools needed
const tools: Tool[] = [
  {
    id: 'tool-001',
    type: 'tool',
    name: 'Compound Miter Saw',
    category: 'power',
    required: true,
    specifications: '10" or 12" blade, adjustable angle',
    safetyRating: 'high',
    usedIn: ['cut-001', 'cut-002', 'cut-004', 'cut-007', 'cut-008'],
    notes: 'Essential for angled gambrel cuts',
    tags: ['cutting', 'power-tool', 'angles']
  },
  {
    id: 'tool-002',
    type: 'tool',
    name: 'Circular Saw',
    category: 'power',
    required: true,
    specifications: '7-1/4" blade minimum',
    safetyRating: 'high',
    usedIn: ['cut-009', 'cut-010', 'cut-011'],
    tags: ['cutting', 'power-tool', 'sheet-goods']
  },
  {
    id: 'tool-003',
    type: 'tool',
    name: 'Jigsaw',
    category: 'power',
    required: true,
    specifications: 'Variable speed with T-shank blades',
    safetyRating: 'medium',
    usedIn: ['cut-011'],
    notes: 'For cutting door and window openings',
    tags: ['cutting', 'power-tool', 'curves']
  },
  {
    id: 'tool-004',
    type: 'tool',
    name: 'Framing Nailer',
    category: 'power',
    required: false,
    alternative: 'Hammer and 16d nails',
    specifications: 'Pneumatic or cordless, 16d capacity',
    safetyRating: 'high',
    notes: 'Speeds up framing considerably',
    tags: ['fastening', 'power-tool', 'pneumatic']
  },
  {
    id: 'tool-005',
    type: 'tool',
    name: 'Impact Driver',
    category: 'power',
    required: true,
    specifications: '18V minimum, 1/4" hex drive',
    safetyRating: 'low',
    notes: 'For deck screws and general assembly',
    tags: ['fastening', 'power-tool', 'cordless']
  },
  {
    id: 'tool-006',
    type: 'tool',
    name: 'Speed Square',
    category: 'measuring',
    required: true,
    specifications: '7" aluminum rafter square',
    safetyRating: 'low',
    usedIn: ['cut-001', 'cut-002', 'cut-007', 'cut-008'],
    notes: 'Critical for marking angle cuts',
    tags: ['measuring', 'layout', 'angles']
  },
  {
    id: 'tool-007',
    type: 'tool',
    name: 'Tape Measure',
    category: 'measuring',
    required: true,
    specifications: '25ft minimum, locking blade',
    safetyRating: 'low',
    tags: ['measuring', 'layout']
  },
  {
    id: 'tool-008',
    type: 'tool',
    name: 'Level (4ft)',
    category: 'measuring',
    required: true,
    specifications: '48" I-beam level with vials',
    safetyRating: 'low',
    notes: 'Essential for plumb walls and level floors',
    tags: ['measuring', 'level', 'plumb']
  },
  {
    id: 'tool-009',
    type: 'tool',
    name: 'Post Hole Digger',
    category: 'hand',
    required: true,
    alternative: 'Power auger rental',
    specifications: 'Clamshell style, 48" handles',
    safetyRating: 'low',
    notes: 'For digging 4x4 post holes',
    tags: ['digging', 'foundation']
  },
  {
    id: 'tool-010',
    type: 'tool',
    name: 'Hammer',
    category: 'hand',
    required: true,
    specifications: '16oz framing hammer',
    safetyRating: 'low',
    tags: ['fastening', 'hand-tool']
  },
  {
    id: 'tool-011',
    type: 'tool',
    name: 'Chalk Line',
    category: 'measuring',
    required: true,
    specifications: 'Blue chalk, 100ft line',
    safetyRating: 'low',
    notes: 'For marking straight cut lines',
    tags: ['measuring', 'layout']
  },
  {
    id: 'tool-012',
    type: 'tool',
    name: 'Ladder (8ft)',
    category: 'safety',
    required: true,
    specifications: 'Type IA rated, 300lb capacity',
    safetyRating: 'high',
    notes: 'For roof work - ensure stable footing',
    tags: ['safety', 'access', 'height']
  }
];

// Safety notes
const safetyNotes: SafetyNote[] = [
  {
    id: 'safety-001',
    type: 'safety',
    title: 'Miter Saw Safety',
    severity: 'danger',
    category: 'tool-safety',
    description: 'Always use blade guard, clamp small pieces, wait for blade to stop completely before reaching near it. Wear safety glasses and hearing protection.',
    relatedTools: ['tool-001'],
    tags: ['power-tools', 'cutting']
  },
  {
    id: 'safety-002',
    type: 'safety',
    title: 'Circular Saw Kickback Prevention',
    severity: 'danger',
    category: 'tool-safety',
    description: 'Support sheet goods properly on both sides of cut. Never start saw with blade in contact with material. Keep body to side of blade path.',
    relatedTools: ['tool-002'],
    tags: ['power-tools', 'cutting', 'kickback']
  },
  {
    id: 'safety-003',
    type: 'safety',
    title: 'Roof Safety',
    severity: 'danger',
    category: 'environmental',
    description: 'Work on roof only in dry conditions. Use proper ladder setup with 4:1 ratio. Consider roof brackets or harness for steep pitches over 6/12.',
    relatedSteps: ['step-005', 'step-007'],
    tags: ['height', 'fall-protection', 'weather']
  },
  {
    id: 'safety-004',
    type: 'safety',
    title: 'Two-Person Lift Required',
    severity: 'warning',
    category: 'physical',
    description: 'Plywood sheets and long lumber are awkward and heavy. Always have a helper for moving materials, especially on ladders or roof.',
    relatedSteps: ['step-005'],
    tags: ['lifting', 'helper-needed']
  },
  {
    id: 'safety-005',
    type: 'safety',
    title: 'Concrete Handling',
    severity: 'caution',
    category: 'ppe',
    description: 'Wear gloves when handling concrete mix. Wet concrete is caustic and can burn skin. Wash hands after use.',
    relatedSteps: ['step-001'],
    tags: ['chemical', 'ppe', 'skin-protection']
  },
  {
    id: 'safety-006',
    type: 'safety',
    title: 'Structural Stability During Build',
    severity: 'warning',
    category: 'structural',
    description: 'Brace walls immediately after raising them. Do not leave partially framed structure overnight without temporary bracing.',
    relatedSteps: ['step-003'],
    tags: ['structural', 'bracing', 'temporary-support']
  },
  {
    id: 'safety-007',
    type: 'safety',
    title: 'Pressure Treated Lumber',
    severity: 'caution',
    category: 'ppe',
    description: 'Wear dust mask when cutting PT lumber. Do not burn scraps - chemicals are toxic. Wash hands before eating.',
    relatedTools: ['tool-001', 'tool-002'],
    tags: ['chemical', 'dust', 'ppe']
  },
  {
    id: 'safety-008',
    type: 'safety',
    title: 'Electrical Cord Management',
    severity: 'caution',
    category: 'environmental',
    description: 'Keep extension cords out of walking paths. Use GFCI protection for outdoor power. Inspect cords for damage before use.',
    tags: ['electrical', 'trip-hazard']
  }
];

// Instruction steps
const instructionSteps: InstructionStep[] = [
  {
    id: 'step-001',
    type: 'step',
    stepNumber: 1,
    title: 'Foundation & Post Installation',
    description: 'Dig four 24" deep holes at corners of 10x10 footprint. Add 4" gravel base. Set 4x4 posts in holes, level and plumb. Pour concrete around posts. Let cure 48 hours.',
    estimatedTime: '4-6 hours',
    difficulty: 'medium',
    materialsNeeded: ['mat-001', 'mat-015', 'mat-016'],
    cutsNeeded: ['cut-001'],
    toolsNeeded: ['tool-007', 'tool-008', 'tool-009'],
    safetyNotes: ['safety-005'],
    tips: [
      'Use batterboards and string to ensure square layout',
      'Posts should extend 96" above ground level',
      'Check diagonal measurements - should be equal'
    ],
    checkpoints: [
      'All four posts are plumb',
      'Tops of posts are level with each other',
      'Concrete is set before proceeding'
    ],
    tags: ['foundation', 'layout']
  },
  {
    id: 'step-002',
    type: 'step',
    stepNumber: 2,
    title: 'Floor Framing & Decking',
    description: 'Install rim joists around perimeter, attached to posts. Add floor joists at 16" on center. Install plywood floor sheathing with 1/8" gaps.',
    estimatedTime: '3-4 hours',
    difficulty: 'medium',
    materialsNeeded: ['mat-002', 'mat-005', 'mat-009'],
    cutsNeeded: ['cut-002', 'cut-003', 'cut-009'],
    toolsNeeded: ['tool-004', 'tool-005', 'tool-007', 'tool-008', 'tool-011'],
    safetyNotes: ['safety-004'],
    tips: [
      'Install joists crown-side up',
      'Use joist hangers for cleaner connections',
      'Stagger plywood seams for strength'
    ],
    checkpoints: [
      'Floor is level in all directions',
      'No bounce or flex in completed floor',
      'All fasteners are flush with surface'
    ],
    tags: ['floor', 'framing']
  },
  {
    id: 'step-003',
    type: 'step',
    stepNumber: 3,
    title: 'Wall Framing',
    description: 'Frame four walls on the deck, then raise and square them. Install studs at 16" OC with double top plates. Frame rough openings for door (38x82") and windows (26x38").',
    estimatedTime: '6-8 hours',
    difficulty: 'medium',
    materialsNeeded: ['mat-003', 'mat-004', 'mat-010'],
    cutsNeeded: ['cut-004', 'cut-005', 'cut-006'],
    toolsNeeded: ['tool-004', 'tool-005', 'tool-007', 'tool-008'],
    safetyNotes: ['safety-006'],
    tips: [
      'Build walls flat on deck before raising',
      'Install temporary bracing immediately after raising',
      'Use king studs, jack studs, and proper headers for openings'
    ],
    checkpoints: [
      'All walls are plumb',
      'Corners are square (check diagonals)',
      'Temporary bracing is secure',
      'Rough openings are correct size'
    ],
    tags: ['walls', 'framing']
  },
  {
    id: 'step-004',
    type: 'step',
    stepNumber: 4,
    title: 'Gambrel Roof Framing',
    description: 'Build gambrel roof trusses with lower rafters at 30° and upper rafters at 60°. Install rafters at 24" OC. Add ridge board and collar ties. Install hurricane ties at each rafter.',
    estimatedTime: '8-10 hours',
    difficulty: 'hard',
    materialsNeeded: ['mat-004', 'mat-010', 'mat-012'],
    cutsNeeded: ['cut-007', 'cut-008'],
    toolsNeeded: ['tool-001', 'tool-004', 'tool-006', 'tool-007', 'tool-008'],
    safetyNotes: ['safety-001', 'safety-003', 'safety-006'],
    tips: [
      'Build a template truss on ground first',
      'Mark rafter locations on top plates before lifting',
      'Have helper for lifting and positioning rafters'
    ],
    checkpoints: [
      'All rafters match template',
      'Ridge is straight and level',
      'Hurricane ties are installed at every rafter connection',
      'Structure is stable and well-braced'
    ],
    tags: ['roof', 'gambrel', 'framing']
  },
  {
    id: 'step-005',
    type: 'step',
    stepNumber: 5,
    title: 'Roof Sheathing',
    description: 'Install 3/4" plywood sheathing on roof, starting at eaves. Stagger seams and leave 1/8" gaps. Overhang eaves by 1" for drip edge.',
    estimatedTime: '4-5 hours',
    difficulty: 'hard',
    materialsNeeded: ['mat-005', 'mat-009'],
    cutsNeeded: ['cut-010'],
    toolsNeeded: ['tool-002', 'tool-005', 'tool-007', 'tool-011', 'tool-012'],
    safetyNotes: ['safety-003', 'safety-004'],
    tips: [
      'Work with a partner - one on ladder, one on roof',
      'Use roof brackets if pitch feels uncomfortable',
      'Mark rafter locations on sheathing for nail lines'
    ],
    checkpoints: [
      'Seams fall on rafter centers',
      'No gaps or overhangs except at eaves',
      'Surface is smooth for felt paper'
    ],
    tags: ['roof', 'sheathing']
  },
  {
    id: 'step-006',
    type: 'step',
    stepNumber: 6,
    title: 'Siding Installation',
    description: 'Install T1-11 siding panels vertically, starting at corners. Cut out door and window openings. Caulk all seams. Paint or stain as desired.',
    estimatedTime: '5-6 hours',
    difficulty: 'medium',
    materialsNeeded: ['mat-006', 'mat-009'],
    cutsNeeded: ['cut-011'],
    toolsNeeded: ['tool-002', 'tool-003', 'tool-005', 'tool-007'],
    safetyNotes: ['safety-002'],
    tips: [
      'Start at corners with full sheets when possible',
      'Mark window/door locations carefully before cutting',
      'Prime cut edges before installation'
    ],
    checkpoints: [
      'All panels are plumb and flush at corners',
      'Openings are correctly sized',
      'Seams are caulked'
    ],
    tags: ['siding', 'exterior']
  },
  {
    id: 'step-007',
    type: 'step',
    stepNumber: 7,
    title: 'Roofing',
    description: 'Install felt paper, then drip edge. Apply shingles starting at eaves, working up to ridge. Install ridge vent at peak. Add ridge cap shingles.',
    estimatedTime: '6-8 hours',
    difficulty: 'medium',
    materialsNeeded: ['mat-007', 'mat-008', 'mat-011', 'mat-017', 'mat-018'],
    toolsNeeded: ['tool-010', 'tool-007', 'tool-011', 'tool-012'],
    safetyNotes: ['safety-003'],
    tips: [
      'Work on cool day - shingles damage easily when hot',
      'Snap chalk lines for straight courses',
      'Seal all exposed nail heads on ridge'
    ],
    checkpoints: [
      'No exposed nails or felt paper',
      'Ridge vent is properly installed',
      'Drip edge extends beyond fascia'
    ],
    tags: ['roofing', 'weatherproofing']
  },
  {
    id: 'step-008',
    type: 'step',
    stepNumber: 8,
    title: 'Doors & Windows',
    description: 'Install pre-hung door unit and window units. Shim for level and plumb. Secure with screws through jambs. Add exterior trim.',
    estimatedTime: '3-4 hours',
    difficulty: 'medium',
    materialsNeeded: ['mat-013', 'mat-014', 'mat-009'],
    toolsNeeded: ['tool-005', 'tool-007', 'tool-008'],
    tips: [
      'Shim at hinge locations for door',
      'Check for level sill on windows',
      'Don\'t overtighten screws - can bow jambs'
    ],
    checkpoints: [
      'Door swings freely without binding',
      'Windows open and close smoothly',
      'Units are weathertight'
    ],
    tags: ['doors-windows', 'installation']
  }
];

// Architecture notes
const architectureNotes: ArchitectureNote[] = [
  {
    id: 'arch-001',
    type: 'architecture',
    title: 'Overall Dimensions',
    category: 'dimensions',
    description: '10ft x 10ft footprint, 8ft wall height, 12ft peak height (gambrel roof). Total 100 sq ft floor space. Roof provides additional usable storage in upper gambrel area.',
    tags: ['dimensions', 'footprint']
  },
  {
    id: 'arch-002',
    type: 'architecture',
    title: 'Gambrel Roof Geometry',
    category: 'design',
    description: 'Two-stage roof pitch: lower slope at 30° (7/12), upper slope at 60° (20/12). Provides maximum headroom and storage. Break occurs at 4ft from wall.',
    tags: ['gambrel', 'roof', 'geometry']
  },
  {
    id: 'arch-003',
    type: 'architecture',
    title: 'Foundation System',
    category: 'foundation',
    description: 'Post & pier foundation with four 4x4 pressure treated posts set 24" deep in concrete. Suitable for level to moderately sloped sites.',
    tags: ['foundation', 'posts']
  },
  {
    id: 'arch-004',
    type: 'architecture',
    title: 'Local Building Codes',
    category: 'regulations',
    description: 'Structure under 120 sq ft typically exempt from permits in many jurisdictions. Verify local setback requirements (usually 5-10ft from property lines). Check HOA restrictions.',
    tags: ['code', 'permits', 'regulations']
  }
];

// Assemble boards
const demoProject: Project = {
  id: 'project-001',
  name: '10x10 Gambrel Shed Office',
  description: 'A compact but functional backyard office with gambrel roof design for maximum headroom and storage. Perfect for remote work, studio space, or workshop.',
  category: 'shed',
  difficulty: 'intermediate',
  estimatedTime: '4-6 weekends',
  estimatedCost: 3500,
  coverImageUrl: '/projects/gambrel-shed.jpg',
  tags: ['office', 'shed', 'gambrel', 'backyard', 'remote-work'],
  createdAt: new Date('2026-07-01'),
  updatedAt: new Date('2026-07-07'),
  status: 'planning',
  boards: [
    {
      id: 'board-001',
      name: 'Materials',
      description: 'Complete materials list with quantities and specifications',
      icon: '📦',
      cardType: 'material',
      cards: materials,
      color: 'cedar',
      order: 1
    },
    {
      id: 'board-002',
      name: 'Cuts',
      description: 'All cuts needed with dimensions and instructions',
      icon: '📏',
      cardType: 'cut',
      cards: cuts,
      color: 'slate',
      order: 2
    },
    {
      id: 'board-003',
      name: 'Tools',
      description: 'Required and optional tools for the build',
      icon: '🔨',
      cardType: 'tool',
      cards: tools,
      color: 'harbor',
      order: 3
    },
    {
      id: 'board-004',
      name: 'Safety',
      description: 'Important safety notes and precautions',
      icon: '⚠️',
      cardType: 'safety',
      cards: safetyNotes,
      color: 'warning',
      order: 4
    },
    {
      id: 'board-005',
      name: 'Instructions',
      description: 'Step-by-step build sequence',
      icon: '📋',
      cardType: 'step',
      cards: instructionSteps,
      color: 'brass',
      order: 5
    },
    {
      id: 'board-006',
      name: 'Architecture',
      description: 'Design specs, dimensions, and regulations',
      icon: '📐',
      cardType: 'architecture',
      cards: architectureNotes,
      color: 'ink',
      order: 6
    }
  ]
};

export default demoProject;
