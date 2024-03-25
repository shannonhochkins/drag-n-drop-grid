import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import { EsLinter, linterPlugin } from 'vite-plugin-linter';
import tsconfigPaths from 'vite-tsconfig-paths';
import packageJson from './package.json';
import path from 'path';
import dts from 'vite-plugin-dts';
// https://vitejs.dev/config/
export default defineConfig(configEnv => {
  return {
    root: path.resolve(__dirname, './'),
    build: {
      sourcemap: true,
      emptyOutDir: false,
      lib: {
        entry: path.resolve(__dirname, 'src/index.ts'),
        name: 'drag-n-drop-grid',
        formats: ['es', 'cjs'],
        fileName: (format) => `drag-n-drop-grid-${format}.${format === 'cjs' ? 'cjs' : 'js'}`,
      },
      rollupOptions: {
        external:[
          ...Object.keys(packageJson.peerDependencies),
        ],
        output: {
          globals: {
            react: 'React',
            'react-dom': 'ReactDOM',
            '@react-spring/web': '@react-spring/web',
            '@use-gesture/react': '@use-gesture/react',
          }
        }
      },
      minify: true,
    },
    plugins: [
      tsconfigPaths({
        root: path.resolve(__dirname, './')
      }),
      react(),
      linterPlugin({
        include: ['./src}/**/*.{ts,tsx}'],
        linters: [new EsLinter({ configEnv })],
      }),
      dts({
        rollupTypes: false,
        root: path.resolve(__dirname, './'),
        outDir: path.resolve(__dirname, './dist/types'),
        include: [path.resolve(__dirname, './src')],
        clearPureImport: true,
        insertTypesEntry: false,
      })
    ],
  }
});