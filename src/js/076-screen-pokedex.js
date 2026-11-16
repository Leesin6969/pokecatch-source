/**
 * screen pokedex
 *
 * Public API on the game namespace `t`: t.Screens.pokedex
 *
 * Recovered from the shipped bundle — original chunk #75 at byte 1989035 (25060 bytes, sha256:447c66aab04e0284).
 * This file is one original source file; the build concatenates them in filename order.
 */
(function () {
  const { $: a, h: b, sprBox: f, esc: ue, dexNo: H, typeBadge: vt } = t.UI,
    B = t.Game,
    se = t.CONFIG,
    Ge = t.STORY,
    Je = t.Adventure;
  let Ze = !1;
  const x = matchMedia("(max-width: 640px)");
  x.addEventListener("change", () => {
    ((Ze = !1), a("#screen-pokedex.active") && L());
  });
  let $ = 1 / 0;
  const X = {},
    Tt = {},
    le = () => Ge.REGIONS.filter((K) => K.dex),
    P = () => le(),
    u = (K) => t.POKEDEX.filter((He) => He.id >= K.dex[0] && He.id <= K.dex[1]),
    ve = (K) => [
      ...(K === 201 ? t.UNOWN.ids.slice(1) : []),
      ...t.FORMS.LIST.filter((He) => He.base === K).map((He) => He.id),
    ],
    it = (K) => (t.UNOWN.isUnown(K) && K !== 201) || t.FORMS.isForm(K),
    De = (K) => u(K).flatMap((He) => [He, ...ve(He.id).map((m) => B.DEX[m])]),
    je = (K) => {
      const He = K.lockKey || K.key;
      return Ge.firstChapterOf(He) > 0 && !Ge.regionUnlocked(He, B.S.adv);
    },
    pt = (K, He) =>
      B.S.mons.filter((m) => m.id === K).sort((m, z) => (!!z.shiny === He) - (!!m.shiny === He))[0] || null,
    re = '<i class="shiny-ico"></i>',
    We = (K) => B.dexState(K, mt.shiny),
    oe = (K) => ["seen", "lost"].includes(We(K)),
    $e = (K) => We(K) === "caught",
    Z = (K) => (B.S.dex[K]?.firstAt || 0) > $,
    A = () => (t.CONFIG.DAILY_SPOTS || []).find((K) => K.honey);
  let J = null;
  const de = () =>
      J ||
      (J = new Set(
        A()
          ? Object.keys(A().pool)
              .map(Number)
              .flatMap((K) => [K, ...t.FORMS.LIST.filter((He) => He.base === K).map((He) => He.id)])
          : [],
      )),
    _e = (K, He) => {
      const m = t.HABITATS?.[Je.habitatKey(K)];
      return !m || Object.values(m).some((z) => z && typeof z == "object" && z[He] > 0);
    };
  let Re = null,
    dt = -1;
  function qe() {
    const K = Math.floor(B.time() / 36e5);
    return (
      (Re && dt === K) ||
        ((Re = {}),
        (dt = K),
        Ge.CHAPTERS.forEach((He, m) => {
          const z = He.steps.filter((pe) => pe.kind === "route" && (pe.areas?.length || pe.species?.length));
          z.forEach((pe, V) => {
            if (pe.wild !== 0)
              for (const lt of Je.zonePool({ ...pe, lv: Ge.routeBand(m, V, z.length) }, m, !0, null, !0))
                (de().has(lt.id) && !_e(pe, lt.id)) ||
                  (Re[lt.id] || (Re[lt.id] = [])).push({
                    ch: m,
                    route: pe.name,
                    pct: lt.pct,
                    min: lt.min,
                    max: lt.max,
                    when: lt.when || null,
                  });
          });
        })),
      Re
    );
  }
  function ce(K) {
    const He = new Map();
    for (const D of qe()[K] || []) {
      const Q = He.get(D.ch);
      Q
        ? (Q.routes.push(D.route),
          (Q.pct = Math.max(Q.pct, D.pct)),
          (Q.min = Math.min(Q.min, D.min)),
          (Q.max = Math.max(Q.max, D.max)),
          (Q.when = Q.when && D.when ? new Set([...Q.when, ...D.when]) : null))
        : He.set(D.ch, { ...D, routes: [D.route], when: D.when ? new Set(D.when) : null });
    }
    const m = (D) =>
        D.when
          ? [...D.when]
              .map((Q) => {
                const Y = t.DAYTIME.cond(Q);
                return `${Y.icon} ${ue(Y.name)}`;
              })
              .join(e(" ou ")) + " · "
          : "",
      z = Je.state?.unlocked ?? 0,
      pe = (D) => (D < 0.01 ? "<1" : Math.round(D * 100)),
      V = (D, Q) => (D === Q ? D : D + "–" + Q),
      lt = (D) => {
        const Q = D.ch > z,
          Y = D.routes.length === 1 ? e(D.routes[0]) : e("{n} zones", { n: D.routes.length });
        return `<li class="${Q ? "lk" : ""}" data-ch="${D.ch}" title="${ue(D.routes.map((ye) => e(ye)).join(", "))} · ${e("voir dans la Progression")}"><i class="bd">${t.Screens.adventure.chapterBadge(t.Screens.adventure.chapterMeta(D.ch), 2)}</i><b>${Q ? t.UI.lockIc : ""}${ue(e(Ge.CHAPTERS[D.ch].name))}</b><span>${ue(Y)}</span>
        <small>${m(D)}${e("Nv. {n}", { n: V(D.min, D.max) })} · ${D.routes.length > 1 ? e("jusqu'à {n} %", { n: pe(D.pct) }) : pe(D.pct) + " %"}</small></li>`;
      },
      kt = (D) => t.Screens.adventure.chapterBadge(t.Screens.adventure.chapterMeta(D), 2),
      Vt = [[Ge.TOWN_TRADES, Ge.REGIONS.map((D) => D.key)]]
        .flatMap(([D, Q]) => Object.entries(D || {}).map(([Y, ye]) => [Y, ye, Q]))
        .flatMap(([D, Q, Y]) =>
          Q.filter((ye) => ye[1] === K).map(([ye]) => {
            const nt = Ge.CHAPTERS.findIndex(
              (rt, Qe) =>
                Y.includes(Ge.regionOf(Qe)?.key) &&
                rt.steps.some((Ft) => Ft.kind === "heal" && Ft.name === D),
            );
            if (nt < 0) return null;
            const Ot = nt > z,
              ee = B.S.npcTrades?.includes(`${ye}>${K}`);
            return {
              ch: nt,
              kind: e("Échange"),
              html: `<li class="${Ot ? "lk" : ""}" data-ch="${nt}" title="${e("Échange avec un dresseur · voir dans la Progression")}"><i class="bd">${kt(nt)}</i><b>${Ot ? t.UI.lockIc : ""}<img class="dw-ic" src="${t.UI.itemSrc("link-cable")}" alt="">${e("Échange")} · ${ue(e(D))}</b><span>${e("contre ton {name}", { name: ue(B.DEX[ye].name) })}</span>
        <small>${e(ee ? "Déjà fait" : "Une fois")}</small></li>`,
            };
          }),
        )
        .filter(Boolean);
    for (const D of t.CONFIG.CASINOS) {
      const Q = D.prizes.find((nt) => nt.id === K);
      if (!Q) continue;
      const Y = Ge.CHAPTERS.findIndex((nt) =>
          nt.steps.some((Ot) => Ot.kind === "gym" && Ot.badge === D.after),
        ),
        ye = !(t.Screens.casino?.isOpen(D) ?? (B.S.adv?.badges || []).includes(D.after));
      Vt.push({
        ch: Y,
        kind: e("Casino"),
        html: `<li class="${ye ? "lk" : ""}" title="${ue(e(D.name))}"><i class="bd"><img class="dw-coin" src="${t.UI.itemSrc("coin")}" alt="${e("Jetons")}"></i><b>${ye ? t.UI.lockIc : ""}${ue(e(D.name))}</b><span>${ye ? e("Ouvre avec le Badge {badge}", { badge: ue(e(D.after)) }) : e("{n} jetons", { n: Q.price })}</span>
        <small>${e("Nv. {n}", { n: Q.level })}</small></li>`,
      });
    }
    if (de().has(K)) {
      const D = A(),
        Q = (Qe) =>
          Qe.kind === "route" &&
          D.zones.some((Ft) => Ft === Qe.name || Ft === Je.habitatKey(Qe)?.split("|")[0]),
        Y = Ge.CHAPTERS.findIndex((Qe) => Qe.reg === "sinnoh" && Qe.steps.some(Q)),
        ye = Y < 0 || Y > z,
        nt = String(Je.spotToday(D) || "").split("|")[0],
        Ot = t.FORMS.baseOf(K),
        ee = Ge.CHAPTERS.flatMap((Qe) => Qe.steps).find((Qe) => Q(Qe) && Qe.name === nt),
        rt = !ye && !!nt && !!ee && Je.capeOf(Ot, ee) !== K;
      Vt.push({
        ch: Math.max(0, Y),
        kind: e("Arbres à miel"),
        html: `<li class="${ye ? "lk" : rt ? "off" : ""}" title="${e("Une zone différente chaque jour")}"><i class="bd"><img src="${t.UI.itemSrc("honey")}" alt=""></i><b>${ye ? t.UI.lockIc : ""}${e("Arbres à miel de Sinnoh")}</b><span>${e("Une zone différente chaque jour")}</span>
        <small>${ye || !nt ? "" : rt ? e("Pas aujourd'hui") : e("Aujourd'hui : {zone}", { zone: ue(e(nt)) })}</small></li>`,
      });
    }
    const Xt = t.FORMS.LIST.find((D) => D.id === K && D.weather);
    if (Xt) {
      const D = Ge.firstChapterOf("hoenn"),
        Q = !B.pensionUnlocked() || D > z;
      Vt.push({
        ch: D,
        kind: e("Œuf"),
        html: `<li class="${Q ? "lk" : ""}" title="${e("Un œuf de {name} éclot dans la forme de la météo du parc", { name: ue(B.DEX[Xt.base].name) })}"><i class="bd"><img src="assets/items/mystery-egg.png" alt=""></i><b>${Q ? t.UI.lockIc : ""}${e("Œuf de {name}", { name: ue(B.DEX[Xt.base].name) })}</b><span>${e(
          "Éclot sous {weather}",
          {
            weather: Xt.weather
              .map((Y) => {
                const ye = t.DAYTIME.cond(Y);
                return `${ye.icon} ${ue(ye.name)}`;
              })
              .join(e(" ou ")),
          },
        )}</span>
        <small>${e("Pension")}</small></li>`,
      });
    }
    const Ht = (D) => {
        const Q = t.Underground?.plateOdds?.(D);
        if (!Q?.theme) return e("Souterrain");
        const Y = (ee) =>
            e("{n} %", {
              n: (ee * 100).toLocaleString(t.I18n?.lang || "fr", {
                maximumFractionDigits: ee * 100 < 10 ? 1 : 0,
              }),
            }),
          ye = Q.rows[0].theme * 100,
          nt = e("≈ {n} %", {
            n: (ye < 1 ? Math.round(ye * 10) / 10 : Math.round(ye)).toLocaleString(t.I18n?.lang || "fr"),
          }),
          Ot = Q.rows
            .map(
              (ee) =>
                `<tr><td>${e("Étages {a} → {b}", { a: ee.from, b: ee.to })}</td><td>${Y(ee.theme)}</td><td>${Y(ee.other)}</td></tr>`,
            )
            .join("");
        return `<span class="tip-host plate-tip" tabindex="0">${e("Souterrain")}<span class="dw-pct">${nt}</span><span class="bag-tip info-tip-box" role="tooltip"><b>${ue(e(se.UNDERGROUND.LOOT.PLATES[D]))}</b><table class="plate-odds"><tr><th>${e("Expédition")}</th><th>${ue(e(Q.theme.name))}</th><th>${e("Autres thèmes")}</th></tr>${Ot}</table><p>${e("Chances par expédition, murs et gardiens comptés. Une plaque déjà possédée ne tombe plus.")}</p></span></span>`;
      },
      ct = t.FORMS.plateOf(K);
    if (ct && (B.S.seen?.[493] || B.S.dex[493])) {
      const D = Ge.CHAPTERS.findIndex((Y) =>
          Y.steps.some((ye) => ye.kind === "gym" && ye.badge === se.UNDERGROUND.OPEN_BADGE),
        ),
        Q = !t.Underground?.unlocked();
      Vt.push({
        ch: D,
        kind: e("Plaque"),
        html: `<li class="${Q ? "lk" : ""}"><i class="bd"><img src="${t.UI.itemSrc("plate-" + ct)}" alt=""></i><b>${Q ? t.UI.lockIc : ""}${ue(e(se.UNDERGROUND.LOOT.PLATES[ct]))}</b><span>${e("À donner à un Arceus, depuis sa fiche")}</span>
        <small>${Ht(ct)}</small></li>`,
      });
    }
    const wt = (D, Q, Y, ye) =>
      `<b>${ye ? t.UI.lockIc : ""}<img class="dw-ic" src="${D}" alt="">${Q} · ${ue(e(Y))}</b>`;
    Ge.CHAPTERS.forEach((D, Q) =>
      D.steps.forEach((Y) => {
        const ye = Y.kind === "static" &&
            Y.id === K &&
            Y.caught && { have: Y.caught.filter((Ma) => B.S.dex[Ma]).length, n: Y.caught.length },
          nt = Y.kind === "static" &&
            Y.id === K &&
            Y.needN &&
            !Je.state?.gifts?.[Y.once] && { have: Math.min(B.itemCount(Y.needs), Y.needN), n: Y.needN },
          Ot = Q > z || (ye && ye.have < ye.n) || (nt && nt.have < nt.n),
          ee = (Ma, Na, Va, Ba, za) =>
            Vt.push({
              ch: Q,
              kind: Ma,
              html: `<li class="${Ot ? "lk" : za ? "off" : ""}" data-ch="${Q}" title="${e("voir dans la Progression")}"><i class="bd">${kt(Q)}</i>${wt(Na, Ma, Y.name, Ot)}<span>${Va}</span><small>${Ba}</small></li>`,
            }),
          rt = Y.kind === "gift" ? Y.gift : Y.kind === "static" ? Y.reward : null;
        rt?.choices?.includes(K) &&
          ee(
            e("Cadeau"),
            t.UI.itemSrc("premier-ball"),
            rt.choices.length > 1 ? e("Au choix parmi {n}", { n: rt.choices.length }) : e("Une fois"),
            e("Nv. {n}", { n: Ge.levelAt(Q, rt.level) }),
          );
        const Qe = Y.kind === "trade" && Y.offers.find((Ma) => Ma[1] === K);
        if (
          (Qe &&
            ee(
              e("Fossile"),
              t.UI.itemSrc(Qe[0]),
              e("Ranime ton {item}", { item: ue(t.UI.itemName(Qe[0])) }),
              e("Nv. {n}", { n: Ge.levelAt(Q, Y.level, !0) }),
            ),
          !(Y.kind === "static" && Y.id === K && !Y.spirit && !Y.shiny))
        )
          return;
        const Ft =
            (Y.night ? m({ when: ["night"] }) : "") +
            (Y.day ? m({ when: ["morning", "day"] }) : "") +
            (Y.skies ? m({ when: Y.skies }) : "") +
            e("Nv. {n}", { n: Ge.staticLevel(Q, Y) }) +
            (Y.chance ? ` · ${pe(Y.chance)} %` : ""),
          Ye = t.DAYTIME.phase().key === "night",
          bt =
            !Ot &&
            ((Y.night && !Ye) ||
              (Y.day && Ye) ||
              (Y.skies &&
                !Y.skies.includes(
                  t.WEATHER?.current({ name: Y.name, bg: Y.bg, indoor: Y.indoor, climate: Y.climate, ch: Q }),
                )));
        if (!ye && !Y.needN)
          return ee(
            e("Rencontre unique"),
            t.UI.itemSrc("poke-ball"),
            Y.once ? e("Une fois") : e("À chaque passage"),
            (bt ? e("Pas en ce moment") + " · " : "") + Ft,
            bt,
          );
        const Yt = !!(Y.once && Je.state?.gifts?.[Y.once]),
          wa = [
            ye && {
              ic: `<img src="${t.UI.itemSrc("poke-ball")}" alt="">`,
              done: Yt || ye.have >= ye.n,
              have: ye.have,
              n: ye.n,
              obj: ue(e(Y.need)),
              tip: Y.caught
                .filter((Ma) => !B.S.dex[Ma])
                .map((Ma) => B.DEX[Ma].name)
                .join(", "),
            },
            Y.needN && {
              ic: `<img src="${t.UI.itemSrc(Y.needs)}" alt="">`,
              done: Yt || nt.have >= nt.n,
              have: nt?.have,
              n: Y.needN,
              obj:
                Y.needs === se.SOULS.item ? e("Trouve {n} Âmes", { n: Y.needN }) : ue(t.UI.itemName(Y.needs)),
              tip: Y.needs === se.SOULS.item ? e("Trouve les âmes des Spectres de Sinnoh") : "",
            },
            { ic: kt(Q), done: !1 },
          ].filter(Boolean),
          pa = wa.findIndex((Ma) => !Ma.done),
          Gt = wa[pa],
          N = pa === wa.length - 1,
          W = wa
            .map(
              (Ma, Na) =>
                `${Na ? `<i class="dq-link${Na <= pa || N ? " on" : ""}"></i>` : ""}<i class="dq-pip${Na < pa || N ? " done" : Na === pa ? " now" : ""}">${Ma.ic}</i>`,
            )
            .join(""),
          ze = !N && Gt.n > 1,
          Lt = `<div class="dq-steps">${`<em class="dq-stp">${N ? e(bt ? "Pas en ce moment" : "Disponible") : e("Étape {at} / {n}", { at: pa + 1, n: wa.length })}</em>`}<div class="dq-pips">${W}</div></div>`,
          zt = Q > z,
          ca = N
            ? `<li class="dq ok${zt ? " lk" : bt ? " off" : ""}" data-ch="${Q}" title="${e("voir dans la Progression")}"><i class="bd">${Gt.ic}</i>${wt(t.UI.itemSrc("poke-ball"), e("Rencontre unique"), Y.name, zt)}
          <span>${Ft} · ${Y.once ? e("Une fois") : e("À chaque passage")}</span>${Lt}</li>`
            : `<li class="dq go${ze ? " bar" : ""}${zt ? " lk" : ""}" data-ch="${Q}" title="${ue(Gt.tip ? (Y.caught && Gt === wa[0] ? e("Il manque : {list}", { list: Gt.tip }) : Gt.tip) : e("voir dans la Progression"))}"><i class="bd">${Gt.ic}</i>
          <b>${Gt.obj}</b>${ze ? `<div class="dq-prog"><i class="dq-bar"><i style="width:${Math.round((Gt.have / Gt.n) * 100)}%"></i></i><em>${Gt.have} / ${Gt.n}</em></div>` : ""}
          ${Lt}</li>`;
        Vt.push({ ch: Q, kind: e("Rencontre unique"), html: ca });
      }),
    );
    const ge = B.DEX[K]?.baby && (t.EVOLUTIONS[K] || [])[0];
    if (ge) {
      const D = Ge.firstChapterOf(Ge.REGIONS.find((Y) => Y.dex && K >= Y.dex[0] && K <= Y.dex[1])?.key),
        Q = !B.pensionUnlocked() || D > z;
      Vt.push({
        ch: D,
        kind: e("Œuf"),
        html: `<li class="${Q ? "lk" : ""}"><i class="bd"><img src="assets/items/mystery-egg.png" alt=""></i><b>${Q ? t.UI.lockIc : ""}${e("Œuf de {name}", { name: ue(B.DEX[ge.to].name) })}</b><span>${e("Pondu par sa famille en Pension")}</span>
        <small>${e("Pension")}</small></li>`,
      });
    }
    for (const D of t.LegendZones?.ZONES || []) {
      if (D.id !== K && !D.forms?.includes(K)) continue;
      const Q = Ge.chaptersOf(D.region),
        Y = D.at
          ? t.LegendZones.atChapter(D)
          : D.badge &&
            Q.find((ee) => Ge.CHAPTERS[ee].steps.some((rt) => rt.kind === "gym" && rt.badge === D.badge)),
        ye = t.LegendZones.state(D),
        nt = ye === "locked" || ye === "sealed",
        Ot = nt ? t.LegendZones.progress(D) : null;
      Vt.push({
        ch: Y ?? Math.max(...Q),
        kind: e("Zone légendaire"),
        html: `<li class="${nt ? "lk" : ""}"><i class="bd"><span class="ac-star">★</span></i><b>${nt ? t.UI.lockIc : ""}${ue(e(D.zone))}</b><span>${Ot ? t.UI.condHtml(Ot) : e("Zone légendaire")}</span>
        <small>${ye === "done" ? e("Validé") : e("Nv. {n}", { n: D.level })}</small></li>`,
      });
    }
    const Fe = (se.ROAMING?.GROUPS || []).find((D) => D.ids.includes(K));
    if (Fe) {
      const D =
          typeof Fe.unlock == "string" ? (B.S.adv?.badges || []).includes(Fe.unlock) : !!B.S.dex[Fe.unlock],
        Q = D && t.Roaming?.update().find((ye) => ye.id === K),
        Y = Q ? Q.ch : Math.max(...Ge.chaptersOf(Fe.regions[0]));
      Vt.push({
        ch: Y,
        kind: e("Errant"),
        html: `<li class="${D ? "" : "lk"}"${Q ? ` data-ch="${Y}"` : ""}><i class="bd">${Q ? kt(Y) : '<span class="ac-star">★</span>'}</i><b>${D ? "" : t.UI.lockIc}${e("Pokémon errant")}</b><span>${Q ? e("En ce moment : {place}", { place: ue(e(Ge.CHAPTERS[Y].name)) }) : e(D ? "Change de chapitre de temps en temps" : "Après la Ligue")}</span>
        <small>${e("Une fois")}</small></li>`,
      });
    }
    const gt = Vt.filter((D) => D.ch >= 0),
      Dt = Ge.regionOf(Je.state?.chapter ?? 0)?.key,
      ha = Ge.REGIONS.map((D) => ({
        r: D,
        rows: [...He.values()].filter((Q) => Ge.regionOf(Q.ch)?.key === D.key),
        ex: gt.filter((Q) => Ge.regionOf(Q.ch)?.key === D.key),
      })).filter((D) => D.rows.length || D.ex.length),
      _t = ha
        .map(({ r: D, rows: Q, ex: Y }) => {
          const ye = [...Q, ...Y].every((Ot) => Ot.ch > z),
            nt =
              !Q.length && ha.length === 1
                ? ""
                : Q.length
                  ? `${e("Nv. {n}", { n: V(Math.min(...Q.map((Ot) => Ot.min)), Math.max(...Q.map((Ot) => Ot.max))) })} · ${Q.length > 1 ? e("jusqu'à {n} %", { n: pe(Math.max(...Q.map((Ot) => Ot.pct))) }) : pe(Math.max(...Q.map((Ot) => Ot.pct))) + " %"}`
                  : [...new Set(Y.map((Ot) => Ot.kind))].join(" · ");
          return `<details class="dex-where-reg${ye ? " lk" : ""}"${D.key === Dt || ha.length === 1 ? " open" : ""}>
        <summary><b>${ye ? t.UI.lockIc : ""}${ue(e(D.name))}</b>
          <small>${nt}</small><i class="chev">▾</i></summary>
        <ul>${Q.map(lt).join("")}${Y.map((Ot) => Ot.html).join("")}</ul></details>`;
        })
        .join(""),
      Ea = !!B.PREVO[K],
      ut = [...He.values()],
      jt = ut.length && ut.reduce((D, Q) => (Q.pct > D.pct ? Q : D)),
      xt = jt
        ? `${ue(e(Ge.regionOf(jt.ch).name))} · <b>${pe(jt.pct)} %</b> max`
        : gt.length
          ? [...new Set(gt.map((D) => D.kind))].join(" · ")
          : e(Ea ? "Évolution" : "Introuvable");
    return t.UI.dexSection(
      e("Où le trouver"),
      xt,
      `<div class="dex-where">${_t || `<p class="muted">${e(Ea ? "Pas à l'état sauvage : il s'obtient par évolution (voir Famille)." : "Introuvable à l'état sauvage : échange, événement ou évolution…")}</p>`}</div>`,
      !B.inDex(K),
    );
  }
  function tt(K, He) {
    const m = qe();
    return u(K)
      .filter(
        (z) => !z.mythical && !B.inDex(z.id) && (m[z.id] || []).some((pe) => Ge.regionOf(pe.ch)?.key === He),
      )
      .map((z) => z.id);
  }
  const mt = { q: "", status: "", types: new Set(), regions: new Set(), shiny: !1 },
    Te = () => !!(mt.q.trim() || mt.status || mt.types.size || mt.regions.size),
    At = (K) => `<span class="type region-badge" style="background:${K.color}">${ue(e(K.name))}</span>`,
    yt = { caught: e("Possédés"), lost: e("Plus possédés"), seen: e("Vus"), missing: e("Manquants") },
    he = (K) => We(K) === "lost";
  function fe(K, He) {
    if (mt.regions.size && !mt.regions.has(He)) return !1;
    const m = $e(K),
      z = !m && oe(K),
      pe = B.DEX[K],
      V = Vs.fold(mt.q);
    return !(
      (V && String(pe.num ?? K) !== V.replace(/^0+/, "") && !((m || z) && Vs.fold(pe.name).includes(V))) ||
      (mt.status === "caught" && !m) ||
      (mt.status === "seen" && !z) ||
      (mt.status === "lost" && !(z && he(K))) ||
      (mt.status === "missing" && m) ||
      (mt.types.size && !pe.types.some((lt) => mt.types.has(lt)))
    );
  }
  let Oe = () => {};
  function Ee() {
    ((Oe = t.UI.filterMore(a(".dex-filters"))),
      (a("#dex-last").onclick = (He) => {
        const m = He.target.closest("[data-id]");
        m && we(+m.dataset.id);
      }));
    const K = () => L(!0);
    ((a("#dex-type-pop").innerHTML = Object.keys(t.TYPES)
      .map((He) => `<button data-v="${He}">${vt(He)}</button>`)
      .join("")),
      (a("#dex-region-pop").innerHTML = P()
        .map((He) => `<button data-v="${He.key}">${At(He)}</button>`)
        .join("")),
      (a("#dex-status-pop").innerHTML = [["", e("Tous")], ...Object.entries(yt)]
        .map(([He, m]) => `<button data-v="${He}">${m}</button>`)
        .join("")),
      (a("#dex-status-pop").onclick = (He) => {
        He.stopPropagation();
        const m = He.target.closest("[data-v]");
        m && ((mt.status = m.dataset.v), (a("#dex-status-pop").hidden = !0), K());
      }));
    for (const He of ["type", "region", "status"])
      a(`#dex-${He}-btn`).onclick = (m) => {
        m.stopPropagation();
        const z = a(`#dex-${He}-pop`),
          pe = z.hidden;
        (document.querySelectorAll(".type-pop").forEach((V) => {
          V.hidden = !0;
        }),
          (z.hidden = !pe));
      };
    for (const [He, m] of [
      ["type", mt.types],
      ["region", mt.regions],
    ])
      a(`#dex-${He}-pop`).onclick = (z) => {
        z.stopPropagation();
        const pe = z.target.closest("[data-v]");
        pe && (m.has(pe.dataset.v) ? m.delete(pe.dataset.v) : m.add(pe.dataset.v), K());
      };
    ((a("#dex-search").oninput = (He) => {
      ((mt.q = He.target.value), K());
    }),
      (a("#dex-shiny").onclick = () => {
        ((mt.shiny = !mt.shiny), K());
      }),
      (a("#dex-active").onclick = (He) => {
        const m = He.target.closest("[data-clear]");
        if (!m) return;
        const [z, pe] = m.dataset.clear.split(":");
        (z === "type"
          ? mt.types.delete(pe)
          : z === "region"
            ? mt.regions.delete(pe)
            : z === "all"
              ? (Object.assign(mt, { q: "", status: "" }), mt.types.clear(), mt.regions.clear())
              : (mt[z] = ""),
          K());
      }));
  }
  function et() {
    (a("#dex-search").value !== mt.q && (a("#dex-search").value = mt.q),
      a("#dex-status-btn").classList.toggle("on", !!mt.status),
      (a("#dex-status-btn").firstChild.textContent = (mt.status ? yt[mt.status] : e("Statut")) + " "));
    for (const m of a("#dex-status-pop").children) m.classList.toggle("on", m.dataset.v === mt.status);
    a("#dex-shiny").classList.toggle("on", mt.shiny);
    for (const [m, z, pe] of [
      ["type", mt.types, e("Types")],
      ["region", mt.regions, e("Régions")],
    ]) {
      (a(`#dex-${m}-btn`).classList.toggle("on", z.size > 0),
        (a(`#dex-${m}-btn`).firstChild.textContent = z.size ? `${pe} (${z.size}) ` : pe + " "));
      for (const V of a(`#dex-${m}-pop`).children) V.classList.toggle("on", z.has(V.dataset.v));
    }
    const K = "<i>✕</i>",
      He = [];
    (mt.q.trim() && He.push(`<button class="pill" data-clear="q">« ${ue(mt.q.trim())} »${K}</button>`),
      mt.status && He.push(`<button class="pill" data-clear="status">${yt[mt.status]}${K}</button>`));
    for (const m of P().filter((z) => mt.regions.has(z.key)))
      He.push(`<button class="pill type-pill" data-clear="region:${m.key}">${At(m)}${K}</button>`);
    for (const m of mt.types)
      He.push(`<button class="pill type-pill" data-clear="type:${m}">${vt(m)}${K}</button>`);
    (He.length > 1 && He.push(`<button class="pill clear" data-clear="all">${e("Tout effacer")}</button>`),
      Oe(mt.types.size + mt.regions.size),
      (a("#dex-active").innerHTML = He.join("")),
      (a("#dex-active").hidden = !He.length));
  }
  const _ = () =>
    [...a("#dex-regions").querySelectorAll(".dex-region:not(.folded) .dex-cell:not([hidden])")].map(
      (K) => +K.dataset.id,
    );
  async function we(K, He) {
    let m = mt.shiny;
    for (;;) {
      const z = He || _(),
        pe = z.indexOf(K),
        V = z[pe - 1],
        lt = z[pe + 1],
        kt = (Vt, Xt, Ht) => {
          (Vt.addEventListener("click", (ge) => {
            const Fe = ge.target.closest(".dex-where li[data-ch]");
            Fe && Xt({ ch: +Fe.dataset.ch });
          }),
            document.addEventListener(
              "keydown",
              (ge) => {
                const Fe =
                  ge.key === "ArrowLeft" && V ? "prev" : ge.key === "ArrowRight" && lt ? "next" : null;
                Fe && Xt(Fe);
              },
              { signal: Ht },
            ));
          const ct = a(".dc-hero", Vt),
            wt = () => {
              a(".dc-mine", Vt)?.remove();
              const ge = pt(K, m);
              if (!ge) return;
              const Fe = b(
                `<button class="btn small ghost dc-mine">${e("Voir mon {name}", { name: ue(B.DEX[K].name) })}${ge.shiny ? " " + t.UI.shinyIc() : ""}${ge.rank ? " " + t.UI.rankTag(ge, "in") : ""} · ${e("Nv. {n}", { n: ge.level })}</button>`,
              );
              ((Fe.onclick = () => Xt({ mine: ge.uid })), a(".dexcard", Vt).appendChild(Fe));
            };
          if (B.S.dex[K] || B.S.seen?.[K]) {
            const ge = b(
              `<button class="btn small outline dc-shiny${m ? " on" : ""}" title="${e("Version chromatique")}" aria-label="${e("Version chromatique")}" aria-pressed="${m}">${t.UI.shinyIc()}</button>`,
            );
            ((ge.onclick = () => {
              ((m = !m),
                a(".art", ct)?.replaceWith(b(t.UI.artImg(K, m, { cls: "spr", center: !0 }))),
                ge.classList.toggle("on", m),
                ge.setAttribute("aria-pressed", m),
                wt());
            }),
              ct.appendChild(ge));
          }
          if (B.S.dex[K] && t.Screens.adventure?.hasIntro(K)) {
            const ge = b(
              `<button class="btn small outline dc-intro intro-btn"><i class="intro-ic">▶</i>${e("Revoir son apparition")}</button>`,
            );
            ((ge.onclick = () => {
              (t.Sfx.click(), t.Screens.adventure.replayIntro(K, pt(K, !1)));
            }),
              a(".dexcard", Vt).appendChild(ge));
          }
          wt();
        },
        ra = await t.UI.showDexCard(K, {
          full: !0,
          seen: !!B.S.seen?.[K],
          shiny: m && !!(B.S.dex[K] || B.S.seen?.[K]),
          extra: ce(K),
          nav: { prev: V, next: lt },
          onOpen: kt,
        });
      if (ra?.ch != null) return ie(ra.ch);
      if (ra?.mine) return t.UI.monDetail(ra.mine);
      if (ra === "prev") K = V;
      else if (ra === "next") K = lt;
      else return;
    }
  }
  const ie = (K) => {
    const He = Ge.regionOf(K);
    t.Screens.map.open(He.key, Ge.CHAPTERS[K].league ? "L" : K);
  };
  function U() {
    const K = a("#dex-regions");
    K.innerHTML = "";
    for (const He of P()) {
      const m = b(`<section class="dex-region" data-region="${He.key}" style="--rc:${He.color}">
        <div class="dex-region-head"><h3>${ue(e(He.name))}</h3><span class="bonus"></span>
          <span class="also" hidden></span><span class="count"></span><div class="progress"><div></div></div><span class="fold">▾</span></div>
        <div class="dex-grid"></div><div class="dex-none" hidden>${e("Aucun Pokémon ne correspond à ces filtres.")}</div></section>`);
      a(".dex-region-head", m).onclick = () => {
        (Te() ? (Tt[He.key] = !m.classList.contains("folded")) : (X[He.key] = m.classList.contains("folded")),
          L());
      };
      const z = a(".dex-grid", m);
      for (const pe of De(He)) {
        const V = b(
          `<div class="dex-cell${it(pe.id) ? " dex-form" : ""}" data-id="${pe.id}"><span class="cnt"></span><span class="new">NEW</span>${(x.matches ? f(pe.id, !1, t.UI.tileScale(pe.id, 28, 42), 46) : f(pe.id, !1, 2, 96)).replace("<img ", '<img loading="lazy" ')}<div class="num">${e("N° {n}", { n: H(pe.id) })}</div><div class="nm"></div></div>`,
        );
        ((V.onclick = () => we(pe.id)), z.appendChild(V));
      }
      K.appendChild(m);
    }
    Ze = !0;
  }
  function Ne() {
    const K = new Map();
    for (const He of a("#dex-regions").querySelectorAll(".dex-cell:not([hidden])"))
      K.set(He, He.getBoundingClientRect());
    return K;
  }
  function T(K) {
    if (matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let He = 0;
    for (const m of a("#dex-regions").querySelectorAll(".dex-region:not(.folded) .dex-cell:not([hidden])")) {
      const z = K.get(m),
        pe = m.getBoundingClientRect();
      if (!(pe.bottom < 0 || pe.top > innerHeight))
        if (z) {
          const V = z.left - pe.left,
            lt = z.top - pe.top;
          (V || lt) &&
            m.animate([{ transform: `translate(${V}px,${lt}px)` }, { transform: "none" }], {
              duration: 320,
              easing: "cubic-bezier(.2,.8,.2,1)",
            });
        } else
          m.animate(
            [
              { opacity: 0, transform: "scale(.6)" },
              { opacity: 1, transform: "none" },
            ],
            {
              duration: 260,
              delay: Math.min(He++ * 18, 240),
              easing: "cubic-bezier(.3,1.4,.5,1)",
              fill: "backwards",
            },
          );
    }
  }
  function L(K = !1) {
    Ze || U();
    const He = K ? Ne() : null;
    et();
    const m = Te();
    if (!m) for (const pe in Tt) delete Tt[pe];
    let z = 0;
    for (const pe of a("#dex-regions").querySelectorAll(".dex-cell")) {
      const V = +pe.dataset.id,
        lt = $e(V) && B.S.dex[V];
      lt && !pe.classList.contains("dex-form") && z++;
      const kt = pe.querySelector("img"),
        ra = t.UI.monSrc(V, mt.shiny);
      kt.src.endsWith(ra) || (kt.src = ra);
      const Vt = !lt && oe(V);
      ((pe.hidden = !fe(V, pe.closest(".dex-region").dataset.region)),
        pe.classList.toggle("unknown", !lt && !Vt),
        pe.classList.toggle("seen", !!Vt),
        pe.classList.toggle("caught", !!lt),
        pe.classList.toggle("lost", !!Vt && he(V)),
        pe.classList.toggle("is-new", !!lt && Z(V)),
        (pe.querySelector(".nm").textContent = lt || Vt ? B.DEX[V].name : "???"),
        (pe.querySelector(".cnt").innerHTML = lt && mt.shiny ? re : ""));
    }
    for (const pe of P()) {
      const V = a(`.dex-region[data-region="${pe.key}"]`),
        lt = u(pe),
        kt = lt.filter((ge) => $e(ge.id)).length,
        ra = je(pe),
        Vt = V.querySelectorAll(".dex-cell:not([hidden])").length,
        Xt = m ? !Vt || !!Tt[pe.key] : !(X[pe.key] ?? !ra);
      (V.classList.toggle("locked", ra),
        V.classList.toggle("folded", Xt),
        (V.hidden = m && !Vt),
        (a(".dex-none", V).hidden = !0),
        (a(".count", V).innerHTML = ra
          ? `${t.UI.lockIc}${ue(pe.lockText || e("Région verrouillée"))}`
          : m
            ? `${e("{n} affiché(s)", { n: Vt })} · ${kt} / ${lt.length}`
            : `${kt} / ${lt.length}`),
        (a(".progress > div", V).style.width = (kt / lt.length) * 100 + "%"),
        (a(".bonus", V).innerHTML = ra ? "" : t.UI.shinyBonus(pe)));
      const Ht =
          !ra &&
          !m &&
          kt < lt.length &&
          Ge.REGIONS.slice(Ge.REGIONS.indexOf(pe) + 1).find(
            (ge) => ge.aside && (ge.open || B.departureTo()?.key === ge.key),
          ),
        ct = Ht ? tt(pe, Ht.key).length : 0,
        wt = a(".also", V);
      if (((wt.hidden = !ct), ct)) {
        const ge = e(Ht.name);
        ((wt.textContent =
          ct > 1
            ? e("{n} manquants se trouvent à {region}", { n: ct, region: ge })
            : e("1 manquant se trouve à {region}", { region: ge })),
          (wt.title = e(
            "Pokémon de ce Pokédex que tu n'as pas encore, capturables à l'état sauvage à {region}",
            { region: ge },
          )),
          wt.style.setProperty("--nc", Ht.color));
      }
    }
    ((a("#dex-empty").hidden = !m || !!a("#dex-regions").querySelector(".dex-region:not([hidden])")),
      R(z),
      a("#screen-pokedex").classList.toggle("shiny-mode", mt.shiny),
      He && T(He));
  }
  function R(K) {
    const He = le().reduce((kt, ra) => kt + u(ra).length, 0),
      m = (K / He) * 100;
    (a("#dex-ring").style.setProperty("--p", m.toFixed(1)),
      (a("#dex-pct").textContent = (m < 10 && m > 0 ? m.toFixed(1) : Math.floor(m)) + " %"),
      t.UI.morph(a("#dex-count"), `${mt.shiny ? re : ""}${K} / ${He}`));
    const z = Object.keys(B.S.seen || {}).length,
      pe = new Set(
        B.ownedMons()
          .filter((kt) => kt.shiny)
          .map((kt) => kt.id),
      ).size,
      V = B.completedRegions().length;
    (t.UI.morph(
      a("#dex-sum"),
      `<span>${e("Vus")} <b>${z}</b></span><span>${re} ${e("Chromatiques")} <b>${pe}</b></span><span>${e("Régions complètes")} <b>${V}/${le().length}</b></span>`,
    ),
      t.UI.morph(
        a("#dex-reg-bars"),
        P()
          .map((kt) => {
            const ra = u(kt),
              Vt = ra.filter((Ht) => $e(Ht.id)).length,
              Xt = je(kt);
            return `<div class="drb ${Xt ? "lk" : ""}" style="--rc:${kt.color}"><b>${ue(e(kt.name))}</b><span class="bar"><i style="width:${(Vt / ra.length) * 100}%"></i></span><small>${Xt ? t.UI.lockIc : `${Vt} / ${ra.length}`}</small></div>`;
          })
          .join(""),
      ));
    const lt = Object.entries(B.S.dex)
      .filter(([kt]) => $e(+kt))
      .sort((kt, ra) => (ra[1].firstAt || 0) - (kt[1].firstAt || 0))
      .slice(0, 8);
    t.UI.morph(
      a("#dex-last"),
      lt.length
        ? lt
            .map(
              ([kt]) =>
                `<span class="dl" title="${ue(B.DEX[kt].name)}" data-id="${kt}">${f(+kt, mt.shiny, 1, 50)}</span>`,
            )
            .join("")
        : `<em>${e("Aucune pour l'instant")}</em>`,
    );
  }
  const te = () => Object.values(B.S.dex).filter((K) => (K.firstAt || 0) > (B.S.dexVisit || 0)).length;
  t.Screens.pokedex = {
    init() {
      ((B.S.dexVisit ??= Date.now()),
        Ee(),
        t.UI.headTip(
          "#screen-pokedex .map-head h2",
          e("Pokédex"),
          e(
            "Une espèce compte tant que tu en gardes un exemplaire : échangée, elle redevient « plus possédée ». Capture une fois chaque espèce d'une région, fabuleux compris, pour doubler tes chances de chromatique dans cette région.",
          ),
        ));
    },
    enter() {
      (($ = B.S.dexVisit || 0), (B.S.dexVisit = Date.now()), B.save());
    },
    render: () => L(),
    openCard: we,
    newCount: te,
    missingIn: tt,
    rebuild() {
      ((Ze = !1), (Re = null));
    },
  };
})();
