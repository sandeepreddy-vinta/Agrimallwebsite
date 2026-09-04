---
description: Build, deploy to S3 and invalidate CloudFront, then verify the live site
---

Deploy agrimall.io.

1. Confirm the working tree is clean or that the user wants uncommitted changes shipped.
2. Read `deploy.config.json`. If `bucket` or `distributionId` still say `REPLACE-…`, stop and
   ask the user to run `aws s3 ls` and `aws cloudfront list-distributions`, then fill them in.
3. Run the deploy:

   ```powershell
   cd "E:\San\WorkSpace\Claude WorkSpace\Agrimall Website"
   .\scripts\deploy.ps1
   ```

4. Wait about 90 seconds for the edges, then run `.\scripts\verify-live.ps1`.
5. Report the result plainly. If any route returned something other than 200, do NOT call the
   deploy successful — the most likely cause is the CloudFront custom error responses passing
   the original status through instead of 200. See CLAUDE.md §2.

Never deploy without verifying afterwards. A deep link that renders but returns 404 is the
failure mode this project exists to avoid.
