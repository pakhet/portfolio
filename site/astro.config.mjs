import { defineConfig } from 'astro/config';

// Fully static output: the container only serves files, no server-side code.
export default defineConfig({
  output: 'static',
  trailingSlash: 'never',
  build: {
    format: 'file',
    // Always emit CSS as files so the CSP can be `style-src 'self'` with no 'unsafe-inline'.
    inlineStylesheets: 'never',
  },
  compressHTML: true,
});
