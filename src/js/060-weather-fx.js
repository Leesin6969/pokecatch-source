/**
 * weather fx
 *
 * Public API on the game namespace `t`: t.WeatherFx
 *
 * Recovered from the shipped bundle — original chunk #59 at byte 1489804 (25174 bytes, sha256:a29a4caed0bea0d2).
 * This file is one original source file; the build concatenates them in filename order.
 */
(function a(b) {
  const f = {
      rain: 0.4,
      storm: 1.2,
      snow: 0.09,
      blizzard: 0.45,
      sand: 0.7,
      sun: 0.05,
      ash: 0.3,
      fog: 0.03,
      breeze: 0.035,
      stars: 0.03,
      wind: 0.2,
      leaves: 0.05,
      fireflies: 0.025,
      motes: 0.07,
      bubbles: 0.035,
      underwater: 0.012,
      distortion: 0.03,
      souls: 0.006,
    },
    ue = [
      [34, 30, 30],
      [48, 42, 40],
      [62, 54, 50],
      [82, 68, 58],
      [104, 86, 72],
      [58, 52, 56],
      [150, 140, 132],
    ],
    H = [
      [1, 1],
      [1, 1],
      [2, 1],
      [1, 2],
      [2, 2],
      [3, 3],
    ],
    vt = {
      rain: "rgba(40,60,110,.16)",
      storm: "rgba(25,30,60,.32)",
      snow: "rgba(220,235,255,.12)",
      blizzard: "rgba(214,228,246,.26)",
      sand: "rgba(200,150,80,.2)",
      sun: "rgba(255,245,180,.14)",
      ash: "rgba(60,48,44,.38)",
      fog: "rgba(206,212,224,.26)",
      breeze: "rgba(214,236,250,.05)",
      stars: "rgba(40,30,110,.08)",
      wind: "rgba(220,235,255,.08)",
      leaves: "rgba(255,160,70,.06)",
      fireflies: "rgba(8,30,20,.14)",
      motes: "rgba(60,20,100,.14)",
      bubbles: "rgba(255,190,225,.05)",
      underwater: "rgba(30,110,170,.1)",
      distortion: "rgba(60,24,96,.16)",
      souls: "rgba(30,16,70,.14)",
    },
    B = [
      [255, 236, 140],
      [140, 230, 255],
      [255, 150, 210],
      [190, 160, 255],
      [160, 255, 190],
      [255, 255, 255],
      [255, 190, 120],
    ],
    se = 0.6,
    Ge = [-0.87, 0.5],
    Je = {
      leaves: 500,
      fireflies: 300,
      motes: 450,
      bubbles: 600,
      underwater: 600,
      breeze: 320,
      distortion: 900,
      souls: 420,
    },
    Ze = {
      breeze: {
        near: 0.35,
        v: [
          [0.7, 1.2],
          [1.5, 2.4],
        ],
        len: [
          [14, 28],
          [26, 48],
        ],
        a: [
          [0.32, 0.48],
          [0.6, 0.85],
        ],
        amp: [
          [0.8, 1.6],
          [1.5, 3],
        ],
        thick: 0.3,
        curl: 0.08,
        leaf: 0.12,
        leafV: [1.1, 2],
        wave: 0.05,
      },
      wind: {
        near: 0.45,
        v: [
          [3, 4.5],
          [6, 9],
        ],
        len: [
          [24, 44],
          [50, 90],
        ],
        a: [
          [0.45, 0.65],
          [0.8, 1],
        ],
        amp: [
          [1, 2],
          [2.5, 4.5],
        ],
        thick: 0.65,
        curl: 0.14,
        leaf: 0.3,
        leafV: [4, 6.5],
        wave: 0.09,
      },
    },
    x = [
      [255, 255, 255],
      [232, 246, 255],
      [188, 220, 240],
    ],
    $ = [
      [
        [168, 240, 160],
        [106, 200, 106],
      ],
      [
        [232, 216, 144],
        [184, 160, 80],
      ],
    ],
    X = [0, 8, 2, 10, 12, 4, 14, 6, 3, 11, 1, 9, 15, 7, 13, 5],
    Tt = (N, W) => (X[(W & 3) * 4 + (N & 3)] + 0.5) / 16,
    le = 0.56,
    P = [
      [[0, 0]],
      [
        [0, 0],
        [1, 0],
        [0, 1],
      ],
      [
        [0, 0],
        [1, 0],
        [-1, 1],
        [0, 1],
        [1, 1],
      ],
      [
        [-1, -1],
        [0, -1],
        [-1, 0],
        [0, 0],
        [1, 0],
        [0, 1],
        [1, 1],
        [2, 1],
      ],
      [
        [0, -2],
        [1, -2],
        [-1, -1],
        [0, -1],
        [1, -1],
        [2, -1],
        [-2, 0],
        [-1, 0],
        [0, 0],
        [1, 0],
        [2, 0],
        [-1, 1],
        [0, 1],
        [1, 1],
        [2, 1],
        [3, 1],
        [0, 2],
        [1, 2],
      ],
    ],
    u = [
      [46, 36, 66],
      [104, 88, 140],
      [120, 236, 160],
    ],
    ve = [
      [232, 96, 40],
      [244, 150, 40],
      [250, 200, 70],
      [196, 60, 40],
      [168, 120, 50],
    ],
    it = [0.3, 0.45],
    De = [0.66, 0.86],
    je = 1e3 / 60,
    pt = matchMedia("(prefers-reduced-motion: reduce)"),
    re = () =>
      pt.matches || !!t.Game?.S?.reducedAnim || document.documentElement.classList.contains("no-weather");
  let We,
    oe,
    $e,
    Z = null,
    A = [],
    J = [],
    de = [],
    _e = 0,
    Re = 0,
    dt = 0,
    qe = 0,
    ce = 0,
    tt = 0,
    mt = [],
    Te = null,
    At = -1,
    yt = null,
    he = [],
    fe = [],
    Oe = 0,
    Ee = 0;
  const et = [110, 240],
    _ = 52,
    we = 1,
    ie = [
      "..xxxxx..",
      ".xxxxxxx.",
      "xxxxxxxxx",
      "xxoxxxoxx",
      "xxoxxxoxx",
      "xxxxxxxxx",
      "xxxxoxxxx",
      ".xxxxxxx.",
    ],
    U = (() => {
      const N = (ze, qt) => ie[qt]?.[ze] && ie[qt][ze] !== ".",
        W = [];
      for (let ze = -1; ze <= ie.length; ze++)
        for (let qt = -1; qt <= ie[0].length; qt++)
          !N(qt, ze) &&
            (N(qt - 1, ze) || N(qt + 1, ze) || N(qt, ze - 1) || N(qt, ze + 1)) &&
            W.push([qt, ze]);
      return W;
    })();
  let Ne = [],
    T = 0;
  const L = () => Z === "rain" || Z === "storm",
    R = (N, W) => N + Math.random() * (W - N);
  function te() {
    const N = parseFloat(getComputedStyle(We).getPropertyValue("--k")) || 2;
    ((ce = Math.max(1, Math.round(We.clientWidth / N))),
      (tt = Math.max(1, Math.round(We.clientHeight / N))),
      (oe.width !== ce || oe.height !== tt) && ((oe.width = ce), (oe.height = tt)));
  }
  function K() {
    const N = R(ce * 0.25, ce * 0.55),
      W = 3 + Math.floor(Math.random() * 3),
      ze = [];
    for (let qt = 0; qt < W; qt++)
      ze.push({
        dx: Math.round((N * (qt + 0.5)) / W + R(-3, 3)),
        dy: Math.round(R(-2, 2)),
        r: Math.round(R(3, Math.min(9, tt * 0.07))),
      });
    return { x: 0, y: R(tt * 0.15, tt * 0.92), vx: R(0.05, 0.14), w: N, puffs: ze, a: R(0.14, 0.26) };
  }
  function He() {
    mt = [];
    for (let N = 0; N < 3; N++)
      mt.push({
        x: (N + R(0.35, 0.95)) / 3,
        lean: -R(0.18, 0.38),
        w: R(8, 18),
        len: R(0.55, 0.9),
        a: R(0.14, 0.22),
        ph: R(0, 6.3),
        sp: R(0.006, 0.012),
      });
  }
  function m() {
    for (let N = ((f[Z] || 0) * ce) / 100; N > 0 && !(N < 1 && Math.random() > N); N--)
      if (L()) {
        const W = Math.random() < 0.75 ? R(De[0], De[1]) * tt : tt + 8,
          ze = Z === "storm" ? 1.4 : 1,
          qt = Math.random();
        A.push({
          x: R(0, ce + tt * 0.35),
          y: R(-12, -2),
          vy: R(2.5, 3.5) * ze * (0.7 + 0.3 * qt),
          len: Math.max(2, Math.round(R(4, 7) * ze * (0.6 + 0.4 * qt))),
          land: W,
          a: 0.2 + 0.7 * qt,
        });
      } else if (Z === "snow")
        A.push({
          x: R(0, ce),
          y: -2,
          vy: R(0.15, 0.35),
          ph: R(0, 6.3),
          big: Math.random() < 0.25,
          a: R(0.7, 1),
        });
      else if (Z === "blizzard")
        (A.push({
          x: R(0, ce + tt),
          y: R(-4, -1),
          vx: -R(1.1, 2.3),
          vy: R(0.55, 1.15),
          ph: R(0, 6.3),
          big: Math.random() < 0.3,
          a: R(0.65, 1),
        }),
          Math.random() < 0.05 &&
            A.push({
              gust: !0,
              x: ce + R(0, 30),
              y: R(2, tt * 0.9),
              vx: -R(4, 7),
              len: Math.round(R(14, 40)),
              a: R(0.2, 0.45),
            }));
      else if (Z === "sun")
        A.push({ x: R(0, ce), y: R(tt * 0.45, tt), vy: -R(0.08, 0.2), life: Math.round(R(90, 200)), age: 0 });
      else if (Z === "ash")
        A.push({
          x: R(0, ce),
          y: -2,
          vy: R(0.12, 0.34),
          ph: R(0, 6.3),
          sway: R(0.05, 0.16),
          size: H[Math.floor(Math.random() * H.length)],
          tone: ue[Math.floor(Math.random() * ue.length)],
          a: R(0.75, 1),
          ember: Math.random() < 0.07,
        });
      else if (Z === "fog") {
        const W = K();
        ((W.x = -W.w), A.push(W));
      } else if (Z === "stars") {
        const W = Math.random() < 0.07,
          ze = W ? R(0.8, 1.1) : R(1.2, 2);
        (A.push({
          star: !0,
          big: W,
          x: R(ce * 0.15, ce * 1.15),
          y: R(-4, tt * se * 0.55),
          vx: Ge[0] * ze,
          vy: Ge[1] * ze,
          len: Math.round(W ? R(30, 42) : R(12, 24)),
          tone: W ? B[0] : B[Math.floor(Math.random() * B.length)],
          age: 0,
          life: Math.round(W ? R(130, 170) : R(50, 90)),
        }),
          Math.random() < 0.6 &&
            A.push({
              x: Math.round(R(0, ce)),
              y: Math.round(R(0, tt * se)),
              age: 0,
              life: Math.round(R(30, 70)),
              tone: B[Math.floor(Math.random() * B.length)],
            }));
      } else if (Ze[Z]) {
        const W = Ze[Z],
          ze = Math.random() < W.near,
          qt = ([Lt, zt]) => R(Lt, zt);
        (A.push({
          x: ce + R(0, 24),
          y: R(1, tt - 1),
          v: qt(ze ? W.v[1] : W.v[0]),
          len: Math.round(qt(ze ? W.len[1] : W.len[0])),
          w: ze && Math.random() < W.thick ? 2 : 1,
          a: qt(ze ? W.a[1] : W.a[0]),
          amp: qt(ze ? W.amp[1] : W.amp[0]),
          wl: R(18, 34),
          ph: R(0, 6.3),
          curl: Math.random() < W.curl ? R(0.3, 0.7) : 0,
        }),
          Math.random() < W.leaf &&
            A.push({
              leaf: !0,
              x: ce + 3,
              y: R(0, tt - 2),
              vx: -qt(W.leafV),
              vy: R(-0.12, 0.18),
              ph: R(0, 6.3),
              spin: R(0.12, 0.25),
              tone: $[Math.random() < 0.6 ? 0 : 1],
            }));
      } else if (Z === "leaves")
        A.push({
          x: R(0, ce + 40),
          y: -3,
          vx: -R(0.25, 0.8),
          vy: R(0.25, 0.5),
          ph: R(0, 6.3),
          spin: R(0.06, 0.14),
          tone: ve[Math.floor(Math.random() * ve.length)],
        });
      else if (Z === "fireflies")
        A.push({
          x: R(0, ce),
          y: R(tt * 0.3, tt * 0.92),
          vx: R(-0.12, 0.12),
          vy: R(-0.1, 0.05),
          ph: R(0, 6.3),
          age: 0,
          life: Math.round(R(260, 480)),
        });
      else if (Z === "motes")
        A.push({
          x: R(0, ce),
          y: tt + 2,
          vy: -R(0.15, 0.45),
          ph: R(0, 6.3),
          age: 0,
          life: Math.round(R(160, 320)),
          big: Math.random() < 0.2,
        });
      else if (Z === "souls")
        A.push({
          x: R(0, ce),
          y: R(tt * 0.35, tt * 0.95),
          vx: R(-0.06, 0.06),
          vy: -R(0.08, 0.2),
          ph: R(0, 6.3),
          age: 0,
          life: Math.round(R(300, 520)),
        });
      else if (Z === "bubbles")
        A.push({
          x: R(0, ce),
          y: tt + 4,
          vy: -R(0.18, 0.4),
          ph: R(0, 6.3),
          r: Math.random() < 0.3 ? 3 : Math.random() < 0.5 ? 2 : 1,
          age: 0,
          life: Math.round(R(260, 420)),
        });
      else if (Z === "underwater") {
        const W = Math.random() < 0.4 ? 2 : 1;
        A.push({
          x: R(0, ce),
          y: R(le * tt, tt),
          r: W,
          vy: -R(0.15, 0.3) * (1 + W * 0.15),
          ph: R(0, 6.3),
          wob: R(0.04, 0.09),
          top: R(-4, tt * 0.3),
          age: 0,
        });
      } else if (Z === "distortion") {
        const W = Math.random(),
          ze = W < 0.25 ? 0 : W < 0.55 ? 1 : W < 0.8 ? 2 : W < 0.95 ? 3 : 4;
        (A.push({
          x: R(0, ce),
          y: tt + 3,
          vy: -(0.06 + 0.16 * W),
          ph: R(0, 6.3),
          size: ze,
          a: 0.35 + 0.6 * W,
          rim: W > 0.3 && Math.random() < 0.7,
          spin: Math.round(R(50, 140)),
        }),
          Math.random() < 0.25 &&
            A.push({
              spark: !0,
              x: R(0, ce),
              y: R(tt * 0.25, tt),
              vy: -R(0.1, 0.3),
              age: 0,
              life: Math.round(R(60, 140)),
            }));
      } else
        Z === "sand" &&
          A.push({
            x: ce + R(0, 20),
            y: R(0, tt),
            vx: -R(2, 4),
            vy: R(-0.15, 0.25),
            len: Math.round(R(1, 4)),
            a: R(0.4, 0.8),
            tone: Math.random() < 0.5,
          });
  }
  function z() {
    (qe++, m(), Z === "storm" && ge(), Z === "distortion" && ye(), Z === "souls" && V());
    for (const N of A) {
      if (Z === "underwater") {
        (N.age++,
          (N.ph += N.wob),
          (N.vy = Math.max(-0.75, N.vy * 1.003)),
          (N.x += Math.sin(N.ph) * 0.18),
          (N.y += N.vy),
          N.y <= N.top && (N.dead = !0));
        continue;
      }
      if (Z === "distortion") {
        ((N.y += N.vy),
          (N.ph += 0.02),
          (N.x += Math.sin(N.ph) * 0.06),
          (N.spark ? ++N.age >= N.life : N.y < -4) && (N.dead = !0));
        continue;
      }
      L()
        ? ((N.y += N.vy),
          (N.x -= N.vy * (Z === "storm" ? 0.35 : 0.25)),
          N.y >= N.land &&
            ((N.dead = !0), N.land < tt && de.push({ x: Math.round(N.x), y: Math.round(N.land), t: 0 })))
        : Z === "snow" || Z === "ash"
          ? ((N.ph += 0.03),
            (N.y += N.vy),
            (N.x += Math.sin(N.ph) * (Z === "ash" ? N.sway : 0.18)),
            N.y > tt + 2 && (N.dead = !0))
          : Z === "blizzard"
            ? N.gust
              ? ((N.x += N.vx), N.x + N.len < 0 && (N.dead = !0))
              : ((N.ph += 0.08),
                (N.x += N.vx + Math.sin(N.ph) * 0.3),
                (N.y += N.vy),
                (N.y > tt + 2 || N.x < -4) && (N.dead = !0))
            : Z === "fog"
              ? ((N.x += N.vx), N.x > ce && (N.dead = !0))
              : Z === "sun"
                ? ((N.y += N.vy),
                  (N.x += Math.sin((qe + N.life) / 30) * 0.05),
                  ++N.age >= N.life && (N.dead = !0))
                : Z === "stars"
                  ? (N.star && ((N.x += N.vx), (N.y += N.vy)),
                    (++N.age >= N.life || N.y > tt * se || N.x < -N.len) &&
                      ((N.dead = !0),
                      N.star &&
                        N.age >= N.life &&
                        Math.random() < 0.5 &&
                        J.push({ x: Math.round(N.x), y: Math.round(N.y), age: 0, life: 24, tone: N.tone })))
                  : Ze[Z]
                    ? N.leaf
                      ? ((N.ph += N.spin),
                        (N.x += N.vx),
                        (N.y += N.vy + Math.sin(N.ph) * 0.25),
                        N.x < -4 && (N.dead = !0))
                      : ((N.x -= N.v), N.x + N.len < -12 && (N.dead = !0))
                    : Z === "leaves"
                      ? ((N.ph += N.spin),
                        (N.y += N.vy),
                        (N.x += N.vx + Math.sin(N.ph) * 0.35),
                        (N.y > tt + 3 || N.x < -4) && (N.dead = !0))
                      : Z === "fireflies" || Z === "motes" || Z === "bubbles" || Z === "souls"
                        ? ((N.ph += 0.05),
                          (N.x += (N.vx || 0) + Math.sin(N.ph) * (Z === "bubbles" ? 0.15 : 0.08)),
                          (N.y += N.vy),
                          (++N.age >= N.life || N.y < -6) && (N.dead = !0))
                        : ((N.x += N.vx), (N.y += N.vy), N.x < -6 && (N.dead = !0));
    }
    if (((A = A.filter((N) => !N.dead)), J.length)) {
      for (const N of J) A.push(N);
      J = [];
    }
    for (const N of de) N.t += 0.5;
    de = de.filter((N) => N.t < 4);
  }
  const pe = (N, W, ze = 1, qt = 1) => $e.fillRect(Math.round(N), Math.round(W), ze, qt);
  function V() {
    --T <= 0 &&
      Ne.length < 3 &&
      (Ne.push({
        x0: R(ce * 0.1, ce * 0.9),
        y: R(tt * 0.38, tt * 0.58),
        vy: -R(0.25, 0.4),
        ph: R(0, 6.3),
        amp: R(6, 11),
        age: 0,
        path: [],
      }),
      (T = Math.round(R(et[0], et[1]))));
    for (const N of Ne)
      (N.age++,
        (N.ph += 0.035),
        (N.y += N.vy),
        (N.x = N.x0 + Math.sin(N.ph) * N.amp),
        N.path.push([N.x, N.y]),
        N.path.length > _ && N.path.shift());
    Ne = Ne.filter((N) => N.y > -_ * 0.4);
  }
  function lt(N) {
    const W = Math.min(1, N.age / 45) * Math.max(0, Math.min(1, (N.y + 16) / (tt * 0.22))) * 0.8;
    if (W <= 0.02) return;
    const ze = N.path.length;
    for (let ca = 0; ca < ze - 1; ca++) {
      const [Ma, Na] = N.path[ca],
        Va = ca / ze,
        Ba = 1 + Math.round(Va * Va * 6 * we);
      (($e.fillStyle = `rgba(170,175,255,${(W * Va * 0.75).toFixed(3)})`), pe(Ma - (Ba >> 1), Na, Ba, 1));
    }
    const qt = we,
      Lt = Math.round(N.x) - 4 * qt,
      zt = Math.round(N.y) - 7 * qt;
    $e.fillStyle = `rgba(130,120,255,${(W * 0.35).toFixed(3)})`;
    for (const [ca, Ma] of U) pe(Lt + ca * qt, zt + Ma * qt, qt, qt);
    ie.forEach((ca, Ma) => {
      for (let Na = 0; Na < ca.length; Na++)
        ca[Na] !== "." &&
          (($e.fillStyle =
            ca[Na] === "o"
              ? `rgba(36,18,74,${Math.min(1, W * 1.25).toFixed(3)})`
              : `rgba(228,230,255,${W.toFixed(3)})`),
          pe(Lt + Na * qt, zt + Ma * qt, qt, qt));
    });
  }
  function kt() {
    const N = ce * 0.9,
      W = -tt * 0.12,
      ze = Math.hypot(ce, tt) * 1.1,
      qt = Math.sin(qe / 45);
    ($e.save(), ($e.globalCompositeOperation = "lighter"));
    for (let ca = 0; ca < 7; ca++) {
      const Ma = Math.PI * (0.55 + ca * 0.075) + Math.sin(qe / 400) * 0.06,
        Na = 0.022 + 0.008 * Math.sin(qe / 70 + ca * 1.7),
        Va = $e.createRadialGradient(N, W, 0, N, W, ze);
      (Va.addColorStop(0, `rgba(255,250,205,${0.22 + 0.06 * Math.sin(qe / 55 + ca)})`),
        Va.addColorStop(1, "rgba(255,250,205,0)"),
        ($e.fillStyle = Va),
        $e.beginPath(),
        $e.moveTo(N, W),
        $e.lineTo(N + Math.cos(Ma - Na) * ze, W + Math.sin(Ma - Na) * ze),
        $e.lineTo(N + Math.cos(Ma + Na) * ze, W + Math.sin(Ma + Na) * ze),
        $e.closePath(),
        $e.fill());
    }
    const Lt = $e.createRadialGradient(N, W, 0, N, W, tt * (1.05 + 0.05 * qt));
    (Lt.addColorStop(0, "rgba(255,255,245,.97)"),
      Lt.addColorStop(0.18, `rgba(255,248,190,${0.6 + 0.08 * qt})`),
      Lt.addColorStop(0.55, "rgba(255,235,150,.2)"),
      Lt.addColorStop(1, "rgba(255,235,150,0)"),
      ($e.fillStyle = Lt),
      $e.fillRect(0, 0, ce, tt),
      $e.restore());
    const zt = $e.createLinearGradient(0, 0, 0, tt * 0.55);
    (zt.addColorStop(0, "rgba(255,248,200,.2)"),
      zt.addColorStop(1, "rgba(255,248,200,0)"),
      ($e.fillStyle = zt),
      $e.fillRect(0, 0, ce, tt * 0.55));
    for (const ca of A) {
      const Ma = Math.sin((Math.PI * ca.age) / ca.life),
        Na = Ma * (0.55 + 0.45 * Math.sin(ca.age / 6));
      (($e.fillStyle = `rgba(255,255,230,${Math.max(0, Na)})`),
        pe(ca.x, ca.y),
        Ma > 0.8 && (pe(ca.x - 1, ca.y), pe(ca.x + 1, ca.y), pe(ca.x, ca.y - 1), pe(ca.x, ca.y + 1)));
    }
  }
  const ra = {
    len: 35,
    grow: 6,
    phases: [
      [0, "bw"],
      [6, "neg"],
      [8, "bw"],
      [12, null],
      [16, "bw"],
      [20, null],
    ],
  };
  let Vt = null,
    Xt = 0;
  function Ht() {
    const N = [[R(ce * 0.15, ce * 0.85), -2]],
      W = R(it[0], it[1]) * tt,
      ze = [];
    for (let [qt, Lt] = N[0]; Lt < W;)
      if (
        ((Lt = Math.min(W, Lt + R(4, 10))),
        (qt += R(-7, 7)),
        N.push([qt, Lt]),
        N.length > 2 && Lt < W * 0.75 && Math.random() < 0.25)
      ) {
        const zt = [[qt, Lt]],
          ca = Math.random() < 0.5 ? -1 : 1;
        for (let Ma = 0, Na = qt, Va = Lt; Ma < 3 + R(0, 3); Ma++)
          ((Na += ca * R(2, 7)), (Va += R(3, 8)), zt.push([Na, Va]));
        ze.push(zt);
      }
    return { pts: N, branches: ze, t: 0 };
  }
  function ct(N, W, ze, qt, Lt) {
    ((N = Math.round(N)), (W = Math.round(W)), (ze = Math.round(ze)), (qt = Math.round(qt)));
    const zt = Math.abs(ze - N),
      ca = -Math.abs(qt - W),
      Ma = N < ze ? 1 : -1,
      Na = W < qt ? 1 : -1;
    for (let Va = zt + ca; $e.fillRect(N - (Lt >> 1), W, Lt, 1), !(N === ze && W === qt);) {
      const Ba = 2 * Va;
      (Ba >= ca && ((Va += ca), (N += Ma)), Ba <= zt && ((Va += zt), (W += Na)));
    }
  }
  function wt() {
    const N = Vt.t,
      W = Math.min(1, (N + 1) / ra.grow),
      ze = N < 20 ? 1 : 1 - (N - 20) / (ra.len - 20),
      qt = We.dataset.strike === "neg",
      Lt = (zt, ca) => {
        const Ma = Math.max(1, Math.ceil((zt.length - 1) * W));
        for (let Na = 0; Na < Ma; Na++) ct(...zt[Na], ...zt[Na + 1], ca);
      };
    (($e.fillStyle = qt ? "#000" : `rgba(255,255,255,${ze})`), Lt(Vt.pts, 2));
    for (const zt of Vt.branches) Lt(zt, 1);
  }
  function ge() {
    const N = document.getElementById("arena-fx")?.childElementCount > 0;
    if (Vt) Vt.t++;
    else {
      if (N || qe < Xt || t.Game?.S?.noFlash) return;
      Vt = Ht();
    }
    let W = null;
    for (const [ze, qt] of ra.phases) Vt.t >= ze && (W = qt);
    (N && (W = null),
      W ? (We.dataset.strike = W) : delete We.dataset.strike,
      Vt.t >= ra.len && ((Vt = null), (Xt = qe + Math.round(R(6, 16) * 60))));
  }
  function Fe() {
    ($e.save(), ($e.globalCompositeOperation = "lighter"));
    for (const N of A) {
      const [W, ze, qt] = N.tone,
        Lt = (Va) => `rgba(${W},${ze},${qt},${Math.max(0, Math.min(1, Va)).toFixed(3)})`;
      if (!N.star) {
        const Va = N.age / N.life,
          Ba = Math.sin(Va * Math.PI),
          za = Ba > 0.6 ? 2 : Ba > 0.3 ? 1 : 0;
        (($e.fillStyle = Lt(Ba)),
          pe(N.x, N.y),
          za &&
            (($e.fillStyle = Lt(Ba * 0.55)),
            pe(N.x - za, N.y, za, 1),
            pe(N.x + 1, N.y, za, 1),
            pe(N.x, N.y - za, 1, za),
            pe(N.x, N.y + 1, 1, za)));
        continue;
      }
      const zt = Math.min(1, N.age / 4, (N.life - N.age) / 10);
      for (let Va = N.len; Va > 0; Va--) {
        const Ba = 1 - Va / N.len;
        (($e.fillStyle = Lt(zt * (0.15 + 0.85 * Ba ** 1.4))),
          pe(
            N.x - (N.vx / Math.hypot(N.vx, N.vy)) * Va,
            N.y - (N.vy / Math.hypot(N.vx, N.vy)) * Va,
            1,
            N.big && Va < N.len * 0.6 ? 2 : 1,
          ));
      }
      const ca = (qe + N.life) % 8 < 4;
      (($e.fillStyle = `rgba(255,255,255,${zt.toFixed(3)})`),
        pe(N.x, N.y, N.big ? 2 : 1, N.big ? 2 : 1),
        ($e.fillStyle = Lt(zt * (ca ? 0.85 : 0.5))));
      const Ma = N.big ? (ca ? 3 : 2) : 1,
        Na = N.big ? 1 : 0;
      (pe(N.x - Ma, N.y, Ma, 1 + Na),
        pe(N.x + 1 + Na, N.y, Ma, 1 + Na),
        pe(N.x, N.y - Ma, 1 + Na, Ma),
        pe(N.x, N.y + 1 + Na, 1 + Na, Ma));
    }
    $e.restore();
  }
  function gt() {
    const N = qe * Ze[Z].wave;
    for (const W of A) {
      if (W.leaf) {
        const [ze, qt] = W.tone,
          Lt = Math.cos(W.ph) > 0;
        (($e.fillStyle = `rgb(${ze})`),
          Lt ? pe(W.x, W.y, 2, 1) : pe(W.x, W.y, 1, 2),
          ($e.fillStyle = `rgb(${qt})`),
          pe(W.x + (Lt ? 1 : 0), W.y + 1));
        continue;
      }
      for (let ze = 0; ze < W.len; ze++) {
        const qt = ze / W.len,
          Lt = Math.round(W.x + ze),
          zt = Math.round(W.y + Math.sin((Lt + W.ph * 10) / W.wl + N) * W.amp * (qt + 0.3));
        Lt < 0 ||
          Lt >= ce ||
          Tt(Lt, zt) < qt * qt * 1.1 ||
          (($e.fillStyle = `rgba(${x[qt < 0.1 ? 0 : qt < 0.4 ? 1 : 2]},${(W.a * (1 - qt * 0.5)).toFixed(3)})`),
          pe(Lt, zt, 1, qt < 0.5 ? W.w : 1));
      }
      if (W.curl) {
        const ze = 3 + W.curl * 4,
          qt = qe * 0.13;
        for (let Lt = 0; Lt < 20; Lt++) {
          const zt = qt + (Lt / 20) * 6.283 * 0.85,
            ca = ze * (1 - Lt / 28);
          (($e.fillStyle = `rgba(${x[Lt < 6 ? 0 : 1]},${(W.a * (1 - Lt / 26)).toFixed(3)})`),
            pe(W.x - ze + Math.cos(zt) * ca, W.y - Math.sin(zt) * ca * 0.7));
        }
      }
    }
  }
  const Dt = matchMedia("(pointer: coarse)").matches,
    ha = [
      [230, 255, 250, 0.42],
      [12, 62, 110, 0.08],
    ];
  function _t() {
    const N = Math.round(tt * le),
      W = tt - N,
      ze = Dt ? 2 : 1,
      qt = qe * 0.018;
    (Te || (Te = document.createElement("canvas")),
      (Te.width !== ce || Te.height !== W) && ((Te.width = ce), (Te.height = W)));
    const Lt = Te.getContext("2d"),
      zt = Lt.createImageData(ce, W),
      ca = zt.data;
    for (let Ma = 0; Ma < W; Ma += ze) {
      const Na = Ma / W,
        Va = 0.4 + 0.6 * Na,
        Ba = Math.min(1, Na / 0.3, Math.max(0, (0.88 - Na) / 0.3)),
        za = (Ma * 0.22) / Va;
      for (let vn = 0; vn < ce; vn += ze) {
        const An = ((vn - ce / 2) * 0.11) / Va,
          on = Math.min(
            Math.abs(Math.sin(An + 0.9 * Math.sin(za * 0.8 + qt) + qt * 0.3)),
            Math.abs(Math.sin(za + 0.9 * Math.sin(An * 0.7 - qt * 0.8))),
            Math.abs(Math.sin((An + za) * 0.72 + 0.9 * Math.sin((An - za) * 0.6 + qt * 0.7))),
          ),
          [qn, xn, fn, Yn] = ha[on < 0.08 ? 0 : 1];
        for (let Zn = Ma; Zn < Math.min(W, Ma + ze); Zn++)
          for (let is = vn; is < Math.min(ce, vn + ze); is++) {
            const ts = (Zn * ce + is) * 4;
            ((ca[ts] = qn), (ca[ts + 1] = xn), (ca[ts + 2] = fn), (ca[ts + 3] = Yn * Ba * 255));
          }
      }
    }
    (Lt.putImageData(zt, 0, 0), (At = qe));
  }
  function Ea() {
    D();
    for (let N = Math.round(tt * 0.45); N < tt; N += 2)
      (($e.fillStyle = `rgba(6,32,72,${((0.17 * (N / tt - 0.45)) / 0.55).toFixed(3)})`), pe(0, N, ce, 2));
    ((!Te || qe - At >= (Dt ? 6 : 3) || qe < At) && _t(),
      $e.drawImage(Te, 0, Math.round(tt * le)),
      $e.save(),
      ($e.globalCompositeOperation = "lighter"),
      ($e.fillStyle = "rgb(190,240,255)"));
    for (const N of mt) {
      const W = N.len * tt,
        ze = Math.sin(qe * N.sp + N.ph) * 4,
        qt = N.a * (0.7 + 0.3 * Math.sin(qe * N.sp * 0.7 + N.ph * 2));
      for (let Lt = 0; Lt < W; Lt += 2) {
        const zt = Lt / W,
          ca = N.w * (1 + zt * 0.9),
          Ma = N.x * ce + N.lean * Lt + ze * (0.4 + zt);
        (($e.globalAlpha = qt * (1 - zt) ** 1.4),
          pe(Ma - ca / 2, Lt, ca, 2),
          ($e.globalAlpha *= 0.5),
          pe(Ma - ca / 2 - 1, Lt, 1, 2),
          pe(Ma + ca / 2, Lt, 1, 2));
      }
    }
    $e.restore();
    for (const N of A) {
      const W = Math.min(1, N.age / 20, (N.y - N.top) / 12),
        ze = Math.round(N.x),
        qt = Math.round(N.y);
      if ((($e.fillStyle = `rgba(205,240,255,${(W * 0.75).toFixed(3)})`), N.r === 1)) {
        pe(ze, qt);
        continue;
      }
      for (const [Lt, zt] of ut[N.r]) pe(ze + Lt, qt + zt);
      (($e.fillStyle = `rgba(170,225,255,${(W * 0.12).toFixed(3)})`),
        pe(ze - N.r + 1, qt - N.r + 1, N.r * 2 - 1, N.r * 2 - 1),
        ($e.fillStyle = `rgba(255,255,255,${W.toFixed(3)})`),
        pe(ze - 1, qt - 1));
    }
  }
  const ut = {
    2: [
      [-1, -2],
      [0, -2],
      [1, -2],
      [-2, -1],
      [2, -1],
      [-2, 0],
      [2, 0],
      [-2, 1],
      [2, 1],
      [-1, 2],
      [0, 2],
      [1, 2],
    ],
  };
  function jt() {
    const N = /url\(["']?([^"')]+)/.exec(We.style.backgroundImage || "")?.[1];
    if (!N) {
      xt();
      return;
    }
    if (yt?.src === N) return;
    xt();
    const W = (yt = { src: N, img: new Image(), cv: document.createElement("canvas"), at: -99 });
    ((W.cv.className = "water-fx"),
      (W.img.onload = () => {
        yt === W && ((W.cv.width = W.img.width), (W.cv.height = W.img.height), We.prepend(W.cv), D(!0));
      }),
      (W.img.src = N));
  }
  function xt() {
    (yt?.cv.remove(), (yt = null));
  }
  function D(N) {
    if (!yt?.cv.isConnected || (!N && qe - yt.at < (Dt ? 5 : 3))) return;
    yt.at = qe;
    const { img: W, cv: ze } = yt,
      qt = ze.getContext("2d"),
      Lt = W.width,
      zt = Math.max(1, Math.round(Lt / 355)),
      ca = 1.5 * zt;
    qt.imageSmoothingEnabled = !1;
    for (let Ma = 0; Ma < W.height; Ma += zt) {
      const Na =
        Math.round(
          (Math.sin((Ma / zt) * 0.09 + qe * 0.03) * ca + Math.sin((Ma / zt) * 0.23 - qe * 0.02) * ca * 0.4) /
            zt,
        ) * zt;
      (qt.drawImage(W, 0, Ma, Lt, zt, Na, Ma, Lt, zt),
        Na > 0
          ? qt.drawImage(W, 0, Ma, Na, zt, 0, Ma, Na, zt)
          : Na < 0 && qt.drawImage(W, Lt + Na, Ma, -Na, zt, Lt + Na, Ma, -Na, zt));
    }
  }
  const Q = { open: 40, close: 40 };
  function Y() {
    const N = 7 + Math.floor(Math.random() * 5),
      W = R(ce * 0.12, ce * 0.88),
      ze = R(tt * 0.08, tt * 0.32),
      qt = [];
    for (let Lt = 0, zt = W, ca = ze; Lt < N; Lt++) (qt.push([zt, ca]), (zt += R(-3, 3)), (ca += R(2, 4)));
    return { pts: qt, t: 0, hold: Math.round(R(120, 180)), w: R(2, 3.5) };
  }
  function ye() {
    if ((qe >= Oe && he.length < 2 && (he.push(Y()), (Oe = qe + Math.round(R(4, 9) * 60))), qe >= Ee)) {
      const N = Math.random() < 0.5;
      (fe.push({
        x: N ? R(ce * 0.04, ce * 0.25) : R(ce * 0.75, ce * 0.96),
        y: R(tt * 0.3, tt * 0.75),
        t: 0,
        life: Math.round(R(110, 150)),
        R: R(24, 40),
      }),
        (Ee = qe + Math.round(R(2.5, 5) * 60)));
    }
    for (const N of he) N.t++;
    he = he.filter((N) => N.t < Q.open + N.hold + Q.close);
    for (const N of fe) N.t++;
    fe = fe.filter((N) => N.t < N.life);
  }
  function nt() {
    for (const N of he) {
      const W = Q.open + N.hold,
        ze = N.t < Q.open ? N.t / Q.open : N.t < W ? 1 : 1 - (N.t - W) / Q.close,
        qt = N.pts.length,
        Lt = (qt - 1) / 2,
        zt = ze * (Lt + 1),
        ca = N.t >= Q.open && N.t < W ? 0.85 + 0.15 * Math.sin(N.t * 0.3) : 1;
      for (let Ma = 0; Ma < qt - 1; Ma++) {
        const Na = Math.abs(Ma + 0.5 - Lt) / (Lt + 1);
        if (Math.abs(Ma + 0.5 - Lt) > zt) continue;
        const [Va, Ba] = N.pts[Ma],
          [za, vn] = N.pts[Ma + 1],
          An = Math.max(1, Math.round(N.w * ze * (1 - Na * 0.8)));
        for (let on = 0, qn = Math.ceil(vn - Ba); on < qn; on++) {
          const xn = Math.round(Va + ((za - Va) * on) / qn),
            fn = Math.round(Ba + on);
          (($e.fillStyle = `rgba(120,236,160,${(0.85 * ze * ca).toFixed(3)})`),
            pe(xn - An, fn),
            pe(xn + An, fn),
            ($e.fillStyle = `rgba(190,120,255,${(0.5 * ze * ca).toFixed(3)})`),
            pe(xn - An - 1, fn),
            pe(xn + An + 1, fn),
            ($e.fillStyle = `rgba(12,0,24,${(0.9 * ze).toFixed(3)})`),
            An > 1 ? pe(xn - An + 1, fn, 2 * An - 1, 1) : pe(xn, fn));
        }
      }
    }
  }
  function Ot() {
    for (const N of fe) {
      const W = N.t / N.life;
      for (const [ze, qt] of [
        [0, "200,150,255"],
        [0.22, "130,236,170"],
      ]) {
        const Lt = W - ze;
        if (Lt <= 0) continue;
        const zt = N.R * Lt,
          ca = zt * 0.35,
          Ma = 0.8 * (1 - Lt) ** 1.2,
          Na = Math.max(12, Math.round(zt * 2.4));
        $e.fillStyle = `rgba(${qt},${Ma.toFixed(3)})`;
        for (let Va = 0; Va < Na; Va++) {
          const Ba = (Va / Na) * 6.283,
            za = Math.round(N.x + Math.cos(Ba) * zt),
            vn = Math.round(N.y + Math.sin(Ba) * ca);
          Tt(za, vn) < 0.8 && pe(za, vn, 2, 1);
        }
      }
    }
  }
  function ee() {
    for (let N = 0; N < tt; N += 2) {
      const W = N / tt;
      (W < 0.4 && (($e.fillStyle = `rgba(110,50,170,${(0.14 * (1 - W / 0.4)).toFixed(3)})`), pe(0, N, ce, 2)),
        W > 0.55 &&
          (($e.fillStyle = `rgba(70,210,130,${((0.12 * (W - 0.55)) / 0.45).toFixed(3)})`), pe(0, N, ce, 2)));
    }
    (nt(), Ot());
    for (const N of A) {
      if (N.spark) {
        const Na = Math.sin((N.age / N.life) * Math.PI);
        (($e.fillStyle = `rgba(150,255,180,${(Na * 0.85).toFixed(3)})`),
          pe(N.x, N.y),
          Na > 0.7 &&
            (($e.fillStyle = `rgba(90,230,140,${(Na * 0.4).toFixed(3)})`),
            pe(N.x - 1, N.y),
            pe(N.x + 1, N.y),
            pe(N.x, N.y - 1),
            pe(N.x, N.y + 1)));
        continue;
      }
      const W = N.a * Math.min(1, (tt + 3 - N.y) / 20, (N.y + 4) / (tt * 0.18)),
        ze = Math.floor((qe + N.spin * 7) / N.spin) % 4,
        qt = Math.round(N.x),
        Lt = Math.round(N.y),
        zt = P[N.size].map(([Na, Va]) =>
          ze === 0 ? [Na, Va] : ze === 1 ? [-Va, Na] : ze === 2 ? [-Na, -Va] : [Va, -Na],
        ),
        ca = Math.min(...zt.map((Na) => Na[1])),
        Ma = Math.max(...zt.map((Na) => Na[1]));
      for (const [Na, Va] of zt) {
        const [Ba, za, vn] = u[N.rim && Va === Ma ? 2 : Va === ca && N.size ? 1 : 0];
        (($e.fillStyle = `rgba(${Ba},${za},${vn},${W.toFixed(3)})`), pe(qt + Na, Lt + Va));
      }
    }
  }
  function rt() {
    if (
      ($e.clearRect(0, 0, ce, tt),
      "noveil" in We.dataset || (($e.fillStyle = vt[Z]), $e.fillRect(0, 0, ce, tt)),
      Z === "sun")
    )
      kt();
    else if (Z === "underwater") Ea();
    else if (Z === "distortion") ee();
    else if (L()) {
      const N = Z === "storm" ? 3 : 4;
      for (const W of A) {
        $e.fillStyle = `rgba(205,225,255,${W.a})`;
        for (let ze = 0; ze < W.len; ze++) pe(W.x + Math.floor(ze / N), W.y - ze);
      }
      for (const W of de) {
        const ze = { x: W.x, y: W.y, t: Math.floor(W.t) };
        (($e.fillStyle = `rgba(230,240,255,${0.95 - ze.t * 0.15})`),
          ze.t === 0
            ? pe(ze.x, ze.y - 1)
            : ze.t === 1
              ? (pe(ze.x - 1, ze.y - 2), pe(ze.x + 1, ze.y - 2), pe(ze.x, ze.y))
              : ze.t === 2
                ? (pe(ze.x - 2, ze.y - 2), pe(ze.x + 2, ze.y - 2), pe(ze.x - 1, ze.y, 3, 1))
                : (pe(ze.x - 3, ze.y - 1), pe(ze.x + 3, ze.y - 1), pe(ze.x - 2, ze.y), pe(ze.x + 2, ze.y)));
      }
      Vt && wt();
    } else if (Z === "snow")
      for (const N of A)
        (($e.fillStyle = `rgba(255,255,255,${N.a})`),
          N.big ? (pe(N.x - 1, N.y), pe(N.x + 1, N.y), pe(N.x, N.y - 1), pe(N.x, N.y + 1)) : pe(N.x, N.y));
    else if (Z === "blizzard")
      for (const N of A)
        (($e.fillStyle = `rgba(255,255,255,${N.a})`),
          N.gust ? pe(N.x, N.y, N.len, 1) : N.big ? pe(N.x, N.y, 2, 2) : pe(N.x, N.y));
    else if (Z === "stars") Fe();
    else if (Z === "ash")
      for (const N of A) {
        const [W, ze, qt] = N.ember ? ((qe + N.ph * 10) % 20 < 10 ? [255, 150, 60] : [220, 70, 40]) : N.tone;
        $e.fillStyle = `rgba(${W},${ze},${qt},${N.a})`;
        const [Lt, zt] = N.size;
        Lt === 3 ? (pe(N.x - 1, N.y), pe(N.x, N.y - 1, 1, 3), pe(N.x + 1, N.y)) : pe(N.x, N.y, Lt, zt);
      }
    else if (Z === "fog") {
      const N = Math.round(tt * 0.55);
      for (let W = N; W < tt; W += 2) {
        const ze = (W - N) / (tt - N);
        (($e.fillStyle = `rgba(226,230,238,${(0.04 + 0.22 * ze).toFixed(3)})`), pe(0, W, ce, 2));
      }
      $e.fillStyle = "rgba(226,230,238,.08)";
      for (let W = (qe >> 3) % 2; W < ce; W += 2) pe(W, N - 1);
      for (const W of A) {
        const ze = Math.round(W.x),
          qt = Math.round(W.y),
          Lt = Math.max(...W.puffs.map((zt) => zt.r));
        for (let zt = -Lt - 1; zt <= Lt + 1; zt++) {
          let ca = 1 / 0,
            Ma = -1 / 0,
            Na = 1 / 0;
          for (const Ba of W.puffs) {
            const za = zt - Ba.dy,
              vn = Ba.r * Ba.r - za * za;
            if (vn >= 0) {
              const An = Math.sqrt(vn);
              ((ca = Math.min(ca, Ba.dx - An)), (Ma = Math.max(Ma, Ba.dx + An)));
            } else Math.abs(za) <= Ba.r + 1 && (Na = Math.min(Na, Ba.dx));
          }
          const Va = qt + zt;
          if (Ma >= ca)
            (($e.fillStyle = `rgba(234,238,246,${W.a})`),
              pe(ze + ca + 1, Va, Ma - ca - 1, 1),
              ($e.fillStyle = `rgba(234,238,246,${(W.a * 0.6).toFixed(3)})`),
              Va & 1 || (pe(ze + ca - 1, Va), pe(ze + Ma + 1, Va)));
          else if (Na < 1 / 0) {
            $e.fillStyle = `rgba(234,238,246,${(W.a * 0.5).toFixed(3)})`;
            for (let Ba = -2; Ba <= 2; Ba += 2) pe(ze + Na + Ba + (Va & 1), Va);
          }
        }
      }
    } else if (Ze[Z]) gt();
    else if (Z === "leaves")
      for (const N of A) {
        const [W, ze, qt] = N.tone,
          Lt = Math.cos(N.ph) > 0;
        (($e.fillStyle = `rgb(${W},${ze},${qt})`),
          Lt ? pe(N.x, N.y, 2, 1) : pe(N.x, N.y, 1, 2),
          ($e.fillStyle = `rgba(${(W * 0.6) | 0},${(ze * 0.6) | 0},${(qt * 0.6) | 0},1)`),
          pe(N.x + (Lt ? 1 : 0), N.y + 1));
      }
    else if (Z === "fireflies")
      for (const N of A) {
        const W = Math.max(0, Math.sin((N.age / N.life) * Math.PI)) * (0.55 + 0.45 * Math.sin(N.ph * 3));
        W < 0.08 ||
          (($e.fillStyle = `rgba(200,255,120,${(W * 0.35).toFixed(3)})`),
          pe(N.x - 1, N.y - 1, 3, 3),
          ($e.fillStyle = `rgba(240,255,180,${W.toFixed(3)})`),
          pe(N.x, N.y));
      }
    else if (Z === "motes")
      for (const N of A) {
        const W = Math.sin((N.age / N.life) * Math.PI);
        (($e.fillStyle = `rgba(214,150,255,${(W * 0.9).toFixed(3)})`),
          pe(N.x, N.y),
          N.big &&
            (($e.fillStyle = `rgba(160,80,230,${(W * 0.5).toFixed(3)})`),
            pe(N.x - 1, N.y),
            pe(N.x + 1, N.y),
            pe(N.x, N.y - 1),
            pe(N.x, N.y + 1)));
      }
    else if (Z === "souls") {
      for (const N of A) {
        const W = Math.min(1, Math.sin((N.age / N.life) * Math.PI) * 1.5) * (0.8 + 0.2 * Math.sin(N.ph * 5));
        if (W < 0.06) continue;
        const ze = Math.sin(N.ph),
          qt = Math.round(Math.sin(N.ph * 4) * 0.8),
          Lt = Math.round(N.x),
          zt = Math.round(N.y);
        (($e.fillStyle = `rgba(110,110,255,${(W * 0.16).toFixed(3)})`),
          pe(Lt - 3, zt - 5, 7, 8),
          pe(Lt - 2, zt - 6, 5, 1),
          ($e.fillStyle = `rgba(120,96,240,${(W * 0.8).toFixed(3)})`),
          pe(Lt - 1, zt - 2, 3, 4),
          pe(Lt - 2, zt - 1, 5, 2),
          ($e.fillStyle = `rgba(160,170,255,${(W * 0.9).toFixed(3)})`),
          pe(Lt, zt - 3, 1, 4),
          pe(Lt + qt, zt - 4),
          pe(Lt + qt * 2, zt - 5),
          ($e.fillStyle = `rgba(250,248,255,${W.toFixed(3)})`),
          pe(Lt, zt - 1, 1, 2),
          ($e.fillStyle = `rgba(170,120,255,${(W * 0.4).toFixed(3)})`),
          pe(Lt - ze * 1.5, zt + 3),
          ($e.fillStyle = `rgba(170,120,255,${(W * 0.2).toFixed(3)})`),
          pe(Lt - ze * 2.5, zt + 5));
      }
      for (const N of Ne) lt(N);
    } else if (Z === "bubbles")
      for (const N of A) {
        const W = Math.min(1, Math.sin((N.age / N.life) * Math.PI) * 1.4),
          ze = N.r;
        if ((($e.fillStyle = `rgba(255,214,236,${(W * 0.7).toFixed(3)})`), ze === 1)) {
          pe(N.x, N.y);
          continue;
        }
        for (let qt = 0; qt < 8; qt++) {
          const Lt = (qt / 8) * 6.283;
          pe(N.x + Math.cos(Lt) * ze, N.y + Math.sin(Lt) * ze);
        }
        (($e.fillStyle = `rgba(255,255,255,${W.toFixed(3)})`), pe(N.x - ze * 0.5, N.y - ze * 0.5));
      }
    else if (Z === "sand")
      for (const N of A)
        (($e.fillStyle = N.tone ? `rgba(236,200,140,${N.a})` : `rgba(196,150,90,${N.a})`),
          pe(N.x, N.y, N.len, 1));
  }
  function Qe(N) {
    if (!Yt()) {
      _e = 0;
      return;
    }
    if (((_e = es(Qe)), (Re += Math.min(200, N - (dt || N))), (dt = N), !(Re < je))) {
      for (; Re >= je; Re -= je) z();
      rt();
    }
  }
  let Ft = null;
  const Ye = typeof b != "string";
  let bt = !0;
  const Yt = () => (!Ft || Ft.classList.contains("active")) && (!Ye || (We.isConnected && bt));
  function wa() {
    _e || !Z || re() || !Yt() || ((dt = 0), (Re = 0), (_e = es(Qe)));
  }
  function pa() {
    const N = vt[We.dataset.weather] ? We.dataset.weather : vt[We.dataset.sky] ? We.dataset.sky : null;
    if ((N === "underwater" && !re() ? jt() : xt(), N === Z)) {
      Z && re() && rt();
      return;
    }
    if (
      ((Z = N),
      (A = []),
      (J = []),
      (de = []),
      (Vt = null),
      (Ne = []),
      (T = 0),
      (Xt = qe + 90),
      delete We.dataset.strike,
      (he = []),
      (fe = []),
      (Oe = qe + (Je[N] || 80) + 90),
      (Ee = qe + (Je[N] || 80) + 30),
      cancelAnimationFrame(_e),
      (_e = 0),
      (dt = 0),
      (Re = 0),
      (oe.hidden = !Z),
      !!Z)
    ) {
      if ((te(), Z === "fog"))
        for (let W = 0; W < 12; W++) {
          const ze = K();
          ((ze.x = R(-ze.w * 0.5, ce - ze.w * 0.5)), A.push(ze));
        }
      if ((Z === "underwater" && (He(), (Te = null)), re())) {
        rt();
        return;
      }
      for (let W = 0, ze = Je[Z] || 80; W < ze; W++) z();
      wa();
    }
  }
  b === "arena" &&
    (t.WeatherFx = {
      strike() {
        Z === "storm" && !Vt && (Xt = 0);
      },
      attach: (N) => a(N),
    });
  const Gt = () => {
    if (((We = Ye ? b : document.getElementById(b)), !We)) return;
    ((oe = document.createElement("canvas")),
      (oe.className = "weather-fx"),
      (oe.hidden = !0),
      b === "arena" ? document.getElementById("enemy-slot").after(oe) : We.appendChild(oe),
      oe.after(Object.assign(document.createElement("div"), { className: "weather-strike" })),
      ($e = oe.getContext("2d")),
      new MutationObserver(pa).observe(We, {
        attributes: !0,
        attributeFilter: ["data-weather", "data-sky", "data-noveil", "style"],
      }),
      new ResizeObserver(() => {
        Z && (te(), (Te = null), re() && rt());
      }).observe(We));
    const N = () => {
      ((Z = null), pa());
    };
    (pt.addEventListener?.("change", N),
      addEventListener("calm", N),
      (Ft = We.closest(".screen")),
      Ft && new MutationObserver(wa).observe(Ft, { attributes: !0, attributeFilter: ["class"] }),
      Ye &&
        (new IntersectionObserver(([W]) => {
          ((bt = W.isIntersecting), wa());
        }).observe(We),
        We.addEventListener("fx-wake", wa)),
      pa());
  };
  (Ye ? Gt() : document.readyState === "loading" ? document.addEventListener("DOMContentLoaded", Gt) : Wa(Gt),
    b === "arena" && a("pen-scene"));
})("arena");
