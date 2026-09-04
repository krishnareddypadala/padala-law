# NIGHT 1 — Evidence: 12 Telugu + 8 English (20 files)

You are running an unattended overnight batch. Work slowly and verify each step. Do not skip verification.

## Setup facts
- Repo: `~/padala-law`. Prompts: `~/padala-law/sem5-pipeline/prompts/evidence_te.json` and `evidence_en.json`.
- Downloads folder: `~/nlm-downloads` (Chrome is configured to save there without asking).
- Chrome has two profiles named **A** and **B**, both logged into NotebookLM Pro, both with a notebook named **Evidence** containing `Evidence.docx`.
- Use the Claude in Chrome tools to control the browser. Take a screenshot before every click that matters.

## Batch for tonight (in this order)
Profile A: evidence_te.json items 01–10 (tags EV01TE … EV10TE)
Profile B: evidence_te.json items 11–12 (EV11TE, EV12TE), then evidence_en.json items 01–08 (EV01EN … EV08EN)

## Loop — for each item
1. Open NotebookLM in the current profile → open the notebook **Evidence**.
2. In the Studio panel, click **Audio Overview** → **Customize** (or the pencil/"Customise" control). If a previous audio exists, use the option to generate a new one; do NOT delete existing ones.
3. Paste the item's `prompt` text exactly. Click **Generate**.
4. Wait. Poll every 60 seconds by screenshot until the player appears with a duration. Do not wait more than 12 minutes; if it exceeds that, log `TIMEOUT <tag>` and move on.
5. Click the download control (three-dot menu → Download). Wait until a new file appears in `~/nlm-downloads` (check with `ls -t ~/nlm-downloads | head -1` in the shell).
6. Rename the newest downloaded file to `<tag>.m4a` — e.g. `mv "$(ls -t ~/nlm-downloads/*.m4a | head -1)" ~/nlm-downloads/EV01TE.m4a`. If the download is `.wav` or `.mp3`, keep that extension but use the tag as the name.
7. Append a line to `~/padala-law/sem5-pipeline/nights/night1.log`: `OK <tag> <filename> <duration if visible>`.
8. Sleep 60 seconds before the next item (rate pacing).

## Switching profiles
After item 10, open a new Chrome window in profile **B** (Chrome profile switcher → B). Continue the loop there.

## Error handling
- If NotebookLM shows a message about a daily limit or quota: log `LIMIT <profile>`, switch to the other profile if not yet used, else stop.
- If a generation fails or the page errors: retry once after 2 minutes; if it fails again log `FAIL <tag>` and continue.
- If Chrome asks to sign in again: stop and log `AUTH <profile>` — do not attempt to enter passwords.
- Never enter credentials. Never delete files. Never touch git.

## Finish
When all 20 are attempted, write a summary block at the end of the log: counts of OK / FAIL / TIMEOUT / LIMIT, then stop. Do not run deploy.sh — a human does that in the morning.
