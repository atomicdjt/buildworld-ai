# BuildWorld AI v0.9.0-rc.1 — Release Candidate Verification Record

Date: 2026-08-19

## Purpose

This release candidate packages BuildWorld AI as a traceable, reviewable systems-simulation artifact. It is intended for educational, exploratory, product, and technical-review use—not certified engineering analysis, forecasting, infrastructure safety decisions, public-health prediction, or independently validated predictive science.

## Intended release lineage

- Authoritative repository: `atomicdjt/buildworld-ai`
- Authoritative branch: `main`
- Candidate baseline commit: `893a283794228ceda7a520746872b6efb39f8ba0`
- Canonical Vercel project: `buildworld-ai-v01-improvements`
- Canonical URL: `https://buildworld-ai-v01-improvements.vercel.app/`
- Verified production deployment at baseline: `dpl_5gzAQwgnbRDCWRMZndZ7yUXG4H5X`

The final tag must point to the merge commit that contains this verification record and all release-acceptance tests, not to the pre-verification baseline above.

## Principal capabilities under release review

- eight built-in graph-system scenarios;
- deterministic seeded simulation;
- model-version, seed, timestamp, and input-fingerprint provenance;
- bottleneck and System Stability Index (SSI) analysis;
- cascade experiments;
- experiment and sensitivity analysis;
- ranked optimization suggestions;
- snapshots and comparisons;
- scenario variants and comparison;
- Markdown/JSON reports;
- local project persistence and validated JSON import/export.

## Automated verification contract

The authoritative CI workflow runs from a clean GitHub-hosted checkout using Node 22 and executes:

```bash
npm ci
npm audit --omit=dev
npm run lint
npm run typecheck
npm run test
npm run build
```

Release-specific tests additionally require:

- all eight built-in scenarios to execute successfully;
- repeat runs of each scenario with the same seed to be structurally identical;
- provenance fingerprints to remain stable for identical scenario/seed/model inputs;
- incompatible project schema versions to fail closed.

The release is not considered verified until the exact release-PR head passes this workflow.

## Browser and accessibility verification

The release CI also starts the built production bundle and runs a headless stable-Chrome acceptance pass against the critical workflow. The reproducible gate verifies:

- keyboard Tab navigation reaches an interactive control and receives the visible `:focus-visible` outline;
- the scenario picker exposes all eight built-in scenarios;
- Run, Step, Reset, snapshot, cascade, and export controls remain discoverable through button semantics;
- snapshot creation, stepping, two-snapshot comparison, and report preview execute successfully;
- trend charts expose accessible image names while uncertainty and sensitivity results are also present as text;
- the application has no document-level horizontal overflow at a 390px viewport;
- the application has no document-level horizontal overflow at a 640px CSS viewport, used as the reproducible 200%-zoom/reflow proxy for a 1280px physical viewport.

This is the release-candidate evidence for the issue's keyboard/focus/zoom-reflow/chart-alternative criterion. It is **not** a formal WCAG conformance statement or a substitute for a future multi-browser screen-reader/assistive-technology audit; that broader audit remains a separate quality track.

## Known limitations

- The simulator is a deterministic heuristic exploration tool, not a certified predictive model.
- SSI is a product heuristic, not a standardized engineering or scientific metric.
- No large-graph performance benchmark is part of this release candidate.
- No visual-regression suite is currently part of the release gate.
- Browser local storage is used for persistence; there is no hosted synchronization backend.
- Project-import validation rejects malformed graph structure and unsupported schemas, but importing a structurally valid project does not establish that its underlying assumptions are factual or scientifically valid.
- The release gate directly exercises stable Chrome/Chromium; Firefox, Safari/WebKit, and assistive-technology combinations are not claimed as release-gated without separate evidence.
- The epidemic scenario is educational only and must not be presented as a public-health forecast.

## Dependency boundary

A clean full-tree `npm ci` currently reports one high-severity advisory in development tooling. The release gate separately requires `npm audit --omit=dev`; the verified production dependency tree reports zero vulnerabilities. The development-only advisory remains disclosed rather than being hidden by the production result and should be patched compatibly when the affected tooling chain permits it.

## Tagging rule

Create `v0.9.0-rc.1` only after:

1. exact-head CI is green;
2. release-specific automated acceptance is green;
3. the reproducible Chrome browser/reflow acceptance is green;
4. canonical production remains healthy and source-traceable;
5. unresolved limitations are retained here rather than hidden.
