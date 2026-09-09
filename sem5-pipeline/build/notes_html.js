// notes_html.js <subject>
// Builds notes/<subject>.js for the site from build/<subject>_part*.js (the same sources
// that build the NotebookLM .docx). No npm packages needed — lib.js is shimmed to emit HTML.
//   node sem5-pipeline/build/notes_html.js evidence
const fs = require("fs"), path = require("path");
const SUBJ = process.argv[2] || "evidence";
const REPO = path.resolve(__dirname, "..", "..");

const esc = s => String(s).replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
const md  = s => esc(s).replace(/\*\*([^*]+)\*\*/g, "<strong>$1</strong>");

const shim = {
  H1:    t => ({ h1: t }),
  H2:    t => `<h3 class="n-h2">${esc(t)}</h3>`,
  H3:    t => `<h4 class="n-h3">${esc(t)}</h4>`,
  P:     t => `<p>${md(t)}</p>`,
  STORY: t => `<div class="n-story">${md(t)}</div>`,
  CASE:  (n, t) => `<div class="n-case"><b>${esc(n)}</b> — ${md(t)}</div>`,
  TIP:   t => `<div class="n-tip"><b>EXAM</b> ${md(t)}</div>`,
  DIG:   t => `<div class="n-dig"><b>DIGITAL</b> ${md(t)}</div>`,
  SEC:   (n, t) => `<div class="n-sec"><b>${esc(n)}:</b> ${md(t)}</div>`,
  LN:    () => "",
  PB:    () => "",
  TBL:   rows => `<div class="n-tblwrap"><table>${rows.map((r, i) =>
           `<tr>${r.map(c => i ? `<td>${esc(c)}</td>` : `<th>${esc(c)}</th>`).join("")}</tr>`).join("")}</table></div>`,
};

// Serve the shim instead of lib.js (which needs the `docx` package).
const libPath = require.resolve("./lib.js");
require.cache[libPath] = { id: libPath, filename: libPath, loaded: true, exports: shim };

const parts = fs.readdirSync(__dirname).filter(f => f.startsWith(SUBJ + "_part") && f.endsWith(".js")).sort();
if (!parts.length) { console.error(`no build/${SUBJ}_part*.js found`); process.exit(1); }
const items = [];
for (const f of parts) items.push(...require(path.join(__dirname, f)));

const out = { episodes: {}, extras: [] };
let cur = null;
for (const it of items) {
  if (it && it.h1) {
    const m = it.h1.match(/^Episode (\d+)\s*[—–-]\s*(.*)$/);
    cur = { title: m ? m[2] : it.h1, html: "" };
    if (m) out.episodes[m[1]] = cur; else out.extras.push(cur);
    continue;
  }
  if (cur && typeof it === "string") cur.html += it;
}

const dst = path.join(REPO, "notes", SUBJ + ".js");
fs.mkdirSync(path.dirname(dst), { recursive: true });
fs.writeFileSync(dst,
  `window.NOTES=window.NOTES||{};window.NOTES[${JSON.stringify(SUBJ)}]=${JSON.stringify(out)};\n`);
console.log(`wrote ${path.relative(REPO, dst)}: ${Object.keys(out.episodes).length} episodes, ${out.extras.length} extras, ${(fs.statSync(dst).size / 1024).toFixed(0)} KB`);
