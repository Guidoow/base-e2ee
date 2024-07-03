import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import * as dotenv from "dotenv";
import * as fs from "fs";

dotenv.config({ path: "../.env" });

if (
  !process.env.PORT ||
  !process.env.SSL_KEY_PATH ||
  !process.env.SSL_CERTIFICATE_PATH
)
  throw new Error(
    "You must complete all the enviroment variables in the .env file at the root folder of the project."
  );

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
