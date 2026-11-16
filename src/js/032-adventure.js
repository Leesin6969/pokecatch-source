/**
 * adventure
 *
 * Public API on the game namespace `t`: t.Adventure
 *
 * Recovered from the shipped bundle — original chunk #31 at byte 709821 (75463 bytes, sha256:40b1e78bce37865c).
 * This file is one original source file; the build concatenates them in filename order.
 */
(function () {
  const a = t.CONFIG,
    b = t.STORY,
    f = t.Game,
    { rand: ue, pick: H } = f,
    vt = /gift|static|npc-trade|pokeflute|squirt-bottle|roaming|honey-tree|pokemon-ranger|feebas-tile/,
    B = () => f.S.adv;
  let se = null;
  const Ge = b.CHAPTERS.flatMap((h) => h.steps).find((h) => h.once === a.SOULS.once),
    Je = () => !!Ge && Ge.caught.every((h) => f.S.dex[h]);
  function Ze(h, k = 1) {
    const ne = se && !h.endsWith("-stone") && Math.random() >= a.OFFLINE_ITEM_RATE ? 0 : k;
    return (
      ne > 0 &&
        (h === "coin" ? f.coinIn(ne) : f.addItem(h, ne),
        se && ((se.granted += ne), (se.got[h] = (se.got[h] || 0) + ne))),
      ne
    );
  }
  function x() {
    return {
      chapter: 0,
      unlocked: 0,
      badges: [],
      gifts: {},
      nodes: [],
      node: 0,
      battle: null,
      pending: null,
      capture: { on: !0, target: "new", shiny: !0 },
      speed: 1,
      paused: !1,
      loops: [],
      runs: 0,
      kept: {},
      layout: 6,
    };
  }
  function $() {
    f.S.adv || ((f.S.adv = x()), jt(0));
    const h = B();
    ((h.capture = h.capture || {}),
      (h.kept = h.kept || {}),
      Array.isArray(h.loops) || (h.loops = h.repeat ? [Hn(h.chapter)] : []),
      delete h.repeat,
      Object.assign(h.capture, x().capture),
      delete h.capture.master,
      delete h.capture.ball,
      X(h),
      Tt(h),
      le(h),
      P(h),
      ve(h),
      f.S.items?.["machine-part"] && delete f.S.items["machine-part"]);
    for (const k of ["silph-scope", "devon-scope"])
      f.S.items?.[k] && (delete f.S.items[k], ((h.gifts ||= {})[k] = !0));
    (h.gifts?.["machine-part"] && delete h.gifts["machine-part"],
      f.S.items?.["prism-scale"] && ((h.gifts ||= {})["prism-scale"] = !0),
      (h.badges ||= []));
    for (let k = 0; k < (h.unlocked || 0); k++)
      for (const ne of b.CHAPTERS[k]?.steps || [])
        ne.kind === "gym" && ne.badge && !h.badges.includes(ne.badge) && h.badges.push(ne.badge);
    if ((it(), h.tower && !ee(h)?.run())) {
      const k = h.tower.back;
      ((h.tower = null), jt(k));
    }
    return (h.nodes.length || jt(h.chapter), h);
  }
  function X(h) {
    if ((h.layout || 1) >= 2) return;
    const k = 14,
      ne = (Le) => (Le > k ? Le - 1 : Math.min(Le, k - 1)),
      Ie = ne(h.chapter) !== h.chapter;
    ((h.chapter = ne(h.chapter)), (h.unlocked = h.unlocked > k ? h.unlocked - 1 : h.unlocked));
    for (const Le of ["deaths", "chTime", "kept"]) {
      if (!h[Le]) continue;
      const Pt = {};
      for (const [Nt, Qt] of Object.entries(h[Le])) +Nt !== k && (Pt[ne(+Nt)] = Qt);
      h[Le] = Pt;
    }
    (Ie && (h.nodes = []), (h.layout = 2));
  }
  function Tt(h) {
    if ((h.layout || 1) >= 3) return;
    const k = b.CHAPTERS.findIndex((Pt) => Pt.reg === "johto" && Pt.name === "Route Victoire") - 1,
      ne = (Pt) => (Pt >= k ? Pt + 1 : Pt),
      Ie = (Pt) => (Pt > k ? Pt + 1 : Pt),
      Le = Ie(h.chapter) !== h.chapter;
    ((h.chapter = Ie(h.chapter)), (h.unlocked = Ie(h.unlocked)));
    for (const Pt of ["deaths", "chTime", "kept"]) {
      if (!h[Pt]) continue;
      const Nt = {};
      for (const [Qt, ma] of Object.entries(h[Pt])) Nt[ne(+Qt)] = ma;
      h[Pt] = Nt;
    }
    ((h.loops = (h.loops || []).map((Pt) => (typeof Pt == "number" ? ne(Pt) : Pt))),
      (Le || h.chapter === k) && ((h.nodes = []), (h.node = 0), (h.battle = null), (h.pending = null)),
      (h.layout = 3));
  }
  function le(h) {
    if ((h.layout || 1) >= 4) return;
    const k = b.CHAPTERS.findIndex((Nt) => Nt.reg === "johto" && Nt.name === "Tour Radio"),
      ne = (Nt) => (Nt >= k ? Nt + 1 : Nt),
      Ie = !!h.kept?.[k]?.includes("Admin Rocket"),
      Le = (Nt) => (Nt > k || (Nt === k && Ie) ? Nt + 1 : Nt),
      Pt = Le(h.chapter) !== h.chapter;
    ((h.chapter = Le(h.chapter)), (h.unlocked = Le(h.unlocked)), h.kept && delete h.kept[k]);
    for (const Nt of ["deaths", "chTime", "kept"]) {
      if (!h[Nt]) continue;
      const Qt = {};
      for (const [ma, $a] of Object.entries(h[Nt])) Qt[ne(+ma)] = $a;
      h[Nt] = Qt;
    }
    if (f.S.stonesFound) {
      const Nt = {};
      for (const [Qt, ma] of Object.entries(f.S.stonesFound)) Nt[Qt.startsWith("r:") ? Qt : ne(+Qt)] = ma;
      f.S.stonesFound = Nt;
    }
    ((h.loops = (h.loops || []).map((Nt) => (typeof Nt == "number" ? ne(Nt) : Nt))),
      (Pt || h.chapter === k) && ((h.nodes = []), (h.node = 0), (h.battle = null), (h.pending = null)),
      (h.layout = 4));
  }
  function P(h) {
    (h.layout || 1) < 5 && (h.layout = 5);
  }
  const u = 8;
  function ve(h) {
    if ((h.layout || 1) >= 6) return;
    h.layout = 6;
    const k = b.CHAPTERS.findIndex((Nt) => Nt.name === "Mont Argenté"),
      ne = u;
    if (k < 0) return;
    const Ie = (Nt) => (Nt < k ? Nt : Nt < k + ne ? k : Nt - ne),
      Le = (Nt) => Nt >= k && Nt < k + ne,
      Pt = h.chapter >= k && h.chapter < k + ne + 1 && !h.event && !h.zone && !h.tower && !h.league;
    ((h.chapter = Ie(h.chapter)), (h.unlocked = Ie(h.unlocked || 0)));
    for (const Nt of ["deaths", "chTime", "kept"]) {
      if (!h[Nt]) continue;
      const Qt = {};
      for (const [ma, $a] of Object.entries(h[Nt])) Le(+ma) || (Qt[Ie(+ma)] = $a);
      h[Nt] = Qt;
    }
    if (f.S.stonesFound) {
      const Nt = {};
      for (const [Qt, ma] of Object.entries(f.S.stonesFound))
        (Qt.startsWith("r:") || !Le(+Qt)) && (Nt[Qt.startsWith("r:") ? Qt : Ie(+Qt)] = ma);
      f.S.stonesFound = Nt;
    }
    h.loops = (h.loops || [])
      .filter((Nt) => typeof Nt != "number" || !Le(Nt))
      .map((Nt) => (typeof Nt == "number" ? Ie(Nt) : Nt));
    for (const Nt of [h.event, h.zone, h.tower, h.league])
      Nt && typeof Nt.back == "number" && (Nt.back = Ie(Nt.back));
    Pt && ((h.nodes = []), (h.node = 0), (h.battle = null), (h.pending = null));
  }
  function it() {
    const h = B();
    b.CHAPTERS.forEach((k, ne) => {
      k.opens &&
        h.unlocked > ne &&
        b.REGIONS.find((Ie) => Ie.key === k.opens)?.open &&
        (h.unlocked = Math.max(h.unlocked, b.firstChapterOf(k.opens)));
    });
  }
  const De = (h, k) => (t.FORMS?.baseOf(h) ?? h) <= (b.regionOf(k ?? B()?.chapter ?? 0)?.dex?.[1] ?? 151),
    je = (h, k) => !k?.dex || (h >= k.dex[0] && h <= k.dex[1]),
    pt = (h, k) => {
      for (; !je(h, k) && f.PREVO[h];) h = f.PREVO[h].from;
      return h;
    };
  function re(h, k, ne = !1, Ie) {
    const Le = (Pt) => De(Pt.to, Ie) && (Pt.level ? Pt.level <= k : ne && k >= a.TRAINER_ITEM_EVO_LEVEL);
    for (let Pt; (Pt = (t.EVOLUTIONS[h] || []).find(Le));) h = Pt.to;
    return h;
  }
  function We(h, k, ne, Ie = !1) {
    const Le = (Nt) => De(Nt.to, ne) && (Nt.level ? Nt.level <= k : Ie && k >= a.TRAINER_ITEM_EVO_LEVEL),
      Pt = [h];
    for (let Nt; Pt.length < 3 && (Nt = (t.EVOLUTIONS[h] || []).find(Le));) Pt.push((h = Nt.to));
    return Pt;
  }
  const oe = (h, k) => {
      const ne = a.STAGE_ODDS.slice(0, h.length),
        Ie = k ? ne : [...ne].reverse(),
        Le = Ie.reduce((Pt, Nt) => Pt + Nt, 0);
      return h.map((Pt, Nt) => ({ id: Pt, p: Ie[Nt] / Le }));
    },
    $e = (h, k, ne = oe(h, k)) => {
      let Ie = Math.random();
      for (const Le of ne) if ((Ie -= Le.p) < 0) return Le.id;
      return h[h.length - 1];
    },
    Z = (h, k, ne) => {
      const Ie = We(h, k, ne);
      return $e(Ie, !0, dt(Ie));
    };
  function A(h, k = B().chapter, ne = null) {
    const Ie = [];
    for (const Pt of h || []) {
      const Nt = (t.ENCOUNTERS[Pt] || []).every((Qt) => /static/.test(Qt[4]));
      for (let [Qt, ma, $a, Fa, fa, ga] of t.ENCOUNTERS[Pt] || []) {
        if ((vt.test(fa) && !/walk|surf|rod/.test(fa) && !(Nt && /static/.test(fa))) || $a >= 100) continue;
        let qa = t.DAYTIME ? t.DAYTIME.weight(Qt, Fa, ga, Pt) : Fa;
        if (!qa) continue;
        const ja = /walk/.test(fa);
        (/rod/.test(fa) && !ja && !/surf/.test(fa)
          ? ((qa *= 0.15), ($a = Math.min($a, ma + 10)))
          : /surf/.test(fa) && !ja
            ? (qa *= 0.5)
            : /headbutt|rock-smash/.test(fa) && !ja && (qa *= 0.25),
          !(f.isLegend(Qt) || f.DEX[Qt]?.baby) &&
            (ne
              ? Ie.push({ id: Qt, min: ne[0], max: ne[1], w: qa })
              : Ie.push({ id: Qt, min: b.levelAt(k, ma), max: b.levelAt(k, $a), w: qa })));
      }
    }
    const Le = (h || []).flatMap((Pt) => b.RARE_WILD[Pt] || []);
    if (Ie.length && Le.length) {
      const Pt = Ie.reduce((ma, $a) => ma + $a.w, 0),
        Nt = Math.min(...Ie.map((ma) => ma.min)),
        Qt = Math.max(...Ie.map((ma) => ma.max));
      for (const ma of Le) {
        const { id: $a, share: Fa = b.RARE_SHARE, final: fa } = typeof ma == "number" ? { id: ma } : ma,
          ga = ne ? re($a, (ne[0] + ne[1]) / 2, !1, k) : $a,
          qa = fa != null && ga !== $a && !(t.EVOLUTIONS[ga] || []).length;
        Ie.push({ id: ga, min: Nt, max: Qt, w: Pt * (qa ? fa : Fa) });
      }
    }
    return de(Ie);
  }
  function J(h) {
    let k = h;
    for (; f.PREVO[k] && !f.DEX[f.PREVO[k].from]?.baby;) k = f.PREVO[k].from;
    return k;
  }
  function de(h) {
    const k = new Set(h.map((Ie) => Ie.id)),
      ne = [];
    for (const Ie of h) {
      const Le = J(Ie.id);
      Le === Ie.id || k.has(Le) || f.isLegend(Le) || (k.add(Le), (Ie.w /= 2), ne.push({ ...Ie, id: Le }));
    }
    return h.concat(ne);
  }
  const _e = () =>
      !B().event && !B().zone && !B().league && (f.buffMult("rare") > 1 || f.buffMult("dex") > 1),
    Re = (h) =>
      _e()
        ? (f.tierOf(h).key === "rare" ? f.buffMult("rare") : 1) * (f.caughtHere(h) ? 1 : f.buffMult("dex"))
        : 1;
  function dt(h) {
    const k = oe(h, !0);
    if (!_e()) return k;
    const ne = k.map((Le) => ({ id: Le.id, p: Le.p * Re(Le.id) })),
      Ie = ne.reduce((Le, Pt) => Le + Pt.p, 0);
    return ne.map((Le) => ({ id: Le.id, p: Le.p / Ie }));
  }
  function qe(h, k) {
    return _e()
      ? h.map((ne) => {
          const Ie = oe(We(ne.id, ne.max, k), !0).reduce((Le, Pt) => Le + Pt.p * Re(Pt.id), 0);
          return Ie === 1 ? ne : { ...ne, w: ne.w * Ie };
        })
      : h;
  }
  function ce(h) {
    const k = h.reduce((Ie, Le) => Ie + Le.w, 0);
    let ne = Math.random() * k;
    for (const Ie of h) if (((ne -= Ie.w), ne <= 0)) return { id: Ie.id, level: ue(Ie.min, Ie.max) };
    return { id: h[0].id, level: h[0].min };
  }
  const tt = (h) =>
      A(
        b.CHAPTERS[h].steps.flatMap((k) => k.areas || []),
        h,
        b.bandOf(h),
      ),
    mt = (h) =>
      h.pool ||
      (h.species && h.lv
        ? h.species.filter((k) => !f.DEX[k]?.baby).map((k) => ({ id: k, min: h.lv[0], max: h.lv[1], w: 1 }))
        : null),
    Te = {};
  function At(h) {
    if (Te[h]) return Te[h];
    const k = new Set();
    for (let ne = Math.max(0, b.firstChapterOf(b.regionOf(h)?.key || "kanto")); ne <= h; ne++)
      for (const Ie of b.CHAPTERS[ne]?.steps || [])
        for (const Le of mt(Ie) || (Ie.areas ? A(Ie.areas, ne, Ie.lv) : [])) k.add(Le.id);
    return (Te[h] = k);
  }
  function yt(h, k, ne) {
    if (
      !t.WEATHER ||
      !h.length ||
      ((h = h.map((fa) => ({ ...fa, w: fa.w * t.WEATHER.encounterMult(k, fa.id) }))), !k?.bg)
    )
      return h;
    const Ie = t.DAYTIME.indoorNode(k),
      Le = a.CONDITIONAL_WILD,
      Pt = new Set([t.DAYTIME.phase().key, t.WEATHER.current(k)]),
      Nt = k.dex?.[1] ?? b.regionOf(ne)?.dex?.[1] ?? 151,
      Qt = At(ne),
      ma = h.reduce((fa, ga) => fa + ga.w, 0),
      $a = Math.min(...h.map((fa) => fa.min)),
      Fa = Math.max(...h.map((fa) => fa.max));
    for (const fa of Le.RULES) {
      if (
        fa.area || fa.place
          ? !(fa.area ? (k.areas || []).includes(fa.area) : k.name === fa.place)
          : Ie || (fa.bg && fa.bg !== k.bg)
      )
        continue;
      const ga = fa.when.every((qa) => Pt.has(qa));
      ga && fa.drop && (h = h.map((qa) => (fa.drop.includes(qa.id) ? { ...qa, w: qa.w * Le.DROP } : qa)));
      for (const [qa, ja] of fa.add || []) {
        const pn = fa.evolve ? re(qa, ($a + Fa) / 2, !1, ne) : qa;
        pn <= Nt &&
          !f.isLegend(pn) &&
          !f.DEX[pn]?.baby &&
          (fa.only || Qt.has(pn)) &&
          h.push({
            id: pn,
            min: $a,
            max: Fa,
            w: ma * ja * (ga ? 1 : Le.OFF),
            off: !ga,
            when: fa.when,
            on: ga,
            wOn: ma * ja,
          });
      }
    }
    return h;
  }
  const he = (h) =>
      h?.habitat
        ? h.habitat
        : h?.areas?.length
          ? `${h.name}|${h.areas.join("+")}`
          : h?.species?.length
            ? `${h.name}|species`
            : null,
    fe = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Europe/Paris",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }),
    Oe = () => {
      const h = Object.fromEntries(fe.formatToParts(f.time()).map((k) => [k.type, k.value]));
      return Date.UTC(+h.year, h.month - 1, +h.day) / 864e5;
    },
    Ee = (h) => we(h, Oe()),
    et = (h) => (
      (h = Math.imul(h ^ (h >>> 16), 2146121005)),
      (h = Math.imul(h ^ (h >>> 15), 2221713035)),
      ((h ^ (h >>> 16)) >>> 0) / 4294967296
    ),
    _ = new Map();
  function we(h, k) {
    const ne = h.rare && Math.floor(Date.parse(h.from) / 864e5);
    if (!h.rare || k < ne) return h.zones[(Math.imul(k, 2654435761) >>> 0) % h.zones.length];
    let Ie = _.get(h);
    if (!Ie) {
      const [Le, Pt] = h.gap,
        Nt = h.zones.filter((Qt) => !h.rare.some((ma) => ma.includes(Qt)));
      _.set(
        h,
        (Ie = {
          days: [],
          lo: Le,
          hi: Pt,
          common: Nt,
          round: [],
          seen: 0,
          at: h.rare.map(() => 0),
          next: h.rare.map((Qt, ma) => ne + 2 + ma * 3),
        }),
      );
    }
    for (; Ie.days.length <= k - ne;) {
      const Le = ne + Ie.days.length,
        Pt = Ie.next.indexOf(Le);
      if (Pt >= 0) {
        const Nt = h.rare[Pt],
          Qt = Ie.at[Pt]++;
        Ie.days.push(Nt[Qt % Nt.length]);
        let ma = Le + Ie.lo + Math.floor(et(Pt * 7919 + Qt * 104729 + 1) * (Ie.hi - Ie.lo + 1));
        (Ie.next.includes(ma) && (ma += ma - Le < Ie.hi ? 1 : -1), (Ie.next[Pt] = ma));
      } else {
        if (!Ie.round.length) {
          const Nt = Math.floor(Ie.seen / Ie.common.length),
            Qt = [...Ie.common];
          for (let ma = Qt.length - 1; ma > 0; ma--) {
            const $a = Math.floor(et(Nt * 31337 + ma * 7 + 2) * (ma + 1));
            [Qt[ma], Qt[$a]] = [Qt[$a], Qt[ma]];
          }
          (Qt[0] === Ie.days.at(-1) && ([Qt[0], Qt[1]] = [Qt[1], Qt[0]]), (Ie.round = Qt));
        }
        (Ie.seen++, Ie.days.push(Ie.round.shift()));
      }
    }
    return Ie.days[k - ne];
  }
  const ie = (h, k) => h === k || k?.startsWith(h + "|"),
    U = (h) => h?.type === "wild" && (a.DAILY_SPOTS || []).some((k) => k.honey && ie(Ee(k), he(h))),
    Ne = { 412: { cave: 41201, mountain: 41201, town: 41202 } };
  function T(h) {
    const k = he(h),
      ne = t.HABITATS?.[k] || null,
      Ie = [
        ...(a.DAILY_SPOTS || []).filter((Qt) => ie(Ee(Qt), k)),
        ...Object.entries(a.ZONE_EXTRAS || {})
          .filter(([Qt]) => ie(Qt, k))
          .map(([, Qt]) => Qt),
      ];
    if (!ne || !Ie.length) return ne;
    const Le = { ...ne.base },
      Pt = Object.values(ne.base || {}).reduce((Qt, ma) => Qt + ma, 0),
      Nt = [];
    for (const Qt of Ie) {
      const ma = Qt.pool || { [Qt.id]: 1 },
        $a = Object.values(ma).reduce((fa, ga) => fa + ga, 0),
        Fa = (Pt * Qt.share) / (1 - Qt.share);
      for (const [fa, ga] of Object.entries(ma)) {
        const qa = Ne[fa]?.[h.bg] ?? +fa;
        ((Le[qa] = Math.round(((Le[qa] || 0) + (Fa * ga) / $a) * 100) / 100), Qt.babies && Nt.push(qa));
      }
    }
    return { ...ne, base: Le, allow: Nt };
  }
  function L(h, k, ne, Ie = null) {
    const Le = t.DAYTIME,
      Pt = new Set();
    (Ie
      ? Le?.indoorNode(k) || (Pt.add(Ie.phase), Pt.add(Ie.weather))
      : Le
        ? Le.indoorNode(k) || (Pt.add(Le.phase().key), Pt.add(t.WEATHER?.current(k)))
        : Pt.add("day"),
      Pt.has("morning") && Pt.add("day"));
    const Nt = (rs) => {
        let Ps = 0;
        for (let vs = rs; f.PREVO[vs] && !f.DEX[f.PREVO[vs].from]?.baby; vs = f.PREVO[vs].from) Ps++;
        return Ps;
      },
      Qt = A(k.areas, ne, k.lv),
      ma = k.lv || b.bandOf(ne),
      $a = Qt.filter((rs) => !Nt(rs.id)),
      Fa = $a.length ? $a : Qt,
      fa = Fa.length ? Math.min(...Fa.map((rs) => rs.min)) : (ma?.[0] ?? 2),
      ga = Fa.length ? Math.max(...Fa.map((rs) => rs.max)) : (ma?.[1] ?? 5),
      qa = (rs) => {
        const Ps = Qt.filter((Ts) => Ts.id === rs),
          vs = h.lv?.[rs] ?? Nt(rs) * (a.WILD_EVOLVED_LEVELS || 0),
          ys = (Ts) => Math.min(a.MAX_LEVEL, Ts + vs);
        return Ps.length
          ? { min: ys(Math.min(...Ps.map((Ts) => Ts.min))), max: ys(Math.max(...Ps.map((Ts) => Ts.max))) }
          : { min: ys(fa), max: ys(ga) };
      },
      ja = b.regionOf(ne)?.dex?.[1] ?? 151,
      pn = (rs) =>
        rs <= ja || (t.UNOWN?.isUnown(rs) && ja >= 201) || (t.FORMS?.isForm(rs) && t.FORMS.baseOf(rs) <= ja),
      dn = (rs) => pn(rs) && !f.isLegend(rs) && (!f.DEX[rs]?.baby || h.allow?.includes(rs)),
      _n = h.base || {},
      as = { ..._n },
      Qn = {},
      os = {},
      Ms = new Set();
    for (const [rs, Ps] of Object.entries(h))
      if (rs !== "base" && rs !== "lv" && rs !== "allow")
        for (const [vs, ys] of Object.entries(Ps))
          (vs in _n
            ? (rs === "night" || rs === "day") &&
              ys === 0 &&
              ((Qn[vs] = [rs === "night" ? "day" : "night"]), (os[vs] = _n[vs]))
            : ys > 0 && ((Qn[vs] || (Qn[vs] = [])).push(rs), (os[vs] ??= ys)),
            Pt.has(rs) && (ys === 0 && Ms.add(vs), (as[vs] = _n[vs] > 0 ? (as[vs] * ys) / _n[vs] : ys)));
    for (const rs of Ms) as[rs] = 0;
    const Cs = Object.entries(as)
      .filter(([rs, Ps]) => Ps > 0 && dn(+rs))
      .map(([rs, Ps]) => ({ id: +rs, ...qa(+rs), w: Ps, when: Qn[rs], on: !0 }));
    for (const rs of Object.keys(Qn))
      dn(+rs) &&
        !Cs.some((Ps) => Ps.id === +rs) &&
        Cs.push({ id: +rs, ...qa(+rs), w: 0, off: !0, on: !1, when: Qn[rs], wOn: os[rs] });
    return Cs;
  }
  const R = (h) => {
    const k = t.DAYTIME,
      ne = new Set();
    if (!k || k.indoorNode(h)) return ne;
    const Ie = k.phase().key;
    ne.add(Ie === "morning" ? "day" : Ie);
    const Le = t.WEATHER?.current(h.special ? { ...h, bg: "prairie", climate: null } : h);
    return (Le && ne.add(Le), ne);
  };
  function te(h) {
    const k = {},
      ne = b.CHAPTERS[h].steps,
      Ie = ne.filter((Le) => Le.kind === "route");
    return (
      Ie.forEach((Le, Pt) => {
        if (!Le.wild) return;
        const Nt = {
          name: Le.name,
          bg: Le.bg,
          areas: Le.areas,
          species: Le.species,
          habitat: Le.habitat,
          indoor: Le.indoor,
          climate: Le.climate,
          ch: h,
          lv: Le.lv || b.routeBand(h, Pt, Ie.length),
        };
        for (const Qt of m(Nt, h, !0)) {
          const ma = (k[Qt.id] ||= { id: Qt.id, pct: 0, max: Qt.max, when: Qt.when ? [] : null });
          if (((ma.pct = Math.max(ma.pct, Qt.pct || 0)), (ma.max = Math.max(ma.max, Qt.max)), !Qt.when))
            ma.when = null;
          else if (ma.when) for (const $a of Qt.when) ma.when.includes($a) || ma.when.push($a);
        }
      }),
      Object.values(k)
    );
  }
  const K = (h, k) => {
      const ne = He(h, k);
      return h?.dex ? ne.filter((Ie) => je(Ie.id, h)) : ne;
    },
    He = (h, k) => {
      const ne = T(h);
      if (ne) {
        const Le = L(ne, h, k).filter((Pt) => Pt.w > 0);
        if (Le.length) return Le;
      }
      if (h.special && h.pool) {
        const Le = R(h),
          Pt = h.pool.filter((Nt) => !Nt.when || Nt.when.some((Qt) => Le.has(Qt)));
        if (Pt.length) return Pt;
      }
      if (mt(h)) return yt(mt(h), h, k);
      const Ie = A(h.areas, k, h.lv);
      return Ie.length ? yt(Ie, h, k) : tt(k);
    };
  function m(h, k = B().chapter, ne = !1, Ie = null, Le = !1, Pt = !1) {
    const Nt = T(h),
      Qt =
        !Nt && h?.special && h.pool && h.pool.filter((qa) => !qa.when || qa.when.some((ja) => R(h).has(ja)));
    let ma = Nt
        ? L(Nt, h, k, Ie)
        : Qt?.length
          ? Qt.map((qa) => ({ ...qa, when: void 0 }))
          : (h && mt(h)) || (h && h.areas ? A(h.areas, k, h.lv) : []),
      $a = [];
    (ma.some((qa) => qa.w > 0)
      ? (!Nt && !Qt?.length && (ma = yt(ma, h, k)),
        ($a = ne ? ma.filter((qa) => qa.off) : []),
        (ma = ma.filter((qa) => !qa.off)))
      : (ma = tt(k)),
      Pt && (ma = qe(ma, k)));
    const Fa = ma.reduce((qa, ja) => qa + ja.w, 0) || 1,
      fa = {};
    for (const qa of ma) {
      const ja = fa[qa.id] || (fa[qa.id] = { id: qa.id, w: 0, min: qa.min, max: qa.max, when: qa.when });
      (qa.when || (ja.when = void 0),
        (ja.w += qa.w),
        (ja.min = Math.min(ja.min, qa.min)),
        (ja.max = Math.max(ja.max, qa.max)));
    }
    if (Le && !h?.event)
      for (const qa of Object.values(fa)) {
        const ja = We(qa.id, qa.max, k),
          pn = Pt ? dt(ja) : oe(ja, !0);
        if (pn.length < 2) continue;
        const dn = qa.w;
        for (const { id: _n, p: as } of pn) {
          const Qn =
            fa[_n] || (fa[_n] = { id: _n, w: 0, min: qa.min, max: qa.max, when: qa.when, evolved: !0 });
          _n === qa.id
            ? (Qn.w -= dn * (1 - as))
            : ((Qn.w += dn * as), (Qn.min = Math.min(Qn.min, qa.min)), (Qn.max = Math.max(Qn.max, qa.max)));
        }
      }
    const ga = Object.values(fa)
      .filter((qa) => qa.w > 1e-9)
      .map((qa) => ({ ...qa, pct: qa.w / Fa, on: !0, boost: Pt && Re(qa.id) > 1 }))
      .sort((qa, ja) => ja.pct - qa.pct);
    for (const qa of $a) {
      const ja = qa.wOn / (Fa + qa.wOn),
        pn = Le && !h?.event ? oe(We(qa.id, qa.max, k), !0) : [{ id: qa.id, p: 1 }];
      for (const dn of pn)
        !fa[dn.id] &&
          !ga.some((_n) => _n.id === dn.id) &&
          ga.push({
            id: dn.id,
            min: qa.min,
            max: qa.max,
            when: qa.when,
            on: !1,
            pct: ja * dn.p,
            evolved: dn.id !== qa.id || void 0,
          });
    }
    return ga;
  }
  const z = (h) => {
      const k = f.groupOf(ra(h));
      return (
        f.S.mons
          .filter(
            (ne) =>
              ne.id === h.give &&
              f.groupOf(ne.reg) === k &&
              !f.S.team.includes(ne.uid) &&
              ne.uid !== f.S.buddy?.uid &&
              !ne.shiny,
          )
          .sort((ne, Ie) => ne.level - Ie.level)[0] || null
      );
    },
    pe = (h, k) => `${h}>${k}`;
  function V(h, k) {
    const ne = (f.S.npcOffers ||= []),
      Ie = (b.TOWN_TRADES[h] || [])
        .filter(([Le, Pt]) => !ne.some((Nt) => Nt.give === Le && Nt.get === Pt))
        .map(([Le, Pt]) => ({ give: Le, get: Pt, town: h, reg: b.regionOf(k).key, seen: !1, ready: !1 }));
    return (ne.push(...Ie), Ie);
  }
  const lt = (h) => !!f.S.npcTrades?.includes(pe(h.give, h.get)),
    kt = (h) =>
      b.regionOf(
        Math.max(
          0,
          b.CHAPTERS.findIndex((k) => k.steps.some((ne) => ne.name === h)),
        ),
      ).key,
    ra = (h) => f.homeKey(h.reg || kt(h.town)),
    Vt = () => f.S.npcOffers || [];
  function Xt(h) {
    const k = !lt(h) && z(h);
    if (!k) return null;
    f.S.mons = f.S.mons.filter((Pt) => Pt.uid !== k.uid);
    const ne = f.makeMon(h.get, k.level);
    ((ne.where = h.town), (ne.how = "npc"), (ne.hp = f.maxHp(ne)));
    const Ie = f.receive(ne, { home: ra(h) }),
      Le = { got: ne, gave: k, isNew: !!Ie.isNew, dup: Ie.dup || null };
    return (
      (f.S.npcTrades ||= []).push(pe(h.give, h.get)),
      (f.S.stats.trades = (f.S.stats.trades || 0) + 1),
      f.save(),
      Le
    );
  }
  function Ht(h, k) {
    if (!h.item?.endsWith("-stone")) return h;
    const ne = (f.S.stonesFound ||= {}),
      Ie = b.regionOf(k).key,
      Le = "r:" + Ie;
    ne[Le] ||
      (ne[Le] = [
        ...new Set(
          Object.entries(ne)
            .filter(([Nt]) => !Nt.startsWith("r:") && b.regionOf(+Nt)?.key === Ie)
            .flatMap(([, Nt]) => Nt),
        ),
      ]);
    const Pt = ne[Le];
    return Pt.includes(h.item) ? { money: ue(...a.STONE_SPENT_MONEY) } : (Pt.push(h.item), h);
  }
  function ct(h) {
    const k = b.ITEM_TABLE.map(([Ie, Le]) => [gt(Ie, Le.item, h), Le]),
      ne = k.reduce((Ie, Le) => Ie + Le[0], 0);
    return k.filter(([Ie, Le]) => Ie > 0 && !Le.stone).map(([Ie, Le]) => ({ ...Le, p: Ie / ne }));
  }
  const wt = (h) => {
    const k = b.regionOf(h);
    return b
      .chaptersOf(k.key)
      .filter((ne) => ne < h && b.CHAPTERS[ne].steps.some((Ie) => Ie.kind === "gym" && Ie.badge)).length;
  };
  function ge(h) {
    const k = b.CHAPTERS[h];
    if (k.league || wt(h) < (a.EXP_CANDIES["exp-candy-big"]?.badges ?? 8)) return null;
    const ne = k.steps.filter((Ie) => Ie.kind === "heal");
    return ne.some((Ie) => b.TOWNS.includes(Ie.name)) ? null : ne[0] || null;
  }
  function Fe(h) {
    const k = a.TOWN_EVENT,
      ne = b.CHAPTERS[h],
      Ie = ne.league
        ? 0
        : new Set(
            ne.steps.filter((ga) => ga.kind === "heal" && b.TOWNS.includes(ga.name)).map((ga) => ga.name),
          ).size + (ge(h) ? 1 : 0),
      Le = (k.chance * k.weights.item) / Object.values(k.weights).reduce((ga, qa) => ga + qa, 0),
      Pt = Object.entries(k.itemWeights).map(([ga, qa]) => [ga, gt(qa, ga, h)]),
      Nt = Pt.reduce((ga, [, qa]) => ga + qa, 0),
      Qt = wt(h),
      ma = a.SHOP.filter(
        (ga) => ga.id.startsWith("exp-candy") && f.shopUnlocked(ga) && f.shopBadges(ga) <= Qt,
      ).reverse(),
      $a = k.candySizes.slice(0, Math.max(1, ma.length)),
      Fa = $a.reduce((ga, qa) => ga + qa, 0),
      fa = [];
    for (const [ga, qa] of Pt)
      !qa ||
        ga === "stone" ||
        (ga === "expCandy"
          ? $a.forEach((ja, pn) =>
              fa.push({ item: ma[pn]?.id || "exp-candy-s", p: (((Le * qa) / Nt) * ja) / Fa }),
            )
          : fa.push({ item: ga, p: (Le * qa) / Nt }));
    return { towns: Ie, list: fa };
  }
  const gt = (h, k, ne) => (wt(ne) < (a.BERRY_BADGES[k] || 0) ? 0 : h);
  function Dt(h, k, ne, Ie) {
    const Le = a.TOWN_EVENT;
    if (Math.random() >= Le.chance) return null;
    const Pt = Object.entries(
      Ie ? { ...Le.weights, money: Le.weights.money + Le.weights.rare, rare: 0 } : Le.weights,
    ).filter(([, os]) => os > 0);
    let Nt = Math.random() * Pt.reduce((os, Ms) => os + Ms[1], 0),
      Qt = Pt[0][0];
    for (const [os, Ms] of Pt)
      if (((Nt -= Ms), Nt <= 0)) {
        Qt = os;
        break;
      }
    const ma = { ...h, town: !0 };
    if (Qt === "money") return { ...ma, type: "item", find: { money: ue(...Le.money) } };
    if (Qt === "item") {
      const os = wt(k),
        Ms = a.SHOP.filter(
          ($s) => $s.id.startsWith("exp-candy") && f.shopUnlocked($s) && f.shopBadges($s) <= os,
        ).reverse(),
        Cs = Le.candySizes.slice(0, Math.max(1, Ms.length));
      let rs = Math.random() * Cs.reduce(($s, qs) => $s + qs, 0),
        Ps = 0;
      for (const [$s, qs] of Cs.entries())
        if (((rs -= qs), rs <= 0)) {
          Ps = $s;
          break;
        }
      const vs = Ms[Ps]?.id || "exp-candy-s",
        ys = Object.entries(Le.itemWeights).map(([$s, qs]) => [$s, gt(qs, $s, k)]);
      let Ts = Math.random() * ys.reduce(($s, [, qs]) => $s + qs, 0),
        js = ys[0][0];
      for (const [$s, qs] of ys)
        if (((Ts -= qs), Ts <= 0)) {
          js = $s;
          break;
        }
      const As = js === "expCandy" ? vs : js === "stone" ? H(f.shopStones(k)) : js;
      return { ...ma, type: "item", find: { item: As, n: js === "expCandy" ? ue(1, 3) : 1 } };
    }
    const $a = b.CHAPTERS[k].steps.filter((os) => os.veil && !B().gifts?.[os.veil.after]),
      Fa = $a.flatMap((os) => os.veil.types || []),
      fa = $a.flatMap((os) => os.veil.ids || []),
      ga = te(k).filter((os) => !Fa.some((Ms) => f.DEX[os.id].types.includes(Ms)) && !fa.includes(os.id));
    if (!ga.length) return null;
    const qa = b.CHAPTERS[k].steps,
      ja = qa.filter((os) => os.kind === "route"),
      pn = Math.max(0, qa.indexOf(ne)),
      dn =
        qa
          .slice(0, pn)
          .filter((os) => os.kind === "route")
          .pop() || qa.slice(pn).find((os) => os.kind === "route"),
      _n = dn && (dn.lv || b.routeBand(k, ja.indexOf(dn), ja.length)),
      as = ga.map((os) => os.max).sort((os, Ms) => os - Ms),
      Qn = Math.min(a.MAX_LEVEL, b.levelCap(B()), (_n ? _n[1] : as[as.length >> 1]) + Le.rareAbove);
    return {
      ...ma,
      type: "wild",
      special: !0,
      pool: ga.map((os) => ({
        id: os.id,
        min: Qn,
        max: Qn,
        when: os.when || void 0,
        w: (1 - os.pct) ** 4 * (f.S.dex[os.id] ? 1 : Le.newBonus),
      })),
    };
  }
  function ha(h, k, ne) {
    const Ie = a.GYM_TRAINERS,
      Le = ne.ace ?? (b.aceOf(k) != null ? b.aceOf(k) + (ne.aceOffset || 0) : null);
    if (!ne.badge || ne.champion || b.CHAPTERS[k].league || Le == null) return [];
    const Pt = b.regionOf(k).key,
      Nt = b
        .chaptersOf(Pt)
        .filter((Fa) => Fa <= k && b.CHAPTERS[Fa].steps.some((fa) => fa.kind === "gym" && fa.badge)).length,
      Qt = Ie.counts[Math.min(Nt, Ie.counts.length) - 1],
      ma = {};
    for (const Fa of tt(k))
      f.DEX[Fa.id].types.includes(ne.type) &&
        !f.DEX[Fa.id].legendary &&
        !f.DEX[Fa.id].mythical &&
        (ma[Fa.id] = (ma[Fa.id] || 0) + Fa.w);
    const $a = Math.max(1, ...Object.values(ma));
    for (const [Fa] of b.gymTeam(k, ne)) ma[J(Fa)] ??= $a;
    return Array.from({ length: Qt }, (Fa, fa) => {
      const ga = Le - Ie.below[Math.min(fa, Ie.below.length - 1)],
        qa = [ga, ga];
      return {
        ...h,
        type: "trainer",
        gymTrainer: !0,
        classes: b.GYM_CLASSES[ne.sprite],
        pool: Object.entries(ma).map(([ja, pn]) => ({ id: +ja, min: ga, max: ga, w: pn })),
        lv: qa,
      };
    });
  }
  function _t(h) {
    const k = B(),
      ne = b.leagueOf(h);
    if (h === ne[0] || !k.leaguePlan?.[h]) {
      k.leaguePlan = {};
      for (const Ie of ne) {
        const Le = b.CHAPTERS[Ie].steps.find((Qt) => Qt.kind === "route"),
          Pt = { name: Le.name, bg: Le.bg, areas: Le.areas, ch: Ie },
          Nt = b.classesOf(Ie, Le.classes).filter((Qt) => !/rocket/.test(Qt.sprite));
        k.leaguePlan[Ie] = a.LEAGUE_TRAINERS.below.map(
          () => b.trainerFor(Nt, K(Pt, Ie), (Qt) => f.DEX[Qt].types).cls.sprite,
        );
      }
    }
    return k.leaguePlan[h];
  }
  const Ea = (h, k) => {
    const ne = b.CHAPTERS[h].steps.find((Ie) => Ie.kind === "gym");
    return t.LEAGUE_TEAMS?.[`${b.regionOf(h).key}:${ne?.leader}`]?.[k] || null;
  };
  function ut(h, k, ne) {
    const Ie = a.LEAGUE_TRAINERS,
      Le = b.aceOf(k),
      Pt = _t(k);
    return Ie.below.map((Nt, Qt) => {
      const ma = Ea(k, Qt);
      return {
        ...h,
        type: "trainer",
        league: !0,
        areas: ne.areas,
        classes: ne.classes,
        lv: [Le - Nt, Le - Nt],
        size: Ie.sizes[Qt],
        sprite: ma?.sprite || Pt[Qt],
        ...(ma ? { team: ma.team.map(($a) => [$a, Le - Nt]), trainer: ma.name } : {}),
      };
    });
  }
  function jt(h, k = !1) {
    const ne = B(),
      Ie = b.CHAPTERS[h],
      Le = f.time(),
      Pt = f.now(),
      Nt =
        !(Pt - (ne.townAny || 0) < a.TOWN_EVENT.minMs && Pt >= (ne.townAny || 0)) &&
        (k || !(Le - (ne.townAt || 0) < a.TOWN_EVENT.pickedMs));
    let Qt = !1;
    f.enterRegion(b.regionOf(h).key);
    const ma = [],
      $a = Ie.steps.filter((ga) => ga.kind === "route");
    for (const ga of Ie.steps) {
      if (ga.tide && (ga.tide === "low") !== b.lowTide()) continue;
      const qa = {
        name: ga.name,
        bg: ga.bg,
        fallback: ga.fallback,
        scene: ga.scene,
        indoor: ga.indoor,
        climate: ga.climate,
        habitat: ga.habitat,
        loot: ga.loot,
        ch: h,
        ...(ga.tides || ga.tide ? { tides: !0 } : {}),
      };
      if (ga.kind === "route" && Ie.league) ma.push(...ut(qa, h, ga));
      else if (ga.kind === "route") {
        const ja = ga.lv || b.routeBand(h, $a.indexOf(ga), $a.length);
        (ja && (qa.lv = ja),
          ga.species && (qa.species = ga.species),
          ga.veil &&
            !ne.gifts[ga.veil.after] &&
            ((qa.veil = ga.veil.types || []), (qa.veilIds = ga.veil.ids)));
        const pn = [];
        for (let dn = 0; dn < ga.wild; dn++) pn.push({ ...qa, type: "wild", areas: ga.areas });
        for (let dn = 0; dn < ga.trainers; dn++)
          pn.splice(ue(Math.min(1, pn.length), pn.length), 0, {
            ...qa,
            type: "trainer",
            areas: ga.areas,
            classes: ga.classes,
          });
        (ga.item &&
          Math.random() < a.ITEM_EVENT_CHANCE &&
          pn.splice(ue(0, pn.length), 0, { ...qa, type: "item" }),
          ga.candy &&
            !ne.gifts[ga.candy] &&
            pn.splice(ue(0, pn.length), 0, {
              ...qa,
              type: "item",
              find: { item: "rare-candy", once: ga.candy },
            }),
          ma.push(...pn));
      } else if (ga.kind === "heal") {
        const ja = ga === ge(h) && !ma.some((pn) => pn.town);
        if (
          !Ie.league &&
          (ja || b.TOWNS.includes(ga.name)) &&
          !ma.some((pn) => pn.town && pn.name === ga.name)
        ) {
          const pn = Nt && Dt(qa, h, ga, ja);
          pn && (ma.push(pn), (Qt = !0));
        }
        ma.push({ ...qa, type: "heal", bg: "pokecenter", fallback: ga.bg });
      } else if (ga.kind === "gift")
        !ne.gifts[ga.gift.key] &&
          !(ga.badge && !ne.badges?.includes(ga.badge)) &&
          ma.push({ ...qa, type: "gift", gift: { ...ga.gift, level: b.levelAt(h, ga.gift.level) } });
      else if (ga.kind === "trade") {
        const ja = ga.offers.filter(([pn]) => f.itemCount(pn) > 0);
        ja.length &&
          ma.push({
            ...qa,
            type: "gift",
            gift: {
              key: "trade:" + ga.name,
              choices: ja.map((pn) => pn[1]),
              trade: Object.fromEntries(ja.map(([pn, dn]) => [dn, pn])),
              level: b.levelAt(h, ga.level, !0),
              text: ga.text,
            },
          });
      } else if (ga.kind === "egg")
        ne.gifts[ga.once] ||
          ma.push({ ...qa, type: "item", find: { egg: ga.id, once: ga.once, text: ga.text } });
      else if (ga.kind === "unlock")
        ne.gifts[ga.once] || ma.push({ ...qa, type: "unlock", once: ga.once, text: ga.text });
      else if (ga.kind === "find")
        ne.gifts[ga.once] || ma.push({ ...qa, type: "item", find: { item: ga.item, once: ga.once } });
      else if (ga.kind === "static")
        !(ga.once && ne.gifts[ga.once]) &&
          !(ga.needs && f.itemCount(ga.needs) < (ga.needN || 1)) &&
          !(ga.after && !ne.gifts[ga.after]) &&
          !(ga.night && t.DAYTIME && t.DAYTIME.phase().key !== "night") &&
          !(ga.day && t.DAYTIME && t.DAYTIME.phase().key === "night") &&
          !(ga.skies && !ga.skies.includes(t.WEATHER?.current(qa))) &&
          !(ga.caught && !ga.caught.every((ja) => f.S.dex[ja])) &&
          !(ga.chance && Math.random() >= ga.chance) &&
          ma.push({
            ...qa,
            type: "static",
            id: ga.id,
            level: b.staticLevel(h, ga),
            shiny: ga.shiny,
            once: ga.once,
            rate: ga.rate,
            text: ga.text,
            power: ga.power,
            spirit: ga.spirit,
            reward: ga.reward,
            ...(ga.needN ? { pay: [ga.needs, ga.needN] } : {}),
            ...("weather" in ga ? { weather: ga.weather } : {}),
          });
      else if (ga.kind === "trainer")
        ma.push({
          ...qa,
          type: "trainer",
          sprite: ga.sprite,
          trainer: ga.trainer,
          team: b.trainerTeam(h, ga),
        });
      else if (ga.kind === "gym") {
        if (ga.keep && ne.kept?.[h]?.includes(ga.leader)) continue;
        (ma.push(...ha(qa, h, ga)), ma.push({ ...qa, type: "gym", gym: ga }));
      }
    }
    const Fa = Ie.league ? null : t.Roaming?.at(h),
      fa = Fa ? ma.filter((ga) => ga.type === "wild" && !t.DAYTIME?.indoorNode(ga)) : [];
    (fa.length && (fa[ue(0, fa.length - 1)].roamer = Fa),
      Object.assign(ne, { chapter: h, nodes: ma, node: 0, battle: null, pending: null }),
      Qt && ((ne.townAny = Pt), k || (ne.townAt = Le)),
      (ne.zone = null),
      (ne.league = null),
      (ne.tower = null));
  }
  function xt(h) {
    const k = $();
    return h < 0 || h > k.unlocked || h >= b.CHAPTERS.length
      ? !1
      : (D(), (k.event = null), jt(h), f.healTeam(), f.save(), !0);
  }
  function D() {
    B().battle = null;
  }
  function Q() {
    const h = B().event;
    (Object.assign(B(), {
      nodes: h.raid ? t.Raids.buildRun(h) : t.Events.buildRun(t.Events.get(h.seq)),
      node: 0,
      battle: null,
      pending: null,
    }),
      (B().event.loopMs = 0),
      (B().event.loopSteps = 0),
      (B().event.loopAway = 0),
      (B().event.runMs = 0));
  }
  function Y() {
    const h = B()?.event,
      k = h && !h.raid && t.Events.legendOf(h.id)?.flee;
    return k ? Math.max(0, k * 1e3 - (h.runMs || 0)) : null;
  }
  function ye(h) {
    const k = $(),
      ne = h != null ? t.Events.get(h) : t.Events.cur;
    return !ne || !t.Events.isOpen(ne.seq)
      ? !1
      : (k.event?.seq === ne.seq ||
          (D(),
          (k.tower = null),
          (k.event = {
            seq: ne.seq,
            id: ne.id,
            level: a.EVENT.LEVEL,
            back: k.event?.back ?? k.chapter,
            loops: 0,
          }),
          Q(),
          f.healTeam(),
          f.save()),
        !0);
  }
  function nt(h) {
    const k = $();
    if (k.event?.raid && k.event.reg === h && k.event.date === t.Raids.dateKey()) return !0;
    const ne = t.Raids.prepare(h);
    if (!ne) return !1;
    D();
    const Ie = k.league?.back ?? k.zone?.back ?? k.event?.back ?? k.chapter;
    return (
      (k.zone = null),
      (k.tower = null),
      (k.league = null),
      (k.event = { ...ne, back: Ie, loops: t.Raids.tried(ne.reg, ne.date) }),
      Q(),
      f.healTeam(),
      f.save(),
      !0
    );
  }
  function Ot() {
    const h = B();
    if (!h.event) return;
    const k = h.event.back,
      ne = h.event.raid;
    ((h.event = null), ne && t.Raids.clear(), jt(k), f.healTeam(), f.save());
  }
  const ee = (h = B()) => (h?.tower?.kind === "candy" ? t.CandyRun : t.Tower);
  function rt() {
    const h = ee();
    Object.assign(B(), { nodes: [h.floorNode(h.run().floor)], node: 0, battle: null, pending: null });
  }
  function Qe(h = !1, k = "tower", ne = 1) {
    const Ie = $(),
      Le = k === "candy",
      Pt = Le ? t.CandyRun : t.Tower;
    if (!Pt || (!Pt.unlocked() && !h) || (!Le && t.Cloud?.hold && !h)) return !1;
    if (Ie.tower) return (Ie.tower.kind || "tower") === k;
    if (Le && !Pt.run() && !Pt.newRun(ne)) return !1;
    D();
    const Nt = Ie.league?.back ?? Ie.zone?.back ?? Ie.event?.back ?? Ie.chapter;
    return (
      Ie.event?.raid && t.Raids.clear(),
      (Ie.zone = null),
      (Ie.event = null),
      (Ie.league = null),
      Le || Pt.resume(),
      (Ie.tower = Le ? { back: Nt, kind: k } : { back: Nt }),
      rt(),
      f.save(),
      !0
    );
  }
  function Ft(h = !1) {
    const k = B();
    if (!k.tower) return null;
    const ne = k.tower.back,
      Ie = ee(k);
    k.tower = null;
    const Le = h ? null : Ie.finish();
    return (jt(ne), f.healTeam(), f.save(), Le);
  }
  function Ye(h = !1) {
    const k = B(),
      ne = ee(),
      Ie = k.tower.kind || "tower",
      Le = ne.left(),
      Pt = ne.cleared(),
      Nt = {
        type: "towerFloor",
        kind: Ie,
        floor: Pt.floor,
        record: Pt.record,
        bp: Pt.bp,
        ...(Pt.step ? { step: Pt.step } : {}),
        ...(Pt.got ? { got: Pt.got, camp: Pt.camp, ...(h ? { drop: h, node: k.nodes[k.node] } : {}) } : {}),
      };
    return !ne.run() || !ne.left()
      ? Ie === "candy"
        ? [Nt, ...bt()]
        : bt()
      : (rt(),
        f.save(),
        t.Update?.between(),
        [{ ...Nt, next: ne.run().floor, left: ne.left(), rested: Math.max(0, Le - ne.left()) }]);
  }
  function bt() {
    const h = B().tower?.kind || "tower",
      k = Ft();
    return [
      {
        type: "towerEnd",
        kind: h,
        floor: k?.floor ?? 0,
        best: h === "candy" ? t.CandyRun.best() : (k?.best?.floor ?? 0),
        ...(h === "candy" ? { got: k?.got || {}, from: k?.from } : {}),
      },
    ];
  }
  function Yt() {
    const h = t.LegendZones.get(B().zone.id);
    if (B().zone.riddle) {
      const Nt = t.LegendZones.riddle(B().zone.riddle);
      Object.assign(B(), {
        nodes: [
          {
            name: Nt.place,
            bg: h.bg,
            fallback: h.fallback,
            scene: Nt.scene,
            ch: B().zone.back,
            type: "riddle",
            riddle: Nt,
          },
        ],
        node: 0,
        battle: null,
        pending: null,
      });
      return;
    }
    const k = {
        name: h.zone,
        bg: h.bg,
        fallback: h.fallback,
        scene: h.scene,
        sky: h.sky,
        habitat: h.habitat,
        ch: B().zone.back,
        ...("weather" in h ? { weather: h.weather } : {}),
      },
      ne = a.LEGEND_ZONE,
      Ie = B().zone.elite,
      Le =
        !Ie && h.areas?.length
          ? Array.from({ length: ne.WILD }, () => ({
              ...k,
              type: "wild",
              way: !0,
              dexCh: b.firstChapterOf(h.region),
              dex: [1, h.dex[1]],
              areas: h.areas,
              lv: [h.level - ne.WILD_LV[0], h.level - ne.WILD_LV[1]],
            }))
          : [],
      Pt = B().zone.foe ?? h.id;
    Object.assign(B(), {
      nodes: [
        ...Le,
        {
          ...k,
          type: "static",
          id: Pt,
          level: Ie ? a.MAX_LEVEL : h.level,
          zone: h.id,
          ...(Ie ? { elite: Ie } : {}),
          text: e("{name} t'attend !", { name: f.DEX[Pt].name }),
        },
      ],
      node: 0,
      battle: null,
      pending: null,
    });
  }
  function wa(h) {
    const k = (f.S.legTries ||= {});
    k[h] = (k[h] || 0) + 1;
  }
  function pa(h, k, ne, Ie) {
    const Le = f.S.elite?.[h];
    if (Le && Le.t >= k) return null;
    const Pt = (Ie || [])
        .map((ma) => f.getMon(ma))
        .filter(Boolean)
        .map((ma) => ({ id: ma.id, rank: f.rankOf(ma), uid: ma.uid })),
      Nt = f.time();
    (f.S.elite ||= {})[h] = { t: k, at: Nt, ats: { ...Le?.ats, [k]: Nt }, team: Pt };
    const Qt = t.LegendZones.eliteReward(k);
    if (Qt === "gem") {
      const ma = t.LegendZones.eliteGem(ne),
        $a = (f.S.under ||= { day: null, sent: 0, used: {}, slots: [] });
      return (
        (($a.gems ||= {})[ma] = ($a.gems[ma] || 0) + 1),
        ($a.eliteGems = ($a.eliteGems || 0) + 1),
        { gem: ma }
      );
    }
    return Qt === "frame" ? { frame: k } : {};
  }
  function Gt(h, k) {
    const ne = $(),
      Ie = t.LegendZones,
      Le = Ie?.get(h),
      Pt = Le && Ie.state(Le);
    if (k ? !Ie.eliteOpen(Le) || !Ie.eliteCan(h, k) : Pt !== "open" && Pt !== "sealed") return !1;
    D();
    const Nt = ne.league?.back ?? ne.zone?.back ?? ne.event?.back ?? ne.chapter;
    return (
      (ne.event = null),
      (ne.tower = null),
      (ne.league = null),
      (ne.zone = k
        ? { id: h, foe: Ie.eliteFoe(Le), level: a.MAX_LEVEL, back: Nt, elite: k }
        : Pt === "sealed"
          ? { id: h, riddle: Le.cond.key, level: Le.level, back: Nt }
          : { id: h, foe: Ie.foe(Le), level: Le.level, back: Nt }),
      Le.wb && t.WorldBoss?.newTry(),
      Yt(),
      f.healTeam(),
      f.save(),
      !0
    );
  }
  const N = (h) => b.chaptersOf(h).filter((k) => b.CHAPTERS[k].league);
  function W() {
    const h = B(),
      { reg: k, tier: ne } = h.league,
      Ie = a.ELITE.LEAGUE;
    f.enterRegion(k);
    const Le = [];
    for (const Pt of N(k)) {
      const Nt = b.CHAPTERS[Pt].steps,
        Qt = Nt.find((Fa) => Fa.kind === "heal"),
        ma = Nt.find((Fa) => Fa.kind === "gym");
      if (!ma) continue;
      const $a = { name: ma.name, bg: ma.bg, fallback: ma.fallback, scene: ma.scene, ch: Pt };
      (Qt && Le.push({ ...$a, name: Qt.name, type: "heal", bg: "pokecenter", fallback: Qt.bg }),
        Le.push({
          ...$a,
          type: "gym",
          gym: { ...ma, badge: null, keep: !1, power: (ma.power || 1) * (Ie.POWER[ne] ?? 1) },
          leagueElite: ne,
          team: ma.team.map(([Fa]) => [Fa, a.MAX_LEVEL]),
        }));
    }
    Object.assign(h, { nodes: Le, node: 0, battle: null, pending: null });
  }
  function ze(h, k, ne) {
    const Ie = f.S.eliteLeague?.[h];
    if (Ie && Ie.t >= k) return null;
    const Le = (ne || [])
        .map((Nt) => f.getMon(Nt))
        .filter(Boolean)
        .map((Nt) => ({ id: Nt.id, rank: f.rankOf(Nt), uid: Nt.uid })),
      Pt = f.time();
    return (
      ((f.S.eliteLeague ||= {})[h] = {
        t: k,
        at: Pt,
        ats: { ...Ie?.ats, [k]: Pt },
        team: Le,
        gems: { ...Ie?.gems, [k]: null },
      }),
      { gem: !0, ...(a.ELITE.LEAGUE.FRAMES.includes(k) ? { frame: k } : {}) }
    );
  }
  function qt(h, k) {
    const ne = $(),
      Ie = t.LegendZones;
    if (!Ie?.leagueOpen(h) || !Ie.leagueCan(h, k) || !N(h).length) return !1;
    D();
    const Le = ne.league?.back ?? ne.zone?.back ?? ne.event?.back ?? ne.chapter;
    return (
      ne.event?.raid && t.Raids.clear(),
      (ne.event = null),
      (ne.zone = null),
      (ne.tower = null),
      (ne.league = { reg: h, tier: k, back: Le, tries: 1 }),
      W(),
      f.healTeam(),
      (ne.league.team = [...f.S.road]),
      f.save(),
      !0
    );
  }
  function Lt() {
    const h = B();
    h.league && (jt(h.league.back), f.healTeam(), f.save());
  }
  function zt() {
    const h = B();
    if (!h.zone) return;
    const k = h.zone.back;
    (jt(k), f.healTeam(), f.save());
  }
  const ca = (h) => {
    const k = t.Events.get(h);
    return k ? k.by || "time" : t.Events.state.last?.seq === h ? t.Events.state.last.by : "time";
  };
  function Ma(h, k, ne = !1) {
    let Ie = 1;
    for (const Le of k) Ie *= t.TYPE_CHART[h]?.[Le] ?? 1;
    return ne ? Ie : Math.min(a.TYPE_EFF_MAX, Math.max(a.TYPE_EFF_MIN, Ie));
  }
  const Na = 132,
    Va = (h) => (h.status !== "burn" ? 1 : h.rageMax != null ? a.BOSS_STATUS.BURN_ATK : 0.5);
  function Ba() {
    const h = t.MOVES.struggle;
    return {
      key: "struggle",
      name: h.name,
      type: h.type,
      cat: h.cat,
      power: f.movePower("struggle"),
      acc: f.moveAcc("struggle"),
      typeless: !0,
    };
  }
  function za(h, k) {
    Array.isArray(k) || (k = [k]);
    const ne = f.DEX[h.id].types,
      Ie = f.statsOf(h),
      Le = B()?.nodes?.[B().node],
      Pt = k.map((ga) => ({ types: f.DEX[ga.id].types, sd: f.statsOf(ga) })),
      Nt = {},
      Qt = (ga) => (Nt[ga] ??= t.WEATHER?.damageMult(Le, ga) ?? 1);
    let ma = null,
      $a = 0,
      Fa = !1;
    for (const [ga, qa] of f.learnOf(h)) {
      if (ga > h.level || a.MOVE_BLACKLIST.includes(qa)) continue;
      const ja = t.MOVES[qa],
        pn = ja ? f.movePower(qa) : 0;
      if (pn <= 0) continue;
      Fa = !0;
      const dn = ja.cat === "phys",
        _n = dn ? Ie.atk * Va(h) : Ie.spa,
        as = (f.moveAcc(qa) / 100) * (ne.includes(ja.type) ? 1.5 : 1) * Qt(ja.type);
      let Qn = 0;
      for (const { types: os, sd: Ms } of Pt)
        Qn +=
          ((((2 * f.lvl(h)) / 5 + 2) * pn * _n) / Math.max(1, dn ? Ms.def : Ms.spd) / 50 + 2) *
          as *
          Ma(ja.type, os);
      Qn > $a && (($a = Qn), (ma = qa));
    }
    if (!ma) return Fa ? Ba() : f.bestMoveAgainst(h, Pt[0].types);
    const fa = t.MOVES[ma];
    return { key: ma, name: fa.name, type: fa.type, cat: fa.cat, power: f.movePower(ma), acc: f.moveAcc(ma) };
  }
  function vn(h, k, ne = null) {
    !ne && h.id === Na && k.id !== Na && (h = { ...h, id: k.id });
    const Ie = ne || za(h, k),
      Le = { move: Ie, damage: 0, miss: !1, crit: !1, eff: 1, nothing: !1 };
    if (Ie.power <= 0) return ((Le.nothing = !0), Le);
    if (Math.random() * 100 > Ie.acc) return ((Le.miss = !0), Le);
    if (((Le.eff = Ie.typeless ? 1 : Ma(Ie.type, f.DEX[k.id].types)), Le.eff === 0)) return Le;
    const Pt = Ie.typeless ? null : f.hitPowers(Ie.key);
    return Pt
      ? ((Le.hits = Pt.map((Nt) => {
          const Qt = Math.random() < a.CRIT_CHANCE;
          return { d: xn(h, k, { ...Ie, power: Nt }, Le.eff, Qt, 0.85 + Math.random() * 0.15), crit: Qt };
        })),
        An(Le),
        Le)
      : ((Le.crit = Math.random() < a.CRIT_CHANCE),
        (Le.damage = xn(h, k, Ie, Le.eff, Le.crit, 0.85 + Math.random() * 0.15)),
        Le);
  }
  const An = (h) => {
    ((h.damage = h.hits.reduce((k, ne) => k + ne.d, 0)), (h.crit = h.hits.some((k) => k.crit)));
  };
  function on(h, k) {
    if (h.damage) {
      if (!h.hits) {
        h.damage = Math.max(1, Math.round(h.damage * k));
        return;
      }
      for (const ne of h.hits) ne.d = Math.max(1, Math.round(ne.d * k));
      An(h);
    }
  }
  function qn(h, k) {
    if (!h.hits || !h.damage) return;
    let ne = (h.from = f.curHp(k)),
      Ie = 0;
    for (; Ie < h.hits.length && ne > 0;) ne -= h.hits[Ie++].d;
    ((h.hits.length = Ie), An(h));
  }
  function xn(h, k, ne, Ie, Le, Pt) {
    const Nt = f.statsOf(h),
      Qt = f.statsOf(k),
      ma = ne.cat === "phys",
      $a = ma ? Nt.atk * Va(h) : Nt.spa,
      Fa = ma ? Qt.def : Qt.spd,
      fa = ne.typeless
        ? 1
        : (f.DEX[h.id].types.includes(ne.type) ? 1.5 : 1) *
          (t.WEATHER?.damageMult(B().nodes?.[B().node], ne.type) ?? 1),
      ga = (((2 * f.lvl(h)) / 5 + 2) * ne.power * $a) / Fa / 50 + 2,
      qa = a.LEVEL_GAP ** (f.lvl(h) - f.lvl(k));
    return Math.max(1, Math.floor(ga * fa * Ie * qa * (Le ? a.CRIT_MULT : 1) * Pt));
  }
  const fn = (h) =>
    h.kind === "gym" ? a.GYM_DAMAGE * (h.gym.power || 1) : (a.ENEMY_DAMAGE[h.kind] ?? 1) * (h.power || 1);
  function Yn(h, k, ne, Ie) {
    const Le = k.id === Na && ne.id !== Na ? { ...k, id: ne.id } : k,
      Pt = f.curHp(ne),
      Nt = f.DEX[ne.id].types,
      Qt = Ie ? 1 : fn(h);
    let ma = null;
    for (const [$a, Fa] of f.learnOf(Le)) {
      if ($a > Le.level || a.MOVE_BLACKLIST.includes(Fa)) continue;
      const fa = t.MOVES[Fa],
        ga = fa ? f.movePower(Fa) : 0;
      if (ga <= 0) continue;
      const qa = { key: Fa, name: fa.name, type: fa.type, cat: fa.cat, power: ga, acc: f.moveAcc(Fa) },
        ja = Ma(fa.type, Nt);
      if (ja === 0) continue;
      const pn = xn(Le, ne, { ...qa, power: f.minPower(Fa) }, ja, !1, 0.85);
      (Ie ? pn : Math.max(1, Math.round(pn * Qt))) < Pt ||
        ((!ma || qa.acc > ma.acc || (qa.acc === ma.acc && ga > ma.power)) && (ma = qa));
    }
    return ma && { att: Le, mv: ma };
  }
  const Zn = (h) => {
    const k = f.statsOf(h);
    return k.hp + k.atk + k.def + k.spa + k.spd + k.spe;
  };
  function is(h, k) {
    const ne = a.TYPE_POWER,
      Ie = f.DEX[h.id].types,
      Le = f.DEX[k.id].types,
      Pt = f.bestMoveAgainst(h, Le),
      Nt = Pt.power > 0 ? Ma(Pt.type, Le, !0) : 1,
      Qt = Math.max(...Le.map((ma) => Ma(ma, Ie, !0)));
    return (
      (Nt === 0 ? ne.immune : Nt > 1 ? ne.strong : Nt < 1 ? ne.weak : 0) +
      (Qt > 1 ? ne.exposed : Qt < 1 ? ne.resists : 0)
    );
  }
  const ts = (h) => (h - 35) / 9.4,
    Jn = (h, k, ne = 1) =>
      h.reduce(
        (Ie, Le) =>
          Ie +
          ts(Zn(Le.m) * ne * (0.5 + 0.5 * Le.h)) +
          k.reduce((Pt, Nt) => Pt + is(Le.m, Nt.m), 0) / k.length,
        0,
      ) / h.length,
    On = (h) =>
      h.reduce((k, ne) => k + f.statsOf(ne.m).spe * (ne.m.status === "paralysis" ? 0.25 : 1), 0) / h.length,
    Me = (h, k) => Math.min(a.SPEED_WEAR[1], Math.max(a.SPEED_WEAR[0], Math.sqrt(On(k) / On(h))));
  function It(h, k, ne, Ie = 1, Le = 1, Pt = null) {
    const Nt = Pt ?? (a.ENCOUNTER_EDGE[ne] || 0) * (ne === "gym" ? Math.min(1, k.length / a.TEAM_SIZE) : 1),
      Qt = h.map((fa) => ({ m: fa, h: f.curHp(fa) / f.maxHp(fa) })).filter((fa) => fa.h > 0),
      ma = k.map((fa) => ({ m: fa, h: f.curHp(fa) / f.maxHp(fa) })).filter((fa) => fa.h > 0),
      $a = new Map();
    let Fa = 0;
    for (let fa = 0; fa < a.DUEL_RUNS; fa++) {
      const ga = Qt.map((ja) => ({ ...ja })),
        qa = ma.map((ja) => ({ ...ja }));
      for (; ga.length && qa.length;) {
        const ja = ga.slice(0, Ie),
          pn = qa.slice(0, Ie),
          dn = Jn(ja, pn) - Jn(pn, ja, Le) + Nt,
          _n = 1 / (1 + Math.exp(-dn / a.POWER_SLOPE));
        if (Math.random() < _n) {
          const as = Me(ja, pn);
          (ja.forEach((Qn) => {
            Qn.h *= 1 - (1 - _n) * as;
          }),
            qa.shift());
        } else {
          const as = Me(pn, ja);
          (pn.forEach((Qn) => {
            Qn.h *= 1 - _n * as;
          }),
            ga.shift());
        }
      }
      qa.length || Fa++;
    }
    return Qt.length ? Fa / a.DUEL_RUNS : 0;
  }
  function Kt(h, k, ne = null) {
    h.id === Na && k.id !== Na && (h = { ...h, id: k.id });
    const Ie = f.DEX[h.id].types,
      Le = f.DEX[k.id].types,
      Pt = f.statsOf(h),
      Nt = f.statsOf(k);
    let Qt = 0;
    for (const [ma, $a] of ne ? [[0, ne]] : f.learnOf(h)) {
      if (ma > h.level || (!ne && a.MOVE_BLACKLIST.includes($a))) continue;
      const Fa = t.MOVES[$a],
        fa = Fa ? f.movePower($a) : 0;
      if (fa <= 0) continue;
      const ga = Fa.cat === "phys",
        qa =
          (((2 * h.level) / 5 + 2) * fa * (ga ? Pt.atk : Pt.spa)) / Math.max(1, ga ? Nt.def : Nt.spd) / 50 +
          2;
      Qt = Math.max(Qt, ((qa * f.moveAcc($a)) / 100) * (Ie.includes(Fa.type) ? 1.5 : 1) * Ma(Fa.type, Le));
    }
    return Qt * a.LEVEL_GAP ** (h.level - k.level);
  }
  function Aa(h, k) {
    const ne = a.LEGEND_ZONE,
      Ie = a.TEAM_SIZE,
      Le = t.LegendZones?.get(h.id) || {},
      Pt = Ia(h, k, Le.counter),
      Nt = Le.burst ? Le.burst : za(h, k).key;
    return Kt(h, k) / Ie + ne.COUNTER * Kt(h, k, Pt.key) + (Ie / ne.RAGE) * ne.BURST * Kt(h, k, Nt);
  }
  const Ka = (h, k, ne = k.level) => _a(h, k, ne).value;
  function _a(h, k, ne = k.level) {
    const Ie = { ...h, level: Math.min(h.level, ne), hp: null, status: null, foe: !0 },
      Le = { ...k, foe: !0 };
    if (!k.boss) return { value: (Kt(Ie, Le) * f.maxHp(Ie)) / Math.max(1, Kt(Le, Ie)), dot: 0, para: 0 };
    const Pt = f.maxHp(Ie) / Math.max(1, Aa(Le, Ie)),
      Nt = Be(Ie, Le);
    return { value: Kt(Ie, Le) * Pt, dot: Nt.dot * Pt, para: Nt.para * Pt };
  }
  const Ha = ["poison", "burn"],
    Ua = (h) => (h?.elite ? (a.ELITE.RESIST[h.elite] ?? 1) : 1),
    sn = (h) => (h.elite ? (a.ELITE.HURT[h.elite] ?? a.BOSS_STATUS.HURT) : a.BOSS_STATUS.HURT);
  function Be(h, k) {
    const ne = a.TEAM_SIZE,
      Ie = t.LegendZones,
      Le = Ie?.get(k.id),
      Pt = k.elite && Ie?.zoneOf(k.id),
      Nt = a.RAID.BOSS;
    if (!Ha.some((pn) => nn().canGet(k, pn))) return { dot: 0, para: 0 };
    const Qt = Pt
        ? Ie.eliteKnobs(Pt.id, k.id, k.elite).hp
        : Le
          ? (Ie.knobs(k.id, k.id).hp ?? a.LEGEND_ZONE.HP)
          : Nt.HP *
            (Nt.BST_REF / Object.values(f.DEX[k.id].stats).reduce((pn, dn) => pn + dn, 0)) ** Nt.HP_EXP *
            (Nt.ADJ?.[k.id] ?? 1),
      ma = (f.maxHp(k) * (1 + a.ENEMY_HP_PER_ALLY * (ne - 1)) * Qt) / sn(k),
      $a = da(h, k),
      Fa = za(h, k),
      fa = nn().MOVES[Fa.key],
      ga = $a ? a.STATUS_MOVE_CHANCE : 0,
      qa = { poison: 0, burn: 0, paralysis: 0 };
    ($a && $a.status in qa && (qa[$a.status] += (ga * $a.chance) / 100),
      fa &&
        fa[0] in qa &&
        nn().canGet(k, fa[0]) &&
        (qa[fa[0]] += ((((1 - ga) * Fa.acc) / 100) * Math.min(fa[1], nn().capOf(Fa.key))) / 100));
    const ja = (pn) => Math.min(1, (pn * Ua(k)) / a.STATUS_SURE);
    return { dot: ma * ja(qa.poison + qa.burn), para: ma * ja(qa.paralysis) };
  }
  function Ut(h, k) {
    const ne = (Pt) => {
        const Qt = Pt.map((ma) => ma.dot)
          .sort((ma, $a) => $a - ma)
          .reduce((ma, $a, Fa) => ma + $a * (a.STATUS_TEAM[Fa] ?? 0), 0);
        return (
          Pt.reduce((ma, $a) => ma + $a.value, 0) +
          Qt -
          (Qt > 0 ? a.STATUS_PARA_COST * Pt.reduce((ma, $a) => ma + $a.para, 0) : 0)
        );
      },
      Ie = [],
      Le = h.slice();
    for (; Ie.length < k && Le.length;) {
      let Pt = 0,
        Nt = -1 / 0;
      (Le.forEach((Qt, ma) => {
        const $a = ne([...Ie, Qt]);
        $a > Nt && ((Nt = $a), (Pt = ma));
      }),
        Ie.push(Le.splice(Pt, 1)[0]));
    }
    return Ie.map((Pt) => Pt.uid);
  }
  function aa(h) {
    const k = a.LEGEND_ZONE.AURA || 0;
    return !k || !h.length
      ? 1
      : (h.reduce(
          (Ie, Le) =>
            Ie +
            (Le.shiny
              ? 1
              : Math.max(
                  1,
                  (Math.min(Le.level, a.MAX_LEVEL) / a.MAX_LEVEL) * a.UNDERGROUND.RANK_STAT ** f.rankOf(Le),
                )),
          0,
        ) /
          h.length) **
          k;
  }
  function ae(h, k, ne, Ie = !1) {
    const Le = f.makeMon(h, k, ne != null ? { shiny: ne } : {});
    return (
      (Le.foe = !0),
      (Le.hp = f.maxHp(Le)),
      Ie
        ? ((Le.veiled = !0), Le)
        : ((f.S.seen[h] = !0),
          Le.shiny && (f.S.seenShiny[h] = !0),
          B()?.event?.id === h && !B().event.raid && t.Events.markMet(h),
          Le)
    );
  }
  const ft = () => f.teamMons().filter((h) => f.curHp(h) > 0);
  function ht(h, k, ne = []) {
    if (f.S.autoSwitch === !1 || !k.length) return h;
    const Ie = (Le) =>
      k.reduce((Pt, Nt) => Pt + is(Le, Nt), 0) / k.length + (ne.includes(Le.uid) ? 0.001 : 0);
    return h
      .map((Le, Pt) => ({ m: Le, i: Pt, s: Ie(Le) }))
      .sort((Le, Pt) => Pt.s - Le.s || Le.i - Pt.i)
      .map((Le) => Le.m);
  }
  const ea = (h) => h.enemies.filter((k) => k.hp > 0),
    Ra = (h) =>
      h.allies.map((k) => f.getMon(k)).filter((k) => k && f.curHp(k) > 0 && f.activeTeam().includes(k.uid)),
    Ca = (h) => h.foes.map((k) => h.enemies.find((ne) => ne.uid === k)).filter((k) => k && k.hp > 0);
  function gn(h, k, ne) {
    return h === "static"
      ? a.TEAM_SIZE
      : (ne && k >= 2) || (h === "trainer" && k >= 2 && Math.random() < a.DOUBLE_CHANCE)
        ? 2
        : 1;
  }
  function yn(h, k, ne) {
    const Ie = [];
    for (let Le = 0; Le < ne; Le++) {
      const Pt = h[Le];
      if (Pt && k.includes(Pt)) continue;
      const Nt = k.find((Qt) => !h.includes(Qt)) || null;
      (!Nt && !Pt) || ((h[Le] = Nt), Ie.push({ slot: Le, out: Pt || null, uid: Nt }));
    }
    for (; h.length && !h[h.length - 1];) h.pop();
    return Ie;
  }
  function mn(h) {
    const k = [],
      ne = ea(h).slice(0, Math.min(h.slots, 2));
    let Ie = ht(ft(), ne, h.allies);
    const Le = Ie.find((Nt) => Nt.uid === h.pick);
    Le && (Ie = [Le, ...Ie.filter((Nt) => Nt !== Le)]);
    for (const Nt of yn(
      h.allies,
      Ie.slice(0, h.slots).map((Qt) => Qt.uid),
      h.slots,
    )) {
      const Qt = Nt.out && f.getMon(Nt.out);
      (Qt && delete Qt.confused,
        k.push({
          type: "send",
          side: "ally",
          ...Nt,
          outKo: !Qt || f.curHp(Qt) <= 0 || !f.activeTeam().includes(Qt.uid),
        }));
    }
    const Pt = Math.min(h.slots, 2);
    for (const Nt of yn(
      h.foes,
      ea(h)
        .slice(0, Pt)
        .map((Qt) => Qt.uid),
      Pt,
    ))
      k.push({
        type: "send",
        side: "enemy",
        ...Nt,
        outKo: !0,
        mon: h.enemies.find((Qt) => Qt.uid === Nt.uid) || null,
        trainer: h.trainer,
      });
    return (
      k.length &&
        (h.queue = h.queue.filter((Nt) => (Nt.side === "ally" ? h.allies : h.foes).includes(Nt.uid))),
      k
    );
  }
  function ln(h) {
    const k =
        h.kind === "gym"
          ? a.GYM_HP_MULT * (h.gym.power || 1) * Math.max(1, a.TEAM_SIZE / h.enemies.length) ** a.GYM_TEAM_EXP
          : 1,
      ne =
        (h.slots >= a.TEAM_SIZE ? 1 + a.ENEMY_HP_PER_ALLY * (a.TEAM_SIZE - 1) : 1) *
        k *
        (h.hpPower ?? h.power ?? 1);
    for (const Ie of ea(h)) ((Ie.hpMult = ne), (Ie.hp = f.maxHp(Ie)));
  }
  function In(h, k) {
    let ne = k[0],
      Ie = -1;
    for (const Le of k) {
      const Pt = f.DEX[Le.id].types,
        Nt = za(h.id === Na && Le.id !== Na ? { ...h, id: Le.id } : h, Le),
        Qt =
          ((Math.max(0, Nt.power) * (Nt.typeless ? 1 : Ma(Nt.type, Pt))) / Math.max(1, Le.hp)) *
          (0.95 + Math.random() * 0.1);
      Qt > Ie && ((Ie = Qt), (ne = Le));
    }
    return ne;
  }
  function xe(h) {
    const k = (Ie) => f.statsOf(Ie).spe * (Ie.status === "paralysis" ? 0.25 : 1),
      ne = Ra(h).map((Ie) => ({ side: "ally", uid: Ie.uid, spe: k(Ie) }));
    for (const Ie of Ca(h)) ne.push({ side: "enemy", uid: Ie.uid, spe: k(Ie) });
    (ne.sort((Ie, Le) => Le.spe - Ie.spe || Math.random() - 0.5),
      (h.queue = ne.map((Ie) => ({ side: Ie.side, uid: Ie.uid }))));
  }
  function Et(h) {
    return { mon: h, level: h.level };
  }
  function oa(h) {
    const k = f.DEX[h.mon.id],
      ne = B().battle?.rate ?? (k.legendary || k.mythical ? a.LEGENDARY_CAPTURE_RATE : null),
      Ie = ne != null ? ne / 255 : (k.captureRate * a.CAPTURE_BONUS) / 255,
      Le = f.buffMult("capture");
    return Math.min(a.CAPTURE_MAX * Le, Ie * Le);
  }
  const sa = (h) => f.tierOf(h.mon.id).ball;
  function Ga(h) {
    const k = B().capture;
    return k.on
      ? h.shiny && k.shiny
        ? !0
        : k.target === "new" || k.target === "missing"
          ? !f.ownsHere(h.id) || f.fitsFamily(h, cn())
          : !0
      : !1;
  }
  const cn = () => {
    const h = B();
    return h.zone ? t.LegendZones?.get(h.zone.id)?.region || null : h.event?.reg || null;
  };
  function Tn(h, k = !1, ne = null) {
    const Ie = cn();
    if (!k && B().capture.on && f.isDup(h, Ie)) {
      const fa = f.receive({ uid: h.uid, id: h.id, level: h.level, xp: 0, shiny: h.shiny }, { home: Ie });
      return (
        f.S.stats.caught++,
        f.tally("caught", fa.mon.reg),
        {
          type: "capture",
          ball: null,
          shakes: 3,
          success: !0,
          prob: 1,
          isNew: !1,
          inTeam: !1,
          enemy: { id: h.id, level: h.level, shiny: h.shiny, uid: h.uid },
          candy: fa.dup,
        }
      );
    }
    if (!k && !Ga(h)) return null;
    if (!f.hasRoom()) return { type: "captureSkip", reason: e("Le PC est plein !"), shiny: h.shiny };
    const Le = Et(h),
      Pt = ne?.ball || sa(Le);
    f.S.stats.throws++;
    const Nt = ne?.prob ?? oa(Le),
      Qt = Math.pow(Nt, 0.25);
    let ma = 0;
    for (; ma < 4 && Math.random() < Qt;) ma++;
    const $a = ma === 4,
      Fa = {
        type: "capture",
        ball: Pt,
        shakes: Math.min(3, ma),
        success: $a,
        enemy: { id: h.id, level: h.level, shiny: h.shiny, uid: h.uid },
        prob: Nt,
      };
    if ($a) {
      const fa = {
          uid: h.uid,
          id: h.id,
          level: h.level,
          xp: 0,
          caughtAt: Date.now(),
          where: B().nodes[B().node]?.name,
          shiny: h.shiny,
        },
        ga = f.receive(fa, { home: Ie });
      ((Fa.isNew = !!ga.isNew),
        ga.dup && (Fa.candy = ga.dup),
        (Fa.inTeam = f.S.team.includes(fa.uid)),
        (Fa.where = fa.where),
        (Fa.ch = B().chapter),
        f.S.stats.caught++,
        f.tally("caught", fa.reg),
        (fa.shiny || f.isLegend(fa.id)) && t.Cloud?.rush());
    }
    return Fa;
  }
  function Mn(h) {
    const k = f.itemCount("master-ball") > 0;
    if (!f.hasRoom()) return { type: "captureSkip", reason: e("Le PC est plein !") };
    k && f.addItem("master-ball", -1);
    const ne = Tn(h, !0, {
      prob: k ? 1 : a.ROAMING.CATCH * f.buffMult("capture"),
      ball: k ? "master-ball" : null,
    });
    return (ne?.success && t.Roaming.caught(h.id), ne && (ne.roam = !0), ne);
  }
  function ks(h, k, ne) {
    const Ie = t.Events,
      Le = [];
    return (
      Ie.addShards(a.EVENT.SHARDS_LEGEND),
      ne?.success
        ? (Ie.won(h.event), Le.push({ type: "eventWon", id: k.id }))
        : h.event < 0
          ? Le.push({ type: "eventMiss", id: k.id })
          : (Ie.addTrace(k.id),
            Le.push({
              type: "eventTrace",
              id: k.id,
              total: Ie.state.traces[k.id],
              shards: a.EVENT.SHARDS_LEGEND,
            })),
      Le
    );
  }
  function ss(h) {
    const k = B();
    Object.assign(h, {
      turn: 0,
      calm: 0,
      slots: h.boss ? a.TEAM_SIZE : gn(h.kind, h.enemies.length, h.gym?.double),
      allies: [],
      foes: [],
      queue: [],
    });
    for (const ne of f.teamMons()) delete ne.confused;
    (ln(h), (k.battle = h), mn(h), xe(h), f.S.stats.battles++);
  }
  const us = (h) => ({ slots: h.slots, allies: [...h.allies], foes: [...h.foes] });
  function Xn() {
    const h = B(),
      k = h.nodes[h.node],
      ne = [];
    if (h.event && !h.event.raid && !t.Events.isOpen(h.event.seq)) {
      const { id: Le, seq: Pt } = h.event;
      return (Ot(), [{ type: "eventClosed", id: Le, by: ca(Pt) }]);
    }
    if (h.zone && t.LegendZones.over(h.zone.id)) {
      const Le = h.zone.foe ?? h.zone.id;
      return (zt(), [{ type: "zoneOver", id: Le }]);
    }
    if (h.zone && t.LegendZones.shut(h.zone.id)) {
      const Le = h.zone.foe ?? h.zone.id,
        Pt = h.zone.id;
      return (zt(), [{ type: "zoneShut", id: Le, zone: Pt }]);
    }
    if (h.event?.raid && t.Raids.stale(h.event.date)) {
      const { id: Le } = h.event;
      return (Ot(), [{ type: "raidOver", id: Le }]);
    }
    const Ie = k?.event ? (k.legend ? k.edge : a.EVENT.EDGE[k.type]) : void 0;
    if (!k) return st();
    if (k.type === "candy") ne.push(...Ye(!0));
    else if (k.type === "heal") {
      const Le = an();
      (f.healTeam(), ne.push({ type: "heal", node: k, before: Le }));
      const Pt = h.event ? [] : V(k.name, h.chapter);
      (Pt.length && ne.push({ type: "npcOffer", node: k, offers: Pt }), Dn());
    } else if (k.type === "berry") {
      const Le = an();
      for (const Pt of f.teamMons())
        f.curHp(Pt) > 0 &&
          (Pt.hp = Math.min(f.maxHp(Pt), f.curHp(Pt) + Math.ceil(f.maxHp(Pt) * a.BERRY_HEAL)));
      (ne.push({ type: "berry", node: k, before: Le }), Dn());
    } else if (k.type === "item" && k.find?.egg) {
      const Le = k.find,
        Pt = f.giftEgg(Le.egg, void 0, k.name);
      (Pt
        ? ((h.gifts[Le.once] = !0), ne.push({ type: "eggGift", node: k, egg: Pt, text: Le.text }))
        : ne.push({
            type: "skip",
            node: k,
            text: e(
              "Un œuf t'attendait ici, mais l'incubateur de la Pension est plein : libère une place et repasse !",
            ),
          }),
        Dn());
    } else if (k.type === "unlock")
      ((h.gifts[k.once] = !0), ne.push({ type: "unlock", node: k, text: k.text }), Dn());
    else if (k.type === "item" && k.find) {
      const Le = k.find,
        Pt = Le.once ? Le : Ht(Le, h.chapter);
      if (Pt.money) {
        const Nt = f.earn(Pt.money * a.MONEY_GAIN * f.buffMult("money"));
        (ne.push({ type: "item", node: k, money: Nt }), Le.once && (h.gifts[Le.once] = !0));
      } else {
        const Nt = Ze(Pt.item, Pt.n || 1);
        Nt && (ne.push({ type: "item", node: k, item: Pt.item, n: Nt }), Le.once && (h.gifts[Le.once] = !0));
      }
      Dn();
    } else if (k.type === "item") {
      const Le = b.ITEM_TABLE.map(([Fa, fa]) => [gt(Fa, fa.item, h.chapter), fa]),
        Pt = Le.reduce((Fa, fa) => Fa + fa[0], 0);
      let Nt = Math.random() * Pt,
        Qt = Le[0][1];
      for (const [Fa, fa] of Le)
        if (((Nt -= Fa), Nt <= 0)) {
          Qt = fa;
          break;
        }
      Qt.stone && (Qt = { item: H(f.shopStones(h.chapter)), n: 1 });
      const ma = (Fa) =>
          typeof Fa == "number" ||
          ((!Fa.owns || Fa.owns.every((fa) => f.owns(fa))) && (!Fa.badge || h.badges?.includes(Fa.badge))),
        $a = Object.entries(k.loot || {}).find(
          ([Fa, fa]) => !h.gifts[Fa] && ma(fa) && Math.random() < (typeof fa == "number" ? fa : fa.p),
        );
      if ($a?.[0].startsWith("egg:")) {
        const Fa = f.giftEgg(+$a[0].slice(4), void 0, k.name);
        if (Fa)
          return (
            (h.gifts[$a[0]] = !0),
            ne.push({
              type: "eggGift",
              node: k,
              egg: Fa,
              text: e("Un œuf étrange, bleu et translucide… il part couver à la Pension !"),
            }),
            Dn(),
            ne
          );
      } else $a && (Qt = { item: $a[0], n: 1, once: $a[0] });
      if (((Qt = Ht(Qt, h.chapter)), Qt.money)) {
        const Fa = f.earn(
          (Array.isArray(Qt.money) ? ue(...Qt.money) : Qt.money) * a.MONEY_GAIN * f.buffMult("money"),
        );
        ne.push({ type: "item", node: k, money: Fa });
      } else {
        const Fa = Ze(Qt.item, Qt.n);
        Fa && (ne.push({ type: "item", node: k, item: Qt.item, n: Fa }), Qt.once && (h.gifts[Qt.once] = !0));
      }
      Dn();
    } else if (k.type === "npcTrade") (V(k.name, h.chapter), Dn());
    else if (k.type === "riddle") {
      if (!h.zone?.riddle) return (Dn(), ne);
      if (rn || t.LegendZones.doors()[k.riddle.key]) return (zt(), [...ne, { type: "riddlePass" }]);
      ((h.pending = { type: "riddle", riddle: k.riddle, node: h.node }),
        ne.push({ type: "riddle", node: k, riddle: k.riddle }));
    } else if (k.type === "gift")
      ((h.pending = { type: "gift", gift: k.gift, node: h.node }),
        ne.push({ type: "gift", node: k, gift: k.gift }));
    else if (k.type === "wild") {
      let Le;
      const Pt = b.regionOf(h.chapter).mythical,
        Nt = !rn && !k.event && k.roamer && t.Roaming?.free(k.roamer) ? k.roamer : null;
      (Nt
        ? (Le = { id: Nt, level: t.Roaming.level() })
        : Pt && !k.event && !k.way && Math.random() < b.MEW_CHANCE
          ? (Le = { id: Pt.id, level: b.levelAt(h.chapter, Pt.level) })
          : (Le = ce(qe(K(k, h.chapter), h.chapter))),
        k.way
          ? (Le.id = re(Le.id, Le.level, !0, k.dexCh ?? h.chapter))
          : !k.event && !Nt && (Le.id = Z(Le.id, Le.level, h.chapter)),
        (Le.id = pt(Le.id, k)));
      const Qt = Nt
          ? !1
          : h.event || h.zone
            ? null
            : Math.random() < Math.min(1, f.shinyRate(b.regionOf(h.chapter).key) * f.buffMult("shiny")),
        ma = ae(
          Le.id,
          Le.level,
          Qt,
          !Nt && (!!k.veil?.some(($a) => f.DEX[Le.id].types.includes($a)) || !!k.veilIds?.includes(Le.id)),
        );
      (!k.event &&
        t.DAYTIME?.phase().key === "night" &&
        !t.DAYTIME.indoorNode(k) &&
        t.DAYTIME.diurnal(Le.id) &&
        Math.random() < a.NIGHT_SLEEP &&
        t.STATUS.inflict(ma, "sleep"),
        Nt && Object.assign(ma, { rage: 0, rageMax: a.LEGEND_ZONE.RAGE }),
        ss({
          kind: "wild",
          enemies: [ma],
          edge: Ie,
          roam: Nt,
          ...(Nt ? { boss: !0, power: a.LEGEND_ZONE.ROAM_POWER, hpPower: a.LEGEND_ZONE.ROAM_HP } : {}),
        }),
        ne.push({ type: "battleStart", kind: "wild", node: k, enemy: ma, roam: !!Nt, ...us(h.battle) }));
    } else if (k.type === "static") {
      const Le = ae(k.id, k.level, !!k.shiny);
      k.spirit && (Le.spirit = !0);
      const Pt = k.zone && k.elite;
      Pt && Object.assign(Le, { rank: Pt, elite: Pt });
      const Nt = k.zone && !Pt ? aa(f.teamMons()) : 1;
      (Nt > 1 && (Le.aura = Nt),
        ss({
          kind: "static",
          enemies: [Le],
          once: k.once,
          pay: k.pay,
          rate: k.rate,
          power: k.power,
          reward: k.reward,
          event: k.legend ? h.event?.seq : null,
          zone: k.zone,
          edge: Ie,
          ...(Pt ? { elite: Pt } : {}),
          ...(k.raid ? { raid: !0, boss: !0, hpPower: k.hpPower } : {}),
          ...(k.zone
            ? ((Qt) => ({
                power: (Qt.power ?? a.LEGEND_ZONE.POWER) * Nt ** 2,
                hpPower: (Qt.hp ?? a.LEGEND_ZONE.HP) * Nt,
              }))(Pt ? t.LegendZones.eliteKnobs(k.zone, k.id, Pt) : t.LegendZones.knobs(k.zone, k.id))
            : {}),
        }),
        (k.zone || k.raid) && Object.assign(Le, { rage: 0, rageMax: a.LEGEND_ZONE.RAGE }),
        ne.push({ type: "battleStart", kind: "static", node: k, enemy: Le, text: k.text, ...us(h.battle) }));
    } else if (k.type === "trainer") {
      const Le = b.classesOf(h.chapter, k.classes),
        Pt = k.sprite && Le.find((ga) => ga.sprite === k.sprite),
        { cls: Nt, pool: Qt } = k.team
          ? { cls: Pt || b.classesOf(h.chapter, [k.sprite])[0] || { name: k.trainer, sprite: k.sprite } }
          : k.gymTrainer && k.classes?.length
            ? { cls: Le[Math.floor(Math.random() * Le.length)], pool: k.pool }
            : b.trainerFor(Pt ? [Pt] : Le, k.gymTrainer ? k.pool : K(k, h.chapter), (ga) => f.DEX[ga].types),
        ma = k.team
          ? k.team.length
          : (k.size ??
            (k.gymTrainer
              ? 1
              : k.event
                ? ue(2, 3)
                : 1 +
                  ue(
                    0,
                    Math.min(
                      2,
                      Math.floor((h.chapter - b.firstChapterOf(b.regionOf(h.chapter).key)) / 2) + 1,
                    ),
                  ))),
        $a = k.event ? a.MAX_LEVEL : (b.aceOf(h.chapter) ?? a.MAX_LEVEL) + a.LEVEL_CAP_MARGIN,
        Fa = k.team
          ? k.team.map(([ga, qa]) => ae(ga, qa, !1))
          : Array.from({ length: ma }, () => {
              const ga = ce(Qt),
                qa = Math.min(
                  a.MAX_LEVEL,
                  $a,
                  ga.level + (k.gymTrainer || k.league ? 0 : ue(...a.TRAINER_LEVEL_BONUS)),
                ),
                ja = k.lv
                  ? qa >= a.TRAINER_ITEM_EVO_LEVEL
                    ? $e(We(ga.id, qa, h.chapter, !0), !1)
                    : Math.random() < a.TRAINER_EVOLVED_CHANCE
                      ? re(ga.id, qa, !0, h.chapter)
                      : ga.id
                  : ga.id;
              return ae(pt(ja, k), qa, !1);
            });
      if (k.statMult > 1 || k.rank)
        for (const ga of Fa)
          (k.rank && (ga.rank = k.rank), k.statMult > 1 && (ga.statMult = k.statMult), (ga.hp = f.maxHp(ga)));
      const fa = k.trainer ? b.trainerLabel(k.trainer) : b.trainerName(Nt);
      (ss({
        kind: "trainer",
        enemies: Fa,
        trainer: fa,
        sprite: Nt.sprite,
        edge: Ie,
        power: k.gymTrainer ? a.GYM_TRAINERS.damage : void 0,
        league: k.league,
        tower: k.tower,
      }),
        ne.push({
          type: "battleStart",
          kind: "trainer",
          node: k,
          enemy: Fa[0],
          enemies: Fa,
          trainer: fa,
          sprite: Nt.sprite,
          count: ma,
          ...us(h.battle),
        }));
    } else if (k.type === "gym") {
      const Le = k.gym,
        Pt = k.leagueElite,
        Nt = (Pt ? k.team : b.gymTeam(h.chapter, Le)).map(([Qt, ma]) => ae(Qt, ma, !1));
      if (Pt) for (const Qt of Nt) ((Qt.rank = Qt.elite = Pt), (Qt.hp = f.maxHp(Qt)));
      (ss({
        kind: "gym",
        enemies: Nt,
        trainer: Le.leader,
        gym: Le,
        sprite: Le.sprite,
        ...(Pt ? { elite: Pt } : {}),
      }),
        Pt || ((h.metLeaders ||= {})[b.leagueOf(h.chapter) ? "L" + h.chapter : Le.badge || Le.leader] = 1),
        ne.push({
          type: "battleStart",
          kind: "gym",
          node: k,
          enemy: Nt[0],
          enemies: Nt,
          trainer: Le.leader,
          sprite: Le.sprite,
          gym: Le,
          count: Nt.length,
          ...us(h.battle),
        }));
    }
    return ne;
  }
  function Dn() {
    B().node++;
  }
  const ls = () =>
      a.CASINOS.some(
        (h) => h.regions.includes(b.regionOf(B().chapter)?.key) && (B().badges || []).includes(h.after),
      ),
    Hn = (h) => {
      const k = b.CHAPTERS[h];
      return k?.league ? (k.reg && k.reg !== "kanto" ? `L:${k.reg}` : "L") : h;
    },
    Kn = (h) =>
      typeof h == "string" && h[0] === "L"
        ? b.CHAPTERS.findIndex((k) => k.league && (k.reg || "kanto") === (h.slice(2) || "kanto"))
        : h,
    Sn = () =>
      (B().loops || []).filter((h) => Kn(h) >= 0 && Kn(h) <= B().unlocked).sort((h, k) => Kn(h) - Kn(k)),
    ns = (h) => (B().loops || []).includes(h);
  function Ue(h) {
    const k = B();
    return ((k.loops = ns(h) ? k.loops.filter((ne) => ne !== h) : [...(k.loops || []), h]), ns(h));
  }
  function Bt(h) {
    const k = Sn();
    if (!k.length) return null;
    const ne = Kn(Hn(h));
    return Kn(k.find((Ie) => Kn(Ie) > ne) ?? k[0]);
  }
  function st() {
    const h = B();
    if (h.tower) return Ye();
    if (h.league) {
      const { reg: Qt, tier: ma } = h.league,
        $a = ze(Qt, ma, [...f.activeTeam()]);
      return (Lt(), [{ type: "leagueEliteDone", reg: Qt, tier: ma, first: !!$a, ...($a || {}) }]);
    }
    if (h.event?.raid) {
      const { id: Qt, reg: ma, date: $a } = h.event;
      return (
        h.runs++,
        t.Raids.done(ma, $a, Qt)
          ? (Ot(), [{ type: "raidDone", id: Qt }])
          : $a !== t.Raids.dateKey()
            ? (Ot(), [{ type: "raidOver", id: Qt }])
            : (Q(), f.healTeam(), t.Update?.between(), [{ type: "raidLoop", id: Qt, loops: h.event.loops }])
      );
    }
    if (h.event) {
      const Qt = a.EVENT.SHARDS_PER_LOOP,
        { id: ma, seq: $a } = h.event;
      (t.Events.addShards(Qt), h.event.loops++, h.runs++);
      const Fa = h.event.loopMs || 0,
        fa = {
          type: "eventLoop",
          id: ma,
          loops: h.event.loops,
          shards: Qt,
          ms: Fa,
          record: Fa > 0 && t.Events.addRecord(ma, Fa),
        };
      return t.Events.isOpen($a)
        ? (Q(), t.Update?.between(), [fa])
        : (Ot(), [fa, { type: "eventClosed", id: ma, by: ca($a) }]);
    }
    if (h.zone?.elite) {
      const { id: Qt, foe: ma, elite: $a, won: Fa, got: fa } = h.zone;
      return Fa
        ? (zt(), [{ type: "eliteDone", id: ma, zone: Qt, tier: $a, ...(fa || {}) }])
        : t.LegendZones.shut(Qt)
          ? (zt(), [{ type: "zoneShut", id: ma, zone: Qt }])
          : ((h.zone.tries = (h.zone.tries || 1) + 1),
            Yt(),
            f.healTeam(),
            t.Update?.between(),
            [{ type: "zoneLoop", id: ma, elite: $a, tries: h.zone.tries }]);
    }
    if (h.zone) {
      const Qt = h.zone.id,
        ma = h.zone.foe ?? Qt;
      if (["done", "wait"].includes(t.LegendZones.state(t.LegendZones.get(Qt))))
        return (zt(), [{ type: "zoneDone", id: ma }]);
      if (t.LegendZones.over(Qt)) return (zt(), [{ type: "zoneOver", id: ma }]);
      if (t.LegendZones.shut(Qt)) return (zt(), [{ type: "zoneShut", id: ma, zone: Qt }]);
      (Yt(), f.healTeam(), t.Update?.between());
      const $a = t.LegendZones.get(Qt);
      return [{ type: "zoneLoop", id: ma, tries: $a ? t.LegendZones.tries($a, ma) + 1 : 0 }];
    }
    const k = h.chapter,
      ne = [...f.activeTeam()];
    (h.runs++,
      h.kept && delete h.kept[k],
      (h.unlocked = Math.max(h.unlocked, Math.min(b.CHAPTERS.length - 1, k + 1))),
      it());
    const Ie = b.leagueOf(k),
      Le = Bt(k),
      Pt =
        Ie && k !== Ie[Ie.length - 1]
          ? k + 1
          : (Le ?? (k + 1 >= b.CHAPTERS.length || !b.regionOf(k + 1)?.open ? k : k + 1));
    (jt(Pt, !0), f.healTeam());
    const Nt = f.reconnect();
    return (
      Nt && Pt !== k && jt(Pt, !0),
      [
        {
          type: "chapterEnd",
          chapter: k,
          next: Pt,
          team: ne,
          champion: !!Ie && k === Ie[Ie.length - 1] && !ns(Hn(k)),
        },
        ...(Nt ? [{ type: "reconnect", ...Nt }] : []),
      ]
    );
  }
  function Zt(h, k) {
    const ne = B();
    if (!ne.pending || ne.pending.type !== "gift") {
      const Pt =
        k?.key &&
        b.CHAPTERS.flatMap((Nt) => Nt.steps).find(
          (Nt) => Nt.kind === "gift" && Nt.gift?.key === k.key && Nt.gift.items,
        );
      return !Pt || ne.gifts[Pt.gift.key] || !Pt.gift.items.includes(h)
        ? null
        : ((ne.gifts[Pt.gift.key] = !0), f.addItem(h), f.save(), { item: h });
    }
    const Ie = ne.pending.gift;
    if (!(Ie.items || Ie.choices).includes(h)) return null;
    (Ie.trade || (ne.gifts[Ie.key] = !0), (ne.pending = null));
    let Le;
    if (Ie.items) (f.addItem(h), (Le = { item: h }));
    else if (!f.hasRoom()) (f.earn(1e3), (Le = { full: !0 }));
    else {
      const Pt = f.makeMon(h, Ie.level);
      ((Pt.where = ne.nodes[ne.node]?.name), (Pt.how = "gift"), (Pt.hp = f.maxHp(Pt)));
      const Nt = f.receive(Pt),
        Qt = Nt.dup || null;
      ((Le = Qt ? { dup: Qt } : { mon: Pt, isNew: Nt.isNew }),
        Ie.trade && f.S.items[Ie.trade[h]]--,
        !Qt && /^starter/.test(Ie.key) && !f.buddyMon() && f.setBuddy(Pt.uid));
    }
    return (Dn(), f.save(), Le);
  }
  function va(h) {
    const k = B();
    return k.pending?.type !== "riddle"
      ? null
      : h === "pass"
        ? ((k.pending = null), zt(), [{ type: "riddlePass" }])
        : h == null
          ? ((k.pending.waitAt ||= f.time()),
            f.save(),
            [{ type: "riddleWait", left: a.LEGEND_ZONE.RIDDLE_WAIT }])
          : Da(f.getMon(h));
  }
  function Da(h) {
    const k = B(),
      ne = k.pending.riddle,
      Ie = t.LegendZones,
      Le = Ie.answers(ne, h);
    return (
      Le
        ? ((k.pending = null), (Ie.doors()[ne.key] = !0), zt())
        : (k.pending = { type: "riddle", riddle: ne, node: k.node }),
      f.save(),
      [{ type: Le ? "riddleOpen" : "riddleFail", riddle: ne }]
    );
  }
  function la(h) {
    const k = B();
    k.pending?.type === "gift" && (k.pending.gift = { ...k.pending.gift, choices: h });
  }
  function Xa() {
    const h = $();
    if (
      (rn || (Fn = f.time()),
      h.event?.loopSteps != null && (h.event.loopSteps++, rn && h.event.loopAway++),
      h.pending?.type === "npcTrade" &&
        (V(h.nodes[h.pending.node]?.name, h.chapter), (h.pending = null), Dn()),
      h.pending?.type === "riddle" && !h.zone?.riddle && ((h.pending = null), Dn()),
      h.pending?.type === "riddle" && h.pending.waitAt)
    ) {
      const $a = a.LEGEND_ZONE.RIDDLE_WAIT - (f.time() - h.pending.waitAt);
      return $a > 0 ? [{ type: "riddleWait", left: $a }] : Da(null);
    }
    if (h.pending) return [{ type: "waiting", pending: h.pending }];
    if (h.event && Y() === 0) {
      const $a = h.event.id;
      return (Q(), f.healTeam(), [{ type: "legendFled", id: $a }]);
    }
    if (!h.battle && h.nodes[h.node]?.type === "gift") return Xn();
    if (!f.teamMons().length) return h.tower ? bt() : [{ type: "noTeam" }];
    if (!h.battle) return (ft().length || f.healTeam(), Xn());
    const k = h.battle;
    k.allies || Object.assign(k, { slots: 1, calm: 0, allies: [], foes: [], queue: [] });
    const ne = mn(k);
    if (ne.some(($a) => $a.uid)) return ne;
    if (ne.length) return [...ne, ...Xa()];
    if (!k.queue.length) {
      k.turn++;
      for (const $a of k.enemies) $a.sleepCd > 0 && $a.sleepCd--;
      if (++k.calm > a.STALL_ROUNDS || k.turn > a.MAX_ROUNDS) {
        const $a = (Fa) =>
          Fa.reduce((fa, ga) => fa + f.curHp(ga), 0) / Fa.reduce((fa, ga) => fa + f.maxHp(ga), 0);
        return $a(ft()) > $a(k.enemies) && !k.elite
          ? ea(k).flatMap((Fa) => ((Fa.hp = 0), B().battle === k ? bn(k, Fa, En(k, Fa)) : []))
          : (k.kind === "wild" || k.kind === "static") && !k.raid && !k.elite
            ? ((h.battle = null), Dn(), [{ type: "fled", enemy: k.enemies[0] }])
            : k.kind === "trainer"
              ? ((h.battle = null), Dn(), [{ type: "fled", enemy: k.enemies[0], trainer: k.trainer }])
              : Bn("stall");
      }
      xe(k);
    }
    const Ie = k.queue.shift(),
      Le = Ie.side === "ally",
      Pt = Le ? f.getMon(Ie.uid) : k.enemies.find(($a) => $a.uid === Ie.uid),
      Nt = Le ? Ca(k) : Ra(k);
    if (!Pt || f.curHp(Pt) <= 0 || !(Le ? k.allies : k.foes).includes(Pt.uid) || !Nt.length) return Xa();
    const Qt = Ve(k, Pt, Le),
      ma = Qt.ev;
    return (
      Qt.skip ||
        ma.push(
          ...(!Le && !k.zone && !k.boss && a.BOSS_ZONE_TOTAL && k.slots >= a.TEAM_SIZE && Nt.length > 1
            ? Ja(k, Pt, Nt)
            : ia(k, Pt, Le ? In(Pt, Nt) : H(Nt), Le)),
        ),
      B().battle === k && f.curHp(Pt) > 0 && ma.push(...Rt(k, Pt, Le)),
      Le && (k.zone || k.boss) && B().battle === k && !Qt.skip && ma.push(...ka(k, ma)),
      ma
    );
  }
  const nn = () => t.STATUS;
  function F(h, k, ne) {
    if (f.curHp(k) > 0) return [];
    if (!ne) return bn(h, k, En(h, k));
    const Ie = [{ type: "allyKo", uid: k.uid }];
    return (
      ft().length ||
        (h.kind === "static" && !h.raid
          ? ((B().battle = null), Dn(), Ie.push({ type: "fled", enemy: h.enemies[0] }))
          : Ie.push(...Bn())),
      Ie
    );
  }
  const Ce = (h, k) => ((h.hp = Math.max(0, f.curHp(h) - k)), h.hp);
  function Xe(h, k, ne) {
    const Ie = a.DRAIN[k.move.key],
      Le = Math.min(k.damage, ne);
    if (!Ie || !Le || f.curHp(h) <= 0) return;
    const Pt = Math.min(f.maxHp(h) - f.curHp(h), Math.max(1, Math.ceil(Le * Ie)));
    Pt <= 0 ||
      ((h.hp = f.curHp(h) + Pt),
      B().tower && h.src && (h.dr = (h.dr || 0) + Pt),
      Object.assign(k, { drain: Pt, attHp: h.hp }));
  }
  function Ve(h, k, ne) {
    const Ie = [],
      Le = { type: "status", uid: k.uid, side: ne ? "ally" : "enemy" };
    if (k.status === "sleep" && !ne && k.rageMax != null)
      return (
        delete k.status,
        delete k.sleep,
        (k.sleepCd = a.BOSS_STATUS.SLEEP_CD + 1),
        {
          ev: [
            { ...Le, status: "sleep", what: "stuck" },
            { ...Le, status: "sleep", what: "end" },
          ],
          skip: !0,
        }
      );
    if (k.status === "sleep") {
      if (k.sleep > 0) return (k.sleep--, { ev: [{ ...Le, status: "sleep", what: "stuck" }], skip: !0 });
      (delete k.status, delete k.sleep, Ie.push({ ...Le, status: "sleep", what: "end" }));
    } else if (k.status === "freeze") {
      if (Math.random() >= a.THAW_CHANCE)
        return { ev: [{ ...Le, status: "freeze", what: "stuck" }], skip: !0 };
      (delete k.status, Ie.push({ ...Le, status: "freeze", what: "end" }));
    } else if (k.status === "paralysis" && Math.random() < a.FULL_PARA_CHANCE)
      return { ev: [{ ...Le, status: "paralysis", what: "stuck" }], skip: !0 };
    if (k.confused) {
      if (--k.confused <= 0) (delete k.confused, Ie.push({ ...Le, status: "confusion", what: "end" }));
      else if (Math.random() < a.CONFUSION_SELF_HIT) {
        const Pt = f.statsOf(k),
          Nt = Math.max(1, Math.floor((((2 * f.lvl(k)) / 5 + 2) * 40 * Pt.atk) / Pt.def / 50 + 2));
        return (
          (h.calm = 0),
          Ie.push({ ...Le, status: "confusion", what: "hurt", damage: Nt, hp: Ce(k, Nt), maxHp: f.maxHp(k) }),
          Ie.push(...F(h, k, ne)),
          { ev: Ie, skip: !0 }
        );
      }
    }
    return { ev: Ie, skip: !1 };
  }
  function Rt(h, k, ne) {
    if (k.status !== "burn" && k.status !== "poison") return [];
    const Ie = !ne && (h.boss || k.rageMax != null),
      Le = Math.max(1, Math.floor(f.maxHp(k) / (Ie ? sn(k) : 8)));
    return (
      (h.calm = 0),
      [
        {
          type: "status",
          uid: k.uid,
          side: ne ? "ally" : "enemy",
          status: k.status,
          what: "hurt",
          damage: Le,
          hp: Ce(k, Le),
          maxHp: f.maxHp(k),
        },
      ].concat(F(h, k, ne))
    );
  }
  function da(h, k) {
    let ne = null;
    const Ie = f.DEX[k.id].types;
    for (const [Le, Pt] of f.learnOf(h)) {
      if (Le > h.level || f.movePower(Pt) > 0) continue;
      const Nt = nn().MOVES[Pt];
      Nt &&
        t.MOVES[Pt] &&
        nn().canGet(k, Nt[0]) &&
        Ma(t.MOVES[Pt].type, Ie, !0) !== 0 &&
        (ne = { key: Pt, status: Nt[0], chance: Math.min(t.MOVES[Pt].acc || Nt[1], nn().capOf(Pt)) });
    }
    return ne;
  }
  function ia(h, k, ne, Ie) {
    const Pt = { type: "attack", side: Ie ? "ally" : "enemy", kind: h.kind, uid: k.uid, target: ne.uid },
      Nt = Yn(h, k, ne, Ie),
      Qt = !Nt && da(k, ne);
    if (
      Qt &&
      (Math.random() < a.STATUS_MOVE_CHANCE ||
        za(k.id === Na && ne.id !== Na ? { ...k, id: ne.id } : k, ne).typeless)
    ) {
      const Fa = t.MOVES[Qt.key],
        fa = {
          move: { key: Qt.key, name: Fa.name, type: Fa.type, power: 0, acc: Qt.chance },
          damage: 0,
          miss: !1,
          crit: !1,
          eff: 1,
          statusMove: !0,
        };
      return (
        Ma(Fa.type, f.DEX[ne.id].types, !0) === 0
          ? (fa.eff = 0)
          : Math.random() * 100 >= Qt.chance * Ua(ne)
            ? (fa.miss = !0)
            : (nn().inflict(ne, Qt.status), (fa.inflict = Qt.status), (h.calm = 0)),
        [{ ...Pt, ...fa, hp: f.curHp(ne), maxHp: f.maxHp(ne) }]
      );
    }
    const ma = Nt ? vn(Nt.att, ne, Nt.mv) : vn(k, ne);
    (Ie || on(ma, fn(h)), ma.damage && (h.calm = 0), qn(ma, ne));
    const $a = f.curHp(ne);
    if ((Ce(ne, ma.damage), Xe(k, ma, $a), ma.damage && f.curHp(ne) > 0)) {
      ne.status === "freeze" && ma.move.type === "fire" && (delete ne.status, (ma.thaw = !0));
      const Fa = nn().effectOf(ma.move.key);
      Fa &&
        Math.random() * 100 < Fa.chance * Ua(ne) &&
        nn().canGet(ne, Fa.status) &&
        (nn().inflict(ne, Fa.status), (ma.inflict = Fa.status));
    }
    return [{ ...Pt, ...ma, hp: f.curHp(ne), maxHp: f.maxHp(ne) }, ...F(h, ne, !Ie)];
  }
  function Ja(h, k, ne) {
    if (da(k, ne[0]) && Math.random() < a.STATUS_MOVE_CHANCE) return ia(h, k, H(ne), !1);
    const Ie = za(k, ne),
      Le = a.BOSS_ZONE_TOTAL / ne.length;
    if (Ie.power <= 0) return ia(h, k, H(ne), !1);
    const Pt = fn(h),
      Nt = [];
    ne.forEach((Qt, ma) => {
      const $a = vn(k, Qt, Ie);
      ($a.damage && (on($a, Pt * Le), (h.calm = 0)), qn($a, Qt));
      const Fa = f.curHp(Qt);
      if ((Ce(Qt, $a.damage), Xe(k, $a, Fa), $a.damage && f.curHp(Qt) > 0)) {
        Qt.status === "freeze" && $a.move.type === "fire" && (delete Qt.status, ($a.thaw = !0));
        const fa = nn().effectOf($a.move.key);
        fa &&
          Math.random() * 100 < fa.chance * Ua(Qt) &&
          nn().canGet(Qt, fa.status) &&
          (nn().inflict(Qt, fa.status), ($a.inflict = fa.status));
      }
      Nt.push({
        type: "attack",
        side: "enemy",
        kind: h.kind,
        uid: k.uid,
        target: Qt.uid,
        zone: !0,
        zoneFollow: ma > 0,
        zoneLast: ma === ne.length - 1,
        ...$a,
        hp: f.curHp(Qt),
        maxHp: f.maxHp(Qt),
      });
    });
    for (const Qt of ne) B().battle === h && Nt.push(...F(h, Qt, !0));
    return Nt;
  }
  function Ia(h, k, ne = null) {
    if (ne && t.MOVES[ne]) {
      const fa = t.MOVES[ne];
      return {
        key: ne,
        name: fa.name,
        type: fa.type,
        cat: fa.cat,
        power: f.movePower(ne),
        acc: f.moveAcc(ne),
      };
    }
    const Ie = k ? za(h, k) : null,
      Le = k ? f.DEX[k.id].types : [],
      Pt = f
        .learnOf(h)
        .filter(
          ([fa, ga]) =>
            fa <= h.level &&
            !a.MOVE_BLACKLIST.includes(ga) &&
            t.MOVES[ga] &&
            f.movePower(ga) > 0 &&
            ga !== Ie?.key &&
            Ma(t.MOVES[ga].type, Le, !0) !== 0,
        )
        .map(([, fa]) => fa),
      Nt = f.DEX[h.id].types,
      Qt = Pt.filter((fa) => !Nt.includes(t.MOVES[fa].type)),
      $a = (Qt.length ? Qt : Pt).sort((fa, ga) => f.movePower(fa) - f.movePower(ga))[0];
    if (!$a) return Ie;
    const Fa = t.MOVES[$a];
    return { key: $a, name: Fa.name, type: Fa.type, cat: Fa.cat, power: f.movePower($a), acc: f.moveAcc($a) };
  }
  function ka(h, k) {
    const ne = Ca(h).find(($a) => $a.rageMax);
    if (!ne || !k.some(($a) => $a.type === "attack" && $a.target === ne.uid && $a.damage > 0)) return [];
    if (ne.status === "sleep") return [];
    const Ie = a.LEGEND_ZONE,
      Le = [],
      Pt = t.LegendZones.get(h.zone) || {};
    ne.rage = Math.min(ne.rageMax, ne.rage + 1);
    const Nt = ne.rage >= ne.rageMax;
    Le.push({ type: "rage", uid: ne.uid, rage: ne.rage, max: ne.rageMax, full: Nt });
    const Qt = Ra(h);
    if (!Qt.length) return Le;
    const ma = ($a, Fa, fa, ga) => {
      const qa = vn(ne, $a, Nt ? (Pt.burst ? Ia(ne, $a, Pt.burst) : za(ne, Qt)) : Ia(ne, $a, Pt.counter));
      return (
        qa.damage && (on(qa, (a.ENEMY_DAMAGE.static ?? 1) * (h.power || 1) * Fa), (h.calm = 0)),
        qn(qa, $a),
        Ce($a, qa.damage),
        {
          type: "attack",
          side: "enemy",
          kind: h.kind,
          uid: ne.uid,
          target: $a.uid,
          counter: !Nt,
          rage: Nt,
          ...(ga > 1 ? { zone: !0, zoneFollow: fa > 0, zoneLast: fa === ga - 1 } : {}),
          ...qa,
          hp: f.curHp($a),
          maxHp: f.maxHp($a),
        }
      );
    };
    if (Nt) {
      ((ne.rage = 0),
        Qt.forEach(($a, Fa) => Le.push(ma($a, Ie.BURST, Fa, Qt.length))),
        Le.push({ type: "rage", uid: ne.uid, rage: 0, max: ne.rageMax }));
      for (const $a of Qt) B().battle === h && Le.push(...F(h, $a, !0));
    } else {
      const $a = H(Qt);
      (Le.push(ma($a, Ie.COUNTER, 0, 1)), B().battle === h && Le.push(...F(h, $a, !0)));
    }
    return Le;
  }
  const Za = (h) => f.DEX[h.id].legendary || f.DEX[h.id].mythical,
    En = (h, k) => (Za(k) && !h.event && !h.zone && !h.roam) || !!k.veiled || !!k.spirit;
  function bn(h, k, ne = !1) {
    const Ie = B(),
      Le = ne ? [] : [{ type: "enemyKo", uid: k.uid }];
    ne && h.kind === "gym" ? ((k.hp = 0), Le.push({ type: "fled", enemy: k, legend: !0 })) : ne && (k.hp = 1);
    const Pt = h.kind === "trainer" || h.kind === "gym",
      Nt = !!Ie.event || !!Ie.tower || !!h.elite,
      Qt =
        (f.levelXp(k.level) / a.XP_WINS_PER_LEVEL) *
        Math.sqrt((t.BASE_EXP[k.id] || a.XP_BASE_REF) / a.XP_BASE_REF) *
        (Pt ? 1.5 : 1) *
        (h.league ? (a.LEAGUE_TRAINERS.xp[b.regionOf(Ie.chapter).key] ?? 1) : 1);
    for (const $a of Nt ? [] : f.teamMons()) {
      const Fa = f.capped($a),
        fa = Fa ? 1 : $a.xp / f.xpForNext($a.level, $a),
        ga = h.allies.includes($a.uid);
      ga && !ne && ($a.wins = ($a.wins || 0) + 1);
      const qa =
          Qt *
          (ga ? a.XP_ACTIVE_BONUS : 1) *
          ($a.uid === f.S.buddy?.uid ? a.BUDDY_XP_MULT : 1) *
          (se ? a.OFFLINE_XP_MULT : 1) *
          f.buffMult("xp"),
        ja = f.gainXp($a, qa);
      Le.push({
        type: "xp",
        uid: $a.uid,
        amount: Fa ? 0 : Math.round(qa),
        levels: ja.levels,
        level: $a.level,
        evolve: ja.evolve,
        from: fa,
        active: ga,
      });
    }
    const ma = Nt ? null : f.buddyKo();
    if ((ma && Le.push({ type: "buddyCandy", ...ma }), h.kind === "wild" || h.kind === "static")) {
      const $a = Nt ? 0 : Math.round(a.WILD_MONEY(k.level) * a.MONEY_GAIN * f.buffMult("money"));
      if ((f.earn($a), k.spirit)) {
        if (
          (h.once && (Ie.gifts[h.once] = !0),
          Le.push({ type: "fled", enemy: k, spirit: !0, money: $a }),
          (Ie.battle = null),
          !h.reward)
        )
          return (Dn(), Le);
        const dn = { ...h.reward, level: b.levelAt(Ie.chapter, h.reward.level) };
        return (
          (Ie.pending = { type: "gift", gift: dn, node: Ie.node }),
          Le.push({ type: "gift", gift: dn }),
          Le
        );
      }
      if (ne)
        return (
          Le.push({ type: "fled", enemy: k, legend: !k.veiled, veiled: !!k.veiled, money: $a }),
          (Ie.battle = null),
          Dn(),
          Le
        );
      const Fa = h.zone ? [...f.activeTeam()] : null;
      if (h.elite) {
        const dn = pa(h.zone, h.elite, k.id, Fa);
        return (
          (Ie.zone.won = !0),
          (Ie.zone.got = dn),
          f.S.stats.wins++,
          Le.push(
            { type: "victory", kind: h.kind, money: 0 },
            { type: "eliteWin", id: k.id, zone: h.zone, tier: h.elite, first: !!dn, ...(dn || {}) },
          ),
          (Ie.battle = null),
          Dn(),
          Le
        );
      }
      const fa = Nt || !!Ie.zone,
        ga =
          h.raid && t.Raids.pityReady(Ie.event.reg, Ie.event.date) ? { prob: 1, ball: "master-ball" } : null,
        qa = h.zone && t.LegendZones.get(h.zone)?.wb ? { prob: a.WORLDBOSS.CATCH } : null,
        ja = h.roam
          ? Mn(k)
          : fa && !h.event && !h.raid && !h.zone
            ? null
            : Tn(k, !!h.event || !!h.zone || !!h.raid, ga || qa);
      if (
        (h.zone && ja?.success && t.LegendZones.record(h.zone, Fa),
        (h.zone || h.roam) && ja?.type === "capture" && (wa(k.id), ja.success))
      ) {
        const dn = f.getMon(ja.enemy.uid);
        (dn && (dn.tries = f.S.legTries[k.id]), delete f.S.legTries[k.id]);
      }
      if (
        (ja &&
          Le.push(h.event ? Object.assign(ja, { event: !0 }) : h.raid ? Object.assign(ja, { raid: !0 }) : ja),
        h.raid && ja?.success)
      ) {
        const dn = f.getMon(ja.enemy.uid);
        (dn && ((dn.level = a.RAID.CATCH_LEVEL), (dn.xp = 0), ga && (dn.pity = !0)),
          (ja.enemy.level = a.RAID.CATCH_LEVEL));
      }
      (h.raid &&
        (ja?.type === "capture" &&
          (Ie.event.loops = t.Raids.addTry(Ie.event.reg, Ie.event.date, Ie.event.loops)),
        t.Raids.result(Ie.event, ja),
        ja?.success ||
          Le.push({ type: "raidMiss", id: k.id, pity: t.Raids.pity(Ie.event.reg, Ie.event.date) })),
        h.event && Le.push(...ks(h, k, ja)),
        h.once && ja?.success && (Ie.gifts[h.once] = !0),
        h.pay && ja?.success && f.addItem(h.pay[0], -Math.min(h.pay[1], f.itemCount(h.pay[0]))),
        f.S.stats.wins++,
        Le.push({ type: "victory", kind: h.kind, money: $a }));
      const pn = a.SOULS;
      (h.kind === "wild" &&
        !Nt &&
        !Ie.zone &&
        !Ie.gifts?.[pn.once] &&
        f.DEX[k.id]?.types.includes(pn.type) &&
        b.regionOf(Ie.chapter)?.key === pn.region &&
        f.itemCount(pn.item) < pn.need &&
        Je() &&
        Math.random() < pn.rate &&
        Ze(pn.item) &&
        Le.push({ type: "soul", enemy: k, n: f.itemCount(pn.item), need: pn.need }),
        (Ie.battle = null),
        Dn());
    } else if (!ea(h).length) {
      wn(h, !0);
      const $a = h.kind === "gym" && `${Ie.chapter}:${h.gym.leader}`,
        Fa = $a && ((h.gym.badge && Ie.badges.includes(h.gym.badge)) || Ie.paidLeaders?.[$a]),
        fa = !!b.CHAPTERS[Ie.chapter]?.league,
        ga = (h.league || fa) && f.regionDone(b.regionOf(Ie.chapter).key),
        qa = fa && !ga ? a.LEAGUE_TRAINERS.replayMoney : a.LEADER_REPLAY_MONEY,
        ja = Nt
          ? 0
          : Math.round(
              (h.kind === "gym"
                ? h.gym.reward * (fa ? a.LEAGUE_TRAINERS.reward : 1) * (Fa ? qa : 1)
                : a.TRAINER_MONEY(Math.max(...h.enemies.map((Qn) => Qn.level))) *
                  (h.league ? (ga ? a.LEAGUE_TRAINERS.moneyWon : a.LEAGUE_TRAINERS.money) : 1)) *
                f.behindMoney(Ie.chapter) *
                a.MONEY_GAIN *
                f.buffMult("money"),
            );
      ($a && !Nt && ((Ie.paidLeaders ||= {})[$a] = 1), f.earn(ja));
      let pn = null;
      (h.kind === "gym" &&
        !Nt &&
        h.gym.badge &&
        !Ie.badges.includes(h.gym.badge) &&
        (Ie.badges.push(h.gym.badge), (pn = h.gym)),
        t.BadgeShine?.sync());
      const dn =
        h.kind === "gym" && { Giovanni: "giovanni", "Admin Rocket": "archer", Louka: "barry" }[h.gym.leader];
      (dn &&
        !Nt &&
        ft().length === f.teamMons().length &&
        ((f.S.trainer.feats = f.S.trainer.feats || {})[dn] = !0),
        h.kind === "gym" &&
          h.gym.keep &&
          !Nt &&
          (Ie.kept[Ie.chapter] = Ie.kept[Ie.chapter] || []).push(h.gym.leader),
        f.S.stats.wins++,
        Nt || f.tally("trainers", b.regionOf(Ie.chapter)?.key));
      const _n =
          h.kind === "trainer" && !Nt && ls() && Math.random() < a.COINS.trainerChance
            ? ue(...a.COINS.trainer)
            : 0,
        as = _n ? Ze("coin", _n) : 0;
      (Le.push({
        type: "victory",
        kind: h.kind,
        trainer: h.trainer,
        sprite: h.sprite,
        money: ja,
        coins: as,
        badge: pn,
        gym: h.gym,
      }),
        (Ie.battle = null),
        Dn());
    }
    return Le;
  }
  const an = () => Object.fromEntries(f.teamMons().map((h) => [h.uid, f.curHp(h)]));
  function Wn(h, k = B().chapter) {
    const ne = B();
    return (
      k < (ne.unlocked || 0) ||
      !!(h?.badge && ne.badges?.includes(h.badge)) ||
      !!ne.paidLeaders?.[`${k}:${h?.leader}`]
    );
  }
  function wn(h, k) {
    const ne = B();
    if (h?.kind !== "gym" || !h.gym?.leader || ne.event || ne.zone || ne.tower || ne.league) return;
    const Ie = ne.chapter,
      Le = h.gym.leader;
    if (Wn(h.gym, Ie)) return;
    const Pt = (((ne.gyms ||= {})[Ie] ||= {})[Le] ||= { w: 0, l: 0, m: {} });
    if (Pt.w) return;
    const Nt = f.teamMons();
    k
      ? ((Pt.w = 1),
        (Pt.lv = Math.round(Nt.reduce((Qt, ma) => Qt + ma.level, 0) / (Nt.length || 1))),
        (Pt.t = Math.round(ne.chTime?.[Ie] || 0)))
      : Pt.l++;
    for (const Qt of new Set(Nt.map((ma) => ma.id))) (Pt.m[Qt] ||= [0, 0])[k ? 0 : 1]++;
  }
  function Bn(h) {
    const k = B();
    if (k.tower) return ((k.battle = null), bt());
    const ne =
      k.battle?.kind === "gym" &&
      !k.event &&
      !k.zone &&
      !k.league &&
      !b.CHAPTERS[k.chapter]?.league &&
      k.battle.gym;
    if (ne && ((ne.badge && k.badges.includes(ne.badge)) || k.paidLeaders?.[`${k.chapter}:${ne.leader}`]))
      return (
        (k.battle = null),
        f.healTeam(),
        Dn(),
        [
          {
            type: "skip",
            node: k.nodes[k.node - 1],
            text: e("{leader} te laisse passer : tu l'as déjà battu.", { leader: e(ne.leader) }),
          },
        ]
      );
    const Ie = k.battle?.kind;
    (wn(k.battle, !1), (k.battle = null));
    const Le = k.chapter;
    ((k.deaths = k.deaths || {}), !k.zone?.elite && !k.league && (k.deaths[Le] = (k.deaths[Le] || 0) + 1));
    const Pt = k.nodes.map((Fa, fa) => [Fa, fa]).filter(([Fa]) => Fa.type === "heal"),
      Nt = (Pt.filter(([, Fa]) => Fa < k.node).pop() || Pt[0])?.[0].name || null,
      Qt = an(),
      ma = k.zone?.elite
        ? {
            zone: k.zone.id,
            foe: k.zone.foe,
            tier: k.zone.elite,
            tries: (k.zone.tries = (k.zone.tries || 1) + 1),
          }
        : null,
      $a = k.league
        ? { reg: k.league.reg, tier: k.league.tier, tries: (k.league.tries = (k.league.tries || 1) + 1) }
        : null;
    return (
      k.event
        ? Q()
        : k.league
          ? (W(), delete k.league.team)
          : k.zone
            ? Yt()
            : ns(Hn(Le)) && Sn().length
              ? jt(Bt(Le), !0)
              : jt(b.leagueOf(Le)?.[0] ?? Le, !0),
      f.healTeam(),
      k.league && (k.league.team = [...f.S.road]),
      (k.event || k.zone || k.league) && t.Update?.between(),
      [
        {
          type: "defeat",
          chapter: Le,
          reason: h,
          center: Nt,
          before: Qt,
          event: k.event?.id,
          raid: !!k.event?.raid,
          ...(ma ? { elite: ma } : {}),
          ...($a ? { league: $a } : {}),
        },
      ]
    );
  }
  const C = typeof location > "u" || /^(localhost|127\.0\.0\.1)$/.test(location.hostname),
    g = (h) => a.SPEED_PACE?.[h] ?? h;
  function E(h = $()) {
    const k = +h?.speed || 1;
    return g(C || a.SPEEDS.includes(k) ? Math.max(1, k) : Math.max(1, ...a.SPEEDS.filter((ne) => ne <= k)));
  }
  function q(h) {
    const k = $();
    if (k.event) {
      ((k.event.runMs = (k.event.runMs || 0) + h), k.event.loopMs != null && (k.event.loopMs += h / E(k)));
      return;
    }
    if (!(k.zone || k.league)) {
      if (k.tower) {
        ee(k).addMs(h);
        return;
      }
      ((k.chTime = k.chTime || {}), (k.chTime[k.chapter] = (k.chTime[k.chapter] || 0) + h));
    }
  }
  function Pe() {
    return (q(a.STEP_MS), Xa());
  }
  const at = (1.25 * Math.max(...a.SPEEDS.map(g))) / (a.STEP_MS / 2),
    Mt = 30;
  let Pa = Mt,
    Ta = null;
  function La() {
    if (C || rn || f.inSandbox()) return !0;
    const h = zn.now();
    return ((Pa = Math.min(Mt, Pa + (Ta == null ? 0 : (h - Ta) * at))), (Ta = h), Pa < 1 ? !1 : (Pa--, !0));
  }
  const xa = () => (La() ? Xa() : []),
    en = () => (La() ? Pe() : []);
  let rn = !1;
  const hn = typeof document > "u";
  let Fn = null;
  function Ln() {
    const h = f.time();
    return Math.max(0, Math.min(h - (Fn ?? f.S.lastTick ?? h), a.OFFLINE_MAX_MS));
  }
  function Pn(h) {
    hn || ((h = Math.min(Math.max(0, +h || 0), Ln())), (Fn = f.time()));
    const k = $(),
      ne = {
        steps: 0,
        battles: 0,
        captures: [],
        money: f.S.money,
        levels: {},
        evolves: {},
        chapters: 0,
        defeats: 0,
        items: 0,
      },
      Ie = { granted: 0, got: {} },
      Le = {};
    let Pt = h,
      Nt = null;
    const Qt = f.time() - h,
      ma = (pn) => f.setClock((Nt = pn)),
      $a = (pn) => {
        for (const dn of pn) {
          (dn.type === "victory" && ne.battles++,
            dn.type === "capture" &&
              dn.success &&
              !dn.candy &&
              ne.captures.push({
                id: dn.enemy.id,
                shiny: dn.enemy.shiny,
                isNew: !!dn.isNew,
                level: dn.enemy.level,
                where: dn.where,
                ch: dn.ch,
              }),
            dn.type === "capture" &&
              !dn.success &&
              dn.enemy.shiny &&
              !dn.raid &&
              !dn.event &&
              !dn.roam &&
              (ne.shinyFled = (ne.shinyFled || 0) + 1),
            dn.type === "captureSkip" && dn.shiny && (ne.shinyFull = (ne.shinyFull || 0) + 1));
          for (const _n of dn.candy?.fed || [])
            (_n.levels && (ne.levels[_n.uid] = (ne.levels[_n.uid] || 0) + _n.levels),
              _n.evolve && (ne.evolves[_n.uid] = _n.evolve));
          if (
            (dn.type === "xp" && dn.levels && (ne.levels[dn.uid] = (ne.levels[dn.uid] || 0) + dn.levels),
            dn.type === "xp" && dn.evolve && (ne.evolves[dn.uid] = dn.evolve),
            dn.type === "buddyCandy")
          )
            for (const _n of dn.fed)
              (_n.levels && (ne.levels[_n.uid] = (ne.levels[_n.uid] || 0) + _n.levels),
                _n.evolve && (ne.evolves[_n.uid] = _n.evolve));
          (dn.type === "chapterEnd" && ne.chapters++, dn.type === "defeat" && ne.defeats++);
        }
      },
      Fa = a.ACTION_MS / E(k);
    function* fa(pn, dn) {
      for (; Pt > 0 && h - Pt < dn && pn() && !k.pending;) {
        (ma(Qt + h - Pt), q(a.ACTION_MS));
        const _n = Xa();
        ((Pt -= Fa), ne.steps++, $a(_n));
        for (const as of _n) {
          if (
            (as.type === "raidDone" && Object.assign(ne.raid, { caught: !0, ms: t.Raids.state.lastTime?.ms }),
            as.type === "zoneDone" && (ne.legend.caught = !0),
            as.type === "capture" &&
              as.success &&
              as.enemy.id === (ne.raid || ne.legend)?.id &&
              ((ne.raid || ne.legend).level = as.enemy.level),
            as.type === "towerFloor")
          ) {
            ne.tower.floors++;
            for (const [Qn, os] of Object.entries(as.got || {}))
              typeof os == "number" && (ne.tower.got[Qn] = (ne.tower.got[Qn] || 0) + os);
          }
          as.type === "towerEnd" && Object.assign(ne.tower, { ended: !0, floor: as.floor });
        }
        if (ne.steps > 2e5) break;
        yield;
      }
    }
    function* ga() {
      if (
        (k.event?.raid &&
          ((ne.raid = { id: k.event.id, reg: k.event.reg, caught: !1 }),
          yield* fa(() => k.event?.raid, 1 / 0)),
        k.zone?.riddle && (ma(Qt + h), k.pending?.waitAt ? $a(Xa()) : k.pending ? va("pass") : zt()),
        (k.league || k.zone?.elite) && h <= a.ELITE.FREEZE_MS)
      )
        return;
      if (
        (k.league && Lt(),
        k.zone?.elite && zt(),
        k.zone &&
          !k.zone.riddle &&
          ((ne.legend = { id: k.zone.foe ?? k.zone.id, zone: k.zone.id, caught: !1 }),
          yield* fa(() => k.zone, 1 / 0)),
        k.tower)
      ) {
        const dn = ee(k);
        ((ne.tower = {
          kind: k.tower.kind || "tower",
          floors: 0,
          ended: !1,
          floor: dn.run()?.floor ?? 0,
          got: {},
        }),
          yield* fa(() => k.tower, 1 / 0),
          ne.tower.ended || (ne.tower.floor = dn.run()?.floor ?? ne.tower.floor));
      }
      const pn = () => !k.battle && k.nodes[k.node]?.type === "gym" && !k.event && !k.zone;
      for (
        ;
        Pt > 0 && !k.pending && (f.teamMons().length || (!k.battle && k.nodes[k.node]?.type === "gift"));
      ) {
        if (pn()) {
          const _n = k.chapter,
            as = b.leagueOf(_n)?.[0] ?? _n,
            Qn = ns(Hn(_n)) ? Bt(_n) : null;
          if (Qn != null && Qn !== as) (jt(Qn, !0), f.healTeam(), (ne.rotated = !0));
          else {
            const os = k.nodes[k.node].gym;
            ((ne.leader = { name: os.leader, sprite: os.sprite }), jt(as, !0), (ne.farmed = !0));
          }
          if (pn()) break;
        }
        ma(Qt + h - Pt);
        const dn = Pe();
        ((Pt -= a.OFFLINE_STEP_MS), ne.steps++);
        for (const _n of dn) _n.type === "capture" && (Pt -= a.OFFLINE_STEP_MS * 3);
        if (($a(dn), ne.steps > 2e5)) break;
        yield;
      }
      ((ne.money = f.S.money - ne.money), (ne.items = Ie.granted), (ne.itemList = Object.entries(Ie.got)));
    }
    const qa = ga(),
      ja = {
        sum: ne,
        done: !1,
        failed: !1,
        get progress() {
          return ja.done ? 1 : Math.min(1, Math.max(0, 1 - Pt / h));
        },
        run(pn = 1 / 0) {
          if (ja.done) return !0;
          const dn = se;
          ((se = Ie), f.setAway(Le), f.setClock(Nt), (rn = !0));
          try {
            for (; !qa.next().done;) if (pn < 1 / 0 && zn.now() >= pn) return !1;
            return ((f.S.stats.awayMs = Math.round((f.S.stats.awayMs || 0) + h)), (ja.done = !0));
          } catch (_n) {
            throw ((ja.done = ja.failed = !0), _n);
          } finally {
            ((se = dn), f.setAway(null), f.setClock(null), (rn = !1));
          }
        },
      };
    return ja;
  }
  function jn(h) {
    const k = Pn(h);
    return (k.run(), k.sum);
  }
  t.Adventure = {
    ensure: $,
    step: xa,
    tick: en,
    addTime: q,
    fleeLeft: Y,
    isLooping: ns,
    toggleLoop: Ue,
    loopKey: Hn,
    chooseGift: Zt,
    overrideGift: la,
    npcTrade: Xt,
    npcTradeDone: lt,
    npcOffers: Vt,
    offerHome: ra,
    spareMon: z,
    setChapter: xt,
    simulate: jn,
    buildChapter: jt,
    startEvent: ye,
    startRaid: nt,
    leaveEvent: Ot,
    startZone: Gt,
    leaveZone: zt,
    startLeague: qt,
    leaveLeague: Lt,
    startTower: Qe,
    leaveTower: Ft,
    offline: Pn,
    zonePool: m,
    habitatKey: he,
    spotToday: Ee,
    spotOn: we,
    capeOf: (h, k) => Ne[h]?.[k?.bg] ?? h,
    itemOdds: ct,
    townOdds: Fe,
    honeyAt: U,
    catchProb: oa,
    catchCtx: Et,
    chooseBall: sa,
    effectiveness: Ma,
    aliveTeam: ft,
    fieldSize: gn,
    winChance: It,
    counterValue: Ka,
    counterParts: _a,
    counterTeam: Ut,
    rankAura: aa,
    riposteOf: (h) => Ia(h, null),
    chooseRiddle: va,
    tryCapture: Tn,
    leaderBeaten: Wn,
    speed: () => E(),
    get state() {
      return $();
    },
    get simulating() {
      return rn;
    },
  };
})();
