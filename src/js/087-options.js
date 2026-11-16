/**
 * options
 *
 * Public API on the game namespace `t`: t.Options
 *
 * Recovered from the shipped bundle — original chunk #86 at byte 2249185 (14390 bytes, sha256:0a4e551de1a458bd).
 * This file is one original source file; the build concatenates them in filename order.
 */
(function () {
  const a = t.UI,
    { $: b, $$: f, h: ue, modal: H, confirm: vt } = a,
    B = t.Game,
    se = t.CONFIG,
    Ge = () => t.Perf,
    Je = [
      [
        "newpopup",
        () => e("Fiche des nouveaux Pokémon"),
        () => e("Affiche la fiche Pokédex à chaque nouvelle capture. Un chromatique a toujours la sienne"),
        () => !B.S.noNewPopup,
        () => {
          B.S.noNewPopup = !B.S.noNewPopup;
        },
      ],
      [
        "autoswitch",
        () => e("Switch auto"),
        () => e("Envoie le Pokémon le plus adapté face à l'adversaire"),
        () => B.S.autoSwitch !== !1,
        () => {
          B.S.autoSwitch = B.S.autoSwitch === !1;
        },
      ],
      [
        "feed",
        () => e("Apparaître dans le fil"),
        () => e("Tes exploits s'affichent chez les autres dresseurs (compte connecté)"),
        () => !B.S.feedHidden,
        () => {
          B.S.feedHidden = !B.S.feedHidden;
        },
      ],
    ],
    Ze = [
      [
        "flash",
        () => e("Flashs lumineux"),
        () => e("Éclairs blancs et assombrissements des attaques, des orages et des cinématiques"),
        () => !B.S.noFlash,
        () => {
          ((B.S.noFlash = !B.S.noFlash), a.syncCalm());
        },
      ],
      [
        "shake",
        () => e("Tremblements de l'écran"),
        () => e("Secousses sur les coups puissants, les captures et les évolutions"),
        () => !B.S.noShake,
        () => {
          B.S.noShake = !B.S.noShake;
        },
      ],
      [
        "dull",
        () => e("Badges ternis"),
        () => "",
        () => !B.S.noDullBadges,
        () => {
          B.S.noDullBadges = !B.S.noDullBadges;
        },
        () => t.BadgeShine.on(),
        () =>
          e(
            "Désactivé : aucun badge ne s'affiche terne, ni les tiens ni ceux des autres, sur ton écran seulement. Ils continuent de ternir : réactive l'option pour voir leur vrai état.",
          ),
      ],
    ],
    x = [
      [
        "calm",
        () => e("Animations réduites"),
        () =>
          matchMedia("(prefers-reduced-motion: reduce)").matches
            ? e("Réduites par ton appareil (Windows : Effets d'animation)")
            : e("Cinématiques raccourcies, effets figés"),
      ],
      ["weather", () => e("Météo animée"), () => e("Pluie, neige, sable qui bougent")],
      ["bg", () => e("Fond animé"), () => e("Les Poké Balls qui défilent derrière le jeu")],
      [
        "glass",
        () => e("Effets de verre"),
        () =>
          Ge().touch
            ? e("Flou derrière les barres de la scène. Peut ralentir certains téléphones")
            : e("Flou derrière les barres de la scène"),
      ],
      ["glint", () => e("Scintillement chromatique"), () => e("Les étoiles autour des chromatiques")],
    ].map(([dt, qe, ce]) => [dt, qe, ce, () => Ge().get(dt), () => Ge().set(dt, !Ge().get(dt))]),
    $ = [
      ["eco", "🔋", () => e("Économie"), () => e("Effets coupés")],
      ["balanced", "⚖️", () => e("Équilibré"), () => e("Recommandé")],
      ["max", "✨", () => e("Maximum"), () => e("Tout activé")],
    ],
    X = [
      [12e4, () => e("{n} min", { n: 2 })],
      [3e5, () => e("{n} min", { n: 5 })],
      [0, () => e("Jamais")],
    ],
    Tt = [...Je, ...Ze, ...x],
    le = (
      dt,
      qe,
      ce,
      tt,
      mt,
    ) => `<div class="op-row ${tt ? "on" : ""}" data-sw="${dt}" role="switch" aria-checked="${tt}" tabindex="0">
      <span class="t"><b>${qe}${mt ? ` ${a.infoTip(`<b>${qe}</b><p>${mt}</p>`)}` : ""}</b>${ce ? `<small>${ce}</small>` : ""}</span><span class="op-sw"></span></div>`,
    P = (dt) =>
      dt
        .filter((qe) => !qe[5] || qe[5]())
        .map(([qe, ce, tt, mt, , , Te]) => le(qe, ce(), tt(), mt(), Te?.()))
        .join(""),
    u = (dt) => `<svg class="op-flag" viewBox="0 0 30 20" aria-hidden="true">${dt}</svg>`,
    ve = {
      fr: u(
        '<rect width="10" height="20" fill="#002654"/><rect x="10" width="10" height="20" fill="#fff"/><rect x="20" width="10" height="20" fill="#ce1126"/>',
      ),
      en: u(
        '<rect width="30" height="20" fill="#012169"/><path d="M0 0l30 20M30 0L0 20" stroke="#fff" stroke-width="4"/><path d="M0 0l30 20M30 0L0 20" stroke="#c8102e" stroke-width="1.5"/><path d="M15 0v20M0 10h30" stroke="#fff" stroke-width="6"/><path d="M15 0v20M0 10h30" stroke="#c8102e" stroke-width="3.5"/>',
      ),
      es: u(
        '<rect width="30" height="20" fill="#aa151b"/><rect y="5" width="30" height="10" fill="#f1bf00"/>',
      ),
      de: u(
        '<rect width="30" height="20" fill="#ffce00"/><rect width="30" height="13.34" fill="#dd0000"/><rect width="30" height="6.67" fill="#000"/>',
      ),
      ko: u(
        '<rect width="30" height="20" fill="#fff"/><path d="M10 10a5 5 0 0 1 10 0a2.5 2.5 0 0 1-5 0a2.5 2.5 0 0 0-5 0" fill="#cd2e3a"/><path d="M10 10a2.5 2.5 0 0 0 5 0a2.5 2.5 0 0 1 5 0a5 5 0 0 1-10 0" fill="#0047a0"/><path d="M4 3.5l3 2.5M3 5l3 2.5M23 12.5l3 2.5M24 11l3 2.5M23 7.5l3-2.5M24 9l3-2.5M4 16.5l3-2.5M3 15l3-2.5" stroke="#000" stroke-width="1"/>',
      ),
      ja: u('<rect width="30" height="20" fill="#fff"/><circle cx="15" cy="10" r="6" fill="#bc002d"/>'),
    },
    it = (dt) =>
      ve[dt] ||
      `<span class="op-flag op-flag-txt" aria-hidden="true">${{ "zh-Hans": "简", "zh-Hant": "繁" }[dt] || ""}</span>`,
    De = () => {
      const dt = t.I18n;
      return dt.LANGS.map(
        (
          qe,
        ) => `<div class="op-row op-langrow${dt.lang === qe ? " on" : ""}" data-lang="${qe}" lang="${qe}" role="radio" aria-checked="${dt.lang === qe}" tabindex="0">
      ${it(qe)}<span class="t"><b>${dt.NAMES[qe]}</b></span>${dt.lang === qe ? '<span class="op-tick">✓</span>' : ""}</div>`,
      ).join("");
    },
    je = [
      ["dark", () => "🌙 " + e("Sombre")],
      ["light", () => "☀️ " + e("Clair")],
      ["auto", () => e("Auto")],
    ],
    pt = () =>
      t.Theme.pref === "auto"
        ? e("Suit le réglage de ton appareil")
        : t.Theme.pref === "light"
          ? e("Clair")
          : e("Sombre"),
    re =
      () => `<div class="op-row op-static op-lang op-theme"><span class="t"><b>${e("Thème")}</b><small>${pt()}</small></span>
      <div class="seg" role="radiogroup" aria-label="${e("Thème")}">${je.map(([dt, qe]) => `<button type="button" role="radio" aria-checked="${t.Theme.pref === dt}" data-theme-pref="${dt}" class="${t.Theme.pref === dt ? "on" : ""}">${qe()}</button>`).join("")}</div></div>`,
    We = (dt) => {
      if (!dt) return "—";
      const qe = Math.round((Date.now() - dt) / 1e3);
      return qe < 60 ? e("il y a {n} s", { n: qe }) : e("il y a {n} min", { n: Math.round(qe / 60) });
    },
    oe = () => document.querySelector(".side-disc svg")?.outerHTML || "";
  function $e() {
    const dt = t.Cloud,
      qe = dt.profile();
    return qe
      ? `<div class="op-row op-static op-discord on"><span class="op-ic">${qe.avatar ? `<img src="${a.esc(qe.avatar)}" alt="" referrerpolicy="no-referrer">` : qe.provider === "google" ? dt.GOOGLE_ICON : oe()}</span>
        <span class="t"><b>${a.esc(qe.name)}</b><small>${dt.pushedAt ? e("Sauvegarde en ligne · {ago}", { ago: We(dt.pushedAt) }) : e("Synchronisation…")}</small></span></div>
      <div class="op-row" data-act="logout" tabindex="0"><span class="t"><b>${e("Se déconnecter")}</b><small>${e("Ta partie reste sur ce navigateur")}</small></span><span class="chev">›</span></div>`
      : `<div class="op-row op-discord" data-act="login" tabindex="0"><span class="op-ic">${oe()}</span>
        <span class="t"><b>${e("Se connecter avec Discord")}</b><small>${e("Sauvegarde ta partie en ligne et retrouve-la sur tous tes appareils")}</small></span><span class="chev">›</span></div>
      <div class="op-row op-google" data-act="login-google" tabindex="0"><span class="op-ic">${dt.GOOGLE_ICON}</span>
        <span class="t"><b>${e("Se connecter avec Google")}</b><small>${e("Même sauvegarde en ligne, avec ton compte Google")}</small></span><span class="chev">›</span></div>`;
  }
  const Z = (dt) => `<img src="${dt}" alt="">`;
  let A = "general";
  function J() {
    const dt = matchMedia("(max-width: 640px)").matches,
      qe = t.I18n;
    return [
      [
        e("Jeu"),
        [
          {
            id: "general",
            name: e("Général"),
            ic: Z("assets/ui/town-map.png"),
            c: "var(--red)",
            html: () => de(P(Je)),
          },
          { id: "lang", name: e("Langue"), ic: it(qe.lang), c: "var(--blue)", html: () => de(De()) },
        ],
      ],
      [
        e("Affichage"),
        [
          {
            id: "graphics",
            name: e("Graphismes"),
            ic: Z("assets/items/silph-scope.png"),
            c: "var(--gold-soft)",
            html: () => de(re() + P(Ze)),
          },
          {
            id: "perf",
            name: e("Performances"),
            ic: Z("assets/items/rotom-fan.png"),
            c: "var(--green)",
            html: _e,
          },
        ],
      ],
      [
        e("Compte"),
        [
          t.Cloud?.available && {
            id: "account",
            name: e("Sauvegarde"),
            ic: Z("assets/ui/floppy.svg"),
            c: "var(--blue)",
            html: () => '<div class="op-card op-account"></div>',
          },
          dt && {
            id: "community",
            name: e("Communauté"),
            ic: Z("assets/ui/link-cable.svg"),
            c: "var(--blue-vivid)",
            html: () =>
              de(`
          <a class="op-row" href="${a.esc(document.querySelector(".side-disc")?.href || "")}" target="_blank" rel="noopener"><span class="op-ic">${oe()}</span><span class="t"><b>${e("Rejoindre le Discord")}</b><small>${e("Les news, l'entraide et les autres dresseurs")}</small></span><span class="chev">›</span></a>
          <a class="op-row" href="https://discord.com/channels/1558172928649207899/1558176197089689610" target="_blank" rel="noopener"><span class="t"><b>${e("Signaler un bug")}</b><small>${e("Salon #bugs du Discord")}</small></span><span class="chev">›</span></a>`),
          },
        ].filter(Boolean),
      ],
      [
        e("Aide"),
        [
          {
            id: "news",
            name: e("Nouveautés"),
            ic: Z("assets/ui/orange-mail.png"),
            c: "var(--yellow)",
            isNew: () => t.Changelog.isNew() || t.Guide.isNew(),
            html: () =>
              de(`
          <div class="op-row op-cl" data-act="changelog" tabindex="0"><span class="op-ic"><img class="pn-ic" src="assets/ui/orange-mail.png" alt=""></span><span class="t"><b>Changelogs</b><small>${e("Notes de mise à jour")}</small></span>${t.Changelog.isNew() ? '<span class="new">NEW</span>' : ""}<span class="chev">›</span></div>
          <div class="op-row op-cl" data-act="guide" tabindex="0"><span class="op-ic"><img class="pn-ic" src="assets/items/adventure-guide.png" alt=""></span><span class="t"><b>${e("Guide")}</b><small>${e("Chaque fonctionnalité expliquée")}</small></span>${t.Guide.isNew() ? '<span class="new">NEW</span>' : ""}<span class="chev">›</span></div>`),
          },
          {
            id: "advanced",
            name: e("Avancé"),
            ic: Z("assets/ui/padlock.svg"),
            c: "var(--red)",
            html: () =>
              de(`
          <div class="op-row danger" data-act="reset" tabindex="0"><span class="t"><b>${e("Réinitialiser la sauvegarde")}</b><small>${e("Efface toute la progression (confirmation demandée)")}</small></span><span class="chev">›</span></div>`) +
              (t.App.communityLine() ? `<p class="op-community">${t.App.communityLine()}</p>` : ""),
          },
        ],
      ],
    ].filter((ce) => ce[1].length);
  }
  const de = (dt) => `<div class="op-card">${dt}</div>`;
  function _e() {
    const dt = Ge().preset(),
      qe = Ge().get("sleep");
    return `<div class="op-perf-head"><span class="op-dev">${Ge().touch ? "📱 " + e("Téléphone") : "💻 " + e("Ordinateur")}</span>${dt === "custom" ? `<span class="op-dev op-custom">${e("Personnalisé")}</span>` : ""}</div>
      <p class="op-lead">${e("Moins d'effets = moins de batterie.")}</p>
      <div class="op-preset" role="radiogroup" aria-label="${e("Performances")}">${$.map(([ce, tt, mt, Te]) => `<button type="button" role="radio" aria-checked="${dt === ce}" data-preset="${ce}" class="${dt === ce ? "on" : ""}"><span class="ic" aria-hidden="true">${tt}</span><b>${mt()}</b><small>${Te()}</small></button>`).join("")}</div>
      <div class="op-group"><h5>${e("Mode veille")}</h5>${de(`<div class="op-row op-static op-theme"><span class="t"><b>${e("Écran noir après")}</b></span>
        <div class="seg" role="radiogroup" aria-label="${e("Écran noir après")}">${X.map(([ce, tt]) => `<button type="button" role="radio" aria-checked="${qe === ce}" data-sleep="${ce}" class="${qe === ce ? "on" : ""}">${tt()}</button>`).join("")}</div></div>`)}</div>
      <div class="op-group"><h5>${e("Détail")}</h5>${de(P(x))}</div>`;
  }
  function Re(dt) {
    const qe = J(),
      ce = qe.flatMap((yt) => yt[1]);
    (dt && ce.some((yt) => yt.id === dt) && (A = dt), ce.some((yt) => yt.id === A) || (A = ce[0].id));
    const tt = ue(`<div class="gd-in">
      <div class="dc-head"><span class="gd-head-ic op-head-ic" aria-hidden="true">⚙</span><h2>${e("Options")}</h2><div class="dc-sum"><button class="dc-x" aria-label="${e("Fermer")}">✕</button></div></div>
      <div class="gd-wrap"><nav class="gd-nav"></nav><div class="gd-page"></div></div>
      <div class="gd-foot op-foot"><span class="op-saved"></span><span>Poke'Catch v${se.VERSION}</span></div></div>`);
    let mt, Te;
    const At = () => {
      b(".op-saved", tt).textContent = e("Sauvegarde auto · {ago}", { ago: We(B.savedAt) });
    };
    return (
      At(),
      H({
        className: "dexcard-modal gd-modal opt-modal",
        body: tt,
        onOpen: (yt, he, fe) => {
          const Oe = b(".gd-nav", tt),
            Ee = b(".gd-page", tt),
            et = (R) => {
              (clearInterval(mt), he(R));
            },
            _ = (R, te, K) => {
              const He = b(`[data-act="${te}"]`, R);
              He &&
                ((He.onclick = K),
                (He.onkeydown = (m) => {
                  (m.key === "Enter" || m.key === " ") && (m.preventDefault(), K());
                }));
            };
          function we() {
            ((Oe.innerHTML = qe
              .map(
                ([R, te]) =>
                  `<div class="gd-grp">${R}</div>` +
                  te
                    .map(
                      (
                        K,
                      ) => `<button class="gd-item${K.id === A ? " on" : ""}" data-p="${K.id}" style="--ic:${K.c}">
            <span class="gd-ic">${K.ic}</span><span class="gd-lbl">${K.name}</span>${K.isNew?.() ? '<span class="gd-new">NEW</span>' : ""}</button>`,
                    )
                    .join(""),
              )
              .join("")),
              f(".gd-item", Oe).forEach((R) => {
                R.onclick = () => U(R.dataset.p);
              }),
              b(".on", Oe)?.scrollIntoView({ block: "nearest", inline: "nearest" }));
          }
          function ie() {
            const R = b(".op-account", Ee);
            R &&
              ((R.innerHTML = $e()),
              _(R, "login", () => t.Cloud.signIn("discord")),
              _(R, "login-google", () => t.Cloud.signIn("google")),
              _(R, "logout", () => t.Cloud.signOut()));
          }
          function U(R) {
            A = R;
            const te = ce.find((K) => K.id === R);
            ((Ee.innerHTML = `<div class="op-page"><h3>${te.name}</h3>${te.html()}</div>`),
              (Ee.scrollTop = 0),
              we(),
              Ne());
          }
          function Ne() {
            (ie(),
              f("[data-sw]", Ee).forEach((R) => {
                const te = () => {
                  const K = Tt.find((m) => m[0] === R.dataset.sw);
                  if ((K[4](), x.includes(K))) return U("perf");
                  const He = K[3]();
                  (R.classList.toggle("on", He), R.setAttribute("aria-checked", He), B.save());
                };
                ((R.onclick = (K) => {
                  K.target.closest(".info-tip") || te();
                }),
                  (R.onkeydown = (K) => {
                    (K.key === " " || K.key === "Enter") &&
                      !K.target.closest(".info-tip") &&
                      (K.preventDefault(), te());
                  }));
              }),
              f("[data-preset]", Ee).forEach((R) => {
                R.onclick = () => {
                  (Ge().set("preset", R.dataset.preset), U("perf"));
                };
              }),
              f("[data-sleep]", Ee).forEach((R) => {
                R.onclick = () => {
                  (Ge().set("sleep", +R.dataset.sleep), U("perf"));
                };
              }),
              f("[data-theme-pref]", Ee).forEach((R) => {
                R.onclick = () => {
                  (t.Theme.set(R.dataset.themePref),
                    f("[data-theme-pref]", Ee).forEach((te) => {
                      const K = te === R;
                      (te.classList.toggle("on", K), te.setAttribute("aria-checked", K));
                    }),
                    (b(".op-theme small", Ee).textContent = pt()));
                };
              }),
              f("[data-lang]", Ee).forEach((R) => {
                const te = () => {
                  R.dataset.lang !== t.I18n.lang && (B.save(), t.I18n.set(R.dataset.lang));
                };
                ((R.onclick = te),
                  (R.onkeydown = (K) => {
                    (K.key === "Enter" || K.key === " ") && (K.preventDefault(), te());
                  }));
              }),
              _(Ee, "changelog", () => {
                (et(null), t.Changelog.open());
              }),
              _(Ee, "guide", () => {
                (et(null), t.Guide.open());
              }),
              _(Ee, "reset", async () => {
                et(null);
                const R = t.Cloud?.profile(),
                  te =
                    e(
                      "Ton équipe, ton Pokédex, tes badges et ta carte de dresseur seront perdus. C'est définitif.",
                    ) +
                    (R
                      ? " " + e("La sauvegarde en ligne de ce compte sera aussi effacée et tes amis retirés.")
                      : t.Cloud?.linked()
                        ? " " +
                          e(
                            "Ta sauvegarde en ligne ne sera pas touchée : connecte-toi d'abord pour l'effacer aussi.",
                          )
                        : "");
                if (!(await vt(te, e("Tout effacer"))) || t.TabLock?.mine() === !1) return;
                const K = JSON.stringify(B.S);
                if ((B.reset(), t.Cloud && !(await t.Cloud.wipe())))
                  return (
                    localStorage.setItem(t.CONFIG.SAVE_KEY, K),
                    (t.onbeforeunload = null),
                    B.stopSaving(),
                    await vt(
                      e(
                        "Impossible de joindre la sauvegarde en ligne. Rien n'a été effacé, réessaie une fois connecté.",
                      ),
                      "OK",
                    ),
                    location.reload()
                  );
                ((t.onbeforeunload = null), B.stopSaving(), location.reload());
              }));
          }
          ((b(".dc-x", tt).onclick = () => et(null)),
            (Te = t.Cloud?.on(ie)),
            (mt = Ss(() => {
              if ((At(), t.Cloud?.pushedAt)) {
                const R = b(".op-discord.on small", Ee);
                R && (R.textContent = e("Sauvegarde en ligne · {ago}", { ago: We(t.Cloud.pushedAt) }));
              }
            }, 1e3)));
          const T = () => yt.classList.toggle("narrow", yt.offsetWidth < 600);
          T();
          const L = new ResizeObserver(T);
          (L.observe(yt), fe.addEventListener("abort", () => L.disconnect()), U(A));
        },
      }).then(() => {
        (clearInterval(mt), Te?.());
      })
    );
  }
  t.Options = { open: Re };
})();
