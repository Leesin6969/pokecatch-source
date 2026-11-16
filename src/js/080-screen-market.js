/**
 * screen market
 *
 * Public API on the game namespace `t`: t.Screens.market
 *
 * Recovered from the shipped bundle — original chunk #79 at byte 2134684 (40040 bytes, sha256:ca5f10a23c0d5edc).
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
      artImg: B,
      monSrc: se,
      toast: Ge,
      modal: Je,
      helpTip: Ze,
    } = t.UI,
    x = t.Game,
    $ = t.CONFIG,
    X = $.MARKET,
    Tt = () => t.Cloud,
    le = "assets/ui/rocket.svg",
    P = { q: "", shiny: !1, sort: "new" },
    u = { q: "", shiny: !1, sort: "recent" };
  let ve = "list",
    it = !1,
    De = null,
    je = "",
    pt = [];
  const re = {},
    We = "pokecatch-mkt-recent",
    oe = 60 * 6e4,
    $e = {};
  try {
    const ae = JSON.parse(localStorage.getItem(We)) || {};
    for (const [ft, [ht, ea]] of Object.entries(ae)) Date.now() - ea < oe && ((re[ft] = ht), ($e[ft] = ea));
  } catch {}
  const Z = () => {
      try {
        localStorage.setItem(
          We,
          JSON.stringify(
            Object.fromEntries(
              Object.keys($e)
                .filter((ae) => Date.now() - $e[ae] < oe)
                .map((ae) => [ae, [re[ae], $e[ae]]]),
            ),
          ),
        );
      } catch {}
    },
    A = () => ({
      name: x.S.trainer ? `${x.S.trainer.name}#${x.S.trainer.tag}` : "Dresseur",
      sprite: x.S.trainer?.sprite || "red",
    }),
    J = (ae) => ue(String(ae || e("Dresseur")).split("#")[0]),
    de = (ae) => {
      const [ft, ht] = String(ae || e("Dresseur")).split("#");
      return `${ue(ft)}${ht ? `<span class="tag">#${ue(ht)}</span>` : ""}`;
    },
    _e = (ae) => x.regionOfDex(ae),
    Re = () => [...new Set(t.STORY.REGIONS.filter((ae) => ae.open && ae.dex).map((ae) => _e(ae.dex[0])))],
    dt = (ae) => x.DEX[ae].legendary || x.DEX[ae].mythical;
  let qe = null;
  const ce = () => !!x.S.link,
    tt = () => (ce() ? (qe === "to" || qe === "from" ? qe : x.S.link.side) : "all"),
    mt = (ae) => !ce() || x.groupOf(_e(ae)) === tt(),
    Te = () => x.walletMoney(tt()),
    At = Math.round(X.TAX * 100),
    yt = (ae) => (ae.shiny ? X.SHINY_FLAT : X.FLAT)[Math.min(2, x.tierIndex(ae.id))],
    he = (ae, ft) => Math.ceil((ae * At) / 100) + yt(ft),
    fe = new Intl.DateTimeFormat("en-CA", {
      timeZone: "Europe/Paris",
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
    }),
    Oe = () => fe.format(x.time()),
    Ee = () => (x.S.mktDay?.day === Oe() ? x.S.mktDay : { day: Oe(), n: 0, shiny: 0 }),
    et = (ae) =>
      Ee().n >= X.BUYS
        ? e("Tu as fait tes {n} achats du jour. Reviens demain.", { n: X.BUYS })
        : ae && Ee().shiny >= X.SHINY_BUYS
          ? e("Un seul chromatique par jour. Reviens demain.")
          : null,
    _ = (ae) => {
      const ft = Ee();
      x.S.mktDay = { day: ft.day, n: ft.n + 1, shiny: ft.shiny + (ae ? 1 : 0) };
    },
    we = () => x.S.mktOut || (x.S.mktOut = []),
    ie = () => we().filter((ae) => !ae.done),
    U = (ae) => {
      const { hp: ft, status: ht, ...ea } = ae;
      return ea;
    },
    Ne = (ae, ft) => `${ae}${ft ? "s" : ""}`,
    T = () => !!Tt()?.user || pt.length > 0,
    L = (ae) => String(ae).startsWith("fake-"),
    R = () => {
      if (!Tt()?.user) return [...pt];
      const ae = new Set(),
        ft = [];
      for (const ht of [...(Xt().list || []), ...Object.values(Fe).flatMap((ea) => ea.list)])
        ae.has(ht.id) || (ae.add(ht.id), ft.push(ht));
      return [...pt, ...ft];
    },
    te = () => {
      const ae = Tt()?.user && Ea(),
        ft = ae && !ae.plain && Fe[ae.key];
      return ft ? [...pt, ...ft.list] : R();
    },
    K = () => a("#screen-market")?.classList.contains("active"),
    He = (ae) => {
      const ft = Math.max(1, Math.round((Date.now() - ae) / 6e4));
      return ft < 60
        ? e("il y a {n} min", { n: ft })
        : ft < 1440
          ? e("il y a {n} h", { n: Math.round(ft / 60) })
          : e("il y a {n} j", { n: Math.round(ft / 1440) });
    },
    m = (ae) => {
      const ft = Math.max(0, Math.round((ae - Date.now()) / 36e5));
      return ft >= 24 ? e("{d} j {h} h", { d: Math.floor(ft / 24), h: ft % 24 }) : e("{h} h", { h: ft });
    },
    z = () => x.pension().mons.map((ae) => ae.mon),
    pe = (ae) => z().includes(ae),
    V = (ae) =>
      pe(ae)
        ? dt(ae.id) || x.DEX[ae.id].unique
          ? e("Ce Pokémon ne s'échange pas.")
          : null
        : x.tradeBlock(ae),
    lt = () => matchMedia("(max-width: 640px)").matches,
    kt = () =>
      [...x.S.mons, ...z()].filter((ae) => !V(ae) && (!ce() || (x.groupOf(ae.reg) === tt() && mt(ae.id)))),
    ra = (ae) => (pe(ae) && x.fromPension(ae.uid), x.takeOutMon(ae.uid)),
    Vt = () => `pokecatch-market-${Tt()?.user?.id || "x"}`;
  function Xt() {
    try {
      return JSON.parse(localStorage.getItem(Vt())) || { at: 0, list: null };
    } catch {
      return { at: 0, list: null };
    }
  }
  function Ht(ae) {
    try {
      localStorage.setItem(Vt(), JSON.stringify(ae));
    } catch {}
  }
  const ct = () => Xt().at + X.REFRESH_MS;
  async function wt() {
    if (!Tt()?.user || it) return;
    it = !0;
    const ae = Xt();
    try {
      const [, ft] = await Promise.all([nt(), Tt().market.list(Re())]);
      if (ft.error) Ht({ ...ae, at: Date.now() - X.REFRESH_MS + 6e4 });
      else {
        Ht({ at: Date.now(), list: ft.data || [] });
        for (const ht in Fe) delete Fe[ht];
      }
      await Q(
        [...(ft.data || []), ...ie().map((ht) => ({ mon_id: ht.mon.id, shiny: !!ht.mon.shiny }))].map(
          (ht) => [ht.mon_id, ht.shiny],
        ),
      );
    } finally {
      ((it = !1), K() && xn());
    }
  }
  function ge() {
    Tt()?.user && Date.now() >= ct() && K() && wt();
  }
  const Fe = {},
    gt = {};
  let Dt = null,
    ha = null;
  const _t = 400;
  function Ea() {
    const ae = Vs.fold(P.q);
    let ft = null;
    ae &&
      ((ft = Object.keys(x.DEX)
        .map(Number)
        .filter((Ca) => !dt(Ca) && Vs.fold(x.DEX[Ca].name).includes(ae))),
      ft.length > _t && (ft = null));
    const ht = Re().filter((Ca) => !ce() || x.groupOf(Ca) === tt()),
      ea = { ...(ft ? { ids: ft } : {}), ...(P.shiny ? { shiny: !0 } : {}), sort: P.sort },
      Ra = !ft && !P.shiny && P.sort === "new";
    return { key: JSON.stringify([ht, ft, !!P.shiny, P.sort]), regs: ht, o: ea, plain: Ra };
  }
  function ut() {
    const ae = Ea(),
      ft = Fe[ae.key];
    return ae.plain
      ? {
          s: ae,
          more: ft ? ft.more : (Xt().list || []).length >= X.LIST,
          from: (Xt().list || []).length + (ft ? ft.list.length : 0),
        }
      : { s: ae, more: !!ft?.more, from: ft ? ft.list.length : 0, wait: !ft };
  }
  async function jt(ae) {
    if (!Tt()?.user || Dt) return;
    const { s: ft, from: ht } = ut(),
      ea = Fe[ft.key];
    if (!(
      !ae &&
      (ft.plain || (ea && Date.now() - ea.at < X.REFRESH_MS) || Date.now() - (gt[ft.key] || 0) < 6e4)
    )) {
      if (ft.o.ids && !ft.o.ids.length) {
        ((Fe[ft.key] = { at: Date.now(), list: [], more: !1 }), K() && xn());
        return;
      }
      Dt = ft.key;
      try {
        const Ra = await Tt().market.list(ft.regs, { ...ft.o, from: ae ? ht : 0 });
        if (Ra.error) {
          gt[ft.key] = Date.now();
          return;
        }
        const Ca = Ra.data || [];
        ((Fe[ft.key] = {
          at: ae && ea ? ea.at : Date.now(),
          list: ae && ea ? [...ea.list, ...Ca] : Ca,
          more: Ca.length >= X.LIST,
        }),
          await Q(Ca.map((gn) => [gn.mon_id, gn.shiny])));
      } finally {
        ((Dt = null), K() && xt());
      }
    }
  }
  function xt() {
    const ae = document.activeElement,
      ft = ae?.id === "mk-q" ? ae.id : null,
      ht = ft ? ae.selectionStart : 0;
    xn();
    const ea = ft && a("#" + ft);
    if (ea) {
      ea.focus();
      try {
        ea.setSelectionRange(ht, ht);
      } catch {}
    }
  }
  const D = () => {
    (clearTimeout(ha), (ha = Wa(() => jt(), 500)));
  };
  async function Q(ae) {
    const ft = [...new Set(ae.filter(([Ra, Ca]) => !(Ne(Ra, Ca) in re)).map(([Ra]) => Ra))].slice(0, 200);
    if (!ft.length || !Tt()?.user) return;
    const ht = await Tt().market.recent(ft);
    if (ht.error) return;
    const ea = Date.now();
    for (const Ra of ft) ((re[Ne(Ra, !1)] = re[Ne(Ra, !0)] = null), ($e[Ne(Ra, !1)] = $e[Ne(Ra, !0)] = ea));
    for (const Ra of ht.data || []) re[Ne(Ra.mon_id, Ra.shiny)] = [Ra.median, Ra.n];
    Z();
  }
  async function Y() {
    if (!(!Tt()?.user || it)) {
      it = !0;
      try {
        (await t.CatchUp?.wait(), await nt());
      } finally {
        ((it = !1), t.App?.refresh());
      }
      X.OPEN || aa();
    }
  }
  const ye = (ae) =>
    ae
      .filter(
        (ft) =>
          !we().some((ht) => ht.id === ft.id || ht.mon?.uid === ft.mon?.uid) &&
          ft.mon &&
          !x.allMons().some((ht) => ht.uid === ft.mon.uid),
      )
      .map((ft) => ({
        id: ft.id,
        mon: ft.mon,
        price: ft.price,
        fee: 0,
        slot: -1,
        reg: ft.reg,
        sending: !1,
        expires: new Date(ft.expires_at).getTime(),
      }));
  async function nt() {
    if ((x.S.mktBuy && (await Ye(x.S.mktBuy)), !we().length && (X.OPEN || x.S.mktShut || !is()))) return;
    const ae = await Tt().market.mine();
    if (ae.error) return;
    const ft = ae.data || [];
    we().push(...ye(ft));
    for (const ht of [...we()]) {
      if (L(ht.id)) continue;
      const ea = ht.id ? ft.find((Ra) => Ra.id === ht.id) : ft.find((Ra) => Ra.mon?.uid === ht.mon.uid);
      if (!ea) {
        if ((ht.sending && (ht.sending = !1), !ht.id)) {
          (Ot(ht), ee(ht, !0));
          continue;
        }
        const Ra = await Tt().market.still(ht.id);
        if (Ra.error || Ra.data) continue;
        Ot(ht);
        continue;
      }
      (ht.id || ((ht.id = ea.id), (ht.sending = !1), (ht.expires = new Date(ea.expires_at).getTime())),
        (ea.status === "sold" || new Date(ea.expires_at) <= Date.now() || !X.OPEN) && (await rt(ht)));
    }
    x.save();
  }
  const Ot = (ae) => {
    x.S.mktOut = we().filter((ft) => ft !== ae);
  };
  function ee(ae, ft) {
    const ht = x.putInMon(ae.mon, { slot: ae.slot ?? -1, back: !0 });
    if (
      (ft &&
        (x.withWallet(x.groupOf(ae.reg), () => {
          x.S.money += ae.fee || 0;
        }),
        x.unspend(ae.fee, "mkttax")),
      x.save(),
      !ht?.duplicate)
    )
      return !1;
    const ea = t.UI.fedXp(ht.fed),
      Ra = ue(x.DEX[ht.mon.id].name);
    Ge(
      ea
        ? e("{name} déjà possédé : +{n} XP pour sa famille", { name: Ra, n: H(ea) })
        : e("{name} déjà possédé : sa famille est au niveau max", { name: Ra }),
      se(ht.mon.id, ht.mon.shiny),
    );
    for (const Ca of ht.fed || []) Ca.evolve && t.UI.proposeEvolution(Ca.evolve);
    return !0;
  }
  async function rt(ae) {
    const ft = await Tt().market.close(ae.id);
    if (ft.error) return !1;
    Ot(ae);
    const ht = ft.data;
    if (!ht) return (x.save(), !0);
    if (ht.sold)
      (x.withWallet(x.groupOf(ae.reg), () => x.moneyIn(ht.price)),
        Qe({ mon: ae.mon, price: ht.price, sold: !0, who: ht.buyer_name }),
        Ge(
          e("{name} vendu à {who} : +{price} ₽", {
            name: ue(x.DEX[ae.mon.id].name),
            who: J(ht.buyer_name),
            price: H(ht.price),
          }),
          se(ae.mon.id, ae.mon.shiny),
        ));
    else {
      const ea = ee({ ...ae, mon: ae.mon || ht.mon });
      (Qe({ mon: ae.mon, price: ae.price, sold: !1 }),
        !X.OPEN && !x.S.mktShut
          ? Aa.push(ae.mon || ht.mon)
          : (ht.expired || !X.OPEN) &&
            !ea &&
            Ge(
              e("Personne n'a acheté {name} : il est revenu.", { name: ue(x.DEX[ae.mon.id].name) }),
              se(ae.mon.id, ae.mon.shiny),
            ));
    }
    return (Tt().pushNow(), t.App?.refresh(), !0);
  }
  function Qe(ae) {
    x.S.mktLog = [
      { ...ae, mon: { id: ae.mon.id, shiny: !!ae.mon.shiny, level: ae.mon.level }, at: Date.now() },
      ...(x.S.mktLog || []),
    ].slice(0, 10);
  }
  async function Ft(ae) {
    if (it || x.S.mktBuy) return;
    const ft = L(ae.id) ? { data: ae } : await Tt().market.still(ae.id);
    if (!ft.error && !ft.data) return wa(ae);
    if (!L(ae.id) && (await Tt().market.linked(ae.id)).data === !0) {
      (t.Sfx.error?.(), Ge(e("Impossible entre deux comptes du même appareil ou de la même partie.")));
      return;
    }
    if (Te() < ae.price) {
      (t.Sfx.error?.(), Ge(e("Il te manque {price} ₽.", { price: H(ae.price - Te()) })));
      return;
    }
    if (et(ae.shiny)) {
      (t.Sfx.error?.(), Ge(et(ae.shiny)));
      return;
    }
    if (
      !(await ca({
        title: e("Acheter {name} ?", { name: ue(x.DEX[ae.mon_id].name) }),
        mon: { ...ae.mon, level: X.LEVEL },
        who: ae.seller_name,
        text: e("Tu achètes <b>{name}</b> pour <b>{price} ₽</b>. Il te restera {rest} ₽.", {
          name: ue(x.DEX[ae.mon_id].name),
          price: H(ae.price),
          rest: H(Te() - ae.price),
        }),
        actions: [
          { label: e("Retour"), cls: "ghost", value: !1 },
          { label: e("Confirmer"), cls: "primary", value: !0 },
        ],
      })) ||
      it ||
      x.S.mktBuy ||
      Te() < ae.price ||
      et(ae.shiny)
    )
      return;
    const ea = tt();
    if (L(ae.id)) {
      (x.withWallet(ea, () => x.spend(ae.price, "mktbuy")), (pt = pt.filter((Ca) => Ca !== ae)), _(ae.shiny));
      const Ra = x.putInMon(ae.mon, {
        traded: !0,
        bought: !0,
        from: ae.seller_name,
        level: X.LEVEL,
        reg: ae.reg,
      });
      (xn(), t.App.refresh(), Ra && (await pa(Ra)));
      return;
    }
    ((it = !0),
      x.withWallet(ea, () => x.spend(ae.price, "mktbuy")),
      (x.S.mktBuy = { id: ae.id, price: ae.price, from: ae.seller_name, reg: ae.reg, shiny: !!ae.shiny }),
      x.save(),
      t.App.refresh());
    try {
      (await Tt().pushNow(), await Ye(x.S.mktBuy, !0));
    } finally {
      ((it = !1), xn());
    }
  }
  async function Ye(ae, ft) {
    const ht = await Tt().market.buy(ae.id, A().name);
    if (ht.error) {
      /daily/.test(ht.error)
        ? ((x.S.mktDay = {
            ...Ee(),
            ...(/daily_shiny/.test(ht.error) ? { shiny: X.SHINY_BUYS } : { n: X.BUYS }),
          }),
          bt(ae),
          ft && Ge(et(!0) || et(!1)))
        : /not_in_save|funds/.test(ht.error) || ht.error === "closed"
          ? (bt(ae), ft && Ge(e("Achat impossible pour le moment. Tes ₽ n'ont pas bougé.")))
          : ft && Ge(e("Connexion perdue : ton achat se réglera à ton prochain lancement."));
      return;
    }
    if (!ht.data) {
      (bt(ae), ft && wa({ id: ae.id }));
      return;
    }
    (delete x.S.mktBuy, _(ht.data.shiny));
    const ea = x.putInMon(ht.data, { traded: !0, bought: !0, from: ae.from, level: X.LEVEL, reg: ae.reg });
    (Yt(ae.id), Tt().pushNow(), t.App.refresh(), ea && (await pa(ea)));
  }
  function bt(ae) {
    (x.withWallet(x.groupOf(ae.reg), () => {
      x.S.money += ae.price;
    }),
      x.unspend(ae.price, "mktbuy"),
      delete x.S.mktBuy,
      x.save(),
      t.App?.refresh());
  }
  function Yt(ae) {
    Ht({ ...Xt(), list: (Xt().list || []).filter((ft) => ft.id !== ae) });
    for (const ft of Object.values(Fe)) ft.list = ft.list.filter((ht) => ht.id !== ae);
  }
  function wa(ae) {
    (Yt(ae.id),
      Ge(e("Trop tard : quelqu'un a été plus rapide. Tes ₽ n'ont pas bougé.")),
      Tt()?.user && Date.now() - Xt().at > 6e4 ? wt() : xn());
  }
  async function pa(ae) {
    if (
      (Ge(
        e("Marché conclu : {name} est à toi. On ne s'est jamais vus.", { name: ue(x.DEX[ae.mon.id].name) }),
        se(ae.mon.id, ae.mon.shiny),
      ),
      ae.duplicate)
    ) {
      const ft = t.UI.fedXp(ae.fed);
      Ge(
        ft
          ? e("{name} déjà possédé : +{n} XP pour sa famille", { name: ue(x.DEX[ae.mon.id].name), n: H(ft) })
          : e("{name} déjà possédé : sa famille est au niveau max", { name: ue(x.DEX[ae.mon.id].name) }),
        se(ae.mon.id, ae.mon.shiny),
      );
      for (const ht of ae.fed || []) ht.evolve && t.UI.proposeEvolution(ht.evolve);
      return t.App.refresh();
    }
    (await t.UI.showDexCard(ae.mon.id, {
      mon: ae.mon,
      isNew: ae.isNew,
      actions: [{ label: e("Super !"), cls: "gold" }],
    }),
      t.App.refresh());
  }
  async function Gt() {
    if (Tt()?.hold) return (t.Sfx.error?.(), Ge(e("Ventes désactivées : activité anormale détectée.")));
    const ae = De && kt().find((Ca) => Ca.uid === De),
      ft = +je || 0,
      ht = ae && he(ft, ae);
    if (!ae || it || ie().length >= X.MAX || ft < X.MIN_PRICE || Te() < ht) return;
    ((it = !0), xn());
    const ea = ra(ae);
    x.withWallet(x.groupOf(ae.reg), () => x.spend(ht, "mkttax"));
    const Ra = { id: null, mon: ae, price: ft, fee: ht, slot: ea, reg: x.regOf(ae), sending: !0 };
    if ((we().push(Ra), x.save(), t.App.refresh(), !Tt()?.user))
      return (
        Object.assign(Ra, { id: `fake-${Date.now()}`, sending: !1, expires: Date.now() + X.DAYS * 864e5 }),
        (De = null),
        (je = ""),
        (ve = "mine"),
        (it = !1),
        x.save(),
        t.App.refresh(),
        xn(),
        Ge(
          e("{name} est en vente. Commission : −{price} ₽", { name: ue(x.DEX[ae.id].name), price: H(ht) }),
          se(ae.id, ae.shiny),
        )
      );
    try {
      await Tt().pushNow();
      const Ca = await Tt().market.create(U(ae), ft, _e(ae.id), A().name, A().sprite);
      if (!Ca.error)
        (Object.assign(Ra, { id: Ca.data, sending: !1, expires: Date.now() + X.DAYS * 864e5 }),
          (De = null),
          (je = ""),
          (ve = "mine"),
          Ge(
            e("{name} est en vente. Commission : −{price} ₽", { name: ue(x.DEX[ae.id].name), price: H(ht) }),
            se(ae.id, ae.shiny),
          ));
      else {
        const gn = await Tt().market.mine(),
          yn = !gn.error && (gn.data || []).find((mn) => mn.mon?.uid === ae.uid);
        yn
          ? Object.assign(Ra, { id: yn.id, sending: !1, expires: new Date(yn.expires_at).getTime() })
          : gn.error
            ? ((Ra.sending = !1), Ge(e("Connexion perdue : ta vente se réglera à ton prochain lancement.")))
            : (Ot(Ra),
              ee(Ra, !0),
              Ge(e("Le Marché noir refuse ta vente pour le moment. Ton Pokémon et tes ₽ te sont rendus.")));
      }
      (x.save(), Tt().pushNow());
    } finally {
      ((it = !1), t.App.refresh(), xn());
    }
  }
  async function N(ae) {
    if (!(
      it ||
      !ae.id ||
      !(await ca({
        title: e("Retirer la vente ?"),
        mon: ae.mon,
        text: e("{name} revient dans ton PC. La commission ({price} ₽) reste à la Team Rocket.", {
          name: ue(x.DEX[ae.mon.id].name),
          price: H(ae.fee),
        }),
        actions: [
          { label: e("Garder la vente"), cls: "ghost", value: !1 },
          { label: e("Retirer"), cls: "danger", value: !0 },
        ],
      })) ||
      it
    )) {
      if (((it = !0), L(ae.id)))
        return (Ot(ae), ee(ae), Qe({ mon: ae.mon, price: ae.price, sold: !1 }), (it = !1), xn());
      try {
        (await rt(ae)) || Ge(e("Connexion perdue : réessaie dans un instant."));
      } finally {
        ((it = !1), xn());
      }
    }
  }
  const W = {
      normal: "01-prairie-ouverte",
      fire: "48-cramois-ile",
      water: "10-pleine-mer",
      grass: "12-foret-jade-v2",
      electric: "19-centrale-abandonnee",
      ice: "20-iles-ecume-v2",
      fighting: "54-dojo-safrania",
      poison: "18-safari-zone-humide",
      ground: "14-grotte-taupiqueur",
      flying: "ciel-bleu-nuages",
      psychic: "31-arene-morgane",
      bug: "02-chemin-boise-lisiere",
      rock: "03-sentier-rocheux",
      ghost: "16-tour-pokemon",
      dragon: "24-route-victoire",
      dark: "15-grotte-sombre",
      steel: "23-sylphe-sarl",
      fairy: "17-safari-prairie",
    },
    ze = (ae) => `assets/bg/scenes/${W[x.DEX[ae].types[0]] || W.normal}-710x400.webp`;
  function qt(ae) {
    const ft = ae.naturalWidth,
      ht = ae.naturalHeight,
      ea = Math.max(1, Math.min(2, Math.floor(180 / Math.max(ft, ht)))),
      Ra = t.SPRITE_BOUNDS?.[ae.dataset.still];
    ((ae.style.width = ft * ea + "px"),
      Ra &&
        (ae.style.translate = `${Math.round(((ft - Ra[0] - Ra[2]) / 2) * ea)}px ${Math.round((ht - Ra[3]) * ea)}px`),
      (ae.style.visibility = "visible"));
  }
  Object.defineProperty(globalThis, "pcGroundArt", { value: qt });
  function Lt(ae, ft) {
    const ht = x.DEX[ae.id],
      ea = (Ra, Ca) => `<div class="dc-fact">${Ra}<b>${Ca}</b></div>`;
    return `<div class="mk-show"><div class="mk-art${ae.shiny ? " shiny" : ""}" style="background-image: linear-gradient(180deg, rgba(10,12,22,.55), transparent 35%), url(${ze(ae.id)})"><span class="mk-num">${e("N° {n}", { n: t.UI.dexNo(ae.id) })}</span><img class="mk-artimg" src="${t.UI.artSrc(ae.id, ae.shiny)}" data-still="${t.UI.artSrc(ae.id, ae.shiny, !0)}" alt="" onload="pcGroundArt(this)">${ae.shiny ? '<i class="shiny-ico"></i>' : ""}</div>
      <div class="mk-show-id"><b>${ue(ht.name)}</b><small>${e("Nv. {n}", { n: ae.level })}</small><span class="mk-types">${t.UI.types(ae.id, !0)}</span></div>
      <div class="dc-facts two mk-facts">${ea(e("Région"), ue(t.UI.regName(_e(ae.id))))}${ft ? ea(e("Vendeur"), de(ft)) : ea(e("Capturé"), ue(ae.where ? e(ae.where) : ae.ot ? J(ae.ot) : "—"))}</div>
      ${t.UI.statBars(ae.id, ae)}</div>`;
  }
  const zt = (ae, ft) => {
    const ht = re[Ne(ae, ft)];
    return ht
      ? e("Dernières ventes : <b>~{price} ₽</b> ({n} ventes)", { price: H(ht[0]), n: ht[1] })
      : e("Aucune vente récente de cette espèce.");
  };
  function ca({ title: ae, mon: ft, who: ht, text: ea, extra: Ra = "", actions: Ca }) {
    const gn =
      f(`<div><div class="dc-head"><h2>${ae}</h2><div class="dc-sum"><button class="dc-x" aria-label="${e("Fermer")}">✕</button></div></div>
      ${Lt(ft, ht)}${ea ? `<p class="mk-dlg-text">${ea}</p>` : ""}${Ra}</div>`);
    return Je({
      className: "dexcard-modal mk-dlg",
      body: gn,
      actions: Ca,
      onOpen: (yn, mn) => {
        a(".dc-x", yn).onclick = () => mn(null);
      },
    });
  }
  function Ma(ae) {
    const ft = Te() < ae.price,
      ht = et(ae.shiny);
    return ca({
      title: ue(x.DEX[ae.mon_id].name) + (ae.shiny ? " " + t.UI.shinyIc() : ""),
      mon: { ...ae.mon, level: X.LEVEL },
      who: ae.seller_name,
      extra: `<div class="mk-buybox"><div class="mk-row"><b class="mk-price">${H(ae.price)} ₽</b><span class="mk-sub">${e("mis en vente {when}", { when: He(new Date(ae.created_at).getTime()) })}</span></div>
        <span class="mk-sub">${zt(ae.mon_id, ae.shiny)}</span><span class="mk-sub">${e("Il arrive chez toi au niveau {n}.", { n: X.LEVEL })}</span>${ft ? `<span class="mk-sub bad">${e("Il te manque {price} ₽.", { price: H(ae.price - Te()) })}</span>` : ""}
        ${ht ? `<span class="mk-sub bad">${ht}</span>` : `<span class="mk-sub">${e("Achats du jour : {n}/{max}", { n: Ee().n, max: X.BUYS })}</span>`}</div>`,
      actions: [
        {
          label: e("Acheter pour {price} ₽", { price: H(ae.price) }),
          cls: "primary",
          value: !0,
          disabled: ft || !!ht || !!x.S.mktBuy,
        },
      ],
    }).then((ea) => ea && Ft(ae));
  }
  const Na = () => ({
      list: e("Psst… T'as des ₽ ? On a de la marchandise. <b>Pas de questions.</b>"),
      mine: e("On garde un œil sur tes affaires. Discrètement."),
      sell: e(
        "Tu nous confies ton Pokémon, on lui trouve preneur. La Team Rocket se paie <b>d'avance</b>, et on ne rembourse jamais.",
      ),
    }),
    Va = (
      ae,
      { price: ft, sub: ht, badge: ea, id: Ra, own: Ca, who: gn } = {},
    ) => `<button class="mk-item${Ca ? " own" : ""}${ae.shiny ? " shiny" : ""}"${Ra != null ? ` data-${Ca ? "own" : "l"}="${Ra}"` : ""}>
      ${gn ? `<span class="mk-seller">${t.UI.trainerFace(gn.sprite, "mk-face")}<span class="mk-wn">${de(gn.name)}</span></span>` : ""}
      ${ea ? `<span class="mk-badge ${ea[0]}">${ea[1]}</span>` : ae.shiny ? '<i class="shiny-ico mk-sh"></i>' : ""}
      <span class="mk-spr">${vt(ae.id, ae.shiny)}</span>
      <span class="mk-no">${e("N° {n}", { n: t.UI.dexNo(ae.id) })}</span>
      <span class="mk-id"><b>${ue(x.DEX[ae.id].name)}</b></span>
      <span class="mk-foot"><b>${H(ft)} ₽</b><small>${ht}</small></span></button>`;
  function Ba() {
    const ae = Re(),
      ft = Vs.fold(P.q),
      ht = te().filter(
        (Ra) =>
          x.DEX[Ra.mon_id] &&
          !dt(Ra.mon_id) &&
          ae.includes(Ra.reg) &&
          mt(Ra.mon_id) &&
          new Date(Ra.expires_at) > Date.now() &&
          Ra.id !== x.S.mktBuy?.id &&
          (!ft || Vs.fold(x.DEX[Ra.mon_id].name).includes(ft)) &&
          (!P.shiny || Ra.shiny),
      ),
      ea = {
        new: (Ra, Ca) => new Date(Ca.created_at) - new Date(Ra.created_at),
        cheap: (Ra, Ca) => Ra.price - Ca.price,
        dear: (Ra, Ca) => Ca.price - Ra.price,
      }[P.sort];
    return ht.sort(ea);
  }
  function za() {
    const ae = Ba(),
      ft = pt.length ? te() : Xt().list,
      ht = ut(),
      ea = `<div class="pc-filters mk-filters"><input type="search" id="mk-q" placeholder="${e("Rechercher un Pokémon")}" value="${ue(P.q)}">
        <select id="mk-sort">${[
          ["new", e("Nouvelles")],
          ["cheap", e("Prix croissant")],
          ["dear", e("Prix décroissant")],
        ]
          .map(([Ca, gn]) => `<option value="${Ca}" ${P.sort === Ca ? "selected" : ""}>${gn}</option>`)
          .join("")}</select>
        <button class="chip ${P.shiny ? "on" : ""}" id="mk-sh"><i class="shiny-ico"></i> ${e("Chromatiques")}</button></div>`;
    if (!ft || (!ae.length && ht.wait))
      return `${ea}<div class="mk-empty">${e("Chargement de la marchandise…")}</div>`;
    const Ra =
      ht.more && !pt.length
        ? `<button class="btn mk-more" id="mk-more" ${Dt ? "disabled" : ""}>${e("Plus d'annonces")}</button>`
        : "";
    return `${ea}${ae.length ? `<div class="mk-grid">${ae.map((Ca) => Va({ id: Ca.mon_id, level: Ca.level, shiny: Ca.shiny }, { price: Ca.price, sub: He(new Date(Ca.created_at).getTime()), id: Ca.id, who: { name: Ca.seller_name, sprite: Ca.seller_sprite } })).join("")}</div>` : `<div class="mk-empty">${ft.length ? e("Aucune vente ne correspond.") : e("Rien à vendre pour le moment. Repasse plus tard.")}</div>`}${Ra}`;
  }
  function vn() {
    const ae = ie(),
      ft = (x.S.mktLog || []).filter((ht) => x.DEX[ht.mon?.id]);
    return `<div class="mk-eyebrow">${e("En vente · {n}/{max}", { n: ae.length, max: X.MAX })}</div>
      ${ae.length ? `<div class="mk-grid">${ae.map((ht, ea) => Va(ht.mon, { price: ht.price, own: !0, id: ea, who: A(), badge: ["mine", ht.id ? e("En vente") : e("Envoi…")], sub: ht.expires ? e("encore {time}", { time: m(ht.expires) }) : "" })).join("")}</div>` : `<div class="mk-empty">${e("Rien en vente. Passe par « Vendre ».")}</div>`}
      ${ft.length ? `<div class="mk-eyebrow">${e("Terminées")}</div><div class="mk-grid">${ft.map((ht) => Va(ht.mon, { price: ht.price, badge: ht.sold ? ["sold", e("Vendu")] : ["back", e("Revenu")], sub: ht.sold ? J(ht.who) : He(ht.at) })).join("")}</div>` : ""}`;
  }
  function An() {
    const ae = Vs.fold(u.q),
      ft = kt().filter((ea) => (!ae || Vs.fold(x.DEX[ea.id].name).includes(ae)) && (!u.shiny || ea.shiny)),
      ht = {
        recent: (ea, Ra) => (Ra.caughtAt || 0) - (ea.caughtAt || 0),
        level: (ea, Ra) => Ra.level - ea.level || x.rankOf(Ra) - x.rankOf(ea),
        name: (ea, Ra) => x.DEX[ea.id].name.localeCompare(x.DEX[Ra.id].name),
        dex: (ea, Ra) => (x.DEX[ea.id].num ?? ea.id) - (x.DEX[Ra.id].num ?? Ra.id) || ea.id - Ra.id,
      }[u.sort];
    return ft.sort(ht);
  }
  function on() {
    if (ie().length >= X.MAX)
      return `<div class="mk-empty">${e("Tu as déjà {n} ventes en cours.", { n: X.MAX })}</div>`;
    const ae = An();
    ae.some((ht) => ht.uid === De) || ((De = ae[0]?.uid || null), (je = ""));
    const ft = De && ae.find((ht) => ht.uid === De);
    return (
      ft && Wa(() => Yn(ft)),
      `<div class="mk-sell"><div class="mk-pick"><div class="mk-eyebrow">${e("Choisis un Pokémon de ton PC")}</div>
        <div class="pc-filters mk-filters"><input type="search" id="mk-pq" placeholder="${e("Rechercher dans ton PC")}" value="${ue(u.q)}">
          <select id="mk-psort">${[
            ["recent", e("Récents")],
            ["level", e("Niveau")],
            ["name", e("Nom")],
            ["dex", e("N° Pokédex")],
          ]
            .map(([ht, ea]) => `<option value="${ht}" ${u.sort === ht ? "selected" : ""}>${ea}</option>`)
            .join("")}</select>
          <button class="chip ${u.shiny ? "on" : ""}" id="mk-psh"><i class="shiny-ico"></i> ${e("Chromatiques")}</button></div>
        <p class="mk-count">${e("{n} Pokémon · les légendaires ne se vendent pas", { n: ae.length })}</p>
        <div class="pc-grid mk-pc">${
          ae
            .map(
              (
                ht,
              ) => `<div class="pc-cell${ht.uid === De ? " mk-on" : ""}" data-pc="${ht.uid}" title="${ue(x.DEX[ht.id].name)}">
          ${lt() ? vt(ht.id, ht.shiny, t.UI.tileScale(ht.id, 28, 42), 46) : vt(ht.id, ht.shiny, 2, 76)}${x.S.team.includes(ht.uid) ? `<span class="mk-tm" title="${e("Dans ton équipe")}">${e("É")}</span>` : pe(ht) ? `<span class="mk-tm" title="${e("À la Pension")}">${e("P")}</span>` : ""}
          <span class="lvl">${ht.shiny ? t.UI.shinyIc() : ""}${e("Nv. {n}", { n: ht.level })}</span></div>`,
            )
            .join("") || `<div class="mk-empty">${e("Aucun Pokémon ne correspond.")}</div>`
        }</div></div>
      <div class="mk-side">${
        ft
          ? `${Lt(ft)}<label class="mk-label" for="mk-price">${e("Prix (₽)")}</label>
        <input id="mk-price" inputmode="numeric" autocomplete="off" value="${je ? H(+je) : ""}" placeholder="${H(re[Ne(ft.id, ft.shiny)]?.[0] || X.MIN_PRICE)}"><div id="mk-form">${qn(ft)}</div>`
          : `<div class="mk-empty">${e("Choisis un Pokémon pour voir sa fiche.")}</div>`
      }</div></div>`
    );
  }
  function qn(ae) {
    const ft = +je || 0,
      ht = he(ft, ae),
      ea = ft >= X.MIN_PRICE && ht <= Te() && !it;
    return `<span class="mk-sub">${zt(ae.id, ae.shiny)}</span><span class="mk-sub">${e("L'acheteur le reçoit au niveau {n}.", { n: X.LEVEL })}</span>
      <div class="mk-recap"><div class="tax"><span>${e("Commission Rocket ({pct} % + {flat} ₽), payée maintenant", { pct: At, flat: H(yt(ae)) })}</span><span>−${ft ? H(ht) : "—"} ₽</span></div>
        <div><span>${e("Jamais rendue, même si personne n'achète")}</span></div>
        <div class="net"><span>${e("Tu touches à la vente")}</span><span>${ft ? H(ft) : "—"} ₽</span></div></div>
      ${ft && ht > Te() ? `<span class="mk-sub bad">${e("Pas assez de ₽ pour la commission.")}</span>` : ft && ft < X.MIN_PRICE ? `<span class="mk-sub bad">${e("{price} ₽ au moins.", { price: H(X.MIN_PRICE) })}</span>` : ""}
      <button class="btn primary mk-go" id="mk-go" ${ea ? "" : "disabled"}>${ft ? e("Mettre en vente (−{price} ₽)", { price: H(ht) }) : e("Mettre en vente")}</button>`;
  }
  function xn() {
    const ae = a("#market-root");
    if (!ae) return;
    if (!X.OPEN) {
      ae.innerHTML = "";
      return;
    }
    const ft = T(),
      ht = Ba().length;
    if (
      ((ae.innerHTML = `<div class="map-region mk" style="--c:var(--rocket)">
        <div class="map-head"><img src="${le}" alt=""><h2>${e("Marché noir")}</h2><span class="mk-money">${H(Te())} ₽</span>${Ze(e("Marché noir"), e("Achète et vends des Pokémon à prix fixe avec les autres dresseurs. Le premier qui achète repart avec le Pokémon. Mettre en vente coûte {pct} % du prix + de {min} à {max} ₽ selon la rareté (chromatique : de {smin} à {smax} ₽), jamais rendus ; à la vente, tu touches tout le prix. 3 ventes à la fois, 3 jours chacune, puis le Pokémon revient. {buys} achats par jour, dont {sbuys} chromatique.", { pct: At, min: H(X.FLAT[0]), max: H(X.FLAT[2]), smin: H(X.SHINY_FLAT[0]), smax: H(X.SHINY_FLAT[2]), buys: X.BUYS, sbuys: X.SHINY_BUYS }))}${t.UI.sideSeg(tt())}</div>
        <div class="mk-dealer"><img class="mk-grunt" src="assets/trainers/still/rocketgrunt.png" alt=""><div class="mk-bubble">${Na()[ft ? ve : "list"]}</div></div>
      </div>${
        ft
          ? `
      <div class="seg mk-tabs"><button data-tab="list" class="${ve === "list" ? "on" : ""}">${e("Marchandise")} <span class="mk-n">${ht}</span></button>
        <button data-tab="sell" class="${ve === "sell" ? "on" : ""}">${e("Vendre")}</button>
        <button data-tab="mine" class="${ve === "mine" ? "on" : ""}">${e("Mes ventes")} <span class="mk-n">${ie().length}/${X.MAX}</span></button></div>
      ${t.UI.holdNote(e("Tu ne peux ni proposer ni accepter d'échange, ni vendre au Marché."))}<div class="mk-body">${ve === "list" ? za() : ve === "mine" ? vn() : on()}</div>`
          : `<div class="ot-login"><p>${e("Le Marché noir se fait avec les autres dresseurs en ligne : connecte-toi pour acheter et vendre.")}</p>
        <div class="ot-login-btns"><button class="btn ti-discord" data-p="discord">${document.querySelector(".side-disc svg")?.outerHTML || ""}${e("Se connecter avec Discord")}</button><button class="btn ti-google" data-p="google">${Tt()?.GOOGLE_ICON || ""}${e("Se connecter avec Google")}</button></div></div>`
      }`),
      !ft)
    ) {
      ae.querySelectorAll("[data-p]").forEach((ea) => {
        ea.onclick = () => Tt()?.signIn(ea.dataset.p);
      });
      return;
    }
    (fn(ae), ve === "list" && !pt.length && D());
  }
  function fn(ae) {
    const ft = a("#mk-go", ae);
    (ft && Tt()?.hold && (ft.disabled = !0),
      ae.querySelectorAll("[data-tab]").forEach((mn) => {
        mn.onclick = () => {
          ((ve = mn.dataset.tab), xn());
        };
      }),
      ae.querySelectorAll("[data-side]").forEach((mn) => {
        mn.onclick = () => {
          ((qe = mn.dataset.side), (De = null), (je = ""), xn());
        };
      }));
    const ht = (mn, ln) => {
        const In = a(mn, ae);
        In &&
          (In.oninput = () => {
            ln(In.value);
            const xe = In.selectionStart;
            xn();
            const Et = a(mn);
            (Et.focus(), Et.setSelectionRange(xe, xe));
          });
      },
      ea = (mn, ln) => {
        const In = a(mn, ae);
        In &&
          (In.onchange = () => {
            (ln(In.value), xn());
          });
      };
    (ht("#mk-q", (mn) => {
      P.q = mn;
    }),
      ea("#mk-sort", (mn) => {
        P.sort = mn;
      }),
      ht("#mk-pq", (mn) => {
        u.q = mn;
      }),
      ea("#mk-psort", (mn) => {
        u.sort = mn;
      }));
    const Ra = a("#mk-sh", ae);
    Ra &&
      (Ra.onclick = () => {
        ((P.shiny = !P.shiny), xn());
      });
    const Ca = a("#mk-psh", ae);
    Ca &&
      (Ca.onclick = () => {
        ((u.shiny = !u.shiny), xn());
      });
    const gn = a("#mk-more", ae);
    (gn &&
      (gn.onclick = () => {
        ((gn.disabled = !0), jt(!0));
      }),
      ae.querySelectorAll("[data-l]").forEach((mn) => {
        mn.onclick = () => {
          const ln = R().find((In) => In.id === mn.dataset.l);
          ln && Ma(ln);
        };
      }),
      ae.querySelectorAll("[data-own]").forEach((mn) => {
        mn.onclick = () => {
          const ln = ie()[+mn.dataset.own];
          ln && N(ln);
        };
      }),
      ae.querySelectorAll("[data-pc]").forEach((mn) => {
        mn.onclick = async () => {
          const ln = a(".mk-pc", ae).scrollTop;
          ((De = mn.dataset.pc), (je = ""), xn(), (a(".mk-pc").scrollTop = ln));
          const In = kt().find((xe) => xe.uid === De);
          In && Yn(In);
        };
      }));
    const yn = a("#mk-price", ae);
    (yn &&
      (yn.oninput = () => {
        ((je = yn.value.replace(/\D/g, "").slice(0, 12)),
          (yn.value = je ? H(+je) : ""),
          (a("#mk-form").innerHTML = qn(kt().find((mn) => mn.uid === De))),
          Zn());
      }),
      Zn());
  }
  async function Yn(ae) {
    Ne(ae.id, ae.shiny) in re ||
      !Tt()?.user ||
      (await Q([[ae.id, ae.shiny]]),
      De === ae.uid && a("#mk-form") && ((a("#mk-form").innerHTML = qn(ae)), Zn()));
  }
  function Zn() {
    const ae = a("#mk-go");
    ae && (ae.onclick = Gt);
  }
  const is = () => !!x.S.mktFound,
    ts = (ae) => new Promise((ft) => Wa(ft, ae)),
    Jn = 44,
    On = 64;
  function Me(ae) {
    const ft = ae.getContext("2d"),
      ht = (Ca, gn, yn, mn = 1, ln = 1) => {
        ((ft.fillStyle = Ca), ft.fillRect(gn, yn, mn, ln));
      },
      ea = ["#1d2766", "#26286f", "#302873", "#3a2675", "#452373"];
    for (let Ca = 0; Ca < On; Ca++)
      for (let gn = 0; gn < Jn; gn++) {
        const yn = (Ca / On) * (ea.length - 1),
          mn = Math.floor(yn),
          ln = yn - mn;
        ht(
          ((gn + Ca) % 2 === 0 && ln > 0.5) || ln > 0.75 ? ea[Math.min(mn + 1, ea.length - 1)] : ea[mn],
          gn,
          Ca,
        );
      }
    for (let Ca = 0; Ca < 8; Ca++) {
      const gn = (Ca * Math.PI) / 4;
      for (let yn = 6; yn < 22; yn += 2)
        ht("#4a3a9a", Math.round(22 + Math.cos(gn) * yn), Math.round(33 + Math.sin(gn) * yn));
    }
    for (const [Ca, gn] of [
      [5, 15],
      [38, 18],
      [6, 48],
      [38, 46],
      [33, 13],
    ])
      (ht("#ffe066", Ca, gn),
        ht("#fff4c2", Ca - 1, gn),
        ht("#fff4c2", Ca + 1, gn),
        ht("#fff4c2", Ca, gn - 1),
        ht("#fff4c2", Ca, gn + 1));
    (ht("#1b1b22", 0, 0, Jn, 1),
      ht("#1b1b22", 0, On - 1, Jn, 1),
      ht("#1b1b22", 0, 0, 1, On),
      ht("#1b1b22", Jn - 1, 0, 1, On),
      ht("#ffd34d", 1, 1, Jn - 2, 1),
      ht("#ffd34d", 1, 1, 1, On - 2),
      ht("#b8861b", 1, On - 2, Jn - 2, 1),
      ht("#b8861b", Jn - 2, 1, 1, On - 2),
      ht("#8e1730", 2, 3, Jn - 4, 9),
      ht("#d8344a", 2, 3, Jn - 4, 1),
      ht("#8e1730", 2, On - 10, Jn - 4, 8),
      ht("#d8344a", 2, On - 10, Jn - 4, 1));
    for (let Ca = 0; Ca < 4; Ca++) ht("#d9c99a", Jn - 2 - Ca, On - 5 + Ca, Ca + 1, 1);
    const Ra = new Image();
    ((Ra.onload = () => {
      const Ca = document.createElement("canvas");
      ((Ca.width = Ra.width), (Ca.height = Ra.height));
      const gn = Ca.getContext("2d");
      gn.drawImage(Ra, 0, 0);
      const yn = gn.getImageData(0, 0, Ca.width, Ca.height).data;
      let mn = Ca.width,
        ln = Ca.height,
        In = 0,
        xe = 0;
      for (let sa = 0; sa < Ca.height; sa++)
        for (let Ga = 0; Ga < Ca.width; Ga++)
          yn[(sa * Ca.width + Ga) * 4 + 3] > 0 &&
            ((mn = Math.min(mn, Ga)),
            (In = Math.max(In, Ga)),
            (ln = Math.min(ln, sa)),
            (xe = Math.max(xe, sa)));
      const Et = In - mn + 1,
        oa = xe - ln + 1;
      ft.drawImage(
        Ra,
        mn,
        ln,
        Et,
        oa,
        Math.round((Jn - Et) / 2),
        Math.round(12 + (On - 22 - oa) / 2),
        Et,
        oa,
      );
    }),
      (Ra.src = t.UI.artSrc(137, !1, !0)));
  }
  function It(ae, ft) {
    const ht = ae.getContext("2d"),
      ea = (Et, oa, sa, Ga = 1, cn = 1) => {
        ((ht.fillStyle = Et), ht.fillRect(oa, sa, Ga, cn));
      };
    ht.clearRect(0, 0, Jn, On);
    const Ra = 4,
      Ca = 5,
      gn = Jn - 8,
      yn = On - 10;
    if (
      (ea("#1b1b22", Ra - 1, Ca - 1, gn + 2, yn + 2),
      ea("#5a3a2a", Ra, Ca, gn, yn),
      ea("#2a1a20", Ra + 1, Ca + 1, gn - 2, yn - 2),
      ft === "open")
    ) {
      for (let Et = Ca + 2, oa = 0; Et < Ca + yn - 2; Et += 4, oa++) {
        const sa = Math.min(oa, 6);
        (ea("#4a2e38", Ra + 2 + sa, Et, gn - 4 - sa * 2, 2),
          ea("#1a0d13", Ra + 2 + sa, Et + 2, gn - 4 - sa * 2, 2));
      }
      for (let Et = Ca + yn - 18; Et < Ca + yn - 1; Et++)
        for (let oa = Ra + 1; oa < Ra + gn - 1; oa++) {
          const sa = (Et - (Ca + yn - 18)) / 17;
          (oa + Et) % 2 === 0 && Math.random() < sa * 0.9 && ea(sa > 0.6 ? "#e3353b" : "#8e1730", oa, Et);
        }
      return;
    }
    ea("#140a10", Ra + 2, Ca + 2, gn - 4, yn - 4);
    const mn = Jn / 2,
      ln = 36,
      In = ft === "down" ? 1 : 0;
    (ea("#1b1b22", mn - 8, ln - 8, 16, 16),
      ea("#8a8f9c", mn - 7, ln - 7, 14, 14),
      ea("#6b6f7c", mn - 7, ln + 5, 14, 2),
      ea("#a9aebb", mn - 7, ln - 7, 14, 1));
    for (const [Et, oa] of [
      [-6, -6],
      [5, -6],
      [-6, 5],
      [5, 5],
    ])
      ea("#44474f", mn + Et, ln + oa);
    const xe = [
      [-2, -4, 4],
      [-3, -3, 6],
      [-4, -2, 8],
      [-4, -1, 8],
      [-4, 0, 8],
      [-4, 1, 8],
      [-3, 2, 6],
      [-2, 3, 4],
    ];
    if (!In) for (const [Et, oa, sa] of xe) ea("#5a0d18", mn + Et, ln + oa + 1, sa, 1);
    for (const [Et, oa, sa] of xe) ea("#1b1b22", mn + Et - 1, ln + oa + In, sa + 2, 1);
    for (const [Et, oa, sa] of xe) ea("#e3353b", mn + Et, ln + oa + In, sa, 1);
    (ea("#ff8a7d", mn - 2, ln - 3 + In, 2, 1),
      ea("#ff8a7d", mn - 3, ln - 2 + In, 1, 1),
      ea("#8e1730", mn - 1, ln + 2 + In, 4, 1));
  }
  function Kt(ae) {
    if (!ae || is() || ae.querySelector(".mk-spot")) return;
    const ft = f(`<div class="mk-spot">
        <div class="mk-hole"><canvas class="mk-back" width="${Jn}" height="${On}"></canvas><img class="mk-pgrunt" src="assets/trainers/still/rocketgrunt.png" alt=""><button class="mk-switch" tabindex="-1" aria-hidden="true"></button></div>
        <button class="mk-poster" tabindex="-1" aria-hidden="true"><span class="mk-pin"></span><span class="mk-sheet"><canvas width="${Jn}" height="${On}"></canvas><span class="mk-pttl">${e("GROS LOT")}</span><span class="mk-psub">${e("Porygon au comptoir !")}</span></span></button></div>`),
      ht = f(
        '<div class="mk-say"><span class="mk-who"></span><span class="mk-line"></span><span class="mk-nx">▼</span></div>',
      );
    (ae.append(ft, ht), Me(a(".mk-sheet canvas", ft)));
    const ea = a(".mk-back", ft);
    It(ea, "up");
    let Ra = "idle",
      Ca = null;
    const gn = (mn) =>
      new Promise((ln) => {
        const In = mn.slice(),
          xe = () => {
            const Et = In.shift();
            if (!Et) return (ht.classList.remove("show"), (ht.onclick = null), ln());
            ((a(".mk-who", ht).textContent = Et[0]),
              (a(".mk-who", ht).hidden = !Et[0]),
              (a(".mk-line", ht).innerHTML = Et[1]),
              ht.classList.add("show"));
          };
        ((ht.onclick = (Et) => {
          (Et.stopPropagation(), xe());
        }),
          xe());
      });
    ((a(".mk-poster", ft).onclick = (mn) => {
      if ((mn.stopPropagation(), !X.OPEN))
        return (t.Sfx.error?.(), Ge(e("Le passage derrière l'affiche est muré.")));
      Ra === "idle" &&
        ((Ra = "lifted"),
        ft.classList.add("lifted"),
        gn([["", e("Hein ? L'affiche est mal collée… Il y a un bouton derrière !")]]),
        clearTimeout(Ca),
        (Ca = Wa(() => {
          Ra === "lifted" && ((Ra = "idle"), ft.classList.remove("lifted"), ht.classList.remove("show"));
        }, 5e3)));
    }),
      (a(".mk-switch", ft).onclick = async (mn) => {
        if ((mn.stopPropagation(), Ra !== "lifted")) return;
        ((Ra = "open"), clearTimeout(Ca), ht.classList.remove("show"), It(ea, "down"));
        const ln = f(`<div class="mk-clic">${e("CLIC !")}</div>`);
        (ft.appendChild(ln),
          Wa(() => ln.remove(), 900),
          await ts(500),
          ae.classList.add("mk-alarm"),
          await ts(450),
          ft.classList.remove("lifted"),
          ft.classList.add("open"),
          It(ea, "open"),
          await ts(900),
          ft.classList.add("up"),
          await ts(1300),
          await gn([
            [e("Sbire Rocket"), e("Hé ! Qui t'a parlé de l'interrupteur ?!")],
            [e("Sbire Rocket"), e("… Bon. T'as l'air d'avoir des ₽, toi.")],
            [e("Sbire Rocket"), e("Bienvenue au <b>Marché noir</b>. Et tu n'as rien vu.")],
          ]),
          ae.classList.remove("mk-alarm"),
          (x.S.mktFound = Date.now()),
          x.save(),
          (Ra = "found"),
          t.App.refresh());
        const In = await Je({
          className: "dexcard-modal mk-dlg",
          body: f(`<div><div class="dc-head"><img class="mk-dlg-ic" src="${le}" alt=""><h2>${e("Marché noir découvert")}</h2></div>
          <div class="mk-found"><img src="assets/trainers/still/rocketgrunt.png" alt=""></div>
          <p class="mk-dlg-text">${e("Derrière l'affiche du Casino, un passage secret de la Team Rocket. Achète et vends des Pokémon avec les autres dresseurs, <b>sans poser de questions</b>.")}</p>
          <p class="mk-dlg-text">${e("Tu le retrouves dans <b>Social › Marché noir</b>.")}</p></div>`),
          actions: [
            { label: e("Plus tard"), cls: "ghost", value: !1 },
            { label: e("Entrer"), cls: "primary", value: !0 },
          ],
        });
        (ft.remove(), ht.remove(), In && t.App.show("market"));
      }));
    const yn = Ss(() => {
      if (!ft.isConnected) return clearInterval(yn);
      X.OPEN &&
        Ra === "idle" &&
        ae.offsetParent &&
        (ft.classList.add("sway"), Wa(() => ft.classList.remove("sway"), 950));
    }, 7e3);
  }
  const Aa = [];
  let Ka = !1;
  const _a = () => we().length > 0 || !!x.S.mktBuy,
    Ha = 13,
    Ua = 16;
  function sn(ae) {
    const ft = ae.getContext("2d"),
      ht = (ea, Ra, Ca, gn = 1, yn = 1) => {
        ((ft.fillStyle = ea), ft.fillRect(Ra, Ca, gn, yn));
      };
    (ht("#1b1b22", 0, 0, Ha - 4, 1),
      ht("#1b1b22", 0, 0, 1, Ua),
      ht("#1b1b22", 0, Ua - 1, Ha, 1),
      ht("#1b1b22", Ha - 1, 4, 1, Ua - 4));
    for (let ea = 0; ea < 4; ea++) ht("#1b1b22", Ha - 4 + ea, ea, 1, 1);
    (ht("#f2ead6", 1, 1, Ha - 5, Ua - 2), ht("#f2ead6", Ha - 4, 4, 3, Ua - 5));
    for (let ea = 1; ea < 4; ea++) ht("#f2ead6", Ha - 4, ea, ea, 1);
    (ht("#c9bd9c", Ha - 4, 1, 1, 3),
      ht("#c9bd9c", Ha - 4, 3, 3, 1),
      ht("#ddd2b4", Ha - 3, 2, 1, 1),
      ht("#d9cfb3", 1, Ua - 2, Ha - 2, 1),
      ht("#d9cfb3", Ha - 2, 4, 1, Ua - 5));
    for (const [ea, Ra] of [
      [3, 6],
      [5, 8],
      [7, 9],
      [9, 6],
    ])
      ht("#8a8f9c", 2, ea, Ra, 1);
    (ht("#d8344a", 7, 11, 4, 1),
      ht("#d8344a", 7, 12, 1, 3),
      ht("#d8344a", 10, 12, 1, 1),
      ht("#d8344a", 8, 13, 2, 1),
      ht("#d8344a", 9, 14, 2, 1));
  }
  const Be = `
.oc-modal.mkc-modal { --c: var(--rocket); }
.mkc-modal .dc-head h2 { display: flex; align-items: center; gap: var(--s2); }
/* the window's blocks apart (its body holds one wrapper: .oc-modal's gap stopped there), the banner edge to edge right
   under the header (Julien 08/11: « spacing en haut et banner sur toute la largeur ») */
.mkc-modal .modal-body > div { display: flex; flex-direction: column; gap: var(--s3); }
.mkc-modal .mkc-banner { margin: calc(-1 * var(--s3)) calc(-1 * var(--s4)) 0; border-radius: 0; border-width: 0 0 3px; }
.mkc-modal .oc-sec { padding-top: 0; }
.mkc-banner { background-image: linear-gradient(180deg, rgba(8,10,18,.25), transparent 40%), url(assets/bg/scenes/22-repaire-rocket-710x400.webp); }
.mkc-paper { position: absolute; width: ${Ha * 3}px; height: ${Ua * 3}px; image-rendering: pixelated; filter: drop-shadow(0 3px 0 rgba(8,10,18,.35)); }
.mkc-floor { left: 64%; bottom: 14px; z-index: 1; transform: rotate(78deg) scale(.8); filter: brightness(.82) drop-shadow(0 2px 0 rgba(8,10,18,.4)); }
/* the flight (Julien 08/11: « rotation sur le papier un peu plus organique », then « la rotation suit pas très bien le
   mouvement »): one path keyed once, its place (.mkc-fly) and how it lies (the sheet) on the same stops, the same 13 s at
   one steady pace, so the tilt follows the travel: nose up as it climbs, flat and turning over at the top where it
   stalls, leaning forward as it slides down, levelling out at the bottom of each swoop */
.mkc-fly { position: absolute; inset: 0; z-index: 2; pointer-events: none; animation: mkc-drift 13s linear infinite; }
.mkc-tilt { position: absolute; left: 0; top: 34px; perspective: 160px; }
.mkc-fly .mkc-paper { position: static; display: block; animation: mkc-lie 13s linear infinite; }
@keyframes mkc-drift { 0% { transform: translate(-16%, 16px); } 11% { transform: translate(2%, -2px); } 20% { transform: translate(12%, -14px); } 28% { transform: translate(20%, -6px); } 38% { transform: translate(31%, 12px); } 47% { transform: translate(42%, 0px); } 56% { transform: translate(52%, -18px); } 64% { transform: translate(61%, -8px); } 75% { transform: translate(73%, 10px); } 85% { transform: translate(88%, -2px); } 93% { transform: translate(101%, -10px); } 100% { transform: translate(116%, -4px); } }
@keyframes mkc-lie { 0% { transform: rotate(-22deg) rotateY(0deg); } 11% { transform: rotate(-16deg) rotateY(0deg); } 20% { transform: rotate(-3deg) rotateY(70deg); } 28% { transform: rotate(20deg) rotateY(180deg); } 38% { transform: rotate(6deg) rotateY(180deg); } 47% { transform: rotate(-18deg) rotateY(180deg); } 56% { transform: rotate(-2deg) rotateY(260deg); } 64% { transform: rotate(24deg) rotateY(360deg); } 75% { transform: rotate(4deg) rotateY(360deg); } 85% { transform: rotate(-14deg) rotateY(360deg); } 93% { transform: rotate(-4deg) rotateY(420deg); } 100% { transform: rotate(16deg) rotateY(540deg); } }
body.calm :is(.mkc-fly, .mkc-fly .mkc-paper) { animation: none; }
body.calm .mkc-fly { transform: translate(44%, 4px); } body.calm .mkc-fly .mkc-paper { transform: rotate(-12deg); }
@media (prefers-reduced-motion: reduce) { :is(.mkc-fly, .mkc-fly .mkc-paper) { animation: none; } .mkc-fly { transform: translate(44%, 4px); } .mkc-fly .mkc-paper { transform: rotate(-12deg); } }
.mkc-modal .oc-tile .sprbox { margin-top: -14px; }`;
  function Ut() {
    document.getElementById("mkc-style") ||
      document.head.append(
        Object.assign(document.createElement("style"), { id: "mkc-style", textContent: Be }),
      );
  }
  async function aa(ae) {
    if (X.OPEN || !is() || x.S.mktShut || Ka || (Tt()?.user && _a() && !Aa.length)) return;
    ((Ka = !0), (x.S.mktShut = Date.now()), x.save(), Ut());
    const ft = [...Aa.splice(0), ...(Array.isArray(ae) ? ae : [])].filter((Ra) => x.DEX[Ra?.id]),
      ht = (Ra) =>
        `<div class="oc-tile${Ra.shiny ? " shiny" : ""}" title="${ue(x.DEX[Ra.id].name)}">${Ra.shiny ? '<i class="shiny-ico"></i>' : ""}${vt(Ra.id, Ra.shiny, 1.25, 56)}<span class="lvl">${e("Nv. {n}", { n: Ra.level })}</span></div>`,
      ea =
        f(`<div><div class="dc-head"><h2><img class="mk-dlg-ic" src="${le}" alt="">${e("Le Marché noir a fermé")}</h2><div class="dc-sum"><button class="dc-x" aria-label="${e("Fermer")}">✕</button></div></div>
      <div class="dp-banner mkc-banner"><canvas class="mkc-paper mkc-floor" width="${Ha}" height="${Ua}"></canvas><div class="mkc-fly"><div class="mkc-tilt"><canvas class="mkc-paper" width="${Ha}" height="${Ua}"></canvas></div></div></div>
      <p class="dp-text">${e("Cette nuit, la Team Rocket a quitté le Casino en douce, <b>la caisse sous le bras</b>. Il n'y a plus personne.")}</p>
      ${ft.length ? `<div class="oc-sec"><h4>${e("Tes Pokémon en vente te sont rendus")}</h4><div class="oc-grid">${ft.map(ht).join("")}</div></div>` : ""}
      <p class="oc-note">${e("Les commissions sont parties avec la caisse.")}</p></div>`);
    (ea.querySelectorAll("canvas.mkc-paper").forEach(sn),
      await t.CatchUp?.wait(),
      await Je({
        className: "dexcard-modal oc-modal dp-modal mkc-modal",
        body: ea,
        onOpen: (Ra, Ca) => {
          a(".dc-x", Ra).onclick = () => Ca(null);
        },
        actions: [{ label: e("Bon débarras !"), cls: "gold", value: !0 }],
      }),
      (Ka = !1));
  }
  t.Screens.market = {
    poster: Kt,
    groundArt: qt,
    found: is,
    testListings(ae = 12) {
      const ft = Re(),
        ht = Object.keys(x.DEX)
          .map(Number)
          .filter((Ca) => ft.includes(_e(Ca)) && !dt(Ca) && !x.DEX[Ca].unique),
        ea = ["Sacha#4242", "Ondine#1337", "Pierre#0007", "Niko#2025", "Flora#8080", "Régis#3141"],
        Ra = (Ca) => Ca[Math.floor(Math.random() * Ca.length)];
      ((pt = Array.from({ length: ae }, (Ca, gn) => {
        const yn = Ra(ht),
          mn = x.makeMon(yn, 5 + Math.floor(Math.random() * 60));
        mn.shiny = gn % 5 === 1;
        const ln = Math.round((x.tradeFee(mn) * (0.6 + Math.random())) / 1e3) * 1e3;
        return (
          (re[Ne(yn, mn.shiny)] = [Math.round((ln * 1.1) / 1e3) * 1e3, 1 + (gn % 9)]),
          {
            id: `fake-${gn}-${Date.now()}`,
            seller_name: ea[gn % ea.length],
            seller_sprite: ["red", "misty", "brock", "lass", "youngster", "hiker"][gn % 6],
            mon: U(mn),
            mon_id: yn,
            shiny: mn.shiny,
            level: mn.level,
            reg: _e(yn),
            price: ln,
            created_at: new Date(Date.now() - gn * 47 * 6e4).toISOString(),
            expires_at: new Date(Date.now() + 2 * 864e5).toISOString(),
          }
        );
      })),
        xn());
    },
    init() {
      if ((Tt()?.onSynced(Y), !X.OPEN)) {
        Wa(() => {
          (!Tt()?.user || !_a()) && aa();
        }, 1500);
        return;
      }
      (Tt()?.on(() => {
        Tt().user && ge();
      }),
        Ss(ge, 6e4));
    },
    enter() {
      if (!X.OPEN) return void Wa(() => t.App?.show("adventure"));
      ((qe = null), ge());
    },
    shutNote: aa,
    render: xn,
  };
})();
