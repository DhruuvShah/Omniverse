import os

basedir = r'd:\Dhruv\Marvel'

files_to_fix = {
    'dc-comics.html': {
        'old': [
            'let desc = `This project belongs to ${item.u} and was released in ${item.y}. It is classified as a ${item.ty}. `;',
            'if (item.rq) desc += "It is considered a highly critical watch for understanding the core overarching narrative of the Multiverse Saga and upcoming Secret Wars.";',
            'else desc += "While not strictly mandatory for the main narrative, it provides excellent flavor and historical context for the expansive Marvel Multiverse.";',
            'document.getElementById(\'modalDesc\').textContent = desc;'
        ],
        'new': [
            'let desc = `This project belongs to ${item.u} and was released in ${item.y}. It is classified as a ${item.ty}. `;',
            'if (item.rq) desc += "It is considered a highly critical read for understanding the core overarching narrative of the DC Multiverse and the Crisis architecture.";',
            'else desc += "While not strictly mandatory for the main narrative, it provides excellent flavor and historical context for the expansive DC Omniverse.";',
            'document.getElementById(\'modalDesc\').textContent = desc;'
        ]
    },
    'dc-movies.html': {
        'old': [
            'let desc = `This project belongs to ${item.u} and was released in ${item.y}. It is classified as a ${item.ty}. `;',
            'if (item.rq) desc += "It is considered a highly critical watch for understanding the core overarching narrative of the Multiverse Saga and upcoming Secret Wars.";',
            'else desc += "While not strictly mandatory for the main narrative, it provides excellent flavor and historical context for the expansive Marvel Multiverse.";',
            'document.getElementById(\'modalDesc\').textContent = desc;'
        ],
        'new': [
            'let desc = `This project belongs to ${item.u} and was released in ${item.y}. It is classified as a ${item.ty}. `;',
            'if (item.rq) desc += "It is considered a highly critical watch for understanding the core overarching narrative of the DC Multiverse and the upcoming DCU.";',
            'else desc += "While not strictly mandatory for the main narrative, it provides excellent flavor and historical context for the expansive DC Omniverse.";',
            'document.getElementById(\'modalDesc\').textContent = desc;'
        ]
    },
    'marvel-comics.html': {
        'old': [
            'let desc = `This project belongs to ${item.u} and was released in ${item.y}. It is classified as a ${item.ty}. `;',
            'if (item.rq) desc += "It is considered a highly critical watch for understanding the core overarching narrative of the Multiverse Saga and upcoming Secret Wars.";',
            'else desc += "While not strictly mandatory for the main narrative, it provides excellent flavor and historical context for the expansive Marvel Multiverse.";',
            'document.getElementById(\'modalDesc\').textContent = desc;'
        ],
        'new': [
            'let desc = `This project belongs to ${item.u} and was released in ${item.y}. It is classified as a ${item.ty}. `;',
            'if (item.rq) desc += "It is considered a highly critical read for understanding the core overarching narrative of the Multiverse Saga and upcoming Secret Wars.";',
            'else desc += "While not strictly mandatory for the main narrative, it provides excellent flavor and historical context for the expansive Marvel Multiverse.";',
            'document.getElementById(\'modalDesc\').textContent = desc;'
        ]
    }
}

for filename, replacements in files_to_fix.items():
    filepath = os.path.join(basedir, filename)
    if not os.path.exists(filepath):
        print(f"Not found: {filepath}")
        continue
    
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
        
    old_block = '\n            '.join(replacements['old'])
    new_block = '\n            '.join(replacements['new'])
    
    # We will just replace line by line if block doesn't match perfectly
    for i in range(len(replacements['old'])):
        content = content.replace(replacements['old'][i], replacements['new'][i])
        
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)
        
print("Updated descriptions.")
