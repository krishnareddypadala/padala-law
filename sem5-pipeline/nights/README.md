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
