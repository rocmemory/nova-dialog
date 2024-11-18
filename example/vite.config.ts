import vue from '@vitejs/plugin-vue'
import vueJsx from '@vitejs/plugin-vue-jsx'
import VueDevTools from 'vite-plugin-vue-devtools'
import { fileURLToPath, URL } from 'node:url'
import { defineConfig, ConfigEnv } from 'vite'

export default defineConfig((config: ConfigEnv) => {
    return {
        plugins: [
            VueDevTools(), vue(), vueJsx()
        ],
        resolve: {
            alias: {
                '@': fileURLToPath(new URL('./src', import.meta.url))
            }
        }
    }
});