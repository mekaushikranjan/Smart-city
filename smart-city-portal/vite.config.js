import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  preview: {
    port: process.env.PORT || 3000,  // Use Render’s assigned port
    host: "0.0.0.0",
  },
  root: ".",  // Ensure Vite uses the correct root directory
  publicDir: "public", // Ensure Vite finds static assets
  build: {
    outDir: "dist",
    rollupOptions: {
      input: "index.html", // Corrected: Rollup expects index.html in root
    },
  },
  server: {
    host: "0.0.0.0", // Allow external access (important for Render)
    port: 3000, // Default port for local development
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
