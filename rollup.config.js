import { nodeResolve } from "@rollup/plugin-node-resolve";
import typescript from "@rollup/plugin-typescript";
import virtual from "@rollup/plugin-virtual";
import { wasm } from "@rollup/plugin-wasm";

import generateLuaSources from "./generate.js";

export default {
  input: "src/index.ts",
  output: {
    dir: "dist",
    format: "es",
    sourcemap: true,
  },
  plugins: [
    virtual({ "./source": generateLuaSources() }),
    typescript(),
    nodeResolve(),
    wasm({ targetEnv: "auto-inline" }),
  ],
};
