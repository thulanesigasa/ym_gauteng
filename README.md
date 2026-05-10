# Youth Magnets Gauteng

A production-ready Python Flask application serving the Youth Magnets Gauteng landing page. Built with Vanilla JS micro-interactions, CSS variables for a strict Blue/Black/White aesthetic, and a PostgreSQL backend for handling partner registrations.

## Features
- **Strict Visual Identity**: Clean Blue, Black, and White palette with CSS glassmorphism.
- **Micro-Interactions**: Lenis smooth scrolling and Intersection Observer reveal animations.
- **Database Backend**: PostgreSQL managed via SQLAlchemy.
- **Production SEO**: Dynamic serving of `robots.txt` and `sitemap.xml` directly from the root URL.
- **Robust Registration**: Cross-layer validation for the YVP form (Sanitized frontend JS -> Flask API validation -> Database commit).

## Project Structure
```text
/
├── app.py               # Flask application and API routes
├── models.py            # SQLAlchemy database models
├── requirements.txt     # Python dependencies
├── .env                 # Environment variables (Create this based on .env.example)
├── templates/
│   └── index.html       # Jinja2 template for the main site
└── static/
    ├── css/style.css    # Core styling and variables
    ├── js/app.js        # Core interactivity and fetch logic
    ├── js/validation.js # Form validation module
    └── seo/             # SEO files served at the root via Flask routes
```

## Local Development Setup

### 1. Prerequisites
- Python 3.10+
- PostgreSQL server

### 2. Installation
Clone the repository and install the dependencies:
```bash
python -m venv venv
# Windows
venv\Scripts\activate
# macOS/Linux
source venv/bin/activate

pip install -r requirements.txt
```

### 3. Environment Variables
Create a `.env` file in the root directory:
```env
SECRET_KEY=your-development-secret-key
DATABASE_URL=postgresql://postgres:password@localhost:5432/youtmagnets
FLASK_APP=app.py
FLASK_ENV=development
```

### 4. Database Initialization
Ensure your local PostgreSQL server is running and you have created a database named `youtmagnets` (or whatever you named it in the `.env` file). The tables will be created automatically when you run the app.

### 5. Running the Application
```bash
flask run
```
Visit `http://localhost:5000` to view the website.

## Production Roadmap
- **Database Migrations**: Integrate `Flask-Migrate` to handle schema changes over time.
- **Security**: Implement Flask-WTF for CSRF protection on API endpoints.
- **Deployment**: Use `gunicorn` as the WSGI server and `Nginx` as a reverse proxy to serve traffic securely.
