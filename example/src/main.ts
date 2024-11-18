import { createApp } from 'vue'
import App from './demo/app.vue'
const app = createApp(App);

import 'element-plus/dist/index.css'
import ElementPlus from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
app.use(ElementPlus, { locale: zhCn })

app.mount('#app')