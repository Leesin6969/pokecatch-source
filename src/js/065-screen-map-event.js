/**
 * screen map event
 *
 * Public API on the game namespace `t`: t.Screens.event, t.Screens.map, t.TravelFx
 *
 * Recovered from the shipped bundle — original chunk #64 at byte 1688458 (54669 bytes, sha256:043131a1651e4da4).
 * This file is one original source file; the build concatenates them in filename order.
 */
(function () {
  const { $: a, $$: b, esc: f, monSrc: ue, animSrc: H, itemSrc: vt } = t.UI,
    B = t.Game,
    se = t.STORY,
    Ge = t.Adventure,
    Je = () => t.Screens.adventure,
    Ze = {
      rock: "roche",
      water: "eau",
      electric: "électrik",
      grass: "plante",
      poison: "poison",
      psychic: "psy",
      fire: "feu",
      ground: "sol",
      ice: "glace",
      fighting: "combat",
      ghost: "spectre",
      dragon: "dragon",
      normal: "normal",
      flying: "vol",
      bug: "insecte",
      steel: "acier",
      dark: "ténèbres",
      fairy: "fée",
    };
  let x = null,
    $ = null,
    X = 0;
  const Tt = (Me) => Me.key && Me.open && se.firstChapterOf(Me.key) >= 0,
    le = (Me, It) => (Me === It ? `${Me}` : `${Me}–${It}`),
    P = (Me) => Me.lv.split("–").map(Number);
  function u(Me) {
    const It = Ge.state;
    if (Me.key && B.departureTo()?.key === Me.key)
      return `<button class="rg open depart" data-depart="${Me.key}" style="--c:${Me.color}">
      <span class="rg-top"><img src="assets/ui/town-map.png" alt=""><b>${f(e(Me.name))}</b></span>
      <small>${e("Nouvelle région !")}</small><span class="rg-go">${e("Partir pour {region} ›", { region: f(e(Me.name)) })}</span></button>`;
    if (!Tt(Me) || !se.regionUnlocked(Me.key, It)) {
      const _a = se.REGIONS[se.REGIONS.indexOf(Me) - 1],
        Ha = _a?.key && B.regionDone(_a.key) && !B.regionCleared(_a.key),
        Ua = !(Me.key && se.firstChapterOf(Me.key) >= 0) || (Me.wip && !Me.open),
        sn = Ua
          ? e("Bientôt…")
          : Tt(Me)
            ? Me.lockText
              ? e(Me.lockText)
              : e("Verrouillé")
            : Ha
              ? e("Terminer le Mont Argenté pour débloquer")
              : _a
                ? e("Terminer {region} pour débloquer", { region: e(_a.name) })
                : e("Terminer la région pour débloquer");
      return `<div class="rg soon${Ua ? "" : " lock"}" style="--c:${Me.color}"><span class="rg-top"><b>${f(e(Me.name))}</b></span><small>${Ua ? "" : t.UI.lockIc}${f(sn)}</small></div>`;
    }
    const Kt = Je().regionGyms(Me.key),
      Aa = t.POKEDEX.filter((_a) => _a.id >= Me.dex[0] && _a.id <= Me.dex[1]),
      Ka = Aa.filter((_a) => B.inDex(_a.id)).length;
    return `<button class="rg open ${Me.key === x ? "active" : ""}" data-rg="${Me.key}" style="--c:${Me.color}">
      <span class="rg-top"><img src="assets/ui/town-map.png" alt=""><b>${f(e(Me.name))}</b></span>
      <small class="rg-caught"><img src="${vt("poke-ball")}" alt="">${e("{n}/{total} capturés", { n: Ka, total: Aa.length })}</small>
      <span class="rg-badges">${Kt.map((_a) => se.badgeHtml(_a.badge, 1, It.badges.includes(_a.badge) ? "" : "off")).join("")}</span>
    </button>`;
  }
  function ve(Me) {
    const It = Ge.state,
      Kt = Je().chapterMeta(Me),
      Aa = Me > It.unlocked,
      Ka = Me === It.chapter,
      _a =
        !Aa &&
        !Ka &&
        (Kt.boss?.badge
          ? (Kt.boss.champion && Me < It.unlocked) || It.badges.includes(Kt.boss.badge)
          : Me < It.unlocked);
    return { locked: Aa, current: Ka, done: _a, ch: Me };
  }
  function it(Me) {
    const It = Me.map(ve);
    return {
      locked: It[0].locked,
      current: It.some((Kt) => Kt.current),
      done: It[It.length - 1].done,
      ch: Me[0],
    };
  }
  const De =
      '<svg class="loop-ic" viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="2.6" stroke-linecap="round" stroke-linejoin="round"><path d="M19.5 9A8 8 0 0 0 5.2 7.2"/><path d="M4.5 15a8 8 0 0 0 14.3 1.8"/><path d="M19.8 4.2V9h-4.8"/><path d="M4.2 19.8V15h4.8"/></svg>',
    je = (Me, It) =>
      It.locked
        ? ""
        : `<span class="pg-loop ${Ge.isLooping(Me) ? "on" : ""}" data-loop="${Me}" role="switch" tabindex="0" aria-checked="${Ge.isLooping(Me)}" aria-label="${e("Boucler")}"
    title="${String(Me)[0] === "L" ? e("Rejouer la Ligue en boucle : les chapitres en boucle s'enchaînent, une défaite ramène au premier") : e("Rejouer ce chapitre en boucle : les chapitres en boucle s'enchaînent, une défaite ramène au premier")}">${De}</span>`,
    pt = (Me) => {
      const It = B.S.link;
      return Me == null || !It || B.sideOf(B.homeKey(se.regionOf(Me).key)) === It.side
        ? B.S.team
        : It.stash.team;
    };
  function re(Me, It) {
    if (It.locked) return `<span class="pg-lv lock">${e("Verrouillé")}</span>`;
    const [Kt, Aa = Kt] = String(Me).split("–").map(Number),
      Ka = B.teamMons(pt(It.ch)),
      _a = Ka.length ? Ka.reduce((Ha, Ua) => Ha + Ua.level, 0) / Ka.length : 0;
    return `<span class="pg-lv ${_a > Aa ? "ok" : _a >= Kt ? "tight" : "under"}">${e("Niv. conseillé {lv}", { lv: `<b>${Me}</b>` })}</span>`;
  }
  const We = (Me) => (Me.locked ? "locked" : Me.current ? "current" : Me.done ? "done" : "");
  function oe(Me, It) {
    if (!It.current) return "";
    const Kt = B.S.link ? se.regionCap(B.S.adv, se.regionOf(Me).key) : se.levelCap(B.S.adv);
    return Kt >= t.CONFIG.MAX_LEVEL
      ? ""
      : `<span class="cap-chip">${e("Plafond Nv. {n}", { n: `<b>${Kt}</b>` })}</span>${t.UI.helpTip(e("Plafond de niveau"), e("Tes Pokémon ne dépassent pas ce niveau tant que le prochain dresseur n'est pas battu. Pendant une absence, ils gagnent {n} niveaux au plus.", { n: t.CONFIG.OFFLINE_MAX_LEVELS }))}`;
  }
  function $e(Me) {
    const It = se.CHAPTERS[Me].steps.filter((Aa) => Aa.kind === "route"),
      Kt = {};
    return (
      It.forEach((Aa, Ka) => {
        if (Aa.wild === 0) return;
        const _a = se.routeBand(Me, Ka, It.length);
        for (const Ha of Ge.zonePool({ ...Aa, lv: _a }, Me, !0, null, !0)) {
          const Ua = Ha.id,
            sn =
              Kt[Ua] ||
              (Kt[Ua] = {
                id: Ua,
                min: Ha.min,
                max: Ha.max,
                w: 0,
                when: new Set(),
                always: !1,
                at: new Set(),
              });
          ((sn.min = Math.min(sn.min, Ha.min)),
            (sn.max = Math.max(sn.max, Ha.max)),
            (sn.w += Ha.pct),
            Aa.tide
              ? sn.when.add("tide-" + Aa.tide)
              : Ha.when
                ? Ha.when.forEach((Be) => sn.when.add(Be))
                : ((sn.always = !0), sn.at.add(Aa.name)));
        }
      }),
      Object.values(Kt).sort((Aa, Ka) => Ka.w - Aa.w)
    );
  }
  function Z(Me, It) {
    const Kt = new Set([t.DAYTIME.phase().key, ...A(It).map((_a) => _a.key), se.tide().key]);
    Kt.has("morning") && Kt.add("day");
    const Aa = [{ k: "", list: Me.filter((_a) => _a.always) }];
    for (const _a of Me.filter((Ha) => Ha.when.size))
      for (const Ha of _a.when) {
        let Ua = Aa.find((sn) => sn.k === Ha);
        (Ua || Aa.push((Ua = { k: Ha, on: Kt.has(Ha), list: [] })), Ua.list.push(_a));
      }
    const Ka = (_a) =>
      ["", "day", "night", ...Object.keys(t.CONFIG.WEATHER.TYPES), ...Object.keys(se.TIDES)].indexOf(_a) +
        1 || 99;
    return Aa.filter((_a) => _a.list.length).sort((_a, Ha) =>
      _a.k ? (Ha.k ? (Ha.on ? 1 : 0) - (_a.on ? 1 : 0) || Ka(_a.k) - Ka(Ha.k) : 1) : -1,
    );
  }
  function A(Me) {
    const It = t.WEATHER,
      Kt = {};
    if (!It) return [];
    for (const Aa of se.CHAPTERS[Me].steps.filter((Ka) => Ka.kind === "route")) {
      const Ka = It.current({
        ch: Me,
        name: Aa.name,
        bg: Aa.bg,
        climate: Aa.climate,
        indoor: Aa.indoor ?? t.SCENES.resolve(Aa, Me)?.indoor,
        areas: Aa.areas,
      });
      Ka && (Kt[Ka] || (Kt[Ka] = { key: Ka, info: It.info(Ka), zones: [] })).zones.push(Aa.name);
    }
    return Object.values(Kt);
  }
  const J = (Me) => {
      const It = t.DAYTIME.phase();
      return `<span class="wx" data-cond="${It.key}">${[`${It.icon} ${f(e(It.name))}`, ...A(Me).map((Kt) => `${Kt.info.icon} ${f(e(Kt.info.name))}`)].join(" · ")}</span>`;
    },
    de = (Me) => Math.round(Me / 100) * 100;
  function _e(Me) {
    const It = t.CONFIG,
      Kt = Ge.state,
      Aa = [];
    let Ka = 0;
    for (const Ua of Me) {
      const sn = se.CHAPTERS[Ua],
        Be = !!sn.league,
        Ut = Be && B.regionDone(se.regionOf(Ua).key);
      for (const aa of Je().chapterMeta(Ua).gyms) {
        const ae = (aa.badge && Kt.badges?.includes(aa.badge)) || Kt.paidLeaders?.[`${Ua}:${aa.leader}`];
        Ka +=
          (aa.reward || 0) *
          (Be ? It.LEAGUE_TRAINERS.reward : 1) *
          (ae ? (Be && !Ut ? It.LEAGUE_TRAINERS.replayMoney : It.LEADER_REPLAY_MONEY) : 1) *
          B.behindMoney(Ua);
      }
      (sn.steps.some((aa) => aa.kind === "route" && aa.item) &&
        Aa.push(se.ITEM_TABLE.find(([, aa]) => aa.money)[1].money),
        Ge.townOdds(Ua).towns && Aa.push(It.TOWN_EVENT.money));
    }
    const _a = Aa.length ? Math.min(...Aa.map((Ua) => Ua[0])) : 0,
      Ha = Aa.length ? Math.max(...Aa.map((Ua) => Ua[1])) : 0;
    return [de((Ka + _a) * It.MONEY_GAIN), de((Ka + Ha) * It.MONEY_GAIN)];
  }
  const Re = (Me) => {
      const [It, Kt] = _e(Me);
      return Kt
        ? `<span>${e("Récompense {n}", { n: `<b>${It === Kt ? t.UI.fmt(Kt) : `${t.UI.fmt(It)}–${t.UI.fmt(Kt)}`} ₽</b>` })}</span>`
        : "";
    },
    dt = (Me) =>
      A(Me)
        .map(
          (It) =>
            `<span class="pg-lv pg-wx" data-cond="${It.key}">${It.info.icon} ${f(e(It.info.name))}</span>`,
        )
        .join("") +
      (se.tidal(Me)
        ? ((It) => `<span class="pg-lv pg-wx" data-cond="${It.key}">${It.icon} ${f(e(It.name))}</span>`)(
            se.tide(),
          )
        : ""),
    qe = (Me) =>
      se.tidal(Me)
        ? ((It) =>
            `<span class="wx" data-cond="${It.key}">${It.icon} ${f(e(It.name))}${It.key === "tide-high" ? " ·" : ""} <b>${t.UI.tideWhen(It)}</b></span>`)(
            se.tide(),
          )
        : "";
  function ce(Me, It) {
    const Kt = B.inDex(Me),
      Aa = Kt || !!B.S.seen?.[Me] || !!B.S.dex[Me];
    return `<div class="${Kt ? "got" : Aa ? "seen" + (B.S.dex[Me] ? " lost" : "") : "unk"}" data-dex="${Me}" role="button" tabindex="0" title="${Aa ? f(B.DEX[Me].name) : "???"} · ${It} · ${e("Fiche Pokédex")}">${t.UI.sprBox(Me, !1, t.UI.tileScale(Me), 48)}</div>`;
  }
  const tt = (Me) => e("{n} %", { n: (Math.round(Me * 1e3) / 10).toLocaleString(t.I18n?.lang || "fr") });
  function mt(Me) {
    const It = Ge.state,
      Kt = [];
    for (const aa of se.CHAPTERS[Me].steps) {
      (aa.kind === "find" &&
        aa.item &&
        !Kt.some((ae) => ae.key === aa.item) &&
        Kt.push({ key: aa.item, found: !!It.gifts?.[aa.once] }),
        aa.candy && Kt.push({ key: "rare-candy", found: !!It.gifts?.[aa.candy] }));
      for (const [ae, ft] of Object.entries(aa.loot || {})) {
        if (ae.includes(":") || Kt.some((ea) => ea.key === ae)) continue;
        const ht = typeof ft == "object" && ft.owns?.filter((ea) => !B.owns(ea));
        Kt.push({
          key: ae,
          found: !!It.gifts?.[ae],
          p: typeof ft == "number" ? ft : ft.p,
          need: ht?.length ? ht : null,
          lock: typeof ft == "object" && ft.badge && !It.badges?.includes(ft.badge),
        });
      }
    }
    const Aa = se.CHAPTERS[Me].steps.filter((aa) => aa.kind === "route" && aa.item).length,
      Ka = (aa, ae = "") =>
        `<span class="tip-host" tabindex="0"><img src="${vt(aa)}" alt=""><span class="bag-tip info-tip-box" role="tooltip"><b>${f(t.UI.itemName(aa))}</b>${Je().itemEffect?.(aa) || ""}${ae}</span></span>`,
      _a = (aa) =>
        `<span class="mp-it${aa.found ? " got" : aa.need || aa.lock ? " lk" : ""}">${Ka(aa.key, aa.need && !aa.found ? `<p class="it-from">${t.UI.lockIc}${e("Tombe seulement si tu possèdes {names}", { names: f(aa.need.map((ae) => B.DEX[ae].name).join(", ")) })}</p>` : "")}${aa.found || aa.p ? `<span class="it-n">${aa.found ? "✓" : tt(aa.p)}</span>` : ""}</span>`,
      Ha = new Map(),
      Ua = (aa, ae, ft) => {
        const ht = Ha.get(aa) || {};
        ((ht[ae] = (ht[ae] || 0) + ft), Ha.set(aa, ht));
      };
    if (Aa) for (const aa of Ge.itemOdds(Me)) aa.item && Ua(aa.item, "route", aa.p);
    const sn = Ge.townOdds(Me);
    if (sn.towns) for (const aa of sn.list) Ua(aa.item, "town", aa.p);
    const Be = (aa) => (aa.startsWith("exp-candy") ? 0 : aa === "rare-candy" ? 1 : 2),
      Ut = [...Ha]
        .sort((aa, ae) => Be(aa[0]) - Be(ae[0]))
        .map(([aa]) => `<span class="mp-it rnd">${Ka(aa)}</span>`)
        .join("");
    return !Kt.length && !Ut
      ? ""
      : `<div class="mp-pk"><h5>${e("Objets trouvables")}${Kt.length ? ` <small>${e("{n}/{total} trouvés", { n: Kt.filter((aa) => aa.found).length, total: Kt.length })}</small>` : ""}</h5>
      <div class="mp-items">${Kt.map(_a).join("")}${Ut}</div></div>`;
  }
  const Te = (
      Me,
      It,
      Kt,
      Aa,
      Ka,
    ) => `<div class="mp-hero${Ka ? ` rm-hero fx-${Ka.fx}` : ""}" style="background-image:${Me}${Ka ? `;--ec:${Ka.color}` : ""}">${Ka ? t.EventUI.layer(Ka.fx) : ""}
    ${Kt.current ? `<span class="st cur">▶ ${e("En cours")}</span>` : Kt.done ? `<span class="st ok">✓ ${Aa}</span>` : Kt.locked ? `<span class="st">${t.UI.lockIc}${e("Verrouillé")}</span>` : ""}
    <span class="faces ${It.length > 1 ? "many" : ""} ${Kt.locked || Kt.sil ? "sil" : ""}">${It.join("")}</span></div>`,
    At = () =>
      `<div class="mp-prog"><i style="width:${Math.round((Ge.state.node / Math.max(1, Ge.state.nodes.length)) * 100)}%"></i></div>`,
    yt = (Me) => t.TYPES[B.DEX[Me].types[0]].color,
    he = (Me, It = "") =>
      `<span class="mp-ev ${It}" style="--ec:${yt(Me)}"><img src="${H(Me)}" alt=""></span>`,
    fe = (Me) => {
      const It = Math.max(0, Math.ceil(Me / 1e3));
      return `${String(Math.floor(It / 60)).padStart(2, "0")}:${String(It % 60).padStart(2, "0")}`;
    };
  function Oe(Me) {
    const It = t.Roaming?.here(Me);
    return It
      ? `<span class="ev-timer rm-pill" data-roam-until="${It.until}" title="${f(e("{name} rôde ici", { name: B.DEX[It.id].name }))}">${fe(It.until - B.time())}</span>`
      : "";
  }
  function Ee(Me) {
    const It = t.Roaming?.here(Me);
    return It
      ? `<span class="rm-chip" data-roam-until="${It.until}"><img src="${ue(It.id)}" alt="">${f(e("{name} rôde ici", { name: B.DEX[It.id].name }))} · <b>${fe(It.until - B.time())}</b></span>`
      : "";
  }
  Ss(() => {
    if (document.hidden) return;
    const Me = b("[data-roam-until]");
    for (const It of Me) {
      const Kt = +It.dataset.roamUntil - B.time();
      if (Kt <= 0) {
        ts();
        return;
      }
      It.lastChild.textContent = fe(Kt);
    }
  }, 1e3);
  const et = (Me, It) => {
      const Kt = Me.boss,
        Aa = Ge.state;
      return (
        !Kt?.sprite ||
        Kt.boss ||
        It < Aa.unlocked ||
        Aa.badges.includes(Kt.badge) ||
        !!Aa.metLeaders?.[Kt.badge || Kt.leader]
      );
    },
    _ = (Me, It) => {
      const Kt = Ge.state,
        Aa = Me.boss;
      return (
        It < Kt.unlocked ||
        (!!Aa?.badge && Kt.badges.includes(Aa.badge)) ||
        !!Kt.metLeaders?.["L" + It] ||
        (It === Kt.unlocked && !!Kt.metLeaders?.[Aa?.badge || Aa?.leader])
      );
    };
  function we(Me, It, Kt = et(Me, It)) {
    const Aa = Me.boss;
    return Me.icon || !Aa?.sprite || Aa.boss
      ? ""
      : `<span class="ch-av ${Kt ? "" : "sil"}">${t.UI.trainerFace(Aa.sprite, "ch-face")}${se.badgeHtml(Aa.badge, 1)}</span>`;
  }
  function ie(Me) {
    const It = se.CHAPTERS[Me],
      Kt = Je().chapterMeta(Me),
      Aa = ve(Me),
      Ka = It.steps?.find((sn) => sn.kind === "gym"),
      _a = !Aa.locked && Ka && t.SCENES.resolve(Ka, Me),
      Ha = _a ? `<span class="row-scene" style="background-image:url(${_a.src})"></span>` : "",
      Ua = !Aa.locked && t.Roaming?.here(Me);
    return `<button class="mp-row ${We(Aa)} ${_a ? "gym-bg" : ""} ${Ua ? "rm-here" : ""} ${Me === $ ? "sel" : ""}" data-ch="${Me}" style="--c:${Kt.color}">${Ha}
      <span class="n">${String(Je().chapterNum(Me)).padStart(2, "0")}</span><span class="bd">${Ua ? he(Ua.id) : we(Kt, Me) || Je().chapterBadge(Kt, 2)}</span>
      <span class="t"><b>${f(e(It.name))}${Aa.locked ? "" : Oe(Me)}</b><small>${re(Kt.lv, Aa)}${Aa.locked ? "" : dt(Me)}</small></span>${je(Me, Aa)}</button>`;
  }
  const U = () => t.Events,
    Ne = () => (U().unlocked() ? U().phase(U().cur) : "none"),
    T = (Me) => t.TYPES[U().legendOf(Me).types[0]].color;
  function L(Me, It) {
    const Kt = T(Me.id),
      Aa = t.EventUI.fx(Me);
    return `<button class="mp-row ${It ? "sel" : ""} ev-here ph-open fx-${Aa}" data-ev-act="${Me.seq}" style="--c:${Kt};--ec:${Kt}">${t.EventUI.fxLayer(Me)}
      <span class="bd"><span class="mp-ev"><img src="${H(Me.id)}" alt=""></span></span>
      <span class="t"><b>${f(B.DEX[Me.id].name)}</b><small>${Me.priv ? `<span class="pg-lv"><b>${e("Chasse privée")}</b></span> ` : ""}<span class="pg-lv">${e("Niv. {lv} max", { lv: `<b>${t.CONFIG.EVENT.LEVEL}</b>` })}</span></small></span>
      <span class="lv"><span class="ev-timer" data-ev-timer="${Me.priv ? Me.seq : ""}">${f(t.EventUI.timer(Me))}</span></span></button>`;
  }
  let R = null,
    te = null;
  function K(Me, It) {
    return U().met(Me.id)
      ? `<button class="mp-row ev-prep ${te === Me.id ? "sel" : ""}" data-ev-sel="${Me.id}" style="--c:${T(Me.id)}">
      <span class="bd ev-sil">${t.UI.sprBox(Me.id, !1, 1, 40)}</span>
      <span class="t"><b>${f(B.DEX[Me.id].name)}</b><small>${It}</small></span>${t.EventTeam.mini(Me.id)}</button>`
      : `<div class="mp-row locked" style="--c:${T(Me.id)}">
      <span class="bd ev-sil">${t.UI.sprBox(Me.id, !1, 1, 40)}</span>
      <span class="t"><b>???</b><small>${It}</small></span></div>`;
  }
  let He = "hunt",
    m = 0,
    z = [];
  function pe(Me, It = !0) {
    const Kt = U().legendOf(Me.id),
      Aa = It ? U().zoneOf(Me) : Kt,
      Ka = T(Me.id),
      _a = It && t.EventUI.inEvent() && Ge.state.event?.seq === Me.seq;
    return `<div class="mp-det" style="--c:${Ka}" data-evt-id="${Me.id}"><div class="mp-hero" style="background-image:${t.SCENES.css({ ...Aa, name: Aa.zone })}">
        <span class="st ${It ? "cur" : ""}">${It ? `● ${Me.priv ? `${e("Chasse privée")} · ` : ""}<span data-ev-timer="${Me.priv ? Me.seq : ""}">${f(t.EventUI.timer(Me))}</span>` : e("Introuvable pour le moment…")}</span>
        <span class="faces"><span class="mp-ev ev-big" style="--ec:${Ka}"><img src="${H(Me.id)}" alt=""></span></span></div>
      <div class="mp-in">
        <div class="ttl ev-ttl"><h3>${f(B.DEX[Me.id].name)}</h3></div>
        <div class="ev-hunt"><div class="mp-chips"><span>${e("Niv. {lv} max", { lv: `<b>${t.CONFIG.EVENT.LEVEL}</b>` })}</span>${Aa.zone ? `<span>📍 ${f(e(Aa.zone))}</span>` : ""}${Kt.types.map((Ha) => t.UI.typeBadge(Ha, !0)).join("")}</div>
        ${It ? `<div class="ev-wallet">${t.EventUI.wallet()}</div>` : ""}
        ${t.EventTeam.strip(Me.id)}</div>
        <div class="mp-act">${It ? (_a ? `<span class="ev-run">${e("Boucle {n}", { n: Ge.state.event.loops + 1 })}</span><button class="mp-go ghost" data-ev-leave>${e("Quitter la chasse")}</button>` : `<button class="mp-go" data-ev-join="${Me.priv ? Me.seq : ""}">${e("Rejoindre la chasse")}</button>`) : V(Me.id)}</div>
      </div></div>`;
  }
  function V(Me) {
    const It = t.CONFIG.EVENT.PRIVATE,
      Kt = U().privateBlock(Me),
      Aa = U().state.traces[Me] || 0;
    return `<div class="ev-priv"><div class="ev-prog"><i style="width:${Math.min(100, (Aa / It.TRACES) * 100)}%"></i>
        <small><img src="${vt("trace-" + Me)}" alt=""> ${e("{n}/{total} traces", { n: Math.min(Aa, It.TRACES), total: It.TRACES })}</small></div>
      <button class="mp-go" data-ev-priv="${Me}" ${Kt ? "disabled" : ""} title="${e("Seul dans la chasse pendant {n} min, sans rival", { n: It.OPEN_MIN })}">${Kt && Aa >= It.TRACES ? f(Kt) : e("Lancer une chasse privée")}</button></div>`;
  }
  function lt() {
    const Me = U().cur,
      It = Ne(),
      Kt = U().priv(),
      Aa = [...(It === "open" ? [Me] : []), ...(Kt ? [Kt] : [])],
      Ka = Aa.find((Be) => Be.seq === R) || Aa[0] || null;
    R = Ka?.seq ?? null;
    const _a = U().LEGENDS.filter((Be) => !(It !== "none" && Be.id === Me.id) && Be.id !== Kt?.id),
      Ha = U().LEGENDS.filter((Be) => B.S.dex[Be.id]).length;
    U().met(te) || (te = null);
    const Ua = [
        ...(It === "announce"
          ? [K(U().legendOf(Me.id), `<span data-ev-timer>${f(t.EventUI.timer(Me))}</span>`)]
          : []),
        ..._a.map((Be) => K(Be, e("Introuvable pour le moment…"))),
      ],
      sn = te
        ? pe({ id: te }, !1)
        : Ka
          ? pe(Ka)
          : `<p class="pg-empty">${e("Le prochain event apparaîtra ici.")}</p>`;
    return `<div class="map-region" style="--c:#a33ea1">
      <div class="map-head"><img src="${vt("master-ball")}" alt=""><h2>${e("Event")}</h2><div class="map-sum">
        <span>${e("Events actifs")} <b>${Aa.length}</b></span><span>${e("Légendaires")} <b>${Ha}/${U().LEGENDS.length}</b></span></div></div>
      <div class="map-body pg-ev-body">
        <div class="mp-list"><h4>${e("Events actifs")}</h4>${Aa.length ? Aa.map((Be) => L(Be, !te && Be === Ka)).join("") : `<p class="pg-empty">${e("Aucun event en cours")}</p>`}
          <h4>${e("Events inactifs")}</h4>${Ua.join("")}</div>
        <div class="pg-info"><h4>${e("Informations")}</h4>${sn}</div>
      </div></div>`;
  }
  function kt(Me) {
    const It = se.CHAPTERS[Me],
      Kt = Je().chapterMeta(Me),
      Aa = ve(Me),
      Ka = $e(Me),
      _a = Kt.boss ? e(Kt.boss.leader) : e("Légendaire"),
      Ha = !Aa.locked && t.Roaming?.here(Me),
      Ua = Ha ? [he(Ha.id, "ev-big")] : Kt.faces;
    return `<div class="mp-det ch-det" style="--c:${Kt.color}">${Te(Kt.bg, Ua, Ha || et(Kt, Me) ? Aa : { ...Aa, sil: !0 }, e("Terminé"), Ha && { fx: t.EventUI.fxOf(B.DEX[Ha.id].types[0]), color: yt(Ha.id) })}
      <div class="mp-in">
        <div class="ttl">${Je().chapterBadge(Kt, 3)}<div class="ttl-t">
          <span class="ttl-who">${Aa.locked ? "???" : f(_a)}${Kt.boss?.type ? `<span class="ty" data-type="${Kt.boss.type}"${t.TYPES[Kt.boss.type] ? ` style="--c:${t.TYPES[Kt.boss.type].color}"` : ""}>${e(Ze[Kt.boss.type] || Kt.boss.type)}</span>` : ""}</span>
          <h3>${f(e(It.name))}</h3></div></div>
        <div class="mp-chips">
          ${re(Kt.lv, Aa).replace(e("Verrouillé"), e("Niv. conseillé {lv}", { lv: `<b>${Kt.lv}</b>` }))}${oe(Me, Aa)}
          ${Re([Me])}
          ${Aa.locked ? "" : J(Me)}
          ${Aa.locked ? "" : qe(Me)}
          ${Aa.locked ? "" : Ee(Me)}
        </div>
        ${Kt.boss?.text && !Aa.locked ? `<p class="flav">${f(e(Kt.boss.text))}</p>` : ""}
        ${Aa.locked ? "" : mt(Me)}
        <div class="mp-pk">${
          Ka.length
            ? `<h5>${e("Pokémon trouvables")} <small>${e("{n}/{total} capturés", { n: Ka.filter((sn) => B.inDex(sn.id)).length, total: Ka.length })}</small></h5>
          ${Z(Ka, Me)
            .map(
              (
                sn,
              ) => `${sn.k ? `<div class="zone-cond${sn.on ? " now" : " off"}" data-cond="${sn.k}"><span class="zone-cond-ic">${t.DAYTIME.cond(sn.k).icon}</span>${f(e(t.DAYTIME.cond(sn.k).name))}${sn.on ? `<span class="zone-cond-now">${e("maintenant")}</span>` : ""}</div>` : ""}
          <div class="mp-grid${sn.k && !sn.on ? " off" : ""}">${sn.list.map((Be) => ce(Be.id, e("Nv. {n}", { n: le(Be.min, Be.max) }) + (!sn.k && Be.when.size ? " · " + [...Be.at].map((Ut) => f(e(Ut))).join(", ") : ""))).join("")}</div>`,
            )
            .join("")}`
            : ""
        }</div>
        ${Aa.current ? At() : ""}
        <div class="mp-act"><button class="mp-go" data-go="${Me}" ${Aa.locked ? "disabled" : ""}>${Aa.locked ? e("Bats l’arène précédente") : Aa.current ? e("Continuer") : e("Refaire le chapitre")}</button></div>
      </div></div>`;
  }
  const ra = (Me) => {
    const It = Me.map((Kt) => P(Je().chapterMeta(Kt)));
    return le(It[0][0], It[It.length - 1].pop());
  };
  function Vt(Me) {
    const It = it(Me),
      Kt = Je().chapterMeta(Me[Me.length - 1]),
      Aa = Me[Me.length - 1],
      Ka = se.CHAPTERS[Aa].steps.find((Ha) => Ha.kind === "gym"),
      _a = !It.locked && Ka && t.SCENES.resolve(Ka, Aa);
    return `<button class="mp-row ${We(It)} ${_a ? "gym-bg" : ""} ${$ === "L" ? "sel" : ""}" data-ch="L" style="--c:${Kt.color}">${_a ? `<span class="row-scene" style="background-image:url(${_a.src})"></span>` : ""}
      <span class="n">🏆</span><span class="bd"><img src="${vt("master-ball")}" alt=""></span>
      <span class="t"><b>${e("Ligue Pokémon")}</b><small>${re(ra(Me), It)}</small></span>${je(Ge.loopKey(Me[0]), It)}</button>`;
  }
  let Xt = "league";
  const Ht = (Me) => se.regionOf(Me[0]).key,
    ct = (Me, It) => {
      const Kt = Dt().leagueOpen(Ht(Me));
      return `<div class="ttl${Kt ? " ev-ttl" : ""}"><img src="${vt("master-ball")}" alt=""><h3>${e("Ligue Pokémon")}</h3>${
        Kt
          ? `${It ? t.UI.helpTip(e("Ligue Élite"), e("La Ligue revient plus forte, palier par palier : le Conseil 4 puis le Maître au Nv. 100 avec un rang (Élite I à V), sans les dresseurs des salles, un Centre Pokémon avant chacun. Une défaite renvoie au premier. Chaque palier battu donne une gemme légendaire, d'un type à choisir parmi ceux de la Ligue, et le cadre de la Ligue en III et en V.")) : ""}<div class="seg ev-seg">
      <button class="${It ? "" : "on"}" data-lg-view="league">${e("Ligue")}</button><button class="${It ? "on" : ""}" data-lg-view="elite">${e("Élite")}</button></div>`
          : ""
      }</div>`;
    };
  function wt(Me, It) {
    const Kt = B.S.eliteLeague?.[Me]?.gems || {},
      Aa = e(se.REGIONS.find((Ua) => Ua.key === Me)?.name || Me),
      Ka = (Ua) =>
        `<span class="bag-cell lz-st-gem${Ua ? "" : " lz-st-unk"}"><img src="${vt("gem-" + (Ua || "normal"))}" alt="">${Ua ? "" : '<b class="lz-st-q">?</b>'}</span>`,
      _a = (Ua) =>
        `<span class="lz-st-mini${Ua ? "" : " lz-st-unk"}"><img src="${vt("gem-" + (Ua || "normal"))}" alt=""></span>`,
      Ha = [
        W(
          "got",
          "",
          '<span class="bag-cell lz-st-check" aria-hidden="true">✓</span>',
          e("Ligue battue"),
          " lz-st0",
        ),
      ];
    for (const Ua of t.CONFIG.ELITE.TIERS) {
      const sn = Ua <= It ? "got" : Ua === It + 1 ? "cur" : "rnd",
        Be = Kt[Ua] || null,
        Ut = Ua <= It && Kt[Ua] === null,
        aa = Dt().leagueFrame(Ua),
        ae = Be
          ? t.Underground.gemName(Be + ":3")
          : e(Ut ? "Gemme légendaire à choisir" : "Gemme légendaire au choix"),
        ft = aa
          ? e("{frame} + {gem}", {
              frame: e("Cadre Ligue de {region} {r}", { region: Aa, r: ha[Ua] }),
              gem: ae,
            })
          : ae,
        ht = e(Ut ? "À choisir" : aa ? "Cadre + gemme" : Be ? t.TYPES[Be]?.fr || Be : "Gemme"),
        ea = aa
          ? t.UI.trainerFace(B.S.trainer?.sprite, "lz-st-face", `el-league-${Me}-${Ua >= 5 ? 5 : 3}`) + _a(Be)
          : Ka(Be);
      Ha.push(
        W(
          sn,
          ha[Ua],
          ea,
          ft,
          (aa ? " lz-st-fr" : "") + (Ut ? " lz-st-pick" : ""),
          ht,
          Ut ? ` data-lg-pick="${Me}:${Ua}"` : "",
        ),
      );
    }
    return `<div class="lz-track"><h4 class="cr-eye">${e("Récompenses")}<small>${e("{n} / {max} paliers", { n: `<b>${It}</b>`, max: t.CONFIG.ELITE.TIERS.length })}</small></h4>
      <div class="lz-rail" style="--fill:${It / t.CONFIG.ELITE.TIERS.length}">${Ha.join("")}</div></div>`;
  }
  function ge(Me) {
    const It = B.teamMons(B.eventTeam("league:" + Me)),
      Kt = Array.from({ length: t.CONFIG.TEAM_SIZE }, (Aa, Ka) => {
        const _a = It[Ka];
        return _a
          ? `<span class="dc-hero lz-mon" title="${f(B.DEX[_a.id].name)}">${t.UI.rankTag(_a)}${t.UI.sprBox(_a.id, _a.shiny, 2, 92)}<span class="evt-lv">${e("Nv. {n}", { n: _a.level })}</span></span>`
          : '<span class="lz-mon free">＋</span>';
      }).join("");
    return `<div class="dc-sec lz-team"><h4>${e("Équipe")}<span class="rt-n">${It.length ? `${It.length}/${t.CONFIG.TEAM_SIZE}` : e("Vide : ton équipe d'aventure part")}</span></h4>
        <button class="lz-mons" data-lg-team="${Me}" title="${e("Composer l'équipe")}">${Kt}</button></div>`;
  }
  function Fe(Me) {
    const It = Ht(Me),
      Kt = it(Me),
      Aa = Me.map((sn) => Je().chapterMeta(sn)),
      Ka = Aa[Aa.length - 1],
      _a = Dt().leagueBest(It),
      Ha = Dt().leagueNext(It),
      Ua = Ha || _a;
    return `<div class="mp-det ch-det lg-elite" style="--c:${Ka.color}">${Te(
      Ka.bg,
      Aa.flatMap((sn) => sn.faces),
      Kt,
      e("Maître de la Ligue"),
    )}
      <div class="mp-in">
        ${ct(Me, !0)}
        <div class="mp-chips"><span>${e("Niv. {lv}", { lv: `<b>${t.CONFIG.MAX_LEVEL}</b>` })}</span><span class="lz-rank">${e("Rang {r}", { r: ha[Ua] })}</span><span>${e("{n} dresseurs d'affilée", { n: Me.length })}</span><span class="lz-st">${e("Statuts réduits")}</span><span class="warn">${e("Une défaite = retour au 1er dresseur")}</span></div>
        ${wt(It, _a)}
        ${Ha ? ge(It) : ""}
        <div class="mp-act"><button class="mp-go" data-league="${It}" data-tier="${Ha}" ${Ha ? "" : "disabled"}>${Ha ? e("Affronter · {elite}", { elite: _t(Ha) }) : `✓ ${_t(_a)}`}</button></div>
      </div></div>`;
  }
  function gt(Me) {
    if (Xt === "elite" && Dt().leagueOpen(Ht(Me))) return Fe(Me);
    const It = it(Me),
      Kt = Me.map((Ha) => Je().chapterMeta(Ha)),
      Aa = Kt[Kt.length - 1],
      Ka = `<h5>${e("Dresseurs")}${t.UI.helpTip(e("Plafond de niveau"), e("Tes Pokémon ne dépassent pas ce niveau tant que le prochain dresseur n'est pas battu. Pendant une absence, ils gagnent {n} niveaux au plus.", { n: t.CONFIG.OFFLINE_MAX_LEVELS }))}</h5>
      <div class="lg-mems">${Me.map((Ha, Ua) => {
        const sn = Kt[Ua],
          Be = sn.boss,
          Ut = ve(Ha),
          aa = Math.min(t.CONFIG.MAX_LEVEL, se.capOf(Ha)),
          ae = _(sn, Ha);
        return `<div class="lg-mem${Ut.current ? " current" : ""}">${we(sn, Ha, ae) || Je().chapterBadge(sn, 2)}
        <span class="lg-who"><b>${ae ? f(e(Be.leader)) : "???"}</b>${ae && Be.type ? t.UI.typeBadge(Be.type, !0) : ""}</span>
        <span class="lg-lv">${re(sn.lv, { ...Ut, locked: It.locked }).replace(e("Verrouillé"), e("Niv. conseillé {lv}", { lv: `<b>${sn.lv}</b>` }))}<span>${e("Plafond {n}", { n: `<b>${aa}</b>` })}</span></span></div>`;
      }).join("")}</div>`,
      _a = Kt.flatMap((Ha, Ua) =>
        _(Ha, Me[Ua]) ? Ha.faces : Ha.faces.map((sn) => sn.replace("<img ", '<img class="sil" ')),
      );
    return `<div class="mp-det ch-det" style="--c:${Aa.color}">${Te(Aa.bg, _a, It, e("Maître de la Ligue"))}
      <div class="mp-in">
        ${ct(Me, !1)}
        <div class="mp-chips">
          ${re(ra(Me), It).replace(e("Verrouillé"), e("Niv. conseillé {lv}", { lv: `<b>${ra(Me)}</b>` }))}
          <span>${e("{n} dresseurs d'affilée", { n: Me.length })}</span>
          ${Re(Me)}
          <span class="warn">${e("Une défaite = retour au 1er dresseur")}</span>
        </div>
        <div class="mp-pk">${Ka}</div>
        ${It.current ? At() : ""}
        <div class="mp-act"><button class="mp-go" data-go="L" ${It.locked ? "disabled" : ""}>${It.locked ? e("Franchis la Route Victoire") : It.current ? e("Continuer la Ligue") : It.done ? e("Défier à nouveau la Ligue") : e("Entrer dans la Ligue")}</button></div>
      </div></div>`;
  }
  const Dt = () => t.LegendZones,
    ha = ["", "I", "II", "III", "IV", "V"],
    _t = (Me) => e("Élite {r}", { r: ha[Me] }),
    Ea = (Me) => t.TYPES[B.DEX[Dt().foe(Me)].types[0]].color,
    ut = (Me) => e("{mon} capturé · une autre forme lundi", { mon: B.DEX[Dt().foe(Me)].name }),
    jt = (Me) => (Me.need > 1 ? `${Me.have}/${Me.need}` : ""),
    xt = { pc: 8, phone: 4 };
  function D(Me, It) {
    const Kt = (Be, Ut) =>
        Be && (Be.kind === "type" || Be.kind === "types") && Ut?.ids
          ? Ut.ids.filter((aa) => !B.S.dex[aa])
          : [],
      Aa = It.lines ? (Me.cond.list || []).flatMap((Be, Ut) => Kt(Be, It.lines[Ut])) : Kt(Me.cond, It);
    if (!Aa.length) return "";
    const Ka = Aa.length,
      _a = Ka > xt.pc ? xt.pc - 1 : Ka,
      Ha = Ka > xt.phone ? xt.phone - 1 : Ka,
      Ua = (Be, Ut) =>
        ce(Be, e("Pas encore capturé")).replace(
          '<div class="',
          Ut >= _a ? '<div hidden class="' : Ut >= Ha ? '<div class="lz-ph ' : '<div class="',
        ),
      sn = (Be, Ut) => `<div class="lz-more ${Ut}" role="button" tabindex="0" data-lz-more>+${Ka - Be}</div>`;
    return `<div class="mp-grid lz-miss">${Aa.map(Ua).join("")}${_a < Ka ? sn(_a, "lz-pc") : ""}${Ha < Ka ? sn(Ha, "lz-mb") : ""}</div>`;
  }
  function Q(Me) {
    const It = Dt().state(Me),
      Kt = Dt().progress(Me),
      Aa = Ea(Me),
      Ka = `;background-image:var(--lz-veil), ${t.SCENES.css({ ...Me, name: Me.near || Me.zone })}`;
    if (It === "locked")
      return `<div class="mp-row lz-lock" style="--c:${Aa}"${(Kt.lines || [Kt]).some((Ut) => Ut.item) ? "" : ` title="${f(Kt.text)}"`}>
      <img class="lz-pad" src="assets/ui/padlock.svg" alt="${e("Verrouillé")}"><span class="t"><b>${f(e(Me.title || Me.zone))}</b><small>${t.UI.condHtml(Kt)}</small>${D(Me, Kt)}</span><span class="lz-cnt">${jt(Kt)}</span></div>`;
    if (It === "sealed")
      return `<button class="mp-row lz-seal ${$ === "Z" + Me.id ? "sel" : ""}" data-ch="Z${Me.id}" style="--c:${Aa};background-image:var(--lz-veil), ${t.SCENES.css({ scene: Dt().riddle(Me.cond.key).scene, bg: Me.bg })}">
      <span class="t"><b>${f(e(Me.zone))}</b><small class="lz-braille">${f(Kt.text)}</small></span></button>`;
    const _a = Dt().foe(Me),
      Ha = It === "done" && Dt().eliteShown(Me),
      Ua = Ha ? Dt().eliteBest(Me.id) : 0;
    if (Ha && Ua < 5) {
      const Ut = Dt().eliteFoe(Me);
      return `<button class="mp-row lz-done lz-todo ${$ === "Z" + Me.id ? "sel" : ""}" data-ch="Z${Me.id}" style="--c:${Aa}${Ka}">
      <span class="bd"><span class="mp-ev lz-el-art"><img src="${H(Ut)}" alt=""></span>${Ua ? `<span class="rk-n lz-rk">${ha[Ua]}</span>` : ""}</span>
      <span class="t"><b>${f(B.DEX[Ut].name)}</b><small><span class="pg-lv ok lz-got"><img src="${vt("poke-ball")}" alt=""><b>${e("Capturé")}</b></span></small></span>
      <span class="lz-el-go">⚔ ${_t(Math.min(Ua + 1, 5))} <i aria-hidden="true">›</i></span></button>`;
    }
    if (It === "done" || It === "wait")
      return `<button class="mp-row lz-done${Ua >= 5 ? " lz-v5" : ""} ${$ === "Z" + Me.id ? "sel" : ""}" data-ch="Z${Me.id}" style="--c:${Aa}${Ka}">
      <span class="bd lz-box">${Ua ? `<span class="rk-n lz-rk">${ha[Ua]}</span>` : ""}${t.UI.sprBox(_a, !1, t.UI.fitScale(_a, 40), 40)}</span>
      <span class="t"><b>${f(B.DEX[_a].name)}</b><small><span class="pg-lv ok lz-got"><img src="${vt("poke-ball")}" alt=""><b>${e(It === "wait" ? "Capturé · autre forme lundi" : "Capturé")}</b></span>${Ha ? ` <span class="pg-lv lz-el">✓ ${_t(5)}</span>` : ""}</small></span></button>`;
    const sn = t.EventUI.fxOf(B.DEX[_a].types[0]),
      Be = It === "closed";
    return `<button class="mp-row ev-here lz-open${Be ? " lz-closed" : ""} fx-${sn} ${$ === "Z" + Me.id ? "sel" : ""}" data-ch="Z${Me.id}" style="--c:${Aa};--ec:${Aa}${Ka}">${Be ? "" : t.EventUI.layer(sn)}
      <span class="bd"><span class="mp-ev"><img src="${Be ? t.UI.artSrc(_a, !1, !0) : H(_a)}" alt=""></span></span>
      <span class="t"><b>${f(B.DEX[_a].name)}</b><small>${Be ? `<span class="pg-lv">${f(Dt().whenText(Me))}</span>` : re(Me.level, {})}${Y(Me)}</small></span></button>`;
  }
  const Y = (Me, It) => {
    const Kt = Dt().tries(Me);
    return Kt
      ? `${It ? "" : " "}<span${It ? "" : ' class="pg-lv"'}>${Kt === 1 ? e("1 essai") : e("{n} essais", { n: t.UI.fmt(Kt) })}</span>`
      : "";
  };
  function ye(Me, It = 0) {
    const Kt = It ? t.CONFIG.MAX_LEVEL : Me.level,
      Aa = B.teamMons(B.zoneTeam(Me.id)),
      Ka = (Ha) => (Ha.level > Kt ? `<s>${Ha.level}</s>${Kt}` : e("Nv. {n}", { n: Ha.level })),
      _a = Array.from({ length: t.CONFIG.TEAM_SIZE }, (Ha, Ua) => {
        const sn = Aa[Ua];
        return sn
          ? `<span class="dc-hero lz-mon" title="${f(B.DEX[sn.id].name)}">${t.UI.rankTag(sn)}${t.UI.sprBox(sn.id, sn.shiny, 2, 92)}<span class="evt-lv">${Ka(sn)}</span></span>`
          : '<span class="lz-mon free">＋</span>';
      }).join("");
    return `<div class="dc-sec lz-team"><h4>${e("Équipe")}<span class="rt-n">${Aa.length ? `${Aa.length}/${t.CONFIG.TEAM_SIZE}` : e("Vide : ton équipe d'aventure part")}</span></h4>
        <button class="lz-mons" data-lz-team="${Me.id}"${It ? ` data-lz-tier="${It}"` : ""} title="${e("Composer l'équipe")}">${_a}</button></div>`;
  }
  let nt = "zone",
    Ot = 0;
  const ee = {},
    rt = {};
  function Qe(Me) {
    rt[Me] ||
      Dt().boardFresh(Me) ||
      Date.now() - (ee[Me] || 0) < 3e5 ||
      ((rt[Me] = !0),
      Dt()
        .loadBoard(Me)
        .catch(() => ({ error: "network" }))
        .then((It) => {
          ((rt[Me] = !1),
            It?.error && (ee[Me] = Date.now()),
            It && $ === "Z" + Me && a("#screen-map.active") && ts());
        }));
  }
  const Ft = (Me) => {
      const It = Math.max(0, Math.floor((Date.now() - Date.parse(Me)) / 6e4));
      return It < 1
        ? e("à l'instant")
        : It < 60
          ? e("il y a {n} min", { n: It })
          : It < 1440
            ? e("il y a {n} h", { n: Math.floor(It / 60) })
            : e("il y a {n} j", { n: Math.floor(It / 1440) });
    },
    Ye = (Me) => ({
      rank: !1,
      me: Me.me,
      player: Me.team || {},
      mons: Me.team?.mons,
      lv: !0,
      score: { sub: Ft(Me.at) },
    }),
    bt = (Me) => t.UI.holdNote(e("Tu n'apparais pas dans les classements.")) + Yt(Me);
  function Yt(Me) {
    if (!t.Cloud?.user)
      return `<p class="ev-lb-none">${e("Connecte-toi (Options) pour voir les équipes des autres dresseurs.")}</p>`;
    Qe(Me.id);
    const It = Dt().board(Me.id),
      Kt = f(B.DEX[Me.id].name);
    return It
      ? It.teams.length
        ? `<p class="lzb-hint">${e("Les équipes des dresseurs qui ont capturé {name}, pour t'en inspirer.", { name: Kt })}</p>${wa(It)}
      <div class="dc-sec lzb-list"><h4>${e("Dernières victoires")}</h4>${t.UI.lbList((z = It.teams.map(Ye)))}</div>`
        : `<p class="ev-lb-none">${e("Personne n'a encore capturé {name} : à toi d'ouvrir la voie !", { name: Kt })}</p>`
      : `<p class="ev-lb-none">${ee[Me.id] ? e("Équipes indisponibles pour le moment.") : e("Chargement…")}</p>`;
  }
  const wa = (Me) =>
    Me.popular.length && Me.total >= 3
      ? `<div class="dc-sec lzb-pop"><h4>${e("Les plus choisis")}<span class="rt-n">${e("{n} équipes", { n: Me.total })}</span></h4>
      <div class="lzb-pks">${Me.popular.map((It) => `<span class="lzb-pk">${t.UI.teamTile(It)}<small>${Math.round((It.n / Me.total) * 100)} %</small></span>`).join("")}</div></div>`
      : "";
  function pa(Me) {
    if (!t.Cloud?.user) return "";
    Qe(Me.id);
    const It = Dt().board(Me.id);
    return It ? wa(It) : "";
  }
  function Gt(Me) {
    const It = Dt().progress(Me),
      Kt = Dt().riddle(Me.cond.key);
    return `<div class="mp-det" style="--c:var(--muted)">${Te(t.SCENES.css({ ...Me, scene: Kt.scene, name: Me.zone }), [], {})}
      <div class="mp-in">
        <div class="ttl ev-ttl"><h3>${f(e(Me.zone))}</h3>${t.UI.helpTip(e("Inscription"), e("Va lire l'inscription avec ton équipe d'aventure : montre-lui le bon Pokémon, ou attends. La bonne réponse ouvre la porte pour de bon, et la zone légendaire avec. Une erreur ne coûte rien : réessaie autant que tu veux."))}</div>
        <div class="mp-pk"><h5>${e("Inscription")}</h5><p class="lz-cond rd-braille">${f(It.text)}</p></div>
        <div class="mp-act"><button class="mp-go" data-zone="${Me.id}">${e("Lire l'inscription")}</button></div>
      </div></div>`;
  }
  const N = (Me, It) => {
      const Kt = `el-${Me}-${It >= 5 ? 5 : 3}`;
      return t.Frames?.LOCKS?.[Kt] ? Kt : It >= 5 ? "towerElite" : "master";
    },
    W = (
      Me,
      It,
      Kt,
      Aa,
      Ka = "",
      _a = Aa,
      Ha = "",
    ) => `<div class="lz-st ${Me}${Ka}"${Me === "cur" ? ` data-next="${f(e("Prochain"))}"` : ""}>
      <span class="lz-st-rn">${It}</span><span class="lz-st-tile tip-host" tabindex="0"${Ha}><span class="bag-tip info-tip-box" role="tooltip"><b>${f(Aa)}</b></span>${Kt}${Me === "got" ? '<i class="lz-st-ok" aria-hidden="true">✓</i>' : ""}</span>${It ? `<span class="lz-st-n">${f(_a)}</span>` : ""}</div>`;
  function ze(Me, It, Kt, Aa) {
    const Ka = W,
      _a = [
        Ka(
          "got",
          "",
          `<span class="bag-cell"><img src="${vt("poke-ball")}" alt=""></span>`,
          e("Capturé"),
          " lz-st0",
        ),
      ];
    for (const Ha of t.CONFIG.ELITE.TIERS) {
      const Ua = Ha <= Kt ? "got" : Ha === Aa ? "cur" : "rnd",
        sn = Dt().eliteReward(Ha) === "gem" && Dt().eliteGem(It),
        Be = sn ? t.Underground.gemName(sn) : e("Cadre {mon} {r}", { mon: B.DEX[It].name, r: ha[Ha] }),
        Ut = sn
          ? `<span class="bag-cell lz-st-gem"><img src="${vt("gem-" + t.Underground.gemType(sn))}" alt=""></span>`
          : t.UI.trainerFace(B.S.trainer?.sprite, "lz-st-face", N(Me.id, Ha));
      _a.push(Ka(Ua, ha[Ha], Ut, Be, sn ? "" : " lz-st-fr", e(sn ? "Gemme" : "Cadre")));
    }
    return `<div class="lz-track"><h4 class="cr-eye">${e("Récompenses")}<small>${e("{n} / {max} paliers", { n: `<b>${Kt}</b>`, max: t.CONFIG.ELITE.TIERS.length })}</small></h4>
      <div class="lz-rail" style="--fill:${Kt / t.CONFIG.ELITE.TIERS.length}">${_a.join("")}</div></div>`;
  }
  function qt(Me) {
    const It = Dt().eliteBest(Me.id),
      Kt = Dt().eliteNext(Me.id),
      Aa = Kt || It,
      Ka = Dt().eliteFoe(Me),
      _a = B.DEX[Ka],
      Ha = t.TYPES[_a.types[0]].color,
      Ua = nt === "teams",
      sn = Dt().eliteOpen(Me),
      Be = `<img src="${H(Ka)}" alt="">`;
    return `<div class="mp-det lz-elite" style="--c:${Ha}">${Te(t.SCENES.css({ ...Me, name: Me.near || Me.zone }), [Be], { done: !0 }, e("Capturé"))}
      <div class="mp-in">
        <div class="ttl ev-ttl"><h3>${f(_a.name)}</h3>${t.UI.helpTip(e("Élite"), e("Le légendaire revient plus fort, palier par palier : Nv. 100 avec un rang (Élite I à V), et il résiste mieux aux statuts. Ton équipe de zone se bat à son vrai niveau. Chaque palier battu donne sa récompense une seule fois : une gemme légendaire de son type ou son cadre de dresseur. Une défaite le relance, essais illimités."))}${
          Me.roam
            ? ""
            : `<div class="seg ev-seg">
          <button class="${Ua ? "" : "on"}" data-lz-view="zone">${e("Élite")}</button><button class="${Ua ? "on" : ""}" data-lz-view="teams">${e("Équipes")}</button></div>`
        }</div>
        <div class="ev-board" ${Ua ? "" : "hidden"}>${Ua ? bt(Me) : ""}</div>
        <div class="ev-hunt" ${Ua ? "hidden" : ""}>
        <div class="mp-chips"><span>${e("Niv. {lv}", { lv: `<b>${t.CONFIG.MAX_LEVEL}</b>` })}</span><span class="lz-rank">${e("Rang {r}", { r: ha[Aa] })}</span>${_a.types.map((Ut) => `<span class="ty" data-type="${Ut}" style="background:${t.TYPES[Ut].color}">${e(Ze[Ut] || Ut)}</span>`).join("")}<span class="lz-st">${e("Statuts réduits")}</span><button class="mp-chip-btn" data-lz-moves="${Me.id}" data-lz-elite="${Ka}">${e("Voir les capacités")} <i aria-hidden="true">›</i></button></div>
        ${ze(Me, Ka, It, Kt)}
        ${Kt ? ye(Me, Kt) : ""}</div>
        <div class="mp-act"><button class="mp-go" data-zone="${Me.id}" data-tier="${Kt}" ${sn && Kt ? "" : "disabled"}>${Kt ? (sn ? e("Affronter · {elite}", { elite: _t(Kt) }) : f(Dt().whenText(Me))) : `✓ ${_t(It)}`}</button></div>
      </div></div>`;
  }
  function Lt(Me) {
    if (Dt().state(Me) === "sealed") return Gt(Me);
    if (Dt().state(Me) === "done" && Dt().eliteShown(Me)) return qt(Me);
    const It = Dt().state(Me),
      Kt = Dt().progress(Me),
      Aa = Ea(Me),
      Ka = Dt().foe(Me),
      _a = B.DEX[Ka],
      Ha = It === "wait",
      Ua = { locked: It === "locked", done: It === "done" || Ha, current: !1 },
      sn = nt === "teams";
    return `<div class="mp-det" style="--c:${Aa}">${Te(t.SCENES.css({ ...Me, name: Me.near || Me.zone }), [`<img src="${Ua.done ? t.UI.artSrc(Ka, !1, !0) : H(Ka)}" alt="">`], Ua, e("Capturé"))}
      <div class="mp-in">
        <div class="ttl ev-ttl"><h3>${f(_a.name)}</h3>${t.UI.helpTip(e("Zone légendaire"), e("Remplis la condition pour ouvrir la zone, puis affronte le légendaire avec l'équipe de ton choix, ramenée à son niveau (vide : ton équipe d'aventure part). Une Poké Ball part à chaque K.O., avec peu de chances : essais illimités, une seule capture. « Équipes » montre celles qui l'ont eu."))}<div class="seg ev-seg">
          <button class="${sn ? "" : "on"}" data-lz-view="zone">${e("Zone")}</button><button class="${sn ? "on" : ""}" data-lz-view="teams">${e("Équipes")}</button></div></div>
        <div class="ev-board" ${sn ? "" : "hidden"}>${sn ? bt(Me) : ""}</div>
        <div class="ev-hunt" ${sn ? "hidden" : ""}>
        <div class="mp-chips"><span>${e("Niv. {lv}", { lv: `<b>${Me.level}</b>` })}</span><span>📍 ${f(e(Me.zone))}</span>${_a.types.map((Be) => `<span class="ty" data-type="${Be}" style="background:${t.TYPES[Be].color}">${e(Ze[Be] || Be)}</span>`).join("")}<span>${Me.forms ? e("Une forme par semaine") : e("Une seule capture")}</span>${Ua.done || Ua.locked ? "" : Y(Me, !0)}${Ua.done ? "" : `<button class="mp-chip-btn" data-lz-moves="${Me.id}">${e("Voir les capacités")} <i aria-hidden="true">›</i></button>`}</div>
        <div class="mp-pk"><h5>${e("Condition")} <small>${Kt.have >= Kt.need ? `✓ ${e("remplie")}` : jt(Kt)}</small></h5>${Kt.lines ? Kt.lines.map((Be) => `<p class="lz-cond">${Be.have >= Be.need ? "✓" : "✗"} ${t.UI.condLine(Be)}${Be.need > 1 ? ` <small>${jt(Be)}</small>` : ""}</p>`).join("") : `<p class="lz-cond${Kt.braille ? " rd-braille" : ""}">${t.UI.condLine(Kt)}</p>`}
          ${It === "closed" ? `<p class="lz-cond"><small>${f(Dt().whenText(Me))}</small></p>` : ""}
          ${Kt.need > 1 ? `<div class="mp-prog lz-prog"><i style="width:${Math.round((Kt.have / Kt.need) * 100)}%"></i></div>` : ""}</div>
        ${Ua.done ? "" : pa(Me) + ye(Me)}</div>
        ${Me.forms && !Ua.locked ? `<p class="lz-cond"><small>${Ha ? f(ut(Me)) : e(It === "done" ? "Toutes les formes sont capturées : l'île se ferme." : "Une forme de Deoxys par semaine, jusqu'à les avoir toutes.")} </small></p><div class="lz-forms">${Me.forms.map((Be) => `<span class="lz-form ${B.S.dex[Be] ? "on" : ""}" title="${f(B.DEX[Be].name)}">${t.UI.sprBox(Be, !1, 1, 48)}</span>`).join("")}</div>` : ""}
        <div class="mp-act"><button class="mp-go" data-zone="${Me.id}" ${It === "open" ? "" : "disabled"}>${It === "done" ? `✓ ${e("Capturé")}` : Ha ? e("Prochaine forme lundi") : It === "open" ? e("Affronter") : It === "closed" ? f(Dt().whenText(Me)) : e("Verrouillé")}</button></div>
      </div></div>`;
  }
  const zt = (Me, It) =>
      It.end
        ? null
        : It.at
          ? Dt().atChapter(It)
          : (se
              .chaptersOf(Me.key)
              .find((Kt) =>
                It.badge
                  ? !se.CHAPTERS[Kt].league && Je().chapterMeta(Kt).boss?.badge === It.badge
                  : se.CHAPTERS[Kt].steps.some(
                      (Aa) => Aa.kind === "route" && Aa.name === (It.near || It.zone),
                    ),
              ) ?? null),
    ca = (Me, It) =>
      Dt()
        .of(Me.key)
        .filter((Kt) => zt(Me, Kt) === It)
        .map(Q)
        .join(""),
    Ma = (Me) => {
      const It = Dt()
        .of(Me.key)
        .filter((Kt) => zt(Me, Kt) == null);
      return It.length ? `<h4>${e("Légendaires")}</h4>${It.map(Q).join("")}` : "";
    },
    Na = (Me) =>
      t.POKEDEX.filter((It) => It.id >= Me.dex[0] && It.id <= Me.dex[1] && (It.legendary || It.mythical)).map(
        (It) => It.id,
      );
  function Va(Me) {
    const It = Ge.state,
      Kt = Je().regionGyms(Me.key),
      Aa = Kt.filter((sn) => It.badges.includes(sn.badge)).length,
      Ka = t.POKEDEX.filter((sn) => sn.id >= Me.dex[0] && sn.id <= Me.dex[1]),
      _a = Ka.filter((sn) => B.inDex(sn.id)).length,
      Ha = B.completedRegions().includes(Me),
      Ua = Na(Me);
    return `<div class="map-sum">
      <span>${e("Badges")} <b>${Aa}/${Kt.length}</b></span>
      <span title="${e("Complète-le (fabuleux compris) pour doubler la chance shiny")}">Pokédex <b>${_a}/${Ka.length}</b><span class="bar"><i style="width:${(_a / Ka.length) * 100}%"></i></span>${Ha ? ' <span class="bonus">✨ shiny ×2</span>' : ""}</span>
      <span class="lgs">${e("Légendaires")} <b>${Ua.filter((sn) => B.S.dex[sn]).length}/${Ua.length}</b>
        ${Ua.map((sn) => `<img class="${B.S.dex[sn] ? "on" : B.S.seen?.[sn] ? "seen" : ""}" src="${ue(sn)}" title="${B.S.seen?.[sn] ? f(B.DEX[sn].name) : "???"}" alt="">`).join("")}</span>
    </div>`;
  }
  const Ba = { johto: "johto-bourg-geon", hoenn: "hoenn-bourg-en-vol", sinnoh: "sinnoh-bonaugure" };
  async function za(Me) {
    const It = B.currentRegion(),
      Kt = t.UI.fmt,
      Aa = (ea) =>
        `<div class="dc-head"><h2>${ea}</h2><div class="dc-sum"><button class="dc-x" aria-label="${e("Fermer")}">✕</button></div></div>`,
      Ka = (ea) =>
        `<div class="oc-tile${B.S.seen?.[ea] ? "" : " unknown"}" title="${B.S.seen?.[ea] ? f(B.DEX[ea].name) : "???"}">${t.UI.sprBox(ea, !1, 1.25, 56)}</div>`,
      _a = se.CHAPTERS[se.firstChapterOf(Me.key)],
      Ha = t.SCENES.catalog[Ba[Me.key]]
        ? `url(${t.SCENES.catalog[Ba[Me.key]].src})`
        : t.SCENES.css(_a?.steps[0], _a),
      Ua = (ea = []) =>
        `<div class="dp-banner" style="background-image:${Ha}">${ea.length ? `<div class="dp-starters">${ea.map((Ra) => `<figure>${t.UI.artImg(Ra, !1)}<figcaption>${f(B.DEX[Ra].name)}</figcaption></figure>`).join("")}</div>` : ""}</div>`,
      sn = _a?.steps.find((ea) => ea.kind === "gift" && /^starter/.test(ea.gift?.key))?.gift.choices || [],
      Be = t.POKEDEX.filter((ea) => ea.id >= Me.dex[0] && ea.id <= Me.dex[1]).length,
      Ut = t.Screens.pokedex.missingIn(It, Me.key),
      aa = f(e(Me.name)),
      ae = f(e(It.name)),
      ft = `${Aa(e("En route pour {region} !", { region: aa }))}${Ua(sn)}
      ${sn.length ? `<p class="dp-text">${e("Un nouveau Professeur te confiera l'un de ces trois Pokémon.")}</p>` : ""}
      <div class="dc-facts oc-facts">
        <div class="dc-fact">${e("Nouveaux Pokémon")}<b>${Be}</b></div>
        <div class="dc-fact">${e("Argent de départ")}<b class="pd">${Kt(t.CONFIG.START_MONEY)} ₽</b></div>
        <div class="dc-fact">${ae}<b>${e("Toujours ouvert")}</b></div>
      </div>
      <ul class="oc-note dp-rules">
        <li>${e("Nouvelle équipe, argent et sac à part")}</li>
        <li>${e("Retour à {from} quand tu veux, depuis la Progression", { from: ae })}</li>
        <li>${e("Bats la <b>Ligue de {region}</b> pour réunir tes deux PC", { region: aa })}</li>
      </ul>
      ${
        Ut.length
          ? `<div class="oc-sec"><h4>${e("Ton Pokédex te suit")}<em>${Ut.length === 1 ? e("<b>1</b> manquant vit aussi à {region}", { region: aa }) : e("<b>{n}</b> manquants vivent aussi à {region}", { n: Ut.length, region: aa })}</em></h4>
        <div class="oc-grid">${Ut.slice(0, Ut.length > 14 ? 13 : 14)
          .map(Ka)
          .join(
            "",
          )}${Ut.length > 14 ? `<div class="oc-tile dp-more">+${Ut.length - 13}</div>` : ""}</div></div>`
          : ""
      }`;
    (await t.UI.modal({
      className: "dexcard-modal oc-modal dp-modal",
      body: ft,
      onOpen: (ea, Ra) => {
        (ea.style.setProperty("--c", Me.color), (a(".dc-x", ea).onclick = () => Ra(!1)));
      },
      actions: [
        { label: e("Plus tard"), cls: "ghost", value: !1 },
        { label: e("Partir pour {region}", { region: e(Me.name) }), cls: "primary", value: !0 },
      ],
    })) &&
      (await on(It, Me), B.depart() && ((x = Me.key), ($ = null), Je().goChapter(se.firstChapterOf(Me.key))));
  }
  const vn = (Me) => {
    const It = se.chaptersOf(Me.key),
      Kt = It.filter((Aa) => se.CHAPTERS[Aa].league);
    return Kt.length ? It.filter((Aa) => Aa > Kt[Kt.length - 1]) : [];
  };
  function An(Me) {
    const It = vn(Me);
    return It.length
      ? B.regionDone(Me.key)
        ? `<h4>${e("La suite")}</h4>${It.map(ie).join("")}`
        : `<h4>${e("La suite")}</h4><div class="mp-row locked mp-teaser" style="--c:${Me.color}">
      <span class="n">${t.UI.lockIc}</span><span class="bd"><img src="assets/ui/town-map.png" alt=""></span><span class="t"><b>???</b>
      <small>${B.regionDone(Me.key) ? e("Bientôt…") : e("Bats la Ligue pour révéler la suite")}</small></span></div>`
      : "";
  }
  t.TravelFx = (Me, It) => on(Me, It);
  async function on(Me, It) {
    if (t.CHEAT?.noAnim || B.S.reducedAnim || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const Kt = document.body.appendChild(
        t.UI.h(`<div class="tv-fx">
      <div class="tv-win"><div class="tv-sea"></div><div class="tv-foam"></div>
        <div class="tv-ship"><img src="assets/ui/ss-anne.png" alt=""><span class="tv-hull"></span></div><div class="tv-black"></div></div>
      <div class="tv-cap"><b style="color:${Me.color}">${f(e(Me.name))}</b><span>⟶</span><b style="color:${It.color}">${f(e(It.name))}</b></div></div>`),
      ),
      Aa = a(".tv-win", Kt),
      Ka = a(".tv-sea", Kt),
      _a = a(".tv-ship", Kt),
      Ha = a(".tv-cap", Kt),
      Ua = a(".tv-foam", Kt),
      sn = a(".tv-black", Kt),
      Be = t.UI.skippable(Kt),
      Ut = 7200,
      aa = 700;
    for (const ht of [Aa, Ha]) ht.style.opacity = 0;
    _a.style.visibility = "hidden";
    const ae = (
      ht,
      ea,
      { dx: Ra = 0, dy: Ca = 0, size: gn = 4, dur: yn = 1200, grow: mn = 2.2, color: ln = "#fff" } = {},
    ) => {
      const In = Ua.appendChild(t.UI.h("<i></i>"));
      (Object.assign(In.style, {
        left: ht + "px",
        top: ea + "px",
        width: gn + "px",
        height: gn + "px",
        background: ln,
      }),
        In.animate(
          [
            { transform: "translate(-50%, -50%) scale(1)", opacity: 0.95 },
            { transform: `translate(calc(-50% + ${Ra}px), calc(-50% + ${Ca}px)) scale(${mn})`, opacity: 0 },
          ],
          { duration: yn, easing: "cubic-bezier(.2,.6,.4,1)", fill: "both" },
        ).finished.then(() => In.remove()));
    };
    let ft = !0;
    try {
      (await Kt.animate([{ opacity: 0 }, { opacity: 1 }], { duration: 240, fill: "forwards" }).finished,
        Aa.animate(
          [
            { transform: "scale(.92)", opacity: 0 },
            { transform: "none", opacity: 1 },
          ],
          { duration: 360, easing: "cubic-bezier(.2,1.3,.4,1)", fill: "both" },
        ),
        Ha.animate(
          [
            { transform: "translateY(8px)", opacity: 0 },
            { transform: "none", opacity: 1 },
          ],
          { duration: 360, delay: 260, fill: "both" },
        ),
        (Aa.style.opacity = ""),
        (Ha.style.opacity = ""),
        sn.animate([{ opacity: 1 }, { opacity: 0 }], { duration: aa, easing: "ease-out", fill: "forwards" }));
      const ht = Aa.clientWidth;
      Ka.animate([{ backgroundPositionX: "0px" }, { backgroundPositionX: `-${Math.round(ht * 0.45)}px` }], {
        duration: Ut,
        easing: "linear",
        fill: "both",
      });
      const ea = _a.animate([{ left: "-34%" }, { left: "104%" }], {
        duration: Ut,
        easing: "linear",
        fill: "both",
      });
      ((_a.style.visibility = ""),
        a("img", _a).animate(
          [
            { transform: "scaleX(-1) translateY(0) rotate(0)" },
            { transform: "scaleX(-1) translateY(-2px) rotate(-.8deg)" },
            { transform: "scaleX(-1) translateY(0) rotate(0)" },
            { transform: "scaleX(-1) translateY(1px) rotate(.6deg)" },
            { transform: "scaleX(-1) translateY(0) rotate(0)" },
          ],
          { duration: 2200, iterations: 1 / 0 },
        ),
        t.Sfx.whoosh(),
        (async () => {
          for (let Ra = 0; ft && !Be.skipped; Ra++) {
            const Ca = _a.getBoundingClientRect(),
              gn = Aa.getBoundingClientRect(),
              yn = Ca.left - gn.left,
              mn = Ca.width,
              ln = Ca.top - gn.top + Ca.height * 0.86;
            if (yn + mn > 0 && yn < gn.width) {
              const In = yn + mn * 0.95,
                xe = yn + mn * 0.1;
              for (let Et = 0; Et < 2; Et++)
                ae(In - Math.random() * 6, ln - 1 - Math.random() * 5, {
                  dx: 6 + Math.random() * 12,
                  dy: -4 - Math.random() * 10,
                  size: 2 + Math.random() * 2,
                  dur: 520,
                  grow: 1.2,
                });
              for (const Et of [-1, 1])
                for (let oa = 0; oa < 2; oa++)
                  ae(xe - Math.random() * 8, ln + Et * Math.random() * 2, {
                    dx: -70 - Math.random() * 50,
                    dy: Et * (6 + Math.random() * 10),
                    size: 2 + Math.random() * 2.5,
                    dur: 1500 + Math.random() * 600,
                    grow: 1.8,
                    color: Math.random() < 0.35 ? "#bfeeff" : "#fff",
                  });
              ae(yn + mn * (0.12 + Math.random() * 0.8), ln + Math.random() * 2, {
                dx: -16,
                dy: 1,
                size: 2 + Math.random() * 2,
                dur: 600,
                grow: 1.4,
              });
            }
            await new Promise((In) => Wa(In, 55));
          }
        })(),
        await new Promise((Ra) => Wa(Ra, Ut - aa)),
        Be.skipped ||
          (await sn.animate([{ opacity: 0 }, { opacity: 1 }], {
            duration: aa,
            easing: "ease-in",
            fill: "forwards",
          }).finished),
        await ea.finished);
    } finally {
      ((ft = !1),
        Be.end(),
        await Kt.animate([{ opacity: 1 }, { opacity: 0 }], {
          duration: 260,
          fill: "forwards",
        }).finished.catch(() => {}),
        Kt.remove());
    }
  }
  function qn(Me) {
    X = 0;
    const It = Ge.state,
      Kt = se.leagueOf(It.chapter),
      Aa = Me === "L" ? se.leagueOf(se.chaptersOf(x).find((_a) => se.CHAPTERS[_a].league)) : null,
      Ka = Me === "L" ? !!Kt && !!Aa && Kt[0] === Aa[0] : It.chapter === Me;
    Je().goChapter(Ka ? It.chapter : Aa ? Aa[0] : Me);
  }
  function xn(Me) {
    (Ge.toggleLoop(Me), B.save(), ts());
  }
  const fn = () => {
      const Me = se.REGIONS.find((It) => It.key === x);
      return Me && B.regionDone(Me.key) ? vn(Me) : [];
    },
    Yn = (Me, It) => [
      ...[...Me, ...fn()].filter((Kt) => !ve(Kt).locked),
      ...(It.length && !it(It).locked ? [Ge.loopKey(It[0])] : []),
    ];
  function Zn(Me, It) {
    const Kt = Yn(Me, It),
      Aa = Kt.length > 0 && Kt.every((Ka) => Ge.isLooping(Ka));
    return Kt.length < 2
      ? ""
      : `<span class="pg-loop-all ${Aa ? "on" : ""}" data-loop-all role="switch" tabindex="0" aria-checked="${Aa}"
      title="${e(Aa ? "Arrêter toutes les boucles de la région" : "Boucler tous les chapitres ouverts de la région")}">${De}${e("Tout")}</span>`;
  }
  function is(Me, It) {
    const Kt = Yn(Me, It),
      Aa = Kt.every((Ka) => Ge.isLooping(Ka));
    for (const Ka of Kt) Ge.isLooping(Ka) === Aa && Ge.toggleLoop(Ka);
    (B.save(), ts());
  }
  function ts() {
    const Me = Ge.state;
    (!x || !se.regionUnlocked(x, Me)) && (x = Je().regionKey(Me.chapter));
    const It = se.REGIONS.find((ae) => ae.key === x),
      Kt = se.chaptersOf(It.key),
      Aa = Kt.filter((ae) => se.CHAPTERS[ae].league),
      Ka = Aa.length ? Kt.filter((ae) => ae < Aa[0]) : Kt,
      _a = B.regionDone(It.key) ? vn(It) : [];
    ((String($)[0] === "Z" &&
      Dt()
        .of(It.key)
        .some((ae) => "Z" + ae.id === $ && Dt().state(ae) !== "locked")) ||
      ($ !== "L" &&
        !Ka.includes($) &&
        !_a.includes($) &&
        ($ =
          Ka.includes(Me.chapter) || _a.includes(Me.chapter)
            ? Me.chapter
            : Aa.length && Me.chapter >= Aa[0] && Kt.includes(Me.chapter)
              ? "L"
              : Ka[0])),
      $ === "L" && !Aa.length && ($ = Ka[0]));
    const Ha = se.REGIONS.filter((ae) => Tt(ae) && se.regionUnlocked(ae.key, Me)).length,
      Ua = a("#map-root");
    (t.UI.morph(
      Ua,
      `<div class="map-region" style="--c:var(--green)">
        <div class="map-head"><img src="assets/ui/town-map.png" alt=""><h2>${e("Aventure")}</h2>${t.UI.helpTip(e("Aventure"), e("Chaque arène est un chapitre : bats son champion pour gagner son badge et ouvrir la suite. Tes Pokémon ne dépassent pas le niveau du prochain champion, son badge lève ce plafond. Un chapitre fini se refait, et ↻ en enchaîne plusieurs en boucle pour t'entraîner."))}<div class="map-sum"><span>${e("Régions")} <b>${Ha}/${se.REGIONS.length}</b></span></div></div>
        <div class="map-body pg-3">
          <div class="pg-regions">${se.REGIONS.map(u).join("")}</div>
          <div class="pg-cols">
            <div class="mp-list"><h4 class="pg-h">${e("Arènes")}${Zn(Ka, Aa)}</h4>${Ka.map((ae) => ie(ae) + ca(It, ae)).join("")}${Aa.length ? `<h4>${e("Ligue")}</h4>${Vt(Aa)}` : ""}${Ma(It)}${An(It)}</div>
            ${X ? `<div class="pg-scrim${X === 2 ? " in" : ""}"></div>` : ""}<div class="pg-info${X ? " det-open" : ""}${X === 2 ? " det-in" : ""}"><h4>${e("Informations")}<button class="dc-x pg-det-x" aria-label="${e("Fermer")}">✕</button></h4>${$ === "L" ? gt(Aa) : String($)[0] === "Z" ? Lt(Dt().get(+$.slice(1))) : kt($)}</div>
          </div>
        </div>
      </div>`,
    ),
      b(".rg.open[data-rg]", Ua).forEach(
        (ae) =>
          (ae.onclick = () => {
            ((x = ae.dataset.rg), ($ = null), (X = 0), ts());
          }),
      ),
      b(".rg[data-depart]", Ua).forEach(
        (ae) => (ae.onclick = () => za(se.REGIONS.find((ft) => ft.key === ae.dataset.depart))),
      ),
      X === 2 && (X = 1),
      b(".mp-row[data-ch]", Ua).forEach(
        (ae) =>
          (ae.onclick = () => {
            const ft = ae.dataset.ch;
            (ft !== String($) && (nt = "zone"), ($ = ft === "L" || ft[0] === "Z" ? ft : +ft), (X = 2), ts());
          }),
      ));
    const sn = () => {
      ((X = 0),
        a(".pg-info", Ua).classList.add("det-out"),
        a(".pg-scrim", Ua)?.classList.add("out"),
        Wa(ts, 200));
    };
    a(".pg-det-x", Ua).onclick = sn;
    const Be = a(".pg-scrim", Ua);
    (Be && (Be.onclick = sn),
      b(".mp-go[data-go]:not([disabled])", Ua).forEach(
        (ae) => (ae.onclick = () => qn(ae.dataset.go === "L" ? "L" : +ae.dataset.go)),
      ),
      b("[data-lg-view]", Ua).forEach(
        (ae) =>
          (ae.onclick = () => {
            ae.dataset.lgView !== Xt && ((Xt = ae.dataset.lgView), ts());
          }),
      ),
      b(".mp-go[data-league]:not([disabled])", Ua).forEach(
        (ae) =>
          (ae.onclick = () => {
            ((X = 0), t.Screens.adventure.goLeague(ae.dataset.league, +ae.dataset.tier));
          }),
      ),
      b("[data-lg-pick]", Ua).forEach(
        (ae) =>
          (ae.onclick = async () => {
            const [ft, ht] = ae.dataset.lgPick.split(":");
            (await t.UI.leagueGemPick(ft, +ht), ts());
          }),
      ));
    const Ut = (ae) => [
      ...new Set(
        se
          .chaptersOf(ae)
          .filter((ft) => se.CHAPTERS[ft].league)
          .flatMap((ft) =>
            se.CHAPTERS[ft].steps
              .filter((ht) => ht.kind === "gym")
              .flatMap((ht) => (ht.team || []).map(([ea]) => ea)),
          ),
      ),
    ];
    (b("[data-lg-team]", Ua).forEach(
      (ae) =>
        (ae.onclick = () => {
          const ft = ae.dataset.lgTeam;
          t.EventTeam.open(ft, {
            key: "league:" + ft,
            species: !0,
            size: t.CONFIG.TEAM_SIZE,
            cap: t.CONFIG.MAX_LEVEL,
            foes: () => Ut(ft),
            already: e("Ton équipe est déjà la plus forte pour cette Ligue !"),
            head: () =>
              `<span class="evt-leg"><img src="${vt("master-ball")}" alt=""></span><h2>${e("Équipe · Ligue Élite")}</h2>`,
            allow: (ht) => !B.can(ht, "region", ft),
          });
        }),
    ),
      b(".mp-go[data-zone]:not([disabled])", Ua).forEach(
        (ae) =>
          (ae.onclick = () => {
            ((X = 0), t.Screens.adventure.goZone(+ae.dataset.zone, +ae.dataset.tier || 0));
          }),
      ),
      b("[data-lz-view]", Ua).forEach(
        (ae) =>
          (ae.onclick = () => {
            ae.dataset.lzView !== nt &&
              (nt === "zone" && (Ot = ae.closest(".mp-det").offsetHeight), (nt = ae.dataset.lzView), ts());
          }),
      ));
    const aa = String($)[0] === "Z" && a(".mp-det", Ua);
    (aa && nt === "teams" && Ot && Object.assign(aa.style, { flex: `0 0 ${Ot}px`, minHeight: "0" }),
      t.UI.lbBind(Ua, z),
      b("[data-lz-team]", Ua).forEach(
        (ae) =>
          (ae.onclick = () => {
            const ft = Dt().get(+ae.dataset.lzTeam),
              ht = +ae.dataset.lzTier || 0,
              ea = ht ? { foe: Dt().eliteFoe(ft), level: t.CONFIG.MAX_LEVEL } : null;
            t.EventTeam.open(ea ? ea.foe : ft.id, {
              key: "zone:" + ft.id,
              size: t.CONFIG.TEAM_SIZE,
              label: ea ? _t(ht) : e("Équipe"),
              cap: ea ? ea.level : ft.level,
              zone: ft.id,
              ...(ea ? { elite: ht } : {}),
              moves: () => t.UI.zoneMoves(ft, ea || {}),
            });
          }),
      ),
      b("[data-lz-moves]", Ua).forEach(
        (ae) =>
          (ae.onclick = () =>
            t.UI.zoneMoves(
              Dt().get(+ae.dataset.lzMoves),
              ae.dataset.lzElite ? { foe: +ae.dataset.lzElite, level: t.CONFIG.MAX_LEVEL } : {},
            )),
      ),
      b(".mp-grid [data-dex]", Ua).forEach(
        (ae) =>
          (ae.onclick = () =>
            t.UI.showDexCard(+ae.dataset.dex, { full: !0, seen: !!B.S.seen?.[+ae.dataset.dex] })),
      ),
      b("[data-lz-more]", Ua).forEach(
        (ae) =>
          (ae.onclick = ae.onkeydown =
            (ft) => {
              if (ft.type === "keydown" && ft.key !== "Enter" && ft.key !== " ") return;
              ft.preventDefault();
              const ht = ae.parentElement;
              (ht.querySelectorAll("[hidden]").forEach((ea) => {
                ea.hidden = !1;
              }),
                ht.querySelectorAll(".lz-ph").forEach((ea) => ea.classList.add("lz-on")),
                ht.querySelectorAll("[data-lz-more]").forEach((ea) => {
                  ea.hidden = !0;
                }));
            }),
      ),
      b("[data-loop-all]", Ua).forEach((ae) => {
        ((ae.onclick = () => is(Ka, Aa)),
          (ae.onkeydown = (ft) => {
            (ft.key === " " || ft.key === "Enter") && (ft.preventDefault(), is(Ka, Aa));
          }));
      }),
      b(".pg-loop", Ua).forEach((ae) => {
        const ft = (ht) => {
          (ht.stopPropagation(), xn(ae.dataset.loop[0] === "L" ? ae.dataset.loop : +ae.dataset.loop));
        };
        ((ae.onclick = ft),
          (ae.onkeydown = (ht) => {
            (ht.key === " " || ht.key === "Enter") && (ht.preventDefault(), ft(ht));
          }));
      }),
      t.EventUI.bind(Ua),
      On(Ua));
  }
  let Jn = null;
  function On(Me) {
    const It = Me.querySelector(".map-body.pg-3"),
      Kt = () => It.classList.toggle("pg-narrow", It.clientWidth < 700);
    (Kt(), Jn?.disconnect(), (Jn = new ResizeObserver(Kt)), Jn.observe(It));
  }
  ((t.Screens.event = {
    init() {
      t.Events.on(() => {
        a("#screen-event.active") && t.Screens.event.render();
      });
    },
    render() {
      const Me = a("#event-root");
      (t.UI.morph(Me, lt()), t.EventUI.bind(Me), t.EventTeam.bind(Me));
      for (const Kt of Me.querySelectorAll("[data-ev-view]"))
        Kt.onclick = () => {
          Kt.dataset.evView !== He &&
            (He === "hunt" && (m = Kt.closest(".mp-det").offsetHeight),
            (He = Kt.dataset.evView),
            t.Screens.event.render());
        };
      const It = Me.querySelector(".mp-det");
      It && He === "board" && m && Object.assign(It.style, { flex: `0 0 ${m}px`, minHeight: "0" });
      for (const Kt of Me.querySelectorAll("[data-ev-sel]"))
        Kt.onclick = () => {
          const Aa = +Kt.dataset.evSel;
          ((te = te === Aa ? null : Aa), t.Screens.event.render());
        };
      for (const Kt of Me.querySelectorAll("[data-ev-act]"))
        Kt.onclick = () => {
          ((R = +Kt.dataset.evAct), (te = null), t.Screens.event.render());
        };
      for (const Kt of Me.querySelectorAll("[data-ev-priv]"))
        Kt.onclick = async () => {
          const Aa = +Kt.dataset.evPriv,
            Ka = t.CONFIG.EVENT.PRIVATE;
          if (
            !(await t.UI.confirm(
              e(
                "Dépenser {n} traces pour chasser {name} seul pendant {min} min ? Personne d'autre ne pourra le capturer, mais une capture ratée ne laisse pas de trace.",
                { n: Ka.TRACES, name: B.DEX[Aa].name, min: Ka.OPEN_MIN },
              ),
              e("Lancer"),
            ))
          )
            return;
          const _a = U().openPrivate(Aa);
          _a && ((te = null), (R = _a.seq), t.Screens.event.render());
        };
    },
  }),
    (t.Screens.map = {
      departure: za,
      init() {
        t.Events.on(() => {
          a("#screen-map.active") && ts();
        });
      },
      render: ts,
      open(Me, It = null) {
        ((x = Me), ($ = It), (X = 0), t.App.show("map"));
      },
    }));
})();
