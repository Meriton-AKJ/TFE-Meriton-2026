# Meriton Hotel — TFE 2025-2026

Application web de réservation d'hôtel.
## Stack technique

- **Frontend** : React 19 + Vite
- **Backend** : Express 5 + Prisma ORM
- **Base de données** : MariaDB (Docker en local, Clever Cloud en production)
- **Auth** : JWT (7 jours)
- **Images** : Cloudinary

## Installation

### Prérequis
- Node.js
- Docker Desktop

### 1. Cloner le projet

```bash
git clone https://github.com/ton-user/TFE-Meriton.git
cd TFE-Meriton
```

### 2. Démarrer la base de données

```bash
cd api
docker-compose up -d
```

### 3. Variables d'environnement

Créer un fichier `api/.env` :

```
PORT=3000
JWT_SECRET=...
DB_URL=mysql://root:passw0rd!@localhost:3306/tfe_meriton
CLOUDINARY_CLOUD_NAME=...
CLOUDINARY_API_KEY=...
CLOUDINARY_API_SECRET=...
```

### 4. Installer les dépendances et lancer

```bash
# API
cd api
npm install
npx prisma migrate dev --name init
npm run dev

# Client (dans un autre terminal)
cd client
npm install
npm run dev
```

## Accès

| URL | Description |
|---|---|
| http://localhost:5173 | Site client |
| http://localhost:3000 | API |
| http://localhost:8080 | PHPMyAdmin |

## Back-office admin

Accessible sur `/admin` avec un compte dont le rôle est `ADMIN`.

Fonctionnalités : dashboard, réservations, utilisateurs, messages, chambres, export CSV.
