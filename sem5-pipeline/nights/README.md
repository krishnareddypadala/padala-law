# Night runs — how it works

Each `nightN.md` is a task you paste into Claude Code on the VM. Claude Code drives Chrome
(via the Claude in Chrome extension) to generate audio in NotebookLM, one prompt at a time,
and renames each download to its tag so `scripts/deploy.sh` can pick it up.

Before night 1: finish `00_VM_SETUP.md` and the sanity test (one manual generation).

Pacing: ~17 min per Telugu Deep Dive file (measured 2026-09-10). 20 files ≈ 6 hours, so keep two generations in flight (NotebookLM allows 2 at a time). Two accounts × ~10 each per night.
If NotebookLM shows a limit message, the task switches profile; if both are exhausted, it stops.

Morning after each night:
```bash
cd ~/padala-law/sem5-pipeline && ./scripts/verify.sh && ./scripts/deploy.sh evidence
```

## Limits measured on 2026-09-10 (Krishna's accounts)
- Pro account (psmkreddy255@gmail.com): 20 Audio Overviews in one night, then
  "You have reached your daily Audio Overview limit. Come back later."
- Second account (krishnapadala55@gmail.com) is NOT Pro: it cannot create new notebooks
  (at the free cap) and shows "almost at your AI usage limit" after 2 generations; its
  dialog has "Generate later / Generate now" buttons and an AI-usage meter. Limit resets
  every ~5 hours (banner said "resets at 7:21").
- Practical throughput: ~20 episodes/night on Pro, 2 in flight at a time, ~10-17 min each.
- **Queueing past the limit**: when an account is out of quota the Customise dialog offers *Generate later*
  instead of *Generate now*; the item shows as "Scheduled for after 7am" and NotebookLM runs it by
  itself when the limit resets. Queue the whole batch this way, then rename/download in the morning.
- Prompts can be pasted with the native value setter + `input` event; the Audio Overview tile,
  language option, Generate and menu items are reliably clickable by coordinate computed from
  getBoundingClientRect (JS `.click()` opens menus on the wrong row — avoid it).

## State as of 2026-09-10 14:00 (Claude running unattended on Krishna's PC — no VM)
- All seven Sem V guides are built and live on padala.law with notes + prompts + data: evidence, crpc, cpc, banking, insurance, media, ihr
  (`build/<subj>_part*.js` → `build_<subj>.js` → `material/<Subj>.docx`; `notes_html.js <subj>`; `make_prompts.py <subj>`; splice `data/<subj>.js` into `data.js`).
- Audio: evidence 24/24; crpc 2/24 (CR01TE, CR02TE); CR03TE is queued on account B ("Scheduled for after 12am"); everything else 0.
- Page helpers for NotebookLM automation are saved in `scripts/nlm_helpers.js` — inject into the notebook tab, then
  `await __loadPrompts('crpc'); await __gen('CR04TE'); __status(); await __rename('<title substring or mm:ss>','CR04TE'); await __menuClick('CR04TE','Download')`.
  Note `__rename` matches the rename input by its current value, so pass a substring of the auto-generated title, not the duration.
- Language combobox is an Angular `mat-select`; read the chosen value from `.mat-mdc-select-value`, pick `mat-option`
  elements. When account B is near its limit the non-English options and "Generate later" are DISABLED (mdc-list-item--disabled),
  so nothing more can be queued there until the window resets (banner: "Limit resets at 17:21").
- Pro account (psmkreddy255) daily Audio Overview limit was hit ~02:20 IST and was still in force at 13:50 IST — treat it as a rolling 24 h.
- Notebooks: Pro CrPC notebook `560d45b6-10a5-474b-bf06-05834e756adb` (source CrPC.docx); account B "Evidence" notebook
  `069c0895-6717-4482-ac4a-40b2519af1a3` holds both Evidence.docx and CrPC.docx — deselect Evidence.docx before generating CrPC.
- Order of work when quota returns: CrPC Telugu 03-12 → CPC Telugu → Banking → Insurance → Media → IHR (Telugu first), then English.
  New notebooks on Pro: navigate `?addSource=true`, click "Upload files" by ref, `file_upload` the docx from `material/`.
- Renaming rule: match the finished item's auto-title to the episode (e.g. "police arrest rules" = CR02) — if two episodes fit, prefer FIFO order of the queue.
- Pro-account notebooks created 2026-09-10 afternoon (source uploaded, no audio yet): CPC `6a1c11d3-581d-4dbc-a2f9-f1c02353a3c3`; Banking `90608f81-ed39-4f6a-a788-9531d82360fb`; Insurance `dee3bb02-9974-40d4-9771-3447b12091b1`; Media `5e724d0f-f350-4e60-905d-a8e0e307f3f0`; IHR `edfad3df-99c6-419d-bb5e-70fc03a7c230`. Open a notebook as `https://notebook.google.com/notebook/<id>?authuser=psmkreddy255@gmail.com`; the source is already selected.
- 17:45 update: CrPC Telugu 01,02,04,05 live. Account B (window reset 17:21) gave 2 "now" generations + 2 "later" before
  disabling; its queue now holds CR03TE, CR06TE, CR07TE ("Scheduled for after 12am") and the banner says "Limit resets at 22:21".
  Pattern for B: on reset run `__gen` twice for 'now', then `__gen` for 'later' until the button is disabled (≈2 later items); reload the tab to clear a stuck dialog.
  Pro account still on its daily Audio Overview limit at 17:03 (hit ~02:20) — retry after ~02:30.

## Infographics (added 2026-09-10 evening — Krishna: "Infographic is better")
- One Gemini Notebook infographic per episode → `img/<subj>/story-NN.jpg` (the player's 📊 button). Infographics are NOT
  blocked by the Audio Overview daily limit; ~3 min each, 2 in flight.
- Description comes from `scripts/ig_prompt.py <subj> <NN>` (or `__igDesc(subj,nn)` in the page, which fetches
  `build/<subj>_episodes.json` from the site). Settings: Portrait, Auto-select style, Detailed.
- Page helpers (define in the notebook tab): `__igDlg`, `__igGen(desc,'Portrait','Detailed')`, `__artList()`, `__artRow(title)`
  (strict: the smallest ancestor of a More button containing exactly one "1 source"), `__artDownload(title)`.
  Renaming artifacts via JS is unreliable (the title input stays open) — skip renaming; download by the auto title and pass
  the filename glob to the collector: `bash scripts/collect_ig.sh crpc CR 04 "Legal_Search*.png"` → `img/crpc/story-04.jpg`.
  Always check md5 of the PNGs — a wrong-row click silently downloads the same artifact twice.
- `scripts/deploy_img.py <subj> <NN> <png>` converts to JPEG (max 1536x2752, q85). Commit `img/` and push.
- Gemini app posters (gemini.google.com, "Generate an image…") also work (prompts in `prompts/crpc_img.json`, `scripts/img_prompt.py`)
  but Krishna prefers the infographics; the two posters made are kept in Downloads/songs/img as CR01IMG/CR02IMG.
- Infographic tile gets class `disabled-tile` while that notebook has one generating (and stays stale after the "ready" toast
  until the tab is reloaded) — so: one infographic per notebook at a time, reload the tab between batches, and run several
  notebooks in parallel tabs. Start with `__igGen(await __igDesc(subj,nn))`; collect with `collect_ig.sh <subj> <TAG> <NN> "<Title_glob>*.png"`.
  Hidden tabs sometimes freeze (JS timeouts, blank dialogs) — a navigate() to the same URL fixes it. Each helper call must stay < 45 s.
- 20:25: Pro account hit "You have reached your daily infographic limit" after 18 infographics (crpc 12, evidence 1 + 1 duplicate,
  cpc 1, + a few failed/duplicate runs). Done: crpc 12/12, evidence 01, cpc 01. Account B made EV02 (its AI usage then hit
  "limit reached, available after 22:21"). Only the VISIBLE Chrome tab executes generations reliably — hidden tabs report
  "no dialog"/stale tiles; navigate the visible tab (256539370 this session) to whichever notebook is needed (the B account's
  notebook also works from it via ?authuser=). The B dialog heading is "Customize Infographic" (capital I) — match case-insensitively.
  Remaining infographics: evidence 03-12, cpc 02-12, banking, insurance, media, ihr (69) — ~18/day on Pro, resume after ~19:15 next day.

## Sharing (added 2026-09-10 20:40)
- Every episode card has a 📤 button and every subject header a "share this subject" chip → Web Share sheet on phones (WhatsApp etc.),
  otherwise copies the text and opens wa.me. The text carries: the share page link, the direct Telugu/English .m4a links,
  the infographic .jpg link and the notes deep link.
- Deep links: `https://padala.law/#<subject>/<NN>` opens that episode (`/notes` opens the reader, `/img` the infographic);
  the player also writes `#subject/NN` to the address bar while playing, so the URL itself is shareable.
- WhatsApp preview cards come from static pages `s/<subject>/<NN>.html` and `s/<subject>.html` (OpenGraph title/description/image,
  then redirect to the hash link). Regenerate after adding images: `node sem5-pipeline/build/share_pages.js` (og:image = the episode's
  infographic if it exists, else the subject's story-01, else img/og-default.jpg). Commit the `s/` folder.
