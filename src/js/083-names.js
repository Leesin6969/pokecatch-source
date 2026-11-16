/**
 * names
 *
 * Public API on the game namespace `t`: t.Names
 *
 * Recovered from the shipped bundle — original chunk #82 at byte 2209027 (1465 bytes, sha256:9ba6bf11b69d1785).
 * This file is one original source file; the build concatenates them in filename order.
 */
t.Names = (function () {
  const a = [
      "connard",
      "connasse",
      "salope",
      "salaud",
      "encule",
      "enculer",
      "pute",
      "putain",
      "batard",
      "bouffon",
      "abruti",
      "pedale",
      "tapette",
      "gouine",
      "negro",
      "negre",
      "bougnoul",
      "bicot",
      "youpin",
      "sale arabe",
      "sale noir",
      "niquer",
      "ntm",
      "fdp",
      "filsdepute",
      "tagueule",
      "trouduc",
      "branleur",
      "bite",
      "couille",
      "chatte",
      "nichon",
      "teub",
      "zizi",
      "suceur",
      "suceuse",
      "pedophile",
      "pedo",
      "violeur",
      "nazi",
      "hitler",
      "jihad",
      "terroriste",
      "fuck",
      "fuk",
      "fck",
      "shit",
      "bitch",
      "cunt",
      "dick",
      "cock",
      "pussy",
      "asshole",
      "bastard",
      "whore",
      "slut",
      "nigger",
      "nigga",
      "faggot",
      "fag",
      "retard",
      "rape",
      "rapist",
      "porn",
      "sex",
      "penis",
      "vagina",
      "boob",
      "tits",
      "jizz",
      "wank",
      "twat",
      "motherfucker",
      "swastika",
    ],
    b = [
      "con",
      "cons",
      "conne",
      "cul",
      "merde",
      "chier",
      "nique",
      "viol",
      "pd",
      "kkk",
      "adolf",
      "heil",
      "isis",
      "ass",
      "tit",
      "hoe",
      "kys",
      "cum",
    ],
    f = {
      0: "o",
      1: "i",
      3: "e",
      4: "a",
      5: "s",
      7: "t",
      8: "b",
      "@": "a",
      $: "s",
      "!": "i",
      "|": "i",
      "€": "e",
    },
    ue = (x) =>
      x
        .normalize("NFD")
        .replace(/[̀-ͯ]/g, "")
        .toLowerCase()
        .replace(/[013457@$!|€8]/g, ($) => f[$]),
    H = (x) => x.replace(/(.)\1+/g, "$1"),
    vt = (x) => H(ue(x).replace(/[^a-z]/g, "")),
    B = (x) =>
      x
        .replace(/([a-z])([A-Z])/g, "$1 $2")
        .split(/[^A-Za-zÀ-ÿ0-9@$!|€]+/)
        .map(vt)
        .filter(Boolean),
    se = a.map((x) => H(x.replace(/[^a-z]/g, ""))),
    Ge = new Set(b.map(vt));
  function Je(x) {
    const $ = vt(x);
    return $ ? (se.some((X) => $.includes(X)) ? !0 : Ge.has($) || B(x).some((X) => Ge.has(X))) : !1;
  }
  function Ze(x) {
    const $ = x.trim();
    return $ ? (Je($) ? e("Ce nom n'est pas autorisé. Choisis-en un autre.") : null) : e("Choisis un nom.");
  }
  return { banned: Je, check: Ze };
})();
