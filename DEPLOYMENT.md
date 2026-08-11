# Deployment

BuildWorld AI is a static Vite app. It requires no database and no environment variables.

Canonical production demo: https://buildworld-ai-v01-improvements.vercel.app/

The earlier Netlify deployment is retained as historical evidence only. It is not the current production authority.

## Local Production Build

```bash
npm install
npm run build
```

The production output is `dist`.

## Historical Netlify Configuration

`netlify.toml` is included:

- Build command: `npm run build`
- Publish directory: `dist`
- SPA fallback: `/* -> /index.html`

Historical project record:

- Site name: `buildworld-ai`
- Site ID: `60b76922-d322-4887-a73b-4601a8f12e5f`
- Production URL: https://buildworld-ai.netlify.app/

## Vercel

After local validation and an approved release gate, the deployment command is:

```bash
npm run build
vercel --prod
```

Framework preset: Vite. Output directory: `dist`.

A successful local build or Vercel `READY` state is not production verification. Confirm the rendered canonical URL, title, primary studio workflow, responsive layout, and browser console after deployment.

## Static Fallback

The product works without server routes. Scenarios, simulation, reports, project export/import, and deterministic insights run in the browser.

## Environment Variables

None required.

If an optional AI provider is added later, it should be isolated behind a provider abstraction and must not be required for demo mode.
