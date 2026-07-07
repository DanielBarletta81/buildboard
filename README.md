# BuildBoard

A visual construction planning app that bridges the gap between Pinterest inspiration and execution. Built for DIY builders who want to organize materials, cuts, tools, safety notes, and step-by-step instructions in a beautiful, Pinterest-inspired interface.

## 🎯 Product Vision

BuildBoard transforms the way DIY builders plan projects. Instead of scattered notes, spreadsheets, and bookmarks, everything lives in visual boards that make complex builds feel manageable and exciting.

**The Problem:** DIY builders save inspiring photos on Pinterest, but struggle to translate those dreams into actionable plans. Planning a shed or deck requires tracking dozens of materials, hundreds of cuts, safety considerations, and sequential steps—all while staying on budget.

**The Solution:** BuildBoard organizes construction projects into visual boards (Materials, Cuts, Tools, Safety, Instructions, Architecture) with Pinterest-style cards that connect inspiration to execution.

## 🏗️ Demo Project: 10x10 Gambrel Shed Office

The current demo showcases a complete build plan for a backyard office:

- **📦 Materials Board:** 18 materials with specifications, quantities, costs, suppliers
- **📏 Cuts Board:** 40+ cuts with dimensions, angles, difficulty ratings, tool requirements
- **🔨 Tools Board:** 12 tools categorized by type with safety ratings and alternatives
- **⚠️ Safety Board:** 8 critical safety notes organized by severity
- **📋 Instructions Board:** 8 sequential steps with time estimates, tips, checkpoints
- **📐 Architecture Board:** Design specs, dimensions, and regulatory information

**Total Project Cost:** ~$3,500  
**Estimated Time:** 4-6 weekends  
**Difficulty:** Intermediate

## 🎨 Design System: New England Workshop

BuildBoard uses a warm, craftsman-inspired palette that evokes workshops and architectural field notebooks:

- **Paper** (`#F5F1E8`): Warm cream background
- **Ink** (`#1A2E1F`): Deep green-black for primary text
- **Harbor** (`#758A83`): Muted green-gray for secondary elements
- **Cedar** (`#A67C52`): Warm wood brown for accents
- **Slate** (`#5A6B7D`): Coastal blue-gray for interactive elements
- **Brass** (`#B8956A`): Muted gold for highlights
- **Fog** (`#E8E4DC`): Light neutral for cards

Visual aesthetic: Pinterest meets architectural notebook.

## 🛠️ Tech Stack

- **Framework:** Next.js 16 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS v4
- **Layout:** react-masonry-css (Pinterest-style responsive grid)
- **Data:** Mock data (demo project)
- **Deployment:** Ready for Vercel

## 📂 Project Structure

```
buildboard/
├── app/
│   ├── globals.css          # Design system & Tailwind config
│   ├── layout.tsx
│   └── page.tsx              # Main entry point
├── components/
│   ├── MasonryBoard.tsx      # Pinterest-style grid layout
│   ├── ProjectWorkspace.tsx  # Board navigation & search
│   └── cards/
│       ├── MaterialCard.tsx
│       ├── CutCard.tsx
│       ├── ToolCard.tsx
│       ├── SafetyCard.tsx
│       ├── StepCard.tsx
│       └── ArchitectureCard.tsx
├── data/
│   └── demo-project.ts       # 10x10 Gambrel Shed data
├── lib/
│   └── types.ts              # TypeScript definitions
└── package.json
```

## 🚀 Getting Started

### Installation

```bash
cd ~/Desktop/buildboard
npm install
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
npm start
```

## 🎯 Key Features

### 1. **Visual Board System**
Six specialized boards organize every aspect of a build:
- Materials with cost tracking
- Cuts with angle specifications
- Tool requirements with alternatives
- Safety notes by severity
- Step-by-step instructions with checkpoints
- Architecture & design specifications

### 2. **Pinterest-Style Masonry Layout**
Responsive grid automatically arranges cards by content height. Desktop shows 4 columns, tablet 2, mobile stacks single column.

### 3. **Intelligent Card Types**
Each card type has custom styling and data fields:
- **Materials:** Dimensions, cost, supplier, related cuts
- **Cuts:** Angle cuts, difficulty, tool requirements
- **Tools:** Safety ratings, required vs. optional, alternatives
- **Safety:** Severity-based color coding (caution/warning/danger)
- **Steps:** Sequential numbering, time estimates, pro tips, checkpoints
- **Architecture:** Design specifications, regulations, dimensions

### 4. **Search & Filter**
Real-time search across all cards in active board.

### 5. **Cost Tracking**
Materials include pricing; project header shows estimated total cost.

### 6. **Difficulty & Time Estimates**
Projects, steps, and cuts labeled with difficulty ratings and time estimates.

## 📊 Data Model

The type system supports rich, interconnected project data:

```typescript
Project → Boards → Cards

Card Types:
- Material: lumber, fasteners, hardware, roofing
- Cut: dimensions, angles, tools needed, difficulty
- Tool: power/hand/measuring, safety rating, alternatives
- SafetyNote: severity levels, related tools/steps
- InstructionStep: sequential, materials/tools/safety refs
- ArchitectureNote: dimensions, design, regulations
```

## 🎯 Product Positioning

### For Portfolio/Interview Context

**Product Thinking Demonstrated:**
1. **Problem-Solution Clarity:** Identified real pain point (Pinterest inspiration ↔️ execution gap)
2. **Information Architecture:** Six-board system reflects builder mental model
3. **Visual Discovery:** Masonry layout makes scanning hundreds of items manageable
4. **Progressive Disclosure:** Cards show critical info at a glance, full details on demand
5. **User Safety:** Safety notes prominently displayed with severity-based visual hierarchy

**Design Decisions:**
- New England workshop aesthetic aligns with target user (serious DIY builders)
- Card-based UI familiar from Pinterest reduces learning curve
- Relationship tracking (materials → cuts, steps → tools) anticipates future features

**Technical Execution:**
- TypeScript provides type safety for complex data relationships
- Component architecture enables future card types (shopping, progress tracking)
- Mock data structure designed for easy backend integration
- Responsive design from mobile-first approach

## 🔮 Future Enhancements

**Phase 2 Features (Not Yet Implemented):**
- [ ] User accounts & project library
- [ ] Project templates marketplace
- [ ] Shopping cart integration (Home Depot/Lowes APIs)
- [ ] Progress tracking (mark steps complete, upload photos)
- [ ] Export to PDF cut list
- [ ] Material cost calculator with regional pricing
- [ ] Community sharing & remixing
- [ ] AR visualization for cuts/assembly
- [ ] Integration with measurement apps

**Phase 3 (Advanced):**
- [ ] AI-powered project generation from photos
- [ ] Supplier inventory checking
- [ ] Time-lapse build documentation
- [ ] Collaboration features for group builds
- [ ] Contractor marketplace

## 📝 Development Notes

### Adding New Card Types
1. Define type in `lib/types.ts`
2. Create card component in `components/cards/`
3. Add rendering logic to `MasonryBoard.tsx`
4. Update board configuration in project data

### Customizing Design System
Edit CSS variables in `app/globals.css`:
```css
:root {
  --paper: #F5F1E8;
  --ink: #1A2E1F;
  /* ... */
}
```

### Creating New Projects
Follow structure in `data/demo-project.ts`:
1. Define materials, cuts, tools, safety notes, steps
2. Organize into boards
3. Create project metadata

## 👤 Author

**Daniel Barletta**  
Product-minded builder | Author | Software Engineer  

Building tools that help people create.

---

**License:** MIT  
**Status:** Demo/Portfolio Project  
**Last Updated:** July 7, 2026
