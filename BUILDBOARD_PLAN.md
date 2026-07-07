# BuildBoard Development Plan

## Priority 1: BuildBoard MVP (Weeks 1-2)

### Phase 1.1: Project Setup
**Location:** Create new directory `buildboard/` at Desktop level

```bash
mkdir ~/Desktop/buildboard
cd ~/Desktop/buildboard
npm create next-app@latest . --typescript --tailwind --app --no-src-dir
git init
```

**Initial Structure:**
```
buildboard/
├── app/
│   ├── page.tsx                 # Landing page
│   ├── projects/
│   │   └── [projectId]/
│   │       ├── page.tsx        # Project workspace
│   │       └── boards/
│   │           └── [boardId]/
│   │               └── page.tsx
│   └── style-guide/
│       └── page.tsx
├── components/
│   ├── boards/
│   │   ├── MasonryBoard.tsx
│   │   └── BoardCard.tsx
│   ├── cards/
│   │   ├── MaterialCard.tsx
│   │   ├── CutCard.tsx
│   │   ├── ToolCard.tsx
│   │   ├── SafetyCard.tsx
│   │   └── StepCard.tsx
│   └── ui/
│       ├── Badge.tsx
│       └── Card.tsx
├── data/
│   └── demo-project.ts
├── lib/
│   └── types.ts
└── public/
    └── screenshots/
```

### Phase 1.2: Core Data Models (Day 1)

Create `lib/types.ts`:

```typescript
export type Project = {
  id: string;
  title: string;
  subtitle: string;
  description: string;
  status: "planning" | "in-progress" | "paused" | "complete";
  estimatedCost: number;
  totalCuts: number;
  totalMaterials: number;
  progress: number;
  boards: Board[];
};

export type Board = {
  id: string;
  projectId: string;
  title: string;
  type: "lumber" | "cuts" | "tools" | "instructions" | 
        "safety" | "architecture" | "shopping";
  description: string;
  itemCount: number;
};

export type Material = {
  id: string;
  projectId: string;
  name: string;
  category: "lumber" | "sheet-goods" | "fasteners" | "hardware" | "finish";
  dimensions?: string;
  quantity: number;
  unit: string;
  usedFor: string[];
  relatedCutIds: string[];
  productLinks: ProductLink[];
};

export type Cut = {
  id: string;
  projectId: string;
  materialId: string;
  label: string;
  length: string;
  quantity: number;
  usedIn: string;
  stepId?: string;
  status: "planned" | "cut" | "installed";
  notes?: string;
};

export type InstructionStep = {
  id: string;
  projectId: string;
  order: number;
  title: string;
  description: string;
  relatedCutIds: string[];
  relatedToolIds: string[];
  safetyNoteIds: string[];
  status: "not-started" | "active" | "done";
};

export type SafetyNote = {
  id: string;
  projectId: string;
  title: string;
  severity: "low" | "medium" | "high";
  description: string;
  relatedStepIds: string[];
};

export type Tool = {
  id: string;
  name: string;
  category: string;
  usedInSteps: string[];
};

export type ProductLink = {
  id: string;
  label: string;
  retailer: string;
  url: string;
  priceEstimate?: number;
};
```

### Phase 1.3: Demo Data (Day 1-2)

Create `data/demo-project.ts` with the **10x10 Gambrel Shed Office**:
- 18 materials (2x4s, plywood, shingles, etc.)
- 40+ cuts with dimensions
- 12 tools
- 8 safety notes
- 15 instruction steps
- 7 boards (Lumber, Cuts, Tools, Safety, Instructions, Architecture, Shopping)

### Phase 1.4: Key Components (Days 2-4)

**Priority components:**
1. **MasonryBoard.tsx** - Pinterest-style grid layout
2. **MaterialCard.tsx** - Shows material with quantity, cuts, links
3. **CutCard.tsx** - Cut dimensions, status, usage
4. **SafetyCard.tsx** - Safety warnings with severity
5. **StepCard.tsx** - Instruction steps with connections

### Phase 1.5: Core Pages (Days 4-7)

1. **Landing page** (`app/page.tsx`)
   - Hero: "From inspiration to execution"
   - Problem statement
   - Feature preview
   - CTA: "View Demo Project"

2. **Project workspace** (`app/projects/[projectId]/page.tsx`)
   - Project hero with stats
   - Board navigation grid
   - Progress indicators

3. **Board views** (`app/projects/[projectId]/boards/[boardId]/page.tsx`)
   - Masonry layout
   - Filtered cards by board type
   - Related content links

### Phase 1.6: Visual Design (Days 5-7)

**Design System:**
- **Colors:** Warm cream (paper), Deep green-black (ink), Muted green-gray (harbor), 
            Warm wood brown (cedar), Coastal blue-gray (slate), Muted gold (brass)
- **Fonts:** Clean sans-serif (system fonts to start)
- **Feel:** Pinterest meets architectural field notebook meets New England workshop

**Tailwind config:**
```javascript
theme: {
  extend: {
    colors: {
      paper: '#F5F1E8',
      ink: '#1A2E1E',
      harbor: '#6B7F7A',
      cedar: '#8B6F47',
      slate: '#5D7B8C',
      brass: '#B8956A'
    }
  }
}
```

### Phase 1.7: Product Storytelling (Day 7)

Create comprehensive `README.md` following the PDF template:
- Product vision
- Problem/solution
- Key features
- Data model
- User flows
- Design system
- Tech stack
- What you learned

---

## Priority 2: Website Updates (Weeks 3-4)

### dcbarletta.com Updates

**Homepage rewrite:**
```
Hero: "I build worlds, tools, and visual systems for exploring complex ideas"

About: "Author, product-minded technical builder, and visual systems thinker"

Featured Work (3 large cards):
1. BuildBoard - Visual construction planning app
2. Scientific Data Dashboard - Data communication system
3. World of Tethys Platform - Interactive world archive
```

**Key changes:**
- Remove "self-taught developer" language
- Add "Product Work" section
- Create case study pages for BuildBoard, Dashboard, Tethys
- Add resume CTA
- Frame background as advantage, not scattered path

**New pages needed:**
- `/work` - Product projects overview
- `/work/buildboard` - BuildBoard case study
- `/work/dashboard` - Scientific dashboard case study  
- `/work/tethys` - Tethys platform case study

### worldoftethys.com Updates

**Homepage rewrite:**
```
Hero: "A lost Earth. A living archive. A world built under predation."

Position as: "A natural-history archive for a lost Earth where humans 
evolved under predation"

NOT just: "Book companion website"
```

**Product features to add:**
1. **Start Here page** - New reader onboarding
2. **Visual Discovery Grid** - Pinterest-style exploration
3. **Interactive Map** - Clickable regions
4. **Archive Entry System** - Structured creature/faction/region pages
5. **Spoiler System** - Clear labeling
6. **Related Content Engine** - Smart connections

**Key changes:**
- Frame as "visual discovery platform"
- Add "Explore" mode with filters
- Create archive entry template
- Add Reader Recap for Book Two prep
- Position as product system, not wiki

---

## Execution Timeline

### Week 1: BuildBoard Foundation
- **Days 1-2:** Project setup, data models, demo data
- **Days 3-4:** Core components (cards, board layout)
- **Days 5-7:** Landing page, project workspace

### Week 2: BuildBoard Polish
- **Days 8-9:** Board views, masonry layout
- **Days 10-11:** Visual design refinement
- **Days 12-14:** Product documentation, screenshots, README

### Week 3: dcbarletta.com
- **Days 15-17:** Homepage rewrite, featured work section
- **Days 18-21:** Case study pages (BuildBoard, Dashboard, Tethys)

### Week 4: worldoftethys.com  
- **Days 22-24:** Homepage rewrite, Start Here page
- **Days 25-28:** Archive system, discovery grid

---

## Success Criteria

### BuildBoard MVP
✅ Demo project with real shed data  
✅ 7 functional boards with masonry layout  
✅ Material/Cut/Tool/Safety cards working  
✅ Visual design matches New England workshop aesthetic  
✅ Product-focused README with case study  
✅ Deployed to Vercel  
✅ Screenshots for portfolio

### Website Updates
✅ dcbarletta.com positions you as product-minded builder  
✅ Featured work section showcases 3 projects with product angle  
✅ worldoftethys.com feels like discovery platform, not just book site  
✅ Both sites avoid "self-taught" / "aspiring" language  
✅ Clear CTAs for hiring teams and readers

---

## Immediate Next Step

```bash
cd ~/Desktop
mkdir buildboard
cd buildboard
npm create next-app@latest . --typescript --tailwind --app --no-src-dir
```

Then create the type definitions and start building the demo data.

**Focus:** Get BuildBoard to a portfolio-ready state FIRST, then update websites to showcase it alongside your other work.
