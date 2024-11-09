import { createHead } from '@unhead/vue'
import { vTooltip } from 'floating-vue'
import { createPinia } from 'pinia'

import { createApp } from 'vue'
import App from './App.vue'

import router from './router'
import './assets/index.css'

import 'floating-vue/dist/style.css'

const app = createApp(App)

const head = createHead()

app.use(createPinia())
app.use(router)
app.use(head)
app.directive('tooltip', vTooltip)

app.mount('#app')
