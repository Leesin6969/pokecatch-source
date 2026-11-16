/**
 * perf
 *
 * Public API on the game namespace `t`: t.Game.S.reducedAnim, t.Perf
 *
 * Recovered from the shipped bundle — original chunk #45 at byte 1070086 (1473 bytes, sha256:65d9fc8224a505ec).
 * This file is one original source file; the build concatenates them in filename order.
 */
t.Perf = (function () {
  const a = "pokecatch-perf",
    b = matchMedia("(pointer: coarse)").matches || matchMedia("(max-width: 640px)").matches,
    f = ["calm", "weather", "bg", "glass", "glint"],
    ue = {
      eco: { calm: !0, weather: !1, bg: !1, glass: !1, glint: !1, sleep: 12e4 },
      balanced: { calm: !1, weather: !0, bg: !1, glass: !b, glint: !0, sleep: b ? 3e5 : 0 },
      max: { calm: !1, weather: !0, bg: !0, glass: !0, glint: !0, sleep: 0 },
    },
    H = [12e4, 3e5, 0];
  let vt = null;
  function B() {
    if (vt) return vt;
    try {
      vt = JSON.parse(localStorage.getItem(a) || "null");
    } catch {
      vt = null;
    }
    if (!vt || typeof vt != "object") {
      if (!t.Game?.S) return ((vt = null), { ...ue.balanced });
      ((vt = { ...ue.balanced }), t.Game?.S?.reducedAnim && (vt.calm = !0));
    }
    for (const x of f) vt[x] = vt[x] ?? ue.balanced[x];
    return (H.includes(vt.sleep) || (vt.sleep = ue.balanced.sleep), vt);
  }
  const se = () => {
      try {
        localStorage.setItem(a, JSON.stringify(vt));
      } catch {}
    },
    Ge = () => {
      const x = B();
      return (
        Object.keys(ue).find(($) => f.every((X) => ue[$][X] === x[X]) && ue[$].sleep === x.sleep) || "custom"
      );
    };
  function Je() {
    const x = B(),
      $ = document.documentElement,
      X = $.className;
    return (
      $.classList.toggle("no-bg", !x.bg),
      $.classList.toggle("no-glass", !x.glass),
      $.classList.toggle("glass", x.glass),
      $.classList.toggle("no-weather", !x.weather),
      $.classList.toggle("no-glint", !x.glint),
      t.Game?.S && (t.Game.S.reducedAnim = x.calm),
      X !== $.className
    );
  }
  function Ze(x, $) {
    ((vt = B()), x === "preset" ? Object.assign(vt, ue[$]) : (vt[x] = $), se());
    const X = Je();
    (t.UI?.syncCalm(), X && dispatchEvent(new Event("calm")), dispatchEvent(new Event("perf")));
  }
  return (Je(), { touch: b, SLEEPS: H, apply: Je, set: Ze, preset: Ge, get: (x) => B()[x] });
})();
