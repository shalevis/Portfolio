import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  preview: {
    host: true,
    port: 80,
    allowedHosts: ["crimson-wolf-15259.zap.cloud"]
  },
  server: {
    host: true
  }
});
