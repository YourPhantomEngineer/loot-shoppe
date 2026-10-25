# Working on Dungeon Loot Shoppe

Instructions for any AI agent (Claude, ChatGPT/Codex or others) or person changing this game. Read this first, then `docs/story-script.md`.

## What this is

A browser game: delve dungeons for loot, haggle with customers in your shop, rebuild a town, across a six-chapter story. It's played on phones from the Home Screen and works offline. It's hosted on GitHub Pages from `main`, so **anything merged to `main` goes live to players**.

## Ground rules

1. **Same game for everyone.** No owner-only features, debug unlocks, accounts or cloud saves. The owner tests by playing the same game friends play.
2. **Never break existing saves.** Players' progress lives in `localStorage` (key `dungeon-loot-shoppe-v1`) and in save codes (`LS1:` + base64 JSON). Any change to the save shape needs a migration in `migrate()` / `migrateStory()`. A new tutorial prompt must not replay for saves that are already past that moment (see `migrateTut2()` for the pattern).
3. **The story script decides the story.** Dialogue, scene order, goals and tutorial prompts come from `docs/story-script.md`. If the game and the script disagree, flag it. Don't quietly pick one. If something in the script can't be built as written, say so instead of improvising.
4. **Keep the game and the script in sync.** A game change that affects story, prompts, goals or names gets a matching edit to `docs/story-script.md` in the same pull request, and the reverse.
5. **No build step, no dependencies.** The whole game is `index.html`: HTML, CSS and JavaScript in one file. Music and portraits are generated in code. Don't add frameworks, bundlers or image files for game content. The only external request is Google Fonts.
6. **Bump the cache on every release.** Any change to `index.html` or `icons/` must bump `CACHE` in `sw.js` (for example `dungeon-loot-shoppe-v28` → `v29`), or installed copies keep the old version.

## How to collaborate

- **Work on a branch and open a pull request.** Don't push straight to `main`. Keep each pull request to one change, and say in its description what changed for the player.
- **Pull before you start.** Other agents edit the same file, so start from the latest `main` and keep pull requests small to avoid conflicts in `index.html`.
- **Run the tests** before opening a pull request (see below), and add or extend a test when you add behavior.
- **Report what you couldn't do** or had to interpret, in the pull request description.

## The story script

`docs/story-script.md` is a copy of the master script, which lives in a Claude Doc that only Claude can edit. To change the story, edit `docs/story-script.md` in your pull request. Claude carries merged script changes back into the master doc and refreshes this copy whenever the master changes.

Script conventions:
- "(highlighting the X)" means X gets the pulsing outline after the prompt's **Got it** (see "How highlights work" at the top of the script).
- Every speaking character has a pixel portrait. A new speaking character needs one (see "Portraits").

## Files

| Path | What it is |
| --- | --- |
| `index.html` | The whole game |
| `sw.js` | Service worker for offline play. `CACHE` version must change with every release |
| `manifest.webmanifest`, `icons/` | Home Screen name and icons |
| `docs/story-script.md` | The story script (copy of the master Claude Doc) |
| `tests/` | Browser tests (Playwright) |
| `package.json` | Test tooling only. The game doesn't use it |

## Map of `index.html`

The script is one file, split by `/* ===== Section ===== */` comments, in this order:

- **Data**: items, dungeons (`DUN`), monsters, recipes, customer types (`CUST`), upgrades (`UPG`), skills (`SK`).
- **Story engine**: the event bus `SE(type, data)`, chapters (`CH`) and goals, the scene player, highlights, the Journal view, and save migration.
  - Scenes (`SCN`) are data: an `on` event, an optional `when`, `cards`, and a `done` effect.
  - Tips (`TIPS`) are one-line pop-ups queued with `tip(id)`. A tip's `hl` names what to outline after **Got it**.
  - Only one highlight shows at a time. The next prompt waits for it.
- **Story data**: town buildings (`BUILD`), Chapters 1–6, tip hooks, Journal extras, the Grand Reopening and startup loan, and the Voss fight.
- **State**: `fresh()`, `loadState()`, `migrate()`, `save()`.
- **Sound and Music**: Web Audio, generated live.
- **Helpers**, then **Shop staff** (hires that sell while you delve).
- **Dungeon**: room events, combat, consumables and movement.
- **Crafting**, **Reputation** (perks bought with stars from reopenings) and **Skills**.
- **Shop**: customers, moods, personas, regulars and haggling.
- **NPC portraits**: 16×16 pixel grids in `SPR`, names mapped in `SPR_OF`, drawn by `portrait(name)`.
- **Views**: `render()` builds each screen from state, and one click handler routes `data-act` buttons.

Style: compact vanilla JavaScript in the existing style, with plain sentence-case UI text. Respect `prefers-reduced-motion` for new animations.

## Running the tests

```
npm install
npx playwright install chromium
npm test                 # all tests
npm test -- haggling     # tests whose file name contains "haggling"
VERBOSE=1 npm test       # print every test's full output
```

Each file in `tests/` opens `index.html` in headless Chromium and plays through part of the game. `tests/helpers.js` adds shortcuts like `T.through()` (click through scenes and prompts), `T.delve()`, `T.boss()` and `T.toCh3()`. A test fails if the game throws an error or the output contains `FAIL` or `!!`.

To try the game by hand, open `index.html` in a browser. Offline mode only turns on over https or localhost, for example with `npx serve .`.

## Releasing

1. Change `index.html`, and `docs/story-script.md` if the story is affected.
2. Bump `CACHE` in `sw.js`.
3. Run `npm test`.
4. Open a pull request. Merging it publishes the game.

Players get the update on their next launch, or right away with **Check for updates** on the Town tab.
