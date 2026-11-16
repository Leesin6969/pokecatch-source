# Module system — namespace `t`, lock và seal

Toàn bộ game nằm trong **một IIFE**. Không có `import`/`export`, không có module bundler runtime:
95 file nối tiếp nhau, mỗi file gắn API của mình lên một **namespace proxy** tên là `t`.
Đây là cơ chế cốt lõi cần hiểu trước khi đọc bất kỳ module nào (prelude: `src/js/000-prelude.js`).

## 1. Bốn đối tượng của prelude

| Biến gốc (canonical) | Tên readable | Vai trò |
|---|---|---|
| `ko` | `MODULES` | Object registry: mỗi module là 1 accessor `get/set <Name>` |
| `Oo, Io, …` (76 slot) | `slot_<Name>` | Biến giữ giá trị thật của từng module |
| `Sa` | `SEALED` | Snapshot đóng băng sau khi gọi `__seal()` (chế độ lock) |
| `io` | `GLOBAL` | `globalThis` |
| `Ro` | `BOUND_CACHE` | `WeakMap` cache hàm global đã `.bind(globalThis)` |
| `vo` | `isModuleName` | `hasOwnProperty(MODULES, name)` |
| `ri` | `lockProperty` | Biến một property thành accessor khoá (dùng cho `__seal`) |
| `Qr` | `TIMERS` | `{ setTimeout, setInterval, requestAnimationFrame, performance }` |
| `e` | `tr` | Hàm dịch (`t._t`), module `_t` |

## 2. `t` là Proxy — đọc/ghi rơi vào 3 nhánh

```js
t = new Proxy(Object.create(null), {
  get(_, name) {
    if (isModuleName(name)) return MODULES[name];          // 1. module nội bộ
    if (TIMERS.hasOwnProperty(name)) return TIMERS[name];  // 2. timer wrapper
    const v = GLOBAL[name];                                // 3. global của browser
    return typeof v !== 'function' ? v
      : (BOUND_CACHE.has(v) || BOUND_CACHE.set(v, v.bind(GLOBAL)), BOUND_CACHE.get(v));
  },
  set(_, name, v) { isModuleName(name) ? (MODULES[name] = v) : (GLOBAL[name] = v); return true; },
  has(_, name) { return isModuleName(name) || name in GLOBAL; },
  deleteProperty(_, name) { isModuleName(name) ? (MODULES[name] = undefined) : delete GLOBAL[name]; return true; },
});
```

Hệ quả thực tế:

- `t.UI`, `t.Game`, `t.Screens`… → đọc module registry.
- `t.setTimeout`, `t.setInterval`, `t.requestAnimationFrame`, `t.performance.now` → wrapper **đã bind**,
  gọi được không cần `window.`; đây là lý do code có thể viết `t.setTimeout(fn, 100)`.
- `t.document`, `t.localStorage`, `t.navigator`… → fallback sang global, hàm được bind sẵn
  (nhờ `BOUND_CACHE`, không tạo rác).
- **Ghi** `t.X = …` trên tên không phải module sẽ ghi thẳng vào `globalThis` (đây là cách app đặt
  `window.__…` nếu cần, nhưng phần lớn code dùng `t.X` để đọc global).

## 3. Định nghĩa module = accessor + slot + 2 chế độ

Mỗi module được khai báo trong prelude theo mẫu:

```js
ko = {
  get UI() { return Sa ? Sa.UI : slot_UI; },
  set UI(a) { Sa ? console.warn("Poke'Catch: UI is locked") : (slot_UI = a); },
  …
  __seal() { … }   // method duy nhất của registry
}
```

- **Bình thường** (`SEALED = null`): `t.UI = value` gán vào slot, `t.UI` trả về slot.
- **Sau `t.__seal()`**: prelude chụp toàn bộ module hiện tại vào object frozen `SEALED`; từ đó
  `t.UI` trả `SEALED.UI`, mọi lần **ghi** bị chặn và chỉ `console.warn("Poke'Catch: UI is locked")`.
  Cơ chế này bảo vệ game khỏi bị module lạ ghi đè sau khi mọi thứ đã khởi tạo.

`__seal()` cũng đi qua `lockProperty` (`ri`) cho từng tên: thay vì tham chiếu, mỗi property trở thành
accessor khoá trên object `SEALED`.

## 4. Thứ tự nạp và vì sao 95 file nối tiếp an toàn

- File nạp theo **thứ tự tên** (`001` → `095`), chia tầng: data → state → simulation → systems →
  UI core → FX → screens → boot.
- Mỗi file chạy **ngay** IIFE của mình và gán `t.<Module> = (function(){ … })()`.
- Tham chiếu chéo được phép **trong thân hàm** (lazy): module A chỉ chạm `t.B` lúc runtime, không lúc
  nạp. Vì vậy thứ tự file chỉ quan trọng với **dữ liệu đọc ngay lúc nạp** (các bảng `001`–`029`) và
  file cuối `095-app-boot.js` (khởi động toàn bộ).
- Kiểm chứng: 77 module đều có mặt sau boot (`audit-runtime` báo `modules: 77`); đồ thị phụ thuộc
  file→module ở `docs/ARCHITECTURE.md`.

## 5. Vì sao đọc code readable dễ hơn

Canonical giữ tên terser (`Oo`, `ko`, `io`, `Sa`, `vo`…). Cây readable đã đổi các tên này thành
`slot_*`, `MODULES`, `GLOBAL`, `SEALED`, `isModuleName`, và quan trọng hơn: **tên hàm export**
(`t.Game.makeMon`, `t.UI.esc`…) được trả lại cho binding nội bộ của module, nên khi đọc
`src/readable/js/030-game.js` thấy `function makeMon(...)` thay vì `function ct(...)`.

Đổi tên này là alpha-rename thuần, được chứng minh bằng `tools/verify-readable.mjs` (xem
`verify/readable-report.json`): lockstep AST + ánh xạ binding 1:1 + build/boot/deep-audit.
