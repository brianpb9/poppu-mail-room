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
*Phase 1 Art Manifest v1 · art-director · HDRV Studio · locked prior to generation, per game-art-pipeline: generate → curate → integrate.*
