#!/bin/bash
# setup.sh — Run this after extracting the tar.gz
# This initializes the git repo and pushes to GitHub

set -e

echo "=== padala.law GitHub Setup ==="
echo ""

# Step 1: Create repo on GitHub first
echo "BEFORE RUNNING THIS SCRIPT:"
echo "1. Go to https://github.com/new"
echo "2. Create repo: padala-law (public, NO readme, NO gitignore, NO license)"
echo "3. Come back and run this script"
echo ""
read -p "Press Enter when repo is created on GitHub..."

# Step 2: Init and push
cd padala-law-gh

git init
git add -A
git commit -m "Initial commit — padala.law exam study portal"
git branch -M main
git remote add origin git@github.com:$(git config user.name || echo "YOUR_USERNAME")/padala-law.git

echo ""
echo "If the remote URL above is wrong, fix it:"
echo "  git remote set-url origin git@github.com:YOUR_USERNAME/padala-law.git"
echo ""
read -p "Press Enter to push..."

git push -u origin main

echo ""
echo "=== Pushed! Now configure GitHub Pages ==="
echo ""
echo "1. Go to: https://github.com/YOUR_USERNAME/padala-law/settings/pages"
echo "2. Source: select 'GitHub Actions'"
echo "3. The workflow will auto-deploy on push"
echo ""
echo "=== Configure Custom Domain ==="
echo ""
echo "At your domain registrar for padala.law, add these DNS records:"
echo ""
echo "  Type    Name    Value"
echo "  A       @       185.199.108.153"
echo "  A       @       185.199.109.153"
echo "  A       @       185.199.110.153"
echo "  A       @       185.199.111.153"
echo "  CNAME   www     YOUR_USERNAME.github.io"
echo ""
echo "Then in GitHub repo Settings → Pages → Custom domain: padala.law"
echo "Check 'Enforce HTTPS'"
echo ""
echo "Site will be live at: https://padala.law"
echo ""
echo "=== Adding audio later ==="
echo "git add audio/property/topic_3.mp3"
echo "git commit -m 'Add mortgage audio'"
echo "git push"
