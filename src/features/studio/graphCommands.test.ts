import { describe, expect, it } from 'vitest'
import { createEdge, deleteSelection, duplicateSelection } from './graphCommands'
import { scenarioTemplates } from '../../scenarios/templates'

describe('graph commands', () => {
  it('rejects self-links and creates a valid manual edge', () => {
    const scenario = scenarioTemplates[0]
    expect(createEdge(scenario, scenario.nodes[0].id, scenario.nodes[0].id).ok).toBe(false)
    const result = createEdge(scenario, scenario.nodes[0].id, scenario.nodes[1].id)
    expect(result.ok).toBe(true)
    if (result.ok) expect(result.scenario.edges).toHaveLength(scenario.edges.length + 1)
  })

  it('duplicates and deletes selected nodes without leaving dangling edges', () => {
    const scenario = scenarioTemplates[0]
    const duplicate = duplicateSelection(scenario, { kind: 'node', id: scenario.nodes[0].id })
    expect(duplicate.scenario.nodes).toHaveLength(scenario.nodes.length + 1)
    const deleted = deleteSelection(duplicate.scenario, { kind: 'node', id: scenario.nodes[0].id })
    expect(deleted.nodes.some((node) => node.id === scenario.nodes[0].id)).toBe(false)
    expect(deleted.edges.some((edge) => edge.source === scenario.nodes[0].id || edge.target === scenario.nodes[0].id)).toBe(false)
  })
})
