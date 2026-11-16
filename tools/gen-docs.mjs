// gen-docs.mjs — write src/js/MODULES.md (the module map) and DATA.md from the manifest.
import { readFileSync, writeFileSync } from 'node:fs';

const manifest = JSON.parse(readFileSync('src/js/_manifest.json', 'utf8'));

const NOTES = {
  '000-prelude.js': 'Opens the IIFE. Declares one `var` slot per module, binds `setTimeout`/`setInterval`/`rAF` to the real window, then creates `t`, the Proxy every module writes its exports to. Load first.',
  'tab-lock': 'Single-tab guard: a heartbeat in localStorage; a second tab that finds a live heartbeat stops the first from saving (prevents save corruption).',
  'clock': 'Wall-clock that survives sleep/offline: HEAD requests the page itself to read the `Date` header, stores an offset in `pokecatch.clock`, exposes `now()`/`ready()`/`onForward()` so the idle engine can "catch up" after the tab was closed.',
  'pokedex': 'The species table: 493 entries with id, French name, key, types, base stats, capture rate, legendary/mythical flags, height/weight, learnset, evolution hints.',
  'evolutions': 'Evolution graph: `{from, to, level?, item?, ...}` edges, including trade/link-cable and stone evolutions.',
  'moves': 'Move table: type, power, accuracy, PP, category, effect hooks, plus the move-power overrides the Balance pass applies.',
  'item-names': 'Display names (French) for every item id.',
  'encounters-kanto': 'Wild-encounter tables for Kanto areas: per-zone species, level bands, weights, and the rod/surf/headbutt conditions.',
  'base-exp-kanto': 'Base experience yield per species (Kanto dex range).',
  'encounters-johto-headbutt': 'Extra Johto encounter rows merged into `t.ENCOUNTERS` (headbutt trees etc.).',
  'base-exp-johto': 'Base experience yield per species (Johto dex range).',
  'encounters-hoenn': 'Wild-encounter tables for Hoenn areas.',
  'base-exp-hoenn': 'Base experience yield per species (Hoenn dex range).',
  'encounters-sinnoh': 'Wild-encounter tables for Sinnoh areas.',
  'base-exp-sinnoh': 'Base experience yield per species (Sinnoh dex range).',
  'unown': 'Unown letter/form selection helper.',
  'specials': 'Special (non-wild) encounters: gifts, statics, roaming legendaries.',
  'forms': 'Alternate forms: base-id mapping, hatch form, egg species, form-specific overrides.',
  'config': 'All tunable game constants in one object: economy, shop, pension, casino, tower, underground, raids, story pacing, XP curve, save key, team size… The first place to tweak balance.',
  'item-names-2': 'Second pass of item names (items added later in development).',
  'types': 'Type list and per-type colour/label metadata.',
  'type-chart': 'Effectiveness matrix (2×, 1×, ½×, 0×) between the 18 types.',
  'i18n': 'Translation runtime: `e()`/`t()` lookup, `{name}` placeholder interpolation, language switching, `window.I18N_DATA` merge for the 7 non-French bundles.',
  'i18n-t': 'Tiny alias: exports the translate function as `t._t`.',
  'daytime': 'Day/night phase calculation from the clock, radio buttons of the CSS theme.',
  'weather': 'Weather roll + modifiers, emits `weather` events for the FX layer.',
  'habitats': 'Habitat definitions: which species appear where, zone metadata, spawn weights.',
  'status': 'Status conditions (poison, burn, sleep, paralysis…): application, tick, clear, badges.',
  'story': 'The whole campaign script: regions, chapters, steps (routes, gyms, eggs, bosses), rewards, unlock rules. 89 KB of data.',
  'scenes': 'Background scenes: id → webp path, indoor flag, tint; `css()` helper builds the `background-image` for a screen.',
  'game': 'The savegame core: state shape, load/save/migration, money, items, team, PC, dex registration, XP/level/evolution, shop pricing, trade rules, pension maths. Everything stateful goes through here.',
  'league-teams': 'Elite Four / Champion team compositions per region.',
  'adventure': 'The idle engine: picks zones, rolls encounters, runs the auto-battle turn loop, captures, awards money/XP/items, advances chapters. Drives the Adventure screen.',
  'underground': 'The Underground mode: floors, walls, gems, guards, loot tables, themes.',
  'events': 'Time-limited legendary events: schedule, spawn, team hand-off.',
  'raid-swaps': 'Raid rotation table.',
  'raids': 'Daily raid draws: region lanes, shiny charm logic, boss teams, rewards.',
  'worldboss': 'World boss events: boss HP pools, damage accounting, community contribution.',
  'tower': 'Battle Tower: floors, streaks, BP shop, rewards.',
  'candy-run': 'Candy Run minigame: board, rewards, odds.',
  'legend-zones': 'Legendary zones: which legendary can appear in which area/condition.',
  'roaming': 'Roaming legendary movement across zones.',
  'sfx': 'Sound effects: WebAudio synthesis (no audio files), `unlock()` for the first user gesture, volume/mute from Options.',
  'music': 'Music: WebAudio sequencer/loop player.',
  'sprite-bounds': 'Hit-box/trim data (x, y, w, h) per sprite file, used to crop transparent padding before drawing.',
  'ui-core': 'The screen router and shared UI toolkit: `t.Screens` registry, `t.App.show()`, DOM helpers `$`/`$$`/`h`, sprite boxes, bars, modals, toasts, number formatting, event delegation.',
  'perf': 'Performance flags: reduced animation, low-end detection, pause when hidden.',
  'elite-frames': 'Trainer-card frames unlocked by milestones (drop rates, unlock rules).',
  'frames': 'Trainer-card frames registry + `open()`/`tile()`/`fresh()` helpers used by the card editor.',
  'badge-shine': 'Badge shine/glint animation used by the Kanto badge case.',
  'battle-fx': 'The battle animation engine: move visuals, hit flashes, projectiles, status auras. Also exports `FX_MOVES` (which effect each move uses).',
  'capture-fx': 'Poké Ball throw + wobble + catch animation.',
  'item-fx': 'Item-use animation; berry eating animation.',
  'link-fx': 'Trade/link cable animation.',
  'raid-draw': 'Raid roulette draw animation.',
  'heal-fx': 'Pokémon Center heal animation.',
  'shiny-glint': 'Shiny sparkle overlay (shared canvas).',
  'gift-fx': 'Gift/open animation for the Prof. Chen starter gift.',
  'geode-fx': 'Geode cracking animation (Underground).',
  'rank-fx': 'Rank-up animation.',
  'weather-fx': 'Rain/snow/sand FX layer driven by the weather module.',
  'vgrid': 'Virtualised grid: renders long Pokémon lists (PC, dex) with windowing + scroll restore.',
  'event-ui': 'Legendary event screen UI (countdown, boss HP, contribution).',
  'event-team': 'Event team builder: picks the best 6 against the event boss.',
  'screen-adventure': 'The Adventure screen: arena layout, team rail, battle log, speed buttons, zone list, bag panel, buff tips. The game’s main view.',
  'screen-map-event': 'Progression (map) screen + the event card, region banners, gym badges, camera/travel FX.',
  'screen-raid': 'Raids screen: daily lane, shiny charm, boss preview, battle launch.',
  'worldboss-view': 'World boss screen: HP bar, community damage, rewards.',
  'screen-tower': 'Battle Tower screen: floor list, streak, BP shop.',
  'screen-candy': 'Candy Run screen: board, spin, rewards.',
  'screen-underground': 'Underground screen: gem bag, floor, walls, guards, loot popups.',
  'screen-achievements': 'Achievements + trainer-card editor (avatars, frames, items, name).',
  'screen-team': 'Team / PC screen: six slots, filters, sorting, search, evolution helper, move list.',
  'screen-pension': 'Pokémon Pension: daycare slots, incubator, eggs, berries.',
  'pension-berry-fx': 'Berry feed animation in the pension.',
  'berry-bites': 'Berry bite-count animation.',
  'screen-pokedex': 'Pokédex screen: progress ring, per-region bars, caught/shiny status, search, filters.',
  'screen-shop': 'Shop screen: categories, prices, stock gates by badge.',
  'screen-casino': 'Casino: slot machines, coin case, ball prizes.',
  'screen-trade': 'Trading screen: local link trades and online offers.',
  'screen-market': 'Black Market: listings, tax, buy/sell flow.',
  'screen-friends': 'Friends screen: friend codes, presence, friend-only offers.',
  'trainer-card': 'Trainer card rendering: avatar, name, tag, badges, playtime, dex count.',
  'names': 'Player-name validation (length, forbidden words, normalisation).',
  'cloud': 'Supabase backend client: anonymous sign-in, save upload/download, leaderboards, gifts, friends, community counters, offline fallback. Talks to qglirc…supabase.co.',
  'gifts': 'Gift inbox: fetch, validate, open, dedupe by gift id.',
  'screen-admin-loader': 'Lazy loader for the admin screens (`js/screens/admin-*.js`). Empty by default (`window.ADMIN_FILES = []`), so the admin UI is not shipped.',
  'options': 'Options modal: theme, language, sound, reduced motion, save management.',
  'changelog': 'The in-game changelog data: 300+ entries (French), used by the Changelogs screen and the "NEW" badge.',
  'changelog-view': 'Changelog viewer: grouping, seen-state badge, Discord link.',
  'guide': 'In-game guide: every feature explained, per-region tips.',
  'news': 'News bar: rotating tips + live community stats.',
  'title': 'First-run flow: title screen, Prof. Chen narration, avatar pick, name entry, and the "Comment jouer" modal.',
  'update': 'Build watcher: polls boot.js, notices a new BUILD, asks for a reload; keeps the idle tick safe while updating.',
  'sleep': 'Idle/sleep handling: pauses animations and physics when the tab is hidden, resumes cleanly.',
  'app-boot': 'The application bootstrap: wires the header, save button, clock stepping, visibility/offline catch-up, speed buttons, and starts `t.App`. Runs last.',
};

const rows = manifest.modules.map(m => ({
  file: m.file,
  module: m.apis.length ? m.apis.join(', ') : '(internal helpers only)',
  size: m.bytes,
  chunk: m.index,
  note: NOTES[m.name] || NOTES[m.file.replace(/^\d+-/, '').replace(/\.js$/, '')] || '',
}));

const fmt = n => n >= 1024 ? `${(n / 1024).toFixed(1)} KB` : `${n} B`;
let md = `# Module map — src/js/\n\n`;
md += `The shipped \`bundle/app.<hash>.js\` is a single IIFE in which each original source file became one\n`;
md += `comma-joined expression. \`tools/extract-source.mjs\` split it back at those exact byte boundaries\n`;
md += `(round-trip verified byte-for-byte), and every module was then proved AST-identical to the shipped\n`;
md += `code by \`tools/format-src.mjs\`. **Order matters**: the build concatenates these files in filename\n`;
md += `order, exactly like the original bundler did.\n\n`;
md += `| # | file | module(s) on \`t\` | size | what it does |\n|---|---|---|---|---|\n`;
for (const r of rows) {
  md += `| ${r.chunk} | [${r.file}](./${r.file}) | \`${r.module}\` | ${fmt(r.size)} | ${r.note} |\n`;
}
md += `| – | [000-prelude.js](./000-prelude.js) | \`t\` (Proxy) | ${fmt(manifest.prelude.bytes)} | ${NOTES['000-prelude.js']} |\n`;
md += `\n## How the pieces fit together\n\n`;
md += `\`\`\`\n`;
md += `boot.js                    (generated) sets <html>, theme, language, injects the shell, loads the bundles\n`;
md += `  -> vendor-supabase.js    Supabase SDK (third party)\n`;
md += `  -> app.<hash>.js         (generated from src/js/*.js, in order)\n`;
md += `       000-prelude.js     creates t = Proxy(modules registry)\n`;
md += `       001..029           data tables (dex, moves, story, scenes, config…)\n`;
md += `       030-game.js        savegame core\n`;
md += `       032-adventure.js   idle battle engine\n`;
md += `       033..075           modes (underground, raids, tower…), FX, screen UIs\n`;
md += `       076..094           remaining screens, cloud, title, update, sleep\n`;
md += `       095-app-boot.js    wires everything and starts the app\n`;
md += `\`\`\`\n`;
md += `\n## Adding a module\n\n`;
md += `Create \`src/js/096-my-feature.js\` with \`t.MyFeature = (function(){ … })();\`, then use it from any\n`;
md += `later file as \`t.MyFeature\`. Because files share one IIFE scope and run in order, a new file at the\n`;
md += `end is always safe; a file that must run earlier needs its number (and therefore its place) moved.\n`;
writeFileSync('src/js/MODULES.md', md);
console.log('wrote src/js/MODULES.md', md.length, 'bytes,', rows.length, 'modules');

// ---- data snapshot doc ---------------------------------------------------------------------
let data = `# Game data — where to change what\n\n`;
data += `All balance/content data lives in plain objects spread over the data modules. These are the ones\n`;
data += `you will touch most often:\n\n`;
data += `| What | File | Notes |\n|---|---|---|\n`;
data += `| Species (493) | [003-pokedex.js](./003-pokedex.js) | name, key, types, base stats, capture rate, learnset, height/weight |\n`;
data += `| Evolutions | [004-evolutions.js](./004-evolutions.js) | level / stone / link-cable edges |\n`;
data += `| Moves | [005-moves.js](./005-moves.js) | type, power, accuracy, category, FX key |\n`;
data += `| Wild encounters | [007](./007-encounters-kanto.js), [009](./009-encounters-johto-headbutt.js), [011](./011-encounters-hoenn.js), [013](./013-encounters-sinnoh.js) | per-zone species/level/weight |\n`;
data += `| Base EXP | [008](./008-base-exp-kanto.js), [010](./010-base-exp-johto.js), [012](./012-base-exp-hoenn.js), [014](./014-base-exp-sinnoh.js) | per-species yield |\n`;
data += `| Types / chart | [020](./020-types.js), [021](./021-type-chart.js) | effectiveness matrix |\n`;
data += `| Balance constants | [018-config.js](./018-config.js) | economy, shop, pension, casino, tower, underground, raids, XP curve, save key |\n`;
data += `| Story / campaign | [028-story.js](./028-story.js) | regions → chapters → steps |\n`;
data += `| Scenes (backgrounds) | [029-scenes.js](./029-scenes.js) | scene id → \`assets/bg/scenes/*.webp\` |\n`;
data += `| Habitats | [026-habitats.js](./026-habitats.js) | zone metadata, spawn tables |\n`;
data += `| Elites | [031-league-teams.js](./031-league-teams.js) | Elite Four / Champion teams |\n`;
data += `| Changelog | [088-changelog.js](./088-changelog.js) | in-game changelog entries |\n`;
data += `| Sprite bounds | [044-sprite-bounds.js](./044-sprite-bounds.js) | trim boxes per image |\n`;
data += `\nRun \`npm run data:export\` to dump these tables to \`data/*.json\` for inspection or diffing.\n`;
writeFileSync('src/js/DATA.md', data);
console.log('wrote src/js/DATA.md');
