// vite.config.ts
import { defineConfig } from "file:///Users/shannonhochkins/Desktop/dev/PlaygroundXYZ/drag-n-drop-grid/node_modules/vite/dist/node/index.js";
import react from "file:///Users/shannonhochkins/Desktop/dev/PlaygroundXYZ/drag-n-drop-grid/node_modules/@vitejs/plugin-react/dist/index.mjs";
import { EsLinter, linterPlugin } from "file:///Users/shannonhochkins/Desktop/dev/PlaygroundXYZ/drag-n-drop-grid/node_modules/vite-plugin-linter/dist/index.mjs";
import tsconfigPaths from "file:///Users/shannonhochkins/Desktop/dev/PlaygroundXYZ/drag-n-drop-grid/node_modules/vite-tsconfig-paths/dist/index.mjs";

// package.json
var package_default = {
  name: "drag-n-drop-grid",
  type: "module",
  version: "3.0.6",
  description: "grid style drag and drop for react",
  main: "./dist/drag-n-drop-grid-cjs.cjs",
  module: "./dist/drag-n-drop-grid-es.js",
  types: "./dist/types/index.d.ts",
  author: "Ben McMahen (shannon hochkins tweaks)",
  license: "MIT",
  private: false,
  keywords: [
    "react",
    "gesture",
    "drag and drop",
    "dnd",
    "grid"
  ],
  scripts: {
    test: "jest",
    "test-watch": "jest -w",
    start: "npm run storybook",
    storybook: "storybook dev -p 6006",
    build: "NODE_ENV=production vite build",
    prepublishOnly: "npm run build",
    "build-storybook": "storybook build"
  },
  homepage: "https://github.com/shannonhochkins/drag-n-drop-grid",
  bugs: {
    url: "https://github.com/shannonhochkins/drag-n-drop-grid/issues"
  },
  funding: "https://github.com/shannonhochkins/ha-component-kit?sponsor=1",
  repository: {
    type: "git",
    url: "https://github.com/shannonhochkins/drag-n-drop-grid.git"
  },
  peerDependencies: {
    "@use-gesture/react": "^10.3.0",
    react: "^16.8.6",
    "react-dom": "^16.8.6",
    "react-spring": "^9.7.3"
  },
  devDependencies: {
    "@chromatic-com/storybook": "^1.2.20",
    "@liuli-util/vite-plugin-node": "^0.8.1",
    "@storybook/addon-essentials": "^8.0.0",
    "@storybook/addon-interactions": "^8.0.0",
    "@storybook/addon-links": "^8.0.0",
    "@storybook/addon-onboarding": "^8.0.0",
    "@storybook/blocks": "^8.0.0",
    "@storybook/react": "^8.0.0",
    "@storybook/react-vite": "^8.0.0",
    "@storybook/test": "^8.0.0",
    "@types/jest": "^29.5.12",
    "@types/react": "^18.2.66",
    "@types/react-dom": "^18.2.22",
    "@types/storybook__react": "^4.0.2",
    "@vitejs/plugin-react": "^4.2.1",
    "babel-core": "^6.26.3",
    "babel-jest": "^29.7.0",
    "babel-loader": "^9.1.3",
    jest: "^29.7.0",
    react: "^18.2.0",
    "react-dom": "^18.2.0",
    rimraf: "^5.0.5",
    storybook: "^8.0.0",
    "ts-jest": "^29.1.2",
    typescript: "^5.4.2",
    vite: "^4.5.2",
    "vite-plugin-dts": "^3.7.3",
    "vite-plugin-linter": "^2.1.1",
    "vite-tsconfig-paths": "^4.3.2",
    webpack: "^5.90.3"
  },
  files: [
    "dist",
    "README.md",
    "package.json"
  ],
  dependencies: {
    tslib: "^2.6.2"
  },
  sideEffects: false
};

// vite.config.ts
import path from "path";
import dts from "file:///Users/shannonhochkins/Desktop/dev/PlaygroundXYZ/drag-n-drop-grid/node_modules/vite-plugin-dts/dist/index.mjs";
var __vite_injected_original_dirname = "/Users/shannonhochkins/Desktop/dev/PlaygroundXYZ/drag-n-drop-grid";
var vite_config_default = defineConfig((configEnv) => {
  return {
    root: path.resolve(__vite_injected_original_dirname, "./"),
    build: {
      sourcemap: true,
      emptyOutDir: false,
      lib: {
        entry: path.resolve(__vite_injected_original_dirname, "src/index.ts"),
        name: "drag-n-drop-grid",
        formats: ["es", "cjs"],
        fileName: (format) => `drag-n-drop-grid-${format}.${format === "cjs" ? "cjs" : "js"}`
      },
      rollupOptions: {
        external: [
          ...Object.keys(package_default.peerDependencies)
        ],
        output: {
          globals: {
            react: "React",
            "react-dom": "ReactDOM",
            "react-spring": "react-spring",
            "@use-gesture/react": "@use-gesture/react"
          }
        }
      },
      minify: true
    },
    plugins: [
      tsconfigPaths({
        root: path.resolve(__vite_injected_original_dirname, "./")
      }),
      react(),
      linterPlugin({
        include: ["./src}/**/*.{ts,tsx}"],
        linters: [new EsLinter({ configEnv })]
      }),
      dts({
        rollupTypes: false,
        root: path.resolve(__vite_injected_original_dirname, "./"),
        outDir: path.resolve(__vite_injected_original_dirname, "./dist/types"),
        include: [path.resolve(__vite_injected_original_dirname, "./src")],
        clearPureImport: true,
        insertTypesEntry: false
      })
    ]
  };
});
export {
  vite_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsidml0ZS5jb25maWcudHMiLCAicGFja2FnZS5qc29uIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZGlybmFtZSA9IFwiL1VzZXJzL3NoYW5ub25ob2Noa2lucy9EZXNrdG9wL2Rldi9QbGF5Z3JvdW5kWFlaL2RyYWctbi1kcm9wLWdyaWRcIjtjb25zdCBfX3ZpdGVfaW5qZWN0ZWRfb3JpZ2luYWxfZmlsZW5hbWUgPSBcIi9Vc2Vycy9zaGFubm9uaG9jaGtpbnMvRGVza3RvcC9kZXYvUGxheWdyb3VuZFhZWi9kcmFnLW4tZHJvcC1ncmlkL3ZpdGUuY29uZmlnLnRzXCI7Y29uc3QgX192aXRlX2luamVjdGVkX29yaWdpbmFsX2ltcG9ydF9tZXRhX3VybCA9IFwiZmlsZTovLy9Vc2Vycy9zaGFubm9uaG9jaGtpbnMvRGVza3RvcC9kZXYvUGxheWdyb3VuZFhZWi9kcmFnLW4tZHJvcC1ncmlkL3ZpdGUuY29uZmlnLnRzXCI7aW1wb3J0IHsgZGVmaW5lQ29uZmlnIH0gZnJvbSAndml0ZSc7XG5pbXBvcnQgcmVhY3QgZnJvbSAnQHZpdGVqcy9wbHVnaW4tcmVhY3QnO1xuaW1wb3J0IHsgRXNMaW50ZXIsIGxpbnRlclBsdWdpbiB9IGZyb20gJ3ZpdGUtcGx1Z2luLWxpbnRlcic7XG5pbXBvcnQgdHNjb25maWdQYXRocyBmcm9tICd2aXRlLXRzY29uZmlnLXBhdGhzJztcbmltcG9ydCBwYWNrYWdlSnNvbiBmcm9tICcuL3BhY2thZ2UuanNvbic7XG5pbXBvcnQgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCBkdHMgZnJvbSAndml0ZS1wbHVnaW4tZHRzJztcbi8vIGh0dHBzOi8vdml0ZWpzLmRldi9jb25maWcvXG5leHBvcnQgZGVmYXVsdCBkZWZpbmVDb25maWcoY29uZmlnRW52ID0+IHtcbiAgcmV0dXJuIHtcbiAgICByb290OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnLi8nKSxcbiAgICBidWlsZDoge1xuICAgICAgc291cmNlbWFwOiB0cnVlLFxuICAgICAgZW1wdHlPdXREaXI6IGZhbHNlLFxuICAgICAgbGliOiB7XG4gICAgICAgIGVudHJ5OiBwYXRoLnJlc29sdmUoX19kaXJuYW1lLCAnc3JjL2luZGV4LnRzJyksXG4gICAgICAgIG5hbWU6ICdkcmFnLW4tZHJvcC1ncmlkJyxcbiAgICAgICAgZm9ybWF0czogWydlcycsICdjanMnXSxcbiAgICAgICAgZmlsZU5hbWU6IChmb3JtYXQpID0+IGBkcmFnLW4tZHJvcC1ncmlkLSR7Zm9ybWF0fS4ke2Zvcm1hdCA9PT0gJ2NqcycgPyAnY2pzJyA6ICdqcyd9YCxcbiAgICAgIH0sXG4gICAgICByb2xsdXBPcHRpb25zOiB7XG4gICAgICAgIGV4dGVybmFsOltcbiAgICAgICAgICAuLi5PYmplY3Qua2V5cyhwYWNrYWdlSnNvbi5wZWVyRGVwZW5kZW5jaWVzKSxcbiAgICAgICAgXSxcbiAgICAgICAgb3V0cHV0OiB7XG4gICAgICAgICAgZ2xvYmFsczoge1xuICAgICAgICAgICAgcmVhY3Q6ICdSZWFjdCcsXG4gICAgICAgICAgICAncmVhY3QtZG9tJzogJ1JlYWN0RE9NJyxcbiAgICAgICAgICAgICdyZWFjdC1zcHJpbmcnOiAncmVhY3Qtc3ByaW5nJyxcbiAgICAgICAgICAgICdAdXNlLWdlc3R1cmUvcmVhY3QnOiAnQHVzZS1nZXN0dXJlL3JlYWN0JyxcbiAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgIH0sXG4gICAgICBtaW5pZnk6IHRydWUsXG4gICAgfSxcbiAgICBwbHVnaW5zOiBbXG4gICAgICB0c2NvbmZpZ1BhdGhzKHtcbiAgICAgICAgcm9vdDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vJylcbiAgICAgIH0pLFxuICAgICAgcmVhY3QoKSxcbiAgICAgIGxpbnRlclBsdWdpbih7XG4gICAgICAgIGluY2x1ZGU6IFsnLi9zcmN9LyoqLyoue3RzLHRzeH0nXSxcbiAgICAgICAgbGludGVyczogW25ldyBFc0xpbnRlcih7IGNvbmZpZ0VudiB9KV0sXG4gICAgICB9KSxcbiAgICAgIGR0cyh7XG4gICAgICAgIHJvbGx1cFR5cGVzOiBmYWxzZSxcbiAgICAgICAgcm9vdDogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vJyksXG4gICAgICAgIG91dERpcjogcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vZGlzdC90eXBlcycpLFxuICAgICAgICBpbmNsdWRlOiBbcGF0aC5yZXNvbHZlKF9fZGlybmFtZSwgJy4vc3JjJyldLFxuICAgICAgICBjbGVhclB1cmVJbXBvcnQ6IHRydWUsXG4gICAgICAgIGluc2VydFR5cGVzRW50cnk6IGZhbHNlLFxuICAgICAgfSlcbiAgICBdLFxuICB9XG59KTsiLCAie1xuICBcIm5hbWVcIjogXCJkcmFnLW4tZHJvcC1ncmlkXCIsXG4gIFwidHlwZVwiOiBcIm1vZHVsZVwiLFxuICBcInZlcnNpb25cIjogXCIzLjAuNlwiLFxuICBcImRlc2NyaXB0aW9uXCI6IFwiZ3JpZCBzdHlsZSBkcmFnIGFuZCBkcm9wIGZvciByZWFjdFwiLFxuICBcIm1haW5cIjogXCIuL2Rpc3QvZHJhZy1uLWRyb3AtZ3JpZC1janMuY2pzXCIsXG4gIFwibW9kdWxlXCI6IFwiLi9kaXN0L2RyYWctbi1kcm9wLWdyaWQtZXMuanNcIixcbiAgXCJ0eXBlc1wiOiBcIi4vZGlzdC90eXBlcy9pbmRleC5kLnRzXCIsXG4gIFwiYXV0aG9yXCI6IFwiQmVuIE1jTWFoZW4gKHNoYW5ub24gaG9jaGtpbnMgdHdlYWtzKVwiLFxuICBcImxpY2Vuc2VcIjogXCJNSVRcIixcbiAgXCJwcml2YXRlXCI6IGZhbHNlLFxuICBcImtleXdvcmRzXCI6IFtcbiAgICBcInJlYWN0XCIsXG4gICAgXCJnZXN0dXJlXCIsXG4gICAgXCJkcmFnIGFuZCBkcm9wXCIsXG4gICAgXCJkbmRcIixcbiAgICBcImdyaWRcIlxuICBdLFxuICBcInNjcmlwdHNcIjoge1xuICAgIFwidGVzdFwiOiBcImplc3RcIixcbiAgICBcInRlc3Qtd2F0Y2hcIjogXCJqZXN0IC13XCIsXG4gICAgXCJzdGFydFwiOiBcIm5wbSBydW4gc3Rvcnlib29rXCIsXG4gICAgXCJzdG9yeWJvb2tcIjogXCJzdG9yeWJvb2sgZGV2IC1wIDYwMDZcIixcbiAgICBcImJ1aWxkXCI6IFwiTk9ERV9FTlY9cHJvZHVjdGlvbiB2aXRlIGJ1aWxkXCIsXG4gICAgXCJwcmVwdWJsaXNoT25seVwiOiBcIm5wbSBydW4gYnVpbGRcIixcbiAgICBcImJ1aWxkLXN0b3J5Ym9va1wiOiBcInN0b3J5Ym9vayBidWlsZFwiXG4gIH0sXG4gIFwiaG9tZXBhZ2VcIjogXCJodHRwczovL2dpdGh1Yi5jb20vc2hhbm5vbmhvY2hraW5zL2RyYWctbi1kcm9wLWdyaWRcIixcbiAgXCJidWdzXCI6IHtcbiAgICBcInVybFwiOiBcImh0dHBzOi8vZ2l0aHViLmNvbS9zaGFubm9uaG9jaGtpbnMvZHJhZy1uLWRyb3AtZ3JpZC9pc3N1ZXNcIlxuICB9LFxuICBcImZ1bmRpbmdcIjogXCJodHRwczovL2dpdGh1Yi5jb20vc2hhbm5vbmhvY2hraW5zL2hhLWNvbXBvbmVudC1raXQ/c3BvbnNvcj0xXCIsXG4gIFwicmVwb3NpdG9yeVwiOiB7XG4gICAgXCJ0eXBlXCI6IFwiZ2l0XCIsXG4gICAgXCJ1cmxcIjogXCJodHRwczovL2dpdGh1Yi5jb20vc2hhbm5vbmhvY2hraW5zL2RyYWctbi1kcm9wLWdyaWQuZ2l0XCJcbiAgfSxcbiAgXCJwZWVyRGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcIkB1c2UtZ2VzdHVyZS9yZWFjdFwiOiBcIl4xMC4zLjBcIixcbiAgICBcInJlYWN0XCI6IFwiXjE2LjguNlwiLFxuICAgIFwicmVhY3QtZG9tXCI6IFwiXjE2LjguNlwiLFxuICAgIFwicmVhY3Qtc3ByaW5nXCI6IFwiXjkuNy4zXCJcbiAgfSxcbiAgXCJkZXZEZXBlbmRlbmNpZXNcIjoge1xuICAgIFwiQGNocm9tYXRpYy1jb20vc3Rvcnlib29rXCI6IFwiXjEuMi4yMFwiLFxuICAgIFwiQGxpdWxpLXV0aWwvdml0ZS1wbHVnaW4tbm9kZVwiOiBcIl4wLjguMVwiLFxuICAgIFwiQHN0b3J5Ym9vay9hZGRvbi1lc3NlbnRpYWxzXCI6IFwiXjguMC4wXCIsXG4gICAgXCJAc3Rvcnlib29rL2FkZG9uLWludGVyYWN0aW9uc1wiOiBcIl44LjAuMFwiLFxuICAgIFwiQHN0b3J5Ym9vay9hZGRvbi1saW5rc1wiOiBcIl44LjAuMFwiLFxuICAgIFwiQHN0b3J5Ym9vay9hZGRvbi1vbmJvYXJkaW5nXCI6IFwiXjguMC4wXCIsXG4gICAgXCJAc3Rvcnlib29rL2Jsb2Nrc1wiOiBcIl44LjAuMFwiLFxuICAgIFwiQHN0b3J5Ym9vay9yZWFjdFwiOiBcIl44LjAuMFwiLFxuICAgIFwiQHN0b3J5Ym9vay9yZWFjdC12aXRlXCI6IFwiXjguMC4wXCIsXG4gICAgXCJAc3Rvcnlib29rL3Rlc3RcIjogXCJeOC4wLjBcIixcbiAgICBcIkB0eXBlcy9qZXN0XCI6IFwiXjI5LjUuMTJcIixcbiAgICBcIkB0eXBlcy9yZWFjdFwiOiBcIl4xOC4yLjY2XCIsXG4gICAgXCJAdHlwZXMvcmVhY3QtZG9tXCI6IFwiXjE4LjIuMjJcIixcbiAgICBcIkB0eXBlcy9zdG9yeWJvb2tfX3JlYWN0XCI6IFwiXjQuMC4yXCIsXG4gICAgXCJAdml0ZWpzL3BsdWdpbi1yZWFjdFwiOiBcIl40LjIuMVwiLFxuICAgIFwiYmFiZWwtY29yZVwiOiBcIl42LjI2LjNcIixcbiAgICBcImJhYmVsLWplc3RcIjogXCJeMjkuNy4wXCIsXG4gICAgXCJiYWJlbC1sb2FkZXJcIjogXCJeOS4xLjNcIixcbiAgICBcImplc3RcIjogXCJeMjkuNy4wXCIsXG4gICAgXCJyZWFjdFwiOiBcIl4xOC4yLjBcIixcbiAgICBcInJlYWN0LWRvbVwiOiBcIl4xOC4yLjBcIixcbiAgICBcInJpbXJhZlwiOiBcIl41LjAuNVwiLFxuICAgIFwic3Rvcnlib29rXCI6IFwiXjguMC4wXCIsXG4gICAgXCJ0cy1qZXN0XCI6IFwiXjI5LjEuMlwiLFxuICAgIFwidHlwZXNjcmlwdFwiOiBcIl41LjQuMlwiLFxuICAgIFwidml0ZVwiOiBcIl40LjUuMlwiLFxuICAgIFwidml0ZS1wbHVnaW4tZHRzXCI6IFwiXjMuNy4zXCIsXG4gICAgXCJ2aXRlLXBsdWdpbi1saW50ZXJcIjogXCJeMi4xLjFcIixcbiAgICBcInZpdGUtdHNjb25maWctcGF0aHNcIjogXCJeNC4zLjJcIixcbiAgICBcIndlYnBhY2tcIjogXCJeNS45MC4zXCJcbiAgfSxcbiAgXCJmaWxlc1wiOiBbXG4gICAgXCJkaXN0XCIsXG4gICAgXCJSRUFETUUubWRcIixcbiAgICBcInBhY2thZ2UuanNvblwiXG4gIF0sXG4gIFwiZGVwZW5kZW5jaWVzXCI6IHtcbiAgICBcInRzbGliXCI6IFwiXjIuNi4yXCJcbiAgfSxcbiAgXCJzaWRlRWZmZWN0c1wiOiBmYWxzZVxufVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUFxWCxTQUFTLG9CQUFvQjtBQUNsWixPQUFPLFdBQVc7QUFDbEIsU0FBUyxVQUFVLG9CQUFvQjtBQUN2QyxPQUFPLG1CQUFtQjs7O0FDSDFCO0FBQUEsRUFDRSxNQUFRO0FBQUEsRUFDUixNQUFRO0FBQUEsRUFDUixTQUFXO0FBQUEsRUFDWCxhQUFlO0FBQUEsRUFDZixNQUFRO0FBQUEsRUFDUixRQUFVO0FBQUEsRUFDVixPQUFTO0FBQUEsRUFDVCxRQUFVO0FBQUEsRUFDVixTQUFXO0FBQUEsRUFDWCxTQUFXO0FBQUEsRUFDWCxVQUFZO0FBQUEsSUFDVjtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxFQUNGO0FBQUEsRUFDQSxTQUFXO0FBQUEsSUFDVCxNQUFRO0FBQUEsSUFDUixjQUFjO0FBQUEsSUFDZCxPQUFTO0FBQUEsSUFDVCxXQUFhO0FBQUEsSUFDYixPQUFTO0FBQUEsSUFDVCxnQkFBa0I7QUFBQSxJQUNsQixtQkFBbUI7QUFBQSxFQUNyQjtBQUFBLEVBQ0EsVUFBWTtBQUFBLEVBQ1osTUFBUTtBQUFBLElBQ04sS0FBTztBQUFBLEVBQ1Q7QUFBQSxFQUNBLFNBQVc7QUFBQSxFQUNYLFlBQWM7QUFB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
