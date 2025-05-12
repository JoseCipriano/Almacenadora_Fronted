import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

export default defineConfig({
  plugins: [react()],
  resolve: {
    // Alias para rutas absolutas
    alias: {
      '@': path.resolve(__dirname, 'src'),
      'components': path.resolve(__dirname, 'src/components'),
      'pages': path.resolve(__dirname, 'src/pages'),
      'hooks': path.resolve(__dirname, 'src/shared/hooks'),
      'services': path.resolve(__dirname, 'src/services'),
    },
    // Extensiones que Vite resolverá automáticamente
    extensions: ['.js', '.jsx', '.json']
  },
  server: {
    port: 5173,        // Asegúrate de usar el mismo puerto en tus imports
    open: true,        // Abre el navegador al arrancar
    cors: true,        // Habilita CORS para llamadas al backend
    watch: {
      usePolling: true 
    }
  }
})