import { tmdbFetch, TMDB_ENDPOINTS } from '$lib/server/tmdb';
import {
	PersonDetailsSchema,
	PersonListResponseSchema,
	PersonMovieCreditsSchema,
	PersonTvCreditsSchema,
	PersonCombinedCreditsSchema,
	PersonImagesSchema,
	PersonExternalIdsSchema
} from '$lib/schemas/tmdb/person';
import type { TimeWindow } from '$lib/schemas/common';

export async function fetchTrendingPeople(timeWindow: TimeWindow = 'week') {
	return tmdbFetch(
		TMDB_ENDPOINTS.TRENDING_PERSON(timeWindow),
		PersonListResponseSchema
	);
}

export async function fetchPopularPeople(page: number = 1) {
	return tmdbFetch(
		TMDB_ENDPOINTS.POPULAR_PEOPLE,
		PersonListResponseSchema,
		{ params: { page } }
	);
}

export async function fetchPersonDetails(id: number) {
	return tmdbFetch(
		TMDB_ENDPOINTS.PERSON_DETAILS(id),
		PersonDetailsSchema
	);
}

export async function fetchPersonMovieCredits(id: number) {
	return tmdbFetch(
		TMDB_ENDPOINTS.PERSON_MOVIE_CREDITS(id),
		PersonMovieCreditsSchema
	);
}

export async function fetchPersonTvCredits(id: number) {
	return tmdbFetch(
		TMDB_ENDPOINTS.PERSON_TV_CREDITS(id),
		PersonTvCreditsSchema
	);
}

export async function fetchPersonCombinedCredits(id: number) {
	return tmdbFetch(
		TMDB_ENDPOINTS.PERSON_COMBINED_CREDITS(id),
		PersonCombinedCreditsSchema
	);
}

export async function fetchPersonImages(id: number) {
	return tmdbFetch(
		TMDB_ENDPOINTS.PERSON_IMAGES(id),
		PersonImagesSchema
	);
}

export async function fetchPersonExternalIds(id: number) {
	return tmdbFetch(
		TMDB_ENDPOINTS.PERSON_EXTERNAL_IDS(id),
		PersonExternalIdsSchema
	);
}

export async function searchPeople(query: string, page: number = 1) {
	return tmdbFetch(
		TMDB_ENDPOINTS.SEARCH_PERSON,
		PersonListResponseSchema,
		{
			params: {
				query,
				page
			}
		}
	);
}
