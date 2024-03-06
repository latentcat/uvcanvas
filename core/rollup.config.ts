import * as glob from "glob";
import { relative, resolve } from "node:path";

import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import dts from "rollup-plugin-dts";
import postcss from "rollup-plugin-postcss";
import pkg from "./package.json" with { type: "json" };
import { string } from "rollup-plugin-string";

export default [
  defineConfig({
    input: Object.fromEntries(
      glob
        .sync("lib/**/index.{ts,tsx}")
        .map((file) => [
          relative("lib", file.substring(0, file.lastIndexOf("."))),
          file,
        ]),
    ),
    output: [
      {
        format: "esm",
        dir: "dist",
        banner: '"use client"',
      },
    ],
    plugins: [
      typescript(),
      string({
        include: "**/*.glsl",
      }),
      ...glob.sync("lib/**/*.module.css").map((file) =>
        postcss({
          include: file,
          modules: true,
          extract: resolve(
            "dist",
            relative(
              "lib",
              file.substring(0, file.lastIndexOf(".module.css")) + ".css",
            ),
          ),
        }),
      ),
    ],
    external: [
      ...Object.keys(pkg.dependencies),
      ...Object.keys(pkg.peerDependencies),
    ],
    watch: {
      include: "lib/**",
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
