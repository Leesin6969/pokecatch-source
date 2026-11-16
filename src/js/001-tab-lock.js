/**
 * tab lock
 *
 * Public API on the game namespace `t`: t.TabLock
 *
 * Recovered from the shipped bundle — original chunk #0 at byte 10733 (633 bytes, sha256:9387991d9d4e6ead).
 * This file is one original source file; the build concatenates them in filename order.
 */
t.TabLock = (function () {
  const a = "pokecatch-tab",
    b = Date.now().toString(36) + Math.random().toString(36).slice(2, 8);
  let f = !1;
  const ue = [],
    H = () => {
      f || ((f = !0), ue.forEach((B) => B()));
    },
    vt = () => {
      try {
        localStorage.setItem(a, b);
      } catch {}
    };
  return (
    document.prerendering ? document.addEventListener("prerenderingchange", vt, { once: !0 }) : vt(),
    t.addEventListener("storage", (B) => {
      if (B.key !== a || !B.newValue) return;
      let se;
      try {
        se = localStorage.getItem(a);
      } catch {
        return;
      }
      se && se !== b && H();
    }),
    {
      mine() {
        if (f) return !1;
        let B;
        try {
          ((B = localStorage.getItem(a)), B == null && localStorage.setItem(a, (B = b)));
        } catch {
          return !0;
        }
        return B === b ? !0 : (H(), !1);
      },
      get lost() {
        return f;
      },
      onLost(B) {
        (ue.push(B), f && B());
      },
    }
  );
})();
