import assert from 'node:assert/strict'
import { chromium } from 'playwright'

const baseUrl = process.env.BUILDWORLD_BASE_URL ?? 'http://127.0.0.1:4173/'
const browser = await chromium.launch({ channel: 'chrome', headless: true })

try {
  const page = await browser.newPage({ viewport: { width: 1280, height: 800 } })
  await page.goto(baseUrl, { waitUntil: 'networkidle' })

  await page.getByRole('heading', { name: 'BuildWorld AI', level: 1 }).waitFor()

  // Keyboard-only focus: the first Tab target must be interactive and visibly outlined.
  await page.keyboard.press('Tab')
  const focusEvidence = await page.evaluate(() => {
    const active = document.activeElement
    if (!(active instanceof HTMLElement)) return null
    const style = getComputedStyle(active)
    return {
      tag: active.tagName,
      outlineStyle: style.outlineStyle,
      outlineWidth: style.outlineWidth,
    }
  })
  assert.ok(focusEvidence)
  assert.equal(focusEvidence.tag, 'BUTTON')
  assert.notEqual(focusEvidence.outlineStyle, 'none')
  assert.notEqual(focusEvidence.outlineWidth, '0px')

  await page.getByRole('button', { name: 'Open Studio', exact: true }).click()
  const scenarioPicker = page.getByRole('combobox', { name: 'Choose scenario', exact: true })
  await scenarioPicker.waitFor()
  const optionCount = await scenarioPicker.locator('option').count()
  assert.equal(optionCount, 8)

  // Core deterministic workflow controls remain keyboard-addressable buttons.
  for (const name of ['Run', 'Step', 'Reset', 'Save snapshot', 'Run cascade test', 'Export JSON']) {
    await page.getByRole('button', { name, exact: true }).waitFor()
  }

  // Exercise snapshot and comparison/report surfaces.
  await page.getByRole('button', { name: 'Save snapshot', exact: true }).click()
  await page.getByRole('button', { name: 'Step', exact: true }).click()
  await page.getByRole('button', { name: 'Save snapshot', exact: true }).click()
  await page.getByRole('button', { name: 'Reports', exact: true }).click()
  await page.getByRole('heading', { name: 'Snapshot comparison', exact: true }).waitFor()
  await page.getByRole('button', { name: 'Preview report', exact: true }).click()
  await page.locator('pre.report-preview').waitFor()

  // Chart information exposes accessible image names, while numeric/textual metrics remain in the DOM.
  await page.getByRole('button', { name: 'Dashboard', exact: true }).click()
  const accessibleCharts = page.locator('svg[role="img"][aria-label]')
  assert.ok((await accessibleCharts.count()) >= 2)
  await page.getByText('Multi-seed uncertainty range', { exact: true }).waitFor()
  await page.getByText('Input sensitivity', { exact: true }).waitFor()

  // Narrow reflow check.
  await page.setViewportSize({ width: 390, height: 844 })
  const narrowOverflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
  assert.ok(narrowOverflow <= 1, `390px viewport has ${narrowOverflow}px horizontal overflow`)

  // 200% zoom/reflow proxy: a 1280px physical viewport yields ~640 CSS px at 200% browser zoom.
  // This does not replace assistive-technology review, but it catches layout that depends on desktop width.
  await page.setViewportSize({ width: 640, height: 800 })
  const zoomProxyOverflow = await page.evaluate(() => document.documentElement.scrollWidth - document.documentElement.clientWidth)
  assert.ok(zoomProxyOverflow <= 1, `200% zoom proxy has ${zoomProxyOverflow}px horizontal overflow`)
  await page.getByRole('button', { name: 'Studio', exact: true }).waitFor()
  await page.getByRole('button', { name: 'Reports', exact: true }).waitFor()

  console.log('BuildWorld release browser acceptance passed: keyboard focus, core workflow, eight-scenario picker, snapshot/report flow, chart naming, 390px reflow, and 200% zoom proxy.')
} finally {
  await browser.close()
}
