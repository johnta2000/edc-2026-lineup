import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

export default defineConfig({
  base: "/edc-2026-lineup/",
  build: {
    rollupOptions: {
      input: "index.dev.html",
      output: {
        assetFileNames: (assetInfo) => {
          if (assetInfo.name?.endsWith(".css")) {
            return "assets/index.css";
          }

          return "assets/[name][extname]";
        },
        chunkFileNames: "assets/[name].js",
        entryFileNames: "assets/index.js",
      },
    },
  },
  plugins: [react()],
});
