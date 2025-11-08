import { defineConfig } from 'vite';

export default defineConfig({
    base: 'https://karlpham.github.io/fnaf_happy_birthday',
    build: {
        rollupOptions: {
            output: {
                manualChunks: {
                    phaser: ['phaser']
                }
            }
        },
    },
    server: {
        port: 8080
    }
});
