// prepare-jobs.mjs — split the Vietnamese translation work into chunks for parallel translators.
// Output: .cache/i18n/jobs/ui-N.json  (French key + English source) and dex-N.json (Pokémon genus/flavour)
import { existsSync, mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import vm from 'node:vm';

const OUT = '.cache/i18n/jobs';
mkdirSync(OUT, { recursive: true });

const ctx = { window: {} };
vm.createContext(ctx);
vm.runInContext(readFileSync('src/lang/en.js', 'utf8'), ctx);
const enData = ctx.window.I18N_DATA.en;
const enUi = ctx.window.I18N.en;

// ---- UI chunks -------------------------------------------------------------------------------
const ui = Object.entries(enUi)
  .filter(([k, v]) => v && v !== k)
  .map(([k, en]) => ({ k, en }));
const UI_CHUNKS = 10;
const perUi = Math.ceil(ui.length / UI_CHUNKS);
for (let i = 0; i < UI_CHUNKS; i++) {
  const slice = ui.slice(i * perUi, (i + 1) * perUi);
  writeFileSync(`${OUT}/ui-${i + 1}.json`, JSON.stringify(slice, null, 1));
}
console.log('ui entries:', ui.length, '→ chunks:', UI_CHUNKS, '×', perUi);

// ---- dex chunks (genus + flavour) ------------------------------------------------------------
const dex = [];
for (const id of Object.keys(enData.pokemon)) {
  const [name, genus, flavor] = enData.pokemon[id];
  dex.push({ id: +id, name, genus: genus || '', flavor: flavor || '' });
}
const newIds = [];
for (let id = 494; id <= 1025; id++) newIds.push(id);
for (const id of newIds) {
  const p = `.cache/gens/raw/species-${id}.json`;
  if (!existsSync(p)) continue;
  const sp = JSON.parse(readFileSync(p, 'utf8'));
  const name = sp.names?.find(n => n.language.name === 'en')?.name || `#${id}`;
  const genus = sp.genera?.find(g => g.language.name === 'en')?.genus || '';
  const flavors = sp.flavor_text_entries?.filter(f => f.language.name === 'en' && f.flavor_text.trim()) || [];
  const flavor = flavors.length ? flavors[flavors.length - 1].flavor_text.replace(/[\n\f\r]+/g, ' ').replace(/\s+/g, ' ').trim() : '';
  dex.push({ id, name, genus, flavor });
}
const DEX_CHUNKS = 10;
const perDex = Math.ceil(dex.length / DEX_CHUNKS);
for (let i = 0; i < DEX_CHUNKS; i++) {
  const slice = dex.slice(i * perDex, (i + 1) * perDex);
  writeFileSync(`${OUT}/dex-${i + 1}.json`, JSON.stringify(slice, null, 1));
}
console.log('dex entries:', dex.length, '→ chunks:', DEX_CHUNKS, '×', perDex);

writeFileSync(`${OUT}/_glossary.md`, `# Glossary & style — Bản dịch tiếng Việt cho Poke'Catch

## Giọng văn
- Tiếng Việt tự nhiên như game mobile Việt Nam; câu ngắn, rõ, thân thiện, xưng "bạn".
- Không dịch sát từng chữ; viết lại cho xuôi tai. Tránh từ Hán-Việt nặng (tiến hành, thực hiện, bấy giờ, toan, hòng).
- Giữ đúng độ dài tương đối (UI có giới hạn chỗ): ưu tiên ngắn gọn.
- Không thêm/bớt ý, không chú thích, không giải thích trong output.

## Bắt buộc giữ nguyên (nguyên văn)
- Mọi placeholder dạng {name}, {n}, {mon}, {region}, {/.../...} (cú pháp Hàn) — giữ đúng từng ký tự.
- Mọi thẻ HTML: <b>, </b>, <i>, <small>, <br>...
- Số, %, ×, ₽, ký hiệu, emoji, dấu xuống dòng.
- Tên riêng: tên Pokémon, tên người, địa danh, tên move/item (giữ tiếng Anh/Pháp gốc), tên tổ chức.
- Tên ngôn ngữ (Français, English, 日本語...) giữ nguyên.
- Mã/hotkey, URL, email.

## Thuật ngữ chuẩn (dùng nhất quán)
Aventure = Phiêu lưu · Progression = Tiến trình · Équipe = Đội · PC = PC · Pokédex = Pokédex
Activités = Hoạt động · Social = Xã hội · Boutique = Cửa hàng · Succès = Thành tựu
Sauvegarder = Lưu · Guide = Hướng dẫn · Paramètres = Cài đặt · Comment jouer = Cách chơi
Nouvelle partie = Chơi mới · Continuer = Tiếp tục · Badge = Huy hiệu · Dresseur = Huấn luyện viên
niveau (Niv.) = cấp · XP/Exp. = EXP · capturé = đã bắt · sauvage = hoang dã · shiny/chromatique = dạng sáng
œuf = trứng · pension = nhà trẻ Pokémon · casino = sòng bạc · raid = raid · zone = khu vực
donjon/souterrain = hầm ngục · arène = đấu trường · champion = nhà vô địch · Ligue = Liên đoàn
Conseil 4 = Tứ Thiên Vương · Maître de la Ligue = Nhà vô địch Liên đoàn · équipe = đội
objet = vật phẩm · Sac = Túi · talent = năng lực · attaque = đòn đánh · capacité = kỹ năng
statistique = chỉ số · nature = tính cách · bonbon = kẹo · argent = tiền · pièce = xu
quête = nhiệm vụ · récompense = phần thưởng · événement = sự kiện · classement = bảng xếp hạng
`);
console.log('wrote glossary +', UI_CHUNKS + DEX_CHUNKS, 'job files to', OUT);
