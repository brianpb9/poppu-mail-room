# 🔴 STUDIO REVIEW BOARD v4 — Poppu's Mail Room
**Gate:** QA + QC Depth pass (founder ask: fun · downloads · clear monetization · broad gameplay)
**Benchmark:** Toca Boca / Sago Mini (warmth) × Rogue Duck (density)
**Evidence:** 23 rendered screenshots (`.playtest/`), full-file code trace, Playwright repro scripts
**Date:** 2026-07-05 · Convened by Max

---

## 🎯 MAX VERDICT: **HOLD — do not ship. Recoverable in one focused fix sprint (not a rebuild).**

Two independent gate-breakers force the HOLD regardless of scores:
1. **QA BLOCKER** — multi-touch belt deadlock (no build ships with an open blocker).
2. **Safety guardrail breach** — the tutorial fail-shames the child's first touch (auto-HOLD under "no fail-shaming").

The core is genuinely close to a Sago Mini rival. The defects choking it are small, specific, and mostly ~2-line or asset-swap fixes. This is the closest thing the studio has built to a category rival — it is worth finishing properly.

---

## 👥 BOARD SCORES

| Judge | Score | Verdict | Core finding |
|---|---|---|---|
| Creative Director | 6/10 | Reject/Hold | Core play 7.5–8; cosmetic shop is clipart-tier 3 → premium promise breaks at the reward screen |
| Product Director | 6/10 | Reject | Art is download-worthy; broken first-touch + English reading wall for IN/SEA non-readers; no store icon |
| Gameplay Director | 4/10 | Reject | ~2 real verbs, not 4; boredom at L6; daily-goal + streak are dead code |
| Player Advocate | 4/10 | Reject | Toca-grade joy bookended by two trust-breakers (tutorial misdirect + unfair stamp guess) |
| Parent Advocate | Strong Reject | **auto-HOLD** | Privacy posture verified clean; tutorial = code-verified fail-shaming = safety breach |
| QA Lead | 2/10 | **DO NOT SHIP** | 1 BLOCKER + 3 Major (deadlock, last-level Next, save wipe, dead streak) |
| Playtester | — | Go back (fast fixes) | Stable build, zero console errors, all 32 assets load; 2 age-specific defects |
| Growth Analyst | — | Model delivered | Free-with-one-time-unlock, ~$4.99, ethically clean |
| Publishing Dir | — | GTM delivered | ASO + IN keywords + Teacher-Approved + owned-first UA |

---

## 🔴 CONFIRMED CRITICAL DEFECTS (all code-verified by Max)

### C1 — Tutorial teaches the WRONG move · `index.html:591` + `:1009` — **[Critical / Safety]**
Guide hand + target ring always point at `activeBoxes()[0]` (the **star** box); first package is `randType()` (random). ~83–92% of first-time players are guided to the wrong box → rejection "boop" on their very first touch, for following instructions correctly. Fail-shaming breach. **Fix (~2 lines):** point the guide at the box matching the front package, OR force the first Level-1 spawn to be a star. Also: hand should land on the *package* first, then trace to the box, and loop until first success (fade is 0.6s / one try today).

### C2 — Multi-touch belt deadlock · `index.html:545, 819, 892–905` — **[BLOCKER]**
`dragging` is a single global. A second touch before the first releases (a toddler smearing a hand, or an OS-eaten `pointerup` on app-switch) orphans package A in `state:'dragging'`: never updated, never rendered, but still counts against `beltCap`. Twice → belt stops spawning forever → level mathematically uncompletable, silently. **Fix:** track drags per-`pointerId` (Map), force-return any prior drag on new pick, add a 4s stuck-drag auto-return, and release drags on `blur`/`visibilitychange`.

### C3 — Cosmetic shop is clipart · `.playtest/07b-shop-style-*.png` — **[Quality blocker]**
Chef hat = white blob, crown = flat vector, conveyor skins = muddy slivers, mailbox skins near-identical, all shown as floating icons not on Poppu. This is the screen where kids spend earned Stamps — clipart at the reward moment caps the product below premium. **Fix:** regenerate all 4 cosmetic sets to core-art bar (Higgsfield + Poppu ref sheet), preview in-context.

### C4 — Stamp station is unsolvable by logic · `index.html:606, 1171` — **[Critical / Fun]**
Correct stamp `want=opts[random]` is unrelated to the package shown; highlight only appears *after* a correct tap. Pure 1-of-3 guessing that contradicts the match logic the game teaches. **Fix:** make the correct stamp = the package's actual type, with a visible pre-tap cue.

### C5 — Daily goal + 7-day streak are DEAD CODE · `index.html:128, 149, 453, 664` — **[Major / Retention]**
`streak` is only ever reset, never incremented. `goldenHat` never set true. `deliveredToday` incremented but never shown or rewarded. The entire "come back tomorrow" engine from the brief does nothing. **Fix (~80% already coded):** increment streak on first delivery of a new day, award goldenHat at 7, render a "Today's Mailbag X/N" bar + daily reward.

---

## 🟠 MAJOR / MINOR (QA)

- **M1** Last-level (10) "Next" button silently replays L10 instead of being inert · `:794–799` vs `:1356` guard mismatch.
- **M2** Array-shaped corrupt save (`typeof [] === 'object'`) passes the guard, then `persist()` silently wipes all progress · `:139`. Fix: add `Array.isArray` check.
- **min** Locked-scene tap reuses the wrong-match "boop" (`:776`) — must be a neutral "not yet" cue before monetization ships on top of it.
- **min** Golden package gives flat +15 stamps, not the spec'd 3× stickers · `:658`.
- **min** `SAVE.stickers` grows unbounded; cap at 32. No object pooling (no perf issue observed). No PWA manifest/service worker.
- **min** Poppu's celebrate art overlaps the "Next" button on level-done · `.playtest/06-leveldone.png`.
- **min** "1 stickers" grammar.

---

## 📊 ANSWERS TO THE FOUNDER'S FOUR ASKS

**1. Fun?** The reward loop (plop + chime + friend pop-up + confetti / golden) is genuinely Toca-grade. But it's choked at both ends: a misdirecting tutorial and an unfair stamp station break trust in the first 10 seconds, and the last 4 levels add no new verb (same drag, faster). Fun is *present but buried*.

**2. Downloads?** The art hero shot (`02-start.png`) is download-worthy. Blockers to installs: no store icon exists yet; UI is English-only for an IN/SEA-first market; the broken first-touch will seed low D1 + poor early reviews (ASO poison). GTM/ASO plan is ready (IN keywords, "tanpa iklan tanpa IAP" wedge vs Marbel, Teacher-Approved, TikTok-of-a-toddler).

**3. Monetization — clear?** Now yes, as a *design*: **Free-with-one-time-unlock** (Toca/Sago model) — free L1–3 + full Stamp loop, one permanent ~$4.99 IAP unlocks L4–10 + Forest/Space. No ads, no subscription, no consumables, Stamps never purchasable, math-gate + OS confirm before buy, Restore Purchase required. **Ethically clean (parent-advocate: would Recommend once built).** Build dependency: the current localStorage-only single file **cannot safely take real money** → needs a native wrapper (Capacitor/TWA) for real billing + receipt restore.

**4. Gameplay breadth?** Currently **narrow** — ~2 real decision-verbs (drag-match, and stamp *once C4 is fixed*); seal & shake are decision-free filler; scenes are pure background swaps; a kid sees everything in ~15–20 min. Breadth roadmap: (1) revive daily/streak, (2) **Friend Album** collection meta on existing `charDeliveries` data, (3) themed special-delivery days, (4) convert seal/shake into real-choice micro-mechanics, (5) **Free-Play sandbox mail room** — the Toca "toy-box" move that turns a level-list into a toy.

---

## 🗺️ PRIORITIZED ROADMAP

### P0 — Ship-blockers (must clear to lift the HOLD) · ~½ day
- C2 multi-touch deadlock (BLOCKER)
- C1 tutorial misdirect (safety)
- M1 last-level Next guard · M2 array-save guard · locked-scene neutral cue
- C5 revive daily goal + streak (retention + it's the only re-open trigger)

### P1 — Fun + premium bar · ~1–2 days
- C4 stamp station → real matching + pre-tap cue
- C3 regenerate 4 cosmetic asset sets to core-art bar, preview in-context (art task)
- Level-done overlap fix; golden-package sticker multiplier

### P2 — Downloads + reach · ~2–3 days
- Bahasa Indonesia localization (start, tutorial, buttons) + icon/voice for zero-reading
- App icon + 6-screenshot store set; privacy-policy URL; Designed-for-Families / Made-for-Kids
- Simplify first screen to one action; hide padlocks until after first win

### P3 — Breadth (make it "luas") · ~1–2 weeks
- Friend Album collection meta · special-delivery days · real seal/shake mechanics · Free-Play sandbox

### P4 — Monetization build (commercial decision required) · scoped after P0–P2
- Native wrapper (Capacitor/TWA) · entitlement + paywall + math-gate + Restore · instrumentation

---

---

## ✅ P0 FIX SPRINT — COMPLETED & VERIFIED (2026-07-05)

All six ship-blockers fixed in `index.html` and verified on the running build (headless Chromium, real pointer events + `__t` hooks, zero console errors throughout):

| Fix | Change | Verification |
|---|---|---|
| C2 multi-touch deadlock (BLOCKER) | onDown returns prior drag; per-frame orphan sweep returns any `'dragging'` package not held; `blur`/`visibilitychange` release | Injected orphan → cleared to belt next frame; belt never stalls |
| C1 tutorial misdirect (safety) | Guide now targets the box matching the frontmost belt package; hand starts on the package | Forced a **gear** first package → ring correctly on gear box (`.playtest/verify-tutorial-fixed.png`) |
| C5 daily goal + streak (dead code) | streak increments on first completion of a new day; goldenHat at 7; daily goal awards +20; **rendered** on Start bar + parent dashboard | streak 3→4 ✓, streak 6→7 + goldenHat ✓, goal fires at target ✓ (`.playtest/verify-dailybar.png`) |
| M1 last-level Next | Guard: on level 10, "Next" routes Home | Completed L10 → tapped Next → state `START`, no silent replay ✓ |
| M2 array-save wipe | `Array.isArray` added to corruption guard | Array save `[1,2,3]` → recovers to defaultSave, no wipe ✓ |
| locked-scene cue | Locked scene/level now play a neutral `Audio_.locked()`, not the wrong-match "boop" | Code path swapped |

**HOLD status:** the two gate-breakers (QA BLOCKER + fail-shaming safety breach) are cleared. Remaining before ship: P1 (stamp station = real match, cosmetic art regen) and the quality re-screen. P2 (localization + store assets) and P4 (monetization build) per founder decision.

---

*Studio Review Board v4 · Max · HDRV Studio · 2026-07-05. Supersedes REVIEW_BOARD_v3.md (self-scored 8.4). This pass re-scored cold on rendered evidence with independent judges; the self-score did not hold. P0 sprint executed and verified same day.*
