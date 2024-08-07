import { resolve, dirname } from 'path'
import { fileURLToPath } from 'url'
import { defineConfig, externalizeDepsPlugin, bytecodePlugin } from 'electron-vite'
import vue from '@vitejs/plugin-vue'
import AutoImport from 'unplugin-auto-import/vite' //自动导入api
import Components from 'unplugin-vue-components/vite'
import { NaiveUiResolver } from 'unplugin-vue-components/resolvers'
import VueSetupExtend from 'vite-plugin-vue-setup-extend' //组建名称
import { createSvgIconsPlugin } from 'vite-plugin-svg-icons' //svg批量加载
import { createHtmlPlugin } from 'vite-plugin-html' //ejs模板
import typescript from '@rollup/plugin-typescript'
// import vueDevTools from 'vite-plugin-vue-devtools'
// import vueJsx from '@vitejs/plugin-vue-jsx'

// 获取当前文件的目录名
const __dirname = dirname(fileURLToPath(import.meta.url))
const BASE_URL = '/'
export default defineConfig({
  main: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    plugins: [
      typescript({
        tsconfig: './tsconfig.node.json'
      }),
      externalizeDepsPlugin({ exclude: ['electron-store'] }),
      bytecodePlugin({ transformArrowFunctions: false })
    ],
    esbuild: {
      exclude: ['src/nest/**/*', 'src/main/db/**/*']
    }
  },
  preload: {
    resolve: {
      alias: {
        '@': resolve('src')
      }
    },
    plugins: [externalizeDepsPlugin(), bytecodePlugin({ transformArrowFunctions: false })]
  },
  renderer: {
    base: BASE_URL,
    resolve: {
      alias: {
        '@renderer': resolve('src/renderer/src')
      }
    },
    publicDir: resolve(__dirname, './src/renderer/src/public'),
    define: {
      BASE_URL: JSON.stringify(BASE_URL)
    },
    plugins: [
      // vueDevTools(),
      vue(),
      // vueJsx(),
      createHtmlPlugin({
        inject: {
          data: {
            BASE_URL
          }
        }
      }),
      AutoImport({
        imports: [
          'pinia',
          'vue',
          'vue-router',
          {
            'naive-ui': ['useDialog', 'useMessage', 'useNotification', 'useLoadingBar']
          }
        ],
        dts: './src/auto-imports.d.ts'
      }),
      Components({
        resolvers: [NaiveUiResolver()],
        dts: './src/components.d.ts'
      }),
      VueSetupExtend(),
      createSvgIconsPlugin({
        // 指定需要缓存的图标文件夹
        iconDirs: [resolve(process.cwd(), 'src/renderer/src/assets/icon')],
        // 指定symbolId格式
        symbolId: 'icon-[name]'
      })
    ]
  }
})
