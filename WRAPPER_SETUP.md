# 📦 Native Wrapper Runbook — Poppu's Mail Room ($1.99 one-time unlock)
Turns the web build into a store-listable iOS/Android app with real IAP. Everything the *web project* can't do lives here. Config is in `wrapper/`. Do this on a Mac with Xcode + Android Studio.

**Stack:** Capacitor (WebView wrapper) + **RevenueCat** (`@revenuecat/purchases-capacitor`) for IAP — it handles receipt validation, Restore, and cross-store the non-consumable for you, which is why it's the right choice for a small team over raw StoreKit/Play Billing.

---

## 1. One-time project init
```bash
cd wrapper
npm install
npx cap init "Poppu's Mail Room" studio.hdrv.poppu.mailroom --web-dir www
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

## 3. The billing bridge — implement `window.PoppuBilling`
The game calls `window.PoppuBilling.buy('poppu_full_unlock', cb)` / `.restore(cb)`. Add `wrapper/www/poppu-billing-bridge.js` and load it before `</body>` in `www/index.html`:
```html
<script type="module" src="poppu-billing-bridge.js"></script>
```
```js
// poppu-billing-bridge.js — RevenueCat → window.PoppuBilling (the contract the game expects)
import { Purchases, LOG_LEVEL } from '@revenuecat/purchases-capacitor';

const ENTITLEMENT = 'full_unlock';         // the RevenueCat entitlement id
const PRODUCT_ID  = 'poppu_full_unlock';   // the $1.99 non-consumable (same id both stores)

async function configure() {
  const apiKey = /android/i.test(navigator.userAgent)
    ? 'goog_XXXXXXXXXXXX'   // RevenueCat Android public SDK key
    : 'appl_XXXXXXXXXXXX';  // RevenueCat iOS public SDK key
  await Purchases.setLogLevel({ level: LOG_LEVEL.WARN });
  await Purchases.configure({ apiKey });
}
const hasEntitlement = (info) => !!info?.entitlements?.active?.[ENTITLEMENT];

window.PoppuBilling = {
  async buy(sku, cb) {
    try {
      const offerings = await Purchases.getOfferings();
      const pkg = offerings.current?.availablePackages?.find(p => p.product.identifier === PRODUCT_ID)
                || offerings.current?.availablePackages?.[0];
      const { customerInfo } = await Purchases.purchasePackage({ aPackage: pkg });
      cb(hasEntitlement(customerInfo));   // game flips SAVE.purchased only on true
    } catch (e) { cb(false); }            // user-cancel or error → no unlock, no charge
  },
  async restore(cb) {
    try { const { customerInfo } = await Purchases.restorePurchases(); cb(hasEntitlement(customerInfo)); }
    catch (e) { cb(false); }
  },
};
configure();
```
> The **paywall panel + the math parent-gate** UI (MONETIZATION.md §4) are gated on `IAP_ENABLED` and call `Billing.purchase()` only AFTER the gate passes. Build those two small canvas screens in the game and wire `contentLocked(n)` at the level-node tap / post-office start / locked scene+friend taps to open the paywall. (This is the remaining in-game UI work; the entitlement + bridge are done.)

## 4. Store product + RevenueCat
1. **App Store Connect** and **Play Console**: create a **non-consumable** IAP with product id `poppu_full_unlock`, price tier = **US$1.99** (let each store auto-generate PPP local prices; sanity-check the IN/PH/VN/TH rows).
2. **RevenueCat** (app.revenuecat.com): create the project, add both store apps, create entitlement `full_unlock`, attach the `poppu_full_unlock` product, paste the store keys. Put the RC public SDK keys into the bridge.
3. Set **Restore Purchase** button visible in the parent dashboard (Apple requires it for non-consumables — the bridge's `restore()` covers it).

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
- ⏳ This runbook's steps (wrapper build, RC keys, paywall UI, store products/declarations) — **the dev executes on a Mac**; nothing here needs the web project changed except flipping `IAP_ENABLED` and adding the bridge file.

*Wrapper config: `wrapper/capacitor.config.json`, `wrapper/package.json`. Monetization model: `MONETIZATION.md`. Tester guide: `INTERNAL_TEST.md`.*
