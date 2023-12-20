import { createRouter, createWebHashHistory } from 'vue-router'
import HomeView from '../views/home/home.vue'
import QuizView from '../views/quiz/quiz.vue'

const router = createRouter({
	history: createWebHashHistory(),
	routes: [
		{
			path: '/',
			name: 'Home',
			component: HomeView,
		},
		{
			path: '/quiz',
			name: 'Quiz',
			component: QuizView,
		},
	],
})

export default router
