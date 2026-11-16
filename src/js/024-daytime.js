/**
 * daytime
 *
 * Public API on the game namespace `t`: t.DAYTIME
 *
 * Recovered from the shipped bundle — original chunk #23 at byte 469807 (2033 bytes, sha256:359fe941d61e443f).
 * This file is one original source file; the build concatenates them in filename order.
 */
t.DAYTIME = (function () {
  const a = [
    { key: "morning", from: 8, name: e("Matin"), icon: "🌅" },
    { key: "day", from: 10, name: e("Jour"), icon: "☀️" },
    { key: "night", from: 20, name: e("Nuit"), icon: "🌙" },
  ];
  let b = null;
  const f = (it = new Date(t.Clock?.now() ?? Date.now())) => {
      const De = it.getHours();
      return De >= a[2].from || De < a[0].from ? 2 : De >= a[1].from ? 1 : 0;
    },
    ue = () => {
      const it = t.Game?.S?.adv;
      return !!t.STORY?.CHAPTERS[it?.chapter]?.day && !(it.unlocked > it.chapter);
    },
    H = () => (b ? a.findIndex((it) => it.key === b) : ue() ? 1 : f()),
    vt = () => a[H()],
    B = (it) => !it || (it === "night") == (H() === 2),
    se = () => a[(H() + 1) % 3].from,
    Ge =
      /cave|tunnel|tower|mansion|silph|power-plant|well|ruins-of-alph-interior|ice-path|whirl|mortar|falls|dragons-den|seafoam|mt-moon|victory-road|-b?\d+f\b|underground|dojo|rocket-hq|house|lab|department|game-corner|pokemon-center|mt-silver-(?!outside)/,
    Je = (it) => Ge.test(it),
    Ze = /^(cave|gym|pokecenter)/,
    x = (it) => {
      if (!it) return !1;
      if (it.type === "heal" || it.kind === "heal" || it.bg === "pokecenter") return !0;
      if (typeof it.indoor == "boolean") return it.indoor;
      const De = t.SCENES?.resolve(it);
      return De
        ? De.indoor
        : it.type === "gift" ||
            it.kind === "gift" ||
            Ze.test(it.bg || "") ||
            !!(it.areas?.length && it.areas.every(Je));
    };
  function $(it, De, je, pt) {
    if (Je(pt)) return je ? Math.max(...je) : De;
    const re = H();
    if (je) return je[re];
    const We = t.CONFIG.TIME_WEIGHTS[it];
    return We ? De * We[re] : De;
  }
  let X = H();
  function Tt(it = !1) {
    const De = H();
    (De === X && !it) || ((X = De), t.dispatchEvent(new CustomEvent("daytime", { detail: a[De] })));
  }
  function le(it) {
    ((b = it), Tt(!0));
  }
  Ss(Tt, 3e4);
  const P = (it) => {
      const De = t.CONFIG.TIME_WEIGHTS[it];
      return De
        ? De[2] < Math.max(De[0], De[1])
        : t.CONFIG.CONDITIONAL_WILD.RULES.some(
            (je) =>
              je.when.every((pt) => pt === "morning" || pt === "day") && je.add?.some((pt) => pt[0] === it),
          );
    },
    u = {
      sunday: "Dimanche",
      monday: "Lundi",
      tuesday: "Mardi",
      wednesday: "Mercredi",
      thursday: "Jeudi",
      friday: "Vendredi",
      saturday: "Samedi",
    };
  return {
    PHASES: a,
    phase: vt,
    cond: (it) =>
      a.find((De) => De.key === it) ||
      t.CONFIG.WEATHER.TYPES[it] ||
      t.STORY.TIDES[it] || { icon: "📅", name: u[it] ? e(u[it]) : it },
    index: H,
    indexAt: f,
    matches: B,
    until: se,
    weight: $,
    diurnal: P,
    indoorArea: Je,
    indoorNode: x,
    force: le,
    get forced() {
      return b;
    },
  };
})();
