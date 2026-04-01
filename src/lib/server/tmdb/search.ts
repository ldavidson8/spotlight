import { tmdbFetch, TMDB_ENDPOINTS } from '$lib/server/tmdb';
import {
	MultiSearchResultSchema,
	SearchMovieResponseSchema,
	SearchTvResponseSchema,
	SearchPersonResponseSchema,
	GenreListResponseSchema
} from '$lib/schemas/tmdb/search';

export async function searchMulti(query: string, page: number = 1) {
	return tmdbFetch(
		TMDB_ENDPOINTS.SEARCH_MULTI,
		MultiSearchResultSchema,
		{
			params: {
				query,
				page
			}
		}
	);
}

export async function searchMovies(query: string, page: number = 1, year?: number) {
	return tmdbFetch(
		TMDB_ENDPOINTS.SEARCH_MOVIE,
		SearchMovieResponseSchema,
		{
			params: {
				query,
				page,
				year
			}
		}
	);
}

export async function searchTv(query: string, page: number = 1, firstAirDateYear?: number) {
	return tmdbFetch(
		TMDB_ENDPOINTS.SEARCH_TV,
		SearchTvResponseSchema,
		{
			params: {
				query,
				page,
				first_air_date_year: firstAirDateYear
			}
		}
	);
}

export async function searchPeople(query: string, page: number = 1) {
	return tmdbFetch(
		TMDB_ENDPOINTS.SEARCH_PERSON,
		SearchPersonResponseSchema,
		{
			params: {
				query,
				page
			}
		}
	);
}

export async function fetchMovieGenres() {
	return tmdbFetch(
		TMDB_ENDPOINTS.MOVIE_GENRES,
		GenreListResponseSchema
	);
}

export async function fetchTvGenres() {
	return tmdbFetch(
		TMDB_ENDPOINTS.TV_GENRES,
		GenreListResponseSchema
	);
}
