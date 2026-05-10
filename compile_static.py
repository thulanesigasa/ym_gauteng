import re

def compile_to_static():
    with open('templates/index.html', 'r', encoding='utf-8') as f:
        content = f.read()

    # Replace Flask url_for calls with relative static paths
    # Matches: {{ url_for('static', filename='path/to/file.ext') }}
    content = re.sub(r"\{\{\s*url_for\('static',\s*filename='([^']+)'\)\s*\}\}", r"static/\1", content)
    
    # Replace csrf_token
    content = re.sub(r"\{\{\s*csrf_token\(\)\s*\}\}", "demo-mode", content)

    # Note: Form submission will fail natively on GH pages since there is no backend,
    # but the UI will render perfectly.

    with open('index.html', 'w', encoding='utf-8') as f:
        f.write(content)
        
    print("Successfully compiled templates/index.html to static root index.html")

if __name__ == "__main__":
    compile_to_static()
