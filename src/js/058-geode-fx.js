/**
 * geode fx
 *
 * Public API on the game namespace `t`: t.GeodeFx
 *
 * Recovered from the shipped bundle — original chunk #57 at byte 1465627 (12977 bytes, sha256:788ac47551e46be4).
 * This file is one original source file; the build concatenates them in filename order.
 */
t.GeodeFx = (function () {
  const b = (T) => [1, 3, 5].map((L) => parseInt(T.slice(L, L + 2), 16)),
    f = [
      {
        c: "#9aa4b1",
        pal: ["#ffffff", "#e4e8ee", "#b9c1cb", "#8a939e", "#5d6570", "#22262e"],
        taps: 2,
        stop: 30,
        shake: 2,
        flash: 0,
        dim: 0,
        burst: 14,
        rings: 0,
        rays: 0,
        pillar: 8,
      },
      {
        c: "#3b82f6",
        pal: ["#ffffff", "#c8e4ff", "#7cc0ff", "#3b82f6", "#1f4fb0", "#0d1f52"],
        taps: 3,
        stop: 45,
        shake: 3,
        flash: 0.25,
        dim: 0.15,
        burst: 24,
        rings: 1,
        rays: 0,
        pillar: 10,
      },
      {
        c: "#a855f7",
        pal: ["#ffffff", "#f0d6ff", "#d29bff", "#a855f7", "#6b2fb8", "#2a0f58"],
        taps: 4,
        stop: 60,
        shake: 5,
        flash: 0.4,
        dim: 0.4,
        burst: 40,
        rings: 1,
        rays: 1,
        pillar: 14,
      },
      {
        c: "#f5c518",
        pal: ["#ffffff", "#fff6c8", "#ffe066", "#f5c518", "#c98a0a", "#4a2e04"],
        taps: 5,
        stop: 80,
        shake: 7,
        flash: 0.55,
        dim: 0.5,
        burst: 60,
        rings: 2,
        rays: 2,
        pillar: 18,
      },
    ].map((T, L) => ({ ...T, i: L, rgb: T.pal.map(b), key: ["common", "uncommon", "rare", "legendary"][L] })),
    ue = ["Gemme commune", "Gemme peu commune", "Gemme rare", "Gemme légendaire"],
    H = (T, L = 0, R = 0) => {
      const te = Math.sin(T * 127.1 + L * 311.7 + R * 74.7) * 43758.5453;
      return te - Math.floor(te);
    },
    vt = () =>
      !!(t.CHEAT?.noAnim || t.Game.S.reducedAnim || matchMedia("(prefers-reduced-motion: reduce)").matches),
    B = (T) =>
      new Promise((L, R) => {
        const te = new Image();
        ((te.onload = () => L(te)), (te.onerror = R), (te.src = T));
      }),
    se = (T) => {
      const L = document.createElement("canvas");
      ((L.width = T.width), (L.height = T.height));
      const R = L.getContext("2d");
      return (
        R.drawImage(T, 0, 0),
        { w: T.width, h: T.height, d: R.getImageData(0, 0, T.width, T.height).data }
      );
    },
    Ge = [];
  function Je(T, L) {
    const { w: R, h: te, d: K } = L,
      He = (Ht, ct) => Ht >= 0 && ct >= 0 && Ht < R && ct < te && K[(ct * R + Ht) * 4 + 3] >= 128;
    let m = te,
      z = 0,
      pe = R,
      V = 0;
    for (let Ht = 0; Ht < te; Ht++)
      for (let ct = 0; ct < R; ct++)
        He(ct, Ht) &&
          ((m = Math.min(m, Ht)), (z = Math.max(z, Ht)), (pe = Math.min(pe, ct)), (V = Math.max(V, ct)));
    const lt = Math.round((pe + V) / 2),
      kt = [];
    let ra = lt;
    for (let Ht = 0; Ht < te; Ht++) {
      kt[Ht] = ra;
      const ct = H(Ht, T, 9);
      Ht >= m && (ra = Math.max(lt - 3, Math.min(lt + 3, ra + (ct < 0.32 ? -1 : ct > 0.68 ? 1 : 0))));
    }
    const Vt = (Ht) => m + Math.round((z - m) * Ht),
      Xt =
        T >= 2
          ? [
              [Vt(0.3), -1],
              [Vt(0.62), 1],
              ...(T === 3
                ? [
                    [Vt(0.45), -1],
                    [Vt(0.8), 1],
                  ]
                : []),
            ]
          : [];
    return { ...L, solid: He, top: m, bot: z, mid: (m + z) / 2, cx: lt, crack: kt, branches: Xt };
  }
  function Ze(T, L, R) {
    const te = new Set();
    if (!L) return te;
    const K = Math.ceil((Math.min(1, L / 4) * (T.bot - T.top)) / 2 + 1);
    for (let He = T.top; He <= T.bot; He++)
      Math.abs(He - T.mid) <= K && T.solid(T.crack[He], He) && te.add(`${T.crack[He]},${He}`);
    if (L >= R)
      for (const [He, m] of T.branches)
        for (let z = 1; z <= 5; z++) {
          const pe = T.crack[He] + m * (z + 1),
            V = He + Math.ceil(z / 2);
          T.solid(pe, V) && te.add(`${pe},${V}`);
        }
    return te;
  }
  let x = 140,
    $ = 110,
    X,
    Tt,
    le,
    P;
  const u = (T, L, R) => {
      if (((T |= 0), (L |= 0), T < 0 || L < 0 || T >= x || L >= $)) return;
      const te = (L * x + T) * 4;
      ((P[te] = R[0]), (P[te + 1] = R[1]), (P[te + 2] = R[2]), (P[te + 3] = 255));
    },
    ve = (T, L, R) => ((T + L + R) & 1) === 0,
    it = (T, L, R, te) => {
      if (((T |= 0), (L |= 0), T < 0 || L < 0 || T >= x || L >= $ || te <= 0)) return;
      const K = (L * x + T) * 4,
        He = Math.round(te * 255);
      P[K + 3] >= He || ((P[K] = R[0]), (P[K + 1] = R[1]), (P[K + 2] = R[2]), (P[K + 3] = He));
    },
    De = (T, L, R, te) => {
      if (((T |= 0), (L |= 0), T < 0 || L < 0 || T >= x || L >= $ || te <= 0)) return;
      const K = (L * x + T) * 4,
        He = P[K + 3] / 255,
        m = te + He * (1 - te);
      for (let z = 0; z < 3; z++) P[K + z] = Math.round((R[z] * te + P[K + z] * He * (1 - te)) / m);
      P[K + 3] = Math.round(m * 255);
    },
    je = b("#120d0b");
  function pt(T, L, R, te = {}) {
    const { w: K, h: He, d: m } = T,
      z = te.sy || 1,
      pe = 1 / Math.sqrt(z),
      V = Math.round(He * z),
      lt = Math.round(K * pe),
      kt = L - Math.round((lt - K) / 2),
      ra = R + (He - V);
    for (let Vt = 0; Vt < V; Vt++)
      for (let Xt = 0; Xt < lt; Xt++) {
        const Ht = Math.min(K - 1, Math.floor(Xt / pe)),
          ct = Math.min(He - 1, Math.floor(Vt / z)),
          wt = (ct * K + Ht) * 4;
        if (
          m[wt + 3] < 128 ||
          (te.half === "l" && Ht > te.G.crack[ct]) ||
          (te.half === "r" && Ht <= te.G.crack[ct]) ||
          (te.fade && !ve(Xt, Vt, te.fade))
        )
          continue;
        let ge = [m[wt], m[wt + 1], m[wt + 2]];
        if (te.cracks?.has(`${Ht},${ct}`)) ge = te.T.i ? te.T.rgb[1] : je;
        else if (te.cracks && (te.cracks.has(`${Ht - 1},${ct}`) || te.cracks.has(`${Ht + 1},${ct}`)))
          ge = te.T.i ? te.T.rgb[4] : ge.map((Fe) => Fe * 0.55);
        else if (te.half) {
          const Fe = te.half === "l" ? te.G.crack[ct] - Ht : Ht - te.G.crack[ct] - 1;
          if (Fe <= 2) {
            const gt = H(Ht, ct, 4);
            ge = te.T.rgb[[1, 2, 3][Fe] + (gt > 0.7 ? -1 : gt < 0.2 ? 1 : 0)];
          }
        }
        u(kt + Xt, ra + Vt, ge);
      }
    if (te.rim)
      for (let Vt = -1; Vt <= He; Vt++)
        for (let Xt = -1; Xt <= K; Xt++) {
          const Ht = (ct, wt) => ct >= 0 && wt >= 0 && ct < K && wt < He && m[(wt * K + ct) * 4 + 3] >= 128;
          !Ht(Xt, Vt) &&
            (Ht(Xt + 1, Vt) || Ht(Xt - 1, Vt) || Ht(Xt, Vt + 1) || Ht(Xt, Vt - 1)) &&
            u(L + Xt, R + Vt, te.rim);
        }
  }
  function re(T, L, R, te, K, He, m) {
    for (let z = 0; z < K; z++) {
      const pe = Math.round(T + R * z),
        V = Math.round(L + te * z);
      (z > K - 3 && !ve(pe, V, m)) || u(pe, V, He[Math.min(He.length - 1, z === 0 ? 0 : z < K - 2 ? 1 : 2)]);
    }
  }
  function We(T, L, R, te, K, He) {
    let m = R,
      z = 0,
      pe = 1 - R;
    for (; m >= z;) {
      for (const [V, lt] of [
        [m, z],
        [z, m],
        [-z, m],
        [-m, z],
        [-m, -z],
        [-z, -m],
        [z, -m],
        [m, -z],
      ])
        (!He || ve(T + V, L + lt, K)) && u(T + V, L + lt, te);
      (z++, pe < 0 ? (pe += 2 * z + 1) : (m--, (pe += 2 * (z - m) + 1)));
    }
  }
  let oe = null,
    $e = 0,
    Z = null,
    A = 0,
    J = null,
    de = null,
    _e = null;
  const Re = (T) => Z.querySelector(T),
    dt = () => f[oe.t],
    qe = () => zn.now(),
    ce = (T, L) => {
      const R = oe;
      Wa(() => {
        oe === R && T();
      }, L);
    },
    tt = (T, L) => {
      vt() || (oe.shake = { a: T, until: qe() + L });
    };
  function mt(T) {
    if (vt() || !T) return;
    const L = Re(".gd-flash");
    ((L.style.opacity = T), ce(() => (L.style.opacity = T / 2), 50), ce(() => (L.style.opacity = 0), 100));
  }
  const Te = (T) => {
    Re(".gd-dim").style.opacity = T;
  };
  function At(T, L, R, te, K, He = 1) {
    if (!vt())
      for (let m = 0; m < T; m++) {
        const z = H(m, T, $e) * Math.PI * 2,
          pe = (0.04 + H(m, 2, $e) * 0.08) * He;
        oe.parts.push({
          x: L,
          y: R,
          vx: Math.cos(z) * pe,
          vy: Math.sin(z) * pe - 0.05 * He,
          g: 18e-5,
          born: qe(),
          life: 500 + H(m, 5) * 600,
          c: te[m % te.length],
          kind: K[m % K.length],
        });
      }
  }
  const yt = () => [Math.round(x / 2), Math.round($ * 0.44)];
  function he() {
    if (!oe || (oe.phase !== "idle" && oe.phase !== "hit") || qe() < oe.stopUntil) return;
    const T = dt(),
      L = Ge[oe.t];
    ((oe.phase = "hit"),
      oe.taps++,
      (Re(".gd-hint").hidden = !0),
      (Re(".gd-skip").hidden = !1),
      t.Sfx?.click?.());
    let R = !1;
    oe.rolled !== oe.t &&
      oe.t < 3 &&
      oe.taps >= 2 &&
      oe.taps >= T.taps - 1 &&
      ((oe.rolled = oe.t), (R = oe.t < J.to));
    const te = oe.taps >= T.taps && !R;
    ((oe.stopUntil = qe() + (te ? T.stop * 1.6 : T.stop)),
      (oe.squash = qe()),
      tt(te ? T.shake : Math.max(1, T.shake - 2), te ? 280 : 160));
    const [K, He] = yt(),
      m = ((L.top + 6) * L.w + L.cx) * 4;
    if (
      (At(3 + oe.taps, K, He - 4, [[L.d[m], L.d[m + 1], L.d[m + 2]], je, [120, 108, 96]], ["chip"], 0.7), te)
    )
      return et();
    if ((oe.crack++, Te((T.dim * oe.taps) / T.taps), R)) {
      const z = 620 + oe.rises * 160;
      ((oe.stopUntil = qe() + z), (oe.upAt = qe() + T.stop), (oe.upFor = z - T.stop), ce(Ee, z));
    }
  }
  const fe = (T, L) => T.map((R, te) => [0, 1, 2].map((K) => Math.round((R[K] + L[te][K]) / 2)));
  function Oe(T, L) {
    if (!oe.upAt || L < oe.upAt) return T;
    const R = f[Math.min(3, T.i + 1)],
      te = (L - oe.upAt) / oe.upFor;
    return te < 1 / 3 ? T : te < 2 / 3 ? { i: R.i, rgb: fe(T.rgb, R.rgb) } : R;
  }
  function Ee() {
    if (!oe.upAt) return;
    ((oe.upAt = 0), (oe.t = Math.min(3, oe.t + 1)), oe.rises++);
    const T = dt(),
      [L, R] = yt(),
      te = oe.rises;
    for (let K = 0; K < te; K++) oe.rings.push({ t0: qe() + K * 110 });
    (Te((T.dim * oe.taps) / T.taps),
      Z.style.setProperty("--c", T.c),
      te > 1 && mt(Math.min(0.3, 0.12 * te)),
      tt(T.shake + te, 260 + te * 60),
      At(16 + 10 * te, L, R, [T.rgb[1], T.rgb[2], T.rgb[0]], ["spark", "shard"], 1 + 0.15 * te));
  }
  function et() {
    const T = dt(),
      [L, R] = yt();
    ((oe.phase = "open"),
      (oe.crack = T.taps - 1),
      (oe.t0 = qe()),
      Te(T.dim),
      mt(T.flash),
      (oe.halves = { t0: qe() }),
      At(
        T.burst,
        L,
        R,
        [T.rgb[1], T.rgb[2], T.rgb[3], T.rgb[0]],
        ["shard", "shard", "spark", "chip"],
        1 + T.i * 0.3,
      ));
    for (let te = 0; te < T.rings; te++) oe.rings.push({ t0: qe() + te * 120 });
    (ce(
      () => {
        ((oe.rays = T.rays), (oe.pillar = { t0: qe() }));
      },
      vt() ? 0 : 110,
    ),
      ce(
        () => {
          oe.gem = { t0: qe() };
        },
        vt() ? 0 : 240,
      ),
      ce(_, vt() ? 50 : 820));
  }
  async function _() {
    if (!oe || oe.phase === "done") return;
    oe.t = J.to;
    const T = dt(),
      L = e(t.TYPES[J.type]?.fr || J.type);
    if (
      ((oe.phase = "done"),
      (oe.halves = null),
      (oe.upAt = 0),
      (oe.t0 ||= qe()),
      (oe.gem ||= { t0: qe() - 9999 }),
      (oe.pillar ||= { t0: qe() - 9999 }),
      (oe.rays = vt() ? 0 : T.rays),
      Te(T.dim),
      Z.style.setProperty("--c", T.c),
      (Re(".gd-card .nm").innerHTML = `${t.UI.esc(L)}${J.isNew ? '<span class="new">NEW</span>' : ""}`),
      (Re(".gd-card .tier").textContent = e(ue[T.i])),
      (Re(".gd-card").hidden = !1),
      (Re(".gd-skip").hidden = !0),
      (Re(".gd-ok").hidden = !1),
      T.i >= 2)
    ) {
      const R = Re(".gd-banner");
      ((R.textContent = T.i === 3 ? e("Légendaire !") : e("Rare !")), (R.hidden = !1));
    }
    t.Sfx?.buy?.();
  }
  function we() {
    if (((A = es(we)), !oe)) return;
    $e++;
    const T = qe();
    if (T < oe.stopUntil && (!oe.upAt || T < oe.upAt)) return;
    P.fill(0);
    const L = dt(),
      R = Ge[oe.t],
      [te, K] = yt();
    let He = 0,
      m = 0;
    if (oe.shake && T < oe.shake.until) {
      const V = Math.max(1, Math.round((oe.shake.a * (oe.shake.until - T)) / 300));
      ($e % 2 === 0 && (oe.sh = [Math.round((H($e, 1) - 0.5) * 2 * V), Math.round((H($e, 2) - 0.5) * V)]),
        ([He, m] = oe.sh || [0, 0]));
    }
    if (oe.rays && !vt()) {
      const V = Math.round(Math.hypot(x, $) * 0.55),
        lt = Math.floor((T - oe.t0) / 90) * 0.045,
        kt = Math.min(1, (T - oe.t0) / 350);
      for (let ra = -V; ra <= V; ra++)
        for (let Vt = -V; Vt <= V; Vt++) {
          const Xt = Math.hypot(Vt, ra);
          if (Xt > V * kt || Xt < 5) continue;
          const Ht = Math.pow(1 - Xt / V, 1.6) * Math.min(1, (Xt - 5) / 10),
            ct = Math.atan2(ra, Vt) + lt,
            wt = ((ct % (Math.PI / 5)) + Math.PI / 5) % (Math.PI / 5),
            ge = Math.atan2(ra, Vt) - lt * 1.4,
            Fe = ((ge % (Math.PI / 4)) + Math.PI / 4) % (Math.PI / 4);
          (wt < 0.13 && it(te + Vt, K - 4 + ra, L.rgb[Xt < V * 0.3 ? 2 : 3], 0.95 * Ht),
            oe.rays > 1 && Fe < 0.05 && it(te + Vt, K - 4 + ra, L.rgb[1], 0.85 * Ht));
        }
    }
    if (oe.pillar) {
      const V = Math.min(1, (T - oe.pillar.t0) / 160),
        lt = Math.max(2, Math.round((L.pillar * V) / 2) * 2 - ($e % 12 < 6 ? 0 : 2) * (vt() ? 0 : 1)),
        kt = Math.round(K - (K + 8) * V),
        ra =
          oe.phase === "done" && L.i < 2 && T - oe.pillar.t0 > 900
            ? Math.max(0, 1 - (T - oe.pillar.t0 - 900) / 500)
            : 1,
        Vt = K - 8,
        Xt = K + 30;
      if (ra > 0)
        for (let Ht = kt; Ht < Xt; Ht++) {
          const ct = Ht < Vt ? 0 : (Ht - Vt) / (Xt - Vt),
            wt = Math.max(1, Math.round((lt / 2) * Math.sqrt(1 - ct ** 4)));
          for (let ge = -wt; ge < wt; ge++) {
            const Fe = Math.abs(ge + 0.5) / (lt / 2),
              gt = Fe < 0.2 ? L.rgb[0] : Fe < 0.5 ? L.rgb[1] : Fe < 0.8 ? L.rgb[2] : L.rgb[3];
            ((Fe >= 0.8 || ra < 1) && !ve(te + ge, Ht, $e >> 2)) ||
              (ct ? De(te + ge, Ht, gt, (1 - ct) ** 2 * (3 - 2 * (1 - ct))) : u(te + ge, Ht, gt));
          }
        }
    }
    const z = te - R.w / 2 + He,
      pe = K - R.h / 2 + m;
    if (oe.halves) {
      const V = (T - oe.halves.t0) / 650,
        lt = 1 - Math.pow(1 - Math.min(1, V), 3),
        kt = 8 + L.i * 4,
        ra = V > 0.35 ? Math.round((V - 0.35) ** 2 * 60) : 0;
      if (V < 1)
        for (const [Vt, Xt] of [
          ["l", -1],
          ["r", 1],
        ])
          pt(R, Math.round(z + Xt * lt * kt), pe + ra, {
            half: Vt,
            G: R,
            T: L,
            cracks: Ze(R, oe.crack, L.taps - 1),
            fade: V > 0.55 ? $e : 0,
          });
      else oe.halves = null;
    } else if (oe.phase !== "done" && oe.phase !== "open") {
      const V = Oe(L, T),
        lt = oe.upAt && T >= oe.upAt,
        kt = oe.phase === "idle" && !vt() && Math.floor((T - oe.born) / 500) % 2 ? -1 : 0,
        ra = oe.squash && T - oe.squash < 140 && !vt() ? (T - oe.squash < 70 ? 0.88 : 1.04) : 1,
        Vt = lt
          ? Math.floor((T - oe.upAt) / 180) % 2
            ? V.rgb[2]
            : V.rgb[3]
          : L.i === 3 || (L.i === 2 && oe.taps)
            ? Math.floor(T / 300) % 2
              ? L.rgb[2]
              : L.rgb[3]
            : L.i === 1 && oe.taps
              ? L.rgb[3]
              : null,
        Xt = Ze(R, oe.crack, L.taps - 1);
      if ((pt(R, z, pe + kt, { sy: ra, cracks: Xt, T: V, rim: Vt }), oe.crack && V.i)) {
        const Ht = [...Xt].map((Fe) => Fe.split(",").map(Number)),
          ct = Math.min(Ht.length, 2 + oe.crack * 2),
          wt = 3 + oe.crack * (2 + V.i) + (lt ? Math.floor(((T - oe.upAt) / oe.upFor) * 3) * 2 : 0),
          ge = Math.floor(T / 140) % 2;
        for (let Fe = 0; Fe < ct; Fe++) {
          const [gt, Dt] = Ht[Math.floor(H(Fe, oe.crack, L.i) * Ht.length)],
            ha = Fe % 2 ? 1 : -1,
            _t = (H(Fe, 3) - 0.5) * 0.8;
          re(
            z + gt + ha,
            pe + kt + Dt,
            ha,
            _t,
            wt + ge * (Fe % 3 ? 1 : 0),
            [V.rgb[0], V.rgb[1], V.rgb[2]],
            $e >> 1,
          );
        }
      }
      if (L.i === 3 && oe.taps && !vt() && $e % 6 === 0) {
        const Ht = H($e, 7) * Math.PI * 2,
          ct = 30 + H($e, 8) * 20;
        oe.parts.push({
          x: te + Math.cos(Ht) * ct,
          y: K + Math.sin(Ht) * ct,
          vx: -Math.cos(Ht) * 0.045,
          vy: -Math.sin(Ht) * 0.045,
          g: 0,
          born: T,
          life: 520,
          c: L.rgb[1],
          kind: "spark",
        });
      }
    }
    if (oe.gem && de) {
      const V = Math.min(1, (T - oe.gem.t0) / 420),
        lt = 1 - Math.pow(1 - V, 3),
        kt = V >= 1 && !vt() && Math.floor(T / 600) % 2 ? -1 : 0,
        ra = Math.round(K - de.h / 2 + 4 - lt * 8) + kt;
      (oe.bob !== kt && ((oe.bob = kt), (Re(".gd-fam").style.translate = `0 ${kt * 4}px`)),
        pt(de, te - de.w / 2, ra, { rim: L.rgb[1] }),
        !vt() &&
          V >= 1 &&
          $e % 10 === 0 &&
          oe.parts.push({
            x: te + (H($e, 3) - 0.5) * 40,
            y: ra + H($e, 4) * 30,
            vx: 0,
            vy: -0.008,
            g: 0,
            born: T,
            life: 420,
            c: L.rgb[0],
            kind: "spark",
          }));
    }
    ((oe.rings = oe.rings.filter((V) => {
      const lt = (T - V.t0) / 520;
      return lt < 0
        ? !0
        : lt >= 1
          ? !1
          : (vt() || We(te, K, Math.round(6 + lt * Math.min(x, $) * 0.42), L.rgb[1], $e, lt > 0.55), !0);
    })),
      (oe.parts = oe.parts.filter((V) => {
        const lt = T - V.born;
        if (lt > V.life) return !1;
        const kt = Math.round(V.x + V.vx * lt),
          ra = Math.round(V.y + V.vy * lt + V.g * lt * lt),
          Vt = lt > V.life * 0.6;
        return (
          (Vt && $e % 2) ||
            (V.kind === "chip"
              ? (u(kt, ra, V.c), lt < V.life * 0.4 && u(kt + 1, ra, V.c))
              : V.kind === "shard"
                ? (u(kt, ra, L.rgb[0]),
                  u(kt - 1, ra, V.c),
                  u(kt + 1, ra, V.c),
                  u(kt, ra - 1, V.c),
                  u(kt, ra + 1, L.rgb[4]))
                : (u(kt, ra, L.rgb[0]),
                  Vt || (u(kt - 1, ra, V.c), u(kt + 1, ra, V.c), u(kt, ra - 1, V.c), u(kt, ra + 1, V.c)))),
          !0
        );
      })),
      Tt.putImageData(le, 0, 0));
  }
  let ie = null;
  const U = () =>
    (ie ||= Promise.all(f.map((T) => B(`assets/ui/underground/geode-${T.key}.png`)))
      .then((T) => T.forEach((L, R) => (Ge[R] = Je(R, se(L)))))
      .catch((T) => {
        throw ((ie = null), T);
      }));
  async function Ne(T, L, R) {
    (await U(), (de = await B(`assets/items/gem-${T.type}.png`).then(se, () => null)), (J = T));
    const te = t.UI.esc;
    ((Z = document.createElement("div")),
      (Z.className = "gd-fx"),
      (Z.innerHTML = `<div class="gd-stage"${L ? ` style="background-image:url(assets/bg/underground/${te(L)}.png)"` : ""}>
        <div class="gd-veil"></div><div class="gd-dim"></div><canvas></canvas>
        <div class="gd-hint">${te(e("Touche la géode pour la casser"))}</div>
        <div class="gd-banner" hidden></div>
        <div class="gd-fam" hidden><img alt=""></div>
        <div class="gd-card" hidden><div class="nm"></div><span class="tier"></span></div>
        <div class="gd-flash"></div>
        <button class="gd-skip" hidden>${te(e("Passer"))} ⏭</button>
        <button class="btn gold gd-ok" hidden>${te(R || e("Super !"))}</button>
      </div>`),
      document.body.appendChild(Z));
    const K = Re(".gd-stage");
    ((X = K.querySelector("canvas")),
      (Tt = X.getContext("2d")),
      (x = Math.round(K.clientWidth / 4)),
      ($ = Math.round(K.clientHeight / 4)),
      (X.width = x),
      (X.height = $),
      (X.style.width = x * 4 + "px"),
      (X.style.height = $ * 4 + "px"),
      (le = Tt.createImageData(x, $)),
      (P = le.data));
    const [He, m] = yt();
    return (
      (Re(".gd-hint").style.top = (m + 30) * 4 + "px"),
      (Re(".gd-card").style.top = (m + 22) * 4 + "px"),
      Object.assign(Re(".gd-fam").style, { left: He * 4 + 10 + "px", top: m * 4 - 12 + "px" }),
      (oe = {
        t: T.from,
        taps: 0,
        crack: 0,
        phase: "idle",
        stopUntil: 0,
        shake: null,
        squash: 0,
        parts: [],
        rings: [],
        halves: null,
        pillar: null,
        gem: null,
        rays: 0,
        upAt: 0,
        rolled: -1,
        rises: 0,
        born: qe(),
      }),
      Z.style.setProperty("--c", f[T.from].c),
      X.addEventListener("pointerdown", he),
      (Re(".gd-skip").onclick = () => {
        ((oe.parts = []), (oe.rings = []), _());
      }),
      cancelAnimationFrame(A),
      we(),
      new Promise((z) => {
        ((_e = z),
          (Re(".gd-ok").onclick = () => {
            (cancelAnimationFrame(A), (oe = null), Z.remove(), (Z = null), _e());
          }));
      })
    );
  }
  return { play: Ne, ready: U };
})();
