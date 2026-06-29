// vite.config.js
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  base: '/dashboard/',
  build: {
    outDir: 'docs', // папка для сборки — docs вместо dist
  },
  plugins: [
    react(),
    tailwindcss(),
  ],
})