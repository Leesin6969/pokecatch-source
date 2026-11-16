/**
 * screen shop
 *
 * Public API on the game namespace `t`: t.Screens.shop
 *
 * Recovered from the shipped bundle — original chunk #76 at byte 2014096 (10083 bytes, sha256:eb2ae2b5c6d7e81d).
 * This file is one original source file; the build concatenates them in filename order.
 */
(function () {
  const { $: a, h: b, fmt: f, itemSrc: ue, itemName: H, esc: vt, toast: B, tween: se, burst: Ge } = t.UI,
    Je = t.Game,
    Ze = t.CONFIG,
    x = [
      {
        key: "train",
        title: e("Entraînement"),
        icon: "assets/items/exp-candy-m.png",
        hint: e("Pour faire progresser ton équipe plus vite"),
      },
      {
        key: "evo",
        title: e("Objets d'évolution"),
        icon: "assets/items/moon-stone.png",
        hint: e("S'utilisent depuis la fiche d'un Pokémon"),
      },
    ],
    $ = {},
    X = (Re) => (Ze.EXP_CANDIES[Re.id] ? "train" : "evo"),
    Tt = (Re, dt) => (Re === "max" ? Math.max(1, Math.floor(Je.S.money / dt)) : Re),
    le = new Map();
  function P(Re) {
    const dt = Je.shopPrice(Re),
      qe = ue(Re.icon || Re.id),
      ce = Re.label ? e(Re.label) : H(Re.id),
      tt = Ze.EXP_CANDIES[Re.id] ? `${e(Re.desc)} +${f(Je.expCandyXp(Re.id))} ${e("XP")}.` : e(Re.desc),
      mt = Je.itemCount(Re.id),
      Te = Re.once && !Je.S.adv?.gifts?.[Re.once] && t.UI.itemWhere(Re.id)?.find,
      At = Re.once && !Je.S.adv?.gifts?.[Re.once] && t.UI.itemWhere(Re.id)?.under,
      yt = !Je.shopUnlocked(Re) || !!Te || !!At,
      he = (Re.qty && $[Re.id]) || 1;
    let fe = Tt(he, dt);
    const Oe = Te
        ? `<div class="sh-bottom"><button class="sh-find" data-ch="${Te.ch}" title="${e("voir dans la Progression")}">${t.UI.lockIc}${e("À trouver d'abord : {place} ›", { place: vt(e(Te.place)) })}</button></div>`
        : At
          ? `<div class="sh-bottom"><button class="sh-find" data-ug="1" title="${e("Voir le Souterrain")}">${t.UI.lockIc}${e("À trouver d'abord : {place} ›", { place: vt(e("Souterrain")) })}</button></div>`
          : yt
            ? `<div class="sh-bottom"><span class="sh-owned">${e("Possédé : {n}", { n: `<b>${f(mt)}</b>` })}</span><span class="sh-lock">${t.UI.lockIc}${e("{n}ᵉ badge de {region}", { n: Je.shopBadges(Re), region: vt(e(Je.shopRegion().name)) })}</span></div>`
            : Re.qty
              ? `<div class="sh-price"><span class="unit"></span><b class="total"></b></div>
          <div class="sh-buy"><div class="seg">${[...Ze.SHOP_QTY, "max"].map((L) => `<button data-n="${L}" class="${L === he ? "on" : ""}">${L === "max" ? e("Max") : `×${L}`}</button>`).join("")}</div><button class="btn primary buy">${e("Acheter")}</button></div>`
              : `<div class="sh-bottom"><span class="sh-owned">${e("Possédé : {n}", { n: `<b>${f(mt)}</b>` })}</span><button class="btn primary buy">${f(dt)} ₽</button></div>`,
      Ee = `<div class="sh-item${yt ? " locked" : ""}" data-id="${Re.id}">
      <div class="sh-top"><div class="sh-ic"><img src="${qe}" alt="">${Re.amount > 1 ? `<span class="mult">×${Re.amount}</span>` : ""}${Re.qty ? `<span class="have">×${f(mt)}</span>` : ""}</div>
        <div class="sh-name"><h4>${vt(ce)}</h4>${Re.qty ? "" : `<small>${vt(tt)}</small>`}</div></div>
      ${Re.qty ? `<p>${vt(tt)}</p>` : ""}
      ${Oe}
    </div>`,
      et = Ee + "|" + Je.S.money,
      _ = le.get(Re.id);
    if (_?.key === et) return _.el;
    const we = b(Ee);
    le.set(Re.id, { key: et, el: we });
    const ie = we.querySelector(".sh-find");
    ie?.dataset.ug
      ? (ie.onclick = () => t.App.show("underground"))
      : ie &&
        (ie.onclick = () => {
          const L = t.STORY,
            R = L.regionOf(+ie.dataset.ch);
          t.Screens.map.open(R.key, +ie.dataset.ch);
        });
    const U = we.querySelector(".buy");
    if (!U) return we;
    const Ne = () => {
        const L = Je.S.money < dt * fe;
        if (((U.disabled = L), !Re.qty)) return;
        const R = we.querySelector(".total");
        ((R.textContent = `${f(dt * fe)} ₽`),
          R.classList.toggle("short", L),
          (we.querySelector(".unit").textContent =
            `${$[Re.id] === "max" ? `×${f(fe)} · ` : ""}${e("{price} ₽ l'unité", { price: f(dt) })}`));
      },
      T = we.querySelector(".seg");
    if (T) {
      const L = b('<span class="seg-thumb"></span>');
      T.prepend(L);
      const R = (te) => {
        ((L.style.width = `${te.offsetWidth}px`), (L.style.transform = `translateX(${te.offsetLeft}px)`));
      };
      (es(() => {
        ((L.style.transition = "none"),
          R(T.querySelector(".on") || T.querySelector("button")),
          L.offsetWidth,
          (L.style.transition = ""));
      }),
        T.querySelectorAll("button").forEach(
          (te) =>
            (te.onclick = () => {
              const K = ($[Re.id] = te.dataset.n === "max" ? "max" : +te.dataset.n);
              ((fe = Tt(K, dt)),
                T.querySelectorAll("button").forEach((He) => He.classList.toggle("on", He === te)),
                R(te),
                Ne());
            }),
        ));
    }
    return (
      Ne(),
      (U.onclick = () => {
        if (!Je.buy(Re, fe)) {
          t.Sfx.error();
          return;
        }
        t.Sfx.buy();
        const L = we.querySelector(".sh-ic");
        se(
          L,
          [{ transform: "scale(1)" }, { transform: "scale(1.2) rotate(-6deg)" }, { transform: "scale(1)" }],
          { duration: 320, easing: "cubic-bezier(.3,1.6,.5,1)" },
        );
        const R = L.getBoundingClientRect(),
          te = b('<div style="position:fixed;inset:0;pointer-events:none;z-index:70"></div>');
        (document.body.appendChild(te),
          Ge(te, R.left + R.width / 2, R.top + R.height / 2, { n: 8, dist: 50, size: 10 }),
          Wa(() => te.remove(), 1300),
          B(
            fe > 1
              ? e("{n} × {item} achetés !", { n: fe, item: vt(ce) })
              : e("{item} acheté !", { item: vt(ce) }),
            qe,
          ),
          t.App.refresh());
      }),
      we
    );
  }
  const u = [
      [e("Bonbons"), (Re) => Re.startsWith("exp-candy") || Re === "rare-candy"],
      [e("Objets d'évolution"), (Re) => Ze.SHOP.some((dt) => dt.id === Re)],
      [e("Baies"), (Re) => Re in Ze.BUFF_BERRIES || Re in Ze.PENSION.BERRIES],
      [e("Divers"), () => !0],
    ],
    ve = {};
  function it(Re) {
    const dt = Je.sellPrice(Re),
      qe = Je.itemCount(Re),
      ce = H(Re),
      tt = ue(Re),
      mt = ve[Re] || 1,
      Te = (et) => (et === "all" ? qe : Math.min(et, qe));
    let At = Te(mt);
    const yt = b(`<div class="sh-item sh-sell" data-id="${Re}">
      <div class="sh-top"><div class="sh-ic"><img src="${tt}" alt=""><span class="have">×${f(qe)}</span></div>
        <div class="sh-name"><h4>${vt(ce)}</h4><small>${e("{price} ₽ l'unité", { price: f(dt) })}</small></div></div>
      <div class="sh-price"><span class="unit"></span><b class="total"></b></div>
      <div class="sh-buy"><div class="seg">${[1, 10, "all"].map((et) => `<button data-n="${et}" class="${et === mt ? "on" : ""}" ${et !== "all" && et > qe ? "disabled" : ""}>${et === "all" ? e("Tout") : `×${et}`}</button>`).join("")}</div><button class="btn primary sell">${e("Vendre")}</button></div>
    </div>`),
      he = () => {
        ((yt.querySelector(".total").textContent = `+${f(dt * At)} ₽`),
          (yt.querySelector(".unit").textContent = e("{n} sur {have}", { n: f(At), have: f(qe) })));
      },
      fe = yt.querySelector(".seg"),
      Oe = b('<span class="seg-thumb"></span>');
    fe.prepend(Oe);
    const Ee = (et) => {
      ((Oe.style.width = `${et.offsetWidth}px`), (Oe.style.transform = `translateX(${et.offsetLeft}px)`));
    };
    return (
      es(() => {
        ((Oe.style.transition = "none"),
          Ee(fe.querySelector(".on") || fe.querySelector("button")),
          Oe.offsetWidth,
          (Oe.style.transition = ""));
      }),
      fe.querySelectorAll("button").forEach(
        (et) =>
          (et.onclick = () => {
            const _ = (ve[Re] = et.dataset.n === "all" ? "all" : +et.dataset.n);
            ((At = Te(_)),
              fe.querySelectorAll("button").forEach((we) => we.classList.toggle("on", we === et)),
              Ee(et),
              he());
          }),
      ),
      he(),
      (yt.querySelector(".sell").onclick = () => {
        const et = Je.sell(Re, At);
        if (!et) {
          t.Sfx.error();
          return;
        }
        (t.Sfx.buy(),
          B(
            At > 1
              ? e("{n} × {item} vendus : +{p} ₽", { n: At, item: vt(ce), p: f(et) })
              : e("{item} vendu : +{p} ₽", { item: vt(ce), p: f(et) }),
            tt,
          ),
          t.App.refresh());
      }),
      yt
    );
  }
  function De() {
    const Re = b('<section class="sh-counter"></section>'),
      dt = Object.keys(Je.S.items).filter((ce) => Je.itemCount(ce) > 0 && Je.sellPrice(ce) > 0),
      qe = new Set();
    for (const [ce, tt] of u) {
      const mt = dt
        .filter((At) => !qe.has(At) && tt(At))
        .sort((At, yt) => Je.itemCount(yt) - Je.itemCount(At));
      if (!mt.length) continue;
      (mt.forEach((At) => qe.add(At)), Re.appendChild(b(`<div class="sh-eyebrow">${vt(ce)}</div>`)));
      const Te = re();
      (mt.forEach((At) => Te.appendChild(it(At))), Re.appendChild(Te));
    }
    return (
      qe.size || Re.appendChild(b(`<p class="sh-empty">${e("Rien à vendre pour le moment.")}</p>`)),
      Re
    );
  }
  const je = "pc-shop-mode";
  let pt = "buy";
  try {
    localStorage.getItem(je) === "sell" && (pt = "sell");
  } catch {}
  const re = () => b('<div class="sh-grid"></div>'),
    We = "pc-shop-sec";
  let oe = null;
  try {
    oe = localStorage.getItem(We);
  } catch {}
  function $e() {
    return [
      {
        key: "shop",
        name: e("Boutique Pokémon"),
        short: e("Boutique"),
        icon: "assets/ui/pokemart.png",
        bal: `${f(Je.S.money)} ₽`,
      },
    ];
  }
  const Z = (Re) =>
      `<b><span class="full">${vt(Re.name)}</span><span class="short">${vt(Re.short || Re.name)}</span></b>`,
    A = (Re) =>
      Re.locked || Re.soon
        ? `<div class="rg soon${Re.locked ? " lock" : ""} sh-rg" style="--c:var(--shop)" title="${vt(Re.name)}"><span class="sh-rg-ic"><img src="${Re.icon}" alt=""></span><span class="sh-rg-t">${Z(Re)}<small>${Re.soon ? e("Bientôt…") : vt(Re.locked)}</small></span></div>`
        : `<button class="rg open sh-rg ${Re.key === oe ? "active" : ""}" data-sh-sec="${Re.key}" style="--c:var(--shop)" title="${vt(Re.name)}"><span class="sh-rg-ic"><img src="${Re.icon}" alt=""></span>
      <span class="sh-rg-t">${Z(Re)}<small>${Re.bal}</small></span></button>`;
  function J() {
    const Re = t.scrollY,
      dt = !!_e;
    (de(), !dt && t.scrollY !== Re && t.scrollTo({ top: Re, behavior: "instant" }));
  }
  function de() {
    const Re = a("#shop-grid"),
      dt = $e(),
      qe = dt.filter((yt) => !yt.locked && !yt.soon);
    qe.some((yt) => yt.key === oe) || (oe = "shop");
    const ce = qe.find((yt) => yt.key === oe);
    ((a("#shop-sum").innerHTML = `<span><b>${ce.bal}</b></span>`), (Re.innerHTML = ""));
    const tt = b(`<div class="pg-regions sh-band">${dt.map(A).join("")}</div>`);
    (tt.querySelectorAll("[data-sh-sec]").forEach(
      (yt) =>
        (yt.onclick = () => {
          oe = yt.dataset.shSec;
          try {
            localStorage.setItem(We, oe);
          } catch {}
          J();
        }),
    ),
      dt.length > 1 && Re.appendChild(tt));
    const mt = tt.querySelector(".sh-rg.active");
    if (mt) {
      const yt = tt.getBoundingClientRect(),
        he = mt.getBoundingClientRect();
      (he.left < yt.left || he.right > yt.right) && (tt.scrollLeft += he.left - yt.left);
    }
    const Te = b(
      `<div class="seg cs-tabs sh-tabs"><button class="${pt === "buy" ? "on" : ""}" data-sh-mode="buy">${e("Acheter")}</button><button class="${pt === "sell" ? "on" : ""}" data-sh-mode="sell">${e("Vendre")}</button></div>`,
    );
    if (
      (Te.querySelectorAll("[data-sh-mode]").forEach(
        (yt) =>
          (yt.onclick = () => {
            if (pt !== yt.dataset.shMode) {
              pt = yt.dataset.shMode;
              try {
                localStorage.setItem(je, pt);
              } catch {}
              J();
            }
          }),
      ),
      Re.appendChild(Te),
      Re.classList.toggle("sh-selling", pt === "sell"),
      pt === "sell")
    ) {
      Re.appendChild(De());
      return;
    }
    const At = b('<section class="sh-counter"></section>');
    for (const yt of x) {
      const he = Ze.SHOP.filter(
        (Oe) =>
          X(Oe) === yt.key &&
          (!Oe.region || t.STORY.regionUnlocked(Oe.region, Je.S.adv)) &&
          (!Oe.once ||
            Je.S.adv?.gifts?.[Oe.once] ||
            ((Ee) => Ee?.find?.reached || (Ee?.under && !Ee.under.lock))(t.UI.itemWhere(Oe.id))),
      );
      if (!he.length) continue;
      At.appendChild(
        b(`<div class="sh-eyebrow">${vt(yt.title)}${yt.hint ? `<small>${vt(yt.hint)}</small>` : ""}</div>`),
      );
      const fe = re();
      (he.forEach((Oe) => fe.appendChild(P(Oe))), At.appendChild(fe));
    }
    if ((Re.appendChild(At), _e)) {
      const yt = Re.querySelector(`.sh-item[data-id="${_e}"]`);
      ((_e = null),
        yt &&
          (yt.scrollIntoView({ block: "center", behavior: "smooth" }),
          yt.classList.add("here"),
          Wa(() => yt.classList.remove("here"), 3400)));
    }
  }
  let _e = null;
  t.Screens.shop = {
    render: J,
    init() {
      t.UI.headTip(
        "#screen-shop .map-head h2",
        e("Boutique"),
        e(
          "La Boutique Pokémon vend des Bonbons Exp. et des objets d'évolution : de nouveaux articles s'ouvrent avec tes badges, et un objet rare de l'aventure n'y est vendu qu'une fois le premier trouvé en route.",
        ),
      );
    },
    open(Re) {
      ((oe = "shop"), (pt = "buy"), (_e = Re), t.App.show("shop"));
    },
  };
})();
