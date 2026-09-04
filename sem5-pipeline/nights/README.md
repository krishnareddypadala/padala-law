# Night runs — how it works

Each `nightN.md` is a task you paste into Claude Code on the VM. Claude Code drives Chrome
(via the Claude in Chrome extension) to generate audio in NotebookLM, one prompt at a time,
and renames each download to its tag so `scripts/deploy.sh` can pick it up.

Before night 1: finish `00_VM_SETUP.md` and the sanity test (one manual generation).

Pacing: ~5 min per file. 20 files ≈ 2 hours. Two accounts × ~10 each per night.
If NotebookLM shows a limit message, the task switches profile; if both are exhausted, it stops.

Morning after each night:
```bash
cd ~/padala-law/sem5-pipeline && ./scripts/verify.sh && ./scripts/deploy.sh evidence
```
