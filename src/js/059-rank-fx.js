/**
 * rank fx
 *
 * Public API on the game namespace `t`: t.RankFx
 *
 * Recovered from the shipped bundle — original chunk #58 at byte 1478605 (11198 bytes, sha256:9dfc6ddd4d71a4a6).
 * This file is one original source file; the build concatenates them in filename order.
 */
t.RankFx = (function () {
  const b = (_) => [1, 3, 5].map((we) => parseInt(_.slice(we, we + 2), 16)),
    f = ["#ffffff", "#fff6c8", "#ffe066", "#f5c518", "#c98a0a", "#5a3a06"].map(b),
    ue = ["", "I", "II", "III", "IV", "V"],
    H = () =>
      !!(t.CHEAT?.noAnim || t.Game.S.reducedAnim || matchMedia("(prefers-reduced-motion: reduce)").matches),
    vt = (_, we = 0, ie = 0) => {
      const U = Math.sin(_ * 127.1 + we * 311.7 + ie * 74.7) * 43758.5453;
      return U - Math.floor(U);
    },
    B = (_) =>
      new Promise((we, ie) => {
        const U = new Image();
        ((U.onload = () => we(U)), (U.onerror = ie), (U.src = _));
      }),
    se = (_) => {
      const we = document.createElement("canvas");
      ((we.width = _.width), (we.height = _.height));
      const ie = we.getContext("2d");
      return (
        ie.drawImage(_, 0, 0),
        { w: _.width, h: _.height, d: ie.getImageData(0, 0, _.width, _.height).data }
      );
    };
  function Ge(_) {
    let we = _.w,
      ie = 0,
      U = _.h,
      Ne = 0;
    for (let te = 0; te < _.h; te++)
      for (let K = 0; K < _.w; K++)
        _.d[(te * _.w + K) * 4 + 3] > 100 &&
          ((we = Math.min(we, K)), (ie = Math.max(ie, K)), (U = Math.min(U, te)), (Ne = Math.max(Ne, te)));
    const T = ie - we + 1,
      L = Ne - U + 1,
      R = new Uint8ClampedArray(T * L * 4);
    for (let te = 0; te < L; te++)
      for (let K = 0; K < T; K++)
        for (let He = 0; He < 4; He++) R[(te * T + K) * 4 + He] = _.d[((te + U) * _.w + K + we) * 4 + He];
    return { w: T, h: L, d: R };
  }
  function Je(_) {
    const we = [];
    for (let U = 0; U < _.d.length; U += 4) _.d[U + 3] > 128 && we.push([_.d[U], _.d[U + 1], _.d[U + 2]]);
    const ie = (U) => U[0] * 0.3 + U[1] * 0.59 + U[2] * 0.11;
    return (
      we.sort((U, Ne) => ie(Ne) - ie(U)),
      [0, 0.15, 0.35, 0.6, 0.85].map((U) => we[Math.floor(U * (we.length - 1))])
    );
  }
  let Ze = 140,
    x = 110,
    $,
    X,
    Tt,
    le = 0;
  const P = (_, we, ie) => {
      if (((_ |= 0), (we |= 0), _ < 0 || we < 0 || _ >= Ze || we >= x)) return;
      const U = (we * Ze + _) * 4;
      ((Tt[U] = ie[0]), (Tt[U + 1] = ie[1]), (Tt[U + 2] = ie[2]), (Tt[U + 3] = 255));
    },
    u = (_, we, ie, U) => {
      if (((_ |= 0), (we |= 0), _ < 0 || we < 0 || _ >= Ze || we >= x || U <= 0)) return;
      const Ne = (we * Ze + _) * 4,
        T = Tt[Ne + 3] / 255,
        L = U + T * (1 - U);
      for (let R = 0; R < 3; R++) Tt[Ne + R] = Math.round((ie[R] * U + Tt[Ne + R] * T * (1 - U)) / L);
      Tt[Ne + 3] = Math.round(L * 255);
    },
    ve = (_, we, ie, U) => {
      if (((_ |= 0), (we |= 0), _ < 0 || we < 0 || _ >= Ze || we >= x || U <= 0)) return;
      const Ne = (we * Ze + _) * 4,
        T = Math.round(U * 255);
      Tt[Ne + 3] >= T || ((Tt[Ne] = ie[0]), (Tt[Ne + 1] = ie[1]), (Tt[Ne + 2] = ie[2]), (Tt[Ne + 3] = T));
    },
    it = (_, we, ie) => ((_ + we + ie) & 1) === 0,
    De = (_) => {
      const we = (_[0] * 0.3 + _[1] * 0.59 + _[2] * 0.11) / 255;
      return f[we > 0.82 ? 0 : we > 0.64 ? 1 : we > 0.46 ? 2 : we > 0.3 ? 3 : we > 0.16 ? 4 : 5];
    },
    je = (_, we, ie) => Math.max(0, Math.min(1, (_ - we) / (ie - we))),
    pt = (_) => 1 - (1 - _) ** 3;
  function re(_, we, ie, U = {}) {
    const Ne = U.s ?? 1,
      T = U.sy ?? 1,
      L = Math.max(1, Math.round((_.w * Ne) / Math.sqrt(T))),
      R = Math.max(1, Math.round(_.h * Ne * T)),
      te = Math.round(we - L / 2),
      K = Math.round(ie - R),
      He = (m, z) => {
        const pe = Math.min(_.w - 1, Math.floor((m * _.w) / L)),
          V = Math.min(_.h - 1, Math.floor((z * _.h) / R)),
          lt = (V * _.w + pe) * 4;
        return _.d[lt + 3] > 100 ? [_.d[lt], _.d[lt + 1], _.d[lt + 2]] : null;
      };
    for (let m = 0; m < R; m++)
      for (let z = 0; z < L; z++) {
        const pe = He(z, m);
        pe && P(te + z, K + m, U.tint ? De(pe) : pe);
      }
    if (U.rim)
      for (let m = -1; m <= R; m++)
        for (let z = -1; z <= L; z++) {
          const pe = (V, lt) => V >= 0 && lt >= 0 && V < L && lt < R && He(V, lt);
          !pe(z, m) &&
            (pe(z + 1, m) || pe(z - 1, m) || pe(z, m + 1) || pe(z, m - 1)) &&
            P(te + z, K + m, U.rim);
        }
  }
  function We(_, we, ie, U, Ne, T) {
    for (let L = 0; L < 6.2832; L += 1 / ie / 1.5) {
      const R = Math.round(_ + Math.cos(L) * ie),
        te = Math.round(we + Math.sin(L) * ie);
      (!T || it(R, te, Ne)) && P(R, te, U);
    }
  }
  function oe(_, we, ie, U) {
    const Ne = Math.round(Math.hypot(Ze, x) * 0.55),
      T = Math.floor(ie / 90) * 0.045,
      L = Math.min(1, ie / 300);
    for (let R = -Ne; R <= Ne; R++)
      for (let te = -Ne; te <= Ne; te++) {
        const K = Math.hypot(te, R);
        if (K > Ne * L || K < 6) continue;
        const He = Math.pow(1 - K / Ne, 1.6) * Math.min(1, (K - 6) / 10) * U,
          m = Math.atan2(R, te) + T,
          z = ((m % (Math.PI / 6)) + Math.PI / 6) % (Math.PI / 6),
          pe = Math.atan2(R, te) - T * 1.4,
          V = ((pe % (Math.PI / 5)) + Math.PI / 5) % (Math.PI / 5);
        (z < 0.12 && ve(_ + te, we + R, f[K < Ne * 0.3 ? 2 : 3], 0.9 * He),
          V < 0.05 && ve(_ + te, we + R, f[1], 0.8 * He));
      }
  }
  const $e = new WeakMap(),
    Z = (_) =>
      $e.get(_) ||
      (() => {
        const we = [],
          ie = (U, Ne) => U >= 0 && Ne >= 0 && U < _.w && Ne < _.h && _.d[(Ne * _.w + U) * 4 + 3] > 100;
        for (let U = 0; U < _.h; U++)
          for (let Ne = 0; Ne < _.w; Ne++)
            ie(Ne, U) && (!ie(Ne - 1, U) || !ie(Ne + 1, U) || !ie(Ne, U - 1)) && we.push([Ne, U]);
        return ($e.set(_, we), we);
      })();
  function A(_, we, ie, U, Ne) {
    if (U <= 0 || H()) return;
    const T = Math.round(we - _.w / 2),
      L = ie - _.h,
      R = Math.floor(Ne / 80);
    for (const [te, K] of Z(_)) {
      const He = vt(te, R, K % 7),
        m = Math.round(U * (2 + 5 * He));
      if (!(He < 0.62 - U * 0.3))
        for (let z = 1; z <= m; z++) {
          const pe = z < m * 0.35 ? f[1] : z < m * 0.7 ? f[2] : f[3];
          (z > m - 2 && !it(T + te, L + K - z, le)) || P(T + te + (z > 3 && He > 0.8 ? 1 : 0), L + K - z, pe);
        }
    }
  }
  function J(_, we, ie) {
    const U = 14 + Math.round(ie * 22),
      Ne = 3 + Math.round(ie * 3);
    for (let T = -Ne; T <= Ne; T++)
      for (let L = -U; L <= U; L++) {
        const R = Math.hypot(L / U, T / Ne);
        R > 1 || u(_ + L, we + T, R < 0.4 ? f[1] : R < 0.75 ? f[2] : f[3], (1 - R) * 0.75 * ie);
      }
  }
  let de = null,
    _e = null,
    Re = 0;
  const dt = (_) => _e.querySelector(_),
    qe = () => zn.now(),
    ce = (_, we) => {
      const ie = de;
      Wa(() => {
        de === ie && _();
      }, we);
    },
    tt = (_, we) => {
      de.fired[_] || ((de.fired[_] = 1), we());
    },
    mt = (_, we) => {
      H() || (de.shake = { a: _, until: qe() + we });
    };
  function Te(_) {
    if (H()) return;
    const we = dt(".rk-flash");
    ((we.style.opacity = _), ce(() => (we.style.opacity = _ / 2), 50), ce(() => (we.style.opacity = 0), 100));
  }
  function At(_, we, ie, U, Ne = 1, T = "shard", L = 0) {
    if (!H())
      for (let R = 0; R < _; R++) {
        const te = vt(R, _, we + ie + (qe() % 97)) * 6.283,
          K = (0.03 + vt(R, 5) * 0.06) * Ne;
        de.parts.push({
          x: we,
          y: ie,
          vx: Math.cos(te) * K,
          vy: Math.sin(te) * K - L,
          g: 12e-5,
          born: qe(),
          life: 450 + vt(R, 9) * 500,
          c: U[R % U.length],
          kind: T,
        });
      }
  }
  function yt(_) {
    const we = dt(".rk-num");
    ((we.textContent = ue[de.rank]),
      (we.style.top = (_ - 18) * 4 + "px"),
      we.animate(
        H()
          ? [{ opacity: 0 }, { opacity: 1 }]
          : [
              { opacity: 0, transform: "translateY(-60px) scale(2.2)" },
              { opacity: 1, transform: "translateY(0) scale(.9)", offset: 0.7 },
              { opacity: 1, transform: "scale(1)" },
            ],
        { duration: 360, easing: "steps(6)", fill: "forwards" },
      ),
      ce(() => {
        (Te(0.25), mt(3, 220));
        const ie = Math.round(Ze / 2);
        for (let U = 0; U < 2; U++) de.rings.push({ t0: qe() + U * 100, cx: ie, cy: _, r0: 4 });
        At(10, ie, _, [f[1], f[2], f[3]], 0.9, "spark");
      }, 300));
  }
  function he(_, we, ie, U) {
    const Ne = dt(".rk-lv");
    ((Ne.style.top = U * 4 + "px"), (Ne.style.opacity = 1));
    const T = qe(),
      L = () => {
        if (!_e) return;
        const R = H() ? 1 : Math.min(1, (qe() - T) / ie);
        ((Ne.innerHTML = e("Nv. {n}", { n: `<b>${Math.round(_ + (we - _) * pt(R))}</b>` })), R < 1 && es(L));
      };
    L();
  }
  function fe() {
    const _ = dt(".rk-line"),
      we = t.UI.esc;
    ((_.innerHTML = e('Félicitations ! <b>{name}</b> passe au rang <b class="rk-say">{r}</b> !', {
      name: we(t.Game.DEX[de.mon.id].name),
      r: ue[de.rank],
    })),
      _.animate(
        [
          { opacity: 0, transform: "translateY(8px)" },
          { opacity: 1, transform: "none" },
        ],
        { duration: 260, fill: "forwards" },
      ),
      (dt(".rk-skip").hidden = !0),
      (dt(".rk-ok").hidden = !1));
  }
  function Oe() {
    de.applied || ((de.applied = !0), de.onApply?.());
  }
  function Ee() {
    if (((Re = es(Ee)), !de)) return;
    le++;
    const _ = de.skipped ? 1e9 : qe() - de.t0,
      we = de.P,
      ie = de.GEM,
      U = de.GPAL,
      Ne = de.need;
    let T = Math.round(Ze / 2),
      L = Math.round(x * 0.62);
    if (de.shake && qe() < de.shake.until && le % 2 === 0) {
      const Ht = de.shake.a;
      ((T += Math.round((vt(le, 1) - 0.5) * 2 * Ht)), (L += Math.round((vt(le, 2) - 0.5) * Ht)));
    }
    Tt.fill(0);
    const R = L - we.h,
      te = L - we.h / 2,
      K = Math.max(we.w, we.h) * 0.55 + 8,
      He = 1100,
      m = 360,
      z = He + Ne * m + 200,
      pe = z + 1100,
      V = Array.from({ length: Ne }, (Ht, ct) => _ >= He + ct * m + 200).filter(Boolean).length,
      lt =
        _ < z
          ? (V / Ne) * 0.6
          : _ < pe
            ? 0.6 + 0.4 * je(_, z, pe)
            : Math.max(0.15, 1 - je(_, pe, pe + 1400) * 0.85);
    ((dt(".rk-dim").style.opacity =
      _ < pe ? Math.min(0.62, 0.2 + lt * 0.42) : Math.max(0.3, 0.62 - je(_, pe + 600, pe + 1600) * 0.32)),
      _ >= pe &&
        (tt("rel", () => {
          (Oe(),
            de.skipped ||
              (Te(0.55),
              mt(6, 380),
              de.rings.push({ t0: qe(), cx: T, cy: te, r0: 10 }, { t0: qe() + 120, cx: T, cy: te, r0: 10 }),
              At(22, T, te, [f[0], f[1], f[2], f[3]], 1.5, "shard", 0.05),
              At(8, T, R, [f[1], f[2]], 1.1, "spark", 0.07),
              t.Sfx?.open?.()));
        }),
        !H() && !de.skipped && oe(T, te, _ - pe, Math.max(0, 1 - je(_, pe + 1200, pe + 2200)))),
      J(T, L, lt));
    let kt = 0;
    for (let Ht = 0; Ht < Ne; Ht++) {
      const ct = He + Ht * m;
      (_ >= ct + 200 && _ < ct + 320 && (kt = 1),
        _ >= ct + 200 &&
          !de.skipped &&
          tt("b" + Ht, () => {
            (At(8, T, te, U, 1),
              At(3, T, te, [f[1], f[2]], 0.7, "spark"),
              de.rings.push({ t0: qe(), cx: T, cy: te, r0: 6 }),
              mt(2 + Ht, 160),
              Te(0.12),
              t.Sfx?.click?.());
          }));
    }
    if (!H() && _ > He && _ < pe && le % 2 === 0)
      for (let Ht = 0; Ht < Math.max(1, Math.round(lt * 2)); Ht++) {
        const ct = vt(le, Ht, 3) * 6.283,
          wt = 44 + vt(le, Ht, 5) * 30;
        de.intake.push({
          x: T + Math.cos(ct) * wt,
          y: te + Math.sin(ct) * wt * 0.8,
          c: vt(le, Ht, 7) < 0.25 ? U[1] : f[1 + (Ht % 3)],
        });
      }
    de.intake = de.intake.filter((Ht) => {
      const ct = T - Ht.x,
        wt = te - Ht.y,
        ge = Math.hypot(ct, wt);
      if (ge < 5 || _ >= pe) return !1;
      const Fe = 0.9 + lt * 1.6,
        gt = Ht.x,
        Dt = Ht.y;
      return (
        (Ht.x += (ct / ge) * Fe - (wt / ge) * Fe * 0.55),
        (Ht.y += (wt / ge) * Fe + (ct / ge) * Fe * 0.55),
        P(Math.round(Ht.x), Math.round(Ht.y), Ht.c),
        it(Math.round(gt), Math.round(Dt), le) && P(Math.round(gt), Math.round(Dt), f[3]),
        !0
      );
    });
    const ra = !H() && _ > z && _ < pe && le % 3 === 0 ? (le % 2 ? 1 : -1) : 0;
    let Vt = 1,
      Xt = 0;
    if (!H()) {
      Vt = 1 + (Math.round(Math.sin(_ / (_ < pe ? 320 - lt * 140 : 420)) * 2) / 100) * 1.5;
      for (let wt = 0; wt < Ne; wt++) {
        const ge = He + wt * m + 200;
        _ >= ge && _ < ge + 90 ? (Vt = 0.84) : _ >= ge + 90 && _ < ge + 200 && ((Vt = 1.08), (Xt = 2));
      }
      _ >= z && _ < pe && (Vt = Math.min(Vt, 1 - 0.2 * je(_, pe - 700, pe)));
      const Ht = pe + 620,
        ct = je(_, pe, Ht);
      _ >= pe && _ < Ht
        ? ((Xt = Math.round(Math.sin(ct * Math.PI) * 16)), (Vt = ct < 0.2 ? 1.22 : ct < 0.5 ? 1.1 : 0.96))
        : _ >= Ht && _ < Ht + 110
          ? (Vt = 0.8)
          : _ >= Ht + 110 && _ < Ht + 220 && (Vt = 1.06);
      for (const wt of [Ht + 520, Ht + 820])
        if (_ >= wt && _ < wt + 260) {
          const ge = je(_, wt, wt + 260);
          ((Xt = Math.round(Math.sin(ge * Math.PI) * 5)), (Vt = ge < 0.15 || ge > 0.85 ? 0.9 : 1.05));
        }
    }
    (A(we, T + ra, L - Xt, lt, _),
      re(we, T + ra, L - Xt, {
        tint: kt,
        rim: _ > He ? (Math.floor(_ / (_ < pe ? 110 : 260)) % 2 ? f[1] : f[3]) : null,
        sy: Vt,
      }));
    for (let Ht = 0; Ht < Ne && !de.skipped; Ht++) {
      const ct = (Ht / Ne) * 6.283,
        wt = [
          [-Ze / 2, -20],
          [Ze / 2, -30],
          [-Ze / 2, 30],
          [Ze / 2, 20],
          [0, -x / 2],
        ][Ht],
        ge = He + Ht * m,
        Fe = (ha) => {
          if (ha < 1e3) {
            const ut = pt(je(ha, 300 + Ht * 80, 1e3)),
              jt = ct + ha / 520;
            return [
              T + wt[0] * (1 - ut) + Math.cos(jt) * K * ut,
              te + wt[1] * (1 - ut) + Math.sin(jt) * K * 0.55 * ut,
            ];
          }
          if (ha < ge) {
            const ut = ct + ha / 520;
            return [T + Math.cos(ut) * K, te + Math.sin(ut) * K * 0.55];
          }
          const _t = ct + ge / 520,
            Ea = je(ha, ge, ge + 200) ** 2;
          return [T + Math.cos(_t) * K * (1 - Ea), te + Math.sin(_t) * K * 0.55 * (1 - Ea)];
        };
      if (_ < 300 || _ >= ge + 200) continue;
      for (let ha = 6; ha >= 1; ha--) {
        const [_t, Ea] = Fe(Math.max(0, _ - ha * 28));
        it(Math.round(_t), Math.round(Ea), le + ha) &&
          P(Math.round(_t), Math.round(Ea), ha < 3 ? U[0] : U[2]);
      }
      const [gt, Dt] = Fe(_);
      re(ie, gt, Dt + ie.h * 0.4, { s: 0.8 });
    }
    (_ > pe + 400 &&
      le % 8 === 0 &&
      !H() &&
      !de.skipped &&
      de.parts.push({
        x: T + (vt(le, 3) - 0.5) * Ze * 0.8,
        y: 0,
        vx: (vt(le, 8) - 0.5) * 0.01,
        vy: 0.03 + vt(le, 9) * 0.02,
        g: 0,
        born: qe(),
        life: 1800,
        c: f[vt(le, 4) < 0.5 ? 1 : 2],
        kind: "dot",
      }),
      _ > pe + 250 && tt("slam", () => yt(R - 8)),
      _ > pe + 900 && tt("lv", () => he(de.from, 5, 700, L + 4)),
      _ > pe + 1700 && tt("say", fe),
      (de.rings = de.rings.filter((Ht) => {
        const ct = (qe() - Ht.t0) / 520;
        return ct < 0
          ? !0
          : ct >= 1
            ? !1
            : (H() || We(Ht.cx, Ht.cy, Math.round(Ht.r0 + ct * 46), f[1], le, ct > 0.55), !0);
      })),
      (de.parts = de.parts.filter((Ht) => {
        const ct = qe() - Ht.born;
        if (ct > Ht.life) return !1;
        const wt = Math.round(Ht.x + Ht.vx * ct),
          ge = Math.round(Ht.y + Ht.vy * ct + Ht.g * ct * ct),
          Fe = ct > Ht.life * 0.6;
        return (
          (Fe && le % 2) ||
            (Ht.kind === "shard"
              ? (P(wt, ge, f[0]),
                P(wt - 1, ge, Ht.c),
                P(wt + 1, ge, Ht.c),
                P(wt, ge - 1, Ht.c),
                P(wt, ge + 1, Ht.c))
              : Ht.kind === "spark"
                ? (P(wt, ge, f[0]),
                  Fe || (P(wt - 1, ge, Ht.c), P(wt + 1, ge, Ht.c), P(wt, ge - 1, Ht.c), P(wt, ge + 1, Ht.c)))
                : Ht.kind === "dot"
                  ? (P(wt, ge, Ht.c), Fe || P(wt, ge + 1, f[3]))
                  : P(wt, ge, Ht.c)),
          !0
        );
      })),
      $.putImageData(X, 0, 0));
  }
  async function et({ mon: _, rank: we, need: ie, from: U = 100, onApply: Ne, gem: T }) {
    const L = t.Game,
      R = t.UI,
      te = T || L.DEX[_.id].types[0],
      [K, He] = await Promise.all([B(R.monSrc(_.id, _.shiny)), B(R.itemSrc("gem-" + te))]),
      m = Ge(se(He));
    ((_e = document.createElement("div")),
      (_e.className = "gd-fx rk-fx"),
      (_e.innerHTML = `<div class="gd-stage rk-stage"><div class="rk-dim"></div><canvas></canvas>
        <div class="rk-lv"></div><div class="rk-num"></div><div class="rk-flash"></div><div class="rk-line"></div>
        <button class="gd-skip rk-skip">${R.esc(e("Passer"))} ⏭</button>
        <button class="btn gold gd-ok rk-ok" hidden>${R.esc(e("Super !"))}</button></div>`),
      document.body.appendChild(_e));
    const z = dt(".rk-stage"),
      pe = z.querySelector("canvas");
    return (
      ($ = pe.getContext("2d")),
      (Ze = Math.round(z.clientWidth / 4)),
      (x = Math.round(z.clientHeight / 4)),
      (pe.width = Ze),
      (pe.height = x),
      (pe.style.width = Ze * 4 + "px"),
      (pe.style.height = x * 4 + "px"),
      (X = $.createImageData(Ze, x)),
      (Tt = X.data),
      (de = {
        mon: _,
        rank: we,
        need: ie,
        from: U,
        onApply: Ne,
        P: Ge(se(K)),
        GEM: m,
        GPAL: Je(m),
        t0: qe(),
        fired: {},
        parts: [],
        rings: [],
        intake: [],
        shake: null,
        applied: !1,
        skipped: !1,
      }),
      (dt(".rk-skip").onclick = () => {
        ((de.skipped = !0), (de.parts = []), (de.rings = []), (de.intake = []));
      }),
      cancelAnimationFrame(Re),
      Ee(),
      new Promise((V) => {
        dt(".rk-ok").onclick = () => {
          (Oe(), cancelAnimationFrame(Re), (de = null), _e.remove(), (_e = null), V());
        };
      })
    );
  }
  return { play: et };
})();
