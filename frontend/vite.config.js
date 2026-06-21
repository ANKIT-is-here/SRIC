import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

const proxyTarget = process.env.VITE_PROXY_TARGET || 'http://localhost:8000';

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    host: true,
    watch: {
      usePolling: true,
    },
    proxy: {
      '/upload': proxyTarget,
      '/stats': proxyTarget,
      '/search': proxyTarget,
      '/conjunctive-search': proxyTarget,
      '/download': proxyTarget,
      '/reset': proxyTarget,
    }
  }
})
