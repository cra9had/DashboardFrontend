# Polymarket Copytrading Frontend Reference

Public frontend-only reference repo for the Polymarket copytrading dashboard.

What is included:
- `app/`, `components/`, `styles/`, `public/`: the standalone `v0`/Next.js frontend export
- `reference/dashboard.askama.html`: the current server-rendered dashboard template used in the Rust app, included only as a visual/reference file

What is intentionally not included:
- Rust backend
- database code
- runtime logic
- secrets
- `.env`

Goal:
- use this repo as a style/reference source for `v0.dev`
- generate additional frontend pages in the same visual system

Notes:
- the production app currently uses Rust + Askama for rendering
- this repo exists only as a frontend design/reference workspace
