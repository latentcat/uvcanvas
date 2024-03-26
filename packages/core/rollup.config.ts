import * as glob from "glob";
import { relative, resolve, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { defineConfig } from "rollup";
import typescript from "@rollup/plugin-typescript";
import alias from "@rollup/plugin-alias";
import dts from "rollup-plugin-dts";
import { string } from "rollup-plugin-string";
import pkg from "./package.json" with { type: "json" };

const __dirname = dirname(fileURLToPath(import.meta.url));

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
        chunkFileNames: "[name].js",
      },
    ],
    plugins: [
      typescript(),
      string({
        include: "**/*.glsl",
      }),
      alias({
        entries: [
          {
            find: "@",
            replacement: resolve(__dirname, "src"),
          },
        ],
      }),
    ],
    external: [...Object.keys(pkg.dependencies)],
    watch: {
      include: "src/**",
      clearScreen: false,
    },
  }),
  defineConfig({
    input: "./dist/index.d.ts",
    output: [{ file: "dist/index.d.ts", format: "esm" }],
    plugins: [
      dts({
        compilerOptions: {
          paths: {
            "@/*": ["./src/*"],
          },
        },
      }),
    ],
    watch: false,
  }),
];
