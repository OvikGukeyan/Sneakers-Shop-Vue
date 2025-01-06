import './assets/main.css'
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'
import { createApp } from 'vue'
import App from './App.vue'
import { createWebHistory, createRouter } from 'vue-router'
import Bookmarks from './pages/Bookmarks.vue'
import Home from './pages/Home.vue'

const routes = [
  { path: '/', name: 'Home', component: Home },
  { path: '/bookmarks', name: 'Bookmarks', component: Bookmarks },
]
const router = createRouter({
  history: createWebHistory(),
  routes,
})
const app = createApp(App)

app.use(autoAnimatePlugin)
app.use(router)

app.mount('#app')
