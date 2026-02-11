import * as v from 'valibot';
import { query } from '$app/server';
import { error } from '@sveltejs/kit';
import { tmdb } from '$lib/server/tmdb';
import type { PersonDetail } from '$lib/types/person';

export const getPersonDetail = query(v.pipe(v.number(), v.minValue(1)), async (id) => {
	try {
		return await tmdb<PersonDetail>(`/person/${id}`, {
			append_to_response: 'combined_credits,images,external_ids'
		});
	} catch {
		error(404, 'Person not found');
	}
});

export const getPopularPeople = query(v.optional(v.number(), 1), async (page) => {
	return tmdb<any>('/person/popular', { page });
});
