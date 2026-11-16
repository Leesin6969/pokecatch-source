# Save format — reverse từ source

Save nằm trong `localStorage` dưới key **`gachamon-save-v1`** (`CONFIG.SAVE_KEY`, tên cũ từ thời prototype). Payload là JSON của toàn bộ state `t.Game.S`.

## 1. Bản ghi mới (`freshState()` — `src/js/030-game.js`)

| trường | kiểu | ý nghĩa |
|---|---|---|
| `v` | number | phiên bản save (hiện tại **2**) |
| `money` | number | tiền ₽ |
| `mons` | array | toàn bộ Pokémon sở hữu |
| `team` | string[] | uid 6 Pokémon trong đội |
| `eventTeams` | object | đội cho event/world boss theo event id |
| `dex` | object | `{ [id]: { caught, seen, shiny, firstAt } }` |
| `seen` / `seenShiny` | object | đã gặp / đã gặp shiny |
| `buffs` | object | buff đang bật (berry…), mỗi loại có `until`, `mult` |
| `items` | object | `{ [itemId]: count }`; `coin` là tiền xu casino |
| `buddy` | `{uid, ko}` | Pokémon buddy và số lần KO |
| `pension` | `{ mons: [{mon, candy}], eggs: [], laid, open }` | nhà trẻ |
| `trades` | array | lịch sử trade |
| `lastTick` | number | mốc thời gian server cuối cùng đã tick |
| `stats` | object | throws, caught, battles, trades, wins, evolutions, hatched, playMs, awayMs (+ `earned`,`moneyIn`,… bổ sung runtime) |
| `trainer` | `{name, sprite, id, since, tag}` | hồ sơ người chơi (id/tag lưu dạng string) |
| `muted` | boolean | tắt tiếng |
| `adv` | object \| null | state adventure (null = chưa bắt đầu) |

## 2. Trường được các module thêm vào lúc runtime

| trường | module | ý nghĩa |
|---|---|---|
| `adv` | `032-adventure` | `{chapter, unlocked, badges[], gifts{}, nodes[], node, battle, pending, capture{on,target,shiny}, speed, paused, loops[], runs, kept{}, layout}` + runtime `zone/event/tower/under/league…` |
| `under` | `033-underground` | `{floor, hp, steps, walls, gems, geodes, opened, slots, theme…}` |
| `tower` / `towerBest` | `038-tower` | tiến trình Battle Tower, BP |
| `candy` | `039-candy-run` | tiến trình Candy Run |
| `raids` | `036-raids` | lane raid theo ngày, charm |
| `wb` | `037-worldboss` | state world boss |
| `road` | `028-story`/adventure | "con đường" node của chương |
| `placeSince`, `earnSince`, `coinSince`, `itemSince` | `030-game` | mốc cho stats "kể từ khi…" |
| `shellGiven`, `auroraRefund`, `rotomForms` | `085-gifts` / `030-game` | cờ gift one-off, form Rotom |
| `link` | `030-game` | stash dùng khi link-trade |
| `reducedAnim`, `muted`, `theme` | `Perf` / `Options` | tuỳ chọn hiển thị |
| `updatedAt`, `print`, `cloud` | `084-cloud` | metadata đồng bộ |

## 3. Migration

`load()` chạy `migrate()` (trong `030-game.js`) trước khi dùng:

- `v < 2`: gộp `balls`/`ballTs` cũ vào `items["poke-ball"]` (+10), reset `adv`, dựng `seen` từ `dex`, đặt `v = 2`.
- Luôn chuẩn hoá `stats` (thêm field thiếu, `Math.round` `playMs`/`awayMs`), `lastTick` về số nguyên, `placeSince ||= now`.
- Không có `trainer` → tạo mặc định Red + id ngẫu nhiên (dùng cho save từ trước khi có trainer lab).
- `adv` cũ thiếu field → `ensure()` điền lại (capture, kept, loops…).

## 4. Ghi save

- `t.Game.save()` (export) ghi **đồng bộ** `localStorage`, có guard: bỏ qua khi `TabLock` báo tab khác đang giữ, khi cloud đang sync (`Cloud.uploading`), hoặc khi đang "hold save".
- Các thời điểm ghi: sau mỗi hành động quan trọng, mỗi 30 s (cloud tick), khi `beforeunload`/tab ẩn, sau khi mua/bán/bắt/evo.
- `TabLock` dùng key `pokecatch-tab` (heartbeat) để chống 2 tab cùng lưu (chống corrupt).

## 5. Đồng bộ cloud (payload)

`084-cloud.js`:

- Bản local giữ `pokecatch-cloud-user`, `pokecatch-cloud-wiped`, `pokecatch-save-post`, `pokecatch-anon`.
- Đẩy save bằng `rpc("save_put", { d: <save JSON>, base: <updated_at cloud đã thấy> })`; conflict → `rpc("save_push", …)` khi có bản mới hơn; đọc bằng `rpc("cloud_load")` rơi về `from("saves").select("data, updated_at")`.
- `rpc("cloud_head")` trả metadata nhẹ (updated_at/print) để biết cần tải hay không (giảm băng thông).
- `rpc("cloud_sync", …)` bản đầy đủ có `base`, `lg` (login/game?), `tr`.
- `rpc("log_session", …)` ghi phiên chơi (playtime, catch, stats delta).
- Payload save cloud chính là **toàn bộ `save.data`** — cùng schema ở trên; server không đổi cấu trúc.

## 6. Đọc/ghi nhanh bằng script

```bash
npm run data:export          # xuất các bảng dữ liệu, không phải save
node -e "const s=require('./data/CONFIG.json'); console.log(s.SAVE_KEY, s.START_MONEY)"
```

Save mẫu thật (dump từ headless sau khi tạo trainer): xem `tools/recovery/dump-save.mjs`.
