import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'

// eslint-disable-next-line no-undef
const base = process.env.VITE_BASE_PATH || '/';

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  base
})
