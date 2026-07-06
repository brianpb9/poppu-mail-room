# 🔍 QC / QA DEPTH PASS — Poppu's Post Town (expanded build)
**Convened by Max · 2026-07-07 · benchmark Toca Boca / Sago Mini**
Two independent depth workstreams on the running build (`142d481`): **qa-lead** (technical bug/stability) + **playtester** (rendered QC + played as a 3-5yo). Rendered evidence in `.playtest/QCDEPTH-*` (gitignored).

---

## 🎖️ MAX VERDICT: **HOLD** — hardened & crash-free, but the core reward loop repeats.
Two blockers were **fixed this pass** (committed `142d481`). The single thing keeping it from the bar is the **Delivery Drive looking the same for 4/5 friends** — and that needs biome art (a Higgsfield credit top-up), the decision already on the founder's desk.

---

## QA — TECHNICAL (qa-lead): **8/10, notably hardened**
`0 Critical · 1 Major (FIXED) · 3 Minor`. No crash, no dead-end, no soft-lock, no economy exploit, no save corruption across state-machine, new-state logic, save integrity, economy, assets, input, perf, compat. Most edge cases (tap-races, corrupt/array/old-schema saves, multi-touch, parent-gate resistance, aspect-ratio extremes, level-10 completion) were **already defended with explicit guards**.

| Finding | Sev | Status |
|---|---|---|
| **Drive friend-rotation gated by the wrong (previous friend's) house key** → out-of-order unlock permanently skips a friend | MAJOR | ✅ **FIXED + verified** (`unlockedDriveFriendIds()` now gates each friend by their own house; Puffy-first unlock now reaches Puffy) |
| "My Garden" (sticker) grid caps at 32 slots → lost fill-up payoff past ~160 deliveries | Minor | Open (P2) |
| 3 icons 404 every load (`ic-shop-bag/check/replay`) — procedural fallback works, no dead control | Minor | Open (needs art gen) |
| Drag not scoped per pointerId → 2-finger drag can mis-resolve (graceful, no stuck state) | Minor | Open (P2) |

**Scope note (not a bug):** there is **no real Garden mechanic** — "My Garden" is the sticker book reskinned (1 bloom / 5 deliveries). The GDD's Phase-2 plant/water/grow-between-sessions is **not built yet**.

---

## QC — RENDERED (playtester): **GO BACK**
Crash-free, world cohesive, friend houses genuinely Toca/Sago-tier. Three quality gaps block the bar:

| Finding | Sev | Status |
|---|---|---|
| **Color-match mailbox badges read as empty white rings** (light `star`/`gear` gradient washed into the white badge) — worst first impression | HIGH | ✅ **FIXED** (saturated mid→deep chip + ring + gloss) |
| **Delivery Drive biome repetition** — 4/5 friends share `bg_forest` + a 0.05–0.22 tint; the reward trip looks like the same forest road. Core dopamine beat collapses within 2 plays | HIGH (depth) | Open — **needs distinct biome art** (P1) |
| Space biome style-clash (earth dirt road + woodland critter inside a pastel spaceship) | Med | Open (needs art) |
| Wrap Shop dead-space + isolated floating ship button → confusing, "needs an adult" | Med | Open — **code layout** (P1) |
| Garden reward monotony (mostly one daisy); locked-badge meaning soft; minor reading slips ("Thank you!", tagline) | Low | Open (P2) |

**Confirmed strong:** start screen, town map, all 5 friend-house interiors (workshop / flower loft / observatory / lilypad pond / cloud porch), level-done juice, parent dashboard (COPPA-clean: "all data stays on this device"), raster HUD icons at real size.

---

## ✅ FIXED THIS PASS (committed `142d481`, pushed)
1. Drive unlock parity (QA Major) — verified.
2. Empty color-match badges (QC High) — saturated chip.

## 🗺️ REMAINING TO LIFT THE GATE
**P1 — biggest fun lever (needs Higgsfield credit top-up):** give each of the 5 Drive biomes a genuinely distinct backdrop + roadside set (woodland / meadow / riverside / twilight / sky) instead of one tinted forest. Same top-up rasters the 3 missing icons and re-arts the off-canon space bg into a cozy "Star Deck."
**P1 — code, no art:** rebuild the Wrap Shop into a tight center-stage flow (obvious ship button, clearer step links).
**P2:** garden grid overflow past 32; build the real Garden plant/water/grow mechanic (Phase 2); drag per-pointerId scoping.

**The one decision above the team:** the highest-leverage remaining item (distinct biome art) + the 3 icons + space bg all require a **Higgsfield credit top-up (~8–10 credits)** — the founder call flagged in the last gate, now reinforced by this depth pass. With it, the Drive stops repeating and the build clears to ~8–9.

---
*QC/QA Depth · Max · HDRV Studio · 2026-07-07. Technical: hardened 8/10. Quality: HOLD on the Drive-repetition + wrap-layout gaps. 2 of the top blockers fixed same-pass.*
