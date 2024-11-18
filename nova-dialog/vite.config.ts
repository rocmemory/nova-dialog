import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig({
    plugins: [vue()],
    build: {
        rollupOptions: {
            external: ['vue'],
            input: 'index.ts'
        },
        lib: {
            entry: 'index.ts',
            name: 'nova-dialog'
          }
    }
})