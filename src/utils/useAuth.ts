import { Method, useFetch } from '@/utils/useFetch';
import type { Credentials, LoginCredentials, Nullable, NullableAuthSuccessResponse, User } from '@/types';
import { ref } from 'vue';

const user = ref<Pick<User, 'city' | 'email' | 'id' | 'isLoggedIn' | 'name' | 'phone_number'>>({
	id: 0,
	name: '',
	phone_number: '',
	email: '',
	city: {
		id: 0,
		title: '',
	},
	isLoggedIn: false,
});

export default () => {
	const checkAuth = async (): Promise<boolean> => {
		if (user.value.isLoggedIn) return true;

		try {
			const response = await useFetch<User>(`${import.meta.env.VITE_API_URL}/user`, Method.GET);

			if (response !== null) {
				user.value = response;
				user.value.isLoggedIn = true;
				return true;
			}
		} catch (e) {
			if (e instanceof Error) {
				console.error(e.message);
			}
		}

		return false;
	};

	const login = async (data: LoginCredentials): Promise<void> => {
		try {
			const response = await useFetch<NullableAuthSuccessResponse, LoginCredentials>(`${import.meta.env.VITE_API_URL}/auth/authorization`, Method.POST, data);

			if (response?.success) {
				user.value.isLoggedIn = true;
			}
		} catch (e) {
			if (e instanceof Error) {
				console.error(e.message);
			}
		}
	};

	const register = async (data: Credentials): Promise<void> => {
		try {
			const response = await useFetch<NullableAuthSuccessResponse, Credentials>(
				`${import.meta.env.VITE_API_URL}/auth/registration`,
				Method.POST,
				data,
			);

			if (response?.success) {
				user.value.isLoggedIn = true;
			}
		} catch (e) {
			if (e instanceof Error) {
				console.error(e.message);
			}
		}
	};

	return {
		user,
		checkAuth,
		login,
		register,
	};
}