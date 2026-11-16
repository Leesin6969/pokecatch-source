/**
 * clock
 *
 * Public API on the game namespace `t`: t.Clock
 *
 * Recovered from the shipped bundle — original chunk #1 at byte 11367 (2330 bytes, sha256:b4029bdefadc0738).
 * This file is one original source file; the build concatenates them in filename order.
 */
t.Clock = (function () {
  const a = Date,
    b = "pokecatch.clock",
    f = 3e4,
    ue = 5e3,
    H = 3e3,
    vt = 6e4;
  let B = 0,
    se = 0,
    Ge = null,
    Je = !1,
    Ze = !1,
    x = 0,
    $ = null;
  try {
    se = Math.round(+localStorage.getItem(b) || 0);
  } catch {}
  function X() {
    const Z = a.now() + B;
    return Ge ? Math.max(Z, se) : Z < se ? ((B += se - Z), se) : (se = Z);
  }
  const Tt = () => {
      if (!Ge)
        try {
          localStorage.setItem(b, String(X()));
        } catch {}
    },
    le = t.CDN && new URL(t.CDN).origin !== location.origin ? t.CDN : null;
  function P(Z) {
    const A = new AbortController(),
      J = Wa(() => A.abort(), H),
      de = zn.now();
    return fetch(`${Z}?clock=${Math.random().toString(36).slice(2)}`, {
      method: "HEAD",
      cache: "no-store",
      signal: A.signal,
      ...(le && Z.startsWith(le) ? { mode: "cors", credentials: "omit" } : {}),
    })
      .then((_e) => {
        const Re = a.parse(_e.headers.get("date"));
        if (!Re) throw new Error("no date");
        return Re + 500 + (zn.now() - de) / 2;
      })
      .finally(() => clearTimeout(J));
  }
  const u = () => P(location.origin + location.pathname);
  function ve() {
    if (Ge) return Ge;
    const Z = Ze && !Je;
    return (Ge = (le ? P(le + "boot.js") : u())
      .then((A) => {
        const J = A - a.now();
        ((B = Math.abs(J) > f ? Math.round(J) : 0), (se = Math.min(se, a.now() + B + f)), (Je = !0));
      })
      .catch(() => {
        (!Ze && se && (B = se - a.now()), (Je = !1), (x = zn.now()));
      })
      .finally(() => {
        ((Ge = null), (Ze = !0), Tt(), Z && Je && $?.());
      }));
  }
  let it = [a.now(), zn.now()];
  function De() {
    const Z = Math.round(a.now() - it[0] - (zn.now() - it[1]));
    ((it = [a.now(), zn.now()]),
      !Ge &&
        (Math.abs(Z) > f ? ((B -= Z), X(), ve()) : !Je && !document.hidden && zn.now() - x > vt && ve()));
  }
  const je = Function.prototype.toString,
    pt = globalThis,
    re = [
      ["Date", () => pt.Date],
      ["Date.now", () => pt.Date.now],
      ["performance.now", () => pt.performance.now],
      ["setTimeout", () => pt.setTimeout],
      ["setInterval", () => pt.setInterval],
      ["requestAnimationFrame", () => pt.requestAnimationFrame],
    ],
    We = re.map(([, Z]) => Z()),
    oe = (Z) => {
      try {
        return /\[native code\]\s*\}\s*$/.test(je.call(Z));
      } catch {
        return !1;
      }
    };
  function $e() {
    const Z = t.Game?.S;
    Z &&
      (Z.patched?.["Date.now"]?.src === "undefined" &&
        (delete Z.patched["Date.now"], Object.keys(Z.patched).length || delete Z.patched),
      re.forEach(([A, J], de) => {
        const _e = J();
        if ((_e === We[de] && oe(_e)) || Z.patched?.[A]) return;
        let Re = "";
        try {
          Re = je.call(_e);
        } catch {
          Re = String(_e);
        }
        (Z.patched ||= {})[A] = { at: X(), src: Re.slice(0, 300) };
      }));
  }
  return (
    ve(),
    Ss(() => {
      (De(), Tt(), $e());
    }, ue),
    document.addEventListener("visibilitychange", () => {
      (De(), !Je && !document.hidden && ve(), Tt());
    }),
    t.addEventListener("online", () => {
      Je || ve();
    }),
    t.addEventListener("pagehide", Tt),
    {
      now: X,
      ready: () => Ge || Promise.resolve(),
      onForward: (Z) => {
        $ = Z;
      },
      get sure() {
        return Je;
      },
      get skew() {
        return B;
      },
    }
  );
})();
