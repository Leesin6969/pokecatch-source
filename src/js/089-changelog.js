/**
 * changelog
 *
 * Public API on the game namespace `t`: t.Changelog
 *
 * Recovered from the shipped bundle — original chunk #88 at byte 2587909 (1784 bytes, sha256:3d34b8d00d414f45).
 * This file is one original source file; the build concatenates them in filename order.
 */
t.Changelog = (function () {
  const { $: a, h: b, esc: f, modal: ue } = t.UI,
    H = t.CHANGELOG || [],
    vt = "pokecatch-changelog-seen",
    B = "https://discord.gg/PZfZw2n3Vr",
    se = () => [
      e("janvier"),
      e("février"),
      e("mars"),
      e("avril"),
      e("mai"),
      e("juin"),
      e("juillet"),
      e("août"),
      e("septembre"),
      e("octobre"),
      e("novembre"),
      e("décembre"),
    ],
    Ge = (le) => {
      const [P, u, ve] = le.split("-").map(Number);
      return e("{d} {month} {y}", { d: ve, month: se()[u - 1], y: P });
    },
    Je = (le) => (t.I18n?.lang === "fr" ? le : le[t.I18n?.lang] || le.en || le),
    Ze = () => {
      try {
        return localStorage.getItem(vt);
      } catch {
        return null;
      }
    },
    x = () => !!H[0] && Ze() !== H[0].date;
  function $(le) {
    let P = "",
      u = !1;
    const ve = () => {
      u && ((P += "</ul>"), (u = !1));
    };
    for (const it of le.trim().split(`
`)) {
      const De = it.trim();
      if (!De) {
        ve();
        continue;
      }
      De.startsWith("## ")
        ? (ve(), (P += `<h5>${f(De.slice(3))}</h5>`))
        : /^[•-] /.test(De)
          ? (u || ((P += "<ul>"), (u = !0)), (P += `<li>${f(De.slice(2))}</li>`))
          : (ve(), (P += `<p>${f(De)}</p>`));
    }
    return (ve(), P);
  }
  function X() {
    a("#options-btn")?.classList.toggle("has-new", x());
  }
  function Tt() {
    if (H[0])
      try {
        localStorage.setItem(vt, H[0].date);
      } catch {}
    X();
    const le = b(`<div class="op">
      <header class="op-head"><h3><img class="pn-ic" src="assets/ui/orange-mail.png" alt=""> Changelogs</h3><button class="op-x dc-x" aria-label="${e("Fermer")}">✕</button></header>
      <div class="pn-list">${H.map((P, u) => {
        const ve = Je(P);
        return `<details class="pn-item"${u ? "" : " open"}>
        <summary><span class="t"><b>${f(ve.title)}</b><small>${Ge(P.date)}</small></span><span class="chev">›</span></summary>
        <div class="pn-body">${$(ve.md)}</div></details>`;
      }).join("")}</div>
      <a class="pn-more" href="${B}" target="_blank" rel="noopener">${e("Toutes les notes sur Discord ›")}</a>
    </div>`);
    return ue({
      className: "op-modal pn-modal",
      body: le,
      onOpen: (P, u) => {
        a(".op-x", le).onclick = () => u(null);
      },
    });
  }
  return { open: Tt, badge: X, isNew: x };
})();
