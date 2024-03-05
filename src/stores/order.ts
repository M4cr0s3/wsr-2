import { defineStore } from 'pinia';
import { ref } from 'vue';
import type { Order, OrderInput } from '@/types';
import { Method, useFetch } from '@/utils/useFetch';

export const useOrderStore = defineStore('order', () => {
	const order = ref<Order>({});

	const makeOrder = async (data: OrderInput): Promise<void> => {
		try {
			const response = await useFetch<Order, OrderInput>(`${import.meta.env.VITE_API_URL}/order`, Method.POST, data, true);

			if (response !== null) {
				order.value = response;
			}
		} catch (e) {
			console.error();
		}
	};

	return { order, makeOrder };
});