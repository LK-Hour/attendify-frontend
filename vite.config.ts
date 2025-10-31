import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    postcss: './postcss.config.js',
  },
  server: {
    // Handle client-side routing in development
    middlewareMode: false,
  },
  build: {
    // Generate a 404.html that redirects to index.html
    rollupOptions: {
      output: {
        manualChunks: undefined,
      },
    },
  },
});
