import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

export default defineConfig({
  plugins: [react(), tailwindcss()],
  server: {
    proxy: {
      '/api': {
        target: 'http://localhost:8080',
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ''),
      },
    },
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes('speciesMasterCatalog')) {
            return 'species-catalog'
          }
          if (id.includes('node_modules/jspdf')) {
            return 'jspdf'
          }
          if (
            id.includes('node_modules/html2canvas') ||
            id.includes('node_modules/html-to-image') ||
            id.includes('node_modules/dompurify')
          ) {
            return 'html-canvas'
          }
          if (id.includes('node_modules/lucide-react')) {
            return 'icons'
          }
          if (
            id.includes('node_modules/react') ||
            id.includes('node_modules/react-dom') ||
            id.includes('node_modules/react-router-dom')
          ) {
            return 'vendor-react'
          }
        },
      },
    },
  },
})
