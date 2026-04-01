import { query } from '$app/server';
import * as v from 'valibot';
import { TimeWindowSchema } from '$lib/schemas/common';
import { countryStore } from '$lib/stores/country.svelte';
import {
	fetchTrendingTv,
	fetchAiringTodayTv,
	fetchOnTheAirTv,
	fetchPopularTv,
	fetchTopRatedTv,
	fetchDiscoverTv,
	fetchTvDetails,
	fetchTvCredits,
	fetchTvAggregateCredits,
	fetchTvImages,
	fetchTvVideos,
	fetchTvRecommendations,
	fetchSimilarTv,
	fetchTvSeasonDetails,
	fetchTvEpisodeDetails,
	searchTv as searchTvServer
} from '$lib/server/tmdb/tv';

export const getTrendingTv = query(
	v.object({
		timeWindow: v.optional(TimeWindowSchema, 'week'),
		country: v.optional(v.string())
	}),
	async ({ timeWindow, country }) => {
		const countryParam = country ?? countryStore.current;
		return fetchTrendingTv(timeWindow, countryParam);
	}
);

export const getAiringTodayTv = query(async () => {
	return fetchAiringTodayTv(countryStore.current);
});

export const getOnTheAirTv = query(async () => {
	return fetchOnTheAirTv(countryStore.current);
});

export const getPopularTv = query(async () => {
	return fetchPopularTv(countryStore.current);
});

export const getTopRatedTv = query(async () => {
	return fetchTopRatedTv(countryStore.current);
});

export const getDiscoverTv = query(
	v.object({
		page: v.optional(v.number(), 1),
		sort_by: v.optional(v.string(), 'popularity.desc'),
		with_genres: v.optional(v.string()),
		first_air_date_year: v.optional(v.number()),
		vote_average_gte: v.optional(v.number()),
		vote_average_lte: v.optional(v.number()),
		with_original_language: v.optional(v.string()),
		country: v.optional(v.string())
	}),
	async (options) => {
		const countryParam = options.country ?? countryStore.current;
		return fetchDiscoverTv({ ...options, country: countryParam });
	}
);

export const getTvDetails = query(
	v.number(),
	async (id) => {
		return fetchTvDetails(id);
	}
);

export const getTvById = getTvDetails;

export const getTvCredits = query(
	v.number(),
	async (id) => {
		return fetchTvCredits(id);
	}
);

export const getTvAggregateCredits = query(
	v.number(),
	async (id) => {
		return fetchTvAggregateCredits(id);
	}
);

export const getTvImages = query(
	v.number(),
	async (id) => {
		return fetchTvImages(id);
	}
);

export const getTvVideos = query(
	v.number(),
	async (id) => {
		return fetchTvVideos(id);
	}
);

export const getTvRecommendations = query(
	v.object({
		id: v.number(),
		page: v.optional(v.number(), 1)
	}),
	async ({ id, page }) => {
		return fetchTvRecommendations(id, page);
	}
);

export const getSimilarTv = query(
	v.object({
		id: v.number(),
		page: v.optional(v.number(), 1)
	}),
	async ({ id, page }) => {
		return fetchSimilarTv(id, page);
	}
);

export const getTvSeasonDetails = query(
	v.object({
		id: v.number(),
		seasonNumber: v.number()
	}),
	async ({ id, seasonNumber }) => {
		return fetchTvSeasonDetails(id, seasonNumber);
	}
);

export const getTvEpisodeDetails = query(
	v.object({
		id: v.number(),
		seasonNumber: v.number(),
		episodeNumber: v.number()
	}),
	async ({ id, seasonNumber, episodeNumber }) => {
		return fetchTvEpisodeDetails(id, seasonNumber, episodeNumber);
	}
);

export const searchTv = query(
	v.object({
		query: v.string(),
		page: v.optional(v.number(), 1),
		firstAirDateYear: v.optional(v.number())
	}),
	async ({ query: searchQuery, page, firstAirDateYear }) => {
		return searchTvServer(searchQuery, page, firstAirDateYear);
	}
);
