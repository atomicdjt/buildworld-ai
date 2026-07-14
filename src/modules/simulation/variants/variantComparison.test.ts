import { describe, expect, it } from 'vitest'
import { compareVariants, createVariant } from './variantComparison'
import { scenarioTemplates } from '../../../scenarios/templates'

describe('scenario variants', () => {
  it('creates an isolated variant and shows the changed input', () => {
    const baseline = createVariant('Baseline', scenarioTemplates[0], 11, 'Original model')
    const candidate = createVariant('Capacity option', { ...baseline.scenario, nodes: baseline.scenario.nodes.map((node, index) => index === 0 ? { ...node, properties: { ...node.properties, capacity: node.properties.capacity + 25 } } : node) }, 11, 'Increase first-node capacity', baseline.id)
    const comparison = compareVariants(baseline, candidate)

    expect(baseline.scenario.nodes[0].properties.capacity).not.toBe(candidate.scenario.nodes[0].properties.capacity)
    expect(comparison.inputChanges).toContainEqual(expect.objectContaining({ field: 'capacity' }))
    expect(comparison.baseline.id).toBe(baseline.id)
  })
})
