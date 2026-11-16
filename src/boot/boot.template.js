/**
 * boot/boot.template.js — the CDN boot loader, with every deployment-specific value left as a
 * __TOKEN__ that tools/build.mjs fills in:
 *
 *   __LANG_FILES__  per-language bundle URLs            __APP_HTML__   contents of src/shell/app.html
 *   __ADMIN_FILES__ extra admin module URLs (empty)     __ASSETS__     { css, vendor[], js } URLs
 *   __GAME_INTRO__  URL of the legendary-intro workshop __CDN__        base URL for assets
 *   __BUILD__       build hash (self-update checks)      __ONLINE__     players-online seed value
 *
 * boot.js does not contain any game logic: it sets the <html> attributes and the theme, loads the
 * language bundle, injects the shell markup, then loads the vendor + app bundles.
 */
(function () {
  ((window.LANG_FILES = __LANG_FILES__),
    (window.ADMIN_FILES = __ADMIN_FILES__),
    (window.GAME_INTRO = __GAME_INTRO__),
    (window.CDN = __CDN__),
    (window.BUILD = __BUILD__),
    (window.ONLINE = __ONLINE__));
  var t = function () {
    if (!(location.origin + "/" === window.CDN || document.querySelector("base"))) {
      document.head.insertBefore(
        Object.assign(document.createElement("base"), { href: window.CDN }),
        document.head.firstChild,
      );
      var A = window.HTMLImageElement && HTMLImageElement.prototype,
        a = A && Object.getOwnPropertyDescriptor(A, "src");
      a &&
        a.set &&
        a.configurable &&
        Object.defineProperty(A, "src", {
          configurable: !0,
          enumerable: a.enumerable,
          get: a.get,
          set: function (n) {
            (this.crossOrigin == null && /^\/?assets\//.test(n) && (this.crossOrigin = "anonymous"),
              a.set.call(this, n));
          },
        });
    }
  };
  t();
  var e = [];
  ((window.LANG_LOAD = function (A) {
    e = A;
  }),
    (function () {
      const A = "pokecatch.lang",
        a = ["fr", "en", "es", "de", "zh-Hans", "zh-Hant", "ko", "ja", "vi"];
      let n = "auto";
      try {
        n = localStorage.getItem(A) || "auto";
      } catch {}
      const h = () => {
          for (const l of navigator.languages || [navigator.language || ""]) {
            const r = String(l).slice(0, 2).toLowerCase();
            if (r === "zh") return /hant|-(tw|hk|mo)\b/i.test(l) ? "zh-Hant" : "zh-Hans";
            if (a.includes(r)) return r;
          }
          return "en";
        },
        g = a.includes(n) ? n : h();
      window.LANG_PICK = { pref: n, lang: g, LANGS: a };
      const p = window.LANG_FILES
        ? window.LANG_FILES[g] || []
        : g === "fr"
          ? []
          : [`js/lang/data-${g}.js`, `js/lang/${g}.js`];
      if (window.LANG_LOAD) window.LANG_LOAD(p);
      else for (const l of p) document.write(`<script src="${l}"><\/script>`);
    })());
  var o = __ASSETS__,
    d = __APP_HTML__,
    s = document,
    c = function () {
      window.BOOT_FAIL && window.BOOT_FAIL();
    },
    i = o.vendor.concat(e, [o.js]);
  i.forEach(function (A) {
    s.head.appendChild(Object.assign(s.createElement("link"), { rel: "preload", as: "script", href: A }));
  });
  var M = new Promise(function (A) {
      s.head.appendChild(
        Object.assign(s.createElement("link"), { rel: "stylesheet", href: o.css, onload: A, onerror: c }),
      );
    }),
    v =
      window.SW_REG && navigator.serviceWorker
        ? window.SW_REG.then(function (A) {
            if (!(!A || navigator.serviceWorker.controller))
              return new Promise(function (a) {
                (navigator.serviceWorker.addEventListener("controllerchange", a), setTimeout(a, 3e3));
              });
          })
        : null,
    I = [];
  M.then(function () {
    return new Promise(function (A) {
      var a = function () {
        (I.forEach(function (n) {
          n();
        }),
          s.body.insertAdjacentHTML("afterbegin", d),
          A());
      };
      s.body ? a() : s.addEventListener("DOMContentLoaded", a);
    });
  })
    .then(function () {
      return v;
    })
    .then(function () {
      i.forEach(function (A) {
        s.head.appendChild(Object.assign(s.createElement("script"), { src: A, async: !1, onerror: c }));
      });
    });
})();
