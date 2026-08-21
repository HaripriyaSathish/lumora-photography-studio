# 📷 LUMORA Photography Studio — Full-Stack Project

Modern photography atelier web platform built with **Django REST Framework (Backend)** and **React + TypeScript + Vite + Tailwind CSS (Frontend)**.

---

## 📁 Project Architecture

```
lumora-photography-studio/
├── backend/                       # 🐍 Django REST Framework Backend
│   ├── manage.py                  # Django CLI manager
│   ├── requirements.txt           # Python dependencies
│   ├── seed.py                    # Initial database populator
│   ├── lumora_studio/             # Core settings & root routing
│   └── studio_api/                # Models, Serializers, Views & Admin
│
├── frontend/                      # ⚛️ React + TypeScript + Vite Frontend
│   ├── package.json               # Frontend dependencies & scripts
│   ├── vite.config.ts             # Vite config (Port 5173 + API Proxy)
│   ├── src/                       # Components, Gallery, Lightbox, etc.
│   └── index.html
│
└── manage.py                      # Root wrapper (allows running python manage.py from root)
```

---

## 🚀 How to Run the Project

### 1️⃣ Step 1: Start the Backend (Django on Port 8000)

Open **Terminal 1** in the project directory:

```bash
# Navigate to the backend folder
cd backend

# Create Python virtual environment (if not already created)
python -m venv venv

# Activate virtual environment:
# On Windows PowerShell:
.\venv\Scripts\Activate.ps1
# On Windows Command Prompt (cmd):
# .\venv\Scripts\activate.bat
# On macOS / Linux:
# source venv/bin/activate

# Install all Python dependencies
pip install -r requirements.txt

# Run migrations (creates SQLite database out-of-the-box)
python manage.py migrate

# (Optional) Seed the database with sample curated masterworks, packages & categories
python seed.py

# (Optional) Create Django Superuser for the admin portal (/admin)
python manage.py createsuperuser

# Start the Django server on port 8000
python manage.py runserver 8000
```
> 🌐 Backend API is now live at: **`http://127.0.0.1:8000/api/`**  
> 🛡️ Django Admin Portal: **`http://127.0.0.1:8000/admin/`**

---

### 2️⃣ Step 2: Start the Frontend (React Vite on Port 5173)

Open **Terminal 2** in the project directory:

```bash
# Navigate to the frontend folder
cd frontend

# Install Node dependencies
npm install

# Start the Vite development server (Port 5173)
npm run dev
```
> 🌐 Frontend Application is now live at: **`http://localhost:5173`**  
> *(All `/api/*` calls from port 5173 are automatically proxied to Django on port 8000)*

---

### 🛠️ Troubleshooting PowerShell Script Execution

If Windows PowerShell blocks `Activate.ps1` with an execution policy error, run this once:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```
Then run:
```powershell
.\venv\Scripts\Activate.ps1
```
