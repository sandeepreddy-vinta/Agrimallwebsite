# Agrimall Website — Deployment Guide

`agrimall.io` — Sree Mohan Agri Mall

> **Different from the Agri Dost site.** Agri Dost is plain HTML: you upload the
> files as they are. This one is a **Vite + React single-page app** — you must
> `npm run build` first and upload the generated `dist/` folder, never the
> source. Two consequences follow, and the second one is the one that bites:
> client-side routing means `/privacy` is not a file in the bucket, so
> **CloudFront must be told to serve `index.html` for it** (Step 3.3 below).
> Without that, `https://agrimall.io/privacy` returns a 404 — which fails both
> Meta business verification and the WhatsApp app's Live-mode check.

---

## Stack

| | |
|---|---|
| Framework | Vite 5 + React 18 + TypeScript |
| Styling | Tailwind CSS + shadcn/ui, `Sora` font |
| Animation | framer-motion |
| Routing | react-router-dom (`/`, `/privacy`, `/terms`) |
| Head tags | react-helmet-async (per-route title/meta) |
| Origin repo | `github.com/sandeepreddy-vinta/Agrimallwebsite` |

---

## Architecture Overview

```
Source (this folder)  --  npm run build  -->  dist/
       |
       v
S3 Bucket (ap-south-1, Mumbai)
       |
       v
CloudFront CDN  +  custom error responses (403/404 -> /index.html)
       |
       v
agrimall.io  (DNS points to CloudFront)
       |
       v
ACM SSL Certificate (us-east-1, free HTTPS)
```

**Estimated monthly cost:** under $1 — S3 ~$0.02, CloudFront ~$0.10–0.50, ACM free.

---

## Local Development

```bash
npm install          # first time only
npm run dev          # http://localhost:8080
npm run build        # produces dist/
npm run preview      # serve the production build locally
```

Before every deploy, check both routes load in `npm run dev`:

- `http://localhost:8080/` — home page
- `http://localhost:8080/privacy` — privacy policy
- `http://localhost:8080/terms` — terms of service

---

## Company details live in ONE file

`src/config/company.ts` holds the legal name, registered address, GSTIN,
published email and phone. The footer, navbar, contact section, privacy policy
and the `schema.org` structured data all read from it.

**Do not hard-code these anywhere else.** Meta business verification compares
the name, address and contact on this website against the GST certificate and
the Business Manager record; a single stale copy in one component is what makes
them disagree.

The address and GSTIN in that file are transcribed from the GST certificate
(REG-06, issued 08/05/2024) and match what is entered in Business Manager →
Business info. They are already validated — do not "tidy" them.

The file holds two forms of the address on purpose: `addressLines` is the
readable form used in the footer and contact section, and `addressCertified` is
the full certificate address including the premises detail ("Basement Part A,
Part B and First Floor Part G"), used in the entity tables on `/privacy` and
`/terms` where an exact match with the document matters most.

**One value still needs your input:** `grievanceOfficer`, currently `[NAME]`.
India's IT Rules expect a named person on the privacy page.

---

## Step 1: Create S3 Bucket & Upload

### 1.1 Create Bucket
- AWS Console → S3 → **Create Bucket**
- **Bucket name:** `agrimall.io`
- **Region:** `ap-south-1` (Mumbai)
- **Uncheck** "Block all public access" → acknowledge the warning

### 1.2 Enable Static Website Hosting
- Bucket → **Properties** → **Static website hosting** → Edit → Enable
- **Index document:** `index.html`
- **Error document:** `index.html`

> This alone does **not** fix SPA routing if CloudFront uses the REST origin —
> see the warning in Step 3.1.

### 1.3 Bucket Policy
```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::agrimall.io/*"
        }
    ]
}
```

### 1.4 Upload
Build first, then upload **the contents of `dist/`** to the bucket root:

```bash
npm run build
aws s3 sync dist/ s3://agrimall.io --delete
```

`dist/` contains `index.html`, `favicon.png`, `logo.png`, `robots.txt` and a
hashed `assets/` folder. Never upload `src/`, `node_modules/` or `package.json`.

---

## Step 2: Free SSL Certificate (ACM)

> Do this **before** creating CloudFront.

- AWS Console → **Certificate Manager**
- **Switch region to US East (N. Virginia) `us-east-1`** — CloudFront only
  accepts certificates from this region
- **Request certificate** → public certificate
- Domains: `agrimall.io` and `www.agrimall.io`
- Validation method: **DNS**
- Add the CNAME records AWS shows you at your DNS provider. Enter only the
  hash part starting with `_` — the provider appends the domain itself. If AWS
  gives the same CNAME for both domains, add it once.
- Wait 5–30 minutes for status **Issued**

---

## Step 3: CloudFront Distribution

### 3.1 Create
AWS Console → **CloudFront** → **Create Distribution**

| Setting | Value |
|---|---|
| **Origin domain** | `agrimall.io.s3.ap-south-1.amazonaws.com` (pick from the dropdown) |
| **Origin access** | Public |
| **Viewer protocol policy** | Redirect HTTP to HTTPS |
| **Allowed HTTP methods** | GET, HEAD |
| **Cache policy** | CachingOptimized |
| **Price class** | North America, Europe, Asia |
| **Alternate domain names (CNAMEs)** | `agrimall.io`, `www.agrimall.io` |
| **Custom SSL certificate** | the ACM certificate from Step 2 |
| **Default root object** | `index.html` |

> **Why `/privacy` 404s without Step 3.3:** the live distribution actually uses
> the S3 **website** endpoint (`agrimall.io.s3-website.ap-south-1.amazonaws.com`),
> so the "Error document" from Step 1.2 does apply — S3 returns `index.html`,
> and the app renders. But an error document is served with **status 404**, and
> that status is what a reviewer's tooling reads. Step 3.3 rewrites it to 200.
> (Had the origin been the REST endpoint, S3 would answer `NoSuchKey` and Step
> 3.3 would still be the fix.)

### 3.2 Deploy
Wait 5–15 minutes, then test the `d1234abcdef.cloudfront.net` URL.

### 3.3 Custom Error Responses — CHECK THE RESPONSE CODE

Distribution → **Error pages** tab → **Create custom error response**, twice:

| HTTP error code | Customize error response | Response page path | HTTP response code |
|---|---|---|---|
| `403 Forbidden` | Yes | `/index.html` | `200` |
| `404 Not Found` | Yes | `/index.html` | `200` |

**State of the live distribution.** Checked 4 Sep 2026 via
`aws cloudfront get-distribution-config`: `CustomErrorResponses` was
`{"Quantity": 0}` — there were **no** rules at all. The earlier note here, that
the rule existed and merely passed the wrong status through, was wrong; the 404
came from the bucket's error document, not from a CloudFront rule.

Both rules were added on 4 Sep 2026 with response code `200`. The distinction
they fix is invisible in a browser and decisive for a reviewer: the page looks
right to a human while Meta's automated check, Google and any `curl -I` see a
404 and treat the privacy policy as missing.

Confirm with:

```bash
curl -I https://agrimall.io/privacy      # must be HTTP/2 200, not 404
```

Verify after deploying — in a private window, with no login:

```
https://agrimall.io/            -> home page
https://agrimall.io/privacy     -> privacy policy, HTTP 200, valid padlock
https://agrimall.io/terms       -> terms of service, HTTP 200
```

---

## Step 4: Point the Domain at CloudFront

- Delete existing A / CNAME records for `@` and `www`
- Add: **CNAME** `www` → `d1234abcdef.cloudfront.net`, TTL 600
- Root domain: most registrars can't ALIAS to CloudFront. Either forward
  `agrimall.io` → `https://www.agrimall.io`, or move DNS to **Route 53**
  ($0.50/month), which supports ALIAS records natively.
- DNS propagation: 15–60 minutes

> For Meta verification, prefer Route 53 with an ALIAS on the apex. A registrar
> "forwarding" rule sends a 301 to the `www` host, and a reviewer checking
> `agrimall.io` sees a redirect rather than the site.

---

## Updating the Site

```bash
npm run build
aws s3 sync dist/ s3://agrimall.io --delete
aws cloudfront create-invalidation --distribution-id YOUR_DISTRIBUTION_ID --paths "/*"
```

The invalidation matters: `index.html` is cached at the edge, and without it
visitors keep getting the old build for hours.

---

## Useful Commands

```bash
aws s3 ls s3://agrimall.io --recursive
aws cloudfront get-distribution --id YOUR_DISTRIBUTION_ID --query "Distribution.Status"
nslookup agrimall.io
curl -I https://agrimall.io/privacy      # expect HTTP/2 200, not 404
curl -I https://agrimall.io/terms        # expect HTTP/2 200, not 404
```

---

## Meta Business Verification Checklist

The website half of the verification. Tick all of these before submitting in
Business Manager → Security Centre.

- [ ] `src/config/company.ts` matches the GST certificate exactly
- [ ] `grievanceOfficer` filled in with a real name
- [ ] Footer shows legal name, registered address, phone, email and GSTIN
- [ ] Footer email is `agrimall@agrimall.io` — **not** a Gmail address; Meta
      sends the confirmation code to an address on the website's own domain
- [ ] `https://agrimall.io/privacy` returns **200**, not 404 — see Step 3.3
- [ ] `https://agrimall.io/terms` returns 200
- [ ] Privacy policy is reachable by a link in the footer, not just by URL
- [ ] Same legal name and address in Business Manager → Business info
- [ ] Privacy Policy URL set in App Dashboard → Settings → Basic (app
      `653496656184174`) — required before the app can go Live

---

## Repository

```bash
git remote -v     # origin  https://github.com/sandeepreddy-vinta/Agrimallwebsite.git
git add -A && git commit -m "your message" && git push origin main
```

Pushing does **not** deploy — GitHub is version history only. Deploying is the
`npm run build` + `aws s3 sync` + invalidation sequence above.
