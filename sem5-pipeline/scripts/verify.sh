#!/usr/bin/env bash
# verify.sh — done vs missing audio per subject, from the map files.
REPO="$(cd "$(dirname "$0")/../.." && pwd)"
for MAP in "$REPO"/sem5-pipeline/prompts/*_map.tsv; do
  SUBJ=$(basename "$MAP" _map.tsv); total=0; ok=0; missing=()
  while IFS=$'\t' read -r tag dst; do
    tag=${tag%$'\r'}; dst=${dst%$'\r'}   # tolerate CRLF checkouts (Windows)
    [[ -z "$tag" || "$tag" == \#* ]] && continue
    total=$((total+1))
    [[ -f "$REPO/audio/$SUBJ/$dst.m4a" ]] && ok=$((ok+1)) || missing+=("$dst")
  done < "$MAP"
  printf "%-10s %2d/%2d done" "$SUBJ" "$ok" "$total"
  [[ ${#missing[@]} -gt 0 ]] && printf "  missing: %s" "${missing[*]}"; echo
done
