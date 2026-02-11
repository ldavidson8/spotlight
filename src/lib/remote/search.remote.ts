import * as v from 'valibot';
import { query } from '$app/server';
import { tmdb } from '$lib/server/tmdb';
import { SearchInput } from '$lib/schemas/search';
import type { MultiSearchResponse } from '$lib/types/search';

export const search = query(SearchInput, async ({ query: q, page, type, year }) => {
	switch (type) {
		case 'movie':
			return tmdb<any>('/search/movie', {
				query: q,
				page,
				year,
				include_adult: 'false'
			});
		case 'tv':
			return tmdb<any>('/search/tv', {
				query: q,
				page,
				year,
				include_adult: 'false'
			});
		case 'person':
			return tmdb<any>('/search/person', { query: q, page });
		default:
			return tmdb<MultiSearchResponse>('/search/multi', {
				query: q,
				page,
				include_adult: 'false'
			});
	}
});
