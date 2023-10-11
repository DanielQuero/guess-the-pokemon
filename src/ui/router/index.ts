import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/home/home.vue'

const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{
			path: '/',
			name: 'home',
			component: HomeView,
		},
	],
})

export default router
