import os
import glob

html_files = glob.glob('d:/OneDrive - UPES/Documents/website_heaven2/*.html')
for f in html_files:
    with open(f, 'r', encoding='utf-8') as file:
        content = file.read()
    
    phone_link = '''
        <a href="tel:+919899335602" class="nav-link nav-link--mobile-phone">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="margin-right: 6px;"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg>
          +91 9899 3356 02
        </a>'''

    if 'nav-link--mobile-phone' not in content:
        if '<a href="contact.html" class="nav-link active">Contact Us</a>' in content:
            content = content.replace('<a href="contact.html" class="nav-link active">Contact Us</a>', '<a href="contact.html" class="nav-link active">Contact Us</a>' + phone_link)
        elif '<a href="contact.html" class="nav-link">Contact Us</a>' in content:
            content = content.replace('<a href="contact.html" class="nav-link">Contact Us</a>', '<a href="contact.html" class="nav-link">Contact Us</a>' + phone_link)
            
        with open(f, 'w', encoding='utf-8') as file:
            file.write(content)
    print(f'Processed {f}')
