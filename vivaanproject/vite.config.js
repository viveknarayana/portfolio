import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  base: '/vivaanproject/',
  build: {
    outDir: '../public/vivaanproject',
    emptyOutDir: true,
  },
})
