import type { EdgeType, ScenarioTemplate, SimulationEdge, SimulationNode } from '../../types/simulation'

export type GraphSelection = { kind: 'node' | 'edge'; id: string } | undefined
export type GraphResult = { ok: true; scenario: ScenarioTemplate } | { ok: false; error: string }

const newId = (prefix: string) => `${prefix}-${crypto.randomUUID?.() ?? Date.now().toString(36)}`
const clone = (scenario: ScenarioTemplate): ScenarioTemplate => structuredClone(scenario)

export const createEdge = (scenario: ScenarioTemplate, source: string, target: string, type: EdgeType = 'dependency'): GraphResult => {
  if (source === target) return { ok: false, error: 'A connection needs two different nodes.' }
  if (!scenario.nodes.some((node) => node.id === source) || !scenario.nodes.some((node) => node.id === target)) return { ok: false, error: 'Choose two existing nodes.' }
  if (scenario.edges.some((edge) => edge.source === source && edge.target === target)) return { ok: false, error: 'That connection already exists.' }
  const edge: SimulationEdge = { id: newId('edge'), label: 'Manual connection', source, target, type, properties: { flowCapacity: 60, travelTime: 1, cost: 10, reliability: 0.9, direction: 'directed', congestionSensitivity: 0.25, transferEfficiency: 0.85, dependencyStrength: 0.5 } }
  return { ok: true, scenario: { ...clone(scenario), edges: [...scenario.edges, edge] } }
}

export const duplicateSelection = (scenario: ScenarioTemplate, selection: GraphSelection): { scenario: ScenarioTemplate; selection: GraphSelection } => {
  if (!selection || selection.kind !== 'node') return { scenario, selection }
  const original = scenario.nodes.find((node) => node.id === selection.id)
  if (!original) return { scenario, selection: undefined }
  const duplicate: SimulationNode = { ...structuredClone(original), id: newId('node'), label: `${original.label} copy`, x: original.x + 32, y: original.y + 32 }
  return { scenario: { ...clone(scenario), nodes: [...scenario.nodes, duplicate] }, selection: { kind: 'node', id: duplicate.id } }
}

export const deleteSelection = (scenario: ScenarioTemplate, selection: GraphSelection): ScenarioTemplate => {
  if (!selection) return scenario
  if (selection.kind === 'edge') return { ...clone(scenario), edges: scenario.edges.filter((edge) => edge.id !== selection.id) }
  return { ...clone(scenario), nodes: scenario.nodes.filter((node) => node.id !== selection.id), edges: scenario.edges.filter((edge) => edge.source !== selection.id && edge.target !== selection.id) }
}
