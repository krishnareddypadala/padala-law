"""Compose the Gemini image prompt for one episode: python img_prompt.py <subj> <TAG>"""
import json, sys
subj, tag = sys.argv[1], sys.argv[2]
e = next(x for x in json.load(open(f'sem5-pipeline/prompts/{subj}_img.json', encoding='utf-8')) if x['tag']==tag)
badges = ', '.join('"%s"' % b for b in e['badges'])
print(f'Generate an image. A vertical portrait (9:16) exam-revision poster for an Indian law student podcast episode. Scene: {e["scene"]}. At the top, bold clean title text: "{e["title"]}". Below it a smaller subtitle: "{e["sub"]}". At the bottom, {len(e["badges"])} small badge-style labels reading exactly: {badges}. All text in English, large and legible, no other text.')
