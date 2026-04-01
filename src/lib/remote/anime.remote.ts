import { query } from '$app/server';
import * as v from 'valibot';
import {
	fetchTrendingAnime,
	fetchPopularAnime,
	fetchTopRatedAnime,
	fetchAnimeDetails,
	searchAnime as searchAnimeServer
} from '$lib/server/anilist';

export const getTrendingAnime = query(
	v.object({
		page: v.optional(v.number(), 1),
		perPage: v.optional(v.number(), 20),
		seasonYear: v.optional(v.number()),
		season: v.optional(v.picklist(['WINTER', 'SPRING', 'SUMMER', 'FALL']))
	}),
	async ({ page, perPage, seasonYear, season }) => {
		return fetchTrendingAnime(page, perPage, seasonYear, season);
	}
);

export const getPopularAnime = query(
	v.object({
		page: v.optional(v.number(), 1),
		perPage: v.optional(v.number(), 20)
	}),
	async ({ page, perPage }) => {
		return fetchPopularAnime(page, perPage);
	}
);

export const getTopRatedAnime = query(
	v.object({
		page: v.optional(v.number(), 1),
		perPage: v.optional(v.number(), 20)
	}),
	async ({ page, perPage }) => {
		return fetchTopRatedAnime(page, perPage);
	}
);

export const getAnimeDetails = query(
	v.number(),
	async (id) => {
		return fetchAnimeDetails(id);
	}
);

export const getAnimeById = getAnimeDetails;

export const searchAnime = query(
	v.object({
		search: v.string(),
		page: v.optional(v.number(), 1),
		perPage: v.optional(v.number(), 20)
	}),
	async ({ search, page, perPage }) => {
		return searchAnimeServer(search, page, perPage);
	}
);
