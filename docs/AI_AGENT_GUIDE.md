# AI Agent Development Guide

This guide provides specific instructions for AI coding agents (Windsurf, Claude, Cursor) working with this Shopify theme codebase.

## 🤖 AI Agent Setup

### Windsurf Configuration

1. **Open Project**: Load this repository in Windsurf Editor
2. **MCP Actions**: Add these custom actions in Settings → MCP:

```json
{
  "actions": [
    {
      "name": "run_tests",
      "command": "npm run test",
      "description": "Run all theme tests and linting"
    },
    {
      "name": "deploy_dev",
      "command": "node scripts/ai-deploy.js safe-deploy",
      "description": "Safe deployment to development theme"
    },
    {
      "name": "theme_check",
      "command": "npm run theme:check",
      "description": "Run Shopify theme validation"
    },
    {
      "name": "preview_dev",
      "command": "npm run preview",
      "description": "Open development theme preview"
    }
  ]
}
```

### Claude/Cursor Setup

Use the provided CLI wrapper:

```bash
# Test changes
node scripts/ai-deploy.js test

# Deploy to development
node scripts/ai-deploy.js safe-deploy --title "AI: Updated header styling"

# Skip tests (use carefully)
node scripts/ai-deploy.js safe-deploy --skip-tests
```

## 📋 Development Workflow

### 1. Before Making Changes

```bash
# Always run tests first
npm run test

# Check current theme status
shopify theme list
```

### 2. Making Changes

- **Small Changes**: Edit files directly, then run `npm run theme:check`
- **Large Changes**: Create feature branch, make changes, test thoroughly
- **Critical Changes**: Always test on development theme first

### 3. Testing Changes

```bash
# Run all tests
npm run test

# Visual regression tests
npm run test:visual

# Performance check
npm run lighthouse
```

### 4. Deployment

```bash
# Safe deployment (recommended)
node scripts/ai-deploy.js safe-deploy

# Manual deployment
npm run deploy:dev
```

## 🎯 AI Agent Best Practices

### Code Quality Standards

1. **Always validate Liquid syntax** before committing
2. **Follow Shopify theme best practices**
3. **Maintain accessibility standards** (WCAG 2.1 AA)
4. **Optimize for performance** (Core Web Vitals)
5. **Test across devices** and browsers

### File Structure Guidelines

```
├── assets/          # CSS, JS, images
├── config/          # Theme settings
├── layout/          # Base templates
├── locales/         # Translations
├── sections/        # Reusable sections
├── snippets/        # Small reusable components
├── templates/       # Page templates
└── tests/           # Automated tests
```

### Liquid Template Rules

1. **Use semantic HTML5** elements
2. **Include proper meta tags** for SEO
3. **Implement lazy loading** for images
4. **Add structured data** where appropriate
5. **Ensure mobile responsiveness**

### CSS Guidelines

1. **Use CSS custom properties** for theming
2. **Follow BEM methodology** for class naming
3. **Implement mobile-first** responsive design
4. **Optimize for performance** (minimize unused CSS)
5. **Use modern CSS features** (Grid, Flexbox)

### JavaScript Best Practices

1. **Use vanilla JavaScript** when possible
2. **Implement progressive enhancement**
3. **Add proper error handling**
4. **Optimize for performance** (lazy loading, debouncing)
5. **Ensure accessibility** (keyboard navigation, ARIA)

## 🔍 Common Tasks

### Adding New Section

```bash
# Create section file
touch sections/new-section.liquid

# Add section schema
# Test section in theme customizer
# Add visual tests
```

### Modifying Existing Template

```bash
# Check current implementation
npm run theme:check

# Make changes
# Test changes
npm run test:visual

# Deploy to dev
npm run deploy:dev
```

### Performance Optimization

```bash
# Run performance audit
npm run lighthouse

# Check bundle size
npm run build

# Optimize images
# Minimize CSS/JS
# Implement lazy loading
```

## 🚨 Safety Protocols

### Pre-deployment Checklist

- [ ] All tests pass (`npm run test`)
- [ ] Theme check passes (`npm run theme:check`)
- [ ] Visual tests pass (`npm run test:visual`)
- [ ] Performance meets thresholds
- [ ] Accessibility standards maintained
- [ ] Cross-browser compatibility verified

### Error Handling

1. **Liquid Errors**: Always check theme-check output
2. **JavaScript Errors**: Test in browser console
3. **CSS Issues**: Validate with stylelint
4. **Performance Issues**: Run Lighthouse audit

### Rollback Procedures

```bash
# Revert to previous version
git revert HEAD

# Deploy previous version
shopify theme push --live

# Check deployment status
shopify theme list
```

## 📊 Monitoring & Analytics

### Performance Metrics

- **Core Web Vitals**: LCP, FID, CLS
- **Page Load Speed**: < 3 seconds
- **Bundle Size**: CSS < 100KB, JS < 100KB
- **Image Optimization**: WebP format, lazy loading

### Quality Metrics

- **Theme Check**: 0 errors, minimal warnings
- **Accessibility**: WCAG 2.1 AA compliance
- **SEO**: Proper meta tags, structured data
- **Cross-browser**: Chrome, Firefox, Safari, Edge

## 🔧 Troubleshooting

### Common Issues

1. **Liquid Syntax Errors**: Run `theme-check .`
2. **Asset Loading Issues**: Check file paths and URLs
3. **Performance Issues**: Optimize images and minimize code
4. **Responsive Issues**: Test on multiple devices
5. **Accessibility Issues**: Use screen reader testing

### Debug Commands

```bash
# Check theme status
shopify theme list

# View theme logs
shopify theme dev --verbose

# Test specific component
npm run test -- --grep "component-name"

# Check bundle analysis
npm run build -- --analyze
```

## 📚 Resources

- [Shopify Theme Development](https://shopify.dev/themes)
- [Liquid Documentation](https://shopify.github.io/liquid/)
- [Theme Inspector](https://shopify.dev/themes/tools/theme-inspector)
- [Performance Best Practices](https://shopify.dev/themes/best-practices/performance)
- [Accessibility Guidelines](https://shopify.dev/themes/best-practices/accessibility)
