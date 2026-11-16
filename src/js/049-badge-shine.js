/**
 * badge shine
 *
 * Public API on the game namespace `t`: t.BadgeShine
 *
 * Recovered from the shipped bundle — original chunk #48 at byte 1164895 (11237 bytes, sha256:a1b3702a516416bf).
 * This file is one original source file; the build concatenates them in filename order.
 */
t.BadgeShine = (function () {
  const a = () => t.Game,
    b = () => t.STORY,
    f = [25, 60, 90],
    ue = 25 / 15,
    H = [24, 59, 89],
    vt = 59,
    B = 7 * 864e5,
    se = (T) => (T < f[0] ? 0 : T < f[1] ? 1 : T < f[2] ? 2 : 3),
    Ge = (T) => Math.max(0, Math.min(100, +T || 0)),
    Je = [
      ["kanto", "BADGE_IMG"],
      ["johto", "BADGE_IMG_JOHTO"],
      ["hoenn", "BADGE_IMG_HOENN"],
      ["sinnoh", "BADGE_IMG_SINNOH"],
    ],
    Ze = (T) => Object.keys(b()[Je.find((L) => L[0] === T)?.[1]] || {}),
    x = () => Je.flatMap(([T]) => Ze(T)),
    $ = () => a().S.adv?.badges || [],
    X = () => {
      const T = b().firstChapterOf("sinnoh");
      return T >= 0 && (a().S.adv?.unlocked ?? 0) >= T;
    };
  function Tt(T, L, R) {
    const te = Math.floor((R - L) / B);
    if (!(te > 0)) return T;
    const K = se(T) - te;
    return K >= 0 ? H[K] : 0;
  }
  const le = () => a().time();
  function P(T, L = le()) {
    const R = a().S.badgeShine?.[T];
    return R && Number.isFinite(+R.e) ? Tt(Ge(R.e), +R.t, L) : vt;
  }
  const u = () => !!a().S.noDullBadges,
    ve = (T) => (u() ? Math.max(T, vt) : T);
  function it(T = le()) {
    if (!X()) return !1;
    const L = (a().S.badgeShine ||= {}),
      R = $();
    let te = 0;
    for (const K of x()) R.includes(K) && !L[K] && ((L[K] = { e: vt, t: T }), te++);
    return (te && a().save(), te > 0);
  }
  function De(T, L, R = le()) {
    const te = ve(P(T, R));
    (a().S.badgeShine ||= {})[T] = { e: Ge(te + L), t: R };
  }
  function je(T) {
    const L = a().S.badgeShine?.[T];
    L && (L.e = Math.floor(L.e * 10) / 10);
  }
  const pt = (T, L, R = le()) => {
      (a().S.badgeShine ||= {})[T] = { e: Ge(L), t: R };
    },
    re = (T) => {
      const L = $();
      return Ze(T).filter((R) => L.includes(R) && se(P(R)) === 3).length;
    },
    We = () => Math.max(0, ...Je.map(([T]) => re(T)));
  function oe() {
    const T = t.Frames;
    return (a().S.trainer?.frames || []).includes("polish") || We() < 8 || !T?.open("polish")
      ? !1
      : (a().save(),
        t.TrainerCard?.refreshTrigger(),
        t.UI?.toast(e("Nouveau cadre : {name} !", { name: e("Faut que ça biche") }), null, "reward"),
        !0);
  }
  function $e(T) {
    if (!T || typeof T != "object" || Array.isArray(T)) return null;
    const L = {};
    for (const [R, te] of Object.entries(T)) Number.isFinite(+te) && (L[R] = Ge(te));
    return L;
  }
  const Z = (T, L) => (T.own ? P(L) : (T.shine?.[L] ?? vt)),
    A = 4,
    J = 16 + 2 * A,
    de = {},
    _e = new Map(),
    Re = (T) =>
      (de[T] ||= new Promise((L, R) => {
        const te = new Image();
        ((te.onload = () => L(te)), (te.onerror = R), (te.src = T));
      }));
  function dt(T) {
    return (
      _e.has(T) ||
        _e.set(
          T,
          (async () => {
            const L = b().badgeSheet(T),
              R = await Re(L.src),
              te = Math.max(1, Math.round(R.height / 16)),
              K = 16 * te,
              He = document.createElement("canvas");
            He.width = He.height = K;
            const m = He.getContext("2d", { willReadFrequently: !0 });
            return (
              m.drawImage(R, (L.n - 1) * K, 0, K, K, 0, 0, K, K),
              { s: te, data: m.getImageData(0, 0, K, K).data }
            );
          })(),
        ),
      _e.get(T)
    );
  }
  function qe(T, L, R, te) {
    ((T /= 255), (L /= 255), (R /= 255));
    const K = Math.max(T, L, R),
      He = Math.min(T, L, R),
      m = K - He;
    let z = 0,
      pe = (K + He) / 2,
      V = m === 0 ? 0 : m / (1 - Math.abs(2 * pe - 1));
    (m && (z = K === T ? ((L - R) / m + 6) % 6 : K === L ? (R - T) / m + 2 : (T - L) / m + 4),
      V > 0.08 &&
        pe > 0.12 &&
        pe < 0.96 &&
        ((V = Math.min(1, V * (1 + 1.4 * te) + 0.15 * te)), (pe += (0.52 - pe) * 0.4 * te)));
    const lt = (1 - Math.abs(2 * pe - 1)) * V,
      kt = lt * (1 - Math.abs((z % 2) - 1)),
      ra = pe - lt / 2,
      [Vt, Xt, Ht] =
        z < 1
          ? [lt, kt, 0]
          : z < 2
            ? [kt, lt, 0]
            : z < 3
              ? [0, lt, kt]
              : z < 4
                ? [0, kt, lt]
                : z < 5
                  ? [kt, 0, lt]
                  : [lt, 0, kt];
    return [(Vt + ra) * 255, (Xt + ra) * 255, (Ht + ra) * 255];
  }
  const ce = () =>
      !!(t.CHEAT?.noAnim || a().S.reducedAnim || t.matchMedia?.("(prefers-reduced-motion: reduce)").matches),
    tt = (T) => {
      try {
        navigator.userActivation?.hasBeenActive && navigator.vibrate?.(T);
      } catch {}
    },
    mt = [
      [92, 80, 58],
      [74, 64, 48],
      [110, 96, 70],
    ],
    Te = [150, 132, 100],
    At = [255, 255, 255],
    yt = [255, 224, 102];
  class he {
    constructor(L, { read: R, z: te, small: K = !1, rub: He = !1 }) {
      (Object.assign(this, {
        name: L,
        read: R,
        z: te,
        small: K,
        acc: 0,
        lastDt: 16,
        wants: !1,
        busy: !1,
        dirty: !0,
        dust: [],
        sparks: [],
        sweep: -1,
        nextSweep: zn.now() + 600 + Math.random() * 1500,
      }),
        (this.cv = document.createElement("canvas")),
        (this.cv.className = "bs-cv"),
        (this.cv.style.width = this.cv.style.height = `${J * te}px`),
        (this.ready = dt(L).then((m) => (this.init(m), He && this.bindRub(), this))));
    }
    init({ s: L, data: R }) {
      const te = J * L,
        K = 16 * L;
      ((this.s = L),
        (this.src = R),
        (this.cv.width = this.cv.height = te),
        (this.x = this.cv.getContext("2d")),
        (this.out = this.x.createImageData(te, te)),
        (this.base = new Uint8ClampedArray(te * te * 4)),
        (this.cells = []));
      for (let z = 0; z < 256; z++) {
        const pe = z % 16,
          V = z >> 4;
        let lt = !1;
        for (let kt = 0; kt < L && !lt; kt++)
          for (let ra = 0; ra < L; ra++)
            if (R[((V * L + kt) * K + pe * L + ra) * 4 + 3] > 40) {
              lt = !0;
              break;
            }
        lt && this.cells.push(z);
      }
      let He = [...this.name].reduce((z, pe) => (z * 31 + pe.charCodeAt(0)) % 2147483647, 7) || 1;
      const m = () => (He = (He * 16807) % 2147483647) / 2147483647;
      this.order = this.cells.slice();
      for (let z = this.order.length - 1; z > 0; z--) {
        const pe = Math.floor(m() * (z + 1));
        [this.order[z], this.order[pe]] = [this.order[pe], this.order[z]];
      }
      ((this.specks = new Set(this.order.slice(0, this.target()))), this.paint());
    }
    get e() {
      return ve(this.read());
    }
    target() {
      return Math.round(Math.max(0, (vt - this.e) / vt) * this.cells.length * 0.4);
    }
    paint() {
      const L = this.e,
        R = Math.min(1, L / vt),
        te = Math.max(0, (L - f[1]) / (100 - f[1])) ** 0.7,
        K = 0.55 + 0.45 * R,
        He = 0.25 + 0.75 * R,
        m = this.s,
        z = 16 * m,
        pe = J * m,
        V = this.base,
        lt = this.src;
      V.fill(0);
      for (let kt = 0; kt < z; kt++)
        for (let ra = 0; ra < z; ra++) {
          const Vt = (kt * z + ra) * 4;
          if (!lt[Vt + 3]) continue;
          let Xt = lt[Vt],
            Ht = lt[Vt + 1],
            ct = lt[Vt + 2];
          if (te > 0) [Xt, Ht, ct] = qe(Xt, Ht, ct, te);
          else if (R < 1) {
            const gt = 0.3 * Xt + 0.59 * Ht + 0.11 * ct;
            ((Xt = (gt + (Xt - gt) * He) * K),
              (Ht = (gt + (Ht - gt) * He) * K),
              (ct = (gt + (ct - gt) * He) * K));
          }
          const wt = (ra / m) | 0,
            ge = (kt / m) | 0;
          this.specks.has(ge * 16 + wt) && ([Xt, Ht, ct] = mt[(wt * 7 + ge * 3) % 3]);
          const Fe = ((kt + A * m) * pe + ra + A * m) * 4;
          ((V[Fe] = Xt), (V[Fe + 1] = Ht), (V[Fe + 2] = ct), (V[Fe + 3] = lt[Vt + 3]));
        }
      ((this.st = se(L)), (this.dirty = !0));
    }
    syncSpecks(L) {
      const R = this.target();
      if (this.specks.size > R)
        [...this.specks].slice(0, this.specks.size - R).forEach((te) => this.specks.delete(te));
      else if (!L)
        for (const te of this.order) {
          if (this.specks.size >= R) break;
          this.specks.add(te);
        }
    }
    refresh() {
      this.out && (this.syncSpecks(!1), this.paint());
    }
    bindRub() {
      let L = null,
        R = 0,
        te = 0;
      const K = (m) => {
        const z = this.cv.getBoundingClientRect(),
          pe = z.width / J;
        return { x: (m.clientX - z.left) / pe - A, y: (m.clientY - z.top) / pe - A };
      };
      (this.cv.addEventListener("pointerdown", (m) => {
        try {
          this.cv.releasePointerCapture(m.pointerId);
        } catch {}
        ((L = K(m)), (R = 0), (te = 0), m.preventDefault());
      }),
        this.cv.addEventListener("pointermove", (m) => {
          if (!L) {
            m.buttons & 1 && ((L = K(m)), (R = 0), (te = 0));
            return;
          }
          const z = K(m),
            pe = z.x - L.x,
            V = z.y - L.y,
            lt = Math.hypot(pe, V);
          if (z.x >= -1 && z.x <= 17 && z.y >= -1 && z.y <= 17 && lt > 0) {
            const ra = se(this.e),
              Vt = Math.abs(pe) > Math.abs(V) ? Math.sign(pe) : 2 * Math.sign(V);
            te += lt;
            let Xt = lt * 0.07;
            (R && Vt === -R && te > 3 && ((Xt += 1.4), (te = 0), t.Sfx.badgeRub(), tt(4)), (R = Vt));
            for (const ct of [...this.specks]) {
              const wt = ct % 16,
                ge = ct >> 4;
              Math.hypot(wt - z.x, ge - z.y) < 2.2 &&
                Math.random() < 0.5 &&
                (this.specks.delete(ct),
                (Xt += 0.4),
                this.dust.push({
                  x: wt + A,
                  y: ge + A,
                  vx: (Math.random() - 0.5) * 0.5,
                  vy: -Math.random() * 0.4,
                  t: 0,
                }));
            }
            (De(this.name, Xt * ue), this.syncSpecks(!0), this.paint());
            const Ht = se(this.e);
            (Ht > ra && (t.Sfx.badgeChime(Ht), ce() || ((this.sweep = 0), this.burst()), this.onState?.(Ht)),
              _());
          }
          L = z;
        }));
      const He = () => {
        L && ((L = null), je(this.name), a().save());
      };
      for (const m of ["pointerup", "pointercancel", "pointerleave"]) this.cv.addEventListener(m, He);
    }
    burst() {
      for (let L = 0; L < 4; L++) this.spark();
    }
    spark() {
      const L = Math.random() * Math.PI * 2,
        R = 7 + Math.random() * 4;
      this.sparks.push({
        x: Math.round(J / 2 + Math.cos(L) * R),
        y: Math.round(J / 2 + Math.sin(L) * R),
        t: 0,
        life: 520 + Math.random() * 300,
      });
    }
    draw(L, R) {
      if (!this.out) return !1;
      const te = this.st,
        K = ce();
      (!K && te >= 2 && this.sweep < 0 && L > this.nextSweep && (this.sweep = 0),
        this.sweep >= 0 &&
          ((this.sweep += (R / 380) * 40),
          this.sweep > 40 &&
            ((this.sweep = -1), (this.nextSweep = L + (te === 3 ? 5400 : 7200) + Math.random() * 2400))),
        !K && te === 3 && Math.random() < R / 2600 && this.spark(),
        (this.dust = this.dust.filter((m) => (m.t += R) < 500)),
        (this.sparks = this.sparks.filter((m) => (m.t += R) < m.life)));
      const He = this.sweep >= 0 || this.dust.length > 0 || this.sparks.length > 0;
      return (
        (He || this.busy || this.dirty) && this.render(),
        (this.busy = He),
        (this.dirty = !1),
        He || (!K && te >= 2)
      );
    }
    render() {
      const L = this.s,
        R = J * L,
        te = 16 * L,
        K = this.out.data,
        He = this.src;
      if ((K.set(this.base), this.sweep >= 0))
        for (const z of this.cells) {
          const pe = z % 16,
            V = z >> 4,
            lt = Math.abs(pe + V - (this.sweep - 4)),
            kt = lt < 0.8 ? 0.22 : lt < 1.8 ? 0.1 : 0;
          if (kt)
            for (let ra = 0; ra < L; ra++)
              for (let Vt = 0; Vt < L; Vt++) {
                const Xt = pe * L + Vt,
                  Ht = V * L + ra;
                if (!He[(Ht * te + Xt) * 4 + 3]) continue;
                const ct = ((Ht + A * L) * R + Xt + A * L) * 4;
                ((K[ct] += (255 - K[ct]) * kt),
                  (K[ct + 1] += (255 - K[ct + 1]) * kt),
                  (K[ct + 2] += (255 - K[ct + 2]) * kt));
              }
        }
      const m = (z, pe, V, lt = 255) => {
        if (((z = Math.round(z)), (pe = Math.round(pe)), !(z < 0 || pe < 0 || z >= J || pe >= J)))
          for (let kt = 0; kt < L; kt++)
            for (let ra = 0; ra < L; ra++) {
              const Vt = ((pe * L + kt) * R + z * L + ra) * 4;
              ((K[Vt] = V[0]), (K[Vt + 1] = V[1]), (K[Vt + 2] = V[2]), (K[Vt + 3] = lt));
            }
      };
      for (const z of this.dust)
        ((z.x += (z.vx * this.lastDt) / 16),
          (z.vy += (0.02 * this.lastDt) / 16),
          (z.y += (z.vy * this.lastDt) / 16),
          m(z.x, z.y, Te, 255 * (1 - z.t / 500)));
      for (const z of this.sparks) {
        const pe = z.t / z.life,
          V = pe < 0.25 || pe > 0.75 ? 1 : 2;
        m(z.x, z.y, At);
        for (let lt = 1; lt <= V; lt++) {
          const kt = lt === V && V === 2 ? yt : At;
          (m(z.x + lt, z.y, kt), m(z.x - lt, z.y, kt), m(z.x, z.y + lt, kt), m(z.x, z.y - lt, kt));
        }
      }
      this.x.putImageData(this.out, 0, 0);
    }
  }
  const fe = new Set();
  let Oe = 0,
    Ee = 0;
  function et(T) {
    Oe = 0;
    const L = Math.min(50, T - Ee);
    Ee = T;
    let R = !1;
    for (const te of fe) {
      if (!te.cv.isConnected) {
        fe.delete(te);
        continue;
      }
      if (((te.acc += L), te.small && te.acc < 32)) {
        R ||= te.wants || te.busy || te.dirty;
        continue;
      }
      ((te.lastDt = te.acc), (te.wants = te.draw(T, te.acc)), (te.acc = 0), (R ||= te.wants));
    }
    R && fe.size && !document.hidden && (Oe = es(et));
  }
  function _() {
    Oe || !fe.size || document.hidden || ((Ee = zn.now()), (Oe = es(et)));
  }
  function we() {
    (Oe && cancelAnimationFrame(Oe), (Oe = 0));
  }
  (document.addEventListener?.("visibilitychange", () => {
    document.hidden ? we() : _();
  }),
    t.addEventListener?.("calm", () => {
      for (const T of fe) ((T.sweep = -1), (T.sparks = []), (T.dirty = !0));
      _();
    }));
  function ie(T, L) {
    L?.aborted ||
      (fe.add(T),
      (T.dirty = !0),
      _(),
      L?.addEventListener(
        "abort",
        () => {
          (fe.delete(T), fe.size || we());
        },
        { once: !0 },
      ));
  }
  function U(T, L, R) {
    for (const te of T.querySelectorAll(".tc-dia[data-b]")) {
      const K = te.dataset.b,
        He = new he(K, { read: () => Z(L, K), z: 2, small: !0 });
      ((He.cv.style.margin = `${-A * 2}px`),
        He.ready
          .then(() => {
            R?.aborted || (te.firstElementChild.replaceChildren(He.cv), ie(He, R));
          })
          .catch(() => {}));
    }
  }
  function Ne(T) {
    const { h: L, modal: R, helpTip: te } = t.UI;
    it();
    const K = b().REGIONS.find((lt) => lt.key === T),
      He = Ze(T),
      m = $(),
      z = L(`<div class="bs">
      <div class="dc-head"><h2>${e("Badges de {region}", { region: e(K.name) })}</h2>${te(e("Boîte à badges"), e("Frotte tes badges pour les faire briller : terne, normal, brillant puis étincelant. Sans coup de chiffon, un badge perd un état par semaine. Les 8 badges d'une région étincelants en même temps débloquent un cadre."))}<div class="dc-sum"><button class="dc-x" aria-label="${e("Fermer")}">✕</button></div></div>
      <p class="bs-hint">${e("Frotte un badge pour le faire briller")}</p>
      <div class="bs-velvet"></div>
      <div class="bs-foot"><span class="bs-n"></span><span class="bs-s"></span></div>
    </div>`),
      pe = [
        (lt) => e("Badge {n} (terne)", { n: lt }),
        (lt) => e("Badge {n} (normal)", { n: lt }),
        (lt) => e("Badge {n} (brillant)", { n: lt }),
        (lt) => e("Badge {n} (étincelant)", { n: lt }),
      ],
      V = () => {
        const lt = re(T);
        ((z.querySelector(".bs-n").textContent = e(
          lt === 8 ? "Boîte parfaite !" : "Les badges ternissent avec le temps",
        )),
          (z.querySelector(".bs-s").innerHTML = e("Étincelants : {n}", { n: `<b>${lt} / 8</b>` })));
      };
    return R({
      className: "dexcard-modal bs-modal",
      body: z,
      onOpen: (lt, kt, ra) => {
        (lt.style.setProperty("--c", K.color), (z.querySelector(".dc-x").onclick = () => kt(null)));
        const Vt = z.querySelector(".bs-velvet"),
          Xt = Math.max(2, Math.min(5, Math.floor(((Vt.clientWidth - 24 - 3 * 8) / 4 - 8) / 16)));
        for (const Ht of He) {
          const ct = document.createElement("div");
          if (((ct.className = "bs-slot"), Vt.append(ct), !m.includes(Ht))) {
            (ct.classList.add("empty"), (ct.style.height = `${16 * Xt + 24}px`));
            continue;
          }
          const wt = new he(Ht, { read: () => P(Ht), z: Xt, rub: !0 }),
            ge = () => {
              ct.title = pe[se(wt.e)](e(Ht));
            };
          ((wt.cv.style.margin = `${-(A * Xt - 4)}px`),
            (ct.style.height = `${16 * Xt + 24}px`),
            (wt.onState = () => {
              (ge(), V(), oe());
            }),
            wt.ready
              .then(() => {
                ra.aborted || (ct.append(wt.cv), ge(), ie(wt, ra));
              })
              .catch(() => {}));
        }
        V();
      },
    });
  }
  return {
    on: X,
    stateOf: se,
    worn: Tt,
    shine: P,
    shown: ve,
    sync: it,
    set: pt,
    rubBy: De,
    settle: je,
    best: We,
    sparkling: re,
    checkSuccess: oe,
    fromCard: $e,
    ofProfile: Z,
    mountCard: U,
    openBox: Ne,
    namesOf: Ze,
    WON: vt,
    T: f,
    TOP: H,
    WEEK: B,
    get running() {
      return !!Oe;
    },
    get liveCount() {
      return fe.size;
    },
  };
})();
