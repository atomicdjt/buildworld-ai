# Browser Support and Accessibility Review Boundary

## Release-candidate support statement

BuildWorld AI is a local-first browser application. For `v0.9.0-rc.1`, the reproducible release gate uses the current stable Google Chrome available on GitHub's Ubuntu runner through Playwright.

The automated browser acceptance verifies the critical workflow at desktop, narrow-mobile, and 200%-zoom-equivalent CSS viewport widths. It also verifies keyboard focus visibility, the eight-scenario selector, primary simulation controls, snapshot/report comparison, and accessible names on trend charts.

## Support posture

- **Current stable Chromium/Chrome:** release-gated and directly exercised in CI.
- **Current Firefox, Safari/WebKit, and Chromium-derived browsers:** expected to work where they implement the standards used by the application, but they are not claimed as release-gated until equivalent evidence is recorded.
- **Legacy browsers:** not supported.

## Accessibility boundary

The release gate provides reproducible evidence for keyboard focus, responsive reflow, and accessible naming on key visualizations. It is not a formal WCAG conformance audit and does not claim screen-reader certification across assistive-technology/browser combinations.

The graph canvas retains visible textual node labels, numeric utilization information, conventional button semantics for nodes and controls, and textual analytical/report surfaces alongside visual charts. Any future claim broader than this dated scope requires additional manual assistive-technology testing.
