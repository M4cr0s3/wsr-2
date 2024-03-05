import { createRouter, createWebHistory } from 'vue-router';
import useAuth from '@/utils/useAuth';

const { checkAuth } = useAuth();

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/register',
			name: 'register',
			component: () => import('@/views/Register.vue'),
			meta: {
				guest: true,
			},
		},
		{
			path: '/login',
			name: 'login',
			component: () => import('@/views/Login.vue'),
			meta: {
				guest: true,
			},
		},
		{
			path: '/programs',
			name: 'programs',
			component: () => import('@/views/Programs.vue'),
			meta: {
				guest: true,
			},
		},
		{
			path: '/program/:id',
			name: 'program',
			props: true,
			component: () => import('@/views/Program.vue'),
			meta: {
				requiresAuth: true,
			},
		},
	],
});

router.beforeEach(async (to, from, next) => {
	if (to.meta.requiresAuth) {
		if (!(await checkAuth())) {
			return next({ name: 'login' });
		}
	} else if (to.meta.guest) {
		if (await checkAuth()) {
			if (to.name !== 'programs') {
				return next({ name: 'programs' });
			} else {
				next();
			}
		}
	}
	next();
});


export default router;