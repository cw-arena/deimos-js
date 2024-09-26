import virtual from "@rollup/plugin-virtual";
import typescript from "@rollup/plugin-typescript";
import fs from "fs";
import path from "path";
import ignore from "rollup-plugin-ignore";
import { nodeResolve } from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import { wasm } from "@rollup/plugin-wasm";

const deimosPath = "../deimos/lua";
const deimosLuaSources = {};

fs.readdirSync(deimosPath, { recursive: true, encoding: "utf-8" }).forEach(
  (filename) => {
    if (!filename.endsWith(".lua")) {
      return;
    }

    const filepath = path.join(deimosPath, filename);
    const module = filename
      .replace(/\.lua$/, "")
      .split("/")
      .join(".");

    deimosLuaSources[module] = fs.readFileSync(filepath, {
      encoding: "utf-8",
    });
  }
);

const sourceModule = `export default ${JSON.stringify(deimosLuaSources)};`;

const urlModule = `
`;

export default {
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "commonjs",
    sourcemap: true,
  },
  plugins: [
    virtual({ "./source": sourceModule }),
    typescript(),
    nodeResolve(),
    ignore(["path", "fs", "child_process", "crypto", "url", "module"]),
    commonjs({
      ignoreDynamicRequires: true,
      include: "node_modules/wasmoon/**",
      //   dynamicRequireTargets: ["url"],
    }),
    wasm({
      targetEnv: "auto-inline",
    }),
  ],
};
