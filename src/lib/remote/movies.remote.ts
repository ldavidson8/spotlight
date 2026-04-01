import { query } from '$app/server';
import * as v from 'valibot';
import { TimeWindowSchema } from '$lib/schemas/common';
import { countryStore } from '$lib/stores/country.svelte';
import {
	fetchTrendingMovies,
	fetchNowPlayingMovies,
	fetchPopularMovies,
	fetchTopRatedMovies,
	fetchUpcomingMovies,
	fetchDiscoverMovies,
	fetchMovieDetails,
	fetchMovieCredits,
	fetchMovieImages,
	fetchMovieVideos,
	fetchMovieRecommendations,
	fetchSimilarMovies,
	searchMovies as searchMoviesServer
} from '$lib/server/tmdb/movies';

export const getTrendingMovies = query(
	v.object({
		timeWindow: v.optional(TimeWindowSchema, 'week'),
		country: v.optional(v.string())
	}),
	async ({ timeWindow, country }) => {
		const countryParam = country ?? countryStore.current;
		return fetchTrendingMovies(timeWindow, countryParam);
	}
);

export const getNowPlayingMovies = query(async () => {
	return fetchNowPlayingMovies(countryStore.current);
});

export const getPopularMovies = query(async () => {
	return fetchPopularMovies(countryStore.current);
});

export const getTopRatedMovies = query(async () => {
	return fetchTopRatedMovies(countryStore.current);
});

export const getUpcomingMovies = query(async () => {
	return fetchUpcomingMovies(countryStore.current);
});

export const getDiscoverMovies = query(
	v.object({
		page: v.optional(v.number(), 1),
		sort_by: v.optional(v.string(), 'popularity.desc'),
		with_genres: v.optional(v.string()),
		year: v.optional(v.number()),
		primary_release_year: v.optional(v.number()),
		vote_average_gte: v.optional(v.number()),
		vote_average_lte: v.optional(v.number()),
		with_original_language: v.optional(v.string()),
		country: v.optional(v.string())
	}),
	async (options) => {
		const countryParam = options.country ?? countryStore.current;
		return fetchDiscoverMovies({ ...options, country: countryParam });
	}
);

export const getMovieDetails = query(
	v.number(),
	async (id) => {
		return fetchMovieDetails(id);
	}
);

export const getMovieById = getMovieDetails;

export const getMovieCredits = query(
	v.number(),
	async (id) => {
		return fetchMovieCredits(id);
	}
);

export const getMovieImages = query(
	v.number(),
	async (id) => {
		return fetchMovieImages(id);
	}
);

export const getMovieVideos = query(
	v.number(),
	async (id) => {
		return fetchMovieVideos(id);
	}
);

export const getMovieRecommendations = query(
	v.object({
		id: v.number(),
		page: v.optional(v.number(), 1)
	}),
	async ({ id, page }) => {
		return fetchMovieRecommendations(id, page);
	}
);

export const getSimilarMovies = query(
	v.object({
		id: v.number(),
		page: v.optional(v.number(), 1)
	}),
	async ({ id, page }) => {
		return fetchSimilarMovies(id, page);
	}
);

export const searchMovies = query(
	v.object({
		query: v.string(),
		page: v.optional(v.number(), 1),
		year: v.optional(v.number())
	}),
	async ({ query: searchQuery, page, year }) => {
		return searchMoviesServer(searchQuery, page, year);
	}
);
