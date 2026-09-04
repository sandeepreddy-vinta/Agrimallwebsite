---
description: Check everything the Meta business verification submission depends on
---

Run the website-side checks for Meta business verification, then report a go / no-go.

**Local**

```powershell
cd "E:\San\WorkSpace\Claude WorkSpace\Agrimall Website"
npm run build
```

The build must succeed. Then grep `dist/assets/*.js` and confirm:

- `37AELFS0346C1Z5` present
- `agrimall@agrimall.io` present
- `Grievance Officer` present
- `sreemohanagrimall@gmail.com` absent
- `Lovable` absent
- `[NAME]` absent anywhere in `src/`

**Live**

```powershell
cd "E:\San\WorkSpace\Claude WorkSpace\Agrimall Website"
.\scripts\verify-live.ps1
```

**Consistency**

Read `src/config/company.ts` and compare against the values in `DEPLOYMENT.md`'s verification
checklist. The legal name, address and GSTIN must be identical to the GST certificate and to
Business Manager → Business info. Flag any difference, however small — punctuation and casing
included.

Report each item as pass or fail with the specific value found. Do not summarise as "looks
good"; a reviewer compares character by character, so quote what you actually saw.
