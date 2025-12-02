# Protected Documentation Template

This is a template for creating protected documentation sites using [Docusaurus](https://docusaurus.io/) with authentication via [PocketBase](https://pocketbase.io/). It is designed to be deployed on [Cloudflare Pages](https://pages.cloudflare.com/).

## Features

- Docusaurus-based documentation site
- OAuth authentication via PocketBase
- Group-based access control
- Cloudflare Pages deployment with edge middleware

## Installation

```bash
npm install
```

## Local Development

```bash
npm start
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.

**Note:** Authentication is not active in local development mode.

## Build

```bash
npm run build
```

This command generates static content into the `build` directory.

## Deployment on Cloudflare Pages

### 1. Connect your repository

1. Go to [Cloudflare Pages](https://pages.cloudflare.com/)
2. Create a new project and connect your GitHub repository
3. Configure the build settings:
   - **Build command:** `npm run build`
   - **Build output directory:** `build`
   - **Node.js version:** `22` (set via environment variable `NODE_VERSION`)

### 2. Configure environment variables

In your Cloudflare Pages project settings, add the following environment variables:

| Variable | Description | Example |
|----------|-------------|---------|
| `POCKETBASE_URL` | Your PocketBase instance URL | `https://api.example.com` |
| `POCKETBASE_GROUP` | The group field for access control | `members` |
| `POCKETBASE_URL_MICROSOFT` | (Optional) Separate URL for Microsoft OAuth | `https://api.example.com` |
| `NODE_VERSION` | Node.js version for build | `22` |

### 3. Deploy

Push to your repository and Cloudflare Pages will automatically build and deploy your site.

## Authentication Flow

The authentication is handled by the `@levino/pocketbase-auth` middleware in `functions/_middleware.js`:

1. User accesses the site
2. Middleware checks for valid authentication cookie
3. If not authenticated, user is redirected to login
4. User authenticates via OAuth (GitHub, Google, Microsoft, etc.)
5. Server verifies group membership
6. Valid users get session cookie and can access the docs

## Project Structure

```
.
├── docs/                    # Documentation content (Markdown/MDX)
├── blog/                    # Blog posts
├── src/
│   ├── components/          # React components
│   ├── css/                 # Custom styles
│   └── pages/               # Custom pages
├── static/                  # Static assets
├── functions/
│   └── _middleware.js       # Cloudflare Pages auth middleware
├── docusaurus.config.ts     # Docusaurus configuration
├── sidebars.ts              # Sidebar navigation config
└── package.json
```

## Docker Deployment (Legacy)

For Docker-based deployment, see the `coolify-docker` branch.

## License

MIT
