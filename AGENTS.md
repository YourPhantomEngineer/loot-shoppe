# Working on Dungeon Loot Shoppe

Instructions for any AI agent (Claude, ChatGPT/Codex or others) or person changing this game. Read this first, then `docs/story-script.md`.

## What this is

A browser game: delve dungeons for loot, haggle with customers in your shop, rebuild a town, across a six-chapter story. It's played on phones from the Home Screen and works offline. It's hosted on GitHub Pages from `main`, so **anything merged to `main` goes live to players**.

## Ground rules

1. **Same game for everyone.** No owner-only features, debug unlocks, accounts or cloud saves. The owner tests by playing the same game friends play.
2. **Never break existing saves.** Players' progress lives in `localStorage` (key `dungeon-loot-shoppe-v1`) and in save codes (`LS1:` + base64 JSON). Any change to the save shape needs a migration in `migrate()` / `migrateStory()`. A new tutorial prompt must not replay for saves that are already past that moment (see `migrateTut2()` for the pattern).
3. **The story script decides the story.** Dialogue, scene order, goals and tutorial prompts come from `docs/story-script.md`. If the game and the script disagree, flag it. Don't quietly pick one. If something in the script can't be built as written, say so instead of improvising.
4. **Keep the game and the script in sync.** A game change that affects story, prompts, goals or names gets a matching edit to `docs/story-script.md` in the same pull request, and the reverse.
5. **No build step, no dependencies.** The game's code is `index.html`: HTML, CSS and JavaScript in one file. Music, portraits and most sound effects are generated in code. Don't add frameworks or bundlers. The only external request is Google Fonts.
6. **Bump the cache on every release.** Any change to `index.html`, `icons/` or `sounds/` must bump `CACHE` in `sw.js` (for example `dungeon-loot-shoppe-v28` → `v29`), or installed copies keep the old version.
7. **Recorded sounds only where code can't do it, and only with the owner's OK.** Sound effects may use recordings in `sounds/` (MP3, mono, kept small, under 150 KB each). None are in use right now. Each file must be one the owner chose or approved and that may be redistributed in a public game (CC0, or generated or bought with rights the owner confirmed). To add one: put it in `sounds/`, list it in `SOUNDS` in `index.html`, add it to `CORE` in `sw.js` so it plays offline, and keep a generated fallback in the same `sfx` entry for when the file can't load. `tests/sound-files.test.js` checks all of this. Image files are still not used for game content.

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

## Several agents at once

More than one agent (several Claude sessions, ChatGPT/Codex) may be changing the game at the same time.

- **Fetch first, every time.** Run `git pull --rebase origin main` before you start a change and again right before you push. If the rebase brings in someone else's work, run the tests again before pushing.
- **Keep changes small and finish them.** One feature or fix per commit or pull request. Don't leave half-done work on `main`.
- **Bump the cache on top of the latest number.** If someone else bumped `CACHE` in `sw.js` while you worked, take the next number after theirs when you resolve the conflict.
- **Don't undo other agents' work.** If something another agent did looks wrong, say so to the owner instead of quietly reverting it.
- **Commit messages say what changed for the player**, so the other agents can follow the log.

### Claude sessions

Claude sessions can do two things other agents can't:

- **Edit the master story doc.** The script lives at https://claude.ai/artifact/EjkBh5p6FSvwhqCTwAcFCd. Before editing, read what changed since you last looked. Mirror any changes the owner made there into the game. After editing it, export it as Markdown and overwrite `docs/story-script.md` in the same commit, so the two never drift apart. If `docs/story-script.md` changed in the repo (another agent's pull request), carry those edits into the master doc.
- **Update the claude.ai preview** at https://claude.ai/artifact/Jo4j1N5C4Hoph9DhGYK3Cf after a release. Build it from `index.html` as follows:
  1. Take everything between `<body>` and the closing service-worker `<script>`.
  2. Put these three lines in front of it: `<title>Dungeon Loot Shoppe</title>`, `<meta name="claude:viewport-fit-sides" content="cover">`, and the Google Fonts `<link>` from `index.html`'s head.
  3. Publish that to the same artifact URL, with every file in `sounds/` (if there are any) as a supporting file at the same path (for example `sounds/coin-purse.mp3`), so the preview plays the recordings too.

Claude sessions push to `main` directly (the owner asked for changes to go live), after `git pull --rebase` and a full `npm test`.

## Files

| Path | What it is |
| --- | --- |
| `index.html` | The whole game |
| `sw.js` | Service worker for offline play. `CACHE` version must change with every release |
| `manifest.webmanifest`, `icons/` | Home Screen name and icons |
| `sounds/` | Recorded sound effects (see ground rule 7) |
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
