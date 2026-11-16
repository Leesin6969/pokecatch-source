/**
 * screen friends
 *
 * Public API on the game namespace `t`: t.Screens.friends
 *
 * Recovered from the shipped bundle — original chunk #80 at byte 2174725 (8196 bytes, sha256:8efbb1cb40c0f0bf).
 * This file is one original source file; the build concatenates them in filename order.
 */
(function () {
  const { $: a, esc: b, sprBox: f, trainerFace: ue } = t.UI,
    H = t.Game,
    vt = () => t.Cloud;
  let B = !1,
    se = "",
    Ge = 0;
  const Je = 5 * 6e4,
    Ze = () => Date.now() - Ge < Je,
    x = 30,
    $ = {
      not_signed_in: e("Connecte-toi pour ajouter des amis."),
      bad_code: e("Tape le nom et le numéro, comme <b>Sacha#1234</b>."),
      not_found: e("Aucun dresseur en ligne avec ce nom. Vérifie le numéro après le #."),
      ambiguous: e("Plusieurs dresseurs portent ce nom : demande-lui de vérifier son numéro."),
      self: e("C'est toi, ça 😄"),
      already: e("Vous êtes déjà amis (ou une demande est en cours)."),
      full: e("Ta liste est pleine ({n} amis, demandes envoyées comprises).", { n: x }),
      their_full: e("Sa liste est pleine ({n} amis).", { n: x }),
      held: e("Amis désactivés : activité anormale détectée."),
    },
    X = () => !!vt()?.hold?.hidden,
    Tt = () => (H.S.trainer ? `${H.S.trainer.name}#${H.S.trainer.tag}` : ""),
    le = (Z) => `${b(Z.name || "???")}<span class="tag">#${b(Z.tag || "????")}</span>`;
  function P(Z) {
    if (!Z) return e("jamais en ligne");
    const A = (Date.now() - Date.parse(Z)) / 36e5;
    return A < 1
      ? e("vu il y a moins d'une heure")
      : A < 24
        ? e("vu il y a {n} h", { n: Math.floor(A) })
        : e("vu il y a {n} j", { n: Math.floor(A / 24) });
  }
  const u = (Z) => {
      const A = t.STORY;
      return Array.isArray(Z.badgeList) && Z.badgeList.length
        ? Z.badgeList.filter(
            (J) => A.BADGE_IMG[J] || A.BADGE_IMG_JOHTO[J] || A.BADGE_IMG_HOENN[J] || A.BADGE_IMG_SINNOH[J],
          ).length
        : Z.badges;
    },
    ve = () => vt()?.friends.list.filter((Z) => Z.incoming).length || 0,
    it = (Z, A) =>
      (Z.team || [])
        .filter((J) => H.DEX[J?.id])
        .map(
          (J) =>
            `<span class="dc-hero fr-mon" style="--m:${A}" title="${b(H.DEX[J.id].name)} · ${e("Nv. {n}", { n: J.level })}">${J.shiny ? `<img class="mon-sh" src="assets/ui/sparkle.svg" alt="${e("Chromatique")}">` : ""}${t.UI.rankTag(J)}${f(J.id, J.shiny, 1, A - 4)}<span class="rt-lv">${J.level}</span></span>`,
        )
        .join(""),
    De = (
      Z,
      A,
      J = "",
    ) => `<div class="mp-row fr-row ${Z.status === "accepted" ? "" : Z.incoming ? "fr-in" : "fr-out"}" ${J}>${ue(Z.sprite, "fr-face", Z.frame)}
      <span class="t"><b>${le(Z)}</b><small>${Z.status === "accepted" ? e("{b} badges · {d} au Pokédex · {seen}", { b: u(Z), d: Z.dex, seen: P(Z.seen) }) : Z.incoming ? e("veut être ton ami") : e("demande envoyée")}</small></span>
      <span class="lv">${A}</span></div>`;
  function je() {
    const Z = a("#friends-root");
    if (!Z) return;
    const A = !!vt()?.user || !!vt()?.friends?.isTest,
      J = A ? vt().friends.list : [],
      de = J.filter((tt) => tt.status === "accepted"),
      _e = J.filter((tt) => tt.incoming),
      Re = J.filter((tt) => tt.status === "pending" && !tt.incoming),
      dt = (tt, mt, Te) => `<h4>${tt}<em>${mt}</em></h4>${Te}`,
      qe = X();
    if (
      ((Z.innerHTML = `<div class="map-region fr" style="--c:var(--friend)">
      <div class="map-head"><img src="assets/items/friend-ball.png" alt=""><h2>${e("Amis")}</h2>${t.UI.helpTip(e("Amis"), e("Ajoute un dresseur avec son code ami (Nom#1234), jusqu'à {n}. Un ami qui a déjà affronté le boss du jour peut te rejoindre en Raid avec ses vrais Pokémon, et ses offres d'échange passent en tête.", { n: x }))}<div class="map-sum">
        ${A ? `<span>${de.length > 1 ? e("<b>{n}</b> amis", { n: de.length }) : e("<b>{n}</b> ami", { n: de.length })}</span><button class="btn outline small" data-fr-refresh ${B || Ze() ? "disabled" : ""}>${e("⟳ Actualiser")}</button>` : ""}</div></div>
      ${
        A
          ? `${qe ? t.UI.holdNote(e("Tes amis ne te voient plus, et tu ne peux plus en ajouter.")) : ""}<div class="fr-body">
        <div class="fr-add">
          <div class="fr-me"><small>${e("Ton code ami")}</small><b>${b(H.S.trainer?.name || "")}<span class="tag">#${b(H.S.trainer?.tag || "")}</span></b><button class="btn outline small" data-fr-copy>${e("Copier")}</button></div>
          <form class="fr-form" data-fr-form><input type="text" id="fr-code" placeholder="${e("Nom#1234")}" maxlength="30" autocomplete="off" value="${b(se)}">
            <button class="btn gold" type="submit" ${B || qe ? "disabled" : ""}>${e("Ajouter")}</button></form>
          <p class="fr-msg" id="fr-msg"></p>
        </div>
        <div class="mp-list fr-list">
          ${_e.length ? dt(e("Demandes reçues"), _e.length, _e.map((tt) => De(tt, `<button class="btn small green" data-fr-yes="${tt.uid}" ${qe ? "disabled" : ""}>${e("Accepter")}</button><button class="btn small danger" data-fr-no="${tt.uid}">${e("Refuser")}</button>`, `data-fr-req="${tt.uid}" role="button" tabindex="0"`)).join("")) : ""}
          ${dt(e("Amis"), de.length, de.length ? de.map((tt) => De(tt, `<span class="fr-team">${it(tt, 40)}</span>`, `data-fr-open="${tt.uid}" role="button" tabindex="0"`)).join("") : `<p class="fr-empty">${e("Pas encore d'amis. Envoie ton code à quelqu'un, ou ajoute le sien !")}</p>`)}
          ${Re.length ? dt(e("Demandes envoyées"), Re.length, Re.map((tt) => De(tt, `<button class="btn ghost small" data-fr-cancel="${tt.uid}">${e("Annuler")}</button>`)).join("")) : ""}
          <p class="raid-hint">${e("Tes amis apparaissent en tête des alliés proposés dans les raids.")}</p>
        </div></div>`
          : `<div class="ot-login"><p>${e("Les amis se retrouvent en ligne : connecte-toi pour ajouter des amis et partir en raid avec leurs Pokémon.")}</p>
          <div class="ot-login-btns"><button class="btn ti-discord" data-p="discord">${document.querySelector(".side-disc svg")?.outerHTML || ""}${e("Se connecter avec Discord")}</button><button class="btn ti-google" data-p="google">${vt()?.GOOGLE_ICON || ""}${e("Se connecter avec Google")}</button></div></div>`
      }
    </div>`),
      !A)
    ) {
      Z.querySelectorAll("[data-p]").forEach((tt) => {
        tt.onclick = () => vt()?.signIn(tt.dataset.p);
      });
      return;
    }
    const ce = a("#fr-code");
    ((ce.oninput = () => {
      se = ce.value;
    }),
      (Z.querySelector("[data-fr-form]").onsubmit = (tt) => {
        (tt.preventDefault(), We(ce.value));
      }),
      (Z.querySelector("[data-fr-copy]").onclick = () =>
        navigator.clipboard?.writeText(Tt()).then(
          () => t.UI.toast(e("Code ami copié !")),
          () => t.UI.toast(b(Tt())),
        )),
      (Z.querySelector("[data-fr-refresh]").onclick = () => {
        Ze() || ((Ge = Date.now()), Wa(je, Je + 50), pt(() => vt().friends.refresh()));
      }),
      Z.querySelectorAll("[data-fr-yes]").forEach((tt) => (tt.onclick = () => re(tt.dataset.frYes))),
      Z.querySelectorAll("[data-fr-no]").forEach(
        (tt) => (tt.onclick = () => pt(() => vt().friends.respond(tt.dataset.frNo, !1))),
      ),
      Z.querySelectorAll("[data-fr-cancel]").forEach(
        (tt) => (tt.onclick = () => pt(() => vt().friends.remove(tt.dataset.frCancel))),
      ),
      Z.querySelectorAll("[data-fr-open]").forEach((tt) => {
        ((tt.onclick = () => oe(J.find((mt) => mt.uid === tt.dataset.frOpen))),
          (tt.onkeydown = (mt) => {
            mt.key === "Enter" && tt.onclick();
          }));
      }),
      Z.querySelectorAll("[data-fr-req]").forEach((tt) => {
        ((tt.onclick = (mt) => {
          mt?.target.closest("button") || $e(J.find((Te) => Te.uid === tt.dataset.frReq));
        }),
          (tt.onkeydown = (mt) => {
            mt.key === "Enter" && mt.target === tt && tt.onclick();
          }));
      }));
  }
  async function pt(Z, A) {
    if (B) return;
    ((B = !0), je());
    const J = await Z();
    return (
      (B = !1),
      je(),
      J?.error
        ? t.UI.toast(e("Connexion impossible pour le moment. Réessaie plus tard."))
        : A && t.UI.toast(A),
      J
    );
  }
  async function re(Z) {
    if (X()) return (t.Sfx?.error?.(), t.UI.toast($.held));
    const A = await pt(() => vt().friends.respond(Z, !0));
    if (!A || A.error) return;
    const J = vt().friends.list.find((de) => de.uid === Z);
    t.UI.toast(
      J?.status === "accepted"
        ? e("Nouvel ami !")
        : vt().friends.list.filter((de) => de.status === "accepted").length >= x
          ? $.full
          : $.their_full,
    );
  }
  async function We(Z) {
    const A = (de) => {
      const _e = a("#fr-msg");
      _e && (_e.innerHTML = de);
    };
    if (X()) return A($.held);
    if (((Z = Z.trim().replace(/\s*#\s*/, "#")), !/^.+#\d{4}$/.test(Z))) return A($.bad_code);
    const J = await pt(() => vt().friends.request(Z));
    if (!(!J || J.error)) {
      if (!J.data?.ok) return A($[J.data?.error] || $.not_found);
      ((se = ""), je(), t.UI.toast(J.data.accepted ? e("Nouvel ami !") : e("Demande envoyée !")));
    }
  }
  async function oe(Z) {
    if (
      !Z ||
      (await t.TrainerCard.openFriend(Z, [
        { label: e("Retirer de mes amis"), cls: "outline", value: "remove" },
      ])) !== "remove"
    )
      return;
    (await t.UI.modal({
      className: "dexcard-modal",
      body: `<div class="dc-head"><h2>${e("Retirer {name} ?", { name: b(Z.name) })}</h2></div><p class="fr-confirm">${e("Il ne sera plus proposé comme allié de raid. Vous pourrez redevenir amis plus tard.")}</p>`,
      actions: [
        { label: e("Annuler"), cls: "ghost", value: !1 },
        { label: e("Retirer"), cls: "danger", value: !0 },
      ],
    })) && pt(() => vt().friends.remove(Z.uid), e("Ami retiré."));
  }
  async function $e(Z) {
    if (!Z) return;
    const A = await t.TrainerCard.openFriend(Z, [
      { label: e("Refuser"), cls: "ghost", value: "no" },
      { label: e("Accepter"), cls: "green", value: "yes" },
    ]);
    A === "yes" ? re(Z.uid) : A === "no" && pt(() => vt().friends.respond(Z.uid, !1));
  }
  t.Screens.friends = {
    init() {
      t.Cloud?.on?.(() => {
        a("#screen-friends.active") && je();
      });
    },
    enter() {
      vt()?.friends.live(!0);
    },
    leave() {
      vt()?.friends.live(!1);
    },
    render: je,
    incoming: ve,
  };
})();
