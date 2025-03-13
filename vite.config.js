import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

/**
 * Path to exercise folder
 */
const exercisePath = '';

/**
 * Don't change those lines below
 */
export default defineConfig({
  root: exercisePath,
  plugins: [react()],
  server: {
    host: '0.0.0.0', // Udostępnia w sieci lokalnej
    port: 5173, // Możesz zmienić port, jeśli potrzebujesz
    strictPort: true,
  },
});
