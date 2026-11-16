# Game data — where to change what

All balance/content data lives in plain objects spread over the data modules. These are the ones
you will touch most often:

| What | File | Notes |
|---|---|---|
| Species (493) | [003-pokedex.js](./003-pokedex.js) | name, key, types, base stats, capture rate, learnset, height/weight |
| Evolutions | [004-evolutions.js](./004-evolutions.js) | level / stone / link-cable edges |
| Moves | [005-moves.js](./005-moves.js) | type, power, accuracy, category, FX key |
| Wild encounters | [007](./007-encounters-kanto.js), [009](./009-encounters-johto-headbutt.js), [011](./011-encounters-hoenn.js), [013](./013-encounters-sinnoh.js) | per-zone species/level/weight |
| Base EXP | [008](./008-base-exp-kanto.js), [010](./010-base-exp-johto.js), [012](./012-base-exp-hoenn.js), [014](./014-base-exp-sinnoh.js) | per-species yield |
| Types / chart | [020](./020-types.js), [021](./021-type-chart.js) | effectiveness matrix |
| Balance constants | [018-config.js](./018-config.js) | economy, shop, pension, casino, tower, underground, raids, XP curve, save key |
| Story / campaign | [028-story.js](./028-story.js) | regions → chapters → steps |
| Scenes (backgrounds) | [029-scenes.js](./029-scenes.js) | scene id → `assets/bg/scenes/*.webp` |
| Habitats | [026-habitats.js](./026-habitats.js) | zone metadata, spawn tables |
| Elites | [031-league-teams.js](./031-league-teams.js) | Elite Four / Champion teams |
| Changelog | [088-changelog.js](./088-changelog.js) | in-game changelog entries |
| Sprite bounds | [044-sprite-bounds.js](./044-sprite-bounds.js) | trim boxes per image |

Run `npm run data:export` to dump these tables to `data/*.json` for inspection or diffing.
