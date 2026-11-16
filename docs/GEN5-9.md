# Gen 5–9 content pack — 532 Pokémon mới, 103 form, 5 vùng có gym/badge/league

Gói mở rộng đưa game từ **493 loài (gen 1–4)** lên **1025 loài (gen 1–9)**, thêm **form biến thể
(regional/Mega/Primal)**, **hệ thống gym + badge + league** cho 5 vùng mới, và biến toàn bộ thành
nội dung bắt được/tiến hoá được/hiển thị đầy đủ trong game.

## 1. Kết quả

| Hạng mục | Trước | Sau |
|---|---|---|
| Loài National Dex | 493 | **1025** |
| Entry runtime trong `t.POKEDEX` (gồm form) | 556 | **1191** (+532 loài, +103 form) |
| Form biến thể | 63 (gen 1–4) | **166** (+53 regional, +48 Mega, +2 Primal) |
| Vùng Adventure | 4 | **9** (+Unys, Kalos, Alola, Galar, Paldea) |
| Chương | 66 | **131** (+65: 8 gym + 4 Conseil 4 + 1 Maître mỗi vùng) |
| Gym / badge / league | 32 gym | **72 gym** (+40), **72 badge** (+40), **25 chương league mới** |
| Move | 500 | **673** (+173 đòn đánh gen 5–9) |
| Evolution edge | 228 nguồn | **307 nguồn** (gồm 15 loài cũ → dạng gen 8–9, 103 form) |
| Asset Pokémon | 6.194 file | **9.432 file** (+532 loài ×6, +103 form ×6) |

- **Gen 5**: 156 loài (494–649) · **Gen 6**: 72 (650–721) · **Gen 7**: 88 (722–809) · **Gen 8**: 96 (810–905) · **Gen 9**: 120 (906–1025).
- 45 huyền thoại + 14 huyền ảo đều **bắt được** trong pool hoang dã của vùng (capture rate gốc).
- **103 form**: 53 regional (Alola/Galar/Hisui/Paldea + 3 giống Tauros), 48 Mega, 2 Primal.

## 2. Nguồn dữ liệu & asset (đúng nguồn game gốc đang dùng)

| Thành phần | Nguồn | Ghi chú |
|---|---|---|
| Tên FR, hệ, stats, capture rate, height/weight, genus, flavor, learnset, evolution | [PokéAPI v2](https://pokeapi.co) | cache `.cache/gens/raw/`, `.cache/gens2/raw/` |
| Icon 68×56 (loài + form, thường + shiny) | [PokéSprite v2](https://github.com/darknesspwnsu/pokesprite-v2) | đúng bộ icon gốc (trùng byte với icon game gốc) |
| Art gif (loài + form, thường + shiny) | [Pokémon Showdown](https://play.pokemonshowdown.com/sprites/) `gen5ani` → `ani` → `dex` | `gen5ani` là bộ game gốc dùng; fallback `ani`, 8 loài không có sprite động → still 1 frame |
| Art still | frame đầu của gif (Pillow) | giống cách bản gốc tạo `art/still` |
| Mega stone / orb icon | PokéSprite v2 `icons/mega-stone` | 46/49 có icon; 3 còn lại dùng icon orb/stone tương ứng (recolor) |

Đối chiếu nguồn: icon/gif của game gốc **trùng byte** với PokéSprite v2 / Showdown `gen5ani`
(pikachu 372 B / 27.223 B) nên asset mới cùng style, cùng pipeline.

## 3. Attack effects / skills / assets — đầy đủ đến mức nào?

**Skills (chiêu thức)**:
- 673 move trong `t.MOVES` = 500 gốc + **173 đòn đánh gen 5–9** lấy đủ dữ liệu (tên FR, hệ, power, accuracy,
  category) — mọi learnset của 532 loài mới **resolve 100%** (8.444 tham chiếu move, 0 thiếu).
- 84 move status không thêm được vì engine gốc **không có dữ liệu hiệu ứng riêng cho từng move**
  (bảng `MOVES` chỉ có name/type/power/acc/cat) → các move này được map sang move status **cùng hệ /
  cùng category / power gần nhất** đã có hiệu ứng trong game. Tức là Pokémon mới dùng được chiêu, có
  hiệu ứng chuẩn của engine, nhưng một số chiêu đặc trưng hiếm bị đổi tên thành chiêu tương đương.
- **Hiệu ứng tấn công** (damage, type effectiveness, crit, status, drain/weather/tile...) do engine
  battle xử lý chung theo data move — move mới mang hệ/power/cat chuẩn nên hiệu ứng hoạt động đầy đủ;
  game gốc cũng không có animation riêng từng move (VFX theo hệ/category), nên không thiếu gì thêm.
- Không có asset âm thanh trong game gốc (không có thư mục audio) → không thiếu sound.

**Assets**: mỗi loài/form có **6 file**: icon + shiny icon (68×56), art gif + shiny gif, art still +
shiny still. Art của loài mới **thực sự được dùng trong battle/dex** — game gốc hardcode "id ≤ 493 mới
có art"; extension đăng ký dải 494–1025 qua hook `SPECIALS.has` giống các event Pokémon gốc
(`verify/ext-probe.json`: `artBase = assets/pokemon/art/494.gif`). Ảnh Mega dùng `art/<formId>.gif`,
2 form không có sprite động upstream dùng art của dạng gốc (mr-mime-galar).

## 4. Form biến thể (regional / Mega / Primal)

| Nhóm | Số lượng | Cách bắt / tiến hoá |
|---|---|---|
| **Regional** (Alola/Galar/Hisui/Paldea, 3 Tauros) | **53** | **Wild** trong pool vùng tương ứng: Alolan → Alola, Galarian + Hisuian → Galar, Paldean → Paldea |
| **Mega** | **48** | Dùng **Mega Stone** trong shop (47 viên + Rayquaza level 80 vì canon không có đá) |
| **Primal** | **2** | Dùng `red-orb` / `blue-orb` (Gemme Rouge/Bleue, shop) |

- Form có entry POKEDEX riêng (id `base*1000 + n`, luôn >1025, không đụng National Dex), `num = base`,
  mang stats/types của form (Mega Florizarre 80/100/123/122/120/80…), name kiểu "Florizarre (Méga-Évolution)".
- `t.FORMS` được mở rộng: `isForm/baseOf/label/slugOf/formsOf` + `FORMS.LIST` → dex hiển thị form selector,
  `baseOf` map đúng về loài gốc cho breeding/region dex.
- **Mega là "tiến hoá vĩnh viễn"** bằng đá (đơn giản hoá cho game idle, không phải biến hình tạm thời
  trong battle như canon) — chi tiết ở §8 giới hạn.
- Form asset: 103 × 6 = 618 file (icon/gif/still/shiny), tại `src/assets/pokemon/<formId>.*`.

## 5. Gyms + badges + league cho 5 vùng mới

| Vùng | Gym | Badge (8) | League |
|---|---|---|---|
| **Unys** | Omar (grass), Aloé (normal), Artie (bug), Inezia (electric), Bardane (ground), Carolina (flying), Zhu (ice), Watson (dragon) | Trio, Basique, Insecte, Volt, Sismique, Jet, Glaçon, Légende | Conseil 4: Shauntal, Marshall, Caitlin, Grimsley · Maître Goyah |
| **Kalos** | Violette, Grant, Cornélia, Amaro, Lem, Valériane, Olympia, Urup | Insecte, Roche, Poing, Plante, Tension, Fée, Psychisme, Iceberg | Malva, Siebold, Wikstrom, Drasna · Dianthéa |
| **Alola** | Ilima, Barbara, Kiawe, Néphie, Chrys, Margie, Mina, Hapu (trial captains/kahuna) | Verdant, Lush, Wela, Brooklet, Hokulani, Thrifty, Poni, Vast | Hala, Olivia, Molayne, Kahili · Kukui |
| **Galar** | Milo, Donna, Kabu, Faïza, Opal, Chaz, Alistair, Raihan | Herbe, Eau, Feu, Combat, Fée, Roche, Ténèbres, Dragon | Nabil, Sally, Roy, Duncan · Léon |
| **Paldea** | Katy, Brassius, Iono, Kofu, Larry, Ryme, Tulip, Grusha | Insecte, Plante, Volt, Eau, Normal, Spectre, Psy, Glace | Rika, Poppy, Larry, Hassel · Alisma |

- 65 chương mới: mỗi vùng **8 gym chapter** (2 route + heal + gym) + **4 chapter Conseil 4** + **1 chapter
  Maître** (`league: true`, step champion). Level 60 → 100, cap tăng dần, badge mở khoá shop như game gốc.
- **Badge**: 40 badge tên duy nhất (suffix vùng), 5 **badge sheet recolored** từ sheet Sinnoh gốc
  (`assets/badges/<region>-sheet.png`), patch `STORY.badgeSheet` để hiển thị đúng 8 ô.
- **Gym leader**: tên canon FR + type canon; portrait/class dùng sprite trainer có sẵn của game
  (map type → sprite, vd. grass → erika) vì bản gốc không phát hành sprite leader gen 5–9.
- **Teams**: sinh theo type trong dex vùng (3–6 con, level theo ace), Elite 4/Champion 5–6 con;
  `LEAGUE_TEAMS` có 20 line-up themed. Hoàn thành Maître = clear vùng, vùng kế mở như cũ.
- **Alola**: canon không có gym → dùng 8 trial/kahuna làm "gym" với badge riêng (ghi rõ trong §8).

## 6. Kiến trúc: extension layer, không đụng source gốc

`src/js/` (96 file phục hồi, byte/AST-faithful) **không bị sửa**. Nội dung mới nằm trong `src/ext/`:

| File | Load sau | Vai trò |
|---|---|---|
| `003b-gen5to9-pokedex.js` | `003` | 532 entry loài mới |
| `004b-gen5to9-evolutions.js` | `004` | evolution gen 5–9 (233 nguồn) |
| `004c-gen5to9-forms-evos.js` | `004b` | evolution cho 103 form (regional + Mega/Primal) |
| `005b-gen5to9-moves.js` | `005` | 173 move đòn đánh mới |
| `014b-gen5to9-baseexp.js` | module base-exp cuối | base exp 532 loài |
| `017b-gen5to9-forms.js` | `017` | 103 form dex entry + patch FORMS/SPECIALS (art) |
| `019c-gen5to9-items.js` | `019` | 49 Mega Stone/Orb item |
| `031b-gen5to9-league-teams.js` | `031` | 20 line-up Elite 4 |
| `094b-gen5to9-story.js` | `094` | 5 vùng + 65 chương gym/league + badge sheet patch |
| `094c-gen5to9-shop.js` | `094b` | bán Mega Stone/Orb trong shop |

`tools/build.mjs` gộp `src/js` + `src/ext/js` theo tên file nên load đúng thứ tự.

## 7. Cách chơi nội dung mới

1. Chơi hết **Sinnoh** (tới chương cuối `Mont Abrupt`, index 65) → `adv.unlocked = 66` = chương đầu **Unys**.
2. Mở **Aventure (Map)** → chọn vùng **Unys/Kalos/Alola/Galar/Paldea** → chọn chapter → nút
   **"Refaire le chapitre"** (đồng thời là di chuyển vùng). Chơi 8 gym → Conseil 4 → Maître.
3. **Mega/Primal**: mua đá trong **Boutique → Objets d'évolution** (cần 8 badge), mở fiche Pokémon →
   dùng đá → tiến hoá thành form Mega/Primal.
4. Regional form: gặp hoang dã trong vùng tương ứng (Alolan ở Alola, Galarian/Hisuian ở Galar, Paldean ở Paldea).

Kiểm chứng tự động: `npm run gens:probe` → du hành Unys bằng UI, gặp wild gen 5, **bắt Lianaja #496**,
**Mega tiến hoá Florizarre → #3001**, shop có đá/orb, 8 gym + 5 league chapter, 0 lỗi.

## 8. Giới hạn đã biết (trung thực)

- **Mega là tiến hoá vĩnh viễn bằng đá**, không phải biến hình tạm thời trong battle (engine gốc không
  có cơ chế Mega); Rayquaza Mega dùng level 80 vì canon không có đá.
- **84 move status** của gen 5–9 map sang move status tương đương có sẵn (engine không có hiệu ứng
  riêng cho move lạ); 173 move đòn đánh giữ đúng tên FR/power/type.
- **Gym leader portrait** dùng sprite trainer có sẵn (type-based), không có art riêng cho leader gen 5–9;
  **Alola** dùng trial/kahuna thay gym (canon không có gym).
- Form chưa gồm **Gigantamax**/form battle tạm thời (Zen, Ash-Greninja…); 8 loài không sprite động dùng
  art tĩnh; 151 loài dùng `ani` thay `gen5ani`; 127 flavor fallback EN; 2 form art fallback dạng gốc.
- Item evolution không có trong item economy gốc (23 item) → level 40; trade → `link-cable`.
- Tên Pokémon ở ngôn ngữ khác FR vẫn hiển thị tên FR (game gốc cũng vậy).
- Packs deployment vẫn **1.468 file gốc byte-identical**; asset mới serve dạng file rời.
- 3 file icon Mega Stone dùng fallback (abomasnowite dùng icon đá khác; red/blue-orb recolor từ orb gốc).

## 9. Lệnh tái lập / kiểm chứng

```powershell
npm run gens:fetch        # PokéAPI + manifest PokéSprite v2 → .cache/gens/raw
npm run gens:assets       # icon + art cho 532 loài (3.192 file, ~71 MB)
npm run gens:stills       # art/still từ frame đầu gif (Python + Pillow)
npm run gens:forms        # dữ liệu + asset 103 form (618 file) + 49 item
npm run gens:forms:assets # form assets + badge sheets + orb icons (Python)
npm run gens:moves        # 173 move đòn đánh gen 5–9
npm run gens:data         # build-moves + build-data + build-story (regenerate toàn bộ data ext)
npm run gens:build        # gens:data rồi build ra dist/
npm run gens:audit        # audit 57 check → verify/ext-audit.json
npm run gens:probe        # browser probe → verify/ext-probe.json
```

`verify/ext-audit.json`: **57/57 PASS** — 532 loài, 103 form, 8.444 learn refs, 307 nguồn evolution,
40 gym, 25 league chapter, 3.810 file asset mới, 49 item; probe 0 lỗi console/page/http.

## 10. File chính

- `src/ext/js/` — 10 module extension (xem bảng §6)
- `src/ext/data/` — `gen5to9.json`, `forms.json`, `gyms.json`, `moves.json`, `gens-assets.json`, `forms-assets.json`
- `src/assets/pokemon/` — asset loài mới + form mới; `src/assets/badges/*-sheet.png`; `src/assets/items/<mega stone>.png`
- `tools/gens/` — pipeline loài/chương/audit/probe; `tools/gens2/` — moves/forms/story/asset generation
- `verify/ext-audit.json`, `verify/ext-probe.json`, ảnh: `verify/ext-map.png`, `verify/ext-unova.png`,
  `verify/ext-gym-map.png`, `verify/ext-shop.png`, `verify/ext-dex.png`
