/**
 * gifts
 *
 * Public API on the game namespace `t`: t.Gifts
 *
 * Recovered from the shipped bundle — original chunk #84 at byte 2242239 (6195 bytes, sha256:fd19f46c1be2e636).
 * This file is one original source file; the build concatenates them in filename order.
 */
t.Gifts = (function () {
  const a = t.Game,
    { esc: b, h: f, modal: ue, itemSrc: H, itemName: vt, toast: B } = t.UI,
    se = (De) => Number(De).toLocaleString(t.I18n?.lang || "fr"),
    Ge = (De) => b(String(De || e("Dresseur")).split("#")[0]);
  let Je = !1,
    Ze = !1;
  function x(De, je = {}) {
    const pt = a.S,
      re = new Set(De.map(String)),
      We = pt.link?.stash;
    for (const A of $(re, +je.since)) re.add(A);
    const oe = { team: pt.team.length, stash: We?.team.length };
    pt.mons = pt.mons.filter((A) => !re.has(A.uid));
    const $e = a.pension();
    (($e.mons = $e.mons.filter((A) => !re.has(A.mon?.uid))),
      Array.isArray($e.eggs) && ($e.eggs = $e.eggs.filter((A) => !re.has(A.uid))));
    for (const A of pt.under?.slots || [])
      (A.mons && (A.mons = A.mons.filter((J) => !re.has(J.uid))),
        A.team && (A.team = A.team.filter((J) => !re.has(J))));
    pt.tradeOut && !pt.tradeOut.id && re.has(pt.tradeOut.mon?.uid) && delete pt.tradeOut;
    for (const A of [pt.team, pt.road, We?.team, ...Object.values(pt.eventTeams || {})])
      A && A.splice(0, A.length, ...A.filter((J) => !re.has(J)));
    (a.pruneSets(), re.has(pt.buddy?.uid) && (pt.buddy = { uid: null, ko: 0 }));
    const Z = (A, J) => {
      const de = pt.mons.filter((_e) => J(_e) && !pt.team.includes(_e.uid) && !We?.team.includes(_e.uid));
      !A.length && de.length && A.push(a.pick(de).uid);
    };
    (oe.team && Z(pt.team, a.onSide),
      oe.stash && Z(We.team, (A) => (pt.link.side === "to") == (a.regOf(A) !== pt.link.to)));
  }
  function $(De, je) {
    if (!je) return [];
    const pt = a.S,
      re = a.pension(),
      We = (J) => a.famHead(+J),
      oe = (pt.under?.slots || []).flatMap((J) => J.mons || []),
      $e = [...pt.mons, ...oe, ...re.mons.map((J) => J.mon).filter(Boolean)],
      Z = new Set($e.filter((J) => J.shiny && De.has(J.uid)).map((J) => We(J.id)));
    for (const J of re.mons) J.mon?.shiny && !De.has(J.mon.uid) && Z.delete(We(J.mon.id));
    if (!Z.size) return [];
    const A = (J) => {
      const de = parseInt(String(J.uid).slice(0, 8), 36);
      return de > 0 && de <= (J.caughtAt || 1 / 0)
        ? de
        : (J.caughtAt || 0) - t.CONFIG.PENSION.HATCH_MIN * 6e4;
    };
    return [
      ...(re.eggs || []).filter((J) => J.sp && Z.has(We(J.id)) && J.laidAt >= je).map((J) => J.uid),
      ...[...pt.mons, ...oe]
        .filter((J) => J.shiny && J.egg && !J.ot && J.where === "Pension" && Z.has(We(J.id)) && A(J) >= je)
        .map((J) => J.uid),
    ].filter(Boolean);
  }
  function X(De) {
    const je = a
      .ownedMons()
      .filter((re) =>
        re.rank == null
          ? !1
          : !Number.isInteger(re.rank) || re.rank < 0 || re.rank > t.CONFIG.UNDERGROUND.RANK_MAX
            ? (delete re.rank, !1)
            : re.rank > 0,
      );
    let pt = je.reduce((re, We) => re + (We.rank * (We.rank + 1)) / 2, 0);
    for (; pt > De && je.length;) {
      const re = je.reduce((We, oe) => (oe.rank > We.rank ? oe : We));
      ((pt -= re.rank), --re.rank || (delete re.rank, je.splice(je.indexOf(re), 1)));
    }
  }
  function Tt(De) {
    const je = De.payload || {};
    if (De.kind === "mon") {
      if (!a.DEX[+je.id]) return null;
      const pt = a.makeMon(+je.id, +je.level || 5, { shiny: !!je.shiny });
      pt.ot = De.from_name || null;
      const re = a.receive(pt);
      return re.dup
        ? { mon: pt, dup: re.dup }
        : (pt.shiny && (a.S.seenShiny[pt.id] = !0), { mon: pt, isNew: re.isNew });
    }
    if (De.kind === "item")
      return (je.key === "coin" ? a.coinIn(+je.n || 1) : a.addItem(je.key, +je.n || 1), {});
    if (De.kind === "money") return (a.moneyIn(+je.n || 0), {});
    if (De.kind === "take") {
      for (const [re, We] of Object.entries(je.items || {})) {
        const oe = a.itemCount(re);
        oe > +We && a.addItem(re, +We - oe);
      }
      je.money != null && a.S.money > +je.money && (a.S.money = +je.money);
      const pt = a.S.link?.stash;
      return (
        je.money != null && pt && (+pt.money || 0) > +je.money && (pt.money = +je.money),
        Array.isArray(je.mons) && je.mons.length && x(je.mons, je),
        je.ranks != null && X(Math.max(0, +je.ranks || 0)),
        null
      );
    }
    if (De.kind === "rename") {
      const pt = a.S.trainer;
      return !pt ||
        String(pt.name).trim().toLowerCase() !==
          String(je.old || "")
            .trim()
            .toLowerCase()
        ? null
        : ((pt.name = e("Dresseur")), { rename: !0 });
    }
    return null;
  }
  async function le(De, je) {
    if (je.rename) {
      (B(e("Ton nom de dresseur a été réinitialisé par la modération.")), t.TrainerCard?.refreshTrigger());
      return;
    }
    const pt = { name: De.from_name, sprite: De.from_sprite };
    if (De.kind === "mon") {
      if ((await t.GiftFx({ mon: je.mon, from: pt, text: De.message }), t.App.refresh(), je.dup)) {
        const Z = je.dup,
          A = a.famHead(Z.mon.id),
          J = b(a.DEX[A].name),
          de = t.UI.fedXp(Z.fed);
        B(
          de
            ? e("Doublon : +{n} XP pour la famille {fam}", { n: t.UI.fmt(de), fam: J })
            : e("Doublon : famille {fam} au niveau max", { fam: J }),
          t.UI.monSrc(A),
          "reward",
        );
        return;
      }
      await t.UI.showDexCard(je.mon.id, {
        mon: je.mon,
        isNew: je.isNew,
        actions: [{ label: e("Super !"), cls: "gold" }],
      });
      return;
    }
    const re = De.payload,
      We = De.kind === "item",
      oe = We ? `${se(re.n)} × ${b(vt(re.key))}` : `${se(re.n)} ₽`,
      $e = f(`<div><div class="dc-head"><h2>${e("Cadeau !")}</h2></div>
      <div class="ot-dlg-top"><div class="ot-dlg-hero gift-hero">${We ? `<img src="${H(re.key)}" alt="">` : "<span>₽</span>"}</div>
        <div class="dc-id"><div class="genus">${e("<b>{name}</b> t'envoie un cadeau !", { name: Ge(De.from_name) })}</div>
          <div class="dc-facts ot-facts"><div class="dc-fact">${e("Tu reçois")}<b>${oe}</b></div></div>
          ${De.message ? `<div class="gift-note">${e("« {msg} »", { msg: b(De.message) })}</div>` : ""}</div></div></div>`);
    (t.Sfx.caught?.(),
      await ue({
        className: "dexcard-modal ot-dlg gift-dlg",
        body: $e,
        actions: [{ label: e("Super !"), cls: "gold" }],
      }));
  }
  let P = null;
  async function u() {
    const De = t.Cloud.ban,
      je = De && JSON.stringify(De);
    if (!De || je === P) return;
    P = je;
    const pt =
        De.until &&
        new Date(De.until).toLocaleDateString(t.I18n?.lang || "fr", {
          day: "numeric",
          month: "long",
          year: "numeric",
        }),
      re =
        f(`<div><div class="dc-head"><h2>${e("Compte suspendu")}</h2><div class="dc-sum"><button class="dc-x" aria-label="${e("Fermer")}">✕</button></div></div>
      <p class="cl-note">${pt ? e("Ton compte est suspendu jusqu'au {date}.", { date: b(pt) }) : "until" in De ? e("Ton compte est suspendu définitivement.") : e("Ton compte est suspendu.")}</p>
      ${De.reason ? `<div class="gift-note">${e("Motif : {reason}", { reason: b(De.reason) })}</div>` : ""}
      <p class="cl-note">${e("Tu peux continuer à jouer sur cet appareil, mais plus en ligne : sauvegarde, classements, échanges et amis.")}</p></div>`);
    await ue({
      className: "dexcard-modal cl-wiped",
      body: re,
      actions: [{ label: e("Compris !"), cls: "primary", value: !0 }],
      onOpen: (We, oe) => {
        We.querySelector(".dc-x").onclick = () => oe(!0);
      },
    });
  }
  async function ve() {
    if (!(!Je || Ze)) {
      Ze = !0;
      try {
        await u();
        for (const De of t.Cloud.gifts.take()) {
          const je = (a.S.giftsGot = a.S.giftsGot || []);
          if (je.includes(De.id)) continue;
          const pt = Tt(De);
          (je.push(De.id),
            je.length > 200 && je.splice(0, je.length - 200),
            a.save(),
            t.Cloud.gifts.claim(De.id).then((re) => {
              re.error && console.warn("Gift claim failed", re.error);
            }),
            t.Cloud.pushNow(),
            pt && (await le(De, pt)),
            t.App.refresh());
        }
      } finally {
        Ze = !1;
      }
    }
  }
  function it() {
    ((Je = !0), u(), t.Cloud.onChecked(ve), t.Cloud.onSynced(ve));
  }
  return { start: it, drain: ve };
})();
