# Network layer — reverse từ `src/js/084-cloud.js`

Client dùng **supabase-js 2.65.0** (bundle `src/vendor/supabase.js`) tới project Supabase của game.
Server (bảng, policy, RPC body) là phần backend **không** nằm trong frontend — tài liệu này liệt kê đầy đủ
hợp đồng mà client gọi (tên RPC + tham số + bảng), đủ để dựng lại backend tương thích.

## 1. Khởi tạo

```js
// src/js/084-cloud.js
const URL = ["https:", "", ["qglircqqrtgdvxawisoz", "supabase", "co"].join(".")].join("/");
client = createClient(URL, ANON_KEY, { global: { fetch: ... } });
// ANON_KEY là key công khai nhúng trong app (mọi client cần nó để chạy)
```

Tên project: `qglircqqrtgdvxawisoz.supabase.co`. Client có wrapper fetch riêng (retry/timeout/offline gate).

## 2. Xác thực & phiên

Phương thức auth client dùng: `onAuthStateChange`, `refreshSession`, `signInWithOAuth`, `signOut`.

- **Khách không tài khoản:** không có Supabase anonymous user. Client tạo một UUID thiết bị (`crypto.randomUUID()`) lưu ở `pokecatch-anon`, dùng làm `anon`/`sid` cho telemetry và cho phép chơi hoàn toàn offline (save local).
- **Tài khoản thật:** OAuth **Discord** / **Google** (`signInWithOAuth`, Discord xin scope `identify`); đăng nhập rồi mới bật save cloud.
- Sign-out cục bộ (`scope: "local"`) để không mất save máy; key `pokecatch-signout` đánh dấu trạng thái;
- Khi auth đổi, client tự tải save cloud và so với save local (dialog xung đột: giữ máy / lấy cloud).

## 3. RPC catalog

Tổng **59** RPC. Cột tham số là key của payload client gửi.

| RPC | tham số | nhóm |
|---|---|---|
| `admin_ban` | `uid`, `days`, `reason` | admin |
| `admin_clock` | `uids` | admin |
| `admin_economy` | — | admin |
| `admin_find` | `q` | admin |
| `admin_gift` | `uid`, `kind`, `payload`, `message`, `days` | admin |
| `admin_gift_cancel` | `gid` | admin |
| `admin_hold` | `uid` | admin |
| `admin_mod` | `uid` | admin |
| `admin_player` | `uid` | admin |
| `admin_progress` | — | admin |
| `admin_rename` | `uid` | admin |
| `admin_reset` | `uid` | admin |
| `admin_restore` | `uid`, `bid` | admin |
| `admin_server` | — | admin |
| `admin_snapshot` | — | admin |
| `admin_stats` | — | admin |
| `admin_take` | `uid`, `items`, `money` | admin |
| `admin_take_mons` | `uid`, `mons` | admin |
| `admin_unban` | `uid` | admin |
| `admin_verify` | `uid` | admin |
| `candy_day` | — | candy |
| `cloud_head` | — | save/cloud |
| `cloud_load` | — | save/cloud |
| `cloud_sync` | `base`, `fc` | save/cloud |
| `friend_card` | `other` | friends |
| `friend_remove` | `other` | friends |
| `friend_request` | `code` | friends |
| `friend_respond` | `other`, `yes` | friends |
| `friends_clear` | — | friends |
| `friends_list` | — | friends |
| `gift_claim` | `gid` | gift |
| `linked_to` | `tid`, `mid` | trade |
| `log_session` | `sid`, `anon`, `ms`, `b`, `d`, `v`, `dev`, `tz` | save/cloud |
| `mkt_buy` | `mid`, `name` | market |
| `mkt_close` | `mid` | market |
| `mkt_create` | `mon`, `price`, `region`, `name`, `sprite` | market |
| `mkt_list` | `regs`, `ids`, `shy`, `sort`, `frm`, `lim` | market |
| `mkt_recent` | `ids` | market |
| `pick_check` | `tid`, `mid` | other |
| `raid_board` | `reg`, `boss` | leaderboard |
| `raid_card` | `other` | leaderboard |
| `raid_days` | `regs`, `with_all` | leaderboard |
| `raid_submit_many` | `entries` | leaderboard |
| `save_push` | `d`, `base` | save/cloud |
| `save_put` | `d`, `base` | save/cloud |
| `tower_friends` | `week` | leaderboard |
| `tower_submit` | `entry` | leaderboard |
| `trade_accept` | `tid`, `mon`, `name`, `sprite` | trade |
| `trade_close` | — | trade |
| `trade_create` | `mon`, `want`, `region`, `days`, `name`, `sprite` | trade |
| `trade_list` | `regs`, `can`, `shy` | trade |
| `trade_offers` | `regs` | trade |
| `trade_species` | `regs`, `can`, `shy` | trade |
| `wb_admin` | — | world boss |
| `wb_attack` | `n`, `day`, `uids`, `dmg` | world boss |
| `wb_launch` | `first`, `players` | world boss |
| `wb_state` | — | world boss |
| `zone_board` | `zone` | leaderboard |
| `zone_submit_many` | `entries` | leaderboard |

## 4. Bảng

| bảng | thao tác |
|---|---|
| `market` | `select` |
| `saves` | `update`, `upsert`, `select` |
| `trades` | `select` |

## 5. Khôi phục / ngoại tuyến

- Mọi lời gọi đi qua wrapper có timeout + retry; khi offline chúng bị "gate" (không xếp hàng vô hạn) và UI dùng dữ liệu local.
- Save local là nguồn chính khi chơi offline; cloud chỉ đồng bộ khi online. `TabLock` ngăn 2 tab ghi đè nhau.
- Board/leaderboard (raid, zone, tower, world boss) là read-mostly, gửi entry một chiều (`*_submit_many`).
- `admin_*` chỉ tồn tại trong client để loader admin gọi khi `window.ADMIN_FILES` có file (bản phát hành để rỗng).

## 6. Key localStorage liên quan

| key | ý nghĩa |
|---|---|
| `pokecatch-anon` | id danh tính ẩn danh |
| `pokecatch-ban` | thông tin bị ban (nếu có) |
| `pokecatch-cloud-user` | user id cloud đã liên kết |
| `pokecatch-cloud-wiped` | cờ save trên máy đã bị xoá bởi cloud |
| `pokecatch-save-btn` | trạng thái nút save |
| `pokecatch-save-post` | mốc cloud save-post |
| `pokecatch-signout` | đã đăng xuất |
