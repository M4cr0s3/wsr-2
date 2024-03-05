import type { Nullable } from '@/types';

export enum Method {
	GET = 'GET',
	POST = 'POST',
	PATCH = 'PATCH',
	PUT = 'PUT',
	DELETE = 'DELETE'
}

export async function useFetch<T, U = undefined>(
	url: string,
	method: Method,
	body?: U
): Promise<Nullable<T>> {
	try {
		const headers = {
			method: method,
			headers: {
				'Content-Type': 'application/json',
			},
			body: body !== undefined ? JSON.stringify(body) : undefined,
			credentials: 'include',
		} as RequestInit;

		const response = await fetch(url, headers);

		if (!response.ok) {
			throw new Error(`HTTP error! Status: ${response.status}`);
		}

		return await response.json();
	} catch (e) {
		console.error('Error in useFetch:', e);
		throw e;
	}
}