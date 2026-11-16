/**
 * trainer card
 *
 * Public API on the game namespace `t`: t.TrainerCard
 *
 * Recovered from the shipped bundle — original chunk #81 at byte 2182922 (26104 bytes, sha256:5de6f449d23404bf).
 * This file is one original source file; the build concatenates them in filename order.
 */
(function () {
  const { $: a, $$: b, h: f, fmt: ue, esc: H, modal: vt, sprBox: B, fitScale: se, animSrc: Ge } = t.UI,
    Je = t.Game,
    Ze = t.STORY,
    x = [
      "red",
      "leaf",
      "ethan",
      "lyra",
      "youngster",
      "lass",
      "camper",
      "picnicker",
      "swimmer-f",
      "hiker",
      "beauty",
      "psychic-f",
      "acetrainer",
      "acetrainer-f",
      "blue",
      "oak",
      "pokemaniac",
      "fisherman",
      "scientist",
      "pokefan-f",
      "kimonogirl",
      "gentleman",
      "blackbelt",
      "giovanni",
      "rocketgrunt",
      "lance-hgss",
      "elm",
      "pokemaniac-hgss",
      "fisherman-hgss",
      "scientist-hgss",
      "pokefan-f-hgss",
      "kimonogirl-hgss",
      "gentleman-hgss",
      "blackbelt-hgss",
      "archer",
      "rocketgrunt-hgss",
      "brendan-rse",
      "may-rse",
      "steven-rse",
      "birch-rse",
      "pokemaniac-rse",
      "fisherman-rse",
      "scientist-rse",
      "pokefan-f-rse",
      "gentleman-rse",
      "blackbelt-rse",
      "aquagrunt",
      "ruinmaniac-rse",
      "parasollady-rse",
      "maxie-rse",
      "archie-rse",
      "wally-rse",
      "anabel",
      "lucas-dp",
      "dawn-dp",
      "cynthia-dp",
      "rowan-dp",
      "pokemaniac-dp",
      "swimmer-f-dp",
      "scientist-dp",
      "breeder-f-dp",
      "gentleman-dp",
      "blackbelt-dp",
      "galacticgrunt",
      "barry",
      "riley-dp",
      "fantina-dp",
      "aromalady",
      "mars",
      "cyrus",
      "charon",
      "looker-dp",
      "sailor-dp",
      "pokemonranger-dp",
      "ruinmaniac",
      "pokefan-dp",
      "noland",
      "greta",
      "tucker",
      "lucy",
      "spenser",
      "brandon",
      "palmer",
      "thorton",
      "dahlia",
      "darach",
      "argenta",
      "roark",
      "byron",
    ],
    $ = [
      ["anabel", "Anabel"],
      ["noland", "Noland"],
      ["greta", "Greta"],
      ["tucker", "Tucker"],
      ["lucy", "Lucy"],
      ["spenser", "Spenser"],
      ["brandon", "Brandon"],
      ["palmer", "Koner"],
      ["thorton", "Cardus"],
      ["dahlia", "Dahlia"],
      ["darach", "Parsley"],
      ["argenta", "Célosia"],
    ],
    X = (z, pe = () => !0) => {
      const [V, lt] = Ze.REGIONS.find((kt) => kt.key === z).dex;
      return t.POKEDEX.filter(
        (kt) => kt.id >= V && kt.id <= lt && !kt.legendary && !kt.mythical && pe(kt),
      ).map((kt) => kt.id);
    },
    Tt = (z) => {
      const [pe, V] = Ze.REGIONS.find((lt) => lt.key === z).dex;
      return t.POKEDEX.filter((lt) => lt.id >= pe && lt.id <= V && !lt.mythical).map((lt) => lt.id);
    },
    le = Date.parse("2026-10-25T15:30:00+02:00"),
    P = (z) => [...Tt(z), Ze.REGIONS.find((pe) => pe.key === z).mythical.id],
    u = (z, pe) => [z.filter((V) => Je.S.dex[V] && (Je.S.dex[V].firstAt || 0) < pe).length, z.length],
    ve = (z, pe) => Je.S.stats.byReg?.[z]?.[pe] || 0,
    it = (z) => Je.ownedMons().filter((pe) => pe.shiny && (!z || Je.regionOfDex(pe.id) === z)).length,
    De = (z) => Object.keys(Je.S.dex).filter((pe) => Je.DEX[pe] && z(Je.DEX[pe])).length,
    je =
      (...z) =>
      (pe) =>
        pe.types.some((V) => z.includes(V)),
    pt = (z) => oe(+(Je.S.adv?.badges || []).includes(z), 1),
    re = ["Roche", "Cascade", "Foudre", "Prisme", "Âme", "Marais", "Volcan", "Terre"],
    We = (z) => [z.filter((pe) => Je.S.dex[pe]).length, z.length],
    oe = (z, pe) => [Math.min(z || 0, pe), pe],
    $e = Date.parse("2026-10-16T00:00:00+02:00"),
    Z = {
      youngster: { hint: e("Remporte 10 combats."), prog: () => oe(Je.S.stats.wins, 10) },
      lass: { hint: e("Capture 10 Pokémon."), prog: () => oe(Je.S.stats.caught, 10) },
      camper: { hint: () => e("Obtiens le Badge {badge}.", { badge: e("Roche") }), prog: () => pt("Roche") },
      picnicker: {
        hint: () => e("Obtiens le Badge {badge}.", { badge: e("Cascade") }),
        prog: () => pt("Cascade"),
      },
      "swimmer-f": { hint: e("Capture 10 espèces de type Eau."), prog: () => oe(De(je("water")), 10) },
      hiker: {
        hint: e("Capture 10 espèces de type Roche ou Sol."),
        prog: () => oe(De(je("rock", "ground")), 10),
      },
      beauty: {
        hint: () => e("Obtiens le Badge {badge}.", { badge: e("Prisme") }),
        prog: () => pt("Prisme"),
      },
      "psychic-f": {
        hint: () => e("Obtiens le Badge {badge}.", { badge: e("Marais") }),
        prog: () => pt("Marais"),
      },
      acetrainer: {
        hint: e("Obtiens les 8 badges de Kanto."),
        prog: () => oe(re.filter((z) => (Je.S.adv?.badges || []).includes(z)).length, 8),
      },
      "acetrainer-f": { hint: e("Fais évoluer 30 Pokémon."), prog: () => oe(Je.S.stats.evolutions, 30) },
      ethan: { region: "johto", hint: (z) => e("Atteins la région de {reg} pour le débloquer.", { reg: z }) },
      lyra: { region: "johto", hint: (z) => e("Atteins la région de {reg} pour le débloquer.", { reg: z }) },
      blue: {
        hint: e("Bats Blue à la Ligue pour le débloquer."),
        prog: () => oe(+(Je.S.adv?.badges || []).includes("Maître"), 1),
      },
      oak: {
        hint: e("Capture tous les Pokémon de Kanto, légendaires et fabuleux compris."),
        prog: () => We(P("kanto")),
        was: () => {
          const z = u(X("kanto"), $e);
          return _e(z) ? z : u(Tt("kanto"), le);
        },
      },
      pokemaniac: {
        hint: e("Capture 500 Pokémon, doublons compris."),
        prog: () => oe(Je.S.stats.caught, 500),
      },
      fisherman: {
        hint: e("Capture tous les Pokémon de type Eau de Kanto."),
        prog: () => We(X("kanto", (z) => z.types.includes("water"))),
      },
      scientist: { hint: e("Ranime les trois fossiles de Kanto."), prog: () => We([138, 140, 142]) },
      "pokefan-f": { hint: e("Fais éclore 50 œufs."), prog: () => oe(Je.S.stats.hatched, 50) },
      kimonogirl: { hint: e("Obtiens Aquali, Voltali et Pyroli."), prog: () => We([134, 135, 136]) },
      gentleman: { hint: e("Réussis 20 échanges."), prog: () => oe(Je.S.stats.trades, 20) },
      blackbelt: { hint: e("Remporte 25 raids chromatiques."), prog: () => oe(Je.S.raids?.clears, 25) },
      giovanni: {
        hint: e("Bats Giovanni à Jadielle sans qu'aucun de tes Pokémon ne soit K.O."),
        prog: () => oe(+!!Je.S.trainer.feats?.giovanni, 1),
      },
      rocketgrunt: { hint: e("Possède 10 Pokémon chromatiques."), prog: () => oe(it(), 10) },
      "lance-hgss": {
        region: "johto",
        hint: (z) => e("Bats Peter à la Ligue de {reg}.", { reg: z }),
        prog: () => oe(+(Je.S.adv?.badges || []).includes("Maître Johto"), 1),
      },
      elm: {
        region: "johto",
        hint: (z) => e("Capture tous les Pokémon de {reg}, légendaires et fabuleux compris.", { reg: z }),
        prog: () => We(P("johto")),
        was: () => u(Tt("johto"), le),
      },
      "pokemaniac-hgss": {
        region: "johto",
        hint: (z) => e("Capture 500 Pokémon de {reg}, doublons compris.", { reg: z }),
        prog: () => oe(ve("johto", "caught"), 500),
      },
      "fisherman-hgss": {
        region: "johto",
        hint: (z) => e("Capture tous les Pokémon de type Eau de {reg}.", { reg: z }),
        prog: () => We(X("johto", (z) => z.types.includes("water"))),
      },
      "scientist-hgss": { region: "johto", hint: () => e("Obtiens Porygon2."), prog: () => We([233]) },
      "pokefan-f-hgss": {
        region: "johto",
        hint: (z) => e("Obtiens les 8 bébés Pokémon de {reg}.", { reg: z }),
        prog: () => We([172, 173, 174, 175, 236, 238, 239, 240]),
      },
      "kimonogirl-hgss": {
        region: "johto",
        hint: () => e("Obtiens Mentali et Noctali."),
        prog: () => We([196, 197]),
      },
      "gentleman-hgss": {
        region: "johto",
        hint: (z) => e("Reçois 20 Pokémon de {reg} par échange.", { reg: z }),
        prog: () => oe(ve("johto", "trades"), 20),
      },
      "blackbelt-hgss": {
        region: "johto",
        hint: (z) => e("Remporte 25 raids chromatiques de {reg}.", { reg: z }),
        prog: () => oe(ve("johto", "raids"), 25),
      },
      archer: {
        region: "johto",
        hint: (z) => e("Bats l'Admin Rocket de {reg} sans qu'aucun de tes Pokémon ne soit K.O.", { reg: z }),
        prog: () => oe(+!!Je.S.trainer.feats?.archer, 1),
      },
      "rocketgrunt-hgss": {
        region: "johto",
        hint: (z) => e("Possède 10 Pokémon chromatiques de {reg}.", { reg: z }),
        prog: () => oe(it("johto"), 10),
      },
      "brendan-rse": {
        region: "hoenn",
        hint: (z) => e("Atteins la région de {reg} pour le débloquer.", { reg: z }),
      },
      "may-rse": {
        region: "hoenn",
        hint: (z) => e("Atteins la région de {reg} pour le débloquer.", { reg: z }),
      },
      "steven-rse": {
        region: "hoenn",
        hint: (z) => e("Bats Pierre Rochard à la Ligue de {reg}.", { reg: z }),
        prog: () => oe(+(Je.S.adv?.badges || []).includes("Maître Hoenn"), 1),
      },
      "birch-rse": {
        region: "hoenn",
        hint: (z) => e("Capture tous les Pokémon de {reg}, légendaires et fabuleux compris.", { reg: z }),
        prog: () => We(P("hoenn")),
        was: () => u(Tt("hoenn"), le),
      },
      "pokemaniac-rse": {
        region: "hoenn",
        hint: (z) => e("Capture 500 Pokémon de {reg}, doublons compris.", { reg: z }),
        prog: () => oe(ve("hoenn", "caught"), 500),
      },
      "fisherman-rse": {
        region: "hoenn",
        hint: (z) => e("Capture tous les Pokémon de type Eau de {reg}.", { reg: z }),
        prog: () => We(X("hoenn", (z) => z.types.includes("water"))),
      },
      "scientist-rse": {
        region: "hoenn",
        hint: () => e("Obtiens Lilia et Anorith."),
        prog: () => We([345, 347]),
      },
      "pokefan-f-rse": {
        region: "hoenn",
        hint: () => e("Obtiens Azurill et Okéoké."),
        prog: () => We([298, 360]),
      },
      "gentleman-rse": {
        region: "hoenn",
        hint: (z) => e("Reçois 20 Pokémon de {reg} par échange.", { reg: z }),
        prog: () => oe(ve("hoenn", "trades"), 20),
      },
      "blackbelt-rse": {
        region: "hoenn",
        hint: (z) => e("Remporte 25 raids chromatiques de {reg}.", { reg: z }),
        prog: () => oe(ve("hoenn", "raids"), 25),
      },
      aquagrunt: {
        region: "hoenn",
        hint: (z) => e("Possède 10 Pokémon chromatiques de {reg}.", { reg: z }),
        prog: () => oe(it("hoenn"), 10),
      },
      "ruinmaniac-rse": {
        region: "hoenn",
        hint: () => e("Capture Regirock, Regice et Registeel."),
        prog: () => We([377, 378, 379]),
      },
      "parasollady-rse": { region: "hoenn", hint: () => e("Obtiens Milobellus."), prog: () => We([350]) },
      "maxie-rse": { region: "hoenn", hint: () => e("Capture Groudon."), prog: () => We([383]) },
      "archie-rse": { region: "hoenn", hint: () => e("Capture Kyogre."), prog: () => We([382]) },
      "wally-rse": {
        region: "hoenn",
        hint: () => e("Obtiens Tarsal, Kirlia et Gardevoir."),
        prog: () => We([280, 281, 282]),
      },
      "lucas-dp": {
        region: "sinnoh",
        hint: (z) => e("Atteins la région de {reg} pour le débloquer.", { reg: z }),
      },
      "dawn-dp": {
        region: "sinnoh",
        hint: (z) => e("Atteins la région de {reg} pour le débloquer.", { reg: z }),
      },
      "cynthia-dp": {
        region: "sinnoh",
        hint: (z) => e("Bats Cynthia à la Ligue de {reg}.", { reg: z }),
        prog: () => oe(+(Je.S.adv?.badges || []).includes("Maître Sinnoh"), 1),
      },
      "rowan-dp": {
        region: "sinnoh",
        hint: (z) => e("Capture tous les Pokémon de {reg}, légendaires et fabuleux compris.", { reg: z }),
        prog: () => We(P("sinnoh")),
      },
      "pokemaniac-dp": {
        region: "sinnoh",
        hint: (z) => e("Capture 500 Pokémon de {reg}, doublons compris.", { reg: z }),
        prog: () => oe(ve("sinnoh", "caught"), 500),
      },
      "swimmer-f-dp": {
        region: "sinnoh",
        hint: (z) => e("Capture tous les Pokémon de type Eau de {reg}.", { reg: z }),
        prog: () => We(X("sinnoh", (z) => z.types.includes("water"))),
      },
      "scientist-dp": {
        region: "sinnoh",
        hint: () => e("Obtiens Kranidos et Dinoclier."),
        prog: () => We([408, 410]),
      },
      "breeder-f-dp": {
        region: "sinnoh",
        hint: (z) => e("Obtiens les 7 bébés Pokémon de {reg}.", { reg: z }),
        prog: () => We([406, 433, 438, 439, 440, 446, 458]),
      },
      "gentleman-dp": {
        region: "sinnoh",
        hint: (z) => e("Reçois 20 Pokémon de {reg} par échange.", { reg: z }),
        prog: () => oe(ve("sinnoh", "trades"), 20),
      },
      "blackbelt-dp": {
        region: "sinnoh",
        hint: (z) => e("Remporte 25 raids chromatiques de {reg}.", { reg: z }),
        prog: () => oe(ve("sinnoh", "raids"), 25),
      },
      galacticgrunt: {
        region: "sinnoh",
        hint: (z) => e("Possède 10 Pokémon chromatiques de {reg}.", { reg: z }),
        prog: () => oe(it("sinnoh"), 10),
      },
      barry: {
        region: "sinnoh",
        hint: () => e("Bats Louka à la Route Victoire sans qu'aucun de tes Pokémon ne soit K.O."),
        prog: () => oe(+!!Je.S.trainer.feats?.barry, 1),
      },
      "riley-dp": {
        region: "sinnoh",
        hint: () => e("Obtiens Riolu et Lucario."),
        prog: () => We([447, 448]),
      },
      "fantina-dp": { region: "sinnoh", hint: () => e("Capture Spiritomb."), prog: () => We([442]) },
      aromalady: {
        region: "sinnoh",
        hint: () => e("Obtiens Goinfrex, Cheniti, Apitrini et Ceribou."),
        prog: () => We([446, 412, 415, 420]),
      },
      mars: {
        region: "sinnoh",
        hint: () => e("Capture Créhelf, Créfollet et Créfadet."),
        prog: () => We([480, 481, 482]),
      },
      cyrus: { region: "sinnoh", hint: () => e("Capture Dialga et Palkia."), prog: () => We([483, 484]) },
      charon: { region: "sinnoh", hint: () => e("Capture Heatran."), prog: () => We([485]) },
      "looker-dp": {
        region: "sinnoh",
        hint: () => e("Capture Giratina sous ses deux formes."),
        prog: () => We([487, 48701]),
      },
      "sailor-dp": {
        region: "sinnoh",
        hint: () => e("Capture Cresselia et Darkrai."),
        prog: () => We([488, 491]),
      },
      "pokemonranger-dp": {
        region: "sinnoh",
        hint: () => e("Obtiens Manaphy et Phione."),
        prog: () => We([490, 489]),
      },
      ruinmaniac: { region: "sinnoh", hint: () => e("Capture Regigigas."), prog: () => We([486]) },
      "pokefan-dp": {
        region: "sinnoh",
        hint: () => e("Obtiens les 6 formes de Motisma."),
        prog: () => We([479, 47901, 47902, 47903, 47904, 47905]),
      },
    };
  for (const z of (t.CONFIG.UNDERGROUND.MILESTONES || []).filter((pe) => pe.look))
    Z[z.look] = {
      region: "sinnoh",
      hint: () => e("Franchis l'étage {n} du Souterrain.", { n: z.floor }),
      prog: () => oe(t.Underground?.best() || 0, z.floor),
    };
  for (const [z, pe] of $)
    Z[z] = {
      region: "hoenn",
      hint: () =>
        e("Franchis l'étage {n} de la Tour de Combat la semaine de {name}.", {
          n: t.CONFIG.TOWER.LOOK_FLOOR,
          name: e(pe),
        }),
      prog: () => oe(+!!Je.S.trainer.feats?.[z], 1),
    };
  const A = 10,
    J = (z) => z === "kanto" || (Je.S.adv?.unlocked ?? 0) >= Ze.firstChapterOf(z),
    de = (z) => !!Z[z]?.region && !J(Z[z].region),
    _e = (z) => !!z && z[0] >= z[1],
    Re = (z) => {
      const pe = Z[z],
        V = Je.S.trainer;
      return !pe || V.looks?.[z]
        ? !1
        : de(z)
          ? !0
          : pe.prog
            ? !_e(pe.prog()) && !_e(pe.was?.())
              ? !0
              : (((V.looks = V.looks || {})[z] = !0), !1)
            : !1;
    },
    dt = (z) => {
      const pe = Z[z];
      return typeof pe.hint == "function"
        ? pe.hint(!pe.region || de(z) ? "???" : e(Ze.REGIONS.find((V) => V.key === pe.region).name))
        : pe.hint;
    };
  function qe() {
    const z = Je.S.trainer;
    Z[z.sprite] && !z.looks?.[z.sprite] && ((z.looks = z.looks || {})[z.sprite] = !0);
    const pe = x.filter((V) => Z[V] && !Re(V));
    return (
      z.looksSeen || (z.looksSeen = Object.fromEntries(pe.map((V) => [V, 1]))),
      pe.filter((V) => !z.looksSeen[V])
    );
  }
  const ce = '<span class="tc-new">NEW</span>',
    tt = () => Je.S.trainer,
    mt = { "kimonogirl-hgss": 1, "pokemaniac-hgss": 1, "rocketgrunt-hgss": 1 },
    Te = (z) => `assets/trainers/${z}.png${mt[z] ? "?v=1019" : ""}`,
    At = (z) => new Date(z).toLocaleDateString(t.I18n.lang),
    yt = (z) => {
      const pe = Math.floor(z / 6e4);
      return `${Math.floor(pe / 60)} h ${String(pe % 60).padStart(2, "0")}`;
    },
    he = (z) =>
      Math.max(
        Je.maxDexId(),
        ...Ze.REGIONS.filter((pe) => pe.dex && (pe.key === "kanto" || z >= Ze.firstChapterOf(pe.key))).map(
          (pe) => pe.dex[1],
        ),
      ),
    fe = () => he(Je.S.adv?.unlocked ?? 0);
  function Oe() {
    const z = a("#trainer-btn");
    if (!z) return;
    const pe = fe(),
      V = Object.keys(Je.S.dex).filter((ra) => +ra <= pe).length,
      lt = t.UI.trainerFace(tt().sprite, "side-av", !0);
    a(".side-av", z).sideFace !== lt && ((a(".side-av", z).outerHTML = lt), (a(".side-av", z).sideFace = lt));
    const kt = (ra, Vt) => {
      const Xt = a(ra, z);
      Xt.textContent !== Vt && (Xt.textContent = Vt);
    };
    (kt(".side-name", tt().name),
      kt(".side-tag", `#${tt().tag}`),
      kt(".side-dex", `${V} / ${pe}`),
      a(".tc-new", z) || z.insertAdjacentHTML("beforeend", ce),
      z.classList.toggle("has-new", qe().length > 0 || t.Frames.fresh().length > 0));
  }
  function Ee(z, pe) {
    const V = (lt) => lt === "kanto" || pe >= Ze.firstChapterOf(lt);
    return [
      ["kanto", "Kanto", Ze.BADGE_IMG],
      ["johto", "Johto", Ze.BADGE_IMG_JOHTO],
      ["hoenn", "Hoenn", Ze.BADGE_IMG_HOENN],
      ["sinnoh", "Sinnoh", Ze.BADGE_IMG_SINNOH],
    ]
      .map(([lt, kt, ra]) => ({ key: lt, label: kt, names: Object.keys(ra) }))
      .filter((lt) => lt.names.length && (V(lt.key) || lt.names.some((kt) => z.includes(kt))));
  }
  function et() {
    const z = Je.S,
      pe = Je.ownedMons(),
      V = Je.buddyMon();
    return {
      own: !0,
      name: tt().name,
      tag: tt().tag,
      sprite: tt().sprite,
      frame: t.Frames.mine(),
      since: tt().since,
      playMs: z.stats.playMs,
      buddy: V && { id: V.id, shiny: !!V.shiny },
      team: Je.teamMons(z.team),
      dex: Object.keys(z.dex).map(Number),
      seenShiny: Object.keys(z.seenShiny).length,
      badges: z.adv?.badges || [],
      unlocked: z.adv?.unlocked ?? 0,
      stats: z.stats,
      raids: { clears: z.raids?.clears || 0, tries: z.raids?.tries || 0 },
      owned: pe.length,
      ownedShiny: pe.filter((lt) => lt.shiny).length,
      shinySpecies: new Set(pe.filter((lt) => lt.shiny).map((lt) => lt.id)).size,
      top: pe.reduce((lt, kt) => (!lt || kt.level > lt.level ? kt : lt), null),
    };
  }
  function _(z, pe) {
    const V = z.trainer || {},
      lt = (kt) => kt && Je.DEX[kt.id];
    return {
      own: !1,
      name: V.name || pe?.name || "???",
      tag: V.tag || pe?.tag || "????",
      sprite: /^[\w-]+$/.test(V.sprite || "") ? V.sprite : "red",
      frame: t.Frames.valid(V.frame || pe?.frame),
      since: V.since,
      playMs: z.stats?.playMs || 0,
      buddy: lt(z.buddy) ? z.buddy : null,
      team: (z.team || []).filter(lt),
      dex: (z.dex || []).map(Number),
      seenShiny: z.seenShiny || 0,
      badges: z.badges || [],
      unlocked: z.unlocked || 0,
      stats: z.stats || {},
      raids: z.raids || {},
      owned: z.owned || 0,
      ownedShiny: z.ownedShiny || 0,
      shinySpecies: z.shinySpecies || 0,
      top: lt(z.top) ? z.top : null,
      shine: t.BadgeShine.fromCard(z.badgeShine),
    };
  }
  function we(z, pe) {
    const V = he(z.unlocked),
      lt = new Set(z.dex),
      kt = z.dex.filter((nt) => nt <= V),
      ra = Math.round((kt.length / V) * 100),
      Vt = t.POKEDEX.filter((nt) => nt.id <= V && (nt.legendary || nt.mythical)),
      Xt = Vt.filter((nt) => lt.has(nt.id)).length,
      Ht = z.stats,
      ct = z.buddy,
      wt = Ee(z.badges, z.unlocked),
      ge = z.top,
      Fe = wt.flatMap((nt) => nt.names),
      gt = Fe.filter((nt) => z.badges.includes(nt)).length,
      Dt = (nt, Ot) => (Ot ? `${Math.round(((nt || 0) / Ot) * 100)} %` : ""),
      ha = Ze.REGIONS.filter((nt) => nt.dex && nt.dex[1] <= V).map((nt) => ({
        name: nt.name,
        color: nt.color,
        n: nt.dex[1] - nt.dex[0] + 1,
        got: kt.filter((Ot) => Ot >= nt.dex[0] && Ot <= nt.dex[1]).length,
      })),
      _t = (nt, Ot, ee = "") => `<div class="dc-fact ${ee}"><small>${nt}</small><b>${Ot}</b></div>`,
      Ea = (nt, Ot, ee, rt = "") =>
        `<div class="dc-fact tc-st"><img class="${rt}" src="assets/${nt}" alt=""><span><small>${Ot}</small><b>${ee}</b></span></div>`,
      ut = (nt, Ot, ee) => `<div class="dc-sec"><h4>${nt}${Ot ? `<em>${Ot}</em>` : ""}</h4>${ee}</div>`,
      jt = t.BadgeShine.on(),
      xt = jt && z.own,
      D = wt
        .map(
          (nt) =>
            `<div class="tc-breg${xt ? " rub" : ""}" ${xt ? `data-box="${nt.key}" role="button" tabindex="0" title="${e("Frotter les badges de {region}", { region: e(nt.label) })}"` : `title="${e(nt.label)}"`}><div class="tc-zz">${nt.names.map((Ot) => (z.badges.includes(Ot) ? `<span class="tc-dia" ${jt ? `data-b="${H(Ot)}"` : ""} title="${e("Badge {n}", { n: H(e(Ot)) })}"><i>${Ze.badgeHtml(Ot, 2)}</i></span>` : '<span class="tc-dia off"><i></i></span>')).join("")}</div></div>`,
        )
        .join(""),
      Q = z.team,
      Y = Array.from({ length: t.CONFIG.TEAM_SIZE }, (nt, Ot) =>
        Q[Ot]
          ? `<span class="dc-hero tc-mon" title="${H(Je.DEX[Q[Ot].id].name)}">${Q[Ot].shiny ? '<img class="mon-sh" src="assets/ui/sparkle.svg" alt="' + e("Chromatique") + '">' : ""}${t.UI.rankTag(Q[Ot])}${B(Q[Ot].id, Q[Ot].shiny, se(Q[Ot].id, 52), 52)}<span class="rt-lv">${Q[Ot].level}</span></span>`
          : '<span class="tc-mon free"></span>',
      ).join(""),
      ye = `<img class="tr" src="${Te(z.sprite)}" alt="">${ct ? `<img class="tc-bud${Je.DEX[ct.id].height >= 1.5 ? " big" : ""}" src="${Ge(ct.id, ct.shiny)}" alt="" title="${e("Copain : {name}", { name: H(Je.DEX[ct.id].name) })}">` : ""}`;
    return f(`<div class="tc">
      <div class="dc-head"><h2>${z.own || z.stranger ? e("Carte de dresseur") : e("Carte d'ami")}</h2><div class="dc-sum"><div class="seg tc-seg"><button class="${pe ? "" : "on"}" data-f="0">${e("Recto")}</button><button class="${pe ? "on" : ""}" data-f="1">${e("Verso")}</button></div><button class="tc-x dc-x" aria-label="${e("Fermer")}">✕</button></div></div>
      <div class="tc-flip ${pe ? "back" : ""}"><div class="tc-inner">
        <div class="tc-face">
          <div class="tc-id">
            <div class="tc-idl">${z.own ? `<button class="dc-hero tc-portrait ${qe().length || t.Frames.fresh().length ? "has-new" : ""}" title="${e("Changer d'apparence")}">${ye}${ce}</button>` : `<span class="dc-hero tc-portrait ro">${ye}</span>`}
              ${ct ? `<p class="tc-budname">${t.UI.buddyIcon()}<span>${e("Copain : <b>{name}</b>", { name: H(Je.DEX[ct.id].name) })}</span></p>` : ""}</div>
            <div class="tc-info">
              <div class="tc-name">${t.UI.trainerFace(z.sprite, "tc-nface", z.frame)}<b>${H(z.name)}<small class="tag">#${H(z.tag)}</small></b>${z.own ? `<button class="tc-edit btn outline small" title="${e("Modifier")}">✎</button>` : ""}</div>
              <div class="dc-facts two">${_t(e("Dresseur depuis"), z.since ? At(z.since) : "—")}${_t(e("Temps de jeu"), yt(z.playMs))}</div>
              <div class="tc-dex">
                <div class="tc-ring" style="--p:${ra}"><div><span><b>${ra}%</b><br><small>Pokédex</small></span></div></div>
                <div class="tc-dex-txt"><b>${e("{n} / {max} capturés", { n: kt.length, max: V })}</b><p class="shiny">${t.UI.shinyIc()} ${z.shinySpecies > 1 ? e("{n} chromatiques capturés", { n: z.shinySpecies }) : e("{n} chromatique capturé", { n: z.shinySpecies })} · ${z.seenShiny > 1 ? e("{n} vus", { n: z.seenShiny }) : e("{n} vu", { n: z.seenShiny })}</p></div>
              </div>
            </div>
          </div>
          ${ut(e("Équipe"), `${Q.length} / ${t.CONFIG.TEAM_SIZE}`, `<div class="tc-team">${Y}</div>`)}
          ${ut(e("Badges"), `${gt} / ${Fe.length}`, `<div class="tc-badges">${D}</div>`)}
        </div>
        <div class="tc-face verso">
          ${ut(e("Pokédex par région"), "", `<div class="tc-regs">${ha.map((nt) => `<div class="tc-reg" style="--rc:${nt.color}"><small>${e(nt.name)}<em>${nt.got} / ${nt.n}</em></small><span class="tc-bar"><i style="width:${(nt.got / nt.n) * 100}%"></i></span></div>`).join("")}</div>`)}
          ${ut(
            e("Combats"),
            "",
            `<div class="dc-facts tc-stats">
            ${Ea("ui/versus.png", e("Combats"), ue(Ht.battles || 0))}${Ea("ui/medal-gold.png", e("Victoires"), `${ue(Ht.wins || 0)} <em>${Dt(Ht.wins, Ht.battles)}</em>`)}${Ea("items/poke-ball.png", e("Balls lancées"), ue(Ht.throws || 0))}
            ${Ea("items/ultra-ball.png", e("Captures"), ue(Ht.caught || 0))}${Ea("ui/shiny-charm.png", e("Raids réussis"), `${ue(z.raids.clears || 0)}${z.raids.tries ? ` <em>/ ${ue(z.raids.tries)}</em>` : ""}`)}${ge ? `<div class="dc-fact tc-st"><span class="tc-top">${B(ge.id, ge.shiny, se(ge.id, 32), 32)}</span><span><small>${e("Plus haut niveau")}</small><b>${H(Je.DEX[ge.id].name)} <em>${ge.level}</em></b></span></div>` : Ea("items/rare-candy.png", e("Plus haut niveau"), "—")}</div>`,
          )}
          ${ut(
            e("Collection"),
            "",
            `<div class="dc-facts tc-stats">
            ${Ea("ui/box-link.png", "Pokémon", ue(z.owned))}${Ea("ui/sparkle.svg", e("Chromatiques"), ue(z.ownedShiny), "svg")}${Ea("items/master-ball.png", e("Légendaires"), `${Xt} <em>/ ${Vt.length}</em>`)}
            ${Ea("items/moon-stone.png", e("Évolutions"), ue(Ht.evolutions || 0))}${Ea("items/mystery-egg.png", e("Œufs éclos"), ue(Ht.hatched || 0))}${Ea("ui/link-cable.svg", e("Échanges"), ue(Ht.trades || 0), "svg")}</div>`,
          )}
        </div>
      </div></div>
    </div>`);
  }
  function ie(z, pe = !1, V = []) {
    const lt = we(z, pe);
    return vt({
      className: "dexcard-modal tc-modal",
      body: lt,
      actions: V,
      onOpen: (kt, ra, Vt) => {
        if (
          ((a(".tc-x", lt).onclick = () => ra(null)),
          t.BadgeShine.on() && t.BadgeShine.mountCard(lt, z, Vt),
          b(".tc-seg button", lt).forEach(
            (Ht) =>
              (Ht.onclick = () => {
                (a(".tc-flip", lt).classList.toggle("back", Ht.dataset.f === "1"),
                  b(".tc-seg button", lt).forEach((ct) => ct.classList.toggle("on", ct === Ht)));
              }),
          ),
          !z.own)
        )
          return;
        b("[data-box]", lt).forEach((Ht) => {
          const ct = () => {
            (ra(null), t.BadgeShine.openBox(Ht.dataset.box).then(() => U()));
          };
          ((Ht.onclick = ct),
            (Ht.onkeydown = (wt) => {
              (wt.key === "Enter" || wt.key === " ") && (wt.preventDefault(), ct());
            }));
        });
        const Xt = () => {
          (ra(null), L());
        };
        ((a(".tc-edit", lt).onclick = Xt), (a(".tc-portrait", lt).onclick = Xt));
      },
    });
  }
  const U = (z = !1) => (t.BadgeShine.sync(), ie(et(), z));
  async function Ne(z, pe) {
    const V = await t.Cloud.friends.card(z.uid);
    return V.error || !V.data
      ? (t.UI.toast(e("Carte indisponible pour le moment.")), null)
      : ie({ ..._(V.data, z), stranger: z.status !== "accepted" }, !1, pe);
  }
  async function T(z, pe) {
    if (z === t.Cloud?.user?.id) return U();
    const V = t.Cloud.friends.list.find((kt) => kt.uid === z && kt.status === "accepted");
    if (V) return Ne(V);
    const lt = await t.Cloud.raids.card(z);
    return lt.error || !lt.data
      ? (t.UI.toast(e("Carte indisponible pour le moment.")), null)
      : ie({ ..._(lt.data, pe), stranger: !0 });
  }
  function L(z = "look") {
    let pe = tt().sprite,
      V = t.Frames.mine(),
      lt = null;
    const kt = t.Frames,
      ra = qe(),
      Vt = kt.fresh(),
      Xt = x,
      Ht = Xt.filter((ye) => !Re(ye)),
      ct = Xt.filter(Re),
      wt = ["base", "pokeball", "master"],
      ge = (ye) => (wt.includes(ye.id) ? wt.indexOf(ye.id) : 9),
      Fe = kt.LIST.filter((ye) => kt.open(ye.id) && kt.tile(ye, !0)).sort((ye, nt) => ge(ye) - ge(nt)),
      gt = kt.LIST.filter((ye) => !kt.open(ye.id) && !kt.LOCKS[ye.id].admin && kt.tile(ye, !1)),
      Dt = Fe.filter((ye) => !kt.isElite(ye.id)),
      ha = Fe.filter((ye) => kt.isElite(ye.id)),
      _t = (ye, nt) => t.UI.trainerFace(pe, nt, ye),
      Ea = (ye) =>
        ye
          ? `<button class="btn ghost tc-ach" data-ach>${z === "look" ? e("Voir les apparences ({n} à débloquer) ›", { n: ye }) : e("Voir les cadres ({n} à débloquer) ›", { n: ye })}</button>`
          : "",
      ut = f(`<div class="tc tc-ed">
      <div class="dc-head"><h2>${e("Mon dresseur")}</h2><div class="dc-sum"><div class="seg tc-seg"><button data-tab="look" class="${R(ra)}">${e("Apparence")}${ce}</button><button data-tab="frame" class="${R(Vt)}">${e("Cadre")}${ce}</button></div><button class="dc-x" aria-label="${e("Fermer")}">✕</button></div></div>
      <div class="tc-id">
        <span class="tc-idslot"></span>
        <div class="tc-field"><label for="tc-name">${e("Nom")}</label><input id="tc-name" maxlength="${A}" value="${H(tt().name)}" autocomplete="off"><small>${tt().name.length} / ${A}</small></div>
      </div>
      <div class="tc-pane"></div>
    </div>`),
      jt = a(".tc-pane", ut),
      xt = a(".tc-idslot", ut),
      D = a("input", ut),
      Q = () => {
        for (const ye of ut.querySelectorAll("[data-tab]")) ye.classList.toggle("on", ye.dataset.tab === z);
        if (z === "look")
          ((xt.innerHTML = `<span class="dc-hero tc-portrait"><img class="tr" src="${Te(pe)}" alt=""></span>`),
            (jt.innerHTML = `<div class="dc-sec"><h4>${e("Apparence")}</h4><div class="tc-grid">${Ht.map((ye) => `<button class="dc-hero ${ye === pe ? "on" : ""} ${ra.includes(ye) ? "has-new" : ""}" data-s="${ye}"><img src="${Te(ye)}" alt="">${ce}</button>`).join("")}</div></div>
          ${Ea(ct.length)}`));
        else {
          xt.innerHTML = `<span class="tc-fslot">${_t(V, "tc-fbig")}</span>`;
          const ye = (nt) =>
            nt
              .map(
                (Ot) =>
                  `<button class="${Ot.id === V ? "on" : ""} ${Vt.includes(Ot.id) ? "has-new" : ""}" data-f="${Ot.id}">${_t(Ot.id, "tc-fface")}<span>${H(e(Ot.name))}</span>${ce}</button>`,
              )
              .join("");
          jt.innerHTML = `<div class="dc-sec"><h4>${e("Cadres")}<em>${Dt.length}</em></h4><div class="tc-fgrid">${ye(Dt)}</div></div>
          ${ha.length ? `<div class="dc-sec"><h4>${e("Légendaires")}<em>${ha.length}</em></h4><div class="tc-fgrid">${ye(ha)}</div></div>` : ""}
          ${Ea(gt.length)}`;
        }
      };
    Q();
    const Y = () => {
      (z === "look" &&
        ra.length &&
        (ra.forEach((ye) => {
          Je.S.trainer.looksSeen[ye] = 1;
        }),
        Je.save(),
        Oe()),
        z === "frame" && Vt.length && (kt.seeAll(), Je.save(), Oe()));
    };
    (Y(),
      ut.addEventListener("click", (ye) => {
        if (ye.target.closest("[data-ach]")) {
          (lt?.(null), t.Screens.achievements?.open(z), t.App.show("achievements"));
          return;
        }
        const nt = ye.target.closest("[data-tab]");
        if (nt) {
          ((z = nt.dataset.tab), Q(), Y());
          return;
        }
        const Ot = ye.target.closest("[data-s]");
        if (Ot) {
          ((pe = Ot.dataset.s), Q());
          return;
        }
        const ee = ye.target.closest("[data-f]");
        ee && ((V = ee.dataset.f), Q());
      }),
      (D.oninput = () => {
        const ye = a(".tc-field small", ut);
        ((ye.textContent = `${D.value.length} / ${A}`), ye.classList.remove("err"));
      }),
      vt({
        className: "dexcard-modal tc-modal",
        body: ut,
        onOpen: (ye, nt) => {
          ((lt = nt),
            t.Perf?.touch || (D.focus(), D.select()),
            (a(".dc-x", ut).onclick = () => {
              (nt(null), Wa(() => U()));
            }));
        },
        actions: [
          {
            label: e("Annuler"),
            cls: "ghost",
            onClick: () => {
              Wa(() => U());
            },
          },
          {
            label: e("Valider"),
            cls: "primary lg",
            onClick: () => {
              const ye = t.Names.check(D.value);
              if (ye) {
                const nt = a(".tc-field small", ut);
                return ((nt.textContent = ye), nt.classList.add("err"), D.focus(), !1);
              }
              ((tt().name = D.value.trim().slice(0, A)),
                (tt().sprite = pe),
                (tt().frame = kt.open(V) ? V : "base"),
                Je.save(),
                Oe(),
                Wa(() => U()));
            },
          },
        ],
      }));
  }
  const R = (z) => (z.length ? "has-new" : "");
  function te() {
    ((a("#trainer-btn").onclick = () => U()), Oe());
  }
  const K = (z, pe) => ie({ ..._(z, pe), stranger: !0 });
  function He() {
    const z = tt(),
      pe = t.Frames,
      V = qe(),
      lt = pe.fresh(),
      kt = [];
    for (const ra of x) {
      const Vt = Z[ra];
      if (!Vt) continue;
      const Xt = de(ra),
        Ht = !Re(ra),
        [ct, wt] = Xt ? [0, 1] : Vt.prog?.() || [0, 1];
      kt.push({
        kind: "look",
        id: ra,
        reg: Vt.region || "kanto",
        away: Xt,
        done: Ht,
        n: Ht ? wt : Math.min(ct, wt),
        m: wt,
        hint: dt(ra),
        src: Te(ra),
        fresh: V.includes(ra),
        worn: z.sprite === ra,
      });
    }
    for (const ra of pe.LIST) {
      const Vt = pe.LOCKS[ra.id];
      if (Vt.free || Vt.admin || (pe.isElite(ra.id) && !(pe.open(ra.id) ? ra.tier !== 3 : pe.tile(ra, !1))))
        continue;
      const Xt = pe.open(ra.id),
        [Ht, ct] = Vt.prog?.() || [0, 1];
      kt.push({
        kind: "frame",
        id: ra.id,
        name: ra.name,
        reg: Vt.region || "all",
        away: pe.hidden(ra.id),
        done: Xt,
        n: Xt ? ct : Math.min(Ht, ct),
        m: ct,
        hint: e(Vt.hint),
        fresh: lt.includes(ra.id),
        worn: pe.mine() === ra.id,
      });
    }
    return kt;
  }
  function m(z, pe) {
    if (z === "look") {
      if (!x.includes(pe) || Re(pe)) return !1;
      ((tt().sprite = pe), ((tt().looksSeen ||= {})[pe] = 1));
    } else {
      if (!t.Frames.open(pe)) return !1;
      ((tt().frame = pe), tt().framesSeen && (tt().framesSeen[pe] = 1));
    }
    return (Je.save(), Oe(), !0);
  }
  t.TrainerCard = {
    init: te,
    open: U,
    openFriend: Ne,
    openPlayer: T,
    openPreview: K,
    refreshTrigger: Oe,
    achievements: He,
    wear: m,
  };
})();
