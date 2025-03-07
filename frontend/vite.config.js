import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(),
    tailwindcss()
  ],
  server: {
    host: '192.168.29.67',  // This makes the server accessible from other devices
    port: 3000,  // You can change this if you want to use another port
  }
})
