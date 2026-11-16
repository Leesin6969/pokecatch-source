# Boot flow — từ URL đến gameplay

Thứ tự thực tế khi mở game (đối chiếu `mirror/index.html`, `src/boot/`, `src/shell/app.html`, `src/js/095-app-boot.js`).

## 1. Trang shell (Netlify)

`index.html` tĩnh, 4,6 KB:

1. Set `window.SW_REG` = đăng ký `/sw.js` (chỉ để phục vụ ảnh từ CDN + cache shell).
2. Chèn `<link rel=apple-touch-icon href=/apple-touch-icon.png>` (vì boot.js đặt `<base>` trên CDN).
3. `BOOT_FAIL()`: nếu CDN/asset lỗi thì hiện thông báo theo ngôn ngữ người chơi + nút thử lại.
4. Nạp `https://…pages.dev/boot.js` (CDN). **Trang Netlify không chứa game** — chỉ 4,6 KB này.

## 2. `boot.js` (CDN, sinh từ `src/boot/*` + `src/shell/app.html`)

Ba phần nối tiếp:

| Phần | Việc |
|---|---|
| 1 | Set `<html lang="fr" class="px">` trước khi CSS vẽ (chống nháy) |
| 2 | `window.Theme`: dark/light/auto, lưu `localStorage.pokecatch.theme`, theo `prefers-color-scheme` |
| 3 | • `LANG_FILES` (7 bundle), `ADMIN_FILES=[]`, `GAME_INTRO`, `CDN`, `BUILD`, `ONLINE`<br>• nếu origin ≠ CDN: chèn `<base href=CDN>` + patch `HTMLImageElement.src` để ảnh `assets/*` có `crossOrigin` (canvas đọc pixel được)<br>• chọn ngôn ngữ (`pokecatch.lang` → navigator → fr), nạp `bundle/lang-xx.hash.js` nếu không phải fr<br>• tạo `<div id=app>` + toàn bộ header/nav/screen markup (45 KB, từ `src/shell/app.html`)<br>• preload + nạp `bundle/app.<hash>.css` → `vendor-supabase.js` → `bundle/app.<hash>.js`<br>• chờ service worker (`SW_REG`) một nhịp để ảnh không đi qua Netlify |

## 3. `app.js` — bundle gameplay

```
(function(){
  prelude:  slot 77 module, timers, TIMERS, MODULES registry, t = Proxy(globalThis)
  file 001..095 nối tiếp, mỗi file gán export lên t.*
  file 095: t.App = {…}; jt()       ← bootstrap cuối cùng
})()
```

`jt()` (async) — `src/js/095-app-boot.js`:

| Bước | Việc |
|---|---|
| 1 | `ut()`, `ct()`: đo layout, gắn sự kiện resize/theme |
| 2 | `TabLock.onLost` — nếu tab khác chiếm save thì khoá UI |
| 3 | `Game.load()` — đọc `gachamon-save-v1`, migrate, chuẩn hoá |
| 4 | `UI.syncCalm()`, `Cloud.init()` — dựng client Supabase nếu có session |
| 5 | Nếu chưa có trainer hoặc mới: `await Title.show()` → title screen → "Nouvelle partie" → trainer lab (skip narration → avatar → name) → **starter**: game dựng overlay LinkFx `.lk-fx` (3 slot; chọn slot rồi bấm `.lk-go`), engine ghi `adv.pending.gift = "starter"`, nhận mon xong mới chạy tiếp |
| 6 | `await Cloud.ready()`, `await Clock.ready()` — xong thì mới chạy offline catch-up |
| 7 | `Adventure.ensure()` — tạo state chương 1 nếu chưa có |
| 8 | `await et(15e3, …)` — tua bước offline (15 s bước đầu) |
| 9 | `pe(), m(), z(), V(), lt(), kt()` — render toàn bộ screen, dựng cache |
| 10 | `UI.measureSprites(...)`, `News.init()`, `Events.init()` |
| 11 | `Screens[*].init()` — khởi tạo từng screen |
| 12 | Gắn handler nav (`#side [data-screen]`), nav group, ESC, pointerdown… |
| 13 | `Z('adventure')` — mở screen mặc định; render; `Gifts.start()` |
| 14 | `setInterval(5s)` tick sim + `setInterval(30s)` cloud + `beforeunload` save |
| 15 | Gán `t.App = { refresh, refreshHeader, show, communityLine, parade, current }` |

## 4. Sau boot — các vòng lặp

| Vòng | Chu kỳ | Việc |
|---|---|---|
| idle tick | 5 s | `lastTick = Clock.now()`, `playMs += 5000`; tab ẩn → save; resume → chạy bù |
| offline catch-up | khi mở lại tab / Clock forward | `nt(lastTick)`: `Update.shown` → `Cloud.ready` → `Clock.ready` → `CatchUp.wait` → `Adventure.offline(steps)` → render |
| cloud | 30 s | đẩy save (debounce), kéo board/cộng đồng |
| FX | rAF | battle/capture/badge/weather animation |
| clock | sự kiện | `daytime`/`weather` đổi → refresh header + scene |

## 5. Trạng thái sau boot (đo thật)

- `#app` ≈ 294 node, 15 screen, 13 nút nav, 3 canvas, 0 ảnh hỏng.
- 77 module có mặt trên `t`.
- Save `gachamon-save-v1` được tạo ngay sau trainer lab (~834 B khi chưa có Pokémon).
- Title screen hiện 5 nút: Nouvelle partie, Comment jouer, Changelogs, Discord, Google.

Log kiểm chứng: `verify/report.json`, `verify/audit-local.json`, `verify/play-check.json`.
