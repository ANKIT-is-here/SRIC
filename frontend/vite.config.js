import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    port: 5173,
    proxy: {
      '/upload': 'http://localhost:8000',
      '/stats': 'http://localhost:8000',
      '/search': 'http://localhost:8000',
      '/conjunctive-search': 'http://localhost:8000',
      '/download': 'http://localhost:8000',
      '/reset': 'http://localhost:8000',
    }
  }
})
