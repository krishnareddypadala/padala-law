# Night runs — how it works

Each `nightN.md` is a task you paste into Claude Code on the VM. Claude Code drives Chrome
(via the Claude in Chrome extension) to generate audio in NotebookLM, one prompt at a time,
and renames each download to its tag so `scripts/deploy.sh` can pick it up.

Before night 1: finish `00_VM_SETUP.md` and the sanity test (one manual generation).

Pacing: ~17 min per Telugu Deep Dive file (measured 2026-09-10). 20 files ≈ 6 hours, so keep two generations in flight (NotebookLM allows 2 at a time). Two accounts × ~10 each per night.
If NotebookLM shows a limit message, the task switches profile; if both are exhausted, it stops.

Morning after each night:
```bash
cd ~/padala-law/sem5-pipeline && ./scripts/verify.sh && ./scripts/deploy.sh evidence
```

## Limits measured on 2026-09-10 (Krishna's accounts)
- Pro account (psmkreddy255@gmail.com): 20 Audio Overviews in one night, then
  "You have reached your daily Audio Overview limit. Come back later."
- Second account (krishnapadala55@gmail.com) is NOT Pro: it cannot create new notebooks
  (at the free cap) and shows "almost at your AI usage limit" after 2 generations; its
  dialog has "Generate later / Generate now" buttons and an AI-usage meter. Limit resets
  every ~5 hours (banner said "resets at 7:21").
- Practical throughput: ~20 episodes/night on Pro, 2 in flight at a time, ~10-17 min each.
