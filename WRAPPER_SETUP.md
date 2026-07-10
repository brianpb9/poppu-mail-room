# 📦 Native Wrapper Runbook — Poppu's Mail Room ($1.99 one-time unlock)
Turns the web build into a store-listable iOS/Android app with real IAP. Everything the *web project* can't do lives here. Config is in `wrapper/`. Do this on a Mac with Xcode + Android Studio.

**Stack:** Capacitor (WebView wrapper) + **direct Google Play Billing** via **`cordova-plugin-purchase`** (Fovea) for IAP — NO RevenueCat, no third-party server, no revenue cut. For a single one-time non-consumable on Android, Play returns a signed + auto-acknowledged purchase, so the plugin talks straight to Play Billing and the bridge is ~40 lines (already written: `wrapper/poppu-billing-bridge.js`). The same plugin covers Apple StoreKit with the same product id if iOS is added later. (RevenueCat is only worth adding later if you go cross-platform AND want its dashboard/receipt-server — the game's `window.PoppuBilling` contract is unchanged either way, so it's a drop-in swap.)

---

## 1. One-time project init
```bash
cd wrapper
npm install
npx cap init "Poppu's Mail Room" com.poppuworld.mailroom --web-dir www
npm run copy-web          # copies ../index.html + ../manifest.json + ../assets → www/
npx cap add ios
npx cap add android
```
`npm run sync` re-copies the web build and syncs native after any game change.

## 2. Activate monetization in the wrapper's web copy
In `wrapper/www/index.html` (the copied build), flip the flag the game already ships with:
```js
const IAP_ENABLED = false;   // →  const IAP_ENABLED = true;
```
That's the only game-code change. `SAVE.purchased`, `FREE_LEVELS=3`, `contentLocked(n)`, and the `Billing` bridge contract are already in the build (see MONETIZATION.md §5). Automate it in `copy-web` if you like:
`sed -i '' 's/const IAP_ENABLED = false/const IAP_ENABLED = true/' www/index.html`

## 3. The billing bridge — implement `window.PoppuBilling` (direct Play Billing, no RevenueCat)
The game calls `window.PoppuBilling.buy('poppu_full_unlock', cb)` / `.restore(cb)` and flips `SAVE.purchased` only on `cb(true)`. The bridge is **already written**: `wrapper/poppu-billing-bridge.js` (copied into `www/` by `npm run copy-web`). It uses **`cordova-plugin-purchase`** talking straight to Google Play Billing — no third party, no revenue cut.
```bash
cd wrapper
npm i cordova-plugin-purchase       # the direct Play Billing / StoreKit plugin
npx cap sync android                # links the native billing module
```
Then load the plugin + bridge before `</body>` in `www/index.html` (add to `copy-web` so it's automatic):
```html
<script src="poppu-billing-bridge.js"></script>
```
The bridge registers `poppu_full_unlock` as a NON_CONSUMABLE, finishes Play's signed+acknowledged purchase (so **no billing server is needed** for a one-time unlock), and resolves `buy`/`restore` per the contract. For stronger anti-piracy later you can add local signature verification with the app's Play license key — optional for a $1.99 unlock.
> The **paywall panel + math parent-gate** UI are **already built in the game** (BUILD-69, dormant behind `IAP_ENABLED=false`): `contentLocked(n)` is wired at the level-node tap / post-office start / level-complete, opens a typed-number-pad grown-up gate → the paywall → `Billing.purchase()`. Nothing left to build in the game — the wrapper just flips `IAP_ENABLED=true` and provides `window.PoppuBilling` (this bridge).

## 4. Store product (Play Console — no RevenueCat)
1. **Play Console → Monetize → Products → In-app products → Create product**: id `poppu_full_unlock`, type **non-consumable** (one-time), price **US$1.99** base tier (let Play auto-generate PPP local prices; sanity-check the IN/PH/VN/TH rows land in an impulse zone). Set it **Active**.
2. Test the real purchase for **$0** with a Play **License tester** account (Play Console → Setup → License testing → add the tester's Gmail). No RevenueCat, no store keys to paste.
3. The **Restore Purchase** button already exists in the paywall (Play/Apple require it) → the bridge's `restore()` covers it via `store.restorePurchases()`.
4. *(iOS later, if added)*: same product id in App Store Connect; the same plugin + bridge handle StoreKit — flip `PLATFORM` / add `Platform.APPLE_APPSTORE` in the bridge.

## 5. Store compliance (both stores, kids app)
- **Privacy policy URL** — host `PRIVACY_POLICY.html` (e.g. it's already live via GitHub Pages: `https://brianpb9.github.io/poppu-mail-room/PRIVACY_POLICY.html`) and paste that URL in both consoles.
- **Google Play:** Designed for Families → target age "Ages 5 & under"; complete the Data safety form (declare: no data collected/shared); IARC content rating.
- **Apple:** set **Made for Kids** + age band 2-5 (auto-restricts data collection — you already comply); App Privacy = "Data Not Collected".
- Parent gate is already in the build (3s long-press → dashboard); the purchase math-gate sits in front of the buy button per MONETIZATION.md.

## 6. App metadata (from publishing-director)
- Play title: `Poppu: Toddler Mail Sorting` · Apple title `Poppu's Mail Room` + subtitle `Toddler games ages 2, 3, 4`.
- Icon: `assets/app-icon-v2.png` (1024²). Screenshots: `assets/store-screenshot-*.png`. Localize the listing to Bahasa Indonesia for the IN launch; lead with "tanpa iklan, tanpa pembelian mengganggu".

## 7. Build + internal test tracks
```bash
npm run sync
npx cap open android   # Android Studio → Build → Generate Signed Bundle (AAB) → upload to Play Console → Internal testing
npx cap open ios       # Xcode → Archive → Distribute → TestFlight (internal testers)
```
- **Google Play Internal testing:** add up to 100 tester emails; they install via an opt-in link. Test the **real $1.99 purchase** with a Play **license tester** account (charged $0).
- **Apple TestFlight:** add internal testers (up to 100 App Store Connect users); IAP runs in **sandbox** (no real charge).

---
## Status
- ✅ Web build, PWA, monetization scaffold, entitlement + bridge contract, price ($1.99), privacy policy, live PWA tester URL — **done in the web project.**
- ✅ Paywall panel + typed-number-pad grown-up gate + `contentLocked` wiring — **built in the game** (BUILD-69), dormant behind `IAP_ENABLED=false`. Direct Play Billing bridge (`wrapper/poppu-billing-bridge.js`) — **written**.
- ⏳ Remaining (dev on a Mac): `npm i cordova-plugin-purchase` + `npx cap sync`, flip `IAP_ENABLED=true` in the wrapper's `www/index.html`, create the `poppu_full_unlock` $1.99 non-consumable in Play Console, build + test the $0 license-tester purchase. No RevenueCat account, no RC keys.

*Wrapper config: `wrapper/capacitor.config.json`, `wrapper/package.json`. Monetization model: `MONETIZATION.md`. Tester guide: `INTERNAL_TEST.md`.*
