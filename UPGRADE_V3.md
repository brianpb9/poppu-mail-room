# UPGRADE v3.0 — Poppu's Mail Room: Full Depth (Rogue Duck Standard)
## Current: 750 lines, color-only, drag only, 1 scene, no audio | Target: Multiple mechanics, upgrades, progression, economy, minigames

Read index.html completely first. Build ALL. Target 10/10 Toca Boca + Rogue Duck depth.

---

## UPGRADE 1: Multiple Interaction Mechanics (not just drag)
Current: only drag package to mailbox.
Add 3 mechanics that alternate:

### 1a. Swipe to Seal (every 3rd package)
- Envelope appears on desk (not conveyor)
- Swipe across envelope to "seal" it (left→right swipe gesture)
- Satisfying seal animation + sparkle
- Then drag to mailbox

### 1b. Tap to Stamp (every 5th package)
- Package needs a "stamp" before delivery
- 3 stamp options appear (star, heart, moon)
- Tap correct stamp → stamp animation on package → ready to deliver
- Wrong stamp = gentle boop, try again

### 1c. Shake to Sort (every 8th package)
- 3 packages appear jumbled together
- Shake device (or rapid tap 3x) → packages "sort" into their colors
- Then drag each to matching mailbox

---

## UPGRADE 2: Upgrade System (earn Star Stamps)
Delivering packages earns Star Stamps (⭐). Spend on upgrades:

| Upgrade | Cost | Effect |
|---------|------|--------|
| Speed Belt | 10 ⭐ | Conveyor 20% faster |
| Auto-Sorter | 25 ⭐ | Wrong package auto-returns (no manual return) |
| Big Mailboxes | 15 ⭐ | Mailboxes 25% larger (easier to drop) |
| Golden Scanner | 40 ⭐ | Highlights correct mailbox in gold glow |
| Double Stamps | 50 ⭐ | Earn 2x Star Stamps per delivery |

Upgrade shop accessible from start screen — cute shopkeeper Poppu shows available upgrades.

---

## UPGRADE 3: Progression System (Levels 1-10)
Not just endless play — 10 levels with increasing complexity:

| Level | Packages | Speed | Mechanics | New Feature |
|-------|----------|-------|-----------|-------------|
| 1 | 5 | Slow | Drag only | Tutorial |
| 2 | 8 | Slow | Drag + Swipe seal | Swipe intro |
| 3 | 10 | Medium | Drag + Tap stamp | Tap intro |
| 4 | 10 | Medium | Drag + Swipe + Tap | All 3 mechanics |
| 5 | 12 | Medium | + 2 packages at once | Multi-package |
| 6 | 12 | Fast | + Shake sort | Shake intro |
| 7 | 15 | Fast | All mechanics | Speed challenge |
| 8 | 15 | Fast | + Wrong mailbox shuffle | Memory test |
| 9 | 18 | Fast | All + distractions | Butterflies, confetti |
| 10 | 20 | Turbo | Boss level | Golden packages only |

Level complete screen: star rating (1-3 stars), stamps earned, "Next Level" button.

---

## UPGRADE 4: Economy + Shop
- Earn ⭐ Star Stamps per delivery
- Correct delivery: 3-5 ⭐ (based on speed)
- Golden package: 15 ⭐
- Level complete bonus: 10-30 ⭐

### Shop Items (Star Stamps)
| Category | Items |
|----------|-------|
| **Mailbox Skins** | Pastel, Rainbow, Galaxy, Gold (50-200 ⭐) |
| **Poppu Hats** | Cowboy, Crown, Pirate, Chef (100-500 ⭐) |
| **Conveyor Skins** | Wood, Neon, Candy, Cloud (75-300 ⭐) |
| **Stickers** | Rare character stickers (25 ⭐ each) |
| **Decorations** | Plants, posters, rugs for mail room (50 ⭐) |

---

## UPGRADE 5: Full Audio + Polish
### Audio
- Conveyor hum (continuous, subtle)
- SFX: pickup pop, slide, correct drop plop+chime, wrong boop, stamp thunk, seal swish, sort rattle
- Character greetings: unique jingle per character
- Background music: kalimba loop (day), music box (night mode)
- Level complete: celebration fanfare

### Polish
- Package wiggle animation when waiting
- Mailbox highlight glow on approach
- Character pop-up + thank you text
- Confetti on level complete
- Golden package sparkle trail
- Screen shake on big deliveries
- Loading screen progress

---

## UPGRADE 6: 3 Scenes (same mechanics, different themes)
- Scene 1: Mail Room (default, free)
- Scene 2: Forest Route (unlock at Level 3, $1.99)
- Scene 3: Space Station (unlock at Level 6, $1.99)
- Each scene has unique conveyor, mailbox skins, background music, ambient particles

---

## TECHNICAL
- Single index.html, zero dependencies
- Canvas 2D, Web Audio API, localStorage
- All game objects via Image() + ctx.drawImage()
- Keep all 19 existing assets + generate 2 new backgrounds
- Touch + mouse support for all mechanics
- 60fps, requestAnimationFrame

## VERIFY
- [ ] All 4 interaction mechanics (drag, swipe, tap, shake)
- [ ] Upgrade shop with 5+ upgrades
- [ ] 10 levels with progression
- [ ] Star Stamps economy + shop
- [ ] Full audio (SFX + music + ambience)
- [ ] 3 scenes with unique themes
- [ ] Console 0 errors
- [ ] All existing assets still load