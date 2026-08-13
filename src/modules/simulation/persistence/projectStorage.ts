import type { ProjectExport, ScenarioVariant, SimulationProject } from '../../../types/simulation'

const storageKey = 'buildworld-ai-project'

export const exportProject = (project: SimulationProject & { variants?: ScenarioVariant[] }): string =>
  JSON.stringify(
    {
      ...project,
      schemaVersion: 2,
      exportedAt: new Date().toISOString(),
    } satisfies ProjectExport,
    null,
    2,
  )

export const importProject = (payload: string): SimulationProject => {
  const candidate: unknown = JSON.parse(payload)
  if (!isRecord(candidate)) {
    throw new Error('BuildWorld AI project export must be a JSON object.')
  }
  const parsed = candidate as unknown as ProjectExport
  if (parsed.schemaVersion !== 1 && parsed.schemaVersion !== 2) {
    throw new Error('Unsupported BuildWorld AI project schema.')
  }
  if (!isRecord(parsed.activeScenario) || !Array.isArray(parsed.activeScenario.nodes) || !parsed.activeScenario.nodes.length || !Array.isArray(parsed.activeScenario.edges)) {
    throw new Error('Project export is missing a valid scenario graph.')
  }
  validateScenarioGraph(parsed.activeScenario)
  return {
    id: parsed.id,
    name: parsed.name,
    activeScenario: parsed.activeScenario,
    snapshots: parsed.snapshots ?? [],
    variants: parsed.variants ?? [],
    updatedAt: parsed.updatedAt ?? parsed.exportedAt,
  }
}

export const saveProjectLocally = (project: SimulationProject): void => {
  window.localStorage.setItem(storageKey, exportProject(project))
}

export const loadProjectLocally = (): SimulationProject | undefined => {
  const payload = window.localStorage.getItem(storageKey)
  return payload ? importProject(payload) : undefined
}

export const clearLocalProject = (): void => {
  window.localStorage.removeItem(storageKey)
}

const nodePropertyKeys = [
  'capacity',
  'demand',
  'throughput',
  'failureProbability',
  'recoveryTime',
  'cost',
  'priority',
  'resilience',
  'stock',
] as const

const optionalNodePropertyKeys = ['growthRate', 'decayRate', 'infectionRate', 'contactRate', 'processingTime', 'population', 'infected', 'recovered'] as const
const edgePropertyKeys = ['flowCapacity', 'travelTime', 'cost', 'reliability', 'congestionSensitivity', 'transferEfficiency', 'dependencyStrength'] as const

function validateScenarioGraph(scenario: ProjectExport['activeScenario']): void {
  const nodeIds = new Set<string>()
  for (const node of scenario.nodes) {
    if (!isRecord(node) || !isNonEmptyString(node.id) || !isNonEmptyString(node.label) || !isRecord(node.properties)) {
      throw new Error('Project export contains an invalid node.')
    }
    if (nodeIds.has(node.id)) throw new Error(`Project export contains duplicate node id "${node.id}".`)
    nodeIds.add(node.id)
    assertFiniteNumber(node.x, `Node "${node.id}" x`)
    assertFiniteNumber(node.y, `Node "${node.id}" y`)
    for (const key of nodePropertyKeys) assertFiniteNumber(node.properties[key], `Node "${node.id}" property "${key}"`)
    for (const key of optionalNodePropertyKeys) {
      if (node.properties[key] !== undefined) assertFiniteNumber(node.properties[key], `Node "${node.id}" property "${key}"`)
    }
  }

  const edgeIds = new Set<string>()
  for (const edge of scenario.edges) {
    if (!isRecord(edge) || !isNonEmptyString(edge.id) || !isNonEmptyString(edge.source) || !isNonEmptyString(edge.target) || !isRecord(edge.properties)) {
      throw new Error('Project export contains an invalid edge.')
    }
    if (edgeIds.has(edge.id)) throw new Error(`Project export contains duplicate edge id "${edge.id}".`)
    edgeIds.add(edge.id)
    if (!nodeIds.has(edge.source) || !nodeIds.has(edge.target)) {
      throw new Error(`Edge "${edge.id}" references a missing node.`)
    }
    for (const key of edgePropertyKeys) assertFiniteNumber(edge.properties[key], `Edge "${edge.id}" property "${key}"`)
  }
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === 'object' && value !== null && !Array.isArray(value)
}

function isNonEmptyString(value: unknown): value is string {
  return typeof value === 'string' && value.trim().length > 0
}

function assertFiniteNumber(value: unknown, label: string): asserts value is number {
  if (typeof value !== 'number' || !Number.isFinite(value)) {
    throw new Error(`${label} must be a finite number.`)
  }
}
