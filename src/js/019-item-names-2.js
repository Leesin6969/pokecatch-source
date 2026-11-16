/**
 * item names 2
 *
 * Public API on the game namespace `t`: t.ITEM_NAMES
 *
 * Recovered from the shipped bundle — original chunk #18 at byte 464767 (1113 bytes, sha256:6f4f27f4163c0a5f).
 * This file is one original source file; the build concatenates them in filename order.
 */
t.ITEM_NAMES = Object.assign(t.ITEM_NAMES || {}, {
  ...Object.fromEntries(Object.entries(t.CONFIG.PENSION.BERRIES).map(([a, b]) => [a, b.name])),
  ...Object.fromEntries(Object.entries(t.CONFIG.BUFF_BERRIES).map(([a, b]) => [a, b.name])),
  "sun-stone": "Pierre Soleil",
  "soothe-bell": "Grelot Zen",
  "kings-rock": "Roche Royale",
  "metal-coat": "Peau Métal",
  "dragon-scale": "Écaille Draco",
  "up-grade": "Améliorator",
  "event-shard": "Éclat",
  coin: "Jetons",
  "dome-fossil": "Fossile Dôme",
  "helix-fossil": "Nautile",
  "old-amber": "Vieil Ambre",
  "silph-scope": "Sylphe Scope",
  "root-fossil": "Fossile Racine",
  "claw-fossil": "Fossile Griffe",
  "skull-fossil": "Fossile Crâne",
  "armor-fossil": "Fossile Armure",
  "adamant-orb": "Orbe Adamant",
  "lustrous-orb": "Orbe Perlé",
  "griseous-orb": "Orbe Platiné",
  gracidea: "Gracidée",
  soul: "Âme",
  "rotom-oven": "Four",
  "rotom-washer": "Lave-linge",
  "rotom-fridge": "Frigo",
  "rotom-fan": "Ventilateur",
  "rotom-mower": "Tondeuse",
  "point-card": "Points Combat",
  auroraticket: "Ticketaurora",
  "nature-capsule": "Capsule Nature",
  "exp-candy-s": "Bonbon Exp. S",
  "exp-candy-m": "Bonbon Exp. M",
  "exp-candy-xl": "Bonbon Exp. XL",
  "exp-candy-big": "Bonbon Exp. Big",
});
