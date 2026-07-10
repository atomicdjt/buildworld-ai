# BuildWorld AI

BuildWorld AI is a visual systems-simulation lab for designing, running, comparing, and reporting graph-based models of complex systems. It focuses on bottlenecks, cascading failures, resilience, optimization, and emergent behavior while staying clear that the results are educational and exploratory.

[Live demo](https://buildworld-ai.netlify.app/) · [Case study](./CASE_STUDY.md) · [Architecture](./ARCHITECTURE.md) · [Methodology](./METHODOLOGY.md) · [Testing](./TESTING.md)

## Features

- Interactive Simulation Studio with draggable graph nodes, editable properties, run/pause/reset controls, speed control, and live metrics.
- Eight built-in demo scenarios: traffic, supply chain, power grid, ecosystem, warehouse, epidemic/population, emergency resilience, and a blank custom network.
- Deterministic simulation engines for flow networks, ecosystem dynamics, epidemic/population models, and cascade stress experiments.
- SSI System Stability Index: an original 0–100 score across throughput, bottleneck risk, resilience, redundancy, cascade resistance, resource balance, recovery, and optimization potential.
- Dashboard charts, event logs, critical-node analysis, optimization suggestions, snapshot comparison, Markdown/JSON report export, local save/load, project import/export, and print-to-PDF support.
- No paid AI API is required. The insight layer is deterministic and local.

## Tech Stack

- React, TypeScript, and Vite
- Custom SVG/CSS visualizations
- Browser `localStorage` persistence
- Vitest for pure simulation-logic tests
- Static deployment on Netlify or Vercel

## Quick Start

Prerequisite: Node.js 22 or later.

```bash
npm ci
npm run dev
```

Open the local Vite URL shown in the terminal, usually `http://127.0.0.1:5173`.

## Verification

```bash
npm run lint
npm run typecheck
npm run test
npm run build
```

The GitHub Actions workflow runs the same checks on pushes and pull requests.

## Demo Scenarios

- Small City Traffic Bottleneck
- Regional Supply Chain Disruption
- Neighborhood Power Grid Failure
- Forest Ecosystem Balance
- Warehouse Throughput Optimization
- Disease Spread in Connected Communities
- Emergency Shelter Resource Network
- Custom Blank Network

## Responsible-Use Boundary

BuildWorld AI is not a certified engineering model, public-health tool, infrastructure-design recommendation system, ecological forecast, financial tool, or safety-critical decision system. It is intended for education, portfolio review, scenario reasoning, and product exploration.

## Deployment

For a static deployment:

```bash
npm run build
```

Deploy the generated `dist/` directory to Netlify, Vercel, or an equivalent static host. No environment variables are required for the current MVP.

## Documentation

- [Case study](./CASE_STUDY.md)
- [Architecture](./ARCHITECTURE.md)
- [Methodology](./METHODOLOGY.md)
- [Deployment notes](./DEPLOYMENT.md)
- [Testing notes](./TESTING.md)
- [Roadmap](./ROADMAP.md)
- [Contributing](./CONTRIBUTING.md)
- [Security policy](./SECURITY.md)
- [License](./LICENSE.md)
