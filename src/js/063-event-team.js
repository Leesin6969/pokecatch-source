/**
 * event team
 *
 * Public API on the game namespace `t`: t.EventTeam
 *
 * Recovered from the shipped bundle — original chunk #62 at byte 1526273 (16329 bytes, sha256:96ccf8372247cee3).
 * This file is one original source file; the build concatenates them in filename order.
 */
t.EventTeam = (function () {
  const { $: a, $$: b, h: f, esc: ue, sprBox: H, typeBadge: vt, toast: B } = t.UI,
    se = t.Game,
    Ge = t.CONFIG,
    Je = () => t.Events,
    Ze = matchMedia("(max-width: 640px)"),
    x = () => $?.cap ?? Ge.EVENT.LEVEL;
  let $ = null;
  const X = (ge) => ($?.edge && Math.min(ge.level, x()) >= x() - Ge.COUNTER_READY ? $.edge(ge) : 0),
    Tt = () => ($ ? $.size : Ge.TEAM_SIZE),
    le = (ge) => ($?.elite || $?.species ? se.speciesOf(ge) : se.beingOf(ge)),
    P = () => ($ ? $.key : Te),
    u = (ge) =>
      (!$?.max || ge.id <= $.max) && !($?.zone && se.can(ge, "zone", $.zone)) && (!$?.allow || $.allow(ge)),
    ve = (ge) => (ge > 0 ? "eff-up" : ""),
    it = (ge) => (typeof $.lockToast == "function" ? $.lockToast(ge) : $.lockToast),
    De = (ge) => (ge > 0 ? `<span class="tag-ef up"${$?.tip ? ` title="${ue($.tip)}"` : ""}>▲</span>` : ""),
    je = (ge) => (ge.level > x() ? `<s>${ge.level}</s>${x()}` : e("Nv. {n}", { n: ge.level })),
    pt = (ge) => se.teamMons(se.eventTeam(ge));
  let re = new Map(),
    We = new Map();
  const oe = (ge) =>
    `${ge.id}|${Math.min(ge.level, x())}|${ge.shiny ? 1 : 0}|${ge.rank ?? 0}|${ge.statMult ?? 1}|${ge.hpMult ?? 1}`;
  let $e = null;
  const Z = new Map(),
    A = (ge) =>
      $e
        ? {
            value:
              $e.reduce(
                (Fe, gt) => Fe + t.Adventure.counterParts(ge, { id: gt, level: x(), boss: !1 }).value,
                0,
              ) / $e.length,
            dot: 0,
            para: 0,
          }
        : t.Adventure.counterParts(ge, {
            id: Te,
            level: x(),
            boss: !!$,
            ...($?.elite ? { rank: $.elite, elite: $.elite } : {}),
          }),
    J = (ge, Fe = oe(ge)) => We.get(Fe) ?? We.set(Fe, A(ge)).get(Fe),
    de = (ge) => re.get(ge.uid) ?? re.set(ge.uid, J(ge)).get(ge.uid),
    _e = (ge) => ($?.noBoss ? 0 : de(ge).value);
  let Re = new Map(),
    dt = new Map();
  const qe = () => {
      ((Re = new Map($?.edge ? se.allMons().map((ge) => [ge.uid, X(ge)]) : [])),
        (dt = $ && !$.noBoss && !$.foes ? new Map(m(K).map((ge, Fe) => [ge, Fe])) : new Map()));
    },
    ce = (ge) => (Re.has(ge.uid) ? Re.get(ge.uid) : X(ge));
  function tt(ge) {
    const Fe = pt(ge),
      gt = Array.from({ length: Ge.TEAM_SIZE }, (Dt, ha) => {
        const _t = Fe[ha];
        return _t
          ? `<button class="evt-slot" data-evt-edit title="${ue(se.DEX[_t.id].name)}">${t.UI.rankTag(_t)}${H(_t.id, _t.shiny, 2, 92)}<span class="evt-lv">${je(_t)}</span></button>`
          : `<button class="evt-slot free" data-evt-edit>${e("＋ Ajouter")}</button>`;
      }).join("");
    return `<div class="evt">
      <div class="evt-h"><b>${e("Équipe d'event")}</b><small>${e("{n}/{max} · séparée de ton équipe d'aventure", { n: Fe.length, max: Ge.TEAM_SIZE })}</small>
        <button class="btn outline small" data-evt-edit>${e("✎ Modifier")}</button></div>
      <div class="evt-slots">${gt}</div></div>`;
  }
  const mt = (ge) =>
    `<span class="evt-mini">${Array.from({ length: Ge.TEAM_SIZE }, (Fe, gt) => {
      const Dt = pt(ge)[gt];
      return `<i>${Dt ? H(Dt.id, Dt.shiny, 1, 36) : ""}</i>`;
    }).join("")}</span>`;
  let Te = null,
    At = !1,
    yt = "",
    he = "best",
    fe = !1,
    Oe = null;
  function Ee(ge, Fe = null) {
    if (
      ((Te = ge), ($ = Fe), (At = !1), (re = new Map()), (We = new Map()), (fe = !1), $?.elite || $?.species)
    ) {
      const ha = se.eventTeam(P()),
        _t = se.oneSpecies(ha);
      _t.length < ha.length && (ha.splice(0, ha.length, ..._t), se.save());
    }
    const gt = $?.foes?.();
    if ((($e = gt?.length ? gt : null), $e)) {
      const ha = `${$e.join()}@${x()}`;
      We = Z.get(ha) ?? Z.set(ha, new Map()).get(ha);
    }
    ($?.noBoss || $?.foes) && he === "best" && ((Oe = he), (he = "level"));
    let Dt = a("#evt-pick");
    if (!Dt) {
      ((Dt =
        f(`<div class="evt-pick-back" id="evt-pick"><div class="evt-pick" role="dialog" aria-modal="true">
        <div class="evt-head"><div class="map-region team-panel"><div class="map-head" id="evt-pick-head"></div>
          <div class="rp-fuse" id="evt-fuse"><div class="team-slots" id="evt-team"></div><span class="rp-div"></span><div id="evt-pop-side"></div></div></div>
        <div class="rp-search"><div id="evt-pop"></div>
        <div class="pc-filters">
          <input type="search" id="evt-search" placeholder="${e("Rechercher un Pokémon…")}" autocomplete="off">
          <button class="chip" id="evt-eff" title="${e("Efficaces")}">▲<span class="chip-l"> ${e("Efficaces")}</span></button>
          <div class="pc-sortbox"><select id="evt-sort"><option value="best">${e("Recommandés")}</option><option value="level">${e("Niveau")}</option><option value="recent">${e("Récents")}</option><option value="dex">${e("N° Pokédex")}</option></select></div>
        </div></div></div>
        <div class="pc-grid" id="evt-pc"></div>
        <div class="evt-foot" id="evt-foot"></div>
        <p class="evt-hint">${e("Glisse un Pokémon du PC vers un emplacement (échange s'il est pris), un membre vers le PC pour le retirer, ou entre deux membres pour changer l'ordre d'envoi. Un clic ajoute / retire.")}</p>
        <div class="evt-go" id="evt-go" hidden></div>
      </div></div>`)),
        document.body.appendChild(Dt));
      const ha = a("#evt-pc", Dt);
      (ha.addEventListener("pointerdown", (_t) => {
        const Ea = _t.target.closest(".pc-cell");
        Ea && lt(_t, Ea, "pc");
      }),
        ha.addEventListener("dragstart", (_t) => _t.preventDefault()),
        document.addEventListener("pointermove", Ht),
        document.addEventListener("pointerup", ct),
        document.addEventListener("pointercancel", ct),
        Dt.addEventListener("click", (_t) => {
          (_t.target === Dt || _t.target.closest("[data-evt-close]")) && et();
        }));
      for (const _t of [a("#evt-pop", Dt), a("#evt-pop-side", Dt)])
        _t.onclick = (Ea) => {
          const ut = Ea.target.closest("[data-pop]");
          ut && Ne(+ut.dataset.pop);
        };
      (Ze.addEventListener("change", () => {
        Te && _();
      }),
        (a("#evt-search", Dt).oninput = (_t) => {
          ((yt = Vs.fold(_t.target.value)), te());
        }),
        (a("#evt-eff", Dt).onclick = () => {
          ((At = !At), te());
        }),
        (a("#evt-sort", Dt).onchange = (_t) => {
          ((he = _t.target.value), te());
        }),
        document.addEventListener("keydown", (_t) => {
          _t.key === "Escape" && Dt.classList.contains("open") && et();
        }));
    }
    (Dt.classList.add("open"), _());
  }
  function et() {
    (a("#evt-pick")?.classList.remove("open"),
      $?.moves && t.UI.closeMovesDrawer(),
      Oe && ((he = Oe), (Oe = null)),
      (Te = null),
      ($ = null),
      t.App.refresh());
  }
  function _() {
    qe();
    const ge = se.DEX[Te],
      Fe = pt(P()),
      gt = Fe.length ? Math.round(Fe.reduce((Q, Y) => Q + Math.min(Y.level, x()), 0) / Fe.length) : "—";
    a("#evt-pick-head").innerHTML =
      ($?.head
        ? $.head()
        : `<span class="evt-leg">${H(Te, !1, 1, 40)}</span><h2>${e("{label} contre {name}", { label: $ ? $.label : e("Équipe"), name: ue(ge.name) })}</h2>
      <span class="evt-meta"><span class="evt-lv">${e("Nv. {n}", { n: x() })}</span>${($ ? ge : Je().legendOf(Te)).types.map((Q) => vt(Q, !0)).join("")}${$?.moves ? `<button class="mp-chip-btn" id="evt-moves">${e("Voir les capacités")} <i aria-hidden="true">›</i></button>` : ""}</span>`) +
      `<div class="map-sum"><span class="team-avg">${e("Niveau moyen <b>{n}</b>", { n: gt })}</span>${$?.noBoss ? "" : `<button class="btn small gold" id="evt-opt">${e("Optimiser")}</button>`}
        <button class="evt-x dc-x" data-evt-close title="${e("Fermer")}">✕</button></div>`;
    const Dt = a("#evt-opt");
    Dt && (Dt.onclick = z);
    const ha = a("#evt-moves");
    (ha && (ha.onclick = $.moves),
      (a('#evt-sort option[value="best"]').hidden = !!($?.noBoss || $?.foes)),
      (a("#evt-eff").hidden = !$?.edge));
    const _t = a("#evt-go"),
      Ea = $?.go?.why();
    ((a("#evt-pick .evt-hint").hidden = !!$?.go),
      (_t.hidden = !$?.go),
      (_t.innerHTML = $?.go
        ? `<button class="mp-go"${Ea ? ` disabled title="${ue(Ea)}"` : ""}>${ue($.go.label)}</button>`
        : ""),
      $?.go &&
        (_t.firstElementChild.onclick = () => {
          const Q = $.go;
          (et(), Q.run());
        }),
      (a("#evt-sort").value = he));
    const ut = a("#evt-team"),
      jt = Ze.matches && Tt() > 2;
    ((ut.className = `team-slots${Tt() <= 2 ? " duo" : ""}${jt ? " mini" : ""}`), (ut.innerHTML = ""));
    for (let Q = 0; Q < Tt(); Q++) {
      const Y = Fe[Q];
      if (!Y) {
        ut.appendChild(
          f(
            jt || Ze.matches
              ? `<div class="slot empty" data-slot="${Q}">＋</div>`
              : `<div class="slot empty" data-slot="${Q}"><span class="muted">${e("Emplacement libre")}</span><small class="muted">${e("Glisse un Pokémon du PC")}</small></div>`,
          ),
        );
        continue;
      }
      const ye = ce(Y),
        nt = f(
          jt
            ? `<div class="slot filled ${ve(ye)}" data-slot="${Q}" data-uid="${Y.uid}" title="${ue(se.DEX[Y.id].name)}">${De(ye)}${t.UI.rankTag(Y)}${H(Y.id, Y.shiny, t.UI.tileScale(Y.id, 24, 34), 38)}<span class="lv">${Math.min(Y.level, x())}</span></div>`
            : `<div class="slot filled ${ve(ye)}" data-slot="${Q}" data-uid="${Y.uid}">${De(ye)}${t.UI.rankTag(Y)}
        <div class="slot-types">${se.DEX[Y.id].types.map((Ot) => vt(Ot, !0)).join("")}</div>
        ${Ze.matches ? H(Y.id, Y.shiny, 2, 92) : H(Y.id, Y.shiny, 3, 132)}<div class="name">${ue(se.DEX[Y.id].name)}${Y.shiny ? " " + t.UI.shinyIc() : ""}</div><div class="lv">${je(Y)}</div></div>`,
        );
      (V(nt, "team"), ut.appendChild(nt));
    }
    a("#evt-foot").innerHTML =
      $?.legend ??
      e("{lv} ramené au niveau max", { lv: `<span class="evt-lv"><s>${x() + 8}</s>${x()}</span>` });
    const xt = U(),
      D = !!xt && Tt() <= 2 && !Ze.matches;
    (a("#evt-fuse").classList.toggle("rp-right", D),
      (a("#evt-pop-side").innerHTML = D ? xt : ""),
      (a("#evt-pop").innerHTML = D ? "" : xt),
      te(!1));
  }
  const we = (ge) =>
    se
      .allMons()
      .filter((Fe) => Fe.id === ge && u(Fe))
      .sort((Fe, gt) => gt.level - Fe.level)[0];
  function ie() {
    const ge = $?.reg ? t.Raids : $?.zone ? t.LegendZones : null,
      Fe = $?.reg ?? $?.zone;
    if (!ge) return null;
    if (
      (!fe &&
        t.Cloud?.user &&
        !ge.boardFresh(Fe) &&
        ((fe = !0),
        ge.loadBoard(Fe).then((Dt) => {
          Dt && Te && a("#evt-pick.open") && _();
        })),
      $.reg)
    )
      return ge.popular(Fe);
    const gt = ge.board(Fe);
    return gt?.popular?.length && gt.total >= 3 ? { total: gt.total, top: gt.popular.slice(0, 6) } : null;
  }
  function U() {
    const ge = ie();
    if (!ge) return "";
    const Fe = pt(P()),
      gt = ge.top
        .map(({ id: ha, n: _t }) => {
          const Ea = we(ha),
            ut = Fe.some((ye) => ye.id === ha),
            jt = !!se.S.dex[ha] || !!se.S.seen?.[ha],
            xt = jt ? se.DEX[ha].name : "???",
            D = Ea ? (ut ? "in" : "") : "miss",
            Q = Ea
              ? ut
                ? e("{name} : déjà dans ton équipe", { name: xt })
                : e("{name} : ajouter ton Nv. {n}", { name: xt, n: Ea.level })
              : e("{name} : pas dans ton PC", { name: xt }),
            Y = Ze.matches ? 52 : 72;
          return `<button class="rp-pk ${D}" ${Ea && !ut ? `data-pop="${ha}"` : ""} title="${ue(Q)}"><span class="dc-hero fr-mon${jt ? "" : " unknown"}" style="--m:${Y}">${H(ha, !1, Ze.matches ? t.UI.tileScale(ha, 30, 42) : 2, Y - 2)}</span>
        <small>${Math.round((_t / ge.total) * 100)} %</small><span class="mine">${Ea ? (ut ? e("dans l'équipe") : e("ton Nv. {n}", { n: Ea.level })) : e("pas dans ton PC")}</span></button>`;
        })
        .join(""),
      Dt = $.reg
        ? e(
            "Les espèces des 50 équipes les plus rapides contre ce boss. Sous chacune, ton meilleur exemplaire : un clic l'ajoute à ton équipe.",
          )
        : e(
            "Les espèces des équipes qui ont capturé ce légendaire. Sous chacune, ton meilleur exemplaire : un clic l'ajoute à ton équipe.",
          );
    return `<div class="rp-side"><h4>${e("Les plus choisis")}${t.UI.infoTip(Dt)}<span class="rt-n">${e("{n} équipes", { n: ge.total })}</span></h4><div class="rp-pks">${gt}</div></div>`;
  }
  function Ne(ge) {
    const Fe = we(ge),
      gt = se.eventTeam(P());
    !Fe ||
      gt.includes(Fe.uid) ||
      (gt.length >= Tt() ? (gt[gt.length - 1] = Fe.uid) : gt.push(Fe.uid),
      T(se.keepOne(gt, Fe.uid, le), Fe.uid),
      se.save(),
      t.Sfx?.click?.(),
      _());
  }
  function T(ge, Fe) {
    const gt = se.getMon(ge),
      Dt = se.getMon(Fe);
    if (!(!gt || !Dt || gt.id !== Dt.id)) {
      if (!gt.shiny != !Dt.shiny)
        return B(
          e("Un seul {name} par équipe en Élite, chromatique ou non : l'autre retourne au PC.", {
            name: ue(se.DEX[Dt.id].name),
          }),
        );
      B(
        Dt.shiny
          ? e("Un seul {name} chromatique par équipe : l'autre retourne au PC.", {
              name: ue(se.DEX[Dt.id].name),
            })
          : e("Un seul {name} par équipe : l'autre retourne au PC.", { name: ue(se.DEX[Dt.id].name) }),
      );
    }
  }
  let L = null,
    R = [];
  function te(ge = !0) {
    ge && qe();
    const Fe = se.eventTeam(P());
    a("#evt-eff").classList.toggle("on", At);
    let gt = se
      .allMons()
      .filter((ut) => !Fe.includes(ut.uid) && u(ut) && (!yt || Vs.fold(se.DEX[ut.id].name).includes(yt)));
    At && (gt = gt.filter((ut) => ce(ut) > 0));
    const Dt = {
      best: He,
      level: (ut, jt) => jt.level - ut.level || _e(jt) - _e(ut),
      recent: (ut, jt) => jt.caughtAt - ut.caughtAt,
      dex: (ut, jt) => ut.id - jt.id,
    }[he];
    gt.sort(Dt);
    const ha = new Map($?.lock ? gt.map((ut) => [ut.uid, $.lock(ut)]).filter((ut) => ut[1]) : []);
    ha.size && (gt = [...gt.filter((ut) => !ha.has(ut.uid)), ...gt.filter((ut) => ha.has(ut.uid))]);
    const _t = Ze.matches,
      Ea = { 1: De(1), 0: "" };
    ((R = gt.map((ut) => ut.uid)),
      (L ||= t.VGrid(a("#evt-pc"))),
      L.set(
        gt.map((ut) => ({ m: ut })),
        ({ m: ut }) => {
          const jt = ce(ut),
            xt = ha.get(ut.uid);
          return `<div class="pc-cell ${ve(jt)}${xt ? " evt-lock" : ""}" data-uid="${ut.uid}" title="${ue(e("{name} Nv. {n}", { name: se.DEX[ut.id].name, n: ut.level }))}${xt && $.lockToast ? " · " + ue(it(ut)) : ""}">${Ea[jt]}${$?.mark?.(ut) || ""}${t.UI.rankTag(ut)}
        ${_t ? H(ut.id, ut.shiny, t.UI.tileScale(ut.id, 28, 42), 46) : H(ut.id, ut.shiny, 2, 76)}${xt ? `<span class="lvl evt-cd">${xt}</span>` : `<span class="lvl">${ut.shiny ? t.UI.shinyIc() : ""}${je(ut)}</span>`}</div>`;
        },
        `<p class="pg-empty">${e(At ? "Aucun Pokémon efficace dans ton PC" : "Aucun Pokémon")}</p>`,
      ));
  }
  const K = 12,
    He = (ge, Fe) => ($ && (dt.get(ge.uid) ?? 1e9) - (dt.get(Fe.uid) ?? 1e9)) || _e(Fe) - _e(ge);
  function m(ge) {
    const Fe = new Set(),
      gt = se
        .allMons()
        .filter((Dt) => u(Dt) && !$?.lock?.(Dt))
        .sort($ ? (Dt, ha) => _e(ha) - _e(Dt) : He)
        .filter((Dt) => {
          const ha = le(Dt);
          return !ha || (!Fe.has(ha) && Fe.add(ha));
        });
    return $
      ? t.Adventure.counterTeam(
          gt.map((Dt) => ({ uid: Dt.uid, ...de(Dt) })),
          ge,
        )
      : gt.slice(0, ge).map((Dt) => Dt.uid);
  }
  function z() {
    const ge = m(Tt()),
      Fe = se.eventTeam(P());
    if (ge.join() === Fe.join()) {
      B($?.already ?? e("Ton équipe est déjà la plus forte contre cet event !"));
      return;
    }
    (Fe.splice(0, Fe.length, ...ge), se.save(), t.Sfx?.buy?.(), _());
  }
  let pe = null;
  function V(ge, Fe) {
    (ge.addEventListener("dragstart", (gt) => gt.preventDefault()),
      ge.addEventListener("pointerdown", (gt) => lt(gt, ge, Fe)));
  }
  function lt(ge, Fe, gt) {
    if (!(ge.button > 0 || pe)) {
      if (Fe.classList.contains("evt-lock")) {
        $?.lockToast && B(it(se.getMon(Fe.dataset.uid)));
        return;
      }
      ((pe = {
        el: Fe,
        src: gt,
        uid: Fe.dataset.uid,
        x0: ge.clientX,
        y0: ge.clientY,
        id: ge.pointerId,
        moved: !1,
        lift: ge.pointerType === "touch" ? -Math.round(Math.min(40, Fe.offsetHeight * 0.6)) : 0,
      }),
        t.UI.touchHold.start(ge, Fe, pe));
    }
  }
  const kt = (ge, Fe, gt) => Fe >= ge.left && Fe <= ge.right && gt >= ge.top && gt <= ge.bottom,
    ra = (ge, Fe, gt) => {
      let Dt = -1,
        ha = 1 / 0;
      return (
        ge.forEach((_t, Ea) => {
          const ut = Math.hypot(_t.left + _t.width / 2 - Fe, _t.top + _t.height / 2 - gt);
          ut < ha && ((ha = ut), (Dt = Ea));
        }),
        Dt
      );
    };
  function Vt(ge) {
    ((ge.teamRect = a("#evt-team").getBoundingClientRect()),
      (ge.pcRect = a("#evt-pc").getBoundingClientRect()),
      (ge.rects = ge.slots.map((Fe) => Fe.getBoundingClientRect())),
      (ge.key = null));
  }
  const Xt = () => {
    pe?.moved && (Vt(pe), pe.last && Ht(pe.last));
  };
  function Ht(ge) {
    if (!pe || ge.pointerId !== pe.id) return;
    const Fe = pe,
      { el: gt, src: Dt } = Fe,
      ha = ge.clientX - Fe.x0,
      _t = ge.clientY - Fe.y0;
    if (t.UI.touchHold.waiting(Fe, ha, _t)) {
      Fe.cancelled && (t.UI.touchHold.end(Fe, gt), (pe = null));
      return;
    }
    if (!Fe.moved && Math.hypot(ha, _t) < 6) return;
    if (((Fe.last = { clientX: ge.clientX, clientY: ge.clientY, pointerId: ge.pointerId }), !Fe.moved)) {
      ((Fe.moved = !0),
        (Fe.slots = b("#evt-team .slot")),
        (Fe.filled = Fe.slots.filter((Q) => Q.classList.contains("filled"))),
        (Fe.from = Dt === "team" ? Fe.filled.indexOf(gt) : -1),
        gt.classList.add("dragging"),
        document.body.classList.add("mon-sorting"),
        Fe.lift && (gt.style.setProperty("--lift", Fe.lift + "px"), gt.classList.add("lift")),
        Dt === "pc" && L.pin(R.indexOf(Fe.uid)),
        Vt(Fe));
      for (const Q of [a("#evt-pick .evt-pick"), a("#evt-pc")])
        Q.addEventListener("scroll", Xt, { passive: !0 });
    }
    gt.style.transform = `translate(${ha}px,${_t}px) scale(${Fe.lift ? 1.12 : 1.05})`;
    const Ea = ge.clientX,
      ut = ge.clientY + Fe.lift,
      jt = kt(Fe.teamRect, Ea, ut) ? "team" : kt(Fe.pcRect, Ea, ut) ? "pc" : null;
    ((Fe.slot =
      jt === "team" ? Math.min(ra(Fe.rects, Ea, ut), Fe.filled.length - (Dt === "team" ? 1 : 0)) : -1),
      (Fe.zone = jt));
    const xt = jt === "team" ? "team" + Fe.slot : jt || "none";
    if (xt === Fe.key) return;
    ((Fe.key = xt),
      t.Sfx?.click?.(),
      Fe.lift && jt && navigator.vibrate?.(8),
      Dt === "team" &&
        Fe.filled.forEach((Q, Y) => {
          if (Q === gt) return;
          const ye = jt === "team" ? Fe.slot : jt === "pc" ? Fe.filled.length - 1 : Fe.from,
            nt = Fe.from,
            Ot = nt < ye ? (Y > nt && Y <= ye ? Y - 1 : Y) : Y < nt && Y >= ye ? Y + 1 : Y;
          Q.style.transform =
            Ot !== Y
              ? `translate(${Fe.rects[Ot].left - Fe.rects[Y].left}px,${Fe.rects[Ot].top - Fe.rects[Y].top}px)`
              : "";
        }));
    const D = jt === "team" && Dt === "pc" ? Fe.slots[Fe.slot] : null;
    (Fe.slots.forEach((Q) => {
      (Q.classList.toggle("drop-over", Q === D),
        Q.classList.toggle("swap-out", Q === D && Q.classList.contains("filled")));
    }),
      a("#evt-pc").classList.toggle("drop-over", jt === "pc" && Dt === "team"));
  }
  function ct(ge) {
    if (!pe || ge.pointerId !== pe.id) return;
    const Fe = pe,
      gt = Fe.el;
    ((pe = null), t.UI.touchHold.end(Fe, gt));
    const Dt = se.eventTeam(P()),
      ha = Dt.indexOf(Fe.uid);
    let _t = null;
    if (Fe.moved) {
      for (const ut of [a("#evt-pick .evt-pick"), a("#evt-pc")]) ut.removeEventListener("scroll", Xt);
      ((_t = gt.getBoundingClientRect()),
        document.body.classList.remove("mon-sorting"),
        Fe.slots.forEach((ut) => {
          ((ut.style.transform = ""), ut.classList.remove("drop-over", "swap-out"));
        }),
        a("#evt-pc").classList.remove("drop-over"),
        (gt.style.transform = ""),
        gt.classList.remove("dragging", "lift"),
        gt.style.removeProperty("--lift"),
        Fe.src === "pc" && L.pin(null));
    }
    if (Fe.moved)
      if (Fe.zone === "team") {
        const ut = Fe.slot;
        ha >= 0
          ? (Dt.splice(ha, 1), Dt.splice(ut, 0, Fe.uid))
          : Dt[ut] != null
            ? (Dt[ut] = Fe.uid)
            : Dt.push(Fe.uid);
      } else if (Fe.zone === "pc" && ha >= 0) Dt.splice(ha, 1);
      else return;
    else if (ha >= 0) Dt.splice(ha, 1);
    else if (Dt.length < Tt()) Dt.push(Fe.uid);
    else {
      B(e("Ton équipe d'event est complète : glisse-le sur un membre pour l'échanger."));
      return;
    }
    (Dt.includes(Fe.uid) && T(se.keepOne(Dt, Fe.uid, le), Fe.uid), se.save(), _());
    const Ea = _t && a(`#evt-team .slot[data-uid="${Fe.uid}"]`);
    if (Ea && !se.S.reducedAnim && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
      const ut = Ea.getBoundingClientRect();
      Ea.animate(
        [{ transform: `translate(${_t.left - ut.left}px,${_t.top - ut.top}px)` }, { transform: "none" }],
        { duration: 180, easing: "cubic-bezier(.2,.8,.3,1)" },
      );
    }
  }
  function wt(ge) {
    for (const Fe of b("[data-evt-edit]", ge))
      Fe.onclick = () => Ee(+Fe.closest("[data-evt-id]").dataset.evtId);
  }
  return { strip: tt, mini: mt, open: Ee, bind: wt };
})();
