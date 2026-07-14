import { describe, expect, it } from 'vitest'
import { buildProvenance, MODEL_VERSION } from '../modules/simulation/modelMetadata'
import { scenarioTemplates } from '../scenarios/templates'

describe('simulation provenance', () => {
  it('creates a stable fingerprint for the same scenario and seed', () => {
    const scenario = scenarioTemplates[0]
    const first = buildProvenance(scenario, 42, '2026-07-14T00:00:00.000Z')
    const second = buildProvenance(scenario, 42, '2026-07-14T00:00:00.000Z')

    expect(first.modelVersion).toBe(MODEL_VERSION)
    expect(first.inputFingerprint).toBe(second.inputFingerprint)
    expect(first.seed).toBe(42)
  })
})
