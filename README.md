# Gilles MEDENOU — Portfolio

Portfolio personnel de Gilles MEDENOU, Ingénieur GIT & Architecte Backend.
Construit avec Next.js 16, Supabase et Tailwind CSS v4.

## Stack

- **Framework** : Next.js 16.2 (App Router, Turbopack)
- **Base de données** : Supabase (PostgreSQL)
- **Auth** : Supabase Auth (session cookie via `@supabase/ssr`)
- **Styles** : Tailwind CSS v4
- **Animations** : Framer Motion
- **Email** : Nodemailer (SMTP Gmail)
- **Particules** : tsParticles

## Structure

```
src/
├── app/
│   ├── admin/          # Interface d'administration (protégée)
│   ├── api/            # Routes API (contact, cv, service)
│   ├── contact/        # Page services & contact
│   └── projets/        # Page projets
├── components/
│   ├── admin/          # Composants admin (nav, table, stats)
│   ├── forms/          # Formulaires contact & service
│   └── sections/       # Sections homepage (hero, skills, etc.)
├── lib/                # Clients Supabase, analytics, utils
└── types/              # Types TypeScript partagés
```

## Variables d'environnement

Créer un fichier `.env.local` à la racine :

```env
SUPABASE_URL=...
SUPABASE_SECRET_KEY=...
NEXT_PUBLIC_SUPABASE_URL=...
NEXT_PUBLIC_SUPABASE_ANON_KEY=...

MAIL_HOST=smtp.gmail.com
MAIL_PORT=587
MAIL_USER=...
MAIL_PASS=...
MAIL_FROM=...

ADMIN_EMAIL=...
```

## Développement

```bash
npm install
npm run dev
```

Ouvrir [http://localhost:3000](http://localhost:3000).

## Build

```bash
npm run build
npm start
```

## Admin

L'interface admin est accessible sur `/admin`. Elle est protégée par Supabase Auth — seul l'email défini dans `ADMIN_EMAIL` peut se connecter.

## Base de données

Le schéma SQL est disponible dans `bd.sql`. À importer dans votre projet Supabase.
