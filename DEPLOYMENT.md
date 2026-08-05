# Deployment

BuildWorld AI is a static Vite app. It requires no database and no environment variables.

Canonical production candidate: https://buildworld-ai-v01-improvements.vercel.app/

The Vercel project `buildworld-ai-v01-improvements` is the configured canonical
deployment candidate for this repository. Its source/commit alignment and public
rendering still require approval-gated post-deployment verification. The Netlify
site below is retained as a legacy/duplicate surface and is not recommended as a
canonical public link.

## Local Production Build

```bash
npm install
npm run build
```

The production output is `dist`.

## Legacy Netlify surface (do not promote)

`netlify.toml` is included:

- Build command: `npm run build`
- Publish directory: `dist`
- SPA fallback: `/* -> /index.html`

Deploy:

```bash
npm run build
netlify deploy --prod --dir dist
```

Current Netlify project (duplicate/legacy candidate):

- Site name: `buildworld-ai`
- Site ID: `60b76922-d322-4887-a73b-4601a8f12e5f`
- Production URL: https://buildworld-ai.netlify.app/

## Canonical Vercel candidate

Deploy:

```bash
npm run build
vercel --prod
```

Framework preset: Vite. Output directory: `dist`.

Known configured project: `buildworld-ai-v01-improvements`

Project ID: `prj_PNDgBTmDGjI16NP220VfPjlbBVgQ`

Do not deploy from this document automatically. Before any production promotion,
verify the intended branch and commit, inspect the preview, then record the
deployment URL and source commit in the release evidence.

## Static Fallback

The product works without server routes. Scenarios, simulation, reports, project export/import, and deterministic insights run in the browser.

## Environment Variables

None required.

If an optional AI provider is added later, it should be isolated behind a provider abstraction and must not be required for demo mode.
