// collect-vi-report.mjs — merge the three Vietnamese probes into verify/vi-probe.json.
import { existsSync, readFileSync, writeFileSync } from 'node:fs';
const read = p => (existsSync(p) ? JSON.parse(readFileSync(p, 'utf8')) : null);
const report = {
  at: new Date().toISOString(),
  final: read('verify/vi-final-probe.json'),
  options: read('verify/vi-options-probe.json'),
  dex: read('verify/vi-dex-probe.json'),
  checks: {},
};
report.checks = {
  switchEnToVi: report.final?.after?.lang === 'vi' && (report.final?.after?.nav || []).includes('Phiêu lưu'),
  noPlaceholders: (report.final?.main?.leftoverPlaceholders || []).length === 0,
  noErrors: (report.final?.errors || []).length === 0,
  languageList9: report.options?.count === 9 && report.options?.hasVietnamese === true,
  pokeFlavorVi: report.dex?.hasVnFlavor === true,
  navVi: (report.final?.after?.nav || []).slice(0, 3).join(' / ') === 'Phiêu lưu / Tiến trình / Đội/PC',
};
report.passed = Object.values(report.checks).every(Boolean);
writeFileSync('verify/vi-probe.json', JSON.stringify(report, null, 1));
console.log('vi-probe:', JSON.stringify(report.checks), '| passed:', report.passed);
process.exit(report.passed ? 0 : 1);
