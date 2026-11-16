# DOWNLOAD AUDIT — bằng chứng đã tải toàn bộ code/source gốc

Sinh bởi `tools/audit-download.mjs` lúc 2026-11-15T10:04:30.737Z. Mục tiêu: chứng minh **không còn file nào của bản deploy gốc chưa được tải**.

## 1. Deploy artifacts — so byte với mirror

| artifact | HTTP | live bytes | mirror file | local bytes | identical | sha256[0:16] |
|---|---|---|---|---|---|---|
| index.html | 200 | 4715 | `mirror/index.html` | 4715 | **✔** | `c316581f008ed52c` |
| boot.js | 200 | 48986 | `mirror/boot.js` | 48986 | **✔** | `74ffb1ee23ec37c1` |
| sw.js | 200 | 5427 | `mirror/sw.js` | 5427 | **✔** | `ff9a281d6c608ea2` |
| apple-touch-icon.png | 200 | 659 | `mirror/apple-touch-icon.png` | 659 | **✔** | `1e407510e67e8f04` |
| favicon.ico | 200 | 280 | `mirror/deploy/favicon.ico` | 280 | **✔** | `5c771db791abd747` |
| packs.json | 200 | 81173 | `mirror/packs.json` | 81173 | **✔** | `d18264c40fb9faa8` |
| bundle/app.js | 200 | 2701707 | `mirror/bundle/app.js` | 2701707 | **✔** | `0e84ded8d8485f2e` |
| bundle/app.css | 200 | 671506 | `mirror/bundle/app.css` | 671506 | **✔** | `7130b4d937e06bcb` |
| bundle/vendor-supabase.js | 200 | 110797 | `mirror/bundle/vendor-supabase.js` | 110797 | **✔** | `8596965fe918e656` |
| intros page | 200 | 1354941 | `mirror/intros/legend-intros.html` | 1354941 | **✔** | `338dbdfbc89872c4` |

## 2. Dò file ẩn / metadata deploy

Đã thử **102** tổ hợp (path × 2 origin). Chỉ những cái `real` mới là file thật; còn lại là
trang fallback của Pages/Netlify (145 B và 3 449 B) — không phải file tồn tại.

**File thật tìm thấy:**

| origin | path | bytes | type |
|---|---|---|---|
| netlify | `/sw.js` | 5427 | application/javascript; charset=UTF-8 |
| cdn | `/packs.json` | 81173 | application/json |

Các path còn lại (100) đều là fallback/404 → **không tồn tại** ở upstream.
Đáng chú ý: `/sw.js` chỉ có trên Netlify origin; `pages.dev` trả fallback redirect cho mọi path không phải file tĩnh.
Không có sourcemap (`.map`), không có thư mục `js/`, `src/`, `api/`, `.netlify/functions`, `_worker.js`, `_redirects`.

## 3. Mirror inventory

- `mirror/`: **2836 file / 23.51 MB**
- `mirror/deploy/`: `favicon.ico`, `manifest-404.html`, `pages-fallback.html`, `robots-404.html` (favicon thật + trang fallback/404 để làm bằng chứng phân biệt)
- `packs.json`: NaN entry (asset đóng gói như bản gốc)
- Bundle gốc: `mirror/bundle/app.js` 2 701 707 B + `app.css` 671 506 B + 7 lang bundle + vendor supabase.

## 4. Tham chiếu tĩnh — mọi path code/asset game có thể gọi

- Quét 12 artifact: **2492** đường dẫn literal → **2492** có trong cây local, **0** thiếu.
- Trong số thiếu: **0** thật sự có trên CDN (lỗ hổng), còn lại là upstream-absent (game gốc fallback).

## 5. Request runtime — mọi URL game thực sự tải

- Kết luận: **every live request has a local counterpart**
- Live tải **606** asset URL; thiếu ở local: **0**; role thiếu: **0**.
- Chi tiết: `verify/requests-diff.json` (6 khoá).

## 6. Kết luận

**PASS** — mọi artifact của bản deploy hiện hành đều có trong repo **byte-identical**; không có file ẩn/sourcemap/endpoint code nào tồn tại thêm; mọi path tĩnh và mọi request runtime đều trỏ tới file đã có (hoặc fallback đã biết của upstream).
