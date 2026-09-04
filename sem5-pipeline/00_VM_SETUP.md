# 00 — VM Setup (one time, ~40 min)

Target: Ubuntu 24.04 **Desktop** VM on beast (virt-manager/KVM). Headless won't work — NotebookLM needs a real Chrome window.

## VM spec
- 4 vCPU, 16 GB RAM, 80 GB disk, no GPU passthrough needed
- Network: NAT is fine (only outbound needed)
- Install from ubuntu-24.04-desktop-amd64.iso, minimal install, user `law`

## Base packages
```bash
sudo apt update && sudo apt install -y git ffmpeg curl jq unzip fonts-noto fonts-noto-color-emoji
# Node (for Claude Code)
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash - && sudo apt install -y nodejs
```

## Chrome + two profiles
```bash
wget -q https://dl.google.com/linux/direct/google-chrome-stable_current_amd64.deb
sudo apt install -y ./google-chrome-stable_current_amd64.deb
```
1. Open Chrome → sign in **Account A** → name the profile `A`
2. Add profile → sign in **Account B** → name it `B`
3. In BOTH profiles: open https://notebooklm.google.com → confirm Pro badge shows
4. In BOTH profiles: install "Claude in Chrome" extension and sign in with your Claude Max account
5. Chrome → Settings → Downloads → set folder to `/home/law/nlm-downloads` and turn OFF "Ask where to save"

## Claude Code
```bash
npm install -g @anthropic-ai/claude-code
claude   # first run → browser login with the same Max account
```
Verify the Chrome tools are visible: inside `claude`, type `/mcp` — you should see the Chrome extension listed.

## Keep the VM awake overnight
Settings → Power → Screen Blank: Never · Automatic Suspend: Off.
Also: `gsettings set org.gnome.desktop.session idle-delay 0`

## Sanity test (do this before night 1)
1. In profile A, open NotebookLM, create a notebook called **Evidence**, upload `sem5-pipeline/material/Evidence.docx`
2. Repeat in profile B (same notebook name, same file)
3. In Studio → Audio Overview → Customize → paste any ONE prompt from `prompts/evidence_te.json` → Generate → wait → download. If a file lands in `~/nlm-downloads`, you're ready.
