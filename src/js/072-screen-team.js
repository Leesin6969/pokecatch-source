/**
 * screen team
 *
 * Public API on the game namespace `t`: t.Screens.team
 *
 * Recovered from the shipped bundle — original chunk #71 at byte 1927870 (26620 bytes, sha256:2bed0abdc7baca67).
 * This file is one original source file; the build concatenates them in filename order.
 */
(function () {
  const {
      $: a,
      h: b,
      typeBadge: f,
      sprBox: ue,
      esc: H,
      idle: vt,
      toast: B,
      buddyIcon: se,
      fmt: Ge,
      tween: Je,
      sleep: Ze,
      modal: x,
      confirm: $,
    } = t.UI,
    X = t.Game,
    Tt = t.CONFIG,
    le = matchMedia("(max-width: 640px)");
  let P = 1 / 0;
  const u = (Y, ye = P) => Y.shiny && !Y.ot && (Y.caughtAt || 0) > ye,
    ve = () => X.ownedMons().filter((Y) => u(Y, X.S.pcVisit || 0)).length;
  function it() {
    (dt(a("#team-slots"), !1), dt(a("#team-mini"), !0), A(), We(), ce());
  }
  const De = 5,
    je = () => {
      const Y = (X.S.teamSets ??= { list: [[...X.S.team]], on: 0 });
      for (; Y.list.length < De;) Y.list.push(null);
      return Y;
    },
    pt = (Y, ye) => Y.length === ye.length && Y.every((nt, Ot) => nt === ye[Ot]);
  function re() {
    const Y = je();
    if (Y.on == null) {
      const ye = Y.list.findIndex((nt) => nt && pt(nt, X.S.team));
      ye >= 0 && (Y.on = ye);
    } else Y.list[Y.on] = [...X.S.team];
  }
  function We() {
    const Y = a("#team-sets");
    (X.pruneSets(), re());
    const ye = je();
    (Y.setAttribute("aria-label", e("Équipes enregistrées")),
      (Y.innerHTML = ye.list
        .map((nt, Ot) => {
          if (!nt)
            return `<button type="button" class="ts-free" data-set="${Ot}" title="${e("Nouvelle équipe")}" aria-label="${e("Nouvelle équipe")}"><span>+</span></button>`;
          const ee = nt.map(X.getMon),
            rt = ee.filter(Boolean),
            Qe = rt[0],
            Ft = rt.length ? Math.round(rt.reduce((bt, Yt) => bt + Yt.level, 0) / rt.length) : 0,
            Ye = Array.from({ length: Math.max(Tt.TEAM_SIZE, ee.length) }, (bt, Yt) =>
              ee[Yt] ? `<span>${ue(ee[Yt].id, ee[Yt].shiny, 1, 36)}</span>` : '<span class="gone"></span>',
            ).join("");
          return `<button type="button" data-set="${Ot}" class="${Ot === ye.on ? "on" : ""}${Qe ? "" : " ts-empty"}" aria-pressed="${Ot === ye.on}">
        ${Qe ? `<span class="ts-lead">${ue(Qe.id, Qe.shiny, 1, 32)}</span>${Ot + 1}` : '<span class="ts-lead ts-none">+</span>'}
        <span class="bag-tip ts-tip" role="tooltip"><b>${Ot === ye.on ? e("Équipe {n} · en cours", { n: Ot + 1 }) : e("Équipe {n}", { n: Ot + 1 })}</b><span class="ts-six">${Ye}</span><small>${e("Niveau moyen <b>{n}</b>", { n: Ft || "—" })}</small></span></button>`;
        })
        .join("")));
  }
  function oe(Y) {
    const ye = je();
    if (Y === ye.on) return;
    if (!ye.list[Y]) ((ye.list[Y] = []), (ye.on = Y), (X.S.team = []));
    else {
      const Ot = [];
      for (const ee of ye.list[Y]) {
        const rt = X.S.mons.find((Qe) => Qe.uid === ee);
        rt && !X.can(rt) && !X.holdsOne(Ot, rt) && Ot.length < Tt.TEAM_SIZE && Ot.push(ee);
      }
      if (!Ot.length && ye.list[Y].length) {
        (B(e("Aucun Pokémon de cette équipe ne peut venir ici.")), t.Sfx?.error?.());
        return;
      }
      (Ot.length < ye.list[Y].length && B(e("Certains Pokémon de cette équipe ne peuvent pas venir ici.")),
        (X.S.team = Ot),
        (ye.on = Y),
        a("#pc-sort").value === "custom" && (X.S.pcOrder = X.S.pcOrder?.filter((ee) => !Ot.includes(ee))));
    }
    (t.Sfx?.buy?.(), X.save(), t.App.refresh());
    const nt = a("#team-slots");
    (nt.classList.remove("ts-swap"), nt.offsetWidth, nt.classList.add("ts-swap"));
  }
  function $e() {
    const Y = a("#team-sets");
    let ye = 0,
      nt = null;
    const Ot = () => Y.querySelector(".ts-peek")?.classList.remove("ts-peek");
    (Y.addEventListener("click", (ee) => {
      const rt = ee.target.closest("button[data-set]");
      if (rt) {
        if (nt) {
          nt = null;
          return;
        }
        (Ot(), oe(+rt.dataset.set));
      }
    }),
      Y.addEventListener("pointerdown", (ee) => {
        const rt = ee.target.closest("button[data-set]:not(.ts-free)");
        !rt ||
          ee.pointerType === "mouse" ||
          ((nt = null),
          (ye = Wa(() => {
            Ot();
            const Qe = Y.getBoundingClientRect();
            (rt.style.setProperty("--tip-x", Qe.left + Qe.width / 2 - rt.getBoundingClientRect().left + "px"),
              rt.classList.add("ts-peek"),
              (nt = rt),
              navigator.vibrate?.(12));
          }, 400)));
      }));
    for (const ee of ["pointerup", "pointercancel", "pointerleave"])
      Y.addEventListener(ee, () => clearTimeout(ye));
    (Y.addEventListener("contextmenu", (ee) => ee.preventDefault()),
      document.addEventListener(
        "pointerdown",
        (ee) => {
          Y.contains(ee.target) || Ot();
        },
        { passive: !0 },
      ));
  }
  let Z = null;
  function A() {
    const Y = X.teamMons(X.S.team),
      ye = Y.length ? Math.round(Y.reduce((Ye, bt) => Ye + bt.level, 0) / Y.length) : 0;
    let nt = a("#team-sum .team-avg b");
    if (
      (nt ||
        ((a("#team-sum").innerHTML = `<span class="team-avg">${e("Niveau moyen")} <b></b></span>`),
        (nt = a("#team-sum .team-avg b"))),
      Z === null || Z === ye)
    ) {
      ((nt.textContent = ye || "—"), (Z = ye));
      return;
    }
    const Ot = Z,
      ee = ye > Ot,
      rt = zn.now(),
      Qe = 500;
    ((Z = ye), nt.classList.remove("up", "down"), nt.offsetWidth, nt.classList.add(ee ? "up" : "down"));
    const Ft = Ss(() => {
      const Ye = Math.min(1, (zn.now() - rt) / Qe);
      if (Z !== ye) return clearInterval(Ft);
      ((nt.textContent = Math.round(Ot + (ye - Ot) * (1 - (1 - Ye) ** 3)) || "—"),
        Ye >= 1 && clearInterval(Ft));
    }, 30);
  }
  const J = [
      ["mini", "#team-mini.show .slot.filled"],
      ["pc", "#pc-grid .pc-cell:not(.ghost)"],
      ["full", "#team-slots .slot.filled"],
    ],
    de = (Y) => (Y.closest("#team-mini") ? "mini" : Y.closest("#pc-grid") ? "pc" : "full");
  function _e(Y) {
    const ye = new Map(),
      nt = (Ot, ee) => {
        const rt = Ot.dataset.uid;
        if (!rt) return;
        const Qe = Ot.getBoundingClientRect(),
          Ft = ee + ":" + rt;
        (ye.has(Ft) || ye.set(Ft, Qe), ye.has(rt) || ye.set(rt, Qe));
      };
    Y && nt(Y, de(Y));
    for (const [Ot, ee] of J) document.querySelectorAll(ee).forEach((rt) => nt(rt, Ot));
    return ye;
  }
  function Re(Y, ye) {
    if ((ye(), matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
    const nt = new Set(),
      Ot = (ee) => ee.bottom < 0 || ee.top > innerHeight;
    for (const [ee, rt] of J)
      document.querySelectorAll(rt).forEach((Qe) => {
        const Ft = Y.get(ee + ":" + Qe.dataset.uid) || Y.get(Qe.dataset.uid),
          Ye = Qe.getBoundingClientRect();
        if (Ot(Ye) && (!Ft || Ot(Ft))) return;
        if (!Ft) {
          Qe.animate(
            [
              { opacity: 0, transform: "scale(.5)" },
              { opacity: 1, transform: "none" },
            ],
            { duration: 320, easing: "cubic-bezier(.3,1.5,.5,1)" },
          );
          return;
        }
        const bt = Ft.left - Ye.left,
          Yt = Ft.top - Ye.top,
          wa = Ft.width / Ye.width,
          pa = Ft.height / Ye.height;
        if (Math.abs(bt) < 1 && Math.abs(Yt) < 1) return;
        const Gt = nt.has(Qe.dataset.uid) ? 0 : 1;
        (nt.add(Qe.dataset.uid),
          (Qe.style.zIndex = 5),
          (Qe.animate(
            [
              { transform: `translate(${bt}px,${Yt}px) scale(${wa},${pa})`, offset: 0 },
              { transform: `translate(${bt * 0.5}px,${Yt * 0.5}px) scale(${Gt ? 1.08 : 1})`, offset: 0.5 },
              { transform: "none", offset: 1 },
            ],
            { duration: 420, easing: "cubic-bezier(.25,.8,.25,1)" },
          ).onfinish = () => {
            Qe.style.zIndex = "";
          }));
      });
  }
  function dt(Y, ye) {
    const nt = X.teamMons(X.S.team),
      Ot = [...Y.children],
      ee = (rt, Qe) => {
        if (Ot[rt]?.__h === Qe) return null;
        const Ft = b(Qe);
        return ((Ft.__h = Qe), Ot[rt] ? Ot[rt].replaceWith(Ft) : Y.appendChild(Ft), Ft);
      };
    for (let rt = 0; rt < Tt.TEAM_SIZE; rt++) {
      const Qe = nt[rt];
      if (!Qe) {
        ee(
          rt,
          ye
            ? '<div class="slot empty"></div>'
            : `<div class="slot empty"><span class="muted">${e("Emplacement libre")}</span><small class="muted">${e("Choisis un Pokémon dans le PC")}</small></div>`,
        );
        continue;
      }
      const Ft = X.xpForNext(Qe.level, Qe),
        Ye = !ye && u(Qe),
        bt = ee(
          rt,
          `<div class="slot filled${Ye ? " is-new" : ""}" data-team-uid="${Qe.uid}" data-uid="${Qe.uid}">${t.UI.rankTag(Qe)}
        ${ye ? "" : `<div class="slot-types">${X.DEX[Qe.id].types.map((Yt) => f(Yt, !0)).join("")}</div>${X.S.buddy.uid === Qe.uid ? `<span class="dc-buddy on slot-buddy" title="${e("Copain")}"><img src="${t.UI.itemSrc("love-ball")}" alt="${e("Copain")}"></span>` : ""}${Ye ? '<span class="new">NEW</span>' : ""}`}
        <div class="w" style="transform-origin:50% 100%;width:100%">${ye ? (le.matches ? ue(Qe.id, Qe.shiny, t.UI.tileScale(Qe.id, 24, 34), 38) : ue(Qe.id, Qe.shiny, t.UI.fitScale(Qe.id, 96), 84)) : ue(Qe.id, Qe.shiny, 3, 132)}</div>
        <div class="name">${H(X.DEX[Qe.id].name)}${Qe.shiny ? " " + t.UI.shinyIc() : ""}</div>
        ${ye ? `<div class="lv">${e("Nv. {n}", { n: Qe.level })}</div>` : `<div class="lv">${e("Nv. {n}", { n: Qe.level })} · ${H(X.mainMove(Qe).name)}</div>`}
        <div class="xpbar"><div style="width:${X.capped(Qe) ? 100 : (Qe.xp / Ft) * 100}%"></div></div>
      </div>`,
        );
      if (bt) {
        if (!ye) {
          const Yt = vt(a(".w", bt), { amp: 0.7 });
          a("#screen-team.active") || Yt.pause();
        }
        ((bt.onclick = () => t.UI.monDetail(Qe.uid, [...X.S.team])), Ee(bt, "team"));
      }
    }
    for (; Y.children.length > Tt.TEAM_SIZE;) Y.lastElementChild.remove();
  }
  const qe = (Y) =>
    document
      .querySelectorAll("#team-slots .w")
      .forEach((ye) => ye.getAnimations().forEach((nt) => (Y ? nt.play() : nt.pause())));
  function ce() {
    const Y = a("#team-mini"),
      ye = a("#team-slots");
    if (!a("#screen-team").classList.contains("active") || (Te?.moved && Te.el.closest("#team-mini"))) return;
    const nt = ye.getBoundingClientRect(),
      Ot = a("#topbar")?.offsetHeight || 0,
      ee = nt.top < Ot - nt.height * 0.25;
    if (
      (Y.classList.toggle("show", ee),
      a("#screen-team").style.setProperty("--mini-h", ee ? Y.offsetHeight + "px" : "0px"),
      ee)
    ) {
      const rt = a("#screen-team").getBoundingClientRect();
      ((Y.style.left = rt.left + "px"), (Y.style.width = rt.width + "px"));
    }
  }
  let tt = 0;
  const mt = () => {
    tt ||
      !a("#screen-team").classList.contains("active") ||
      (tt = es(() => {
        ((tt = 0), ce());
      }));
  };
  let Te = null;
  const At = (Y, ye, nt) => ye >= Y.left && ye <= Y.right && nt >= Y.top && nt <= Y.bottom,
    yt = (Y, ye, nt) => {
      let Ot = -1,
        ee = 1 / 0;
      return (
        Y.forEach((rt, Qe) => {
          const Ft = Math.hypot(rt.left + rt.width / 2 - ye, rt.top + rt.height / 2 - nt);
          Ft < ee && ((ee = Ft), (Ot = Qe));
        }),
        Ot
      );
    },
    he = () => (a("#team-mini").classList.contains("show") ? a("#team-mini") : a("#team-slots"));
  function fe(Y, ye) {
    (Y.slots?.forEach((nt) => nt.classList.remove("drop-over", "swap-out")),
      (Y.team = ye),
      (Y.slots = [...ye.children]),
      (Y.teamRows = Y.slots.filter((nt) => nt.classList.contains("filled"))),
      (Y.slotRects = Y.slots.map((nt) => nt.getBoundingClientRect())),
      (Y.key = null));
  }
  function Oe(Y) {
    const Ot = () => {
      if (Te !== Y || !Y.last) return;
      const ee = le.matches && a(".side-nav"),
        rt = ee ? ee.getBoundingClientRect().top : innerHeight,
        Qe = Math.min(1, (Y.last.clientY - rt + 56) / 56);
      (Qe > 0 && scrollBy(0, Math.round(Qe * 14)), (Y.raf = es(Ot)));
    };
    Y.raf = es(Ot);
  }
  function Ee(Y, ye) {
    (Y.addEventListener("dragstart", (nt) => nt.preventDefault()),
      Y.addEventListener("pointerdown", (nt) => et(nt, Y, ye)));
  }
  function et(Y, ye, nt) {
    Y.button > 0 ||
      Te ||
      ((Te = {
        el: ye,
        src: nt,
        uid: ye.dataset.uid,
        x0: Y.clientX,
        y0: Y.clientY,
        sx: scrollX,
        sy: scrollY,
        id: Y.pointerId,
        moved: !1,
        lift: Y.pointerType === "touch" ? -Math.round(Math.min(40, ye.offsetHeight * 0.6)) : 0,
      }),
      t.UI.touchHold.start(Y, ye, Te),
      addEventListener("scroll", we, { passive: !0 }));
  }
  function _(Y) {
    if (!Te || Y.pointerId !== Te.id) return;
    const { el: ye, src: nt } = Te;
    Te.last = { clientX: Y.clientX, clientY: Y.clientY, pointerId: Y.pointerId };
    const Ot = !!ye.closest("#team-mini"),
      ee = Ot ? 0 : scrollX - Te.sx,
      rt = Ot ? 0 : scrollY - Te.sy,
      Qe = Y.clientX - Te.x0 + ee,
      Ft = Y.clientY - Te.y0 + rt;
    if (t.UI.touchHold.waiting(Te, Qe, Ft)) {
      Te.cancelled && (t.UI.touchHold.end(Te, ye), (Te = null), removeEventListener("scroll", we));
      return;
    }
    if (!Te.moved) {
      if (Math.hypot(Qe, Ft) < 6) return;
      ((Te.moved = !0),
        (Te.grid = a("#pc-grid")),
        fe(Te, nt === "team" ? ye.parentElement : he()),
        nt === "team"
          ? ((Te.rows = Te.teamRows),
            (Te.rects = Te.rows.map((W) => W.getBoundingClientRect())),
            (Te.from = Te.rows.indexOf(ye)))
          : ((Te.from = _t.indexOf(Te.uid)), Ea.pin(Te.from)),
        (Te.to = Te.from),
        ye.classList.add("dragging"),
        document.body.classList.add("mon-sorting"),
        Te.lift && (ye.style.setProperty("--lift", Te.lift + "px"), ye.classList.add("lift")),
        Oe(Te));
    }
    ((ye.style.transform = `translate(${Qe}px,${Ft}px) scale(${Te.lift ? 1.12 : 1.05})`),
      nt === "pc" && he() !== Te.team && fe(Te, he()));
    const { from: Ye } = Te;
    (ee || rt) && (Te.slotRects = Te.slots.map((W) => W.getBoundingClientRect()));
    const bt = Y.clientX,
      Yt = Y.clientY + Te.lift,
      wa = At(Te.team.getBoundingClientRect(), bt, Yt)
        ? "team"
        : At(Te.grid.getBoundingClientRect(), bt, Yt)
          ? "pc"
          : null;
    let pa = Ye,
      Gt;
    if (wa === nt) {
      const W = nt === "team" ? Te.rects[Ye] : Ea.rect(Ye);
      ((pa =
        nt === "team"
          ? yt(Te.rects, W.left + W.width / 2 + Qe, W.top + W.height / 2 + Ft + Te.lift)
          : Ea.nearest(W.left + W.width / 2 + Qe, W.top + W.height / 2 + Ft + Te.lift)),
        (Gt = "self" + pa));
    } else
      wa === "team"
        ? ((Te.slot = yt(Te.slotRects, bt, Yt)),
          Te.slot > Te.teamRows.length && (Te.slot = Te.teamRows.length),
          (Gt = "team" + Te.slot))
        : wa === "pc"
          ? ((Te.slot = Math.max(0, Ea.nearest(bt, Yt))), (Gt = "pc"))
          : (Gt = "none");
    if (((Te.zone = wa), (Te.to = pa), Gt === Te.key)) return;
    ((Te.key = Gt),
      t.Sfx?.click?.(),
      Te.lift && wa && navigator.vibrate?.(8),
      nt === "team"
        ? Te.rows.forEach((W, ze) => {
            if (W === ye) return;
            const qt = wa === nt && ze === pa ? Ye : ze,
              { rects: Lt } = Te;
            W.style.transform =
              qt !== ze ? `translate(${Lt[qt].left - Lt[ze].left}px,${Lt[qt].top - Lt[ze].top}px)` : "";
          })
        : Ea.cells((W, ze) => {
            W !== ye && (W.style.transform = ie(Te, ze));
          }));
    const N = wa !== "team" ? null : nt === "pc" ? Te.slots[Te.slot] : pa !== Ye ? Te.rows[pa] : null;
    (Te.slots.forEach((W) => {
      (W.classList.toggle("drop-over", W === N),
        W.classList.toggle("swap-out", W === N && nt === "pc" && W.classList.contains("filled")));
    }),
      Te.grid.classList.toggle("drop-over", wa === "pc" && nt === "team"));
  }
  const we = () => {
      Te?.moved && Te.last && _(Te.last);
    },
    ie = (Y, ye) => {
      const { from: nt, to: Ot } = Y,
        ee = Y.zone !== "pc" ? ye : ye > nt && ye <= Ot ? ye - 1 : ye < nt && ye >= Ot ? ye + 1 : ye;
      if (ee === ye) return "";
      const { dx: rt, dy: Qe } = Ea.offset(ye, ee);
      return `translate(${rt}px,${Qe}px)`;
    };
  function U(Y) {
    if (!Te || Y.pointerId !== Te.id) return;
    const ye = Te,
      nt = ye.el;
    if (
      ((Te = null),
      cancelAnimationFrame(ye.raf),
      t.UI.touchHold.end(ye, nt),
      removeEventListener("scroll", we),
      !ye.moved)
    )
      return;
    (document.body.classList.remove("mon-sorting"),
      nt.classList.remove("dragging"),
      ye.slots.forEach((ee) => ee.classList.remove("drop-over", "swap-out")),
      ye.grid.classList.remove("drop-over"),
      nt.addEventListener("click", (ee) => ee.stopImmediatePropagation(), { capture: !0, once: !0 }));
    const Ot = _e(nt);
    (ye.src === "team"
      ? ye.rows.forEach((ee) => {
          ee.style.transform = "";
        })
      : Ea.cells((ee) => {
          ee.style.transform = "";
        }),
      (nt.style.transform = ""),
      nt.classList.remove("lift"),
      nt.style.removeProperty("--lift"),
      ye.src === "pc" && Ea.pin(null),
      Re(Ot, () => L(ye)),
      ce());
  }
  (document.addEventListener("pointermove", _),
    document.addEventListener("pointerup", U),
    document.addEventListener("pointercancel", U));
  function Ne(Y) {
    ((X.S.pcOrder = Y), (X.S.pcSort = "custom"), (a("#pc-sort").value = "custom"));
  }
  const T = (Y) =>
    es(() => {
      const ye = a(`#pc-grid .pc-cell[data-uid="${Y}"]`);
      (ye?.classList.remove("refused"), ye?.offsetWidth, ye?.classList.add("refused"));
    });
  function L(Y) {
    const ye = X.S.team,
      nt = [..._t];
    if (Y.zone === "pc" && Y.src === "pc" && He()) {
      Y.to !== Y.from && B(e("Retire les filtres pour réorganiser le PC"));
      return;
    }
    if (Y.zone === "team" && Y.src === "team" && Y.to !== Y.from)
      [ye[Y.from], ye[Y.to]] = [ye[Y.to], ye[Y.from]];
    else if (Y.zone === Y.src && Y.to !== Y.from) {
      const Ot = nt,
        [ee] = Ot.splice(Y.from, 1);
      (Ot.splice(Y.to, 0, ee), Y.src === "pc" && Ne(Ot));
    } else if (Y.src === "pc" && Y.zone === "team") {
      const Ot = X.can(X.getMon(Y.uid));
      if (Ot) {
        (B(`${t.UI.lockIc}${H(Ot)}`), t.Sfx?.error?.(), T(Y.uid));
        return;
      }
      const ee = ye[Y.slot];
      (ee ? (ye[Y.slot] = Y.uid) : ye.push(Y.uid), nt.splice(nt.indexOf(Y.uid), 1, ...(ee ? [ee] : [])));
      const rt = X.keepOne(ye, Y.uid),
        Qe = X.getMon(Y.uid);
      (rt && X.getMon(rt).id === Qe.id
        ? (nt.push(rt),
          B(
            Qe.shiny
              ? e("Un seul {name} chromatique par équipe : l'autre retourne au PC.", {
                  name: H(X.DEX[Qe.id].name),
                })
              : e("Un seul {name} par équipe : l'autre retourne au PC.", { name: H(X.DEX[Qe.id].name) }),
          ))
        : rt &&
          (nt.push(rt),
          B(
            e("{a} remplace {b} dans l'équipe !", {
              a: H(X.DEX[X.getMon(Y.uid).id].name),
              b: H(X.DEX[X.getMon(rt).id].name),
            }),
          )),
        a("#pc-sort").value === "custom" && !He() && (X.S.pcOrder = nt),
        t.Sfx?.buy?.());
    } else if (Y.src === "team" && Y.zone === "pc") {
      if (X.storageFull()) {
        (B(e("Le PC est plein !")), t.Sfx?.error?.());
        return;
      }
      (ye.splice(ye.indexOf(Y.uid), 1),
        a("#pc-sort").value === "custom" && !He() && (nt.splice(Y.slot, 0, Y.uid), (X.S.pcOrder = nt)));
    } else return;
    (X.save(), t.App.refresh());
  }
  const R = (Y) => Y.item && Y.item !== "link-cable" && X.S.items[Y.item] > 0,
    te = (Y) => !!X.levelEvolution(Y) || ((t.EVOLUTIONS[Y.id] || []).some(R) && X.itemEvolutions(Y).some(R)),
    K = { q: "", types: new Set(), regions: new Set(), shiny: !1, evo: !1, desc: !1 },
    He = () => !!(K.q || K.types.size || K.regions.size || K.shiny || K.evo),
    m = () => t.STORY.REGIONS.filter((Y) => Y.dex),
    z = (Y) => {
      const ye = t.FORMS?.LIST.find((nt) => nt.id === Y)?.base ?? Y;
      return m().find((nt) => ye >= nt.dex[0] && ye <= nt.dex[1])?.key;
    },
    pe = (Y) => `<span class="type region-badge" style="background:${Y.color}">${H(e(Y.name))}</span>`;
  function V(Y) {
    const ye = X.DEX[Y.id],
      nt = Vs.fold(K.q);
    return !(
      (nt && !Vs.fold(ye.name).includes(nt) && String(Y.id) !== nt) ||
      (K.types.size && !ye.types.some((Ot) => K.types.has(Ot))) ||
      (K.regions.size && !K.regions.has(z(Y.id))) ||
      (K.shiny && !Y.shiny) ||
      (K.evo && !te(Y))
    );
  }
  const lt = {
    team: { pill: !0 },
    pen: { icon: "assets/items/mystery-egg.png" },
    ug: { icon: "assets/ui/explorer-kit.png" },
    trade: { icon: "assets/ui/link-cable.svg" },
  };
  function kt(Y) {
    const ye = new Map(),
      nt = (Ot, ee) => {
        Ot && !ye.has(Ot.uid) && ye.set(Ot.uid, { m: Ot, ...ee });
      };
    if (Y.includes("team")) for (const Ot of X.S.team) nt(X.getMon(Ot), { out: "team" });
    if (Y.includes("pen")) for (const Ot of X.pension().mons) nt(Ot.mon, { out: "pen" });
    if (Y.includes("ug"))
      for (const Ot of X.S.under?.slots || [])
        for (const ee of Ot.mons || []) nt(ee, { out: "ug", ug: Ot.id });
    if (Y.includes("trade")) for (const Ot of X.tradingMons()) nt(Ot, { out: "trade" });
    return ye;
  }
  const ra = (Y, ye) =>
      Y === "ug" ? jt(ye) : e(Y === "pen" ? "À la Pension" : Y === "team" ? "Dans ton équipe" : "En échange"),
    Vt = (Y) =>
      lt[Y.out].pill
        ? `<span class="pc-ug pc-busy-team" aria-hidden="true">${e("É")}</span>`
        : `<img class="pc-ug" src="${lt[Y.out].icon}" alt="">`;
  function Xt(Y = "adventure", ye = []) {
    const nt = kt(ye),
      Ot = [...X.pcMons(), ...[...nt.values()].map((Gt) => Gt.m)],
      ee = Ot.filter(V),
      rt = a("#pc-sort").value,
      Qe = (Gt) => ["hp", "atk", "def", "spa", "spd", "spe"].reduce((N, W) => N + X.DEX[Gt].stats[W], 0),
      Ft = new Map((X.S.pcOrder || []).map((Gt, N) => [Gt, N])),
      Ye = (Gt) => X.DEX[Gt].num ?? Gt,
      bt = (Gt, N) => N.level - Gt.level || X.rankOf(N) - X.rankOf(Gt),
      Yt = {
        recent: (Gt, N) => N.caughtAt - Gt.caughtAt,
        dex: (Gt, N) => Ye(Gt.id) - Ye(N.id) || Gt.id - N.id || bt(Gt, N),
        name: (Gt, N) => X.DEX[Gt.id].name.localeCompare(X.DEX[N.id].name, t.I18n.lang) || bt(Gt, N),
        level: (Gt, N) => bt(Gt, N) || Ye(Gt.id) - Ye(N.id) || Gt.id - N.id,
        rank: (Gt, N) => X.rankOf(N) - X.rankOf(Gt) || bt(Gt, N) || Ye(Gt.id) - Ye(N.id) || Gt.id - N.id,
        rarity: (Gt, N) => X.tierIndex(N.id) - X.tierIndex(Gt.id) || Ye(Gt.id) - Ye(N.id) || Gt.id - N.id,
        stats: (Gt, N) => Qe(N.id) - Qe(Gt.id) || bt(Gt, N) || Ye(Gt.id) - Ye(N.id),
        custom: (Gt, N) => (Ft.get(Gt.uid) ?? -1) - (Ft.get(N.uid) ?? -1) || N.caughtAt - Gt.caughtAt,
      }[rt];
    (ee.sort(Yt), K.desc && rt !== "custom" && ee.reverse());
    const wa = t.STORY.REGIONS.map((Gt) => Gt.key),
      pa = new Map(ee.map((Gt) => [Gt, X.can(Gt, Y) ? 1 + wa.indexOf(X.regOf(Gt)) : 0]));
    return (Y && ee.sort((Gt, N) => pa.get(Gt) - pa.get(N)), { list: ee, total: Ot.length, busy: nt });
  }
  function Ht(Y) {
    const ye = a(".pc-sticky"),
      nt = ye.nextElementSibling,
      Ot = le.matches ? a(".side-nav") : null,
      ee = ye.getBoundingClientRect(),
      rt = scrollY > 0 && Math.abs(ee.top - parseFloat(getComputedStyle(ye).top)) < 1;
    ((nt.style.minHeight =
      Math.max(120, (Ot ? Ot.getBoundingClientRect().top : innerHeight) - ee.bottom - 8) + "px"),
      Y(),
      rt && scrollBy(0, nt.getBoundingClientRect().top - ye.getBoundingClientRect().bottom));
  }
  let ct = () => {};
  function wt() {
    ct = t.UI.filterMore(a("#screen-team .pc-filters"));
    const Y = () => {
      Ht(() => {
        (Q(!0), t.Screens.pension?.filtered());
      });
    };
    a("#pc-type-pop").innerHTML = Object.keys(t.TYPES)
      .map((ye) => `<button data-v="${ye}">${f(ye)}</button>`)
      .join("");
    for (const [ye, nt, Ot] of [
      ["type", K.types, String],
      ["region", K.regions, String],
    ]) {
      const ee = a(`#pc-${ye}-pop`);
      ((a(`#pc-${ye}-btn`).onclick = (rt) => {
        rt.stopPropagation();
        const Qe = ee.hidden;
        (document.querySelectorAll(".type-pop").forEach((Ft) => {
          Ft.hidden = !0;
        }),
          (ee.hidden = !Qe));
      }),
        (ee.onclick = (rt) => {
          rt.stopPropagation();
          const Qe = rt.target.closest("[data-v]");
          if (!Qe) return;
          const Ft = Ot(Qe.dataset.v);
          (nt.has(Ft) ? nt.delete(Ft) : nt.add(Ft), Y());
        }));
    }
    (document.addEventListener("click", () =>
      document.querySelectorAll(".type-pop").forEach((ye) => {
        ye.hidden = !0;
      }),
    ),
      (a("#pc-search").oninput = (ye) => {
        ((K.q = ye.target.value), Y());
      }));
    for (const ye of ["shiny", "evo"])
      a("#pc-" + ye).onclick = () => {
        ((K[ye] = !K[ye]), Y());
      };
    ((a("#pc-evo-all").onclick = Fe),
      (a("#pc-dir").onclick = (ye) => {
        ((K.desc = !K.desc), (ye.currentTarget.textContent = K.desc ? "↑" : "↓"), Y());
      }),
      (a("#pc-active").onclick = (ye) => {
        const nt = ye.target.closest("[data-clear]");
        if (!nt) return;
        const [Ot, ee] = nt.dataset.clear.split(":");
        (Ot === "type"
          ? K.types.delete(ee)
          : Ot === "region"
            ? K.regions.delete(ee)
            : Ot === "all"
              ? (Object.assign(K, { q: "", shiny: !1, evo: !1 }), K.types.clear(), K.regions.clear())
              : (K[Ot] = Ot === "q" ? "" : !1),
          Y());
      }));
  }
  const ge = () => X.sideMons().filter((Y) => X.levelEvolution(Y));
  async function Fe() {
    const Y = ge();
    if (
      !Y.length ||
      !(await $(
        Y.length > 1 ? e("Faire évoluer {n} Pokémon ?", { n: Y.length }) : e("Faire évoluer 1 Pokémon ?"),
        e("Évoluer"),
        "gold",
      ))
    )
      return;
    const ye = [];
    let nt = 0;
    for (const Qe of ge()) {
      const Ft = Qe.id;
      let Ye,
        bt = !1;
      for (; (Ye = X.levelEvolution(Qe));) {
        bt ||= !X.S.dex[Ye.to];
        const Yt = X.evolveMon(Qe.uid, Ye.to);
        if (!Yt) break;
        nt += Yt.shell ? 1 : 0;
      }
      Qe.id !== Ft && ye.push({ from: Ft, to: Qe.id, shiny: Qe.shiny, isNew: bt });
    }
    (X.save(), t.Sfx?.upgrade?.(2), t.App.refresh(), gt());
    const Ot = (
        Qe,
        Ft,
      ) => `<div class="oc-tile evo-recap${Qe.isNew ? " is-new" : ""}" style="animation-delay:${Ft * 60}ms">${Qe.isNew ? '<span class="new">NEW</span>' : ""}
      ${ue(Qe.to, Qe.shiny, 1.25, 56)}<span class="evo-from" title="${H(X.DEX[Qe.from].name)}">${ue(Qe.from, Qe.shiny, 0.6, 26)}</span></div>`,
      ee = ye.filter((Qe) => Qe.isNew).length,
      rt = `<div class="dc-head"><h2>${e("Évolutions")}</h2><div class="dc-sum"><button class="dc-x" aria-label="${e("Fermer")}">✕</button></div></div>
      <div class="oc-sec"><h4>${ye.length > 1 ? e("{n} Pokémon ont évolué", { n: ye.length }) : e("1 Pokémon a évolué")}<em>${ee ? e("<b>{n}</b> nouveaux au Pokédex", { n: ee }) : ""}</em></h4>
        <div class="oc-grid">${ye.map(Ot).join("")}</div></div>`;
    (x({
      className: "dexcard-modal oc-modal",
      body: rt,
      actions: [{ label: e("Super !"), cls: "gold" }],
      onOpen: (Qe, Ft) => {
        a(".dc-x", Qe).onclick = () => Ft(null);
      },
    }),
      nt &&
        B(
          e("+{n} {item}", { n: nt, item: H(t.UI.itemName("shed-shell")) }),
          t.UI.itemSrc("shed-shell"),
          "reward",
        ));
  }
  function gt() {
    const Y = ge().length,
      ye = a("#pc-evo-all");
    ((ye.hidden = !Y),
      t.UI.morph(
        ye,
        `▲ <span class="full">${e("Tout faire évoluer ({n})", { n: Y })}</span><span class="short">${Y}</span>`,
      ),
      (ye.title = e("Fait évoluer d'un coup les Pokémon prêts à évoluer par niveau")),
      a("#pc-search").value !== K.q && (a("#pc-search").value = K.q));
    for (const Qe of ["shiny", "evo"]) a("#pc-" + Qe).classList.toggle("on", K[Qe]);
    const nt = new Set(X.pcMons().map((Qe) => z(Qe.id)));
    (t.UI.morph(
      a("#pc-region-pop"),
      m()
        .filter((Qe) => nt.has(Qe.key) || K.regions.has(Qe.key))
        .map((Qe) => `<button data-v="${Qe.key}">${pe(Qe)}</button>`)
        .join(""),
    ),
      (a("#pc-region-dd").hidden = nt.size < 2 && !K.regions.size));
    for (const [Qe, Ft, Ye] of [
      ["type", K.types, e("Types")],
      ["region", K.regions, e("Régions")],
    ]) {
      (a(`#pc-${Qe}-btn`).classList.toggle("on", Ft.size > 0),
        (a(`#pc-${Qe}-btn`).firstChild.textContent = Ft.size ? `${Ye} (${Ft.size}) ` : Ye + " "));
      for (const bt of a(`#pc-${Qe}-pop`).children) bt.classList.toggle("on", Ft.has(bt.dataset.v));
    }
    const Ot = "<i>✕</i>",
      ee = [],
      rt = le.matches;
    K.q.trim() && !rt && ee.push(`<button class="pill" data-clear="q">« ${H(K.q.trim())} »${Ot}</button>`);
    for (const Qe of K.types)
      ee.push(`<button class="pill type-pill" data-clear="type:${Qe}">${f(Qe)}${Ot}</button>`);
    for (const Qe of m().filter((Ft) => K.regions.has(Ft.key)))
      ee.push(`<button class="pill type-pill" data-clear="region:${Qe.key}">${pe(Qe)}${Ot}</button>`);
    (K.shiny &&
      !rt &&
      ee.push(
        `<button class="pill" data-clear="shiny"><i class="shiny-ico"></i> ${e("Chromatiques")}${Ot}</button>`,
      ),
      K.evo && ee.push(`<button class="pill" data-clear="evo">${e("Peut évoluer")}${Ot}</button>`),
      ee.length > 1 && ee.push(`<button class="pill clear" data-clear="all">${e("Tout effacer")}</button>`),
      ct(K.types.size + K.regions.size + K.evo),
      t.UI.morph(a("#pc-active"), ee.join("")),
      (a("#pc-active").hidden = !ee.length));
  }
  function Dt() {
    const Y = new Map();
    for (const ye of a("#pc-grid").querySelectorAll(".pc-cell"))
      Y.set(ye.dataset.uid, ye.getBoundingClientRect());
    return Y;
  }
  function ha(Y) {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let ye = 0;
    for (const nt of a("#pc-grid").querySelectorAll(".pc-cell")) {
      const Ot = Y.get(nt.dataset.uid),
        ee = nt.getBoundingClientRect();
      if (!(ee.bottom < 0 || ee.top > innerHeight))
        if (Ot) {
          const rt = Ot.left - ee.left,
            Qe = Ot.top - ee.top;
          (rt || Qe) &&
            nt.animate([{ transform: `translate(${rt}px,${Qe}px)` }, { transform: "none" }], {
              duration: 320,
              easing: "cubic-bezier(.2,.8,.2,1)",
            });
        } else
          nt.animate(
            [
              { opacity: 0, transform: "scale(.6)" },
              { opacity: 1, transform: "none" },
            ],
            {
              duration: 260,
              delay: Math.min(ye++ * 18, 240),
              easing: "cubic-bezier(.3,1.4,.5,1)",
              fill: "backwards",
            },
          );
    }
  }
  let _t = [],
    Ea = null;
  const ut = (Y) => {
    const ye = Math.max(1, Math.ceil(Y / 6e4));
    return ye >= 60
      ? e("{h} h {m}", { h: Math.floor(ye / 60), m: String(ye % 60).padStart(2, "0") })
      : e("{n} min", { n: ye });
  };
  function jt(Y) {
    const ye = (X.S.under?.slots || []).find((nt) => String(nt.id) === String(Y));
    return !ye || t.Underground.progress(ye).done
      ? e("Au Souterrain · à récupérer")
      : e("Au Souterrain · retour dans {t}", { t: ut(ye.end - X.time()) });
  }
  const xt = (Y, ye) => {
      const nt = Y.m;
      return `<div class="pc-cell away ug-out" data-out="${Y.out}"${Y.ug != null ? ` data-ug="${Y.ug}"` : ""} data-uid="${nt.uid}" title="${H(X.DEX[nt.id].name)} ${e("Nv. {n}", { n: nt.level })} · ${H(ra(Y.out, Y.ug))}">
        ${ye ? ue(nt.id, nt.shiny, t.UI.tileScale(nt.id, 28, 42), 46) : ue(nt.id, nt.shiny, 2, 76)}${t.UI.rankTag(nt)}${Vt(Y)}
        <span class="lvl">${nt.shiny ? t.UI.shinyIc() : ""}${e("Nv. {n}", { n: nt.level })}</span></div>`;
    },
    D = (Y) => (Y?.dataset.out ? (B(ra(Y.dataset.out, Y.dataset.ug)), !0) : !1);
  function Q(Y = !1) {
    const ye = Y ? Dt() : null,
      { list: nt, total: Ot, busy: ee } = Xt("adventure", ["pen", "ug", "trade"]);
    (gt(), (_t = nt.map((Gt) => Gt.uid)));
    const rt = nt.map((Gt) => (ee.has(Gt.uid) ? null : X.can(Gt))),
      Qe = new Map();
    nt.forEach((Gt, N) => {
      rt[N] && Qe.set(X.regOf(Gt), (Qe.get(X.regOf(Gt)) || 0) + 1);
    });
    const Ft = new Map(),
      Ye = (Gt) => {
        const N = X.regOf(Gt);
        return (Ft.has(N) || Ft.set(N, X.capFor(Gt)), Gt.level >= Ft.get(N));
      },
      bt = le.matches,
      Yt = [];
    let wa = null;
    nt.forEach((Gt, N) => {
      const W = rt[N];
      (W && X.regOf(Gt) !== wa && Yt.push({ sep: (wa = X.regOf(Gt)), why: W }),
        Yt.push({ m: Gt, why: W, busy: ee.get(Gt.uid) }));
    });
    const pa = ({ m: Gt, why: N, sep: W, busy: ze }) => {
      if (ze) return xt(ze, bt);
      if (W) {
        const Lt = t.STORY.REGIONS.find((zt) => zt.key === W);
        return `<div class="pc-sep" title="${H(N)}"><span>${H(e(Lt?.name || ""))}</span><i></i><b>${Qe.get(W)}</b></div>`;
      }
      const qt = u(Gt);
      return `<div class="pc-cell${N ? " away" : ""}${qt ? " is-new" : ""}" data-uid="${Gt.uid}" title="${H(X.DEX[Gt.id].name)} ${e("Nv. {n}", { n: Gt.level })}${N ? ` · ${H(N)}` : ""}">
        ${bt ? ue(Gt.id, Gt.shiny, t.UI.tileScale(Gt.id, 28, 42), 46) : ue(Gt.id, Gt.shiny, 2, 76)}${t.UI.regionTag(Gt)}${t.UI.rankTag(Gt)}
        ${te(Gt) && !N ? `<i class="pc-evo" title="${e("Peut évoluer")}">▲</i>` : ""}${qt ? '<span class="new">NEW</span>' : ""}
        <span class="lvl">${Gt.shiny ? t.UI.shinyIc() : ""}${e("Nv. {n}", { n: Gt.level })}${X.S.buddy.uid === Gt.uid ? se() : ""}</span>
        <div class="pc-xp"><div style="width:${Ye(Gt) ? 100 : (Gt.xp / X.xpForNext(Gt.level, Gt)) * 100}%"></div></div></div>`;
    };
    (Ea.set(
      Yt,
      pa,
      Ot
        ? `<div class="pc-empty">${e("Aucun Pokémon ne correspond à ces filtres.")}</div>`
        : `<div class="pc-empty">${e("Le PC est vide. Les Pokémon capturés quand l'équipe est pleine arrivent ici.")}</div>`,
    ),
      t.UI.keepSprites(nt),
      ye && ha(ye));
  }
  t.Screens.team = {
    init() {
      ((X.S.pcVisit ??= Date.now()),
        t.UI.headTip(
          "#screen-team .map-head h2",
          e("Équipe"),
          e(
            "Jusqu'à 6 Pokémon partent à l'aventure, et seuls eux gagnent de l'XP en combat. Glisse un Pokémon du PC vers l'équipe (ou l'inverse) pour les échanger : en route, le changement se fait au prochain Centre Pokémon. Le PC garde tous les autres, sans limite.",
          ) +
            " " +
            e(
              "Les 5 cases de l'en-tête gardent tes équipes : touches-en une pour la charger, « + » en crée une vide. La case choisie suit tes changements.",
            ),
        ),
        $e(),
        document.body.appendChild(a("#team-mini")),
        t.addEventListener("scroll", mt, { passive: !0 }),
        t.addEventListener("resize", mt),
        wt());
      const Y = a("#pc-grid");
      ((Ea = t.VGrid(Y)),
        (Ea.onadd = (ye, nt) => {
          Te?.moved && Te.src === "pc" && (ye.style.transform = ie(Te, nt));
        }),
        Y.addEventListener("click", (ye) => {
          const nt = ye.target.closest(".pc-cell");
          D(nt) ||
            (nt && !ye.target.closest(".tip-host") && t.UI.monDetail(nt.dataset.uid, _t.filter(X.getMon)));
        }),
        Y.addEventListener("pointerdown", (ye) => {
          const nt = ye.target.closest(".pc-cell:not(.ug-out)");
          nt && et(ye, nt, "pc");
        }),
        Y.addEventListener("dragstart", (ye) => ye.preventDefault()),
        le.addEventListener("change", () => {
          Te || (it(), Q());
        }),
        (a("#pc-sort").value = X.S.pcSort || "recent"),
        (a("#pc-sort").onchange = () => {
          ((X.S.pcSort = a("#pc-sort").value), X.save(), Q(!0), t.Screens.pension?.filtered());
        }));
    },
    enter() {
      (a("#pc-grid").before(a(".pc-sticky")), (P = X.S.pcVisit || 0), qe(!0));
    },
    leave() {
      (qe(!1), (X.S.pcVisit = Date.now()), (P = 1 / 0), X.save());
      const Y = a("#team-mini");
      ((Y.style.transition = "none"), Y.classList.remove("show"), Y.offsetWidth, (Y.style.transition = ""));
    },
    render() {
      Te || (it(), Q());
    },
    sorted: Xt,
    filtering: He,
    newCount: ve,
    busyCell: xt,
    busyTap: D,
  };
})();
