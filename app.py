import os
import re
from flask import Flask, render_template, request, jsonify, send_from_directory
from flask_wtf.csrf import CSRFProtect, generate_csrf
from dotenv import load_dotenv
from models import db, Partner

# Load environment variables
load_dotenv()

app = Flask(__name__)
csrf = CSRFProtect(app)

# Configuration
app.config['SECRET_KEY'] = os.environ.get('SECRET_KEY', 'dev-fallback-secret')
db_url = os.environ.get('DATABASE_URL', '')
# Only use PostgreSQL if explicitly configured. Default to SQLite for local dev.
if not db_url or 'postgresql' not in db_url:
    db_url = 'sqlite:///local_fallback.db'
app.config['SQLALCHEMY_DATABASE_URI'] = db_url
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

# Initialize extensions
db.init_app(app)

# Create tables within app context
with app.app_context():
    db.create_all()

# Main Route
@app.route('/')
def index():
    return render_template('index.html')

# API Registration Route
@app.route('/api/register', methods=['POST'])
def register():
    data = request.get_json()
    
    if not data:
        return jsonify({'success': False, 'message': 'No data provided'}), 400

    name = data.get('name', '').strip()
    email = data.get('email', '').strip()
    phone = data.get('phone', '').strip()

    # Server-side validation matching frontend logic
    errors = []
    # Strict regex matching validation.js
    email_regex = r'^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$'
    phone_regex = r'^\+?[\d\s\-()]{10,20}$'

    if not name or len(name.strip()) < 2:
        errors.append('Full name must be at least 2 characters.')
    
    if not email or not re.match(email_regex, email):
        errors.append('Please enter a valid email address.')
    
    if not phone or not re.match(phone_regex, phone):
        errors.append('Please enter a valid phone number (at least 10 digits).')

    if errors:
        return jsonify({'success': False, 'message': errors[0], 'errors': errors}), 400

    # Check if email already exists
    existing_partner = Partner.query.filter_by(email=email).first()
    if existing_partner:
        return jsonify({'success': False, 'message': 'Email is already registered.'}), 409

    try:
        new_partner = Partner(
            full_name=name,
            email=email,
            phone_number=phone
        )
        db.session.add(new_partner)
        db.session.commit()
        return jsonify({'success': True, 'message': 'Partner registered successfully'})
    except Exception as e:
        db.session.rollback()
        # Log exception in a real app
        return jsonify({'success': False, 'message': 'An internal error occurred.'}), 500

# SEO Routes
@app.route('/robots.txt')
def robots():
    return send_from_directory('static/seo', 'robots.txt')

@app.route('/sitemap.xml')
def sitemap():
    return send_from_directory('static/seo', 'sitemap.xml')

if __name__ == '__main__':
    app.run(debug=True, port=5001)
