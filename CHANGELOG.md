# Changelog

All notable BuildWorld AI release-candidate changes are documented here. The project follows release tags for product milestones; the simulation model version is tracked separately in `src/modules/simulation/modelMetadata.ts`.

## v0.9.0-rc.1 — 2026-08-19

### Release verification

- Added exact release-acceptance coverage across all eight built-in scenarios.
- Added same-seed deterministic equality checks across the complete built-in scenario set.
- Added stable provenance checks for model version, seed, and input fingerprint.
- Added explicit fail-closed coverage for unsupported project schema versions.
- Added production-only dependency auditing to CI.
- Added a headless-Chrome critical-workflow release check covering keyboard focus, scenario discovery, simulation controls, snapshots, report comparison, chart accessible names, narrow reflow, and a 200% zoom/reflow proxy.
- Added a dated release verification record with source/deployment lineage, dependency boundaries, known limitations, and strict tagging rules.

### Existing capabilities included in the candidate

- Deterministic graph-system simulation and bottleneck detection.
- System Stability Index (SSI) scoring with component explanations.
- Cascade experiments and before/after metrics.
- Experiment and sensitivity analysis.
- Ranked optimization suggestions.
- Snapshots and comparisons.
- Named scenario variants and transparent input-difference comparison.
- Markdown/JSON reporting.
- Local persistence and validated JSON import/export.

### Known boundaries

- Educational/exploratory simulation only; not certified engineering, public-health, ecological, safety-critical, or predictive-science software.
- SSI is an original heuristic rather than a standardized engineering/scientific metric.
- No large-graph performance benchmark or visual-regression suite is part of this candidate.
- Full dependency-tree auditing may include development-tool advisories even when the production-only dependency audit is clean; these are not concealed by the release record.
