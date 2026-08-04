import re
import os

filepath = os.path.join("frontend", "src", "App.jsx")
with open(filepath, "r", encoding="utf-8") as f:
    content = f.read()

if "const [theme, setTheme]" not in content:
    content = content.replace(
        "const [menuOpen, setMenuOpen] = useState(false);",
        "const [menuOpen, setMenuOpen] = useState(false);\n  const [theme, setTheme] = useState(localStorage.getItem('theme') || 'dark');\n  useEffect(() => {\n    if (theme === 'dark') {\n      document.documentElement.classList.add('dark');\n    } else {\n      document.documentElement.classList.remove('dark');\n    }\n    localStorage.setItem('theme', theme);\n  }, [theme]);"
    )

    btn_html = """
          <button onClick={() => setTheme(theme === 'dark' ? 'light' : 'dark')} className="p-2 mr-2 rounded-full border border-gray-500/30 text-gray-800 dark:text-white bg-gray-200 dark:bg-white/10 hover:bg-gray-300 dark:hover:bg-white/20 transition-all">
            {theme === 'dark' ? '☀️' : '🌙'}
          </button>
"""
    content = content.replace(
        '<button className="md:hidden text-white',
        btn_html + '          <button className="md:hidden text-gray-800 dark:text-white'
    )
    
    # Also add the button for desktop
    content = content.replace(
        '<button className="hidden md:block bg-white text-black',
        btn_html + '          <button className="hidden md:block bg-gray-900 text-white dark:bg-white dark:text-black'
    )

replacements = [
    (r'\bbg-black\b', 'bg-gray-50 dark:bg-black'),
    (r'\btext-white\b', 'text-gray-900 dark:text-white'),
    (r'\btext-\[\#ededed\]\b', 'text-gray-900 dark:text-[#ededed]'),
    (r'\bbg-white\b', 'bg-gray-900 dark:bg-white'),
    (r'\btext-black\b', 'text-gray-100 dark:text-black'),
    (r'\bborder-white/(?P<op>\d+)', r'border-black/\g<op> dark:border-white/\g<op>'),
    (r'\btext-gray-300\b', 'text-gray-700 dark:text-gray-300'),
    (r'\btext-gray-400\b', 'text-gray-600 dark:text-gray-400'),
    (r'\bbg-black/(?P<op>\d+)', r'bg-white/\g<op> dark:bg-black/\g<op>'),
    (r'\bfrom-white\b', 'from-black dark:from-white'),
]

for old, new in replacements:
    content = re.sub(old, new, content)

with open(filepath, "w", encoding="utf-8") as f:
    f.write(content)

print("Refactored App.jsx")
