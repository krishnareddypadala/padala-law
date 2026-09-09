#!/usr/bin/env bash
# deploy.sh <subject> — encode downloaded NotebookLM audio, place in site, commit, push.
# Subjects: evidence crpc cpc banking insurance media ihr
set -euo pipefail
SUBJ="${1:?usage: deploy.sh <subject>}"
REPO="$(cd "$(dirname "$0")/../.." && pwd)"
DL="${NLM_DOWNLOADS:-$HOME/nlm-downloads}"
MAP="$REPO/sem5-pipeline/prompts/${SUBJ}_map.tsv"   # tag<TAB>story-NN[-en]
OUT="$REPO/audio/$SUBJ"
mkdir -p "$OUT"
[[ -f "$MAP" ]] || { echo "no map file $MAP"; exit 1; }
moved=0
while IFS=$'\t' read -r tag dst; do
  tag=${tag%$'\r'}; dst=${dst%$'\r'}   # tolerate CRLF checkouts (Windows)
  [[ -z "$tag" || "$tag" == \#* ]] && continue
  f=$(ls -t "$DL"/"$tag"*.m4a "$DL"/"$tag"*.mp3 "$DL"/"$tag"*.wav 2>/dev/null | head -1 || true)
  [[ -z "$f" ]] && continue
  [[ -f "$OUT/$dst.m4a" ]] && continue
  echo "encode: $(basename "$f") -> $SUBJ/$dst.m4a"
  ffmpeg -loglevel error -y -i "$f" -c:a aac -b:a 48k -ac 1 -movflags +faststart "$OUT/$dst.m4a"
  mkdir -p "$DL/done" && mv "$f" "$DL/done/"
  moved=$((moved+1))
done < "$MAP"
echo "encoded $moved new file(s)"
[[ $moved -eq 0 ]] && exit 0
cd "$REPO" && git add "audio/$SUBJ" && git commit -q -m "sem5: add $moved $SUBJ audio file(s)" && git push -q origin main && echo "pushed."
