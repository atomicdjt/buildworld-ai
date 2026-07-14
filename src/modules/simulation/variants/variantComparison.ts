import { cloneScenario } from '../../../scenarios/templates'
import { calculateSSI } from '../scoring/ssi'
import { runSimulationTick } from '../engines/simulationRunner'
import type { ScenarioTemplate, ScenarioVariant, VariantComparison, VariantInputChange } from '../../../types/simulation'

const variantId = () => `variant-${crypto.randomUUID?.() ?? Date.now().toString(36)}`

export const createVariant = (name: string, scenario: ScenarioTemplate, seed: number, notes: string, parentId?: string): ScenarioVariant => ({
  id: variantId(),
  name: name.trim() || 'Untitled variant',
  parentId,
  scenario: cloneScenario(scenario),
  seed,
  notes: notes.trim(),
  createdAt: new Date().toISOString(),
})

const changesFor = (baseline: ScenarioTemplate, candidate: ScenarioTemplate): VariantInputChange[] => {
  const changes: VariantInputChange[] = []
  for (const candidateNode of candidate.nodes) {
    const original = baseline.nodes.find((node) => node.id === candidateNode.id)
    if (!original) { changes.push({ entity: candidateNode.label, field: 'node', before: 'absent', after: 'added' }); continue }
    for (const [field, after] of Object.entries(candidateNode.properties)) {
      const before = original.properties[field as keyof typeof original.properties]
      if (before !== after) changes.push({ entity: candidateNode.label, field, before: String(before), after: String(after) })
    }
  }
  for (const original of baseline.nodes) if (!candidate.nodes.some((node) => node.id === original.id)) changes.push({ entity: original.label, field: 'node', before: 'present', after: 'removed' })
  for (const edge of candidate.edges) if (!baseline.edges.some((item) => item.id === edge.id)) changes.push({ entity: edge.label, field: 'edge', before: 'absent', after: 'added' })
  for (const edge of baseline.edges) if (!candidate.edges.some((item) => item.id === edge.id)) changes.push({ entity: edge.label, field: 'edge', before: 'present', after: 'removed' })
  return changes
}

export const compareVariants = (baseline: ScenarioVariant, candidate: ScenarioVariant): VariantComparison => {
  const baselineState = runSimulationTick(baseline.scenario, undefined, { seed: baseline.seed })
  const candidateState = runSimulationTick(candidate.scenario, undefined, { seed: candidate.seed })
  const baselineSSI = calculateSSI(baseline.scenario, baselineState).overall
  const candidateSSI = calculateSSI(candidate.scenario, candidateState).overall
  return {
    baseline, candidate, inputChanges: changesFor(baseline.scenario, candidate.scenario),
    ssiChange: candidateSSI - baselineSSI,
    throughputChange: candidateState.metrics.totalThroughput - baselineState.metrics.totalThroughput,
    bottleneckChange: candidateState.metrics.bottleneckCount - baselineState.metrics.bottleneckCount,
    resilienceChange: candidateState.metrics.resilienceScore - baselineState.metrics.resilienceScore,
    cascadeRiskChange: candidateState.metrics.cascadeDepth - baselineState.metrics.cascadeDepth,
  }
}
