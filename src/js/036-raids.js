/**
 * raids
 *
 * Public API on the game namespace `t`: t.RAID_SWAPS, t.Raids
 *
 * Recovered from the shipped bundle — original chunk #35 at byte 817310 (21487 bytes, sha256:f825e69b6aee8c0f).
 * This file is one original source file; the build concatenates them in filename order.
 */
t.Raids = (function () {
  const a = t.CONFIG,
    b = a.RAID,
    f = t.Game,
    ue = t.STORY,
    H = 864e5,
    vt = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Europe/Paris",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }),
    B = (Be = f.time()) => {
      const Ut = Object.fromEntries(vt.formatToParts(Be).map((aa) => [aa.type, aa.value]));
      return `${Ut.year}-${Ut.month}-${Ut.day}`;
    },
    se = (Be) => Math.round((Date.parse(Be) - Date.parse(b.EPOCH)) / H),
    Ge = (Be) => new Date(Date.parse(b.EPOCH) + Be * H).toISOString().slice(0, 10);
  let Je = null;
  function Ze(Be = f.time()) {
    const Ut = B(Be);
    if (Je?.k === Ut) return Je.t;
    let aa = Be,
      ae = Be + 26 * 36e5;
    for (; ae - aa > 1;) {
      const ft = Math.floor((aa + ae) / 2);
      B(ft) === Ut ? (aa = ft) : (ae = ft);
    }
    return (Je = { k: Ut, t: ae }).t;
  }
  const x = typeof location < "u",
    $ = x && /^(localhost|127\.0\.0\.1)$/.test(location.hostname),
    X = () => ((!x || $) && t.RAID_SECRET) || null,
    Tt = x && /^release\.pokecatch-online\.pages\.dev$/.test(location.hostname),
    le = { from: null, days: {}, at: null, draw: null, drawFrom: null },
    P = (Be) => !X() && !!le.from && Be >= le.from,
    u = () => ue.REGIONS.filter((Be) => Be.key && Be.dex),
    ve = (Be) => u().find((Ut) => Ut.key === Be),
    it = {},
    De = (Be) =>
      it[Be] ||
      (it[Be] = t.POKEDEX.filter(
        (Ut) => Ut.id >= ve(Be).dex[0] && Ut.id <= ve(Be).dex[1] && !Ut.legendary && !Ut.mythical,
      ).map((Ut) => Ut.id)),
    je = (Be) => (X()?.from && Be >= X().from ? 2 : b.NO_RARE && Be >= b.NO_RARE ? 1 : 0),
    pt = (Be) => se([b.EPOCH, b.NO_RARE, X()?.from][Be]),
    re = {},
    We = (Be, Ut) =>
      Ut
        ? re[Be + Ut] ||
          (re[Be + Ut] = De(Be).filter(
            (aa) =>
              t.POKEDEX.find((ae) => ae.id === aa).captureRate > 45 &&
              (Ut < 2 || !b.NO_SPECIAL?.includes(aa)),
          ))
        : De(Be),
    oe = (Be, Ut = B()) => We(Be, je(Ut));
  function $e(Be) {
    let Ut = Be % 2147483647 || 1;
    return () => (Ut = (Ut * 16807) % 2147483647) / 2147483647;
  }
  const Z = (Be) => [...Be].reduce((Ut, aa) => (Ut * 31 + aa.charCodeAt(0)) >>> 0, 7),
    A = (Be) => (Be > 1 ? "#" + X().seed : ""),
    J = (Be) => [...(t.RAID_SWAPS?.[Be] || []), ...(X()?.swaps?.[Be] || [])],
    de = (Be) => Be.bosses || X()?.themes?.find((Ut) => Ut.days[0] === Be.days[0])?.bosses || {},
    _e = (Be) => (b.THEMES || []).filter((Ut) => de(Ut)[Be] || Ut.regs?.includes(Be)),
    Re = {};
  function dt(Be, Ut, aa = 0) {
    const ae = `${Be}:${aa}:${Ut}:${JSON.stringify(J(Be))}`;
    if (Re[ae]) return Re[ae];
    const ft = We(Be, aa),
      ht = $e(Z((aa ? `${Be}#${aa}#${Ut}` : `${Be}#${Ut}`) + A(aa))),
      ea = [...ft],
      Ra = pt(aa);
    for (let Ca = ea.length - 1; Ca > 0; Ca--) {
      const gn = Math.floor(ht() * (Ca + 1));
      [ea[Ca], ea[gn]] = [ea[gn], ea[Ca]];
    }
    if (aa && !Ut) {
      const Ca = Ra - 1 - pt(aa - 1),
        gn = We(Be, aa - 1).length,
        yn = new Set();
      for (let mn = Ca - (Ca % gn); mn <= Ca; mn++) yn.add(Te(Be, Ge(mn)));
      for (const mn of _e(Be))
        mn.days.some((ln) => se(ln) >= Ra && se(ln) < Ra + ft.length) &&
          de(mn)[Be]?.forEach((ln) => yn.add(ln));
      ea.sort((mn, ln) => yn.has(mn) - yn.has(ln));
    }
    for (const [Ca, gn] of J(Be)) {
      const yn = se(Ca) - Ra;
      if (je(Ca) !== aa || Math.floor(yn / ft.length) !== Ut) continue;
      const mn = yn - Ut * ft.length,
        ln = ea.indexOf(gn);
      ln >= 0 && ([ea[mn], ea[ln]] = [ea[ln], ea[mn]]);
    }
    return (Re[ae] = ea);
  }
  const qe = (Be, Ut) => {
      const aa = je(Ut),
        ae = se(Ut) - pt(aa) - tt(Be, Ut),
        ft = We(Be, aa).length,
        ht = Math.floor(ae / ft);
      return dt(Be, ht, aa)[ae - ht * ft];
    },
    ce = (Be = B(), Ut) => {
      const aa = b.THEMES?.find((ae) => ae.days.includes(Be) && (!Ut || _e(Ut).includes(ae)));
      return aa && { ...aa, boss: Ut ? (de(aa)[Ut]?.[aa.days.indexOf(Be)] ?? null) : null };
    },
    tt = (Be, Ut) => {
      const aa = se(Ut),
        ae = pt(je(Ut));
      return _e(Be).reduce((ft, ht) => ft + ht.days.filter((ea) => se(ea) >= ae && se(ea) < aa).length, 0);
    },
    mt = (Be, Ut) =>
      !!(
        b.NO_BOSS?.includes(Be) ||
        b.NO_SPECIAL?.includes(Be) ||
        (b.RARE_OUT && Ut >= b.RARE_OUT.from && b.RARE_OUT.ids.includes(Be))
      );
  function Te(Be, Ut = B()) {
    if (x && !X() && !le.at) return null;
    if (P(Ut)) return le.days[Ut]?.[Be] ?? null;
    const aa = ce(Ut, Be);
    if (aa) return aa.boss;
    const ae = qe(Be, Ut);
    if (!mt(ae, Ut)) return ae;
    const ft = oe(Be, Ut).filter((ht) => !mt(ht, Ut));
    return ft[Math.floor($e(Z(`${Be}@${Ut}` + A(je(Ut))))() * ft.length)];
  }
  let At = null;
  const yt = () => !x || !!X() || le.at === B();
  function he() {
    return yt() || !t.Cloud?.user
      ? Promise.resolve(yt())
      : At ||
          (At = t.Cloud.raids
            .days(
              u().map((Be) => Be.key),
              !0,
            )
            .then(({ data: Be, error: Ut }) => {
              if (((At = null), Ut || !Be || Be.error)) return !1;
              if (
                (Object.assign(le, {
                  from: Be.from || null,
                  days: Be.days || {},
                  at: Be.today,
                  draw: Be.draw || null,
                  drawFrom: Be.drawFrom || null,
                }),
                Tt && !le.drawFrom)
              ) {
                const aa = u().filter(Ne),
                  ae = Z(`${t.Cloud?.user?.id || ""}|${Be.today}`);
                aa.length && Object.assign(le, { drawFrom: Be.today, draw: aa[ae % aa.length].key, sim: !0 });
              }
              return yt();
            }));
  }
  function fe(Be, Ut, aa) {
    const ae = je(Ut) > 1 ? (X().swaps ||= {}) : t.RAID_SWAPS || (t.RAID_SWAPS = {});
    (ae[Be] || (ae[Be] = [])).push([Ut, aa]);
  }
  const Oe = () => {
      const Be = f.S.raids || (f.S.raids = { done: {}, last: [], bots: {}, pick: {}, allies: [], clears: 0 });
      if (
        ((Be.done ||= {}),
        (Be.last ||= []),
        (Be.byBoss ||= {}),
        (Be.allies ||= []),
        (!Be.bots || Array.isArray(Be.bots) || Be.botsV !== 3) &&
          ((Be.bots = {}), (Be.pick = {}), (Be.botsV = 3)),
        (!Be.pick || Array.isArray(Be.pick)) && (Be.pick = {}),
        Be.timesV !== 1 && (U(Be), (Be.timesV = 1)),
        Be.pityV !== 1)
      ) {
        for (const Ut of Object.values(Be.pity || {})) Ut && typeof Ut == "object" && (Ut.date ||= B());
        Be.pityV = 1;
      }
      return (Be.paceV !== 1 && (_(Be), (Be.paceV = 1)), Be);
    },
    Ee = 1.6,
    et = (Be) => Math.round(Math.round(Be) * Ee);
  function _(Be) {
    for (const Ut of Object.values(Be.best || {})) Number.isFinite(Ut?.ms) && (Ut.ms = et(Ut.ms));
    for (const Ut of Object.values(Be.comps || {}))
      for (const aa of Object.values(Ut)) Number.isFinite(aa?.ms) && (aa.ms = et(aa.ms));
    for (const Ut of Be.queue || []) Number.isFinite(Ut?.ms) && (Ut.ms = et(Ut.ms));
    Number.isFinite(Be.lastTime?.ms) && (Be.lastTime.ms = et(Be.lastTime.ms));
    try {
      localStorage.removeItem(Ba);
    } catch {}
  }
  const we = 2e4,
    ie = (Be) => Number.isFinite(Be) && Be >= we;
  function U(Be) {
    for (const Ut of Object.keys(Be.best || {})) ie(Be.best[Ut]?.ms) || delete Be.best[Ut];
    for (const Ut of Object.values(Be.comps || {}))
      for (const aa of Object.keys(Ut)) ie(Ut[aa]?.ms) || delete Ut[aa];
    (Be.queue && (Be.queue = Be.queue.filter((Ut) => ie(Ut.ms))),
      Be.lastTime && !ie(Be.lastTime.ms) && delete Be.lastTime);
  }
  const Ne = (Be) => Be.open && !!f.regionDone?.(Be.key),
    T = () => !!f.S.adv?.badges?.includes(b.UNLOCK) || !!Oe().ignoreLock,
    L = () => !!le.drawFrom && B() >= le.drawFrom,
    R = () => (L() && le.at === B() ? le.draw : null),
    te = () => (f.S.adv?.event?.raid ? f.S.adv.event.reg : null),
    K = () =>
      T() ? u().filter((Be) => Ne(Be) && (!L() || le.at !== B() || Be.key === R() || Be.key === te())) : [],
    He = () => (T() && !L() ? u().filter((Be) => !Ne(Be)) : []),
    m = () =>
      u()
        .filter((Be) => Te(Be.key))
        .map((Be) => ({ key: Be.key, name: Be.name, color: Be.color, boss: Te(Be.key), won: Ne(Be) })),
    z = () => !L() || (le.sim ? le.seen : Oe().seen) === B() || !!te() || (!!R() && Vt(R())),
    pe = () => {
      if (le.sim) {
        ((le.seen = B()), W());
        return;
      }
      Oe().seen !== B() && ((Oe().seen = B()), f.save(), W());
    },
    V = (Be) => {
      (Object.assign(le, { drawFrom: Be ? B() : null, draw: Be || null, at: le.at || (X() ? B() : null) }),
        (Oe().seen = null),
        W());
    },
    lt = (Be, Ut = B()) => `${Be}|${Ut}`,
    kt = (Be) => {
      const Ut = [Be];
      for (let aa = 0; aa < Ut.length; aa++)
        for (const ae of t.EVOLUTIONS[Ut[aa]] || []) Ut.includes(ae.to) || Ut.push(ae.to);
      return Ut;
    };
  function ra(Be, Ut, aa) {
    const ae = lt(Be, Ut),
      ft = Oe().doneBoss?.[ae];
    if (ft != null || P(Ut)) return ft ?? null;
    const ht = qe(Be, Ut);
    if (!mt(ht, Ut)) return null;
    const ea = kt(ht);
    return f
      .ownedMons()
      .some((Ra) => ea.includes(Ra.id) && Ra.shiny && Math.abs((Ra.caughtAt || 0) - aa) <= 5e3)
      ? ht
      : null;
  }
  const Vt = (Be, Ut = B(), aa = null) => {
      const ae = Oe().done[lt(Be, Ut)];
      if (!ae) return !1;
      const ft = ra(Be, Ut, ae),
        ht = Te(Be, Ut) ?? aa;
      return ft == null || ht == null || ft === ht;
    },
    Xt = (Be, Ut) => Oe().tried?.[lt(Be, Ut)] || 0;
  function Ht(Be, Ut, aa = 0) {
    const ae = Oe(),
      ft = lt(Be, Ut);
    ae.tried ||= {};
    for (const ht of Object.keys(ae.tried)) ct(ht.split("|")[1]) && delete ae.tried[ht];
    return (ae.tried[ft] = Math.max(ae.tried[ft] || 0, aa) + 1);
  }
  const ct = (Be, Ut = B()) => Math.abs(se(Be) - se(Ut)) > 1,
    wt = (Be) => "raid:" + Be,
    ge = (Be) => f.eventTeam(wt(Be)).filter((Ut) => f.getMon(Ut)),
    Fe = [
      ["Montagnard", "hiker", "m"],
      ["Pêcheur", "fisherman", "m"],
      ["Gamin", "youngster", "m"],
      ["Topdresseur", "acetrainer", "m"],
      ["Topdresseuse", "acetrainer-f", "f"],
      ["Karatéka", "blackbelt", "m"],
      ["Scientifique", "scientist", "m"],
      ["Campeur", "camper", "m"],
      ["Campeuse", "picnicker", "f"],
      ["Fana", "pokefan", "m"],
      ["Fana", "pokefan-f", "f"],
      ["Ornithologue", "birdkeeper", "m"],
      ["Motard", "biker", "m"],
      ["Fillette", "lass", "f"],
      ["Canon", "beauty", "f"],
      ["Nageur", "swimmer", "m"],
      ["Marin", "sailor", "m"],
      ["Scout", "bugcatcher", "m"],
      ["Médium", "psychic", "m"],
      ["Médium", "psychic-f", "f"],
      ["Gentleman", "gentleman", "m"],
      ["Jongleur", "juggler", "m"],
      ["Skieuse", "skier", "f"],
      ["Kimono", "kimonogirl", "f"],
      ["Écolier", "schoolkid", "m"],
      ["Cracheur de feu", "firebreather", "m"],
    ],
    gt = {
      m: ["Bob", "Max", "Tom", "Hugo", "Paul", "Sam", "Rémi", "Théo", "Léo", "Noé", "Jules", "Marc"],
      f: ["Léa", "Zoé", "Inès", "Nina", "Lou", "Jade", "Ella", "Mila", "Emma", "Clara", "Rose", "Anna"],
    },
    Dt = (Be) => Be[Math.floor(Math.random() * Be.length)],
    ha = (Be) => ve(Be).dex[1],
    _t = (Be) =>
      t.POKEDEX.filter(
        (Ut) =>
          Ut.id <= Be &&
          !Ut.legendary &&
          !Ut.mythical &&
          !Ut.baby &&
          (t.EVOLUTIONS[Ut.id] || []).every((aa) => aa.to > Be),
      ).map((Ut) => Ut.id);
  let Ea = 0;
  function ut(Be, Ut) {
    let aa, ae;
    do ((ae = Dt(Fe)), (aa = e("{cls} {name}", { cls: e(ae[0]), name: Dt(gt[ae[2]]) })));
    while (Ut.includes(ae[1]));
    Ut.push(ae[1]);
    const ft = _t(ha(Be)),
      [ht, ea] = b.BOT_LEVEL,
      Ra = `bot${Date.now().toString(36)}${Ea++}`,
      Ca = [];
    for (; Ca.length < b.MINE;) {
      const gn = Dt(ft);
      Ca.some((yn) => yn.id === gn) ||
        Ca.push({
          uid: `${Ra}-${Ca.length}`,
          id: gn,
          level: ht + Math.floor(Math.random() * (ea - ht + 1)),
          xp: 0,
          shiny: !1,
          bot: !0,
          statMult: b.BOT_STATS,
          owner: aa,
        });
    }
    return { key: Ra, name: aa, sprite: ae[1], mons: Ca };
  }
  function jt(Be, Ut = !1) {
    const aa = Oe();
    if (Ut || (aa.bots[Be]?.length || 0) < b.BOTS) {
      const ae = [];
      ((aa.bots[Be] = Array.from({ length: b.BOTS }, () => ut(Be, ae))), (aa.pick[Be] = []), f.save());
    }
    return aa.bots[Be];
  }
  const xt = {};
  function D(Be, Ut) {
    const aa = Ut.raidBy || {},
      ae = Te(Be);
    if (aa[ae]?.length) return ae;
    const ft = Object.keys(aa).filter((ea) => aa[ea]?.length),
      ht = `${Be}|${B()}|${Ut.uid}|${ft.join(",")}`;
    if (!(ht in xt)) {
      const ea = new Set(De(Be).filter((Ca) => ft.includes(String(Ca)))),
        Ra = se(B());
      xt[ht] = 0;
      for (let Ca = Ra - 1; ea.size && Ca >= Ra - De(Be).length; Ca--) {
        const gn = Te(Be, Ge(Ca));
        if (ea.has(gn)) {
          xt[ht] = gn;
          break;
        }
      }
    }
    return xt[ht];
  }
  function Q(Be) {
    const Ut = Te(Be);
    return (t.Cloud?.friends?.list || [])
      .filter((aa) => aa.status === "accepted")
      .map((aa) => {
        const ae = D(Be, aa);
        if (!ae) return null;
        const ft = "f-" + aa.uid,
          ht = /^[\w-]+$/.test(aa.sprite || "") ? aa.sprite : "red",
          ea = aa.raidBy[ae]
            .filter((Ra) => f.DEX[Ra?.id])
            .slice(0, b.MINE)
            .map((Ra, Ca) => ({
              uid: `${ft}-${Ca}`,
              id: Ra.id,
              level: Math.max(1, Math.min(100, Ra.level | 0)),
              xp: 0,
              shiny: !!Ra.shiny,
              bot: !0,
              owner: aa.name,
            }));
        return {
          key: ft,
          name: aa.name || e("Ami"),
          sprite: ht,
          frame: aa.frame,
          mons: ea,
          friend: !0,
          today: ae === Ut,
        };
      })
      .filter((aa) => aa?.mons.length)
      .sort((aa, ae) => ae.today - aa.today);
  }
  const Y = (Be) => [...Q(Be), ...jt(Be)],
    ye = (Be) => Oe().pick[Be] || (Oe().pick[Be] = []);
  function nt(Be, Ut, aa) {
    const ae = Oe(),
      ft = Array.from({ length: b.ALLIES }, (ea, Ra) => ye(Be)[Ra] ?? null),
      ht = aa ? ft.indexOf(aa) : -1;
    (ht >= 0 && ht !== Ut && (ft[ht] = ft[Ut]), (ft[Ut] = aa), (ae.pick[Be] = ft), f.save());
  }
  const Ot = (Be, Ut) => Y(Be).find((aa) => aa.key === ye(Be)[Ut]) || null,
    ee = (Be) => Y(Be).filter((Ut) => ye(Be).includes(Ut.key)),
    rt = (Be) => Oe().allies.find((Ut) => Ut.uid === Be);
  function Qe() {
    const Be = f.S.adv?.event;
    return Be?.raid ? [...ge(Be.reg).slice(0, b.MINE), ...Oe().allies.map((Ut) => Ut.uid)] : [];
  }
  function Ft(Be) {
    return T()
      ? !yt() || !Te(Be)
        ? t.Cloud?.user
          ? e("Raids indisponibles pour le moment.")
          : e("Connecte-toi pour accéder aux raids chroma.")
        : L() && Be !== R() && Be !== te()
          ? e("Ce n'est pas ton raid du jour.")
          : Vt(Be)
            ? e("Boss capturé : reviens demain !")
            : ge(Be).length
              ? ee(Be).length < b.ALLIES
                ? e("Choisis {n} alliés", { n: b.ALLIES })
                : null
              : e("Choisis tes Pokémon")
      : e("Raids verrouillés");
  }
  function Ye(Be) {
    if (Ft(Be)) return null;
    const Ut = Oe(),
      aa = ee(Be);
    return (
      (Ut.allies = aa.flatMap((ae) => ae.mons.map((ft) => ({ ...ft })))),
      (Ut.allyFrom = aa.map((ae) => ({
        key: ae.key,
        name: ae.name,
        sprite: ae.sprite,
        mons: ae.mons.map((ft) => ft.uid),
      }))),
      (Ut.last = ge(Be)
        .slice(0, b.MINE)
        .map((ae) => {
          const ft = f.getMon(ae);
          return ft && { id: ft.id, level: ft.level, shiny: !!ft.shiny };
        })
        .filter(Boolean)),
      (Ut.byBoss[Te(Be)] = Ut.last),
      jt(Be, !0),
      { raid: !0, reg: Be, date: B(), id: Te(Be), seq: `R:${Be}:${B()}`, level: b.LEVEL }
    );
  }
  const bt = (Be) => Oe().allyFrom?.find((Ut) => Ut.mons.includes(Be)) || null,
    Yt = (Be, Ut, aa, ae) =>
      t.POKEDEX.filter(
        (ft) =>
          ft.id <= ae &&
          !ft.legendary &&
          !ft.mythical &&
          !ft.baby &&
          ft.types.includes(Be) &&
          (t.EVOLUTIONS[ft.id] || []).every((ht) => ht.to > ae),
      ).map((ft) => ({ id: ft.id, min: Ut, max: aa, w: 1 }));
  function wa(Be, Ut, aa) {
    const ae = aa && ce(aa, Ut),
      ft = f.DEX[Be].types,
      ht = b.PLACES,
      ea = ht[ft[0]] || ht.normal,
      Ra = ae ? null : ft.map((yn) => ht[yn]?.weather).find(Boolean) || null,
      Ca = { bg: ea.bg || "prairie", fallback: "prairie", weather: Ra };
    (ae?.light && (Ca.aura = { light: ae.light }),
      ae?.sky && (Ca.sky = ae.sky),
      ea.scene != null && (Ca.scene = ea.scene));
    const gn = b.PLACES_BY_REGION?.[Ut]?.[ft[0]];
    if ((gn && (Ca.scene = gn), Ra)) {
      ((Ca.indoor = !1), (Ca.weatherDamage = { ...t.CONFIG.WEATHER.TYPES[Ra].damage }));
      for (const yn of ft) Ca.weatherDamage[yn] = (Ca.weatherDamage[yn] || 1) * b.WEATHER_BOOST;
    }
    return Ca;
  }
  function pa(Be) {
    const Ut = f.DEX[Be.id].types,
      aa = b.LEVEL,
      ae = [1, ha(Be.reg)],
      ft = {
        name: `Raid · ${f.DEX[Be.id].name}`,
        ...wa(Be.id, Be.reg, Be.date),
        event: !0,
        raidRun: !0,
        dex: ae,
      };
    let ht = 0;
    return b.RUN.map((ea) => {
      if (ea === "heal")
        return {
          ...ft,
          type: "heal",
          name: "Camp de base",
          bg: "pokecenter",
          fallback: ft.bg,
          scene: void 0,
          weather: void 0,
          weatherDamage: void 0,
        };
      if (ea === "boss") {
        const gn = Object.values(f.DEX[Be.id].stats).reduce((ln, In) => ln + In, 0),
          yn = b.BOSS.BST_REF / gn,
          mn = b.BOSS.ADJ?.[Be.id] ?? 1;
        return {
          ...ft,
          type: "static",
          id: Be.id,
          level: aa,
          raid: !0,
          shiny: !0,
          rate: b.CATCH * 255,
          hpPower: b.BOSS.HP * yn ** b.BOSS.HP_EXP * mn,
          power: b.BOSS.POWER * yn ** b.BOSS.POWER_EXP * mn,
          text: e("Le boss du raid : {name} chromatique !", { name: f.DEX[Be.id].name }),
        };
      }
      const Ra = Ut[ht++ % Ut.length];
      let Ca = Yt(Ra, ea === "wild" ? aa - b.WILD_SPREAD : aa - 2, aa, ae[1]);
      return (
        Ca.length || (Ca = Yt("normal", aa - b.WILD_SPREAD, aa, ae[1])),
        { ...ft, type: ea, tag: Ra, pool: Ca }
      );
    });
  }
  function Gt(Be, Ut = 6) {
    const aa = (Ua(Be) || []).filter((ft) => !ft.npc && ft.team?.[0]?.mons?.length);
    if (aa.length < 3) return null;
    const ae = {};
    for (const ft of aa)
      new Set(ft.team[0].mons.map((ht) => ht?.id).filter((ht) => f.DEX[ht])).forEach((ht) => {
        ae[ht] = (ae[ht] || 0) + 1;
      });
    return {
      total: aa.length,
      top: Object.entries(ae)
        .sort((ft, ht) => ht[1] - ft[1])
        .slice(0, Ut)
        .map(([ft, ht]) => ({ id: +ft, n: ht })),
    };
  }
  const N = [],
    W = () =>
      N.forEach((Be) => {
        try {
          Be();
        } catch (Ut) {
          console.error(Ut);
        }
      }),
    ze = (Be, Ut = B()) => {
      const aa = Oe().pity?.[Be];
      return (aa?.date === Ut && aa.n) || 0;
    },
    qt = (Be, Ut) => ze(Be, Ut) >= b.PITY - 1;
  function Lt(Be, Ut) {
    const aa = Oe();
    if ((Be.loopMs != null && za(Be, Be.loopMs), Ut?.type === "capture")) {
      aa.tries = (aa.tries || 0) + 1;
      const ae = (aa.pity ||= {}),
        ft = ae[Be.reg]?.date === Be.date ? ae[Be.reg] : (ae[Be.reg] = { n: 0, whole: !0, date: Be.date });
      if (Ut.success) {
        const ht = ft.whole && f.getMon(Ut.enemy?.uid);
        (ht && (ht.tries = ft.n + 1), (ae[Be.reg] = { n: 0, whole: !0, date: Be.date }));
      } else ft.n = Math.min(ft.n + 1, b.PITY - 1);
    }
    (Ut?.success &&
      ((aa.done[lt(Be.reg, Be.date)] = Date.now()),
      ((aa.doneBoss ||= {})[lt(Be.reg, Be.date)] = Be.id),
      aa.clears++,
      f.tally("raids", Be.reg),
      t.News?.skipMon(Ut.enemy?.uid),
      t.News?.share({ k: "raid", key: lt(Be.reg, Be.date), m: Be.id, r: Be.reg })),
      f.save(),
      W());
  }
  const zt = (Be, Ut) => `${Be}|${Ut}`,
    ca = (Be, Ut = Te(Be)) => Oe().best?.[zt(Be, Ut)] || null,
    Ma = 20,
    Na = 3,
    Va = 36e5,
    Ba = "pokecatch-raid-boards";
  function za(Be, Ut) {
    if (!ie(Ut)) return;
    const aa = Oe(),
      ae = zt(Be.reg, Be.id),
      ft = f.S.trainer || {},
      ht = (ln) => ln && { id: ln.id, shiny: !!ln.shiny, ...(ln.rank ? { rank: ln.rank } : {}) },
      ea = [
        {
          name: ft.name || "",
          tag: ft.tag,
          sprite: ft.sprite || "red",
          frame: t.Frames?.mine(),
          mons: ge(Be.reg)
            .slice(0, b.MINE)
            .map((ln) => ht(f.getMon(ln)))
            .filter(Boolean),
        },
        ...(aa.allyFrom || []).map((ln) => ({
          ...(ln.key?.startsWith("f-") ? { uid: ln.key.slice(2) } : {}),
          name: ln.name,
          sprite: ln.sprite,
          mons: ln.mons.map((In) => ht(rt(In))).filter(Boolean),
        })),
      ];
    aa.best ||= {};
    const Ra = !aa.best[ae] || Ut < aa.best[ae].ms;
    (Ra && (aa.best[ae] = { ms: Ut, at: Date.now() }),
      (aa.lastTime = { reg: Be.reg, boss: Be.id, ms: Ut, fresh: Ra }));
    const Ca = t.EventUI?.clockMs;
    if (
      (Ca &&
        t.UI &&
        !t.Adventure?.simulating &&
        t.UI.toast(
          Ra
            ? e("⏱ Raid bouclé en <b>{time}</b> : nouveau record !", { time: Ca(Ut) })
            : e("⏱ Raid bouclé en <b>{time}</b>", { time: Ca(Ut) }),
        ),
      ea.length !== 1 + b.ALLIES)
    )
      return;
    const gn = JSON.stringify([ea[1], ea[2], ea[0].mons]),
      yn = ((aa.comps ||= {})[ae] ||= {});
    if (yn[gn] && yn[gn].ms <= Ut) return;
    yn[gn] = { ms: Ut, at: Date.now(), team: ea };
    for (const ln of Object.keys(yn)
      .sort((In, xe) => yn[In].ms - yn[xe].ms)
      .slice(Na))
      delete yn[ln];
    const mn = Be.loopSteps != null ? { steps: Be.loopSteps, away: Be.loopAway || 0 } : {};
    aa.queue = [
      ...(aa.queue || []).filter((ln) => !(ln.reg === Be.reg && ln.boss === Be.id && ln.sig === gn)),
      { reg: Be.reg, boss: Be.id, ms: Math.round(Ut), team: ea, sig: gn, ...mn },
    ].slice(-Ma);
  }
  let vn = !1;
  async function An() {
    const Be = Oe(),
      Ut = [...(Be.queue || [])];
    if (!Ut.length || vn || !t.Cloud?.user) return;
    vn = !0;
    const aa = await t.Cloud.raids.submitMany(
      Ut.map(({ reg: ft, boss: ht, ms: ea, team: Ra }) => ({ reg: ft, boss: ht, ms: ea, team: Ra })),
    );
    if (((vn = !1), aa.error || !aa.data)) return;
    const ae = aa.data.refused || [];
    if ((ae.forEach(on), !aa.data.ok)) {
      ae.length && f.save({ idle: !0 });
      return;
    }
    (Yn(Ut.filter((ft) => !ae.some((ht) => ht.reg === ft.reg && ht.boss === ft.boss && ht.ms === ft.ms))),
      (Be.queue = (Be.queue || []).filter((ft) => !Ut.includes(ft))),
      f.save({ idle: !0 }));
  }
  function on({ reg: Be, boss: Ut, ms: aa }) {
    const ae = Oe(),
      ft = zt(Be, Ut),
      ht = ae.comps?.[ft] || {};
    for (const ea of Object.keys(ht)) Math.round(ht[ea].ms) === aa && delete ht[ea];
    if (
      ((ae.queue = (ae.queue || []).filter((ea) => !(ea.reg === Be && ea.boss === Ut && ea.ms === aa))),
      Math.round(ae.best?.[ft]?.ms) === aa)
    ) {
      const ea = Object.values(ht).sort((Ra, Ca) => Ra.ms - Ca.ms)[0];
      ea ? (ae.best[ft] = { ms: ea.ms, at: ea.at }) : delete ae.best[ft];
    }
  }
  const qn = () => {
      try {
        return JSON.parse(localStorage.getItem(Ba)) || {};
      } catch {
        return {};
      }
    },
    xn = (Be, Ut = Te(Be)) => qn()[zt(Be, Ut)] || null,
    fn = (Be) => {
      const Ut = xn(Be);
      return !!Ut && Date.now() - Ut.at < Va;
    };
  function Yn(Be) {
    const Ut = qn();
    let aa = !1;
    for (const { reg: ae, boss: ft, ms: ht, team: ea } of Be) {
      const Ra = Ut[zt(ae, ft)];
      !Ra ||
        (Ra.mine ||= []).some((Ca) => Ca.ms === ht) ||
        (Ra.mine.push({ rank: null, ms: ht, at: new Date().toISOString(), team: ea }), (aa = !0));
    }
    if (aa)
      try {
        localStorage.setItem(Ba, JSON.stringify(Ut));
      } catch {}
  }
  let Zn = null;
  function is(Be) {
    if (fn(Be) || Zn === Be || !t.Cloud?.user) return Promise.resolve();
    const Ut = Te(Be);
    return (
      (Zn = Be),
      t.Cloud.raids.board(Be, Ut).then(
        (aa) => {
          if (((Zn = null), !aa || aa.error || !aa.data)) return { error: aa?.error || "empty" };
          const ae = qn();
          for (const [ft, ht] of Object.entries(ae)) Date.now() - ht.at > Va * 24 && delete ae[ft];
          ae[zt(Be, Ut)] = { at: Date.now(), top: aa.data.top || [], mine: aa.data.mine || [] };
          try {
            localStorage.setItem(Ba, JSON.stringify(ae));
          } catch {}
          return { ok: !0 };
        },
        () => ((Zn = null), { error: "network" }),
      )
    );
  }
  const ts = {};
  function Jn(Be, Ut = B()) {
    const aa = `${Be}|${Ut}`;
    if (ts[aa]) return ts[aa];
    const ae = b.NPC,
      ft = $e(Z(`npc|${aa}`)),
      ht = (yn) => yn[Math.floor(ft() * yn.length)],
      ea = _t(ha(Be)),
      Ra = Ze(Date.parse(Ut) - 6 * 36e5),
      Ca = new Set(),
      gn = (yn, mn) => {
        let ln,
          In,
          xe = 0;
        do ((ln = ht(Fe)), (In = ht(gt[ln[2]])));
        while ((yn.includes(ln[1]) || (mn && Ca.has(ln[0] + In))) && ++xe < 30);
        (yn.push(ln[1]), mn && Ca.add(ln[0] + In));
        const Et = [];
        for (; Et.length < b.MINE;) {
          const oa = ht(ea);
          Et.some((sa) => sa.id === oa) || Et.push({ id: oa, shiny: ft() < ae.SHINY });
        }
        return { cls: ln[0], name: In, sprite: ln[1], mons: Et };
      };
    return (ts[aa] = Array.from({ length: ae.FILL }, () => {
      let yn = ft();
      const mn = (ae.SPEED.find(([, xe]) => (yn -= xe) < 0) || ae.SPEED[0])[0],
        ln = ae.STEPS[0] + ft() * (ae.STEPS[1] - ae.STEPS[0]),
        In = [];
      return {
        at: Ra + (0.5 + ft() * 23) * 36e5,
        ms: Math.round((ln * ae.ACTION_MS) / mn),
        team: [gn(In, !0), gn(In), gn(In)],
      };
    }));
  }
  function On(Be, Ut, aa = f.time()) {
    return Ut <= 0
      ? []
      : Jn(Be)
          .slice(0, Ut)
          .filter((ae) => ae.at <= aa)
          .map((ae) => ({
            npc: !0,
            ms: ae.ms,
            at: new Date(ae.at).toISOString(),
            team: ae.team.map((ft) => ({
              name: e("{cls} {name}", { cls: e(ft.cls), name: ft.name }),
              sprite: ft.sprite,
              mons: ft.mons,
            })),
          }));
  }
  let Me = !1;
  const It = {};
  function Kt(Be = !0) {
    ((Me = !!Be), (_a = null));
    for (const Ut in It) delete It[Ut];
  }
  function Aa(Be, Ut) {
    const aa = $e(Z(`test|${Be}|${B()}`)),
      ae = (ea) => ea[Math.floor(aa() * ea.length)],
      ft = De(Be),
      ht = () => {
        const ea = ae(ue.TRAINER_CLASSES_HOENN),
          Ra = [0, 1].map(() => ({ id: ae(ft), shiny: aa() < 0.2 })),
          Ca = {
            name: ae(ea.f ? ue.TRAINER_NAMES_F : ue.TRAINER_NAMES),
            tag: String(Math.floor(aa() * 9999)).padStart(4, "0"),
            sprite: ea.sprite,
            mons: Ra,
          };
        return (
          (Ca.card = {
            trainer: { name: Ca.name, tag: Ca.tag, sprite: Ca.sprite, since: Date.now() - 60 * H },
            team: Ra.map((gn) => ({ ...gn, level: 100 })),
            dex: ft.filter(() => aa() < 0.7),
            badges: f.S.adv?.badges || [],
            unlocked: f.S.adv?.unlocked || 0,
            stats: { playMs: Math.round(aa() * 150) * 36e5 },
          }),
          Ca
        );
      };
    return Array.from({ length: Ut }, (ea, Ra) => ({
      ms: Math.round((95 + Ra * 9 + aa() * 8) * 1e3),
      at: new Date(Date.now() - aa() * 20 * 36e5).toISOString(),
      team: [ht(), ht(), ht()],
    }));
  }
  function Ka(Be, Ut = 12) {
    if (It[Be]) return It[Be];
    const aa = Aa(Be, Ut),
      ae = f.S.trainer || {};
    return (
      (aa[6] = {
        ...aa[6],
        me: !0,
        team: [
          {
            name: ae.name,
            tag: ae.tag,
            sprite: ae.sprite || "red",
            mons: ge(Be)
              .slice(0, b.MINE)
              .map((ft) => f.getMon(ft))
              .filter(Boolean)
              .map((ft) => ({ id: ft.id, shiny: !!ft.shiny, ...(ft.rank ? { rank: ft.rank } : {}) })),
          },
          ...aa[6].team.slice(1),
        ],
      }),
      (It[Be] = aa.map((ft, ht) => ({ ...ft, rank: ht + 1 })))
    );
  }
  let _a = null;
  function Ha(Be, { end: Ut = !1, players: aa = 0 } = {}) {
    ((Me = !1), (_a = Be ? { end: Ut, players: aa, top: {} } : null));
  }
  function Ua(Be) {
    if (Me) return Ka(Be);
    const Ut = _a ? { top: (_a.top[Be] ||= Aa(Be, _a.players)), mine: [] } : xn(Be);
    if (!Ut) return null;
    const aa = t.Cloud?.user?.id,
      ae = f.S.trainer || {},
      ft = (Et) => !!aa && Et.team?.[0]?.uid === aa,
      ht = Te(Be),
      ea = new Set((Oe().queue || []).filter((Et) => Et.reg === Be && Et.boss === ht).map((Et) => Et.ms)),
      Ra = (Et) =>
        ea.has(Math.round(Et.ms)) ||
        Et.at > Ut.at ||
        (Ut.mine || []).some((oa) => oa.ms === Math.round(Et.ms)),
      Ca = Object.values(Oe().comps?.[zt(Be, ht)] || {})
        .filter((Et) => _a || Ra(Et))
        .map((Et) => ({
          ms: Et.ms,
          at: new Date(Et.at).toISOString(),
          team: [
            {
              ...Et.team[0],
              uid: aa,
              name: ae.name || Et.team[0].name,
              tag: ae.tag,
              sprite: ae.sprite || Et.team[0].sprite,
              frame: t.Frames?.mine(),
            },
            ...Et.team.slice(1),
          ],
          me: !0,
        })),
      gn = Ca.length ? Ca : (Ut.mine || []).map((Et) => ({ ...Et, me: !0 })),
      yn = (Ut.top || []).filter((Et) => !ft(Et)),
      mn = On(Be, b.NPC.FILL - yn.length - gn.length, _a?.end ? Date.parse(B() + "T23:59:59") : f.time()),
      ln = [...yn, ...gn, ...mn].sort((Et, oa) => Et.ms - oa.ms),
      In = (Ut.top || []).length,
      xe = In ? Ut.top[In - 1].ms : 1 / 0;
    return ln
      .map((Et, oa) => ({
        ...Et,
        rank: In < 50 || Et.ms <= xe ? oa + 1 : ((Ut.mine || []).find((sa) => sa.ms === Et.ms)?.rank ?? null),
      }))
      .filter((Et, oa) => oa < 50 || Et.me);
  }
  function sn() {
    const Be = Oe();
    ((Be.allies = []), (Be.allyFrom = []), f.save(), W());
  }
  return {
    dateKey: B,
    dayOf: se,
    keyOf: Ge,
    nextDay: Ze,
    bossOn: Te,
    ready: yt,
    sync: he,
    themeOn: ce,
    swapEntry: fe,
    pool: De,
    poolOn: oe,
    REGIONS: u,
    regionOf: ve,
    regions: K,
    lockedRegions: He,
    unlocked: T,
    drawing: L,
    drawn: R,
    lane: m,
    revealed: z,
    reveal: pe,
    testDraw: V,
    done: Vt,
    tried: Xt,
    addTry: Ht,
    stale: ct,
    mine: ge,
    teamKey: wt,
    bots: jt,
    offers: Y,
    setPick: nt,
    slotOf: Ot,
    picked: ee,
    picks: ye,
    dexMax: ha,
    allyMon: rt,
    owner: bt,
    team: Qe,
    block: Ft,
    best: ca,
    flush: An,
    loadBoard: is,
    boardRows: Ua,
    boardFresh: fn,
    testBoard: Kt,
    testNpc: Ha,
    hasTestBoard: () => Me || !!_a,
    npcDay: Jn,
    prepare: Ye,
    buildRun: pa,
    popular: Gt,
    result: Lt,
    clear: sn,
    sceneOf: wa,
    pity: ze,
    pityReady: qt,
    get state() {
      return Oe();
    },
    on(Be) {
      N.push(Be);
    },
    emit: W,
  };
})();
