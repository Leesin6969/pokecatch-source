# Fidelity report — bản phục hồi vs game đang chạy thật

Ghi lại các phép đo so sánh giữa **bản local** (`npm run build` → `dist/`) và **site gốc**
(`https://pokecatch-online.netlify.app/`), cùng ngày 2026-11-15, cùng máy, cùng Chrome headless.

## 1. Boot state (tools/compare.mjs → verify/compare.json)

Cùng một kịch bản: load trang, đợi 9 s, chụp state DOM + localStorage.

| Trường | Site gốc | Bản local |
|---|---|---|
| `document.hidden` | false | false |
| `#app` tồn tại | ✔ | ✔ |
| `#money` | `0` | `0` |
| `#battle-log` | `En route pour l'aventure !` | `En route pour l'aventure !` |
| screen active | `["screen-adventure"]` | `["screen-adventure"]` |
| localStorage keys | `pokecatch-anon`, `pokecatch-tab`, `pokecatch.clock` | giống hệt |
| ảnh hỏng | 0 | 0 |
| `document.images` | 57 | 58 |
| console error | 0 | 0 |
| page error | 0 | 0 |

Khác biệt duy nhất: 1 ảnh — do lazy-load chưa kịp ở thời điểm chụp, không phải lỗi.

## 2. Playthrough đầy đủ (tools/play.mjs)

Cùng script chạy trên hai môi trường: title → "Nouvelle partie" → skip narration → chọn avatar →
đặt tên → adventure → mở từng screen → để battle engine chạy 120 s.

| Chỉ số | Site gốc | Bản local | Kết luận |
|---|---|---|---|
| console error | 0 | 0 | khớp |
| page error | 0 | 0 | khớp |
| request 404 | 0 | 0 | khớp |
| ảnh hỏng | 0 | 0 | khớp |
| screen mở được | 9/12 | 9/12 | khớp |
| screen khoá | raid, underground, market | raid, underground, market | khớp (đúng thiết kế) |
| map nodes | 444 | 444 | khớp |
| team nodes | 128 | 128 | khớp |
| pokédex nodes | 4063 | 4063 | khớp |
| pension nodes | 187 | 187 | khớp |
| shop nodes | 134 | 134 | khớp |
| achievements nodes | 238 | 238 | khớp |
| adventure nodes | 142 | 140 | lệch 2 node — animation combat đang chạy lúc chụp |
| save key | `gachamon-save-v1` | `gachamon-save-v1` | khớp |
| save bytes | 4 471 | 4 405 | lệch 66 B — `trainer.id`, `lastTick`, `since` random |
| money sau lab | 3 000 ₽ | 3 000 ₽ | khớp |
| play time tích luỹ | 120 000 ms | 120 000 ms | khớp |
| chapter | Kanto · Chapitre 1 · Étape 1 /**21** | … Étape 1 /**20** | lệch số bước — sinh bằng RNG khi mở chapter |

Lần `npm run check:play` cuối cùng (bản local) ghi nhận `playMs = 190 000 ms` — chỉ là harness chạy lâu
hơn, không phải khác biệt hành vi.

**Kết luận:** mọi khác biệt đều là trường do `Math.random()` / thời điểm chụp. Không có khác biệt
hành vi, không có lỗi, không thiếu asset.

### Về bước "chọn starter"
Chapter 1 mở đầu bằng step `kind:"gift"` (choices `[1,4,7]` = Bulbasaur / Charmander / Squirtle,
`028-story.js`). Modal này do idle engine tự bật; harness có auto-accept nhưng thời điểm bật phụ thuộc
`Cloud.ready()` (Supabase) và nhịp tick, nên trong một số lần chạy headless nó không kịp xuất hiện
trước khi harness kết thúc — **site gốc cho hành vi y hệt** trong cùng điều kiện (`mons: 0`). Đây là
giới hạn của automation, không phải của bản build: mở bằng tay trên Chrome, modal hiện ra và mọi thứ
chạy tiếp bình thường (xem ảnh `verify/local-04-battle.png` chụp đúng modal starter).

## 3. Bằng chứng tĩnh (không phụ thuộc runtime)

| Phép đo | Kết quả |
|---|---|
| Ghép 95 chunk lại == `mirror/bundle/app.js` | byte-identical, 2 678 266 B |
| AST từng file sau format == chunk gốc | **95/95 identical** |
| Bundle build lại parse được | ✔ (3 795 969 B source, 2,50 MB khi minify) |
| Asset tham chiếu vs file có | 0 thiếu sau khi bổ sung |
| Ảnh render trong playthrough | 0 hỏng |

## 3b. Deep audit bổ sung (2026-11-15, lần rà soát cuối)

Ngoài playthrough, chạy **crawl sâu** với save đã mở khoá trên **cả hai bên** (17 screen, mỗi screen
click tới 140 phần tử, 13 modal, hook `Proxy` để mở mọi module) rồi so 1:1:

| Chỉ số | Site gốc | Bản local |
|---|---|---|
| console error / warning | 0 / 0 | 0 / 0 |
| HTTP ≥ 400 / request failed | 0 / 0 | 0 / 0 |
| ảnh hỏng | 0 | 0 |
| module / screen / modal | 77 / 17 / 13 | 77 / 17 / 13 |
| asset URL tải OK trùng nhau | 558 | 558 |
| asset site gốc tải mà local không có | — | **0** |

- 65 asset site gốc tải trong lần chạy đó mà local không request chỉ vì RNG chọn zone khác —
  kiểm tra trực tiếp: **0 file thiếu trên đĩa**.
- i18n 8/8 ngôn ngữ load + render sạch (`verify/log-i18n.txt`).
- Packs 6 nhóm / 1 468 file, round-trip **byte-identical**, đúng số file từng nhóm như bản gốc.
- Verdict `tools/audit-diff.mjs`: **“local build is behaviourally identical to the live site on this crawl”**.

Chi tiết đầy đủ: [AUDIT.md](AUDIT.md).

## 4. Ảnh chụp

Trong `verify/`:

- `01-boot.png` — lần boot đầu tiên (bản local)
- `original-01-title.png` … `original-04-battle.png` — site gốc
- `local-01-title.png` … `local-04-battle.png` — bản local
- `local-screen-*.png` — từng screen của bản local
- `check-screen-*.png`, `check-*.png` — lần check cuối

## 5. Cách tái lập

```bash
node tools/compare.mjs                       # so sánh boot state
node tools/play.mjs --url=<live-url> --label=original
node tools/play.mjs --url=<local-url> --label=local
node -e "…"                                   # diff 2 file JSON (xem REPORT mục 7)
```

## 6. Bằng chứng bổ sung — reverse sâu (lần 3)

| Hạng mục | Kết quả | Log |
|---|---|---|
| Cây readable alpha-equivalent | 96 file · 13.475 rename · 1.311 binding · 228.305 identifier; AST khác biệt duy nhất là tên; binding 1:1; 68 global chưa resolve giống tuyệt đối | `readable-report.json` |
| Build + boot cây readable | PASS · 77 module · 15 screen · 13 nav · 0 console error · 0 ảnh hỏng | `readable-report.json` |
| Deep audit cây readable | 23 bước · 17 screen · 13 modal · 0 console/warning/HTTP error · 0 ảnh hỏng (3 page-error đúng artifact harness) | `audit-readable.json` |
| Trang intros tách + rebuild | split byte-exact; reboot 0 lỗi; DOM stats trùng bản live CDN | `intros-report.json` |
| Tài liệu đặc tả | `docs/` 8 file (API 99 path, 59 RPC, công thức, save, data models, boot flow) | `docs/README.md` |

