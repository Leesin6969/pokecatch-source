/**
 * guide
 *
 * Public API on the game namespace `t`: t.Guide
 *
 * Recovered from the shipped bundle — original chunk #89 at byte 2589694 (19823 bytes, sha256:19d32ffeb53e8d16).
 * This file is one original source file; the build concatenates them in filename order.
 */
t.Guide = (function () {
  const { $: a, $$: b, h: f, modal: ue } = t.UI,
    H = "pokecatch-guide-seen",
    vt = () => {
      try {
        return new Set(JSON.parse(localStorage.getItem(H) || "[]"));
      } catch {
        return new Set();
      }
    },
    B = (le) => {
      try {
        localStorage.setItem(H, JSON.stringify([...le]));
      } catch {}
    },
    se = () => !vt().size,
    Ge = () => !!t.Raids?.drawing?.(),
    Je = () => [
      [
        e("Les bases"),
        [
          {
            id: "adv",
            ic: "ui/town-map.png",
            tab: "adventure",
            name: e("Aventure"),
            c: "var(--red)",
            scene: "01-prairie-ouverte",
            mons: [25, 16],
            eyebrow: e("Le cœur du jeu"),
            tag: e("Ton équipe avance toute seule, même quand tu es absent."),
            intro: e(
              "Ton équipe combat les Pokémon sauvages et les dresseurs de chaque route, chapitre après chapitre. Les arènes bloquent la suite tant que ton équipe n'est pas assez forte. Jeu fermé, elle continue jusqu'à 8 h, raids et zones légendaires compris, avec deux fois moins d'XP de combat et 12 niveaux au plus par Pokémon ; la fenêtre « Bon retour ! » résume ton absence. Tous les Pokémon croisés sont capturables, même ceux qui semblent s'enfuir au début, et les fossiles revivent tout seuls à un moment de l'aventure.",
            ),
            facts: [
              [e("Rythme"), e("1 combat / 2,8 s")],
              [e("Hors ligne"), e("Jusqu'à 8 h")],
              [e("Débloqué"), e("Dès le départ")],
            ],
            steps: [
              e("Choisis un chapitre dans la liste à gauche."),
              e("Ton équipe y combat et capture en continu. Les attaques sont choisies seules."),
              e("Bats le champion d'arène pour ouvrir le chapitre suivant."),
              e(
                "Touche le bouton de boucle d'un ou de plusieurs chapitres : ils se rejouent en boucle, l'un après l'autre.",
              ),
            ],
            tip: e(
              "Certains Pokémon ne sortent que de nuit (20 h - 8 h, à ton heure), par une météo ou à marée basse : touche la pastille météo de la scène pour voir les <b>24 prochaines heures</b>.",
            ),
          },
          {
            id: "catch",
            ic: "items/poke-ball.png",
            tab: "adventure",
            name: e("Capture"),
            c: "var(--green)",
            scene: "17-safari-prairie",
            mons: [115, 123],
            eyebrow: e("Attrape-les tous"),
            tag: e("Chaque Pokémon sauvage mis K.O. reçoit une Poké Ball."),
            intro: e(
              "Pas de Balls à acheter : chaque Pokémon sauvage mis K.O. reçoit un lancer. Les chances suivent celles des jeux officiels, 60 % au plus, et la Ball affichée ne change rien. Un chromatique n'est pas plus dur à attraper qu'un autre ; un légendaire, beaucoup plus. Les baies de capture augmentent les chances pendant 1 h.",
            ),
            facts: [
              [e("Lancer de Ball"), e("1 par K.O.")],
              [e("Chances"), e("60 % au plus")],
              [e("Balls"), e("Cosmétiques")],
            ],
            steps: [
              e("Ton équipe met le Pokémon sauvage K.O."),
              e("Une Ball part toute seule : capturé, ou il s'enfuit."),
              e("Espèce nouvelle : elle rejoint ton PC. Déjà possédée : elle devient de l'XP de famille."),
            ],
            tip: e(
              "Un doublon vaut l'équivalent de <b>3 niveaux d'XP</b>, partagés entre les membres de sa famille que tu possèdes (équipe, PC, Pension), perdus s'ils sont tous au niveau max. Avec « Garder les doublons », il est gardé tant que la famille a de la place, puis devient de l'XP lui aussi. Un chromatique est toujours gardé tant que sa famille a de la place.",
            ),
          },
          {
            id: "shiny",
            ic: "shiny",
            tab: "pokedex",
            name: e("Chromatiques"),
            c: "var(--gold-soft)",
            scene: "20-iles-ecume-v2",
            mons: ["shiny/129", "shiny/6"],
            eyebrow: e("Les plus rares"),
            tag: e("Des couleurs à part et +10 % sur toutes leurs stats."),
            intro: e(
              "Un chromatique a des couleurs à part et +10 % sur toutes ses stats, en doré sur sa fiche. Il n'est pas plus dur à capturer qu'un autre. Chromatique et normal comptent comme deux Pokémon différents : tu peux avoir un exemplaire de chaque, et un chromatique est gardé tant que sa famille a de la place chez les chromatiques, sans interrupteur à activer. En revanche, une équipe n'en prend qu'un chromatique par espèce.",
            ),
            facts: [
              [e("Aventure"), e("≈ 1 / 4 000")],
              [e("Pension"), e("1 / 512")],
              [e("Raids"), Ge() ? e("1 / jour") : e("1 / jour / région")],
            ],
            steps: [
              e(
                "Complète le Pokédex d'une région, légendaires et fabuleux compris : les chances des Pokémon sauvages y sont doublées, pas celles des œufs. Le bonus ne se cumule pas d'une région à l'autre.",
              ),
              e("À la Pension, un parent chromatique pond un œuf chromatique une fois sur 10."),
              e("La Baie Frista double les chances des Pokémon sauvages pendant 1 h."),
              Ge()
                ? e(
                    "Les raids chromatiques donnent un boss chromatique par jour, dans une région tirée pour toi.",
                  )
                : e("Les raids chromatiques donnent un boss chromatique par région et par jour."),
            ],
            tip: e(
              "Pas de légendaire chromatique pour le moment. Un chromatique capturé pendant ton absence a son trophée dans la fenêtre « Bon retour ! ».",
            ),
          },
          {
            id: "team",
            ic: "ui/box-link.png",
            tab: "team",
            name: e("Équipe & PC"),
            c: "var(--blue)",
            scene: "50-centre-pokemon-v2",
            mons: [1, 4, 7],
            eyebrow: e("Tes Pokémon"),
            tag: e("6 Pokémon en équipe, tous les autres au PC."),
            intro: e(
              "Glisse un Pokémon du PC vers une case d'équipe pour l'envoyer combattre. Les Pokémon au PC ne combattent pas, mais l'XP de famille les fait monter aussi : un doublon devient de l'XP pour toute sa famille, sauf si tu actives « Garder les doublons » sur sa fiche.",
            ),
            facts: [
              [e("Équipe"), e("6 places")],
              [e("PC"), e("Illimité")],
              [e("Débloqué"), e("Dès le départ")],
            ],
            steps: [
              e("Glisse un Pokémon du PC sur une case d'équipe (appui long sur téléphone)."),
              e("Touche un Pokémon pour ouvrir sa fiche."),
              e(
                "Sur sa fiche, donne-lui des Bonbons Exp. : reste appuyé sur le bouton pour en donner plusieurs.",
              ),
            ],
            tip: e(
              "Ton <b>copain</b> (la Poké Ball grisée de sa fiche) gagne +30 % d'XP et de l'XP pour sa famille au fil des K.O. de ton équipe.",
            ),
          },
          {
            id: "dex",
            ic: "ui/pokedex-red.png",
            tab: "pokedex",
            name: e("Pokédex"),
            c: "var(--red)",
            scene: "51-labo-cramois",
            mons: [137],
            eyebrow: e("Collection"),
            tag: e("Chaque espèce vue ou capturée, et où la trouver."),
            intro: e(
              "Le Pokédex recense les espèces de chaque région. Une fiche dit comment obtenir l'espèce : zone, heure, météo, cadeau, fossile, œuf, zone légendaire ou Pokémon errant. Dans une nouvelle région, tant que sa Ligue n'est pas gagnée, les Pokédex des régions précédentes sont temporairement indisponibles.",
            ),
            facts: [
              [e("Espèces"), e("151 + …")],
              [e("Fiche"), e("Lieux, heure, météo")],
              [e("Débloqué"), e("Dès le départ")],
            ],
            steps: [
              e("Touche une espèce pour ouvrir sa fiche."),
              e("« Où le trouver » dit comment l'obtenir."),
              e("Légendaire capturé : « Revoir son apparition » rejoue sa cinématique."),
            ],
            tip: e(
              "Capture chaque espèce d'une région, légendaires et fabuleux compris : les chances de <b>chromatique</b> y sont doublées. Une pastille indique combien il en manque.",
            ),
          },
          {
            id: "league",
            ic: "ui/versus.png",
            tab: "map",
            name: e("Ligue & régions"),
            c: "var(--blue)",
            scene: "38-maitre-blue",
            mons: [149, 130],
            eyebrow: e("Fin de région"),
            tag: e("Bats la Ligue pour relier les régions."),
            intro: e(
              "Chaque région se termine par sa Ligue : quatre membres puis le Maître, à la suite. Le plafond de niveau de ton équipe monte à chaque membre battu, la difficulté aussi, et le Maître est le combat le plus dur. Une défaite te renvoie au premier membre ; un membre déjà battu rapporte la moitié de sa récompense tant que la Ligue n'est pas gagnée.",
            ),
            facts: [
              [e("Membres"), e("4 + le Maître")],
              [e("Défaite"), e("Retour au 1er")],
              [e("Plafond"), e("Monte par membre")],
            ],
            steps: [
              e(
                "Dans une nouvelle région, seuls les Pokémon capturés sur place combattent, zones légendaires comprises. L'ancienne région reste jouable avec tous ses Pokémon.",
              ),
              e(
                "Tant que la Ligue de la nouvelle région n'est pas gagnée, les Pokédex des régions précédentes sont temporairement indisponibles.",
              ),
              e(
                "Gagne sa Ligue : les régions se relient. Argent et objets s'additionnent, et les doublons fusionnent.",
              ),
            ],
            tip: e(
              "Pas besoin de finir le Pokédex avant de changer de région : les <b>nouvelles régions</b> débloquent des choses qui t'aideront.",
            ),
          },
          {
            id: "berry",
            ic: "items/razz-berry.png",
            tab: "adventure",
            name: e("Baies bonus"),
            c: "var(--yellow)",
            scene: "04-berge-riviere",
            mons: [102, 103],
            eyebrow: e("Coups de pouce"),
            tag: e("Une heure de bonus : capture, XP, argent, chromatiques…"),
            intro: e(
              "Mange une baie depuis le Sac pour un bonus d'une heure dans l'aventure, qui continue pendant ton absence. Une seule baie active par effet : une autre baie du même effet remplace l'active, la même relance son heure. Les bonus ne s'additionnent jamais.",
            ),
            facts: [
              [e("Durée"), e("1 h")],
              [e("Active"), e("1 par effet")],
              [e("Hors ligne"), e("Le temps court")],
            ],
            steps: [
              e("Framby (×1,25) et Framby dorée (×1,5) : chances de capture, légendaires et raids compris."),
              e(
                "Nanab : espèces rares de la zone ×2. Enigma : espèces jamais capturées dans la région ×3. Frista : chromatiques sauvages ×2.",
              ),
              e("Nanana : +25 % d'XP de combat. Lansat : +25 % de ₽."),
            ],
            tip: e(
              "Les baies actives s'affichent à droite de la scène, avec leur minuteur. On en trouve en arrivant dans les villes et au <b>pachinko</b> du Casino.",
            ),
          },
        ],
      ],
      [
        e("Activités"),
        [
          {
            id: "pen",
            ic: "items/mystery-egg.png",
            tab: "pension",
            name: e("Pension"),
            c: "var(--pink)",
            scene: "39-bourg-palette",
            mons: [113, 132],
            eyebrow: e("Soins & œufs"),
            tag: e("Tes Pokémon y gagnent de l’XP et y pondent des œufs."),
            intro: e(
              "Chaque Pokémon placé à la Pension rapporte de l'XP à sa famille, même pendant ton absence. Avec un Métamorph, elle pond aussi des œufs de la famille d'un de tes pensionnaires. La 1re place est offerte, les autres s'achètent : 15 000 ₽, puis 150 000 ₽ après la Ligue de Kanto, puis 600 000 ₽ après celle de Johto.",
            ),
            facts: [
              [e("Places"), e("1 à 4")],
              [e("Éclosion"), e("4 h")],
              [e("Débloqué"), e("Dès le départ")],
            ],
            steps: [
              e("Place des Pokémon du PC, et un Métamorph pour avoir des œufs."),
              e("Donne-leur des baies pour remplir la jauge d'œuf plus vite."),
              e("L'œuf éclot en 4 h dans l'incubateur, temps d'absence compris."),
            ],
            tip: e(
              "Un parent <b>chromatique</b> pond un œuf chromatique une fois sur 10, sauf Métamorph : un Métamorph chromatique n'augmente pas les chances. Surprise à l'éclosion : rien ne le montre avant.",
            ),
          },
          {
            id: "trade",
            ic: "ui/link-cable.svg",
            tab: "trade",
            name: e("Échanges"),
            c: "var(--trade)",
            scene: "43-carmin-port",
            mons: [63, 64],
            eyebrow: e("Entre dresseurs"),
            tag: e("Échange tes doublons avec les autres joueurs."),
            intro: e(
              "Propose un Pokémon contre l'espèce que tu cherches, de même rareté. Tant que tes régions sont séparées, les deux espèces viennent de la même région. Un chromatique ne s'échange que contre un chromatique, et les légendaires jamais. Certaines espèces évoluent à l'échange. Publier une offre coûte 30 000 ₽ pour un commun, 120 000 ₽ pour un peu commun et 450 000 ₽ pour un rare, cinq fois plus pour un chromatique.",
            ),
            facts: [
              [e("Frais"), e("Dès 30 000 ₽")],
              [e("Durée"), e("3 jours")],
              [e("Débloqué"), e("Dès le départ")],
            ],
            steps: [
              e("Choisis le Pokémon à donner et l'espèce cherchée."),
              e("Publie l'offre (option « Amis seulement ») ou accepte celle d'un autre joueur."),
              e("Le Pokémon reçu garde le niveau de celui que tu donnes."),
            ],
            tip: e("Demande « <b>n'importe quel chromatique</b> » de même rareté : surprise à l'arrivée."),
          },
          {
            id: "shop",
            ic: "ui/pokemart.png",
            tab: "shop",
            name: e("Boutique"),
            c: "var(--shop)",
            scene: "60-boutique-pokemon",
            mons: [52],
            eyebrow: e("Objets"),
            tag: e("Bonbons Exp. et objets d’évolution."),
            intro: e(
              "Dépense tes ₽ en Bonbons Exp. et en objets d'évolution. Un objet trouvé dans l'aventure y est ensuite en vente.",
            ),
            facts: [
              [e("Monnaie"), e("₽")],
              [e("Stock"), e("Selon tes trouvailles")],
              [e("Débloqué"), e("Dès le départ")],
            ],
            steps: [e("Choisis un objet."), e("Règle la quantité."), e("Il part directement dans ton Sac.")],
            tip: e(
              "Il te manque une pierre ? Continue l'aventure : une fois trouvée, elle arrive en Boutique.",
            ),
          },
          {
            id: "casino",
            ic: "ui/coin-case.png",
            tab: "casino",
            name: e("Casino"),
            c: "var(--casino)",
            scene: "55-casino-celadopole",
            mons: [100, 81],
            eyebrow: e("Jetons & lots"),
            tag: e("Machine à sous, pachinko et lots rares."),
            intro: e(
              "Change tes ₽ en jetons à la machine à sous, puis tente ta chance au pachinko pour gagner des baies, des bonbons et des pierres. Chaque région a son Casino et ses lots.",
            ),
            facts: [
              [e("Monnaie"), e("Jetons")],
              [e("Lots"), e("Par région")],
              [e("Pachinko"), e("Après la 1re Ligue")],
            ],
            steps: [
              e("Joue à la machine à sous : mise ×1, ×5, ×10 ou ×50, ou mode Auto."),
              e("Mise tes jetons au pachinko."),
              e("Échange-les contre les lots de l'onglet Boutique."),
            ],
            tip: e(
              "Les dresseurs ne donnent pas de jetons : seule la <b>machine à sous</b> en rapporte. Une Ligue gagnée ouvre les lots des Casinos des régions précédentes.",
            ),
          },
          {
            id: "under",
            ic: "ui/explorer-kit.png",
            tab: "underground",
            name: e("Souterrain"),
            c: "var(--under)",
            scene: "sinnoh-souterrains-sinnoh",
            mons: [50, 74],
            eyebrow: e("Expéditions"),
            tag: e("Envoie 3 Pokémon explorer les étages."),
            intro: e(
              "Une expédition descend étage après étage jusqu'à ce que ton équipe tombe ou que tu la rappelles. À chaque étage, un mur à creuser ; tous les 10 étages, un gardien deux fois plus fort. Chaque expédition a son thème : tous ses adversaires sont de ses types, choisis des Pokémon efficaces contre eux.",
            ),
            facts: [
              [e("Équipe"), e("3 Pokémon")],
              [e("Par jour"), e("6 expéditions")],
              [e("Débloqué"), e("Badge Forêt")],
            ],
            steps: [
              e("Choisis 3 Pokémon pour un emplacement : chacun part une fois par jour."),
              e("L'expédition continue sans toi : suis-la étage par étage ou reviens plus tard."),
              e("Récupère tes Pokémon avec leur XP, des Éclats et des géodes."),
            ],
            tip: e(
              "Casse les <b>géodes</b> pour trouver des gemmes. Depuis le PC, les gemmes font monter le <b>rang</b> d'un Pokémon au niveau 100 : +15 % de stats par rang, jusqu'au rang V, et il repart du niveau 5.",
            ),
          },
        ],
      ],
      [
        e("Défis"),
        [
          {
            id: "raid",
            ic: "ui/shiny-charm.png",
            tab: "raid",
            name: e("Raids"),
            c: "var(--raid)",
            scene: "33-arene-giovanni",
            mons: [143],
            eyebrow: e("Un boss par jour"),
            tag: Ge()
              ? e("Un boss chromatique tiré pour toi, chaque jour.")
              : e("Un boss chromatique par région, chaque jour."),
            intro: Ge()
              ? e(
                  "Chaque jour, touche la bannière des raids : une région est tirée pour toi parmi celles dont tu as gagné la Ligue, et son boss chromatique t'attend. Mets-le K.O., puis lance des Poké Balls : chacune a 1 % de chances de le capturer, sans limite d'essais. Ton temps compte pour le classement.",
                )
              : e(
                  "Chaque jour, un boss chromatique attend dans chaque région. Mets-le K.O., puis lance des Poké Balls : chacune a 1 % de chances de le capturer, sans limite d'essais. Ton temps compte pour le classement.",
                ),
            facts: [
              [e("Fréquence"), Ge() ? e("1 / jour") : e("1 / jour / région")],
              [e("Récompense"), e("Le boss ✨ (niv. 5)")],
              [e("Débloqué"), e("Ligue de Kanto")],
            ],
            steps: [
              e("Choisis l'équipe (« Optimiser » prend les meilleurs contre le boss)."),
              e("Lance le raid : le chrono démarre."),
              e("Boss K.O. : lance des Poké Balls jusqu'à la capture."),
            ],
            tip: Ge()
              ? e(
                  "Chaque Poké Ball ratée remplit la <b>jauge Master Ball</b>. Elle repart de zéro chaque jour : au {n}e essai de la journée, la capture est garantie.",
                  { n: t.CONFIG.RAID.PITY },
                )
              : e(
                  "Chaque Poké Ball ratée remplit la <b>jauge Master Ball</b> de la région. Elle repart de zéro chaque jour : au {n}e essai de la journée, la capture est garantie.",
                  { n: t.CONFIG.RAID.PITY },
                ),
          },
          {
            id: "tower",
            ic: "ui/vs-recorder.png",
            tab: "raid",
            unlocked: () => !!t.Tower?.unlocked(),
            name: e("Tour de Combat"),
            c: "var(--trophy)",
            scene: "24-route-victoire",
            mons: [66, 106, 107],
            eyebrow: e("Chaque semaine"),
            tag: e("Monte le plus haut possible, étage par étage."),
            intro: e(
              "Chaque étage oppose tes Pokémon à un dresseur plus fort. Pas d'équipe à choisir : ton PC monte, Pension exceptée, du plus fort au plus faible, à son vrai niveau (100 au plus). Un Pokémon à plus de {n} niveaux sous les adversaires de l'étage reste au repos : la run s'arrête quand plus personne n'est à leur niveau. Ce sont des copies : tes Pokémon ne gagnent pas d'XP et ne sont pas blessés. Ton étage le plus haut de la semaine donne les récompenses du lundi.",
              { n: t.CONFIG.TOWER.MARGIN },
            ),
            facts: [
              [e("Remise à zéro"), e("Lundi")],
              [e("Récompenses"), e("Par étage")],
              [e("Débloqué"), e("3e Ligue")],
            ],
            steps: [
              e("Lance la montée : les 6 plus forts de ton PC combattent."),
              e(
                "Pas de soin entre les étages : un Pokémon K.O. le reste jusqu'à la fin de la semaine, et le plus fort suivant prend sa place.",
              ),
              e(
                "Un seul chromatique par espèce monte. Tu peux t'arrêter et reprendre : ton meilleur étage est gardé.",
              ),
              e("Les récompenses arrivent le lundi, selon ton meilleur étage."),
            ],
            tip: e(
              "Tous les 10 étages, le thème change (deux types) et une <b>Tête de la Zone de Combat</b> t'attend.",
            ),
          },
        ],
      ],
    ],
    Ze = (le) => `assets/pokemon/${le}.png`,
    x = (le) => (le === "shiny" ? '<i class="shiny-ico"></i>' : `<img src="assets/${le}" alt="">`),
    $ = (le) => document.querySelector(`#tabs [data-screen="${le.tab}"]`),
    X = (le) => (le.unlocked ? !le.unlocked() : !$(le) || $(le).classList.contains("locked"));
  function Tt() {
    const le = Je(),
      P = le.flatMap((De) => De[1]),
      u = vt();
    let ve = 0;
    const it = f(`<div class="gd-in">
      <div class="dc-head"><img class="gd-head-ic" src="assets/items/adventure-guide.png" alt=""><h2>${e("Guide")}</h2><div class="dc-sum"><span class="gd-read"></span><button class="dc-x" aria-label="${e("Fermer")}">✕</button></div></div>
      <div class="gd-wrap"><nav class="gd-nav"></nav><div class="gd-page"></div></div>
      <div class="gd-foot">
        <button class="btn ghost gd-prev" aria-label="${e("Précédent")}">‹<span class="gd-pl"> ${e("Précédent")}</span></button>
        <div class="gd-dots"></div>
        <button class="btn ghost gd-next" aria-label="${e("Suivant")}"><span class="gd-pl">${e("Suivant")} </span>›</button>
        <button class="btn primary gd-go">${e("Y aller")}</button>
      </div></div>`);
    return ue({
      className: "dexcard-modal gd-modal",
      body: it,
      onOpen: (De, je, pt) => {
        const re = a(".gd-nav", it),
          We = a(".gd-page", it);
        function oe() {
          ((re.innerHTML = le
            .map(
              ([J, de]) =>
                `<div class="gd-grp">${J}</div>` +
                de
                  .map((_e) => {
                    const Re = P.indexOf(_e),
                      dt = X(_e);
                    return `<button class="gd-item${Re === ve ? " on" : ""}${dt ? " lock" : ""}" data-i="${Re}" style="--ic:${_e.c}">
            <span class="gd-ic">${x(_e.ic)}</span><span class="gd-lbl">${_e.name}</span>
            ${dt ? `<span class="gd-lk">${t.UI.lockIc}</span>` : u.has(_e.id) ? "" : '<span class="gd-new">NEW</span>'}</button>`;
                  })
                  .join(""),
            )
            .join("")),
            b(".gd-item", re).forEach((J) => {
              J.onclick = () => $e(+J.dataset.i);
            }),
            a(".on", re)?.scrollIntoView({ block: "nearest", inline: "nearest" }));
        }
        function $e(J) {
          ve = J;
          const de = P[J],
            _e = X(de);
          (_e || (u.add(de.id), B(u)),
            De.style.setProperty("--c", _e ? "var(--muted)" : de.c),
            (We.innerHTML = `
          <div class="gd-banner${_e ? " lock" : ""}" style="background-image:url(assets/bg/scenes/${de.scene}-710x400.webp)">
            <div class="gd-btxt"><div class="gd-eyebrow">${de.eyebrow}</div><h3>${de.name}</h3><p>${_e ? e("Plus loin dans l'aventure") : de.tag}</p></div>
            <div class="gd-mons">${de.mons.map((Re) => `<img src="${Ze(Re)}" alt="">`).join("")}</div>
            ${_e ? `<div class="gd-lockbadge">${t.UI.lockIc}</div>` : ""}
          </div>
          ${
            _e
              ? `<p class="gd-intro">${e("Cette fonctionnalité s'ouvre plus loin dans l'aventure. Continue à collectionner les badges !")}</p>`
              : `
          <p class="gd-intro">${de.intro}</p>
          <div class="dc-facts">${de.facts.map(([Re, dt]) => `<div class="dc-fact">${Re}<b>${dt}</b></div>`).join("")}</div>
          <div class="gd-sec"><h4>${e("Comment ça marche")}</h4><ol class="gd-steps">${de.steps.map((Re) => `<li>${Re}</li>`).join("")}</ol></div>
          ${de.tip ? `<div class="gd-sec"><h4>${e("Astuce")}</h4><div class="gd-tip">💡<span>${de.tip}</span></div></div>` : ""}`
          }`),
            (We.scrollTop = 0),
            (a(".gd-dots", it).innerHTML = P.map((Re, dt) => `<i class="${dt === J ? "on" : ""}"></i>`).join(
              "",
            )),
            (a(".gd-prev", it).disabled = J === 0),
            (a(".gd-next", it).disabled = J === P.length - 1),
            (a(".gd-go", it).hidden = _e),
            (a(".gd-read", it).innerHTML = e("<b>{n}</b> / {total} lus", {
              n: P.filter((Re) => u.has(Re.id)).length,
              total: P.length,
            })),
            oe());
        }
        ((a(".dc-x", it).onclick = () => je(null)),
          (a(".gd-prev", it).onclick = () => $e(Math.max(0, ve - 1))),
          (a(".gd-next", it).onclick = () => $e(Math.min(P.length - 1, ve + 1))),
          (a(".gd-go", it).onclick = () => {
            const J = $(P[ve]);
            (je(null), J?.click());
          }),
          document.addEventListener(
            "keydown",
            (J) => {
              (J.key === "ArrowLeft" && $e(Math.max(0, ve - 1)),
                J.key === "ArrowRight" && $e(Math.min(P.length - 1, ve + 1)));
            },
            { signal: pt },
          ));
        const Z = () => De.classList.toggle("narrow", De.offsetWidth < 600);
        Z();
        const A = new ResizeObserver(Z);
        (A.observe(De), pt.addEventListener("abort", () => A.disconnect()), $e(0));
      },
    });
  }
  return (
    document.addEventListener("click", (le) => {
      le.target.closest?.("#guide-btn") && Tt();
    }),
    { open: Tt, isNew: se }
  );
})();
