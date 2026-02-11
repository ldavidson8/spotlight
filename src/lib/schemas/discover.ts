import * as v from 'valibot';

export const DiscoverMovieInput = v.object({
	sort_by: v.optional(v.string(), 'popularity.desc'),
	with_genres: v.optional(v.string()),
	'primary_release_date.gte': v.optional(v.string()),
	'primary_release_date.lte': v.optional(v.string()),
	'vote_average.gte': v.optional(v.number()),
	'vote_average.lte': v.optional(v.number()),
	with_original_language: v.optional(v.string()),
	page: v.optional(v.number(), 1)
});

export type DiscoverMovieInput = v.InferInput<typeof DiscoverMovieInput>;

export const DiscoverTVInput = v.object({
	sort_by: v.optional(v.string(), 'popularity.desc'),
	with_genres: v.optional(v.string()),
	'first_air_date.gte': v.optional(v.string()),
	'first_air_date.lte': v.optional(v.string()),
	'vote_average.gte': v.optional(v.number()),
	with_original_language: v.optional(v.string()),
	with_status: v.optional(v.string()),
	page: v.optional(v.number(), 1)
});

export type DiscoverTVInput = v.InferInput<typeof DiscoverTVInput>;
