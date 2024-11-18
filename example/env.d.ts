/// <reference types="vite/client" />

declare module '*.vue' {
    import type { DefineComponent } from 'vue'
    const vueComponent: DefineComponent<{}, {}, any>
    export default vueComponent
}

declare module 'quill-image-extend-module'
declare module 'vue-splitpane'
declare module 'vue-grid-layout'