# BuildWorld AI — Reproducible Systems Simulation Lab

**Explore bottlenecks, cascades, resilience, and interventions in graph-based systems—and reproduce the result from the recorded model version, seed, and inputs.**

**[Canonical project page](https://ai-project-portfolio-portfolio-hub.vercel.app/projects/buildworld-ai) · [Launch the live simulation lab](https://buildworld-ai-v01-improvements.vercel.app/) · [Methodology](./METHODOLOGY.md) · [Architecture](./ARCHITECTURE.md) · [Testing](./TESTING.md)**

BuildWorld AI is a browser-based systems simulation lab for designing, running, comparing, and reporting graph models of complex systems. Its core simulation and insight layer is deterministic: no paid AI API is required to run or explain a scenario.

### Why it is interesting

- **Reproducibility is explicit.** Reports record model version, seed, input fingerprint, and multi-seed ranges.
- **Cascades are inspectable.** The studio exposes critical nodes, bottlenecks, failures, recovery, and intervention effects rather than returning a black-box answer.
- **Scenarios are editable.** Eight built-in examples cover traffic, supply chains, power grids, ecosystems, warehouses, epidemics/population, emergency resources, and a blank custom network.
- **The SSI heuristic is documented.** The System Stability Index is an original, inspectable 0–100 heuristic—not a claim of scientific certification or predictive truth.
- **Everything runs in the browser.** The standard workflow is local-first and does not require cloud infrastructure.

![BuildWorld AI systems simulation studio](https://ai-project-portfolio-portfolio-hub.vercel.app/images/buildworld-ai-studio.png)

> **Technical critique wanted:** where can the visualization imply structure that the underlying model does not contain? Where do the SSI dimensions or intervention suggestions create false confidence? Concrete counterexamples are more useful than praise.

**Built by David Turner · [atomicdjt](https://github.com/atomicdjt)**

## What it is for

BuildWorld AI is intended for education, portfolio review, scenario reasoning, systems-thinking exercises, and product exploration. It is useful when someone wants to vary an explicit graph model and inspect how the modeled system responds.

It is **not** a certified engineering simulator, public-health model, infrastructure-design recommendation system, ecological forecast, financial model, or safety-critical decision system.

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

## Reproducibility contract

A BuildWorld result should be treated as a result **of the recorded model and assumptions**, not as an observation of the external world.

Reports preserve the information needed to inspect a run:

- model/version identifier;
- random seed where the model uses seeded variation;
- input fingerprint;
- graph inputs and named variants;
- derived metrics and SSI output;
- multi-seed ranges where supported.

If two people use materially different assumptions, topology, parameters, or model versions, their results are not interchangeable merely because the scenario has the same name.

## Tech Stack

- React, TypeScript, and Vite
- Custom SVG/CSS visualizations
- Browser `localStorage` persistence
- Vitest for pure simulation-logic tests
- Canonical static deployment on Vercel

## Quick Start

Prerequisite: Node.js 22 or later.

```bash
git clone https://github.com/atomicdjt/buildworld-ai.git
cd buildworld-ai
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

The GitHub Actions workflow runs the same checks on pushes and pull requests. Passing these checks establishes the recorded software/test result; it does not certify the underlying model for real-world engineering, health, infrastructure, financial, ecological, or safety-critical decisions.

## Demo Scenarios

- Small City Traffic Bottleneck
- Regional Supply Chain Disruption
- Neighborhood Power Grid Failure
- Forest Ecosystem Balance
- Warehouse Throughput Optimization
- Disease Spread in Connected Communities
- Emergency Shelter Resource Network
- Custom Blank Network

## Responsible-use boundary

The simulator intentionally makes assumptions visible, but visibility is not validation. The SSI, intervention suggestions, and multi-seed ranges are deterministic heuristics based on user-provided assumptions and the implemented model.

A visualization can also create perceptual meaning that is not encoded by the model—for example, spatial proximity or layout may look semantically meaningful even when position is only presentational. Treat the graph as an interface to the model, not as independent evidence about the modeled system.

## Deployment

For a static deployment:

```bash
npm run build
```

Deploy the generated `dist/` directory through Vercel for the canonical public release. The current live demo is deployed from `main`; record the source commit used for each production deployment so the public experience remains traceable.

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

## More projects

[Canonical BuildWorld AI page](https://ai-project-portfolio-portfolio-hub.vercel.app/projects/buildworld-ai) · [Validation Ledger](https://github.com/atomicdjt/validation-ledger) · [WeaveStudio](https://github.com/atomicdjt/weavestudio) · [GitHub profile](https://github.com/atomicdjt) · [Full portfolio](https://ai-project-portfolio-portfolio-hub.vercel.app/)
