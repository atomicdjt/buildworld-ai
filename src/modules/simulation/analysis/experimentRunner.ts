import { runSimulationTick } from '../engines/simulationRunner'
import { calculateSSI } from '../scoring/ssi'
import type { ExperimentResult, ExperimentRun, ExperimentSummary, ScenarioTemplate } from '../../../types/simulation'

const percentile = (values: number[], point: number) => {
  const sorted = [...values].sort((a, b) => a - b)
  return sorted[Math.min(sorted.length - 1, Math.max(0, Math.floor((sorted.length - 1) * point)))] ?? 0
}
const summarize = (values: number[]) => ({ median: percentile(values, 0.5), p10: percentile(values, 0.1), p90: percentile(values, 0.9) })

export const runExperiment = (scenario: ScenarioTemplate, seeds: number[]): ExperimentResult => {
  const runs: ExperimentRun[] = seeds.map((seed) => {
    const state = runSimulationTick(scenario, undefined, { seed })
    return { seed, ssi: calculateSSI(scenario, state).overall, throughput: state.metrics.totalThroughput, resilience: state.metrics.resilienceScore, bottlenecks: state.metrics.bottleneckCount }
  })
  const summary: ExperimentSummary = {
    ssi: summarize(runs.map((run) => run.ssi)), throughput: summarize(runs.map((run) => run.throughput)), resilience: summarize(runs.map((run) => run.resilience)),
  }
  return { seeds: [...seeds], runs, summary }
}
