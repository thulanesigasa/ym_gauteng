# Deployment Walkthrough & Security Guide

This document provides crucial steps for securing your environment and deploying the Youth Magnets Gauteng application to production.

## 🔴 CRITICAL: Security Lockdown (Neon PostgreSQL)

Because your `.env` file was previously tracked by Git and exposed your database credentials, **your Neon PostgreSQL password is compromised**. You MUST complete these steps immediately:

1. **Rotate the Password in Neon**:
   - Log in to your [Neon Dashboard](https://console.neon.tech/).
   - Navigate to your `youtmagnets` project.
   - Go to the **Roles** or **Settings** section.
   - Select your user (e.g., `postgres` or the specific user you created).
   - Click **Reset Password** and copy the new connection string.
   
2. **Update Local Environment**:
   - Open your `.env` file and replace the old `DATABASE_URL` with the new one.
   
3. **Verify Git Hygiene**:
   - I have already verified that `.env` is removed from Git tracking. You can confirm this by running `git status` locally. It should not show `.env` as an untracked file if you have `.env` inside `.gitignore`.

## 🚀 Production Deployment (Render / Heroku)

### 1. Preparing the Environment Variables
On your hosting provider (e.g., Render), navigate to the **Environment** settings for your Web Service and add the following keys:
- `SECRET_KEY`: Generate a long, random string (e.g., `python -c "import secrets; print(secrets.token_hex(32))"`).
- `DATABASE_URL`: Your NEW, secure Neon PostgreSQL connection string.
- `PYTHON_VERSION`: Set to `3.10` or higher.

### 2. WSGI Server (Gunicorn)
Your application is currently run via `python app.py` locally. In production, you must use a proper WSGI server like `gunicorn`.
- Ensure `gunicorn` is in your `requirements.txt`.
- Set the start command in your hosting provider to:
  ```bash
  gunicorn app:app
  ```

### 3. Database Migrations
Since your schema is finalized (with the `created_at` timestamp), any future changes to `models.py` will require `Flask-Migrate`.
If you deploy to a fresh database, `db.create_all()` will automatically generate the required tables upon the first request.

## 🎨 Asset Management (Merch Store)
The **Merch** section is currently populated with images from `static/assets/images/`.
When you receive the final professional photography:
1. Upload the new images to the `static/assets/images/` directory.
2. Update the `img src` paths in `templates/index.html` under the `<section id="merch">`.
3. If you want to switch back to the "Dropping Soon" banner, simply add the `hidden` class to `.mil-merch-grid` and remove it from `.mil-merch-banner`.
