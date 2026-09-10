#!/usr/bin/env bash
# collect_ig.sh <subj> <TAG2> <NN> [name-glob]  — wait for a PNG matching the glob (default "<TAG2><NN>IG*.png") downloaded in the last 6 min,
# store as Downloads/songs/img/<TAG2><NN>IG.png and convert to img/<subj>/story-NN.jpg
subj=$1; tag=$2; nn=$3; pat=${4:-"${tag}${nn}IG*.png"}; D=/c/Users/psmkr/Downloads/songs
for i in $(seq 1 60); do f=$(find "$D" -maxdepth 1 -name "$pat" -mmin -6 | head -1); [ -n "$f" ] && break; sleep 2; done
[ -z "$f" ] && { echo "no png matching $pat arrived"; exit 1; }
sleep 2; mkdir -p "$D/img"; mv "$f" "$D/img/${tag}${nn}IG.png" && python sem5-pipeline/scripts/deploy_img.py "$subj" "$nn" "$D/img/${tag}${nn}IG.png"
