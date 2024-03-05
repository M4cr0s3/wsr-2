import { defineStore } from 'pinia';
import type { PaginatedResponse, Program } from '@/types';
import { ref } from 'vue';
import { fetchPrograms } from '@/utils/fetchPrograms';
import { Method, useFetch } from '@/utils/useFetch';

export const useProgramStore = defineStore('program', () => {
	const program = ref<Program>({
		id: 0,
		title: '',
		description: '',
		preview_image_path: '',
		price: 0,
		discount_price: 0,
		city: {
			id: 0,
			title: '',
		},
		service: {
			id: 0,
			title: '',
		},
		photos: [
			{
				id: 0,
				program_id: 0,
				image_path: '',
			},
		],
		outfits: [
			{
				id: 0,
				title: '',
				preview_image_path: '',
				employees: [],
			},
		],
		days: [],
		max_people_count: 0,
	});

	const programs = ref<PaginatedResponse<Program>>({
		current_page: 0,
		data: [],
		first_page_url: '',
		from: 0,
		last_page: 0,
		last_page_url: '',
		links: [],
		next_page_url: '',
		path: '',
		per_page: 0,
		prev_page_url: '',
		to: 0,
		total: 0,
	});

	const getPrograms = async (page: number = 1): Promise<void> => {
		try {
			const response = await fetchPrograms(page);

			if (response) {
				programs.value = response;
			}
		} catch (e) {
			console.log(e);
		}
	};

	const getProgram = async (id: number): Promise<void> => {
		try {
			const response = await useFetch<Program>(`${import.meta.env.VITE_API_URL}/program/${id}`, Method.GET);

			if (response !== null) {
				program.value = response;
			}
		} catch (e) {
			console.log(e);
		}
	};

	return { program, programs, getPrograms, getProgram };
});