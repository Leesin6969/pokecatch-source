/**
 * ui core
 *
 * Public API on the game namespace `t`: t.Screens, t.UI
 *
 * Recovered from the shipped bundle — original chunk #44 at byte 988788 (81297 bytes, sha256:02d66d32786ff05a).
 * This file is one original source file; the build concatenates them in filename order.
 */
(function () {
  const a = t.CONFIG,
    b = t.Game,
    f = (F, Ce = document) => Ce.querySelector(F),
    ue = (F, Ce = document) => [...Ce.querySelectorAll(F)],
    H = (F) => {
      const Ce = document.createElement("template");
      return ((Ce.innerHTML = F.trim()), Ce.content.firstElementChild);
    },
    vt = (F) => Math.floor(F).toLocaleString(t.I18n?.lang || "fr"),
    B = (F) => String(F).padStart(3, "0"),
    se = (F) =>
      t.UNOWN?.isUnown(F)
        ? t.UNOWN.letterOf(F)
        : t.FORMS?.isForm(F)
          ? "ABCDEFGHIJKLMNOPQRSTUVWXYZ"[
              t.FORMS.LIST.filter((Ce) => Ce.base === t.FORMS.baseOf(F)).findIndex((Ce) => Ce.id === F)
            ]
          : null,
    Ge = (F) => (t.FORMS?.isForm(F) ? t.FORMS.baseOf(F) : F),
    Je = (F) => {
      const Ce = se(F);
      return B(t.POKEDEX.find((Xe) => Xe.id === F)?.num ?? F) + (Ce ? "-" + Ce : "");
    };
  let Ze = 0,
    x = 0;
  const $ = new Set(),
    X = () => (Ze ? null : x),
    Tt = (F) =>
      new Promise((Ce) => {
        if (Ze) return Wa(Ce, 0);
        const Xe = () => {
            (clearTimeout(Ve), $.delete(Xe), Ce());
          },
          Ve = Wa(Xe, F);
        $.add(Xe);
      });
  let le = 0;
  const P = () => {
    if ((clearTimeout(le), (le = 0), !!Ze)) {
      [...$].forEach((F) => F());
      for (const F of document.getAnimations())
        try {
          isFinite(F.effect.getComputedTiming().endTime) && F.finish();
        } catch {}
      le = Wa(P, 16);
    }
  };
  function u(F) {
    const Ce = { skipped: !1, waiters: [] },
      Xe = H(`<button class="btn ghost fx-skip">${e("Passer")} ⏭</button>`);
    ((Xe.onpointerdown = (Rt) => Rt.stopPropagation()),
      (Xe.onclick = (Rt) => {
        (Rt.stopPropagation(),
          !Ce.skipped &&
            ((Ce.skipped = !0), Ze++, x++, Ce.hide(), P(), Ce.waiters.splice(0).forEach((da) => da())));
      }),
      F.appendChild(Xe),
      (Ce.hide = () => {
        Xe.dataset.gone || ((Xe.dataset.gone = "1"), (Xe.disabled = !0));
      }),
      (Ce.tap = (Rt, da) => (
        Ce.hide(),
        Ce.skipped
          ? Promise.resolve()
          : new Promise((ia) => {
              (Ce.waiters.push(ia), Rt.addEventListener("pointerdown", ia, { once: !0 }), da && Wa(ia, da));
            })
      )));
    const Ve = (Rt) => {
      Rt.key !== "Escape" ||
        !Xe.isConnected ||
        (Rt.preventDefault(),
        Rt.stopImmediatePropagation(),
        Xe.dataset.gone ? Ce.waiters.splice(0).forEach((da) => da()) : Xe.click());
    };
    return (
      document.addEventListener("keydown", Ve, !0),
      (Ce.end = () => {
        (document.removeEventListener("keydown", Ve, !0),
          Xe.remove(),
          Ce.skipped && ((Ce.skipped = !1), Ze--));
      }),
      Ce
    );
  }
  const ve = (F) =>
      String(F).replace(/[&<>"]/g, (Ce) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;" })[Ce]),
    it = (F) =>
      String(F ?? "")
        .replace(/ß/g, "ss")
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .normalize("NFC")
        .toLowerCase()
        .trim(),
    De = (F, Ce) => `assets/pokemon/${Ce ? "shiny/" : ""}${F}.png`,
    je = new Set([144, 145, 146, 150, 151, 243, 244, 245, 249, 250, 251]),
    pt = 493,
    re = (F) => F <= pt || t.SPECIALS.has(F) || !!t.FORMS?.isForm(F),
    We = (F) => re(F) || je.has(F),
    oe = (F, Ce, Xe) =>
      re(F)
        ? `assets/pokemon/art/${Ce ? "shiny/" : ""}${Xe ? `still/${F}.png` : `${F}.gif`}`
        : !Xe && !Ce && je.has(F)
          ? `assets/pokemon/anim/${F}.gif`
          : De(F, Ce),
    $e = (F, Ce) => oe(F, Ce),
    Z = (F, Ce, { still: Xe = !1, k: Ve = 2, fit: Rt = 0, cls: da = "", center: ia = !1 } = {}) => {
      if (!We(F) || (Ce && !re(F)))
        return `<img class="art box ${da}" src="${De(F, Ce)}" alt="" style="width:${68 * Ve * 1.5}px">`;
      const Ja = ia && re(F) && t.SPRITE_BOUNDS?.[oe(F, Ce, !0)];
      return `<img class="art ${da}" src="${oe(F, Ce, Xe)}" alt=""${Ja ? ` data-b="${Ja.join(",")}"` : ""} style="visibility:hidden" onload="pcArtFit(this, ${Ve}, ${Rt})">`;
    };
  function A(F, Ce, Xe) {
    const Ve = F.naturalWidth,
      Rt = F.naturalHeight;
    (Xe && (Ce = Math.max(1, Math.min(Ce, Math.floor(Xe / Math.max(Ve, Rt))))),
      (F.style.width = Ve * Ce + "px"));
    const da = F.dataset.b?.split(",").map(Number),
      ia = da && Math.min(F.clientWidth / Ve, F.clientHeight / Rt);
    (ia &&
      (F.style.translate = `${Math.round(((Ve - da[0] - da[2]) / 2) * ia)}px ${Math.round(((Rt - da[1] - da[3]) / 2) * ia)}px`),
      (F.style.visibility = ""));
  }
  Object.defineProperty(globalThis, "pcArtFit", { value: A });
  const J = (F, Ce, Xe, Ve) => {
      F && !F.classList.contains("box") && (F.src = oe(Ce, Xe, !Ve));
    },
    de = (F, Ce) => {
      const Xe = t.SPRITE_BOUNDS?.[De(F)],
        Ve = U[F] || (Xe ? { cx: (Xe[0] + Xe[2]) / 2, cy: (Xe[1] + Xe[3]) / 2 } : { cx: 34, cy: 33 });
      return `translate(${Math.round(34 - Ve.cx) * Ce}px, ${Math.round(28 - Ve.cy) * Ce}px)`;
    },
    _e = (F, Ce = "", Xe = "base", Ve = "") => {
      const Rt = t.Frames,
        da = Rt ? (Xe === !0 ? Rt.mine() : Rt.valid(Xe)) : "base";
      return `<span class="tr-face ${Ce}" data-frame="${da}"${Rt?.tint(da) ? " data-tint" : ""}${Ve}><span class="tr-win"><img src="assets/trainers/still/${/^[\w-]+$/.test(F || "") ? F : "red"}.png" alt=""></span>${Rt?.spin(da) ? '<i class="fr-ring"></i>' : ""}<i class="fr"></i></span>`;
    },
    Re = ["", "I", "II", "III", "IV", "V"],
    dt = (F, Ce = "") =>
      F?.rank
        ? `<span class="rk-n${Ce ? " " + Ce : ""}" title="${e("Rang {r}", { r: Re[F.rank] })}">${Re[F.rank]}</span>`
        : "",
    qe = (F) => {
      if (!b.S.link || !F || b.groupOf(F.reg) === b.S.link.side) return "";
      const Ce = t.STORY.REGIONS.find((da) => da.key === b.regOf(F)),
        Xe = b.can(F);
      if (Xe)
        return `<span class="tip-host rlock-tip" tabindex="0" title=""><img class="rlock" src="assets/ui/padlock.svg" alt=""><span class="bag-tip info-tip-box" role="tooltip"><b>${ve(e(Ce?.name || ""))}</b><p>${ve(Xe)}</p></span></span>`;
      if (!Ce) return "";
      const Ve = parseInt(Ce.color.slice(1), 16);
      return `<span class="rtag${(0.299 * (Ve >> 16) + 0.587 * ((Ve >> 8) & 255) + 0.114 * (Ve & 255)) / 255 > 0.6 ? " light" : ""}" style="--rc:${Ce.color}">${ve(e(Ce.name).slice(0, 2).toUpperCase())}</span>`;
    },
    ce = (F) => (b.S.link && F && b.groupOf(F) !== b.S.link.side ? b.homeKey(F) : null),
    tt = (F) => e(t.STORY.REGIONS.find((Ce) => Ce.key === F)?.name || ""),
    mt = (F) => (F === "to" ? tt(b.S.link?.to) : e("Régions liées")),
    Te = (F) =>
      b.S.link
        ? `<span class="side-seg" title="${ve(e("Jusqu'à la Ligue de {region}, chaque côté a ses Pokémon et ses ₽.", { region: mt("to") }))}"><span class="seg">${["from", "to"].map((Ce) => `<button type="button" class="${F === Ce ? "on" : ""}" data-side="${Ce}">${ve(mt(Ce))}</button>`).join("")}</span></span>`
        : "";
  function At(F, Ce = "joins") {
    const Xe = ce(F);
    if (!Xe) return "";
    const Ve = { reg: tt(Xe), to: tt(b.S.link.to) };
    return e(
      Ce === "lives"
        ? "Vit à {reg} : ses œufs y écloront."
        : Ce === "egg"
          ? "Éclora à {reg}."
          : "Rejoint {reg} : il combat là-bas, et partout après la Ligue de {to}.",
      Ve,
    );
  }
  const yt = '<img src="assets/ui/town-map.png" alt="🗺">',
    he = (F, Ce, Xe = "") =>
      ce(F)
        ? `<span class="tip-host map-mark ${Xe}" tabindex="0" title="">${yt}<span class="bag-tip info-tip-box" role="tooltip"><b>${ve(tt(ce(F)))}</b><p>${ve(At(F, Ce))}</p></span></span>`
        : "",
    fe = (F, Ce = "") => (ce(F) ? `<span class="map-mark plain ${Ce}">${yt}</span>` : ""),
    Oe = (F, Ce, Xe = 2, Ve = 56 * Xe * 0.8, Rt = "", da = !1) =>
      `<div class="sprbox ${Rt}" style="height:${Math.round(Ve)}px"><img src="${De(F, Ce)}" alt=""${da ? ' loading="lazy" decoding="async"' : ""} data-id="${F}" data-k="${Xe}" style="width:${68 * Xe}px;height:${56 * Xe}px;transform:${de(F, Xe)}"></div>`,
    Ee = new Map();
  function et(F) {
    for (const Ce of F) {
      const Xe = De(Ce.id, Ce.shiny);
      if (Ee.has(Xe)) continue;
      const Ve = new Image();
      (Ve.setAttribute("src", Xe), Ve.decode().catch(() => {}), Ee.set(Xe, Ve));
    }
  }
  function _(F, Ce = !1) {
    if (!b.DEX[F?.id]) return "";
    const Xe = !!b.S.dex[F.id] || !!b.S.seen?.[F.id],
      Ve = Xe && !!F.shiny;
    return `<span class="dc-hero fr-mon${Xe ? "" : " unknown"}" style="--m:40" title="${Xe ? ve(b.DEX[F.id].name) : "???"}">${Ve ? `<img class="mon-sh" src="assets/ui/sparkle.svg" alt="${e("Chromatique")}">` : ""}${dt(F)}${Oe(F.id, Ve, 1, 36)}${Ce && F.level ? `<span class="rt-lv">${e("Nv. {n}", { n: F.level })}</span>` : ""}</span>`;
  }
  const we = (F, Ce = 28, Xe = 44) => {
      const Ve = t.SPRITE_BOUNDS?.[De(F)],
        Rt = U[F] || (Ve && { x0: Ve[0], x1: Ve[2], y0: Ve[1], y1: Ve[3] }),
        da = Rt?.x1 != null && Rt?.x0 != null ? Math.max(Rt.x1 - Rt.x0, Rt.y1 - Rt.y0) : 30;
      return Math.min(Xe, Math.max(Ce, da * 1.3)) / da;
    },
    ie = (F, Ce) => {
      const Xe = t.SPRITE_BOUNDS?.[De(F)],
        Ve = U[F] || (Xe && { x0: Xe[0], x1: Xe[2], y0: Xe[1], y1: Xe[3] });
      return (Ve?.x1 != null && Ve?.x0 != null ? Math.max(Ve.x1 - Ve.x0, Ve.y1 - Ve.y0) : 40) * 2 <= Ce
        ? 2
        : 1;
    },
    U = {},
    Ne = (F) =>
      document.querySelectorAll(`.sprbox img[data-id="${F}"]`).forEach((Ce) => {
        Ce.style.transform = de(F, +Ce.dataset.k);
      });
  function T(F) {
    const Ce = t.POKEDEX.filter((da) => {
      const ia = t.SPRITE_BOUNDS?.[De(da.id)];
      return (
        ia &&
          (U[da.id] = {
            cx: (ia[0] + ia[2]) / 2,
            cy: (ia[1] + ia[3]) / 2,
            x0: ia[0],
            x1: ia[2],
            y0: ia[1],
            y1: ia[3],
          }),
        !ia
      );
    });
    let Xe = Ce.length;
    if (!Xe) return void Wa(() => F?.());
    const Ve = document.createElement("canvas");
    ((Ve.width = 68), (Ve.height = 56));
    const Rt = Ve.getContext("2d", { willReadFrequently: !0 });
    for (const da of Ce) {
      const ia = new Image();
      ((ia.onload = ia.onerror =
        () => {
          try {
            (Rt.clearRect(0, 0, 68, 56), Rt.drawImage(ia, 0, 0));
            const Ja = Rt.getImageData(0, 0, 68, 56).data;
            let Ia = 68,
              ka = 0,
              Za = 56,
              En = 0;
            for (let bn = 0; bn < 56; bn++)
              for (let an = 0; an < 68; an++)
                Ja[(bn * 68 + an) * 4 + 3] > 10 &&
                  (an < Ia && (Ia = an), an > ka && (ka = an), bn < Za && (Za = bn), bn > En && (En = bn));
            ka >= Ia &&
              ((U[da.id] = {
                cx: (Ia + ka + 1) / 2,
                cy: (Za + En + 1) / 2,
                x0: Ia,
                x1: ka + 1,
                y0: Za,
                y1: En + 1,
              }),
              Ne(da.id));
          } catch {}
          --Xe === 0 && F?.();
        }),
        (ia.src = De(da.id)));
    }
  }
  const L = {};
  function R(F) {
    return L[F]
      ? L[F]
      : (L[F] = new Promise((Ce) => {
          const Xe = new Image();
          ((Xe.onload = () => {
            try {
              const Ve = Xe.naturalWidth,
                Rt = Xe.naturalHeight,
                da = document.createElement("canvas");
              ((da.width = Ve), (da.height = Rt));
              const ia = da.getContext("2d");
              ia.drawImage(Xe, 0, 0);
              const Ja = ia.getImageData(0, 0, Ve, Rt).data;
              let Ia = Ve,
                ka = -1,
                Za = Rt,
                En = -1;
              for (let wn = 0; wn < Rt; wn++)
                for (let Bn = 0; Bn < Ve; Bn++)
                  Ja[(wn * Ve + Bn) * 4 + 3] > 10 &&
                    (Bn < Ia && (Ia = Bn), Bn > ka && (ka = Bn), wn < Za && (Za = wn), wn > En && (En = wn));
              if (ka < 0) return Ce({ url: F, w: Ve, h: Rt });
              const bn = ka - Ia + 1,
                an = En - Za + 1,
                Wn = document.createElement("canvas");
              ((Wn.width = bn),
                (Wn.height = an),
                Wn.getContext("2d").drawImage(Xe, Ia, Za, bn, an, 0, 0, bn, an),
                Ce({ url: Wn.toDataURL(), w: bn, h: an }));
            } catch {
              const Ve = t.SPRITE_BOUNDS?.[F]?.[1] || 0;
              Ce({ url: F, w: Xe.naturalWidth, h: Xe.naturalHeight, top: Ve });
            }
          }),
            (Xe.onerror = () => Ce({ url: F, w: 68, h: 56 })),
            (Xe.src = F));
        }));
  }
  const te = 80,
    K = 100,
    He = (F) =>
      L[F] ||
      (L[F] = new Promise((Ce) => {
        const Xe = new Image();
        ((Xe.onload = () => {
          const Ve = Xe.naturalWidth,
            Rt = Xe.naturalHeight,
            da = F.startsWith("assets/trainers/") && Rt > K ? te / Rt : 1;
          Ce({ url: F, w: Math.round(Ve * da), h: Math.round(Rt * da) });
        }),
          (Xe.onerror = () => Ce({ url: F, w: 68, h: 56 })),
          (Xe.src = F));
      }));
  async function m(F, Ce, Xe = "--k") {
    F.style.visibility = "hidden";
    const Ve = await (Ce.startsWith("assets/trainers/") || Ce.endsWith(".gif") ? He(Ce) : R(Ce));
    return (
      (F.src = Ve.url),
      (F.style.width = `calc(${Ve.w}px * var(${Xe}))`),
      (F.style.height = `calc(${Ve.h}px * var(${Xe}))`),
      F.parentElement?.style.setProperty("--sprite-top", `calc(${Ve.top || 0}px * var(${Xe}))`),
      (F.style.visibility = ""),
      Ve
    );
  }
  function z(F, Ce) {
    const Xe = [],
      Ve = (ia, Ja) => Xe.push(Wa(ia, Ja)),
      Rt = (ia) => (b.capped(ia) ? 100 : Math.min(100, (ia.xp / b.xpForNext(ia.level, ia)) * 100)),
      da = t.CHEAT?.noAnim || b.S.reducedAnim || matchMedia("(prefers-reduced-motion: reduce)").matches;
    return (
      Ce.forEach(({ m: ia, n: Ja }, Ia) => {
        const ka = f(`[data-i="${Ia}"]`, F),
          Za = f(".xpb i", ka),
          En = f(".lvl", ka),
          bn = ia.level - Ja,
          an = Rt(ia);
        if (da) {
          ((En.textContent = e("Nv. {n}", { n: ia.level })), (Za.style.width = an + "%"));
          return;
        }
        const Wn = (C) => 70 + 530 * Math.pow(Ja > 1 ? C / (Ja - 1) : 1, 2.2);
        let wn = 0;
        Za.style.width = "0%";
        const Bn = () => {
          if (wn === Ja) {
            ((Za.style.transition = "width 900ms cubic-bezier(.15,.7,.3,1)"), (Za.style.width = an + "%"));
            return;
          }
          const C = Wn(wn);
          ((Za.style.transition = `width ${C}ms ${wn === Ja - 1 ? "cubic-bezier(.3,.5,.6,1)" : "linear"}`),
            (Za.style.width = "100%"),
            Ve(() => {
              (wn++,
                (En.textContent = e("Nv. {n}", { n: bn + wn })),
                En.classList.add("bump"),
                ka.classList.remove("lvup"),
                ka.offsetWidth,
                ka.classList.add("lvup"),
                Ve(() => En.classList.remove("bump"), 180),
                (Za.style.transition = "none"),
                (Za.style.width = "0%"),
                Za.offsetWidth,
                Ve(Bn, 40));
            }, C));
        };
        Ve(Bn, 350 + Ia * 90);
      }),
      () => Xe.forEach(clearTimeout)
    );
  }
  const pe = "assets/ui/link-cable.svg",
    V = '<img class="lock-ic" src="assets/ui/padlock.svg" alt="">',
    lt = (F) =>
      a.PENSION.BERRIES[F]?.src ||
      (F === "link-cable" ? pe : F === "coin" ? "assets/ui/coin-case.png" : `assets/items/${F}.png`),
    kt = (F) => t.ITEM_NAMES[F] || F,
    ra = {
      1: ["#5cc5a0", "#2f7a5a"],
      4: ["#f08030", "#f8e070"],
      7: ["#68b0e0", "#c89850"],
      10: ["#78c050", "#f8d050"],
      13: ["#d8a040", "#e070a0"],
      16: ["#b08050", "#f0d8a0"],
      19: ["#9070b0", "#f0e0b0"],
      21: ["#b07050", "#f0a080"],
      23: ["#a060b0", "#f0d050"],
      25: ["#f8d030", "#8b5a2b"],
      27: ["#e0c070", "#a07040"],
      29: ["#90b0e0", "#4060a0"],
      32: ["#c080d0", "#8040a0"],
      35: ["#f8b8c8", "#a07060"],
      37: ["#d06030", "#f0b060"],
      39: ["#f8b8d0", "#60b0e0"],
      41: ["#5080c0", "#b070c0"],
      43: ["#4060a0", "#70c050"],
      46: ["#f08040", "#f0d050"],
      48: ["#8060a0", "#e05060"],
      50: ["#a07050", "#f0a0b0"],
      52: ["#f0e0b0", "#a07040"],
      54: ["#f0d050", "#f8f0d0"],
      56: ["#f0e0c8", "#a07050"],
      58: ["#f08030", "#403028"],
      60: ["#5080d0", "#f0f0f0"],
      63: ["#e0b040", "#905030"],
      66: ["#90a8c0", "#d0b090"],
      69: ["#f0e050", "#70c050"],
      72: ["#4090d0", "#e04040"],
      74: ["#a09070", "#605040"],
      77: ["#f0e0b0", "#f08030"],
      79: ["#f0a0b0", "#f0e0c0"],
      81: ["#b0b8c8", "#4080c0"],
      83: ["#b08860", "#70c050"],
      84: ["#b07848", "#f0d8a8"],
      86: ["#e0e8f0", "#f0a8b0"],
      88: ["#a070b0", "#503060"],
      90: ["#a080c0", "#e0e0e8"],
      92: ["#503870", "#a070c0"],
      95: ["#a0a0a0", "#606060"],
      96: ["#f0d050", "#a07050"],
      98: ["#e06040", "#f8e0c0"],
      100: ["#e04040", "#f0f0f0"],
      102: ["#f0d8d0", "#f0d050"],
      104: ["#c09060", "#e8e0d0"],
      106: ["#c09870", "#f0e0b0"],
      107: ["#c09870", "#e05060"],
      108: ["#f0a0b0", "#f0e0c0"],
      109: ["#9070a0", "#e0d090"],
      111: ["#a0a8b0", "#f0f0f0"],
      113: ["#f8b8c8", "#f0f0f0"],
      114: ["#4070b0", "#e05070"],
      115: ["#a08050", "#f0e0a0"],
      116: ["#60b0e0", "#f0e8b0"],
      118: ["#f0f0f0", "#f08040"],
      120: ["#c09060", "#e04050"],
      122: ["#f0b8c8", "#4080d0"],
      123: ["#70c060", "#f0f0d0"],
      124: ["#c03060", "#f0d050"],
      125: ["#f0d040", "#303030"],
      126: ["#f08040", "#f0d050"],
      127: ["#c0a080", "#f0f0f0"],
      128: ["#c09050", "#707070"],
      129: ["#f07040", "#f0e0a0"],
      131: ["#4090d0", "#e8e0d0"],
      132: ["#c090d0", "#f0d8f8"],
      133: ["#b07840", "#f0e0c0"],
      137: ["#f08090", "#60b0e0"],
      138: ["#60b0e0", "#f0e0b0"],
      140: ["#c08040", "#303030"],
      142: ["#c0a0d0", "#8060a0"],
      143: ["#306080", "#f0e8d0"],
      144: ["#60b0e0", "#e0f0ff"],
      145: ["#f0d040", "#f08030"],
      146: ["#f08030", "#f0d040"],
      147: ["#6090d0", "#f0f0f0"],
      150: ["#c0b0d0", "#9060b0"],
      151: ["#f8b8d0", "#f0e0f0"],
    };
  for (const [F, Ce] of [
    [172, 25],
    [173, 35],
    [174, 39],
    [236, 106],
    [238, 124],
    [239, 125],
    [240, 126],
  ])
    ra[F] = ra[Ce];
  const Vt = [
      "......oooo......",
      "....ooMMMMoo....",
      "...oMNNNMMMMo...",
      "..oMNNNNNMMMXo..",
      ".oMNNENNNNMMMXo.",
      ".ofNEHENNNMMMmo.",
      "oMMHHENNNNMffXXo",
      "oLMMEHHHHffLMXxo",
      "ofLMMNNNMMMMXxko",
      "oXffLMMMMMMLmmXo",
      ".oXffffffffmmXo.",
      ".oXXXLfffmxXXXo.",
      "..ommXXXXXXmmo..",
      "...oxmmmmmmxo...",
      "....ooXXXXoo....",
      "......oooo......",
    ],
    Xt = { x: 0.7, m: 1, n: 1.06, k: 1.1, l: 1.3, e: 1.45, f: 1.6, h: 1.95 },
    Ht = (F, Ce) =>
      "#" +
      [1, 3, 5]
        .map((Xe) => {
          const Ve = parseInt(F.slice(Xe, Xe + 2), 16);
          return Math.round(Ce > 1 ? Ve + (255 - Ve) * (Ce - 1) : Ve * Ce)
            .toString(16)
            .padStart(2, "0");
        })
        .join(""),
    ct = {};
  function wt(F) {
    const Ce = b.candyFamily(F);
    if (ct[Ce]) return ct[Ce];
    const [Xe, Ve] =
      ra[Ce] ||
      b.DEX[Ce].types
        .concat(b.DEX[Ce].types)
        .slice(0, 2)
        .map((ia) => Is[ia].color);
    let Rt = "";
    Vt.forEach((ia, Ja) =>
      [...ia].forEach((Ia, ka) => {
        if (Ia === ".") return;
        const Za = Ia.toLowerCase(),
          En = Ia === "o" ? "#292929" : Ht(Ia === Za ? Ve : Xe, Xt[Za]);
        Rt += `<rect x="${ka}" y="${Ja}" width="1" height="1" fill="${En}"/>`;
      }),
    );
    const da = `<svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 16 16" shape-rendering="crispEdges">${Rt}</svg>`;
    return (ct[Ce] = `data:image/svg+xml,${encodeURIComponent(da)}`);
  }
  const ge = (F) =>
      `<img class="candy-ic" src="${wt(F)}" alt="${e("Bonbon {name}", { name: ve(b.DEX[b.candyFamily(F)].name) })}" title="${e("Bonbon {name}", { name: ve(b.DEX[b.candyFamily(F)].name) })}">`,
    Fe = () => `<b class="xp-tag">${e("+XP")}</b>`,
    gt = (F) => (F || []).reduce((Ce, Xe) => Ce + Xe.amount, 0),
    Dt = (F = e("Copain")) => `<img class="buddy-ic" src="${lt("love-ball")}" alt="${F}" title="${F}">`,
    ha = (F, Ce) =>
      `<span class="type${Ce ? " sm" : ""}" data-type="${F}" style="--tc:${Is[F].color};background:var(--tc)">${Is[F].fr}</span>`;
  function _t(F) {
    const Ce = t.TYPE_CHART,
      Xe = Object.keys(Is),
      Ve = Ce[F] || {},
      Rt = Object.fromEntries(Xe.map((Ia) => [Ia, Ce[Ia]?.[F] ?? 1])),
      da = (Ia, ka, Za) =>
        Za.length
          ? `<div class="tt-row"><span class="tt-l ${ka}">${Ia}</span><span class="tt-b">${Za.map((En) => ha(En, !0)).join("")}</span></div>`
          : "",
      ia = (Ia) => Xe.filter((ka) => (Ve[ka] ?? 1) === Ia),
      Ja = (Ia) => Xe.filter((ka) => Rt[ka] === Ia);
    return `<div class="tt-head">${ha(F)}</div>
      <div class="tt-sec">${e("En attaque")}</div>${da(e("Super efficace ×2"), "good", ia(2))}${da(e("Peu efficace ×½"), "bad", ia(0.5))}${da(e("Sans effet ×0"), "none", ia(0))}
      <div class="tt-sec">${e("En défense")}</div>${da(e("Faible ×2"), "bad", Ja(2))}${da(e("Résiste ×½"), "good", Ja(0.5))}${da(e("Immunisé ×0"), "good", Ja(0))}`;
  }
  function Ea(F) {
    const Ce = new Date(F),
      Xe = Ce.getHours(),
      Ve = Ce.getMinutes();
    return Ve
      ? e("jusqu'à {h} h {m}", { h: Xe, m: String(Ve).padStart(2, "0") })
      : e("jusqu'à {h} h", { h: Xe });
  }
  const ut = (F) => {
    const Ce = new Date(F),
      Xe = Ce.getHours(),
      Ve = Ce.getMinutes();
    return Ve ? e("{h} h {m}", { h: Xe, m: String(Ve).padStart(2, "0") }) : e("{h} h", { h: Xe });
  };
  function jt(F) {
    if (F.key === "tide-low") return Ea(F.until);
    const Ce = new Date(F.until),
      Xe = Ce.getHours(),
      Ve = Ce.getMinutes();
    return Ve
      ? e("basse à {h} h {m}", { h: Xe, m: String(Ve).padStart(2, "0") })
      : e("basse à {h} h", { h: Xe });
  }
  let xt = !1;
  function D(F) {
    const Ce = t.WEATHER.hours(F);
    if (!Ce) return "";
    const Xe = [];
    return (
      Ce.forEach(({ at: Ve, key: Rt }, da) => {
        if (!Rt) return;
        const ia = Xe[Xe.length - 1];
        ia?.key === Rt && ia.end === da
          ? (ia.end = da + 1)
          : Xe.push({ at: Ve, key: Rt, i: da, end: da + 1 });
      }),
      Xe.length
        ? `<span class="sb-hours">${Xe.map(({ at: Ve, key: Rt, i: da }, ia) => {
            const Ja = new Date(Ve),
              Ia = t.WEATHER.info(Rt),
              ka = [Ja.getHours(), Ja.getMinutes()].map((Za) => String(Za).padStart(2, "0")).join(":");
            return `<span class="sb-h wx-${Rt}${da ? "" : " now"}" style="--i:${ia}" title="${ve(ut(Ve))} · ${ve(e(Ia.name))}"><i>${Ia.icon}</i><b>${ka}</b></span>`;
          }).join("")}</span>`
        : `<span class="sb-hours"><span class="sb-clear">${ve(e("Ciel dégagé"))}</span></span>`
    );
  }
  function Q(F, { fixed: Ce, park: Xe } = {}) {
    const Ve = t.DAYTIME,
      Rt = t.WEATHER,
      da = Ve.phase(),
      ia = new Date(b.time()),
      Ja = `${ia.getHours()}:${String(ia.getMinutes()).padStart(2, "0")}`,
      Ia = [`${da.name} ${Ja}`],
      ka = Xe || Ce ? "" : D(F);
    let Za = "";
    if (Ve.indoorNode(F))
      (F.tides || (Za = '<span class="sb-sep"></span><span>🏠</span>'), Ia.push(e("Intérieur")));
    else {
      const En = Rt.current(F),
        bn = Rt.info(En),
        an = Rt.forecast(F),
        Wn = Rt.forced ? Rt.endsAt() : (an?.at ?? Rt.endsAt()),
        wn = ve(e(bn?.name || "")),
        Bn = Ce || Ea(Wn),
        C = Xe || ka ? "" : En;
      if (
        (bn
          ? ((Za = `<span class="sb-sep sb-now"></span><span class="sb-now"${C ? ` data-cond="${C}"` : ""}>${bn.icon}</span><span class="sb-wx sb-now"><span class="sb-wn">${wn}</span> <span class="sb-wu">${Bn}</span></span>`),
            Ia.push(`${wn} ${Bn}`))
          : Ia.push(e("Ciel dégagé")),
        !bn && an?.key && !ka)
      ) {
        const g = new Date(an.at),
          E = g.getHours(),
          q = g.getMinutes(),
          Pe = Rt.info(an.key).icon;
        Ia.push(
          q
            ? e("Prévision : {icon} vers {h} h {m}", { icon: Pe, h: E, m: String(q).padStart(2, "0") })
            : e("Prévision : {icon} vers {h} h", { icon: Pe, h: E }),
        );
      }
    }
    if (F?.tides) {
      const En = t.STORY.tide(),
        bn = ve(e(En.name)) + (En.key === "tide-high" ? " ·" : ""),
        an = jt(En);
      ((Za += `<span class="sb-sep"></span><span data-cond="${En.key}">${En.icon}</span><span class="sb-wx sb-tide"><span class="sb-wn">${bn}</span> <span class="sb-wu">${an}</span></span>`),
        Ia.push(`${bn} ${an}`));
    }
    return ka
      ? `<span class="sb-pill sb-sky${xt ? " open" : ""}" data-sky role="button" tabindex="0" aria-expanded="${xt}" aria-label="${ve(e("Météo des 24 prochaines heures"))}" title="${ve(Ia.join(" · "))}"><span>${da.icon}</span><span class="sb-clock">${Ja}</span>${Za}${ka}</span>`
      : `<span class="sb-pill"${Xe ? ' data-cond="park-sky"' : ` title="${ve(Ia.join(" · "))}"`}><span${Xe ? "" : ` data-cond="${da.key}"`}>${da.icon}</span><span class="sb-clock">${Ja}</span>${Za}</span>`;
  }
  function Y(F) {
    const Ce = t.FORMS?.LIST.find((Ve) => Ve.base === 351 && Ve.weather?.includes(F)),
      Xe = t.CONFIG.WEATHER.TYPES[F];
    return !Ce || !Xe || !b.S.dex[351]
      ? ""
      : `<div class="tt-head tt-cond">${Xe.icon} <b>${ve(e(Xe.name))}</b></div><div class="tt-sec">${e("Éclosion")}</div><div class="tt-row tt-mon">${Oe(Ce.id, !1, we(Ce.id, 32, 40), 40)}<span class="tt-txt">${ve(b.DEX[Ce.id].name)}</span></div>`;
  }
  function ye() {
    const F = t.WEATHER,
      Ce = F.parkNode(),
      Xe = F.current(Ce),
      Ve = F.changes(Ce, 3),
      Rt = (ia) =>
        b.S.dex[351]
          ? t.FORMS?.LIST.find((Ja) => Ja.base === 351 && Ja.weather?.includes(ia)) || { id: 351 }
          : null,
      da = (ia, Ja) => {
        const Ia = F.info(Ja),
          ka = Rt(Ja);
        return `<div class="tt-row tt-sky"><span class="tt-l">${ia}</span><span class="tt-txt">${Ia ? `${Ia.icon} ${ve(e(Ia.name))}` : ve(e("Ciel dégagé"))}</span>${ka ? `<span class="tt-sky-mon" title="${ve(b.DEX[ka.id].name)}">${Oe(ka.id, !1, we(ka.id, 28, 32), 32)}</span>` : ""}</div>`;
      };
    return (
      `<div class="tt-head tt-cond">${t.DAYTIME.phase().icon} <b>${ve(e("Ciel du parc"))}</b></div>` +
      da(ve(e("maintenant")), Xe) +
      Ve.map((ia) => da(ut(ia.at), ia.key)).join("")
    );
  }
  function nt(F) {
    if (F === "park-sky") return ye();
    if (F.startsWith("park:")) return Y(F.slice(5));
    const Ce = (ka) => `<div class="tt-row"><span class="tt-txt">${ka}</span></div>`,
      Xe = t.STORY.TIDES[F];
    if (Xe)
      return (
        `<div class="tt-head tt-cond">${Xe.icon} <b>${ve(e(Xe.name))}</b></div><div class="tt-sec">${ve(e("Grotte Tréfonds"))}</div>` +
        Ce(
          e(
            F === "tide-low"
              ? "La Salle de glace est accessible."
              : "La Salle de glace est sous l'eau : reviens à marée basse.",
          ),
        ) +
        Ce(
          F === "tide-low"
            ? e("Les marées changent toutes les 3 heures.")
            : ((ka) =>
                e("Prochaine marée basse : {a} – {b}", {
                  a: ut(ka.until),
                  b: ut(ka.until + t.STORY.TIDE_MS),
                }))(t.STORY.tide()),
        )
      );
    const Ve = t.CONFIG,
      Rt = t.DAYTIME?.PHASES.find((ka) => ka.key === F),
      da = !Rt && Ve.WEATHER.TYPES[F];
    if (!Rt && !da) return "";
    const ia = (ka, Za) => Object.keys(ka || {}).filter((En) => Is[En] && Za(ka[En])),
      Ja = (ka, Za, En) =>
        En.length
          ? `<div class="tt-row"><span class="tt-l ${Za}">${ka}</span><span class="tt-b">${En.map((bn) => ha(bn, !0)).join("")}</span></div>`
          : "",
      Ia = `<div class="tt-head tt-cond">${(Rt || da).icon} <b>${ve(e((Rt || da).name))}</b></div>`;
    return da
      ? Ia +
          (da.damage
            ? `<div class="tt-sec">${e("Attaques")}</div>${Ja(
                e("Renforcées"),
                "good",
                ia(da.damage, (ka) => ka > 1),
              )}${Ja(
                e("Affaiblies"),
                "bad",
                ia(da.damage, (ka) => ka < 1),
              )}`
            : "") +
          `<div class="tt-sec">${e("Pokémon sauvages")}</div>${Ja(
            e("Plus fréquents"),
            "good",
            ia(da.encounters, (ka) => ka > 1),
          )}${Ja(
            e("Plus rares"),
            "bad",
            ia(da.encounters, (ka) => ka < 1),
          )}`
      : F === "night"
        ? Ia +
          `<div class="tt-sec">${e("Attaques")}</div>${Ja(
            e("Renforcées"),
            "good",
            ia(Ve.NIGHT_DAMAGE, (ka) => ka > 1),
          )}<div class="tt-sec">${e("Pokémon sauvages")}</div>${Ce(e("Certaines espèces ne sortent que la nuit, d'autres se cachent."))}${Ce(e("Les Pokémon diurnes rencontrés dehors peuvent dormir au début du combat."))}`
        : Ia +
          `<div class="tt-sec">${e("Pokémon sauvages")}</div>${Ce(e(F === "morning" ? "Certaines espèces ne sortent que le matin." : "Certaines espèces ne sortent qu'en journée."))}`;
  }
  {
    let F = null;
    const Ce = () => F?.remove();
    (document.addEventListener("mouseover", (Xe) => {
      const Ve = Xe.target.closest?.("[data-type], [data-cond]");
      if (!Ve || Ve.closest(".type-tip, .type-pop")) {
        Xe.target.closest?.(".type-tip") || Ce();
        return;
      }
      const Rt = Ve.dataset.type || "c:" + Ve.dataset.cond,
        da = Ve.dataset.type ? _t(Ve.dataset.type) : nt(Ve.dataset.cond);
      if (!da) return Ce();
      if (F?.dataset.for === Rt && F.isConnected) return;
      (Ce(),
        (F = document.createElement("div")),
        (F.className = "type-tip"),
        (F.dataset.for = Rt),
        (F.innerHTML = da),
        document.body.appendChild(F));
      const ia = Ve.getBoundingClientRect(),
        Ja = F.offsetWidth,
        Ia = F.offsetHeight,
        ka = Math.max(8, Math.min(innerWidth - Ja - 8, ia.left + ia.width / 2 - Ja / 2)),
        Za = ia.top - Ia - 8 >= 8 ? ia.top - Ia - 8 : ia.bottom + 8;
      ((F.style.left = ka + "px"), (F.style.top = Math.max(8, Za) + "px"));
    }),
      document.addEventListener("scroll", Ce, !0));
  }
  {
    let F = 0;
    const Ce = (Xe) => {
      ((xt = Xe),
        document.querySelectorAll(".sb-pill[data-sky]").forEach((Ve) => {
          (Ve.classList.toggle("open", Xe),
            Ve.classList.toggle("pop", Xe),
            Ve.setAttribute("aria-expanded", Xe));
        }),
        clearTimeout(F),
        Xe &&
          (F = Wa(
            () => document.querySelectorAll(".sb-pill.pop").forEach((Ve) => Ve.classList.remove("pop")),
            900,
          )));
    };
    (document.addEventListener("click", (Xe) => {
      Xe.target.closest?.(".sb-pill[data-sky]") ? Ce(!xt) : xt && Ce(!1);
    }),
      document.addEventListener("keydown", (Xe) => {
        (Xe.key === "Enter" || Xe.key === " ") &&
          Xe.target.matches?.(".sb-pill[data-sky]") &&
          (Xe.preventDefault(), Ce(!xt));
      }));
  }
  const Ot = (F, Ce) => b.DEX[F].types.map((Xe) => ha(Xe, Ce)).join(" "),
    ee = (F) => {
      const Ce = b.tierOf(F);
      return `<span class="rpips r-${Ce.key}" style="--rc:${Ce.color}" title="${e(Ce.label)}"><i></i></span>`;
    },
    rt = (F) => {
      const Ce = b.tierOf(F);
      return `<span class="rarity" style="color:${Ce.color}">${ee(F)}${e(Ce.label)}</span>`;
    },
    Qe = document.createElement("template"),
    Ft = [
      "onclick",
      "onkeydown",
      "onpointerdown",
      "onpointerup",
      "oninput",
      "onchange",
      "onmouseenter",
      "onmouseleave",
      "onfocus",
      "onblur",
    ];
  function Ye(F, Ce) {
    return ((Qe.innerHTML = Ce), bt(F, Qe.content), F);
  }
  function bt(F, Ce) {
    const Xe = [...F.childNodes],
      Ve = [...Ce.childNodes];
    Ve.forEach((Rt, da) => {
      const ia = Xe[da];
      if (!ia) {
        F.appendChild(Rt);
        return;
      }
      if (ia.nodeType !== Rt.nodeType || ia.nodeName !== Rt.nodeName) {
        ia.replaceWith(Rt);
        return;
      }
      if (ia.nodeType !== 1) {
        ia.nodeValue !== Rt.nodeValue && (ia.nodeValue = Rt.nodeValue);
        return;
      }
      const Ja = ia.tagName === "IMG" && ia.getAttribute("src") === Rt.getAttribute("src");
      for (const Ia of [...ia.attributes])
        !Rt.hasAttribute(Ia.name) && !(Ja && Ia.name === "style") && ia.removeAttribute(Ia.name);
      for (const Ia of Rt.attributes)
        ia.getAttribute(Ia.name) !== Ia.value &&
          !(Ja && Ia.name === "style") &&
          ia.setAttribute(Ia.name, Ia.value);
      for (const Ia of Ft) ia[Ia] && (ia[Ia] = null);
      (bt(ia, Rt),
        (ia.tagName === "INPUT" || ia.tagName === "TEXTAREA") && ia !== document.activeElement
          ? (ia.value !== Rt.value && (ia.value = Rt.value),
            ia.checked !== Rt.checked && (ia.checked = Rt.checked))
          : ia.tagName === "SELECT" && ia.value !== Rt.value && (ia.value = Rt.value));
    });
    for (let Rt = Ve.length; Rt < Xe.length; Rt++) Xe[Rt].remove();
  }
  const Yt = () => `<i class="shiny-mk" role="img" aria-label="${e("Chromatique")}"></i>`;
  function wa(F) {
    const Ce = b.regionDexIds(F),
      Xe = Ce.filter((Rt) => b.S.dex[Rt]).length,
      Ve = e(F.name);
    return Xe < Ce.length
      ? `<span class="sh-bonus" title="${ve(e("Capture au moins une fois chaque espèce de {region}, fabuleux compris : chromatiques 2× plus fréquents à {region}", { region: Ve }))}"><i class="shiny-ico"></i>×2 <small>${e("encore {n}", { n: Ce.length - Xe })}</small></span>`
      : `<span class="sh-bonus on" title="${ve(e("Pokédex de {region} complet : chromatiques 2× plus fréquents à {region}", { region: Ve }))}"><i class="shiny-ico"></i>${e("Shiny ×2")}</span>`;
  }
  const pa = (F) => ve(b.DEX[F.id].name) + (F.shiny ? " " + Yt() : ""),
    Gt = new Map();
  if (!Element.prototype.__animatePatched) {
    const F = Element.prototype.animate;
    ((Element.prototype.animate = function (Ce, Xe) {
      const Ve = F.call(this, Ce, Xe),
        Rt = typeof Xe == "number" ? { duration: Xe } : Xe || {};
      if (Rt.iterations !== 1 / 0) {
        const da = (Rt.duration || 0) * (Rt.iterations || 1) + (Rt.delay || 0),
          ia = Ve.finished;
        Object.defineProperty(Ve, "finished", {
          value: Promise.race([ia.catch(() => Ve), new Promise((Ja) => Wa(() => Ja(Ve), da + 150))]),
        });
      } else Gt.set(Ve, 0);
      return Ve;
    }),
      (Element.prototype.__animatePatched = !0),
      Ss(() => {
        for (const [Ce, Xe] of Gt)
          !Ce.effect?.target?.isConnected
            ? Xe || Ce.playState === "idle"
              ? (Ce.cancel(), Ce.effect && (Ce.effect.target = null), Gt.delete(Ce))
              : Gt.set(Ce, 1)
            : Gt.set(Ce, 0);
      }, 5e3));
  }
  function N(F, Ce, Xe) {
    return F.animate(
      Ce,
      typeof Xe == "number" ? { duration: Xe, fill: "forwards" } : { fill: "forwards", ...Xe },
    ).finished.catch(() => {});
  }
  function W(F, { amp: Ce = 1, speed: Xe = 1 } = {}) {
    return F.animate(
      [
        { transform: "translateY(0) scale(1, 1)" },
        { transform: `translateY(0) scale(${1 + 0.05 * Ce}, ${1 - 0.05 * Ce})`, offset: 0.15 },
        { transform: `translateY(${-6 * Ce}px) scale(${1 - 0.03 * Ce}, ${1 + 0.05 * Ce})`, offset: 0.45 },
        { transform: "translateY(0) scale(1, 1)", offset: 0.7 },
        { transform: "translateY(0) scale(1, 1)" },
      ],
      { duration: 1400 / Xe, iterations: 1 / 0, delay: -Math.random() * 1400, easing: "ease-in-out" },
    );
  }
  function ze(F, Ce, Xe, { n: Ve = 12, color: Rt, dist: da = 90, size: ia } = {}) {
    for (let Ja = 0; Ja < Ve; Ja++) {
      const Ia = document.createElement("div");
      ((Ia.className = "star"),
        Rt && (Ia.style.background = Rt),
        ia && (Ia.style.width = Ia.style.height = ia + "px"),
        (Ia.style.left = Ce + "px"),
        (Ia.style.top = Xe + "px"),
        F.appendChild(Ia));
      const ka = (Ja / Ve) * Math.PI * 2 + Math.random() * 0.4,
        Za = da * (0.6 + Math.random() * 0.6);
      N(
        Ia,
        [
          { transform: "translate(0,0) scale(0.2) rotate(0deg)", opacity: 1 },
          {
            transform: `translate(${Math.cos(ka) * Za}px, ${Math.sin(ka) * Za}px) scale(1) rotate(180deg)`,
            opacity: 1,
            offset: 0.6,
          },
          {
            transform: `translate(${Math.cos(ka) * Za * 1.2}px, ${Math.sin(ka) * Za * 1.2 + 20}px) scale(0.4) rotate(260deg)`,
            opacity: 0,
          },
        ],
        { duration: 900 + Math.random() * 300, easing: "cubic-bezier(.2,.8,.3,1)" },
      ).then(() => Ia.remove());
    }
  }
  function qt(F, Ce, Xe = "") {
    const Ve = H(
      `<div class="toast">${Ce ? `<span class="toast-ic"><img src="${Ce}" alt=""></span>` : ""}<span>${F}</span></div>`,
    );
    (Xe === "reward" && Ve.classList.add("reward"),
      f("#toasts").appendChild(Ve),
      [...f("#toasts").children]
        .filter((Rt) => !Rt.classList.contains("out"))
        .slice(0, -3)
        .forEach((Rt) => {
          (Rt.classList.add("out"), Wa(() => Rt.remove(), 300));
        }),
      Wa(() => {
        (Ve.classList.add("out"), Wa(() => Ve.remove(), 300));
      }, 2600));
  }
  let Lt = Promise.resolve();
  const zt = () => f("#modal-root");
  function ca(F) {
    return ((Lt = Lt.then(F, F)), Lt);
  }
  function Ma(F) {
    return ca(
      () =>
        new Promise((Ce) => {
          const Xe = zt(),
            Ve = H(
              `<div class="modal ${F.className || ""}"><div class="modal-body"></div><div class="modal-actions"></div></div>`,
            ),
            Rt = f(".modal-body", Ve),
            da = Ve.lastElementChild;
          typeof F.body == "string" ? (Rt.innerHTML = F.body) : F.body && Rt.appendChild(F.body);
          let ia = !1;
          const Ja = new AbortController(),
            Ia = (bn) => {
              ia ||
                ((ia = !0),
                clearTimeout(Za),
                Ja.abort(),
                Xe.classList.remove("open"),
                (Xe.innerHTML = ""),
                (Xe.onclick = null),
                document.removeEventListener("keydown", ka),
                Ce(bn));
            },
            ka = (bn) => {
              bn.key === "Escape" && F.dismissable !== !1 && Ia(null);
            };
          for (const bn of F.actions || []) {
            const an = H(`<button class="btn ${bn.cls || ""}">${bn.label}</button>`);
            (bn.disabled && (an.disabled = !0),
              (an.onclick = async () => {
                (bn.onClick && (await bn.onClick(an)) === !1) || Ia("value" in bn ? bn.value : bn.label);
              }),
              da.appendChild(an));
          }
          ((F.actions || []).length
            ? F.actions.length === 1 && !/\bghost\b/.test(F.actions[0].cls || "")
              ? da.classList.add("solo")
              : F.actions.length === 2 && da.classList.add("duo")
            : da.remove(),
            (Xe.style.animation = Ve.style.animation = F.swap ? "none" : ""),
            (Xe.innerHTML = ""),
            Xe.appendChild(Ve),
            Xe.classList.add("open"),
            (Xe.onclick = (bn) => {
              bn.target === Xe && F.dismissable !== !1 && Ia(null);
            }),
            document.addEventListener("keydown", ka));
          const Za = F.autoClose && Wa(() => Ia(null), F.autoClose),
            En = F.onOpen?.(Ve, Ia, Ja.signal);
          En &&
            typeof En.catch == "function" &&
            En.catch((bn) => {
              console.error(bn);
              const an = H(
                `<div class="modal-actions"><button class="btn gold">${e("Continuer")}</button></div>`,
              );
              ((an.querySelector("button").onclick = () => Ia(null)), Ve.appendChild(an));
            });
        }),
    );
  }
  const Na = (F, Ce = e("Confirmer"), Xe = "danger") =>
    Ma({
      body: `<p style="font-size:17px;margin:4px 0">${F}</p>`,
      actions: [
        { label: e("Annuler"), cls: "ghost", value: !1 },
        { label: Ce, cls: Xe, value: !0 },
      ],
    });
  function Va(F) {
    const Ce = b.S,
      Xe = (Ia, ka) => Ia.some((Za) => Za?.uid === ka.uid),
      Ve = { pen: 0, ug: 0, mk: 0, tr: 0 },
      Rt = b.pension().mons.map((Ia) => Ia.mon),
      da = (Ce.under?.slots || []).flatMap((Ia) => Ia.mons || []),
      ia = (Ce.mktOut || []).map((Ia) => Ia.mon),
      Ja = [Ce.tradeOut?.mon, Ce.tradeIn?.mon];
    for (const Ia of F)
      Xe(Rt, Ia) ? Ve.pen++ : Xe(da, Ia) ? Ve.ug++ : Xe(ia, Ia) ? Ve.mk++ : Xe(Ja, Ia) && Ve.tr++;
    return [
      Ve.pen && e("{n} en Pension", { n: Ve.pen }),
      Ve.ug && e("{n} au Souterrain", { n: Ve.ug }),
      Ve.mk && e("{n} en vente au Marché", { n: Ve.mk }),
      Ve.tr && e("{n} dans un échange en cours", { n: Ve.tr }),
    ]
      .filter(Boolean)
      .join("<br>");
  }
  function Ba(F, { current: Ce, shiny: Xe = !1, reveal: Ve = !1, k: Rt = 1, family: da } = {}) {
    const ia = (g) => Ve || b.reached(g);
    let Ja = F;
    for (; b.PREVO[Ja] && ia(b.PREVO[Ja].from);) Ja = b.PREVO[Ja].from;
    const Ia = (g) => Ve || !!b.S.dex[g] || !!b.S.seen?.[g],
      ka = (g) =>
        [...(t.EVOLUTIONS[g] || []), ...(b.FAMILY_LINKS[g] || []).map((E) => ({ to: E, family: !0 }))].filter(
          (E) => b.DEX[E.to] && ia(E.to),
        ),
      Za = (g, E = Rt) => {
        let q = "",
          Pe = "",
          at = "";
        if (da) {
          const Mt = da.owned[g] || [];
          ((q = Mt.length ? " own" : da.on && da.reach.has(g) ? " free" : ""),
            b.DEX[g].baby && ((q += " egg"), (at = ` title="${ve(e("Naît d'un œuf"))}"`)),
            Mt.length &&
              (Pe =
                e("Nv. {n}", { n: g === Ce ? da.mon.level : Math.max(...Mt.map((Ta) => Ta.level)) }) +
                (Mt.length > 1 ? ` ×${Mt.length}` : "")));
          const Pa = Va(Mt);
          Pa && (Pe = yn(`${Pe} <i class="fam-away" aria-hidden="true"></i>`, e("Pas tous au PC"), Pa));
        }
        return `<div class="evo${Ia(g) ? "" : " unknown"}${g === Ce ? " cur" : ""}${q}"${at}>${Oe(g, Xe, E, E > 1 ? 72 : 46)}<span>${Ia(g) ? ve(b.DEX[g].name) : "???"}</span>${da ? `<small>${Pe || "&nbsp;"}</small>` : ""}</div>`;
      },
      En = (g) => ({ day: " " + e("le jour"), night: " " + e("la nuit") })[a.TIME_EVOLUTIONS[g.to]] || "",
      bn = (g, E) => {
        const q = ve(b.DEX[g.to].name),
          Pe = !ka(g.to).some((at) => da.reach.has(at.to));
        return `<div class="arrow paused">${yn(`${g.level ? e("Nv. {n}", { n: g.level }) : ""}<i class="pause-ico"></i>`, e("Évolution en pause"), Pe ? e("Tu as déjà un {name} : un seul par espèce.", { name: q }) : e("Tu as déjà un {name}. Fais-le évoluer pour libérer la place.", { name: q }), "evo-pause")}</div>`;
      },
      an = (g) =>
        `<div class="arrow no-evo">${yn("<span>⋯</span>", e("Même famille"), e("{name} ne s'obtient pas par évolution. Il partage l'XP de la famille.", { name: ve(b.DEX[g.to].name) }), "evo-pause")}</div>`,
      Wn = (g, E) =>
        g.family
          ? an(g)
          : da && E === Ce && da.wait.has(g.to)
            ? bn(g, E)
            : `<div class="arrow">${g.item === "shed-shell" ? `<img src="${lt(g.item)}" alt="${ve(kt(g.item))}" title="${ve(e("{item} : laissée par un {name} qui évolue en {to}", { item: kt(g.item), name: b.DEX[E].name, to: b.DEX[ka(E).find((q) => q.level)?.to]?.name }))}">` : g.party ? `<img class="evo-party" src="${De(g.party)}" alt="${ve(b.DEX[g.party].name)}" title="${ve(e("Évolue avec {name} dans l'équipe", { name: b.DEX[g.party].name }))}">` : g.level ? e("Nv. {n}", { n: g.level }) : g.item === "link-cable" ? `<img src="${lt(g.item)}" alt="${e("Échange")}" title="${e("Évolue quand il est échangé")}">` : Ga(g.item, `<img src="${lt(g.item)}" alt="${ve(kt(g.item) + En(g))}">`, { note: En(g) })}${En(g) ? `<small class="evo-time">${a.TIME_EVOLUTIONS[g.to] === "night" ? "🌙" : "☀️"}</small>` : ""}<span>→</span></div>`;
    let wn = !1;
    const Bn = (g, E = Rt) => {
        const q = ka(g);
        return q.length
          ? q.length === 1
            ? Za(g, E) + Wn(q[0], g) + Bn(q[0].to, E)
            : q.length > 2
              ? ((wn = !0),
                Za(g, E) +
                  `<div class="evo-branches grid">${q.map((Pe) => `<div class="evo-branch">${Wn(Pe, g)}${Bn(Pe.to, 1)}</div>`).join("")}</div>`)
              : Za(g, E) +
                `<div class="evo-branches">${q.map((Pe) => `<div class="evo-branch">${Wn(Pe, g)}${Bn(Pe.to, E)}</div>`).join("")}</div>`
          : Za(g, E);
      },
      C = ka(Ja).length ? Bn(Ja) : "";
    return C ? `<div class="evo-chain${wn ? " wide" : ""}">${C}</div>` : "";
  }
  const za = () => ({
      hp: e("PV"),
      atk: e("Attaque"),
      def: e("Défense"),
      spa: e("Atq. Spé."),
      spd: e("Déf. Spé."),
      spe: e("Vitesse"),
    }),
    vn = [
      [0, "#f97316"],
      [55, "#f97316"],
      [85, "#eab308"],
      [110, "#22c55e"],
      [140, "#22b8a6"],
      [180, "#3b82f6"],
      [225, "#8b5cf6"],
      [275, "#d946ef"],
      [330, "#ffc83d"],
    ];
  function An(F, Ce) {
    const Xe = b.DEX[F].stats,
      Ve = Ce && b.statsOf(Ce),
      Rt = (Ce?.shiny && a.SHINY_STAT_BONUS) || 0,
      da = Ce ? b.rankOf(Ce) : 0,
      ia = a.UNDERGROUND.RANK_STAT ** da,
      Ja = 160 * ia,
      Ia = da && { ...b.statsOf({ ...Ce, rank: 0 }), hp: b.maxHp({ ...Ce, rank: 0 }) },
      ka = Rt ? e("+{n} % ✨ (chromatique)", { n: Math.round(Rt * 100) }) : "",
      Za = (bn) => Math.min(100, (bn / Ja) * 100),
      En = `linear-gradient(90deg, ${vn.map(([bn, an]) => `${an} ${((bn / Ja) * 100).toFixed(1)}%`).join(", ")})`;
    return `<div class="statbars${Ce ? " real" : ""}${da ? " ranked" : ""}" style="--g:${En};--nw:${((40 / Ja) * 100).toFixed(2)}cqw">${[
      "hp",
      "atk",
      "def",
      "spa",
      "spd",
      "spe",
    ]
      .map((bn) => {
        const an = Xe[bn],
          Wn = an * Rt,
          wn = (an + Wn) * ia,
          C = [
            ["", 0, an],
            ["shiny", an, an + Wn],
            ["rk", an + Wn, wn],
          ]
            .map(([Pa, Ta, La]) => [Pa, Za(Ta), Za(La)])
            .filter(([, Pa, Ta]) => Ta - Pa > 0.05),
          g = C.map(
            ([Pa, Ta, La], xa) =>
              `<i${Pa || xa === C.length - 1 ? ` class="${[Pa, xa === C.length - 1 && "end"].filter(Boolean).join(" ")}"` : ""} style="left:${Ta.toFixed(2)}%;width:${(La - Ta).toFixed(2)}%;--x:${(-Ta).toFixed(2)}cqw"></i>`,
          ).join(""),
          E = bn === "hp" ? Ce && b.maxHp(Ce) : Ve?.[bn],
          q = da ? E - Ia[bn] : 0,
          Pe = Ce ? (bn === "hp" ? `${b.curHp(Ce)}/${E}` : E) : an,
          at = [ka, q && e("Rang {r} : +{n}", { r: Re[da], n: q })].filter(Boolean).join(" · "),
          Mt = ka ? "shiny-up" : "";
        return `<span>${za()[bn]}</span><b${Mt ? ` class="${Mt}"` : ""}${at ? ` title="${ve(at)}"` : ""}>${Pe}${q ? `<small class="rk-gain">+${vt(q)}</small>` : ""}</b><div class="bar">${da ? `<i class="lim" style="left:${Za(160).toFixed(2)}%"></i>` : ""}${g}</div>`;
      })
      .join("")}</div>`;
  }
  const on = (F) => {
    const Ce = b.rankOf(F);
    return Ce
      ? ` <span class="rk-x">${e("Rang {r} ×{x}", { r: Re[Ce], x: (a.UNDERGROUND.RANK_STAT ** Ce).toLocaleString(t.I18n?.lang || "fr", { minimumFractionDigits: 2, maximumFractionDigits: 2 }) })}</span>`
      : "";
  };
  function qn(F) {
    const Ce = t.POKEDEX.find((Rt) => Rt.id === F)?.num ?? F,
      Xe = t.STORY.REGIONS.find((Rt) => Rt.dex && Ce >= Rt.dex[0] && Ce <= Rt.dex[1]);
    if (!Xe) return "";
    let Ve = 0;
    for (let Rt = Xe.dex[0]; Rt <= Xe.dex[1]; Rt++) b.inDex(Rt) && Ve++;
    return `<span>${ve(e(Xe.name))} <b>${Ve}</b>/${Xe.dex[1] - Xe.dex[0] + 1}</span>`;
  }
  const xn = {},
    fn = (F, Ce, Xe, Ve) =>
      `<details class="dc-sec dc-fold" data-fold="${ve(F)}"${(xn[F] ?? Ve) ? " open" : ""}><summary><h4>${e(F)}</h4><span class="dc-tot">${Ce}</span><i class="dc-chev">▸</i></summary>${Xe}</details>`;
  function Yn(
    F,
    { mon: Ce, isNew: Xe, fresh: Ve, full: Rt, extra: da, closable: ia, seen: Ja, shiny: Ia } = {},
  ) {
    const ka = b.DEX[F],
      Za = b.tierOf(F),
      En = b.inDex(F),
      bn = En || Ce || b.S.seen?.[F] || b.S.dex[F],
      an = ["hp", "atk", "def", "spa", "spd", "spe"].reduce((E, q) => E + ka.stats[q], 0),
      Wn = (E, q) => `<div class="dc-fact">${E}<b>${q}</b></div>`,
      wn = H(`<div class="dexcard v2 ${Za.key === "legendary" ? "legend-glow" : ""}">
      <div class="dc-head"><h2>${Ce ? pa({ id: Ge(Ce.id), shiny: Ce.shiny }) : bn ? ve(b.DEX[Ge(F)]?.name ?? ka.name) : "???"}</h2>${Xe ? `<span class="dc-new">${e("Nouveau")}</span>` : Ve ? `<span class="dc-new">${e("Chromatique")}</span>` : ""}
        <div class="dc-sum"><span>${e("N° {n}", { n: `<b>${Je(Ge(F))}</b>` })}</span>${qn(F)}${ia ? `<button class="dc-x" aria-label="${e("Fermer")}">✕</button>` : ""}</div></div>
      <div class="dc-top">
        <div class="dc-hero${En ? " caught" : " not-caught"}${bn ? "" : " unknown"}">${En ? `<img class="dc-ball" src="${lt("poke-ball")}" alt="${e("Capturé")}">` : ""}${Z(F, Ce ? Ce.shiny : Ia, { cls: "spr", still: !bn, center: !0 })}</div>
        <div class="dc-id">
          <div class="genus">${bn ? ve(ka.genus) : e("Pokémon inconnu")}</div>
          ${bn ? `<div class="badges">${Ot(F)} ${rt(F)}</div>` : ""}
          <div class="dc-facts">
            ${Ce ? Wn(e("Niveau"), Ce.level) : ""}
            ${bn ? Wn(e("Taille"), `${ka.height.toLocaleString(t.I18n.lang)} m`) + Wn(e("Poids"), `${ka.weight.toLocaleString(t.I18n.lang)} kg`) : ""}
            ${Wn(e("Capturés"), `${En ? `<img src="${lt("poke-ball")}" alt="">` : ""}${b.S.dex[F]?.caught || 0}`)}
          </div>
          ${bn && !Ce ? `<button class="dc-moves-btn">${e("Voir les capacités")} <span>›</span></button>` : ""}
        </div>
      </div>
      ${bn ? `<p class="flavor">${ve(ka.flavor)}</p>` : `<p class="flavor muted">${e(Ja ? "Vu, mais pas encore capturé !" : "Jamais rencontré… pour l'instant !")}</p>`}
      ${Rt && bn ? fn("Statistiques", e("Total <b>{n}</b>", { n: an }), An(F), !1) : ""}
      ${Rt ? ((E) => (E ? `<div class="dc-sec"><h4>${e("Évolutions")}</h4>${E}</div>` : ""))(Ba(F, { current: F, k: 2 })) : ""}
      ${da || ""}
    </div>`),
      Bn = f(".spr", wn),
      C = document.createElement("div");
    ((C.style.cssText = "position:relative;transform-origin:50% 100%"),
      Bn.replaceWith(C),
      C.appendChild(Bn),
      (Bn.style.transformOrigin = "50% 100%"),
      W(C, { amp: 1.2 }));
    const g = f(".dc-moves-btn", wn);
    return (g && (g.onclick = () => (_a ? Ua() : Ka({ id: F }))), _a && (g ? Ka({ id: F }) : Ua()), wn);
  }
  function Zn(F, Ce = {}) {
    const Xe = !Ce.actions;
    return Ma({
      className: "dexcard-modal",
      body: Yn(F, { ...Ce, closable: Xe }),
      actions: Ce.actions || [],
      onOpen: (Ve, Rt, da) => {
        if (
          ((b.S.dex[F] || Ce.mon || b.S.seen?.[F]) &&
            Ve.style.setProperty("--c", Is[b.DEX[F].types[0]].color),
          Ve.querySelector(".dc-x")?.addEventListener("click", () => Rt(null)),
          Ve.querySelectorAll("details[data-fold]").forEach((ia) =>
            ia.addEventListener("toggle", () => {
              xn[ia.dataset.fold] = ia.open;
            }),
          ),
          Ce.nav)
        )
          for (const [ia, Ja] of [
            ["prev", "‹"],
            ["next", "›"],
          ]) {
            const Ia = H(
              `<button class="dc-nav ${ia}" aria-label="${ia === "prev" ? "Précédent" : "Suivant"}">${Ja}</button>`,
            );
            (Ce.nav[ia] ? (Ia.onclick = () => Rt(ia)) : (Ia.disabled = !0), Ve.appendChild(Ia));
          }
        return (Ce.nav && ft(Ve), Ce.onOpen?.(Ve, Rt, da));
      },
    }).then((Ve) => (Ve !== "prev" && Ve !== "next" && Ve !== "shiny" && Ua(), Ve));
  }
  const is = new Set();
  async function ts(F) {
    const Ce = b.getMon(F),
      Xe = Ce && t.Underground.rankOf(Ce);
    if (!Xe || Xe.why) return !1;
    const Ve = Re[Xe.next],
      Rt = a.UNDERGROUND,
      da = t.Underground,
      ia = (an, Wn) => `<div class="dc-fact">${an}<b>${Wn}</b></div>`,
      Ja = (an) =>
        "×" +
        new Intl.NumberFormat(document.documentElement.lang || "fr", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        }).format(an);
    let Ia = Xe.key;
    const ka = da
        .gemKeys(Ce.id)
        .map((an) => da.rankOf(Ce, an))
        .filter((an) => an.have > 0),
      Za = (
        an,
      ) => `<button class="pl-opt${an.key === Ia ? " on" : ""}" data-k="${ve(an.key)}"${an.why ? ` disabled title="${ve(an.why)}"` : ""}>
      <img src="${lt("gem-" + da.gemType(an.key))}" alt=""><b>${ve(da.gemName(an.key))}</b><small>×${vt(an.have)}</small></button>`;
    if (
      !(await Ma({
        className: "rk-modal",
        body: `<p class="rk-q">${e('Faire passer <b>{name}</b> au <b class="rk-say">rang {r}</b> ?', { name: pa(Ce), r: Ve })}</p>
        <div class="dc-facts">${ia(e("Coût"), Xe.need > 1 ? e("{n} gemmes", { n: Xe.need }) : e("{n} gemme", { n: Xe.need }))}${ia(e("Stats"), Ja(Rt.RANK_STAT ** Xe.next))}${ia(e("Niveau"), "100 → 5")}</div>
        ${ka.length > 1 ? `<small class="rk-lbl">${e("Gemme à utiliser")}</small><div class="rk-gems">${ka.map(Za).join("")}</div>` : ""}
        <p class="muted">${e("Il retombe au niveau 5 en gardant son évolution et réapprend ses attaques en montant. Son XP coûte {x}.", { x: Ja(Rt.RANK_XP ** Xe.next) })}</p>
        ${(t.EVOLUTIONS[Ce.id] || []).length ? `<p class="ot-warn">${e("Un Pokémon monté en rang n'évolue plus.")}</p>` : ""}`,
        actions: [
          { label: e("Annuler"), cls: "ghost", value: !1 },
          { label: e("Rang {r}", { r: Ve }), cls: "gold", value: !0 },
        ],
        onOpen: (an) => {
          for (const Wn of ue(".rk-gems .pl-opt:not([disabled])", an))
            Wn.onclick = () => {
              Ia = Wn.dataset.k;
              for (const wn of ue(".rk-gems .pl-opt", an)) wn.classList.toggle("on", wn === Wn);
            };
        },
      }))
    )
      return !1;
    const bn = () => {
      const an = da.rankUp(F, Ia);
      return (an && (t.App.refresh(), t.Screens?.adventure?.refreshTeam?.()), an);
    };
    return t.CHEAT?.noAnim || b.S.reducedAnim || matchMedia("(prefers-reduced-motion: reduce)").matches
      ? (bn() && qt(e("{name} passe au rang {r} !", { name: pa(Ce), r: Ve }), De(Ce.id, Ce.shiny)), !0)
      : (await ca(() =>
          t.RankFx.play({
            mon: Ce,
            rank: Xe.next,
            need: Xe.need,
            from: Ce.level,
            onApply: bn,
            gem: da.gemType(Ia),
          }),
        ),
        !0);
  }
  async function Jn(F, Ce) {
    const Xe = t.LegendZones,
      Ve = b.S.eliteLeague?.[F];
    if (!Ve?.gems || Ve.gems[Ce] !== null) return null;
    const Rt = t.STORY,
      da = Rt.chaptersOf(F).filter((C) => Rt.CHAPTERS[C].league),
      ia = da[da.length - 1],
      Ja = ia != null && Rt.CHAPTERS[ia].steps.find((C) => C.kind === "gym"),
      Ia = Re[Ce],
      ka = Xe.leagueMembers(F),
      Za = ve(e(Rt.REGIONS.find((C) => C.key === F)?.name || F)),
      En = Xe.leagueNext(F),
      bn = (C, g) => `<div class="dc-fact">${C}<b>${g}</b></div>`;
    let an = null;
    const Wn = (C) =>
      `<button class="pl-opt" data-k="${C.type}"><img src="${lt("gem-" + C.type)}" alt=""><b>${ve(t.Underground.gemName(C.type + ":3"))}</b><small>${ve(e(C.leader))}</small></button>`;
    if (
      !(await Ma({
        className: "rk-modal lgp-modal",
        body: `<div class="dp-banner lgp-banner" style="background-image:${Ja ? t.SCENES.css(Ja, ia) : "none"}"><span class="lgp-ttl">${e("Ligue de {region} battue au <b>rang {r}</b> !", { region: Za, r: Ia })}</span>
          <div class="lgp-mem">${ka.map((C) => `<img src="assets/trainers/still/${/^[\w-]+$/.test(C.sprite || "") ? C.sprite : "red"}.png" alt="">`).join("")}</div></div>
        <div class="dc-facts">${bn(e("Récompense"), Xe.leagueFrame(Ce) ? e("1 gemme légendaire + le cadre") : e("1 gemme légendaire"))}${bn(e("Palier suivant"), En ? e("Élite {r}", { r: Re[En] }) : "—")}</div>
        <small class="rk-lbl">${e("Choisis son type, parmi ceux de la Ligue")}</small><div class="rk-gems">${ka.map(Wn).join("")}</div>
        <p class="muted">${e("Ferme sans choisir : elle t'attend dans la frise de la Ligue.")}</p>`,
        actions: [
          { label: e("Plus tard"), cls: "ghost", value: !1 },
          { label: e("Prendre"), cls: "gold", value: !0 },
        ],
        onOpen: (C) => {
          const g = [...C.querySelectorAll(".gold")].pop();
          g && (g.disabled = !0);
          for (const E of ue(".rk-gems .pl-opt", C))
            E.onclick = () => {
              an = E.dataset.k;
              for (const q of ue(".rk-gems .pl-opt", C)) q.classList.toggle("on", q === E);
              g && (g.disabled = !1);
            };
        },
      })) ||
      !an
    )
      return null;
    const Bn = Xe.leaguePick(F, Ce, an);
    return (Bn && (qt("+1 " + t.Underground.gemName(Bn), lt("gem-" + an)), t.App?.refresh?.()), Bn);
  }
  async function On(F) {
    const Ce = b.getMon(F),
      Xe = b.plateChoices(Ce),
      Ve = a.UNDERGROUND.LOOT.PLATES,
      Rt = t.FORMS;
    if (!Xe.length) return !1;
    let da = Xe.find((an) => !an.owned)?.type || null;
    const ia = (an, Wn) => `<div class="dc-fact">${an}<b>${Wn}</b></div>`,
      Ja = Rt.formsOf(Ce.id).filter((an) => b.owns(an)).length,
      Ia = Rt.formsOf(Ce.id).length,
      ka = (
        an,
      ) => `<button class="pl-opt${an.type === da ? " on" : ""}" data-t="${an.type}"${an.owned ? ` disabled title="${ve(e("Tu as déjà {name}.", { name: b.DEX[an.id].name }))}"` : ""}>
      <img src="${lt("plate-" + an.type)}" alt=""><b>${ve(e(Ve[an.type]))}</b>${an.owned ? `<small>${e("Déjà possédé")}</small>` : ha(an.type, !0)}</button>`;
    if (
      !(await Ma({
        className: "dexcard-modal pl-modal",
        body: `<div class="dexcard v2"><div class="dc-head"><h2>${e("Donner une plaque")}</h2><div class="dc-sum"><button class="dc-x" aria-label="${e("Fermer")}">✕</button></div></div>
        <div class="dc-top"><div class="dc-hero sprite"><div class="w">${Z(Ce.id, Ce.shiny, { cls: "art", center: !0 })}</div></div>
          <div class="dc-id"><div class="genus">${e("La plaque est consommée : {name} prend son type pour de bon.", { name: pa(Ce) })}</div>
            <div class="dc-facts two">${ia(e("Plaques"), vt(Xe.length))}${ia(e("Formes"), `${Ja} / ${Ia}`)}</div></div></div>
        <div class="pl-grid">${Xe.map(ka).join("")}</div></div>`,
        actions: [
          { label: e("Annuler"), cls: "ghost", value: !1 },
          { label: e("Donner"), cls: "gold", value: !0, disabled: !da },
        ],
        onOpen: (an, Wn) => {
          f(".dc-x", an).onclick = () => Wn(!1);
          for (const wn of ue(".pl-opt:not([disabled])", an))
            wn.onclick = () => {
              da = wn.dataset.t;
              for (const Bn of ue(".pl-opt", an)) Bn.classList.toggle("on", Bn === wn);
              f(".modal-actions .btn.gold", an).disabled = !1;
            };
        },
      })) ||
      !da
    )
      return !1;
    const En = pa(Ce),
      bn = b.givePlate(F, da);
    return bn
      ? bn.error
        ? (qt(bn.error), !1)
        : (t.Sfx.buy(),
          qt(
            e("{name} devient de type {type} !", { name: En, type: ve(Is[da].fr) }),
            lt("plate-" + da),
            "reward",
          ),
          t.App.refresh(),
          t.Screens?.adventure?.refreshTeam?.(),
          !0)
      : !1;
  }
  function Me(F) {
    const Ce = F && b.getMon(F.uid);
    return !F || is.has(F.uid) || (Ce && b.evoBlocked(Ce, F.to))
      ? Promise.resolve(!1)
      : (is.add(F.uid),
        (async () => {
          const Xe = Ce && !F.forced ? b.levelEvolutions(Ce) : [];
          if (Xe.length > 1) {
            const Ve = await Ma({
              body: `<p style="font-size:17px;margin:4px 0">${e("<b>{name}</b> veut évoluer ! En quoi doit-il évoluer ?", { name: ve(b.DEX[Ce.id].name) })}</p>`,
              actions: [
                { label: e("Plus tard"), cls: "ghost", value: null },
                ...Xe.map((Rt) => ({
                  label: `<img class="pn-ic" src="${De(Rt.to, Ce.shiny)}" alt="">${ve(b.DEX[Rt.to].name)}`,
                  cls: "gold",
                  value: Rt.to,
                })),
              ],
            });
            if (!Ve) return !1;
            F = { ...F, to: Ve };
          }
          return Aa(F);
        })().finally(() => is.delete(F.uid)));
  }
  function It(F, Ce) {
    return new Promise((Xe) => {
      const Ve = new Image();
      ((Ve.onload = () => {
        try {
          const Rt = document.createElement("canvas"),
            da = Ce ? Ve.naturalWidth / Ce.of : Ve.naturalWidth;
          ((Rt.width = da), (Rt.height = Ve.naturalHeight));
          const ia = Rt.getContext("2d");
          ia.drawImage(Ve, Ce ? -da * (Ce.n - 1) : 0, 0);
          const Ja = ia.getImageData(0, 0, Rt.width, Rt.height).data,
            Ia = new Array(36).fill(0);
          for (let Bn = 0; Bn < Ja.length; Bn += 4) {
            if (Ja[Bn + 3] < 200) continue;
            const C = Ja[Bn] / 255,
              g = Ja[Bn + 1] / 255,
              E = Ja[Bn + 2] / 255,
              q = Math.max(C, g, E),
              Pe = Math.min(C, g, E),
              at = q - Pe;
            if (q < 0.3 || at / q < 0.3) continue;
            const Mt =
              at === 0 ? 0 : q === C ? ((g - E) / at + 6) % 6 : q === g ? (E - C) / at + 2 : (C - g) / at + 4;
            Ia[Math.floor(Mt * 6) % 36] += (at / q) * q;
          }
          const ka = Ia.indexOf(Math.max(...Ia));
          if (!Ia[ka]) return Xe(null);
          const Za = (ka + 0.5) * 10,
            En = 0.9,
            bn = 0.72,
            an = (Bn) => (Bn + Za / 30) % 12,
            Wn = En * Math.min(bn, 1 - bn),
            wn = (Bn) => Math.round(255 * (bn - Wn * Math.max(-1, Math.min(an(Bn) - 3, 9 - an(Bn), 1))));
          Xe(`${wn(0)}, ${wn(8)}, ${wn(4)}`);
        } catch {
          Xe(null);
        }
      }),
        (Ve.onerror = () => Xe(null)),
        (Ve.src = F));
    });
  }
  function Kt(F) {
    F?.shell &&
      qt(
        e("{mon} a laissé une {item} !", { mon: ve(b.DEX[F.to].name), item: ve(kt("shed-shell")) }),
        lt("shed-shell"),
        "reward",
      );
  }
  async function Aa(F) {
    const Ce = F.demo ? { id: F.from, shiny: !!F.shiny } : b.getMon(F.uid);
    if (!Ce || Ce.id !== (F.done ? F.to : F.from)) return !1;
    const Xe = () => (F.done ? F.shell : b.evolveMon(F.uid, F.to)),
      Ve = b.DEX[F.from],
      Rt = b.DEX[F.to],
      da = Ce.shiny;
    if (t.CHEAT?.noAnim || b.S.reducedAnim || matchMedia("(prefers-reduced-motion: reduce)").matches)
      return (
        F.demo ||
          (Kt(Xe()),
          qt(e("{from} évolue en {to} !", { from: ve(Ve.name), to: ve(Rt.name) }), De(F.to, da)),
          t.News?.post({
            me: !0,
            mon: F.to,
            shiny: da,
            html: e("Ton <b>{from}</b> a évolué en <b>{to}</b> !", { from: ve(Ve.name), to: ve(Rt.name) }),
          }),
          t.App.refresh(),
          t.Screens?.adventure?.refreshTeam?.()),
        !0
      );
    let ia = !1;
    return (
      await ca(() =>
        t.LinkFx.evolve({
          from: F.from,
          to: F.to,
          shiny: da,
          onEvolve: () => {
            ((ia = !0),
              !F.demo &&
                (Kt(Xe()),
                t.News?.post({
                  me: !0,
                  mon: F.to,
                  shiny: da,
                  html: e("Ton <b>{from}</b> a évolué en <b>{to}</b> !", {
                    from: ve(Ve.name),
                    to: ve(Rt.name),
                  }),
                }),
                t.App.refresh(),
                t.Screens.adventure?.refreshTeam()));
          },
        }),
      ),
      ia
    );
  }
  function Ka(F, { boss: Ce = !1 } = {}) {
    const Xe = [F.id];
    for (let wn = F.id; b.PREVO[wn]; wn = b.PREVO[wn].from) Xe.unshift(b.PREVO[wn].from);
    const Ve = new Map();
    for (const wn of Xe.reverse()) {
      const Bn = b.PREVO[wn]?.level;
      for (const [C, g] of b.DEX[wn].learn) {
        if (!t.MOVES[g] || Ve.has(g)) continue;
        const E = C === 0;
        Ve.set(g, { key: g, lvl: C, sort: E ? Bn || 0 : C, from: wn, evo: E });
      }
    }
    const Rt = (wn) => t.STATUS?.MOVES[wn];
    for (const [wn, Bn] of Ve)
      (a.MOVE_BLACKLIST.includes(wn) || (b.movePower(wn) <= 0 && !Rt(wn)) || (Ce && Bn.sort > F.level)) &&
        Ve.delete(wn);
    const da = {
        burn: e("Brûlure"),
        paralysis: e("Paralysie"),
        poison: e("Poison"),
        freeze: e("Gel"),
        sleep: e("Sommeil"),
        confusion: e("Confusion"),
        tri: e("Brûlure, Paralysie ou Gel"),
      },
      ia = Ce ? F.counter || t.Adventure?.riposteOf({ id: F.id, level: F.level, foe: !0 })?.key : null,
      Ja = Ce && F.burst !== ia ? F.burst : null;
    for (const wn of [ia, Ja])
      wn && t.MOVES[wn] && !Ve.has(wn) && Ve.set(wn, { key: wn, lvl: 0, sort: 0, from: F.id, evo: !1 });
    const Ia = [...Ve.values()].sort(
        Ce
          ? (wn, Bn) =>
              (Bn.key === ia) - (wn.key === ia) ||
              (Bn.key === Ja) - (wn.key === Ja) ||
              b.movePower(Bn.key) - b.movePower(wn.key)
          : (wn, Bn) => wn.sort - Bn.sort || b.movePower(Bn.key) - b.movePower(wn.key),
      ),
      ka = F.level == null,
      Za = Ia.filter((wn) => wn.sort <= F.level).length,
      En = (wn) => (wn.evo ? (wn.sort ? wn.sort : e("Évo")) : wn.lvl),
      bn = (wn) => {
        const Bn = t.MOVES[wn.key],
          C = b.movePower(wn.key),
          g = wn.sort <= F.level,
          E = C <= 0,
          q = Rt(wn.key),
          Pe = q ? `${da[q[0]]} ${q[1]} %` : "",
          at = E
            ? e("Statut · {fx} · Précision {n} %", { fx: da[q[0]], n: Bn.acc || 100 })
            : (Bn.cat === "phys" ? e("Physique") : e("Spéciale")) +
              (b.moveAcc(wn.key) < 100 ? ` · ${Math.round(b.moveAcc(wn.key))} %` : "") +
              (q ? ` · ${Pe}` : ""),
          Mt = Is[Bn.type]
            ? ha(Bn.type, !0)
            : '<span class="type sm" style="--tc:#68a090;background:var(--tc)">???</span>',
          Pa =
            wn.from !== F.id
              ? `<span class="mvd-from">${ve(b.DEX[wn.from].name)}${wn.evo ? " · " + e("évolution") : ""}</span>`
              : wn.evo
                ? `<span class="mvd-from">${e("En évoluant")}</span>`
                : "",
          Ta =
            wn.key === ia
              ? `<span class="mvd-tag">${e("Riposte")}</span>`
              : wn.key === Ja
                ? `<span class="mvd-tag rage">${e("Rage")}</span>`
                : "";
        return `<li class="mvd-row${g ? " done" : ""}${E ? " fx" : ""}${wn.key === ia ? " riposte" : wn.key === Ja ? " rage" : ""}">
        ${Ce ? "" : `<span class="mvd-lv">${En(wn)}</span>`}
        <div class="mvd-mv">${Mt}<span class="n">${ve(Bn.name)} ${Ce ? Ta : Pa}<small>${at}</small></span><span class="pw">${E ? "—" : b.powerLabel(wn.key)}</span></div></li>`;
      },
      an = `<aside class="mvd${Ce ? " boss" : ""}" role="dialog" aria-label="${e("Attaques")}">
      <div class="mvd-head"><h3>${e("Attaques de {name}", { name: ve(b.DEX[F.id].name) })}${Ce && F.shiny ? " " + Yt() : ""}</h3><button class="dc-x" aria-label="${e("Fermer")}">✕</button></div>
      <div class="mvd-sum">${ka ? `<span>${e("Capacités <b>{n}</b>", { n: Ia.length })}</span>` : `<span>${e("Nv. <b>{n}</b>", { n: F.level })}</span>${Ce ? `<span>${e("Capacités <b>{n}</b>", { n: Ia.length })}</span>` : `<span>${e("Apprises <b>{n} / {max}</b>", { n: Za, max: Ia.length })}</span>`}`}</div>
      <ol class="mvd-road">${Ia.map(bn).join("")}</ol>
      <p class="mvd-foot">${Ce ? e("Contre chaque Pokémon, le boss choisit sa meilleure attaque.") + (Ja ? " " + e("Rage : sa jauge pleine, il frappe toute l'équipe avec cette attaque.") : "") : e("En combat, le Pokémon choisit sa meilleure attaque apprise contre l'adversaire en face.")}</p>
    </aside>`,
      Wn = _a || H('<div class="mvd-root"></div>');
    (Wn.classList.toggle("swap", !!_a),
      Wn.classList.toggle("dex", ka),
      (Wn.innerHTML = an),
      Wn.style.setProperty("--c", Is[b.DEX[F.id].types[0]].color),
      (f(".dc-x", Wn).onclick = Ua),
      (Wn.onclick = (wn) => {
        wn.target === Wn && Ua();
      }),
      _a ||
        ((_a = Wn),
        document.addEventListener("keydown", Ha, !0),
        document.body.appendChild(Wn),
        document.body.classList.add("mvd-open")),
      !ka && !Ce && ue(".mvd-row.done", Wn).pop()?.scrollIntoView({ block: "center" }));
  }
  let _a = null;
  const Ha = (F) => {
    F.key === "Escape" && (F.stopImmediatePropagation(), Ua());
  };
  function Ua() {
    if (!_a) return;
    const F = _a;
    ((_a = null),
      document.removeEventListener("keydown", Ha, !0),
      document.body.classList.remove("mvd-open"),
      F.classList.add("out"),
      Wa(() => F.remove(), 200));
  }
  function sn(F, Ce, Xe = !1) {
    const Ve = b.getMon(F);
    if (!Ve) return;
    const Rt = b.DEX[Ve.id],
      da = b.mainMove(Ve),
      ia = b.nextMoveUnlock(Ve),
      Ja = b.S.team.includes(F),
      Ia = b.can(Ve),
      ka = b.levelEvolution(Ve),
      Za = b.itemEvolutions(Ve).filter((kn) => kn.item !== "link-cable"),
      En = (t.EVOLUTIONS[Ve.id] || []).find((kn) => kn.item === "link-cable" && !b.evoBlocked(Ve, kn.to)),
      bn = (Ce || []).filter((kn) => b.getMon(kn)),
      an = bn.indexOf(F),
      Wn = an > 0 ? bn[an - 1] : null,
      wn = an >= 0 && an < bn.length - 1 ? bn[an + 1] : null,
      Bn = b.familyOf(Ve.id).length > 1 || !b.isLegend(Ve.id),
      C = (kn, Un, ps = "") => `<div class="dc-fact">${kn}<b class="${ps}">${Un}</b></div>`,
      g = () => `${b.curHp(Ve)}/${b.maxHp(Ve)}`,
      E = ["hp", "atk", "def", "spa", "spd", "spe"].reduce((kn, Un) => kn + Rt.stats[Un], 0),
      q = Ve.caughtAt
        ? new Date(Ve.caughtAt).toLocaleDateString(t.I18n.lang, {
            day: "numeric",
            month: "short",
            year: "numeric",
          })
        : "—",
      Pe = t.TYPES?.[da.type]?.color || Is[da.type]?.color,
      at = b.originOf(Ve),
      Mt =
        {
          egg: e("Éclos d'un œuf"),
          raid: e("Capturé en raid"),
          wild: e("Capture sauvage"),
          tower: e("Récompense de la Tour"),
          casino: e("Lot du Casino"),
          fossil: e("Fossile du Souterrain"),
          gift: e("Cadeau"),
          npc: e("Échange avec un habitant"),
        }[at.how] || (Ve.ot ? e("Reçu d'un dresseur") : "—"),
      Pa = at.ot ? ve(String(at.ot).split("#")[0]) : at.how === "npc" ? "—" : e("Toi"),
      Ta = H(`<div class="dexcard v2 mon-card">
      <div class="dc-head">
        <button class="dc-buddy" aria-pressed="false"><img src="${lt("love-ball")}" alt="${e("Copain")}"></button>
        <h2>${pa({ id: Ge(Ve.id), shiny: Ve.shiny })}</h2>
        <div class="dc-sum"><span>${e("N° {n}", { n: `<b>${Je(Ge(Ve.id))}</b>` })}</span><button class="dc-x" aria-label="${e("Fermer")}">✕</button></div></div>
      <div class="dc-top">
        <div class="dc-hero sprite"><div class="w">${Z(Ve.id, Ve.shiny, { cls: "art", center: !0 })}</div>${dt(Ve)}${Ia ? `<span class="dc-tag away" title="${ve(Ia)}"><img src="assets/ui/padlock.svg" alt="">${ve(e(t.STORY.REGIONS.find((kn) => kn.key === b.regOf(Ve))?.name || ""))}</span>` : `<span class="dc-tag">${e(Ja ? "Dans l'équipe" : "PC")}</span>`}</div>
        <div class="dc-id">
          <div class="genus">${ve(Rt.genus)}</div>
          <div class="badges">${Ot(Ve.id)} ${rt(Ve.id)}</div>
          <div class="dc-facts two">${C(e("Niveau"), e("Nv. {n}", { n: Ve.level }), "lvl")}${C(e("PV"), g(), "hp-now")}</div>
          <div class="dc-move" style="--tc:${Pe}"><span><b>${ve(da.name)}</b> ${ha(da.type, !0)}</span><span class="pw">${da.power ? e("Puiss. <b>{n}</b>", { n: b.powerLabel(da.key) }) : e("aucun effet…")}</span>
            ${ia ? `<small>${e("Nv. {n}", { n: ia.level })} → ${ve(ia.move.name)} (${b.powerLabel(ia.move.key)})</small>` : ""}</div>
        </div>
      </div>
      <div class="dc-sec dc-xp">
        <div class="dc-bud-gauge" hidden><div class="bar"><div></div></div><span class="end"></span></div>
        <div class="xpbar big"><div></div><span></span></div>
        <div class="dc-candies"></div>
      </div>
      ${fn("Statistiques", e("Total <b>{n}</b>", { n: E }) + on(Ve), `<div class="stats-slot">${An(Ve.id, Ve)}</div>`, !1)}
      ${Bn ? '<div class="dc-sec fam-sec"></div>' : ""}
      ${fn(
        "Historique",
        '<span class="buddy-sum"></span>',
        `<div class="dc-facts two dc-history">
        ${C(Ve.ot ? e("Reçu le") : e("Capturé le"), q)}${C(e("Lieu"), at.where ? ve(e(at.where)) : "—")}${C(e("Origine"), Mt)}${C(e("Dresseur d'origine"), Pa)}${C(e("Victoires"), Ve.wins != null ? vt(Ve.wins) : "—")}${Ve.tries != null ? C(e("Essais"), vt(Ve.tries)) : ""}</div>`,
        !1,
      )}
      <div class="item-actions more-actions"></div>
    </div>`);
    W(f(".w", Ta), { amp: 1 });
    const La = f(".fam-sec", Ta);
    function xa() {
      const kn = b.famPool(Ve.reg, Ve.shiny),
        Un = b.famIds(Ve.id),
        ps = {};
      for (const bs of kn) b.familyOf(Ve.id).includes(bs.id) && (ps[bs.id] ||= []).push(bs);
      const Gn = b.keepOn(Ve.id),
        ms = Object.values(ps).flat().length,
        ws = Un.length + (Gn || Ve.shiny ? 1 : 0),
        Bs = ms >= ws,
        Rs = new Set(
          b.rankOf(Ve)
            ? []
            : (t.EVOLUTIONS[Ve.id] || [])
                .filter((bs) => bs.level && b.evoBlocked(Ve, bs.to))
                .map((bs) => bs.to),
        ),
        Gs = [
          ["own", e("Possédé")],
          ["cur", e("Ce Pokémon")],
          ["free", e("Place libre")],
        ]
          .map(([bs, zs]) => `<span><i class="fam-sw ${bs}"></i>${zs}</span>`)
          .join("");
      La.innerHTML = `<h4>${e("Famille")} ${Ra(`<b>${e("Famille")}</b><p>${e("Un de chaque espèce : les doublons se changent en XP pour la famille, sauf ceux que « Garder les doublons » garde. Les chromatiques comptent à part et gardent toujours un doublon de la forme de base.")}</p><span class="fam-key">${Gs}</span>`)}<span class="fam-n${Bs ? " done" : ""}">${Bs ? "✓ " : ""}<b>${ms}</b> / ${ws}</span></h4>
        ${Ba(Ve.id, { current: Ve.id, shiny: Ve.shiny, k: 2, family: { owned: ps, on: !Bs, wait: Rs, mon: Ve, reach: new Set(Un) } })}
        ${
          Ve.shiny || b.isLegend(Ve.id)
            ? ""
            : `<div class="op-row keep-row${Gn ? " on" : ""}" role="switch" aria-checked="${Gn}" tabindex="0">
          <div class="t"><b>${e("Garder les doublons")} ${Ra(`<b>${e("Garder les doublons")}</b><p>${e("Désactivé : un doublon se change en XP, sauf s'il peut encore devenir une évolution que tu n'as pas (un Mystherbe pour Rafflesia, un autre pour Joliflor) ; une famille à plusieurs branches garde aussi une forme de base. Activé : un de chaque espèce, plus un doublon de la forme de base.")}</p>`)}</b></div>
          <span class="op-sw"></span></div>`
        }`;
      const Os = f(".keep-row", La);
      if (!Os) return;
      const Es = () => {
        (b.setKeep(Ve.id, !b.keepOn(Ve.id)), t.Sfx.click?.(), xa());
      };
      ((Os.onclick = (bs) => {
        bs.target.closest(".info-tip") || Es();
      }),
        (Os.onkeydown = (bs) => {
          (bs.key === "Enter" || bs.key === " ") &&
            !bs.target.closest(".info-tip") &&
            (bs.preventDefault(), Es());
        }));
    }
    La && xa();
    const en = f(".more-actions", Ta),
      rn = f(".dc-candies", Ta),
      hn = f(".xpbar > div", Ta),
      Fn = f(".xpbar > span", Ta);
    let Ln;
    f(".dc-x", Ta).onclick = () => Ln(null);
    const Pn = f(".dc-move", Ta);
    (Pn.classList.add("tap"),
      (Pn.tabIndex = 0),
      Pn.setAttribute("role", "button"),
      (Pn.onclick = () => (_a ? Ua() : Ka(Ve))),
      (Pn.onkeydown = (kn) => {
        (kn.key === "Enter" || kn.key === " ") && (kn.preventDefault(), Ka(Ve));
      }));
    const jn = () =>
        Ve.level >= a.MAX_LEVEL
          ? e("Niveau max")
          : b.capped(Ve)
            ? e("Plafond Nv. {n} : prochain badge requis", { n: b.capFor(Ve) })
            : e("XP {n} / {max}", { n: vt(Ve.xp), max: vt(b.xpForNext(Ve.level, Ve)) }),
      h = () => (b.capped(Ve) ? 100 : (Ve.xp / b.xpForNext(Ve.level, Ve)) * 100);
    let k = 0;
    (((kn, Un) => {
      (Un || (hn.style.transition = "none"),
        (hn.style.width = kn + "%"),
        (k = kn),
        Un || (hn.offsetWidth, (hn.style.transition = "")));
    })(h(), !1),
      (Fn.textContent = jn()));
    const Ie = (kn = Ve.level) => {
      t.Sfx.levelup();
      const Un = f(".sprite", Ta),
        ps = Ta.getBoundingClientRect(),
        Gn = Un.getBoundingClientRect();
      ze(Ta, Gn.left - ps.left + Gn.width / 2, Gn.top - ps.top + Gn.height / 2, { n: 14, dist: 90 });
      const ms = H(`<div class="lvlup-banner">${e("Niveau supérieur !")}</div>`);
      (Un.appendChild(ms),
        N(
          ms,
          [
            { opacity: 0, transform: "translate(-50%, 10px) scale(.6)" },
            { opacity: 1, transform: "translate(-50%, -6px) scale(1.1)", offset: 0.25 },
            { opacity: 1, transform: "translate(-50%, -10px) scale(1)", offset: 0.8 },
            { opacity: 0, transform: "translate(-50%, -24px) scale(1)" },
          ],
          1300,
        ).then(() => ms.remove()),
        N(f(".w img", Ta), [{ filter: "brightness(2.2)" }, { filter: "brightness(1)" }], 500));
      const ws = f(".lvl", Ta);
      ((ws.textContent = e("Nv. {n}", { n: kn })),
        N(
          ws,
          [
            { transform: "scale(1)", color: "var(--yellow)" },
            { transform: "scale(1.5)", color: "var(--yellow)", offset: 0.3 },
            { transform: "scale(1)", color: "var(--yellow)", offset: 0.7 },
            { transform: "scale(1)" },
          ],
          900,
        ),
        f(".xpbar", Ta).classList.remove("xp-glow"),
        hn.offsetWidth,
        f(".xpbar", Ta).classList.add("xp-glow"));
    };
    let Le = Ve.level,
      Pt = 0,
      Nt = !1;
    const Qt = (kn) => Math.min(1800, 700 + 220 * kn),
      ma = (kn) => 1 - Math.pow(1 - kn, 4),
      $a = () =>
        new Promise((kn) => {
          const Un = ++Pt,
            ps = Ve.level,
            Gn = h();
          ((Fn.textContent = jn()),
            (f(".stats-slot", Ta).innerHTML = An(Ve.id, Ve)),
            (f(".hp-now", Ta).textContent = g()));
          const ms = Le,
            ws = Math.max(0, ps - ms),
            Bs = k / 100,
            Rs = ws + Gn / 100 - Bs,
            Gs = Nt,
            Os = Gs ? 250 : Qt(ws);
          ((Nt = !0), (hn.style.transition = "none"));
          const Es = zn.now();
          let bs = 0;
          const zs = (lo) => {
            if (Un !== Pt) return kn(!1);
            if (!Ta.isConnected) return kn((Nt = !1));
            const Zs = Math.min(1, (lo - Es) / Os),
              to = Bs + Rs * ma(Zs),
              co = bs;
            for (; bs < ws && to >= bs + 1;) Gs ? bs++ : Ie(ms + ++bs);
            if (
              (Gs && bs > co && Ie(ms + bs),
              (Le = ms + bs),
              (k = Zs >= 1 ? Gn : Math.max(0, Math.min(100, (to - bs) * 100))),
              (hn.style.width = k + "%"),
              Zs < 1)
            )
              return es(zs);
            ((hn.style.transition = ""), (Le = ps), (Nt = !1), kn(!0));
          };
          es(zs);
        });
    let Fa = null,
      fa = !1;
    const ga = () => {
        ((fa = !1), t.App.refresh(), t.Screens.adventure?.refreshTeam());
      },
      qa = async (kn, Un) => {
        (Ps(), Qn ? (fa = !0) : ga(), kn.evolve && (Fa = kn.evolve), !(!(await $a()) || !Fa || Qn) && ja());
      },
      ja = async () => {
        const kn = Fa;
        ((Fa = null), Ta.isConnected && (Ln(), await Me(kn), sn(F, Ce)));
      },
      pn = (kn) =>
        kn >= 1e9
          ? `${+(kn / 1e9).toFixed(1)}Md`
          : kn >= 1e6
            ? `${+(kn / 1e6).toFixed(1)}M`
            : kn >= 1e3
              ? `${+(kn / 1e3).toFixed(1)}k`
              : `${kn}`,
      dn = b.bagOk(Ve),
      _n = [...Object.keys(a.EXP_CANDIES), "rare-candy"].map((kn) => {
        const Un = H(
            `<button class="dc-candy" title="${ve(kt(kn))}"><img src="${lt(kn)}" alt=""><i></i><span></span></button>`,
          ),
          ps = () => {
            const Gn = Ve.level,
              ms = b.useItem(F, kn);
            ms && (N(Un, [{ transform: "scale(.92)" }, { transform: "scale(1)" }], 160), qa(ms, Gn));
          };
        return (
          kn === "rare-candy"
            ? (Un.onclick = ps)
            : ((Un.onpointerdown = (Gn) => {
                Gn.button > 0 || Un.disabled || (Gn.preventDefault(), Cs(Un, ps, Gn));
              }),
              (Un.onclick = (Gn) => {
                Gn.detail === 0 && ps();
              })),
          (Un.oncontextmenu = (Gn) => Gn.preventDefault()),
          { id: kn, btn: Un }
        );
      });
    let as = null,
      Qn = !1,
      os = null,
      Ms = -1e9;
    function Cs(kn, Un, ps) {
      if ((rs(), ps.pointerType !== "mouse" && zn.now() - Ms < 700)) {
        Un();
        return;
      }
      ((Qn = !0), Un());
      let Gn = 380;
      const ms = () => {
        as = Wa(() => {
          kn.disabled || !Ta.isConnected || (Un(), (Gn = Math.max(70, Gn * 0.75)), ms());
        }, Gn);
      };
      (ms(), (os = ae(kn, rs, ps)));
    }
    function rs() {
      (clearTimeout(as),
        (as = null),
        os?.(),
        (os = null),
        Qn && ((Qn = !1), (Ms = zn.now()), fa && ga(), Fa && !Nt && ja()));
    }
    function Ps() {
      const kn = b.capped(Ve);
      for (const { id: Un, btn: ps } of _n) {
        const Gn = b.itemCount(Un);
        ((f("i", ps).textContent = pn(Gn)),
          (f("span", ps).textContent = a.EXP_CANDIES[Un]
            ? `+${pn(Math.round(b.expCandyXp(Un)))}`
            : e("+1 Nv.")),
          (ps.disabled = Gn <= 0 || kn || !!dn),
          (ps.title = dn || kt(Un)));
      }
    }
    (Ps(), rn.append(..._n.map((kn) => kn.btn)));
    const vs = f(".dc-buddy", Ta),
      ys = f(".buddy-sum", Ta),
      Ts = f(".dc-bud-gauge", Ta);
    f(".end", Ts).innerHTML = Fe();
    const js = e("+{n} % d'XP en combat · bonus d'XP tous les {ko} K.O.", {
      n: Math.round((a.BUDDY_XP_MULT - 1) * 100),
      ko: b.buddyGoal(Ve),
    });
    let As = null;
    function $s() {
      const kn = b.S.buddy.uid === F;
      if (((Ts.hidden = !kn), !kn)) {
        As = null;
        return;
      }
      const Un = b.S.buddy.ko,
        ps = b.buddyGoal(Ve);
      (As != null &&
        Un < As &&
        N(
          f(".end", Ts),
          [{ transform: "scale(1)" }, { transform: "scale(1.5)", offset: 0.4 }, { transform: "scale(1)" }],
          350,
        ),
        (As = Un),
        (f(".bar > div", Ts).style.width = `${(Un / ps) * 100}%`),
        (Ts.title = e("Copain : {n} / {max} K.O. avant le prochain bonus d'XP", { n: Un, max: ps })));
    }
    function qs() {
      $s();
      const kn = b.buddyMon(),
        Un = kn?.uid === F;
      (vs.classList.toggle("on", Un),
        vs.setAttribute("aria-pressed", Un),
        (vs.title = Un
          ? e("Copain : {perk} · cliquer pour retirer", { perk: js })
          : kn
            ? e("Choisir comme copain : {perk} · remplace {name}", { perk: js, name: b.DEX[kn.id].name })
            : e("Choisir comme copain : {perk}", { perk: js })),
        (ys.innerHTML = Un ? e("Copain · <b>{perk}</b>", { perk: js }) : ""));
    }
    ((vs.onclick = () => {
      (b.setBuddy(b.buddyMon()?.uid === F ? null : F),
        t.Sfx.buy(),
        qs(),
        N(
          vs,
          [{ transform: "scale(.8)" }, { transform: "scale(1.15)", offset: 0.6 }, { transform: "scale(1)" }],
          300,
        ),
        t.App.refresh());
    }),
      qs());
    const Xs = Ss(() => {
      if (!Ta.isConnected) return clearInterval(Xs);
      ((f(".hp-now", Ta).textContent = g()), $s(), Ps());
    }, 500);
    if (ka) {
      const kn = H(
        `<button class="btn small gold evo-btn" title="${e("Évolue en {name}", { name: ve(b.DEX[ka.to].name) })}"><i class="evo-ic">▲</i>${e("Évoluer")}</button>`,
      );
      ((kn.onclick = async () => {
        (Ln(), await Me({ uid: F, from: Ve.id, to: ka.to }), sn(F, Ce));
      }),
        en.appendChild(kn));
    }
    if (b.plateChoices(Ve).length) {
      const kn = H(`<button class="btn small gold evo-btn"><i class="evo-ic">▲</i>${e("Évoluer")}</button>`);
      ((kn.onclick = async () => {
        (Ln(), await On(F), sn(F, Ce));
      }),
        en.appendChild(kn));
    }
    const Ds = t.Underground?.rankOf(Ve);
    if (Ds && (Ds.have || Ve.rank) && (Ve.rank || 0) < a.UNDERGROUND.RANK_MAX) {
      const kn = H(
        `<button class="btn small gold rk-btn"${Ds.why ? ` title="${ve(Ds.why)}"` : ""}><img src="${lt("gem-" + t.Underground.gemType(Ds.key))}" alt="">${e("Rang {r}", { r: Re[Ds.next] })} <small class="muted">${vt(Ds.have)}/${vt(Ds.need)}</small></button>`,
      );
      ((kn.disabled = !!Ds.why),
        (kn.onclick = async () => {
          (Ln(), await ts(F), sn(F, Ce));
        }),
        en.appendChild(kn));
    }
    const Qs = (kn, Un, ps, Gn = en, ms) => {
      const ws = b.itemCount(kn),
        Bs = H(
          `<button class="btn small ${ms ? "gold" : "outline"}"${ms ? ` title="${ve(kt(kn))} → ${ve(b.DEX[ms].name)} (x${ws})"` : ""}><img src="${lt(kn)}" alt="">${Un} <small class="muted">x${ws}</small></button>`,
        );
      ((Bs.disabled = ws <= 0 || !!dn), dn && (Bs.title = dn), (Bs.onclick = ps), Gn.appendChild(Bs));
      const Rs = b.S.link,
        Gs = Rs?.stash?.items?.[kn] || 0;
      if (ms && ws <= 0 && Gs > 0) {
        const Os = t.STORY.REGIONS,
          Es = Os.find((zs) => zs.key === (Rs.side === "from" ? Rs.to : Rs.from)),
          bs = Os.find((zs) => zs.key === Rs.to);
        Gn.appendChild(
          H(
            `<small class="muted">${e("{item} ×{n} dans le Sac de {region} : les deux Sacs se réunissent quand tu bats la Ligue de {to}.", { item: ve(kt(kn)), n: ws, region: ve(e(Es.name)), to: ve(e(bs.name)) })}</small>`,
          ),
        );
      }
    };
    if (b.rankOf(Ve) && (t.EVOLUTIONS[Ve.id] || []).length)
      en.appendChild(H(`<small class="muted">${e("Un Pokémon monté en rang n'évolue plus.")}</small>`));
    else
      for (const kn of (t.EVOLUTIONS[Ve.id] || []).filter(
        (Un) => Un.item && Un.item !== "link-cable" && b.evoBlocked(Ve, Un.to),
      )) {
        Qs(kn.item, e("Évoluer"), () => {}, en, kn.to);
        const Un = en.lastElementChild;
        ((Un.disabled = !0), (Un.title = e("{name} déjà possédé", { name: b.DEX[kn.to].name })));
      }
    En &&
      en.appendChild(
        H(
          `<small class="muted">${e("Évolue en {name} quand il est échangé.", { name: ve(b.DEX[En.to].name) })}</small>`,
        ),
      );
    for (const kn of Za)
      Qs(
        kn.item,
        e("Évoluer"),
        async () => {
          const Un = b.useItem(F, kn.item, kn.to);
          Un && (Ln(), await Aa(Un.evolve), sn(F, Ce));
        },
        en,
        kn.to,
      );
    const Us = [...en.querySelectorAll(":scope > .btn")],
      Vn = Math.ceil(Us.length / 3);
    for (let kn = 0, Un = 0; kn < Vn; kn++) {
      const ps = Math.ceil((Us.length - Un) / (Vn - kn));
      for (let Gn = 0; Gn < ps; Gn++) Us[Un++].style.gridColumn = `span ${6 / ps}`;
    }
    if (
      !Ja &&
      b.S.mons.includes(Ve) &&
      !b.DEX[Ve.id].unique &&
      !b.DEX[Ve.id].legendary &&
      !b.DEX[Ve.id].mythical
    ) {
      const kn = H(
          '<div class="rel-row"><button class="btn small outline rel-btn" title="' +
            e("Relâcher") +
            '" aria-label="' +
            e("Relâcher") +
            '"><svg class="rel-ic" viewBox="0 0 24 24" aria-hidden="true"><path d="M4 7h16M9 7V4h6v3M6 7l1 13h10l1-13M10 11v6M14 11v6" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg></button></div>',
        ),
        Un = kn.firstChild;
      ((Un.onclick = async () => {
        Ln();
        const ps = Ve.shiny || b.isLegend(Ve.id);
        (await Na(
          `${e("Relâcher définitivement <b>{name}</b> Nv. {n} ?", { name: pa(Ve), n: Ve.level })}${ps ? `<br><small>⚠️ ${e("Ce Pokémon est rare ou chromatique.")}</small>` : ""}`,
          e("Relâcher"),
        )) && b.releaseMon(F)
          ? (qt(e("{name} est relâché. Bye bye !", { name: pa(Ve) })), t.Screens?.team?.render?.())
          : sn(F, Ce);
      }),
        f(".dc-hero", Ta).appendChild(kn));
    }
    Ma({
      className: "dexcard-modal mon-modal",
      body: Ta,
      actions: [],
      swap: Xe,
      onOpen: (kn, Un, ps) => {
        if (
          ((Ln = Un),
          kn.style.setProperty("--c", Is[Rt.types[0]].color),
          kn.querySelectorAll("details[data-fold]").forEach((Gn) =>
            Gn.addEventListener("toggle", () => {
              xn[Gn.dataset.fold] = Gn.open;
            }),
          ),
          _a && Ka(Ve),
          !!bn.length)
        ) {
          for (const [Gn, ms, ws] of [
            ["prev", "‹", Wn],
            ["next", "›", wn],
          ]) {
            const Bs = H(
              `<button class="dc-nav ${Gn}" aria-label="${Gn === "prev" ? "Précédent" : "Suivant"}">${ms}</button>`,
            );
            (ws ? (Bs.onclick = () => Un({ go: ws })) : (Bs.disabled = !0), kn.appendChild(Bs));
          }
          (ft(kn),
            document.addEventListener(
              "keydown",
              (Gn) => {
                const ms = Gn.key === "ArrowLeft" ? Wn : Gn.key === "ArrowRight" ? wn : null;
                ms && Un({ go: ms });
              },
              { signal: ps },
            ));
        }
      },
    }).then((kn) => {
      kn?.go ? sn(kn.go, Ce, !0) : Ua();
    });
  }
  let Be = null;
  function Ut(F) {
    const Ce = b.getMon(F);
    if (!Ce) return;
    const Xe = b.can(Ce);
    if (Xe) {
      qt(`${V}${ve(Xe)}`);
      return;
    }
    ((Be = F),
      document.body.classList.add("swap-mode"),
      document.querySelector(".screen.active [data-team-uid]") || t.App.show("team"));
    const Ve = H(`<div class="swap-hint" id="swap-hint">
        <span class="sprbox-wrap">${Oe(Ce.id, Ce.shiny, 1, 40)}</span>
        <span>${e("Choisis le Pokémon de l'équipe à remplacer par <b>{name}</b>", { name: ve(b.DEX[Ce.id].name) })}</span>
        <button class="btn small ghost">${e("Annuler")}</button>
      </div>`);
    ((f("button", Ve).onclick = aa), document.body.appendChild(Ve), t.Sfx.click());
  }
  function aa() {
    ((Be = null), document.body.classList.remove("swap-mode"), f("#swap-hint")?.remove());
  }
  (document.addEventListener(
    "click",
    (F) => {
      if (!Be || F.target.closest("#swap-hint")) return;
      const Ce = F.target.closest("[data-team-uid]");
      if ((F.preventDefault(), F.stopPropagation(), Ce)) {
        const Xe = b.S.team.indexOf(Ce.dataset.teamUid);
        if (Xe >= 0 && !b.S.team.includes(Be)) {
          const Ve = b.getMon(b.S.team[Xe]),
            Rt = b.getMon(Be);
          b.S.team[Xe] = Be;
          const da = b.getMon(b.keepOne(b.S.team, Be));
          (b.save(),
            t.Sfx.buy(),
            qt(
              da?.id === Rt.id
                ? Rt.shiny
                  ? e("Un seul {name} chromatique par équipe : l'autre retourne au PC.", {
                      name: ve(b.DEX[Rt.id].name),
                    })
                  : e("Un seul {name} par équipe : l'autre retourne au PC.", { name: ve(b.DEX[Rt.id].name) })
                : e("{a} remplace {b} dans l'équipe !", {
                    a: ve(b.DEX[Rt.id].name),
                    b: ve(b.DEX[Ve.id].name),
                  }),
              De(Rt.id, Rt.shiny),
            ));
        }
      }
      (aa(), t.App.refresh());
    },
    !0,
  ),
    document.addEventListener("keydown", (F) => {
      Be && F.key === "Escape" && aa();
    }));
  {
    let F = 0,
      Ce = 0,
      Xe = 0;
    const Ve = () => {
      (clearTimeout(F), (F = 0));
    };
    (document.addEventListener(
      "pointerdown",
      (Rt) => {
        if ((Ve(), Rt.pointerType !== "touch")) return;
        const da = Rt.target.closest("[title]");
        !da ||
          !da.title ||
          da.closest(".pc-cell, .slot.filled, .pen-res, .tr-row, .dc-candy") ||
          ((Ce = Rt.clientX),
          (Xe = Rt.clientY),
          (F = Wa(() => {
            ((F = 0), qt(ve(da.title)));
          }, 450)));
      },
      !0,
    ),
      document.addEventListener(
        "pointermove",
        (Rt) => {
          F && Math.hypot(Rt.clientX - Ce, Rt.clientY - Xe) > 8 && Ve();
        },
        !0,
      ),
      document.addEventListener("pointerup", Ve, !0),
      document.addEventListener("pointercancel", Ve, !0));
  }
  function ae(F, Ce, Xe) {
    const Ve = new AbortController(),
      Rt = { signal: Ve.signal },
      da = () => {
        (Ve.abort(), Ce());
      };
    for (const ia of ["pointerup", "pointercancel", "touchend", "touchcancel"])
      (F.addEventListener(ia, da, Rt), addEventListener(ia, da, Rt));
    if (
      (addEventListener(
        "pointerdown",
        (ia) => {
          ia !== Xe && da();
        },
        { signal: Ve.signal, capture: !0 },
      ),
      Xe?.pointerId != null)
    )
      try {
        (F.setPointerCapture(Xe.pointerId), F.addEventListener("lostpointercapture", da, Rt));
      } catch {}
    return (
      addEventListener("blur", da, Rt),
      document.addEventListener("visibilitychange", da, Rt),
      () => Ve.abort()
    );
  }
  function ft(F) {
    let Ce = null,
      Xe = 0;
    (F.addEventListener(
      "touchstart",
      (Ve) => {
        if (Ve.touches.length !== 1 || Ve.target.closest(".dc-candies, .lifted")) {
          Ce = null;
          return;
        }
        ((Ce = Ve.touches[0].clientX), (Xe = Ve.touches[0].clientY));
      },
      { passive: !0 },
    ),
      F.addEventListener("touchend", (Ve) => {
        if (Ce === null) return;
        const Rt = Ve.changedTouches[0],
          da = Rt.clientX - Ce,
          ia = Rt.clientY - Xe;
        if (((Ce = null), Math.abs(da) < 60 || Math.abs(da) < Math.abs(ia) * 1.5)) return;
        const Ja = F.querySelector(`.dc-nav.${da < 0 ? "next" : "prev"}`);
        Ja && !Ja.disabled && Ja.click();
      }));
  }
  let ht = !1;
  document.addEventListener(
    "touchmove",
    (F) => {
      ht && F.cancelable && F.preventDefault();
    },
    { passive: !1 },
  );
  const ea = {
      start(F, Ce, Xe) {
        const Ve = () => {
          try {
            Ce.setPointerCapture(F.pointerId);
          } catch {}
        };
        if (F.pointerType !== "touch") {
          (F.preventDefault(), Ve());
          return;
        }
        Xe.hold = Wa(() => {
          ((Xe.hold = 0), (ht = !0), Ve(), Ce.classList.add("lifted"), navigator.vibrate?.(12));
        }, 260);
      },
      waiting(F, Ce, Xe) {
        return F.cancelled
          ? !0
          : F.hold
            ? (Math.hypot(Ce, Xe) > 8 && (clearTimeout(F.hold), (F.hold = 0), (F.cancelled = !0)), !0)
            : !1;
      },
      end(F, Ce) {
        (clearTimeout(F.hold), (ht = !1), Ce.classList.remove("lifted"));
      },
    },
    Ra = (F) =>
      `<button type="button" class="info-tip" aria-label="${ve(e("Informations"))}">i<span class="bag-tip info-tip-box" role="tooltip">${F}</span></button>`,
    Ca = (F, Ce) => Ra(`<b>${F}</b><p>${Ce}</p>`),
    gn = (F, Ce, Xe) => {
      const Ve = f(F);
      Ve && !Ve.nextElementSibling?.matches(".info-tip") && Ve.insertAdjacentHTML("afterend", Ca(Ce, Xe));
    },
    yn = (F, Ce, Xe = "", Ve = "") =>
      `<span class="tip-host ${Ve}" tabindex="0">${F}<span class="bag-tip info-tip-box" role="tooltip"><b>${ve(Ce)}</b>${Xe ? `<p>${Xe}</p>` : ""}</span></span>`,
    mn = (F) => {
      const Ce = f(".pc-more-btn", F),
        Xe = f(".pc-more", F),
        Ve = f("b", Ce);
      let Rt = 0;
      const da = (ia) => {
        (Xe.classList.toggle("open", ia),
          Ce.setAttribute("aria-expanded", ia),
          Ce.classList.toggle("on", ia || Rt > 0));
      };
      return (
        (Ce.onclick = (ia) => {
          (ia.stopPropagation(), da(!Xe.classList.contains("open")));
        }),
        document.addEventListener("click", (ia) => {
          ia.target.closest(".pc-more") || da(!1);
        }),
        document.addEventListener("keydown", (ia) => {
          ia.key === "Escape" && da(!1);
        }),
        (ia) => {
          ((Rt = ia), (Ve.textContent = Rt || ""), (Ve.hidden = !Rt), da(Xe.classList.contains("open")));
        }
      );
    },
    ln = new Set(["rare-candy"]),
    In = (F) => (Math.round(F * 1e3) / 10).toLocaleString(t.I18n?.lang || "fr"),
    xe = (F) => (typeof F == "object" ? F?.p : F),
    Et = (F) => {
      const Ce = typeof F == "object" ? (F?.owns || []).filter((Xe) => !b.owns(Xe)) : [];
      return Ce.length ? Ce : null;
    };
  function oa(F) {
    const Ce = t.STORY,
      Xe = b.S.adv || {},
      Ve = Xe.unlocked || 0;
    if (ln.has(F)) return null;
    let Rt = null;
    Ce.CHAPTERS.forEach((ka, Za) => {
      if (!Rt) {
        const En = ka.steps.find((bn) => (bn.kind === "find" && bn.item === F) || bn.loot?.[F]);
        En && (Rt = { ch: Za, st: En });
      }
    });
    const da = a.SHOP.find((ka) => ka.id === F);
    if (!Rt && !da) return null;
    const ia = {},
      Ja = !Rt && a.UNDERGROUND?.LOOT?.ITEMS.find((ka) => ka.guard && ka.of?.includes(F));
    if (
      (Ja &&
        (ia.under = {
          floor: a.UNDERGROUND.LOOT.BANDS[Ja.w.findIndex((ka) => ka > 0)],
          found: !!Xe.gifts?.[F],
          lock: !!t.Screens?.underground?.lockWhy?.(),
        }),
      Rt)
    ) {
      const ka = Ce.regionOf(Rt.ch),
        Za = Ce.firstChapterOf(ka.key) <= Ve;
      ia.find = {
        ch: Rt.ch,
        place: Rt.st.name,
        chapter: Ce.CHAPTERS[Rt.ch].name,
        reg: ka,
        reached: Za,
        lock: Rt.ch > Ve,
        found: !!Xe.gifts?.[Rt.st.loot ? F : Rt.st.once],
        loot: xe(Rt.st.loot?.[F]),
        need: Et(Rt.st.loot?.[F]),
        lowTide: Rt.st.tide === "low",
      };
    }
    const Ia = !da?.once || !!Xe.gifts?.[da.once];
    return (
      da &&
        (!da.region || Ce.regionUnlocked(da.region, Xe)) &&
        (!ia.find || ia.find.reached) &&
        (!Ia || b.shopUnlocked(da)) &&
        (ia.shop = { price: b.shopPrice(da), open: Ia }),
      ia.find || ia.shop || ia.under ? ia : null
    );
  }
  function sa(F) {
    const Ce = oa(F);
    if (!Ce) return "";
    const Xe = Ce.find,
      Ve = [];
    Xe && !Xe.reached
      ? Ve.push(
          `<li class="lk far"><i class="bd"><img src="${lt("poke-ball")}" alt=""></i><b>???</b><span>${e("Plus loin dans l'aventure")}</span></li>`,
        )
      : Xe &&
        Ve.push(
          `<li data-go="ch" data-v="${Xe.ch}" title="${e("voir dans la Progression")}"><i class="bd">${((da) => (da ? da.chapterBadge(da.chapterMeta(Xe.ch), 2) : ""))(t.Screens?.adventure)}</i><b>${Xe.lock ? V : ""}${ve(e(Xe.place))}</b><span>${ve(e(Xe.reg.name))} · ${ve(e(Xe.chapter))}</span><small class="${Xe.found ? "ok" : ""}">${Xe.found ? e("✓ Déjà trouvé") : Xe.loot ? e("{n} % ›", { n: In(Xe.loot) }) : e("Une fois ›")}</small>${Xe.loot && !Xe.found ? `<p class="iw-note">${e("{n} % de chances à chaque objet trouvé à cet endroit, une seule fois", { n: In(Xe.loot) })}</p>` : ""}${Xe.lowTide && !Xe.found ? `<p class="iw-note">${e("Seulement à marée basse : la marée change toutes les 3 h")}</p>` : ""}${Xe.need && !Xe.found ? `<p class="iw-note">${V}${e("Tombe seulement si tu possèdes {names}", { names: Xe.need.map((da) => b.DEX[da].name).join(", ") })}</p>` : ""}</li>`,
        );
    const Rt = Ce.under;
    return (
      Rt &&
        Ve.push(
          `<li ${Rt.lock ? 'class="lk"' : `data-go="ug" title="${e("Voir le Souterrain")}"`}><i class="bd"><img src="assets/ui/explorer-kit.png" alt=""></i><b>${Rt.lock ? V : ""}${e("Souterrain")}</b><span>${e("Gardiens, dès l'étage {n}", { n: Rt.floor })}</span><small class="${Rt.found ? "ok" : ""}">${Rt.found ? e("✓ Déjà trouvé") : Rt.lock ? "" : e("Rare ›")}</small></li>`,
        ),
      Ce.shop &&
        Ve.push(
          Ce.shop.open
            ? `<li data-go="shop" data-v="${F}" title="${e("Voir à la Boutique")}"><i class="bd"><img src="assets/ui/pokemart.png" alt=""></i><b>${e("Boutique")}</b><span>${vt(Ce.shop.price)} ₽</span><small class="go">${e("Acheter ›")}</small></li>`
            : `<li class="lk"><i class="bd"><img src="assets/ui/pokemart.png" alt=""></i><b>${V}${e("Boutique")}</b><span>${e(Rt ? "Une fois trouvé au Souterrain" : "Une fois trouvé dans l'aventure")}</span></li>`,
        ),
      `<h5 class="iw-h">${e("Où le trouver")}</h5><ul class="item-where">${Ve.join("")}</ul>`
    );
  }
  function Ga(F, Ce, { note: Xe = "", desc: Ve = "" } = {}) {
    const Rt = sa(F),
      da = kt(F) + Xe;
    return Rt
      ? `<span class="tip-host item-tip" tabindex="0">${Ce}<span class="bag-tip info-tip-box" role="tooltip"><b>${ve(da)}</b>${Ve ? `<p>${ve(Ve)}</p>` : ""}${Rt}</span></span>`
      : Ce.replace("<img ", `<img title="${ve(da)}" `);
  }
  const cn = (F) =>
      (F.item ? Ga(F.item, `<img class="cond-it" src="${lt(F.item)}" alt="">`) : "") + ve(F.text),
    Tn = (F) => (F.lines ? F.lines.map(cn).join(" · ") : cn(F));
  function Mn(F, Ce) {
    if (
      (ue(".info-tip.open, .tip-host.open").forEach((Rt) => Rt.classList.remove("open")),
      f("#modal-root.open") && document.dispatchEvent(new KeyboardEvent("keydown", { key: "Escape" })),
      F === "shop")
    )
      return t.Screens.shop.open?.(Ce);
    if (F === "ug") return t.App.show("underground");
    const Xe = t.STORY,
      Ve = Xe.regionOf(+Ce);
    t.Screens.map.open(Ve.key, Xe.CHAPTERS[+Ce].league ? "L" : +Ce);
  }
  const ks = ".topbar, #screen-adventure.active .newsbar, .team-mini, .pc-sticky";
  function ss() {
    let F = 0;
    return (
      document.querySelectorAll(ks).forEach((Ce) => {
        const Xe = getComputedStyle(Ce),
          Ve = Ce.getBoundingClientRect();
        !Ve.height ||
          !/sticky|fixed/.test(Xe.position) ||
          Ve.top > (parseFloat(Xe.top) || 0) + 1 ||
          (F = Math.max(F, Ve.bottom));
      }),
      F
    );
  }
  function us(F) {
    const Ce = F.querySelector(".info-tip-box"),
      Xe = F.getBoundingClientRect(),
      Ve = Math.min(300, innerWidth - 24);
    let Rt = Math.max(12, Math.min(Xe.left + Xe.width / 2 - Ve / 2, innerWidth - Ve - 12));
    ((Ce.style.width = `${Ve}px`), (Ce.style.left = `${Rt}px`), (Ce.style.top = `${Xe.bottom + 8}px`));
    const da = Ce.style.display;
    Ce.style.display = "block";
    const ia = Ce.offsetWidth;
    ia &&
      ia !== Ve &&
      ((Rt = Math.max(12, Math.min(Xe.left + Xe.width / 2 - ia / 2, innerWidth - ia - 12))),
      (Ce.style.left = `${Rt}px`));
    const Ja = Ce.offsetHeight,
      Ia = Xe.top - 8 - Ja >= ss() + 12 || Xe.bottom + 8 + Ja > innerHeight - 12,
      ka = Ia ? Xe.top - 8 - Ja : Xe.bottom + 8;
    (Ce.classList.toggle("above", Ia), (Ce.style.top = `${ka}px`));
    const Za = Ce.getBoundingClientRect();
    ((Ce.style.left = `${Rt + (Rt - Za.left)}px`),
      (Ce.style.top = `${ka + (ka - Za.top)}px`),
      (Ce.style.display = da));
  }
  const Xn = { item: (F) => `<b>${ve(kt(F))}</b>${t.Screens?.adventure?.itemEffect?.(F) || ""}` };
  let Dn = null;
  function ls(F, Ce) {
    if (
      (Dn ||
        ((Dn = H('<div class="bag-tip info-tip-box ftip" role="tooltip" hidden></div>')),
        document.body.appendChild(Dn)),
      !Ce)
    ) {
      ((Dn.hidden = !0), delete Dn.dataset.on);
      return;
    }
    const Xe = F.dataset.ftip,
      Ve = Xe.indexOf(":"),
      Rt = Xn[Xe.slice(0, Ve)]?.(Xe.slice(Ve + 1));
    if (!Rt) return ls(null, !1);
    ((Dn.innerHTML = Rt), (Dn.dataset.on = Xe), (Dn.hidden = !1));
    const da = F.getBoundingClientRect(),
      ia = Dn.offsetWidth,
      Ja = Dn.offsetHeight,
      Ia = Math.max(12, Math.min(da.left + da.width / 2 - ia / 2, innerWidth - ia - 12)),
      ka = da.top - 8 - Ja >= ss() + 12;
    ((Dn.style.left = `${Ia}px`), (Dn.style.top = `${ka ? da.top - 8 - Ja : da.bottom + 8}px`));
  }
  (document.addEventListener("pointerover", (F) => {
    if (F.pointerType !== "mouse") return;
    const Ce = F.target.closest?.("[data-ftip]");
    Ce ? (Dn?.dataset.on !== Ce.dataset.ftip || Dn.hidden) && ls(Ce, !0) : Dn && !Dn.hidden && ls(null, !1);
  }),
    document.addEventListener("click", (F) => {
      const Ce = F.target.closest?.("[data-ftip]");
      Ce ? ls(Ce, !(Dn && !Dn.hidden && Dn.dataset.on === Ce.dataset.ftip)) : Dn && ls(null, !1);
    }),
    addEventListener("scroll", () => Dn && ls(null, !1), { passive: !0, capture: !0 }));
  const Hn = ".info-tip, .tip-host";
  (document.addEventListener("pointerover", (F) => {
    const Ce = F.pointerType === "mouse" && F.target.closest?.(Hn);
    Ce && us(Ce);
  }),
    document.addEventListener("click", (F) => {
      const Ce = F.target.closest?.(".item-where [data-go]");
      if (Ce) return (F.stopPropagation(), Mn(Ce.dataset.go, Ce.dataset.v));
      const Xe = F.target.closest?.(Hn);
      (document.querySelectorAll(".info-tip.open, .tip-host.open").forEach((Ve) => {
        Ve !== Xe && Ve.classList.remove("open");
      }),
        Xe && (F.stopPropagation(), us(Xe), Xe.classList.toggle("open")));
    }),
    addEventListener(
      "scroll",
      () =>
        document
          .querySelectorAll(".info-tip.open, .tip-host.open")
          .forEach((F) => F.classList.remove("open")),
      { passive: !0 },
    ));
  const Kn = ["gold", "silver", "bronze"],
    Sn = (F) => typeof F == "string" && /^[0-9a-f-]{36}$/.test(F);
  function ns(F, Ce) {
    const Xe = F.player || {},
      Ve = (ka) => (/^[\w-]+$/.test(ka?.sprite || "") ? ka.sprite : "red"),
      Rt = (ka, Za) =>
        (Za === 0 && F.me) || ka.card || Sn(ka.uid)
          ? ` role="button" tabindex="0" data-lb-r="${Ce}" data-lb-p="${Za}" title="${ve(e("Voir la carte de dresseur"))}"`
          : "",
      da = (ka, Za) => `<span class="lb-mons">${(ka || []).map((En) => _(En, F.lv)).join("")}</span>`,
      ia = (F.allies || [])
        .map(
          (ka, Za) =>
            `<span class="lb-grp lb-agrp">${_e(Ve(ka), `lb-ally${Rt(ka, Za + 1) ? " lnk" : ""}`, ka.frame, `${Rt(ka, Za + 1)} title="${ve(ka.name || "?")}"`)}<span class="lb-acol"><small class="lb-an">${ve(ka.name || "?")}</small>${da(ka.mons)}</span></span>`,
        )
        .join(""),
      Ja =
        F.rank === !1
          ? ""
          : `<span class="lb-rk">${F.rank == null ? "#—" : F.rank <= 3 ? `<img class="medal" src="assets/ui/medal-${Kn[F.rank - 1]}.png" alt="#${F.rank}">` : "#" + F.rank}</span>`,
      Ia = F.score || {};
    return `<div class="ev-lb-row lb-row${F.me ? " me" : ""}${F.rank === !1 ? " norank" : ""}${F.extra ? " has-extra" : ""}${F.lv ? " lv" : ""}">${Ja}
      ${_e(Ve(Xe), `lb-face${Rt(Xe, 0) ? " lnk" : ""}`, F.me ? !0 : Xe.frame, Rt(Xe, 0))}
      <b class="lb-name">${ve(Xe.name || "?")}${Xe.tag ? `<small class="tag">#${ve(Xe.tag)}</small>` : ""}${F.me ? ` <em>· ${e("Toi")}</em>` : ""}</b>
      <span class="lb-team"><span class="lb-grp">${da(F.mons)}</span>${ia}</span>
      <span class="lb-score${Ia.main ? "" : " nomain"}"><b>${Ia.main ?? ""}</b>${Ia.sub ? `<small class="long">${Ia.sub}</small>${(Ia.short ?? Ia.sub) ? `<small class="short">${Ia.short ?? Ia.sub}</small>` : ""}` : ""}</span>
      ${F.extra ? `<span class="lb-extra">${F.extra}</span>` : ""}</div>`;
  }
  const Ue = (F, Ce = "") => `<div class="ev-lb lb">${Ce}${F.map(ns).join("")}</div>`,
    Bt =
      '<svg viewBox="0 0 20 20" fill="currentColor" aria-hidden="true"><path d="M10 1.5 2.5 4.5v5c0 4.3 3.1 7.9 7.5 9 4.4-1.1 7.5-4.7 7.5-9v-5L10 1.5zm-.9 4.8h1.8v5h-1.8zm0 6.5h1.8v1.8h-1.8z"/></svg>';
  function st(F, Ce) {
    const Xe = t.Cloud?.hold;
    return Xe
      ? Ce
        ? `<div class="hold-line" role="status">${Bt}<span>${F}</span></div>`
        : `<div class="hold-note" role="status"><span class="hn-ic">${Bt}</span><h4>${e("Activité anormale détectée")}</h4><p>${F}</p>
      <div class="hn-foot"><span>${e("Les fonctions en ligne sont désactivées pour ce compte.")}</span><span class="hn-ref">${e("Réf. {ref}", { ref: ve(Xe.ref) })}</span></div></div>`
      : "";
  }
  function Zt(F, Ce) {
    for (const Xe of F.querySelectorAll("[data-lb-r]")) {
      const Ve = () => {
        const Rt = Ce[+Xe.dataset.lbR],
          da = +Xe.dataset.lbP,
          ia = da ? Rt?.allies?.[da - 1] : Rt?.player;
        ia &&
          (t.Sfx?.click?.(),
          !da && Rt.me
            ? t.TrainerCard.open()
            : ia.card
              ? t.TrainerCard.openPreview(ia.card, ia)
              : t.TrainerCard.openPlayer(ia.uid, {}));
      };
      ((Xe.onclick = Ve),
        (Xe.onkeydown = (Rt) => {
          (Rt.key === "Enter" || Rt.key === " ") && (Rt.preventDefault(), Ve());
        }));
    }
  }
  let va = null;
  const Da = new WeakSet(),
    la = (F) => F instanceof CSSAnimation && F.effect?.getTiming().iterations === 1 / 0;
  function Xa(F) {
    const Ce = F.effect.getTiming(),
      Xe = +Ce.duration || 0,
      Ve = Ce.delay || 0,
      Rt = /^alternate/.test(Ce.direction) ? 2 * Xe : Xe;
    (F.pause(), Rt && (F.currentTime = Ve + (Ve < 0 ? Math.ceil(-Ve / Rt) * Rt : 0)), Da.add(F));
  }
  function nn() {
    (document.documentElement.classList.toggle("no-flash", !!b.S.noFlash), t.Perf?.apply());
    const F = !!b.S.reducedAnim;
    if (F === va) return;
    const Ce = va === null;
    ((va = F), document.body.classList.toggle("calm", F));
    for (const Xe of document.getAnimations())
      la(Xe) && (F ? Xa(Xe) : Da.has(Xe) && (Da.delete(Xe), Xe.play()));
    Ce || dispatchEvent(new Event("calm"));
  }
  (document.addEventListener("animationstart", (F) => {
    if (va)
      for (const Ce of F.target.getAnimations({ subtree: !0 }))
        Ce.animationName === F.animationName &&
          Ce.effect.target === F.target &&
          (Ce.effect.pseudoElement || "") === F.pseudoElement &&
          la(Ce) &&
          Xa(Ce);
  }),
    (t.Screens = t.Screens || {}),
    (t.UI = {
      syncCalm: nn,
      skyPill: Q,
      untilText: Ea,
      tideWhen: jt,
      bossMoves: (F) => Ka(F, { boss: !0 }),
      zoneMoves: (F, Ce = {}) =>
        Ka(
          {
            id: Ce.foe ?? t.LegendZones.foe(F),
            level: Ce.level ?? F.level,
            counter: F.counter,
            burst: F.burst,
          },
          { boss: !0 },
        ),
      closeMovesDrawer: Ua,
      touchHold: ea,
      infoTip: Ra,
      helpTip: Ca,
      headTip: gn,
      tipped: yn,
      filterMore: mn,
      safeTop: ss,
      itemWhere: oa,
      itemWhereHTML: sa,
      itemTipped: Ga,
      condLine: cn,
      condHtml: Tn,
      lockIc: V,
      ftip: Xn,
      lbRow: ns,
      lbList: Ue,
      lbBind: Zt,
      holdNote: st,
      morph: Ye,
      shinyIc: Yt,
      shinyBonus: wa,
      $: f,
      $$: ue,
      h: H,
      holdEnd: ae,
      trainerFace: _e,
      fmt: vt,
      pad: B,
      dexNo: Je,
      sleep: Tt,
      esc: ve,
      fold: it,
      monSrc: De,
      animSrc: $e,
      artSrc: oe,
      artImg: Z,
      artFit: A,
      setArtAnim: J,
      hasArt: We,
      sprBox: Oe,
      teamTile: _,
      fitScale: ie,
      tileScale: we,
      BBOX: U,
      measureSprites: T,
      trimSprite: R,
      setSprite: m,
      playLevels: z,
      keepSprites: et,
      rankTag: dt,
      proposeRank: ts,
      itemSrc: lt,
      candySrc: wt,
      candyIcon: ge,
      xpIcon: Fe,
      fedXp: gt,
      buddyIcon: Dt,
      itemName: kt,
      typeBadge: ha,
      types: Ot,
      rarityBadge: rt,
      rarityPips: ee,
      monName: pa,
      tween: N,
      idle: W,
      burst: ze,
      toast: qt,
      modal: Ma,
      leagueGemPick: Jn,
      regionTag: qe,
      awayReg: ce,
      awayText: At,
      mapMark: he,
      mapIcon: fe,
      regName: tt,
      sideName: mt,
      sideSeg: Te,
      skippable: u,
      skipMark: X,
      confirm: Na,
      dexCard: Yn,
      showDexCard: Zn,
      dexSection: fn,
      playEvolution: Aa,
      proposeEvolution: Me,
      monDetail: sn,
      spriteGlow: It,
      statBars: An,
    }));
})();
