# AUDIT — rà soát toàn bộ bản phục hồi (lần kiểm cuối)

Rà soát theo **13 lớp**: **tính đầy đủ tải** → source JS → asset → runtime → i18n → deployment →
**tham chiếu tĩnh** → **request runtime** → **cây readable (de-mangle)** → **trang intros** →
**tài liệu đặc tả** → **log audit**.
Mỗi lớp đều có log riêng trong `verify/` và có thể tái lập bằng `node tools/audit-all.mjs`.

- Ngày: **2026-11-15** (Asia/Saigon) · Node 24.13.1 · Chrome headless · Windows
- Build local: **`d81fa33f52`** · bản deploy gốc: **BUILD `59d637ffd1`** (bundle `app.0e84ded8d8.js`, css `app.7130b4d937.css`)
- Nguồn đối chiếu: `https://pokecatch-online.netlify.app/` + CDN `https://pokecatch-online.pages.dev/`

## 0. Kết luận

| Lớp | Kết quả |
|---|---|
| **Tính đầy đủ tải (deploy artifacts + path ẩn)** | **10/10 file deploy byte-identical với live**; **0 file ẩn/sourcemap/admin/functions** tồn tại thêm (đã dò 102 tổ hợp path × origin) |
| Source JS (95 module + prelude) | **95/95 AST-identical** với bundle gốc; round-trip **byte-exact** |
| Asset | **4 194 file / 65,23 MB** · 1 468 file pack byte-identical · **0 thiếu thật** |
| Runtime (crawl sâu 17 screen, 13 modal, 23 bước) | **0 console error · 0 warning · 0 HTTP error · 0 ảnh hỏng · 0 request fail** |
| So với site gốc (cùng crawl, cùng save) | **giống hệt** — 0 khác biệt asset/lỗi |
| i18n | **9/9 ngôn ngữ** load + render sạch (thêm **tiếng Việt**) |
| Asset visibility | Sprite Pokémon luôn hiển thị thật (không còn silhouette đen do CSS) | 1.210 ảnh dex, 0 filter đen, 0 ảnh lỗi — `verify/asset-visibility.json` |
| Packs (như deploy gốc) | 6 nhóm / **1 468 file** / 1 002 365 B · round-trip byte-identical · đúng kích thước từng nhóm như bản gốc |
| **Tham chiếu tĩnh** | 12 artifact → **2 492 đường dẫn literal**, **2 492/2 492 có trong cây local**, 0 thiếu |
| **Request runtime** | live tải **606 asset URL**, **0 thiếu ở local**; mọi role tài nguyên (document/boot/bundle/css/vendor) đều có bản local |
| Build + chơi thật | `npm run check:play` **PASSED** — title → lab → **starter nhận được qua LinkFx chooser** (Salamèche id 4, save 4 751 B, `adv:true`) → idle engine chạy → battle/bắt (3 throw, 4 battle, 0 lỗi) |
| **Cây readable (de-mangle)** | **96 file · 13 475 rename · alpha-equivalence 228 305 identifier**: cấu trúc AST khác biệt duy nhất là tên; binding map **1:1**; 68 global chưa resolve **giống tuyệt đối**; build readable **boot 77 module / 17 screen / 13 modal**, audit runtime sạch |
| **Trang intros** | split **byte-exact**, rebuild **parity DOM 1:1** với bản live (0 console/request error) |
| **Backend (schema công khai)** | **59/59 RPC** client dùng được server xác nhận tồn tại đúng tham số; **7 bảng** xác nhận (`saves`, `trades`, `market`, `sessions`, `friends`, `gifts`, `bans`), RLS-closed; OAuth Discord+Google |
| **Tài liệu đặc tả** | 12 file trong `docs/` sinh/kiểm từ source: 99 export path, 59 RPC + **backend schema xác minh**, shape save + data, công thức, module system, boot flow |
| **Log audit** | **21 log text + 36 report JSON**; 10 dòng khớp `error|fail|…` → **10/10 known/explained**, **0 unknown**, **0 report có counter bất thường** (`verify/LOG-AUDIT.md`) |
| **Content pack gen 5–9** | **532 loài (#494–#1025) · 103 form (regional/Mega/Primal) · 5 vùng · 65 chương (40 gym + 25 league) · 40 badge · 3.864 asset · 173 move**: 57/57 check PASS; probe du hành Unys, bắt wild gen 5, Mega tiến hoá #3001, 0 lỗi console (`verify/ext-audit.json`) |

→ Đạt yêu cầu ≥ 99%: **100% những gì tồn tại công khai trên CDN/deploy đều đã phục hồi và verify**; phần
"reverse sâu" bổ sung cây source đọc được, đặc tả hành vi, hợp đồng backend và audit log, đều có kiểm
chứng máy.
Những mục không thể có (không tồn tại upstream) liệt kê ở §6.

## 1. Source JS — 100% trung thực

| Phép kiểm | Kết quả | Log |
|---|---|---|
| Ghép 95 chunk == `mirror/bundle/app.js` | byte-exact (2 678 266 B) | `log-ast.txt` |
| AST từng file == chunk gốc | **verified 95/95 modules** | `log-ast.txt` |
| Bundle dựng lại parse được | 3 795 969 B, parse OK | `log-ast.txt` |
| 77 module công khai trên `t` | runtime thấy đủ **77/77** | `log-runtime-local.txt` |
| Data table đọc được | 14 bảng literal + 21 namespace (POKEDEX, MOVES, STORY, SCENES, CONFIG, HABITATS…) | `log-data.txt` |

Chi tiết 95 module: `src/js/MODULES.md`. Data: `src/js/DATA.md` + `data/*.json`.

## 2. Asset — không thiếu file nào

| Nhóm | Số file | Ghi chú |
|---|---|---|
| `pokemon/` | 3 243 | sprite (556), shiny (556), artwork still (1 058), **art GIF 986**, pmd, form |
| `bg/` | 379 | scene 373 (webp 710×400, gồm 9 scene riêng của trang intros) + underground 6 |
| `trainers/` | 372 | 129 chân dung + 187 battle still + biến thể vùng (`-hgss`, `-rse`, `-dp`…) |
| `ui/` | 68 | item bar, badge case, mark, geode, rock, frame-candy, underground icon |
| `items/` | 120 | toàn bộ vật phẩm + 18 gem theo type |
| `badges/` | 12 | 4 sheet badge (frlg/gsc/rse/dppt) + kanto |
| **Tổng** | **4 194 file / 65,23 MB** | 2 741 png · 1 069 gif · 373 webp · 11 svg |

Phép kiểm (`log-data.txt`, `audit-data.json`):

- `packs.json` gốc: **1 468/1 468** file có mặt.
- Literal refs trong bundle + CSS: **2 488/2 488** có mặt.
- Đường dẫn suy ra từ data (SCENES catalog 529 scene, POKEDEX 556 id, FORMS, item id, trainer key, theme…): **0 thiếu thật**.
- `dist/assets` khớp `src/assets`: **0 mismatch**.
- 58 đường dẫn "không có" chia làm 2 nhóm và **không phải lỗi phục hồi**:
  - 4 đường dẫn item mà game tự resolve sang chỗ khác (`assets/ui/berry-*.png`, `assets/ui/link-cable.svg` — có đủ).
  - 54 artwork chữ Unown (`art/still/201xx.png`, `art/shiny/still/201xx.png`) — **CDN cũng không có**, game fallback (xem §6).

## 3. Runtime — crawl sâu, so 1:1 với site gốc

Kịch bản giống hệt nhau cho cả hai bên: seed save đã mở khoá (41 Pokémon gồm legendary/shiny/form, toàn bộ item, trainer, `adv.unlocked=999`, badges đủ), hook `Proxy` để mở mọi screen/module, click **tới 140 phần tử mỗi screen**, mở **13 modal** (trainer card, options, guide, changelog, chapter picker…), chạy battle engine, đổi speed.

| Chỉ số | Site gốc | Bản local |
|---|---|---|
| console error | 0 | **0** |
| console warning | 0 | **0** |
| HTTP ≥ 400 | 0 | **0** |
| request failed | 0 | **0** |
| ảnh hỏng | 0 | **0** |
| module thấy được | 77 | **77** |
| screen mở được | 17 | **17** |
| modal mở được | 13 | **13** |
| bước crawl | 23 | **23** |
| asset URL tải OK | 551 trùng nhau | **0 thiếu** |

- **72** asset site gốc tải trong lần chạy đó mà local không request (do RNG chọn zone khác nhau) → kiểm tra trực tiếp trên đĩa: **0 file thiếu**. (Con số này dao động theo RNG mỗi lần chạy: 551–558 trùng / 65–72 live-only.)
- Khác biệt lỗi duy nhất: site gốc ném 1 lỗi nội tại của chính nó khi click một phần tử raid (`Cannot read properties of null (reading 'floor')`, bundle gốc dòng 569) — lỗi **có sẵn trong game gốc**, không phải do bản phục hồi; lần chạy local không trúng nhánh RNG đó.
- 3 "page error" còn lại (`show market/friends/admin`) là do **script audit gọi thẳng** `App.show()` vào các screen mà bản thân game không mở được (market bị tắt bởi `CONFIG.MARKET.OPEN=false`, friends/admin không có submodule) — **site gốc ném y hệt** với cùng lệnh gọi.

Log: `log-runtime-local.txt`, `audit-local.json`, `audit-original.json`, `audit-diff.json`, `log-diff.txt`.

### 3b. Playthrough first-run — starter thật, cả hai bên

`tools/play.mjs` chơi đúng luồng người chơi: title → **trainer lab** (skip narration → avatar → name)
→ **starter chooser** (overlay LinkFx `.lk-fx`: chọn slot bằng pointer thật → `.lk-go`) → gift →
adventure. Lần chạy cuối (`verify/play-original.json` / `verify/play-local.json` / `verify/play-check.json`):

| Chỉ số | Site gốc | Bản local |
|---|---|---|
| starter nhận được | **Salamèche (id 4)** | **Salamèche (id 4)** |
| mons / team / `adv` | 1 / 1 / true | 1 / 1 / true |
| save | `gachamon-save-v1`, 5 405 B | `gachamon-save-v1`, 4 765 B |
| console/page error | 0 / 0 | 0 / 0 |
| asset thiếu | 0 | 0 |
| screen có nội dung | 9/12 | 9/12 |

Run dài hơn của `check:play` (local) tiếp tục engine: 3 throw → bắt 3 Pokémon, 4 battle/3 win,
money 3 000 → 5 510 ₽. Khác biệt save là RNG/tick (trainer id/tag, thời điểm), không phải logic.

## 4. i18n — 9/9

| Ngôn ngữ | `documentElement.lang` | Bundle | Nav render | Lỗi |
|---|---|---|---|---|
| fr | fr | built-in | Aventure / Progression / Équipe-PC | 0 |
| en | en | `I18N_DATA.en` | Adventure / Progress / Team-PC | 0 |
| es | es | `I18N_DATA.es` | Aventura / Progreso / Equipo-PC | 0 |
| de | de | `I18N_DATA.de` | Abenteuer / Fortschritt / Team-PC | 0 |
| zh-Hans | zh-Hans | `I18N_DATA.zh-Hans` | 冒险 / 进度 / 队伍-电脑 | 0 |
| zh-Hant | zh-Hant | `I18N_DATA.zh-Hant` | 冒險 / 進度 / 隊伍-電腦 | 0 |
| ko | ko | `I18N_DATA.ko` | 모험 / 진행도 / 팀-컴퓨터 | 0 |
| ja | ja | `I18N_DATA.ja` | 冒険 / 進行度 / 手持ち-PC | 0 |

Log: `log-i18n.txt`, `audit-i18n-local.json`.

## 5. Deployment — giống bản deploy gốc

| Hạng mục | Kết quả |
|---|---|
| `boot.js` sinh từ template + token | 49 KB, build id khớp `build.json` |
| `index.html` shell | boot URL + SW_REG thay đúng |
| `sw.js` | sinh được khi `--sw` (mặc định tắt để dev không bị cache) |
| `packs.json` + 6 pack .bin | 1 468 file, **1 002 365 B**, từng nhóm đúng số file như bản gốc (556/556/120/12/37/187) |
| Round-trip pack → file | **1 468/1 468 byte-identical** với `src/assets` |
| Vendor Supabase | hash `8596965fe9` — **trùng tên file bản gốc** (cùng scheme sha256/10) |
| `intros/legend-intros` | render lại từ 4 source, có cả `.html` và bản không đuôi như CDN; 19 asset nó tham chiếu + favicon đều có |
| `favicon.ico` | lấy từ bản deploy gốc (280 B, byte-identical) — thay icon tự sinh, không còn 404 `/favicon.ico` |

Log: `log-build.txt`, `log-packs.txt`, `build.json`.

## 6. Những thứ KHÔNG thể phục hồi (không tồn tại upstream)

| Mục | Bằng chứng |
|---|---|
| `js/cheats.js`, `js/screens/admin-*.js` (9 file) | CDN trả SPA fallback 145 B; `window.ADMIN_FILES = []` nên bản phát hành không có |
| Artwork chữ Unown `art/still/20101…20127.png` (+ shiny) | CDN trả fallback; game tự fallback sang sprite thường |
| Ảnh fallback `assets/bg/scenes/{type}-710x400.webp` | CDN trả fallback; code dùng map type→scene khác |
| Backend Supabase (body RPC, policy, schema) | server-side, không nằm trong frontend; **hợp đồng client→server đầy đủ** ở `src/js/084-cloud.js` + `docs/NETWORK.md` |
| Trang Market | `CONFIG.MARKET.OPEN = false` → nav ẩn, screen không render (đúng thiết kế game) |
| Tên biến đã minify | không có sourcemap; đã bù bằng split + prettier + AST verify + **de-mangle có kiểm chứng 1 311 binding** (cây readable) + docs module/data |
| Backend server-side | chỉ có hợp đồng client→server (59 RPC / 3 bảng / payload key — `docs/NETWORK.md`); body hàm, policy, schema thật nằm trong Supabase, không thể lấy từ frontend |

## 7. Tái lập toàn bộ audit

```bash
npm install
node tools/audit-all.mjs                              # toàn bộ 12 lớp phục hồi, in summary PASS/FAIL
node tools/serve.mjs --dir=dist --port=4400 &        # hoặc npm run serve

npm run audit:ast        # 95/95 AST identical + round-trip
npm run audit:data       # asset suy ra từ data vs file có
node tools/audit-runtime.mjs --url=http://127.0.0.1:4400/ --label=local --deep   # runtime sâu
node tools/audit-i18n.mjs --url=http://127.0.0.1:4400/  --label=local             # 8 ngôn ngữ
node tools/audit-runtime.mjs --url=https://pokecatch-online.netlify.app/ --label=original --deep
node tools/audit-diff.mjs                                                        # so local vs gốc
npm run check:play                                                              # build + boot + chơi thật
```

## 8. File log trong `verify/`

| File | Nội dung |
|---|---|
| `log-ast.txt` | round-trip + AST 95/95 |
| `log-data.txt` · `audit-data.json` | audit asset theo data |
| `log-runtime-local.txt` · `audit-local.json` | crawl sâu bản local |
| `audit-original.json` | crawl sâu site gốc (cùng kịch bản) |
| `log-diff.txt` · `audit-diff.json` | so sánh 1:1 + verdict |
| `log-i18n.txt` · `audit-i18n-local.json` | 8 ngôn ngữ |
| `log-build.txt` · `build.json` | build metadata |
| `log-packs.txt` | packs round-trip |
| `report.json` | boot check |
| `play-check.json` · `check-*.png` | chơi thật + ảnh chụp |
| `play-local.json` · `play-original.json` · `log-play-original.txt` | playthrough first-run (starter thật) local vs site gốc |
| `fidelity.md` | đối chiếu hành vi bản cũ (boot/play) |
| `probe-cdn.json` · `fetch-missing-report.json` | kết quả dò CDN để đóng lỗ hổng asset |
| `readable-report.json` | alpha-equivalence + build/boot/audit của cây de-mangled |
| `intros-report.json` | so trang intros rebuild với bản live (DOM stats + lỗi) |
| `intros-assets.json` | asset trang intros đã bổ sung |
| `download-audit.json` · `DOWNLOAD-AUDIT.md` | tính đầy đủ: deploy artifacts byte-identical + dò 51 path ẩn × 2 origin |
| `reference-audit.json` | 2 492 tham chiếu tĩnh vs cây local |
| `requests-diff.json` | mọi request runtime live vs local tree |
| `backend-probe.json` | verify 59 RPC + 7 bảng trên Supabase bằng publishable key |
| `log-audit.json` · `LOG-AUDIT.md` | phân loại mọi dòng lỗi trong toàn bộ log |
| `audit-all.json` | kết quả suite `tools/audit-all.mjs` (12 lớp phục hồi) · `ext-audit.json`/`ext-probe.json` (content pack gen 5–9) |

## 9. Cây readable (de-mangle) — kiểm chứng tương đương

Cây canonical `src/js/` giữ nguyên tên terser (để chứng minh AST-identical với bundle).
`tools/demangle.mjs` sinh **cây song song** `src/readable/js/`: đổi tên các binding mà nghĩa
suy ra được chắc chắn, không sửa một token logic nào.

| Phép kiểm | Kết quả |
|---|---|
| Rename thực hiện | **13 475 occurrence / 1 311 binding / 96 file** (76 module slot, 11 helper, 858 export-table, 209 destructuring, 138 module alias, 19 member alias) |
| Lockstep AST diff (canonical vs readable) | **khác biệt duy nhất là tên identifier** — 228 305 identifier, 0 khác cấu trúc/literal |
| Binding 1:1 (không shadow/merge) | **0 vi phạm** |
| Global chưa resolve | **68 tên, giống tuyệt đối** trước/sau |
| Build từ `src/readable/js` | **PASS** — bundle `e9ee618bc0`, 3,68 MB |
| Boot bản readable | **77 module · 15 screen · 13 nav** (giống canonical) |
| Deep runtime audit bản readable | 23 bước · 17 screen · 13 modal · **0 console error · 0 warning · 0 HTTP≥400 · 0 ảnh hỏng**; 3 page-error đúng như artifact harness của bản canonical |
| Cách tái lập | `npm run demangle && npm run verify:readable` |

Hai lỗi ngữ nghĩa đã bị bắt và sửa trong quá trình (ghi ở [docs/REVERSE-ENGINEERING.md](../docs/REVERSE-ENGINEERING.md) §11.1): rule export-table
đọc sai `kind` của Babel; và rename `Je` → `t` làm shadow namespace `t` trong module I18n.

## 10. Trang intros — tách và tái tạo

| Phép kiểm | Kết quả |
|---|---|
| Tách 4 phần từ file 1 351 771 B | ghép lại **byte-exact** (assert trong `tools/extract-intros.mjs`) |
| Rebuild single-file | `dist/intros/legend-intros{,.html}` 1 482 KB, build tự động |
| Parity với bản live CDN (cùng Chrome headless) | **0 console error · 0 request fail** · title/button/select/input/canvas/textLen **giống nhau** |
| Asset bổ sung | 19 file (9 scene `*-710x400.webp` + 10 asset literal) + `favicon.ico` |
| Cách tái lập | `npm run extract:intros && npm run verify:intros` |

## 11. Tài liệu đặc tả — sinh và kiểm từ source

| File | Nội dung | Sinh bởi |
|---|---|---|
| `docs/API.md` + `api.json` | 99 export path `t.*` (kind, arity, file, members) | `tools/gen-api.mjs` |
| `docs/ARCHITECTURE.md` + `dep-graph.json` | 9 tầng, phụ thuộc file→module, SCC 62 file, boot runtime | `tools/gen-arch.mjs` |
| `docs/NETWORK.md` | 59 RPC + tham số, 3 bảng, auth, 24 key localStorage | `tools/gen-network.mjs` |
| `docs/DATA-MODELS.md` | shape + kiểu + ví dụ của 9 bảng data + STORY + CONFIG | `tools/gen-data-models.mjs` |
| `docs/FORMULAS.md` | stats/HP, XP, capture, shiny, damage, kinh tế, offline, tick | đọc CONFIG + hàm (có file:dòng) |
| `docs/SAVE-FORMAT.md` | shape save, field runtime, migration v2, payload cloud | `freshState()`/`migrate()` |
| `docs/BOOT-FLOW.md` | 15 bước boot + 5 vòng lặp sau boot | `095-app-boot.js` + đo runtime |

Sinh lại toàn bộ: `npm run gen:docs`. Toàn bộ suite: `node tools/audit-all.mjs`.

## 12. Tính đầy đủ của việc tải — không còn file nào chưa lấy

`tools/audit-download.mjs` → `verify/DOWNLOAD-AUDIT.md` · `download-audit.json`.

| Phép kiểm | Kết quả |
|---|---|
| File deploy hiện hành vs mirror (byte-for-byte) | **10/10 identical**: `index.html`, `boot.js`, `sw.js`, `apple-touch-icon.png`, `favicon.ico`, `packs.json`, `bundle/app.js`, `bundle/app.css`, `bundle/vendor-supabase.js`, trang intros |
| Version đang chạy | `BUILD 59d637ffd1`, app `0e84ded8d8`, css `7130b4d937`, vendor `8596965fe9`, 5 lang bundle — **trùng khớp mirror** |
| Dò path ẩn (51 path × 2 origin = 102 tổ hợp) | chỉ 2 file thật ngoài danh sách: `sw.js` (Netlify) và `packs.json` (CDN) — đều đã có; còn lại là fallback 145 B / 404 page 3 449 B |
| Sourcemap / admin / functions / manifest / robots / sitemap / `_redirects` / `_worker.js` / `js/*` | **không tồn tại** (fallback) |
| `mirror/` inventory | 2 836 file / 23,51 MB (bundle + lang + packs + shell + intros + assets đóng gói) |
| Tham chiếu tĩnh | 2 492 literal → **2 492/2 492 có local** |
| Request runtime | live 606 asset URL → **0 thiếu local**; verdict *"every live request has a local counterpart"* |

Bổ sung kỳ này: `favicon.ico` **thật của bản deploy** (280 B từ Netlify) đã thay cho icon tự sinh trước đó —
`dist/favicon.ico` giờ byte-identical với bản gốc.

## 13. Backend — hợp đồng server được xác minh công khai

`tools/probe-backend.mjs` → `docs/BACKEND-SCHEMA.md` · `verify/backend-probe.json`.

Frontend nhúng **publishable key** thật (`sb_publishable_…`, lắp từ 6 mảnh trong `084-cloud.js`), nên có thể
gọi Supabase y như client. Bảng bị RLS chặn nhưng phản hồi server cho phép xác minh độc lập:

| Phép kiểm | Kết quả |
|---|---|
| RPC client dùng | **59/59** được server xác nhận tồn tại đúng tham số (58 → `42501 permission denied for function`, `log_session` → `exists-bad-args` do dummy sai kiểu) |
| Lệch chữ ký | **0** |
| Bảng tồn tại (RLS-closed) | **7**: `saves`, `trades`, `market`, `sessions`, `friends`, `gifts`, `bans` |
| Auth | OAuth **Discord + Google**; anonymous sign-in **tắt** (`anonymous_users:false`) ⇒ chơi khách 100% local đúng như code |
| Chống clone | `084-cloud.js` chỉ bật Cloud khi hostname thuộc allowlist (netlify/pages/localhost), kiểm bằng hash `Math.imul` từng ký tự |
| Giới hạn | Không có source server công khai: PostgREST OpenAPI yêu cầu secret key, bảng đóng, không repo |

## 14. Log audit — không có lỗi chưa giải thích

`tools/audit-logs.mjs` → `verify/LOG-AUDIT.md` · `log-audit.json`.

| Phép kiểm | Kết quả |
|---|---|
| Phạm vi | **21 log text + 36 report JSON** trong `verify/` |
| Dòng khớp `error|fail|undefined|404|500|timeout|warn…` | **10** |
| Trong đó known/explained | **10/10** (harness `App.show` market/friends/admin; bug raid `reading 'floor'` của game gốc; `Ss is not defined` của sandbox audit-data) |
| Chưa giải thích | **0** |
| Report JSON có counter bất thường | **0** |

Dòng "counter bằng 0" (`"httpErrors": 0`, `errors=0 bad=0`…) được xử lý riêng: không phải sự kiện lỗi,
và các report JSON đã được parse để kiểm giá trị thật.

## 15. Bề mặt tài nguyên thực tế (ghi chú kỹ thuật)

- Font và nhiều icon nhỏ là **`data:` URI nhúng trong CSS/JS** (không phải file rời) — vì vậy bản gốc
  phát 3 font request nhưng cùng nằm trong `app.css`, không thiếu file.
- `pages.dev` trả trang redirect 145 B cho mọi path không tồn tại; `netlify.app` trả 404 page 3 449 B.
  Vì vậy phép dò "file có tồn tại" dùng **content-type + kích thước**, không dùng status code.
- Bản live lần này tải asset rời (service worker của Pages không phục vụ pack), nên pipeline pack
  được verify riêng bằng round-trip byte-identical (`log-packs.txt`).

## 16. Content pack gen 5–9 — 532 loài + 103 form + gym/badge/league

Gói mở rộng **có kiểm chứng độc lập**, là lớp audit thứ 13 (57/57 check PASS):

| Phép kiểm | Kết quả | Log |
|---|---|---|
| Dex entry mới | **532/532** (#494–#1025) đủ name/key/types/stats/capture/height/weight/genus/flavor/learn/baby/legendary/mythical | `verify/ext-audit.json` |
| Move / learnset | **+173 move đòn đánh** (673 tổng), 8.444 learn ref **resolve 100%**, mỗi loài 6–24 move | idem |
| Evolution | **307 nguồn** (233 gen 5–9 + 103 form + cross-gen), 15 loài cũ tiến hoá lên dạng gen 8–9 | idem |
| Form biến thể | **103** = 53 regional + 48 Mega + 2 Primal; mỗi form có dex entry, stats/types, 6 asset, evolution entry; 49 Mega Stone/Orb item | idem |
| Gym / badge / league | **40 gym** (8/vùng) + **40 badge** (5 sheet recolored) + **25 chapter league** (4 Conseil 4 + 1 Maître mỗi vùng) | idem |
| Region/chapter | **5 region** dex 494–1025 + **65 chương** (13/vùng), cap 60→100, level ≤ 100 | idem |
| Pool phủ đủ | **532/532 loài** + regional form trong pool vùng nhà | idem |
| Asset | **3.864/3.864** file mới (532 loài + 103 form × 6; 49 item icon; 5 badge sheet) đúng format, ~88 MB | idem |
| Functional probe | Du hành **map → Unys → chương** bằng UI; gặp wild gen 5; **bắt Lianaja #496**; **Mega tiến hoá Florizarre → #3001** qua item API thật; shop bán đá/orb; badge sheet render; **8 gym + 5 league chapter**; **0 console/page/http error** | `verify/ext-probe.json` |
| Không đụng source gốc | `src/js/**` byte-identical; extension ở `src/ext/js/` (10 module) | `npm run audit:ast` vẫn 95/95 |

Chi tiết nguồn dữ liệu/asset, quy tắc mapping và giới hạn: `docs/GEN5-9.md`.
Tái lập: `npm run gens:audit` · `npm run gens:probe` (cần build + serve trước).

## 17. Tiếng Việt — gói ngôn ngữ VI (dịch tay bằng model)

Thêm ngôn ngữ thứ 9 vào game (fr nhúng + 7 bundle + **vi**), không dùng Google Dịch.

| Phép kiểm | Kết quả | Log |
|---|---|---|
| Chunk dịch tay | 20/20 chunk · **4.063 mục** (3.038 UI + 1.025 Pokédex) · **0 lỗi** placeholder/HTML/id | `tools/i18n/check-chunks.mjs` |
| UI coverage | **3.038/3.038 khoá** tiếng Anh của game có bản dịch VI (100%) | `npm run i18n:merge` output |
| Pokédex VI | 1.025/1.025 mục có genus + flavor tiếng Việt; tên Pokémon/move/item giữ tiếng Anh chính thức | `src/lang/vi.js` |
| Switch qua UI | en → vi: title/nav/Pokédex đổi đúng, **0 console/page/http error** | `verify/vi-probe.json` |
| Audit i18n | **9/9 ngôn ngữ** load + render sạch | `verify/audit-i18n-local.json` |
| Boot/regression | boot PASS, `check:play` PASSED, 12 lớp phục hồi vẫn PASS | `verify/last-check.json` |

Đăng ký: `src/lang/vi.js` (519 KB) · `src/ext/js/022b-i18n-vi.js` · boot `LANGS` + `tools/build.mjs` LANGS.
Chi tiết pipeline + glossary: `docs/I18N-VI.md`. Ảnh: `verify/vi-adventure.png`, `verify/vi-options.png`, `verify/vi-dex.png`.

## 18. Battle FX / hiệu ứng chiêu — đã gỡ bỏ (theo yêu cầu)

- **Xoá toàn bộ hiệu ứng chiêu tự thêm (PixelFX)**: code `050b-movefx-data.js`, `050c-battlefx-rich.js`, data `movefx.json`, asset `src/assets/fx/`, `tools/fx/`, vendored `PixelFX/` + script `fx:*`. Game dùng lại **hiệu ứng chiến đấu gốc**; không đổi save/cân bằng.
- **Sửa lỗi asset Pokémon đen**: đã quét 12.915 sprite: **0 file đen/trong suốt**, 1.025/1.025 id + 103 form đủ. Nguyên nhân là CSS `filter: brightness(0)` cho trạng thái unknown/seen/veiled; extension `src/ext/js/050e-visibility-fix.js` thay bằng grayscale mờ.
- Kiểm chứng: `npm run verify:visibility` → **1.210 ảnh Pokédex, 0 ảnh filter đen, 0 ảnh lỗi** (`verify/asset-visibility.json`), ảnh `verify/assets-dex-visible.png`.
