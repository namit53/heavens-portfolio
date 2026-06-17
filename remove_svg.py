import os
import glob
import re

html_files = glob.glob('d:/OneDrive - UPES/Documents/website_heaven2/*.html')
for f in html_files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # Remove the SVG from the mobile phone link
    content = re.sub(r'<svg width="14" height="14" viewBox="0 0 24 24".*?</svg>', '', content)
    # Strip whitespace to clean it up
    content = content.replace('\n          +91', '+91')

    with open(f, 'w', encoding='utf-8') as file:
        file.write(content)
    print(f'Processed {f}')
