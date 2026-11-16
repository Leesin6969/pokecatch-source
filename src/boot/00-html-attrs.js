/**
 * boot/00-html-attrs.js — sets <html lang="fr" class="px"> before the stylesheet paints.
 * Concatenated first by tools/build.mjs. Original chunk 0 of boot.js.
 */
(function (t) {
  for (var e in t) document.documentElement.setAttribute(e, t[e]);
})({ lang: "fr", class: "px" });
