import { describe, expect, it } from 'vitest'
import { rankSensitivity } from './sensitivity'
import { scenarioTemplates } from '../../../scenarios/templates'

describe('sensitivity ranking', () => {
  it('ranks bounded single-input changes without mutating the scenario', () => {
    const scenario = structuredClone(scenarioTemplates[0])
    const before = structuredClone(scenario)
    const findings = rankSensitivity(scenario, 3)

    expect(findings.length).toBeGreaterThan(0)
    expect(findings[0].magnitude).toBeGreaterThanOrEqual(findings.at(-1)!.magnitude)
    expect(scenario).toEqual(before)
  })
})
