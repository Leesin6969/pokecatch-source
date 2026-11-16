/**
 * underground
 *
 * Public API on the game namespace `t`: t.Underground
 *
 * Recovered from the shipped bundle — original chunk #32 at byte 785285 (20118 bytes, sha256:20c434a8008bf6ea).
 * This file is one original source file; the build concatenates them in filename order.
 */
t.Underground = (function () {
  const a = t.Game,
    b = () => t.CONFIG.UNDERGROUND,
    f = () => t.STORY,
    ue = (W) => a.withWallet(a.groupOf("sinnoh"), W),
    H = () => ue(() => a.itemCount("event-shard")),
    vt = () => a.walletMoney(a.groupOf("sinnoh")),
    B = () => {
      const W = (a.S.under ||= { day: null, sent: 0, used: {}, slots: [] });
      return (
        W.gems && Object.keys(W.gems).some((ze) => !ze.includes(":")) && Ze(W),
        W.geoSince || Ge(W),
        wt(W),
        W
      );
    },
    se = (W) => [0, 1, 2, 3].map((ze) => (+W.geodes?.[ze] || 0) + (+W.opened?.[ze] || 0));
  function Ge(W) {
    const ze = a.S.stats.geoSeen;
    ((W.geoSince = {
      at: Date.now(),
      n: se(W).map((qt, Lt) => (Number.isFinite(+ze?.[Lt]) ? Math.min(+ze[Lt], qt) : qt)),
    }),
      (a.S.stats.geoIn = [0, 0, 0, 0]));
  }
  function Je(W, ze, qt = 1) {
    qt && (((W.geodes ||= [0, 0, 0, 0])[ze] += qt), ((a.S.stats.geoIn ||= [0, 0, 0, 0])[ze] += qt));
  }
  function Ze(W) {
    const ze = {};
    for (const [qt, Lt] of Object.entries(W.gems)) {
      const zt = /^\d+$/.test(qt) ? (a.DEX[+qt] ? jt(+qt) : null) : qt;
      zt && Lt > 0 && (ze[zt] = (ze[zt] || 0) + Lt);
    }
    ((W.gems = ze), delete W.offer);
  }
  const x = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Europe/Paris",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      hourCycle: "h23",
    }),
    $ = (W) => Object.fromEntries(x.formatToParts(W).map((ze) => [ze.type, ze.value])),
    X = (W = a.time()) => {
      const ze = $(W);
      return `${ze.year}-${ze.month}-${ze.day}`;
    };
  function Tt() {
    const W = B(),
      ze = X();
    return (W.day !== ze && Object.assign(W, { day: ze, sent: 0, used: {} }), W);
  }
  const le = new Map();
  function P(W, ze) {
    const qt = W(ze);
    if (le.get(W)?.k === qt) return le.get(W).t;
    let Lt = ze,
      zt = ze + 26 * 36e5;
    for (; zt - Lt > 1;) {
      const ca = Math.floor((Lt + zt) / 2);
      W(ca) === qt ? (Lt = ca) : (zt = ca);
    }
    return (le.set(W, { k: qt, t: zt }), zt);
  }
  const u = (W = a.time()) => P(X, W),
    ve = () => a.S.adv?.badges || [],
    it = () => ve().includes(b().OPEN_BADGE),
    De = () => Math.min(B().extra || 0, b().SLOT_BUY.length),
    je = () => Math.max(b().SLOTS + De(), B().slots.length),
    pt = () => b().SLOT_BUY[De()] ?? null,
    re = () => b().PER_BOUGHT.reduce((W, ze, qt) => W + (qt < De() ? ze : 0), b().PER_DAY),
    We = () => b().PER_BOUGHT[De()] ?? 0,
    oe = () => Math.max(0, re() - Tt().sent);
  function $e() {
    const W = B(),
      ze = pt();
    return ze == null
      ? { error: e("Tous les emplacements sont ouverts.") }
      : H() < ze
        ? { error: e("Pas assez d'Éclats.") }
        : (ue(() => a.addItem("event-shard", -ze)), (W.extra = De() + 1), a.save(), !0);
  }
  const Z = (W) => b().THEMES.find((ze) => ze.key === W) || b().THEMES[0],
    A = (...W) => {
      for (let ze = W.length; ze >= 0; ze--) {
        const qt = new Set(W.slice(0, ze).flat()),
          Lt = b().THEMES.filter((zt) => !qt.has(zt.key));
        if (Lt.length) return Lt[Math.floor(Math.random() * Lt.length)].key;
      }
      return b().THEMES[0].key;
    },
    J = (W) => B().slots.find((ze) => ze.bay === W) || null,
    de = () =>
      Array.from({ length: Math.max(je(), ...B().slots.map((W) => (W.bay ?? -1) + 1)) }, (W, ze) => ze),
    _e = (W) => J(W)?.theme || B().next?.[W] || null,
    Re = (W) => {
      const ze = de().filter((qt) => qt !== W);
      return { shown: ze.map(_e).filter(Boolean), next: ze.map((qt) => B().next?.[qt]).filter(Boolean) };
    };
  function dt(W = 0) {
    const ze = (B().next ||= {}),
      qt = !J(W) && ze[W] && de().some((Lt) => Lt !== W && _e(Lt) === ze[W] && (J(Lt) || Lt < W));
    if (!ze[W] || qt) {
      const Lt = Re(W);
      ((ze[W] = A(Lt.shown, Lt.next)), a.save());
    }
    return Z(ze[W]);
  }
  const qe = (W) => !!W && !!t.CandyRun?.run()?.mons?.some((ze) => ze.src === W.uid);
  function ce(W) {
    if (!W || !a.S.mons.includes(W)) return e("Introuvable.");
    if (qe(W)) return e("En run à la Fabrique de Bonbons.");
    const ze = a.can(W, "region", "sinnoh");
    return ze || (Tt().used[W.uid] ? e("Déjà parti aujourd'hui.") : null);
  }
  const tt = () => [1, ...(b().START_FLOORS || []).filter((W) => (B().best || 0) >= W)];
  function mt(W) {
    if (!it()) return e("Le Souterrain ouvre avec le Badge Forêt.");
    if (B().slots.length >= je()) return e("Tous les emplacements sont pris.");
    if (!oe()) return e("Plus d'expédition aujourd'hui.");
    if (!Array.isArray(W) || W.length !== b().TEAM || new Set(W).size !== b().TEAM)
      return e("Choisis {n} Pokémon.", { n: b().TEAM });
    for (const ze of W) {
      const qt = ce(a.getMon(ze));
      if (qt) return qt;
    }
    return null;
  }
  const Te = (W) => Math.min(100, Math.round(b().LV0 + (W - 1) * b().STEP)),
    At = () => Math.ceil((100 - b().LV0) / b().STEP) + 1,
    yt = (W) => 1 + Math.max(0, W - At()) * b().OVER;
  function he(W, ze, qt) {
    return Object.values(a.DEX)
      .filter(
        (Lt) =>
          Lt.id >= W &&
          Lt.id <= ze &&
          !Lt.legendary &&
          !Lt.mythical &&
          !Lt.baby &&
          !Lt.unique &&
          Lt.types.some((zt) => qt.types.includes(zt)) &&
          !(t.EVOLUTIONS[Lt.id] || []).some((zt) => zt.to <= ze && a.DEX[zt.to]),
      )
      .map((Lt) => Lt.id);
  }
  function fe(W) {
    const ze = f().REGIONS.filter((Na) => Na.dex && !Na.follows && a.regionDone(Na.key)),
      qt = Math.max(151, ...ze.map((Na) => Na.dex[1])),
      Lt = he(1, qt, W),
      zt = f().REGIONS.find((Na) => Na.key === "sinnoh")?.dex || [387, 493],
      ca = (Na) => Object.values(a.DEX[Na].stats).reduce((Va, Ba) => Va + Ba, 0),
      Ma = he(zt[0], zt[1], W)
        .sort((Na, Va) => ca(Va) - ca(Na))
        .slice(0, b().GUARD_POOL);
    return { wild: Lt.length ? Lt : Ma, guard: Ma.length ? Ma : Lt };
  }
  function Oe(W, ze, qt = 1) {
    const Lt = [],
      zt = [],
      ca = [],
      Ma = {},
      Na = { name: b().PLACE, scene: b().SCENE, bg: "cave" },
      Va = (Ba) => Ba[Math.floor(Math.random() * Ba.length)];
    for (let Ba = 1; Ba <= b().FLOORS; Ba++) {
      if (Ba < qt) {
        ca.push(null);
        continue;
      }
      const za = Va(ze.wild);
      if (
        (ca.push(za),
        Lt.push({
          ...Na,
          type: "trainer",
          trainer: "Sauvage",
          sprite: "hiker",
          team: [[za, Te(Ba)]],
          statMult: yt(Ba),
        }),
        zt.push(Ba),
        Math.random() < b().CAMP && (Lt.push({ ...Na, type: "heal", name: "Campement" }), zt.push(Ba)),
        b().GUARD_EVERY && Ba % b().GUARD_EVERY === 0)
      ) {
        (Lt.push({ ...Na, type: "heal", name: "Campement" }), zt.push(Ba));
        const vn = Va(ze.guard);
        ((Ma[Ba] = vn),
          Lt.push({
            ...Na,
            type: "trainer",
            trainer: "Gardien",
            sprite: "hiker",
            guard: !0,
            team: [[vn, Te(Ba)]],
            statMult: yt(Ba) * b().GUARD_MULT,
          }),
          zt.push(Ba));
      }
    }
    return { nodes: Lt, floorAt: zt, foes: ca, gfoes: Ma };
  }
  function Ee(W, ze) {
    const qt = a.S,
      Lt = a.freshState();
    return (
      (Lt.mons = W.map((zt) => {
        const ca = JSON.parse(JSON.stringify(zt));
        return (delete ca.hp, delete ca.status, ca);
      })),
      (Lt.team = Lt.mons.map((zt) => zt.uid)),
      (Lt.link = qt.link ? JSON.parse(JSON.stringify(qt.link)) : Lt.link),
      (Lt.trainer = qt.trainer),
      (Lt.muted = !0),
      Lt
    );
  }
  const et = (W) => b().WALL_MS * b().WALL_SLOW[Math.max(0, Math.min(3, W))],
    _ = () => new Promise((W) => Wa(W, 0)),
    we = (W) => {
      const ze = [...W];
      for (let qt = ze.length - 1; qt > 0; qt--) {
        const Lt = Math.floor(Math.random() * (qt + 1));
        [ze[qt], ze[Lt]] = [ze[Lt], ze[qt]];
      }
      return ze;
    };
  async function ie(W, ze, qt = 1) {
    const Lt = t.Adventure,
      zt = Oe(ze, fe(ze), qt),
      ca = Ee(W, ze),
      Ma = ca.team,
      Na = a.S.adv,
      Va = Object.fromEntries(Ma.map((On) => [On, []])),
      Ba = Object.fromEntries(Ma.map((On) => [On, []])),
      za = Object.fromEntries(Ma.map((On) => [On, 0])),
      vn = [];
    let An = 0,
      on = 0,
      qn = 0,
      xn = !1,
      fn = null;
    const Yn = ca.link && JSON.parse(JSON.stringify(ca.link));
    a.sandbox(ca, () => {
      const On = Lt.ensure();
      ((a.S.team = [...Ma]),
        (a.S.link = Yn),
        Object.assign(On, {
          unlocked: Na?.unlocked || 0,
          badges: [...(Na?.badges || [])],
          chapter: Na?.chapter || 0,
        }),
        Object.assign(On, {
          nodes: zt.nodes,
          node: 0,
          battle: null,
          pending: null,
          event: null,
          zone: null,
          tower: null,
        }));
    });
    let Zn = 0;
    const is = (On) => {
      for (; vn.length < On;) {
        if (vn.length + 1 < qt) {
          vn.push(0);
          for (const Kt of Ma) (Va[Kt].push(0), Ba[Kt].push(1));
          continue;
        }
        const Me = vn.length,
          It = Ma.filter((Kt) => (Ba[Kt][Me - 1] ?? 1) > 0).length;
        ((Zn += b().FLOOR_EXTRA + et(It) / b().STEP_MS), vn.push(Math.round(An + Zn)));
        for (const Kt of Ma) Va[Kt].push(za[Kt]);
        for (const Kt of ca.mons) Ba[Kt.uid]?.push(Math.round((a.curHp(Kt) / a.maxHp(Kt)) * 100) / 100);
      }
    };
    for (; !xn;)
      (a.sandbox(ca, () => {
        const On = a.S.adv;
        for (let Me = 0; Me < 400 && !xn; Me++) {
          if (!On.battle)
            for (const Ka of ["team", "road"]) Array.isArray(a.S[Ka]) && (a.S[Ka] = we(a.S[Ka]));
          const It = On.node,
            Kt = Lt.step();
          An++;
          for (const Ka of Kt) Ka.type === "xp" && za[Ka.uid] != null && (za[Ka.uid] += Ka.amount || 0);
          if (Kt.some((Ka) => Ka.type === "defeat")) {
            ((fn = zt.nodes[It]?.guard ? "guard" : "wild"), (xn = !0));
            break;
          }
          if (On.nodes !== zt.nodes) {
            (is(b().FLOORS), (on = b().FLOORS), (xn = !0));
            break;
          }
          On.node > It && zt.nodes[It]?.guard && qn++;
          const Aa = (zt.floorAt[On.node] ?? b().FLOORS + 1) - 1;
          (Aa > on && ((on = Aa), is(on)), An > 2e5 && (xn = !0));
        }
      }),
        xn || (await _()));
    const ts = vn[vn.length - 1] ?? 0,
      Jn = on >= b().FLOORS ? ts : Math.max(ts, Math.round(An + Zn));
    return {
      floors: on,
      guards: qn,
      loot: lt(on, ze, qt),
      foes: zt.foes.slice(0, on + 1),
      gfoes: Object.fromEntries(Object.entries(zt.gfoes).filter(([On]) => +On <= on + 1)),
      at: vn,
      xp: Va,
      hp: Ba,
      steps: An,
      end: Jn,
      lost: fn,
    };
  }
  const U = () => b().LOOT,
    Ne = (W) => t.STORY.regionUnlocked(W, a.S.adv),
    T = (W) => {
      if (W.endsWith("-stone") && !/^(fire|water|thunder|leaf|moon)-/.test(W))
        return Ne(W === "sun-stone" ? "johto" : "sinnoh");
      const ze = Object.values(t.EVOLUTIONS).flatMap((qt) => qt.filter((Lt) => Lt.item === W));
      return !ze.length || ze.some((qt) => Ne(a.regionOfDex(qt.to)));
    },
    L = () => {
      const W = t.WorldBoss,
        ze = a.S,
        qt = W?.state();
      return (
        !!W?.open() &&
        (!!ze.wb?.live ||
          (!!qt && qt.phase !== "soon" && !(qt.phase === "calm" && !qt.n)) ||
          !!ze.seen?.[493] ||
          !!ze.dex?.[493])
      );
    };
  function R() {
    const W = Object.entries(U().FOSSILS)
      .filter(([ze]) => Ne(ze))
      .flatMap(([ze, qt]) => qt.map(([Lt, zt]) => ({ id: Lt, lv: zt, reg: ze })));
    return U()
      .ITEMS.map((ze) => ({
        ...ze,
        of: ze.kind === "item" ? (ze.of || [ze.id]).filter(T) : ze.kind === "fossil" ? W : null,
      }))
      .filter((ze) => (!ze.of || ze.of.length) && (ze.kind !== "plate" || L()));
  }
  const te = (W) => {
      let ze = 0;
      return (
        U().BANDS.forEach((qt, Lt) => {
          W >= qt && (ze = Lt);
        }),
        ze
      );
    },
    K = (W, ze) => {
      let qt = Math.random() * W.reduce((Lt, zt) => Lt + ze(zt), 0);
      for (const Lt of W) if ((qt -= ze(Lt)) < 0) return Lt;
      return W[W.length - 1];
    },
    He = (W) => a.owns(t.FORMS?.plateForm(W)),
    m = () =>
      new Set(
        B()
          .slots.flatMap((W) => (W.res?.loot || []).flat())
          .filter((W) => W?.k === "plate")
          .map((W) => W.type),
      ),
    z = () => {
      const W = m();
      return Object.keys(U().PLATES).filter((ze) => !B().plates?.[ze] && !He(ze) && !W.has(ze));
    };
  function pe(W, ze, qt, Lt, zt = z()) {
    const ca = W.filter((za) => za.w[ze] > 0 && (!qt || za.guard));
    if (!ca.length) return null;
    const Ma = K(ca, (za) => za.w[ze]),
      Na = qt ? U().GUARD_MULT : 1,
      Va = (za) => za[Math.floor(Math.random() * za.length)],
      Ba = () =>
        K(
          ca.filter((za) => za.kind === "geode"),
          (za) => za.w[ze],
        )?.tier ?? 0;
    switch (Ma.kind) {
      case "money":
        return { k: "money", n: U().MONEY[ze] * Na };
      case "shards":
        return { k: "shards", n: U().SHARDS[ze] * Na };
      case "item":
        return { k: "item", id: Va(Ma.of) };
      case "geode":
        return { k: "geode", t: Ma.tier };
      case "fossil": {
        const za = Va(Ma.of);
        return { k: "fossil", id: za.id, lv: za.lv, reg: za.reg };
      }
      case "plate": {
        if (!zt.length) return null;
        const za = K(zt, (vn) => (Lt.types.includes(vn) ? U().PLATE_THEME : 1));
        return (zt.splice(zt.indexOf(za), 1), { k: "plate", type: za, t: Ba() });
      }
    }
    return null;
  }
  function V(
    W,
    ze = [
      [1, 100],
      [100, 150],
    ],
  ) {
    const qt = R(),
      Lt = z();
    Lt.includes(W) || (Lt.length = 0);
    const zt = (za, vn) => {
        const An = qt.filter((qn) => qn.w[za] > 0 && (!vn || qn.guard)),
          on = An.find((qn) => qn.kind === "plate");
        return on ? on.w[za] / An.reduce((qn, xn) => qn + xn.w[za], 0) : 0;
      },
      ca = (za) => {
        const vn = (An) => (za.types.includes(An) ? U().PLATE_THEME : 1);
        return Lt.length ? vn(W) / Lt.reduce((An, on) => An + vn(on), 0) : 0;
      },
      Ma = (za, vn) => {
        let An = 0;
        for (let on = za; on <= vn; on++) {
          const qn = te(on);
          ((An += U().WALL_ROLLS * zt(qn, !1)),
            b().GUARD_EVERY && on % b().GUARD_EVERY === 0 && (An += U().GUARD_ROLLS * zt(qn, !0)));
        }
        return An;
      },
      Na = b().THEMES.find((za) => za.types.includes(W)),
      Va = b().THEMES.filter((za) => za !== Na),
      Ba = Va.reduce((za, vn) => za + ca(vn), 0) / Math.max(1, Va.length);
    return {
      theme: Na,
      rows: ze.map(([za, vn]) => {
        const An = Ma(za, vn);
        return { from: za, to: vn, theme: Na ? An * ca(Na) : null, other: An * Ba };
      }),
    };
  }
  function lt(W, ze, qt = 1) {
    const Lt = R(),
      zt = [],
      ca = z();
    for (let Ma = 1; Ma <= W; Ma++) {
      if (Ma < qt) {
        zt.push([]);
        continue;
      }
      const Na = te(Ma),
        Va = [{ k: "money", n: U().FIGHT[Na] }];
      for (let Ba = 0; Ba < U().WALL_ROLLS; Ba++) {
        const za = pe(Lt, Na, !1, ze, ca);
        za && Va.push(za);
      }
      if (b().GUARD_EVERY && Ma % b().GUARD_EVERY === 0) {
        Va.push({ k: "shards", n: U().GUARD_SHARDS[Na], guard: !0 });
        for (let Ba = 0; Ba < U().GUARD_ROLLS; Ba++) {
          const za = pe(Lt, Na, !0, ze, ca);
          za && Va.push({ ...za, guard: !0 });
        }
      }
      zt.push(Va);
    }
    return zt;
  }
  function kt(W, ze, qt = W.res.loot) {
    const Lt = { money: 0, shards: 0, items: {}, geodes: [0, 0, 0, 0], plates: [], fossils: [] };
    for (const zt of (qt || []).slice(0, ze))
      for (const ca of zt)
        ca.k === "money"
          ? (Lt.money += ca.n)
          : ca.k === "shards"
            ? (Lt.shards += ca.n)
            : ca.k === "item"
              ? (Lt.items[ca.id] = (Lt.items[ca.id] || 0) + 1)
              : ca.k === "geode"
                ? Lt.geodes[ca.t]++
                : ca.k === "plate"
                  ? Lt.plates.push(ca)
                  : ca.k === "fossil" && Lt.fossils.push(ca);
    return Lt;
  }
  function ra(W) {
    const ze = W.res || {},
      qt = Math.max(1, W.from || 1),
      Lt = U(),
      zt = R(),
      ca = [0, 1, 2, 3],
      Ma = new Set(zt.filter((on) => on.kind === "item").flatMap((on) => on.of)),
      Na = zt.filter((on) => on.kind === "fossil").flatMap((on) => on.of),
      Va = Object.keys(Lt.PLATES),
      Ba = Array.isArray(ze.at) ? ze.at : [],
      za = Math.floor(b().FLOOR_EXTRA + (b().WALL_MS * Math.min(...b().WALL_SLOW)) / b().STEP_MS);
    let vn = Math.max(0, Math.min(Math.floor(+ze.floors || 0), b().FLOORS, Ba.length));
    for (let on = qt; on <= vn; on++)
      if (!(Ba[on - 1] - (on > qt ? Ba[on - 2] : 0) >= za)) {
        vn = on - 1;
        break;
      }
    const An = (Array.isArray(ze.loot) ? ze.loot : []).slice(0, vn).map((on, qn) => {
      const xn = qn + 1,
        fn = te(xn),
        Yn = !!b().GUARD_EVERY && xn % b().GUARD_EVERY === 0,
        Zn = [];
      if (xn < qt || !Array.isArray(on)) return Zn;
      let is = !1,
        ts = !1,
        Jn = 0,
        On = 0;
      for (const Me of on) {
        if (!Me || typeof Me != "object") continue;
        const It = !!Me.guard;
        if (It && !Yn) continue;
        if (!It && !is && Me.k === "money" && Me.n === Lt.FIGHT[fn]) {
          ((is = !0), Zn.push(Me));
          continue;
        }
        if (It && !ts && Me.k === "shards" && Me.n === Lt.GUARD_SHARDS[fn]) {
          ((ts = !0), Zn.push(Me));
          continue;
        }
        if (It ? On >= Lt.GUARD_ROLLS : Jn >= Lt.WALL_ROLLS) continue;
        const Kt = It ? Lt.GUARD_MULT : 1;
        (Me.k === "money"
          ? Me.n === Lt.MONEY[fn] * Kt
          : Me.k === "shards"
            ? Me.n === Lt.SHARDS[fn] * Kt
            : Me.k === "item"
              ? Ma.has(Me.id)
              : Me.k === "geode"
                ? ca.includes(Me.t)
                : Me.k === "plate"
                  ? L() && Va.includes(Me.type) && ca.includes(Me.t)
                  : Me.k === "fossil" &&
                    Na.some((Ka) => Ka.id === Me.id && Ka.lv === Me.lv && Ka.reg === Me.reg)) &&
          (It ? On++ : Jn++, Zn.push(Me));
      }
      return Zn;
    });
    return { floors: vn, loot: An };
  }
  function Vt(W, ze, qt) {
    const Lt = kt(W, ze, qt),
      zt = B(),
      ca = {
        money: Lt.money,
        shards: Lt.shards,
        items: Lt.items,
        geodes: [...Lt.geodes],
        plates: [],
        fossils: [],
      },
      Ma = ((a.S.adv ||= {}).gifts ||= {});
    ue(() => {
      (Lt.money && a.earn(Lt.money), Lt.shards && a.addItem("event-shard", Lt.shards));
      for (const [Va, Ba] of Object.entries(Lt.items))
        (a.addItem(Va, Ba), t.CONFIG.SHOP.some((za) => za.once === Va) && (Ma[Va] = !0));
    });
    const Na = (zt.plates ||= {});
    for (const Va of Lt.plates)
      Na[Va.type] || He(Va.type) ? ca.geodes[Va.t]++ : ((Na[Va.type] = 1), ca.plates.push(Va.type));
    ca.geodes.forEach((Va, Ba) => Je(zt, Ba, Va));
    for (const [Va, Ba] of Lt.fossils.entries()) {
      const za = a.makeMon(Ba.id, Ba.lv, {
        shiny: a.fixedRoll("fossil:" + (W.id ?? W.start), ze, Va) < a.shinyRate(Ba.reg),
      });
      za.where = b().PLACE;
      const vn = a.receive(za, { home: Ba.reg });
      ca.fossils.push({ mon: vn.mon, isNew: !!vn.isNew, dup: vn.dup || null });
    }
    return ca;
  }
  let Xt = !1;
  async function Ht(W, ze = null, qt = 1) {
    const Lt = mt(W);
    if (Lt) return { error: Lt };
    if (!tt().includes(qt)) return { error: e("Atteins d'abord l'étage {n}.", { n: qt }) };
    if (Xt) return { error: e("Une expédition se prépare déjà.") };
    Xt = !0;
    try {
      const zt = dt(ze ?? 0),
        ca = W.map((on) => a.getMon(on)),
        Ma = await ie(ca, zt, qt);
      if (ct(Ma)) return { error: e("Ces Pokémon ne peuvent pas combattre ici.") };
      const Na = mt(W);
      if (Na) return { error: Na };
      const Va = Tt();
      Va.sent++;
      for (const on of W) ((Va.used[on] = 1), a.takeOutMon(on));
      const Ba = a.time(),
        za = Ba + (Math.max(Ma.end ?? 0, Ma.at[Ma.at.length - 1] ?? Ma.steps) + 1) * b().STEP_MS,
        vn = {
          id: a.uid(),
          team: W,
          mons: ca,
          theme: zt.key,
          start: Ba,
          end: za,
          res: Ma,
          bay: ze,
          from: qt,
        };
      B().slots.push(vn);
      const An = Re(ze ?? 0);
      return ((B().next[ze ?? 0] = A([zt.key], An.shown, An.next)), a.save(), vn);
    } finally {
      Xt = !1;
    }
  }
  const ct = (W) => !W?.floors && W?.steps > 2e5;
  function wt(W) {
    for (const ze of W.slots || []) ze.recalled == null && ct(ze.res) && (ze.recalled = ze.start);
  }
  function ge(W, ze = a.time()) {
    const qt = W.recalled ?? ze,
      Lt = (qt - W.start) / b().STEP_MS,
      zt = W.res.at;
    let ca = 0;
    for (; ca < zt.length && zt[ca] <= Lt;) ca++;
    const Ma = qt >= W.end || W.recalled != null;
    return (
      Ma && W.recalled == null && (ca = W.res.floors),
      {
        floor: ca,
        done: Ma,
        next: ca < zt.length ? W.start + zt[ca] * b().STEP_MS : null,
        ko: Ma && W.recalled == null,
      }
    );
  }
  function Fe(W) {
    const ze = B().slots.find((qt) => qt.id === W);
    return !ze || ge(ze).done ? !1 : ((ze.recalled = a.time()), a.save(), !0);
  }
  function gt(W) {
    const ze = B(),
      qt = ze.slots.find((Ba) => Ba.id === W);
    if (!qt) return null;
    const Lt = ge(qt);
    if (!Lt.done) return null;
    if (((ze.slots = ze.slots.filter((Ba) => Ba !== qt)), qt.mons.some((Ba) => a.getMon(Ba.uid))))
      return (a.save(), null);
    if (ct(qt.res) && X(qt.start) === Tt().day) {
      ze.sent = Math.max(0, ze.sent - 1);
      for (const Ba of qt.mons) delete ze.used[Ba.uid];
    }
    const zt = ra(qt),
      ca = Math.min(Lt.floor, zt.floors),
      Ma = [];
    for (const Ba of qt.mons) {
      a.putInMon(Ba);
      const za = (ca && qt.res.xp?.[Ba.uid]?.[ca - 1]) || 0,
        vn = za ? a.gainXp(Ba, za) : { levels: 0, evolve: null };
      Ma.push({ uid: Ba.uid, amount: za, levels: vn.levels, evolve: vn.evolve });
    }
    const Na = Vt(qt, ca, zt.loot),
      Va = Dt(ca);
    return (a.save(), { floor: ca, from: qt.from || 1, ko: Lt.ko, xp: Ma, loot: Na, miles: Va });
  }
  function Dt(W) {
    const ze = B(),
      qt = (ze.miles ||= {}),
      Lt = [];
    ze.best = Math.max(ze.best || 0, W);
    for (const zt of b().MILESTONES || [])
      W < zt.floor || qt[zt.floor] || ((qt[zt.floor] = 1), zt.geode != null && Je(ze, zt.geode), Lt.push(zt));
    return Lt;
  }
  const ha = () => B().best || 0;
  function _t() {
    let W = t.STORY.REGIONS.filter((zt) => zt.dex && !zt.follows && a.regionDone(zt.key));
    W.length ||
      (W = t.STORY.REGIONS.filter((zt) => zt.dex && !zt.follows && t.STORY.regionUnlocked(zt.key, a.S.adv)));
    const ze = new Set(W.flatMap((zt) => a.regionDexIds(zt)).filter((zt) => a.DEX[zt])),
      qt = [[], [], [], []];
    for (const zt of ze) {
      const ca = a.tierIndex(zt);
      ca >= 0 && ca <= 3 && qt[ca].push(zt);
    }
    const Lt = new Set((t.FORMS?.formsOf(493) || []).filter((zt) => zt !== 493 && a.DEX[zt] && !ze.has(zt)));
    for (const zt of new Set(a.ownedMons().map((ca) => ca.id))) Lt.has(zt) && qt[3].push(zt);
    return qt;
  }
  function Ea(W, ze) {
    const qt = B(),
      Lt = (qt.geodes ||= [0, 0, 0, 0]);
    if (!(Lt[W] > 0)) return null;
    const zt = (qt.opened ||= [0, 0, 0, 0])[W] || 0,
      ca = (An) => a.fixedRoll("geode" + W, zt, An);
    let Ma = W;
    for (; Ma < 3 && ca(Ma) < b().GEODE_UP[Ma];) Ma++;
    const Na = Y();
    let Va = Ma;
    for (; Va > 0 && !Na[Va].length;) Va--;
    if (!Na[Va].length) return null;
    const Ba = Na[Va][Math.floor(ca(9) * Na[Va].length)],
      za = (qt.gems ||= {}),
      vn = !za[Ba];
    return (
      Lt[W]--,
      (za[Ba] = (za[Ba] || 0) + 1),
      (qt.opened ||= [0, 0, 0, 0])[W]++,
      ze || a.save(),
      { from: W, to: Ma, key: Ba, type: Q(Ba), isNew: vn }
    );
  }
  function ut() {
    const W = B(),
      ze = [];
    for (let qt = 3; qt >= 0; qt--)
      for (; (W.geodes?.[qt] || 0) > 0;) {
        const Lt = Ea(qt, !0);
        if (!Lt) break;
        ze.push(Lt);
      }
    return (ze.length && a.save(), ze);
  }
  function jt(W) {
    return a.DEX[W].types[0] + ":" + Math.max(0, Math.min(3, a.tierIndex(W)));
  }
  const xt = (W) => [
      ...new Set(a.DEX[W].types.map((ze) => ze + ":" + Math.max(0, Math.min(3, a.tierIndex(W))))),
    ],
    D = (W) => +String(W).split(":")[1] || 0,
    Q = (W) => String(W).split(":")[0],
    Y = () => _t().map((W) => [...new Set(W.flatMap(xt))]);
  function ye(W, ze) {
    const qt = B(),
      Lt = qt.gems?.[W] || 0;
    if (((ze = Math.min(Math.floor(ze), Lt)), !(ze > 0))) return 0;
    const zt = ze * b().GEM_SHARDS[D(W)];
    return (
      (qt.gems[W] = Lt - ze) <= 0 && delete qt.gems[W],
      (qt.recycled = (qt.recycled || 0) + ze),
      ue(() => a.addItem("event-shard", zt)),
      a.save(),
      zt
    );
  }
  const nt = (W) => b().GEM_PRICE[D(W)],
    Ot = (W) => X(W) + "/" + Math.floor(+$(W).hour / b().OFFER_HOURS),
    ee = (W = a.time()) => ({ at: Ot(W), ends: P(Ot, W) });
  function rt() {
    const W = new Set(_t().flat()),
      ze = new Map();
    for (const ca of a.S.mons)
      if (W.has(ca.id)) for (const Ma of xt(ca.id)) ze.set(Ma, Math.max(ze.get(Ma) || 0, ca.level));
    const Lt = ((ca) => {
        for (let Ma = ca.length - 1; Ma > 0; Ma--) {
          const Na = Math.floor(Math.random() * (Ma + 1));
          [ca[Ma], ca[Na]] = [ca[Na], ca[Ma]];
        }
        return ca;
      })([...ze.keys()]),
      zt = Lt.findIndex((ca) => ze.get(ca) >= t.CONFIG.MAX_LEVEL);
    return (
      zt > 0 && Lt.unshift(...Lt.splice(zt, 1)),
      Lt.slice(0, b().OFFER).sort((ca, Ma) => D(Ma) - D(ca) || ca.localeCompare(Ma))
    );
  }
  function Qe() {
    const W = B(),
      ze = ee();
    if (W.offer?.at !== ze.at) ((W.offer = { at: ze.at, ids: rt(), rr: 0 }), a.save());
    else if (W.offer.ids.length < b().OFFER) {
      const qt = rt()
        .filter((Lt) => !W.offer.ids.includes(Lt))
        .slice(0, b().OFFER - W.offer.ids.length);
      qt.length &&
        ((W.offer.ids = [...W.offer.ids, ...qt].sort((Lt, zt) => D(zt) - D(Lt) || Lt.localeCompare(zt))),
        a.save());
    }
    return { ids: W.offer.ids, ends: ze.ends, cost: b().REROLL * 2 ** W.offer.rr };
  }
  function Ft() {
    const W = Qe().cost,
      ze = B();
    return vt() < W
      ? { error: e("Pas assez de ₽ !") }
      : (ue(() => a.spend(W, "under")),
        Object.assign(ze.offer, { ids: rt(), rr: ze.offer.rr + 1 }),
        a.save(),
        Qe());
  }
  function Ye(W, ze = 1) {
    const qt = B(),
      Lt = nt(W) * ze;
    return !(ze > 0) || !Qe().ids.includes(W) || !Y()[D(W)].includes(W) || H() < Lt
      ? !1
      : (ue(() => a.addItem("event-shard", -Lt)),
        ((qt.gems ||= {})[W] = (qt.gems[W] || 0) + ze),
        (qt.bought = (qt.bought || 0) + ze),
        a.save(),
        !0);
  }
  function bt(W, ze) {
    const qt = W.rank || 0,
      Lt = qt + 1,
      zt = B().gems || {},
      ca = xt(W.id),
      Ma = ca.includes(ze) ? ze : ca.reduce((za, vn) => ((zt[vn] || 0) > (zt[za] || 0) ? vn : za)),
      Na = zt[Ma] || 0,
      Va = pa(Ma),
      Ba =
        qt >= b().RANK_MAX
          ? e("Rang maximum")
          : a.S.mons.includes(W)
            ? W.level < t.CONFIG.MAX_LEVEL
              ? e("Au niveau 100")
              : Na < Lt
                ? e("{name} : {n} (tu en as {have})", { n: Lt, name: Va, have: Na })
                : null
            : e("Introuvable.");
    return { next: qt + 1, need: Lt, have: Na, why: Ba, key: Ma };
  }
  function Yt(W, ze) {
    const qt = a.getMon(W),
      Lt = B();
    if (!qt) return null;
    const zt = bt(qt, ze);
    return zt.why
      ? null
      : ((Lt.gems[zt.key] -= zt.need),
        Lt.gems[zt.key] || delete Lt.gems[zt.key],
        (Lt.gemsSpent = (Lt.gemsSpent || 0) + zt.need),
        Object.assign(qt, { rank: zt.next, level: 5, xp: 0 }),
        (qt.hp = a.maxHp(qt)),
        a.save(),
        { uid: W, rank: zt.next, spent: zt.need });
  }
  const wa = [
      "Gemme {type} commune",
      "Gemme {type} peu commune",
      "Gemme {type} rare",
      "Gemme {type} légendaire",
    ],
    pa = (W) => e(wa[D(W)], { type: e(t.TYPES[Q(W)]?.fr || Q(W)) });
  return {
    arceusOut: L,
    shards: H,
    money: vt,
    gemKeys: xt,
    unlocked: it,
    slotsMax: je,
    slotPrice: pt,
    slotGain: We,
    perDay: re,
    plateOdds: V,
    buySlot: $e,
    left: oe,
    today: Tt,
    dayEnds: u,
    theme: dt,
    themeOf: Z,
    inCandy: qe,
    why: ce,
    canSend: mt,
    send: Ht,
    progress: ge,
    recall: Fe,
    collect: gt,
    slots: () => B().slots,
    levelOf: Te,
    dayKey: X,
    lootSum: kt,
    bandOf: te,
    gemPool: _t,
    gemKinds: Y,
    gemKey: jt,
    gemType: Q,
    gemName: pa,
    openGeode: Ea,
    openAll: ut,
    gemTier: D,
    recycleGems: ye,
    gemPrice: nt,
    buyGem: Ye,
    offer: Qe,
    reroll: Ft,
    rankOf: bt,
    rankUp: Yt,
    best: ha,
    wallMs: et,
    starts: tt,
    guardsOf: (W) => fe(Z(W)).guard,
    busy: () => Xt,
    simulate: ie,
  };
})();
