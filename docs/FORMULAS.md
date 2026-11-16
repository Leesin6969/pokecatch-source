# Công thức game — reverse từ source

Mọi số dưới đây đọc trực tiếp từ `src/js/018-config.js` (CONFIG) và các hàm tương ứng; cột **code** là file:dòng trong cây chuẩn để tra lại.

## 1. Pokémon — stats & HP

`src/js/030-game.js` → `statsOf()` / `maxHp()` (export `t.Game.statsOf`, `t.Game.maxHp`).

```
S  = (shiny ? 1 + SHINY_STAT_BONUS(0.1) : 1) × statMult × RANK_STAT^rank
hp = floor( (floor(2·baseHp·L/100) + L + 10) × S )
X  = floor( (floor(2·baseStat·L/100) + 5) × S )        // atk/def/spa/spd/spe
maxHp = floor( hp × min(HP_LEVEL_MAX, 1 + HP_LEVEL_SCALE·L/100) × hpMult )
```

| Hằng số | Giá trị |
|---|---|
| `SHINY_STAT_BONUS` | 0.1 (+10% mọi stat cho shiny) |
| `HP_LEVEL_SCALE` / `HP_LEVEL_MAX` | 1.5 / 2.5 |
| `MAX_LEVEL` | 100 |
| `LEVEL_CAP_MARGIN` | 0 (cap theo chương; mở lên 100 khi xong Ligue, `LEAGUE_DONE_CAP`/`LEAGUE_CAP_MARGIN` = 100/3) |

Cấp hiệu dụng trong trận bị chặn theo zone (`capOf`): không vượt level của zone/event/boss.

## 2. XP & lên cấp

- `t.Game.xpForNext(level, mon)` = `floor(K(level) · growth(level) · XP_SCALE · REGION_XP[region] · RANK_XP^rank)`.
- `XP_SCALE` = 3, `REGION_XP` = `{ johto: 1.25, hoenn: 1.25, sinnoh: 1.35 }`, `XP_WINS_PER_LEVEL` = 15.
- `XP_GROWTH_FROM` = 10, `XP_GROWTH_EXTRA` = 1, `XP_LEVEL_GROWTH = CHAPTER_TIME_RATIO^(1/8) × XP_GROWTH_EXTRA`.
- `XP_BASE_REF` = 60; `XP_ACTIVE_BONUS` = 1.1 (chơi chủ động); `OFFLINE_XP_MULT`, `BUDDY_XP_MULT` = 1.3.
- Candy: `EXP_CANDY_MULT` = 0.6, `CANDY_LEVEL_SHARE` = 3, `DUPLICATE_CANDIES` = 1.
- XP trận = `levelXp(foe.level)/XP_WINS_PER_LEVEL × hệ số` (adventure ~L2644), có multiplier chương/region.

## 3. Bắt Pokémon (capture)

`src/js/032-adventure.js` → `catchProb()`:

```
p = min( CAPTURE_MAX × buffMult("capture"),
         rate/255 × buffMult("capture") )
rate = battle.rate ?? (legendary/mythical ? LEGENDARY_CAPTURE_RATE : captureRate × CAPTURE_BONUS)
```

| Hằng số | Giá trị |
|---|---|
| `CAPTURE_MAX` | 0.6 (trần 60%) |
| `CAPTURE_BONUS` | 0.6 |
| `LEGENDARY_CAPTURE_RATE` | 3 (→ 3/255 ≈ 1.18% trước buff) |
| Ball hệ số | theo `TIERS[tierOf(id)].ball` (Poké/Great/Ultra/Master) |

## 4. Shiny

`src/js/030-game.js` → `shinyRate()`:

```
p = min(1, SHINY_RATE × (region fully caught ? 2 : 1))
```

`SHINY_RATE` = **1/4096**; shiny +10% stat (`SHINY_STAT_BONUS`) và có hiệu ứng `ShinyGlint`.

## 5. Trận đấu

### 5.1 Một đòn đánh (`src/js/032-adventure.js`, `xn()`)

Công thức kiểu Gen 3, đã bị "idle hoá":

```
dmg = max(1, floor(
        (((2·L_atk/5 + 2) · power · Atk/Def) / 50 + 2)
        × multipliers
        × LEVEL_GAP^(L_atk - L_def)
        × (crit ? CRIT_MULT : 1)
        × weatherMult
      ))
```

| Hằng số | Giá trị |
|---|---|
| `LEVEL_GAP` | 1.06 (chênh 1 level ≈ +6%) |
| `CRIT_CHANCE` / `CRIT_MULT` | 1/24 / 1.5 |
| `TYPE_EFF_MAX` / `TYPE_EFF_MIN` | 4 / 0 (kẹp hiệu quả hệ) |
| `POWER_SLOPE` | 2 |
| `MAX_ROUNDS` | 200 |
| `STATUS_SURE` | 0.15 |
| `BURN_ATK` (BOSS_STATUS) | 0.75; burn thường ×0.5 atk |

### 5.2 Ai thắng một lượt (`src/js/032-adventure.js`, `duel()`)

Mô phỏng đội hình từng vòng: tính chênh lệch sức mạnh `dn`, xác suất thắng mỗi vòng là logistic:

```
p = 1 / (1 + e^(−dn / POWER_SLOPE))
```

Bên thua chịu mất HP theo tỉ lệ `(1−p)`, đội nào hết HP trước thì thua. `DUEL_RUNS` lần mô phỏng được dùng cho `winChance()` (thanh % dự đoán trong UI).

### 5.3 Kẻ địch

- `ENEMY_HP_PER_ALLY` = 0.7: mỗi đồng đội thêm vào làm HP địch tăng 70% HP cơ bản.
- Hệ số theo loại trận: `ENEMY_DAMAGE[kind]`, gym ×`GYM_DAMAGE` 1.3, HP gym ×`GYM_HP_MULT` 1.3.
- HP địch scale theo BST: `HP × (BST_REF/BST)^HP_EXP × ADJ[id]`.

## 6. Kinh tế

| Hằng số | Giá trị | Ý nghĩa |
|---|---|---|
| `START_MONEY` | 3 000 ₽ | tiền khởi đầu |
| `MONEY_GAIN` | 0.9 | hệ số nhân tiền thắng |
| `WILD_MONEY` | `() => 0` | Pokémon hoang **không** cho tiền |
| `TRAINER_MONEY` | `30 × level` | tiền từ trainer |
| `TRAINER_LEVEL_BONUS` | [0, 1] | ±1 level |
| `GYM_TRAINERS` / `LEAGUE_TRAINERS` | xem CONFIG | số trainer, khoảng level dưới champ, hệ số thưởng |
| `BEHIND_MONEY` / `LEADER_REPLAY_MONEY` | xem CONFIG | thưởng khi đánh lại |
| `SHOP` / `SHOP_QTY` / `SELL` | xem CONFIG | giá bán, số lượng, giá thu |
| `PENSION` | xem CONFIG | giá slot, trứng, berry |
| `COINS` / `CASINOS` | xem CONFIG | kinh tế casino |
| `UNDERGROUND` | xem CONFIG | loot band, shard, wall/guard odds |
| `MARKET` | `OPEN: false` | chợ đen **tắt** trong bản phát hành |

Tra cứu nhanh mọi hằng số: `node -e` hoặc mở `src/js/018-config.js` (131 key); bản JSON: `data/CONFIG.json` sau `npm run data:export`.

## 7. Thời gian & offline

| Hằng số | Giá trị | Ý nghĩa |
|---|---|---|
| `STEP_MS` | nhịp một bước adventure | |
| `SPEEDS` / `SPEED_PACE` | ×1…×4 | nút tốc độ |
| `OFFLINE_MAX_MS` | trần thời gian được tính khi offline | |
| `OFFLINE_STEP_MS` / `OFFLINE_ITEM_RATE` / `OFFLINE_XP_MULT` / `OFFLINE_MAX_LEVELS` | xem CONFIG | hiệu suất khi quay lại |
| `ACTION_MS` / `CEREMONY_MS` | thời lượng animation | |
| `CHAPTER_TIME_RATIO` / `PACE.chapters` | nhịp chương | |

Đồng hồ game: `t.Clock` (HEAD request lấy `Date` server, lưu offset `pokecatch.clock`), nên thời gian không bị lợi dụng bằng đổi giờ máy; chênh lệch bị "tua" qua `onForward()`.

## 8. Vòng lặp tick

`src/js/095-app-boot.js`:

- mỗi **5 000 ms**: nếu tab visible → `lastTick = now`, `playMs += 5000`; nếu đã lâu không tick → gọi `nt(lastTick)` để chạy bù offline.
- `nt()`: `Update.shown()` → `Cloud.ready()` → `Clock.ready()` → `CatchUp.wait()` → `Adventure.offline(...)` (tua bước) → render lại.
- `visibilitychange`: ẩn tab → save idle; hiện lại → tick bù.
- `t.Adventure.speed()` áp hệ số `SPEEDS`; `TabLock` chặn 2 tab cùng lưu.
