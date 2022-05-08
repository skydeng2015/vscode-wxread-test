import { defineConfig } from 'vite';
import path from 'path';
import { visualizer } from 'rollup-plugin-visualizer';

const mainFile = 'src/extension.ts';

export default defineConfig({
  build: {
    minify: 'esbuild',
    lib: {
      entry: path.resolve(__dirname, mainFile),
      name: 'vscode-wxread-test',
      fileName: (format) => `extension.js`,
      formats: ['cjs']
    },
    rollupOptions: {
      input: mainFile,
      output: {
        // 在 UMD 构建模式下为这些外部化的依赖提供一个全局变量
        globals: {
          vscode: 'vscode'
        }
      },
      // 确保外部化处理那些你不想打包进库的依赖
      external: ['vscode']
    },
    commonjsOptions: {
      include: /\.[jt]sx?$/,
      extensions: ['.js', '.ts'],
      transformMixedEsModules: true,
      requireReturnsDefault: "namespace"
    }
  },
  plugins: [
    visualizer(), // 打包分析插件，输出文件为stats.html
  ],

})