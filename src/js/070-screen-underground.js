/**
 * screen underground
 *
 * Public API on the game namespace `t`: t.Screens.underground
 *
 * Recovered from the shipped bundle — original chunk #69 at byte 1868675 (53019 bytes, sha256:215ba61ca6708145).
 * This file is one original source file; the build concatenates them in filename order.
 */
(function () {
  const { $: a, $$: b, h: f, esc: ue, fmt: H, sprBox: vt, monSrc: B, sleep: se, toast: Ge, modal: Je } = t.UI,
    Ze = t.Game,
    x = t.CONFIG,
    $ = () => t.Underground,
    X = () => x.UNDERGROUND,
    Tt = matchMedia("(max-width: 640px)"),
    le = {
      flooded: { ic: "🌊", c: "#3b8fe0", tint: "rgba(30,90,180,.35)", blend: "multiply" },
      volcanic: { ic: "🌋", c: "#ff7a3a", tint: "rgba(120,20,10,.35)", blend: "multiply" },
      crystal: { ic: "💎", c: "#7fd4ff", tint: "rgba(110,200,255,.35)", blend: "color" },
      dark: { ic: "🌑", c: "#8a6ad8", tint: "transparent" },
      ancient: { ic: "🏛️", c: "#c9a24a", tint: "rgba(120,90,30,.3)", blend: "multiply" },
      galleries: { ic: "⛏️", c: "#c08a4a", tint: "transparent" },
    },
    P = (Ue) => le[Ue] || le.galleries,
    u = new Set(["flooded", "volcanic", "crystal", "dark", "ancient", "galleries"]);
  let ve = null,
    it = 0;
  const De = "pc-ug-tab";
  let je = "exp";
  try {
    const Ue = localStorage.getItem(De);
    (Ue === "geo" || Ue === "shop") && (je = Ue);
  } catch {}
  const pt = () => {
      try {
        localStorage.setItem(De, je);
      } catch {}
    },
    re = "pc-ug-from";
  let We = {};
  try {
    We = JSON.parse(localStorage.getItem(re)) || {};
  } catch {}
  const oe = (Ue) => ($().starts().includes(+We[Ue]) ? +We[Ue] : 1),
    $e = () => {
      try {
        localStorage.setItem(re, JSON.stringify(We));
      } catch {}
    },
    Z = () => !!a("#screen-underground.active"),
    A = (Ue) => "under:" + Ue,
    J = (Ue) => Ze.eventTeam(A(Ue));
  function de(Ue) {
    const Bt = $().slots(),
      st = Bt.find((Da) => Da.bay === Ue);
    if (st) return st;
    const Zt = Bt.filter(
        (Da) =>
          Da.bay == null ||
          Da.bay >= $().slotsMax() ||
          Bt.some((la) => la !== Da && la.bay === Da.bay && Bt.indexOf(la) < Bt.indexOf(Da)),
      ),
      va = Array.from({ length: $().slotsMax() }, (Da, la) => la).filter(
        (Da) => !Bt.some((la) => la.bay === Da && !Zt.includes(la)),
      );
    return Zt[va.indexOf(Ue)] || null;
  }
  function _e() {
    for (let Ue = 0; Ue < $().slotsMax(); Ue++) {
      const Bt = J(Ue);
      for (let st = Bt.length - 1; st >= 0; st--) $().today().used[Bt[st]] && Bt.splice(st, 1);
    }
  }
  const Re = (Ue) => [
      "wild",
      "wall",
      ...(X().GUARD_EVERY && Ue % X().GUARD_EVERY === 0 ? ["camp", "guard"] : []),
      "ladder",
    ],
    dt = {
      wild: ["assets/ui/tallgrass-icon.png", 18, 16, 1.5],
      wall: ["assets/ui/underground/ic-rock.svg", 14, 12, 2],
      camp: ["assets/ui/pokecenter.png", 32, 32, 0.75],
      guard: ["assets/ui/tallgrass-icon.png", 18, 16, 1.5],
      ladder: ["assets/ui/underground/ic-ladder.svg", 10, 14, 2],
    },
    qe = (Ue, Bt = 1) => {
      const [st, Zt, va, Da] = dt[Ue];
      return `<img class="ug-ic" src="${st}" alt="" style="width:${Zt * Da * Bt}px;height:${va * Da * Bt}px">`;
    },
    ce = { camp: 4e3, ladder: 1500 },
    tt = 2500,
    mt = (Ue) => $().wallMs(Ue);
  function Te(Ue, Bt, st = 3) {
    const Zt = { ...ce, wall: mt(st) },
      va = Ue.reduce((F, Ce) => F + (Zt[Ce] || 0), 0),
      Da = Ue.filter((F) => !Zt[F]),
      la = (F) => (F === "guard" ? 2 : 1),
      Xa = va ? Math.min(1, Math.max(0, Bt - tt * Da.length) / va) : 0,
      nn = Bt - va * Xa;
    return Ue.map((F) => (Zt[F] ? Zt[F] * Xa : (nn * la(F)) / Da.reduce((Ce, Xe) => Ce + la(Xe), 0)));
  }
  function At(Ue, Bt = Ze.time()) {
    const st = Ue.res,
      Zt = $().progress(Ue, Bt),
      va = st.at,
      Da = Math.min(Bt, Ue.recalled ?? Bt, Ue.end),
      la = (Da - Ue.start) / X().STEP_MS,
      Xa = Zt.ko && st.floors < X().FLOORS,
      nn =
        Zt.done && !Xa && Ue.recalled == null ? Math.max(1, st.floors) : Math.min(X().FLOORS, Zt.floor + 1),
      F = va[nn - 2] ?? 0,
      Ce = va[nn - 1] ?? Math.max(F + 1, (Ue.end - Ue.start) / X().STEP_MS),
      Xe = nn > st.floors && st.floors < X().FLOORS && !(Zt.done && Ue.recalled != null),
      Ve = st.lost || (st.gfoes[nn] ? "guard" : "wild"),
      Rt = Xe ? (Ve === "guard" ? ["wild", "camp", "guard"] : ["wild"]) : Re(nn),
      da = Math.max(1, (Ce - F) * X().STEP_MS),
      ia = Math.max(0, Math.min(da - 1, (la - F) * X().STEP_MS)),
      Ja = Te(Rt, da, Ue.team.filter((g) => (st.hp?.[g]?.[nn - 2] ?? 1) > 0).length);
    let Ia = 0,
      ka = 0;
    for (; Ia < Rt.length - 1 && ia >= ka + Ja[Ia];) ka += Ja[Ia++];
    Zt.done && (Ia = Rt.length - 1);
    const Za = Rt[Ia],
      En = Za === "guard" ? st.gfoes[nn] : Za === "wild" ? st.foes[nn - 1] : null,
      bn = Zt.done ? 1 : Ja[Ia] ? Math.min(1, (ia - ka) / Ja[Ia]) : 1,
      an = (g, E, q) => g + (E - g) * q,
      Wn = Rt.includes("guard"),
      wn = (g) => {
        if (Zt.done && Xa) return 0;
        const E = Zt.floor ? (st.hp?.[g]?.[Zt.floor - 1] ?? 1) : 1,
          q = Zt.done ? E : (st.hp?.[g]?.[nn - 1] ?? (nn > st.floors ? 0 : 1));
        if (Zt.done || !E) return E;
        const Pe = Wn ? Math.max(0.05, E * 0.85) : Math.min(E, q),
          at = (Mt) => Rt.indexOf(Mt);
        return Ia < at("wild")
          ? E
          : Ia === at("wild")
            ? an(E, Pe, bn)
            : Wn && Ia < at("camp")
              ? Pe
              : Wn && Ia === at("camp")
                ? an(Pe, 1, bn)
                : Za === "guard"
                  ? an(1, q, bn)
                  : q;
      },
      Bn = En ? an(1, Xe && Ia === Rt.length - 1 ? 0.35 : 0, bn) : 0,
      C = Ue.team.reduce((g, E) => g + ((Zt.floor && st.xp[E]?.[Zt.floor - 1]) || 0), 0);
    return {
      p: Zt,
      ko: Xa,
      floor: nn,
      nodes: Rt,
      node: Ia,
      nf: bn,
      span: Ja[Ia],
      kind: Za,
      foe: En,
      foeHp: Bn,
      hp: Object.fromEntries(Ue.team.map((g) => [g, wn(g)])),
      xp: C,
      took: Da - Ue.start,
    };
  }
  const yt = (Ue) => {
      const Bt = Math.max(0, Math.floor(Ue / 6e4));
      return Bt >= 60
        ? e("{h} h {m}", { h: Math.floor(Bt / 60), m: String(Bt % 60).padStart(2, "0") })
        : e("{n} min", { n: Bt });
    },
    he = (Ue) => ue(Ze.DEX[Ue]?.name || "");
  function fe(Ue, Bt) {
    return Bt.p.done
      ? Ue.recalled != null
        ? e("Rappelée à l'étage {n}.", { n: Bt.floor })
        : Bt.ko
          ? e("Équipe K.O. à l'étage {n}.", { n: Bt.floor })
          : e("Fond du Souterrain atteint !")
      : {
          wild: () => e("Étage {n} : {mon} sauvage.", { n: Bt.floor, mon: he(Bt.foe) }),
          wall: () => e("Étage {n} : un mur à creuser.", { n: Bt.floor }),
          camp: () => e("Campement : l'équipe se repose."),
          guard: () => e("Gardien de l'étage {n} : {mon} !", { n: Bt.floor, mon: he(Bt.foe) }),
          ladder: () => e("Une échelle vers l'étage {n}.", { n: Bt.floor + 1 }),
        }[Bt.kind]();
  }
  const Oe = [
      [40, 12],
      [27, 7],
      [14, 12],
    ],
    Ee = '<div class="mini-hp"><div class="hp"><div></div></div></div>',
    et = (Ue) => `<div class="mini-lv">${e("Nv.{n}", { n: Ue })}</div>`,
    _ = (Ue, Bt, st = "") =>
      `<div class="ally${st ? " " + st : ""}" data-uid="${Ue.uid}" style="left:${Oe[Bt][0]}%;bottom:${Oe[Bt][1]}%;z-index:${100 - Oe[Bt][1]}"><div class="wrap"><img alt="" data-src="${B(Ue.id, Ue.shiny)}">${Ee}</div>${et(Ue.level)}</div>`,
    we = (Ue, Bt, st, Zt) =>
      `<div class="enemy${Bt ? " guard" : ""}" data-id="${Ue}" data-k="${st}"><div class="wrap"><img alt="" data-src="${B(Ue, !1)}">${Ee}</div>${et(Zt)}</div>`,
    ie = (Ue, Bt, st) => `<rect x="${Ue}" y="${Bt}" width="1.02" height="1.02" fill="${st}"/>`,
    U = {
      flooded: null,
      volcanic: ["#2a1410", "#5e2a1c", "#8f4a2c", "#c27a45", "#f0b070"],
      crystal: ["#1c2638", "#3c5878", "#6a90b8", "#a6cbe8", "#e6f6ff"],
      dark: ["#17121f", "#33284a", "#54457a", "#7f6fa8", "#b7a9d8"],
      ancient: ["#2b2012", "#5a4424", "#8a6c3a", "#b9995a", "#e2cc8e"],
      galleries: ["#2b2420", "#5f554a", "#8f8372", "#b9ab98", "#ddd2c0"],
    },
    Ne = [
      [
        [0, 1],
        [0, 2],
        [-1, 3],
        [-1, 4],
        [0, 5],
      ],
      [
        [0, 6],
        [1, 7],
        [1, 8],
        [2, 8],
        [3, 7],
        [-2, 4],
        [-3, 5],
      ],
      [
        [1, 9],
        [0, 10],
        [0, 11],
        [1, 12],
        [1, 13],
        [4, 6],
        [-4, 6],
        [-5, 7],
      ],
    ],
    T = {},
    L = new Set(["flooded", "volcanic", "crystal", "dark", "ancient", "galleries"]),
    R = (Ue) =>
      new Promise((Bt, st) => {
        const Zt = new Image();
        ((Zt.onload = () => Bt(Zt)), (Zt.onerror = st), (Zt.src = Ue));
      }),
    te = (Ue) =>
      (T[Ue] ||= (L.has(Ue) ? R(`assets/ui/underground/rock-${Ue}.png`) : Promise.reject())
        .then((Bt) => Object.assign(K(Bt, null), { own: !0 }))
        .catch(() => R("assets/items/damp-rock.png").then((Bt) => K(Bt, U[Ue])))
        .catch(() => null));
  function K(Ue, Bt) {
    const st = Ue.width,
      Zt = Ue.height,
      va = document.createElement("canvas");
    ((va.width = st), (va.height = Zt));
    const Da = va.getContext("2d");
    Da.drawImage(Ue, 0, 0);
    const la = Da.getImageData(0, 0, st, Zt),
      Xa = la.data,
      nn = (g) => `${Xa[g]},${Xa[g + 1]},${Xa[g + 2]}`,
      F = (g) => g.split(",").reduce((E, q, Pe) => E + q * [0.3, 0.59, 0.11][Pe], 0),
      Ce = [];
    let Xe = st,
      Ve = 0,
      Rt = Zt,
      da = 0;
    for (let g = 0; g < Zt; g++)
      for (let E = 0; E < st; E++) {
        const q = (g * st + E) * 4;
        Xa[q + 3] < 128 ||
          (Ce.includes(nn(q)) || Ce.push(nn(q)),
          (Xe = Math.min(Xe, E)),
          (Ve = Math.max(Ve, E)),
          (Rt = Math.min(Rt, g)),
          (da = Math.max(da, g)));
      }
    Ce.sort((g, E) => F(g) - F(E));
    const ia = (g) => [1, 3, 5].map((E) => parseInt(g.slice(E, E + 2), 16));
    if (Bt)
      for (let g = 0; g < Xa.length; g += 4) {
        if (Xa[g + 3] < 128) continue;
        const E = Ce.indexOf(nn(g)),
          [q, Pe, at] = ia(Bt[Math.round((E / Math.max(1, Ce.length - 1)) * (Bt.length - 1))]);
        ((Xa[g] = q), (Xa[g + 1] = Pe), (Xa[g + 2] = at));
      }
    const Ja = new Uint8ClampedArray(Xa),
      Ia = (Xe + Ve) / 2,
      ka = (Rt + da) / 2,
      Za = Math.max(Ve - Xe, da - Rt) / 2,
      En = (da - Rt) / 16,
      bn = [
        [285, 335],
        [170, 215],
        [5, 45],
        [225, 265],
        [135, 170],
      ],
      an = (g, E, q) => {
        const Pe = ((Math.atan2(E - ka, g - Ia) * 180) / Math.PI + 360) % 360;
        return (
          Math.hypot(g - Ia, E - ka) / Za > 0.6 &&
          bn.slice(0, q).some(([Mt, Pa]) => (Mt <= Pa ? Pe >= Mt && Pe <= Pa : Pe >= Mt || Pe <= Pa))
        );
      },
      Wn = ia(
        Bt
          ? Bt[0]
          : `#${Ce[0]
              .split(",")
              .map((g) => (+g).toString(16).padStart(2, "0"))
              .join("")}`,
      ),
      wn = ([g, E]) => [Math.round(Ia) + Math.round(g * En), Rt + 1 + Math.round(E * En)],
      Bn = (g) => {
        const E = new Set();
        for (const q of Ne.slice(0, Math.ceil((g * Ne.length) / bn.length)))
          q.forEach((Pe, at) => {
            const Mt =
                at && Math.max(Math.abs(Pe[0] - q[at - 1][0]), Math.abs(Pe[1] - q[at - 1][1])) <= 1
                  ? q[at - 1]
                  : Pe,
              [Pa, Ta] = wn(Mt),
              [La, xa] = wn(Pe),
              en = Math.max(1, Math.abs(La - Pa), Math.abs(xa - Ta));
            for (let rn = 0; rn <= en; rn++)
              E.add(`${Math.round(Pa + ((La - Pa) * rn) / en)},${Math.round(Ta + ((xa - Ta) * rn) / en)}`);
          });
        return E;
      },
      C = [];
    for (let g = 0; g <= bn.length; g++) {
      const E = Bn(g);
      Xa.set(Ja);
      for (let at = 0; at < Zt; at++)
        for (let Mt = 0; Mt < st; Mt++) an(Mt, at, g) && (Xa[(at * st + Mt) * 4 + 3] = 0);
      const q = (at, Mt) => at >= 0 && Mt >= 0 && at < st && Mt < Zt && Xa[(Mt * st + at) * 4 + 3] >= 128,
        Pe = (at, Mt) => at >= 0 && Mt >= 0 && at < st && Mt < Zt && Ja[(Mt * st + at) * 4 + 3] >= 128;
      for (let at = 0; at < Zt; at++)
        for (let Mt = 0; Mt < st; Mt++) {
          if (!q(Mt, at)) continue;
          if (
            [
              [1, 0],
              [-1, 0],
              [0, 1],
              [0, -1],
            ].some(([Ta, La]) => !q(Mt + Ta, at + La) && Pe(Mt + Ta, at + La)) ||
            E.has(`${Mt},${at}`)
          ) {
            const Ta = (at * st + Mt) * 4;
            ((Xa[Ta] = Wn[0]), (Xa[Ta + 1] = Wn[1]), (Xa[Ta + 2] = Wn[2]));
          }
        }
      (Da.putImageData(la, 0, 0), C.push(va.toDataURL()));
    }
    return ((C.w = st), C);
  }
  const He = 6,
    m = (Ue, Bt) =>
      te(Ue.dataset.t).then((st) => {
        if ((st && (Ue.style.width = `calc(${st.w}px * ${st.own ? "(var(--k) - .5)" : "var(--k)"})`), st))
          for (const Zt of Ue.querySelectorAll(".ug-rh"))
            Zt.getAttribute("src") !== st[Math.min(He - 1, Bt)] && (Zt.src = st[Math.min(He - 1, Bt)]);
      }),
    z = 2500,
    pe = 1100,
    V = (Ue, Bt = 1e4) => {
      const st = Math.min(0.11, pe / Bt),
        Zt = Math.max(st + 0.01, 1 - z / Bt);
      return Ue < st ? 0 : Ue >= Zt ? He : 1 + Math.floor((Ue - st) / ((Zt - st) / (He - 1)));
    },
    lt = (Ue, Bt) =>
      (Ue.res.loot?.[Bt - 1] || [])
        .slice(1)
        .filter((st) => !st.guard && st.k === "money")
        .reduce((st, Zt) => st + Zt.n, 0),
    kt = (Ue, Bt) =>
      ut(Ue, Bt) || ((st) => (st ? `<b class="ug-money">${e("+{n} ₽", { n: H(st) })}</b>` : ""))(lt(Ue, Bt)),
    ra = (Ue, Bt) =>
      `<div class="ug-rock" data-k="${Bt.floor}.${Bt.node}" data-t="${Ue.theme}" data-c="${(U[Ue.theme] || [0, 0, "#4f7f86"])[2]}"><img class="ug-rh l" alt=""><img class="ug-rh r" alt=""><span class="ug-find">${kt(Ue, Bt.floor)}</span></div>`,
    Vt =
      '<svg viewBox="0 0 16 16" shape-rendering="crispEdges"><g class="ug-flame">' +
      [
        [7, 2],
        [6, 4],
        [7, 4],
        [8, 3],
        [5, 6],
        [6, 6],
        [7, 5],
        [8, 5],
        [9, 6],
        [5, 8],
        [6, 7],
        [7, 7],
        [8, 7],
        [9, 8],
        [10, 8],
        [4, 9],
        [5, 10],
        [6, 9],
        [7, 9],
        [8, 9],
        [9, 10],
        [10, 10],
        [11, 9],
      ]
        .map(([Ue, Bt]) => ie(Ue, Bt, Bt < 5 ? "#ffe066" : Bt < 8 ? "#ffb02e" : "#ff6b1f"))
        .join("") +
      '<rect x="6" y="8" width="4" height="3" fill="#ffe066"/></g>' +
      [
        [2, 12, 12],
        [3, 13, 10],
      ]
        .map(
          ([Ue, Bt, st]) =>
            `<rect x="${Ue}" y="${Bt}" width="${st}" height="2" fill="#6b4226"/><rect x="${Ue}" y="${Bt}" width="${st}" height="1" fill="#8d5b34"/>`,
        )
        .join("") +
      ie(1, 14, "#4a4a4a") +
      ie(14, 14, "#4a4a4a") +
      ie(0, 15, "#6a6a6a") +
      ie(15, 15, "#6a6a6a") +
      "</svg>",
    Xt = (Ue) => `<div class="ug-fire" data-k="${Ue}"><i></i>${Vt}</div>`,
    Ht = (Ue) => (Ue < 0.25 ? "low" : Ue < 0.5 ? "mid" : ""),
    ct = ["common", "uncommon", "rare", "legendary"],
    wt = (Ue) => `assets/ui/underground/geode-${ct[Ue]}.png`,
    ge = {
      138: "helix-fossil",
      140: "dome-fossil",
      142: "old-amber",
      345: "root-fossil",
      347: "claw-fossil",
      408: "skull-fossil",
      410: "armor-fossil",
    },
    Fe = () => X().LOOT,
    gt = (Ue) => `<img src="${Ue}" alt="">`,
    Dt = () => ({ money: 0, shards: 0, items: {}, geodes: [0, 0, 0, 0], plates: [], fossils: [] });
  function ha(Ue) {
    const Bt = [];
    for (const st of Ue.fossils)
      Bt.push({
        ic: gt(t.UI.itemSrc(ge[st.id] || "old-amber")),
        name: e("Fossile de {mon}", { mon: he(st.id) }),
        n: 1,
        rank: 9,
        tip: "fossil:" + st.id,
      });
    for (const st of Ue.plates)
      Bt.push({
        ic: gt(t.UI.itemSrc("plate-" + st.type)),
        name: ue(e(Fe().PLATES[st.type])),
        n: 1,
        rank: 8,
        tip: "plate:" + st.type,
      });
    Ue.geodes.forEach((st, Zt) => {
      st &&
        Bt.push({ ic: gt(wt(Zt)), name: ue(e(Fe().GEODES[Zt])), n: st, rank: 4 + Zt, tip: "geode:" + Zt });
    });
    for (const [st, Zt] of Object.entries(Ue.items))
      Bt.push({
        ic: gt(t.UI.itemSrc(st)),
        name: ue(t.UI.itemName(st)),
        n: Zt,
        rank: st === "rare-candy" || st.endsWith("-berry") ? 2 : 3,
        tip: "item:" + st,
      });
    return (
      Ue.shards &&
        Bt.push({
          ic: gt(t.UI.itemSrc("event-shard")),
          name: ue(t.UI.itemName("event-shard")),
          n: Ue.shards,
          rank: 1,
          tip: "item:event-shard",
        }),
      Bt.sort((st, Zt) => Zt.rank - st.rank)
    );
  }
  const _t = (Ue) =>
    `<span class="mp-it ug-li" data-ftip="${Ue.tip}">${Ue.ic}${Ue.n > 1 ? `<b class="it-c">${H(Ue.n)}</b>` : ""}</span>`;
  function Ea(Ue, Bt) {
    const st = $().lootSum(Ue, Bt),
      Zt = ha(st);
    return !st.money && !Zt.length
      ? ""
      : (st.money ? `<span class="ug-li ug-money">${H(st.money)} ₽</span>` : "") + Zt.map(_t).join("");
  }
  function ut(Ue, Bt) {
    const st = Dt();
    for (const Zt of (Ue.res.loot?.[Bt - 1] || []).filter((va) => !va.guard))
      Zt.k === "shards"
        ? (st.shards += Zt.n)
        : Zt.k === "item"
          ? (st.items[Zt.id] = 1)
          : Zt.k === "geode"
            ? st.geodes[Zt.t]++
            : Zt.k === "plate"
              ? st.plates.push(Zt)
              : Zt.k === "fossil" && st.fossils.push(Zt);
    return ha(st)[0]?.ic || "";
  }
  const jt = (Ue) =>
      `<span class="ug-foes" title="${ue(e("Adversaires de l'expédition"))}"><b>${ue(e("Adversaires"))}</b>${Ue.types.map((Bt) => t.UI.typeBadge(Bt, !0)).join("")}</span>`,
    xt = (Ue, Bt) => {
      const st = P(Ue.key);
      return `<span class="ug-theme" style="--tc:${st.c}" title="${ue(e("Thème de l'expédition"))} · ${ue(e(Ue.name))}">${st.ic}<span class="ug-th-n"> ${ue(e(Ue.name))}</span></span>${Bt ? jt(Ue) : ""}`;
    };
  function D(Ue) {
    const Bt = $().starts(),
      st = oe(Ue);
    return Bt.length < 2
      ? ""
      : `<label class="ug-from" title="${ue(e("Les étages sautés ne donnent ni butin ni XP."))}"><select data-ug-from="${Ue}" aria-label="${ue(e("Étage de départ"))}">${Bt.map((Zt) => `<option value="${Zt}"${Zt === st ? " selected" : ""}>${ue(e("Départ : étage {n}", { n: Zt }))}</option>`).join("")}</select></label>`;
  }
  function Q(Ue, Bt) {
    const st = de(Ue),
      Zt = st ? $().themeOf(st.theme) : $().theme(Ue);
    if (!st) {
      const la = J(Ue),
        Xa = Array.from({ length: X().TEAM }, (Xe, Ve) => la[Ve] && Ze.getMon(la[Ve])),
        nn = Xa.every(Boolean),
        F = nn ? $().canSend(Xa.map((Xe) => Xe.uid)) : null,
        Ce = $().left();
      return {
        cls: "idle",
        theme: xt(Zt, !0),
        live: null,
        from: D(Ue),
        team: Xa.map((Xe, Ve) => (Xe ? _(Xe, Ve) : "")).join(""),
        act: "",
        slots: Xa.map((Xe, Ve) =>
          Xe
            ? `<button class="ug-slot full" data-ug-slot="${Ue}.${Ve}" title="${he(Xe.id)}">${t.UI.rankTag(Xe)}${vt(Xe.id, Xe.shiny, t.UI.tileScale(Xe.id, 28, 40), 44)}<span class="lvl">${e("Nv. {n}", { n: Xe.level })}</span></button>`
            : `<button class="ug-slot plus" data-ug-slot="${Ue}.${Ve}" aria-label="${e("Choisir un Pokémon")}"></button>`,
        ).join(""),
        rail: "",
        log: Ce ? "" : e("Plus d'expédition aujourd'hui."),
        xp: "",
        loot: "",
        veil: "",
        btn: `<button class="mp-go" data-ug-go="${Ue}"${nn && !F && !$().busy() ? "" : " disabled"}${F ? ` title="${ue(F)}"` : ""}>${e("En route")}</button>`,
      };
    }
    const va = At(st),
      Da = va.p.done;
    return {
      cls: Da ? (va.ko ? "ko" : "done") : "run",
      theme: xt(Zt),
      from: "",
      team: st.mons
        .map((la, Xa) =>
          _(
            la,
            Xa,
            va.hp[la.uid] > 0
              ? ""
              : Da || (va.p.floor && st.res.hp?.[la.uid]?.[va.p.floor - 1] === 0)
                ? "fainted gone"
                : "fainted",
          ),
        )
        .join(""),
      act: va.foe
        ? we(va.foe, va.kind === "guard", `${va.floor}.${va.node}`, $().levelOf(va.floor))
        : Da
          ? ""
          : va.kind === "wall"
            ? ra(st, va)
            : va.kind === "camp"
              ? Xt(`${va.floor}.${va.node}`)
              : `<span class="ug-ev" data-k="${va.floor}.${va.node}">${qe(va.kind, 1.5)}</span>`,
      live: {
        node: va.node,
        hp: va.hp,
        foe: va.foeHp,
        state: Da ? "" : va.foe ? "fight" : va.kind === "wall" ? "dig" : va.kind,
        stage: va.kind === "wall" ? V(va.p.done ? 1 : va.nf, va.span) : 0,
        floor: va.floor,
      },
      slots: st.mons
        .map(
          (la) =>
            `<span class="ug-slot full lock${va.hp[la.uid] > 0 ? "" : " ko"}" title="${he(la.id)}">${t.UI.rankTag(la)}${vt(la.id, la.shiny, t.UI.tileScale(la.id, 28, 40), 44)}<span class="ug-hp"><b class="${Ht(va.hp[la.uid])}" style="width:${Math.round(va.hp[la.uid] * 100)}%"></b></span></span>`,
        )
        .join(""),
      rail:
        va.nodes
          .map(
            (la, Xa) =>
              (Xa ? `<i class="ug-l${Xa <= va.node ? " on" : ""}"></i>` : "") +
              `<span class="ug-n${Xa < va.node || Da ? " dn" : ""}${Xa === va.node && !Da ? " cur" : ""}" title="">${qe(la)}</span>`,
          )
          .join("") + `<span class="ug-fl">${e("Étage {n}", { n: va.floor })}</span>`,
      log: fe(st, va),
      loot: Ea(st, va.p.floor),
      xp: va.xp ? `<b class="xp-tag">${e("+{n} XP", { n: H(va.xp) })}</b>` : "",
      btn: Da || Bt ? "" : `<button class="btn outline" data-ug-stop="${Ue}">${e("Rappeler")}</button>`,
      veil: Da
        ? `<div class="ug-veil-in"><b>${fe(st, va)}</b><button class="btn gold" data-ug-take="${Ue}">${e("Récupérer")}</button></div>`
        : "",
    };
  }
  const Y = (Ue) => `<div class="ug-bay" data-bay="${Ue}">
      <div class="ug-scene" data-ug-follow="${Ue}"><div class="ug-water"></div><div class="ug-lava"></div><div class="ug-dark"></div>
        <div class="ug-tl"><span class="ug-tpill" data-p="theme"></span></div><span class="ug-from-box" data-p="from"></span>
        <div class="ug-team" data-p="team"></div><div class="ug-act" data-p="act"></div><div class="ug-fx"></div></div>
      <div class="ug-rail" data-p="rail"></div>
      <div class="ug-ctl"><div class="ug-slots" data-p="slots"></div><div class="ug-info"><span class="ug-log" data-p="log"></span><span class="ug-gain"><span data-p="xp"></span></span></div><span class="ug-btn" data-p="btn"></span></div>
      <div class="ug-sac"><small class="bag-label">${e("Sac")}</small><div class="ug-loot" data-p="loot"></div></div>
      <div class="ug-veil" data-p="veil"></div>
    </div>`;
  function ye(Ue, Bt, st = !1) {
    let Zt = Ue.querySelector(`.ug-bay[data-bay="${Bt}"]`);
    Zt || ((Zt = f(Y(Bt))), Ue.appendChild(Zt));
    const va = Q(Bt, st),
      Da = de(Bt),
      la = Zt.querySelector(".ug-scene"),
      Xa = P(Da ? Da.theme : $().theme(Bt).key);
    ((Zt.className = `ug-bay ${va.cls}`),
      (la.className = `ug-scene t-${Da ? Da.theme : $().theme(Bt).key}${["leaving", "entering", "own"]
        .filter((ia) => la.classList.contains(ia))
        .map((ia) => " " + ia)
        .join("")}${st ? " big" : ""}`));
    const nn = Da ? Da.theme : $().theme(Bt).key,
      F = u.has(nn);
    (la.classList.toggle("own", F),
      (la.style.backgroundImage = F
        ? `url(assets/bg/underground/${nn}.png)`
        : t.SCENES.css({ scene: X().SCENE })),
      la.style.setProperty("--tint", F ? "transparent" : Xa.tint),
      la.style.setProperty("--blend", Xa.blend || "normal"),
      za(la, Da ? Da.theme : $().theme(Bt).key),
      (Zt.querySelector('[data-p="rail"]').hidden = !Da));
    const Ce = va.live;
    if ((delete va.cls, delete va.live, Zt._wiping)) return;
    const Xe = Ce ? `${Ce.floor}.${Ce.node}${Ce.state ? "" : ".end"}` : "",
      Ve = Zt.dataset.at;
    if (Ce && Ve && Ve !== Xe && !Zt._skip && !Zn() && t.CaptureFX?.dither) {
      Zt._wiping = !0;
      const ia = la.dataset.state === "camp",
        Ja = (Zt._tok = (Zt._tok || 0) + 1);
      (la.classList.remove("entering"),
        It(la.querySelector(".ug-fx")),
        ia || (la.classList.add("leaving"), (la.dataset.state = "walk")));
      const Ia = t.CaptureFX.dither(la, { color: "#0b0d14", sweep: "diag", z: 7 });
      (async () => (
        await se(ia ? 0 : 350),
        await Ia.run(0, 1, 420),
        la.querySelectorAll(".ug-fx > :not(canvas)").forEach((ka) => ka.remove()),
        (Zt._wiping = !1),
        (Zt._skip = !0),
        la.classList.remove("leaving"),
        la.classList.add("entering"),
        ye(Ue, Bt, st),
        (la.dataset.state = "walk"),
        await se(120),
        await Ia.run(1, 0, 420),
        Ia.remove(),
        await se(nt - 540),
        Zt._tok === Ja && (la.classList.remove("entering"), (la.dataset.state = Zt._state || ""), ee(la))
      ))();
      return;
    }
    Zt._skip = !1;
    for (const [ia, Ja] of Object.entries(va)) {
      const Ia = Zt.querySelector(`[data-p="${ia}"]`);
      Ia.dataset.v !== Ja && ((Ia.innerHTML = Ja), (Ia.dataset.v = Ja));
    }
    for (const ia of Zt.querySelectorAll("img[data-src]")) {
      const Ja = ia.dataset.src;
      (ia.removeAttribute("data-src"),
        t.UI.setSprite(ia, Ja).then(() => es(() => la.classList.contains("entering") || ee(la))));
    }
    if (((Zt.dataset.at = Xe), !Ce)) return;
    for (const [ia, Ja] of Object.entries(Ce.hp)) {
      const Ia = la.querySelector(`.ally[data-uid="${ia}"] .hp > div`);
      Ia && Ot(Ia, Ja);
    }
    const Rt = la.querySelector(".enemy .hp > div");
    Rt && Ot(Rt, Ce.foe);
    const da = la.querySelector(".ug-rock");
    (da &&
      (Ce.stage > (+da.dataset.s || 0) &&
        da.dataset.s != null &&
        !Zn() &&
        _a(la.querySelector(".ug-fx"), da, Ce.stage === He ? 14 : 8),
      (da.dataset.s = Ce.stage),
      m(da, Ce.stage)),
      (la.dataset.floor = Ce.floor),
      (Zt._state = Ce.state),
      (la.dataset.view = Ce.state),
      !la.classList.contains("entering") &&
        (la.dataset.state === "fight" && Ce.state !== "fight" && It(la.querySelector(".ug-fx")),
        (la.dataset.state = Ce.state),
        ee(la)));
  }
  const nt = 1100,
    Ot = (Ue, Bt) => {
      ((Ue.style.width = `${Math.round(Bt * 100)}%`),
        (Ue.style.background = Bt > 0.2 ? "#f0607a" : "#d6334f"));
    };
  function ee(Ue) {
    const Bt = Ue.getBoundingClientRect(),
      st = [...Ue.querySelectorAll(".enemy .mini-hp")],
      Zt = st.map((va) => {
        const Da = va.getBoundingClientRect();
        return Da.height ? Math.max(0, Math.ceil(Bt.top + 4 - (Da.top - (va._dy || 0)))) : null;
      });
    st.forEach((va, Da) => {
      const la = Zt[Da];
      la == null || la === (va._dy || 0) || ((va._dy = la), (va.style.translate = la ? `0 ${la}px` : ""));
    });
  }
  function rt() {
    const Ue = $().slotPrice();
    if (Ue == null) return "";
    const Bt = $().shards() >= Ue;
    return `<div class="ug-bay locked ug-buybay"><span>${e("Un emplacement d'expédition de plus · Expéditions par jour : +{n}", { n: $().slotGain() })}</span>
      <button class="btn gold" data-ug-buyslot${Bt ? "" : " disabled"}><img src="${t.UI.itemSrc("event-shard")}" alt="">${H(Ue)}</button></div>`;
  }
  function Qe() {
    const Ue = a("#ug-root");
    if (!Ue) return;
    if (!$().unlocked()) {
      Ue.innerHTML = `<p class="pg-empty">${ue(Sn())}</p>`;
      return;
    }
    _e();
    const Bt = $().slotsMax();
    (Ue.querySelector(".ug") ||
      ((Ue.innerHTML = `<div class="map-region ug" style="--c:var(--under)" data-tab="${je}">
        <div class="map-head"><img src="assets/ui/explorer-kit.png" alt=""><h2>${e("Souterrain")}</h2>${t.UI.helpTip(e("Souterrain"), e("Envoie {n} Pokémon : ils descendent d'étage en étage jusqu'à être K.O. ou rappelés. Un gardien deux fois plus fort tous les 10 étages. Chaque expédition a son thème, affiché sur son encart : tous ses adversaires sont de ses types, choisis des Pokémon efficaces contre eux. {d} à {m} expéditions par jour selon les emplacements achetés, chaque Pokémon une fois par jour ; au retour, l'XP et le butin des étages franchis. La première fois aux étages 100, 150 et 200 : une géode légendaire, une apparence ou un cadre.", { n: X().TEAM, d: X().PER_DAY, m: X().PER_BOUGHT.reduce((Rt, da) => Rt + da, X().PER_DAY) }))}

          <div class="map-sum" data-ug-sum></div></div>
        <div class="map-body"><div class="seg ug-tabs"><button data-ug-tab="exp">${e("Expéditions")}</button><button data-ug-tab="geo">${e("Géodes")}</button><button data-ug-tab="shop">${e("Boutique")}</button></div>
        <div class="ug-page ug-pg-exp"><div class="ug-bays" data-ug-bays></div></div>
        <div class="ug-page ug-pg-geo"><div data-ug-geos></div><div data-ug-bag></div></div>
        <div class="ug-page ug-pg-shop"><div class="zone-box ug-counter"><div class="zone-head"><b>${e("Échanger des Éclats")}</b>${t.UI.helpTip(e("Échanger des Éclats"), e("{n} gemmes de tes Pokémon, contre des Éclats. La sélection change toutes les {h} h ; tu peux la changer avant contre des ₽. Les murs et les gardiens donnent des Éclats ; une gemme recyclée aussi.", { n: X().OFFER, h: X().OFFER_HOURS }))}<span class="ug-shop-n" data-ug-shards></span></div>
              <div class="ug-offer-bar" data-ug-offbar></div>
              <div class="ug-offer" data-ug-counter></div></div></div>
      </div></div>
      <div class="ug-big" data-ug-big hidden></div>`),
      (Ue.onclick = Ua),
      Ue.addEventListener("change", (Rt) => {
        const da = Rt.target.closest("[data-ug-from]");
        da && ((We[da.dataset.ugFrom] = +da.value), $e(), Qe());
      })),
      (Ue.querySelector(".ug").dataset.tab = je),
      Ue.querySelectorAll("[data-ug-tab]").forEach((Rt) =>
        Rt.classList.toggle("on", Rt.dataset.ugTab === je),
      ));
    const st = (Ze.S.under?.geodes || []).reduce((Rt, da) => Rt + da, 0),
      Zt = Ue.querySelector('[data-ug-tab="geo"]');
    let va = Zt.querySelector(".new");
    st
      ? ((
          va || Zt.appendChild(Object.assign(document.createElement("span"), { className: "new" }))
        ).textContent = H(st))
      : va?.remove();
    const Da = `<span>${e("Expéditions : {html}", { html: `<b>${$().left()}/${$().perDay()}</b>` })}</span>${Ut()}`,
      la = Ue.querySelector("[data-ug-sum]");
    (la.dataset.v !== Da && ((la.innerHTML = Da), (la.dataset.v = Da)),
      Ca().forEach((Rt, da) => {
        const ia = Ue.querySelector(da ? "[data-ug-bag]" : "[data-ug-geos]");
        ia.dataset.v !== Rt && ((ia.innerHTML = Rt), (ia.dataset.v = Rt), oa(ia));
      }));
    const Xa = `<b>${H($().shards())}</b> ${gt(t.UI.itemSrc("event-shard"))}`,
      nn = Ue.querySelector("[data-ug-shards]");
    if ((nn.dataset.v !== Xa && ((nn.innerHTML = Xa), (nn.dataset.v = Xa)), je === "shop")) {
      const Rt = $().offer(),
        da = Xn(Rt.ids),
        ia = Ue.querySelector("[data-ug-counter]"),
        Ja = Dn(Rt),
        Ia = Ue.querySelector("[data-ug-offbar]");
      (ia.dataset.v !== da && ((ia.innerHTML = da), (ia.dataset.v = da)),
        Ia.dataset.v !== Ja && ((Ia.innerHTML = Ja), (Ia.dataset.v = Ja)));
    }
    const F = Ue.querySelector("[data-ug-bays]");
    b(".ug-bay[data-bay]", F).forEach((Rt) => {
      +Rt.dataset.bay >= Bt && Rt.remove();
    });
    for (let Rt = 0; Rt < Bt; Rt++) ye(F, Rt);
    for (let Rt = 0; Rt < Bt; Rt++) {
      const da = F.querySelector(`.ug-bay[data-bay="${Rt}"]`);
      F.children[Rt] !== da && F.insertBefore(da, F.children[Rt] || null);
    }
    let Ce = F.querySelector("[data-ug-tail]");
    (Ce || ((Ce = document.createElement("div")), (Ce.dataset.ugTail = ""), (Ce.className = "ug-tail")),
      F.lastElementChild !== Ce && F.appendChild(Ce));
    const Xe = rt();
    Ce.dataset.v !== Xe && ((Ce.innerHTML = Xe), (Ce.dataset.v = Xe));
    const Ve = Ue.querySelector("[data-ug-big]");
    (ve != null && !de(ve) && (ve = null),
      (Ve.hidden = ve == null),
      ve == null
        ? (Ve.innerHTML = "")
        : ((!Ve.firstElementChild || +Ve.firstElementChild.dataset.bay !== ve) && (Ve.innerHTML = ""),
          ye(Ve, ve, !0)));
  }
  const Ft = ["#d8fbff", "#8fe6f0", "#3ca4c0", "#2a8aa0", "#1c5868", "#143e4c"],
    Ye = Ft.map((Ue) => [1, 3, 5].map((Bt) => parseInt(Ue.slice(Bt, Bt + 2), 16))),
    bt = (Ue) => [1, 3, 5].map((Bt) => parseInt(Ue.slice(Bt, Bt + 2), 16)),
    Yt = ["#fff2a8", "#ffc24a", "#ff8a2a", "#e0461c"].map(bt),
    wa = ["#3a3230", "#54493f", "#6e6056", "#9a8e84"].map(bt),
    pa = ["#ffffff", "#d4f4ff", "#9ad8ff"].map(bt),
    Gt = bt("#b48cff"),
    N = ["#e2b0ff", "#b46ae8", "#7a3aa8"].map(bt),
    W = ["#fff4c0", "#ffd870", "#d8a440"].map(bt),
    ze = ["#8a7058", "#6a5442", "#a88c6c"].map(bt),
    qt = ["#d8c4a0", "#b8a07c", "#8c7860"].map(bt),
    Lt = new Set(["flooded", "volcanic", "crystal", "dark", "ancient", "galleries"]),
    zt = new Set();
  let ca = 0,
    Ma = 0;
  const Na = new IntersectionObserver((Ue) => {
      for (const Bt of Ue) Bt.target._pool && (Bt.target._pool.seen = Bt.isIntersecting);
      vn();
    }),
    Va = new ResizeObserver((Ue) => {
      for (const Bt of Ue) {
        const st = Bt.target._pool;
        st && ((st.w = Bt.target.clientWidth), (st.h = Bt.target.clientHeight));
      }
    }),
    Ba = (Ue) => {
      (Ue.cv.remove(),
        zt.delete(Ue),
        Ue.sc._pool === Ue && ((Ue.sc._pool = null), Na.unobserve(Ue.sc), Va.unobserve(Ue.sc)));
    };
  function za(Ue, Bt) {
    let st = [...zt].find((va) => va.sc === Ue);
    if ((st && st.theme !== Bt && (Ba(st), (st = null)), !Lt.has(Bt))) return;
    st ||
      ((st = {
        sc: Ue,
        theme: Bt,
        cv: f('<canvas class="ug-pool"></canvas>'),
        drops: [],
        rings: [],
        parts: [],
        next: 0,
        burst: 0,
        seen: !0,
        w: Ue.clientWidth,
        h: Ue.clientHeight,
      }),
      Ue.querySelector(".ug-water").after(st.cv),
      zt.add(st),
      (Ue._pool = st),
      Na.observe(Ue),
      Va.observe(Ue));
    const Zt = `${st.w}x${st.h}`;
    ((!is() || st.drawn !== Zt) && (qn(st, zn.now() / 1e3), (st.drawn = Zt)), vn());
  }
  const vn = () => {
    !ca && [...zt].some((Ue) => Ue.seen) && Z() && !is() && ((Ma = zn.now()), (ca = es(An)));
  };
  function An(Ue) {
    ca = 0;
    for (const st of zt) st.cv.isConnected || Ba(st);
    if (!zt.size || !Z() || is() || ![...zt].some((st) => st.seen)) return;
    const Bt = Math.max(0, Math.min(0.1, (Ue - Ma) / 1e3));
    if (!document.hidden) for (const st of zt) st.seen && qn(st, Ue / 1e3, Bt);
    ((Ma = Ue), (ca = es(An)));
  }
  const on = (Ue, Bt) => Ue + Math.random() * (Bt - Ue);
  function qn(Ue, Bt, st = 0) {
    const va = Math.ceil(Ue.w / 3),
      Da = Math.ceil(Ue.h / 3);
    if (!va || !Da) return;
    (Ue.cv.width !== va || Ue.cv.height !== Da) &&
      ((Ue.cv.width = va),
      (Ue.cv.height = Da),
      (Ue.im = null),
      Object.assign(Ue.cv.style, { width: `${va * 3}px`, height: `${Da * 3}px` }));
    const la = Ue.cv.getContext("2d"),
      Xa = Math.round(Da * 0.86),
      nn = (Ue.im ||= la.createImageData(va, Da)),
      F = nn.data;
    F.fill(0);
    const Ce = (Ve, Rt, [da, ia, Ja], Ia) => {
        if (((Ve = Math.round(Ve)), (Rt = Math.round(Rt)), Ve < 0 || Ve >= va || Rt < 0 || Rt >= Da)) return;
        const ka = (Rt * va + Ve) * 4;
        ((F[ka] = da), (F[ka + 1] = ia), (F[ka + 2] = Ja), (F[ka + 3] = Ia));
      },
      Xe = fn[Ue.theme];
    (st && Xe.step(Ue, Bt, st, va, Da, Xa),
      Xe.draw(Ue, Bt, Ce, va, Da, Xa),
      la.putImageData(nn, 0, 0),
      Xe.over?.(Ue, Bt, la, va, Da));
  }
  const xn = (Ue, Bt) => ((Ue.age += Bt), (Ue.x += Ue.vx * Bt), (Ue.y += Ue.vy * Bt), Ue.age < Ue.life),
    fn = {
      flooded: {
        step(Ue, Bt, st, Zt, va, Da) {
          Bt > Ue.next &&
            (Ue.drops.push({ x: Math.floor(Math.random() * Zt), y: 0, v: 12 }),
            (Ue.next = Bt + 0.6 + Math.random() * 1.2));
          for (const la of Ue.drops) ((la.v += 48 * st), (la.y += la.v * st));
          for (const la of Ue.drops.filter((Xa) => Xa.y >= Da)) Ue.rings.push({ x: la.x, r: 0 });
          Ue.drops = Ue.drops.filter((la) => la.y < Da);
          for (const la of Ue.rings) la.r += 7 * st;
          Ue.rings = Ue.rings.filter((la) => la.r < 4);
        },
        draw(Ue, Bt, st, Zt, va, Da) {
          for (const la of Ue.drops) {
            const Xa = Math.floor(la.y);
            (st(la.x, Xa, Ye[1], 240), st(la.x, Xa + 1, Ye[1], 240), st(la.x, Xa - 1, Ye[3], 200));
          }
          for (const la of Ue.rings) {
            const Xa = Math.floor(la.r);
            (Xa < 1 && st(la.x, Da - 2, Ye[0], 240),
              st(la.x - Xa - 1, Da, Ye[0], 240),
              st(la.x + Xa + 1, Da, Ye[0], 240));
          }
        },
      },
      volcanic: {
        step(Ue, Bt, st, Zt, va, Da) {
          (Bt > Ue.next &&
            Ue.parts.filter((la) => la.k === "e").length < 26 &&
            (Ue.parts.push({
              k: "e",
              x: on(0, Zt),
              y: on(Da - 10, va),
              vx: on(-2, 2),
              vy: on(-16, -9),
              age: 0,
              life: on(2.6, 4.4),
              ph: on(0, 6.3),
            }),
            (Ue.next = Bt + on(0.06, 0.2))),
            Ue.parts.filter((la) => la.k === "a").length < 30 &&
              Math.random() < st * 8 &&
              Ue.parts.push({
                k: "a",
                x: on(-10, Zt),
                y: -1,
                vx: on(1, 3),
                vy: on(2.5, 5),
                age: 0,
                life: 30,
                c: wa[Math.floor(Math.random() * wa.length)],
              }),
            (Ue.parts = Ue.parts.filter(
              (la) => (la.k === "e" && (la.vx = Math.sin(Bt * 2 + la.ph) * 3), xn(la, st) && la.y < va + 1),
            )));
        },
        draw(Ue, Bt, st) {
          for (const Zt of Ue.parts) {
            if (Zt.k === "a") {
              st(Zt.x, Zt.y, Zt.c, 210);
              continue;
            }
            const va = Zt.age / Zt.life,
              Da = Yt[Math.min(3, Math.floor(va * 4))],
              la = Math.round(255 * (1 - va * va));
            (st(Zt.x, Zt.y, Da, la),
              va < 0.35 && st(Zt.x, Zt.y + 1, Yt[Math.min(3, Math.floor(va * 4) + 1)], la >> 1));
          }
        },
      },
      crystal: {
        step(Ue, Bt, st, Zt, va, Da) {
          (Bt > Ue.next &&
            (Ue.parts.push({
              k: "s",
              x: on(2, Zt - 2),
              y: on(2, Da * 0.7),
              vx: 0,
              vy: 0,
              age: 0,
              life: on(0.8, 1.3),
            }),
            (Ue.next = Bt + on(0.06, 0.18))),
            Ue.parts.filter((la) => la.k === "f").length < 24 &&
              Math.random() < st * 6 &&
              Ue.parts.push({
                k: "f",
                x: on(0, Zt),
                y: -1,
                vx: on(-1.5, 1.5),
                vy: on(2, 4),
                age: 0,
                life: 40,
                ph: on(0, 6.3),
              }),
            (Ue.parts = Ue.parts.filter(
              (la) => (la.k === "f" && (la.vx = Math.sin(Bt * 1.3 + la.ph) * 2), xn(la, st) && la.y < Da + 4),
            )));
        },
        draw(Ue, Bt, st) {
          for (const Zt of Ue.parts) {
            if (Zt.k === "f") {
              st(Zt.x, Zt.y, pa[1], 200);
              continue;
            }
            const va = Zt.age / Zt.life,
              Da = va < 0.5 ? Math.round(va * 6) : Math.round((1 - va) * 6),
              la = Math.round(255 * Math.sin(va * Math.PI));
            st(Zt.x, Zt.y, pa[0], la);
            for (let Xa = 1; Xa <= Math.min(3, Da); Xa++) {
              const nn = pa[Math.min(2, Xa)],
                F = la * (Xa === 1 ? 0.95 : Xa === 2 ? 0.6 : 0.3);
              (st(Zt.x - Xa, Zt.y, nn, F),
                st(Zt.x + Xa, Zt.y, nn, F),
                st(Zt.x, Zt.y - Xa, nn, F),
                st(Zt.x, Zt.y + Xa, nn, F));
            }
          }
        },
      },
      dark: {
        step(Ue, Bt, st, Zt, va, Da) {
          (Bt > Ue.next &&
            (Ue.parts.push({
              k: "b",
              x: on(2, Zt - 2),
              y: on(Da - 2, va - 2),
              vx: 0,
              vy: on(-4, -2),
              age: 0,
              life: on(1.2, 2),
              r: Math.random() < 0.3 ? 2 : 1,
            }),
            (Ue.next = Bt + on(0.2, 0.6))),
            (Ue.parts = Ue.parts.filter((la) => xn(la, st))));
        },
        draw(Ue, Bt, st, Zt, va, Da) {
          const la = Da - va * 0.34;
          for (let Xa = Math.floor(la); Xa < va; Xa++)
            for (let nn = 0; nn < Zt; nn++) {
              const F =
                  Math.sin((nn + Bt * 6) / 9 + Xa * 0.4) +
                  Math.sin((nn - Bt * 4) / 5.3 - Xa * 0.7) * 0.6 +
                  Math.sin(nn / 17 + Bt * 0.7) * 0.8,
                Ce = (Xa - la) / (va - la),
                Xe = F * 0.35 + Ce * 1.4 - 0.5;
              Xe > 0.1 && ((nn + Xa) & 1 || Xe > 0.6) && st(nn, Xa, Gt, Math.round(Math.min(1, Xe) * 150));
            }
          for (const Xa of Ue.parts)
            if (Xa.age / Xa.life < 0.85)
              (st(Xa.x, Xa.y, N[0], 230),
                Xa.r > 1 &&
                  (st(Xa.x + 1, Xa.y, N[1], 230),
                  st(Xa.x, Xa.y + 1, N[1], 230),
                  st(Xa.x + 1, Xa.y + 1, N[2], 230)));
            else {
              const F = Xa.r + 1;
              (st(Xa.x - F, Xa.y, N[1], 200),
                st(Xa.x + F, Xa.y, N[1], 200),
                st(Xa.x, Xa.y - F, N[1], 200),
                st(Xa.x, Xa.y + F, N[1], 200));
            }
        },
      },
      ancient: {
        step(Ue, Bt, st, Zt, va, Da) {
          if (
            (Ue.parts.filter((la) => la.k === "m").length < 34 &&
              Math.random() < st * 9 &&
              Ue.parts.push({
                k: "m",
                x: on(0, Zt),
                y: on(4, Da),
                vx: on(-1, 1),
                vy: on(-0.8, 0.8),
                age: 0,
                life: on(4, 7),
                ph: on(0, 6.3),
              }),
            Bt > Ue.next)
          ) {
            const la = on(4, Zt - 4);
            for (let Xa = 0; Xa < 3; Xa++)
              Ue.parts.push({
                k: "g",
                x: la + on(-2, 2),
                y: -Xa * 2,
                vx: on(-2, 2),
                vy: on(0, 6),
                age: 0,
                life: 5,
                c: ze[Xa % 3],
                bounced: !1,
              });
            Ue.next = Bt + on(3, 6);
          }
          Ue.parts = Ue.parts.filter((la) => {
            if (la.k === "g") {
              if (((la.vy += 60 * st), la.y >= Da && !la.bounced))
                ((la.vy = -la.vy * 0.3), (la.bounced = !0));
              else if (la.y >= Da && la.bounced) return !1;
            } else la.vy = Math.sin(Bt * 0.8 + la.ph) * 1.2;
            return xn(la, st);
          });
        },
        draw(Ue, Bt, st, Zt, va, Da) {
          for (const la of Ue.parts) {
            if (la.k === "g") {
              st(la.x, la.y, la.c, 255);
              continue;
            }
            const Xa = la.age / la.life,
              nn = Math.round(
                255 * Math.min(1, Math.sin(Xa * Math.PI) * 1.4) * (0.65 + 0.35 * Math.sin(Bt * 4 + la.ph)),
              );
            st(la.x, la.y, W[((la.ph * 10) | 0) % 3], nn);
          }
        },
        over(Ue, Bt, st, Zt, va) {
          (st.save(), (st.globalCompositeOperation = "lighter"));
          for (const [Da, la, Xa] of [
            [Zt * 0.18, Zt * 0.09, 0],
            [Zt * 0.56, Zt * 0.13, 2.1],
          ]) {
            const nn = 0.2 + 0.06 * Math.sin(Bt * 0.5 + Xa);
            ((st.fillStyle = `rgba(255, 214, 140, ${nn.toFixed(3)})`),
              st.beginPath(),
              st.moveTo(Da, 0),
              st.lineTo(Da + la, 0),
              st.lineTo(Da + la + va * 0.45, va),
              st.lineTo(Da + va * 0.45, va),
              st.closePath(),
              st.fill());
          }
          st.restore();
        },
      },
      galleries: {
        step(Ue, Bt, st, Zt, va, Da) {
          (Bt > Ue.next &&
            ((Ue.burst = Bt + on(0.8, 1.4)), (Ue.bx = on(6, Zt - 6)), (Ue.next = Bt + on(3.5, 7))),
            Bt < Ue.burst &&
              Math.random() < st * 70 &&
              Ue.parts.push({
                x: Ue.bx + on(-2, 2),
                y: 0,
                vx: on(-1.5, 1.5),
                vy: on(10, 18),
                age: 0,
                life: 6,
                c: qt[Math.floor(Math.random() * 3)],
              }),
            (Ue.parts = Ue.parts.filter((la) => ((la.vy += 20 * st), xn(la, st) && la.y < Da + 2))));
        },
        draw(Ue, Bt, st) {
          for (const Zt of Ue.parts) st(Zt.x, Zt.y, Zt.c, 230);
        },
        over(Ue, Bt, st, Zt, va) {
          const Da =
            0.09 + 0.04 * Math.sin(Bt * 3.1) + 0.02 * Math.sin(Bt * 11.7) + (Math.random() < 0.03 ? 0.05 : 0);
          ((st.fillStyle = `rgba(255, 186, 96, ${Math.max(0, Da).toFixed(3)})`), st.fillRect(0, 0, Zt, va));
        },
      },
    },
    Yn = matchMedia("(prefers-reduced-motion: reduce)"),
    Zn = () => !!(t.CHEAT?.noAnim || Ze.S.reducedAnim || Yn.matches),
    is = () => Zn() || document.documentElement.classList.contains("no-weather"),
    ts = {};
  function Jn(Ue, Bt) {
    const st = `${Ue.id}.${Ue.level}>${Bt.join("/")}`;
    if (!(st in ts))
      try {
        ts[st] = Ze.bestMoveAgainst(Ue, Bt).key;
      } catch {
        ts[st] = "tackle";
      }
    return ts[st];
  }
  let On = !1,
    Me = null;
  const It = (Ue) => Ue?.querySelectorAll(":scope > div").forEach((Bt) => Bt.remove());
  async function Kt() {
    if (On) return;
    On = !0;
    let Ue = 0;
    try {
      for (; Z();) {
        const Bt = ve != null ? a("#ug-root [data-ug-big] .ug-scene") : null,
          st = (Bt ? [Bt] : b("#ug-root [data-ug-bays] .ug-scene")).filter((la) =>
            ["fight", "dig", "camp"].includes(la.dataset.state),
          );
        if (!st.length || document.hidden) {
          await se(400);
          continue;
        }
        const Zt = st[Ue++ % st.length],
          va = (la) => !la._pool || la._pool.seen,
          Da = Bt || st.find((la) => la.dataset.state === "fight" && va(la));
        if (!va(Zt) || (Zt.dataset.state === "fight" && Zt !== Da)) await se(900);
        else
          try {
            await Aa(Zt);
          } catch (la) {
            console.warn("underground fx", la);
          }
        await se(Zt.dataset.state === "dig" || st.length > 1 ? 250 : 550);
      }
    } finally {
      On = !1;
    }
  }
  async function Aa(Ue) {
    const Bt = de(+Ue.closest(".ug-bay").dataset.bay),
      st = Ue.dataset.state;
    if (!Bt) return;
    const Zt = b(".ally:not(.fainted)", Ue),
      va = (+Ue.dataset.n || 0) + 1;
    if (((Ue.dataset.n = va), !Zt.length)) return;
    const Da = a(".ug-fx", Ue),
      la = Zt[va % Zt.length],
      Xa = Bt.mons.find((ia) => ia.uid === la.dataset.uid);
    if (st === "camp") return Ha(Da, Zt[va % Zt.length]);
    if (st === "dig") return Ka(Da, la, a(".ug-rock", Ue));
    const nn = a(".enemy", Ue);
    if (!nn || !Xa) return;
    let F = la,
      Ce = nn,
      Xe,
      Ve = !1;
    const Rt = +nn.dataset.id,
      da = $().levelOf(+Ue.dataset.floor || 1);
    if (
      (va % 3 === 0
        ? ((F = nn), (Ce = la), (Ve = !0), (Xe = Jn({ id: Rt, level: da }, Ze.DEX[Xa.id].types)))
        : (Xe = Jn(Xa, Ze.DEX[Rt].types)),
      !Zn() && t.BattleFX?.has(Xe))
    )
      (Me !== Da && (It(Me), (Me = Da)),
        await t.BattleFX.play({
          move: Xe,
          attEl: F,
          defEl: Ce,
          fxEl: Da,
          shakeEl: Ue,
          mirror: Ve,
          miss: !1,
          crit: !1,
          speed: 1,
        }));
    else {
      const ia = Ve ? -1 : 1;
      (await F.animate(
        [{ transform: "none" }, { transform: `translateX(${18 * ia}px)` }, { transform: "none" }],
        { duration: 320, easing: "ease-in-out" },
      ).finished,
        a("img", Ce)?.animate([{ filter: "brightness(3)" }, { filter: "none" }], 240));
    }
  }
  async function Ka(Ue, Bt, st) {
    if (!st || +st.dataset.s === He) return se(400);
    const Zt = Bt.getBoundingClientRect(),
      va = st.getBoundingClientRect(),
      Da = (va.left + va.width / 2 - (Zt.left + Zt.width / 2)) * 0.35;
    return (
      await a(".wrap", Bt).animate(
        [
          { translate: "0 0" },
          { translate: `${-Da * 0.2}px 2px`, scale: "1.1 .88", offset: 0.3 },
          { translate: `${Da}px -10px`, scale: ".95 1.08", offset: 0.6 },
          { translate: "0 0", scale: "1 1" },
        ],
        { duration: Zn() ? 1 : 300, easing: "ease-out" },
      ).finished,
      Zn()
        ? se(400)
        : (st.animate([{ scale: "1 1" }, { scale: "1.08 .9" }, { scale: ".97 1.04" }, { scale: "1 1" }], {
            duration: 220,
            easing: "ease-out",
          }),
          _a(Ue, st, 5),
          se(120))
    );
  }
  function _a(Ue, Bt, st) {
    const Zt = Bt.getBoundingClientRect(),
      va = Ue.getBoundingClientRect();
    for (let Da = 0; Da < st; Da++) {
      const la = f('<i class="ug-chip"></i>'),
        Xa = (Math.random() - 0.5) * Zt.width * 1.4;
      ((la.style.background = Bt.dataset.c),
        Object.assign(la.style, {
          left: `${Zt.left - va.left + Zt.width / 2}px`,
          top: `${Zt.top - va.top + Zt.height * 0.4}px`,
        }),
        Ue.appendChild(la),
        la
          .animate(
            [
              { translate: "0 0" },
              { translate: `${Xa * 0.5}px ${-20 - Math.random() * 20}px`, offset: 0.4 },
              { translate: `${Xa}px ${Zt.height * 0.5}px`, opacity: 0 },
            ],
            { duration: 500 + Math.random() * 200, easing: "ease-out", fill: "forwards" },
          )
          .finished.then(() => la.remove()));
    }
  }
  function Ha(Ue, Bt) {
    const st = a(".wrap", Bt).getBoundingClientRect(),
      Zt = Ue.getBoundingClientRect(),
      va = +getComputedStyle(Bt).getPropertyValue("--k") || 2;
    for (let Da = 0; Da < 3; Da++) {
      const la = f(`<b class="ug-zz">${Da ? "z" : "Z"}</b>`);
      (Object.assign(la.style, {
        left: `${st.left - Zt.left + st.width * 0.6 + Da * 6}px`,
        top: `${st.top - Zt.top + st.height * 0.2 - Da * 8}px`,
        animationDelay: `${Da * 300}ms`,
        fontSize: `${(8 - Da * 2) * va}px`,
      }),
        Ue.appendChild(la),
        la.addEventListener("animationend", () => la.remove()));
    }
    return se(700);
  }
  async function Ua(Ue) {
    if (Ue.target.closest(".ug-from")) return;
    const Bt = Ue.target.closest(
      "[data-ug-slot],[data-ug-go],[data-ug-stop],[data-ug-take],[data-ug-follow],[data-ug-big],[data-ug-geode],[data-ug-all],[data-ug-tab],[data-buy],[data-ug-reroll],[data-ug-buyslot]",
    );
    if (!Bt) return;
    const st = Bt.dataset;
    if (st.ugBig != null) {
      Ue.target === Bt && ((ve = null), Qe());
      return;
    }
    if (st.ugSlot) return ea(+st.ugSlot.split(".")[0]);
    if (st.ugGeode) return Tn(+st.ugGeode);
    if (st.ugAll != null) return Mn();
    if (st.ugTab) {
      je !== st.ugTab && ((je = st.ugTab), pt(), Qe());
      return;
    }
    if (st.buy) return Kn(st.buy);
    if (st.ugReroll != null) return ls();
    if (st.ugBuyslot != null) return Hn();
    if (st.ugGo) return sn(+st.ugGo);
    if (st.ugStop) return Be(+st.ugStop);
    if (st.ugTake) return ft(+st.ugTake);
    if (st.ugFollow != null) {
      const Zt = +st.ugFollow;
      ((ve = ve === Zt || !de(Zt) ? null : Zt), Qe());
    }
  }
  async function sn(Ue) {
    const Bt = [...J(Ue)];
    if (Bt.length !== X().TEAM) return;
    const st = a(`#ug-root [data-ug-go="${Ue}"]`);
    st && ((st.disabled = !0), (st.textContent = e("Préparation…")));
    const Zt = await $().send(Bt, Ue, oe(Ue));
    if (Zt?.error) {
      (Ge(Zt.error), Qe());
      return;
    }
    ((J(Ue).length = 0), t.App?.refreshHeader?.(), Qe());
  }
  async function Be(Ue) {
    const Bt = de(Ue);
    Bt &&
      (await t.UI.confirm(
        e("Rappeler l'équipe ? Elle s'arrête à l'étage atteint et garde l'XP des étages franchis."),
        e("Rappeler"),
        "primary",
      )) &&
      ($().recall(Bt.id), t.App?.refreshHeader?.(), Qe());
  }
  function Ut() {
    const Ue = $().best(),
      Bt = (X().MILESTONES || []).find((st) => st.floor > Ue);
    return !Ue && !Bt
      ? ""
      : `<span${Bt ? ` title="${ue(e("Prochain palier : étage {n}", { n: Bt.floor }))}"` : ""}>${e("Record : {html}", { html: `<b>${Ue ? ue(e("Étage {n}", { n: Ue })) : "—"}</b>` })}</span>`;
  }
  function aa(Ue) {
    const Bt = [];
    return (
      Ue.geode != null &&
        Bt.push(
          `<div class="ug-back-li"><img src="${wt(Ue.geode)}" alt=""><span>${ue(e(Fe().GEODES[Ue.geode]))}</span><b></b></div>`,
        ),
      Ue.look &&
        Bt.push(
          `<div class="ug-back-li ug-mile"><span class="dc-hero"><img src="assets/trainers/still/${Ue.look}.png" alt=""></span><span>${ue(e("Apparence : {name}", { name: e(ae[Ue.look] || Ue.look) }))}</span><b></b></div>`,
        ),
      Ue.frame &&
        Bt.push(
          `<div class="ug-back-li ug-mile">${t.UI.trainerFace(Ze.S.trainer.sprite, "ug-mile-face", Ue.frame)}<span>${ue(e("Cadre : {name}", { name: e(t.Frames.nameOf(Ue.frame)) }))}</span><b></b></div>`,
        ),
      Bt.join("")
    );
  }
  const ae = { roark: "Pierrick", byron: "Charles" };
  async function ft(Ue) {
    const Bt = de(Ue);
    if (!Bt) return;
    const st = $().best(),
      Zt = At(Bt),
      va = $().collect(Bt.id);
    if (va) {
      ((va.record = va.floor > st && st > 0),
        ve === Ue && (ve = null),
        Qe(),
        t.App?.refreshHeader?.(),
        await ht(Bt, Zt, va));
      for (const Da of va.xp) Da.evolve && t.UI.proposeEvolution(Da.evolve);
    }
  }
  function ht(Ue, Bt, st) {
    const Zt = (ka, Za) => `<div class="dc-fact">${ka}<b>${Za}</b></div>`,
      va = (ka, Za, En) => `<div class="oc-sec"><h4>${ka}<em>${Za}</em></h4>${En}</div>`,
      Da = (ka, Za) => vt(ka, Za, 1.25, 56),
      la = st.xp
        .map((ka) => ({
          m: Ze.getMon(ka.uid) || Ue.mons.find((Za) => Za.uid === ka.uid),
          n: ka.levels || 0,
          xp: ka.amount || 0,
        }))
        .filter((ka) => ka.m),
      Xa = la.reduce((ka, Za) => ka + Za.n, 0),
      nn = la.reduce((ka, Za) => ka + Za.xp, 0),
      F = la.length
        ? va(
            e("Équipe"),
            `<b>${e("+{n} XP", { n: H(nn) })}</b>${Xa ? " · " + (Xa > 1 ? e("<b>+{n}</b> niveaux", { n: Xa }) : e("<b>+{n}</b> niveau", { n: Xa })) : ""}`,
            `<div class="oc-grid">${la
              .map(
                (
                  { m: ka, n: Za, xp: En },
                  bn,
                ) => `<div class="oc-tile" data-i="${bn}" title="${ue(he(ka.id))} · ${ue(e("+{n} XP", { n: H(En) }))}">${Za ? `<span class="gain">+${Za}</span>` : ""}${Ze.levelEvolution(ka) ? `<span class="evo" title="${e("Évolution prête")}">▲</span>` : ""}
        ${Da(ka.id, ka.shiny)}<span class="lvl">${e("Nv. {n}", { n: ka.level - Za })}</span><span class="xpb"><i></i></span></div>`,
              )
              .join("")}</div>`,
          )
        : "",
      Ce =
        Ue.recalled != null
          ? e("Rappelée à l'étage {n}", { n: Bt.floor })
          : Bt.ko
            ? e("K.O. à l'étage {n}", { n: Bt.floor })
            : e("Fond atteint"),
      Xe = st.loot,
      Ve = ha({
        ...Dt(),
        shards: Xe.shards,
        items: Xe.items,
        geodes: Xe.geodes,
        plates: Xe.plates.map((ka) => ({ type: ka })),
      }).map(
        (ka) =>
          `<div class="ug-back-li" title="${ka.name}">${ka.ic}<span>${ka.name}</span><b>${ka.n > 1 ? "×" + H(ka.n) : ""}</b></div>`,
      );
    Xe.money &&
      Ve.unshift(
        `<div class="ug-back-li ug-money"><span>${e("Pokédollars")}</span><b>${H(Xe.money)} ₽</b></div>`,
      );
    const Rt = Xe.fossils
        .map(
          (ka) =>
            `<div class="oc-tile ug-fossil${ka.isNew ? " is-new" : ""}" title="${ue(he(ka.mon.id))} · ${ue(ka.dup ? e("Déjà là : bonbons") : ka.isNew ? e("Nouveau !") : e("Ranimé"))}">${ka.isNew ? '<span class="new">NEW</span>' : ""}${ka.mon.shiny ? '<i class="shiny-ico"></i>' : ""}${Da(ka.mon.id, ka.mon.shiny)}<span class="lvl">${e("Nv. {n}", { n: ka.mon.level })}</span></div>`,
        )
        .join(""),
      da = Ve.length + Xe.fossils.length,
      ia = da
        ? va(
            e("Butin"),
            `<b>${da}</b>`,
            `${Rt ? `<div class="oc-grid ug-back-fossils">${Rt}</div>` : ""}<div class="ug-back-loot">${Ve.join("")}</div>`,
          )
        : "",
      Ja = (st.miles || []).length
        ? va(
            e("Palier franchi !"),
            `<b>${st.miles.map((ka) => ue(e("Étage {n}", { n: ka.floor }))).join(" · ")}</b>`,
            `<div class="ug-back-loot">${st.miles.map(aa).join("")}</div>`,
          )
        : "";
    let Ia = () => {};
    return Je({
      className: "dexcard-modal oc-modal ug-back",
      body: `<div class="dc-head"><h2>${e("Retour du Souterrain")}</h2><div class="dc-sum"><button class="dc-x" aria-label="${e("Fermer")}">✕</button></div></div>
        <div class="dc-facts oc-facts">${Zt(e("Étages franchis"), Math.max(0, st.floor - (st.from || 1) + 1))}${Zt(e("Gardiens battus"), Math.max(0, Math.floor(st.floor / X().GUARD_EVERY) - Math.floor(((st.from || 1) - 1) / X().GUARD_EVERY)))}${Zt(e("Durée"), yt(Bt.took))}</div>
        <p class="oc-note"><span>${Ce}</span>${st.record ? `<b class="ug-rec">${e("Nouveau record !")}</b>` : ""}</p>${F}${Ja}${ia}`,
      actions: [{ label: e("Super !"), cls: "gold", value: !0 }],
      onOpen: (ka, Za) => {
        ((a(".dc-x", ka).onclick = () => {
          (Ia(), Za(null));
        }),
          (Ia = t.UI.playLevels(ka, la)));
      },
    }).then((ka) => (Ia(), ka));
  }
  function ea(Ue) {
    if (de(Ue)) return;
    const Bt = $().theme(Ue),
      st = P(Bt.key),
      Zt = A(Ue),
      va = new Map(
        Array.from({ length: $().slotsMax() }, (Da, la) => la)
          .filter((Da) => Da !== Ue && !de(Da))
          .flatMap((Da) => J(Da).map((la) => [la, Da + 1])),
      );
    t.EventTeam.open(Zt, {
      key: Zt,
      size: X().TEAM,
      cap: 100,
      foes: () => $().guardsOf(Bt.key),
      already: e("Ton équipe est déjà la plus forte pour cette expédition !"),
      head: () => `<span class="evt-leg ug-leg">${st.ic}</span><h2>${e("Équipe {n} · Souterrain", { n: Ue + 1 })}</h2>
        <span class="evt-meta"><span class="ug-theme" style="--tc:${st.c}">${ue(e(Bt.name))}</span>${jt(Bt)}</span>`,
      allow: (Da) => !Ze.can(Da, "region", "sinnoh"),
      lock: (Da) =>
        $().inCandy(Da)
          ? e("Fabrique")
          : va.has(Da.uid)
            ? e("Éq. {n}", { n: va.get(Da.uid) })
            : $().today().used[Da.uid]
              ? `⏱ ${yt($().dayEnds() - Ze.time())}`
              : null,
      lockToast: (Da) =>
        $().inCandy(Da)
          ? e("En run à la Fabrique de Bonbons.")
          : va.has(Da.uid)
            ? e("Déjà dans l'équipe {n}.", { n: va.get(Da.uid) })
            : e("Déjà parti aujourd'hui."),
      mark: (Da) =>
        Ze.S.team.includes(Da.uid)
          ? `<span class="ot-team" title="${ue(e("Dans ton équipe"))}">${e("É")}</span>`
          : "",
      go: {
        label: e("En route"),
        why: () => {
          const Da = J(Ue);
          return Da.length < X().TEAM ? e("Choisis {n} Pokémon.", { n: X().TEAM }) : $().canSend([...Da]);
        },
        run: () => sn(Ue),
      },
    });
  }
  const Ra = ["Commun", "Peu commun", "Rare", "Légendaire"];
  function Ca() {
    const Ue = Ze.S.under || {},
      Bt = Ue.geodes || [0, 0, 0, 0],
      st = Object.entries(Ue.gems || {})
        .filter(([nn, F]) => nn.includes(":") && F > 0)
        .map(([nn, F]) => ({ id: nn, n: F })),
      Zt = Bt.reduce((nn, F) => nn + F, 0),
      va = st.reduce((nn, F) => nn + F.n, 0),
      Da = Bt.map(
        (
          nn,
          F,
        ) => `<button class="ug-vgeo t${F}" data-ug-geode="${F}"${nn ? "" : " disabled"} title="${ue(e("Touche-la pour la casser."))}" aria-label="${ue(e(Fe().GEODES[F]))}">
        <span class="ug-vgeo-art"><img src="${wt(F)}" alt=""></span><b class="ug-vgeo-q">×${H(nn)}</b><small>${ue(e(Fe().GEODES[F]))}</small></button>`,
      ).join(""),
      la = Et(st.sort((nn, F) => F.n - nn.n || nn.id.localeCompare(F.id))),
      Xa = (nn) => (nn > 1 ? e("{n} gemmes", { n: H(nn) }) : e("{n} gemme", { n: H(nn) }));
    return [
      `<div class="zone-box ug-geos"><div class="zone-head"><b>${e("Géodes")}</b>${t.UI.helpTip(e("Géodes"), e("Les murs et les gardiens en donnent. Touche une géode pour la casser : elle révèle une gemme d'un type, et peut monter d'une rareté pendant que tu la frappes."))}<span class="muted">${H(Zt)}</span>
        ${Zt > 1 ? `<button class="btn small gold ug-all" data-ug-all${sa ? " disabled" : ""}>${e("Tout ouvrir")}</button>` : ""}</div>
        <div class="ug-vit" style="background-image:url(assets/bg/underground/crystal.png)">${Da}</div></div>`,
      `<div class="zone-box bag-box ug-bag"><div class="zone-head"><b>${e("Sac de gemmes")}</b><span class="muted">${va ? Xa(va) : ""}</span></div>
        ${la.length ? la.map(([nn, F]) => `<div class="bag-group"><small class="bag-label">${e(Ra[nn])}</small><div class="bag-grid">${F.map(({ id: Ce, n: Xe }) => gn(Ce, Xe, "", ` data-tip="m${Ce}"`)).join("")}</div></div>`).join("") : `<p class="ug-gm-none">${e("Casse une géode pour trouver ta première gemme.")}</p>`}
        <div class="bag-tip" hidden></div></div>`,
    ];
  }
  const gn = (Ue, Bt, st = "", Zt = "") =>
      `<button class="bag-cell ug-gem t${$().gemTier(Ue)}${st}"${Zt} aria-label="${ue($().gemName(Ue))}"><img src="${t.UI.itemSrc("gem-" + $().gemType(Ue))}" alt="">${Bt != null ? `<span class="bag-qty">×${H(Bt)}</span>` : ""}</button>`,
    yn = (Ue) => ue(e(t.TYPES[$().gemType(Ue)]?.fr || $().gemType(Ue))),
    mn = (Ue) =>
      e("Pour un Pokémon de type {type} et de rareté {rarity}, au niveau 100.", {
        type: yn(Ue),
        rarity: e(Ra[$().gemTier(Ue)]),
      }),
    ln = (Ue) =>
      `<p>${e("Rang +1 pour un Pokémon {type} {rarity} niveau 100 : stats +{p} %, retour au niveau 5.", { type: yn(Ue), rarity: e(Ra[$().gemTier(Ue)]).toLocaleLowerCase(t.I18n?.lang || "fr"), p: Math.round((X().RANK_STAT - 1) * 100) })}</p>` +
      In(Ue);
  function In(Ue) {
    const st = Ze.S.mons.filter(
      (Zt) => Zt.level >= x.MAX_LEVEL && (Zt.rank || 0) < X().RANK_MAX && $().gemKeys(Zt.id).includes(Ue),
    );
    return st.length
      ? `<div class="gem-fits">${st
          .slice(0, 8)
          .map(
            (Zt) =>
              `<span title="${he(Zt.id)}">${vt(Zt.id, Zt.shiny, t.UI.tileScale(Zt.id, 22, 28), 30)}</span>`,
          )
          .join("")}${st.length > 8 ? `<b>+${st.length - 8}</b>` : ""}</div>`
      : `<p class="gem-none">${e("Aucun de tes Pokémon pour l'instant.")}</p>`;
  }
  function xe(Ue) {
    const Bt = Ze.S.under?.gems?.[Ue] || 0,
      st = Ze.S.mons
        .filter(
          (va) => va.level >= x.MAX_LEVEL && (va.rank || 0) < X().RANK_MAX && $().gemKeys(va.id).includes(Ue),
        )
        .map((va) => ({ m: va, need: (va.rank || 0) + 1 }))
        .sort((va, Da) => (Da.need <= Bt) - (va.need <= Bt) || va.need - Da.need),
      Zt = st.filter((va) => va.need <= Bt).length;
    return `<div class="ug-rk"><h4>${e("Peuvent monter en rang")}<em><b>${H(Zt)}</b> / ${H(st.length)}</em></h4>
      ${st.length ? `<div class="ug-rk-grid">${st.map(({ m: va, need: Da }) => `<button class="ug-rk-mon${Da > Bt ? " short" : ""}" data-uid="${va.uid}" title="${he(va.id)}">${t.UI.rankTag(va)}${vt(va.id, va.shiny, t.UI.tileScale(va.id, 36, 44), 48)}<small>×${Da}</small></button>`).join("")}</div>` : `<p class="gem-none">${e("Aucun de tes Pokémon pour l'instant.")}</p>`}</div>`;
  }
  Object.assign(t.UI.ftip, {
    gem: (Ue) => `<b>${ue($().gemName(Ue))}</b>${ln(Ue)}`,
    geode: (Ue) =>
      `<b>${ue(e(Fe().GEODES[+Ue]))}</b><p>${e("À casser dans l'onglet Géodes : elle donne une gemme.")}</p>`,
    plate: (Ue) =>
      `<b>${ue(e(Fe().PLATES[Ue]))}</b><p>${$().arceusOut() ? e("À donner à un Arceus, depuis sa fiche") : e("Une plaque ancienne. Son usage reste un mystère.")}</p>`,
    fossil: (Ue) =>
      `<b>${ue(t.UI.itemName(ge[Ue] || "old-amber"))}</b><p>${e("Ranimé en {mon} au retour de l'expédition.", { mon: he(+Ue) })}</p>`,
  });
  const Et = (Ue) =>
    [3, 2, 1, 0].map((Bt) => [Bt, Ue.filter((st) => $().gemTier(st.id) === Bt)]).filter((Bt) => Bt[1].length);
  function oa(Ue) {
    for (const Bt of Ue.querySelectorAll(".bag-box")) {
      const st = Bt.querySelector(":scope > .bag-tip"),
        Zt = (va) => {
          if (!va) {
            st.hidden = !0;
            return;
          }
          const Da = va.dataset.tip,
            la = Ze.S.under || {};
          if (Da[0] === "g") {
            const Xe = +Da.slice(1);
            st.innerHTML = `<b>${ue(e(Fe().GEODES[Xe]))}</b> <span class="muted">×${H(la.geodes?.[Xe] || 0)}</span><p>${e("Touche-la pour la casser.")}</p>`;
          } else {
            const Xe = Da.slice(1);
            st.innerHTML = `<b>${ue($().gemName(Xe))}</b> <span class="muted">×${H(la.gems?.[Xe] || 0)}</span>${ln(Xe)}`;
          }
          st.hidden = !1;
          const Xa = Bt.getBoundingClientRect(),
            nn = va.getBoundingClientRect(),
            F = st.offsetHeight,
            Ce = nn.top - F - 6 >= t.UI.safeTop() + 8;
          (st.classList.toggle("above", Ce),
            (st.style.top = (Ce ? nn.top - Xa.top - F - 6 : nn.bottom - Xa.top + 6) + "px"),
            (st.style.left =
              Math.max(
                8,
                Math.min(
                  nn.left - Xa.left + nn.width / 2 - st.offsetWidth / 2,
                  Xa.width - st.offsetWidth - 8,
                ),
              ) + "px"));
        };
      ((Bt.onpointerover = (va) => {
        va.pointerType === "mouse" && Zt(va.target.closest(".bag-cell"));
      }),
        (Bt.onpointerleave = (va) => {
          va.pointerType === "mouse" && Zt(null);
        }),
        (Bt.onclick = (va) => {
          const Da = va.target.closest(".ug-gem");
          (Zt(null), Da && ss(Da.dataset.tip.slice(1)));
        }));
    }
  }
  let sa = !1;
  const Ga = (Ue) =>
      Ge(e("+1 {name}", { name: ue($().gemName(Ue.key)) }), t.UI.itemSrc("gem-" + Ue.type), "reward"),
    cn = (Ue, Bt) =>
      Promise.resolve()
        .then(() => t.GeodeFx.play(Ue, $().theme(0).key, Bt))
        .then(
          () => !0,
          (st) => (console.warn("GeodeFx", st), !1),
        );
  async function Tn(Ue) {
    if (sa) return;
    const Bt = $().openGeode(Ue);
    if (Bt) {
      ((sa = !0), Qe());
      try {
        (await cn(Bt)) || Ga(Bt);
      } finally {
        ((sa = !1), Qe());
      }
    }
  }
  async function Mn() {
    if (sa) return;
    const Ue = $().openAll();
    if (!Ue.length) return;
    ((sa = !0), Qe());
    const Bt = (Zt) => Zt.to * 100 + (Zt.to > Zt.from) * 10 + Zt.isNew,
      st = Ue.reduce((Zt, va) => (Bt(va) > Bt(Zt) ? va : Zt));
    try {
      const Zt = await cn(st, Ue.length > 1 ? e("Voir les {n} gemmes", { n: H(Ue.length) }) : null);
      Ue.length > 1 ? await ks(Ue) : Zt || Ga(st);
    } finally {
      ((sa = !1), Qe());
    }
  }
  function ks(Ue) {
    const Bt = new Map();
    for (const la of Ue) {
      const Xa = Bt.get(la.key) || { id: la.key, n: 0, isNew: !1, up: !1 };
      (Xa.n++, (Xa.isNew ||= la.isNew), (Xa.up ||= la.to > la.from), Bt.set(la.key, Xa));
    }
    const st = [...Bt.values()].sort(
        (la, Xa) => Xa.isNew - la.isNew || Xa.up - la.up || Xa.n - la.n || la.id.localeCompare(Xa.id),
      ),
      Zt = Ue.filter((la) => la.to > la.from).length,
      va = st.filter((la) => la.isNew).length,
      Da = (la, Xa) => `<div class="dc-fact">${la}<b>${Xa}</b></div>`;
    return Je({
      className: "dexcard-modal oc-modal ug-back ug-recap",
      body: `<div class="dc-head"><h2>${e("Géodes ouvertes")}</h2><div class="dc-sum"><button class="dc-x" aria-label="${e("Fermer")}">✕</button></div></div>
        <div class="dc-facts oc-facts">${Da(e("Géodes"), H(Ue.length))}${Da(e("Montées de rareté"), H(Zt))}${Da(e("Nouvelles gemmes"), H(va))}</div>
        ${Et(st)
          .map(
            ([
              la,
              Xa,
            ]) => `<div class="oc-sec"><h4>${e(Ra[la])}<em><b>${H(Xa.reduce((nn, F) => nn + F.n, 0))}</b></em></h4>
          <div class="bag-grid">${Xa.map((nn) => gn(nn.id, nn.n, `${nn.isNew ? " is-new" : ""}${nn.up ? " up" : ""}`, ` tabindex="-1" title="${ue($().gemName(nn.id))}${nn.up ? " · " + ue(e("Montée de rareté")) : ""}"`).replace("</button>", `${nn.isNew ? '<span class="ug-new">NEW</span>' : ""}${nn.up ? '<span class="ug-up">▲</span>' : ""}</button>`)).join("")}</div></div>`,
          )
          .join("")}`,
      actions: [{ label: e("Super !"), cls: "gold", value: !0 }],
      onOpen: (la, Xa) => {
        a(".dc-x", la).onclick = () => Xa(null);
      },
    });
  }
  async function ss(Ue, Bt) {
    const st = Ze.S.under?.gems?.[Ue] || 0;
    if (!st) return;
    const Zt = X().GEM_SHARDS[$().gemTier(Ue)],
      va = [...new Set([1, 10, st].filter((Ve) => Ve <= st))];
    let Da = va.includes(Bt) ? Bt : va[0];
    const la = (Ve, Rt) => `<div class="dc-fact">${Ve}<b>${Rt}</b></div>`,
      Xa = gt(t.UI.itemSrc("event-shard")),
      nn = () => `+${H(Da * Zt)} ${Xa}`;
    if (
      !(await Je({
        className: "dexcard-modal ug-dlg",
        body: `<div class="dc-head"><h2>${ue($().gemName(Ue))}</h2><div class="dc-sum"><button class="dc-x" aria-label="${e("Fermer")}">✕</button></div></div>
        <div class="ug-dlg-top"><div class="ug-dlg-hero">${gn(Ue, null, "", ' tabindex="-1"')}</div><div class="dc-id"><div class="genus">${mn(Ue)}</div>
          <div class="dc-facts">${la(e("En stock"), "×" + H(st))}${la(e("Tu reçois"), `<span class="ug-get">${nn()}</span>`)}${la(e("Tes Éclats"), `${H($().shards())} ${Xa}`)}</div></div></div>
        ${va.length > 1 ? `<div class="ug-dlg-n"><span>${e("Combien ?")}</span><div class="seg">${va.map((Ve) => `<button data-n="${Ve}"${Ve === Da ? ' class="on"' : ""}>${Ve === st ? e("Toutes ({n})", { n: H(Ve) }) : "×" + H(Ve)}</button>`).join("")}</div></div>` : ""}
        ${xe(Ue)}`,
        actions: [
          { label: e("Fermer"), cls: "ghost", value: 0 },
          { label: e("Recycler…"), cls: "outline", value: 1 },
        ],
        onOpen: (Ve, Rt) => {
          a(".dc-x", Ve).onclick = () => Rt(0);
          const da = [...Ve.querySelectorAll(".ug-rk-mon")].map((ia) => ia.dataset.uid);
          (Ve.querySelectorAll(".ug-rk-mon").forEach(
            (ia) =>
              (ia.onclick = () => {
                (Rt(0), t.UI.monDetail(ia.dataset.uid, da));
              }),
          ),
            Ve.querySelectorAll(".seg button").forEach(
              (ia) =>
                (ia.onclick = () => {
                  ((Da = +ia.dataset.n),
                    Ve.querySelectorAll(".seg button").forEach((Ja) => Ja.classList.toggle("on", Ja === ia)),
                    (a(".ug-get", Ve).innerHTML = nn()));
                }),
            ));
        },
      }))
    )
      return;
    const Ce = await us(Ue, Da, Da * Zt);
    if (Ce === !1) return ss(Ue, Da);
    if (!Ce) return;
    const Xe = $().recycleGems(Ue, Da);
    Xe && (Ge(e("+{n} Éclats", { n: H(Xe) }), t.UI.itemSrc("event-shard"), "reward"), Qe());
  }
  function us(Ue, Bt, st) {
    const Zt = ue($().gemName(Ue)),
      va =
        Bt > 1
          ? e("Recycler <b>{n} × {gem}</b> contre <b>{shards} Éclats</b> ?", {
              n: H(Bt),
              gem: Zt,
              shards: H(st),
            })
          : st > 1
            ? e("Recycler <b>1 {gem}</b> contre <b>{shards} Éclats</b> ?", { gem: Zt, shards: H(st) })
            : e("Recycler <b>1 {gem}</b> contre <b>1 Éclat</b> ?", { gem: Zt });
    return Je({
      className: "ug-conf",
      body: `<div class="ug-dlg-hero">${gn(Ue, null, "", ' tabindex="-1"')}</div><p class="ug-conf-q">${va}</p><p class="ot-warn">${e("Une gemme recyclée ne revient pas.")}</p>`,
      actions: [
        { label: e("Garder"), cls: "ghost", value: !1 },
        { label: e("Recycler"), cls: "danger", value: !0 },
      ],
    });
  }
  function Xn(Ue) {
    const Bt = $().shards(),
      st = (Zt) => {
        const va = $().gemPrice(Zt),
          Da = Ze.S.under?.gems?.[Zt] || 0;
        return `<div class="sh-item sh-prize ug-row t${$().gemTier(Zt)}" data-id="${ue(Zt)}"><div class="sh-top">
        <div class="sh-ic" tabindex="0" data-ftip="gem:${ue(Zt)}"><img src="${t.UI.itemSrc("gem-" + $().gemType(Zt))}" alt="">${Da ? `<span class="have">×${H(Da)}</span>` : ""}</div>
        <div class="sh-name"><h4>${yn(Zt)}</h4><small>${e(Ra[$().gemTier(Zt)])}</small></div>
        <button class="btn gold" data-buy="${ue(Zt)}"${Bt < va ? " disabled" : ""}><img src="${t.UI.itemSrc("event-shard")}" alt="">${H(va)}</button></div></div>`;
      };
    return Ue.length
      ? Ue.map(st).join("")
      : `<p class="ug-gm-none">${e("Aucun de tes Pokémon n'a encore de gemme possible.")}</p>`;
  }
  const Dn = (
    Ue,
  ) => `<span class="ug-offer-t">${e("Nouvelle sélection dans {t}", { t: `<b>${yt(Ue.ends - Ze.time() + 59999)}</b>` })}</span>
    <button class="btn small" data-ug-reroll${$().money() < Ue.cost ? " disabled" : ""}>${e("Changer · {p} ₽", { p: H(Ue.cost) })}</button>`;
  function ls() {
    const Ue = $().reroll();
    if (Ue.error) return Ge(Ue.error);
    Qe();
  }
  async function Hn() {
    if (
      !(await t.UI.confirm(
        e("Ouvrir un emplacement d'expédition de plus pour {n} Éclats ?", { n: H($().slotPrice()) }),
        e("Ouvrir"),
      ))
    )
      return;
    const Ue = $().buySlot();
    if (Ue.error) return Ge(Ue.error);
    (t.Sfx?.buy?.(),
      Ge(e("Nouvel emplacement ouvert !"), t.UI.itemSrc("event-shard"), "reward"),
      t.App.refresh(),
      Qe());
  }
  function Kn(Ue) {
    $().buyGem(Ue) &&
      (Ge(e("+1 {name}", { name: ue($().gemName(Ue)) }), t.UI.itemSrc("gem-" + $().gemType(Ue)), "reward"),
      Qe());
  }
  function Sn() {
    return $().unlocked()
      ? ""
      : t.STORY.regionUnlocked("sinnoh", Ze.S.adv)
        ? e("Obtiens le Badge {b} pour l'ouvrir", { b: e(X().OPEN_BADGE) })
        : e("Plus loin dans l'aventure");
  }
  const ns = () =>
    $().unlocked()
      ? $()
          .slots()
          .filter((Ue) => $().progress(Ue).done).length
      : 0;
  t.Screens.underground = {
    render: Qe,
    lockWhy: Sn,
    readyCount: ns,
    enter() {
      (clearInterval(it),
        (it = Ss(() => {
          if (!Z()) {
            (clearInterval(it), (it = 0));
            return;
          }
          document.hidden || Qe();
        }, 1e3)),
        Kt());
    },
    leave() {
      (clearInterval(it), (it = 0), (ve = null));
    },
  };
})();
