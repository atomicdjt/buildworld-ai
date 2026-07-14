import { describe, expect, it } from 'vitest'
import { runExperiment } from './experimentRunner'
import { scenarioTemplates } from '../../../scenarios/templates'

describe('experiment runner', () => {
  it('is repeatable for a supplied set of seeds', () => {
    const scenario = scenarioTemplates[0]
    const first = runExperiment(scenario, [3, 5, 7])
    const second = runExperiment(scenario, [3, 5, 7])

    expect(first).toEqual(second)
    expect(first.runs).toHaveLength(3)
    expect(first.summary.ssi.p10).toBeLessThanOrEqual(first.summary.ssi.p90)
  })
})
