import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import dts from "vite-plugin-dts";
import { resolve } from "path";
import DefineOptions from "unplugin-vue-define-options/vite";
export default defineConfig({
  build: {
    target: "modules",
    //打包文件目录
    outDir: "es",
    //压缩
    minify: true,
    //css分离
    //cssCodeSplit: true,
    emptyOutDir: false,
    rollupOptions: {
      //忽略打包vue文件
      external: ["vue", /\.scss/, "@snail-admin/utils"],
      input: ["index.ts"],
      output: [
        {
          format: "es",
          //不用打包成.es.js,这里我们想把它打包成.js
          entryFileNames: "[name].mjs",
          //让打包目录和我们目录对应
          preserveModules: true,
          exports: "named",
          //配置打包根目录
          dir: resolve(__dirname, "./snail-admin/es")
        },
        {
          format: "cjs",
          //不用打包成.cjs
          entryFileNames: "[name].js",
          //让打包目录和我们目录对应
          preserveModules: true,
          exports: "named",
          //配置打包根目录
          dir: resolve(__dirname, "./snail-admin/lib")
        }
      ]
    },
    lib: {
      entry: "./index.ts",
      name: "snail"
    }
  },

  plugins: [
    vue(),
    DefineOptions(),
    dts({
      entryRoot: "src",
      outputDir: [
        resolve(__dirname, "./snail-admin/es/src"),
        resolve(__dirname, "./snail-admin/lib/src")
      ],
      tsConfigFilePath: "../../tsconfig.json"
    }),
    {
      name: "style",
      generateBundle(config, bundle) {
        const keys = Object.keys(bundle);
        for (const key of keys) {
          const bundler: any = bundle[key as any];
          this.emitFile({
            type: "asset",
            fileName: key,
            source: bundler.code.replace(/\.scss/g, ".css")
          });
        }
      }
    }
  ],
  resolve: {
    alias: {
      "@": resolve(__dirname, "src")
    }
  }
});
