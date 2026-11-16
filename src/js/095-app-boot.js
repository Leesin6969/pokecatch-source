/**
 * app boot
 *
 * Public API on the game namespace `t`: t.App, t.CatchUp
 *
 * Recovered from the shipped bundle — original chunk #94 at byte 2640930 (37330 bytes, sha256:a5712782aa14f132).
 * This file is one original source file; the build concatenates them in filename order.
 */
(function () {
  const { $: a, $$: b, fmt: f, modal: ue, esc: H, sprBox: vt } = t.UI,
    B = t.UI,
    se = t.Game,
    Ge = t.CONFIG;
  let Je = "adventure",
    Ze = null;
  const x = () => {
    const xt = t.Cloud?.community;
    return xt
      ? e("👥 <b>{n}</b> dresseurs · <b>{on}</b> en jeu", { n: f(xt.players), on: f(xt.online) })
      : "";
  };
  function $() {
    const xt = a("#tb-online"),
      D = t.Cloud?.community;
    if (!xt || ((xt.hidden = !D), !D)) return;
    const Q = `<i class="dot" aria-hidden="true"></i><b>${f(D.online)}</b><span class="l">${e("en jeu")}</span>`;
    (xt.innerHTML !== Q && (xt.innerHTML = Q),
      (xt.title = e("{on} dresseurs en jeu (partie sauvegardée ces 35 dernières minutes) · {n} inscrits", {
        on: f(D.online),
        n: f(D.players),
      })));
  }
  const X = "assets/ui/floppy.svg";
  function Tt() {
    const xt = t.Cloud,
      D = xt?.saveState || "off";
    if (D === "off")
      return xt?.ban
        ? e("Sauvegarde en ligne indisponible.")
        : xt?.user
          ? e("Une autre fenêtre du jeu sauvegarde ta partie.")
          : e(
              "Connecte-toi (Options) pour sauvegarder ta partie en ligne. Elle reste sauvegardée sur cet appareil.",
            );
    if (D === "lost")
      return e("Connexion expirée : ta partie n'est plus sauvegardée en ligne. Touche pour te reconnecter.");
    if (D === "busy") return e("Sauvegarde en ligne en cours…");
    if (D === "error") return e("La sauvegarde en ligne a échoué : nouvel essai automatique.");
    const Q = Date.now() - xt.pushedAt,
      Y = xt.saveWait,
      ye = xt.pushedAt
        ? Q < 6e4
          ? e("Sauvegardé en ligne à l'instant.")
          : e("Sauvegardé en ligne il y a {n} min.", { n: Math.floor(Q / 6e4) })
        : e("Ta partie est sauvegardée en ligne.");
    return Y
      ? `${ye} ${e("Prochaine sauvegarde possible dans {n} min.", { n: Math.max(1, Math.ceil(Y / 6e4)) })}`
      : ye;
  }
  function le() {
    const xt = a("#save-btn");
    if (!xt) return;
    const D = t.Cloud?.saveState || "off";
    ((xt.dataset.state = D),
      xt.classList.toggle("wait", D === "ok" && t.Cloud.saveWait > 0),
      (xt.title = Tt()));
  }
  async function P() {
    const xt = t.Cloud,
      D = xt?.saveState;
    if (D === "lost") return xt.reconnect();
    if ((D !== "ok" && D !== "error") || xt.saveWait > 0) return B.toast(Tt(), X);
    se.save();
    const Q = await xt.saveNow();
    (le(),
      B.toast(
        Q === "saved" || Q === "same"
          ? e("Partie sauvegardée en ligne !")
          : Q === "wait"
            ? Tt()
            : e("La sauvegarde en ligne a échoué : nouvel essai automatique."),
        X,
      ));
  }
  function u() {
    ((a("#money").textContent = f(se.S.money)),
      $(),
      Ne(),
      le(),
      Ze !== null &&
        se.S.money !== Ze &&
        a("#money").parentElement.animate(
          [
            { transform: "scale(1)" },
            { transform: `scale(${se.S.money > Ze ? 1.12 : 0.92})` },
            { transform: "scale(1)" },
          ],
          220,
        ),
      (Ze = se.S.money));
    const xt = a(".wallet-reg"),
      D = xt.parentElement,
      Q = se.S.link && se.currentRegion();
    if (((xt.hidden = !Q), D.classList.toggle("split", !!Q), Q)) {
      const Va = t.STORY,
        Ba = Va.REGIONS.find((za) => za.key === se.S.link.to);
      if (se.S.link.side === "from") {
        const za = Va.REGIONS.slice(0, Va.REGIONS.indexOf(Q) + 1),
          vn = Va.regionOf(se.S.adv?.chapter ?? 0),
          An = za.includes(vn) ? vn : Q;
        ((xt.textContent = e(An.name)),
          D.style.setProperty("--rc", An.color),
          (D.title = e(
            "Argent et sac partagés par {regions} : ils se relient à ceux de {to} quand tu bats sa Ligue",
            { regions: za.map((on) => e(on.name)).join(" · "), to: e(Ba.name) },
          )));
      } else
        ((xt.textContent = e(Q.name)),
          D.style.setProperty("--rc", Q.color),
          (D.title = e(
            "Argent et sac de {region} : ils se relient à ceux des autres régions quand tu bats la Ligue de {to}",
            { region: e(Q.name), to: e(Ba.name) },
          )));
    } else (D.style.removeProperty("--rc"), (D.title = e("Pokédollars")));
    const Y = a(".topbar .side-wallet");
    for (const [Va, Ba, za, vn, An] of [
      ["coin", !t.Screens.casino.lockWhy(), se.itemCount("coin"), "assets/ui/coin-case.png", e("Jetons")],
      ["bp", !!t.Tower?.unlocked(), se.S.tower?.bp || 0, B.itemSrc("point-card"), e("Points Combat")],
      [
        "shard",
        !t.Screens.underground.lockWhy(),
        se.itemCount("event-shard"),
        B.itemSrc("event-shard"),
        e("Éclats"),
      ],
    ]) {
      let on = Y?.querySelector(`[data-cur="${Va}"]`);
      if (
        (!on &&
          Y &&
          ((on = Y.appendChild(
            Object.assign(document.createElement("div"), {
              className: "side-money tb-cur",
              innerHTML: `<img src="${vn}" alt=""><b></b>`,
            }),
          )),
          (on.dataset.cur = Va)),
        !on)
      )
        continue;
      ((on.hidden = !Ba), (on.title = An));
      const qn = f(za);
      on.lastChild.textContent !== qn && (on.lastChild.textContent = qn);
    }
    t.TrainerCard?.refreshTrigger();
    const ye = Je === "pokedex" ? 0 : t.Screens.pokedex.newCount(),
      nt = a('#tabs [data-screen="pokedex"]');
    let Ot = nt.querySelector(".new");
    ye
      ? ((
          Ot || nt.appendChild(Object.assign(document.createElement("span"), { className: "new" }))
        ).textContent = ye)
      : Ot?.remove();
    const ee = a('#tabs [data-screen="team"]'),
      rt = Je === "team" ? 0 : t.Screens.team.newCount();
    let Qe = ee.querySelector(".new");
    rt
      ? ((
          Qe || ee.appendChild(Object.assign(document.createElement("span"), { className: "new" }))
        ).textContent = rt)
      : Qe?.remove();
    const Ft = a('#tabs [data-screen="trade"]'),
      Ye = Je === "trade" ? 0 : t.Screens.trade.npcBadge();
    let bt = Ft.querySelector(".new");
    Ye
      ? ((
          bt || Ft.appendChild(Object.assign(document.createElement("span"), { className: "new" }))
        ).textContent = Ye)
      : bt?.remove();
    const Yt = a('#tabs [data-screen="friends"]'),
      wa = t.Screens.friends.incoming();
    let pa = Yt.querySelector(".new");
    wa
      ? ((
          pa || Yt.appendChild(Object.assign(document.createElement("span"), { className: "new" }))
        ).textContent = wa)
      : pa?.remove();
    const Gt = a('#tabs [data-screen="pension"]'),
      N = se.pensionUnlocked();
    We(Gt, N ? "" : e(Ge.PENSION.UNLOCK_TEXT));
    const W = N ? t.Screens.pension.readyCount() : 0;
    let ze = Gt.querySelector(".new");
    W
      ? ((
          ze || Gt.appendChild(Object.assign(document.createElement("span"), { className: "new" }))
        ).textContent = W)
      : ze?.remove();
    const qt = a('#tabs [data-screen="raid"]');
    qt &&
      We(qt, t.Raids?.unlocked() ? "" : e("Les raids s'ouvrent après ta victoire à la Ligue de Kanto.")) &&
      re();
    const Lt = a('#tabs [data-screen="casino"]');
    Lt && We(Lt, t.Screens.casino.lockWhy()) && re();
    const zt = a('#tabs [data-screen="underground"]'),
      ca = t.Screens.underground.readyCount();
    zt && We(zt, t.Screens.underground.lockWhy()) && re();
    let Ma = zt?.querySelector(".new");
    ca
      ? zt &&
        ((
          Ma || zt.appendChild(Object.assign(document.createElement("span"), { className: "new" }))
        ).textContent = ca)
      : Ma?.remove();
    const Na = a('#tabs [data-screen="market"]');
    if ((Na && (Na.hidden = !Ge.MARKET.OPEN), Na && Ge.MARKET.OPEN)) {
      const Va = t.Screens.market.found();
      (Na.classList.toggle("mk-hidden", !Va),
        (Na.querySelector(".l").textContent = Va ? e("Marché noir") : "???"),
        We(Na, Va ? "" : e("On dit que la Team Rocket fait des affaires en coulisses…")) && re());
    }
    b("#tabs .nav-grp").forEach((Va) => {
      const Ba = Va.querySelector(".nav-grp-h"),
        za = [...Va.querySelectorAll(".nav-grp-in .new")].reduce((An, on) => An + (+on.textContent || 0), 0);
      let vn = Ba.querySelector(".new");
      za
        ? ((
            vn ||
            Ba.insertBefore(
              Object.assign(document.createElement("span"), { className: "new" }),
              Ba.querySelector(".nav-chev"),
            )
          ).textContent = za)
        : vn?.remove();
    });
  }
  const ve = "pc-nav-open",
    it = matchMedia("(max-width: 640px)");
  let De = {};
  try {
    De = JSON.parse(localStorage.getItem(ve)) || {};
  } catch {}
  function je() {
    (b("#tabs .nav-grp").forEach((xt) => {
      const D = xt.dataset.grp,
        Q = it.matches ? xt.classList.contains("sheet") : !!De[D],
        Y = !!xt.querySelector(".nav-grp-in [data-screen].active");
      (it.matches
        ? xt.classList.remove("open")
        : (xt.classList.remove("sheet"), xt.classList.toggle("open", Q)),
        xt.querySelector(".nav-grp-h").setAttribute("aria-expanded", Q),
        xt.querySelector(".nav-grp-h").classList.toggle("active", Y && (it.matches || !Q)),
        (xt.querySelector(".nav-grp-in").inert = !Q));
    }),
      re());
  }
  const pt = 0.8;
  function re() {
    const xt = document.createRange();
    b("#tabs .l").forEach((D) => {
      ((D.style.fontSize = ""), xt.selectNodeContents(D));
      const Q = xt.getBoundingClientRect().width;
      if (!D.clientWidth || Q <= D.clientWidth - 0.5) return;
      const Y = Math.max(pt, (D.clientWidth - 1) / Q);
      D.style.fontSize = `${(parseFloat(getComputedStyle(D).fontSize) * Y).toFixed(1)}px`;
    });
  }
  function We(xt, D) {
    return xt.classList.contains("locked") === !!D && (xt.dataset.why || "") === D
      ? !1
      : (xt.classList.toggle("locked", !!D),
        xt.classList.toggle("tip-host", !!D),
        xt.setAttribute("aria-disabled", !!D),
        (xt.title = ""),
        (xt.dataset.why = D),
        xt.querySelector(":scope > .info-tip-box")?.remove(),
        D &&
          xt.insertAdjacentHTML(
            "beforeend",
            `<span class="bag-tip info-tip-box" role="tooltip"><b>${H(xt.querySelector(".l").textContent)}</b><p>${H(D)}</p></span>`,
          ),
        !0);
  }
  function oe() {
    (b("#tabs .nav-grp.sheet").forEach((xt) => xt.classList.remove("sheet")), je());
  }
  function $e() {
    (u(), t.Screens[Je]?.render(), Je !== "adventure" && t.Screens.adventure.refreshTeam());
  }
  function Z(xt) {
    (Je !== xt && t.Screens[Je]?.leave?.(),
      (Je = xt),
      b("#side [data-screen]").forEach((Q) => Q.classList.toggle("active", Q.dataset.screen === xt)));
    const D = a(`#tabs .nav-grp:has([data-screen="${xt}"])`);
    if (D && !De[D.dataset.grp]) {
      De[D.dataset.grp] = !0;
      try {
        localStorage.setItem(ve, JSON.stringify(De));
      } catch {}
    }
    (b("#tabs .nav-grp.sheet").forEach((Q) => Q.classList.remove("sheet")),
      je(),
      b(".screen").forEach((Q) => Q.classList.toggle("active", Q.id === "screen-" + xt)),
      t.scrollTo({ top: 0, behavior: "instant" }),
      t.Screens[xt]?.enter?.(),
      t.Screens[xt]?.render(),
      u());
  }
  function A(xt) {
    const D = !!xt.wild,
      Q = !xt.zone && !D,
      Y = Q || D ? null : t.LegendZones.get(xt.zone),
      ye = Q || D,
      nt = D
        ? t.SCENES.css({ name: xt.where }, xt.ch)
        : Q
          ? t.SCENES.css({ ...t.Raids.sceneOf(xt.id, xt.reg), name: "Raid" })
          : t.SCENES.css({ ...Y, name: Y.near || Y.zone }),
      Ot = D
        ? [xt.where && H(e(xt.where)), e("Nv. {n}", { n: xt.level })].filter(Boolean).join(" · ")
        : Q
          ? e("Rejoint ton PC au Nv. {n}", { n: xt.level ?? Ge.RAID.CATCH_LEVEL }) +
            (xt.ms ? ` · ⏱ ${t.EventUI.clockMs(xt.ms)}` : "")
          : `${H(e(Y.zone))} · ${e("Nv. {n}", { n: xt.level ?? Y.level })}`;
    return `<div class="oc-trophy${Q || D ? "" : " legend"}"><div class="oc-tr-bg" style="background-image:${nt}"></div>
      <div class="oc-tr-txt"><span class="eb">${D ? `<i class="shiny-ico"></i>${e("Chromatique capturé")}` : Q ? `<i class="shiny-ico"></i>${e("Raid réussi")}` : e("Légendaire capturé")}</span>
        <span class="nm">${H(se.DEX[xt.id].name)}${ye ? " " + t.UI.shinyIc() : ""}</span><span class="sub">${Ot}</span></div>
      <div class="oc-tr-mon"><img src="${B.artSrc(xt.id, ye)}" alt="" style="visibility:hidden"></div></div>`;
  }
  function J(xt) {
    const D = a(".oc-tr-mon img", xt);
    if (!D) return;
    const Q = D.closest(".oc-trophy"),
      Y = Q.classList.contains("legend"),
      ye = () => {
        const nt = Y
          ? matchMedia("(max-width: 640px)").matches
            ? 1
            : 2
          : Math.max(1, Math.min(2, Math.floor((Q.clientHeight - 12) / D.naturalHeight)));
        ((D.style.width = D.naturalWidth * nt + "px"), (D.style.visibility = ""));
      };
    (D.complete && D.naturalWidth ? ye() : D.addEventListener("load", ye, { once: !0 }),
      Y &&
        B.spriteGlow(D.src).then((nt) => {
          nt && (Q.style.setProperty("--glow", nt), Q.style.setProperty("--l1", `rgb(${nt})`));
        }));
  }
  function de(xt, D) {
    const Q = Math.round(xt / 6e4),
      Y =
        Q >= 60
          ? e("{h} h {m} min", { h: Math.floor(Q / 60), m: String(Q % 60).padStart(2, "0") })
          : e("{m} min", { m: Q }),
      ye = Object.entries(D.levels)
        .map(([N, W]) => ({ m: se.getMon(N), n: W }))
        .filter((N) => N.m),
      nt = D.captures.filter((N) => N.shiny),
      Ot = D.raid?.caught ? D.raid : D.legend?.caught ? D.legend : nt.length ? { ...nt[0], wild: !0 } : null,
      ee = nt.filter((N) => N !== nt[0] || !Ot.wild),
      rt = D.captures.filter((N) => N.isNew && !N.shiny && N.id !== Ot?.id),
      Qe = D.itemList || [],
      Ft = ye.reduce((N, W) => N + W.n, 0),
      Ye = Qe.reduce((N, W) => N + W[1], 0),
      bt = (N, W) => vt(N, W, 1.25, 56),
      Yt = (N, W) => `<span class="oc-portrait oc-mon">${vt(N, W, 1, 52)}</span>`,
      wa = (N, W, ze) => `<div class="oc-sec"><h4>${N}<em>${W}</em></h4>${ze}</div>`,
      pa = `<div class="dc-head"><h2>${e("Bon retour !")}</h2><div class="dc-sum">${e("absent {dur}", { dur: Y })}<button class="dc-x" aria-label="${e("Fermer")}">✕</button></div></div>
      <div class="dc-facts oc-facts">
        <div class="dc-fact">${e("Combats gagnés")}<b>${f(D.battles)}</b></div>
        <div class="dc-fact">${e("Argent")}<b class="pd">+${f(D.money)} ₽</b></div>
        <div class="dc-fact">${e("Défaites")}<b>${f(D.defeats)}</b></div>
        ${D.chapters ? `<div class="dc-fact">${e("Chapitres terminés")}<b>${D.chapters}</b></div>` : ""}
      </div>
      ${Ot ? A(Ot) : ""}
      ${
        D.farmed && D.leader
          ? `<p class="oc-note">${B.trainerFace(D.leader.sprite, "oc-face")}
        <span>${e("<b>{name}</b> t'attendait : ton équipe s'est entraînée sur le chapitre.", { name: H(e(D.leader.name)) })}</span></p>`
          : ""
      }
      ${D.rotated && !D.farmed ? `<p class="oc-note"><span>${e("Ton équipe a enchaîné tes chapitres en boucle, sans affronter leurs champions.")}</span></p>` : ""}
      ${D.raid && !D.raid.caught ? `<div class="oc-note">${Yt(D.raid.id, !0)}<span>${e("Raid : <b>{mon}</b> tient bon, ton équipe est toujours dessus.", { mon: H(se.DEX[D.raid.id].name) })}</span></div>` : ""}
      ${D.legend && !D.legend.caught ? `<div class="oc-note">${Yt(D.legend.id, !1)}<span>${e("{place} : <b>{mon}</b> tient bon, ton équipe est toujours dessus.", { place: H(e(t.LegendZones.get(D.legend.zone).zone)), mon: H(se.DEX[D.legend.id].name) })}</span></div>` : ""}
      ${
        D.tower?.kind === "candy"
          ? `<p class="oc-note"><img class="oc-pen" src="${B.itemSrc("rare-candy")}" alt=""><span>${
              (D.tower.ended
                ? e("Fabrique de Bonbons : run terminé à l'étage <b>{n}</b>.", { n: D.tower.floor })
                : e("Fabrique de Bonbons : te voilà à l'étage <b>{f}</b> (+{n}).", {
                    f: D.tower.floor,
                    n: D.tower.floors,
                  })) +
              (Object.keys(D.tower.got || {}).length
                ? " " +
                  Object.entries(D.tower.got)
                    .map(([N, W]) => `<b>+${f(W)}</b> ${H(B.itemName(N))}`)
                    .join(" · ")
                : "")
            }</span></p>`
          : D.tower
            ? `<p class="oc-note"><span>${D.tower.ended ? (D.tower.floor > 1 ? e("Tour de Combat terminée : <b>{n}</b> étages franchis.", { n: D.tower.floor }) : e("Tour de Combat terminée : <b>{n}</b> étage franchi.", { n: D.tower.floor })) : e("Tour de Combat : te voilà à l'étage <b>{f}</b> (+{n}).", { f: D.tower.floor, n: D.tower.floors })}</span></p>`
            : ""
      }
      ${D.pension?.candies || D.pension?.eggs ? `<p class="oc-note"><img class="oc-pen" src="assets/items/mystery-egg.png" alt=""><span>${[D.pension.candies && e("Pension : <b>+{n}</b> bonbons pour tes pensionnaires et leurs familles.", { n: f(D.pension.candies) }), D.pension.eggs && (D.pension.eggs > 1 ? e("{n} œufs pondus à la Pension.", { n: D.pension.eggs }) : e("Un œuf pondu à la Pension."))].filter(Boolean).join(" ")}</span></p>` : ""}
      ${D.shinyFled ? `<p class="oc-note"><span>${D.shinyFled > 1 ? e("{n} chromatiques t'ont échappé.", { n: D.shinyFled }) : e("Un chromatique t'a échappé.")}</span></p>` : ""}
      ${D.shinyFull ? `<p class="oc-note"><span>${D.shinyFull > 1 ? e("{n} chromatiques sont passés, mais ton PC était plein.", { n: D.shinyFull }) : e("Un chromatique est passé, mais ton PC était plein.")}</span></p>` : ""}
      ${ee.length ? wa(e("Chromatiques capturés"), `<b>${ee.length}</b>`, `<div class="oc-grid">${ee.map((N) => `<div class="oc-tile shiny">${N.isNew ? '<span class="new">NEW</span>' : ""}<i class="shiny-ico"></i>${bt(N.id, !0)}<span class="lvl">${e("Nv. {n}", { n: N.level })}</span></div>`).join("")}</div>`) : ""}
      ${rt.length ? wa(e("Nouveaux au Pokédex"), `<b>${rt.length}</b>${D.captures.length > rt.length ? e(" · {n} capturés", { n: D.captures.length }) : ""}`, `<div class="oc-grid">${rt.map((N, W) => `<div class="oc-tile is-new" style="animation-delay:${W * 80}ms,${500 + W * 300}ms"><span class="new">NEW</span>${bt(N.id, N.shiny)}</div>`).join("")}</div>`) : ""}
      ${
        ye.length
          ? wa(
              e("Équipe"),
              Ft > 1 ? e("<b>+{n}</b> niveaux", { n: Ft }) : e("<b>+{n}</b> niveau", { n: Ft }),
              `<div class="oc-grid">${ye
                .map(
                  (
                    { m: N, n: W },
                    ze,
                  ) => `<div class="oc-tile" data-i="${ze}"><span class="gain">+${W}</span>${se.levelEvolution(N) ? `<span class="evo" title="${e("Évolution prête")}">▲</span>` : ""}
          ${bt(N.id, N.shiny)}<span class="lvl">${e("Nv. {n}", { n: N.level - W })}</span><span class="xpb"><i></i></span></div>`,
                )
                .join("")}</div>`,
            )
          : ""
      }
      ${Qe.length ? wa(e("Objets trouvés"), `<b>${Ye}</b>`, `<div class="oc-items">${Qe.map(([N, W]) => `<span class="oc-chip" title="${H(B.itemName(N))}"><img src="${B.itemSrc(N)}" alt=""><b>×${W}</b></span>`).join("")}</div>`) : ""}`;
    let Gt = () => {};
    ue({
      className: "dexcard-modal oc-modal",
      body: pa,
      actions: [{ label: e("Super !"), cls: "gold" }],
      onOpen: (N, W) => {
        ((a(".dc-x", N).onclick = () => {
          (Gt(), W(null));
        }),
          J(N),
          (Gt = B.playLevels(N, ye)));
      },
    }).then(() => Gt());
  }
  const _e = 8,
    Re = 3e4;
  let dt = null;
  const qe = 32,
    ce = new MessageChannel(),
    tt = [];
  ce.port1.onmessage = () => tt.shift()?.();
  const mt = () =>
    new Promise((xt) => {
      (tt.push(xt), ce.port2.postMessage(0));
    });
  let Te = 0;
  const At = () => {
      ((Te = zn.now()), dt && es(At));
    },
    yt = () =>
      new Promise((xt) => {
        (es(xt), Wa(xt, 100));
      }).then(mt);
  let he = null;
  function fe() {
    ((he = document.createElement("div")),
      (he.className = "cu-veil cu-launch"),
      document.body.appendChild(he),
      document.body.classList.add("launching"));
  }
  function Oe() {
    (he?.remove(), (he = null), document.body.classList.remove("launching"));
  }
  function Ee(xt) {
    const D = (xt && he) || document.createElement("div");
    ((D.className = xt ? "cu-veil cu-launch" : "cu-veil"),
      (D.innerHTML = `<div class="cu-pill" role="status"><span>${e("Rattrapage de ton absence…")}</span><span class="cu-bar"><i></i></span></div>`),
      D.isConnected || document.body.appendChild(D));
    const Q = D.querySelector(".cu-bar i");
    return {
      set: (Y) => {
        Q.style.width = (Y * 100).toFixed(1) + "%";
      },
      remove: () => D.remove(),
    };
  }
  (t.addEventListener(
    "keydown",
    (xt) => {
      dt && xt.stopImmediatePropagation();
    },
    !0,
  ),
    t.addEventListener(
      "visibilitychange",
      () => {
        document.hidden && dt?.finish()?.();
      },
      !0,
    ));
  function et(xt, D = 0, Q = se.S.lastTick, Y = !1) {
    if (dt) return dt.settled;
    if (t.Clock && !t.Clock.sure) return Promise.resolve();
    const ye = Math.min(se.time() - (Q || se.time()), Ge.OFFLINE_MAX_MS);
    if (ye < xt || !se.teamMons().length) return Promise.resolve();
    const nt = t.Adventure.offline(ye);
    let Ot = !1,
      ee = null,
      rt;
    const Qe = new Promise((bt) => {
        rt = bt;
      }),
      Ft = () => {
        if (Ot) return;
        Ot = !0;
        try {
          nt.run();
        } finally {
          (se.holdSave(!1), (dt = null), (!Y || nt.failed) && ee?.remove(), rt());
        }
        if (nt.failed) return;
        const bt = nt.sum,
          Yt = se.pensionTick();
        ((bt.pension = {
          candies: Yt.filter((pa) => pa.type === "candy").reduce((pa, Gt) => pa + Gt.n, 0),
          eggs: Yt.filter((pa) => pa.type === "egg").length,
        }),
          Yt.length && Je === "pension" && t.Screens.pension.tick(Yt),
          (se.S.lastTick = se.time()),
          (se.session.away = Math.round(se.session.away + ye)));
        const wa = bt.captures.some((pa) => pa.shiny || se.isLegend(pa.id));
        if (
          (se.save(bt.raid?.caught || bt.legend?.caught || bt.tower?.ended || wa ? void 0 : { idle: !0 }),
          (bt.steps > 5 && ye >= D) || bt.raid?.caught || bt.legend?.caught || bt.tower?.ended || wa)
        )
          return () => de(ye, bt);
      };
    (se.holdSave(!0), (dt = { finish: Ft, settled: Qe }));
    let Ye;
    try {
      Ye = nt.run(zn.now() + _e);
    } catch (bt) {
      throw (Ft(), bt);
    }
    return Ye
      ? (Ft()?.(), Promise.resolve())
      : ((ee = Ee(Y)),
        At(),
        (async () => {
          let bt;
          try {
            for (; !Ot && !document.hidden && !nt.run(zn.now() + _e);)
              (ee.set(nt.progress), await (zn.now() - Te > qe ? yt() : mt()));
            (ee.set(1), await mt());
          } finally {
            bt = Ft();
          }
          (bt && (await mt(), bt()), await mt());
        })());
  }
  let _ = null,
    we = null;
  t.CatchUp = {
    get busy() {
      return !!dt;
    },
    get pending() {
      return !!_ || !!dt;
    },
    get held() {
      return !!we || !!_ || !!dt;
    },
    wait: () => dt?.settled || Promise.resolve(),
    ready: () => we || _ || dt?.settled || Promise.resolve(),
  };
  function ie(xt) {
    if (typeof xt != "string" || xt.length > 200) return !1;
    let D = 729669605;
    for (const Q of xt) D = Math.imul(D ^ Q.charCodeAt(0), 1352159241) >>> 0;
    return D.toString(26) === "6lc7b5b";
  }
  let U = null;
  function Ne() {
    const xt = t.Cloud?.support,
      D = ie(xt) ? xt : null;
    let Q = a("#support-btn");
    if (((U = D), !D)) {
      Q?.remove();
      return;
    }
    Q ||
      ((Q = document.createElement("button")),
      (Q.className = "tb-don"),
      (Q.id = "support-btn"),
      (Q.title = e("Soutenir le créateur")),
      Q.setAttribute("aria-label", e("Soutenir le créateur")),
      (Q.innerHTML =
        '<svg viewBox="0 0 7 6" aria-hidden="true"><path fill="currentColor" d="M1 0h2v1h1V0h2v1h1v2H6v1H5v1H4v1H3V5H2V4H1V3H0V1h1z"/><path fill="#fff" fill-opacity=".55" d="M1 1h1v1H1z"/></svg><span class="l"></span>'),
      (Q.querySelector(".l").textContent = e("Soutenir")),
      Q.addEventListener("click", R),
      a("#tb-online")?.after(Q));
  }
  const T = [
    [1, 34],
    [4, 38],
    [7, 34],
    [25, 62],
    [133, 48],
    [39, 26],
    [52, 44],
    [54, 24],
    [35, 30],
    [58, 66],
    [77, 80],
    [79, 14],
    [143, 16],
    [19, 56],
    [104, 32],
    [113, 28],
    [132, 20],
  ];
  function L(xt, { shiny: D = !1, lanes: Q = null, min: Y = 2, max: ye = 4, gap: nt = [1400, 2600] } = {}) {
    if (document.body.classList.contains("calm") || matchMedia("(prefers-reduced-motion: reduce)").matches)
      return () => {};
    const Ot = Y,
      ee = ye,
      rt = 1200,
      Qe = () => [...xt.querySelectorAll(".sup-walker")],
      Ft = (wa = 0) => {
        if (Qe().length >= ee) return;
        const pa = new Set(Qe().map((xn) => xn.mon)),
          Gt = T.filter((xn) => !pa.has(xn[0])),
          [N, W] = Gt[Math.floor(Math.random() * Gt.length)],
          ze = W * (0.85 + Math.random() * 0.3),
          qt = Q
            ? Q()
            : [
                { feet: 30, z: 1 },
                { feet: 12, z: 2 },
              ],
          Lt = qt.map((xn, fn) => Qe().filter((Yn) => Yn.lane === fn).length),
          zt = Lt[0] === Lt[1] ? Math.floor(Math.random() * 2) : Lt.indexOf(Math.min(...Lt)),
          ca = qt[zt],
          Ma = t.SPRITE_BOUNDS?.[`assets/pokemon/${N}.png`] || [17, 10, 51, 50],
          Na = Ma[0] + Ma[2],
          Va = Ma[3] * 2,
          Ba = Ma[2] - Ma[0],
          za = document.createElement("div");
        ((za.className = "sup-walker"),
          (za.lane = zt),
          (za.mon = N),
          (za.style.cssText = `--fx:${Na}px;--fy:${Va}px;--hop:${Math.max(0.18, Math.min(0.6, 15 / ze)).toFixed(2)}s;bottom:${ca.feet - (112 - Va)}px;z-index:${ca.z}`),
          (za.innerHTML = `<i class="shadow"></i><div class="body"><img src="assets/pokemon/${D ? "shiny/" : ""}${N}.png" alt=""></div>`),
          xt.appendChild(za));
        const vn = -Ba,
          An = xt.clientWidth + Ba,
          on = ((An - vn) / ze) * 1e3,
          qn = za.animate([{ transform: `translateX(${vn}px)` }, { transform: `translateX(${An}px)` }], {
            duration: on,
            easing: "linear",
          });
        ((qn.currentTime = wa * on),
          (za.exitAt = zn.now() + on * (1 - wa)),
          (qn.onfinish = () => za.remove()));
      };
    for (let wa = 0; wa < Ot; wa++) Ft((wa + 0.3 + Math.random() * 0.4) / Ot);
    let Ye = 0;
    const bt = () => {
      (Ft(), (Ye = Wa(bt, nt[0] + Math.random() * nt[1])));
    };
    Ye = Wa(bt, 1500 + Math.random() * 2e3);
    const Yt = Ss(() => {
      const wa = zn.now();
      Qe().filter((pa) => pa.exitAt - wa > rt).length < Ot && Ft();
    }, 250);
    return () => {
      (clearTimeout(Ye), clearInterval(Yt));
    };
  }
  function R() {
    const xt = document.querySelector(".side-disc"),
      D = (ye, nt) => `<span class="op-ic ${ye}">${nt}</span>`,
      Q = (ye, nt) => `<span class="t"><b>${ye}</b><small>${nt}</small></span>`;
    let Y = () => {};
    t.UI.modal({
      className: "dexcard-modal sup-modal",
      body: `<div class="dc-head"><h2>${e("Soutenir le créateur")}</h2><div class="dc-sum"><button class="dc-x" aria-label="${e("Fermer")}">✕</button></div></div>
      <div class="sup-banner"></div>
      <div class="sup-rows">
        <div class="op-card sup-don"><div class="op-row op-static">${D("sup-ic-don", '<img src="assets/items/love-sweet.png" alt="">')}${Q(e("Me soutenir personnellement"), e("Projet de fan gratuit : un don ne donne rien en jeu"))}${U ? `<button class="btn gold small sup-go">${e("Me soutenir")}</button>` : ""}</div></div>
        <div class="op-card"><a class="op-row" href="${t.UI.esc(xt?.href || "")}" target="_blank" rel="noopener">${D("", xt?.querySelector("svg")?.outerHTML || "")}${Q(e("Rejoins le Discord"), e("Les nouveautés en avant-première"))}<span class="chev">›</span></a></div>
        <div class="op-card"><div class="op-row sup-share" role="button" tabindex="0">${D("sup-ic-share", '<img src="assets/items/friend-ball.png" alt="">')}${Q(e("Fais découvrir le jeu"), e("Rien d'obligatoire : partager le jeu aide déjà énormément"))}<span class="chev">›</span></div></div>
      </div>`,
      onOpen: (ye, nt) => {
        ye.querySelector(".dc-x").onclick = () => nt(null);
        const Ot = ye.querySelector(".sup-go");
        Ot && (Ot.onclick = () => t.open(U, "_blank", "noopener"));
        const ee = ye.querySelector(".sup-share");
        ((ee.onkeydown = (rt) => {
          (rt.key === "Enter" || rt.key === " ") && (rt.preventDefault(), ee.click());
        }),
          (ee.onclick = async () => {
            const rt = location.origin + "/";
            if (navigator.share) {
              try {
                await navigator.share({ title: "Poke'Catch", url: rt });
              } catch {}
              return;
            }
            try {
              (await navigator.clipboard.writeText(rt), t.UI.toast(e("Lien copié !")));
            } catch {
              t.UI.toast(rt);
            }
          }),
          (Y = L(ye.querySelector(".sup-banner"))));
      },
    }).then(() => Y());
  }
  function te() {
    t.UI.modal({
      className: "dexcard-modal tab-modal",
      dismissable: !1,
      body: `<div class="dc-head"><h2>${e("Ouvert dans un autre onglet")}</h2></div><p class="cl-note">${e("Poke'Catch est ouvert dans un autre onglet : ta partie continue là-bas.")}</p>`,
      actions: [{ label: e("Jouer ici"), cls: "primary", value: !0 }],
    }).then(() => {
      ((t.onbeforeunload = null), location.reload());
    });
  }
  const K = /^[\w-]+\.pokecatch-online\.pages\.dev$/.test(location.hostname),
    He = new URLSearchParams(location.search);
  function m() {
    if (!He.has("pc") || !K) return;
    const xt = (Q, Y) => {
        const ye = se.makeMon(Q, 5 + Math.floor(Math.random() * 56), { shiny: Y });
        ((ye.hp = se.maxHp(ye)), se.receive(ye));
      },
      D = t.POKEDEX.map((Q) => Q.id);
    D.forEach((Q) => xt(Q, !1));
    for (let Q = 0; Q < 200; Q++) xt(se.pick(D), !0);
    se.save();
  }
  function z() {
    if (!K) return;
    if (He.has("legends")) {
      const D = t.STORY,
        Q = t.Adventure.state,
        Y = D.CHAPTERS.length - 1;
      Q.unlocked = Math.max(Q.unlocked, Y);
      const ye = D.REGIONS.filter((ee) => D.firstChapterOf(ee.key) >= 0);
      for (const ee of ye) ee.open = !0;
      ((se.S.travel = { to: ye.map((ee) => ee.key), at: se.S.travel?.at || Date.now() }),
        (se.S.link = null),
        (Q.badges = [
          ...new Set([
            ...(Q.badges || []),
            ...D.CHAPTERS.flatMap((ee) => ee.steps)
              .filter((ee) => ee.kind === "gym" && ee.badge)
              .map((ee) => ee.badge),
          ]),
        ]),
        (se.S.zoneDoors = { regirock: 1, registeel: 1, regice: 1 }),
        se.itemCount("auroraticket") || se.addItem("auroraticket", 1));
      for (const ee of [...se.S.mons])
        (se.DEX[ee.id]?.legendary || se.DEX[ee.id]?.mythical) &&
          ![243, 244, 245].includes(ee.id) &&
          (se.takeOutMon(ee.uid), se.S.road && (se.S.road = se.S.road.filter((rt) => rt !== ee.uid)));
      for (const ee of Object.keys(se.S.dex))
        (Math.floor(ee / 100) === 386 || +ee == 386) && delete se.S.dex[ee];
      se.S.aurora = null;
      for (const ee of t.POKEDEX) {
        if (ee.mythical || ee.id > 1e4) continue;
        if (ee.legendary) {
          se.S.dex[ee.id] || se.registerDex(ee.id);
          continue;
        }
        if (se.owns(ee.id)) continue;
        const rt = se.makeMon(ee.id, 100);
        ((rt.hp = se.maxHp(rt)), se.receive(rt));
      }
      for (const ee of se.S.mons)
        ee.level < 100 && (Object.assign(ee, { level: 100, xp: 0 }), (ee.hp = se.maxHp(ee)));
      const nt = (ee) => Object.values(se.statsOf(ee)).reduce((rt, Qe) => rt + Qe, 0),
        Ot = se.S.mons
          .filter((ee) => !se.DEX[ee.id].legendary && !se.DEX[ee.id].mythical)
          .sort((ee, rt) => nt(rt) - nt(ee));
      for (const ee of Object.keys(se.S.eventTeams || {}))
        if (ee.startsWith("zone:")) {
          const rt = se.eventTeam(ee);
          for (const Qe of Ot) {
            if (rt.length >= Ge.TEAM_SIZE) break;
            rt.includes(Qe.uid) || rt.push(Qe.uid);
          }
        }
      (se.healTeam(), se.save());
    }
    const xt = He.get("intro");
    xt && Wa(() => t.Screens.adventure.demoIntro("legend", xt), 1500);
  }
  function pe() {
    if (
      !new URLSearchParams(location.search).has("debug") ||
      !/^[\w-]+\.pokecatch-online\.pages\.dev$/.test(location.hostname)
    )
      return;
    const xt = Object.assign(document.createElement("pre"), { id: "dbg" });
    ((xt.style.cssText =
      "position:fixed;left:4px;top:60px;z-index:99999;margin:0;padding:6px 8px;font:11px/1.35 monospace;color:#7f7;background:rgba(0,0,0,.85);pointer-events:none;white-space:pre"),
      document.body.appendChild(xt));
    const D = t.VGrid.stats;
    let Q = null,
      Y = 0,
      ye = 0;
    addEventListener(
      "scroll",
      () => {
        const Yt = zn.now();
        (Q || (Q = { frames: 0, blank: 0, scrolls: 0, gap: 0, y0: scrollY, t0: Yt, r0: { ...D } }),
          Q.scrolls++,
          (Y = Yt));
      },
      { passive: !0 },
    );
    const nt = () =>
      [...document.querySelectorAll(".screen.active .vg-pad")].some((Yt) => {
        const wa = Yt.getBoundingClientRect();
        return wa.height > 0 && wa.bottom > 0 && wa.top < innerHeight;
      });
    let Ot = "défile dans le PC",
      ee = "",
      rt = null;
    const Qe = new URLSearchParams(location.search),
      Ft = [];
    (Qe.has("nopx") && (document.documentElement.classList.remove("px"), Ft.push("sans boutons pixel")),
      Qe.has("blur") && (document.documentElement.classList.add("dbg-blur"), Ft.push("avec le flou")),
      Qe.has("nostar") &&
        (document.head.appendChild(
          Object.assign(document.createElement("style"), {
            textContent: ".shiny-mk{display:none!important}",
          }),
        ),
        Ft.push("sans étoile shiny")));
    const Ye = Ft.length
      ? `
test : ${Ft.join(", ")}`
      : "";
    addEventListener(
      "pointerup",
      () => {
        const Yt = zn.now();
        ((rt = { t0: Yt, js: 0, first: 0, gap: 0, prev: 0 }),
          Wa(() => {
            rt?.t0 === Yt && (rt.js = zn.now() - Yt);
          }, 0));
      },
      !0,
    );
    const bt = (Yt) => {
      (rt &&
        (!rt.first && rt.js && (rt.first = Yt - rt.t0),
        rt.prev && (rt.gap = Math.max(rt.gap, Yt - rt.prev)),
        (rt.prev = Yt),
        Yt - rt.t0 > 800 &&
          ((ee = `
tap : JS ${Math.round(rt.js)} ms · 1re image ${Math.round(rt.first)} ms · trou max ${Math.round(rt.gap)} ms`),
          (rt = null))),
        Q &&
          (Q.frames++,
          nt() && Q.blank++,
          ye && (Q.gap = Math.max(Q.gap, Yt - ye)),
          Yt - Y > 700 &&
            ((Ot = `dernier geste : ${Math.round(Math.abs(scrollY - Q.y0))} px en ${Math.round(Y - Q.t0)} ms
images ${Q.frames} · vides (DOM) ${Q.blank}
scroll ${Q.scrolls} évts · image max ${Math.round(Q.gap)} ms
rendus ${D.renders - Q.r0.renders} · cases +${D.added - Q.r0.added} · max ${Math.round(D.max)} ms
cases en page ${D.live}`),
            (Q = null),
            (D.max = 0))),
        (ye = Yt),
        (xt.textContent =
          Ot +
          (Q
            ? `
… en cours : vides ${Q.blank}/${Q.frames}`
            : "") +
          ee +
          Ye +
          (Vt
            ? `
barre recalée : ${ra} px (${Vt}×)`
            : "")),
        es(bt));
    };
    es(bt);
  }
  function V() {
    const xt = se.takeLoadMerges();
    if (!xt.length) return;
    const D = (Q) => {
      const Y = H(se.DEX[Q.id].name),
        ye = H(se.DEX[se.famHead(Q.id)].name);
      return `<li>${t.UI.xpIcon()}${e("{mon} en trop : changé en XP pour la famille {fam}", { mon: Y, fam: ye })}</li>`;
    };
    t.UI.modal({
      className: "dexcard-modal tab-modal merge-dlg",
      body: `<div class="dc-head"><h2>${e("Doublons en trop")}</h2></div><p class="cl-note">${e("Ces familles dépassaient leurs places : le plus fort de chaque espèce reste, les autres se changent en XP pour leur famille.")}</p><ul class="merge-list">${xt.map(D).join("")}</ul>`,
      actions: [{ label: e("Compris !"), cls: "gold" }],
    });
  }
  function lt() {
    const xt = se.takeLoadCapsules();
    if (!xt) return;
    const D = t.UI.fmt(xt.bp);
    t.UI.modal({
      className: "dexcard-modal tab-modal merge-dlg",
      body: `<div class="dc-head"><h2>${e("Capsules Nature")}</h2></div><p class="cl-note">${xt.n > 1 ? e("Les natures ont quitté le jeu : tes {n} Capsules Nature te sont rendues en {bp} Points Combat.", { n: xt.n, bp: D }) : e("Les natures ont quitté le jeu : ta Capsule Nature t'est rendue en {bp} Points Combat.", { bp: D })}</p>`,
      actions: [{ label: e("Compris !"), cls: "gold" }],
    });
  }
  function kt() {
    const xt = se.takeLoadAurora();
    if (!xt) return;
    const D = H(t.UI.itemName("auroraticket"));
    t.UI.modal({
      className: "dexcard-modal tab-modal merge-dlg",
      body: `<div class="dc-head"><h2>${D}</h2></div><p class="cl-note">${e("La Tour de Combat t'avait vendu un {item} de trop : il est repris et tes {n} Points Combat te sont rendus.", { item: D, n: t.UI.fmt(xt) })}</p>`,
      actions: [{ label: e("Compris !"), cls: "gold" }],
    });
  }
  let ra = 0,
    Vt = 0;
  function Xt() {
    const xt = a("#tabs"),
      D = t.visualViewport;
    let Q = 0;
    if (it.matches && D && Math.abs(D.scale - 1) < 0.01) {
      const Y = Math.round(
        D.offsetTop +
          D.height -
          parseFloat(getComputedStyle(xt).bottom) -
          (xt.getBoundingClientRect().bottom - ra),
      );
      Y > 2 && Y <= 100 && (Q = Y);
    }
    Q !== ra && ((ra = Q), Q && Vt++, (xt.style.translate = Q ? `0 ${Q}px` : ""));
  }
  const Ht = [
    "CONFIG",
    "TYPES",
    "TYPE_CHART",
    "POKEDEX",
    "EVOLUTIONS",
    "MOVES",
    "ENCOUNTERS",
    "HABITATS",
    "BASE_EXP",
    "LEAGUE_TEAMS",
    "SPECIALS",
    "UNOWN",
    "RAID_SWAPS",
    "ITEM_NAMES",
  ];
  function ct() {
    if (/^(localhost|127\.0\.0\.1)$/.test(location.hostname)) return;
    const xt = (D) => {
      if (D && typeof D == "object" && !Object.isFrozen(D)) {
        Object.freeze(D);
        for (const Q of Object.values(D)) xt(Q);
      }
    };
    for (const D of Ht) xt(t[D]);
    (xt(se.DEX),
      Object.freeze(Math),
      Object.defineProperty(globalThis, "Math", { value: Math, writable: !1, configurable: !1 }),
      t.__seal?.());
  }
  const wt = (xt) => {
    let D = 4138079997;
    for (let Q = 0; Q < xt.length; Q++) D = (Math.imul(D, 782768479) ^ xt.charCodeAt(Q)) >>> 0;
    return D;
  };
  function ge() {
    const xt = location.hostname;
    return /^(localhost|127\.0\.0\.1|\[::1\])$|\.localhost$/.test(xt)
      ? !0
      : wt(xt) === 3859300667 || wt(xt.split(".").slice(-3).join(".")) === 3042341948;
  }
  const Fe = () => ["assets/pokemon/", [8, 8].join(""), ".png"].join(""),
    gt = () => "⚠ 0x58",
    Dt = () => {
      for (const xt of document.querySelectorAll('a[href*="discord"]')) xt.remove();
    };
  function ha(xt, D) {
    const Q = document.createElement("div");
    Q.style.cssText = `position:fixed;inset:0;z-index:${xt ? 2147483647 : 2147483646};display:flex;align-items:center;justify-content:center;padding:24px;background:${xt ? "var(--bg)" : "rgba(0,0,0,.55)"}`;
    const Y = document.createElement("div");
    Y.style.cssText = `display:flex;flex-direction:column;align-items:center;gap:12px;padding:20px 28px;border-radius:14px;color:var(--text);font-weight:700;letter-spacing:.05em;background:${xt ? "transparent" : "var(--panel)"}`;
    const ye = new Image();
    ((ye.alt = ""),
      (ye.src = Fe()),
      (ye.style.cssText = `width:${xt ? 160 : 104}px;image-rendering:pixelated`));
    const nt = document.createElement("span");
    if (((nt.textContent = gt()), Y.append(ye, nt), D)) {
      const Ot = document.createElement("button");
      ((Ot.type = "button"),
        (Ot.textContent = "OK"),
        (Ot.style.cssText =
          "font:inherit;padding:8px 22px;border:0;border-radius:10px;background:var(--yellow);color:var(--ink);cursor:pointer"),
        (Ot.onclick = () => D(Q)),
        Y.append(Ot));
    }
    return (Q.append(Y), Q);
  }
  function _t() {
    const xt = ha(!0),
      D = () => {
        for (const Q of document.body.children) Q !== xt && (Q.inert = !0);
        (xt.isConnected || document.body.appendChild(xt), Dt());
      };
    (D(), new MutationObserver(D).observe(document.body, { childList: !0 }));
    try {
      se.stopSaving?.();
    } catch {}
    return xt;
  }
  let Ea = null;
  function ut() {
    const xt = /^(localhost|127\.0\.0\.1)$/.test(location.hostname) && He.has("away");
    if (ge() && !xt) return;
    const D = t.setTimeout.bind(t),
      Q = t.setInterval.bind(t),
      Y = Math.random,
      ye = xt ? 1e4 : 6e4,
      nt = 864e5;
    (Dt(), new MutationObserver(Dt).observe(document.body, { childList: !0, subtree: !0 }));
    const Ot = [983, 982, 978, 972, 970, 968, 987, 970, 975, 916, 983, 972, 985, 973, 916, 980]
      .map((qn) => String.fromCharCode(qn - 871))
      .join("");
    let ee = null;
    try {
      ee = JSON.parse(localStorage.getItem(Ot));
    } catch {}
    (!ee || typeof ee != "object") && (ee = {});
    const rt = Date.now(),
      Qe = String(t.BUILD || "");
    (ee.f || (ee.f = rt), ee.b !== Qe && ((ee.b = Qe), (ee.s = rt)));
    const Ft = () => {
      try {
        localStorage.setItem(Ot, JSON.stringify(ee));
      } catch {}
    };
    Ft();
    const Ye = (ee.f % 997) / 997,
      bt = (Math.floor(ee.f / 1024) % 991) / 991,
      Yt = nt / 24,
      wa = xt ? rt : Math.max(ee.f + (6 + 6 * Ye) * Yt, ee.s + (1 + bt) * Yt);
    let pa = 0;
    const Gt = () => (pa ? (Date.now() - pa) / ye : 0),
      N = () => 1 + Math.min(Gt(), 10) * 0.5;
    ((t.setTimeout = (qn, xn, ...fn) => D(qn, (+xn || 0) * N(), ...fn)),
      (t.setInterval = (qn, xn, ...fn) => Q(qn, (+xn || 0) * N(), ...fn)),
      (Math.random = () => {
        const qn = Y();
        return pa ? 1 - Math.pow(1 - qn, 1 + Math.min(Gt(), 4)) : qn;
      }));
    const W = /assets\/pokemon\/(art\/)?(shiny\/)?(still\/)?(anim\/)?\d+[\w-]*\.(png|gif)/,
      ze = [8, 8].join(""),
      qt = (qn) =>
        typeof qn == "string" && pa && Gt() >= 1
          ? qn.replace(W, (xn, fn, Yn, Zn, is, ts) =>
              is
                ? `assets/pokemon/art/${ze}.gif`
                : `assets/pokemon/${fn || ""}${Yn || ""}${Zn || ""}${ze}.${ts}`,
            )
          : qn,
      Lt = HTMLImageElement.prototype,
      zt = Object.getOwnPropertyDescriptor(Lt, "src");
    zt?.configurable &&
      Object.defineProperty(Lt, "src", {
        configurable: !0,
        enumerable: zt.enumerable,
        get: zt.get,
        set(qn) {
          zt.set.call(this, qt(qn));
        },
      });
    const ca = new WeakSet(),
      Ma = (qn) => (/\s/.test(qn) ? qn : String.fromCharCode(10241 + (qn.charCodeAt(0) % 254))),
      Na = /^(SCRIPT|STYLE|TEXTAREA|INPUT)$/,
      Va = (qn) => {
        if (!pa || !qn) return;
        const xn = Math.min(1, Gt() / 4),
          fn = document.createTreeWalker(qn, NodeFilter.SHOW_TEXT);
        for (let Yn = fn.nextNode(); Yn; Yn = fn.nextNode())
          ca.has(Yn) ||
            !Yn.data.trim() ||
            Na.test(Yn.parentNode?.nodeName) ||
            Ea?.contains(Yn) ||
            (Y() < xn && (ca.add(Yn), (Yn.data = [...Yn.data].map(Ma).join(""))));
        for (const Yn of qn.querySelectorAll?.('img[src*="assets/pokemon/"]') || []) {
          const Zn = qt(Yn.getAttribute("src"));
          Zn !== Yn.getAttribute("src") && Yn.setAttribute("src", Zn);
        }
      };
    new MutationObserver((qn) => {
      if (pa) for (const xn of qn) for (const fn of xn.addedNodes) Va(fn.nodeType === 1 ? fn : fn.parentNode);
    }).observe(document.body, { childList: !0, subtree: !0 });
    let Ba = null;
    const za = () => {
        Ea ||
          (Ba?.isConnected || ((Ba = ha(!1, (qn) => qn.remove())), document.body.appendChild(Ba)),
          D(za, 1e4));
      },
      vn = () => {
        pa = Date.now();
        const qn = ee.p;
        ((ee.p = 1), Ft());
        const xn = document.createElement("style");
        ((xn.textContent = `${[".op", "langrow"].join("-")}{display:none!important}`),
          document.head.appendChild(xn),
          za(),
          Q(() => Va(document.body), 2e3),
          D(
            () => {
              Ea = _t();
            },
            (qn ? 4 : 10) * ye,
          ));
      },
      An = () => D(vn, xt ? 5e3 : ee.p ? 2e4 + Y() * 4e4 : 6e4 + Y() * 12e4),
      on = wa - rt;
    on <= 0 ? An() : on < nt && D(An, on);
  }
  async function jt() {
    (ut(),
      ct(),
      t.TabLock.onLost(te),
      se.load(),
      t.UI.syncCalm(),
      t.Cloud.init(),
      se.teamMons().length && fe(),
      (t.Update.reloaded() && se.teamMons().length) || (await t.Title.show()),
      await t.Cloud.ready(),
      await t.Clock.ready(),
      t.Adventure.ensure(),
      await et(15e3, 0, se.S.lastTick, !0),
      pe(),
      m(),
      z(),
      K && He.has("wb") && t.WorldBoss.demo(He.get("wb") || "shield"),
      V(),
      lt(),
      kt(),
      K &&
        ["pc", "legends", "intro", "wb"].some((rt) => He.has(rt)) &&
        history.replaceState(null, "", location.origin + location.pathname),
      t.UI.measureSprites(() => {
        (t.Screens.pokedex.rebuild?.(), $e());
      }),
      t.News.init(),
      t.Events.init());
    for (const rt of Object.values(t.Screens)) rt.init?.();
    if (
      (b("#side [data-screen]").forEach(
        (rt) =>
          (rt.onclick = () => {
            (t.Sfx.unlock(), rt.classList.contains("locked") || Z(rt.dataset.screen));
          }),
      ),
      b("#tabs .nav-grp-h").forEach(
        (rt) =>
          (rt.onclick = () => {
            const Qe = rt.parentElement,
              Ft = Qe.dataset.grp;
            if ((t.Sfx.unlock(), it.matches)) {
              const Ye = Qe.classList.contains("sheet");
              (b("#tabs .nav-grp.sheet").forEach((bt) => bt.classList.remove("sheet")),
                Qe.classList.toggle("sheet", !Ye));
            } else {
              De[Ft] = !De[Ft];
              try {
                localStorage.setItem(ve, JSON.stringify(De));
              } catch {}
            }
            je();
          }),
      ),
      document.addEventListener("pointerdown", (rt) => {
        if (
          !a("#tabs .nav-grp.sheet") ||
          rt.target.closest("#tabs .nav-grp.sheet") ||
          (oe(), rt.target.closest("#tabs"))
        )
          return;
        const Qe = (Ft) => {
          (Ft.preventDefault(), Ft.stopPropagation());
        };
        (document.addEventListener("click", Qe, { capture: !0, once: !0 }),
          Wa(() => document.removeEventListener("click", Qe, { capture: !0 }), 600));
      }),
      document.addEventListener("keydown", (rt) => {
        rt.key === "Escape" && a("#tabs .nav-grp.sheet") && oe();
      }),
      it.addEventListener("change", oe),
      new ResizeObserver(re).observe(a("#tabs")),
      /Android/i.test(navigator.userAgent))
    ) {
      let rt = 0;
      const Qe = () => {
        rt ||
          (rt = es(() => {
            ((rt = 0), Xt());
          }));
      };
      (t.visualViewport?.addEventListener("resize", Qe),
        addEventListener("resize", Qe),
        addEventListener("scrollend", Qe),
        it.addEventListener("change", Qe),
        Qe());
    }
    ((a("#options-btn").onclick = () => t.Options.open()),
      t.Changelog.badge(),
      document.addEventListener("pointerdown", () => t.Sfx.unlock(), { once: !0 }),
      Z("adventure"),
      u(),
      Oe(),
      t.Cloud.on?.(u),
      t.Gifts.start());
    const xt = () => {
      if (t.Cloud.checking || dt || t.TabLock?.lost) return;
      const rt = se.pensionTick();
      rt.length && (se.save({ idle: !0 }), u(), Je === "pension" && t.Screens.pension.tick(rt));
    };
    (xt(),
      Ss(xt, 5e3),
      t.TrainerCard.init(),
      (a("#save-btn").onclick = P),
      t.Cloud?.on(le),
      Ss(() => {
        document.hidden || le();
      }, 3e4));
    let D = !1,
      Q = !1;
    const Y = () => {
      (!Q && !t.Update?.keepTick && !D && (se.S.lastTick = se.time()), se.save({ idle: !0 }));
    };
    t.addEventListener("beforeunload", Y);
    let ye = !1;
    async function nt(rt) {
      if (ye || t.TabLock?.lost) return;
      ((ye = !0), (Q = !0));
      let Qe,
        Ft = !1;
      const Ye = (we = new Promise((bt) => {
        Qe = bt;
      }));
      try {
        if (await t.Update?.shown(rt)) {
          Ft = !0;
          return;
        }
        if (document.hidden) return;
        let bt;
        const Yt = (_ = new Promise((wa) => {
          bt = wa;
        }));
        try {
          if ((await t.Cloud.ready(), await t.Clock.ready(), document.hidden)) return;
          ((Q = !1), await et(Ge.OFFLINE_STEP_MS, 2e4, rt), $e());
        } finally {
          (_ === Yt && (_ = null), bt());
        }
      } finally {
        ((ye = !1), Ft || (we === Ye && (we = null), Qe()));
      }
    }
    let Ot = Date.now(),
      ee = !0;
    (Ss(() => {
      const rt = Date.now() - Ot > Re;
      if (((Ot = Date.now()), document.hidden)) return;
      const Qe = ee;
      if (
        ((ee = !1),
        es(() => {
          ee = !0;
        }),
        !Qe)
      ) {
        D = !0;
        return;
      }
      if (rt || D) {
        ((D = !1), nt(se.S.lastTick));
        return;
      }
      Q || ((se.S.lastTick = se.time()), (se.S.stats.playMs += 5e3), (se.session.play += 5e3));
    }, 5e3),
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
          Y();
          return;
        }
        ((ee = !0), (D = !1), nt(se.S.lastTick));
      }),
      t.Clock.onForward(async () => {
        if (document.hidden || _ || we || t.TabLock?.lost) return;
        const rt = se.S.lastTick;
        let Qe;
        const Ft = (_ = new Promise((Ye) => {
          Qe = Ye;
        }));
        Q = !0;
        try {
          (await t.Cloud.ready(), document.hidden || ((Q = !1), await et(Ge.OFFLINE_STEP_MS, 2e4, rt), $e()));
        } finally {
          (_ === Ft && (_ = null), Qe());
        }
      }));
  }
  (t.addEventListener("daytime", $e),
    t.addEventListener("weather", $e),
    (t.App = {
      refresh: $e,
      refreshHeader: u,
      show: Z,
      communityLine: x,
      parade: L,
      get current() {
        return Je;
      },
    }),
    jt());
})();
