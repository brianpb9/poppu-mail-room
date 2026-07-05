# UPGRADE BRIEF — Poppu's Mail Room v1.0 → v2.0 (10/10)
## Current: 750 lines, color-only, no audio, 1 scene | Target: Full spec, 10/10

Read index.html completely first. Surgical upgrades only.

---

## UPGRADE 1: Full Audio System (Web Audio API — zero files)
Current: no sound at all.

### 1a. Conveyor Hum
Continuous low hum while game is playing:
- Filtered triangle wave, 80Hz, LFO modulation at 0.5Hz
- Volume: -28dB (subtle, not annoying)
- Pause when game paused

### 1b. SFX
| Event | Sound |
|-------|-------|
| Package pickup | Soft "pop" — sine blip 80ms, 1200Hz |
| Drag | Subtle "slide" — filtered white noise sweep, -30dB |
| Correct drop | Satisfying "plop" + C-E-G arpeggio chime (200ms) |
| Wrong drop | Gentle "boop" — triangle wave, descend 400→300Hz, 150ms |
| Char greeting | Character-specific sparkle jingle (high sine arpeggio) |
| Golden package | Ascending major chord, bell timbre, 500ms |
| Daily goal done | Celebration chord + confetti sound |

### 1c. Background Music
- Day theme: Gentle kalimba loop, 110 BPM, C major pentatonic
- Synthesized, NOT a file
- Cross-fade on scene change

---

## UPGRADE 2: 3 Matching Levels + Progression
Current: only color matching, all 6 mailboxes at once.

### Level 1: Color Match (Easy)
- 3 mailboxes active — cream, yellow, purple
- 3 packages to match
- Big color swatches on mailboxes

### Level 2: Shape Match (Medium)
- Shape icons on packages + mailboxes
- Star → star mailbox, Gear → gear mailbox, Moon → moon mailbox
- Unlocks after 10 correct deliveries in Level 1

### Level 3: Character Match (Hard)
- Package addressed to CHARACTER (animal face icon)
- Match to correct character's mailbox
- Unlocks after 10 correct deliveries in Level 2
- 6 character pop-up faces appear above mailboxes

### Level Select UI
- 3 buttons at top during start: "Colors", "Shapes", "Characters"
- Locked levels show padlock icon
- Current active level highlighted

---

## UPGRADE 3: 3 Scenes
Current: only Mail Room.

### Scene 1: Poppu's Mail Room (Default)
Already exists. Warm wood interior, round window, lamp. Poppu at desk.

### Scene 2: Forest Mail Route
- Forest background: trees, mushrooms, stream, dappled light
- Wooden conveyor belt
- Mailboxes built into tree trunks
- Peeky appears frequently (forest = his zone)
- Birds, butterflies ambient

### Scene 3: Space Mail Station
- Space station background: stars, planets, nebula
- Futuristic hologram conveyor
- Holographic mailboxes
- Orby appears frequently (space = his zone)
- Stars twinkling, comet trails

### Scene Selector
- 3 thumbnail buttons at bottom during start
- Locked scenes show lock icon
- Unlock: Scene 2 after 20 deliveries, Scene 3 after 50

---

## UPGRADE 4: 6 Character Pop-Up Animations
When package is delivered to a mailbox:
- Character FACE pops up above mailbox (scale 0→1, bounce)
- Character-specific animation:
  - Poppu: waves + sparkles
  - Peeky: goggles flip down + gear spin
  - Orby: helmet visor flash + star trail
  - Zaza: magic sparkle + rainbow trail
  - Wavey: water splash + bubble
  - Puffy: fluff bounce + little cloud puff
- "Thank you!" or character catchphrase floats up
- Character slides back down after 1.5s

Use existing character PNGs from ACE project (orby-prod, peeky-prod, etc) or generate small face sprites.

---

## UPGRADE 5: Conveyor Belt Polish
Current: packages just appear.

### 5a. Scrolling Animation
- Conveyor belt texture scrolls left-to-right continuously
- Packages slide in from left edge
- Packages slide off right edge if not picked up (gentle reminder)

### 5b. Package Queue
- Show 2 "upcoming" packages peeking from left edge (faded, smaller)
- Current active package in center (bright, pulsing gently)
- Delivered packages get "sent off" to right with poof

---

## UPGRADE 6: Daily Goal + Streak + Retention
- Daily goal: "Deliver X packages today!" (escalates: 5→10→15→20→25)
- Progress bar below goal text
- Goal complete → celebration + sticker bonus
- Streak: 7 days = golden postal hat skin for Poppu
- Sticker book: 1 sticker per 5 packages, up to 40 slots

---

## VERIFICATION
- [ ] Audio: all SFX + music working
- [ ] 3 matching levels with progression
- [ ] 3 scenes with scene selector
- [ ] 6 character pop-up animations
- [ ] Conveyor scrolling animation
- [ ] Daily goal + streak
- [ ] Console clean (0 errors)
- [ ] All 19 existing assets still load
- [ ] 60fps, smooth drag

## CRITICAL
- Modify existing index.html — do NOT rewrite
- Keep all existing mechanics working
- Zero new dependencies
- Poppu reference sheet consistency