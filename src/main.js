import { createApp } from 'vue'
import App from './App.vue'
import router from './router'

import './assets/style/index.less'
import './assets/font/iconfont.css'

console.log(process.env.NODE_ENV)

createApp(App).use(router).mount('#app')
