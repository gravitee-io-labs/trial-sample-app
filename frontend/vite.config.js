import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    host: true,
    port: 5173,
    strictPort: true,
    proxy: {
      "/todos": {
        // target: "http://gio-gateway:8082",
        target: "http://app-backend:3001",
      },
    },
  },
});
