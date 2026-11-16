/**
 * sleep
 *
 * Public API on the game namespace `t`: t.Sleep
 *
 * Recovered from the shipped bundle — original chunk #93 at byte 2635987 (4942 bytes, sha256:b31be778a610aac6).
 * This file is one original source file; the build concatenates them in filename order.
 */
t.Sleep = (function () {
  const { h: a, esc: b } = t.UI,
    f = t.Game,
    ue = 5e3,
    H = 1500;
  let vt = !1,
    B = Date.now(),
    se = 0,
    Ge = null,
    Je = null,
    Ze = 0,
    x = null,
    $ = null,
    X = 0,
    Tt = 0;
  const le = () =>
      !!f.S &&
      f.teamMons().length > 0 &&
      !document.hidden &&
      !document.body.classList.contains("titled") &&
      !document.body.classList.contains("launching") &&
      !t.TabLock?.lost &&
      !t.CatchUp?.pending &&
      t.App?.current !== "admin",
    P = () => new Date().toLocaleTimeString(t.I18n?.lang, { hour: "2-digit", minute: "2-digit" });
  function u() {
    const A = t.Adventure.state,
      J = A.nodes?.[A.node];
    return !A.battle && !A.event && J?.type === "gym" && !t.Adventure.leaderBeaten(J.gym)
      ? {
          cls: "wait",
          gym: !0,
          img: J.gym.sprite ? `assets/trainers/${J.gym.sprite}.png` : "",
          text: e("{name} t'attend", { name: b(e(J.gym.leader)) }),
        }
      : A.pending && A.pending.type !== "riddle"
        ? { cls: "wait", text: e("Un choix t'attend") }
        : null;
  }
  function ve() {
    let A = null;
    for (const J of f.S.mons || [])
      J.shiny && !$.has(J.uid) && (!A || (J.caughtAt || 0) >= (A.caughtAt || 0)) && (A = J);
    return A;
  }
  function it() {
    if (!Ge) return;
    const A = t.Adventure.state,
      J = A.nodes?.[A.node],
      de = f.S.stats,
      _e = u(),
      Re = !_e && ve(),
      dt = _e
        ? `<div class="sl-ev ${_e.cls}">${_e.img ? `<img src="${_e.img}" alt="">` : ""}⏸ ${_e.text}</div>`
        : Re
          ? `<div class="sl-ev shiny"><img src="assets/pokemon/shiny/${Re.id}.png" alt="">${e("Chromatique capturé")} · ${b(f.DEX[Re.id].name)}</div>`
          : "",
      qe = t.Perf.touch;
    ((Ge.querySelector(".sl-in").innerHTML =
      `<span class="sl-moon" aria-hidden="true">🌙</span><div class="sl-time">${P()}</div>
      <div class="sl-where">${J && !A.event ? b(t.STORY.placeName(J)) : "&nbsp;"}</div>
      <div class="sl-count"><span>${e("<b>{n}</b> combats", { n: t.UI.fmt(de.battles - x.battles) })}</span><span>${e("<b>{n}</b> captures", { n: t.UI.fmt(de.caught - x.caught) })}</span></div>${dt}`),
      (Ge.querySelector(".sl-tap").textContent = _e?.gym
        ? e("Touche l'écran pour regarder le combat")
        : e(qe ? "Touche l'écran pour revenir" : "Clique ou appuie sur une touche pour revenir")));
    const ce = Math.floor(Date.now() / 6e4);
    ce !== se &&
      ((se = ce),
      (Ge.querySelector(".sl-in").style.translate =
        `${Math.round(Math.random() * 16 - 8)}px ${Math.round(Math.random() * 16 - 8)}px`));
  }
  function De() {
    vt ||
      !le() ||
      ((vt = !0),
      (se = 0),
      (x = { battles: f.S.stats.battles, caught: f.S.stats.caught }),
      ($ = new Set((f.S.mons || []).filter((A) => A.shiny).map((A) => A.uid))),
      (Ge = a(
        `<div class="sleep-fx" role="button" tabindex="0" aria-label="${e("Mode veille")}"><div class="sl-in"></div><div class="sl-tap"></div></div>`,
      )),
      document.body.appendChild(Ge),
      it(),
      Ge.animate([{ opacity: 0 }, { opacity: 1 }], { duration: H, easing: "ease-in", fill: "both" }),
      Ge.addEventListener("pointerdown", (A) => {
        (A.preventDefault(), je());
      }),
      (Tt = Wa(() => {
        ((Tt = 0),
          vt &&
            ((Je = t.App.current),
            (Ze = t.scrollY),
            t.Screens[Je]?.leave?.(),
            document.querySelector(".screen.active")?.classList.remove("active"),
            document.documentElement.classList.add("sleeping")));
      }, H)),
      (X = Ss(it, 5e3)));
  }
  function je() {
    if (!vt) return;
    ((vt = !1),
      (B = Date.now()),
      clearTimeout(Tt),
      clearInterval(X),
      document.documentElement.classList.contains("sleeping") &&
        (document.documentElement.classList.remove("sleeping"),
        document.getElementById("screen-" + Je)?.classList.add("active"),
        t.Screens[Je]?.enter?.(),
        t.Screens[Je]?.render(),
        t.App.refreshHeader(),
        t.scrollTo({ top: Ze, behavior: "instant" })));
    const A = Ge;
    ((Ge = null),
      A.getAnimations().forEach((J) => J.cancel()),
      A.animate([{ opacity: 1 }, { opacity: 0 }], { duration: 250, fill: "forwards" })
        .finished.catch(() => {})
        .then(() => A.remove()));
  }
  const pt = () => {
    B = Date.now();
  };
  for (const A of ["pointerdown", "wheel", "touchstart", "mousemove"])
    addEventListener(A, pt, { capture: !0, passive: !0 });
  (addEventListener(
    "keydown",
    (A) => {
      vt ? (A.preventDefault(), A.stopPropagation(), je()) : pt();
    },
    { capture: !0 },
  ),
    document.addEventListener("visibilitychange", () => {
      document.hidden || pt();
    }),
    Ss(() => {
      const A = t.Perf.get("sleep");
      !vt && A && Date.now() - B >= A && De();
    }, ue));
  const re = "pokecatch-bat-offer",
    We = 30 * 6e4;
  let oe = Date.now();
  document.addEventListener("visibilitychange", () => {
    document.hidden || (oe = Date.now());
  });
  const $e = () => {
    try {
      return !!localStorage.getItem(re);
    } catch {
      return !0;
    }
  };
  function Z(A) {
    if (
      !A &&
      (!t.Perf.touch ||
        t.Perf.preset() !== "balanced" ||
        $e() ||
        vt ||
        document.hidden ||
        Date.now() - oe < We)
    )
      return;
    const J = document.querySelector("#screen-adventure.active #arena");
    if (!J || document.querySelector(".bat-offer")) return;
    const de =
      a(`<div class="bat-offer" role="group"><span class="ic" aria-hidden="true">🔋</span><span class="t"><b>${e("Économiser la batterie ?")}</b>${e("Passe en mode Économie : moins d'effets, écran noir quand tu ne touches à rien.")}</span>
      <button class="btn small ghost" data-v="0">${e("Non")}</button><button class="btn small" data-v="1">${e("Oui")}</button></div>`);
    (J.after(de),
      de.animate(
        [
          { opacity: 0, transform: "translateY(-6px)" },
          { opacity: 1, transform: "none" },
        ],
        { duration: 220, easing: "ease-out" },
      ),
      de.querySelectorAll("button").forEach(
        (_e) =>
          (_e.onclick = () => {
            try {
              localStorage.setItem(re, _e.dataset.v);
            } catch {}
            (_e.dataset.v === "1" && (t.Perf.set("preset", "eco"), t.UI.toast(e("Mode Économie activé"))),
              de
                .animate([{ opacity: 1 }, { opacity: 0 }], 180)
                .finished.catch(() => {})
                .then(() => de.remove()));
          }),
      ));
  }
  return (
    Ss(Z, 6e4),
    {
      sleep: De,
      wake: je,
      offer: Z,
      get on() {
        return vt;
      },
    }
  );
})();
