# Netlify Deployment Guide

## Issue: "Page not found" on deployed site

This is a common issue with Single Page Applications (SPAs) on Netlify. The problem occurs because Netlify tries to find actual files at routes like `/tool/some-tool-id`, but these are client-side routes handled by React Router.

## Solution

I've created the necessary files to fix this:

### 1. `public/_redirects` file
This file tells Netlify to redirect all routes to `index.html` so React Router can handle them:

```
# Handle client-side routing for React SPA
/*    /index.html   200

# Specific redirects for better SEO and user experience
/tool/*    /index.html   200
/category/*    /index.html   200
/all-tools    /index.html   200
```

### 2. `netlify.toml` file
This provides additional configuration for Netlify:

```toml
[build]
  publish = "dist"
  command = "npm run build"

[[redirects]]
  from = "/*"
  to = "/index.html"
  status = 200
```

## Deployment Steps

1. **Build the project locally** (optional, to test):
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**:
   - Connect your GitHub repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Deploy

3. **Verify the fix**:
   - After deployment, try navigating to any route like `/tool/password-generator`
   - It should now work instead of showing "Page not found"

## Alternative: Manual Netlify Settings

If the files don't work, you can also set this in Netlify's dashboard:

1. Go to **Site settings** → **Build & deploy** → **Redirects and rewrites**
2. Add a new redirect rule:
   - **From**: `/*`
   - **To**: `/index.html`
   - **Status**: `200`

## Why This Happens

- **Development**: Vite dev server handles all routes and serves `index.html` for unknown routes
- **Production**: Netlify serves static files, so `/tool/something` looks for a file that doesn't exist
- **Solution**: Redirect all routes to `index.html` so React Router can handle them client-side

The `_redirects` file is the standard way to handle this on Netlify, and it should resolve the "Page not found" issue completely.

