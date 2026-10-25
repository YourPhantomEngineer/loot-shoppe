# Dungeon Loot Shoppe

A cozy dungeon-delving shopkeeping game that runs in the browser.

You inherit your aunt Maribel's shop in Hollowmere, along with her debt to the Celestial Consortium. Delve into dungeons for loot, haggle with customers, craft in the workshop, and rebuild the town one building at a time. Six chapters, told through the Journal, lead from the Mossy Cellar to the star at the top of the Spire and the Hollow Heart below the cellar.

Grand Reopening lets you start the shop over with a startup loan while the town, your staff and the story stay, earning Reputation for permanent perks.

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
