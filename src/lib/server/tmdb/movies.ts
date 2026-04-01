import { tmdbFetch, TMDB_ENDPOINTS } from '$lib/server/tmdb';
import { getRequestCountry } from '$lib/server/request';
import {
	MovieDetailsSchema,
	MovieListResponseSchema,
	MovieCreditsSchema,
	MovieImagesSchema,
	MovieVideosSchema,
	MovieKeywordsSchema
} from '$lib/schemas/tmdb/movie';
import type { TimeWindow } from '$lib/schemas/common';

export async function fetchTrendingMovies(timeWindow: TimeWindow = 'week', country?: string) {
	const countryParam = country ?? getRequestCountry();
	return tmdbFetch(
		TMDB_ENDPOINTS.TRENDING_MOVIE(timeWindow),
		MovieListResponseSchema,
		{ country: countryParam }
	);
}

export async function fetchNowPlayingMovies(country?: string) {
	const countryParam = country ?? getRequestCountry();
	return tmdbFetch(
		TMDB_ENDPOINTS.NOW_PLAYING,
		MovieListResponseSchema,
		{ country: countryParam }
	);
}

export async function fetchPopularMovies(country?: string) {
	const countryParam = country ?? getRequestCountry();
	return tmdbFetch(
		TMDB_ENDPOINTS.POPULAR_MOVIES,
		MovieListResponseSchema,
		{ country: countryParam }
	);
}

export async function fetchTopRatedMovies(country?: string) {
	const countryParam = country ?? getRequestCountry();
	return tmdbFetch(
		TMDB_ENDPOINTS.TOP_RATED_MOVIES,
		MovieListResponseSchema,
		{ country: countryParam }
	);
}

export async function fetchUpcomingMovies(country?: string) {
	const countryParam = country ?? getRequestCountry();
	return tmdbFetch(
		TMDB_ENDPOINTS.UPCOMING,
		MovieListResponseSchema,
		{ country: countryParam }
	);
}

export async function fetchDiscoverMovies(options: {
	page?: number;
	sort_by?: string;
	with_genres?: string;
	year?: number;
	primary_release_year?: number;
	vote_average_gte?: number;
	vote_average_lte?: number;
	with_original_language?: string;
	country?: string;
}) {
	const { country, ...params } = options;
	const countryParam = country ?? getRequestCountry();
	return tmdbFetch(
		TMDB_ENDPOINTS.DISCOVER_MOVIE,
		MovieListResponseSchema,
		{
			params: {
				...params,
				page: params.page ?? 1,
				sort_by: params.sort_by ?? 'popularity.desc'
			},
			country: countryParam
		}
	);
}

export async function fetchMovieDetails(id: number) {
	return tmdbFetch(
		TMDB_ENDPOINTS.MOVIE_DETAILS(id),
		MovieDetailsSchema
	);
}

export async function fetchMovieCredits(id: number) {
	return tmdbFetch(
		TMDB_ENDPOINTS.MOVIE_CREDITS(id),
		MovieCreditsSchema
	);
}

export async function fetchMovieImages(id: number) {
	return tmdbFetch(
		TMDB_ENDPOINTS.MOVIE_IMAGES(id),
		MovieImagesSchema
	);
}

export async function fetchMovieVideos(id: number) {
	return tmdbFetch(
		TMDB_ENDPOINTS.MOVIE_VIDEOS(id),
		MovieVideosSchema
	);
}

export async function fetchMovieRecommendations(id: number, page: number = 1) {
	return tmdbFetch(
		TMDB_ENDPOINTS.MOVIE_RECOMMENDATIONS(id),
		MovieListResponseSchema,
		{ params: { page } }
	);
}

export async function fetchSimilarMovies(id: number, page: number = 1) {
	return tmdbFetch(
		TMDB_ENDPOINTS.MOVIE_SIMILAR(id),
		MovieListResponseSchema,
		{ params: { page } }
	);
}

export async function fetchMovieKeywords(id: number) {
	return tmdbFetch(
		TMDB_ENDPOINTS.MOVIE_KEYWORDS(id),
		MovieKeywordsSchema
	);
}

export async function searchMovies(query: string, page: number = 1, year?: number) {
	return tmdbFetch(
		TMDB_ENDPOINTS.SEARCH_MOVIE,
		MovieListResponseSchema,
		{
			params: {
				query,
				page,
				year
			}
		}
	);
}
