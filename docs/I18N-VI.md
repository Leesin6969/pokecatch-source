# Tiếng Việt — gói ngôn ngữ VI cho Poke'Catch

Game gốc có 8 ngôn ngữ (fr nhúng + 7 bundle: en, es, de, zh-Hans, zh-Hant, ko, ja). Repo thêm
**tiếng Việt (vi)** — bản dịch tự nhiên do model dịch tay, không dùng Google Dịch.

## 1. Cấu trúc một gói ngôn ngữ

Lang bundle (`src/lang/<lang>.js`) chứa **2 khối**:

```js
(((window.I18N_DATA = window.I18N_DATA || {}).vi = {
  pokemon: { 1: ["Bulbasaur", "Pokémon Hạt giống", "Khi còn nhỏ, ..."] }, // [tên, genus, flavor]
  moves:   { tackle: "Tackle", ... },                                    // tên move
  items:   { "fire-stone": "Fire Stone", ... },                          // tên item
}),
  ((window.I18N = window.I18N || {}).vi = {
    "Aventure": "Phiêu lưu",                 // khoá = câu gốc tiếng Pháp, value = bản dịch
    "Niveau {n}": "Cấp {n}",
  }));
```

- `I18N_DATA.vi` được module `022-i18n.js` áp lúc boot: đổi tên/genus/flavor của `t.POKEDEX`,
  tên `t.MOVES`, tên `t.ITEM_NAMES` (chỉ với POKEDEX id có mặt trong map).
- `I18N.vi` là từ điển UI: `e("Aventure")` tra `I18N[lang]["Aventure"]`; thiếu thì fallback
  `I18N.en` rồi mới hiện tiếng Pháp.
- Boot loader (`src/boot/boot.template.js`) phát hiện ngôn ngữ trình duyệt (`navigator.languages`)
  theo danh sách `LANGS`, lưu lựa chọn ở `localStorage["pokecatch.lang"]`, tải bundle tương ứng.
  `tools/build.mjs` hash file lang thành `bundle/lang-vi.<hash>.js`.

## 2. Đăng ký tiếng Việt

| File | Thay đổi |
|---|---|
| `src/lang/vi.js` | bundle vi (I18N_DATA + I18N), ~519 KB |
| `src/boot/boot.template.js` | `LANGS` thêm `"vi"` (tự nhận `vi-VN`) |
| `tools/build.mjs` | `LANGS` thêm `'vi'` (hash + gắn `LANG_FILES`) |
| `src/ext/js/022b-i18n-vi.js` | thêm `t.I18n.NAMES.vi = "Tiếng Việt"` (options screen) |
| `tools/audit-i18n.mjs` | kiểm 9 ngôn ngữ thay vì 8 |

## 3. Nguồn & phong cách dịch

- **Dịch tay bằng model**, chia 20 chunk song song (10 chunk UI × ~304 chuỗi, 10 chunk Pokédex × ~103 mục)
  với glossary thống nhất: Aventure→Phiêu lưu, Badge→Huy hiệu, Dresseur→Huấn luyện viên, Ligue→Liên đoàn,
  Conseil 4→Tứ Thiên Vương, shiny→dạng sáng, Pension→Nhà trẻ Pokémon…
- Văn phong: tiếng Việt tự nhiên như game mobile VN, xưng "bạn", câu ngắn gọn, không Hán-Việt nặng,
  không dịch word-by-word.
- **Giữ tiếng Anh chính thức** cho: tên Pokémon, tên move, tên item (thói quen người chơi Việt);
  dịch tiếng Việt: toàn bộ UI, genus/flavor Pokédex, tên vùng/badge/chương/form/shop của pack gen 5–9.
- **Bảo toàn tuyệt đối**: placeholder `{name}`, `{n}`, cú pháp Hàn `{/.../...}`, thẻ HTML, số, %, ×, ₽,
  emoji, dấu xuống dòng. `tools/i18n/check-chunks.mjs` đối chiếu **4.063 mục → 0 lỗi**.

## 4. Pipeline tái lập

```powershell
npm run i18n:prep    # sinh 20 job chunk từ src/lang/en.js + PokéAPI cache
# (dịch: các agent đọc .cache/i18n/jobs/*.json → ghi .cache/i18n/out/*.json theo glossary)
npm run i18n:check   # validate 20 chunk: đủ key/id, placeholder/HTML khớp, không rỗng
npm run i18n:merge   # gộp + custom nội dung gen 5–9 → src/lang/vi.js
npm run build        # boot.js + bundle/lang-vi.<hash>.js
npm run i18n:probe   # browser: en → vi qua UI, kiểm nav/title/Pokédex, screenshot
npm run audit:i18n   # 9/9 ngôn ngữ sạch
```

## 5. Kiểm chứng

| Phép kiểm | Kết quả |
|---|---|
| Chunk dịch | 20/20 chunk, **4.063 mục, 0 lỗi** placeholder/HTML/id (`i18n:check`) |
| UI coverage | **3.038/3.038 khoá** tiếng Anh của game có bản dịch VI (100%) |
| Pokédex | 1.025/1.025 mục có genus + flavor tiếng Việt |
| Switch qua UI | en → vi: title/nav/Pokédex đổi đúng, **0 console/page/http error** (`verify/vi-probe.json`) |
| Audit i18n | **9/9 ngôn ngữ** load + render sạch (`verify/audit-i18n-local.json`) |
| Boot/regression | boot PASS, check:play PASSED, local = live 1:1 (12 lớp) |

Ảnh: `verify/vi-adventure.png` (hội thoại GS. Oak), `verify/vi-options.png` (danh sách 9 ngôn ngữ),
`verify/vi-dex.png`.

## 6. Giới hạn

- Tên Pokémon/move/item giữ tiếng Anh (có chủ đích); nếu muốn Việt hoá tên move/item có thể bổ sung map
  trong `tools/i18n/merge-vi.mjs` rồi chạy lại `i18n:merge`.
- Một số chuỗi tiếng Pháp phát sinh từ dữ liệu gốc (tên riêng địa danh, badge của 4 vùng gốc) vẫn hiển
  thị tiếng Pháp/Anh theo dữ liệu gốc — không ảnh hưởng UI.
- Flag icon tiếng Việt trong options dùng ký hiệu mặc định của game (không có SVG riêng).
