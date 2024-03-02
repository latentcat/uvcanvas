import { Options, defineConfig } from "tsup";
import { relative } from "path";
import * as glob from "glob";

const commonConfig: Options = {
  clean: true,
  minify: true,
  target: "es2018",
  external: ["react"],
  sourcemap: "inline",
  dts: true,
  splitting: false,
  loader: {
    ".css": "local-css",
  },
  entry: Object.fromEntries(
    glob
      .sync("lib/**/index.{ts,tsx}")
      .map((file) => [
        relative("lib", file.substring(0, file.lastIndexOf("."))),
        file,
      ])
  ),
  esbuildOptions(options) {
    options.banner = {
      js: '"use client"',
    };
  },
};

export default defineConfig([
  {
    ...commonConfig,
    format: "esm",
    outDir: "dist/esm",
  },
  {
    ...commonConfig,
    format: "cjs",
    outDir: "dist/cjs",
  },
]);
