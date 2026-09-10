"""Compose the Gemini Notebook infographic description for one episode: python ig_prompt.py <subj> <NN>"""
import json, sys
subj, nn = sys.argv[1], sys.argv[2]
d = json.load(open(f'sem5-pipeline/build/{subj}_episodes.json', encoding='utf-8'))
e = next(x for x in d['episodes'] if x['n']==nn)
case = e['s'].split(' — ')[0].split(' — ')[0]
print(f'Exam revision infographic for Episode {nn} — {e["t"]} ({case}). Portrait layout. Sections: (1) a short timeline of the story of {case}; (2) the key doctrines with section numbers, always giving the {d["old_code"]} and the {d["new_code"]} (e.g. {d["example"]}); (3) comparison boxes where relevant; (4) a 5-point exam gist. Cover: {e["cover"]}. Clear headings, English text, high readability for quick revision.')
