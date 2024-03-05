import { defineStore } from 'pinia';
import { ref } from 'vue';
import { Method, useFetch } from '@/utils/useFetch';
import type { AdditionalService } from '@/types';

export const useAdditionalServiceStore = defineStore('additionalService', () => {
	const additionalServices = ref(
		[
			{
				id: 0,
				title: '',
				price: 0,
			},
		],
	);

	const error = ref<string>('');

	const getAdditionalServices = async (): Promise<void> => {
		try {
			const response = await useFetch<AdditionalService[]>(`${import.meta.env.VITE_API_URL}/additional_service`, Method.GET);

			if (response !== null) {
				additionalServices.value = response;
			}
		} catch (e) {
			if (e instanceof Error) {
				error.value = e.message;
			}
		}
	};

	return { additionalServices, error, getAdditionalServices };
});