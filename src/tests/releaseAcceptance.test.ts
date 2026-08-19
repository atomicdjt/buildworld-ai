import { describe, expect, it } from 'vitest'
import { runSimulationTick } from '../modules/simulation/engines/simulationRunner'
import { buildProvenance, MODEL_VERSION } from '../modules/simulation/modelMetadata'
import { importProject } from '../modules/simulation/persistence/projectStorage'
import { scenarioTemplates } from '../scenarios/templates'

describe('BuildWorld AI release acceptance', () => {
  it('runs all eight built-in scenarios deterministically with stable provenance', () => {
    expect(scenarioTemplates).toHaveLength(8)

    scenarioTemplates.forEach((scenario, index) => {
      const seed = 101 + index
      const first = runSimulationTick(scenario, undefined, { seed })
      const second = runSimulationTick(scenario, undefined, { seed })

      expect(first).toEqual(second)
      expect(first.scenarioId).toBe(scenario.id)
      expect(first.timeStep).toBe(1)
      expect(Object.keys(first.nodeStates)).toHaveLength(scenario.nodes.length)
      expect(Object.keys(first.edgeStates)).toHaveLength(scenario.edges.length)

      const generatedAt = '2026-08-19T00:00:00.000Z'
      const firstProvenance = buildProvenance(scenario, seed, generatedAt)
      const secondProvenance = buildProvenance(scenario, seed, generatedAt)

      expect(firstProvenance).toEqual(secondProvenance)
      expect(firstProvenance.modelVersion).toBe(MODEL_VERSION)
      expect(firstProvenance.seed).toBe(seed)
      expect(firstProvenance.inputFingerprint).toMatch(/^fnv1a-[0-9a-f]{8}$/)
    })
  })

  it('rejects an incompatible project schema version', () => {
    const payload = {
      schemaVersion: 999,
      exportedAt: '2026-08-19T00:00:00.000Z',
      id: 'incompatible-release-fixture',
      name: 'Incompatible release fixture',
      activeScenario: scenarioTemplates[0],
      snapshots: [],
      variants: [],
      updatedAt: '2026-08-19T00:00:00.000Z',
    }

    expect(() => importProject(JSON.stringify(payload))).toThrow(/Unsupported BuildWorld AI project schema/i)
  })
})
