import re
with open('dc-comics.html', encoding='utf8') as f:
    c = f.read()
acts = re.findall(r'"act":\s*"([^"]+)"', c)
print(list(set(acts)))
