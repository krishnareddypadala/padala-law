# sem5-pipeline — LL.B Semester V study + audio pipeline

| Folder | What |
|---|---|
| `00_VM_SETUP.md` | one-time VM/Chrome/Claude Code setup |
| `01_REPO_SETUP.md` | clone, credentials (never committed), folder layout |
| `material/` | story-first study guides (.docx) — upload each to NotebookLM in BOTH accounts |
| `prompts/<subject>_en.json`, `_te.json` | one NotebookLM prompt per episode |
| `prompts/<subject>_map.tsv` | tag → site filename; used by deploy.sh |
| `nights/nightN.md` | paste into Claude Code on the VM; runs ~20 generations |
| `scripts/deploy.sh <subject>` | encode (48k mono AAC faststart) → `audio/<subject>/story-NN[-en].m4a` → commit → push |
| `scripts/verify.sh` | done/missing report |
| `data/<subject>.js` | entry to splice into site `data.js` (done in Session D) |

Site convention (from the existing Sem IV player): Telugu audio = `story-NN.m4a` (plays in the player),
English = `story-NN-en.m4a` (download; player toggle added later), infographic = `img/<subject>/story-NN.jpg`.

Subjects: evidence · crpc · cpc · banking · insurance · media · ihr
Status: **evidence** ready (12 episodes). Others follow in Sessions B–C.
