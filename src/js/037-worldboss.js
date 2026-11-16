/**
 * worldboss
 *
 * Public API on the game namespace `t`: t.WorldBoss
 *
 * Recovered from the shipped bundle — original chunk #36 at byte 838798 (7474 bytes, sha256:d5d4d507ce2798ae).
 * This file is one original source file; the build concatenates them in filename order.
 */
t.WorldBoss = (function () {
  const a = () => t.Game,
    b = () => t.CONFIG.WORLDBOSS,
    vt = new Intl.DateTimeFormat("en-US", {
      timeZone: "Europe/Paris",
      hourCycle: "h23",
      weekday: "short",
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
    }),
    B = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  function se(ie) {
    const U = {};
    for (const Ne of vt.formatToParts(new Date(ie))) U[Ne.type] = Ne.value;
    return { y: +U.year, m: +U.month, d: +U.day, h: +U.hour % 24, mi: +U.minute, wd: B.indexOf(U.weekday) };
  }
  const Ge = (ie) => {
    const U = se(ie);
    return Date.UTC(U.y, U.m - 1, U.d, U.h, U.mi) - Math.floor(ie / 6e4) * 6e4;
  };
  function Je(ie, U, Ne, T = 18) {
    const L = Date.UTC(ie, U - 1, Ne, T);
    return L - Ge(L - Ge(L));
  }
  const Ze = (ie, U = 0) => {
      const Ne = se(ie),
        T = new Date(Date.UTC(Ne.y, Ne.m - 1, Ne.d + U));
      return Je(T.getUTCFullYear(), T.getUTCMonth() + 1, T.getUTCDate());
    },
    x = (ie) => {
      const U = se(ie);
      let Ne = Ze(ie, (5 - U.wd + 7) % 7);
      return (Ne < ie && (Ne = Ze(ie, ((5 - U.wd + 7) % 7) + 7)), Ne);
    },
    $ = () => /^(localhost|127\.0\.0\.1)$/.test(globalThis.location?.hostname || ""),
    X = 5 * 6e4,
    Tt = {
      snap: null,
      at: 0,
      get: () => Tt.snap,
      async attack(ie) {
        if ($()) return { ok: !1, error: "local" };
        const U = t.Cloud;
        let Ne = U?.user ? await U.wb.attack(ie.n, ie.day, ie.uids, ie.dmg) : { error: "not_signed_in" };
        return (
          Ne.data?.error === "unsaved" &&
            (await U.pushNow(), (Ne = await U.wb.attack(ie.n, ie.day, ie.uids, ie.dmg))),
          Ne.data?.state && it(Ne.data.state),
          Ne.error ? { ok: !1, error: "network" } : Ne.data
        );
      },
    };
  let le = Tt;
  function P(ie) {
    return $() ? ((le = ie || Tt), !0) : !1;
  }
  const u = [],
    ve = (ie) => u.push(ie);
  function it(ie) {
    const U = JSON.stringify(Tt.snap);
    ((Tt.snap = ie && ie.first ? { first: ie.first, ed: ie.ed || null } : null),
      (Tt.at = Date.now()),
      Tt.snap &&
        a().S &&
        (re(Tt.snap.first, a().time()) >= 1
          ? ((a().S.wb ||= {}).live = 1)
          : a().S.wb?.live && delete a().S.wb.live));
    const Ne = oe();
    if (Ne.phase === "shield" && Array.isArray(ie?.mine)) {
      const T = de(Ne),
        L = ie.mine.filter((R) => R.day === Ne.day);
      ((T.used = Object.fromEntries(L.flatMap((R) => R.uids).map((R) => [R, 1]))),
        (T.n = L.length),
        (T.dmg = ie.mine.reduce((R, te) => R + (+te.dmg || 0), 0)));
    }
    JSON.stringify(Tt.snap) !== U &&
      u.forEach((T) => {
        try {
          T();
        } catch (L) {
          console.error(L);
        }
      });
  }
  async function De(ie) {
    const U = t.Cloud;
    if (le !== Tt || !U?.user || !U.wb || Date.now() - Tt.at < (ie ? 3e4 : X)) return;
    Tt.at = Date.now();
    const Ne = await U.wb.state();
    Ne.data && it(Ne.data);
  }
  const je = () => le?.now?.() ?? a().time(),
    pt = (ie, U) => Ze(ie, 7 * (U - 1));
  function re(ie, U) {
    if (U < ie) return 0;
    let Ne = 1 + Math.floor((U - ie) / 6048e5);
    for (; pt(ie, Ne + 1) <= U;) Ne++;
    for (; Ne > 1 && pt(ie, Ne) > U;) Ne--;
    return Ne;
  }
  function We(ie) {
    const U = a().S?.wb?.fight;
    return !(U?.first > 0 && U.n > 0 && U.fallAt > 0) || re(U.first, ie) !== U.n
      ? null
      : { first: U.first, ed: { n: U.n, hp: 0, dealt: 0, fallAt: U.fallAt } };
  }
  function oe(ie = je()) {
    const U = le?.get?.() || (le === Tt ? We(ie) : null);
    if (!U?.first) return { phase: "soon" };
    const Ne = re(U.first, ie);
    if (Ne < 1) return { phase: "calm", n: 0, next: U.first };
    const T = pt(U.first, Ne),
      L = Ze(T, b().SHIELD_DAYS),
      R = pt(U.first, Ne + 1),
      te = U.ed?.n === Ne ? U.ed : { n: Ne, hp: 0, dealt: 0 },
      K = Math.max(0, te.hp || 0),
      He = Math.min(K, Math.max(0, te.dealt || 0)),
      m = K - He,
      z = {
        n: Ne,
        start: T,
        shieldEnd: L,
        next: R,
        hp: K,
        dealt: He,
        left: m,
        pct: K ? m / K : 1,
        fallAt: te.fallAt || null,
      };
    if (
      ((z.bars = b().BARS),
      (z.barsLeft = K ? Math.ceil(m / (K / b().BARS)) : b().BARS),
      te.fallAt && ie >= te.fallAt)
    )
      ((z.captureEnd = te.fallAt + b().CAPTURE_H * 36e5), (z.phase = ie < z.captureEnd ? "capture" : "over"));
    else if (ie < L) {
      z.phase = "shield";
      let pe = 0;
      for (; pe < b().SHIELD_DAYS - 1 && Ze(T, pe + 1) <= ie;) pe++;
      ((z.day = pe), (z.dayEnd = Ze(T, pe + 1)), (z.boost = te.boost?.[pe] || 1));
    } else z.phase = "gone";
    return z;
  }
  function $e(ie) {
    const U = a().DEX[ie.id]?.stats;
    if (!U) return 0;
    const Ne =
        (ie.shiny ? 1 + t.CONFIG.SHINY_STAT_BONUS : 1) * t.CONFIG.UNDERGROUND.RANK_STAT ** a().rankOf(ie),
      T = (L) => Math.floor((Math.floor((2 * L * ie.level) / 100) + 5) * Ne);
    return Math.max(T(U.atk), T(U.spa));
  }
  function Z(ie) {
    const U = ie.reduce((T, L) => T + $e(L), 0),
      Ne = b();
    return U ? Math.min(Ne.MAX_S, Math.max(Ne.MIN_S, Ne.RUN_S * (U / Ne.REF) ** Ne.RUN_EXP)) : 0;
  }
  function A(ie, U = 1, Ne = Math.random()) {
    const T = Z(ie),
      L = 1 + b().SPREAD * (2 * Ne - 1),
      R = ie.map((te) => ({ uid: te.uid, id: te.id, dmg: Math.round($e(te) * b().DPS * T * L * U) }));
    return { dur: T, boost: U, rows: R, dmg: R.reduce((te, K) => te + K.dmg, 0) };
  }
  const J = (ie, U = 1) => A(ie, U, 1).dmg;
  function de(ie = oe()) {
    const U = a().S,
      Ne = (U.wb ||= {});
    return (
      ie.phase !== "shield" ||
        (Ne.ed !== ie.n
          ? Object.assign(Ne, { ed: ie.n, day: ie.day, used: {}, n: 0, dmg: 0 })
          : Ne.day !== ie.day && Object.assign(Ne, { day: ie.day, used: {}, n: 0 })),
      Ne
    );
  }
  const _e = () => a().regionDone(b().UNLOCK),
    Re = (ie = oe()) => (ie.phase === "shield" ? Math.max(0, b().PER_DAY - (de(ie).n || 0)) : 0),
    dt = (ie, U = oe()) => U.phase === "shield" && !!de(U).used?.[ie];
  function qe(ie = oe()) {
    const U = new Set();
    return a()
      .S.mons.filter((Ne) => !dt(Ne.uid, ie))
      .sort((Ne, T) => $e(T) - $e(Ne))
      .filter((Ne) => {
        const T = a().beingOf(Ne);
        return !U.has(T) && U.add(T);
      })
      .slice(0, b().TEAM);
  }
  function ce(ie, U = oe()) {
    if (!_e()) return e("Bats la Ligue de Sinnoh pour participer.");
    if (U.phase !== "shield") return e("Le bouclier ne peut plus être attaqué.");
    if (!Re(U)) return e("Plus d'attaque aujourd'hui : reviens demain.");
    if (!ie?.length || ie.length > b().TEAM) return e("Choisis de 1 à {n} Pokémon.", { n: b().TEAM });
    const Ne = new Set(a().S.mons.map((L) => L.uid)),
      T = new Set();
    for (const L of ie) {
      if (!Ne.has(L.uid) || T.has(L.uid)) return e("Choisis de 1 à {n} Pokémon.", { n: b().TEAM });
      if (dt(L.uid, U)) return e("A déjà attaqué aujourd'hui.");
      T.add(L.uid);
    }
    return null;
  }
  const tt = {
    league: () => e("Bats la Ligue de Sinnoh pour participer."),
    phase: () => e("Le bouclier ne peut plus être attaqué."),
    left: () => e("Plus d'attaque aujourd'hui : reviens demain."),
    resting: () => e("A déjà attaqué aujourd'hui."),
    network: () => e("Pas de connexion : réessaie dans un instant."),
    held: () => e("Raids désactivés : activité anormale détectée."),
    local: () => "Local: the server is read-only here (admin simulation only)",
  };
  async function mt(ie) {
    const U = oe(),
      Ne = ce(ie, U);
    if (Ne) return { error: Ne };
    const T = A(ie, U.boost),
      L = ie.map((K) => K.uid),
      R = await le.attack?.({ n: U.n, day: U.day, uids: L, dmg: T.dmg });
    if (R && !R.ok)
      return { error: (tt[R.error] || (() => e("Attaque refusée par le serveur. Réessaie.")))() };
    const te = de(U);
    for (const K of L) te.used[K] = 1;
    return ((te.n = (te.n || 0) + 1), (te.dmg = (te.dmg || 0) + T.dmg), a().save(), { plan: T, state: oe() });
  }
  const Te = (ie = oe()) => !!ie.n && a().S.wb?.caught === ie.n,
    At = (ie = oe()) => _e() && !t.Cloud?.hold && ie.phase === "capture" && !Te(ie);
  function yt(ie = oe()) {
    ie.n && ((a().S.wb ||= {}).caught = ie.n);
  }
  function he(ie = oe()) {
    const U = a().S,
      Ne = (U.wb ||= {}),
      T = le?.get?.()?.first;
    (Ne.tryEd !== ie.n && ((Ne.tryEd = ie.n), U.legTries && delete U.legTries[493]),
      ie.phase === "capture" && T && (Ne.fight = { first: T, n: ie.n, fallAt: ie.fallAt }));
  }
  const fe = (ie = oe()) => (a().S.wb?.tryEd === ie.n && a().S.legTries?.[493]) || 0;
  function Oe(ie) {
    if (!$() && !/^[\w-]+\.pokecatch-online\.pages\.dev$/.test(globalThis.location?.hostname || ""))
      return !1;
    const U = a().time();
    if (ie === "tease") {
      const R = x(U);
      return ((le = { get: () => ({ first: R, ed: null }), attack: () => ({ ok: !1, error: "phase" }) }), !0);
    }
    const Ne = Ze(U) <= U ? Ze(U) : Ze(U, -1),
      T = et(50),
      L = { n: 1, hp: T, dealt: Math.round(T * 0.35), fallAt: ie === "capture" ? U - 36e5 : null, boost: {} };
    return (
      (le = {
        get: () => ({ first: Ne, ed: L }),
        attack({ dmg: R }) {
          return (
            (L.dealt = Math.min(L.hp, L.dealt + R)),
            L.dealt >= L.hp && !L.fallAt && (L.fallAt = a().time()),
            { ok: !0 }
          );
        },
      }),
      !0
    );
  }
  const Ee = () => Math.round(b().REF * b().DPS * b().RUN_S),
    et = (ie, U = Ee()) => Math.max(b().MIN_HP, Math.round(ie * b().PART * b().PER_DAY * b().FALL_DAYS * U)),
    _ = (ie, U, Ne) => Math.max(b().MIN_HP, Math.round(ie * U * b().FALL_DAYS * Ne));
  function we(ie, U, Ne) {
    if (ie < 1 || !Ne) return 1;
    const T = U / (Ne * Math.min(1, ie / b().FALL_DAYS));
    for (const [L, R] of b().BOOST) if (T < L) return R;
    return 1;
  }
  return {
    paris: se,
    parisAt: Je,
    at18: Ze,
    fridayFrom: x,
    startOf: pt,
    editionAt: re,
    useSource: P,
    refresh: De,
    onChange: ve,
    demo: Oe,
    now: je,
    state: oe,
    power: $e,
    duration: Z,
    plan: A,
    cap: J,
    mine: de,
    open: _e,
    left: Re,
    resting: dt,
    autoTeam: qe,
    why: ce,
    attack: mt,
    caught: Te,
    catchable: At,
    markCaught: yt,
    newTry: he,
    tries: fe,
    refDamage: Ee,
    hpFirst: et,
    hpNext: _,
    boostFor: we,
  };
})();
