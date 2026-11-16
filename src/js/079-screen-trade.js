/**
 * screen trade
 *
 * Public API on the game namespace `t`: t.Screens.trade
 *
 * Recovered from the shipped bundle — original chunk #78 at byte 2091263 (43420 bytes, sha256:fded2a6cb5549e15).
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
      sleep: Ze,
      rarityBadge: x,
      idle: $,
    } = t.UI,
    X = t.Game,
    Tt = t.CONFIG,
    le = Tt.ONLINE_TRADE,
    P = () => t.Cloud,
    u = () => t.CaptureFX,
    ve = "assets/ui/link-cable.svg",
    it = { q: "", shiny: !1, reg: null };
  let De = !1,
    je = [];
  const pt = () => ({
      name: X.S.trainer ? `${X.S.trainer.name}#${X.S.trainer.tag}` : "Dresseur",
      sprite: X.S.trainer?.sprite || "red",
    }),
    re = (xe) => {
      const [Et, oa] = String(xe || e("Dresseur")).split("#");
      return `${ue(Et)}${oa ? `<span class="tag">#${ue(oa)}</span>` : ""}`;
    },
    We = (xe) => ue(String(xe || e("Dresseur")).split("#")[0]),
    oe = (xe) => X.regionOfDex(xe),
    $e = () => [...new Set(t.STORY.REGIONS.filter((xe) => xe.open && xe.dex).map((xe) => oe(xe.dex[0])))],
    Z = (xe) => X.DEX[xe].legendary || X.DEX[xe].mythical,
    A = () => !!X.S.link;
  let J = null;
  const de = () => (A() ? (J === "to" || J === "from" ? J : X.S.link.side) : "all"),
    _e = (xe) => !A() || X.onSideWild(xe, de()),
    Re = (xe, Et) => !A() || (_e(xe) && _e(Et)),
    dt = (xe) => {
      const Et = Math.max(0, Math.ceil(xe / 1e3)),
        oa = (Ga) => String(Ga).padStart(2, "0"),
        sa = `${oa(Math.floor((Et % 86400) / 3600))}:${oa(Math.floor((Et % 3600) / 60))}:${oa(Et % 60)}`;
      return Et >= 86400 ? e("{d} j {t}", { d: Math.floor(Et / 86400), t: sa }) : sa;
    },
    qe = (xe) => `<span data-until="${xe}">${dt(xe - Date.now())}</span>`,
    ce = () => (X.S.tradePostAt || 0) + le.POST_COOLDOWN_MS,
    tt = (xe) => {
      const { hp: Et, status: oa, ...sa } = xe;
      return sa;
    },
    mt = () => X.pension().mons.map((xe) => xe.mon),
    Te = (xe) => mt().includes(xe),
    At = (xe) =>
      Te(xe) ? (Z(xe.id) || X.DEX[xe.id].unique ? "Ce Pokémon ne s'échange pas." : null) : X.tradeBlock(xe);
  let yt = null;
  const he = () =>
      yt ||
      [...X.S.mons, ...mt()].filter((xe) => !At(xe) && (!A() || (X.groupOf(xe.reg) === de() && _e(xe.id)))),
    fe = (xe) => (Te(xe) && X.fromPension(xe.uid), X.takeOutMon(xe.uid)),
    Oe = (xe, Et) =>
      (xe.rank || 0) - (Et.rank || 0) ||
      X.S.team.includes(xe.uid) - X.S.team.includes(Et.uid) ||
      xe.level - Et.level,
    Ee = (xe, Et) =>
      he()
        .filter((oa) => oa.id === xe && !!oa.shiny == !!Et)
        .sort(Oe),
    et = 0,
    _ = (xe) => xe.want_id === et,
    we = (xe) =>
      he()
        .filter(
          (Et) =>
            Et.shiny &&
            !(xe.have || []).includes(Et.id) &&
            X.tierIndex(Et.id) === X.tierIndex(xe.give_id) &&
            Re(Et.id, xe.give_id),
        )
        .sort(Oe),
    ie = (xe) => (_(xe) ? we(xe) : Ee(xe.want_id, xe.give_shiny));
  function U(xe) {
    const Et = new Set(
        [...X.S.mons, ...mt(), ...X.underMons(), xe].filter((sa) => sa?.shiny).map((sa) => sa.id),
      ),
      oa = new Set(Et);
    for (let sa of Et) {
      for (let Ga = X.PREVO[sa]?.from; Ga != null; Ga = X.PREVO[Ga]?.from) oa.add(Ga);
      for (let Ga = X.familyKids(sa); Ga.length === 1; Ga = X.familyKids(sa)) oa.add((sa = Ga[0]));
    }
    return [...oa];
  }
  const Ne = () => `pokecatch-trades-sp-${P()?.user?.id || "x"}`;
  function T() {
    try {
      return JSON.parse(localStorage.getItem(Ne())) || { at: 0, species: null };
    } catch {
      return { at: 0, species: null };
    }
  }
  function L(xe) {
    try {
      localStorage.setItem(Ne(), JSON.stringify(xe));
    } catch {}
  }
  const R = () => T().at + le.REFRESH_MS,
    te = () => X.S.tradeOut && !X.S.tradeOut.id,
    K = (xe) => !!(xe?.id && xe.owner && xe.owner !== P()?.user?.id),
    He = () => a("#screen-trade")?.classList.contains("active");
  let m = null;
  const z = new Map(),
    pe = (xe, Et) => `${xe}:${Et ? 1 : 0}`;
  async function V() {
    if (!P()?.user || De) return;
    De = !0;
    const xe = T();
    try {
      const [, Et] = await Promise.all([
        te() ? ut() : X.S.tradeOut?.id ? Fe() : null,
        P().trades.species($e(), ...lt()),
      ]);
      Et.error
        ? L({ ...xe, at: Date.now() - le.REFRESH_MS + 6e4 })
        : (L({ at: Date.now(), species: Et.data || [] }), z.clear());
    } finally {
      ((De = !1), Be());
    }
    m && He() && kt(m.id, m.shiny);
  }
  function lt() {
    const xe = new Set(),
      Et = new Set();
    for (const oa of he()) (oa.shiny ? Et : xe).add(oa.id);
    return [[...xe], [...Et]];
  }
  async function kt(xe, Et) {
    m = { id: xe, shiny: !!Et };
    const oa = pe(xe, Et),
      sa = z.get(oa);
    if (!P()?.user || (sa && (sa.offers === null || Date.now() - sa.at < le.REFRESH_MS))) return Be();
    const Ga = { at: Date.now(), offers: null };
    (z.set(oa, Ga), Be());
    const cn = await P().trades.offers($e(), xe, !!Et);
    ((Ga.offers = cn.error ? [] : cn.data || []),
      cn.error && (Ga.at = 0),
      He() && m && pe(m.id, m.shiny) === oa && Be(!0));
  }
  let ra = { q: "", at: 0, offers: [] },
    Vt = null;
  function Xt() {
    clearTimeout(Vt);
    const xe = Vs.fold(it.q),
      Et = it.q.trim().toLowerCase();
    !P()?.user ||
      xe.length < 2 ||
      Ut().some((oa) => Vs.fold(X.DEX[oa[0]].name).includes(xe)) ||
      (ra.q === xe && Date.now() - ra.at < le.REFRESH_MS) ||
      ((ra = { q: xe, at: Date.now(), offers: null }),
      (Vt = Wa(async () => {
        const oa = await P().trades.offers($e(), null, !1, Et);
        ra.q === xe && ((ra.offers = oa.error ? [] : oa.data || []), oa.error && (ra.at = 0), He() && Be(!0));
      }, 700)));
  }
  function Ht(xe) {
    const Et = T();
    for (const oa of z.values()) {
      const sa = oa.offers?.find((cn) => cn.id === xe);
      if (!sa) continue;
      oa.offers = oa.offers.filter((cn) => cn !== sa);
      const Ga = Et.species?.find((cn) => cn[0] === sa.give_id && !!cn[1] == !!sa.give_shiny);
      Ga &&
        ((Ga[2] = Math.max(0, Ga[2] - 1)),
        Ga[2] || (Et.species = Et.species.filter((cn) => cn !== Ga)),
        L(Et));
    }
    ra.offers && (ra.offers = ra.offers.filter((oa) => oa.id !== xe));
  }
  let ct = null;
  function wt() {
    if (!(!P()?.user || Date.now() < R() || !((He() && !document.hidden) || te()))) {
      if (De) {
        ct ||
          (ct = Wa(() => {
            ((ct = null), wt());
          }, 1e3));
        return;
      }
      V();
    }
  }
  async function ge() {
    if (!(!P()?.user || De)) {
      De = !0;
      try {
        (await t.CatchUp?.wait(), X.S.tradeIn && (await pa(X.S.tradeIn)));
        const xe = X.S.tradeOut;
        if (xe && !xe.id && !xe.sending) return;
        await Fe();
      } finally {
        ((De = !1), t.App?.refresh());
      }
    }
  }
  async function Fe() {
    const xe = await P().trades.mine();
    if (xe.error) return;
    const Et = xe.data,
      oa = X.S.tradeOut;
    if (!Et) {
      oa?.sending
        ? ((oa.sending = !1), X.save())
        : oa?.id && oa.owner !== P().user.id
          ? await gt(oa)
          : oa?.id && (await jt());
      return;
    }
    ((!oa || oa.id !== Et.id) &&
      ((X.S.tradeOut = {
        id: Et.id,
        owner: P().user.id,
        mon: oa?.sending ? oa.mon : Et.give_mon,
        want: Et.want_id,
        expires: new Date(Et.expires_at).getTime(),
        reg: oa?.reg,
      }),
      X.save()),
      Et.status === "accepted" || new Date(Et.expires_at) <= Date.now() ? await jt() : Dt());
  }
  async function gt(xe) {
    const Et = await P().trades.find(xe.id);
    if (!Et.error) {
      if (Et.data && Et.data.owner !== P().user.id) {
        xe.owner !== Et.data.owner && ((xe.owner = Et.data.owner), X.save());
        return;
      }
      if (!xe.owner) return jt();
      (wa("out-other", xe),
        delete X.S.tradeOut,
        X.save(),
        Ge(
          e("Ton offre de {name} a été postée depuis ton autre compte : elle se règle là-bas.", {
            name: ue(X.DEX[xe.mon.id].name),
          }),
          se(xe.mon.id, xe.mon.shiny),
        ));
    }
  }
  function Dt() {
    P().trades.watch(X.S.tradeOut?.id && !K(X.S.tradeOut) ? () => jt() : null, ha);
  }
  function ha() {
    De ? Wa(ha, 3e3) : ge();
  }
  function _t(xe) {
    delete X.S.tradeOut;
    const Et = X.putInMon(xe.mon, { slot: xe.slot ?? -1, back: !0 });
    return (P().pushNow(), Ea(Et));
  }
  function Ea(xe) {
    if (!xe?.duplicate) return !1;
    const Et = t.UI.fedXp(xe.fed),
      oa = ue(X.DEX[xe.mon.id].name);
    Ge(
      Et
        ? e("{name} déjà possédé : +{n} XP pour sa famille", { name: oa, n: H(Et) })
        : e("{name} déjà possédé : sa famille est au niveau max", { name: oa }),
      se(xe.mon.id, xe.mon.shiny),
    );
    for (const sa of xe.fed || []) sa.evolve && t.UI.proposeEvolution(sa.evolve);
    return (t.App?.refresh(), !0);
  }
  async function ut() {
    const xe = X.S.tradeOut;
    if (((xe.sending = !0), X.save(), !(await P().pushNow()))) {
      ((xe.sending = !1), X.save());
      return;
    }
    const Et = await P().trades.create(
      tt(xe.mon),
      xe.want,
      oe(xe.mon.id),
      le.DAYS,
      pt().name,
      pt().sprite,
      xe.want === et ? U(xe.mon) : null,
      !!xe.friends,
    );
    if (Et.error) {
      if ((wa("out-error", xe, Et.error), /duplicate|unique/i.test(Et.error))) return Fe();
      ((xe.sending = !1), X.save());
      return;
    }
    if (!Et.data) {
      (wa("out-refused", xe), (xe.sending = !1), X.save());
      return;
    }
    (Object.assign(xe, {
      id: Et.data,
      owner: P().user.id,
      sending: !1,
      expires: Date.now() + le.DAYS * 864e5,
    }),
      X.save(),
      P().pushNow(),
      P().trades.posted(),
      Dt());
  }
  async function jt() {
    await t.CatchUp?.wait();
    const xe = X.S.tradeOut;
    if (!xe?.id || K(xe)) return;
    P().trades.watch(null);
    const Et = X.S.trainer || {},
      oa = await P().trades.close(xe.id, Et.since && Et.id ? `${Et.since}:${Et.id}` : null);
    if (oa.error) return Dt();
    const sa = oa.data;
    if (!sa) return (wa("out-gone", xe), delete X.S.tradeOut, X.save(), t.App?.refresh());
    if (sa.status === "accepted" && sa.taker_mon) {
      (wa("out-done", xe), delete X.S.tradeOut);
      const Ga = X.putInMon(sa.taker_mon, {
        traded: !0,
        from: sa.taker_name,
        level: xe.mon?.level,
        reg: xe.reg || xe.mon?.reg,
      });
      (t.News?.share(
        {
          k: "trade",
          key: String(xe.id),
          a: xe.mon?.id,
          m: +sa.taker_mon.id,
          s: !!sa.taker_mon.shiny,
          w: (sa.taker_name || "").split("#")[0],
        },
        { local: !0 },
      ),
        P().pushNow(),
        t.App?.refresh(),
        Ga &&
          (await xt(
            xe.mon,
            Ga,
            { name: sa.taker_name, sprite: sa.taker_sprite },
            e("Ton offre a été acceptée !"),
          )));
    } else {
      wa("out-back", xe);
      const Ga = _t({ ...xe, mon: xe.mon || sa.give_mon });
      sa.expired &&
        !Ga &&
        Ge(
          e("Ton offre a expiré : {name} est revenu.", { name: ue(X.DEX[xe.mon.id].name) }),
          se(xe.mon.id, xe.mon.shiny),
        );
    }
    t.App?.refresh();
  }
  async function xt(xe, Et, oa, sa) {
    const Ga = t.UI.fedXp(Et.fed),
      cn = Et.duplicate && {
        html: Ga
          ? e("+{n} XP pour la famille de <b>{name}</b>", { n: H(Ga), name: ue(X.DEX[Et.mon.id].name) })
          : e("Famille de <b>{name}</b> au niveau max", { name: ue(X.DEX[Et.mon.id].name) }),
      },
      Tn = Et.evolved;
    if (
      (await ln(xe, Tn ? { ...Et.mon, id: Tn.from } : Et.mon, oa, sa, !Tn && cn),
      Tn &&
        (mn()
          ? Ge(
              e("{from} évolue en {to} !", { from: ue(X.DEX[Tn.from].name), to: ue(X.DEX[Tn.to].name) }),
              se(Tn.to, Et.mon.shiny),
            )
          : await t.LinkFx.evolve({ from: Tn.from, to: Tn.to, shiny: Et.mon.shiny, duplicate: cn }),
        cn ||
          t.News?.post({
            me: !0,
            mon: Tn.to,
            shiny: Et.mon.shiny,
            html: e("Ton <b>{from}</b> a évolué en <b>{to}</b> !", {
              from: ue(X.DEX[Tn.from].name),
              to: ue(X.DEX[Tn.to].name),
            }),
          })),
      t.App.refresh(),
      cn)
    ) {
      Ge(
        Ga
          ? e("{name} déjà possédé : +{n} XP pour sa famille", { name: ue(X.DEX[Et.mon.id].name), n: H(Ga) })
          : e("{name} déjà possédé : sa famille est au niveau max", { name: ue(X.DEX[Et.mon.id].name) }),
        se(Et.mon.id, Et.mon.shiny),
      );
      for (const Mn of Et.fed || []) Mn.evolve && t.UI.proposeEvolution(Mn.evolve);
      return t.App.refresh();
    }
    (await t.UI.showDexCard(Et.mon.id, {
      mon: Et.mon,
      isNew: Et.isNew,
      actions: [{ label: e("Super !"), cls: "gold" }],
    }),
      t.App.refresh());
  }
  let D = !1;
  const Q = () => !!P()?.friends?.list.some((xe) => xe.status === "accepted"),
    Y = () => {
      (t.Sfx.error?.(), Ge(e("Échanges désactivés : activité anormale détectée.")));
    };
  async function ye() {
    if (X.S.tradeOut) return;
    if (P()?.hold) return Y();
    if (((D = !1), Date.now() < ce())) {
      (t.Sfx.error?.(), Ge(e("Prochaine offre possible dans {time}.", { time: dt(ce() - Date.now()) })));
      return;
    }
    let xe,
      Et,
      oa = 1;
    for (; oa < 4;) {
      const Tn =
        oa === 1 ? (Et = await N(Et?.shiny || !1)) : oa === 2 ? (xe = await W(Et)) : await ee(xe, Et.id);
      if (Tn === null || (oa === 1 && !Tn)) return;
      oa += Tn ? 1 : -1;
    }
    if (At(xe) || X.S.tradeOut) return;
    const sa = X.tradeFee(xe),
      Ga = X.groupOf(xe.reg);
    if (X.walletMoney(Ga) < sa) {
      (t.Sfx.error?.(), Ge(e("Il te faut {price} ₽ pour proposer cet échange.", { price: H(sa) })));
      return;
    }
    const cn = fe(xe);
    if (
      (X.withWallet(Ga, () => X.spend(sa, "trade")),
      (X.S.tradeOut = {
        id: null,
        mon: xe,
        want: Et.id,
        slot: cn,
        fee: sa,
        reg: X.regOf(xe),
        ...(D && Q() ? { friends: !0 } : {}),
      }),
      (X.S.tradePostAt = Date.now()),
      X.save(),
      t.Sfx.buy(),
      t.App.refresh(),
      !De)
    ) {
      ((De = !0), Be());
      try {
        await ut();
      } finally {
        De = !1;
      }
      (X.S.tradeOut?.id
        ? Ge(e("Ton offre est en ligne !"), se(xe.id, xe.shiny))
        : Ge(e("Connexion perdue : ton offre partira à la prochaine actualisation."), se(xe.id, xe.shiny)),
        t.App.refresh());
    }
  }
  function nt({
    title: xe,
    hero: Et,
    text: oa,
    facts: sa,
    warn: Ga,
    actions: cn,
    extra: Tn = "",
    onOpen: Mn,
  }) {
    const ks =
      f(`<div><div class="dc-head"><h2>${xe}</h2><div class="dc-sum"><button class="dc-x" aria-label="${e("Fermer")}">✕</button></div></div>
      <div class="ot-dlg-top">${Et}<div class="dc-id">${oa ? `<div class="genus">${oa}</div>` : ""}
        <div class="dc-facts ot-facts">${sa.map(([ss, us, Xn]) => `<div class="dc-fact">${ss}<b class="${Xn || ""}">${us}</b></div>`).join("")}</div>${[]
          .concat(Ga || [])
          .filter(Boolean)
          .map((ss) => `<p class="ot-warn">${ss}</p>`)
          .join("")}</div></div>${Tn}</div>`);
    return Je({
      className: "dexcard-modal ot-dlg",
      body: ks,
      actions: cn,
      onOpen: (ss, us) => {
        ((a(".dc-x", ss).onclick = () => us(null)), Mn?.(ss));
      },
    });
  }
  function Ot(xe, Et, oa, sa) {
    const Ga = X.tradePreview(xe, Et, oa, sa);
    return Ga?.dup
      ? Ga.id !== xe
        ? e("{name} évoluera en {evo}, déjà possédé : il deviendra de l'XP pour sa famille.", {
            name: ue(X.DEX[xe].name),
            evo: ue(X.DEX[Ga.id].name),
          })
        : e("{name} est déjà possédé et sa famille est pleine : il deviendra de l'XP pour sa famille.", {
            name: ue(X.DEX[xe].name),
          })
      : "";
  }
  function ee(xe, Et) {
    const oa = X.tradeFee(xe),
      sa = X.walletMoney(X.groupOf(xe.reg)),
      Ga = sa < oa,
      cn = Et !== et && Ot(Et, xe.shiny, xe.reg, xe.uid);
    return nt({
      title: e("Ton offre d'échange"),
      hero: za(Et, xe.id, xe.shiny, { big: !0, unknownGet: !X.S.seen[Et] }),
      text: e(
        X.S.team.includes(xe.uid)
          ? "{name} quitte ton équipe tant que l'offre est en ligne ({n} jours)."
          : "{name} quitte ton PC tant que l'offre est en ligne ({n} jours).",
        { name: ue(X.DEX[xe.id].name), n: le.DAYS },
      ),
      facts: [
        ...(Et === et ? [[e("Tu reçois"), Na(xe.id)]] : cn ? [[e("Tu reçois"), e("De l'XP"), "bad"]] : []),
        [e("Frais d'échange"), `${H(oa)} ₽`, Ga ? "bad" : ""],
        [e("Ton argent après"), `${H(sa - oa)} ₽`, Ga ? "bad" : ""],
        [e("Reçu au niveau"), xe.level],
      ],
      warn: [cn, e("Les frais ne sont pas remboursés si tu retires ton offre ou si elle expire.")],
      actions: [
        { label: e("Retour"), cls: "ghost", value: !1 },
        {
          label: cn
            ? e("Proposer quand même · {price} ₽", { price: H(oa) })
            : e("Proposer · {price} ₽", { price: H(oa) }),
          cls: "primary",
          value: !0,
          disabled: Ga,
        },
      ],
      extra: Q()
        ? `<div class="op-row ot-friends${D ? " on" : ""}" role="switch" aria-checked="${D}" tabindex="0">
        <span class="t"><b><img class="ot-fr" src="assets/items/friend-ball.png" alt="">${e("Amis seulement")}</b><small>${e("Seuls tes amis voient ton offre et peuvent l'accepter")}</small></span><span class="op-sw"></span></div>`
        : "",
      onOpen: (Tn) => {
        const Mn = a(".ot-friends", Tn);
        if (!Mn) return;
        const ks = () => {
          ((D = !D), Mn.classList.toggle("on", D), Mn.setAttribute("aria-checked", D));
        };
        ((Mn.onclick = ks),
          (Mn.onkeydown = (ss) => {
            (ss.key === " " || ss.key === "Enter") && (ss.preventDefault(), ks());
          }));
      },
    });
  }
  async function rt() {
    const xe = X.S.tradeOut;
    if (!xe || xe.sending || K(xe)) return;
    const Et = !xe.id;
    if (!(
      !(await nt({
        title: e("Retirer ton offre ?"),
        hero: `<div class="ot-dlg-hero">${ca(xe.mon.id, xe.mon.shiny, "give", 100)}</div>`,
        text: e("Ton offre sera retirée du tableau des échanges."),
        facts: [
          [e("Revient dans"), X.S.team.length < 6 && xe.slot >= 0 ? e("Ton équipe") : e("Ton PC")],
          Et
            ? [e("Frais"), e("Remboursés")]
            : [e("Frais perdus"), `${H(xe.fee || X.tradeFee(xe.mon))} ₽`, "bad"],
        ],
        warn: !Et && e("Les frais d'échange ne te seront pas rendus."),
        actions: [
          { label: e("Garder l'offre"), cls: "ghost", value: !1 },
          { label: e("Retirer"), cls: "danger", value: !0 },
        ],
      })) ||
      X.S.tradeOut !== xe ||
      xe.sending
    )) {
      if (Et)
        return (
          X.withWallet(X.groupOf(xe.reg), () => X.moneyIn(xe.fee || 0)),
          X.unspend(xe.fee, "trade"),
          _t(xe) ||
            Ge(e("{name} est revenu.", { name: ue(X.DEX[xe.mon.id].name) }), se(xe.mon.id, xe.mon.shiny)),
          t.App.refresh()
        );
      await jt();
    }
  }
  let Qe = !1;
  async function Ft(xe) {
    if (xe.fake || Qe) return !Qe;
    Qe = !0;
    try {
      const Et = await P().trades.still(xe.id);
      return Et.error || Et.data
        ? !0
        : (Ht(xe.id), Ge(e("Trop tard : cette offre n'est plus disponible.")), Be(), !1);
    } finally {
      Qe = !1;
    }
  }
  async function Ye(xe) {
    if (P()?.hold) return Y();
    if (X.S.tradeIn) return (t.Sfx.error?.(), Ge(e("Un échange est déjà en attente : relance-le d'abord.")));
    if (!(await Ft(xe))) return;
    if (!xe.fake && (await P().trades.linked(xe.id)).data === !0)
      return (t.Sfx.error?.(), Ge(e("Impossible entre deux comptes du même appareil ou de la même partie.")));
    const Et = ie(xe),
      oa = _(xe) && Et.length > 1;
    let sa = Et[0],
      Ga;
    do {
      if ((oa && !(sa = await Lt(xe, Et))) || !sa || At(sa) || De) return;
      Ga = await bt(xe, sa, oa);
    } while (Ga === !1 && oa);
    if (!Ga || De || At(sa) || X.S.tradeIn) return;
    if (xe.fake) {
      const Tn = fe(sa);
      je = je.filter((ks) => ks !== xe);
      const Mn = X.putInMon(xe.give_mon, {
        traded: !0,
        slot: Tn,
        from: xe.owner_name,
        level: sa.level,
        reg: X.regOf(sa),
      });
      return (
        X.save(),
        t.App.refresh(),
        Mn && (await xt(sa, Mn, { name: xe.owner_name, sprite: xe.owner_sprite })),
        Be()
      );
    }
    De = !0;
    const cn = fe(sa);
    ((X.S.tradeIn = {
      tid: xe.id,
      mon: sa,
      slot: cn,
      from: xe.owner_name,
      sprite: xe.owner_sprite,
      reg: X.regOf(sa),
    }),
      X.save());
    try {
      await pa(X.S.tradeIn, !0);
    } finally {
      De = !1;
    }
    (Ht(xe.id), t.App.refresh());
  }
  function bt(xe, Et, oa) {
    const sa = Ot(xe.give_id, xe.give_shiny, Et.reg, Et.uid);
    return nt({
      title: e("Échanger ?"),
      hero: za(xe.give_id, Et.id, xe.give_shiny, { big: !0, dest: X.tradeHome(xe.give_id, Et.reg) }),
      text: e(
        X.S.team.includes(Et.uid)
          ? "Avec <b>{who}</b> : tu donnes ton {name} Nv. {lv} (de ton équipe)."
          : Te(Et)
            ? "Avec <b>{who}</b> : tu donnes ton {name} Nv. {lv} (de la Pension)."
            : "Avec <b>{who}</b> : tu donnes ton {name} Nv. {lv}.",
        { who: re(xe.owner_name), name: ue(X.DEX[Et.id].name), lv: Et.level },
      ),
      facts: [
        sa
          ? [e("Tu reçois"), e("De l'XP"), "bad"]
          : [e("Tu reçois"), ue(X.DEX[xe.give_id].name) + (xe.give_shiny ? " " + t.UI.shinyIc() : "")],
        [e("Reçu au niveau"), Et.level],
        ...Ba(X.tradeHome(xe.give_id, Et.reg)),
        [e("Frais"), e("Aucun")],
      ],
      warn: [
        sa,
        Et.rank
          ? e("Ton {name} est au rang {r} : son rang ne suit pas l'échange.", {
              name: ue(X.DEX[Et.id].name),
              r: ["", "I", "II", "III", "IV", "V"][Et.rank],
            })
          : "",
      ],
      actions: [
        { label: e(oa ? "Retour" : "Annuler"), cls: "ghost", value: !1 },
        { label: e(sa ? "Échanger quand même" : "Échanger"), cls: "primary", value: !0 },
      ],
    });
  }
  function Yt(xe, Et, oa) {
    const sa = (X.S.tradeLog || []).slice(-7);
    (sa.push({
      at: Date.now(),
      step: xe,
      tid: Et.tid,
      uid: Et.mon?.uid,
      id: Et.mon?.id,
      shiny: !!Et.mon?.shiny,
      level: Et.mon?.level,
      ...(oa ? { err: String(oa).slice(0, 120) } : {}),
    }),
      (X.S.tradeLog = sa),
      X.save());
  }
  const wa = (xe, Et, oa) => Yt(xe, { tid: Et?.id, mon: Et?.mon }, oa);
  async function pa(xe, Et) {
    await t.CatchUp?.wait();
    const oa = pt(),
      sa = (Tn, Mn) => {
        (Yt(Tn, xe, Mn),
          Et &&
            Ge(
              e(
                "L'échange n'a pas abouti pour l'instant. Ton {name} est en sécurité : relance-le depuis l'écran Échanges.",
                { name: ue(X.DEX[xe.mon.id].name) },
              ),
              se(xe.mon.id, xe.mon.shiny),
            ));
      };
    if (!(await P().pushNow())) return sa("push");
    let Ga = await P().trades.accept(xe.tid, tt(xe.mon), oa.name, oa.sprite);
    if ((Ga.error && Et && (Ga = await P().trades.accept(xe.tid, tt(xe.mon), oa.name, oa.sprite)), Ga.error))
      return sa("error", Ga.error);
    if (!Ga.data) {
      const Tn = X.putInMon(xe.mon, { slot: xe.slot, back: !0 });
      if (!Tn) return sa("back");
      (delete X.S.tradeIn,
        Yt("gone", xe),
        P().pushNow(),
        Ea(Tn) ||
          Ge(
            Et
              ? e("Trop tard : cette offre n'est plus disponible.")
              : e("Ton échange n'a pas abouti : {name} est revenu.", { name: ue(X.DEX[xe.mon.id].name) }),
            se(xe.mon.id, xe.mon.shiny),
          ));
      return;
    }
    delete X.S.tradeIn;
    const cn = X.putInMon(Ga.data, {
      traded: !0,
      slot: xe.slot,
      from: xe.from,
      level: xe.mon?.level,
      reg: xe.reg || xe.mon?.reg,
    });
    if (!cn) return ((X.S.tradeIn = xe), sa("received"));
    (Yt("done", xe),
      t.News?.share({
        k: "trade",
        key: String(xe.tid),
        a: xe.mon?.id,
        m: +Ga.data.id,
        s: !!Ga.data.shiny,
        w: (xe.from || "").split("#")[0],
      }),
      P().pushNow(),
      cn && (await xt(xe.mon, cn, { name: xe.from, sprite: xe.sprite })));
  }
  function Gt({
    title: xe,
    step: Et,
    sum: oa,
    cls: sa = "",
    intro: Ga,
    placeholder: cn,
    cells: Tn,
    empty: Mn,
    back: ks,
    shiny: ss,
  }) {
    const us = typeof Tn == "function",
      Xn =
        f(`<div><div class="dc-head"><h2>${xe}</h2><div class="dc-sum"><span>${oa ?? e("Étape <b>{n}</b> / 2", { n: Et })}</span><button class="dc-x" aria-label="${e("Fermer")}">✕</button></div></div>
      ${Ga ? `<div class="ot-pick-intro">${Ga}</div>` : ""}
      <div class="pc-filters ot-pick-search"><input type="search" placeholder="${cn}">${us ? `<button class="chip ${ss ? "on" : ""}" data-shiny><i class="shiny-ico"></i> Shiny</button>` : ""}</div><div class="pc-grid ot-grid"></div></div>`);
    let Dn;
    const ls = (Sn) => {
      const ns = a(".ot-grid", Xn);
      ns.innerHTML = "";
      const Ue = (us ? Tn(ss) : Tn).filter((Bt) => !Sn || Vs.fold(Bt.match).includes(Sn));
      Ue.length || ns.appendChild(f(`<div class="ot-empty">${Sn ? e("Aucun résultat.") : Mn}</div>`));
      for (const Bt of Ue) {
        const st = f(`<button class="ot-cell" title="${Bt.title}">${Bt.html}</button>`);
        ((st.onclick = () => Dn(Bt.value)), ns.appendChild(st));
      }
    };
    ls("");
    const Hn = a("input", Xn);
    Hn.oninput = () => ls(Vs.fold(Hn.value));
    const Kn = a("[data-shiny]", Xn);
    return (
      Kn &&
        (Kn.onclick = () => {
          ((ss = !ss), Kn.classList.toggle("on", ss), ls(Vs.fold(Hn.value)));
        }),
      Je({
        className: `dexcard-modal ot-dlg ot-pickdlg ${sa}`,
        body: Xn,
        actions: ks ? [{ label: e("Retour"), cls: "ghost", value: !1 }] : [],
        onOpen: (Sn, ns) => {
          ((Dn = ns), (a(".dc-x", Sn).onclick = () => ns(null)), Hn.focus());
        },
      })
    );
  }
  function N(xe) {
    const Et = $e(),
      oa = t.POKEDEX.filter((sa) => Et.includes(oe(sa.id)) && _e(sa.id) && !Z(sa.id));
    return Gt({
      title: e("Espèce cherchée"),
      step: 1,
      placeholder: e("Rechercher une espèce…"),
      empty: e("Aucune espèce disponible."),
      shiny: xe,
      intro: e(
        "Choisis le Pokémon que tu veux recevoir : tu proposeras ensuite un de tes Pokémon de même rareté.",
      ),
      cells: (sa) => [
        ...(sa
          ? [
              {
                value: { id: et, shiny: !0 },
                title: e("N'importe quel shiny qui te manque"),
                match: e("N'importe lequel").toLowerCase(),
                html: `${ca(et, !0, "get", 72)}<span class="ot-cell-l">${e("N'importe lequel")}</span>`,
              },
            ]
          : []),
        ...oa.map((Ga) => {
          const cn = !!X.S.seen[Ga.id];
          return {
            value: { id: Ga.id, shiny: sa },
            title: cn ? ue(Ga.name) + (sa ? " ✨" : "") : "???",
            match: Ga.name.toLowerCase(),
            html: `${ca(Ga.id, sa, "get", 72, { unknown: !cn })}${cn && !X.S.dex[Ga.id] ? `<span class="ot-new" title="${e("Pas encore capturé")}">NEW</span>` : ""}
            <span class="ot-cell-l">${cn ? ue(Ga.name) : "???"}</span>`,
          };
        }),
      ],
    });
  }
  function W({ id: xe, shiny: Et }) {
    if (xe === et) return qt();
    const oa = X.tierIndex(xe),
      sa = !!X.S.seen[xe],
      Ga = he()
        .filter((cn) => !!cn.shiny === Et && Re(cn.id, xe) && X.tierIndex(cn.id) === oa)
        .sort((cn, Tn) => cn.id - Tn.id || Tn.level - cn.level);
    return Gt({
      title: e("Ton Pokémon"),
      step: 2,
      back: !0,
      placeholder: e("Rechercher un Pokémon…"),
      empty: A()
        ? e(
            Et
              ? "Aucun de tes Pokémon shiny n'est de rareté {tier} dans cette région."
              : "Aucun de tes Pokémon n'est de rareté {tier} dans cette région.",
            { tier: e(X.tierOf(xe).label).toLowerCase() },
          )
        : e(
            Et
              ? "Aucun de tes Pokémon shiny n'est de rareté {tier}."
              : "Aucun de tes Pokémon n'est de rareté {tier}.",
            { tier: e(X.tierOf(xe).label).toLowerCase() },
          ),
      intro: `<div class="ot-pick-give">${ca(xe, Et, "get", 56, { unknown: !sa })}<div>${e("Tu cherches <b>{name}</b>", { name: (sa ? ue(X.DEX[xe].name) : "???") + (Et ? " " + t.UI.shinyIc() : "") })}
        <small>${e(Et ? "Propose un de tes Pokémon shiny de même rareté ({tier}). Il quitte ton équipe ou ton PC tant que l'offre est en ligne." : "Propose un de tes Pokémon de même rareté ({tier}). Il quitte ton équipe ou ton PC tant que l'offre est en ligne.", { tier: e(X.tierOf(xe).label).toLowerCase() })}</small></div></div>`,
      cells: Ga.map((cn) => ze(cn, !0)),
    });
  }
  const ze = (xe, Et) => ({
    value: xe,
    title: `${ue(X.DEX[xe.id].name)} ${e("Nv. {n}", { n: xe.level })}`,
    match: X.DEX[xe.id].name.toLowerCase(),
    html: `${ca(xe.id, xe.shiny, "give", 72)}${t.UI.mapIcon(xe.reg, "ot-pick-map")}${X.S.team.includes(xe.uid) ? `<span class="ot-team" title="${e("Dans ton équipe")}">${e("É")}</span>` : Te(xe) ? `<span class="ot-team" title="${e("À la Pension")}">${e("P")}</span>` : ""}${t.UI.rankTag(xe)}
      <span class="ot-cell-l">${xe.shiny ? t.UI.shinyIc() : ""}${e("Nv. {n}", { n: xe.level })}</span>${Et ? `<span class="ot-cell-s">${H(X.tradeFee(xe))} ₽</span>` : ""}`,
  });
  function qt() {
    const xe = he()
      .filter((Et) => Et.shiny)
      .sort((Et, oa) => Et.id - oa.id || oa.level - Et.level);
    return Gt({
      title: e("Ton Pokémon"),
      step: 2,
      back: !0,
      placeholder: e("Rechercher un Pokémon…"),
      empty: e("Tu n'as aucun Pokémon shiny à échanger."),
      intro: `<div class="ot-pick-give">${ca(et, !0, "get", 56)}<div>${e("Tu cherches <b>un shiny qui te manque</b>")}
        <small>${e("Propose un de tes Pokémon shiny : tu recevras un shiny de même rareté que tu n'as pas. Il quitte ton équipe ou ton PC tant que l'offre est en ligne.")}</small></div></div>`,
      cells: xe.map((Et) => ze(Et, !0)),
    });
  }
  function Lt(xe, Et) {
    return Gt({
      title: e("Ton Pokémon"),
      step: 1,
      placeholder: e("Rechercher un Pokémon…"),
      empty: e("Tu n'as aucun Pokémon shiny à échanger."),
      intro: `<div class="ot-pick-give">${ca(xe.give_id, !0, "get", 56)}<div>${e("{who} cherche <b>un shiny qui lui manque</b>", { who: re(xe.owner_name) })}
        <small>${e("Choisis le shiny que tu lui donnes contre son {name}.", { name: ue(X.DEX[xe.give_id].name) })}</small></div></div>`,
      cells: Et.map((oa) => ze(oa)),
    });
  }
  const zt = (xe) => {
      const Et = t.SPRITE_BOUNDS?.[se(xe)],
        oa = t.UI.BBOX[xe] || (Et && { x0: Et[0], x1: Et[2], y0: Et[1], y1: Et[3] });
      return oa?.x1 != null && oa?.x0 != null ? Math.max(oa.x1 - oa.x0, oa.y1 - oa.y0) : 36;
    },
    ca = (xe, Et, oa, sa = 80, { unknown: Ga, holo: cn, title: Tn, isNew: Mn, own: ks } = {}) => {
      if (xe === et) return Ma(oa, sa, { holo: cn, title: Tn, own: ks });
      const ss = Math.min((2 * sa) / 80, (sa - 8) / zt(xe)),
        us = Ga || ks == null ? "" : ks ? "have" : "missing",
        Xn = oa === "get" && !Ga && X.S.dex[xe];
      return `<div class="ot-box ${oa} ${Ga ? "unknown" : ""} ${us} ${cn ? "holo" : ""}" style="--px:${sa}px" title="${Tn ?? (Ga ? "???" : ue(X.DEX[xe].name))}">${us === "have" ? `<i class="ot-have" title="${e("Tu l'as")}"></i>` : ""}${Xn ? `<i class="ot-owned" title="${e("Déjà capturé")}"></i>` : ""}${vt(xe, Et && !Ga, ss, sa - 4)}${Et && !Ga ? `<i class="shiny-ico" title="${e("Chromatique")}"></i>` : ""}${Mn ? `<span class="ot-new" title="${ue(Mn)}">NEW</span>` : ""}</div>`;
    },
    Ma = (xe, Et, { holo: oa, title: sa, own: Ga }) => {
      const cn = Ga == null ? "" : Ga ? "have" : "missing";
      return `<div class="ot-box ${xe} any ${cn} ${oa ? "holo" : ""}" style="--px:${Et}px" title="${sa ?? e("N'importe quel shiny qui te manque")}">${cn === "have" ? `<i class="ot-have" title="${e("Tu l'as")}"></i>` : ""}<span class="ot-any">?</span><i class="shiny-ico" title="${e("Chromatique")}"></i></div>`;
    },
    Na = (xe) => e("Un shiny {tier} qui te manque", { tier: e(X.tierOf(xe).label).toLowerCase() }),
    Va = (xe, Et) => (t.UI.awayReg(Et) ? `<span class="ot-dest">${xe}${t.UI.mapMark(Et)}</span>` : xe),
    Ba = (xe) => (t.UI.awayReg(xe) ? [[e("Rejoint"), ue(t.UI.regName(t.UI.awayReg(xe)))]] : []),
    za = (xe, Et, oa, { big: sa, unknownGet: Ga, newGet: cn, unknownGive: Tn, ownGive: Mn, dest: ks } = {}) =>
      `<div class="ot-pair">${Va(ca(xe, oa, "get", sa ? 100 : 80, { unknown: Ga, holo: !0, isNew: cn }), ks)}<span class="ot-arrow">⇄</span>${ca(Et, oa, "give", sa ? 100 : 80, { unknown: Tn, own: Mn })}</div>`,
    vn = (xe, Et) => `<button class="ot-box ${xe} add" style="--px:80px" title="${Et}"></button>`;
  function An() {
    const xe = X.S.tradeOut,
      Et = !!xe,
      oa = !xe && Date.now() < ce(),
      sa = K(xe),
      Ga = xe && A() && X.groupOf(xe.reg) !== de() ? X.groupOf(xe.reg) : null;
    if (Ga)
      return `<div class="ot-link on there">
      <div class="ot-link-row">
        <div class="ot-end">${ca(xe.want, xe.mon.shiny, "get", 80, { unknown: !X.S.seen[xe.want], holo: !0 })}</div>
        <div class="ot-cable"><i></i><span class="ot-pill">${ue(e("Ton offre est côté {side}.", { side: t.UI.sideName(Ga) }))}</span></div>
        <div class="ot-end">${ca(xe.mon.id, xe.mon.shiny, "give")}<div class="ot-me">${t.UI.trainerFace(pt().sprite, "ot-face", !0)}${e("Toi")}</div></div>
      </div>
      <div class="ot-link-act"><button class="btn outline" data-side="${Ga}">${e("Voir")}</button></div></div>`;
    const cn = xe
        ? sa
          ? e("Sur ton autre compte")
          : xe.id
            ? '<span class="ot-dot"></span>' + e("En attente d'un dresseur…")
            : xe.sending
              ? e("Envoi…")
              : e("Pas encore en ligne")
        : e("Crée ton offre d'échange"),
      Tn =
        (xe?.id
          ? `⏳ ${e("Expire dans <b>{time}</b>", { time: qe(xe.expires) })}`
          : xe
            ? e("Partira à la prochaine actualisation")
            : "") +
        (xe?.friends
          ? ` · <img class="ot-fr" src="assets/items/friend-ball.png" alt="">${e("Amis seulement")}`
          : "");
    return `<div class="ot-link ${Et ? "on" : "empty"} ${oa ? "cool" : ""}">
      <div class="ot-link-row">
        <div class="ot-end">${xe ? Va(ca(xe.want, xe.mon.shiny, "get", 80, { unknown: !X.S.seen[xe.want], holo: !0 }), X.tradeHome(xe.want, xe.reg)) : vn("get", e("Choisir l'espèce cherchée"))}</div>
        <div class="ot-cable"><i></i><span class="ot-pill">${cn}</span>${Tn ? `<span class="ot-sub">${Tn}</span>` : ""}</div>
        <div class="ot-end">${xe ? ca(xe.mon.id, xe.mon.shiny, "give") : vn("give wait", e("Choisis d'abord l'espèce cherchée"))}
          <div class="ot-me">${t.UI.trainerFace(pt().sprite, "ot-face", !0)}${e("Toi")}</div></div>
      </div>
      <div class="ot-link-act">${sa ? `<div class="ot-st">${e("À retirer depuis ton autre compte")}</div>` : Et ? `<button class="btn outline" id="ot-withdraw" ${xe.sending ? "disabled" : ""}>${e("Retirer l'offre")}</button>` : `<div class="ot-st">${e("Aucune offre en cours")}</div><span>${e("Même rareté des deux côtés.")}</span><button class="btn primary" id="ot-post" ${oa ? "disabled" : ""}>${e("Proposer")}</button>`}</div>
      ${oa ? `<div class="ot-lock"><span class="ot-cap">${e("Nouvel échange possible dans")}</span><span class="ot-big">${qe(ce())}</span></div>` : ""}</div>`;
  }
  const on = (xe) =>
    xe.friend ||
    P()?.friends?.list.some((Et) => Et.status === "accepted" && `${Et.name}#${Et.tag}` === xe.owner_name);
  function qn(xe) {
    const Et = ie(xe),
      oa = Et.length,
      sa = on(xe),
      Ga = _(xe),
      cn = Ga
        ? oa
          ? e(oa === 1 ? "1 de tes shiny lui manque" : "{n} de tes shiny lui manquent", { n: oa })
          : e("Aucun de tes shiny de cette rareté ne lui manque")
        : e(oa ? "Voir l'échange" : "Tu n'as pas ce Pokémon"),
      Tn = f(`<button class="ot-tile ${oa ? "" : "off"} ${sa ? "friend" : ""}" title="${cn}">
      <span class="ot-who">${sa ? `<img class="ot-fr" src="assets/items/friend-ball.png" alt="" title="${e("Ton ami")}">` : ""}${re(xe.owner_name)}</span><span class="ot-time">⏳ ${qe(new Date(xe.expires_at).getTime())}</span>
      ${za(xe.give_id, xe.want_id, xe.give_shiny, { unknownGet: !1, newGet: !X.S.dex[xe.give_id] && e("Pas encore dans ton Pokédex"), unknownGive: !Ga && !X.S.seen[xe.want_id], ownGive: !!oa, dest: X.tradeHome(xe.give_id, Et[0]?.reg) })}</button>`);
    return ((Tn.onclick = (Mn) => !Mn.target.closest(".tip-host") && oa && Ye(xe)), Tn);
  }
  function xn(xe) {
    return f(`<div class="ot-tile own"><span class="ot-who">${re(pt().name)}<span class="ot-you"> · ${e("Toi")}</span></span>
      <span class="ot-time">${xe.id ? `⏳ ${qe(xe.expires)}` : xe.sending ? e("Envoi…") : e("Pas encore en ligne")}</span>
      ${za(xe.want, xe.mon.id, xe.mon.shiny, { unknownGet: !X.S.seen[xe.want], dest: X.tradeHome(xe.want, xe.reg) })}</div>`);
  }
  function fn(xe) {
    const Et = f(`<div class="ot-pending">${ca(xe.mon.id, xe.mon.shiny, "give", 64)}
      <div class="ot-pending-t"><b>${e("Échange en attente")}</b><span>${e("Ton {name} est en sécurité : il n'a pas encore été échangé avec <b>{who}</b>.", { name: ue(X.DEX[xe.mon.id].name), who: re(xe.from) })}</span></div>
      <button class="btn primary" ${De ? "disabled" : ""}>${e(De ? "Envoi…" : "Relancer l'échange")}</button></div>`);
    return ((a("button", Et).onclick = Yn), Et);
  }
  async function Yn() {
    const xe = X.S.tradeIn;
    if (!(!xe || De)) {
      ((De = !0), Be());
      try {
        await pa(xe, !0);
      } finally {
        De = !1;
      }
      (X.S.tradeIn || Ht(xe.tid), t.App.refresh(), Be());
    }
  }
  const Zn = () => t.Adventure,
    is = () => Zn().npcOffers(),
    ts = (xe) => !Zn().npcTradeDone(xe) && !!Zn().spareMon(xe),
    Jn = (xe) => /^[AEIOUYÉÈÂ]/i.test(xe),
    On = (xe) => e(Jn(xe) ? "Dresseur d'{town}" : "Dresseur de {town}", { town: e(xe) });
  let Me = new Set();
  const It = () => is().filter((xe) => !Zn().npcTradeDone(xe) && (!xe.seen || (!xe.ready && ts(xe)))).length;
  function Kt() {
    Me = new Set(is().filter((xe) => !xe.seen));
    for (const xe of is()) ((xe.seen = !0), (xe.ready = ts(xe)));
  }
  function Aa(xe) {
    const Et = Zn().npcTradeDone(xe),
      oa = !Et && ts(xe),
      sa = ue(X.DEX[xe.give].name),
      Ga = Et
        ? `<span class="ot-done">✓ ${e("Fait")}</span>`
        : oa
          ? `<span class="ot-ready">${e("Prêt")}</span>`
          : "",
      cn =
        f(`<button class="ot-tile ${Et ? "off done" : oa ? "ready" : ""}" title="${Et ? e("Échange effectué") : oa ? e("Voir l'échange") : e("Il te faut un {name} dans ton PC (pas chromatique, hors équipe)", { name: sa })}">
      <span class="ot-who">${ue(On(xe.town))}</span><span class="ot-time">${Ga}</span>
      ${za(xe.get, xe.give, !1, { unknownGet: !X.S.seen[xe.get] && !Et, newGet: Me.has(xe) && !Et && e("Nouvelle demande"), unknownGive: !Et && !X.S.seen[xe.give], ownGive: Et ? null : oa, dest: Et ? null : Zn().offerHome(xe) })}</button>`);
    return (
      oa
        ? (cn.onclick = (Tn) => !Tn.target.closest(".tip-host") && Ka(xe))
        : Et ||
          (cn.onclick = (Tn) =>
            !Tn.target.closest(".tip-host") &&
            Ge(
              e("Il te faut un {name} dans ton PC (pas chromatique, hors équipe).", { name: sa }),
              se(xe.give),
            )),
      cn
    );
  }
  async function Ka(xe) {
    if (!(await In.npcAsk(xe))) return;
    const Et = Zn().npcTrade(xe);
    if (!Et) {
      (Ge(e("Tu n'as plus ce Pokémon à échanger.")), Be());
      return;
    }
    ((xe.ready = !0),
      await In.npcReveal(Et.gave, Et.got, Et.isNew, xe.town, Et.dup),
      Be(),
      t.App.refreshHeader());
  }
  const _a = "pc-npc-fold";
  function Ha() {
    const xe = is().filter((Tn) => !A() || X.groupOf(Zn().offerHome(Tn)) === de());
    if (!xe.length) return null;
    const Et = xe.filter((Tn) => Zn().npcTradeDone(Tn)).length,
      oa = xe.filter((Tn) => !Zn().npcTradeDone(Tn));
    if (!oa.length) return null;
    let sa = !1;
    try {
      sa = localStorage.getItem(_a) === "1";
    } catch {}
    const Ga = f(`<div class="ot-npc${sa ? " folded" : ""}">
      <button class="ot-npc-head" aria-expanded="${!sa}"><span>${e("Demandes des habitants")}</span><span class="ot-npc-sum">${e("<b>{done}</b> / {n} faits", { done: Et, n: xe.length })}</span><span class="ot-npc-chev" aria-hidden="true">▾</span></button>
      <div class="pc-grid ot-board"></div></div>`);
    Ga.querySelector(".ot-npc-head").onclick = () => {
      ((sa = Ga.classList.toggle("folded")),
        Ga.querySelector(".ot-npc-head").setAttribute("aria-expanded", !sa));
      try {
        localStorage.setItem(_a, sa ? "1" : "0");
      } catch {}
    };
    const cn = Ga.querySelector(".ot-board");
    for (const Tn of oa.sort((Mn, ks) => ts(ks) - ts(Mn))) cn.appendChild(Aa(Tn));
    return Ga;
  }
  let Ua = null,
    sn = !1;
  function Be(xe) {
    if (!xe && Ua?.isConnected && document.activeElement === Ua) {
      sn = !0;
      return;
    }
    ((sn = !1), (yt = he()));
    try {
      gn(xe);
    } finally {
      yt = null;
    }
  }
  function Ut() {
    const xe = new Map(),
      Et = $e();
    for (const oa of T().species || []) xe.set(pe(oa[0], oa[1]), [...oa]);
    for (const oa of je) {
      const sa = pe(oa.give_id, oa.give_shiny),
        Ga = xe.get(sa) || [oa.give_id, oa.give_shiny ? 1 : 0, 0, 0, 0];
      (Ga[2]++, (Ga[3] += ie(oa).length ? 1 : 0), (Ga[4] += oa.friend ? 1 : 0), xe.set(sa, Ga));
    }
    return [...xe.values()].filter(([oa]) => X.DEX[oa] && !Z(oa) && Et.includes(oe(oa)) && _e(oa));
  }
  const aa = (xe, Et) => {
    const oa = P()?.user ? z.get(pe(xe, Et))?.offers : [],
      sa = je.filter((Ga) => Ga.give_id === xe && !!Ga.give_shiny == !!Et);
    return oa ? [...sa, ...oa] : sa.length ? sa : null;
  };
  function ae([xe, Et, oa, sa, Ga]) {
    const cn = ue(X.DEX[xe].name),
      Tn = [
        cn + (Et ? " ✨" : ""),
        e(oa === 1 ? "1 offre" : "{n} offres", { n: oa }),
        sa ? e(sa === 1 ? "Tu peux en accepter une" : "Tu peux en accepter {n}", { n: sa }) : "",
        Ga ? e("Ton ami") : "",
      ]
        .filter(Boolean)
        .join(" · "),
      Mn =
        f(`<button class="ot-cell ot-sp${Ga ? " friend" : ""}${sa ? " can" : ""}${Et ? " shiny" : ""}" title="${Tn}">${ca(xe, !!Et, "get", 72, { own: sa ? !0 : void 0, isNew: !X.S.dex[xe] && e("Pas encore dans ton Pokédex"), title: Tn })}
      <span class="ot-cell-l">${Ga ? '<img class="ot-fr" src="assets/items/friend-ball.png" alt="">' : ""}${cn}</span><span class="ot-cell-s">${e(oa === 1 ? "1 offre" : "{n} offres", { n: oa })}</span>${sa ? `<span class="ot-sp-can">${e(sa === 1 ? "1 possible" : "{n} possibles", { n: sa })}</span>` : ""}</button>`);
    return ((Mn.onclick = () => kt(xe, !!Et)), Mn);
  }
  const ft = (xe) => !it.reg || oe(xe) === it.reg,
    ht = () =>
      t.STORY.REGIONS.filter((xe) => xe.open && xe.dex)
        .map((xe) => ({ key: oe(xe.dex[0]), r: xe }))
        .filter(
          (xe, Et, oa) =>
            oa.findIndex((sa) => sa.key === xe.key) === Et &&
            (!A() || t.POKEDEX.some((sa) => oe(sa.id) === xe.key && _e(sa.id))),
        );
  function ea() {
    const xe = ht();
    if (xe.length < 2) return "";
    it.reg && !xe.some((oa) => oa.key === it.reg) && (it.reg = null);
    const Et = xe.find((oa) => oa.key === it.reg);
    return `<div class="type-dd ot-reg-dd"><button class="chip btn small ghost ${Et ? "on" : ""}" id="ot-reg-btn">${Et ? ue(e(Et.r.name)) : e("Régions")} <span>▾</span></button>
      <div class="type-pop status-pop" id="ot-reg-pop" hidden>${[["", e("Toutes les régions")], ...xe.map((oa) => [oa.key, ue(e(oa.r.name))])].map(([oa, sa]) => `<button data-v="${oa}" class="${(it.reg || "") === oa ? "on" : ""}">${sa}</button>`).join("")}</div></div>`;
  }
  let Ra = !1;
  function Ca() {
    const xe = a("#ot-reg-btn"),
      Et = a("#ot-reg-pop");
    xe &&
      ((xe.onclick = (oa) => {
        oa.stopPropagation();
        const sa = Et.hidden;
        (document.querySelectorAll(".type-pop").forEach((Ga) => {
          Ga.hidden = !0;
        }),
          (Et.hidden = !sa));
      }),
      (Et.onclick = (oa) => {
        oa.stopPropagation();
        const sa = oa.target.closest("[data-v]");
        sa && ((it.reg = sa.dataset.v || null), (m = null), Be());
      }),
      Ra ||
        ((Ra = !0),
        document.addEventListener("click", () => a("#ot-reg-pop") && (a("#ot-reg-pop").hidden = !0))));
  }
  function gn(xe) {
    const Et = a("#trade-root");
    if (!Et) return;
    const oa = !!P()?.user || je.length > 0,
      sa = $e(),
      Ga = (Sn) =>
        _(Sn)
          ? Sn.give_shiny
          : !Z(Sn.want_id) &&
            X.tierIndex(Sn.give_id) === X.tierIndex(Sn.want_id) &&
            sa.includes(oe(Sn.want_id)),
      cn = (Sn) =>
        X.DEX[Sn.give_id] &&
        (_(Sn) || X.DEX[Sn.want_id]) &&
        !Z(Sn.give_id) &&
        sa.includes(Sn.reg) &&
        sa.includes(oe(Sn.give_id)) &&
        Ga(Sn) &&
        _e(Sn.give_id) &&
        (_(Sn) || _e(Sn.want_id)) &&
        new Date(Sn.expires_at) > Date.now(),
      Tn = (Sn) =>
        Sn.map((ns) => ({
          o: ns,
          k: (on(ns) ? 4 : 0) + (ie(ns).length ? 2 : 0) + (X.S.dex[ns.give_id] ? 0 : 1),
        }))
          .sort((ns, Ue) => Ue.k - ns.k)
          .map((ns) => ns.o),
      Mn = Vs.fold(it.q),
      ks = !P()?.user || !!T().species,
      ss = (Sn) => f(`<div class="ot-empty">${Sn}</div>`),
      us = (Sn) => {
        if ((Sn.classList.toggle("ot-spgrid", !m), m)) {
          const st = aa(m.id, m.shiny),
            Zt = Tn((st || []).filter(cn)),
            va =
              f(`<div class="ot-sp-head"><button class="btn small ghost" id="ot-back">← ${e("Toutes les espèces")}</button>
          <span class="ot-sp-name">${ue(X.DEX[m.id].name)}${m.shiny ? " " + t.UI.shinyIc() : ""}</span>${st ? `<span class="ot-sp-n">${e(Zt.length === 1 ? "1 offre" : "{n} offres", { n: Zt.length })}</span>` : ""}</div>`);
          ((a("#ot-back", va).onclick = () => {
            ((m = null), Be(!0));
          }),
            Sn.appendChild(va));
          const Da = X.S.tradeOut;
          Da &&
            Da.mon.id === m.id &&
            !!Da.mon.shiny === m.shiny &&
            (!A() || X.groupOf(Da.reg) === de()) &&
            Sn.appendChild(xn(Da));
          const la = T(),
            Xa =
              st &&
              !st.some((nn) => nn.fake) &&
              la.species?.find((nn) => nn[0] === m.id && !!nn[1] === m.shiny);
          (Xa &&
            (Xa[2] !== Zt.length || Xa[3] !== Zt.filter((nn) => ie(nn).length).length) &&
            ((la.species = Zt.length
              ? la.species.map((nn) =>
                  nn === Xa
                    ? [nn[0], nn[1], Zt.length, Zt.filter((F) => ie(F).length).length, Zt.filter(on).length]
                    : nn,
                )
              : la.species.filter((nn) => nn !== Xa)),
            L(la)),
            st
              ? Zt.length || Sn.appendChild(ss(e("Plus aucune offre pour ce Pokémon.")))
              : Sn.appendChild(ss(e("Chargement des offres…"))));
          for (const nn of Zt) Sn.appendChild(qn(nn));
          return;
        }
        const ns = Ut(),
          Ue = ([st]) => (!Mn || Vs.fold(X.DEX[st].name).includes(Mn)) && ft(st),
          Bt = ns
            .filter((st) => (!it.shiny || st[1]) && Ue(st))
            .map((st) => ({ r: st, k: (st[4] ? 4 : 0) + (st[3] ? 2 : 0) + (X.S.dex[st[0]] ? 0 : 1) }))
            .sort((st, Zt) => Zt.k - st.k || Zt.r[2] - st.r[2] || st.r[0] - Zt.r[0] || st.r[1] - Zt.r[1])
            .map((st) => st.r);
        if (!ks && !je.length) return Sn.appendChild(ss(e("Chargement des offres…")));
        if (Bt.length) {
          for (const st of Bt) Sn.appendChild(ae(st));
          return;
        }
        if (Mn.length >= 2 && P()?.user) {
          if (ra.q !== Mn || !ra.offers) return Sn.appendChild(ss(e("Chargement des offres…")));
          const st = Tn(ra.offers.filter((Zt) => cn(Zt) && (!it.shiny || Zt.give_shiny) && ft(Zt.give_id)));
          if ((Sn.classList.remove("ot-spgrid"), st.length)) {
            for (const Zt of st) Sn.appendChild(qn(Zt));
            return;
          }
        }
        Sn.appendChild(
          ss(
            ns.length
              ? e("Aucune offre ne correspond à ta recherche.")
              : X.S.tradeOut
                ? e("Aucune autre offre pour le moment.")
                : e("Aucune offre pour le moment. Propose la tienne !"),
          ),
        );
      },
      Xn = a("#ot-offers");
    if (xe && oa && Xn && a("#ot-q")) {
      ((Xn.innerHTML = ""), us(Xn));
      return;
    }
    const Dn = document.activeElement?.id === "ot-q" ? document.activeElement.selectionStart : null;
    Et.innerHTML = `<div class="map-region ot" style="--c:var(--trade)">
        <div class="map-head"><img src="${ve}" alt=""><h2>${e("Échanges")}</h2>${t.UI.helpTip(e("Échanges"), e("Propose un Pokémon contre une espèce que tu cherches, de même rareté (chromatique contre chromatique), ou un chromatique contre n'importe quel chromatique qui te manque : seul celui qui publie paie des frais. L'offre reste 3 jours, sinon ton Pokémon revient ; celui que tu reçois garde le niveau du tien. Les demandes des habitants, elles, sont gratuites et ne se font qu'une fois."))}${t.UI.sideSeg(de())}</div>
        ${
          oa
            ? An()
            : `<div class="ot-login"><p>${e("Les échanges se font avec les autres dresseurs en ligne : connecte-toi pour proposer et accepter des offres.")}</p>
          <div class="ot-login-btns"><button class="btn ti-discord" data-p="discord">${document.querySelector(".side-disc svg")?.outerHTML || ""}${e("Se connecter avec Discord")}</button><button class="btn ti-google" data-p="google">${P()?.GOOGLE_ICON || ""}${e("Se connecter avec Google")}</button></div></div>`
        }
      </div>${
        oa
          ? `${t.UI.holdNote(Tt.MARKET.OPEN ? e("Tu ne peux ni proposer ni accepter d'échange, ni vendre au Marché.") : e("Tu ne peux ni proposer ni accepter d'échange."))}
      <div class="pc-filters ot-filters">
        <input type="search" id="ot-q" placeholder="${e("Pokémon ou dresseur…")}" value="${ue(it.q)}">
        <button class="chip btn small ghost ${it.shiny ? "on" : ""}" data-f="shiny"><i class="shiny-ico"></i> Shiny</button>
        ${ea()}
      </div>
      <div class="ot-rule"><span><i class="ot-lg get"></i>${e("tu reçois")}<i class="ot-lg give"></i>${e("tu donnes")}</span><span class="ot-next"></span></div>
      <div class="pc-grid ot-board" id="ot-offers"></div>`
          : ""
      }`;
    const ls = Ha();
    if (
      (ls && Et.querySelector(".map-region.ot").after(ls),
      oa && X.S.tradeIn && Et.querySelector(".map-region.ot").after(fn(X.S.tradeIn)),
      Et.querySelectorAll("[data-side]").forEach((Sn) => {
        Sn.onclick = () => {
          ((J = Sn.dataset.side), (m = null), (it.reg = null), Be());
        };
      }),
      !oa)
    ) {
      Et.querySelectorAll("[data-p]").forEach((Sn) => {
        Sn.onclick = () => P()?.signIn(Sn.dataset.p);
      });
      return;
    }
    (yn(),
      Et.querySelectorAll("#ot-post, .ot-box.add:not(.wait)").forEach((Sn) => {
        ((Sn.onclick = ye), P()?.hold && (Sn.disabled = !0));
      }),
      a("#ot-withdraw") && (a("#ot-withdraw").onclick = rt));
    const Hn = a("#ot-q"),
      Kn = () => {
        ((it.q = Hn.value), (m = null), Be(!0), Xt());
      };
    ((Hn.oninput = (Sn) => {
      Sn.isComposing || Kn();
    }),
      Hn.addEventListener("compositionstart", () => {
        Ua = Hn;
      }),
      Hn.addEventListener("compositionend", () => {
        ((Ua = null), Kn(), sn && Be());
      }),
      Dn != null && (Hn.focus(), Hn.setSelectionRange(Dn, Dn)),
      Et.querySelectorAll(".chip[data-f]").forEach((Sn) => {
        Sn.onclick = () => {
          ((it[Sn.dataset.f] = !it[Sn.dataset.f]), Be());
        };
      }),
      Ca(),
      us(a("#ot-offers")));
  }
  function yn() {
    const xe = a("#trade-root .ot-next");
    xe &&
      (xe.innerHTML = De
        ? e("Actualisation…")
        : e("Actualisation dans <b>{time}</b>", { time: dt(R() - Date.now()) }));
    let Et = !1;
    (b("#trade-root [data-until]").forEach((oa) => {
      const sa = +oa.dataset.until - Date.now();
      ((oa.textContent = dt(sa)), sa <= 0 && (Et = !0));
    }),
      Et && !X.S.tradeOut && Be());
  }
  const mn = () =>
    t.CHEAT?.noAnim || X.S.reducedAnim || matchMedia("(prefers-reduced-motion: reduce)").matches;
  async function ln(xe, Et, oa, sa, Ga) {
    if (mn()) return;
    const cn = t.LinkFx,
      Tn = We(oa.name),
      Mn = cn.open({
        cls: "tx-fx",
        title: ue(sa || e("Échange")),
        face: t.UI.trainerFace(oa.sprite, "gx-face", oa.frame),
      });
    try {
      ((Mn.mon.innerHTML = B(xe.id, xe.shiny, { k: 2, fit: 160 })),
        cn.center(Mn.mon),
        await cn.enter(Mn),
        (Mn.mon.style.opacity = ""),
        await Mn.mon.animate(
          [
            { transform: "translateY(-90px) scale(.8, 1.25)", opacity: 0 },
            { transform: "translateY(0) scale(1.3, .72)", opacity: 1, offset: 0.55 },
            { transform: "translateY(-12px) scale(.94, 1.08)", offset: 0.78 },
            { transform: "none", opacity: 1 },
          ],
          { duration: Mn.T(520), easing: "ease-in", fill: "both" },
        ).finished,
        await cn.say(Mn, e("Tu envoies <b>{name}</b>…", { name: ue(X.DEX[xe.id].name) })),
        await Mn.pause(250),
        await cn.send(Mn),
        cn.say(Mn, e("Échange en cours…")),
        await cn.cross(Mn),
        await cn.land(Mn),
        await cn.reveal(Mn, B(Et.id, Et.shiny, { k: 2, fit: 160 }), Et.shiny),
        await cn.say(
          Mn,
          e("Tu reçois <b>{name}</b> de {who} !", {
            name: ue(X.DEX[Et.id].name) + (Et.shiny ? " " + t.UI.shinyIc() : ""),
            who: Tn,
          }),
        ),
        Ga && (await cn.say(Mn, e("Tu en as déjà un…")), await cn.toCandy(Mn, Ga)),
        await cn.finish(Mn));
    } finally {
      await cn.close(Mn);
    }
  }
  const In = (t.Screens.trade = {
    init() {
      (P()?.onSynced(ge),
        P()?.on(() => {
          P().user ? wt() : P().trades.watch(null);
        }),
        Ss(() => {
          He() && yn();
        }, 1e3),
        Ss(wt, 6e4),
        document.addEventListener("visibilitychange", () => {
          document.hidden || wt();
        }));
    },
    enter() {
      ((J = null), (m = null), Kt(), P()?.trades.live(!0), wt());
    },
    leave() {
      P()?.trades.live(!1);
    },
    npcBadge: It,
    npcName: On,
    render: Be,
    picker: Gt,
    monBox: ca,
    npcAsk(xe) {
      const { give: Et, get: oa, town: sa } = xe,
        Ga = xe.reg || xe.town ? Zn().offerHome(xe) : null;
      return nt({
        title: e(
          sa
            ? Jn(sa)
              ? "Un dresseur d'{town} cherche un {name} !"
              : "Un dresseur de {town} cherche un {name} !"
            : "Un dresseur cherche un {name} !",
          { town: sa && ue(e(sa)), name: ue(X.DEX[Et].name) },
        ),
        hero: za(oa, Et, !1, { big: !0, dest: Ga }),
        text: e("Il échangerait son {get} contre ton {give} : le moins fort de ton PC.", {
          get: ue(X.DEX[oa].name),
          give: ue(X.DEX[Et].name),
        }),
        facts: [
          [e("Tu reçois"), ue(X.DEX[oa].name)],
          [e("Niveau"), e("Le même que le tien")],
          ...Ba(Ga),
          [e("Frais"), e("Aucun")],
        ],
        actions: [
          { label: e("Refuser"), cls: "ghost", value: !1 },
          { label: e("Échanger"), cls: "primary", value: !0 },
        ],
      }).then((cn) => !!cn);
    },
    npcReveal: (xe, Et, oa, sa, Ga) =>
      xt(
        xe,
        Ga || { mon: Et, isNew: oa },
        { name: sa ? On(sa) : e("Dresseur"), sprite: "gentleman" },
        e("Échange"),
      ),
    testOffers(xe = 7) {
      je = [];
      const Et = $e(),
        oa = [
          "Sacha#4242",
          "Ondine#1337",
          "Pierre#0007",
          "Niko#2025",
          "Flora#8080",
          "Régis#3141",
          "Jasmine#5555",
          "Peter#9001",
        ],
        sa = ["blue", "red", "gentleman", "lass", "youngster", "hiker"],
        Ga = Object.keys(X.DEX)
          .map(Number)
          .filter((Mn) => Et.includes(oe(Mn)) && !Z(Mn)),
        cn = (Mn) => Mn[Math.floor(Math.random() * Mn.length)],
        Tn = [...new Set(X.S.mons.filter((Mn) => !X.tradeBlock(Mn)).map((Mn) => Mn.id))].filter((Mn) =>
          Ga.includes(Mn),
        );
      for (let Mn = 0; Mn < xe; Mn++) {
        const ks = X.S.mons.find((Hn) => Hn.shiny && Ga.includes(Hn.id) && !X.tradeBlock(Hn)),
          ss = Mn === 1 || (Mn === 2 && !!ks),
          us = Mn === 2 && ks ? ks.id : Mn < 3 && Tn.length ? cn(Tn) : cn(Ga),
          Xn = Ga.filter(
            (Hn) =>
              Hn !== us &&
              X.tierIndex(Hn) === X.tierIndex(us) &&
              (oe(Hn) === oe(us)) != (Mn === 6 && Et.length > 1),
          ),
          Dn = (Mn === 3 && Xn.find((Hn) => !X.S.dex[Hn])) || cn(Xn.length ? Xn : [us]),
          ls = X.makeMon(Dn, 20);
        if (((ls.shiny = ss), Mn === 5)) {
          const Hn = X.S.mons.filter((Sn) => Sn.shiny && Ga.includes(Sn.id) && !X.tradeBlock(Sn)),
            Kn = Hn.length
              ? X.makeMon(cn(Ga.filter((Sn) => X.tierIndex(Sn) === X.tierIndex(Hn[0].id))), 20)
              : ls;
          ((Kn.shiny = !0),
            je.push({
              id: `fake-${Mn}-${Date.now()}`,
              fake: !0,
              owner_name: oa[Mn % oa.length],
              owner_sprite: cn(sa),
              give_id: Kn.id,
              give_shiny: !0,
              want_id: et,
              have: [Kn.id, ...Hn.slice(0, 1).map((Sn) => Sn.id)],
              give_mon: tt(Kn),
              reg: oe(Kn.id),
              expires_at: new Date(Date.now() + 20 * 36e5).toISOString(),
            }));
          continue;
        }
        je.push({
          id: `fake-${Mn}-${Date.now()}`,
          fake: !0,
          friend: Mn === 4,
          owner_name: oa[Mn % oa.length],
          owner_sprite: cn(sa),
          give_id: Dn,
          give_shiny: ss,
          want_id: us,
          give_mon: tt(ls),
          reg: oe(us),
          expires_at: new Date(Date.now() + (Mn + 1) * 9 * 36e5).toISOString(),
        });
      }
      return (Be(), je.length);
    },
    demo: (xe = 25, Et = 94, oa = !1) =>
      ln(
        { id: xe },
        { id: Et, shiny: oa },
        { name: "Sacha#4242", sprite: "blue" },
        "Ton offre a été acceptée !",
      ),
  });
})();
