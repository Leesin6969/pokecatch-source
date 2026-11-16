// gen-api.mjs — generate docs/API.md (every export on the `t` namespace) from the canonical tree.
import { readFileSync, writeFileSync, readdirSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';
import { parse } from '@babel/parser';
import traverse from '@babel/traverse';

const files = readdirSync('src/js').filter(f => /^\d{3}-.*\.js$/.test(f)).sort();
const manifest = JSON.parse(readFileSync('src/js/_manifest.json', 'utf8'));
const modByFile = Object.fromEntries(manifest.modules.map(m => [m.file, m]));
const read = f => readFileSync(join('src/js', f), 'utf8').replace(/^\/\*\*[\s\S]*?\*\/\n/, '');
const arityOf = n => {
  if (!n) return null;
  if (n.type === 'FunctionExpression' || n.type === 'ArrowFunctionExpression' || n.type === 'FunctionDeclaration' || n.type === 'ObjectMethod' || n.type === 'ClassMethod') return n.params.length;
  return null;
};
function pathOf(node) {
  // t.a.b.c → "t.a.b.c"
  const parts = [];
  let n = node;
  while (n && n.type === 'MemberExpression' && !n.computed && n.property.type === 'Identifier') {
    parts.unshift(n.property.name);
    n = n.object;
  }
  if (n && n.type === 'Identifier' && n.name === 't') return 't.' + parts.join('.');
  return null;
}
const api = {}; // path -> { file, kind, arity, keys:[{name, kind, arity}] }
const add = (path, file, kind, arity, keys) => {
  if (!api[path]) api[path] = { file, kind, arity, keys: [] };
  if (keys) api[path].keys = keys;
};

for (const f of files) {
  const code = read(f);
  let ast;
  try { ast = parse(code, { sourceType: 'script', allowReturnOutsideFunction: true, plugins: ['optionalChaining', 'nullishCoalescingOperator', 'classProperties'] }); }
  catch (e) { console.error('parse fail', f, e.message); continue; }
  traverse(ast, {
    AssignmentExpression(p) {
      const path = pathOf(p.node.left);
      if (!path) return;
      const right = p.node.right;
      if (right.type === 'ObjectExpression') {
        const keys = [];
        for (const prop of right.properties) {
          if (prop.type === 'ObjectMethod') keys.push({ name: prop.key.name ?? prop.key.value, kind: prop.kind, arity: prop.params.length });
          else if (prop.type === 'ObjectProperty') keys.push({ name: prop.key.name ?? prop.key.value, kind: 'property', arity: arityOf(prop.value) });
        }
        add(path, f, 'object', null, keys);
      } else if (right.type === 'CallExpression' && right.callee && /FunctionExpression|ArrowFunctionExpression/.test(right.callee.type)) {
        const body = right.callee.body;
        let ret = null;
        if (body.type === 'ObjectExpression') ret = body;
        else if (body.type === 'BlockStatement') {
          const last = body.body[body.body.length - 1];
          if (last && last.type === 'ReturnStatement' && last.argument && last.argument.type === 'ObjectExpression') ret = last.argument;
        }
        const keys = [];
        if (ret) for (const prop of ret.properties) {
          if (prop.type === 'ObjectMethod') keys.push({ name: prop.key.name ?? prop.key.value, kind: prop.kind, arity: prop.params.length });
          else if (prop.type === 'ObjectProperty') keys.push({ name: prop.key.name ?? prop.key.value, kind: 'property', arity: arityOf(prop.value) });
        }
        add(path, f, 'iife', arityOf(right.callee), keys);
      } else {
        add(path, f, right.type, arityOf(right));
      }
    },
  });
}

// ---- markdown --------------------------------------------------------------------------------
const byModule = {};
for (const [path, info] of Object.entries(api)) {
  const top = path.split('.')[1];
  (byModule[top] ||= []).push({ path, ...info });
}
const lines = [];
lines.push('# API reference — mọi thứ game gốc gắn lên namespace `t`\n');
lines.push(`Sinh tự động bởi \`tools/gen-api.mjs\` từ cây nguồn chuẩn \`src/js/\` (${files.length} file, ${Object.keys(api).length} export path).`);
lines.push('Cột **arity** là số tham số khai báo của hàm (null = không phải hàm).\n');
for (const top of Object.keys(byModule).sort((a, b) => a.localeCompare(b))) {
  lines.push(`\n## \`t.${top}\`\n`);
  lines.push('| export | kind | arity | file | members |');
  lines.push('|---|---|---|---|---|');
  for (const e of byModule[top].sort((a, b) => a.path.localeCompare(b.path))) {
    const keys = e.keys && e.keys.length
      ? e.keys.map(k => `\`${k.name}\`${k.kind !== 'property' ? `(${k.kind}${k.arity ? ' ' + k.arity : ''})` : k.arity != null ? `(${k.arity})` : ''}`).join(', ')
      : '';
    const m = modByFile[e.file];
    lines.push(`| \`${e.path}\` | ${e.kind} | ${e.arity ?? ''} | ${m ? m.name : e.file} | ${keys} |`);
  }
}
mkdirSync('docs', { recursive: true });
writeFileSync('docs/API.md', lines.join('\n') + '\n');
writeFileSync('docs/api.json', JSON.stringify(api, null, 1));
console.log('docs/API.md written:', lines.length, 'lines,', Object.keys(api).length, 'export paths');
