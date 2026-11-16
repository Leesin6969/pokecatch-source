/**\n * i18n vi — authored extension: registers Vietnamese in the language picker.
 * The language data itself is loaded from src/lang/vi.js by the boot loader.
 */
(function () {
  try {
    if (t.I18n && t.I18n.NAMES) t.I18n.NAMES.vi = 'Tiếng Việt';
  } catch (e) {}
})();
