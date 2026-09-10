#!/usr/bin/env bash
# collect_ig.sh <subj> <TAG2> <NN>  — wait for the newest PNG downloaded in the last 6 min, store as <TAG2><NN>IG.png, convert to img/<subj>/story-NN.jpg
subj=$1; tag=$2; nn=$3; D=/c/Users/psmkr/Downloads/songs
for i in $(seq 1 60); do f=$(find "$D" -maxdepth 1 -name "*.png" -mmin -6 | head -1); [ -n "$f" ] && break; sleep 2; done
[ -z "$f" ] && { echo "no png arrived"; exit 1; }
sleep 2; mkdir -p "$D/img"; mv "$f" "$D/img/${tag}${nn}IG.png" && python sem5-pipeline/scripts/deploy_img.py "$subj" "$nn" "$D/img/${tag}${nn}IG.png"
