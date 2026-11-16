/**
 * event ui
 *
 * Public API on the game namespace `t`: t.EventUI
 *
 * Recovered from the shipped bundle — original chunk #61 at byte 1520893 (5379 bytes, sha256:3f7deaefe4edd242).
 * This file is one original source file; the build concatenates them in filename order.
 */
t.EventUI = (function () {
  const { $$: a, esc: b, animSrc: f, itemSrc: ue, typeBadge: H, confirm: vt } = t.UI,
    B = t.Events,
    se = t.Game,
    Ge = () => t.Adventure.state,
    Je = (J) => {
      const de = Math.max(0, Math.ceil(J / 1e3)),
        _e = Math.floor(de / 60);
      return _e >= 60
        ? `${Math.floor(_e / 60)} h ${String(_e % 60).padStart(2, "0")}`
        : `${_e}:${String(de % 60).padStart(2, "0")}`;
    },
    Ze = (J) => {
      const de = Math.round(J / 1e3);
      return `${Math.floor(de / 60)}:${String(de % 60).padStart(2, "0")}`;
    };
  function x(J = B.cur, de = Date.now()) {
    const _e = B.phase(J, de);
    return _e === "announce"
      ? e("Apparaît dans {time}", { time: Je(J.openAt - de) })
      : _e === "open"
        ? e("Encore {time}", { time: Je(J.closeAt - de) })
        : "";
  }
  const $ = () => !!Ge().event && B.isOpen(Ge().event.seq),
    X = (J) => e("Trace de {name}", { name: se.DEX[J].name });
  function Tt() {
    const J = B.state;
    return `<span class="ev-w" title="${e("Traces : une par capture ratée. {n} au total. {need} traces d'un légendaire ouvrent sa chasse privée (onglet Event).", { n: B.traceCount(), need: t.CONFIG.EVENT.PRIVATE.TRACES })}">
        ${
          Object.entries(J.traces)
            .map(([de, _e]) => `<img src="${ue("trace-" + de)}" alt="" title="${b(X(+de))}">${_e}`)
            .join(" ") || `<img src="${ue("trace-146")}" alt="" class="ev-dim">0`
        }</span>
      <span class="ev-w" title="${e("Éclats : gagnés à chaque boucle, dépensés à la Boutique")}"><img src="${ue("event-shard")}" alt="">${J.shards}</span>`;
  }
  function le() {
    if (!B.unlocked()) return "";
    const J = B.cur,
      de = B.phase(J);
    if (de !== "announce" && de !== "open") return "";
    const _e = B.legendOf(J.id),
      Re = $() && Ge().event.seq === J.seq,
      dt = t.TYPES[_e.types[0]].color;
    return `<div class="ev-card ev-aura ph-${de} fx-${it(J)} ${Re ? "mine" : ""}" style="--c:${dt}${de === "open" ? ";--ec:" + dt : ""}">
      ${pt(J)}<div class="ev-top">
        <span class="ev-mon ${de === "announce" ? "sil" : ""}"><img src="${f(J.id)}" alt=""></span>
        <span class="ev-t">
          <small>${e(de === "announce" ? "Une présence se fait sentir…" : Re ? "Tu chasses" : "Event légendaire")}</small>
          <b>${de === "announce" ? "???" : b(se.DEX[J.id].name)}</b>
          <span class="ev-zone">📍 ${b(e(B.zoneOf(J).zone))}</span>
        </span>
        <span class="ev-timer" data-ev-timer>${x(J)}</span>
      </div>
      <div class="ev-mid"><span class="ev-types">${_e.types.map((qe) => H(qe, !0)).join("")}</span>
        <span class="ev-lv" title="${e("Tes Pokémon plus forts sont ramenés à ce niveau pendant l'event")}">${e("Nv. {n} max", { n: P() })}</span></div>
      ${de === "open" ? (Re ? `<div class="ev-act"><span class="ev-run">${e("Boucle {n}", { n: Ge().event.loops + 1 })}${u() != null ? ` · <span data-ev-flee title="${e("Temps pour le battre avant qu'il s'enfuie")}">⏱ ${u()}</span>` : ""}</span><button class="btn small ghost" data-ev-leave>${e("Quitter")}</button></div>` : `<div class="ev-act"><button class="btn small gold ev-join" data-ev-join>${e("Rejoindre la chasse")}</button></div>`) : ""}
      <div class="ev-wallet">${Tt()}</div>
    </div>`;
  }
  const P = () => t.CONFIG.EVENT.LEVEL;
  function u() {
    const J = t.Adventure.fleeLeft?.();
    if (J == null) return null;
    const de = Math.ceil(J / 1e3 / t.Adventure.speed());
    return `${Math.floor(de / 60)}:${String(de % 60).padStart(2, "0")}`;
  }
  const ve = { fire: "flame", electric: "bolt", ice: "snow" },
    it = (J = B.cur) => (B.phase(J) === "open" && ve[B.legendOf(J.id).types[0]]) || "",
    De = (J, de = "") =>
      Array.from(
        { length: J },
        (_e, Re) =>
          `<i class="${de}" style="left:${3 + (Re * 94) / J}%;--dx:${((Re % 3) - 1) * 14}px;animation-delay:${-((Re * 0.37) % 2.2).toFixed(2)}s"></i>`,
      ).join(""),
    je = (J) => `<span class="ev-fx">${De(10)}${J === "snow" ? De(8, "flake") : ""}</span>`,
    pt = (J = B.cur) => je(it(J)),
    re = (J) => ve[J] || "";
  function We(J = B.cur) {
    const de = B.zoneOf(J);
    return de.ch != null
      ? de.ch
      : de.at
        ? t.LegendZones.atChapter(de)
        : t.STORY.CHAPTERS.findIndex((_e) =>
            _e.steps.some(
              (Re) => Re.name === de.zone || (de.badge && Re.kind === "gym" && Re.badge === de.badge),
            ),
          );
  }
  function oe(J = B.cur) {
    (t.Sfx.unlock(), t.App.show("event"));
  }
  function $e() {
    if (!B.unlocked()) return "";
    const J = B.cur,
      de = B.phase(J);
    if (de !== "announce" && de !== "open") return "";
    const _e = B.legendOf(J.id),
      Re = t.TYPES[_e.types[0]].color;
    return `<button class="ev-pin ph-${de}" data-ev-go ${de === "open" ? `style="--c:${Re}"` : ""}>
      <span class="ev-pin-mon ${de === "announce" ? "sil" : ""}"><img src="${f(J.id)}" alt=""></span>
      <span class="ev-pin-t">${de === "announce" ? `<b>${e("Une présence se fait sentir…")}</b><small>${b(e(_e.announce, { zone: e(B.zoneOf(J).zone) }))}</small>` : `<b>${e('<span class="legend">{name}</span> est apparu !', { name: b(se.DEX[J.id].name) })}</b><small>📍 ${b(e(B.zoneOf(J).zone))} · ${e("Voir la carte ›")}</small>`}</span>
      <span class="ev-timer" data-ev-timer>${x(J)}</span>
    </button>`;
  }
  function Z(J) {
    for (const de of a("[data-ev-join]", J))
      de.onclick = () => {
        (t.Sfx.unlock(), t.Screens.adventure.goEvent(de.dataset.evJoin ? +de.dataset.evJoin : void 0));
      };
    for (const de of a("[data-ev-go]", J)) de.onclick = () => oe();
    for (const de of a("[data-ev-leave]", J))
      de.onclick = async () => {
        (await vt(
          e(
            "Quitter la chasse ? Tu retournes à ton chapitre (tu pourras revenir tant que l'event est ouvert).",
          ),
          e("Quitter"),
        )) && (t.Adventure.leaveEvent(), t.Screens.adventure.render());
      };
  }
  let A = "";
  return (
    Ss(() => {
      if (document.hidden) return;
      for (const de of a("[data-ev-timer]"))
        de.textContent = x(de.dataset.evTimer ? B.get(+de.dataset.evTimer) : B.cur);
      for (const de of a("[data-ev-flee]")) de.textContent = `⏱ ${u() ?? ""}`;
      const J = B.unlocked() ? B.cur?.seq + B.phase() + (B.priv()?.seq ?? "") : "";
      J !== A && ((A = J), B.emit());
    }, 1e3),
    {
      card: le,
      teaser: $e,
      fx: it,
      fxLayer: pt,
      layer: je,
      fxOf: re,
      zoneChapter: We,
      goTo: oe,
      bind: Z,
      timer: x,
      wallet: Tt,
      traceName: X,
      inEvent: $,
      clock: Je,
      clockMs: Ze,
    }
  );
})();
