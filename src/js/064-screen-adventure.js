/**
 * screen adventure
 *
 * Public API on the game namespace `t`: t.Screens.adventure
 *
 * Recovered from the shipped bundle — original chunk #63 at byte 1542603 (145854 bytes, sha256:037e4c1d149d6e0b).
 * This file is one original source file; the build concatenates them in filename order.
 */
(function () {
  const {
      $: a,
      $$: b,
      h: f,
      sleep: ue,
      esc: H,
      fmt: vt,
      monSrc: B,
      sprBox: se,
      fitScale: Ge,
      itemSrc: Je,
      itemName: Ze,
      typeBadge: x,
      idle: $,
      toast: X,
      modal: Tt,
    } = t.UI,
    le = t.Game,
    P = t.CONFIG,
    u = t.STORY,
    ve = t.Adventure,
    it = () => ve.state?.tower?.kind === "candy",
    De = () => (it() ? t.CandyRun : t.Tower),
    je = ["", "I", "II", "III", "IV", "V"],
    pt = (r) =>
      Object.entries(r || {})
        .filter(([, G]) => typeof G == "number" && G > 0)
        .map(([G, be]) => `+${be} ${H(t.UI.itemName(G))}`)
        .join(" · "),
    re = () => t.CaptureFX;
  let We = [],
    oe = 1,
    $e = [],
    Z = 1,
    A = null,
    J = "",
    de = !1,
    _e = !1,
    Re = 0,
    dt = !1,
    qe = !1,
    ce = !1,
    tt = !1,
    mt = !1,
    Te = !1;
  const At = () => !!a("#screen-adventure.active") && !document.hidden,
    yt = () => !!(t.CHEAT?.noAnim || le.S.reducedAnim),
    he = () => !!le.S.noNewPopup;
  t.Music.setGate(At);
  const fe = (r) =>
    r.kind === "trainer"
      ? "trainer"
      : r.kind === "gym"
        ? r.gym?.badge && !r.gym.champion
          ? "gym"
          : "boss"
        : r.kind === "static" && (le.DEX[r.enemy.id].legendary || le.DEX[r.enemy.id].mythical)
          ? "boss"
          : null;
  function Oe(r) {
    if (r.type === "battleStart") {
      const G = fe(r);
      G ? t.Music.play(G) : t.Music.stop();
    } else
      (["victory", "defeat", "fled", "chapterEnd"].includes(r.type) || (r.type === "capture" && r.success)) &&
        t.Music.stop();
  }
  const Ee = () => ve.speed(),
    et = (r) => ue(r / Ee()),
    _ = {
      wild: "assets/ui/tallgrass-icon.png",
      honey: "assets/items/honey.png",
      heal: "assets/ui/pokecenter.png",
      item: "assets/ui/calcium.png",
      berry: "assets/ui/berry-leppa.png",
      gift: "assets/items/premier-ball.png",
      static: "assets/ui/shiny-charm.png",
    },
    we = {
      wild: "Pokémon sauvage",
      trainer: "Dresseur",
      heal: "Centre Pokémon",
      item: "Objet",
      berry: "Arbre à baies",
      gift: "Cadeau",
      static: "Rencontre spéciale",
      gym: "Arène",
      riddle: "Inscription",
    },
    ie = t.GAME_INTRO || "intros/legend-intros.html";
  let U = !1;
  const Ne = (r) => {
    U ||
      !(r?.zone || r?.nodes?.some((G) => G.roamer)) ||
      le.S.reducedAnim ||
      ((U = !0),
      document.head.appendChild(
        Object.assign(document.createElement("link"), { rel: "prefetch", href: ie }),
      ));
  };
  function T() {
    qa();
    const r = ve.state;
    Ne(r);
    const G = a("#timeline");
    let be = "";
    const ot = Xt && !["wild", "trainer", "gym"].includes(Xt.type) ? r.nodes.indexOf(Xt) : -1;
    let $t = ot >= 0 && ot < r.node ? ot : r.node,
      Wt = r.nodes;
    const d = !r.zone && !r.event && !r.tower && !r.league && u.leagueOf(r.chapter);
    if (d) {
      const j = r.leaguePlan || {},
        me = (s) => {
          const l = u.CHAPTERS[s].steps,
            c = l.find((v) => v.kind === "heal"),
            p = l.find((v) => v.kind === "route"),
            y = l.find((v) => v.kind === "gym");
          return [
            { type: "heal", name: c.name },
            ...(j[s] || []).map((v) => ({ type: "trainer", name: p.name, sprite: v })),
            { type: "gym", name: y.name, gym: y },
          ];
        },
        o = d.filter((s) => s < r.chapter).flatMap(me),
        n = d.filter((s) => s > r.chapter).flatMap(me);
      ((Wt = [...o, ...r.nodes, ...n]), ($t += o.length));
    }
    const i = r.tower && it() && De().run();
    if (i) {
      const j = i.floor,
        me = Math.max(i.from, j - 3);
      ((Wt = Array.from({ length: j + 8 - me + 1 }, (o, n) =>
        me + n === j ? r.nodes[0] : De().floorNode(me + n),
      )),
        ($t = j - me));
    }
    Wt.forEach((j, me) => {
      const o = me < $t ? "done" : me === $t ? "current" : "",
        n =
          j.type === "wild" && !j.special
            ? "wild"
            : j.type === "trainer"
              ? "fight"
              : j.legend || j.raid
                ? "ev"
                : ["heal", "gym", "candy"].includes(j.type)
                  ? j.type
                  : "misc",
        s = n === "wild" && t.Adventure.honeyAt(j),
        l = j.type === "gym" && u.badgeHtml(j.gym.badge, 3),
        c =
          j.type === "gym"
            ? l ||
              (j.gym.boss
                ? `<img src="${B(j.gym.boss)}" alt="">`
                : `<span class="tl-face"><img src="assets/trainers/${j.gym.sprite}.png" alt=""></span>`)
            : j.legend || j.raid
              ? `${t.EventUI.fxLayer()}<img class="tl-legend" src="${t.UI.animSrc(j.id, j.raid)}" alt="">`
              : n === "heal"
                ? `<img src="${_.heal}" alt="">`
                : n === "candy"
                  ? `<img src="${Je(De().isSB(j.tower) ? "rare-candy" : De().candiesOf(j.tower)[0])}" alt="">`
                  : n === "wild"
                    ? `<img class="tl-grass${s ? " honey" : ""}" src="${_[s ? "honey" : "wild"]}" alt="">`
                    : n === "misc" && o !== "done"
                      ? "?"
                      : "",
        p =
          j.legend || j.raid
            ? ` tl-ev fx-${t.EventUI.fx()}" style="--ec:${Is[j.raid ? le.DEX[j.id].types[0] : t.Events.legendOf(j.id).types[0]].color}`
            : "";
      me && (be += `<i class="tl-link${me <= $t ? " on" : ""}"></i>`);
      const y =
        j.tower && i
          ? e("Étage {n}", { n: j.tower })
          : u.placeName(j) +
            " · " +
            e(we[j.type]) +
            (j.gym ? " — " + e(j.gym.leader) : "") +
            (s ? " · " + e("Arbre à Miel") : "");
      be += `<span class="tl-node ${n} ${o}${p}" title="${H(y)}">${c}</span>`;
    });
    const w =
      r.chapter +
      "|" +
      (r.event?.seq ??
        (r.zone ? "Z" + r.zone.id : r.tower ? "T" : r.league ? "E" + r.league.reg + r.league.tier : "")) +
      "|" +
      Wt.map((j) => j.type).join();
    if (G.dataset.key === w) {
      const j = document.createElement("template");
      ((j.innerHTML = be),
        [...j.content.children].forEach((me, o) => {
          const n = G.children[o];
          (n.className !== me.className && (n.className = me.className),
            n.getAttribute("style") !== me.getAttribute("style") &&
              n.setAttribute("style", me.getAttribute("style") || ""),
            n.innerHTML !== me.innerHTML && (n.innerHTML = me.innerHTML));
        }));
    } else ((G.innerHTML = be + '<b class="tl-cursor"></b>'), (G.dataset.key = w));
    L(G);
    const S = Wt[Math.min($t, Wt.length - 1)];
    ((a("#tl-zone").textContent = S ? u.placeName(S) : ""),
      (a("#tl-count").textContent = `${Math.min($t + 1, Wt.length)}/${Wt.length}`),
      r.tower && De().run()
        ? ((a("#tl-zone").textContent = it()
            ? e("Fabrique de Bonbons · étage {n}", { n: De().run().floor })
            : e("Tour de Combat · étage {n}", { n: De().run().floor })),
          (a("#tl-count").textContent = `${De().left()}/${De().fit()}`),
          (a("#tl-count").title = e("Pokémon encore debout")))
        : a("#tl-count").removeAttribute("title"),
      R("smooth"),
      He && z());
  }
  function L(r) {
    const G = a(".tl-cursor", r),
      be = a(".tl-node.current", r);
    if (!G || ((G.hidden = !be), !be)) return;
    const ot = !G.dataset.x;
    (ot && (G.style.transition = "none"),
      G.classList.toggle("frame", /\b(heal|gym|ev|wild|candy)\b/.test(be.className)));
    const $t = be.offsetLeft + be.offsetWidth / 2;
    ((G.style.left = $t + "px"), (G.dataset.x = $t), ot && (G.offsetWidth, (G.style.transition = "")));
  }
  function R(r = "auto") {
    const G = a("#timeline"),
      be = a(".tl-node.current", G);
    if (!be || !G.clientWidth) return;
    const ot = be.getBoundingClientRect().left - G.getBoundingClientRect().left + G.scrollLeft,
      $t = Math.max(0, Math.min(G.scrollWidth - G.clientWidth, ot + be.offsetWidth / 2 - G.clientWidth / 2));
    if ((cancelAnimationFrame(te), r !== "smooth")) {
      G.scrollLeft = $t;
      return;
    }
    const Wt = G.scrollLeft,
      d = zn.now(),
      i = 600,
      w = (S) => {
        const j = Math.min(1, (S - d) / i);
        ((G.scrollLeft = Wt + ($t - Wt) * (1 - (1 - j) ** 3)), j < 1 && (te = es(w)));
      };
    te = es(w);
  }
  let te = 0;
  function K() {
    const r = ve.state,
      G = u.CHAPTERS[r.chapter],
      be = kt(r.chapter),
      ot = u.regionOf(r.chapter),
      $t = a("#chapter-btn");
    if (r.event?.raid) {
      ($t.style.setProperty("--c", Is[le.DEX[r.event.id].types[0]].color),
        ($t.innerHTML = `<span class="ac-bdg"><img class="ac-legend" src="${t.UI.artSrc(r.event.id, !0)}" alt=""></span>
        <span class="ac-t"><small>${e("Raid chromatique · {reg}", { reg: H(e(t.Raids.regionOf(r.event.reg).name)) })}</small><b>${H(le.DEX[r.event.id].name)}</b></span>
        <span class="ac-lvl">${e("Niv. {n}", { n: r.event.level })}</span><span class="ac-car">▾</span>`),
        b("#speed-btns button").forEach((Wt) => Wt.classList.toggle("on", +Wt.dataset.speed === r.speed)),
        z($t.innerHTML.replace(/<span class="ac-lvl">.*$/s, ""), e("Niv. {n}", { n: r.event.level })));
      return;
    }
    if (r.event) {
      const Wt = t.Events.legendOf(r.event.id);
      ($t.style.setProperty("--c", Is[Wt.types[0]].color),
        ($t.innerHTML = `<span class="ac-bdg"><img class="ac-legend" src="${t.UI.artSrc(r.event.id)}" alt=""></span>
        <span class="ac-t"><small>${e("Event légendaire · {zone}", { zone: H(e(t.Events.zoneOf(t.Events.get(r.event.seq) || r.event).zone)) })}</small><b>${H(le.DEX[r.event.id].name)}</b></span>
        <span class="ac-lvl">${e("Niv. {n}", { n: r.event.level })}</span><span class="ac-car">▾</span>`),
        b("#speed-btns button").forEach((d) => d.classList.toggle("on", +d.dataset.speed === r.speed)),
        z($t.innerHTML.replace(/<span class="ac-lvl">.*$/s, ""), e("Niv. {n}", { n: r.event.level })));
      return;
    }
    if (r.tower) {
      const Wt = De().run(),
        d = Wt ? De().floorOf(Wt.floor) : null,
        i = it();
      ($t.style.setProperty("--c", i ? "var(--candy)" : "var(--tower)"),
        ($t.innerHTML = `<span class="ac-bdg"><img src="${i ? t.UI.itemSrc("rare-candy") : "assets/ui/vs-recorder.png"}" alt=""></span>
        <span class="ac-t"><small>${e(i ? "Fabrique de Bonbons" : "Tour de Combat")}</small><b>${e("Étage {n}", { n: Wt?.floor ?? 1 })}</b></span>
        <span class="ac-lvl">${e("Niv. {n}", { n: d?.level ?? "—" })}</span><span class="ac-car">▾</span>`),
        b("#speed-btns button").forEach((w) => w.classList.toggle("on", +w.dataset.speed === r.speed)),
        z($t.innerHTML.replace(/<span class="ac-lvl">.*$/s, ""), e("Niv. {n}", { n: d?.level ?? "—" })));
      return;
    }
    if (r.zone?.riddle) {
      const Wt = t.LegendZones.riddle(r.zone.riddle);
      ($t.style.setProperty("--c", "var(--muted)"),
        ($t.innerHTML = `<span class="ac-bdg"><span class="ac-braille">${H([...t.LegendZones.inscription(Wt)][0])}</span></span>
        <span class="ac-t"><small>${e("Zone légendaire")}</small><b>${H(e(Wt.place))}</b></span>
        <span class="ac-lvl"></span><span class="ac-car">▾</span>`),
        b("#speed-btns button").forEach((d) => d.classList.toggle("on", +d.dataset.speed === r.speed)),
        z($t.innerHTML.replace(/<span class="ac-lvl">.*$/s, ""), ""));
      return;
    }
    if (r.league) {
      const Wt = u.REGIONS.find((i) => i.key === r.league.reg),
        d = e("Élite {r}", { r: je[r.league.tier] });
      ($t.style.setProperty("--c", "var(--gold-soft)"),
        ($t.innerHTML = `<span class="ac-bdg"><img src="${Je("master-ball")}" alt=""></span>
        <span class="ac-t"><small>${e("Ligue Élite · {region}", { region: H(e(Wt?.name || r.league.reg)) })}</small><b>${d}</b></span>
        <span class="ac-lvl">${e("Niv. {n}", { n: P.MAX_LEVEL })}</span><span class="ac-car">▾</span>`),
        b("#speed-btns button").forEach((i) => i.classList.toggle("on", +i.dataset.speed === r.speed)),
        z($t.innerHTML.replace(/<span class="ac-lvl">.*$/s, ""), e("Niv. {n}", { n: P.MAX_LEVEL })));
      return;
    }
    if (r.zone) {
      const Wt = t.LegendZones.get(r.zone.id),
        d = r.zone.foe ?? Wt.id;
      ($t.style.setProperty("--c", Is[le.DEX[d].types[0]].color),
        ($t.innerHTML = `<span class="ac-bdg"><img class="ac-legend" src="${t.UI.artSrc(d)}" alt=""></span>
        <span class="ac-t"><small>${Wt.wb ? e("World boss") : e("Zone légendaire · {zone}", { zone: H(e(Wt.zone)) })}</small><b>${H(le.DEX[d].name)}</b></span>
        <span class="ac-lvl">${e("Niv. {n}", { n: Wt.level })}</span><span class="ac-car">▾</span>`),
        b("#speed-btns button").forEach((i) => i.classList.toggle("on", +i.dataset.speed === r.speed)),
        z($t.innerHTML.replace(/<span class="ac-lvl">.*$/s, ""), e("Niv. {n}", { n: Wt.level })));
      return;
    }
    ($t.style.setProperty("--c", be.color),
      ($t.innerHTML = `<span class="ac-bdg">${Vt(be, 2)}</span>
      <span class="ac-t"><small>${e("{reg} · Chapitre {n}", { reg: H(e(ot.name)), n: V(r.chapter) })}</small><b>${H(e(G.name))}</b></span>
      <span class="ac-lvl">${e("Niv. {n}", { n: be.lv })}</span><span class="ac-car">▾</span>`),
      b("#speed-btns button").forEach((Wt) => Wt.classList.toggle("on", +Wt.dataset.speed === r.speed)),
      z(
        `<span class="ac-bdg">${Vt(be, 2)}</span>
      <span class="ac-t"><small>${e("{reg} · Chapitre {n}", { reg: H(e(ot.name)), n: V(r.chapter) })}</small><b>${H(e(G.name))}</b></span>`,
        e("Niv. {n}", { n: be.lv }),
      ));
  }
  let He = "",
    m = "";
  function z(r = He, G = m) {
    ((He = r), (m = G));
    const be = a("#side-chapter"),
      ot = ve.state;
    if (!be) return;
    be.style.setProperty("--c", a("#chapter-btn").style.getPropertyValue("--c"));
    const $t = ot.nodes.length,
      Wt = Math.min(ot.node, $t - 1),
      d = Math.round((Math.min(ot.node, $t) / $t) * 100);
    if (ot.tower && De().run()) {
      const i = De().left(),
        w = De().fit();
      be.innerHTML = `<span class="side-chap-top">${r}<span class="ac-car">▾</span></span>
        <span class="side-gauge"><i style="width:${Math.round((i / Math.max(1, w)) * 100)}%"></i></span>
        <span class="side-chap-foot"><span>${e("{n}/{all} Pokémon debout", { n: i, all: w })}</span><span>${G}</span></span>`;
      return;
    }
    be.innerHTML = `<span class="side-chap-top">${r}<span class="ac-car">▾</span></span>
      <span class="side-gauge"><i style="width:${d}%"></i></span>
      <span class="side-chap-foot"><span>${e("Étape {at} / {n}", { at: Wt + 1, n: $t })} · <b>${d} %</b></span><span>${G}</span></span>`;
  }
  const pe = (r) => u.CHAPTERS[r].reg || "kanto",
    V = (r) => u.chaptersOf(pe(r)).indexOf(r) + 1,
    lt = (r) =>
      u
        .chaptersOf(r)
        .flatMap((G) => u.CHAPTERS[G].steps.filter((be) => be.kind === "gym" && be.badge && !be.champion));
  function kt(r) {
    const G = u.CHAPTERS[r],
      be = G.steps.filter((S) => S.kind === "gym"),
      ot = be[be.length - 1],
      $t = G.steps.filter((S) => S.kind === "static"),
      Wt = be.length
        ? be.flatMap((S) => u.gymTeam(r, S).map((j) => j[1]))
        : $t.map((S) => u.staticLevel(r, S)),
      d = Math.min(...Wt),
      i = G.capMargin && u.aceOf(r) != null ? Math.max(...Wt, u.capOf(r)) : Math.max(...Wt),
      w =
        ot ||
        $t.at(-1) ||
        G.steps.find((S) => S.bg === "cave" && S.kind !== "heal") ||
        G.steps[G.steps.length - 1];
    return {
      boss: ot,
      gyms: be,
      icon: G.icon,
      lv: d === i ? `${i}` : `${d}–${i}`,
      color: ot?.color || G.color || "#6b5bd6",
      bg: t.SCENES.css(w, r),
      faces: be.length
        ? be.map((S) =>
            S.boss
              ? `<img class="ac-mon" src="${B(S.boss)}" alt="">`
              : `<img src="assets/trainers/${S.sprite}.png" alt="">`,
          )
        : $t.slice(-1).map((S) => `<img class="ac-mon" src="${B(S.id, S.shiny)}" alt="">`),
    };
  }
  const ra = (r, G) =>
      !r || (r.badge && u.badgeSrc(r.badge)) || u.CHAPTERS.find((be) => be.steps.includes(r))?.league
        ? ""
        : r.boss
          ? `<img class="ac-ic" style="--z:${G}" src="${B(r.boss)}" alt="">`
          : `<span class="ac-face" style="--z:${G}"><img src="assets/trainers/${r.sprite}.png" alt=""></span>`,
    Vt = (r, G) =>
      u.badgeHtml(r.boss?.badge, G) ||
      (r.icon
        ? `<img class="ac-ic" style="--z:${G}" src="${t.UI.artSrc(r.icon.id, r.icon.shiny)}" alt="">`
        : "") ||
      ra(r.boss, G) ||
      `<span class="ac-star">${r.boss ? "★" : "?"}</span>`;
  let Xt = null;
  const Ht = (r) => t.SCENES.css(r, r?.ch),
    ct = { morning: "#e4edff", day: null, night: "#5866a8" },
    wt = (r) => r?.aura?.light || (t.DAYTIME.indoorNode(r) ? null : ct[t.DAYTIME.phase().key]),
    ge = new Set();
  function Fe(r) {
    if ((r && (Xt = r), !Xt)) {
      const d = ve.state;
      Xt = d.nodes[Math.min(d.node, d.nodes.length - 1)];
    }
    const G = a("#arena"),
      be = wt(Xt),
      ot = Ht(Xt),
      $t = () => {
        ((G.style.backgroundImage = be ? `linear-gradient(${be}, ${be}), ${ot}` : ot),
          (G.style.backgroundBlendMode = be ? "multiply, normal" : ""));
      },
      Wt = [...ot.matchAll(/url\(["']?([^"')]+)/g)].map((d) => d[1]).filter((d) => !ge.has(d));
    if (!Wt.length) $t();
    else {
      const d = Xt;
      Promise.all(
        Wt.map(
          (i) =>
            new Promise((w) => {
              const S = new Image();
              ((S.onload = S.onerror =
                () => {
                  (ge.add(i), w());
                }),
                (S.src = i));
            }),
        ),
      ).then(() => {
        Xt === d && $t();
      });
    }
    (ha(), Jn());
  }
  const gt = () =>
    ve.state?.event?.raid ? e("tout le raid") : ve.state?.zone ? e("toute la zone") : e("tout le combat");
  function Dt(r) {
    const G = Xt.aura?.weather || t.WEATHER.current(Xt),
      be = (ot, $t) => {
        $t ? r.dataset[ot] !== $t && (r.dataset[ot] = $t) : ot in r.dataset && delete r.dataset[ot];
      };
    (be("weather", G),
      be("sky", Xt.sky || t.SCENES.resolve(Xt)?.sky),
      be("noveil", t.SCENES.resolve(Xt)?.veil === !1 ? "1" : null));
  }
  function ha() {
    const r = a("#scene-bar");
    if (!Xt || (Dt(a("#arena")), !r)) return;
    const G = t.UI.skyPill(Xt, { fixed: Xt?.weather ? gt() : null });
    (r.innerHTML !== G && (r.innerHTML = G), Y());
  }
  Ss(() => document.hidden || ha(), 15e3);
  const _t = (r) => (Co.lang === "en" ? String(r) : String(r).replace(".", ",")),
    Ea = (r = 1) => ((P.BUFF_MIN * r) % 60 ? `${P.BUFF_MIN * r} min` : `${(P.BUFF_MIN * r) / 60} h`),
    ut = (r) => {
      const G = Math.max(0, Math.ceil(r / 1e3)),
        be = (ot) => String(ot).padStart(2, "0");
      return G >= 3600
        ? `${Math.floor(G / 3600)}:${be(Math.floor(G / 60) % 60)}:${be(G % 60)}`
        : `${be(Math.floor(G / 60))}:${be(G % 60)}`;
    };
  function jt(r) {
    const G = P.BUFF_BERRIES[r],
      be = { m: _t(G.mult), d: Ea() };
    return {
      capture: e("Chances de capture <strong>×{m}</strong> pendant {d}.", be),
      rare: e("Pokémon rares <strong>×{m}</strong> pendant {d}.", be),
      dex: e("Pokémon jamais capturés dans cette région <strong>×{m}</strong> pendant {d}.", be),
      xp: e("XP de combat <strong>×{m}</strong> pendant {d}.", be),
      money: e("Argent gagné <strong>×{m}</strong> pendant {d}.", be),
      shiny: e("Chances de chromatique <strong>×{m}</strong> pendant {d}.", be),
    }[G.family];
  }
  function xt(r) {
    const G = P.BUFF_BERRIES[r],
      be = { m: _t(G.mult) };
    return {
      capture: e("Capture ×{m}", be),
      rare: e("Rares ×{m}", be),
      dex: e("Pokédex ×{m}", be),
      xp: e("XP ×{m}", be),
      money: e("Argent ×{m}", be),
      shiny: e("Chroma ×{m}", be),
    }[G.family];
  }
  let D = "",
    Q = null;
  function Y() {
    const r = a("#buff-stack");
    if (!r) return;
    const G = le.activeBuffs(),
      be = G.map((ot) => ot.key + (ot.left < 5 * 6e4 ? "!" : "")).join(",");
    be !== D &&
      ((D = be),
      (r.innerHTML = G.map(
        (ot) =>
          `<span class="buff-pill${ot.left < 5 * 6e4 ? " ending" : ""}" data-k="${ot.key}" aria-label="${H(Ze(ot.key))}"><img src="${Je(ot.key)}" alt=""><b></b></span>`,
      ).join("")),
      r.contains(nt) || rt());
    for (const ot of G) {
      const $t = a(`.buff-pill[data-k="${ot.key}"] b`, r);
      $t && ($t.textContent = ut(ot.left));
      const Wt = a(`#bag-panel .bag-cell[data-k="${ot.key}"] .bag-timer`);
      Wt && (Wt.textContent = ut(ot.left));
    }
    (Ft(), be !== Q && ((Q = be), es(xe)));
  }
  const ye = 450;
  let nt = null,
    Ot = !1;
  function ee(r) {
    const G = a("#buff-tip"),
      be = a("#arena");
    if (!r) return rt();
    ((nt = r), (G.innerHTML = `<b>${H(Ze(r.dataset.k))}</b><p>${jt(r.dataset.k)}</p>`), (G.hidden = !1));
    const ot = be.getBoundingClientRect(),
      $t = r.getBoundingClientRect();
    ((G.style.top = $t.top - ot.top + "px"), (G.style.right = ot.right - $t.left + 6 + "px"));
  }
  function rt() {
    const r = a("#buff-tip");
    (r && (r.hidden = !0), (nt = null), (Ot = !1));
  }
  function Qe() {
    const r = a("#buff-stack");
    let G = null;
    ((r.onpointerover = (be) => {
      be.pointerType === "mouse" && !Ot && ee(be.target.closest(".buff-pill"));
    }),
      (r.onpointerleave = (be) => {
        be.pointerType === "mouse" && !Ot && rt();
      }),
      (r.onpointerdown = (be) => {
        const ot = be.target.closest(".buff-pill");
        (clearTimeout(G),
          ot &&
            be.pointerType !== "mouse" &&
            (G = Wa(() => {
              (ee(ot), (Ot = !0));
            }, ye)));
      }),
      (r.onpointerup = r.onpointercancel = () => clearTimeout(G)),
      (r.oncontextmenu = (be) => {
        be.target.closest(".buff-pill") && be.preventDefault();
      }),
      document.addEventListener("pointerdown", (be) => {
        Ot && !be.target.closest("#buff-stack") && rt();
      }));
  }
  function Ft() {
    const r = a("#buff-stack"),
      G = a("#enemy-hud");
    if (!r || !G) return;
    const be = G.hidden ? "" : `${G.offsetTop + G.offsetHeight + 8}px`;
    r.style.top !== be && ((r.style.top = be), es(xe));
  }
  async function Ye(r) {
    const G = P.BUFF_BERRIES[r],
      be = le.buff(G.family, le.time());
    if (be?.key === r && be.until - le.time() + P.BUFF_MIN * 6e4 > P.BUFF_STACK * P.BUFF_MIN * 6e4)
      return X(
        e(
          "La {name} est déjà au maximum ({max}) : tu pourras en remanger une quand il lui restera moins de {left}.",
          { name: H(Ze(r)), max: Ea(P.BUFF_STACK), left: Ea(P.BUFF_STACK - 1) },
        ),
        Je(r),
      );
    if (be && be.key !== r && (P.BUFF_BERRIES[be.key].rank || 0) > (G.rank || 0)) {
      const $t = (d) => `<div class="bb-dlg-hero"><img src="${Je(d)}" alt=""></div>`;
      if (
        !(await Tt({
          className: "dexcard-modal ot-dlg",
          body: `<div class="dc-head"><h2>${e("Remplacer ta baie ?")}</h2><div class="dc-sum"><button class="dc-x" aria-label="${e("Fermer")}">✕</button></div></div>
        <div class="ot-dlg-top">${$t(r)}<div class="dc-id"><div class="genus">${e("La {old} est encore active : la {new} prend sa place, les deux ne se cumulent pas.", { old: H(Ze(be.key)), new: H(Ze(r)) })}</div>
        <div class="dc-facts two"><div class="dc-fact">${e("Active")}<b><img src="${Je(be.key)}" alt="">${xt(be.key)} · ${ut(be.until - le.time())}</b></div>
        <div class="dc-fact">${e("Nouvelle")}<b><img src="${Je(r)}" alt="">${xt(r)} · ${Ea()}</b></div></div></div></div>`,
          actions: [
            { label: e("Garder"), cls: "ghost", value: !1 },
            { label: e("Remplacer"), cls: "primary", value: !0 },
          ],
          onOpen: (d, i) => {
            a(".dc-x", d).onclick = () => i(null);
          },
        }))
      )
        return;
    }
    const ot = le.useBuffBerry(r);
    ot &&
      (le.save(),
      t.Sfx.buy(),
      ot.stacked
        ? X(
            e("{name} : +{d}, effet actif encore {left}.", {
              name: H(Ze(r)),
              d: Ea(),
              left: ut(ot.until - le.time()),
            }),
            Je(r),
            "reward",
          )
        : X(e("{name} : {effect}", { name: H(Ze(r)), effect: jt(r) }), Je(r), "reward"),
      Y(),
      on(),
      Jn());
  }
  let bt = null;
  Ss(() => {
    if (!le.S) return;
    const r = new Set(le.activeBuffs().map((G) => G.key));
    for (const G of bt || [])
      r.has(G) || (X(e("L'effet de la {name} s'est dissipé.", { name: H(Ze(G)) }), Je(G)), Y(), Jn());
    bt = r;
  }, 5e3);
  const Yt = {};
  for (const r of u.CHAPTERS)
    for (const G of r.steps) {
      if (G.kind === "trade")
        for (const [be, ot] of G.offers)
          Yt[be] ??= {
            place: G.name,
            hint: e("À rapporter au {place} : il deviendra {mon}.", {
              place: e(G.name),
              mon: le.DEX[ot].name,
            }),
          };
      G.kind === "static" &&
        G.needs &&
        (Yt[G.needs] ??= { place: G.name, hint: e("Ouvre la rencontre de {place}.", { place: e(G.name) }) });
    }
  const wa = [
      [e("Baies"), (r) => r in P.BUFF_BERRIES],
      [e("Objets clés"), (r) => r in Yt],
      [
        e("Bonbons"),
        (r) => r.startsWith("exp-candy") || r === "rare-candy",
        [...Object.keys(P.EXP_CANDIES), "rare-candy"],
      ],
      [
        e("Plaques"),
        (r) => r.startsWith("plate-"),
        Object.keys(P.UNDERGROUND.LOOT.PLATES).map((r) => "plate-" + r),
      ],
      [
        e("Évolution"),
        (r) =>
          /-stone$/.test(r) ||
          [
            "link-cable",
            "kings-rock",
            "metal-coat",
            "dragon-scale",
            "up-grade",
            "soothe-bell",
            "prism-scale",
            "deep-sea-tooth",
            "deep-sea-scale",
            "shed-shell",
            "protector",
            "electirizer",
            "magmarizer",
            "reaper-cloth",
            "razor-claw",
            "razor-fang",
          ].includes(r),
      ],
      [e("Divers"), () => !0],
    ],
    pa = Object.assign(
      {
        "event-shard": e("Trouvés au Souterrain (Activités) : ils serviront à obtenir des gemmes."),
        coin: e(
          "Gagnés à la machine à sous du Casino (Activités) ou trouvés en chemin : à jouer au pachinko ou à échanger contre des Pokémon.",
        ),
        "shed-shell": e(
          "Laissée par un Ningale qui évolue en Ninjask. Fait évoluer un autre Ningale en Munja.",
        ),
        soul: e(
          "Une fois tous les Pokémon Spectre capturés, un Spectre battu à Sinnoh en laisse parfois une. Il en faut {n} pour réveiller les âmes de la Tour Sacrée, la nuit.",
          { n: P.SOULS.need },
        ),
      },
      ...["sun-stone", "kings-rock", "metal-coat", "dragon-scale", "up-grade", "soothe-bell"].map((r) => ({
        [r]: e("Fait évoluer certains Pokémon."),
      })),
      ...[...P.SHOP, ...P.EVENT_SHOP].map((r) => ({ [r.id]: e(r.desc) })),
    );
  function Gt(r) {
    const G = [
        ...new Set(
          Object.entries(t.EVOLUTIONS)
            .filter(([ot, $t]) => le.reached(+ot) && $t.some((Wt) => Wt.item === r && le.reached(Wt.to)))
            .map(([ot]) => le.DEX[ot]?.name)
            .filter(Boolean),
        ),
      ],
      be = (t.LegendZones?.ZONES || []).find(
        (ot) =>
          ot.cond && [ot.cond, ...(ot.cond.list || [])].some(($t) => $t.kind === "item" && $t.item === r),
      );
    return G.length
      ? `<p>${e("Fait évoluer {names}.", { names: H(G.slice(0, 4).join(", ") + (G.length > 4 ? "…" : "")) })}</p>`
      : be
        ? `<p>${e("Ouvre la zone légendaire {zone}.", { zone: H(e(be.title || be.zone)) })}</p>`
        : (pa[r] ? `<p>${H(e(pa[r]))}</p>` : "") +
          (P.BUFF_BERRIES[r] ? `<p>${jt(r)}</p>` : "") +
          (P.PENSION.BERRIES[r]
            ? `<p>${e("<strong>−{n} min</strong> avant le prochain œuf.", { n: P.PENSION.BERRIES[r].minutes })}</p>`
            : "");
  }
  const N = "pc-side-fold";
  let W = {};
  try {
    W = JSON.parse(localStorage.getItem(N)) || {};
  } catch {}
  function ze(r, G) {
    const be = a(".zone-head", r);
    if ((r.classList.toggle("folded", !!W[G]), !be)) return;
    (be.classList.add("foldable"),
      be.setAttribute("role", "button"),
      (be.tabIndex = 0),
      be.setAttribute("aria-expanded", !W[G]),
      be.insertAdjacentHTML("beforeend", '<span class="fold" aria-hidden="true">▾</span>'));
    const ot = () => {
        W[G] = !W[G];
        try {
          localStorage.setItem(N, JSON.stringify(W));
        } catch {}
        (r.classList.toggle("folded", W[G]), be.setAttribute("aria-expanded", !W[G]));
      },
      $t = (Wt) => Wt.target.closest(".info-tip, .bag-open");
    ((be.onclick = (Wt) => {
      $t(Wt) || ot();
    }),
      (be.onkeydown = (Wt) => {
        (Wt.key === "Enter" || Wt.key === " ") && !$t(Wt) && (Wt.preventDefault(), ot());
      }));
  }
  const qt = P.UNDERGROUND.LOOT.PLATES,
    Lt = (r) => (r.startsWith("plate-") && qt[r.slice(6)] ? r.slice(6) : null),
    zt = (r) => (Lt(r) ? e(qt[Lt(r)]) : Ze(r)),
    ca = (r) => (Lt(r) ? (le.S.under?.plates?.[Lt(r)] ? 1 : 0) : le.S.items[r] || 0),
    Ma = () => [
      ...Object.entries(le.S.items || {}).filter(
        ([r, G]) => G > 0 && t.ITEM_NAMES[r] && !r.endsWith("-ball") && r !== "coin" && !P.PENSION.BERRIES[r],
      ),
      ...Object.keys(qt)
        .filter((r) => le.S.under?.plates?.[r])
        .map((r) => ["plate-" + r, 1]),
    ],
    Na = (r) => (r > 1 ? e("{n} objets", { n: r }) : e("{n} objet", { n: r })),
    Va = (r, G = {}) =>
      r
        .map(
          ([be, ot]) =>
            `<button class="bag-cell${be in Yt ? " key" : ""}${be in P.BUFF_BERRIES ? " berry" : ""}${G[be] ? " on" : ""}" data-k="${be}" aria-label="${H(zt(be))}"><img src="${Je(be)}" alt="">${G[be] ? `<span class="bag-timer">${ut(G[be].left)}</span>` : ""}<span class="bag-qty">×${vt(ot)}</span></button>`,
        )
        .join("");
  function Ba(r) {
    const G = [...r];
    return wa
      .map(([be, ot, $t]) => {
        const Wt = G.filter(([d]) => ot(d));
        return (
          Wt.forEach((d) => G.splice(G.indexOf(d), 1)),
          $t && Wt.sort(([d], [i]) => $t.indexOf(d) - $t.indexOf(i)),
          [be, Wt]
        );
      })
      .filter((be) => be[1].length)
      .map(
        ([be, ot]) =>
          `<div class="bag-group"><small class="bag-label">${be}</small><div class="bag-grid">${Va(ot)}</div></div>`,
      )
      .join("");
  }
  function za(r, G, be) {
    const ot = a(":scope > .bag-tip", G);
    let $t = null;
    const Wt = (j) => {
      if (!j) {
        ot.hidden = !0;
        return;
      }
      const me = j.dataset.k,
        o = P.BUFF_BERRIES[me];
      ((ot.innerHTML = `<b>${H(zt(me))}</b> <span class="muted">×${vt(ca(me))}</span>${pa[me] ? `<p>${H(e(pa[me]))}</p>` : ""}${Lt(me) ? `<p>${t.Underground?.arceusOut?.() ? e("Trouvée au Souterrain (Activités). Donne-la à un Arceus depuis sa fiche : il prend son type. La plaque est consommée.") : e("Une plaque ancienne. Son usage reste un mystère.")}</p>` : ""}${Yt[me] ? `<p>${H(Yt[me].hint)}</p><p class="bag-where">📍 ${H(e(Yt[me].place))}</p>` : ""}${o ? `<p>${jt(me)}</p><p>${e("La même baie remangée ajoute {d} à son effet, jusqu'à {max}. Une autre baie de ce type remplace l'effet en cours.", { d: Ea(), max: Ea(P.BUFF_STACK) })}</p>` : ""}${t.UI.itemWhereHTML(me)}`),
        ot.classList.toggle("has-where", !!ot.querySelector(".item-where")),
        (ot.hidden = !1));
      const n = G.getBoundingClientRect(),
        s = j.getBoundingClientRect(),
        l = ot.offsetHeight,
        c = s.top - l - 6 >= be();
      (ot.classList.toggle("above", c),
        (ot.style.top = (c ? s.top - n.top - l - 6 : s.bottom - n.top + 6) + "px"),
        (ot.style.left =
          Math.max(
            8,
            Math.min(s.left - n.left + s.width / 2 - ot.offsetWidth / 2, n.width - ot.offsetWidth - 8),
          ) + "px"));
    };
    let d = 0;
    ((r.onpointerover = (j) => {
      if (j.pointerType !== "mouse" || $t || (clearTimeout(d), j.target.closest(".bag-tip"))) return;
      const me = j.target.closest(".bag-cell");
      me ? Wt(me) : (d = Wa(() => Wt(null), 200));
    }),
      (r.onpointerleave = (j) => {
        j.pointerType === "mouse" && !$t && Wt(null);
      }));
    const i = (j) => !!j && j.dataset.k in P.BUFF_BERRIES;
    let w = null,
      S = !1;
    ((r.onpointerdown = (j) => {
      const me = j.target.closest(".bag-cell");
      (clearTimeout(w),
        (S = !1),
        i(me) &&
          j.pointerType !== "mouse" &&
          (w = Wa(() => {
            ((S = !0), ($t = me), Wt(me));
          }, ye)));
    }),
      (r.onpointerup = r.onpointercancel = () => clearTimeout(w)),
      (r.oncontextmenu = (j) => {
        i(j.target.closest(".bag-cell")) && j.preventDefault();
      }),
      (r.onclick = (j) => {
        if (j.target.closest(".bag-tip")) return;
        const me = j.target.closest(".bag-cell");
        if (S) {
          S = !1;
          return;
        }
        if (i(me)) {
          (($t = null), Wt(null), Ye(me.dataset.k));
          return;
        }
        (($t = me && me !== $t ? me : null), Wt($t));
      }));
  }
  function vn() {
    const r = Ma().filter(([G]) => !(G in P.BUFF_BERRIES));
    r.length &&
      Tt({
        className: "dexcard-modal bag-modal",
        body: `<div class="dc-head"><h2>${e("Sac")}</h2>${t.UI.helpTip(e("Sac"), e("Tout ce que tu ramasses en route, sauf les baies. Les bonbons et les objets d'évolution s'utilisent depuis la fiche d'un Pokémon. Survole ou touche un objet pour savoir à quoi il sert et où le trouver."))}<div class="dc-sum">${Na(r.length)}<button class="dc-x" aria-label="${e("Fermer")}">✕</button></div></div>
        <div class="bag-box">${Ba(r)}</div>`,
        actions: [],
        onOpen: (G, be) => {
          ((a(".dc-x", G).onclick = () => be(null)),
            G.insertAdjacentHTML("beforeend", '<div class="bag-tip" hidden></div>'),
            za(G, G, () => a(".dc-head", G).getBoundingClientRect().bottom + 8));
        },
      });
  }
  let An = "";
  function on() {
    const r = a("#bag-panel");
    if (!r) return;
    const G = Ma(),
      be = G.filter(([w]) => w in P.BUFF_BERRIES),
      ot = G.length - be.length,
      $t = le.activeBuffs(),
      Wt = Object.fromEntries($t.map((w) => [w.key, w])),
      d = be.map(([w, S]) => w + S).join(",") + "|" + ot + "|" + $t.map((w) => w.key + w.until).join(",");
    if (d === An) return;
    if (((An = d), !G.length)) {
      r.innerHTML = "";
      return;
    }
    ((r.innerHTML = `<div class="zone-box bag-box">
      <div class="zone-head"><b>${e("Consommables")}</b>${t.UI.helpTip(e("Consommables"), e("Les baies que tu ramasses en route. Touche-en une pour la manger : son bonus dure 1 h, même hors ligne. La même baie remangée ajoute 1 h (jusqu'à 4 h), une autre du même effet la remplace. Le reste de tes objets est dans le Sac."))}${ot ? `<button class="btn outline small bag-open">${e("Sac")}</button>` : ""}</div>
      ${be.length ? `<div class="bag-grid">${Va(be, Wt)}</div>` : `<p class="bag-none">${e("Aucune baie pour l'instant.")}</p>`}
      <div class="bag-tip" hidden></div></div>`),
      ze(r, "bag"));
    const i = a(".bag-open", r);
    (i && (i.onclick = vn), za(r, r.firstElementChild, () => t.UI.safeTop() + 8));
  }
  Ss(() => {
    At() && (on(), Y());
  }, 1e3);
  const qn = () =>
    t.UI.helpTip(
      e("À trouver ici"),
      e(
        "Les Pokémon sauvages de la zone : le % est leur part des rencontres, « ??? » ceux que tu n'as jamais vus. Certains n'apparaissent qu'à une heure, une météo ou un jour précis. Ton équipe lance une Poké Ball toute seule sur chaque espèce qui te manque.",
      ),
    );
  let xn = "";
  const fn = new Set(),
    Yn = (r) => le.inDex(r) && !fn.has(r),
    Zn = (r) => !Yn(r) && !!le.S.dex[r] && !fn.has(r),
    is = {
      sunday: e("Dimanche"),
      monday: e("Lundi"),
      tuesday: e("Mardi"),
      wednesday: e("Mercredi"),
      thursday: e("Jeudi"),
      friday: e("Vendredi"),
      saturday: e("Samedi"),
    },
    ts = (r) => {
      const G = t.DAYTIME.PHASES.find(($t) => $t.key === r),
        be = !G && t.WEATHER.info(r),
        ot = G || be || { icon: "📅", name: is[r] || r };
      return `<span data-cond="${r}"><span class="zone-cond-ic">${ot.icon}</span>${H(ot.name)}</span>`;
    };
  function Jn() {
    on();
    const r = a("#zone-panel");
    if (!r) return;
    const G = ve.state,
      be = (y) => y.type === "wild" && (y.areas?.length || y.pool?.length || y.species?.length);
    let ot = Math.max(0, G.nodes.indexOf(Xt)),
      $t = G.nodes.slice(ot).find(be) || [...G.nodes].reverse().find(be);
    if (G.event?.raid) {
      const { id: y, reg: v, date: M } = G.event,
        I = t.Raids.done(v, M, y) || le.ownedMons().some((Ae) => Ae.id === y && Ae.shiny),
        ke = t.Raids.pityReady(v, M) ? 100 : Math.round(P.RAID.CATCH * 100),
        Se = "raid|" + y + "|" + I + "|" + ke;
      if (xn === Se) return;
      ((xn = Se),
        (r.innerHTML = `<div class="zone-box"><div class="zone-head"><b>${e("À trouver ici")}</b><span class="muted">${e("Raid")}</span></div>
        <div class="zone-grid"><div class="zone-cell ${I ? "caught" : "seen"}" title="${H(e("{mon} chromatique · capture {pct} %", { mon: le.DEX[G.event.id].name, pct: ke }))}">${se(G.event.id, !0, t.UI.tileScale(G.event.id), 48)}<span class="zone-pct">${ke}%</span></div></div>
        <p class="muted zone-empty">${e("Seul le boss se capture : les Pokémon du donjon ne se capturent pas.")}</p></div>`),
        ze(r, "zone"));
      return;
    }
    if (G.tower) {
      const y = it(),
        v = De().run(),
        M = (y ? "candy|" : "tower|") + (v?.floor ?? 0);
      if (xn === M) return;
      xn = M;
      const I = v ? (y ? [v.type] : t.Tower.themeOf(v.floor)) : [],
        ke = y && v ? t.CandyRun.stepOf(Math.ceil(v.floor / P.CANDY_RUN.STEP) * P.CANDY_RUN.STEP) : null;
      ((r.innerHTML = `<div class="zone-box"><div class="zone-head"><b>${e(y ? "Type du jour" : "Thème")}</b><span class="muted">${I.map((Se) => x(Se, !0)).join(" ")}</span></div>
        <p class="muted zone-empty">${y ? e("Rien ne se capture à la Fabrique : tous les 5 étages, des bonbons pour le Sac des régions liées.") + (ke ? " " + e("Étage {n} : {gain}", { n: ke.floor, gain: pt({ [ke.candy[0]]: ke.candy[1], ...(ke.sb ? { "rare-candy": ke.sb } : {}) }) }) : "") : e("Rien ne se capture dans la Tour : chaque étage franchi compte pour ton record de la semaine.")}</p></div>`),
        ze(r, "zone"));
      return;
    }
    if (G.zone?.riddle) {
      const y = "riddle|" + G.zone.riddle;
      if (xn === y) return;
      ((xn = y),
        (r.innerHTML = `<div class="zone-box"><div class="zone-head"><b>${e("À trouver ici")}</b><span class="muted">${H(e(t.LegendZones.riddle(G.zone.riddle).place))}</span></div>
        <p class="muted zone-empty">${e("Aucun Pokémon ici : seulement une inscription sur le mur.")}</p></div>`),
        ze(r, "zone"));
      return;
    }
    if (G.league) {
      const y = "league|" + G.league.reg + "|" + G.league.tier;
      if (xn === y) return;
      ((xn = y),
        (r.innerHTML = `<div class="zone-box"><div class="zone-head"><b>${e("À trouver ici")}</b><span class="muted">${e("Ligue Élite")} · ${e("Élite {r}", { r: je[G.league.tier] })}</span></div>
        <p class="muted zone-empty">${e("Rien ne se capture en Ligue Élite : bats les cinq dresseurs d'affilée pour gagner la récompense du palier.")}</p></div>`),
        ze(r, "zone"));
      return;
    }
    if (G.zone?.elite) {
      const y = G.zone.foe ?? G.zone.id,
        v = "elite|" + y + "|" + G.zone.elite;
      if (xn === v) return;
      ((xn = v),
        (r.innerHTML = `<div class="zone-box"><div class="zone-head"><b>${e("À trouver ici")}</b><span class="muted">${H(le.DEX[y].name)} · ${e("Élite {r}", { r: je[G.zone.elite] })}</span></div>
        <p class="muted zone-empty">${e("Rien ne se capture en Élite : bats le légendaire pour gagner la récompense du palier.")}</p></div>`),
        ze(r, "zone"));
      return;
    }
    if (G.zone) {
      const y = t.LegendZones.get(G.zone.id),
        v = G.zone.foe ?? G.zone.id,
        M = !!y?.wb,
        I = M ? t.WorldBoss.caught() : Yn(v),
        ke = I || !y ? 0 : t.LegendZones.tries(y, v) + 1,
        Se = "zone|" + v + "|" + I + "|" + ke;
      if (xn === Se) return;
      ((xn = Se),
        (r.innerHTML = `<div class="zone-box"><div class="zone-head"><b>${e("À trouver ici")}</b><span class="muted">${ke ? e("Essai {n}", { n: vt(ke) }) : H(le.DEX[v].name)}</span></div>
        <div class="zone-grid"><div class="zone-cell ${I ? "caught" : "seen"}" data-id="${v}" title="${H(le.DEX[v].name)} · ${e("Nv. {n}", { n: G.zone.level })} · ${e(M ? "Une capture par édition" : "Une seule capture")}">${se(v, !1, t.UI.tileScale(v), 48)}</div></div>
        <p class="muted zone-empty">${e("Seul le légendaire se capture : les Pokémon du chemin ne se capturent pas.")}</p></div>`),
        ze(r, "zone"));
      return;
    }
    const Wt = Xt?.type === "heal",
      d = Xt?.type === "gym";
    if (!$t || Wt || d) {
      const y = Wt ? "center|" + Xt.name : d ? "gym|" + Xt.name : "none";
      if (xn === y) return;
      ((xn = y),
        (r.innerHTML = `<div class="zone-box"><div class="zone-head"><b>${e("À trouver ici")}</b>${qn()}<span class="muted">${H(e(Wt || d ? Xt.name : u.CHAPTERS[G.chapter].name))}</span></div>
        <p class="muted zone-empty">${e(Wt ? "Centre Pokémon : pas de Pokémon sauvage ici." : d ? "Arène : pas de Pokémon sauvage ici." : "Aucun Pokémon sauvage ici : que des dresseurs.")}</p></div>`),
        ze(r, "zone"));
      return;
    }
    const i = ve.zonePool($t, G.chapter, !0, null, !0, !0),
      w = [];
    for (let y = G.nodes.indexOf($t) - 1; y >= 0 && G.nodes[y].type === "static"; y--) {
      const v = G.nodes[y],
        M = le.DEX[v.id];
      !v.spirit &&
        !M.legendary &&
        !M.mythical &&
        !i.some((I) => I.id === v.id) &&
        w.unshift({ id: v.id, min: v.level, max: v.level, pct: 0, special: !0 });
    }
    const S = [...i, ...w],
      j = S.filter((y) => Yn(y.id)).length,
      me = t.WEATHER,
      o = me.info(me.current($t)),
      n = me.forecast($t),
      s =
        o && $t?.weather
          ? `${o.icon} ${o.name} · ${gt()}`
          : o
            ? `${o.icon} ${o.name} ${Ra(me.forced ? me.endsAt() : (n?.at ?? me.endsAt()))}`
            : "",
      l =
        ($t?.name || "") +
        "|" +
        t.DAYTIME.phase().key +
        "|" +
        s +
        "|" +
        S.map(
          (y) =>
            y.id + (Yn(y.id) ? "c" : Zn(y.id) ? "l" : le.S.seen[y.id] ? "s" : "") + Math.round(y.pct * 100),
        ).join(",");
    if (l === xn) return;
    xn = l;
    const c = new Set([
      t.DAYTIME.phase().key,
      me.current($t),
      Object.keys(is)[new Date(t.Raids.dateKey()).getUTCDay()],
    ]);
    c.has("morning") && c.add("day");
    const p = [{ list: S.filter((y) => !y.when) }];
    for (const y of S.filter((v) => v.when))
      for (const v of y.when) {
        let M = p.find((ke) => ke.k === v);
        const I = y.when.length > 1 ? c.has(v) : y.on;
        (M ||
          p.push(
            (M = {
              k: v,
              on: I,
              label: ts(v) + (I ? `<span class="zone-cond-now">${e("maintenant")}</span>` : ""),
              list: [],
            }),
          ),
          M.list.push(y));
      }
    (p[0].list.length || p.shift(),
      p.sort((y, v) => (y.k ? (v.k ? (v.on ? 1 : 0) - (y.on ? 1 : 0) : 1) : -1)),
      (r.innerHTML = `<div class="zone-box">
      <div class="zone-head"><b>${e("À trouver ici")}</b>${qn()}<span class="muted">${H(e($t?.name || u.CHAPTERS[G.chapter].name))}</span>
        <span class="zone-count ${j === S.length ? "done" : ""}">${j}/${S.length}</span></div>
      ${s ? `<div class="zone-weather${o ? " now" : ""}">${H(s)}</div>` : ""}
      <div class="zone-scroll">${p
        .map(
          (y) =>
            `${y.label ? `<div class="zone-cond${y.on ? " now" : " off"}">${y.label}</div>` : ""}<div class="zone-grid${y.k && !y.on ? " off" : ""}">${y.list
              .map((v) => {
                const M = Yn(v.id) ? "caught" : Zn(v.id) ? "seen lost" : le.S.seen[v.id] ? "seen" : "unknown",
                  I = M === "unknown" ? "???" : le.DEX[v.id].name,
                  ke = v.pct * 100,
                  Se = v.special
                    ? e("rencontre unique")
                    : e("{pct} % des rencontres", { pct: ke < 1 ? "<1" : Math.round(ke) });
                return `<div class="zone-cell ${M}" data-id="${v.id}" title="${H(I)} · ${e("Nv. {n}", { n: v.min + (v.max > v.min ? "-" + v.max : "") })} · ${Se}">
          ${se(v.id, !1, t.UI.tileScale(v.id), 48)}<span class="zone-pct">${v.boost && v.on ? '<b class="zone-up">▲</b>' : ""}${v.special ? "★" : (ke < 1 ? "<1" : Math.round(ke)) + "%"}</span></div>`;
              })
              .join("")}</div>`,
        )
        .join("")}</div></div>`),
      ze(r, "zone"),
      (r.onclick = (y) => {
        const v = y.target.closest(".zone-cell[data-id]");
        v &&
          t.Screens.pokedex.openCard(
            +v.dataset.id,
            S.map((M) => M.id),
          );
      }));
  }
  async function On(r) {
    if (!(!_e || ["wild", "trainer", "gym"].includes(Xt?.type)) && Xt && Ht(Xt) === Ht(r)) {
      (Fe(r), T(), await ht());
      return;
    }
    await Ga(() => {
      (oa([]),
        (a("#trainer-slot").innerHTML = ""),
        a("#arena").classList.remove("has-trainer"),
        Fe(r),
        T(),
        fa(""),
        (_e = !0),
        (Z = 1),
        ($e = Ua()),
        ea(!0));
    });
  }
  let Me = null;
  const It = (r) => (Me && r.uid in Me ? Me[r.uid] : le.curHp(r));
  function Kt(r) {
    return r > 0.2 ? "#f0607a" : "#d6334f";
  }
  function Aa(r, G) {
    const be = G ? r / G : 0;
    return `<div class="hp"><div style="width:${be * 100}%;background:${Kt(be)}"></div></div>`;
  }
  const Ka = {
      1: [[30, 22]],
      2: [
        [38, 25],
        [24, 19],
      ],
      6: [
        [33, 18],
        [46, 19],
        [20, 19],
        [37, 33],
        [50, 32],
        [24, 32],
      ],
    },
    _a = (r) => {
      const G = Ka[Z] || Ka[6];
      return G[r % G.length];
    },
    Ha = (r) => a(`#ally-slots .ally[data-uid="${r}"]`),
    Ua = () => [],
    sn = () => {
      const r = le.teamMons();
      return [(r.find((G) => le.curHp(G) > 0) || r[0])?.uid].filter(Boolean);
    };
  function Be(r, G) {
    const [be, ot] = _a(G),
      $t =
        f(`<div class="ally" data-uid="${r.uid}" data-team-uid="${r.uid}" style="left:${be}%;bottom:${ot}%;z-index:${100 - ot}">
        <div class="wrap"><img alt="">
          <div class="mini-hp">${Aa(It(r), le.maxHp(r))}</div>
        </div>
        <div class="mini-lv"><span class="lvn">${e("Nv.{n}", { n: h(r) })}</span></div>
      </div>`);
    return (
      ($t.ready = t.UI.setSprite(a("img", $t), B(r.id, r.shiny), Z > 2 ? "--ks" : "--k")),
      $(a(".wrap", $t), { amp: 0.8, speed: 1.1 }),
      Ts($t, r),
      $t
    );
  }
  function Ut() {
    const r = le.S.trainer?.sprite,
      G = f('<div class="hero"><img alt=""></div>');
    return (
      (G.ready = t.UI.setSprite(
        a("img", G),
        `assets/trainers/${/^[\w-]+$/.test(r || "") ? r : "red"}.png`,
        "--kt",
      )),
      G
    );
  }
  const aa = [
      { transform: "scaleX(-1)" },
      { transform: "scaleX(-1) translate(6px, 2px)", offset: 0.35 },
      { transform: "scaleX(-1) translate(-10px, 0)", offset: 0.7 },
      { transform: "scaleX(-1)" },
    ],
    ae = [
      { transform: "none" },
      { transform: "translate(6px, 2px)", offset: 0.35 },
      { transform: "translate(-10px, 0)", offset: 0.7 },
      { transform: "none" },
    ];
  async function ft(r) {
    if (!At()) return r({});
    let G = a("#ally-slots .hero");
    G
      ? await G.ready
      : ((G = Ut()),
        (de = !0),
        a("#ally-slots").appendChild(G),
        await G.ready,
        await G.animate(
          [
            { transform: "translateX(-160%)", opacity: 0 },
            { transform: "translateX(6%) scale(1.05, .95)", opacity: 1, offset: 0.7 },
            { transform: "none" },
          ],
          { duration: 380 / Ee(), easing: "cubic-bezier(.2,.8,.3,1)" },
        ).finished);
    const be = pn(G);
    return (
      (be.y -= G.getBoundingClientRect().height * 0.2),
      r({
        from: be,
        onThrow: () => {
          a("img", G).animate(aa, { duration: 420 / Ee(), easing: "ease-out" });
        },
      })
    );
  }
  async function ht() {
    if (_e && $e.join() === Ua().join()) return;
    const r = b("#ally-slots .ally");
    At() && r.length && (await Promise.all(r.map((ot) => an(ot, Wn(ot.dataset.uid)))));
    const G = de;
    if (((de = !1), (_e = !0), (Z = 1), ($e = Ua()), ea(!0), !At())) return;
    const be = a("#ally-slots .hero");
    (await be?.ready,
      G ||
        be?.animate(
          [
            { transform: "translateX(-160%)", opacity: 0 },
            { transform: "translateX(6%) scale(1.05, .95)", opacity: 1, offset: 0.7 },
            { transform: "none" },
          ],
          { duration: 520 / Ee(), easing: "cubic-bezier(.2,.8,.3,1)" },
        ),
      await et(400));
  }
  function ea(r) {
    const G =
      (_e ? "p" + (le.S.trainer?.sprite || "") : "") +
      Z +
      "/" +
      $e
        .map((ot) => {
          const $t = le.getMon(ot);
          return $t ? ot + $t.id + ($t.shiny ? 1 : 0) : "-";
        })
        .join("|");
    if (G === J && !r) {
      Ca();
      return;
    }
    J = G;
    const be = a("#ally-slots");
    ((be.innerHTML = ""),
      $e.forEach((ot, $t) => {
        const Wt = le.getMon(ot);
        Wt && be.appendChild(Be(Wt, $t));
      }),
      (_e || de) && be.appendChild(Ut()),
      Ca());
  }
  const Ra = (r) => t.UI.untilText(r);
  function Ca() {
    Fn();
    for (const r of le.teamMons()) {
      const G = a(`.ally[data-uid="${r.uid}"]`);
      if (!G) continue;
      const be = It(r),
        ot = le.maxHp(r),
        $t = a(".hp > div", G);
      (($t.style.width = (be / ot) * 100 + "%"),
        ($t.style.background = Kt(be / ot)),
        G.classList.toggle("fainted", be <= 0),
        (a(".lvn", G).textContent = e("Nv.{n}", { n: h(r) })));
    }
  }
  const gn = {
      1: [[78, 25]],
      2: [
        [64, 22],
        [80, 25],
      ],
      3: [
        [58, 23],
        [70, 19],
        [82, 25],
      ],
      4: [
        [57, 23],
        [66, 19],
        [75, 25],
        [84, 20],
      ],
      5: [
        [56, 25],
        [64, 18],
        [72, 26],
        [80, 18],
        [88, 25],
      ],
      6: [
        [60, 31],
        [72, 32],
        [84, 31],
        [56, 18],
        [68, 17],
        [80, 18],
      ],
    },
    yn = (r) => a(`#enemy-slot .enemy[data-uid="${r}"]`),
    mn = (r) => We.find((G) => G.uid === r),
    ln = (r) => le.DEX[r?.id]?.types.includes("ghost"),
    In = (r) => (r?.veiled ? (ln(r) ? e("Spectre") : e("Silhouette invisible")) : le.DEX[r?.id]?.name);
  function xe() {
    const r = a("#speed-btns"),
      G = a("#arena");
    if (!G?.offsetParent) return;
    const be = G.getBoundingClientRect(),
      ot = r?.offsetParent ? r.getBoundingClientRect() : null,
      $t = ot && (ot.top + ot.bottom) / 2 < (be.top + be.bottom) / 2,
      Wt = b("#buff-stack .buff-pill")
        .map((d) => d.getBoundingClientRect())
        .filter((d) => d.width);
    for (const d of b("#arena .enemy .mini-hp")) {
      d.style.translate = "";
      const i = d.getBoundingClientRect(),
        w = a(".hp-rk", d)?.getBoundingClientRect(),
        S = w
          ? {
              top: Math.min(i.top, w.top),
              bottom: Math.max(i.bottom, w.bottom),
              left: Math.min(i.left, w.left),
              right: i.right,
              height: i.height,
            }
          : i;
      if (!S.height) continue;
      let j = Math.max(0, Math.ceil(be.top + 4 - S.top)),
        me = 0;
      ot &&
        S.right > ot.left &&
        S.left < ot.right &&
        S.bottom + j > ot.top - 4 &&
        S.top + j < ot.bottom + 4 &&
        (j = $t ? Math.ceil(ot.bottom + 4 - S.top) : Math.floor(ot.top - 4 - S.bottom));
      const o = Wt.filter(
        (n) =>
          n.right > S.left && n.left < S.right + 4 && n.bottom > S.top + j - 2 && n.top < S.bottom + j + 2,
      );
      (o.length &&
        (me = Math.max(
          Math.ceil(be.left + 4 - S.left),
          Math.floor(Math.min(...o.map((n) => n.left)) - 4 - S.right),
        )),
        (me || j) && (d.style.translate = `${me}px ${j}px`));
    }
  }
  function Et(r, G) {
    const be = gn[Math.min(6, Math.max(1, oe))],
      [ot, $t] = be[G % be.length],
      Wt =
        f(`<div class="enemy${r.hp <= 0 ? " fainted" : ""}${r.veiled ? " veiled" : ""}${r.spirit ? " spirit" : ""}" data-uid="${r.uid}" style="left:${ot}%;bottom:${$t}%;z-index:${100 - $t}"><div class="wrap">${r.elite ? "" : t.UI.rankTag(r, "en-rk")}<img alt=""><div class="mini-hp">${r.elite ? t.UI.rankTag(r, "hp-rk") : ""}${Aa(r.hp, le.maxHp(r))}${r.rageMax ? `<div class="hp rage" title="${e("Jauge de rage : pleine, il frappe toute l'équipe")}"><div style="width:${(r.rage / r.rageMax) * 100}%"></div></div>` : ""}</div></div>
      <div class="mini-lv">${e("Nv.{n}", { n: r.level })}${le.S.dex[r.id] && !r.veiled ? (le.inDex(r.id) ? `<img class="owned" src="assets/items/poke-ball.png" alt="" title="${e("Déjà capturé")}">` : `<img class="owned lost" src="assets/items/poke-ball.png" alt="" title="${e("Capturé, mais plus possédé")}">`) : ""}</div></div>`),
      d = le.DEX[r.id],
      i =
        (d.legendary || d.mythical) && !r.shiny && !r.veiled && t.UI.hasArt(r.id)
          ? t.UI.artSrc(r.id, !1)
          : null;
    return (
      i && Wt.classList.add("anim"),
      i && (ve.state.battle?.enemies?.length ?? 1) === 1 && (Wt.style.left = "85%"),
      (Wt.ready = i
        ? t.UI.setSprite(a("img", Wt), i, "--kh")
        : t.UI.setSprite(a("img", Wt), B(r.id, r.shiny))),
      Wt.ready.then(() => es(xe)),
      $(a(".wrap", Wt), { amp: 0.7 }),
      Ts(Wt, r),
      Wt
    );
  }
  function oa(r, G = "pop", be = r, ot = r.length) {
    ((r = r || []), (We = (be || r).filter(Boolean)), (oe = ot || 1));
    const $t = a("#enemy-slot");
    if ((($t.innerHTML = ""), !r.some(Boolean))) return (ma(), Promise.resolve());
    const Wt = [];
    (r.forEach((me, o) => {
      me && Wt.push($t.appendChild(Et(me, o)));
    }),
      ma());
    const d = Promise.all(Wt.map((me) => me.ready));
    if (!At() || G === "none") return d;
    if (G === "ball") return sa(Wt);
    const i = Wt[0],
      w = We[0],
      S = a("img", i);
    return ve.state.battle?.kind === "wild"
      ? ((S.style.opacity = 0),
        i.classList.add("in-ball"),
        (a("#enemy-hud").style.visibility = "hidden"),
        (async () => {
          (await d,
            i.classList.remove("in-ball"),
            (a("#enemy-hud").style.visibility = ""),
            (S.style.opacity = ""),
            (S.style.filter = "brightness(0)"),
            await S.animate(
              [
                { transform: "translateY(55%) scale(.7, .5)", opacity: 0 },
                { transform: "translateY(-26%) scale(.82, 1.28)", opacity: 1, offset: 0.45 },
                { transform: "translateY(0) scale(1.16, .86)", offset: 0.75 },
                { transform: "translateY(0) scale(1)" },
              ],
              { duration: 460 / Ee(), easing: "ease-out" },
            ).finished,
            await et(380),
            t.Sfx.open(),
            (S.style.filter = ""),
            await S.animate(
              [
                { filter: "brightness(0)" },
                { filter: "brightness(0) invert(1) drop-shadow(0 0 8px #fff)", offset: 0.35 },
                { filter: "none" },
              ],
              { duration: 360, easing: "ease-out" },
            ).finished,
            w.shiny && Fa(S));
        })())
      : (w.shiny && Wa(() => Fa(S), 300),
        d.then(
          () =>
            S.animate(
              [
                { transform: "translateY(40%) scale(.6, .4)", opacity: 0 },
                { transform: "translateY(-12%) scale(.85, 1.2)", opacity: 1, offset: 0.5 },
                { transform: "translateY(0) scale(1.12, .9)", offset: 0.8 },
                { transform: "translateY(0) scale(1)" },
              ],
              { duration: 420 / Ee(), easing: "ease-out" },
            ).finished,
        ));
  }
  async function sa(r) {
    await Promise.all(r.map((be) => be.ready));
    const G = a("#trainer-slot .trainer");
    (r.forEach((be) => {
      be.style.opacity = 0;
    }),
      await Promise.all(
        r.map(async (be, ot) => {
          await et(ot * 220);
          const $t = a("img", be),
            Wt = G ? await Ja(G, $t) : void 0;
          ((be.style.opacity = ""), mn(be.dataset.uid)?.shiny && Wa(() => Fa($t), 500), await Za($t, Wt));
        }),
      ),
      await et(250),
      await ia());
  }
  async function Ga(r) {
    if (!At()) {
      r();
      return;
    }
    const G = a("#arena");
    t.Sfx.legendary?.();
    const be = f('<div class="flash-overlay" style="background:#fff"></div>');
    (G.appendChild(be),
      be
        .animate([{ opacity: 0 }, { opacity: 0.5 }, { opacity: 0 }], {
          duration: 300 / Ee(),
          easing: "ease-out",
        })
        .finished.then(() => be.remove()));
    const ot = re().dither(G, { color: "#0b0d14", sweep: "diag", z: 10 });
    try {
      (await ot.run(0, 1, 420 / Ee()), t.Sfx.thud(1), r(), await et(180), await ot.run(1, 0, 420 / Ee()));
    } finally {
      ot.remove();
    }
  }
  async function cn(r, G = "#ffcb05") {
    if (!At()) return (r(), null);
    const be = a("#arena"),
      ot = re().PAL.of(G);
    t.Sfx.legendary?.();
    const $t = f('<div class="flash-overlay" style="background:#fff"></div>');
    (be.appendChild($t),
      $t.animate([{ opacity: 0 }, { opacity: 0.6 }, { opacity: 0 }], 420).finished.then(() => $t.remove()));
    const Wt = re().dither(be, { color: ot[5], sweep: "iris", z: 10 });
    (Wa(() => t.Sfx.thud(0.6), 250 / Ee()), await Wt.run(0, 1, 560 / Ee()), t.Sfx.thud(1));
    const d = 4,
      i = be.getBoundingClientRect(),
      w = f('<canvas class="boss-bands"></canvas>'),
      S = w.getContext("2d"),
      j = (w.width = Math.ceil(i.width / d)),
      me = (w.height = Math.ceil(i.height / d));
    Object.assign(w.style, {
      position: "absolute",
      inset: 0,
      width: "100%",
      height: "100%",
      imageRendering: "pixelated",
      pointerEvents: "none",
      zIndex: 10,
    });
    const o = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5];
    let n = !0,
      s = 0;
    be.appendChild(w);
    const l = zn.now();
    return (
      (function c(p) {
        if (!n || !w.isConnected) return;
        es(c);
        const y = (p - l) / 1e3;
        ((s = Math.min(1, s + 0.06)), S.clearRect(0, 0, j, me));
        for (let v = 0; v < me; v++)
          for (let M = 0; M < j; M++) {
            const I = o[(v & 3) * 4 + (M & 3)] / 16,
              ke = Math.hypot((M / j - 0.5) * 1.6, v / me - 0.5),
              Se = (((M + v - y * 14) % 22) + 22) % 22,
              Ae = Math.max(0, 1 - ke / 0.55);
            let St = null;
            (Ae * 0.8 * s > I
              ? (St = Ae > 0.6 && Ae * 0.6 > I ? ot[2] : ot[3])
              : Se < 5 && (Se < 3 ? 0.55 : 0.25) * s * (1 - ke * 0.5) > I && (St = ot[3]),
              St && ((S.fillStyle = St), S.fillRect(M, v, 1, 1)));
          }
      })(l),
      r(),
      await et(300),
      {
        D: Wt,
        cv: w,
        stop: () => {
          n = !1;
        },
      }
    );
  }
  async function Tn(r) {
    r &&
      (await r.cv.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 200 / Ee(),
        easing: "steps(4)",
        fill: "forwards",
      }).finished,
      r.stop(),
      r.cv.remove(),
      await r.D.run(1, 0, 480 / Ee()),
      r.D.remove());
  }
  const Mn = (r) => {
    (r?.stop(), r?.cv.remove(), r?.D.remove());
  };
  async function ks(r, G) {
    try {
      (await Ve(G.frame)) ? Mn(r) : (await G.boss(), await Tn(r));
    } catch (be) {
      throw (Mn(r), be);
    }
  }
  async function ss(r, G) {
    if (!At()) {
      (r(), G?.remove());
      return;
    }
    const be = re().dither(a("#arena"), { color: "#000", z: 11 });
    (G ? (be.set(1), G.remove()) : await be.run(0, 1, 380 / Ee()),
      r(),
      await et(260),
      await be.run(1, 0, 380 / Ee()),
      be.remove());
  }
  async function us([r, G]) {
    if (!At()) return null;
    const be = a("#arena").appendChild(
      f(`<div class="defeat-screen"><div class="ds-card"><b>${r}</b><small>${G}</small></div></div>`),
    );
    t.Sfx.defeat();
    const ot = a("#arena"),
      $t = a(".ds-card", be);
    $t.style.opacity = 0;
    const d = [...ot.children]
        .filter((me) => me !== be && !me.classList.contains("fx-layer"))
        .map((me) =>
          me.animate([{ filter: "none" }, { filter: "grayscale(1) brightness(.6)" }], {
            duration: 500,
            easing: "steps(5)",
            fill: "forwards",
          }),
        ),
      i = re().dither(be, { color: "#08040a", z: 0 }),
      w = 1700,
      S = 420 / Ee(),
      j = i.run(0, 0.5, 500).then(() => i.run(0.5, 0.8, 380 + w));
    return (
      await et(300),
      ($t.style.opacity = ""),
      await $t.animate(
        [
          { transform: "translateY(-30px) scale(.9, 1.15)", opacity: 0 },
          { transform: "translateY(4px) scale(1.12, .86)", opacity: 1, offset: 0.6 },
          { transform: "scale(.97, 1.03)", offset: 0.82 },
          { transform: "none", opacity: 1 },
        ],
        { duration: 380, easing: "ease-out", fill: "both" },
      ).finished,
      await j,
      $t.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 300, easing: "steps(3)", fill: "forwards" }),
      await i.run(0.8, 1, S),
      d.forEach((me) => me.cancel()),
      be
    );
  }
  async function Xn(r) {
    const G = le.teamMons(),
      be = () => {
        ((Me = null), Ca(), Ls(), js());
      };
    if (!At() || !G.length) {
      be();
      return;
    }
    await t.HealFX.play(a("#arena"), {
      fx: a("#arena-fx"),
      allies: a("#ally-slots"),
      count: G.length,
      slots: Math.max(P.TEAM_SIZE, G.length),
      title: r ? e("Centre Pokémon de {place}", { place: H(e(r)) }) : e("Centre Pokémon"),
      msg: e("Ton équipe est en pleine forme !"),
      speed: Ee,
      onHeal: be,
    });
  }
  async function Dn(r) {
    if (!At()) return;
    const G = a("#arena"),
      be = r.gym,
      ot = r.title
        ? e(r.title)
        : be.champion
          ? e("Maître de la Ligue")
          : u.CHAPTERS[ve.state.chapter]?.league
            ? e("Conseil 4")
            : e("Champion d'arène"),
      $t = be.badge && u.badgeHtml(be.badge, 3),
      Wt = f(`<div class="boss-intro" style="--c:${be.color || "#ffcb05"}">
        <i class="bi-bar top"></i><i class="bi-bar bot"></i>
        <div class="bi-who"><img class="bi-trainer sil" alt=""></div>
        <div class="bi-info"><small>${H(ot)}</small><b>${H(e(r.trainer))}</b>
          <span class="bi-tags">${$t || ""}${(be.types || (be.type ? [be.type] : [])).map((w) => x(w, !0)).join("")}${be.champion || !be.name ? "" : `<em>${H(e(be.name))}</em>`}</span></div>
      </div>`),
      d = !r.sprite && be.boss && t.UI.hasArt(be.boss),
      i = r.sprite
        ? `assets/trainers/${r.sprite}.png`
        : d
          ? t.UI.artSrc(be.boss, !1)
          : be.boss
            ? B(be.boss)
            : null;
    if (i) {
      const w = await t.UI.setSprite(a(".bi-trainer", Wt), i, "--bz"),
        S = Math.max(d ? 1 : 2, Math.floor((G.clientHeight * (r.sprite ? 0.6 : 0.8)) / w.h));
      (Wt.style.setProperty("--bz", S),
        (a(".bi-who", Wt).style.bottom = Math.max(0, (G.clientHeight - w.h * S) / 2) + "px"));
    }
    G.appendChild(Wt);
    try {
      await ls(Wt, r, be, G);
    } finally {
      Wt.remove();
    }
  }
  async function ls(r, G, be, ot) {
    const [$t, Wt] = b(".bi-bar", r),
      d = a(".bi-who", r),
      i = a(".bi-trainer", r),
      w = a(".bi-info", r),
      S = { easing: "cubic-bezier(.2,.8,.3,1)", fill: "forwards" };
    (t.Sfx.whoosh(),
      r.animate([{ backgroundColor: "rgba(5,7,12,0)" }, { backgroundColor: "rgba(5,7,12,.7)" }], {
        duration: 300,
        fill: "forwards",
      }),
      $t.animate([{ transform: "translateY(-100%)" }, { transform: "none" }], { duration: 300, ...S }),
      await Wt.animate([{ transform: "translateY(100%)" }, { transform: "none" }], { duration: 300, ...S })
        .finished);
    const j = re().pix(r, 1),
      me = j.PAL.of(be.color || "#ffcb05");
    if (!G.sprite && be.boss) {
      const n = d.getBoundingClientRect(),
        s = r.getBoundingClientRect();
      j.aura(n.left - s.left + n.width / 2, n.bottom - s.top - 6, Math.max(60, n.width * 0.7), 2200, me);
    }
    (await d.animate(
      [
        { transform: "translateX(60%)", opacity: 0 },
        { transform: "translateX(-4%)", opacity: 1, offset: 0.8 },
        { transform: "none", opacity: 1 },
      ],
      { duration: 480, ...S },
    ).finished,
      await et(220),
      t.Sfx.bonk(),
      t.Sfx.legendary(),
      re().shake(ot, 7, 300));
    const o = f('<div class="flash-overlay" style="background:#fff"></div>');
    (r.appendChild(o), o.animate([{ opacity: 1 }, { opacity: 0 }], 360).finished.then(() => o.remove()));
    {
      const n = i.getBoundingClientRect(),
        s = r.getBoundingClientRect(),
        l = n.left - s.left + n.width / 2,
        c = n.top - s.top + n.height / 2;
      (j.ring(l, c, n.height * 0.8, 520, me),
        j.burst(l, c, 26, 2.6, { pal: me, round: !0, grav: 0.03, heat: 0.1 }));
    }
    (i.classList.remove("sil"),
      i.animate([{ scale: "1.12 .9" }, { scale: ".96 1.05", offset: 0.5 }, { scale: "1" }], {
        duration: 360,
        easing: "ease-out",
      }),
      await w.animate(
        [
          { transform: "translateX(-40px)", opacity: 0 },
          { transform: "translateX(6px)", opacity: 1, offset: 0.7 },
          { transform: "none", opacity: 1 },
        ],
        { duration: 380, ...S },
      ).finished);
    {
      const n = a(".bi-tags", r).getBoundingClientRect(),
        s = r.getBoundingClientRect();
      j.burst(n.left - s.left + n.width / 2, n.top - s.top + n.height / 2, 14, 2, {
        pal: me,
        grav: 0.02,
        drag: 0.93,
        max: 650,
      });
    }
    (await et(1200),
      w.animate([{ opacity: 1 }, { transform: "translateX(-30px)", opacity: 0 }], {
        duration: 240,
        easing: "ease-in",
        fill: "forwards",
      }),
      d.animate([{ opacity: 1 }, { transform: "translateX(40%)", opacity: 0 }], {
        duration: 260,
        easing: "ease-in",
        fill: "forwards",
      }),
      $t.animate([{ transform: "none" }, { transform: "translateY(-100%)" }], {
        duration: 280,
        easing: "ease-in",
        fill: "forwards",
      }),
      Wt.animate([{ transform: "none" }, { transform: "translateY(100%)" }], {
        duration: 280,
        easing: "ease-in",
        fill: "forwards",
      }),
      await r.animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 300,
        easing: "ease-in",
        fill: "forwards",
      }).finished);
  }
  const Hn = {
      144: "artikodin",
      145: "electhor",
      146: "sulfura",
      150: "mewtwo",
      151: "mew",
      243: "raikou",
      244: "entei",
      245: "suicune",
      249: "lugia",
      250: "hooh",
      251: "celebi",
      377: "regirock",
      378: "regice",
      379: "registeel",
      380: "latias",
      381: "latios",
      382: "kyogre",
      383: "groudon",
      384: "rayquaza",
      385: "jirachi",
      386: "deoxys",
      493: "arceus",
      480: "uxie",
      481: "mesprit",
      482: "azelf",
      483: "dialga",
      484: "palkia",
      485: "heatran",
      486: "regigigas",
      487: "giratina",
      48701: "giratina-origine",
      488: "cresselia",
      491: "darkrai",
      492: "shaymin",
      49201: "shaymin-celeste",
    },
    Kn = { cynthia: "cynthia", red: "red", blue: "blue" },
    Sn = (r) => (r.gym?.champion && Kn[r.sprite]) || null,
    ns = (r) => {
      const G = Is[r.gym?.type];
      return { title: e("Maître de la Ligue"), name: e(r.trainer), type: G?.fr, color: G?.color, zone: "" };
    },
    Ue = {
      "red-gyarados": {
        key: "leviator",
        id: 130,
        title: (r, G) => e("{mon} rouge · Niv. {n}", { mon: r.name, n: G }),
        node: { name: "Lac Colère", bg: "lake" },
      },
      spiritomb: {
        key: "spiritomb",
        id: 442,
        title: (r, G) => e("Rencontre unique · Niv. {n}", { n: G }),
        node: { name: "Tour Sacrée", bg: "prairie", scene: "sinnoh-tour-sacree" },
      },
    },
    Bt = (r, G) => Ue[G?.once]?.key || Hn[r] || Hn[r > 1e4 ? Math.floor(r / 100) : r] || null,
    st = (r) => ({
      type: Is[r.types[0]].fr,
      type2: r.types[1] ? Is[r.types[1]].fr : "",
      typec2: r.types[1] ? Is[r.types[1]].color : "",
    }),
    Zt = (r) => !!Bt(r);
  function va(r, G) {
    const be = Bt(r),
      ot = le.DEX[r];
    if (!be) return Promise.resolve();
    const $t = G
      ? ot.mythical
        ? e("Pokémon fabuleux · Niv. {n}", { n: G.level })
        : e("Pokémon légendaire · Niv. {n}", { n: G.level })
      : ot.mythical
        ? e("Pokémon fabuleux")
        : e("Pokémon légendaire");
    return Ce({
      player: 1,
      mon: be,
      ver: "full",
      title: $t,
      name: e(ot.name),
      ...st(ot),
      typec: Is[ot.types[0]].color,
      zone: G?.where ? e(G.where) : "",
    });
  }
  const Da = {
      kanto: [
        ["artikodin", "artikodin-mer-gelee"],
        ["electhor", "19-centrale-abandonnee"],
        ["sulfura", "sulfura-grotte-ardente"],
        ["blue", "38-maitre-blue"],
        ["mewtwo", "25-caverne-azuree"],
        ["mew", "jungle-x"],
      ],
      johto: [
        ["raikou", "johto-prairies"],
        ["entei", "johto-tour-cendree"],
        ["suicune", "johto-lac-colere-v2"],
        ["leviator", "johto-lac-colere-v2"],
        ["lugia", "johto-iles-tourbillon"],
        ["hooh", "johto-tour-carillon-v2"],
        ["celebi", "johto-bois-chenes-v2"],
        ["red", "johto-sommet-mont-argente"],
      ],
      hoenn: [
        ["regirock", "hoenn-ruines-desert"],
        ["regice", "hoenn-grotte-island"],
        ["registeel", "hoenn-tombeau-antique"],
        ["latias", "hoenn-ile-du-sud"],
        ["latios", "hoenn-ile-du-sud"],
        ["kyogre", "kyogre-arene-tempete"],
        ["groudon", "hoenn-grotte-terra"],
        ["rayquaza", "rayquaza-pilier-celeste"],
        ["jirachi", "hoenn-sommet-des-voeux-jirachi"],
        ["deoxys", "ile-aurore-deoxys"],
      ],
      sinnoh: [
        ["uxie", "sinnoh-caverne-savoir"],
        ["mesprit", "sinnoh-rive-lac-verite"],
        ["azelf", "sinnoh-caverne-courage"],
        ["spiritomb", "sinnoh-tour-sacree"],
        ["dialga", "sinnoh-colonnes-lances-portail"],
        ["palkia", "sinnoh-colonnes-lances-portail"],
        ["giratina", "sinnoh-grotte-retour"],
        ["cynthia", "sinnoh-salle-cynthia"],
        ["giratina-origine", "sinnoh-monde-distorsion"],
        ["heatran", "sinnoh-mont-abrupt"],
        ["regigigas", "sinnoh-temple-frimapic"],
        ["cresselia", "sinnoh-ile-pleine-lune"],
        ["darkrai", "sinnoh-ile-nouvellelune"],
        ["shaymin", "sinnoh-paradis-fleuri"],
        ["shaymin-celeste", "sinnoh-paradis-fleuri"],
        ["arceus", "sinnoh-arceus-sommet-sombre"],
      ],
    },
    la = (r) =>
      u.CHAPTERS.flatMap((G) => G.steps).find((G) => G.kind === "gym" && G.champion && G.sprite === r),
    Xa = (r) => Object.entries(Ue).find(([, G]) => G.key === r);
  function nn() {
    const r = le.S.cineSeen,
      G = [];
    for (const [be, ot] of Object.entries(Da)) {
      const $t = u.firstChapterOf(be);
      if ($t < 0) continue;
      const Wt = (le.S.adv?.unlocked ?? 0) < $t;
      for (const [d, i] of ot) {
        const w = { key: d, reg: be, scene: i, away: Wt },
          S = Object.keys(Kn).includes(d) && la(d),
          j = Xa(d);
        if (S)
          Object.assign(w, {
            kind: "champ",
            sprite: d,
            leader: S.leader,
            done: !!le.S.adv?.badges?.includes(S.badge),
          });
        else if (j)
          Object.assign(w, {
            kind: "once",
            id: j[1].id,
            shiny: d === "leviator",
            done: !!le.S.adv?.gifts?.[j[0]],
          });
        else {
          const me = +Object.keys(Hn).find((o) => Hn[o] === d);
          Object.assign(w, { kind: "mon", id: me, done: !!le.S.dex[me] });
        }
        ((w.known = w.done || (w.kind !== "champ" && !!(le.S.dex[w.id] || le.S.seen?.[w.id]))), G.push(w));
      }
    }
    r ||
      ((le.S.cineSeen = Object.fromEntries(G.filter((be) => be.done).map((be) => [be.key, 1]))), le.save());
    for (const be of G) be.fresh = be.done && !le.S.cineSeen[be.key];
    return G;
  }
  function F(r) {
    const G = nn().find((d) => d.key === r);
    if (!G?.done) return Promise.resolve();
    (((le.S.cineSeen ||= {})[r] = 1), le.save());
    const be = (d) => le.S.mons.filter((i) => i.id === d).sort((i, w) => w.level - i.level)[0];
    if (G.kind === "mon") return va(G.id, be(G.id));
    if (G.kind === "champ") {
      const d = la(G.sprite),
        i = Is[d.type];
      return Ce({
        player: 1,
        mon: r,
        ver: "full",
        title: e("Maître de la Ligue"),
        name: e(d.leader),
        type: i?.fr || "",
        typec: i?.color || "",
        zone: "",
      });
    }
    const ot = le.DEX[G.id],
      $t = Xa(r)[1],
      Wt = le.S.mons.find((d) => d.id === G.id && !!d.shiny == !!G.shiny) || be(G.id);
    return Ce({
      player: 1,
      mon: r,
      ver: "full",
      title: Wt ? $t.title({ ...ot, name: e(ot.name) }, Wt.level) : e("Rencontre unique"),
      name: e(ot.name),
      ...st(ot),
      typec: Is[ot.types[0]].color,
      zone: Wt?.where ? e(Wt.where) : "",
    });
  }
  function Ce(r, G = !0) {
    const be = new URLSearchParams(G ? { ...r, hold: 1 } : r),
      ot = f(
        `<div class="legend-intro replay"><iframe title="" tabindex="-1" src="${ie}#${be}"></iframe></div>`,
      ),
      $t = a("iframe", ot),
      Wt = () => {
        const d = Math.min(innerWidth, (innerHeight * 16) / 9);
        Object.assign($t.style, { width: d + "px", height: (d * 9) / 16 + "px" });
      };
    return (
      document.activeElement?.blur?.(),
      Wt(),
      document.body.appendChild(ot),
      new Promise((d) => {
        let i = !1;
        const w = () => {
            i ||
              ((i = !0),
              removeEventListener("message", S),
              removeEventListener("resize", Wt),
              clearTimeout(me),
              ot
                .animate([{ opacity: 1 }, { opacity: 0 }], {
                  duration: 240,
                  easing: "ease-in",
                  fill: "forwards",
                })
                .finished.then(() => {
                  (ot.remove(),
                    removeEventListener("keydown", j, !0),
                    removeEventListener("keyup", j, !0),
                    d());
                }));
          },
          S = (o) => {
            if (o.source !== $t.contentWindow) return;
            const n = o.data?.legendIntro;
            ["done", "error"].includes(n)
              ? w()
              : G && n === "loaded"
                ? $t.contentWindow.postMessage({ legendIntro: "go" }, "*")
                : G && n === "ready" && ($t.style.opacity = "");
          };
        G && ($t.style.opacity = 0);
        const j = (o) => {
            (o.preventDefault(), o.stopPropagation(), o.type === "keydown" && o.key === "Escape" && w());
          },
          me = Wa(w, 4e4);
        (addEventListener("message", S),
          addEventListener("resize", Wt),
          addEventListener("keydown", j, !0),
          addEventListener("keyup", j, !0),
          (ot.onpointerdown = w));
      })
    );
  }
  function Xe(r, G, be) {
    if (!r || !At() || le.S.reducedAnim || matchMedia("(prefers-reduced-motion: reduce)").matches)
      return null;
    const ot = a("#arena"),
      $t = (le.S.introsSeen ||= {}),
      Wt = !!$t[r],
      d = t.SCENES.resolve(G)?.src || "",
      i = (d.match(/scenes\/(.+)-710x400\.webp$/) || [])[1] || "",
      w = new URLSearchParams({
        player: 1,
        hold: 1,
        mon: r,
        ver: Wt ? "short" : "full",
        scene: i,
        title: be.title,
        name: be.name,
        type: be.type || "",
        typec: be.color || "",
        type2: be.type2 || "",
        typec2: be.typec2 || "",
        zone: be.zone || "",
      }),
      S = f(`<div class="legend-intro"><iframe title="" tabindex="-1" src="${ie}#${w}"></iframe></div>`),
      j = a("iframe", S);
    (Object.assign(S.style, {
      position: "absolute",
      inset: 0,
      zIndex: 200,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      background: "#000",
      opacity: 0,
      pointerEvents: "none",
    }),
      Object.assign(j.style, { border: 0, display: "block", pointerEvents: "none" }));
    const me = () => {
      const p = ot.clientWidth,
        y = ot.clientHeight,
        v = Math.min(p, (y * 16) / 9);
      Object.assign(j.style, { width: v + "px", height: (v * 9) / 16 + "px" });
    };
    (me(), ot.appendChild(S));
    const o = {},
      n = (p) => {
        p.source === j.contentWindow && p.data?.legendIntro && o[p.data.legendIntro]?.();
      };
    addEventListener("message", n);
    const s = (p, y) =>
        new Promise((v) => {
          const M = Wa(() => I("timeout"), y),
            I = (ke) => {
              (clearTimeout(M), p.forEach((Se) => delete o[Se]), v(ke));
            };
          p.forEach((ke) => {
            o[ke] = () => I(ke);
          });
        }),
      l = s(["loaded", "error"], 8e3),
      c = () => {
        (removeEventListener("message", n), S.remove());
      };
    return {
      async play() {
        if ((await l) !== "loaded" || !S.isConnected) return (c(), !1);
        me();
        const p = s(["ready", "error"], 3e3);
        if ((j.contentWindow.postMessage({ legendIntro: "go" }, "*"), (await p) !== "ready"))
          return (c(), !1);
        Object.assign(S.style, { opacity: 1, pointerEvents: "auto", cursor: "pointer" });
        const y = await Promise.race([
          s(["done"], 3e4),
          new Promise((v) => {
            S.onpointerdown = () => v("skip");
          }),
        ]);
        return (
          removeEventListener("message", n),
          ($t[r] = 1),
          le.save(),
          await S.animate([{ opacity: 1 }, { opacity: 0 }], {
            duration: y === "skip" ? 180 : 320,
            easing: "ease-in",
            fill: "forwards",
          }).finished,
          S.remove(),
          !0
        );
      },
    };
  }
  const Ve = async (r) => !!r && r.play();
  async function Rt(r) {
    if (!At()) return;
    const G = a("#arena"),
      be = r.kind === "gym",
      ot = le.S.trainer,
      $t = le.teamMons().find((l) => le.curHp(l) > 0) || le.teamMons()[0],
      Wt = ot?.sprite
        ? t.UI.trainerFace(ot.sprite, "vs-face", !0)
        : $t
          ? `<span class="tr-face vs-face">${se($t.id, $t.shiny, 2, 90)}</span>`
          : "",
      d = f(`<div class="vs-intro ${be ? "gym" : ""}">
        <div class="vs-card left">${Wt}<span class="vs-name">${H(ot?.name || e("Toi"))}</span></div>
        <div class="vs-card right">${t.UI.trainerFace(r.sprite, "vs-face")}<span class="vs-name">${H(e(r.trainer))}${be ? `<small>${H(e(r.gym.name))}</small>` : ""}</span></div>
        <div class="vs-text">VS</div>
      </div>`);
    G.appendChild(d);
    const [i, w] = b(".vs-card", d),
      S = a(".vs-text", d),
      j = re().pix(d, 3);
    for (const l of [i, w, S]) l.style.opacity = 0;
    const me = (l, c) =>
      l.animate(
        [
          { transform: `translateX(${c}px) scale(.9, 1.1)`, opacity: 0 },
          { transform: "translateX(0) scale(1.12, .9)", opacity: 1, offset: 0.7 },
          { transform: "scale(.97, 1.03)", offset: 0.85 },
          { transform: "none", opacity: 1 },
        ],
        { duration: 380, easing: "cubic-bezier(.2,.8,.3,1)", fill: "both" },
      );
    (t.Sfx.whoosh(),
      d.animate([{ backgroundColor: "rgba(5,7,12,0)" }, { backgroundColor: "rgba(5,7,12,.72)" }], {
        duration: 260,
        fill: "forwards",
      }));
    const o = G.clientWidth * 0.5,
      n = [me(i, -o), me(w, o)];
    i.style.opacity = w.style.opacity = "";
    {
      const l = d.getBoundingClientRect(),
        c = { x: l.width / 2, y: l.height / 2 },
        p = (y) => {
          const v = y.getBoundingClientRect();
          return { x: v.left - l.left + v.width / 2, y: v.top - l.top + v.height * 0.35 };
        };
      Wa(() => {
        const y = p(i),
          v = p(w);
        (j.clash(y.x, y.y, c.x, c.y, 500, j.PAL.of("#3fa9ff")),
          j.clash(v.x, v.y, c.x, c.y, 500, be ? j.PAL.gold : j.PAL.ball));
      }, 250);
    }
    (await Promise.all(n.map((l) => l.finished)),
      t.Sfx.bonk(),
      be && t.Sfx.legendary(),
      re().shake(G, 6, 300));
    const s = f('<div class="flash-overlay" style="background:#fff"></div>');
    (d.appendChild(s),
      s.animate([{ opacity: 0.8 }, { opacity: 0 }], 300).finished.then(() => s.remove()),
      (S.style.opacity = ""),
      await S.animate(
        [
          { transform: "translate(-50%,-50%) scale(3)", opacity: 0 },
          { transform: "translate(-50%,-50%) scale(1.35, .7)", opacity: 1, offset: 0.55 },
          { transform: "translate(-50%,-50%) scale(.9, 1.12)", offset: 0.78 },
          { transform: "translate(-50%,-50%) scale(1)", opacity: 1 },
        ],
        { duration: 360, easing: "ease-out", fill: "both" },
      ).finished);
    {
      const l = S.getBoundingClientRect(),
        c = d.getBoundingClientRect(),
        p = l.left - c.left + l.width / 2,
        y = l.top - c.top + l.height / 2;
      (j.rays(p, y, 22, j.PAL.gold, 18),
        j.rays(p, y, 10, j.PAL.white, 12),
        j.burst(p, y, 10, 3, { pal: j.PAL.of("#3fa9ff"), grav: 0.05 }),
        j.burst(p, y, 10, 3, { pal: be ? j.PAL.gold : j.PAL.ball, grav: 0.05 }));
    }
    for (const l of [i, w])
      l.animate([{ transform: "none" }, { transform: "scale(1.08, .92)" }, { transform: "none" }], {
        duration: 220,
        easing: "ease-out",
      });
    (await et(be ? 1100 : 750),
      i.animate(
        [
          { transform: "none", opacity: 1 },
          { transform: `translateX(${-o}px)`, opacity: 0 },
        ],
        { duration: 260, easing: "ease-in", fill: "forwards" },
      ),
      w.animate(
        [
          { transform: "none", opacity: 1 },
          { transform: `translateX(${o}px)`, opacity: 0 },
        ],
        { duration: 260, easing: "ease-in", fill: "forwards" },
      ),
      S.animate(
        [
          { transform: "translate(-50%,-50%) scale(1)", opacity: 1 },
          { transform: "translate(-50%,-50%) scale(.2)", opacity: 0 },
        ],
        { duration: 240, easing: "ease-in", fill: "forwards" },
      ),
      await d.animate([{ backgroundColor: "rgba(5,7,12,.72)" }, { backgroundColor: "rgba(5,7,12,0)" }], {
        duration: 300,
        fill: "forwards",
      }).finished,
      d.remove());
  }
  async function da(r, G = !0) {
    const be = a("#trainer-slot");
    if ((a("#arena").classList.toggle("has-trainer", !!r), !r)) {
      be.innerHTML = "";
      return;
    }
    if (a(".trainer", be)?.dataset.sprite === r) return;
    ((be.innerHTML = `<div class="trainer" data-sprite="${r}"><img alt=""></div>`),
      await t.UI.setSprite(a("img", be), `assets/trainers/${r}.png`, "--kt"));
    const ot = a(".trainer", be);
    if (!(!G || !At()))
      return ot.animate(
        [
          { transform: "translateX(140%)", opacity: 0 },
          { transform: "translateX(-6%) scale(1.05, .95)", opacity: 1, offset: 0.7 },
          { transform: "translateX(0) scale(1)" },
        ],
        { duration: 520 / Ee(), easing: "cubic-bezier(.2,.8,.3,1)" },
      ).finished;
  }
  async function ia() {
    const r = a("#trainer-slot .trainer");
    r &&
      (At() &&
        (await r.animate(
          [
            { transform: "translateX(0)", opacity: 1 },
            { transform: "translateX(140%)", opacity: 0 },
          ],
          { duration: 380 / Ee(), easing: "ease-in", fill: "forwards" },
        ).finished),
      (a("#trainer-slot").innerHTML = ""),
      a("#arena").classList.remove("has-trainer"));
  }
  async function Ja(r, G) {
    const be = a("img", r);
    (t.Sfx.throw(), be.animate(ae, { duration: 420 / Ee(), easing: "ease-out" }), await et(150));
    const ot = pn(r);
    return ((ot.y -= r.getBoundingClientRect().height * 0.15), Ia(ot, G));
  }
  async function Ia(r, G) {
    const be = pn(G),
      ot = a("#arena-fx"),
      $t = re().pix(ot),
      Wt = f('<img class="tball" src="assets/items/poke-ball.png" alt="">');
    (Object.assign(Wt.style, { left: r.x + "px", top: r.y + "px" }), ot.appendChild(Wt));
    const d = be.x - r.x,
      i = be.y - r.y;
    return (
      await Wt.animate(
        [
          { transform: "translate(0,0) rotate(0) scale(.8, 1.2)" },
          { transform: `translate(${d * 0.5}px, ${i * 0.5 - 70}px) rotate(-360deg) scale(1.1, .9)` },
          { transform: `translate(${d}px, ${i}px) rotate(-720deg) scale(.85, 1.15)` },
        ],
        { duration: 420 / Ee(), easing: "ease-in" },
      ).finished,
      await Wt.animate(
        [
          { transform: `translate(${d}px, ${i}px) scale(1.35, .7)` },
          { transform: `translate(${d}px, ${i}px) scale(1.5) `, filter: "brightness(2)" },
        ],
        { duration: 90 / Ee(), fill: "forwards" },
      ).finished,
      Wt.remove(),
      t.Sfx.open(),
      $t.ring(be.x, be.y, 70, 380 / Ee(), $t.PAL.ball),
      $t.ring(be.x, be.y, 44, 300 / Ee()),
      $t.burst(be.x, be.y, 14, 2.2, { pal: $t.PAL.ball, round: !0, grav: 0.04 }),
      $t.burst(be.x, be.y, 6, 1.6, { pal: $t.PAL.gold, grav: 0, drag: 0.92, max: 420 }),
      be
    );
  }
  const ka = (r, G) => (r.closest(".ally") ? "scaleX(-1) " : "") + G;
  async function Za(r, G = pn(r)) {
    const be = 220 / Ee();
    return (
      re().pix(a("#arena-fx")).gather(r, G.x, G.y, be),
      (r.style.opacity = 0),
      await ue(be * 0.8),
      (r.style.opacity = ""),
      r.animate(
        [
          { transform: ka(r, "scale(.6, 1.3)"), filter: "brightness(0) invert(1)" },
          { transform: ka(r, "scale(1.25, .8)"), filter: "brightness(0) invert(1)", offset: 0.4 },
          { transform: ka(r, "scale(.94, 1.06)"), filter: "brightness(0) invert(1)", offset: 0.65 },
          { transform: ka(r, "scale(1)"), filter: "none" },
        ],
        { duration: 380 / Ee(), easing: "ease-out" },
      ).finished
    );
  }
  async function En(r, G, be) {
    await r.ready;
    const ot = a("img", r);
    if (!At()) {
      r.style.opacity = "";
      return;
    }
    const $t = await Ia(G, ot);
    ((r.style.opacity = ""), be && Wa(() => Fa(ot), 500), await Za(ot, $t));
  }
  async function bn() {
    const r = a("#enemy-slot .enemy img");
    !r ||
      !At() ||
      (await r.animate([{ scale: "1 1" }, { scale: "1.25 .75", offset: 0.6 }, { scale: "1.2 .8" }], {
        duration: 160 / Ee(),
        easing: "ease-out",
        fill: "forwards",
      }).finished,
      await re()
        .pix(a("#arena-fx"))
        .runOff(
          r,
          1,
          (G, be) =>
            r.animate(
              [
                { scale: "1.2 .8", translate: "0 0" },
                { scale: "1.4 .85", translate: `${G * 0.15}px 0`, offset: 0.2 },
                { scale: "1.6 .8", translate: `${G}px 0` },
              ],
              { duration: be, easing: "cubic-bezier(.5,0,.9,.6)", fill: "forwards" },
            ).finished,
          340 / Ee(),
        ),
      (r.style.opacity = 0),
      await et(300));
  }
  async function an(r, G) {
    if (!At()) return;
    const be = a("#arena-fx"),
      ot = re().pix(be),
      $t = a("img", r),
      Wt = $t.getBoundingClientRect(),
      d = be.getBoundingClientRect(),
      i = pn($t),
      w = G || { x: i.x, y: i.y - 120 },
      S = w.x < i.x ? 1 : -1;
    $t.style.transformOrigin = "50% 100%";
    const j = (ke, Se, Ae = 0, St = 1, Jt = 1) =>
        `translate(${ke - 21}px, ${Se - 21}px) rotate(${Ae}deg) scale(${St}, ${Jt})`,
      me = f('<img class="ti-ball" src="assets/items/poke-ball.png" alt="">');
    (Object.assign(me.style, { width: "42px", height: "42px" }),
      (me.style.zIndex = 6),
      be.appendChild(me),
      t.Sfx.throw?.());
    const o = { x: (w.x + i.x) / 2, y: Math.min(w.y, i.y) - 70 },
      n = 16;
    await me.animate(
      Array.from({ length: n + 1 }, (ke, Se) => {
        const Ae = Se / n,
          St = 1 - Ae;
        return {
          transform: j(
            St * St * w.x + 2 * St * Ae * o.x + Ae * Ae * i.x,
            St * St * w.y + 2 * St * Ae * o.y + Ae * Ae * i.y,
            S * 720 * Ae,
          ),
        };
      }),
      { duration: 380 / Ee(), easing: "linear", fill: "forwards" },
    ).finished;
    for (const ke of b(".mini-hp, .mini-lv", r))
      ke.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 140 / Ee(), fill: "forwards" });
    (t.Sfx.bonk?.(),
      ot.ring(i.x, i.y, 40, 300 / Ee()),
      ot.burst(i.x, i.y, 8, 1.8, { grav: 0.05 }),
      await Promise.all([
        me.animate(
          [{ transform: j(i.x, i.y) }, { transform: j(i.x, i.y, 0, 1.35, 0.65) }, { transform: j(i.x, i.y) }],
          { duration: 140 / Ee(), easing: "ease-out", fill: "forwards" },
        ).finished,
        $t.animate([{ scale: "1 1" }, { scale: "1.3 .7" }, { scale: ".9 1.1" }], {
          duration: 140 / Ee(),
          easing: "ease-out",
          fill: "forwards",
        }).finished,
      ]));
    const s = i.x - S * 22,
      l = i.y - 70;
    (me.animate(
      [{ transform: j(i.x, i.y) }, { transform: j(s, l, -S * 40), easing: "cubic-bezier(.2,.9,.3,1)" }],
      { duration: 320 / Ee(), fill: "forwards" },
    ),
      await et(200),
      me.classList.add("open"),
      t.Sfx.open?.());
    const c = { x: Wt.left - d.left + Wt.width / 2, y: Wt.bottom - d.top },
      p = s - c.x,
      y = l - c.y,
      v = !!r.closest(".fainted, .ko"),
      M = "brightness(0) invert(1)",
      I = v ? "#ff3b3b" : "#fff";
    if (
      (Wa(() => ot.dissolve($t, s, l, 420 / Ee()), 160 / Ee()),
      await $t.animate(
        [
          {
            scale: ".9 1.1",
            filter: v ? `${M} drop-shadow(0 0 6px ${I})` : "brightness(1)",
            translate: "0 0",
          },
          { scale: "1.15 .9", filter: `${M} drop-shadow(0 0 6px ${I})`, translate: "0 0", offset: 0.3 },
          {
            scale: ".6 1.5",
            filter: `${M} drop-shadow(0 0 10px ${I})`,
            translate: `${p * 0.3}px ${y * 0.3}px`,
            offset: 0.6,
            easing: "cubic-bezier(.6,0,.9,.4)",
          },
          { scale: "0 0", filter: M, translate: `${p}px ${y}px` },
        ],
        { duration: 560 / Ee(), fill: "forwards" },
      ).finished,
      me.classList.remove("open"),
      t.Sfx.shut?.(),
      ot.burst(s, l, 6, 1.2, { grav: 0, drag: 0.9, max: 300 }),
      await me.animate(
        [{ transform: j(s, l, -S * 40) }, { transform: j(s, l, -S * 20, 1.3, 1.3) }, { transform: j(s, l) }],
        { duration: 160 / Ee(), easing: "ease-out", fill: "forwards" },
      ).finished,
      G)
    ) {
      const ke = { x: (s + w.x) / 2, y: Math.min(l, w.y) - 40 };
      await me.animate(
        Array.from({ length: n + 1 }, (Se, Ae) => {
          const St = Ae / n,
            Jt = 1 - St;
          return {
            transform: j(
              Jt * Jt * s + 2 * Jt * St * ke.x + St * St * w.x,
              Jt * Jt * l + 2 * Jt * St * ke.y + St * St * w.y,
              -S * 540 * St,
              1 - St * 0.5,
              1 - St * 0.5,
            ),
          };
        }),
        { duration: 340 / Ee(), easing: "linear", fill: "forwards" },
      ).finished;
    } else
      await me.animate(
        [
          { transform: j(s, l), opacity: 1 },
          { transform: j(s, l, 0, 0, 0), opacity: 0 },
        ],
        { duration: 160 / Ee(), fill: "forwards" },
      ).finished;
    me.remove();
  }
  const Wn = (r) => {
      const G = a(`#team-rail .tr-row[data-uid="${r}"]`);
      return G ? pn(G) : { x: 0, y: a("#arena").clientHeight * 0.6 };
    },
    wn = () => ({ x: a("#arena").clientWidth + 30, y: a("#arena").clientHeight * 0.35 });
  async function Bn(r) {
    const G = r.map(Ha).filter(Boolean),
      be = a("#ally-slots .hero");
    de = !1;
    let ot = null;
    const $t = () =>
      (ot ||= (async () => {
        (be &&
          At() &&
          (await be.animate(
            [
              { transform: "none", opacity: 1 },
              { transform: "translateX(-160%)", opacity: 0 },
            ],
            { duration: 420 / Ee(), easing: "ease-in", fill: "forwards" },
          ).finished),
          be?.remove());
      })());
    if (G.length) {
      r.length === 1 &&
        Z <= 2 &&
        $e.length > 1 &&
        fa(e("Vas-y, <b>{mon}</b> !", { mon: H(le.DEX[le.getMon(r[0]).id].name) }));
      const Wt = () => {
        if (!be) return null;
        const d = pn(be);
        return ((d.y -= be.getBoundingClientRect().height * 0.2), d);
      };
      (await be?.ready,
        await Promise.all(
          G.map(async (d, i) => {
            (await et(i * 160),
              be && a("img", be).animate(aa, { duration: 420 / Ee(), easing: "ease-out" }),
              t.Sfx.throw());
            const w = le.getMon(d.dataset.uid),
              S = En(d, Wt() || Wn(d.dataset.uid), w?.shiny);
            (i === G.length - 1 && Wa($t, 180 / Ee()), await S);
          }),
        ));
    }
    await $t();
  }
  async function C(r) {
    if (r.side === "enemy") {
      if (
        (b("#enemy-slot .enemy:not(.fxclone)").forEach((d) => {
          (d.dataset.uid === r.out || d.dataset.uid === r.mon?.uid) && d.remove();
        }),
        !r.mon)
      )
        return;
      (We.includes(r.mon) || We.push(r.mon),
        fa(
          e("{trainer} envoie <b>{mon}</b> !", {
            trainer: H(e(r.trainer || "")),
            mon: H(le.DEX[r.mon.id].name),
          }),
        ));
      const Wt = a("#enemy-slot").appendChild(Et(r.mon, r.slot));
      ((Wt.style.opacity = 0), t.Sfx.throw(), await En(Wt, wn(), r.mon.shiny), await et(200));
      return;
    }
    const G = r.out && le.getMon(r.out),
      be = r.uid && le.getMon(r.uid),
      ot = r.out && Ha(r.out);
    for (
      ot &&
        (!r.outKo && G && fa(e("{mon}, reviens !", { mon: H(le.DEX[G.id].name) })),
        G && (await an(ot, Wn(G.uid))),
        ot.remove()),
        $e[r.slot] = r.uid || null;
      $e.length && !$e[$e.length - 1];
    )
      $e.pop();
    if (
      ((J = ""),
      b("#ally-slots .ally").forEach((Wt) => {
        (!$e.includes(Wt.dataset.uid) || Wt.dataset.uid === r.uid) && Wt.remove();
      }),
      Fn(),
      !be)
    )
      return;
    fa(
      r.outKo
        ? e("À toi, <b>{mon}</b> !", { mon: H(le.DEX[be.id].name) })
        : e("Vas-y, <b>{mon}</b> !", { mon: H(le.DEX[be.id].name) }),
    );
    const $t = a("#ally-slots").appendChild(Be(be, r.slot));
    (($t.style.opacity = 0), await En($t, Wn(be.uid), be.shiny), await et(200));
  }
  let g = "",
    E = 1,
    q = 52,
    Pe = null,
    at = 0,
    Mt = 0;
  const Pa = new Set(),
    Ta = (r) => (E === 2 ? t.UI.fitScale(r, q - 8) : 1),
    La = () => !!ve.state.tower && !!De()?.run();
  let xa = null,
    en = 0;
  function rn() {
    const r = a("#team-rail");
    if (!r) return;
    const G = La();
    let be = le.teamMons().filter(($t) => !Pa.has($t.uid));
    if (G) {
      const $t = be
        .filter((Wt) => $e.includes(Wt.uid))
        .sort((Wt, d) => $e.indexOf(Wt.uid) - $e.indexOf(d.uid));
      be = $t.length ? $t : be.slice(0, Z || 1);
    }
    const ot =
      E + "/" + (G ? "T/" : "") + be.map(($t) => $t.uid + ":" + $t.id + ($t.shiny ? "s" : "")).join("|");
    (ot !== g &&
      !Pe &&
      ((g = ot),
      (r.innerHTML =
        be
          .map(
            (
              $t,
            ) => `<div class="tr-row" data-uid="${$t.uid}" data-team-uid="${$t.uid}" title="${H(G ? le.DEX[$t.id].name : e("{mon} — touche pour l'envoyer, glisse pour changer l'ordre", { mon: le.DEX[$t.id].name }))}">
          ${se($t.id, $t.shiny, Ta($t.id), 56 * Ta($t.id))}${$t.shiny ? '<i class="shiny-ico"></i>' : ""}${t.UI.rankTag($t)}<span class="tr-st" hidden></span><span class="tr-lv">${e("Nv. {n}", { n: $t.level })}</span><div class="tr-hp"><i></i></div><div class="tr-xp"><i></i></div>
        </div>`,
          )
          .join("") +
        (G
          ? '<div class="tr-row tr-left"><img src="assets/items/poke-ball.png" alt=""><b></b><div class="tr-hp"><i></i></div></div>'
          : "")),
      Pt()),
      G || (xa = null),
      Fn());
  }
  function hn() {
    const r = a("#team-rail .tr-left");
    if (!r) return;
    const G = De().left(),
      be = Math.max(1, De().fit()),
      ot = a("b", r);
    ot.textContent !== String(G) &&
      ((ot.textContent = G),
      (r.title = e("{n}/{all} Pokémon debout", { n: G, all: be })),
      r.classList.toggle("last", G <= 1),
      (a(".tr-hp i", r).style.width = Math.min(100, (G / be) * 100) + "%"));
    const $t = De().run()?.floor ?? 0;
    if (xa != null && G < xa && $t === en) {
      r.animate(
        [
          { transform: "none" },
          { transform: "scale(1.12, .9)", offset: 0.35 },
          { transform: "scale(.96, 1.05)", offset: 0.7 },
          { transform: "none" },
        ],
        { duration: 320, easing: "ease-out" },
      );
      const Wt = document.createElement("span");
      ((Wt.className = "tr-minus"),
        (Wt.textContent = "−" + (xa - G)),
        (Wt.style.top = r.offsetTop + r.offsetHeight / 2 + "px"),
        a("#team-rail").append(Wt),
        Wa(() => Wt.remove(), 950));
    }
    ((xa = G), (en = $t));
  }
  function Fn() {
    hn();
    for (const r of b("#team-rail .tr-row[data-uid]")) {
      const G = le.getMon(r.dataset.uid);
      if (!G) continue;
      r.classList.toggle("ko", It(G) <= 0);
      const be = a(".tr-st", r);
      (be &&
        ((be.hidden = !G.status),
        G.status && ((be.textContent = Cs(G.status).tag), (be.style.background = Cs(G.status).color))),
        r.classList.toggle("active", $e.includes(G.uid)));
      const ot = e("Nv. {n}", { n: h(G) }),
        $t = a(".tr-lv", r);
      ($t.textContent !== ot && ($t.textContent = ot), r.classList.toggle("lv-capped", le.lvl(G) < G.level));
      const Wt = It(G) / le.maxHp(G),
        d = a(".tr-hp i", r);
      ((d.style.width = Wt * 100 + "%"),
        (d.style.background = Kt(Wt)),
        (a(".tr-xp i", r).style.width =
          (G.uid in Pn ? Pn[G.uid] : le.capped(G) ? 100 : (G.xp / le.xpForNext(G.level, G)) * 100) + "%"));
    }
  }
  function Ln(r, G, be) {
    for (const $t of new Set([le.activeTeam(), le.plannedTeam()]))
      !$t.includes(r) ||
        !$t.includes(G) ||
        ($t.splice($t.indexOf(r), 1), $t.splice($t.indexOf(G) + (be ? 1 : 0), 0, r));
    (le.save(),
      t.Sfx.click(),
      (g = ""),
      rn(),
      !ve.state.battle && !We.length && (($e = _e ? Ua() : sn()), ea()),
      a(`#team-rail .tr-row[data-uid="${r}"]`)?.animate(
        [
          { transform: "scale(1.12, .9)" },
          { transform: "scale(.96, 1.05)", offset: 0.5 },
          { transform: "none" },
        ],
        { duration: 260, easing: "ease-out" },
      ));
  }
  const Pn = {},
    jn = {},
    h = (r) => (r.uid in jn ? jn[r.uid] : le.lvl(r));
  async function k(r) {
    const G = a(`#team-rail .tr-row[data-uid="${r.uid}"]`),
      be = async () => {
        if ((delete Pn[r.uid], r.levels)) {
          delete jn[r.uid];
          const i = G && a(".tr-xp i", G);
          (i &&
            ((i.style.width = "100%"),
            await et(280),
            (i.style.transition = "none"),
            (i.style.width = "0%"),
            i.offsetWidth,
            (i.style.transition = "")),
            Ds(r.uid, r.level),
            Ls());
        }
        (Fn(), r.evolve && t.UI.proposeEvolution(r.evolve));
      };
    if (!G || !At() || !r.amount) return be();
    const ot = pn(G),
      $t = G.offsetWidth / 2,
      Wt = f(
        `<div class="xp-pop${r.active ? " bonus" : ""}">+${vt(r.amount)} <small>${e("XP")}${r.active ? ` ×${String(P.XP_ACTIVE_BONUS).replace(".", ",")}` : ""}</small></div>`,
      );
    (Object.assign(Wt.style, { left: ot.x + $t + 8 + "px", top: ot.y + "px" }),
      a("#arena-fx").appendChild(Wt),
      await Wt.animate(
        [
          { transform: "translate(-30%, -50%) scale(.3)", opacity: 0 },
          { transform: "translate(0, -50%) scale(1.2)", opacity: 1, offset: 0.6 },
          { transform: "translate(0, -50%) scale(1)", opacity: 1 },
        ],
        { duration: 260, easing: "ease-out" },
      ).finished,
      await et(380));
    const d = -($t + 8) - Wt.offsetWidth / 2;
    (await Wt.animate(
      [
        { transform: "translate(0, -50%) scale(1)", opacity: 1 },
        { transform: `translate(${d}px, -50%) scale(.35)`, opacity: 0.2 },
      ],
      { duration: 260 / Ee(), easing: "cubic-bezier(.5,0,.9,.6)", fill: "forwards" },
    ).finished,
      Wt.remove(),
      t.Sfx.click(),
      G.animate(
        [
          { transform: "scale(1.1, .92)", filter: "brightness(1.6)" },
          { transform: "scale(.97, 1.03)", offset: 0.5 },
          { transform: "none", filter: "none" },
        ],
        { duration: 260, easing: "ease-out" },
      ),
      await be());
  }
  async function ne(r, G, be) {
    const ot = r.candy,
      $t = ot.mon ? le.famHead(ot.mon.id) : ot.family,
      Wt = H(le.DEX[$t].name),
      d = t.UI.fedXp(ot.fed);
    fa(
      d
        ? e("Doublon ! <b>{mon}</b> se change en {n} XP pour sa famille.", { mon: be, n: vt(d) })
        : e("Doublon ! <b>{mon}</b> ne rapporte rien : sa famille est au niveau max.", { mon: be }),
    );
    const i = () =>
        X(
          d
            ? e("Doublon : +{n} XP pour la famille {fam}", { n: vt(d), fam: Wt })
            : e("Doublon : famille {fam} au niveau max", { fam: Wt }),
          B($t),
          "reward",
        ),
      w = a("#arena-fx"),
      S = () => re().pix(w).PAL.of("#c8ec3c");
    let j = G ? pn(G) : { x: a("#arena").clientWidth * 0.75, y: a("#arena").clientHeight * 0.55 };
    if (At() && !yt()) {
      (G &&
        (G.getAnimations().forEach((s) => s.cancel()),
        (G.style.filter = ""),
        a("#enemy-slot .enemy")?.classList.add("in-ball"),
        (j = await ft((s) => re().quick(a("#arena"), a("#arena-fx"), G, { speed: Ee(), ...s })))),
        t.Sfx.buy());
      const o = re().pix(w);
      (o.ring(j.x, j.y, 46, 360, S()),
        o.burst(j.x, j.y, 12, 2, { pal: S(), round: !0, grav: 0.04 }),
        o.burst(j.x, j.y, 8, 1.8, { pal: o.PAL.gold, grav: 0.03, drag: 0.93, max: 600 }));
      for (let s = 0; s < 3; s++)
        Wa(() => o.star(j.x + (Math.random() - 0.5) * 50, j.y - 20 - Math.random() * 30), 80 + s * 120);
      const n = f(
        `<div class="xp-pop dup"><small class="dup-tag">${e("Doublon")}</small>${d ? `+${vt(d)} <small>${e("XP")}</small>` : e("Niveau max")}</div>`,
      );
      (Object.assign(n.style, { left: j.x + "px", top: j.y + "px" }),
        w.appendChild(n),
        await n.animate(
          [
            { transform: "translate(-50%, -50%) scale(0)" },
            { transform: "translate(-50%, -120%) scale(1.3)", offset: 0.6 },
            { transform: "translate(-50%, -100%) scale(1)" },
          ],
          { duration: 360, easing: "ease-out", fill: "forwards" },
        ).finished,
        await et(450),
        n
          .animate(
            [
              { transform: "translate(-50%, -100%) scale(1)", opacity: 1 },
              { transform: "translate(-50%, -90%) scale(1.25, .8)", opacity: 1, offset: 0.3 },
              { transform: "translate(-50%, -70%) scale(0)", opacity: 0 },
            ],
            { duration: 240, easing: "ease-in", fill: "forwards" },
          )
          .finished.then(() => n.remove()),
        await et(120));
    } else i();
    const me = t.UI.fedXp(ot.fed.filter((o) => !a(`#team-rail .tr-row[data-uid="${o.uid}"]`)));
    await Promise.all([
      Ie(j, me),
      ...ot.fed.map(async (o, n) => {
        const s = a(`#team-rail .tr-row[data-uid="${o.uid}"]`);
        if (s && At() && !yt()) {
          await et(n * 120);
          const l = pn(s),
            c = l.x - j.x,
            p = l.y - j.y;
          (await Promise.all(
            [0, 1, 2, 3, 4].map(async (y) => {
              await et(y * 55);
              const v = f('<div class="xp-ball"></div>'),
                M = 40 + Math.random() * 50,
                I = (Math.random() - 0.5) * 60;
              (Object.assign(v.style, {
                left: j.x + (Math.random() - 0.5) * 24 + "px",
                top: j.y + (Math.random() - 0.5) * 16 + "px",
              }),
                w.appendChild(v),
                await v.animate(
                  [
                    { transform: "translate(-50%, -50%) scale(.3)", opacity: 0 },
                    {
                      transform: `translate(calc(-50% + ${c * 0.45 + I}px), calc(-50% + ${p * 0.45 - M}px)) scale(1.15)`,
                      opacity: 1,
                      offset: 0.45,
                    },
                    {
                      transform: `translate(calc(-50% + ${c}px), calc(-50% + ${p}px)) scale(.5)`,
                      opacity: 0.9,
                    },
                  ],
                  { duration: (420 + y * 30) / Ee(), easing: "ease-in", fill: "forwards" },
                ).finished,
                v.remove());
            }),
          ),
            re().pix(w).burst(l.x, l.y, 8, 1.4, { pal: S(), round: !0, grav: 0.04 }));
        }
        await k(o);
      }),
    ]);
  }
  async function Ie(r, G) {
    const be = a('#tabs [data-screen="team"] .ic'),
      ot = be?.getBoundingClientRect();
    if (!G || !ot?.width || !At() || yt()) return;
    const $t = a("#arena").getBoundingClientRect(),
      Wt = $t.left + r.x,
      d = $t.top + r.y,
      i = ot.left + ot.width / 2,
      w = ot.top + ot.height / 2,
      S = i - Wt,
      j = w - d;
    (await Promise.all(
      [0, 1, 2, 3, 4].map(async (o) => {
        await et(o * 55);
        const n = f('<div class="xp-ball xp-page"></div>'),
          s = 40 + Math.random() * 50,
          l = (Math.random() - 0.5) * 60;
        (Object.assign(n.style, {
          left: Wt + (Math.random() - 0.5) * 24 + "px",
          top: d + (Math.random() - 0.5) * 16 + "px",
        }),
          document.body.appendChild(n),
          await n.animate(
            [
              { transform: "translate(-50%, -50%) scale(.3)", opacity: 0 },
              {
                transform: `translate(calc(-50% + ${S * 0.45 + l}px), calc(-50% + ${j * 0.45 - s}px)) scale(1.15)`,
                opacity: 1,
                offset: 0.45,
              },
              { transform: `translate(calc(-50% + ${S}px), calc(-50% + ${j}px)) scale(.5)`, opacity: 0.9 },
            ],
            { duration: (520 + o * 30) / Ee(), easing: "ease-in", fill: "forwards" },
          ).finished,
          n.remove());
      }),
    ),
      t.Sfx.click(),
      be.closest("button").animate(
        [
          { transform: "none", filter: "none" },
          { transform: "scale(1.12)", filter: "brightness(1.5)", offset: 0.4 },
          { transform: "none", filter: "none" },
        ],
        { duration: 320, easing: "ease-out" },
      ));
    const me = f(`<div class="xp-pop xp-page">+${vt(G)} <small>${e("XP")}</small></div>`);
    (Object.assign(me.style, { left: i + "px", top: ot.top + "px" }),
      document.body.appendChild(me),
      await me.animate(
        [
          { transform: "translate(-50%, -40%) scale(.3)", opacity: 0 },
          { transform: "translate(-50%, -110%) scale(1.15)", opacity: 1, offset: 0.25 },
          { transform: "translate(-50%, -150%) scale(1)", opacity: 1, offset: 0.75 },
          { transform: "translate(-50%, -190%) scale(1)", opacity: 0 },
        ],
        { duration: 1100, easing: "ease-out", fill: "forwards" },
      ).finished,
      me.remove());
  }
  function Le(r) {
    const G = r.dataset.uid,
      be = le.getMon(G);
    if (be) {
      if (It(be) <= 0 || $e.includes(G)) {
        (It(be) <= 0 && t.Sfx.error(),
          r.animate(
            [
              { transform: "translateX(0)" },
              { transform: "translateX(5px)" },
              { transform: "translateX(-4px)" },
              { transform: "none" },
            ],
            240,
          ));
        return;
      }
      (ve.state.battle && (ve.state.battle.pick = G), Ln(G, le.activeTeam()[0], !1));
    }
  }
  function Pt() {
    const r = a("#team-rail"),
      G = parseFloat(getComputedStyle(r).rowGap) || 4,
      be = a("#arena"),
      ot = parseFloat(getComputedStyle(be).getPropertyValue("--hud-bottom")) || 0,
      $t = a(".scene-bar", be);
    $t && !a(".sb-pill.open", $t) && (Mt = $t.offsetHeight);
    const Wt = $t && Mt ? $t.offsetTop + Mt : 0,
      d = Math.max(0, Math.max(ot, Wt) + 8 - r.offsetTop),
      i = Math.max(P.TEAM_SIZE, b(".tr-row", r).length),
      w = Math.max(28, Math.min(P.RAIL_TILE_MAX, Math.floor((r.clientHeight - d - G * (i - 1)) / i))),
      S = Math.max(1, b(".tr-row", r).length),
      j = S * w + (S - 1) * G;
    ((r.style.paddingTop = Math.max(d, (be.clientHeight - j) / 2 - r.offsetTop) + "px"),
      be.style.setProperty("--tile", w + "px"),
      (q = w));
    const me = w >= 56 ? 2 : 1;
    me !== E && ((E = me), rn());
  }
  function Nt() {
    const r = a("#team-rail");
    (new ResizeObserver(Pt).observe(r),
      r.addEventListener("pointerdown", (be) => {
        const ot = be.target.closest(".tr-row");
        if (!ot || be.button > 0 || document.body.classList.contains("swap-mode") || La()) return;
        const $t = b(".tr-row", r),
          Wt = $t.length > 1 ? $t[1].offsetTop - $t[0].offsetTop : ot.offsetHeight;
        Pe = {
          row: ot,
          rows: $t,
          from: $t.indexOf(ot),
          to: $t.indexOf(ot),
          y0: be.clientY,
          step: Wt,
          id: be.pointerId,
          moved: !1,
        };
        try {
          ot.setPointerCapture(be.pointerId);
        } catch {}
      }),
      r.addEventListener("pointermove", (be) => {
        if (!Pe || be.pointerId !== Pe.id) return;
        const ot = be.clientY - Pe.y0;
        if (!Pe.moved && Math.abs(ot) < 6) return;
        Pe.moved || ((Pe.moved = !0), Pe.row.classList.add("dragging"), r.classList.add("sorting"));
        const { rows: $t, from: Wt, step: d, row: i } = Pe,
          w = Math.max(-Wt * d, Math.min(($t.length - 1 - Wt) * d, ot));
        i.style.transform = `translateY(${w}px) scale(1.06)`;
        const S = Wt + Math.round(w / d);
        (S !== Pe.to && ((Pe.to = S), t.Sfx.click()),
          $t.forEach((j, me) => {
            if (j === i) return;
            const o = me > Wt && me <= S ? -d : me < Wt && me >= S ? d : 0;
            j.style.transform = o ? `translateY(${o}px)` : "";
          }));
      }));
    const G = (be) => {
      if (!Pe || be.pointerId !== Pe.id) return;
      const { row: ot, rows: $t, from: Wt, to: d, moved: i } = Pe;
      ((Pe = null),
        r.classList.remove("sorting"),
        ot.classList.remove("dragging"),
        $t.forEach((w) => {
          w.style.transform = "";
        }),
        i && ((at = zn.now()), d !== Wt ? Ln(ot.dataset.uid, $t[d].dataset.uid, d > Wt) : rn()));
    };
    (r.addEventListener("pointerup", G),
      r.addEventListener("pointercancel", G),
      r.addEventListener("click", (be) => {
        const ot = be.target.closest(".tr-row");
        ot && !La() && zn.now() - at > 300 && Le(ot);
      }));
  }
  function Qt(r, G) {
    const be = mn(r),
      ot = a(".hp > div", yn(r) || document.createElement("div"));
    if (!be || !ot) return;
    const $t = (G ?? be.hp) / le.maxHp(be);
    ((ot.style.width = $t * 100 + "%"), (ot.style.background = Kt($t)));
  }
  function ma() {
    const r = a("#enemy-hud");
    ((r.hidden = !A),
      A &&
        (r.innerHTML = `<div class="row"><b>${H(e(A.name))}</b></div>
      <div class="rival-balls">${Array.from({ length: A.count }, (G, be) => `<img src="assets/items/poke-ball.png" alt=""${be < A.ko ? ' class="ko"' : ""}>`).join("")}</div>`),
      Ft());
  }
  const $a = (r) =>
    r.kind === "trainer" || r.kind === "gym"
      ? { name: r.trainer, count: r.count || r.enemies?.length || 1, ko: 0 }
      : null;
  function Fa(r) {
    re().shinySparkle(a("#arena-fx"), r);
  }
  function fa(r) {
    ((a("#battle-log").innerHTML = r), qa());
  }
  let ga = null;
  function qa() {
    const r = ve.state,
      G = a("#death-counter");
    if (!G || G.closest("[hidden]")) return;
    const be = (Wt) => {
        const d = u.CHAPTERS[Wt],
          i = d?.steps.filter((o) => o.kind === "gym").pop(),
          w = i
            ? u.badgeHtml(i.badge, 2) ||
              (i.boss
                ? `<img src="${B(i.boss)}" alt="">`
                : `<img src="assets/trainers/${i.sprite}.png" alt="">`)
            : "",
          S = r.deaths?.[Wt] || 0,
          j = Math.round((r.chTime?.[Wt] || 0) / 6e4),
          me = j >= 60 ? `${Math.floor(j / 60)} h ${String(j % 60).padStart(2, "0")}` : `${j} min`;
        return `<div class="dc-row ${Wt === r.chapter ? "cur" : ""}" title="${H(e(d?.name || ""))}"><span class="dc-badge">${w}</span>
        <span>💀 <b>${S}</b></span><span title="${e("Temps de jeu équivalent en vitesse x1")}">⏱️ <b>${me}</b></span></div>`;
      },
      $t = u.CHAPTERS.map((Wt, d) => d)
        .filter((Wt) => Wt === r.chapter || r.deaths?.[Wt] || r.chTime?.[Wt])
        .map(be)
        .join("");
    $t !== ga && (G.innerHTML = ga = $t);
  }
  async function ja(r, G = 1100, be = "") {
    const ot = a("#banner");
    ((ot.className = "banner show " + be),
      (ot.innerHTML = r),
      await ot.animate(
        [
          { transform: "translate(-50%,-50%) scale(.3, .1)", opacity: 0 },
          { transform: "translate(-50%,-50%) scale(1.08, .95)", opacity: 1, offset: 0.5 },
          { transform: "translate(-50%,-50%) scale(1)", opacity: 1 },
        ],
        { duration: 300, easing: "ease-out" },
      ).finished,
      await et(G),
      await ot.animate([{ opacity: 1 }, { opacity: 0, transform: "translate(-50%,-60%) scale(.95)" }], 200)
        .finished,
      (ot.className = "banner"));
  }
  function pn(r) {
    const be = ((r.matches?.(".enemy, .ally") ? a(".wrap > img", r) : null) || r).getBoundingClientRect(),
      ot = a("#arena").getBoundingClientRect();
    return { x: be.left - ot.left + be.width / 2, y: be.top - ot.top + be.height / 2 };
  }
  function dn(r, G, be, ot = "") {
    const $t = f(`<div class="dmg ${ot}">${be}</div>`);
    (Object.assign($t.style, { left: r + "px", top: G + "px" }), a("#arena-fx").appendChild($t));
    const Wt = (Math.random() - 0.5) * 24,
      d = ot === "crit" ? 1.25 : 1,
      i = (j) => j / Math.min(2, Math.sqrt(Ee())),
      w = (j, me = 1, o = 1, n = 0) =>
        `translate(calc(-50% + ${n}px), calc(-50% + ${j}px)) scale(${me * d}, ${o * d})`;
    ($t.animate(
      [
        { transform: w(10, 2, 0.3), opacity: 0 },
        { transform: w(-22, 0.8, 1.45), opacity: 1, offset: 0.12 },
        { transform: w(-14, 1.2, 0.82), offset: 0.22 },
        { transform: w(-17, 0.96, 1.05), offset: 0.32 },
        { transform: w(-30, 1, 1, Wt * 0.6), offset: 0.72 },
        { transform: w(-40, 1, 1, Wt), opacity: 1 },
      ],
      { duration: i(950), easing: "ease-out", fill: "forwards" },
    ),
      ot === "miss" &&
        $t.animate(
          [
            { translate: "0 0" },
            { translate: "-4px 0" },
            { translate: "4px 0" },
            { translate: "-2px 0" },
            { translate: "0 0" },
          ],
          { duration: i(260), delay: i(150) },
        ),
      $t
        .animate([{ opacity: 1 }, { opacity: 1, offset: 0.74 }, { opacity: 0 }], {
          duration: i(950),
          easing: "steps(4, end)",
          fill: "forwards",
        })
        .finished.then(() => $t.remove()));
    const S = re().pix(a("#arena-fx"));
    if (ot === "crit") (S.rays(r, G - 10, 14, S.PAL.gold, 12), S.star(r + 18, G - 26));
    else if (ot === "super") S.burst(r, G - 10, 8, 1.6, { pal: S.PAL.of("#ff9f43"), grav: 0.04 });
    else if (ot === "money")
      for (let j = 0; j < 3; j++)
        Wa(() => S.star(r + (Math.random() - 0.5) * 60, G - 20 - Math.random() * 20), i(j * 120));
  }
  const _n = new Set(["normal", "fighting", "flying", "ground", "rock", "bug", "ghost", "poison"]);
  async function as(r, G) {
    const be = a("#arena"),
      ot = a("#arena-fx"),
      $t = pn(r),
      Wt = Ee();
    await r.animate(
      [{ transform: "scale(1)" }, { transform: "scale(1.12, .92)", offset: 0.6 }, { transform: "scale(1)" }],
      { duration: 380 / Wt, easing: "ease-in-out" },
    ).finished;
    const d = f('<div class="rage-flash"></div>'),
      i = f('<div class="rage-ring"></div>');
    ((d.style.background = G),
      Object.assign(i.style, {
        left: $t.x + "px",
        top: $t.y + "px",
        borderColor: G,
        boxShadow: `0 0 24px 8px ${G}`,
      }),
      ot.append(d, i));
    const w = (Math.hypot(be.clientWidth, be.clientHeight) * 2.2) / 40;
    (d
      .animate([{ opacity: 0 }, { opacity: 0.45, offset: 0.25 }, { opacity: 0 }], { duration: 600 / Wt })
      .finished.then(() => d.remove()),
      re().shake(be, 8, 420),
      b("#ally-slots .ally img").forEach((j) =>
        j.animate(
          [
            { filter: "none" },
            { filter: "brightness(3)", offset: 0.6 },
            { filter: "none" },
            { filter: "brightness(3)" },
            { filter: "none" },
          ],
          { duration: 700 / Wt, delay: 200 / Wt },
        ),
      ),
      await i.animate(
        [
          { transform: "translate(-50%,-50%) scale(.2)", opacity: 1 },
          { transform: `translate(-50%,-50%) scale(${w})`, opacity: 0 },
        ],
        { duration: 650 / Wt, easing: "cubic-bezier(.2,.7,.4,1)" },
      ).finished,
      i.remove());
  }
  async function Qn(r) {
    const G = r.side === "ally" ? a(`.ally[data-uid="${r.uid}"]`) : yn(r.uid),
      be = r.side === "ally" ? yn(r.target) : a(`.ally[data-uid="${r.target}"]`),
      ot = r.side === "ally" ? le.DEX[le.getMon(r.uid)?.id]?.name : In(mn(r.uid)),
      $t =
        r.side === "enemy"
          ? ["wild", "static"].includes(r.kind)
            ? e("{mon} sauvage", { mon: H(ot) })
            : e("{mon} ennemi", { mon: H(ot) })
          : H(ot);
    if (
      (r.zoneFollow ||
        fa(
          r.zone
            ? e("{foe} utilise <b>{move}</b> ! Toute l'équipe est touchée !", {
                foe: $t,
                move: H(r.move.name),
              })
            : e("{foe} utilise <b>{move}</b> !", { foe: $t, move: H(r.move.name) }),
        ),
      b(".tcard, #team-rail .tr-row").forEach((s) => s.classList.toggle("acting", s.dataset.uid === r.uid)),
      !G || !be)
    ) {
      await et(300);
      return;
    }
    const Wt = pn(G),
      d = pn(be),
      i = Is[r.move.type]?.color || "#fff",
      w = r.side === "ally" ? 1 : -1,
      S =
        !r.statusMove &&
        !r.zoneFollow &&
        !r.rage &&
        !yt() &&
        t.BattleFX?.has(r.move.key) &&
        !matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (r.nothing) {
      (await G.animate(
        [{ transform: "translateY(0)" }, { transform: "translateY(-24px)" }, { transform: "translateY(0)" }],
        400 / Ee(),
      ).finished,
        fa(e("{foe} utilise {move} ! Mais rien ne se passe…", { foe: $t, move: H(r.move.name) })),
        await et(350));
      return;
    }
    if (!r.zoneFollow)
      if (r.rage)
        (!yt() &&
          t.BattleFX?.has(r.move.key) &&
          !matchMedia("(prefers-reduced-motion: reduce)").matches &&
          (await t.BattleFX.play({
            move: r.move.key,
            attEl: G,
            defEl: be,
            fxEl: a("#arena-fx"),
            shakeEl: a("#arena"),
            mirror: !0,
            miss: !1,
            crit: !1,
            speed: Ee(),
          })),
          await as(G, i));
      else if (S)
        await t.BattleFX.play({
          move: r.move.key,
          attEl: G,
          defEl: be,
          fxEl: a("#arena-fx"),
          shakeEl: a("#arena"),
          mirror: r.side !== "ally",
          miss: !!r.miss || r.eff === 0,
          crit: !!r.crit,
          speed: Ee(),
        });
      else if (_n.has(r.move.type) && !r.statusMove) {
        const s = (d.x - Wt.x) * 0.6,
          l = (d.y - Wt.y) * 0.6;
        (await G.animate(
          [
            { transform: "translate(0,0)" },
            { transform: `translate(${-14 * w}px, 6px) scale(1.1, .9)`, offset: 0.3 },
            { transform: `translate(${s}px, ${l}px)` },
          ],
          { duration: 220 / Ee(), easing: "cubic-bezier(.5,0,.8,.6)" },
        ).finished,
          G.animate([{ transform: `translate(${s}px, ${l}px)` }, { transform: "translate(0,0)" }], {
            duration: 280 / Ee(),
            easing: "cubic-bezier(.2,.8,.3,1)",
          }));
      } else {
        G.animate(
          [
            { transform: "translate(0,0)" },
            { transform: `translate(${-10 * w}px, 4px) scale(1.12, .9)` },
            { transform: "translate(0,0)" },
          ],
          300 / Ee(),
        );
        const s = f('<div class="projectile"></div>');
        (Object.assign(s.style, {
          left: Wt.x + "px",
          top: Wt.y + "px",
          background: `radial-gradient(#fff 15%, ${i} 55%, transparent 72%)`,
          boxShadow: `0 0 18px 6px ${i}`,
        }),
          a("#arena-fx").appendChild(s),
          await s.animate(
            [
              { transform: "translate(0,0) scale(.4)" },
              { transform: `translate(${(d.x - Wt.x) / 2}px, ${(d.y - Wt.y) / 2 - 40}px) scale(1.2)` },
              { transform: `translate(${d.x - Wt.x}px, ${d.y - Wt.y}px) scale(1)` },
            ],
            { duration: 320 / Ee(), easing: "ease-in" },
          ).finished,
          s.remove());
      }
    const j = (s) => et(r.zone && !r.zoneLast ? 0 : s);
    if (r.miss) {
      (dn(d.x, d.y - 40, e("Raté !"), "miss"),
        r.zone || fa(e("{foe} rate son attaque !", { foe: $t })),
        await j(400));
      return;
    }
    if (r.eff === 0) {
      (dn(d.x, d.y - 40, e("Aucun effet"), "miss"),
        r.zone || fa(e("Ça n'affecte pas le Pokémon…")),
        await j(500));
      return;
    }
    if (r.statusMove) {
      r.inflict && (await Xs(r));
      return;
    }
    (t.Sfx.hit(r.crit || r.eff > 1),
      S ||
        re().particles(a("#arena-fx"), d.x, d.y, {
          n: r.crit ? 12 : 7,
          colors: [i, "#fff"],
          size: r.crit ? 10 : 7,
          spread: r.crit ? 70 : 45,
          up: 10,
          dur: 500,
          gravity: 20,
          shape: "star",
        }));
    const me = a("img", be);
    (S ||
      me.animate(
        [{ filter: "brightness(3)" }, { filter: "none" }, { filter: "brightness(3)" }, { filter: "none" }],
        320,
      ),
      S ||
        be.animate(
          [
            { transform: "translateX(0)" },
            { transform: `translateX(${6 * w}px)` },
            { transform: `translateX(${-4 * w}px)` },
            { transform: "translateX(0)" },
          ],
          260,
        ));
    const o = (s, l) =>
      dn(
        d.x + (Math.random() * 30 - 15),
        d.y - 50,
        l ? "-" + s + "!" : "-" + s,
        l ? "crit" : r.eff > 1 ? "super" : "",
      );
    (r.hits?.length > 1 && !r.zone ? await os(r, be, o) : o(r.damage, r.crit),
      (r.crit || r.eff > 1) && !S && re().shake(a("#arena"), r.crit ? 6 : 4, 220),
      r.side === "ally" ? Qt(r.target, r.hp) : Ca(),
      r.drain && Ms(r, G, $t),
      Ls());
    const n = [];
    (r.hits?.length > 1 && n.push(e("Touché {n} fois !", { n: r.hits.length })),
      r.crit && n.push(e("Coup critique !")),
      r.eff > 1 ? n.push(e("C'est super efficace !")) : r.eff < 1 && n.push(e("Ce n'est pas très efficace…")),
      n.length && !r.zone && (fa(n.join(" ")), await et(450)),
      r.thaw &&
        (fa(`${ys(r.target, r.side === "ally" ? "enemy" : "ally")} ${Cs("freeze").end}`),
        await $s(r.target, r.side === "ally" ? "enemy" : "ally", "freeze", "end"),
        js()),
      r.inflict && (await Xs(r)),
      await j(P.STEP_MS * 0.4));
  }
  async function os(r, G, be) {
    const ot = a(".hp > div", G),
      $t = r.maxHp;
    let Wt = r.from ?? r.hp + r.damage;
    for (const [d, i] of r.hits.entries())
      (d &&
        (await et(P.MULTI_HIT_GAP_MS),
        t.Sfx.hit(i.crit || r.eff > 1),
        a("img", G)?.animate([{ filter: "brightness(2.4)" }, { filter: "none" }], 140)),
        be(i.d, i.crit),
        (Wt = Math.max(0, Wt - i.d)),
        ot && $t && ((ot.style.width = (Wt / $t) * 100 + "%"), (ot.style.background = Kt(Wt / $t))));
  }
  function Ms(r, G, be) {
    const ot = pn(G);
    if ((dn(ot.x + (Math.random() * 20 - 10), ot.y - 50, "+" + r.drain, "heal"), !yt() && At())) {
      const $t = re().pix(a("#arena-fx"));
      for (let Wt = 0; Wt < 5; Wt++)
        Wa(() => $t.heal(ot.x + (Math.random() - 0.5) * 36, ot.y - Math.random() * 24, 1), (Wt * 70) / Ee());
    }
    (r.side === "ally" ? Ca() : Qt(r.uid, r.attHp),
      (!r.zone || r.zoneLast) && fa(e("{foe} récupère {n} PV !", { foe: be, n: r.drain })));
  }
  const Cs = (r) => t.STATUS.INFO[r],
    rs = {
      burn: ["#ff6a2a", "#ffb03a", "#fff1b0"],
      paralysis: ["#ffe23a", "#fff7a8", "#fff"],
      poison: ["#b65ad6", "#7a2a9a", "#e6b0ff"],
      sleep: ["#cfd6ff", "#9aa3b5", "#fff"],
      freeze: ["#bff1ff", "#6ad0f0", "#fff"],
      confusion: ["#ff8fd0", "#ffe066", "#fff"],
    },
    Ps = (r, G) => (G === "ally" ? Ha(r) : yn(r)),
    vs = (r, G) => (G === "ally" ? le.getMon(r) : mn(r));
  function ys(r, G) {
    const be = vs(r, G),
      ot = H(le.DEX[be?.id]?.name || "");
    return G === "ally"
      ? `<b>${ot}</b>`
      : A
        ? e("<b>{mon}</b> ennemi", { mon: ot })
        : e("<b>{mon}</b> sauvage", { mon: ot });
  }
  function Ts(r, G) {
    if (!r || !G) return;
    for (const $t of Object.keys(t.STATUS.INFO))
      r.classList.toggle("st-" + $t, $t === "confusion" ? !!G.confused : G.status === $t);
    const be = a(".mini-lv", r);
    let ot = be && a(".st-chip", be);
    G.status && be
      ? (ot || be.prepend((ot = f('<span class="st-chip"></span>'))),
        (ot.textContent = Cs(G.status).tag),
        (ot.style.background = Cs(G.status).color))
      : ot?.remove();
    for (const $t of a(".wrap", r)?.getAnimations({ subtree: !0 }) || [])
      (G.status === "freeze" ? $t.pause() : $t.playState === "paused" && $t.play(),
        ($t.playbackRate = G.status === "sleep" ? 0.4 : 1));
  }
  function js() {
    for (const r of b("#ally-slots .ally:not(.fxclone)")) Ts(r, le.getMon(r.dataset.uid));
    for (const r of b("#enemy-slot .enemy:not(.fxclone)")) Ts(r, mn(r.dataset.uid));
    Fn();
  }
  function As(r, G, be, ot, $t = 1) {
    const Wt = f(`<div class="dmg st-float" style="color:${ot};font-size:${$t}em">${be}</div>`);
    return (
      Object.assign(Wt.style, { left: r + "px", top: G + "px" }),
      a("#arena-fx").appendChild(Wt),
      Wt.animate(
        [
          { transform: "translate(-50%,-50%) scale(.4)", opacity: 0 },
          { transform: "translate(-50%,-90%) scale(1.15)", opacity: 1, offset: 0.25 },
          { transform: "translate(-50%,-150%) scale(1)", opacity: 1, offset: 0.75 },
          { transform: "translate(-50%,-190%) scale(.9)", opacity: 0 },
        ],
        { duration: 1e3, easing: "ease-out" },
      ).finished.then(() => Wt.remove())
    );
  }
  async function $s(r, G, be, ot, $t, Wt) {
    const d = Ps(r, G);
    if (!d || !At()) return;
    if (
      (ot === "got" || ot === "hurt" || ot === "stuck") &&
      t.BattleFX &&
      !yt() &&
      !matchMedia("(prefers-reduced-motion: reduce)").matches
    ) {
      const s = pn(a("img", d));
      (ot === "got" && As(s.x, s.y - a("img", d).offsetHeight * 0.45, Cs(be).tag, rs[be][0], 1.1),
        ot === "hurt" && (t.Sfx.hit(!1), $t && As(s.x, s.y - 30, "-" + $t, rs[be][0])),
        await t.BattleFX.status({
          status: be,
          defEl: d,
          attEl: Wt || null,
          fxEl: a("#arena-fx"),
          shakeEl: a("#arena"),
          mirror: G === "ally" && !!Wt,
          speed: Ee(),
        }));
      return;
    }
    const i = a("img", d),
      w = a("#arena-fx"),
      S = pn(i),
      j = rs[be],
      me = j[0],
      o = () =>
        i.animate(
          [{ filter: "none" }, { filter: `brightness(1.6) drop-shadow(0 0 10px ${me})` }, { filter: "none" }],
          { duration: 420 },
        ),
      n = (s = 5, l = 6) =>
        d.animate(
          Array.from({ length: l + 1 }, (c, p) => ({
            transform: `translateX(${p === l ? 0 : p % 2 ? -s : s}px)`,
          })),
          { duration: 300 / Ee() },
        );
    if (ot === "got")
      (t.Sfx.bonk?.(),
        re().ring(w, S.x, S.y, me, i.offsetWidth * 1.4, 520, 5),
        re().particles(w, S.x, S.y, {
          n: 14,
          colors: j,
          size: 8,
          spread: 70,
          up: 20,
          dur: 650,
          gravity: be === "burn" || be === "poison" ? -30 : 20,
          shape: "star",
        }),
        o(),
        As(S.x, S.y - i.offsetHeight * 0.45, Cs(be).tag, me, 1.1),
        be === "paralysis" && n(4, 10),
        be === "confusion" &&
          d.animate(
            [
              { transform: "rotate(0)" },
              { transform: "rotate(-8deg)" },
              { transform: "rotate(8deg)" },
              { transform: "rotate(0)" },
            ],
            { duration: 420 },
          ));
    else if (ot === "stuck")
      if (be === "sleep")
        for (let s = 0; s < 3; s++)
          Wa(
            () => As(S.x + 14 + s * 10, S.y - i.offsetHeight * 0.3 - s * 12, "Z", me, 0.8 + s * 0.2),
            s * 180,
          );
      else
        be === "freeze"
          ? (o(),
            n(2, 4),
            re().particles(w, S.x, S.y, {
              n: 10,
              colors: j,
              size: 6,
              spread: 40,
              up: 0,
              dur: 500,
              gravity: 30,
            }))
          : be === "paralysis" &&
            (o(),
            n(5, 12),
            re().particles(w, S.x, S.y, {
              n: 10,
              colors: j,
              size: 7,
              spread: 50,
              up: 10,
              dur: 400,
              gravity: 0,
              shape: "star",
            }));
    else
      ot === "end"
        ? (be === "freeze"
            ? (t.Sfx.open(),
              re().ring(w, S.x, S.y, "#fff", i.offsetWidth * 1.6, 450, 4),
              re().particles(w, S.x, S.y, {
                n: 18,
                colors: j,
                size: 7,
                spread: 110,
                up: 30,
                dur: 650,
                gravity: 50,
              }))
            : re().particles(w, S.x, S.y, {
                n: 8,
                colors: ["#fff", ...j],
                size: 6,
                spread: 50,
                up: 30,
                dur: 500,
                gravity: 10,
                shape: "star",
              }),
          i.animate(
            [
              { transform: ka(i, i.style.transform || "") || "none" },
              { transform: ka(i, `${i.style.transform || ""} scale(1.08, .92)`) },
              { transform: ka(i, i.style.transform || "") || "none" },
            ],
            260,
          ))
        : ot === "hurt" &&
          (t.Sfx.hit(!1),
          o(),
          be === "confusion" && n(6, 8),
          re().particles(w, S.x, S.y + i.offsetHeight * 0.2, {
            n: 12,
            colors: j,
            size: 7,
            spread: 40,
            up: 50,
            dur: 700,
            gravity: -40,
          }),
          $t && As(S.x, S.y - 30, "-" + $t, me));
  }
  async function qs(r) {
    const G = Cs(r.status),
      be = ys(r.uid, r.side);
    (r.what === "stuck"
      ? fa(`${be} ${G.stuck}`)
      : r.what === "end"
        ? fa(`${be} ${G.end}`)
        : r.what === "hurt" &&
          fa(
            r.status === "confusion"
              ? e("{mon} est confus ! Il se blesse dans sa confusion !", { mon: be })
              : `${be} ${G.hurt}`,
          ),
      await $s(r.uid, r.side, r.status, r.what, r.damage),
      r.what === "hurt" && (r.side === "ally" ? Ca() : Qt(r.uid, r.hp), Ls()),
      js(),
      await et(r.what === "stuck" ? 600 : 450));
  }
  async function Xs(r) {
    const G = r.side === "ally" ? "enemy" : "ally";
    fa(`${ys(r.target, G)} ${Cs(r.inflict).got}`);
    const be = r.statusMove ? (r.side === "ally" ? a(`.ally[data-uid="${r.uid}"]`) : yn(r.uid)) : null;
    (await $s(r.target, G, r.inflict, "got", 0, be), js(), await et(500));
  }
  function Ds(r, G) {
    const be = Ha(r) || a(`#team-rail .tr-row[data-uid="${r}"]`);
    if (!be) return;
    const ot = pn(be);
    (t.Sfx.levelup(),
      re().particles(a("#arena-fx"), ot.x, ot.y, {
        n: 10,
        colors: ["#6dff8f", "#fff"],
        size: 8,
        spread: 60,
        up: 30,
        dur: 800,
        gravity: 10,
        shape: "star",
      }));
    const $t = f(`<div class="lvlup">${e("Nv. {n} !", { n: G })}</div>`);
    (Object.assign($t.style, { left: ot.x + "px", top: ot.y - 60 + "px" }),
      a("#arena-fx").appendChild($t),
      $t
        .animate(
          [
            { transform: "translate(-50%, 10px) scale(.5)", opacity: 0 },
            { transform: "translate(-50%, -10px) scale(1.2)", opacity: 1, offset: 0.3 },
            { transform: "translate(-50%, -40px)", opacity: 0 },
          ],
          1300,
        )
        .finished.then(() => $t.remove()));
  }
  async function Qs(r) {
    const G = t.LinkFx;
    if (r.choices.length > 1)
      return G.choose({
        title: H(e(r.text)),
        choices: r.choices,
        level: r.level,
        onEscape:
          r.key === "starter"
            ? () => (
                ve.overrideGift([25]),
                t.Sfx.upgrade(2),
                { title: e("Hein ? Tu n'en veux aucun ? Bon… prends donc ce Pikachu !"), id: 25 }
              )
            : null,
      });
    const be = r.choices[0],
      ot = G.open({ title: H(e(r.text)) });
    try {
      (await G.enter(ot),
        await G.land(ot, { cable: !1 }),
        await G.reveal(ot, t.UI.artImg(be, !1, { k: 2, fit: 160 }), !1),
        ot.skip.hide(),
        await G.say(ot, e("Tu reçois <b>{mon}</b> Nv. {n} !", { mon: H(le.DEX[be].name), n: r.level })),
        await G.finish(ot));
    } finally {
      await G.close(ot);
    }
    return be;
  }
  async function Us(r) {
    if (qe || !r) return;
    qe = !0;
    const G = le.teamMons(),
      be = `<div class="dc-head"><h2>${H(e(r.place))}</h2><div class="dc-sum"><button class="dc-x" aria-label="${e("Fermer")}">✕</button></div></div>
      <div class="ot-dlg-top"><div class="rd-wall"><p class="rd-braille">${H(t.LegendZones.inscription(r))}</p></div>
        <div class="dc-id"><div class="genus">${e("Quel Pokémon de ton équipe montres-tu à l'inscription ?")}</div></div></div>
      <div class="rd-team">${G.map(($t) => `<button class="rd-mon" data-uid="${$t.uid}" title="${H(le.DEX[$t.id].name)}">${se($t.id, $t.shiny, 1.25, 56)}<span class="lvl">${e("Nv. {n}", { n: $t.level })}</span></button>`).join("")}</div>`,
      ot = await Tt({
        className: "dexcard-modal ot-dlg rd-dlg",
        body: be,
        actions: [{ label: e("Annuler"), cls: "ghost", value: null }],
        onOpen: ($t, Wt) => {
          ((a(".dc-x", $t).onclick = () => Wt(null)),
            b(".rd-mon", $t).forEach((d) => {
              d.onclick = () => Wt(d.dataset.uid);
            }));
        },
      });
    ((qe = !1), ot && (await Vn(ot)));
  }
  async function Vn(r) {
    if (ve.state.pending?.type === "riddle") {
      r === "pass"
        ? (a("#arena .rd-scene")?.remove(), (ce = !1), fa(e("Tu t'éloignes de l'inscription.")))
        : r !== null && a("#arena .rd-scene")?.remove();
      for (const G of ve.chooseRiddle(r) || []) await Bs(G);
      r === "pass" && hs();
    }
  }
  function kn(r) {
    if (!r) return;
    const G = !!ve.state.pending?.waitAt,
      be = G ? "wait" : "ask";
    let ot = a("#arena .rd-scene");
    if (ot?.dataset.mode === be) return;
    const $t = G
        ? `<button class="btn outline" data-rd="pass">${e("Partir")}</button>`
        : `<button class="btn" data-rd="show">${e("Montrer un Pokémon")}</button><button class="btn outline" data-rd="wait">${e("Attendre")}</button><button class="btn outline" data-rd="pass">${e("Partir")}</button>`,
      Wt = !ot;
    ((ot ||= f(
      `<div class="rd-scene"><div class="rd-wall"><p class="rd-braille">${H(t.LegendZones.inscription(r))}</p></div><div class="rd-acts"></div></div>`,
    )),
      (ot.dataset.mode = be),
      (a(".rd-acts", ot).innerHTML = $t),
      (a(".rd-acts", ot).onclick = (d) => {
        const i = d.target.closest("[data-rd]");
        i && (i.dataset.rd === "show" ? Us(r) : Vn(i.dataset.rd === "wait" ? null : "pass"));
      }),
      Wt &&
        (a("#arena").appendChild(ot),
        ot.animate(
          [
            { opacity: 0, transform: "translateY(-8px)" },
            { opacity: 1, transform: "none" },
          ],
          { duration: 300, easing: "ease-out" },
        )));
  }
  async function Un(r) {
    if (dt || !r) return;
    dt = !0;
    const G = r.gift,
      be = !!G.items,
      ot = yt() || matchMedia("(prefers-reduced-motion: reduce)").matches;
    let $t = null,
      Wt = null,
      d = null;
    if (!be && !ot) $t = await Qs(G);
    else if (be && !ot)
      $t = await t.ItemFX.choose(a("#arena"), {
        ask: G.items.every((w) => /fossil/.test(w)) ? e("Choisis un fossile !") : e("Choisis un objet !"),
        items: G.items.map((w) => ({ id: w, name: Ze(w), src: Je(w) })),
        speed: Ee(),
      });
    else {
      const w =
        f(`<div class="hatch-fx gift"><div class="hx-title">${H(e(G.text))}</div><div class="gift-balls"></div>
        <div class="gift-info"><b class="gi-name">&nbsp;</b><span class="gi-types"></span>${be ? "" : `<small class="gi-lv">${e("Nv. {n}", { n: G.level })}</small>`}</div>
        <button class="btn primary lg gift-go" disabled>${e("Valider")}</button><div class="hx-tap gift-tap">${e("Touche pour continuer")}</div></div>`);
      document.querySelector(".lab-fx") && w.classList.add("on-lab");
      let S,
        j = null,
        me = !1,
        o = 0;
      const n = a(".gift-balls", w),
        s = a(".gift-info", w),
        l = a(".gift-go", w),
        c = (Ae, St, Jt) => (ot ? Promise.resolve() : t.UI.tween(Ae, St, Jt)),
        p = (Ae) => (ot ? Promise.resolve() : ue(Ae)),
        y = (Ae, St = 1) =>
          c(
            a(".gb-body", Ae),
            [
              { rotate: "0deg" },
              { rotate: `${-16 * St}deg`, offset: 0.2 },
              { rotate: `${13 * St}deg`, offset: 0.45 },
              { rotate: `${-7 * St}deg`, offset: 0.7 },
              { rotate: `${3 * St}deg`, offset: 0.85 },
              { rotate: "0deg" },
            ],
            { duration: 520, easing: "ease-in-out", fill: "none" },
          ),
        v = (Ae) =>
          c(
            a(".gb-body", Ae),
            [
              { transform: "translateY(0) scale(1, 1)" },
              { transform: "translateY(0) scale(1.25, .75)", offset: 0.2 },
              { transform: "translateY(-18px) scale(.9, 1.12)", offset: 0.5 },
              { transform: "translateY(0) scale(1.1, .9)", offset: 0.8 },
              { transform: "translateY(0) scale(1, 1)" },
            ],
            { duration: 420, easing: "ease-out", fill: "none" },
          ),
        M = (Ae) => {
          ((a(".gi-name", s).textContent = be ? Ze(Ae) : le.DEX[Ae].name),
            (a(".gi-types", s).innerHTML = be ? "" : t.UI.types(Ae, !0)),
            (s.style.visibility = "visible"),
            c(
              s,
              [
                { transform: "scale(.85)", opacity: 0 },
                { transform: "scale(1.06)", opacity: 1, offset: 0.6 },
                { transform: "scale(1)", opacity: 1 },
              ],
              { duration: 240, easing: "ease-out", fill: "none" },
            ));
        },
        I = (Ae) => {
          const St = a(".gb-mon", Ae);
          return (
            (St.style.visibility = "visible"),
            St.classList.add("sil"),
            ot || t.Sfx.open(),
            c(
              a(".gb-arrow", Ae),
              [
                { opacity: 0, transform: "translateY(-6px)" },
                { opacity: 1, transform: "none" },
              ],
              { duration: 200, delay: 260, fill: "backwards" },
            ),
            c(
              St,
              [
                { transform: "translateY(90px) scale(0)", opacity: 0 },
                { transform: "translateY(-10px) scale(1.15, .9)", opacity: 1, offset: 0.55 },
                { transform: "translateY(0) scale(.95, 1.06)", offset: 0.8 },
                { transform: "translateY(0) scale(1)", opacity: 1 },
              ],
              { duration: 420, easing: "ease-out", fill: "none" },
            ).then(() => St.classList.remove("sil"))
          );
        },
        ke = (Ae) => {
          me ||
            Ae === j ||
            !Ae.classList.contains("ready") ||
            (j && !be && t.UI.setArtAnim(a(".gb-art img", j), +j.dataset.id, !1, !1),
            j?.classList.remove("on"),
            (j = Ae),
            ($t = be ? Ae.dataset.id : +Ae.dataset.id),
            Ae.classList.add("on"),
            be || t.UI.setArtAnim(a(".gb-art img", Ae), $t, !1, !0),
            t.Sfx.click(),
            v(Ae),
            be ||
              c(
                a(".gb-mon", Ae),
                [
                  { transform: "translateY(0)" },
                  { transform: "translateY(-14px) scale(.95, 1.08)", offset: 0.4 },
                  { transform: "translateY(0)" },
                ],
                { duration: 320, easing: "ease-out", fill: "none" },
              ),
            M($t),
            (l.disabled = !1),
            (l.textContent = e("Choisir {name}", { name: be ? Ze($t) : le.DEX[$t].name })));
        },
        Se = async (Ae) => {
          const St = ++o;
          ((n.innerHTML = ""), (j = null), ($t = null));
          const Jt = Ae.length === 1;
          (w.classList.toggle("auto", Jt),
            (s.style.visibility = "hidden"),
            (l.disabled = !0),
            (l.textContent = e(be ? "Choisis un fossile" : "Choisis un Pokémon")));
          const Oa = Ae.map(($n, fs) => {
            const ds = f(
              be
                ? `<button class="gift-ball gift-item" data-id="${$n}" aria-label="${H(Ze($n))}">
            <span class="gb-ring"></span><span class="gb-shadow"></span><span class="gb-body"><img class="gb-ball" src="${Je($n)}" alt=""></span></button>`
                : `<button class="gift-ball" data-id="${$n}" aria-label="${H(le.DEX[$n].name)}">
            <div class="gb-mon"><div class="gb-art">${t.UI.artImg($n, !1, { still: !Jt })}</div><b class="gb-lv">${e("Nv. {n}", { n: G.level })}</b></div><i class="gb-arrow"></i>
            <span class="gb-ring"></span><span class="gb-shadow"></span>
            <span class="gb-body"><img class="gb-ball" src="assets/items/poke-ball.png" alt=""></span></button>`,
            );
            return (
              ds.style.setProperty("--sway", `${-fs * 0.7}s`),
              (ds.onclick = () => ke(ds)),
              n.appendChild(ds),
              be
                ? ds.style.setProperty("--g", "255, 203, 5")
                : t.UI.spriteGlow(B($n)).then((Fs) => Fs && ds.style.setProperty("--g", Fs)),
              ds
            );
          });
          if (
            (await Promise.all(
              Oa.map(($n, fs) => {
                const ds = 120 + fs * 150;
                return (
                  ot ||
                    Wa(() => {
                      $n.isConnected && t.Sfx.thud(1 - fs * 0.15);
                    }, ds + 405),
                  c(
                    a(".gb-shadow", $n),
                    [
                      { transform: "scale(.2)", opacity: 0 },
                      { transform: "scale(1.3, .8)", opacity: 1, offset: 0.52 },
                      { transform: "scale(1)", opacity: 1 },
                    ],
                    { duration: 900, delay: ds, fill: "backwards" },
                  ),
                  c(
                    a(".gb-body", $n),
                    [
                      { transform: "translateY(-280px) scale(.9, 1.15)", offset: 0 },
                      { transform: "translateY(0) scale(.9, 1.15)", offset: 0.45, easing: "ease-out" },
                      { transform: "translateY(0) scale(1.3, .7)", offset: 0.52 },
                      { transform: "translateY(-34px) scale(.95, 1.08)", offset: 0.68, easing: "ease-in" },
                      { transform: "translateY(0) scale(1.15, .85)", offset: 0.8 },
                      { transform: "translateY(-10px) scale(1, 1)", offset: 0.9, easing: "ease-in" },
                      { transform: "translateY(0) scale(1, 1)" },
                    ],
                    { duration: 900, delay: ds, easing: "ease-in", fill: "backwards" },
                  )
                );
              }),
            ),
            St !== o)
          )
            return;
          if (!Jt) {
            for (const $n of Oa) (v($n), be || I($n), await p(160));
            if ((await p(260), St !== o)) return;
            (Oa.forEach(($n) => $n.classList.add("ready", "sway")),
              (a(".gi-name", s).textContent = e(be ? "Choisis un fossile" : "Choisis un Pokémon")),
              (a(".gi-types", s).innerHTML = ""),
              (s.style.visibility = "visible"));
            return;
          }
          const Qa = Oa[0];
          if (
            ((j = Qa),
            ($t = be ? Qa.dataset.id : +Qa.dataset.id),
            Qa.classList.add("on"),
            v(Qa),
            be || (await I(Qa)),
            St !== o || (M($t), t.Sfx.click(), await p(600), St !== o || me))
          )
            return;
          const un = a(".gift-tap", w);
          ((un.style.opacity = 1),
            await new Promise(($n) => w.addEventListener("pointerdown", $n, { once: !0 })),
            !(St !== o || me) && ((me = !0), S()));
        };
      (ot ||
        (Wt = Ss(() => {
          me || !j || w.classList.contains("auto") || (y(j, 1.2), t.Sfx.shake());
        }, 900)),
        (l.onclick = async () => {
          if (!(!j || me)) {
            ((me = !0), (l.disabled = !0), t.Sfx.click());
            for (const Ae of n.children)
              Ae !== j &&
                c(
                  Ae,
                  [
                    { transform: "scale(1)", opacity: 1 },
                    { transform: "scale(.6) translateY(30px)", opacity: 0 },
                  ],
                  { duration: 260, easing: "ease-in" },
                );
            (await c(
              a(be ? ".gb-body" : ".gb-mon", j),
              [
                { transform: "scale(1)" },
                { transform: "translateY(-12px) scale(1.12, .92)", offset: 0.4 },
                { transform: "scale(1)" },
              ],
              { duration: 320, easing: "ease-out" },
            ),
              S());
          }
        }),
        G.key === "starter" &&
          ((d = (Ae) => {
            Ae.key !== "Escape" ||
              w.dataset.pika ||
              me ||
              ((w.dataset.pika = "1"),
              ve.overrideGift([25]),
              t.Sfx.upgrade(2),
              (a(".hx-title", w).textContent = e(
                "Hein ? Tu n'en veux aucun ? Bon… prends donc ce Pikachu !",
              )),
              Se([25]));
          }),
          document.addEventListener("keydown", d)),
        await new Promise((Ae) => {
          ((S = async () => {
            (await c(w, [{ opacity: 1 }, { opacity: 0 }], { duration: 220 }), w.remove(), Ae());
          }),
            document.body.appendChild(w),
            c(w, [{ opacity: 0 }, { opacity: 1 }], { duration: 250, fill: "none" }),
            c(
              a(".hx-title", w),
              [
                { transform: "translateY(-14px)", opacity: 0 },
                { transform: "none", opacity: 1 },
              ],
              { duration: 300, delay: 200, easing: "ease-out", fill: "both" },
            ),
            Se(G.items || G.choices));
        }));
    }
    (clearInterval(Wt), d && document.removeEventListener("keydown", d));
    const i = G.key === "demo" ? null : ve.chooseGift($t, G);
    if (((dt = !1), i?.item))
      (t.Sfx.buy(), X(e("{item} rangé dans le Sac.", { item: H(Ze(i.item)) }), Je(i.item)));
    else if (i?.mon)
      (t.Sfx.caught(),
        he() && !i.mon.shiny
          ? X(e("{mon} rejoint ton équipe !", { mon: le.DEX[i.mon.id].name }), B(i.mon.id, i.mon.shiny))
          : await t.UI.showDexCard(i.mon.id, {
              mon: i.mon,
              isNew: i.isNew,
              fresh: i.mon.shiny,
              actions: [{ label: e("Super !"), cls: "gold" }],
            }));
    else if (i?.dup) {
      const w = i.dup,
        S = le.famHead(w.mon.id),
        j = H(le.DEX[S].name),
        me = H(le.DEX[w.mon.id].name);
      t.Sfx.buy();
      const o = t.UI.fedXp(w.fed);
      (fa(
        o
          ? e("Doublon ! <b>{mon}</b> se change en {n} XP pour sa famille.", { mon: me, n: vt(o) })
          : e("Doublon ! <b>{mon}</b> ne rapporte rien : sa famille est au niveau max.", { mon: me }),
      ),
        X(
          o
            ? e("Doublon : +{n} XP pour la famille {fam}", { n: vt(o), fam: j })
            : e("Doublon : famille {fam} au niveau max", { fam: j }),
          B(S),
          "reward",
        ));
    } else i?.full && X(e("PC plein : le cadeau est converti en 1 000 ₽."));
    ((J = ""), hs());
  }
  async function ps({ sprite: r = "gentleman", name: G, html: be, ms: ot = 2200 }) {
    if (yt() || !At()) {
      fa(be);
      return;
    }
    const $t = f(`<div class="npc-say"><img class="npc-say-tr" src="assets/trainers/${r}.png" alt="">
      <div class="chen-box npc-say-box"><span class="chen-name">${H(e(G))}</span><p class="chen-text">${be}</p></div></div>`);
    (a("#arena").appendChild($t),
      await $t.animate(
        [
          { opacity: 0, transform: "translateY(12px)" },
          { opacity: 1, transform: "none" },
        ],
        { duration: 250, easing: "ease-out" },
      ).finished,
      await et(ot),
      await $t.animate([{ opacity: 1 }, { opacity: 0 }], 200).finished,
      $t.remove());
  }
  const Gn = (r) =>
    e("Je cherche un <b>{mon}</b> ! Passe me voir dans <b>Échanges</b>.", { mon: H(le.DEX[r.give].name) });
  function ms(r) {
    if (r.type !== "capture" || !r.success) return;
    const G = le.DEX[r.enemy.id];
    r.event ||
      r.raid ||
      G.legendary ||
      G.mythical ||
      r.enemy.shiny ||
      (r.isNew &&
        t.News.post({
          me: !0,
          mon: r.enemy.id,
          html: e("<b>Tu</b> as capturé <b>{name}</b> (nouveau !)", { name: H(G.name) }),
        }));
  }
  function ws(r) {
    if (r.type !== "buddyCandy") return;
    const G = le.getMon(r.uid),
      be = r.fed[0];
    (G &&
      be.amount &&
      X(
        be.levels
          ? e("Bonus de copain : {mon} gagne {n} XP (+{lv} niv.)", {
              mon: H(le.DEX[G.id].name),
              n: vt(be.amount),
              lv: be.levels,
            })
          : e("Bonus de copain : {mon} gagne {n} XP", { mon: H(le.DEX[G.id].name), n: vt(be.amount) }),
        B(G.id, G.shiny),
      ),
      be.evolve && t.UI.proposeEvolution(be.evolve));
  }
  async function Bs(r) {
    switch ((Oe(r), r.type !== "capture" && ms(r), ws(r), r.type)) {
      case "battleStart": {
        const G = In(r.enemy);
        let be = [];
        const ot = () => {
            ((A = $a(r)),
              oa([]),
              (a("#trainer-slot").innerHTML = ""),
              a("#arena").classList.remove("has-trainer"));
            const Wt = new Set($e);
            ((_e = !1),
              (Z = r.slots || 1),
              ($e = [...(r.allies || sn())]),
              (be = $e.filter((d) => d && !Wt.has(d))),
              Fe(r.node),
              T(),
              ea(!0),
              At() && a("#ally-slots").appendChild(Ut()),
              be.forEach((d) => {
                const i = Ha(d);
                i && (i.style.opacity = 0);
              }));
          },
          $t = () =>
            (r.foes || [r.enemy.uid]).map((Wt) => (r.enemies || [r.enemy]).find((d) => d.uid === Wt));
        if (r.kind === "wild" && !r.roam)
          (await Ga(ot),
            r.node?.special &&
              (await ja(e("Rencontre spéciale à {place} !", { place: H(e(r.node.name)) }), 900, "special")),
            fa("…"),
            await oa([r.enemy], "pop"),
            fa(
              r.enemy.veiled
                ? ln(r.enemy)
                  ? e("Un <b>Spectre</b> surgit ! Impossible de distinguer ce que c'est…")
                  : e("Quelque chose d'<b>invisible</b> te barre la route…")
                : e("Un <b>{mon}</b> sauvage apparaît !", { mon: H(G) }) +
                    (r.enemy.shiny ? " " + t.UI.shinyIc() : ""),
            ),
            r.enemy.status === "sleep" && fa(`🌙 ${e("Il dort profondément…")}`),
            await Bn(be));
        else if (r.node?.zone || r.roam) {
          const Wt = le.DEX[r.enemy.id],
            d = Is[Wt.types[0]].color,
            i = Wt.mythical
              ? e("Pokémon fabuleux · Niv. {n}", { n: r.enemy.level })
              : e("Pokémon légendaire · Niv. {n}", { n: r.enemy.level }),
            w = Xe(Bt(r.enemy.id, r.node), r.node, {
              title: i,
              name: e(Wt.name),
              ...st(Wt),
              color: d,
              zone: u.placeName(r.node),
            });
          (await ks(await cn(ot, d), {
            frame: w,
            boss: () =>
              Dn({
                trainer: Wt.name,
                title: i,
                gym: { boss: Wt.id, color: d, types: Wt.types, name: r.node.name },
              }),
          }),
            fa(
              r.roam
                ? e("<b>{mon}</b> rôde par ici ! Une seule Ball après son K.O.", { mon: H(G) })
                : e("<b>{mon}</b> apparaît !", { mon: H(G) }),
            ),
            await oa([r.enemy], "pop"),
            r.enemy.aura > 1 &&
              (await et(300), fa(e("Une aura étrange enveloppe <b>{mon}</b>…", { mon: H(G) }))),
            Z > 2 && (await et(300), fa(e("En avant, toute l'équipe !"))),
            await Bn(be));
        } else if ((r.kind === "static" || r.gym?.boss) && Ue[r.node?.once] && At() && !le.S.reducedAnim) {
          const Wt = le.DEX[r.enemy.id],
            d = Is[Wt.types[0]].color,
            i = Ue[r.node.once],
            w = Xe(i.key, r.node, {
              title: i.title(Wt, r.enemy.level),
              name: e(Wt.name),
              ...st(Wt),
              color: d,
              zone: u.placeName(r.node),
            });
          (await Ga(ot),
            (await Ve(w)) || (await ja(H(e(r.text)), 900, "special")),
            fa(e("<b>{mon}</b> apparaît !", { mon: H(G) })),
            await oa([r.enemy], "pop"),
            Z > 2 && (await et(300), fa(e("En avant, toute l'équipe !"))),
            await Bn(be));
        } else if (r.kind === "static" || r.gym?.boss)
          (await Ga(ot),
            await ja(
              H(
                r.text || r.gym?.text
                  ? e(r.text || r.gym?.text)
                  : e("{mon} apparaît !", { mon: le.DEX[r.enemy.id].name }),
              ),
              900,
              "special",
            ),
            fa(e("<b>{mon}</b> apparaît !", { mon: H(G) })),
            await oa([r.enemy], "pop"),
            Z > 2 && (await et(300), fa(e("En avant, toute l'équipe !"))),
            await Bn(be));
        else {
          if (r.kind === "gym") {
            const w = Sn(r) ? Xe(Sn(r), r.node, ns(r)) : null;
            await ks(await cn(ot, r.gym?.color), { frame: w, boss: () => Dn(r) });
          } else (await Ga(ot), await Rt(r));
          await da(r.sprite);
          const Wt = $t(),
            d = Wt.filter(Boolean).map((w) => `<b>${H(le.DEX[w.id].name)}</b>`),
            i =
              d.length > 1
                ? e("{list} et {last}", { list: d.slice(0, -1).join(", "), last: d[d.length - 1] })
                : d[0];
          (fa(
            r.slots === 2
              ? e("{trainer} veut se battre en duo ! {trainer} envoie {mons} !", {
                  trainer: H(e(r.trainer)),
                  mons: i,
                })
              : e("{trainer} veut se battre ! {trainer} envoie {mons} !", {
                  trainer: H(e(r.trainer)),
                  mons: i,
                }),
          ),
            await oa(Wt, "ball", r.enemies, Math.min(2, r.slots || 1)),
            await Bn(be));
        }
        await et(400);
        break;
      }
      case "attack":
        await Qn(r);
        break;
      case "rage": {
        const G = mn(r.uid),
          be = yn(r.uid),
          ot = be && a(".rage", be);
        (G && (G.rage = r.rage),
          ot &&
            ((ot.firstElementChild.style.width = (r.rage / r.max) * 100 + "%"),
            ot.classList.toggle("full", !!r.full)),
          r.full &&
            (await ja(
              e("{mon} déchaîne sa puissance !", { mon: H(le.DEX[G?.id ?? ve.state.nodes[0]?.id].name) }),
              900,
              "defeat",
            )));
        break;
      }
      case "enemyKo": {
        const G = mn(r.uid),
          be = yn(r.uid);
        (A && (A.ko++, ma()),
          G && fa(e("<b>{mon}</b> est K.O. !", { mon: H(In(G)) })),
          t.Sfx.thud(1),
          be?.classList.add("ko"),
          A && be && At() ? (await et(250), await an(be, wn()), be.classList.add("fainted")) : await et(450));
        break;
      }
      case "allyKo": {
        const G = le.getMon(r.uid);
        (G && fa(e("<b>{mon}</b> est K.O. !", { mon: H(le.DEX[G.id].name) })), t.Sfx.thud(1), Ca());
        const be = Ha(r.uid);
        be && At() ? (be.classList.add("fainted"), await et(450)) : await et(400);
        break;
      }
      case "send":
        await C(r);
        break;
      case "status":
        await qs(r);
        break;
      case "xp":
        (k(r), await et(60));
        break;
      case "capture": {
        const G = H(le.DEX[r.enemy.id].name);
        if (r.candy && !r.ball) {
          await ne(r, a("#enemy-slot .enemy img"), G);
          break;
        }
        fa(
          e("Tu lances une <b>{ball}</b> !", { ball: H(Ze(r.ball)) }) +
            ` <small class="muted">(${Math.round(r.prob * 100)} %)</small>`,
        );
        const be = a("#enemy-slot .enemy img");
        if (
          (r.success && r.isNew && fn.add(r.enemy.id),
          a("#enemy-slot .enemy")?.classList.add("in-ball"),
          be &&
            !yt() &&
            (be.getAnimations().forEach((ot) => ot.cancel()),
            (be.style.filter = ""),
            await ft((ot) =>
              re().play(a("#arena"), a("#arena-fx"), be, {
                ball: r.ball,
                shakes: r.shakes,
                success: r.success,
                shiny: r.enemy.shiny,
                speed: Ee(),
                name: G,
                ...ot,
              }),
            )),
          r.success)
        ) {
          if ((be || t.Sfx.caught(), fa(e("Gotcha ! <b>{mon}</b> est capturé !", { mon: G })), r.candy)) {
            (await ne(r, null, G), (J = ""), ea(), Ls());
            break;
          }
          (fn.delete(r.enemy.id) && Jn(),
            ms(r),
            Pa.delete(r.enemy.uid) &&
              (rn(),
              a(`#team-rail .tr-row[data-uid="${r.enemy.uid}"]`)?.animate(
                [
                  { transform: "scale(0)", filter: "brightness(0) invert(1)" },
                  { transform: "scale(1.15, .9)", filter: "brightness(0) invert(1)", offset: 0.5 },
                  { transform: "none", filter: "none" },
                ],
                { duration: 380, easing: "ease-out" },
              )),
            r.enemy.shiny || (r.isNew && !he())
              ? t.UI.showDexCard(r.enemy.id, {
                  mon: le.getMon(r.enemy.uid),
                  isNew: r.isNew,
                  fresh: r.enemy.shiny,
                  actions: [{ label: e("Continuer"), cls: "gold" }],
                })
              : X(
                  r.inTeam
                    ? e("{mon} capturé (ajouté à l'équipe)", { mon: G })
                    : e("{mon} capturé (envoyé au PC)", { mon: G }),
                  B(r.enemy.id, r.enemy.shiny),
                ),
            (J = ""),
            ea(),
            Ls());
        } else
          fa(
            r.roam
              ? e("Oh non ! <b>{mon}</b> s'est libéré ! Il rôde encore dans le coin…", { mon: G })
              : e("Oh non ! <b>{mon}</b> s'est libéré et s'enfuit !", { mon: G }),
          );
        break;
      }
      case "fled":
        if (r.veiled || r.spirit) {
          (fa(
            r.spirit
              ? e("L'âme d'<b>{mon}</b> s'apaise et s'élève…", { mon: H(le.DEX[r.enemy.id].name) })
              : ln(r.enemy)
                ? e("Le <b>Spectre</b> s'évapore… Il te faudrait de quoi le voir.")
                : e("La chose invisible s'éclipse… Il te faudrait de quoi la voir."),
          ),
            r.money &&
              dn(
                a("#arena").clientWidth * 0.75,
                a("#arena").clientHeight * 0.3,
                `+${vt(r.money)} ₽`,
                "money",
              ),
            await a("#enemy-slot .enemy .wrap")?.animate(
              [
                { opacity: 1, transform: "none" },
                { opacity: 0, transform: "translateY(-30%) scale(1.15, .7)" },
              ],
              { duration: 700, fill: "forwards" },
            ).finished,
            oa([]),
            T());
          break;
        }
        (fa(
          r.trainer
            ? e("{trainer} abandonne le combat : personne ne peut toucher personne !", {
                trainer: H(e(r.trainer)),
              })
            : r.legend
              ? e("À bout de forces, {mon} s'enfuit à toute vitesse !", { mon: H(le.DEX[r.enemy.id].name) })
              : e("{mon} sauvage s'enfuit !", { mon: H(le.DEX[r.enemy.id].name) }),
        ),
          r.money &&
            dn(a("#arena").clientWidth * 0.75, a("#arena").clientHeight * 0.3, `+${vt(r.money)} ₽`, "money"),
          await bn(),
          oa([]),
          T());
        break;
      case "captureSkip":
        (fa(H(e(r.reason))), await et(500));
        break;
      case "victory":
        (r.money &&
          dn(a("#arena").clientWidth * 0.75, a("#arena").clientHeight * 0.3, `+${vt(r.money)} ₽`, "money"),
          r.coins &&
            dn(
              a("#arena").clientWidth * 0.75,
              a("#arena").clientHeight * 0.42,
              r.coins > 1 ? e("+{n} jetons", { n: r.coins }) : e("+{n} jeton", { n: r.coins }),
              "money",
            ),
          r.kind === "trainer" || r.kind === "gym"
            ? (oa([]),
              r.sprite && (await da(r.sprite)),
              await ja(
                `${e("Tu as battu {trainer} !", { trainer: H(e(r.trainer)) })}${r.money ? `<small>+${vt(r.money)} ₽</small>` : ""}`,
                900,
                r.kind,
              ),
              r.badge?.champion ? (Te = !0) : r.badge && (await bs(r.badge)))
            : await et(350),
          (A = null),
          oa([]),
          await ia(),
          T(),
          Ls(),
          await ht());
        break;
      case "heal":
        (await On(r.node),
          yt()
            ? (fa(e("{place} : ton équipe est soignée.", { place: H(e(r.node.name)) })), (J = ""), ea(), Ls())
            : await Xn(r.node.name));
        break;
      case "berry": {
        await On(r.node);
        const G = e("Un arbre à baies ! Ton équipe récupère {pct} % de ses PV.", {
          pct: Math.round(P.BERRY_HEAL * 100),
        });
        (t.Sfx.heal(),
          yt() ? fa(G) : await ja(`<img src="${_.berry}" alt="">${G}`, 900, "item"),
          (Me = null),
          Ca(),
          Ls(),
          js());
        break;
      }
      case "item": {
        const G = r.money
          ? e("{n} ₽ obtenus !", { n: vt(r.money) })
          : e("Tu obtiens {item} !", { item: (r.n > 1 ? r.n + " × " : "") + Ze(r.item) });
        let be = !1;
        try {
          (await On(r.node),
            fa(H(G)),
            (be = !0),
            yt()
              ? t.Sfx.buy()
              : await t.ItemFX(a("#arena"), {
                  src: r.money ? "assets/ui/relic-gold.png" : Je(r.item),
                  money: !!r.money,
                  message: G,
                  speed: Ee(),
                }));
        } catch (ot) {
          (be || fa(H(G)), console.error("Animation de récompense :", ot), await ja(H(G), 800, "item"));
        }
        break;
      }
      case "soul": {
        const G = e("{mon} laisse une Âme… ({n} / {need})", {
          mon: le.DEX[r.enemy.id].name,
          n: r.n,
          need: r.need,
        });
        (fa(H(G)),
          yt()
            ? t.Sfx.buy()
            : await t
                .ItemFX(a("#arena"), { src: Je(P.SOULS.item), money: !1, message: G, speed: Ee() })
                .catch((be) => console.error("Animation de récompense :", be)));
        break;
      }
      case "unlock":
        (await On(r.node), fa(H(e(r.text))), await ja(H(e(r.text)), 1800, "special"));
        break;
      case "eggGift":
        (await On(r.node), fa(H(e(r.text))), await ja(H(e(r.text)), 1400, "item"));
        break;
      case "npcOffer":
        for (const G of r.offers) await ps({ name: t.Screens.trade.npcName(G.town), html: Gn(G) });
        t.App.refreshHeader();
        break;
      case "riddle":
        (await On(r.node), At() && kn(r.riddle));
        break;
      case "riddleWait":
        (ce || ((ce = !0), fa(e("Tu attends devant l'inscription…"))),
          kn(ve.state.pending?.riddle),
          await ue(1e3));
        break;
      case "riddleOpen":
        ((ce = !1),
          t.Sfx.open?.(),
          await ja(
            `${e("Une porte s'ouvre !")}<small>${e("{name} t'attend : sa zone est ouverte dans la Progression", { name: H(le.DEX[r.riddle.legend].name) })}</small>`,
            1800,
            "special",
          ),
          fa(e("{place} : une porte s'ouvre !", { place: H(e(r.riddle.place)) })),
          hs());
        break;
      case "riddleFail":
        ((ce = !1),
          await ja(`${e("Rien ne se passe…")}<small>${H(e(r.riddle.place))}</small>`, 1400, "defeat"));
        break;
      case "riddlePass":
        break;
      case "gift":
      case "waiting":
        if (r.pending?.type === "riddle") {
          (At() && kn(r.pending.riddle), await ue(500));
          break;
        }
        (r.node ? await On(r.node) : (Fe(), T()),
          At() ? await Un(r.gift ? { gift: r.gift } : r.pending) : await ue(500));
        break;
      case "skip":
        (fa(H(e(r.text))), await et(500));
        break;
      case "defeat": {
        const G = r.reason === "stall",
          be = await us(
            G
              ? [e("Combat bloqué !"), e("Aucune attaque ne fait effet : change ton équipe (types).")]
              : [
                  e("Ton équipe est K.O. !"),
                  r.center
                    ? e("Tu te précipites au Centre Pokémon de {place}…", { place: H(e(r.center)) })
                    : e("Tu te précipites au Centre Pokémon…"),
                ],
          );
        (await ss(() => {
          ((A = null),
            oa([]),
            (a("#trainer-slot").innerHTML = ""),
            a("#arena").classList.remove("has-trainer"),
            Fe({ name: r.center || "Centre Pokémon", bg: "pokecenter", fallback: "town" }),
            fa(r.center ? e("Centre Pokémon de {place}", { place: H(e(r.center)) }) : e("Centre Pokémon")));
        }, be),
          await Xn(r.center),
          await ss(() => {
            ((J = ""), (Xt = null), hs(), fa(e("En route !")));
          }));
        const ot = u.leagueOf(r.chapter);
        r.league
          ? await ja(
              `${e("Retour au début de la Ligue")}<small>${e("Élite {r}", { r: je[r.league.tier] })} · ${e("essai {n}", { n: r.league.tries })}</small>`,
              1e3,
              "defeat",
            )
          : r.elite
            ? await ja(
                `${e("{mon} revient…", { mon: H(le.DEX[r.elite.foe].name) })}<small>${e("Élite {r}", { r: je[r.elite.tier] })} · ${e("essai {n}", { n: r.elite.tries })}</small>`,
                1e3,
                "defeat",
              )
            : r.raid
              ? await ja(
                  `${e("Retour à l'entrée du raid")}<small>${H(le.DEX[r.event].name)}</small>`,
                  1e3,
                  "defeat",
                )
              : r.event
                ? await ja(
                    `${e("Retour au début de la chasse")}<small>${H(le.DEX[r.event].name)}</small>`,
                    1e3,
                    "defeat",
                  )
                : await ja(
                    ot
                      ? `${e("Retour au début de la Ligue")}<small>${H(e(u.CHAPTERS[ot[0]].name))}</small>`
                      : `${e("Retour au début du chapitre")}<small>${H(e(u.CHAPTERS[r.chapter].name))}</small>`,
                    1e3,
                    "defeat",
                  );
        break;
      }
      case "chapterEnd":
        ((r.champion || Te) && At()
          ? await zs(r.chapter, !1, r.team)
          : await ja(
              `${e("Chapitre terminé !")}<small>${H(e(u.CHAPTERS[r.chapter].name))}</small>`,
              1200,
              "gym",
            ),
          (Te = !1),
          (Xt = null),
          hs());
        break;
      case "reconnect":
        (await lo(r), hs());
        break;
      case "eventTrace": {
        const G = H(le.DEX[r.id].name);
        (fa(
          e("{mon} s'enfuit… mais tu ramasses une <b>{item}</b> ({n}) !", {
            mon: G,
            item: H(t.EventUI.traceName(r.id)),
            n: r.total,
          }),
        ),
          At() &&
            (dn(
              a("#arena").clientWidth * 0.75,
              a("#arena").clientHeight * 0.4,
              `<img src="${Je("trace-" + r.id)}" alt="">+1`,
              "money",
            ),
            await bn(),
            await et(500)),
          to());
        break;
      }
      case "eventMiss":
        (fa(e("{mon} s'enfuit…", { mon: H(le.DEX[r.id].name) })), At() && (await bn()));
        break;
      case "eventWon":
        (to(), await Zs(r.id));
        break;
      case "legendFled":
        (await ja(
          `${e("{mon} s'est enfui !", { mon: H(le.DEX[r.id].name) })}<small>${e("Trop lent : retour au début de la chasse")}</small>`,
          1200,
          "defeat",
        ),
          (Xt = null),
          hs());
        break;
      case "eventLoop":
        (await ja(
          `${e("Boucle {n} terminée !", { n: r.loops || "" })}<small><img src="${Je("event-shard")}" alt=""> ${e("+{n} Éclats", { n: r.shards })}${r.record ? ` · ${e("Nouveau record : {time}", { time: t.EventUI.clockMs(r.ms) })}` : ""}</small>`,
          r.record ? 1600 : 1e3,
          "special",
        ),
          (Xt = null),
          hs());
        break;
      case "raidMiss":
        (fa(
          e("{mon} s'échappe de la Ball… Retente ta chance !", { mon: H(le.DEX[r.id].name) }) +
            (r.pity != null
              ? ` <small class="muted">${t.Raids.pityReady(ve.state.event?.reg, ve.state.event?.date) ? e("Master Ball prête !") : e("Jauge Master Ball : {n} / {max}", { n: r.pity, max: P.RAID.PITY })}</small>`
              : ""),
        ),
          At() && (await bn()));
        break;
      case "raidLoop":
        (await ja(
          `${e("Nouvel essai !")}<small>${e("Raid {mon} · tentative {n}", { mon: H(le.DEX[r.id].name), n: r.loops + 1 })}${t.Raids.pityReady(ve.state.event?.reg, ve.state.event?.date) ? ` · <img src="${Je("master-ball")}" alt=""> ${e("Master Ball prête !")}` : ""}</small>`,
          1e3,
          "special",
        ),
          (Xt = null),
          hs());
        break;
      case "raidDone":
        (await ja(
          `${e("Raid réussi !")}<small>${e("{mon} chromatique capturé · retour au chapitre", { mon: H(le.DEX[r.id].name) })}</small>`,
          1600,
          "gym",
        ),
          (Xt = null),
          (J = ""),
          hs());
        break;
      case "raidOver":
        (await ja(
          `${e("Raid terminé")}<small>${e("Ce raid était celui d'un autre jour · retour au chapitre")}</small>`,
          1600,
          "defeat",
        ),
          (Xt = null),
          (J = ""),
          hs());
        break;
      case "towerFloor":
        if (r.kind === "candy") {
          const G = pt(r.got);
          (fa(e("Étage {n} franchi !", { n: r.floor }) + (G ? ` <b>${G}</b>` : "")),
            r.got?.max &&
              fa(
                e("{n} Super Bonbons gagnés aujourd'hui : ce palier double ses Bonbons Exp.", {
                  n: P.CANDY_RUN.SB_DAY,
                }),
              ),
            r.camp && fa(e("Camp de soin : ton équipe repart en pleine forme.")));
          const be = Object.entries(r.got || {})
            .filter(([, ot]) => typeof ot == "number" && ot > 0)
            .map(([ot, $t]) => ({ name: t.UI.itemName(ot), src: Je(ot), n: $t }));
          (r.drop
            ? (r.node && (await On(r.node)),
              !be.length || yt()
                ? t.Sfx?.buy?.()
                : await t.ItemFX.shower(a("#arena"), {
                    items: be,
                    message: `${e("Étage {n} franchi !", { n: r.floor })} ${be.map((ot) => `+${ot.n} ${ot.name}`).join(" · ")}`,
                    speed: Math.min(1.5, Ee()),
                  }))
            : G &&
              (await ja(`${e("Étage {n} franchi !", { n: r.floor })}<small>${G}</small>`, 1e3, "special")),
            (Xt = null),
            (J = ""),
            hs());
          break;
        }
        (fa(
          e("Étage {n} franchi ! Encore {left} Pokémon debout.", { n: r.floor, left: r.left }) +
            (r.bp ? ` <b>${e("+{n} Points Combat", { n: r.bp })}</b>` : ""),
        ),
          r.rested &&
            fa(
              e("{n} Pokémon trop faibles pour l'étage {floor} restent au repos.", {
                n: r.rested,
                floor: r.next,
              }),
            ),
          r.step &&
            fa(
              `<b>${e("Palier de l'étage {n} atteint : récompenses à la fin de la run.", { n: r.floor })}</b>`,
            ),
          (r.floor % P.TOWER.BOSS_EVERY === 0 || r.record) &&
            (await ja(
              `${e("Étage {n} franchi !", { n: r.floor })}<small>${r.record ? e("Nouveau record de la semaine") : H(e("Tour de Combat"))}${r.bp ? ` · ${e("+{n} Points Combat", { n: r.bp })}` : ""}</small>`,
              1e3,
              "special",
            )),
          (Xt = null),
          (J = ""),
          hs());
        break;
      case "towerEnd":
        if (r.kind === "candy") {
          (await ja(
            `${e("Fin du run !")}<small>${e("Étages franchis : {n} · record : {best}", { n: r.floor, best: r.best })}</small>`,
            1800,
            r.floor && r.floor >= r.best ? "gym" : "defeat",
          ),
            (Xt = null),
            (J = ""),
            hs(),
            a("#screen-adventure.active") &&
              !document.hidden &&
              (t.Screens.raid.open("candy"), t.Screens.candy.recap(r)));
          break;
        }
        (await ja(
          `${e("Fin de la run !")}<small>${e("Étages franchis : {n} · record de la semaine : {best}", { n: r.floor, best: r.best })}</small>`,
          1800,
          r.floor && r.floor >= r.best ? "gym" : "defeat",
        ),
          (Xt = null),
          (J = ""),
          hs(),
          a("#screen-adventure.active") &&
            !document.hidden &&
            (t.Screens.raid.open("tower"), t.Screens.tower.recap({ floor: r.floor, best: r.best })));
        break;
      case "zoneLoop":
        (fa(
          r.tries
            ? e("{mon} revient… essai {n}", { mon: H(le.DEX[r.id].name), n: vt(r.tries) })
            : e("{mon} revient…", { mon: H(le.DEX[r.id].name) }),
        ),
          (Xt = null),
          (J = ""),
          hs());
        break;
      case "eliteWin":
        fa(
          r.first
            ? e("{mon} est battu en {elite} !", {
                mon: H(le.DEX[r.id].name),
                elite: e("Élite {r}", { r: je[r.tier] }),
              })
            : e("{mon} est battu, encore une fois.", { mon: H(le.DEX[r.id].name) }),
        );
        break;
      case "eliteDone":
        (await ja(
          `${e("{elite} battue !", { elite: e("Élite {r}", { r: je[r.tier] }) })}<small>${r.gem ? `+1 ${H(t.Underground.gemName(r.gem))}` : r.frame ? H(e("Cadre {mon} {r}", { mon: le.DEX[r.id].name, r: je[r.tier] })) : H(le.DEX[r.id].name)} · ${e("Retour au chapitre")}</small>`,
          1800,
          "gym",
        ),
          (Xt = null),
          (J = ""),
          hs());
        break;
      case "leagueEliteDone":
        (await ja(
          `${e("{elite} battue !", { elite: e("Élite {r}", { r: je[r.tier] }) })}<small>${r.frame ? e("1 gemme légendaire + le cadre") : e("1 gemme légendaire")} · ${e("Retour au chapitre")}</small>`,
          1800,
          "gym",
        ),
          (Xt = null),
          (J = ""),
          hs(),
          r.gem && (await t.UI.leagueGemPick(r.reg, r.tier)));
        break;
      case "zoneDone":
        (await ja(
          `${e("{mon} capturé !", { mon: H(le.DEX[r.id].name) })}<small>${e("Retour au chapitre")}</small>`,
          1400,
          "gym",
        ),
          (Xt = null),
          (J = ""),
          hs());
        break;
      case "zoneShut": {
        const G = t.LegendZones.get(r.zone);
        (await ja(
          `${e("{mon} s'est volatilisé…", { mon: H(le.DEX[r.id].name) })}<small>${G ? H(t.LegendZones.whenText(G)) : e("Retour au chapitre")}</small>`,
          1600,
          "defeat",
        ),
          (Xt = null),
          (J = ""),
          hs());
        break;
      }
      case "zoneOver":
        (await ja(
          `${e("{mon} n'est plus capturable", { mon: H(le.DEX[r.id].name) })}<small>${e("Retour au chapitre")}</small>`,
          1600,
          "defeat",
        ),
          (Xt = null),
          (J = ""),
          hs());
        break;
      case "eventClosed": {
        const G = H(le.DEX[r.id].name),
          be = t.Events.state.last;
        (await ja(
          r.by === "me"
            ? `${e("L'event est terminé !")}<small>${e("Retour à l'aventure, {mon} sous le bras", { mon: G })}</small>`
            : r.by === "rival"
              ? `${e("{who} a capturé {mon} !", { who: H(be?.rival || e("Un dresseur")), mon: G })}<small>${e("L'event est terminé : retour à ton chapitre")}</small>`
              : `${e("{mon} s'est volatilisé…", { mon: G })}<small>${e("L'event est terminé : retour à ton chapitre")}</small>`,
          1600,
          r.by === "me" ? "gym" : "defeat",
        ),
          (Xt = null),
          (J = ""),
          hs());
        break;
      }
      case "noTeam":
        ((a("#adv-empty").hidden = !1), await ue(800));
        break;
    }
  }
  const Rs = (r) =>
      r.badge === "Maître"
        ? e("Maître de la Ligue")
        : e("Maître de la Ligue de {reg}", { reg: e(r.badge.replace(/^Maître de /, "")) }),
    Gs = ["BADGE_IMG", "BADGE_IMG_JOHTO", "BADGE_IMG_HOENN", "BADGE_IMG_SINNOH"],
    Os = (r) => {
      const G = Gs.map((be) => u[be]).find((be) => be?.[r]);
      return G ? Object.keys(G) : null;
    };
  async function Es(r, G = !1) {
    const be = t.UI,
      ot = t.CaptureFX,
      $t = Os(r.badge),
      Wt = yt() || matchMedia("(prefers-reduced-motion: reduce)").matches,
      d = matchMedia("(max-width: 640px)").matches ? 3 : 4,
      i = (Jt) => Jt !== r.badge && (G ? $t.indexOf(Jt) < $t.indexOf(r.badge) : ve.state.badges.includes(Jt)),
      w = u.badgeSheet(r.badge),
      S = await be.spriteGlow(w.src, { n: w.n, of: 8 }).catch(() => null),
      j = S ? `rgb(${S})` : r.color,
      me = S ? `rgba(${S},.7)` : r.color,
      o = f(`<div class="hatch-fx badge-fx" style="--c:${j}"><i class="lk-sky"></i>
        <div class="hx-title">${e("Tu obtiens le Badge {badge} !", { badge: H(e(r.badge)) })}</div>
        <div class="bf-stage"><i class="hx-shadow"></i><div class="bf-big">${u.badgeHtml(r.badge, 6)}</div></div>
        <div class="bf-case">${$t.map((Jt) => `<span class="bf-slot ${i(Jt) ? "got" : ""} ${Jt === r.badge ? "target" : ""}">${u.badgeHtml(Jt, d, i(Jt) ? "" : "sil")}</span>`).join("")}</div>
        <div class="hx-msg">${e("Victoire contre {leader}.", { leader: H(e(r.leader)) })}</div>
        <div class="hx-tap">${e("Touche pour continuer")}</div>
        <div class="hx-flash"></div><div class="hx-fx"></div>
      </div>`);
    ((o.querySelector(".bf-big").style.visibility = "hidden"), document.body.appendChild(o));
    const n = (Jt) => o.querySelector(Jt),
      s = n(".bf-big"),
      l = n(".bf-case"),
      c = n(".bf-slot.target"),
      p = n(".hx-fx"),
      y = (Jt) => {
        const Oa = Jt.getBoundingClientRect();
        return { x: Oa.left + Oa.width / 2, y: Oa.top + Oa.height / 2 };
      },
      v = (Jt) =>
        `brightness(0) invert(1) drop-shadow(0 0 ${4 + Jt}px rgba(255,255,255,.95)) drop-shadow(0 0 ${10 + Jt * 2}px rgba(255,255,255,.5))`,
      M = `drop-shadow(0 0 2px ${j}) drop-shadow(0 0 8px ${j}) drop-shadow(0 0 20px ${me})`,
      I = be.skippable(o),
      ke = (Jt, Oa, Qa) =>
        Jt.animate(Oa, { fill: "both", ...Qa, ...(Wt ? { duration: 0, delay: 0 } : {}) }).finished,
      Se = ot.pix(p, 1),
      Ae = ot.pix(p).PAL.of(
        S
          ? "#" +
              S.split(",")
                .map((Jt) => (+Jt).toString(16).padStart(2, "0"))
                .join("")
          : r.color,
      ),
      St = (Jt = 46) => {
        Wt ||
          Se.confetti(Jt, [
            [Ae[1], Ae[3]],
            ["#ffffff", "#c9d2e6"],
            ["#fff2a8", "#e0a800"],
          ]);
      };
    try {
      (ke(
        n(".hx-title"),
        [
          { transform: "translateY(-14px)", opacity: 0 },
          { transform: "none", opacity: 1 },
        ],
        { duration: 300, delay: 250, easing: "ease-out" },
      ),
        await ke(o, [{ opacity: 0 }, { opacity: 1 }], { duration: 260 }),
        (s.style.visibility = ""),
        await ke(
          s,
          [
            { scale: "0", filter: v(4) },
            { scale: "1.3 .72", filter: v(8), offset: 0.45, easing: "ease-in" },
            { scale: ".85 1.3", filter: v(12), offset: 0.8 },
            { scale: "1.3 1.3", filter: v(16) },
          ],
          { duration: 560 },
        ));
      const Jt = y(s);
      if (
        (ke(n(".hx-flash"), [{ opacity: 1 }, { opacity: 0 }], {
          duration: 650,
          easing: "ease-out",
          fill: "none",
        }),
        t.Sfx.legendary(),
        t.Sfx.open?.(),
        !Wt)
      ) {
        (ot.shake(n(".bf-stage"), 10, 360),
          Se.ring(Jt.x, Jt.y, 200, 700),
          Se.ring(Jt.x, Jt.y, 130, 560, Ae),
          Wa(() => Se.ring(Jt.x, Jt.y, 260, 900, Se.PAL.gold), 120),
          Se.burst(Jt.x, Jt.y, 30, 3, { pal: Ae, round: !0, grav: 0.04 }));
        for (let $n = 0; $n < 6; $n++)
          Wa(
            () => Se.star(Jt.x + (Math.random() - 0.5) * 220, Jt.y + (Math.random() - 0.5) * 160),
            60 + $n * 90,
          );
      }
      (St(),
        s.getAnimations().forEach(($n) => $n.cancel()),
        (s.style.filter = M),
        Wa(
          () => {
            t.Sfx.thud?.(1);
            const $n = y(n(".hx-shadow"));
            Wt ||
              Se.burst($n.x, $n.y, 10, 1.4, {
                pal: ["#ffffff", "#e8ecf4", "#c9d2e6", "#9aa4bd", "#6b7590", "#454c63"],
                grav: 0.06,
              });
          },
          Wt ? 0 : 1050 * 0.58,
        ),
        await ke(
          s,
          [
            { translate: "0 0", scale: "1.3 1.3", filter: v(16), easing: "ease-out" },
            { translate: "0 -60px", scale: ".8 1.25", filter: v(6), offset: 0.3, easing: "ease-in" },
            {
              translate: "0 0",
              scale: "1.4 .62",
              filter: `brightness(1.6) ${M}`,
              offset: 0.58,
              easing: "ease-out",
            },
            { translate: "0 -26px", scale: ".9 1.14", filter: M, offset: 0.74, easing: "ease-in" },
            { translate: "0 0", scale: "1.15 .86", offset: 0.87, easing: "ease-out" },
            { translate: "0 0", scale: "1 1", filter: M },
          ],
          { duration: 1050, fill: "none" },
        ),
        t.Sfx.caught?.(),
        await ke(
          s,
          [
            { translate: "0 0", scale: "1 1" },
            { translate: "0 0", scale: "1.12 .88", offset: 0.12 },
            { translate: "0 -28px", scale: ".92 1.1", offset: 0.32 },
            { translate: "0 0", scale: "1.12 .88", offset: 0.5 },
            { translate: "0 -16px", scale: ".95 1.06", offset: 0.68 },
            { translate: "0 0", scale: "1.06 .94", offset: 0.85 },
            { translate: "0 0", scale: "1 1" },
          ],
          { duration: 820, delay: 150, easing: "ease-in-out", fill: "none" },
        ),
        await Promise.all([
          ke(
            l,
            [
              { transform: "translateY(30px)", opacity: 0 },
              { transform: "none", opacity: 1 },
            ],
            { duration: 300, easing: "ease-out" },
          ),
          ...[...l.children].map(($n, fs) =>
            ke(
              $n,
              [
                { scale: ".5", opacity: 0 },
                { scale: "1.12", opacity: 1, offset: 0.7 },
                { scale: "1", opacity: 1 },
              ],
              { duration: 260, delay: 120 + fs * 45, easing: "ease-out", fill: "backwards" },
            ),
          ),
        ]),
        await be.sleep(Wt ? 0 : 150),
        (s.style.transformOrigin = "50% 50%"));
      const Oa = y(s),
        Qa = y(c);
      (t.Sfx.whoosh?.(),
        await ke(
          s,
          [
            { translate: "0 0", scale: "1", rotate: "0deg" },
            {
              translate: `${(Qa.x - Oa.x) * 0.5}px ${(Qa.y - Oa.y) * 0.5 - 40}px`,
              scale: `${(1 + d / 6) / 2}`,
              rotate: "-8deg",
              offset: 0.5,
            },
            { translate: `${Qa.x - Oa.x}px ${Qa.y - Oa.y}px`, scale: `${d / 6}`, rotate: "0deg" },
          ],
          { duration: 620, easing: "cubic-bezier(.45,0,.3,1)" },
        ),
        (s.style.visibility = "hidden"),
        (n(".hx-shadow").style.visibility = "hidden"),
        c.classList.add("got", "new"),
        (c.innerHTML = u.badgeHtml(r.badge, d)));
      const un = y(c);
      (t.Sfx.bonk(),
        ke(c, [{ scale: "1.25 .82" }, { scale: ".94 1.06", offset: 0.5 }, { scale: "1" }], {
          duration: 320,
          easing: "ease-out",
          fill: "none",
        }),
        Wt ||
          (Se.burst(un.x, un.y, 8, 1.4, { pal: Ae, grav: 0.03 }),
          Se.star(un.x + 20, un.y - 18),
          Se.star(un.x - 16, un.y - 8)),
        St(24),
        ke(
          n(".hx-msg"),
          [
            { transform: "scale(.4)", opacity: 0 },
            { transform: "scale(1.12)", opacity: 1, offset: 0.6 },
            { transform: "none", opacity: 1 },
          ],
          { duration: 380, delay: 200, easing: "ease-out" },
        ),
        I.hide(),
        await be.sleep(Wt ? 0 : 700),
        (n(".hx-tap").style.opacity = 1),
        await I.tap(o, G ? 0 : P.CEREMONY_MS),
        await ke(o, [{ opacity: 1 }, { opacity: 0 }], { duration: 260 }));
    } finally {
      (I.end(), o.remove());
    }
  }
  async function bs(r) {
    if (Os(r.badge)) return Es(r);
    (t.Sfx.legendary(),
      await Tt({
        dismissable: !1,
        autoClose: P.CEREMONY_MS,
        body: `<div class="badge-get"><div class="badge-big" style="--c:${r.color}">${u.badgeHtml(r.badge, 6) || `<img src="${Je("master-ball")}" alt="" style="width:96px;image-rendering:pixelated">`}</div><h3>${r.champion ? e("Tu deviens {title} !", { title: H(Rs(r)) }) : e("Tu obtiens le Badge {badge} !", { badge: H(e(r.badge)) })}</h3><p class="muted">${e("Victoire contre {leader}.", { leader: H(e(r.leader)) })}</p></div>`,
        actions: [{ label: e("Génial !"), cls: "gold" }],
        onOpen: (G) => {
          const be = a(".badge-big", G);
          be.animate(
            [
              { transform: "scale(0) rotate(-180deg)" },
              { transform: "scale(1.3) rotate(10deg)", offset: 0.7 },
              { transform: "scale(1) rotate(0)" },
            ],
            { duration: 700, easing: "ease-out" },
          );
          const ot = be.getBoundingClientRect(),
            $t = G.getBoundingClientRect();
          Wa(
            () =>
              t.UI.burst(G, ot.left - $t.left + ot.width / 2, ot.top - $t.top + ot.height / 2, {
                n: 16,
                color: r.color,
                dist: 120,
              }),
            450,
          );
        },
      }));
  }
  async function zs(r, G = !1, be) {
    const ot = u.regionOf(r),
      $t = le.departureTo();
    t.Sfx.levelup?.();
    const Wt = le
      .teamMons(be)
      .map(
        (i) =>
          `<div class="hof-mon">${t.UI.sprBox(i.id, i.shiny, 2, 96)}<b>${H(le.DEX[i.id].name)}</b><small>${e("Nv. {n}", { n: i.level })}</small></div>`,
      )
      .join("");
    (await t.UI.modal({
      className: "hof-modal",
      dismissable: !1,
      autoClose: P.CEREMONY_MS,
      body: `<div class="hof"><div class="hof-hero" style="background-image:url(assets/bg/scenes/61-pantheon-710x400.webp)"><h3>${e("Panthéon")}</h3></div>
        <p>${e("Tu as vaincu la <b>Ligue {reg}</b> ! Ton équipe entre au Panthéon des Maîtres Pokémon.", { reg: H(e(ot.name)) })}</p>
        <div class="hof-team">${Wt}</div></div>`,
      actions: $t
        ? [
            { label: e("Plus tard"), cls: "ghost", value: !1 },
            { label: e("Partir pour {place}", { place: e($t.name) }), cls: "primary", value: !0 },
          ]
        : [{ label: e("Continuer"), cls: "primary", value: !1 }],
    })) &&
      $t &&
      !G &&
      t.Screens.map.departure($t);
  }
  async function lo(r) {
    const G = u.REGIONS.find((d) => d.key === r.region),
      be = u.REGIONS.find((d) => d.key === r.to) || le.currentRegion(),
      ot = r.back + r.merged.length;
    if (yt() || matchMedia("(prefers-reduced-motion: reduce)").matches) {
      X(
        e("Connexion rétablie avec {reg} : {n} Pokémon et {money} ₽ sont de retour !", {
          reg: H(e(G?.name || "")),
          n: ot,
          money: t.UI.fmt(r.money),
        }),
      );
      return;
    }
    const $t = le.S.mons.filter((d) => r.uids.includes(d.uid)),
      Wt =
        r.fliers ||
        [...r.merged.map((d) => ({ id: d.id, merge: d })), ...$t.map((d) => ({ id: d.id, shiny: d.shiny }))]
          .sort(() => Math.random() - 0.5)
          .slice(0, 24);
    await t.LinkFx.reconnect({
      from: { name: G?.name || "", color: G?.color || "#e3353b" },
      to: { name: be.name, color: be.color },
      fliers: Wt,
      total: ot,
      money: r.money,
    });
  }
  async function Zs(r) {
    t.Sfx.legendary();
    const G = Is[t.Events.legendOf(r).types[0]].color;
    await Tt({
      dismissable: !1,
      body: `<div class="badge-get legend-get"><div class="badge-big" style="--c:${G}"><img src="${B(r)}" alt=""></div>
        <h3>${e("Tu as capturé {mon} !", { mon: H(le.DEX[r].name) })}</h3><p class="muted">${e("Tu es le premier : l'event est terminé, et tout le monde le sait.")}</p></div>`,
      actions: [{ label: e("Légendaire !"), cls: "gold" }],
      onOpen: (be) => {
        const ot = a(".badge-big", be);
        ot.animate(
          [
            { transform: "scale(0) rotate(-20deg)" },
            { transform: "scale(1.3) rotate(6deg)", offset: 0.7 },
            { transform: "scale(1) rotate(0)" },
          ],
          { duration: 800, easing: "ease-out" },
        );
        const $t = ot.getBoundingClientRect(),
          Wt = be.getBoundingClientRect();
        for (let d = 0; d < 3; d++)
          Wa(
            () =>
              t.UI.burst(be, $t.left - Wt.left + $t.width / 2, $t.top - Wt.top + $t.height / 2, {
                n: 18,
                color: d % 2 ? "#ffcb05" : G,
                dist: 140 + d * 30,
              }),
            450 + d * 350,
          );
      },
    });
  }
  function to() {
    const r = a("#event-card");
    r && ((r.innerHTML = t.EventUI.card()), t.EventUI.bind(r));
  }
  function co(r) {
    if (r.type === "npcOffer")
      for (const G of r.offers)
        X(`${H(t.Screens.trade.npcName(G.town))} : « ${Gn(G)} »`, "assets/trainers/gentleman.png");
    (r.type === "eventWon" &&
      X(e("Tu as capturé {mon} ! L'event est terminé.", { mon: H(le.DEX[r.id].name) }), B(r.id)),
      r.type === "reconnect" &&
        X(
          e("Connexion rétablie : {n} Pokémon et {money} ₽ sont de retour !", {
            n: r.back + r.merged.length,
            money: t.UI.fmt(r.money),
          }),
        ),
      (r.type === "raidLoop" || r.type === "raidDone" || r.type === "raidOver") && ((Xt = null), (uo = !0)),
      r.type === "raidDone" &&
        X(e("{mon} chromatique capturé : raid réussi !", { mon: H(le.DEX[r.id].name) }), B(r.id, !0)),
      (r.type === "eventClosed" ||
        r.type === "eventLoop" ||
        r.type === "legendFled" ||
        r.type === "zoneLoop" ||
        r.type === "zoneDone" ||
        r.type === "zoneOver" ||
        r.type === "zoneShut" ||
        r.type === "eliteDone" ||
        r.type === "leagueEliteDone") &&
        ((Xt = null), (uo = !0)),
      r.type === "zoneDone" &&
        X(e("{mon} capturé : retour au chapitre.", { mon: H(le.DEX[r.id].name) }), B(r.id)),
      Oe(r),
      ms(r),
      r.type === "xp" && r.evolve && t.UI.proposeEvolution(r.evolve));
    for (const G of r.candy?.fed || []) G.evolve && t.UI.proposeEvolution(G.evolve);
    (r.type === "buddyCandy" && r.fed[0].evolve && t.UI.proposeEvolution(r.fed[0].evolve),
      r.type === "capture" &&
        r.success &&
        r.isNew &&
        X(e("Nouveau Pokémon : {mon} !", { mon: H(le.DEX[r.enemy.id].name) }), B(r.enemy.id, r.enemy.shiny)),
      r.type === "victory" &&
        r.badge &&
        X(
          r.badge.champion
            ? `${H(Rs(r.badge))} !`
            : e("Badge {badge} obtenu !", { badge: H(e(r.badge.badge)) }),
        ),
      r.type === "battleStart" && ((We = r.enemies || [r.enemy]), (A = $a(r))),
      r.type === "enemyKo" && A && A.ko++,
      (r.type === "victory" || r.type === "defeat") && ((We = []), (A = null)),
      r.type === "battleStart" && ((Z = r.slots || 1), ($e = [...(r.allies || [])])),
      r.type === "send" && r.side === "ally" && ($e[r.slot] = r.uid || null));
  }
  let uo = !1,
    Ys = P.ACTION_MS;
  const Ws = 15e3,
    Ks = P.STEP_MS,
    Js = (r) => new Promise((G) => Wa(G, r)),
    ao = 3e4;
  async function po() {
    let r = le.time();
    for (;;) {
      if (t.TabLock?.lost) return;
      if (document.hidden) {
        (await new Promise((i) => document.addEventListener("visibilitychange", i, { once: !0 })),
          await t.Cloud.ready(),
          await ue(0),
          await t.CatchUp?.ready(),
          (r = le.time()));
        continue;
      }
      if (t.CatchUp?.held ?? t.CatchUp?.pending) {
        (await t.CatchUp.ready(), (r = le.time()));
        continue;
      }
      if (le.time() - (le.S.lastTick ?? le.time()) > ao) {
        (await Js(500), (r = le.time()));
        continue;
      }
      const G = ve.state,
        be = le.time();
      (!tt && !G.paused && !G.pending && ve.addTime(Math.min(1e4, be - r) * Ee()), (r = be));
      const ot = !G.battle && !G.event && G.nodes[G.node]?.type === "gym" && G.nodes[G.node],
        $t = !!ot && !ve.leaderBeaten(ot.gym);
      if (!At() && G.pending?.type === "riddle" && !G.pending.waitAt) {
        ve.chooseRiddle("pass");
        continue;
      }
      const Wt = G.pending?.type === "riddle" && G.pending.waitAt;
      if (
        (G.pending?.type !== "riddle" && a("#arena .rd-scene")?.remove(),
        tt || G.paused || (((G.pending && !Wt) || $t) && !At()))
      ) {
        await ue(400);
        continue;
      }
      if (At() && !mt && !a(".modal") && t.Tower?.gift()) {
        (await eo(), (r = le.time()));
        continue;
      }
      let d;
      try {
        d = ve.step();
      } catch (i) {
        (console.error(i), await ue(1e3));
        continue;
      }
      if (
        (t.Cloud?.mark(),
        (le.S.lastTick = le.time()),
        (a("#adv-empty").hidden = !d.some((i) => i.type === "noTeam")),
        At())
      ) {
        const i = Date.now(),
          w = t.UI.skipMark();
        Me = d.find((s) => s.before)?.before || null;
        for (const s of d)
          for (const l of s.type === "xp" ? [s] : s.candy?.fed || []) {
            l.from != null && (Pn[l.uid] = l.from * 100);
            const c = l.levels && le.getMon(l.uid);
            c && (jn[l.uid] = Math.min(le.lvl(c), c.level - l.levels));
          }
        for (const s of d) s.type === "capture" && s.success && s.inTeam && Pa.add(s.enemy.uid);
        for (const s of d) s.type === "capture" && s.success && s.isNew && !s.candy && fn.add(s.enemy.id);
        uo && ((uo = !1), hs());
        const S = ve.state,
          j = [S, S.node, S.chapter, S.battle, S.event, S.zone, S.tower];
        mt = !0;
        let me = !1;
        try {
          for (const s of d)
            try {
              await Bs(s);
            } catch (l) {
              (console.error(l), (me = !0));
            }
        } finally {
          mt = !1;
        }
        (me &&
          ((J = ""),
          (Xt = null),
          b(
            "#arena > .boss-intro, #arena > .legend-intro, #arena > .flash-overlay, #arena > canvas.fx-dither",
          ).forEach((s) => s.remove()),
          hs()),
          (Me = null),
          Pa.size && (Pa.clear(), rn()),
          fn.size && (fn.clear(), Jn()));
        const o = ve.state;
        ([o, o.node, o.chapter, o.battle, o.event, o.zone, o.tower].some((s, l) => s !== j[l]) &&
          ((J = ""), (Xt = null), hs()),
          await Js((P.STEP_MS * 0.5) / Ee()));
        const n = Date.now() - i;
        n >= 0 && n < Ws && w != null && t.UI.skipMark() === w && (Ys += (n * Ee() - Ys) * 0.1);
      } else
        ((Me = null),
          (uo = !0),
          d.forEach(co),
          K(),
          d.some((i) => i.type === "gift" || i.type === "waiting") &&
            a('#tabs [data-screen="adventure"]').classList.add("ping"),
          await Js(Math.max(Ys, Ks) / Ee()));
      (Date.now() - Re > 3e3 && (le.save(document.hidden ? { idle: !0 } : void 0), (Re = Date.now())),
        t.App.refreshHeader());
    }
  }
  function Ls() {
    rn();
    const r = le.teamMons();
    if (!a("#adv-team")) {
      Jn();
      return;
    }
    ((a("#adv-team").innerHTML =
      r
        .map((G) => {
          const be = le.mainMove(G),
            ot = le.xpForNext(G.level, G),
            $t = It(G),
            Wt = le.maxHp(G),
            d = le.levelEvolution(G);
          return `<div class="tcard ${$t <= 0 ? "ko" : ""}" data-uid="${G.uid}" data-team-uid="${G.uid}">
        <div class="tc-left">${se(G.id, G.shiny, 2, 80)}<span class="tc-lv">${e("Nv. {n}", { n: G.level })}</span></div>
        <div><div class="row"><span class="name">${H(le.DEX[G.id].name)}${G.shiny ? " " + t.UI.shinyIc() : ""}</span></div>
        <div class="hpline">${Aa($t, Wt)}<small>${$t}/${Wt}</small></div>
        <div class="move">${x(be.type, !0)} ${H(be.name)}${be.power ? ` · ${le.powerLabel(be.key)}` : ""}${d ? ` <span class="evo-ready">${e("Évolution !")}</span>` : ""}</div></div>
        <div class="tc-xp" title="${e("XP")}"><div style="width:${le.capped(G) ? 100 : (G.xp / ot) * 100}%"></div></div>
      </div>`;
        })
        .join("") +
      (r.length < P.TEAM_SIZE
        ? `<button class="tcard add" id="team-add">+ ${e("Ajouter un Pokémon")}</button>`
        : "")),
      b("#adv-team .tcard[data-uid]").forEach(
        (G) => (G.onclick = () => t.UI.monDetail(G.dataset.uid, [...le.S.team])),
      ),
      a("#team-add")?.addEventListener("click", () => t.App.show("team")),
      Jn());
  }
  function hs() {
    const r = ve.state.battle;
    ((Z = r?.slots || 1), r && (_e = !1), ($e = r?.allies ? [...r.allies] : _e ? Ua() : sn()));
    const G = ve.state;
    (K(),
      T(),
      Fe(G.nodes[Math.min(G.node, G.nodes.length - 1)]),
      ea(!0),
      Ls(),
      to(),
      da(null),
      (A = r && $a(r)),
      A && (A.ko = r.enemies.filter((ot) => ot.hp <= 0).length));
    const be = r
      ? (r.foes || r.enemies.map((ot) => ot.uid)).map((ot) => r.enemies.find(($t) => $t.uid === ot))
      : [];
    (oa(be, "none", r?.enemies, Math.min(2, r?.slots || 1)),
      (a("#adv-empty").hidden = !!le.teamMons().length || ve.state.nodes[ve.state.node]?.type === "gift"));
  }
  async function eo() {
    tt = !0;
    try {
      await t.Screens.tower.recap();
    } catch (r) {
      console.error("Récompenses de la Tour :", r);
    } finally {
      (t.Tower.gift() && t.Tower.giftSeen(), (tt = !1), t.App.refresh());
    }
  }
  t.Screens.adventure = {
    itemEffect: Gt,
    hasIntro: Zt,
    replayIntro: va,
    cinematics: nn,
    replayCinematic: F,
    overlayIntro: Ce,
    towerGift: eo,
    openGift: Un,
    async demoBerry() {
      if (!tt) {
        tt = !0;
        try {
          for (t.App.show("adventure"); mt;) await ue(50);
          await t.BerryFX(a("#arena"), { reduced: yt() });
        } finally {
          tt = !1;
        }
      }
    },
    demoBadge(r) {
      const G = u.CHAPTERS.flatMap((ot) => ot.steps).filter((ot) => ot.kind === "gym" && Os(ot.badge)),
        be = G.find((ot) => ot.badge === r) || le.pick(G);
      return Es(be, !0);
    },
    demoHof() {
      t.App.show("adventure");
      const r = u.leagueOf(ve.state.chapter);
      return zs(r ? r[r.length - 1] : ve.state.chapter, !0);
    },
    demoCenter() {
      return (t.App.show("adventure"), Xn("Démo"));
    },
    async demoTransition(r) {
      return (
        t.App.show("adventure"),
        await et(250),
        r === "wipe"
          ? Ga(() => {})
          : r === "grid"
            ? Tn(await cn(() => {}, "#a855f7"))
            : ss(() => {}, await us(["Ton équipe est K.O. !", "Retour au Centre Pokémon le plus proche…"]))
      );
    },
    async demoIntro(r, G) {
      if ((t.App.show("adventure"), await et(250), r === "boss")) {
        const ot = u.CHAPTERS.flatMap((j) => j.steps).filter((j) => j.kind === "gym" && j.sprite),
          $t = ot.filter((j) => G && j.leader?.toLowerCase() === G.toLowerCase()),
          Wt = $t.find((j) => j.champion) || $t[0] || le.pick(ot),
          d = { name: Wt.name, scene: Wt.scene, bg: Wt.bg },
          i = { kind: "gym", trainer: Wt.leader, sprite: Wt.sprite, gym: Wt, node: d },
          w = Sn(i) ? Xe(Sn(i), d, ns(i)) : null,
          S = await cn(() => {
            Fe(d);
          }, Wt.color);
        if (await Ve(w)) {
          (S?.stop(), S?.cv.remove(), S?.D.remove());
          return;
        }
        return (await Dn(i), Tn(S));
      }
      if (r === "legend" && G) {
        const ot = Object.keys(Ue).find((n) => Ue[n].key === G),
          $t = Ue[ot],
          Wt = $t?.id || +Object.keys(Hn).find((n) => Hn[n] === G) || 130,
          d = le.DEX[Wt],
          i = Is[d.types[0]].color,
          w = t.LegendZones.get(Wt),
          S = w
            ? { name: w.zone, zone: Wt, scene: w.scene, bg: w.bg }
            : { ...($t?.node || Ue["red-gyarados"].node), once: ot },
          j = Xe(Bt(Wt, S), S, {
            title: $t ? $t.title(d, 70) : e("Pokémon légendaire · Niv. {n}", { n: 70 }),
            name: e(d.name),
            ...st(d),
            color: i,
            zone: e(S.name),
          }),
          me = await cn(() => {
            Fe(S);
          }, i);
        if (await Ve(j)) {
          (me?.stop(), me?.cv.remove(), me?.D.remove());
          return;
        }
        return Tn(me);
      }
      if (r === "legend") {
        const ot = le.DEX[le.pick([144, 145, 146, 150, 243, 244, 245, 249, 250])],
          $t = Is[ot.types[0]].color,
          Wt = await cn(() => {}, $t);
        return (
          await Dn({
            trainer: ot.name,
            title: "Pokémon légendaire · Niv. 70",
            gym: { boss: ot.id, color: $t, types: ot.types, name: "Démo" },
          }),
          Tn(Wt)
        );
      }
      const be = le.pick(u.TRAINER_CLASSES);
      return Rt({ kind: "trainer", trainer: `${be.name} Démo`, sprite: be.sprite });
    },
    init() {
      (Ss(() => document.hidden || qa(), 1500),
        (a("#bs-fold").onclick = () => {
          const ot = a("#badge-stats");
          (ot.classList.toggle("folded"),
            (a("#bs-fold").textContent = ot.classList.contains("folded") ? "▶" : "◀"));
        }),
        ve.ensure());
      const r = a("#arena");
      (new ResizeObserver(() => {
        const ot = Math.max(2, Math.round((r.clientWidth * 0.24) / 68));
        (r.style.setProperty("--k", ot),
          r.style.setProperty("--ks", Math.max(2, ot - 1)),
          r.style.setProperty("--kt", ot),
          es(xe));
      }).observe(r),
        r.style.setProperty("--hud-bottom", "0px"),
        new ResizeObserver(Pt).observe(r),
        new ResizeObserver(Ft).observe(a("#enemy-hud")),
        Qe(),
        new ResizeObserver(() => R()).observe(a("#timeline")));
      const G = () =>
        ve.state.tower
          ? it()
            ? t.Screens.raid.open("candy")
            : t.Screens.raid.open("tower")
          : ve.state.event?.raid
            ? t.Screens.raid.open("chroma")
            : t.LegendZones.get(ve.state.zone?.id)?.wb
              ? t.Screens.raid.open("wb")
              : t.Screens.map.open(pe(ve.state.chapter));
      ((a("#chapter-btn").onclick = G),
        (a("#side-chapter").onclick = () =>
          a("#screen-adventure.active") ? G() : a('#tabs [data-screen="adventure"]').click()),
        (ve.state.paused = !1),
        b("#speed-btns button").forEach(
          (ot) =>
            (ot.onclick = () => {
              P.SPEEDS.includes(+ot.dataset.speed) && ((ve.state.speed = +ot.dataset.speed), le.save(), K());
            }),
        ),
        (a("#adv-empty button").onclick = () => t.App.show("team")),
        Nt(),
        hs(),
        t.Events.on(() => {
          (to(), K());
        }));
      const be = () =>
        po().catch((ot) => {
          (console.error(ot),
            (mt = !1),
            (J = ""),
            (Xt = null),
            Wa(() => {
              try {
                hs();
              } catch ($t) {
                console.error($t);
              }
              be();
            }, 1e3));
        });
      be();
    },
    render() {
      (a('#tabs [data-screen="adventure"]').classList.remove("ping"), hs());
    },
    goChapter(r) {
      ((r !== ve.state.chapter || ve.state.event || ve.state.zone) &&
        ve.setChapter(r) &&
        ((J = ""), (Xt = null)),
        t.App.show("adventure"));
    },
    goLeague(r, G) {
      if (!(ve.state.league?.reg === r && ve.state.league.tier === G) && !ve.startLeague(r, G)) {
        X(e("Cette Ligue Élite n'est pas encore ouverte."));
        return;
      }
      ((J = ""), (Xt = null), t.App.show("adventure"));
      const ot = u.REGIONS.find(($t) => $t.key === r);
      ja(
        `${e("Ligue Élite · {region}", { region: H(e(ot?.name || r)) })}<small>${e("Élite {r}", { r: je[G] })} · ${e("Niv. {n}", { n: P.MAX_LEVEL })}</small>`,
        1200,
        "special",
      );
    },
    goZone(r, G = 0) {
      if (!(ve.state.zone?.id === r && (ve.state.zone.elite || 0) === G) && !ve.startZone(r, G || void 0)) {
        X(e("Cette zone n'est pas encore ouverte."));
        return;
      }
      ((J = ""), (Xt = null), t.App.show("adventure"));
      const ot = t.LegendZones.get(r),
        $t = ve.state.zone?.foe ?? r;
      if (ve.state.zone?.riddle) {
        ja(`${H(e(ot.zone))}<small>${e("Une inscription couvre le mur…")}</small>`, 1200, "special");
        return;
      }
      if (G) {
        ja(
          `${e("{mon} t'attend !", { mon: H(le.DEX[$t].name) })}<small>${e("Élite {r}", { r: je[G] })} · ${e("Niv. {n}", { n: t.CONFIG.MAX_LEVEL })}</small>`,
          1200,
          "special",
        );
        return;
      }
      ja(
        `${e("{mon} t'attend !", { mon: H(le.DEX[$t].name) })}<small>${H(e(ot.zone))} · ${e("Niv. {n} max", { n: ot.level })}</small>`,
        1200,
        "special",
      );
    },
    goEvent(r) {
      const G = r != null ? t.Events.get(r) : t.Events.cur;
      if (G && !le.eventTeam(G.id).length) {
        (X(e("Compose d'abord ton équipe d'event !")), t.EventTeam.open(G.id));
        return;
      }
      if (!ve.startEvent(G?.seq)) {
        X(e("L'event n'est plus ouvert."));
        return;
      }
      ((J = ""),
        (Xt = null),
        t.App.show("adventure"),
        ja(
          `${e("La chasse commence !")}<small>${H(le.DEX[ve.state.event.id].name)} · ${H(e(t.Events.zoneOf(t.Events.get(ve.state.event.seq) || ve.state.event).zone))}</small>`,
          1200,
          "special",
        ));
    },
    goRaid(r) {
      const G = t.Raids.block(r);
      if (G) {
        X(H(e(G)));
        return;
      }
      if (!ve.startRaid(r)) {
        X(e("Impossible de lancer le raid."));
        return;
      }
      ((J = ""),
        (Xt = null),
        t.App.show("adventure"),
        ja(
          `${e("Le raid commence !")}<small>${e("{mon} chromatique t'attend au fond", { mon: H(le.DEX[ve.state.event.id].name) })}</small>`,
          1200,
          "special",
        ));
    },
    leaveRaid() {
      (ve.leaveEvent(), (J = ""), (Xt = null), hs());
    },
    goTower() {
      if (!ve.startTower(!!t.Tower.ignoreLock())) {
        X(e("La Tour de Combat n'est pas encore ouverte."));
        return;
      }
      ((J = ""), (Xt = null), t.App.show("adventure"));
      const r = t.Tower.run();
      ja(
        `${e("Étage {n}", { n: r.floor })}<small>${e("Tour de Combat")} · ${e("{n} Pokémon debout", { n: t.Tower.left() })}</small>`,
        1200,
        "special",
      );
    },
    goCandy(r = 1) {
      if (!ve.startTower(!!t.CandyRun.ignoreLock(), "candy", r)) {
        X(e("Le run du jour ne peut pas commencer."));
        return;
      }
      ((J = ""), (Xt = null), t.App.show("adventure"));
      const G = t.CandyRun.run();
      ja(
        `${e("Étage {n}", { n: G.floor })}<small>${e("Fabrique de Bonbons")} · ${x(G.type, !0)}</small>`,
        1200,
        "special",
      );
    },
    leaveCandy() {
      const r = ve.state.tower?.kind === "candy" ? ve.leaveTower() : t.CandyRun.finish();
      return ((J = ""), (Xt = null), hs(), r);
    },
    leaveTower() {
      const r = ve.state.tower && !it() ? ve.leaveTower() : (t.Tower.finish(), null);
      return ((J = ""), (Xt = null), hs(), r);
    },
    chapterMeta: kt,
    chapterBadge: Vt,
    chapterNum: V,
    regionKey: pe,
    regionGyms: lt,
    demoDup(r) {
      const G = le.activeTeam().map(le.getMon).filter(Boolean);
      if (!G.length) return;
      const be = (d) => G.filter((i) => le.candyFamily(i.id) === d).length,
        ot = r ? le.candyFamily(r) : G.map((d) => le.candyFamily(d.id)).sort((d, i) => be(i) - be(d))[0],
        $t = le.ownedMons().filter((d) => le.candyFamily(d.id) === ot),
        Wt = $t.map((d) => ({
          uid: d.uid,
          amount: Math.round(le.candyXp(d) / $t.length),
          levels: 0,
          level: d.level,
          from: d.xp / le.xpForNext(d.level, d),
        }));
      return ne(
        { candy: { family: ot, amount: 1, fed: Wt } },
        a("#enemy-slot .enemy img"),
        H(le.DEX[ot].name),
      );
    },
    demoReconnect() {
      const r = [...le.allMons()].sort(() => Math.random() - 0.5).slice(0, 16),
        G = r.slice(0, Math.ceil(r.length / 3)).map((ot) => ({
          id: ot.id,
          from: ot.level,
          to: Math.min(P.MAX_LEVEL, ot.level + 1 + Math.floor(Math.random() * 4)),
          uid: ot.uid,
        })),
        be = [
          ...G.map((ot) => ({ id: ot.id, merge: ot })),
          ...r.slice(G.length).map((ot) => ({ id: ot.id, shiny: ot.shiny })),
        ].sort(() => Math.random() - 0.5);
      return lo({
        region: "kanto",
        back: be.length - G.length,
        merged: G,
        money: 1234567,
        items: 3,
        fliers: be,
      });
    },
    refreshTeam() {
      ((J = ""),
        !ve.state.battle && !We.length && ($e = _e ? Ua() : sn()),
        a("#screen-adventure.active") && (ea(!0), Ls()));
    },
  };
})();
