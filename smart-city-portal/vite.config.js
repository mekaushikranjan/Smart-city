import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  preview: {
    port: process.env.PORT || 3000,  // Use Render’s assigned port
    host: "0.0.0.0",
  },
  root: ".",  // Ensure Vite uses the correct root directory
  publicDir: "public", // Ensure Vite finds index.html
  build: {
    outDir: "dist",
    rollupOptions: {
      input: "public/index.html", // Explicitly tell Rollup where to find index.html
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
