/**
 * roaming
 *
 * Public API on the game namespace `t`: t.Roaming
 *
 * Recovered from the shipped bundle — original chunk #40 at byte 886611 (2002 bytes, sha256:8c0998ef3bba457e).
 * This file is one original source file; the build concatenates them in filename order.
 */
t.Roaming = (function () {
  const a = () => t.CONFIG.ROAMING,
    b = () => t.STORY,
    f = () => t.Game,
    ue = () => (f().S.roam ||= { at: {}, caught: [] }),
    H = (le) => a().GROUPS.find((P) => P.ids.includes(le)),
    vt = (le) =>
      typeof le.unlock == "string" ? !!f()?.S?.adv?.badges?.includes(le.unlock) : !!f()?.S?.dex?.[le.unlock],
    B = () => a().GROUPS.some(vt),
    se = (le) => !!H(le) && vt(H(le)) && !ue().caught.includes(le),
    Ge = (le, P) =>
      le.indoor != null
        ? !le.indoor
        : !(t.DAYTIME?.indoorNode({ ...le, ch: P }) ?? /cave|gym/.test(le.bg || "")),
    Je = (le, P) => le.kind === "route" && le.wild > 0 && Ge(le, P),
    Ze = new Map();
  function x(le) {
    const P = f().S.adv;
    if (!P) return [];
    const u = `${le.join()}|${P.unlocked}|${le.map((De) => (b().regionUnlocked(De, P) ? 1 : 0)).join("")}`;
    if (Ze.has(u)) return Ze.get(u);
    const ve = (De, je) =>
        De <
        Math.min(
          ...b()
            .chaptersOf(je)
            .filter((pt) => b().CHAPTERS[pt].league),
        ),
      it = b()
        .CHAPTERS.map((De, je) => je)
        .filter((De) => {
          const je = b().CHAPTERS[De],
            pt = je.reg || "kanto";
          return (
            le.includes(pt) &&
            De <= P.unlocked &&
            b().regionUnlocked(pt, P) &&
            ve(De, pt) &&
            je.steps.some((re) => Je(re, De))
          );
        });
    return (Ze.set(u, it), it);
  }
  function $(le, P) {
    const u = ue(),
      ve = u.at[le]?.ch,
      it = Object.entries(u.at)
        .filter(([pt]) => +pt !== le)
        .map(([, pt]) => pt.ch),
      De = x(H(le).regions).filter((pt) => !it.includes(pt)),
      je = De.length > 1 ? De.filter((pt) => pt !== ve) : De;
    if (!je.length) {
      delete u.at[le];
      return;
    }
    u.at[le] = { ch: je[Math.floor(Math.random() * je.length)], until: P + a().STAY_MIN * 6e4 };
  }
  function X(le = f().time()) {
    if (!B() || !f().S.adv) return [];
    const P = ue(),
      u = [];
    for (const ve of a().GROUPS.filter(vt)) {
      const it = x(ve.regions);
      for (const De of ve.ids) {
        if ((u.push(De), P.caught.includes(De))) {
          delete P.at[De];
          continue;
        }
        const je = P.at[De];
        (!je || je.until <= le || !it.includes(je.ch)) && $(De, le);
      }
    }
    return u.filter((ve) => P.at[ve]).map((ve) => ({ id: ve, ...P.at[ve] }));
  }
  const Tt = (le) => X().find((P) => P.ch === le) || null;
  return {
    unlocked: B,
    free: se,
    update: X,
    here: Tt,
    at: (le) => Tt(le)?.id ?? null,
    weatherAt: (le) => ((P) => (P ? a().WEATHER[P.id] : null))(Tt(le)),
    level: () => Math.min(t.CONFIG.MAX_LEVEL, Math.max(a().MIN_LEVEL, ...f().S.mons.map((le) => le.level))),
    caught(le) {
      const P = ue();
      (P.caught.includes(le) || P.caught.push(le), delete P.at[le]);
    },
  };
})();
