import { cloneScenario } from '../../../scenarios/templates'
import { runSimulationTick } from '../engines/simulationRunner'
import { calculateSSI } from '../scoring/ssi'
import type { ScenarioTemplate } from '../../../types/simulation'

export interface SensitivityFinding {
  nodeId: string
  label: string
  field: 'capacity' | 'resilience' | 'demand'
  direction: 'increases' | 'decreases'
  magnitude: number
  baselineSSI: number
  adjustedSSI: number
}

export const rankSensitivity = (scenario: ScenarioTemplate, seed: number): SensitivityFinding[] => {
  const baselineState = runSimulationTick(scenario, undefined, { seed })
  const baselineSSI = calculateSSI(scenario, baselineState).overall
  const fields = ['capacity', 'resilience', 'demand'] as const
  return scenario.nodes.flatMap((node) => fields.map((field) => {
    const candidate = cloneScenario(scenario)
    const target = candidate.nodes.find((item) => item.id === node.id)!
    const current = target.properties[field]
    target.properties[field] = field === 'demand' ? Math.max(0, current * 0.9) : current * 1.1
    const adjustedSSI = calculateSSI(candidate, runSimulationTick(candidate, undefined, { seed })).overall
    const delta = adjustedSSI - baselineSSI
    return { nodeId: node.id, label: node.label, field, direction: (delta >= 0 ? 'increases' : 'decreases') as SensitivityFinding['direction'], magnitude: Math.abs(delta), baselineSSI, adjustedSSI }
  })).sort((left, right) => right.magnitude - left.magnitude).slice(0, 5)
}
