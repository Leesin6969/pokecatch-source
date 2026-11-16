/**
 * candy run
 *
 * Public API on the game namespace `t`: t.CandyRun
 *
 * Recovered from the shipped bundle — original chunk #38 at byte 858336 (6730 bytes, sha256:3281e8a31f78bbf9).
 * This file is one original source file; the build concatenates them in filename order.
 */
t.CandyRun = (function () {
  const a = t.CONFIG,
    b = () => t.Game,
    f = () => a.CANDY_RUN,
    ue = "Fabrique de Bonbons",
    H = "hoenn-usine-combat-interieur",
    vt = [
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
    B = (ct) => {
      let wt = 2166136261;
      for (const ge of String(ct)) wt = Math.imul(wt ^ ge.charCodeAt(0), 16777619);
      return wt >>> 0;
    };
  function se(ct) {
    let wt = ct % 2147483647 || 1;
    return () => (wt = (wt * 16807) % 2147483647) / 2147483647;
  }
  const Ge = 3,
    Je = {
      1: { top: 196, rank: 200, every: 10, frames: [50, 100, 150] },
      2: { top: 113, rank: 115, every: 5, frames: [40, 65, 90] },
    },
    Ze = ["candy50", "candy100", "candy150"];
  function x(ct, wt) {
    if (ct > wt.top) return Math.ceil(f().CURVE.at(-1)[0] + ((ct - wt.top) * f().RANK_EVERY) / wt.every);
    const ge = ct <= 31 ? 10 + 2 * (ct - 1) : 70 + (30 * (ct - 31)) / (wt.top - 31),
      [[Fe, gt], [Dt, ha]] = f().CURVE;
    return ge < gt ? 0 : Math.floor(Fe + ((ge - gt) * (Dt - Fe)) / (ha - gt));
  }
  function $() {
    const ct =
      b().S.candy || (b().S.candy = { v: Ge, played: null, best: 0, total: {}, run: null, last: null });
    if (ct.v !== Ge && !ct.run) {
      const wt = Je[ct.v] || Je[1],
        ge = ct.best || 0;
      ((ct.kept = Object.fromEntries(Ze.filter((Fe, gt) => ge >= wt.frames[gt]).map((Fe) => [Fe, 1]))),
        (ct.best = x(ge, wt)),
        (ct.v = Ge));
    }
    return ct;
  }
  const X = (ct) => !!$().kept?.[ct],
    Tt = () => !!$().ignoreLock,
    le = () => !!b().S.adv?.badges?.includes(f().UNLOCK) || Tt();
  let P = null,
    u = null;
  const ve = () => typeof location > "u" || /^(localhost|127\.0\.0\.1|\[::1\])$/.test(location.hostname),
    it = () => t.Raids?.dateKey?.() ?? new Date(b().time()).toISOString().slice(0, 10);
  function De() {
    const ct = it();
    return P?.day === ct
      ? P
      : ve()
        ? (u?.day !== ct && (u = { day: ct, type: vt[Math.floor(Math.random() * vt.length)] }), u)
        : null;
  }
  let je = null,
    pt = 0;
  function re() {
    const ct = it();
    return P?.day === ct || je || !t.Cloud?.user || !t.Cloud.candy || Date.now() - pt < 3e5
      ? Promise.resolve(P)
      : ((je = t.Cloud.candy.day().then(
          (wt) => {
            je = null;
            const ge = wt?.data;
            return (
              ge?.day && vt.includes(ge.type)
                ? (P = { day: ge.day, type: ge.type, ...(ge.reset > 0 ? { reset: +ge.reset } : {}) })
                : (pt = Date.now()),
              P
            );
          },
          () => ((je = null), (pt = Date.now()), null),
        )),
        je);
  }
  const We = () => !!pt && Date.now() - pt < 3e5;
  function oe() {
    const ct = De(),
      wt = $().last;
    return !ct || $().played !== ct.day
      ? !1
      : !(ct.reset && !Ne() && wt?.day === ct.day && +wt.at < ct.reset);
  }
  function $e(ct) {
    const wt = f().CURVE;
    for (let ge = 1; ge < wt.length; ge++) {
      const [Fe, gt] = wt[ge - 1],
        [Dt, ha] = wt[ge];
      if (ct <= Dt) return gt + ((ha - gt) * (ct - Fe)) / (Dt - Fe);
    }
    return 100;
  }
  const Z = (ct) => Math.min(100, Math.floor($e(ct))),
    A = () => Math.ceil(f().CURVE.at(-1)[0]),
    J = () => t.CONFIG.UNDERGROUND.RANK_MAX,
    de = (ct) =>
      ct < f().RANK_FROM ? 0 : Math.min(J(), 1 + Math.floor((ct - f().RANK_FROM) / f().RANK_EVERY)),
    _e = (ct) => 1 + f().OVER_AFTER * Math.max(0, ct - (f().RANK_FROM + (J() - 1) * f().RANK_EVERY));
  function Re() {
    const ct = t.STORY.REGIONS.filter((wt) => wt.dex && b().regionDone?.(wt.key));
    return Math.max(151, ...ct.map((wt) => wt.dex[1]));
  }
  const dt = {},
    qe = [151, 251, 386, 493];
  function ce(ct, wt = Re()) {
    const ge = `${ct}|${wt}`;
    if (dt[ge]) return dt[ge];
    const Fe = (_t) => _t.id <= wt && !_t.legendary && !_t.mythical && !_t.baby && _t.types.includes(ct),
      gt = t.POKEDEX.filter((_t) => Fe(_t) && !(t.EVOLUTIONS[_t.id] || []).some((Ea) => Ea.to <= wt)),
      Dt = gt.length >= f().SIZE ? gt : t.POKEDEX.filter(Fe),
      ha = qe.find((_t) => _t > wt);
    return (dt[ge] = Dt.length || !ha ? Dt : ce(ct, ha));
  }
  function tt(ct, wt = Ne()) {
    const ge = wt?.day || De()?.day || "",
      Fe = wt?.type || De()?.type || "normal",
      gt = se(B(`candy|${ge}|${ct}`)),
      Dt = ce(Fe),
      ha = Z(ct),
      _t = Array.from({ length: f().SIZE }, () => [Dt[Math.floor(gt() * Dt.length)].id, ha]),
      Ea = [...t.STORY.TRAINER_CLASSES_HOENN, ...t.STORY.TRAINER_CLASSES_SINNOH],
      ut = Ea[Math.floor(gt() * Ea.length)];
    return { floor: ct, type: Fe, level: ha, rank: de(ct), statMult: _e(ct), cls: ut, team: _t };
  }
  function mt(ct) {
    if (ct % f().STEP === 0)
      return { type: "candy", name: ue, bg: "cave", indoor: !0, scene: H, tower: ct, candy: !0 };
    const wt = tt(ct);
    return {
      type: "trainer",
      name: ue,
      bg: "cave",
      indoor: !0,
      scene: H,
      tower: ct,
      candy: !0,
      theme: [wt.type],
      team: wt.team,
      rank: wt.rank,
      statMult: wt.statMult,
      trainer: t.STORY.trainerName(wt.cls),
      sprite: wt.cls.sprite,
    };
  }
  const Te = (ct) => ct >= f().SB_AT && (ct - f().SB_AT) % f().SB_EVERY === 0,
    At = (ct) => f().SIZES.find(([wt]) => ct < wt)[1];
  function yt(ct) {
    const wt = Math.min(99, Math.round($e(ct))),
      ge = At(wt),
      Fe = A(),
      gt = ct > f().CURVE[1][0] ? f().K2 : f().K,
      Dt = ct > Fe ? (1 + f().OVER_PAY) ** ((ct - Fe) / f().STEP) : 1;
    return [ge, Math.max(1, Math.round((gt * b().xpForNext(wt, {}) * Dt) / b().expCandyXp(ge)))];
  }
  const he = (ct) => ({ floor: ct, candy: yt(ct), sb: Te(ct) ? f().SB_N : 0 }),
    fe = () => b().S.link && "from",
    Oe = (ct) => ct?.got?.["rare-candy"] || 0,
    Ee = (ct) => Math.max(0, f().SB_DAY - Oe(ct));
  function et(ct, wt, ge, Fe) {
    if (!(ge > 0)) return;
    (b().withWallet(fe(), () => b().addItem(wt, ge)), (ct.got[wt] = (ct.got[wt] || 0) + ge));
    const gt = $().total;
    ((gt[wt] = (gt[wt] || 0) + ge), Fe && (Fe[wt] = (Fe[wt] || 0) + ge));
  }
  function _(ct, wt, ge, Fe = !1) {
    const [gt, Dt] = yt(wt);
    if ((Fe || et(ct, gt, Dt, ge), !Te(wt))) return;
    const ha = Math.min(f().SB_N, Ee(ct));
    (ha > 0 && et(ct, "rare-candy", ha, ge), ha < f().SB_N && (et(ct, gt, Dt, ge), ge && (ge.max = !0)));
  }
  const we = "candy",
    ie = (ct) => !!ct && b().groupOf(ct.reg) !== "to",
    U = () => b().teamMons(b().eventTeam(we)).filter(ie).slice(0, f().TEAM),
    Ne = () => $().run;
  let T = null;
  const L = () => T || (T = new Map((Ne()?.mons || []).map((ct) => [ct.uid, ct]))),
    R = (ct) => (ct === 1 ? 0 : ct - 1 + f().SKIP_PAY),
    te = () => f().STARTS.filter((ct) => ($().best || 0) >= R(ct));
  function K() {
    return le()
      ? Ne()
        ? "running"
        : De()
          ? oe()
            ? "played"
            : U().length
              ? null
              : "team"
          : "day"
      : "locked";
  }
  function He(ct = 1) {
    if (K()) return null;
    te().includes(ct) || (ct = 1);
    const wt = De(),
      ge = U().map((Fe) => ({
        uid: "c:" + Fe.uid,
        src: Fe.uid,
        id: Fe.id,
        level: Math.min(Fe.level, 100),
        xp: 0,
        shiny: !!Fe.shiny,
        ...(Fe.rank ? { rank: Fe.rank } : {}),
      }));
    return (
      ($().run = {
        day: wt.day,
        type: wt.type,
        from: ct,
        floor: ct,
        ms: 0,
        at: b().time(),
        mons: ge,
        got: {},
        skipPaid: ct === 1,
      }),
      ($().played = wt.day),
      (T = null),
      $().run
    );
  }
  const m = () => Ne(),
    z = (ct) => L().get(ct) || null,
    pe = () => (Ne()?.mons || []).filter((ct) => b().curHp(ct) > 0),
    V = () =>
      pe()
        .slice(0, f().TEAM)
        .map((ct) => ct.uid),
    lt = () => pe().length,
    kt = () => Ne()?.mons.length || 0,
    ra = (ct) => {
      const wt = Ne();
      wt && (wt.ms += ct);
    };
  function Vt() {
    const ct = Ne();
    if (!ct) return null;
    const wt = ct.floor,
      ge = {};
    if ((wt % f().STEP === 0 && _(ct, wt, ge), !ct.skipPaid && wt >= ct.from + f().SKIP_PAY - 1)) {
      ct.skipPaid = !0;
      for (let Dt = f().STEP; Dt < ct.from; Dt += f().STEP) Te(Dt) && _(ct, Dt, ge, !0);
    }
    const Fe = wt % f().CAMP === 0;
    if (Fe) for (const Dt of ct.mons) (delete Dt.hp, t.STATUS?.clear(Dt));
    const gt = wt > ($().best || 0);
    return (gt && ($().best = wt), ct.floor++, { floor: wt, record: gt, camp: Fe, got: ge });
  }
  function Xt() {
    const ct = Ne();
    return ct
      ? (($().last = {
          day: ct.day,
          type: ct.type,
          from: ct.from,
          floor: ct.floor - 1,
          ms: Math.round(ct.ms),
          at: ct.at,
          got: ct.got,
          team: ct.mons.map((wt) => wt.src),
        }),
        ($().run = null),
        (T = null),
        $().last)
      : null;
  }
  return {
    TYPES: vt,
    PLACE: ue,
    SCENE: H,
    TEAM_KEY: we,
    unlocked: le,
    ignoreLock: Tt,
    today: De,
    loadDay: re,
    dayFailed: We,
    playedToday: oe,
    isLocal: ve,
    dayKey: it,
    lvAt: $e,
    levelOf: Z,
    rankOf: de,
    statMultOf: _e,
    maxDex: Re,
    poolOf: ce,
    floorOf: tt,
    floorNode: mt,
    isSB: Te,
    candiesOf: yt,
    stepOf: he,
    sbToday: Oe,
    kept: X,
    starts: te,
    opensAt: R,
    why: K,
    picked: U,
    allowed: ie,
    newRun: He,
    run: Ne,
    resume: m,
    runMon: z,
    team: V,
    left: lt,
    fit: kt,
    addMs: ra,
    cleared: Vt,
    finish: Xt,
    best: () => $().best || 0,
    last: () => $().last,
    total: () => $().total,
    state: $,
  };
})();
