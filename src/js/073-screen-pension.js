/**
 * screen pension
 *
 * Public API on the game namespace `t`: t.Screens.pension
 *
 * Recovered from the shipped bundle — original chunk #72 at byte 1954491 (27985 bytes, sha256:d4f60a0bb05a483c).
 * This file is one original source file; the build concatenates them in filename order.
 */
(function () {
  const {
      $: a,
      $$: b,
      h: f,
      esc: ue,
      fmt: H,
      sprBox: vt,
      monSrc: B,
      toast: se,
      confirm: Ge,
      buddyIcon: Je,
    } = t.UI,
    Ze = t.Game,
    x = t.CONFIG,
    $ = x.PENSION,
    X = "assets/items/mystery-egg.png",
    Tt = (Ye) => (Ye === 490 ? "assets/items/manaphy-egg.png" : X),
    le = '<img class="egg-mini" src="assets/items/mystery-egg.png" alt="">',
    P = (Ye, bt) => `${Math.floor((Ye / bt) * 100)} %`;
  let u = null,
    ve = null,
    it = !1;
  const De = matchMedia("(max-width: 640px)");
  De.addEventListener("change", () => {
    Ne() && !ve && (te(), Y());
  });
  let je = "res",
    pt = null;
  function re() {
    const Ye = a("#pen-scene");
    let bt = a("#pen-berries");
    (bt ||
      ((bt = f(
        `<div id="pen-berries" class="pension-berries" aria-label="${e("Baies de la Pension")}"></div>`,
      )),
      Ye.appendChild(bt)),
      (bt.innerHTML = Object.entries($.BERRIES)
        .map(
          ([Yt, wa]) =>
            `<div class="pension-berry-slot"><button class="bag-cell tr-row" data-berry="${Yt}" aria-label="${e("{name}, {n} en stock", { name: ue(e(wa.name)), n: Ze.itemCount(Yt) })}" ${ce(Yt) ? "disabled" : ""}><img src="${wa.src}" alt=""><span class="bag-qty">×${Ze.itemCount(Yt)}</span></button><div class="pension-berry-tip" role="tooltip"><b>${ue(e(wa.name))} · ${Ze.itemCount(Yt)}</b><p>${e("<strong>−{n} min</strong> avant le prochain œuf.", { n: wa.minutes })}</p><p>${e("Ou un petit goûter pour vos Pokémon !")}</p></div></div>`,
        )
        .join("")),
      (bt.oncontextmenu = (Yt) => Yt.preventDefault()),
      bt.querySelectorAll("button").forEach((Yt) => {
        ((Yt.onpointerdown = (wa) => {
          wa.button > 0 || (wa.preventDefault(), $e(Yt, Yt.dataset.berry));
        }),
          (Yt.onclick = (wa) => {
            wa.detail === 0 && mt(Yt.dataset.berry);
          }));
      }));
  }
  let We = null,
    oe = null;
  function $e(Ye, bt) {
    (Z(), mt(bt));
    let Yt = 380;
    const wa = () => {
      We = Wa(() => {
        if (ce(bt)) return Z();
        (mt(bt), (Yt = Math.max(70, Yt * 0.75)), wa());
      }, Yt);
    };
    (wa(), (oe = t.UI.holdEnd(Ye, Z)));
  }
  function Z() {
    (clearTimeout(We), (We = null), oe?.(), (oe = null));
  }
  let A = null,
    J = [],
    de = null;
  const _e = () => {
      const Ye = Ze.pension();
      return { egg: Ye.egg, uids: new Set(Ye.eggs.map((bt) => bt.uid)) };
    },
    Re = () => {
      const Ye = Ze.pension();
      return de ? { ...Ye, egg: de.egg, eggs: Ye.eggs.filter((bt) => de.uids.has(bt.uid)) } : Ye;
    };
  function dt(Ye) {
    const bt = J[Ye]?.after,
      Yt = Re().eggs.length;
    if (!bt) return;
    const wa = Ze.pension().mons.find((qt) => qt.mon.id === Ze.DITTO)?.mon.uid,
      pa = () => a(`#pen-res .pen-res[data-uid="${wa}"] .pen-gauge i`),
      Gt = parseFloat(pa()?.style.width) || 0;
    if (((de = bt), te(), V(), gt())) return;
    const N = pa(),
      W = parseFloat(N?.style.width) || 0,
      ze = Re().eggs.length > Yt;
    (N &&
      N.animate(
        W < Gt || ze
          ? [
              { width: Gt + "%" },
              { width: "100%", offset: 0.6 },
              { width: "0%", offset: 0.6 },
              { width: W + "%" },
            ]
          : [{ width: Gt + "%" }, { width: W + "%" }],
        { duration: 450, easing: "ease-out" },
      ),
      b("#pen-eggs .pen-egg[data-egg]")
        .slice(Yt)
        .forEach((qt) =>
          qt.animate(
            [
              { opacity: 0, transform: "scale(.5)" },
              { opacity: 1, transform: "none" },
            ],
            { duration: 320, easing: "cubic-bezier(.3,1.5,.5,1)" },
          ),
        ));
  }
  const qe = () =>
      Ze.pensionHasDitto() && Ze.pensionEggGoal() > 0 && Ze.pension().eggs.length < Ze.penOpen("eggs"),
    ce = (Ye) => (it && !(A?.open && qe())) || !Ze.pension().mons.length || Ze.itemCount(Ye) <= 0;
  function tt(Ye) {
    const bt = Ye[Ye.length - 1],
      Yt = Ye.reduce((pa, Gt) => pa + Gt.eggs.length, 0),
      wa = Math.round(Ye.reduce((pa, Gt) => pa + Gt.gained, 0) / 6e4);
    return Yt
      ? Yt > 1
        ? e("{n} nouveaux œufs !", { n: Yt })
        : e("Un nouvel œuf !")
      : wa && Ye.length > 1
        ? e("{n} baies : {m} min gagnées avant la ponte !", { n: Ye.length, m: wa })
        : wa
          ? e("{name} : {n} min gagnées avant la ponte !", { name: e($.BERRIES[bt.key].name), n: wa })
          : bt.ditto
            ? e("Un bon goûter ! La ponte est en pause.")
            : e("Tous ravis ! Ajoute un Métamorph pour accélérer la ponte.");
  }
  async function mt(Ye) {
    if (!ce(Ye)) {
      if (A) {
        const bt = Ze.usePensionBerry(Ye);
        if (!bt) return;
        (Ze.save(), J.push({ ...bt, after: _e() }), A.add($.BERRIES[Ye]), re());
        return;
      }
      ((it = !0), re());
      try {
        [...a("#pen-scene").querySelectorAll(".pen-walker:not(.gone)")].forEach((pa) => pa.pauseWander?.());
        const Yt = _e(),
          wa = Ze.usePensionBerry(Ye);
        if (!wa) return;
        (Ze.save(),
          (J = [{ ...wa, after: _e() }]),
          (de = Yt),
          (A = t.PensionBerryFX(a("#pen-scene"), [
            ...a("#pen-scene").querySelectorAll(".pen-walker:not(.gone)"),
          ])),
          A.add($.BERRIES[Ye]),
          re(),
          (A.onclose = re),
          (A.oneaten = dt),
          await A.finished,
          se(tt(J)));
      } catch (bt) {
        (console.error(bt), se(e("Le goûter a été servi.")));
      } finally {
        ((it = !1),
          (A = null),
          (J = []),
          (de = null),
          a("#pen-scene")
            .querySelectorAll(".pen-walker:not(.gone)")
            .forEach((bt) => bt.resumeWander?.()),
          re(),
          te(),
          V(),
          t.App.refreshHeader());
      }
    }
  }
  const Te = "#pen-res .pen-res[data-uid], #pen-grid .pc-cell[data-uid]";
  function At(Ye) {
    const bt = new Map(),
      Yt = (wa) => {
        bt.has(wa.dataset.uid) || bt.set(wa.dataset.uid, wa.getBoundingClientRect());
      };
    return (Ye && Yt(Ye), document.querySelectorAll(Te).forEach(Yt), bt);
  }
  function yt(Ye, bt) {
    if ((bt(), matchMedia("(prefers-reduced-motion: reduce)").matches)) return;
    const Yt = (wa) => wa.bottom < 0 || wa.top > innerHeight;
    document.querySelectorAll(Te).forEach((wa) => {
      const pa = Ye.get(wa.dataset.uid),
        Gt = wa.getBoundingClientRect();
      if (Yt(Gt) && (!pa || Yt(pa))) return;
      if (!pa) {
        wa.animate(
          [
            { opacity: 0, transform: "scale(.5)" },
            { opacity: 1, transform: "none" },
          ],
          { duration: 320, easing: "cubic-bezier(.3,1.5,.5,1)" },
        );
        return;
      }
      const N = pa.left - Gt.left,
        W = pa.top - Gt.top,
        ze = pa.width / Gt.width,
        qt = pa.height / Gt.height;
      (Math.abs(N) < 1 && Math.abs(W) < 1) ||
        ((wa.style.zIndex = 5),
        (wa.animate(
          [
            { transform: `translate(${N}px,${W}px) scale(${ze},${qt})`, offset: 0 },
            { transform: `translate(${N * 0.5}px,${W * 0.5}px) scale(1.08)`, offset: 0.5 },
            { transform: "none", offset: 1 },
          ],
          { duration: 420, easing: "cubic-bezier(.25,.8,.25,1)" },
        ).onfinish = () => {
          wa.style.zIndex = "";
        }));
    });
  }
  const he = (Ye, bt, Yt) => bt >= Ye.left && bt <= Ye.right && Yt >= Ye.top && Yt <= Ye.bottom,
    fe = (Ye, bt, Yt) => {
      let wa = -1,
        pa = 1 / 0;
      return (
        Ye.forEach((Gt, N) => {
          const W = Math.hypot(Gt.left + Gt.width / 2 - bt, Gt.top + Gt.height / 2 - Yt);
          W < pa && ((pa = W), (wa = N));
        }),
        wa
      );
    };
  function Oe(Ye, bt) {
    (Ye.addEventListener("dragstart", (Yt) => Yt.preventDefault()),
      Ye.addEventListener("pointerdown", (Yt) => Ee(Yt, Ye, bt)));
  }
  function Ee(Ye, bt, Yt) {
    Ye.button > 0 ||
      ve ||
      it ||
      De.matches ||
      ((ve = {
        el: bt,
        src: Yt,
        uid: bt.dataset.uid,
        x0: Ye.clientX,
        y0: Ye.clientY,
        sx: scrollX,
        sy: scrollY,
        id: Ye.pointerId,
        moved: !1,
      }),
      t.UI.touchHold.start(Ye, bt, ve),
      addEventListener("scroll", _, { passive: !0 }));
  }
  function et(Ye) {
    if (!ve || Ye.pointerId !== ve.id) return;
    const { el: bt, src: Yt } = ve;
    ve.last = { clientX: Ye.clientX, clientY: Ye.clientY, pointerId: Ye.pointerId };
    const wa = !1,
      pa = wa ? 0 : scrollX - ve.sx,
      Gt = wa ? 0 : scrollY - ve.sy,
      N = Ye.clientX - ve.x0 + pa,
      W = Ye.clientY - ve.y0 + Gt;
    if (t.UI.touchHold.waiting(ve, N, W)) {
      ve.cancelled && (t.UI.touchHold.end(ve, bt), (ve = null), removeEventListener("scroll", _));
      return;
    }
    if (!ve.moved) {
      if (Math.hypot(N, W) < 6) return;
      ((ve.moved = !0),
        (ve.list = a("#pen-res")),
        (ve.grid = a("#pen-grid")),
        (ve.slots = [...ve.list.children]),
        (ve.slotRects = ve.slots.map((zt) => zt.getBoundingClientRect())),
        (ve.rows = ve.slots.filter((zt) => zt.dataset.uid)),
        (ve.rects = ve.rows.map((zt) => zt.getBoundingClientRect())),
        (ve.from = ve.rows.indexOf(bt)),
        Yt === "pc" && Q.pin(D.indexOf(ve.uid)),
        bt.classList.add("dragging"),
        document.body.classList.add("mon-sorting"));
    }
    ((bt.style.transform = `translate(${N}px,${W}px) scale(1.05)`),
      (pa || Gt) && (ve.slotRects = ve.slots.map((zt) => zt.getBoundingClientRect())));
    const ze = he(ve.list.getBoundingClientRect(), Ye.clientX, Ye.clientY)
      ? "pen"
      : he(ve.grid.getBoundingClientRect(), Ye.clientX, Ye.clientY)
        ? "pc"
        : null;
    let qt = "none",
      Lt = ve.from;
    if (ze === "pen" && Yt === "pen") {
      const zt = ve.rects[ve.from];
      ((Lt = fe(ve.rects, zt.left + zt.width / 2 + N, zt.top + zt.height / 2 + W)), (qt = "self" + Lt));
    } else
      ze === "pen"
        ? ((ve.slot = fe(ve.slotRects, Ye.clientX, Ye.clientY)),
          ve.slot > ve.rows.length && ve.rows.length < Ze.penOpen("slots") && (ve.slot = ve.rows.length),
          (qt = "slot" + ve.slot))
        : ze === "pc" && Yt === "pen" && (qt = "pc");
    ((ve.zone = ze),
      (ve.to = Lt),
      qt !== ve.key &&
        ((ve.key = qt),
        qt !== "none" && t.Sfx?.click?.(),
        ve.rows.forEach((zt, ca) => {
          if (zt === bt) return;
          const Ma = ve.from,
            Na =
              Yt === "pen" && ze === "pen"
                ? ca > Ma && ca <= Lt
                  ? ca - 1
                  : ca < Ma && ca >= Lt
                    ? ca + 1
                    : ca
                : ca;
          zt.style.transform =
            Na !== ca
              ? `translate(${ve.rects[Na].left - ve.rects[ca].left}px,${ve.rects[Na].top - ve.rects[ca].top}px)`
              : "";
        }),
        ve.slots.forEach((zt, ca) =>
          zt.classList.toggle("drop-over", ze === "pen" && Yt === "pc" && ca === ve.slot),
        ),
        ve.grid.classList.toggle("drop-over", ze === "pc" && Yt === "pen")));
  }
  const _ = () => {
    ve?.moved && ve.last && et(ve.last);
  };
  function we(Ye) {
    if (!ve || Ye.pointerId !== ve.id) return;
    const bt = ve,
      Yt = bt.el;
    if (((ve = null), t.UI.touchHold.end(bt, Yt), removeEventListener("scroll", _), !bt.moved)) return;
    (Yt.addEventListener("click", (pa) => pa.stopImmediatePropagation(), { capture: !0, once: !0 }),
      document.body.classList.remove("mon-sorting"),
      Yt.classList.remove("dragging"),
      bt.slots.forEach((pa) => pa.classList.remove("drop-over")),
      bt.grid.classList.remove("drop-over"));
    const wa = At(Yt);
    ([...bt.rows, Yt].forEach((pa) => {
      pa.style.transform = "";
    }),
      bt.src === "pc" && Q.pin(null),
      yt(wa, () => ie(bt, Ye.type === "pointerup")));
  }
  (document.addEventListener("pointermove", et),
    document.addEventListener("pointerup", we),
    document.addEventListener("pointercancel", we));
  function ie(Ye, bt) {
    if (bt && Ye.src === "pen" && Ye.zone === "pen") Ye.to !== Ye.from && Ze.reorderPension(Ye.uid, Ye.to);
    else if (bt && Ye.src === "pc" && Ye.zone === "pen") {
      const Yt = Ye.slots[Ye.slot]?.dataset.uid;
      U(
        "pc",
        Ye.uid,
        Ze.pension().mons.length >= Ze.penOpen("slots") && Yt ? { swap: Yt } : { at: Ye.slot },
        !1,
      );
      return;
    } else if (bt && Ye.src === "pen" && Ye.zone === "pc") {
      U("pen", Ye.uid, {}, !1);
      return;
    }
    t.App.refresh();
  }
  function U(Ye, bt, { at: Yt, swap: wa } = {}, pa = !0) {
    const Gt = () => {
      const N = Ye === "pen" ? Ze.fromPension(bt) : wa ? Ze.swapPension(bt, wa) : Ze.toPension(bt, Yt);
      if (N.error) (se(N.error), t.Sfx?.error?.());
      else {
        t.Sfx?.buy?.();
        const W = ue(Ze.DEX[N.mon.id].name);
        se(
          Ye === "pen"
            ? e("{name} est de retour au PC", { name: W })
            : N.out
              ? e("{name} remplace {out}", { name: W, out: ue(Ze.DEX[N.out.id].name) })
              : e("{name} entre en pension", { name: W }),
          B(N.mon.id, N.mon.shiny),
        );
      }
      t.App.refresh();
    };
    pa ? yt(At(), Gt) : Gt();
  }
  const Ne = () => a("#screen-pension").classList.contains("active"),
    T = (Ye) => {
      const bt = Math.max(1, Math.ceil(Ye / 6e4));
      return bt >= 60 ? `${Math.floor(bt / 60)} h ${String(bt % 60).padStart(2, "0")}` : `${bt} min`;
    },
    L = (Ye, bt) =>
      `<div class="pen-gauge"${bt ? ` style="--c:${bt}"` : ""}><i style="width:${Math.min(100, Ye)}%"></i></div>`;
  function R(Ye, bt) {
    const Yt = Ye.mon;
    if (Yt.id !== Ze.DITTO)
      return Ze.canLay(Yt)
        ? ""
        : `<div class="pen-row off">${le}${Ze.noEgg(Yt) ? e("Ne peut pas se reproduire") : e("Pas d'œuf ({tier})", { tier: e(Ze.tierOf(Yt.id).label).toLowerCase() })}</div>`;
    const wa = Re(),
      pa = Ze.pensionEggGoal(),
      Gt = Ze.pensionLayers().length;
    if (!pa) return `<div class="pen-row off">${le}${e("Ajoute un Pokémon")}</div>`;
    if (bt && (wa.egg || 0) >= pa) return `<div class="pen-row warn">${le}${e("Incubateur plein")}</div>`;
    const N = wa.egg || 0;
    return `<div class="pen-row" title="${e("Un œuf toutes les {time} ({n} Pokémon) · prochain dans {next}", { time: T(pa), n: Gt, next: T(pa - N) })}">${le}${e("Œuf")}<span class="n">${P(N, pa)}</span></div>${L((N / pa) * 100, "var(--yellow)")}`;
  }
  function te() {
    const Ye = Re(),
      bt = Ye.eggs.length >= Ze.penOpen("eggs");
    a("#pen-res-n").textContent = `${Ye.mons.length}/${Ze.penOpen("slots")}`;
    const Yt = a("#pen-res"),
      wa = `<div class="pen-res empty"><b>${e("Emplacement libre")}</b><small>${e("Choisis un Pokémon dans le PC")}</small></div>`;
    t.UI.morph(
      Yt,
      Ye.mons
        .map((pa) => {
          const Gt = pa.mon,
            N = Ze.pensionCandyGoal(Gt);
          return `<button class="pen-res${pt ? " swap" : ""}" data-uid="${Gt.uid}" title="${pt ? e("Échanger avec {name}", { name: ue(Ze.DEX[Gt.id].name) }) : e("Récupérer {name}", { name: ue(Ze.DEX[Gt.id].name) })}">
        ${De.matches ? vt(Gt.id, Gt.shiny, t.UI.tileScale(Gt.id, 28, 42), 46) : vt(Gt.id, Gt.shiny, 2, 72)}${Gt.id === Ze.DITTO ? "" : t.UI.mapMark(Gt.reg, "lives", "pen-map")}${t.UI.rankTag(Gt)}
        <div class="meta"><b>${ue(Ze.DEX[Gt.id].name)}${Gt.shiny ? " " + t.UI.shinyIc() : ""} <small class="pen-lv">${e("Nv. {n}", { n: Gt.level })}</small></b>
          ${Gt.id === Ze.DITTO ? "" : `<div class="pen-row" title="${e("Prochain gain d'XP dans {time}", { time: T(N - pa.candy) })}">${t.UI.xpIcon()}${e("Famille")}${Gt.shiny ? ` <b class="pen-x">×${$.SHINY_CANDY_MULT}</b>` : ""}<span class="n">${P(pa.candy, N)}</span></div>${L((pa.candy / N) * 100)}`}
          ${R(pa, bt)}
        </div></button>`;
        })
        .join("") + wa.repeat(Math.max(0, Ze.penOpen("slots") - Ye.mons.length)),
    );
    for (const pa of Yt.querySelectorAll(".pen-res[data-uid]")) {
      const Gt = Ye.mons.find((N) => N.mon.uid === pa.dataset.uid)?.mon;
      Gt &&
        ((pa.onclick = async (N) => {
          if (!N.target.closest(".tip-host")) {
            if (pt) {
              N.stopPropagation();
              const W = pt;
              (He(null), U("pc", W, { swap: Gt.uid }));
              return;
            }
            (await Ge(
              e("Récupérer {name} ? Il retourne dans le PC et ses compteurs repartent à zéro.", {
                name: ue(Ze.DEX[Gt.id].name),
              }),
              e("Récupérer"),
              "",
            )) && U("pen", Gt.uid);
          }
        }),
        pa.penDrag || ((pa.penDrag = !0), Oe(pa, "pen")));
    }
    (Yt.querySelectorAll(".sprbox img").forEach((pa, Gt) => {
      pa.style.animationDelay || (pa.style.animationDelay = `${-(Date.now() % 2400) - Gt * 600}ms`);
    }),
      z(Yt, "slots", "pen-res"),
      K());
  }
  function K() {
    const Ye = Re(),
      bt = Ot(),
      Yt = a("#screen-pension .pen-top");
    ((Yt.dataset.tab = je),
      b("#pen-tabs [data-pen-tab]").forEach((wa) => wa.classList.toggle("on", wa.dataset.penTab === je)),
      (a('#pen-tabs [data-pen-tab="res"]').innerHTML =
        `${e("Pensionnaires")} <small>${Ye.mons.length}/${Ze.penOpen("slots")}</small>`),
      (a('#pen-tabs [data-pen-tab="egg"]').innerHTML =
        `${e("Incubateur")} <small>${Ye.eggs.length}/${Ze.penOpen("eggs")}</small>${bt ? `<span class="new">${bt}</span>` : ""}`),
      (a("#pen-hint").innerHTML =
        je !== "res"
          ? ""
          : pt
            ? e("Pension pleine : <b>touche le pensionnaire</b> qui lui laisse sa place")
            : Ye.mons.length < Ze.penOpen("slots")
              ? e("Touche un Pokémon du PC pour le mettre en pension")
              : e("Touche un pensionnaire pour le récupérer")));
  }
  function He(Ye) {
    ((pt = Ye),
      b("#pen-grid .pc-cell").forEach((bt) => bt.classList.toggle("picked", bt.dataset.uid === Ye)),
      b("#pen-res .pen-res[data-uid]").forEach((bt) => bt.classList.toggle("swap", !!Ye)),
      Ye && je !== "res" && (je = "res"),
      K());
  }
  const m = `<span class="pen-ditto"><img src="${B(Ze.DITTO)}" alt=""></span>`;
  function z(Ye, bt, Yt) {
    const wa = bt === "slots" ? $.SLOTS : $.INCUBATOR,
      pa = Ze.penOffer(bt);
    for (let Gt = Ze.penOpen(bt); Gt < wa; Gt++) {
      const N = Gt === Ze.penOpen(bt) && pa;
      if (N && pa.ok) {
        const ze = f(
            `<div class="${Yt} empty buy"><b>${e("Emplacement {n}", { n: Gt + 1 })}</b><button class="btn small gold">${e("Débloquer · {price} ₽", { price: H(pa.price) })}</button></div>`,
          ),
          qt = a("button", ze);
        ((qt.disabled = Ze.S.money < pa.price),
          (qt.onclick = () => {
            const Lt = Ze.buyPenSlot(bt);
            if (Lt.error) {
              (t.Sfx.error(), se(Lt.error));
              return;
            }
            (t.Sfx.buy(), se(e("Nouvel emplacement débloqué !")), t.App.refresh());
          }),
          Ye.appendChild(ze));
        continue;
      }
      const W =
        N && pa.done
          ? e("Fin de {region}", {
              region: ue(e(t.STORY.REGIONS.find((ze) => ze.key === pa.done)?.name || pa.done)),
            })
          : e("Débloque le précédent");
      Ye.appendChild(
        f(
          `<div class="${Yt} empty locked"><b>${t.UI.lockIc}${e("Emplacement {n}", { n: Gt + 1 })}</b><small>${W}</small></div>`,
        ),
      );
    }
  }
  function pe(Ye, bt) {
    const Yt = Ze.eggReady(Ye, bt),
      wa = Yt ? (t.FORMS?.hatchForm(Ye.id) ?? Ye.id) : Ye.id,
      pa = (t.FORMS?.formsOf(Ye.id) ?? [Ye.id]).map((ze) => Ze.dexState(ze)),
      Gt = pa.some((ze) => ze === "caught" || ze === "lost"),
      N = !Gt && pa.includes("seen"),
      W = ((bt - Ye.laidAt) / (Ye.hatchAt - Ye.laidAt)) * 100;
    return `<button class="pen-egg ${Yt ? "ready" : ""}" data-egg="${Ye.uid}" ${Yt ? "" : "disabled"}>
      <span class="egg-ic"><img src="${Tt(Ye.id)}" alt=""></span>
      <span class="egg-mini ${Gt ? "" : N ? "seen" : "unknown"}" aria-hidden="true">${vt(wa, !1, t.UI.tileScale(Ye.id, 14, 20), 26)}</span>
      <span class="meta"><b>${e(Yt ? "Prêt à éclore !" : "Œuf")}</b>
        <small>${Yt ? e("Touche pour le faire éclore") : e("Éclot dans {time}", { time: T(Ye.hatchAt - bt) })}</small>
        ${Yt ? "" : L(W, "var(--yellow)")}</span>
      <span class="egg-mon ${Gt ? "" : N ? "seen" : "unknown"}" title="${Gt || N ? ue(Ze.DEX[wa].name) : "???"}${Ye.reg && t.UI.awayReg(Ye.reg) ? ` · ${ue(t.UI.awayText(Ye.reg, "egg"))}` : ""}">${vt(wa, !1, 2, 56)}</span>${Ye.reg ? t.UI.mapIcon(Ye.reg, "egg-map") : ""}</button>`;
  }
  function V() {
    const Ye = Re(),
      bt = Ze.time();
    a("#pen-egg-n").textContent = `${Ye.eggs.length}/${Ze.penOpen("eggs")}`;
    const Yt = a("#pen-eggs");
    (t.UI.morph(
      Yt,
      Ye.eggs.map((wa) => pe(wa, bt)).join("") +
        (Ze.pensionHasDitto()
          ? `<div class="pen-egg empty">${e("Emplacement libre")}</div>`
          : `<div class="pen-egg empty locked pen-egg-unavailable"><span class="egg-outline" aria-hidden="true"><svg viewBox="0 0 40 48" fill="none"><path d="M20 3C12 3 4 22 4 31a16 14 0 0 0 32 0C36 22 28 3 20 3Z" /></svg></span><span class="meta"><b>${e("En attente d’un œuf")}</b><small>${e("Place un Métamorphe parmi les pensionnaires pour générer des œufs.")}</small></span></div>`
        ).repeat(Ze.penOpen("eggs") - Ye.eggs.length),
    ),
      Yt.querySelectorAll(".pen-egg.ready").forEach((wa) => (wa.onclick = () => lt(wa))),
      z(Yt, "eggs", "pen-egg"));
  }
  async function lt(Ye) {
    if (Ye.classList.contains("hatching")) return;
    Ye.classList.add("hatching");
    const bt = Ze.hatchEgg(Ye.dataset.egg);
    if (!bt) {
      t.App.refresh();
      return;
    }
    if (bt.error) {
      (Ye.classList.remove("hatching"), se(bt.error), t.Sfx?.error?.());
      return;
    }
    (t.App.refresh(), await Vt(bt));
    const Yt = t.UI.fedXp(bt.fed);
    bt.duplicate
      ? se(
          Yt
            ? e("{name} déjà possédé : +{n} XP pour sa famille", { name: ue(Ze.DEX[bt.id].name), n: H(Yt) })
            : e("{name} déjà possédé : sa famille est au niveau max", { name: ue(Ze.DEX[bt.id].name) }),
          B(bt.id),
        )
      : (await t.UI.showDexCard(bt.mon.id, {
          mon: bt.mon,
          isNew: bt.isNew,
          actions: [{ label: e("Super !"), cls: "gold" }],
        }),
        t.UI.awayReg(bt.mon.reg) && se(ue(t.UI.awayText(bt.mon.reg)), "assets/ui/town-map.png"));
  }
  const kt = [
      [
        [18, 10],
        [18, 11],
        [19, 12],
        [18, 13],
        [17, 14],
      ],
      [
        [17, 15],
        [18, 16],
        [19, 17],
        [20, 18],
        [16, 13],
        [15, 13],
        [14, 14],
      ],
      [
        [14, 15],
        [13, 16],
        [12, 17],
        [11, 17],
        [20, 19],
        [19, 20],
        [18, 21],
        [21, 17],
        [22, 16],
      ],
    ],
    ra = () =>
      `<svg class="hx-crack" viewBox="0 0 32 32" shape-rendering="crispEdges">${kt.map((Ye, bt) => Ye.map(([Yt, wa], pa) => `<rect class="c${bt + 1}" x="${Yt}" y="${wa}" width="1" height="1" style="--i:${pa}"/>`).join("")).join("")}</svg>`;
  async function Vt(Ye) {
    if (t.CHEAT?.noAnim || Ze.S.reducedAnim || matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const bt = Ye.duplicate ? Ye.id : Ye.mon.id,
      Yt = Tt(Ye.duplicate ? Ye.id : Ye.mon.id === 490 ? 490 : 0),
      wa = t.UI.fedXp(Ye.fed);
    await t.LinkFx.hatch({
      id: bt,
      shiny: !Ye.duplicate && Ye.mon.shiny,
      egg: `<img class="hx-shell" src="${Yt}" alt="">${ra()}`,
      eggSrc: Yt,
      duplicate: Ye.duplicate && {
        html: wa
          ? e("+{n} XP pour la famille de <b>{name}</b>", { n: H(wa), name: ue(Ze.DEX[bt].name) })
          : e("Famille de <b>{name}</b> au niveau max", { name: ue(Ze.DEX[bt].name) }),
      },
    });
  }
  const Xt = [
      "upbeat",
      "sleepy-time",
      "joyful",
      "rowdy",
      "zoned-out",
      "charismatic",
      "smiley",
      "excited",
      "teary",
    ],
    Ht = (Ye) => `assets/ui/marks/${Ye}.png`,
    ct = (Ye, bt, Yt = 1600) => (
      (Ye.querySelector(".emo").innerHTML = `<img src="${Ht(bt)}" alt="">`),
      Ye.classList.add("say"),
      clearTimeout(Ye.sayTimer),
      new Promise((wa) => {
        Ye.sayTimer = Wa(() => {
          (Ye.classList.remove("say"), wa());
        }, Yt);
      })
    ),
    wt = (Ye) =>
      [
        ...Ye.parentElement.querySelectorAll(
          ".pen-walker:not(.gone):not(.walk):not(.hop):not(.say):not(.chat)",
        ),
      ].filter(
        (bt) =>
          bt !== Ye &&
          Math.abs(parseFloat(bt.style.left) - parseFloat(Ye.style.left)) < 20 &&
          Math.abs(parseFloat(bt.style.top) - parseFloat(Ye.style.top)) < 14,
      )[0],
    ge = 2;
  let Fe = !1;
  const gt = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
  function Dt(Ye) {
    const bt = t.SPRITE_BOUNDS?.[B(Ye.id)] || [17, 10, 51, 50];
    return { x: ((bt[0] + bt[2]) / 2) * ge, y: bt[3] * ge };
  }
  function ha() {
    const Ye = a("#pen-scene"),
      bt = Ze.pension(),
      Yt = t.DAYTIME?.phase().key,
      wa = Yt === "night" ? "#5866a8" : Yt === "morning" ? "#e4edff" : null,
      pa = t.SCENES.css({ scene: 63 });
    ((Ye.style.backgroundImage = wa ? `linear-gradient(${wa}, ${wa}), ${pa}` : pa),
      (Ye.style.backgroundBlendMode = wa ? "multiply" : "normal"));
    const Gt = t.WEATHER?.parkNode();
    Ye.dataset.weather = t.WEATHER?.current(Gt) || "";
    const N = a("#pen-sky"),
      W = Gt ? t.UI.skyPill(Gt, { park: !0 }) : "";
    N.innerHTML !== W && (N.innerHTML = W);
    const ze = new Set(bt.mons.map((ca) => ca.mon.uid));
    (Ye.querySelectorAll(".pen-walker:not(.gone)").forEach((ca) => {
      ze.has(ca.dataset.uid) || ut(ca);
    }),
      bt.mons.forEach((ca, Ma) => {
        if (Ye.querySelector(`.pen-walker[data-uid="${ca.mon.uid}"]:not(.gone)`)) return;
        const Na = Dt(ca.mon),
          Va = f(`<div class="pen-walker" data-uid="${ca.mon.uid}" style="--fx:${Na.x}px;--fy:${Na.y}px">
        <i class="shadow"></i><span class="emo"></span><div class="body"><img src="${B(ca.mon.id, ca.mon.shiny)}" alt=""></div></div>`);
        Ye.appendChild(Va);
        const Ba = Fe ? 15 + Math.random() * 70 : 15 + Ma * 22,
          za = Fe ? 66 + Math.random() * 19 : 72 + (Ma % 2) * 10;
        jt(Va, Ba, za, Fe && !gt());
      }),
      (Fe = !0));
    const qt = a("#pen-tag"),
      Lt = bt.eggs.length >= Ze.penOpen("eggs"),
      zt = Ze.pensionHasDitto();
    ((qt.className = "pen-tag" + (zt && !Lt ? " ok" : "")),
      (qt.textContent = bt.mons.length
        ? e(
            zt
              ? Lt
                ? "Incubateur plein : la ponte est en pause"
                : "Métamorphe présent : les œufs sont possibles"
              : "Ajoute un Métamorphe pour obtenir des œufs",
          )
        : e("La pension est vide")));
  }
  function _t(Ye) {
    const bt = Ye.querySelector("img"),
      Yt = Ye.querySelector(".shadow");
    (bt.animate(
      [
        { translate: "0 -420px", scale: ".9 1.15", easing: "cubic-bezier(.5,0,1,.6)" },
        { translate: "0 0", scale: "1.3 .7", offset: 0.42, easing: "ease-out" },
        { translate: "0 -38px", scale: ".92 1.1", offset: 0.6, easing: "ease-in" },
        { translate: "0 0", scale: "1.15 .85", offset: 0.74, easing: "ease-out" },
        { translate: "0 -12px", scale: ".97 1.04", offset: 0.85, easing: "ease-in" },
        { translate: "0 0", scale: "1.06 .94", offset: 0.94 },
        { translate: "0 0", scale: "1 1" },
      ],
      { duration: 1300, fill: "backwards" },
    ),
      Yt.animate(
        [
          { scale: ".2", opacity: 0 },
          { scale: "1.3", opacity: 1, offset: 0.42 },
          { scale: ".8", offset: 0.6 },
          { scale: "1.1", offset: 0.74 },
          { scale: ".95", offset: 0.85 },
          { scale: "1", opacity: 1 },
        ],
        { duration: 1300, fill: "backwards" },
      ),
      Ea(Ye, 0.42 * 1300));
  }
  function Ea(Ye, bt = 0) {
    const Yt = f('<i class="pen-dust"><b></b><b></b><b></b><b></b></i>');
    (Yt.style.setProperty("--d", bt + "ms"), Ye.appendChild(Yt), Wa(() => Yt.remove(), bt + 700));
  }
  function ut(Ye) {
    if ((Ye.classList.add("gone"), gt())) {
      Ye.remove();
      return;
    }
    const bt = a("#pen-scene"),
      Yt = f('<div class="pen-poof"><b></b><b></b><b></b><b></b><b></b><b></b><b></b></div>');
    ((Yt.style.left = Ye.style.left),
      (Yt.style.top = Ye.style.top),
      (Yt.style.marginTop = `-${112 - parseFloat(Ye.style.getPropertyValue("--fy")) + 40}px`),
      bt.appendChild(Yt),
      Ye.querySelector(".body").animate(
        [{ scale: "1 1" }, { scale: "1.2 .8", offset: 0.3 }, { scale: "0 1.4", opacity: 0 }],
        { duration: 280, easing: "ease-in", fill: "forwards" },
      ),
      Ye.querySelector(".shadow").animate([{ opacity: 1 }, { opacity: 0 }], {
        duration: 280,
        fill: "forwards",
      }),
      Wa(() => {
        Ye.remove();
      }, 300),
      Wa(() => Yt.remove(), 900));
  }
  function jt(Ye, bt, Yt, wa) {
    const pa = new Set(),
      Gt = (qt, Lt) => {
        const zt = Wa(() => {
          (pa.delete(zt), qt());
        }, Lt);
        return (pa.add(zt), zt);
      },
      N = Ye.querySelector(".body"),
      W = () => {
        ((Ye.style.left = bt + "%"), (Ye.style.top = Yt + "%"), (Ye.style.zIndex = Math.round(Yt)));
      };
    (W(), wa && _t(Ye));
    const ze = () => {
      if (!Ye.isConnected || Ye.classList.contains("gone")) return;
      if (!Ne() || it || Ye.classList.contains("chat")) {
        Gt(ze, 1e3);
        return;
      }
      const qt = Math.random();
      if (qt < 0.55) {
        const Lt = 8 + Math.random() * 84,
          zt = 66 + Math.random() * 19,
          ca = Math.hypot((Lt - bt) * 6, (zt - Yt) * 4),
          Ma = Math.max(2, Math.round(ca / 40)),
          Na = 300;
        (N.classList.toggle("flip", Lt > bt),
          (Ye.style.transitionDuration = Ma * Na + "ms"),
          Ye.classList.add("walk"),
          (bt = Lt),
          (Yt = zt),
          W(),
          Gt(() => {
            (Ye.classList.remove("walk"), Gt(ze, 600 + Math.random() * 1500));
          }, Ma * Na));
      } else if (qt < 0.72)
        (Ye.classList.add("hop"),
          Gt(() => {
            (Ye.classList.remove("hop"), ze());
          }, 1300));
      else if (qt < 0.88) {
        const Lt = wt(Ye);
        if (Lt) {
          const zt = parseFloat(Ye.style.left) < parseFloat(Lt.style.left);
          (Ye.querySelector(".body").classList.toggle("flip", zt),
            Lt.querySelector(".body").classList.toggle("flip", !zt),
            Lt.classList.add("chat"),
            ct(Ye, "humble", 1200)
              .then(() => ct(Lt, "humble", 1200))
              .then(() => ct(Ye, "humble", 1e3))
              .then(() => {
                (Lt.classList.remove("chat"), Gt(ze, 400));
              }));
        } else ct(Ye, Xt[(Math.random() * Xt.length) | 0]).then(() => Gt(ze, 400));
      } else Gt(ze, 1500 + Math.random() * 2e3);
    };
    ((Ye.pauseWander = () => {
      (pa.forEach(clearTimeout), pa.clear(), clearTimeout(Ye.sayTimer));
      const qt = getComputedStyle(Ye),
        Lt = Ye.parentElement;
      ((bt = (parseFloat(qt.left) / Lt.clientWidth) * 100),
        (Yt = (parseFloat(qt.top) / Lt.clientHeight) * 100),
        (Ye.style.transitionDuration = "0ms"),
        Ye.classList.remove("walk", "hop", "chat", "say"),
        W());
    }),
      (Ye.resumeWander = () => {
        (pa.forEach(clearTimeout), pa.clear(), Gt(ze, 500));
      }),
      Gt(ze, (wa ? 1500 : 300) + Math.random() * 800));
  }
  let xt = !1,
    D = [],
    Q = null;
  function Y() {
    const Ye = (xt = Ze.pension().mons.length >= Ze.penOpen("slots")),
      { list: bt, busy: Yt } = t.Screens.team.sorted("pension", ["team", "ug", "trade"]),
      wa = a("#pen-grid"),
      pa = De.matches;
    (wa.classList.toggle("pen-full", Ye),
      (D = bt.map((Gt) => Gt.uid)),
      Q.set(
        bt.map((Gt) => ({ m: Gt })),
        ({ m: Gt }) => {
          if (Yt.has(Gt.uid)) return t.Screens.team.busyCell(Yt.get(Gt.uid), pa);
          const N =
            Gt.id !== Ze.DITTO && t.UI.awayReg(Gt.reg) ? ` · ${ue(t.UI.awayText(Gt.reg, "lives"))}` : "";
          return `<div class="pc-cell${pt === Gt.uid ? " picked" : ""}" data-uid="${Gt.uid}" title="${Ye ? e("La pension est pleine") : e("Mettre {name} en pension", { name: ue(Ze.DEX[Gt.id].name) })}${N}">
        ${pa ? vt(Gt.id, Gt.shiny, t.UI.tileScale(Gt.id, 28, 42), 46) : vt(Gt.id, Gt.shiny, 2, 76)}${N ? t.UI.mapIcon(Gt.reg, "pc-map") : ""}${t.UI.rankTag(Gt)}
        <span class="lvl">${Gt.shiny ? t.UI.shinyIc() : ""}${e("Nv. {n}", { n: Gt.level })}${Ze.S.buddy.uid === Gt.uid ? Je() : ""}</span></div>`;
        },
        `<div class="pc-empty">${t.Screens.team.filtering() ? e("Aucun Pokémon ne correspond à ces filtres.") : e("Le PC est vide. Seuls les Pokémon du PC peuvent aller en pension.")}</div>`,
      ),
      t.UI.keepSprites(bt));
  }
  function ye(Ye) {
    const bt = Ye.target.closest(".pc-cell");
    if (bt && !t.Screens.team.busyTap(bt)) {
      if (!xt) return U("pc", bt.dataset.uid);
      (Ye.stopPropagation(),
        He(pt === bt.dataset.uid ? null : bt.dataset.uid),
        pt && a("#pen-res").scrollIntoView({ block: "nearest", behavior: "smooth" }));
    }
  }
  function nt() {
    const Ye = Ze.pensionHasDitto();
    a("#pen-sum").innerHTML = `<span class="pen-ditto-status ${Ye ? "on" : ""}">
      ${m}<span>${e(Ye ? "Métamorphe présent : les œufs sont possibles ✓" : "Ponte inactive : Métamorphe requis en pension")}</span></span>`;
  }
  const Ot = () => Re().eggs.filter((Ye) => Ze.eggReady(Ye)).length;
  let ee = null,
    rt = 0;
  function Qe() {
    ee ||
      ((ee = f('<div class="pen-mini" id="pen-mini" aria-hidden="true"></div>')),
      document.body.appendChild(ee),
      ee.addEventListener("click", (pa) => {
        const Gt = pa.target.closest(".pen-mini .pen-list");
        if (!Gt) return;
        const N = [];
        for (let ze = pa.target; ze && ze !== Gt; ze = ze.parentElement)
          N.unshift([...ze.parentElement.children].indexOf(ze));
        let W = a("#" + Gt.dataset.src);
        for (const ze of N) W = W?.children[ze];
        W?.click();
      }));
    const Ye = Ne() ? ["#pen-res", "#pen-eggs"].map((pa) => a(pa)).filter((pa) => pa?.offsetParent) : [],
      bt = a("#topbar"),
      Yt = Math.max(0, bt ? bt.getBoundingClientRect().bottom : 0),
      wa = !!Ye.length && Ye.every((pa) => pa.getBoundingClientRect().bottom < Yt + 8);
    if (wa) {
      const pa = Ye.map((N) => `<div class="pen-list" data-src="${N.id}">${N.innerHTML}</div>`).join("");
      ee.dataset.v !== pa && ((ee.innerHTML = pa), (ee.dataset.v = pa));
      const Gt = a("#screen-pension").getBoundingClientRect();
      ((ee.style.left = Gt.left + "px"), (ee.style.width = Gt.width + "px"), (ee.style.top = Yt + "px"));
    }
    (ee.classList.toggle("show", wa),
      a("#screen-pension").style.setProperty("--mini-h", wa ? ee.offsetHeight + "px" : "0px"));
  }
  const Ft = () => {
    rt ||
      (rt = es(() => {
        ((rt = 0), Qe());
      }));
  };
  t.Screens.pension = {
    hatchFx: Vt,
    filtered() {
      Ne() && !ve && yt(At(), Y);
    },
    init() {
      const Ye = a("#pen-grid");
      ((Q = t.VGrid(Ye)),
        Ye.addEventListener("click", ye),
        Ye.addEventListener("pointerdown", (bt) => {
          const Yt = bt.target.closest(".pc-cell:not(.ug-out)");
          Yt && Ee(bt, Yt, "pc");
        }),
        Ye.addEventListener("dragstart", (bt) => bt.preventDefault()),
        t.UI.headTip(
          "#screen-pension .map-head h2",
          e("Pension"),
          e(
            "Dépose des Pokémon du PC : ils gagnent de l'XP pour leur famille, même quand tu ne joues pas (jusqu'à 8 h d'absence). Avec un Métamorphe en pension, les autres pondent des œufs, à faire éclore dans l'Incubateur.",
          ),
        ),
        a("#pen-res-n").insertAdjacentHTML(
          "beforebegin",
          t.UI.helpTip(
            e("Pensionnaires"),
            e(
              "Chaque pensionnaire donne de l'XP à sa famille : toutes les 2 min pour un commun, jusqu'à 30 min pour un légendaire, ×10 s'il est chromatique. Les pensionnaires d'une même famille s'additionnent, et l'XP est partagée entre tous les membres que tu possèdes (équipe, PC et pension). Avec un Métamorphe, plus ils sont nombreux, plus les œufs viennent vite : 6 h, 3 h, puis 1 h 30.",
            ),
          ),
        ),
        a("#pen-egg-n").insertAdjacentHTML(
          "beforebegin",
          t.UI.helpTip(
            e("Incubateur"),
            e(
              "Un œuf éclot en 4 h, même hors ligne : touche-le quand il est prêt. Il donne la première forme de la famille d'un pensionnaire, au Nv. 5, chromatique une fois sur 10 si son parent l'est. Incubateur plein : la ponte attend une place.",
            ),
          ),
        ),
        b("#pen-tabs [data-pen-tab]").forEach(
          (bt) =>
            (bt.onclick = () => {
              ((je = bt.dataset.penTab), je !== "res" && He(null), K());
            }),
        ),
        document.addEventListener("click", (bt) => {
          pt &&
            Ne() &&
            !bt.target.closest("#pen-res .pen-res[data-uid], #pen-grid .pc-cell, #pen-mini") &&
            He(null);
        }),
        addEventListener("scroll", Ft, { passive: !0 }),
        addEventListener("resize", Ft));
    },
    enter() {
      (a("#pen-grid").before(a(".pc-sticky")),
        clearInterval(u),
        (u = Ss(() => {
          if (!Ne()) {
            clearInterval(u);
            return;
          }
          !ve && !it && (te(), V(), re(), Ft());
        }, 5e3)));
    },
    leave() {
      (ee?.classList.remove("show"), a("#screen-pension").style.setProperty("--mini-h", "0px"));
    },
    render() {
      ve || it || (nt(), te(), V(), ha(), re(), Y(), Ft());
    },
    tick(Ye = []) {
      ve ||
        it ||
        (nt(), te(), V(), ha(), re(), Ft(), Ye.some((bt) => bt.fed?.some((Yt) => Yt.levels)) && Y());
    },
    readyCount: Ot,
    demoHatch: (Ye, bt = !1, Yt = !1) =>
      Vt(
        Yt
          ? {
              duplicate: !0,
              id: Ye,
              amount: $.DUPLICATE_CANDIES,
              fed: Ze.ownedMons()
                .filter((wa) => Ze.candyFamily(wa.id) === Ze.candyFamily(Ye))
                .map((wa, pa, Gt) => ({
                  amount: Math.round((Ze.candyXp(wa) * $.DUPLICATE_CANDIES) / Gt.length),
                })),
            }
          : { mon: { id: Ye, shiny: bt } },
      ),
  };
})();
