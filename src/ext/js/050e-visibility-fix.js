/**
 * visibility fix — shows real Pokémon artwork everywhere.
 *
 * The base CSS paints "unknown / seen / veiled / silhouette" Pokémon with `filter: brightness(0)`,
 * which makes perfectly valid sprites look like black boxes. The sprite assets themselves are valid
 * (audited: 0 black/transparent files), so this extension replaces the solid-black treatment with a
 * soft grayscale/dimmed preview that still hints at "not caught yet" without hiding the art.
 */
(function () {
  try {
    const CSS = `
/* ---- show real sprite art instead of solid black silhouettes ---- */
.dex-cell.unknown img,
.dex-cell.unknown .sprbox img,
.unknown .sprbox img,
.evo-chain .evo.unknown img,
.zone-cell.unknown .sprbox img,
.egg-mon.unknown .sprbox img,
.pen-egg .egg-mini.unknown img,
.dex-seen-card.unknown .dex-seen-spr img,
.dc-hero.unknown img.art,
.ot-box.unknown img,
.cs-gstep.unknown .sprbox img,
.map-sum .lgs img.seen,
.mp-grid .unk img,
.mp-grid .seen img,
.mp-hero .faces.sil img,
.mp-hero .faces img.sil,
.gb-mon.sil .gb-art img,
.ev-mon.sil img,
.mp-row .mp-ev.sil img,
.ev-pin-mon.sil img,
.silhouette {
  filter: grayscale(.55) brightness(.92) contrast(1.05) !important;
  opacity: .66 !important;
}
/* wild "veiled" encounter: ghostly but visible, not a black blob */
.enemy.veiled .wrap > img {
  filter: sepia(.35) saturate(1.35) brightness(1.05) drop-shadow(0 0 6px rgba(150,110,220,.75)) !important;
  opacity: .85 !important;
}
/* cut-scene silhouettes: keep mood but let the shape/colors read */
img.silhouette, .silhouette img { opacity: .5 !important; }
`;
    const inject = () => {
      if (document.getElementById('pc-asset-visibility')) return;
      const st = document.createElement('style');
      st.id = 'pc-asset-visibility';
      st.textContent = CSS;
      document.head.appendChild(st);
    };
    if (document.head) inject();
    else document.addEventListener('DOMContentLoaded', inject, { once: true });
  } catch (e) {}
})();
