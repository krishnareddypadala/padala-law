# 01 — Repo Setup on the VM

```bash
cd ~
git clone https://github.com/krishnareddypadala/padala-law.git
cd padala-law
git config user.name  "krishnareddypadala"
git config user.email "krishna@padala.law"
```

## Push credentials — NEVER commit these
Use a **fine-grained PAT** scoped to this one repo, Contents: Read & Write.
Store it in the git credential helper, not in any file:
```bash
git config credential.helper store
git push   # first push prompts for username + PAT once, then cached in ~/.git-credentials (outside the repo)
```
`~/.git-credentials` is in your home dir, not the repo, so it can't be committed.

## Folder layout the scripts expect
```
~/padala-law/                 ← the site (main branch)
~/nlm-downloads/              ← Chrome downloads land here
~/padala-law/sem5-pipeline/   ← this package
```

## Daily loop
```bash
cd ~/padala-law/sem5-pipeline
./scripts/verify.sh            # shows what's done / missing
./scripts/deploy.sh evidence   # encodes + moves + commits + pushes for one subject
```
