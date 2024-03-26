import * as glob from "glob";
import { relative } from "node:path";

import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import pkg from "./package.json" with { type: "json" };
import { string } from "rollup-plugin-string";

export default [
  defineConfig({
    input: Object.fromEntries(
      glob
        .sync("src/**/index.{ts,tsx}")
        .map((file) => [
          relative("src", file.substring(0, file.lastIndexOf("."))),
          file,
        ]),
    ),
    output: [
      {
        format: "esm",
        dir: "dist",
        banner: '"use client"',
        chunkFileNames: "[name].js",
      },
    ],
    plugins: [
      typescript(),
      string({
        include: "**/*.glsl",
      }),
    ],
    external: [
      ...Object.keys(pkg.dependencies),
      ...Object.keys(pkg.peerDependencies),
    ],
    watch: {
      include: "src/**",
      clearScreen: false,
    },
  }),
  defineConfig({
    input: "./dist/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [dts()],
    watch: false,
  }),
];
