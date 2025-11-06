import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// ✅ Production-ready config for Kubernetes + NGINX + Ingress
export default defineConfig({
  plugins: [react()],
  base: '/', // <-- VERY important! ensures correct asset paths when served by NGINX

  server: {
    host: '0.0.0.0', // allows running inside Docker
    port: 5173,      // used for local dev only
  },

  build: {
    outDir: 'dist',  // output directory for NGINX
  },
});

