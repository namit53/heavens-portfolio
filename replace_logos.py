import os

files = ["index.html", "about.html", "contact.html", "properties.html", "rent-lease.html", "sell.html", "blog.html", "careers.html"]

header_find = """          <a href="index.html" class="logo" id="logo">
            <div class="logo-mark">H</div>
            <div class="logo-text">Heaven's <span>Portfolio</span></div>
          </a>"""

header_replace = """          <a href="index.html" class="logo" id="logo">
            <img src="img/logo.svg" alt="Heaven's Portfolio Realty Logo" class="logo-mark">
            <div class="logo-text">Heaven's <span>Portfolio</span><br><span style="font-size: 0.55em; letter-spacing: 0.25em; color: rgba(255,255,255,0.7); text-transform: uppercase;">Realty</span></div>
          </a>"""

footer_find = """          <a href="index.html" class="footer-logo">
            <div class="logo-mark">H</div>
            <div class="logo-text">Heaven's <span>Portfolio</span></div>
          </a>"""

footer_replace = """          <a href="index.html" class="footer-logo">
            <img src="img/logo.svg" alt="Heaven's Portfolio Realty Logo" class="logo-mark">
            <div class="logo-text">Heaven's <span>Portfolio</span><br><span style="font-size: 0.55em; letter-spacing: 0.25em; color: rgba(255,255,255,0.7); text-transform: uppercase;">Realty</span></div>
          </a>"""

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    content = content.replace('\r\n', '\n')
    
    if header_find in content:
        content = content.replace(header_find, header_replace)
        print(f"Replaced header in {f}")
    elif header_find.replace('\n', '\r\n') in content.replace('\n', '\r\n'):
        # Fallback if somehow mixed
        pass
        
    # more robust replacement by ignoring exact newline format in find strings
    header_find_norm = header_find.replace('\r\n', '\n')
    footer_find_norm = footer_find.replace('\r\n', '\n')
    
    old_content = content
    content = content.replace(header_find_norm, header_replace)
    content = content.replace(footer_find_norm, footer_replace)
    
    if old_content != content:
        print(f"Updated {f}")
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
    else:
        print(f"No changes made to {f}")
