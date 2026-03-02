import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Replace 'your-repo-name' with your GitHub repo
export default defineConfig({
  plugins: [react()],
  base: "/your-repo-name/",
})
