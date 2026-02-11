import * as v from 'valibot';
import { query } from '$app/server';
import { tmdb } from '$lib/server/tmdb';
import type { MovieListResponse } from '$lib/types/movie';
import type { TVListResponse } from '$lib/types/tv';

const TimeWindowInput = v.optional(v.picklist(['day', 'week']), 'week');

export const getTrendingMovies = query(TimeWindowInput, async (timeWindow) => {
	return tmdb<MovieListResponse>(`/trending/movie/${timeWindow}`);
});

export const getTrendingTV = query(TimeWindowInput, async (timeWindow) => {
	return tmdb<TVListResponse>(`/trending/tv/${timeWindow}`);
});

export const getNowPlaying = query(async () => {
	return tmdb<MovieListResponse>('/movie/now_playing');
});

export const getUpcoming = query(async () => {
	return tmdb<MovieListResponse>('/movie/upcoming');
});
