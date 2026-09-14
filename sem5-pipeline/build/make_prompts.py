#!/usr/bin/env python3
"""make_prompts.py <subject>
Reads build/<subject>_episodes.json and writes:
  prompts/<subject>_en.json, prompts/<subject>_te.json, prompts/<subject>_map.tsv, data/<subject>.js
Prompt wording v2 (2026-09-14): named hosts Ramana and Priya, cold open, cliffhanger, myth-vs-reality, rapid-fire, memory hook - Krishna: "make audios interesting to listen".
"""
import json, sys, pathlib
subj = sys.argv[1] if len(sys.argv) > 1 else "evidence"
root = pathlib.Path(__file__).resolve().parents[1]
spec = json.load(open(root / "build" / f"{subj}_episodes.json", encoding="utf-8"))

EN = ("Generate a podcast in ENGLISH. Audience: LL.B students preparing for the {exam}. Use ONLY the uploaded source ({source}), Episode {n}. Never call this a 'deep dive'.\n\n"
      "HOSTS: two named people with real personalities. RAMANA is a senior advocate, 30 years at the bar, warm, dramatic, loves a good story and a bad pun. PRIYA is a sharp final-year student who is writing this exam next month, slightly stressed, asks 'but why?' and 'will this come in the exam?', and sometimes challenges Ramana. They tease each other. Real conversation, not a lecture.\n\n"
      "TOPIC: {title}\n\n"
      "STRUCTURE (follow this order):\n"
      "1. COLD OPEN (first 30 seconds): start in the middle of the story with a vivid line — a place, a time, a person in trouble — no introductions, no 'welcome to the podcast'. Then a short intro.\n"
      "2. THE STORY (4-5 minutes): tell the anchor case as a drama, exactly as in the source — names, place, year, what each side wanted, the twist. Voice the key lines: what the lawyer argued, what the judge said. Build to the moment of decision and STOP: Ramana asks Priya (and the listener) 'what would you have decided?' — ten seconds of guessing before the reveal.\n"
      "3. THE PRINCIPLE: 'so what did the court actually decide?' — one clear sentence, then why it matters to an ordinary person today.\n"
      "4. THE LAW, WOVEN INTO THE STORY: walk through the sections listed in the source, but attach each section to a moment in the story ('this is where Section X kicks in'). For EVERY section number say the {old} number AND the {new} number (e.g. '{example}'). No list-reading.\n"
      "5. THE OTHER CASES: the supporting cases — each as a 30-second mini-story (who, what happened, one-line holding) and how it agrees with or twists the main case.\n"
      "6. MYTH vs REALITY (1 minute): Priya states one thing students commonly get wrong on this topic; Ramana corrects it from the source.\n"
      "7. THE DIGITAL ANGLE (1-2 minutes): the modern examples from the source — phones, CCTV, e-filing, portals — as concrete scenes.\n"
      "8. RAPID-FIRE (1 minute): Ramana fires three quick questions, Priya answers, they mark each 'correct' or fix it.\n"
      "9. EXAM CLOSE: how this is asked in Part A / B / C, the skeleton of a full-marks answer, and ONE memory hook (a mnemonic or a picture) for the whole episode. End with the 'thirty-second recap' — the whole episode in four sentences.\n\n"
      "COVER: {cover}\n\n"
      "STYLE: story first, law second, always accurate to the source. Vary the pace — slow and quiet at the dramatic moments, quick in the rapid-fire. Say 'here is the exam point' before each key takeaway. Use everyday Indian examples (auto driver, ration shop, village panchayat, a WhatsApp forward). Duration 15-18 minutes.")

TE = ("Generate this podcast entirely in TELUGU. Audience: Telugu-medium LL.B students preparing for the {exam}. Use ONLY the uploaded source ({source}), Episode {n}. Never call this a 'deep dive'.\n\n"
      "LANGUAGE RULE: Speak natural, everyday Telugu throughout (the way friends talk, not textbook Telugu). Keep ALL legal terms in English — section numbers, case names, and terms like {terms} — and explain each term's meaning in simple Telugu the first time it appears.\n\n"
      "HOSTS: two named people with real personalities. RAMANA garu is a senior advocate, 30 years in court, warm, dramatic, loves a story and a joke. PRIYA is a sharp final-year student with this exam next month, a little tense, keeps asking 'enduku?', 'ela?', 'idi exam lo vastunda?', and sometimes argues back. They tease each other. Real conversation, not a lecture.\n\n"
      "TOPIC: {title}\n\n"
      "STRUCTURE:\n"
      "1. COLD OPEN (first 30 seconds): start in the middle of the story — a place, a time, a person in trouble — no 'namaskaram, welcome' first. Then a short intro.\n"
      "2. THE STORY (4-5 minutes): the anchor case as a cinema scene, exactly as in the source — names, place, year, evari side em, the twist. Voice the key lines: lawyer em argue chesadu, judge em annaru. Build to the moment of decision and STOP: Ramana asks Priya (and the listener) 'meeru judge aithe em cheptaru?' — ten seconds of guessing before the reveal.\n"
      "3. THE PRINCIPLE: 'Court em cheppindi?' — one clear sentence, then it matters to an ordinary manishi ela.\n"
      "4. THE LAW INSIDE THE STORY: the sections listed in the source, each tied to a moment in the story ('ikkade Section X vastundi'). For EVERY section number say the {old} number AND the {new} number in English (e.g. '{example_te}'). List laga chadavaddu.\n"
      "5. THE OTHER CASES: supporting cases — case name in English, year, a 30-second mini-story in Telugu, holding in one line, and how it connects to the main story.\n"
      "6. MYTH vs REALITY (1 minute): Priya says one thing students usually get wrong here; Ramana corrects it from the source.\n"
      "7. DIGITAL ANGLE (1-2 minutes): the modern examples from the source — phone, CCTV, portal, e-filing — as small scenes in everyday Telugu.\n"
      "8. RAPID-FIRE (1 minute): Ramana asks three quick questions, Priya answers, 'correct' or correction.\n"
      "9. EXAM CLOSE: Part A / B / C lo ela adugutaru, full-marks answer skeleton, and ONE memory hook (mnemonic or a picture) for the whole episode. End with a 'muppai seconds recap' — the whole episode in four sentences.\n\n"
      "COVER: {cover}\n\n"
      "STYLE: story first, law second, always accurate to the source. Vary the pace — slow at the dramatic moments, fast in rapid-fire. Before every key takeaway say 'exam point idi'. Use everyday Telugu-life examples (auto anna, ration shop, village panchayat, WhatsApp forward). Duration 15-18 minutes.")

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
