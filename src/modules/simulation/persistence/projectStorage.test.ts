import { describe, expect, it } from 'vitest'
import { scenarioTemplates } from '../../../scenarios/templates'
import { importProject } from './projectStorage'

const validExport = () => ({
  schemaVersion: 2,
  exportedAt: '2026-08-11T00:00:00.000Z',
  id: 'project-test',
  name: 'Boundary test',
  activeScenario: structuredClone(scenarioTemplates[0]),
  snapshots: [],
  variants: [],
  updatedAt: '2026-08-11T00:00:00.000Z',
})

describe('importProject', () => {
  it('rejects non-object JSON values', () => {
    expect(() => importProject('null')).toThrow(/object/i)
    expect(() => importProject('[]')).toThrow(/object/i)
  })

  it('rejects duplicate node identifiers', () => {
    const payload = validExport()
    payload.activeScenario.nodes.push(structuredClone(payload.activeScenario.nodes[0]!))

    expect(() => importProject(JSON.stringify(payload))).toThrow(/duplicate node/i)
  })

  it('rejects edges that reference missing nodes', () => {
    const payload = validExport()
    payload.activeScenario.edges[0]!.target = 'missing-node'

    expect(() => importProject(JSON.stringify(payload))).toThrow(/missing node/i)
  })

  it('rejects non-finite numeric graph values', () => {
    const payload = validExport()
    payload.activeScenario.nodes[0]!.properties.capacity = Number.POSITIVE_INFINITY

    expect(() => importProject(JSON.stringify(payload))).toThrow(/finite number/i)
  })
})
