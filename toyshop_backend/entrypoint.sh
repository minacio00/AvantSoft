#!/bin/sh

echo "Applying database migrations..."
python manage.py migrate

echo "Creating superuser..."
python manage.py createsuperuser --noinput --email admin@example.com || true

echo "Collecting static files..."
python manage.py collectstatic --noinput

echo "Starting server..."
exec gunicorn toyshop_backend.wsgi:application \
  --bind 0.0.0.0:8000 \
  --workers 3 \
  --timeout 120
