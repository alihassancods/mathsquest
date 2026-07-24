# MathQuest 🧮✨

A children's mental maths addition game built as a modern React + TypeScript application. Designed to feel like a polished educational game — not a worksheet.

## 🎯 Concept

Players progress through **30 stages** of addition practice on an interactive adventure map. Each stage contains 10 questions. Answer all 10 correctly to unlock the next stage.

### Stage Progression

| Group | Stages | Operation | Range |
|-------|--------|-----------|-------|
| **Add 1** | 1–10 | +1 | Single digit → thousands |
| **Add 2** | 11–20 | +2 | Single digit → thousands |
| **Add 3** | 21–30 | +3 | Single digit → thousands |

## ✨ Features

- **Adventure Map** — Mario-style world map with locked/completed/active stage nodes
- **30 Progressive Stages** — gradually increasing difficulty from 0+1 to 9999+3
- **Visual Questions** — fruit, animal, and item-based illustrations for early stages
- **Score System** — XP, coins, streaks, and levels with animated feedback
- **Encouraging Feedback** — celebrate correct answers, gentle "try again" on mistakes
- **Confetti & Animations** — stage completion celebrations with particles and effects
- **Persistent Progress** — everything saved to localStorage
- **Child-Friendly Design** — bright colors, rounded shapes, friendly typography, no punishment
- **Fully Offline** — no backend, no authentication, no data collection

## 🛠 Tech Stack

- **React 18** — functional components with hooks
- **TypeScript** — strict mode
- **React Router v6** — client-side routing
- **Vite** — fast build tool
- **CSS Custom Properties** — design system tokens, no CSS framework

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## 🗺 Routes

| Path | Page |
|------|------|
| `/` | Adventure Map — stage selection |
| `/stage/:id` | Question screen — 10 questions per stage |
| `/completed` | Stage completion celebration |

## 📁 Project Structure

```
src/
├── components/     # Reusable UI components (TopBar, StageNode, QuestionCard, etc.)
├── pages/          # Route-level page components
├── hooks/          # Custom React hooks (useProgress)
├── types/          # TypeScript interfaces
├── utils/          # Utilities (question generator, localStorage helper)
├── data/           # Stage definitions
├── router/         # Route configuration
├── index.css       # Global styles & design tokens
├── App.tsx         # Root component
└── main.tsx        # Entry point
```

## 🎨 Design

Built from a "Tactile-Playful Hybrid" design philosophy:

- **Colors** — Confectionary palette: sky blue, sunshine yellow, fresh green
- **Typography** — Nunito Sans (weights 600–900), rounded and legible
- **Shapes** — No sharp corners; super-ellipses and pill shapes
- **Depth** — Faux-3D "juicy" buttons, soft colored shadows
- **Animations** — Floating islands, sparkle particles, confetti celebrations

## 📦 Dependencies

Minimal by design. Only React, React Router, and TypeScript.

---

Built with ❤️ for young learners.
