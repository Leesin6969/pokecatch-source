/**
 * screen candy
 *
 * Public API on the game namespace `t`: t.Screens.candy
 *
 * Recovered from the shipped bundle — original chunk #68 at byte 1855898 (12776 bytes, sha256:a4a3a2302069214c).
 * This file is one original source file; the build concatenates them in filename order.
 */
(function () {
  const { $: a, esc: b, typeBadge: f } = t.UI,
    ue = (qe) => t.UI.fmt(qe),
    H = t.Game,
    vt = t.CONFIG,
    B = () => t.CandyRun,
    se = () => vt.CANDY_RUN,
    Ge = () => t.Adventure.state,
    Je = () => Ge().tower?.kind === "candy";
  function Ze() {
    const qe = Math.max(0, Math.ceil((t.Raids.nextDay() - H.time()) / 1e3)),
      ce = Math.floor(qe / 3600),
      tt = Math.floor(qe / 60) % 60;
    return e("{h} h {m} min", { h: ce, m: String(tt).padStart(2, "0") });
  }
  const x = (qe, ce, tt = "") =>
      t.UI.tipped(
        `<img src="${t.UI.itemSrc(qe)}" alt="">${ce == null ? "" : `<b class="lb-prize-q">×${ue(ce)}</b>`}`,
        b(t.UI.itemName(qe)),
        e(qe === "rare-candy" ? "Fait monter un Pokémon d'un niveau." : "Donne de l'XP à un Pokémon."),
        `lb-prize cr-tile ${tt}`,
      ),
    $ = (qe) =>
      Object.entries(qe || {})
        .filter(([, ce]) => typeof ce == "number" && ce > 0)
        .map(([ce, tt]) => x(ce, tt))
        .join(""),
    X = [
      "exp-candy-s",
      "exp-candy-s",
      "exp-candy-m",
      "exp-candy-m",
      "exp-candy-xl",
      "exp-candy-xl",
      "exp-candy-big",
      "rare-candy",
    ],
    Tt = [30, 40, 40, 60],
    le = new Set();
  function P(qe) {
    if (!qe) return;
    const ce = Object.assign(document.createElement("span"), { className: "cr-rain" }),
      tt = qe.querySelector(":scope > .sc");
    tt ? tt.after(ce) : qe.prepend(ce);
    let mt = !1,
      Te = null,
      At = !0;
    const yt = () => mt && qe.isConnected && !document.hidden && !document.body.classList.contains("calm");
    function he(_ = 0) {
      const we = new Image(),
        ie = Tt[Math.floor(Math.random() * Tt.length)],
        U = Math.random() * 360,
        Ne = Math.round((1600 + Math.random() * 5400) * (1.25 - (ie - 30) / 60));
      ((we.src = t.UI.itemSrc(X[Math.floor(Math.random() * X.length)])),
        (we.alt = ""),
        (we.style.cssText = `left:calc(${(Math.random() * 100).toFixed(1)}% - ${ie / 2}px);width:${ie}px;height:${ie}px`),
        ce.appendChild(we));
      const T = we.animate(
        [
          { transform: `translateY(${-ie}px) rotate(${U}deg)` },
          {
            transform: `translateY(${qe.clientHeight + ie}px) rotate(${U + (Math.random() < 0.5 ? -1 : 1) * (90 + Math.random() * 270)}deg)`,
          },
        ],
        { duration: Ne, easing: "linear" },
      );
      (_ && (T.currentTime = _ * Ne), (T.onfinish = () => we.remove()));
    }
    function fe() {
      if (((Te = null), !qe.isConnected)) {
        et();
        return;
      }
      if (yt()) {
        if (At) {
          At = !1;
          for (let _ = 0; _ < 13; _++) he(Math.random());
        }
        (he(), (Te = Wa(fe, 200 + Math.random() * 292)));
      }
    }
    const Oe = () => {
        yt() && !Te && fe();
      },
      Ee = new IntersectionObserver(([_]) => {
        ((mt = _.isIntersecting), Oe());
      });
    (Ee.observe(qe), document.addEventListener("visibilitychange", Oe));
    function et() {
      (Ee.disconnect(),
        document.removeEventListener("visibilitychange", Oe),
        clearTimeout(Te),
        (Te = null),
        ce.remove(),
        le.delete(et));
    }
    le.add(et);
  }
  const u = () => {
      for (const qe of [...le]) qe();
    },
    ve = () => `<img class="rh-charm cr-art" src="${t.UI.itemSrc("rare-candy")}" alt="">`,
    it = (
      qe,
      ce,
    ) => `<div class="mp-hero cr-hero" style="background-image:${t.SCENES.css({ scene: B().SCENE })}">
      ${qe ? `<span class="st cur">▶ ${e("Étage {n}", { n: qe.floor })}</span>` : B().playedToday() ? `<span class="st ok">✓ ${e("Run du jour fait")}</span>` : ""}
      ${ce ? `<span class="cr-type">${e("Type du jour")} ${f(ce.type, !0)}</span>` : ""}</div>`;
  function De() {
    B()
      .loadDay()
      .then((mt) => {
        mt &&
          !je &&
          ((je = mt.day),
          t.Screens.raid.page() === "home" && a("#screen-raid.active") && t.Screens.raid.render());
      });
    const qe = B().run(),
      ce = B().today(),
      tt = B().last();
    return qe
      ? e("Étage {n}", { n: qe.floor })
      : ce
        ? B().playedToday()
          ? tt?.day === ce.day
            ? e("Run du jour : étage {n}", { n: tt.floor })
            : e("Run du jour fait")
          : e("Ton run du jour t'attend.")
        : t.Cloud?.user
          ? B().dayFailed()
            ? e("Fabrique indisponible pour le moment.")
            : e("Chargement…")
          : e("Connecte-toi (Options) pour lancer le run du jour.");
  }
  let je = null;
  function pt() {
    const qe = B().run(),
      ce = qe ? { type: qe.type } : B().today();
    return `${ce ? `<span>${e("Type du jour")} ${f(ce.type, !0)}</span>` : ""}${qe ? `<span class="chip-cur">▶ <b>${e("En cours")}</b></span>` : B().playedToday() ? `<span class="chip-ok">✓ <b>${e("Run du jour fait")}</b></span>` : ""}${B().best() ? `<span>${e("Record : étage {n}", { n: B().best() })}</span>` : ""}`;
  }
  function re() {
    const qe = B().picked(),
      ce = !Je() && !B().run(),
      tt = ce ? "button" : "span",
      mt = ce ? ` data-cr-team title="${b(e("Choisir l'équipe"))}"` : "";
    return `<div class="cr-team"><div class="cr-team-h"><b>${e("Équipe")}</b><small>${e("{n}/{max} · Pokémon des régions liées", { n: qe.length, max: se().TEAM })}</small></div>
      <div class="cr-slots">${Array.from({ length: se().TEAM }, (Te, At) => {
        const yt = qe[At];
        return yt
          ? `<${tt} class="cr-slot"${mt}${ce ? "" : ` title="${b(H.DEX[yt.id].name)}"`}>${t.UI.rankTag(yt)}${t.UI.sprBox(yt.id, yt.shiny, 1, 48)}<i>${e("Nv. {n}", { n: yt.level })}</i></${tt}>`
          : `<${tt} class="cr-slot free"${mt}>${e("＋")}</${tt}>`;
      }).join("")}</div></div>`;
  }
  function We() {
    const qe = B().today(),
      ce = t.TYPE_CHART;
    t.EventTeam.open(B().TEAM_KEY, {
      key: B().TEAM_KEY,
      size: se().TEAM,
      cap: 100,
      noBoss: !0,
      head: () => `<span class="evt-leg"><img src="${t.UI.itemSrc("rare-candy")}" alt=""></span><h2>${e("Équipe · Fabrique de Bonbons")}</h2>
        <span class="evt-meta">${qe ? `${e("Type du jour")} ${f(qe.type, !0)}` : ""}</span>`,
      edge: (tt) => (qe && H.DEX[tt.id].types.some((mt) => (ce[mt]?.[qe.type] ?? 1) > 1) ? 1 : 0),
      tip: e("Efficace contre le type du jour"),
      legend: e('<span class="tag-ef up">▲</span> efficace contre le type du jour'),
      allow: (tt) => B().allowed(tt),
    });
  }
  let oe = 1;
  function $e() {
    const qe = B().starts();
    return (
      qe.includes(oe) || (oe = qe[qe.length - 1]),
      `<div class="cr-start"><b>${e("Départ")}</b>${t.UI.helpTip(e("Départ"), e("Partir plus haut saute les petits bonbons. Si ton équipe franchit 10 étages après le départ, tu gardes les Super Bonbons des étages sautés et les Bonbons Exp. de ta région en cours."))}
      <div class="seg">${se()
        .STARTS.map((ce) =>
          qe.includes(ce)
            ? `<button class="${ce === oe ? "on" : ""}" data-cr-from="${ce}" title="${b(e("Étage {n}", { n: ce }))}">${ue(ce)}</button>`
            : `<button disabled title="${b(e("Atteins l'étage {n} pour partir d'ici.", { n: B().opensAt(ce) }))}">${t.UI.lockIc}${ue(ce)}</button>`,
        )
        .join("")}</div></div>`
    );
  }
  function Z(qe) {
    const ce = qe ? qe.floor - 1 : B().last()?.day === B().today()?.day ? B().last().floor : 0,
      tt = qe ? Math.ceil(qe.floor / se().STEP) * se().STEP : null,
      mt = qe?.from ?? oe,
      Te = Math.max(60, Math.ceil(((B().best() || 0) + 10) / se().STEP) * se().STEP),
      At = (he, fe, Oe) =>
        `<span class="mp-it ${Oe}"><span class="tip-host" tabindex="0"><img src="${t.UI.itemSrc(he)}" alt=""><span class="bag-tip info-tip-box" role="tooltip"><b>${b(t.UI.itemName(he))} ×${ue(fe)}</b></span></span><span class="it-n">${Oe === "got" ? "✓" : `×${ue(fe)}`}</span></span>`,
      yt = [];
    for (let he = se().STEP; he <= Te; he += se().STEP) {
      const fe = B().stepOf(he),
        Oe = he <= ce ? "got" : he === tt ? "cur" : "rnd",
        Ee = !qe && he < mt ? " skip" : "";
      yt.push(`<div class="mp-pk cr-pk ${Oe}${Ee}"><h5 title="${b(e("Étage {n}", { n: he }))}">${he}</h5>
        <div class="mp-items">${At(fe.candy[0], fe.candy[1], Oe)}${fe.sb ? At("rare-candy", fe.sb, Oe) : ""}</div></div>`);
    }
    return `<div class="cr-steps"><h4 class="cr-eye">${e("Paliers")}<small>${e("Bonbons et camp de soin tous les {n} étages", { n: se().STEP })}</small></h4><div class="cr-pks">${yt.join("")}</div></div>`;
  }
  function A(qe) {
    (qe.addEventListener(
      "wheel",
      (At) => {
        if (Math.abs(At.deltaY) <= Math.abs(At.deltaX)) return;
        const yt = qe.scrollWidth - qe.clientWidth;
        (At.deltaY < 0 && qe.scrollLeft <= 0) ||
          (At.deltaY > 0 && qe.scrollLeft >= yt - 1) ||
          (At.preventDefault(), (qe.scrollLeft += At.deltaY));
      },
      { passive: !1 },
    ),
      qe.addEventListener("dragstart", (At) => At.preventDefault()));
    let ce = null,
      tt = 0,
      mt = !1;
    (qe.addEventListener("pointerdown", (At) => {
      At.pointerType !== "mouse" ||
        At.button ||
        (At.preventDefault(), (ce = At.clientX), (tt = qe.scrollLeft), (mt = !1));
    }),
      qe.addEventListener("pointermove", (At) => {
        if (ce == null) return;
        const yt = At.clientX - ce;
        (!mt && Math.abs(yt) > 4 && ((mt = !0), qe.setPointerCapture(At.pointerId), qe.classList.add("drag")),
          mt && (qe.scrollLeft = tt - yt));
      }));
    const Te = () => {
      ((ce = null), qe.classList.remove("drag"));
    };
    (qe.addEventListener("pointerup", Te),
      qe.addEventListener("pointercancel", Te),
      qe.addEventListener(
        "click",
        (At) => {
          mt && (At.preventDefault(), At.stopPropagation(), (mt = !1));
        },
        !0,
      ));
  }
  let J = null;
  const de = () => {
    a("#screen-raid.active") && t.Screens.raid.page() === "candy" && t.Screens.raid.render();
  };
  function _e(qe = J) {
    const ce = a("#candy-root");
    if (!ce || !qe) return;
    ((J = qe),
      B()
        .loadDay()
        .then((L) => {
          L && !ce.dataset.day && ((ce.dataset.day = L.day), de());
        }));
    const tt = B().run(),
      mt = B().today(),
      Te = B().why(),
      At = B().last(),
      yt = tt ? B().sbToday(tt) : (Te === "played" && At?.day === mt?.day && At.got?.["rare-candy"]) || 0,
      he = yt >= se().SB_DAY,
      fe = (L, R) => `<div class="dc-fact">${L}<b>${R}</b></div>`,
      Oe = {
        locked: e("La Fabrique s'ouvre après ta victoire à la Ligue de Hoenn."),
        team: e("Choisis ton équipe : des Pokémon des régions liées."),
        day: t.Cloud?.user
          ? B().dayFailed()
            ? e("Fabrique indisponible pour le moment.")
            : e("Chargement…")
          : e("Connecte-toi (Options) pour lancer le run du jour."),
      }[Te],
      Ee = Je()
        ? `<button class="mp-go" data-cr-follow>${e("Suivre le run")}</button><button class="btn ghost" data-cr-stop>${e("Arrêter")}</button>`
        : tt
          ? `<button class="mp-go" data-cr-go>${e("Reprendre le run")}</button><button class="btn ghost" data-cr-stop>${e("Arrêter")}</button>`
          : Te === "played"
            ? `<button class="mp-go" disabled>${e("Nouveau run dans {time}", { time: `<b data-cr-timer>${Ze()}</b>` })}</button>`
            : `<button class="mp-go" data-cr-go ${Te ? "disabled" : ""}>${e("Lancer le run")}</button>`,
      et =
        !tt && At && At.day === mt?.day
          ? `<div class="cr-last"><b>${e("Run du jour : étage {n}", { n: At.floor })}</b><span class="cr-pay">${$(At.got) || `<small>${e("Aucun bonbon cette fois.")}</small>`}</span></div>`
          : "";
    (t.UI.morph(
      ce,
      `<div class="map-region cr" style="--c:var(--candy)">
      ${qe(e("Fabrique de Bonbons"), t.UI.helpTip(e("Fabrique de Bonbons"), e("Un run par jour, jusqu'à ce que ton équipe tombe. Tous les 5 étages, des bonbons pour les régions liées, gardés même si tu t'arrêtes. {n} Super Bonbons par jour au plus.", { n: se().SB_DAY })), `${Te === "played" ? "" : `<span>${e("Nouveau run dans {time}", { time: `<b data-cr-timer>${Ze()}</b>` })}</span>`}<span>${e("Record : étage {n}", { n: `<b>${B().best() || "—"}</b>` })}</span>`)}
      <div class="map-body cr-body">
        <div class="cr-card">
          ${it(tt, tt ? { type: tt.type } : mt)}
          <div class="cr-in">
            <div class="dc-facts">${fe(e("Record"), B().best() ? e("Étage {n}", { n: B().best() }) : "—")}${fe(e("Super Bonbons du jour"), `<span class="${he ? "cr-full" : ""}">${ue(yt)} / ${se().SB_DAY}</span>`)}${tt ? fe(e("Pokémon debout"), `${B().left()}/${B().fit()}`) : ""}</div>
            ${he && tt ? `<p class="cr-note">${e("Les {n} Super Bonbons du jour sont gagnés : leurs paliers doublent les Bonbons Exp. à la place.", { n: se().SB_DAY })}</p>` : ""}
            ${re()}
            ${tt || Te === "played" || se().STARTS.length < 2 ? "" : $e()}
            ${et}
            ${Oe ? `<p class="cr-note">${Te === "locked" ? t.UI.lockIc : ""}${Oe}</p>` : ""}
            <div class="mp-act cr-act">${Ee}</div>
          </div>
        </div>
        ${Te === "locked" ? "" : Z(tt)}
      </div></div>`,
    ),
      u(),
      P(ce.querySelector(".cr-hero")));
    const _ = ce.querySelector(".cr-pks"),
      we = _?.querySelector(".cr-pk.cur, .cr-pk.rnd:not(.skip)");
    (_ && we && (_.scrollLeft = Math.max(0, we.offsetLeft - _.offsetLeft - 2 * we.offsetWidth)), _ && A(_));
    for (const L of ce.querySelectorAll("[data-cr-from]"))
      L.onclick = () => {
        ((oe = +L.dataset.crFrom), de());
      };
    const ie = ce.querySelector("[data-cr-go]"),
      U = ce.querySelector("[data-cr-follow]"),
      Ne = ce.querySelector("[data-cr-stop]"),
      T = ce.querySelectorAll("[data-cr-team]");
    for (const L of T) L.onclick = We;
    (ie && (ie.onclick = () => t.Screens.adventure.goCandy(oe)),
      U && (U.onclick = () => t.App.show("adventure")),
      Ne &&
        (Ne.onclick = async () => {
          (await t.UI.confirm(
            e("Arrêter le run ? Les bonbons gagnés sont gardés, mais le run du jour est fini."),
            e("Arrêter"),
          )) && (t.Screens.adventure.leaveCandy(), de());
        }));
  }
  let Re = null;
  Ss(() => {
    if (!a("#screen-raid.active") || t.Screens.raid.page() !== "candy") return;
    const qe = t.Raids.dateKey();
    if (Re && Re !== qe) {
      Re = null;
      const ce = a("#candy-root");
      (ce && delete ce.dataset.day, de());
      return;
    }
    Re = qe;
    for (const ce of document.querySelectorAll("[data-cr-timer]")) ce.textContent = Ze();
  }, 1e3);
  function dt(qe) {
    const ce = (fe, Oe) => `<div class="dc-fact">${fe}<b>${Oe}</b></div>`,
      tt = qe.from || 1,
      mt = qe.floor || 0,
      Te = Math.max(0, mt - tt + 1),
      At = mt > 0 && mt >= (qe.best || 0),
      yt = Object.entries(qe.got || {}).filter(([, fe]) => typeof fe == "number" && fe > 0),
      he = yt.length
        ? `<div class="oc-sec"><h4>${e("Butin")}<em><b>${ue(yt.reduce((fe, [, Oe]) => fe + Oe, 0))}</b></em></h4><div class="ug-back-loot">${yt.map(([fe, Oe]) => `<div class="ug-back-li" title="${b(t.UI.itemName(fe))}"><img src="${t.UI.itemSrc(fe)}" alt=""><span>${b(t.UI.itemName(fe))}</span><b>×${ue(Oe)}</b></div>`).join("")}</div></div>`
        : `<p class="oc-note"><span>${e("Aucun bonbon cette fois.")}</span></p>`;
    return t.UI.modal({
      className: "dexcard-modal oc-modal ug-back cr-back",
      body: `<div class="dc-head"><h2>${e("Fin du run !")}</h2><div class="dc-sum"><button class="dc-x" aria-label="${e("Fermer")}">✕</button></div></div>
        <div class="dc-facts oc-facts">${ce(e("Étages franchis"), Te)}${ce(e("Départ"), e("Étage {n}", { n: tt }))}${ce(e("Record"), e("Étage {n}", { n: qe.best || mt }))}</div>
        <p class="oc-note"><span>${e("K.O. à l'étage {n}", { n: mt + 1 })}</span>${At ? `<b class="ug-rec">${e("Nouveau record !")}</b>` : ""}</p>${he}`,
      actions: [{ label: e("Super !"), cls: "gold", value: !0 }],
      onOpen: (fe, Oe) => {
        fe.querySelector(".dc-x").onclick = () => Oe(null);
      },
    });
  }
  t.Screens.candy = {
    render: _e,
    art: ve,
    bannerSub: De,
    bannerChips: pt,
    rainOn: P,
    rainOff: u,
    recap: dt,
    frieze: A,
  };
})();
