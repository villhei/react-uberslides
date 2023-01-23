import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

const path = require("path");

// https://vitejs.dev/config/

export default defineConfig({
  resolve: {
    alias: {
      "react-uberslides": path.resolve(__dirname, "../../src"),
    },
  },
  plugins: [react()],
  base: "./",
});
