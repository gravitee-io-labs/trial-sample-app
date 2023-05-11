import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  base: "/trial-sample-app",
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
  },
});
