/**
 * heal fx
 *
 * Public API on the game namespace `t`: t.HealFX
 *
 * Recovered from the shipped bundle — original chunk #54 at byte 1451311 (7744 bytes, sha256:f80756ca00e8a8e3).
 * This file is one original source file; the build concatenates them in filename order.
 */
t.HealFX = (function () {
  const a = "#ff8fb1";
  async function b(
    f,
    {
      fx: ue,
      allies: H,
      count: vt,
      slots: B,
      title: se,
      msg: Ge,
      speed: Je = () => 1,
      onHeal: Ze = () => {},
    },
  ) {
    const { $: x, $$: $, h: X, sleep: Tt } = t.UI,
      le = t.CaptureFX,
      P = (_) => _ / Je(),
      u = (_) => Tt(_ / Je()),
      ve = (_) => {
        const we = _.getBoundingClientRect(),
          ie = f.getBoundingClientRect();
        return { x: we.left - ie.left + we.width / 2, y: we.top - ie.top + we.height / 2 };
      },
      it = f.appendChild(
        X(`<div class="heal-fx"><i class="lk-sky"></i>
        <div class="hm-stage">
          <div class="hm-title">${se}</div>
          <div class="hm-machine">
            <canvas class="hm-pads"></canvas>
            <div class="hm-tray">${Array.from({ length: B }, (_, we) => `<span class="hm-slot">${we < vt ? '<img src="assets/items/poke-ball.png" alt="">' : ""}</span>`).join("")}</div>
          </div>
          <div class="hm-msg">${Ge}</div>
        </div>
        <div class="hm-fx"></div>
      </div>`),
      ),
      De = x(".hm-fx", it),
      je = $(".hm-slot img", it),
      pt = x(".hm-machine", it),
      re = t.UI.skippable(it),
      We = (_) => {
        const we = _.getBoundingClientRect(),
          ie = it.getBoundingClientRect();
        return { x: we.left - ie.left + we.width / 2, y: we.top - ie.top + we.height / 2 };
      },
      oe = le.pix(De, 1),
      $e = oe.PAL.of(a),
      Z = oe.PAL.heal,
      A = oe.PAL.glow,
      J = le.pix(ue),
      de = () => je[(Math.random() * je.length) | 0];
    je.forEach((_) => {
      _.style.opacity = 0;
    });
    const _e = x(".hm-pads", pt),
      Re = _e.getContext("2d"),
      dt = 2,
      qe = $(".hm-slot", it);
    let ce = !0,
      tt = !1,
      mt = 0;
    const Te = (_, we, ie, U = 1) => {
        ((_ = Math.round(_)),
          (we = Math.round(we)),
          !(U < 1 && (U <= 0 || (((_ + we) & 3) / 4 >= U * 1.2 && (_ ^ we) % 2))) &&
            ((Re.fillStyle = ie), Re.fillRect(_, we, 1, 1)));
      },
      At = (_, we, ie, U, Ne, T = 1, L = 0) => {
        for (let R = -Math.ceil(U); R <= U; R++)
          for (let te = -Math.ceil(ie); te <= ie; te++) {
            const K = (te * te) / (ie * ie) + (R * R) / (U * U);
            K <= 1 && K >= L * L && Te(_ + te, we + R, Ne, T);
          }
      },
      yt = ["#2a2440", "#1a1628", "#0d0b16"];
    ((function _(we) {
      if (!ce) return;
      es(_);
      const ie = pt.getBoundingClientRect();
      (_e.width !== Math.ceil(ie.width / dt) &&
        ((_e.width = Math.ceil(ie.width / dt)), (_e.height = Math.ceil(ie.height / dt))),
        Re.clearRect(0, 0, _e.width, _e.height));
      const U = 0.5 + 0.5 * Math.sin(we / (tt ? 90 : 300));
      qe.forEach((Ne) => {
        const T = Ne.getBoundingClientRect(),
          L = -new DOMMatrix(getComputedStyle(Ne).transform).f,
          R = Math.round((T.left + T.width / 2 - ie.left) / dt),
          te = Math.round((T.bottom - T.height * 0.16 - ie.top) / dt),
          K = Math.round((T.width * 0.4) / dt),
          He = Math.max(3, Math.round(K * 0.3)),
          m = Ne.classList.contains("on") && (tt || mt),
          z = $e;
        if (pt.style.opacity !== "0" && !0) {
          (At(R, te + He + 6 + L / dt, K * (0.8 - L * 0.015), He * 0.6, "#000", 0.45),
            At(R, te + 2, K, He, yt[2]),
            At(R, te + 1, K, He, yt[1]),
            At(R, te, K, He, m ? z[4] : yt[0]),
            At(R, te, K, He, m ? z[tt ? 1 : 2] : "#5d6788", 1, 0.82),
            m &&
              (At(R, te, K * (0.5 + 0.08 * U), He * (0.5 + 0.08 * U), z[3], tt ? 0.9 : 0.5),
              (tt || mt) && At(R, te, K * 0.25, He * 0.25, z[1], 0.8)));
          for (let V = -K * 0.55; V <= K * 0.55; V++)
            Te(R + V, te - He * Math.sqrt(1 - (V / K) ** 2), m ? z[0] : "#c9d2e6");
        }
      });
    })(zn.now()),
      (it.style.opacity = 0));
    const he = x(".hm-title", it);
    ((he.style.opacity = 0), (pt.style.opacity = 0));
    const fe = H ? $(".ally .wrap", H) : [];
    let Oe = [];
    try {
      t.Sfx.whoosh();
      for (const R of fe) {
        const te = x("img", R);
        if (te) {
          const K = ve(te);
          J.dissolve(te, K.x, K.y + te.getBoundingClientRect().height * 0.3, P(320));
        }
      }
      ((Oe = fe.map((R) =>
        R.animate(
          [
            { transform: "scale(1)", filter: "none", opacity: 1 },
            { transform: "scale(1.1, .9)", filter: "brightness(0) invert(1)", opacity: 1, offset: 0.35 },
            { transform: "scale(0)", filter: "brightness(0) invert(1)", opacity: 0 },
          ],
          { duration: P(320), easing: "ease-in", fill: "forwards" },
        ),
      )),
        await Promise.all(Oe.map((R) => R.finished)),
        H && (H.style.visibility = "hidden"),
        await it.animate([{ opacity: 0 }, { opacity: 1 }], { duration: P(280), fill: "forwards" }).finished,
        he.animate(
          [
            { transform: "translateY(-14px)", opacity: 0 },
            { transform: "translateY(0)", opacity: 1 },
          ],
          { duration: P(300), easing: "ease-out", fill: "both" },
        ),
        (he.style.opacity = ""));
      const _ = pt.animate(
        [
          { transform: "translateY(30px) scale(.7, .4)", opacity: 0 },
          { transform: "translateY(-4px) scale(1.04, .97)", opacity: 1, offset: 0.6 },
          { transform: "none", opacity: 1 },
        ],
        { duration: P(340), easing: "ease-out" },
      );
      ((pt.style.opacity = ""),
        qe.forEach((R, te) =>
          R.animate(
            [
              { transform: "scale(0, 0)" },
              { transform: "scale(1.35, .55)", offset: 0.5 },
              { transform: "scale(.88, 1.18)", offset: 0.75 },
              { transform: "none" },
            ],
            { duration: P(380), delay: P(te * 50), easing: "ease-out", fill: "backwards" },
          ),
        ),
        await _.finished,
        await u(P(qe.length * 50)));
      const we = (R, te) => {
        const K = We(R);
        (R.parentElement.animate(
          [
            { transform: "none" },
            { transform: `scale(${1 + 0.2 * te}, ${1 - 0.25 * te})` },
            { transform: "none" },
          ],
          { duration: P(220), easing: "ease-out" },
        ),
          oe.burst(K.x, K.y + 18, Math.round(4 * te), 1.2 * te, { grav: 0.06, size: 1 }));
      };
      (await Promise.all(
        je.map(async (R, te) => {
          (await u(P(te * 70 + Math.random() * 160)), (R.style.opacity = ""));
          const K = P(620 + Math.random() * 140);
          ([0.42, 0.7, 0.88].forEach((m, z) =>
            Wa(() => {
              (we(R, [1, 0.5, 0.25][z]), z || (t.Sfx.shut(), R.parentElement.classList.add("on")));
            }, K * m),
          ),
            await R.animate(
              [
                {
                  transform: "translateY(-320%) rotate(-40deg) scale(.9, 1.15)",
                  opacity: 1,
                  easing: "cubic-bezier(.5,0,1,.6)",
                },
                { transform: "translateY(0) rotate(0) scale(1.3, .7)", offset: 0.42, easing: "ease-out" },
                {
                  transform: "translateY(-36%) rotate(8deg) scale(.92, 1.08)",
                  offset: 0.56,
                  easing: "ease-in",
                },
                { transform: "translateY(0) scale(1.15, .85)", offset: 0.7, easing: "ease-out" },
                { transform: "translateY(-12%) rotate(-3deg)", offset: 0.79, easing: "ease-in" },
                { transform: "translateY(0) scale(1.06, .94)", offset: 0.88 },
                { transform: "none" },
              ],
              { duration: K },
            ).finished);
        }),
      ),
        await u(P(160)),
        t.Sfx.center(),
        it.classList.add("running"),
        (tt = !0));
      let ie = !0;
      (async () => {
        for (; ie;) {
          if (Math.random() < 0.7) {
            const R = We(de());
            oe.heal(
              R.x + (Math.random() - 0.5) * 70,
              R.y - 4 - Math.random() * 46,
              Math.random() < 0.35 ? 2 : 1,
              Z,
            );
          }
          if (Math.random() < 0.45) {
            const R = We(de());
            oe.twinkle(R.x + (Math.random() - 0.5) * 80, R.y + 10 - Math.random() * 56);
          }
          if (Math.random() < 0.2) {
            const R = We(de());
            oe.burst(R.x + (Math.random() - 0.5) * 40, R.y + 18, 1, 0.3, {
              pal: A,
              grav: -0.03,
              drag: 0.95,
              max: 500,
              size: 1,
            });
          }
          await new Promise((R) => Wa(R, P(110)));
        }
      })();
      let U = 0;
      const Ne = Ss(() => {
        const R = je[U++ % je.length];
        if (!R) return;
        const te = We(R);
        (oe.ring(te.x, te.y + 20, 48, 520, A, 0.35),
          R.animate([{ transform: "none" }, { transform: "scale(1.08, .94)" }, { transform: "none" }], {
            duration: P(200),
            easing: "ease-out",
          }));
      }, P(200));
      (await Promise.all(
        je.map(
          (R, te) =>
            R.animate(
              [
                { filter: "none" },
                { filter: `brightness(1.6) drop-shadow(0 0 4px ${a})` },
                { filter: "none" },
              ],
              { duration: P(520), delay: P(te * 60), iterations: 2, easing: "steps(3)" },
            ).finished,
        ),
      ),
        (ie = !1),
        (tt = !1),
        clearInterval(Ne),
        it.classList.remove("running"),
        t.Sfx.heal(),
        (mt = 1),
        pt.animate([{ filter: "brightness(2.2)" }, { filter: "none" }], {
          duration: P(380),
          easing: "ease-out",
        }));
      const T = We(pt);
      (oe.ring(T.x, T.y, pt.offsetWidth * 0.6, 650, A, 0.45),
        je.forEach((R, te) => {
          const K = P(te * 50 + Math.random() * 80);
          R.animate(
            [
              { transform: "none" },
              { transform: "translateY(-22%) scale(.95, 1.06)", offset: 0.4 },
              { transform: "scale(1.1, .9)", offset: 0.8 },
              { transform: "none" },
            ],
            { duration: P(360), delay: K, easing: "ease-out" },
          );
          const He = We(R);
          Wa(() => {
            oe.heal(He.x, He.y - 30, 2, Z, { vy: -0.3, max: 1e3 });
            for (let m = 0; m < 3; m++)
              oe.twinkle(He.x + (Math.random() - 0.5) * 56, He.y - 10 - Math.random() * 36, A, {
                wait: m * 90 + Math.random() * 60,
              });
          }, K);
        }));
      const L = x(".hm-msg", it);
      ((L.style.visibility = "visible"),
        L.animate(
          [
            { transform: "scale(.4)", opacity: 0 },
            { transform: "scale(1.12)", opacity: 1, offset: 0.6 },
            { transform: "none", opacity: 1 },
          ],
          { duration: P(360), easing: "ease-out" },
        ),
        re.hide(),
        await u(1100),
        await it.animate([{ opacity: 1 }, { opacity: 0 }], { duration: P(300), fill: "forwards" }).finished);
    } finally {
      ((ce = !1), re.end(), it.remove());
    }
    (Ze(), t.Sfx.open());
    const Ee = H ? $(".ally .wrap", H) : [],
      et = Ee.map((_, we) =>
        _.animate(
          [
            { transform: "scale(0)", filter: "brightness(0) invert(1)", opacity: 1 },
            { transform: "scale(1.15, .9)", filter: "brightness(0) invert(1)", opacity: 1, offset: 0.5 },
            { transform: "none", filter: "none", opacity: 1 },
          ],
          { duration: P(380), delay: P(we * 70), easing: "ease-out", fill: "backwards" },
        ),
      );
    (Oe.forEach((_) => _.cancel()),
      H && (H.style.visibility = ""),
      Ee.forEach((_, we) => {
        const ie = x("img", _),
          U = ve(ie || _),
          Ne = (ie || _).getBoundingClientRect().height * 0.5;
        Wa(
          () => {
            (ie && J.gather(ie, U.x, U.y + 20, P(260)),
              J.heal(U.x, U.y - Ne + 6, 2, Z, { vy: -0.3, wait: 220, max: 900 }));
            for (let T = 0; T < 2; T++)
              J.twinkle(U.x + (Math.random() - 0.5) * 60, U.y - Ne * Math.random(), A, {
                wait: 300 + T * 140,
              });
          },
          P(we * 70),
        );
      }),
      await Promise.all(et.map((_) => _.finished)),
      await u(250));
  }
  return { play: b };
})();
