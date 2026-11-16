/**
 * battle fx
 *
 * Public API on the game namespace `t`: t.BattleFX, t.FX_MOVES
 *
 * Recovered from the shipped bundle — original chunk #49 at byte 1176133 (179651 bytes, sha256:c84247d7ddabd415).
 * This file is one original source file; the build concatenates them in filename order.
 */
t.BattleFX = (function () {
  const a = {
      atk: null,
      def: null,
      tint: null,
      shakeEl: null,
      mirror: !1,
      miss: !1,
      impact: null,
      dummy: document.createElement("div"),
    },
    b = { value: "1", checked: !1 };
  function f(o) {
    if (o === "#atk") return a.atk;
    if (o === "#def") return a.miss ? a.dummy : a.def;
    if (o === "#tint") return a.tint;
    if (o === "#arena") return a.shakeEl;
    if (o === "#barDef") {
      if (a.impact) {
        const n = a.impact;
        ((a.impact = null), n());
      }
      return a.dummy;
    }
    return o === "#spd" || o === "#loop" ? b : a.dummy;
  }
  function ue(o) {
    if (!o.transform) return o;
    let n = o.transform.replace(/scaleX\(-?1\)/g, "");
    return (
      a.mirror &&
        (n = n
          .replace(/translate\(\s*(-?[\d.]+)(px|%)/g, (s, l, c) => `translate(${-l}${c}`)
          .replace(/translateX\(\s*(-?[\d.]+)(px|%)/g, (s, l, c) => `translateX(${-l}${c}`)
          .replace(/rotate\(\s*(-?[\d.]+)deg/g, (s, l) => `rotate(${-l}deg`)),
      { ...o, transform: n.trim() || "none" }
    );
  }
  function H(o, n) {
    o.style.transform = n ? ue({ transform: n }).transform : "";
  }
  let vt = !1;
  const B = (o) =>
    o && /brightness\((?:[2-9]|1\.[5-9])/.test(o.filter || "") ? { ...o, filter: "none" } : o;
  let se = -1e9;
  function Ge() {
    if (t.Game?.S?.noFlash) return;
    const o = zn.now(),
      n = o - se;
    (n > 120 && n < 450) || (n >= 450 && (se = o), $.fillRect(0, 0, Je, Ze));
  }
  t.FX_MOVES = [
    { k: "infestation", n: "Harcèlement", t: "bug", p: 20, c: "spec", f: "piege" },
    { k: "pin-missile", n: "Dard-Nuée", t: "bug", p: 25, c: "phys", f: "rafale" },
    { k: "fury-cutter", n: "Taillade", t: "bug", p: 40, c: "phys", f: "entaille" },
    { k: "fell-stinger", n: "Dard Mortel", t: "bug", p: 50, c: "phys", f: "rafale" },
    { k: "struggle-bug", n: "Survinsecte", t: "bug", p: 50, c: "spec", f: "zone" },
    { k: "bug-bite", n: "Piqûre", t: "bug", p: 60, c: "phys", f: "morsure" },
    { k: "u-turn", n: "Demi-Tour", t: "bug", p: 70, c: "phys", f: "signature" },
    { k: "leech-life", n: "Vampirisme", t: "bug", p: 80, c: "phys", f: "morsure" },
    { k: "x-scissor", n: "Plaie Croix", t: "bug", p: 80, c: "phys", f: "entaille" },
    { k: "lunge", n: "Furie-Bond", t: "bug", p: 80, c: "phys", f: "contact" },
    { k: "bug-buzz", n: "Bourdon", t: "bug", p: 90, c: "spec", f: "zone" },
    { k: "attack-order", n: "Appel Attaque", t: "bug", p: 90, c: "phys", f: "signature" },
    { k: "megahorn", n: "Mégacorne", t: "bug", p: 120, c: "phys", f: "bec" },
    { k: "comeuppance", n: "Vindicte", t: "dark", p: 1, c: "phys", f: "signature" },
    { k: "beat-up", n: "Baston", t: "dark", p: 30, c: "phys", f: "signature" },
    { k: "payback", n: "Représailles", t: "dark", p: 50, c: "phys", f: "contact" },
    { k: "snarl", n: "Aboiement", t: "dark", p: 55, c: "spec", f: "zone" },
    { k: "bite", n: "Morsure", t: "dark", p: 60, c: "phys", f: "morsure" },
    { k: "assurance", n: "Assurance", t: "dark", p: 60, c: "phys", f: "contact" },
    { k: "knock-off", n: "Sabotage", t: "dark", p: 65, c: "phys", f: "signature" },
    { k: "sucker-punch", n: "Coup Bas", t: "dark", p: 70, c: "phys", f: "signature" },
    { k: "crunch", n: "Mâchouille", t: "dark", p: 80, c: "phys", f: "morsure" },
    { k: "dark-pulse", n: "Vibrobscur", t: "dark", p: 80, c: "spec", f: "rayon" },
    { k: "throat-chop", n: "Exécu-Son", t: "dark", p: 80, c: "phys", f: "entaille" },
    { k: "foul-play", n: "Tricherie", t: "dark", p: 95, c: "phys", f: "signature" },
    { k: "twister", n: "Ouragan", t: "dragon", p: 40, c: "spec", f: "souffle" },
    { k: "dual-chop", n: "Double Baffe", t: "dragon", p: 40, c: "phys", f: "entaille" },
    { k: "dragon-breath", n: "Draco-Souffle", t: "dragon", p: 60, c: "spec", f: "souffle" },
    { k: "dragon-tail", n: "Draco-Queue", t: "dragon", p: 60, c: "phys", f: "queue" },
    { k: "dragon-pulse", n: "Draco-Choc", t: "dragon", p: 85, c: "spec", f: "rayon" },
    { k: "dragon-rush", n: "Draco-Charge", t: "dragon", p: 100, c: "phys", f: "contact" },
    { k: "spacial-rend", n: "Spatio-Rift", t: "dragon", p: 100, c: "spec", f: "signature" },
    { k: "outrage", n: "Colère", t: "dragon", p: 120, c: "phys", f: "signature" },
    { k: "roar-of-time", n: "Hurle-Temps", t: "dragon", p: 150, c: "spec", f: "signature" },
    { k: "nuzzle", n: "Frotte-Frimousse", t: "electric", p: 20, c: "phys", f: "contact" },
    { k: "thunder-shock", n: "Éclair", t: "electric", p: 40, c: "spec", f: "projectile" },
    { k: "charge-beam", n: "Rayon Chargé", t: "electric", p: 50, c: "spec", f: "projectile" },
    { k: "shock-wave", n: "Onde de Choc", t: "electric", p: 60, c: "spec", f: "projectile" },
    { k: "spark", n: "Étincelle", t: "electric", p: 65, c: "phys", f: "contact" },
    { k: "thunder-fang", n: "Crocs Éclair", t: "electric", p: 65, c: "phys", f: "morsure" },
    { k: "volt-switch", n: "Change Éclair", t: "electric", p: 70, c: "spec", f: "signature" },
    { k: "thunder-punch", n: "Poing Éclair", t: "electric", p: 75, c: "phys", f: "poing" },
    { k: "discharge", n: "Coup d’Jus", t: "electric", p: 80, c: "spec", f: "zone" },
    { k: "thunderbolt", n: "Tonnerre", t: "electric", p: 90, c: "spec", f: "ciel" },
    { k: "thunder", n: "Fatal-Foudre", t: "electric", p: 110, c: "spec", f: "ciel" },
    { k: "zap-cannon", n: "Élecanon", t: "electric", p: 120, c: "spec", f: "rayon" },
    { k: "disarming-voice", n: "Voix Enjôleuse", t: "fairy", p: 40, c: "spec", f: "zone" },
    { k: "fairy-wind", n: "Vent Féérique", t: "fairy", p: 40, c: "spec", f: "souffle" },
    { k: "dazzling-gleam", n: "Éclat Magique", t: "fairy", p: 80, c: "spec", f: "zone" },
    { k: "play-rough", n: "Câlinerie", t: "fairy", p: 90, c: "phys", f: "contact" },
    { k: "moonblast", n: "Pouvoir Lunaire", t: "fairy", p: 95, c: "spec", f: "ciel" },
    { k: "triple-kick", n: "Triple Pied", t: "fighting", p: 10, c: "phys", f: "pied" },
    { k: "arm-thrust", n: "Cogne", t: "fighting", p: 15, c: "phys", f: "poing" },
    { k: "double-kick", n: "Double Pied", t: "fighting", p: 30, c: "phys", f: "pied" },
    { k: "mach-punch", n: "Mach Punch", t: "fighting", p: 40, c: "phys", f: "poing" },
    { k: "vacuum-wave", n: "Onde Vide", t: "fighting", p: 40, c: "spec", f: "projectile" },
    { k: "reversal", n: "Contre", t: "fighting", p: 40, c: "phys", f: "poing" },
    { k: "revenge", n: "Vendetta", t: "fighting", p: 60, c: "phys", f: "contact" },
    { k: "storm-throw", n: "Yama Arashi", t: "fighting", p: 60, c: "phys", f: "signature" },
    { k: "seismic-toss", n: "Frappe Atlas", t: "fighting", p: 60, c: "phys", f: "signature" },
    { k: "low-sweep", n: "Balayette", t: "fighting", p: 65, c: "phys", f: "pied" },
    { k: "vital-throw", n: "Corps Perdu", t: "fighting", p: 70, c: "phys", f: "signature" },
    { k: "brick-break", n: "Casse-Brique", t: "fighting", p: 75, c: "phys", f: "poing" },
    { k: "drain-punch", n: "Vampi-Poing", t: "fighting", p: 75, c: "phys", f: "poing" },
    { k: "submission", n: "Sacrifice", t: "fighting", p: 80, c: "phys", f: "contact" },
    { k: "aura-sphere", n: "Aurasphère", t: "fighting", p: 80, c: "spec", f: "signature" },
    { k: "body-press", n: "Big Splash", t: "fighting", p: 80, c: "phys", f: "contact" },
    { k: "cross-chop", n: "Coup Croix", t: "fighting", p: 100, c: "phys", f: "poing" },
    { k: "dynamic-punch", n: "Dynamo-Poing", t: "fighting", p: 100, c: "phys", f: "poing" },
    { k: "hammer-arm", n: "Marto-Poing", t: "fighting", p: 100, c: "phys", f: "poing" },
    { k: "superpower", n: "Surpuissance", t: "fighting", p: 120, c: "phys", f: "poing" },
    { k: "close-combat", n: "Close Combat", t: "fighting", p: 120, c: "phys", f: "poing" },
    { k: "axe-kick", n: "Talon-Marteau", t: "fighting", p: 120, c: "phys", f: "pied" },
    { k: "high-jump-kick", n: "Pied Voltige", t: "fighting", p: 130, c: "phys", f: "signature" },
    { k: "fire-spin", n: "Danse Flammes", t: "fire", p: 35, c: "spec", f: "piege" },
    { k: "ember", n: "Flammèche", t: "fire", p: 40, c: "spec", f: "projectile" },
    { k: "flame-charge", n: "Nitrocharge", t: "fire", p: 50, c: "phys", f: "contact" },
    { k: "incinerate", n: "Calcination", t: "fire", p: 60, c: "spec", f: "souffle" },
    { k: "flame-wheel", n: "Roue de Feu", t: "fire", p: 60, c: "phys", f: "contact" },
    { k: "fire-fang", n: "Crocs Feu", t: "fire", p: 65, c: "phys", f: "morsure" },
    { k: "fire-punch", n: "Poing Feu", t: "fire", p: 75, c: "phys", f: "poing" },
    { k: "lava-plume", n: "Ébullilave", t: "fire", p: 80, c: "spec", f: "zone" },
    { k: "blaze-kick", n: "Pied Brûleur", t: "fire", p: 85, c: "phys", f: "pied" },
    { k: "flamethrower", n: "Lance-Flammes", t: "fire", p: 90, c: "spec", f: "souffle" },
    { k: "heat-wave", n: "Canicule", t: "fire", p: 95, c: "spec", f: "souffle" },
    { k: "inferno", n: "Feu d’Enfer", t: "fire", p: 100, c: "spec", f: "souffle" },
    { k: "sacred-fire", n: "Feu Sacré", t: "fire", p: 100, c: "phys", f: "signature" },
    { k: "magma-storm", n: "Vortex Magma", t: "fire", p: 100, c: "spec", f: "signature" },
    { k: "fire-blast", n: "Déflagration", t: "fire", p: 110, c: "spec", f: "ciel" },
    { k: "flare-blitz", n: "Boutefeu", t: "fire", p: 120, c: "phys", f: "contact" },
    { k: "raging-fury", n: "Grand Courroux", t: "fire", p: 120, c: "phys", f: "signature" },
    { k: "overheat", n: "Surchauffe", t: "fire", p: 130, c: "spec", f: "souffle" },
    { k: "eruption", n: "Éruption", t: "fire", p: 150, c: "spec", f: "signature" },
    { k: "peck", n: "Picpic", t: "flying", p: 35, c: "phys", f: "bec" },
    { k: "gust", n: "Tornade", t: "flying", p: 40, c: "spec", f: "souffle" },
    { k: "acrobatics", n: "Acrobatie", t: "flying", p: 55, c: "phys", f: "signature" },
    { k: "wing-attack", n: "Cru-Ailes", t: "flying", p: 60, c: "phys", f: "entaille" },
    { k: "aerial-ace", n: "Aéropique", t: "flying", p: 60, c: "phys", f: "entaille" },
    { k: "air-cutter", n: "Tranch’Air", t: "flying", p: 60, c: "spec", f: "entaille" },
    { k: "pluck", n: "Picore", t: "flying", p: 60, c: "phys", f: "bec" },
    { k: "chatter", n: "Babil", t: "flying", p: 65, c: "spec", f: "signature" },
    { k: "air-slash", n: "Lame d’Air", t: "flying", p: 75, c: "spec", f: "entaille" },
    { k: "drill-peck", n: "Bec Vrille", t: "flying", p: 80, c: "phys", f: "bec" },
    { k: "bounce", n: "Rebond", t: "flying", p: 85, c: "phys", f: "signature" },
    { k: "aeroblast", n: "Aéroblast", t: "flying", p: 100, c: "spec", f: "signature" },
    { k: "hurricane", n: "Vent Violent", t: "flying", p: 110, c: "spec", f: "souffle" },
    { k: "brave-bird", n: "Rapace", t: "flying", p: 120, c: "phys", f: "contact" },
    { k: "sky-attack", n: "Piqué", t: "flying", p: 140, c: "phys", f: "ciel" },
    { k: "astonish", n: "Étonnement", t: "ghost", p: 30, c: "phys", f: "contact" },
    { k: "lick", n: "Léchouille", t: "ghost", p: 30, c: "phys", f: "mental" },
    { k: "shadow-sneak", n: "Ombre Portée", t: "ghost", p: 40, c: "phys", f: "contact" },
    { k: "rage-fist", n: "Poing de Colère", t: "ghost", p: 50, c: "phys", f: "poing" },
    { k: "shadow-punch", n: "Poing Ombre", t: "ghost", p: 60, c: "phys", f: "poing" },
    { k: "night-shade", n: "Ombre Nocturne", t: "ghost", p: 60, c: "spec", f: "signature" },
    { k: "hex", n: "Châtiment", t: "ghost", p: 65, c: "spec", f: "projectile" },
    { k: "shadow-ball", n: "Ball’Ombre", t: "ghost", p: 80, c: "spec", f: "projectile" },
    { k: "shadow-force", n: "Revenant", t: "ghost", p: 120, c: "phys", f: "signature" },
    { k: "absorb", n: "Vole-Vie", t: "grass", p: 20, c: "spec", f: "drain" },
    { k: "bullet-seed", n: "Balle Graine", t: "grass", p: 25, c: "phys", f: "rafale" },
    { k: "mega-drain", n: "Méga-Sangsue", t: "grass", p: 40, c: "spec", f: "drain" },
    { k: "vine-whip", n: "Fouet Lianes", t: "grass", p: 45, c: "phys", f: "queue" },
    { k: "razor-leaf", n: "Tranch’Herbe", t: "grass", p: 55, c: "phys", f: "rafale" },
    { k: "magical-leaf", n: "Feuille Magik", t: "grass", p: 60, c: "spec", f: "projectile" },
    { k: "leaf-tornado", n: "Phytomixeur", t: "grass", p: 65, c: "spec", f: "piege" },
    { k: "giga-drain", n: "Giga-Sangsue", t: "grass", p: 75, c: "spec", f: "drain" },
    { k: "seed-bomb", n: "Canon Graine", t: "grass", p: 80, c: "phys", f: "projectile" },
    { k: "petal-blizzard", n: "Tempête Florale", t: "grass", p: 90, c: "phys", f: "zone" },
    { k: "leaf-blade", n: "Lame Feuille", t: "grass", p: 90, c: "phys", f: "entaille" },
    { k: "solar-beam", n: "Lance-Soleil", t: "grass", p: 120, c: "spec", f: "rayon" },
    { k: "power-whip", n: "Mégafouet", t: "grass", p: 120, c: "phys", f: "queue" },
    { k: "petal-dance", n: "Danse Fleurs", t: "grass", p: 120, c: "spec", f: "signature" },
    { k: "wood-hammer", n: "Martobois", t: "grass", p: 120, c: "phys", f: "contact" },
    { k: "seed-flare", n: "Fulmigraine", t: "grass", p: 120, c: "spec", f: "signature" },
    { k: "leaf-storm", n: "Tempête Verte", t: "grass", p: 130, c: "spec", f: "zone" },
    { k: "mud-slap", n: "Coud’Boue", t: "ground", p: 20, c: "spec", f: "rafale" },
    { k: "bone-rush", n: "Charge Os", t: "ground", p: 25, c: "phys", f: "signature" },
    { k: "sand-tomb", n: "Tourbi-Sable", t: "ground", p: 35, c: "phys", f: "piege" },
    { k: "bonemerang", n: "Osmerang", t: "ground", p: 50, c: "phys", f: "signature" },
    { k: "mud-shot", n: "Tir de Boue", t: "ground", p: 55, c: "spec", f: "rafale" },
    { k: "bulldoze", n: "Piétisol", t: "ground", p: 60, c: "phys", f: "zone" },
    { k: "stomping-tantrum", n: "Trépignement", t: "ground", p: 75, c: "phys", f: "zone" },
    { k: "dig", n: "Tunnel", t: "ground", p: 80, c: "phys", f: "signature" },
    { k: "drill-run", n: "Tunnelier", t: "ground", p: 80, c: "phys", f: "contact" },
    { k: "earth-power", n: "Telluriforce", t: "ground", p: 90, c: "spec", f: "zone" },
    { k: "high-horsepower", n: "Cavalerie Lourde", t: "ground", p: 95, c: "phys", f: "contact" },
    { k: "earthquake", n: "Séisme", t: "ground", p: 100, c: "phys", f: "zone" },
    { k: "icicle-spear", n: "Stalactite", t: "ice", p: 25, c: "phys", f: "rafale" },
    { k: "ice-shard", n: "Éclats Glace", t: "ice", p: 40, c: "phys", f: "rafale" },
    { k: "powder-snow", n: "Poudreuse", t: "ice", p: 40, c: "spec", f: "souffle" },
    { k: "icy-wind", n: "Vent Glace", t: "ice", p: 55, c: "spec", f: "souffle" },
    { k: "aurora-beam", n: "Onde Boréale", t: "ice", p: 65, c: "spec", f: "rayon" },
    { k: "ice-fang", n: "Crocs Givre", t: "ice", p: 65, c: "phys", f: "morsure" },
    { k: "freeze-dry", n: "Lyophilisation", t: "ice", p: 70, c: "spec", f: "souffle" },
    { k: "ice-punch", n: "Poing Glace", t: "ice", p: 75, c: "phys", f: "poing" },
    { k: "ice-beam", n: "Laser Glace", t: "ice", p: 90, c: "spec", f: "rayon" },
    { k: "blizzard", n: "Blizzard", t: "ice", p: 110, c: "spec", f: "ciel" },
    { k: "fury-attack", n: "Furie", t: "normal", p: 15, c: "phys", f: "bec" },
    { k: "wrap", n: "Ligotage", t: "normal", p: 15, c: "phys", f: "queue" },
    { k: "bind", n: "Étreinte", t: "normal", p: 15, c: "phys", f: "queue" },
    { k: "fury-swipes", n: "Combo-Griffe", t: "normal", p: 18, c: "phys", f: "entaille" },
    { k: "feint", n: "Ruse", t: "normal", p: 30, c: "phys", f: "contact" },
    { k: "double-hit", n: "Coup Double", t: "normal", p: 35, c: "phys", f: "bec" },
    { k: "tackle", n: "Charge", t: "normal", p: 40, c: "phys", f: "contact" },
    { k: "scratch", n: "Griffe", t: "normal", p: 40, c: "phys", f: "entaille" },
    { k: "quick-attack", n: "Vive-Attaque", t: "normal", p: 40, c: "phys", f: "contact" },
    { k: "echoed-voice", n: "Écho", t: "normal", p: 40, c: "spec", f: "zone" },
    { k: "pay-day", n: "Jackpot", t: "normal", p: 40, c: "phys", f: "signature" },
    { k: "pound", n: "Écras’Face", t: "normal", p: 40, c: "phys", f: "contact" },
    { k: "false-swipe", n: "Faux-Chage", t: "normal", p: 40, c: "phys", f: "contact" },
    { k: "flail", n: "Gigotage", t: "normal", p: 40, c: "phys", f: "signature" },
    { k: "present", n: "Cadeau", t: "normal", p: 40, c: "phys", f: "signature" },
    { k: "rapid-spin", n: "Tour Rapide", t: "normal", p: 50, c: "phys", f: "signature" },
    { k: "cut", n: "Coupe", t: "normal", p: 50, c: "phys", f: "entaille" },
    { k: "weather-ball", n: "Ball’Météo", t: "normal", p: 50, c: "spec", f: "signature" },
    { k: "vice-grip", n: "Force Poigne", t: "normal", p: 55, c: "phys", f: "poing" },
    { k: "swift", n: "Météores", t: "normal", p: 60, c: "spec", f: "projectile" },
    { k: "covet", n: "Implore", t: "normal", p: 60, c: "phys", f: "contact" },
    { k: "round", n: "Chant Canon", t: "normal", p: 60, c: "spec", f: "zone" },
    { k: "hidden-power", n: "Puissance Cachée", t: "normal", p: 60, c: "spec", f: "signature" },
    { k: "super-fang", n: "Croc Fatal", t: "normal", p: 60, c: "phys", f: "morsure" },
    { k: "horn-attack", n: "Koud’Korne", t: "normal", p: 65, c: "phys", f: "contact" },
    { k: "stomp", n: "Écrasement", t: "normal", p: 65, c: "phys", f: "contact" },
    { k: "slash", n: "Tranche", t: "normal", p: 70, c: "phys", f: "entaille" },
    { k: "retaliate", n: "Vengeance", t: "normal", p: 70, c: "phys", f: "contact" },
    { k: "headbutt", n: "Coup d’Boule", t: "normal", p: 70, c: "phys", f: "contact" },
    { k: "extreme-speed", n: "Vitesse Extrême", t: "normal", p: 80, c: "phys", f: "signature" },
    { k: "slam", n: "Souplesse", t: "normal", p: 80, c: "phys", f: "contact" },
    { k: "strength", n: "Force", t: "normal", p: 80, c: "phys", f: "contact" },
    { k: "tri-attack", n: "Triplattaque", t: "normal", p: 80, c: "spec", f: "signature" },
    { k: "mega-punch", n: "Ultimapoing", t: "normal", p: 80, c: "phys", f: "poing" },
    { k: "body-slam", n: "Plaquage", t: "normal", p: 85, c: "phys", f: "contact" },
    { k: "take-down", n: "Bélier", t: "normal", p: 90, c: "phys", f: "contact" },
    { k: "hyper-voice", n: "Mégaphone", t: "normal", p: 90, c: "spec", f: "zone" },
    { k: "uproar", n: "Brouhaha", t: "normal", p: 90, c: "spec", f: "zone" },
    { k: "raging-bull", n: "Taurogne", t: "normal", p: 90, c: "phys", f: "signature" },
    { k: "hyper-drill", n: "Hyperceuse", t: "normal", p: 100, c: "phys", f: "contact" },
    { k: "judgment", n: "Jugement", t: "normal", p: 100, c: "spec", f: "signature" },
    { k: "double-edge", n: "Damoclès", t: "normal", p: 120, c: "phys", f: "contact" },
    { k: "thrash", n: "Mania", t: "normal", p: 120, c: "phys", f: "signature" },
    { k: "mega-kick", n: "Ultimawashi", t: "normal", p: 120, c: "phys", f: "pied" },
    { k: "giga-impact", n: "Giga Impact", t: "normal", p: 150, c: "phys", f: "contact" },
    { k: "hyper-beam", n: "Ultralaser", t: "normal", p: 150, c: "spec", f: "rayon" },
    { k: "poison-sting", n: "Dard-Venin", t: "poison", p: 15, c: "phys", f: "rafale" },
    { k: "smog", n: "Purédpois", t: "poison", p: 30, c: "spec", f: "souffle" },
    { k: "acid", n: "Acide", t: "poison", p: 40, c: "spec", f: "projectile" },
    { k: "acid-spray", n: "Bombe Acide", t: "poison", p: 40, c: "spec", f: "projectile" },
    { k: "poison-fang", n: "Crochet Venin", t: "poison", p: 50, c: "phys", f: "morsure" },
    { k: "clear-smog", n: "Bain de Smog", t: "poison", p: 50, c: "spec", f: "souffle" },
    { k: "poison-tail", n: "Queue-Poison", t: "poison", p: 50, c: "phys", f: "queue" },
    { k: "venoshock", n: "Choc Venin", t: "poison", p: 65, c: "spec", f: "projectile" },
    { k: "sludge", n: "Détritus", t: "poison", p: 65, c: "spec", f: "projectile" },
    { k: "cross-poison", n: "Poison Croix", t: "poison", p: 70, c: "phys", f: "entaille" },
    { k: "poison-jab", n: "Direct Toxik", t: "poison", p: 80, c: "phys", f: "bec" },
    { k: "sludge-bomb", n: "Bombe Beurk", t: "poison", p: 90, c: "spec", f: "projectile" },
    { k: "sludge-wave", n: "Cradovague", t: "poison", p: 95, c: "spec", f: "zone" },
    { k: "gunk-shot", n: "Détricanon", t: "poison", p: 120, c: "phys", f: "rayon" },
    { k: "stored-power", n: "Force Ajoutée", t: "psychic", p: 20, c: "spec", f: "mental" },
    { k: "twin-beam", n: "Double Laser", t: "psychic", p: 40, c: "spec", f: "signature" },
    { k: "confusion", n: "Choc Mental", t: "psychic", p: 50, c: "spec", f: "mental" },
    { k: "psybeam", n: "Rafale Psy", t: "psychic", p: 65, c: "spec", f: "rayon" },
    { k: "psycho-cut", n: "Coupe Psycho", t: "psychic", p: 70, c: "phys", f: "entaille" },
    { k: "mystical-power", n: "Force Mystique", t: "psychic", p: 70, c: "spec", f: "signature" },
    { k: "extrasensory", n: "Extrasenseur", t: "psychic", p: 80, c: "spec", f: "mental" },
    { k: "zen-headbutt", n: "Psykoud’Boul", t: "psychic", p: 80, c: "phys", f: "contact" },
    { k: "psyshock", n: "Choc Psy", t: "psychic", p: 80, c: "spec", f: "mental" },
    { k: "psychic", n: "Psyko", t: "psychic", p: 90, c: "spec", f: "mental" },
    { k: "psystrike", n: "Frappe Psy", t: "psychic", p: 100, c: "spec", f: "signature" },
    { k: "future-sight", n: "Prescience", t: "psychic", p: 120, c: "spec", f: "signature" },
    { k: "rock-blast", n: "Boule Roc", t: "rock", p: 25, c: "phys", f: "rafale" },
    { k: "rollout", n: "Roulade", t: "rock", p: 30, c: "phys", f: "signature" },
    { k: "rock-throw", n: "Jet-Pierres", t: "rock", p: 50, c: "phys", f: "rafale" },
    { k: "smack-down", n: "Anti-Air", t: "rock", p: 50, c: "phys", f: "projectile" },
    { k: "ancient-power", n: "Pouvoir Antique", t: "rock", p: 60, c: "spec", f: "zone" },
    { k: "rock-tomb", n: "Tomberoche", t: "rock", p: 60, c: "phys", f: "ciel" },
    { k: "rock-slide", n: "Éboulement", t: "rock", p: 75, c: "phys", f: "ciel" },
    { k: "power-gem", n: "Rayon Gemme", t: "rock", p: 80, c: "spec", f: "rayon" },
    { k: "stone-edge", n: "Lame de Roc", t: "rock", p: 100, c: "phys", f: "ciel" },
    { k: "head-smash", n: "Fracass’Tête", t: "rock", p: 150, c: "phys", f: "signature" },
    { k: "rock-wrecker", n: "Roc-Boulet", t: "rock", p: 150, c: "phys", f: "signature" },
    { k: "bullet-punch", n: "Pisto-Poing", t: "steel", p: 40, c: "phys", f: "poing" },
    { k: "metal-claw", n: "Griffe Acier", t: "steel", p: 50, c: "phys", f: "entaille" },
    { k: "smart-strike", n: "Estocorne", t: "steel", p: 70, c: "phys", f: "contact" },
    { k: "steel-wing", n: "Ailes d’Acier", t: "steel", p: 70, c: "phys", f: "entaille" },
    { k: "flash-cannon", n: "Luminocanon", t: "steel", p: 80, c: "spec", f: "rayon" },
    { k: "iron-head", n: "Tête de Fer", t: "steel", p: 80, c: "phys", f: "contact" },
    { k: "meteor-mash", n: "Poing Météore", t: "steel", p: 90, c: "phys", f: "poing" },
    { k: "iron-tail", n: "Queue de Fer", t: "steel", p: 100, c: "phys", f: "queue" },
    { k: "whirlpool", n: "Siphon", t: "water", p: 35, c: "spec", f: "piege" },
    { k: "water-gun", n: "Pistolet à O", t: "water", p: 40, c: "spec", f: "rafale" },
    { k: "aqua-jet", n: "Aqua-Jet", t: "water", p: 40, c: "phys", f: "contact" },
    { k: "water-pulse", n: "Vibraqua", t: "water", p: 60, c: "spec", f: "projectile" },
    { k: "bubble-beam", n: "Bulles d’O", t: "water", p: 65, c: "spec", f: "rafale" },
    { k: "brine", n: "Saumure", t: "water", p: 65, c: "spec", f: "projectile" },
    { k: "octazooka", n: "Octazooka", t: "water", p: 65, c: "spec", f: "signature" },
    { k: "razor-shell", n: "Coqui-Lame", t: "water", p: 75, c: "phys", f: "entaille" },
    { k: "dive", n: "Plongée", t: "water", p: 80, c: "phys", f: "signature" },
    { k: "waterfall", n: "Cascade", t: "water", p: 80, c: "phys", f: "contact" },
    { k: "liquidation", n: "Aqua-Brèche", t: "water", p: 85, c: "phys", f: "contact" },
    { k: "aqua-tail", n: "Hydro-Queue", t: "water", p: 90, c: "phys", f: "queue" },
    { k: "surf", n: "Surf", t: "water", p: 90, c: "spec", f: "zone" },
    { k: "muddy-water", n: "Ocroupi", t: "water", p: 90, c: "spec", f: "zone" },
    { k: "crabhammer", n: "Pince-Masse", t: "water", p: 100, c: "phys", f: "poing" },
    { k: "hydro-pump", n: "Hydrocanon", t: "water", p: 110, c: "spec", f: "rayon" },
    { k: "wave-crash", n: "Aquatacle", t: "water", p: 120, c: "phys", f: "contact" },
  ];
  let Je = 320,
    Ze = 180;
  const x = document.createElement("canvas"),
    $ = x.getContext("2d"),
    X = ["#fffbe0", "#ffe14d", "#ffa21f", "#f0541c", "#a8202a", "#4a1c2c"];
  let Tt = X;
  const le = ["#6b5a66", "#4a3f4c", "#2f2833"],
    P = { x: 78, y: 118 },
    u = { x: 232, y: 70 };
  let ve = [],
    it = [],
    De = 1,
    je = 0,
    pt = 0,
    re = 0,
    We = 2,
    oe = !1;
  const $e = (o, n, s) => {
      (($.fillStyle = s), $.fillRect(o | 0, n | 0, 1, 1));
    },
    Z = (o, n, s, l) => {
      (($.fillStyle = l), $.fillRect(Math.round(o - s / 2), Math.round(n - s / 2), s, s));
    };
  function A(o, n, s, l, c = 0) {
    (($.fillStyle = l), (o |= 0), (n |= 0));
    const p = Math.ceil(s);
    if (!c) {
      for (let y = -p; y <= p; y++) {
        const v = s * s - y * y;
        if (v < 0) continue;
        const M = Math.min(p, Math.floor(Math.sqrt(v)));
        $.fillRect(o - M, n + y, 2 * M + 1, 1);
      }
      return;
    }
    for (let y = -p; y <= p; y++)
      for (let v = -p; v <= p; v++)
        v * v + y * y <= s * s &&
          !(c && (v + y + o + n) & 1 && Math.random() < c) &&
          $.fillRect(o + v, n + y, 1, 1);
  }
  function J(o, n, s, l, c) {
    $.fillStyle = c;
    const p = Math.ceil(s);
    for (let y = -p; y <= p; y++)
      for (let v = -p; v <= p; v++) {
        const M = Math.hypot(v, y);
        M <= s && M > s - l && $.fillRect((o | 0) + v, (n | 0) + y, 1, 1);
      }
  }
  function de(o, n, s) {
    const l = X;
    (A(o, n, s + 1 + Math.random(), l[4]),
      A(o, n, s, l[3]),
      A(o, n, s * 0.72, l[2]),
      A(o, n, s * 0.45, l[1]),
      A(o, n, s * 0.2, l[0]));
  }
  const _e = (o, n, s) => o + (n - o) * s,
    Re = (o) => 1 - (1 - o) ** 3;
  function dt(o, n, s, l) {
    const c = (n.x + s.x) / 2,
      p = Math.min(n.y, s.y) - l;
    return {
      x: (1 - o) ** 2 * n.x + 2 * (1 - o) * o * c + o * o * s.x,
      y: (1 - o) ** 2 * n.y + 2 * (1 - o) * o * p + o * o * s.y,
    };
  }
  function qe(o, n, s = {}) {
    it.push({
      x: o,
      y: n,
      vx: s.vx || 0,
      vy: s.vy || 0,
      life: 0,
      max: s.max || 400,
      size: s.size || 2,
      heat: s.heat ?? 0,
      grav: s.grav ?? -0.02,
      drag: s.drag ?? 0.96,
      smoke: s.smoke,
      hot: s.hot,
      round: s.round,
      pal: s.pal,
      spal: s.spal,
    });
  }
  function ce(o, n, s, l, c = {}) {
    for (let p = 0; p < s; p++) {
      const y = Math.random() * 6.283,
        v = l * (0.4 + Math.random() * 0.8);
      qe(o, n, {
        vx: Math.cos(y) * v,
        vy: Math.sin(y) * v,
        max: c.max || 300 + Math.random() * 300,
        size: c.size || 1 + ((Math.random() * 3) | 0),
        heat: c.heat ?? Math.random() * 0.3,
        grav: c.grav,
        drag: c.drag,
      });
    }
  }
  function tt(o) {
    it = it.filter((n) => {
      if (((n.life += o), n.life > n.max)) return !1;
      const s = o / 16;
      ((n.vx *= n.drag ** s), (n.vy = n.vy * n.drag ** s + n.grav * s), (n.x += n.vx * s), (n.y += n.vy * s));
      const l = n.life / n.max,
        c = n.pal || X;
      if (n.smoke)
        return (
          (((n.x + n.y) | 0) % 2 && l > 0.5) || Z(n.x, n.y, n.size, (n.spal || le)[Math.min(2, (l * 3) | 0)]),
          !0
        );
      const p = Math.min(5, Math.floor(1 + n.heat * 2 + l * 4.2) - (n.hot && l < 0.25 ? 1 : 0));
      if (l > 0.7 && ((n.x | 0) + (n.y | 0)) & 1) return !0;
      if (n.round) {
        const y = n.size * (0.55 + l * 0.9);
        return (
          A(n.x, n.y, y, c[Math.min(5, p + 1)], l > 0.7 ? 0.6 : 0),
          p < 3 && A(n.x - y * 0.15, n.y - y * 0.15, y * 0.55, c[p]),
          !0
        );
      }
      return (Z(n.x, n.y, Math.max(1, Math.round(n.size * (1 - l * 0.5))), c[p]), !0);
    });
  }
  function mt(o) {
    const n = f("#def");
    (n.animate(
      [
        { filter: "brightness(4) saturate(0)" },
        { filter: "none" },
        { filter: "brightness(4) saturate(0)" },
        { filter: "none" },
      ],
      { duration: 260, easing: "steps(4)" },
    ),
      n.animate(
        [
          { transform: "translateX(0)" },
          { transform: `translateX(${o * 4}px)` },
          { transform: `translateX(${-o * 3}px)` },
          { transform: "translateX(0)" },
        ],
        { duration: 240 / De, easing: "steps(6)" },
      ));
    const s = f("#barDef");
    s.style.width = Math.max(8, parseFloat(s.style.width || 100) - [0, 12, 28, 55][o]) + "%";
  }
  function Te() {
    f("#atk").animate(
      [
        { transform: "scaleX(-1)" },
        { transform: "scaleX(-1) translate(-6px,3px) scale(1.12,.86)", offset: 0.35 },
        { transform: "scaleX(-1) translate(9px,-3px) scale(.9,1.12)", offset: 0.65 },
        { transform: "scaleX(-1) scale(1.04,.97)", offset: 0.85 },
        { transform: "scaleX(-1)" },
      ],
      { duration: 340 / De, easing: "ease-in-out" },
    );
  }
  {
    const o = Element.prototype.animate,
      n = "cubic-bezier(.3,.7,.3,1)";
    Element.prototype.animate = function (s, l) {
      if (
        ((this === a.atk || this === a.def || this.classList?.contains("fxclone")) &&
          Array.isArray(s) &&
          s.some((p) => p.transform) &&
          !s.some((p) => p.filter || (p.opacity !== void 0 && p.offset === void 0 && !1)) &&
          (typeof l == "object" && String(l.easing || "").startsWith("steps") && (l = { ...l, easing: n }),
          this === a.def &&
            s.length === 4 &&
            s.every((p) => !p.filter) &&
            /translate/.test(s[1].transform || "") &&
            !/scale/.test(s[1].transform) &&
            ((s = s.map((p, y) =>
              y === 1
                ? { ...p, transform: p.transform + " scale(1.1,.88)" }
                : y === 2
                  ? { ...p, transform: p.transform + " scale(.95,1.06)" }
                  : p,
            )),
            s.splice(3, 0, { transform: "scale(1.02,.98)" }))),
        this === a.atk && Array.isArray(s) && s.length >= 3)
      ) {
        const p = (y) => /translate\([^)]*px/.test(y.transform || "");
        s = s.map((y, v) => {
          if (!y.transform || /scale\((?!X)|rotate/.test(y.transform.replace("scaleX(-1)", ""))) return y;
          const M = s[v - 1],
            I = s[v + 1];
          return p(y) && M && !p(M)
            ? { ...y, transform: y.transform + " scale(.88,1.1)" }
            : p(y) && I && p(I)
              ? { ...y, transform: y.transform + " scale(1.03,.97)" }
              : !p(y) && M && p(M) && I
                ? { ...y, transform: y.transform + " scale(1.1,.9)" }
                : y;
        });
      }
      return (
        (this === a.atk || this === a.def) && Array.isArray(s) && (s = s.map(ue)),
        t.Game?.S?.noFlash && Array.isArray(s) && (s = s.map(B)),
        o.call(this, s, l)
      );
    };
  }
  function At() {
    let n = !1;
    return (
      Te(),
      (s) => {
        const l = s / 380;
        if (l < 1) {
          const c = dt(Re(l), P, u, 30);
          de(c.x, c.y, 5.5 + Math.sin(s / 30));
          for (let p = 0; p < 3; p++)
            qe(c.x + (Math.random() - 0.5) * 6, c.y + (Math.random() - 0.5) * 6, {
              vx: (Math.random() - 0.5) * 0.5,
              vy: -0.3 - Math.random() * 0.4,
              heat: Math.random() * 0.5,
              max: 260 + Math.random() * 160,
              size: 3 + ((Math.random() * 2) | 0),
              round: Math.random() < 0.5,
            });
        } else
          n || ((n = !0), de(u.x, u.y, 9), ce(u.x, u.y, 22, 2.2, { max: 340, size: 3 }), mt(1), (re = 2));
        return s < 650;
      }
    );
  }
  function yt() {
    return (
      Te(),
      (o) => {
        if (o < 160)
          (A(P.x, P.y, 3 + o / 25, Tt[3]),
            A(P.x, P.y, 2 + o / 35, Tt[2]),
            A(P.x, P.y, 1 + o / 60, Tt[0]),
            Math.random() < 0.6 &&
              qe(P.x + (Math.random() - 0.5) * 16, P.y + (Math.random() - 0.5) * 16, {
                vx: (P.x - P.x) / 1,
                heat: 0.2,
                max: 160,
                size: 1,
              }));
        else if (o < 760) {
          const n = (o - 160) / 600,
            s = Math.min(1, n * 3);
          for (let l = 0; l < 3; l++) {
            const c = u.x - P.x,
              p = u.y - P.y,
              y = Math.atan2(p, c) + Math.sin(o / 70) * 0.06,
              v = y + (Math.random() - 0.5) * 0.32,
              M = 3.4 + Math.random() * 1.2;
            qe(P.x, P.y, {
              vx: Math.cos(v) * M,
              vy: Math.sin(v) * M,
              hot: 1,
              heat: 0.1 + 0.4 * Math.random(),
              max: (Math.hypot(c, p) / M) * 16 * (0.75 + Math.random() * 0.4) * s + 60,
              size: 2.5 + Math.random() * 2.5,
              round: 1,
              drag: 0.995,
              grav: -0.01,
            });
          }
          if (s >= 1) {
            o % 60 < 17 && (mt.flick = 1);
            for (let l = 0; l < 2; l++)
              qe(u.x + (Math.random() - 0.5) * 40, u.y + 16, {
                vy: -1 - Math.random() * 1.4,
                vx: (Math.random() - 0.5) * 0.6,
                heat: 0.2,
                max: 320,
                size: 2.5 + Math.random() * 2,
                round: 1,
                grav: -0.02,
              });
          }
          s >= 1 && !yt.done && ((yt.done = 1), mt(2), (re = 4));
        } else
          o < 1100 &&
            Math.random() < 0.3 &&
            qe(u.x + (Math.random() - 0.5) * 24, u.y, { vy: -0.5, smoke: 1, size: 3, max: 500, grav: -0.01 });
        return (o >= 1100 && (yt.done = 0), o < 1100);
      }
    );
  }
  function he() {
    let o = !1;
    return (
      Te(),
      (n) => {
        const s = f("#tint");
        if (
          ((s.style.opacity = n < 950 ? Math.min(0.3, n / 900) : Math.max(0, 0.3 - (n - 950) / 300)), n < 380)
        ) {
          const l = 2 + n / 40;
          for (let c = 0; c < 4; c++) {
            const p = Math.random() * 6.283,
              y = 30 - n / 14;
            qe(P.x + Math.cos(p) * y, P.y + Math.sin(p) * y, {
              vx: -Math.cos(p) * 1.2,
              vy: -Math.sin(p) * 1.2,
              heat: 0.1,
              max: 200,
              size: 1,
              grav: 0,
            });
          }
          (de(P.x, P.y, l * 0.6), n > 330 && J(P.x, P.y, 12 + (n - 330) / 4, 2, Tt[0]));
        } else if (n < 640) {
          const l = Re((n - 380) / 260),
            c = dt(l, P, u, 10);
          de(c.x, c.y, 9 + Math.sin(n / 20));
          for (let p = 0; p < 4; p++)
            qe(c.x - Math.random() * 8, c.y + (Math.random() - 0.5) * 10, {
              vx: -1,
              heat: 0.3,
              max: 260,
              size: 3,
            });
        } else {
          if (!o) {
            ((o = !0),
              (pt = 50),
              (re = 5),
              mt(3),
              ce(u.x, u.y, 34, 2.6, { max: 420, drag: 0.92, heat: 0.9 }));
            for (let c = 0; c < 22; c++)
              qe(u.x + (Math.random() - 0.5) * 36, u.y + (Math.random() - 0.5) * 24, {
                smoke: 1,
                size: 4 + ((Math.random() * 3) | 0),
                max: 900 + Math.random() * 400,
                vx: (Math.random() - 0.5) * 0.8,
                vy: -0.3 - Math.random() * 0.5,
                grav: -0.01,
                drag: 0.97,
              });
          }
          const l = (n - 640) / 480;
          if (l < 1) {
            n < 665 && (($.globalAlpha = 0.45), ($.fillStyle = Tt[0]), Ge(), ($.globalAlpha = 1));
            const c = Math.min(1, l * 7),
              p = l * 0.5,
              y = Math.max(0, (l - 0.55) * 2.2);
            ([
              [0, -1],
              [-1, -0.15],
              [1, -0.15],
              [-0.7, 1],
              [0.7, 1],
            ].forEach(([v, M], I) => {
              let ke = Math.atan2(M, v) + p;
              const Se = Math.cos(ke),
                Ae = Math.sin(ke),
                St = (28 + l * 8) * c + Math.sin(n / 25 + I * 2) * 2;
              for (let Jt = 0; Jt < St; Jt += 2)
                A(u.x + Se * Jt, u.y + Ae * Jt, (1 - Jt / (St + 6)) * 4.5 + 2.2, Tt[l < 0.5 ? 3 : 4], y);
              for (let Jt = 0; Jt < St; Jt += 2) {
                const Oa = (1 - Jt / (St + 6)) * 4.5 + 1;
                A(u.x + Se * Jt, u.y + Ae * Jt, Oa, Tt[Jt < St * 0.3 ? 0 : Jt < St * 0.6 ? 1 : 2], y);
              }
              Math.random() < 0.4 &&
                qe(u.x + Se * St, u.y + Ae * St, {
                  vx: Se * 2.5,
                  vy: Ae * 2.5,
                  heat: 0.3,
                  max: 260,
                  size: 3,
                  drag: 0.93,
                });
            }),
              A(u.x, u.y, 8 * (1 - l * 0.6), Tt[0], y),
              Math.random() < 0.5 &&
                qe(u.x + (Math.random() - 0.5) * 30, u.y + (Math.random() - 0.5) * 20, {
                  round: 1,
                  size: 3 + Math.random() * 2,
                  heat: 1.4,
                  max: 420,
                  vy: -0.6,
                  grav: -0.01,
                }),
              Math.random() < 0.35 &&
                qe(u.x + (Math.random() - 0.5) * 30, u.y, {
                  smoke: 1,
                  size: 5,
                  max: 900,
                  vy: -0.5,
                  grav: -0.01,
                }),
              l < 0.75 && J(u.x, u.y, 10 + l * 50, 2, l < 0.3 ? Tt[1] : l < 0.55 ? Tt[3] : Tt[4]));
          }
        }
        return n < 1300;
      }
    );
  }
  function fe(o) {
    const n = Math.min(50, o - je) * De;
    if (((je = o), pt > 0)) {
      ((pt -= n), es(fe));
      return;
    }
    ($.clearRect(0, 0, Je, Ze),
      (ve = ve.filter((s) => ((s.t += n), s.fn(s.t)))),
      tt(n),
      rt(n),
      zt(n),
      cn(n),
      Ia(n),
      re > 0.3
        ? ((a.shakeEl.style.translate = `${((Math.random() - 0.5) * re * 2) | 0}px ${((Math.random() - 0.5) * re * 2) | 0}px`),
          (re *= 0.86))
        : a.shakeEl && (a.shakeEl.style.translate = ""),
      ve.length ||
      it.length ||
      nt.length ||
      W.length ||
      Ga.length ||
      Ja.length ||
      kn.length ||
      re > 0.3 ||
      pt > 0
        ? es(fe)
        : ((vt = !1), $.clearRect(0, 0, Je, Ze)));
  }
  const Oe = ["#ffffff", "#fff7a8", "#ffdc2e", "#f5a70f", "#8a5a12", "#2a2440"];
  function Ee(o, n, s, l, c, p) {
    $.fillStyle = p;
    const y = Math.max(Math.abs(s - o), Math.abs(l - n)) | 0 || 1;
    for (let v = 0; v <= y; v++) {
      const M = o + ((s - o) * v) / y,
        I = n + ((l - n) * v) / y;
      $.fillRect(Math.round((M - c / 2) / 2) * 2, Math.round((I - c / 2) / 2) * 2, c, c);
    }
  }
  function et(o, n, s, l) {
    let c = [o, n];
    for (let p = 0; p < l; p++) {
      const y = [c[0]];
      for (let v = 1; v < c.length; v++) {
        const M = c[v - 1],
          I = c[v],
          ke = I.x - M.x,
          Se = I.y - M.y,
          Ae = Math.hypot(ke, Se) || 1,
          St = ((Math.random() - 0.5) * s * Ae) / 60;
        y.push({ x: (M.x + I.x) / 2 - (Se / Ae) * St, y: (M.y + I.y) / 2 + (ke / Ae) * St }, I);
      }
      ((c = y), (s *= 0.55));
    }
    return c;
  }
  function _(o, n, s, l = 0, c = 3) {
    const p = et(o, n, s, c),
      y = [];
    for (let v = 0; v < l; v++) {
      const M = (1 + Math.random() * (p.length - 2)) | 0,
        I = p[M],
        ke = Math.atan2(n.y - o.y, n.x - o.x) + (Math.random() < 0.5 ? -1 : 1) * (0.6 + Math.random() * 0.5),
        Se = 10 + Math.random() * 14;
      y.push(et(I, { x: I.x + Math.cos(ke) * Se, y: I.y + Math.sin(ke) * Se }, s * 0.5, 2));
    }
    return { main: p, br: y };
  }
  function we(o, n) {
    const s = (l, c, p) => {
      for (let y = 1; y < l.length; y++) Ee(l[y - 1].x, l[y - 1].y, l[y].x, l[y].y, c, p);
    };
    (s(o.main, n + 2, Oe[3]),
      s(o.main, n, Oe[2]),
      s(o.main, Math.max(2, n - 2), Oe[0]),
      o.br.forEach((l) => {
        (s(l, n, Oe[3]), s(l, 2, Oe[1]));
      }));
  }
  function ie(o, n, s, l, c) {
    const p = Math.floor(l / s);
    return (o[n + "s"] !== p && ((o[n + "s"] = p), (o[n] = c())), o[n]);
  }
  function U(o, n, s, l) {
    const c = [];
    for (let p = 0; p < l; p++) {
      const y = Math.random() * 6.283,
        v = y + (Math.random() < 0.5 ? 1 : -1) * (0.8 + Math.random()),
        M = { x: o + Math.cos(y) * s * 0.4, y: n + Math.sin(y) * s * 0.4 },
        I = { x: o + Math.cos(v) * s, y: n + Math.sin(v) * s };
      c.push(et(M, I, 16, 2));
    }
    return c;
  }
  function Ne(o) {
    o.forEach((n) => {
      for (let s = 1; s < n.length; s++) Ee(n[s - 1].x, n[s - 1].y, n[s].x, n[s].y, 2, Oe[3]);
      for (let s = 1; s < n.length; s++) Ee(n[s - 1].x, n[s - 1].y, n[s].x, n[s].y, 1, Oe[0]);
    });
  }
  function T(o, n, s, l) {
    for (let c = 0; c < s; c++) {
      const p = Math.random() * 6.283,
        y = l * (0.5 + Math.random());
      qe(o, n, {
        vx: Math.cos(p) * y,
        vy: Math.sin(p) * y,
        pal: Oe,
        heat: Math.random() * 0.4,
        max: 200 + Math.random() * 180,
        size: 2,
        grav: 0.05,
        drag: 0.9,
      });
    }
  }
  function L(o) {
    const n = f("#def"),
      s = [];
    for (let c = 0; c < 3 + o * 2; c++)
      s.push({
        filter: c % 2 ? "none" : "brightness(2.6) sepia(1) saturate(4) hue-rotate(5deg)",
        transform: `translateX(${c % 2 ? o : -o}px)`,
      });
    (s.push({ filter: "none", transform: "none" }),
      n.animate(s, { duration: (200 + o * 110) / De, easing: `steps(${s.length})` }));
    const l = f("#barDef");
    l.style.width = Math.max(8, parseFloat(l.style.width || 100) - [0, 12, 28, 55][o]) + "%";
  }
  const R = { x: P.x + 4, y: P.y - 6 };
  function te(o, n, s, l, c) {
    (A(o, n, s + 1, Oe[3]),
      A(o, n, s, Oe[2]),
      A(o, n, s * 0.6, Oe[1]),
      A(o, n, s * 0.3, Oe[0]),
      Ne(
        ie(l, "ba", 90, c, () => U(o, n, s + 5, 2)).map((p) =>
          p.map((y) => ({ x: y.x - l.bx + o, y: y.y - l.by + n })),
        ),
      ));
  }
  function K() {
    const o = {};
    let s = 0;
    return (
      Te(),
      (l) => {
        if (l < 140) (A(R.x, R.y, 1 + l / 50, Oe[2]), A(R.x, R.y, l / 90, Oe[0]));
        else {
          const c = (l - 140) / 400;
          if (c < 1) {
            const p = dt(Re(c), R, u, 22);
            (o.bxs !== Math.floor(l / 90) && ((o.bxs = Math.floor(l / 90)), (o.bx = p.x), (o.by = p.y)),
              te(p.x, p.y, 4, o, l),
              Math.random() < 0.5 &&
                qe(p.x, p.y, { pal: Oe, heat: 0.3, max: 180, size: 2, grav: 0, drag: 0.9 }));
          } else
            s
              ? l < 720 && Ne(ie(o, "hit", 100, l, () => U(u.x, u.y, 14, 2)))
              : ((s = 1), A(u.x, u.y, 9, Oe[1]), A(u.x, u.y, 5, Oe[0]), T(u.x, u.y, 14, 2), L(1), (re = 1.5));
        }
        return l < 720;
      }
    );
  }
  function He() {
    const o = {},
      n = [220, 400, 540];
    let s = 0;
    return (
      Te(),
      (l) => (
        l < 220 &&
          (l % 120 < 60 && Ne(ie(o, "ch", 90, l, () => U(R.x, R.y, 10, 2))), A(R.x, R.y, 2 + l / 110, Oe[2])),
        n.forEach((c, p) => {
          const y = l - c;
          if (y < 0 || y >= 110) return;
          const v = ie(o, "b" + p, 55, y, () =>
            _(
              { x: u.x + (p - 1) * 14 + (Math.random() - 0.5) * 20, y: -4 },
              { x: u.x + (p - 1) * 6, y: u.y + 6 },
              34,
              1,
              3,
            ),
          );
          (we(v, y < 50 ? 3 : 2),
            A(u.x + (p - 1) * 6, u.y + 6, 5, Oe[1]),
            A(u.x + (p - 1) * 6, u.y + 6, 2, Oe[0]),
            s <= p &&
              ((s = p + 1),
              T(u.x + (p - 1) * 6, u.y + 6, 12, 2.2),
              (re = 2.5),
              p === 0 && L(2),
              p === 0 && (($.globalAlpha = 0.3), ($.fillStyle = Oe[0]), Ge(), ($.globalAlpha = 1))));
        }),
        l > 650 && l < 950 && Ne(ie(o, "tail", 110, l, () => U(u.x, u.y, 18, 2))),
        l < 950
      )
    );
  }
  function m() {
    const o = {};
    let n = 0;
    return (
      Te(),
      (s) => {
        const l = f("#tint");
        if (
          ((l.style.opacity = s < 1e3 ? Math.min(0.45, s / 500) : Math.max(0, 0.45 - (s - 1e3) / 250)),
          s < 420)
        ) {
          if (s % 160 < 70) {
            const c = ie(o, "sky", 160, s, () => {
              const p = 40 + Math.random() * 240;
              return _(
                { x: p, y: -4 },
                { x: p + (Math.random() - 0.5) * 40, y: 14 + Math.random() * 14 },
                20,
                0,
                2,
              );
            });
            we(c, 2);
          }
          (A(R.x, R.y, 2 + s / 90, Oe[2]),
            Ne(ie(o, "ch", 90, s, () => U(R.x, R.y, 14, 2))),
            s > 300 &&
              we(
                ie(o, "up", 60, s, () => _(R, { x: R.x + (Math.random() - 0.5) * 10, y: -4 }, 24, 0, 3)),
                2,
              ));
        } else if (s < 760) {
          const c = s - 420;
          if (!n) {
            ((n = 1), (pt = 60), (re = 6), L(3), T(u.x, u.y + 14, 36, 3));
            for (let y = 0; y < 10; y++)
              qe(u.x + (Math.random() - 0.5) * 40, u.y + 18, {
                smoke: 1,
                size: 4,
                max: 700,
                vy: -0.4,
                grav: -0.01,
              });
          }
          c < 34 && (($.globalAlpha = 0.5), ($.fillStyle = Oe[0]), Ge(), ($.globalAlpha = 1));
          const p = c < 120 ? 10 : c < 240 ? 6 : 4;
          ((c < 300 || s % 100 < 50) &&
            we(
              ie(o, "big", 70, c, () =>
                _({ x: u.x + (Math.random() - 0.5) * 16, y: -6 }, { x: u.x, y: u.y + 14 }, 30, 3, 3),
              ),
              p,
            ),
            J(u.x, u.y + 16, 8 + c / 6, 2, c < 150 ? Oe[1] : Oe[3]),
            A(u.x, u.y + 10, 8, Oe[1]),
            A(u.x, u.y + 10, 4, Oe[0]));
        } else
          (Ne(ie(o, "tail", 110, s, () => U(u.x, u.y, 22, 3))),
            Math.random() < 0.2 && T(u.x + (Math.random() - 0.5) * 30, u.y, 2, 1.2));
        return s < 1150;
      }
    );
  }
  const z = ["#ffffff", "#ffd9f6", "#ff8fdc", "#d94fd0", "#7a34b8", "#2a1a4a"],
    pe = ["#8ff3ff", "#ff8fdc", "#c69bff"];
  function V(o, n, s, l, c, p = 2, y = 0) {
    $.fillStyle = c;
    const v = Math.max(12, ((s + l) * 1.6) | 0);
    for (let M = 0; M < v; M++) {
      if (y && M % 2 && Math.random() < y) continue;
      const I = (M / v) * 6.283;
      $.fillRect(Math.round((o + Math.cos(I) * s) / 2) * 2, Math.round((n + Math.sin(I) * l) / 2) * 2, p, p);
    }
  }
  function lt(o, n, s, l) {
    (($.fillStyle = l),
      (o = Math.round(o)),
      (n = Math.round(n)),
      $.fillRect(o - s, n, s * 2 + 1, 1),
      $.fillRect(o, n - s, 1, s * 2 + 1),
      ($.fillStyle = z[0]),
      $.fillRect(o, n, 1, 1));
  }
  function kt(o, n, s, l) {
    for (let c = 0; c < l; c++) {
      const p = Math.random() * 6.283,
        y = Math.random() * s;
      qe(o + Math.cos(p) * y, n + Math.sin(p) * y, {
        pal: z,
        heat: Math.random() * 0.6,
        max: 260 + Math.random() * 200,
        size: 2,
        grav: -0.02,
        vx: (Math.random() - 0.5) * 0.6,
        vy: -0.3 - Math.random() * 0.5,
      });
    }
  }
  function ra(o, n = 0, s = 1) {
    const l = f("#def"),
      c = [];
    for (let y = 0; y <= 8; y++) {
      const v = Math.sin((y / 8) * Math.PI * 3) * (1 - y / 9);
      c.push({
        transform: `translateY(${-n * Math.sin((y / 8) * Math.PI)}px) skewX(${v * o * 6 * s}deg) scaleY(${1 + v * o * 0.04 * s})`,
        filter: y % 2 ? "none" : "hue-rotate(250deg) saturate(2) brightness(1.4)",
      });
    }
    l.animate(c, { duration: (300 + o * 150) / De, easing: "steps(9)" });
    const p = f("#barDef");
    p.style.width = Math.max(8, parseFloat(p.style.width || 100) - [0, 12, 28, 55][o]) + "%";
  }
  function Vt(o) {
    const n = (Math.sin(o / 40) + 1) / 2;
    lt(P.x - 2, P.y - 12, 1 + ((n * 2) | 0), z[2]);
  }
  function Xt() {
    let o = 0;
    return (
      Te(),
      (n) => (
        n < 200 && Vt(n),
        [150, 280, 410].forEach((s, l) => {
          const c = (n - s) / 240;
          if (c < 0 || c > 1) return;
          const p = 34 * (1 - Re(c)) + 6;
          (V(u.x, u.y, p, p * 0.55, c < 0.5 ? z[2] : z[3], 2, c > 0.7 ? 0.5 : 0),
            V(u.x, u.y, p + 3, (p + 3) * 0.55, z[4], 1, 0.5));
        }),
        !o && n > 380 && ((o = 1), ra(1), kt(u.x, u.y, 14, 8)),
        n < 750
      )
    );
  }
  function Ht() {
    let o = 0;
    return (
      Te(),
      (n) => {
        if (n < 220) (Vt(n), V(P.x, P.y - 8, 10 - n / 30, (10 - n / 30) * 0.6, z[2]));
        else if (n < 820) {
          const s = u.x - P.x,
            l = u.y - (P.y - 8),
            c = Math.hypot(s, l),
            p = Math.min(1, (n - 220) / 200);
          for (let y = 0; y < c * p; y += 7) {
            const v = ((n - 220) / 4) % 7,
              M = (y + v) / c;
            if (M > p) continue;
            const I = P.x + s * M,
              ke = P.y - 8 + l * M,
              Se = 3 + M * 6 + Math.sin(n / 50 + M * 10),
              Ae = pe[(((y / 7) | 0) + ((n / 70) | 0)) % 3];
            (($.fillStyle = Ae), V(I, ke, Se * 0.45, Se, Ae, 2));
          }
          p >= 1 &&
            (o || ((o = 1), ra(2), (re = 2)),
            n % 90 < 17 && kt(u.x, u.y, 16, 4),
            V(u.x, u.y, 10 + (n % 120) / 8, (10 + (n % 120) / 8) * 0.6, z[1], 2, 0.4));
        }
        return n < 1e3;
      }
    );
  }
  function ct() {
    let o = 0,
      n = 0;
    return (
      Te(),
      (s) => {
        const l = f("#tint");
        if (
          ((l.style.opacity = s < 1150 ? Math.min(0.4, s / 500) : Math.max(0, 0.4 - (s - 1150) / 200)),
          s < 240)
        )
          (Vt(s), V(P.x, P.y - 8, 16 - s / 20, (16 - s / 20) * 0.6, z[2], 2));
        else if (s < 900) {
          const c = (s - 240) / 660;
          o ||
            ((o = 1),
            f("#def").animate(
              [
                { transform: "translateY(0)" },
                { transform: "translateY(-14px)", offset: 0.25 },
                { transform: "translateY(-17px) rotate(-3deg)", offset: 0.6 },
                { transform: "translateY(-18px) rotate(3deg)", offset: 0.85 },
                { transform: "translateY(0)" },
              ],
              { duration: 740 / De, easing: "steps(12)" },
            ));
          const p = u.y - 12 * Math.min(1, c * 4),
            y = ((s / 60) | 0) % 2;
          (V(u.x, p, 26 + y * 2, 16 + y, z[3], 2), V(u.x, p, 22, 13, z[2], 2, 0.5));
          for (let v = 0; v < 3; v++) {
            const M = 60 * (1 - ((c * 2 + v / 3) % 1));
            V(u.x, p, M, M * 0.6, z[4], 2, 0.4);
          }
          (Math.random() < 0.5 && kt(u.x, p, 24, 1),
            s % 80 < 17 &&
              lt(
                u.x + (Math.random() - 0.5) * 50,
                p + (Math.random() - 0.5) * 30,
                3,
                pe[(Math.random() * 3) | 0],
              ));
        } else {
          const c = s - 900;
          if (
            (n ||
              ((n = 1),
              (pt = 50),
              (re = 5),
              ra(3),
              kt(u.x, u.y + 10, 40, 22),
              ($.globalAlpha = 0.4),
              ($.fillStyle = z[1]),
              Ge(),
              ($.globalAlpha = 1)),
            c < 300)
          ) {
            const p = 8 + c / 4;
            (V(u.x, u.y + 16, p, p * 0.35, c < 120 ? z[1] : z[3], 2, c > 180 ? 0.5 : 0),
              V(u.x, u.y + 16, p * 0.6, p * 0.21, z[2], 2, 0.4));
          }
        }
        return s < 1350;
      }
    );
  }
  const wt = ["#ffffff", "#cdf5ff", "#74d6ff", "#3394ea", "#1f54ad", "#14295c"],
    ge = ["#cfeeff", "#9fd0f0", "#6fa6d6"],
    Fe = ["#ffffff", "#e2f9ff", "#a9e6ff", "#74d6ff", "#4fb2f0", "#3394ea"];
  function gt(o, n, s = {}) {
    qe(o, n, {
      pal: Fe,
      round: 1,
      heat: s.heat ?? Math.random() * 0.6,
      max: s.max || 300 + Math.random() * 250,
      size: s.size || 1.5 + Math.random() * 2,
      vx: s.vx || 0,
      vy: s.vy || 0,
      grav: s.grav ?? 0.09,
      drag: s.drag ?? 0.98,
    });
  }
  function Dt(o, n, s, l, c = 1.6) {
    for (let p = 0; p < s; p++) {
      const y = -Math.PI / 2 + (Math.random() - 0.5) * 2.4,
        v = l * (0.4 + Math.random() * 0.8);
      gt(o, n, { vx: Math.cos(y) * v, vy: Math.sin(y) * v * c });
    }
  }
  function ha(o, n, s, l) {
    for (let c = 0; c < s; c++)
      qe(o + (Math.random() - 0.5) * l, n + (Math.random() - 0.5) * l * 0.5, {
        smoke: 1,
        spal: ge,
        size: 3 + ((Math.random() * 3) | 0),
        max: 500 + Math.random() * 400,
        vx: (Math.random() - 0.5) * 0.5,
        vy: -0.2 - Math.random() * 0.3,
        grav: -0.005,
        drag: 0.97,
      });
  }
  function _t(o, n, s) {
    (A(o, n, s + 1, wt[4]),
      A(o, n, s, wt[3]),
      A(o, n, s * 0.7, wt[2]),
      Z(o - s * 0.35, n - s * 0.35, Math.max(1, (s * 0.4) | 0), wt[0]));
  }
  function Ea(o, n, s, l = 1) {
    (($.globalAlpha = 0.28 * l),
      A(o, n, s, wt[2]),
      ($.globalAlpha = l),
      J(o, n, s, 1.2, s > 3 ? wt[2] : wt[1]),
      ($.fillStyle = wt[0]),
      $.fillRect(Math.round(o - s * 0.45), Math.round(n - s * 0.45), s > 3 ? 2 : 1, s > 3 ? 2 : 1),
      ($.globalAlpha = 1));
  }
  function ut() {
    Te();
    const o = [];
    for (let s = 0; s < 7; s++)
      o.push({
        d: s * 42 + Math.random() * 18,
        r: 3 + Math.random() * 4,
        ph: Math.random() * 6.28,
        amp: 4 + Math.random() * 7,
        dy: (Math.random() - 0.5) * 22,
        pop: 0,
      });
    let n = 0;
    return (s) => (
      o.forEach((l) => {
        const c = (s - l.d) / 430;
        if (!(c < 0)) {
          if (c < 1) {
            const p = dt(c, P, { x: u.x + (Math.random() - 0.5) * 2, y: u.y + l.dy }, 14);
            Ea(p.x, p.y + Math.sin(c * 9 + l.ph) * l.amp * Math.sin(c * Math.PI), l.r * (0.6 + c * 0.5));
          } else if (!l.pop) {
            l.pop = 1;
            const p = u.x + (Math.random() - 0.5) * 14,
              y = u.y + l.dy;
            J(p, y, l.r + 3, 1, wt[0]);
            for (let v = 0; v < 4; v++) {
              const M = v * 1.57 + Math.random();
              gt(p, y, {
                vx: Math.cos(M) * 1.2,
                vy: Math.sin(M) * 1.2 - 0.5,
                size: 1.2,
                max: 220,
                grav: 0.05,
              });
            }
            n || ((n = 1), mt(1));
          }
        }
      }),
      s < 850
    );
  }
  function jt() {
    let o = 0;
    return (
      Te(),
      (n) => {
        const s = (n - 100) / 950;
        if (s >= 0 && s < 1.08) {
          const l = _e(-40, Je + 70, Re(Math.min(1, s))),
            c = s > 0.88 ? Math.max(0, (1.08 - s) * 5) : 1,
            p = 118 * c,
            y = (I) => (I < 0 ? 0 : I < 26 ? Math.sqrt(I / 26) : 0.72 + 0.28 * Math.exp(-(I - 26) / 45)),
            v = (I) => Ze - p * y(l - I) + Math.round((Math.sin(I / 11 + n / 90) * 2) / 2) * 2;
          $.globalAlpha = 0.62;
          for (let I = 0; I < Je; I += 2) {
            if (l - I < 0) continue;
            const Se = v(I);
            (($.fillStyle = wt[3]), $.fillRect(I, Se + 6, 2, Ze - Se));
          }
          $.globalAlpha = 0.45;
          for (let I = 0; I < Je; I += 2) {
            if (l - I < 0) continue;
            const Se = v(I);
            (($.fillStyle = wt[4]), $.fillRect(I, Se + 30 + (((I / 2 + n / 30) | 0) % 4) * 2, 2, Ze));
          }
          (($.globalAlpha = 0.55), ($.fillStyle = wt[1]));
          for (let I = 0; I < 4; I++) {
            const ke = I * 14 + 16;
            for (let Se = ((n / 12 + I * 23) % 40) | 0; Se < Je; Se += 40) {
              if (l - Se < 4) continue;
              const St = v(Se);
              $.fillRect(Se, St + ke, 10, 2);
            }
          }
          $.globalAlpha = 1;
          for (let I = 0; I < Je; I += 2) {
            const ke = l - I;
            if (ke < 0) continue;
            const Se = v(I);
            (($.fillStyle = ke < 26 ? wt[1] : wt[2]),
              $.fillRect(I, Se, 2, ke < 26 ? 4 : 3),
              (I + ((n / 50) | 0) * 4) % 14 < 4 && (($.fillStyle = wt[0]), $.fillRect(I, Se - 1, 2, 2)));
          }
          const M = Ze - p;
          for (let I = 0; I < 7; I++) {
            const ke = -1.2 + I * 0.42,
              Se = l + 4 + Math.cos(ke) * 9,
              Ae = M + 10 + Math.sin(ke) * 9;
            A(Se, Ae, 3 - I * 0.25, I < 3 ? wt[0] : wt[1]);
          }
          (Math.random() < 0.7 &&
            gt(l + 6, M + 4, { vx: 1.2 + Math.random(), vy: -1 - Math.random() * 1.5, size: 2, max: 300 }),
            !o && l > u.x && ((o = 1), mt(2), (re = 3), Dt(u.x, u.y + 10, 14, 2.4)));
        }
        return (n > 950 && n < 1080 && ha(Je * 0.4 + Math.random() * Je * 0.6, Ze - 40, 2, 40), n < 1200);
      }
    );
  }
  function xt() {
    let o = 0,
      n = 0;
    Te();
    const s = u.x - P.x,
      l = u.y - P.y,
      c = Math.hypot(s, l),
      p = s / c,
      y = l / c;
    return (v) => {
      if (v < 320) {
        for (let M = 0; M < 3; M++) {
          const I = Math.random() * 6.283,
            ke = 34 - v / 12;
          gt(P.x + Math.cos(I) * ke, P.y + Math.sin(I) * ke, {
            vx: -Math.cos(I) * 1.4,
            vy: -Math.sin(I) * 1.4,
            grav: 0,
            max: 180,
            size: 2,
          });
        }
        _t(P.x, P.y, 2 + v / 60);
      } else if (v < 860) {
        const M = Math.min(1, (v - 320) / 120),
          I = c * M,
          ke = v < 760 ? 5 : (5 * (860 - v)) / 100,
          Se = -y,
          Ae = p;
        $.globalAlpha = 0.6;
        for (let St = 0; St < I; St += 2) {
          const Jt = Math.round(Math.sin(St / 7 - v / 30));
          A(P.x + p * St + Se * Jt, P.y + y * St + Ae * Jt, ke + 1, wt[3]);
        }
        $.globalAlpha = 0.75;
        for (let St = 0; St < I; St += 2) A(P.x + p * St, P.y + y * St, Math.max(1, ke * 0.55), wt[2]);
        (($.globalAlpha = 1), ($.fillStyle = wt[0]));
        for (let St = (v / 3) % 14; St < I; St += 14)
          for (let Jt = 0; Jt < 5; Jt++) {
            const Oa = P.x + p * (St + Jt),
              Qa = P.y + y * (St + Jt);
            $.fillRect(Math.round(Oa), Math.round(Qa - 1), 2, 2);
          }
        $.fillStyle = wt[1];
        for (let St = (v / 4) % 10; St < I; St += 10) {
          const Jt = (((St / 10) | 0) % 2 ? 1 : -1) * (ke + 1);
          $.fillRect(Math.round(P.x + p * St + Se * Jt), Math.round(P.y + y * St + Ae * Jt), 2, 2);
        }
        if (Math.random() < 0.5) {
          const St = Math.random() * I;
          gt(P.x + p * St, P.y + y * St, { vx: p * 1.5, vy: y * 1.5 - 0.8, size: 1.5, max: 240 });
        }
        M >= 1 &&
          (_t(u.x, u.y, 7 + Math.random() * 2),
          Dt(u.x, u.y, 3, 2.6, 2),
          o ? v % 120 < 17 && (re = Math.max(re, 2)) : ((o = 1), (pt = 40), (re = 5), mt(3)));
      } else n || ((n = 1), Dt(u.x, u.y, 26, 3, 2.2), ha(u.x, u.y, 14, 40));
      return v < 1300;
    };
  }
  const D = ["#ffffff", "#eefcff", "#c8f0ff", "#9fd8f0", "#6aa9cf", "#3d6a8f"],
    Q = ["#fff8e8", "#e9d3a8", "#a8875a"];
  function Y(o, n, s, l, c, p, y, v = 2) {
    $.fillStyle = y;
    const M = Math.max(4, ((Math.abs(p - c) * (s + l)) / 3) | 0);
    for (let I = 0; I <= M; I++) {
      const ke = c + ((p - c) * I) / M;
      $.fillRect(
        Math.round((o + Math.cos(ke) * s) / 2) * 2,
        Math.round((n + Math.sin(ke) * l) / 2) * 2,
        v,
        v,
      );
    }
  }
  function ye(o, n, s) {
    const l = Math.cos(s),
      c = Math.sin(s);
    for (let p = -3; p <= 3; p++) {
      const y = Math.round(o + l * p),
        v = Math.round(n + c * p);
      (($.fillStyle = Q[0]),
        $.fillRect(y, v, 2, 2),
        Math.abs(p) < 3 && (($.fillStyle = Q[1]), $.fillRect(y + Math.round(-c), v + Math.round(l), 1, 1)));
    }
    (($.fillStyle = Q[2]), $.fillRect(Math.round(o - l * 3), Math.round(n - c * 3), 1, 1));
  }
  let nt = [];
  function Ot(o = 1) {
    const n = f("#atk").getBoundingClientRect(),
      s = f("#def").getBoundingClientRect();
    return { x: (s.left - n.left) * o, y: (s.top - n.top + s.height * 0.25) * o };
  }
  function ee(o, n, s, l) {
    for (let c = 0; c < s; c++) {
      const p = Math.random() * 6.283,
        y = l * (0.4 + Math.random() * 0.8);
      nt.push({
        x: o,
        y: n,
        vx: Math.cos(p) * y,
        vy: Math.sin(p) * y - 1,
        ang: Math.random() * 6,
        va: (Math.random() - 0.5) * 0.3,
        life: 0,
        max: 700 + Math.random() * 500,
      });
    }
  }
  function rt(o) {
    const n = o / 16;
    nt = nt.filter(
      (s) => (
        (s.life += o),
        s.life > s.max
          ? !1
          : ((s.vx *= 0.95 ** n),
            (s.vy = s.vy * 0.95 ** n + 0.03 * n),
            (s.x += (s.vx + Math.sin(s.life / 120) * 0.4) * n),
            (s.y += s.vy * n),
            (s.ang += s.va * n),
            (s.life / s.max > 0.75 && ((s.x + s.y) | 0) % 2) || ye(s.x, s.y, s.ang),
            !0)
      ),
    );
  }
  function Qe(o, n, s = D[1]) {
    const l = Math.cos(n),
      c = Math.sin(n);
    $.fillStyle = s;
    for (let p = 0; p < o; p++) {
      const y = Math.random() * Je,
        v = Math.random() * Ze,
        M = 10 + Math.random() * 24;
      for (let I = 0; I < M; I += 2) $.fillRect(Math.round(y + l * I), Math.round(v + c * I), 2, 1);
    }
  }
  function Ft(o, n, s, l, c, p, y) {
    for (let v = 0; v <= 16; v++) {
      const M = v / 16,
        I = l + (c - l) * M,
        ke = Math.max(1, Math.sin(M * Math.PI) * p);
      A(o + Math.cos(I) * s, n + Math.sin(I) * s, ke / 2 + 0.5, y);
    }
  }
  function Ye() {
    let o = 0;
    return (
      Te(),
      (n) => {
        const s = Math.min(1, n / 250),
          l = n > 720 ? Math.max(0, (950 - n) / 230) : 1;
        if (n < 120) return !0;
        const c = 9,
          p = (y) => Math.round(Math.sin(n / 110 + y * 0.7) * 3);
        $.globalAlpha = 0.22 * l;
        for (let y = 0; y < c; y++) {
          const v = u.y + 30 - y * 8,
            M = (4 + y * 4) * s;
          (V(u.x + p(y), v, M, M * 0.3, D[2], 3), A(u.x + p(y), v, M * 0.8, D[3]));
        }
        $.globalAlpha = 1;
        for (let y = 0; y < c; y++) {
          const v = u.y + 30 - y * 8,
            M = (4 + y * 4) * s,
            I = M * 0.3,
            ke = n / 60 + y * 0.8,
            Se = u.x + p(y);
          (l < 1 && (y + ((n / 40) | 0)) % 3 === 0) ||
            (Y(Se, v, M, I, ke, ke + 2.2, y % 2 ? D[0] : D[1], 3),
            Y(Se, v, M, I, ke + Math.PI, ke + Math.PI + 1.6, D[2], 2));
        }
        for (let y = 0; y < 8; y++) {
          const v = (y * 1.3 + n / 180) % c,
            M = u.y + 30 - v * 8,
            I = (4 + v * 4) * s,
            ke = n / 45 + y * 2.4,
            Se = y % 3 ? "#7cc35a" : Q[1];
          (Math.sin(ke) > -0.2 || y % 2) &&
            (($.fillStyle = Se),
            $.fillRect(
              Math.round(u.x + p(v | 0) + Math.cos(ke) * I),
              Math.round(M + Math.sin(ke) * I * 0.3),
              3,
              2,
            ));
        }
        if (
          (l > 0.9 &&
            Math.random() < 0.4 &&
            qe(u.x + (Math.random() - 0.5) * 20, u.y + 32, {
              smoke: 1,
              spal: ["#e8dcc0", "#cbbd9c", "#a89a7c"],
              size: 3,
              max: 450,
              vx: (Math.random() - 0.5) * 1.5,
              vy: -0.3,
              grav: 0,
            }),
          n % 110 < 17 && n < 700)
        ) {
          const y = Math.random() * 6.283;
          nt.push({
            x: u.x + Math.cos(y) * 30,
            y: u.y + 20,
            vx: -Math.sin(y) * 1.2,
            vy: -1.4,
            ang: y,
            va: 0.25,
            life: 0,
            max: 600,
          });
        }
        return (
          !o &&
            n > 300 &&
            ((o = 1),
            mt(1),
            f("#def").animate(
              [
                { transform: "translateY(0)" },
                { transform: "translateY(-6px) rotate(-4deg)" },
                { transform: "translateY(-4px) rotate(4deg)" },
                { transform: "none" },
              ],
              { duration: 500 / De, easing: "steps(8)" },
            )),
          n < 950
        );
      }
    );
  }
  function bt(o, n, s, l, c, p, y, v = 1) {
    const M = Math.cos(s),
      I = Math.sin(s);
    $.globalAlpha = y;
    for (let ke = -l / 2 + l * p; ke < -l / 2 + l * c; ke += 1.5) {
      const Se = (ke + l / 2) / l,
        Ae = Math.sin(Se * Math.PI) * 4 * v;
      (A(o + M * ke, n + I * ke, Ae + 1, D[3]), A(o + M * ke, n + I * ke, Math.max(0.6, Ae * 0.55), D[0]));
    }
    $.globalAlpha = 1;
  }
  function Yt() {
    let o = [0, 0];
    f("#atk").animate(
      [
        { transform: "scaleX(-1)" },
        { transform: "scaleX(-1) translateY(-6px) scaleY(.92)" },
        { transform: "scaleX(-1) translateY(2px)" },
        { transform: "scaleX(-1) translateY(-4px) scaleY(.94)" },
        { transform: "scaleX(-1)" },
      ],
      { duration: 420 / De, easing: "steps(5)" },
    );
    const n = Math.atan2(u.y - P.y, u.x - P.x),
      s = -Math.sin(n),
      l = Math.cos(n),
      c = (p, y) => {
        const v = y * (22 * Math.sin(p * Math.PI) + 6 * Math.sin(p * Math.PI * 3) * (1 - p));
        return { x: _e(P.x, u.x, p) + s * v, y: _e(P.y - 6, u.y, p) + l * v };
      };
    return (p) => (
      [
        [120, -1],
        [240, 1],
      ].forEach(([y, v], M) => {
        const I = (p - y) / 420;
        if (!(I < 0))
          if (I < 1) {
            const ke = I < 0.5 ? 2 * I * I : 1 - (-2 * I + 2) ** 2 / 2,
              Se = c(ke, v),
              Ae = n + v * ke * Math.PI * 3,
              St = 9 + Math.sin(ke * Math.PI) * 6,
              Jt = Math.cos(Ae),
              Oa = Math.sin(Ae);
            for (let Qa = 1; Qa <= 3; Qa++) {
              const un = Math.max(0, ke - Qa * 0.05),
                $n = c(un, v),
                fs = n + v * un * Math.PI * 3;
              (($.globalAlpha = (0.3 * (4 - Qa)) / 4),
                Ft($n.x - Math.cos(fs) * St, $n.y - Math.sin(fs) * St, St, fs - 1, fs + 1, 5, D[2]));
            }
            (($.globalAlpha = 1),
              Ft(Se.x - Jt * St, Se.y - Oa * St, St, Ae - 1.05, Ae + 1.05, 7, D[0]),
              Ft(Se.x - Jt * (St + 1), Se.y - Oa * (St + 1), St, Ae - 0.85, Ae + 0.85, 3, D[3]),
              Math.random() < 0.5 &&
                qe(Se.x, Se.y, {
                  pal: D,
                  heat: 0.2,
                  max: 220,
                  size: 2,
                  grav: 0,
                  vx: Math.random() - 0.5,
                  vy: Math.random() - 0.5,
                }));
          } else {
            const ke = p - y - 420;
            if (ke < 340) {
              const Se = (M ? -0.75 : 0.75) + Math.PI / 2,
                Ae = Math.max(0, (ke - 90) / 250),
                St = Ae * Ae * (3 - 2 * Ae);
              bt(u.x, u.y, Se, 58, Math.min(1, ke / 60), St * 0.9, 1 - St * 0.85, 1 - St * 0.6);
            }
            o[M] || ((o[M] = 1), ee(u.x, u.y, 4, 2.2), mt(M ? 0 : 2), (re = 3));
          }
      }),
      p < 1e3
    );
  }
  function wa() {
    let o = 0,
      n = 0,
      s = 0;
    const l = f("#atk"),
      c = Ot(0.85),
      p = [];
    let y = 0;
    const v = (Se, Ae, St) => {
        y += (Ae * ke) / 16;
        const Jt = y | 0;
        y -= Jt;
        for (let Oa = 0; Oa < Jt; Oa++)
          p.push({
            x: Math.random() * Je * 1.4 - Je * 0.2,
            y: Math.random() * Ze * 1.4 - Ze * 0.2,
            ang: Se,
            L: 26 + Math.random() * 36,
            v: St * (0.7 + Math.random() * 0.6),
            life: 0,
            max: 220 + Math.random() * 120,
            c: Math.random() < 0.6 ? D[0] : D[2],
          });
      },
      M = (Se) => {
        p.splice(
          0,
          p.length,
          ...p.filter((Ae) => {
            if (((Ae.life += Se), Ae.life > Ae.max)) return !1;
            const St = Math.cos(Ae.ang),
              Jt = Math.sin(Ae.ang);
            ((Ae.x += (St * Ae.v * Se) / 16), (Ae.y += (Jt * Ae.v * Se) / 16));
            const Oa = Math.sin((Ae.life / Ae.max) * Math.PI);
            (($.globalAlpha = Oa * 0.9), ($.fillStyle = Ae.c));
            for (let Qa = 0; Qa < Ae.L; Qa++)
              $.fillRect(
                Math.round(Ae.x - St * Qa),
                Math.round(Ae.y - Jt * Qa),
                Qa < 8 ? 2 : 1,
                Qa < 8 ? 2 : 1,
              );
            return (($.globalAlpha = 1), !0);
          }),
        );
      };
    let I = 0,
      ke = 16;
    return (Se) => {
      const Ae = Se - I;
      ((I = Se), (ke = Ae), M(Ae));
      const St = f("#tint");
      if (
        ((St.style.opacity = Se < 1200 ? Math.min(0.3, Se / 700) : Math.max(0, 0.3 - (Se - 1200) / 200)),
        Se < 420)
      ) {
        const Jt = ((Se / 50) | 0) % 2;
        if ((V(P.x - 4, P.y - 6, 22 + Jt * 2, 18 + Jt * 2, D[0], 2, 0.3), Math.random() < 0.8)) {
          const Oa = Math.random() * 6.283;
          qe(P.x + Math.cos(Oa) * 40, P.y + Math.sin(Oa) * 30, {
            pal: D,
            vx: -Math.cos(Oa) * 2,
            vy: -Math.sin(Oa) * 1.5,
            heat: 0.2,
            max: 220,
            size: 2,
            grav: 0,
            drag: 0.95,
          });
        }
      } else if (Se < 620)
        (n ||
          ((n = 1),
          l.animate([{ transform: "scaleX(-1)" }, { transform: "translate(10%,-260%) scaleX(-1)" }], {
            duration: 180 / De,
            fill: "forwards",
            easing: "steps(5)",
          })),
          v(Math.PI / 2, 3, 9));
      else if (Se < 800) {
        s ||
          ((s = 1),
          l.animate(
            [
              { transform: `translate(${c.x - 260}px,-420px) scaleX(-1)` },
              { transform: `translate(${c.x}px,${c.y}px) scaleX(-1) rotate(-25deg)` },
            ],
            { duration: 180 / De, fill: "forwards", easing: "steps(6)" },
          ));
        const Jt = (Se - 620) / 180,
          Oa = u.x - 110,
          Qa = -20,
          un = _e(Oa, u.x, Re(Jt)),
          $n = _e(Qa, u.y, Re(Jt));
        for (let fs = 0; fs < 6; fs++) {
          const ds = Math.max(0, Re(Jt) - fs * 0.07);
          A(_e(Oa, u.x, ds), _e(Qa, u.y, ds), 6 - fs, fs < 2 ? D[0] : D[2], fs > 3 ? 0.5 : 0);
        }
        v(Math.atan2(u.y - Qa, u.x - Oa), 4, 12);
      } else {
        const Jt = Se - 800;
        if (
          (o ||
            ((o = 1),
            (pt = 60),
            (re = 6),
            mt(3),
            ee(u.x, u.y, 10, 2.6),
            ce(u.x, u.y, 22, 2.8, { max: 400 }),
            it.slice(-22).forEach((Oa) => (Oa.pal = D)),
            l.animate(
              [
                { transform: `translate(${c.x}px,${c.y}px) scaleX(-1)` },
                { transform: `translate(${c.x * 0.5}px,${c.y - 60}px) scaleX(-1)` },
                { transform: "scaleX(-1)" },
              ],
              { duration: 420 / De, fill: "forwards", easing: "steps(8)" },
            ),
            ($.globalAlpha = 0.4),
            ($.fillStyle = D[0]),
            Ge(),
            ($.globalAlpha = 1)),
          Jt < 400)
        ) {
          const Oa = 8 + Jt / 5,
            Qa = Jt > 220 ? 0.5 : 0;
          for (let un = 0; un < 4; un++) {
            const $n = (un * Math.PI) / 2 + Math.PI / 4 + Jt / 400;
            Y(u.x, u.y, Oa, Oa * 0.7, $n, $n + 0.9, D[un % 2], 2);
          }
          (V(u.x, u.y, Oa * 1.4, Oa * 0.5, D[2], 2, Qa + 0.3), Jt < 160 && A(u.x, u.y, 10 - Jt / 20, D[0]));
        }
      }
      return (Se > 800 && Se < 950 && v(Math.atan2(u.y + 20, 110), 1.5, 10), Se < 1450);
    };
  }
  const pa = ["#ffffff", "#effcff", "#bff4ff", "#7fe6ff", "#3fc4ff", "#1f8fe8"];
  function Gt(o, n, s, l) {
    ((o = Math.round(o)),
      (n = Math.round(n)),
      ($.fillStyle = l),
      $.fillRect(o - s, n, s * 2 + 1, 1),
      $.fillRect(o, n - s, 1, s * 2 + 1),
      s > 1 &&
        ($.fillRect(o - 1, n - 1, 1, 1),
        $.fillRect(o + 1, n + 1, 1, 1),
        $.fillRect(o + 1, n - 1, 1, 1),
        $.fillRect(o - 1, n + 1, 1, 1)));
  }
  function N(o, n, s, l, c, p, y) {
    const v = Math.cos(c),
      M = Math.sin(c),
      I = Math.ceil(Math.max(s, l));
    for (let ke = -I; ke <= I; ke++)
      for (let Se = -I; Se <= I; Se++) {
        const Ae = Se * v + ke * M,
          St = -Se * M + ke * v,
          Jt = Math.abs(Ae) / s + Math.abs(St) / l;
        Jt <= 1 &&
          (($.fillStyle = Jt > 0.7 ? y : p), $.fillRect(Math.round(o) + Se, Math.round(n) + ke, 1, 1));
      }
  }
  let W = [];
  function ze(o, n, s, l, c, p = 1) {
    if (l < 1) return;
    const y = o + (Math.cos(s) * l) / 2,
      v = n + (Math.sin(s) * l) / 2,
      M = Math.cos(s),
      I = Math.sin(s),
      ke = l / 2,
      Se = Math.ceil(Math.max(ke, c));
    for (let Ae = -Se; Ae <= Se; Ae++)
      for (let St = -Se; St <= Se; St++) {
        const Jt = St * M + Ae * I,
          Oa = -St * I + Ae * M,
          Qa = Math.abs(Jt) / ke + Math.abs(Oa) / c;
        if (Qa > 1) continue;
        const un = Qa > 0.72;
        (($.globalAlpha = p * (un ? 0.95 : Oa < 0 ? 0.5 : 0.3)),
          ($.fillStyle = un ? pa[4] : Oa < 0 ? pa[1] : pa[3]),
          $.fillRect(Math.round(y) + St, Math.round(v) + Ae, 1, 1));
      }
    (($.globalAlpha = p), ($.fillStyle = pa[0]));
    for (let Ae = l * 0.12; Ae < l * 0.75; Ae += 1)
      $.fillRect(Math.round(o + M * Ae + I * c * 0.3), Math.round(n + I * Ae - M * c * 0.3), 1, 1);
    $.globalAlpha = 1;
  }
  function qt(o, n, s, l, c = 3) {
    for (let p = 0; p < c; p++) {
      const y = Math.random() * l,
        v = s + (Math.random() - 0.5) * 2;
      qe(o + Math.cos(s) * y, n + Math.sin(s) * y, {
        pal: pa,
        vx: Math.cos(v) * (1 + Math.random() * 1.5),
        vy: Math.sin(v) * (1 + Math.random() * 1.5) - 1,
        heat: Math.random() * 0.4,
        max: 380,
        size: 2 + ((Math.random() * 2) | 0),
        grav: 0.12,
        drag: 0.97,
      });
    }
  }
  function Lt(o, n, s, l, c = {}) {
    W.push({
      x: o,
      y: n,
      vx: s,
      vy: l,
      s: c.s ?? (Math.random() < 0.4 ? 2 : 1),
      life: 0,
      max: c.max || 900,
      sw: Math.random() * 6,
      grav: c.grav ?? 0.01,
      c: c.c || (Math.random() < 0.5 ? pa[0] : pa[1]),
    });
  }
  function zt(o) {
    const n = o / 16;
    W = W.filter(
      (s) => (
        (s.life += o),
        s.life > s.max
          ? !1
          : ((s.vy += s.grav * n),
            (s.x += (s.vx + Math.sin(s.life / 140 + s.sw) * 0.35) * n),
            (s.y += s.vy * n),
            (s.life / s.max > 0.75 && ((s.x + s.y) | 0) % 2) || Gt(s.x, s.y, s.s, s.c),
            !0)
      ),
    );
  }
  function ca(o, n) {
    f("#def").animate(
      [
        { filter: "none" },
        { filter: "brightness(1.6) saturate(.3) sepia(.4) hue-rotate(160deg)", offset: 0.15 },
        { filter: "brightness(1.3) saturate(.4) sepia(.3) hue-rotate(160deg)", offset: 0.8 },
        { filter: "none" },
      ],
      { duration: n / De, easing: "steps(8)" },
    );
    const l = f("#barDef");
    l.style.width = Math.max(8, parseFloat(l.style.width || 100) - [0, 12, 28, 55][o]) + "%";
  }
  function Ma() {
    let o = 0,
      n = 0,
      s = 0;
    return (
      Te(),
      (l) => {
        const c = l - s;
        if (((s = l), l < 520))
          for (n += (c / 16) * 1.6; n >= 1;) {
            n--;
            const p = Math.atan2(u.y - P.y, u.x - P.x) + (Math.random() - 0.5) * 0.35,
              y = 2.4 + Math.random();
            Lt(P.x, P.y - 6, Math.cos(p) * y, Math.sin(p) * y, {
              grav: 0,
              max: (Math.hypot(u.x - P.x, u.y - P.y) / y) * 16 * (0.9 + Math.random() * 0.25),
            });
          }
        if ((!o && l > 380 && ((o = 1), ca(1, 600), (re = 1)), l > 380 && l < 850 && l % 70 < 17)) {
          const p = Math.random() * 6.283,
            y = Math.random() * 22;
          (Gt(u.x + Math.cos(p) * y, u.y + Math.sin(p) * y * 0.8, 2, pa[0]),
            Lt(u.x + (Math.random() - 0.5) * 36, u.y - 14, (Math.random() - 0.5) * 0.3, 0.25, { max: 600 }));
        }
        return l < 1e3;
      }
    );
  }
  function Na() {
    let o = 0,
      n = 0;
    const s = { x: P.x, y: P.y - 6 },
      l = u.x - s.x,
      c = u.y - s.y,
      p = Math.hypot(l, c),
      y = l / p,
      v = c / p,
      M = Math.atan2(c, l),
      I = -v,
      ke = y;
    Te();
    const Se = [];
    for (let St = 24; St < p - 16; St += 13 + Math.random() * 8) {
      const Jt = Se.length % 2 ? 1 : -1;
      Se.push({
        s: St,
        ang: M + Jt * (1.1 + Math.random() * 0.5),
        len: 10 + Math.random() * 9,
        wid: 3 + Math.random() * 1.5,
      });
    }
    const Ae = [];
    for (let St = 0; St < 8; St++) {
      const Jt = (St / 8) * 6.283 + (Math.random() - 0.5) * 0.6;
      Ae.push({
        ox: Math.cos(Jt) * (8 + Math.random() * 8),
        oy: Math.sin(Jt) * (7 + Math.random() * 7),
        ang: Jt + (Math.random() - 0.5) * 0.5,
        len: 12 + Math.random() * 12,
        wid: 3.5 + Math.random() * 2,
        d: Math.random() * 160,
      });
    }
    return (St) => {
      if (St < 240) {
        const un = St / 240;
        (N(s.x, s.y, 2 + un * 4, 2 + un * 4, St / 80, pa[2], pa[4]),
          N(s.x, s.y, 1 + un * 2, 1 + un * 2, St / 80, pa[0], pa[1]),
          St % 60 < 17 && Gt(s.x + (Math.random() - 0.5) * 20, s.y + (Math.random() - 0.5) * 20, 2, pa[0]));
      }
      const Jt = St - 240,
        Oa = Math.min(1, Jt / 220);
      if (Jt > 0 && Jt < 520) {
        const un = p * Oa,
          $n = Jt > 440 ? (520 - Jt) / 80 : 1;
        for (let fs = 0; fs < un; fs++) {
          const ds = s.x + y * fs,
            Fs = s.y + v * fs;
          (($.fillStyle = pa[4]),
            $.fillRect(Math.round(ds), Math.round(Fs - 3 * $n), 1, Math.max(1, Math.round(6 * $n))),
            ($.fillStyle = pa[2]),
            $.fillRect(Math.round(ds), Math.round(Fs - 2 * $n), 1, Math.max(1, Math.round(4 * $n))),
            ($.fillStyle = pa[0]),
            $.fillRect(Math.round(ds), Math.round(Fs - $n), 1, Math.max(1, Math.round(2 * $n))));
        }
        N(s.x + y * un, s.y + v * un, 4, 4, St / 50, pa[0], pa[2]);
      }
      return (
        Se.forEach((un) => {
          const $n = 240 + (un.s / p) * 220;
          if (St < $n) return;
          const fs = St - $n;
          if (St < 1e3) {
            const ds = Math.min(1, fs / 90);
            ze(s.x + y * un.s, s.y + v * un.s, un.ang, un.len * ds, un.wid * ds);
          } else un.b || ((un.b = 1), qt(s.x + y * un.s, s.y + v * un.s, un.ang, un.len, 2));
        }),
        Jt > 220 &&
          (o || ((o = 1), ca(2, 900), mt(2), (re = 2)),
          Ae.forEach((un) => {
            const $n = Jt - 220 - un.d;
            if (!($n < 0))
              if (St < 1e3) {
                const fs = Math.min(1, $n / 110),
                  ds = fs < 1 ? fs * 1.15 : 1;
                ze(
                  u.x + 6 + un.ox,
                  u.y + 4 + un.oy,
                  un.ang,
                  un.len * Math.min(1, ds),
                  un.wid * Math.min(1, ds),
                  0.95,
                );
              } else un.b || ((un.b = 1), qt(u.x + 6 + un.ox, u.y + 4 + un.oy, un.ang, un.len, 3));
          })),
        St >= 1e3 && !n && ((n = 1), (re = 2)),
        St < 1250
      );
    };
  }
  function Va() {
    let o = 0,
      n = 0,
      s = 0,
      l = 0;
    return (
      Te(),
      (c) => {
        const p = c - n;
        n = c;
        const y = f("#tint");
        y.style.opacity = c < 1250 ? Math.min(0.35, c / 500) : Math.max(0, 0.35 - (c - 1250) / 250);
        const v = c < 200 ? c / 200 : c < 1100 ? 1 : Math.max(0, (1300 - c) / 200);
        for (o += (p / 16) * 5 * v; o >= 1;)
          (o--,
            Lt(
              -40 + Math.random() * Je,
              -40 + Math.random() * (Ze * 0.8),
              3.5 + Math.random() * 2.5,
              1.6 + Math.random() * 1.2,
              { grav: 0, max: 700 },
            ));
        (($.fillStyle = pa[1]), ($.globalAlpha = 0.6 * v));
        for (let M = 0; M < 6 * v; M++) {
          const I = Math.random() * Je,
            ke = Math.random() * Ze;
          for (let Se = 0; Se < 14; Se++)
            $.fillRect(Math.round(I + Se * 1.8), Math.round(ke + Se * 0.8), 1, 1);
        }
        if ((($.globalAlpha = 1), c > 380 && c < 1050)) {
          if (!s) {
            ((s = 1), ca(3, 1100), (Va.cl = []));
            for (let M = 0; M < 14; M++) {
              const I = (M / 14) * 6.283 + (Math.random() - 0.5) * 0.5,
                ke = Math.random();
              Va.cl.push({
                ox: Math.cos(I) * (6 + ke * 14),
                oy: Math.sin(I) * (6 + ke * 14) * 0.9,
                ang: I + (Math.random() - 0.5) * 0.6,
                len: 14 + Math.random() * 16,
                wid: 4 + Math.random() * 3,
                d: ke * 260,
              });
            }
          }
          (Va.cl.forEach((M) => {
            const I = c - 380 - M.d;
            if (I < 0) return;
            const ke = Math.min(1, I / 140);
            ze(u.x + 6 + M.ox, u.y + 6 + M.oy, M.ang, M.len * ke, M.wid * ke, 0.95);
          }),
            Math.random() < 0.4 &&
              Gt(u.x + 8 + (Math.random() - 0.5) * 50, u.y + (Math.random() - 0.5) * 50, 2, pa[0]));
        } else if (c >= 1050 && !l) {
          ((l = 1),
            (pt = 50),
            (re = 5),
            mt(3),
            (Va.cl || []).forEach((M) => qt(u.x + 6 + M.ox, u.y + 6 + M.oy, M.ang, M.len, 3)));
          for (let M = 0; M < 14; M++) {
            const I = Math.random() * 6.283,
              ke = 1.5 + Math.random() * 2.5;
            qe(u.x, u.y + 8, {
              pal: pa,
              vx: Math.cos(I) * ke,
              vy: Math.sin(I) * ke - 1,
              heat: Math.random() * 0.4,
              max: 420,
              size: 3,
              grav: 0.12,
              drag: 0.97,
            });
          }
          for (let M = 0; M < 10; M++)
            Lt(
              u.x + (Math.random() - 0.5) * 30,
              u.y + (Math.random() - 0.5) * 30,
              (Math.random() - 0.5) * 2,
              -1 - Math.random(),
              { s: 2, grav: 0.05, max: 700 },
            );
        }
        return c < 1500;
      }
    );
  }
  const Ba = ["#ffffff", "#f3dcff", "#c88cff", "#8b4fe0", "#4a2385", "#1a0b2e"];
  function za(o, n, s = {}) {
    qe(o, n, {
      pal: Ba,
      round: 1,
      heat: s.heat ?? 0.2 + Math.random() * 0.5,
      max: s.max || 400 + Math.random() * 300,
      size: s.size || 1.5 + Math.random() * 2,
      vx: s.vx ?? (Math.random() - 0.5) * 0.4,
      vy: s.vy ?? -0.4 - Math.random() * 0.5,
      grav: s.grav ?? -0.01,
      drag: 0.97,
    });
  }
  function vn(o, n) {
    const s = f("#def");
    (s.animate(
      [
        { filter: "none" },
        { filter: "brightness(.35) saturate(2) hue-rotate(230deg)" },
        { filter: "none" },
        { filter: "brightness(.35) saturate(2) hue-rotate(230deg)" },
        { filter: "brightness(.6) saturate(1.5) hue-rotate(230deg)" },
        { filter: "none" },
      ],
      { duration: n / De, easing: "steps(6)" },
    ),
      s.animate(
        [
          { transform: "none" },
          { transform: "translateX(-2px)" },
          { transform: "translateX(2px)" },
          { transform: "translateX(-1px)" },
          { transform: "none" },
        ],
        { duration: (n * 0.6) / De, easing: "steps(5)" },
      ));
    const l = f("#barDef");
    l.style.width = Math.max(8, parseFloat(l.style.width || 100) - [0, 12, 28, 55][o]) + "%";
  }
  function An(o, n, s, l) {
    (A(o, n, s + 2, Ba[3]), A(o, n, s + 1, Ba[4]), A(o, n, s, Ba[5]));
    for (let c = 0; c < 3; c++) {
      const p = l / 90 + c * 2.09;
      Z(o + Math.cos(p) * (s - 1), n + Math.sin(p) * (s - 1), 2, Ba[2]);
    }
    Z(o - s * 0.35, n - s * 0.4, 2, Ba[1]);
  }
  function on() {
    let o = 0;
    return (
      Te(),
      (n) => {
        const s = (n - 180) / 260;
        if (
          (n < 180 && Math.random() < 0.5 && za(P.x + (Math.random() - 0.5) * 20, P.y), s >= 0 && s < 1.6)
        ) {
          const l = Math.min(1, Re(Math.min(1, s))),
            c = s > 1 ? 1 - (s - 1) / 0.6 : 1,
            p = u.x + 4,
            y = u.y + 30;
          for (let v = 0; v <= 20; v++) {
            const M = v / 20;
            if (M > l) break;
            const I = Math.PI * 0.95 - M * Math.PI * 0.75,
              ke = 26 + M * 4,
              Se = (1 - Math.abs(M - 0.55) * 1.4) * 6 + 2,
              Ae = p + Math.cos(I) * ke,
              St = y - Math.sin(I) * ke * 1.2;
            (($.globalAlpha = 0.85 * c),
              A(Ae, St, Se, "#c0457a"),
              A(Ae, St, Se * 0.6, "#ff7fb0"),
              Z(Ae - Se * 0.3, St - Se * 0.3, 2, "#ffd1e3"),
              ($.globalAlpha = 1));
          }
          if (
            (s < 1 &&
              Math.random() < 0.5 &&
              qe(p + (Math.random() - 0.5) * 30, y - 30, {
                pal: Ba,
                round: 1,
                heat: 0.6,
                size: 2,
                max: 400,
                vy: 0.5,
                grav: 0.08,
              }),
            !o && s > 0.35)
          ) {
            ((o = 1), vn(1, 500));
            for (let v = 0; v < 6; v++)
              za(u.x + (Math.random() - 0.5) * 30, u.y + (Math.random() - 0.5) * 20);
          }
        }
        return n < 850;
      }
    );
  }
  function qn() {
    let o = 0;
    Te();
    const n = { x: P.x + 6, y: P.y - 4 };
    return (s) => {
      if (s < 400) {
        const l = s / 400;
        for (let c = 0; c < 2; c++) {
          const p = s / 60 + c * Math.PI + Math.random() * 0.3,
            y = 36 * (1 - l) + 4;
          za(n.x + Math.cos(p) * y, n.y + Math.sin(p) * y * 0.7, {
            vx: -Math.cos(p) * 0.8,
            vy: -Math.sin(p) * 0.6,
            max: 220,
            grav: 0,
          });
        }
        An(n.x, n.y, 2 + l * 6, s);
      } else if (s < 720) {
        const l = (s - 400) / 320,
          c = dt(Re(l), n, u, 16),
          p = Math.sin(s / 35) * 3;
        An(c.x, c.y + p, 8, s);
        for (let y = 0; y < 2; y++)
          za(c.x - 4, c.y + p + (Math.random() - 0.5) * 8, {
            vx: -1 - Math.random(),
            vy: (Math.random() - 0.5) * 0.5,
            max: 300,
            size: 2 + Math.random() * 2,
          });
      } else {
        const l = s - 720;
        if (!o) {
          ((o = 1), (pt = 40), (re = 4), vn(2, 700));
          for (let c = 0; c < 16; c++) {
            const p = Math.random() * 6.283,
              y = 1 + Math.random() * 1.8;
            za(u.x, u.y, {
              vx: Math.cos(p) * y,
              vy: Math.sin(p) * y - 0.6,
              size: 2 + Math.random() * 2.5,
              max: 500,
            });
          }
        }
        if (l < 300) {
          const c = 6 + l / 6,
            p = l > 160 ? 0.5 : 0;
          (J(u.x, u.y, c, 3, l < 120 ? Ba[3] : Ba[4]),
            l < 120 && (A(u.x, u.y, 9 - l / 15, Ba[5]), J(u.x, u.y, 9 - l / 15, 1, Ba[2])));
        }
      }
      return s < 1150;
    };
  }
  function xn() {
    let o = 0,
      n = 0;
    const s = f("#atk");
    return (l) => {
      const c = f("#tint");
      if (
        ((c.style.opacity = l < 1300 ? Math.min(0.62, l / 350) : Math.max(0, 0.62 - (l - 1300) / 250)),
        n ||
          ((n = 1),
          s.animate(
            [
              { transform: "scaleX(-1)", filter: "none" },
              { transform: "scaleX(-1) scale(1.5) translateY(-14%)", filter: "brightness(0)", offset: 0.25 },
              { transform: "scaleX(-1) scale(1.55) translateY(-15%)", filter: "brightness(0)", offset: 0.8 },
              { transform: "scaleX(-1)", filter: "none" },
            ],
            { duration: 1450 / De, easing: "steps(14)" },
          )),
        l > 300 && l < 1250)
      ) {
        if (!(l > 700 && l < 760)) {
          const y = P.x - 2,
            v = P.y - 26;
          for (const M of [-7, 7]) (A(y + M, v, 2.5, "#ff3b5c"), Z(y + M, v, 2, "#ffe0e6"));
        }
        Math.random() < 0.4 &&
          za(P.x + (Math.random() - 0.5) * 50, P.y + 10, { vy: -0.8, size: 2.5, max: 600 });
      }
      if (l > 500 && l < 1150) {
        const p = Math.atan2(u.y - P.y, u.x - P.x);
        for (let y = 0; y < 3; y++) {
          const v = ((l - 500) / 380 + y / 3) % 1,
            M = _e(P.x, u.x, v),
            I = _e(P.y - 10, u.y, v),
            ke = 10 + v * 14;
          (($.globalAlpha = Math.sin(v * Math.PI) * 0.9),
            Y(M, I, ke * 0.5, ke, p - 1.2, p + 1.2, Ba[2], 2),
            Y(M - 3, I, ke * 0.45, ke * 0.9, p - 1, p + 1, Ba[4], 2),
            ($.globalAlpha = 1));
        }
        (!o && l > 700 && ((o = 1), vn(3, 800), (re = 4)),
          l > 700 &&
            Math.random() < 0.5 &&
            za(u.x + (Math.random() - 0.5) * 36, u.y + (Math.random() - 0.5) * 30, { size: 2.5 }));
      }
      return l < 1550;
    };
  }
  const fn = ["#ffffff", "#ff9aa8", "#e0284a", "#7a1030", "#2a0d1a", "#0a0508"];
  function Yn(o, n, s, l, c, p, y) {
    $.fillStyle = y;
    const v = Math.floor(Math.min(o, s, c)),
      M = Math.ceil(Math.max(o, s, c)),
      I = Math.floor(Math.min(n, l, p)),
      ke = Math.ceil(Math.max(n, l, p)),
      Se = (Ae, St, Jt, Oa, Qa, un) => (Jt - Ae) * (un - St) - (Oa - St) * (Qa - Ae);
    for (let Ae = I; Ae <= ke; Ae++)
      for (let St = v; St <= M; St++) {
        const Jt = Se(o, n, s, l, St, Ae),
          Oa = Se(s, l, c, p, St, Ae),
          Qa = Se(c, p, o, n, St, Ae);
        ((Jt >= 0 && Oa >= 0 && Qa >= 0) || (Jt <= 0 && Oa <= 0 && Qa <= 0)) && $.fillRect(St, Ae, 1, 1);
      }
  }
  function Zn(o, n, s, l, c, p, y, v, M = fn[5], I = fn[1]) {
    const ke = s * 0.28,
      Se = (Ae) => ({ x: o + (Ae - 0.5) * s, y: n + c * ke * (2 * Ae - 1) ** 2 });
    for (let Ae = 0; Ae <= 24; Ae++) {
      const St = Ae / 24,
        Jt = Se(St),
        Oa = (1 - Math.abs(2 * St - 1) * 0.5) * 4;
      (A(Jt.x, Jt.y - c * 3, Oa + 1, M), A(Jt.x, Jt.y - c * 3, Oa, v));
    }
    for (let Ae = 0; Ae < l; Ae++) {
      const St = (Ae + 0.5) / l,
        Jt = Se(St),
        Oa = Math.abs(2 * St - 1),
        Qa = Oa > 0.5 && Oa < 0.85 ? 1.6 : Oa >= 0.85 ? 0.7 : 1 - Oa * 0.2,
        un = y * Qa,
        $n = p * (0.7 + Qa * 0.3),
        fs = (0.5 - St) * un * 0.5,
        ds = Math.atan2((c * ke * 4 * (2 * St - 1)) / s, 1),
        Fs = (Math.sin(ds) * $n) / 2,
        oo = ((-Math.cos(ds) * $n) / 2) * 0;
      (Yn(Jt.x - $n / 2 - 1, Jt.y - oo, Jt.x + $n / 2 + 1, Jt.y + oo, Jt.x + fs, Jt.y + c * (un + 1), M),
        Yn(Jt.x - $n / 2, Jt.y, Jt.x + $n / 2, Jt.y, Jt.x + fs, Jt.y + c * un, fn[0]),
        ($.fillStyle = I),
        $.fillRect(
          Math.round(Jt.x - $n / 2 + 1),
          Math.round(Jt.y + c),
          1,
          Math.max(1, Math.round(un * 0.4) * c || 1),
        ));
    }
  }
  function is(o, n, s, l, c, p, y) {
    const v = _e(l * 1.1, 2, s),
      M = l * 1.9,
      I = 7;
    (Zn(o, n - v, M, I, 1, l * 0.24, l * 0.4, c, p, y), Zn(o, n + v, M, I, -1, l * 0.24, l * 0.36, c, p, y));
  }
  function ts(o, n, s, l, c, p = Math.random) {
    let y = o,
      v = n;
    for (let M = 0; M < l; M += 4) {
      const I = s + (p() - 0.5) * 1.1,
        ke = y + Math.cos(I) * 4,
        Se = v + Math.sin(I) * 4;
      (Ee(y, v, ke, Se, M < l * 0.5 ? 2 : 1, c), (y = ke), (v = Se));
    }
  }
  function Jn(o, n) {
    const s = f("#def");
    (s.animate(
      [
        { filter: "none" },
        { filter: "brightness(.3) contrast(2) sepia(1) hue-rotate(-50deg) saturate(4)" },
        { filter: "brightness(.5) contrast(1.6)" },
        { filter: "none" },
      ],
      { duration: n / De, easing: "steps(4)" },
    ),
      s.animate(
        [
          { transform: "none" },
          { transform: `translate(${o * 3}px,${o}px)` },
          { transform: `translate(${-o * 2}px,0)` },
          { transform: "none" },
        ],
        { duration: 240 / De, easing: "steps(4)" },
      ));
    const l = f("#barDef");
    l.style.width = Math.max(8, parseFloat(l.style.width || 100) - [0, 12, 28, 55][o]) + "%";
  }
  function On(o, n, s, l) {
    for (let c = 0; c < s; c++) {
      const p = Math.random() * 6.283,
        y = l * (0.5 + Math.random());
      qe(o, n, {
        pal: [fn[5], fn[4], fn[3], fn[2], fn[4], fn[5]],
        heat: Math.random() * 0.5,
        vx: Math.cos(p) * y,
        vy: Math.sin(p) * y,
        max: 300 + Math.random() * 200,
        size: 2 + ((Math.random() * 2) | 0),
        grav: 0.1,
        drag: 0.93,
      });
    }
  }
  function Me(o, n, s) {
    for (let l = 0; l < s; l++) {
      const c = Math.random() * 6.283,
        p = 0.6 + Math.random() * 1.4;
      qe(o, n, {
        smoke: 1,
        spal: [fn[4], fn[5], fn[3]],
        size: 3 + ((Math.random() * 3) | 0),
        max: 350 + Math.random() * 200,
        vx: Math.cos(c) * p,
        vy: Math.sin(c) * p * 0.6 - 0.3,
        grav: -0.01,
        drag: 0.92,
      });
    }
  }
  function It() {
    let o = 0;
    const n = f("#atk"),
      s = Ot(1);
    return (l) => {
      if (
        (l >= 80 &&
          o < 1 &&
          ((o = 1),
          Me(P.x, P.y, 14),
          n.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 60 / De, fill: "forwards" })),
        l >= 260 &&
          o < 2 &&
          ((o = 2),
          Me(u.x + 30, u.y + 8, 10),
          n.animate(
            [
              { transform: `translate(${s.x + 22}px,${s.y + 18}px)`, opacity: 0 },
              { transform: `translate(${s.x + 22}px,${s.y + 18}px)`, opacity: 1 },
            ],
            { duration: 60 / De, fill: "forwards" },
          )),
        l >= 330 && l < 560)
      ) {
        const c = l - 330,
          p = Math.max(0, (c - 70) / 160);
        (Kt(u.x + 6, u.y + 4, -0.8, 54, Math.min(1, c / 50), p * 0.9, 1 - p * 0.8),
          o < 3 && ((o = 3), (pt = 35), (re = 3), Jn(1, 350), On(u.x + 6, u.y + 4, 8, 1.8)));
      }
      return (
        l >= 600 &&
          o < 4 &&
          ((o = 4),
          Me(u.x + 30, u.y + 8, 8),
          n.animate(
            [
              { transform: `translate(${s.x + 22}px,${s.y + 18}px)`, opacity: 1 },
              { transform: `translate(${s.x + 22}px,${s.y + 18}px)`, opacity: 0, offset: 0.3 },
              { transform: "scaleX(-1)", opacity: 0, offset: 0.31 },
              { transform: "scaleX(-1)", opacity: 1 },
            ],
            { duration: 260 / De, fill: "forwards", easing: "steps(6)" },
          )),
        (n.style.filter = l < 820 ? "brightness(0) drop-shadow(0 0 2px #e0284a)" : ""),
        l < 900
      );
    };
  }
  function Kt(o, n, s, l, c, p, y) {
    const v = Math.cos(s),
      M = Math.sin(s);
    $.globalAlpha = y;
    for (let I = -l / 2 + l * p; I < -l / 2 + l * c; I += 1.5) {
      const ke = (I + l / 2) / l,
        Se = Math.sin(ke * Math.PI) * 3.5;
      (A(o + v * I, n + M * I, Se + 1.5, fn[5]),
        A(o + v * I, n + M * I, Se, fn[2]),
        A(o + v * I, n + M * I, Math.max(0.5, Se * 0.4), fn[1]));
    }
    $.globalAlpha = 1;
  }
  function Aa() {
    let o = 0;
    Te();
    const n = { x: P.x, y: P.y - 4 },
      s = u.x - n.x,
      l = u.y - n.y,
      c = Math.hypot(s, l),
      p = s / c,
      y = l / c,
      v = -y,
      M = p;
    return (I) => {
      if (I < 220) {
        const ke = I / 220;
        (J(n.x, n.y, 4 + ke * 8, 2, fn[2]), A(n.x, n.y, 3 + ke * 3, fn[5]));
      } else if (I < 900) {
        const ke = Math.min(1, (I - 220) / 200),
          Se = c * ke,
          Ae = I > 800 ? (900 - I) / 100 : 1;
        for (const [St, Jt, Oa, Qa] of [
          [0, fn[5], fn[2], 3.2],
          [Math.PI, fn[4], fn[3], 2.2],
        ])
          for (const un of [0, 1])
            for (let $n = 0; $n < Se; $n += 1.5) {
              const fs = Math.min(1, $n / 20) * Math.min(1, (Se - $n + 6) / 14),
                ds = (5 + ($n / c) * 4) * fs * Ae,
                Fs = Math.sin($n / 9 - I / 28 + St) * ds,
                oo = n.x + p * $n + v * Fs,
                yo = n.y + y * $n + M * Fs,
                xo = Qa * Ae * (0.7 + 0.3 * Math.sin($n / 5 - I / 20));
              un ? A(oo, yo, xo, Jt) : A(oo, yo, xo + 1, Oa);
            }
        for (let St = (I / 2) % 26; St < Se; St += 26) J(n.x + p * St, n.y + y * St, 6 * Ae, 1, fn[2]);
        (A(n.x + p * Se, n.y + y * Se, 5 * Ae, fn[5]),
          J(n.x + p * Se, n.y + y * Se, 6 * Ae, 1, fn[2]),
          ke >= 1 &&
            (o || ((o = 1), Jn(2, 700), (re = 3), On(u.x, u.y, 12, 2.2)),
            I % 100 < 17 && ((re = Math.max(re, 1.5)), J(u.x, u.y, 8 + Math.random() * 8, 2, fn[2]))));
      }
      return I < 1100;
    };
  }
  function Ka() {
    let o,
      n = 0,
      s = [];
    Te();
    const l = f("#def");
    return (c) => {
      const p = f("#tint");
      if (
        ((p.style.opacity = c < 1250 ? Math.min(0.5, c / 300) : Math.max(0, 0.5 - (c - 1250) / 250)), c < 420)
      ) {
        const y = Re(c / 420);
        for (let v = 0; v < y; v += 0.04) {
          const M = _e(P.x, u.x, v),
            I = _e(P.y + 16, u.y + 30, v) + Math.sin(v * 20 + c / 40) * 2;
          (A(M, I, 3 + Math.sin(v * 9) * 1, fn[5]), ((v * 25) | 0) % 3 === 0 && Z(M, I - 3, 2, fn[3]));
        }
      }
      if (c > 300 && c < 1300) {
        const y = c < 1150 ? 1 : (1300 - c) / 150;
        (($.globalAlpha = y), V(u.x + 6, u.y + 30, 26, 6, fn[3], 2));
        for (let v = 24; v > 0; v -= 3) V(u.x + 6, u.y + 30, v, v * 0.22, fn[5], 2);
        (($.globalAlpha = 1),
          c < 1e3 &&
            Math.random() < 0.5 &&
            qe(u.x + 6 + (Math.random() - 0.5) * 44, u.y + 30, {
              pal: [fn[3], fn[4], fn[5], fn[5], fn[5], fn[5]],
              heat: 0.4,
              max: 400,
              size: 2,
              vy: -0.6,
              grav: -0.01,
            }));
      }
      if (
        (c >= 420 &&
          !o &&
          ((o = l.cloneNode(!0)),
          o.removeAttribute("data-uid"),
          o.removeAttribute("data-team-uid"),
          o.removeAttribute("id"),
          o.classList.add("fxclone"),
          (o.style.left = l.style.left || getComputedStyle(l).left),
          (o.style.top = getComputedStyle(l).top),
          (o.style.filter = "brightness(0) drop-shadow(0 0 2px #e0284a) drop-shadow(0 0 1px #e0284a)"),
          l.before(o),
          o.animate(
            [
              { transform: "translate(0,0) scaleY(.1)", opacity: 0, transformOrigin: "50% 100%" },
              { transform: "translate(18%,-4%) scaleY(1.05)", opacity: 0.95, offset: 0.35 },
              { transform: "translate(24%,-10%) scale(1.15)", opacity: 0.95, offset: 0.62 },
              { transform: "translate(-4%,0) scale(1.05)", opacity: 1, offset: 0.72 },
              { transform: "translate(0,0)", opacity: 0.9, offset: 0.8 },
              { transform: "translate(0,0)", opacity: 0 },
            ],
            { duration: 820 / De, fill: "forwards", easing: "steps(16)" },
          )),
        c > 620 && c < 900)
      ) {
        const y = u.x + 12 + 18,
          v = u.y - 14;
        for (const M of [-5, 5]) (A(y + M, v, 2, fn[2]), Z(y + M, v, 1, fn[1]));
      }
      if (c >= 1010 && !n) {
        ((n = 1), (pt = 70), (re = 6), Jn(3, 600), On(u.x + 6, u.y + 4, 22, 2.8));
        for (let y = 0; y < 6; y++)
          s.push({ a: Math.random() * 6.283, L: 22 + Math.random() * 26, seed: Math.random() });
        (($.globalAlpha = 0.4), ($.fillStyle = fn[2]), Ge(), ($.globalAlpha = 1));
      }
      if (s.length && c < 1350) {
        const y = c > 1150 ? Math.max(0, 1 - (c - 1150) / 200) : 1;
        (($.globalAlpha = y),
          s.forEach((v) => {
            let M = v.seed * 1e4;
            ts(u.x + 6, u.y + 4, v.a, v.L, fn[2], () => (M = (M * 9301 + 49297) % 233280) / 233280);
          }),
          c < 1120 &&
            (J(u.x + 6, u.y + 4, 8 + (c - 1010) / 3, 3, fn[2]),
            J(u.x + 6, u.y + 4, 4 + (c - 1010) / 4, 2, fn[5])),
          ($.globalAlpha = 1));
      }
      return c < 1450;
    };
  }
  const _a = ["#f4ffd6", "#c8ff5a", "#8fe03a", "#b45cff", "#7a2fc4", "#3a1460"],
    Ha = ["#e7c6ff", "#b45cff", "#7a2fc4", "#5a1f99", "#3a1460", "#220b3a"];
  function Ua(o, n, s = {}) {
    qe(o, n, {
      pal: Ha,
      round: 1,
      heat: s.heat ?? Math.random() * 0.4,
      max: s.max || 380 + Math.random() * 250,
      size: s.size || 2 + Math.random() * 2,
      vx: s.vx || 0,
      vy: s.vy || 0,
      grav: s.grav ?? 0.11,
      drag: s.drag ?? 0.97,
    });
  }
  function sn(o, n, s) {
    (A(o, n, s + 1, _a[5]),
      A(o, n, s, _a[3]),
      A(o, n, s * 0.6, _a[2]),
      Z(o - s * 0.35, n - s * 0.4, Math.max(1, (s * 0.35) | 0), _a[0]));
  }
  function Be(o, n) {
    const s = f("#def");
    (s.animate(
      [
        { filter: "none" },
        { filter: "sepia(1) hue-rotate(230deg) saturate(3) brightness(.8)" },
        { filter: "none" },
        { filter: "sepia(1) hue-rotate(230deg) saturate(3) brightness(.8)" },
        { filter: "none" },
      ],
      { duration: n / De, easing: "steps(5)" },
    ),
      s.animate(
        [
          { transform: "none" },
          { transform: "scaleY(.94) scaleX(1.04)" },
          { transform: "scaleY(1.03) scaleX(.98)" },
          { transform: "none" },
        ],
        { duration: (n * 0.6) / De, easing: "steps(4)", transformOrigin: "50% 100%" },
      ));
    const l = f("#barDef");
    l.style.width = Math.max(8, parseFloat(l.style.width || 100) - [0, 12, 28, 55][o]) + "%";
  }
  function Ut(o, n, s, l) {
    for (let c = 0; c < l; c++)
      qe(o + (Math.random() - 0.5) * s, n, {
        pal: [_a[0], _a[1], _a[2], _a[2], _a[3], _a[4]],
        round: 1,
        heat: Math.random() * 0.4,
        max: 500 + Math.random() * 300,
        size: 1.5 + Math.random() * 1.5,
        vx: (Math.random() - 0.5) * 0.3,
        vy: -0.5 - Math.random() * 0.4,
        grav: -0.004,
        drag: 0.98,
      });
  }
  function aa() {
    let o = 0;
    Te();
    const n = Math.atan2(u.y - P.y, u.x - P.x),
      s = Math.cos(n),
      l = Math.sin(n);
    return (c) => (
      [80, 170, 260].forEach((p, y) => {
        const v = (c - p) / 200;
        if (v < 0) return;
        const M = { x: u.x + (y - 1) * 8, y: u.y + (y - 1) * 6 };
        if (v < 1) {
          const I = _e(P.x, M.x, v),
            ke = _e(P.y, M.y, v);
          for (let Se = 0; Se < 10; Se++)
            (($.fillStyle = Se < 3 ? _a[0] : Se < 6 ? _a[3] : _a[4]),
              $.fillRect(Math.round(I - s * Se), Math.round(ke - l * Se), 2, 2));
          (($.fillStyle = _a[1]), $.fillRect(Math.round(I + s), Math.round(ke + l), 2, 2));
        } else if (o <= y) {
          ((o = y + 1), Ut(M.x, M.y, 10, 5));
          for (let I = 0; I < 3; I++) Ua(M.x, M.y, { vx: (Math.random() - 0.5) * 1.5, vy: -1, size: 1.5 });
          y === 2 && Be(1, 500);
        }
      }),
      c > 500 && c < 800 && Math.random() < 0.3 && Ut(u.x, u.y + 10, 26, 1),
      c < 850
    );
  }
  function ae() {
    let o = 0,
      n = [];
    return (
      Te(),
      (s) => {
        if (s < 300) {
          const l = s / 300,
            c = 3 + l * 6 + Math.sin(s / 40) * 1;
          (A(P.x, P.y - 14, c + 1, Ha[4]),
            A(P.x, P.y - 14, c, Ha[2]),
            A(P.x - c * 0.3, P.y - 14 - c * 0.3, c * 0.4, Ha[0]),
            Math.random() < 0.4 && Ua(P.x + (Math.random() - 0.5) * 10, P.y - 14, { vy: 0.2, size: 1.5 }));
        } else if (s < 700) {
          const l = (s - 300) / 400,
            c = dt(l, { x: P.x, y: P.y - 14 }, u, 60),
            p = 1 + Math.sin(s / 30) * 0.12;
          ($.save(),
            A(c.x, c.y, 10 * p + 1, Ha[4]),
            A(c.x, c.y, 10 * p, Ha[2]),
            A(c.x + 2, c.y + 2, 6, Ha[3]),
            A(c.x - 3, c.y - 3, 3, Ha[0]),
            $.restore(),
            Math.random() < 0.6 && Ua(c.x, c.y, { vy: 0.5, size: 1.5 + Math.random() }));
        } else {
          if (!o) {
            ((o = 1), (pt = 40), (re = 4), Be(2, 800));
            for (let p = 0; p < 22; p++) {
              const y = -Math.PI / 2 + (Math.random() - 0.5) * 2.6,
                v = 1.5 + Math.random() * 2.5;
              Ua(u.x, u.y, { vx: Math.cos(y) * v, vy: Math.sin(y) * v, size: 2 + Math.random() * 2.5 });
            }
            for (let p = 0; p < 7; p++)
              n.push({
                x: u.x + (Math.random() - 0.5) * 44,
                y: u.y - 12 + Math.random() * 16,
                len: 0,
                spd: 0.04 + Math.random() * 0.05,
                w: 2 + ((Math.random() * 2) | 0),
              });
          }
          const l = s - 700;
          l < 150 && (A(u.x, u.y, 14 - l / 15, Ha[2]), J(u.x, u.y, 10 + l / 5, 2, Ha[1]));
          const c = l > 380 ? Math.max(0, 1 - (l - 380) / 170) : 1;
          (($.globalAlpha = c),
            n.forEach((p) => {
              ((p.len = Math.min(20, p.len + p.spd * 16)),
                ($.fillStyle = Ha[3]),
                $.fillRect(Math.round(p.x), Math.round(p.y), p.w, Math.round(p.len)),
                A(p.x + p.w / 2, p.y + p.len, p.w * 0.7 + 0.5, Ha[2]));
            }),
            ($.globalAlpha = 1),
            l < 500 && Math.random() < 0.4 && Ut(u.x, u.y + 14, 40, 1));
        }
        return s < 1250;
      }
    );
  }
  function ft() {
    let o = 0;
    Te();
    const n = { x: P.x, y: P.y - 8 },
      s = u.x - n.x,
      l = u.y - n.y,
      c = Math.hypot(s, l),
      p = s / c,
      y = l / c,
      v = -y,
      M = p;
    return (I) => {
      const ke = f("#tint");
      if (
        ((ke.style.opacity = I < 1200 ? Math.min(0.3, I / 500) : Math.max(0, 0.3 - (I - 1200) / 250)),
        I < 360)
      ) {
        const Se = I / 360;
        for (let Ae = 0; Ae < 3; Ae++) {
          const St = Math.random() * 6.283,
            Jt = 30 * (1 - Se) + 6;
          Ua(n.x + Math.cos(St) * Jt, n.y + Math.sin(St) * Jt, {
            vx: -Math.cos(St) * 1.2,
            vy: -Math.sin(St) * 1.2,
            grav: 0,
            max: 200,
            size: 2,
          });
        }
        (sn(n.x, n.y, 2 + Se * 7), H(f("#atk"), `scaleX(-1) scale(${1 + Se * 0.08},${1 - Se * 0.05})`));
      } else if (I < 820) {
        H(f("#atk"), "");
        const Se = Math.min(1, (I - 360) / 110),
          Ae = c * Se,
          St = I > 740 ? (820 - I) / 80 : 1;
        for (const [Jt, Oa] of [
          [8, Ha[4]],
          [6, Ha[2]],
          [3.5, _a[2]],
          [1.5, _a[0]],
        ])
          for (let Qa = 0; Qa < Ae; Qa += 2) {
            const un = Math.round(Math.sin(Qa / 8 - I / 25) * 1.5);
            A(
              n.x + p * Qa + v * un,
              n.y + y * Qa + M * un,
              Jt * St * (0.85 + 0.15 * Math.sin(Qa / 4 - I / 15)),
              Oa,
            );
          }
        for (let Jt = 0; Jt < 3; Jt++) {
          const Oa = Math.random() * Ae;
          Ua(n.x + p * Oa, n.y + y * Oa, {
            vx: p + (Math.random() - 0.5) * 1.5,
            vy: y - 1 - Math.random(),
            size: 2 + Math.random() * 2,
          });
        }
        (Se >= 1 &&
          !o &&
          ((o = 1),
          (pt = 60),
          (re = 6),
          Be(3, 1e3),
          ($.globalAlpha = 0.35),
          ($.fillStyle = _a[1]),
          Ge(),
          ($.globalAlpha = 1)),
          Se >= 1 &&
            (sn(u.x, u.y, 9 + Math.random() * 3),
            Math.random() < 0.6 &&
              Ua(u.x, u.y, { vx: (Math.random() - 0.5) * 4, vy: -2 - Math.random() * 2, size: 3 })));
      } else if (I < 840)
        for (let Se = 0; Se < 24; Se++) {
          const Ae = Math.random() * 6.283,
            St = 1.5 + Math.random() * 3;
          Ua(u.x, u.y, { vx: Math.cos(Ae) * St, vy: Math.sin(Ae) * St - 1, size: 2.5 + Math.random() * 2.5 });
        }
      if (I > 820 && I < 1350) {
        const Se = I - 820;
        for (let Ae = 0; Ae < 6; Ae++) {
          const St = (Ae / 6) * 6.283 + Se / 600,
            Jt = 22 + Se / 25 + Math.sin(Se / 90 + Ae) * 4;
          (($.globalAlpha = 0.5 * Math.max(0, 1 - Se / 530)),
            A(
              u.x + Math.cos(St) * Jt,
              u.y + 6 + Math.sin(St) * Jt * 0.45,
              8 + Math.sin(Se / 70 + Ae) * 2,
              Ae % 2 ? Ha[2] : _a[3],
            ),
            ($.globalAlpha = 1));
        }
        Math.random() < 0.5 && Ut(u.x, u.y + 16, 50, 1);
      }
      return I < 1450;
    };
  }
  const ht = ["#ffffff", "#9ff5ff", "#4fc8ff", "#5a5cff", "#3a1fb0", "#170a4a"],
    ea = ["#fff6c8", "#ffd84a", "#ff9d1f"];
  function Ra(o, n) {
    const s = f("#def");
    (s.animate(
      [
        { filter: "none" },
        { filter: "brightness(2) sepia(1) hue-rotate(190deg) saturate(4)" },
        { filter: "none" },
        { filter: "brightness(1.6) sepia(1) hue-rotate(190deg) saturate(3)" },
        { filter: "none" },
      ],
      { duration: n / De, easing: "steps(5)" },
    ),
      s.animate(
        [
          { transform: "none" },
          { transform: `translateX(${o * 4}px)` },
          { transform: `translateX(${-o * 3}px)` },
          { transform: "none" },
        ],
        { duration: 260 / De, easing: "steps(5)" },
      ));
    const l = f("#barDef");
    l.style.width = Math.max(8, parseFloat(l.style.width || 100) - [0, 12, 28, 55][o]) + "%";
  }
  function Ca(o, n, s, l, c = ht) {
    for (let p = 0; p < s; p++) {
      const y = Math.random() * 6.283,
        v = l * (0.4 + Math.random() * 0.8);
      qe(o, n, {
        pal: c,
        heat: Math.random() * 0.5,
        vx: Math.cos(y) * v,
        vy: Math.sin(y) * v,
        max: 300 + Math.random() * 250,
        size: 2 + ((Math.random() * 2) | 0),
        grav: 0,
        drag: 0.93,
      });
    }
  }
  function gn() {
    let o = 0,
      n = 0,
      s = 0;
    Te();
    const l = Math.atan2(u.y - P.y, u.x - P.x),
      c = Math.hypot(u.x - P.x, u.y - P.y);
    return (p) => {
      const y = p - s;
      if (((s = p), p < 180)) (A(P.x, P.y - 4, 2 + p / 50, ht[3]), A(P.x, P.y - 4, 1 + p / 90, ht[1]));
      else if (p < 720) {
        for (n += (y / 16) * 2.2; n >= 1;) {
          n--;
          const v = 3 + Math.random(),
            M = (Math.random() - 0.5) * 0.3;
          qe(P.x, P.y - 4, {
            pal: ht,
            round: 1,
            heat: Math.random() * 0.3,
            vx: Math.cos(l + M) * v,
            vy: Math.sin(l + M) * v,
            max: (c / v) * 16 * (0.85 + Math.random() * 0.3),
            size: 2.5 + Math.random() * 2.5,
            grav: 0,
            drag: 1,
          });
        }
        (it.forEach((v) => {
          if (v.pal === ht && v.round) {
            const M = v.life / 45 + v.max;
            ((v.x += -Math.sin(l) * Math.cos(M) * 0.8), (v.y += Math.cos(l) * Math.cos(M) * 0.8));
          }
        }),
          !o && p > 420 && ((o = 1), Ra(1, 600), (re = 2)),
          o && p % 80 < 17 && Ca(u.x, u.y, 3, 1.6));
      }
      return p < 1050;
    };
  }
  function yn() {
    let o = 0,
      n = 0;
    const s = f("#atk");
    Te();
    const l = Math.PI * 0.72,
      c = Math.cos(l),
      p = Math.sin(l),
      y = -p,
      v = c,
      M = 52;
    s.animate(
      [
        { filter: "none" },
        { filter: "drop-shadow(0 0 3px #4fc8ff) drop-shadow(0 0 6px #5a5cff) brightness(1.2)", offset: 0.4 },
        { filter: "drop-shadow(0 0 3px #4fc8ff) drop-shadow(0 0 6px #5a5cff) brightness(1.2)", offset: 0.9 },
        { filter: "none" },
      ],
      { duration: 500 / De, easing: "steps(6)" },
    );
    const I = (ke, Se, Ae) => {
      const St = (ke - 1) * 11,
        Jt = u.x + 10 + y * St,
        Oa = u.y + v * St;
      $.globalAlpha = Ae;
      for (const [Qa, un] of [
        [9, ht[5]],
        [7, ht[4]],
        [5, ht[3]],
        [3, ht[2]],
        [1.4, ht[1]],
      ])
        for (let $n = -M / 2; $n < -M / 2 + M * Se; $n += 0.7) {
          const fs = ($n + M / 2) / M,
            ds = Math.round(Math.sin(fs * Math.PI) * Qa);
          (ds < 1 && Qa > 1) ||
            (($.fillStyle = un),
            $.fillRect(Math.round(Jt + c * $n - ds / 2), Math.round(Oa + p * $n), Math.max(1, ds), 1));
        }
      $.globalAlpha = 1;
    };
    return (ke) => {
      ke < 240 &&
        Math.random() < 0.6 &&
        qe(P.x + (Math.random() - 0.5) * 24, P.y + (Math.random() - 0.5) * 20, {
          pal: ht,
          heat: 0.2,
          max: 220,
          size: 2,
          grav: 0,
          vy: -0.5,
        });
      const Se = ke - 240;
      if (Se >= 30 && Se < 620) {
        for (let Ae = 0; Ae < 3; Ae++) {
          const St = Math.min(1, Math.max(0, (Se - 30 - Ae * 25) / 70));
          if (St <= 0) continue;
          const Jt = Se < 380 ? 1 + Math.sin(Se / 35) * 0.15 : Math.max(0, 1 - (Se - 380) / 240);
          if ((I(Ae, St, Math.min(1, Jt)), St >= 1 && Se < 560 && Math.random() < 0.55)) {
            const Oa = -M / 2 + Math.random() * M,
              Qa = (Ae - 1) * 11;
            qe(u.x + 10 + y * Qa + c * Oa, u.y + v * Qa + p * Oa, {
              pal: ht,
              round: 1,
              heat: 0.2 + Math.random() * 0.5,
              vx: (Math.random() - 0.5) * 0.5,
              vy: -0.4 - Math.random() * 0.6,
              max: 420 + Math.random() * 200,
              size: 2 + Math.random() * 2.5,
              grav: -0.01,
              drag: 0.97,
            });
          }
        }
        if (
          (!o &&
            Se > 60 &&
            ((o = 1),
            (pt = 45),
            (re = 4),
            Ra(2, 650),
            Ca(u.x + 10, u.y, 12, 2.6),
            Ca(u.x + 10, u.y, 6, 2, [ea[0], ea[1], ea[2], ea[2], ht[3], ht[4]])),
          Se > 380 && !n)
        ) {
          n = 1;
          for (let Ae = 0; Ae < 3; Ae++)
            for (let St = 0; St < 7; St++) {
              const Jt = -M / 2 + Math.random() * M,
                Oa = (Ae - 1) * 9;
              qe(u.x + 10 + y * Oa + c * Jt, u.y + v * Oa + p * Jt, {
                pal: ht,
                heat: Math.random() * 0.4,
                vx: (Math.random() - 0.5) * 1.2,
                vy: -0.3 - Math.random() * 0.8,
                max: 380,
                size: 2,
                grav: -0.01,
                drag: 0.95,
              });
            }
        }
      }
      return ke < 950;
    };
  }
  function mn() {
    let o = 0,
      n = 0,
      s = [],
      l = 0;
    return (
      Te(),
      (c) => {
        const p = f("#tint");
        if (
          ((p.style.opacity = c < 1450 ? Math.min(0.5, c / 600) : Math.max(0, 0.5 - (c - 1450) / 250)),
          c < 300)
        ) {
          const y = c / 300;
          (A(P.x, P.y - 10, 3 + y * 5, ht[3]), A(P.x, P.y - 10, 2 + y * 3, ht[1]));
          for (let v = 0; v < 2; v++) {
            const M = Math.random() * 6.283;
            qe(P.x + Math.cos(M) * 30, P.y - 10 + Math.sin(M) * 24, {
              pal: ht,
              vx: -Math.cos(M) * 1.6,
              vy: -Math.sin(M) * 1.3,
              heat: 0.2,
              max: 200,
              size: 2,
              grav: 0,
            });
          }
        } else if (c < 560) {
          const y = Re((c - 300) / 260),
            v = _e(P.x, Je * 0.55, y),
            M = _e(P.y - 10, 8, y);
          (A(v, M, 7, ht[3]),
            A(v, M, 5, ht[2]),
            A(v, M, 2.5, ht[0]),
            qe(v, M + 4, { pal: ht, heat: 0.2, max: 260, size: 2, grav: 0, vy: 0.6 }));
        } else if (!n) {
          ((n = 1), Ca(Je * 0.55, 8, 24, 3));
          for (let y = 0; y < 7; y++)
            s.push({
              t0: 620 + y * 85,
              sx: u.x - 70 + Math.random() * 60,
              sy: -12,
              tx: u.x + (Math.random() - 0.5) * 46,
              ty: u.y + 10 + (Math.random() - 0.5) * 20,
              r: y === 6 ? 8 : 4 + Math.random() * 2.5,
              hit: 0,
            });
        }
        if (c >= 560 && c < 640) {
          const y = c - 560;
          J(Je * 0.55, 8, 4 + y / 3, 2, ht[1]);
        }
        return (
          s.forEach((y, v) => {
            const M = (c - y.t0) / 200;
            if (!(M < 0)) {
              if (M < 1) {
                const I = _e(y.sx, y.tx, M * M),
                  ke = _e(y.sy, y.ty, M * M),
                  Se = y.tx - y.sx,
                  Ae = y.ty - y.sy,
                  St = Math.hypot(Se, Ae);
                for (let Jt = 1; Jt <= 5; Jt++) {
                  const Oa = I - (Se / St) * Jt * 5,
                    Qa = ke - (Ae / St) * Jt * 5;
                  (($.globalAlpha = 0.7 - Jt * 0.12),
                    A(Oa, Qa, y.r * (1 - Jt * 0.14), Jt < 3 ? ht[2] : ht[3]),
                    ($.globalAlpha = 1));
                }
                (A(I, ke, y.r + 1, ht[4]),
                  A(I, ke, y.r, ea[2]),
                  A(I, ke, y.r * 0.6, ea[1]),
                  A(I - y.r * 0.25, ke - y.r * 0.25, y.r * 0.3, ea[0]));
              } else if (y.hit) {
                const I = c - y.t0 - 200;
                I < 180 && J(y.tx, y.ty + 4, 4 + I / (v === 6 ? 4 : 8), 2, I < 80 ? ea[1] : ht[3]);
              } else if (
                ((y.hit = 1),
                l++,
                (re = v === 6 ? 6 : 2.5),
                v === 6 &&
                  ((pt = 60), ($.globalAlpha = 0.35), ($.fillStyle = ht[1]), Ge(), ($.globalAlpha = 1)),
                Ca(y.tx, y.ty, v === 6 ? 22 : 8, v === 6 ? 3 : 2),
                Ca(y.tx, y.ty, v === 6 ? 8 : 3, 2, [ea[0], ea[1], ea[2], ea[2], ht[3], ht[4]]),
                l === 1 && Ra(2, 500),
                v === 6)
              ) {
                Ra(3, 700);
                for (let I = 0; I < 8; I++)
                  qe(y.tx + (Math.random() - 0.5) * 40, y.ty + 16, {
                    smoke: 1,
                    spal: ["#6a6a9a", "#4a4a78", "#2e2e52"],
                    size: 4,
                    max: 700,
                    vy: -0.4,
                    grav: -0.01,
                  });
              }
            }
          }),
          c < 1700
        );
      }
    );
  }
  const ln = ["#f2ffd0", "#b8f060", "#6fcf3a", "#3d9a2a", "#22612a", "#123a1e"],
    In = ["#fff0f6", "#ffc2dc", "#ff8ab8", "#e0508f"],
    xe = ["#ffffff", "#fffbd0", "#ffe866", "#ffc21f", "#ff8f1f"];
  function Et(o, n, s, l = 1) {
    const c = Math.cos(s),
      p = Math.sin(s);
    for (let y = -3; y <= 3; y++) {
      const v = Math.round((1 - Math.abs(y) / 3.5) * 2 * l);
      for (let M = -v; M <= v; M++) {
        const I = o + c * y * l * 1.3 - p * M * 0.8,
          ke = n + p * y * l * 1.3 + c * M * 0.8;
        (($.fillStyle = M === 0 ? ln[1] : M < 0 ? ln[2] : ln[3]),
          $.fillRect(Math.round(I), Math.round(ke), 1, 1));
      }
    }
    (($.fillStyle = ln[4]), $.fillRect(Math.round(o - c * 4 * l), Math.round(n - p * 4 * l), 1, 1));
  }
  function oa(o, n, s, l) {
    const c = Math.cos(s),
      p = Math.sin(s);
    $.fillStyle = l;
    for (const [y, v] of [
      [0, 0],
      [1, 0],
      [-1, 0],
      [0, 1],
      [1, 1],
      [2, 0],
      [0, -1],
      [1, -1],
      [-1, 1],
    ])
      $.fillRect(Math.round(o + (c * y - p * v) * 2), Math.round(n + (p * y + c * v) * 2), 2, 2);
    (($.fillStyle = In[0]), $.fillRect(Math.round(o), Math.round(n), 2, 2));
  }
  function sa(o, n) {
    const s = f("#def");
    (s.animate(
      [
        { filter: "none" },
        { filter: "brightness(1.8) sepia(1) hue-rotate(50deg) saturate(3)" },
        { filter: "none" },
        { filter: "brightness(1.5) sepia(1) hue-rotate(50deg) saturate(2)" },
        { filter: "none" },
      ],
      { duration: n / De, easing: "steps(5)" },
    ),
      s.animate(
        [
          { transform: "none" },
          { transform: `translateX(${o * 3}px)` },
          { transform: `translateX(${-o * 2}px)` },
          { transform: "none" },
        ],
        { duration: 240 / De, easing: "steps(4)" },
      ));
    const l = f("#barDef");
    l.style.width = Math.max(8, parseFloat(l.style.width || 100) - [0, 12, 28, 55][o]) + "%";
  }
  let Ga = [];
  function cn(o) {
    const n = o / 16;
    Ga = Ga.filter(
      (s) => (
        (s.life += o),
        s.life > s.max
          ? !1
          : ((s.vx *= 0.97 ** n),
            (s.vy = s.vy * 0.97 ** n + 0.04 * n),
            (s.x += (s.vx + Math.sin(s.life / 150 + s.sw) * 0.5) * n),
            (s.y += s.vy * n),
            (s.ang += s.va * n),
            (s.life / s.max > 0.7 && ((s.x + s.y) | 0) % 2) ||
              (s.petal ? oa(s.x, s.y, s.ang, s.c) : Et(s.x, s.y, s.ang, 1.2)),
            !0)
      ),
    );
  }
  function Tn(o, n, s, l, c = 0) {
    for (let p = 0; p < s; p++) {
      const y = Math.random() * 6.283,
        v = l * (0.4 + Math.random() * 0.8);
      Ga.push({
        x: o,
        y: n,
        vx: Math.cos(y) * v,
        vy: Math.sin(y) * v - 1,
        ang: Math.random() * 6,
        va: (Math.random() - 0.5) * 0.35,
        sw: Math.random() * 6,
        life: 0,
        max: 600 + Math.random() * 400,
        petal: c && Math.random() < 0.7,
        c: In[1 + ((Math.random() * 3) | 0)],
      });
    }
  }
  function Mn() {
    let o = 0;
    Te();
    const n = (c, p, y) => (v) => {
        const M = (v - c) / 260;
        if (M < 0) return;
        const I = M < 1 ? Re(M) : M < 1.6 ? 1 : Math.max(0, 1 - (M - 1.6) / 0.6);
        if (I <= 0) return;
        const ke = { x: P.x + 8, y: P.y - 2 },
          Se = { x: u.x + 2, y: u.y + p * 8 },
          Ae = 26,
          St = M >= 1 && M < 1.25,
          Jt = [];
        for (let Qa = 0; Qa <= Ae; Qa++) {
          const un = (Qa / Ae) * I,
            $n =
              Math.sin(un * Math.PI * 2.2 - v / 60) * (1 - un) * 10 * p +
              Math.sin(un * Math.PI) * -26 * p * (M < 1 ? 1 : 0.6),
            fs = _e(ke.x, Se.x, un),
            ds = _e(ke.y, Se.y, un),
            Fs = Se.x - ke.x,
            oo = Se.y - ke.y,
            yo = Math.hypot(Fs, oo);
          Jt.push({ x: fs - (oo / yo) * $n, y: ds + (Fs / yo) * $n, w: Math.max(1, 2 - un * 1.2) });
        }
        for (let Qa = 1; Qa < Jt.length; Qa++) {
          const un = Jt[Qa - 1],
            $n = Jt[Qa];
          (Ee(un.x, un.y, $n.x, $n.y, Math.round(un.w) + 1, ln[5]),
            Ee(un.x, un.y, $n.x, $n.y, Math.round(un.w), ln[3]));
        }
        for (let Qa = 2; Qa < Jt.length; Qa += 4) {
          const un = Jt[Qa];
          (($.fillStyle = ln[1]),
            $.fillRect(Math.round(un.x), Math.round(un.y) - 1, 1, 1),
            Qa % 8 === 2 && Et(un.x, un.y - 3 * p, -1.2 * p, 0.7));
        }
        if (M < 1 && Math.random() < 0.35) {
          const Qa = Jt[Jt.length - 1];
          Ga.push({
            x: Qa.x,
            y: Qa.y,
            vx: (Math.random() - 0.5) * 0.6,
            vy: -0.3 - Math.random() * 0.4,
            ang: Math.random() * 6,
            va: (Math.random() - 0.5) * 0.25,
            sw: Math.random() * 6,
            life: 0,
            max: 700 + Math.random() * 400,
          });
        }
        const Oa = Jt[Jt.length - 1];
        (St && (A(Oa.x, Oa.y, 4, ln[0]), J(Oa.x, Oa.y, 6 + (M - 1) * 30, 1, ln[1])),
          M >= 1 &&
            o <= y &&
            ((o = y + 1), Tn(Oa.x, Oa.y, 4, 1.8), sa(y ? 0 : 1, 400), (re = 2.5), (pt = 25)));
      },
      s = n(80, 1, 0),
      l = n(230, -1, 1);
    return (c) => (s(c), l(c), c < 1e3);
  }
  function ks(o, n, s) {
    const l = Math.cos(s),
      c = Math.sin(s);
    for (let p = -16; p < 16; p += 0.7) {
      const y = Math.round(Math.cos(((p / 16) * Math.PI) / 2) * 2);
      (($.fillStyle = ln[3]),
        $.fillRect(Math.round(o + l * p - y), Math.round(n + c * p), y * 2 + 1, 1),
        ($.fillStyle = ln[0]),
        $.fillRect(Math.round(o + l * p), Math.round(n + c * p), 1, 1));
    }
  }
  function ss() {
    let o = 0;
    Te();
    const n = [];
    for (let l = 0; l < 10; l++)
      Ga.push({
        x: Math.random() * Je,
        y: -10 - Math.random() * 60,
        vx: 0.6 + Math.random() * 0.6,
        vy: 0.6 + Math.random() * 0.5,
        ang: Math.random() * 6,
        va: (Math.random() - 0.5) * 0.2,
        sw: Math.random() * 6,
        life: 0,
        max: 1300,
        petal: 1,
        c: In[1 + ((Math.random() * 3) | 0)],
      });
    for (let l = 0; l < 34; l++)
      n.push({
        a: Math.random() * 6.283,
        r: 18 + Math.random() * 16,
        d: 200 + Math.random() * 200,
        c: In[1 + ((Math.random() * 3) | 0)],
        sp: 0.9 + Math.random() * 0.4,
        ph: Math.random() * 6,
      });
    const s = f("#tint");
    return (
      (s.style.background = "#ff8ab8"),
      (l) => (
        (s.style.opacity = l < 1150 ? Math.min(0.18, l / 1500) : Math.max(0, 0.18 - (l - 1150) / 200)),
        n.forEach((c) => {
          const p = l - c.d;
          if (p < 0) return;
          let y, v;
          if (p < 450) {
            const M = c.a + (p / 120) * c.sp;
            ((y = P.x + Math.cos(M) * c.r), (v = P.y - 6 + Math.sin(M) * c.r * 0.55 - p / 40));
          } else {
            const M = Math.min(1, (p - 450) / 450),
              I = Re(M),
              ke = c.a + (450 / 120) * c.sp + M * 6 * c.sp,
              Se = c.r * (1 - I) + (10 + c.r * 0.5) * I,
              Ae = _e(P.x, u.x, I),
              St = _e(P.y - 6 - 450 / 40, u.y, I) + Math.sin(I * Math.PI) * -20;
            ((y = Ae + Math.cos(ke) * Se), (v = St + Math.sin(ke) * Se * 0.55));
          }
          p > 1050 || oa(y, v, l / 60 + c.ph, c.c);
        }),
        !o && l > 1e3 && ((o = 1), sa(2, 700), (re = 3), Tn(u.x, u.y, 10, 2, 1)),
        o && l < 1350 && l % 90 < 17 && (re = Math.max(re, 1.2)),
        l < 1550
      )
    );
  }
  function us() {
    let o = 0;
    Te();
    const n = { x: P.x + 2, y: P.y - 8 },
      s = u.x - n.x,
      l = u.y - n.y,
      c = Math.hypot(s, l),
      p = s / c,
      y = l / c;
    return (v) => {
      const M = f("#tint");
      if (
        ((M.style.background = "#fff6c0"),
        (M.style.opacity =
          v < 700 ? Math.min(0.25, v / 1200) : v < 1200 ? 0.25 : Math.max(0, 0.25 - (v - 1200) / 300)),
        v < 700)
      ) {
        const I = v / 700;
        for (let ke = 0; ke < 5; ke++) {
          const Se = n.x - 30 + Math.random() * 60;
          (($.globalAlpha = 0.6),
            ($.fillStyle = xe[2]),
            $.fillRect(Math.round(Se), 0, 2, Math.round(n.y * I + Math.random() * 6)),
            ($.globalAlpha = 1));
        }
        for (let ke = 0; ke < 3; ke++) {
          const Se = Math.random() * 6.283,
            Ae = 40 * (1 - I) + 8;
          qe(n.x + Math.cos(Se) * Ae, n.y + Math.sin(Se) * Ae, {
            pal: xe,
            vx: -Math.cos(Se) * 1.4,
            vy: -Math.sin(Se) * 1.4,
            heat: 0.2,
            max: 200,
            size: 2,
            grav: 0,
          });
        }
        (A(n.x, n.y, 3 + I * 7, xe[3]),
          A(n.x, n.y, 2 + I * 5, xe[2]),
          A(n.x, n.y, 1 + I * 3, xe[0]),
          I > 0.8 && J(n.x, n.y, 10 + (v - 560) / 6, 2, xe[1]));
      } else if (v < 1200) {
        const I = Math.min(1, (v - 700) / 90),
          ke = c * I,
          Se = v > 1100 ? (1200 - v) / 100 : 1,
          Ae = 1 + Math.sin(v / 30) * 0.12;
        for (const [St, Jt] of [
          [11, xe[4]],
          [9, xe[3]],
          [6.5, xe[2]],
          [3.5, xe[1]],
          [1.6, xe[0]],
        ])
          for (let Oa = 0; Oa < ke; Oa += 2)
            A(n.x + p * Oa, n.y + y * Oa, St * Se * Ae * Math.min(1, 0.55 + (Oa / c) * 0.6), Jt);
        for (let St = 0; St < 2; St++) {
          const Jt = Math.random() * ke;
          qe(n.x + p * Jt, n.y + y * Jt, {
            pal: xe,
            vx: (Math.random() - 0.5) * 2,
            vy: (Math.random() - 0.5) * 2,
            heat: 0.2,
            max: 260,
            size: 2,
            grav: 0,
          });
        }
        I >= 1 &&
          (o ||
            ((o = 1),
            (pt = 60),
            (re = 6),
            sa(3, 900),
            ($.globalAlpha = 0.5),
            ($.fillStyle = xe[0]),
            Ge(),
            ($.globalAlpha = 1)),
          A(u.x, u.y, 14 + Math.random() * 3, xe[2]),
          A(u.x, u.y, 9, xe[0]),
          v % 60 < 17 && J(u.x, u.y, 16 + Math.random() * 12, 2, xe[3]));
      } else if (v < 1220) {
        for (let I = 0; I < 24; I++) {
          const ke = Math.random() * 6.283,
            Se = 1.5 + Math.random() * 2.5;
          qe(u.x, u.y, {
            pal: xe,
            vx: Math.cos(ke) * Se,
            vy: Math.sin(ke) * Se,
            heat: Math.random() * 0.4,
            max: 400,
            size: 2 + ((Math.random() * 2) | 0),
            grav: 0.02,
            drag: 0.93,
          });
        }
        Tn(u.x, u.y, 6, 2);
      }
      return v < 1700;
    };
  }
  const Xn = ["#f0e2c4", "#c9ad80", "#9c7f55", "#6e5636", "#45341f", "#241a0f"],
    Dn = ["#e8dcc0", "#cbb894", "#a8936c"];
  function ls(o, n, s, l, c = 1) {
    const y = [];
    for (let v = 0; v < 7; v++) {
      const M = l + (v / 7) * 6.283,
        I = s * (0.75 + ((Math.sin(c * 13 + v * 7.1) + 1) / 2) * 0.35);
      y.push([o + Math.cos(M) * I, n + Math.sin(M) * I * 0.9]);
    }
    for (let v = 0; v < 7; v++) {
      const M = y[v],
        I = y[(v + 1) % 7];
      Yn(o, n, M[0], M[1], I[0], I[1], Xn[2]);
    }
    for (let v = 0; v < 7; v++) {
      const M = y[v],
        I = y[(v + 1) % 7],
        ke = (M[0] + I[0]) / 2,
        Se = (M[1] + I[1]) / 2,
        Ae = (ke - o) * -0.7 + (Se - n) * -0.7;
      Yn(
        o + (ke - o) * 0.15,
        n + (Se - n) * 0.15,
        M[0],
        M[1],
        I[0],
        I[1],
        Ae > s * 0.3 ? Xn[1] : Ae < -s * 0.3 ? Xn[3] : Xn[2],
      );
    }
    for (let v = 0; v < 7; v++) {
      const M = y[v],
        I = y[(v + 1) % 7];
      Ee(M[0], M[1], I[0], I[1], 1, Xn[4]);
    }
    (($.fillStyle = Xn[0]),
      $.fillRect(Math.round(o - s * 0.35), Math.round(n - s * 0.4), Math.max(1, (s * 0.3) | 0), 1));
  }
  function Hn(o, n, s, l) {
    for (let c = 0; c < s; c++) {
      const p = -Math.PI / 2 + (Math.random() - 0.5) * 2.6,
        y = l * (0.4 + Math.random() * 0.8);
      qe(o, n, {
        pal: [Xn[1], Xn[2], Xn[2], Xn[3], Xn[3], Xn[4]],
        heat: Math.random() * 0.6,
        vx: Math.cos(p) * y,
        vy: Math.sin(p) * y,
        max: 450 + Math.random() * 250,
        size: 2 + ((Math.random() * 2) | 0),
        grav: 0.16,
        drag: 0.98,
      });
    }
  }
  function Kn(o, n, s, l) {
    for (let c = 0; c < s; c++)
      qe(o + (Math.random() - 0.5) * l, n, {
        smoke: 1,
        spal: Dn,
        size: 3 + ((Math.random() * 3) | 0),
        max: 500 + Math.random() * 400,
        vx: (Math.random() - 0.5) * 1.2,
        vy: -0.2 - Math.random() * 0.4,
        grav: -0.005,
        drag: 0.96,
      });
  }
  function Sn(o, n) {
    const s = f("#def");
    (s.animate(
      [
        { filter: "none" },
        { filter: "brightness(2.5) saturate(0)" },
        { filter: "none" },
        { filter: "brightness(2) saturate(0)" },
        { filter: "none" },
      ],
      { duration: n / De, easing: "steps(4)" },
    ),
      s.animate(
        [
          { transform: "none" },
          { transform: `translateY(${o * 2}px)` },
          { transform: `translate(${o * 2}px,${-o}px)` },
          { transform: "none" },
        ],
        { duration: 260 / De, easing: "steps(4)" },
      ));
    const l = f("#barDef");
    l.style.width = Math.max(8, parseFloat(l.style.width || 100) - [0, 12, 28, 55][o]) + "%";
  }
  function ns() {
    let o = 0;
    Te();
    const n = [];
    return (s) => (
      [
        [60, 22, 4.5],
        [160, 34, 5.5],
        [250, 16, 4],
      ].forEach(([l, c, p], y) => {
        const v = (s - l) / 320;
        if (v < 0) return;
        const M = { x: u.x + (y - 1) * 10, y: u.y + (y - 1) * 4 };
        if (v < 1) {
          const I = dt(v, { x: P.x, y: P.y - 6 }, M, c);
          ls(I.x, I.y, p, s / 60, y + 1);
        } else {
          o <= y &&
            ((o = y + 1),
            Hn(M.x, M.y, 6, 1.8),
            Kn(M.x, M.y, 3, 10),
            Sn(1, 350),
            (re = 2),
            (n[y] = { x: M.x, y: M.y, vx: -1.2 - Math.random(), vy: -2.4, t: s }));
          const I = n[y];
          if (I && s - I.t < 500) {
            const ke = (s - I.t) / 16;
            ls(I.x + I.vx * ke, I.y + I.vy * ke + 0.12 * ke * ke, p * 0.8, s / 50, y + 1);
          }
        }
      }),
      s < 900
    );
  }
  function Ue() {
    let o = 0;
    Te();
    const n = [];
    for (let s = 0; s < 7; s++)
      n.push({
        t0: 200 + s * 90 + Math.random() * 30,
        x: u.x + (Math.random() - 0.5) * 60,
        y: u.y + 18 + (Math.random() - 0.5) * 12,
        r: 5 + Math.random() * 6,
        rot: Math.random() * 6,
        hit: 0,
      });
    return (s) => (
      s < 300 && Math.random() < 0.5 && Hn(u.x + (Math.random() - 0.5) * 60, 0, 1, 0.5),
      n.forEach((l, c) => {
        const p = (s - l.t0) / 260;
        if (p > -0.6 && p < 1) {
          const y = Math.max(0, Math.min(1, p + 0.6));
          (($.globalAlpha = 0.35 * y), V(l.x, l.y + 4, l.r * y, l.r * 0.3 * y, Xn[5], 2));
          for (let v = l.r * y * 0.8; v > 0; v -= 2) V(l.x, l.y + 4, v, v * 0.3, Xn[5], 2);
          $.globalAlpha = 1;
        }
        if (!(p < 0))
          if (p < 1) ls(l.x, _e(-20, l.y - l.r, p * p), l.r, l.rot + s / 200, c + 3);
          else {
            l.hit ||
              ((l.hit = 1),
              (re = c === 6 ? 4 : 2.5),
              Hn(l.x, l.y - l.r, 8, 2.2),
              Kn(l.x, l.y, 5, l.r * 2),
              o || ((o = 1), Sn(2, 900)));
            const y = s - l.t0 - 260;
            if (y < 400) {
              if (y > 250 && ((l.x | 0) + ((y / 40) | 0)) % 2) return;
              ls(l.x, l.y - l.r, l.r, l.rot, c + 3);
            }
          }
      }),
      s < 1300
    );
  }
  function Bt() {
    let o = 0;
    Te();
    const n = 6,
      s = [];
    for (let p = 0; p < n; p++) {
      const y = (p + 1) / n;
      s.push({
        x: _e(P.x + 20, u.x + 4, y),
        y: _e(P.y + 22, u.y + 30, y),
        h: p === n - 1 ? 64 : 14 + y * 30,
        w: p === n - 1 ? 13 : 5 + y * 5,
        t0: 150 + p * 80 + (p === n - 1 ? 60 : 0),
        lean: p === n - 1 ? 0 : (Math.random() - 0.5) * 0.3,
      });
    }
    const l = [],
      c = (p, y, v, M, I, ke) => {
        const Se = v * ke,
          Ae = p + I * Se;
        (Yn(p - M, y, p + M, y, Ae, y - Se, Xn[2]),
          Yn(p - M, y, p, y, Ae, y - Se, Xn[1]),
          Yn(p, y, p + M, y, Ae, y - Se, Xn[3]),
          Ee(p - M, y, Ae, y - Se, 1, Xn[4]),
          Ee(p + M, y, Ae, y - Se, 1, Xn[4]),
          ($.fillStyle = Xn[0]),
          $.fillRect(
            Math.round(_e(p - M * 0.4, Ae, 0.3)),
            Math.round(y - Se * 0.3),
            1,
            Math.max(1, (Se * 0.3) | 0),
          ));
      };
    return (p) => {
      const y = f("#tint");
      if (
        ((y.style.opacity = p < 1200 ? Math.min(0.35, p / 500) : Math.max(0, 0.35 - (p - 1200) / 200)),
        p < 150
          ? H(f("#atk"), `scaleX(-1) translateY(${p < 75 ? -6 : 0}px)`)
          : p < 170 && (H(f("#atk"), ""), (re = 3), Kn(P.x, P.y + 22, 6, 30)),
        s.forEach((v, M) => {
          const I = (p - v.t0) / 90;
          if (I < 0) return;
          const ke = p > 1050 ? Math.max(0, 1 - (p - 1050) / 250) : 1;
          if (!(ke <= 0)) {
            if (
              I < 1.3 &&
              !v.d &&
              ((v.d = I >= 1),
              v.d &&
                (Hn(v.x, v.y - 4, M === n - 1 ? 14 : 4, M === n - 1 ? 2.8 : 1.6),
                Kn(v.x, v.y, M === n - 1 ? 8 : 3, v.w * 2),
                (re = M === n - 1 ? 6 : 2),
                M === n - 1 && !o))
            ) {
              ((o = 1),
                (pt = 80),
                Sn(3, 800),
                ($.globalAlpha = 0.4),
                ($.fillStyle = Xn[0]),
                Ge(),
                ($.globalAlpha = 1),
                Kn(v.x, v.y, 14, 70),
                f("#def").animate(
                  [
                    { transform: "none" },
                    { transform: "translateY(-22px) rotate(-6deg)", offset: 0.3 },
                    { transform: "translateY(-16px) rotate(4deg)", offset: 0.6 },
                    { transform: "none" },
                  ],
                  { duration: 600 / De, easing: "cubic-bezier(.3,.7,.3,1)" },
                ));
              for (let Se = 0; Se < 7; Se++) {
                const Ae = -Math.PI / 2 + (Math.random() - 0.5) * 2.4,
                  St = 2.5 + Math.random() * 2.5;
                l.push({
                  x: v.x,
                  y: v.y - 30,
                  vx: Math.cos(Ae) * St,
                  vy: Math.sin(Ae) * St - 1,
                  r: 3 + Math.random() * 4,
                  rot: Math.random() * 6,
                  va: (Math.random() - 0.5) * 0.3,
                  t: p,
                  seed: Se + 7,
                });
              }
            }
            (ke < 1 && ((v.x | 0) + ((p / 40) | 0)) % 2) ||
              c(v.x, v.y, v.h, v.w, v.lean, Math.min(1, Re(Math.min(1, I))));
          }
        }),
        p > 1050 && p < 1080 && s.forEach((v) => Hn(v.x, v.y - v.h * 0.5, 3, 1.2)),
        l.forEach((v) => {
          const M = (p - v.t) / 16;
          if (M > 60) return;
          const I = v.x + v.vx * M,
            ke = v.y + v.vy * M + 0.09 * M * M;
          ke > Ze + 10 || ls(I, ke, v.r, v.rot + v.va * M, v.seed);
        }),
        o)
      ) {
        const v = s[n - 1],
          M = p - (v.t0 + 90);
        if (M > 0 && M < 420) {
          const I = M > 260 ? 0.5 : 0;
          (V(v.x, v.y, 16 + M / 3, 4 + M / 20, Xn[1], 2, I),
            V(v.x, v.y, 10 + M / 4, 3 + M / 30, Xn[3], 2, I + 0.2));
        }
      }
      return p < 1550;
    };
  }
  const st = ["#f2d7a0", "#d9a85e", "#b07a38", "#7d5226", "#523418", "#2e1d0d"];
  function Zt(o, n, s) {
    (A(o, n, s + 1, st[5]),
      A(o, n, s, st[3]),
      A(o - s * 0.25, n - s * 0.25, s * 0.55, st[2]),
      Z(o - s * 0.4, n - s * 0.45, 1, st[1]));
  }
  function va(o, n, s, l) {
    for (let c = 0; c < s; c++) {
      const p = -Math.PI / 2 + (Math.random() - 0.5) * 2.8,
        y = l * (0.4 + Math.random() * 0.8);
      qe(o, n, {
        pal: [st[1], st[2], st[3], st[3], st[4], st[5]],
        round: 1,
        heat: Math.random() * 0.5,
        vx: Math.cos(p) * y,
        vy: Math.sin(p) * y,
        max: 400 + Math.random() * 250,
        size: 1.5 + Math.random() * 2,
        grav: 0.15,
        drag: 0.98,
      });
    }
  }
  function Da(o, n, s, l) {
    for (let c = 0; c < s; c++)
      qe(o + (Math.random() - 0.5) * l, n, {
        smoke: 1,
        spal: [st[0], st[1], st[2]],
        size: 3 + ((Math.random() * 3) | 0),
        max: 550 + Math.random() * 400,
        vx: (Math.random() - 0.5) * 1.2,
        vy: -0.25 - Math.random() * 0.45,
        grav: -0.005,
        drag: 0.96,
      });
  }
  function la(o, n) {
    const s = f("#def");
    (s.animate(
      [
        { filter: "none" },
        { filter: "sepia(1) saturate(2) brightness(.8)" },
        { filter: "none" },
        { filter: "sepia(1) saturate(2) brightness(.9)" },
        { filter: "none" },
      ],
      { duration: n / De, easing: "steps(4)" },
    ),
      s.animate(
        [
          { transform: "none" },
          { transform: `translateY(${-o * 4}px)` },
          { transform: `translateY(${o}px)` },
          { transform: "none" },
        ],
        { duration: 300 / De, easing: "steps(5)" },
      ));
    const l = f("#barDef");
    l.style.width = Math.max(8, parseFloat(l.style.width || 100) - [0, 12, 28, 55][o]) + "%";
  }
  function Xa(o, n, s, l, c, p, y) {
    let v = o * 1e4;
    const M = () => (v = (v * 9301 + 49297) % 233280) / 233280,
      I = 14;
    let ke = n,
      Se = s;
    for (let Ae = 1; Ae <= I * p; Ae++) {
      const St = Ae / I,
        Jt = _e(n, l, St) + (M() - 0.5) * 8,
        Oa = _e(s, c, St) + (M() - 0.5) * 4;
      if ((Ee(ke, Se, Jt, Oa, y + 1, st[1]), Ee(ke, Se, Jt, Oa, y, st[5]), M() < 0.35)) {
        const Qa = M() * 6.283;
        Ee(Jt, Oa, Jt + Math.cos(Qa) * 6, Oa + Math.sin(Qa) * 3, 1, st[5]);
      }
      ((ke = Jt), (Se = Oa));
    }
  }
  function nn() {
    let o = 0;
    Te();
    const n = [];
    for (let l = 0; l < 6; l++)
      n.push({
        d: 40 + l * 45,
        lift: 10 + Math.random() * 26,
        ox: (Math.random() - 0.5) * 20,
        oy: (Math.random() - 0.5) * 16,
        r: 2.5 + Math.random() * 2,
      });
    const s = [];
    return (l) => (
      n.forEach((c, p) => {
        const y = (l - c.d) / 280;
        if (y < 0) return;
        const v = { x: u.x + c.ox, y: u.y + c.oy };
        if (y < 1) {
          const M = dt(y, { x: P.x + 6, y: P.y }, v, c.lift);
          (Zt(M.x, M.y, c.r),
            Math.random() < 0.4 &&
              qe(M.x, M.y, {
                pal: [st[2], st[3], st[3], st[4], st[4], st[5]],
                heat: 0.3,
                max: 200,
                size: 1.5,
                round: 1,
                grav: 0.1,
              }));
        } else
          o <= p &&
            ((o = p + 1),
            va(v.x, v.y, 5, 1.6),
            s.push({ x: v.x, y: v.y, r: c.r + 1, t: l }),
            p === 0 && la(1, 500),
            (re = 1.5));
      }),
      s.forEach((c) => {
        const p = l - c.t;
        p > 500 ||
          (p > 350 && ((c.x | 0) + ((p / 40) | 0)) % 2) ||
          (A(c.x, c.y, c.r, st[3]),
          A(c.x, c.y + Math.min(6, p / 50), c.r * 0.5, st[3]),
          Z(c.x - 1, c.y - 1, 1, st[1]));
      }),
      l < 900
    );
  }
  function F() {
    let o = 0;
    const n = f("#atk"),
      s = Ot(1);
    Te();
    const l = (v, M, I) => {
        for (let Ae = 0; Ae < 5; Ae++) {
          const St = Math.max(0, Re(v) - Ae * 0.06);
          A(_e(M.x, I.x, St), _e(M.y, I.y, St), 6 - Ae, Ae ? st[3] : st[2]);
        }
        const ke = _e(M.x, I.x, Re(v)),
          Se = _e(M.y, I.y, Re(v));
        (Z(ke - 2, Se - 6, 2, st[1]), Math.random() < 0.6 && va(ke, Se - 4, 1, 1.2));
      },
      c = (v, M, I = 0) => {
        (V(v, M, 14, 4, st[4], 2, I), V(v, M, 10, 3, st[5], 2, I));
      },
      p = { x: P.x, y: P.y + 22 },
      y = { x: u.x, y: u.y + 30 };
    return (v) => {
      if (v < 210)
        (Math.random() < 0.7 && va(P.x, P.y + 20, 2, 2),
          v > 60 &&
            !o &&
            ((o = 1),
            n.animate(
              [
                { transform: "scaleX(-1)", clipPath: "inset(0 0 0 0)" },
                { transform: "scaleX(-1) translateY(60%)", clipPath: "inset(0 0 60% 0)" },
              ],
              { duration: 150 / De, fill: "forwards", easing: "steps(5)" },
            )),
          c(p.x, p.y));
      else if (v < 580)
        (o < 2 && ((o = 2), n.getAnimations().forEach((M) => M.cancel()), (n.style.opacity = 0)),
          l((v - 210) / 370, p, y),
          v % 60 < 17 && (re = Math.max(re, 1)));
      else if (v < 800)
        (o < 3 &&
          ((o = 3),
          (pt = 50),
          (re = 5),
          la(2, 700),
          va(y.x, y.y - 4, 22, 3.2),
          Da(y.x, y.y, 8, 40),
          (n.style.opacity = 1),
          n.animate(
            [
              { transform: `translate(${s.x}px,${s.y + 60}px) scaleX(-1)`, clipPath: "inset(0 0 60% 0)" },
              {
                transform: `translate(${s.x}px,${s.y - 10}px) scaleX(-1)`,
                clipPath: "inset(0 0 0 0)",
                offset: 0.3,
              },
              {
                transform: `translate(${s.x}px,${s.y - 10}px) scaleX(-1)`,
                clipPath: "inset(0 0 0 0)",
                offset: 0.55,
              },
              { transform: `translate(${s.x}px,${s.y + 60}px) scaleX(-1)`, clipPath: "inset(0 0 60% 0)" },
            ],
            { duration: 230 / De, fill: "forwards", easing: "steps(8)" },
          )),
          c(y.x, y.y));
      else if (v < 1140) {
        o < 4 &&
          ((o = 4),
          n.getAnimations().forEach((I) => I.cancel()),
          (n.style.opacity = 0),
          va(y.x, y.y - 4, 8, 1.8));
        const M = Math.min(1, (v - 800) / 240);
        (c(y.x, y.y, M * 0.8), l((v - 800) / 340, y, p));
      } else {
        o < 5 &&
          ((o = 5),
          (n.style.opacity = 1),
          va(p.x, p.y - 4, 12, 2.2),
          Da(p.x, p.y, 5, 30),
          n.animate(
            [
              { transform: "scaleX(-1) translateY(60%)", clipPath: "inset(0 0 60% 0)" },
              { transform: "scaleX(-1) translateY(-6%)", clipPath: "inset(0 0 0 0)", offset: 0.6 },
              { transform: "scaleX(-1)", clipPath: "inset(0 0 0 0)" },
            ],
            { duration: 220 / De, easing: "steps(6)" },
          ));
        const M = v - 1140;
        M < 300 && c(p.x, p.y, M > 150 ? 0.5 : 0);
      }
      return (v >= 1450 && (n.getAnimations().forEach((M) => M.cancel()), (n.style.opacity = "")), v < 1450);
    };
  }
  function Ce() {
    let o = 0,
      n = 0;
    Te();
    const s = [
      { s: 0.11, x0: P.x, y0: P.y + 24, x1: u.x, y1: u.y + 30 },
      { s: 0.37, x0: P.x + 10, y0: P.y + 26, x1: Je + 10, y1: Ze - 10 },
      { s: 0.73, x0: u.x - 30, y0: u.y + 30, x1: u.x + 60, y1: u.y + 14 },
    ];
    return (l) => {
      const c = f("#tint");
      c.style.opacity = l < 1250 ? Math.min(0.22, l / 500) : Math.max(0, 0.22 - (l - 1250) / 250);
      const p = f("#scene") || f("#arena");
      if (l > 150 && l < 1150) {
        const y = l < 300 ? ((l - 150) / 150) * 5 : l < 900 ? 5 : (5 * (1150 - l)) / 250;
        ((re = Math.max(re, y)),
          H(f("#def"), `translateY(${Math.round(Math.sin(l / 25) * y * 0.8)}px)`),
          H(f("#atk"), `scaleX(-1) translateY(${Math.round(Math.sin(l / 25 + 1) * y * 0.5)}px)`));
      } else (H(f("#def"), ""), H(f("#atk"), ""));
      if (l > 150) {
        const y = Math.min(1, (l - 150) / 450),
          v = l > 1150 ? Math.max(0, 1 - (l - 1150) / 300) : 1;
        (($.globalAlpha = v), s.forEach((M) => Xa(M.s, M.x0, M.y0, M.x1, M.y1, y, 2)), ($.globalAlpha = 1));
      }
      if (l > 250 && l < 1050 && l % 110 < 17) {
        const y = Math.random() * Je,
          v = Ze * 0.55 + Math.random() * Ze * 0.35;
        (va(y, v, 4, 2.4),
          Da(y, v, 2, 16),
          Math.random() < 0.6 &&
            qe(y, v, {
              pal: [st[1], st[2], st[3], st[3], st[4], st[5]],
              heat: 0.2,
              vx: (Math.random() - 0.5) * 2,
              vy: -3.5 - Math.random() * 1.5,
              max: 700,
              size: 4,
              grav: 0.16,
              drag: 0.99,
            }));
      }
      return (
        !o && l > 450 && ((o = 1), la(3, 900), (pt = 40)),
        l > 450 && l < 1100 && l % 220 < 17 && (n++, la(0, 300), Da(u.x, u.y + 28, 4, 40)),
        l < 1500
      );
    };
  }
  const Xe = ["#ffffff", "#fff0fa", "#ffc4ec", "#ff8fd6", "#d86bc4", "#9a4aa8"],
    Ve = ["#ffffff", "#fff8e0", "#ffe9a8", "#f5c8ff"];
  function Rt(o, n, s, l) {
    ((o = Math.round(o)), (n = Math.round(n)), ($.fillStyle = l));
    for (let c = -s; c <= s; c++) {
      const p = s - Math.abs(c) > s * 0.6 ? 1 : 0;
      ($.fillRect(o + c, n - p, 1, 1 + p * 2), $.fillRect(o - p, n + c, 1 + p * 2, 1));
    }
    (($.fillStyle = Xe[0]), $.fillRect(o, n, 1, 1));
  }
  function da(o, n, s) {
    const l = [".##.##.", "#######", "#######", ".#####.", "..###..", "...#..."];
    ((o = Math.round(o - 3)),
      (n = Math.round(n - 3)),
      ($.fillStyle = s),
      l.forEach((c, p) => {
        for (let y = 0; y < 7; y++) c[y] === "#" && $.fillRect(o + y, n + p, 1, 1);
      }),
      ($.fillStyle = Xe[0]),
      $.fillRect(o + 1, n + 1, 1, 1));
  }
  function ia(o, n) {
    const s = f("#def");
    (s.animate(
      [
        { filter: "none" },
        { filter: "brightness(2.2) sepia(1) hue-rotate(270deg) saturate(2.5)" },
        { filter: "none" },
        { filter: "brightness(1.8) sepia(1) hue-rotate(270deg) saturate(2)" },
        { filter: "none" },
      ],
      { duration: n / De, easing: "steps(5)" },
    ),
      s.animate(
        [
          { transform: "none" },
          { transform: `translateX(${o * 3}px)` },
          { transform: `translateX(${-o * 2}px)` },
          { transform: "none" },
        ],
        { duration: 260 / De, easing: "steps(4)" },
      ));
    const l = f("#barDef");
    l.style.width = Math.max(8, parseFloat(l.style.width || 100) - [0, 12, 28, 55][o]) + "%";
  }
  let Ja = [];
  function Ia(o) {
    Ja = Ja.filter((n) => {
      if (((n.life += o), n.life > n.max)) return !1;
      const s = n.life / n.max;
      ((n.x += (n.vx * o) / 16), (n.y += (n.vy * o) / 16));
      const l = Math.round(Math.sin(s * Math.PI) * n.s);
      return (l < 1 || (n.h ? da(n.x, n.y, n.c) : Rt(n.x, n.y, l, n.c)), !0);
    });
  }
  function ka(o, n, s = {}) {
    Ja.push({
      x: o,
      y: n,
      vx: s.vx || 0,
      vy: s.vy ?? -0.2,
      s: s.s || 3,
      life: 0,
      max: s.max || 400 + Math.random() * 300,
      c: s.c || Xe[2 + ((Math.random() * 2) | 0)],
      h: s.h,
    });
  }
  function Za() {
    let o = 0,
      n = 0,
      s = 0;
    Te();
    const l = Math.atan2(u.y - P.y, u.x - P.x),
      c = Math.hypot(u.x - P.x, u.y - P.y);
    return (p) => {
      const y = p - s;
      if (((s = p), p > 100 && p < 650)) {
        for (n += (y / 16) * 1.3; n >= 1;) {
          n--;
          const v = 2.6 + Math.random(),
            M = (Math.random() - 0.5) * 0.4,
            I = Math.random() < 0.18;
          ka(P.x, P.y - 6, {
            vx: Math.cos(l + M) * v,
            vy: Math.sin(l + M) * v,
            s: I ? 0 : 2 + ((Math.random() * 2) | 0),
            h: I,
            max: (c / v) * 16 * (0.9 + Math.random() * 0.2),
          });
        }
        for (let v = 0; v < 3; v++) {
          const M = ((p - 100) / 320 + v / 3) % 1,
            I = _e(P.x, u.x, M),
            ke = _e(P.y - 6, u.y, M) + Math.sin(M * 9 + v) * 8;
          (($.globalAlpha = Math.sin(M * Math.PI) * 0.8),
            Y(I, ke, 8, 5, -2.4 + p / 120, -0.6 + p / 120, Xe[2], 2),
            ($.globalAlpha = 1));
        }
      }
      if (!o && p > 480) {
        ((o = 1), ia(1, 600));
        for (let v = 0; v < 6; v++)
          ka(u.x + (Math.random() - 0.5) * 30, u.y + (Math.random() - 0.5) * 24, { s: 3, c: Xe[0] });
      }
      return p < 1050;
    };
  }
  function En() {
    let o = 0;
    return (
      Te(),
      (n) => {
        if (n < 300) {
          const s = n / 300;
          for (let l = 0; l < 8; l++) {
            const c = (l / 8) * 6.283 + n / 200,
              p = 8 + s * 18;
            (($.globalAlpha = s),
              Ee(P.x, P.y - 6, P.x + Math.cos(c) * p, P.y - 6 + Math.sin(c) * p, 1, l % 2 ? Xe[2] : Xe[0]),
              ($.globalAlpha = 1));
          }
          Rt(P.x, P.y - 6, (2 + s * 4) | 0, Xe[0]);
        } else if (n < 760) {
          const s = (n - 300) / 460,
            l = Re(s) * 300;
          for (const [c, p] of [
            [0, Xe[0]],
            [-5, Xe[2]],
            [-10, Xe[3]],
            [-15, "#c9b8ff"],
          ])
            (($.globalAlpha = Math.max(0, 1 - s) * 0.9),
              J(P.x, P.y - 6, Math.max(1, l + c), 3, p),
              ($.globalAlpha = 1));
          if (
            (Math.random() < 0.6 &&
              ka(
                P.x + Math.cos(Math.random() * 6.283) * l,
                P.y - 6 + Math.sin(Math.random() * 6.283) * l * 0.6,
                { s: 2, c: Xe[0], max: 300 },
              ),
            !o && l > Math.hypot(u.x - P.x, u.y - P.y))
          ) {
            ((o = 1), ia(2, 700), (re = 3), (pt = 35));
            for (let c = 0; c < 5; c++)
              ka(u.x + (Math.random() - 0.5) * 36, u.y + (Math.random() - 0.5) * 30, {
                s: 5,
                c: Xe[0],
                max: 500,
              });
          }
        }
        return n < 1050;
      }
    );
  }
  function bn() {
    let o = 0;
    Te();
    const n = { x: Je * 0.5, y: 30 };
    return (s) => {
      const l = f("#tint");
      if (
        ((l.style.opacity = s < 1350 ? Math.min(0.5, s / 400) : Math.max(0, 0.5 - (s - 1350) / 300)),
        s < 1100)
      ) {
        const c = Math.min(1, s / 350),
          p = 14 * c;
        (($.globalAlpha = c),
          A(n.x, n.y, p + 3, "#f5c8ff"),
          A(n.x, n.y, p + 1, Ve[2]),
          A(n.x, n.y, p, Ve[1]),
          A(n.x + p * 0.3, n.y - p * 0.2, p * 0.3, Ve[2]),
          A(n.x - p * 0.35, n.y + p * 0.3, p * 0.2, Ve[2]),
          ($.globalAlpha = 1),
          s < 700 &&
            s % 90 < 17 &&
            ka(Math.random() * Je, Math.random() * Ze * 0.5, { s: 2, c: Xe[0], max: 600, vy: 0 }));
      }
      if (s > 350 && s < 750) {
        const c = (s - 350) / 400;
        for (let p = 0; p < 2; p++) {
          const y = Math.random() * 6.283,
            v = 50 * (1 - c) + 16;
          qe(n.x + Math.cos(y) * v, n.y + Math.sin(y) * v * 0.6, {
            pal: [Xe[0], Xe[1], Xe[2], Xe[3], Xe[4], Xe[5]],
            vx: -Math.cos(y) * 1.4,
            vy: -Math.sin(y),
            heat: 0.1,
            max: 200,
            size: 2,
            grav: 0,
          });
        }
      }
      if (s >= 750 && s < 1e3) {
        const c = (s - 750) / 250,
          p = c * c,
          y = _e(n.x, u.x, p),
          v = _e(n.y, u.y, p);
        for (let M = 1; M <= 4; M++) {
          const I = Math.max(0, p - M * 0.06);
          (($.globalAlpha = 0.5 - M * 0.1),
            A(_e(n.x, u.x, I), _e(n.y, u.y, I), 9 - M, Xe[3]),
            ($.globalAlpha = 1));
        }
        (A(y, v, 11, Xe[3]), A(y, v, 9, Xe[2]), A(y, v, 6, Ve[1]), A(y, v, 3, Ve[0]));
      } else if (s >= 1e3) {
        const c = s - 1e3;
        if (!o) {
          ((o = 1),
            (pt = 60),
            (re = 6),
            ia(3, 900),
            ($.globalAlpha = 0.5),
            ($.fillStyle = Xe[1]),
            Ge(),
            ($.globalAlpha = 1));
          for (let p = 0; p < 14; p++) {
            const y = Math.random() * 6.283,
              v = 1 + Math.random() * 2.2;
            ka(u.x, u.y, {
              vx: Math.cos(y) * v,
              vy: Math.sin(y) * v,
              s: 3 + ((Math.random() * 3) | 0),
              c: p % 3 ? Xe[2] : Xe[0],
              max: 600,
              h: p % 5 === 0,
            });
          }
        }
        if (c < 400) {
          const p = c > 220 ? 0.5 : 0;
          (J(u.x, u.y, 8 + c / 4, 3, c < 150 ? Xe[0] : Xe[3]),
            V(u.x, u.y, 10 + c / 3, (10 + c / 3) * 0.4, Xe[2], 2, p + 0.2),
            c < 120 && Rt(u.x, u.y, (12 - c / 12) | 0, Xe[0]));
        }
      }
      return s < 1700;
    };
  }
  const an = ["#ffffff", "#fff3c4", "#ffd36a", "#ff9b3a", "#2a2230"];
  function Wn(o, n, s, l = 8, c = 0, p = an[0], y = an[4]) {
    const v = [];
    for (let I = 0; I < l * 2; I++) {
      const ke = c + (I / (l * 2)) * 6.283,
        Se = I % 2 ? s * 0.45 : s;
      v.push([o + Math.cos(ke) * Se, n + Math.sin(ke) * Se]);
    }
    for (let I = 0; I < v.length; I++) {
      const ke = v[I],
        Se = v[(I + 1) % v.length];
      Yn(o, n, ke[0], ke[1], Se[0], Se[1], y);
    }
    const M = v.map(([I, ke]) => [o + (I - o) * 0.78, n + (ke - n) * 0.78]);
    for (let I = 0; I < M.length; I++) {
      const ke = M[I],
        Se = M[(I + 1) % M.length];
      Yn(o, n, ke[0], ke[1], Se[0], Se[1], p);
    }
  }
  function wn(o, n) {
    const s = f("#def");
    (s.animate(
      [
        { filter: "none" },
        { filter: "brightness(3) saturate(0)" },
        { filter: "none" },
        { filter: "brightness(2.5) saturate(0)" },
        { filter: "none" },
      ],
      { duration: n / De, easing: "steps(4)" },
    ),
      s.animate(
        [
          { transform: "none" },
          { transform: `translateX(${o * 5}px)` },
          { transform: `translateX(${-o * 2}px)` },
          { transform: "none" },
        ],
        { duration: 280 / De, easing: "steps(5)" },
      ));
    const l = f("#barDef");
    l.style.width = Math.max(8, parseFloat(l.style.width || 100) - [0, 12, 28, 55][o]) + "%";
  }
  function Bn(o, n, s, l = 3) {
    for (let c = 0; c < l; c++) {
      const p = s / 120 + (c * 6.283) / l;
      Rt(o + Math.cos(p) * 12, n + Math.sin(p) * 4, 2, c % 2 ? an[2] : an[0]);
    }
  }
  function C() {
    let o = 0;
    const n = f("#atk"),
      s = Ot(0.82);
    return (l) => (
      o ||
        ((o = 1),
        n.animate(
          [
            { transform: "scaleX(-1)" },
            { transform: "scaleX(-1) translateX(14px)", offset: 0.25 },
            { transform: `translate(${s.x}px,${s.y * 0.6}px) scaleX(-1)`, offset: 0.45 },
            { transform: `translate(${s.x}px,${s.y * 0.6}px) scaleX(-1)`, offset: 0.6 },
            { transform: "scaleX(-1)" },
          ],
          { duration: 760 / De, easing: "steps(12)" },
        )),
      l >= 340 && o < 2 && ((o = 2), (pt = 40), (re = 3), wn(1, 400)),
      l < 850
    );
  }
  function g() {
    let o = 0;
    const n = f("#atk"),
      s = Ot(0.82);
    return (l) => {
      if (
        (o ||
          ((o = 1),
          n.animate(
            [
              { transform: "scaleX(-1)", opacity: 1 },
              { transform: "scaleX(-1)", opacity: 0, offset: 0.12 },
              { transform: `translate(${s.x}px,${s.y * 0.6}px) scaleX(-1)`, opacity: 0, offset: 0.2 },
              { transform: `translate(${s.x}px,${s.y * 0.6}px) scaleX(-1)`, opacity: 1, offset: 0.24 },
              { transform: `translate(${s.x}px,${s.y * 0.6}px) scaleX(-1)`, opacity: 1, offset: 0.45 },
              { transform: "scaleX(-1)", opacity: 1 },
            ],
            { duration: 650 / De, easing: "steps(12)" },
          )),
        l > 60 && l < 160)
      ) {
        const c = (l - 60) / 100;
        for (let p = 0; p < 4; p++) {
          const y = _e(P.y - 12, u.y - 8, c) + p * 6 - 9,
            v = _e(P.x, u.x, Math.max(0, c - 0.5)),
            M = _e(P.x, u.x, c);
          (($.globalAlpha = 0.9 - p * 0.15),
            ($.fillStyle = an[0]),
            $.fillRect(Math.round(v), Math.round(y), Math.round(M - v), p % 2 ? 1 : 2),
            ($.globalAlpha = 1));
        }
      }
      return (
        l >= 160 &&
          o < 2 &&
          ((o = 2),
          (re = 2),
          wn(1, 250),
          ($.globalAlpha = 0.45),
          ($.fillStyle = an[0]),
          Ge(),
          ($.globalAlpha = 1)),
        l < 650
      );
    };
  }
  function E() {
    let o = 0,
      n = 0;
    Te();
    const s = { x: P.x + 4, y: P.y - 10 },
      l = u.x - s.x,
      c = u.y - s.y,
      p = Math.hypot(l, c),
      y = l / p,
      v = c / p;
    return (M) => {
      const I = f("#tint");
      if (
        ((I.style.opacity = M < 1500 ? Math.min(0.45, M / 500) : Math.max(0, 0.45 - (M - 1500) / 250)),
        M < 600)
      ) {
        const ke = M / 600;
        for (let Se = 0; Se < 3; Se++) {
          const Ae = Math.random() * 6.283,
            St = 60 * (1 - ke) + 10;
          Ee(
            s.x + Math.cos(Ae) * St,
            s.y + Math.sin(Ae) * St,
            s.x + Math.cos(Ae) * (St - 8),
            s.y + Math.sin(Ae) * (St - 8),
            1,
            Se ? an[2] : an[0],
          );
        }
        (A(s.x, s.y, 3 + ke * 7, an[3]),
          A(s.x, s.y, 2 + ke * 5, an[2]),
          A(s.x, s.y, 1 + ke * 3, an[0]),
          M % 150 < 17 && J(s.x, s.y, 24 - (M % 150) / 8, 1, an[1]),
          ke > 0.85 && (re = Math.max(re, 1.5)));
      } else if (M < 1250) {
        const ke = Math.min(1, (M - 600) / 70),
          Se = p * ke + 40,
          Ae = M > 1150 ? (1250 - M) / 100 : 1,
          St = 1 + Math.sin(M / 25) * 0.1;
        for (const [Jt, Oa] of [
          [14, an[3]],
          [11, an[2]],
          [8, an[1]],
          [5, an[0]],
        ])
          for (let Qa = 0; Qa < Se; Qa += 2)
            A(s.x + y * Qa, s.y + v * Qa, Jt * Ae * St * Math.min(1, 0.5 + Qa / 60), Oa);
        if ((A(s.x, s.y, 16 * Ae, an[1]), A(s.x, s.y, 10 * Ae, an[0]), ke >= 1)) {
          (o ||
            ((o = 1),
            (pt = 70),
            (re = 7),
            wn(3, 900),
            ($.globalAlpha = 0.55),
            ($.fillStyle = an[0]),
            Ge(),
            ($.globalAlpha = 1)),
            (re = Math.max(re, 3)),
            A(u.x, u.y, 14 + Math.random() * 4, an[2]),
            A(u.x, u.y, 9, an[0]),
            M % 60 < 17 && J(u.x, u.y, 18 + Math.random() * 10, 2, an[3]));
          for (let Jt = 0; Jt < 2; Jt++) {
            const Oa = Math.random() * 6.283;
            qe(u.x, u.y, {
              pal: [an[0], an[1], an[2], an[3], an[3], "#7a5a3a"],
              vx: Math.cos(Oa) * 3,
              vy: Math.sin(Oa) * 3,
              heat: 0.2,
              max: 350,
              size: 2 + ((Math.random() * 2) | 0),
              grav: 0.04,
              drag: 0.93,
            });
          }
        }
      } else if (M < 1300)
        for (let ke = 0; ke < 14; ke++)
          qe(u.x + (Math.random() - 0.5) * 40, u.y + 10, {
            smoke: 1,
            spal: ["#cfc6b8", "#9c9486", "#6a6458"],
            size: 4 + ((Math.random() * 3) | 0),
            max: 800,
            vx: (Math.random() - 0.5) * 1.2,
            vy: -0.4 - Math.random() * 0.4,
            grav: -0.01,
          });
      if (
        (M > 1300 &&
          !n &&
          ((n = 1),
          f("#atk").animate(
            [
              { transform: "scaleX(-1)" },
              { transform: "scaleX(-1) translateY(4px) scaleY(.94)" },
              { transform: "scaleX(-1) translateY(4px) scaleY(.94)" },
              { transform: "scaleX(-1)" },
            ],
            { duration: 550 / De, easing: "steps(4)" },
          )),
        M > 1300 && M < 1850)
      ) {
        const ke = M - 1300;
        for (let Se = 0; Se < 2; Se++) {
          const Ae = P.y - 34 - ((ke / 8 + Se * 14) % 28);
          (($.globalAlpha = 1 - ((ke / 8 + Se * 14) % 28) / 28),
            ($.fillStyle = an[0]),
            $.fillRect(Math.round(P.x + 10 + Se * 6), Math.round(Ae), 2, 2),
            $.fillRect(Math.round(P.x + 12 + Se * 6), Math.round(Ae - 2), 2, 2),
            ($.globalAlpha = 1));
        }
      }
      return M < 1900;
    };
  }
  const q = ["#ffffff", "#ffe4c2", "#ffb15a", "#f2602a", "#b8281a", "#4a0e08"];
  function Pe(o, n) {
    const s = f("#def");
    (s.animate(
      [
        { filter: "none" },
        { filter: "brightness(3) saturate(0)" },
        { filter: "none" },
        { filter: "brightness(1.6) sepia(1) hue-rotate(-30deg) saturate(3)" },
        { filter: "none" },
      ],
      { duration: n / De, easing: "steps(4)" },
    ),
      s.animate(
        [
          { transform: "none" },
          { transform: `translateX(${o * 5}px)` },
          { transform: `translateX(${-o * 2}px)` },
          { transform: "none" },
        ],
        { duration: 240 / De, easing: "steps(4)" },
      ));
    const l = f("#barDef");
    l.style.width = Math.max(8, parseFloat(l.style.width || 100) - [0, 12, 28, 55][o]) + "%";
  }
  function at(o, n, s, l, c, p = q[0]) {
    for (let y = 0; y < l; y++) {
      const v = c + (y / l) * 6.283;
      (Ee(
        o + Math.cos(v) * s * 0.45,
        n + Math.sin(v) * s * 0.45,
        o + Math.cos(v) * s,
        n + Math.sin(v) * s,
        2,
        q[4],
      ),
        Ee(
          o + Math.cos(v) * s * 0.5,
          n + Math.sin(v) * s * 0.5,
          o + Math.cos(v) * s * 0.95,
          n + Math.sin(v) * s * 0.95,
          1,
          p,
        ));
    }
  }
  function Mt(o, n, s) {
    (A(o, n, s + 1, q[5]),
      A(o, n, s, q[3]),
      A(o - s * 0.25, n - s * 0.25, s * 0.55, q[2]),
      Z(o - s * 0.4, n - s * 0.45, 1, q[1]));
  }
  function Pa() {
    let o = 0,
      n = 0;
    const s = f("#atk"),
      l = Ot(0.8);
    return (c) => {
      n ||
        ((n = 1),
        s.animate(
          [
            { transform: "scaleX(-1)" },
            { transform: `translate(${l.x}px,${l.y * 0.6}px) scaleX(-1)`, offset: 0.3 },
            { transform: `translate(${l.x}px,${l.y * 0.6}px) scaleX(-1)`, offset: 0.55 },
            { transform: "scaleX(-1)" },
          ],
          { duration: 620 / De, easing: "steps(10)" },
        ));
      const p = c - 190;
      if (p >= 0 && p < 260) {
        const y = Math.min(1, p / 50),
          v = Math.max(0, (p - 90) / 170);
        $.globalAlpha = 1 - v;
        for (const [M, I] of [
          [5, q[4]],
          [3, q[2]],
          [1, q[0]],
        ])
          for (let ke = -20 + 40 * v; ke < -20 + 40 * y; ke += 0.7) {
            const Se = Math.sin(((ke + 20) / 40) * Math.PI) * M;
            (($.fillStyle = I),
              $.fillRect(
                Math.round(u.x + ke * 0.35 - Se / 2),
                Math.round(u.y + ke),
                Math.max(1, Math.round(Se)),
                1,
              ));
          }
        (($.globalAlpha = 1),
          o || ((o = 1), (pt = 30), (re = 2), Pe(1, 350)),
          p < 90 && at(u.x, u.y, 22, 8, 0));
      }
      return c < 700;
    };
  }
  function Ta() {
    let o = 0,
      n = 0;
    const s = f("#atk"),
      l = Ot(0.8);
    return (c) => {
      n ||
        ((n = 1),
        s.animate(
          [
            { transform: "scaleX(-1)" },
            { transform: `translate(${l.x}px,${l.y * 0.6}px) scaleX(-1)`, offset: 0.15 },
            { transform: `translate(${l.x}px,${l.y * 0.6}px) scaleX(-1)`, offset: 0.75 },
            { transform: "scaleX(-1)" },
          ],
          { duration: 860 / De, easing: "steps(14)" },
        ));
      for (let p = 0; p < 5; p++) {
        const y = 160 + p * 95,
          v = c - y;
        if (v < 0 || v > 110) continue;
        const M = (Math.random() < 0.5 ? -1 : 1) * (p % 3) * 6,
          I = (p % 2 ? -1 : 1) * 8,
          ke = u.x - 14 + M,
          Se = u.y + I,
          Ae = Math.min(1, v / 35);
        for (let St = 0; St < 4; St++)
          (($.globalAlpha = 0.5 - St * 0.1), Mt(ke - 28 * (1 - Ae) - St * 6, Se, 4), ($.globalAlpha = 1));
        (Mt(ke - 28 * (1 - Ae), Se, 5),
          Ae >= 1 &&
            (at(ke + 4, Se, 14, 6, p),
            o <= p && ((o = p + 1), (re = 1.6), (pt = 12), Pe(p === 4 ? 2 : 0, 180))));
      }
      return c < 900;
    };
  }
  function La() {
    let o = 0,
      n = 0;
    const s = f("#atk"),
      l = Ot(0.8);
    return (
      Te(),
      (c) => {
        const p = f("#tint");
        p.style.opacity = c < 1300 ? Math.min(0.4, c / 400) : Math.max(0, 0.4 - (c - 1300) / 250);
        const y = { x: P.x + 14, y: P.y - 6 };
        if (c < 520) {
          const v = c / 520;
          for (let M = 0; M < 3; M++) {
            const I = Math.random() * 6.283,
              ke = 40 * (1 - v) + 8;
            Ee(
              y.x + Math.cos(I) * ke,
              y.y + Math.sin(I) * ke,
              y.x + Math.cos(I) * (ke - 6),
              y.y + Math.sin(I) * (ke - 6),
              1,
              M ? q[2] : q[0],
            );
          }
          Mt(y.x, y.y, 3 + v * 4);
          for (let M = 0; M < 6; M++) {
            const I = c / 80 + M * 1.05;
            Z(y.x + Math.cos(I) * (10 + v * 4), y.y + Math.sin(I) * (10 + v * 4), 2, M % 2 ? q[3] : q[1]);
          }
          v > 0.8 && (re = Math.max(re, 1.2));
        }
        if (
          (c >= 520 &&
            !n &&
            ((n = 1),
            s.animate(
              [
                { transform: "scaleX(-1)" },
                { transform: `translate(${l.x}px,${l.y * 0.6}px) scaleX(-1)`, offset: 0.12 },
                { transform: `translate(${l.x}px,${l.y * 0.6}px) scaleX(-1)`, offset: 0.6 },
                { transform: "scaleX(-1)" },
              ],
              { duration: 900 / De, easing: "steps(12)" },
            )),
          c >= 520 && c < 640)
        ) {
          const v = (c - 520) / 120,
            M = _e(y.x, u.x - 10, Re(v)),
            I = _e(y.y, u.y, Re(v));
          for (let ke = 1; ke <= 4; ke++)
            (($.globalAlpha = 0.5 - ke * 0.1),
              Mt(
                _e(y.x, u.x - 10, Math.max(0, Re(v) - ke * 0.08)),
                _e(y.y, u.y, Math.max(0, Re(v) - ke * 0.08)),
                7,
              ),
              ($.globalAlpha = 1));
          Mt(M, I, 8);
        }
        if (c >= 640) {
          const v = c - 640;
          if (!o) {
            ((o = 1),
              (pt = 70),
              (re = 7),
              Pe(3, 800),
              ($.globalAlpha = 0.5),
              ($.fillStyle = q[1]),
              Ge(),
              ($.globalAlpha = 1));
            for (let M = 0; M < 18; M++) {
              const I = Math.random() * 6.283,
                ke = 1.5 + Math.random() * 2.5;
              qe(u.x, u.y, {
                pal: [q[0], q[1], q[2], q[3], q[4], q[5]],
                vx: Math.cos(I) * ke,
                vy: Math.sin(I) * ke,
                heat: Math.random() * 0.4,
                max: 380,
                size: 2 + ((Math.random() * 2) | 0),
                grav: 0.05,
                drag: 0.92,
              });
            }
          }
          if ((v < 160 && (Mt(u.x - 10, u.y, 8), at(u.x, u.y, 30 + v / 6, 10, v / 200)), v < 420)) {
            const M = v > 260 ? 0.5 : 0;
            (J(u.x, u.y, 10 + v / 4, 3, v < 150 ? q[0] : q[3]),
              V(u.x, u.y + 26, 14 + v / 5, 4 + v / 30, q[2], 2, M + 0.2));
          }
          v > 300 && v < 900 && Bn(u.x, u.y - 30, c);
        }
        return c < 1600;
      }
    );
  }
  const xa = ["#ffffff", "#f4ffb0", "#c8f03a", "#8cc21e", "#4f7d12", "#22380a"];
  function en(o, n) {
    const s = f("#def");
    (s.animate(
      [
        { filter: "none" },
        { filter: "brightness(2) sepia(1) hue-rotate(40deg) saturate(3)" },
        { filter: "none" },
        { filter: "brightness(1.6) sepia(1) hue-rotate(40deg) saturate(2)" },
        { filter: "none" },
      ],
      { duration: n / De, easing: "steps(5)" },
    ),
      s.animate(
        [
          { transform: "none" },
          { transform: `translateX(${o * 4}px)` },
          { transform: `translateX(${-o * 2}px)` },
          { transform: "none" },
        ],
        { duration: 240 / De, easing: "steps(4)" },
      ));
    const l = f("#barDef");
    l.style.width = Math.max(8, parseFloat(l.style.width || 100) - [0, 12, 28, 55][o]) + "%";
  }
  function rn(o, n, s, l, c, p) {
    for (let y = 0; y < c; y++)
      (($.fillStyle = y < 2 ? xa[0] : y < c * 0.4 ? p : xa[4]),
        $.fillRect(
          Math.round(o - s * y - 1),
          Math.round(n - l * y - 1),
          y < c * 0.5 ? 3 : 2,
          y < c * 0.5 ? 3 : 2,
        ));
  }
  function hn(o, n, s, l) {
    for (let c = 0; c < s; c++) {
      const p = Math.random() * 6.283,
        y = l * (0.5 + Math.random());
      qe(o, n, {
        pal: [xa[1], xa[2], xa[3], xa[3], xa[4], xa[5]],
        heat: Math.random() * 0.5,
        vx: Math.cos(p) * y,
        vy: Math.sin(p) * y,
        max: 320 + Math.random() * 200,
        size: 2,
        grav: 0.08,
        drag: 0.93,
      });
    }
  }
  function Fn() {
    let o = 0;
    Te();
    const n = [];
    for (let s = 0; s < 5; s++)
      n.push({ t0: 80 + s * 70, ox: (Math.random() - 0.5) * 26, oy: (Math.random() - 0.5) * 22 });
    return (s) => (
      n.forEach((l, c) => {
        const p = (s - l.t0) / 170,
          y = u.x + l.ox,
          v = u.y + l.oy,
          M = y - P.x,
          I = v - P.y,
          ke = Math.hypot(M, I),
          Se = M / ke,
          Ae = I / ke;
        if (!(p < 0)) {
          if (p < 1) rn(_e(P.x, y, p), _e(P.y, v, p), Se, Ae, 18, xa[2]);
          else if (s - l.t0 - 170 < 380) {
            const St = s - l.t0 - 170;
            if (St > 250 && ((y | 0) + ((St / 40) | 0)) % 2) return;
            (rn(y + Se * 3, v + Ae * 3, Se, Ae, 10, xa[3]),
              o <= c &&
                ((o = c + 1), hn(y, v, 4, 1.4), (re = 1.2), (c === 0 || c === 4) && en(c ? 1 : 0, 250)));
          }
        }
      }),
      s < 950
    );
  }
  function Ln() {
    let o = 0,
      n = 0;
    const s = f("#atk"),
      l = Ot(0.82);
    return (
      Te(),
      (c) => {
        if (
          (n ||
            ((n = 1),
            s.animate(
              [
                { transform: "scaleX(-1)" },
                { transform: `translate(${l.x}px,${l.y * 0.6}px) scaleX(-1)`, offset: 0.25 },
                { transform: `translate(${l.x}px,${l.y * 0.6}px) scaleX(-1)`, offset: 0.6 },
                { transform: "scaleX(-1)" },
              ],
              { duration: 820 / De, easing: "steps(10)" },
            )),
          [
            [200, -0.8],
            [290, 0.8],
          ].forEach(([p, y], v) => {
            const M = c - p;
            if (M < 0 || M > 380) return;
            const I = Math.min(1, M / 60),
              ke = Math.max(0, (M - 140) / 240),
              Se = ke * ke * (3 - 2 * ke),
              Ae = y + Math.PI / 2,
              St = Math.cos(Ae),
              Jt = Math.sin(Ae),
              Oa = 56;
            $.globalAlpha = 1 - Se;
            for (const [Qa, un] of [
              [6, xa[5]],
              [4, xa[3]],
              [2.4, xa[2]],
              [1, xa[0]],
            ])
              for (let $n = -Oa / 2 + Oa * Se * 0.9; $n < -Oa / 2 + Oa * I; $n += 0.7) {
                const fs = Math.round(Math.sin((($n + Oa / 2) / Oa) * Math.PI) * Qa * (1 - Se * 0.5));
                (fs < 1 && Qa > 1) ||
                  (($.fillStyle = un),
                  $.fillRect(
                    Math.round(u.x + St * $n - fs / 2),
                    Math.round(u.y + Jt * $n),
                    Math.max(1, fs),
                    1,
                  ));
              }
            (($.globalAlpha = 1),
              M > 40 &&
                !(o & (1 << v)) &&
                ((o |= 1 << v), (pt = 30), (re = 2.5), en(v ? 2 : 0, 400), hn(u.x, u.y, 8, 2)));
          }),
          c > 330 && c < 480)
        ) {
          const p = c - 330;
          (A(u.x, u.y, 8 - p / 20, xa[1]), J(u.x, u.y, 6 + p / 5, 2, xa[2]));
        }
        return c < 900;
      }
    );
  }
  function Pn(o, n, s, l, c, p = 0) {
    const y = Math.cos(p),
      v = Math.sin(p),
      M = (I, ke) => [o + y * I - v * ke, n + v * I + y * ke];
    for (const [I, ke] of [
      [1.25, xa[5]],
      [1, xa[3]],
      [0.7, xa[2]],
      [0.35, xa[1]],
    ]) {
      const Se = M(0, (-l * I) / 2),
        Ae = M(0, (l * I) / 2),
        St = M(s * (I > 1 ? 1.06 : I < 0.5 ? 0.8 : 1), 0);
      Yn(Se[0], Se[1], Ae[0], Ae[1], St[0], St[1], ke);
    }
    $.fillStyle = xa[0];
    for (let I = 0; I < s * 0.7; I++) {
      const ke = M(I, -l * 0.18 * (1 - I / s));
      $.fillRect(Math.round(ke[0]), Math.round(ke[1]), 1, 1);
    }
    if (c) {
      const I = M(s * 0.6, 0);
      (($.globalAlpha = 0.35), A(I[0], I[1], l * 0.9, xa[2]), ($.globalAlpha = 1));
    }
  }
  function jn() {
    const o = f("#atk").getBoundingClientRect(),
      n = x.getBoundingClientRect(),
      s = Je / n.width;
    return { x: (o.right - n.left) * s - 6, y: (o.top - n.top + o.height * 0.38) * s };
  }
  function h() {
    let o = 0,
      n = 0;
    const s = f("#atk"),
      l = Ot(0.78);
    return (c) => {
      const p = f("#tint");
      if (
        ((p.style.opacity = c < 1200 ? Math.min(0.4, c / 450) : Math.max(0, 0.4 - (c - 1200) / 250)), c < 520)
      ) {
        c % 130 < 17 &&
          (s.animate(
            [
              { transform: "scaleX(-1)" },
              { transform: "scaleX(-1) translateX(-6px) scale(1.08,.92)" },
              { transform: "scaleX(-1)" },
            ],
            { duration: 130 / De },
          ),
          hn(P.x - 8, P.y + 22, 3, 1.3),
          Da(P.x - 8, P.y + 22, 1, 10));
        const y = jn(),
          v = Re(Math.min(1, c / 480));
        (Pn(y.x, y.y, 6 + v * 30, 4 + v * 12, v > 0.6, Math.atan2(u.y - y.y, u.x - y.x)),
          v > 0.7 &&
            ((re = Math.max(re, 1.2)),
            Math.random() < 0.5 &&
              qe(y.x + 30 * v, y.y, {
                pal: xa,
                heat: 0.2,
                vx: -1.5,
                vy: Math.random() - 0.5,
                max: 200,
                size: 2,
                grav: 0,
              })));
      }
      if (
        (c >= 520 &&
          !o &&
          ((o = 1),
          s.animate(
            [
              { transform: "scaleX(-1)" },
              { transform: `translate(${l.x}px,${l.y * 0.6}px) scaleX(-1) scale(1.12,.9)`, offset: 0.16 },
              { transform: `translate(${l.x}px,${l.y * 0.6}px) scaleX(-1)`, offset: 0.55 },
              { transform: "scaleX(-1)" },
            ],
            { duration: 1e3 / De, easing: "cubic-bezier(.3,.7,.3,1)" },
          )),
        c >= 520 && c < 680)
      ) {
        const y = jn(),
          v = Math.min(y.x, u.x - 36),
          M = y.y;
        (Math.random() < 0.6 &&
          qe(v, M, {
            pal: xa,
            heat: 0.3,
            vx: -1 - Math.random(),
            vy: Math.random() - 0.5,
            max: 220,
            size: 2,
            grav: 0,
            drag: 0.94,
          }),
          Pn(v, M, 36, 16, !0, Math.atan2(u.y - M, u.x - v)));
      }
      if (c >= 680) {
        const y = c - 680;
        if (
          (n ||
            ((n = 1),
            (pt = 80),
            (re = 7),
            en(3, 900),
            ($.globalAlpha = 0.5),
            ($.fillStyle = xa[1]),
            Ge(),
            ($.globalAlpha = 1),
            hn(u.x + 20, u.y, 24, 3.2),
            f("#def").animate(
              [
                { transform: "none" },
                { transform: "translate(14px,-10px) rotate(8deg)", offset: 0.3 },
                { transform: "translate(8px,-4px) rotate(4deg)", offset: 0.6 },
                { transform: "none" },
              ],
              { duration: 650 / De, easing: "cubic-bezier(.3,.7,.3,1)" },
            )),
          y < 220)
        ) {
          const v = jn(),
            M = Math.atan2(u.y - v.y, u.x - v.x),
            I = Math.max(0, 1 - y / 220);
          I > 0 && !(y > 120 && ((c / 40) | 0) % 2) && Pn(v.x, v.y, 36, 16 * (0.6 + 0.4 * I), !1, M);
        }
        if (y < 480) {
          const v = y > 300 ? 0.5 : 0;
          (J(u.x + 6, u.y, 10 + y / 3, 3, y < 150 ? xa[0] : xa[3]),
            J(u.x + 6, u.y, 6 + y / 5, 2, xa[1]),
            V(u.x + 6, u.y, 14 + y / 2.5, 5 + y / 18, xa[2], 2, v + 0.2));
        }
        y < 500 &&
          Math.random() < 0.5 &&
          qe(u.x + 30 + Math.random() * 30, u.y + (Math.random() - 0.5) * 16, {
            pal: xa,
            heat: 0.3,
            vx: 1.5 + Math.random(),
            vy: Math.random() - 0.5,
            max: 300,
            size: 2,
            grav: 0,
            drag: 0.95,
          });
      }
      return c < 1450;
    };
  }
  const k = ["#ffffff", "#e6eef7", "#b8c6d6", "#8796a8", "#55606e", "#272d36"],
    ne = ["#ffffff", "#fff2b0", "#ffc94a", "#ff8a1f"];
  function Ie(o, n) {
    const s = f("#def");
    (s.animate(
      [
        { filter: "none" },
        { filter: "brightness(3) saturate(0)" },
        { filter: "none" },
        { filter: "brightness(1.5) saturate(.2) contrast(1.4)" },
        { filter: "none" },
      ],
      { duration: n / De, easing: "steps(4)" },
    ),
      s.animate(
        [
          { transform: "none" },
          { transform: `translateX(${o * 5}px)` },
          { transform: `translateX(${-o * 2}px)` },
          { transform: "none" },
        ],
        { duration: 240 / De, easing: "steps(4)" },
      ));
    const l = f("#barDef");
    l.style.width = Math.max(8, parseFloat(l.style.width || 100) - [0, 12, 28, 55][o]) + "%";
  }
  function Le(o, n, s, l) {
    for (let c = 0; c < s; c++) {
      const p = Math.random() * 6.283,
        y = l * (0.5 + Math.random());
      qe(o, n, {
        pal: [ne[0], ne[1], ne[2], ne[3], ne[3], k[4]],
        heat: Math.random() * 0.3,
        vx: Math.cos(p) * y,
        vy: Math.sin(p) * y - 0.5,
        max: 250 + Math.random() * 200,
        size: 1 + ((Math.random() * 2) | 0),
        grav: 0.12,
        drag: 0.95,
      });
    }
  }
  function Pt(o, n, s) {
    (($.fillStyle = k[0]),
      $.fillRect(Math.round(o - s), Math.round(n), Math.round(s * 2), 1),
      $.fillRect(Math.round(o), Math.round(n - s), 1, Math.round(s * 2)),
      ($.fillStyle = k[1]),
      $.fillRect(Math.round(o - s * 0.5), Math.round(n - 1), Math.round(s), 3));
  }
  function Nt(o, n, s) {
    (A(o, n, s + 1, k[5]),
      A(o, n, s, k[3]),
      A(o - s * 0.2, n - s * 0.2, s * 0.65, k[2]),
      Z(o - s * 0.45, n - s * 0.5, 2, k[0]));
  }
  function Qt() {
    let o = 0,
      n = 0;
    const s = f("#atk"),
      l = Ot(0.82);
    return (c) => {
      if (
        (n ||
          ((n = 1),
          s.animate(
            [
              { transform: "scaleX(-1)" },
              { transform: `translate(${l.x}px,${l.y * 0.6}px) scaleX(-1)`, offset: 0.14 },
              { transform: `translate(${l.x}px,${l.y * 0.6}px) scaleX(-1)`, offset: 0.45 },
              { transform: "scaleX(-1)" },
            ],
            { duration: 620 / De, easing: "steps(10)" },
          )),
        c < 90)
      )
        for (let p = 0; p < 4; p++) {
          const y = _e(P.y - 12, u.y - 6, c / 90) + p * 6 - 9;
          (($.fillStyle = k[1]),
            $.fillRect(
              Math.round(_e(P.x, u.x, Math.max(0, c / 90 - 0.4))),
              Math.round(y),
              Math.round((u.x - P.x) * 0.4),
              1,
            ));
        }
      if (
        (c >= 90 && !o && ((o = 1), (pt = 30), (re = 2), Ie(1, 300), Le(u.x - 10, u.y, 12, 2.6)),
        c >= 90 && c < 260)
      ) {
        const p = c - 90;
        (Nt(u.x - 12, u.y, 6), p < 120 && Pt(u.x - 12, u.y - 4, 10 - p / 14));
      }
      return c < 700;
    };
  }
  function ma() {
    let o = 0;
    Te();
    const n = { x: P.x + 8, y: P.y - 8 },
      s = u.x - n.x,
      l = u.y - n.y,
      c = Math.hypot(s, l),
      p = s / c,
      y = l / c,
      v = -y,
      M = p;
    return (I) => {
      const ke = f("#tint");
      if (
        ((ke.style.opacity = I < 1050 ? Math.min(0.35, I / 350) : Math.max(0, 0.35 - (I - 1050) / 200)),
        I < 420)
      ) {
        const Se = I / 420,
          Ae = 3 + Se * 8;
        for (let St = 0; St < 8; St++) {
          const Jt = (St / 8) * 6.283 + I / 300,
            Oa = 70 * (1 - Se) + Ae + 4;
          (($.globalAlpha = 0.4 + Se * 0.5),
            Ee(
              n.x + Math.cos(Jt) * Oa,
              n.y + Math.sin(Jt) * Oa,
              n.x + Math.cos(Jt) * (Oa + 14),
              n.y + Math.sin(Jt) * (Oa + 14),
              1,
              St % 2 ? k[1] : k[0],
            ),
            ($.globalAlpha = 1));
        }
        (A(n.x, n.y, Ae + 2, k[4]),
          A(n.x, n.y, Ae, k[2]),
          A(n.x + Ae * 0.2, n.y + Ae * 0.2, Ae * 0.6, k[3]),
          A(n.x - Ae * 0.3, n.y - Ae * 0.3, Ae * 0.45, k[0]),
          I % 100 < 50 && Pt(n.x - Ae * 0.3, n.y - Ae * 0.3, Ae + 4),
          Se > 0.8 && (re = Math.max(re, 1)));
      } else if (I < 1e3) {
        const Se = Math.min(1, (I - 420) / 90),
          Ae = c * Se,
          St = I > 900 ? (1e3 - I) / 100 : 1,
          Jt = 1 + Math.sin(I / 22) * 0.1;
        for (const [Oa, Qa] of [
          [11, k[5]],
          [9, k[4]],
          [7, k[3]],
          [5, k[2]],
          [2.5, k[0]],
        ])
          for (let un = 0; un < Ae; un += 2)
            A(n.x + p * un, n.y + y * un, Oa * St * Jt * Math.min(1, 0.6 + (un / c) * 0.5), Qa);
        for (let Oa = (I / 1.5) % 22; Oa < Ae; Oa += 22) {
          const Qa = n.x + p * Oa,
            un = n.y + y * Oa,
            $n = 12 * St * Math.min(1, 0.6 + (Oa / c) * 0.5);
          (($.globalAlpha = 0.8), V(Qa, un, $n * 0.35, $n, k[0], 2), ($.globalAlpha = 1));
        }
        for (let Oa = 0; Oa < 2; Oa++) {
          const Qa = Math.random() * Ae;
          qe(n.x + p * Qa + v * (Math.random() - 0.5) * 20, n.y + y * Qa + M * (Math.random() - 0.5) * 20, {
            pal: [k[0], k[0], k[1], k[1], k[2], k[3]],
            heat: 0.1,
            vx: p * 2,
            vy: y * 2,
            max: 200,
            size: 2,
            grav: 0,
          });
        }
        (A(n.x, n.y, 13 * St, k[1]),
          A(n.x, n.y, 8 * St, k[0]),
          Se >= 1 &&
            (o ||
              ((o = 1),
              (pt = 55),
              (re = 5),
              Ie(2, 700),
              ($.globalAlpha = 0.55),
              ($.fillStyle = k[0]),
              Ge(),
              ($.globalAlpha = 1)),
            A(u.x, u.y, 15 + Math.random() * 3, k[2]),
            A(u.x, u.y, 10, k[0]),
            Pt(u.x, u.y, 24 + Math.random() * 6),
            I % 70 < 17 && (J(u.x, u.y, 16 + Math.random() * 12, 2, k[1]), Le(u.x, u.y, 5, 2.4)),
            (re = Math.max(re, 1.5))));
      } else if (I < 1020)
        for (let Se = 0; Se < 16; Se++) {
          const Ae = Math.random() * 6.283,
            St = 1.5 + Math.random() * 2.5;
          qe(u.x, u.y, {
            pal: [k[0], k[1], k[2], k[3], k[4], k[5]],
            heat: Math.random() * 0.5,
            vx: Math.cos(Ae) * St,
            vy: Math.sin(Ae) * St - 0.5,
            max: 450,
            size: 2 + ((Math.random() * 2) | 0),
            grav: 0.1,
            drag: 0.95,
          });
        }
      if (I > 1e3 && I < 1250) {
        const Se = I - 1e3;
        J(u.x, u.y, 10 + Se / 3, 2, k[1]);
      }
      return I < 1250;
    };
  }
  function $a() {
    let o = 0,
      n = 0;
    const s = f("#atk"),
      l = Ot(0.7);
    return (c) => {
      const p = f("#tint");
      ((p.style.opacity = c < 1100 ? Math.min(0.3, c / 400) : Math.max(0, 0.3 - (c - 1100) / 250)),
        n ||
          ((n = 1),
          s.animate(
            [
              { transform: "scaleX(-1)" },
              { transform: "scaleX(-1) translate(-6px,3px) scale(1.1,.9)", offset: 0.12 },
              {
                transform: `translate(${l.x}px,${l.y * 0.5 - 10}px) scaleX(-1) scale(.92,1.08)`,
                offset: 0.3,
              },
              { transform: `translate(${l.x}px,${l.y * 0.5}px) scaleX(1) rotate(-12deg)`, offset: 0.42 },
              { transform: `translate(${l.x}px,${l.y * 0.5}px) scaleX(1) rotate(10deg)`, offset: 0.5 },
              { transform: `translate(${l.x}px,${l.y * 0.5}px) scaleX(1)`, offset: 0.62 },
              { transform: "scaleX(-1)" },
            ],
            { duration: 1150 / De, easing: "cubic-bezier(.3,.7,.3,1)" },
          )));
      const y = jn(),
        v = 480,
        M = c - v;
      if ((c > 380 && c < v && ((c / 40) | 0) % 2 && Pt(y.x - 8, y.y + 10, 6), M >= 0 && M < 220)) {
        const I = Math.min(1, M / 80),
          ke = Math.max(0, (M - 90) / 130),
          Se = ke * ke * (3 - 2 * ke),
          Ae = u.x - 6,
          St = u.y + 4,
          Jt = 30,
          Oa = -2.4,
          Qa = Oa + 2.6 * I;
        (($.globalAlpha = 1 - Se),
          Ft(Ae, St, Jt, Oa + 2.6 * Se * 0.8, Qa, 9, k[4]),
          Ft(Ae, St, Jt, Oa + 2.6 * Se * 0.8, Qa, 6, k[2]),
          Ft(Ae, St, Jt, Oa + 2.6 * Se * 0.8, Qa, 2.5, k[0]),
          ($.globalAlpha = 1),
          I < 1 && Pt(Ae + Math.cos(Qa) * Jt, St + Math.sin(Qa) * Jt, 7));
      }
      return (
        M >= 60 &&
          !o &&
          ((o = 1),
          (pt = 70),
          (re = 6),
          Ie(3, 800),
          Le(u.x, u.y, 26, 3.2),
          ($.globalAlpha = 0.4),
          ($.fillStyle = k[0]),
          Ge(),
          ($.globalAlpha = 1)),
        o &&
          M < 480 &&
          (J(u.x, u.y, 8 + M / 3, 3, M < 140 ? ne[1] : k[2]), M < 130 && Pt(u.x, u.y, 22 - M / 7)),
        c < 1350
      );
    };
  }
  const Fa = [
      ["#e8e4ff", "#9d8cff", "#4b3fa8"],
      ["#f0c8ff", "#b45cff", "#5a1f99"],
      ["#fff0b0", "#ff8a2a", "#c8281a"],
      ["#f0fcff", "#7fe6ff", "#1f8fe8"],
      ["#fffbd0", "#ffdc2e", "#c98a0a"],
      ["#ffe0f4", "#ff8fd6", "#9a4aa8"],
    ],
    fa = ["#####", "...#.", "..#..", ".#...", "#####"];
  function ga(o, n, s, l, c) {
    ((n = Math.round(n)),
      (s = Math.round(s)),
      ($.fillStyle = c),
      o.forEach((p, y) => {
        for (let v = 0; v < p.length; v++) p[v] === "#" && $.fillRect(n + v * l, s + y * l, l, l);
      }));
  }
  function qa(o) {
    const n = Fa[o],
      s = f("#def"),
      l = { x: P.x + 6, y: P.y - 8 };
    let c = 0;
    return (
      Te(),
      f("#atk").animate(
        [
          { filter: "none" },
          { filter: `drop-shadow(0 0 3px ${n[1]}) brightness(1.2)`, offset: 0.5 },
          { filter: "none" },
        ],
        { duration: 450 / De },
      ),
      (p) => {
        if (p < 160) (A(l.x, l.y, 2 + p / 40, n[1]), A(l.x, l.y, 1 + p / 80, n[0]));
        else if (p < 460) {
          const M = Re((p - 160) / 300),
            I = dt(M, l, u, 20);
          (A(I.x, I.y, 5, n[2]),
            A(I.x, I.y, 4, n[1]),
            A(I.x - 1, I.y - 1, 2, n[0]),
            Math.random() < 0.6 &&
              qe(I.x, I.y, {
                pal: [n[0], n[0], n[1], n[1], n[2], n[2]],
                heat: 0.2,
                max: 220,
                size: 2,
                grav: 0,
                vy: -0.2,
              }));
        }
        if (p >= 460 && !c) {
          ((c = 1), J(u.x, u.y, 12, 2, n[0]));
          for (let ke = 0; ke < (o === 2 ? 4 : 10); ke++) {
            const Se = Math.random() * 6.283;
            qe(u.x, u.y, {
              pal: [n[0], n[0], n[1], n[1], n[2], n[2]],
              vx: Math.cos(Se) * 1.6,
              vy: Math.sin(Se) * 1.6,
              heat: 0.2,
              max: 300,
              size: 2,
              grav: 0,
              drag: 0.92,
            });
          }
          const M = {
              0: "brightness(.75) saturate(.6)",
              1: "sepia(1) hue-rotate(230deg) saturate(3) brightness(.85)",
              2: "sepia(.5) hue-rotate(-15deg) saturate(1.8) brightness(1.08)",
              3: "brightness(1.5) saturate(.3) sepia(.4) hue-rotate(160deg)",
              4: "sepia(1) hue-rotate(10deg) saturate(4) brightness(1.3)",
              5: "sepia(1) hue-rotate(270deg) saturate(2) brightness(1.2)",
            }[o],
            I = {
              0: [
                { transform: "none" },
                { transform: "rotate(-3deg) translateY(2px)" },
                { transform: "rotate(2deg) translateY(2px)" },
                { transform: "none" },
              ],
              1: [
                { transform: "none" },
                { transform: "scale(1.04,.95)" },
                { transform: "scale(.98,1.02)" },
                { transform: "scale(1.03,.96)" },
                { transform: "none" },
              ],
              2: [
                { transform: "none" },
                { transform: "translateY(-4px)" },
                { transform: "none" },
                { transform: "translateY(-2px)" },
                { transform: "none" },
              ],
              3: [
                { transform: "none" },
                { transform: "translateX(2px)" },
                { transform: "translateX(-2px)" },
                { transform: "none" },
              ],
              4: [
                { transform: "none" },
                { transform: "translateX(3px)" },
                { transform: "translateX(-3px)" },
                { transform: "translateX(2px)" },
                { transform: "translateX(-2px)" },
                { transform: "none" },
                { transform: "translateX(2px)" },
                { transform: "none" },
              ],
              5: [
                { transform: "none" },
                { transform: "rotate(-6deg)" },
                { transform: "rotate(5deg)" },
                { transform: "rotate(-4deg)" },
                { transform: "none" },
              ],
            }[o];
          (s.animate(
            [
              { filter: "none" },
              { filter: M, offset: 0.15 },
              { filter: M, offset: 0.75 },
              { filter: "none" },
            ],
            { duration: 760 / De, easing: "steps(6)" },
          ),
            s.animate(I, {
              duration: (o === 4 ? 520 : 700) / De,
              easing: o === 4 ? "steps(8)" : "ease-in-out",
            }));
        }
        const y = p - 460;
        if (y < 0 || y > 820) return p < 1350;
        const v = y > 620 ? 1 - (y - 620) / 200 : 1;
        if ((($.globalAlpha = Math.max(0, v)), o === 0))
          for (let M = 0; M < 3; M++) {
            const I = (y / 700 + M * 0.3) % 1;
            y < M * 180 ||
              ga(
                fa,
                u.x + 16 + M * 7 + Math.sin(I * 6) * 3,
                u.y - 24 - I * 30,
                1 + (M > 0 ? 1 : 0),
                M % 2 ? n[0] : n[1],
              );
          }
        if (o === 1) {
          y % 70 < 17 &&
            qe(u.x + (Math.random() - 0.5) * 36, u.y + 16, {
              pal: [_a[0], _a[1], Ha[1], Ha[1], Ha[2], Ha[3]],
              round: 1,
              heat: Math.random() * 0.4,
              max: 600,
              size: 1.5 + Math.random() * 1.5,
              vy: -0.6,
              grav: -0.004,
              drag: 0.98,
            });
          for (let M = 0; M < 3; M++) {
            const I = u.x - 14 + M * 14,
              ke = Math.min(12, y / 30);
            (($.fillStyle = n[1]),
              $.fillRect(Math.round(I), Math.round(u.y - 10 + M * 4), 2, Math.round(ke)),
              A(I + 1, u.y - 10 + M * 4 + ke, 1.6, n[2]));
          }
        }
        if (o === 2) {
          y % 70 < 17 &&
            qe(u.x + 14 + (Math.random() - 0.5) * 36, u.y + 16, {
              round: 1,
              heat: 0.3 + Math.random() * 0.3,
              max: 600,
              size: 1.5 + Math.random() * 1.5,
              vx: (Math.random() - 0.5) * 0.2,
              vy: -0.6,
              grav: -0.004,
              drag: 0.98,
            });
          for (let M = 0; M < 3; M++) {
            const I = u.x + 2 + M * 12,
              ke = u.y - 6 + M * 4,
              Se = Math.min(1, y / 150) * (5 + Math.sin(y / 50 + M * 2) * 1.5);
            (A(I, ke - Se * 0.4, 2.2, X[3]),
              A(I, ke - Se * 0.4 - 1, 1.4, X[2]),
              ($.fillStyle = X[1]),
              $.fillRect(Math.round(I), Math.round(ke - Se), 1, Math.max(1, Math.round(Se * 0.5))));
          }
        }
        if (o === 3) {
          const M = Math.min(1, y / 220);
          ([
            [-1.9, -14, 10],
            [-1.2, 10, 12],
            [-2.6, -20, -4],
            [-0.5, 18, 4],
            [-1.6, 0, -16],
            [-2.3, -8, 16],
            [-0.9, 12, 18],
          ].forEach(([I, ke, Se], Ae) => ze(u.x + ke, u.y + Se, I, (9 + (Ae % 3) * 3) * M, 3 * M, 0.9)),
            y % 90 < 17 && Rt(u.x + (Math.random() - 0.5) * 40, u.y + (Math.random() - 0.5) * 36, 2, pa[0]));
        }
        if (
          (o === 4 &&
            (((y / 50) | 0) % 2 === 0 && ja(u.x, u.y, 22, 2),
            y % 80 < 17 && T(u.x + (Math.random() - 0.5) * 30, u.y + (Math.random() - 0.5) * 20, 3, 1.4)),
          o === 5)
        )
          for (let M = 0; M < 3; M++) {
            const I = y / 110 + M * 2.09,
              ke = u.x + Math.cos(I) * 16,
              Se = u.y - 26 + Math.sin(I) * 4;
            Rt(ke, Se, Math.sin(I) > 0 ? 3 : 2, M % 2 ? n[1] : "#ffe866");
          }
        return (($.globalAlpha = 1), p < 1350);
      }
    );
  }
  function ja(o, n, s, l) {
    Ne(U(o, n, s, l));
  }
  const pn = {
      fire: {
        atk: 6,
        def: 3,
        nAtk: "DRACAUFEU",
        nDef: "FLORIZARRE",
        tint: "#1a0505",
        names: ["FLAMMÈCHE", "LANCE-FLAMMES", "DÉFLAGRATION"],
        fx: [At, yt, he],
        len: [650, 1100, 1300],
      },
      psy: {
        atk: 65,
        def: 68,
        nAtk: "ALAKAZAM",
        nDef: "MACKOGNEUR",
        tint: "#160629",
        names: ["CHOC MENTAL", "RAFALE PSY", "PSYKO"],
        fx: [Xt, Ht, ct],
        len: [750, 1e3, 1350],
      },
      status: {
        atk: 94,
        def: 143,
        nAtk: "ECTOPLASMA",
        nDef: "RONFLEX",
        tint: "#100818",
        status: 1,
        names: ["SOMMEIL", "POISON", "BRÛLURE", "GEL", "PARALYSIE", "CONFUSION"],
        moves: ["HYPNOSE", "TOXIK", "FEU FOLLET", "LASER GLACE", "CAGE-ÉCLAIR", "ONDE FOLIE"],
        msgs: [
          "s’endort !",
          "est empoisonné !",
          "est brûlé !",
          "est gelé !",
          "est paralysé !",
          "est confus !",
        ],
        fx: [0, 1, 2, 3, 4, 5].map((o) => () => qa(o)),
        len: [1300, 1250, 1250, 1300, 1200, 1300],
      },
      bug: {
        atk: 123,
        def: 65,
        nAtk: "INSÉCATEUR",
        nDef: "ALAKAZAM",
        tint: "#121a04",
        names: ["DARD-NUÉE", "PLAIE CROIX", "MÉGACORNE"],
        fx: [Fn, Ln, h],
        len: [950, 900, 1450],
      },
      steel: {
        atk: 212,
        def: 131,
        nAtk: "CIZAYOX",
        nDef: "LOKHLASS",
        tint: "#0c1018",
        names: ["PISTO-POING", "LUMINOCANON", "QUEUE DE FER"],
        fx: [Qt, ma, $a],
        len: [700, 1250, 1350],
      },
      fight: {
        atk: 68,
        def: 143,
        nAtk: "MACKOGNEUR",
        nDef: "RONFLEX",
        tint: "#2a0a04",
        names: ["POING-KARATÉ", "MACH PUNCH", "DYNAMOPOING"],
        fx: [Pa, Ta, La],
        len: [700, 900, 1600],
      },
      normal: {
        atk: 143,
        def: 68,
        nAtk: "RONFLEX",
        nDef: "MACKOGNEUR",
        tint: "#1a1206",
        names: ["CHARGE", "VIVE-ATTAQUE", "ULTRALASER"],
        fx: [C, g, E],
        len: [850, 650, 1900],
      },
      fairy: {
        atk: 36,
        def: 149,
        nAtk: "MÉLODELFE",
        nDef: "DRACOLOSSE",
        tint: "#2a0e2a",
        names: ["VENT FÉÉRIQUE", "ÉCLAT MAGIQUE", "POUVOIR LUNAIRE"],
        fx: [Za, En, bn],
        len: [1050, 1050, 1700],
      },
      ground: {
        atk: 112,
        def: 135,
        nAtk: "RHINOFEROS",
        nDef: "VOLTALI",
        tint: "#1e1006",
        names: ["TIR DE BOUE", "TUNNEL", "SÉISME"],
        fx: [nn, F, Ce],
        len: [900, 1450, 1500],
      },
      rock: {
        atk: 76,
        def: 6,
        nAtk: "GROLEM",
        nDef: "DRACAUFEU",
        tint: "#1c1206",
        names: ["JET-PIERRES", "ÉBOULEMENT", "LAME DE ROC"],
        fx: [ns, Ue, Bt],
        len: [900, 1300, 1550],
      },
      grass: {
        atk: 3,
        def: 9,
        nAtk: "FLORIZARRE",
        nDef: "TORTANK",
        tint: "#1a1606",
        names: ["FOUET LIANES", "DANSE-FLEUR", "LANCE-SOLEIL"],
        fx: [Mn, ss, us],
        len: [1e3, 1550, 1700],
      },
      dragon: {
        atk: 149,
        def: 130,
        nAtk: "DRACOLOSSE",
        nDef: "LÉVIATOR",
        tint: "#0a0626",
        names: ["DRACOSOUFFLE", "DRACOGRIFFE", "DRACO-MÉTÉORE"],
        fx: [gn, yn, mn],
        len: [1050, 950, 1700],
      },
      poison: {
        atk: 89,
        def: 9,
        nAtk: "GROTADMORV",
        nDef: "TORTANK",
        tint: "#14051e",
        names: ["DARD-VENIN", "BOMB-BEURK", "DÉTRICANON"],
        fx: [aa, ae, ft],
        len: [850, 1250, 1450],
      },
      dark: {
        atk: 229,
        def: 65,
        nAtk: "DÉMOLOSSE",
        nDef: "ALAKAZAM",
        tint: "#0a0204",
        names: ["FEINTE", "VIBROBSCUR", "TRICHERIE"],
        fx: [It, Aa, Ka],
        len: [900, 1100, 1450],
      },
      ghost: {
        atk: 94,
        def: 65,
        nAtk: "ECTOPLASMA",
        nDef: "ALAKAZAM",
        tint: "#0b0418",
        names: ["LÉCHOUILLE", "BALL'OMBRE", "OMBRE NOCTURNE"],
        fx: [on, qn, xn],
        len: [850, 1150, 1550],
      },
      ice: {
        atk: 131,
        def: 149,
        nAtk: "LOKHLASS",
        nDef: "DRACOLOSSE",
        tint: "#062a4a",
        names: ["POUDREUSE", "LASER GLACE", "BLIZZARD"],
        fx: [Ma, Na, Va],
        len: [1e3, 1250, 1500],
      },
      fly: {
        atk: 18,
        def: 3,
        nAtk: "ROUCARNAGE",
        nDef: "FLORIZARRE",
        tint: "#0c1a2a",
        names: ["TORNADE", "CRU-AILE", "PIQUÉ"],
        fx: [Ye, Yt, wa],
        len: [950, 1e3, 1450],
      },
      water: {
        atk: 9,
        def: 59,
        nAtk: "TORTANK",
        nDef: "ARCANIN",
        tint: "#04122a",
        names: ["PISTOLET À O", "SURF", "HYDROCANON"],
        fx: [ut, jt, xt],
        len: [850, 1200, 1300],
      },
      elec: {
        atk: 25,
        def: 130,
        nAtk: "PIKACHU",
        nDef: "LÉVIATOR",
        tint: "#070a24",
        names: ["ÉCLAIR", "TONNERRE", "FATAL-FOUDRE"],
        fx: [K, He, m],
        len: [720, 950, 1150],
      },
    },
    dn = ["#ffffff", "#f4efe6", "#d9d0c2", "#a8a29a", "#6e675f", "#2e2a26"],
    _n = z,
    as = {
      fire: X,
      electric: Oe,
      psychic: _n,
      water: ["#ffffff", "#e2f9ff", "#a9e6ff", "#74d6ff", "#3394ea", "#1f54ad"],
      flying: D,
      ice: pa,
      ghost: Ba,
      dark: fn,
      poison: Ha,
      dragon: ht,
      grass: ln,
      rock: Xn,
      ground: st,
      fairy: Xe,
      normal: dn,
      fighting: q,
      bug: xa,
      steel: k,
    },
    Qn = new Set(["fire", "water", "poison", "dragon", "ghost", "fairy", "grass"]),
    os = {
      fire: mt,
      electric: L,
      psychic: (o) => ra(o),
      water: mt,
      flying: mt,
      ice: ca,
      ghost: vn,
      dark: Jn,
      poison: Be,
      dragon: Ra,
      grass: sa,
      rock: Sn,
      ground: la,
      fairy: ia,
      normal: wn,
      fighting: Pe,
      bug: en,
      steel: Ie,
    },
    Ms = { electric: "elec", psychic: "psy", flying: "fly", fighting: "fight" },
    Cs = (o) => Ms[o] || o;
  function rs(o) {
    const n = o < 60 ? 1 : o < 95 ? 2 : o < 120 ? 3 : 4,
      s = [0, 0, 60, 95, 120][n],
      l = [0, 60, 95, 120, 160][n],
      c = Math.max(0, Math.min(1, (o - s) / (l - s))),
      p = (y, v) => _e(y[v], y[Math.min(4, v + 1)], c * 0.5);
    return {
      tier: n,
      lvl: Math.min(3, n),
      u: c,
      dur: p([0, 700, 950, 1250, 1500], n),
      sz: p([0, 1, 1.3, 1.7, 2.1], n),
      tint: [0, 0, 0.12, 0.32, 0.42][n],
      shake: p([0, 1.5, 2.8, 4.5, 6], n),
      stop: [0, 20, 35, 55, 70][n],
      flash: [0, 0, 0.2, 0.35, 0.45][n],
      n: Math.round(p([0, 10, 18, 30, 42], n)),
    };
  }
  const Ps = {
      "double-kick": 2,
      "triple-kick": 3,
      "double-hit": 2,
      "fury-attack": 3,
      "fury-swipes": 3,
      "dual-chop": 2,
      "arm-thrust": 4,
      "bone-rush": 3,
      "rock-blast": 3,
      "icicle-spear": 3,
      "bullet-seed": 4,
      "pin-missile": 4,
      "fury-cutter": 2,
      "double-edge": 1,
      "water-shuriken": 3,
    },
    vs = (o, n = 0) => [o[0], o[1 + n], o[2], o[3], o[4], o[5]];
  function ys(o, n, s, l) {
    (A(o, n, s + 1, l[4]),
      A(o, n, s, l[3]),
      A(o, n, s * 0.7, l[2]),
      A(o - s * 0.25, n - s * 0.25, s * 0.35, l[0]));
  }
  function Ts(o, n, s, l, c, p, y = {}) {
    for (let v = 0; v < s; v++) {
      const M = Math.random() * 6.283,
        I = l * (0.4 + Math.random() * 0.8);
      qe(o, n, {
        pal: c,
        round: p,
        heat: Math.random() * 0.5,
        vx: Math.cos(M) * I,
        vy: Math.sin(M) * I - (y.up || 0),
        max: 280 + Math.random() * 220,
        size: p ? 1.5 + Math.random() * 2 : 2,
        grav: y.grav ?? 0,
        drag: 0.93,
      });
    }
  }
  function js(o, n, s, l, c, p, y, v, M = 4) {
    const I = Math.cos(s),
      ke = Math.sin(s);
    $.globalAlpha = y;
    for (let Se = -l / 2 + l * p; Se < -l / 2 + l * c; Se += 1) {
      const Ae = (Se + l / 2) / l,
        St = Math.sin(Ae * Math.PI);
      (A(o + I * Se, n + ke * Se, St * M + 1, v[4]),
        A(o + I * Se, n + ke * Se, St * M * 0.65, v[2]),
        St > 0.3 && A(o + I * Se, n + ke * Se, St * M * 0.25, v[0]));
    }
    $.globalAlpha = 1;
  }
  function As(o, n, s, l) {
    (A(o, n, s + 1, l[5]),
      A(o, n, s, l[3]),
      A(o - s * 0.25, n - s * 0.25, s * 0.55, l[2]),
      Z(o - s * 0.4, n - s * 0.45, 1, l[0]));
  }
  function $s(o, n, s, l) {
    const c = 5 * l,
      p = 2.2 * l;
    (N(o, n, c + 1, p + 1, s, ln[5], ln[5]), N(o, n, c, p, s, ln[2], ln[3]));
    const y = Math.cos(s),
      v = Math.sin(s);
    $.fillStyle = ln[0];
    for (let M = -c * 0.7; M < c * 0.7; M++) $.fillRect(Math.round(o + y * M), Math.round(n + v * M), 1, 1);
    $.fillStyle = ln[1];
    for (let M = -c * 0.5; M < c * 0.3; M++)
      $.fillRect(Math.round(o + y * M - v * p * 0.4), Math.round(n + v * M + y * p * 0.4), 1, 1);
  }
  function qs(o, n, s, l) {
    let c = 0;
    const p = as[o.t],
      y = { x: P.x + 10, y: P.y - 10 },
      v = Math.atan2(u.y - y.y, u.x - y.x),
      M = Math.hypot(u.x - y.x, u.y - y.y);
    return (
      f("#atk").animate(
        [
          { transform: "scaleX(-1)" },
          { transform: "scaleX(-1) scale(1.08,.94)", offset: 0.3 },
          { transform: "scaleX(-1)" },
        ],
        { duration: 300 / De },
      ),
      (I) => {
        for (let ke = 0; ke < s; ke++) {
          const Se = (I - 80 - ke * 90) / 380;
          if (Se < 0 || Se > 1) continue;
          const Ae = Se * M * 1.05,
            St = y.x + Math.cos(v) * Ae,
            Jt = y.y + Math.sin(v) * Ae,
            Oa = 10 + Se * 28,
            Qa = l ? "#ffc4ec" : ke % 2 ? p[1] : p[2];
          $.globalAlpha = Se < 0.85 ? 1 : (1 - Se) / 0.15;
          for (const un of [0, 6])
            (Y(St - un, Jt, Oa * 0.4, Oa * (1 - un / 30), v - 1.1, v + 1.1, p[4], 4),
              Y(St - un, Jt, Oa * 0.4, Oa * (1 - un / 30), v - 1, v + 1, un ? p[1] : Qa, 3));
          (($.globalAlpha = 1), l && Math.random() < 0.3 && da(St, Jt - Oa * 0.6, "#ff8fd6"));
        }
        return (
          !c && I > 80 + 380 * 0.9 && ((c = 1), Vn(o.t, n)),
          c && I < 80 + s * 90 + 380 && I % 90 < 17 && (re = Math.max(re, n.shake * 0.5)),
          I < 80 + s * 90 + 380 + 150
        );
      }
    );
  }
  const Xs = ["..####..", ".######.", "########", "#o#o#o##", "########", ".#######", "..#####.", "..###..."];
  function Ds(o, n, s, l, c = 0) {
    const p = Xs[0].length,
      y = Xs.length,
      v = s * (1 - c * 0.25),
      M = s * (1 + c * 0.2),
      I = Math.round(o - (p * v) / 2),
      ke = Math.round(n - (y * M) / 2);
    for (let Se = 0; Se < y; Se++)
      for (let Ae = 0; Ae < p; Ae++) {
        const St = Xs[Se][Ae];
        if (St === ".") continue;
        const Jt =
          Se === 0 ||
          Ae === 0 ||
          Ae === p - 1 ||
          Xs[Se - 1]?.[Ae] === "." ||
          Xs[Se + 1]?.[Ae] === "." ||
          Xs[Se][Ae - 1] === "." ||
          Xs[Se][Ae + 1] === ".";
        (($.fillStyle = St === "o" ? l[4] : Jt ? l[5] : Se < 3 ? l[1] : Se < 5 ? l[2] : l[3]),
          $.fillRect(I + Math.round(Ae * v), ke + Math.round(Se * M), Math.ceil(v), Math.ceil(M)));
      }
    (($.fillStyle = l[0]),
      $.fillRect(I + Math.round(2 * v), ke + Math.round(1 * M), Math.ceil(v * 2), Math.ceil(M)));
  }
  function Qs(o, n, s, l, c, p) {
    for (let y = 0; y < l; y++) {
      const v = c + (y / l) * 6.283;
      (Ee(
        o + Math.cos(v) * s * 0.45,
        n + Math.sin(v) * s * 0.45,
        o + Math.cos(v) * s,
        n + Math.sin(v) * s,
        2,
        p[4],
      ),
        Ee(
          o + Math.cos(v) * s * 0.5,
          n + Math.sin(v) * s * 0.5,
          o + Math.cos(v) * s * 0.9,
          n + Math.sin(v) * s * 0.9,
          1,
          p[0],
        ));
    }
  }
  function Us(o, n, s) {
    const l = Ot(o);
    f("#atk").animate(
      [
        { transform: "scaleX(-1)" },
        { transform: `translate(${l.x}px,${l.y * 0.6}px) scaleX(-1)`, offset: s ? 0.35 : 0.25 },
        { transform: `translate(${l.x}px,${l.y * 0.6}px) scaleX(-1)`, offset: s ? 0.6 : 0.5 },
        { transform: "scaleX(-1)" },
      ],
      { duration: n / De, easing: "cubic-bezier(.3,.7,.3,1)" },
    );
  }
  function Vn(o, n, s = u.x, l = u.y, c = 1) {
    if (
      (os[o](n.lvl, 300 + n.tier * 150),
      (re = Math.max(re, n.shake * c)),
      (pt = Math.max(pt, n.stop * c)),
      n.flash && (($.globalAlpha = n.flash), ($.fillStyle = as[o][1]), Ge(), ($.globalAlpha = 1)),
      o === "psychic")
    ) {
      const p = _n;
      for (let y = 0; y < Math.round(n.n * c * 0.6); y++) {
        const v = Math.random() * 6.283,
          M = 0.8 + n.tier * 0.45 + Math.random();
        qe(s, l, {
          pal: p,
          heat: Math.random() * 0.5,
          vx: Math.cos(v) * M,
          vy: Math.sin(v) * M * 0.6,
          max: 260 + Math.random() * 160,
          size: 2,
          grav: 0,
          drag: 0.92,
        });
      }
      kn.push({ x: s, y: l, t: 0, n: 1 + n.tier, r: 6 + n.tier * 2 });
      return;
    }
    if (o === "water") {
      const p = ["#ffffff", "#ffffff", "#e2f9ff", "#bfeeff", "#a9e6ff", "#74d6ff"];
      for (let y = 0; y < Math.round(n.n * c); y++) {
        const v = -Math.PI / 2 + (Math.random() - 0.5) * 2.8,
          M = (1.2 + n.tier * 0.4) * (0.4 + Math.random() * 0.8);
        qe(s, l, {
          pal: p,
          round: 1,
          heat: Math.random() * 0.6,
          vx: Math.cos(v) * M,
          vy: Math.sin(v) * M * 1.4,
          max: 300 + Math.random() * 250,
          size: 1.2 + Math.random() * 1.8,
          grav: 0.09,
          drag: 0.97,
        });
      }
      for (let y = 0; y < 3 + n.tier * 2; y++)
        ka(s + (Math.random() - 0.5) * 26, l + (Math.random() - 0.5) * 20, {
          vy: -0.4,
          s: 1 + ((Math.random() * 2) | 0),
          c: "#ffffff",
          max: 380,
        });
      J(s, l, 7 + n.tier * 3, 2, "#ffffff");
      return;
    }
    Ts(s, l, Math.round(n.n * c), 1.4 + n.tier * 0.45, as[o], Qn.has(o));
  }
  const kn = [];
  function Un(o) {
    for (let n = kn.length - 1; n >= 0; n--) {
      const s = kn[n];
      s.t += o;
      let l = !1;
      for (let c = 0; c < s.n; c++) {
        const p = s.t - c * 70;
        if (p < 0 || p > 360) {
          p < 0 && (l = !0);
          continue;
        }
        l = !0;
        const y = s.r + p / 6;
        (($.globalAlpha = 1 - p / 360),
          V(s.x, s.y, y, y * 0.55, c % 2 ? _n[2] : _n[3], 2),
          p < 200 && V(s.x, s.y, y * 0.8, y * 0.44, _n[1], 1),
          ($.globalAlpha = 1));
      }
      l || kn.splice(n, 1);
    }
  }
  function ps(o, n, s, l) {
    const c = 3 + s * 7;
    for (let p = 0; p < 2; p++) {
      const y = Math.random() * 6.283,
        v = 34 * (1 - s) + c;
      qe(o + Math.cos(y) * v, n + Math.sin(y) * v, {
        pal: l,
        vx: -Math.cos(y) * 1.3,
        vy: -Math.sin(y) * 1.3,
        heat: 0.2,
        max: 180,
        size: 2,
        grav: 0,
      });
    }
    ys(o, n, c * 0.6, l);
  }
  function Gn(o, n, s) {
    const l = f("#tint");
    s.tint &&
      (l.style.opacity = o < n - 200 ? Math.min(s.tint, o / 400) : Math.max(0, (s.tint * (n - o)) / 200));
  }
  const ms = {
      contact(o, n) {
        const s = as[o.t],
          l = Math.min(n.dur, 600 + n.tier * 120),
          c = n.tier >= 3;
        let p = 0;
        (c && Te(), Wa(() => Us(0.82, l * 0.85, c), c ? 260 / De : 0));
        const y = (c ? 260 : 0) + l * 0.85 * (c ? 0.35 : 0.25);
        return (v) => (
          c && v < 260 && ps(P.x, P.y - 4, v / 260, s),
          v >= y && !p && ((p = 1), Vn(o.t, n), J(u.x, u.y, 8 + n.tier * 3, 2, s[1])),
          p && v - y < 220 && J(u.x, u.y, 8 + (v - y) / (5 - n.tier * 0.6), 2, v - y < 100 ? s[0] : s[2]),
          Gn(v, l + 300, n),
          v < l + 300
        );
      },
      poing(o, n) {
        const s = as[o.t],
          l = Ps[o.k] || 1,
          c = Math.min(n.dur, 1100),
          p = 3 + (n.tier >= 3 ? 1 : 0);
        let y = 0;
        return (
          n.tier >= 3 && Te(),
          Us(0.72, c * 0.9, n.tier >= 3),
          (v) => {
            const M = c * 0.9 * 0.25;
            for (let I = 0; I < l; I++) {
              const ke = M + I * 95,
                Se = v - ke,
                Ae = l > 1 ? (I % 2 ? -7 : 7) : 0;
              if (Se < -140 || Se > 170) continue;
              const St = jn(),
                Jt = Se >= 0 && Se < 60 ? 1 - Se / 60 : 0,
                Oa = Math.min(St.x + 4, u.x - 14),
                Qa = St.y + Ae * 0.5;
              if (Se < 0)
                for (let un = 0; un < 4; un++)
                  (($.fillStyle = un % 2 ? s[1] : s[0]),
                    $.fillRect(Math.round(Oa - 26 - un * 3), Math.round(Qa - 6 + un * 4), 20 - un * 3, 1));
              if (
                (Se < 0
                  ? Ds(Oa, Qa, p, s, 0)
                  : Se < 90 &&
                    (($.globalAlpha = 1 - Math.max(0, Se - 40) / 50),
                    Ds(u.x - 14 + Jt * 3, Qa, p, s, Jt),
                    ($.globalAlpha = 1)),
                Se >= 0 && Se < 120)
              ) {
                const un = 10 + n.tier * 4 + Se / 6;
                (Qs(u.x - 6, Qa, un, 8, I * 0.4, s),
                  Se < 50 &&
                    (A(u.x - 6, Qa, 7 + n.tier * 2 - Se / 10, s[0]),
                    J(u.x - 6, Qa, 8 + n.tier * 2 + Se / 4, 2, s[2])));
              }
              Se >= 0 && y <= I && ((y = I + 1), Vn(o.t, n, u.x, Qa, I === l - 1 ? 1 : 0.4));
            }
            return (Gn(v, c + 250, n), v < c + 250);
          }
        );
      },
      pied(o, n) {
        const s = as[o.t],
          l = Ps[o.k] || 1,
          c = Math.min(n.dur, 1100);
        let p = 0;
        return (
          Us(0.8, c * 0.9, n.tier >= 3),
          (y) => {
            const v = c * 0.9 * 0.25;
            for (let M = 0; M < l; M++) {
              const I = y - v - M * 110;
              if (I < 0 || I > 220) continue;
              const ke = Math.min(1, I / 70),
                Se = M % 2 ? -0.3 : 2.6;
              (Ft(u.x - 6, u.y + 6, 18 + n.tier * 3, Se, Se + (M % 2 ? -2.2 : 2.2) * ke, 5 + n.tier, s[3]),
                Ft(u.x - 6, u.y + 6, 18 + n.tier * 3, Se, Se + (M % 2 ? -2.2 : 2.2) * ke, 2, s[0]),
                ke >= 1 && p <= M && ((p = M + 1), Vn(o.t, n, u.x, u.y + 6, M === l - 1 ? 1 : 0.4)));
            }
            return (Gn(y, c + 250, n), y < c + 250);
          }
        );
      },
      entaille(o, n) {
        const s = as[o.t],
          l = Ps[o.k] || (o.k === "x-scissor" || o.k === "cross-poison" ? 2 : 1),
          c = n.dur,
          p = 34 + n.tier * 8;
        let y = 0;
        const v = o.c === "spec" || ["air-cutter", "air-slash", "psycho-cut"].includes(o.k);
        return (
          v ? Te() : Us(0.8, c * 0.8, !1),
          (M) => {
            const I = v ? 200 : c * 0.8 * 0.25;
            for (let ke = 0; ke < l; ke++) {
              const Se = I + ke * 90,
                Ae = M - Se,
                St = (l === 2 ? (ke ? -0.8 : 0.8) : 0.7 + ke * 0.25) + Math.PI / 2;
              if (Ae < -260 || Ae > 340) continue;
              if (v && Ae < 0) {
                const Qa = 1 + Ae / 260,
                  un = _e(P.x, u.x, Qa),
                  $n = _e(P.y - 6, u.y, Qa);
                (Ft(un - 8, $n, 12, -1, 1, 5, s[2]), Ft(un - 8, $n, 12, -0.8, 0.8, 2, s[0]));
                continue;
              }
              const Jt = Math.max(0, (Ae - 110) / 230),
                Oa = Jt * Jt * (3 - 2 * Jt);
              (js(
                u.x + 4 + (ke - (l - 1) / 2) * 7,
                u.y,
                St,
                p,
                Math.min(1, Ae / 60),
                Oa * 0.9,
                1 - Oa * 0.9,
                s,
                2.4 + n.tier * 0.7,
              ),
                Ae >= 40 && y <= ke && ((y = ke + 1), Vn(o.t, n, u.x, u.y, ke === l - 1 ? 1 : 0.4)));
            }
            return (Gn(M, c + 300, n), M < c + 300);
          }
        );
      },
      morsure(o, n) {
        const s = as[o.t],
          l = o.k === "leech-life";
        let c = 0;
        return (p) => {
          const y = p - 120;
          if (y > 0 && y < 520) {
            const v = y < 160 ? Re(y / 160) * 0.25 : y < 220 ? 0.25 + ((y - 160) / 60) * 0.75 : 1,
              M = y > 380 ? Math.max(0, 1 - (y - 380) / 140) : 1;
            (($.globalAlpha = M),
              is(u.x + 6, u.y + 6, v, 16 + n.tier * 3, s[3], s[4], s[1]),
              ($.globalAlpha = 1),
              !c && y >= 220 && ((c = 1), Vn(o.t, n)));
          }
          if (l && p > 380 && p < 800 && Math.random() < 0.7) {
            const v = Math.random();
            qe(u.x, u.y, {
              pal: s,
              round: 1,
              heat: 0.2,
              vx: (P.x - u.x) / 45,
              vy: (P.y - u.y) / 45,
              max: 650,
              size: 2,
              grav: 0,
              drag: 1,
            });
          }
          return (Gn(p, n.dur, n), p < Math.max(800, n.dur));
        };
      },
      bec(o, n) {
        const s = as[o.t],
          l = Ps[o.k] || (o.k === "drill-peck" ? 4 : 1),
          c = n.dur;
        let p = 0;
        return (
          Us(0.82, c * 0.9, n.tier >= 3),
          (y) => {
            const v = c * 0.9 * 0.25,
              M = u.x - P.x,
              I = u.y - P.y,
              ke = Math.hypot(M, I),
              Se = M / ke,
              Ae = I / ke;
            for (let St = 0; St < l; St++) {
              const Jt = y - v - St * 70;
              if (Jt < 0 || Jt > 140) continue;
              const Oa = u.x - 14 + (St % 2 ? 3 : -3),
                Qa = u.y + ((St % 3) - 1) * 5;
              for (let un = 0; un < 10 + n.tier * 3; un++)
                (($.fillStyle = un < 3 ? s[0] : s[2]),
                  $.fillRect(
                    Math.round(Oa - Se * un),
                    Math.round(Qa - Ae * un),
                    un < 5 ? 3 : 2,
                    un < 5 ? 3 : 2,
                  ));
              p <= St && ((p = St + 1), Vn(o.t, n, Oa, Qa, St === l - 1 ? 1 : 0.35), J(Oa, Qa, 6, 1, s[0]));
            }
            return (Gn(y, c + 250, n), y < c + 250);
          }
        );
      },
      queue(o, n) {
        const s = as[o.t],
          l = o.k === "wrap" || o.k === "bind";
        let c = 0;
        const p = { x: P.x - 10, y: P.y + 6 };
        return (y) => {
          const v = (y - 120) / 380;
          if (v < 0) return !0;
          const M = v < 1 ? Re(v) : v < 1.5 ? 1 : Math.max(0, 1 - (v - 1.5) / 0.5);
          if (M <= 0) return y < Math.min(n.dur, 1200) + 300;
          const I = 20,
            ke = [];
          for (let Se = 0; Se <= I; Se++) {
            const Ae = (Se / I) * M,
              St = -Math.sin(Ae * Math.PI) * (40 + n.tier * 8) * Math.max(0.2, 1 - v * 0.7),
              Jt = Math.sin(Ae * 7 - y / 60) * 4 * (1 - Ae);
            ke.push({
              x: _e(p.x, u.x, Ae) + Jt,
              y: _e(p.y, u.y, Ae) + St,
              w: Math.max(1, 2 + n.tier - Ae * 2.5),
            });
          }
          for (let Se = 1; Se < ke.length; Se++) {
            const Ae = ke[Se - 1],
              St = ke[Se];
            (Ee(Ae.x, Ae.y, St.x, St.y, Math.round(Ae.w) + 1, s[5]),
              Ee(Ae.x, Ae.y, St.x, St.y, Math.round(Ae.w), s[3]),
              Ae.w > 2 && Ee(Ae.x, Ae.y - 1, St.x, St.y - 1, 1, s[1]));
          }
          if (l && v >= 1 && v < 1.5)
            for (let Se = 0; Se < 3; Se++) V(u.x, u.y - 10 + Se * 10, 18, 5, s[3], 2);
          return (
            v >= 1 && !c && ((c = 1), Vn(o.t, n)),
            Gn(y, Math.min(n.dur, 1200) + 300, n),
            y < Math.min(n.dur, 1200) + 300
          );
        };
      },
      projectile(o, n) {
        const s = as[o.t],
          l = 3 + n.tier * 1.6,
          c = 260 + n.tier * 40,
          p = n.tier >= 3 ? 280 : 120;
        let y = 0;
        Te();
        const v = { x: P.x + 6, y: P.y - 6 };
        return (M) => {
          if (M < p) ps(v.x, v.y, M / p, s);
          else if (M < p + c) {
            const I = Re((M - p) / c),
              ke = dt(I, v, u, o.k === "bonemerang" ? 30 : 16);
            (ys(ke.x, ke.y, l, s),
              Math.random() < 0.7 &&
                qe(ke.x, ke.y, { pal: s, round: Qn.has(o.t), heat: 0.2, max: 220, size: 2, grav: 0 }));
          } else {
            const I = M - p - c;
            (y || ((y = 1), Vn(o.t, n)),
              I < 260 &&
                (J(u.x, u.y, l + I / 5, 2, I < 120 ? s[0] : s[2]),
                I < 100 && ys(u.x, u.y, l * (1 + I / 100), s)));
          }
          return (Gn(M, p + c + 400, n), M < p + c + 400);
        };
      },
      rafale(o, n) {
        const s = as[o.t],
          l = Ps[o.k] || 3 + n.tier,
          c = 70,
          p = 220;
        let y = 0;
        Te();
        const v = { x: P.x + 6, y: P.y - 6 },
          M = [];
        for (let I = 0; I < l; I++)
          M.push({
            ox: (Math.random() - 0.5) * 26,
            oy: (Math.random() - 0.5) * 20,
            lift: 6 + Math.random() * 18,
          });
        return (I) => {
          for (let ke = 0; ke < l; ke++) {
            const Se = (I - 80 - ke * c) / p;
            if (Se < 0) continue;
            const Ae = { x: u.x + M[ke].ox, y: u.y + M[ke].oy };
            if (Se < 1) {
              const St = dt(Se, v, Ae, M[ke].lift);
              Qn.has(o.t)
                ? ys(St.x, St.y, 2 + n.tier * 0.5, s)
                : (A(St.x, St.y, 3 + n.tier * 0.4, s[4]),
                  A(St.x, St.y, 2 + n.tier * 0.4, s[2]),
                  Z(St.x - 1, St.y - 1, 1, s[0]));
            } else y <= ke && ((y = ke + 1), Vn(o.t, n, Ae.x, Ae.y, ke === l - 1 ? 0.8 : 0.3));
          }
          return (Gn(I, 80 + l * c + p + 250, n), I < 80 + l * c + p + 250);
        };
      },
      souffle(o, n) {
        const s = as[o.t],
          l = n.dur,
          c = { x: P.x + 4, y: P.y - 6 },
          p = Math.atan2(u.y - c.y, u.x - c.x),
          y = Math.hypot(u.x - c.x, u.y - c.y);
        let v = 0,
          M = 0,
          I = 0;
        Te();
        const ke = o.t === "flying" || (o.t === "ice" && o.k === "icy-wind"),
          Se = Qn.has(o.t) || o.t === "ice";
        return (Ae) => {
          const St = Ae - I;
          I = Ae;
          const Jt = Ae > 150 && Ae < l - 150;
          if (Jt)
            for (M += (St / 16) * (1.5 + n.tier * 0.8); M >= 1;) {
              M--;
              const Oa = (Math.random() - 0.5) * (0.25 + n.tier * 0.06),
                Qa = 3 + Math.random();
              qe(c.x, c.y, {
                pal: s,
                round: Se,
                hot: 1,
                heat: 0.1 + Math.random() * 0.4,
                vx: Math.cos(p + Oa) * Qa,
                vy: Math.sin(p + Oa) * Qa,
                max: (y / Qa) * 16 * (0.85 + Math.random() * 0.3),
                size: Se ? 1.8 + n.tier * 0.7 + Math.random() * 1.5 : 2,
                grav: o.t === "fire" ? -0.01 : 0,
                drag: 1,
              });
            }
          if (ke && Jt)
            for (let Oa = 0; Oa < 2; Oa++) {
              const Qa = ((Ae - 150) / 300 + Oa / 2) % 1;
              (($.globalAlpha = Math.sin(Qa * Math.PI) * 0.8),
                Y(_e(c.x, u.x, Qa), _e(c.y, u.y, Qa), 8, 5, -2.4 + Ae / 120, -0.6 + Ae / 120, s[1], 2),
                ($.globalAlpha = 1));
            }
          return (!v && Ae > 150 + (y / 3.5) * 16 && ((v = 1), Vn(o.t, n)), Gn(Ae, l + 200, n), Ae < l + 200);
        };
      },
      rayon(o, n) {
        const s = as[o.t],
          l = { x: P.x + 6, y: P.y - 8 },
          c = u.x - l.x,
          p = u.y - l.y,
          y = Math.hypot(c, p),
          v = c / y,
          M = p / y,
          I = 180 + n.tier * 70,
          ke = 360 + n.tier * 60;
        let Se = 0;
        Te();
        const Ae = 2 + n.tier * 1.6,
          St = [
            [Ae + 2, s[4]],
            [Ae + 0.5, s[3]],
            [Ae * 0.65, s[2]],
            [Ae * 0.3, s[0]],
          ];
        return (Jt) => {
          if (Jt < I) ps(l.x, l.y, Jt / I, s);
          else if (Jt < I + ke) {
            const Oa = Math.min(1, (Jt - I) / 80),
              Qa = y * Oa,
              un = Jt > I + ke - 80 ? (I + ke - Jt) / 80 : 1,
              $n = 1 + Math.sin(Jt / 25) * 0.1;
            if (o.t === "electric") {
              const fs = ms._el || (ms._el = {});
              for (let ds = 0; ds < 2 + n.tier; ds++)
                we(
                  ie(fs, "b" + ds, 60, Jt + ds * 23, () =>
                    _(l, { x: l.x + v * Qa, y: l.y + M * Qa }, 26 + ds * 6, 1, 3),
                  ),
                  ds ? 1 : 2 + n.tier,
                );
              for (let ds = 0; ds < Qa; ds += 2) A(l.x + v * ds, l.y + M * ds, 1.5 * un, s[0]);
              if (Math.random() < 0.6) {
                const ds = Math.random() * Qa;
                T(l.x + v * ds, l.y + M * ds, 2, 1.4);
              }
            } else
              for (const [fs, ds] of St)
                for (let Fs = 0; Fs < Qa; Fs += 2)
                  A(l.x + v * Fs, l.y + M * Fs, Math.max(0.6, fs * un * $n), ds);
            Oa >= 1 &&
              (Se || ((Se = 1), Vn(o.t, n)),
              ys(u.x, u.y, Ae + 3 + Math.random() * 2, s),
              o.t === "electric" && Jt % 60 < 30 && ja(u.x, u.y, 22, 2),
              Jt % 80 < 17 && J(u.x, u.y, Ae + 8 + Math.random() * 8, 2, s[1]));
          }
          return (Gn(Jt, I + ke + 250, n), Jt < I + ke + 250);
        };
      },
      ciel(o, n) {
        const s = as[o.t],
          l = 1 + n.tier * (o.t === "rock" ? 2 : 1),
          c = 220;
        let p = 0;
        Te();
        const y = [];
        for (let v = 0; v < l; v++)
          y.push({
            t0: 220 + v * 90,
            x: u.x + (l > 1 ? (Math.random() - 0.5) * 50 : 0),
            y: u.y + (Math.random() - 0.5) * 12,
            r: 4 + n.tier * 1.5 + Math.random() * 2,
          });
        return (v) => {
          for (let M = 0; M < l; M++) {
            const I = y[M],
              ke = (v - I.t0) / c;
            if (!(ke < 0))
              if (ke < 1) {
                const Se = _e(-14, I.y, ke * ke);
                if (o.t === "electric")
                  we(
                    _({ x: I.x + (Math.random() - 0.5) * 8, y: -4 }, { x: I.x, y: Se }, 30, 1, 3),
                    2 + n.tier,
                  );
                else if (o.t === "rock") ls(I.x, Se, I.r, v / 200, M + 2);
                else {
                  for (let Ae = 1; Ae <= 4; Ae++)
                    (($.globalAlpha = 0.5 - Ae * 0.1),
                      A(I.x, Se - Ae * 6, I.r - Ae * 0.6, s[2]),
                      ($.globalAlpha = 1));
                  ys(I.x, Se, I.r, s);
                }
              } else
                p <= M &&
                  ((p = M + 1), Vn(o.t, n, I.x, I.y, M === l - 1 ? 1 : 0.35), J(I.x, I.y + 4, 6, 2, s[1]));
          }
          return (Gn(v, 220 + l * 90 + c + 300, n), v < 220 + l * 90 + c + 300);
        };
      },
      zone(o, n) {
        const s = as[o.t],
          l =
            (["ground", "rock", "fire"].includes(o.t) && o.c === "phys") ||
            o.k === "earth-power" ||
            o.k === "lava-plume" ||
            o.k === "eruption",
          c = o.k === "thrash" || o.k === "outrage",
          p = n.dur,
          y = { x: P.x, y: P.y - 4 };
        let v = 0;
        return (
          Te(),
          (M) => {
            const I = Math.max(0, (M - 180) / (p - 300));
            if (l)
              M > 150 &&
                M < p - 100 &&
                ((re = Math.max(re, n.shake * 0.6)),
                M % 90 < 17 &&
                  Ts(Math.random() * Je, Ze * 0.6 + Math.random() * Ze * 0.35, 4, 2, s, Qn.has(o.t), {
                    up: 1.5,
                    grav: 0.12,
                  }));
            else if (I > 0 && I < 1) {
              const ke = Re(I) * 300;
              for (let Se = 0; Se < 2; Se++)
                (($.globalAlpha = (1 - I) * 0.85),
                  J(y.x, y.y, Math.max(1, ke - Se * 9), 3, s[1 + Se]),
                  ($.globalAlpha = 1));
            }
            return (
              !v && (l ? M > 300 : Re(I) * 300 > Math.hypot(u.x - y.x, u.y - y.y)) && ((v = 1), Vn(o.t, n)),
              Gn(M, p + 150, n),
              M < p + 150
            );
          }
        );
      },
      piege(o, n) {
        const s = as[o.t],
          l = o.t === "bug";
        let c = 0;
        return (
          Te(),
          (p) => {
            const y = p - 140;
            if (y < 0) return !0;
            const v = Math.min(1, y / 420),
              M = y > 420 ? Math.max(0, 1 - (y - 420) / 200) : 1;
            if ((($.globalAlpha = M), l))
              for (let I = 0; I < 9; I++) {
                const ke = y / 70 + I * 0.7,
                  Se = 26 - v * 10,
                  Ae = u.x + Math.cos(ke) * Se,
                  St = u.y + Math.sin(ke) * Se * 0.5 - 4;
                (($.fillStyle = s[5]),
                  $.fillRect(Math.round(Ae), Math.round(St), 2, 2),
                  ($.fillStyle = s[1]),
                  $.fillRect(Math.round(Ae) - 1, Math.round(St) - 1, 1, 1));
              }
            else
              for (let I = 0; I < 4; I++) {
                const ke = u.y + 20 - I * 11,
                  Se = (22 - I * 2) * (1 - v * 0.35),
                  Ae = y / 55 + I * 0.8;
                (Y(u.x, ke, Se, Se * 0.32, Ae, Ae + 2.6, I % 2 ? s[1] : s[2], 3),
                  Y(u.x, ke, Se, Se * 0.32, Ae + 3.2, Ae + 4.2, s[3], 2),
                  o.t === "fire" && Math.random() < 0.5
                    ? qe(u.x + Math.cos(Ae) * Se, ke, {
                        round: 1,
                        heat: 0.3,
                        max: 260,
                        size: 2,
                        vy: -0.6,
                        grav: -0.02,
                      })
                    : Math.random() < 0.3 &&
                      qe(u.x + Math.cos(Ae) * Se, ke, {
                        pal: s,
                        round: Qn.has(o.t),
                        heat: 0.3,
                        max: 240,
                        size: 2,
                        vy: -0.3,
                        grav: 0,
                      }));
              }
            return (($.globalAlpha = 1), !c && y > 200 && ((c = 1), Vn(o.t, n)), y < 640);
          }
        );
      },
      mental(o, n) {
        const s = as[o.t];
        let l = 0;
        return (
          Te(),
          (c) => {
            for (let p = 0; p < 2 + n.tier; p++) {
              const y = (c - 120 - p * 110) / 280;
              if (y < 0 || y > 1) continue;
              const v = (30 + n.tier * 6) * (1 - Re(y)) + 5;
              V(u.x, u.y, v, v * 0.6, y < 0.5 ? s[2] : s[3], 2, y > 0.7 ? 0.5 : 0);
            }
            return (
              !l && c > 330 && ((l = 1), Vn(o.t, n)),
              l &&
                c < 750 &&
                c % 70 < 17 &&
                Rt(u.x + (Math.random() - 0.5) * 34, u.y + (Math.random() - 0.5) * 28, 2, s[0]),
              Gn(c, n.dur, n),
              c < Math.max(800, n.dur)
            );
          }
        );
      },
      drain(o, n) {
        const s = as[o.t];
        let l = 0,
          c = 0,
          p = 0;
        return (y) => {
          const v = y - p;
          if (((p = y), y < 200))
            for (let M = 0; M < 2; M++) {
              const I = Math.random() * 6.283;
              qe(u.x + Math.cos(I) * 22, u.y + Math.sin(I) * 18, {
                pal: s,
                vx: -Math.cos(I),
                vy: -Math.sin(I),
                heat: 0.2,
                max: 200,
                size: 2,
                grav: 0,
              });
            }
          if ((!l && y > 200 && ((l = 1), Vn(o.t, n)), y > 220 && y < 520 + n.tier * 100))
            for (c += (v / 16) * (1 + n.tier); c >= 1;) {
              c--;
              const M = { x: u.x + (Math.random() - 0.5) * 20, y: u.y + (Math.random() - 0.5) * 16 };
              qe(M.x, M.y, {
                pal: s,
                round: 1,
                hot: 1,
                heat: 0.1 + Math.random() * 0.3,
                vx: (P.x - M.x) / 40,
                vy: (P.y - 10 - M.y) / 40 - 0.5,
                max: 640,
                size: 1.5 + n.tier * 0.5,
                grav: 0.012,
                drag: 1,
              });
            }
          if (y > 700 && y < 1e3) {
            const M = (y - 700) / 300;
            (($.globalAlpha = 1 - M), J(P.x, P.y - 6, 10 + M * 14, 2, s[1]), ($.globalAlpha = 1));
          }
          return y < 1050;
        };
      },
    },
    ws = {
      "sacred-fire"(o, n) {
        const s = { x: P.x + 4, y: P.y - 6 };
        let l = 0;
        Te();
        const c = ["#ffffff", "#fff6b0", "#ffd23a", "#ff8a2a", "#e0284a", "#7a1030"];
        return (p) => {
          if ((Gn(p, 1500, n), p < 380)) {
            const y = p / 380;
            ys(s.x, s.y - y * 60, 4 + y * 4, c);
          } else if (p < 620) {
            const y = (p - 380) / 240,
              v = _e(s.x, u.x, y),
              M = _e(s.y - 60, -20, y);
            ys(v, M, 8, c);
          } else if (p < 1150) {
            const y = p - 620;
            for (let v = -10; v < u.y + 24; v += 3) {
              const M = 7 + Math.sin(v / 6 + p / 40) * 2;
              (A(u.x + Math.sin(v / 9 + p / 60) * 2, v, M + 2, c[4]),
                A(u.x, v, M, c[2]),
                A(u.x, v, M * 0.4, c[0]));
            }
            (l || ((l = 1), Vn("fire", n)),
              Math.random() < 0.8 &&
                qe(u.x + (Math.random() - 0.5) * 24, u.y + 20, {
                  round: 1,
                  heat: Math.random() * 0.4,
                  vx: (Math.random() - 0.5) * 2,
                  vy: -2 - Math.random() * 2,
                  max: 500,
                  size: 3,
                  grav: -0.02,
                }));
          }
          return p < 1500;
        };
      },
      aeroblast(o, n) {
        const s = { x: P.x + 6, y: P.y - 8 },
          l = u.x - s.x,
          c = u.y - s.y,
          p = Math.hypot(l, c),
          y = l / p,
          v = c / p,
          M = -v,
          I = y;
        let ke = 0;
        return (
          Te(),
          (Se) => {
            if ((Gn(Se, 1350, n), Se < 320)) ps(s.x, s.y, Se / 320, D);
            else if (Se < 1e3) {
              const Ae = Math.min(1, (Se - 320) / 100),
                St = p * Ae;
              for (let Jt = 0; Jt < St; Jt += 2)
                (A(s.x + y * Jt, s.y + v * Jt, 5, D[3]), A(s.x + y * Jt, s.y + v * Jt, 3, D[1]));
              for (const Jt of [0, Math.PI])
                for (let Oa = 0; Oa < St; Oa += 1.5) {
                  const Qa = Oa / 7 - Se / 30 + Jt,
                    un = Math.sin(Qa) * 10;
                  Z(
                    s.x + y * Oa + M * un,
                    s.y + v * Oa + I * un,
                    Math.cos(Qa) > 0 ? 2 : 1,
                    Math.cos(Qa) > 0 ? D[0] : D[4],
                  );
                }
              Ae >= 1 && (ke || ((ke = 1), Vn("flying", n)), ys(u.x, u.y, 10 + Math.random() * 3, D));
            }
            return Se < 1350;
          }
        );
      },
      psystrike(o, n) {
        let s = 0;
        Te();
        const l = [];
        for (let c = 0; c < 14; c++) {
          const p = (c / 14) * 6.283;
          l.push({ a: p, d: 70 + Math.random() * 30, t0: 200 + c * 35 });
        }
        return (c) => {
          if (
            (Gn(c, 1500, n),
            l.forEach((p) => {
              const y = (c - p.t0) / 260;
              if (y < 0 || y > 1.3) return;
              const v = p.d * (1 - Math.min(1, Re(y))),
                M = u.x + Math.cos(p.a) * v,
                I = u.y + Math.sin(p.a) * v * 0.7;
              y < 1 && ao(M, I, p.a + Math.PI, 10, 3, z);
            }),
            !s && c > 200 + 14 * 35 + 260)
          ) {
            ((s = 1), Vn("psychic", n));
            for (let p = 0; p < 3; p++) J(u.x, u.y, 10 + p * 8, 2, z[1 + p]);
          }
          if (s && c < 1350) {
            const p = c - 950;
            J(u.x, u.y, 10 + p / 4, 2, z[2]);
          }
          return c < 1500;
        };
      },
      "aura-sphere"(o, n) {
        const s = { x: P.x + 8, y: P.y - 6 },
          l = 300,
          c = ["#ffffff", "#c9f0ff", "#6fc8ff", "#2f7fe0", "#1c3f9a", "#0b1a44"];
        let p = 0;
        return (
          Te(),
          (y) => {
            if ((Gn(y, l + 700, n), y < l)) (ps(s.x, s.y, y / l, c), J(s.x, s.y, 14 - y / 30, 1, c[1]));
            else if (y < l + 380) {
              const v = Re((y - l) / 380),
                M = dt(v, s, u, 10 + Math.sin(y / 30) * 6);
              (ys(M.x, M.y, 8, c), J(M.x, M.y, 11 + Math.sin(y / 30) * 2, 1, c[1]));
            } else {
              const v = y - l - 380;
              (p || ((p = 1), Vn("fighting", n)),
                v < 300 && (J(u.x, u.y, 8 + v / 4, 3, c[1]), J(u.x, u.y, 4 + v / 6, 2, c[0])));
            }
            return y < l + 700;
          }
        );
      },
      eruption(o, n) {
        let s = 0;
        return (
          Te(),
          (l) => {
            if ((Gn(l, 1600, n), l < 380)) {
              for (let c = 0; c < 3; c++)
                qe(P.x + (Math.random() - 0.5) * 20, P.y - 10, {
                  round: 1,
                  heat: Math.random() * 0.3,
                  vx: (Math.random() - 0.5) * 1.5,
                  vy: -3 - Math.random() * 2,
                  max: 500,
                  size: 3,
                  grav: 0.02,
                });
              re = Math.max(re, 1.5);
            }
            if (l > 380 && l < 1100 && Math.random() < 0.7) {
              const c = u.x + (Math.random() - 0.5) * 80;
              qe(c, -8, {
                round: 1,
                heat: 0.2,
                vx: Math.random() - 0.5,
                vy: 3 + Math.random() * 2,
                max: 400,
                size: 3 + Math.random() * 2,
                grav: 0.05,
              });
            }
            return (
              !s && l > 560 && ((s = 1), Vn("fire", n)),
              s &&
                l < 1100 &&
                l % 120 < 17 &&
                ((re = Math.max(re, 3)), de(u.x + (Math.random() - 0.5) * 40, u.y + 16, 5)),
              l < 1600
            );
          }
        );
      },
      "future-sight"(o, n) {
        let s = 0;
        return (l) => {
          if ((Gn(l, 1300, n), l < 450))
            (l % 60 < 17 && Rt(u.x + (Math.random() - 0.5) * 40, u.y + (Math.random() - 0.5) * 30, 3, z[1]),
              V(u.x, u.y, 24, 10, z[3], 2, 0.6));
          else if (l < 900) {
            const c = l - 450;
            for (let p = -10; p < u.y + 20; p += 3) {
              const y = (8 + Math.sin(p / 5 + l / 30) * 2) * Math.min(1, c / 80);
              (A(u.x, p, y + 2, z[4]), A(u.x, p, y, z[2]), A(u.x, p, y * 0.4, z[0]));
            }
            s || ((s = 1), Vn("psychic", n));
          }
          return l < 1300;
        };
      },
      "tri-attack"(o, n) {
        let s = 0;
        Te();
        const l = [X, pa, Oe],
          c = { x: P.x + 6, y: P.y - 8 };
        return (p) => {
          const y = Math.min(1, Math.max(0, (p - 200) / 360)),
            v = _e(c.x, u.x, Re(y)),
            M = _e(c.y, u.y, Re(y)),
            I = 12 * (1 - y * 0.6);
          if (y < 1) {
            for (let ke = 0; ke < 3; ke++) {
              const Se = p / 90 + ke * 2.09;
              ys(v + Math.cos(Se) * I, M + Math.sin(Se) * I, 4, l[ke]);
            }
            Ee(
              v + Math.cos(p / 90) * I,
              M + Math.sin(p / 90) * I,
              v + Math.cos(p / 90 + 2.09) * I,
              M + Math.sin(p / 90 + 2.09) * I,
              1,
              dn[0],
            );
          } else s || ((s = 1), Vn("normal", n), l.forEach((ke) => Ts(u.x, u.y, 6, 2, ke, 1)));
          return p < 950;
        };
      },
      "hidden-power"(o, n) {
        const s = { x: P.x + 6, y: P.y - 6 };
        let l = 0;
        return (
          Te(),
          (c) => {
            for (let p = 0; p < 6; p++) {
              const y = (p / 6) * 6.283 + c / 150;
              let v, M;
              if (c < 400) ((v = s.x + Math.cos(y) * 16), (M = s.y + Math.sin(y) * 10));
              else {
                const I = Math.min(1, (c - 400 - p * 30) / 260);
                if (I >= 1) continue;
                ((v = _e(s.x + Math.cos(y) * 16, u.x, Re(Math.max(0, I)))),
                  (M = _e(s.y + Math.sin(y) * 10, u.y, Re(Math.max(0, I)))));
              }
              ys(v, M, 3, dn);
            }
            return (c > 700 && !l && ((l = 1), Vn("normal", n)), c < 950);
          }
        );
      },
      "pay-day"(o, n) {
        let s = 0;
        Te();
        const l = { x: P.x + 4, y: P.y - 10 },
          c = ["#ffffff", "#fff3a8", "#ffd23a", "#d99a14", "#8a5a08", "#3a2604"];
        return (p) => {
          for (let y = 0; y < 5; y++) {
            const v = (p - 80 - y * 60) / 260;
            if (v < 0) continue;
            const M = { x: u.x + (y - 2) * 6, y: u.y };
            if (v < 1) {
              const I = dt(v, l, M, 24),
                ke = Math.abs(Math.cos(p / 40 + y)) * 4 + 1;
              (A(I.x, I.y, 4, c[4]),
                ($.fillStyle = c[2]),
                $.fillRect(Math.round(I.x - ke / 2), Math.round(I.y - 3), Math.round(ke), 6),
                Z(I.x - 1, I.y - 2, 1, c[0]));
            } else
              s <= y &&
                ((s = y + 1),
                Vn("normal", n, M.x, M.y, 0.3),
                Rt(M.x, M.y - 6, 3, c[1]),
                qe(M.x, M.y, {
                  pal: c,
                  vx: (Math.random() - 0.5) * 2,
                  vy: -2.5,
                  max: 600,
                  size: 3,
                  grav: 0.15,
                }));
          }
          return p < 900;
        };
      },
      "rapid-spin"(o, n) {
        let s = 0;
        const l = f("#atk"),
          c = Ot(0.8);
        return (
          l.animate(
            [
              { transform: "scaleX(-1)" },
              { transform: `translate(${c.x}px,${c.y * 0.6}px) scaleX(-1) rotate(720deg)`, offset: 0.45 },
              { transform: "scaleX(-1) rotate(1080deg)" },
            ],
            { duration: 800 / De, easing: "cubic-bezier(.3,.7,.3,1)" },
          ),
          (p) => {
            if (p < 360) {
              const y = p / 360;
              for (let v = 0; v < 3; v++) {
                const M = p / 30 + v * 2.1;
                Y(_e(P.x, u.x, y), _e(P.y, u.y, y), 16, 6, M, M + 1.6, dn[1], 2);
              }
            }
            return (p > 360 && !s && ((s = 1), Vn("normal", n)), p < 800);
          }
        );
      },
      rollout(o, n) {
        let s = 0;
        const l = f("#atk"),
          c = { x: P.x, y: P.y + 14 },
          p = { x: u.x - 6, y: u.y + 18 },
          y = 16,
          v = (M, I, ke) => {
            ls(M, I, y, ke, 4);
            for (let Se = 0; Se < 3; Se++) {
              const Ae = ke + Se * 2.1;
              Ee(
                M + Math.cos(Ae) * 3,
                I + Math.sin(Ae) * 3,
                M + Math.cos(Ae) * (y - 2),
                I + Math.sin(Ae) * (y - 2),
                1,
                Xn[4],
              );
            }
          };
        return (M) => {
          if (M < 160)
            (s ||
              ((s = 1),
              l.animate(
                [
                  { transform: "scaleX(-1)", opacity: 1 },
                  { transform: "scaleX(-1) scale(.6) rotate(-120deg)", opacity: 0 },
                ],
                { duration: 160 / De, fill: "forwards" },
              )),
              v(c.x, c.y, -M / 30));
          else if (M < 520) {
            const I = (M - 160) / 360,
              ke = I * I,
              Se = _e(c.x, p.x, ke),
              Ae = _e(c.y, p.y, ke);
            (v(Se, Ae, Se / y), M % 40 < 17 && Kn(Se - y, Ae + y - 2, 2, 8), (re = Math.max(re, 0.8)));
          } else if (M < 900) {
            s < 2 && ((s = 2), Vn("rock", n), Kn(p.x, p.y + y, 8, 30));
            const I = (M - 520) / 380,
              ke = 1 - (1 - I) * (1 - I),
              Se = _e(p.x, c.x, ke),
              Ae = _e(p.y, c.y, ke) - Math.sin(Math.min(1, I * 2) * Math.PI) * 14 * (I < 0.5 ? 1 : 0);
            (v(Se, Ae, -Se / y), M % 50 < 17 && Kn(Se + y, Ae + y - 2, 1, 8));
          } else
            s < 3 &&
              ((s = 3),
              l.getAnimations().forEach((I) => I.cancel()),
              l.animate(
                [
                  { transform: "scaleX(-1) scale(.6) rotate(120deg)", opacity: 0 },
                  { transform: "scaleX(-1) scale(1.08,.92)", opacity: 1, offset: 0.7 },
                  { transform: "scaleX(-1)", opacity: 1 },
                ],
                { duration: 200 / De },
              ),
              Kn(c.x, c.y + y, 4, 20));
          return M < 1150;
        };
      },
      "u-turn"(o, n) {
        return Bs(n, "bug");
      },
      "volt-switch"(o, n) {
        return Bs(n, "electric");
      },
      acrobatics(o, n) {
        let s = 0;
        const l = f("#atk"),
          c = Ot(0.8);
        return (
          l.animate(
            [
              { transform: "scaleX(-1)" },
              {
                transform: `translate(${c.x * 0.5}px,${c.y - 70}px) scaleX(-1) rotate(-360deg)`,
                offset: 0.35,
              },
              { transform: `translate(${c.x}px,${c.y * 0.6}px) scaleX(-1) rotate(-360deg)`, offset: 0.5 },
              { transform: "scaleX(-1) rotate(-360deg)" },
            ],
            { duration: 950 / De, easing: "cubic-bezier(.3,.7,.3,1)" },
          ),
          (p) => (
            p < 470 &&
              p % 40 < 17 &&
              qe(_e(P.x, u.x, p / 470), _e(P.y, u.y - 50, Math.sin((p / 470) * Math.PI)), {
                pal: D,
                heat: 0.2,
                max: 260,
                size: 2,
                grav: 0,
              }),
            p > 470 && !s && ((s = 1), Vn("flying", n)),
            p < 950
          )
        );
      },
      bonemerang(o, n) {
        return po(o, n, 2);
      },
      "bone-rush"(o, n) {
        return po(o, n, 3);
      },
      bounce(o, n) {
        let s = 0;
        const l = f("#atk"),
          c = Ot(0.85);
        return (
          l.animate(
            [
              { transform: "scaleX(-1)" },
              { transform: "scaleX(-1) translateY(6px) scale(1.15,.85)", offset: 0.12 },
              { transform: "scaleX(-1) translateY(-420px) scale(.85,1.15)", offset: 0.35 },
              { transform: `translate(${c.x}px,-420px) scaleX(-1)`, offset: 0.5 },
              { transform: `translate(${c.x}px,${c.y * 0.6}px) scaleX(-1) scale(1.2,.8)`, offset: 0.65 },
              { transform: "scaleX(-1)" },
            ],
            { duration: 1300 / De, easing: "cubic-bezier(.3,.7,.3,1)" },
          ),
          (p) => {
            if (p > 650 && p < 840) {
              const y = (p - 650) / 190;
              (($.globalAlpha = 0.3), V(u.x, u.y + 28, 6 + y * 16, 2 + y * 4, D[4], 2), ($.globalAlpha = 1));
            }
            return (p > 845 && !s && ((s = 1), Vn("flying", n), Kn(u.x, u.y + 28, 8, 40)), p < 1300);
          }
        );
      },
      dive(o, n) {
        let s = 0;
        const l = f("#atk"),
          c = Ot(1);
        return (
          l.animate(
            [
              { transform: "scaleX(-1)", opacity: 1 },
              { transform: "scaleX(-1) translateY(40%)", opacity: 0, offset: 0.25 },
              { transform: `translate(${c.x}px,${c.y + 40}px) scaleX(-1)`, opacity: 0, offset: 0.5 },
              { transform: `translate(${c.x}px,${c.y - 30}px) scaleX(-1)`, opacity: 1, offset: 0.62 },
              { transform: "scaleX(-1)", opacity: 1 },
            ],
            { duration: 1300 / De, easing: "cubic-bezier(.3,.7,.3,1)" },
          ),
          (p) => {
            if ((p < 330 && p % 40 < 17 && Dt(P.x, P.y + 20, 4, 2), p > 330 && p < 650)) {
              const y = (p - 330) / 320;
              V(_e(P.x, u.x, y), _e(P.y + 24, u.y + 30, y), 10, 3, wt[2], 2);
            }
            return (p > 650 && !s && ((s = 1), Vn("water", n), Dt(u.x, u.y + 26, 20, 3)), p < 1300);
          }
        );
      },
      "raging-bull"(o, n) {
        let s = 0;
        const l = f("#atk"),
          c = Ot(0.82);
        return (
          Te(),
          Wa(
            () =>
              l.animate(
                [
                  { transform: "scaleX(-1)" },
                  { transform: `translate(${c.x}px,${c.y * 0.6}px) scaleX(-1)`, offset: 0.3 },
                  { transform: `translate(${c.x}px,${c.y * 0.6}px) scaleX(-1)`, offset: 0.55 },
                  { transform: "scaleX(-1)" },
                ],
                { duration: 800 / De, easing: "cubic-bezier(.3,.7,.3,1)" },
              ),
            340 / De,
          ),
          (p) => (
            p < 340 && p % 110 < 17 && Kn(P.x - 8, P.y + 22, 3, 14),
            p > 340 &&
              p < 580 &&
              Kn(_e(P.x, u.x, (p - 340) / 240), _e(P.y + 22, u.y + 28, (p - 340) / 240), 1, 10),
            p > 580 && !s && ((s = 1), Vn("normal", n), J(u.x, u.y, 14, 3, dn[0])),
            p < 1200
          )
        );
      },
      "high-jump-kick"(o, n) {
        let s = 0;
        const l = f("#atk"),
          c = Ot(0.82);
        return (
          Te(),
          l.animate(
            [
              { transform: "scaleX(-1)" },
              { transform: `translate(${c.x * 0.5}px,-160px) scaleX(-1)`, offset: 0.35 },
              { transform: `translate(${c.x}px,${c.y * 0.6}px) scaleX(-1) rotate(20deg)`, offset: 0.5 },
              { transform: "scaleX(-1)" },
            ],
            { duration: 1200 / De, easing: "cubic-bezier(.3,.7,.3,1)" },
          ),
          (p) => {
            if ((Gn(p, 1200, n), p > 420 && p < 600)) {
              const y = (p - 420) / 180;
              for (let v = 0; v < 4; v++)
                Ee(
                  _e(u.x - 60, u.x, y) - v * 6,
                  _e(-20, u.y, y) - v * 10,
                  _e(u.x - 60, u.x, y) - v * 6 - 6,
                  _e(-20, u.y, y) - v * 10 - 12,
                  1,
                  q[1],
                );
            }
            return (
              p > 600 && !s && ((s = 1), Vn("fighting", n), Ft(u.x, u.y, 20, -2.6, -0.4, 8, q[3])),
              p < 1200
            );
          }
        );
      },
      "head-smash"(o, n) {
        let s = 0;
        const l = f("#atk"),
          c = Ot(0.82);
        return (
          Te(),
          Wa(
            () =>
              l.animate(
                [
                  { transform: "scaleX(-1)" },
                  { transform: `translate(${c.x}px,${c.y * 0.6}px) scaleX(-1)`, offset: 0.25 },
                  {
                    transform: `translate(${c.x * 0.6}px,${c.y * 0.5 - 30}px) scaleX(-1) rotate(-30deg)`,
                    offset: 0.5,
                  },
                  { transform: "scaleX(-1) rotate(-10deg)", offset: 0.8 },
                  { transform: "scaleX(-1)" },
                ],
                { duration: 1100 / De, easing: "cubic-bezier(.3,.7,.3,1)" },
              ),
            300 / De,
          ),
          (p) => {
            if ((Gn(p, 1500, n), p < 300 && ps(P.x + 10, P.y - 12, p / 300, Xn), p > 575 && !s)) {
              ((s = 1), Vn("rock", n, u.x, u.y, 1.2));
              for (let y = 0; y < 6; y++)
                qe(u.x, u.y, {
                  pal: Xn,
                  vx: (Math.random() - 0.5) * 4,
                  vy: -2 - Math.random() * 2,
                  max: 600,
                  size: 3,
                  grav: 0.15,
                });
            }
            if (p > 900 && p < 1200) {
              const y = (p - 900) / 300;
              Bn(P.x, P.y - 30, p, 2);
            }
            return p < 1500;
          }
        );
      },
      "extreme-speed"(o, n) {
        let s = 0;
        const l = f("#atk"),
          c = Ot(0.82);
        return (
          l.animate(
            [{ opacity: 1 }, { opacity: 0, offset: 0.1 }, { opacity: 0, offset: 0.85 }, { opacity: 1 }],
            { duration: 750 / De },
          ),
          (p) => {
            for (let y = 0; y < 3; y++) {
              const v = p - 100 - y * 110;
              if (v < 0 || v > 120) continue;
              const M = y * 2.2 + 0.5;
              for (let I = 0; I < 4; I++)
                Ee(
                  u.x - Math.cos(M) * (60 - v / 2) + I,
                  u.y - Math.sin(M) * (60 - v / 2),
                  u.x - Math.cos(M) * (20 - v / 6),
                  u.y - Math.sin(M) * (20 - v / 6),
                  1,
                  dn[0],
                );
              v > 80 && s <= y && ((s = y + 1), Vn("normal", n, u.x, u.y, y === 2 ? 1 : 0.4));
            }
            return p < 750;
          }
        );
      },
      outrage(o, n) {
        return Ls(o, n, ht, "dragon");
      },
      thrash(o, n) {
        return Ls(o, n, dn, "normal");
      },
      comeuppance(o, n) {
        let s = 0;
        return (l) => {
          if (l < 350) V(P.x, P.y, 26 - l / 20, 12, fn[2], 2);
          else if (l < 650) {
            const c = (l - 350) / 300;
            J(_e(P.x, u.x, c), _e(P.y, u.y, c), 10, 3, fn[3]);
          } else s || ((s = 1), Vn("dark", n));
          return l < 950;
        };
      },
      "sludge-wave"(o, n) {
        const s = ["#f4ffd6", "#c8ff5a", "#b45cff", "#7a2fc4", "#5a1f99", "#3a1460"],
          l = ["#f0dcff", "#e7c6ff", "#c8ff5a", "#b45cff", "#9a4ae0", "#7a2fc4"],
          c = jt(),
          p = wt.slice(),
          y = Fe.slice();
        let v = 0;
        return (M) => {
          (s.forEach((ke, Se) => (wt[Se] = ke)), l.forEach((ke, Se) => (Fe[Se] = ke)));
          let I;
          try {
            I = c(M);
          } finally {
            (p.forEach((ke, Se) => (wt[Se] = ke)), y.forEach((ke, Se) => (Fe[Se] = ke)));
          }
          if (
            (M > 300 && M < 1e3 && M % 60 < 17 && Ut(Math.random() * Je, Ze - 10 - Math.random() * 60, 20, 1),
            !v && M > 650)
          ) {
            ((v = 1), Be(2, 700));
            for (let ke = 0; ke < 3; ke++)
              qe(u.x - 12 + ke * 12, u.y - 4, {
                pal: Ha,
                round: 1,
                heat: 0.3,
                vy: 0.4,
                max: 600,
                size: 2,
                grav: 0.02,
              });
          }
          return I;
        };
      },
      "bullet-seed"(o, n) {
        let s = 0;
        Te();
        const l = { x: P.x + 6, y: P.y - 6 },
          c = [0, 1, 2, 3, 4].map(() => ({ ox: (Math.random() - 0.5) * 24, oy: (Math.random() - 0.5) * 18 }));
        return (p) => (
          c.forEach((y, v) => {
            const M = (p - 80 - v * 65) / 200;
            if (M < 0) return;
            const I = { x: u.x + y.ox, y: u.y + y.oy };
            if (M < 1) {
              const ke = _e(l.x, I.x, M),
                Se = _e(l.y, I.y, M);
              (A(ke, Se, 2.6, "#4a2e12"), A(ke, Se, 1.8, "#a8703a"), Z(ke - 1, Se - 1, 1, "#f2d7a0"));
            } else
              s <= v &&
                ((s = v + 1),
                Vn("grass", n, I.x, I.y, v === 4 ? 0.8 : 0.3),
                qe(I.x, I.y, {
                  pal: ["#f2d7a0", "#d9a85e", "#a8703a", "#7d5226", "#4a2e12", "#2e1d0d"],
                  vx: -1 - Math.random(),
                  vy: -2,
                  max: 500,
                  size: 2,
                  grav: 0.15,
                }));
          }),
          p < 80 + 5 * 65 + 450
        );
      },
      "razor-leaf"(o, n) {
        let s = 0;
        Te();
        const l = { x: P.x + 6, y: P.y - 6 },
          c = [0, 1, 2, 3].map((p) => ({
            lift: (p % 2 ? -1 : 1) * (10 + Math.random() * 18),
            oy: (Math.random() - 0.5) * 18,
          }));
        return (p) => (
          c.forEach((y, v) => {
            const M = (p - 60 - v * 70) / 300;
            if (M < 0) return;
            const I = { x: u.x, y: u.y + y.oy };
            if (M < 1) {
              const ke = dt(Re(M), l, I, y.lift),
                Se = (p / 25) * (v % 2 ? -1 : 1);
              for (let Ae = 1; Ae <= 2; Ae++) {
                const St = dt(Re(Math.max(0, M - Ae * 0.05)), l, I, y.lift);
                (($.globalAlpha = 0.3), $s(St.x, St.y, Se - Ae * 0.6, 1.8), ($.globalAlpha = 1));
              }
              $s(ke.x, ke.y, Se, 2.4);
            } else
              s <= v &&
                ((s = v + 1),
                Vn("grass", n, I.x, I.y, v === 3 ? 1 : 0.35),
                js(I.x, I.y, v % 2 ? 2.3 : 0.8, 24, 1, 0, 1, ln, 2));
          }),
          p < 60 + 4 * 70 + 500
        );
      },
      "magical-leaf"(o, n) {
        let s = 0;
        Te();
        const l = { x: P.x + 6, y: P.y - 10 };
        return (c) => {
          for (let p = 0; p < 4; p++) {
            const y = p * 1.57 + c / 140;
            let v, M;
            if (c < 380) ((v = l.x + Math.cos(y) * 16), (M = l.y + Math.sin(y) * 9));
            else {
              const I = Math.min(1, (c - 380 - p * 45) / 280);
              if (I >= 1) {
                s <= p && ((s = p + 1), Vn("grass", n, u.x, u.y, p === 3 ? 1 : 0.3));
                continue;
              }
              const ke = dt(
                Re(Math.max(0, I)),
                { x: l.x + Math.cos(y) * 16, y: l.y + Math.sin(y) * 9 },
                u,
                40 - p * 15,
              );
              ((v = ke.x), (M = ke.y));
            }
            (A(v, M, 4, "#f4ffb0"),
              ($.globalAlpha = 0.5),
              A(v, M, 6, "#b8f060"),
              ($.globalAlpha = 1),
              $s(v, M, c / 60 + p, 1.8),
              Math.random() < 0.5 && Rt(v - 3, M + 2, 1, "#ffffff"));
          }
          return c < 1e3;
        };
      },
      "seed-bomb"(o, n) {
        let s = 0;
        Te();
        const l = { x: P.x + 6, y: P.y - 10 };
        return (c) => {
          const p = (c - 120) / 380;
          if (p < 0) return !0;
          if (p < 1) {
            const y = dt(p, l, u, 50),
              v = c / 60;
            (A(y.x, y.y, 6, "#2e1d0d"),
              A(y.x, y.y, 5, "#7d5226"),
              A(y.x - 1, y.y - 2, 2.5, "#b07a38"),
              Et(y.x + Math.cos(v) * 3, y.y - 6, -1.6, 1));
          } else {
            const y = c - 500;
            if (!s) {
              ((s = 1), Vn("grass", n), (pt = 40));
              for (let v = 0; v < 8; v++) {
                const M = Math.random() * 6.283,
                  I = 1.5 + Math.random() * 2;
                Ga.push({
                  x: u.x,
                  y: u.y,
                  vx: Math.cos(M) * I,
                  vy: Math.sin(M) * I - 1.5,
                  ang: Math.random() * 6,
                  va: (Math.random() - 0.5) * 0.4,
                  sw: Math.random() * 6,
                  life: 0,
                  max: 800,
                });
              }
              de(u.x, u.y, 1);
            }
            y < 220 &&
              (A(u.x, u.y, 12 - y / 20, "#f4ffb0"),
              J(u.x, u.y, 8 + y / 4, 3, "#6fcf3a"),
              J(u.x, u.y, 5 + y / 6, 2, "#a8703a"));
          }
          return c < 1050;
        };
      },
      "petal-blizzard"(o, n) {
        let s = 0;
        Te();
        const l = f("#tint");
        return (
          (l.style.background = "#ff8ab8"),
          (c) => {
            if (
              ((l.style.opacity = c < 950 ? Math.min(0.15, c / 1500) : Math.max(0, 0.15 - (c - 950) / 200)),
              c < 900)
            )
              for (let p = 0; p < 4; p++)
                Ga.push({
                  x: -10 - Math.random() * 40,
                  y: Math.random() * Ze * 0.9,
                  vx: 4 + Math.random() * 2,
                  vy: 0.5 + Math.random(),
                  ang: Math.random() * 6,
                  va: (Math.random() - 0.5) * 0.4,
                  sw: Math.random() * 6,
                  life: 0,
                  max: 900,
                  petal: 1,
                  c: In[1 + ((Math.random() * 3) | 0)],
                });
            return (
              !s && c > 450 && ((s = 1), Vn("grass", n)),
              s && c < 900 && c % 120 < 17 && (re = Math.max(re, 1.5)),
              c < 1150
            );
          }
        );
      },
      "leaf-blade"(o, n) {
        let s = 0;
        return (
          Us(0.8, 850, !1),
          (l) => {
            const c = l - 200;
            if (c > 0 && c < 380) {
              const p = Math.min(1, c / 70),
                y = Math.max(0, (c - 140) / 240),
                v = y * y * (3 - 2 * y);
              (($.globalAlpha = 1 - v),
                Ft(u.x + 4, u.y + 4, 26, -2.5 + 2.6 * v * 0.8, -2.5 + 2.6 * p, 9, "#22612a"),
                Ft(u.x + 4, u.y + 4, 26, -2.5 + 2.6 * v * 0.8, -2.5 + 2.6 * p, 6, "#6fcf3a"),
                Ft(u.x + 4, u.y + 4, 26, -2.5 + 2.6 * v * 0.8, -2.5 + 2.6 * p, 2, "#f2ffd0"),
                ($.globalAlpha = 1));
              for (let M = 0; M < 6; M++) {
                const I = -2.5 + (2.6 * p * M) / 6;
                p > M / 6 &&
                  c < 160 &&
                  (($.fillStyle = "#3d9a2a"),
                  $.fillRect(
                    Math.round(u.x + 4 + Math.cos(I) * 31),
                    Math.round(u.y + 4 + Math.sin(I) * 31),
                    2,
                    1,
                  ));
              }
            }
            if (c > 50 && !s) {
              ((s = 1), Vn("grass", n));
              for (let p = 0; p < 5; p++)
                Ga.push({
                  x: u.x,
                  y: u.y,
                  vx: (Math.random() - 0.5) * 3,
                  vy: -1.5 - Math.random(),
                  ang: Math.random() * 6,
                  va: 0.3,
                  sw: Math.random() * 6,
                  life: 0,
                  max: 700,
                });
            }
            return l < 850;
          }
        );
      },
      "leaf-storm"(o, n) {
        let s = 0;
        return (
          Te(),
          (l) => {
            Gn(l, 1500, n);
            const c = Math.min(1, Math.max(0, (l - 200) / 600)),
              p = _e(P.x, u.x, Re(c)),
              y = _e(P.y, u.y, Re(c));
            if (l > 150 && l < 1250) {
              const v = 10 + c * 26,
                M = l > 1050 ? (1250 - l) / 200 : 1;
              $.globalAlpha = M;
              for (let I = 0; I < 18; I++) {
                const ke = l / 70 + I * 0.35,
                  Se = (I / 18 - 0.5) * (40 + c * 30),
                  Ae = v * (0.6 + 0.4 * Math.sin(I * 1.7));
                $s(p + Math.cos(ke) * Ae, y + Se * 0.7 + Math.sin(ke) * Ae * 0.3, ke + 1.5, 1.4);
              }
              for (let I = 0; I < 4; I++)
                Y(p, y + (I - 1.5) * 12, v * 0.9, v * 0.3, l / 60 + I, l / 60 + I + 2, ln[1], 1);
              $.globalAlpha = 1;
            }
            return (
              !s && c >= 1 && ((s = 1), Vn("grass", n)),
              s && l < 1100 && l % 110 < 17 && (re = Math.max(re, 2.5)),
              l < 1500
            );
          }
        );
      },
      "power-whip"(o, n) {
        const s = ms.queue(o, n);
        return (l) => {
          const c = s(l);
          if (l > 120 && l < 700 && Math.random() < 0.5) {
            const p = Math.min(1, (l - 120) / 380);
            Ga.push({
              x: _e(P.x, u.x, p * Math.random()),
              y: _e(P.y, u.y, p) - 30 * Math.random(),
              vx: Math.random() - 0.5,
              vy: -0.5,
              ang: Math.random() * 6,
              va: 0.3,
              sw: Math.random() * 6,
              life: 0,
              max: 600,
            });
          }
          return c;
        };
      },
      "wood-hammer"(o, n) {
        const s = ms.contact(o, n);
        let l = 0;
        return (c) => {
          const p = s(c);
          if (!l && pt > 0) {
            l = 1;
            const y = ["#f2d7a0", "#d9a85e", "#b07a38", "#7d5226", "#523418", "#2e1d0d"];
            for (let v = 0; v < 12; v++) {
              const M = Math.random() * 6.283;
              qe(u.x, u.y, {
                pal: y,
                vx: Math.cos(M) * 3,
                vy: Math.sin(M) * 3 - 1.5,
                max: 600,
                size: 2 + ((Math.random() * 2) | 0),
                grav: 0.15,
                drag: 0.97,
              });
            }
            for (let v = 0; v < 6; v++)
              Ga.push({
                x: u.x,
                y: u.y,
                vx: (Math.random() - 0.5) * 4,
                vy: -2 - Math.random(),
                ang: Math.random() * 6,
                va: 0.3,
                sw: Math.random() * 6,
                life: 0,
                max: 800,
              });
          }
          return p;
        };
      },
      "power-gem"(o, n) {
        let s = 0,
          l = 0,
          c = 0;
        Te();
        const p = { x: P.x + 6, y: P.y - 8 },
          y = Math.atan2(u.y - p.y, u.x - p.x),
          v = Math.hypot(u.x - p.x, u.y - p.y),
          M = [
            ["#ffffff", "#ffd0e0", "#ff5f8a", "#c2185b"],
            ["#ffffff", "#c9fbff", "#3fc4ff", "#1f6fe8"],
            ["#ffffff", "#fff3a8", "#ffd23a", "#c98a0a"],
            ["#ffffff", "#d8ffd0", "#4fcf6a", "#1f8a3a"],
          ],
          I = [];
        return (ke) => {
          const Se = ke - c;
          if (((c = ke), ke < 220))
            for (let Ae = 0; Ae < 4; Ae++) {
              const St = ke / 80 + Ae * 1.57,
                Jt = M[Ae];
              N(p.x + Math.cos(St) * 10, p.y + Math.sin(St) * 6, 2, 3, St, Jt[2], Jt[3]);
            }
          else if (ke < 700)
            for (l += (Se / 16) * 1.2; l >= 1;)
              (l--,
                I.push({
                  t0: ke,
                  c: M[(Math.random() * 4) | 0],
                  off: (Math.random() - 0.5) * 10,
                  rot: Math.random() * 6,
                  sz: 2.5 + Math.random() * 2,
                }));
          for (let Ae = I.length - 1; Ae >= 0; Ae--) {
            const St = I[Ae],
              Jt = (ke - St.t0) / 260;
            if (Jt >= 1) {
              I.splice(Ae, 1);
              continue;
            }
            const Oa = p.x + Math.cos(y) * v * Jt - Math.sin(y) * St.off,
              Qa = p.y + Math.sin(y) * v * Jt + Math.cos(y) * St.off,
              un = St.rot + ke / 60;
            (N(Oa, Qa, St.sz, St.sz * 1.6, un, St.c[2], St.c[3]),
              Z(Oa - 1, Qa - 1, 1, St.c[0]),
              Math.random() < 0.2 && Rt(Oa, Qa, 2, St.c[1]));
          }
          if (!s && ke > 480) {
            ((s = 1), Vn("rock", n));
            for (let Ae = 0; Ae < 8; Ae++)
              ka(u.x + (Math.random() - 0.5) * 30, u.y + (Math.random() - 0.5) * 24, {
                s: 3,
                c: M[Ae % 4][1],
                max: 500,
              });
          }
          return ke < 1050;
        };
      },
      "echoed-voice"(o, n) {
        return qs(o, n, 2);
      },
      round(o, n) {
        return qs(o, n, 3);
      },
      "disarming-voice"(o, n) {
        return qs(o, n, 3, 1);
      },
      snarl(o, n) {
        return qs(o, n, 3);
      },
      "hyper-voice"(o, n) {
        return qs(o, n, 5);
      },
      uproar(o, n) {
        return qs(o, n, 6);
      },
      "bug-buzz"(o, n) {
        return qs(o, n, 5);
      },
      "struggle-bug"(o, n) {
        return qs(o, n, 3);
      },
      discharge(o, n) {
        let s = 0;
        return (
          Te(),
          (l) => {
            if (l > 150 && l < 850) {
              const c = Math.min(1, (l - 150) / 250) * 40;
              for (let p = 0; p < 4; p++) {
                const y = l / 90 + p * 1.57;
                we(_(P, { x: P.x + Math.cos(y) * c, y: P.y + Math.sin(y) * c * 0.6 }, 20, 0, 2), 1);
              }
              (l > 350 && we(_(P, u, 34, 2, 3), 2),
                l % 70 < 17 && T(P.x + (Math.random() - 0.5) * 50, P.y + (Math.random() - 0.5) * 30, 3, 1.5));
            }
            return (!s && l > 380 && ((s = 1), Vn("electric", n)), Gn(l, 1100, n), l < 1100);
          }
        );
      },
      "ancient-power"(o, n) {
        let s = 0;
        Te();
        const l = [0, 1, 2, 3, 4].map((c) => ({ a: c * 1.26, sz: 7 + Math.random() * 4 }));
        return (c) => (
          l.forEach((p, y) => {
            let v, M;
            if (c < 500) {
              const I = Math.min(1, c / 250);
              ((v = P.x + Math.cos(p.a + c / 200) * 34), (M = P.y - I * 34 + Math.sin(p.a + c / 200) * 10));
            } else {
              const I = (c - 500 - y * 50) / 260;
              if (I >= 1) {
                s <= y && ((s = y + 1), Vn("rock", n, u.x, u.y, y === 4 ? 1 : 0.3));
                return;
              }
              const ke = Math.max(0, I),
                Se = P.x + Math.cos(p.a + 2.5) * 26,
                Ae = P.y - 10;
              ((v = _e(Se, u.x + (y - 2) * 6, Re(ke))), (M = _e(Ae, u.y, Re(ke))));
            }
            (ls(v, M, p.sz, c / 150 + y, y + 9), c < 500 && c % 80 < 17 && Rt(v, M - p.sz, 2, "#fff3a8"));
          }),
          c < 1150
        );
      },
      "muddy-water"(o, n) {
        const s = ["#f2d7a0", "#d9a85e", "#b07a38", "#7d5226", "#523418", "#2e1d0d"],
          l = ["#f2d7a0", "#e6c48a", "#d9a85e", "#b07a38", "#9a6a32", "#7d5226"],
          c = jt(),
          p = wt.slice(),
          y = Fe.slice();
        return (v) => {
          (s.forEach((M, I) => (wt[I] = M)), l.forEach((M, I) => (Fe[I] = M)));
          try {
            return c(v);
          } finally {
            (p.forEach((M, I) => (wt[I] = M)), y.forEach((M, I) => (Fe[I] = M)));
          }
        };
      },
      "aurora-beam"(o, n) {
        let s = 0;
        Te();
        const l = { x: P.x + 6, y: P.y - 8 },
          c = u.x - l.x,
          p = u.y - l.y,
          y = Math.hypot(c, p),
          v = c / y,
          M = p / y,
          I = -M,
          ke = v,
          Se = ["#7fffd4", "#7fd0ff", "#c69bff", "#ff9ad6", "#fff3a8"];
        return (Ae) => {
          if (Ae < 260) ps(l.x, l.y, Ae / 260, pa);
          else if (Ae < 800) {
            const St = Math.min(1, (Ae - 260) / 90),
              Jt = y * St,
              Oa = Ae > 720 ? (800 - Ae) / 80 : 1;
            Se.forEach((Qa, un) => {
              for (let $n = 0; $n < Jt; $n += 1.5) {
                const fs = Math.sin($n / 10 - Ae / 40 + un) * 3 + (un - 2) * 2;
                A(l.x + v * $n + I * fs * Oa, l.y + M * $n + ke * fs * Oa, 1.4 * Oa, Qa);
              }
            });
            for (let Qa = 0; Qa < Jt; Qa += 2) A(l.x + v * Qa, l.y + M * Qa, 0.9 * Oa, "#ffffff");
            St >= 1 &&
              (s || ((s = 1), Vn("ice", n)),
              Ae % 90 < 17 &&
                Rt(
                  u.x + (Math.random() - 0.5) * 30,
                  u.y + (Math.random() - 0.5) * 24,
                  3,
                  Se[(Math.random() * 5) | 0],
                ));
          }
          return (Gn(Ae, 1050, n), Ae < 1050);
        };
      },
      "seismic-toss"(o, n) {
        return hs(o, n);
      },
      "night-shade"(o, n) {
        return xn();
      },
      flail(o, n) {
        let s = 0;
        const l = f("#atk"),
          c = Ot(0.8);
        return (
          l.animate(
            [
              { transform: "scaleX(-1)" },
              ...[0, 1, 2].flatMap((p) => [
                {
                  transform: `translate(${c.x * (0.85 + p * 0.05)}px,${c.y * 0.6 + (p - 1) * 10}px) scaleX(-1) rotate(${p % 2 ? 18 : -18}deg)`,
                  offset: 0.15 + p * 0.22,
                },
                {
                  transform: `translate(${c.x * 0.7}px,${c.y * 0.5}px) scaleX(-1) rotate(0deg)`,
                  offset: 0.25 + p * 0.22,
                },
              ]),
              { transform: "scaleX(-1)" },
            ],
            { duration: 1e3 / De, easing: "cubic-bezier(.3,.7,.3,1)" },
          ),
          (p) => {
            for (let y = 0; y < 3; y++)
              if (p > 150 + y * 220 && s <= y) {
                ((s = y + 1), Vn("normal", n, u.x, u.y, y === 2 ? 1 : 0.4));
                for (let v = 0; v < 3; v++)
                  qe(u.x, u.y, {
                    pal: dn,
                    vx: (Math.random() - 0.5) * 3,
                    vy: -1.5,
                    max: 300,
                    size: 2,
                    grav: 0.1,
                  });
              }
            return p < 1e3;
          }
        );
      },
      "beat-up"(o, n) {
        let s = 0;
        return (l) => {
          for (let c = 0; c < 3; c++) {
            const p = l - 80 - c * 170;
            if (p < 0 || p > 260) continue;
            const y = c % 2 ? 1 : -1,
              v = u.x + y * (30 - Math.min(1, p / 80) * 18),
              M = u.y - 4 + (c - 1) * 6;
            (($.globalAlpha = p > 180 ? 1 - (p - 180) / 80 : 1),
              A(v, M, 9, fn[5]),
              A(v, M - 10, 6, fn[5]),
              A(v + y * -2, M - 11, 1.5, fn[2]),
              ($.globalAlpha = 1),
              p > 80 &&
                s <= c &&
                ((s = c + 1), Vn("dark", n, u.x, u.y, c === 2 ? 1 : 0.4), As(u.x - y * 8, M, 4, fn)));
          }
          return l < 900;
        };
      },
      present(o, n) {
        let s = 0;
        Te();
        const l = { x: P.x + 6, y: P.y - 8 };
        return (c) => {
          const p = (c - 120) / 380;
          if (p < 0) return !0;
          if (p < 1) {
            const y = dt(p, l, u, 40),
              v = Math.round(y.x),
              M = Math.round(y.y);
            (($.fillStyle = "#c2185b"),
              $.fillRect(v - 6, M - 5, 12, 10),
              ($.fillStyle = "#ff5f8a"),
              $.fillRect(v - 5, M - 4, 10, 8),
              ($.fillStyle = "#ffd23a"),
              $.fillRect(v - 1, M - 5, 2, 10),
              $.fillRect(v - 6, M - 1, 12, 2),
              $.fillRect(v - 3, M - 8, 2, 3),
              $.fillRect(v + 1, M - 8, 2, 3));
          } else {
            if (!s) {
              ((s = 1), Vn("normal", n));
              const v = ["#ff5f8a", "#ffd23a", "#3fc4ff", "#4fcf6a", "#ffffff", "#c69bff"];
              for (let M = 0; M < 26; M++) {
                const I = Math.random() * 6.283,
                  ke = 1 + Math.random() * 2.5;
                qe(u.x, u.y, {
                  pal: [v[M % 6], v[M % 6], v[(M + 1) % 6], v[M % 6], v[M % 6], v[M % 6]],
                  vx: Math.cos(I) * ke,
                  vy: Math.sin(I) * ke - 1.5,
                  max: 700,
                  size: 2,
                  grav: 0.1,
                  drag: 0.97,
                });
              }
            }
            const y = c - 500;
            y < 200 && J(u.x, u.y, 8 + y / 4, 2, "#ffd23a");
          }
          return c < 1100;
        };
      },
      "weather-ball"(o, n) {
        return ms.projectile({ ...o, t: "normal" }, n);
      },
      octazooka(o, n) {
        let s = 0;
        Te();
        const l = { x: P.x + 6, y: P.y - 6 },
          c = ["#8a8aa8", "#4a4a66", "#2a2a40", "#15152a", "#0a0a18", "#000000"];
        return (p) => {
          if (p < 200) ps(l.x, l.y, p / 200, wt);
          else if (p < 480) {
            const y = dt(Re((p - 200) / 280), l, u, 10);
            ys(y.x, y.y, 6, c);
          } else if (!s) {
            ((s = 1), Vn("water", n));
            for (let y = 0; y < 14; y++)
              qe(u.x, u.y, {
                pal: c,
                round: 1,
                vx: (Math.random() - 0.5) * 4,
                vy: (Math.random() - 0.5) * 3,
                max: 700,
                size: 3,
                grav: 0.05,
              });
          }
          return p < 950;
        };
      },
      "twin-beam"(o, n) {
        return ms.rayon(o, n);
      },
      "storm-throw"(o, n) {
        return hs(o, n);
      },
      "vital-throw"(o, n) {
        return hs(o, n);
      },
      "sucker-punch"(o, n) {
        let s = 0;
        const l = f("#atk"),
          c = Ot(0.82);
        return (
          l.animate(
            [
              { transform: "scaleX(-1)", filter: "brightness(0)" },
              {
                transform: `translate(${c.x}px,${c.y * 0.6}px) scaleX(-1)`,
                filter: "brightness(0)",
                offset: 0.2,
              },
              { transform: `translate(${c.x}px,${c.y * 0.6}px) scaleX(-1)`, filter: "none", offset: 0.4 },
              { transform: "scaleX(-1)", filter: "none" },
            ],
            { duration: 700 / De, easing: "cubic-bezier(.3,.7,.3,1)" },
          ),
          (p) => (
            p < 140 && Me(_e(P.x, u.x, p / 140), _e(P.y, u.y, p / 140), 2),
            p > 140 && !s && ((s = 1), Vn("dark", n), As(u.x - 10, u.y, 6, fn)),
            p < 700
          )
        );
      },
      "knock-off"(o, n) {
        let s = 0;
        return (
          Us(0.8, 750, !1),
          (l) => {
            if ((l > 190 && !s && ((s = 1), Vn("dark", n)), l > 190 && l < 800)) {
              const c = (l - 190) / 16,
                p = u.x + 2 * c,
                y = u.y - 3 * c + 0.12 * c * c;
              (A(p, y, 3, fn[3]), Z(p - 1, y - 1, 1, fn[1]));
            }
            return l < 800;
          }
        );
      },
      "raging-fury"(o, n) {
        return Ls(o, n, X, "fire");
      },
      chatter(o, n) {
        const s = qs(o, n, 4),
          l = [];
        return (c) => {
          const p = s(c);
          return (
            c > 60 &&
              c < 520 &&
              c > 60 + l.length * 80 &&
              l.push({ t0: c, lift: 10 + Math.random() * 16, oy: (Math.random() - 0.5) * 18 }),
            l.forEach((y, v) => {
              const M = (c - y.t0) / 420;
              if (M < 0 || M > 1) return;
              const I = dt(M, { x: P.x + 10, y: P.y - 12 }, { x: u.x - 8, y: u.y + y.oy }, y.lift);
              Zs(I.x, I.y - Math.abs(Math.sin(M * 9)) * 3, v % 2, M > 0.75);
            }),
            p
          );
        };
      },
      "attack-order"(o, n) {
        let s = 0;
        Te();
        const l = { x: P.x - 16, y: P.y - 20 },
          c = [];
        for (let p = 0; p < 12; p++)
          c.push({
            t0: 40 + p * 18,
            ox: (Math.random() - 0.5) * 28,
            oy: (Math.random() - 0.5) * 22,
            lift: 18 + Math.random() * 30,
            ph: Math.random() * 6.283,
            a: Math.random() * 6.283,
            r: 14 + Math.random() * 12,
            hit: 0,
          });
        return (p) => (
          c.forEach((y, v) => {
            if (p < y.t0) return;
            const M = (p - 200 - v * 20) / 340;
            let I,
              ke,
              Se = !1;
            if (M < 0) {
              const Ae = y.a + p / 110;
              ((I = l.x + Math.cos(Ae) * (6 + Math.abs(y.ox) * 0.4)),
                (ke = l.y + Math.sin(Ae) * 5 + y.oy * 0.3));
            } else if (M < 1) {
              const Ae = dt(
                Re(M),
                { x: l.x + y.ox * 0.3, y: l.y + y.oy * 0.3 },
                { x: u.x + y.ox * 0.5, y: u.y + y.oy * 0.5 },
                y.lift,
              );
              ((I = Ae.x + Math.sin(M * 9 + y.ph) * 4), (ke = Ae.y + Math.cos(M * 7 + y.ph) * 3));
            } else if (p < 860) {
              y.hit || (y.hit = p);
              const Ae = y.a + (p - y.hit) / 60;
              ((I = u.x + Math.cos(Ae) * y.r),
                (ke = u.y + Math.sin(Ae) * y.r * 0.6),
                p - y.hit < 90 &&
                  (Z(u.x + Math.cos(Ae) * y.r * 0.5, u.y + Math.sin(Ae) * y.r * 0.3, 2, xa[0]),
                  J(u.x + Math.cos(Ae) * y.r * 0.5, u.y + Math.sin(Ae) * y.r * 0.3, 4, 1, xa[1])));
            } else {
              const Ae = (p - 860) / 300;
              ((I = u.x + Math.cos(y.a) * (y.r + Ae * 110)),
                (ke = u.y + Math.sin(y.a) * y.r * 0.6 - Ae * 50),
                (Se = Ae > 0.55));
            }
            to(I, ke, p, v, Se);
          }),
          !s && p > 640 && ((s = 1), Vn("bug", n)),
          Gn(p, 1160, n),
          p < 1160
        );
      },
      "rock-wrecker"(o, n) {
        let s = 0,
          l = 0;
        Te();
        const c = { x: P.x + 4, y: P.y - 42 },
          p = 21,
          y = { ...n, shake: 7, stop: 78, flash: 0.52, n: 44 },
          v = [Xn[1], Xn[2], Xn[2], Xn[3], Xn[3], Xn[4]];
        return (M) => {
          if ((bs(M, 1850, 0.45, "#1c1206"), M < 560)) {
            const I = M / 560;
            if (M % 50 < 17)
              for (let ke = 0; ke < 2; ke++) {
                const Se = P.x + (Math.random() - 0.5) * 70,
                  Ae = P.y + 26;
                qe(Se, Ae, {
                  pal: v,
                  vx: (c.x - Se) / 22,
                  vy: (c.y - Ae) / 22,
                  max: 340,
                  size: 2 + ((Math.random() * 2) | 0),
                  grav: 0,
                  drag: 1,
                });
              }
            (ls(c.x, c.y, 4 + Re(I) * (p - 4), M / 400, 5), I > 0.8 && (re = Math.max(re, 1.5)));
          } else if (M < 900) {
            const I = (M - 560) / 340,
              ke = dt(I * I * 0.5 + I * 0.5, c, u, 36);
            (ls(ke.x, ke.y, p, M / 90, 5),
              M % 40 < 17 &&
                qe(ke.x - 8, ke.y + 6, {
                  smoke: 1,
                  spal: Dn,
                  size: 3,
                  max: 320,
                  vx: -0.4,
                  vy: -0.1,
                  grav: 0,
                }));
          } else if (!s) {
            ((s = 1), Vn("rock", y), Hn(u.x, u.y, 14, 3.4), Kn(u.x, u.y + 24, 10, 56));
            for (let I = 0; I < 6; I++)
              qe(u.x, u.y, {
                pal: v,
                vx: (Math.random() - 0.5) * 5,
                vy: -2.5 - Math.random() * 2,
                max: 700,
                size: 4,
                grav: 0.16,
                drag: 0.98,
              });
          }
          if (s && M < 1150) {
            const I = M - 900;
            (J(u.x, u.y + 4, 12 + I / 4, 3, I < 120 ? Xn[0] : Xn[2]),
              I < 90 && ls(u.x, u.y, p * (1 - I / 90), I / 30, 5));
          }
          return (
            M > 1320 &&
              !l &&
              ((l = 1),
              f("#atk").animate(
                [
                  { transform: "scaleX(-1)" },
                  { transform: "scaleX(-1) translateY(4px) scaleY(.94)" },
                  { transform: "scaleX(-1) translateY(4px) scaleY(.94)" },
                  { transform: "scaleX(-1)" },
                ],
                { duration: 520 / De, easing: "steps(4)" },
              )),
            M > 1320 && zs(M - 1320, dn[0]),
            M < 1850
          );
        };
      },
      "mystical-power"(o, n) {
        let s = 0;
        Te();
        const l = ["#ffe866", "#ff8fdc", "#7fd0ff"],
          c = { x: P.x - 2, y: P.y - 14 };
        return (p) => {
          if (
            (p < 260 && lt(c.x, c.y, 1 + (((p / 50) % 3) | 0), l[((p / 90) | 0) % 3]), p > 180 && p < 730)
          ) {
            const y = Math.min(1, (p - 180) / 160),
              v = Math.max(0, (p - 570) / 160),
              M = 30 * (1 - Re(v)) * y + 1,
              I = p / 260,
              ke = l.map((Se, Ae) => ({
                x: u.x + Math.cos(I + Ae * 2.094) * M,
                y: u.y + Math.sin(I + Ae * 2.094) * M * 0.7,
                c: Se,
              }));
            if (y >= 1 && v < 0.8)
              for (let Se = 0; Se < 3; Se++) {
                const Ae = ke[Se],
                  St = ke[(Se + 1) % 3];
                Ee(Ae.x, Ae.y, St.x, St.y, 1, _n[2]);
              }
            ke.forEach((Se) => {
              (A(Se.x, Se.y, 4, _n[4]),
                A(Se.x, Se.y, 3, Se.c),
                Z(Se.x - 1, Se.y - 1, 1, "#ffffff"),
                Math.random() < 0.25 && qe(Se.x, Se.y, { pal: _n, heat: 0.3, max: 220, size: 2, grav: 0 }));
            });
          }
          return (
            !s &&
              p >= 730 &&
              ((s = 1),
              Vn("psychic", n),
              kt(u.x, u.y, 14, 5),
              l.forEach((y, v) => ka(u.x + (v - 1) * 12, u.y - 4 + (v % 2) * 8, { c: y, s: 3, max: 420 }))),
            Gn(p, 1060, n),
            p < 1060
          );
        };
      },
      "roar-of-time"(o, n) {
        let s = 0,
          l = 0;
        Te();
        const c = { x: P.x + 6, y: P.y - 12 },
          p = Math.hypot(u.x - c.x, u.y - c.y),
          y = { ...n, shake: 6.5, stop: 76, flash: 0.5, n: 44 };
        return (v) => {
          if ((bs(v, 1850, 0.46, "#060c22"), v < 620)) {
            const M = Math.min(1, v / 560),
              I = -Math.PI / 2 + (M < 0.6 ? M * 0.8 : 0.48 + (M - 0.6) ** 2 * 40),
              ke = Math.max(0, 1 - v / 160) * 0.8;
            if (
              (co(
                P.x,
                P.y - 8,
                30 + (1 - Re(M)) * 8,
                I,
                -Math.PI / 2 + I / 12,
                Rs,
                ke + (v > 560 ? (v - 560) / 60 : 0),
              ),
              ys(c.x, c.y, 2 + M * 5, Rs),
              v % 40 < 17)
            ) {
              const Se = Math.random() * 6.283;
              qe(c.x + Math.cos(Se) * 40, c.y + Math.sin(Se) * 30, {
                pal: Rs,
                vx: -Math.cos(Se) * 1.5,
                vy: -Math.sin(Se) * 1.1,
                heat: 0.2,
                max: 260,
                size: 2,
                grav: 0,
              });
            }
            M > 0.85 && (re = Math.max(re, 1.5));
          }
          if (v >= 560 && v < 960) {
            re = Math.max(re, 2);
            for (let M = 0; M < 3; M++) {
              const I = (v - 560 - M * 50) / 360;
              if (I < 0 || I > 1.05) continue;
              const ke = p * Math.pow(I / 0.94, 2.2);
              if (ke < 4) continue;
              const Se = I > 0.9 ? 0.6 : 0;
              (V(c.x, c.y, ke + 2, (ke + 2) * 0.8, Rs[4], 2, Se),
                V(c.x, c.y, ke, ke * 0.8, M ? Rs[3] : Rs[2], 2, Se),
                V(c.x, c.y, ke - 2, (ke - 2) * 0.8, Rs[0], 1, Se));
              for (let Ae = 0; Ae < 12; Ae++) {
                const St = (Ae / 12) * 6.283 + M * 0.26,
                  Jt = c.x + Math.cos(St) * (ke + 5),
                  Oa = c.y + Math.sin(St) * (ke + 5) * 0.8;
                (Z(Jt, Oa, Ae % 3 ? 3 : 4, Rs[4]), Z(Jt, Oa, Ae % 3 ? 1 : 2, Rs[0]));
              }
            }
            A(c.x, c.y, Math.max(0, 7 - (v - 560) / 40), Rs[0]);
          }
          if (v >= 900 && !s) {
            ((s = 1), Vn("dragon", y));
            for (let M = 0; M < 8; M++)
              ka(u.x + (Math.random() - 0.5) * 40, u.y + (Math.random() - 0.5) * 30, {
                c: M % 2 ? Rs[1] : "#ffffff",
                s: 3,
                max: 500 + Math.random() * 300,
              });
            for (let M = 0; M < 10; M++)
              qe(u.x + (Math.random() - 0.5) * 40, u.y + 14, {
                smoke: 1,
                spal: ["#9fb8d8", "#6a84aa", "#3e5478"],
                size: 4,
                max: 800,
                vx: (Math.random() - 0.5) * 0.8,
                vy: -0.4,
                grav: -0.01,
              });
          }
          if (s && v < 1450) {
            const M = (v - 900) / 550,
              I = -Math.PI / 2 + 13 * (1 - (1 - M) ** 3);
            if (
              (co(u.x, u.y, 24 + M * 6, I, -Math.PI / 2 + I / 12, Rs, M > 0.65 ? (M - 0.65) / 0.35 : 0),
              v % 60 < 17)
            ) {
              const ke = Math.random() * 6.283;
              N(u.x + Math.cos(ke) * 30, u.y + Math.sin(ke) * 22, 2, 3.5, ke, Rs[1], Rs[3]);
            }
          }
          return (
            v > 1340 &&
              !l &&
              ((l = 1),
              f("#atk").animate(
                [
                  { transform: "scaleX(-1)" },
                  { transform: "scaleX(-1) translateY(4px) scaleY(.94)" },
                  { transform: "scaleX(-1) translateY(4px) scaleY(.94)" },
                  { transform: "scaleX(-1)" },
                ],
                { duration: 500 / De, easing: "steps(4)" },
              )),
            v > 1340 && zs(v - 1340, Rs[1]),
            v < 1850
          );
        };
      },
      "spacial-rend"(o, n) {
        let s = 0;
        Te();
        const l = { ...n, shake: 5.5, stop: 62, flash: 0.4, n: 34 },
          c = [
            [-30, -20, 0.5, 36],
            [24, -24, 2.5, 32],
            [-22, 22, 2.3, 38],
            [28, 16, 0.8, 34],
            [0, 0, 1.15, 64],
          ];
        return (p) => {
          if (
            (bs(p, 1450, 0.38, "#14061e"),
            p < 400 &&
              (ps(P.x + 4, P.y - 12, p / 400, Gs),
              p % 80 < 17 &&
                ka(P.x + (Math.random() - 0.5) * 30, P.y - 10 + (Math.random() - 0.5) * 20, {
                  c: Gs[2],
                  s: 2,
                  max: 300,
                })),
            c.forEach(([y, v, M, I], ke) => {
              const Se = p - 400 - ke * 75;
              Se >= 0 && uo(u.x + y, u.y + v, M, I, Se, ke === 4 ? 5 : 3.2);
            }),
            !s && p >= 400 + 4 * 75 + 60)
          ) {
            ((s = 1), Vn("dragon", l));
            for (let y = 0; y < 12; y++) {
              const v = Math.random() * 6.283,
                M = 1 + Math.random() * 2.2;
              qe(u.x, u.y, {
                pal: Gs,
                vx: Math.cos(v) * M,
                vy: Math.sin(v) * M,
                heat: Math.random() * 0.4,
                max: 500 + Math.random() * 300,
                size: 2,
                grav: 0,
                drag: 0.94,
              });
            }
          }
          return p < 1450;
        };
      },
      "shadow-force"(o, n) {
        let s = 0;
        const l = f("#atk"),
          c = Ot(0.82),
          p = { ...n, shake: 6.5, stop: 76, flash: 0.5, n: 44 },
          y = { x: P.x, y: P.y + 24 },
          v = Je / x.getBoundingClientRect().width,
          M = { x: P.x + Math.abs(c.x) * v, y: y.y + c.y * 0.6 * v },
          I = 1500,
          ke = "cubic-bezier(.3,.7,.3,1)",
          Se = "translateY(22%) scale(.9,.45)";
        return (
          l.animate(
            [
              { transform: "scaleX(-1)", opacity: 1, filter: "none", easing: "ease-in" },
              {
                transform: "scaleX(-1) scale(1.08,.9)",
                opacity: 1,
                filter: "brightness(0)",
                offset: 0.1,
                easing: "ease-in",
              },
              { transform: `scaleX(-1) ${Se}`, opacity: 0, filter: "brightness(0)", offset: 0.3 },
              {
                transform: `translate(${c.x}px,${c.y * 0.6}px) scaleX(-1) ${Se}`,
                opacity: 0,
                filter: "brightness(0)",
                offset: 0.57,
                easing: ke,
              },
              {
                transform: `translate(${c.x}px,${c.y * 0.6}px) scaleX(-1) scale(.92,1.12)`,
                opacity: 1,
                filter: "brightness(0)",
                offset: 0.65,
              },
              {
                transform: `translate(${c.x}px,${c.y * 0.6}px) scaleX(-1)`,
                opacity: 1,
                filter: "none",
                offset: 0.71,
              },
              {
                transform: `translate(${c.x}px,${c.y * 0.6}px) scaleX(-1)`,
                opacity: 1,
                filter: "none",
                offset: 0.78,
                easing: ke,
              },
              { transform: "scaleX(-1)", opacity: 1, filter: "none" },
            ],
            { duration: I / De },
          ),
          (Ae) => {
            if ((bs(Ae, 1800, 0.48, "#0b0418"), Ae > 120 && Ae < 760)) {
              const St = Ae < 460 ? Math.min(1, (Ae - 120) / 160) : Math.max(0, 1 - (Ae - 460) / 300),
                Jt = 26 * St;
              if (Jt > 1) {
                V(y.x, y.y, Jt, Jt * 0.24, Ba[4], 2);
                for (let Oa = Jt - 3; Oa > 0; Oa -= 3) V(y.x, y.y, Oa, Oa * 0.22, Ba[5], 2);
              }
              Ae < 500 && Ae % 40 < 17 && za(y.x + (Math.random() - 0.5) * 40, y.y - 4, { vy: -0.9 });
            }
            if (Ae > 420 && Ae < 880) {
              const St = Re((Ae - 420) / 400);
              for (let Jt = 0; Jt < St; Jt += 0.05) {
                const Oa = _e(y.x, M.x, Jt),
                  Qa = _e(y.y, M.y, Jt) + Math.sin(Jt * 18 + Ae / 40) * 2;
                (A(Oa, Qa, 3, Ba[5]), ((Jt * 20) | 0) % 3 === 0 && Z(Oa, Qa - 3, 2, Ba[3]));
              }
            }
            if (Ae > 700 && Ae < 1250) {
              const St = Ae < 980 ? Math.min(1, (Ae - 700) / 140) : Math.max(0, 1 - (Ae - 980) / 270),
                Jt = 30 * St;
              if (Jt > 1) {
                V(M.x, M.y, Jt, Jt * 0.26, Ba[3], 2);
                for (let Oa = Jt - 3; Oa > 0; Oa -= 3) V(M.x, M.y, Oa, Oa * 0.24, Ba[5], 2);
              }
              Ae < 1e3 &&
                Math.random() < 0.5 &&
                za(M.x + (Math.random() - 0.5) * 50, M.y - 2, { vy: -1.1, size: 2.5 });
            }
            if (Ae >= 1e3 && !s) {
              ((s = 1), Vn("ghost", p));
              for (let St = 0; St < 10; St++)
                qe(u.x + (Math.random() - 0.5) * 40, u.y + (Math.random() - 0.5) * 30, {
                  smoke: 1,
                  spal: [Ba[4], Ba[5], "#2a1446"],
                  size: 4,
                  max: 800,
                  vx: (Math.random() - 0.5) * 0.8,
                  vy: -0.5,
                  grav: -0.01,
                });
            }
            if (s && Ae < 1260) {
              const St = Ae - 1e3,
                Jt = Math.min(1, St / 60),
                Oa = Math.max(0, (St - 120) / 140);
              (Ft(u.x + 2, u.y + 4, 24, -2.6 + 2.4 * Oa, -2.6 + 2.6 * Jt, 8, Ba[4]),
                Ft(u.x + 2, u.y + 4, 24, -2.6 + 2.4 * Oa, -2.6 + 2.6 * Jt, 4, Ba[2]),
                Ft(u.x + 2, u.y + 4, 24, -2.6 + 2.4 * Oa, -2.6 + 2.6 * Jt, 1.5, Ba[0]));
            }
            return (
              s &&
                Ae < 1700 &&
                Ae % 70 < 17 &&
                za(u.x + (Math.random() - 0.5) * 36, u.y + 10 + (Math.random() - 0.5) * 20, { size: 2.5 }),
              Ae < 1800
            );
          }
        );
      },
      "magma-storm"(o, n) {
        let s = 0,
          l = 0;
        Te();
        const c = { x: P.x + 6, y: P.y - 6 },
          p = { x: u.x, y: u.y + 28 },
          y = { ...n, shake: 5.5, stop: 60, flash: 0.4, n: 34 };
        return (v) => {
          if ((bs(v, 1500, 0.38, "#1a0505"), v < 360)) ps(c.x, c.y, v / 360, X);
          else if (v < 560) {
            const M = dt(Re((v - 360) / 200), c, p, 34);
            (de(M.x, M.y, 6),
              v % 34 < 17 && qe(M.x, M.y, { round: 1, heat: 0.3, max: 260, size: 2.5, grav: 0.02 }));
          } else {
            if (!s) {
              ((s = 1), (re = Math.max(re, 2.5)));
              for (let Ae = 0; Ae < 8; Ae++)
                qe(p.x + (Math.random() - 0.5) * 16, p.y, {
                  round: 1,
                  heat: Math.random() * 0.4,
                  vx: (Math.random() - 0.5) * 3,
                  vy: -2 - Math.random() * 2,
                  max: 500,
                  size: 3,
                  grav: 0.1,
                });
            }
            const M = v - 560,
              I = Math.min(1, Re(M / 220)),
              ke = Math.min(1, M / 320),
              Se = M > 640 ? Math.min(1, (M - 640) / 180) : 0;
            if (Se < 1)
              for (let Ae = 0; Ae < 5; Ae++) {
                const St = p.y - Ae * 13 * I,
                  Jt = (32 - Ae * 2) * (1 - ke * 0.25),
                  Oa = Jt * 0.28,
                  Qa = M / 40 + Ae * 0.7;
                (Ys(u.x, St, Jt, Oa, Qa + 3.3, Qa + 5.3, X[5], 2, Se),
                  Ws(u.x, St, Jt, Oa, Qa, Qa + 2.6, X[5], Ae % 2 ? X[2] : X[3], Se),
                  Z(u.x + Math.cos(Qa + 1.3) * Jt, St + Math.sin(Qa + 1.3) * Oa, 2, X[0]),
                  !Se &&
                    Math.random() < 0.15 &&
                    qe(u.x + Math.cos(Qa + 2.6) * Jt, St, {
                      round: 1,
                      heat: 0.3,
                      vx: -Math.sin(Qa + 2.6) * 1.5,
                      vy: -1.2,
                      max: 380,
                      size: 2.5,
                      grav: 0.08,
                    }));
              }
            if (
              (!l && M > 220 && ((l = 1), Vn("fire", y)),
              l && M < 640 && v % 120 < 17 && (re = Math.max(re, 2.2)),
              M > 640 && s < 2)
            ) {
              s = 2;
              for (let Ae = 0; Ae < 12; Ae++)
                qe(u.x + (Math.random() - 0.5) * 44, u.y + 10 + (Math.random() - 0.5) * 30, {
                  smoke: 1,
                  size: 4,
                  max: 800,
                  vx: (Math.random() - 0.5) * 0.8,
                  vy: -0.5,
                  grav: -0.01,
                });
            }
          }
          return v < 1500;
        };
      },
      "seed-flare"(o, n) {
        let s = 0,
          l = 0;
        Te();
        const c = { x: P.x + 2, y: P.y - 4 },
          p = Math.hypot(u.x - c.x, u.y - c.y),
          y = { ...n, shake: 6.5, stop: 75, flash: 0.52, n: 44 };
        return (v) => {
          if ((bs(v, 1800, 0.44, "#061a0a"), v < 560)) {
            const M = v / 560;
            if (v % 34 < 17)
              for (let I = 0; I < 2; I++) {
                const ke = Math.random() * 6.283,
                  Se = 46 * (1 - M) + 14;
                qe(c.x + Math.cos(ke) * Se, c.y + Math.sin(ke) * Se * 0.7, {
                  pal: Os,
                  vx: -Math.cos(ke) * 1.4,
                  vy: -Math.sin(ke),
                  heat: 0.2,
                  max: 200,
                  size: 2,
                  grav: 0,
                });
              }
            ys(c.x, c.y, 2 + M * 6, Os);
            for (let I = 0; I < 5; I++) {
              const ke = v / 110 + I * 1.257;
              oa(c.x + Math.cos(ke) * (22 - M * 8), c.y + Math.sin(ke) * (11 - M * 4), ke, In[1 + (I % 3)]);
            }
            M > 0.85 && (re = Math.max(re, 1.5));
          } else if (v < 960) {
            const M = (v - 560) / 400,
              I = Re(M) * (p + 40),
              ke = M > 0.75 ? 0.6 : 0,
              Se = Math.atan2(u.y - c.y, u.x - c.x);
            for (let Ae = 0; Ae < 3; Ae++) {
              const St = I - Ae * 9;
              St > 2 && V(c.x, c.y, St, St * 0.62, [Os[0], Os[2], Os[3]][Ae], Ae ? 2 : 3, ke);
            }
            for (let Ae = 0; Ae < 7; Ae++) {
              const St = Se - 1.2 + Ae * 0.4;
              I > 10 &&
                Ks(
                  c.x + Math.cos(St) * I,
                  c.y + Math.sin(St) * I * 0.62,
                  3.5,
                  v / 80 + Ae,
                  Ae % 2 ? In[1] : Os[1],
                );
            }
            (A(c.x, c.y, Math.max(0, 9 - M * 14), Os[0]),
              !s && I >= p && ((s = 1), (l = v), Vn("grass", y), Tn(u.x, u.y, 8, 2.4, 1)));
          }
          if (s && v - l < 520) {
            const M = v - l,
              I = Math.min(1, Re(M / 200)),
              ke = M > 360 ? (M - 360) / 160 : 0;
            for (let Se = u.y + 30; Se > u.y - 50 * I; Se -= 3) {
              const Ae = (7 - M / 90) * (1 - ke);
              Ae > 1 && (A(u.x, Se, Ae + 1.5, Os[2], ke), A(u.x, Se, Ae, Os[0], ke));
            }
            for (let Se = 0; Se < 5; Se++) {
              const Ae = M / 400 + Se * 1.257 - Math.PI / 2,
                St = 20 * I;
              St > 2 &&
                N(
                  u.x + Math.cos(Ae) * St * 0.6,
                  u.y + Math.sin(Ae) * St * 0.6,
                  St * 0.55,
                  St * 0.3,
                  Ae,
                  Se % 2 ? In[1] : Os[1],
                  Se % 2 ? In[3] : Os[3],
                );
            }
            ke < 0.7 && A(u.x, u.y, 4 * I, "#ffe866");
          }
          return (
            s &&
              v - l > 300 &&
              v < 1500 &&
              v % 60 < 17 &&
              Ga.push({
                x: u.x + (Math.random() - 0.5) * 70,
                y: u.y - 40,
                vx: Math.random() - 0.5,
                vy: 0.3,
                ang: Math.random() * 6,
                va: (Math.random() - 0.5) * 0.3,
                sw: Math.random() * 6,
                life: 0,
                max: 700,
                petal: Math.random() < 0.6,
                c: In[1 + ((Math.random() * 3) | 0)],
              }),
            v < 1800
          );
        };
      },
      judgment(o, n) {
        let s = 0;
        Te();
        const l = { x: P.x, y: P.y - 14 },
          c = { x: Je * 0.62, y: 12 },
          p = { ...n, shake: 5.5, stop: 60, flash: 0.42, n: 34 },
          y = [];
        for (let v = 0; v < 9; v++) {
          const M = v === 8;
          y.push({
            t0: 520 + v * 52,
            x: M ? u.x : u.x + (v % 2 ? 1 : -1) * (14 + Math.random() * 34),
            y: M ? u.y : u.y + 18 + (Math.random() - 0.5) * 16,
            len: M ? 50 : 26 + Math.random() * 10,
            w: M ? 6.5 : 3.5,
            hit: 0,
          });
        }
        return (v) => {
          if ((bs(v, 1500, 0.38, "#1a1206"), v < 260)) ps(l.x, l.y, v / 260, Es);
          else if (v < 470) {
            const M = Re((v - 260) / 210);
            (ys(_e(l.x, c.x, M), _e(l.y, c.y, M), 5, Es),
              v % 34 < 17 && qe(_e(l.x, c.x, M), _e(l.y, c.y, M), { pal: Es, max: 220, size: 2, grav: 0 }));
          } else if (!s) {
            s = 1;
            for (let M = 0; M < 6; M++)
              ka(c.x + (Math.random() - 0.5) * 40, c.y + Math.random() * 10, { c: Es[1], s: 3, max: 400 });
          }
          if (v >= 470 && v < 640) {
            const M = v - 470;
            J(c.x, c.y, 5 + M / 3, 2, M < 80 ? Es[0] : Es[2]);
          }
          return (
            y.forEach((M, I) => {
              const ke = (v - M.t0) / 170;
              if (ke < 0) return;
              const Se = I === 8;
              if (ke < 1) {
                const Ae = _e(-6, M.y, ke * ke);
                (Js(M.x, Ae, M.len, M.w, Es),
                  v % 34 < 17 && qe(M.x, Ae - M.len, { pal: Es, vy: -0.3, max: 180, size: 2, grav: 0 }));
              } else {
                M.hit ||
                  ((M.hit = 1),
                  Se
                    ? (Vn("normal", p), J(u.x, u.y, 12, 3, Es[1]))
                    : (Ts(M.x, M.y, 3, 1.2, Es, 0), J(M.x, M.y, 5, 1, Es[1])));
                const Ae = v - M.t0 - 170;
                (Ae < 420 && Js(M.x, M.y, M.len * (1 - Ae / 900), M.w, Es, Ae > 220 ? (Ae - 220) / 200 : 0),
                  Se && Ae < 260 && J(u.x, u.y, 12 + Ae / 5, 2, Ae < 100 ? Es[0] : Es[3]));
              }
            }),
            v < 1500
          );
        };
      },
    };
  function Bs(o, n) {
    let s = 0;
    const l = f("#atk"),
      c = Ot(0.8),
      p = n === "electric";
    l.animate(
      [
        { transform: "scaleX(-1)", opacity: 1 },
        { transform: `translate(${c.x}px,${c.y * 0.6}px) scaleX(-1)`, offset: 0.3 },
        { transform: `translate(${c.x}px,${c.y * 0.6}px) scaleX(1)`, offset: 0.45 },
        { transform: "translate(-120px,0) scaleX(1)", opacity: 0, offset: 0.8 },
        { transform: "scaleX(-1)", opacity: 0, offset: 0.81 },
        { transform: "scaleX(-1)", opacity: 1 },
      ],
      { duration: 950 / De, easing: "cubic-bezier(.3,.7,.3,1)" },
    );
    const y = {};
    return (v) => {
      if (
        (p && v < 270 && v % 50 < 17 && T(_e(P.x, u.x, v / 300), _e(P.y, u.y, v / 300), 2, 1),
        v > 285 && !s && ((s = 1), Vn(n, o), p ? T(u.x, u.y, 6, 2) : js(u.x, u.y, 2.2, 40, 1, 0, 1, xa, 3)),
        p && s && v < 480 && Ne(ie(y, "a", 80, v, () => U(u.x, u.y, 18, 2))),
        v > 300 && v < 600)
      ) {
        const M = (v - 300) / 300;
        p
          ? v % 40 < 17 && T(_e(u.x, -40, M), u.y + (Math.random() - 0.5) * 12, 2, 0.8)
          : Y(_e(u.x, -40, M), u.y, 14, 8, 0, 3.1, xa[2], 2);
      }
      return v < 950;
    };
  }
  const Rs = ["#ffffff", "#e4f6ff", "#a9d8f5", "#6aa0d8", "#3a5c9e", "#16204a"],
    Gs = ["#ffffff", "#fff0fa", "#ffc6e6", "#e88fc6", "#a4509e", "#3a1446"],
    Os = ["#ffffff", "#f6ffd8", "#c8f58a", "#7fd64a", "#3d9a2a", "#1a4a1e"],
    Es = ["#ffffff", "#fffbe6", "#ffeaa0", "#f2c24a", "#a87a1e", "#3a2808"];
  function bs(o, n, s, l) {
    const c = f("#tint");
    if (o >= n) {
      ((c.style.opacity = 0), (c.style.background = ""));
      return;
    }
    ((c.style.background = l),
      (c.style.opacity = o < n - 250 ? Math.min(s, o / 350) : Math.max(0, (s * (n - o)) / 250)));
  }
  function zs(o, n) {
    for (let s = 0; s < 2; s++) {
      const l = (o / 8 + s * 14) % 28;
      (l > 20 && (l | 0) & 1) ||
        (($.fillStyle = n),
        $.fillRect(Math.round(P.x + 10 + s * 6), Math.round(P.y - 34 - l), 2, 2),
        $.fillRect(Math.round(P.x + 12 + s * 6), Math.round(P.y - 36 - l), 2, 2));
    }
  }
  const lo = ["...##.", "...#.#", "...#..", "...#..", ".###..", "####..", ".##..."];
  function Zs(o, n, s, l) {
    const c = Math.round(o - 6),
      p = Math.round(n - 7);
    for (const [y, v] of [
      [D[5], 1],
      [s ? "#fff3a8" : D[1], 0],
    ])
      (($.fillStyle = y),
        lo.forEach((M, I) => {
          for (let ke = 0; ke < M.length; ke++)
            M[ke] === "#" &&
              !(l && (ke + I) & 1) &&
              (v ? $.fillRect(c + ke * 2 - 1, p + I * 2 - 1, 4, 4) : $.fillRect(c + ke * 2, p + I * 2, 2, 2));
        }));
  }
  function to(o, n, s, l, c) {
    ((o = Math.round(o)),
      (n = Math.round(n)),
      !(c && ((s / 17 + l) | 0) % 2) &&
        (($.fillStyle = xa[5]),
        $.fillRect(o - 4, n - 2, 8, 5),
        $.fillRect(o - 5, n, 1, 1),
        ($.fillStyle = "#ffd23a"),
        $.fillRect(o - 3, n - 1, 6, 3),
        ($.fillStyle = xa[5]),
        $.fillRect(o - 1, n - 1, 1, 3),
        $.fillRect(o + 1, n - 1, 1, 3),
        ($.fillStyle = xa[0]),
        ((s / 40 + l) | 0) % 2
          ? ($.fillRect(o - 3, n - 5, 3, 3), $.fillRect(o, n - 5, 2, 3))
          : $.fillRect(o - 3, n - 3, 6, 1)));
  }
  function co(o, n, s, l, c, p, y = 0) {
    if (!(y >= 1)) {
      (V(o, n, s + 2, s + 2, p[4], 2, y), V(o, n, s, s, p[2], 2, y));
      for (let v = 0; v < 12; v++) {
        if (y && Math.random() < y) continue;
        const M = (v / 12) * 6.283,
          I = v % 3 ? 3 : 6;
        Ee(
          o + Math.cos(M) * (s - I),
          n + Math.sin(M) * (s - I),
          o + Math.cos(M) * (s - 2),
          n + Math.sin(M) * (s - 2),
          2,
          p[0],
        );
      }
      (y && Math.random() < y) ||
        (Ee(o, n, o + Math.cos(l) * s * 0.8, n + Math.sin(l) * s * 0.8, 2, p[4]),
        Ee(o, n, o + Math.cos(c) * s * 0.5, n + Math.sin(c) * s * 0.5, 2, p[1]),
        A(o, n, 2, p[0]));
    }
  }
  function uo(o, n, s, l, c, p) {
    const y = Math.min(1, c / 70),
      v = Math.max(0, Math.min(1, (c - 520) / 170)),
      M = v * v * (3 - 2 * v);
    if (M >= 1) return;
    const I = Math.min(1, Math.max(0, (c - 40) / 90)) * (1 - M * 0.6),
      ke = Math.cos(s),
      Se = Math.sin(s),
      Ae = -l / 2 + l * M,
      St = -l / 2 + l * y;
    $.globalAlpha = 1 - M * 0.7;
    for (const [Jt, Oa, Qa] of [
      [Gs[4], 1, 2],
      [Gs[2], 1, 1],
      [Gs[0], 0.55, 0.4],
      ["#14081f", 0.5, 0],
    ])
      for (let un = Ae; un < St; un += 1) {
        const $n = Math.sin(((un + l / 2) / l) * Math.PI),
          fs = $n * p * I * Oa + Qa * $n;
        fs > 0.5 && A(o + ke * un, n + Se * un, fs, Jt);
      }
    if (I > 0.6)
      for (let Jt = 0; Jt < 3; Jt++) {
        const Oa = ((Jt * 37 + c / 7) % (l * 0.6)) - l * 0.3;
        Oa > Ae && Oa < St && Z(o + ke * Oa, n + Se * Oa, 1, "#ffffff");
      }
    $.globalAlpha = 1;
  }
  function Ys(o, n, s, l, c, p, y, v, M) {
    $.fillStyle = y;
    const I = Math.max(4, ((Math.abs(p - c) * (s + l)) / 3) | 0);
    for (let ke = 0; ke <= I; ke++) {
      if (M && ke % 2 && Math.random() < M * 1.6) continue;
      const Se = c + ((p - c) * ke) / I;
      $.fillRect(
        Math.round((o + Math.cos(Se) * s) / 2) * 2,
        Math.round((n + Math.sin(Se) * l) / 2) * 2,
        v,
        v,
      );
    }
  }
  function Ws(o, n, s, l, c, p, y, v, M) {
    const I = Math.max(4, ((Math.abs(p - c) * (s + l)) / 1.5) | 0),
      ke = [];
    for (let Se = 0; Se <= I; Se++) {
      if (M && Se % 2 && Math.random() < M * 1.6) continue;
      const Ae = c + ((p - c) * Se) / I,
        St = Math.sin((Se / I) * Math.PI);
      ke.push([o + Math.cos(Ae) * s, n + Math.sin(Ae) * l, 1.2 + St * 1.3]);
    }
    for (const [Se, Ae, St] of ke) A(Se, Ae, St + 1, y);
    for (const [Se, Ae, St] of ke) A(Se, Ae, St, v);
  }
  function Ks(o, n, s, l, c) {
    for (let p = 0; p < 5; p++)
      A(o + Math.cos(l + p * 1.257) * s, n + Math.sin(l + p * 1.257) * s, s * 0.8, c);
    A(o, n, s * 0.6, "#ffe866");
  }
  function Js(o, n, s, l, c, p = 0) {
    const y = Math.round(n - s),
      v = Math.round(s);
    for (let M = 0; M <= v; M++) {
      const I = M / v,
        ke = Math.round(l * (I < 0.75 ? I / 0.75 : (1 - I) / 0.25));
      for (let Se = -ke; Se <= ke; Se++)
        (p && (Se + M) & 1 && Math.random() < p * 1.5) ||
          (($.fillStyle = Math.abs(Se) === ke ? c[4] : Se === 0 ? c[0] : Math.abs(Se) === 1 ? c[1] : c[2]),
          $.fillRect(Math.round(o) + Se, y + M, 1, 1));
    }
  }
  function ao(o, n, s, l, c, p) {
    const y = o + (Math.cos(s) * l) / 2,
      v = n + (Math.sin(s) * l) / 2;
    N(y, v, l / 2, c, s, p[2], p[4]);
  }
  function po(o, n, s) {
    let l = 0;
    Te();
    const c = { x: P.x + 6, y: P.y - 6 },
      p = ["#ffffff", "#f4ead2", "#d9c9a0", "#a8946a", "#6e5a3a", "#2e2414"];
    return (y) => {
      for (let v = 0; v < s; v++) {
        const M = (y - 100 - v * 140) / 300;
        if (M < 0 || M > 2) continue;
        const I = s === 2 && v === 1,
          ke = I ? 2 - M : M,
          Se = _e(c.x, u.x, Math.min(1, ke)),
          Ae = _e(c.y, u.y, Math.min(1, ke)) - Math.sin(Math.min(1, ke) * Math.PI) * 20,
          St = y / 30;
        if (
          (M < (I ? 2 : 1) &&
            (!I || M > 1) &&
            (Ee(
              Se - Math.cos(St) * 7,
              Ae - Math.sin(St) * 7,
              Se + Math.cos(St) * 7,
              Ae + Math.sin(St) * 7,
              2,
              p[3],
            ),
            A(Se - Math.cos(St) * 7, Ae - Math.sin(St) * 7, 2, p[1]),
            A(Se + Math.cos(St) * 7, Ae + Math.sin(St) * 7, 2, p[1])),
          s === 2 && v === 0 && M >= 1 && M < 2)
        ) {
          const Jt = 2 - M,
            Oa = _e(c.x, u.x, Jt),
            Qa = _e(c.y, u.y, Jt) - Math.sin(Jt * Math.PI) * 20;
          Ee(
            Oa - Math.cos(St) * 7,
            Qa - Math.sin(St) * 7,
            Oa + Math.cos(St) * 7,
            Qa + Math.sin(St) * 7,
            2,
            p[3],
          );
        }
        M >= 1 && l <= v && ((l = v + 1), Vn("ground", n, u.x, u.y, v === s - 1 ? 1 : 0.4));
      }
      return y < 100 + s * 140 + 420;
    };
  }
  function Ls(o, n, s, l) {
    let c = 0;
    const p = f("#atk"),
      y = Ot(0.8);
    return (
      Te(),
      p.animate(
        [
          { transform: "scaleX(-1)", filter: "none" },
          ...[0, 1, 2].flatMap((v) => [
            {
              transform: `translate(${y.x}px,${y.y * 0.6 + (v - 1) * 8}px) scaleX(-1)`,
              filter: "drop-shadow(0 0 3px #ff3a2a)",
              offset: 0.12 + v * 0.25,
            },
            {
              transform: `translate(${y.x * 0.6}px,${y.y * 0.5}px) scaleX(-1)`,
              filter: "drop-shadow(0 0 3px #ff3a2a)",
              offset: 0.24 + v * 0.25,
            },
          ]),
          { transform: "scaleX(-1)", filter: "none" },
        ],
        { duration: 1300 / De, easing: "cubic-bezier(.3,.7,.3,1)" },
      ),
      (v) => {
        Gn(v, 1400, n);
        for (let M = 0; M < 3; M++) {
          const I = 160 + M * 325;
          v > I && c <= M && ((c = M + 1), Vn(l, n, u.x, u.y, M === 2 ? 1 : 0.45));
        }
        return (
          v < 1200 &&
            Math.random() < 0.5 &&
            qe(P.x + (Math.random() - 0.5) * 20, P.y, {
              pal: X,
              heat: 0.5,
              max: 300,
              size: 2,
              vy: -1,
              grav: -0.02,
            }),
          v < 1400
        );
      }
    );
  }
  function hs(o, n) {
    let s = 0;
    const l = f("#atk"),
      c = f("#def"),
      p = Ot(0.85);
    return (
      l.animate(
        [
          { transform: "scaleX(-1)" },
          { transform: `translate(${p.x}px,${p.y * 0.6}px) scaleX(-1)`, offset: 0.3 },
          { transform: `translate(${p.x}px,${p.y * 0.6}px) scaleX(-1)`, offset: 0.7 },
          { transform: "scaleX(-1)" },
        ],
        { duration: 1100 / De, easing: "cubic-bezier(.3,.7,.3,1)" },
      ),
      Wa(
        () =>
          c.animate(
            [
              { transform: "none" },
              { transform: "translate(-10px,-40px) rotate(-120deg)", offset: 0.45 },
              { transform: "translate(6px,8px) rotate(-180deg)", offset: 0.7 },
              { transform: "none" },
            ],
            { duration: 650 / De, easing: "cubic-bezier(.3,.7,.3,1)" },
          ),
        330 / De,
      ),
      (y) => (y > 790 && !s && ((s = 1), Vn("fighting", n), Kn(u.x, u.y + 28, 8, 40)), y < 1150)
    );
  }
  {
    const o = Ia;
    Ia = function (n) {
      (o(n), Un(n));
    };
  }
  const eo = {
      ember: ["fire", 1],
      flamethrower: ["fire", 2],
      "fire-blast": ["fire", 3],
      "thunder-shock": ["elec", 1],
      thunderbolt: ["elec", 2],
      thunder: ["elec", 3],
      confusion: ["psy", 1],
      psybeam: ["psy", 2],
      psychic: ["psy", 3],
      "water-gun": ["water", 1],
      surf: ["water", 2],
      "hydro-pump": ["water", 3],
      gust: ["fly", 1],
      "wing-attack": ["fly", 2],
      "sky-attack": ["fly", 3],
      "powder-snow": ["ice", 1],
      "ice-beam": ["ice", 2],
      blizzard: ["ice", 3],
      lick: ["ghost", 1],
      "shadow-ball": ["ghost", 2],
      feint: ["dark", 1],
      "dark-pulse": ["dark", 2],
      "foul-play": ["dark", 3],
      "poison-sting": ["poison", 1],
      "sludge-bomb": ["poison", 2],
      "gunk-shot": ["poison", 3],
      "dragon-breath": ["dragon", 1],
      "vine-whip": ["grass", 1],
      "petal-dance": ["grass", 2],
      "solar-beam": ["grass", 3],
      "rock-throw": ["rock", 1],
      "rock-slide": ["rock", 2],
      "stone-edge": ["rock", 3],
      "mud-shot": ["ground", 1],
      dig: ["ground", 2],
      earthquake: ["ground", 3],
      "fairy-wind": ["fairy", 1],
      "dazzling-gleam": ["fairy", 2],
      moonblast: ["fairy", 3],
      tackle: ["normal", 1],
      "quick-attack": ["normal", 2],
      "hyper-beam": ["normal", 3],
      "brick-break": ["fight", 1],
      "mach-punch": ["fight", 2],
      "dynamic-punch": ["fight", 3],
      "pin-missile": ["bug", 1],
      "x-scissor": ["bug", 2],
      megahorn: ["bug", 3],
      "bullet-punch": ["steel", 1],
      "flash-cannon": ["steel", 2],
      "iron-tail": ["steel", 3],
      "dragon-claw": ["dragon", 2],
      "dragon-pulse": ["dragon", 2],
      hex: ["ghost", 3],
    },
    r = Object.fromEntries(t.FX_MOVES.map((o) => [o.k, o]));
  function G(o) {
    return eo[o.k] ? "sur mesure" : ws[o.k] ? "signature" : o.f;
  }
  function be(o) {
    const n = rs(o.p);
    if (eo[o.k]) {
      const [s, l] = eo[o.k];
      return pn[s].fx[l - 1]();
    }
    return ws[o.k] ? ws[o.k](o, n) : (ms[o.f] || ms.contact)(o, n);
  }
  function ot(o) {
    const n = o.querySelector("img") || o,
      s = n.getBoundingClientRect(),
      l = (n.getAttribute?.("src") || "").replace(/^.*?(assets\/)/, "$1").split("?")[0],
      c = t.SPRITE_BOUNDS?.[l],
      p = n.naturalWidth || 0,
      y = n.naturalHeight || 0;
    if (!c || !p || !y) return s;
    const v = s.width / p,
      M = s.height / y,
      I =
        new DOMMatrix(getComputedStyle(n).transform === "none" ? void 0 : getComputedStyle(n).transform).a <
        0,
      ke = I ? p - c[2] : c[0],
      Se = I ? p - c[0] : c[2];
    return {
      left: s.left + ke * v,
      right: s.left + Se * v,
      top: s.top + c[1] * M,
      bottom: s.top + c[3] * M,
      width: (Se - ke) * v,
      height: (c[3] - c[1]) * M,
    };
  }
  ((Ot = function (o = 1) {
    const n = ot(a.atk),
      s = ot(a.def),
      l = (s.left + s.width / 2 - (n.left + n.width / 2) - s.width * 0.35) * o;
    return { x: a.mirror ? -l : l, y: (s.top + s.height * 0.5 - (n.top + n.height * 0.5)) * o };
  }),
    (jn = function () {
      const o = ot(a.atk),
        n = x.getBoundingClientRect(),
        s = Je / n.width;
      return {
        x: (a.mirror ? n.right - o.left : o.right - n.left) * s - 2,
        y: (o.top - n.top + o.height * 0.45) * s,
      };
    }));
  function $t(o, n = 0.5) {
    const s = ot(o),
      l = x.getBoundingClientRect(),
      c = Je / l.width,
      p = (s.left + s.width / 2 - l.left) * c;
    return { x: a.mirror ? Je - p : p, y: (s.top + s.height * n - l.top) * c };
  }
  function Wt(o) {
    const n = o.fxEl,
      s = n.getBoundingClientRect(),
      l = ot(o.defEl);
    ((Je = Math.max(200, Math.min(520, Math.round((s.width * 42) / Math.max(16, l.width))))),
      (Ze = Math.round((Je * s.height) / s.width)),
      (x.width = Je),
      (x.height = Ze),
      x.parentNode !== n &&
        (Object.assign(x.style, {
          position: "absolute",
          inset: "0",
          width: "100%",
          height: "100%",
          imageRendering: "pixelated",
          pointerEvents: "none",
          zIndex: 4,
        }),
        n.appendChild(x)),
      (!a.tint || a.tint.parentNode !== n) &&
        ((a.tint = document.createElement("div")),
        (a.tint.className = "fx-tint"),
        Object.assign(a.tint.style, {
          position: "absolute",
          inset: "0",
          opacity: 0,
          pointerEvents: "none",
          zIndex: 3,
          transition: "opacity .3s linear, background-color .3s linear",
        }),
        n.appendChild(a.tint)),
      (x.style.transform = o.mirror ? "scaleX(-1)" : ""));
    for (const y of new Set([a.atk, a.def, o.attEl, o.defEl]))
      y &&
        (y.getAnimations().forEach((v) => v.cancel()),
        (y.style.opacity = ""),
        (y.style.filter = ""),
        (y.style.clipPath = ""));
    (Object.assign(a, {
      atk: o.attEl,
      def: o.defEl,
      shakeEl: t.Game?.S?.noShake ? a.dummy : o.shakeEl,
      mirror: !!o.mirror,
      miss: !!o.miss,
    }),
      (De = o.speed || 1),
      (pt = 0),
      (re = 0),
      (ve = []),
      (it = []),
      (nt = []),
      (W = []),
      (Ga = []),
      (Ja = []),
      (kn.length = 0),
      document.querySelectorAll(".fxclone").forEach((y) => y.remove()));
    const c = $t(a.atk, 0.55),
      p = $t(a.def, 0.5);
    ((P.x = c.x),
      (P.y = c.y),
      (u.x = p.x),
      (u.y = p.y),
      o.miss && (i.has(o.fam) ? (u.y = p.y - 34) : ((u.x = p.x + (p.x - c.x) * 0.9), (u.y = p.y - 22))),
      (a.tint.style.opacity = 0),
      (a.tint.style.background = pn[d[o.type] || o.type]?.tint || pn.status.tint));
  }
  const d = { psychic: "psy", fighting: "fight", flying: "fly", electric: "elec" },
    i = new Set(["ciel", "zone", "piege", "mental", "drain"]),
    w = Vn;
  Vn = function (...o) {
    if (a.miss) {
      f("#barDef");
      return;
    }
    return w(...o);
  };
  function S(o, n) {
    return new Promise((s) => {
      let l = !1;
      const c = () => {
        l || ((l = !0), s());
      };
      a.impact = () => {
        (n?.(), c());
      };
      const p = {
        t: 0,
        fn: (y) => {
          const v = o(y);
          return (v || ((a.impact = null), c()), v);
        },
      };
      (ve.push(p),
        vt ||
          ((vt = !0),
          es((y) => {
            ((je = y), fe(y));
          })),
        Wa(c, 4e3));
    });
  }
  function j(o) {
    if (r[o]) return r[o];
    const n = t.MOVES?.[o],
      s = t.Game?.movePower?.(o) ?? n?.power;
    return !n || !(s > 0) || !as[n.type]
      ? null
      : (r[o] = {
          k: o,
          n: n.name,
          t: n.type,
          p: s,
          c: n.cat,
          f: n.cat === "spec" ? "projectile" : "contact",
        });
  }
  const me = { sleep: 0, poison: 1, burn: 2, freeze: 3, paralysis: 4, confusion: 5 };
  return {
    has: (o) => !!j(o),
    play(o) {
      const n = j(o.move);
      return n
        ? (Wt({ ...o, fam: n.f, type: n.t }), S(be(n), o.onImpact).then(() => !0))
        : Promise.resolve(!1);
    },
    status(o) {
      const n = me[o.status];
      if (n == null) return Promise.resolve(!1);
      Wt({ ...o, attEl: o.attEl || o.defEl });
      const s = qa(n),
        l = !o.attEl;
      return S(l ? (c) => s(c + 460) : s).then(() => !0);
    },
  };
})();
