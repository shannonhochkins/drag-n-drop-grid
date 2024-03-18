import resolve from "@rollup/plugin-node-resolve";
import filesize from "rollup-plugin-filesize";
import pkg from "./package.json" assert { type: 'json' };
import json from '@rollup/plugin-json';
import commonjs from '@rollup/plugin-commonjs';
import typescript from "rollup-plugin-typescript2";

const input = "src/index.ts";

const plugins = [
  resolve(),
  typescript({
    typescript: require("typescript")
  }),
  commonjs(),
  filesize(),
  json()
];

const externals = [
  ...Object.keys(pkg.dependencies || {}),
  ...Object.keys(pkg.peerDependencies || {})
];

export default [
  {
    input,
    output: [
      {
        file: pkg.main,
        format: "cjs",
        sourcemap: true
      }
    ],
    external: externals,
    plugins
  }
];
