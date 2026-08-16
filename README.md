# BuildWorld AI — Local-First Systems Simulation Lab

**Systems Simulation Lab by David Turner · [atomicdjt](https://github.com/atomicdjt)**

BuildWorld AI is a local-first visual systems-simulation lab for designing, running, comparing, and reporting graph-based models of complex systems. It focuses on bottlenecks, cascading failures, resilience, optimization, and emergent behavior while staying clear that the results are educational and exploratory—not certified predictions or professional advice.

[Live demo](https://buildworld-ai-v01-improvements.vercel.app/) · [Case study](./CASE_STUDY.md) · [Architecture](./ARCHITECTURE.md) · [Methodology](./METHODOLOGY.md) · [Testing](./TESTING.md) · [Full portfolio](https://ai-project-portfolio-portfolio-hub.vercel.app/)

![BuildWorld AI systems simulation studio](https://ai-project-portfolio-portfolio-hub.vercel.app/images/buildworld-ai-studio.png)

**More by David Turner:** [WeaveStudio](https://github.com/atomicdjt/weavestudio) · [Validation Ledger](https://github.com/atomicdjt/validation-ledger) · [GitHub profile](https://github.com/atomicdjt)

## Source of truth

This repository is the authoritative source for the current standalone BuildWorld AI product. The AI Project Portfolio monorepo may contain a review copy, but product development, release evidence, and canonical documentation are maintained here on `main`.

Generated deployments, screenshots, and reports are outputs of this source and do not supersede the repository.

## Features

- Interactive Simulation Studio with draggable graph nodes, editable properties, run/pause/reset controls, speed control, and live metrics.
- Eight built-in demo scenarios: traffic, supply chain, power grid, ecosystem, warehouse, epidemic/population, emergency resilience, and a blank custom network.
- Deterministic simulation engines for flow networks, ecosystem dynamics, epidemic/population models, and cascade stress experiments.
- SSI System Stability Index: an original 0–100 score across throughput, bottleneck risk, resilience, redundancy, cascade resistance, resource balance, recovery, and optimization potential.
- Dashboard charts, event logs, critical-node analysis, optimization suggestions, snapshot comparison, Markdown/JSON report export, local save/load, project import/export, and print-to-PDF support.
- No paid AI API is required. The insight layer is deterministic and local.
- Reproducible reports record model version, seed, input fingerprint, and multi-seed uncertainty ranges.
- Named variants preserve baseline/alternative reasoning and expose changed graph inputs.

## Tech Stack

- React, TypeScript, and Vite
- Custom SVG/CSS visualizations
- Browser `localStorage` persistence
- Vitest for pure simulation-logic tests
- Canonical static deployment on Vercel

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

The GitHub Actions workflow runs the same checks on pushes and pull requests. Passing these checks establishes the recorded build and test result; it does not certify the model for engineering, public-health, infrastructure, financial, or safety-critical decisions.

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

BuildWorld AI is not a certified engineering model, public-health tool, infrastructure-design recommendation system, ecological forecast, financial tool, or safety-critical decision system. It is intended for education, portfolio review, scenario reasoning, and product exploration. Its SSI, intervention suggestions, and multi-seed ranges are deterministic heuristics based on user-provided assumptions.

## Deployment

For a static deployment:

```bash
npm run build
```

Deploy the generated `dist/` directory through Vercel for the canonical public release. The current live demo is deployed from `main`; record the source commit used for each production deployment so the public experience remains traceable. The static output can also be hosted elsewhere for private evaluation, but those hosts are not the current canonical deployment.

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
