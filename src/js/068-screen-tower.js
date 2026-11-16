/**
 * screen tower
 *
 * Public API on the game namespace `t`: t.Screens.tower
 *
 * Recovered from the shipped bundle — original chunk #67 at byte 1841612 (14285 bytes, sha256:be190af1d53f9c56).
 * This file is one original source file; the build concatenates them in filename order.
 */
(function () {
  const { $: a, esc: b, typeBadge: f } = t.UI,
    ue = (Ee) => t.UI.fmt(Ee),
    H = t.Game,
    vt = t.CONFIG,
    B = () => t.Tower,
    se = () => vt.TOWER.STEPS,
    Ge = () => t.Adventure.state,
    Je = (Ee) => {
      const et = Math.round(Ee / 1e3);
      return et >= 3600
        ? `${Math.floor(et / 3600)} h ${String(Math.floor(et / 60) % 60).padStart(2, "0")}`
        : `${Math.floor(et / 60)} min ${String(et % 60).padStart(2, "0")}`;
    };
  function Ze() {
    const Ee = Math.max(0, Math.ceil((B().weekEnds() - H.time()) / 1e3)),
      et = Math.floor(Ee / 86400),
      _ = Math.floor(Ee / 3600) % 24,
      we = Math.floor(Ee / 60) % 60;
    return et
      ? e("{d} j {h} h", { d: et, h: _ })
      : e("{h} h {m} min", { h: _, m: String(we).padStart(2, "0") });
  }
  const x = (Ee) => Ee.map((et) => f(et, !0)).join(" ");
  function $(Ee, et, _) {
    const we = vt.TOWER.THEME_FLOORS,
      ie = Ee * we + 1,
      U = ie + we - 1,
      Ne = B().floorOf(U),
      T = et ? et - 1 : 0,
      L = Math.max(et, _ + 1),
      R = et >= ie && et <= U ? "cur" : T >= U ? "run" : ie > L ? "later" : "",
      te = Math.max(0, Math.min(1, (T - ie + 1) / we)),
      K = (m) => `${m === et ? "current" : m <= T ? "run" : ""}${m === _ ? " rec" : ""}`,
      He = (m) =>
        `<i class="tw-fl ${K(m)}" title="${e("Étage {n}", { n: m })}${m === _ ? " · " + e("record de la semaine") : ""}"></i>`;
    return `<li class="tw-st ${R}" style="--fill:${te}">
      <span class="tw-dot"></span>
      <div class="tw-st-in">
        <div class="tw-st-h"><b>${e("Étages {a}-{b}", { a: ie, b: U })}</b>${x(Ne.theme)}${_ >= ie && _ <= U ? `<span class="tw-rec">${e("Record : étage {n}", { n: _ })}</span>` : ""}</div>
        <div class="tw-fls">${Array.from({ length: we - 1 }, (m, z) => He(ie + z)).join("")}
          <span class="tw-boss ${K(U)}" title="${e("Étage {n}", { n: U })}"><span class="tw-boss-in">${t.UI.trainerFace(Ne.brain.sprite, "tw-face")}</span></span></div>
        <small>${e("Boss : {name} · Nv. {n}", { name: b(e(Ne.brain.name)), n: Ne.level })}</small>
      </div></li>`;
  }
  let X = "climb",
    Tt = 0;
  function le() {
    Date.now() - Tt < 3e5 ||
      B()
        .loadFriends()
        .then((Ee) => {
          (Ee?.error && (Tt = Date.now()), Ee && X === "friends" && mt() && At());
        });
  }
  let P = [];
  const u = (Ee) => ({
      rank: !1,
      me: Ee.me,
      player: { name: Ee.name, tag: Ee.tag, sprite: Ee.sprite, frame: Ee.frame },
      score: { main: e("Étage {n}", { n: Ee.floor }) },
    }),
    ve = () => t.UI.holdNote(e("Tu n'apparais pas dans les classements.")) + it();
  function it() {
    if (!B().hasTestBoard()) {
      if (!t.Cloud?.user)
        return `<p class="ev-lb-none">${e("Connecte-toi (Options) pour voir les étages de tes amis.")}</p>`;
      le();
    }
    const Ee = B().friendRows();
    return Ee
      ? Ee.some((et) => !et.me)
        ? De(Ee)
        : `${Ee.length ? De(Ee) : ""}<p class="ev-lb-none">${e("Aucun ami n'a encore franchi d'étage cette semaine.")}</p>`
      : `<p class="ev-lb-none">${e(Tt ? "Étages des amis indisponibles pour le moment." : "Chargement…")}</p>`;
  }
  const De = (Ee) => ((P = Ee.map(u)), `<div class="tw-friends">${t.UI.lbList(P)}</div>`),
    je = { tower: "Cadre Tour de Combat", towerElite: "Cadre Élite de la Tour" },
    pt = (Ee, et, _, we, ie = "") =>
      `<span class="mp-it ${we}"><span class="tip-host" tabindex="0">${Ee}<span class="bag-tip info-tip-box${ie ? " tw-tip-big" : ""}" role="tooltip"><b>${et}${_ ? ` ×${ue(_)}` : ""}</b>${ie}</span></span><span class="it-n" data-n="${_ ? `×${ue(_)}` : ""}">${we === "got" ? "✓" : _ ? `×${ue(_)}` : ""}</span></span>`;
  function re(Ee, et) {
    const _ = H.S.trainer?.sprite || "red",
      we = B().lookOf(B().weekKey());
    return B()
      .steps(Ee)
      .map((ie) => {
        const U = et(ie.floor),
          Ne = U.split(" ")[0];
        return `<div class="mp-pk cr-pk ${U}" data-f="${ie.floor}"><h5 title="${b(e("Étage {n}", { n: ie.floor }))}">${ie.floor}</h5><div class="mp-items">
        ${pt(`<img src="${t.UI.itemSrc("point-card")}" alt="">`, e("Points Combat"), ie.bp, Ne)}
        ${ie.egg ? pt(`<img src="${t.UI.itemSrc("mystery-egg")}" alt="">`, e("Œuf chromatique"), 0, Ne) : ""}
        ${ie.frame ? pt(`<i class="lb-frame ${ie.frame}"></i>`, e(je[ie.frame]), 0, `${Ne} tw-pk-fr`, t.UI.trainerFace(_, "tw-tip-face", ie.frame)) : ""}
        ${ie.look ? pt(t.UI.trainerFace(we.sprite, "tw-pk-look"), e("Look « {name} »", { name: b(e(we.name)) }), 0, `${Ne} tw-pk-lk`, t.UI.trainerFace(we.sprite, "tw-tip-face")) : ""}</div></div>`;
      })
      .join("");
  }
  const We = (Ee) => Math.max(110, Math.ceil((Ee + 20) / se().EVERY) * se().EVERY),
    oe = (Ee) => Math.floor(Ee / se().EVERY) * se().EVERY + se().EVERY;
  function $e(Ee) {
    const et = oe(Ee);
    return `<div class="cr-steps tw-steps"><h4 class="cr-eye">${e("Récompenses de la semaine")}<small>${e("Gagnées dès que tu franchis l'étage, une fois par semaine")}</small></h4><div class="cr-pks">${re(We(Ee), (_) => (_ <= Ee ? "got" : _ === et ? "cur" : "rnd"))}</div></div>`;
  }
  const Z = () => H.S.tower?.bp || 0;
  function A(Ee) {
    const et = t.UI.itemName(Ee.id),
      _ = t.UI.itemSrc(Ee.id),
      we = Ee.desc ? b(e(Ee.desc)) : (t.Screens.adventure?.itemEffect?.(Ee.id) || "").replace(/<\/?p>/g, ""),
      ie = Ee.minFloor && B().top() < Ee.minFloor,
      U = Ee.once && H.keyHeld(Ee.id) > 0,
      Ne = ie
        ? `<span class="sh-lock">${t.UI.lockIc}${e("Franchis l'étage {n} de la Tour", { n: Ee.minFloor })}</span>`
        : `<span class="sh-owned">${Ee.once ? (U ? `✓ ${e("Obtenu")}` : "") : e("Possédé : {n}", { n: `<b>${ue(H.withWallet(H.S.link && "from", () => H.itemCount(Ee.id)))}</b>` })}</span>`;
    return `<div class="sh-item${ie ? " locked" : ""}">
      <div class="sh-top"><div class="sh-ic"><img src="${_}" alt=""></div>
        <div class="sh-name"><h4>${b(et)}</h4><small>${we}</small></div></div>
      <div class="sh-bottom">${Ne}${U ? "" : `<button class="btn gold buy" data-tw-buy="${Ee.id}" ${ie || Z() < Ee.price ? "disabled" : ""}><img src="${t.UI.itemSrc("point-card")}" alt="">${ue(Ee.price)}</button>`}</div>
    </div>`;
  }
  function J(Ee) {
    const et = vt.TOWER.SHOP.find((_) => _.id === Ee.dataset.twBuy);
    if (
      !et ||
      (et.minFloor && B().top() < et.minFloor) ||
      (et.once && H.keyHeld(et.id) > 0) ||
      !B().bpOut(et.price)
    ) {
      t.Sfx.error();
      return;
    }
    (H.withWallet(H.S.link && "from", () => H.addItem(et.id, 1)),
      H.save(),
      t.Sfx.buy(),
      t.UI.tween(
        Ee.closest(".sh-item").querySelector(".sh-ic"),
        [{ transform: "scale(1)" }, { transform: "scale(1.2) rotate(-6deg)" }, { transform: "scale(1)" }],
        { duration: 320, easing: "cubic-bezier(.3,1.6,.5,1)" },
      ),
      t.UI.toast(
        H.S.link?.side === "to"
          ? e("{item} rangé dans le Sac des régions liées.", { item: b(t.UI.itemName(et.id)) })
          : e("{item} acheté !", { item: b(t.UI.itemName(et.id)) }),
        t.UI.itemSrc(et.id),
      ),
      t.App.refresh());
  }
  const de =
      () => `<section class="sh-counter tw-shop"><p class="sh-hint">${e("Points Combat gagnés à la Tour : chaque étage franchi pour la première fois de la semaine, et les récompenses du lundi")}${H.S.link?.side === "to" ? `<br>${e("Les achats vont dans le Sac des régions liées.")}` : ""}</p>
    <div class="sh-grid">${vt.TOWER.SHOP.map(A).join("")}</div></section>`,
    _e = "pc-tower-tab";
  let Re = "tower";
  try {
    localStorage.getItem(_e) === "shop" && (Re = "shop");
  } catch {}
  const dt = () => '<img class="rh-charm tw-art" src="assets/ui/vs-recorder.png" alt="">',
    qe = () =>
      t.Cloud?.hold
        ? e("Activité anormale détectée")
        : e("Nouvelle semaine dans {time}", { time: `<b data-tw-timer>${Ze()}</b>` });
  function ce() {
    const Ee = B().run(),
      et = B().best();
    return `${Ee ? `<span class="st cur">▶ ${e("Étage {n}", { n: Ee.floor })}</span>` : ""}${et ? `<span>${e("Record : étage {n}", { n: `<b>${et.floor}</b>` })}</span>` : ""}`;
  }
  const tt = () => !!t.Cloud?.hold,
    mt = () => a("#screen-raid.active") && t.Screens.raid.page() === "tower";
  let Te = null;
  function At(Ee = Te) {
    const et = a("#tower-root");
    if (!et || !Ee) return;
    Te = Ee;
    const _ = B().run(),
      we = B().best(),
      ie = !!Ge().tower,
      U = H.allMons().length,
      Ne = _?.floor ?? 0,
      T = we?.floor ?? 0,
      L = (pe, V) => `<div class="dc-fact">${pe}<b>${V}</b></div>`,
      R = ie
        ? `<button class="mp-go" data-tw-follow>${e("Suivre la run")}</button><button class="btn ghost" data-tw-quit>${e("Abandonner")}</button>`
        : _
          ? `<button class="mp-go" data-tw-go ${tt() ? "disabled" : ""}>${e("Reprendre la run")}</button><button class="btn ghost" data-tw-quit>${e("Abandonner")}</button>`
          : `<button class="mp-go" data-tw-go ${U && !tt() ? "" : "disabled"}>${e("Lancer une run")}</button>`;
    t.UI.morph(
      et,
      `<div class="map-region tw" style="--c:var(--tower)">
      ${Ee(e("Tour de Combat"), t.UI.helpTip(e("Tour de Combat"), e("Une nouvelle Tour chaque semaine, la même pour tout le monde. Ton PC se bat, du plus fort au plus faible, une seule fois par espèce, sans soin ; un Pokémon à plus de {n} niveaux sous les adversaires reste au repos.", { n: t.CONFIG.TOWER.MARGIN }) + " " + e("Chaque palier franchi pour la première fois de la semaine donne ses récompenses tout de suite : des Points Combat tous les {e} étages, un œuf chromatique à l'étage {egg}, le cadre de la Tour à l'étage {fr}, le cadre doré et le look du Meneur à l'étage {gold}.", { e: se().EVERY, egg: se().EGG, fr: se().FRAME, gold: se().GOLD })), `<span>${e("Nouvelle semaine dans {time}", { time: `<b data-tw-timer>${Ze()}</b>` })}</span><span class="tw-bp" title="${e("Points Combat")}"><img src="${t.UI.itemSrc("point-card")}" alt=""><b>${ue(Z())}</b> ${e("pts")}</span>`)}
      <div class="map-body tw-body">${t.UI.holdNote(e("Tu ne peux plus participer aux raids chroma, au world boss, à la Fabrique de Bonbons ni à la Tour de Combat."))}
        <div class="seg cs-tabs tw-tabs"><button class="${Re === "tower" ? "on" : ""}" data-tw-tab="tower">${e("Tour")}</button><button class="${Re === "shop" ? "on" : ""}" data-tw-tab="shop">${e("Boutique")}</button></div>
        ${
          Re === "shop"
            ? de()
            : `<div class="tw-card">
          <div class="mp-hero" style="background-image:${t.SCENES.css({ scene: "hoenn-zone-combat-exterieur" })}">
            ${_ ? `<span class="st cur">▶ ${e("Étage {n}", { n: _.floor })}</span>` : ""}</div>
          <div class="tw-in">
            <div class="dc-facts">${L(e("Meilleur étage"), we ? we.floor : "—")}${L(e("Chrono"), we ? Je(we.ms) : "—")}${L(e("Pokémon debout"), _ ? `${B().left()}/${B().fit()}` : "—")}</div>
            <div class="mp-act tw-act">${R}</div>
          </div>
        </div>
        ${$e(T)}
        <div class="mp-list tw-list"><div class="tw-views"><h4>${e(X === "friends" ? "Tes amis cette semaine" : "L'ascension de la semaine")}</h4><div class="seg">
            <button class="${X === "climb" ? "on" : ""}" data-tw-view="climb">${e("Ascension")}</button><button class="${X === "friends" ? "on" : ""}" data-tw-view="friends">${e("Amis")}</button></div></div>
          ${X === "friends" ? `<div class="tw-board">${ve()}</div>` : `<ol class="tw-climb">${Array.from({ length: B().TYPES.length / 2 }, (pe, V) => $(V, Ne, T)).join("")}</ol>`}</div>`
        }
      </div></div>`,
    );
    for (const pe of et.querySelectorAll("[data-tw-tab]"))
      pe.onclick = () => {
        if (Re !== pe.dataset.twTab) {
          Re = pe.dataset.twTab;
          try {
            localStorage.setItem(_e, Re);
          } catch {}
          At();
        }
      };
    for (const pe of et.querySelectorAll("[data-tw-buy]")) pe.onclick = () => J(pe);
    for (const pe of et.querySelectorAll("[data-tw-view]"))
      pe.onclick = () => {
        X !== pe.dataset.twView && ((X = pe.dataset.twView), At());
      };
    t.UI.lbBind(et, P);
    const te = et.querySelector(".tw-steps .cr-pks"),
      K = te?.querySelector(".cr-pk.cur");
    (te && K && (te.scrollLeft = Math.max(0, K.offsetLeft - te.offsetLeft - 2 * K.offsetWidth)),
      te && !te.dataset.fz && ((te.dataset.fz = "1"), t.Screens.candy.frieze(te)),
      B().catchUp(),
      B().gift() &&
        !ie &&
        !document.querySelector(".modal") &&
        Wa(() => {
          mt() && fe();
        }, 300));
    const He = et.querySelector("[data-tw-go]"),
      m = et.querySelector("[data-tw-follow]"),
      z = et.querySelector("[data-tw-quit]");
    (He && (He.onclick = () => t.Screens.adventure.goTower()),
      m && (m.onclick = () => t.App.show("adventure")),
      z &&
        (z.onclick = async () => {
          (await t.UI.confirm(
            e("Abandonner la run ? Ton meilleur étage de la semaine est déjà gardé."),
            e("Abandonner"),
          )) && (t.Screens.adventure.leaveTower(), At(), fe());
        }));
  }
  function yt(Ee, et) {
    if (!Ee) return;
    t.Screens.candy.frieze(Ee);
    const _ = [...Ee.querySelectorAll(".cr-pk.tw-new")],
      we = H.S.reducedAnim || matchMedia("(prefers-reduced-motion: reduce)").matches,
      ie = (L) => {
        Ee.scrollLeft = Math.max(0, L.offsetLeft - Ee.offsetLeft - L.offsetWidth);
      },
      U = (L) => {
        for (const R of [L, ...L.querySelectorAll(".mp-it")]) R.classList.replace("rnd", "got");
        for (const R of L.querySelectorAll(".it-n")) R.textContent = "✓";
        (L.classList.remove("tw-new"), L.classList.add("tw-pop"));
      },
      Ne = () => {
        const L = Ee.querySelector(`.cr-pk[data-f="${et}"]`);
        L && (L.classList.add("cur"), L.classList.remove("rnd"));
      },
      T = _[0] || Ee.querySelector(".cr-pk.cur");
    if ((T && ie(T), we || !_.length)) return (_.forEach(U), Ne());
    _.forEach((L, R) =>
      Wa(
        () => {
          Ee.isConnected &&
            (U(L),
            Ee.scrollTo({
              left: Math.max(0, L.offsetLeft - Ee.offsetLeft - L.offsetWidth),
              behavior: "smooth",
            }),
            R === _.length - 1 && Wa(Ne, 300));
        },
        500 + R * 320,
      ),
    );
  }
  let he = !1;
  async function fe(Ee = null) {
    const et = B().gift(),
      _ = Ee || et?.run || null;
    if (!(he || (!et && !_))) {
      he = !0;
      try {
        const we = (pe, V) => `<div class="dc-fact">${pe}<b>${V}</b></div>`,
          ie = _?.floor || 0,
          U = Math.max(_?.best || 0, ie),
          Ne = (pe, V, lt = 0) =>
            `<div class="ug-back-li" title="${b(V)}">${pe}<span>${b(V)}</span>${lt ? `<b>×${ue(lt)}</b>` : ""}</div>`,
          T = (pe) => B().BRAINS.find((V) => V.sprite === pe),
          L = (et?.items || [])
            .map((pe) =>
              pe.kind === "bp"
                ? Ne(`<img src="${t.UI.itemSrc("point-card")}" alt="">`, e("Points Combat"), pe.n)
                : pe.kind === "egg"
                  ? Ne(`<img src="${t.UI.itemSrc("mystery-egg")}" alt="">`, e("Œuf chromatique"), 1)
                  : pe.kind === "eggxp"
                    ? ((V) =>
                        Ne(
                          `<img src="${t.UI.itemSrc("mystery-egg")}" alt="">`,
                          pe.xp
                            ? e("Doublon : +{n} XP pour la famille {fam}", { n: t.UI.fmt(pe.xp), fam: V })
                            : e("Doublon : famille {fam} au niveau max", { fam: V }),
                        ))(H.DEX[H.famHead(pe.id)]?.name || "")
                    : pe.kind === "frame"
                      ? Ne(
                          t.UI.trainerFace(H.S.trainer?.sprite || "red", "tw-rc-face", pe.frame),
                          e(je[pe.frame]),
                        )
                      : pe.kind === "look"
                        ? Ne(
                            t.UI.trainerFace(pe.sprite, "tw-rc-face"),
                            ((V) =>
                              V
                                ? e("Look « {name} »", { name: e(V.name) })
                                : e("Look « Meneur de la Tour »"))(T(pe.sprite)),
                          )
                        : "",
            )
            .join(""),
          R = Math.max(U, et?.floor || 0),
          te = et?.from ?? R,
          K = oe(R),
          m =
            `<div class="cr-steps tw-steps tw-rc-steps"><div class="cr-pks">${re(We(R), (pe) => (pe <= te ? "got" : pe <= R ? "rnd tw-new" : pe === K ? "cur" : "rnd"))}</div></div>` +
            (L
              ? `<div class="oc-sec"><h4>${e("Récompenses")}</h4><div class="ug-back-loot">${L}</div></div>`
              : `<p class="oc-note"><span>${e("Prochain palier : étage {n}", { n: K })}</span></p>`),
          z = et?.mon && H.getMon(et.mon);
        (await t.UI.modal({
          className: "dexcard-modal oc-modal ug-back cr-back tw-back",
          body: `<div class="dc-head"><h2>${e(_ ? "Fin de la run !" : "Tour de Combat")}</h2><div class="dc-sum"><button class="dc-x" aria-label="${e("Fermer")}">✕</button></div></div>
          ${_ ? `<div class="dc-facts oc-facts">${we(e("Étages franchis"), ie)}${we(e("Record de la semaine"), e("Étage {n}", { n: U }))}</div>` : ""}${m}`,
          actions: [{ label: e(z ? "Ouvrir l'œuf" : "Super !"), cls: "gold", value: !0 }],
          onOpen: (pe, V) => {
            ((pe.querySelector(".dc-x").onclick = () => V(null)),
              yt(pe.querySelector(".tw-rc-steps .cr-pks"), K));
          },
        }),
          et && B().giftSeen(),
          z &&
            (await t.Screens.pension.hatchFx({ mon: z, duplicate: !1 }),
            await t.UI.showDexCard(z.id, {
              mon: z,
              isNew: et.isNew,
              actions: [{ label: e("Super !"), cls: "gold" }],
            })));
      } catch (we) {
        (console.error("Récompenses de la Tour :", we), B().gift() && B().giftSeen());
      } finally {
        ((he = !1), mt() && At());
      }
    }
  }
  let Oe = null;
  (Ss(() => {
    if (mt()) {
      if (Oe && Oe !== B().weekKey()) {
        ((Oe = null), At());
        return;
      }
      Oe = B().weekKey();
      for (const Ee of document.querySelectorAll("[data-tw-timer]")) Ee.textContent = Ze();
    }
  }, 1e3),
    (t.Screens.tower = { render: At, recap: fe, art: dt, bannerSub: qe, bannerChips: ce }));
})();
