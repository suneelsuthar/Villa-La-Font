import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  base: "/", // Ensure this is set correctly
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
      },
    },
  },
  server: {
    proxy: {
      "/api": {
        target: "https://api.lodgify.com/v2",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, ""),
        configure: (proxy, _options) => {
          proxy.on("proxyReq", (proxyReq) => {
            proxyReq.setHeader(
              "X-ApiKey",
              "wmv2kfsjUEXf8oKfH0bZMfY3QWbS1PEeV6OzZR2QfKBpW+nlNDaiwhF9yGSmjbkm"
            );
          });
        },
      },
    },
  },
});
