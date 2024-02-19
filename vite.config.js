import { resolve } from 'path';
import { defineConfig } from 'vite';
import { ViteMinifyPlugin } from 'vite-plugin-minify';

export default defineConfig({
  server: {
    port: 3000,
  },
  build: {
    rollupOptions: {
      input: {
        file: resolve(__dirname, 'index.html'),
      },
    },
  },
  plugins: [ViteMinifyPlugin({})],
});
