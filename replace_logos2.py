import os
import re

files = ["rent-lease.html", "sell.html"]

header_replace = """<a href="index.html" class="logo" id="logo">
            <img src="img/logo.svg" alt="Heaven's Portfolio Realty Logo" class="logo-mark">
            <div class="logo-text">Heaven's <span>Portfolio</span><br><span style="font-size: 0.55em; letter-spacing: 0.25em; color: rgba(255,255,255,0.7); text-transform: uppercase;">Realty</span></div>
          </a>"""

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # We will find the block:
    # <a href="index.html" class="logo" id="logo">
    #   <div class="logo-mark">H</div>
    #   <div class="logo-text">Heaven's <span>Portfolio</span></div>
    # </a>
    # with any indentation
    
    pattern = re.compile(r'<a href="index\.html" class="logo" id="logo">\s*<div class="logo-mark">H</div>\s*<div class="logo-text">Heaven\'s <span>Portfolio</span></div>\s*</a>', re.DOTALL)
    
    if pattern.search(content):
        content = pattern.sub(header_replace, content)
        print(f"Updated header in {f}")
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
    else:
        print(f"No match found in {f}")

