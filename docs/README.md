# docs/ — tài liệu reverse sâu của Poke'Catch

Sinh và kiểm từ chính source trong repo (không phải mô tả bên ngoài). Sinh lại: `npm run gen:docs`.

| File | Nội dung | Sinh bởi |
|---|---|---|
| [API.md](API.md) · [api.json](api.json) | 99 export path trên namespace `t.*`: kind, arity, file, member list | `tools/gen-api.mjs` (AST) |
| [MODULE-SYSTEM.md](MODULE-SYSTEM.md) | Cơ chế lõi: namespace proxy `t`, `__seal`/lock, thứ tự nạp 95 file, vì sao lazy refs an toàn | đọc `000-prelude.js` + đo runtime |
| [ARCHITECTURE.md](ARCHITECTURE.md) · [dep-graph.json](dep-graph.json) | 9 tầng, bảng phụ thuộc file→module, strongly-connected components, điểm vào runtime | `tools/gen-arch.mjs` |
| [FORMULAS.md](FORMULAS.md) | stats/HP, XP & level, capture, shiny, damage (Gen-3 idle hoá), kinh tế, offline, tick | đọc `018-config.js` + hàm liên quan, có file:dòng |
| [SAVE-FORMAT.md](SAVE-FORMAT.md) | shape `freshState()`, field runtime từng module, migration, payload cloud | `030-game.js` / `084-cloud.js` |
| [NETWORK.md](NETWORK.md) | 59 RPC + tham số, 3 bảng, OAuth, thiết bị anon, 24 key localStorage | `tools/gen-network.mjs` (AST) |
| [BACKEND-SCHEMA.md](BACKEND-SCHEMA.md) | Xác minh công khai: 59/59 RPC tồn tại đúng tham số, 7 bảng RLS-closed, auth settings, cơ chế chống clone | `tools/probe-backend.mjs` (gọi Supabase bằng publishable key) |
| [DATA-MODELS.md](DATA-MODELS.md) | field + kiểu + ví dụ của POKEDEX/MOVES/EVOLUTIONS/ENCOUNTERS/HABITATS/SCENES/…/CONFIG/STORY | `tools/gen-data-models.mjs` |
| [BOOT-FLOW.md](BOOT-FLOW.md) | 15 bước boot từ URL tới gameplay + 5 vòng lặp sau boot | `095-app-boot.js` + đo runtime |
| [GEN5-9.md](GEN5-9.md) | Content pack gen 5–9: 532 Pokémon mới, 103 form, gym/badge/league, nguồn asset, mapping, giới hạn | `tools/gens/*` + `verify/ext-*.json` |
| [I18N-VI.md](I18N-VI.md) | Gói tiếng Việt: cấu trúc lang bundle, nguồn/phong cách dịch tay, pipeline 20 chunk, kiểm chứng 9/9 ngôn ngữ | `tools/i18n/*` + `verify/vi-*.json` |
| [BATTLE-FX.md](BATTLE-FX.md) | **Đã gỡ bỏ hiệu ứng chiêu tự thêm** (game dùng FX gốc); ghi chú sửa lỗi asset Pokémon đen | `src/ext/js/050e-visibility-fix.js`, `verify/asset-visibility.json` |
| [REVERSE-ENGINEERING.md](REVERSE-ENGINEERING.md) | Hồ sơ kỹ thuật phục hồi: mục tiêu, artifact hash, phương pháp 8 bước, cấu trúc bundle, bằng chứng AST | `tools/recovery/*` + `verify/AUDIT.md` |

## Đọc code kèm tài liệu

- Cây canonical (byte-faithful): `src/js/` — tên biến minified, dùng để đối chiếu bundle gốc.
- Cây readable (de-mangled): `src/readable/js/` — cùng nội dung, tên binding đã khôi phục; xem
  `src/readable/js/_rename-manifest.json` để biết bảng đổi tên và thống kê từng file.
- Muốn chạy bản readable: `npm run build:readable` rồi serve `.cache/readable-dist`.
- Kiểm chứng: `npm run verify:readable` (alpha-equivalence + boot + deep audit).

## Trạng thái kiểm chứng

Toàn bộ số liệu trong các file này là kết quả máy kiểm, không phải ước lượng:

| Kiểm chứng | Log |
|---|---|
| Alpha-equivalence cây readable | `../verify/readable-report.json` |
| Trang intros parity với live | `../verify/intros-report.json` |
| Audit 8 lớp (source/asset/runtime/i18n/deploy/readable/intros/docs) | `../verify/AUDIT.md` |
| Audit content pack gen 5–9 (57 check + probe) | `../verify/ext-audit.json` · `../verify/ext-probe.json` |
| Tái lập toàn bộ | `node tools/audit-all.mjs` |
