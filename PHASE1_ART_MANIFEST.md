# PHASE 1 ART MANIFEST — "Poppu's Post Town"
Locked by art-director · HDRV Studio · Poppu World IP · Under-5 audience
Feeds: game-asset-operator (generation) → game-asset-curator (gate) → gameplay-engineer (wiring)
Do not generate from this document without operator dispatch. index.html is NOT edited here.

---

## 0. STYLE LOCK — THE ONE ART DIRECTION FOR THE WHOLE GAME

**Benchmark:** Toca Boca (chunky warm object design, believable "toy" materiality) × Sago Mini (soft pastel worldbuilding, zero-menace) — matched AGAINST the game's own shipped hero art (`bg-mailroom.webp`, `bg-forest.webp`, `peeky-full.png`, `orby-full.png`, `wavey-full.png`, `puffy-full.png`), because that art already clears the bar. Every new Phase 1 asset must look like it was painted by the SAME illustrator in the SAME sitting as those files — not a generic "kawaii sticker" from a different pass.

**Rendering method (from the shipped reference set):**
- Flat cel-shaded color blocks + ONE soft airbrushed highlight bloom (upper-left) + ONE soft ambient-occlusion shadow (lower-right). No hard cel banding, no painterly canvas noise, no photoreal texture except the established wood-grain/dirt-tile treatment already in `bg-mailroom.webp` / `road-path-texture-tile.png`.
- Outline: thick, consistent, warm dark-brown/near-black, rounded joins. Target **#3D2B1F**, weight ≈ 4–6% of the object's own width (matches `peeky-full.png`, `puffy-full.png` outline weight — do NOT use the thinner, more painterly line seen on `zaza-full.png`, which is a style outlier — see Finding F3 below).
- Eyes: big, round, dark, single white sparkle highlight. Cheeks: soft pink blush ellipse, no hard edge.
- Lighting mood: warm golden-hour interiors (lamp-glow, like `bg-mailroom.webp`) or soft pastel daylight exteriors (like `bg-forest.webp`). Never neon, never a hard rim-light, never sci-fi glow-strips.

**Locked palette (hex) — Poppu canon + established world pastels:**
| Use | Hex | Source |
|---|---|---|
| Poppu cream body | `#F6EAD6` | ref sheet |
| Mint tail-tip / brows | `#B7E0C9` / `#A9D8C0` | ref sheet |
| Backpack green | `#6F8F4E` | ref sheet |
| Gold / star-compass | `#FFC64D` (also `#FFD15C`, `#E3A93E` shade used in-code) | ref sheet + index.html |
| Pink cheeks | `#FFC6B6` | ref sheet |
| Outline brown | `#3D2B1F` | ref sheet + shipped art |
| Warm wood (mailroom) | `#C97A4E`, `#E7D3A6`, `#DCC084` | index.html constants |
| Peeky yellow (Toy Shed) | `#FFE066` / gold `#FFD15C` | peeky-full.png |
| Orby lavender/moon (Star Deck) | `#B79BEA`, deep plum `#2a1a4a` | orby-full.png / index.html galaxy skin |
| Wavey teal/blue (Riverside) | `#6FC2C6`, sky `#8ECFEC` | wavey-full.png |
| Zaza pink/heart (Flower Cottage) | `#FF9DB6`, `#F06A8E` | index.html heart palette |
| Puffy cream/cloud (Cloud Porch) | cream `#FFFDF6`, sky `#CDEBFA` | puffy-full.png |

**Character lock (Poppu — every hat/prop must respect this exact model):** cream fox, chibi proportions (big head, large eyes, small body, short limbs — per official ref sheet grid), mint ear-tips/brows/tail-tip, gold star-compass necklace, green explorer backpack, blue postal cap with envelope badge (as shipped in `poppu-postal.png`/`poppu-celebrate.png` — NOT the khaki explorer hat on the raw reference sheet; the shipped postal cap is the in-game canon and cosmetic hats must sit on that exact head silhouette). Reference: `/Users/isjen/HDRV/01_HDRV-AI-Gaming-Studio-OS/assets/reference-sheets/poppu/poppu-official-reference-sheet.png` for proportions/face only.

**Hard NO list (Poppu World canon, carried into every prompt):** no neon glow strips, no chrome/sci-fi paneling, no robots, no gears-as-machinery (soften to wooden cogs/spools — Peeky is a tinkerer, not an engineer), no fangs/scary faces, no weapons/skulls (pirate hat = playful, not menacing), no dark/desaturated palettes, no watermark/logo/text baked into art, no drop-shadow "sticker" box, no halo/matte box, no transparency-checkerboard baked into pixels.

---

## 1. EXPORT STANDARD (every asset, no exceptions)

- **Sprites/props/UI:** transparent ALPHA PNG. True alpha channel — verify by opening in an editor and confirming a real checkerboard (not a JPEG/flat-white/flat-black matte, and NOT a checkerboard pattern drawn into the pixels themselves).
- **Full-bleed backgrounds:** WebP (quality ~82–85), fully opaque, no alpha needed, 1920×1080.
- Crisp anti-aliased edges, no halo/fringe, no stray drop shadow baked in (the engine draws its own contact shadows — `groundShadow()` / `bakedContactShadow()` — so sprites should carry little to no baked ground shadow of their own).
- No watermark, no text/logo, no signature baked into any image.
- **PWA weight budget:** sprites/props target ≤150KB each after compression; full-bleed backgrounds target ≤300–350KB each (in line with the existing `bg-mailroom.webp` ≈ and `bg-forest.webp`). Flag anything heavier for re-compression before hand-off. Recommend game-tech-artist pack the 14 cosmetic sprites + 4 wrap-shop props into ONE shared atlas post-curation to cut HTTP requests (18 small textures is atlas territory).

### ⚠️ Findings — pre-existing export debt (verify before repeating the mistake)
- **F1 — `assets/zaza-full.png`** renders with a **checkerboard pattern baked directly into the pixels** (not a real alpha channel) — the exact violation this standard exists to prevent. It is live in-game as `full_heart` (Zaza's delivery pop-up). Flag to game-asset-curator as urgent regen debt outside this Phase 1 batch — do not model new assets on this file's export.
- **F2 — `assets/house-peeky.png`, `assets/mail-truck.png`, `assets/post-office.png`, `assets/wrap-shop.png`, `assets/new-badge.png`** all preview with a flat opaque white background in every check performed here — consistent with a baked white matte rather than a true alpha channel (contrast with `peeky-full.png`/`orby-full.png`/`wavey-full.png`/`puffy-full.png`, which composite correctly as cutouts). **Before this Phase 1 batch ships, game-asset-curator must confirm real alpha on all five** — if confirmed opaque, run background-removal and re-export (this directly blocks D below, which explicitly asks to "verify/upres" `house-peeky.png`).
- **F3 — `assets/zaza-full.png`** also uses a visibly thinner, more painterly outline/rendering pass than `peeky-full.png` / `orby-full.png` / `wavey-full.png` / `puffy-full.png` — a style outlier against the locked line-weight above. Not in this batch's scope to fix, but do not use zaza-full as a style reference for anything in Phase 1; use the other four.
- **F4 — `assets/bg-space.webp`** (current "Space" scene, unlock Lv6) is sci-fi chrome/neon-strip styled — exactly the look this canon forbids. `bg-house-orby.webp` (below) is the correct cozy "Star Deck" template; flag to game-director that `bg-space.webp` should eventually be retired/retheme'd to match it (future phase, not built now).

---

## 2. ASSET LIST — PRIORITY ORDER

### PRIORITY 1 — Cosmetic regen (creative-director BLOCKER, C3)
Today these are procedural `ctx.fill`/`ctx.arc` shapes drawn in code (chef hat = white blob via `ctx.arc`, crown = flat vector polygon, conveyor skins = alpha-blended stripe patterns, mailbox skins = a dashed stroke ring) — literally the clipart the creative-director rejected. All 14 below replace those procedural draws with real illustrated PNGs.

**A1 — Hats (worn ON Poppu's head).** Generate Poppu wearing the hat, full character, 3/4-front pose matching `poppu-postal.png`, for style approval — THEN crop to a hat-only cutout as the production sprite. Anchor: hat's own brim/base sits at ~60% down the canvas (this bottom-center point is where the engine's `drawPoppuHat(x,y,s,id)` origin sits on Poppu's head-top). 768×768 transparent PNG.

| File | Prompt |
|---|---|
| `cos-hat-chef.png` | "Poppu the cream kawaii fox (mint ear-tips, big round eyes, pink cheeks) wearing a soft plush white chef's toque with a wide puffy pleated top and a fabric fold band, thick warm dark-brown outline #3D2B1F, flat cel-shaded with one soft highlight bloom, 2D kawaii children's-book illustration style matching peeky-full.png / orby-full.png, isolated character on transparent background, no text, no watermark, no photorealism" — then crop to hat-only cutout. |
| `cos-hat-cowboy.png` | "Poppu the cream kawaii fox wearing a friendly tan-brown cowboy hat, rounded soft crown, gently curled wide brim, thin rope cord band with a small gold star charm, same thick brown outline + flat cel-shading as the chef hat, warm wood-tone palette (#B4763A / #7a4a20), isolated character on transparent background, no text" — crop to hat-only cutout. |
| `cos-hat-pirate.png` | "Poppu the cream kawaii fox wearing a playful navy-and-cream pirate tricorn hat with a soft gold star badge on the front (NOT a skull, NOT scary), rounded plush fabric points, thick brown outline, flat cel-shading, cheerful kids'-book pirate (Sago Mini tone, no weapons, no menace), isolated character on transparent background, no text" — crop to hat-only cutout. |
| `cos-hat-crown.png` | "Poppu the cream kawaii fox wearing a small soft golden princely crown with 3 rounded points and one pink gem (#FFC6B6), NOT spiky, jewel-toned gold #FFC64D with a warm highlight bloom, thick brown outline, flat cel-shading matching orby-full.png, isolated character on transparent background, no text" — crop to hat-only cutout. |

**A2 — Mailbox skins (full illustrated mailbox, shown ON a mailbox — same silhouette/proportions as the shipped `mailbox-star.png` base).** 512×512 transparent PNG, mailbox only, no background, minimal self-shadow (engine adds its own contact shadow).

| File | Prompt |
|---|---|
| `cos-mb-pastel.png` | "Cute kawaii rounded mailbox, same chunky rounded silhouette as a classic toy mailbox with a flag, painted in a soft pastel patchwork of cream/mint/lavender/peach panels, thick warm brown outline #3D2B1F, flat cel-shaded with soft highlight, 2D kawaii children's-book style matching the game's existing mailbox art, isolated on transparent background, no text, no watermark" |
| `cos-mb-rainbow.png` | "Cute kawaii rounded mailbox painted with soft pastel rainbow bands (pink #FF9DB6, gold #FFD15C, mint #98D7B4, sky blue #8ECFEC, lavender #B79BEA), thick brown outline, flat cel-shaded, cheerful not gaudy, same silhouette as the game's mailbox-star.png, isolated on transparent background, no text" |
| `cos-mb-galaxy.png` | "Cute kawaii rounded mailbox painted as a COZY starry-night scene — deep plum-to-lavender gradient (#2a1a4a to #8E6FD6) with soft twinkling gold stars and a friendly crescent moon, warm and dreamy NOT sci-fi/neon, thick brown outline, flat cel-shaded, same silhouette as the game's mailbox-star.png, isolated on transparent background, no text" |
| `cos-mb-gold.png` | "Cute kawaii rounded mailbox in a warm polished gold finish #FFC64D with a soft glossy highlight sweep and a small ribbon bow, thick brown outline, flat cel-shaded, premium-reward feel (500-stamp item), same silhouette as the game's mailbox-star.png, isolated on transparent background, no text" |

**A3 — Conveyor skins (seamless tileable overlay strip, matches the belt's long thin aspect).** 1024×256 transparent PNG, must tile seamlessly left-to-right (the engine scrolls it with a horizontal modulo). Rename the shop concept "Neon" → **"Candy-Glow"** (soft pastel glow, not literal neon).

| File | Prompt |
|---|---|
| `cos-cv-neon.png` (Candy-Glow) | "Seamless horizontally-tileable overlay pattern of soft glowing pastel diagonal light-ribbons in cotton-candy pink #FF9DB6 and sky blue #8ECFEC, gentle painterly glow (not harsh neon, no chrome), flat illustration matching the game's kawaii style, on transparent background, no text" |
| `cos-cv-candy.png` | "Seamless horizontally-tileable overlay pattern of cute kawaii candy-swirl stripes (pink, cream, mint) like soft peppermint ribbon, thin brown outline on each stripe, flat cel-shaded, on transparent background, no text" |
| `cos-cv-cloud.png` | "Seamless horizontally-tileable overlay pattern of small fluffy kawaii clouds drifting across a soft sky-blue-tinted belt, flat cel-shaded, thick brown outlines on each cloud, matching puffy-full.png's cloud style, on transparent background, no text" |

**A4 — Decor.** Transparent PNG, no background, minimal baked shadow.

| File | Size | Prompt |
|---|---|---|
| `cos-dec-plant.png` | 512×512 | "Cute kawaii potted plant in a warm terracotta pot #C97A4E, rounded mint-green leaves #5FB985, thick brown outline, flat cel-shaded, cozy mail-room decor matching bg-mailroom.webp's houseplant, isolated on transparent background, no text" |
| `cos-dec-poster.png` | 512×680 | "Cute kawaii framed poster, cream paper #FFFDF6 with a soft lavender #B79BEA frame, a simple gold star or heart illustration and 'POPPU' in a friendly rounded bubble font, flat cel-shaded, thick brown outline, isolated on transparent background" |
| `cos-dec-rug.png` | 1024×512 | "Cute kawaii round floor rug viewed from a soft 3/4 top-down angle, warm peach-to-terracotta gradient #FFCFA0 to #C97A4E with a cream scalloped border, flat cel-shaded, thick brown outline, isolated on transparent background, no text" |

---

### PRIORITY 2 — Wrap Shop
| File | Size / format | Prompt |
|---|---|---|
| `bg-wrapshop.webp` | 1920×1080, opaque | "Cozy kawaii gift-wrap corner interior, warm wood walls matching bg-mailroom.webp's palette, a wrapping table with rolls of ribbon in a wooden rack, small stacks of colorful sticker sheets, soft warm lamp light, round window with sunlight, 2D kawaii children's-book illustration, flat cel-shaded with soft gradients, thick brown outlines, no characters, no text, foreground table clear of clutter in the lower-center third for gameplay UI" |
| `wrap-ribbon-spool.png` | 384×384, transparent | "Cute kawaii wooden ribbon spool with a coil of satin ribbon (pastel pink or gold), a small loose dangling tail-end ready to sway, thick brown outline, flat cel-shaded, isolated on transparent background, no text" |
| `wrap-bow.png` | 384×384, transparent | "Cute kawaii satin ribbon bow, soft rounded loops with a small center knot, designed to sit as an overlay ON TOP of a finished wrapped box (flat bottom-center anchor point), thick brown outline, flat cel-shaded, isolated on transparent background, no text" |
| `wrap-sticker-sheet.png` | 512×512, transparent | "Cute kawaii sheet of stickers — small star, heart, moon, cloud, drop and gear icons in soft pastel colors on a cream backing sheet with one gently peeling corner, thick brown outlines, flat cel-shaded, isolated on transparent background, no text" |

---

### PRIORITY 3 — Drive-seam fix (creative-director Phase-0 debt)
The current road is a flat, isotropic top-down dirt tile (`road-path-texture-tile.png`) laid under a side-view forest — no perspective cue, so the two spaces visually fight. Fix: bake AERIAL-PERSPECTIVE value/color grading directly into the tile itself (cooler/lighter/less-detailed toward the top = "farther", warmer/richer/more-detailed toward the bottom = "closer"), plus directional (vertical) dirt striations instead of isotropic scattered rocks, so the tile reads as "receding into the distance" from any scroll position.

| File | Size / format | Prompt |
|---|---|---|
| `road-path-perspective.png` | 512×512, opaque, seamless top-to-bottom tile (keep the existing 512px tile height so it drops in as a direct swap for the scroll-modulo code) | "Seamless top-to-bottom tileable dirt path texture, packed warm-tan dirt #DCC084 to #E7D3A6 with scattered pebbles and small grass tufts, painted with a built-in AERIAL PERSPECTIVE grade — the top ~20% of the tile subtly cooler, lighter and less detailed (reads as 'farther away'), the bottom ~20% warmer, richer-contrast and more detailed (reads as 'closer'), plus faint vertical dirt-track striations (not scattered/isotropic) that imply forward motion toward a horizon, 2D kawaii children's-book illustration painted style matching bg-forest.webp's linework and palette, no text, no watermark" |

**Biome tinting guidance (apply as a color-grade LAYER over this same tile per destination, not a separate asset unless game-tech-artist wants pre-baked variants):**
- Peeky (Toy Shed) → woodland green tint, warm moss/olive undertone
- Zaza (Flower Cottage) → flower-meadow pink tint, warm blush undertone
- Orby (Moonlit Hilltop) → twilight lavender-starscape tint, cooled + slightly darker value (dusk, not night-black)
- Wavey (Riverside Dock) → riverside blue tint, cool aqua undertone
- Puffy (Cloud Porch) → sky/cloud tint, light airy near-white-blue undertone

---

### PRIORITY 4 — Destination house sprites (transparent alpha; town-map / arrival building icons)
Match `house-peeky.png`'s exact architecture language — rounded storybook cottage, shingle/thatch roof, arched door with a heart-shaped cutout/window, warm cream walls, small mailbox out front — reskinned per friend's biome palette. Keep the SAME building type across all five (a cottage), only the palette/roof-material/props change — do not give each friend a different building typology.

| File | Size / format | Prompt |
|---|---|---|
| `house-peeky.png` (exists — **verify/re-export first**, see Finding F2) | 768×768, transparent | If F2 confirms an opaque white matte: re-run through background-removal and re-export at 768×768 (current file appears sub-optimal resolution for the town-map scale it's used at); do not regenerate the art itself, it is on-model. |
| `house-zaza.png` | 768×768, transparent | "Cute kawaii storybook cottage matching house-peeky.png's exact rounded-cottage architecture (shingle roof, arched heart-cutout door, small mailbox out front), Flower Cottage theme — pink/rose shingles #FF9DB6, cream walls, flower boxes under the windows, climbing rose vine, thick brown outline, flat cel-shaded, isolated on transparent background, no text" |
| `house-orby.png` | 768×768, transparent | "Cute kawaii storybook cottage matching house-peeky.png's exact rounded-cottage architecture, Moonlit Hilltop / Star Deck theme — COZY not sci-fi: soft lavender-purple shingles #B79BEA, small hanging lanterns, a tiny crescent-moon window, twinkling star details, warm not neon, thick brown outline, flat cel-shaded, isolated on transparent background, no text" |
| `house-wavey.png` | 768×768, transparent | "Cute kawaii storybook cottage matching house-peeky.png's exact rounded-cottage architecture, Riverside Dock theme — soft teal/blue shingles #6FC2C6, a small wooden dock plank out front, a water-drop shaped window, thick brown outline, flat cel-shaded, isolated on transparent background, no text" |
| `house-puffy.png` | 768×768, transparent | "Cute kawaii storybook cottage matching house-peeky.png's exact rounded-cottage architecture, Cloud Porch theme — soft cream/sky-blue shingles, a small cloud-shaped window, a little laundry-line with soft pastel fabric hung out front, thick brown outline, flat cel-shaded, isolated on transparent background, no text" |

---

### PRIORITY 5 — Friend House interiors (backgrounds)
1920×1080 opaque WebP, big-icon readable (this is a toddler UI — keep the lower-center third of frame relatively uncluttered for gameplay elements), matching `bg-mailroom.webp` / `bg-forest.webp` lighting and linework exactly.

| File | Prompt |
|---|---|
| `bg-house-peeky.webp` | "Cozy kawaii wooden Toy Shed interior — a wooden-toy TINKERER's workshop (NOT an engineer's workshop: no blueprints, no machinery, no gears-as-tech), workbench with hand-carved wooden toys, a half-built birdhouse, a wind-up music box, warm wood walls matching bg-mailroom.webp, soft window light, 2D kawaii children's-book illustration, flat cel-shaded, thick brown outlines, no characters, no text, lower-center third kept relatively clear" |
| `bg-house-zaza.webp` | "Cozy kawaii Flower Cottage interior — pastel pink walls, shelves of potted flowers, a small vase-arranging table, bunches of dried flowers hanging to dry, soft warm window light, 2D kawaii children's-book illustration matching bg-mailroom.webp's linework, flat cel-shaded, thick brown outlines, no characters, no text, lower-center third kept relatively clear" |
| `bg-house-orby.webp` | "Cozy kawaii Moonlit Hilltop / Star Deck exterior — a soft twilight-lavender hillside deck with warm hanging lanterns, a scattering of gentle fireflies, a cozy blanket and star-viewing telescope (toy-like, not scientific), COZY dusk NOT deep-space/sci-fi — no chrome, no neon, no spaceship paneling, 2D kawaii children's-book illustration, flat cel-shaded, thick brown outlines, no characters, no text, lower-center third kept relatively clear" |
| `bg-house-wavey.webp` | "Cozy kawaii Riverside Dock exterior — a small wooden dock over a gentle sky-blue river, lily pads, a stack of watering cans, soft daylight matching bg-forest.webp's palette, 2D kawaii children's-book illustration, flat cel-shaded, thick brown outlines, no characters, no text, lower-center third kept relatively clear" |
| `bg-house-puffy.webp` | "Cozy kawaii Cloud Porch exterior — a soft pastel sky-blue porch floating gently among fluffy clouds, a laundry line with pastel fabric, a cozy porch swing, warm daylight, 2D kawaii children's-book illustration, flat cel-shaded, thick brown outlines, no characters, no text, lower-center third kept relatively clear" |

---

## 3. ASSET MANIFEST FOR GAMEPLAY-ENGINEER

New `ASSET_SRC` keys to add (kebab filenames already match the code's existing naming convention — `assets/<kebab-name>.<ext>`):

```
cos_hat_chef      → assets/cos-hat-chef.png
cos_hat_cowboy    → assets/cos-hat-cowboy.png
cos_hat_pirate    → assets/cos-hat-pirate.png
cos_hat_crown     → assets/cos-hat-crown.png
cos_mb_pastel     → assets/cos-mb-pastel.png
cos_mb_rainbow    → assets/cos-mb-rainbow.png
cos_mb_galaxy     → assets/cos-mb-galaxy.png
cos_mb_gold       → assets/cos-mb-gold.png
cos_cv_neon       → assets/cos-cv-neon.png      (shop label: "Candy-Glow")
cos_cv_candy      → assets/cos-cv-candy.png
cos_cv_cloud      → assets/cos-cv-cloud.png
cos_dec_plant     → assets/cos-dec-plant.png
cos_dec_poster    → assets/cos-dec-poster.png
cos_dec_rug       → assets/cos-dec-rug.png
bg_wrapshop       → assets/bg-wrapshop.webp
wrap_ribbon_spool → assets/wrap-ribbon-spool.png
wrap_bow          → assets/wrap-bow.png
wrap_sticker_sheet→ assets/wrap-sticker-sheet.png
road_path_persp   → assets/road-path-perspective.png   (candidate replacement/addition to road_tex)
house_zaza        → assets/house-zaza.png
house_orby        → assets/house-orby.png
house_wavey       → assets/house-wavey.png
house_puffy       → assets/house-puffy.png
bg_house_peeky    → assets/bg-house-peeky.webp
bg_house_zaza     → assets/bg-house-zaza.webp
bg_house_orby     → assets/bg-house-orby.webp
bg_house_wavey    → assets/bg-house-wavey.webp
bg_house_puffy    → assets/bg-house-puffy.webp
```
(`house_peeky` key already exists at `assets/house-peeky.png` — re-export in place per Finding F2, no key change.)

Wiring notes for gameplay-engineer (not done here, index.html untouched):
- `drawPoppuHat()`, `mailboxSkinRing()`, `conveyorSkinOverlay()`, `drawDecor()` are today 100% procedural `ctx.fill/arc/stroke` — they need to become `sprite()`/`ctx.drawImage()` calls against the new keys above, with a `ph_*` procedural fallback kept for pre-load/error states (per the game's existing has()-gated pattern).
- Cosmetic shop card preview (`cosmeticCards()`, ~line 1103) and in-context Poppu preview (~line 1716–1721) should render the new art directly — this is what turns the shop from "clipart" into "premium."
- `TOWN_BUILDINGS` currently only defines `post`, `wrap`, `peeky` — extending to `zaza`/`orby`/`wavey`/`puffy` (Growth Ladder steps 6, 9, 10 in EXPANSION_GDD.md) will reuse the same `{id,key,cx,groundY,w,h,bobAmp,...}` pattern with the new `house_*` keys once those friendships are wired.

---

## 4. 10/10 REVIEW — CURRENT STATE VS. LOCKED TARGET

Scoring the CURRENT shipped state (pre-Phase-1) against this lock, per studio mandate:

1. **Character/IP consistency:** 6/10 — Poppu, Peeky, Orby, Wavey, Puffy are tight and on-model; Zaza is an outlier (F3) and cosmetics are currently generic procedural shapes, not Poppu-specific at all (a chef hat is literally the same white blob regardless of which character IP it's meant to belong to). **Fix:** A1 prompts above, generated ON Poppu specifically, cropped from an in-context render — guarantees the hat was designed for HER silhouette, not a generic clipart hat.
2. **Palette & style adherence:** 5/10 — mailroom/forest/four friends are dead-on; cosmetic shop conveyor skins currently render as literal `#35e0e0` neon-cyan diagonal stripes in code (`cv_neon`) — a direct canon violation (neon/tech = Drava Nova, not Poppu World) sitting live in a shipped Poppu World build today. **Fix:** A3 above, "Candy-Glow" rename + soft pastel glow prompt, zero hex values above `~80%` saturation.
3. **Animation liveliness:** 4/10 — none of these are illustrated at all today (arcs/rects), so there is nothing for game-animation-director to hook a tap-bounce or idle-sway to. **Fix:** every prompt above specifies a natural "spring point" (ribbon tail, bow flop, dangling spool thread, peeling sticker corner) game-animation-director can animate once assets land.
4. **Asset weight/performance:** 7/10 (nothing shipped yet to be heavy, but the two full-bleed `bg-space.webp`/`bg-forest.webp` precedents are appropriately sized) — risk is 28 new files without atlas planning. **Fix:** compression targets + atlas recommendation in Section 1.

**Total: 5.5/10 current. Verdict: NEEDS WORK** — this manifest is the fix, ready for game-asset-operator to execute in the priority order above. Re-score against this same rubric once assets are generated and curated; only APPROVE at a true 10 (assets rendered in-context, on Poppu, in the actual shop/town/drive screens — not just isolated thumbnails).

---

## 5. COSMETIC PNG AUDIT — do the 14 files already on disk WIRE as-is?

Checked all 14 against the Section 0 style lock and Section 1 export standard. **Verdict: 6 of 14 wire as-is; 8 need work before gameplay-engineer touches them.** Do not wire any file below marked REGENERATE or RE-EXPORT until game-asset-curator confirms the fix.

| File | Verdict | Why |
|---|---|---|
| `cos-mb-pastel.png` | **RE-EXPORT ALPHA ONLY — keep art** | Silhouette, single-highlight cel-shade, and thick outline all match lock well; consistent toy-mailbox shape across the 4 skins. But previews with a flat white field behind it (same signature as Finding F2's confirmed-opaque files), not the black true-alpha render the four hero references (`peeky/orby/wavey/puffy-full.png`) show. Run background-removal + re-export; do not regenerate the illustration. |
| `cos-mb-rainbow.png` | **RE-EXPORT ALPHA ONLY — keep art** | Same as above — on-model, same white-field alpha suspicion. |
| `cos-mb-galaxy.png` | **RE-EXPORT ALPHA ONLY — keep art** | Same as above. Interior is appropriately "cozy dusk," not scary — no fix needed to the art itself. |
| `cos-mb-gold.png` | **RE-EXPORT ALPHA ONLY — keep art** | Same as above. |
| `cos-hat-chef.png` | **REGENERATE** | Rendered as an isolated glossy product-shot with TWO+ highlight blooms and heavier gradient modeling — reads as generic "emoji sticker," not the flat cel-shade + ONE soft bloom the lock specifies (contrast against `peeky-full.png`'s single flat highlight). It was also never generated ON Poppu per the A1 spec, so its scale/angle/anchor point against Poppu's actual head silhouette is unverified — real risk of it floating or clipping when composited in `drawPoppuHat()`. Also shows a faint drop-shadow/halo edge — a direct Hard-NO ("no drop-shadow sticker box, no halo") violation. Same white-field alpha suspicion as the mailboxes. Regenerate with the exact A1 prompt (character-in-context, then crop), not a touch-up. |
| `cos-hat-cowboy.png` | **REGENERATE** | Same three faults as chef hat: over-glossy/2-highlight rendering, not built from a Poppu-fitted crop, suspect alpha. |
| `cos-hat-pirate.png` | **REGENERATE** | Same three faults. Also carries a visible dark rim/halo around the tricorn silhouette. |
| `cos-hat-crown.png` | **REGENERATE** | Same three faults. |
| `cos-cv-neon.png` ("Candy-Glow") | **REGENERATE** | Good news: the color story already fixed itself (soft pastel pink/blue glow ribbons on cream, no literal neon-cyan) — keep this palette direction. Bad news: it renders as a fully opaque cream-filled rectangle, not a transparent tileable overlay — as shipped it would completely block the belt texture underneath instead of layering over it, breaking `conveyorSkinOverlay()`'s alpha-blend design. Regenerate as a transparent-background seamless tile at 1024×256. |
| `cos-cv-candy.png` | **REGENERATE** | Same opaque-background functional break as neon. Also a style-cohesion miss within its own 3-file set: renders as a flat graphic mandala/pinwheel motif, a noticeably different rendering approach from `cos-cv-neon`'s soft painterly glow-ribbon — the three conveyor skins currently look like three different illustrators. Regenerate to match the painterly-ribbon treatment, transparent, tileable. |
| `cos-cv-cloud.png` | **REGENERATE** | Same opaque-background functional break (solid sky-blue fill instead of a transparent overlay). Cloud rendering itself is on-model (matches `puffy-full.png` cloud shapes) — keep that linework, just rebuild as a transparent tileable overlay. |
| `cos-dec-plant.png` | **RE-EXPORT ALPHA ONLY — keep art** | On-model cel-shade, single highlight, correct terracotta/mint palette — same white-field alpha suspicion as the mailboxes. Background-removal + re-export. |
| `cos-dec-poster.png` | **RE-EXPORT ALPHA ONLY — keep art** | On-model (lavender frame, cream paper, gold smiling-star illustration reads as a nice on-brand touch) — same white-field alpha suspicion. Background-removal + re-export. |
| `cos-dec-rug.png` | **WIRE AS-IS** | Previews with the black true-alpha signature (matches the confirmed-good `peeky/orby/wavey/puffy-full.png` behavior), on-model warm terracotta gradient + cream scalloped border, single highlight, no fix needed. |

**Net: WIRE AS-IS today** — `cos-dec-rug.png` only. **RE-EXPORT (alpha pass, no re-illustration)** — the 4 mailbox skins + `cos-dec-plant.png` + `cos-dec-poster.png` (6 files). **REGENERATE (art + format)** — the 4 hats + 3 conveyor skins (7 files). game-asset-curator: verify alpha on every "RE-EXPORT" file with a real editor (not a browser preview) before clearing; if any come back opaque-white-confirmed, they get the same background-removal treatment as Finding F2's five files — batch it together.

---

## 6. PHASE 1B — UI ICON PACK + REWARD FLOWERS + STORE FRAMES

Locked for game-asset-operator execution. Same style lock as Section 0 applies to every item below — nothing here introduces a new look.

### 6.1 UI Icon Pack (20 icons) — replaces the last procedural `drawIcon()` canvas shapes in normal play

**Format:** 256×256, transparent alpha PNG, designed to hold up as a clean bold silhouette at ~48px display size on a mobile button. Outline weight on the 256px canvas should run **~18–22px** (proportionally thicker than a character sprite's outline, because it has to survive a 5x scale-down and still read at thumb-size).

**Shared style preamble — prepend to every icon prompt below, verbatim:**
> "Cute kawaii flat icon illustration for a preschool mail-sorting game UI, one simple bold rounded-shape subject centered alone on the canvas, thick warm dark-brown outline #3D2B1F (~18–22px weight on a 256px canvas), flat cel-shaded fill using only the locked pastel palette, ONE soft airbrushed highlight bloom in the upper-left and no other gradient/texture, no photorealism, no painterly noise, no drop shadow, no halo ring, no background shape/circle/box behind the subject — icon reads as a clean isolated cutout, simple bold silhouette that stays readable at small size, 2D children's storybook icon style matching peeky-full.png / orby-full.png / puffy-full.png rendering, no watermark, isolated on transparent background."

| File | Subject line (append after the shared preamble) |
|---|---|
| `ic-home.png` | "a simple cute kawaii house shape — cream walls #F6EAD6, warm terracotta roof #C97A4E, one small round window, friendly simple silhouette, no text" |
| `ic-back.png` | "a simple cute kawaii rounded left-pointing chevron/arrow, soft gold #FFD15C fill, no other elements, no text" |
| `ic-volume-on.png` | "a simple cute kawaii rounded speaker cone in soft sky blue #8ECFEC with two small rounded sound-wave arcs beside it, no text" |
| `ic-volume-off.png` | "a simple cute kawaii rounded speaker cone in soft muted lavender-grey with one small rounded X beside it (gentle, not a harsh slash), no text" |
| `ic-settings.png` | "a simple cute kawaii rounded WOODEN spool/cog shape with 6 chunky rounded teeth, warm wood-tone #C97A4E fill with a faint wood-grain hint, this is a friendly toy-shed cog, NOT a mechanical/engineering gear, no text" |
| `ic-close.png` | "a simple cute kawaii rounded X made of two soft thick rounded bars crossing, warm coral-pink #FF9DB6 fill, friendly not harsh, no text" |
| `ic-star.png` | "a simple cute kawaii 5-point rounded gold star (the game's Star Stamp currency icon), gold #FFD15C fill shading to #E3A93E at the base, tiny white sparkle highlight, no text" |
| `ic-heart.png` | "a simple cute kawaii rounded heart, pink #FF9DB6 fill shading to #F06A8E, tiny white sparkle highlight, no text" |
| `ic-gear.png` | "a simple cute kawaii WOODEN sewing-spool/cog shape, chunky rounded wooden toy cog with 6 soft teeth, warm wood-tone #C97A4E, a friendly Toy Shed tinkerer icon — NOT an engineering/machinery gear, no text" |
| `ic-moon.png` | "a simple cute kawaii crescent moon with a gentle closed-eye smiling face, soft lavender #B79BEA fill, two tiny gold sparkle stars beside it, no text" |
| `ic-drop.png` | "a simple cute kawaii water droplet, sky blue #8ECFEC fill shading to #6FC2C6, tiny white sparkle highlight, no text" |
| `ic-cloud.png` | "a simple cute kawaii fluffy cloud, cream-white #FFFDF6 fill with soft sky-blue #CDEBFA shading in the folds, matching puffy-full.png's cloud shapes, no text" |
| `ic-speed.png` | "a simple cute kawaii rounded soft lightning-bolt/motion shape, warm gold #FFD15C fill, one small soft motion-swoosh curve trailing behind it, playful and round — not sharp or aggressive, no text" |
| `ic-capacity.png` | "a simple cute kawaii open parcel box, warm cardboard tan #DCC084 body with a cream #F6EAD6 flap lid popped open on top, one small pastel ribbon bow, no text" |
| `ic-arrow.png` | "a simple cute kawaii rounded right-pointing chevron/arrow, mint #B7E0C9 fill, no text" |
| `ic-reveal.png` | "a simple cute kawaii friendly round eye — cream #F6EAD6 lid shape, big round dark pupil with one white sparkle highlight, one small soft pink blush dot beside it, warm and curious, not creepy, no text" |
| `ic-x2.png` | "a simple cute kawaii rounded gold #FFD15C coin/badge shape with two small overlapping star or coin shapes stacked in the lower half (so the multiplier reads visually, not just by numeral) and a chunky rounded friendly bubble-font '2×' across the upper half in warm brown #3D2B1F — this is the ONLY icon in the set permitted to contain a numeral" |
| `ic-seal.png` | "a simple cute kawaii cream envelope #F6EAD6 with one round red-orange wax-seal blob stamped in the center with a small heart pressed into it, no text" |
| `ic-stamp.png` | "a simple cute kawaii rounded postage stamp with a scalloped/perforated edge border, cream #F6EAD6 center with a small gold star rosette illustration in the middle, no text" |
| `ic-crown.png` | "a simple cute kawaii small soft gold crown with 3 rounded points and one pink gem #FFC6B6, matching cos-hat-crown.png's exact crown model (once that file is regenerated per Section 5), no text" |

Note on `ic-x2`: per the studio's zero-reading-dependency rule, pair the numeral with the stacked coin/star visual (specified above) so the multiplier is understood by shape/count alone even before a child recognizes "2".

### 6.2 Reward Flowers (garden/collection payoff) — 5 files, 512×512 transparent PNG

**Shared style preamble — prepend to every flower prompt below, verbatim:**
> "Cute kawaii single garden flower illustration for a preschool cozy collection-game reward, centered composition on a short stem with one or two simple leaves, thick warm dark-brown outline #3D2B1F, flat cel-shaded with ONE soft airbrushed highlight bloom and one soft ambient-occlusion shadow at the base of the stem, 2D children's storybook illustration matching peeky-full.png / orby-full.png rendering, isolated on transparent background, no text, no watermark, no photorealism."

| File | Subject line |
|---|---|
| `flower-common.png` | "a simple cute kawaii daisy/buttercup with 6–8 rounded cream-white #FFFDF6 petals and a warm gold #FFD15C round center, soft mint-green #B7E0C9 stem with one small leaf — the everyday-common garden flower, gentle and simple" |
| `flower-rare.png` | "a prettier cute kawaii tulip / bluebell-cluster flower, rounded bell-shaped petals in a soft lavender-to-pink gradient (#B79BEA to #FFC6B6), mint-green stem with two small leaves — a slightly more elaborate silhouette than the common daisy, reads clearly as a rarer garden flower" |
| `flower-special.png` | "a glowing golden star-shaped flower with 5–6 soft-rounded star petals in warm gold #FFD15C and a bright cream #FFFDF6 core, one gentle warm outer glow halo (soft, not neon), 3–4 tiny sparkle-star particles drifting around it, mint stem — the rarest, most magical garden flower, premium and joyful, not gaudy" |
| `flower-locked.png` | "a small soft closed flower bud, rounded teardrop shape, gently desaturated muted grey-green #C9CDBE (calm, NOT dark or dead-looking, NOT scary), simple mint stem, a cozy 'not yet bloomed' silhouette — inviting, like a promise, not a loss" |
| `flower-unlocked.png` | "a fully open cute kawaii generic garden flower captured mid-'bloom pop', bright warm pastel petals (cream #FFFDF6 base with soft pink #FFC6B6 tips) flared open as if just blossomed, a small burst of 3–4 sparkle stars and soft light rays radiating behind it, mint stem — a joyful reveal-moment illustration" |

### 6.3 App-Store Screenshot Frames — 5 portrait, 1290×2796, opaque PNG

Marketing collateral, NOT in-game art — built around a real captured gameplay PNG the operator pastes in after generation. Font feel: **Baloo 2 extra-bold, rounded**, matching the in-game title/UI font already used in `index.html` (`"Baloo 2","Arial Rounded MT Bold"`) — cream fill `#FFFDF6` with a thick `#3D2B1F` outline or soft warm drop-shadow for contrast over the gradient, short (2–5 word) zero-reading-dependency-friendly headline (a parent reads it, a toddler doesn't need to).

**Universal layout (all 5 frames, canvas 1290×2796):**
- Headline text zone: y = 140–520 (top ~15–19%), horizontally centered, safe text width ≤ 1090px (100px margin each side).
- Gameplay screenshot window: rounded-rect mask, x = 97–1193 (1096px wide), y = 580–2380 (1800px tall), corner radius ≈ 64px — this is where the operator composites the real captured PNG (scaled to cover, center-cropped). Leave this region as a clean empty rounded-rect (a soft AO shadow can be pre-baked just outside its edge for depth) — do not paint fake gameplay into it.
- Footer accent zone: y = 2380–2796 — small mascot/sticker/sparkle accent only, kept clear of the very bottom ~80px safe margin.
- Overall safe margin: 60px bleed on all sides kept clear of essential text/logo (store crops/thumbnails vary).

| # | File | Captured surface (operator pastes in) | Background gradient (top→bottom) | Headline copy |
|---|---|---|---|---|
| 1 | `store-shot-1-hero.png` | Start/title screen — Poppu waving at the desk, pulsing Play button | Warm golden-hour: cream `#F6EAD6` → gold `#FFD15C` → terracotta `#C97A4E`, matching `bg-mailroom.webp` mood | "Sort. Wrap. Deliver Smiles!" |
| 2 | `store-shot-2-sort.png` | Core conveyor gameplay — package mid-drag toward a glowing matched mailbox | Soft cream `#F6EAD6` → mint `#B7E0C9`, bright and clear | "Match & Deliver Every Package!" |
| 3 | `store-shot-3-wrap.png` | Wrap Shop — ribbon spool, bow, sticker sheet on a package | Soft peach `#FFCFA0` → lavender `#B79BEA`, matching wrap-shop palette | "Wrap Cozy Gifts With Ribbons & Bows!" |
| 4 | `store-shot-4-drive.png` | Delivery-drive scene — Poppu on the forest path heading to a friend's house | Soft sky blue `#8ECFEC` → mint `#B7E0C9`, daylight, matching `bg-forest.webp` | "Drive The Path To New Friends!" |
| 5 | `store-shot-5-reward.png` | Friend pop-up "thank you" celebration + sticker/flower reward earned | Warm celebration: pink `#FF9DB6` → gold `#FFD15C`, soft confetti/sparkle accents | "Earn Stickers & Garden Flowers!" |

Generation note for the operator: generate frames 1–5 as the **background + headline + footer accent only** (empty rounded-rect window per the layout above); do the gameplay-screenshot composite as a separate paste-in step once real captures exist, so the frame art itself can be regenerated/reused independent of which build screenshot is current.

### 6.4 New `ASSET_SRC` keys for gameplay-engineer (append to Section 3's list)

```
ic_home / ic_back / ic_volume_on / ic_volume_off / ic_settings / ic_close
ic_star / ic_heart / ic_gear / ic_moon / ic_drop / ic_cloud
ic_speed / ic_capacity / ic_arrow / ic_reveal / ic_x2
ic_seal / ic_stamp / ic_crown
  → assets/ic-<name-with-dashes>.png   (all 256×256, replaces drawIcon() procedural draws)

flower_common / flower_rare / flower_special / flower_locked / flower_unlocked
  → assets/flower-<name>.png   (all 512×512)
```
(Store frames are marketing collateral — no `ASSET_SRC` key, not loaded by the game runtime.)

### 6.5 10/10 review — this Phase 1B batch vs. locked target

1. **Character/IP consistency:** 7/10 — icons and flowers are new territory, not character-model risk, but `ic-crown` explicitly depends on `cos-hat-crown.png` being regenerated first (Section 5) or the two crowns will drift. **Fix:** sequence `ic-crown` generation AFTER `cos-hat-crown.png` regen lands, and hand the operator the finished crown file as a visual reference at that time.
2. **Palette & style adherence:** 6/10 on paper until proven in render — the risk in an icon set this size is 20 separate generations drifting from each other more than a small hero-character batch would. **Fix:** the shared preamble string is mandatory verbatim on every icon call (not paraphrased), and game-asset-curator should gate the FULL 20-icon set side-by-side in one contact sheet before approving any subset — reject the whole batch and regenerate together if even 2–3 icons drift in outline weight or saturation, rather than patching piecemeal.
3. **Animation liveliness:** 5/10 — icons are static UI by nature (fine), but flowers are the retention hook here and only `flower-unlocked` has built-in "pop" energy. **Fix:** game-animation-director should treat `flower-locked` → `flower-unlocked` → final rarity flower as a 3-step reveal sequence (bud trembles → pops open with the sparkle burst baked into `flower-unlocked` → settles/crossfades into the earned rarity flower) rather than a flat swap; the sparkle-burst art already gives it a natural animate-in hook.
4. **Asset weight/performance:** 6/10 — 20 icons + 5 flowers = 25 new small PNGs on top of the 28 already planned in Section 2; none individually heavy but the HTTP-request count is climbing fast for a PWA. **Fix:** the 20-icon set is the single best atlas candidate in the whole project (uniform 256×256 grid, all UI-layer, all loaded at boot) — pack into one `ui-icons-atlas.png` + JSON before wiring, this is higher priority than the cosmetic atlas already recommended in Section 1. Store-frame PNGs are marketing-only and never ship in the app bundle, so they carry zero PWA weight cost — no compression target needed beyond normal App Store Connect limits.

**Total: 6/10 as specified — NEEDS WORK, but the fix is fully specified above and ready for the operator to execute against.** This is expected at the spec stage (per studio scale, a lock is judged once rendered, not on paper) — re-score once the full icon contact sheet, all 5 flower states, and all 5 store frames are generated and curated; only APPROVE at a true 10 once verified in a render, matching peeky/orby/puffy's bar with zero drift across the 20-icon set.

---
*Phase 1 Art Manifest v1.1 (Phase 1B — UI icons, reward flowers, store frames, cosmetic PNG audit appended) · art-director · HDRV Studio · locked prior to generation, per game-art-pipeline: generate → curate → integrate.*
