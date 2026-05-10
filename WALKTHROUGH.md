# Project Walkthrough: Youth Magnets Gauteng

This document explains the architecture of the Youth Magnets Gauteng website and provides instructions for maintenance and deployment.

## 1. Project Architecture

The application is built using a modern **Flask** backend and a **Vanilla JavaScript** frontend, following the MASUVE (Power-Packed) aesthetic.

- **Backend**: Python Flask handles API routing, server-side validation, and database interactions.
- **Frontend**: HTML5, CSS3 (Vanilla), and ES6+ Modules. Animations are powered by **GSAP** and **ScrollTrigger**.
- **Database**: **PostgreSQL** (via SQLAlchemy) stores partner registrations.
- **Security**: **Flask-WTF** provides CSRF protection. Environment variables manage sensitive data.

## 2. Rotating Exposed Database Credentials

If your database credentials (like the Neon PostgreSQL URI) are exposed, follow these steps immediately:

1. **Rotate Password**: Go to your [Neon Dashboard](https://console.neon.tech/), navigate to your project, and click "Reset Password" for your database user.
2. **Update Environment**: Update the `DATABASE_URL` in your `.env` file on your local machine and your production server.
3. **Clear Git Cache**: If the credentials were committed, remove the file from history:
   ```bash
   git rm --cached .env
   git commit -m "Remove sensitive .env from tracking"
   git push origin main
   ```

## 3. Production Deployment

### Option A: Render (Recommended for Flask)
1. Create a new "Web Service" on [Render](https://render.com/).
2. Connect your GitHub repository.
3. Set **Environment Variables**:
   - `DATABASE_URL`: Your PostgreSQL URI.
   - `SECRET_KEY`: A long, random string.
   - `PYTHON_VERSION`: `3.10.0` or higher.
4. Build Command: `pip install -r requirements.txt`
5. Start Command: `gunicorn app:app`

### Option B: Vercel (Using Python Runtime)
1. Install Vercel CLI: `npm i -g vercel`
2. Run `vercel` in the project root.
3. Configure `vercel.json` if necessary (though the current structure is standard).

## 4. Maintenance

- **Adding Merch**: To add new items, update the `mil-merch-grid` in `templates/index.html` and place images in `static/img/merch/`.
- **Database Changes**: If you modify `models.py`, use `Flask-Migrate` to update the database schema.
