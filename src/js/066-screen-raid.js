/**
 * screen raid
 *
 * Public API on the game namespace `t`: t.Screens.raid
 *
 * Recovered from the shipped bundle — original chunk #65 at byte 1743128 (19429 bytes, sha256:1e52d9771808056a).
 * This file is one original source file; the build concatenates them in filename order.
 */
(function () {
  const { $: a, esc: b, sprBox: f, typeBadge: ue, artImg: H } = t.UI,
    vt = t.Game,
    B = t.CONFIG,
    se = () => t.Raids,
    Ge = () => t.Adventure.state;
  let Je = "home",
    Ze = null,
    x = null;
  const $ = (V) => !!Ge().event?.raid && Ge().event.reg === V,
    X = (V) => t.TYPES[vt.DEX[V].types[0]].color,
    Tt = () => (matchMedia("(max-width: 640px)").matches ? 120 : 192);
  function le() {
    const V = Math.max(0, Math.ceil((se().nextDay() - vt.time()) / 1e3));
    return `${Math.floor(V / 3600)} h ${String(Math.floor(V / 60) % 60).padStart(2, "0")} min ${String(V % 60).padStart(2, "0")} s`;
  }
  const P = () =>
    se().drawing()
      ? e("Nouveau raid dans {time}", { time: `<b data-raid-timer>${le()}</b>` })
      : e("Nouveaux raids dans {time}", { time: `<b data-raid-timer>${le()}</b>` });
  function u(V, lt) {
    if (!V) return `background-image:${t.SCENES.css({ bg: "prairie", fallback: "prairie", name: "Raid" })}`;
    const kt = se().sceneOf(V, lt, se().dateKey()),
      ra = kt.aura?.light,
      Vt = t.SCENES.css({ ...kt, name: "Raid" });
    return ra
      ? `background-image:linear-gradient(${ra}, ${ra}), ${Vt};background-blend-mode:multiply, normal`
      : `background-image:${Vt}`;
  }
  const ve = (V) =>
      `<span class="raid-theme" style="--th:${V.color}">${V.icon} <b>${b(e(V.name))}</b></span>`,
    it = (
      V,
      lt,
      kt = "",
      ra = !1,
      Vt = "assets/ui/shiny-charm.png",
    ) => `<div class="map-head">${ra ? `<button class="btn ghost rh-back" data-raid-page="home" aria-label="${b(e("Retour aux raids"))}">‹</button>` : ""}
    <img src="${Vt}" alt=""><h2>${V}</h2>${lt}${kt ? `<div class="map-sum">${kt}</div>` : ""}</div>`;
  function De(V) {
    const lt = se().ready(),
      kt = lt && se().themeOn(se().dateKey()),
      ra = lt ? V.filter((Xt) => se().done(Xt.key)).length : 0,
      Vt = lt && se().drawn() && se().regionOf(se().drawn());
    return Vt && se().revealed() && se().bossOn(Vt.key)
      ? pt(Vt)
      : Vt
        ? `<button class="rh-hb walk" data-raid-draw data-glint-fade="8:.94 45:.55 80:.05" style="--bc:var(--raid)"><span class="sc" style="${u(null, V[0].key)}"></span>
      <img class="rh-charm" src="assets/ui/shiny-charm.png" alt="">
      <span class="in"><span class="eye">${e("Chaque jour")}</span><span class="tt">${e("Raids chroma")}</span>
        <span class="sub">${e("Touche pour tirer ton raid du jour.")}</span>
        <span class="mp-chips">${kt ? ve(kt) : ""}<span>${e("{n} / {max} régions", {
          n: se()
            .lane()
            .filter((Xt) => Xt.won).length,
          max: se().lane().length,
        })}</span></span></span>
      <span class="go" aria-hidden="true">›</span></button>`
        : `<button class="rh-hb walk" data-raid-page="chroma" data-glint-fade="8:.94 45:.55 80:.05" style="--bc:var(--raid)"><span class="sc" style="${u(null, V[0].key)}"></span>
      <img class="rh-charm" src="assets/ui/shiny-charm.png" alt="">
      <span class="in"><span class="eye">${e("Chaque jour")}</span><span class="tt">${e("Raids chroma")}</span>
        <span class="sub">${lt ? P() : _()}</span>
        ${lt ? `<span class="mp-chips">${kt ? ve(kt) : ""}${V.some((Xt) => $(Xt.key)) ? `<span class="chip-cur">▶ <b>${e("En cours")}</b></span>` : ""}<span class="${ra ? "chip-ok" : ""}">✓ ${e("{n} / {max} capturés", { n: ra, max: V.length })}</span></span>` : ""}</span>
      <span class="go" aria-hidden="true">›</span></button>`;
  }
  let je = !1;
  function pt(V) {
    const lt = se().bossOn(V.key),
      kt = se().themeOn(se().dateKey(), V.key),
      ra = se().done(V.key),
      Vt = je ? " rd-new" : "";
    return (
      (je = !1),
      `<button class="rh-hb${Vt}" data-raid-page="chroma" style="--bc:var(--raid);--c:${V.color};--bt:${X(lt)}"><span class="sc" style="${u(lt, V.key)}"></span>
      ${H(lt, !0, { k: 2, fit: Tt(), cls: "rh-boss" })}
      <span class="in"><span class="eye"><span class="sq"></span>${e("Raid du jour · {region}", { region: b(e(V.name)) })}</span><span class="tt">${b(vt.DEX[lt].name)} ${t.UI.shinyIc()}</span>
        <span class="sub">${P()}</span>
        <span class="mp-chips">${kt ? ve(kt) : ""}${$(V.key) ? `<span class="chip-cur">▶ <b>${e("En cours")}</b></span>` : ""}${ra ? `<span class="chip-ok">✓ <b>${e("Capturé")}</b></span>` : fe(lt, V.key)}</span></span>
      <span class="go" aria-hidden="true">›</span></button>`
    );
  }
  async function re() {
    const V = se().drawn();
    if (!(!V || We)) {
      We = !0;
      try {
        await t.RaidDraw.play({ lane: se().lane(), win: V });
      } finally {
        We = !1;
      }
      ((je = !0), se().reveal(), m());
    }
  }
  let We = !1;
  function oe() {
    const V = t.WorldBoss.state();
    return V.phase !== "soon"
      ? t.WorldBossView.banner(V)
      : {
          kind: "soon",
          title: e("Bientôt…"),
          sub: e("Un boss pour toute la communauté."),
          scene: "assets/bg/scenes/sinnoh-arceus-ciel-sombre-710x400.webp",
        };
  }
  function $e(V) {
    const lt = V.go ? "button" : "div";
    return `<${lt} class="rh-hb wb ${V.kind}" ${V.go ? "data-wb-go" : 'aria-disabled="true"'} style="--bc:var(--gold-soft)">
      <span class="sc" style="background-image:url(${V.scene})"></span>${V.art || ""}
      <span class="in">${V.eyebrow ? `<span class="eye">${V.eyebrow}</span>` : ""}<span class="tt">${V.title}</span>${V.bars || ""}${V.sub ? `<span class="sub">${V.sub}</span>` : ""}${V.chips ? `<span class="mp-chips">${V.chips}</span>` : ""}</span>
      ${V.go ? '<span class="go" aria-hidden="true">›</span>' : ""}</${lt}>`;
  }
  let Z = null;
  function A(V) {
    (de(V.querySelector(".rh-hb.walk")), t.Screens.candy.rainOn(V.querySelector(".rh-hb.candy")));
    const lt = V.querySelector(".rh-hb.wb"),
      kt = lt && t.WorldBossView.bannerFx(Z?.kind);
    kt && (lt.querySelector(".sc").after(kt), t.WorldBossView.fxWake());
  }
  let J = null;
  function de(V) {
    if ((J?.(), (J = null), !V || !t.App?.parade)) return;
    let lt = null,
      kt = !1;
    const ra = () => {
        const Ht = V.querySelector(".sc"),
          ct = V.clientHeight,
          wt = Math.max(Ht.offsetWidth / 710, Ht.offsetHeight / 400),
          ge =
            Ht.offsetTop +
            (Ht.offsetHeight - 400 * wt) *
              ((parseFloat(getComputedStyle(Ht).backgroundPositionY) || 50) / 100),
          Fe = 256 * wt + ge,
          gt = Math.min(ct - 8, 348 * wt + ge),
          Dt = (ha) => Math.round(ct - (Fe + (gt - Fe) * ha));
        return [
          { feet: Dt(0.2), z: 1 },
          { feet: Dt(0.5), z: 2 },
        ];
      },
      Vt = () => {
        const Ht = kt && V.isConnected && !document.hidden;
        Ht && !lt
          ? (lt = t.App.parade(V, { shiny: !0, lanes: ra, min: 4, max: 7, gap: [500, 1100] }))
          : !Ht && lt && (lt(), (lt = null));
      },
      Xt = new IntersectionObserver(([Ht]) => {
        ((kt = Ht.isIntersecting), Vt());
      });
    (Xt.observe(V),
      document.addEventListener("visibilitychange", Vt),
      (J = () => {
        (Xt.disconnect(), document.removeEventListener("visibilitychange", Vt), lt?.());
      }));
  }
  const _e = () =>
      t.CandyRun?.unlocked()
        ? `<button class="rh-hb candy" data-raid-page="candy" style="--bc:var(--candy)"><span class="sc" style="background-image:${t.SCENES.css({ scene: t.CandyRun.SCENE })}"></span>
      ${t.Screens.candy.art()}
      <span class="in"><span class="eye">${e("Chaque jour")}</span><span class="tt">${e("Fabrique de Bonbons")}</span>
        <span class="sub">${t.Screens.candy.bannerSub()}</span>
        <span class="mp-chips">${t.Screens.candy.bannerChips()}</span></span>
      <span class="go" aria-hidden="true">›</span></button>`
        : t.STORY.regionUnlocked("hoenn", t.Game.S.adv)
          ? `<div class="rh-hb candy soon" aria-disabled="true" style="--bc:var(--candy)"><span class="sc" style="background-image:${t.SCENES.css({ scene: t.CandyRun.SCENE })}"></span>
      ${t.Screens.candy.art()}
      <span class="in"><span class="eye">${e("Chaque jour")}</span><span class="tt">${e("Fabrique de Bonbons")}</span>
        <span class="sub">${t.UI.lockIc}${e("La Fabrique s'ouvre après ta victoire à la Ligue de Hoenn.")}</span></span></div>`
          : "",
    Re = () =>
      t.Tower?.unlocked()
        ? `<button class="rh-hb tower" data-raid-page="tower" style="--bc:var(--tower)"><span class="sc" style="background-image:${t.SCENES.css({ scene: "hoenn-zone-combat-exterieur" })}"></span>
      ${t.Screens.tower.art()}
      <span class="in"><span class="eye">${e("Chaque semaine")}</span><span class="tt">${e("Tour de Combat")}</span>
        <span class="sub">${t.Screens.tower.bannerSub()}</span>
        <span class="mp-chips">${t.Screens.tower.bannerChips()}</span></span>
      <span class="go" aria-hidden="true">›</span></button>`
        : t.STORY.regionUnlocked("hoenn", t.Game.S.adv)
          ? `<div class="rh-hb tower soon" aria-disabled="true" style="--bc:var(--tower)"><span class="sc" style="background-image:${t.SCENES.css({ scene: "hoenn-zone-combat-exterieur" })}"></span>
      ${t.Screens.tower.art()}
      <span class="in"><span class="eye">${e("Chaque semaine")}</span><span class="tt">${e("Tour de Combat")}</span>
        <span class="sub">${t.UI.lockIc}${e("Bats la Ligue de Hoenn pour la débloquer")}</span></span></div>`
          : "",
    dt = () =>
      t.UI.holdNote(
        e(
          "Tu ne peux plus participer aux raids chroma, au world boss, à la Fabrique de Bonbons ni à la Tour de Combat.",
        ),
      ),
    qe = (V) => `<div class="map-region" style="--c:var(--raid)">
      ${it(e("Raids"), t.UI.helpTip(e("Raids"), se().drawing() ? e("Chaque jour, un raid chroma tiré pour toi parmi les régions dont tu as gagné la Ligue. Et bientôt, autre chose…") : e("Les raids chroma du jour, un boss chromatique par région. Et bientôt, autre chose…")))}
      <div class="map-body rh-body">${dt()}<div class="rh-home">${$e((Z = oe()))}${De(V)}${_e()}${Re()}</div></div></div>`,
    ce = (V) => e("Nv. {n}", { n: Math.min(V.level, B.RAID.LEVEL) });
  function tt(V) {
    return V
      ? `<span class="dc-hero rt-mon rc-mon" title="${b(vt.DEX[V.id].name)} · ${b(ce(V))}">${t.UI.rankTag(V)}
      ${f(V.id, V.shiny, t.UI.tileScale(V.id, 24, 36), 40)}</span>`
      : '<span class="rt-mon rc-mon free">＋</span>';
  }
  const mt = (V) => Array.from({ length: B.RAID.MINE }, (lt, kt) => tt(V[kt])).join("");
  function Te(V) {
    const lt = vt.S.trainer || {},
      kt = /^[\w-]+$/.test(lt.sprite || "") ? lt.sprite : "red",
      ra = `<button class="rc-grp" data-raid-edit="${V}" title="${b(e("Choisir tes Pokémon"))}">${t.UI.trainerFace(kt, "rc-port", !0)}${mt(vt.teamMons(se().mine(V)))}</button>`;
    if ($(V)) {
      const Xt = vt.S.raids?.allyFrom || [];
      return `<span class="rc-team">${ra}${Xt.map((Ht) => `<span class="rc-grp" title="${b(Ht.name)}">${t.UI.trainerFace(Ht.sprite, "rc-port")}${mt(Ht.mons.map((ct) => se().allyMon(ct)).filter(Boolean))}</span>`).join("")}</span>`;
    }
    const Vt = (Xt) => {
      const Ht = se().slotOf(V, Xt);
      return Ht
        ? `<button class="rc-grp" data-raid-slot="${V}|${Xt}" title="${b(Ht.name)} · ${b(e("Changer d'allié"))}">${t.UI.trainerFace(Ht.sprite, "rc-port", Ht.frame)}${mt(Ht.mons)}</button>`
        : `<button class="rc-grp free" data-raid-slot="${V}|${Xt}" title="${b(e("＋ Choisir un allié"))}">${mt([])}</button>`;
    };
    return `<span class="rc-team">${ra}${Array.from({ length: B.RAID.ALLIES }, (Xt, Ht) => Vt(Ht)).join("")}</span>`;
  }
  function At(V) {
    const lt = se().pityReady(V);
    return `<span class="rc-pity ${lt ? "ready" : ""}"><img src="${t.UI.itemSrc("master-ball")}" alt="${b(t.UI.itemName("master-ball"))}"><b>${lt ? e("Prête !") : `${se().pity(V)} / ${B.RAID.PITY}`}</b>${t.UI.helpTip(e("Jauge Master Ball"), e("Chaque Ball ratée sur le boss du jour remplit la jauge. Elle repart de zéro chaque jour. Pleine, ta prochaine Ball est une Master Ball : capture assurée au {n}e essai au plus tard.", { n: B.RAID.PITY }))}</span>`;
  }
  const yt = (V) =>
      `<button class="mp-chip-btn" data-raid-moves="${V}">${e("Voir les capacités")} <i aria-hidden="true">›</i></button>`,
    he = (V, lt) => !se().done(lt) && vt.isDup({ id: V, shiny: !0 }, lt),
    fe = (V, lt, kt = !1) =>
      he(V, lt)
        ? `<span class="chip-own"><b>${e("Déjà possédé")}</b>${kt ? t.UI.infoTip(e("Sa capture se changera en XP pour sa famille.")) : ""}</span>`
        : "",
    Oe = (V) => t.UI.bossMoves({ id: se().bossOn(V), level: B.RAID.LEVEL, shiny: !0 });
  function Ee(V, lt) {
    const kt = se().bossOn(V.key),
      ra = se().done(V.key),
      Vt = $(V.key),
      Xt = se().themeOn(se().dateKey(), V.key),
      Ht = se().sceneOf(kt, V.key, se().dateKey()).weather,
      ct = Ht && B.WEATHER.TYPES[Ht],
      wt = ra
        ? `<span class="st ok">✓ ${e("Capturé")}</span>`
        : Vt
          ? `<span class="st cur">▶ ${e("En cours · essai {n}", { n: Ge().event.loops + 1 })}</span>`
          : `<span class="st">${e("Raid du jour")}</span>`,
      ge = `${Xt ? ve(Xt) : ""}${vt.DEX[kt].types.map((gt) => ue(gt, !0)).join("")}<span>${e("Niv. <b>{n}</b> max", { n: B.RAID.LEVEL })}</span>
      <span>${e("Capture <b>{n} %</b>", { n: se().pityReady(V.key) ? 100 : Math.round(B.RAID.CATCH * 100) })}</span>${ct ? `<span data-cond="${Ht}">${ct.icon} <b>${b(ct.name)}</b></span>` : ""}${ra ? "" : fe(kt, V.key, !0) + At(V.key) + yt(V.key)}`,
      Fe = ra
        ? `<button class="btn" disabled>${e("Reviens demain !")}</button>`
        : `<button class="btn ${V.key === lt ? "primary" : ""}" data-raid-go="${V.key}">${e("Raid")}</button>`;
    return `<div class="rc-card ${ra ? "done" : Vt ? "run" : ""}" data-rc="${V.key}" style="--c:${V.color};--bt:${X(kt)}"><span class="sc" style="${u(kt, V.key)}"></span>
      <div class="in"><div class="top"><span class="reg">${b(e(V.name))}</span>${wt}</div>
        <h3>${b(vt.DEX[kt].name)} ${t.UI.shinyIc()}</h3>
        <div class="mp-chips">${ge}</div>
        <div class="row">${ra ? "" : Te(V.key)}<span class="acts">${Fe}
          ${Vt ? `<button class="btn ghost rc-leave" data-raid-leave>${e("Quitter le raid")}</button>` : ""}</span></div></div>
      <div class="boss">${H(kt, !0, { k: 2, fit: Tt() })}</div></div>`;
  }
  let et = 0;
  const _ = () =>
    t.Cloud?.user
      ? Date.now() - et < 3e5
        ? e("Raids indisponibles pour le moment.")
        : e("Chargement…")
      : e("Connecte-toi pour accéder aux raids chroma.");
  function we() {
    se().ready() ||
      !t.Cloud?.user ||
      Date.now() - et < 3e5 ||
      se()
        .sync()
        .then((V) => {
          (V || (et = Date.now()), a("#screen-raid.active") && m());
        });
  }
  const ie = () => `<div class="map-region" style="--c:var(--raid)">${it(e("Raids chroma"), "", "", !0)}
      <div class="map-body">${
        t.Cloud?.user
          ? t.Cloud.hold
            ? dt()
            : `<p class="pg-empty">${_()}</p>`
          : `<div class="ot-login"><p>${e("Les raids chroma se jouent en ligne : connecte-toi pour affronter les boss chromatiques du jour.")}</p>
        <div class="ot-login-btns"><button class="btn ti-discord" data-p="discord">${document.querySelector(".side-disc svg")?.outerHTML || ""}${e("Se connecter avec Discord")}</button><button class="btn ti-google" data-p="google">${t.Cloud?.GOOGLE_ICON || ""}${e("Se connecter avec Google")}</button></div></div>`
      }</div></div>`,
    U = (
      V,
    ) => `<div class="rc-card lock" style="--c:${V.color};--bt:#888"><span class="sc" style="${u(se().bossOn(V.key), V.key)}"></span>
      <div class="in"><div class="top"><span class="reg">${b(e(V.name))}</span><span class="st">${t.UI.lockIc}${e("Verrouillé")}</span></div><h3>???</h3>
        <span class="lockmsg">${V.open ? e("Bats la Ligue de {region}", { region: b(e(V.name)) }) : e("Région pas encore visitée.")}</span></div>
      <div class="boss">${H(se().bossOn(V.key), !0, { k: 2, fit: Tt() })}</div></div>`;
  function Ne(V) {
    const lt = (V.find((kt) => $(kt.key)) || V.find((kt) => !se().done(kt.key)))?.key;
    return `<div class="map-region" style="--c:var(--raid)">
      ${it(e("Raids chroma"), t.UI.helpTip(e("Raids chroma"), se().drawing() ? e("Chaque jour, un boss chromatique tiré pour toi parmi les régions dont tu as gagné la Ligue, à affronter avec 2 alliés. Essais illimités : à chaque K.O., 1 % de chance de le capturer.") : e("Chaque jour, un boss chromatique par région, à affronter avec 2 alliés. Essais illimités : à chaque K.O., 1 % de chance de le capturer.")), `<span>${P()}</span>`, !0)}
      <div class="map-body rh-body"><div class="rc-list">${V.map((kt) => Ee(kt, lt)).join("")}${se()
        .lockedRegions()
        .filter((kt) => se().bossOn(kt.key))
        .map(U)
        .join("")}</div></div></div>`;
  }
  function T(V) {
    return `<span class="dc-hero rt-mon" title="${b(vt.DEX[V.id].name)}">${t.UI.rankTag(V)}
      ${f(V.id, V.shiny, t.UI.tileScale(V.id), 48)}<span class="rt-lv">${V.level > B.RAID.LEVEL ? `<s>${V.level}</s>${B.RAID.LEVEL}` : e("Nv. {n}", { n: V.level })}</span></span>`;
  }
  const L = (
    V,
    lt = "",
    kt = "",
  ) => `<button class="raid-pick ${lt}" ${kt}>${t.UI.trainerFace(V.sprite, "ra-port", V.frame)}
        <span class="raid-ally"><span class="nm"><b>${b(V.name)}</b></span>
        <span class="rt-mons">${V.mons.map(T).join("")}</span></span></button>`;
  async function R(V, lt) {
    const kt = se().picks(V)[lt] ?? null,
      ra = se()
        .picks(V)
        .filter((ct, wt) => wt !== lt && ct),
      Vt = (ct, wt) =>
        (wt = wt.filter((ge) => !ra.includes(ge.key))).length
          ? `<div class="dc-sec"><h4>${ct}</h4><div class="raid-allies">${wt.map((ge) => L(ge, ge.key === kt ? "on" : "", `data-pick="${ge.key}"`)).join("")}</div></div>`
          : "",
      Xt = t.UI
        .h(`<div><div class="dc-head"><h2>${e("Choisis un allié")}</h2><div class="dc-sum"><button class="dc-x" aria-label="${e("Fermer")}">✕</button></div></div>
      <div class="raid-scroll">${Vt(
        e("Amis"),
        se()
          .offers(V)
          .filter((ct) => ct.friend),
      )}${Vt(e("Dresseurs"), se().bots(V))}</div></div>`),
      Ht = await t.UI.modal({
        className: "dexcard-modal raid-dlg",
        body: Xt,
        actions: kt ? [{ label: e("Retirer"), cls: "ghost", value: "" }] : [],
        onOpen: (ct, wt) => {
          ((ct.querySelector(".dc-x").onclick = () => wt(null)),
            ct.querySelectorAll("[data-pick]").forEach((ge) => (ge.onclick = () => wt(ge.dataset.pick))));
        },
      });
    Ht != null && (se().setPick(V, lt, Ht || null), t.Sfx?.click?.(), m());
  }
  const te = (V) =>
      t.EventTeam.open(se().bossOn(V), {
        key: se().teamKey(V),
        size: B.RAID.MINE,
        label: e("Raid"),
        cap: B.RAID.LEVEL,
        reg: V,
        moves: () => Oe(V),
      }),
    K = new Set();
  async function He(V) {
    if ($(V)) {
      t.App.show("adventure");
      return;
    }
    const lt = se().bossOn(V),
      kt = `${se().dateKey()}|${V}`;
    if (he(lt, V) && !K.has(kt)) {
      if (
        !(await t.UI.confirm(
          e(
            "Tu as déjà {name} chromatique : s'il est capturé, il se changera en XP pour sa famille. Lancer le raid quand même ?",
            { name: `<b>${b(vt.DEX[lt].name)}</b>` },
          ),
          e("Lancer"),
          "primary",
        ))
      )
        return;
      K.add(kt);
    }
    if (!se().block(V)) {
      t.Screens.adventure.goRaid(V);
      return;
    }
    if (!se().mine(V).length) {
      te(V);
      return;
    }
    const ra = Array.from({ length: B.RAID.ALLIES }, (Vt, Xt) => Xt).find((Vt) => !se().slotOf(V, Vt));
    if (ra != null) {
      R(V, ra);
      return;
    }
    t.Screens.adventure.goRaid(V);
  }
  function m() {
    const V = a("#raid-root"),
      lt = se()
        .regions()
        .filter((kt) => !se().ready() || se().bossOn(kt.key));
    if (!lt.length) {
      V.innerHTML = `<div class="map-region" style="--c:var(--raid)">${it(e("Raids"), "")}<div class="map-body"><p class="pg-empty">${t.UI.lockIc}${e("Les raids s'ouvrent après ta victoire à la Ligue de Kanto.")}</p></div></div>`;
      return;
    }
    if (Je === "wb") {
      if (t.WorldBossView.render(V, { head: it, back: () => z("home") })) return;
      Je = "home";
    } else t.WorldBossView.stop();
    (Je !== "candy" && t.Screens.candy.rainOff(),
      we(),
      Je === "chroma" && se().ready() && !se().revealed() && (Je = "home"),
      Je === "candy" && !t.CandyRun?.unlocked() && (Je = "home"),
      Je === "tower" && !t.Tower?.unlocked() && (Je = "home"),
      Je === "tower"
        ? (V.querySelector(":scope > #tower-root") || (V.innerHTML = '<div id="tower-root"></div>'),
          t.Screens.tower.render((kt, ra, Vt) => it(kt, ra, Vt, !0, "assets/ui/vs-recorder.png")))
        : Je === "candy"
          ? (V.querySelector(":scope > #candy-root") || (V.innerHTML = '<div id="candy-root"></div>'),
            t.Screens.candy.render((kt, ra, Vt) => it(kt, ra, Vt, !0, t.UI.itemSrc("rare-candy"))))
          : (V.innerHTML = Je === "chroma" ? (se().ready() ? Ne(lt) : ie()) : qe(lt)),
      V.querySelector("[data-raid-draw]")?.addEventListener("click", re));
    for (const kt of V.querySelectorAll("[data-p]")) kt.onclick = () => t.Cloud?.signIn(kt.dataset.p);
    (t.WorldBossView.paint(V), Je === "home" ? A(V) : de(null));
    for (const kt of V.querySelectorAll("[data-raid-page]")) kt.onclick = () => z(kt.dataset.raidPage);
    Z?.go &&
      V.querySelector("[data-wb-go]")?.addEventListener("click", () => t.WorldBossView.enter(() => z("wb")));
    for (const kt of V.querySelectorAll("[data-raid-slot]"))
      kt.onclick = () => {
        const [ra, Vt] = kt.dataset.raidSlot.split("|");
        R(ra, +Vt);
      };
    for (const kt of V.querySelectorAll("[data-raid-edit]")) kt.onclick = () => te(kt.dataset.raidEdit);
    for (const kt of V.querySelectorAll("[data-raid-go]")) kt.onclick = () => He(kt.dataset.raidGo);
    for (const kt of V.querySelectorAll("[data-raid-moves]")) kt.onclick = () => Oe(kt.dataset.raidMoves);
    (V.querySelector("[data-raid-leave]")?.addEventListener("click", () => {
      (t.Screens.adventure.leaveRaid(), m());
    }),
      x && (V.querySelector(`[data-rc="${x}"]`)?.scrollIntoView({ block: "nearest" }), (x = null)));
  }
  function z(V) {
    ((Je = V),
      V === "wb" && t.WorldBoss.refresh(!0),
      t.Sfx?.click?.(),
      m(),
      t.scrollTo({ top: 0, behavior: "instant" }));
  }
  let pe = null;
  (Ss(() => {
    if (a("#screen-raid.active")) {
      if (pe && pe !== se().dateKey()) {
        ((pe = null), m());
        return;
      }
      pe = se().dateKey();
      for (const V of document.querySelectorAll("[data-raid-timer]")) V.textContent = le();
      t.WorldBossView.tick();
    }
  }, 1e3),
    (t.Screens.raid = {
      init() {
        (t.Raids.on(() => {
          a("#screen-raid.active") && m();
        }),
          t.WorldBoss.onChange(() => {
            a("#screen-raid.active") && m();
          }));
      },
      page: () => Je,
      enter() {
        ((Je = Ze || "home"), (Ze = null), t.WorldBoss.refresh(Je === "wb"));
      },
      leave() {
        (t.WorldBossView.stop(), t.Screens.candy.rainOff());
      },
      open(V = "home") {
        ((Ze = V), (x = V === "chroma" && Ge().event?.raid ? Ge().event.reg : null), t.App.show("raid"));
      },
      render: m,
    }));
})();
