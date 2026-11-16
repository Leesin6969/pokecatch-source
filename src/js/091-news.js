/**
 * news
 *
 * Public API on the game namespace `t`: t.News
 *
 * Recovered from the shipped bundle — original chunk #90 at byte 2609518 (7228 bytes, sha256:85fd6c8b33f18156).
 * This file is one original source file; the build concatenates them in filename order.
 */
t.News = (function () {
  const { $: a, h: b, esc: f, sprBox: ue, itemSrc: H } = t.UI,
    vt = t.Game,
    B = t.STORY,
    se = 40,
    Ge = 20,
    Je = 50,
    Ze = 3,
    x = () => t.UI.shinyIc() + " ",
    $ = 31 * 6e4,
    X = [],
    Tt = (fe) => f(vt.DEX[fe]?.name || "?"),
    le = (fe) => `<b>${f(fe)}</b>`;
  let P = null;
  const u = (fe) => (
    P ||
      ((P = {}),
      B.CHAPTERS.forEach((Oe) =>
        Oe.steps.forEach((Ee) => {
          Ee.kind === "gym" &&
            Ee.badge &&
            (P[Ee.badge] ||= {
              leader: Ee.leader,
              reg: Oe.reg || "kanto",
              league: !!(Oe.league && Ee.champion),
            });
        }),
      )),
    P[fe]
  );
  function ve(fe, Oe) {
    const Ee = Oe == null,
      et = Ee ? null : le(Oe);
    switch (fe.k) {
      case "shiny":
        return {
          mon: fe.m,
          shiny: !0,
          cls: "shiny",
          html: fe.egg
            ? Ee
              ? x() +
                e('<b>Tu</b> as fait éclore un <b class="shiny">{mon} chromatique</b> !', { mon: Tt(fe.m) })
              : x() +
                e('{p} a fait éclore un <b class="shiny">{mon} chromatique</b> !', { p: et, mon: Tt(fe.m) })
            : Ee
              ? x() +
                e('<b>Tu</b> as capturé un <b class="shiny">{name} chromatique</b> !', { name: Tt(fe.m) })
              : x() +
                e('<b>{p}</b> a capturé un <b class="shiny">{mon} chromatique</b> !', {
                  p: f(Oe),
                  mon: Tt(fe.m),
                }),
        };
      case "legend":
        return {
          mon: fe.m,
          shiny: !!fe.s,
          cls: "legend",
          html: fe.s
            ? Ee
              ? e('🏆 <b>Tu</b> as capturé <b class="legend">{mon} chromatique</b> !', { mon: Tt(fe.m) })
              : e('🏆 {p} a capturé <b class="legend">{mon} chromatique</b> !', { p: et, mon: Tt(fe.m) })
            : Ee
              ? e('🏆 <b>Tu</b> as capturé <b class="legend">{mon}</b> !', { mon: Tt(fe.m) })
              : e('🏆 {p} a capturé <b class="legend">{mon}</b> !', { p: et, mon: Tt(fe.m) }),
        };
      case "badge": {
        const _ = u(fe.b);
        if (!_) return null;
        const we = { badge: f(e(fe.b)), leader: f(e(_.leader)) };
        return {
          badge: fe.b,
          html: Ee
            ? e("<b>Tu</b> as obtenu le <b>Badge {badge}</b> face à {leader}", we)
            : e("<b>{p}</b> a obtenu le <b>Badge {badge}</b> face à {leader}", { p: f(Oe), ...we }),
        };
      }
      case "league":
        return {
          item: "master-ball",
          cls: "league",
          html: Ee
            ? e('🏆 <b>Tu</b> es devenu <b class="legend">Maître de la Ligue</b> !')
            : e('🏆 <b>{p}</b> est devenu <b class="legend">Maître de la Ligue</b> !', { p: f(Oe) }),
        };
      case "trade": {
        const _ = { a: Tt(fe.a), b: Tt(fe.m), w: le(fe.w || "?") };
        return {
          mon: fe.m,
          shiny: !!fe.s,
          html: Ee
            ? e("🔄 <b>Tu</b> as échangé ton {a} avec {w} contre un <b>{b}</b>", _)
            : e("🔄 {p} a échangé un {a} avec {w} contre un <b>{b}</b>", { p: et, ..._ }),
        };
      }
      case "dex":
        return {
          item: "poke-ball",
          html: Ee
            ? e("📖 <b>Tu</b> as enregistré <b>{n} Pokémon</b> dans ton Pokédex", { n: fe.n })
            : e("📖 {p} a enregistré <b>{n} Pokémon</b> dans son Pokédex", { p: et, n: fe.n }),
        };
      case "raid":
        return {
          mon: fe.m,
          shiny: !0,
          cls: "shiny",
          html: Ee
            ? x() +
              e('<b>Tu</b> as capturé le boss du raid : <b class="shiny">{name} chromatique</b> !', {
                name: Tt(fe.m),
              })
            : x() +
              e('{p} a capturé le boss du raid : <b class="shiny">{name} chromatique</b> !', {
                p: et,
                name: Tt(fe.m),
              }),
        };
      case "tower":
        return {
          emoji: "🗼",
          html: Ee
            ? e("🗼 <b>Tu</b> as atteint l'étage <b>{n}</b> de la Tour de Combat", { n: fe.n })
            : e("🗼 {p} a atteint l'étage <b>{n}</b> de la Tour de Combat", { p: et, n: fe.n }),
        };
    }
    return null;
  }
  const it = (fe) => !!B.REGIONS.find((Oe) => Oe.key === fe)?.open,
    De = (fe) => !!vt.DEX[fe] && it(vt.regionOfDex(fe)),
    je = () => Math.max(...B.REGIONS.filter((fe) => fe.open && fe.dex).map((fe) => fe.dex[1]));
  function pt(fe) {
    switch (fe.k) {
      case "shiny":
      case "legend":
        return De(fe.m);
      case "raid":
        return De(fe.m) && (!fe.r || it(fe.r));
      case "trade":
        return De(fe.m) && De(fe.a);
      case "badge": {
        const Oe = u(fe.b);
        return !!Oe && it(Oe.reg);
      }
      case "league":
        return !0;
      case "dex":
        return fe.n <= je();
      case "tower":
        return !!vt.regionDone?.("hoenn");
    }
    return !1;
  }
  function re(fe) {
    return fe.mon
      ? ue(fe.mon, fe.shiny, 1, 36)
      : fe.badge
        ? t.STORY.badgeHtml(fe.badge, 2)
        : fe.item
          ? `<img src="${H(fe.item)}" alt="">`
          : `<span class="news-chat">${fe.emoji || "💬"}</span>`;
  }
  const We = (fe) =>
      `<div class="news-line ${fe.cls || ""} ${fe.me ? "me" : ""}"><span class="news-ic">${re(fe)}</span><span class="news-txt">${fe.html}</span><time>${fe.time}</time></div>`,
    oe = () => `<div class="news-empty">${e("Les exploits des dresseurs s'affichent ici.")}</div>`;
  function $e(fe) {
    const Oe = a("#newsbar .news-feed");
    if (!Oe) return;
    if (!fe) {
      ((Oe.innerHTML = X.length ? [...X].reverse().map(We).join("") : oe()),
        (Oe.scrollTop = Oe.scrollHeight));
      return;
    }
    Oe.querySelector(".news-empty")?.remove();
    const Ee = Oe.scrollHeight - Oe.scrollTop - Oe.clientHeight < 24,
      et = b(We(fe));
    for (Oe.appendChild(et); Oe.children.length > se;) Oe.firstElementChild.remove();
    (et.animate(
      [
        { transform: "translateY(100%)", opacity: 0 },
        { transform: "translateY(0)", opacity: 1 },
      ],
      { duration: 320, easing: "cubic-bezier(.2,.8,.3,1.2)" },
    ),
      Ee && Oe.scrollTo({ top: Oe.scrollHeight, behavior: "smooth" }),
      (fe.cls === "legend" || fe.cls === "league" || fe.cls === "shiny" || fe.me) &&
        et.animate([{ background: "rgba(255,203,5,.25)" }, { background: "rgba(255,203,5,0)" }], 1400));
  }
  let Z = "";
  function A() {
    const fe = a("#newsbar .news-pin"),
      Oe = t.Events;
    if (!fe) return;
    const Ee = Oe.cur,
      et = Oe.unlocked() && Ee ? Ee.seq + Oe.phase(Ee) : "";
    if (et === Z) return;
    const _ = Z === Ee?.seq + "announce" && et === Ee.seq + "open";
    ((Z = et), (fe.innerHTML = t.EventUI.teaser()), t.EventUI.bind(fe));
    const we = fe.firstElementChild;
    we && _ && we.classList.add("reveal");
  }
  function J(fe, Oe) {
    ((fe.time = new Date(fe.at || Date.now()).toLocaleTimeString(t.I18n?.lang || "fr", {
      hour: "2-digit",
      minute: "2-digit",
    })),
      X.unshift(fe),
      X.length > se && X.pop(),
      Oe || $e(fe));
  }
  const de = () => {
      const fe = vt.S;
      return (
        fe.feed || (fe.feed = { at: Date.now(), b: fe.adv?.badges?.length || 0, d: _e(), q: [] }),
        fe.feed
      );
    },
    _e = () => Math.floor(Object.keys(vt.S.dex || {}).length / Je) * Je,
    Re = new Set();
  function dt(fe, { local: Oe } = {}) {
    const Ee = ve(fe);
    if (!Ee || (J({ ...Ee, me: !0 }), Oe || vt.S.feedHidden || !t.Cloud?.user)) return;
    const et = de().q;
    (et.some((_) => _.k === fe.k && _.key === fe.key) || et.push(fe),
      et.length > Ge && et.splice(0, et.length - Ge));
  }
  const qe = (fe) => fe && Re.add(fe);
  function ce() {
    const fe = vt.S,
      Oe = de(),
      Ee = (ie) => !!(vt.DEX[ie.id]?.legendary || vt.DEX[ie.id]?.mythical),
      et = fe.mons.filter((ie) => ie.caughtAt > Oe.at && !ie.ot && (ie.shiny || Ee(ie)));
    et.length &&
      ((Oe.at = Math.max(...et.map((ie) => ie.caughtAt))),
      et
        .filter((ie) => !Re.has(ie.uid) && Ee(ie))
        .slice(0, Ze)
        .forEach((ie) => dt({ k: "legend", key: ie.uid, m: ie.id, s: !!ie.shiny })),
      et
        .filter((ie) => !Re.has(ie.uid) && !Ee(ie))
        .slice(0, Ze)
        .forEach((ie) => dt({ k: "shiny", key: ie.uid, m: ie.id, egg: !ie.where || ie.egg || void 0 })));
    const _ = fe.adv?.badges || [];
    (_.length > Oe.b &&
      _.slice(Oe.b)
        .slice(0, Ze)
        .forEach((ie) => {
          const U = u(ie);
          U && dt(U.league ? { k: "league", key: ie } : { k: "badge", key: ie, b: ie });
        }),
      (Oe.b = _.length));
    const we = _e();
    (we > Oe.d && dt({ k: "dex", key: String(we), n: we }), (Oe.d = we));
  }
  function tt() {
    const fe = vt.S.feed?.q;
    return fe?.length
      ? vt.S.feedHidden || !t.Cloud?.user
        ? ((fe.length = 0), null)
        : fe.slice(0, 10)
      : null;
  }
  function mt(fe) {
    vt.S.feed?.q.splice(0, fe);
  }
  let Te = null,
    At = !0;
  function yt(fe) {
    if (!fe?.ev) return;
    Te = fe.now;
    const Oe = Date.parse(fe.now) - Date.now(),
      Ee = Date.now(),
      et = [];
    for (const _ of fe.ev) {
      const we = { ..._.d, k: _.k },
        ie = Date.parse(_.at) - Oe;
      if (!pt(we)) continue;
      const U = ve(we, _.p || "?");
      if (!U) continue;
      U.at = ie;
      const Ne = ie + $ - Ee;
      Ne > 0 ? Wa(() => J(U), Ne) : et.push(U);
    }
    (At ? (et.slice(-12).forEach((_) => J(_, !0)), $e()) : et.forEach((_, we) => Wa(() => J(_), 1500 * we)),
      (At = !1));
  }
  function he() {
    const fe = a("#newsbar");
    ((fe.innerHTML =
      '<div class="news-pin"></div><div class="news-hold"></div><div class="news-feed"></div>'),
      A(),
      t.Events.on(A));
    const Oe = a(".news-hold", fe);
    let Ee = null;
    const et = () => {
      const ie = t.UI.holdNote(e("Tes captures n'apparaissent pas dans le fil."), !0);
      ie !== Ee && (Oe.innerHTML = Ee = ie);
    };
    (et(), t.Cloud?.on(et));
    const _ = a(".news-feed", fe);
    let we = !0;
    (_.addEventListener("scroll", () => {
      we = _.scrollHeight - _.scrollTop - _.clientHeight < 24;
    }),
      new ResizeObserver(() => {
        we && (_.scrollTop = _.scrollHeight);
      }).observe(_),
      $e(),
      de(),
      Ss(() => document.hidden || ce(), 3e3));
  }
  return {
    init: he,
    post: J,
    share: dt,
    skipMon: qe,
    outbox: tt,
    sent: mt,
    receive: yt,
    get since() {
      return Te;
    },
  };
})();
