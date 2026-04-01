import { tmdbFetch, TMDB_ENDPOINTS } from '$lib/server/tmdb';
import { getRequestCountry } from '$lib/server/request';
import {
	TvDetailsSchema,
	TvListResponseSchema,
	TvCreditsSchema,
	TvAggregateCreditsSchema,
	TvImagesSchema,
	TvVideosSchema,
	TvKeywordsSchema,
	TvSeasonDetailsSchema,
	TvEpisodeDetailsSchema
} from '$lib/schemas/tmdb/tv';
import type { TimeWindow } from '$lib/schemas/common';

export async function fetchTrendingTv(timeWindow: TimeWindow = 'week', country?: string) {
	const countryParam = country ?? getRequestCountry();
	return tmdbFetch(
		TMDB_ENDPOINTS.TRENDING_TV(timeWindow),
		TvListResponseSchema,
		{ country: countryParam }
	);
}

export async function fetchAiringTodayTv(country?: string) {
	const countryParam = country ?? getRequestCountry();
	return tmdbFetch(
		TMDB_ENDPOINTS.AIRING_TODAY,
		TvListResponseSchema,
		{ country: countryParam }
	);
}

export async function fetchOnTheAirTv(country?: string) {
	const countryParam = country ?? getRequestCountry();
	return tmdbFetch(
		TMDB_ENDPOINTS.ON_THE_AIR,
		TvListResponseSchema,
		{ country: countryParam }
	);
}

export async function fetchPopularTv(country?: string) {
	const countryParam = country ?? getRequestCountry();
	return tmdbFetch(
		TMDB_ENDPOINTS.POPULAR_TV,
		TvListResponseSchema,
		{ country: countryParam }
	);
}

export async function fetchTopRatedTv(country?: string) {
	const countryParam = country ?? getRequestCountry();
	return tmdbFetch(
		TMDB_ENDPOINTS.TOP_RATED_TV,
		TvListResponseSchema,
		{ country: countryParam }
	);
}

export async function fetchDiscoverTv(options: {
	page?: number;
	sort_by?: string;
	with_genres?: string;
	first_air_date_year?: number;
	vote_average_gte?: number;
	vote_average_lte?: number;
	with_original_language?: string;
	country?: string;
}) {
	const { country, ...params } = options;
	const countryParam = country ?? getRequestCountry();
	return tmdbFetch(
		TMDB_ENDPOINTS.DISCOVER_TV,
		TvListResponseSchema,
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

export async function fetchTvDetails(id: number) {
	return tmdbFetch(
		TMDB_ENDPOINTS.TV_DETAILS(id),
		TvDetailsSchema
	);
}

export async function fetchTvCredits(id: number) {
	return tmdbFetch(
		TMDB_ENDPOINTS.TV_CREDITS(id),
		TvCreditsSchema
	);
}

export async function fetchTvAggregateCredits(id: number) {
	return tmdbFetch(
		TMDB_ENDPOINTS.TV_AGGREGATE_CREDITS(id),
		TvAggregateCreditsSchema
	);
}

export async function fetchTvImages(id: number) {
	return tmdbFetch(
		TMDB_ENDPOINTS.TV_IMAGES(id),
		TvImagesSchema
	);
}

export async function fetchTvVideos(id: number) {
	return tmdbFetch(
		TMDB_ENDPOINTS.TV_VIDEOS(id),
		TvVideosSchema
	);
}

export async function fetchTvRecommendations(id: number, page: number = 1) {
	return tmdbFetch(
		TMDB_ENDPOINTS.TV_RECOMMENDATIONS(id),
		TvListResponseSchema,
		{ params: { page } }
	);
}

export async function fetchSimilarTv(id: number, page: number = 1) {
	return tmdbFetch(
		TMDB_ENDPOINTS.TV_SIMILAR(id),
		TvListResponseSchema,
		{ params: { page } }
	);
}

export async function fetchTvKeywords(id: number) {
	return tmdbFetch(
		TMDB_ENDPOINTS.TV_KEYWORDS(id),
		TvKeywordsSchema
	);
}

export async function fetchTvSeasonDetails(id: number, seasonNumber: number) {
	return tmdbFetch(
		TMDB_ENDPOINTS.TV_SEASON_DETAILS(id, seasonNumber),
		TvSeasonDetailsSchema
	);
}

export async function fetchTvEpisodeDetails(id: number, seasonNumber: number, episodeNumber: number) {
	return tmdbFetch(
		TMDB_ENDPOINTS.TV_EPISODE_DETAILS(id, seasonNumber, episodeNumber),
		TvEpisodeDetailsSchema
	);
}

export async function searchTv(query: string, page: number = 1, firstAirDateYear?: number) {
	return tmdbFetch(
		TMDB_ENDPOINTS.SEARCH_TV,
		TvListResponseSchema,
		{
			params: {
				query,
				page,
				first_air_date_year: firstAirDateYear
			}
		}
	);
}
