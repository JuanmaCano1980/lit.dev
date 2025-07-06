import { defineConfig } from 'vite';

export default defineConfig({
  plugins: [],
  test: {
    globals: true,
    environment: 'jsdom',
  },
  build: {
    minify: 'terser',
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['lit'],
        },
      },
    },
  },
});
