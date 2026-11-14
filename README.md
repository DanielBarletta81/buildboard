```text
BuildBoard — From Inspiration to a Workable Plan
```

**A visual construction-planning prototype that turns a DIY project into organized materials, cuts, tools, safety guidance, tasks and cost tracking.**

[Repository](https://github.com/DanielBarletta81/buildboard) · [Feature walkthrough](FEATURE_SHOWCASE.md) · [Implementation notes](IMPLEMENTATION_SUMMARY.md)

> **Status:** Interactive, single-project portfolio prototype using demonstration data and browser-local persistence. It is **not** a certified construction plan, purchasing service, multi-user platform, or source of authoritative engineering/code compliance advice.

## The problem

DIY builders often begin with a photo or a saved idea. Turning that idea into a real project requires a different set of information: dimensions, materials, cuts, tool choices, safe sequencing, budget, and a record of what has actually been done.

BuildBoard investigates a practical product question:

> **Can a visual, approachable interface retain the inspiration of an idea board while giving the builder a usable sequence of work?**

I developed the concept from firsthand experience in carpentry and construction. The interface reflects how a builder moves between the big picture and individual details: first understand the structure, then buy, cut, assemble, check and revise.

## Explore the demo

The supplied demonstration project is a **10 × 10 ft gambrel-roof shed office**. Its materials, quantities, cut lists, prices and times are **example planning data**, not field-verified instructions or current supplier quotes.

A typical workflow:

1. Open the project and choose a board: **Materials, Cuts, Tools, Safety, Instructions, or Architecture**.
2. Search and filter the relevant cards, inspecting details rather than scrolling through one enormous checklist.
3. Add materials to the shopping list and review them grouped by supplier.
4. Mark items complete as work progresses; watch the dashboard and board indicators update.
5. Record actual material costs and compare spending against the project estimate.
6. Return later: project progress is persisted in the browser using `localStorage`.

### Project experience

| Feature                   | Implementation in repository                         | User benefit                                                    |
| ------------------------- | ---------------------------------------------------- | --------------------------------------------------------------- |
| Six visual boards         | Typed card models and reusable React card components | Separates different kinds of construction information           |
| Masonry-style layout      | `MasonryBoard.tsx` and `react-masonry-css`           | Makes varied card content easier to browse                      |
| Completion tracking       | `useProjectState` hook and interactive cards         | Shows which tasks or purchases remain                           |
| Progress dashboard        | `ProgressDashboard.tsx`                              | Summarizes status across boards                                 |
| Shopping list             | `ShoppingList.tsx`                                   | Gathers selected materials and organizes by supplier            |
| Actual cost tracking      | Per-card state and project totals                    | Makes estimated-versus-recorded spending visible                |
| Search and status filters | Workspace controls                                   | Reduces visual noise during a particular phase of work          |
| Browser persistence       | `localStorage`                                       | Restores progress on the same browser/device without an account |

These features are described in the repository's implementation notes. This README does not claim an independent browser acceptance test or accessibility audit.

## Information architecture and state

```text
Demo project
   |
   +-- Project metadata and budget
   +-- Boards
   |     +-- Materials  +-- Cuts  +-- Tools
   |     +-- Safety     +-- Instructions  +-- Architecture
   |                    |
   |                    +--> typed cards / related information
   |
   +-- Local project state
         +-- completion and timestamps
         +-- shopping selections
         +-- actual material cost
         +-- progress and budget summaries
```

The **project data** and **user progress** are separate. The demo specification is defined in [`data/demo-project.ts`](data/demo-project.ts); mutable per-user state is managed by [`lib/hooks/useProjectState.ts`](lib/hooks/useProjectState.ts). This makes it possible to extend card types without embedding user progress directly into the demonstration dataset.

### Product decisions and trade-offs

**Visual boards instead of one master list.** A builder needs different information while estimating materials than while using tools or following assembly steps. Separate boards keep each working context readable.

**Non-destructive completion.** A checked-off card remains visible, which matters when a builder needs to recheck a dimension or purchase.

**Local-first persistence.** `localStorage` keeps the prototype lightweight and quick to demonstrate. The trade-offs are explicit: no account synchronization, shared team workspace, or durable server-side backup.

**Typed card models.** Materials, cuts, tools, safety notes and instructions have different fields. A discriminated card model makes those differences explicit and gives the UI room to grow.

**Separate estimated and actual costs.** Estimates are planning assumptions; recorded costs reflect what a user enters. The application should not present either as live supplier pricing.

## Stack

- Next.js 16 (App Router), React 19, TypeScript
- Tailwind CSS 4 and custom design tokens
- `react-masonry-css` for responsive card arrangements
- React hooks and browser `localStorage` for prototype state
- Local, typed demonstration data; no application database or remote purchasing API

See [`package.json`](package.json) for precise versions and commands.

## Run locally

```bash
git clone https://github.com/DanielBarletta81/buildboard.git
cd buildboard
npm ci
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

```bash
npm run lint
npm run build
npm start
```

These commands come from the published scripts. Their current passing status was **not independently verified** in this README review. There is no automated `test` script declared in the inspected root package manifest.

## Code tour

| File or folder                                                         | Responsibility                                       |
| ---------------------------------------------------------------------- | ---------------------------------------------------- |
| [`app/page.tsx`](app/page.tsx)                                         | Application entry point                              |
| [`components/ProjectWorkspace.tsx`](components/ProjectWorkspace.tsx)   | Board selection, filtering and interactive workspace |
| [`components/MasonryBoard.tsx`](components/MasonryBoard.tsx)           | Responsive card rendering                            |
| [`components/cards`](components/cards)                                 | Card implementations for different work domains      |
| [`components/ProgressDashboard.tsx`](components/ProgressDashboard.tsx) | Progress and budget summaries                        |
| [`components/ShoppingList.tsx`](components/ShoppingList.tsx)           | Shopping selections and supplier grouping            |
| [`lib/hooks/useProjectState.ts`](lib/hooks/useProjectState.ts)         | Browser-persisted state operations                   |
| [`lib/types.ts`](lib/types.ts)                                         | TypeScript data contracts                            |
| [`data/demo-project.ts`](data/demo-project.ts)                         | Example shed-office project                          |

For more detailed usage and UI states, see [Interactive Features](INTERACTIVE_FEATURES.md), [Feature Showcase](FEATURE_SHOWCASE.md), and [Implementation Summary](IMPLEMENTATION_SUMMARY.md).

## Design language

**New England Workshop** uses warm paper tones, dark green ink, slate, cedar and brass accents—closer to a field notebook and workshop plan than a conventional project-management spreadsheet. Card hierarchy is designed to reveal important quantities and next actions first, with further details available inside each board.

The visual style supports the goal, but a restrained interface is only successful if it remains readable for keyboard, mobile and assistive-technology users. Those experiences require explicit testing.

## What this demonstrates

BuildBoard is a focused example of **domain-informed UI and product development**. It turns construction knowledge into a navigable data model and an interactive application, while keeping prototype assumptions visible. The transferable engineering concerns—data modeling, progressive disclosure, state management, cost feedback and usable workflows—also matter in research dashboards, field-operations software and scientific outreach tools.

## Limitations and roadmap

### Current limitations

- Single demonstration project; no user account, shared project library or cloud persistence.
- Demonstration prices and quantities; no verified supplier inventory, quotes or permitting data.
- No confirmed cross-browser, mobile-device or assistive-technology test report accompanying this README.
- No independent structural-design review. **Do not build from demo dimensions without qualified review and local code checks.**
- No automated unit or end-to-end test script in the inspected package manifest.

### Potential next milestones

- Import or create additional projects without editing source files.
- Introduce project-data validation and tests for progress and budget calculations.
- Add printable cut lists and material summaries with clear assumption labels.
- Test keyboard use, focus order, touch targets and screen-reader announcements.
- Explore optional collaboration and cloud synchronization after the single-user workflow is stable.

## Related work

- [Evergreen Documentation](https://github.com/DanielBarletta81/evergreen-docs) — spatial property stewardship and long-horizon landscape planning
- [Microsat Atlas](https://github.com/DanielBarletta81/microsat-atlas) — custom scientific visualization and map interaction
- [NOAA Signals Lab](https://github.com/DanielBarletta81/noaa-signals-lab) — validated environmental data and clear interpretation boundaries

**Created by Daniel C. Barletta** — construction professional, scientific researcher and software developer interested in turning specialist knowledge into approachable tools.
