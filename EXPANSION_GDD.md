# 🌍 EXPANSION GDD — "Poppu's Post Town"
**From one mail-sorting minigame → a cozy world that keeps opening up.**
Inspired by Rogue Duck Interactive's breadth engine · translated for preschool 2–5 · Poppu World canon.
Convened by Max · 2026-07-05 · Sources: rnd-director (Rogue Duck teardown), gameplay-director (design), ip-director (canon).

---

## THE VISION (one line)
*Poppu carries the mail from door to door across a village that grows one house at a time — every delivery a tiny adventure of packing, driving, helping, and celebrating with friends.*

Mail-sorting (the current game) becomes **"Act 1: prep the packages"** — one building inside a living town, not the whole game.

---

## WHY THIS IS THE RIGHT "LUAS" (evidence)
Rogue Duck games "never run out" via 6 patterns: (1) multi-step tactile chains, (2) **staged physical-map expansion** ← the core, (3) interlocking side-toys, (4) drip-fed upgrades/cosmetics, (5) prestige/mode continuation, (6) the meta-formula "make a mundane cozy job grow." Their **Carefully Stamped** is a postal sim — Poppu is on a proven genre.

**Preschool translation** (no numbers, no reading, no fail): growth you *see and touch* — a new house pops up, a flower blooms between visits, a friend waves from a new window. Structure blends **Sago Mini World** (big-icon single-finger hub, ages 2–3 self-navigate), **Toca Life World** (hub-and-spoke + portable avatar = Poppu), **Pok Pok** (tactile, goal-free toys at each stop).

Both R&D and gameplay-director independently converged on the growing village map as move #1.

---

## THE SPINE — TOWN MAP HUB (zero reading)
- New top-level state `TOWN`. START's **Play button → the town map** (not straight into sorting).
- One illustrated cozy town; **buildings are big distinct silhouettes** (Post Office, Wrap Shop, friends' houses, Garden, Party Tent). **Tap a building → zoom into that activity.** That's the whole navigation.
- Poppu is the **portable avatar** the child moves through the world; one friend always wanders the map (tap = free `greet()` giggle).
- Locked buildings = soft scaffold + heart-padlock; tap shows a picture-meter (filling stars), plays `locked()`, Poppu points. Never a dead-end, never a scary "NO."
- **"new!" sparkle badge** bounces on any freshly-unlocked building — the single most important retention pixel. Every returning child instantly sees "something is new."
- ⚠️ Build rule: the map must NOT feel like a settings menu. Poppu physically walks/zooms into each activity, or the "one world" illusion dies.

**Connective tissue — the Delivery Journey:** free-choice sandbox, but a full run chains **SORT → WRAP → DRIVE → GREET** and pays the biggest reward + advances a friendship. Playing the core loop *is* how the world grows.

---

## THE 6 VERBS (each a genuinely different finger-action)

| Activity | State | Child does | Reuses |
|---|---|---|---|
| 📮 **Sort** (exists) | PLAYING | Sort mail at the Post Office | — |
| 🚚 **Delivery Drive** | DRIVE | Finger steers Poppu's mail truck along a winding scrolling road to a friend's house; drag through stars/hearts; friend runs out + hugs | `toStage` drag, `bg-forest`, `greet()`, `burst`, `charDeliveries++` |
| 🎁 **Wrap Shop** | WRAP | Tap box color → drag ribbon → tap-stamp sticker → package plops out | swipe-seal + tap-stamp mechanics, `ph_package` tinting |
| 🐾 **Friend's House** | FRIEND | Feed (drag matching item) / pet (tap) / dress (drag hat) a friend; friendship heart fills | `full_*` art, `greet()`, `drawPoppuHat`, hearts |
| 🌱 **Town Garden** | GARDEN | Tap plot → seed; drag watering can (or tilt) → sprinkle; **grows between sessions** | `ambient`, `devicemotion`, SAVE timestamps |
| 🏡 **Decorate Town** | (on TOWN) | Drag decorations onto the map; persistent, rearrange freely — it's *their* town | existing decor cosmetics, `SAVE.owned` |
| 🎉 **Seasonal Event** | (reuse) | Party Tent appears on birthdays/holidays: wrap gift → drive → all friends party | `confetti()`, `celebrate()`, date/`streak` |

Every activity is **lose-proof**: truck can't crash, any wrap is cute, any feeding is accepted, plants only grow, decor can't be misplaced. Icons/color/animation/sound only — no text.

---

## CANON FRAME — "Poppu's Post Town" (ip-director, on-brand 8→10)
Post House (current Mail Room) = home base the world opens out from. Each friend = a **home + a themed activity**:

| Friend | Place | Helps with |
|---|---|---|
| Poppu (star) | The Post House (hub) | sorting + delivering |
| Peeky (gear) | **Toy Shed** (wooden-toy tinkerer, NOT engineer) | fix wobbly mailbox, build birdhouse, wind music box |
| Orby (moon) | **Moonlit Hilltop / Star Deck** (cozy starscape, NOT sci-fi space) | hang lanterns, catch fireflies, goodnight mail |
| Zaza (heart) | Flower Cottage | water & arrange flowers, wrap heart-cards |
| Wavey (drop) | Riverside Dock | float parcels downstream, fill watering cans |
| Puffy (cloud) | Cloud Porch | hang laundry, shape clouds, tuck friends in |

New places: Town Square, Flower Meadow, Riverside Dock, Moonlit Hilltop, Snack Cottage.
**HARD NO (Poppu World):** no villain/monster, no danger/urgency/timers-that-punish, no competition/loss, no fail-shaming, no tech/neon/robots (that's Drava Nova).
**Canon flags to hold:** (1) Peeky stays a wooden-toy tinkerer, soften the gear icon toward a spool/wooden-cog; (2) reframe Space scene → cozy "Star Deck"; (3) deliveries stay pressure-free (a missed drop just comes back smiling).
**Cast decision (Max):** keep the 6 friends already built & loved (Poppu, Peeky, Orby, Zaza, Wavey, Puffy) — canonize Wavey & Puffy as Post Town locals; Lumi (light-spirit hint-guide) can join later as the no-reading hint helper. Do not discard existing art.

---

## THE GROWTH LADDER — first 10 unlocks (every session reveals ONE new thing)
Gated by systems that already exist: `maxLevel`, `SAVE.stamps`, and especially `charDeliveries` (friendship).

1. **Post Office** (start) — sort, earn first stars
2. **Wrap Shop** — after Post Office Lv1 → verb: *make*
3. **Delivery Drive + Mail Truck** — after first wrap → verb: *drive* (front-load the "whoa bigger world")
4. **Peeky's House** — `charDeliveries.gear ≥ 5` → verb: *nurture*
5. **Town Garden (first plot)** — after first friend visit → verb: *plant*
6. **Orby's House** — `charDeliveries.moon ≥ 8` + a new road
7. **Decorate Town** — ~Lv4 / stamp threshold → verb: *place*
8. **Forest Region** — map extends into `bg-forest` at `maxLevel ≥ 5`
9. **Zaza's + Wavey's Houses** — friendship-gated; more garden plots
10. **Puffy's House + Seasonal Party Tent** — full town; event layer switches on

Each unlock drops a "new!" badge. Friendship unlocks (4,6,9,10) recycle the sorting/driving the child already does → **the core loop is literally how the world grows** — no grind wall, no second currency.

---

## PHASED BUILD PLAN (fun-per-effort: Drive > Friend > Wrap > Garden > Decorate > Seasonal)

- **Phase 0 — "Prove the wider world" (smallest shippable slice):** TOWN MAP hub + move sorter into the Post Office building + **Delivery Drive** + one friend delivery. *Lowest effort (drive reuses drag/bg/greet), highest payoff (instantly reframes the game as a growing town).* This alone answers "bukan hanya anterin mail, ada kelanjutannya."
- **Phase 1 — "Make & befriend" (the heart):** Wrap Shop + Friend's House → the full SORT→WRAP→DRIVE→GREET chain.
- **Phase 2 — "Your town grows" (retention):** Garden + Decorate Town + full 10-step unlock ladder + "new!" badges.
- **Phase 3 — "Always something new" (LiveOps):** Seasonal Party Tent, sticker-album expansion, remaining houses, forest region.

Plus the still-pending polish from REVIEW_BOARD_v4: P1 (stamp station → real match, cosmetic art regen), P2 (Bahasa Indonesia localization + store icon/assets), P4 (monetization native wrapper) — fold in as we go.

---

## ENGINE FOOTPRINT (additive — no rewrite, no new deps)
New `state` values (`TOWN, DRIVE, WRAP, FRIEND, GARDEN`); new `SAVE` fields (`townDecor[]`, `garden[]`, `friendship{}`, `unlocks{}`) via the existing `defaultSave()` merge; reuse `toStage`, `burst/confetti/popups/floatTexts`, `ambient`, and the whole `Audio_` synth. Single-file canvas app throughout.

## NEW ART NEEDED (game-asset pipeline, Higgsfield + Poppu ref sheet)
Town map background (cozy village, growing regions), mail truck, 6 friend-house building sprites, winding road tiles, garden plot/seed/sprout/bloom stages, watering can, wrap-shop props (boxes/ribbons/stamps), decoration items, "new!" badge. Style-matched to the existing illustrated core art (curator gate before integration).

---

## BUSINESS NOTE (Max)
Do **not** size the market off Rogue Duck (PC/Steam, not preschool-mobile). Use **Sago Mini World / Toca Boca World** as the comp set — pull Sensor Tower/AppMagic download + revenue estimates (IN/SEA + global) before committing production budget beyond Phase 0.

---
*Expansion GDD v1 · Max · HDRV Studio · 2026-07-05. Direction validated by independent R&D + gameplay design convergence. Awaiting founder greenlight on Phase 0 build.*
