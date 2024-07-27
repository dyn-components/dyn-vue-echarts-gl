import { resolve } from "path";
import { defineConfig, loadEnv, ConfigEnv } from "vite";
import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import { libInjectCss } from 'vite-plugin-lib-inject-css';
import Components from "unplugin-vue-components/vite";
import DynComponents, { unpluginDynVueComponentsResolver } from "dyn-components";
import dts from "vite-plugin-dts";

export default defineConfig(async (params: ConfigEnv) => {
  const { command, mode } = params;
  const ENV = loadEnv(mode, process.cwd());
  console.log("node version", process.version);
  console.info(
    `running mode: ${mode}, command: ${command}, ENV: ${JSON.stringify(ENV)}`
  );
  return {
    plugins: [
      vue(),
      vueJsx(),
      libInjectCss(),
      Components({
        resolvers: [unpluginDynVueComponentsResolver()],
      }),
      DynComponents(),
      dts({ rollupTypes: true, tsconfigPath: resolve(__dirname, './tsconfig.app.json') })
    ],
    define: {
      '__DEV__': mode === 'development', // 自定义开发模式标识
      '__PROD__': mode === 'production', // 自定义生产模式标识
    },
    resolve: {
      alias: {
        '@': '/src',
        dyn_components: "/dyn_components",
      }
    },
    base: "./",
    build: {
      lib: {
        entry: resolve(__dirname, "src/index.ts"),
        name: "echarts-gl",
        fileName: (format: string) => `echarts-gl.${format}.js`,
        formats: ["es", "umd"] as any,
      },
      emptyOutDir: true,
      sourcemap: mode === "development",
      minify: mode !== "development",
      rollupOptions: {
        external: ['vue', 'dyn_components/vue/echarts', 'echarts', 'echarts-gl'],
        output: {
          globals: {
            vue: 'Vue',
            echarts: 'echarts',
            "echarts-gl": 'echartsGL',
          }
        }
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          charset: false,
          // additionalData: `$injectedColor: orange;`
          additionalData: '@import "@/assets/styles/globalInjectedScss/index.scss";'
        }
        // less: {
        //   modifyVars: {
        //     '@primary-color': '#1990EB',
        //     hack: `true; @import "@import "@/assets/stylesheets/globalInjectedLess/index.less";`
        //   },
        //   javascriptEnabled: true,
        // }
      }
      // postcss: {}
    },
  };
});
