import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig(({ mode }) => {
  return {
    plugins: [react()],
    define: {
      "import.meta.env.MODE": JSON.stringify(mode),
    },
  };
});
