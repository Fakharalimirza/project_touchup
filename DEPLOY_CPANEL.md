# Deploy touchup.ae to Managed cPanel (d8197.lon1.stableserver.net) via Git Version Control

**Server:** `d8197.lon1.stableserver.net` | **IP:** `209.42.22.241` | **Plan:** 16GB / 8 cores / 300GB NVMe | **cPanel 134.0**
**Domain:** `touchup.ae` (currently `A 35.219.200.11` Firebase → will become `A 209.42.22.241`)
**Repo:** `github.com/Fakharalimirza/touchup-website` (or current `project_touchup`)
**Strategy:** Git VC + Setup Node.js App (Passenger) — no code behavior change.

---

## 1. Changes Already Committed in This Repo

* `src/ai/genkit.ts:1` — AI now **optional**: lazy `require('genkit')` inside `getAi()`. App boots without `GOOGLE_API_KEY` and without `genkit`/`@genkit-googleai` installed. Only throws when `ai` is actually used (blog generator, which is empty stub `src/app/blog/title-generator/actions.ts:1`). No need to set `GOOGLE_API_KEY` on cPanel.
* `server.js:1` — Passenger entry point (`node server.js`) that runs `next` on `PORT` injected by cPanel. If your Node App UI supports custom startup `npm start`, you can alternatively set startup file to `server.js` OR leave as `npm start` — both work. `server.js` is provided for hosting.com configs that require a physical file.
* `package.json:8` — `start` → `node server.js`, added `start:next` alias, pinned `engines.node 20.x` (matches `.idx/dev.nix:8`).
* `.cpanel.yml:1` — Git VC deployment tasks: `npm ci` → `npm run build` → `touch tmp/restart.txt`.

> No env values committed. `,env.txt` is your local source — copy into cPanel UI, do not commit `.env`.

---

## 2. cPanel — Git Version Control Setup (One-Time)

1. **cPanel > Git Version Control > Create**
   * Clone URL: `https://github.com/Fakharalimirza/touchup-website.git` (or SSH `git@github.com:...` if private — then add cPanel-generated key to GitHub Deploy Keys)
   * Repository Path: `/home/<cpanel-user>/touchup.ae`  (or `/home/<user>/repos/touchup` then symlink — simplest is direct `touchup.ae`)
   * Repository Name: `touchup.ae`
   * **Do not** clone into `public_html` — Node app runs outside `public_html`.

2. **Verify clone:** `Manage > Pull` should show `main` branch. Keep `.cpanel.yml` at repo root — cPanel auto-detects it.

3. **Webhook (optional auto-deploy):** After clone, cPanel shows webhook URL like `https://d8197.lon1.stableserver.net:2083/gitwebhook/<id>`. Add to GitHub > Settings > Webhooks > Payload URL. Then `git push` auto-triggers `Pull + .cpanel.yml tasks`. Skip if you prefer manual `Pull` button.

---

## 3. Setup Node.js Application (One-Time)

**cPanel > Setup Node.js App > Create Application**

| Field | Value |
|-------|-------|
| Node.js Version | `20.x` (or `22.x` — both support Next 15.3.8) |
| Application Mode | `Production` |
| Application Root | `/home/<user>/touchup.ae` ( **must match Git VC path** ) |
| Application URL | `https://touchup.ae` — cPanel will also add `www.touchup.ae` if domain is addon. If not, add second Application URL for `www`. |
| Application Startup File | `server.js` |
| Passenger Startup | Enabled |

After Create → **Environment Variables** → Add:

```
NODE_ENV=production
NEXT_PUBLIC_SITE_URL=https://touchup.ae
SMTP_HOST=mail.touchup.ae
SMTP_PORT=465
SMTP_SECURE=true
SMTP_USER=website-form@touchup.ae
SMTP_PASS=(mailbox password - paste as-is, contains #)
EMAIL_FROM_ADDRESS=Touchup Website <website-form@touchup.ae>
ADMIN_EMAIL_BOOKING=a.galal@touchup.ae, info@touchup.ae
ADMIN_EMAIL_CONTACT=a.galal@touchup.ae, info@touchup.ae
# GOOGLE_API_KEY not required (AI disabled) — leave empty
# RESEND_API_KEY removed - delete it from cPanel env vars
```

cPanel encrypts them — not written to `.env` file. See `.env.example` for template.

Click **Create** → **Run NPM Install** (or SSH `npm ci`) → **Run Build** (or wait for `.cpanel.yml` task).

---

## 4. Build & Restart (via SSH — Recommended due to 16GB RAM)

SSH to `d8197.lon1.stableserver.net` as cPanel user:

```bash
cd ~/touchup.ae
# If using Node selector, ensure correct binary:
export PATH=/opt/alt/alt-nodejs20/root/usr/bin:$PATH
node --version   # should be 20.x
npm ci            # or npm ci --omit=dev (handles patch-package)
npm run build     # creates .next/ — 12-90s on 8 cores
# Restart Passenger:
mkdir -p tmp && touch tmp/restart.txt
# Or via cPanel UI: Setup Node.js App > Restart
```

Verify locally on server:

```bash
curl -I http://127.0.0.1:3000/en  # PORT is dynamic — check env: echo $PORT
# Or after Passenger maps to domain:
curl -I https://touchup.ae/en  # after DNS cutover
```

Logs: `~/logs/passenger.log`, `~/touchup.ae/logs/` or cPanel > Node App > Logs.

**If LVE 1GB limit still hits OOM** despite 16GB server:
```bash
NODE_OPTIONS=--max_old_space_size=2048 npm run build
# Or WHM > CloudLinux Manager > Edit default > PMEM 4GB temporarily
```

---

## 5. DNS Cutover (You manage via ns1-4.mysecurecloudhost.com)

**Before:** `touchup.ae. 7200 A 35.219.200.11` (GCP Firebase)

1. Lower TTL: `7200 → 300` 2h before.
2. **Change:** `touchup.ae. A 35.219.200.11 → 209.42.22.241`
3. Keep `www.touchup.ae. CNAME touchup.ae` (follows automatically)
4. Keep `mail.touchup.ae. A 209.42.22.241` + `MX 0 mail.touchup.ae`
5. Remove Firebase ACME CNAME after 48h: `_acme-challenge_4zu73vkmbcnfihuf CNAME 18.authorize.certificatemanager.goog` — no longer needed.
6. **Resend deliverability (recommended):** In Resend Dashboard > Domains > `touchup.ae` → add the two TXT records it shows (usually `send._domainkey` + SPF). Your current `default._domainkey` is cPanel mail DKIM — keep it, add Resend’s alongside.

Wait 5-15 min, then:

```bash
dig +short touchup.ae A        # should return 209.42.22.241
curl -I https://touchup.ae     # 200
curl -I https://touchup.ae/ar  # 200 (next-intl)
```

---

## 6. SSL (AutoSSL)

cPanel > **SSL/TLS Status** > Select `touchup.ae` + `www.touchup.ae` > **Run AutoSSL** (uses existing `_acme-challenge` TXT `z7-RcjW...` / `jPcQgw...`).

Then **Domains > Force HTTPS Redirect** ON.

Verify: `https://touchup.ae` valid cert (Sectigo/Let’s Encrypt), not Firebase’s `goog` cert.

---

## 7. Future Updates (Git VC workflow)

```bash
# Local machine
git add . && git commit -m "update"
git push origin main
```

Then on `d8197`:
* **Option A (Webhook):** Auto-pulls + builds via `.cpanel.yml`.
* **Option B (Manual):** cPanel > Git Version Control > `touchup.ae` > **Pull** > then `tmp/restart.txt` (or Node App > Restart).
* **Option C (SSH):** `cd ~/touchup.ae && git pull && npm ci && npm run build && touch tmp/restart.txt`

No FTP zip needed.

---

## 8. Verification Checklist (Before Disabling Firebase)

- [ ] `https://touchup.ae/en` + `/ar` loads, language switcher works (`src/middleware.ts:9` matcher)
- [ ] `/en/services/*` (painting, plumbing etc) — images `public/Images/*.webp` load (Linux is case-sensitive)
- [ ] Booking form `src/app/[locale]/booking/actions.tsx:56` → admin inbox `a.galal@touchup.ae` + customer confirmation
- [ ] Contact form `src/app/[locale]/contact/actions.tsx:34` → admin
- [ ] No `GOOGLE_API_KEY` error in Node logs (`src/ai/genkit.ts` guarded)
- [ ] `_next/static` 200, `robots.txt` allow, `og-image` loads
- [ ] `dig touchup.ae` = 209.42.22.241, AutoSSL valid

---

## 9. Firebase Decommission (After 48h Stable)

Firebase Console > Project `touchup-42i8o` > Hosting > **Disable domain** `touchup.ae` / remove custom domain. Optionally `firebase hosting:disable` via CLI. **Keep project** until you’re 100% sure — don’t delete GCP project immediately (billing minimal). Remove `firebase.json`, `.firebaserc`, `.firebase/` from repo later if desired — not required.

---

## Quick SSH Reference for d8197

```bash
ssh <user>@d8197.lon1.stableserver.net -p 22
cd ~/touchup.ae
cat .cpanel.yml
pm2 logs  # if using PM2 alternative (not needed for Passenger)
```

**No changes to hosting.js logic required** — this is pure infra shift from Firebase App Hosting (`firebase.json:2` `"source": "."`) to cPanel Passenger.

