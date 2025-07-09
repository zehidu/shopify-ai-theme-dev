# Shopify AI Theme Development Setup

This repository provides a complete setup for AI coding agents (Windsurf, Claude, Cursor) to make live, reviewable changes to Shopify themes through GitHub integration.

## 🚀 Quick Start

1. **Fork this repo** and connect it to your Shopify store
2. **Set up environment variables** (see `.env.example`)
3. **Install dependencies**: `npm install`
4. **Run development**: `npm run dev`

## 📁 Project Structure

```
shopify-ai-theme-dev/
├── .github/workflows/     # CI/CD workflows
├── assets/               # Theme assets (CSS, JS, images)
├── config/              # Theme configuration
├── layout/              # Theme layout files
├── locales/             # Translation files
├── sections/            # Theme sections
├── snippets/            # Reusable code snippets
├── templates/           # Page templates
├── scripts/             # Build and deployment scripts
├── tests/               # Automated tests
└── docs/                # Documentation
```

## 🔧 Setup Instructions

### 1. Shopify Store Connection

1. Go to **Online Store → Themes → Add theme → Connect from GitHub**
2. Select this repository and branch
3. Enable **Shopify GitHub App** for two-way sync

### 2. Environment Configuration

Copy `.env.example` to `.env` and fill in your credentials:

```bash
# Shopify Store Configuration
SHOPIFY_STORE_URL=your-store.myshopify.com
SHOPIFY_ACCESS_TOKEN=your_development_token
SHOPIFY_THEME_ID=your_dev_theme_id

# GitHub Configuration
GITHUB_TOKEN=your_github_pat_token
GITHUB_REPO=username/repo-name

# Development Settings
NODE_ENV=development
```

### 3. AI Agent Configuration

#### For Windsurf:
- Open this repo in Windsurf Editor
- Add custom MCP actions:
  - `run_tests` → `npm run test`
  - `deploy_dev` → `npm run deploy:dev`
  - `theme_check` → `npm run theme:check`

#### For Claude/Cursor:
- Use the provided CLI wrapper scripts in `/scripts`

## 🛠️ Available Commands

```bash
# Development
npm run dev              # Start development server
npm run build           # Build theme assets
npm run watch           # Watch for changes

# Testing & Quality
npm run test            # Run all tests
npm run test:visual     # Run visual regression tests
npm run theme:check     # Shopify theme linting
npm run lint            # Lint CSS/JS

# Deployment
npm run deploy:dev      # Deploy to development theme
npm run deploy:staging  # Deploy to staging theme
npm run deploy:prod     # Deploy to production theme
```

## 🔄 Workflow

1. **AI makes changes** → Creates PR
2. **CI runs tests** → Validates code quality
3. **Deploy to dev theme** → Preview changes
4. **Human review** → Approve/request changes
5. **Merge to main** → Auto-deploy to production

## 🧪 Testing Strategy

- **Theme Check**: Liquid syntax validation
- **Visual Tests**: Playwright screenshots
- **Performance Tests**: Lighthouse CI
- **Unit Tests**: JavaScript functionality

## 📋 AI Agent Guidelines

When working with this codebase:

1. **Always run tests** before proposing changes
2. **Use semantic commits** for clear history
3. **Test on dev theme** before production
4. **Follow Shopify best practices** for performance
5. **Maintain accessibility standards**

## 🔒 Security

- Development tokens only (never production)
- Secrets stored in `.env` (not committed)
- Fine-grained GitHub permissions
- Automated security scanning

## 📚 Resources

- [Shopify Theme Development](https://shopify.dev/themes)
- [Liquid Template Language](https://shopify.github.io/liquid/)
- [Theme Inspector](https://shopify.dev/themes/tools/theme-inspector)
