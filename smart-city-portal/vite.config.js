import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  preview: {
    host: "0.0.0.0", // ✅ Ensure it binds to all interfaces
  },
  root: ".",  
  publicDir: "public",
  build: {
    outDir: "dist",
    rollupOptions: {
      input: "public/index.html",
    },
  },
  server: {
    host: "0.0.0.0", // ✅ Required for Render
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
