/**
 * gift fx
 *
 * Public API on the game namespace `t`: t.GiftFx
 *
 * Recovered from the shipped bundle — original chunk #56 at byte 1464771 (855 bytes, sha256:7468375dd742d246).
 * This file is one original source file; the build concatenates them in filename order.
 */
t.GiftFx = (function () {
  const { esc: a, artImg: b } = t.UI,
    f = () => t.CHEAT?.noAnim || matchMedia("(prefers-reduced-motion: reduce)").matches,
    ue = (H) => a(String(H || "Dresseur").split("#")[0]);
  return async function ({ mon: vt, from: B, text: se, title: Ge, say: Je, face: Ze }) {
    if (f()) return;
    const x = t.LinkFx,
      $ = t.Game.DEX[vt.id].name,
      X = x.open({
        cls: "gx-fx",
        title: Ge ?? e("Cadeau !"),
        face: Ze ?? t.UI.trainerFace(B.sprite, "gx-face", B.frame),
      });
    try {
      (await x.enter(X),
        await x.say(X, Je ?? e("<b>{name}</b> t'envoie un cadeau !", { name: ue(B.name) })),
        await X.pause(300),
        await x.land(X, { cable: !1 }),
        await x.reveal(X, b(vt.id, vt.shiny, { k: 2, fit: 160 }), vt.shiny),
        X.skip.hide(),
        se && x.showMsg(X, se));
      const Tt = a($) + (vt.shiny ? " " + t.UI.shinyIc() : "");
      (await x.say(
        X,
        vt.level
          ? e("Tu reçois <b>{name}</b> Nv. {n} !", { name: Tt, n: vt.level })
          : e("Tu reçois <b>{name}</b> !", { name: Tt }),
      ),
        await x.finish(X));
    } finally {
      await x.close(X);
    }
  };
})();
