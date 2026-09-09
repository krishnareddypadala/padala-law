# Padala Law — LL.B Audio Revision + Notes

Story-based Telugu audio revision and exam notes for the LL.B (3-year) course, Adikavi Nannaya University, Andhra Pradesh.
Legal terms, case names, acts and section numbers are kept in English.

**Live site:** https://padala.law

## Semesters and subjects

| Semester | Paper | Subject | Episodes | Audio | Notes |
|---|---|---|---|---|---|
| IV | XVI | Labour & Industrial Law II | 10 | Telugu | — |
| IV | XVII | Public International Law | 10 | Telugu | — |
| IV | XVIII | Principles of Taxation Law | 10 | Telugu | — |
| IV | XIX | IPR Litigation | 10 | Telugu | — |
| IV | XX | Land Laws | 10 | Telugu | — |
| V | XXVII | Law of Evidence | 12 | coming | ✓ |

Semester V subjects still to come: CPC & Limitation, CrPC (Crimes-II), Banking, Insurance, Media Law & RTI, International Human Rights.
Both optional papers are hosted; study the one your college chose.

Each episode tells a real case as a story, then explains the law behind it with
exact sections, and ends with an exam-revision recap.

## Structure

```
index.html                     player + notes reader
data.js                        SEMESTERS → subjects → topics
audio/<id>/story-NN.m4a        Telugu episode, 48 kbps mono AAC
audio/<id>/story-NN-en.m4a     English episode (optional; player shows a Telugu ⇄ English toggle when subject has en:true)
img/<id>/story-NN.jpg          revision infographic (📊 button)
notes/<id>.js                  study notes per episode (📝 button), built by sem5-pipeline/build/notes_html.js
sem5-pipeline/                 Semester V content sources, NotebookLM prompts, overnight runbooks
```

Subject ids: `pil`, `labour`, `tax`, `ipr`, `land`, `evidence` (more in `data.js`).

The player probes `audio/<id>/story-01.m4a` once per subject; if it is missing the cards say
"audio coming soon" and open the notes instead. No code change is needed when audio lands.

## Adding a subject

1. Add the subject object to the right semester in `data.js` (`en:true` if English audio is planned, `notes:true` if notes exist).
2. `node sem5-pipeline/build/notes_html.js <id>` → writes `notes/<id>.js` from `sem5-pipeline/build/<id>_part*.js`.
3. Drop audio at `audio/<id>/story-NN.m4a` (`sem5-pipeline/scripts/deploy.sh <id>` does the encode + commit + push).
4. Drop infographics at `img/<id>/story-NN.jpg`.
