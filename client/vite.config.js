import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// auto-detect build mode
const isProd = process.env.NODE_ENV === 'production'

export default defineConfig({
  plugins: [react()],

  // critical: fix asset URLs under reverse proxy /portfolio
  base: isProd ? '/portfolio/' : '/',

  server: {
    port: 80,
    proxy: {
      '/api': 'http://localhost:5000'
    }
  }
})
