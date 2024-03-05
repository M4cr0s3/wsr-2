import { defineStore } from 'pinia';
import type { City } from '@/types';
import { ref } from 'vue';
import { Method, useFetch } from '@/utils/useFetch';

export const useCityStore = defineStore('city', () => {
	const cities = ref<City[]>([]);
	const error = ref<string>('');
	const getCities = async () => {
		try {
			const response = await useFetch<City[]>(`${import.meta.env.VITE_API_URL}/cities`, Method.GET);

			if (response !== null) {
				cities.value = response;
			}
		} catch (e) {
			if (e instanceof Error) {
				error.value = e.message;
			}
		}
	};

	return { cities, getCities };
});