// build-story.mjs — gen 5-9 content pack, part 3: gyms, badges and league for the 5 new regions.
//
// Replaces the earlier exploration-only chapters with a full adventure structure per region:
//   8 gym chapters (routes + gym fight, one unique badge each) + 4 Elite Four chapters + champion.
// Also emits:
//   src/ext/js/028b-gen5to9-badges.js    BADGE_IMG_* maps + badgeSheet override (recoloured sheets)
//   src/ext/js/031b-gen5to9-league-teams.js  themed Elite Four teams
//   src/ext/js/094b-gen5to9-story.js     regions + 65 chapters with explicit wild species pools
//   src/ext/js/094c-gen5to9-shop.js      mega stones / primal orbs in the shop + league xp values
//   src/ext/data/gyms.json               manifest for the audit/docs
import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';

const gen59 = JSON.parse(readFileSync('src/ext/data/gen5to9.json', 'utf8'));
const forms = JSON.parse(readFileSync('src/ext/data/forms.json', 'utf8'));
const dex = new Map(gen59.entries.map(e => [e.id, e]));
mkdirSync('src/ext/data', { recursive: true });

// ---- type helpers ---------------------------------------------------------------------------
const TYPE_COLOR = {
  normal: '#a8a77a', fire: '#ee8130', water: '#6390f0', electric: '#f7d02c', grass: '#7ac74c',
  ice: '#96d9d6', fighting: '#c22e28', poison: '#a33ea1', ground: '#e2bf65', flying: '#a98ff3',
  psychic: '#f95587', bug: '#a6b91a', rock: '#b6a136', ghost: '#735797', dragon: '#6f35fc',
  dark: '#705746', steel: '#b7b7ce', fairy: '#d685ad',
};
const GYM_BG = { rock: 'gym-rock', water: 'gym-water', electric: 'gym-electric', grass: 'gym-grass', poison: 'gym-poison', psychic: 'gym-psychic', fire: 'gym-fire', ground: 'gym-ground' };
const BG_ALIASES = ['prairie', 'forest', 'cave', 'mountain', 'beach', 'pier', 'lake', 'sea', 'town'];
// every gym step uses an existing sprite key so GYM_CLASSES fits the gym trainers
const SPRITE_BY_TYPE = {
  rock: 'brock', water: 'misty', electric: 'ltsurge', grass: 'erika', poison: 'koga', psychic: 'sabrina',
  fire: 'blaine', ground: 'giovanni', flying: 'falkner', bug: 'bugsy', normal: 'whitney', fighting: 'brawly',
  ghost: 'morty', ice: 'pryce', dragon: 'clair', dark: 'koga', fairy: 'erika', steel: 'byron',
};

// ---- canonical leaders / elite four / champions (FR names used by the fan game) --------------
const REGIONS = [
  {
    key: 'unova', name: 'Unys', gen: 'V', color: '#8a8a8a', dex: [494, 649], mythical: 649, classes: 'hoenn',
    gyms: [
      ['Omar', 'grass', 'Trio', 'Forêt d\'Oraz', 'Route 1 d\'Unys'],
      ['Aloé', 'normal', 'Basique', 'Nacrene', 'Route 3 d\'Unys'],
      ['Artie', 'bug', 'Insecte', 'Volucité', 'Route 4 d\'Unys'],
      ['Inezia', 'electric', 'Volt', 'Méanville', 'Route 5 d\'Unys'],
      ['Bardane', 'ground', 'Sismique', 'Port Yonville', 'Route 6 d\'Unys'],
      ['Carolina', 'flying', 'Jet', 'Parsemille', 'Route 7 d\'Unys'],
      ['Zhu', 'ice', 'Glaçon', 'Flocombe', 'Route 8 d\'Unys'],
      ['Watson', 'dragon', 'Légende', 'Janusia', 'Route 9 d\'Unys'],
    ],
    elites: [['Shauntal', 'ghost'], ['Marshall', 'fighting'], ['Caitlin', 'psychic'], ['Grimsley', 'dark']],
    champion: ['Goyah', 'normal'],
    aces: [62, 64, 66, 68, 70, 72, 74, 76],
    leagueAces: [79, 81, 83, 85, 88],
  },
  {
    key: 'kalos', name: 'Kalos', gen: 'VI', color: '#3b6fe0', dex: [650, 721], mythical: 721, classes: 'hoenn',
    gyms: [
      ['Violette', 'bug', 'Insecte', 'Neuvartault', 'Route 1 de Kalos'],
      ['Grant', 'rock', 'Roche', 'Relifac-le-Haut', 'Route 2 de Kalos'],
      ['Cornélia', 'fighting', 'Poing', 'Yantreizh', 'Route 3 de Kalos'],
      ['Amaro', 'grass', 'Plante', 'Flusselles', 'Route 4 de Kalos'],
      ['Lem', 'electric', 'Tension', 'Illumis', 'Route 5 de Kalos'],
      ['Valériane', 'fairy', 'Fée', 'Romantica', 'Route 6 de Kalos'],
      ['Olympia', 'psychic', 'Psychisme', 'Flusselles', 'Route 7 de Kalos'],
      ['Urup', 'ice', 'Iceberg', 'Mozheim', 'Route 8 de Kalos'],
    ],
    elites: [['Malva', 'fire'], ['Siebold', 'water'], ['Wikstrom', 'steel'], ['Drasna', 'dragon']],
    champion: ['Dianthéa', 'fairy'],
    aces: [80, 82, 84, 86, 88, 90, 92, 94],
    leagueAces: [95, 96, 97, 98, 99],
  },
  {
    key: 'alola', name: 'Alola', gen: 'VII', color: '#ee8130', dex: [722, 809], mythical: 807, classes: 'sinnoh',
    gyms: [
      ['Ilima', 'normal', 'Verdant', 'Lili\'i', 'Route 1 d\'Alola'],
      ['Barbara', 'grass', 'Lush', 'Lush Jungle', 'Route 2 d\'Alola'],
      ['Kiawe', 'fire', 'Wela', 'Wela Volcano', 'Route 3 d\'Alola'],
      ['Néphie', 'water', 'Brooklet', 'Brooklet Hill', 'Route 4 d\'Alola'],
      ['Chrys', 'electric', 'Hokulani', 'Hokulani', 'Route 5 d\'Alola'],
      ['Margie', 'ghost', 'Thrifty', 'Thrifty Megamart', 'Route 6 d\'Alola'],
      ['Mina', 'fairy', 'Poni', 'Poni', 'Route 7 d\'Alola'],
      ['Hapu', 'ground', 'Vast', 'Vast Poni Canyon', 'Route 8 d\'Alola'],
    ],
    elites: [['Hala', 'fighting'], ['Olivia', 'rock'], ['Molayne', 'steel'], ['Kahili', 'flying']],
    champion: ['Kukui', 'normal'],
    aces: [95, 96, 97, 98, 99, 99, 100, 100],
    leagueAces: [100, 100, 100, 100, 100],
  },
  {
    key: 'galar', name: 'Galar', gen: 'VIII', color: '#a33ea1', dex: [810, 905], mythical: 893, classes: 'sinnoh',
    gyms: [
      ['Milo', 'grass', 'Herbe', 'Kickenham', 'Route 1 de Galar'],
      ['Donna', 'water', 'Eau', 'Motorby', 'Route 2 de Galar'],
      ['Kabu', 'fire', 'Feu', 'Aiguilles', 'Route 3 de Galar'],
      ['Faïza', 'fighting', 'Combat', 'Chavamure', 'Route 4 de Galar'],
      ['Opal', 'fairy', 'Fée', 'Aliville', 'Route 5 de Galar'],
      ['Chaz', 'rock', 'Roche', 'Chamboul', 'Route 6 de Galar'],
      ['Alistair', 'dark', 'Ténèbres', 'Pitrouille', 'Route 7 de Galar'],
      ['Raihan', 'dragon', 'Dragon', 'Kickenham', 'Route 8 de Galar'],
    ],
    elites: [['Nabil', 'dark'], ['Sally', 'fairy'], ['Roy', 'steel'], ['Duncan', 'dragon']],
    champion: ['Léon', 'fire'],
    aces: [96, 97, 98, 99, 100, 100, 100, 100],
    leagueAces: [100, 100, 100, 100, 100],
  },
  {
    key: 'paldea', name: 'Paldea', gen: 'IX', color: '#c22e28', dex: [906, 1025], mythical: 1025, classes: 'sinnoh',
    gyms: [
      ['Katy', 'bug', 'Insecte', 'Assimila', 'Route 1 de Paldea'],
      ['Brassius', 'grass', 'Plante', 'Artazon', 'Route 2 de Paldea'],
      ['Iono', 'electric', 'Volt', 'Levincia', 'Route 3 de Paldea'],
      ['Kofu', 'water', 'Eau', 'Cascarrafa', 'Route 4 de Paldea'],
      ['Larry', 'normal', 'Normal', 'Medali', 'Route 5 de Paldea'],
      ['Ryme', 'ghost', 'Spectre', 'Monténégro', 'Route 6 de Paldea'],
      ['Tulip', 'psychic', 'Psy', 'Faisandelle', 'Route 7 de Paldea'],
      ['Grusha', 'ice', 'Glace', 'Zapapico', 'Route 8 de Paldea'],
    ],
    elites: [['Rika', 'ground'], ['Poppy', 'steel'], ['Larry', 'normal'], ['Hassel', 'dragon']],
    champion: ['Alisma', 'ground'],
    aces: [97, 98, 99, 100, 100, 100, 100, 100],
    leagueAces: [100, 100, 100, 100, 100],
  },
];

// ---- team generation ------------------------------------------------------------------------
const bst = e => Object.values(e.stats).reduce((a, b) => a + b, 0);
function pickTeam(regionDex, type, count, level) {
  const own = regionDex.filter(e => e.types.includes(type)).sort((a, b) => bst(b) - bst(a));
  const near = regionDex.filter(e => e.types.some(t => t === type) || e.types.includes('normal')).filter(e => !own.includes(e));
  const pool = [...own, ...near];
  const out = [];
  for (const e of pool) { if (out.length >= count) break; if (e.legendary || e.mythical) continue; out.push(e); }
  // always full team: fill with the strongest remaining region species
  if (out.length < count) for (const e of [...regionDex].sort((a, b) => bst(b) - bst(a))) { if (out.length >= count) break; if (!out.includes(e) && !e.legendary && !e.mythical) out.push(e); }
  return out.map((e, i) => [e.id, Math.max(2, level - (out.length - 1 - i))]);
}

const chapters = [];
const gymManifest = [];
for (const reg of REGIONS) {
  const regionDex = gen59.entries.filter(e => e.id >= reg.dex[0] && e.id <= reg.dex[1]);
  const legends = regionDex.filter(e => e.legendary || e.mythical);
  const normal = regionDex.filter(e => !e.legendary && !e.mythical);
  const regionalWild = forms.wild?.[reg.key] || [];
  const routeSteps = reg.gyms.length * 2;
  const buckets = Array.from({ length: routeSteps }, () => []);
  normal.forEach((e, i) => buckets[Math.floor((i / normal.length) * routeSteps)].push(e.id));
  legends.forEach((e, i) => buckets[buckets.length - 1 - (i % 2)].push(e.id));
  if (regionalWild.length) buckets[0].push(...regionalWild);
  const gymManifestReg = { key: reg.key, name: reg.name, badges: [], gyms: [] };
  reg.gyms.forEach(([leader, type, badgeShort, city, routeName], gi) => {
    const ace = reg.aces[gi];
    const badge = `${badgeShort} (${reg.name})`;
    const sprite = SPRITE_BY_TYPE[type] || 'acetrainer';
    const bg = GYM_BG[type] || 'town';
    const teamSize = gi < 3 ? 3 : gi < 6 ? 4 : 5;
    const s1 = buckets[gi * 2] || [];
    const s2 = buckets[gi * 2 + 1] || [];
    const lo = Math.max(2, ace - 8);
    chapters.push({
      name: `${badgeShort} · ${city}`,
      reg: reg.key,
      region: `${city} → ${routeName}`,
      ace,
      capMargin: Math.min(3, Math.max(0, 100 - ace)),
      steps: [
        {
          kind: 'route', name: `${routeName} · 1`, bg: BG_ALIASES[gi % BG_ALIASES.length],
          lv: [lo, ace - 4], wild: 4, trainers: gi < 2 ? 1 : 2, item: gi % 2 === 0,
          species: s1.length ? s1 : [normal[gi % normal.length].id],
        },
        { kind: 'heal', name: city, bg: 'pokecenter' },
        {
          kind: 'route', name: `${routeName} · 2`, bg: BG_ALIASES[(gi + 2) % BG_ALIASES.length],
          lv: [lo + 2, ace - 1], wild: 3, trainers: gi < 2 ? 2 : 3,
          species: s2.length ? s2 : [normal[(gi + 3) % normal.length].id],
        },
        {
          kind: 'gym', name: `Arène de ${city}`, bg, fallback: type === 'water' ? 'sea' : 'mountain',
          leader, sprite, type, badge, color: TYPE_COLOR[type] || '#6b5bd6',
          reward: Math.round(ace * 70), power: 0.3 + gi * 0.06, ace,
          team: pickTeam(regionDex, type, teamSize, ace),
        },
      ],
    });
    gymManifestReg.gyms.push({ leader, type, badge, city, sprite, team: pickTeam(regionDex, type, teamSize, ace) });
    gymManifestReg.badges.push(badge);
  });
  // Elite Four + champion
  const leagueTeams = {};
  reg.elites.forEach(([name, type], ei) => {
    const ace = reg.leagueAces[ei];
    const sprite = SPRITE_BY_TYPE[type] || 'acetrainer';
    chapters.push({
      name: `Conseil 4 : ${name}`, reg: reg.key, region: `Ligue de ${reg.name}`, ace, capMargin: Math.min(2, Math.max(0, 100 - ace)), league: true,
      steps: [
        { kind: 'heal', name: `Ligue de ${reg.name}`, bg: 'town' },
        { kind: 'route', name: 'Salle du Conseil', bg: 'gym-psychic', fallback: 'town', wild: 0, trainers: 4 },
        {
          kind: 'gym', name: 'Salle 4', bg: GYM_BG[type] || 'gym-psychic', fallback: 'town',
          leader: name, sprite, type, badge: null, color: TYPE_COLOR[type] || '#6b5bd6',
          reward: Math.round(ace * 90), power: 1.1 + ei * 0.12, ace,
          team: pickTeam(regionDex, type, 5, ace),
        },
      ],
    });
    leagueTeams[`${reg.key}:${name}`] = [
      { sprite: 'acetrainer', name: 'Dresseur Élite', team: pickTeam(regionDex, type, 2, ace - 2).map(x => x[0]) },
      { sprite: 'beauty', name: 'Dresseuse Élite', team: pickTeam(regionDex, type, 2, ace - 2).map(x => x[0]) },
      { sprite: 'blackbelt', name: 'Combattant Élite', team: pickTeam(regionDex, type, 3, ace - 2).map(x => x[0]) },
      { sprite: 'psychic', name: 'Medium Élite', team: pickTeam(regionDex, type, 3, ace - 2).map(x => x[0]) },
    ];
  });
  const [champName, champType] = reg.champion;
  const champAce = reg.leagueAces[4];
  chapters.push({
    name: 'Maître de la Ligue', reg: reg.key, region: `Ligue de ${reg.name}`, ace: champAce, capMargin: Math.min(4, Math.max(0, 100 - champAce)), league: true,
    steps: [
      { kind: 'heal', name: `Ligue de ${reg.name}`, bg: 'town' },
      { kind: 'route', name: 'Salle du Maître', bg: 'gym-psychic', fallback: 'town', wild: 0, trainers: 4 },
      {
        kind: 'gym', name: 'Salle 4', bg: GYM_BG[champType] || 'gym-psychic', fallback: 'town',
        leader: champName, target: 0.5, sprite: SPRITE_BY_TYPE[champType] || 'acetrainer', type: champType,
        badge: 'Maître', champion: true, color: TYPE_COLOR[champType] || '#ffcb05',
        reward: Math.round(champAce * 140), power: 1.7, ace: champAce,
        team: pickTeam(regionDex, champType, 6, champAce),
      },
    ],
  });
  gymManifestReg.league = { elites: reg.elites, champion: reg.champion, aces: reg.leagueAces };
  gymManifest.push(gymManifestReg);
}

// badge maps: badge name -> cell index 1..8 (unique names because they are suffixed with the region)
const badgeMaps = {};
const badgeSheets = {};
for (const reg of REGIONS) {
  const map = {};
  reg.gyms.forEach(([, , badgeShort], i) => { map[`${badgeShort} (${reg.name})`] = i + 1; });
  badgeMaps[reg.key] = map;
  badgeSheets[reg.key] = `assets/badges/${reg.key}-sheet.png`;
}
for (const list of Object.values(badgeMaps)) if (Object.keys(list).length !== 8) throw new Error('badge map must have 8 entries');

const regionOut = REGIONS.map(reg => ({
  key: reg.key, name: reg.name, gen: reg.gen, color: reg.color, open: true,
  dex: reg.dex, offset: 0, ace: [reg.aces[0], 0], economy: 1, classes: reg.classes,
  mythical: { id: reg.mythical, level: 70 },
}));

// ---- write modules --------------------------------------------------------------------------
const banner = (title, note) => `/**\n * ${title} — authored extension (gen 5–9 content pack).\n *\n * ${note}\n * Recovered source files (src/js/**) are untouched; the build concatenates src/js and src/ext/js\n * in filename order.\n */\n`;
writeFileSync('src/ext/js/094b-gen5to9-story.js', banner('gen 5-9 regions, gyms & league',
  'Fills the five placeholder regions, appends 8 gym chapters + Elite Four + champion per region.\n * Every wild species is placed in an explicit route pool, so all 532 new species are obtainable.') +
`(function () {
  const regions = ${JSON.stringify(regionOut, null, 1)};
  const chapters = ${JSON.stringify(chapters, null, 1)};
  const badgeMaps = ${JSON.stringify(badgeMaps, null, 1)};
  const badgeSheets = ${JSON.stringify(badgeSheets, null, 1)};
  for (const def of regions) {
    const slot = t.STORY.REGIONS.find(r => r.name === def.name);
    if (slot) Object.assign(slot, def);
    else t.STORY.REGIONS.push(def);
  }
  t.STORY.CHAPTERS.push(...chapters);
  Object.assign(t.STORY, { GEN5TO9_BADGES: badgeMaps, GEN5TO9_BADGE_SHEETS: badgeSheets });
  const prevSheet = t.STORY.badgeSheet.bind(t.STORY);
  t.STORY.badgeSheet = function (badge) {
    for (const key of ['unova', 'kalos', 'alola', 'galar', 'paldea']) {
      const idx = this.GEN5TO9_BADGES?.[key]?.[badge];
      if (idx) return { src: this.GEN5TO9_BADGE_SHEETS[key], n: idx };
    }
    return prevSheet(badge);
  };
  Object.assign(t.CONFIG.REGION_XP, { unova: 1.45, kalos: 1.5, alola: 1.55, galar: 1.6, paldea: 1.65 });
  Object.assign(t.CONFIG.LEAGUE_TRAINERS.xp, { unova: 1.9, kalos: 1.95, alola: 2, galar: 2.05, paldea: 2.1 });
})();
`);
writeFileSync('src/ext/js/031b-gen5to9-league-teams.js', banner('gen 5-9 league teams', 'Themed Elite Four trainer line-ups for the new regions.') +
`(function () {
  const teams = ${JSON.stringify(Object.fromEntries(Object.entries(gymManifest).flatMap(([, reg]) => [])))};
  Object.assign(t.LEAGUE_TEAMS, ${JSON.stringify((() => {
  const all = {};
  for (const reg of REGIONS) {
    reg.elites.forEach(([name, type], ei) => {
      const ace = reg.leagueAces[ei];
      const regionDex = gen59.entries.filter(e => e.id >= reg.dex[0] && e.id <= reg.dex[1]);
      all[`${reg.key}:${name}`] = [
        { sprite: 'acetrainer', name: 'Dresseur Élite', team: pickTeam(regionDex, type, 2, ace - 2).map(x => x[0]) },
        { sprite: 'beauty', name: 'Dresseuse Élite', team: pickTeam(regionDex, type, 2, ace - 2).map(x => x[0]) },
        { sprite: 'blackbelt', name: 'Combattant Élite', team: pickTeam(regionDex, type, 3, ace - 2).map(x => x[0]) },
        { sprite: 'psychic', name: 'Medium Élite', team: pickTeam(regionDex, type, 3, ace - 2).map(x => x[0]) },
      ];
    });
  }
  return all;
})(), null, 1)});
})();
`);
// shop: mega stones + primal orbs
const shopItems = Object.values(forms.items).map(it => ({
  id: it.id,
  kind: 'item',
  price: it.kind === 'primal' ? 400000 : 250000,
  badges: 8,
  desc: it.kind === 'primal' ? 'Réveille la forme primitive d\'un Pokémon légendaire.' : 'Déclenche la Méga-Évolution d\'un Pokémon.',
}));
writeFileSync('src/ext/js/094c-gen5to9-shop.js', banner('gen 5-9 shop items', 'Mega stones / primal orbs are sold in the shop evolution tab (require 8 badges).') +
`(function () {\n  const items = ${JSON.stringify(shopItems, null, 1)};\n  const known = new Set(t.CONFIG.SHOP.map(x => x.id));\n  for (const it of items) if (!known.has(it.id)) t.CONFIG.SHOP.push(it);\n})();\n`);

writeFileSync('src/ext/data/gyms.json', JSON.stringify({
  generatedAt: new Date().toISOString(),
  regions: gymManifest,
  chapters: chapters.length,
  gymChapters: chapters.filter(c => c.steps.some(s => s.kind === 'gym' && s.badge && !s.champion)).length,
  leagueChapters: chapters.filter(c => c.league).length,
  badges: Object.values(badgeMaps).flat(),
}, null, 1));

// keep the dex manifest in sync with the final story structure
const mf = JSON.parse(readFileSync('src/ext/data/gen5to9.json', 'utf8'));
mf.chapters = chapters.length;
mf.gymChapters = chapters.filter(c => c.steps.some(s => s.kind === 'gym' && s.badge && !s.champion)).length;
mf.leagueChapters = chapters.filter(c => c.league).length;
mf.regions = regionOut.map(r => ({ key: r.key, name: r.name, dex: r.dex }));
writeFileSync('src/ext/data/gen5to9.json', JSON.stringify(mf, null, 1));
console.log('chapters:', chapters.length, '| gyms:', gymManifest.reduce((a, r) => a + r.gyms.length, 0), '| regimes:', REGIONS.length);
