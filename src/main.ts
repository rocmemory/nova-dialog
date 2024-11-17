import 'element-plus/dist/index.css'

import { createApp } from 'vue'
import App from './example/app.vue'
const app = createApp(App);

import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
app.use(ElementPlus, { locale: zhCn })

app.mount('#app')