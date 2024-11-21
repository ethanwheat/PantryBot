import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { config } from 'dotenv';

config();

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    'process.env': process.env
  },
  server: {
    watch: {
      usePolling: true, // Enable polling for file changes
      interval: 100,    // Optional: Set polling interval in ms
    },
  },
})
