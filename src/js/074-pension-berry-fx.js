/**
 * pension berry fx
 *
 * Public API on the game namespace `t`: t.PensionBerryFX
 *
 * Recovered from the shipped bundle — original chunk #73 at byte 1982477 (5828 bytes, sha256:3b7f5a791bf3dc4d).
 * This file is one original source file; the build concatenates them in filename order.
 */
t.PensionBerryFX = function (a, b) {
  const f = t.Game.S.reducedAnim || t.CHEAT?.noAnim || matchMedia("(prefers-reduced-motion: reduce)").matches,
    ue = (it) => t.UI.sleep(f ? 1 : it),
    H = (it, De, je) =>
      it.animate(De, { duration: f ? 1 : je, easing: "ease-out", fill: "forwards" }).finished,
    vt = b.map((it) => ({
      w: it,
      left: it.style.left,
      top: it.style.top,
      z: it.style.zIndex,
      flip: it.querySelector(".body").classList.contains("flip"),
    })),
    B = [0, 0],
    se = [
      [-20, -16],
      [20, -16],
      [0, -26],
      [-44, -14],
      [44, -14],
      [-30, -30],
      [30, -30],
      [-62, -20],
      [62, -20],
      [0, -38],
      [-50, -36],
      [50, -36],
    ],
    Ge = (it) => String(it < 0 ? 73 + Math.round(it / 3) : 75),
    Je = (it, [De, je]) => {
      Object.assign(it.style, { left: `calc(50% + ${De}px)`, top: `calc(75% + ${je}px)`, zIndex: Ge(je) });
    },
    Ze = [],
    x = [],
    $ = () => Math.min(3, 1 + 0.4 * (Ze.length - 1)),
    X = () => (Ze.length >= 6 ? 1 : Ze.length >= 3 ? 2 : 3);
  let Tt = null,
    le = 0;
  const P = (it) => {
      const De = (qe) => !Ze.some((ce) => ce.spot === qe),
        je = De(B)
          ? B
          : se.find(De) || [Math.round(Math.random() * 140 - 70), -14 - Math.round(Math.random() * 26)],
        pt = document.createElement("div");
      ((pt.className = "pension-food"), Je(pt, je));
      const [re, We, oe, $e] = it.bounds,
        Z = document.createElement("div");
      Z.className = "pension-spin";
      const A = document.createElement("div");
      ((A.className = "pension-fruit"),
        Object.assign(A.style, {
          width: (oe - re) * 2 + "px",
          height: ($e - We) * 2 + "px",
          scale: (0.85 + Math.random() * 0.3).toFixed(2),
        }));
      const J = new Image();
      ((J.src = it.src),
        (J.alt = ""),
        Object.assign(J.style, { left: -re * 2 + "px", top: -We * 2 + "px" }),
        A.appendChild(J),
        Z.appendChild(A),
        pt.appendChild(Z),
        a.appendChild(pt));
      const de = Math.random() < 0.5 ? -1 : 1,
        _e = Math.round(Math.random() * 40 - 20),
        Re = de * (360 + Math.round(Math.random() * 300)),
        dt = Promise.all([
          H(
            pt,
            [
              { translate: `0 -${a.clientHeight}px` },
              { translate: "0 0", offset: 0.5 },
              { translate: "0 -24px", offset: 0.72 },
              { translate: "0 0" },
            ],
            650,
          ),
          H(
            Z,
            [
              { rotate: `${_e + Re}deg` },
              { rotate: `${_e}deg`, offset: 0.5 },
              { rotate: `${_e - de * 14}deg`, offset: 0.72 },
              { rotate: `${_e + de * 5}deg`, offset: 0.88 },
              { rotate: `${_e}deg` },
            ],
            650,
          ),
          H(
            A,
            [
              { transform: "none" },
              { transform: "scale(1.3,.7)", offset: 0.5 },
              { transform: "none", offset: 0.72 },
              { transform: "none" },
            ],
            650,
          ),
        ]);
      Ze.push({ berry: it, spot: je, food: pt, spin: Z, fruit: A, landed: dt, rest: _e });
    },
    u = ({ berry: it, spot: [De, je] }) => {
      if (f) return;
      const [pt, re, We, oe] = it.bounds;
      for (let $e = 0; $e < 8; $e++) {
        const Z = document.createElement("div");
        ((Z.className = "pension-crumb"),
          Object.assign(Z.style, {
            left: `calc(50% + ${De}px)`,
            top: `calc(75% + ${je}px)`,
            zIndex: Ge(je),
          }));
        const A = new Image();
        ((A.src = it.src),
          (A.alt = ""),
          Object.assign(A.style, {
            left: -(pt + 3 + Math.random() * (We - pt - 7)) * 2 + "px",
            top: -(re + 3 + Math.random() * (oe - re - 7)) * 2 + "px",
          }),
          Z.appendChild(A),
          a.appendChild(Z),
          x.push(Z));
        const J = ($e % 2 ? -1 : 1) * (25 + Math.random() * 45);
        Z.animate(
          [
            { transform: "translate(-50%,-10px)" },
            { transform: `translate(calc(-50% + ${J * 0.5}px),-40px) rotate(70deg)`, offset: 0.4 },
            { transform: `translate(calc(-50% + ${J}px),12px) rotate(160deg) scale(0)` },
          ],
          { duration: 550, easing: "ease-out", fill: "both" },
        )
          .finished.then(() => Z.remove())
          .catch(() => Z.remove());
      }
    },
    ve = {
      open: !0,
      add(it) {
        return ve.open ? (P(it), Tt?.(), !0) : !1;
      },
    };
  return (
    (ve.finished = (async () => {
      try {
        for (
          await new Promise((it) => {
            ((Tt = it), Ze.length && it());
          }),
            Tt = null,
            await Ze[0].landed,
            await Promise.all(
              vt.map(async (it, De) => {
                const je = it.w,
                  pt = je.querySelector(".body"),
                  re = parseFloat(je.style.getPropertyValue("--fx")),
                  We = parseFloat(je.style.getPropertyValue("--fy")),
                  oe = [44, 56, 46, 57][De % 4],
                  $e = De < 2 ? 74 : 81,
                  Z = `calc(${oe}% + ${68 - re}px)`,
                  A = `calc(${$e}% + ${112 - We}px)`;
                (pt.classList.toggle("flip", oe < 50),
                  (je.style.transitionDuration = "0ms"),
                  je.classList.remove("hop", "walk"));
                const J = je.animate(
                  [
                    { left: it.left, top: it.top },
                    { left: Z, top: A },
                  ],
                  { duration: f ? 1 : 800, easing: "ease-out" },
                );
                (je.classList.add("walk"),
                  await J.finished,
                  (je.style.left = Z),
                  (je.style.top = A),
                  (je.style.zIndex = $e),
                  je.classList.remove("walk"));
              }),
            );
          !(
            !Ze.length &&
            (await Promise.race([
              ue(300),
              new Promise((De) => {
                Tt = De;
              }),
            ]),
            (Tt = null),
            !Ze.length)
          );
        ) {
          const it = Ze[0];
          if ((await it.landed, it.spot !== B)) {
            const De = { left: it.food.style.left, top: it.food.style.top },
              je = (-it.spot[0] / (it.fruit.offsetWidth / 2)) * 57.3;
            ((it.spot = B), Je(it.food, B));
            const pt = 260 / $();
            await Promise.all([
              it.food.animate([De, { left: it.food.style.left, top: it.food.style.top }], {
                duration: f ? 1 : pt,
                easing: "ease-out",
              }).finished,
              H(it.spin, [{ rotate: `${it.rest}deg` }, { rotate: `${it.rest + je}deg` }], pt),
            ]);
          }
          for (let De = 0, je = X(); De < je; De++) {
            const pt = $();
            (await Promise.all(
              b.map(async (re, We) => {
                await ue((We * 30) / pt);
                const oe = re.querySelector(".body img");
                await H(
                  oe,
                  [
                    { translate: "0 0", scale: "1 1" },
                    { translate: "0 3px", scale: "1.12 .85", offset: 0.35 },
                    { translate: "0 -2px", scale: ".96 1.06", offset: 0.65 },
                    { translate: "0 0", scale: "1 1" },
                  ],
                  300 / pt,
                );
              }),
            ),
              u(it),
              t.BerryBites(it.fruit, De),
              await H(it.fruit, [{ transform: "scale(1.12,.8)" }, { transform: "none" }], 150 / pt),
              await ue(80 / pt));
          }
          (await H(it.fruit, [{ transform: "scale(1)" }, { transform: "scale(0)" }], 220 / $()),
            it.food.remove(),
            Ze.shift(),
            ve.oneaten?.(le++));
        }
        ((ve.open = !1),
          ve.onclose?.(),
          b.forEach((it) =>
            it
              .querySelector(".body img")
              .getAnimations()
              .filter((De) => Number.isFinite(De.effect.getComputedTiming().iterations))
              .forEach((De) => De.cancel()),
          ),
          await Promise.all(
            b.map((it) => {
              const De = it.querySelector(".emo");
              return (
                (De.innerHTML = '<img src="assets/ui/marks/joyful.png" alt="">'),
                it.classList.add("say", "hop"),
                ue(800)
              );
            }),
          ),
          await Promise.all(
            vt.map(async (it) => {
              (it.w.classList.remove("hop", "say"),
                it.w.classList.add("walk"),
                it.w
                  .querySelector(".body")
                  .classList.toggle(
                    "flip",
                    parseFloat(it.left) > parseFloat(it.w.style.left.match(/[\d.]+/)[0]),
                  ),
                await it.w.animate(
                  [
                    { left: it.w.style.left, top: it.w.style.top },
                    { left: it.left, top: it.top },
                  ],
                  { duration: f ? 1 : 900, easing: "ease-out" },
                ).finished,
                (it.w.style.left = it.left),
                (it.w.style.top = it.top),
                (it.w.style.zIndex = it.z));
            }),
          ));
      } finally {
        ((ve.open = !1),
          Ze.forEach((it) => it.food.remove()),
          x.forEach((it) => it.remove()),
          vt.forEach((it) => {
            ((it.w.style.left = it.left),
              (it.w.style.top = it.top),
              (it.w.style.zIndex = it.z),
              it.w.classList.remove("walk", "hop", "say"),
              it.w.querySelector(".body").classList.toggle("flip", it.flip),
              it.w
                .querySelector(".body img")
                .getAnimations()
                .filter((De) => Number.isFinite(De.effect.getComputedTiming().iterations))
                .forEach((De) => De.cancel()));
          }));
      }
    })()),
    ve
  );
};
