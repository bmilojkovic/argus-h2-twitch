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
        main: resolve(__dirname, "dashboard.html"), // Main application entry point
      },
    },
  },
  server: {
    https: true,
    port: 8080,
  },
});
