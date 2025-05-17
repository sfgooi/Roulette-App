import { defineConfig, loadEnv } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig(({ mode }) => {
  // 環境変数ファイルのパスを指定
  const env = loadEnv(mode, "env", "VITE_");

  return {
    plugins: [react()],
    envDir: path.resolve(__dirname, "env"),
    define: {
      // 環境変数をクライアントサイドで利用可能にする
      "import.meta.env.VITE_MODE": JSON.stringify(env.VITE_MODE),
    },
  };
});
