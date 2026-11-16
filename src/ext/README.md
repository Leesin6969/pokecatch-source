# src/ext — extension layer (content pack gen 5–9)

Thư mục này chứa nội dung **tự viết thêm**, tách khỏi source phục hồi trong `src/js/`.
Mục đích: giữ `src/js/**` byte/AST-faithful với bundle production gốc (bằng chứng phục hồi vẫn
đúng nguyên vẹn) trong khi vẫn thêm được 532 Pokémon gen 5–9 + 103 form + gym/badge/league.

## Cơ chế

`tools/build.mjs` đọc cả `src/js/*.js` và `src/ext/js/*.js`, gộp lại và **sort theo tên file**;
các file extension được đánh số `NNNb`/`NNNc` để chen đúng vị trí.

| File | Load sau | Nội dung |
|---|---|---|
| `js/003b-gen5to9-pokedex.js` | `003-pokedex.js` | `t.POKEDEX.push(...)` 532 entry #494–#1025 |
| `js/004b-gen5to9-evolutions.js` | `004-evolutions.js` | evolution gen 5–9 (233 nguồn) |
| `js/004c-gen5to9-forms-evos.js` | `004b` | evolution cho regional/Mega/Primal (Mega = đá) |
| `js/005b-gen5to9-moves.js` | `005-moves.js` | 173 move đòn đánh gen 5–9 |
| `js/014b-gen5to9-baseexp.js` | module base-exp cuối | base exp 532 loài |
| `js/017b-gen5to9-forms.js` | `017-forms.js` | 103 form dex entry + patch FORMS/SPECIALS (art) |
| `js/019c-gen5to9-items.js` | `019-item-names-2.js` | 49 Mega Stone / Orb item |
| `js/022b-i18n-vi.js` | `022-i18n.js` | đăng ký tên ngôn ngữ "Tiếng Việt" cho options screen |
| `js/050b-movefx-data.js` | `050-battle-fx.js` | dữ liệu plan 673 move → PixelFX (cast/move/impact/palette) |
| `js/050c-battlefx-rich.js` | `050-battle-fx.js` | runtime battle FX PixelFX: wrapper `t.BattleFX`, overlay canvas, banner HUD, hit-stop/shake/tint, status observer, fallback |
| `js/031b-gen5to9-league-teams.js` | `031-league-teams.js` | 20 line-up Conseil 4 themed |
| `js/094b-gen5to9-story.js` | `094-sleep.js` | 5 vùng + 65 chương gym/league + badge sheet patch |
| `js/094c-gen5to9-shop.js` | `094b` | bán Mega Stone/Orb trong shop |

Thứ tự này quan trọng: `030-game.js` dựng `DEX`, `PREVO`, `FAMILY_LINKS` **lúc load** từ
`t.POKEDEX` + `t.EVOLUTIONS`, nên dữ liệu mới phải có mặt trước `030`.

## Sinh lại

```powershell
npm run gens:fetch        # PokéAPI + manifest PokéSprite v2 → .cache/gens/raw
npm run gens:assets       # asset 532 loài (3.192 file)
npm run gens:stills       # art/still từ frame đầu gif (Python + Pillow)
npm run gens:forms        # dữ liệu + asset 103 form (618 file) + 49 item
npm run gens:forms:assets # form assets + badge sheet + orb icon (Python)
npm run gens:moves        # 173 move đòn đánh
npm run gens:data         # build-moves → build-data → build-story
npm run gens:build        # gens:data + build dist/
npm run gens:audit        # 57 check độc lập → verify/ext-audit.json
npm run gens:probe        # browser probe → verify/ext-probe.json
```

## Dữ liệu

- `data/gen5to9.json` — 532 entry (name/key/types/stats/capture/learn/genus/flavor) + region/chapter + coverage.
- `data/forms.json` — 103 form (regional/Mega/Primal): base, slug, label, types, stats, wild hints, items.
- `data/gyms.json` — 40 gym + badge + league (Elite 4/champion) cho 5 vùng.
- `data/moves.json` — 173 move đòn đánh mới (FR name/type/power/acc/cat).
- `data/*-assets.json` — báo cáo tải asset (nguồn, fallback, thiếu).

Chi tiết đầy đủ: [docs/GEN5-9.md](../../docs/GEN5-9.md).
