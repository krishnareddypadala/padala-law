# Deploying padala.law

Everything is ready in this folder. 357 MB total — 50 audio episodes, 11 infographics, and the player.

---

## Step 1 — Clean the existing repo

Your repo: https://github.com/krishnareddypadala/padala-law

The old content needs clearing first. In a terminal:

```bash
cd C:\Users\psmkr\OneDrive\Documents\LAW
git clone https://github.com/krishnareddypadala/padala-law padala-law-repo
cd padala-law-repo

# delete everything tracked, keep .git
git rm -r --cached . 
Get-ChildItem -Exclude .git | Remove-Item -Recurse -Force
```

## Step 2 — Copy the new site in

```powershell
Copy-Item -Path "..\padala-law-site\*" -Destination . -Recurse -Force
```

Make sure these hidden files came across (they matter):
- `.nojekyll` — stops GitHub mangling folders
- `CNAME` — contains `padala.law`

## Step 3 — Push

```bash
git add -A
git commit -m "LL.B Telugu audio revision site"
git push origin main
```

The push is ~357 MB, so expect a few minutes. If git complains about large files,
note the biggest single file here is ~11 MB — well under GitHub's 100 MB limit,
so a plain push works. No Git LFS needed.

## Step 4 — Turn on GitHub Pages

Repo → **Settings** → **Pages**
- Source: **Deploy from a branch**
- Branch: **main**, folder: **/ (root)**
- Save

Under **Custom domain**, enter `padala.law` and save. Tick **Enforce HTTPS**
once the certificate is issued (can take up to an hour).

## Step 5 — DNS for padala.law

At your domain registrar, set these records:

| Type | Name | Value |
|---|---|---|
| A | @ | 185.199.108.153 |
| A | @ | 185.199.109.153 |
| A | @ | 185.199.110.153 |
| A | @ | 185.199.111.153 |
| CNAME | www | krishnareddypadala.github.io |

DNS usually propagates in 15 minutes to a few hours.

---

## Adding the missing infographics later

Currently included: all 10 for Public International Law, 1 for Labour Law.
The remaining ones are still in NotebookLM.

To add one:
1. Download the PNG from NotebookLM
2. Convert and drop it in as `img/<subject>/story-NN.jpg`
3. Commit and push

Subject folder ids: `pil`, `labour`, `tax`, `ipr`, `land`

The 📊 button on each topic finds the file automatically — no code changes.
If a file is missing, the button just shows a friendly "not uploaded yet" note.

## Adding or editing topics

All topic titles and summaries live in `data.js`. Edit that one file —
the player rebuilds itself from it.

---

## Site structure since Sep 2026

- `data.js` now groups subjects under `SEMESTERS` (IV and V). `SUBJECTS` is still exported as a flat list.
- Subjects with `notes:true` get a 📝 button per episode; content comes from `notes/<id>.js`
  (build with `node sem5-pipeline/build/notes_html.js <id>`).
- Subjects with `en:true` show a Telugu ⇄ English toggle; English files are `story-NN-en.m4a`.
- Missing audio is detected automatically (one HEAD request per subject) and shown as "audio coming soon".

## What the site does

- Tab across the five subjects
- Tap a topic to play its Telugu audio (legal terms in English)
- 📊 opens that topic's revision infographic full-screen
- Auto-advances to the next topic when one ends
- Works offline-ish: audio streams progressively, so playback starts fast

### Progress tracking (localStorage, per device/browser)

- Saves your playback position every 5 seconds, plus on pause, tab-switch and close
- Reopening the site shows a **"Continue where you left off"** banner at the top
- Tapping a part-played topic resumes at the exact second you stopped
- An episode is marked **✓ completed** at 92% listened (skips the outro) or on finish
- Each topic card shows a progress bar and "43% listened · resume at 6:12"
- Each subject tab shows "4 / 10 done"; the footer shows the overall count
- Playback speed (0.75× – 2×) is remembered too
- "reset progress" in the player bar clears everything after a confirm

Stored under keys `padala.progress.v1` (per-episode) and `padala.state.v1` (last
episode, subject, speed). Nothing leaves the device — no server, no real cookies,
so nothing is sent with every request. Progress does not sync across devices.

## Audio specs

Re-encoded from the NotebookLM originals: 48 kbps mono AAC, faststart enabled
for instant streaming. Original quality (257 kbps stereo, 1.9 GB) is preserved
in your subject folders under `LAW\2nd Year 2st Sem\<subject>\audios\`.
