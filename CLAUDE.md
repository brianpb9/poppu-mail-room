# Poppu's Mail Room — Build Brief for Claude Code
## Target: 10/10 Toca Boca / Sago Mini Quality

### Game Concept
**"Sort. Deliver. Smile!"** — A drag-and-drop sorting game for toddlers (ages 2-5).
Packages appear on a conveyor belt. Kids drag each package to the matching mailbox.
Color match → Shape match → Character match. No fail state — wrong match returns to conveyor.

### Core Mechanic: Drag & Match
Conveyor belt scrolls right → 3 packages visible at a time → drag package → drop on matching mailbox.

### Matching Levels
1. **Color Match** (Level 1): Red package → red mailbox, blue → blue, etc. 6 colors.
2. **Shape Match** (Level 2): Star package → star mailbox, heart → heart, etc.
3. **Character Match** (Level 3): Gear icon → Peeky's mailbox, Moon → Orby's, etc.

### Visual Design
- **Scene:** Cozy mail room interior. Warm wood walls, round window, hanging lamp, Poppu's desk. Conveyor belt center-screen. 6 mailboxes arranged on the right side.
- **Characters:** Poppu (cream fox, postal hat, green backpack) standing at desk waving. Each mailbox has a character icon and color.
- **Conveyor:** Brown belt with roller texture, rotating wheels at ends. Smooth scroll animation.
- **Packages:** 6 types — colored boxes with star, gear, moon, heart, drop, cloud icons. Cute ribbons.
- **Style:** 2D kawaii children's book illustration, soft pastels, thick outlines, flat cel-shaded.

### 6 Mailboxes (Right side, 2 columns x 3 rows)
| Character | Color | Icon | 
|-----------|-------|------|
| Poppu | Cream | Gold Star ⭐ |
| Peeky | Yellow | Gear ⚙️ |
| Orby | Purple | Moon 🌙 |
| Zaza | Pink | Heart ❤️ |
| Wavey | Blue | Drop 💧 |
| Puffy | Pink | Cloud ☁️ |

### Interaction Flow
1. Package appears on conveyor (from left, slides in)
2. Toddler touches package → package lifts slightly (scale 1.1, shadow)
3. Drags toward mailbox → highlight glow on target mailbox if match
4. Drop on correct mailbox → PLOP sound + sparkle burst + character pops up above mailbox with "thank you!" animation + sticker earned
5. Drop on wrong mailbox → gentle boop + package bounces back to conveyor
6. Conveyor advances → new package appears

### Audio (Web Audio API synthesis — zero files)
- Conveyor hum: low filtered triangle wave, continuous
- Package pickup: soft "pop" — sine blip 80ms
- Drag: subtle "slide" — filtered noise
- Correct drop: satisfying "plop" + C-E-G chime arpeggio
- Wrong drop: gentle "boop" — triangle wave descend
- Character greeting: character-specific sparkle jingle
- Daily goal complete: ascending major chord, bell timbre
- Background music: gentle kalimba loop, 110 BPM, C major pentatonic

### Technical Requirements
- Single index.html, zero dependencies
- Canvas 2D rendering (NO DOM game elements)
- Touch + mouse drag support
- Web Audio API for all sound
- 1920x1080 logical stage, letterboxed
- All game objects as Image objects from assets/ folder
- localStorage: daily goal, stickers, streak

### Retention Features
- Daily delivery goal: "Deliver X packages today!" (escalating 5→10→15→20)
- Sticker book: 1 sticker per 5 packages delivered
- Golden package: 10% chance → rare golden package = 3x stickers + confetti
- Character greetings: each character has unique pop-up animation
- Delivery streak: 7 days = golden postal hat for Poppu

### Start Screen
- Beautiful mail room background
- Title: "Poppu's Mail Room" in kawaii bubble font
- Poppu in postal uniform waving
- Big "Play" button (pulsing gently)
- Sticker book icon (top right)

### Art Style (CRITICAL — 10/10 quality driver)
- 2D kawaii children's book illustration
- Soft pastels: cream, mint, lavender, peach, sky blue, warm yellow
- Thick outlines, rounded shapes, flat cel-shaded with soft gradients
- ALL visual objects via real illustrated assets (NO procedural drawing)
- Reference: Toca Boca warmth + Sago Mini palette
- Poppu reference sheet: /Users/isjen/HDRV/01_HDRV-AI-Gaming-Studio-OS/assets/reference-sheets/poppu/poppu-official-reference-sheet.png

### Assets (See ART_PIPELINE_BRIEF.md for full list)
- 1 scene background (1920x1080, illustrated)
- 3 Poppu poses (postal, waving, celebrating)
- 6 packages (128x128, transparent)
- 6 mailboxes (256x256, transparent)
- 1 conveyor belt (256x128, transparent)
- 6 character pop-up faces (128x128, transparent)
- UI elements: play button, sticker frame, scene buttons

### CRITICAL RULES
- NO canvas procedural art for game objects
- Every package, mailbox, conveyor, Poppu MUST be ctx.drawImage()
- Only particles (sparkles, confetti) can be procedural
- Zero fail state — wrong match = return to conveyor, no penalty
- 60fps, requestAnimationFrame, object pooling
- Handle both touch and mouse drag events
- AudioContext resume on first user interaction