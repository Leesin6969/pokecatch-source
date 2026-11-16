/**
 * screen admin loader
 *
 * Public API on the game namespace `t`: t.Screens.admin
 *
 * Recovered from the shipped bundle — original chunk #85 at byte 2248435 (749 bytes, sha256:b18351a1d26a2780).
 * This file is one original source file; the build concatenates them in filename order.
 */
(function () {
  const a = t.ADMIN_FILES || [
    "js/screens/admin-habitats.js",
    "js/screens/admin-raids.js",
    "js/screens/admin-worldboss.js",
    "js/screens/admin-stats.js",
    "js/screens/admin-server.js",
    "js/screens/admin-economy.js",
    "js/screens/admin-progress.js",
    "js/screens/admin-mod.js",
    "js/screens/admin-player.js",
    "js/screens/admin.js",
    "js/cheats.js",
  ];
  let b = !1;
  const f = () => {
    b = !0;
    const ue = a.map(
      (H) =>
        new Promise((vt, B) =>
          document.head.appendChild(
            Object.assign(document.createElement("script"), {
              src: H,
              async: !1,
              onload: vt,
              onerror: () => B(new Error(H)),
            }),
          ),
        ),
    );
    Promise.all(ue).then(
      () => t.Screens.admin.init(),
      (H) => console.warn("Admin mode failed to load:", H.message),
    );
  };
  t.Screens.admin = {
    init() {
      const ue = () => {
        !b && a.length && t.Cloud.isAdmin && f();
      };
      (t.Cloud.on(ue), ue());
    },
    render() {},
  };
})();
