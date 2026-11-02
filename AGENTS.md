# Agrimallwebsite (agrimall.io)

Follows the Adapa BOS template (`sreemohanagrimall/adapa-bos`, `docs/templates/AGENTS.md`). Read this
file first. `CLAUDE.md` (entity details, SPA routing, deploy) stays the authority.

## 1. Purpose and owner
BOS project: `web`. The public site and legal pages of Sree Mohan Agri Mall, https://agrimall.io. It is
the website half of Meta business verification for the WhatsApp Business account. Owner: Sandeep.

## 2. Stack, build, test
- Vite, React 18, TypeScript, Tailwind, shadcn/ui. `npm install`, `npm run dev`, `npm run build`,
  `npm run preview`. Check `/`, `/privacy` and `/terms` after every change.

## 3. Deploy
- `scripts/deploy.ps1`: build, upload `dist/` to S3, invalidate CloudFront (`deploy.config.json`).
  Verify status codes with `scripts/verify-live.ps1`. Pushing to GitHub deploys nothing.

## 4. Data
- No database. Legal entity details come only from `src/config/company.ts` (GST certificate values).

## 5. Interfaces
- None beyond static hosting; `schema.org` Organization block for crawlers.

## 6. Flows
None in adapa-bos `flows/`.

## 7. Rules
- Never hard-code an address, phone or email in a component; import `COMPANY` (`CLAUDE.md`).
- `/privacy` and `/terms` must answer HTTP 200 (CloudFront custom error responses).

## 8. Glossary and pending work
- Live checklist: `ACTION-PLAN.md`.
- Target after the final org rename: `adapa-web` (agrimall).
