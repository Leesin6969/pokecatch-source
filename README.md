# Poke'Catch — Source game phục hồi 100% (xem · build · chạy · phát triển thêm)

[![Node.js Version](https://img.shields.io/badge/node-%3E%3D20.0.0-brightgreen.svg)](https://nodejs.org/)
[![Audit Status](https://img.shields.io/badge/audit-12%2F12%20Layers%20PASS-success.svg)](verify/AUDIT.md)
[![Gen 5-9 Content Pack](https://img.shields.io/badge/gen%205--9-57%2F57%20PASS-blue.svg)](verify/ext-audit.json)
[![Languages](https://img.shields.io/badge/languages-9%20supported%20(incl.%20vi)-orange.svg)](docs/I18N-VI.md)
[![License](https://img.shields.io/badge/license-MIT%20%2F%20Non--Commercial-lightgrey.svg)](LICENSE)

> [!IMPORTANT]
> **Legal Disclaimer & Fair Use Notice**:
> Dự án này được thực hiện **hoàn toàn vì mục đích nghiên cứu học thuật, giáo dục và phân tích kỹ thuật kiến trúc web (Interoperability & Software Preservation)**.
> - **Thương hiệu & Bản quyền:** Pokémon, tên nhân vật, hình ảnh, âm thanh và các yếu tố liên quan thuộc bản quyền và thương hiệu độc quyền của **Nintendo, Creatures Inc., Game Freak Inc. và The Pokémon Company**.
> - **Mã nguồn gốc:** Logic trò chơi gốc thuộc về tác giả của webgame *Poke'Catch* (`pokecatch-online.netlify.app`).
> - **Phi thương mại:** Dự án này **100% phi lợi nhuận**, không phân phối lại vì mục đích thương mại, không thu lợi nhuận dưới bất kỳ hình thức nào.

Source đầy đủ của game **Poke'Catch** (idle Pokémon, bản tiếng Pháp) chạy tại
`https://pokecatch-online.netlify.app/` — được phục hồi từ chính bundle production công khai của game.

Không có file nào bị mất, bị cắt, hay bị "viết lại cho giống": **toàn bộ 95 file JS gốc + 4.194 file asset +
CSS + 7 gói ngôn ngữ + boot loader + shell HTML + service worker + trang Atelier intros** đều nằm trong
repo, phần JS đã được chứng minh **AST-identical** với bản đang chạy thật, và có thêm **cây source
de-mangled đọc được** + **bộ tài liệu reverse sâu** (API, kiến trúc, công thức, save, network).

Trên nền đó repo có thêm **content pack gen 5–9**: Pokédex **493 → 1025 loài**, **103 form biến thể
(regional/Mega/Primal)**, **5 vùng mới với 8 gym + badge + Conseil 4 + Maître** mỗi vùng, **+173 move**,
**+3.864 asset** — tất cả bắt được/tiến hoá được trong game — xem [docs/GEN5-9.md](docs/GEN5-9.md).
Repo cũng có **tiếng Việt** (ngôn ngữ thứ 9): UI + Pokédex dịch tay bằng model, không dùng Google Dịch —
xem [docs/I18N-VI.md](docs/I18N-VI.md). Toàn bộ **hiệu ứng chiêu tự thêm (PixelFX) đã được gỡ bỏ** theo yêu cầu — game trở về hiệu ứng chiến đấu gốc. Lỗi asset Pokémon hiển thị đen (do CSS silhouette) đã được sửa để luôn hiện sprite thật — xem [docs/BATTLE-FX.md](docs/BATTLE-FX.md).

```
npm install
npm run dev            # → http://127.0.0.1:4317  (game chạy, sửa file là tự build lại + reload)
npm run build          # → dist/  (bản tĩnh, deploy được lên bất kỳ static host)
npm run check:play     # build + mở Chrome headless + chơi thử + chụp ảnh, in báo cáo
npm run i18n:probe     # kiểm tiếng Việt: switch en → vi qua UI, nav/Pokédex, screenshot
npm run gens:audit     # audit content pack gen 5–9: 57 check + probe 5 vùng mới
npm run audit-all      # (hoặc node tools/audit-all.mjs) 12 lớp audit phục hồi + gens:audit cho content pack
```

**Trạng thái lần kiểm cuối:** xem [verify/AUDIT.md](verify/AUDIT.md) — 0 thiếu thật, 0 lỗi runtime,
local = live 1:1, cây readable alpha-equivalent, trang intros trùng khớp. Content pack gen 5–9:
**57/57 check PASS** ([verify/ext-audit.json](verify/ext-audit.json)) + probe du hành 5 vùng mới
không lỗi ([verify/ext-probe.json](verify/ext-probe.json)).

---

## Mục lục

- [1. Cái gì đã được phục hồi](#1-cai-gi-da-duoc-phuc-hoi)
- [2. Bắt đầu nhanh](#2-bat-dau-nhanh)
- [3. Cấu trúc thư mục](#3-cau-truc-thu-muc)
- [4. Lệnh phát triển & Kiểm tra](#4-lenh)
- [5. Kiến trúc runtime](#5-kien-truc-runtime-giong-ban-goc)
- [6. Phát triển thêm](#6-phat-trien-them)
- [7. Content pack gen 5–9](#7-content-pack-gen-59-532-pokemon--103-form--gymbadgeleague)
  - [7.1 Tiếng Việt](#71-tieng-viet)
  - [7.2 Hiệu ứng chiêu](#72-hieu-ung-chieu--da-go-bo)
- [8. Bằng chứng độ trung thực](#8-bang-chung-do-trung-thuc)
- [9. Giới hạn đã biết](#9-gioi-han-da-biet)
- [10. Nguồn gốc & Bản quyền](#10-nguon-goc--ban-quyen)

---

## 1. Cái gì đã được phục hồi

| Hạng mục | Số lượng | Ghi chú |
|---|---|---|
| File JS gốc | **95 module + 1 prelude** | tách đúng ranh giới byte của bundle, verify từng file |
| Dòng JS đọc được | **105.059** | đã format, giữ nguyên 100% token/logic |
| **Cây readable (de-mangled)** | **96 file, 13.475 rename** | module slot, helper prelude, bảng export `t.X={key:local}` → tên thật; verify alpha-equivalence từng node |
| Data tables | POKEDEX 493 loài (+**532 loài + 103 form** gen 5–9 trong `src/ext/`), MOVES 500 (+**173**), EVOLUTIONS, ENCOUNTERS 4 vùng, STORY 66 chương (+**65 chương gym/league**), SCENES 529, HABITATS, CONFIG… | đọc/sửa trực tiếp, `npm run data:export` xuất JSON |
| Asset | **8.058 file / ~153,3 MB** | 4.194 file gốc + **3.864 file gen 5–9** (532 loài + 103 form × 6 file: icon/shiny/art gif/still; 49 mega stone/orb icon; 5 badge sheet) |
| **Content pack gen 5–9** | **532 loài · 103 form · 5 vùng · 65 chương (40 gym + 25 league) · 40 badge · 307 nguồn tiến hoá** | tất cả bắt được, dex hiển thị 9 vùng 1025 loài + form — [docs/GEN5-9.md](docs/GEN5-9.md) |
| **Asset visibility** | Sprite Pokémon luôn hiển thị thật, **không còn silhouette đen do CSS** | 1.210 ảnh Pokédex kiểm tra, 0 filter đen, 0 ảnh lỗi — `verify/asset-visibility.json` |
| Pack như deploy gốc | **6 nhóm / 1.468 file / 1.002.365 B** | `packs.json` + `pack-*.bin`, round-trip byte-identical, đúng số file từng nhóm như bản gốc |
| CSS | 671 KB min → 794 KB đã format | 137 @keyframes, 102 `:root`, 4 `@font-face` |
| Ngôn ngữ | fr (nhúng trong app) + **8 gói rời** (en, es, de, zh-Hans, zh-Hant, ko, ja, **vi**) | 2,8 MB dữ liệu dịch — có **tiếng Việt** do model dịch tay (xem §7.1) |
| Boot loader | `src/boot/*` | theme, language pick, shell injection, loader — có template hoá |
| Shell HTML | `src/shell/index.html` + `src/shell/app.html` | markup của toàn bộ UI (topbar, nav, 14 screen, modal root) |
| Service worker | `src/shell/sw.js` | có template CDN + shell id, bật bằng `--sw` |
| Trang phụ intros | `src/intros/shell.html` + `app.js` (1,27 MB) + `app.css` + `boot.js` | "Atelier des intros légendaires" — đã tách, build render lại single-file |
| Tài liệu reverse sâu | `docs/` | [API](docs/API.md) (99 export path) · [module system](docs/MODULE-SYSTEM.md) · [kiến trúc](docs/ARCHITECTURE.md) · [công thức](docs/FORMULAS.md) · [save](docs/SAVE-FORMAT.md) · [network](docs/NETWORK.md) (59 RPC) · **[backend schema](docs/BACKEND-SCHEMA.md)** (59/59 RPC + 7 bảng xác minh) · [data models](docs/DATA-MODELS.md) · [boot flow](docs/BOOT-FLOW.md) · **[gen 5–9 pack](docs/GEN5-9.md)** · **[tiếng Việt](docs/I18N-VI.md)** · **[hồ sơ RE](docs/REVERSE-ENGINEERING.md)** |
| Bản raw để đối chiếu | `mirror/` + `mirror/deploy/` | bundle gốc, boot.js, shell, **favicon.ico thật**, packs.json, packs — **10/10 file deploy byte-identical** với live |

**Audit lần cuối: 0 thiếu thật · 0 lỗi runtime · local = live 1:1 · 12/12 lớp phục hồi PASS · content pack gen 5–9 (loài + form + gym/league): 57/57 PASS · tiếng Việt: i18n 9/9 + probe PASS.** Báo cáo đầy đủ:
[verify/AUDIT.md](verify/AUDIT.md) · [verify/DOWNLOAD-AUDIT.md](verify/DOWNLOAD-AUDIT.md) ·
[verify/LOG-AUDIT.md](verify/LOG-AUDIT.md).

## 2. Bắt đầu nhanh

```bash
npm install            # prettier, terser, acorn, puppeteer-core (dev-deps)
npm run dev            # dev server có watch + live reload
npm run build          # build bản tĩnh vào dist/
npm run serve          # serve dist/ tại http://127.0.0.1:4318
```

Yêu cầu: Node ≥ 20, Chrome/Edge (chỉ cần cho bước verify/play headless).

## 3. Cấu trúc thư mục

```
src/
├── js/                  96 file nguồn thật, build theo thứ tự tên file
│   ├── 000-prelude.js   IIFE prelude: namespace proxy `t`, timer wrappers
│   ├── 001..029         hạ tầng + data tables (pokedex, moves, story, scenes, config…)
│   ├── 030..094         game core, adventure engine, modes, FX, từng screen
│   ├── 095-app-boot.js   bootstrap cuối cùng (chạy sau cùng)
│   ├── MODULES.md       bản đồ module: file → API → mô tả
│   └── DATA.md          sửa balance/nội dung ở file nào
├── readable/js/          96 file cùng nội dung, tên biến đã de-mangle (đọc dễ hơn)
│                          + _rename-manifest.json (13.475 rename, 1.311 binding)
├── css/app.css           toàn bộ style (đã format)
├── lang/*.js             7 gói dịch (fr nằm trong app)
├── assets/               8.058 file ảnh: 4.194 gốc + 3.864 cho gen 5–9 (532 loài + 103 form + item/badge)
├── ext/                  content pack gen 5–9 (authored, không đụng src/js)
│   ├── js/               10 module chèn đúng thứ tự (pokedex, evo, forms, moves, items, leagues, story, shop)
│   └── data/             gen5to9.json · forms.json · gyms.json · moves.json · *-assets.json
├── boot/                 boot loader (template có placeholder __TOKEN__)
├── shell/                index.html (trang), app.html (markup UI), sw.js, icon, favicon
├── vendor/supabase.js    Supabase JS SDK 2.65.0 (bên thứ ba, giữ nguyên bản phát hành)
└── intros/               trang Atelier intros đã tách: shell.html + app.css + boot.js + app.js

docs/                     API · kiến trúc · công thức · save · network · data models · boot flow
tools/                    build · dev · serve · verify · play · compare · check · export-data · demangle
tools/recovery/           toàn bộ pipeline đã dùng để phục hồi source (xem tools/recovery/README.md)
mirror/                   artifact gốc tải từ CDN, dùng để đối chiếu/audit
data/                     JSON snapshot các data table (npm run data:export)
dist/                     output build (không commit/không sửa tay)
verify/                   ảnh chụp + report JSON của các lần verify + AUDIT.md
```

## 4. Lệnh

| Lệnh | Việc |
|---|---|
| `npm run dev` | build dev + server + watch + live-reload (port 4317) |
| `npm run build` | build tĩnh vào `dist/` (JS chưa minify — dễ debug) + packs.json/pack bins |
| `npm run build:min` | build production: JS minify bằng terser, hash tên file |
| `npm run build:readable` | build từ cây de-mangled `src/readable/js` (để đọc khi debug) |
| `npm run build -- --sw` | bật service worker trong bản build |
| `npm run serve` | serve `dist/` (port 4318), có HEAD + MIME cho game |
| `npm run check` | build + serve + boot headless + mở 13 screen + chụp ảnh |
| `npm run check:play` | như trên + chơi thật từ title → trainer lab → adventure |
| `npm run compare` | chạy **cùng một kịch bản** trên site gốc và bản local rồi diff state |
| `npm run data:export` | xuất data table ra `data/*.json` |
| `npm run demangle` | sinh lại cây readable từ cây canonical (`src/readable/js`) |
| `npm run verify:readable` | chứng minh cây readable alpha-equivalent + build + boot + audit |
| `npm run extract:intros` | tách trang intros thành 4 source (split byte-exact) |
| `npm run verify:intros` | so trang intros rebuild với bản live (DOM + lỗi) |
| `npm run gen:docs` | sinh lại docs/API · ARCHITECTURE · NETWORK · DATA-MODELS |
| `npm run audit:ast` | verify 95/95 module AST-identical với bundle gốc |
| `npm run audit:data` | verify asset suy ra từ data (scene/pokemon/item/trainer… vs file có) |
| `npm run audit:runtime` | crawl sâu 17 screen + 13 modal (cần `npm run serve` trước) |
| `npm run audit:i18n` | load + kiểm 9 ngôn ngữ (gồm tiếng Việt) |
| `npm run audit:diff` | so 1:1 kết quả crawl local với site gốc |
| `npm run audit:download` | chứng minh đã tải đủ: 10/10 file deploy byte-identical + dò 51 path ẩn × 2 origin |
| `npm run audit:refs` | quét 2.492 tham chiếu tĩnh trong code/css/html → đối chiếu cây local + CDN |
| `npm run audit:requests` | diff mọi request runtime của live với cây local (0 thiếu) |
| `npm run audit:logs` | phân loại mọi dòng lỗi trong toàn bộ `verify/*.log|json` → `LOG-AUDIT.md` |
| `npm run probe:backend` | gọi Supabase bằng publishable key để xác minh 59 RPC + 7 bảng → `BACKEND-SCHEMA.md` |
| `npm run gens:fetch` | tải dữ liệu gen 5–9 từ PokéAPI + manifest PokéSprite v2 → `.cache/gens/raw` |
| `npm run gens:assets` | tải 3.192 asset loài gen 5–9 (icon 68×56 + art gif/still, thường + shiny) — form: `gens:forms` |
| `npm run gens:stills` | sinh `art/still` từ frame đầu gif (Python + Pillow — chỉ cần khi tải lại asset) |
| `npm run gens:forms` | dữ liệu + asset 103 form (regional/Mega/Primal) + 49 mega stone/orb |
| `npm run gens:forms:assets` | form assets + 5 badge sheet + orb icon (Python) |
| `npm run gens:moves` | thêm 173 move đòn đánh gen 5–9 (tên FR, hệ, power, acc, category) |
| `npm run gens:story` | sinh 65 chương gym/Elite 4/Maître cho 5 vùng mới |
| `npm run gens:data` | build-moves → build-data → build-story (regenerate toàn bộ data extension) |
| `npm run gens:build` | gens:data + build ra `dist/` |
| `npm run gens:audit` | audit content pack: 57 check (532 loài, 103 form, 40 gym, 25 league, asset) → `verify/ext-audit.json` |
| `npm run gens:probe` | browser probe: du hành Unys + bắt wild gen 5 + Mega tiến hoá + shop + badge → `verify/ext-probe.json` |
| `npm run verify:visibility` | kiểm tra sprite Pokémon không bị CSS tô đen + không ảnh lỗi → `verify/asset-visibility.json` |
| `npm run i18n:prep` | chia 3.038 chuỗi UI + 1.025 mục Pokédex thành 20 chunk dịch cho agent |
| `npm run i18n:check` | kiểm placeholder/HTML/id từng chunk (4.063 mục, 0 lỗi) |
| `npm run i18n:merge` | gộp bản dịch tay → `src/lang/vi.js` (I18N_DATA + I18N UI), tự map nội dung gen 5–9 |
| `npm run i18n:probe` | probe browser: đổi en → vi qua UI, kiểm nav/title/Pokédex, screenshot |
| `node tools/audit-all.mjs` | chạy toàn bộ **12 lớp** audit phục hồi, in summary PASS/FAIL (audit gen 5–9: `npm run gens:audit`) |

Mọi thứ đều tuỳ biến được: `node tools/build.mjs --minify --out=build --cdn=https://cdn.example/`.

## 5. Kiến trúc runtime (giống bản gốc)

```
index.html  (shell page)
 └─ boot.js                       ← generated từ src/boot/boot.template.js
     ├─ gắn <html lang class>, Theme dark/light/auto
     ├─ chọn ngôn ngữ (LANG_FILES / LANG_PICK)
     ├─ inject markup src/shell/app.html vào <body>
     └─ load bundle/app.<hash>.css → vendor-supabase.js → app.<hash>.js
          └─ (function(){ prelude; file1; file2; … file95 })()
```

`app.js` là **một IIFE duy nhất**, các file nối tiếp nhau và chia sẻ scope. Mỗi file gắn export của
mình vào `t` — một `Proxy` ánh xạ tên module (`t.UI`, `t.Game`, `t.Screens`, `t.POKEDEX`…).
Đây chính là kiến trúc gốc: bản phát hành là `tools/bundle.mjs` nối các file `js/**` lại rồi minify.

## 6. Phát triển thêm

**Đổi balance / kinh tế** — `src/js/018-config.js`: tiền khởi đầu, giá shop, tỉ lệ shiny, tốc độ
adventure, XP curve, pension, casino, tower, underground…
```js
START_MONEY: 3000,          // đổi thành 99999
ADVENTURE: { SPEED_MS: 900 } // nhịp combat
```

**Thêm / sửa Pokémon** — `003-pokedex.js` (loài mới), `004-evolutions.js` (tiến hoá),
`005-moves.js` (chiêu), ảnh vào `src/assets/pokemon/<id>.png` + `shiny/<id>.png` +
`art/still/<id>.png`. Dữ liệu có thể xem trước bằng `npm run data:export` → `data/POKEDEX.json`.

**Thêm vùng / chương truyện** — `028-story.js` (REGIONS → CHAPTERS → steps) và
`007/011/013-encounters-*.js` (bảng gặp), `026-habitats.js` (zone), `029-scenes.js` (ảnh nền).

**Sửa UI** — markup ở `src/shell/app.html`, style ở `src/css/app.css`, logic từng screen ở
`src/js/076-screen-pokedex.js`…`081-screen-friends.js` và `064-screen-adventure.js`.

**Thêm ngôn ngữ** — copy `src/lang/en.js` thành `src/lang/xx.js` (giữ cấu trúc
`(window.I18N_DATA=…).xx={…}`), thêm `'xx'` vào `LANGS` trong `src/boot/boot.template.js` và
`src/js/022-i18n.js`; build tự hash và sinh `LANG_FILES`.

**Thêm module mới** — tạo `src/js/096-ten-tinh-nang.js`:
```js
t.MyFeature = (function () {
  const { $ } = t.UI;                 // dùng module có sẵn
  function init() { /* … */ }
  return { init };
})();
```
File cuối luôn nạp sau nên an toàn; gọi `t.MyFeature.init()` từ `095-app-boot.js` hoặc screen tương ứng.

**Đọc code cho nhanh** — mở cây `src/readable/js/` (cùng nội dung, tên biến đã de-mangle), rồi tra
`docs/API.md` (mọi export `t.*`) và `docs/ARCHITECTURE.md` (file → module → phụ thuộc). Muốn sửa trực
tiếp cây readable thì build bằng `npm run build:readable`; cây canonical `src/js/` luôn giữ nguyên để
đối chiếu bundle gốc.

**Thay backend** — online features nằm ở `src/js/084-cloud.js` (Supabase client: auth ẩn danh, save
cloud, leaderboard, gift, friend). Đổi URL/key ở đó để trỏ về project Supabase của bạn; danh sách đầy
đủ RPC/bảng/payload cần dựng lại nằm trong [docs/NETWORK.md](docs/NETWORK.md).

**Sửa trang intros** — `src/intros/app.js` (1,27 MB, đã format) + `shell.html` + `app.css`; build tự
render lại single-file. Kiểm parity với bản live bằng `npm run verify:intros`.

## 7. Content pack gen 5–9 (532 Pokémon + 103 form + gym/badge/league)

Pokédex mở rộng **493 → 1025 loài**, thêm **103 form** (regional/Mega/Primal), mỗi loài/form có đủ
dữ liệu + 6 asset + learnset + evolution, và **bắt được trong game** qua 5 vùng mới có gym/badge/league:

| Vùng | Dex | Loài | Gym + badge | League (Conseil 4 + Maître) | Huyền ảo |
|---|---|---|---|---|---|
| **Unys** (V) | 494–649 | 156 | 8 | Shauntal/Marshall/Caitlin/Grimsley · Goyah | Keldeo (#649) |
| **Kalos** (VI) | 650–721 | 72 | 8 | Malva/Siebold/Wikstrom/Drasna · Dianthéa | Volcanion (#721) |
| **Alola** (VII) | 722–809 | 88 | 8 trial/kahuna | Hala/Olivia/Molayne/Kahili · Kukui | Zeraora (#807) |
| **Galar** (VIII) | 810–905 | 96 | 8 | Nabil/Sally/Roy/Duncan · Léon | Zarude (#893) |
| **Paldea** (IX) | 906–1025 | 120 | 8 | Rika/Poppy/Larry/Hassel · Alisma | Pecharunt (#1025) |

- **Cách vào**: hoàn thành Sinnoh → mở Map → chọn vùng mới → chọn chapter (nút "Refaire le chapitre"
  đóng vai trò di chuyển) → chơi 8 gym → Conseil 4 → Maître. Badge mở khoá shop như game gốc.
- **Form biến thể**: **53 regional** (wild trong vùng tương ứng: Alolan→Alola, Galarian/Hisuian→Galar,
  Paldean→Paldea), **48 Mega** (dùng Mega Stone mua trong shop), **2 Primal** (red/blue-orb).
  Form có dex entry riêng, stats/types riêng, art riêng.
- **Dữ liệu + skills**: tên FR, hệ, stats, capture rate, genus, flavor, evolution, learnset —
  **+173 move đòn đánh gen 5–9** (673 move tổng), 8.444 learn ref đều resolve; 84 move status map sang
  move status tương đương có sẵn vì engine không có effect riêng cho move lạ.
- **Asset**: icon 68×56 + shiny (PokéSprite v2), art gif + shiny (Showdown `gen5ani`/`ani`), still trích
  frame đầu — **3.864 file / ~88 MB** cho loài + form; art của loài mới **được dùng thật** trong battle/dex
  (hook `SPECIALS` thay hardcode id ≤ 493 của bản gốc).
- **Không đụng source phục hồi**: 10 module trong `src/ext/js/` (`003b/004b/004c/005b/014b/017b/019c/031b/094b/094c`),
  build trộn theo thứ tự tên file; `src/js/**` vẫn byte-faithful với bundle gốc.
- **Kiểm chứng**: `npm run gens:audit` → **57/57 check PASS** (`verify/ext-audit.json`),
  `npm run gens:probe` → du hành Unys + bắt wild gen 5 + **Mega tiến hoá Florizarre → #3001** + shop đá/orb
  + 8 gym/5 league chapter, **0 lỗi console/page/http** (`verify/ext-probe.json`).

Chi tiết đầy đủ (nguồn, mapping, giới hạn, lệnh tái lập): **[docs/GEN5-9.md](docs/GEN5-9.md)**.

### 7.1 Tiếng Việt

- **Cài đặt ⚙ → Ngôn ngữ → Tiếng Việt** (hoặc trình duyệt tiếng Việt sẽ tự nhận). Có 9 ngôn ngữ: fr, en, es, de, zh-Hans, zh-Hant, ko, ja, vi.
- Dịch **tay bằng model** (không Google Dịch): 3.038 chuỗi UI + 1.025 mục Pokédex (genus/flavor) + tên vùng/badge/chương/form/shop của content pack gen 5–9 — chia 20 chunk cho 20 agent dịch song song với glossary thống nhất, 100% placeholder/HTML giữ nguyên (`npm run i18n:check` → 0 lỗi).
- Tên Pokémon / move / item giữ **tiếng Anh chính thức** (thói quen người chơi VN), UI và Pokédex mô tả dịch tiếng Việt tự nhiên.
- File: `src/lang/vi.js` (519 KB) + module đăng ký `src/ext/js/022b-i18n-vi.js`; boot loader tự hash/gắn bundle. Kiểm chứng: `verify/vi-probe.json`, ảnh `verify/vi-adventure.png`, `verify/vi-options.png`, `verify/vi-dex.png`; audit i18n **9/9 ngôn ngữ sạch**.

### 7.2 Hiệu ứng chiêu — đã gỡ bỏ

- **Đã xoá toàn bộ hiệu ứng chiêu tự thêm (PixelFX)**: không còn banner kỹ năng, canvas overlay, aurora/nova/set-piece, hit-stop/tint do extension tạo. Game dùng lại **hiệu ứng chiến đấu gốc** trong bundle.
- Đã xoá code/asset liên quan: `src/ext/js/050b-movefx-data.js`, `src/ext/js/050c-battlefx-rich.js`, `src/ext/data/movefx.json`, `src/assets/fx/`, `tools/fx/`, `PixelFX/` và các script `npm run fx:*`.
- **Sửa lỗi asset đen**: sprite Pokémon hợp lệ nhưng bị CSS tô đen cho "unknown/seen/veiled". Extension `src/ext/js/050e-visibility-fix.js` thay filter đen bằng grayscale mờ, nên mọi sprite hiển thị đúng (probe: 1210 ảnh, 0 ảnh bị filter đen, 0 ảnh lỗi).
- Kiểm tra: `npm run verify:visibility` → `verify/asset-visibility.json`, ảnh `verify/assets-dex-visible.png`.

## 8. Bằng chứng độ trung thực

1. **Round-trip byte-exact** — tách bundle thành 95 mảnh rồi ghép lại ra đúng từng byte của file gốc
   (2 678 266 byte, `tools/extract-source.mjs` tự verify mỗi lần chạy).
2. **95/95 module AST-identical** — sau khi format, mỗi file được parse lại và so AST với chunk gốc;
   chỉ vị trí/whitespace bị bỏ qua, token không đổi (`tools/format-src.mjs`).
3. **So sánh trực tiếp với site thật** — `npm run compare` chạy cùng một kịch bản headless trên
   `pokecatch-online.netlify.app` và bản local: state DOM, localStorage, screen, ảnh… trùng nhau.
   Xem `verify/compare.json`.
4. **Chơi thật, chạy song song với site gốc** — `npm run check:play` tự chơi từ title → trainer lab →
   **starter chooser LinkFx** → adventure trên **cả hai** bản. Kết quả lần chạy cuối
   (`verify/play-original.json` vs `verify/play-local.json`):

   | Chỉ số | Site gốc | Bản local |
   |---|---|---|
   | console error / page error | 0 / 0 | 0 / 0 |
   | request 404 / asset thiếu | 0 / 0 | 0 / 0 |
   | starter nhận được | ✔ Salamèche (id 4) | ✔ Salamèche (id 4) |
   | sau khi chơi: mons / team / adv | 1 / 1 / ✔ | 1 / 1 / ✔ |
   | save vào localStorage | ✔ `gachamon-save-v1` | ✔ `gachamon-save-v1` |
   | screen có nội dung | 9/12 (3 khoá đúng thiết kế) | 9/12 |

   Trong run dài hơn của `check:play` (bản local): engine chạy tiếp → 3 throw, 4 battle, 3 win,
   bắt 3 Pokémon, money 3 000 → 5 510 ₽, save 4 349–5 574 B tuỳ RNG. Khác biệt duy nhất giữa hai bản
   là trường RNG/thời điểm (trainer id/tag, tick, số bước chapter) — chi tiết [verify/fidelity.md](verify/fidelity.md).
5. **Audit sâu 1:1 với site gốc** — cùng save đã mở khoá, cùng kịch bản click (tới 140 phần tử/screen,
   13 modal, battle engine), so từng asset request/console/page error:
   **0 khác biệt**. ~551 asset URL tải ở cả hai bên mỗi lần crawl, thêm 65–72 ảnh RNG site gốc tải mà
   local không request — kiểm tra trên đĩa: **0 file thiếu**. 77 module, 17 screen, 0 console error,
   0 warning, 0 ảnh hỏng ở cả hai bên. i18n **8/8** sạch. Packs **1.468/1.468 byte-identical**.
   Báo cáo: [verify/AUDIT.md](verify/AUDIT.md) · log: `verify/log-*.txt`.
6. **Cây readable alpha-equivalent** — 13.475 rename trên 1.311 binding; lockstep AST diff 228.305
   identifier khác biệt **duy nhất** là tên; ánh xạ binding 1:1 (0 shadow/merge); 68 global chưa resolve
   giống tuyệt đối; build từ cây readable boot đủ 77 module/17 screen và audit runtime sạch
   (`verify/readable-report.json`).
7. **Trang intros** — tách 4 phần ghép lại **byte-exact** với file CDN; bản rebuild mở cạnh bản live:
   0 console error, 0 request fail, DOM stats giống nhau (`verify/intros-report.json`).
8. **Tính đầy đủ của việc tải** — `npm run audit:download`: **10/10 file deploy byte-identical**
   (kể cả `favicon.ico` thật), dò **51 path ẩn × 2 origin (102 tổ hợp)** → chỉ 2 file thật đã có, không sourcemap,
   không admin/js/functions/`_redirects`; tham chiếu tĩnh **2.492/2.492** có local; request runtime live
   **606 asset URL → 0 thiếu**. Báo cáo: [verify/DOWNLOAD-AUDIT.md](verify/DOWNLOAD-AUDIT.md).
9. **Backend xác minh công khai** — publishable key trong bundle cho phép gọi Supabase như client:
   **59/59 RPC** client dùng tồn tại đúng tham số, **7 bảng** tồn tại (RLS-closed), OAuth Discord+Google,
   anonymous tắt. Báo cáo: [docs/BACKEND-SCHEMA.md](docs/BACKEND-SCHEMA.md).
10. **Log audit** — `npm run audit:logs` quét 21 log text + 36 report JSON: **10 dòng lỗi → 10 known,
    0 unknown, 0 report bất thường**. Báo cáo: [verify/LOG-AUDIT.md](verify/LOG-AUDIT.md).
11. **Content pack gen 5–9** — 532 entry (National Dex 1025) + **103 form** (53 regional/48 Mega/2 Primal),
    532/532 loài trong pool hoang dã + regional form trong pool vùng nhà, **40 gym/40 badge/25 league
    chapter**, 3.864 asset đúng định dạng, 307 nguồn tiến hoá, 173 move mới; probe browser: du hành Unys,
    bắt wild gen 5, **Mega tiến hoá qua item thật (#3001)**, shop đá/orb, badge sheet render,
    **0 console/page/http error**. Báo cáo: [verify/ext-audit.json](verify/ext-audit.json) ·
    [verify/ext-probe.json](verify/ext-probe.json).

12. **Tiếng Việt (ngôn ngữ thứ 9)** — 3.038 chuỗi UI + 1.025 mục Pokédex dịch tay bằng model (20 agent song song, glossary thống nhất, **không Google Dịch**), bảo toàn 100% placeholder/HTML: `i18n:check` **4.063 mục → 0 lỗi**, UI coverage **3.038/3.038 (100%)**; switch en → vi qua UI không lỗi (`verify/vi-probe.json`); audit i18n **9/9 ngôn ngữ sạch**. Docs: [docs/I18N-VI.md](docs/I18N-VI.md).
13. **Hiệu ứng chiêu đã gỡ bỏ (theo yêu cầu)** — xoá toàn bộ extension PixelFX/battle FX tự thêm, game dùng lại hiệu ứng gốc; **sửa lỗi asset Pokémon đen** do CSS silhouette: 1.210 ảnh Pokédex kiểm tra, **0 filter đen, 0 ảnh lỗi** (`verify/asset-visibility.json`, `verify/assets-dex-visible.png`). Docs: [docs/BATTLE-FX.md](docs/BATTLE-FX.md).

Sinh lại toàn bộ bằng một lệnh: `node tools/audit-all.mjs` (12 lớp phục hồi) + `npm run gens:audit` (content pack gen 5–9).

Lần verify cuối nằm trong `verify/report.json`, `verify/play-local.json`, `verify/compare.json`.

## 9. Giới hạn đã biết

- **Tên binding**: đã de-mangle **một phần có kiểm chứng** sang cây `src/readable/js/` (1.311 binding
  lấy từ registry, prelude, bảng export và alias namespace). Tham số hàm và local không suy ra được
  nghĩa vẫn giữ tên terser (`a`, `b`, `Oe`…) vì không có sourcemap gốc — mức trung thực tối đa khi chỉ
  có bundle. Cấu trúc, luồng, string và **toàn bộ data table** đọc được 100%.
- **Admin screens** (`js/screens/admin-*.js`) không bao giờ được phát hành trên CDN (ADMIN_FILES rỗng)
  → không có gì để phục hồi. Loader của chúng vẫn còn ở `086-screen-admin-loader.js` để bạn tự viết;
  hợp đồng gọi backend của chúng (30 RPC `admin_*`) đã được trích trong `docs/NETWORK.md`.
- **Backend Supabase** (bảng, RPC `cloud_load`/`cloud_head`, policy) là server-side → không nằm trong
  frontend. Toàn bộ hợp đồng client→server (59 RPC, 3 bảng, payload key) đã nằm trong
  [docs/NETWORK.md](docs/NETWORK.md); online feature vẫn dùng project Supabase gốc của game.
- **Bản build local tắt service worker** để rebuild không bị cache che. Bật lại bằng
  `node tools/build.mjs --sw --cdn=<url>`.
- Trang Atelier intros đã tách thành source và build render lại; bản gốc single-file vẫn giữ ở
  `mirror/intros/legend-intros.html` để đối chiếu byte.
- **Content pack gen 5–9**: Mega là **tiến hoá vĩnh viễn bằng đá** (engine gốc không có cơ chế Mega
  tạm thời; Rayquaza Mega dùng level 80 vì canon không có đá); 84 move status map sang move tương đương;
  gym leader dùng portrait trainer có sẵn (type-based), Alola dùng trial/kahuna thay gym (canon không
  có gym); chưa gồm Gigantamax/form battle tạm; 127 flavor EN; 151 loài dùng art `ani`; 8 loài art tĩnh.
  Chi tiết: [docs/GEN5-9.md](docs/GEN5-9.md) §8.

## 10. Nguồn gốc & Bản quyền

- **Mục đích dự án:** Poke'Catch là fan game do tác giả gốc phát hành công khai trên web (`https://pokecatch-online.netlify.app/`). Repo này là sản phẩm phục hồi kỹ thuật (reverse-engineering) phục vụ đọc hiểu, học tập và phát triển tiếp trên môi trường cá nhân.
- **Sở hữu trí tuệ Pokémon:** Hình ảnh, tên nhân vật, sprite và dữ liệu Pokémon thuộc bản quyền của **Nintendo / Game Freak / Creatures Inc. / The Pokémon Company**.
- **Mã nguồn game gốc:** Bản quyền mã logic game nguyên bản thuộc về tác giả gốc của Poke'Catch.
- **Giấy phép công cụ & tài liệu (License):** Toàn bộ pipeline tooling (`tools/`), tài liệu đặc tả (`docs/`) và hạ tầng kiểm chứng thuộc bản quyền của contributor theo giấy phép [MIT](LICENSE).
- **Cam kết phi thương mại:** Tuyệt đối không sử dụng dự án này để kinh doanh, kiếm tiền hoặc phát hành lại vì lợi nhuận.
