import fs from "fs";
import path from "path";
import { resolve } from "path";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "./",
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"), // Main application entry point
        config: resolve(__dirname, "config.html"),
        live_config: resolve(__dirname, "live_config.html"),
      },
    },
  },
  server: {
    https: {
      key: fs.readFileSync(path.resolve(__dirname, "./.crt/key.pem")), // Adjust path as needed
      cert: fs.readFileSync(path.resolve(__dirname, "./.crt/cert.pem")), // Adjust path as needed
    },
    port: 8080,
  },
});
