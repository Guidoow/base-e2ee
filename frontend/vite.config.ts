import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import * as dotenv from "dotenv";
import * as fs from "fs";

dotenv.config();

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    https: {
      key: fs.readFileSync(process.env.SSL_KEY_PATH!),
      cert: fs.readFileSync(process.env.SSL_CERTIFICATE_PATH!),
    },
    port: 443,
    host: true,
  },
  plugins: [svelte()],
});
