import { defineConfig } from "tsup";

export default defineConfig([
  {
    entry: ["src"],
    format: ["cjs"],
    dts: false,
    clean: true,
    outDir: "build/cjs",
  },
  {
    entry: ["src"],
    format: ["esm"],
    dts: false,
    clean: true,
    outDir: "build/esm",
    outExtension({ format }) {
      // 自定义输出扩展名
      return {
        js: ".js", // ESM → .js, CommonJS → .cjs
      };
    },
  },
]);
