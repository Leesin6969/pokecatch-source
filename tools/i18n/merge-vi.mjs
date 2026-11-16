// merge-vi.mjs — merge the hand/model-translated chunks into src/lang/vi.js.
// Inputs:
//   .cache/i18n/out/ui-1..10.json   { "<fr key>": "<vi>" }
//   .cache/i18n/out/dex-1..10.json  [ { id, genus, flavor } ]
//   src/lang/en.js (names + move/item names), PokéAPI raw caches (new species/moves/items)
// Custom gen 5-9 content strings get hand-written Vietnamese on top (regions, badges, chapters...).
import { existsSync, readFileSync, readdirSync, writeFileSync } from 'node:fs';
import vm from 'node:vm';

const OUT = '.cache/i18n/out';
const readJson = p => JSON.parse(readFileSync(p, 'utf8'));

// ---- machine/model translations from chunks -------------------------------------------------
const ui = {};
let missingUiFiles = [];
for (let i = 1; i <= 10; i++) {
  const p = `${OUT}/ui-${i}.json`;
  if (!existsSync(p)) { missingUiFiles.push(p); continue; }
  Object.assign(ui, readJson(p));
}
const dex = {};
for (let i = 1; i <= 10; i++) {
  const p = `${OUT}/dex-${i}.json`;
  if (!existsSync(p)) { missingUiFiles.push(p); continue; }
  for (const row of readJson(p)) dex[row.id] = row;
}
if (missingUiFiles.length) console.warn('missing chunk files:', missingUiFiles);

// ---- English reference data -----------------------------------------------------------------
const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(readFileSync('src/lang/en.js', 'utf8'), ctx);
const enData = ctx.window.I18N_DATA.en;

const pokemon = {};
for (const id of Object.keys(enData.pokemon)) {
  const [name, genus, flavor] = enData.pokemon[id];
  const d = dex[+id];
  pokemon[id] = [name, d?.genus || genus, d?.flavor || flavor];
}
const newNames = {};
for (let id = 494; id <= 1025; id++) {
  const p = `.cache/gens/raw/species-${id}.json`;
  if (!existsSync(p)) continue;
  const sp = readJson(p);
  const name = sp.names?.find(n => n.language.name === 'en')?.name || `#${id}`;
  const d = dex[id];
  const flavors = sp.flavor_text_entries?.filter(f => f.language.name === 'en' && f.flavor_text.trim()) || [];
  const fallbackFlavor = flavors.length ? flavors[flavors.length - 1].flavor_text.replace(/[\n\f\r]+/g, ' ').replace(/\s+/g, ' ').trim() : '';
  pokemon[id] = [name, d?.genus || '', d?.flavor || fallbackFlavor];
}
const moves = { ...enData.moves };
for (const f of readdirSync('.cache/gens/raw')) {
  if (!f.startsWith('move-')) continue;
  const mv = readJson('.cache/gens/raw/' + f);
  const en = mv.names?.find(n => n.language.name === 'en')?.name;
  if (en) moves[mv.name] = en;
}
const items = { ...enData.items };
for (const f of readdirSync('.cache/gens2/raw')) {
  if (!f.startsWith('item-')) continue;
  const it = readJson('.cache/gens2/raw/' + f);
  const en = it.names?.find(n => n.language.name === 'en')?.name;
  if (en) items[it.name] = en;
}

// ---- curated UI strings ---------------------------------------------------------------------
const OVERRIDES = {
  'Aventure': 'Phiêu lưu', 'Progression': 'Tiến trình', 'Équipe/PC': 'Đội/PC', 'Pokédex': 'Pokédex',
  'Activités': 'Hoạt động', 'Social': 'Xã hội', 'Boutique': 'Cửa hàng', 'Succès': 'Thành tựu',
  'Sauvegarder': 'Lưu', 'Guide': 'Hướng dẫn', 'Paramètres': 'Cài đặt', 'Comment jouer': 'Cách chơi',
  'Nouvelle partie': 'Chơi mới', 'Continuer': 'Tiếp tục', 'Changelogs': 'Nhật ký thay đổi',
  'Prendre': 'Nhận', 'Fermer': 'Đóng', 'Retour': 'Quay lại', 'Plus tard': 'Để sau',
  'Acheter': 'Mua', 'Vendre': 'Bán', 'Max': 'Tối đa', 'Tout': 'Tất cả',
  'Capturés': 'Đã bắt', 'Vus': 'Đã thấy', 'Niveau': 'Cấp', 'Badges': 'Huy hiệu',
  'Équipe': 'Đội', 'Objets': 'Vật phẩm', 'Sac': 'Túi', 'Combat': 'Trận đấu', 'Combats': 'Trận đấu',
  'Victoires': 'Thắng', 'Défaites': 'Thua', 'Argent': 'Tiền', 'Pièces': 'Xu', 'Exp.': 'EXP',
  'Statut': 'Trạng thái', 'Types': 'Hệ', 'Régions': 'Vùng', 'Région': 'Vùng',
  'Chapitre': 'Chương', 'Chapitres': 'Chương', 'Arènes': 'Đấu trường', 'Ligue': 'Liên đoàn',
  'Informations': 'Thông tin', 'Consommables': 'Vật phẩm dùng', 'À trouver ici': 'Tìm thấy ở đây',
  'Pokémon trouvables': 'Pokémon có thể gặp', 'Objets trouvables': 'Vật phẩm có thể tìm',
  'Aucune baie pour le moment.': 'Chưa có quả nào.', 'Jour': 'Ngày', 'MAINTENANT': 'BÂY GIỜ',
  'En cours': 'Đang diễn ra', 'En route !': 'Lên đường!', 'Carte': 'Bản đồ',
  'Équipe actuelle': 'Đội hiện tại', 'Équipe de secours': 'Đội dự bị',
  'Starter': 'Pokémon khởi đầu', 'Numéro': 'Số', 'Taille': 'Chiều cao', 'Poids': 'Cân nặng',
  'Capturé': 'Đã bắt', 'Première capture': 'Lần bắt đầu tiên', 'Chromatiques': 'Dạng sáng',
  'Régions complètes': 'Vùng hoàn thành', 'DERNIÈRES CAPTURES': 'LẦN BẮT GẦN NHẤT',
  'Dresseur': 'Huấn luyện viên', 'Nom': 'Tên', 'Niveau conseillé': 'Cấp khuyến nghị',
  'Récompense': 'Thưởng', 'Puissance': 'Sức mạnh', 'Objet tenu': 'Vật phẩm giữ',
  'Temps': 'Thời gian', 'Heure': 'Giờ', 'Météo': 'Thời tiết', 'Pluie': 'Mưa',
  'Badge {badge}': 'Huy hiệu {badge}',
  'Tu as obtenu le <b>Badge {badge}</b> face à {leader}': 'Bạn đã nhận <b>Huy hiệu {badge}</b> từ {leader}',
};
Object.assign(ui, OVERRIDES);

// ---- custom gen 5-9 content ------------------------------------------------------------------
const REGION_VI = { Unys: 'Unova', Kalos: 'Kalos', Alola: 'Alola', Galar: 'Galar', Paldea: 'Paldea' };
const regionVi = n => (n in REGION_VI ? REGION_VI[n] : n);
const BADGE_VI = {
  Trio: 'Trio', Basique: 'Cơ bản', Insecte: 'Côn trùng', Volt: 'Điện', Sismique: 'Địa chấn', Jet: 'Phản lực',
  'Glaçon': 'Băng', 'Légende': 'Huyền thoại', Roche: 'Đá', Poing: 'Nắm đấm', Plante: 'Cỏ',
  Tension: 'Điện áp', 'Fée': 'Tiên', Psychisme: 'Tâm linh', Iceberg: 'Băng sơn',
  Verdant: 'Verdant', Lush: 'Lush', Wela: 'Wela', Brooklet: 'Brooklet', Hokulani: 'Hokulani',
  Thrifty: 'Thrifty', Poni: 'Poni', Vast: 'Vast', Herbe: 'Cỏ', Eau: 'Nước', Feu: 'Lửa',
  Combat: 'Chiến đấu', 'Ténèbres': 'Bóng tối', Dragon: 'Rồng', Normal: 'Thường',
  Spectre: 'Ma', Psy: 'Tâm linh', Glace: 'Băng',
};
const badgeVi = s => { const m = /^(.+) \(([^)]+)\)$/.exec(s); return m ? `${BADGE_VI[m[1]] || m[1]} (${regionVi(m[2])})` : (BADGE_VI[s] || s); };
const custom = {
  'Méga-Évolution': 'Mega Tiến hóa', 'Méga-Évolution X': 'Mega Tiến hóa X', 'Méga-Évolution Y': 'Mega Tiến hóa Y',
  'Forme Primitive': 'Dạng Nguyên thủy', "Forme d'Alola": 'Dạng Alola', 'Forme de Galar': 'Dạng Galar',
  'Forme de Hisui': 'Dạng Hisui', 'Forme de Paldea': 'Dạng Paldea',
  'Forme de Paldea (Race Combat)': 'Dạng Paldea (Chiến đấu)',
  'Forme de Paldea (Race Flamme)': 'Dạng Paldea (Lửa)',
  'Forme de Paldea (Race Aquatique)': 'Dạng Paldea (Nước)',
  'Déclenche la Méga-Évolution d\'un Pokémon.': 'Kích hoạt Mega Tiến hóa cho một Pokémon.',
  'Réveille la forme primitive d\'un Pokémon légendaire.': 'Đánh thức dạng nguyên thủy của Pokémon huyền thoại.',
};
for (const [fr, vi] of Object.entries(REGION_VI)) custom[fr] = vi;
try {
  const gyms = readJson('src/ext/data/gyms.json');
  for (const b of gyms.badges) { custom[b] = badgeVi(b); custom[`Badge ${b}`] = `Huy hiệu ${badgeVi(b)}`; }
} catch {}
try {
  const src = readFileSync('src/ext/js/094b-gen5to9-story.js', 'utf8');
  const cs = src.indexOf('const chapters = [') + 'const chapters = '.length;
  const ce = src.indexOf('];', cs);
  const chapters = JSON.parse(src.slice(cs, ce + 1));
  for (const ch of chapters) {
    const nm = ch.name;
    const m = /^(.+) · (.*)$/.exec(nm);
    if (m) custom[nm] = `${badgeVi(m[1])} · ${m[2]}`;
    if (!custom[nm]) custom[nm] = nm.replace(/^Conseil 4 : /, 'Tứ Thiên Vương: ').replace(/^Maître de la Ligue$/, 'Nhà Vô địch Liên đoàn');
    if (ch.region) custom[ch.region] = ch.region.replace(/^Ligue de (.+)$/, (_, r) => `Liên đoàn ${regionVi(r)}`).replace(/\bLigue de ([A-Za-zÀ-ÿ]+)/g, (_, r) => `Liên đoàn ${regionVi(r)}`);
    for (const st of ch.steps || []) {
      const sn = st.name;
      if (!sn) continue;
      if (/^Route \d+ /.test(sn)) custom[sn] = sn.replace(/^Route (\d+) (?:d'|de )?(.+)$/, (_, n, r) => `Tuyến ${n} ${regionVi(r)}`);
      else if (/^Arène de /.test(sn)) custom[sn] = sn.replace(/^Arène de (.+)$/, 'Đấu trường $1');
      else if (sn === 'Salle 4') custom[sn] = 'Phòng 4';
      else if (sn === 'Salle du Conseil') custom[sn] = 'Phòng Hội đồng';
      else if (sn === 'Salle du Maître') custom[sn] = 'Phòng Nhà vô địch';
      else if (sn === 'Centre Pokémon') custom[sn] = 'Trung tâm Pokémon';
      else if (sn === 'Village') custom[sn] = 'Làng';
      else if (sn === 'Camp de base') custom[sn] = 'Căn cứ';
      else if (sn.startsWith('Ligue de ')) custom[sn] = `Liên đoàn ${regionVi(sn.slice(9))}`;
    }
  }
} catch {}
Object.assign(ui, custom);

// ---- write vi.js ----------------------------------------------------------------------------
const file = `(((window.I18N_DATA = window.I18N_DATA || {}).vi = ${JSON.stringify({ pokemon, moves, items }, null, 1)}),\n  ((window.I18N = window.I18N || {}).vi = ${JSON.stringify(ui, null, 1)}));\n`;
writeFileSync('src/lang/vi.js', file);
const enKeys = Object.keys(ctx.window.I18N.en).filter(k => ctx.window.I18N.en[k] !== k);
const covered = enKeys.filter(k => ui[k] != null).length;
console.log('pokemon:', Object.keys(pokemon).length, '| moves:', Object.keys(moves).length, '| items:', Object.keys(items).length);
console.log('ui:', Object.keys(ui).length, '/ en keys', enKeys.length, '| covered', covered, '(' + ((100 * covered) / enKeys.length).toFixed(1) + '%)');
console.log('dex chunks merged:', Object.keys(dex).length, '/ 1025');
console.log('vi.js bytes:', readFileSync('src/lang/vi.js').length);
