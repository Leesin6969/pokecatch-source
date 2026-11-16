/**
 * berry bites
 *
 * Public API on the game namespace `t`: t.BerryBites
 *
 * Recovered from the shipped bundle — original chunk #74 at byte 1988306 (728 bytes, sha256:c605081f3986c805).
 * This file is one original source file; the build concatenates them in filename order.
 */
t.BerryBites = function (a, b) {
  const f = parseFloat(a.style.width),
    ue = parseFloat(a.style.height),
    H = Math.max(6, Math.round((Math.min(f, ue) * 0.26) / 2) * 2),
    vt = [
      [f - 2, ue * 0.42],
      [2, ue * 0.64],
      [f * 0.55, 2],
    ];
  let B = "";
  for (const [Je, Ze] of vt.slice(0, b + 1))
    for (let x = 0; x < ue; x += 2)
      for (let $ = 0; $ < f; $ += 2)
        ($ + 1 - Je) ** 2 + (x + 1 - Ze) ** 2 < H ** 2 &&
          (B += `<rect x="${$}" y="${x}" width="2" height="2" fill="black"/>`);
  const se = `<svg xmlns="http://www.w3.org/2000/svg" width="${f}" height="${ue}"><defs><mask id="bite"><rect width="100%" height="100%" fill="white"/>${B}</mask></defs><rect width="100%" height="100%" fill="white" mask="url(#bite)"/></svg>`,
    Ge = `url("data:image/svg+xml,${encodeURIComponent(se)}")`;
  ((a.style.maskImage = a.style.webkitMaskImage = Ge), (a.style.maskMode = "alpha"));
};
