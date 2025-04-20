import { defineConfig } from "tsup";

export default defineConfig({
  entry: ["src/index.ts"], // 入口文件
  format: ["esm", "cjs"], // 输出格式
  dts: true, // 生成类型声明
  clean: true, // 清空 dist
  minify: true, // 代码压缩
});
