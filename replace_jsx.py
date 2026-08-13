with open('frontend/src/App.jsx', 'r', encoding='utf-8') as f:
    content = f.read()

content = content.replace("'http://127.0.0.1:8000/api/", "`\\${import.meta.env.VITE_API_BASE_URL}/api/")

content = content.replace("/settings/'", "/settings/`")
content = content.replace("/about_us/'", "/about_us/`")
content = content.replace("/college/'", "/college/`")
content = content.replace("/domains/'", "/domains/`")
content = content.replace("/events/'", "/events/`")
content = content.replace("/leadership/leaders/'", "/leadership/leaders/`")
content = content.replace("/leadership/mentors/'", "/leadership/mentors/`")
content = content.replace("/core-team/'", "/core-team/`")
content = content.replace("/guest-speakers/'", "/guest-speakers/`")
content = content.replace("/candidates/',", "/candidates/`,")

with open('frontend/src/App.jsx', 'w', encoding='utf-8') as f:
    f.write(content)
