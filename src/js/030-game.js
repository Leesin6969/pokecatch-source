/**
 * game
 *
 * Public API on the game namespace `t`: t.Game
 *
 * Recovered from the shipped bundle — original chunk #29 at byte 659512 (45344 bytes, sha256:ec5987d10137af82).
 * This file is one original source file; the build concatenates them in filename order.
 */
(function () {
  const a = t.CONFIG,
    b = {};
  for (const d of t.POKEDEX) b[d.id] = d;
  const f = (d) => a.MOVE_POWER_OVERRIDES[d] ?? ha(d);
  for (const d of t.POKEDEX) {
    const i = {};
    for (const w of d.learn)
      f(w[1]) > 0 &&
        a.MOVE_POWER_OVERRIDES[w[1]] == null &&
        !a.MOVE_BLACKLIST.includes(w[1]) &&
        (i[t.MOVES[w[1]].type] ??= []).push(w);
    for (const w of Object.values(i)) {
      const S = w.map((me) => me[0]),
        j = [...w].sort((me, o) => f(me[1]) - f(o[1]) || me[0] - o[0]).map((me) => me[1]);
      w.forEach((me, o) => {
        ((me[0] = S[o]), (me[1] = j[o]));
      });
    }
    d.learn.sort((w, S) => w[0] - S[0]);
  }
  const ue = { 137: [233], 233: [474] };
  for (const [d, i] of Object.entries(ue)) {
    const w = (t.EVOLUTIONS[d] || []).filter((S) => !i.includes(S.to));
    w.length ? (t.EVOLUTIONS[d] = w) : delete t.EVOLUTIONS[d];
  }
  const H = {};
  for (const [d, i] of Object.entries(t.EVOLUTIONS)) for (const w of i) H[w.to] ??= { from: +d, ...w };
  for (const [d, i] of Object.entries(ue)) for (const w of i) H[w] ??= { from: +d, family: !0 };
  const vt = (d, i) => d + Math.floor(Math.random() * (i - d + 1)),
    B = (d) => d[Math.floor(Math.random() * d.length)],
    se = () => Date.now().toString(36) + Math.random().toString(36).slice(2, 8),
    Ge = () => t.Clock?.now() ?? Date.now(),
    Je = typeof document > "u";
  function Ze() {
    return {
      v: 2,
      money: a.START_MONEY,
      mons: [],
      team: [],
      eventTeams: {},
      dex: {},
      seen: {},
      seenShiny: {},
      buffs: {},
      items: { ...a.START_ITEMS },
      buddy: { uid: null, ko: 0 },
      pension: { mons: [], eggs: [] },
      trades: [],
      lastTick: Ge(),
      stats: {
        throws: 0,
        caught: 0,
        battles: 0,
        trades: 0,
        wins: 0,
        evolutions: 0,
        hatched: 0,
        playMs: 0,
        awayMs: 0,
      },
      trainer: null,
      muted: !0,
      adv: null,
    };
  }
  let x;
  const $ = () => (x?.under?.slots || []).flatMap((d) => d.mons || []);
  function X() {
    try {
      const d = localStorage.getItem(a.SAVE_KEY);
      x = d ? Object.assign(Ze(), JSON.parse(d)) : Ze();
    } catch {
      x = Ze();
    }
    return (Tt(), x);
  }
  function Tt() {
    (Wn(), (x.seenShiny = x.seenShiny || {}));
    for (const w of [...(x.mons || []), ...(x.pension?.mons || []).map((S) => S.mon), ...$()])
      if (w?.shiny) {
        ((x.seenShiny[w.id] = !0), x.dex?.[w.id] && (x.dex[w.id].shiny = 1));
        for (let S = H[w.id]; S && !S.family; S = H[S.from])
          ((x.seenShiny[S.from] = !0), !w.ot && x.dex?.[S.from] && (x.dex[S.from].shiny = 1));
      }
    if (x.v < 2) {
      (typeof x.balls == "number" && (x.items["poke-ball"] = (x.items["poke-ball"] || 0) + x.balls + 10),
        delete x.balls,
        delete x.ballTs,
        (x.adv = null),
        (x.seen = x.seen || {}));
      for (const w of Object.keys(x.dex)) x.seen[w] = !0;
      x.v = 2;
    }
    x.stats = Object.assign(
      {
        throws: 0,
        caught: 0,
        battles: 0,
        trades: 0,
        wins: 0,
        evolutions: 0,
        hatched: 0,
        playMs: 0,
        awayMs: 0,
      },
      x.stats,
    );
    for (const w of ["playMs", "awayMs"]) x.stats[w] = Math.round(+x.stats[w] || 0);
    if ((x.lastTick && (x.lastTick = Math.round(x.lastTick)), (x.placeSince ||= Date.now()), !x.trainer)) {
      const w = Math.min(Date.now(), ...Object.values(x.dex || {}).map((S) => S.firstAt || Date.now()));
      x.trainer = { name: "Red", sprite: "red", id: String(vt(0, 99999)).padStart(5, "0"), since: w };
    }
    x.trainer.tag || (x.trainer.tag = String(vt(0, 9999)).padStart(4, "0"));
    for (const w of ["net-ball", "nest-ball", "dusk-ball", "repeat-ball"])
      (x.items[w] && (x.items["great-ball"] = (x.items["great-ball"] || 0) + x.items[w]), delete x.items[w]);
    (x.items["premier-ball"] &&
      (x.items["poke-ball"] = (x.items["poke-ball"] || 0) + x.items["premier-ball"]),
      delete x.items["premier-ball"],
      delete x.items["master-ball"]);
    for (const [w, S] of [
      ["poke-ball", 150],
      ["great-ball", 800],
      ["ultra-ball", 2500],
    ])
      (x.items[w] && (x.money = (x.money || 0) + x.items[w] * S), delete x.items[w]);
    ((x.buddy = { uid: x.buddy?.uid ?? null, ko: x.buddy?.ko || 0 }),
      x.link?.stash &&
        "buddy" in x.link.stash &&
        (!x.buddy.uid && x.link.stash.buddy?.uid && (x.buddy = x.link.stash.buddy),
        delete x.link.stash.buddy));
    for (const w of [
      ...(x.mons || []),
      ...(x.pension?.mons || []).map((S) => S.mon),
      ...(x.pension?.eggs || []),
      ...$(),
      x.tradeOut?.mon,
      x.tradeIn?.mon,
    ])
      w && delete w.nature;
    x.eventTeams = x.eventTeams || {};
    for (const w of x.pension?.eggs || [])
      w?.laidAt != null && (w.hatchAt = Math.min(w.hatchAt, w.laidAt + a.PENSION.HATCH_MIN * 6e4));
    for (const [w, S] of Object.entries(x.vault || {})) {
      for (const j of x.mons) j.reg = S.until;
      for (const j of S.mons || []) ((j.reg = j.reg || w), x.mons.push(j));
      (ja().eggs.push(...(S.eggs || [])),
        (x.link = {
          from: w,
          to: S.until,
          side: "to",
          at: S.at || Date.now(),
          stash: {
            money: S.money || 0,
            items: S.items || {},
            team: (S.team || []).filter((j) => (S.mons || []).some((me) => me.uid === j)),
          },
        }));
    }
    delete x.vault;
    const d = x.link;
    if (d?.stash && x.teamSets && !d.stash.teamSets) {
      const w = x.teamSets,
        S = (j) => {
          const me = x.mons.find((o) => o.uid === j);
          return !me || Bt(me);
        };
      ((d.stash.teamSets = {
        list: w.list.map((j) => {
          const me = j?.filter((o) => !S(o));
          return me?.length ? me : null;
        }),
        on: null,
      }),
        (w.list = w.list.map((j) => {
          const me = j?.filter(S);
          return me && (me.length || !j.length) ? me : null;
        })),
        w.on != null && !w.list[w.on] && (w.on = null));
    }
    dt();
    for (const w of [
      ...(x.mons || []),
      ...(x.pension?.mons || []).map((S) => S.mon),
      ...$(),
      x.tradeOut?.mon,
      x.tradeIn?.mon,
    ])
      w && w.level > a.MAX_LEVEL && Object.assign(w, { level: a.MAX_LEVEL, xp: 0, hp: null });
    for (const w of [
      ...(x.mons || []),
      ...(x.pension?.mons || []).map((S) => S.mon),
      ...$(),
      x.tradeOut?.mon,
      x.tradeIn?.mon,
    ])
      w && "statMult" in w && (delete w.statMult, (w.hp = null));
    for (const w of [
      ...(x.mons || []),
      ...(x.pension?.mons || []).map((S) => S.mon),
      ...$(),
      x.tradeOut?.mon,
      x.tradeIn?.mon,
    ]) {
      if (!w || b[w.id] || !isNaN(+w.id)) continue;
      const S = (j) => !!x.dex?.[j];
      ((w.id = w.level < 20 || (S(265) && !S(236)) || (S(265) === S(236) && w.reg === "hoenn") ? 265 : 236),
        (w.hp = null));
    }
    for (const w of [x.dex, x.seen, x.seenShiny])
      for (const S of Object.keys(w || {})) isNaN(+S) && delete w[S];
    if (x.candies) {
      for (const [w, S] of Object.entries(x.candies)) S > 0 && Jn(ze(+w), S);
      delete x.candies;
    }
    if (x.market) {
      for (const w of x.market.mine || []) w.mon && x.mons.push(w.mon);
      delete x.market;
    }
    if (!x.shellGiven) {
      const w = (S) => pn().some((j) => j.id === S);
      (w(291) && !w(292) && !Pe("shed-shell") && Mt("shed-shell"), (x.shellGiven = 1));
    }
    (It(), nn(), ($e = qe()));
    for (const w of ["earned", "moneyIn"]) x.stats[w] = Math.round(+x.stats[w] || 0);
    const i = (w, S) => (Number.isFinite(w) ? Math.min(w, S) : S);
    x.earnSince ||
      ((x.earnSince = {
        at: Date.now(),
        money: i(x.stats.moneySeen, P()),
        playMs: x.stats.playMs,
        awayMs: x.stats.awayMs,
      }),
      (x.stats.earned = x.stats.moneyIn = 0));
    for (const w of ["coinIn", "coinOut"]) x.stats[w] = Math.round(+x.stats[w] || 0);
    x.coinSince ||
      ((x.coinSince = { at: Date.now(), coins: i(x.stats.coinSeen, u()) }),
      (x.stats.coinIn = x.stats.coinOut = 0));
    for (const w of ["itemIn", "itemOut"])
      x.stats[w] = Object.fromEntries(
        Object.entries(x.stats[w] && typeof x.stats[w] == "object" ? x.stats[w] : {})
          .map(([S, j]) => [S, Math.round(+j || 0)])
          .filter(([, S]) => S > 0),
      );
    if (!x.itemSince) {
      const w = le(),
        S = x.stats.itemSeen && typeof x.stats.itemSeen == "object" ? x.stats.itemSeen : null;
      ((x.itemSince = {
        at: Date.now(),
        items: S ? Object.fromEntries(Object.entries(w).map(([j, me]) => [j, i(+S[j] || 0, me)])) : w,
      }),
        (x.stats.itemIn = {}),
        (x.stats.itemOut = {}));
    }
    if (((J = 0), t.Tower))
      for (const w of x.link?.stash ? ["all", x.link.side === "to" ? "from" : "to"] : ["all"])
        Ve(w, () => {
          const S = Pe("nature-capsule");
          (S > 0 && (Mt("nature-capsule", -S), t.Tower.bpIn(S * A), (J += S)),
            delete x.items["nature-capsule"]);
        });
    if (((_e = 0), !x.auroraRefund && t.Tower)) {
      x.auroraRefund = 1;
      let w = at("auroraticket") - 1;
      if (w > 0) {
        for (const S of x.link?.stash ? [x.link.side, x.link.side === "to" ? "from" : "to"] : ["all"])
          Ve(S, () => {
            const j = Math.min(w, Pe("auroraticket"));
            j > 0 && (Mt("auroraticket", -j), (w -= j));
          });
        _e = t.Tower.bpIn(a.TOWER.SHOP.find((S) => S.id === "auroraticket").price);
      }
    }
    ve();
  }
  function le() {
    const d = {};
    for (const i of [x.items, x.link?.stash?.items])
      for (const [w, S] of Object.entries(i || {})) w !== "coin" && S > 0 && (d[w] = (d[w] || 0) + S);
    return d;
  }
  const P = () => (x.money || 0) + (x.link?.stash?.money || 0),
    u = () => (x.items?.coin || 0) + (x.link?.stash?.items?.coin || 0),
    ve = () => {
      (x.earnSince && (x.stats.moneySeen = P()),
        x.coinSince && (x.stats.coinSeen = u()),
        x.itemSince && (x.stats.itemSeen = le()),
        x.under?.geoSince &&
          (x.stats.geoSeen = [0, 1, 2, 3].map(
            (d) => (+x.under.geodes?.[d] || 0) + (+x.under.opened?.[d] || 0),
          )));
    };
  function it(d) {
    return (
      (d = Math.round(d) || 0),
      d > 0 && (Mt("coin", d), (x.stats.coinIn = (x.stats.coinIn || 0) + d)),
      d
    );
  }
  function De(d) {
    return (
      (d = Math.round(d) || 0),
      d > 0 && (Mt("coin", -d), (x.stats.coinOut = (x.stats.coinOut || 0) + d)),
      d
    );
  }
  function je(d) {
    return ((d = Math.round(d) || 0), (x.money += d), (x.stats.earned = (x.stats.earned || 0) + d), d);
  }
  function pt(d) {
    return ((d = Math.round(d) || 0), (x.money += d), (x.stats.moneyIn = (x.stats.moneyIn || 0) + d), d);
  }
  const re = ["candy", "shop", "pension", "casino", "mktbuy", "mkttax", "trade", "under"];
  function We(d, i) {
    if (((d = Math.round(d) || 0), d <= 0 || !re.includes(i))) return 0;
    x.money -= d;
    const w = (x.stats.spent ||= {});
    return ((w[i] = (w[i] || 0) + d), d);
  }
  function oe(d, i) {
    const w = x.stats.spent;
    ((d = Math.round(d) || 0), d > 0 && w?.[i] && (w[i] = Math.max(0, w[i] - d)));
  }
  let $e = [];
  const Z = () => {
      const d = $e;
      return (($e = []), d);
    },
    A = 50;
  let J = 0;
  const de = () => {
    const d = J;
    return ((J = 0), d ? { n: d, bp: d * A } : null);
  };
  let _e = 0;
  const Re = () => {
    const d = _e;
    return ((_e = 0), d);
  };
  function dt() {
    const d = new Set(x.mons.map((i) => i.uid));
    for (const i of [x.teamSets, x.link?.stash?.teamSets])
      i?.list &&
        ((i.list = i.list.map((w) => {
          if (!w?.length) return w;
          const S = w.filter((j) => d.has(j));
          return S.length ? S : null;
        })),
        i.on != null && !i.list[i.on] && (i.on = null));
  }
  function qe() {
    const d = ja(),
      i = new Set([...x.team, ...(x.link?.stash.team || [])]),
      w = (o, n) =>
        V(n) - V(o) ||
        n.level - o.level ||
        C(n) - C(o) ||
        i.has(n.uid) - i.has(o.uid) ||
        (o.caughtAt || 0) - (n.caughtAt || 0),
      S = {},
      j = {},
      me = [];
    for (const o of pn())
      !o.shiny && (!T(o.id) || Na(o.id)) && (S[ns(o.reg) + ":" + ze(o.id)] ||= []).push(o);
    for (const [o, n] of Object.entries(S)) {
      n.sort(w);
      const s = [],
        l = [];
      for (const c of n) (s.some((p) => p.id === c.id) ? l : s).push(c);
      for (const c of l)
        !Na(c.id) && !fn(c.id, [...s, c])
          ? s.push(c)
          : (j[o + ":" + c.id] ||= [s.find((p) => p.id === c.id)]).push(c);
    }
    for (const o of Object.values(j)) {
      const n = o[0],
        s = { id: n.id, uid: n.uid, from: n.level, to: n.level, gone: [] };
      for (const l of o.slice(1)) {
        ((x.mons = x.mons.filter((c) => c !== l)), (d.mons = d.mons.filter((c) => c.mon !== l)));
        for (const c of [
          x.team,
          x.road,
          x.link?.stash.team,
          ...Object.values(x.eventTeams || {}),
          ...(x.teamSets?.list || []),
          ...(x.link?.stash.teamSets?.list || []),
        ]) {
          const p = c?.indexOf(l.uid) ?? -1;
          p >= 0 && (c.includes(n.uid) ? c.splice(p, 1) : (c[p] = n.uid));
        }
        (x.buddy?.uid === l.uid && (x.buddy.uid = n.uid),
          Jn(ze(l.id), a.DUPLICATE_CANDIES, Ue(n.reg)),
          s.gone.push(l.uid));
      }
      ((s.to = n.level), me.push(s));
    }
    return me;
  }
  let ce = 0,
    tt = !1,
    mt = !1,
    Te = !1;
  const At = (d) => {
    tt = d;
  };
  function yt(d, i) {
    if (Te) throw new Error("sandbox");
    const w = x;
    ((x = d), (Te = !0), (he = d !== w));
    try {
      return i();
    } finally {
      ((x = w), (Te = he = !1));
    }
  }
  let he = !1;
  const fe = () => he,
    Oe = () => {
      mt = !0;
    };
  function Ee(d) {
    if (!(tt || mt || Te || t.TabLock?.mine() === !1)) {
      ((ce = Date.now()), ve(), t.Cloud?.touch(d?.idle === !0));
      try {
        localStorage.setItem(a.SAVE_KEY, JSON.stringify(x));
      } catch {}
    }
  }
  function et() {
    return ((x = Ze()), Ee(), x);
  }
  const _ = new Map(),
    we = (d) => {
      const i = H[d]?.from;
      return i != null && b[i] && !b[i].baby ? i : null;
    };
  function ie(d) {
    if (_.has(d)) return _.get(d);
    const i = b[d];
    let w;
    if (i.unique) w = 4;
    else if (i.legendary || i.mythical) w = 3;
    else if (((w = i.captureRate <= 45 ? 2 : i.captureRate <= 120 ? 1 : 0), !i.baby)) {
      const S = we(d),
        j = (t.EVOLUTIONS?.[d] || []).some((o) => b[o.to] && !b[o.to].legendary && !b[o.to].mythical);
      let me = 0;
      for (let o = S; o != null; o = we(o)) me++;
      if ((S != null && (w = Math.max(w, j ? 1 : me >= 2 ? 2 : 1)), S != null || !j)) {
        const o = Object.values(i.stats || {}).reduce((n, s) => n + s, 0);
        w = Math.max(w, o >= 500 ? 2 : o >= 450 ? 1 : 0);
      }
      ((w = Math.max(w, a.TIER_MIN?.[d] ?? 0)), S != null && (w = Math.max(w, Math.min(2, ie(S)))));
    }
    return (_.set(d, w), w);
  }
  const U = (d) => a.TIERS[ie(d)];
  function Ne(d) {
    let i = 1,
      w = d;
    for (; H[w] && !b[H[w].from].baby;) ((i = Math.max(i, H[w].level || 20)), (w = H[w].from));
    return i;
  }
  const T = (d) => !!(b[d]?.legendary || b[d]?.mythical),
    L = () => 151,
    R = () => t.POKEDEX.filter((d) => d.id <= L() && !d.legendary && !d.mythical);
  function te() {
    const d = R();
    let i = 0;
    const w = d.map((j) => {
      const me = Math.pow(j.captureRate, 1.5);
      return ((i += me), me);
    });
    let S = Math.random() * i;
    for (let j = 0; j < d.length; j++) if (((S -= w[j]), S <= 0)) return d[j].id;
    return 19;
  }
  const K = (d) => Math.floor(0.8 * Math.pow(d, 2.4) + 10),
    He = () => [
      { from: a.XP_GROWTH_FROM, step: t.STORY.REGIONS[0].ace[1] },
      ...t.STORY.REGIONS.filter((d) => d.base)
        .map((d) => ({ from: d.base, step: d.ace[1] }))
        .sort((d, i) => d.from - i.from),
    ];
  function m(d) {
    const i = He();
    let w = 1,
      S = 1;
    return (
      i.forEach((j, me) => {
        const o = Math.min(d, i[me + 1]?.from ?? 1 / 0);
        (o > j.from && (w *= (a.CHAPTER_TIME_RATIO ** (1 / j.step) * a.XP_GROWTH_EXTRA) ** (o - j.from)),
          d >= j.from &&
            me &&
            (S = w / (a.CHAPTER_TIME_RATIO ** (1 / j.step) * a.XP_GROWTH_EXTRA) ** (d - j.from)));
      }),
      { g: w, start: S }
    );
  }
  const z = (d) => K(d) * m(d).start,
    pe = (d) => a.REGION_XP?.[d.key] ?? d.xp ?? 1,
    V = (d) => Math.min(a.UNDERGROUND.RANK_MAX, Math.max(0, Math.floor(+d?.rank || 0))),
    lt = (d, i) => Math.floor(K(d) * m(d).g * a.XP_SCALE * pe(Ln()) * a.UNDERGROUND.RANK_XP ** V(i)),
    kt = (d) => t.POKEDEX.filter((i) => i.id >= d.dex[0] && i.id <= d.dex[1]).map((i) => i.id),
    ra = (d) => kt(d).every((i) => x.dex[i]),
    Vt = () => t.STORY.REGIONS.filter((d) => d.dex && ra(d)),
    Xt = (d = Sn()) => {
      const i = t.STORY.REGIONS.find((w) => w.key === Hn(d));
      return !!i?.dex && ra(i);
    },
    Ht = (d) => Math.min(1, a.SHINY_RATE * (Xt(d) ? 2 : 1));
  function ct(d, i, w = {}) {
    return (
      (i = Math.min(a.MAX_LEVEL, Math.max(1, i ?? 5))),
      { uid: se(), id: d, level: i, xp: 0, caughtAt: Date.now(), shiny: w.shiny ?? Math.random() < Ht() }
    );
  }
  const wt = (d) => {
    const i = d.foe ? null : (x.adv?.event?.level ?? x.adv?.zone?.level);
    return i ? Math.min(d.level, i) : d.level;
  };
  function ge(d) {
    const i = b[d.id].stats,
      w = wt(d),
      S = (d.shiny ? 1 + (a.SHINY_STAT_BONUS || 0) : 1) * (d.statMult || 1) * a.UNDERGROUND.RANK_STAT ** V(d),
      j = (me) => Math.floor((Math.floor((2 * i[me] * w) / 100) + 5) * S);
    return {
      hp: Math.floor((Math.floor((2 * i.hp * w) / 100) + w + 10) * S),
      atk: j("atk"),
      def: j("def"),
      spa: j("spa"),
      spd: j("spd"),
      spe: j("spe"),
    };
  }
  const Fe = (d) => Math.min(a.HP_LEVEL_MAX, 1 + (a.HP_LEVEL_SCALE * d) / 100),
    gt = (d) => Math.floor(ge(d).hp * Fe(wt(d)) * (d.hpMult || 1)),
    Dt = (d) => (d.hp == null ? gt(d) : Math.min(d.hp, gt(d)));
  function ha(d) {
    if (a.MOVE_POWER_OVERRIDES[d] != null) return a.MOVE_POWER_OVERRIDES[d];
    const i = t.MOVES[d]?.power || 0,
      w = a.MULTI_HIT[d];
    return w == null
      ? i
      : Array.isArray(w)
        ? w.reduce((S, j) => S + j, 0)
        : w === "2-5"
          ? i * a.MULTI_HIT_ODDS.reduce((S, j, me) => S + j * (me + 2), 0)
          : i * w;
  }
  function _t(d) {
    const i = a.MULTI_HIT[d],
      w = t.MOVES[d]?.power || 0;
    if (i == null) return null;
    if (Array.isArray(i)) return [...i];
    let S = 2;
    if (i === "2-5")
      for (
        let j = Math.random(), me = 0;
        me < a.MULTI_HIT_ODDS.length && (j -= a.MULTI_HIT_ODDS[me]) > 0;
        me++
      )
        S = me + 3;
    return Array(i === "2-5" ? S : i).fill(w);
  }
  const Ea = (d) => (a.MULTI_HIT[d] === "2-5" ? 2 * (t.MOVES[d]?.power || 0) : ha(d));
  function ut(d) {
    const i = a.MULTI_HIT[d],
      w = t.MOVES[d]?.power || 0;
    return i == null
      ? String(ha(d))
      : Array.isArray(i)
        ? `${i[0]}–${i[i.length - 1]} ×${i.length}`
        : `${w} ×${i === "2-5" ? "2–5" : i}`;
  }
  function jt(d) {
    const i = ha(d),
      [w, S, j] = a.ACC_CURVE;
    return i <= 0 ? t.MOVES[d]?.acc || 100 : 100 - (100 - j) * Math.min(1, Math.max(0, i - w) / (S - w));
  }
  function xt(d) {
    const i = [...b[d.id].learn],
      w = new Set(i.map((S) => S[1]));
    for (let S = d.id, j; (j = H[S]) && b[j.from]; S = j.from) {
      const me = b[j.from].learn.filter((o) => !w.has(o[1]));
      for (const o of me) w.add(o[1]);
      i.push(...me);
    }
    return i;
  }
  const D = (d, i) => (i.cat === "phys" ? d.stats.atk : d.stats.spa),
    Q = (d, i) => {
      const w = t.MOVES[d];
      return { key: d, name: w.name, type: w.type, cat: w.cat, power: i, acc: jt(d) };
    };
  function Y(d) {
    const i = b[d.id];
    let w = null,
      S = -1,
      j = null;
    for (const [o, n] of xt(d)) {
      if (o > d.level || ((j = n), a.MOVE_BLACKLIST.includes(n))) continue;
      const s = t.MOVES[n];
      if (!s) continue;
      const l = ha(n);
      if (l <= 0) continue;
      const c = ((l * jt(n)) / 100) * (i.types.includes(s.type) ? 1.5 : 1) * D(i, s);
      c > S && ((S = c), (w = n));
    }
    if (!w && !j) return Q("struggle", ha("struggle"));
    const me = w || j;
    return Q(me, w ? ha(me) : 0);
  }
  function ye(d, i) {
    const w = b[d.id];
    let S = null,
      j = -1;
    for (const [me, o] of xt(d)) {
      if (me > d.level || a.MOVE_BLACKLIST.includes(o)) continue;
      const n = t.MOVES[o];
      if (!n) continue;
      const s = ha(o);
      if (s <= 0) continue;
      let l = 1;
      for (const p of i) l *= t.TYPE_CHART[n.type]?.[p] ?? 1;
      const c = ((s * jt(o)) / 100) * (w.types.includes(n.type) ? 1.5 : 1) * l * D(w, n);
      c > j && ((j = c), (S = o));
    }
    return !S || j <= 0 ? Y(d) : Q(S, ha(S));
  }
  function nt(d) {
    const i = Y(d);
    for (const [w] of b[d.id].learn) {
      if (w <= d.level) continue;
      const S = Y({ ...d, level: w });
      if (S.key !== i.key) return { level: w, move: S };
    }
    return null;
  }
  function Ot(d, i) {
    if (V(d)) return !0;
    const w = ns(d.reg);
    if (
      ![...pn(), ...dn()].some(
        (o) => o.id === i && o.uid !== d.uid && !o.shiny == !d.shiny && ns(o.reg) === w,
      )
    )
      return !1;
    const S = xn(d.reg, d.shiny),
      j = S.some((o) => o.uid === d.uid) ? S : [...S, d];
    if (d.shiny || Yn(d.id))
      return (
        fn(
          i,
          j.map((o) => (o.uid === d.uid ? { id: i } : o)),
        ) > fn(i, j)
      );
    const me = j.filter((o) => o.uid !== d.uid);
    return fn(i, [...me, { id: i }], !0) > fn(i, me, !0);
  }
  const ee = (d) => Es(t.FORMS?.baseOf(d.to) ?? d.to),
    rt = (d) =>
      (t.EVOLUTIONS[d.id] || []).filter(
        (i) =>
          i.level &&
          d.level >= i.level &&
          ee(i) &&
          !Ot(d, i.to) &&
          (t.DAYTIME?.matches(a.TIME_EVOLUTIONS[i.to]) ?? !0) &&
          (!i.party || ss().some((w) => w.id === i.party)),
      );
  function Qe(d) {
    const i = rt(d);
    if (i.length < 2) return i[0] || null;
    const w = [...d.uid].reduce((S, j) => (S * 31 + j.charCodeAt(0)) >>> 0, 7);
    return i[w % i.length];
  }
  const Ft = (d) =>
      (t.EVOLUTIONS[d.id] || []).filter(
        (i) => i.item && ee(i) && !Ot(d, i.to) && (t.DAYTIME?.matches(a.TIME_EVOLUTIONS[i.to]) ?? !0),
      ),
    Ye = () => t.STORY.levelCap(x.adv),
    bt = (d) => (x.link && d ? t.STORY.regionCap(x.adv, Kn(d)) : Ye());
  let Yt = null;
  const wa = (d) => {
      Yt = d === !0 ? {} : d || null;
    },
    pa = (d) => Math.min(bt(d), Yt ? (Yt[d.uid] ??= d.level) + a.OFFLINE_MAX_LEVELS : 1 / 0),
    Gt = (d) => d.level >= pa(d);
  function N(d, i) {
    const w = { levels: 0, evolve: null },
      S = pa(d);
    if (d.level >= S) return w;
    const j = Dt(d),
      me = gt(d);
    for (d.xp += Math.round(i); d.level < S && d.xp >= lt(d.level, d);)
      ((d.xp -= lt(d.level, d)), d.level++, w.levels++);
    if (
      (d.level >= bt(d) ? (d.xp = 0) : d.level >= S && (d.xp = Math.min(d.xp, lt(d.level, d) - 1)), w.levels)
    ) {
      d.hp != null && (d.hp = j > 0 ? j + (gt(d) - me) : 0);
      const o = Qe(d);
      o && (w.evolve = { uid: d.uid, from: d.id, to: o.to });
    }
    return w;
  }
  const W = (d) => (Gt(d) ? { levels: 0, evolve: null } : N(d, lt(d.level, d) - d.xp));
  function ze(d) {
    for (; H[d];) d = H[d].from;
    return d;
  }
  const qt = (d) => (Gt(d) ? 0 : Math.round(z(d.level) * a.CANDY_LEVEL_SHARE)),
    Lt = () => (x.buddy.uid && Dn(x.buddy.uid)) || null,
    zt = (d) => {
      const i = a.BUDDY_KOS[ie(ze(d.id))],
        w = a.BUDDY_RAMP_LEVEL;
      return w > 0 && d.level < w ? Math.max(Math.min(5, i), Math.round((i * d.level) / w)) : i;
    };
  function ca(d) {
    (d != null && !Dn(d)) || x.buddy.uid === d || ((x.buddy = { uid: d, ko: 0 }), Ee());
  }
  function Ma() {
    const d = Lt();
    if (!d || ++x.buddy.ko < zt(d) || ((x.buddy.ko = 0), Gt(d))) return null;
    const i = d.xp / lt(d.level, d),
      w = qt(d),
      S = N(d, w);
    return {
      uid: d.uid,
      family: ze(d.id),
      fed: [{ uid: d.uid, amount: w, levels: S.levels, level: d.level, evolve: S.evolve, from: i }],
    };
  }
  const Na = (d) => Object.values(a.PENSION.LAYS || {}).includes(+d),
    Va = (d, i) =>
      (Na(d.id) || (!T(d.id) && !is(d, i))) && xn(i || d.reg || Sn(), d.shiny).some((w) => w.id === d.id),
    Ba = (d) => [...(t.EVOLUTIONS[d] || []).map((i) => i.to), ...(ue[d] || [])].filter((i) => b[i]),
    za = (d) => [d, ...Ba(d).flatMap(za)],
    vn = (d) => za(ze(d)),
    An = (d) => za(d).filter((i) => Es(i)),
    on = (d) => An(bs(d)),
    qn = 1,
    xn = (d, i = !1) => {
      const w = ns(d || Sn());
      return [...Ue(d || Sn()), ...dn().filter((S) => ns(S.reg) === w)].filter((S) => !S.shiny == !i);
    };
  function fn(d, i, w = !1) {
    const S = ze(d),
      j = {};
    for (const c of i) ze(c.id) === S && (j[c.id] = (j[c.id] || 0) + 1);
    let me = S;
    for (; !Es(me) && Ba(me).length === 1;) me = Ba(me)[0];
    const o = (c) => Es(c) || j[c] || Ba(c).some(o),
      n = za(S).some((c) => Ba(c).filter(o).length > 1);
    let s = 0;
    const l = (c) => {
      const p = Ba(c).map(l),
        y = p.some((I) => I[1]),
        v = (Es(c) || j[c]) && !(w && y && !(n && c === me)),
        M = p.reduce((I, ke) => I + ke[0], 0) + (v ? 1 : 0) + (c === me && !w ? qn : 0) - (j[c] || 0);
      return (M < 0 && (s -= M), [Math.max(0, M), y || v]);
    };
    return (l(S), s);
  }
  const Yn = (d) => !!x.keepDup?.[ze(d)];
  function Zn(d, i) {
    const w = ze(d);
    ((x.keepDup ||= {}), i ? (x.keepDup[w] = 1) : delete x.keepDup[w], Ee());
  }
  function is(d, i) {
    const w = xn(i || d.reg, d.shiny);
    return d.shiny || Yn(d.id)
      ? fn(d.id, [...w, d]) === fn(d.id, w)
      : fn(d.id, [...w, d], !0) === fn(d.id, w, !0);
  }
  const ts = (d, i) => Math.max(0, on(d).length + qn - i.filter((w) => ze(w.id) === ze(d)).length);
  function Jn(d, i, w = Ue(Sn())) {
    const S = w.filter((me) => ze(me.id) === d && !Gt(me)),
      j = S.map((me) => {
        const o = me.xp / lt(me.level, me),
          n = Math.round((qt(me) * i) / S.length),
          s = N(me, n);
        return {
          uid: me.uid,
          amount: n,
          levels: s.levels,
          level: me.level,
          evolve: x.team.includes(me.uid) ? s.evolve : null,
          from: o,
        };
      });
    return { family: d, amount: i, fed: j };
  }
  function On(d, i) {
    const w = Dn(d);
    if (!w) return null;
    const S = Dt(w) / gt(w),
      j = w.id;
    ((w.id = i), w.hp != null && (w.hp = Math.round(gt(w) * S)), Ha(i, w.shiny, w.reg), x.stats.evolutions++);
    for (const o of [x.team, x.link?.stash?.team, ...Object.values(x.eventTeams || {})])
      o?.includes(d) && oa(o, d);
    const me = (t.EVOLUTIONS[j] || []).some((o) => o.item === "shed-shell" && o.to !== i);
    return (me && Mt("shed-shell"), Ee(), { uid: d, from: j, to: i, shell: me });
  }
  const Me = {
    "rotom-oven": [47901, "Route 227", "rotom-heat"],
    "rotom-washer": [47902, "Route 213", "rotom-wash"],
    "rotom-fridge": [47903, "Route 217", "rotom-frost"],
    "rotom-fan": [47904, "Les Éoliennes", "rotom-fan"],
    "rotom-mower": [47905, "Jardin Trophée", "rotom-mow"],
  };
  function It() {
    if (x.rotomForms) return;
    x.rotomForms = 1;
    const d = [...pn(), x.tradeOut?.mon, x.tradeIn?.mon].filter(
      (S) => S && S.id >= 479 && S.id <= 47905 && (S.id === 479 || S.id > 47900),
    );
    for (const S of d) S.id !== 479 && ((S.id = 479), (S.hp = null));
    const i = Math.max(20, ...d.map((S) => S.level)),
      w = new Set();
    for (const S of [x.items, x.link?.stash?.items])
      for (const [j, [me, o, n]] of Object.entries(Me))
        S?.[j] &&
          (Pa(j, -S[j]),
          delete S[j],
          !w.has(me) &&
            (w.add(me),
            Xa({ ...ct(me, i, { shiny: !1 }), where: o, how: "gift" }, { home: "sinnoh" }),
            x.adv && ((x.adv.gifts ||= {})[n] = !0)));
  }
  const Kt = () => Object.keys(a.UNDERGROUND.LOOT.PLATES).filter((d) => x.under?.plates?.[d]);
  function Aa(d) {
    const i = t.FORMS;
    return !d || !i?.plateForm("fire") || d.id !== i.baseOf(i.plateForm("fire"))
      ? []
      : Kt().map((w) => ({ type: w, id: i.plateForm(w), owned: Ua(i.plateForm(w)) }));
  }
  function Ka() {
    const d = t.FORMS?.formsOf(493) || [493],
      i = new Set(pn().map((w) => w.id));
    return [d.filter((w) => i.has(w)).length, d.length];
  }
  function _a(d, i) {
    const w = Dn(d),
      S = t.FORMS,
      j = S?.plateForm(i);
    if (!w || !j || w.id !== S.baseOf(j)) return null;
    if (!x.under?.plates?.[i]) return { error: e("Tu n'as pas cette plaque.") };
    if (Ua(j)) return { error: e("Tu as déjà {name}. Un seul Arceus par forme.", { name: b[j].name }) };
    const me = Dt(w) / gt(w),
      o = w.id;
    return (
      (w.id = j),
      w.hp != null && (w.hp = Math.round(gt(w) * me)),
      delete x.under.plates[i],
      Ha(j, w.shiny, w.reg),
      Ee(),
      { uid: d, from: o, to: j, type: i }
    );
  }
  function Ha(d, i = !1, w = Sn()) {
    ((Ut = null), (x.seen[d] = !0));
    const S = x.dex[d] || (x.dex[d] = { caught: 0, firstAt: Date.now() });
    return (
      S.caught++,
      ((S.regs ||= {})[Hn(w)] = 1),
      i && ((S.shiny = 1), (x.seenShiny[d] = !0)),
      S.caught === 1
    );
  }
  const Ua = (d) => pn().some((i) => i.id === d),
    sn = (d) => Ue(Sn()).some((i) => i.id === d),
    Be = (d) => !!x.dex[d]?.regs?.[Sn()];
  let Ut = null,
    aa = null,
    ae = 0;
  function ft(d = !1) {
    if (!Ut || Date.now() - ae > 300) {
      const i = [...pn(), ...dn()],
        w = (S) => (S.id !== 493 && t.FORMS?.baseOf?.(S.id) === 493 ? [S.id, 493] : [S.id]);
      ((Ut = new Set(i.flatMap(w))), (aa = new Set(i.filter((S) => S.shiny).flatMap(w))), (ae = Date.now()));
    }
    return d ? aa : Ut;
  }
  const ht = (d) => !!x.dex[d] && ft().has(d),
    ea = (d, i = !1) =>
      i
        ? ft(!0).has(d)
          ? "caught"
          : x.dex[d]?.shiny
            ? "lost"
            : x.seenShiny?.[d]
              ? "seen"
              : "unknown"
        : ht(d)
          ? "caught"
          : x.dex[d]
            ? "lost"
            : x.seen?.[d]
              ? "seen"
              : "unknown",
    Ra = () => x.mons.filter((d) => !x.team.includes(d.uid));
  function Ca(d) {
    const i = x.eventTeams[d] || (x.eventTeams[d] = []),
      w = String(d).startsWith("zone:") ? +String(d).slice(5) : null;
    for (let S = i.length - 1; S >= 0; S--) (!Dn(i[S]) || (w && !va(Dn(i[S]), w))) && i.splice(S, 1);
    return i;
  }
  const gn = () => (x.adv?.tower?.kind === "candy" ? t.CandyRun : t.Tower),
    yn = () =>
      x.adv?.tower
        ? gn().team()
        : x.adv?.event
          ? x.adv.event.raid
            ? t.Raids.team()
            : Ca(x.adv.event.id)
          : x.adv?.league?.team?.some((d) => Dn(d))
            ? Et(x.adv.league.team.filter((d) => Dn(d)))
            : x.adv?.league && Ca("league:" + x.adv.league.reg).length
              ? Et(Ca("league:" + x.adv.league.reg))
              : x.adv?.zone?.elite && mn(x.adv.zone.id).length
                ? Et(mn(x.adv.zone.id))
                : x.adv?.league || x.adv?.zone?.elite
                  ? Et(x.team)
                  : x.adv?.zone && !x.adv.zone.riddle && mn(x.adv.zone.id).length
                    ? mn(x.adv.zone.id)
                    : x.team,
    mn = (d) => Ca("zone:" + d),
    ln = (d) => (d != null && t.FORMS?.single(d)) || null,
    In = (d) => (d ? ln(d.id) || (d.shiny ? "shiny:" : "mon:") + d.id : null),
    xe = (d) => (d ? ln(d.id) || "sp:" + d.id : null),
    Et = (d) => {
      const i = new Set();
      return d.filter((w) => {
        const S = xe(Dn(w));
        return !S || (!i.has(S) && i.add(S));
      });
    };
  function oa(d, i, w = In) {
    const S = w(Dn(i));
    if (!S) return null;
    const j = d.findIndex((me) => me !== i && w(Dn(me)) === S);
    return j < 0 ? null : d.splice(j, 1)[0];
  }
  const sa = (d, i) => {
    const w = In(i);
    return !!w && d.some((S) => In(Dn(S)) === w);
  };
  function Ga(d) {
    const i = new Set(),
      w = d.length,
      S = d.filter((j) => {
        const me = In(Dn(j));
        return !me || (!i.has(me) && i.add(me));
      });
    return (d.splice(0, d.length, ...S), w - d.length);
  }
  function cn() {
    return x.adv?.tower
      ? gn().team()
      : (x.road &&
          (x.road = x.road.filter((d) =>
            x.adv?.event
              ? Dn(d)
              : x.adv?.league
                ? Dn(d) && Zt(Dn(d), x.adv.league.reg)
                : x.adv?.zone
                  ? Dn(d) && (x.adv.zone.riddle || va(Dn(d), x.adv.zone.id))
                  : x.mons.some((i) => i.uid === d && Bt(i)),
          )),
        x.road?.length || (x.road = [...yn()]),
        x.road);
  }
  const Tn = () => {
      const d = yn(),
        i = cn();
      return d.length !== i.length || d.some((w, S) => w !== i[S]);
    },
    Mn = (d) => {
      const i = ss().filter((w) => Dt(w) > 0);
      return i.length === 1 && i[0].uid === d;
    },
    ks = e("C'est le dernier Pokémon debout de ton équipe en route."),
    ss = (d = cn()) => d.map(Dn).filter(Boolean),
    us = () => !1,
    Xn = () => x.team.length < a.TEAM_SIZE || !us(),
    Dn = (d) =>
      String(d).startsWith("t:")
        ? t.Tower?.runMon(d)
        : String(d).startsWith("c:")
          ? t.CandyRun?.runMon(d)
          : x.mons.find((i) => i.uid === d) || t.Raids?.allyMon(d),
    ls = { kanto2: "johto" };
  function Hn(d) {
    return d ? ((d = ls[d] || d), t.STORY.REGIONS.some((i) => i.key === d) ? d : "kanto") : "kanto";
  }
  const Kn = (d) => Hn(d?.reg),
    Sn = () => Hn(t.STORY.regionOf(x.adv?.chapter ?? 0)?.key),
    ns = (d) => (x.link ? (Hn(d) === x.link.to ? "to" : "from") : "all"),
    Ue = (d) => {
      const i = ns(d);
      return pn().filter((w) => ns(w.reg) === i);
    },
    Bt = (d) => !x.link || (x.link.side === "from" ? Kn(d) !== x.link.to : Kn(d) === x.link.to),
    st = () => x.mons.filter(Bt),
    Zt = (d, i) => !x.link || (Hn(i) === x.link.to) == (Kn(d) === x.link.to),
    va = (d, i) => Zt(d, t.LegendZones?.get(i)?.region);
  function Da(d, i = "adventure", w = null) {
    if (!d || (i === "zone" ? va(d, w) : i === "region" ? Zt(d, w) : i !== "adventure" || Bt(d))) return null;
    const S = (j) => e(t.STORY.REGIONS.find((me) => me.key === j)?.name || "");
    return e("Vient de {reg} : combat à {reg}, ou partout après la Ligue de {to}.", {
      reg: S(Kn(d)),
      to: S(x.link.to),
    });
  }
  function la(d) {
    const i = x.link;
    if (!d || !i || i.side === "to" || Kn(d) !== i.to) return null;
    const w = e(t.STORY.REGIONS.find((S) => S.key === i.to)?.name || "");
    return e(
      "Le Sac de cette région ne sert pas aux Pokémon de {to} avant sa Ligue : joue un chapitre de {to} pour utiliser le sien.",
      { to: w },
    );
  }
  function Xa(d, { home: i, candies: w = a.DUPLICATE_CANDIES } = {}) {
    const S = b[d.id];
    if (
      ((d.reg = Hn(i || d.reg || ((S.legendary || S.mythical) && Ja(d.id)) || Sn())), delete d.nature, Va(d))
    ) {
      Ha(d.id, !1, d.reg);
      const j = { mon: d, duplicate: !0, ...Jn(ze(d.id), w, Ue(d.reg)) };
      return { mon: d, dup: j };
    }
    return (
      x.mons.push(d),
      x.team.length < a.TEAM_SIZE &&
        !sa(x.team, d) &&
        Bt(d) &&
        (x.team.push(d.uid),
        x.road &&
          yn() === x.team &&
          x.road.length < a.TEAM_SIZE &&
          !x.road.includes(d.uid) &&
          x.road.push(d.uid)),
      { mon: d, isNew: Ha(d.id, d.shiny, d.reg) }
    );
  }
  function nn() {
    let d = 0;
    x.travel?.to?.some((S) => ls[S]) &&
      ((x.travel.to = [...new Set(x.travel.to.map((S) => ls[S] || S))]), d++);
    for (const S of ["from", "to"]) ls[x.link?.[S]] && ((x.link[S] = ls[x.link[S]]), d++);
    const i = x.link ? Hn(x.link.from) : "kanto";
    for (const S of [...x.mons, ...ja().mons.map((j) => j.mon), x.tradeOut?.mon, x.tradeIn?.mon]) {
      if (!S) continue;
      const j = S.reg ? Hn(S.reg) : i;
      j !== S.reg && ((S.reg = j), d++);
    }
    for (const S of x.mons) {
      const j = S.egg && Ys(S.where);
      j &&
        j !== S.reg &&
        !Ue(j).some((me) => me !== S && me.id === S.id && !me.shiny == !S.shiny) &&
        ((S.reg = j), d++);
    }
    for (const S of [x.tradeOut, x.tradeIn, ...(x.mktOut || [])]) S?.reg && (S.reg = Hn(S.reg));
    for (const S of pn()) x.dex[S.id] && ((x.dex[S.id].regs ||= {})[Kn(S)] = 1);
    const w = x.team.length;
    ((x.team = x.team.filter((S) => {
      const j = x.mons.find((me) => me.uid === S);
      return j && Bt(j);
    })),
      (d += w - x.team.length));
    for (const S of [x.team, x.road, x.link?.stash?.team, ...Object.values(x.eventTeams || {})])
      S && (d += Ga(S));
    return (d && console.info(`[regions] ${d} fixed on load`), d);
  }
  const F = () => [...x.mons],
    Ce = (d) => (x.link ? (d === x.link.to ? "to" : "from") : null),
    Xe = (d) => (!x.link || !d || d === "all" || d === x.link.side ? x.money : x.link.stash.money || 0);
  function Ve(d, i) {
    const w = x.link;
    if (!w || !d || d === "all" || d === w.side) return i();
    const S = { money: x.money, items: x.items };
    ((x.money = w.stash.money || 0), (x.items = w.stash.items || (w.stash.items = {})));
    try {
      return i();
    } finally {
      ((w.stash.money = x.money), (w.stash.items = x.items), (x.money = S.money), (x.items = S.items));
    }
  }
  const Rt = () => {
      const d = x.link?.stash?.balls;
      return { balls: Math.max(0, Math.round(+d?.balls || 0)), free: Math.max(0, Math.round(+d?.free || 0)) };
    },
    da = () => {
      const d = x.casino || {},
        i = Rt();
      return { balls: Math.max(0, (d.balls || 0) - i.balls), free: Math.max(0, (d.free || 0) - i.free) };
    };
  function ia(d) {
    const i = x.link,
      w = Ce(d);
    if (!w || w === i.side) return !1;
    const S = { money: x.money, items: x.items, team: x.team, teamSets: x.teamSets, balls: da() };
    (Object.assign(x, {
      money: i.stash.money,
      items: i.stash.items,
      team: i.stash.team.filter((me) => x.mons.some((o) => o.uid === me)),
      teamSets: i.stash.teamSets,
    }),
      (i.stash = S),
      (i.side = w));
    const j = x.team.filter((me) => Bt(Dn(me)));
    return (
      j.length < x.team.length &&
        (x.team = j.length
          ? j
          : st()
              .sort((me, o) => o.level - me.level)
              .slice(0, 1)
              .map((me) => me.uid)),
      (x.road = null),
      !0
    );
  }
  const Ja = (d) => {
      const i = b[d]?.num ?? d;
      return t.STORY.REGIONS.find((w) => w.dex && i >= w.dex[0] && i <= w.dex[1])?.key;
    },
    Ia = (d, i) => {
      const w = Ja(t.FORMS?.baseOf?.(d) ?? d);
      return w && t.STORY.REGIONS.find((S) => S.key === w)?.open ? w : i;
    };
  let ka = null;
  function Za(d) {
    const i = t.STORY,
      w = t.Adventure;
    !ka &&
      w?.zonePool &&
      ((ka = {}),
      i.CHAPTERS.forEach((j, me) => {
        const o = j.steps.filter((s) => s.kind === "route" && (s.areas?.length || s.species?.length)),
          n = Hn(j.reg || "kanto");
        o.forEach((s, l) => {
          if (s.wild !== 0)
            for (const c of w.zonePool({ ...s, lv: i.routeBand(me, l, o.length) }, me, !0, null, !0))
              (ka[c.id] || (ka[c.id] = new Set())).add(n);
        });
      }));
    const S = new Set();
    for (let j = t.FORMS?.baseOf?.(d) ?? d; j != null; j = H[j]?.from)
      for (const me of ka?.[j] || []) S.add(me);
    return S;
  }
  const En = (d, i) => ns(Ja(t.FORMS?.baseOf?.(d) ?? d)) === i || [...Za(d)].some((w) => ns(w) === i),
    bn = (d, i) => {
      const w = Ia(d, i);
      if (!x.link || !i) return w;
      const S = ns(i);
      return ns(w) !== S && En(d, S) ? Hn(i) : w;
    };
  function an(d, i) {
    if (!i) return;
    const w = (x.stats.byReg = x.stats.byReg || {}),
      S = (w[i] = w[i] || {});
    S[d] = (S[d] || 0) + 1;
  }
  function Wn() {
    for (const d of x.travel?.to || []) {
      const i = t.STORY.REGIONS.find((w) => w.key === d);
      i && (i.open = !0);
    }
  }
  function wn() {
    const d = t.STORY,
      i = Ln(),
      w = d.REGIONS[d.REGIONS.indexOf(i) + 1];
    return x.link || !w?.key || w.open || w.wip || d.firstChapterOf(w.key) < 0 ? null : rs(i.key) ? w : null;
  }
  function Bn() {
    const d = t.STORY,
      i = wn();
    if (!i) return !1;
    if (!i.aside)
      return (
        (x.travel = { to: [...(x.travel?.to || []), i.key], at: Date.now() }),
        Wn(),
        (x.adv.unlocked = Math.max(x.adv.unlocked, d.firstChapterOf(i.key))),
        Ee(),
        i
      );
    const w = Ln().key,
      S = ja();
    for (const me of [...x.mons, ...S.mons.map((o) => o.mon)]) me.reg = Hn(me.reg || w);
    ((x.link = {
      from: w,
      to: i.key,
      side: "to",
      at: Date.now(),
      stash: {
        money: x.money,
        items: x.items,
        team: x.team,
        teamSets: x.teamSets,
        balls: { balls: x.casino?.balls || 0, free: x.casino?.free || 0 },
      },
    }),
      Object.assign(x, { team: [], money: 0, items: { ...a.START_ITEMS } }));
    for (const me of Object.values(x.buffs || {})) me.side = "from";
    for (const [me, o] of Object.entries(a.START_ITEMS)) Pa(me, o);
    (delete x.teamSets,
      pt(a.START_MONEY),
      (x.road = null),
      (x.travel = { to: [...(x.travel?.to || []), i.key], at: Date.now() }),
      Wn());
    const j = x.adv;
    return ((j.unlocked = Math.max(j.unlocked, d.firstChapterOf(i.key))), (j.loops = []), Ee(), i);
  }
  const C = (d) => {
    let i = d.xp || 0;
    for (let w = 1; w < d.level; w++) i += lt(w, d);
    return i;
  };
  function g() {
    const d = x.link;
    if (!d || !Cs(d.to)) return null;
    ia(d.to);
    const i = d.stash,
      w = { region: d.from, to: d.to, back: 0, merged: [], money: i.money, items: 0, uids: [] },
      S = pn().filter((s) => Kn(s) !== d.to);
    delete x.link;
    const j = [x.teamSets, i.teamSets].flatMap((s) => (s?.list || []).filter((l) => l?.length));
    j.length && (x.teamSets = { list: j.slice(0, 5), on: null });
    const me = qe(),
      o = new Set(me.flatMap((s) => s.gone)),
      n = new Set(me.map((s) => s.uid));
    for (const s of me) w.merged.push({ id: s.id, from: s.from, to: s.to, uid: s.uid });
    for (const s of S) !o.has(s.uid) && !n.has(s.uid) && (w.back++, w.uids.push(s.uid));
    x.money += i.money;
    for (const [s, l] of Object.entries(i.items || {}))
      ((x.items[s] = (x.items[s] || 0) + l), (w.items += l));
    return (Ee(), w);
  }
  function E(d) {
    const i = U(d.id);
    return Math.round(i.sell * (1 + d.level / 20) * (d.shiny ? 10 : 1));
  }
  function q() {
    if (!x.adv?.tower) {
      x.road = [...yn()];
      for (const d of ss()) ((d.hp = gt(d)), t.STATUS?.clear(d));
    }
  }
  const Pe = (d) => x.items[d] || 0,
    at = (d) => Pe(d) + (x.link?.stash?.items?.[d] || 0);
  function Mt(d, i = 1) {
    ((x.items[d] = Pe(d) + i), Pa(d, i));
  }
  function Pa(d, i) {
    if (d === "coin" || !i || !x.itemSince) return;
    const w = i > 0 ? "itemIn" : "itemOut",
      S = (x.stats[w] ||= {});
    S[d] = (S[d] || 0) + Math.abs(i);
  }
  let Ta = null;
  const La = () => Ta ?? Ge(),
    xa = (d) => {
      Ta = d;
    },
    en = (d, i = La()) => {
      const w = x.buffs?.[d];
      return w && w.until > i && a.BUFF_BERRIES[w.key] && !(w.side === "from" && x.link?.side === "to")
        ? w
        : null;
    },
    rn = (d) => {
      const i = en(d);
      return i ? a.BUFF_BERRIES[i.key].mult : 1;
    },
    hn = (d = Ge()) =>
      [...new Set(Object.values(a.BUFF_BERRIES).map((i) => i.family))]
        .map((i) => en(i, d))
        .filter(Boolean)
        .map((i) => ({ ...i, family: a.BUFF_BERRIES[i.key].family, left: i.until - d }));
  function Fn(d) {
    const i = a.BUFF_BERRIES[d],
      w = i && en(i.family, Ge());
    if (!i || Pe(d) <= 0) return null;
    const S = w?.key === d,
      j = a.BUFF_MIN * 6e4;
    return S && w.until - Ge() + j > a.BUFF_STACK * j
      ? null
      : (Mt(d, -1),
        ((x.buffs ||= {})[i.family] = { key: d, until: (S ? w.until : Ge()) + j, side: x.link?.side }),
        { ...x.buffs[i.family], replaced: w && !S ? w.key : null, stacked: S });
  }
  function Ln() {
    if (x.link?.side === "from") return t.STORY.REGIONS.find((i) => i.key === x.link.from);
    let d = x.adv?.unlocked || 0;
    for (; d > 0 && !t.STORY.regionOf(d).open;) d--;
    return t.STORY.regionOf(d);
  }
  function Pn(d) {
    const i = t.STORY.REGIONS,
      w = a.BEHIND_MONEY || [],
      S = i.indexOf(Ln()) - i.indexOf(t.STORY.regionOf(d));
    return S > 0 && w.length ? w[Math.min(S, w.length) - 1] : 1;
  }
  const jn = () => Ln(),
    h = () => jn().economy || 1,
    k = () =>
      t.STORY.chaptersOf(jn().key).filter(
        (d) =>
          d < (x.adv?.unlocked || 0) && t.STORY.CHAPTERS[d].steps.some((i) => i.kind === "gym" && i.badge),
      ).length,
    ne = (d, i) => d.ace[0] + d.ace[1] * i;
  function Ie(d) {
    const i = a.EXP_CANDIES[d],
      w = jn(),
      S = t.STORY.REGIONS[0],
      j = (me, o) => K(me) * m(me).g * pe(o);
    return Math.round((i.xp * (a.EXP_CANDY_MULT ?? 1) * j(ne(w, i.badges), w)) / j(ne(S, i.badges), S));
  }
  const Le = (d) => (a.EXP_CANDIES[d.id] ? Math.round(a.EXP_CANDIES[d.id].price * h()) : d.price),
    Pt = (d) => d.badges ?? a.EXP_CANDIES[d.id]?.badges ?? 0,
    Nt = (d) => k() >= Pt(d);
  function Qt(d) {
    const i = t.STORY,
      w = d == null ? null : i.firstChapterOf(i.regionOf(d).key);
    return a.SHOP.filter(
      (S) =>
        S.id.endsWith("-stone") &&
        !S.once &&
        (!S.region ||
          (w == null
            ? i.regionUnlocked(S.region, x.adv)
            : ((j) => j >= 0 && j <= w)(i.firstChapterOf(S.region)))),
    ).map((S) => S.id);
  }
  function ma(d, i = 1) {
    const w = Le(d) * i;
    return !Nt(d) || x.money < w
      ? !1
      : (We(w, a.EXP_CANDIES[d.id] ? "candy" : "shop"), Mt(d.id, (d.amount || 1) * i), Ee(), !0);
  }
  const $a = (d) => {
    const i = a.SHOP.find((S) => S.id === d),
      w = i ? Le(i) : a.SELL.VALUE[d];
    return w ? Math.max(1, Math.floor(w * a.SELL.RATE)) : 0;
  };
  function Fa(d, i = 1) {
    i = Math.floor(i);
    const w = $a(d);
    return !w || !(i > 0) || Pe(d) < i
      ? 0
      : (Mt(d, -i), (x.stats.sold = (x.stats.sold || 0) + w * i), pt(w * i), Ee(), w * i);
  }
  function fa(d, i, w) {
    const S = Dn(d);
    if (!S || Pe(i) <= 0 || la(S)) return null;
    let j;
    if (i === "rare-candy") {
      if (Gt(S)) return null;
      j = W(S);
    } else if (a.EXP_CANDIES[i]) {
      if (Gt(S)) return null;
      const me = Ie(i);
      j = { ...N(S, me), amount: me };
    } else {
      const me = Ft(S).find((s) => s.item === i && (w == null || s.to === w));
      if (!me) return null;
      const o = S.id,
        n = On(d, me.to);
      j = { levels: 0, evolve: { uid: d, from: o, to: me.to, forced: !0, done: !0, shell: n } };
    }
    return (Mt(i, -1), Ee(), j);
  }
  const ga = 132,
    qa = a.PENSION,
    ja = () => x.pension || (x.pension = { mons: [], eggs: [] }),
    pn = () => [...x.mons, ...ja().mons.map((d) => d.mon), ...$()],
    dn = () => [x.tradeOut?.mon, x.tradeIn?.mon, ...(x.mktOut || []).map((d) => d.mon)].filter(Boolean),
    _n = () => !!qa.UNLOCK(x),
    as = (d) => (d === "slots" ? qa.SLOT_SHOP : qa.INCUBATOR_SHOP),
    Qn = (d) => (d === "slots" ? qa.SLOTS : qa.INCUBATOR);
  function os(d) {
    const i = ja(),
      w = d === "slots" ? i.mons.length : i.eggs.length;
    return Math.min(Qn(d), Math.max(i.open?.[d] ?? 1, w, 1));
  }
  const Ms = (d) => {
      const i = t.STORY.CHAPTERS[d[d.length - 1]],
        w = i?.steps.find((S) => S.kind === "gym" && S.champion);
      return (
        !!d.length && ((x.adv?.unlocked || 0) > Math.max(...d) || !!(w && x.adv?.badges?.includes(w.badge)))
      );
    },
    Cs = (d) => {
      const i = t.STORY.chaptersOf(d),
        w = i.filter((S) => t.STORY.CHAPTERS[S].league);
      return Ms(w.length ? w : i);
    },
    rs = (d) => Ms(t.STORY.chaptersOf(d));
  function Ps(d) {
    const i = os(d);
    if (i >= Qn(d)) return null;
    const w = as(d)[i - 1];
    return w && { ...w, ok: !w.done || Cs(w.done) };
  }
  function vs(d) {
    const i = Ps(d);
    if (!i || !i.ok) return { error: e("Pas encore disponible.") };
    if (x.money < i.price) return { error: e("Pas assez de ₽ !") };
    We(i.price, "pension");
    const w = ja(),
      S = os(d) + 1;
    return ((w.open = { ...w.open, [d]: S }), Ee(), { ok: !0 });
  }
  const ys = () => ja().mons.some((d) => d.mon.id === ga),
    Ts = (d) => !!d.noEgg || !!qa.NO_EGG?.includes(ze(d.id)),
    js = (d) => d.id !== ga && !Ts(d) && (ie(ze(d.id)) < 3 || qa.LAYS?.[d.id] != null),
    As = () => ja().mons.filter((d) => js(d.mon)),
    $s = (d) => qa.CANDY_MIN[ie(ze(d.id))] * 6e4,
    qs = () => {
      const d = As().length;
      return d ? qa.EGG_MIN[Math.min(d, qa.EGG_MIN.length) - 1] * 6e4 : 0;
    };
  function Xs() {
    const d = ja(),
      i = qs();
    return (
      i &&
      (d.eggGoal > 0 && d.eggGoal !== i && (d.egg = Math.min(((d.egg || 0) * i) / d.eggGoal, i)),
      (d.eggGoal = i),
      i)
    );
  }
  const Ds = (d) => qa.SHINY_RATE,
    Qs = [24348, 41597, 15337, 49222];
  function Us(d) {
    let i = 1779033703 ^ ((Qs[0] << 16) | Qs[1]),
      w = 3144134277 ^ ((Qs[2] << 16) | Qs[3]);
    for (let S = 0; S < d.length; S++) {
      const j = d.charCodeAt(S);
      ((i = Math.imul(i ^ j, 2654435761)), (w = Math.imul(w ^ j, 1597334677)));
    }
    return (
      (i = Math.imul(i ^ (i >>> 16), 2246822507) ^ Math.imul(w ^ (w >>> 13), 3266489909)),
      (w = Math.imul(w ^ (w >>> 16), 2246822507) ^ Math.imul(i ^ (i >>> 13), 3266489909)),
      (4294967296 * (2097151 & w) + (i >>> 0)) / 9007199254740992
    );
  }
  const Vn = () => `${x.trainer?.since ?? ""}:${x.trainer?.id ?? ""}`,
    kn = (d, i, w = 0) => Us(`${Vn()}|${d}|${i}|${w}`);
  function Un() {
    const d = ja();
    Number.isFinite(d.laid) ||
      (d.laid = (+x.stats?.hatched || 0) + (Array.isArray(d.eggs) ? d.eggs.length : 0));
    const i = d.laid++;
    return { k: i, uid: se(), roll: (w) => kn("egg", i, w + 1) };
  }
  function ps(d) {
    if ("shiny" in d) return !!d.shiny;
    const i = Ds(d.reg);
    return (
      (Number.isInteger(d.k) ? kn("egg", d.k) : Us(String(d.uid ?? d.laidAt))) <
      (d.sp ? Math.max(qa.SHINY_PARENT_RATE, i) : i)
    );
  }
  const Gn = (d, i = Ge()) => i >= d.hatchAt,
    ms = () => ja().mons.sort((d, i) => (i.mon.id === ga) - (d.mon.id === ga));
  function ws(d, i = 1 / 0) {
    const w = Dn(d);
    if (!w) return { error: e("Pokémon introuvable.") };
    if (x.team.includes(d)) return { error: e("Retire-le d'abord de l'équipe.") };
    if (Mn(d)) return { error: ks };
    Zs();
    const S = ln(w.id) ? ja().mons.findIndex((j) => ln(j.mon.id) === ln(w.id)) : -1;
    if (S < 0 && ja().mons.length >= os("slots")) return { error: e("La pension est pleine !") };
    if (((x.mons = x.mons.filter((j) => j.uid !== d)), S >= 0)) {
      const j = ja().mons[S].mon;
      return (Gs(j), (ja().mons[S] = { mon: w, candy: 0 }), ms(), Xs(), Ee(), { mon: w, out: j });
    }
    return (ja().mons.splice(i, 0, { mon: w, candy: 0 }), ms(), Xs(), Ee(), { mon: w });
  }
  function Bs(d, i) {
    const w = Dn(d),
      S = ja(),
      j = S.mons.findIndex((n) => n.mon.uid === i);
    if (!w || j < 0) return { error: e("Pokémon introuvable.") };
    if (x.team.includes(d)) return { error: e("Retire-le d'abord de l'équipe.") };
    if (Mn(d)) return { error: ks };
    const me = ln(w.id) ? S.mons.findIndex((n) => ln(n.mon.id) === ln(w.id)) : -1;
    if (me >= 0 && me !== j) return ws(d);
    Zs();
    const o = S.mons[j].mon;
    return (
      (x.mons = x.mons.filter((n) => n.uid !== d)),
      Gs(o),
      (S.mons[j] = { mon: w, candy: 0 }),
      ms(),
      Xs(),
      Ee(),
      { mon: w, out: o }
    );
  }
  function Rs(d, i) {
    const w = ja().mons,
      S = w.findIndex((j) => j.mon.uid === d);
    S < 0 || (w.splice(i, 0, ...w.splice(S, 1)), ms(), Ee());
  }
  const Gs = (d) => x.mons.push(d);
  function Os(d) {
    const i = ja().mons.find((w) => w.mon.uid === d);
    return i
      ? us()
        ? { error: e("Le PC est plein !") }
        : (Zs(), (ja().mons = ja().mons.filter((w) => w !== i)), Gs(i.mon), Xs(), Ee(), { mon: i.mon })
      : { error: e("Pokémon introuvable.") };
  }
  const Es = (d) => (
    (d = t.FORMS?.baseOf(d) ?? d),
    t.STORY.REGIONS.some((i) => i.open && i.dex && d >= i.dex[0] && d <= i.dex[1])
  );
  function bs(d) {
    for (d = t.FORMS?.baseOf(d) ?? d; H[d] && Es(H[d].from);) d = H[d].from;
    return d;
  }
  function zs(d, i = Ge()) {
    const w = Un(),
      S = d[Math.floor(w.roll(0) * d.length)].mon,
      j = qa.LAYS?.[S.id] ?? t.FORMS?.eggOf?.(S.id) ?? bs(S.id);
    return {
      uid: w.uid,
      k: w.k,
      id: j,
      reg: Kn(S),
      ...(S.shiny ? { sp: 1 } : {}),
      laidAt: i,
      hatchAt: i + qa.HATCH_MIN * 6e4,
    };
  }
  const lo = 5 * 6e4;
  function Zs(d = Ge()) {
    Je || (d = Ge());
    const i = ja(),
      w = [];
    if ((t.Clock?.sure && i.tick > d + lo && (i.tick = d), t.Clock?.sure))
      for (const n of Array.isArray(i.eggs) ? i.eggs : []) {
        const s = (n.laidAt || 0) - d;
        s > lo && ((n.laidAt -= s), n.hatchAt && (n.hatchAt -= s));
      }
    const S = Math.max(0, d - (i.tick || d)),
      j = Math.min(S, a.PENSION.OFFLINE_MS);
    if (((i.tick = Math.max(i.tick || d, d)), !S || !i.mons.length || !_n())) return w;
    const me = ys();
    for (const n of i.mons)
      if (n.mon.id !== ga) {
        const s = $s(n.mon);
        n.candy += j;
        const l = Math.floor(n.candy / s);
        if (l) {
          n.candy -= l * s;
          const c = l * (n.mon.shiny ? qa.SHINY_CANDY_MULT : 1);
          w.push({ type: "candy", id: n.mon.id, n: c, ...Jn(ze(n.mon.id), c, Ue(n.mon.reg)) });
        }
      }
    const o = Xs();
    if (!me || !o) return w;
    for (i.egg = (i.egg || 0) + S; i.egg >= o && i.eggs.length < os("eggs");) {
      i.egg -= o;
      const n = zs(As(), d - Math.min(i.egg, S));
      (i.eggs.push(n), w.push({ type: "egg", egg: n }));
    }
    return ((i.egg = Math.min(i.egg, o)), w);
  }
  function to(d, i = Ge()) {
    Je || (i = Ge());
    const w = qa.BERRIES[d];
    if (!w || Pe(d) <= 0 || !_n() || !ja().mons.length) return null;
    (Zs(i), Mt(d, -1));
    const S = ja(),
      j = qs(),
      me = ys() && j > 0 && S.eggs.length < os("eggs"),
      o = me ? Math.min(w.minutes * 6e4, Math.max(0, j - (S.egg || 0))) : 0,
      n = [];
    if (me && ((S.egg = (S.egg || 0) + o), S.egg >= j)) {
      S.egg -= j;
      const s = zs(As(), i);
      (S.eggs.push(s), n.push(s));
    }
    return { key: d, gained: o, eggs: n, ditto: ys(), full: S.eggs.length >= os("eggs") };
  }
  let co = null;
  const uo = (d) =>
    (co ||= new Set(
      t.STORY.CHAPTERS.flatMap((i) => i.steps).flatMap((i) =>
        i.kind === "egg"
          ? [].concat(i.id)
          : Object.keys(i.loot || {})
              .filter((w) => w.startsWith("egg:"))
              .map((w) => +w.slice(4)),
      ),
    )).has(+d);
  function Ys(d) {
    const i = d
      ? t.STORY.CHAPTERS.findIndex((w) => w.steps.some((S) => S.kind === "egg" && S.name === d))
      : -1;
    return i < 0 ? null : t.STORY.regionOf(i)?.key || null;
  }
  function Ws(d, i = Ge(), w = null) {
    if (!Je && ((i = Ge()), ![].concat(d).every(uo))) return null;
    const S = ja();
    if (S.eggs.length >= os("eggs")) return null;
    const j = Un();
    Array.isArray(d) && (d = d[Math.floor(j.roll(0) * d.length)]);
    const me = Ys(w),
      o = {
        uid: j.uid,
        k: j.k,
        id: d,
        laidAt: i,
        hatchAt: i + qa.HATCH_MIN * 6e4,
        ...(w ? { place: w } : {}),
        ...(me ? { reg: me } : {}),
      };
    return (S.eggs.push(o), Ee(), o);
  }
  function Ks(d) {
    const i = ja(),
      w = i.eggs.find((o) => o.uid === d);
    if (!w || !Gn(w)) return null;
    w.id = t.FORMS?.hatchForm(w.id) ?? w.id;
    const S = w.reg || Ys(w.place) || Sn(),
      j = ct(w.id, qa.EGG_LEVEL, { shiny: ps(w) });
    if (
      ((j.where = w.place || "Pension"),
      (j.egg = !0),
      w.uid && !x.mons.some((o) => o.uid === w.uid) && (j.uid = w.uid),
      !Va(j, S) && !Xn())
    )
      return { error: e("Le PC est plein !") };
    ((i.eggs = i.eggs.filter((o) => o !== w)), x.stats.hatched++, (j.hp = gt(j)));
    const me = Xa(j, { home: S, candies: qa.DUPLICATE_CANDIES });
    return (
      Ee(),
      me.dup ? { id: w.id, ...me.dup } : (j.shiny && (x.seenShiny[j.id] = !0), { mon: j, isNew: me.isNew })
    );
  }
  const Js = a.ONLINE_TRADE;
  function ao(d) {
    return !d || !x.mons.includes(d)
      ? e("Pokémon introuvable.")
      : b[d.id].unique
        ? e("Un Pokémon unique ne s'échange pas.")
        : b[d.id].legendary || b[d.id].mythical
          ? e("Les légendaires ne s'échangent pas.")
          : Ja(d.id)
            ? x.team.length === 1 && x.team[0] === d.uid
              ? e("Il te faut garder au moins un Pokémon dans l'équipe.")
              : Mn(d.uid)
                ? ks
                : null
            : e("Ce Pokémon ne peut pas être échangé.");
  }
  const po = (d) =>
    Math.round(Js.FEE[Math.min(2, ie(d.id))] * (Ln().economy || 1) * (d.shiny ? Js.SHINY_FEE : 1));
  function Ls(d) {
    const i = x.team.indexOf(d);
    return (
      (x.mons = x.mons.filter((w) => w.uid !== d)),
      i >= 0 && x.team.splice(i, 1),
      x.buddy?.uid === d && (x.buddy = { uid: null, ko: 0 }),
      i
    );
  }
  const hs = ["egg", "raid", "wild", "tower", "casino", "fossil", "gift", "npc"];
  function eo(d) {
    if (d.how) return d.how;
    if (d.egg) return "egg";
    const i = d.where;
    return typeof i != "string" || !i
      ? ""
      : i.startsWith("Raid · ")
        ? "raid"
        : i === "Tour de Combat"
          ? "tower"
          : i.startsWith("Casino ")
            ? "casino"
            : i === "Souterrains"
              ? "fossil"
              : "wild";
  }
  function r(d) {
    return d.orig && typeof d.orig == "object"
      ? { how: d.orig.how || "", where: d.orig.where || null, ot: d.orig.ot || null }
      : d.ot
        ? { how: "", where: null, ot: d.ot }
        : { how: eo(d), where: d.where || null, ot: null };
  }
  function G(d, i) {
    const w = (j, me) => (typeof j == "string" && j ? j.slice(0, me) : void 0),
      S = r(d);
    return {
      ot: w(S.ot, 40) || w(i, 40) || null,
      how: hs.includes(S.how) ? S.how : void 0,
      where: w(S.where, 60),
    };
  }
  function be(d, { traded: i, bought: w, back: S, slot: j = -1, from: me, level: o, reg: n } = {}) {
    const s = +d?.id;
    if (!b[s]) return null;
    let l = d,
      c = !1,
      p = null;
    if (i) {
      n = w ? Ia(s, n) : bn(s, n);
      const v = Math.max(1, Math.min(100, Math.round(+o || Js.LEVEL)));
      ((l = {
        uid: se(),
        id: s,
        level: v,
        xp: 0,
        caughtAt: Date.now(),
        shiny: !!d.shiny,
        ot: me || null,
        orig: G(d, me),
        reg: n || void 0,
        ...(d.noEgg ? { noEgg: !0 } : {}),
      }),
        w || (x.stats.trades++, an("trades", Ja(s))));
      const M =
        !w &&
        (t.EVOLUTIONS[s] || []).find(
          (ke) => ke.item === "link-cable" && !Ot({ ...l, reg: Hn(n || Sn()) }, ke.to),
        );
      M &&
        (Ha(s, l.shiny, n),
        l.shiny && (x.seenShiny[s] = !0),
        (l.id = M.to),
        x.stats.evolutions++,
        (p = { from: s, to: M.to }));
      const I = Xa(l, { home: n });
      if (I.dup) return (Ee(), { ...I.dup, evolved: p });
      ((c = I.isNew), l.shiny && (x.seenShiny[l.id] = !0));
    } else {
      if ((delete l.nature, (l.reg = Kn(l)), S && ot(l)))
        return (Ee(), { mon: l, duplicate: !0, ...Jn(ze(l.id), a.DUPLICATE_CANDIES, Ue(l.reg)) });
      (x.mons.push(l), x.team.length < a.TEAM_SIZE && !sa(x.team, l) && Bt(l) && x.team.push(l.uid));
    }
    const y = x.team.indexOf(l.uid);
    return (
      j >= 0 &&
        y >= 0 &&
        y !== j &&
        (x.team.splice(y, 1), x.team.splice(Math.min(j, x.team.length), 0, l.uid)),
      Ee(),
      { mon: l, isNew: c, evolved: p }
    );
  }
  function ot(d) {
    if (T(d.id)) return !1;
    const i = xn(d.reg, d.shiny).filter((w) => w.uid !== d.uid);
    return !fn(d.id, i) && fn(d.id, [...i, d]) > 0;
  }
  function $t(d, i, w, S) {
    if (!b[d]) return null;
    const j = [],
      me = (o, n) => {
        const s = o.findIndex((l) => n(l)?.uid === S);
        s >= 0 && j.push([o, s, o.splice(s, 1)[0]]);
      };
    S && (me(x.mons, (o) => o), me(ja().mons, (o) => o.mon));
    try {
      const o = bn(d, w),
        n = { uid: "trade-preview", id: d, level: 1, shiny: !!i, reg: Hn(o || Sn()) },
        s = (t.EVOLUTIONS[d] || []).find((l) => l.item === "link-cable" && !Ot(n, l.to));
      return (s && (n.id = s.to), { id: n.id, dup: Va(n) });
    } finally {
      for (const [o, n, s] of j.reverse()) o.splice(n, 0, s);
    }
  }
  function Wt(d) {
    const i = Dn(d);
    return !i ||
      x.team.includes(d) ||
      !x.mons.includes(i) ||
      Mn(d) ||
      b[i.id].unique ||
      b[i.id].legendary ||
      b[i.id].mythical
      ? !1
      : ((x.mons = x.mons.filter((w) => w.uid !== d)), Ee(), !0);
  }
  t.Game = {
    get S() {
      return x;
    },
    get savedAt() {
      return ce;
    },
    DEX: b,
    PREVO: H,
    FAMILY_LINKS: ue,
    rand: vt,
    pick: B,
    uid: se,
    session: { play: 0, away: 0 },
    load: X,
    save: Ee,
    reset: et,
    sandbox: yt,
    inSandbox: fe,
    freshState: Ze,
    underMons: $,
    tradingMons: dn,
    pruneSets: dt,
    depart: Bn,
    departureTo: wn,
    reconnect: g,
    enterRegion: ia,
    sideOf: Ce,
    walletMoney: Xe,
    withWallet: Ve,
    handBalls: da,
    onSide: Bt,
    bagOk: la,
    sideMons: st,
    allMons: F,
    regionDone: Cs,
    regionCleared: rs,
    tierOf: U,
    tierIndex: ie,
    isLegend: T,
    minLevelFor: Ne,
    rollCommonSpecies: te,
    speciesPool: R,
    maxDexId: L,
    completedRegions: Vt,
    regionDexIds: kt,
    shinyDone: Xt,
    shinyRate: Ht,
    levelCap: Ye,
    capFor: bt,
    capped: Gt,
    baseXp: K,
    levelXp: z,
    xpForNext: lt,
    makeMon: ct,
    lvl: wt,
    rankOf: V,
    statsOf: ge,
    maxHp: gt,
    curHp: Dt,
    learnOf: xt,
    mainMove: Y,
    bestMoveAgainst: ye,
    moveAcc: jt,
    nextMoveUnlock: nt,
    movePower: ha,
    hitPowers: _t,
    minPower: Ea,
    powerLabel: ut,
    levelEvolution: Qe,
    levelEvolutions: rt,
    itemEvolutions: Ft,
    evoBlocked: Ot,
    gainXp: N,
    levelUp: W,
    setAway: wa,
    holdSave: At,
    stopSaving: Oe,
    evolveMon: On,
    plateChoices: Aa,
    givePlate: _a,
    arceusForms: Ka,
    registerDex: Ha,
    owns: Ua,
    ownsHere: sn,
    caughtHere: Be,
    inDex: ht,
    dexState: ea,
    candyFamily: ze,
    famHead: bs,
    reached: Es,
    candyXp: qt,
    isDup: Va,
    familyOf: vn,
    famIds: on,
    familyBelow: An,
    familyKids: Ba,
    famFree: ts,
    famPool: xn,
    fitsFamily: is,
    unplaced: fn,
    keepOn: Yn,
    setKeep: Zn,
    takeLoadMerges: Z,
    takeLoadCapsules: de,
    takeLoadAurora: Re,
    regOf: Kn,
    homeKey: Hn,
    homeHere: Sn,
    groupOf: ns,
    collection: Ue,
    can: Da,
    receive: Xa,
    feedFamily: Jn,
    buddyMon: Lt,
    buddyGoal: zt,
    setBuddy: ca,
    buddyKo: Ma,
    pcMons: Ra,
    teamMons: ss,
    eventTeam: Ca,
    zoneTeam: mn,
    keepOne: oa,
    holdsOne: sa,
    singleOf: ln,
    beingOf: In,
    speciesOf: xe,
    oneSpecies: Et,
    activeTeam: cn,
    plannedTeam: yn,
    roadPending: Tn,
    roadLast: Mn,
    storageFull: us,
    hasRoom: Xn,
    getMon: Dn,
    sellValue: E,
    healTeam: q,
    earn: je,
    moneyIn: pt,
    behindMoney: Pn,
    spend: We,
    unspend: oe,
    moneyHeld: P,
    stampMoney: ve,
    coinIn: it,
    coinOut: De,
    coinsHeld: u,
    itemsHeld: le,
    itemCount: Pe,
    keyHeld: at,
    addItem: Mt,
    buff: en,
    buffMult: rn,
    activeBuffs: hn,
    useBuffBerry: Fn,
    setClock: xa,
    now: La,
    time: Ge,
    buy: ma,
    sell: Fa,
    sellPrice: $a,
    useItem: fa,
    shopPrice: Le,
    shopUnlocked: Nt,
    shopBadges: Pt,
    shopStones: Qt,
    expCandyXp: Ie,
    regionBadges: k,
    currentRegion: Ln,
    shopRegion: jn,
    regionOfDex: Ja,
    nativeHome: Ia,
    tradeHome: bn,
    tradePreview: $t,
    onSideWild: En,
    tally: an,
    tradeBlock: ao,
    tradeFee: po,
    takeOutMon: Ls,
    putInMon: be,
    originOf: r,
    pension: ja,
    ownedMons: pn,
    pensionUnlocked: _n,
    penOpen: os,
    penOffer: Ps,
    buyPenSlot: vs,
    pensionHasDitto: ys,
    canLay: js,
    noEgg: Ts,
    pensionLayers: As,
    pensionCandyGoal: $s,
    pensionEggGoal: qs,
    pensionShinyRate: Ds,
    eggReady: Gn,
    toPension: ws,
    fromPension: Os,
    swapPension: Bs,
    reorderPension: Rs,
    pensionTick: Zs,
    usePensionBerry: to,
    hatchEgg: Ks,
    giftEgg: Ws,
    fixedRoll: kn,
    DITTO: ga,
    releaseMon: Wt,
  };
})();
