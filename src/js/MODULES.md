# Module map — src/js/

The shipped `bundle/app.<hash>.js` is a single IIFE in which each original source file became one
comma-joined expression. `tools/extract-source.mjs` split it back at those exact byte boundaries
(round-trip verified byte-for-byte), and every module was then proved AST-identical to the shipped
code by `tools/format-src.mjs`. **Order matters**: the build concatenates these files in filename
order, exactly like the original bundler did.

| # | file | module(s) on `t` | size | what it does |
|---|---|---|---|---|
| 0 | [001-tab-lock.js](./001-tab-lock.js) | `t.TabLock` | 633 B | Single-tab guard: a heartbeat in localStorage; a second tab that finds a live heartbeat stops the first from saving (prevents save corruption). |
| 1 | [002-clock.js](./002-clock.js) | `t.Clock` | 2.3 KB | Wall-clock that survives sleep/offline: HEAD requests the page itself to read the `Date` header, stores an offset in `pokecatch.clock`, exposes `now()`/`ready()`/`onForward()` so the idle engine can "catch up" after the tab was closed. |
| 2 | [003-pokedex.js](./003-pokedex.js) | `t.POKEDEX` | 257.1 KB | The species table: 493 entries with id, French name, key, types, base stats, capture rate, legendary/mythical flags, height/weight, learnset, evolution hints. |
| 3 | [004-evolutions.js](./004-evolutions.js) | `t.EVOLUTIONS` | 6.2 KB | Evolution graph: `{from, to, level?, item?, ...}` edges, including trade/link-cable and stone evolutions. |
| 4 | [005-moves.js](./005-moves.js) | `t.MOVES` | 35.8 KB | Move table: type, power, accuracy, PP, category, effect hooks, plus the move-power overrides the Balance pass applies. |
| 5 | [006-item-names.js](./006-item-names.js) | `t.ITEM_NAMES` | 895 B | Display names (French) for every item id. |
| 6 | [007-encounters-kanto.js](./007-encounters-kanto.js) | `t.ENCOUNTERS` | 14.0 KB | Wild-encounter tables for Kanto areas: per-zone species, level bands, weights, and the rod/surf/headbutt conditions. |
| 7 | [008-base-exp-kanto.js](./008-base-exp-kanto.js) | `t.BASE_EXP` | 1.0 KB | Base experience yield per species (Kanto dex range). |
| 8 | [009-encounters-johto-headbutt.js](./009-encounters-johto-headbutt.js) | `(internal helpers only)` | 36.8 KB | Extra Johto encounter rows merged into `t.ENCOUNTERS` (headbutt trees etc.). |
| 9 | [010-base-exp-johto.js](./010-base-exp-johto.js) | `(internal helpers only)` | 788 B | Base experience yield per species (Johto dex range). |
| 10 | [011-encounters-hoenn.js](./011-encounters-hoenn.js) | `(internal helpers only)` | 18.5 KB | Wild-encounter tables for Hoenn areas. |
| 11 | [012-base-exp-hoenn.js](./012-base-exp-hoenn.js) | `(internal helpers only)` | 1.0 KB | Base experience yield per species (Hoenn dex range). |
| 12 | [013-encounters-sinnoh.js](./013-encounters-sinnoh.js) | `(internal helpers only)` | 41.4 KB | Wild-encounter tables for Sinnoh areas. |
| 13 | [014-base-exp-sinnoh.js](./014-base-exp-sinnoh.js) | `(internal helpers only)` | 851 B | Base experience yield per species (Sinnoh dex range). |
| 14 | [015-unown.js](./015-unown.js) | `t.UNOWN` | 589 B | Unown letter/form selection helper. |
| 15 | [016-specials.js](./016-specials.js) | `t.SPECIALS` | 321 B | Special (non-wild) encounters: gifts, statics, roaming legendaries. |
| 16 | [017-forms.js](./017-forms.js) | `t.FORMS` | 4.0 KB | Alternate forms: base-id mapping, hatch form, egg species, form-specific overrides. |
| 17 | [018-config.js](./018-config.js) | `t.CONFIG` | 21.3 KB | All tunable game constants in one object: economy, shop, pension, casino, tower, underground, raids, story pacing, XP curve, save key, team size… The first place to tweak balance. |
| 18 | [019-item-names-2.js](./019-item-names-2.js) | `t.ITEM_NAMES` | 1.1 KB | Second pass of item names (items added later in development). |
| 19 | [020-types.js](./020-types.js) | `t.TYPES` | 648 B | Type list and per-type colour/label metadata. |
| 20 | [021-type-chart.js](./021-type-chart.js) | `t.TYPE_CHART` | 1.2 KB | Effectiveness matrix (2×, 1×, ½×, 0×) between the 18 types. |
| 21 | [022-i18n.js](./022-i18n.js) | `t.I18n` | 2.0 KB | Translation runtime: `e()`/`t()` lookup, `{name}` placeholder interpolation, language switching, `window.I18N_DATA` merge for the 7 non-French bundles. |
| 22 | [023-i18n-t.js](./023-i18n-t.js) | `t._t` | 13 B | Tiny alias: exports the translate function as `t._t`. |
| 23 | [024-daytime.js](./024-daytime.js) | `t.DAYTIME` | 2.0 KB | Day/night phase calculation from the clock, radio buttons of the CSS theme. |
| 24 | [025-weather.js](./025-weather.js) | `t.WEATHER` | 4.2 KB | Weather roll + modifiers, emits `weather` events for the FX layer. |
| 25 | [026-habitats.js](./026-habitats.js) | `t.HABITATS` | 32.9 KB | Habitat definitions: which species appear where, zone metadata, spawn weights. |
| 26 | [027-status.js](./027-status.js) | `t.STATUS` | 3.2 KB | Status conditions (poison, burn, sleep, paralysis…): application, tick, clear, badges. |
| 27 | [028-story.js](./028-story.js) | `t.STORY` | 87.4 KB | The whole campaign script: regions, chapters, steps (routes, gyms, eggs, bosses), rewards, unlock rules. 89 KB of data. |
| 28 | [029-scenes.js](./029-scenes.js) | `t.SCENES` | 55.6 KB | Background scenes: id → webp path, indoor flag, tint; `css()` helper builds the `background-image` for a screen. |
| 29 | [030-game.js](./030-game.js) | `t.Game` | 44.3 KB | The savegame core: state shape, load/save/migration, money, items, team, PC, dex registration, XP/level/evolution, shop pricing, trade rules, pension maths. Everything stateful goes through here. |
| 30 | [031-league-teams.js](./031-league-teams.js) | `t.LEAGUE_TEAMS` | 4.8 KB | Elite Four / Champion team compositions per region. |
| 31 | [032-adventure.js](./032-adventure.js) | `t.Adventure` | 73.7 KB | The idle engine: picks zones, rolls encounters, runs the auto-battle turn loop, captures, awards money/XP/items, advances chapters. Drives the Adventure screen. |
| 32 | [033-underground.js](./033-underground.js) | `t.Underground` | 19.6 KB | The Underground mode: floors, walls, gems, guards, loot tables, themes. |
| 33 | [034-events.js](./034-events.js) | `t.Events` | 11.6 KB | Time-limited legendary events: schedule, spawn, team hand-off. |
| 34 | [035-raid-swaps.js](./035-raid-swaps.js) | `t.RAID_SWAPS` | 57 B | Raid rotation table. |
| 35 | [036-raids.js](./036-raids.js) | `t.RAID_SWAPS, t.Raids` | 21.0 KB | Daily raid draws: region lanes, shiny charm logic, boss teams, rewards. |
| 36 | [037-worldboss.js](./037-worldboss.js) | `t.WorldBoss` | 7.3 KB | World boss events: boss HP pools, damage accounting, community contribution. |
| 37 | [038-tower.js](./038-tower.js) | `t.Tower` | 11.8 KB | Battle Tower: floors, streaks, BP shop, rewards. |
| 38 | [039-candy-run.js](./039-candy-run.js) | `t.CandyRun` | 6.6 KB | Candy Run minigame: board, rewards, odds. |
| 39 | [040-legend-zones.js](./040-legend-zones.js) | `t.LegendZones` | 21.0 KB | Legendary zones: which legendary can appear in which area/condition. |
| 40 | [041-roaming.js](./041-roaming.js) | `t.Roaming` | 2.0 KB | Roaming legendary movement across zones. |
| 41 | [042-sfx.js](./042-sfx.js) | `t.Sfx` | 62 B | Sound effects: WebAudio synthesis (no audio files), `unlock()` for the first user gesture, volume/mute from Options. |
| 42 | [043-music.js](./043-music.js) | `t.Music` | 66 B | Music: WebAudio sequencer/loop player. |
| 43 | [044-sprite-bounds.js](./044-sprite-bounds.js) | `t.SPRITE_BOUNDS` | 97.7 KB | Hit-box/trim data (x, y, w, h) per sprite file, used to crop transparent padding before drawing. |
| 44 | [045-ui-core.js](./045-ui-core.js) | `t.Screens, t.UI` | 79.4 KB | The screen router and shared UI toolkit: `t.Screens` registry, `t.App.show()`, DOM helpers `$`/`$$`/`h`, sprite boxes, bars, modals, toasts, number formatting, event delegation. |
| 45 | [046-perf.js](./046-perf.js) | `t.Game.S.reducedAnim, t.Perf` | 1.4 KB | Performance flags: reduced animation, low-end detection, pause when hidden. |
| 46 | [047-elite-frames.js](./047-elite-frames.js) | `t.EliteFrames` | 57.8 KB | Trainer-card frames unlocked by milestones (drop rates, unlock rules). |
| 47 | [048-frames.js](./048-frames.js) | `t.Frames` | 33.4 KB | Trainer-card frames registry + `open()`/`tile()`/`fresh()` helpers used by the card editor. |
| 48 | [049-badge-shine.js](./049-badge-shine.js) | `t.BadgeShine` | 11.0 KB | Badge shine/glint animation used by the Kanto badge case. |
| 49 | [050-battle-fx.js](./050-battle-fx.js) | `t.BattleFX, t.FX_MOVES` | 175.4 KB | The battle animation engine: move visuals, hit flashes, projectiles, status auras. Also exports `FX_MOVES` (which effect each move uses). |
| 50 | [051-capture-fx.js](./051-capture-fx.js) | `t.CaptureFX` | 26.5 KB | Poké Ball throw + wobble + catch animation. |
| 51 | [052-item-fx.js](./052-item-fx.js) | `t.BerryFX, t.ItemFX` | 15.6 KB | Item-use animation; berry eating animation. |
| 52 | [053-link-fx.js](./053-link-fx.js) | `t.LinkFx` | 41.4 KB | Trade/link cable animation. |
| 53 | [054-raid-draw.js](./054-raid-draw.js) | `t.RaidDraw` | 9.7 KB | Raid roulette draw animation. |
| 54 | [055-heal-fx.js](./055-heal-fx.js) | `t.HealFX` | 7.6 KB | Pokémon Center heal animation. |
| 55 | [056-shiny-glint.js](./056-shiny-glint.js) | `t.ShinyGlint` | 5.6 KB | Shiny sparkle overlay (shared canvas). |
| 56 | [057-gift-fx.js](./057-gift-fx.js) | `t.GiftFx` | 855 B | Gift/open animation for the Prof. Chen starter gift. |
| 57 | [058-geode-fx.js](./058-geode-fx.js) | `t.GeodeFx` | 12.7 KB | Geode cracking animation (Underground). |
| 58 | [059-rank-fx.js](./059-rank-fx.js) | `t.RankFx` | 10.9 KB | Rank-up animation. |
| 59 | [060-weather-fx.js](./060-weather-fx.js) | `t.WeatherFx` | 24.6 KB | Rain/snow/sand FX layer driven by the weather module. |
| 60 | [061-vgrid.js](./061-vgrid.js) | `t.VGrid, t.VGrid.stats` | 5.8 KB | Virtualised grid: renders long Pokémon lists (PC, dex) with windowing + scroll restore. |
| 61 | [062-event-ui.js](./062-event-ui.js) | `t.EventUI` | 5.3 KB | Legendary event screen UI (countdown, boss HP, contribution). |
| 62 | [063-event-team.js](./063-event-team.js) | `t.EventTeam` | 15.9 KB | Event team builder: picks the best 6 against the event boss. |
| 63 | [064-screen-adventure.js](./064-screen-adventure.js) | `t.Screens.adventure` | 142.4 KB | The Adventure screen: arena layout, team rail, battle log, speed buttons, zone list, bag panel, buff tips. The game’s main view. |
| 64 | [065-screen-map-event.js](./065-screen-map-event.js) | `t.Screens.event, t.Screens.map, t.TravelFx` | 53.4 KB | Progression (map) screen + the event card, region banners, gym badges, camera/travel FX. |
| 65 | [066-screen-raid.js](./066-screen-raid.js) | `t.Screens.raid` | 19.0 KB | Raids screen: daily lane, shiny charm, boss preview, battle launch. |
| 66 | [067-worldboss-view.js](./067-worldboss-view.js) | `t.WorldBossView` | 77.2 KB | World boss screen: HP bar, community damage, rewards. |
| 67 | [068-screen-tower.js](./068-screen-tower.js) | `t.Screens.tower` | 14.0 KB | Battle Tower screen: floor list, streak, BP shop. |
| 68 | [069-screen-candy.js](./069-screen-candy.js) | `t.Screens.candy` | 12.5 KB | Candy Run screen: board, spin, rewards. |
| 69 | [070-screen-underground.js](./070-screen-underground.js) | `t.Screens.underground` | 51.8 KB | Underground screen: gem bag, floor, walls, guards, loot popups. |
| 70 | [071-screen-achievements.js](./071-screen-achievements.js) | `t.Screens.achievements` | 6.0 KB | Achievements + trainer-card editor (avatars, frames, items, name). |
| 71 | [072-screen-team.js](./072-screen-team.js) | `t.Screens.team` | 26.0 KB | Team / PC screen: six slots, filters, sorting, search, evolution helper, move list. |
| 72 | [073-screen-pension.js](./073-screen-pension.js) | `t.Screens.pension` | 27.3 KB | Pokémon Pension: daycare slots, incubator, eggs, berries. |
| 73 | [074-pension-berry-fx.js](./074-pension-berry-fx.js) | `t.PensionBerryFX` | 5.7 KB | Berry feed animation in the pension. |
| 74 | [075-berry-bites.js](./075-berry-bites.js) | `t.BerryBites` | 728 B | Berry bite-count animation. |
| 75 | [076-screen-pokedex.js](./076-screen-pokedex.js) | `t.Screens.pokedex` | 24.5 KB | Pokédex screen: progress ring, per-region bars, caught/shiny status, search, filters. |
| 76 | [077-screen-shop.js](./077-screen-shop.js) | `t.Screens.shop` | 9.8 KB | Shop screen: categories, prices, stock gates by badge. |
| 77 | [078-screen-casino.js](./078-screen-casino.js) | `t.Screens.casino` | 65.5 KB | Casino: slot machines, coin case, ball prizes. |
| 78 | [079-screen-trade.js](./079-screen-trade.js) | `t.Screens.trade` | 42.4 KB | Trading screen: local link trades and online offers. |
| 79 | [080-screen-market.js](./080-screen-market.js) | `t.Screens.market` | 39.1 KB | Black Market: listings, tax, buy/sell flow. |
| 80 | [081-screen-friends.js](./081-screen-friends.js) | `t.Screens.friends` | 8.0 KB | Friends screen: friend codes, presence, friend-only offers. |
| 81 | [082-trainer-card.js](./082-trainer-card.js) | `t.TrainerCard` | 25.5 KB | Trainer card rendering: avatar, name, tag, badges, playtime, dex count. |
| 82 | [083-names.js](./083-names.js) | `t.Names` | 1.4 KB | Player-name validation (length, forbidden words, normalisation). |
| 83 | [084-cloud.js](./084-cloud.js) | `t.Cloud` | 31.0 KB | Supabase backend client: anonymous sign-in, save upload/download, leaderboards, gifts, friends, community counters, offline fallback. Talks to qglirc…supabase.co. |
| 84 | [085-gifts.js](./085-gifts.js) | `t.Gifts` | 6.0 KB | Gift inbox: fetch, validate, open, dedupe by gift id. |
| 85 | [086-screen-admin-loader.js](./086-screen-admin-loader.js) | `t.Screens.admin` | 749 B | Lazy loader for the admin screens (`js/screens/admin-*.js`). Empty by default (`window.ADMIN_FILES = []`), so the admin UI is not shipped. |
| 86 | [087-options.js](./087-options.js) | `t.Options` | 14.1 KB | Options modal: theme, language, sound, reduced motion, save management. |
| 87 | [088-changelog.js](./088-changelog.js) | `t.CHANGELOG` | 316.7 KB | The in-game changelog data: 300+ entries (French), used by the Changelogs screen and the "NEW" badge. |
| 88 | [089-changelog.js](./089-changelog.js) | `t.Changelog` | 1.7 KB | The in-game changelog data: 300+ entries (French), used by the Changelogs screen and the "NEW" badge. |
| 89 | [090-guide.js](./090-guide.js) | `t.Guide` | 19.4 KB | In-game guide: every feature explained, per-region tips. |
| 90 | [091-news.js](./091-news.js) | `t.News` | 7.1 KB | News bar: rotating tips + live community stats. |
| 91 | [092-title.js](./092-title.js) | `t.Title` | 16.3 KB | First-run flow: title screen, Prof. Chen narration, avatar pick, name entry, and the "Comment jouer" modal. |
| 92 | [093-update.js](./093-update.js) | `t.Update` | 2.5 KB | Build watcher: polls boot.js, notices a new BUILD, asks for a reload; keeps the idle tick safe while updating. |
| 93 | [094-sleep.js](./094-sleep.js) | `t.Sleep` | 4.8 KB | Idle/sleep handling: pauses animations and physics when the tab is hidden, resumes cleanly. |
| 94 | [095-app-boot.js](./095-app-boot.js) | `t.App, t.CatchUp` | 36.5 KB | The application bootstrap: wires the header, save button, clock stepping, visibility/offline catch-up, speed buttons, and starts `t.App`. Runs last. |
| – | [000-prelude.js](./000-prelude.js) | `t` (Proxy) | 10.5 KB | Opens the IIFE. Declares one `var` slot per module, binds `setTimeout`/`setInterval`/`rAF` to the real window, then creates `t`, the Proxy every module writes its exports to. Load first. |

## How the pieces fit together

```
boot.js                    (generated) sets <html>, theme, language, injects the shell, loads the bundles
  -> vendor-supabase.js    Supabase SDK (third party)
  -> app.<hash>.js         (generated from src/js/*.js, in order)
       000-prelude.js     creates t = Proxy(modules registry)
       001..029           data tables (dex, moves, story, scenes, config…)
       030-game.js        savegame core
       032-adventure.js   idle battle engine
       033..075           modes (underground, raids, tower…), FX, screen UIs
       076..094           remaining screens, cloud, title, update, sleep
       095-app-boot.js    wires everything and starts the app
```

## Adding a module

Create `src/js/096-my-feature.js` with `t.MyFeature = (function(){ … })();`, then use it from any
later file as `t.MyFeature`. Because files share one IIFE scope and run in order, a new file at the
end is always safe; a file that must run earlier needs its number (and therefore its place) moved.
