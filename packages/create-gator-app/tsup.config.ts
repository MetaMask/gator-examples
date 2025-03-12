import { defineConfig } from "tsup";
import { config } from "dotenv";

config();

export default defineConfig({
  entry: ["src/index.ts"],
  format: ["cjs"],
  dts: true,
  clean: true,
  banner: {
    js: "#!/usr/bin/env node",
  },
  define: {
    "process.env.NPM_AUTH_TOKEN": JSON.stringify(process.env.NPM_AUTH_TOKEN),
  },
  target: 'es2020',
});
