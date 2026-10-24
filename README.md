# Loot Shoppe

A cozy dungeon-delving shopkeeping game that runs in the browser.

Delve into dungeons for loot, fight monsters and bosses, craft better goods in the workshop, then haggle with customers in your shop. Grow your adventurer with a skill tree and upgrade your gear and storefront.

## Play

Open the game's GitHub Pages site. On iPhone, tap Share → **Add to Home Screen** to install it. After the first load it works offline.

Progress saves on your device. Use **Copy save code** on the Town tab to back up your progress or move it to another device.

## Files

- `index.html` — the whole game (HTML, CSS and JavaScript in one file)
- `sw.js` — service worker that lets the game run offline
- `manifest.webmanifest` — app name, icon and Home Screen settings
- `icons/` — app icons

When you change `index.html`, bump the `CACHE` version in `sw.js` so installed copies pick up the new icons and files.

© All rights reserved.
