import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import router from './app/router'
import { lazyDirective } from './shared/directives/v-lazy'
import './style.css'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.directive('lazy', lazyDirective)
app.mount('#app')
