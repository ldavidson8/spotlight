import { prerender } from '$app/server';
import { fetchMovieGenres, fetchTvGenres } from '$lib/server/tmdb/search';

export const getMovieGenres = prerender(async () => {
	return fetchMovieGenres();
});

export const getTvGenres = prerender(async () => {
	return fetchTvGenres();
});
