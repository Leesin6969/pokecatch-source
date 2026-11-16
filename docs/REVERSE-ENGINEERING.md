# Reverse Engineering Dossier — Hồ sơ kỹ thuật phục hồi Poke'Catch

Hồ sơ kỹ thuật của quá trình phục hồi source game **Poke'Catch** từ bản phát hành công khai.
Tài liệu này ghi lại: mục tiêu, artifact gốc + hash, phương pháp, bằng chứng, cách tái lập, giới hạn.

---

## 1. Mục tiêu

| Mục | Giá trị |
|---|---|
| Mục tiêu | Game web Poke'Catch (idle Pokémon, tiếng Pháp) |
| Điểm vào | `https://pokecatch-online.netlify.app/` |
| Yêu cầu | Source **100%**: xem được, build được, chạy được, phát triển tiếp được |
| Cache thời điểm thu thập | `Date: Sun, 15 Nov 2026 07:01:36 GMT` (CDN) |
| BUILD id | `59d637ffd1` (nhúng trong `boot.js`) |

## 2. Artifact gốc (đã lưu trong `mirror/`)

| File | Kích thước | SHA-256 (32 ký tự đầu) | Vai trò |
|---|---|---|---|
| `bundle/app.0e84ded8d8.js` | 2 701 707 B | `0e84ded8d8485f2e15bbc492cf688971` | Toàn bộ logic game |
| `bundle/app.7130b4d937.css` | 671 506 B | `7130b4d937e06bcbbb9c6dee9faf6ca3` | Toàn bộ style |
| `boot.js` | 48 986 B | `74ffb1ee23ec37c11c2a7534d3781102` | Loader + shell markup + config |
| `index.html` (netlify) | 4 676 B | `c316581f008ed52c54007b4c20bbf194` | Trang shell (đăng ký SW, BOOT_FAIL) |
| `sw.js` | 5 427 B | `ff9a281d6c608ea29516f9c252d583ba` | Service worker CDN/pack |
| `packs.json` | 81 173 B | `d18264c40fb9faa8357ceae5e5e76567` | Manifest 1 468 asset đóng gói |
| `bundle/vendor-supabase.*.js` | 110 797 B | (hash tên file `8596965fe9`) | SDK Supabase 2.65.0 |
| `bundle/lang-*.js` ×7 | 2,3 MB | — | Gói dịch en/es/de/zh-Hans/zh-Hant/ko/ja |
| `packs/*.bin` ×6 | ~1 MB | — | 6 pack chứa 1 468 ảnh nhỏ |
| `intros/legend-intros` | 1 354 941 B | — | Trang "Atelier des intros légendaires" |

## 3. Bản đồ hạ tầng đã dịch ngược

Từ comment trong `boot.js` / `sw.js` và URL thực tế:

```
netlify.app/                     trang shell tĩnh (chỉ đổi khi deploy shell)
  index.html ── đăng ký /sw.js, nạp boot.js
  sw.js      ── giữ page offline, định tuyến /assets/* sang CDN, giải pack
  boot.js    ── ▲ được CDN phục vụ, shell cũng nạp từ CDN

pages.dev (Cloudflare Pages, CDN)  toàn bộ game
  boot.js, bundle/app.*, bundle/lang-*, bundle/vendor-supabase.*
  packs.json + bundle/pack-*.bin   (file nhỏ gộp pack, trả theo offset/length)
  assets/**                        (file lớn: bg, artwork, trainer…)
  intros/legend-intros             (trang công cụ)
  supabase.co                      backend (auth ẩn danh, save cloud, leaderboard…)
```

- Ảnh nhỏ được **gộp vào pack** rồi cắt theo `[offset, length, type]` trong `packs.json` — nên có thể
  tải 1 pack thay vì 556 request.
- `boot.js` chèn `<base href=CDN>` khi origin khác CDN; mọi đường dẫn `assets/…` nhờ đó trỏ đúng.
- Trang Netlify chỉ là 1 shell 4,6 KB: **toàn bộ UI là markup nhúng trong `boot.js`** (`insertAdjacentHTML`).

## 4. Phương pháp (8 bước đã chạy)

| Bước | Việc | Tool | Kết quả |
|---|---|---|---|
| 1 Recon | Tải shell, đọc `boot.js`, lộ CDN + danh sách bundle | curl | có URL đầy đủ |
| 2 Acquire | Tải bundle/CSS/lang/boot/sw/index/packs.json; chia pack thành 1 468 file | Node fetch | `mirror/` đầy đủ |
| 3 Coverage | Trích mọi literal `assets/…`, `js/…` trong bundle + css; tải 1 334 file rời + 140 chân dung trainer + 5 nền underground | regex + fetch | 0 file thiếu |
| 4 Unpack | `app.js` = 1 `ExpressionStatement` → `(function(){ prelude; expr0, expr1, …, expr94 })()`. Parse AST, xác định ranh giới 95 chunk | acorn | cấu trúc gốc |
| 5 Split | Cắt đúng byte boundary, đặt tên theo `t.X` / `t.Screens.*` mà chunk định nghĩa | acorn + manifest | 96 file nguồn |
| 6 Beautify | Prettier từng file; **verify AST** từng file với chunk gốc | prettier + acorn | 95/95 identical |
| 7 Rebuild | `tools/build.mjs`: nối file theo thứ tự → bundle, sinh `boot.js` từ template + token, gom asset, hash tên | Node | `dist/` chạy được |
| 8 Verify | Headless Chrome: boot, mở 13 screen, so với site thật, chơi thật tới adventure | puppeteer-core | xem §6 |

### Cấu trúc bundle đã giải mã

```
(IIFE bọc ngoài)
  var <77 slot module>, …              ← khai báo slot, hoisted
  const Wa=setTimeout.bind(window) …   ← timer wrapper
  var Qr={…}, t=new Proxy(…)           ← namespace `t`: get/set tra `ko` (module registry)
  t.TabLock = …,                        ┐
  t.Clock = (()=>{…})(),                │ 95 expression, join bằng dấu phẩy
  t.POKEDEX = [ … ],                    │ mỗi expression = 1 file nguồn gốc
  …                                     │ (assignment data module, hoặc IIFE cho UI)
  t.App = {…}, jt()                     ┘
})();
```

`t` là `Proxy` trên một object rỗng, nhưng `get` tra `ko[b]` (registry module) rồi tới global, và tự
bind các hàm global — nhờ vậy mọi file đều dùng được `t.UI`, `t.Game`… mà không cần import.

## 5. Kết quả phục hồi

| Hạng mục | Số lượng |
|---|---|
| File JS nguồn | 95 module + `000-prelude.js` |
| Dòng JS (sau format) | 105 059 |
| Module registry (`t.X`) | 77 tên module công khai + 80 dotted path (`t.Screens.*`, `t.UI.*`) |
| Data table | 14 xuất JSON được; 8 bảng tính runtime (Story, Config có getter, Habitats merge…) |
| Asset | **4 194 file / 65,2 MB** (2 741 png · 1 069 gif · 373 webp · 11 svg) |
| Packs (như deploy gốc) | 6 nhóm / 1 468 file / 1 002 365 B, round-trip byte-identical |
| CSS | 1 file, 794 KB formatted |
| Ngôn ngữ | 7 bundle |
| Trang phụ | Atelier intros (1,35 MB) |

## 6. Bằng chứng & kiểm chứng

### 6.1 Round-trip byte-exact
`tools/recovery/extract-source.mjs` cắt bundle tại `body[3].expression.expressions[i].start/end`, ghép lại
bằng `slice(0, preludeEnd) + chunks.join(',') + suffix` → **bằng đúng file gốc từng byte**. Script
tự assert mỗi lần chạy.

### 6.2 AST-identical sau format
`tools/recovery/format-src.mjs` format rồi parse lại từng file, so AST với `(${chunk_goc})` (bỏ start/end/raw).
Kết quả: `verified 95/95 modules: AST identical to the shipped bundle`.

### 6.3 So sánh với site đang chạy thật
`npm run compare` chạy **cùng một kịch bản** trên `pokecatch-online.netlify.app` và `127.0.0.1:4318`:

- state DOM: `#app`, `#money`, chapter button, battle log, screen active, localStorage keys, ảnh hỏng…
- kết quả: **trùng nhau** ở mọi trường (xem `verify/compare.json`).
- sai khác duy nhất từng ghi nhận: số `document.images` lệch 1 do ảnh lazy-load chưa kịp — không phải
  lỗi chức năng.

### 6.3b Playthrough song song với site gốc
Chạy cùng `tools/play.mjs` trên cả hai bản (title → lab → starter → adventure → 12 screen → 120 s
idle). Kết quả (chi tiết: `verify/fidelity.md`):

| Chỉ số | Site gốc | Local |
|---|---|---|
| console/page error | 0 / 0 | 0 / 0 |
| 404 / ảnh hỏng | 0 / 0 | 0 / 0 |
| screen có nội dung | 9/12 | 9/12 |
| node map/team/dex/pension/shop/achv | 444/128/4063/187/134/238 | 444/128/4063/187/134/238 |
| save (`gachamon-save-v1`) | ✔ | ✔ |
| play time tích luỹ | 120 000 ms | 120 000 ms |

Khác biệt còn lại chỉ là trường RNG/thời điểm: số bước chapter, kích thước save (66 B), vài node
đang animate lúc chụp.

### 6.4 Playthrough thật
`npm run check:play`:

```
title → "Nouvelle partie" → trainer lab (skip narration, chọn avatar, đặt tên)
     → modal starter của Prof. Chen → adventure
save gachamon-save-v1 được ghi (≈4,4 KB)
9/12 screen có nội dung (3 screen khoá theo thiết kế: raid/underground/market)
0 console error · 0 page error · 0 request 404 · 0 ảnh hỏng
```

### 6.5 Asset coverage
- 2 488 literal asset path trong bundle+CSS → tải đủ **2 488/2 488**.
- `packs.json` gốc: **1 468/1 468** file (pack round-trip byte-identical).
- Tên file **tính động** (audit-data + `tools/probe-cdn.mjs` dò toàn bộ họ template):
  art GIF 493 id × (thường/shiny), anim GIF 11 legendary + placeholder `88.gif`, 4 geode, 6 rock,
  9 mark, 10 frame-candy, 18 gem, biến thể trainer `-hgss/-rse/-dp/...`, **529 scene** trong catalog.
- Kết quả cuối: **4 194 file / 65,2 MB**, **0 thiếu thật**; 58 đường dẫn không có cả trên CDN
  (game gốc fallback) — danh sách ở `verify/AUDIT.md` §6.
- Browser chạy playthrough + deep crawl: **0 request 404**, 0 ảnh hỏng.

### 6.6 Deep audit 1:1 với site gốc (`verify/AUDIT.md`)
Cùng save đã mở khoá + cùng kịch bản click (140 phần tử/screen, 13 modal), hook `Proxy` để mở mọi
module, so từng request/log:

| | site gốc | local |
|---|---|---|
| console error / warning | 0 / 0 | **0 / 0** |
| HTTP ≥ 400 / request fail | 0 / 0 | **0 / 0** |
| ảnh hỏng | 0 | **0** |
| module / screen / modal | 77 / 17 / 13 | **77 / 17 / 13** |
| asset URL tải OK (trùng nhau) | 551 | **551** |
| asset live tải thêm (RNG) | 72 | 0 thiếu trên đĩa |

Site gốc ném 1 lỗi nội tại của chính nó khi click phần tử raid (`reading 'floor'` — bundle gốc
dòng 569); lần chạy local không trúng nhánh RNG đó. Verdict của `tools/audit-diff.mjs`:
**“local build is behaviourally identical to the live site on this crawl”**.

## 7. Attempt log (các vấn đề và cách xử)

| Vấn đề | Nguyên nhân | Cách xử |
|---|---|---|
| Tải asset lẻ bằng path thuần | Không có directory listing trên Cloudflare Pages | Lấy **đúng** danh sách từ literal trong bundle + data table, không đoán mò |
| `boot.js` tải 49 KB nhưng có "khoảng trống" lớn | Shell markup 45 KB nhúng dạng template literal, + ảnh base64 | Tách markup ra `src/shell/app.html`, template hoá token |
| Chunk IIFE không format được | Chunk là biểu thức `function(){…}()`; đứng riêng là statement không hợp lệ | Bọc `( … );` khi ghi file — paren không làm đổi AST |
| Lần đầu chạy local: `TypeError: Failed to construct 'URL'` | `window.CDN` = `"."` (không phải URL tuyệt đối), Clock gọi `new URL(t.CDN)` | Build local đặt `CDN = ""` → Clock dùng `location.origin`, Update tắt, base href rỗng = same-origin |
| Nav không chuyển screen khi test | Trước tiên boot phải xong `await t.Title.show()` (flow title → lab → starter) | Automate đúng flow: skip narration → avatar → tên → starter |
| 22 trainer sprite 404 | Tên file tính runtime (`assets/trainers/${key}.png`), không phải literal | `tools/recovery/fetch-derived.mjs` trích key từ `sprite:`/array trong source rồi tải |
| Không thấy save trong localStorage | Key thật là `gachamon-save-v1` (tên cũ), không phải `pokecatch.save` | Đọc key từ `CONFIG.SAVE_KEY` / dò `/save/i` |
| **Rà soát lần 2 vẫn thiếu 1 139 asset** | Literal scan bỏ sót họ tên **dựng động**: art/anim GIF, geode, rock, mark, frame-candy, biến thể trainer | `audit-data.mjs` load data thật trong sandbox + `probe-cdn.mjs` dò 4 409 ứng viên theo từng template → tải 1 139 file |
| **Còn sót 94 scene `hoenn-*`** | `SCENES.catalog` dựng `src` động, literal scan không thấy | audit-data đọc `SCENES.catalog` (529 scene) → tải đủ 94 |
| Runtime audit lần đầu báo lỗi giả | Gọi `App.show()` vào screen không tồn tại submodule (market/friends/admin) | Xác nhận site gốc ném y hệt → ghi nhận là hành vi gốc, không phải lỗi bản phục hồi |
| **Play automation báo "starter not received"** | Starter không phải modal: game dựng overlay **LinkFx `.lk-fx`** (3 slot, chọn bằng pointer thật rồi bấm `.lk-go`), sau đó mới tới gift ball; đồng thời wait cũ đọc nhầm key `pokecatch-save-btn` | Sửa `tools/play.mjs`: driver onboarding dùng `page.mouse.click` cho `.lk-slot`/`.lk-go`, xử lý `.hatch-fx.gift`, đọc đúng `gachamon-save-v1`. Kết quả: starter nhận được (Salamèche), save 4 751 B, `adv:true`, battle/bắt chạy tiếp |

## 8. Tái lập từ đầu

```bash
node tools/recovery/extract-source.mjs    # bundle -> 96 file, assert round-trip byte-exact
node tools/recovery/extract-shell.mjs     # boot.js -> boot/ + shell/ + sw template
node tools/recovery/extract-assets.mjs    # packs + asset -> src/assets, vendor, lang
node tools/extract-intros.mjs             # trang intros -> shell.html + app.css + boot.js + app.js (split byte-exact)
node tools/recovery/format-src.mjs        # prettier + verify AST 95/95
node tools/recovery/fetch-assets.mjs      # (khi cần tải bổ sung asset literal từ CDN)
node tools/recovery/fetch-derived.mjs     # (asset tên tính runtime: trainer, artwork)
node tools/probe-cdn.mjs                  # (dò toàn bộ họ asset dựng động, tải cái còn thiếu)
node tools/fetch-missing.mjs <list.json>  # (tải bổ sung theo danh sách audit chỉ ra)
node tools/build.mjs                      # src -> dist (+ packs.json/pack-*.bin)
node tools/check.mjs --play               # verify end-to-end
node tools/audit-data.mjs                 # audit asset theo data
node tools/audit-runtime.mjs --url=… --deep   # crawl sâu 17 screen/13 modal
node tools/audit-i18n.mjs --url= …        # 8 ngôn ngữ
node tools/audit-diff.mjs                 # so 1:1 với site gốc
```

Chi tiết từng script + thứ tự: `tools/recovery/README.md`.
Báo cáo audit đầy đủ: `verify/AUDIT.md`. Đối chiếu hành vi: `verify/fidelity.md`.

## 9. Rollback / an toàn

- Quá trình là **read-only** với mọi thứ bên ngoài; không có ghi nào lên CDN/backend.
- `mirror/` giữ nguyên bản tải về, nên có thể regenerate toàn bộ `src/` bất cứ lúc nào.
- Nhánh online (Supabase) chỉ được client gọi trong lúc chạy; khi testlocal, tài khoản ẩn danh
  được tạo (`pokecatch-anon`) và lưu trong localStorage của profile Chrome headless tạm — không ảnh
  hưởng dữ liệu người chơi thật.

## 10. Giới hạn

1. Tên biến đã được de-mangle **một phần có kiểm chứng** (1.311 binding / 13.475 occurrence: module
   slot, helper prelude, bảng export `t.X = { publicName: local }`, alias namespace) — xem §11.
   Tham số hàm và local không suy ra được nghĩa vẫn giữ tên terser; không có sourcemap gốc.
2. Admin screens (`js/screens/admin-*.js`, `js/cheats.js`) chưa từng được deploy — CDN trả SPA
   fallback; `window.ADMIN_FILES = []`. Không tồn tại để phục hồi (client admin chỉ là loader rỗng).
3. Backend Supabase (schema bảng, RPC, policy) là server-side, ngoài phạm vi frontend — nhưng **hợp
   đồng client→server đã được trích đầy đủ**: 59 RPC + 3 bảng + payload key, xem `docs/NETWORK.md`.
4. Trang Atelier intros đã được tách thành source (shell/app.css/boot.js/app.js), build render lại
   single-file; byte-exact khi ghép lại và parity DOM với bản live — xem §11.
5. Số liệu trong `verify/report.json` phụ thuộc thời điểm chạy (idle tick, network Supabase).
6. Artwork chữ Unown (`assets/pokemon/art/still/201xx.png` + shiny) **không có trên CDN** — game gốc
   cũng fallback sang sprite thường; tương tự ảnh fallback `assets/bg/scenes/{type}-710x400.webp`.
   Đây là khoảng trống của upstream, không phải của bản phục hồi (xem `verify/AUDIT.md` §6).

## 11. Lần 3 — reverse sâu: de-mangle + tài liệu đặc tả + tách trang intros

### 11.1 De-mangle có kiểm chứng (`src/readable/js/`)

Bundle gốc đã bị terser bóp tên. Không có sourcemap, nhưng **một phần lớn tên có thể suy ra chắc chắn**
từ chính code: namespace registry, prelude, và các bảng export. `tools/demangle.mjs`:

1. Ghép 96 file canonical thành **một program** để scope analysis đúng như bundle thật (Babel scope).
2. Đổi tên theo 6 quy tắc, ưu tiên giảm dần:
   - 76 module slot trong prelude (`Oo` → `slot_Adventure`), 11 helper (`ko` → `MODULES`, `io` → `GLOBAL`,
     `vo` → `isModuleName`, `e` → `tr` = hàm dịch, `Qr` → `TIMERS`…).
   - Bảng export: `t.UI = { esc: f, … }` → `f` thành `esc`; `t.Game = { makeMon: ct }` → `ct` thành `makeMon`;
     `t.Screens.adventure = {…}` và `t.X = (() => ({…}))()` (858 binding).
   - Destructuring namespace: `const { esc: f, sleep: H } = t.UI` → `f`→`esc`, `H`→`sleep` (209).
   - Alias trực tiếp `const B = t.Game` → `Game` (138), `const a = t.UI.$` → `$` (19).
3. An toàn ngữ nghĩa: cấm đổi thành tên **shadow** binding ngoài đang được dùng, và cấm tên đã bị scope
   con chiếm (nếu không reference sẽ đổi binding). Vi phạm → tự thêm hậu tố (`t2`, `h2`…).
4. Chèn rename vào đúng span ký tự của cây canonical (giữ nguyên format, chỉ đổi identifier),
   xuất `src/readable/js/` + `_rename-manifest.json` (bảng slot, thống kê, số edit từng file).

**Chứng minh tương đương** (`tools/verify-readable.mjs`, `verify/readable-report.json`):

| Kiểm chứng | Kết quả |
|---|---|
| Cấu trúc AST lockstep (228.305 identifier) | **khác biệt duy nhất là tên identifier** |
| Ánh xạ binding 1:1 (không merge/shadow) | **0 vi phạm** sau khi thêm guard |
| Tập global chưa resolve (68 tên) | **giống tuyệt đối** trước/sau |
| Build từ cây readable + boot | **PASS** (77 module, 17 screen, 13 modal) |
| Deep runtime audit trên bản readable | **0 console error / 0 warning / 0 HTTP≥400 / 0 ảnh hỏng**, cùng 3 page-error
  artifact của harness như bản canonical |

Lỗi thật đã bắt được trong quá trình làm (nhờ kiểm chứng, không phải may):
- Babel `ObjectProperty` không có `kind` → rule export-table ban đầu bỏ qua toàn bộ; phát hiện vì
  `exportAliases = 0` dù quét thấy 75 bảng.
- Export key `t: Je` (module I18n) đổi `Je` → `t` làm **shadow namespace `t`** → runtime
  `t.LANG_PICK` undefined. Verifier bắt ở tầng runtime; sau đó thêm guard shadow tĩnh và verifier
  nâng lên kiểm **ánh xạ binding 1:1** để bắt lỗi này ở tầng tĩnh.

### 11.2 Tài liệu đặc tả sinh từ source (`docs/`)

| File | Nội dung | Cách sinh |
|---|---|---|
| `docs/API.md` | 99 export path trên `t.*`: kind, arity, file, member list | `tools/gen-api.mjs` (AST) |
| `docs/ARCHITECTURE.md` | 9 tầng, bảng phụ thuộc file→module, 1 SCC 62 file, điểm vào runtime | `tools/gen-arch.mjs` |
| `docs/FORMULAS.md` | stats/HP, XP, capture, shiny, damage Gen-3, kinh tế, offline, tick | đọc CONFIG + hàm, ghi rõ file:dòng |
| `docs/SAVE-FORMAT.md` | shape `freshState`, field runtime từng module, migration v2, payload cloud | `freshState()` + migrate() |
| `docs/NETWORK.md` | 59 RPC + tham số, 3 bảng, OAuth, thiết bị anon, 24 key localStorage | `tools/gen-network.mjs` (AST) |
| `docs/DATA-MODELS.md` | field + kiểu + ví dụ của POKEDEX/MOVES/EVOLUTIONS/…/CONFIG/STORY | `tools/gen-data-models.mjs` |
| `docs/BOOT-FLOW.md` | chuỗi boot 15 bước + 5 vòng lặp sau boot | đọc `095-app-boot.js` + đo runtime |

### 11.3 Trang intros — tách + tái tạo

`tools/extract-intros.mjs` tách single-file 1.351.771 B thành:

| File | Nội dung | Ghi chú |
|---|---|---|
| `src/intros/shell.html` | markup 79,6 KB với 3 token | |
| `src/intros/app.css` | 4.246 B, đã format | |
| `src/intros/boot.js` | 140 B (`?player`) | |
| `src/intros/app.js` | 1.267.796 B → 1,43 MB đã format | editor intro: ImageDecoder, canvas, export |

- **Split chứng minh byte-exact**: ghép 4 phần lại = đúng từng byte file CDN (assert trong tool).
- `tools/build.mjs` render lại single-file vào `dist/intros/legend-intros{,.html}` (1.482 KB).
- `tools/verify-intros.mjs` mở **cả bản live CDN và bản rebuild** trong Chrome headless:
  0 console error, 0 request fail, cùng title / 2 button / 4 select / 3 input / 10 canvas / 2.700 ký tự.
- Bổ sung 19 asset mà trang intros gọi (9 scene `*-710x400.webp` + 10 asset literal) — đều có trên CDN.
- `favicon.ico` thật của bản deploy (280 B, byte-identical) đã thay icon tự sinh — không còn 404 `/favicon.ico`.

## 12. Lần 4 — chứng minh tải đủ 100% + xác minh backend + log audit

### 12.1 Bản deploy hiện hành vẫn là bản đã mirror

`tools/audit-download.mjs` tải lại **mọi artifact của bản deploy đang chạy** và so byte:

| Artifact | Kết quả |
|---|---|---|
| `index.html`, `boot.js`, `sw.js`, `apple-touch-icon.png`, `favicon.ico` | **byte-identical** với mirror |
| `packs.json`, `bundle/app.js`, `bundle/app.css`, `bundle/vendor-supabase.js`, trang intros | **byte-identical** |
| BUILD / hash | `59d637ffd1` / app `0e84ded8d8` / css `7130b4d937` / vendor `8596965fe9` — trùng mirror |

→ Không có "version mới hơn" nào bị bỏ sót. `mirror/` 2 836 file / 23,51 MB.

### 12.2 Dò file ẩn — không có code nào ngoài những gì đã tải

Dò **51 path × 2 origin** = 102 tổ hợp (Netlify + Pages): manifest, robots, sitemap, `_headers`, `_redirects`,
`_routes.json`, `netlify.toml`, `.netlify/functions/*`, `_worker.js`, `_middleware.js`, toàn bộ `.map`,
`js/*` (cheats/admin/screens), `src/*`, `api/*`, `package.json`, workbox, `data/*`, `fonts/*`…

- Chỉ **2 file thật** ngoài danh sách đã tải: `sw.js` (Netlify) và `packs.json` (CDN) — **đều đã có**.
- Còn lại là fallback: Pages trả trang redirect **145 B**, Netlify trả 404 page **3 449 B** → phân biệt
  bằng `content-type` + kích thước, không dựa status.
- Phát hiện thêm: `favicon.ico` **thật** (280 B) có trên Netlify — đã tải về, thay icon tự sinh, build
  giờ phát ra file byte-identical với bản gốc.

### 12.3 Runtime — mọi request đều có bản local

Mở rộng `audit-runtime` ghi **toàn bộ** request/response (không chỉ `/assets/`):

| | live | local |
|---|---|---|
| tổng URL | 671 | 678 |
| riêng asset | 606 | 612 |
| role tài nguyên | document / boot / app-bundle / app-css / vendor / asset | giống hệt |

`tools/audit-requests-diff.mjs` → **"every live request has a local counterpart"**, 0 asset thiếu,
0 role thiếu. (Font và nhiều icon nhỏ là `data:` URI nhúng — không phải file rời.)

### 12.4 Backend — xác minh hợp đồng server bằng publishable key

Client lắp publishable key từ 6 mảnh: `["sb","publishable","BCiE","porcfjQJ-a7-H5tIA","uj","MriW8"].join("_")`.
Dùng nó gọi thẳng Supabase (như client) để xác minh:

| Phép kiểm | Kết quả |
|---|---|
| RPC client dùng | **59/59** server xác nhận tồn tại với đúng tên tham số (58 → `42501 permission denied for function`; `log_session` trả exists-bad-args do dummy sai kiểu) |
| Bảng | **7** tồn tại: `saves`, `trades`, `market`, `sessions`, `friends`, `gifts`, `bans` — tất cả **RLS-closed** |
| Auth settings | OAuth **Discord + Google**, anonymous **tắt**, signup bật, mailer autoconfirm |
| Chống clone | `Cloud` chỉ bật khi hostname thuộc allowlist; hash hostname bằng `Math.imul` từng ký tự |
| Giới hạn | Không có source server công khai (PostgREST OpenAPI cần secret key; bảng đóng; không repo) |

Chi tiết: `docs/BACKEND-SCHEMA.md` + `verify/backend-probe.json`.

### 12.5 Log audit — 100% dòng lỗi đã giải thích

`tools/audit-logs.mjs` quét **21 log text + 36 report JSON** trong `verify/`:
10 dòng khớp `error|fail|undefined|404|500|timeout|warn…` → **10 known, 0 unknown**;
0 report JSON có counter bất thường. Ba nhóm known: harness gọi `App.show` vào market/friends/admin
(site gốc ném y hệt), bug `reading 'floor'` của raid trong game gốc, và `Ss is not defined` do sandbox
eval 2 module data (024/025 cần timer alias từ prelude). Báo cáo: `verify/LOG-AUDIT.md`.

---

## 13. Content pack gen 5–9 — mở rộng 493 → 1025 loài (lần 5)

Yêu cầu: "game gốc chưa đủ Pokémon gen 1–9, cập nhật thêm cho đầy đủ". Đã làm:

- **532 loài mới** (#494–#1025): tên FR, hệ, stats, capture rate, height/weight, genus, flavor,
  learnset, evolution, legendary/mythical/baby — lấy từ PokéAPI, cache tại `.cache/gens/raw/`.
- **Asset 3.192 file / ~71 MB**: icon 68×56 + shiny (PokéSprite v2 — **trùng byte** với icon gốc
  của game), art gif + shiny (Showdown `gen5ani`/`ani` — **trùng byte** với art gốc), art still
  trích frame đầu bằng Pillow. 151 loài dùng `ani` (không có `gen5ani`), 8 loài art tĩnh từ `dex`
  (upstream không có sprite động).
- **5 vùng mới** điền vào 5 placeholder có sẵn trong `028-story.js`: Unys (494–649), Kalos (650–721),
  Alola (722–809), Galar (810–905), Paldea (906–1025) — mỗi vùng `dex`, `open`, `mythical`, `ace`.
- **17 chương khám phá** append vào `CHAPTERS`: route steps dùng pool species tường minh
  (`species: [...]`), lv 56→100, cap 60→100; hoàn thành vùng này tự mở vùng kế. 45 huyền thoại +
  14 huyền ảo nằm trong pool (bắt được với capture rate gốc).
- **233 nguồn tiến hoá / 238 edge** (215 level + 23 item có sẵn; 15 loài cũ tiến hoá lên dạng mới
  như Scyther→Kleavor, Ursaring→Ursaluna, Stantler→Wyrdeer, Girafarig→Farigiraf…). Item không có
  trong economy gốc (23 item) → quy về level 40; trade → `link-cable` (convention gốc).
- **Kiến trúc**: extension layer `src/ext/js/003b, 004b, 014b, 094b` — build trộn theo tên file,
  `src/js/**` **không bị sửa byte nào** nên toàn bộ bằng chứng phục hồi (AST-identical, packs
  byte-identical 1.468 file…) vẫn nguyên giá trị.
- **Kiểm chứng**: `tools/gens/audit-ext.mjs` → **37/37 PASS** (`verify/ext-audit.json`):
  532 entry, 532/532 loài có trong pool, 3.192 asset đúng format, learnset dùng move hợp lệ,
  evolution hợp lệ, 17 chương schema chuẩn, cap ≤ 100. `tools/gens/probe-ext.mjs` → du hành Unys
  bằng UI thật, gặp hoang dã gen 5 (495/496/497/498/500), dex 9 vùng/1025 loài, **0 lỗi console**.

Chi tiết + giới hạn: `docs/GEN5-9.md`. File dữ liệu: `src/ext/data/gen5to9.json`.
Sinh lại: `npm run gens:data && npm run build`; kiểm: `npm run gens:audit && npm run gens:probe`.

### 13.1 Bổ sung: form biến thể + gym/badge/league (lần 5b)

- **103 form**: 53 regional (Alolan/Galarian/Hisuian/Paldean + 3 giống Tauros), 48 Mega, 2 Primal.
  Mỗi form có entry POKEDEX riêng (id `base*1000+n` > 1025, không đụng National Dex), stats/types
  riêng, 6 asset riêng, evolution entry. Regional form bắt hoang dã ở vùng nhà; Mega/Primal tiến hoá
  bằng 49 item (Mega Stone/Orb) bán trong shop, hoặc level 80 với Rayquaza.
- **Art của loài 494–1025 giờ được dùng thật**: bản gốc hardcode `id ≤ 493` mới có art; extension
  patch `FORMS.isForm` + `SPECIALS.has` (đúng hook event Pokémon gốc) → battle/dex dùng
  `art/<id>.gif`, still, shiny. Probe xác nhận `artBase = assets/pokemon/art/494.gif`.
- **+173 move đòn đánh gen 5–9** (tổng 673): tên FR, hệ, power, accuracy, category từ PokéAPI;
  8.444 learn ref resolve 100%. 84 move status map sang move status tương đương có sẵn (engine gốc
  không có effect data cho move lạ).
- **40 gym + 40 badge + 25 chapter league** cho 5 vùng: mỗi vùng 8 gym chapter (2 route + heal + gym),
  4 chapter Conseil 4, 1 chapter Maître (`league: true`, step champion). Level 60→100, cap ≤ 100,
  team sinh theo type trong dex vùng; 20 line-up Elite 4 themed trong `LEAGUE_TEAMS`.
- **Badge**: tên duy nhất theo vùng (suffix), 5 badge sheet recolored từ sheet Sinnoh gốc
  (`assets/badges/<region>-sheet.png`), patch `STORY.badgeSheet`. Map card hiển thị 8 badge/region.
- **Kiểm chứng**: `npm run gens:audit` → **57/57 PASS**; `npm run gens:probe` → du hành Unys,
  bắt wild gen 5 (Lianaja #496), **Mega tiến hoá Florizarre → #3001**, shop có đá/orb, 8 gym/5 league
  chapter, badge sheet render, **0 lỗi console/page/http**. Chi tiết: `docs/GEN5-9.md`.

Lưu ý công bằng: Mega trong bản mod là **tiến hoá vĩnh viễn bằng đá** (engine gốc không có cơ chế
Mega tạm thời); 84 status move đổi tên tương đương; gym leader dùng portrait trainer có sẵn;
Alola dùng trial/kahuna thay gym (canon không có gym); chưa gồm Gigantamax/form battle tạm.

---

## 14. Tiếng Việt — ngôn ngữ thứ 9 (lần 6)

- Thêm **tiếng Việt** vào game: **3.038 chuỗi UI + 1.025 mục Pokédex** (genus/flavor) + tên vùng/badge/chương/form/shop của content pack gen 5–9.
- **Dịch tay bằng model**, chia 20 chunk song song với glossary thống nhất (không Google Dịch): văn phong game mobile VN, xưng "bạn", câu ngắn tự nhiên; tên Pokémon/move/item giữ tiếng Anh chính thức.
- Bảo toàn 100% placeholder `{...}`, thẻ HTML, số/%/×/₽/emoji: `npm run i18n:check` → **4.063 mục, 0 lỗi**; UI coverage **3.038/3.038 (100%)**.
- Đăng ký: `src/lang/vi.js` (519 KB) + module `022b-i18n-vi.js`; boot tự nhận `vi-VN`, options ⚙ → Ngôn ngữ → **Tiếng Việt**.
- Kiểm chứng: switch **en → vi** qua UI không lỗi (`verify/vi-probe.json`), audit i18n **9/9 ngôn ngữ sạch**, boot/check:play/12 lớp regression PASS. Chi tiết: `docs/I18N-VI.md`.

---

## 15. Battle FX — đã gỡ bỏ (lần 7, theo yêu cầu)

- **Xoá toàn bộ hiệu ứng chiêu tự thêm (PixelFX)**: code `050b-movefx-data.js`, `050c-battlefx-rich.js`, data `movefx.json`, asset `src/assets/fx/`, `tools/fx/`, vendored `PixelFX/` và các script `fx:*`. Game dùng lại hiệu ứng chiến đấu gốc; không đổi save/cân bằng.
- **Sửa lỗi asset Pokémon đen thui**: sprite trong repo đều hợp lệ (quét 12.915 file, 0 file đen/trong suốt; 1.025/1.025 id + form đủ). Nguyên nhân là CSS tô đen silhouette cho `unknown/seen/veiled`; extension `src/ext/js/050e-visibility-fix.js` đổi sang grayscale mờ.
- Kiểm chứng: `npm run verify:visibility` → `verify/asset-visibility.json` (1.210 ảnh Pokédex, **0 filter đen, 0 ảnh lỗi**), ảnh `verify/assets-dex-visible.png`.
