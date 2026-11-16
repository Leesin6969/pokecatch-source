/**
 * Module namespace prelude — read this first.
 *
 * Public API on the game namespace `t`: t (Proxy)
 *
 * Declares one slot per module, the timer/animation-frame wrappers bound to the real window, and the `t` namespace proxy that every other file writes to. Keep this file first.
 *
 * Recovered from the shipped bundle — original chunk #prelude at byte 12 (10721 bytes, sha256:6951204376d4cbf3).
 * This file is one original source file; the build concatenates them in filename order.
 */
var Oo,
  Io,
  Do,
  jo,
  No,
  Bo,
  zo,
  Fo,
  _o,
  Uo,
  Go,
  Ho,
  Xo,
  Vo,
  Yo,
  Wo,
  Ko,
  Zo,
  Jo,
  Qo,
  er,
  tr,
  ar,
  nr,
  sr,
  or,
  rr,
  ir,
  lr,
  cr,
  dr,
  ur,
  Co,
  pr,
  mr,
  fr,
  hr,
  gr,
  yr,
  br,
  kr,
  wr,
  vr,
  xr,
  Mr,
  Sr,
  $r,
  Er,
  Pr,
  Cr,
  Rr,
  Tr,
  Ar,
  Lr,
  qr,
  Or,
  Ir,
  Dr,
  jr,
  Nr,
  Is,
  Br,
  zr,
  Fr,
  _r,
  Ur,
  Gr,
  Vs,
  Hr,
  Xr,
  Vr,
  Yr,
  Wr,
  Kr,
  Zr,
  Jr,
  e,
  Sa = null,
  ri = function (a, b) {
    !b ||
      typeof b != "object" ||
      Array.isArray(b) ||
      Object.isFrozen(b) ||
      b instanceof Node ||
      Object.getOwnPropertyNames(b).forEach(function (f) {
        var ue = Object.getOwnPropertyDescriptor(b, f);
        if (!(!ue.configurable || typeof ue.value != "function")) {
          var H = ue.value;
          Object.defineProperty(b, f, {
            enumerable: ue.enumerable,
            configurable: !1,
            get: function () {
              return H;
            },
            set: function () {
              console.warn("Poke'Catch: " + a + "." + f + " is locked");
            },
          });
        }
      });
  },
  ko = {
    get Adventure() {
      return Sa ? Sa.Adventure : Oo;
    },
    set Adventure(a) {
      Sa ? console.warn("Poke'Catch: Adventure is locked") : (Oo = a);
    },
    get App() {
      return Sa ? Sa.App : Io;
    },
    set App(a) {
      Sa ? console.warn("Poke'Catch: App is locked") : (Io = a);
    },
    get BASE_EXP() {
      return Sa ? Sa.BASE_EXP : Do;
    },
    set BASE_EXP(a) {
      Sa ? console.warn("Poke'Catch: BASE_EXP is locked") : (Do = a);
    },
    get BadgeShine() {
      return Sa ? Sa.BadgeShine : jo;
    },
    set BadgeShine(a) {
      Sa ? console.warn("Poke'Catch: BadgeShine is locked") : (jo = a);
    },
    get BattleFX() {
      return Sa ? Sa.BattleFX : No;
    },
    set BattleFX(a) {
      Sa ? console.warn("Poke'Catch: BattleFX is locked") : (No = a);
    },
    get BerryBites() {
      return Sa ? Sa.BerryBites : Bo;
    },
    set BerryBites(a) {
      Sa ? console.warn("Poke'Catch: BerryBites is locked") : (Bo = a);
    },
    get BerryFX() {
      return Sa ? Sa.BerryFX : zo;
    },
    set BerryFX(a) {
      Sa ? console.warn("Poke'Catch: BerryFX is locked") : (zo = a);
    },
    get CHANGELOG() {
      return Sa ? Sa.CHANGELOG : Fo;
    },
    set CHANGELOG(a) {
      Sa ? console.warn("Poke'Catch: CHANGELOG is locked") : (Fo = a);
    },
    get CONFIG() {
      return Sa ? Sa.CONFIG : _o;
    },
    set CONFIG(a) {
      Sa ? console.warn("Poke'Catch: CONFIG is locked") : (_o = a);
    },
    get CandyRun() {
      return Sa ? Sa.CandyRun : Uo;
    },
    set CandyRun(a) {
      Sa ? console.warn("Poke'Catch: CandyRun is locked") : (Uo = a);
    },
    get CaptureFX() {
      return Sa ? Sa.CaptureFX : Go;
    },
    set CaptureFX(a) {
      Sa ? console.warn("Poke'Catch: CaptureFX is locked") : (Go = a);
    },
    get CatchUp() {
      return Sa ? Sa.CatchUp : Ho;
    },
    set CatchUp(a) {
      Sa ? console.warn("Poke'Catch: CatchUp is locked") : (Ho = a);
    },
    get Changelog() {
      return Sa ? Sa.Changelog : Xo;
    },
    set Changelog(a) {
      Sa ? console.warn("Poke'Catch: Changelog is locked") : (Xo = a);
    },
    get Clock() {
      return Sa ? Sa.Clock : Vo;
    },
    set Clock(a) {
      Sa ? console.warn("Poke'Catch: Clock is locked") : (Vo = a);
    },
    get Cloud() {
      return Sa ? Sa.Cloud : Yo;
    },
    set Cloud(a) {
      Sa ? console.warn("Poke'Catch: Cloud is locked") : (Yo = a);
    },
    get DAYTIME() {
      return Sa ? Sa.DAYTIME : Wo;
    },
    set DAYTIME(a) {
      Sa ? console.warn("Poke'Catch: DAYTIME is locked") : (Wo = a);
    },
    get ENCOUNTERS() {
      return Sa ? Sa.ENCOUNTERS : Ko;
    },
    set ENCOUNTERS(a) {
      Sa ? console.warn("Poke'Catch: ENCOUNTERS is locked") : (Ko = a);
    },
    get EVOLUTIONS() {
      return Sa ? Sa.EVOLUTIONS : Zo;
    },
    set EVOLUTIONS(a) {
      Sa ? console.warn("Poke'Catch: EVOLUTIONS is locked") : (Zo = a);
    },
    get EliteFrames() {
      return Sa ? Sa.EliteFrames : Jo;
    },
    set EliteFrames(a) {
      Sa ? console.warn("Poke'Catch: EliteFrames is locked") : (Jo = a);
    },
    get EventTeam() {
      return Sa ? Sa.EventTeam : Qo;
    },
    set EventTeam(a) {
      Sa ? console.warn("Poke'Catch: EventTeam is locked") : (Qo = a);
    },
    get EventUI() {
      return Sa ? Sa.EventUI : er;
    },
    set EventUI(a) {
      Sa ? console.warn("Poke'Catch: EventUI is locked") : (er = a);
    },
    get Events() {
      return Sa ? Sa.Events : tr;
    },
    set Events(a) {
      Sa ? console.warn("Poke'Catch: Events is locked") : (tr = a);
    },
    get FORMS() {
      return Sa ? Sa.FORMS : ar;
    },
    set FORMS(a) {
      Sa ? console.warn("Poke'Catch: FORMS is locked") : (ar = a);
    },
    get FX_MOVES() {
      return Sa ? Sa.FX_MOVES : nr;
    },
    set FX_MOVES(a) {
      Sa ? console.warn("Poke'Catch: FX_MOVES is locked") : (nr = a);
    },
    get Frames() {
      return Sa ? Sa.Frames : sr;
    },
    set Frames(a) {
      Sa ? console.warn("Poke'Catch: Frames is locked") : (sr = a);
    },
    get Game() {
      return Sa ? Sa.Game : or;
    },
    set Game(a) {
      Sa ? console.warn("Poke'Catch: Game is locked") : (or = a);
    },
    get GeodeFx() {
      return Sa ? Sa.GeodeFx : rr;
    },
    set GeodeFx(a) {
      Sa ? console.warn("Poke'Catch: GeodeFx is locked") : (rr = a);
    },
    get GiftFx() {
      return Sa ? Sa.GiftFx : ir;
    },
    set GiftFx(a) {
      Sa ? console.warn("Poke'Catch: GiftFx is locked") : (ir = a);
    },
    get Gifts() {
      return Sa ? Sa.Gifts : lr;
    },
    set Gifts(a) {
      Sa ? console.warn("Poke'Catch: Gifts is locked") : (lr = a);
    },
    get Guide() {
      return Sa ? Sa.Guide : cr;
    },
    set Guide(a) {
      Sa ? console.warn("Poke'Catch: Guide is locked") : (cr = a);
    },
    get HABITATS() {
      return Sa ? Sa.HABITATS : dr;
    },
    set HABITATS(a) {
      Sa ? console.warn("Poke'Catch: HABITATS is locked") : (dr = a);
    },
    get HealFX() {
      return Sa ? Sa.HealFX : ur;
    },
    set HealFX(a) {
      Sa ? console.warn("Poke'Catch: HealFX is locked") : (ur = a);
    },
    get I18n() {
      return Sa ? Sa.I18n : Co;
    },
    set I18n(a) {
      Sa ? console.warn("Poke'Catch: I18n is locked") : (Co = a);
    },
    get ITEM_NAMES() {
      return Sa ? Sa.ITEM_NAMES : pr;
    },
    set ITEM_NAMES(a) {
      Sa ? console.warn("Poke'Catch: ITEM_NAMES is locked") : (pr = a);
    },
    get ItemFX() {
      return Sa ? Sa.ItemFX : mr;
    },
    set ItemFX(a) {
      Sa ? console.warn("Poke'Catch: ItemFX is locked") : (mr = a);
    },
    get LEAGUE_TEAMS() {
      return Sa ? Sa.LEAGUE_TEAMS : fr;
    },
    set LEAGUE_TEAMS(a) {
      Sa ? console.warn("Poke'Catch: LEAGUE_TEAMS is locked") : (fr = a);
    },
    get LegendZones() {
      return Sa ? Sa.LegendZones : hr;
    },
    set LegendZones(a) {
      Sa ? console.warn("Poke'Catch: LegendZones is locked") : (hr = a);
    },
    get LinkFx() {
      return Sa ? Sa.LinkFx : gr;
    },
    set LinkFx(a) {
      Sa ? console.warn("Poke'Catch: LinkFx is locked") : (gr = a);
    },
    get MOVES() {
      return Sa ? Sa.MOVES : yr;
    },
    set MOVES(a) {
      Sa ? console.warn("Poke'Catch: MOVES is locked") : (yr = a);
    },
    get Music() {
      return Sa ? Sa.Music : br;
    },
    set Music(a) {
      Sa ? console.warn("Poke'Catch: Music is locked") : (br = a);
    },
    get Names() {
      return Sa ? Sa.Names : kr;
    },
    set Names(a) {
      Sa ? console.warn("Poke'Catch: Names is locked") : (kr = a);
    },
    get News() {
      return Sa ? Sa.News : wr;
    },
    set News(a) {
      Sa ? console.warn("Poke'Catch: News is locked") : (wr = a);
    },
    get Options() {
      return Sa ? Sa.Options : vr;
    },
    set Options(a) {
      Sa ? console.warn("Poke'Catch: Options is locked") : (vr = a);
    },
    get POKEDEX() {
      return Sa ? Sa.POKEDEX : xr;
    },
    set POKEDEX(a) {
      Sa ? console.warn("Poke'Catch: POKEDEX is locked") : (xr = a);
    },
    get PensionBerryFX() {
      return Sa ? Sa.PensionBerryFX : Mr;
    },
    set PensionBerryFX(a) {
      Sa ? console.warn("Poke'Catch: PensionBerryFX is locked") : (Mr = a);
    },
    get Perf() {
      return Sa ? Sa.Perf : Sr;
    },
    set Perf(a) {
      Sa ? console.warn("Poke'Catch: Perf is locked") : (Sr = a);
    },
    get RAID_SWAPS() {
      return Sa ? Sa.RAID_SWAPS : $r;
    },
    set RAID_SWAPS(a) {
      Sa ? console.warn("Poke'Catch: RAID_SWAPS is locked") : ($r = a);
    },
    get RaidDraw() {
      return Sa ? Sa.RaidDraw : Er;
    },
    set RaidDraw(a) {
      Sa ? console.warn("Poke'Catch: RaidDraw is locked") : (Er = a);
    },
    get Raids() {
      return Sa ? Sa.Raids : Pr;
    },
    set Raids(a) {
      Sa ? console.warn("Poke'Catch: Raids is locked") : (Pr = a);
    },
    get RankFx() {
      return Sa ? Sa.RankFx : Cr;
    },
    set RankFx(a) {
      Sa ? console.warn("Poke'Catch: RankFx is locked") : (Cr = a);
    },
    get Roaming() {
      return Sa ? Sa.Roaming : Rr;
    },
    set Roaming(a) {
      Sa ? console.warn("Poke'Catch: Roaming is locked") : (Rr = a);
    },
    get SCENES() {
      return Sa ? Sa.SCENES : Tr;
    },
    set SCENES(a) {
      Sa ? console.warn("Poke'Catch: SCENES is locked") : (Tr = a);
    },
    get SPECIALS() {
      return Sa ? Sa.SPECIALS : Ar;
    },
    set SPECIALS(a) {
      Sa ? console.warn("Poke'Catch: SPECIALS is locked") : (Ar = a);
    },
    get SPRITE_BOUNDS() {
      return Sa ? Sa.SPRITE_BOUNDS : Lr;
    },
    set SPRITE_BOUNDS(a) {
      Sa ? console.warn("Poke'Catch: SPRITE_BOUNDS is locked") : (Lr = a);
    },
    get STATUS() {
      return Sa ? Sa.STATUS : qr;
    },
    set STATUS(a) {
      Sa ? console.warn("Poke'Catch: STATUS is locked") : (qr = a);
    },
    get STORY() {
      return Sa ? Sa.STORY : Or;
    },
    set STORY(a) {
      Sa ? console.warn("Poke'Catch: STORY is locked") : (Or = a);
    },
    get Screens() {
      return Sa ? Sa.Screens : Ir;
    },
    set Screens(a) {
      Sa ? console.warn("Poke'Catch: Screens is locked") : (Ir = a);
    },
    get Sfx() {
      return Sa ? Sa.Sfx : Dr;
    },
    set Sfx(a) {
      Sa ? console.warn("Poke'Catch: Sfx is locked") : (Dr = a);
    },
    get ShinyGlint() {
      return Sa ? Sa.ShinyGlint : jr;
    },
    set ShinyGlint(a) {
      Sa ? console.warn("Poke'Catch: ShinyGlint is locked") : (jr = a);
    },
    get Sleep() {
      return Sa ? Sa.Sleep : Nr;
    },
    set Sleep(a) {
      Sa ? console.warn("Poke'Catch: Sleep is locked") : (Nr = a);
    },
    get TYPES() {
      return Sa ? Sa.TYPES : Is;
    },
    set TYPES(a) {
      Sa ? console.warn("Poke'Catch: TYPES is locked") : (Is = a);
    },
    get TYPE_CHART() {
      return Sa ? Sa.TYPE_CHART : Br;
    },
    set TYPE_CHART(a) {
      Sa ? console.warn("Poke'Catch: TYPE_CHART is locked") : (Br = a);
    },
    get TabLock() {
      return Sa ? Sa.TabLock : zr;
    },
    set TabLock(a) {
      Sa ? console.warn("Poke'Catch: TabLock is locked") : (zr = a);
    },
    get Title() {
      return Sa ? Sa.Title : Fr;
    },
    set Title(a) {
      Sa ? console.warn("Poke'Catch: Title is locked") : (Fr = a);
    },
    get Tower() {
      return Sa ? Sa.Tower : _r;
    },
    set Tower(a) {
      Sa ? console.warn("Poke'Catch: Tower is locked") : (_r = a);
    },
    get TrainerCard() {
      return Sa ? Sa.TrainerCard : Ur;
    },
    set TrainerCard(a) {
      Sa ? console.warn("Poke'Catch: TrainerCard is locked") : (Ur = a);
    },
    get TravelFx() {
      return Sa ? Sa.TravelFx : Gr;
    },
    set TravelFx(a) {
      Sa ? console.warn("Poke'Catch: TravelFx is locked") : (Gr = a);
    },
    get UI() {
      return Sa ? Sa.UI : Vs;
    },
    set UI(a) {
      Sa ? console.warn("Poke'Catch: UI is locked") : (Vs = a);
    },
    get UNOWN() {
      return Sa ? Sa.UNOWN : Hr;
    },
    set UNOWN(a) {
      Sa ? console.warn("Poke'Catch: UNOWN is locked") : (Hr = a);
    },
    get Underground() {
      return Sa ? Sa.Underground : Xr;
    },
    set Underground(a) {
      Sa ? console.warn("Poke'Catch: Underground is locked") : (Xr = a);
    },
    get Update() {
      return Sa ? Sa.Update : Vr;
    },
    set Update(a) {
      Sa ? console.warn("Poke'Catch: Update is locked") : (Vr = a);
    },
    get VGrid() {
      return Sa ? Sa.VGrid : Yr;
    },
    set VGrid(a) {
      Sa ? console.warn("Poke'Catch: VGrid is locked") : (Yr = a);
    },
    get WEATHER() {
      return Sa ? Sa.WEATHER : Wr;
    },
    set WEATHER(a) {
      Sa ? console.warn("Poke'Catch: WEATHER is locked") : (Wr = a);
    },
    get WeatherFx() {
      return Sa ? Sa.WeatherFx : Kr;
    },
    set WeatherFx(a) {
      Sa ? console.warn("Poke'Catch: WeatherFx is locked") : (Kr = a);
    },
    get WorldBoss() {
      return Sa ? Sa.WorldBoss : Zr;
    },
    set WorldBoss(a) {
      Sa ? console.warn("Poke'Catch: WorldBoss is locked") : (Zr = a);
    },
    get WorldBossView() {
      return Sa ? Sa.WorldBossView : Jr;
    },
    set WorldBossView(a) {
      Sa ? console.warn("Poke'Catch: WorldBossView is locked") : (Jr = a);
    },
    get _t() {
      return Sa ? Sa._t : e;
    },
    set _t(a) {
      Sa ? console.warn("Poke'Catch: _t is locked") : (e = a);
    },
    __seal: function () {
      if (!Sa) {
        var a = {};
        ([
          "Adventure",
          "App",
          "BASE_EXP",
          "BadgeShine",
          "BattleFX",
          "BerryBites",
          "BerryFX",
          "CHANGELOG",
          "CONFIG",
          "CandyRun",
          "CaptureFX",
          "CatchUp",
          "Changelog",
          "Clock",
          "Cloud",
          "DAYTIME",
          "ENCOUNTERS",
          "EVOLUTIONS",
          "EliteFrames",
          "EventTeam",
          "EventUI",
          "Events",
          "FORMS",
          "FX_MOVES",
          "Frames",
          "Game",
          "GeodeFx",
          "GiftFx",
          "Gifts",
          "Guide",
          "HABITATS",
          "HealFX",
          "I18n",
          "ITEM_NAMES",
          "ItemFX",
          "LEAGUE_TEAMS",
          "LegendZones",
          "LinkFx",
          "MOVES",
          "Music",
          "Names",
          "News",
          "Options",
          "POKEDEX",
          "PensionBerryFX",
          "Perf",
          "RAID_SWAPS",
          "RaidDraw",
          "Raids",
          "RankFx",
          "Roaming",
          "SCENES",
          "SPECIALS",
          "SPRITE_BOUNDS",
          "STATUS",
          "STORY",
          "Screens",
          "Sfx",
          "ShinyGlint",
          "Sleep",
          "TYPES",
          "TYPE_CHART",
          "TabLock",
          "Title",
          "Tower",
          "TrainerCard",
          "TravelFx",
          "UI",
          "UNOWN",
          "Underground",
          "Update",
          "VGrid",
          "WEATHER",
          "WeatherFx",
          "WorldBoss",
          "WorldBossView",
          "_t",
        ].forEach(function (b) {
          ((a[b] = ko[b]), ri(b, a[b]));
        }),
          (Sa = Object.freeze(a)));
      }
    },
  },
  io = globalThis,
  Ro = new WeakMap(),
  vo = function (a) {
    return Object.prototype.hasOwnProperty.call(ko, a);
  };
const Wa = io.setTimeout.bind(io),
  Ss = io.setInterval.bind(io),
  es = io.requestAnimationFrame.bind(io),
  zn = Object.freeze({ now: io.performance.now.bind(io.performance) });
var Qr = { setTimeout: Wa, setInterval: Ss, requestAnimationFrame: es, performance: zn },
  t = new Proxy(Object.create(null), {
    get: function (a, b) {
      if (vo(b)) return ko[b];
      if (Object.prototype.hasOwnProperty.call(Qr, b)) return Qr[b];
      var f = io[b];
      return typeof f != "function" ? f : (Ro.has(f) || Ro.set(f, f.bind(io)), Ro.get(f));
    },
    set: function (a, b, f) {
      return (vo(b) ? (ko[b] = f) : (io[b] = f), !0);
    },
    has: function (a, b) {
      return vo(b) || b in io;
    },
    deleteProperty: function (a, b) {
      return (vo(b) ? (ko[b] = void 0) : delete io[b], !0);
    },
  });
