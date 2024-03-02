import { defineConfig } from 'tsup'

export default defineConfig({
  splitting: true,
  clean: true,
  // treeshake: false,
  minify: true,
  target: 'es2018',
  external: ['react'],
  // sourcemap: true,
  dts: true,
  format: ['esm', 'cjs'],
  entry: {
    index: 'lib/main.ts',
  },
  esbuildOptions(options) {
    options.banner = {
      js: '"use client"',
    }
  },
})