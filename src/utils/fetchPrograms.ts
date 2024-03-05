import type { PaginatedResponse, Program } from '@/types';

export async function fetchPrograms(page = 1): Promise<PaginatedResponse<Program> | null> {
	try {
		const response = await fetch(`http://localhost:8000/api/program?page=${page}`, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json',
			},
		});

		if (response.ok) {
			return await response.json();
		} else {
			return null;
		}
	} catch (e: Error | any) {
		if (e instanceof Error) {
			console.log(e.message);
		}
		return null;
	}
}