# LinkDrop — Gestionnaire de liens

> Crée ta page de liens personnalisée en 30 secondes

🔗 **Live demo** : https://linkdrop.vercel.app

![Dashboard](https://via.placeholder.com/800x400/7c3aed/ffffff?text=LinkDrop+Dashboard)

## Features

- Auth complète (JWT, register/login)
- Ajoute, supprime et réordonne tes liens (drag & drop)
- Page publique `/:username` partageable
- Analytics de clics en temps réel
- Design responsive violet

## Stack

| Frontend | Backend | Base de données |
|---|---|---|
| React 19 | Node.js + Express | PostgreSQL |
| Tailwind CSS | JWT Auth | Railway |
| @dnd-kit | REST API | — |
| Vercel | Railway | — |

## Run locally

```bash
# Backend
cd backend
cp .env.example .env   # configure DATABASE_URL et JWT_SECRET
npm install
npm run dev

# Frontend
cd frontend
npm install
npm run dev
```

## API Endpoints

| Méthode | Route | Description |
|---|---|---|
| POST | /api/auth/register | Créer un compte |
| POST | /api/auth/login | Se connecter |
| GET | /api/links | Mes liens (auth) |
| POST | /api/links | Ajouter un lien (auth) |
| DELETE | /api/links/:id | Supprimer (auth) |
| GET | /api/links/profile/:username | Page publique |
| POST | /api/links/:id/click | Tracker un clic |