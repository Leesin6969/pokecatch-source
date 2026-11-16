/**
 * title
 *
 * Public API on the game namespace `t`: t.Title
 *
 * Recovered from the shipped bundle — original chunk #91 at byte 2616747 (16721 bytes, sha256:b1130279ba71f5ff).
 * This file is one original source file; the build concatenates them in filename order.
 */
t.Title = (function () {
  const { $: a, h: b, esc: f, monSrc: ue, sleep: H, modal: vt } = t.UI,
    B = t.Game,
    se = () => !!B.S.reducedAnim || matchMedia("(prefers-reduced-motion: reduce)").matches,
    Ge = matchMedia("(max-width: 640px)").matches ? 14 : 30,
    Je = 2,
    Ze = () => t.STORY.REGIONS.filter((tt) => tt.key && tt.dex && !tt.wip).at(-1),
    x = [
      [
        "🌿",
        e("Ton équipe avance seule"),
        e("Elle combat et capture les Pokémon sauvages, même quand tu n'es pas là."),
      ],
      ["🏅", e("Gagne les badges"), e("Bats les Champions d'Arène pour ouvrir de nouvelles routes.")],
      [
        "🌍",
        e("Tu n'es pas seul"),
        e(
          "D'autres dresseurs jouent en même temps : suis leurs exploits dans le chat et compare tes temps aux leurs dans les classements.",
        ),
      ],
      [
        "✨",
        e("Les events légendaires"),
        e(
          "Un légendaire apparaît pour une heure, pour tout le monde : sois le premier à le capturer, avec l'équipe qui le contre.",
        ),
      ],
    ],
    $ = [
      e(
        "Bonjour ! Bienvenue dans le monde des <b>Pokémon</b> ! Je m'appelle <b>Chen</b>, mais on m'appelle le Prof. Pokémon.",
      ),
      e(
        "Ici, ton aventure avance toute seule : ton équipe combat et capture les Pokémon sauvages… <b>même quand tu n'es pas là</b> !",
      ),
      e("Bats les <b>Champions d'Arène</b> pour gagner leurs badges et ouvrir de nouvelles routes."),
      e("Et ouvre l'œil : des <b>Pokémon légendaires</b> apparaissent lors d'events limités dans le temps."),
      e("Mais d'abord, il te faut un partenaire. Viens, <b>choisis ton premier Pokémon</b> !"),
    ],
    X = () => (B.S.mons || []).length > 0,
    Tt = () => document.querySelector(".side-disc svg")?.outerHTML || "";
  function le() {
    return vt({
      className: "ti-how",
      body: `<h3>${e("Comment jouer")}</h3><ul class="ti-rules">${x.map(([tt, mt, Te]) => `<li><span class="ic">${tt}</span><span><b>${mt}</b><small>${Te}</small></span></li>`).join("")}</ul>`,
      actions: [{ label: e("Compris !"), cls: "gold" }],
    });
  }
  function P(tt, mt) {
    return {
      x: tt == null ? 3 + Math.random() * 94 : Math.min(97, Math.max(3, tt + (Math.random() - 0.5) * 40)),
      y: mt == null ? 12 + Math.random() * 86 : Math.min(98, Math.max(12, mt + (Math.random() - 0.5) * 30)),
    };
  }
  let u = null;
  const ve = (tt, mt, Te) => {
    const At = b(`<i class="${tt}"></i>`);
    return (
      (At.style.left = mt + "px"),
      (At.style.top = Te + "px"),
      (At.style.zIndex = 99),
      u.appendChild(At),
      At
    );
  };
  function it(tt, mt, Te, At = 380) {
    const yt = ve("ti-ring", tt, mt);
    yt.animate(
      [
        { width: "8px", height: "8px", opacity: 1, borderWidth: "4px" },
        { width: Te + "px", height: Te + "px", opacity: 0, borderWidth: "1px" },
      ],
      { duration: At, easing: "cubic-bezier(.1,.7,.3,1)" },
    ).finished.then(() => yt.remove());
  }
  function De(tt, mt, Te, At) {
    for (let yt = 0; yt < Te; yt++) {
      const he = (Math.PI * 2 * yt) / Te + Math.random() * 0.5,
        fe = At * (0.7 + Math.random() * 0.6),
        Oe = ve("ti-spark", tt, mt);
      Oe.animate(
        [
          { transform: "translate(-50%,-50%) scale(1)", opacity: 1 },
          {
            transform: `translate(calc(-50% + ${Math.cos(he) * fe}px), calc(-50% + ${Math.sin(he) * fe}px)) scale(.2)`,
            opacity: 0,
          },
        ],
        { duration: 320 + Math.random() * 120, easing: "cubic-bezier(.2,.8,.3,1)" },
      ).finished.then(() => Oe.remove());
    }
  }
  function je(tt, mt) {
    const Te = b('<i class="pen-dust" style="--fx:0px;--fy:0px"><b></b><b></b><b></b><b></b></i>');
    ((Te.style.left = tt + "px"),
      (Te.style.top = mt + "px"),
      (Te.style.zIndex = 99),
      u.appendChild(Te),
      Wa(() => Te.remove(), 700));
  }
  function pt(tt) {
    const mt = tt.querySelector("img"),
      Te = tt.querySelector(".shadow");
    (mt.animate(
      [
        { translate: "0 -420px", scale: ".9 1.15", easing: "cubic-bezier(.5,0,1,.6)" },
        { translate: "0 0", scale: "1.35 .65", offset: 0.42, easing: "ease-out" },
        { translate: "0 -40px", scale: ".9 1.12", offset: 0.6, easing: "ease-in" },
        { translate: "0 0", scale: "1.18 .82", offset: 0.74, easing: "ease-out" },
        { translate: "0 -12px", scale: ".97 1.04", offset: 0.85, easing: "ease-in" },
        { translate: "0 0", scale: "1.06 .94", offset: 0.94 },
        { translate: "0 0", scale: "1 1" },
      ],
      { duration: 1300, fill: "backwards" },
    ),
      Te.animate(
        [
          { scale: ".2", opacity: 0 },
          { scale: "1.3", opacity: 1, offset: 0.42 },
          { scale: ".8", offset: 0.6 },
          { scale: "1.1", offset: 0.74 },
          { scale: "1", opacity: 1 },
        ],
        { duration: 1300, fill: "backwards" },
      ));
    const At = b('<i class="pen-dust"><b></b><b></b><b></b><b></b></i>');
    (At.style.setProperty("--d", "546ms"), tt.appendChild(At), Wa(() => At.remove(), 1300));
  }
  function re(tt) {
    u = tt;
    const [mt, Te] = Ze().dex,
      At = (t.POKEDEX || [])
        .filter((et) => et.id >= mt && et.id <= Te && !et.legendary && !et.mythical)
        .map((et) => et.id),
      yt = new Set(),
      he = () => {
        let et;
        do et = At[(Math.random() * At.length) | 0];
        while (yt.has(et) && yt.size < At.length);
        return et;
      };
    function fe(et, _, we = !1) {
      const ie = he();
      yt.add(ie);
      const U = t.SPRITE_BOUNDS?.[ue(ie)] || [17, 10, 51, 50],
        Ne = b(
          `<div class="pen-walker" style="--fx:${((U[0] + U[2]) / 2) * Je}px;--fy:${U[3] * Je}px"><i class="shadow"></i><div class="body"><img src="${ue(ie, we)}" alt=""></div></div>`,
        );
      ((Ne.dataset.id = ie), we && Ne.classList.add("ti-shiny"), tt.appendChild(Ne));
      let { x: T, y: L } = P();
      const R = () => {
        ((Ne.style.left = T + "%"), (Ne.style.top = L + "%"), (Ne.style.zIndex = Math.round(L)));
      };
      if ((R(), se())) return;
      _
        ? pt(Ne)
        : Ne.animate(
            [
              { opacity: 0, scale: ".4" },
              { opacity: 1, scale: "1" },
            ],
            { duration: 400, delay: et, easing: "cubic-bezier(.2,1.4,.4,1)", fill: "backwards" },
          );
      const te = () => {
        if (!Ne.isConnected || Ne.classList.contains("caught")) return;
        const K = Math.random();
        if (K < 0.6) {
          const { x: He, y: m } = P(T, L),
            z = Math.max(2, Math.round(Math.hypot((He - T) * 12, (m - L) * 8) / 40)),
            pe = 300;
          (Ne.querySelector(".body").classList.toggle("flip", He > T),
            (Ne.style.transitionDuration = z * pe + "ms"),
            Ne.classList.add("walk"),
            (T = He),
            (L = m),
            R(),
            Wa(() => {
              (Ne.classList.remove("walk"), Wa(te, 800 + Math.random() * 2500));
            }, z * pe));
        } else
          K < 0.75
            ? (Ne.classList.add("hop"),
              Wa(() => {
                (Ne.classList.remove("hop"), Wa(te, 500));
              }, 1300))
            : Wa(te, 1500 + Math.random() * 3e3);
      };
      Wa(te, et + 600 + Math.random() * 3e3);
    }
    async function Oe() {
      if (!tt.isConnected) return;
      const et = [...tt.querySelectorAll(".pen-walker:not(.walk):not(.hop):not(.caught)")],
        _ = et[(Math.random() * et.length) | 0];
      if (!_) return;
      _.classList.add("caught");
      const we = tt.getBoundingClientRect(),
        ie = _.getBoundingClientRect(),
        U = parseFloat(_.style.getPropertyValue("--fx")),
        Ne = parseFloat(_.style.getPropertyValue("--fy")),
        T = _.querySelector(".body").classList.contains("flip"),
        L = ie.left - we.left + (T ? ie.width - U : U),
        R = ie.top - we.top + Ne - 26,
        te = (Math.random() * 3) | 0,
        K = te === 0 ? -40 : te === 1 ? we.width + 40 : L + (Math.random() - 0.5) * 300,
        He = te === 2 ? we.height + 40 : R + 40 + Math.random() * Math.max(0, we.height - R - 40),
        m = b(
          `<img class="ti-ball" src="assets/items/${Math.random() < 0.15 ? "ultra-ball" : "poke-ball"}.png" alt="">`,
        );
      ((m.style.zIndex = 99), tt.appendChild(m));
      const z = (K + L) / 2,
        pe = Math.max(-40, Math.min(He, R) - 120 - Math.random() * 80),
        V = (_t, Ea, ut, jt = 1, xt = 1) =>
          `translate(${_t - 16}px, ${Ea - 16}px) rotate(${ut}deg) scale(${jt}, ${xt})`,
        lt = K < L ? 1 : -1,
        kt = 24,
        ra = Array.from({ length: kt + 1 }, (_t, Ea) => {
          const ut = Ea / kt,
            jt = 1 - ut;
          return {
            transform: V(
              jt * jt * K + 2 * jt * ut * z + ut * ut * L,
              jt * jt * He + 2 * jt * ut * pe + ut * ut * R,
              lt * 720 * ut,
            ),
          };
        }),
        Vt = 650 + Math.hypot(L - K, R - He) * 0.5;
      await m.animate(ra, { duration: Vt, easing: "linear" }).finished;
      const Xt = ie.top - we.top + Ne - 14;
      (it(L, R, 48), De(L, R, 6, 30));
      const Ht = _.querySelector("img");
      ((Ht.style.animation = "none"),
        await Promise.all([
          m.animate(
            [
              { transform: V(L, R, 0, 1, 1) },
              { transform: V(L, R, 0, 1.35, 0.65) },
              { transform: V(L, R, 0, 1, 1) },
            ],
            { duration: 140, easing: "ease-out" },
          ).finished,
          Ht.animate([{ scale: "1 1" }, { scale: "1.3 .7" }, { scale: ".9 1.1" }], {
            duration: 140,
            easing: "ease-out",
            fill: "forwards",
          }).finished,
        ]));
      const ct = L - lt * 22,
        wt = R - 70;
      (m.animate(
        [{ transform: V(L, R, 0) }, { transform: V(ct, wt, -lt * 40), easing: "cubic-bezier(.2,.9,.3,1)" }],
        { duration: 320, fill: "forwards" },
      ),
        await H(200),
        m.classList.add("open"));
      const ge = (ct - L) * (T ? -1 : 1),
        Fe = wt - (R + 26);
      (await Ht.animate(
        [
          { scale: ".9 1.1", filter: "brightness(1)", translate: "0 0" },
          {
            scale: "1.15 .9",
            filter: "brightness(0) invert(1) drop-shadow(0 0 6px #fff)",
            translate: "0 0",
            offset: 0.3,
          },
          {
            scale: ".6 1.5",
            filter: "brightness(0) invert(1) drop-shadow(0 0 10px #fff)",
            translate: `${ge * 0.3}px ${Fe * 0.3}px`,
            offset: 0.6,
            easing: "cubic-bezier(.6,0,.9,.4)",
          },
          { scale: "0 0", filter: "brightness(0) invert(1)", translate: `${ge}px ${Fe}px` },
        ],
        { duration: 560, fill: "forwards" },
      ).finished,
        _.querySelector(".shadow").animate(
          [
            { opacity: 1, scale: "1" },
            { opacity: 0, scale: ".2" },
          ],
          { duration: 200, fill: "forwards" },
        ),
        m.classList.remove("open"),
        await m.animate(
          [
            { transform: V(ct, wt, -lt * 40, 1, 1) },
            { transform: V(ct, wt, -lt * 20, 1.3, 1.3) },
            { transform: V(ct, wt, 0, 1, 1) },
          ],
          { duration: 160, easing: "ease-out", fill: "forwards" },
        ).finished,
        (m.style.transformOrigin = "50% 90%"));
      const gt = (_t, Ea, ut, jt) =>
          m.animate([{ transform: V(ct, _t, 0) }, { transform: V(ct, Ea, 0) }], {
            duration: ut,
            easing: jt,
            fill: "forwards",
          }).finished,
        Dt = () =>
          m.animate(
            [
              { transform: V(ct, Xt, 0, 1, 1) },
              { transform: V(ct, Xt + 3, 0, 1.3, 0.7) },
              { transform: V(ct, Xt, 0, 1, 1) },
            ],
            { duration: 120, fill: "forwards" },
          ).finished;
      (await gt(wt, Xt, 300, "cubic-bezier(.5,0,1,.6)"),
        je(ct, Xt + 14),
        await Dt(),
        await gt(Xt, Xt - 26, 180, "cubic-bezier(0,.5,.5,1)"),
        await gt(Xt - 26, Xt, 180, "cubic-bezier(.5,0,1,.5)"),
        await Dt(),
        await gt(Xt, Xt - 8, 100, "ease-out"),
        await gt(Xt - 8, Xt, 100, "ease-in"));
      const ha = 1 + ((Math.random() * 3) | 0);
      for (let _t = 0; _t < ha; _t++) {
        await H(380);
        const Ea = _t % 2 ? 1 : -1;
        (m.animate(
          [
            { filter: "drop-shadow(0 3px 0 rgba(0,0,0,.35)) brightness(1)" },
            { filter: "drop-shadow(0 3px 0 rgba(0,0,0,.35)) brightness(1.8)", offset: 0.3 },
            { filter: "drop-shadow(0 3px 0 rgba(0,0,0,.35)) brightness(1)" },
          ],
          520,
        ),
          await m.animate(
            [
              { transform: V(ct, Xt, 0) },
              { transform: V(ct - Ea * 2, Xt, Ea * 8, 1.08, 0.92), offset: 0.15 },
              { transform: V(ct + Ea * 6, Xt - 2, -Ea * 32), offset: 0.45 },
              { transform: V(ct - Ea * 3, Xt, Ea * 16), offset: 0.75 },
              { transform: V(ct, Xt, 0) },
            ],
            { duration: 520, easing: "ease-in-out", fill: "forwards" },
          ).finished);
      }
      (await H(320),
        m.classList.add("click"),
        m.animate(
          [
            { transform: V(ct, Xt, 0, 1, 1) },
            { transform: V(ct, Xt - 4, 0, 1.35, 0.75) },
            { transform: V(ct, Xt - 6, 0, 0.9, 1.15) },
            { transform: V(ct, Xt, 0, 1, 1) },
          ],
          { duration: 300, easing: "ease-out", fill: "forwards" },
        ),
        it(ct, Xt, 96, 650),
        De(ct, Xt, 10, 34),
        await H(900),
        await m.animate(
          [
            { transform: V(ct, Xt, 0, 1, 1), opacity: 1 },
            { transform: V(ct, Xt - 6, 0, 1.25, 1.25), opacity: 1, offset: 0.3 },
            { transform: V(ct, Xt - 10, 180, 0, 0), opacity: 0 },
          ],
          { duration: 380, easing: "ease-in", fill: "forwards" },
        ).finished,
        De(ct, Xt - 10, 4, 18),
        m.remove(),
        yt.delete(+_.dataset.id),
        _.remove(),
        Wa(() => fe(0, !0, _.classList.contains("ti-shiny")), 500));
    }
    const Ee = () => {
      tt.isConnected &&
        (tt.querySelectorAll(".ti-ball").length < 3 && Oe(), Wa(Ee, 600 + Math.random() * 900));
    };
    for (let et = 0; et < Ge; et++) fe(et * 60, !1, et === 0);
    se() || Wa(Ee, 1200);
  }
  function We() {
    const tt = t.Cloud;
    if (!tt?.available) return "";
    const mt = tt.profile();
    return mt
      ? `<div class="ti-who">${mt.avatar ? `<img src="${f(mt.avatar)}" alt="" referrerpolicy="no-referrer">` : mt.provider === "google" ? tt.GOOGLE_ICON : Tt()}<span>${e("Connecté en tant que <b>{name}</b>", { name: f(mt.name) })}</span></div>`
      : `<button class="btn lg ti-discord">${Tt()}${e("Se connecter avec Discord")}</button>
      <button class="btn lg ti-google">${tt.GOOGLE_ICON}${e("Se connecter avec Google")}</button>`;
  }
  function oe() {
    return new Promise((tt) => {
      const mt = b(`<div class="title-fx">
        <div class="ti-field" aria-hidden="true"></div>
        <div class="ti-main">
          <h1 class="ti-logo" aria-label="Poke'Catch"><span class="a">Poke'</span><span class="b">Catch</span></h1>
          <div class="ti-menu">
            <button class="btn primary lg ti-go">${X() ? e("Continuer") : e("Nouvelle partie")}</button>
            <div class="ti-row"><button class="btn outline lg ti-how-btn">${e("Comment jouer")}</button><button class="btn outline lg ti-cl-btn${t.Changelog?.isNew() ? " has-new" : ""}"><img class="pn-ic" src="assets/ui/orange-mail.png" alt=""> Changelogs<span class="new">NEW</span></button></div>
            <div class="ti-account">${We()}</div>
          </div>
        </div>
        <p class="ti-legal">${e("Projet de fan personnel et non commercial. Pokémon et les noms associés sont des marques de Nintendo, Game Freak et Creatures.")}<br>${e("Sprites : Pokémon Showdown, PokéSprite.")}</p>
      </div>`),
        Te = Ze();
      (mt.style.setProperty("--ti-accent", Te.home || Te.color),
        (mt.dataset.region = Te.key),
        document.body.appendChild(mt),
        document.body.classList.add("titled"),
        se() ||
          (a(".ti-logo", mt).animate(
            [
              { transform: "translateY(-40px) scale(.9)", opacity: 0 },
              { transform: "translateY(4px) scale(1.02)", opacity: 1, offset: 0.7 },
              { transform: "none", opacity: 1 },
            ],
            { duration: 520, easing: "cubic-bezier(.2,1.4,.4,1)", fill: "both" },
          ),
          a(".ti-menu", mt).animate(
            [
              { transform: "translateY(16px)", opacity: 0 },
              { transform: "none", opacity: 1 },
            ],
            { duration: 320, delay: 650, easing: "ease-out", fill: "both" },
          )),
        re(a(".ti-field", mt)));
      const At = () => {
        const he = a(".ti-account", mt);
        he.innerHTML = We();
        const fe = a(".ti-discord", he),
          Oe = a(".ti-google", he);
        (fe && (fe.onclick = () => t.Cloud.signIn("discord")),
          Oe && (Oe.onclick = () => t.Cloud.signIn("google")));
      };
      At();
      const yt = t.Cloud?.on?.(At);
      ((a(".ti-how-btn", mt).onclick = () => {
        (t.Sfx?.unlock?.(), le());
      }),
        (a(".ti-cl-btn", mt).onclick = async () => {
          (t.Sfx?.unlock?.(),
            await t.Changelog.open(),
            a(".ti-cl-btn", mt).classList.remove("has-new"),
            t.Changelog.badge());
        }),
        (a(".ti-go", mt).onclick = async () => {
          (t.Sfx?.unlock?.(), yt?.());
          const he = !X();
          (he && _e(),
            await mt.animate([{ opacity: 1 }, { opacity: 0 }], { duration: se() ? 0 : 300, fill: "forwards" })
              .finished,
            mt.remove(),
            document.body.classList.remove("titled"),
            he && (await dt(), qe()),
            tt());
        }));
    });
  }
  const $e = ["red", "leaf"],
    Z = {
      red: [
        "Lucas",
        "Hugo",
        "Nathan",
        "Léo",
        "Tom",
        "Enzo",
        "Noah",
        "Jules",
        "Théo",
        "Max",
        "Axel",
        "Sacha",
        "Malo",
        "Nino",
        "Timéo",
        "Adam",
        "Kylian",
        "Elio",
      ],
      leaf: [
        "Léa",
        "Emma",
        "Chloé",
        "Jade",
        "Lina",
        "Zoé",
        "Inès",
        "Nina",
        "Lou",
        "Mila",
        "Rose",
        "Alba",
        "Iris",
        "Luna",
        "Maya",
        "Elsa",
        "Romy",
        "Lila",
      ],
    },
    A = (tt) => Z[tt][(Math.random() * Z[tt].length) | 0],
    J = 10;
  let de = null;
  function _e() {
    return (
      (de = b(`<div class="lab-fx">
      <div class="lab-bg"></div>
      <img class="lab-oak" src="assets/trainers/oak.png" alt="Prof. Chen">
      <div class="chen-box"><b class="chen-name">${e("Prof. Chen")}</b><div class="chen-text"></div><span class="chen-next">▼</span></div>
      <button class="btn ghost fx-skip lab-skip">${e("Passer")} ⏭</button>
    </div>`)),
      document.body.appendChild(de),
      de
    );
  }
  async function Re(tt, mt) {
    const Te = a(".chen-text", de),
      At = a(".chen-next", de);
    (At.classList.remove("on"),
      await ce(Te, tt, mt),
      !mt?.skipped &&
        (At.classList.add("on"),
        await new Promise((yt) => {
          const he = () => {
            (de.removeEventListener("pointerdown", he), mt?.off(he), yt());
          };
          (de.addEventListener("pointerdown", he), mt?.on(he));
        }),
        At.classList.remove("on")));
  }
  async function dt() {
    const tt = {
        skipped: !1,
        fns: new Set(),
        on(fe) {
          this.fns.add(fe);
        },
        off(fe) {
          this.fns.delete(fe);
        },
      },
      mt = a(".lab-skip", de);
    ((mt.onpointerdown = (fe) => fe.stopPropagation()),
      (mt.onclick = (fe) => {
        (fe.stopPropagation(), (tt.skipped = !0), (mt.disabled = !0), [...tt.fns].forEach((Oe) => Oe()));
      }));
    const Te = (fe) => {
      fe.key === "Escape" && !tt.skipped && (fe.preventDefault(), mt.click());
    };
    document.addEventListener("keydown", Te);
    for (const fe of $.slice(0, -1)) {
      if (tt.skipped) break;
      await Re(fe, tt);
    }
    (document.removeEventListener("keydown", Te), mt.remove());
    const At = B.S.trainer;
    (de.classList.add("asking"),
      await ce(a(".chen-text", de), e("Mais dis-moi… quel <b>personnage</b> te représente le mieux ?")));
    const yt = await new Promise((fe) => {
      const Oe =
        b(`<div class="lab-ask"><div class="lab-pick">${$e.map((_) => `<button class="lab-av" data-k="${_}"><img src="assets/trainers/${_}.png" alt=""></button>`).join("")}</div>
        <button class="btn primary lg lab-ok" disabled>${e("Valider")}</button></div>`);
      (de.appendChild(Oe),
        (Oe.onpointerdown = (_) => _.stopPropagation()),
        se() ||
          Oe.animate(
            [
              { opacity: 0, translate: "0 16px" },
              { opacity: 1, translate: "0 0" },
            ],
            { duration: 260, easing: "ease-out", fill: "both" },
          ));
      let Ee = null;
      const et = a(".lab-ok", Oe);
      (Oe.querySelectorAll(".lab-av").forEach(
        (_) =>
          (_.onclick = (we) => {
            (we.stopPropagation(),
              (Ee = _.dataset.k),
              Oe.querySelectorAll(".lab-av").forEach((ie) => ie.classList.toggle("on", ie === _)),
              (et.disabled = !1));
          }),
      ),
        (et.onclick = (_) => {
          (_.stopPropagation(), Ee && (Oe.remove(), fe(Ee)));
        }));
    });
    ((At.sprite = yt), B.save(), await ce(a(".chen-text", de), e("Et quel est ton <b>nom</b> ?")));
    const he = await new Promise((fe) => {
      const Oe = b(`<form class="lab-name"><img src="assets/trainers/${yt}.png" alt="">
        <input maxlength="${J}" value="${f(A(yt))}" aria-label="${e("Ton nom")}" autocomplete="off" spellcheck="false">
        <button class="btn primary lg">${e("Valider")}</button><small class="lab-err" hidden></small></form>`);
      de.appendChild(Oe);
      const Ee = a("input", Oe);
      ((Oe.onpointerdown = (_) => _.stopPropagation()), Ee.focus(), Ee.select());
      const et = a(".lab-err", Oe);
      ((Ee.oninput = () => {
        et.hidden = !0;
      }),
        (Oe.onsubmit = (_) => {
          _.preventDefault();
          const we = t.Names.check(Ee.value);
          if (we) {
            ((et.textContent = we), (et.hidden = !1), Ee.focus());
            return;
          }
          (Oe.remove(), fe(Ee.value.trim().slice(0, J)));
        }));
    });
    ((At.name = he),
      B.save(),
      de.classList.remove("asking"),
      await Re(e("<b>{name}</b> ! Ton aventure Pokémon va commencer !", { name: f(he) })),
      await Re($[$.length - 1]),
      de.classList.add("plain"),
      await H(se() ? 0 : 400));
  }
  function qe() {
    if (!de) return;
    let tt = !1;
    const mt = new MutationObserver(async () => {
      if (document.querySelector(".hatch-fx.gift, .lk-fx")) {
        tt = !0;
        return;
      }
      tt &&
        (mt.disconnect(),
        await de.animate([{ opacity: 1 }, { opacity: 0 }], { duration: se() ? 0 : 400, fill: "forwards" })
          .finished,
        de.remove(),
        (de = null));
    });
    mt.observe(document.body, { childList: !0, subtree: !0 });
  }
  async function ce(tt, mt, Te) {
    if (se() || Te?.skipped) {
      tt.innerHTML = mt;
      return;
    }
    const At = mt.split(/(<[^>]+>)/);
    let yt = !1;
    const he = () => {
      yt = !0;
    };
    (de.addEventListener("pointerdown", he, { once: !0 }), Te?.on(he));
    let fe = "";
    try {
      for (const Oe of At) {
        if (Oe.startsWith("<")) {
          fe += Oe;
          continue;
        }
        for (const Ee of Oe) {
          if (yt) return;
          ((fe += Ee), (tt.innerHTML = fe), await H(18));
        }
      }
    } finally {
      (de.removeEventListener("pointerdown", he), Te?.off(he), (tt.innerHTML = mt));
    }
  }
  return { show: oe, howTo: le };
})();
