
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';

export default defineConfig({
    base: '/earthworm-game-demo/', // GitHub Pages deployment
    server: {
        port: 5173,
        host: true
    },
    build: {
        outDir: 'dist',
        assetsDir: 'assets',
        sourcemap: true
    },
    plugins: [
        VitePWA({
            registerType: 'autoUpdate',
            includeAssets: ['favicon.ico', 'icon-192.png', 'icon-512.png'],
            manifest: {
                name: 'Snake Reborn',
                short_name: 'Snake',
                description: 'Modern mobile snake game with neon aesthetics',
                theme_color: '#172210',
                icons: [
                    {
                        src: 'icon-192.png',
                        sizes: '192x192',
                        type: 'image/png'
                    },
                    {
                        src: 'icon-512.png',
                        sizes: '512x512',
                        type: 'image/png'
                    }
                ]
            }
        })
    ]
});
