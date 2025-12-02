# Geschützte Dokumentations-Vorlage

Eine moderne Vorlage für die Erstellung **geschützter Dokumentations-Websites** mit [Docusaurus](https://docusaurus.io/) und [PocketBase](https://pocketbase.io/)-Authentifizierung. Optimiert für [Cloudflare Pages](https://pages.cloudflare.com/).

## Features

- Docusaurus-basierte Dokumentations-Website
- OAuth-Authentifizierung über PocketBase
- Gruppenbasierte Zugriffskontrolle
- Cloudflare Pages Deployment mit Edge-Middleware

## Installation

```bash
npm install
```

## Lokale Entwicklung

```bash
npm start
```

Dieser Befehl startet einen lokalen Entwicklungsserver. Die meisten Änderungen werden live übernommen.

**Hinweis:** Die Authentifizierung ist im lokalen Entwicklungsmodus nicht aktiv.

## Build

```bash
npm run build
```

Dieser Befehl generiert statische Inhalte in das `build`-Verzeichnis.

## Deployment auf Cloudflare Pages

### 1. Repository verbinden

1. Gehe zu [Cloudflare Pages](https://pages.cloudflare.com/)
2. Erstelle ein neues Projekt und verbinde dein GitHub-Repository
3. Konfiguriere die Build-Einstellungen:
   - **Build-Befehl:** `npm run build`
   - **Build-Ausgabeverzeichnis:** `build`
   - **Node.js-Version:** `22` (über Umgebungsvariable `NODE_VERSION` setzen)

### 2. Umgebungsvariablen konfigurieren

In den Cloudflare Pages Projekteinstellungen, füge folgende Umgebungsvariablen hinzu:

| Variable | Beschreibung | Beispiel |
|----------|--------------|----------|
| `POCKETBASE_URL` | URL deiner PocketBase-Instanz | `https://api.example.com` |
| `POCKETBASE_GROUP` | Das Gruppenfeld für Zugriffskontrolle | `members` |
| `POCKETBASE_URL_MICROSOFT` | (Optional) Separate URL für Microsoft OAuth | `https://api.example.com` |
| `NODE_VERSION` | Node.js-Version für den Build | `22` |

### 3. Deployment

Push zu deinem Repository und Cloudflare Pages baut und deployed automatisch.

## Authentifizierungs-Ablauf

Die Authentifizierung wird durch die `@levino/pocketbase-auth` Middleware in `functions/_middleware.js` gehandhabt:

1. Benutzer besucht die Website
2. Middleware prüft auf gültiges Authentifizierungs-Cookie
3. Falls nicht authentifiziert, Weiterleitung zur Login-Seite
4. Benutzer authentifiziert sich über OAuth (GitHub, Google, Microsoft, etc.)
5. Server überprüft Gruppenmitgliedschaft
6. Gültige Benutzer erhalten Session-Cookie und können auf die Docs zugreifen

## Projektstruktur

```
.
├── docs/                    # Dokumentationsinhalte (Markdown/MDX)
├── blog/                    # Blog-Beiträge
├── src/
│   ├── components/          # React-Komponenten
│   ├── css/                 # Benutzerdefinierte Styles
│   └── pages/               # Benutzerdefinierte Seiten
├── static/                  # Statische Assets
├── functions/
│   └── _middleware.js       # Cloudflare Pages Auth-Middleware
├── docusaurus.config.ts     # Docusaurus-Konfiguration
├── sidebars.ts              # Sidebar-Navigation
└── package.json
```

## Docker-Deployment (Legacy)

Für Docker-basiertes Deployment siehe den `coolify-docker` Branch.

## Lizenz

MIT
