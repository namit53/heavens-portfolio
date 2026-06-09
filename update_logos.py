import os
import glob

# Search directory
dir_path = "d:/OneDrive - UPES/Documents/website_heaven2"
html_files = glob.glob(os.path.join(dir_path, "*.html"))

for file_path in html_files:
    with open(file_path, "r", encoding="utf-8") as f:
        content = f.read()
    
    # Track if changes were made
    original_content = content
    
    # 1. Replace alt text
    content = content.replace(
        'alt="Heaven\'s Portfolio Realty Logo"',
        'alt="Heaven\'s Portfolio Real Estate Solutions Pvt. Ltd. Logo"'
    )
    
    # 2. Replace the Realty text in the span
    old_span = '<span style="font-size: 0.55em; letter-spacing: 0.25em; color: rgba(255,255,255,0.7); text-transform: uppercase;">Realty</span>'
    new_span = '<span style="font-size: 0.55em; letter-spacing: 0.25em; color: rgba(255,255,255,0.7); text-transform: uppercase;">Real Estate Solutions Pvt. Ltd.</span>'
    content = content.replace(old_span, new_span)
    
    if content != original_content:
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Updated {os.path.basename(file_path)}")
