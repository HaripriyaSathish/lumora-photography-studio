#!/usr/bin/env bash
# Exit on error
set -o errexit

echo "--- Building React Frontend ---"
cd frontend
npm install
npm run build
cd ..

echo "--- Installing Backend Dependencies ---"
cd backend
pip install -r requirements.txt
pip install gunicorn whitenoise

echo "--- Collecting Static Files & Migrating SQLite ---"
python manage.py collectstatic --no-input
python manage.py migrate

echo "--- Auto-Creating Superuser if Not Exists ---"
python manage.py createsuperuser --no-input || true