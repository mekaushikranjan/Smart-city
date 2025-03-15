import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  root: ".",  // Ensure Vite uses the correct root directory
  publicDir: "public", // Ensure Vite finds index.html
  build: {
    outDir: "dist",
    rollupOptions: {
      input: "public/index.html", // Explicitly tell Rollup where to find index.html
    },
  },
  server: {
    port: process.env.PORT || 3000, // Use Render's provided PORT
    host: "0.0.0.0",
    preview: {
      port: process.env.PORT || 3000,
      host: "0.0.0.0",
    },
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
