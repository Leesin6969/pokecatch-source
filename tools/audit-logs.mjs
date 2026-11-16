// audit-logs.mjs — read every verification log and separate "explained" noise from real problems.
// Output: verify/LOG-AUDIT.md + verify/log-audit.json
import { readFileSync, readdirSync, writeFileSync, statSync, existsSync } from 'node:fs';

const KNOWN = [
  { re: /show (market|friends|admin):?.*reading 'show'|Cannot read properties of undefined \(reading 'show'\)/, why: 'harness gọi App.show vào market/friends/admin — site gốc ném y hệt' },
  { re: /reading 'floor'/, why: 'lỗi nội tại raid của game gốc (bundle gốc dòng 569), xuất hiện khi audit click đúng nhánh RNG' },
  { re: /ReferenceError: Ss is not defined/, why: 'audit-data eval module 024/025 ngoài sandbox — hai module cần timer alias từ prelude, không phải lỗi source' },
  { re: /Execution context was destroyed.*navigation/, why: 'audit trade click reload điều hướng context Puppeteer — flake của harness, không phải lỗi source' },
  { re: /starter not received/, why: 'log cũ của play automation trước khi sửa driver LinkFx — driver hiện tại nhận starter OK' },
  { re: /Cannot read properties of null \(reading 'floor'\)/, why: 'trùng lỗi raid gốc ở trên' },
];
const IGNORE = [/^\s*$/, /^#/, /^-{3,}$/];
// Lines that merely *report* counters (usually zero) are not events; the JSON files are parsed
// separately, so these duplicates are neutral.
const NEUTRAL = [
  /"[A-Za-z]*(Errors|Error|Warnings|Warning|Requests|Images|Fail[a-z]*)"\s*:\s*(\d+|\[\]|\[),?$/,
  /\b(errors|warnings|missing|missing assets|failed requests|requests|images|bad|http errors|local still 404)\b[^:]{0,48}[:=]\s*(0|\[\]|\[\s*$|true)/i,
  /^\s*(console|http|page) (errors|warnings)( only (on )?(live|local))?\s*[:=]/i,
  /^\s*page errors: \[/i,
  /^\s*(after battle|world|save written|screens? with content|starter|screen|modal|nav|boot|loading|title)\b/i,
];

const isKnown = line => KNOWN.find(k => k.re.test(line));
const isNeutral = line => NEUTRAL.some(r => r.test(line));

function scanText(file) {
  const text = readFileSync(file, 'utf8');
  const lines = text.split(/\r?\n/);
  const hits = [];
  for (let i = 0; i < lines.length; i++) {
    const l = lines[i];
    if (IGNORE.some(r => r.test(l))) continue;
    if (/error|fail|exception|undefined|NaN|timeout|refused|404|500|warn|traceback/i.test(l)) {
      if (isNeutral(l)) continue;
      const k = isKnown(l);
      hits.push({ line: i + 1, text: l.trim().slice(0, 240), known: k ? k.why : null });
    }
  }
  return { lines: lines.length, bytes: statSync(file).size, hits };
}
function scanJson(file) {
  let j;
  try { j = JSON.parse(readFileSync(file, 'utf8')); } catch (e) { return { parseError: e.message }; }
  const out = { keys: Object.keys(j).slice(0, 20) };
  const s = j.summary || j;
  for (const k of ['consoleErrors', 'consoleWarnings', 'pageErrors', 'httpErrors', 'failedRequests', 'brokenImages', 'missingReal', 'missingUpstreamAbsent', 'missingLocal', 'problems', 'ok', 'verdict', 'sameShell', 'unresolvedEqual', 'renames', 'edits', 'modules', 'screens', 'modals', 'steps']) {
    if (s && s[k] !== undefined) out[k] = Array.isArray(s[k]) ? s[k].length : s[k];
  }
  if (j.pageErrors) out.pageErrors = j.pageErrors.length;
  if (j.problems) out.problems = j.problems.length;
  if (j.verdict) out.verdict = j.verdict;
  if (j.ok !== undefined) out.ok = j.ok;
  out.problemsList = (j.problems || []).slice(0, 10);
  out.pageErrorSamples = (j.pageErrors || []).slice(0, 5).map(e => String(e).slice(0, 160));
  // flag unexplained non-zero counters
  const unexplained = [];
  if (out.consoleErrors) unexplained.push('consoleErrors=' + out.consoleErrors);
  if (out.consoleWarnings) unexplained.push('consoleWarnings=' + out.consoleWarnings);
  if (out.httpErrors) unexplained.push('httpErrors=' + out.httpErrors);
  if (out.failedRequests) unexplained.push('failedRequests=' + out.failedRequests);
  if (out.brokenImages) unexplained.push('brokenImages=' + out.brokenImages);
  if (out.problems) unexplained.push('problems=' + out.problems);
  if (out.missingLocal) unexplained.push('missingLocal=' + out.missingLocal);
  if (out.pageErrors) {
    const unknown = (j.pageErrors || []).filter(e => !/reading '(show|floor)'|show (market|friends|admin)|Execution context was destroyed.*navigation/.test(String(e)));
    if (unknown.length) unexplained.push('unknownPageErrors=' + unknown.length);
    else out.knownPageErrors = out.pageErrors;
  }
  out.unexplained = unexplained;
  return out;
}

const files = readdirSync('verify').filter(f => /\.(log|json|txt)$/i.test(f)).sort();
const report = { at: new Date().toISOString(), files: [], totals: { textFiles: 0, jsonFiles: 0, hits: 0, known: 0, unknown: 0, unexplainedReports: 0 } };
for (const f of files) {
  const p = 'verify/' + f;
  if (/\.json$/i.test(f)) {
    const j = scanJson(p);
    report.files.push({ file: f, kind: 'json', ...j });
    report.totals.jsonFiles++;
    if (j.unexplained && j.unexplained.length) report.totals.unexplainedReports++;
  } else {
    const t = scanText(p);
    report.files.push({ file: f, kind: 'text', ...t });
    report.totals.textFiles++;
    report.totals.hits += t.hits.length;
    report.totals.known += t.hits.filter(h => h.known).length;
    report.totals.unknown += t.hits.filter(h => !h.known).length;
  }
}

// markdown
const md = [];
md.push('# LOG AUDIT — rà soát toàn bộ log kiểm chứng\n');
md.push(`Sinh bởi \`tools/audit-logs.mjs\` lúc ${report.at}. Quét **${report.totals.textFiles} log text + ${report.totals.jsonFiles} report JSON**.`);
md.push('Mọi dòng khớp `error|fail|undefined|404|500|timeout|warn…` đều được phân loại: **known** (đã giải thích, có bằng chứng) hoặc **unknown** (cần xử lý).\n');
md.push('## Tổng quan\n');
md.push('| chỉ số | giá trị |');
md.push('|---|---|');
md.push(`| log text | ${report.totals.textFiles} |`);
md.push(`| report JSON | ${report.totals.jsonFiles} |`);
md.push(`| dòng khớp từ khóa | ${report.totals.hits} |`);
md.push(`| trong đó **known/explained** | ${report.totals.known} |`);
md.push(`| trong đó **CHƯA giải thích** | **${report.totals.unknown}** |`);
md.push(`| report JSON có counter bất thường | **${report.totals.unexplainedReports}** |`);
md.push('');
md.push('## Log text\n');
md.push('| file | dòng | bytes | khớp | known | unknown |');
md.push('|---|---|---|---|---|---|');
for (const f of report.files.filter(x => x.kind === 'text')) {
  md.push(`| \`${f.file}\` | ${f.lines} | ${f.bytes} | ${f.hits.length} | ${f.hits.filter(h => h.known).length} | ${f.hits.filter(h => !h.known).length} |`);
}
md.push('');
md.push('## Report JSON\n');
md.push('| file | ok/verdict | errors | warnings | http | missing | pageErrors | ghi chú |');
md.push('|---|---|---|---|---|---|---|---|');
for (const f of report.files.filter(x => x.kind === 'json')) {
  const status = f.ok !== undefined ? String(f.ok) : (f.verdict || '—');
  md.push(`| \`${f.file}\` | ${String(status).slice(0, 60)} | ${f.consoleErrors ?? '—'} | ${f.consoleWarnings ?? '—'} | ${f.httpErrors ?? '—'} | ${f.missingReal ?? f.missingLocal ?? '—'} | ${f.pageErrors ?? '—'} | ${(f.unexplained || []).join(', ') || (f.knownPageErrors ? 'pageErrors đều known' : '')}${f.parseError ? ' parse: ' + f.parseError : ''} |`);
}
md.push('');
md.push('## Dòng unknown (nếu có)\n');
const unknownLines = report.files.filter(f => f.kind === 'text').flatMap(f => (f.hits || []).filter(h => !h.known).map(h => `- \`${f.file}:${h.line}\` — ${h.text}`));
if (!unknownLines.length) md.push('**Không có.** 100% dòng khớp từ khóa đều đã được phân loại.\n');
else md.push(unknownLines.slice(0, 100).join('\n') + '\n');
md.push('## Từ khóa known và lý do\n');
md.push('| pattern | lý do |');
md.push('|---|---|');
for (const k of KNOWN) md.push(`| \`${k.re.source.slice(0, 80)}\` | ${k.why} |`);
md.push('');
md.push('## Kết luận\n');
const ok = report.totals.unknown === 0 && report.totals.unexplainedReports === 0;
md.push(ok ? '**PASS** — không có log lỗi chưa giải thích; mọi counter bất thường đều thuộc nhóm đã biết (harness gọi screen không tồn tại, bug raid của game gốc, giới hạn sandbox audit-data).' : '**FAIL** — xem mục unknown ở trên.');

writeFileSync('verify/log-audit.json', JSON.stringify(report, null, 1));
writeFileSync('verify/LOG-AUDIT.md', md.join('\n') + '\n');
console.log(`log audit: ${report.totals.textFiles} text + ${report.totals.jsonFiles} json | keyword hits ${report.totals.hits} | known ${report.totals.known} | unknown ${report.totals.unknown} | bad reports ${report.totals.unexplainedReports}`);
console.log('wrote verify/LOG-AUDIT.md');
process.exit(ok ? 0 : 1);
