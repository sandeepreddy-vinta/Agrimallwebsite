# Action plan — Meta business verification for Sree Mohan Agri Mall

**Goal:** get `agrimall.io` into a state where Meta's business verification passes, so WhatsApp
Cloud API (WABA `102097146277644`, app `653496656184174`) can leave Development mode.

**Keep this file current.** Tick a box only when the step is actually done and verified — not when
the code for it exists. This file is the state; if a session loses context, it resumes from here.

---

## Where things stand (4 Sep 2026, updated)

| | |
| --- | --- |
| Website code | Written, typechecks, builds, head tags verified in a browser. Committed. |
| `agrimall.io` live | **New build deployed 4 Sep.** `/`, `/privacy` and `/terms` all return **200**. |
| AWS CLI | Configured as `arn:aws:iam::049422444233:user/sandeep-pc-aws`. |
| `deploy.config.json` | Bucket `agrimall.io`, distribution `E38Q9WDTW9YMLB`. |
| `scripts/*.ps1` | **Now actually run.** Both were unrunnable; see 3.2. |
| CloudFront | Custom error responses 403/404 → `/index.html` @ **200**, added 4 Sep. |
| **Website half of verification** | **Done.** `verify-live.ps1` passes every check. |
| Business Manager | Address field **blank**. Business phone undecided. |
| Git | Pushed to `origin/main` at `e60162c` (4 Sep). |
| Verification | **Not submitted — ON HOLD.** See below. |

### Fixed on 4 Sep while working through Phase 3

Three defects that would each have survived into the submission:

1. **`react-helmet-async` was emitting nothing** — no per-route `<title>`, no
   `canonical`, and no `schema.org` Organization block, in dev and in the production
   build alike, silently and with no console error. `/privacy` and `/terms` were
   serving the home page's title and a canonical of `https://agrimall.io/`. Neither
   2.0.5 nor 1.3.0 worked in this tree. Replaced with `src/hooks/use-head.ts`, ~40
   lines, no dependency; verified in a browser on all three routes and across a
   client-side navigation.
2. **Hard-coded entity details outside `company.ts`** — the `schema.org` block had the
   street address, locality and postcode written out longhand, and `Solutions.tsx` had
   the phone number in body copy. Both now read from `COMPANY` (new
   `COMPANY.postalAddress` for the structured form). This is the CLAUDE.md §1 trap.
3. **The `schema.org` logo pointed at `/img/logo.png`**, which does not exist — the
   file is at `/logo.png`.

Read `CLAUDE.md` before changing anything — especially §1 (entity details come from
`src/config/company.ts`) and §2 (the CloudFront response-code trap).

---

## Division of labour

**Claude can do:** everything in the repo — edits, builds, running `scripts/*.ps1`, git commits,
reading live URLs to check status codes, updating this file.

**Only Sandeep can do**, and Claude must stop and hand over rather than attempt:

- Anything in the AWS console (IAM user, access keys, CloudFront error-page settings)
- `aws configure` — Claude must never be given or asked to type an access key or secret
- Anything in Meta Business Manager or the App dashboard
- Pressing submit on the verification itself
- `git push` — ask first

---

## Phase 1 — Credentials and config

- [x] **1.1 Configure AWS CLI** *(Sandeep)* — done 4 Sep, as existing user `sandeep-pc-aws`
  (`arn:aws:iam::049422444233:user/sandeep-pc-aws`) rather than a new `agrimall-deploy`.

  IAM → Users → Create user `agrimall-deploy`, no console access. Attach an inline policy
  allowing `s3:ListAllMyBuckets`, `s3:GetBucketLocation`, and on the site bucket
  `s3:ListBucket/GetObject/PutObject/DeleteObject`, plus `cloudfront:ListDistributions`,
  `GetDistribution`, `GetDistributionConfig`, `CreateInvalidation`, `ListInvalidations`.
  Create an access key of type **Command Line Interface**, then:

  ```powershell
  aws configure
  ```

  Region `ap-south-1`, output `json`. Verify with `aws sts get-caller-identity`.

- [x] **1.2 Find the bucket and distribution** *(Claude)* — done 4 Sep. Bucket `agrimall.io`;
  distribution `E38Q9WDTW9YMLB` (aliases `agrimall.io`, `www.agrimall.io`). Origin is the S3
  **website** endpoint `agrimall.io.s3-website.ap-south-1.amazonaws.com` — not the REST endpoint
  this file and `DEPLOYMENT.md` previously claimed. Both have been corrected.

  ```powershell
  cd "E:\San\WorkSpace\Claude WorkSpace\Agrimall Website"
  aws s3 ls
  aws cloudfront list-distributions --query "DistributionList.Items[].{Id:Id,Domain:DomainName,Aliases:Aliases.Items[0],Origin:Origins.Items[0].DomainName}" --output table
  ```

- [x] **1.3 Fill in `deploy.config.json`** *(Claude)* — done 4 Sep: bucket `agrimall.io`,
  distribution `E38Q9WDTW9YMLB`.

  Still open *(Sandeep, console)*: `sandeep-pc-aws` is a general-purpose user with broad access,
  used here because it was already configured. Narrowing deploys to a dedicated `agrimall-deploy`
  user, scoped to this one bucket and distribution, is still worth doing — it is not blocking
  verification.

---

## Phase 2 — Fix CloudFront *(Sandeep, console)*

- [x] **2.1** *(Claude, by CLI at Sandeep's request — normally Sandeep's console step)* — done
  4 Sep. There were **no** custom error responses at all (`Quantity: 0`), not a rule with the
  wrong status as this file previously said. The 404 came from the bucket's own error document.
  Both rules added via `update-distribution` with `--if-match`, changing nothing else.
  Original: CloudFront → the agrimall.io distribution → **Error pages**. For both the 403 and
  the 404 entries: Customize error response **Yes**, Response page path `/index.html`,
  **HTTP Response Code `200`**.

  This is the single most important step and the easiest to get subtly wrong. The rewrite already
  works today — it is the *status code* passing through as 404 that makes Meta read the privacy
  policy as missing while the page looks perfect in a browser. See `CLAUDE.md` §2.

- [x] **2.2** Distribution returned to **Deployed** 4 Sep.

---

## Phase 3 — Ship the site

- [x] **3.1 Test locally** *(Claude)* — done 4 Sep. `npm install`, `npx tsc --noEmit`
  and `npm run build` all clean. Bundle audit passes: `37AELFS0346C1Z5`,
  `agrimall@agrimall.io`, `Grievance Officer`, `Sandeep Reddy Vinta` and
  `Basement Part A` present; `sreemohanagrimall@gmail.com`, `Lovable`, `[NAME]` and
  the bad `img/logo.png` absent. All three routes render against `npm run preview`,
  with the correct title, canonical and `og:url` on each.

  ```powershell
  cd "E:\San\WorkSpace\Claude WorkSpace\Agrimall Website"
  npm install
  npm run build
  ```

  Then confirm in `dist/assets/*.js`: `37AELFS0346C1Z5`, `agrimall@agrimall.io` and
  `Grievance Officer` present; `sreemohanagrimall@gmail.com`, `Lovable` and `[NAME]` absent.

- [x] **3.2 Dry run the deploy** *(Claude)* — done 4 Sep. Neither script had ever run,
  and neither could: **both were saved as UTF-8 with no BOM**, so PowerShell 5.1 read
  them in the ANSI codepage and the em-dashes decoded to `”`, which PowerShell accepts
  as a string delimiter — the file failed to parse before executing a line. Both now
  carry a BOM. Also fixed in `deploy.ps1`: `aws sts get-caller-identity 2>$null` died
  on `NativeCommandError` under `$ErrorActionPreference = "Stop"`; `-WhatIf` aborted on
  a missing `dist/` that `-WhatIf` had itself skipped building; and the script exited
  non-zero on a clean run. `-WhatIf` now completes end to end on both paths.

  Caveat: run against a placeholder bucket and distribution id, with no credentials —
  the config gate and the credential preflight both fire correctly first. **A dry run
  against the real values is still worth doing once 1.3 is filled in.**

  ```powershell
  cd "E:\San\WorkSpace\Claude WorkSpace\Agrimall Website"
  .\scripts\deploy.ps1 -WhatIf
  ```

  These scripts have never been executed. Read the output carefully; fix any PowerShell error
  before the real run.

- [x] **3.3 Deploy** *(Claude)* — done 4 Sep. Build synced to `s3://agrimall.io`, invalidation
  `I62ZCDDVYMHU85OFEJWR5EF84Y` completed. Live bundle is `index-BM3TSpHx.js`, matching the build.

  ```powershell
  cd "E:\San\WorkSpace\Claude WorkSpace\Agrimall Website"
  .\scripts\deploy.ps1
  ```

- [x] **3.4 Verify** *(Claude)* — done 4 Sep, **all checks pass**. `/`, `/privacy`, `/terms` and
  `www.agrimall.io/privacy` all return **200**; GSTIN, certified address, `agrimall@agrimall.io`
  and the grievance block all render on the live pages; no Gmail anywhere; the `schema.org` logo
  URL now resolves (200). Re-run any time with:

  ```powershell
  cd "E:\San\WorkSpace\Claude WorkSpace\Agrimall Website"
  .\scripts\verify-live.ps1
  ```

  All three routes must return **200** and every entity check must pass. If `/privacy` returns
  404, Phase 2 was not applied correctly — go back, do not proceed.

- [x] **3.5 Commit** *(Claude)* — committed 4 Sep. **Not pushed** — waiting on Sandeep.

  ```powershell
  cd "E:\San\WorkSpace\Claude WorkSpace\Agrimall Website"
  git add -A
  git status
  ```

  Commit message should say what changed and why (privacy/terms pages, entity config, legal
  footer, required for Meta verification).

---

## Phase 4 — Meta *(Sandeep)*

> **RESUMED 10 Sep 2026.** Sandeep is back and has phone access on `+91 92814 45083`.
>
> **Preflight re-run 10 Sep 2026 — GO.** Nothing drifted over the week: `verify-live.ps1` passes
> all checks; `/`, `/privacy`, `/terms` all 200; CloudFront still carries both 403/404 → 200
> rules and reads `Deployed`; the deployed bundle `index-C36fWvwP.js` is byte-identical to a
> fresh build, so there is nothing unshipped; repo clean and level with `origin/main`.
> `agrimall.io` MX points at Google Workspace, so the confirmation mailbox can receive.
>
> **4.1 to 4.5 below are Sandeep's alone** — Business Manager, the app dashboard and the submit
> button. Claude does not attempt them.

- [x] **4.1 Business info** — done and verified 10 Sep 2026 against the GST certificate and the
  live Business Manager page (not a screenshot). Entered as:
  street `15/164, Balaji Complex, Gosha Hospital Road`; line 2
  `Basement Part A, Part B and First Floor Part G`; city `Adoni`; state `Andhra Pradesh`;
  postal `518301`; country `India`; website `https://agrimall.io/`.

  Four errors were caught and corrected on the first pass: `Gosha Hospital Raod` (typo), a
  prefix `Upstairs,` that contradicted the certificate's basement/first-floor premises, the
  premises detail missing entirely, and `Adoni` duplicated into the street line.

  Primary page now linked as **Mohan Agri Mall - Telugu**, matching `COMPANY.social.facebook`.

  Certificate read direct from `New SMAM AP 2024 GST (1).pdf`: GSTIN `37AELFS0346C1Z5`,
  Constitution `Partnership`, issued `08/05/2024`, District `Kurnool`. Annexure B lists
  **SANDEEP REDDY VINTA** as a Managing/Authorized Partner — which is what makes 4.4 his to
  submit — alongside ADAPA TEJASWINI.

- [x] **4.2 Business phone** — decided 4 Sep, **entered and verified live 10 Sep** as
  `+919281445083`. Use the **office voice line `+91 92814 45083`**.

  `+91 94936 36363` turned out to be the WhatsApp Cloud API number for WABA `102097146277644`,
  so it takes no ordinary call or SMS — exactly the case this step was written to catch. Worse,
  the site was publishing it as a `tel:` link in **eight** places, including the Grievance
  Officer contact that India's IT Rules require to be reachable.

  The site now separates the two: `phone*` is the voice line, `whatsapp*` is the Cloud API
  number, linked as `wa.me/919493636363` and never as `tel:`. `scripts/deploy.ps1` refuses to
  deploy if `phoneHref` is ever set to the WhatsApp number again.

  The SIM does not need to be in the firm's name — Meta verifies documents, not SIM ownership,
  and the GST certificate carries the firm's name. What matters is that a human answers it in
  business hours. **Brief whoever mans it before submitting:** Meta may place a verification
  call, and an unanswered or misdirected call fails the same way a wrong number does.

- [x] **4.3 App dashboard** — done 10 Sep 2026. Privacy Policy URL `https://agrimall.io/privacy`
  and Terms of Service URL `https://agrimall.io/terms`, set and confirmed after a page reload.

  **The page is not where this file said.** It is the App Dashboard at
  `developers.facebook.com/apps/653496656184174/settings/basic/` — *not* Business Manager →
  Apps, which only shows the app as a business asset with its people assignments.

  Terms of Service was not blank: it held `https://www.facebook.com/`, a leftover default.

  **Still wrong on that page, left for a decision:**

  | Field | Current | Suggested |
  | --- | --- | --- |
  | Data deletion instructions URL | `https://www.facebook.com/` | `https://agrimall.io/privacy#your-rights` — §9 covers erasure and gives the contact route |
  | Contact email | `vin.sandeepreddy@gmail.com` | `agrimall@agrimall.io` — another Gmail in the Meta record |
  | App domains | *(empty)* | `agrimall.io` |
  | Category | *(empty)* | may be required before the app can go Live (5.2) |

- [ ] **4.4 Submit** — Security Centre → Start Verification → India → Partnership → upload the
  GST REG-06 PDF, document type **GST certificate** → confirmation code by **email** to
  `agrimall@agrimall.io`.

  The domain match matters: the code must go to an address on the website's own domain. Never a
  Gmail address. Sandeep must do this personally as an authorised representative — a partner or
  tech provider cannot submit on his behalf.

- [ ] **4.5 Wait** — usually 2–5 business days, up to 14. Watch `agrimall@agrimall.io` and the
  Security Centre.

---

## Phase 5 — After approval *(Sandeep)*

- [ ] **5.1** Display name approval in WhatsApp Manager for WABA `102097146277644`
- [ ] **5.2** Switch app `653496656184174` to **Live**
- [ ] **5.3** Submit message templates for the order and advisory use cases
- [ ] **5.4** Messaging limits rise on volume and quality rating — no separate application

---

## Optional, strengthens the application

- [ ] Verify the domain `agrimall.io` in Business settings → Brand safety → Domains
- [ ] Fix the `Privacy-policy` repo — it describes the **AgriShow** app, names contacts at
  `agrimall.com` (a domain not owned), and claims no personal data is collected. Wrong on all
  three counts and a liability if anyone finds it. Separate job from this one.

---

## Known traps

| Trap | Why it bites |
| --- | --- |
| `/privacy` returns 404 while rendering fine | CloudFront passes the origin status through. Invisible in a browser. Check with `curl.exe -I`, never by eye. |
| Hard-coded address or email in a component | Meta compares the site against the certificate. One stale copy fails the whole submission. Import `COMPANY`. |
| `index.html` cached at the edge | It is not fingerprinted. `scripts/deploy.ps1` sets `no-cache`; a plain `aws s3 sync` does not. |
| Gmail in the footer | The confirmation code must reach a domain-matched address. A Gmail on the site argues against the match. |
| Navbar anchors as `#about` | Breaks on `/privacy` and `/terms`. Must be `/#about`. |
| Pushing to GitHub | Deploys nothing. Deploy is build + sync + invalidate. |
| A `.ps1` saved without a BOM | PowerShell 5.1 reads it as ANSI. An em-dash becomes `”`, which it treats as a string quote, and the script will not parse. Save `scripts/*.ps1` as UTF-8 **with** BOM. |
| Head tags silently absent | `react-helmet-async` failed here with no error at all. `src/hooks/use-head.ts` replaced it — if a title or canonical looks wrong, check that file, not a library. |
