/**
 * frames
 *
 * Public API on the game namespace `t`: t.Frames
 *
 * Recovered from the shipped bundle — original chunk #47 at byte 1130719 (34175 bytes, sha256:b8f7340067668f43).
 * This file is one original source file; the build concatenates them in filename order.
 */
t.Frames = (function () {
  const a = () => t.Game,
    b = "#1b1b22",
    f = (ee) => ee.map((rt) => [...rt].reverse().join("")),
    ue = {
      egg: {
        pal: { k: b, c: "#f3e6b0", l: "#fffbe6", g: "#5aa84a", s: "#c9b071" },
        rows: [
          "..kkk..",
          ".kclck.",
          "kcgccck",
          "kcccgck",
          "kgcccck",
          "kccgcsk",
          "kscccsk",
          ".kcssk.",
          "..kkk..",
        ],
      },
      sprig: {
        pal: { g: "#5aa84a", l: "#8fd65e", d: "#2f7a2a" },
        rows: [".ll.....", "lglg..l.", "dddggglg", "......dd"],
      },
      charm: {
        pal: { c: "#48d8f0", l: "#b8f8ff", w: "#ffffff", g: "#9be04a", b: "#4a6ae0" },
        rows: ["......bb", ".....b..", "..c.g...", ".clc....", "clwlc...", ".clc....", "..c....."],
      },
      charmGlint: {
        pal: { c: "#48d8f0", l: "#b8f8ff", w: "#ffffff", g: "#9be04a", b: "#4a6ae0" },
        rows: [
          "..w...bb",
          "..l..b..",
          "..l.g...",
          ".lwl....",
          "wwwwwl.w",
          ".lwl....",
          "..l.....",
          "..w.....",
        ],
      },
      spark7: {
        pal: { w: "#ffffff", y: "#ffe066" },
        rows: ["...w...", "...y...", "..yyy..", "wyywyyw", "..yyy..", "...y...", "...w..."],
      },
      spark5: { pal: { w: "#ffffff", y: "#ffe066" }, rows: ["..w..", "..y..", "wywyw", "..y..", "..w.."] },
      spark3: { pal: { w: "#ffffff", y: "#ffe066" }, rows: [".y.", "ywy", ".y."] },
      heart: { pal: { p: "#ff6f9f", l: "#ffc2d6" }, rows: ["pp.pp", "plppp", ".ppp.", "..p.."] },
      bulbOn: { pal: { y: "#ffcb05", w: "#fff8c0" }, rows: [".y.", "ywy", ".y."] },
      bulbOff: { pal: { o: "#5a3200", y: "#8a5a10" }, rows: [".o.", "oyo", ".o."] },
      coin1: {
        pal: { o: "#a86e00", y: "#ffcb05", l: "#fff2a8" },
        rows: ["..ooo..", ".oylyo.", "oylyyyo", "oyyoyyo", "oyyyyyo", ".oyyyo.", "..ooo.."],
      },
      coin2: {
        pal: { o: "#a86e00", y: "#ffcb05", l: "#fff2a8" },
        rows: [".ooo.", "oylyo", "oyyyo", "oyoyo", "oyyyo", "oyyyo", ".ooo."],
      },
      coin3: { pal: { o: "#a86e00", y: "#ffcb05" }, rows: [".o.", "oyo", "oyo", "oyo", "oyo", "oyo", ".o."] },
      coin4: { pal: { o: "#a86e00" }, rows: ["o", "o", "o", "o", "o", "o", "o"] },
      lens: {
        pal: { o: "#5a1015", w: "#e8dcdc", l: "#e4f4ff", b: "#8ccaf0", d: "#5a9ac8" },
        rows: ["..ooo..", ".owwwo.", "owlbbwo", "owbbbwo", "owbbdwo", ".owwwo.", "..ooo.."],
      },
      hinge: {
        pal: { k: b, d: "#8a1a20", r: "#ff5a5f" },
        rows: Array.from({ length: 20 }, (ee, rt) =>
          rt === 0 || rt === 19 ? ".kk." : rt % 6 === 3 ? "krrk" : "kddk",
        ),
      },
      crown: {
        pal: { y: "#ffcb05", l: "#fff2a8", o: "#a86e00", r: "#e3353b", b: "#4f8ff7" },
        rows: ["l...l...l", "yl.lyl.ly", "yyyyyyyyy", "yryybyyry", "ooooooooo"],
      },
    };
  ((ue.nest = {
    pal: { b: "#a0703a", d: "#5a3a18", l: "#d0a060" },
    rows: [".blbdblbd.", "bdbdbbdbdb", ".ddbddbdd."],
  }),
    (ue.vine = {
      pal: { g: "#5aa84a", l: "#8fd65e", d: "#2f7a2a" },
      rows: (() => {
        const rt = Array.from({ length: 5 }, () => Array(18).fill("."));
        for (let Qe = 0; Qe < 18; Qe++) rt[2][Qe] = "d";
        for (let Qe = 1; Qe < 17; Qe += 4) {
          const Ft = (Qe >> 2) % 2 === 0,
            Ye = Ft ? 0 : 3;
          ((rt[Ye][Qe] = "l"),
            (rt[Ye][Qe + 1] = "g"),
            (rt[Ft ? 1 : 3][Qe + 1] = "g"),
            (rt[Ft ? 1 : 4][Qe + 2] = Ft ? "g" : "l"));
        }
        return rt.map((Qe) => Qe.join(""));
      })(),
    }),
    (ue.flower = {
      pal: { p: "#f06ba8", P: "#ffb3d4", y: "#ffe066", g: "#5aa84a" },
      rows: ["..p..", ".pPp.", "pPyPp", ".pPp.", "g.p.g"],
    }),
    (ue.friendball9 = {
      pal: {
        k: b,
        g: "#8cc63f",
        h: "#c8f07a",
        y: "#ffe066",
        r: "#d0583a",
        w: "#ffffff",
        v: "#d8d0f0",
        s: "#a89ec8",
      },
      rows: [
        "..kkkkk..",
        ".kgrgyhk.",
        "kgggrgghk",
        "krggkgrgk",
        "kkkkwkkkk",
        "kvvvkvvvk",
        "kvvvvvvsk",
        ".kvvvvsk.",
        "..kkkkk..",
      ],
    }),
    (ue.rocket9 = {
      pal: { k: b, d: "#2a2a33", R: "#ff3b3b", h: "#ff9a9a" },
      rows: [
        ".kkkkkkkk.",
        "kddddddddk",
        ...["hhhhh.", "RR..RR", "RR..RR", "RRRRR.", "RR.RR.", "RR..RR", "RR..RR"].map(
          (rt) => "kd" + rt.replace(/\./g, "d") + "dk",
        ),
        "kddddddddk",
        ".kkkkkkkk.",
      ],
    }));
  const H = ["kwwkwwgkwgk", "kWwwkkkwwgk", ".kwwwwwwgk.", "..kwwwggk..", "...kkkkk..."];
  ((ue.pokeballHD = {
    pal: { k: b, R: "#ff8a8a", r: "#e3353b", d: "#a8202a", W: "#ffffff", w: "#e4e6ee", g: "#9aa0b4" },
    rows: ["...kkkkk...", "..kRRrrrk..", ".kRrrrrrdk.", "kRrrkkkrrdk", "krrkWWwkrdk", "kkkkWwwkkkk", ...H],
  }),
    (ue.masterHD = {
      pal: {
        k: b,
        P: "#c084ff",
        p: "#7a3fc8",
        q: "#4a1f8a",
        m: "#ff6fb5",
        W: "#ffffff",
        w: "#e4e6ee",
        g: "#9aa0b4",
      },
      rows: ["...kkkkk...", "..kPWpWpk..", ".kmpWWWpmk.", "kPppkkkppqk", "kppkWWwkpqk", "kkkkWwwkkkk", ...H],
    }),
    (ue.gem = {
      pal: { b: "#3a0c38", w: "#ffffff", l: "#f6c6f4", p: "#c050be", d: "#6a1a68" },
      rows: ["...b...", "..bwb..", ".bwlpb.", "bwlppdb", ".blpdb.", "..bdb..", "...b..."],
    }));
  for (const [ee, rt, Qe, Ft, Ye] of [
    ["gemC", "#a8b0c0", "#e4e8f0", "#5a6070", "#2a2e38"],
    ["gemU", "#4a8ff0", "#bcd8ff", "#1f4fa0", "#122a5a"],
    ["gemR", "#38d0e8", "#c0f6ff", "#127890", "#0a3a48"],
    ["gemL", "#ffcb05", "#fff2a8", "#b07800", "#5a3a00"],
  ])
    ue[ee] = { pal: { ...ue.gem.pal, p: rt, l: Qe, d: Ft, b: Ye }, rows: ue.gem.rows };
  ue.joint = {
    pal: { k: b, m: "#c3c9d8", y: "#ffcb05" },
    rows: [".kkkkk.", "kmymymk", "kmmmmmk", ".kkkkk."],
  };
  const vt = (ee) => ({
    pal: {
      k: b,
      r: ee === 0 ? "#ff4a4a" : "#6a1a1a",
      y: ee === 1 ? "#ffe066" : "#6a5a1a",
      g: ee === 2 ? "#6cf07a" : "#1a5a2a",
    },
    rows: ["kkkkkkkkkk", "krrkyykggk", "krrkyykggk", "kkkkkkkkkk"],
  });
  Object.assign(ue, { led0: vt(0), led1: vt(1), led2: vt(2) });
  const B = ["..k..", ".kLk.", "kLCDk", ".kDk.", "..k.."];
  ((ue.trio = {
    pal: {
      k: b,
      a: "#fff2a8",
      A: "#ffd84a",
      b: "#c89a10",
      p: "#ffd0ea",
      P: "#ff8ac8",
      q: "#c0508a",
      r: "#ffb0b0",
      R: "#ff4a4a",
      s: "#a8202a",
    },
    rows: (() => {
      const ee = Array.from({ length: 6 }, () => Array(17).fill("."));
      return (
        [
          ["a", "A", "b", 1],
          ["p", "P", "q", 0],
          ["r", "R", "s", 1],
        ].forEach(([rt, Qe, Ft, Ye], bt) =>
          B.forEach((Yt, wa) =>
            [...Yt].forEach((pa, Gt) => {
              pa !== "." && (ee[wa + Ye][bt * 6 + Gt] = { k: "k", L: rt, C: Qe, D: Ft }[pa]);
            }),
          ),
        ),
        ee.map((rt) => rt.join(""))
      );
    })(),
  }),
    (ue.griseous = {
      pal: { k: b, L: "#fff6c8", G: "#d8b040", D: "#8a6a18", P: "#4a1a6a" },
      rows: ["..kkk..", ".kLGGk.", "kLGPGDk", "kGPPPDk", "kGGPDDk", ".kDDDk.", "..kkk.."],
    }),
    (ue.galactic9 = {
      pal: { k: b, d: "#1f3a40", G: "#ffd23a", h: "#fff2a8" },
      rows: [
        ".kkkkkkkk.",
        "kddddddddk",
        ...[".hGGG.", "GG..GG", "GG....", "GG.GGG", "GG..GG", "GG..GG", ".GGGG."].map(
          (rt) => "kd" + rt.replace(/\./g, "d") + "dk",
        ),
        "kddddddddk",
        ".kkkkkkkk.",
      ],
    }),
    (ue.moonGold = {
      pal: { k: b, y: "#ffd84a", l: "#fff6c8", o: "#b88a10" },
      rows: [
        "...kkk.",
        "..kllk.",
        ".klyk..",
        "klyk...",
        "kyyk...",
        "kyyk...",
        ".kyok..",
        "..kook.",
        "...kkk.",
      ],
    }),
    (ue.moonDark = {
      pal: { k: b, g: "#e4e6ee", d: "#4a4a5c", r: "#e3353b" },
      rows: [
        ".kkk...",
        ".kggk..",
        "..kgdk.",
        "...kddk",
        "...krrk",
        "...kddk",
        "..kgdk.",
        ".kggk..",
        ".kkk...",
      ],
    }));
  const se = (ee, rt = 0) => ({
    pal: { o: "#c07a00", y: "#ffb81c", l: "#ffe08a" },
    rows: [...Array(rt).fill("..."), ...[".y.", "yly", "yyy", ".o."].slice(0, ee)],
  });
  (Object.assign(ue, { drop1: se(1), drop2: se(2), drop3: se(3), drop4: se(4), dropFall: se(4, 3) }),
    (ue.combee = {
      pal: { k: b, y: "#ffcb05", o: "#c07a00", w: "#ffffff", r: "#e3353b" },
      rows: [".kkk.kkk.", "kyyykyyyk", "kywykywyk", "kyryk.kkk", ".kkkkk...", "..kyyyk..", "...kkk..."],
    }),
    (ue.honey = {
      pal: { o: "#c07a00", y: "#ffb81c", l: "#ffe08a" },
      rows: ["llyyyyyylly", "yyyyoyyyyyy", ".yo..y..oy.", ".o...y...o.", ".....o....."],
    }));
  const Ge = (ee, rt, Qe) => ({
    pal: { k: b, w: "#ffffff", L: ee, C: rt, D: Qe },
    rows: ["..kkk..", ".kwLCk.", "kwLCCDk", "kLCCCDk", "kCCCDDk", ".kDDDk.", "..kkk.."],
  });
  Object.assign(ue, {
    adamant: Ge("#d8ecff", "#6a9ad8", "#2a4a8a"),
    lustrous: Ge("#ffe8f4", "#f0a0cc", "#a85088"),
  });
  const Je = [
      "....k....",
      "...kyk...",
      "...kyk...",
      "..kylok..",
      ".kyl0ook.",
      "kyl000ook",
      ".kyo0ok..",
      "..kkkkk..",
    ],
    Ze = (ee) =>
      [...ee[0]].map((rt, Qe) =>
        ee
          .map((Ft) => Ft[Qe])
          .reverse()
          .join(""),
      ),
    x = [
      "#EE8130",
      "#6390F0",
      "#7AC74C",
      "#F7D02C",
      "#96D9D6",
      "#C22E28",
      "#A33EA1",
      "#E2BF65",
      "#A98FF3",
      "#F95587",
      "#A6B91A",
      "#B6A136",
      "#735797",
      "#6F35FC",
      "#705746",
      "#B7B7CE",
    ];
  (x.forEach((ee, rt) => {
    const Qe = { k: b, y: "#e8c050", l: "#fff6c8", o: "#8a6a18", 0: ee };
    let Ft = Je;
    for (const Ye of "NESW") ((ue[`spur${Ye}${rt}`] = { pal: Qe, rows: Ft }), (Ft = Ze(Ft)));
  }),
    (ue.chevron = {
      pal: { y: "#0a84ff", l: "#ffffff", o: "#0040d0" },
      rows: ["....l....", "...lyy...", "..lyoyy..", ".lyo.oyy.", "lyo...oyy", "yo.....oy"],
    }),
    (ue.chevronGold = { pal: { y: "#ffd54a", l: "#fff6c8", o: "#b88400" }, rows: ue.chevron.rows }),
    (ue.clamp = {
      pal: { y: "#ffd54a", l: "#fff6c8", o: "#b88400", d: "#7a4d00" },
      rows: [".l.", "lyo", "lyo", "ldo", "lyo", "lyo", "lyo", "lyo", "ldo", "lyo", ".o."],
    }));
  const $ = { k: b, d: "#0040d0", m: "#0a84ff", h: "#6cd0ff", l: "#ffffff" },
    X = [
      "....b....",
      "...kbk...",
      "...khk...",
      "..kkkkk..",
      "..khmdk..",
      "..khwdk..",
      ".kkkkkkk.",
      ".khmwmdk.",
      ".khmmmdk.",
      "kkkkkkkkk",
      "khwmwmwdk",
      "khmmmmmdk",
      "kkkkkkkkk",
    ],
    Tt = {
      0: ["lll", "l.l", "l.l", "l.l", "lll"],
      1: [".l.", "ll.", ".l.", ".l.", "lll"],
      5: ["lll", "l..", "lll", "..l", "lll"],
    };
  ((ue.towerIcon = { pal: { ...$, w: "#ffffff", b: "#ffffff" }, rows: X }),
    (ue.beacon = {
      pal: { b: "#ffffff", y: "#ffe066" },
      rows: X.map((ee, rt) =>
        rt < 2 ? ee.replace(/[^b]/g, ".").replace("b", rt ? "y" : "b") : ".".repeat(ee.length),
      ),
    }),
    [50, 100, 150].forEach((ee) => {
      const rt = [...String(ee)].map((Ye) => Tt[Ye]),
        Qe = rt.length * 4 + 3,
        Ft = "." + "k".repeat(Qe - 2) + ".";
      ue["plate" + ee] = {
        pal: { k: b, d: $.d, h: $.m, l: $.l },
        rows: [
          Ft,
          "k" + "h".repeat(Qe - 2) + "k",
          ...[0, 1, 2, 3, 4].map((Ye) => "kd" + rt.map((bt) => bt[Ye].replace(/\./g, "d")).join("d") + "dk"),
          "k" + "d".repeat(Qe - 2) + "k",
          Ft,
        ],
      };
    }));
  const le = ["#a8a8b8", "#68b0f0", "#f8b030", "#78d058", "#e070c0", "#f8d030", "#f05030", "#50a070"];
  ue.badges = {
    pal: Object.fromEntries(le.map((ee, rt) => [String(rt), ee])),
    rows: (() => {
      const ee = Array.from({ length: 4 }, () => Array(17).fill("."));
      return (
        le.forEach((rt, Qe) => {
          const Ft = Qe * 2,
            Ye = Qe % 2;
          [
            [1, 0],
            [0, 1],
            [1, 1],
            [2, 1],
            [1, 2],
          ].forEach(([bt, Yt]) => {
            ee[Ye + Yt][Ft + bt] = String(Qe);
          });
        }),
        ee.map((rt) => rt.join(""))
      );
    })(),
  };
  const P = ["#707078", "#58b048", "#e87060", "#5aa0e8", "#c070e0", "#c0a070", "#a8e0f8", "#f8d030"];
  ue.badgesDp = { pal: Object.fromEntries(P.map((ee, rt) => [String(rt), ee])), rows: ue.badges.rows };
  const u = ["...k...", "..klk..", ".kllck.", "kclccck", ".kccdk.", "..kdk..", "...k..."];
  P.forEach((ee, rt) => {
    ((ue["bgem" + rt] = { pal: { k: b, c: ee, l: "#ffffffaa", d: "#00000055" }, rows: u }),
      (ue["bgemLit" + rt] = { pal: { k: b, c: ee, l: "#ffffff", d: ee }, rows: u }));
  });
  const ve = (ee) => ({
    pal: { o: "#5a3a18", s: "#d8b878", d: "#b08a48", k: b, w: "#ffffff" },
    rows: [
      ".ooooooo.",
      ...ee.map((rt, Qe) => "o" + rt.replace(/\./g, Qe > 4 ? "d" : "s") + "o"),
      ".ooooooo.",
    ],
  });
  ((ue.unownA = ve(["...k...", "..kkk..", ".kwwwk.", ".kwkwk.", ".kwwwk.", "kkkkkkk", "k.....k"])),
    (ue.unownQ = ve([".kkkkk.", "kkwwwkk", "kkwkwkk", ".kwwwkk", "....kk.", ".......", "...kk.."])),
    (ue.unownZ = ve(["kkkkkkk", "....kk.", "..kwwk.", ".kwkwk.", ".kwwk..", ".kk....", "kkkkkkk"])),
    (ue.bolt = {
      pal: { y: "#ffcb05", l: "#fff2a8", o: "#c88a00" },
      rows: ["...ll", "..lyy", ".lyy.", "lyyyy", "..yyo", ".yyo.", "yo..."],
    }),
    (ue.flame = {
      pal: { r: "#e8442a", o: "#ff9a2a", y: "#ffe066" },
      rows: ["..r..", "..rr.", ".rorr", ".roor", "rooyr", "royyr", ".ryr."],
    }),
    (ue.crystal = {
      pal: { b: "#3fb8d8", l: "#b8f4ff", w: "#ffffff", d: "#2a6aa8" },
      rows: ["..w..", ".lwb.", "lwbbd", "lbbbd", "lbbbd", ".bbd.", "..d.."],
    }));
  const it = [
      ".....aa",
      "....abb",
      "...abbc",
      "..abbc.",
      "..bccd.",
      ".bcdd..",
      ".cde...",
      ".de....",
      "q......",
    ],
    De = (ee) => [...ee].reverse();
  ((ue.rainbowWing = {
    pal: { a: "#e3353b", b: "#ff9a2a", c: "#ffe066", d: "#6cd04a", e: "#3b8fe8", q: "#ffffff" },
    rows: f(it),
  }),
    (ue.silverWing = {
      pal: { a: "#ffffff", b: "#e4e8f2", c: "#c8d0e0", d: "#9aa8c8", e: "#5a7ac8", q: "#ffffff" },
      rows: De(it),
    }),
    (ue.cloud = {
      pal: { w: "#ffffff", g: "#c8d4e4", d: "#8a9ab8" },
      rows: ["....ww.....", "..wwwwww...", ".wwwwwwwww.", "wwwwwwwwwww", ".gggggdggd."],
    }),
    (ue.sun = {
      pal: { y: "#ffcb05", l: "#fff2a8", o: "#ff8a1a" },
      rows: ["o..y..o", ".yyyyy.", ".ylyyy.", "yyyyyyy", ".yyyyo.", ".yyyoo.", "o..y..o"],
    }),
    (ue.drop = {
      pal: { b: "#3b8fe8", l: "#a8dcff", d: "#1a5aa8" },
      rows: ["..b..", "..b..", ".blb.", "bllbb", "blbbd", "bbbbd", ".bdd."],
    }),
    (ue.flake = {
      pal: { w: "#ffffff", c: "#8ad8ff" },
      rows: ["...w...", ".c.w.c.", "..cwc..", "wwwcwww", "..cwc..", ".c.w.c.", "...w..."],
    }));
  const je = {
      rock: [
        [2, 2],
        [4, 2],
        [6, 2],
        [4, 4],
        [2, 6],
        [4, 6],
        [6, 6],
      ],
      ice: [
        [2, 2],
        [2, 4],
        [2, 6],
        [4, 4],
        [6, 2],
        [6, 4],
        [6, 6],
      ],
      steel: [
        [3, 2],
        [5, 2],
        [2, 4],
        [6, 4],
        [4, 4],
        [3, 6],
        [5, 6],
      ],
    },
    pt = (ee, rt) =>
      Array.from({ length: 9 }, (Qe, Ft) =>
        Array.from({ length: 9 }, (Ye, bt) =>
          ee.some(([wa, pa]) => wa === bt && pa === Ft)
            ? "D"
            : rt
              ? "."
              : bt === 0 || Ft === 0 || bt === 8 || Ft === 8
                ? (bt === 0 || bt === 8) && (Ft === 0 || Ft === 8)
                  ? "."
                  : "o"
                : bt === 1 || Ft === 1
                  ? "l"
                  : "s",
        ).join(""),
      );
  [
    ["rock", "#8a4a1a", "#ffa64a"],
    ["ice", "#2a7a8a", "#a8f6ff"],
    ["steel", "#7a2a2a", "#ff6a6a"],
  ].forEach(([ee, rt, Qe]) => {
    ((ue["regi_" + ee] = { pal: { o: "#3a3a44", s: "#8a8478", l: "#aaa294", D: rt }, rows: pt(je[ee]) }),
      (ue["regiLit_" + ee] = { pal: { D: Qe }, rows: pt(je[ee], !0) }));
  });
  const re = { k: "#2a2a22", l: "#e0d8c0", s: "#b8b098", d: "#7a7460", g: "#5a9a4a" };
  ue.column = {
    pal: re,
    rows: [
      "kkkkkkk",
      "kllsssk",
      "kkkkkkk",
      ...Array.from({ length: 12 }, (ee, rt) =>
        rt % 9 === 4 ? ".kgsdk." : rt % 9 === 7 ? ".kdddk." : ".klsdk.",
      ),
      "kkkkkkk",
      "klsssdk",
      "kkkkkkk",
    ],
  };
  const We = [
    "..ww......www.....ww.....ww..",
    ".wwww..wwwwwww..wwwww..wwwww.",
    "wwwwwwwwwwwwwwwwwwwwwwwwwwwww",
    "ggggggggggggggggggggggggggggg",
  ];
  ((ue.cloudsLow = { pal: { w: "#ffffff", g: "#d8e4f0" }, rows: We }),
    (ue.cloudsHigh = { pal: { w: "#ffffff", g: "#d8e4f0" }, rows: De(We.slice(0, 3)) }));
  for (const [ee, rt] of [
    ["S", "exp-candy-s"],
    ["M", "exp-candy-m"],
    ["XL", "exp-candy-xl"],
    ["Big", "exp-candy-big"],
    ["SB", "rare-candy"],
  ])
    ((ue[`candy${ee}`] = { src: `assets/ui/frame-candy/${rt}.png`, w: 21, h: 21 }),
      (ue[`candy${ee}m`] = { src: `assets/ui/frame-candy/${rt}-m.png`, w: 21, h: 21 }));
  const oe = 4;
  function $e(ee, rt, Qe, Ft, Ye = [0.14, 0.36]) {
    const bt = Ft,
      Yt = ee - Ft,
      wa = (ee - 2) / 36,
      pa = Math.round(Ye[0] * 36 * wa) + 1 - Ft,
      Gt = Math.round(Ye[1] * 36 * wa) + 1 - Ft,
      N = rt + 0.5,
      W = Qe + 0.5;
    if (N < bt || N > Yt || W < bt || W > Yt) return !1;
    const ze = (qt, Lt, zt) => zt <= 0 || (N - qt) ** 2 + (W - Lt) ** 2 <= zt * zt;
    return N < bt + pa && W < bt + pa
      ? ze(bt + pa, bt + pa, pa)
      : N > Yt - pa && W < bt + pa
        ? ze(Yt - pa, bt + pa, pa)
        : N > Yt - pa && W > Yt - pa
          ? ze(Yt - pa, Yt - pa, pa)
          : N < bt + Gt && W > Yt - Gt
            ? ze(bt + Gt, Yt - Gt, Gt)
            : !0;
  }
  function Z(ee, rt, Qe) {
    return Array.from({ length: ee }, (Ft, Ye) =>
      Array.from({ length: ee }, (bt, Yt) => {
        if (!$e(ee, Yt, Ye, 0, Qe) || $e(ee, Yt, Ye, oe, Qe)) return ".";
        let wa = 0;
        for (; wa < oe - 1 && $e(ee, Yt, Ye, wa + 1, Qe);) wa++;
        if (wa === 0 || wa === oe - 1) return "k";
        const pa = ((Math.atan2(Ye + 0.5 - ee / 2, Yt + 0.5 - ee / 2) + Math.PI) / (2 * Math.PI) + 0.75) % 1;
        return rt(wa, pa, Yt, Ye, ee);
      }).join(""),
    );
  }
  const A = (ee, rt, Qe) => ee + rt < Qe,
    J = (ee, rt, Qe) => ({
      pal: { k: b, T: rt, t: ee, W: "#ffffff", w: "#c8ccd8", m: Qe || ee },
      paint: (Ft, Ye, bt, Yt, wa) => {
        const pa = Yt / wa;
        return pa > 0.47 && pa < 0.55
          ? "k"
          : pa <= 0.47
            ? Qe && Ft === 1 && Math.abs(bt / wa - 0.5) > 0.22 && Math.abs(bt / wa - 0.5) < 0.34
              ? "m"
              : Ft === 1 && A(bt, Yt, wa)
                ? "T"
                : "t"
            : Ft === 1 && A(bt, Yt, wa)
              ? "W"
              : "w";
      },
    }),
    de = {
      base: {
        pal: { k: b, l: "#7d8498", m: "#565c70", d: "#3c4152" },
        paint: (ee, rt, Qe, Ft, Ye) => (ee === 1 ? (A(Qe, Ft, Ye) ? "l" : "m") : A(Qe, Ft, Ye) ? "m" : "d"),
      },
      pokeball: J("#e3353b", "#ff7a7e"),
      master: J("#7a3fc8", "#b07cf0", "#ff6fb5"),
      pension: {
        pal: { k: b, P: "#ffb3d4", p: "#f06ba8", C: "#fffbe6", c: "#f3e6b0", s: "#c9b071" },
        paint: (ee, rt, Qe, Ft, Ye) => {
          const bt = Ft / Ye < 0.5;
          return ee === 1 && (Qe * 3 + Ft * 5) % 11 === 0
            ? bt
              ? "C"
              : "s"
            : bt
              ? ee === 1
                ? "P"
                : "p"
              : ee === 1
                ? "C"
                : "c";
        },
      },
      raid: {
        pal: { k: b, l: "#f0a8ef", r: "#c050be", d: "#6a1a68", w: "#ffffff" },
        paint: (ee, rt, Qe, Ft, Ye) =>
          ee === 1 && (Qe + 2 * Ft) % 13 === 0
            ? "w"
            : ee === 1
              ? A(Qe, Ft, Ye)
                ? "l"
                : "r"
              : A(Qe, Ft, Ye)
                ? "r"
                : "d",
      },
    },
    _e = [
      ["#ffc8e8", "#ff9ad5"],
      ["#fff2b8", "#ffe28a"],
      ["#d0ffe4", "#9cffc4"],
      ["#c4ecff", "#8ad8ff"],
      ["#e4d4ff", "#c7a2ff"],
    ];
  ((de.chroma = {
    pal: {
      k: b,
      ...Object.fromEntries(
        _e.flatMap(([ee, rt], Qe) => [
          ["ABCDE"[Qe], ee],
          ["abcde"[Qe], rt],
        ]),
      ),
    },
    paint: (ee, rt) => {
      const Qe = Math.floor(rt * _e.length) % _e.length;
      return ee === 1 ? "ABCDE"[Qe] : "abcde"[Qe];
    },
  }),
    (de.tower = {
      pal: { k: b, w: "#ffffff", h: "#6cd0ff", m: "#0a84ff", d: "#0050ff" },
      paint: (ee, rt, Qe, Ft, Ye) =>
        ee === 1 && Math.abs(Qe + Ft + 1 - Ye) < 2
          ? "w"
          : ee === 1
            ? A(Qe, Ft, Ye)
              ? "h"
              : "m"
            : A(Qe, Ft, Ye)
              ? "m"
              : "d",
    }),
    (de.towerElite = de.tower),
    (de.tower50 = de.tower),
    (de.tower100 = de.tower),
    (de.tower150 = de.tower));
  const Re = (ee, rt, Qe, Ft) => ({
    pal: { k: b, A: ee, a: rt, B: Qe, b: Ft, W: "#ffffff", w: "#d8dce8" },
    paint: (Ye, bt, Yt, wa) => {
      const pa = (Yt + wa) % 12;
      return pa < 4
        ? Ye === 1
          ? "A"
          : "a"
        : pa < 6 || pa > 9
          ? Ye === 1
            ? "W"
            : "w"
          : Ye === 1
            ? "B"
            : "b";
    },
  });
  ((de.candy50 = Re("#62d574", "#3a9a4a", "#9fff9c", "#62c860")),
    (de.candy100 = Re("#fab875", "#c8803a", "#ee7bbe", "#b84a8a")),
    (de.candy150 = Re("#7b94ee", "#4a5ec0", "#ffd965", "#c8a030")),
    (de.friends = {
      pal: { k: b, l: "#e2f7a8", g: "#9ccc3a", d: "#4f7a12" },
      paint: (ee, rt, Qe, Ft, Ye) => (ee === 1 ? (A(Qe, Ft, Ye) ? "l" : "g") : A(Qe, Ft, Ye) ? "g" : "d"),
    }));
  const dt = (ee, rt, Qe, Ft) =>
    (ee < rt / 2 ? "P" : "C") == "P"
      ? Qe === 1
        ? Ft
          ? "Q"
          : "P"
        : Ft
          ? "P"
          : "p"
      : Qe === 1
        ? Ft
          ? "D"
          : "C"
        : Ft
          ? "C"
          : "c";
  de.trade = {
    pal: { k: b, Q: "#c48af0", P: "#9d4edd", p: "#6a2aa8", D: "#9ae4ff", C: "#3fc1ff", c: "#1a88c0" },
    paint: (ee, rt, Qe, Ft, Ye) => dt(Qe, Ye, ee, A(Qe, Ft, Ye)),
  };
  const qe = (ee, rt, Qe, Ft) => ({
    r: Ft,
    pal: { k: b, l: ee, m: rt, d: Qe },
    paint: (Ye, bt, Yt, wa, pa) => (Ye === 1 ? (A(Yt, wa, pa) ? "l" : "m") : A(Yt, wa, pa) ? "m" : "d"),
  });
  ((de.casino = qe("#ff9a4a", "#b0301a", "#5a1208", [0.2, 0.2])),
    (de.pokedex = qe("#ff7a7e", "#e3353b", "#8a1a20", [0.06, 0.22])),
    (de.league = {
      pal: { k: b, W: "#fff6c8", l: "#ffe066", m: "#e0a800", d: "#7a4d00" },
      paint: (ee, rt, Qe, Ft, Ye) =>
        ee === 1 && Math.abs(Qe + Ft + 1 - Ye) < 2
          ? "W"
          : ee === 1
            ? A(Qe, Ft, Ye)
              ? "l"
              : "m"
            : A(Qe, Ft, Ye)
              ? "m"
              : "d",
    }),
    (de.rocket = {
      r: [0.06, 0.36],
      pal: { k: b, G: "#6a6a78", g: "#3a3a44", s: "#24242c", R: "#e3353b", r: "#8a1a20" },
      paint: (ee, rt, Qe, Ft, Ye) =>
        Ft / Ye < 0.46 ? (ee === 1 ? (A(Qe, Ft, Ye) ? "G" : "g") : "s") : ee === 1 ? "R" : "r",
    }),
    (de.pension.r = [0.22, 0.36]),
    (de.arceus = {
      pal: { k: b, W: "#fff6c8", l: "#ffe066", m: "#e0a820", o: "#b88400", d: "#8a5a10" },
      paint: (ee, rt, Qe, Ft, Ye) =>
        ee === 1 && Math.abs(Qe + Ft + 1 - Ye) < 2
          ? "W"
          : ee === 1
            ? A(Qe, Ft, Ye)
              ? "l"
              : "m"
            : A(Qe, Ft, Ye)
              ? "o"
              : "d",
    }),
    (de.honey = {
      r: [0.2, 0.36],
      pal: { k: b, Y: "#ffe08a", y: "#ffb81c", o: "#c88a1a", B: "#8a5a2a", b: "#4a2a10" },
      paint: (ee, rt, Qe, Ft, Ye) => {
        const bt = Ft / Ye;
        return bt < 0.3 ? (ee === 1 ? "Y" : "y") : bt < 0.6 ? (ee === 1 ? "y" : "o") : ee === 1 ? "B" : "b";
      },
    }),
    (de.leagueSinnoh = {
      pal: { k: b, W: "#ffffff", l: "#d8dce4", m: "#9a9eaa", d: "#3a3a44" },
      paint: (ee, rt, Qe, Ft, Ye) =>
        ee === 1 && Math.abs(Qe + Ft + 1 - Ye) < 2
          ? "W"
          : ee === 1
            ? A(Qe, Ft, Ye)
              ? "l"
              : "m"
            : A(Qe, Ft, Ye)
              ? "m"
              : "d",
    }),
    (de["league-sinnoh"] = de.leagueSinnoh),
    (de.spear = {
      pal: { k: b, A: "#a8c8f0", a: "#6a9ad8", D: "#2a4a8a", P: "#ffd0e8", p: "#f0a0cc", Q: "#a85088" },
      paint: (ee, rt, Qe, Ft, Ye) =>
        Qe < Ye / 2
          ? ee === 1
            ? A(Qe, Ft, Ye)
              ? "A"
              : "a"
            : A(Qe, Ft, Ye)
              ? "a"
              : "D"
          : ee === 1
            ? A(Qe, Ft, Ye)
              ? "P"
              : "p"
            : A(Qe, Ft, Ye)
              ? "p"
              : "Q",
    }));
  const ce = ["0", "1", "2", "3"];
  ((de.vein = {
    r: [0.1, 0.18],
    pal: {
      k: b,
      l: "#a89880",
      m: "#5a4a3a",
      d: "#2a2018",
      0: "#c8d0e0",
      1: "#4a8ff0",
      2: "#38d0e8",
      3: "#ffcb05",
    },
    paint: (ee, rt, Qe, Ft, Ye) =>
      ee === 1 && (Qe * 5 + Ft * 7) % 23 === 0
        ? ce[(Qe + Ft) % 4]
        : ee === 1
          ? A(Qe, Ft, Ye)
            ? "l"
            : "m"
          : A(Qe, Ft, Ye)
            ? "m"
            : "d",
  }),
    (de.polish = {
      pal: { k: b, l: "#a84850", m: "#6a1c24", d: "#3a0c12", y: "#d8b070" },
      paint: (ee, rt, Qe, Ft, Ye) =>
        ee === 1 ? (A(Qe, Ft, Ye) ? "l" : "m") : (Qe + Ft) % 3 === 0 ? "y" : "d",
    }),
    (de.skypillar = qe("#e0d8c0", "#b8b098", "#7a7460", [0.06, 0.1])),
    (de.lakes = qe("#bfe8ff", "#3a90d0", "#1a4a80")),
    (de.distortion = {
      r: [0.2, 0.36],
      pal: { k: b, V: "#b88af0", v: "#9a5ae0", G: "#5ad888", g: "#3aa860", d: "#2a2a3a" },
      paint: (ee, rt) => {
        const Qe = Math.round(rt * 4) % 4;
        return Qe === 0 ? (ee === 1 ? "V" : "v") : Qe === 2 ? (ee === 1 ? "G" : "g") : "d";
      },
    }),
    (de.galactic = {
      r: [0.06, 0.36],
      pal: { k: b, G: "#c8d0d8", g: "#6a7480", s: "#3a4048", T: "#3aa8b0", t: "#1f5a60" },
      paint: (ee, rt, Qe, Ft, Ye) =>
        Ft / Ye < 0.46 ? (ee === 1 ? (A(Qe, Ft, Ye) ? "G" : "g") : "s") : ee === 1 ? "T" : "t",
    }),
    (de.moon = {
      pal: {
        k: b,
        Y: "#ffe08a",
        y: "#c8a040",
        B: "#4a5ab8",
        b: "#2a3a8a",
        N: "#1a2050",
        n: "#10142e",
        s: "#3a3a4a",
        w: "#ffffff",
      },
      paint: (ee, rt, Qe, Ft, Ye) => {
        const bt = (Qe + Ft) / (2 * Ye);
        return ee === 1 && bt > 0.4 && (Qe * 7 + Ft * 11) % 23 === 0
          ? "w"
          : bt < 0.2
            ? ee === 1
              ? "Y"
              : "y"
            : bt < 0.5
              ? ee === 1
                ? "B"
                : "b"
              : bt < 0.82
                ? ee === 1
                  ? "N"
                  : "n"
                : "s";
      },
    }),
    (de.unown = {
      r: [0.08, 0.36],
      pal: { k: b, l: "#f0dca8", m: "#b08a48", d: "#5a3a18" },
      paint: (ee, rt, Qe, Ft, Ye) =>
        ee === 1 && (Qe * 5 + Ft * 3) % 17 === 0
          ? "d"
          : ee === 1
            ? A(Qe, Ft, Ye)
              ? "l"
              : "m"
            : A(Qe, Ft, Ye)
              ? "m"
              : "d",
    }));
  const tt = [
    ["Y", "y", 0.22],
    ["R", "r", 0.36],
    ["B", "b", 0.62],
    ["V", "v", 0.8],
    ["Y", "y", 1],
  ];
  ((de.beasts = {
    pal: {
      k: b,
      Y: "#ffe066",
      y: "#d8a800",
      R: "#ff7a4a",
      r: "#c03a1a",
      B: "#7ad8f0",
      b: "#2a6aa8",
      V: "#a88ad8",
      v: "#5a3a90",
    },
    paint: (ee, rt) => {
      const Qe = (rt + 0.125) % 1,
        Ft = tt.find(([, , Ye]) => Qe < Ye);
      return ee === 1 ? Ft[0] : Ft[1];
    },
  }),
    (de.hooh = {
      pal: { k: b, G: "#fff2a8", g: "#e0a020", o: "#a86e00", S: "#f4f6fb", s: "#c8d0e0", d: "#8a96b0" },
      paint: (ee, rt, Qe, Ft, Ye) =>
        (Qe * 0.34 + Ft * 0.94) / Ye < 0.64
          ? ee === 1
            ? A(Qe, Ft, Ye)
              ? "G"
              : "g"
            : "o"
          : ee === 1
            ? "S"
            : A(Qe, Ft, Ye)
              ? "s"
              : "d",
    }),
    (de.castform = qe("#d8f2ff", "#4aa8e8", "#2a5a9a", [0.22, 0.36])),
    (de.regis = {
      r: [0.06, 0.14],
      pal: { k: b, l: "#d0c8b8", m: "#7a7468", d: "#3a3a44" },
      paint: (ee, rt, Qe, Ft, Ye) =>
        ee === 1 && (Qe * 7 + Ft * 3) % 19 === 0
          ? "d"
          : ee === 1
            ? A(Qe, Ft, Ye)
              ? "l"
              : "m"
            : A(Qe, Ft, Ye)
              ? "m"
              : "d",
    }));
  const mt = (ee, rt) =>
    Object.defineProperty(ue, ee, {
      configurable: !0,
      enumerable: !0,
      get() {
        const Qe = rt();
        return (
          Object.defineProperty(ue, ee, { value: Qe, writable: !0, configurable: !0, enumerable: !0 }),
          Qe
        );
      },
    });
  for (const [ee, rt] of Object.entries(de))
    for (const [Qe, Ft] of [
      [38, ""],
      [50, "w"],
    ])
      mt(`ring_${ee}${Ft}`, () => ({ pal: rt.pal, rows: Z(Qe, rt.paint, rt.r) }));
  const Te = 16,
    At = {
      trade: { t: 2.6 },
      unown: { n: 3, c: "#fff4d2ee", t: 6 },
      lakes: { n: 3, c: ["#ffd84a", "#ff8ac8", "#ff4a4a"], t: 5 },
      distortion: { t: 7, c: "#d8b8ffee" },
      arceus: { n: 1, c: "#fffbe6", t: 3.5 },
    };
  function yt(ee) {
    const rt = de[ee]?.r,
      Qe = [At[ee]?.c || "#ffffffee"].flat();
    for (const [Ft, Ye] of Qe.entries())
      for (const [bt, Yt] of [
        [38, ""],
        [50, "w"],
      ])
        for (let wa = 0; wa < Te; wa++) {
          const pa = wa / Te;
          mt(`gl_${ee}_${Ft}_${wa}${Yt}`, () => ({
            pal: { W: Ye },
            rows: Z(
              bt,
              (Gt, N) => (Math.min(Math.abs(N - pa), 1 - Math.abs(N - pa)) < 0.022 ? "W" : "."),
              rt,
            ).map((Gt) => Gt.replace(/k/g, ".")),
          }));
        }
  }
  const he = (ee, rt) => {
      const Qe = At[ee]?.n || 2;
      return {
        dur: At[ee]?.t || 3.2,
        frames: Array.from({ length: Te }, (Ft, Ye) => [
          1,
          Array.from({ length: Qe }, (bt, Yt) => [
            `gl_${ee}_${Array.isArray(At[ee]?.c) ? Yt : 0}_${(Ye + Math.round((Yt * Te) / Qe)) % Te}${rt}`,
            "tl",
            -1,
            -1,
            1,
          ]),
        ]),
      };
    },
    fe = (ee) => {
      const rt = {};
      ee.rows.forEach((bt, Yt) => {
        for (let wa = 0; wa < bt.length;) {
          const pa = bt[wa];
          let Gt = wa + 1;
          for (; Gt < bt.length && bt[Gt] === pa;) Gt++;
          (ee.pal[pa] && (rt[ee.pal[pa]] ||= []).push(`M${wa} ${Yt}h${Gt - wa}v1.02h-${Gt - wa}z`),
            (wa = Gt));
        }
      });
      const Qe = Math.max(...ee.rows.map((bt) => bt.length)),
        Ft = ee.rows.length,
        Ye = Object.entries(rt)
          .map(([bt, Yt]) => `<path fill='${bt}' d='${Yt.join("")}'/>`)
          .join("");
      return {
        url: `url("data:image/svg+xml,${encodeURIComponent(`<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 ${Qe} ${Ft}' shape-rendering='crispEdges'>${Ye}</svg>`)}")`,
        w: Qe,
        h: Ft,
      };
    },
    Oe = [],
    Ee = {},
    et = (ee) =>
      (Ee[ee] ||= ue[ee].src
        ? { url: `url("${ue[ee].src}")`, w: ue[ee].w, h: ue[ee].h }
        : ((rt) => (Oe.push(`--fx${Oe.length}: ${rt.url};`), { ...rt, url: `var(--fx${Oe.length - 1})` }))(
            fe(ue[ee]),
          )),
    _ = (ee) => `calc(var(--fp) * ${ee})`,
    we = 1.35,
    ie = new Set(["vine", "hinge", "badges", "badgesDp", "honey", "sprig"]),
    U = (ee, rt) => {
      const Qe = [rt, "tl", -1, -1, 1];
      return ee
        ? Array.isArray(ee)
          ? [...ee, Qe]
          : { ...ee, frames: ee.frames.map(([Ft, Ye]) => [Ft, [...Ye, Qe]]) }
        : [Qe];
    };
  function Ne([ee, rt, Qe = 0, Ft = 0, Ye], bt = 3) {
    const { url: Yt, w: wa, h: pa } = et(ee),
      Gt = Ye ?? (ie.has(ee) ? 1 : we),
      N = `calc(${wa * Gt} * var(--fp)) calc(${pa * Gt} * var(--fp))`,
      W =
        rt[1] === "l"
          ? `left ${_(bt + Qe)}`
          : rt[1] === "r"
            ? `right ${_(bt + Qe)}`
            : `left calc(50% + ${Qe} * var(--fp))`,
      ze =
        rt[0] === "t"
          ? `top ${_(bt + Ft)}`
          : rt[0] === "b"
            ? `bottom ${_(bt + Ft)}`
            : `top calc(50% + ${Ft} * var(--fp))`;
    return `${Yt} ${W} ${ze} / ${N} no-repeat`;
  }
  const T = (ee, rt) => (ee.length ? ee.map((Qe) => Ne(Qe, rt)).join(", ") : "none");
  function L(ee, rt, Qe, Ft = 3) {
    if (!Qe) return "";
    if (Array.isArray(Qe)) return `${ee} { background: ${T(Qe, Ft)}; }`;
    const Ye = Qe.frames.reduce((wa, pa) => wa + pa[0], 0);
    let bt = 0;
    const Yt = Qe.frames
      .map(([wa, pa]) => {
        const Gt = `${((bt / Ye) * 100).toFixed(2)}% { background: ${T(pa, Ft)}; }`;
        return ((bt += wa), Gt);
      })
      .join(" ");
    return `@keyframes ${rt} { ${Yt} 100% { background: ${T(Qe.frames[0][1], Ft)}; } }
${ee} { background: ${T(Qe.frames[0][1], Ft)}; animation: ${rt} ${Qe.dur}s step-end infinite; }`;
  }
  const R = (ee) =>
      ee.map(([rt, Qe]) => {
        const Ft = -2 + ((7 - Qe) * we) / 2;
        return [`spark${Qe}`, rt, Ft, Ft];
      }),
    te = (ee, rt) => [`coin${ee}`, "br", -1 + ((7 - rt) * we) / 2, -1],
    K = [
      ["tl", 7, -1],
      ["tc", 0, -1],
      ["tr", 7, -1],
      ["ml", -1, 0],
      ["mr", -1, 0],
      ["bc", 4, -1],
      ["br", 10, -1],
    ],
    He = (ee) => K.map(([rt, Qe, Ft], Ye) => [Ye % 2 === ee ? "bulbOn" : "bulbOff", rt, Qe, Ft]),
    m = [
      { id: "base", name: "Standard", px: !0 },
      { id: "pokeball", name: "Poké Ball", px: !0, a: [["pokeballHD", "br", -2, -2, 1.1]] },
      { id: "master", name: "Master Ball", tint: !0, px: !0, a: [["masterHD", "br", -2, -2, 1.1]] },
      {
        id: "pension",
        name: "Pension",
        tint: !0,
        px: !0,
        a: [
          ["nest", "br", -2, -1],
          ["vine", "bl", 9, -1],
          ["flower", "tl", -1, -1],
          ["sprig", "tl", 4, -1],
        ],
        b: {
          dur: 3.2,
          frames: [
            [10, [["egg", "br", 0, 0]]],
            [1, [["egg", "br", 1, 0]]],
            [1, [["egg", "br", 0, 0]]],
            [1, [["egg", "br", -1, 0]]],
            [1, [["egg", "br", 0, 0]]],
            [1, [["egg", "br", 1, 0]]],
          ],
        },
      },
      {
        id: "raid",
        name: "Raids Chroma",
        px: !0,
        a: [
          ["gem", "tl", -2, -2],
          ["gem", "tr", -2, -2],
        ],
        b: {
          dur: 2.6,
          frames: [
            [8, [["charm", "br", -1, -1]]],
            [1, [["charmGlint", "br", -1, -1]]],
            [1, [["charm", "br", -1, -1]]],
            [1, [["charmGlint", "br", -1, -1]]],
          ],
        },
      },
      {
        id: "chroma",
        name: "Chromatique",
        spin: !0,
        px: !0,
        b: {
          dur: 1.8,
          frames: [
            [
              1,
              R([
                ["tl", 7],
                ["tr", 3],
                ["br", 5],
              ]),
            ],
            [
              1,
              R([
                ["tl", 5],
                ["tr", 7],
                ["br", 3],
              ]),
            ],
            [
              1,
              R([
                ["tl", 3],
                ["tr", 5],
                ["br", 7],
              ]),
            ],
          ],
        },
      },
      { id: "tower", name: "Tour de Combat", px: !0, a: [["chevron", "tc", 0, -2, 1.15]] },
      {
        id: "towerElite",
        name: "Élite de la Tour",
        spin: !0,
        px: !0,
        a: [
          ["chevronGold", "tc", 0, -2, 1.15],
          ["clamp", "ml", -1, 0, 1.15],
          ["clamp", "mr", -1, 0, 1.15],
        ],
      },
      {
        id: "tower50",
        name: "Étage 50",
        px: !0,
        a: [
          ["towerIcon", "tr", -2, -2, 1.1],
          ["plate50", "bc", 0, -2, 1],
        ],
      },
      {
        id: "tower100",
        name: "Étage 100",
        px: !0,
        a: [
          ["towerIcon", "tr", -2, -2, 1.1],
          ["plate100", "bc", 0, -2, 1],
        ],
        b: {
          dur: 3,
          frames: [
            [8, []],
            [1, R([["tl", 5]])],
            [1, R([["tl", 3]])],
          ],
        },
      },
      {
        id: "tower150",
        name: "Étage 150",
        spin: !0,
        px: !0,
        a: [
          ["towerIcon", "tr", -2, -2, 1.1],
          ["plate150", "bc", 0, -2, 1],
        ],
        b: {
          dur: 2.4,
          frames: [
            [2, [["beacon", "tr", -2, -2, 1.1]]],
            [1, []],
            [2, [["beacon", "tr", -2, -2, 1.1], ...R([["tl", 5]])]],
            [1, R([["tl", 3]])],
          ],
        },
      },
      { id: "candy50", name: "Papillote", tint: !0, px: !0, a: [["candyS", "br", -2, -2, 0.55]] },
      {
        id: "candy100",
        name: "Bonbonnière",
        tint: !0,
        px: !0,
        a: [
          ["candyMm", "bl", -2, -2, 0.55],
          ["candyXL", "br", -2, -2, 0.55],
        ],
      },
      {
        id: "candy150",
        name: "Super Bonbon",
        tint: !0,
        spin: !0,
        px: !0,
        a: [
          ["candySB", "br", -2, -2, 0.6],
          ["candyBigm", "bl", -2, -2, 0.55],
          ["candyBig", "tl", -2, -2, 0.55],
        ],
        b: {
          dur: 2.6,
          frames: [
            [2, R([["tr", 5]])],
            [1, []],
            [2, R([["tr", 3]])],
            [3, []],
          ],
        },
      },
      {
        id: "friends",
        name: "Amis",
        tint: !0,
        px: !0,
        a: [["friendball9", "br", -2, -2]],
        b: {
          dur: 2.8,
          frames: [
            [1, [["heart", "br", 0, 10]]],
            [1, [["heart", "br", -1, 12]]],
            [1, [["heart", "br", 0, 14]]],
            [1, [["heart", "br", -1, 16]]],
            [5, []],
          ],
        },
      },
      {
        id: "trade",
        name: "Échanges",
        tint: !0,
        spin: !0,
        px: !0,
        a: [
          ["joint", "tc", 0, -1, 1.15],
          ["joint", "bc", 0, -1, 1.15],
        ],
      },
      {
        id: "casino",
        name: "Casino",
        tint: !0,
        px: !0,
        a: {
          dur: 0.9,
          frames: [
            [1, He(0)],
            [1, He(1)],
          ],
        },
        b: {
          dur: 2.2,
          frames: [
            [6, [te(1, 7)]],
            [1, [te(2, 5)]],
            [1, [te(3, 3)]],
            [1, [te(4, 1)]],
            [1, [te(3, 3)]],
            [1, [te(2, 5)]],
          ],
        },
      },
      {
        id: "pokedex",
        name: "Pokédex",
        tint: !0,
        px: !0,
        a: [
          ["hinge", "ml", -2, 2],
          ["lens", "tl", -1, -1, 1.15],
        ],
        b: {
          dur: 1.5,
          frames: [
            [1, [["led0", "tl", 8, -1, 1]]],
            [1, [["led1", "tl", 8, -1, 1]]],
            [1, [["led2", "tl", 8, -1, 1]]],
          ],
        },
      },
      {
        id: "league",
        name: "Ligue",
        px: !0,
        a: [
          ["crown", "tc", 0, -3],
          ["badges", "bc", 0, -1],
        ],
      },
      { id: "rocket", name: "Team Rocket", tint: !0, px: !0, a: [["rocket9", "br", -2, -2, 1.15]] },
      {
        id: "unown",
        name: "Zarbi",
        tint: !0,
        spin: !0,
        px: !0,
        a: [
          ["unownA", "tl", -2, -2, 1],
          ["unownQ", "tr", -2, -2, 1],
          ["unownZ", "br", -2, -2, 1],
        ],
      },
      {
        id: "beasts",
        name: "Bêtes légendaires",
        px: !0,
        a: [
          ["bolt", "tl", -1, -2],
          ["flame", "tr", -1, -2],
          ["crystal", "br", -1, -2],
        ],
        b: {
          dur: 3.6,
          frames: [
            [2, R([["tl", 5]])],
            [1, []],
            [2, R([["tr", 5]])],
            [1, []],
            [2, R([["br", 5]])],
            [4, []],
          ],
        },
      },
      {
        id: "hooh",
        name: "Ho-Oh et Lugia",
        tint: !0,
        px: !0,
        a: [
          ["rainbowWing", "tl", -2, -2],
          ["silverWing", "br", -2, -2],
        ],
        b: {
          dur: 3.2,
          frames: [
            [6, []],
            [1, R([["tl", 5]])],
            [1, R([["tl", 3]])],
            [6, []],
            [1, R([["br", 5]])],
            [1, R([["br", 3]])],
          ],
        },
      },
      {
        id: "castform",
        name: "Morphéo",
        tint: !0,
        px: !0,
        a: [["cloud", "bc", 0, -2]],
        b: {
          dur: 4.5,
          frames: [
            [1, [["sun", "tc", 0, -3]]],
            [1, [["drop", "tc", 0, -3]]],
            [1, [["flake", "tc", 0, -3]]],
          ],
        },
      },
      {
        id: "regis",
        name: "Regis",
        tint: !0,
        px: !0,
        a: [
          ["regi_rock", "tl", -2, -2, 1],
          ["regi_ice", "tr", -2, -2, 1],
          ["regi_steel", "br", -2, -2, 1],
        ],
        b: {
          dur: 3.3,
          frames: [
            [2, [["regiLit_rock", "tl", -2, -2, 1]]],
            [1, []],
            [2, [["regiLit_ice", "tr", -2, -2, 1]]],
            [1, []],
            [2, [["regiLit_steel", "br", -2, -2, 1]]],
            [3, []],
          ],
        },
      },
      {
        id: "skypillar",
        name: "Pilier Céleste",
        px: !0,
        a: [
          ["cloudsHigh", "tc", 0, 0, 1],
          ["cloudsLow", "bc", 0, -1, 1],
          ["column", "bl", -1, -1, 1],
          ["column", "br", -1, -1, 1],
        ],
      },
      { id: "lakes", name: "Lacs", tint: !0, spin: !0, px: !0, a: [["trio", "tc", 0, -3]] },
      {
        id: "distortion",
        name: "Distorsion",
        tint: !0,
        spin: !0,
        px: !0,
        a: [["griseous", "br", -2, -2, 1.15]],
      },
      { id: "galactic", name: "Team Galaxie", tint: !0, px: !0, a: [["galactic9", "br", -2, -2, 1.15]] },
      {
        id: "moon",
        name: "Lune",
        tint: !0,
        px: !0,
        a: [
          ["moonGold", "tl", -2, -2],
          ["moonDark", "br", -2, -2],
        ],
        b: {
          dur: 2.4,
          frames: [
            [1, R([["tr", 3]])],
            [1, R([["tr", 5]])],
            [1, R([["bl", 3]])],
            [1, R([["bl", 5]])],
            [2, []],
          ],
        },
      },
      {
        id: "honey",
        name: "Arbre à Miel",
        tint: !0,
        px: !0,
        a: [
          ["honey", "tc", 0, -1, 1],
          ["combee", "br", -2, -2],
        ],
        b: {
          dur: 3,
          frames: [
            [3, [["drop1", "tc", 3, 3]]],
            [2, [["drop2", "tc", 3, 3]]],
            [2, [["drop3", "tc", 3, 3]]],
            [3, [["drop4", "tc", 3, 3]]],
            [1, [["dropFall", "tc", 3, 3]]],
            [2, []],
          ],
        },
      },
      {
        id: "league-sinnoh",
        name: "Ligue de Sinnoh",
        px: !0,
        a: [
          ["crown", "tc", 0, -3],
          ["badgesDp", "bc", 0, -1],
        ],
      },
      {
        id: "spear",
        name: "Colonnes Lances",
        px: !0,
        a: [
          ["adamant", "bl", -2, -2],
          ["lustrous", "br", -2, -2],
        ],
      },
      {
        id: "arceus",
        name: "Arceus au complet",
        tint: !0,
        spin: !0,
        px: !0,
        m: 6,
        b: {
          dur: 16 * 0.45,
          frames: x.map((ee, rt) => [
            1,
            [
              [`spurN${rt}`, "tc", 0, -6, 1],
              [`spurS${rt}`, "bc", 0, -6, 1],
              [`spurW${rt}`, "ml", -6, 0, 1],
              [`spurE${rt}`, "mr", -6, 0, 1],
              ...(rt % 4 === 0 ? R([["tr", 5]]) : rt % 4 === 2 ? R([["bl", 5]]) : []),
            ],
          ]),
        },
      },
      {
        id: "polish",
        name: "Faut que ça biche",
        tint: !0,
        px: !0,
        m: 6,
        b: {
          dur: 8 * 0.45,
          frames: P.map((ee, rt) => [
            1,
            P.map((Qe, Ft) => [
              (Ft === rt ? "bgemLit" : "bgem") + Ft,
              Ft < 4 ? "tc" : "bc",
              -17 + (Ft % 4) * 11,
              -3,
              1.2,
            ]),
          ]),
        },
      },
      {
        id: "vein",
        name: "Filon de gemmes",
        tint: !0,
        px: !0,
        a: [
          ["gemC", "tl", -2, -2],
          ["gemU", "tr", -2, -2],
          ["gemR", "bl", -2, -2],
          ["gemL", "br", -2, -2],
        ],
        b: {
          dur: 3.6,
          frames: [
            [2, R([["tl", 5]])],
            [1, []],
            [2, R([["tr", 5]])],
            [1, []],
            [2, R([["bl", 5]])],
            [1, []],
            [2, R([["br", 5]])],
            [3, []],
          ],
        },
      },
    ],
    z = t.EliteFrames;
  z && m.push(...z.list);
  const pe = Object.fromEntries(m.map((ee) => [ee.id, ee])),
    V = (ee) => {
      let rt = "";
      const Qe = ee.m ?? 3,
        Ft = `.tr-face[data-frame="${ee.id}"] > .fr`;
      if (
        (Qe !== 3 &&
          (rt += `${Ft} { inset: ${_(-Qe)}; } ${Ft}::before { inset: calc(var(--fp) * ${Qe} + var(--bw)); }
`),
        ee.px && de[ee.id])
      ) {
        const Ye = `.tr-face[data-frame="${ee.id}"]:not(.fr-old)`;
        return (
          (rt += `${Ye} { --ring: none; --inner: none; box-shadow: none; }
`),
          (rt +=
            L(`${Ye} > .fr`, `frA-${ee.id}`, U(ee.a, "ring_" + ee.id), Qe) +
            `
` +
            L(`.tc-fbig${Ye} > .fr`, `frAw-${ee.id}`, U(ee.a, "ring_" + ee.id + "w"), Qe) +
            `
`),
          ee.a &&
            (rt +=
              L(`.tr-face.fr-old[data-frame="${ee.id}"] > .fr`, `frAo-${ee.id}`, ee.a, Qe) +
              `
`),
          (rt +=
            L(`${Ft}::after`, `frB-${ee.id}`, ee.b, Qe) +
            `
`),
          ee.spin &&
            (yt(ee.id),
            (rt += `${Ye} > .fr-ring { display: none; }
${Ye} > .fr::before { inset: 0; padding: 0; border-radius: 0; -webkit-mask: none; mask: none; }
`),
            (rt +=
              L(`${Ye} > .fr::before`, `frG-${ee.id}`, he(ee.id, ""), Qe) +
              `
` +
              L(`.tc-fbig${Ye} > .fr::before`, `frGw-${ee.id}`, he(ee.id, "w"), Qe) +
              `
`)),
          rt
        );
      }
      return (
        rt +
        L(Ft, `frA-${ee.id}`, ee.a, Qe) +
        `
` +
        L(`${Ft}::after`, `frB-${ee.id}`, ee.b, Qe) +
        `
`
      );
    },
    lt = document.createElement("style");
  ((lt.textContent = `@media (prefers-reduced-motion: reduce) { .tr-face > .fr::before { animation: none !important; } }
body.calm .tr-face > .fr::before { animation: none; }
`),
    document.head.append(lt));
  const kt = new Set();
  let ra = 0;
  function Vt(ee) {
    if (kt.has(ee) || !pe[ee]) return;
    kt.add(ee);
    const rt = V(pe[ee]),
      Qe = Oe.slice(ra).join(" ");
    ((ra = Oe.length),
      lt.append(
        document.createTextNode(
          (Qe
            ? `:root { ${Qe} }
`
            : "") + rt,
        ),
      ));
  }
  const Xt = new Set(),
    Ht =
      t.IntersectionObserver &&
      new IntersectionObserver((ee) => {
        for (const rt of ee)
          (rt.target.classList.toggle("on", rt.isIntersecting),
            rt.target.isConnected || (Ht.unobserve(rt.target), Xt.delete(rt.target)));
      });
  document.addEventListener("animationstart", (ee) => {
    if (!(ee.animationName !== "frSeen" || !Ht || Xt.has(ee.target))) {
      for (const rt of Xt) rt.isConnected || (Ht.unobserve(rt), Xt.delete(rt));
      (Xt.add(ee.target), Ht.observe(ee.target));
    }
  });
  const ct = () => a().S,
    wt = () => ct().trainer,
    ge = (ee, rt) => [Math.min(ee || 0, rt), rt],
    Fe = (ee) => [ee.filter((rt) => ct().dex[rt]).length, ee.length],
    gt = () => Math.max(ct().tower?.top || 0, ct().tower?.best?.floor || 0),
    Dt = {
      base: { free: !0 },
      pokeball: { free: !0 },
      master: { admin: !0 },
      pension: { hint: "Fais éclore 100 œufs.", prog: () => ge(ct().stats.hatched, 100) },
      raid: { hint: "Remporte 50 raids chromatiques.", prog: () => ge(ct().raids?.clears, 50) },
      chroma: {
        hint: "Possède 50 Pokémon chromatiques.",
        prog: () =>
          ge(
            a()
              .ownedMons()
              .filter((ee) => ee.shiny).length,
            50,
          ),
      },
      tower: {
        hint: "Franchis l'étage 90 de la Tour de Combat en une semaine.",
        hidden: () => !t.Tower?.unlocked(),
        prog: () => [0, 1],
      },
      towerElite: {
        hint: "Franchis l'étage 100 de la Tour de Combat en une semaine.",
        hidden: () => !t.Tower?.unlocked(),
        prog: () => [0, 1],
      },
      tower50: {
        hint: "Franchis l'étage 50 de la Tour de Combat.",
        hidden: () => !t.Tower?.unlocked(),
        prog: () => ge(gt(), 50),
      },
      tower100: {
        hint: "Franchis l'étage 100 de la Tour de Combat.",
        hidden: () => !t.Tower?.unlocked(),
        prog: () => ge(gt(), 100),
      },
      tower150: {
        hint: "Franchis l'étage 150 de la Tour de Combat.",
        hidden: () => !t.Tower?.unlocked(),
        prog: () => ge(gt(), 150),
      },
      candy50: {
        hint: "Franchis l'étage 20 de la Fabrique de Bonbons.",
        hidden: () => !t.CandyRun?.unlocked() && !t.CandyRun?.kept("candy50"),
        prog: () => ge(t.CandyRun?.kept("candy50") ? 20 : t.CandyRun?.best() || 0, 20),
      },
      candy100: {
        hint: "Franchis l'étage 40 de la Fabrique de Bonbons.",
        hidden: () => !t.CandyRun?.unlocked() && !t.CandyRun?.kept("candy100"),
        prog: () => ge(t.CandyRun?.kept("candy100") ? 40 : t.CandyRun?.best() || 0, 40),
      },
      candy150: {
        hint: "Franchis l'étage 60 de la Fabrique de Bonbons.",
        hidden: () => !t.CandyRun?.unlocked() && !t.CandyRun?.kept("candy150"),
        prog: () => ge(t.CandyRun?.kept("candy150") ? 60 : t.CandyRun?.best() || 0, 60),
      },
      friends: {
        hint: "Aie 5 amis.",
        prog: () => ge((t.Cloud?.friends.list || []).filter((ee) => ee.status === "accepted").length, 5),
      },
      trade: { hint: "Réussis 50 échanges.", prog: () => ge(ct().stats.trades, 50) },
      casino: {
        hint: "Obtiens tous les lots du Casino de Céladopole.",
        prog: () => Fe(t.CONFIG.CASINOS[0].prizes.map((ee) => ee.id)),
      },
      pokedex: {
        hint: "Capture 250 espèces différentes.",
        prog: () => ge(Object.keys(ct().dex).filter((ee) => a().DEX[ee]).length, 250),
      },
      league: { hint: "Bats la Ligue de Kanto.", prog: () => ge(+a().regionDone("kanto"), 1) },
      rocket: {
        hint: "Bats Giovanni, le chef de la Team Rocket.",
        prog: () => ge(+(ct().adv?.badges || []).includes("Terre"), 1),
      },
      unown: { region: "johto", hint: "Capture les 28 formes de Zarbi.", prog: () => Fe(t.UNOWN.ids) },
      beasts: { region: "johto", hint: "Capture Raikou, Entei et Suicune.", prog: () => Fe([243, 244, 245]) },
      hooh: { region: "johto", hint: "Capture Ho-Oh et Lugia.", prog: () => Fe([250, 249]) },
      castform: {
        region: "hoenn",
        hint: "Obtiens les 4 formes de Morphéo.",
        prog: () => Fe([351, 35101, 35102, 35103]),
      },
      regis: {
        region: "hoenn",
        hint: "Capture Regirock, Regice et Registeel.",
        prog: () => Fe([377, 378, 379]),
      },
      skypillar: {
        region: "hoenn",
        hint: "Capture Groudon, Kyogre et Rayquaza.",
        prog: () => Fe([383, 382, 384]),
      },
      lakes: {
        region: "sinnoh",
        hint: "Capture Créhelf, Créfollet et Créfadet.",
        prog: () => Fe([480, 481, 482]),
      },
      distortion: {
        region: "sinnoh",
        hint: "Capture Giratina sous ses deux formes.",
        prog: () => Fe([487, 48701]),
      },
      galactic: {
        region: "sinnoh",
        hint: "Bats Hélio, le chef de la Team Galaxie.",
        prog: () =>
          ge(
            +(
              (ct().adv?.unlocked ?? 0) >
              t.STORY.CHAPTERS.findIndex((ee) => ee.reg === "sinnoh" && ee.name === "Monde Distorsion")
            ),
            1,
          ),
      },
      moon: { region: "sinnoh", hint: "Capture Cresselia et Darkrai.", prog: () => Fe([488, 491]) },
      honey: {
        region: "sinnoh",
        hint: "Obtiens Apireine, Cheniselle et Papilord.",
        prog: () => ge(Fe([416, 414])[0] + +[413, 41301, 41302].some((ee) => ct().dex[ee]), 3),
      },
      "league-sinnoh": {
        region: "sinnoh",
        hint: "Bats la Ligue de Sinnoh.",
        prog: () => ge(+a().regionDone("sinnoh"), 1),
      },
      vein: {
        region: "sinnoh",
        hint: "Franchis l'étage 150 du Souterrain.",
        prog: () => ge(t.Underground?.best() || 0, 150),
      },
      spear: { region: "sinnoh", hint: "Capture Dialga et Palkia.", prog: () => Fe([483, 484]) },
      polish: {
        region: "sinnoh",
        hint: "Fais étinceler les 8 badges d'une même région en même temps.",
        prog: () => ge(t.BadgeShine?.best() || 0, 8),
      },
      arceus: {
        region: "sinnoh",
        hint: "Possède Arceus sous ses 17 formes.",
        hidden: () => !ct().seen?.[493] && !ct().dex?.[493],
        prog: () => a().arceusForms(),
      },
    };
  z && Object.assign(Dt, z.locks);
  const ha = (ee) => (ct().adv?.unlocked ?? 0) >= t.STORY.firstChapterOf(ee),
    _t = (ee) => !!ee && ee[0] >= ee[1],
    Ea = () => wt().frames || (wt().frames = []);
  function ut(ee) {
    const rt = Dt[ee];
    return rt
      ? rt.free
        ? !0
        : rt.admin
          ? !!t.Cloud?.isAdmin
          : Ea().includes(ee)
            ? !0
            : rt.hidden?.() || (rt.region && !ha(rt.region)) || !_t(rt.prog?.())
              ? !1
              : (Ea().push(ee), !0)
      : !1;
  }
  const jt = (ee) => !Ea().includes(ee) && (!!Dt[ee]?.hidden?.() || (!!Dt[ee]?.region && !ha(Dt[ee].region)));
  function xt() {
    const ee = wt(),
      rt = m.filter((Qe) => !Dt[Qe.id].free && !Dt[Qe.id].admin && ut(Qe.id)).map((Qe) => Qe.id);
    return (
      ee.framesSeen || (ee.framesSeen = Object.fromEntries(rt.map((Qe) => [Qe, 1]))),
      rt.filter((Qe) => !ee.framesSeen[Qe])
    );
  }
  const D = () => {
    for (const ee of xt()) wt().framesSeen[ee] = 1;
  };
  function Q(ee, rt) {
    if (ee.eliteRegion) return rt || !jt(ee.id);
    if (!ee.elite && !ee.league) return !0;
    const Qe = ee.league ? `el-league-${ee.league}` : `el-${ee.elite}`,
      Ft = ut(`${Qe}-3`);
    return rt ? ee.tier === 5 || !ut(`${Qe}-5`) : !jt(ee.id) && (ee.tier === 3 ? !Ft : Ft);
  }
  const Y = (ee) => !!(pe[ee]?.elite || pe[ee]?.eliteRegion || pe[ee]?.league),
    ye = (ee) => (pe[ee] || (ee = "base"), z && Y(ee) ? z.ensure(ee) : Vt(ee), ee);
  return {
    LIST: m,
    LOCKS: Dt,
    open: ut,
    hidden: jt,
    fresh: xt,
    seeAll: D,
    valid: ye,
    mine: () => {
      const ee = ye(wt()?.frame);
      return ut(ee) ? ee : "base";
    },
    nameOf: (ee) => pe[ye(ee)].name,
    tile: Q,
    isElite: Y,
    tint: (ee) => !!pe[ye(ee)].tint,
    spin: (ee) => !!pe[ye(ee)].spin,
  };
})();
