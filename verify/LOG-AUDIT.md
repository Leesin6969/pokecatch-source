# LOG AUDIT — rà soát toàn bộ log kiểm chứng

Sinh bởi `tools/audit-logs.mjs` lúc 2026-11-16T01:45:26.329Z. Quét **21 log text + 36 report JSON**.
Mọi dòng khớp `error|fail|undefined|404|500|timeout|warn…` đều được phân loại: **known** (đã giải thích, có bằng chứng) hoặc **unknown** (cần xử lý).

## Tổng quan

| chỉ số | giá trị |
|---|---|
| log text | 21 |
| report JSON | 36 |
| dòng khớp từ khóa | 10 |
| trong đó **known/explained** | 10 |
| trong đó **CHƯA giải thích** | **0** |
| report JSON có counter bất thường | **0** |

## Log text

| file | dòng | bytes | khớp | known | unknown |
|---|---|---|---|---|---|
| `log-ast.txt` | 21 | 654 | 0 | 0 | 0 |
| `log-build.txt` | 12 | 431 | 0 | 0 | 0 |
| `log-check-play-fx.txt` | 104 | 3524 | 0 | 0 | 0 |
| `log-check-play-fx10.txt` | 106 | 3829 | 0 | 0 | 0 |
| `log-check-play-fx2.txt` | 106 | 3830 | 0 | 0 | 0 |
| `log-check-play-fx3.txt` | 106 | 3839 | 0 | 0 | 0 |
| `log-check-play-fx4.txt` | 104 | 3570 | 0 | 0 | 0 |
| `log-check-play-fx5.txt` | 105 | 3686 | 0 | 0 | 0 |
| `log-check-play-fx6.txt` | 104 | 3545 | 0 | 0 | 0 |
| `log-check-play-fx7.txt` | 104 | 3548 | 0 | 0 | 0 |
| `log-check-play-fx8.txt` | 105 | 3671 | 0 | 0 | 0 |
| `log-check-play-fx9.txt` | 105 | 3679 | 0 | 0 | 0 |
| `log-check-play-nofx.txt` | 105 | 3693 | 0 | 0 | 0 |
| `log-check-play.txt` | 107 | 3976 | 0 | 0 | 0 |
| `log-data.txt` | 35 | 1466 | 2 | 2 | 0 |
| `log-diff.txt` | 42 | 1569 | 1 | 1 | 0 |
| `log-i18n.txt` | 11 | 768 | 0 | 0 | 0 |
| `log-packs.txt` | 3 | 114 | 0 | 0 | 0 |
| `log-play-original.txt` | 33 | 2136 | 0 | 0 | 0 |
| `log-runtime-local.txt` | 44 | 1799 | 3 | 3 | 0 |
| `log-runtime-original.txt` | 51 | 2519 | 4 | 4 | 0 |

## Report JSON

| file | ok/verdict | errors | warnings | http | missing | pageErrors | ghi chú |
|---|---|---|---|---|---|---|---|
| `asset-black-scan.json` | — | — | — | — | — | — |  |
| `asset-id-audit.json` | — | — | — | — | — | — |  |
| `asset-visibility.json` | — | — | — | — | — | — |  |
| `audit-all.json` | — | — | — | — | — | — |  |
| `audit-data.json` | — | — | — | — | 0 | — |  |
| `audit-diff.json` | — | — | — | — | — | — |  |
| `audit-i18n-local.json` | — | — | — | — | — | — |  |
| `audit-local.json` | — | 0 | 0 | 0 | — | 3 | pageErrors đều known |
| `audit-original.json` | — | 0 | 0 | 0 | — | 4 | pageErrors đều known |
| `audit-readable.json` | — | 0 | 0 | 0 | — | 3 | pageErrors đều known |
| `backend-probe.json` | — | — | — | — | — | — |  |
| `compare.json` | — | — | — | — | — | — |  |
| `download-audit.json` | — | — | — | — | — | — |  |
| `ext-audit.json` | — | — | — | — | — | — |  |
| `ext-probe.json` | — | — | — | — | — | — |  |
| `fetch-missing-report.json` | 94 | — | — | — | — | — |  |
| `intros-assets.json` | — | — | — | — | — | — |  |
| `intros-report.json` | true | — | — | — | — | — |  |
| `last-check.json` | true | — | — | — | — | — |  |
| `live-vs-mirror.json` | — | — | — | — | — | — |  |
| `log-audit.json` | — | — | — | — | — | — |  |
| `no-fx.json` | — | — | — | — | — | — |  |
| `play-check.json` | — | — | — | — | — | — |  |
| `play-debug.json` | — | — | — | — | — | — |  |
| `play-local.json` | — | — | — | — | — | — |  |
| `play-minified.json` | — | — | — | — | — | — |  |
| `play-original.json` | — | — | — | — | — | — |  |
| `probe-cdn.json` | — | — | — | — | — | — |  |
| `readable-report.json` | — | — | — | — | — | — |  |
| `reference-audit.json` | — | — | — | — | — | — |  |
| `report.json` | true | 0 | — | — | — | 0 |  |
| `requests-diff.json` | every live request has a local counterpart | — | — | — | — | — |  |
| `vi-dex-probe.json` | — | — | — | — | — | — |  |
| `vi-final-probe.json` | — | — | — | — | — | — |  |
| `vi-options-probe.json` | — | — | — | — | — | — |  |
| `vi-probe.json` | — | — | — | — | — | — |  |

## Dòng unknown (nếu có)

**Không có.** 100% dòng khớp từ khóa đều đã được phân loại.

## Từ khóa known và lý do

| pattern | lý do |
|---|---|
| `show (market|friends|admin):?.*reading 'show'|Cannot read properties of undefine` | harness gọi App.show vào market/friends/admin — site gốc ném y hệt |
| `reading 'floor'` | lỗi nội tại raid của game gốc (bundle gốc dòng 569), xuất hiện khi audit click đúng nhánh RNG |
| `ReferenceError: Ss is not defined` | audit-data eval module 024/025 ngoài sandbox — hai module cần timer alias từ prelude, không phải lỗi source |
| `Execution context was destroyed.*navigation` | audit trade click reload điều hướng context Puppeteer — flake của harness, không phải lỗi source |
| `starter not received` | log cũ của play automation trước khi sửa driver LinkFx — driver hiện tại nhận starter OK |
| `Cannot read properties of null \(reading 'floor'\)` | trùng lỗi raid gốc ở trên |

## Kết luận

**PASS** — không có log lỗi chưa giải thích; mọi counter bất thường đều thuộc nhóm đã biết (harness gọi screen không tồn tại, bug raid của game gốc, giới hạn sandbox audit-data).
