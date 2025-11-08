import { defineConfig } from 'vite';

export default defineConfig({
    base: '/fnaf_happy_birthday/',
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
