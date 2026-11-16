# Battle FX — đã gỡ bỏ (theo yêu cầu)

Toàn bộ **hiệu ứng chiêu tự thêm** đã được xoá khỏi repo:

- `src/ext/js/050b-movefx-data.js`
- `src/ext/js/050c-battlefx-rich.js`
- `src/ext/data/movefx.json`
- `src/assets/fx/` (PixelFX bundle)
- `tools/fx/`
- `PixelFX/` (vendored source)
- các script `npm run fx:*`

Game dùng lại **hiệu ứng chiến đấu gốc** trong bundle chính. Không còn banner kỹ năng, canvas overlay,
nova/aurora/set-piece, hit-stop/tint do extension tạo; save/cân bằng không đổi.

## Sửa lỗi asset Pokémon đen

Sprite Pokémon trong repo **đều hợp lệ** (đã quét 12.915 file: 0 file đen/trong suốt, 1.025/1.025 id +
form đủ). Nguyên nhân hiển thị đen là CSS tô silhouette cho trạng thái `unknown/seen/veiled`.

Extension `src/ext/js/050e-visibility-fix.js` thay filter đen bằng **grayscale mờ**, nên mọi sprite
hiển thị đúng ảnh thật. Kiểm chứng: `npm run verify:no-fx` → `verify/no-fx.json` (t.PixelFX/MOVE_FX undefined, không còn .pfx-canvas/banner, base BattleFX vẫn chạy); `npm run verify:visibility` → `verify/asset-visibility.json`
(**1.210 ảnh Pokédex, 0 ảnh bị filter đen, 0 ảnh lỗi**), ảnh `verify/assets-dex-visible.png`.
