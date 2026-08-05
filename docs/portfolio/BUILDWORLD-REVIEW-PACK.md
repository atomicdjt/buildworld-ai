# BuildWorld AI reviewer pack

## Case study

BuildWorld AI is a local-first, graph-based systems-simulation demonstrator for
exploring bottlenecks, cascading failure, resilience, and intervention tradeoffs.
The workflow is deliberately transparent: select a synthetic scenario, change
assumptions, run deterministic ticks or a focused cascade experiment, inspect
the System Stability Index (SSI) and supporting metrics, then export a report or
project file. It is implemented as a React/TypeScript/Vite single-page app with
typed graph models and pure simulation modules. It needs no account, API key, or
backend for the demonstrated workflow.

Local evidence at remediation commit `c51bee2aeadb3659bb09d99b2666a42424e62121`:

- `npm run lint`, `npm run typecheck`, `npm test` (12 tests), and `npm run build`
  passed on 2026-08-05.
- A Chromium smoke check loaded the landing page, opened the Studio, started a
  run, and observed its `Pause` state at 1440x960 and 390x844 with no captured
  application console warnings or errors.

This evidence demonstrates deterministic local behavior, not real-world model
accuracy, customer adoption, operational outcomes, engineering certification,
or deployment/source alignment.

## 60-120 second walkthrough and shot list

1. **0-12s — orientation.** Open the landing page and state that the app is an
   exploratory simulation lab, not a forecast or professional decision tool.
   Show the “Run demo scenario” control.
2. **12-32s — scenario and model.** Open Studio; show a synthetic traffic
   scenario, graph nodes/edges, the Inspector, and the SSI/throughput/bottleneck
   metrics.
3. **32-52s — intervention.** Select a node, adjust a clearly labelled
   assumption or add redundancy, then run or step the model. Explain that the
   resulting values are deterministic heuristic outputs from those assumptions.
4. **52-72s — stress test.** Run the Cascade test and show before/after SSI,
   affected nodes, and dependency path.
5. **72-96s — reproducibility.** Save a snapshot or variant, open Reports, and
   preview/download Markdown or JSON. Point out the local export and explicit
   methodology/limits.

Use only supplied synthetic scenarios. Do not show private projects, real
infrastructure data, or make predictive or safety claims.

## Three-minute technical explanation and interview talking points

- The data model separates nodes, edges, scenario templates, simulation state,
  scoring, snapshots, variants, and report outputs in `src/types/simulation.ts`.
- Simulation functions are typed and mostly pure: flow ticks, cascade analysis,
  SSI scoring, optimization, sensitivity, variants, provenance, and import/export
  are independently testable rather than hidden in UI components.
- A deterministic seed and a scenario fingerprint make the demonstrated report
  reproducible. Multi-seed ranges describe variation in this local model, not
  statistical confidence in a real system.
- The UI keeps state local, supports browser save/load and explicit JSON export,
  and avoids sending scenario content to a service in the standard workflow.
- The practical next engineering steps are browser regression coverage, Web
  Worker execution and rendering for larger graphs, and externally reviewed
  domain models before any decision-support use.

## Boundaries, maturity, and next validation

- **Maturity:** locally verified portfolio demonstrator.
- **External validation:** none claimed. There is no user, accuracy, adoption,
  performance, or public deployment/source-alignment validation in this record.
- **Limits:** educational heuristics; no certified engineering, public-health,
  ecological, infrastructure, financial, or safety-critical use. Browser visual
  regression and large-graph performance coverage are gaps.
- **Next validation:** conduct a moderated task-based session with a systems
  educator or operations practitioner using a synthetic scenario. Record only
  consented observations in the shared empty validation log; do not infer an
  outcome from the local test suite.
- **Canonical repository:** https://github.com/atomicdjt/buildworld-ai
- **Canonical deployment candidate:** https://buildworld-ai-v01-improvements.vercel.app/
