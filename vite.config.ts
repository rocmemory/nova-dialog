import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from 'vite-plugin-vue-devtools'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv, ConfigEnv } from 'vite'
import dns from 'dns'

dns.setDefaultResultOrder('verbatim')

export default defineConfig((config: ConfigEnv) => {
    const env = loadEnv(config.mode, process.cwd());
    return {
        plugins: [
            VueDevTools(), vue(), vueJsx()
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        },
        server: {
            proxy: {
                '/lowcode.api': {
                    target: env.VITE_LOWCODE_HOST,
                    changeOrigin: true,
                    ws: false,
                    rewrite: (path: string) => path.replace(/^\/lowcode.api/, '/')
                },
                '/doc.api': {
                    target: env.VITE_DOC_HOST,
                    changeOrigin: true,
                    ws: false,
                    rewrite: (path: string) => path.replace(/^\/doc.api/, '/')
                },
                '/flow.api': {
                    target: env.VITE_FLOW_HOST,
                    changeOrigin: true,
                    ws: false,
                    rewrite: (path: string) => path.replace(/^\/flow.api/, '/')
                },
                '/dev.api': {
                    target: env.VITE_FLOW_HOST,
                    changeOrigin: true,
                    ws: false,
                    rewrite: (path: string) => path.replace(/^\/dev.api/, '/')
                },
                '/file.api': {
                    target: env.VITE_FILE_HOST,
                    changeOrigin: true,
                    ws: false,
                    rewrite: (path: string) => path.replace(/^\/file.api/, '/')
                },
                '/kcloak.api': {
                    target: env.VITE_APP_SSO_URL,
                    changeOrigin: true,
                    ws: false,
                    rewrite: (path: string) => path.replace(/^\/kcloak.api/, '/')
                },
                '/mock.api': {
                    target: env.VITE_MOCK_HOST,
                    changeOrigin: true,
                    ws: false,
                    rewrite: (path: string) => path.replace(/^\/mock.api/, '/')
                }
            }
        }
    }
});