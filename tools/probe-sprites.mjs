// probe-sprites.mjs — map the game's asset sources and check coverage for gen 5–9.
const sha = async url => {
  const r = await fetch(url);
  if (!r.ok) return { ok: false, status: r.status };
  const b = Buffer.from(await r.arrayBuffer());
  const { createHash } = await import('node:crypto');
  return { ok: true, bytes: b.length, sha: createHash('sha256').update(b).digest('hex').slice(0, 12) };
};
const dir = async url => {
  const r = await fetch(url);
  const t = await r.text();
  const m = [...t.matchAll(/href="([^"]+)"/g)].map(x => x[1]);
  return [...new Set(m.filter(h => h && !h.startsWith('/dirindex') && !h.startsWith('http') && !h.startsWith('?') && h !== '../'))];
};
const files = ['gen5ani/sprigatito.gif', 'gen5ani/charizard.gif', 'gen5ani/zoroark.gif', 'gen5ani/mimikyu.gif', 'gen5ani/dragapult.gif', 'gen5ani/great-tusk.gif',
  'gen5ani-shiny/sprigatito.gif', 'ani/sprigatito.gif', 'dex/sprigatito.png', 'gen9/sprigatito.png', 'home/sprigatito.png',
  'gen5ani/wooper-paldea.gif', 'gen5ani/urshifu.gif', 'gen5ani/ogerpon.gif', 'gen5ani/pecharunt.gif'];
for (const f of files) {
  const u = 'https://play.pokemonshowdown.com/sprites/' + f;
  const r = await sha(u);
  console.log((r.ok ? 'OK ' + String(r.bytes).padStart(7) : 'MISS ' + r.status), u);
}
console.log('\nfolders:', (await dir('https://play.pokemonshowdown.com/sprites/')).join(' | '));
