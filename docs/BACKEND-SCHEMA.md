# Backend schema — hợp đồng server của Poke'Catch (xác minh công khai)

Backend: Supabase `qglircqqrtgdvxawisoz.supabase.co`. Frontend nhúng **publishable key** thật, nên có thể
gọi server y như game. Bảng bị **RLS chặn** (game chỉ dùng RPC `SECURITY DEFINER`), nhưng phản hồi server
cho phép **xác minh độc lập** từng RPC + bảng của hợp đồng client:

- RPC tồn tại + đúng tham số → `42501 permission denied for function <name>` (cần đăng nhập).
- RPC sai/không tồn tại → `PGRST202 Could not find the function…`.

Sinh bởi `tools/probe-backend.mjs` → `verify/backend-probe.json`.

## 1. Auth

```json
{
 "external": {
  "anonymous_users": false,
  "apple": false,
  "azure": false,
  "bitbucket": false,
  "discord": true,
  "facebook": false,
  "snapchat": false,
  "figma": false,
  "fly": false,
  "github": false,
  "gitlab": false,
  "google": true,
  "keycloak": false,
  "kakao": false,
  "linkedin": false,
  "linkedin_oidc": false,
  "notion": false,
  "spotify": false,
  "slack": false,
  "slack_oidc": false,
  "workos": false,
  "twitch": false,
  "twitter": false,
  "email": false,
  "phone": false,
  "zoom": false
 },
 "disable_signup": false,
 "mailer_autoconfirm": true,
 "phone_autoconfirm": false,
 "sms_provider": "twilio",
 "saml_enabled": false,
 "saml_private_key_next_configured": true,
 "passkeys_enabled": false
}
```

## 2. RPC — client dùng vs server xác nhận

**59/59** function client dùng đã được server xác nhận tồn tại với đúng tham số
(58 trả `permission denied for function` = cần đăng nhập; `log_session` trả `exists-bad-args` do dummy sai kiểu nhưng function tồn tại). Lệch: **0**.

| RPC | tham số client | server | HTTP | ghi chú |
|---|---|---|---|---|
| `admin_ban` | `uid`, `days`, `reason` | exists-needs-auth | 401 | 42501 permission denied for function admin_ban |
| `admin_clock` | `uids` | exists-needs-auth | 401 | 42501 permission denied for function admin_clock |
| `admin_economy` | — | exists-needs-auth | 401 | 42501 permission denied for function admin_economy |
| `admin_find` | `q` | exists-needs-auth | 401 | 42501 permission denied for function admin_find |
| `admin_gift` | `uid`, `kind`, `payload`, `message`, `days` | exists-needs-auth | 401 | 42501 permission denied for function admin_gift |
| `admin_gift_cancel` | `gid` | exists-needs-auth | 401 | 42501 permission denied for function admin_gift_cancel |
| `admin_hold` | `uid` | exists-needs-auth | 401 | 42501 permission denied for function admin_hold |
| `admin_mod` | `uid` | exists-needs-auth | 401 | 42501 permission denied for function admin_mod |
| `admin_player` | `uid` | exists-needs-auth | 401 | 42501 permission denied for function admin_player |
| `admin_progress` | — | exists-needs-auth | 401 | 42501 permission denied for function admin_progress |
| `admin_rename` | `uid` | exists-needs-auth | 401 | 42501 permission denied for function admin_rename |
| `admin_reset` | `uid` | exists-needs-auth | 401 | 42501 permission denied for function admin_reset |
| `admin_restore` | `uid`, `bid` | exists-needs-auth | 401 | 42501 permission denied for function admin_restore |
| `admin_server` | — | exists-needs-auth | 401 | 42501 permission denied for function admin_server |
| `admin_snapshot` | — | exists-needs-auth | 401 | 42501 permission denied for function admin_snapshot |
| `admin_stats` | — | exists-needs-auth | 401 | 42501 permission denied for function admin_stats |
| `admin_take` | `uid`, `items`, `money` | exists-needs-auth | 401 | 42501 permission denied for function admin_take |
| `admin_take_mons` | `uid`, `mons` | exists-needs-auth | 401 | 42501 permission denied for function admin_take_mons |
| `admin_unban` | `uid` | exists-needs-auth | 401 | 42501 permission denied for function admin_unban |
| `admin_verify` | `uid` | exists-needs-auth | 401 | 42501 permission denied for function admin_verify |
| `candy_day` | — | exists-needs-auth | 401 | 42501 permission denied for function candy_day |
| `cloud_head` | — | exists-needs-auth | 401 | 42501 permission denied for function cloud_head |
| `cloud_load` | — | exists-needs-auth | 401 | 42501 permission denied for function cloud_load |
| `cloud_sync` | `base`, `fc` | exists-needs-auth | 401 | 42501 permission denied for function cloud_sync |
| `friend_card` | `other` | exists-needs-auth | 401 | 42501 permission denied for function friend_card |
| `friend_remove` | `other` | exists-needs-auth | 401 | 42501 permission denied for function friend_remove |
| `friend_request` | `code` | exists-needs-auth | 401 | 42501 permission denied for function friend_request |
| `friend_respond` | `other`, `yes` | exists-needs-auth | 401 | 42501 permission denied for function friend_respond |
| `friends_clear` | — | exists-needs-auth | 401 | 42501 permission denied for function friends_clear |
| `friends_list` | — | exists-needs-auth | 401 | 42501 permission denied for function friends_list |
| `gift_claim` | `gid` | exists-needs-auth | 401 | 42501 permission denied for function gift_claim |
| `linked_to` | `mid` | exists-needs-auth | 401 | 42501 permission denied for function linked_to |
| `log_session` | — | exists-bad-args | 400 | 22P02 invalid input syntax for type integer: "{}" |
| `mkt_buy` | `mid`, `name` | exists-needs-auth | 401 | 42501 permission denied for function mkt_buy |
| `mkt_close` | `mid` | exists-needs-auth | 401 | 42501 permission denied for function mkt_close |
| `mkt_create` | `mon`, `price`, `region`, `name`, `sprite` | exists-needs-auth | 401 | 42501 permission denied for function mkt_create |
| `mkt_list` | `regs`, `ids`, `shy`, `sort`, `frm`, `lim` | exists-needs-auth | 401 | 42501 permission denied for function mkt_list |
| `mkt_recent` | `ids` | exists-needs-auth | 401 | 42501 permission denied for function mkt_recent |
| `pick_check` | `tid`, `mid` | exists-needs-auth | 401 | 42501 permission denied for function pick_check |
| `raid_board` | `reg`, `boss` | exists-needs-auth | 401 | 42501 permission denied for function raid_board |
| `raid_card` | `other` | exists-needs-auth | 401 | 42501 permission denied for function raid_card |
| `raid_days` | `regs`, `with_all` | exists-needs-auth | 401 | 42501 permission denied for function raid_days |
| `raid_submit_many` | `entries` | exists-needs-auth | 401 | 42501 permission denied for function raid_submit_many |
| `save_push` | `d`, `base` | exists-needs-auth | 401 | 42501 permission denied for function save_push |
| `save_put` | `d`, `base` | exists-needs-auth | 401 | 42501 permission denied for function save_put |
| `tower_friends` | `week` | exists-needs-auth | 401 | 42501 permission denied for function tower_friends |
| `tower_submit` | `entry` | exists-needs-auth | 401 | 42501 permission denied for function tower_submit |
| `trade_accept` | `tid`, `mon`, `name`, `sprite` | exists-needs-auth | 401 | 42501 permission denied for function trade_accept |
| `trade_close` | — | exists-needs-auth | 401 | 42501 permission denied for function trade_close |
| `trade_create` | `mon`, `want`, `region`, `days`, `name`, `sprite` | exists-needs-auth | 401 | 42501 permission denied for function trade_create |
| `trade_list` | `regs`, `can`, `shy` | exists-needs-auth | 401 | 42501 permission denied for function trade_list |
| `trade_offers` | `regs` | exists-needs-auth | 401 | 42501 permission denied for function trade_offers |
| `trade_species` | `regs`, `can`, `shy` | exists-needs-auth | 401 | 42501 permission denied for function trade_species |
| `wb_admin` | — | exists-needs-auth | 401 | 42501 permission denied for function wb_admin |
| `wb_attack` | `n`, `day`, `uids`, `dmg` | exists-needs-auth | 401 | 42501 permission denied for function wb_attack |
| `wb_launch` | `first`, `players` | exists-needs-auth | 401 | 42501 permission denied for function wb_launch |
| `wb_state` | — | exists-needs-auth | 401 | 42501 permission denied for function wb_state |
| `zone_board` | `zone` | exists-needs-auth | 401 | 42501 permission denied for function zone_board |
| `zone_submit_many` | `entries` | exists-needs-auth | 401 | 42501 permission denied for function zone_submit_many |
| `save` *(extra)* | — | absent-or-requires-args | 404 | PGRST202 Could not find the function public.save without parameters in the schema cache |
| `saves` *(extra)* | — | absent-or-requires-args | 404 | PGRST202 Could not find the function public.saves without parameters in the schema cache |

## 3. Bảng

| bảng | xác minh | HTTP | bằng chứng |
|---|---|---|---|
| `saves` | exists | 401 | 42501 permission denied for table saves |
| `trades` | exists | 401 | 42501 permission denied for table trades |
| `market` | exists | 401 | 42501 permission denied for table market |
| `profiles` | absent | 404 | PGRST205 Could not find the table 'public.profiles' in the schema cache |
| `sessions` | exists | 401 | 42501 permission denied for table sessions |
| `logs` | absent | 404 | PGRST205 Could not find the table 'public.logs' in the schema cache |
| `events` | absent | 404 | PGRST205 Could not find the table 'public.events' in the schema cache |
| `friends` | exists | 401 | 42501 permission denied for table friends |
| `gifts` | exists | 401 | 42501 permission denied for table gifts |
| `bans` | exists | 401 | 42501 permission denied for table bans |
| `players` | absent | 404 | PGRST205 Could not find the table 'public.players' in the schema cache |
| `raid_days` | absent | 404 | PGRST205 Could not find the table 'public.raid_days' in the schema cache |
| `raid_scores` | absent | 404 | PGRST205 Could not find the table 'public.raid_scores' in the schema cache |
| `zone_scores` | absent | 404 | PGRST205 Could not find the table 'public.zone_scores' in the schema cache |
| `tower_scores` | absent | 404 | PGRST205 Could not find the table 'public.tower_scores' in the schema cache |
| `wb_state` | absent | 404 | PGRST205 Could not find the table 'public.wb_state' in the schema cache |
| `candy_days` | absent | 404 | PGRST205 Could not find the table 'public.candy_days' in the schema cache |
| `devices` | absent | 404 | PGRST205 Could not find the table 'public.devices' in the schema cache |
| `admin_logs` | absent | 404 | PGRST205 Could not find the table 'public.admin_logs' in the schema cache |

## 4. Phát hiện khác

- OAuth bật: **Discord + Google**; anonymous sign-in tắt ⇒ chơi khách 100% local.
- Cơ chế chống clone trong `084-cloud.js`: hostname phải thuộc allowlist (netlify/pages/localhost),
  kiểm bằng hash `Math.imul` trên từng ký tự — không phải so sánh chuỗi.
- Không có source server công khai: PostgREST OpenAPI yêu cầu secret key, bảng đóng, không có repo.
- Mọi RPC đều `SECURITY DEFINER` (bảng bị RLS) — client không đọc/ghi trực tiếp bảng nào.
