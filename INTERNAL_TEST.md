# 🧪 Poppu's Mail Room — Internal Tester Guide

## ▶️ Play it now (live)
**https://brianpb9.github.io/poppu-mail-room/**

Works on any phone / tablet / desktop browser — nothing to install. Landscape, sound turns on after the first tap, progress saves on your own device.

### Install it like a real app (recommended for the tester feel)
- **iPhone/iPad (Safari):** tap **Share** → **Add to Home Screen** → open "Poppu Mail" from the home screen (full-screen, no browser bars).
- **Android (Chrome):** tap **⋮** menu → **Add to Home screen / Install app** → open from the home screen.

## 🎯 What to test (play as your child would)
Do a full loop and note anything confusing, ugly, or broken:
1. **Start → Town map** — is it obvious where to tap? Do the buildings invite a tap?
2. **Post Office → sort** — can a 2–5yo drag a package to the matching mailbox with no help?
3. **Delivery Drive** — steer the truck with your finger; try to **catch the floaters** (fireflies / lilypads / butterflies / clouds / acorns). Does each biome feel like a *different place to do something*?
4. **Arrival** — the friend hug + confetti.
5. **Wrap Shop** — pick a box → ribbon → sticker → **Ship**. Is the Ship button obvious?
6. **Friend's House** — feed / pet / dress a friend.
7. **Garden / collection** — the flowers filling up over runs.
8. **Shop** — the upgrade tags + cosmetics.
9. **Parent gate** — press-and-hold Poppu for 3 seconds → the parent dashboard.

## 📝 Feedback template (copy-paste per tester)
```
Tester / child age:
Device + browser (e.g. iPhone 13, Safari):
Did the child understand what to do WITHOUT reading? (yes/mostly/no):
Favorite moment:
Most confusing moment:
Anything ugly / broken / a dead-end:
Did the child want to play again? (yes/meh/no):
Any crash or freeze? (what were you doing):
Other notes:
```
Send feedback to **hdrvstudio@gmail.com**.

## ✅ Known state (so testers don't re-report)
- Board quality ~9 (all-Recommend); QA hardened — 0 console errors, no crashes/dead-ends, no fail state.
- Game is **100% free right now** (the $1.99 one-time unlock is not active in this web build).
- No ads, no tracking, all progress on-device.

## 🔜 Next stage — native store internal testing (needs the wrapper)
This hosted PWA is for **immediate** internal testing. For **store** internal tracks:
- **Google Play — Internal Testing** (up to 100 testers by email): needs the app wrapped as an Android **AAB** (TWA/Capacitor) uploaded to Play Console.
- **Apple — TestFlight** (internal testers): needs the app in App Store Connect (Capacitor/WKWebView shell).
Both also need: the hosted **PRIVACY_POLICY.html** URL, the content-rating/"Made for Kids" declaration, and the `poppu_full_unlock` $1.99 IAP created in each console (see MONETIZATION.md). The wrapper is the one piece that must be built outside the web project.

---
*Live build served from `main` via GitHub Pages. Push to `main` → the tester URL updates automatically in ~1 min.*
