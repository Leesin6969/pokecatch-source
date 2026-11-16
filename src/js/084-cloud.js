/**
 * cloud
 *
 * Public API on the game namespace `t`: t.Cloud
 *
 * Recovered from the shipped bundle — original chunk #83 at byte 2210493 (31745 bytes, sha256:7a1fedab76af0991).
 * This file is one original source file; the build concatenates them in filename order.
 */
t.Cloud = (function () {
  const a = ["https:", "", ["qglircqqrtgdvxawisoz", "supabase", "co"].join(".")].join("/"),
    b = ["sb", "publishable", "BCiE", "porcfjQJ-a7-H5tIA", "uj", "MriW8"].join("_"),
    f = ((g) =>
      /^(localhost|127\.0\.0\.1|\[::1\])$|\.localhost$/.test(g) ||
      [g, g.replace(/^[^.]+\.(?=[^.]+\.pages\.dev$)/, "")].some((E) => {
        let q = 1233029971;
        for (const Pe of E) q = Math.imul(q ^ Pe.charCodeAt(0), 3131166203) >>> 0;
        return ["b21j820", "13j9aihh"].includes(q.toString(20));
      }))(location.hostname),
    ue = (g) => {
      for (const E of ["signInWithOAuth", "signInWithPassword", "signInWithIdToken", "signInWithOtp"]) {
        const q = g?.auth?.[E];
        typeof q == "function" &&
          Object.defineProperty(g.auth, E, {
            value: q.bind(g.auth),
            writable: !1,
            configurable: !1,
            enumerable: !1,
          });
      }
      return g;
    },
    H = 30 * 6e4,
    vt = 3e4,
    B = 5 * 6e4,
    se = 15 * 6e4,
    Ge = 15 * 6e4,
    Je = 5 * 6e4,
    Ze = 15 * 6e4,
    x = 6e4,
    $ = 30 * 6e4,
    X = 30 * 6e4,
    Tt = 8e3,
    le = "pokecatch-cloud-user",
    P = "pokecatch-cloud-wiped",
    u = "pokecatch-ban",
    ve = "pokecatch-save-btn",
    it = "pokecatch-signout",
    De = () => {
      try {
        return +localStorage.getItem(ve) || 0;
      } catch {
        return 0;
      }
    },
    je = () => t.Game,
    pt = () => t.CONFIG,
    re = () => t.TabLock?.mine() === !1,
    We = /^(localhost|127\.0\.0\.1|\[::1\])$|\.(localhost|test)$/.test(location.hostname);
  let oe = null,
    $e = null,
    Z = !1,
    A = 0,
    J = "",
    de = null,
    _e = !1,
    Re = !1,
    dt = !1,
    qe = !1,
    ce = (() => {
      try {
        const g = JSON.parse(localStorage.getItem(u));
        return g && (!g.until || Date.parse(g.until) > Date.now()) ? g : null;
      } catch {
        return null;
      }
    })();
  const tt = (g) => {
    ce = g || null;
    try {
      ce ? localStorage.setItem(u, JSON.stringify(ce)) : localStorage.removeItem(u);
    } catch {}
  };
  let mt = null,
    Te = [],
    At = null;
  const yt = [],
    he = [],
    fe = () => he.forEach((g) => g()),
    Oe = () =>
      $e && {
        name:
          $e.user_metadata?.custom_claims?.global_name ||
          $e.user_metadata?.full_name ||
          $e.user_metadata?.name ||
          "Dresseur",
        avatar: $e.user_metadata?.avatar_url || $e.user_metadata?.picture || null,
        provider: $e.app_metadata?.provider || "discord",
      },
    Ee =
      '<svg class="gg" viewBox="0 0 48 48" aria-hidden="true"><path fill="#FFC107" d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"/><path fill="#FF3D00" d="M6.3 14.7l6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3.1l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"/><path fill="#4CAF50" d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"/><path fill="#1976D2" d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"/></svg>',
    et = (g) => (g?.stats?.playMs || 0) + (g?.stats?.awayMs || 0),
    _ = (g) => ({
      dex: Object.keys(g?.dex || {}).length,
      badges: g?.adv?.badges?.length || 0,
      at: g?.lastTick || g?.updatedAt || 0,
      lived: et(g),
    }),
    we = (g) =>
      `${g.adv?.badges?.length || 0}/${g.events?.wins?.length || 0}/${g.adv?.event?.raid ? g.adv.event.reg : ""}/${g.candy?.run?.at || ""}`,
    ie = new Set(["lastTick", "updatedAt", "playMs", "awayMs"]),
    U = (g) => {
      const E = JSON.stringify(g, (Pe, at) => (ie.has(Pe) ? void 0 : at));
      let q = 0;
      for (let Pe = 0; Pe < E.length; Pe++) q = (q * 31 + E.charCodeAt(Pe)) | 0;
      return E.length + ":" + q;
    };
  let Ne = null;
  const T = () => {
    try {
      const g = JSON.parse(localStorage.getItem(le));
      return g?.user === $e?.id ? g : null;
    } catch {
      return null;
    }
  };
  let L = 0,
    R = (() => {
      try {
        return JSON.parse(localStorage.getItem(le))?.played !== !1;
      } catch {
        return !0;
      }
    })();
  const te = (g, E, q, Pe) => {
      ((R = !!q),
        localStorage.setItem(
          le,
          JSON.stringify({
            user: $e.id,
            base: g,
            print: E,
            played: !!q,
            wiped: Pe?.wipedAt || 0,
            wipeId: Pe?.wipeId || null,
          }),
        ));
    },
    K = (g) => ({ wipedAt: g?.wipedAt, wipeId: g?.wipeId });
  function He() {
    if (!re()) {
      (L++, (R = !0));
      try {
        const g = JSON.parse(localStorage.getItem(le));
        g &&
          typeof g == "object" &&
          g.played !== !0 &&
          localStorage.setItem(le, JSON.stringify({ ...g, played: !0 }));
      } catch {}
    }
  }
  const m = (g, E) => !!g && !!E && Date.parse(g) === Date.parse(E),
    z = 6e4,
    pe = 20 * 6e4;
  let V = 0,
    lt = 0;
  const kt = (g, E) => !!g && (!E || E >= 500 || g.code === "57014" || /^PGRST00/.test(g.code || ""));
  function ra(g, E) {
    kt(g, E)
      ? ((V = Math.min(pe, Math.max(z, V * 2))), (lt = Date.now() + V * (0.5 + Math.random())))
      : g || (V = lt = 0);
  }
  const Vt = () => Date.now() < lt,
    Xt = "pokecatch-save-post";
  let Ht = (() => {
    try {
      return !!localStorage.getItem(Xt);
    } catch {
      return !1;
    }
  })();
  const ct = "updated_at, name:data->trainer->>name, tag:data->trainer->>tag";
  function wt(g, E) {
    const q = je().S.trainer;
    !q ||
      g !== q.name ||
      !/^\d{4}$/.test(E || "") ||
      E === q.tag ||
      ((q.tag = E),
      je().save(),
      Wa(
        () => t.UI?.toast(e("Ton code ami est maintenant {code}", { code: t.UI.esc(q.name + "#" + E) })),
        0,
      ));
  }
  const ge = (g, E) =>
    oe
      .rpc("save_put", { d: g.data, base: E })
      .then((q) => (q.error ? q : { ...q, data: q.data ? [{ updated_at: q.data }] : [] }));
  let Fe = !0;
  function gt(g, E, q, Pe) {
    return Ca()
      ? yn({ d: g.data, base: E, lg: q, tr: Pe }).then((at) => {
          if (at.error) return ht ? { ...at, seen: !0 } : gt(g, E);
          const Mt = at.data;
          return {
            status: at.status,
            seen: !0,
            data: Mt.wrote ? [Mt.wrote] : [],
            ...("save" in Mt ? { moved: { save: Mt.save } } : {}),
          };
        })
      : Fe
        ? oe
            .rpc("save_push", { d: g.data, base: E })
            .then((at) =>
              at.error?.code === "PGRST202" || at.status === 404
                ? ((Fe = !1), Dt(g, E))
                : at.error
                  ? at
                  : { ...at, data: at.data ? [at.data] : [] },
            )
        : Dt(g, E);
  }
  function Dt(g, E) {
    return Ht
      ? ge(g, E)
      : oe
          .from("saves")
          .update(g)
          .eq("user_id", $e.id)
          .eq("updated_at", E)
          .select(ct)
          .then((q) =>
            !q.error || q.status !== 0 || V
              ? q
              : ge(g, E).then((Pe) => {
                  if (Pe.error) return q;
                  Ht = !0;
                  try {
                    localStorage.setItem(Xt, "1");
                  } catch {}
                  return Pe;
                }),
          );
  }
  function ha(g, E) {
    if (
      jt ||
      ze ||
      We ||
      (!Z && !g) ||
      t.CatchUp?.busy ||
      re() ||
      ce ||
      (Vt() && !E) ||
      (t.Clock && !t.Clock.sure)
    )
      return null;
    if (!g && !R) return ((Z = !1), null);
    const q = U(je().S),
      Pe = L,
      at = K(je().S),
      Mt = Re;
    return (
      (Z = !1),
      (Re = !1),
      !g && q === Ne
        ? null
        : (je().stampMoney?.(),
          je().S.lastTick > je().time() + 3e4 && (je().S.lastTick = je().time()),
          {
            print: q,
            at: Pe,
            wiped: at,
            sent: Mt,
            base: T()?.base,
            row: { data: je().S, updated_at: new Date().toISOString() },
          })
    );
  }
  async function _t(g, E, q = {}) {
    if (!oe || !$e) return;
    if (de) return de;
    const Pe = q.save === !1 ? null : ha(g, E),
      at = Ca() && gn(q.log ? 0 : ae) ? Jn() : null;
    if (!Pe) {
      q.log && at && mn(at);
      return;
    }
    const { print: Mt, at: Pa, wiped: Ta, sent: La, base: xa, row: en } = Pe;
    return (
      (de = (
        xa
          ? gt(en, xa, at, q.tr)
          : oe
              .from("saves")
              .upsert({ user_id: $e.id, ...en })
              .select(ct)
      )
        .then(
          ({ data: hn, error: Fn, status: Ln, moved: Pn, seen: jn }) => (
            jn || ra(Fn, Ln),
            Fn
              ? ((Z = !0),
                (Re ||= La),
                (_e = !0),
                console.warn("Cloud save failed", Fn.message),
                ut(Fn, Ln) && Wa(D, 0),
                !1)
              : hn?.length
                ? re()
                  ? !1
                  : (te(hn[0].updated_at, Mt, L !== Pa, Ta),
                    "name" in hn[0] && hn[0].name == null && je().S.trainer?.name
                      ? (Wa(() => Gt().catch((h) => console.warn(h)), 0), !1)
                      : (wt(hn[0].name, hn[0].tag),
                        (A = Date.now()),
                        (Ne = Mt),
                        (_e = !1),
                        Re && Wa(Ea, 0),
                        t.Raids?.flush(),
                        t.LegendZones?.flush(),
                        t.Tower?.flush().then(() => t.Tower.catchUp()),
                        !0))
                : ((Z = !0),
                  (Re ||= La),
                  q.check ? { moved: Pn } : (Wa(() => vn(!1, Pn).catch((h) => console.warn(h)), 0), !1))
          ),
        )
        .finally(() => {
          ((de = null), fe());
        })),
      fe(),
      de
    );
  }
  function Ea() {
    Re && dt && Date.now() - A >= B && _t(!0);
  }
  const ut = (g, E) => E === 401 || g?.code === "42501" || /^PGRST30/.test(g?.code || "");
  let jt = !1,
    xt = 0;
  async function D() {
    if (jt || !$e || nt) return;
    if (((jt = !0), fe(), Date.now() - xt < 2 * B)) return ye();
    xt = Date.now();
    const { error: g } = await oe.auth.refreshSession().catch((E) => ({ error: E }));
    if (!g) {
      jt && ((jt = !1), _t(!0));
      return;
    }
    if (g.name !== "AuthRetryableFetchError") return oe.auth.signOut({ scope: "local" }).catch(() => {});
    ye();
  }
  let Q = !1,
    Y = "discord";
  function ye(g = !1) {
    (Q && !g) ||
      re() ||
      bt ||
      ce ||
      nt ||
      ((Q = !0),
      Wa(
        () =>
          t.UI.modal({
            className: "dexcard-modal cl-wiped",
            body: `<div class="dc-head"><h2>${e("Sauvegarde en ligne coupée")}</h2><div class="dc-sum"><button class="dc-x" aria-label="${e("Fermer")}">✕</button></div></div>
        <p class="cl-note">${e("Ta connexion a expiré. Ta partie continue ici, mais n'est plus sauvegardée en ligne.")}</p>`,
            actions: [
              { label: e("Plus tard"), cls: "ghost", value: !1 },
              { label: e("Me reconnecter"), cls: "primary", value: !0 },
            ],
            onOpen: (E, q) => {
              E.querySelector(".dc-x").onclick = () => q(!1);
            },
          }).then((E) => {
            E && In(Y);
          }),
        0,
      ));
  }
  let nt = !1;
  const Ot = () => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone || null;
    } catch {
      return null;
    }
  };
  let ee = null;
  const rt =
    /iP(hone|ad|od)/.test(navigator.userAgent) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
  async function Qe() {
    const g = [];
    try {
      const Pe = document.createElement("canvas");
      ((Pe.width = 240), (Pe.height = 60));
      const at = Pe.getContext("2d"),
        Mt = at.createLinearGradient(0, 0, 240, 0);
      (Mt.addColorStop(0, "#e3350d"),
        Mt.addColorStop(1, "#3b4cca"),
        (at.fillStyle = Mt),
        at.fillRect(0, 0, 240, 60),
        (at.textBaseline = "alphabetic"),
        (at.font = "16px Arial"),
        (at.fillStyle = "rgba(255,255,255,.8)"),
        at.fillText("Poke'Catch ✨ Ωπж 0.1 ☺", 4, 24),
        at.beginPath(),
        at.arc(200, 40, 14, 0, Math.PI * 1.7),
        (at.strokeStyle = "#ffcb05"),
        (at.lineWidth = 3),
        at.stroke(),
        g.push(Pe.toDataURL()));
      const Pa = [
          "Arial",
          "Calibri",
          "Cambria",
          "Comic Sans MS",
          "Consolas",
          "Courier New",
          "Georgia",
          "Helvetica Neue",
          "Impact",
          "Lucida Console",
          "Microsoft YaHei",
          "MS Gothic",
          "Noto Sans",
          "PingFang SC",
          "Roboto",
          "Segoe UI",
          "SimSun",
          "Tahoma",
          "Times New Roman",
          "Trebuchet MS",
          "Ubuntu",
          "Verdana",
          "Malgun Gothic",
          "Hiragino Sans",
        ],
        Ta = (xa) => ((at.font = `20px ${xa}`), at.measureText("mmmWWWiii 你好 0123").width),
        La = Ta("monospace");
      g.push(Pa.filter((xa) => Ta(`'${xa}', monospace`) !== La).join(","));
    } catch {
      g.push("-");
    }
    if (rt) g.push("ios");
    else
      try {
        const Pe = document.createElement("canvas"),
          at = Pe.getContext("webgl") || Pe.getContext("experimental-webgl"),
          Mt = at?.getExtension("WEBGL_debug_renderer_info");
        (g.push(
          at
            ? [
                Mt ? at.getParameter(Mt.UNMASKED_VENDOR_WEBGL) : "",
                Mt ? at.getParameter(Mt.UNMASKED_RENDERER_WEBGL) : "",
                at.getParameter(at.MAX_TEXTURE_SIZE),
                at.getParameter(at.MAX_RENDERBUFFER_SIZE),
              ].join("|")
            : "-",
        ),
          at?.getExtension("WEBGL_lose_context")?.loseContext());
      } catch {
        g.push("-");
      }
    const E = t.screen || {};
    g.push(
      [
        Math.max(E.width, E.height),
        Math.min(E.width, E.height),
        E.colorDepth,
        t.devicePixelRatio,
        navigator.hardwareConcurrency,
        navigator.deviceMemory,
        navigator.maxTouchPoints,
        navigator.platform,
        (navigator.languages || []).join(","),
        Ot(),
      ].join("|"),
    );
    const q = await crypto.subtle.digest("SHA-256", new TextEncoder().encode(g.join("§")));
    return [...new Uint8Array(q)].map((Pe) => Pe.toString(16).padStart(2, "0")).join("");
  }
  Wa(() => {
    !pt().DEVICE_MARK ||
      !t.crypto?.subtle ||
      (t.requestIdleCallback || ((g) => g()))(() =>
        Qe().then(
          (g) => {
            ee = g;
          },
          () => {},
        ),
      );
  }, 4e3);
  async function Ft(g = !0) {
    if (!nt) {
      ((nt = !0),
        g &&
          oe &&
          $e &&
          (await Promise.race([
            oe
              .rpc("log_session", {
                sid: crypto.randomUUID(),
                anon: Ka,
                ms: 0,
                b: 0,
                d: 0,
                v: pt().VERSION,
                dev: We,
                tz: Ot(),
              })
              .then(
                () => {},
                () => {},
              ),
            new Promise((E) => Wa(E, 4e3)),
          ])));
      try {
        localStorage.setItem(it, String(Date.now()));
      } catch {}
      (await oe?.auth.signOut({ scope: "local" }).catch(() => {}),
        t.UI.modal({
          className: "dexcard-modal cl-wiped",
          body: `<div class="dc-head"><h2>${e("Mode en ligne indisponible")}</h2><div class="dc-sum"><button class="dc-x" aria-label="${e("Fermer")}">✕</button></div></div>
        <p class="cl-note">${e("Le mode en ligne n'est pas disponible dans ta région. Tu peux continuer à jouer hors ligne.")}</p>`,
          actions: [{ label: e("Compris !"), cls: "primary", value: !0 }],
          onOpen: (E, q) => {
            E.querySelector(".dc-x").onclick = () => q(!0);
          },
        }));
    }
  }
  const Ye = async (...g) => {
    const E = await fetch(...g);
    return (
      (E.status === 403 || E.status === 401) &&
        !nt &&
        E.clone()
          .json()
          .then(
            (q) => {
              q?.message === "region" && Ft();
            },
            () => {},
          ),
      E
    );
  };
  let bt = !1;
  function Yt(g, E) {
    re() ||
      ((bt = !0),
      is(new Promise(() => {})),
      localStorage.setItem(pt().SAVE_KEY, JSON.stringify(g.data)),
      te(g.updated_at, U(g.data), !1, K(g.data)),
      E && g.data?.wipedBy !== "twin" && localStorage.setItem(P, g.data?.wipedBy || "1"),
      (t.onbeforeunload = null),
      je().stopSaving(),
      location.reload());
  }
  const wa = () => {
    try {
      const g = JSON.parse(localStorage.getItem(le))?.user;
      return !!g && !!$e && g !== $e.id;
    } catch {
      return !1;
    }
  };
  function pa() {
    re() ||
      ((bt = !0),
      is(new Promise(() => {})),
      localStorage.removeItem(pt().SAVE_KEY),
      localStorage.removeItem(le),
      (t.onbeforeunload = null),
      je().stopSaving(),
      location.reload());
  }
  async function Gt() {
    const { data: g, error: E } = await Na();
    !E && g && !g.data?.trainer && Yt(g);
  }
  const N = (g) =>
    [
      ...(g?.mons || []),
      ...(g?.pension?.mons || []).map((E) => E?.mon),
      ...(g?.under?.slots || []).flatMap((E) => E?.mons || []),
      g?.tradeOut?.mon,
      g?.tradeIn?.mon,
    ].filter((E) => E?.uid);
  function W(g, E) {
    const q = je().DEX || {},
      Pe = new Set(N(E).map((La) => La.uid)),
      at = (La) => (q[La.id]?.legendary || q[La.id]?.mythical ? 2 : 0) + (La.shiny ? 1 : 0),
      Mt = N(g)
        .filter((La) => !Pe.has(La.uid) && q[La.id])
        .sort((La, xa) => at(xa) - at(La) || (xa.level || 0) - (La.level || 0));
    if (!Mt.length) return "";
    const Pa = Mt.slice(0, 3)
        .map((La) => `<em>${t.UI.esc(q[La.id].name)}${La.shiny ? " " + t.UI.shinyIc() : ""}</em>`)
        .join(", "),
      Ta = Mt.length - 3;
    return `<span class="cl-only">${Ta > 0 ? e("Seulement ici : {list} et {n} autres", { list: Pa, n: Ta }) : e("Seulement ici : {list}", { list: Pa })}</span>`;
  }
  let ze = !1;
  async function qt(g, E, q) {
    ze = !0;
    const Pe = _(g),
      at = _(E),
      Mt = (xa) =>
        xa
          ? new Date(xa).toLocaleString(t.I18n?.lang || "fr", { dateStyle: "short", timeStyle: "short" })
          : "—",
      Pa = (xa) => {
        const en = Math.floor(xa / 6e4);
        return `${Math.floor(en / 60)} h ${String(en % 60).padStart(2, "0")}`;
      },
      Ta = (xa, en, rn) =>
        `<div class="cl-pick"><b>${en}</b><span>${e("Pokédex <em>{d}</em> · Badges <em>{b}</em>", { d: xa.dex, b: xa.badges })}</span><span>${e("Temps de jeu <em>{t}</em>", { t: Pa(xa.lived) })}</span>${rn}<small>${e("Dernière partie : {at}", { at: Mt(xa.at) })}</small></div>`,
      La = await t.UI.modal({
        className: "cl-modal",
        dismissable: !1,
        body: `<h3>${e("Deux sauvegardes trouvées")}</h3>
        <p>${e(q ? "Tu as joué sur un autre appareil entre-temps, et ici aussi." : "Ce compte a déjà une partie en ligne.")} ${e("Laquelle veux-tu garder ? L'autre sera remplacée.")}</p>
        <div class="cl-picks">${Ta(Pe, e("Sur cet appareil"), W(g, E))}${Ta(at, e("En ligne"), W(E, g))}</div>`,
        actions: [
          { label: e("Garder cet appareil"), cls: "ghost", value: "local" },
          { label: e("Reprendre la partie en ligne"), cls: "primary", value: "remote" },
        ],
      });
    return ((ze = !1), La);
  }
  let Lt = !0,
    zt = null,
    ca = null;
  const Ma = (g) => {
    ((qe = !!g.admin),
      "ban" in g && tt(g.ban),
      "hold" in g &&
        ((g.hold?.ref || null) !== (mt?.ref || null) || !!g.hold?.hidden != !!mt?.hidden) &&
        ((mt = g.hold || null), fe()),
      g.community && (zt = { players: +g.community.players || 0, online: +g.community.online || 0 }),
      "support" in g && (g.support || null) !== ca && ((ca = g.support || null), fe()));
  };
  async function Na() {
    if (Lt) {
      const { data: g, error: E, status: q } = await oe.rpc("cloud_load");
      if ((ra(E, q), !E)) {
        Ma(g);
        const Pe = new Set(je().S.giftsGot || []);
        return ((Te = (g.gifts || []).filter((at) => !Pe.has(at.id))), Ia(g.friends), fe(), { data: g.save });
      }
      if (E.code !== "PGRST202" && !/cloud_load/.test(E.message)) return { error: E };
      Lt = !1;
    }
    return oe.from("saves").select("data, updated_at").eq("user_id", $e.id).maybeSingle();
  }
  let Va = !0;
  async function Ba() {
    if (!Va || !Lt) return null;
    const { data: g, error: E, status: q } = await oe.rpc("cloud_head");
    return (
      ra(E, q),
      E
        ? (E.code === "PGRST202" || /cloud_head/.test(E.message)
            ? (Va = !1)
            : console.warn("Cloud head failed", E.message),
          null)
        : g
    );
  }
  const za = [];
  async function vn(g, E) {
    const q = await on(g, E);
    return (oe && $e && !ze && !bt && za.forEach((Pe) => Pe()), q);
  }
  function An(g, E) {
    if (U(g) !== E.print && R) return _t(!0);
    ((Ne = E.print), (A ||= Date.now()), fe());
  }
  async function on(g, E) {
    if (!(!oe || !$e || ze || re()) && !(g && Vt() && !E)) {
      if (E) return (await t.CatchUp?.wait(), xn(E.save));
      if (Ca()) {
        const q = T(),
          Pe = g !== "peek";
        if (g !== "peek" && q?.base && !wa() && R && U(je().S) !== q.print) {
          const Mt = await _t(!0, !1, { check: !0, tr: Pe });
          if (Mt === !0) return ht ? void 0 : qn(g);
          if (Mt && typeof Mt == "object")
            return Mt.moved ? (await t.CatchUp?.wait(), xn(Mt.moved.save)) : qn(g);
          if (Mt === !1 && !ht) return qn(g);
          if (Mt === !1) return;
        }
        const at = await yn({ base: q?.base, lg: gn(ae) ? Jn() : null, tr: Pe });
        if (at.error && !ht) return qn(g);
        if ((await t.CatchUp?.wait(), at.error)) {
          g || console.warn("Cloud load failed", at.error.message);
          return;
        }
        if (!("save" in at.data)) {
          const Mt = T();
          return ze || !Mt || !m(Mt.base, q?.base) || (wt(at.data.name, at.data.tag), g === "peek")
            ? void 0
            : An(je().S, Mt);
        }
        return xn(at.data.save);
      }
      return qn(g);
    }
  }
  async function qn(g) {
    if (g && T()) {
      const Pe = await Ba();
      if (!Pe && Vt()) return;
      await t.CatchUp?.wait();
      const at = T(),
        Mt = new Set(je().S.giftsGot || []);
      if (Pe && at && !ze && m(at.base, Pe.updated_at) && !(Pe.gifts || []).some((Pa) => !Mt.has(Pa)))
        return (
          Ma(Pe),
          At && Pe.friends && Za(At) !== Za(Pe.friends) ? ka() : (nn = !Xa),
          g === "peek" ? void 0 : An(je().S, at)
        );
    }
    const { data: E, error: q } = await Na();
    if ((await t.CatchUp?.wait(), q)) {
      console.warn("Cloud load failed", q.message);
      return;
    }
    return xn(E);
  }
  async function xn(g) {
    if (re() || ze) return;
    const E = je().S,
      q = T();
    if (wa() && !We) return g ? Yt(g) : pa();
    if (!g) return We ? void 0 : (localStorage.removeItem(le), _t(!0));
    if (q && m(q.base, g.updated_at)) return (wt(g.data?.trainer?.name, g.data?.trainer?.tag), An(E, q));
    if (We) {
      if (U(E) !== U(g.data)) return Yt(g, !!(q && g.data?.wipeId && g.data.wipeId !== q.wipeId));
      (te(g.updated_at, U(E), !1, K(g.data)), (Ne = U(E)));
      return;
    }
    const Pe = localStorage.getItem(le) === $e.id,
      at = g.data?.wipedAt || 0,
      Mt = g.data?.wipeId,
      Pa = (Ta) => (Mt ? Mt !== Ta.wipeId : at > (Ta.wiped || 0));
    if (q && "wiped" in q ? Pa(q) : (q || Pe) && at > (E.lastTick || 0)) return Yt(g, !0);
    if (!(E.mons || []).length) return Yt(g);
    if (Pe)
      return Date.parse(g.updated_at) > (E.updatedAt || 0)
        ? Yt(g)
        : (Object.assign(E, K(g.data)), te(g.updated_at, null, !0, K(g.data)), _t(!0));
    if (U(E) === U(g.data)) {
      (te(g.updated_at, U(E), !1, K(g.data)), (Ne = U(E)));
      return;
    }
    if ((q && (q.played === !1 || U(E) === q.print)) || (await qt(E, g.data, !!q)) === "remote") return Yt(g);
    if (!re()) return (Object.assign(E, K(g.data)), te(g.updated_at, null, !0, K(g.data)), _t(!0));
  }
  async function fn() {
    return ((J = we(je().S)), vn());
  }
  let Yn = null,
    Zn = null;
  function is(g) {
    ((Yn = g), (Zn = null));
    const E = () => {
      Yn === g && (Yn = Zn = null);
    };
    return (g.then(E, E), g);
  }
  const ts = () =>
    Yn ? (Zn ||= Promise.race([Yn.catch(() => {}), new Promise((g) => Wa(g, Tt))])) : Promise.resolve();
  function Jn() {
    const g = je().S,
      E = je().session,
      q = t.News;
    return {
      sid: It,
      anon: Ka,
      ms: Math.round(E.play),
      o: Math.round(E.away),
      b: g.adv?.badges?.length || 0,
      d: Object.keys(g.dex || {}).length,
      v: pt().VERSION,
      n: g.trainer ? `${g.trainer.name}#${g.trainer.tag}` : null,
      ev: q?.outbox() || null,
      since: q?.since ?? null,
      dev: We,
      tz: Ot(),
      ...(pt().DEVICE_MARK && ee ? { fp: ee, ios: rt } : {}),
    };
  }
  function On(g, E) {
    if (g?.soon) {
      Ua = !0;
      return;
    }
    if (g?.region) return Ft(!1);
    (E && t.News?.sent(E.length), t.News?.receive(g));
  }
  const Me = "pokecatch-anon",
    It = crypto.randomUUID(),
    Kt = 30 * 6e4,
    Aa = 30 * 6e4;
  let Ka = localStorage.getItem(Me),
    _a = 0,
    Ha = !1,
    Ua = !1;
  Ka || ((Ka = crypto.randomUUID()), localStorage.setItem(Me, Ka));
  const sn = parseInt(Ka.replace(/-/g, "").slice(0, 8), 16) % 100 || 0,
    Be = () => {
      const g = t.Update?.online;
      return g == null || sn < g;
    };
  let Ut = !1;
  function aa() {
    if (Ha || Ua || Vt()) return;
    if ($e && Ca() && dt && !jt)
      return Date.now() - _a < ae
        ? void 0
        : _t(!1, !1, { log: !0, save: Date.now() - A >= (document.hidden ? se : H) - ae });
    const g = Jn();
    ((_a = Date.now()),
      (Ha = !0),
      oe.rpc("log_session", g).then(
        ({ data: E, error: q, status: Pe }) => {
          if (((Ha = !1), ra(q, Pe), q)) return console.warn("Stats failed", q.message);
          On(E, g.ev);
        },
        () => {
          Ha = !1;
        },
      ));
  }
  const ae = 5 * 6e4,
    ft = 2 * 6e4;
  let ht = !0,
    ea = null,
    Ra = 0;
  const Ca = () => ht && Lt && !!$e,
    gn = (g) => !Ha && !Ua && Date.now() - _a >= g;
  async function yn(g) {
    const E = g.lg || null,
      q = Date.now();
    E && ((_a = q), (Ha = !0));
    let Pe;
    try {
      Pe = await oe.rpc("cloud_sync", {
        ...(g.d ? { d: g.d } : {}),
        base: g.base || null,
        ...(E ? { lg: E } : {}),
        fc: At ? Za(At) : null,
        ...(g.tr ? { tr: !0 } : {}),
      });
    } catch (Ta) {
      Pe = { error: { message: String(Ta) }, status: 0 };
    }
    (E && (Ha = !1), ra(Pe.error, Pe.status));
    const at = !Pe.error && Pe.data?.off === !0;
    if (
      (!Pe.error &&
        !Pe.data?.head &&
        (Pe = { ...Pe, error: { message: Pe.data?.error || (at ? "off" : "no answer") } }),
      Pe.error)
    )
      return (
        at || Pe.error.code === "PGRST202" || Pe.status === 404
          ? ((ht = !1), E && (_a = 0))
          : E && console.warn("Stats failed", Pe.error.message),
        Pe
      );
    const Mt = Pe.data;
    Ma(Mt.head);
    const Pa = new Set(je().S.giftsGot || []);
    return (
      (Te = (Mt.gifts || []).filter((Ta) => !Pa.has(Ta.id))),
      Array.isArray(Mt.flist) ? Ia(Mt.flist) : At && (nn = !Xa),
      E && Mt.feed && On(Mt.feed, E.ev),
      "trade" in Mt && q > Ra && (ea = { at: Date.now(), row: Mt.trade }),
      fe(),
      Pe
    );
  }
  function mn(g) {
    return yn({ base: T()?.base, lg: g }).then((E) => {
      !E.error &&
        "save" in E.data &&
        dt &&
        Wa(() => vn(!1, { save: E.data.save }).catch((q) => console.warn(q)), 0);
    });
  }
  function ln() {
    if (!t.supabase?.createClient) return;
    if (pt().CLOUD_PAUSE) {
      Wa(() => t.UI?.toast(e("Sauvegarde en ligne indisponible.")), 4e3);
      return;
    }
    if (oe) return;
    if (!Be()) {
      Ut ||
        ((Ut = !0),
        Wa(() => t.UI?.toast(e("Sauvegarde en ligne indisponible.")), 4e3),
        t.Update?.onOnline(() => {
          !oe && Be() && ln();
        }));
      return;
    }
    if (!f) return;
    oe = ue(t.supabase.createClient(a, b, { global: { fetch: Ye } }));
    let g;
    (is(
      new Promise((La) => {
        g = La;
      }),
    ),
      oe.auth.onAuthStateChange((La, xa) => {
        const en = $e?.id;
        (($e = xa?.user || null),
          $e && (Y = $e.app_metadata?.provider || Y),
          $e?.id !== en
            ? (jt = !1)
            : jt &&
              $e &&
              (La === "TOKEN_REFRESHED" || La === "SIGNED_IN") &&
              ((jt = !1), Q && t.UI.toast(e("Sauvegarde en ligne rétablie.")), Wa(() => _t(!0), 0)),
          La === "SIGNED_OUT" && !(Date.now() - (+localStorage.getItem(it) || 0) < 6e4) && ye(),
          $e || ((qe = !1), (At = null), g()),
          $e?.id !== en && (ia(), Ja(), us(!0)),
          $e &&
            $e.id !== en &&
            Wa(
              () =>
                fn()
                  .catch((rn) => console.warn(rn))
                  .then(() => {
                    ((dt = !0), g(), yt.forEach((rn) => rn()), Ea());
                  }),
              0,
            ),
          La === "SIGNED_IN" &&
            !en &&
            t.UI.toast(e("Connecté en tant que <b>{name}</b>", { name: t.UI.esc(Oe().name) })),
          fe());
      }),
      /user_banned|user\+is\+banned|user%20is%20banned/i.test(location.search + location.hash) &&
        tt(ce || {}));
    const E = localStorage.getItem(P);
    if (E) {
      localStorage.removeItem(P);
      const [La, xa] =
        E === "restore"
          ? [e("Partie restaurée"), e("Ta partie a été restaurée par la modération.")]
          : E === "admin"
            ? [e("Partie effacée"), e("Ta partie a été réinitialisée par la modération.")]
            : [e("Partie effacée"), e("Ta partie a été effacée depuis un autre appareil.")];
      Wa(
        () =>
          t.UI.modal({
            className: "dexcard-modal cl-wiped",
            body: `<div class="dc-head"><h2>${La}</h2><div class="dc-sum"><button class="dc-x" aria-label="${e("Fermer")}">✕</button></div></div>
          <p class="cl-note">${xa}</p>`,
            actions: [{ label: e("Compris !"), cls: "primary", value: !0 }],
            onOpen: (en, rn) => {
              en.querySelector(".dc-x").onclick = () => rn(!0);
            },
          }),
        0,
      );
    }
    let q = 0,
      Pe = !1,
      at = 0;
    const Mt = () => {
      (clearTimeout(at),
        (at = Wa(() => {
          document.hidden && ((Ce = !0), Ja(), us());
        }, x)));
    };
    (document.hidden && Mt(),
      t.TabLock?.onLost(() => {
        (Ja(), us());
      }),
      t.addEventListener("online", Ea),
      Ss(() => {
        (Ea(),
          !(document.hidden && Pe) &&
            Date.now() - A >= (document.hidden ? se : H) &&
            _t().then(() => {
              document.hidden && !Z && (Pe = !0);
            }));
      }, 3e4),
      Ss(() => {
        if (!$e || t.CatchUp?.busy) return;
        const La = we(je().S);
        La !== J && ((J = La), _t(!0));
      }, vt),
      document.addEventListener("visibilitychange", () => {
        if (document.hidden) {
          ((q = Date.now()),
            (Pe = !Z),
            Date.now() - A >= se &&
              _t().then(() => {
                Z || (Pe = !0);
              }),
            Mt());
          return;
        }
        clearTimeout(at);
        const La = Ce;
        ((Ce = !1), us(), La && Dn());
        const xa = Ja();
        $e && dt && Date.now() - q >= Je ? is(vn(!0)).catch((en) => console.warn(en)) : xa && ka();
      }));
    let Pa = Date.now();
    const Ta = () => {
      const La = Date.now() - Pa >= Ze;
      ((Pa = Date.now()),
        La && $e && dt && !document.hidden && !Yn && !ze && is(vn("peek")).catch((xa) => console.warn(xa)));
    };
    for (const La of ["pointerdown", "keydown"])
      document.addEventListener(La, Ta, { capture: !0, passive: !0 });
    (Wa(() => ts().then(aa), 3e3),
      Ss(() => {
        !document.hidden && Date.now() - _a >= Kt && aa();
      }, 6e4),
      document.addEventListener("visibilitychange", () => {
        document.hidden && Date.now() - _a >= Aa && aa();
      }));
  }
  function In(g = "discord") {
    if (!oe) return t.UI.toast(e("Connexion indisponible pour le moment."));
    const E = { redirectTo: location.origin + location.pathname };
    (g === "discord" && (E.scopes = "identify"), oe.auth.signInWithOAuth({ provider: g, options: E }));
  }
  async function xe() {
    await Promise.race([_t(), new Promise((g) => Wa(g, 5e3))]);
    try {
      localStorage.setItem(it, String(Date.now()));
    } catch {}
    (await oe?.auth.signOut(), t.UI.toast(e("Déconnecté. Ta partie reste sur ce navigateur.")));
  }
  async function Et() {
    if (!oe || !$e || We) return (localStorage.removeItem(le), !0);
    (de && (await de),
      Object.assign(je().S, { wipedAt: je().time(), wipeId: crypto.randomUUID() }),
      je().save(),
      je().stampMoney?.());
    const { data: g, error: E } = await oe
      .from("saves")
      .upsert({ user_id: $e.id, data: je().S, updated_at: new Date().toISOString() })
      .select("updated_at");
    if (E) return (console.warn("Cloud wipe failed", E.message), !1);
    te(g?.[0]?.updated_at, U(je().S), !1, K(je().S));
    const q = await sa(oe.rpc("friends_clear"));
    return (q.error && console.warn("Friends clear failed", q.error), !0);
  }
  const oa =
      "id, owner_name, owner_sprite, give_id, give_shiny, give_mon, want_id, have, reg, created_at, expires_at",
    sa = (g) =>
      g.then(
        ({ data: E, error: q }) => (q ? { error: q.message } : { data: E }),
        (E) => ({ error: String(E) }),
      );
  let Ga = null,
    cn = null,
    Tn = null,
    Mn = !1,
    ks = !1,
    ss = 0;
  function us(g) {
    if (
      (g && Ga && (oe.removeChannel(Ga), (Ga = null)),
      !!!(oe && $e && cn && !Ce && !re() && (ks || Date.now() - ss < X)))
    ) {
      (Ga && (oe.removeChannel(Ga), (Ga = null)), (Mn = !!cn));
      return;
    }
    Ga ||
      ((Ga = oe
        .channel(`trades:${$e.id}`, { config: { private: !0 } })
        .on("broadcast", { event: "accepted" }, (q) => cn?.(q.payload))
        .subscribe()),
      Mn && ((Mn = !1), Xn()));
  }
  const Xn = () =>
    Wa(
      () =>
        (Yn || Promise.resolve())
          .catch(() => {})
          .then(() => {
            bt || Tn?.();
          }),
      0,
    );
  function Dn() {
    oe && $e && cn && !Ga && !re() && Xn();
  }
  const ls = () => ((Ra = Date.now()), (ea = null), null);
  let Hn = !0,
    Kn = null;
  function Sn(g, E, q) {
    return Hn
      ? oe.rpc("pick_check", { tid: g, mid: E }).then(
          ({ data: Pe, error: at, status: Mt }) =>
            at?.code === "PGRST202" || Mt === 404 || Pe?.off
              ? ((Hn = !1), q())
              : at
                ? { error: at.message }
                : ((Kn = { key: g || E, at: Date.now(), linked: !!Pe?.linked }),
                  { data: Pe?.open ? { id: g || E } : null }),
          (Pe) => ({ error: String(Pe) }),
        )
      : q();
  }
  function ns(g, E) {
    const q = Kn;
    return (
      (Kn = null),
      q && q.key === (g || E) && Date.now() - q.at < 6e4 ? Promise.resolve({ data: q.linked }) : null
    );
  }
  const Ue = {
      mine() {
        const g = ea;
        return (
          (ea = null),
          g && Date.now() - g.at < ft
            ? Promise.resolve({ data: g.row })
            : sa(
                oe
                  .from("trades")
                  .select(oa + ", status, taker_name, taker_sprite, taker_mon")
                  .eq("owner", $e.id)
                  .maybeSingle(),
              )
        );
      },
      list: (g, E, q, Pe, at) =>
        sa(
          oe.rpc("trade_list", {
            regs: g,
            can: E,
            shy: q,
            ...(Pe ? { ids: Pe } : {}),
            ...(at ? { who: at } : {}),
          }),
        ),
      species: (g, E, q) => sa(oe.rpc("trade_species", { regs: g, can: E, shy: q })),
      offers: (g, E, q, Pe) =>
        sa(oe.rpc("trade_offers", { regs: g, ...(E != null ? { mon: E, shiny: !!q } : { who: Pe }) })),
      create: (g, E, q, Pe, at, Mt, Pa, Ta) =>
        ls() ||
        sa(
          oe.rpc("trade_create", {
            mon: g,
            want: E,
            region: q,
            days: Pe,
            name: at,
            sprite: Mt,
            ...(Pa ? { have: Pa } : {}),
            ...(Ta ? { friends: Ta } : {}),
          }),
        ),
      still: (g) =>
        Sn(g, null, () =>
          sa(
            oe
              .from("trades")
              .select("id")
              .eq("id", g)
              .in("status", ["open", "any"])
              .gt("expires_at", new Date().toISOString())
              .maybeSingle(),
          ),
        ),
      find: (g) => sa(oe.from("trades").select("id, owner").eq("id", g).maybeSingle()),
      linked: (g) => ns(g, null) || sa(oe.rpc("linked_to", { tid: g })),
      accept: (g, E, q, Pe) => ls() || sa(oe.rpc("trade_accept", { tid: g, mon: E, name: q, sprite: Pe })),
      close: (g, E) => ls() || sa(oe.rpc("trade_close", E ? { tid: g, game: E } : { tid: g })),
      watch(g, E) {
        ((cn = g || null), (Tn = E || null), g || (Mn = !1), us());
      },
      live(g) {
        ((ks = !!g), us());
      },
      posted() {
        ((ss = Date.now()), Wa(us, X + 1e3), us());
      },
    },
    Bt = "id, seller_name, seller_sprite, mon, mon_id, shiny, level, reg, price, created_at, expires_at";
  let st = !0;
  const Zt = {
      list: (g, E = {}) => {
        if (st)
          return oe
            .rpc("mkt_list", {
              regs: g,
              ids: E.ids || null,
              shy: !!E.shiny,
              sort: E.sort || "new",
              frm: E.from || 0,
              lim: pt().MARKET.LIST,
            })
            .then(
              ({ data: at, error: Mt, status: Pa }) =>
                Mt?.code === "PGRST202" || Pa === 404
                  ? ((st = !1), Zt.list(g, E))
                  : Mt
                    ? { error: Mt.message }
                    : { data: at || [] },
              (at) => ({ error: String(at) }),
            );
        let q = oe
          .from("market")
          .select(Bt)
          .eq("status", "open")
          .in("reg", g)
          .neq("seller", $e.id)
          .gt("expires_at", new Date().toISOString());
        (E.ids && (q = q.in("mon_id", E.ids)),
          E.shiny && (q = q.eq("shiny", !0)),
          (q =
            E.sort === "cheap" || E.sort === "dear"
              ? q.order("price", { ascending: E.sort === "cheap" }).order("created_at", { ascending: !1 })
              : q.order("created_at", { ascending: !1 })));
        const Pe = E.from || 0;
        return sa(q.range(Pe, Pe + pt().MARKET.LIST - 1));
      },
      mine: () =>
        sa(
          oe
            .from("market")
            .select(Bt + ", status, buyer_name")
            .eq("seller", $e.id),
        ),
      recent: (g) => sa(oe.rpc("mkt_recent", { ids: g })),
      still: (g) =>
        Sn(null, g, () =>
          sa(
            oe
              .from("market")
              .select("id")
              .eq("id", g)
              .eq("status", "open")
              .gt("expires_at", new Date().toISOString())
              .maybeSingle(),
          ),
        ),
      create: (g, E, q, Pe, at) =>
        sa(oe.rpc("mkt_create", { mon: g, price: E, region: q, name: Pe, sprite: at })),
      linked: (g) => ns(null, g) || sa(oe.rpc("linked_to", { mid: g })),
      buy: (g, E) => sa(oe.rpc("mkt_buy", { mid: g, name: E })),
      close: (g) => sa(oe.rpc("mkt_close", { mid: g })),
    },
    va = { take: () => (re() || We ? [] : Te.splice(0)), claim: (g) => sa(oe.rpc("gift_claim", { gid: g })) },
    Da = {
      snapshot: () => sa(oe.rpc("admin_snapshot")),
      find: (g) => sa(oe.rpc("admin_find", { q: g })),
      stats: () => sa(oe.rpc("admin_stats")),
      economy: () => sa(oe.rpc("admin_economy")),
      server: () => sa(oe.rpc("admin_server")),
      progress: () => sa(oe.rpc("admin_progress")),
      player: (g) => sa(oe.rpc("admin_player", { uid: g })),
      gift: (g, E, q, Pe, at) =>
        sa(oe.rpc("admin_gift", { uid: g, kind: E, payload: q, message: Pe, days: at })),
      cancel: (g) => sa(oe.rpc("admin_gift_cancel", { gid: g })),
      mod: (g) => sa(oe.rpc("admin_mod", { uid: g })),
      rename: (g) => sa(oe.rpc("admin_rename", { uid: g })),
      ban: (g, E, q) => sa(oe.rpc("admin_ban", { uid: g, days: E, reason: q })),
      unban: (g) => sa(oe.rpc("admin_unban", { uid: g })),
      reset: (g) => sa(oe.rpc("admin_reset", { uid: g })),
      restore: (g, E) => sa(oe.rpc("admin_restore", { uid: g, bid: E })),
      take: (g, E, q) => sa(oe.rpc("admin_take", { uid: g, items: E, money: q })),
      takeMons: (g, E) => sa(oe.rpc("admin_take_mons", { uid: g, mons: E })),
      clock: (g) => sa(oe.rpc("admin_clock", { uids: g })),
      verify: (g) => sa(oe.rpc("admin_verify", { uid: g })),
      hold: (g) => sa(oe.rpc("admin_hold", { uid: g })),
    },
    la = (g) => (!g.error && Array.isArray(g.data) && ((At = g.data), Ja(), fe()), g);
  let Xa = null,
    nn = !1,
    F = !1,
    Ce = !1,
    Xe = 0,
    Ve = 0;
  const Rt = () => Date.now() - Ve < $ && At?.some((g) => g.status === "pending" && !g.incoming),
    da = () => !!(oe && $e && !Ce && !re() && (F || Rt()));
  function ia() {
    Xa && (oe.removeChannel(Xa), (Xa = null), (nn = !!At));
  }
  function Ja() {
    const g = da();
    return g === !!Xa
      ? !1
      : g
        ? ((Xa = oe
            .channel(`friends:${$e.id}`, { config: { private: !0 } })
            .on("broadcast", { event: "request" }, () => an.refresh())
            .on("broadcast", { event: "accepted" }, () => {
              (an.refresh(), t.UI.toast(e("Une demande d'ami a été acceptée !")));
            })
            .subscribe()),
          !0)
        : (ia(), !1);
  }
  function Ia(g) {
    if (Array.isArray(g)) {
      if (nn && At) {
        const E = new Set(At.filter((q) => q.status === "pending" && !q.incoming).map((q) => q.uid));
        g.some((q) => q.status === "accepted" && E.has(q.uid)) &&
          t.UI.toast(e("Une demande d'ami a été acceptée !"));
      }
      ((nn = !Xa), (At = g), (Xe = Date.now()), Ja());
    }
  }
  const ka = () =>
      $e &&
      sa(oe.rpc("friends_list")).then((g) => {
        g.error || (Ia(g.data), fe());
      }),
    Za = (g) =>
      Array.isArray(g)
        ? `${g.filter((E) => E.status === "accepted").length}/${g.filter((E) => E.incoming).length}/${g.filter((E) => E.status === "pending" && !E.incoming).length}`
        : `${+g.acc || 0}/${+g.inc || 0}/${+g.out || 0}`;
  let En = null;
  const bn = (g) => (g(), fe(), Promise.resolve({ data: En })),
    an = {
      get list() {
        return En || At || [];
      },
      get loaded() {
        return !!(En || At);
      },
      get isTest() {
        return !!En;
      },
      test(g) {
        ((En = g || null), fe());
      },
      live(g) {
        ((F = !!g), Ja(), g && nn && !En && Date.now() - Xe >= 6e4 && ka());
      },
      refresh: () => (En ? Promise.resolve({ data: En }) : sa(oe.rpc("friends_list")).then(la)),
      request: (g) =>
        En
          ? Promise.resolve({ data: { ok: !1, error: "not_found" } })
          : sa(oe.rpc("friend_request", { code: g })).then(
              (E) => (E.data?.list && ((Ve = Date.now()), Wa(Ja, $ + 1e3), la({ data: E.data.list })), E),
            ),
      respond: (g, E) =>
        En
          ? bn(() => {
              const q = En.find((Pe) => Pe.uid === g);
              E && q
                ? Object.assign(q, { status: "accepted", incoming: !1 })
                : (En = En.filter((Pe) => Pe.uid !== g));
            })
          : sa(oe.rpc("friend_respond", { other: g, yes: E })).then(la),
      remove: (g) =>
        En
          ? bn(() => {
              En = En.filter((E) => E.uid !== g);
            })
          : sa(oe.rpc("friend_remove", { other: g })).then(la),
      card: (g) =>
        En
          ? Promise.resolve({ data: En.find((E) => E.uid === g)?.card || null })
          : sa(oe.rpc("friend_card", { other: g })),
    };
  return {
    trades: Ue,
    market: Zt,
    gifts: va,
    admin: Da,
    friends: an,
    raids: {
      days: (g, E = !1) =>
        $e ? sa(oe.rpc("raid_days", { regs: g, with_all: E })) : Promise.resolve({ error: "not_signed_in" }),
      submitMany: (g) =>
        $e ? sa(oe.rpc("raid_submit_many", { entries: g })) : Promise.resolve({ error: "not_signed_in" }),
      board: (g, E) =>
        $e ? sa(oe.rpc("raid_board", { reg: g, boss: E })) : Promise.resolve({ error: "not_signed_in" }),
      card: (g) => ($e ? sa(oe.rpc("raid_card", { other: g })) : Promise.resolve({ error: "not_signed_in" })),
      zoneSubmit: (g) =>
        $e ? sa(oe.rpc("zone_submit_many", { entries: g })) : Promise.resolve({ error: "not_signed_in" }),
      zoneBoard: (g) =>
        $e ? sa(oe.rpc("zone_board", { zone: g })) : Promise.resolve({ error: "not_signed_in" }),
    },
    tower: {
      submit: (g) =>
        $e ? sa(oe.rpc("tower_submit", { entry: g })) : Promise.resolve({ error: "not_signed_in" }),
      friends: (g) =>
        $e ? sa(oe.rpc("tower_friends", { week: g })) : Promise.resolve({ error: "not_signed_in" }),
    },
    wb: {
      state: () => ($e ? sa(oe.rpc("wb_state")) : Promise.resolve({ error: "not_signed_in" })),
      attack: (g, E, q, Pe) =>
        $e
          ? sa(oe.rpc("wb_attack", { n: g, day: E, uids: q, dmg: Pe }))
          : Promise.resolve({ error: "not_signed_in" }),
      launch: (g, E) =>
        $e
          ? sa(oe.rpc("wb_launch", { first: new Date(g).toISOString(), players: E }))
          : Promise.resolve({ error: "not_signed_in" }),
      admin: () => ($e ? sa(oe.rpc("wb_admin")) : Promise.resolve({ error: "not_signed_in" })),
    },
    candy: { day: () => ($e ? sa(oe.rpc("candy_day")) : Promise.resolve({ error: "not_signed_in" })) },
    get isAdmin() {
      return qe && !!$e;
    },
    get hold() {
      return $e ? mt : null;
    },
    get ban() {
      return ce;
    },
    get community() {
      return zt;
    },
    get support() {
      return $e ? ca : null;
    },
    get user() {
      return $e;
    },
    async pushNow() {
      return $e ? (de && (await de), (await _t(!0)) === !0) : !1;
    },
    onSynced(g) {
      (yt.push(g), dt && g());
    },
    ready: ts,
    get checking() {
      return !!Yn;
    },
    onChecked(g) {
      za.push(g);
    },
    init: ln,
    signIn: In,
    signOut: xe,
    profile: Oe,
    wipe: Et,
    GOOGLE_ICON: Ee,
    linked: () => !!localStorage.getItem(le),
    touch(g) {
      ((je().S.updatedAt = Date.now()), (Z = !0), g || He(), Ea());
    },
    rush() {
      ((Re = !0), Wa(Ea, 0));
    },
    mark: He,
    get available() {
      return !!oe;
    },
    get pushedAt() {
      return A;
    },
    get saveState() {
      return !$e || ce || re() || We
        ? "off"
        : jt
          ? "lost"
          : de || !dt || ze || Yn || t.CatchUp?.busy
            ? "busy"
            : _e
              ? "error"
              : "ok";
    },
    get saveWait() {
      const g = De();
      return g ? Math.max(0, Ge - (Date.now() - g)) : 0;
    },
    reconnect: () => ye(!0),
    async saveNow() {
      if (this.saveState === "off") return "failed";
      if (this.saveWait > 0) return "wait";
      if ((de && (await de), dt && U(je().S) === Ne)) return "same";
      const g = A;
      if ((await _t(!0, !0), A === g)) return "failed";
      try {
        localStorage.setItem(ve, String(A));
      } catch {}
      return "saved";
    },
    on(g) {
      return (he.push(g), () => he.splice(he.indexOf(g), 1));
    },
  };
})();
