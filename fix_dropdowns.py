import os, re

files = ['index.html', 'marvel-comics.html', 'dc-movies.html', 'dc-comics.html']
basedir = r'd:\Dhruv\Marvel'

for filename in files:
    filepath = os.path.join(basedir, filename)
    if not os.path.exists(filepath):
        continue
        
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    # Extract unique acts from watchData
    acts = re.findall(r'"act":\s*"([^"]+)"', content)
    unique_acts = list(dict.fromkeys(acts)) # Preserve order and make unique
    
    # Generate new list items
    li_str = f'<li class="px-5 py-3 lg:py-2.5 hover:bg-apple-blue hover:text-white cursor-pointer transition-colors" data-value="All">All Timelines</li>\n'
    for act in unique_acts:
        li_str += f'                                <li class="px-5 py-3 lg:py-2.5 hover:bg-apple-blue hover:text-white cursor-pointer transition-colors" data-value="{act}">{act}</li>\n'
        
    # Replace the dropdown menu
    start_dropdown = '<ul class="py-1 text-base lg:text-sm text-white font-medium">'
    end_dropdown = '</ul>'
    
    if start_dropdown in content and end_dropdown in content:
        # Find the FIRST occurrence of the dropdown list, which is the actDropdownMenu
        start_idx = content.find(start_dropdown) + len(start_dropdown)
        end_idx = content.find(end_dropdown, start_idx)
        
        new_content = content[:start_idx] + '\n                                ' + li_str + '                            ' + content[end_idx:]
        content = new_content
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
print("Fixed dropdowns.")
