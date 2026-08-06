# Padala Law — LL.B Audio Revision

Story-based Telugu audio revision for LL.B (3-year) Semester IV, Andhra Pradesh.
Legal terms, case names, acts and section numbers are kept in English.

**Live site:** https://padala.law

## Subjects

| Paper | Subject | Episodes |
|---|---|---|
| XVI | Labour & Industrial Law II | 10 |
| XVII | Public International Law | 10 |
| XVIII | Principles of Taxation Law | 10 |
| XIX | IPR Litigation | 10 |
| XX | Land Laws | 10 |

Each episode tells a real case as a story, then explains the law behind it with
exact articles and sections, and ends with a quick exam-revision recap.

## Structure

```
index.html      player UI
data.js         subject and topic list
audio/<id>/story-NN.m4a    48kbps mono AAC
img/<id>/story-NN.jpg      revision infographic
```

Subject ids: `pil`, `labour`, `tax`, `ipr`, `land`

## Adding an infographic

Drop a JPEG at `img/<subject-id>/story-NN.jpg`. The 📊 button picks it up
automatically — no code change needed.
