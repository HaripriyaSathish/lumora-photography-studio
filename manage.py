#!/usr/bin/env python
"""
Root-level Django manage.py wrapper for LUMORA Photography Studio.
Allows running `python manage.py <command>` directly from root directory or inside backend/.
"""
import os
import sys
from pathlib import Path

# Add backend directory to sys.path
backend_dir = Path(__file__).resolve().parent / 'backend'
if str(backend_dir) not in sys.path:
    sys.path.insert(0, str(backend_dir))

def main():
    """Run administrative tasks."""
    os.environ.setdefault('DJANGO_SETTINGS_MODULE', 'lumora_studio.settings')
    try:
        from django.core.management import execute_from_command_line
    except ImportError as exc:
        raise ImportError(
            "Couldn't import Django. Please ensure your virtual environment is active "
            "and dependencies are installed: pip install -r backend/requirements.txt"
        ) from exc
    execute_from_command_line(sys.argv)

if __name__ == '__main__':
    main()
