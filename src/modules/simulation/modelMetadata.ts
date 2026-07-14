import type { ScenarioTemplate, SimulationProvenance } from '../../types/simulation'

export const MODEL_VERSION = '0.1.0'

const canonicalize = (value: unknown): string => {
  if (Array.isArray(value)) return `[${value.map(canonicalize).join(',')}]`
  if (value && typeof value === 'object') {
    const record = value as Record<string, unknown>
    return `{${Object.keys(record).sort().map((key) => `${JSON.stringify(key)}:${canonicalize(record[key])}`).join(',')}}`
  }
  return JSON.stringify(value)
}

const fingerprint = (value: unknown): string => {
  let hash = 2166136261
  for (const character of canonicalize(value)) {
    hash ^= character.charCodeAt(0)
    hash = Math.imul(hash, 16777619)
  }
  return `fnv1a-${(hash >>> 0).toString(16).padStart(8, '0')}`
}

export const buildProvenance = (scenario: ScenarioTemplate, seed: number, generatedAt = new Date().toISOString()): SimulationProvenance => ({
  modelVersion: MODEL_VERSION,
  seed,
  generatedAt,
  inputFingerprint: fingerprint({ scenario, seed, modelVersion: MODEL_VERSION }),
})
