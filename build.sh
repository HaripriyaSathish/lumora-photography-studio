#!/usr/bin/env bash
# Exit on error
set -o errexit

echo "--- Installing Frontend Dependencies & Building React ---"
cd frontend
npm install
npm run build
cd ..

echo "--- Installing Python Backend Dependencies ---"
cd backend
pip install -r requirements.txt
pip install gunicorn whitenoise

echo "--- Collecting Static Files & Migrating DB ---"
python manage.py collectstatic --no-input
python manage.py migrate