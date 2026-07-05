# UPGRADE 10/10 — Poppu's Mail Room v3.0 → v4.0
## Current: 8.4/10 | Target: 10/10 | Gap: +1.6

Read index.html fully first. Surgical upgrades. Keep all existing mechanics.

---

## FIX 1: WebP Backgrounds (CRITICAL — 85% smaller load)
```bash
cwebp -q 90 assets/bg-mailroom.jpg -o assets/bg-mailroom.webp
cwebp -q 90 assets/bg-forest.jpg -o assets/bg-forest.webp
cwebp -q 90 assets/bg-space.jpg -o assets/bg-space.webp
```
Update asset manifest to try WebP first, fallback to JPG.

---

## FIX 2: Volume Control
- Add small speaker icon (top-left during gameplay)
- Tap → toggle: Normal → Quiet → Mute
- Icon reflects state: 🔊 → 🔉 → 🔇
- Persist to localStorage

---

## FIX 3: First-Play Tutorial Overlay
On first session (localStorage flag):
- Semi-transparent overlay
- Animated hand pointer showing drag gesture: "Drag the package to the matching mailbox!"
- 1 forced guided delivery → overlay fades → never show again
- Simple, non-intrusive, toddler-friendly

---

## FIX 4: Poppu Idle Animation
- Add subtle breathing (scale 1.0→1.02 sine, 2s cycle)
- Add blinking (every 3-4s, close eyes 150ms)
- Apply to Poppu postal pose and waving pose
- Makes character feel ALIVE — critical for 10/10 feel

---

## FIX 5: Loading Progress Bar
- Track loading progress of all Image objects
- Show: "Poppu is sorting the mail… X/28"
- Progress bar with envelope moving along
- Minimum 1.5s display for premium feel
- Background: mail room gradient

---

## FIX 6: Parent Dashboard
Long-press (3s) on Poppu character → overlay:
- "For Parents 👆"
- Total play sessions
- Packages delivered
- Star Stamps earned
- Current level
- Favorite character
- Volume control shortcut
- Privacy note: "All data stays on this device. No information is collected or shared."
- Tap outside or X to close

---

## FIX 7: Character Full-Body Greetings (10/10 Polish)
When package delivered to character's mailbox:
- Show FULL-BODY character (not just face) above mailbox
- Use existing character PNGs from ACE project (/Users/isjen/HDRV/03_HDRV-Software-Studio/Projects/poppu-world/)
  - Poppu → poppu-prod.png (already in project)
  - Peeky → copy from ACE: peeky-prod.png → assets/peeky-full.png
  - Orby → copy from ACE: orby-prod.png → assets/orby-full.png
  - Zaza → copy from ACE: zaza-prod.png → assets/zaza-full.png
  - Wavey → copy from ACE: wavey-prod.png → assets/wavey-full.png
  - Puffy → copy from ACE: puffy-prod.png → assets/puffy-full.png
- Bounce animation (scale 0→1.1→1.0)
- "Thank you!" text above character
- Slide back down after 1.5s

---

## VERIFICATION
- [ ] WebP backgrounds load (check Network tab)
- [ ] Volume control toggles work + persist
- [ ] Tutorial overlay shows on first play only
- [ ] Poppu breathing/blinking visible
- [ ] Loading progress bar shows X/28
- [ ] Parent dashboard opens on 3s long-press
- [ ] 6 full-body character greetings with bounce
- [ ] Console: 0 errors
- [ ] All existing mechanics intact
- [ ] All 28 existing assets still load

## CRITICAL
- Modify existing index.html — do NOT rewrite
- Keep all 4 mechanics + 10 levels + shops + economy
- Zero new dependencies
- Characters from ACE project must be copied over