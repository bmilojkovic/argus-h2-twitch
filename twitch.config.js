import fs from "fs";
import path from "path";
import { resolve } from "path";

import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import mkcert from "vite-plugin-mkcert";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), mkcert()],
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
    https: true,
    port: 8080,
  },
});
