import { prerender } from '$app/server';
import { tmdb } from '$lib/server/tmdb';
import type { Genre } from '$lib/types/common';

interface GenresResponse {
	genres: Genre[];
}

export const getMovieGenres = prerender(async () => {
	const data = await tmdb<GenresResponse>('/genre/movie/list');
	return data.genres;
});

export const getTvGenres = prerender(async () => {
	const data = await tmdb<GenresResponse>('/genre/tv/list');
	return data.genres;
});
