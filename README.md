# Youth Magnets Gauteng | Full-Stack Flask Application

A professional, production-ready Python Flask application serving the Youth Magnets Gauteng platform. This project features a robust PostgreSQL backend, strict Blue/Black/White aesthetic, and enterprise-grade security including CSRF protection and multi-layer data validation.

## Core Features
- **Premium Design System**: Sophisticated Blue (#0056b3), Black (#000000), and White (#ffffff) palette.
- **High-End UX**: Custom cursor interactions, smooth parallax effects, and GSAP-powered animations.
- **Database Architecture**: PostgreSQL backend with SQLAlchemy ORM and registration auditing.
- **Security First**: CSRF protection (Flask-WTF), input sanitization, and secure environment management.
- **Production SEO**: Automated serving of `robots.txt` and `sitemap.xml` from the domain root.

## Project Structure
```text
/
├── app.py               # Flask Application & API Logic
├── models.py            # Database Models (SQLAlchemy)
├── requirements.txt     # Python Dependencies
├── .env                 # Local Environment Config (DO NOT TRACK)
├── .gitignore           # Version Control Exclusions
├── static/
│   ├── css/theme-style.css  # Main Theme Styles
│   ├── css/style.css        # Custom Alignment & UI Tweaks
│   ├── js/theme-main.js     # GSAP & Theme Core Logic
│   ├── js/app.js            # Frontend API & Form Logic
│   ├── js/validation.js     # Sanitization Module
│   └── seo/                 # SEO Assets
└── templates/
    └── index.html           # Main Jinja2 Template
```

## Local Development Setup

### 1. Prerequisites
- Python 3.x
- PostgreSQL (Local or Neon.tech)
- Git

### 2. Installation & Virtual Environment
```bash
# Create and activate virtual environment
python -m venv venv
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Environment Configuration
Create a `.env` file in the root directory (never commit this file):
```env
SECRET_KEY=your_secure_random_key
DATABASE_URL=postgresql://user:password@localhost:5432/youtmagnets
FLASK_APP=app.py
FLASK_DEBUG=1
```

### 4. Database Initialisation
This app uses Flask-SQLAlchemy. To initialize the database:
```bash
# The app will automatically create tables on first run via:
# db.create_all() in app.py
python app.py
```
*Note: For production schema management, it is recommended to use Flask-Migrate.*

### 5. Running the Application
```bash
python app.py
```
Default local access: `http://127.0.0.1:5001` (to avoid common port conflicts).

## Security Measures
- **CSRF Protection**: All POST requests are protected via Flask-WTF.
- **Data Validation**: Multi-layer regex validation on both client (JS) and server (Python).
- **Git Hygiene**: Environment variables are excluded from version control to prevent credential exposure.

## Constraints Adherence
- **Vanilla JavaScript**: Zero heavy frontend frameworks.
- **Typography**: Strictly "Outfit" sans-serif.
- **No Emdashes**: All textual content uses standard dashes.
- **Color Palette**: Locked to Blue/Black/White hierarchy.
