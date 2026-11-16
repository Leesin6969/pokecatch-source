/**
 * specials
 *
 * Public API on the game namespace `t`: t.SPECIALS
 *
 * Recovered from the shipped bundle — original chunk #15 at byte 438518 (321 bytes, sha256:7cbf19ea422b43f0).
 * This file is one original source file; the build concatenates them in filename order.
 */
t.SPECIALS = (function () {
  const a = [{ id: 90025, base: 25, name: "Pika'Squette" }];
  for (const f of a) {
    const ue = t.POKEDEX.find((H) => H.id === f.base);
    (t.POKEDEX.push({ ...ue, id: f.id, num: f.base, name: f.name, legendary: !1, mythical: !1, unique: !0 }),
      (t.BASE_EXP[f.id] = t.BASE_EXP[f.base]));
  }
  const b = new Set(a.map((f) => f.id));
  return { ids: b, has: (f) => b.has(f) };
})();
