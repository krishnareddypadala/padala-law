// node sem5-pipeline/build/share_pages.js → s/<sid>/<NN>.html and s/<sid>.html (OpenGraph preview pages that redirect to the player)
const fs=require('fs'),path=require('path'),vm=require('vm');
const ctx={window:{}}; vm.runInNewContext(fs.readFileSync('data.js','utf8')+';globalThis.S=SEMESTERS;',ctx);
const BASE='https://padala.law';
const esc=s=>String(s).replace(/&/g,'&amp;').replace(/"/g,'&quot;').replace(/</g,'&lt;');
const page=(title,desc,img,hash)=>`<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${esc(title)}</title>
<meta property="og:type" content="article"><meta property="og:site_name" content="Padala Law">
<meta property="og:title" content="${esc(title)}"><meta property="og:description" content="${esc(desc)}">
<meta property="og:image" content="${img}"><meta property="og:url" content="${BASE}/#${hash}">
<meta name="twitter:card" content="summary_large_image"><meta name="description" content="${esc(desc)}">
<meta http-equiv="refresh" content="0;url=${BASE}/#${hash}">
<script>location.replace(${JSON.stringify(BASE+'/#'+hash)});</script></head>
<body style="font-family:system-ui;background:#0b1120;color:#e5e7eb;padding:24px"><p>Opening <a style="color:#93c5fd" href="${BASE}/#${hash}">${esc(title)}</a> on Padala Law…</p></body></html>`;
let n=0;
for(const m of ctx.S) for(const s of m.subjects){
  fs.mkdirSync(path.join('s',s.id),{recursive:true});
  const simg=fs.existsSync(path.join('img',s.id,'story-01.jpg'))?`${BASE}/img/${s.id}/story-01.jpg`:`${BASE}/img/og-default.jpg`;
  fs.writeFileSync(path.join('s',s.id+'.html'),page(`${s.name} — Padala Law`,`${s.paper||''} · ${s.topics.length} story-based Telugu audio episodes with exam notes`,simg,s.id));
  for(const t of s.topics){
    const img=fs.existsSync(path.join('img',s.id,`story-${t.n}.jpg`))?`${BASE}/img/${s.id}/story-${t.n}.jpg`:simg;
    fs.writeFileSync(path.join('s',s.id,t.n+'.html'),page(`${t.n}. ${t.t} — ${s.name}`,t.s,img,`${s.id}/${t.n}`)); n++;
  }
}
console.log('share pages written:',n);
