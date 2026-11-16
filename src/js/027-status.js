/**
 * status
 *
 * Public API on the game namespace `t`: t.STATUS
 *
 * Recovered from the shipped bundle — original chunk #26 at byte 509871 (3248 bytes, sha256:cb07f32ddf7e65cd).
 * This file is one original source file; the build concatenates them in filename order.
 */
t.STATUS = (function () {
  const a = {
      ember: ["burn", 10],
      "fire-punch": ["burn", 10],
      flamethrower: ["burn", 10],
      "fire-blast": ["burn", 10],
      "flame-wheel": ["burn", 10],
      "sacred-fire": ["burn", 50],
      "fire-fang": ["burn", 10],
      "lava-plume": ["burn", 30],
      "heat-wave": ["burn", 10],
      "flare-blitz": ["burn", 10],
      "blaze-kick": ["burn", 10],
      inferno: ["burn", 100],
      "will-o-wisp": ["burn", 85],
      "thunder-fang": ["paralysis", 10],
      discharge: ["paralysis", 30],
      nuzzle: ["paralysis", 100],
      bounce: ["paralysis", 30],
      "dragon-breath": ["paralysis", 30],
      "poison-jab": ["poison", 30],
      "poison-fang": ["poison", 50],
      "cross-poison": ["poison", 10],
      "gunk-shot": ["poison", 30],
      "sludge-wave": ["poison", 10],
      "poison-tail": ["poison", 10],
      toxic: ["poison", 90],
      "ice-fang": ["freeze", 10],
      "freeze-dry": ["freeze", 10],
      "dynamic-punch": ["confusion", 100],
      hurricane: ["confusion", 30],
      "water-pulse": ["confusion", 20],
      "thunder-shock": ["paralysis", 10],
      "thunder-punch": ["paralysis", 10],
      thunderbolt: ["paralysis", 10],
      thunder: ["paralysis", 30],
      spark: ["paralysis", 30],
      "zap-cannon": ["paralysis", 100],
      "body-slam": ["paralysis", 30],
      lick: ["paralysis", 30],
      "poison-sting": ["poison", 30],
      sludge: ["poison", 30],
      "sludge-bomb": ["poison", 30],
      smog: ["poison", 40],
      twineedle: ["poison", 20],
      "ice-beam": ["freeze", 10],
      "ice-punch": ["freeze", 10],
      blizzard: ["freeze", 10],
      "powder-snow": ["freeze", 10],
      confusion: ["confusion", 10],
      psybeam: ["confusion", 10],
      "dizzy-punch": ["confusion", 20],
      "tri-attack": ["tri", 20],
      "sleep-powder": ["sleep", 75],
      spore: ["sleep", 100],
      hypnosis: ["sleep", 60],
      sing: ["sleep", 55],
      "lovely-kiss": ["sleep", 75],
      "stun-spore": ["paralysis", 75],
      "thunder-wave": ["paralysis", 100],
      glare: ["paralysis", 75],
      "poison-powder": ["poison", 75],
      "poison-gas": ["poison", 55],
      "confuse-ray": ["confusion", 100],
      supersonic: ["confusion", 55],
      "sweet-kiss": ["confusion", 75],
    },
    b = {
      burn: ["fire"],
      poison: ["poison", "steel"],
      freeze: ["ice"],
      paralysis: [],
      sleep: [],
      confusion: [],
    },
    f = {
      burn: { tag: e("BRÛ"), color: "#f0703a", got: e("est brûlé !"), hurt: e("souffre de sa brûlure !") },
      paralysis: {
        tag: e("PAR"),
        color: "#e8c41c",
        got: e("est paralysé ! Il aura du mal à attaquer."),
        stuck: e("est paralysé ! Il ne peut pas attaquer !"),
      },
      poison: { tag: e("PSN"), color: "#b65ad6", got: e("est empoisonné !"), hurt: e("souffre du poison !") },
      sleep: {
        tag: e("SOM"),
        color: "#9aa3b5",
        got: e("s'endort !"),
        stuck: e("dort profondément…"),
        end: e("se réveille !"),
      },
      freeze: {
        tag: e("GEL"),
        color: "#6ad0f0",
        got: e("est gelé !"),
        stuck: e("est gelé ! Il ne peut pas bouger !"),
        end: e("dégèle !"),
      },
      confusion: { tag: e("CNF"), color: "#ff8fd0", got: e("est confus !"), end: e("n'est plus confus !") },
    },
    ue = (x) => t.Game.DEX[x.id]?.types || [];
  function H(x, $) {
    return $ === "confusion"
      ? !x.confused
      : x.status || ($ === "sleep" && x.sleepCd > 0)
        ? !1
        : !b[$].some((X) => ue(x).includes(X));
  }
  const vt = { status: 50, damaging: 30 },
    B = new Set(["spore", "sacred-fire", "nuzzle", "zap-cannon", "inferno", "dynamic-punch"]),
    se = (x) => (B.has(x) ? 100 : t.MOVES?.[x]?.power ? vt.damaging : vt.status);
  function Ge(x) {
    const $ = a[x];
    return $
      ? {
          status: $[0] === "tri" ? ["burn", "paralysis", "freeze"][Math.floor(Math.random() * 3)] : $[0],
          chance: Math.min($[1], se(x)),
        }
      : null;
  }
  function Je(x, $) {
    if ($ === "confusion") {
      x.confused = 2 + Math.floor(Math.random() * 4);
      return;
    }
    ((x.status = $), $ === "sleep" && (x.sleep = 1 + Math.floor(Math.random() * 3)));
  }
  function Ze(x) {
    (delete x.status, delete x.sleep, delete x.confused);
  }
  return { MOVES: a, INFO: f, canGet: H, effectOf: Ge, capOf: se, inflict: Je, clear: Ze };
})();
