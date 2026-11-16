/**
 * tower
 *
 * Public API on the game namespace `t`: t.Tower
 *
 * Recovered from the shipped bundle — original chunk #37 at byte 846273 (12062 bytes, sha256:9fbd2e819ca47740).
 * This file is one original source file; the build concatenates them in filename order.
 */
t.Tower = (function () {
  const a = t.CONFIG,
    b = () => t.Game,
    f = () => a.TOWER,
    ue = [
      "normal",
      "fire",
      "water",
      "grass",
      "electric",
      "ice",
      "fighting",
      "poison",
      "ground",
      "flying",
      "psychic",
      "bug",
      "rock",
      "ghost",
      "dragon",
      "dark",
      "steel",
      "fairy",
    ],
    H = [
      { name: "Anabel", sprite: "anabel", scene: "hoenn-tour-combat-interieur" },
      { name: "Noland", sprite: "noland", scene: "hoenn-usine-combat-interieur" },
      { name: "Greta", sprite: "greta", scene: "hoenn-dojo-combat-interieur" },
      { name: "Tucker", sprite: "tucker", scene: "hoenn-dome-combat-interieur" },
      { name: "Lucy", sprite: "lucy", scene: "hoenn-reptile-combat-interieur" },
      { name: "Spenser", sprite: "spenser", scene: "hoenn-palace-combat-interieur" },
      { name: "Brandon", sprite: "brandon", scene: "hoenn-pyramide-combat-interieur" },
      { name: "Koner", sprite: "palmer", scene: "sinnoh-tour-combat" },
      { name: "Cardus", sprite: "thorton", scene: "sinnoh-usine-combat" },
      { name: "Dahlia", sprite: "dahlia", scene: "sinnoh-arcade-combat" },
      { name: "Parsley", sprite: "darach", scene: "sinnoh-castel-combat" },
      { name: "Célosia", sprite: "argenta", scene: "sinnoh-scene-combat" },
    ],
    vt = Date.parse("2026-10-19"),
    B = (ut) => H[((Math.round((Date.parse(ut) - vt) / 6048e5) % H.length) + H.length) % H.length],
    se = "hoenn-tour-combat-interieur",
    Ge = "Tour de Combat";
  function Je(ut = b().time()) {
    const jt = new Date(ut),
      xt = (jt.getUTCDay() + 6) % 7;
    return new Date(Date.UTC(jt.getUTCFullYear(), jt.getUTCMonth(), jt.getUTCDate() - xt))
      .toISOString()
      .slice(0, 10);
  }
  const Ze = (ut = b().time()) => Date.parse(Je(ut)) + 7 * 864e5,
    x = (ut) => {
      let jt = 2166136261;
      for (const xt of String(ut)) jt = Math.imul(jt ^ xt.charCodeAt(0), 16777619);
      return jt >>> 0;
    };
  function $(ut) {
    let jt = ut % 2147483647 || 1;
    return () => (jt = (jt * 16807) % 2147483647) / 2147483647;
  }
  const X = (ut, jt) => {
    const xt = [...ut];
    for (let D = xt.length - 1; D > 0; D--) {
      const Q = Math.floor(jt() * (D + 1));
      [xt[D], xt[Q]] = [xt[Q], xt[D]];
    }
    return xt;
  };
  function Tt(ut, jt = Je()) {
    const xt = f().THEME_FLOORS,
      D = ue.length / 2,
      Q = ut - 1,
      Y = Math.floor(Q / (xt * D)),
      ye = X(ue, $(x(`${jt}|${Y}`))),
      nt = Math.floor((Q % (xt * D)) / xt);
    return [ye[2 * nt], ye[2 * nt + 1]];
  }
  const le = (ut) => ut % f().BOSS_EVERY === 0,
    P = (ut) => f().BP_FLOOR + (le(ut) ? f().BP_BOSS : 0),
    u = (ut) => H[(ut / f().BOSS_EVERY - 1) % H.length];
  function ve(ut) {
    const jt = Math.floor(f().LEVEL_START + (ut - 1) * f().LEVEL_STEP);
    return Math.min(f().LEVEL_MAX, jt);
  }
  function it(ut) {
    const jt = Math.ceil((f().LEVEL_MAX - f().LEVEL_START) / f().LEVEL_STEP) + 1;
    let xt = Math.max(0, ut - jt),
      D = 1;
    const Q = Array.isArray(f().OVER) ? f().OVER : [[1 / 0, f().OVER]];
    for (const [Y, ye] of Q) {
      const nt = Math.min(xt, Y);
      if (((D += nt * ye), (xt -= nt), !xt)) break;
    }
    return D + xt * Q[Q.length - 1][1];
  }
  const De = (ut) => Object.values(ut.stats).reduce((jt, xt) => jt + xt, 0),
    je = {};
  function pt(ut) {
    const jt = ut.join("|");
    return (je[jt] ||= t.POKEDEX.filter(
      (xt) =>
        xt.id <= a.TOWER.MAX_DEX &&
        !xt.legendary &&
        !xt.mythical &&
        !xt.baby &&
        xt.types.some((D) => ut.includes(D)) &&
        !(t.EVOLUTIONS[xt.id] || []).some((D) => D.to <= a.TOWER.MAX_DEX),
    ));
  }
  function re(ut, jt = Je()) {
    const xt = $(x(`${jt}|floor|${ut}`)),
      D = Tt(ut, jt),
      Q = le(ut);
    let Y = pt(D);
    Q && (Y = [...Y].sort((Qe, Ft) => De(Ft) - De(Qe)).slice(0, f().BOSS_TOP));
    const ye = X(Y, xt).slice(0, f().SIZE),
      nt = Math.min(f().LEVEL_MAX, ve(ut) + (Q ? f().BOSS_LEVEL : 0)),
      Ot = [...t.STORY.TRAINER_CLASSES_HOENN, ...t.STORY.TRAINER_CLASSES_SINNOH],
      ee = Ot[Math.floor(xt() * Ot.length)],
      rt = Q ? u(ut) : null;
    return {
      floor: ut,
      theme: D,
      boss: Q,
      brain: rt,
      cls: ee,
      level: nt,
      statMult: it(ut) * (Q ? f().BOSS_MULT : 1),
      team: ye.map((Qe) => [Qe.id, nt]),
    };
  }
  function We(ut) {
    const jt = re(ut);
    return {
      type: "trainer",
      name: Ge,
      bg: "cave",
      indoor: !0,
      scene: jt.brain?.scene || se,
      tower: ut,
      boss: jt.boss,
      theme: jt.theme,
      team: jt.team,
      statMult: jt.statMult,
      trainer: jt.brain ? jt.brain.name : t.STORY.trainerName(jt.cls),
      sprite: jt.brain ? jt.brain.sprite : jt.cls.sprite,
    };
  }
  const oe = () => {
    const ut = b().S,
      jt = ut.tower || (ut.tower = { best: null, run: null });
    return (jt.bpSince || Z(jt), ("prev" in jt || "claimed" in jt) && $e(jt), jt);
  };
  function $e(ut) {
    ((ut.top = Math.max(ut.top || 0, ut.prev?.floor || 0)), delete ut.prev, delete ut.claimed);
    try {
      localStorage.removeItem("pokecatch-tower-boards");
    } catch {}
  }
  function Z(ut) {
    const jt = Math.max(0, Math.round(+ut.bp || 0));
    ((ut.bpSince = { at: Date.now(), bp: Number.isFinite(ut.bpSeen) ? Math.min(ut.bpSeen, jt) : jt }),
      (ut.bpIn = ut.bpOut = 0));
  }
  function A(ut) {
    if (((ut = Math.round(ut) || 0), ut > 0)) {
      const jt = oe();
      ((jt.bp = (jt.bp || 0) + ut), (jt.bpIn = (jt.bpIn || 0) + ut), (jt.bpSeen = jt.bp));
    }
    return ut;
  }
  function J(ut) {
    const jt = oe();
    return (
      (ut = Math.round(ut) || 0),
      ut <= 0 || (jt.bp || 0) < ut
        ? !1
        : ((jt.bp -= ut), (jt.bpOut = (jt.bpOut || 0) + ut), (jt.bpSeen = jt.bp), !0)
    );
  }
  const de = () => !!oe().ignoreLock,
    _e = () => !!b().regionDone("hoenn") || de(),
    Re = (ut) => {
      const jt = b().statsOf(ut);
      return jt.hp + jt.atk + jt.def + jt.spa + jt.spd + jt.spe;
    };
  function dt() {
    const ut = oe().run;
    return (
      ut &&
        ut.week !== Je() &&
        (ut.gift && (oe().gift = z(oe().gift, ut.gift)), (oe().run = null), (qe = null)),
      oe().run
    );
  }
  let qe = null;
  const ce = () => qe || (qe = new Map((dt()?.mons || []).map((ut) => [ut.uid, ut])));
  function tt(ut) {
    const jt = new Set();
    return ut.filter((xt) => {
      const D = b().singleOf(xt.id) || xt.id;
      return !jt.has(D) && jt.add(D);
    });
  }
  function mt() {
    const ut = [...b().allMons(), ...b().underMons()]
      .filter((jt) => b().groupOf(jt.reg) !== "to")
      .map((jt) => ({
        uid: "t:" + jt.uid,
        src: jt.uid,
        id: jt.id,
        level: Math.min(jt.level, f().LEVEL_MAX),
        xp: 0,
        shiny: !!jt.shiny,
        ...(jt.rank ? { rank: jt.rank } : {}),
      }));
    return (
      ut.sort((jt, xt) => Re(xt) - Re(jt)),
      (oe().run = { week: Je(), floor: 1, ms: 0, mons: tt(ut), log: [] }),
      (qe = null),
      oe().run
    );
  }
  function Te(ut, jt) {
    const xt = new Set(ut.log.flatMap((ye) => ye.ko)),
      D = [],
      Q = [],
      Y = [];
    for (const ye of ut.mons) {
      const nt = b().curHp(ye);
      (nt <= 0 ? xt.has(ye.src) || D.push(ye.src) : nt < b().maxHp(ye) && Q.push([ye.src, nt]),
        ye.dr && Y.push([ye.src, ye.dr]));
    }
    return { f: jt, ms: Math.round(ut.ms), ko: D, hp: Q, dr: Y };
  }
  const At = () => dt() || mt(),
    yt = (ut) => ce().get(ut) || null,
    he = (ut, jt) => f().MARGIN == null || ut.level >= ve(jt) - f().MARGIN,
    fe = () => {
      const ut = dt();
      return tt(ut?.mons || []).filter((jt) => he(jt, ut.floor));
    },
    Oe = () =>
      fe()
        .filter((ut) => b().curHp(ut) > 0)
        .slice(0, a.TEAM_SIZE)
        .map((ut) => ut.uid),
    Ee = () => fe().filter((ut) => b().curHp(ut) > 0).length,
    et = () => fe().length,
    _ = (ut) => {
      const jt = dt();
      jt && (jt.ms += ut);
    };
  function we() {
    const ut = dt();
    if (!ut) return null;
    const jt = ut.floor,
      xt = oe().best?.week === ut.week ? oe().best : null,
      D = !xt || jt > xt.floor || (jt === xt.floor && ut.ms < xt.ms),
      Q = jt > (xt?.floor || 0) ? P(jt) : 0;
    Q && A(Q);
    const Y = m(ut.week, jt);
    (Y && (ut.gift = z(ut.gift, Y)),
      (oe().top = Math.max(oe().top || oe().best?.floor || 0, jt)),
      jt % 10 === 0 &&
        jt > (xt?.floor || 0) &&
        t.News?.share({ k: "tower", key: `${ut.week}:${jt}`, n: jt }));
    const ye = ut.log || (ut.log = []);
    return (
      jt % f().LOG_EVERY === 0 && ye.push(Te(ut, jt)),
      D &&
        ((oe().best = { week: ut.week, floor: jt, ms: ut.ms }),
        (oe().queue = {
          week: ut.week,
          floor: jt,
          ms: Math.round(ut.ms),
          mons: tt(ut.mons)
            .slice(0, a.TEAM_SIZE)
            .map((nt) => ({
              id: nt.id,
              level: nt.level,
              shiny: !!nt.shiny,
              ...(nt.rank ? { rank: nt.rank } : {}),
            })),
          log: jt % f().LOG_EVERY === 0 ? [...ye] : [...ye, Te(ut, jt)],
        })),
      ut.floor++,
      { floor: jt, record: D, bp: Q, step: Y ? Y.items : null }
    );
  }
  let ie = !1;
  async function U() {
    const ut = oe().queue;
    if (!ut || ie || !t.Cloud?.user) return;
    ie = !0;
    const jt = await t.Cloud.tower.submit(ut);
    ((ie = !1),
      !(jt.error || (!jt.data?.ok && jt.data?.error !== "bad_entry")) &&
        oe().queue === ut &&
        ((oe().queue = null), b().save({ idle: !0 })));
  }
  const Ne = () => a.TOWER.STEPS,
    T = (ut) => ut >= Ne().from,
    L = () => Je(b().time() - 7 * 864e5),
    R = (ut) => ({
      floor: ut,
      bp: Ne().BP * Math.round(ut / Ne().EVERY),
      egg: ut === Ne().EGG,
      frame: ut === Ne().FRAME ? "tower" : ut === Ne().GOLD ? "towerElite" : null,
      look: ut === a.TOWER.LOOK_FLOOR,
    });
  function te(ut) {
    const jt = [];
    for (let xt = Ne().EVERY; xt <= ut; xt += Ne().EVERY) jt.push(R(xt));
    return jt;
  }
  const K = (ut) =>
      ut.length
        ? {
            bp: ut.reduce((jt, xt) => jt + xt.bp, 0),
            egg: ut.some((jt) => jt.egg),
            frames: ut.map((jt) => jt.frame).filter(Boolean),
            look: ut.some((jt) => jt.look),
          }
        : null,
    He = (ut) => K(te(ut || 0));
  function m(ut, jt) {
    if (!T(ut)) return null;
    const xt = oe().paid || (oe().paid = {}),
      D = xt[ut] || 0;
    if (!(jt > D)) return null;
    xt[ut] = jt;
    for (const ye of Object.keys(xt)) ye < L() && delete xt[ye];
    const Q = K(te(jt).filter((ye) => ye.floor > D)),
      Y = Q && ge(Q, { week: ut, floor: jt });
    return (Y && (Y.from = D), Y);
  }
  function z(ut, jt) {
    if (!ut || !jt) return ut || jt || null;
    const xt = ut.items.map((D) => ({ ...D }));
    for (const D of jt.items) {
      const Q = D.kind === "bp" && xt.find((Y) => Y.kind === "bp");
      Q ? (Q.n += D.n) : xt.push(D);
    }
    return {
      ...ut,
      ...jt,
      items: xt,
      floor: Math.max(ut.floor || 0, jt.floor || 0),
      ...(ut.from != null || jt.from != null ? { from: Math.min(ut.from ?? 1 / 0, jt.from ?? 1 / 0) } : {}),
      mon: jt.mon || ut.mon,
      isNew: !!(ut.isNew || jt.isNew),
    };
  }
  function pe() {
    const ut = _t(),
      jt = ut && m(ut.week, ut.floor);
    return (jt && ((oe().gift = z(oe().gift, jt)), b().save()), jt);
  }
  const V = 6e5;
  let lt = null,
    kt = !1;
  function ra(ut = Je()) {
    return kt || !t.Cloud?.user || (lt?.week === ut && Date.now() - lt.at < V)
      ? Promise.resolve()
      : ((kt = !0),
        t.Cloud.tower.friends(ut).then(
          (jt) => (
            (kt = !1),
            !jt || jt.error || !Array.isArray(jt.data)
              ? { error: jt?.error || "empty" }
              : ((lt = { week: ut, at: Date.now(), rows: jt.data }), { ok: !0 })
          ),
          () => ((kt = !1), { error: "network" }),
        ));
  }
  function Vt(ut = Je()) {
    if (Xt)
      return Xt.map((Q) => ({
        name: Q.team?.name,
        tag: Q.team?.tag,
        sprite: Q.team?.sprite,
        frame: Q.team?.frame,
        floor: Q.floor,
        me: !!Q.me,
      })).sort((Q, Y) => Y.floor - Q.floor);
    if (lt?.week !== ut) return null;
    const jt = b().S.trainer || {},
      xt = oe().best?.week === ut ? oe().best.floor : 0,
      D = lt.rows.filter((Q) => !Q.me).map((Q) => ({ ...Q }));
    return (
      xt && D.push({ me: !0, floor: xt, name: jt.name, tag: jt.tag, sprite: jt.sprite }),
      D.sort((Q, Y) => Y.floor - Q.floor)
    );
  }
  let Xt = null;
  function Ht(ut) {
    const jt = t.STORY,
      xt = Object.keys(b().S.dex || {})
        .map(Number)
        .filter((ye) => b().DEX[ye]),
      D = $(x("test|" + Je())),
      Q = (ye) => ye[Math.floor(D() * ye.length)],
      Y = Array.from({ length: ut }, (ye, nt) => {
        const Ot = Q(jt.TRAINER_CLASSES_HOENN),
          ee = Math.max(3, 52 - nt * 3 - Math.floor(D() * 3));
        return {
          floor: ee,
          ms: Math.round((ee * 40 + D() * 600) * 1e3),
          at: new Date(Date.now() - D() * 5 * 864e5).toISOString(),
          team: {
            uid: null,
            name: Q(Ot.f ? jt.TRAINER_NAMES_F : jt.TRAINER_NAMES),
            tag: String(Math.floor(D() * 9999)).padStart(4, "0"),
            sprite: Ot.sprite,
            frame: Q((t.Frames?.LIST || [{ id: "base" }]).map((rt) => rt.id)),
            mons: Array.from({ length: 6 }, () => ({
              id: Q(xt.length ? xt : [25]),
              level: 90 + Math.floor(D() * 11),
              shiny: D() < 0.15,
            })),
          },
        };
      });
    for (const ye of Y)
      ye.card = {
        trainer: {
          name: ye.team.name,
          tag: ye.team.tag,
          sprite: ye.team.sprite,
          since: Date.now() - 90 * 864e5,
        },
        team: ye.team.mons,
        dex: xt.filter(() => D() < 0.8),
        badges: b().S.adv?.badges || [],
        unlocked: b().S.adv?.unlocked || 0,
        stats: {
          playMs: Math.round(D() * 200) * 36e5,
          caught: 500 + Math.floor(D() * 3e3),
          wins: 2e3 + Math.floor(D() * 9e3),
        },
        owned: 100 + Math.floor(D() * 300),
        ownedShiny: Math.floor(D() * 20),
        top: ye.team.mons[0],
      };
    return Y;
  }
  function ct(ut = 16) {
    if (!ut) {
      Xt = null;
      return;
    }
    const jt = b().S.trainer || {},
      xt = Ht(ut),
      D = Math.min(11, ut - 1);
    ((xt[D] = {
      ...xt[D],
      me: !0,
      team: { ...xt[D].team, name: jt.name, tag: jt.tag, sprite: jt.sprite || "red" },
    }),
      (Xt = xt));
  }
  function wt() {
    const ut = t.STORY,
      jt = new Set(
        Object.values(t.EVOLUTIONS)
          .flat()
          .map((ye) => ye.to),
      ),
      xt = ut.REGIONS.filter((ye) => ye.dex && (ye.key === "kanto" || b().regionDone?.(ye.key))),
      D = t.POKEDEX.filter(
        (ye) =>
          b().DEX[ye.id] &&
          !ye.legendary &&
          !ye.mythical &&
          !jt.has(ye.id) &&
          xt.some((nt) => ye.id >= nt.dex[0] && ye.id <= nt.dex[1]),
      ).map((ye) => ye.id),
      Q = D.filter((ye) => !b().isDup({ id: ye, shiny: !0 }, b().nativeHome(ye, void 0))),
      Y = Q.length ? Q : D;
    return Y[Math.floor(Math.random() * Y.length)] || 25;
  }
  function ge(ut, { week: jt, floor: xt }) {
    const D = { week: jt, floor: xt, items: [], steps: !0 };
    ut.bp && (A(ut.bp), D.items.push({ kind: "bp", n: ut.bp }));
    for (const Q of ut.frames || []) {
      const Y = b().S.trainer;
      ((Y.frames = [...new Set([...(Y.frames || []), Q])]), D.items.push({ kind: "frame", frame: Q }));
    }
    if (ut.look) {
      const Q = b().S.trainer,
        Y = B(jt);
      (((Q.feats = Q.feats || {})[Y.sprite] = 1), D.items.push({ kind: "look", sprite: Y.sprite }));
    }
    if (ut.egg) {
      const Q = b().makeMon(wt(), a.PENSION.EGG_LEVEL, { shiny: !0 });
      ((Q.where = Ge), (Q.hp = b().maxHp(Q)));
      const Y = b().receive(Q, { home: b().nativeHome(Q.id, void 0) });
      ((D.isNew = !!Y.isNew),
        Y.dup
          ? D.items.push({ kind: "eggxp", id: Q.id, xp: t.UI?.fedXp?.(Y.dup.fed) || 0 })
          : ((D.mon = Q.uid), D.items.push({ kind: "egg" })));
    }
    return D;
  }
  const Fe = () => oe().gift || null,
    gt = () => {
      ((oe().gift = null), b().save());
    },
    Dt = (ut) => {
      const jt = He(ut);
      return jt && (oe().gift = z(oe().gift, ge(jt, { week: Je(), floor: ut })));
    };
  function ha() {
    const ut = dt();
    ((oe().run = null), (qe = null));
    const jt = ut ? ut.floor - 1 : 0;
    return (
      ut?.gift && (oe().gift = z(oe().gift, { ...ut.gift, run: { floor: jt, best: _t()?.floor || jt } })),
      { floor: jt, best: _t() }
    );
  }
  const _t = () => (oe().best?.week === Je() ? oe().best : null);
  return {
    TYPES: ue,
    BRAINS: H,
    PLACE: Ge,
    weekKey: Je,
    weekEnds: Ze,
    lookOf: B,
    themeOf: Tt,
    isBoss: le,
    brainOf: u,
    levelOf: ve,
    statMultOf: it,
    poolOf: pt,
    floorOf: re,
    floorNode: We,
    unlocked: _e,
    ignoreLock: de,
    flush: U,
    stepOf: R,
    steps: te,
    rewardOfFloor: He,
    loadFriends: ra,
    friendRows: Vt,
    bpOf: P,
    bpIn: A,
    bpOut: J,
    catchUp: pe,
    gift: Fe,
    giftSeen: gt,
    testGift: Dt,
    testBoard: ct,
    hasTestBoard: () => !!Xt,
    run: dt,
    resume: At,
    newRun: mt,
    runMon: yt,
    team: Oe,
    left: Ee,
    fit: et,
    addMs: _,
    cleared: we,
    finish: ha,
    best: _t,
    top: () => Math.max(oe().top || 0, oe().best?.floor || 0),
  };
})();
