#!/usr/bin/env python3
"""make_prompts.py <subject>
Reads build/<subject>_episodes.json and writes:
  prompts/<subject>_en.json, prompts/<subject>_te.json, prompts/<subject>_map.tsv, data/<subject>.js
Prompt wording follows the Evidence templates that produced good Telugu/English episodes on 2026-09-10.
"""
import json, sys, pathlib
subj = sys.argv[1] if len(sys.argv) > 1 else "evidence"
root = pathlib.Path(__file__).resolve().parents[1]
spec = json.load(open(root / "build" / f"{subj}_episodes.json", encoding="utf-8"))

EN = ("Generate a podcast in ENGLISH. Two hosts: one is a senior advocate who tells the story, the other a curious law student who keeps asking 'but why?'. "
      "Audience: LL.B students preparing for the {exam}. Use ONLY the uploaded source ({source}), Episode {n}.\n\n"
      "TOPIC: {title}\n\n"
      "STRUCTURE (follow this order):\n"
      "1. Open with the STORY of the anchor case exactly as told in the source — names, place, year, the dramatic turn. Make it vivid, 3-4 minutes. Do not jump to law until the story lands.\n"
      "2. Then: 'So what did the court actually decide?' — the principle in one clear sentence.\n"
      "3. Walk through the sections listed in the source for this episode. For EVERY section number, say the {old} number AND the {new} number (e.g. '{example}').\n"
      "4. The supporting cases — name, year, one-line holding each. Tie each back to the story.\n"
      "5. The DIGITAL angle from the source — spend 1-2 minutes here, concrete examples.\n"
      "6. Close with the EXAM tip: how this is asked in Part A / B / C and the skeleton of a good answer.\n\n"
      "COVER: {cover}\n\n"
      "STYLE: conversational, story-driven, no bullet-point reading. Hosts may disagree briefly on a grey area then resolve it from the source. Use the phrase 'here is the exam point' before each key takeaway. Duration 12-15 minutes.")

TE = ("Generate this podcast entirely in TELUGU. Two hosts: a senior advocate (story-teller) and a law student (asks 'enduku?', 'ela?'). "
      "Audience: Telugu-medium LL.B students preparing for the {exam}. Use ONLY the uploaded source ({source}), Episode {n}.\n\n"
      "LANGUAGE RULE: Speak Telugu throughout. Keep ALL legal terms in English — section numbers, case names, and terms like {terms} — and IMMEDIATELY explain each term's meaning in simple Telugu the first time it appears.\n\n"
      "TOPIC: {title}\n\n"
      "STRUCTURE:\n"
      "1. Anchor case STORY first, exactly as in the source — names, place, year, the twist. Telugu narration, 3-4 minutes, cinematic. Law comes after the story.\n"
      "2. 'Court em cheppindi?' — the principle in one clear sentence.\n"
      "3. Sections one by one, always saying the {old} number AND the {new} number in English (e.g. '{example_te}').\n"
      "4. Supporting cases — case name in English, year, one-line holding in Telugu, tied back to the story.\n"
      "5. DIGITAL angle from the source — phone, CCTV, portal, e-filing examples in everyday Telugu.\n"
      "6. Close with EXAM tip — Part A / B / C lo ela adugutaru, answer structure.\n\n"
      "COVER: {cover}\n\n"
      "STYLE: friendly, like two friends at a tea stall, but accurate to the source. Before every key takeaway say 'exam point idi'. Duration 12-15 minutes.")

en, te, rows = [], [], ["# tag\tdest   (NotebookLM download name starts with the tag; deploy.sh matches by prefix)"]
for e in spec["episodes"]:
    title = f"{e['t']} — {e['s'].split(' — ')[0]}" if " — " in e["s"] else e["t"]
    common = dict(exam=spec["exam"], source=spec["source"], n=e["n"], title=title, cover=e["cover"],
                  old=spec["old_code"], new=spec["new_code"], example=spec["example"], example_te=spec["example_te"], terms=spec["terms"])
    tag_te, tag_en = f"{spec['tag']}{e['n']}TE", f"{spec['tag']}{e['n']}EN"
    te.append({"id": f"{subj}:{e['n']}", "story": f"story-{e['n']}", "tag": tag_te, "title": title, "prompt": TE.format(**common)})
    en.append({"id": f"{subj}:{e['n']}", "story": f"story-{e['n']}-en", "tag": tag_en, "title": title, "prompt": EN.format(**common)})
    rows += [f"{tag_te}\tstory-{e['n']}", f"{tag_en}\tstory-{e['n']}-en"]

(root / "prompts").mkdir(exist_ok=True); (root / "data").mkdir(exist_ok=True)
json.dump(en, open(root / "prompts" / f"{subj}_en.json", "w", encoding="utf-8", newline="\n"), ensure_ascii=False, indent=1)
json.dump(te, open(root / "prompts" / f"{subj}_te.json", "w", encoding="utf-8", newline="\n"), ensure_ascii=False, indent=1)
open(root / "prompts" / f"{subj}_map.tsv", "w", encoding="utf-8", newline="\n").write("\n".join(rows) + "\n")

def js(s): return json.dumps(s, ensure_ascii=False)
topics = ",\n".join(f"      {{n:{js(e['n'])}, t:{js(e['t'])}, s:{js(e['s'])}}}" for e in spec["episodes"])
extra = f', optional: {js(spec["optional"])}' if spec.get("optional") else ""
entry = (f"  {{\n    id: {js(subj)}, name: {js(spec['name'])}, paper: {js(spec['paper'])}, emoji: {js(spec['emoji'])}{extra}, en: true, notes: true,\n"
         f"    topics: [\n{topics}\n    ]\n  }}\n")
open(root / "data" / f"{subj}.js", "w", encoding="utf-8", newline="\n").write(entry)
print(f"{subj}: {len(en)} EN + {len(te)} TE prompts, {len(rows)-1} map rows, data/{subj}.js written")
