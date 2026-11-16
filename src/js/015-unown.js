/**
 * unown
 *
 * Public API on the game namespace `t`: t.UNOWN
 *
 * Recovered from the shipped bundle — original chunk #14 at byte 437928 (589 bytes, sha256:085996940f6673a6).
 * This file is one original source file; the build concatenates them in filename order.
 */
t.UNOWN = (function () {
  const b = [..."ABCDEFGHIJKLMNOPQRSTUVWXYZ", "!", "?"],
    f = b.map((B, se) => (se ? 20100 + se : 201)),
    ue = t.POKEDEX.find((B) => B.id === 201);
  ue.form = "A";
  const H = (B) => ({
    get() {
      return (t.I18N_DATA?.[t.I18n?.lang]?.pokemon?.[201]?.[0] || "Zarbi") + " " + B;
    },
    set() {},
    enumerable: !0,
    configurable: !0,
  });
  return (
    b.forEach((B, se) => {
      if (!se) {
        Object.defineProperty(ue, "name", H(B));
        return;
      }
      const Ge = { ...ue, id: f[se], num: 201, form: B };
      (Object.defineProperty(Ge, "name", H(B)), t.POKEDEX.push(Ge), (t.BASE_EXP[f[se]] = t.BASE_EXP[201]));
    }),
    {
      ids: f,
      LETTERS: b,
      isUnown: (B) => B === 201 || (B > 20100 && B <= 20100 + b.length - 1),
      letterOf: (B) => b[f.indexOf(B)],
    }
  );
})();
