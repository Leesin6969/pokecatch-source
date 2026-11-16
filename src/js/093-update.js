/**
 * update
 *
 * Public API on the game namespace `t`: t.Update
 *
 * Recovered from the shipped bundle — original chunk #92 at byte 2633469 (2517 bytes, sha256:25dd2fb0deff8ec2).
 * This file is one original source file; the build concatenates them in filename order.
 */
t.Update = (function () {
  const H = "pokecatch.update",
    vt = "pokecatch.updated",
    B = !!(t.BUILD && t.CDN),
    se = () => t.Game;
  let Ge = null,
    Je = null,
    Ze = -1 / 0,
    x = !1,
    $ = !1,
    X = !1,
    Tt = -1 / 0,
    le = typeof t.ONLINE == "number" ? t.ONLINE : null;
  const P = [],
    u = 3 * 6e4,
    ve = () => {
      try {
        return sessionStorage.getItem(H);
      } catch {
        return null;
      }
    };
  function it() {
    if (!B || Ge) return Promise.resolve(Ge);
    if (Je) return Je;
    Ze = zn.now();
    const Z = new AbortController(),
      A = Wa(() => Z.abort(), 2e3);
    return (Je = fetch(t.CDN + "boot.js", {
      cache: "no-cache",
      mode: "cors",
      credentials: "omit",
      signal: Z.signal,
    })
      .then((J) => (J.ok ? J.text() : ""))
      .then((J) => {
        const de = /ONLINE\s*=\s*(\d+)/.exec(J)?.[1];
        de != null &&
          +de !== le &&
          ((le = +de),
          P.forEach((Re) => {
            try {
              Re(le);
            } catch (dt) {
              console.warn(dt);
            }
          }));
        const _e = /BUILD\s*=\s*"([0-9a-f]+)"/.exec(J)?.[1];
        return (_e && _e !== t.BUILD && _e !== ve() && (Ge = _e), Ge);
      })
      .catch(() => null)
      .finally(() => {
        (clearTimeout(A), (Je = null));
      }));
  }
  const De =
    "#modal-root.open, .fx-skip:not([data-gone]), .rc-fx, .hatch-fx, .lab-fx, .title-fx, .tv-fx, .legend-intro, .vs-intro, .boss-intro, .heal-fx, #screen-trade.active";
  function je() {
    const Z = se()?.S?.adv,
      A = Z?.battle,
      J = document.activeElement;
    return t.CatchUp?.pending ||
      t.Cloud?.checking ||
      t.TabLock?.lost ||
      ((Z?.event || Z?.tower || Z?.zone) && zn.now() - Tt > 8e3) ||
      A?.boss ||
      A?.kind === "gym" ||
      A?.kind === "static" ||
      (J && (J.isContentEditable || /^(INPUT|TEXTAREA|SELECT)$/.test(J.tagName)))
      ? !1
      : !document.querySelector(De);
  }
  function pt(Z) {
    if (x) return;
    x = !0;
    try {
      (sessionStorage.setItem(H, Ge), sessionStorage.setItem(vt, "1"));
    } catch {}
    const A = se().S;
    (Z != null
      ? ((A.lastTick = Z), (X = !0), se().save({ idle: !0 }))
      : ((A.lastTick = se().time()), se().save()),
      location.reload());
  }
  function re() {
    if ($ || x || !Ge || document.hidden || !je()) return;
    $ = !0;
    let Z = () => {};
    t.UI.modal({
      className: "dexcard-modal up-modal",
      dismissable: !1,
      body: `<div class="dc-head"><h2>${e("Mise à jour disponible !")}</h2></div><div class="sup-banner"></div>
        <p class="cl-note">${e("Recharge le jeu pour jouer à la nouvelle version. Ta partie est sauvegardée.")}</p>`,
      actions: [{ label: e("Recharger"), cls: "primary", value: !0 }],
      onOpen: (A) => {
        Z = t.App?.parade?.(A.querySelector(".sup-banner")) || Z;
      },
    }).then(() => {
      (Z(), pt());
    });
  }
  B &&
    Ss(() => {
      document.hidden || (Ge ? re() : zn.now() - Ze > (le != null && le < 100 ? u : 9e5) && it());
    }, 5e3);
  function We() {
    ((Tt = zn.now()), re());
  }
  function oe() {
    try {
      const Z = sessionStorage.getItem(vt) === "1";
      return (sessionStorage.removeItem(vt), Z);
    } catch {
      return !1;
    }
  }
  async function $e(Z) {
    return !B || (!Ge && zn.now() - Ze > 6e4 && (await it()), !Ge || document.hidden || (!$ && !je()))
      ? !1
      : (pt(Z), !0);
  }
  return {
    shown: $e,
    reloaded: oe,
    between: We,
    get keepTick() {
      return X;
    },
    get online() {
      return le;
    },
    onOnline(Z) {
      P.push(Z);
    },
  };
})();
