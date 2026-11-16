/**
 * screen achievements
 *
 * Public API on the game namespace `t`: t.Screens.achievements
 *
 * Recovered from the shipped bundle — original chunk #70 at byte 1921695 (6174 bytes, sha256:32c824088627688d).
 * This file is one original source file; the build concatenates them in filename order.
 */
(function () {
  const { $: a, esc: b, fmt: f, trainerFace: ue, artSrc: H, monSrc: vt, hasArt: B } = t.UI,
    se = t.Game,
    Ge = () => t.TrainerCard,
    Je = () => t.Screens.adventure,
    Ze = 0.75,
    x = "pc-ach";
  let $ = { cat: "look" };
  try {
    $ = { ...$, ...JSON.parse(localStorage.getItem(x)) };
  } catch {}
  ["look", "frame", "cin"].includes($.cat) || ($.cat = "look");
  const X = () => {
      try {
        localStorage.setItem(x, JSON.stringify($));
      } catch {}
    },
    Tt = (re) => re.n / re.m,
    le = (re) => !re.done && !re.away && Tt(re) >= Ze;
  function P(re) {
    return re.kind === "look"
      ? `<span class="dc-hero tc-lav ach-rw${re.done ? " got" : ""}"><img src="${re.src}" alt=""></span>`
      : `<span class="tc-flav ach-rw${re.done ? " got" : ""}">${ue(se.S.trainer.sprite, "tc-fface", re.id)}</span>`;
  }
  function u(re) {
    const We = re.kind === "look" ? e("Apparence") : e("Cadre"),
      oe = re.kind === "frame" ? `<b>${b(e(re.name))}</b><p>${re.hint}</p>` : `<b>${re.hint}</b>`,
      $e = re.done
        ? re.worn
          ? `<span class="ach-worn">${e("Porté")}</span>`
          : `<button class="btn ghost" data-wear="${re.kind}:${re.id}">${e("Porter")}</button>`
        : "";
    return `<div class="ach-row${re.done ? " done" : le(re) ? " near" : ""}">${re.fresh ? '<span class="tc-new ach-new">NEW</span>' : ""}${P(re)}
      <div class="ach-t"><small>${We}</small>${oe}
        ${re.done ? `<span class="ach-ok">✓ ${e("Débloqué")}</span>` : re.m > 1 ? `<div class="ach-g"><span class="tc-bar"><i style="width:${Tt(re) * 100}%"></i></span><span>${f(re.n)} / ${f(re.m)}</span></div>` : ""}</div>
      ${$e}</div>`;
  }
  const ve = {
    mon: (re) => (t.Game.DEX[re]?.mythical ? e("Pokémon fabuleux") : e("Pokémon légendaire")),
    champ: () => e("Maître de la Ligue"),
    once: () => e("Rencontre unique"),
  };
  function it(re) {
    const We = !re.done,
      oe = t.Game.DEX[re.id],
      $e =
        re.kind === "champ"
          ? `assets/trainers/${b(re.sprite)}.png`
          : B(re.id)
            ? H(re.id, re.shiny, We)
            : vt(re.id, re.shiny),
      Z = re.known ? (re.kind === "champ" ? e(re.leader) : e(oe.name)) : "???";
    return `<button class="ach-cin${We ? " lock" : ""}"${We ? " disabled" : ` data-cine="${re.key}" title="${b(e("Revoir la cinématique"))}" style="background-image:url(assets/bg/scenes/${re.scene}-710x400.webp)"`}>
      ${re.fresh ? '<span class="tc-new ach-new">NEW</span>' : ""}<img class="ach-cin-sp" src="${$e}" alt="">
      <span class="ach-cin-cap"><small>${ve[re.kind](re.id)}</small><b>${b(Z)}</b></span>
      ${We ? '<img class="ach-cin-pad" src="assets/ui/padlock.svg" alt="">' : '<span class="ach-cin-play">▶</span>'}</button>`;
  }
  function De(re) {
    const We = [...new Set(re.map((A) => A.reg))],
      oe = t.STORY.REGIONS,
      $e = We.filter((A) => !re.find((J) => J.reg === A).away),
      Z = We.length > $e.length;
    return (
      $e
        .map((A) => {
          const J = re.filter((de) => de.reg === A);
          return `<section class="ach-grp"><h4>${b(e(oe.find((de) => de.key === A).name))}<em>${J.filter((de) => de.done).length} / ${J.length}</em></h4><div class="ach-gal">${J.map(it).join("")}</div></section>`;
        })
        .join("") +
      (Z
        ? `<div class="ach-lock"><img src="assets/ui/padlock.svg" alt="">${e("??? · Continue l'aventure pour découvrir d'autres succès")}</div>`
        : "")
    );
  }
  const je = (re, We, oe = "") =>
    We.length
      ? `<section class="ach-grp"><h4 class="${oe}">${re}<em>${We.length}</em></h4><div class="ach-list">${We.map(u).join("")}</div></section>`
      : "";
  function pt() {
    const re = a("#ach-root"),
      We = Ge().achievements(),
      oe = We.filter((yt) => !yt.away),
      $e = Je()?.cinematics() || [],
      Z = We.filter((yt) => yt.done).length + $e.filter((yt) => yt.done).length,
      A = We.filter((yt) => yt.fresh).length + $e.filter((yt) => yt.fresh).length;
    a("#ach-sum").innerHTML =
      `<span>${e("<b>{n}</b> / {total} débloqués", { n: Z, total: We.length + $e.length })}</span>${A ? `<span>${e("<b>{n}</b> nouveaux", { n: A })}</span>` : ""}`;
    const J = $e.filter((yt) => yt.done).at(-1),
      de = [
        [
          "look",
          e("Apparences"),
          e("Apparences"),
          `<img class="ach-cat-tr" src="assets/trainers/still/${b(se.S.trainer.sprite)}.png" alt="">`,
          We.filter((yt) => yt.kind === "look"),
        ],
        [
          "frame",
          e("Cadres"),
          e("Cadres"),
          ue(se.S.trainer.sprite, "ach-cat-face", "league"),
          We.filter((yt) => yt.kind === "frame"),
        ],
      ];
    ($e.length &&
      de.push([
        "cin",
        e("Cinématiques"),
        e("Cinés"),
        `<span class="ach-cat-film"${J ? ` style="background-image:url(assets/bg/scenes/${J.scene}-710x400.webp)"` : ""}>▶</span>`,
        $e,
      ]),
      $.cat === "cin" && !$e.length && ($.cat = "look"));
    const _e = de
      .map(([yt, he, fe, Oe, Ee]) => {
        const et = Ee.filter((we) => we.done).length,
          _ = Ee.some((we) => we.fresh);
        return `<button class="rg open sh-rg ach-cat ${$.cat === yt ? "active" : ""}" data-cat="${yt}" style="--c:var(--trophy)">${_ ? '<span class="tc-new ach-new">NEW</span>' : ""}<span class="sh-rg-ic">${Oe}</span>
        <span class="sh-rg-t"><b><span class="full">${b(he)}</span><span class="short">${b(fe)}</span></b><small>${et} / ${Ee.length}</small><span class="ach-cbar"><i style="width:${Ee.length ? (et / Ee.length) * 100 : 0}%"></i></span></span></button>`;
      })
      .join("");
    if ($.cat === "cin") {
      t.UI.morph(re, `<div class="pg-regions sh-band ach-band">${_e}</div>${De($e)}`);
      return;
    }
    const Re = oe.filter((yt) => yt.kind === $.cat),
      dt = Re.filter((yt) => !yt.done),
      qe = dt.filter(le).sort((yt, he) => Tt(he) - Tt(yt)),
      ce = dt.filter((yt) => !le(yt)).sort((yt, he) => Tt(he) - Tt(yt)),
      tt = Re.filter((yt) => yt.done).sort((yt, he) => he.fresh - yt.fresh),
      mt = We.filter((yt) => yt.away && yt.kind === $.cat).length,
      Te = mt
        ? `<div class="ach-lock"><img src="assets/ui/padlock.svg" alt="">${e("??? · Continue l'aventure pour découvrir d'autres succès")}</div>`
        : "",
      At = !dt.length && !mt ? `<p class="ach-empty">${e("Tout est débloqué ici. Bravo !")}</p>` : "";
    t.UI.morph(
      re,
      `<div class="pg-regions sh-band ach-band">${_e}</div>
      ${je(e("Presque !"), qe, "gold")}${je(e("À débloquer"), ce)}${At}${Te}${je(e("Débloqués"), tt)}`,
    );
  }
  t.Screens.achievements = {
    init() {
      (t.UI.headTip(
        "#screen-achievements .map-head h2",
        e("Succès"),
        e(
          "Tes exploits débloquent des apparences et des cadres pour ta carte de dresseur, tout seuls dès que la condition est remplie. Touche « Porter » pour les afficher ; « Presque ! » montre ceux qui sont à portée. Les légendaires capturés et certains Maîtres battus débloquent aussi leur cinématique, à revoir ici.",
        ),
      ),
        a("#ach-root").addEventListener("click", (We) => {
          const oe = We.target.closest("[data-cat]"),
            $e = We.target.closest("[data-wear]"),
            Z = We.target.closest("[data-cine]");
          if (Z) {
            (t.Sfx.click(), Je()?.replayCinematic(Z.dataset.cine).then(pt));
            return;
          }
          if (oe) $.cat = oe.dataset.cat;
          else if ($e) {
            const [A, J] = $e.dataset.wear.split(":");
            if (!Ge().wear(A, J)) return;
            (t.Sfx?.buy?.(), t.UI.toast(e(A === "look" ? "Nouvelle apparence !" : "Nouveau cadre !")));
          } else return;
          (X(), pt());
        }));
    },
    render: pt,
    open(re) {
      ["look", "frame"].includes(re) && (($.cat = re), X());
    },
  };
})();
