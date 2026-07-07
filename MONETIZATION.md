# 💰 Poppu's Mail Room — Monetization Spec
**Model: Free-with-one-time-unlock** (the classic Toca Boca / Sago Mini model)
Max · HDRV Studio · preschool 2-5 · IN/SEA-first then global

---

## 1. The model in one line
The game is **free to download and free to fully enjoy for a while**; a **single, permanent, optional purchase** unlocks the rest of the world. **No ads. No subscription. No consumables. No timers. Star Stamps are never for sale.** This is the exact model that earned Toca Boca / Sago Mini parent trust.

## 2. Free vs Paid boundary (`FREE_LEVELS = 3` in code)

| | Content |
|---|---|
| **FREE forever** | Levels **1–3**, the Town hub, Post Office (sort), the first Delivery Drive + a friend house, the Garden/collection wall, the full **Star Stamps** earn/spend loop (upgrades + entry cosmetics), daily goal + streak. Enough to fully prove the game and reach the first "aha." |
| **PAID — one-time "Unlock Full Post Town"** | Levels **4–10**, the remaining friend houses + drive biomes + Wrap Shop depth, the Forest & Star-Deck scenes, the full cosmetic set. |

Ethical rule: the paywall gates **CONTENT**, never *progress speed inside content already available*. No pay-to-skip-grind.

## 3. Price
- Single global base tier **US$1.99** (founder-set); both stores auto-generate **PPP-localized** local prices off that one tier — at submission, pull the Play Console / App Store Connect price matrix and sanity-check the **Indonesia / PH / VN / TH** auto-price lands in an impulse-parent zone (do not hand-pick local numbers). At $1.99 the IN auto-price lands around Rp 15–29k — a low-friction impulse tier for parents.
- **One SKU only, ever:** `poppu_full_unlock` (non-consumable). No second SKU. No "buy Stamps." No tiers.

## 4. The purchase flow (where the paywall sits + the gates)
1. Paid content is reached at: **finishing Level 3**, tapping a **locked Level 4+ node**, or a locked scene/friend — shown as a **friendly lock that routes to "ask a grown-up,"** never a live price to the child.
2. → **Parent gate** (the existing 3-second long-press on Poppu is the entry) → a **randomized multi-step math challenge** (e.g. "7 + 8") requiring a typed/dragged numeric answer. This gate sits in FRONT of any price or Buy button.
3. → only after the gate: the **paywall panel** shows what's unlocked (pictures) + the price + **Buy** + **Restore Purchase**.
4. → **Buy** calls `Billing.purchase()` → the native wrapper shows the **OS purchase sheet** (Apple/Google, with its own biometric/password confirm) → verifies the receipt → reports success → we flip `SAVE.purchased=true`.
5. **Restore Purchase** (required by Apple for non-consumables) → `Billing.restore()`.

**Non-negotiable ethics (lock these forever):**
- Star Stamps & golden packages stay **100% non-purchasable**.
- No countdown timers, "today only," fake was/now discounts, or repeat unprompted purchase pop-ups.
- The locked-content "tease" is a **static preview thumbnail only** — no "play 30s then cut off," no sad/guilt Poppu ("Poppu is waiting for you!").
- The parent dashboard states the full terms plainly once IAP ships: one-time price, exactly what it unlocks, no subscription, no further purchases.

## 5. Code state (what's already in the build — `index.html`)
- `SAVE.purchased` (default false) — the entitlement, migrates safely into old saves.
- `const IAP_ENABLED = false` — **the web/PWA build stays 100% free**; a web page cannot take real store money. The **native wrapper build sets this true**.
- `const FREE_LEVELS = 3`, `contentLocked(n)` — the free/paid gate (a no-op while IAP is off).
- `const Billing = { available(), purchase(done), restore(done) }` — the **exact bridge contract**; it calls `window.PoppuBilling.buy('poppu_full_unlock', cb)` / `.restore(cb)` and flips `SAVE.purchased` only on a verified success.

## 6. Remaining to ACTIVATE (native-wrapper stage — cannot be done in a web page)
1. Wrap the single `index.html` in **Capacitor (iOS/Android)** or **TWA (Android)**.
2. Implement `window.PoppuBilling` over **StoreKit 2 (iOS)** / **Play Billing (Android)** with **server-side/receipt validation**, exposing `buy(sku, cb)` and `restore(cb)`.
3. Build the **paywall panel** + the **math parent-gate** UI (spec §4) — trivial canvas screens gated on `IAP_ENABLED`; wire `contentLocked(n)` at the level-node tap + post-office start + locked scene/friend taps to open it.
4. Flip `IAP_ENABLED = true` in the wrapper build only.
5. Create the `poppu_full_unlock` non-consumable in App Store Connect + Play Console at the chosen base tier.

## 7. Rough commercial model (validate with live data, don't bank on it)
- Freemium free→paid benchmark ~**2–5%** (top performers ~10%); one flat non-consumable → ARPPU = the price, no whale tail. Treat **3–6% D30** as the number to *validate*, not forecast.
- LTV levers here are **more installs + more Poppu titles** (cross-promo in the parent dashboard only), and eventually a Toca-World-style **bundle subscription once 3+ Poppu titles exist** — NOT more purchase surface in this one game.

## 8. Instrumentation to add before launch (anonymous, on-device / first-party, **no ad-ID, no PII**)
North Star: **free→paid unlock rate** (purchases ÷ D7-retained). Guardrails: D1/D7/D30 retention, **refund rate** (the #1 "confusing/premature paywall" signal), time-to-first-paywall (must be after Level 3, never earlier). Events: `level_complete{n}`, `paywall_shown{trigger}`, `parent_gate_shown/passed/abandoned`, `purchase_initiated/completed/failed{reason}/refunded`, `restore_used`.

---
*Compatible with COPPA / GDPR-K and Google Play Families. The current shipped build takes **no money and collects no data** — the safest possible state until the wrapper + billing bridge land.*
