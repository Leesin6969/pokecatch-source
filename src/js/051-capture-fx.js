/**
 * capture fx
 *
 * Public API on the game namespace `t`: t.CaptureFX
 *
 * Recovered from the shipped bundle — original chunk #50 at byte 1355785 (27162 bytes, sha256:92faa55f2a618a4d).
 * This file is one original source file; the build concatenates them in filename order.
 */
t.CaptureFX = (function () {
  const { h: a, sleep: b, itemSrc: f } = t.UI;
  let ue = { cy: 0.5, left: 0.1, bottom: 0.9 };
  const H = { outCubic: (Z) => 1 - Math.pow(1 - Z, 3), inQuad: (Z) => Z * Z };
  let vt = !1;
  const B = (Z, A, J = (de) => de) =>
      new Promise((de) => {
        const _e = zn.now();
        let Re = !1,
          dt,
          qe;
        const ce = () => {
          if (Re) return;
          (clearTimeout(dt), cancelAnimationFrame(qe));
          const tt = vt ? 1 : Math.min(1, (zn.now() - _e) / Z);
          if ((A(J(tt), tt), tt >= 1)) {
            ((Re = !0), de());
            return;
          }
          ((qe = es(ce)), (dt = Wa(ce, 50)));
        };
        ce();
      }),
    se = (Z, A, J) => Z.animate(A, typeof J == "number" ? { duration: J } : J).finished.catch(() => {}),
    Ge = (Z, A, J) => Z + (A - Z) * J,
    Je = (Z, A, J, de) => (1 - de) * (1 - de) * Z + 2 * (1 - de) * de * A + de * de * J;
  (function () {
    const A = new Image();
    ((A.onload = () => {
      try {
        const J = document.createElement("canvas");
        ((J.width = A.width), (J.height = A.height));
        const de = J.getContext("2d");
        de.drawImage(A, 0, 0);
        const _e = de.getImageData(0, 0, J.width, J.height).data;
        let Re = J.width,
          dt = 0,
          qe = J.height,
          ce = 0;
        for (let tt = 0; tt < J.height; tt++)
          for (let mt = 0; mt < J.width; mt++)
            _e[(tt * J.width + mt) * 4 + 3] > 20 &&
              ((Re = Math.min(Re, mt)),
              (dt = Math.max(dt, mt)),
              (qe = Math.min(qe, tt)),
              (ce = Math.max(ce, tt)));
        ue = { cy: (qe + ce + 1) / 2 / J.height, left: Re / J.width, bottom: (ce + 1) / J.height };
      } catch {}
    }),
      (A.src = f("poke-ball")));
  })();
  function Ze(
    Z,
    A,
    J,
    {
      n: de = 10,
      colors: _e = ["#fff"],
      size: Re = 4,
      spread: dt = 80,
      up: qe = 40,
      dur: ce = 600,
      gravity: tt = 60,
      shape: mt = "square",
    } = {},
  ) {
    for (let Te = 0; Te < de; Te++) {
      const At = document.createElement("div");
      At.className = "pfx " + mt;
      const yt = Re * (0.6 + Math.random() * 0.8);
      (Object.assign(At.style, {
        left: A + "px",
        top: J + "px",
        width: yt + "px",
        height: yt + "px",
        background: _e[Te % _e.length],
      }),
        Z.appendChild(At));
      const he = Math.random() * Math.PI * 2,
        fe = dt * (0.4 + Math.random() * 0.6),
        Oe = Math.cos(he) * fe,
        Ee = Math.sin(he) * fe * 0.6 - qe;
      se(
        At,
        [
          { transform: "translate(-50%,-50%) scale(1)", opacity: 1 },
          {
            transform: `translate(calc(-50% + ${Oe}px), calc(-50% + ${Ee}px)) scale(.9) rotate(${Math.random() * 180}deg)`,
            opacity: 1,
            offset: 0.6,
          },
          {
            transform: `translate(calc(-50% + ${Oe * 1.15}px), calc(-50% + ${Ee + tt}px)) scale(.3)`,
            opacity: 0,
          },
        ],
        { duration: ce * (0.8 + Math.random() * 0.4), easing: "cubic-bezier(.2,.7,.4,1)" },
      ).then(() => At.remove());
    }
  }
  function x(Z, A, J, de, _e, Re = 500, dt = 4) {
    const qe = document.createElement("div");
    return (
      (qe.className = "ring"),
      Object.assign(qe.style, { left: A + "px", top: J + "px", borderColor: de, borderWidth: dt + "px" }),
      Z.appendChild(qe),
      se(
        qe,
        [
          { width: "0px", height: "0px", opacity: 1 },
          { width: _e + "px", height: _e + "px", opacity: 0 },
        ],
        { duration: Re, easing: "cubic-bezier(.1,.7,.3,1)" },
      ).then(() => qe.remove())
    );
  }
  function $(Z, A, J, de, _e = "#fff") {
    const Re = document.createElement("div");
    return (
      (Re.className = "impact"),
      Object.assign(Re.style, {
        left: A + "px",
        top: J + "px",
        width: de + "px",
        height: de + "px",
        background: _e,
      }),
      Z.appendChild(Re),
      se(
        Re,
        [
          { transform: "translate(-50%,-50%) scale(.2) rotate(0deg)", opacity: 1 },
          { transform: "translate(-50%,-50%) scale(1.15) rotate(20deg)", opacity: 1, offset: 0.35 },
          { transform: "translate(-50%,-50%) scale(1.3) rotate(30deg)", opacity: 0 },
        ],
        { duration: 260, easing: "ease-out" },
      ).then(() => Re.remove())
    );
  }
  function X(Z, A = 6, J = 260) {
    return t.Game?.S?.noShake
      ? Promise.resolve()
      : se(
          Z,
          [
            { translate: "0 0" },
            { translate: `${-A}px ${A / 2}px` },
            { translate: `${A}px ${-A / 2}px` },
            { translate: `${-A / 2}px ${-A / 2}px` },
            { translate: `${A / 3}px ${A / 3}px` },
            { translate: "0 0" },
          ],
          { duration: J },
        );
  }
  function Tt(Z, A, J) {
    const de = a(`<div class="cb-pos"><div class="cb-shadowless">
        <div class="cb-aura"></div>
        <div class="cb-sq"><div class="cb-spin">
          <div class="cb-light"></div>
          <img class="cb-half cb-bot" src="${f(J)}" alt="">
          <div class="cb-lid"><img class="cb-half cb-top" src="${f(J)}" alt=""></div>
          <div class="cb-glint"></div>
        </div></div>
      </div></div>`);
    de.style.width = de.style.height = A + "px";
    const _e = (ue.cy * 100).toFixed(2);
    return (
      (de.querySelector(".cb-top").style.clipPath = `inset(0 0 ${100 - _e}% 0)`),
      (de.querySelector(".cb-bot").style.clipPath = `inset(${_e}% 0 0 0)`),
      (de.querySelector(".cb-lid").style.transformOrigin = `${(ue.left * 100).toFixed(1)}% ${_e}%`),
      (de.querySelector(".cb-sq").style.transformOrigin = `50% ${(ue.bottom * 100).toFixed(1)}%`),
      (de.querySelector(".cb-glint").style.top = _e + "%"),
      Z.appendChild(de),
      {
        el: de,
        rot: 0,
        sq: de.querySelector(".cb-sq"),
        spin: de.querySelector(".cb-spin"),
        lid: de.querySelector(".cb-lid"),
        light: de.querySelector(".cb-light"),
        glint: de.querySelector(".cb-glint"),
        imgs: [...de.querySelectorAll("img")],
        set(Re, dt) {
          de.style.transform = `translate(${Re - A / 2}px, ${dt - A / 2}px)`;
        },
        pose(Re = this.rot, dt = 1, qe = 1) {
          ((this.rot = Re), (this.spin.style.transform = `rotate(${Re}deg) scale(${dt}, ${qe})`));
        },
      }
    );
  }
  async function le(Z, A, J, de) {
    const _e = Z.getBoundingClientRect(),
      Re = J.getBoundingClientRect(),
      dt = _e.width,
      qe = _e.height,
      ce = t.Game?.S?.reducedAnim || t.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
      tt = Math.max(1, Math.min(4, de.speed || (de.fast ? 2 : 1))),
      mt = (T) => T / tt,
      Te = Math.max(14, (32 * Re.width) / 136) / 32,
      At = 42,
      yt = Re.left - _e.left + Re.width / 2,
      he = Re.top - _e.top + Re.height * 0.55,
      fe = Re.bottom - _e.top - Re.height * 0.12,
      Oe = a('<div class="capture-sequence"></div>');
    A.appendChild(Oe);
    const Ee = t.UI.skippable(Oe);
    Ee.btnWatch = Ss(() => {
      vt = Ee.skipped;
    }, 30);
    const et = new Set(),
      _ = { filter: J.style.filter, transform: J.style.transform, opacity: J.style.opacity },
      we = (T, L, R, te = {}) => {
        const K = T.animate(L, { duration: mt(R), easing: "ease-out", ...te });
        return (et.add(K), K.finished.catch(() => {}));
      },
      ie = (T) => b(mt(T));
    let U = !1;
    const Ne = $e(Oe, 2);
    try {
      const T = a(`<img class="cfx-ball" src="${f(de.ball)}" alt="">`);
      (Object.assign(T.style, { width: At + "px", height: At + "px" }), Oe.appendChild(T));
      const L = (Fe, gt, Dt = 0, ha = 1, _t = 1) =>
          `translate(${Fe - At / 2}px, ${gt - At / 2}px) rotate(${Dt}deg) scale(${ha}, ${_t})`,
        R = de.from ? de.from.x : -At,
        te = de.from ? de.from.y : qe * 0.85,
        K = (R + yt) / 2,
        He = Math.max(At, Math.min(te, he) - 150 * Te),
        m = R < yt ? 1 : -1;
      (de.onThrow?.(), t.Sfx.throw());
      const z = 24;
      (await we(
        T,
        Array.from({ length: z + 1 }, (Fe, gt) => {
          const Dt = gt / z,
            ha = 1 - Dt;
          return {
            transform: L(
              ha * ha * R + 2 * ha * Dt * K + Dt * Dt * yt,
              ha * ha * te + 2 * ha * Dt * He + Dt * Dt * he,
              ce ? 0 : m * 720 * Dt,
            ),
          };
        }),
        650 + Math.hypot(yt - R, he - te) * 0.5,
        { easing: "linear", fill: "forwards" },
      ),
        t.Sfx.bonk(),
        Ne.ring(yt, he, 40 * Te, mt(380)),
        Ne.burst(yt, he, 8, 1.8, { grav: 0.05 }));
      const pe = _.transform && _.transform !== "none" ? _.transform + " " : "";
      ((J.style.transformOrigin = "50% 100%"),
        await Promise.all([
          we(
            T,
            [
              { transform: L(yt, he, 0, 1, 1) },
              { transform: L(yt, he, 0, 1.35, 0.65) },
              { transform: L(yt, he, 0, 1, 1) },
            ],
            140,
            { fill: "forwards" },
          ),
          ce
            ? null
            : we(
                J,
                [
                  { transform: pe + "scale(1)" },
                  { transform: pe + "scale(1.3,.7)" },
                  { transform: pe + "scale(.9,1.1)" },
                ],
                140,
                { fill: "forwards" },
              ),
        ]));
      const V = yt - m * 22 * Te,
        lt = Math.max(At / 2, Math.min(he - 70 * Te, Re.top - _e.top - At * 0.7));
      (t.Sfx.open(),
        we(
          T,
          [{ transform: L(yt, he) }, { transform: L(V, lt, -m * 40), easing: "cubic-bezier(.2,.9,.3,1)" }],
          320,
          { fill: "forwards" },
        ),
        await ie(200),
        T.classList.add("open"));
      const kt = V - yt,
        ra = lt - (Re.bottom - _e.top);
      (Wa(() => {
        vt || Ne.dissolve(J, V, lt, mt(420));
      }, mt(200)),
        await we(
          J,
          [
            { transform: pe + "scale(.9,1.1)", filter: _.filter || "none", opacity: 1 },
            {
              transform: pe + "scale(1.15,.9)",
              filter: "brightness(0) invert(1) drop-shadow(0 0 6px #fff)",
              opacity: 1,
              offset: 0.3,
            },
            {
              transform: `translate(${kt * 0.3}px, ${ra * 0.3}px) ${pe}scale(.6,1.5)`,
              filter: "brightness(0) invert(1) drop-shadow(0 0 10px #fff)",
              opacity: 1,
              offset: 0.6,
              easing: "cubic-bezier(.6,0,.9,.4)",
            },
            {
              transform: `translate(${kt}px, ${ra}px) ${pe}scale(0)`,
              filter: "brightness(0) invert(1)",
              opacity: 0,
            },
          ],
          560,
          { fill: "forwards" },
        ),
        T.classList.remove("open"),
        t.Sfx.shut(),
        await we(
          T,
          [
            { transform: L(V, lt, -m * 40) },
            { transform: L(V, lt, -m * 20, 1.3, 1.3) },
            { transform: L(V, lt) },
          ],
          160,
          { fill: "forwards" },
        ),
        (T.style.transformOrigin = "50% 90%"));
      const Vt = Math.min(qe - At / 2, fe - At * 0.4),
        Xt = (Fe, gt, Dt, ha) =>
          we(T, [{ transform: L(V, Fe) }, { transform: L(V, gt) }], Dt, { easing: ha, fill: "forwards" }),
        Ht = (Fe) => (
          t.Sfx.thud(Fe),
          we(
            T,
            [
              { transform: L(V, Vt) },
              { transform: L(V, Vt + 2 * Te, 0, 1 + 0.3 * Fe, 1 - 0.3 * Fe) },
              { transform: L(V, Vt) },
            ],
            120,
            { fill: "forwards" },
          )
        ),
        ct = ["#f4e5b8", "#f4e5b8", "#c7b789", "#c7b789", "#8c805f", "#5a5240"];
      (await Xt(lt, Vt, 300, "cubic-bezier(.5,0,1,.6)"),
        Ne.burst(V, Vt + At * 0.45, 8, 1.2, { pal: ct, grav: 0.08, heat: 0 }),
        await Ht(1),
        await Xt(Vt, Vt - 26 * Te, 180, "cubic-bezier(0,.5,.5,1)"),
        await Xt(Vt - 26 * Te, Vt, 180, "cubic-bezier(.5,0,1,.5)"),
        await Ht(0.6),
        await Xt(Vt, Vt - 8 * Te, 100, "ease-out"),
        await Xt(Vt - 8 * Te, Vt, 100, "ease-in"));
      const wt = Math.min(3, Math.max(0, de.shakes || 0));
      for (let Fe = 0; Fe < wt; Fe++) {
        (await ie(380), t.Sfx.shake());
        const gt = Fe % 2 ? 1 : -1;
        (we(
          T,
          [
            { filter: "brightness(1)" },
            { filter: "brightness(1.8)", offset: 0.3 },
            { filter: "brightness(1)" },
          ],
          520,
        ),
          await we(
            T,
            [
              { transform: L(V, Vt) },
              { transform: L(V - gt * 2 * Te, Vt, gt * 8, 1.08, 0.92), offset: 0.15 },
              { transform: L(V + gt * 6 * Te, Vt - 2 * Te, -gt * 32), offset: 0.45 },
              { transform: L(V - gt * 3 * Te, Vt, gt * 16), offset: 0.75 },
              { transform: L(V, Vt) },
            ],
            520,
            { easing: "ease-in-out", fill: "forwards" },
          ));
      }
      (await ie(320), Ee.hide());
      const ge = Math.max(850, mt(1100));
      if (de.success) {
        if (
          (t.Sfx.caught(),
          T.classList.add("click"),
          we(
            T,
            [
              { transform: L(V, Vt) },
              { transform: L(V, Vt - 4 * Te, 0, 1.35, 0.75) },
              { transform: L(V, Vt - 6 * Te, 0, 0.9, 1.15) },
              { transform: L(V, Vt) },
            ],
            300,
            { fill: "forwards" },
          ),
          Ne.ring(V, Vt, 80 * Te, mt(650), Ne.PAL.gold),
          Ne.ring(V, Vt, 50 * Te, mt(500)),
          Ne.burst(V, Vt, ce ? 6 : 16, 2.2, { pal: Ne.PAL.gold, round: !0, grav: 0.05 }),
          !ce)
        )
          for (let gt = 0; gt < 5; gt++)
            Wa(
              () => Ne.star(V + (Math.random() - 0.5) * 70 * Te, Vt - Math.random() * 50 * Te),
              mt(80 + gt * 110),
            );
        de.shiny && it(Oe, T, { waves: 1 });
        const Fe = a(
          `<div class="capture-result"><b>${e("Capturé !")}</b><small>${de.name ? e("{name} rejoint ta collection", { name: de.name }) : e("Le Pokémon rejoint ta collection")}</small></div>`,
        );
        (Oe.appendChild(Fe),
          we(
            Fe,
            [
              { opacity: 0, transform: "translate(-50%,12px) scale(.8)" },
              { opacity: 1, transform: "translate(-50%,0) scale(1.06)", offset: 0.65 },
              { opacity: 1, transform: "translate(-50%,0) scale(1)" },
            ],
            180,
            { fill: "forwards" },
          ),
          await b(ge));
      } else {
        (t.Sfx.open(),
          t.Sfx.error(),
          Ne.ring(V, Vt, 80 * Te, mt(320), Ne.PAL.of("#ff9e68")),
          Ne.burst(V, Vt, ce ? 5 : 16, 2.4, { pal: Ne.PAL.of("#ff9e68"), grav: 0.06 }),
          we(
            T,
            [
              { opacity: 1, transform: L(V, Vt) },
              { opacity: 0, transform: L(V, Vt - 10 * Te, 0, 1.4, 1.4) },
            ],
            160,
            { fill: "forwards" },
          ),
          await we(
            J,
            [
              {
                transform: `translate(${kt}px, ${ra}px) ${pe}scale(0)`,
                filter: "brightness(0) invert(1)",
                opacity: 1,
              },
              {
                transform: pe + "scale(1.25,.8)",
                filter: "brightness(0) invert(1)",
                opacity: 1,
                offset: 0.4,
              },
              { transform: pe + "scale(.92,1.08)", filter: _.filter || "none", opacity: 1, offset: 0.7 },
              { transform: pe + "scale(1)", filter: _.filter || "none", opacity: 1 },
            ],
            420,
            { fill: "forwards" },
          ));
        const Fe = a(
          `<div class="capture-result"><b>${e("Échappé !")}</b><small>${de.name ? e("{name} s’est libéré…", { name: de.name }) : e("Le Pokémon s’est libéré…")}</small></div>`,
        );
        (Oe.classList.add("is-escaped"),
          Oe.appendChild(Fe),
          we(
            Fe,
            [
              { opacity: 0, transform: "translate(-50%,10px)" },
              { opacity: 1, transform: "translate(-50%,0)" },
            ],
            140,
            { fill: "forwards" },
          ),
          await b(ge),
          await we(
            J,
            [
              { transform: pe + "scale(1)" },
              { transform: pe + "scale(1.25,.75)", offset: 0.6 },
              { transform: pe + "scale(1.2,.8)" },
            ],
            160,
            { fill: "forwards", easing: "ease-out" },
          ),
          await Ne.runOff(
            J,
            1,
            (gt, Dt) =>
              we(
                J,
                [
                  { transform: pe + "scale(1.2,.8)" },
                  { transform: `translateX(${gt * 0.15}px) ${pe}scale(1.4,.85)`, offset: 0.2 },
                  { transform: `translateX(${gt}px) ${pe}scale(1.6,.8)` },
                ],
                Dt,
                { fill: "forwards", easing: "cubic-bezier(.5,0,.9,.6)" },
              ),
            mt(340),
          ),
          await b(mt(300)));
      }
      return (await we(Oe, [{ opacity: 1 }, { opacity: 0 }], 120), (U = !0), de.success);
    } finally {
      (clearInterval(Ee.btnWatch), (vt = !1), Ee.end());
      for (const T of et) T.cancel();
      ((J.style.filter = _.filter),
        (J.style.transform = _.transform),
        (J.style.transformOrigin = ""),
        (J.style.opacity = U ? "0" : _.opacity),
        Oe.remove());
    }
  }
  function P(Z, A, J, de = 1100) {
    const _e = a(`<div class="big-text ${J}">${A}</div>`);
    return (
      Z.appendChild(_e),
      se(
        _e,
        [
          { transform: "translate(-50%,-50%) scale(0, .2) rotate(-8deg)", opacity: 0 },
          { transform: "translate(-50%,-50%) scale(1.35, .8) rotate(3deg)", opacity: 1, offset: 0.12 },
          { transform: "translate(-50%,-50%) scale(.9, 1.12) rotate(-1deg)", offset: 0.2 },
          { transform: "translate(-50%,-50%) scale(1) rotate(0)", opacity: 1, offset: 0.28 },
          { transform: "translate(-50%,-50%) scale(1)", opacity: 1, offset: 0.85 },
          { transform: "translate(-50%,-70%) scale(.95)", opacity: 0 },
        ],
        { duration: de + 500, easing: "ease-out" },
      ).then(() => _e.remove())
    );
  }
  const u = ["#ff4d4d", "#ffcb05", "#3fa9ff", "#5be05b", "#f95587", "#ffffff", "#a855f7"];
  function ve(Z, A = 90) {
    const J = Z.getBoundingClientRect(),
      de = t.innerHeight,
      _e = document.createElement("div");
    ((_e.className = "confetti-layer"), document.body.appendChild(_e));
    let Re = A;
    for (let dt = 0; dt < A; dt++) {
      const qe = document.createElement("div");
      qe.className = "confetti";
      const ce = dt % 2 === 0,
        tt = ce ? J.left + 6 : J.right - 6,
        mt = J.top + J.height * (0.55 + Math.random() * 0.3);
      (Object.assign(qe.style, {
        left: tt + "px",
        top: mt + "px",
        background: u[dt % u.length],
        width: 6 + Math.random() * 6 + "px",
        height: 9 + Math.random() * 9 + "px",
      }),
        _e.appendChild(qe));
      const Te =
          (ce ? 1 : -1) *
          (J.width * (0.15 + Math.random() * 0.5) +
            (Math.random() < 0.35 ? (ce ? -1 : 1) * J.width * 0.35 : 0)),
        At = -(mt * (0.45 + Math.random() * 0.5)),
        yt = de - mt + 40,
        he = (Math.random() < 0.5 ? -1 : 1) * (360 + Math.random() * 900),
        fe = (Math.random() - 0.5) * 120;
      se(
        qe,
        [
          { transform: "translate(0,0) rotate(0) rotateX(0)", opacity: 1 },
          {
            transform: `translate(${Te * 0.7}px, ${At}px) rotate(${he * 0.3}deg) rotateX(180deg)`,
            opacity: 1,
            offset: 0.28,
          },
          {
            transform: `translate(${Te + fe}px, ${At + (yt - At) * 0.45}px) rotate(${he * 0.65}deg) rotateX(540deg)`,
            opacity: 1,
            offset: 0.65,
          },
          {
            transform: `translate(${Te * 1.1 - fe}px, ${yt}px) rotate(${he}deg) rotateX(900deg)`,
            opacity: 0.9,
          },
        ],
        {
          duration: 2600 + Math.random() * 1400,
          delay: Math.random() * 160,
          easing: "cubic-bezier(.2,.65,.45,1)",
        },
      ).then(() => {
        (qe.remove(), --Re === 0 && _e.remove());
      });
    }
  }
  function it(Z, A, { waves: J = 2 } = {}) {
    t.Sfx.shiny?.();
    const de = 2,
      _e = Z.getBoundingClientRect(),
      Re = (A.tagName === "IMG" ? A : A.querySelector("img") || A).getBoundingClientRect(),
      dt = document.createElement("canvas"),
      qe = dt.getContext("2d");
    ((dt.width = Math.ceil(_e.width / de)),
      (dt.height = Math.ceil(_e.height / de)),
      Object.assign(dt.style, {
        position: "absolute",
        left: 0,
        top: 0,
        width: dt.width * de + "px",
        height: dt.height * de + "px",
        imageRendering: "pixelated",
        pointerEvents: "none",
        zIndex: 6,
      }),
      Z.appendChild(dt));
    const ce = (Re.left - _e.left + Re.width / 2) / de,
      tt = (Re.top - _e.top + Re.height / 2) / de,
      mt = (Math.max(Re.width, Re.height) * 0.55) / de,
      Te = ["#ffffff", "#fff6c2", "#ffe066", "#ffb02e", "#9fd8ff"],
      At = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5],
      yt = (we, ie, U, Ne = 1) => {
        ((we = Math.round(we)),
          (ie = Math.round(ie)),
          (Ne >= 1 || At[(ie & 3) * 4 + (we & 3)] < Ne * 16) &&
            ((qe.fillStyle = U), qe.fillRect(we, ie, 1, 1)));
      },
      he = (we) => 1 - (1 - we) ** 3,
      fe = mt > 50 ? 2 : 1,
      Oe = [];
    for (let we = 0; we < J; we++) {
      Oe.push({ ring: !0, t0: we * 380, dur: 520 });
      for (let ie = 0; ie < 8; ie++)
        Oe.push({
          a: (ie / 8) * Math.PI * 2 + (we * Math.PI) / 8 - Math.PI / 2,
          t0: we * 380 + ie * 45,
          dur: 560,
        });
    }
    for (let we = 0; we < 5; we++)
      Oe.push({
        tw: !0,
        x: ce + ((Math.random() - 0.5) * Re.width * 0.6) / de,
        y: tt + ((Math.random() - 0.5) * Re.height * 0.6) / de,
        t0: 200 + we * 150,
        dur: 420,
      });
    const Ee = Math.max(...Oe.map((we) => we.t0 + we.dur)),
      et = zn.now(),
      _ = (we) => {
        const ie = we - et;
        if (ie > Ee || !dt.isConnected) {
          dt.remove();
          return;
        }
        qe.clearRect(0, 0, dt.width, dt.height);
        for (const U of Oe) {
          const Ne = (ie - U.t0) / U.dur;
          if (!(Ne < 0 || Ne > 1))
            if (U.ring) {
              const T = mt * (0.3 + 0.85 * he(Ne)),
                L = Ne < 0.5 ? 1 : 1 - (Ne - 0.5) * 2,
                R = Math.ceil(T * 6);
              for (let te = 0; te < R; te++) {
                const K = (te / R) * 6.283;
                yt(ce + Math.cos(K) * T, tt + Math.sin(K) * T, te % 3 ? Te[2] : "#fff", L);
              }
            } else if (U.tw) t.ShinyGlint.star(qe, U.x, U.y, Ne, fe);
            else {
              const T = mt * (0.3 + 0.75 * he(Ne)),
                L = ce + Math.cos(U.a) * T,
                R = tt + Math.sin(U.a) * T;
              for (let te = 1; te <= 3; te++) {
                const K = T - te * 3;
                K > mt * 0.3 &&
                  yt(
                    ce + Math.cos(U.a) * K,
                    tt + Math.sin(U.a) * K,
                    te === 1 ? Te[1] : Te[3],
                    (1 - Ne) * (1 - te / 4),
                  );
              }
              t.ShinyGlint.star(qe, L, R, Math.min(0.99, Ne * 1.1), fe);
            }
        }
        es(_);
      };
    es(_);
  }
  async function De(Z, A, J, de = {}) {
    const _e = Z.getBoundingClientRect(),
      Re = J.getBoundingClientRect(),
      dt = _e.width,
      qe = _e.height,
      ce = t.matchMedia?.("(prefers-reduced-motion: reduce)").matches,
      tt = (Ee) => Ee / Math.min(2, Math.sqrt(Math.max(1, de.speed || 1))),
      mt = Re.left - _e.left + Re.width / 2,
      Te = Re.top - _e.top + Re.height / 2,
      At = Math.min(qe * 0.9, Re.bottom - _e.top - Re.height * 0.2),
      yt = 42,
      he = a('<div class="capture-sequence"></div>');
    A.appendChild(he);
    const fe = { filter: J.style.filter, transform: J.style.transform },
      Oe = $e(he, 2);
    try {
      const Ee = Tt(he, yt, de.ball || "poke-ball");
      Ee.el.classList.add("capture-hero");
      const et = de.from || { x: dt * 0.15, y: qe + yt };
      (de.onThrow?.(),
        t.Sfx.throw(),
        await B(tt(300), (we, ie) => {
          (Ee.set(Je(et.x, (et.x + mt) / 2, mt, we), Je(et.y, Math.min(et.y, Te) - qe * 0.35, Te, we)),
            Ee.pose(ce ? 0 : ie * 720, 0.8, 0.8));
        }),
        t.Sfx.bonk(),
        Oe.ring(mt, Te, yt * 1.2, tt(300)),
        Oe.burst(mt, Te, 8, 1.8, { grav: 0.05 }),
        Ee.pose(0, 0.9, 0.75),
        t.Sfx.open(),
        se(Ee.lid, [{ transform: "rotate(0)" }, { transform: "rotate(-55deg)" }], {
          duration: tt(80),
          fill: "forwards",
        }),
        (Ee.light.style.opacity = 1),
        ce || Oe.dissolve(J, mt, Te, tt(240)),
        await se(
          J,
          [
            { transform: fe.transform || "none", opacity: 1, filter: "none" },
            { transform: "scale(1.08)", opacity: 1, filter: "brightness(0) invert(1)", offset: 0.25 },
            { transform: "scale(.02)", opacity: 0, filter: "brightness(0) invert(1)" },
          ],
          { duration: tt(200), fill: "forwards", easing: "cubic-bezier(.6,0,1,.6)" },
        ));
      for (const we of Ee.lid.getAnimations()) we.cancel();
      ((Ee.light.style.opacity = 0),
        t.Sfx.shut(),
        await B(
          tt(220),
          (we) => {
            (Ee.set(mt, Ge(Te, At, we)), Ee.pose(0));
          },
          H.inQuad,
        ),
        t.Sfx.thud(0.6),
        se(
          Ee.sq,
          [
            { transform: "scale(1)" },
            { transform: "scale(1.2,.82)", offset: 0.4 },
            { transform: "scale(1)" },
          ],
          tt(100),
        ));
      const _ = ce ? 4 : yt * 0.35;
      return (
        await B(tt(220), (we) => Ee.set(mt, At - 4 * _ * we * (1 - we))),
        t.Sfx.caught(),
        Oe.ring(mt, At, yt * 1.6, 300, Oe.PAL.gold),
        Oe.burst(mt, At, 8, 1.6, { pal: Oe.PAL.gold, grav: 0.05 }),
        await se(
          Ee.el,
          [
            { opacity: 1, scale: "1" },
            { opacity: 1, scale: "1.25", offset: 0.4 },
            { opacity: 0, scale: ".3" },
          ],
          { duration: tt(160), fill: "forwards" },
        ),
        { x: mt, y: At }
      );
    } finally {
      ((J.style.filter = fe.filter),
        (J.style.transform = fe.transform),
        (J.style.opacity = "0"),
        he.remove());
    }
  }
  const je = new WeakMap(),
    pt = 2,
    re = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5],
    We = {
      white: ["#ffffff", "#ffffff", "#e8f2ff", "#bcd2f0", "#8aa3c8", "#56688a"],
      ball: ["#ffffff", "#ffd3d3", "#ff8a8a", "#ee4256", "#a8203e", "#4c0e26"],
      gold: ["#ffffff", "#fff6c2", "#ffe066", "#ffb02e", "#d9701c", "#7a3416"],
      smoke: ["#ffffff", "#ffffff", "#f6f8fb", "#e6eaf1", "#cdd3de", "#a9b1c0"],
      heal: ["#ffffff", "#d2ffd9", "#86eb9a", "#3ccb5f", "#1f8f43", "#0c4a24"],
      glow: ["#ffffff", "#fff27a", "#e2f56e", "#7ee06e", "#3fae55", "#1f6b3a"],
    };
  function oe(Z, { color: A = "#000", sweep: J = "none", z: de = 11, cell: _e = 4 } = {}) {
    const Re = document.createElement("canvas"),
      dt = Re.getContext("2d"),
      qe = Z.getBoundingClientRect();
    ((Re.className = "fx-dither"),
      (Re.width = Math.ceil(qe.width / _e)),
      (Re.height = Math.ceil(qe.height / _e)),
      Object.assign(Re.style, {
        position: "absolute",
        inset: 0,
        width: "100%",
        height: "100%",
        imageRendering: "pixelated",
        pointerEvents: "none",
        zIndex: de,
      }),
      Z.appendChild(Re));
    const ce = Re.width,
      tt = Re.height,
      mt = new Float32Array(ce * tt);
    for (let yt = 0; yt < tt; yt++)
      for (let he = 0; he < ce; he++) {
        const fe = (re[(yt & 3) * 4 + (he & 3)] + Math.random()) / 16;
        mt[yt * ce + he] =
          J === "diag"
            ? fe * 0.3 + ((he / ce + yt / tt) / 2) * 0.7
            : J === "iris"
              ? fe * 0.3 + (1 - Math.min(1, Math.hypot((he / ce - 0.5) * 1.6, yt / tt - 0.5) / 0.8)) * 0.7
              : fe;
      }
    let Te = 0;
    const At = (yt, he = !1) => {
      ((Te = he ? 1 - yt : yt), dt.clearRect(0, 0, ce, tt), (dt.fillStyle = A));
      for (let fe = 0; fe < tt; fe++)
        for (let Oe = 0; Oe < ce; Oe++) {
          const Ee = mt[fe * ce + Oe];
          (he ? Ee > yt : yt >= 1 || Ee < yt) && dt.fillRect(Oe, fe, 1, 1);
        }
    };
    return {
      el: Re,
      run: (yt, he, fe) =>
        new Promise((Oe) => {
          const Ee = zn.now(),
            et = J === "diag" && he < yt;
          At(et ? 0 : yt, et);
          const _ = (we) => {
            const ie = Math.max(0, Math.min(1, (we - Ee) / fe));
            (et ? At(ie, !0) : At(yt + (he - yt) * ie), ie < 1 && Re.isConnected ? es(_) : Oe());
          };
          es(_);
        }),
      set: (yt) => At(yt),
      remove: () => Re.remove(),
      get level() {
        return Te;
      },
    };
  }
  We.of = (Z) => {
    const A = parseInt((Z || "#ffcb05").slice(1), 16),
      J = [A >> 16, (A >> 8) & 255, A & 255],
      de = (_e, Re) => Math.round(Re > 0 ? _e + (255 - _e) * Re : _e * (1 + Re));
    return [1, 0.7, 0.35, 0, -0.4, -0.7].map((_e) =>
      _e === 1 ? "#ffffff" : `rgb(${J.map((Re) => de(Re, _e)).join(", ")})`,
    );
  };
  function $e(Z, A = 5) {
    if (je.has(Z)) return je.get(Z);
    const J = document.createElement("canvas"),
      de = J.getContext("2d");
    (Object.assign(J.style, {
      position: "absolute",
      left: 0,
      top: 0,
      imageRendering: "pixelated",
      pointerEvents: "none",
      zIndex: A,
    }),
      Z.appendChild(J));
    let _e = [],
      Re = [],
      dt = [],
      qe = !1,
      ce = 0;
    const tt = () => {
        const _ = Z.getBoundingClientRect(),
          we = Math.ceil(_.width / pt),
          ie = Math.ceil(_.height / pt);
        (J.width !== we || J.height !== ie) &&
          ((J.width = we),
          (J.height = ie),
          (J.style.width = we * pt + "px"),
          (J.style.height = ie * pt + "px"));
      },
      mt = (_, we, ie, U = 1) => {
        ((_ = Math.round(_)),
          (we = Math.round(we)),
          (U >= 1 || (U > 0 && re[(we & 3) * 4 + (_ & 3)] < U * 16)) &&
            ((de.fillStyle = ie), de.fillRect(_, we, 1, 1)));
      },
      Te = (_, we, ie, U) => {
        ((de.fillStyle = U), (_ = Math.round(_)), (we = Math.round(we)));
        const Ne = Math.ceil(ie);
        for (let T = -Ne; T <= Ne; T++)
          for (let L = -Ne; L <= Ne; L++) L * L + T * T <= ie * ie && de.fillRect(_ + L, we + T, 1, 1);
      },
      At = (_) => {
        try {
          yt(_);
        } catch (we) {
          (console.error("pix", we), (_e = []), (Re = []), (dt = []));
        }
        _e.length || Re.length || dt.length ? es(At) : ((qe = !1), (ce = 0));
      },
      yt = (_) => {
        if (!Z.isConnected) {
          (je.delete(Z), (_e = []), (Re = []), (dt = []));
          return;
        }
        const we = Math.min(50, _ - (ce || _));
        ((ce = _), de.clearRect(0, 0, J.width, J.height));
        const ie = we / 16;
        ((_e = _e.filter((U) => {
          if (((U.life += we), U.life > U.max + U.wait)) return !1;
          if (U.life > U.wait) {
            if (
              U.to &&
              ((U.vx += (U.to.x - U.x) * 0.05 * ie),
              (U.vy += (U.to.y - U.y) * 0.05 * ie),
              Math.abs(U.to.x - U.x) + Math.abs(U.to.y - U.y) < 2)
            )
              return !1;
            ((U.vx *= U.drag ** ie),
              (U.vy = U.vy * U.drag ** ie + U.grav * ie),
              (U.x += U.vx * ie),
              (U.y += U.vy * ie));
          }
          if (U.flake) {
            if (U.life <= U.wait) return !0;
            const L = (U.life - U.wait) / U.max,
              R = Math.sin(U.life / 90 + U.seed),
              te = Math.max(1, Math.round(Math.abs(R) * U.size));
            return (
              (L > 0.85 && (Math.round(U.x) + Math.round(U.y)) & 1) ||
                ((de.fillStyle = R > 0 ? U.pal[0] : U.pal[1]),
                de.fillRect(
                  Math.round(U.x + Math.sin(U.life / 300 + U.seed) * 3),
                  Math.round(U.y),
                  te,
                  Math.max(1, Math.round(U.size * 0.6)),
                )),
              !0
            );
          }
          if (U.late && U.life <= U.wait) return !0;
          const Ne = Math.max(0, U.life - U.wait) / U.max,
            T = Math.min(5, Math.floor(U.heat * 2 + Ne * 4.4));
          if (U.heal) {
            const L = U.life - U.wait;
            if (L < 0) return !0;
            const R = L < 70 ? Math.max(1, U.size - 1) : U.size,
              te = R + 1,
              K = R - 1,
              He = U.pal,
              m = Ne > 0.65 ? 1 - (Ne - 0.65) / 0.35 : 1,
              z = Math.round(U.x),
              pe = Math.round(U.y),
              V = (lt, kt) =>
                (Math.abs(lt) <= te && Math.abs(kt) <= K) || (Math.abs(kt) <= te && Math.abs(lt) <= K);
            for (let lt = -te - 1; lt <= te + 1; lt++)
              for (let kt = -te - 1; kt <= te + 1; kt++)
                V(kt, lt)
                  ? mt(
                      z + kt,
                      pe + lt,
                      L < 70 || (!kt && !lt)
                        ? He[0]
                        : K && !V(kt, lt - 1)
                          ? He[1]
                          : K && !V(kt, lt + 1)
                            ? He[4]
                            : K
                              ? He[3]
                              : He[2],
                      m,
                    )
                  : (V(kt + 1, lt) || V(kt - 1, lt) || V(kt, lt + 1) || V(kt, lt - 1)) &&
                    mt(z + kt, pe + lt, He[5], m);
            return !0;
          }
          if (U.twinkle) {
            const L = U.life - U.wait;
            if (L < 0) return !0;
            const R = [0, 1, 2, 1, 0][Math.min(4, Math.floor((L / U.max) * 5))],
              te = Math.round(U.x),
              K = Math.round(U.y);
            for (let He = 1; He <= R; He++) {
              const m = He === R ? U.pal[2] : U.pal[1];
              (mt(te + He, K, m), mt(te - He, K, m), mt(te, K + He, m), mt(te, K - He, m));
            }
            return (mt(te, K, U.pal[0]), !0);
          }
          if (U.cross) {
            const L = Math.max(1, Math.round(U.size * (Ne < 0.2 ? Ne / 0.2 : 1))),
              R = U.pal[Math.min(3, T)];
            if (Ne > 0.7 && (Math.round(U.x) + Math.round(U.y)) & 1) return !0;
            for (let te = -L; te <= L; te++) (mt(U.x + te, U.y, R), mt(U.x, U.y + te, R));
            return (mt(U.x, U.y, U.pal[0]), !0);
          }
          if (Ne > 0.7 && (Math.round(U.x) + Math.round(U.y)) & 1) return !0;
          if (U.len && U.ray) {
            const L = Math.hypot(U.vx, U.vy) || 1,
              R = U.vx / L,
              te = U.vy / L,
              K = U.len * (1 - Ne * 0.5);
            for (let He = 0; He < K; He++)
              mt(
                U.x - R * He,
                U.y - te * He,
                U.pal[Math.min(5, T + (He > K * 0.6 ? 1 : 0))],
                He > K * 0.7 ? 0.5 : 1,
              );
          } else if (U.len)
            ((de.fillStyle = U.pal[Math.min(3, T)]), de.fillRect(Math.round(U.x), Math.round(U.y), U.len, 1));
          else if (U.round) {
            const L = U.size * (0.6 + Ne * 0.6);
            (Te(U.x, U.y, L, U.pal[Math.min(5, T + 1)]),
              T < 3 && Te(U.x - L * 0.2, U.y - L * 0.2, L * 0.5, U.pal[T]));
          } else {
            de.fillStyle = U.pal[T];
            const L = Math.max(1, Math.round(U.size));
            de.fillRect(Math.round(U.x - L / 2), Math.round(U.y - L / 2), L, L);
          }
          return !0;
        })),
          (Re = Re.filter((U) => {
            const Ne = (_ - U.t0) / U.dur;
            if (Ne >= 1) return !1;
            if (Ne < 0) return !0;
            const T = Math.max(1, (1 - (1 - Ne) ** 3) * U.r),
              L = Ne < 0.55 ? 1 : 1 - (Ne - 0.55) / 0.45,
              R = Math.ceil(T * 6.5);
            for (let te = 0; te < R; te++) {
              const K = (te / R) * 6.283;
              mt(U.x + Math.cos(K) * T, U.y + Math.sin(K) * T * U.flat, te % 3 ? U.pal[3] : U.pal[1], L);
            }
            return !0;
          })),
          (dt = dt.filter((U) => {
            const Ne = Math.max(0, (_ - U.t0) / 700);
            return Ne >= 1 ? !1 : (t.ShinyGlint?.star(de, U.x, U.y - Ne * 3, Ne, 1), !0);
          })));
      },
      he = () => {
        (tt(), qe || ((qe = !0), es(At)));
      },
      fe = (_, we) => ({ x: _ / pt, y: we / pt }),
      Oe = (_, we, ie) =>
        _e.push({
          x: _,
          y: we,
          vx: 0,
          vy: 0,
          life: 0,
          wait: 0,
          max: 400,
          size: 1,
          heat: 0,
          grav: 0.02,
          drag: 0.96,
          pal: We.white,
          ...ie,
        }),
      Ee = (_) => {
        const we = _.getBoundingClientRect(),
          ie = Z.getBoundingClientRect(),
          U = Math.max(1, Math.round(we.width / pt)),
          Ne = Math.max(1, Math.round(we.height / pt)),
          T = document.createElement("canvas");
        ((T.width = U), (T.height = Ne));
        let L;
        try {
          const K = T.getContext("2d");
          (K.drawImage(_, 0, 0, U, Ne), (L = K.getImageData(0, 0, U, Ne).data));
        } catch {
          return [];
        }
        const R =
            /scaleX\(-1\)/.test(getComputedStyle(_).transform) ||
            getComputedStyle(_).transform.startsWith("matrix(-1"),
          te = [];
        for (let K = 0; K < Ne; K++)
          for (let He = 0; He < U; He++)
            L[(K * U + He) * 4 + 3] > 120 &&
              te.push({ x: (we.left - ie.left) / pt + (R ? U - 1 - He : He), y: (we.top - ie.top) / pt + K });
        return te;
      },
      et = {
        burst(_, we, ie, U, Ne = {}) {
          he();
          const T = fe(_, we);
          for (let L = 0; L < ie; L++) {
            const R = Math.random() * 6.283,
              te = U * (0.4 + Math.random() * 0.8);
            Oe(T.x, T.y, {
              vx: Math.cos(R) * te,
              vy: Math.sin(R) * te,
              max: 300 + Math.random() * 300,
              size: 1 + ((Math.random() * 2) | 0),
              ...Ne,
            });
          }
        },
        ring(_, we, ie, U = 420, Ne = We.white, T = 1) {
          he();
          const L = fe(_, we);
          Re.push({ x: L.x, y: L.y, r: ie / pt, dur: U, pal: Ne, flat: T, t0: zn.now() });
        },
        gather(_, we, ie, U = 260) {
          ((U = Math.max(U, 200)), he());
          const Ne = fe(we, ie),
            T = Ee(_),
            L = Math.min(1, 220 / (T.length || 1));
          for (const R of T)
            Math.random() < L &&
              Oe(Ne.x, Ne.y, {
                to: R,
                vx: (Math.random() - 0.5) * 3,
                vy: -Math.random() * 3,
                drag: 0.86,
                grav: 0,
                max: U,
                heat: Math.random() < 0.5 ? 0 : 0.2,
              });
        },
        dissolve(_, we, ie, U = 420) {
          ((U = Math.max(U, 300)), he());
          const Ne = fe(we, ie),
            T = Ee(_),
            L = Math.min(1, 900 / (T.length || 1));
          if (!T.length) return;
          ((_.style.visibility = "hidden"),
            Wa(() => {
              _.style.visibility = "";
            }, U * 1.8));
          let R = 1 / 0,
            te = -1 / 0;
          for (const He of T) (He.y < R && (R = He.y), He.y > te && (te = He.y));
          const K = Math.max(1, te - R);
          for (const He of T)
            Math.random() < L &&
              Oe(He.x, He.y, {
                to: Ne,
                wait: ((He.y - R) / K) * U * 0.45 + Math.random() * U * 0.12,
                vx: (Math.random() - 0.5) * 0.6,
                vy: -0.2 - Math.random() * 0.3,
                drag: 0.82,
                grav: 0,
                max: U * 1.2,
                heat: Math.random() < 0.5 ? 0 : 0.25,
              });
        },
        puff(_, we, ie = 80) {
          he();
          const U = fe(_, we),
            Ne = (ie / pt) * 0.6;
          for (let T = 0; T < 38; T++) {
            const L = Math.random() * 6.283,
              R = Math.random() * Ne;
            Oe(U.x + Math.cos(L) * R, U.y + Math.sin(L) * R * 0.6, {
              round: !0,
              pal: We.smoke,
              size: 4 + Math.random() * 5,
              vx: Math.cos(L) * (0.8 + Math.random() * 1.2),
              vy: Math.sin(L) * 0.6 - 0.5,
              grav: -0.01,
              drag: 0.9,
              wait: Math.random() * 80,
              max: 520 + Math.random() * 320,
              heat: Math.random() * 0.4,
            });
          }
        },
        async runOff(_, we, ie, U = 340) {
          const Ne = _.getBoundingClientRect(),
            T = Z.getBoundingClientRect(),
            L = Ne.left - T.left,
            R = Ne.top - T.top,
            te = we > 0 ? T.width - L + 20 : -(L + Ne.width + 20);
          (et.puff(L + Ne.width / 2, R + Ne.height * 0.8, Ne.width),
            et.lines(
              {
                top: R + Ne.height * 0.15,
                height: Ne.height * 0.7,
                left: we > 0 ? L : 0,
                right: we > 0 ? T.width : L + Ne.width,
              },
              we,
              U,
              We.smoke,
            ),
            t.Sfx?.whoosh?.(),
            await ie(te, U));
        },
        lines(_, we, ie = 500, U = We.white) {
          he();
          const Ne = Math.round(ie / 25);
          for (let T = 0; T < Ne; T++) {
            const L = (_.top + Math.random() * _.height) / pt,
              R = 6 + Math.random() * 18;
            Oe((we > 0 ? _.left : _.right) / pt - (we > 0 ? R : 0), L, {
              late: !0,
              len: R,
              vx: we * (6 + Math.random() * 6),
              grav: 0,
              drag: 1,
              wait: Math.random() * ie,
              max: 260,
              pal: U,
            });
          }
        },
        star(_, we) {
          he();
          const ie = fe(_, we);
          dt.push({ x: ie.x, y: ie.y, t0: zn.now() });
        },
        cross(_, we, ie, U = 2, Ne = {}) {
          he();
          const T = fe(_, we);
          Oe(T.x, T.y, {
            cross: !0,
            size: U,
            pal: ie,
            vx: (Math.random() - 0.5) * 0.3,
            vy: -0.9 - Math.random() * 0.5,
            grav: 0,
            drag: 0.99,
            max: 800 + Math.random() * 300,
            ...Ne,
          });
        },
        heal(_, we, ie = 1, U = We.heal, Ne = {}) {
          he();
          const T = fe(_, we);
          Oe(T.x, T.y, {
            heal: !0,
            size: ie,
            pal: U,
            vx: (Math.random() - 0.5) * 0.1,
            vy: -0.18 - Math.random() * 0.14,
            grav: 0,
            drag: 0.985,
            max: 850 + Math.random() * 250,
            ...Ne,
          });
        },
        twinkle(_, we, ie = We.glow, U = {}) {
          he();
          const Ne = fe(_, we);
          Oe(Ne.x, Ne.y, {
            twinkle: !0,
            pal: ie,
            vx: 0,
            vy: -0.06,
            grav: 0,
            drag: 1,
            max: 420 + Math.random() * 180,
            ...U,
          });
        },
        confetti(_, we) {
          he();
          const ie = J.width;
          for (let U = 0; U < _; U++) {
            const Ne = we[U % we.length];
            Oe(Math.random() * ie, -4 - Math.random() * 10, {
              flake: !0,
              seed: Math.random() * 6,
              pal: Ne,
              size: 3 + ((Math.random() * 2) | 0),
              vx: (Math.random() - 0.5) * 0.8,
              vy: 0.6 + Math.random() * 0.8,
              grav: 0.015,
              drag: 0.99,
              wait: Math.random() * 500,
              max: 2600 + Math.random() * 1400,
            });
          }
        },
        rays(_, we, ie, U = We.gold, Ne = 14) {
          he();
          const T = fe(_, we);
          for (let L = 0; L < ie; L++) {
            const R = (L / ie) * 6.283 + Math.random() * 0.2,
              te = 4 + Math.random() * 3;
            Oe(T.x + Math.cos(R) * 6, T.y + Math.sin(R) * 6, {
              ray: !0,
              len: Ne * (0.6 + Math.random() * 0.7),
              vx: Math.cos(R) * te,
              vy: Math.sin(R) * te,
              grav: 0,
              drag: 0.9,
              max: 300,
              pal: U,
            });
          }
        },
        clash(_, we, ie, U, Ne, T) {
          he();
          const L = fe(_, we),
            R = fe(ie, U);
          for (let te = 0; te < Ne / 30; te++)
            Oe(L.x + (Math.random() - 0.5) * 20, L.y + (Math.random() - 0.5) * 30, {
              late: !0,
              to: R,
              wait: Math.random() * Ne,
              ray: !0,
              len: 5,
              vx: (R.x - L.x) * 0.02,
              vy: (Math.random() - 0.5) * 2,
              drag: 0.9,
              grav: 0,
              max: 500,
              pal: T,
            });
        },
        aura(_, we, ie, U, Ne) {
          he();
          const T = fe(_, we);
          for (let L = 0; L < U; L += 260)
            Re.push({ x: T.x, y: T.y, r: ie / pt, dur: 700, pal: Ne, flat: 0.3, t0: zn.now() + L });
          for (let L = 0; L < U / 40; L++)
            Oe(T.x + (((Math.random() - 0.5) * ie) / pt) * 1.4, T.y, {
              late: !0,
              wait: Math.random() * U,
              vy: -0.8 - Math.random(),
              grav: -0.03,
              drag: 1,
              size: 1 + (Math.random() < 0.3),
              pal: Ne,
              heat: 0.1,
              max: 700,
            });
        },
        PAL: We,
      };
    return (je.set(Z, et), et);
  }
  return {
    play: le,
    quick: De,
    particles: Ze,
    ring: x,
    impactStar: $,
    shake: X,
    confetti: ve,
    bigText: P,
    shinySparkle: it,
    pix: $e,
    dither: oe,
    PAL: We,
  };
})();
