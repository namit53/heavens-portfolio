import os

target_content = """          <a href="index.html" class="footer-logo" style="margin-bottom: 1.25rem; align-items: center; gap: 1rem;">
            <img src="logo-transparent.svg" alt="Heaven's Portfolio Logo" style="height: 60px;">
            <div class="logo-wordmark">
              <span class="logo-name" style="font-size: 1.25rem;">Heaven's <em>Portfolio</em></span>
              <span class="logo-sub" style="font-size: 0.6rem; letter-spacing: 0.12em; line-height: 1.35; margin-top: 2px; margin-left: 0;">REAL ESTATE SOLUTIONS<br>PRIVATE LTD.</span>
            </div>
          </a>"""

replacement_content = """          <a href="index.html" class="footer-logo">
            <img src="logo-transparent.svg" alt="Heaven's Portfolio Logo" class="footer-logo-img">
            <div class="logo-wordmark">
              <span class="logo-name">Heaven's <em>Portfolio</em></span>
              <span class="logo-sub">REAL ESTATE SOLUTION<br>PRIVATE LTD.</span>
            </div>
          </a>"""

files = ['about.html', 'blog.html', 'careers.html', 'contact.html', 'index.html', 'properties.html', 'rent-lease.html', 'sell.html']

for f in files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    # We will try exact replace first
    if target_content in content:
        content = content.replace(target_content, replacement_content)
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
        print(f"Replaced in {f}")
    else:
        # Fallback to replacing line by line just in case line endings differ
        # Normalize line endings
        normalized_content = content.replace('\r\n', '\n')
        normalized_target = target_content.replace('\r\n', '\n')
        if normalized_target in normalized_content:
            new_content = normalized_content.replace(normalized_target, replacement_content)
            # Just write it back, python 'w' mode with utf-8 might use default line endings or just \n
            with open(f, 'w', encoding='utf-8') as file:
                file.write(new_content)
            print(f"Replaced in {f} (normalized)")
        else:
            print(f"Target not found in {f}")
