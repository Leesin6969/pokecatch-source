/**
 * forms
 *
 * Public API on the game namespace `t`: t.FORMS
 *
 * Recovered from the shipped bundle — original chunk #16 at byte 438840 (4102 bytes, sha256:1b9fcc82e2de1f35).
 * This file is one original source file; the build concatenates them in filename order.
 */
t.FORMS = (function () {
  const b = [
    {
      id: 35101,
      base: 351,
      slug: "castform-sunny",
      form: "Forme Solaire",
      types: ["fire"],
      weather: ["sun"],
    },
    {
      id: 35102,
      base: 351,
      slug: "castform-rainy",
      form: "Forme Eau de Pluie",
      types: ["water"],
      weather: ["rain", "storm"],
    },
    {
      id: 35103,
      base: 351,
      slug: "castform-snowy",
      form: "Forme Blizzard",
      types: ["ice"],
      weather: ["snow"],
    },
    {
      id: 38601,
      base: 386,
      slug: "deoxys-attack",
      form: "Forme Attaque",
      types: ["psychic"],
      single: !0,
      stats: { hp: 50, atk: 180, def: 20, spa: 180, spd: 20, spe: 150 },
    },
    {
      id: 38602,
      base: 386,
      slug: "deoxys-defense",
      form: "Forme Défense",
      types: ["psychic"],
      single: !0,
      stats: { hp: 50, atk: 70, def: 160, spa: 70, spd: 160, spe: 90 },
    },
    {
      id: 38603,
      base: 386,
      slug: "deoxys-speed",
      form: "Forme Vitesse",
      types: ["psychic"],
      single: !0,
      stats: { hp: 50, atk: 95, def: 90, spa: 95, spd: 90, spe: 180 },
    },
    {
      id: 41201,
      base: 412,
      slug: "burmy-sandy",
      form: "Cape Sable",
      types: ["bug"],
      egg: 41201,
      evo: [
        { to: 41301, level: 20 },
        { to: 414, level: 20 },
      ],
    },
    {
      id: 41202,
      base: 412,
      slug: "burmy-trash",
      form: "Cape Déchet",
      types: ["bug"],
      egg: 41202,
      evo: [
        { to: 41302, level: 20 },
        { to: 414, level: 20 },
      ],
    },
    {
      id: 41301,
      base: 413,
      slug: "wormadam-sandy",
      form: "Cape Sable",
      types: ["bug", "ground"],
      egg: 41201,
      stats: { hp: 60, atk: 79, def: 105, spa: 59, spd: 85, spe: 36 },
    },
    {
      id: 41302,
      base: 413,
      slug: "wormadam-trash",
      form: "Cape Déchet",
      types: ["bug", "steel"],
      egg: 41202,
      stats: { hp: 60, atk: 69, def: 95, spa: 69, spd: 95, spe: 36 },
    },
    {
      id: 42201,
      base: 422,
      slug: "shellos-east",
      form: "Mer Orient",
      types: ["water"],
      evo: [{ to: 42301, level: 30 }],
    },
    { id: 42301, base: 423, slug: "gastrodon-east", form: "Mer Orient", types: ["water", "ground"] },
    ...[
      ["heat", "Chaleur", "fire", "overheat"],
      ["wash", "Lavage", "water", "hydro-pump"],
      ["frost", "Froid", "ice", "blizzard"],
      ["fan", "Hélice", "flying", "air-slash"],
      ["mow", "Tonte", "grass", "leaf-storm"],
    ].map(([P, u, ve, it], De) => ({
      id: 47901 + De,
      base: 479,
      slug: `rotom-${P}`,
      form: `Forme ${u}`,
      types: ["electric", ve],
      single: !0,
      move: it,
      stats: { hp: 50, atk: 65, def: 107, spa: 105, spd: 107, spe: 86 },
    })),
    {
      id: 48701,
      base: 487,
      slug: "giratina-origin",
      form: "Forme Originelle",
      types: ["ghost", "dragon"],
      single: !0,
      stats: { hp: 150, atk: 120, def: 100, spa: 120, spd: 100, spe: 90 },
    },
    {
      id: 49201,
      base: 492,
      slug: "shaymin-sky",
      form: "Forme Céleste",
      types: ["grass", "flying"],
      single: !0,
      move: "air-slash",
      stats: { hp: 100, atk: 103, def: 75, spa: 120, spd: 75, spe: 127 },
    },
    ...[
      ["fire", "Feu"],
      ["water", "Eau"],
      ["grass", "Plante"],
      ["electric", "Électrik"],
      ["ice", "Glace"],
      ["fighting", "Combat"],
      ["poison", "Poison"],
      ["ground", "Sol"],
      ["flying", "Vol"],
      ["psychic", "Psy"],
      ["bug", "Insecte"],
      ["rock", "Roche"],
      ["ghost", "Spectre"],
      ["dragon", "Dragon"],
      ["dark", "Ténèbres"],
      ["steel", "Acier"],
    ].map(([P, u], ve) => ({
      id: 49301 + ve,
      base: 493,
      slug: `arceus-${P}`,
      form: u,
      types: [P],
      single: !0,
      plate: P,
    })),
  ];
  for (const P of b) P.evo && (t.EVOLUTIONS[P.id] = P.evo);
  const f = new Set(b.filter((P) => P.single).map((P) => P.base)),
    ue = (P) => (P.plate ? t.TYPES[P.plate].fr : e(P.form)),
    H = (P) => t.POKEDEX.find((u) => u.id === P.base),
    vt = {};
  for (const P of b) {
    const u = H(P);
    vt[P.base] ??= u.name;
    const ve = {
      ...u,
      id: P.id,
      num: P.base,
      form: P.form,
      types: P.types,
      ...(P.stats ? { stats: P.stats, key: P.slug } : {}),
    };
    if (P.plate && t.MOVES.judgment) {
      const it = `judgment-${P.plate}`,
        De = t.MOVES.judgment;
      ((t.MOVES[it] = Object.defineProperty({ ...De, type: P.plate }, "name", {
        get() {
          return De.name;
        },
        set() {},
        enumerable: !0,
        configurable: !0,
      })),
        (ve.learn = u.learn.map(([je, pt]) => [je, pt === "judgment" ? it : pt])));
    }
    (P.move && t.MOVES[P.move] && (ve.learn = [...u.learn, [50, P.move]]),
      Object.defineProperty(ve, "name", {
        get() {
          return `${t.I18N_DATA?.[t.I18n?.lang]?.pokemon?.[P.base]?.[0] || vt[P.base]} (${ue(P)})`;
        },
        set() {},
        enumerable: !0,
        configurable: !0,
      }));
    for (const it of ["genus", "flavor"])
      Object.defineProperty(ve, it, {
        get() {
          return u[it];
        },
        set() {},
        enumerable: !0,
        configurable: !0,
      });
    (t.POKEDEX.push(ve), (t.BASE_EXP[P.id] = t.BASE_EXP[P.base]));
  }
  const B = b.map((P) => P.id),
    se = Object.fromEntries(b.map((P) => [P.id, P])),
    Ge = (P) => !!se[P],
    Je = (P) => se[P]?.base ?? P;
  function Ze(P) {
    const u = t.WEATHER?.current(t.WEATHER.parkNode?.());
    return b.find((ve) => ve.base === P && ve.weather?.includes(u))?.id ?? P;
  }
  return {
    LIST: b,
    ids: B,
    isForm: Ge,
    baseOf: Je,
    eggOf: (P) => se[P]?.egg ?? null,
    hatchForm: Ze,
    single: (P) => (f.has(Je(P)) ? Je(P) : null),
    formsOf: (P) => [P, ...b.filter((u) => u.base === P).map((u) => u.id)],
    plateForm: (P) => b.find((u) => u.plate === P)?.id ?? null,
    plateOf: (P) => se[P]?.plate ?? null,
    label: (P) => (se[P] ? ue(se[P]) : null),
    slugOf: (P) => se[P]?.slug,
  };
})();
