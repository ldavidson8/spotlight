import * as v from 'valibot';
import { query } from '$app/server';
import { error } from '@sveltejs/kit';
import { tmdb } from '$lib/server/tmdb';
import { DiscoverMovieInput } from '$lib/schemas/discover';
import { MovieIdInput } from '$lib/schemas/movie';
import type { MovieListResponse, MovieDetail } from '$lib/types/movie';

export const getPopularMovies = query(v.optional(v.number(), 1), async (page) => {
	return tmdb<MovieListResponse>('/movie/popular', { page });
});

export const getTopRatedMovies = query(v.optional(v.number(), 1), async (page) => {
	return tmdb<MovieListResponse>('/movie/top_rated', { page });
});

export const discoverMovies = query(DiscoverMovieInput, async (params) => {
	return tmdb<MovieListResponse>(
		'/discover/movie',
		params as Record<string, string | number | undefined>
	);
});

export const getMovieDetail = query(MovieIdInput, async (id) => {
	try {
		return await tmdb<MovieDetail>(`/movie/${id}`, {
			append_to_response: 'credits,videos,recommendations,similar,images'
		});
	} catch {
		error(404, 'Movie not found');
	}
});

export const getSimilarMovies = query(
	v.object({
		id: v.pipe(v.number(), v.minValue(1)),
		page: v.optional(v.number(), 1)
	}),
	async ({ id, page }) => {
		return tmdb<MovieListResponse>(`/movie/${id}/similar`, { page });
	}
);

export const getMovieCollection = query(v.pipe(v.number(), v.minValue(1)), async (id) => {
	try {
		return await tmdb<any>(`/collection/${id}`);
	} catch {
		error(404, 'Collection not found');
	}
});
