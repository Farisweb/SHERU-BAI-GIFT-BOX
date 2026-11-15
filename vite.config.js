import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  base: './', // Ensures relative asset paths for GitHub Pages, preview & custom domains
  resolve: {
    preserveSymlinks: true,
  },
  server: {
    port: 3000,
    open: false,
  }
});
