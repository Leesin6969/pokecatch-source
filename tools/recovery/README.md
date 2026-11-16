# tools/recovery — pipeline phục hồi source

Các script **một lần** đã dùng để dựng lại `src/` từ artifact công khai trong `mirror/`.
Chạy từ thư mục gốc repo. Không cần chạy lại để build game — dùng `tools/build.mjs`.

> Script audit runtime (dùng thường xuyên, không phải pipeline một lần):
> `tools/audit-data.mjs`, `tools/audit-runtime.mjs`, `tools/audit-i18n.mjs`, `tools/audit-diff.mjs`,
> `tools/audit-assets-loop.mjs`, `tools/probe-cdn.mjs`, `tools/fetch-missing.mjs`.
> Kết quả + log: `verify/AUDIT.md`.

## Thứ tự chạy (nếu muốn tái lập từ đầu)

```bash
# 0. tải artifact gốc (chỉ cần nếu xoá mirror/)
curl -sSL https://pokecatch-online.pages.dev/boot.js -o mirror/boot.js
# … bundle/app.*.js, app.*.css, vendor-supabase.*.js, lang-*.js, packs.json, packs/*.bin,
#    shell https://pokecatch-online.netlify.app/ (index.html, sw.js, apple-touch-icon.png)

node tools/recovery/extract-packs.mjs    # packs.json + pack-*.bin  -> 1468 file trong mirror/assets
node tools/recovery/extract-source.mjs   # bundle app.js           -> src/js/ (96 file) + _manifest.json
                                         #   assert round-trip: ghép lại == bundle gốc từng byte
node tools/recovery/extract-shell.mjs    # boot.js                 -> src/boot/ + src/shell/ + sw template
node tools/recovery/extract-assets.mjs   # mirror/assets           -> src/assets, vendor, lang
node tools/extract-intros.mjs            # trang intros 1,35 MB    -> src/intros/{shell.html,app.css,boot.js,app.js}
                                         #   assert ghép lại == file CDN từng byte
node tools/recovery/format-src.mjs       # prettier mọi file + verify AST 95/95 với chunk gốc
node tools/demangle.mjs                  # src/js                    -> src/readable/js (de-mangle có kiểm chứng)
node tools/verify-readable.mjs           # chứng minh alpha-equivalence + build + boot + audit
node tools/gen-docs.mjs                  # MODULES.md + DATA.md
npm run gen:docs                         # docs/API · ARCHITECTURE · NETWORK · DATA-MODELS
node tools/recovery/fetch-assets.mjs     # tải 1334 asset lẻ còn thiếu (path literal trong bundle+css)
node tools/recovery/fetch-derived.mjs    # tải asset tên tính runtime (140 chân dung trainer)
node tools/recovery/fetch-small.mjs assets/bg/underground/*.png   # vài file lẻ còn lại
```

## Script phân tích (đọc để hiểu bundle)

| Script | Việc |
|---|---|
| `analyze.mjs` | parse `app.js`, đếm top-level node, liệt kê assignment `t.X` |
| `analyze2.mjs` | trích registry 77 module (`get X(){return Sa?Sa.X:Oo}` → tên module → biến) |
| `analyze3.mjs` | tìm nơi định nghĩa biến module |
| `analyze4.mjs` | liệt kê `t.<Name> = …` theo thứ tự byte, xuất ra `mirror/module-order.json` |
| `analyze5.mjs` | chứng minh statement 3 là `SequenceExpression` gồm 95 phần tử = 95 file gốc |
| `analyze6.mjs` | map từng chunk → module nó định nghĩa (`mirror/chunk-names.json`) |
| `analyze7.mjs` | tìm `t.Screens.*` / `t.UI.*` bên trong các IIFE để đặt tên file |
| `analyze-boot.mjs` | cấu trúc `boot.js` (3 phần: html attrs, Theme, loader) |
| `paths.mjs` | trích mọi literal đường dẫn `assets/… js/…` → danh sách phải tải |
| `patterns.mjs` | tìm template literal động (`assets/bg/scenes/${x}-710w.webp`) |
| `coverage.mjs` | so path tham chiếu vs file đã có → liệt kê thiếu |
| `audit-trainers.mjs` | trích 140 key sprite trainer từ source |

## Script chẩn đoán runtime (headless Chrome)

Các script này trỏ vào dev/serve server đang chạy (xem `README.md`):
| Script | Việc |
|---|---|
| `debug.mjs` | dump globals/localStorage/DOM/screens + thử click |
| `title.mjs` | tìm overlay title, đi tiếp flow |
| `lab.mjs` | quan sát từng bước handoff title → trainer lab |
| `modal.mjs` | dump DOM modal starter |
| `missing.mjs` | liệt kê mọi HTTP 404 trong lúc chơi thử |

## Giai đoạn 3 — reverse sâu (script nằm ở `tools/`, không phải `tools/recovery/`)

Sau khi đã có cây canonical byte-faithful, các script sau khai thác thêm ngữ nghĩa:

| Script | Việc |
|---|---|
| `tools/demangle.mjs` | sinh cây readable `src/readable/js/`: rename module slot, helper prelude, bảng export `t.X={key:local}`, alias namespace; cấm shadow/merge binding |
| `tools/verify-readable.mjs` | chứng minh alpha-equivalence (lockstep AST + binding 1:1 + unresolved globals), build + boot + deep audit cây readable |
| `tools/extract-intros.mjs` | tách trang Atelier intros 1,35 MB thành shell.html + app.css + boot.js + app.js; assert ghép lại byte-exact |
| `tools/intros-assets.mjs` / `tools/intros-scenes.mjs` | bổ sung asset mà trang intros gọi (literal + 9 scene `*-710x400.webp`) |
| `tools/verify-intros.mjs` | mở bản rebuild cạnh bản live CDN, so DOM stats + lỗi |
| `tools/gen-api.mjs` | `docs/API.md`: 99 export path, kind/arity/file/members |
| `tools/gen-arch.mjs` | `docs/ARCHITECTURE.md` + `dep-graph.json`: tầng, phụ thuộc, SCC |
| `tools/gen-network.mjs` | `docs/NETWORK.md`: 59 RPC + tham số, bảng, auth, localStorage key |
| `tools/gen-data-models.mjs` | `docs/DATA-MODELS.md`: shape/kiểu/ví dụ 9 bảng data + STORY + CONFIG |
| `tools/audit-all.mjs` | chạy toàn bộ suite 12 lớp, in summary PASS/FAIL |
| `tools/audit-download.mjs` | chứng minh tải đủ: 10/10 artifact live byte-identical + dò 76 path ẩn × 2 origin |
| `tools/audit-references.mjs` | quét mọi tham chiếu tĩnh (bundle/css/html/lang/packs/intros) → 2 492/2 492 có local |
| `tools/audit-requests-diff.mjs` | diff toàn bộ request runtime live vs cây local |
| `tools/audit-logs.mjs` | phân loại mọi dòng lỗi trong `verify/*.log|json` → `LOG-AUDIT.md` |
| `tools/probe-backend.mjs` | gọi Supabase bằng publishable key: 59/59 RPC + 7 bảng + auth settings → `BACKEND-SCHEMA.md` |
| `tools/live-vs-mirror.mjs` | so BUILD/hash bản live với mirror (phát hiện deploy mới) |
