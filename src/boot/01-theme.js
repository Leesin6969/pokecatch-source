/**
 * boot/01-theme.js — window.Theme: dark / light / auto preference, stored in localStorage 'pokecatch.theme'.
 * Original chunk 1 of boot.js.
 */
window.Theme = (function () {
  const t = "pokecatch.theme",
    e = ["dark", "light", "auto"],
    o = window.matchMedia?.("(prefers-color-scheme: light)");
  let d = "dark";
  try {
    const i = localStorage.getItem(t);
    e.includes(i) && (d = i);
  } catch {}
  const s = () => (d === "auto" ? (o?.matches ? "light" : "dark") : d),
    c = () => {
      const i = document.documentElement;
      s() === "light" ? (i.dataset.theme = "light") : delete i.dataset.theme;
    };
  return (
    o?.addEventListener?.("change", () => {
      d === "auto" && c();
    }),
    c(),
    {
      PREFS: e,
      get pref() {
        return d;
      },
      resolved: s,
      set(i) {
        if (e.includes(i)) {
          d = i;
          try {
            i === "dark" ? localStorage.removeItem(t) : localStorage.setItem(t, i);
          } catch {}
          c();
        }
      },
    }
  );
})();
