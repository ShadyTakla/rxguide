import json
import os
import re

CORRECTED_DIR = "/home/user/rxguide/.audit/corrected"
INDEX_PATH = "/home/user/rxguide/index.html"

files = sorted(os.listdir(CORRECTED_DIR))
conditions = []
for f in files:
    if f.endswith('.json'):
        with open(os.path.join(CORRECTED_DIR, f)) as fh:
            conditions.append(json.load(fh))

# Build the JS block
js_lines = ["var MINOR_AILMENTS = ["]
for i, c in enumerate(conditions):
    j = json.dumps(c, indent=4, ensure_ascii=False)
    # indent each line by 4 spaces
    indented = '\n'.join('    ' + l for l in j.split('\n'))
    comma = ',' if i < len(conditions) - 1 else ''
    js_lines.append(indented + comma)
js_lines.append("];")
new_block = '\n'.join(js_lines)

# Read index.html
with open(INDEX_PATH, 'r', encoding='utf-8') as f:
    content = f.read()

# Find the MINOR_AILMENTS block
pattern = r'var MINOR_AILMENTS = \[.*?\];'
match = re.search(pattern, content, re.DOTALL)
if not match:
    print("ERROR: MINOR_AILMENTS block not found!")
    exit(1)

print(f"Found MINOR_AILMENTS at char {match.start()}–{match.end()}, length {match.end()-match.start()}")

new_content = content[:match.start()] + new_block + content[match.end():]
print(f"Old length: {len(content)}, New length: {len(new_content)}")

with open(INDEX_PATH, 'w', encoding='utf-8') as f:
    f.write(new_content)

print("Successfully reinjected MINOR_AILMENTS into index.html")
