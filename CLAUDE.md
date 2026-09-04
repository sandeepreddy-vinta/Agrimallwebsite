# Agrimall Website — agrimall.io

Public marketing site and legal pages for **Sree Mohan Agri Mall**. Vite + React 18 +
TypeScript + Tailwind + shadcn/ui, originally generated in Lovable. Static build, deployed to
S3 behind CloudFront.

Repo: `github.com/sandeepreddy-vinta/Agrimallwebsite` (branch `main`)

This site is **not** the Agrimall product. The Rails API and Android app live in
`Claude WorkSpace/agrimall/` and share nothing with this repo.

```
src/
├── config/company.ts     legal entity details — SINGLE SOURCE, see below
├── pages/                Index, Privacy, Terms, NotFound
├── components/           Navbar, Footer, Hero, About, …, Legal (shared legal-page bits)
└── components/ui/        shadcn primitives, untouched
```

---

## The parts that matter

### 1. Entity details come from `src/config/company.ts`. Always.

Legal name, registered address, GSTIN, published email and phone live in that one file. The
footer, navbar, contact section, both legal pages and the `schema.org` Organization block all
read from it.

This is not tidiness. Meta business verification compares the name, address and contact on
agrimall.io against the GST certificate and the Business Manager record; **one stale copy
hard-coded in a component is a failed verification.** Never write an address, phone or email
literal into a component — import `COMPANY`.

Two address forms, deliberately:

| Constant | Used by | Why |
| --- | --- | --- |
| `addressLines` / `addressOneLine` | footer, contact section | Readable. Customer-facing. |
| `addressCertified` | entity tables on `/privacy`, `/terms` | Full GST certificate address, premises detail included. Exact document match. |
| `postalAddress` | `schema.org` Organization block | Same values, split into the fields `PostalAddress` expects. |

The values are transcribed from GST REG-06 (issued 08/05/2024), GSTIN `37AELFS0346C1Z5`. Do not
"correct" or reformat them.

### 2. `/privacy` and `/terms` are real routes, and S3 doesn't know that

`src/App.tsx` declares `/`, `/privacy`, `/terms` and a `*` catch-all. Client-side routing means
there is no `privacy` object in the bucket.

CloudFront's origin is the **S3 REST endpoint** (`…s3.ap-south-1.amazonaws.com`), which ignores
the bucket's "Error document" setting entirely. The distribution's **custom error responses** are
what make deep links work:

| HTTP error code | Response page path | HTTP response code |
| --- | --- | --- |
| 403 | `/index.html` | **200** |
| 404 | `/index.html` | **200** |

**The response code is the trap.** As of 28 Aug 2026 the rewrite is configured but passes the
original 404 status through, so `agrimall.io/privacy` renders the app and returns 404. It looks
correct in a browser and reads as missing to Meta, Google and `curl -I`. Check with
`scripts/verify-live.ps1`, never by eye.

### 3. `index.html` is what crawlers see

`src/hooks/use-head.ts` sets per-route titles, meta, canonical and the `schema.org` block, but
only after React mounts. The static tags in `index.html` are what a link preview or a
verification reviewer's tooling reads. They were Lovable boilerplate until Aug 2026 — keep them
real, and keep them in sync with the `useHead` call in `src/pages/Index.tsx`.

This was `react-helmet-async` until Sep 2026, when it turned out to be emitting **nothing** —
no title, no canonical, no structured data — in both dev and the production build, silently and
without a console error, on 2.0.5 and on 1.3.0 alike. `/privacy` and `/terms` were serving the
home page's title and canonical. It is replaced by a ~40-line hook with no dependency. Don't
reintroduce a head-management library here without checking `document.title` in a browser on
`/terms` first.

### 4. Deploy is build-then-sync, never sync-the-source

```
npm run build    ->  dist/    ->    S3    ->  CloudFront invalidation
```

Pushing to GitHub deploys nothing. `scripts/deploy.ps1` does the whole sequence with the right
cache headers — hashed `assets/` immutable, `index.html` no-cache. A plain
`aws s3 sync dist/ --delete` leaves `index.html` cached at the edge and users see the old build.

---

## Working here

Windows PowerShell. Commands should include their own `cd`.

```powershell
cd "E:\San\WorkSpace\Claude WorkSpace\Agrimall Website"
npm install
npm run dev          # http://localhost:8080
npm run build
npm run preview      # production build, SPA fallback active
```

Always check all three routes after a change — `/`, `/privacy`, `/terms`. The legal pages reuse
`Navbar`, so a navbar change that assumes the home page (bare `#about` anchors, for instance)
breaks them silently. Anchors must be `/#about`, not `#about`.

`aws` credentials live in `%USERPROFILE%\.aws\credentials`. Bucket and distribution id go in
`deploy.config.json`, which is committed — it holds no secrets.

## Start here

`ACTION-PLAN.md` holds the live checklist for the verification push — current status, what is
done, what is next, and which steps only Sandeep can do. Read it before starting work and tick
boxes as steps complete.

## Why this site matters right now

It is the website half of Meta business verification for WABA `102097146277644` and app
`653496656184174`. Until verification clears, WhatsApp Cloud API messaging stays capped. See
`DEPLOYMENT.md` for the full checklist.
