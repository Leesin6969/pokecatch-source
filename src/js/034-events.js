/**
 * events
 *
 * Public API on the game namespace `t`: t.Events
 *
 * Recovered from the shipped bundle — original chunk #33 at byte 805404 (11847 bytes, sha256:1ad259a25d53d79c).
 * This file is one original source file; the build concatenates them in filename order.
 */
t.Events = (function () {
  const a = t.CONFIG,
    b = a.EVENT,
    f = t.Game,
    ue = t.STORY,
    H = 6e4,
    vt = [
      {
        id: 146,
        power: 2.36,
        aura: { weather: "sun", light: "#ffc89a" },
        zone: "Route Victoire",
        bg: "cave",
        fallback: "mountain",
        types: ["fire", "rock", "ground"],
        announce: "Une chaleur étrange monte de la Route Victoire…",
        text: "Des flammes illuminent la grotte… Sulfura est là !",
      },
      {
        id: 145,
        power: 3.84,
        aura: { weather: "storm", light: "#7c84b8" },
        zone: "Centrale",
        bg: "cave",
        types: ["electric", "flying", "steel"],
        announce: "Les lumières de la Centrale vacillent…",
        text: "Électhor crépite au fond de la Centrale !",
      },
      {
        id: 144,
        power: 2.88,
        aura: { weather: "snow", light: "#5866a8" },
        zone: "Îles Écume",
        bg: "cave",
        types: ["ice", "water", "psychic"],
        announce: "Un vent glacial souffle sur les Îles Écume…",
        text: "Artikodin surgit dans un tourbillon de neige !",
      },
      {
        id: 150,
        power: 1.98,
        aura: { light: "#8a6fb8" },
        target: 0.35,
        zone: "Caverne Azurée",
        badge: "Cascade",
        bg: "cave",
        types: ["psychic", "ghost", "fighting"],
        w: 0.5,
        announce: "Une pression psychique écrasante émane d'une grotte près d'Azuria…",
        text: "Mewtwo t'attend au fond de la caverne…",
      },
      {
        id: 151,
        power: 1.87,
        flee: 150,
        anywhere: !0,
        types: ["psychic", "normal", "grass"],
        w: 0.3,
        announce: "Une petite lueur rose file au-dessus de {zone}…",
        text: "Mew joue entre les herbes… il t'a vu !",
      },
      {
        id: 243,
        power: 2.49,
        aura: { weather: "storm", light: "#7c84b8" },
        flee: 120,
        after: "Maître Johto",
        zone: "Route 38",
        bg: "prairie",
        types: ["electric", "normal", "steel"],
        announce: "Le tonnerre gronde sans nuage au-dessus de la Route 38…",
        text: "Raikou surgit dans un éclair !",
      },
      {
        id: 244,
        power: 3.05,
        aura: { weather: "sun", light: "#ffc89a" },
        flee: 120,
        after: "Maître Johto",
        zone: "Tour Cendrée",
        bg: "cave",
        types: ["fire", "ground", "rock"],
        announce: "Les cendres de la Tour Cendrée se remettent à rougeoyer…",
        text: "Entei rugit au milieu des flammes !",
      },
      {
        id: 245,
        power: 2.1,
        aura: { weather: "rain", light: "#8fa6d8" },
        flee: 120,
        after: "Maître Johto",
        zone: "Lac Colère",
        bg: "lake",
        types: ["water", "ice", "normal"],
        announce: "Un vent du nord ride la surface du Lac Colère…",
        text: "Suicune court sur les eaux du lac !",
      },
      {
        id: 249,
        power: 2.16,
        aura: { weather: "storm", light: "#6f86b8" },
        target: 0.35,
        after: "Maître Johto",
        zone: "Îles Tourbillon",
        bg: "lake",
        fallback: "cave",
        types: ["psychic", "flying", "water"],
        w: 0.5,
        announce: "Les tourbillons autour des îles redoublent de violence…",
        text: "Lugia t'attend au cœur des Îles Tourbillon…",
      },
      {
        id: 250,
        power: 2.72,
        target: 0.35,
        after: "Maître Johto",
        zone: "Tour Ferraille",
        bg: "town",
        types: ["fire", "flying", "ground"],
        w: 0.5,
        announce: "Un arc-en-ciel apparaît au-dessus de Rosalia…",
        text: "Ho-Oh se pose au sommet de la Tour Ferraille !",
      },
      {
        id: 251,
        power: 2.36,
        flee: 150,
        after: "Maître Johto",
        zone: "Bois aux Chênes",
        bg: "forest",
        types: ["grass", "psychic", "bug"],
        w: 0.3,
        announce: "Le temps semble suspendu dans le Bois aux Chênes…",
        text: "Celebi virevolte autour du vieil autel !",
      },
    ],
    B = (T) => (T.after ? !!f.S.adv?.badges?.includes(T.after) : T.id <= f.maxDexId()),
    se = (T) => Math.max(f.maxDexId(), Ge(T)?.after ? 251 : 0),
    Ge = (T) => vt.find((L) => L.id === T),
    Je = (T) => f.DEX[T].name,
    Ze = (T) => (T.zone ? { zone: T.zone, bg: T.bg, fallback: T.fallback, ch: T.ch } : Ge(T.id));
  function x() {
    const T = [];
    return (
      ue.CHAPTERS.forEach((L, R) => {
        if (!(ue.regionOf(R).dex[1] > f.maxDexId()))
          for (const te of L.steps)
            te.kind === "route" &&
              te.wild > 0 &&
              !T.some((K) => K.zone === te.name) &&
              T.push({ zone: te.name, bg: te.bg, fallback: te.fallback, ch: R });
      }),
      Tt(T)
    );
  }
  const $ = () => {
      const T =
        f.S.events || (f.S.events = { seq: 0, cur: null, shards: 0, traces: {}, wins: [], ignoreLeague: !1 });
      return ((T.traces = T.traces || {}), T);
    },
    X = () => b.ENABLED !== !1 && ($().ignoreLeague || !!f.S.adv?.badges?.includes("Maître")),
    Tt = (T) => T[Math.floor(Math.random() * T.length)],
    le = ([T, L]) => T + Math.random() * (L - T);
  function P(T, L, R) {
    const te = vt.filter(B),
      K = te.filter((pe) => pe.id !== L || te.length < 2);
    let He = R && Ge(R);
    if (!He) {
      let pe = Math.random() * K.reduce((V, lt) => V + (lt.w || 1), 0);
      He = K.find((V) => (pe -= V.w || 1) <= 0) || K[0];
    }
    const m = T + b.ANNOUNCE_MIN * H,
      z = Math.random() < b.RIVAL_MASTER_CHANCE;
    return {
      ...(He.anywhere ? x() : {}),
      seq: ++$().seq,
      id: He.id,
      announceAt: T,
      openAt: m,
      closeAt: m + b.OPEN_MIN * H,
      rivalAt: m + le(z ? b.RIVAL_MASTER_MIN : b.RIVAL_MIN) * H,
      rival: Tt(a.PLAYER_NAMES),
      master: z,
      hunters: 60 + Math.floor(Math.random() * 300),
      end: null,
      by: null,
      loops: 0,
      posted: {},
    };
  }
  function u(T = $().cur, L = Date.now()) {
    return T ? (T.end != null ? "closed" : L < T.openAt ? "announce" : "open") : "none";
  }
  const ve = (T) => [$().cur, $().priv].find((L) => L && L.seq === T) || null,
    it = (T) => {
      const L = ve(T);
      return b.ENABLED !== !1 && !!L && u(L) === "open";
    },
    De = () => {
      const T = $().priv;
      return T && u(T) === "open" ? T : null;
    };
  function je(T) {
    if (!X()) return e("Events verrouillés");
    if (!de(T)) return e("Affronte-le d'abord en event");
    if (De()) return e("Une chasse privée est déjà en cours");
    const L = $().traces[T] || 0;
    return L < b.PRIVATE.TRACES ? e("{have}/{need} traces", { have: L, need: b.PRIVATE.TRACES }) : null;
  }
  function pt(T) {
    if (je(T)) return !1;
    const L = $(),
      R = Ge(T),
      te = Date.now();
    return (
      (L.traces[T] -= b.PRIVATE.TRACES),
      L.traces[T] || delete L.traces[T],
      (L.privSeq = (L.privSeq || 0) + 1),
      (L.priv = {
        ...(R.anywhere ? x() : {}),
        seq: -L.privSeq,
        id: T,
        priv: !0,
        announceAt: te,
        openAt: te,
        closeAt: te + b.PRIVATE.OPEN_MIN * H,
        end: null,
        by: null,
        loops: 0,
        posted: {},
      }),
      f.save(),
      We(),
      L.priv
    );
  }
  const re = [],
    We = () =>
      re.forEach((T) => {
        try {
          T();
        } catch (L) {
          console.error(L);
        }
      });
  function oe(T = Date.now()) {
    if (!X()) return;
    const L = $();
    let R = !1;
    for (let K = 0; K < 4; K++) {
      let He = L.cur;
      He || ((He = L.cur = P(T)), (R = !0));
      const m = (pe) => T - pe > H;
      (He.posted.announce || ((He.posted.announce = 1), et(He, m(He.announceAt)), (R = !0)),
        He.end == null &&
          T >= He.openAt &&
          !He.posted.open &&
          ((He.posted.open = 1), _(He, m(He.openAt)), (R = !0)));
      const z = Math.min(He.rivalAt ?? 1 / 0, He.closeAt);
      if (
        (He.end == null && T >= z && ($e(He, z < He.closeAt ? "rival" : "time", z, m(z)), (R = !0)),
        He.end == null)
      )
        break;
      ((L.last = { seq: He.seq, id: He.id, by: He.by, rival: He.rival, end: He.end }),
        (L.cur = P(T - He.end > (b.ANNOUNCE_MIN + b.OPEN_MIN) * H ? T : He.end, He.id)),
        (R = !0));
    }
    const te = L.priv;
    (te &&
      te.end == null &&
      T >= te.closeAt &&
      ((te.end = te.closeAt),
      (te.by = "time"),
      (R = !0),
      T - te.closeAt < H &&
        Ee(e("{name} s'est échappé : ta chasse privée est terminée.", { name: Je(te.id) }), te.id)),
      R && (f.save(), We()));
  }
  function $e(T, L, R, te) {
    ((T.end = R), (T.by = L));
    const K = `<b class="legend">${fe(Je(T.id))}</b>`;
    L === "rival"
      ? (Oe(
          {
            mon: T.id,
            cls: "legend",
            html: T.master
              ? e("🏆 <b>{rival}</b> a capturé {name} avec une Master Ball ! L'event est terminé.", {
                  rival: fe(T.rival),
                  name: K,
                })
              : e("🏆 <b>{rival}</b> a capturé {name} ! L'event est terminé.", {
                  rival: fe(T.rival),
                  name: K,
                }),
          },
          te,
        ),
        te ||
          (ie(T.rival),
          Ee(e("{rival} a capturé {name} ! L'event est terminé.", { rival: T.rival, name: Je(T.id) }), T.id)))
      : L === "time" &&
        (Oe(
          {
            mon: T.id,
            cls: "legend",
            html: e("{name} s'est volatilisé… Personne ne l'a capturé cette fois.", { name: K }),
          },
          te,
        ),
        te || Ee(e("{name} a disparu : l'event est terminé.", { name: Je(T.id) }), T.id));
  }
  function Z(T) {
    const L = ve(T);
    if (!(!L || L.end != null)) {
      if (L.priv) {
        ((L.end = Date.now()),
          (L.by = "me"),
          $().wins.push({ id: L.id, at: Date.now() }),
          Oe({
            me: !0,
            mon: L.id,
            cls: "legend",
            html: e('🏆 <b>Tu</b> as capturé <b class="legend">{name}</b> lors de ta chasse privée !', {
              name: fe(Je(L.id)),
            }),
          }),
          f.save(),
          We());
        return;
      }
      ($e(L, "me", Date.now()),
        $().wins.push({ id: L.id, at: Date.now() }),
        Oe({
          me: !0,
          mon: L.id,
          cls: "legend",
          html: e(`🏆 <b>Tu</b> as capturé <b class="legend">{name}</b> ! L'event est terminé.`, {
            name: fe(Je(L.id)),
          }),
        }),
        ie(),
        f.save(),
        We());
    }
  }
  function A(T, L = 1) {
    const R = $().traces;
    ((R[T] = (R[T] || 0) + L), f.save(), We());
  }
  function J(T) {
    const L = $().met || ($().met = {});
    L[T] || ((L[T] = 1), f.save());
  }
  const de = (T) => !!($().met?.[T] || $().traces[T] || $().records?.[T] || $().wins.some((L) => L.id === T));
  function _e(T) {
    (($().shards += T), f.save(), We());
  }
  function Re(T, L) {
    const R = $().records || ($().records = {}),
      te = R[T];
    return te && te.ms <= L ? !1 : ((R[T] = { ms: L, at: Date.now() }), f.save(), We(), !0);
  }
  const dt = [
    "acetrainer",
    "acetrainer-f",
    "beauty",
    "biker",
    "birdkeeper",
    "blackbelt",
    "boarder",
    "bugcatcher",
    "burglar",
    "camper",
    "channeler",
    "firebreather",
    "fisherman",
    "gentleman",
    "guitarist",
    "hiker",
    "juggler",
    "kimonogirl",
    "lass",
    "medium",
    "picnicker",
    "pokefan",
    "pokefan-f",
    "pokemaniac",
    "psychic",
    "psychic-f",
    "sailor",
    "schoolkid",
    "scientist",
    "skier",
    "supernerd",
    "swimmer",
    "youngster",
  ];
  function qe(T) {
    let L = T * 9301 + 49297;
    const R = () => (L = (L * 16807) % 2147483647) / 2147483647,
      te = b.RECORDS,
      K = te.BASE_S * (0.85 + R() * 0.3) * 1e3,
      He = a.PLAYER_NAMES;
    return Array.from({ length: te.FIELD }, (m, z) => ({
      name: He[z % He.length] + (z < He.length ? "" : `_${Math.floor(R() * 90 + 10)}`),
      sprite: dt[Math.floor(R() * dt.length)],
      ms: Math.round(K * (1 + 0.03 * z + 0.0012 * z * z) * (0.98 + R() * 0.04)),
      ago: Math.floor(R() * 72) + 1,
    })).sort((m, z) => m.ms - z.ms);
  }
  function ce(T) {
    const L = $().records?.[T],
      R = qe(T);
    let te = null;
    if (L) {
      const K = f.S.trainer || {};
      ((te = {
        name: K.name || e("Toi"),
        tag: K.tag,
        sprite: K.sprite || "red",
        ms: L.ms,
        ago: Math.max(0, Math.floor((Date.now() - L.at) / 36e5)),
        me: !0,
      }),
        R.splice(R.findIndex((He) => He.ms > L.ms) >>> 0, 0, te));
    }
    return (
      R.forEach((K, He) => {
        K.rank = He + 1;
      }),
      { top: R.slice(0, b.RECORDS.TOP), me: te, best: R[0].ms }
    );
  }
  const tt = () => Object.values($().traces).reduce((T, L) => T + L, 0);
  function mt(T) {
    if (tt() < T) return !1;
    const L = $().traces;
    for (; T > 0;) {
      const R = Object.keys(L).sort((K, He) => L[He] - L[K])[0],
        te = Math.min(T, L[R]);
      ((L[R] -= te), (T -= te), L[R] || delete L[R]);
    }
    return !0;
  }
  function Te(T) {
    const L = $();
    return (T.cost === "traces" ? !mt(T.price) : L.shards < T.price)
      ? !1
      : (T.cost === "shards" && (L.shards -= T.price), f.addItem(T.id, T.amount || 1), f.save(), We(), !0);
  }
  function At(T, L, R, te = f.maxDexId()) {
    return t.POKEDEX.filter(
      (K) =>
        K.id <= te &&
        !K.legendary &&
        !K.mythical &&
        !K.baby &&
        K.types.includes(T) &&
        (t.EVOLUTIONS[K.id] || []).every((He) => He.to > te),
    ).map((K) => ({ id: K.id, min: L, max: R, w: 1 }));
  }
  const yt = [
    "wild",
    "trainer",
    "wild",
    "trainer",
    "heal",
    "wild",
    "trainer",
    "wild",
    "trainer",
    "heal",
    "legend",
  ];
  function he(T) {
    const L = Ge(T.id),
      R = Ze(T),
      te = b.LEVEL,
      K = { name: R.zone, bg: R.bg, fallback: R.fallback, event: !0 };
    let He = 0;
    return yt.map((m) => {
      if (m === "heal") return { ...K, type: "heal", name: "Camp de base", bg: "pokecenter", fallback: R.bg };
      if (m === "legend")
        return {
          ...K,
          type: "static",
          id: T.id,
          level: te,
          text: e(L.text),
          legend: !0,
          power: L.power,
          aura: L.aura,
        };
      const z = L.types[He++ % L.types.length];
      return { ...K, type: m, tag: z, pool: At(z, m === "wild" ? te - b.WILD_SPREAD : te - 2, te, se(T.id)) };
    });
  }
  function fe(T) {
    return t.UI ? t.UI.esc(T) : String(T);
  }
  function Oe(T, L) {
    t.News?.post(T, L);
  }
  function Ee(T, L) {
    t.UI && t.UI.toast(fe(T), t.UI.monSrc(L));
  }
  function et(T, L) {
    Oe(
      {
        mon: T.id,
        cls: "legend",
        html: `🌀 ${fe(e(Ge(T.id).announce, { zone: e(Ze(T).zone) }))} <small>${e("(dans {n} min)", { n: b.ANNOUNCE_MIN })}</small>`,
      },
      L,
    );
  }
  function _(T, L) {
    (Oe(
      {
        mon: T.id,
        cls: "legend",
        html: e(
          '⚡ <b class="legend">{name}</b> est apparu : <b>{zone}</b> ! {n} dresseurs sont déjà sur sa piste.',
          { name: fe(Je(T.id)), zone: fe(e(Ze(T).zone)), n: T.hunters },
        ),
      },
      L,
    ),
      L || Ee(e("{name} est apparu : {zone} !", { name: Je(T.id), zone: e(Ze(T).zone) }), T.id));
  }
  const we = [
    "gg",
    "GG",
    "ggwp",
    "gg {w} !!",
    "nooon j'étais à 2 % 😭",
    "bien joué {w}",
    "GG 🔥",
    "gg… j'avais même pas fini ma boucle",
    "gg ez",
    "ggg",
    "chanceux 😤",
    "GGGG",
    "gg, à la prochaine !",
  ];
  function ie(T) {
    const L = 7 + Math.floor(Math.random() * 6),
      R = T ? we : we.filter((te) => !te.includes("{w}"));
    for (let te = 0; te < L; te++)
      Wa(
        () => Oe({ chat: !0, html: `<b>${fe(Tt(a.PLAYER_NAMES))}</b> : ${fe(e(Tt(R), { w: T }))}` }),
        500 + te * (250 + Math.random() * 500),
      );
  }
  function U() {
    const T = $().cur,
      L = u(T);
    if (L === "none" || L === "closed" || !X()) return null;
    const R = fe(Je(T.id)),
      te = fe(e(Ze(T).zone)),
      K = `<b>${fe(Tt(a.PLAYER_NAMES))}</b>`,
      He =
        L === "announce"
          ? [
              e("{who} : vous sentez ça aussi vers {zone} ?", { who: K, zone: te }),
              e("{who} : je prépare mon équipe, ça va être {name} !", { who: K, name: R }),
              e("{who} : quelqu'un a une Master Ball en stock ?", { who: K }),
            ]
          : [
              e("{who} : encore raté {name} à 2 %… 😩", { who: K, name: R }),
              e("{who} : +1 trace, bientôt ma chasse privée", { who: K }),
              e("{who} : les dresseurs de {zone} piquent fort", { who: K, zone: te }),
              e("{who} : {name} vient de s'échapper de ma Hyper Ball !!", { who: K, name: R }),
              e("{who} : boucle 4 et toujours rien", { who: K }),
              e("{who} : qui est encore sur {zone} ?", { who: K, zone: te }),
            ];
    return { chat: !0, mon: L === "open" ? T.id : null, html: Tt(He) };
  }
  function Ne() {
    b.ENABLED !== !1 && (oe(), Ss(() => oe(), 1e3));
  }
  return {
    LEGENDS: vt,
    legendOf: Ge,
    zoneOf: Ze,
    unlocked: X,
    phase: u,
    newEvent: P,
    get: ve,
    isOpen: it,
    priv: De,
    privateBlock: je,
    openPrivate: pt,
    update: oe,
    won: Z,
    addTrace: A,
    addShards: _e,
    markMet: J,
    met: de,
    addRecord: Re,
    board: ce,
    traceCount: tt,
    buy: Te,
    buildRun: he,
    chatter: U,
    init: Ne,
    get state() {
      return $();
    },
    get cur() {
      return $().cur;
    },
    on(T) {
      re.push(T);
    },
    emit: We,
  };
})();
