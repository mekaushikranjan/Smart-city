import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  preview: {
    port: parseInt(process.env.PORT) || 3000,
    host: "0.0.0.0",
  },
  root: ".",  
  publicDir: "public",
  build: {
    outDir: "dist",
    rollupOptions: {
      input: "public/index.html",  // ✅ Fix: Correct the input path
    },
  },
  server: {
    host: "0.0.0.0",
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        changeOrigin: true,
        secure: false,
      },
    },
  },
});
