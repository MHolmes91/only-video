import { defineConfig } from 'vite';

export default defineConfig({
  publicDir: 'public',
  build: {
    rollupOptions: {
      input: {
        background: 'src/background.js',
        foreground: 'src/foreground.js',
        style: 'src/only-video.css'
      },
      output: {
        entryFileNames: '[name].js',
        assetFileNames: '[name][extname]'
      }
    },
    outDir: 'dist',
    emptyOutDir: true
  }
});
