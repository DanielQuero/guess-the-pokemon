import 'reflect-metadata'
import './ui/assets/styles/main.sass'
import { createApp } from 'vue'
import App from './ui/app/App.vue'
import router from './ui/router'
import { DiContainer } from './diContainer'

const diContainer = new DiContainer()

// < Pinia >
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)
// </ Pinia >

createApp(App).use(pinia).use(router).use(diContainer).mount('#app')
