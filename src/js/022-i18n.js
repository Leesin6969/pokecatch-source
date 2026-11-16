/**
 * i18n
 *
 * Public API on the game namespace `t`: t.I18n
 *
 * Recovered from the shipped bundle — original chunk #21 at byte 467739 (2053 bytes, sha256:756d7cbc52210f01).
 * This file is one original source file; the build concatenates them in filename order.
 */
t.I18n = (function () {
  const a = "pokecatch.lang",
    b = {
      fr: "Français",
      en: "English",
      es: "Español",
      de: "Deutsch",
      "zh-Hans": "简体中文",
      "zh-Hant": "繁體中文",
      ko: "한국어",
      ja: "日本語",
    },
    { pref: f, lang: ue, LANGS: H } = t.LANG_PICK;
  document.documentElement.lang = ue;
  const vt = t.I18N || {},
    B = (Ze) => {
      const x = Ze.replace(/<[^>]*>/g, "")
          .replace(/[\s)\]」』"'’”!?.…]+$/, "")
          .slice(-1),
        $ = x.charCodeAt(0);
      return $ >= 44032 && $ <= 55203
        ? ($ - 44032) % 28
        : /[013678]/.test(x)
          ? x === "1" || x === "7" || x === "8"
            ? 8
            : 1
          : /[lr]/i.test(x)
            ? 8
            : /[mn]/i.test(x)
              ? 1
              : 0;
    },
    se = (Ze) =>
      Ze.replace(/\{([^/{}]+)\/([^/{}]+)\}/g, (x, $, X, Tt) => {
        const le = B(Ze.slice(0, Tt));
        return $ === "으로" ? (le && le !== 8 ? $ : X) : le ? $ : X;
      }),
    Ge = (Ze, x) => {
      if (!x) return Ze;
      const $ = Ze.replace(/\{(\w+)\}/g, (X, Tt) => (Tt in x ? x[Tt] : X));
      return ue === "ko" ? se($) : $;
    };
  function Je(Ze, x) {
    if (ue !== "fr") {
      const $ = vt[ue]?.[Ze] ?? vt.en?.[Ze];
      if ($ != null) return Ge($, x);
    }
    return Ge(Ze, x);
  }
  if (ue !== "fr") {
    const Ze = t.I18N_DATA?.[ue] || {};
    for (const Tt of t.POKEDEX || []) {
      const le = Ze.pokemon?.[Tt.id];
      le && ((Tt.name = le[0] || Tt.name), (Tt.genus = le[1] || Tt.genus), (Tt.flavor = le[2] || Tt.flavor));
    }
    for (const [Tt, le] of Object.entries(t.MOVES || {})) Ze.moves?.[Tt] && (le.name = Ze.moves[Tt]);
    const x = t.ITEM_NAMES || {};
    for (const Tt of Object.keys(x)) x[Tt] = Ze.items?.[Tt] || Je(x[Tt]);
    for (const Tt of Object.values(t.TYPES || {})) {
      const le = `${Tt.fr} (type)`,
        P = Je(le);
      Tt.fr = P !== le ? P : Je(Tt.fr);
    }
    for (const Tt of Object.values(t.CONFIG?.WEATHER?.TYPES || {})) Tt.name = Je(Tt.name);
    const $ = (Tt) => vt[ue]?.[Tt] ?? vt.en?.[Tt],
      X = () => {
        const Tt = document.createTreeWalker(document.body, NodeFilter.SHOW_TEXT);
        for (let le; (le = Tt.nextNode());) {
          const P = le.nodeValue.trim(),
            u = P && $(P);
          u && (le.nodeValue = le.nodeValue.replace(P, u));
        }
        for (const le of ["title", "placeholder", "aria-label"])
          for (const P of document.body.querySelectorAll(`[${le}]`)) {
            const u = $(P.getAttribute(le));
            u && P.setAttribute(le, u);
          }
      };
    !document.body?.firstElementChild && document.readyState === "loading"
      ? document.addEventListener("DOMContentLoaded", X)
      : X();
  }
  return {
    lang: ue,
    pref: f,
    LANGS: H,
    NAMES: b,
    t: Je,
    set(Ze) {
      try {
        Ze === "auto" ? localStorage.removeItem(a) : localStorage.setItem(a, Ze);
      } catch {}
      try {
        t.Game?.save?.();
      } catch {}
      location.reload();
    },
  };
})();
