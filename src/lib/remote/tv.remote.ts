import * as v from 'valibot';
import { query } from '$app/server';
import { error } from '@sveltejs/kit';
import { tmdb } from '$lib/server/tmdb';
import { DiscoverTVInput } from '$lib/schemas/discover';
import { TVIdInput, SeasonInput } from '$lib/schemas/tv';
import type { TVListResponse, TVDetail, SeasonDetail } from '$lib/types/tv';

export const getPopularTV = query(v.optional(v.number(), 1), async (page) => {
	return tmdb<TVListResponse>('/tv/popular', { page });
});

export const getTopRatedTV = query(v.optional(v.number(), 1), async (page) => {
	return tmdb<TVListResponse>('/tv/top_rated', { page });
});

export const discoverTV = query(DiscoverTVInput, async (params) => {
	return tmdb<TVListResponse>(
		'/discover/tv',
		params as Record<string, string | number | undefined>
	);
});

export const getTVDetail = query(TVIdInput, async (id) => {
	try {
		return await tmdb<TVDetail>(`/tv/${id}`, {
			append_to_response: 'credits,videos,recommendations,similar,images'
		});
	} catch {
		error(404, 'TV show not found');
	}
});

export const getSeasonDetail = query(SeasonInput, async ({ tvId, seasonNumber }) => {
	try {
		return await tmdb<SeasonDetail>(`/tv/${tvId}/season/${seasonNumber}`);
	} catch {
		error(404, 'Season not found');
	}
});
