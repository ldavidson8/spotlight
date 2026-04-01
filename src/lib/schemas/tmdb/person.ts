import * as v from 'valibot';
import { ImageSchema, PaginationSchema } from '$lib/schemas/common';
import { MovieBaseSchema } from './movie';
import { TvBaseSchema } from './tv';

export const PersonBaseSchema = v.object({
	id: v.number(),
	name: v.string(),
	profile_path: v.nullable(v.string()),
	adult: v.boolean(),
	popularity: v.number(),
	known_for_department: v.string(),
	known_for: v.array(v.union([
		v.object({ ...MovieBaseSchema.entries, media_type: v.literal('movie') }),
		v.object({ ...TvBaseSchema.entries, media_type: v.literal('tv') })
	]))
});

export const PersonDetailsSchema = v.object({
	id: v.number(),
	name: v.string(),
	profile_path: v.nullable(v.string()),
	adult: v.boolean(),
	biography: v.string(),
	birthday: v.nullable(v.string()),
	deathday: v.nullable(v.string()),
	gender: v.number(),
	homepage: v.nullable(v.string()),
	imdb_id: v.nullable(v.string()),
	known_for_department: v.string(),
	place_of_birth: v.nullable(v.string()),
	popularity: v.number(),
	also_known_as: v.array(v.string())
});

export const PersonListResponseSchema = v.object({
	...PaginationSchema.entries,
	results: v.array(PersonBaseSchema)
});

export const PersonMovieCreditsSchema = v.object({
	id: v.number(),
	cast: v.array(v.object({
		id: v.number(),
		title: v.string(),
		original_title: v.string(),
		overview: v.string(),
		poster_path: v.nullable(v.string()),
		backdrop_path: v.nullable(v.string()),
		release_date: v.nullable(v.string()),
		genre_ids: v.array(v.number()),
		popularity: v.number(),
		vote_average: v.number(),
		vote_count: v.number(),
		adult: v.boolean(),
		original_language: v.string(),
		video: v.boolean(),
		character: v.string(),
		credit_id: v.string(),
		order: v.number()
	})),
	crew: v.array(v.object({
		id: v.number(),
		title: v.string(),
		original_title: v.string(),
		overview: v.string(),
		poster_path: v.nullable(v.string()),
		backdrop_path: v.nullable(v.string()),
		release_date: v.nullable(v.string()),
		genre_ids: v.array(v.number()),
		popularity: v.number(),
		vote_average: v.number(),
		vote_count: v.number(),
		adult: v.boolean(),
		original_language: v.string(),
		video: v.boolean(),
		credit_id: v.string(),
		department: v.string(),
		job: v.string()
	}))
});

export const PersonTvCreditsSchema = v.object({
	id: v.number(),
	cast: v.array(v.object({
		id: v.number(),
		name: v.string(),
		original_name: v.string(),
		overview: v.string(),
		poster_path: v.nullable(v.string()),
		backdrop_path: v.nullable(v.string()),
		first_air_date: v.nullable(v.string()),
		genre_ids: v.array(v.number()),
		popularity: v.number(),
		vote_average: v.number(),
		vote_count: v.number(),
		adult: v.boolean(),
		original_language: v.string(),
		origin_country: v.array(v.string()),
		character: v.string(),
		credit_id: v.string(),
		episode_count: v.number()
	})),
	crew: v.array(v.object({
		id: v.number(),
		name: v.string(),
		original_name: v.string(),
		overview: v.string(),
		poster_path: v.nullable(v.string()),
		backdrop_path: v.nullable(v.string()),
		first_air_date: v.nullable(v.string()),
		genre_ids: v.array(v.number()),
		popularity: v.number(),
		vote_average: v.number(),
		vote_count: v.number(),
		adult: v.boolean(),
		original_language: v.string(),
		origin_country: v.array(v.string()),
		credit_id: v.string(),
		department: v.string(),
		job: v.string(),
		episode_count: v.number()
	}))
});

export const PersonCombinedCreditsSchema = v.object({
	id: v.number(),
	cast: v.array(v.union([
		v.object({
			id: v.number(),
			title: v.optional(v.string()),
			name: v.optional(v.string()),
			original_title: v.optional(v.string()),
			original_name: v.optional(v.string()),
			overview: v.string(),
			poster_path: v.nullable(v.string()),
			backdrop_path: v.nullable(v.string()),
			release_date: v.optional(v.nullable(v.string())),
			first_air_date: v.optional(v.nullable(v.string())),
			genre_ids: v.array(v.number()),
			popularity: v.number(),
			vote_average: v.number(),
			vote_count: v.number(),
			adult: v.boolean(),
			original_language: v.string(),
			media_type: v.picklist(['movie', 'tv']),
			character: v.string(),
			credit_id: v.string(),
			order: v.optional(v.number()),
			episode_count: v.optional(v.number())
		})
	])),
	crew: v.array(v.union([
		v.object({
			id: v.number(),
			title: v.optional(v.string()),
			name: v.optional(v.string()),
			original_title: v.optional(v.string()),
			original_name: v.optional(v.string()),
			overview: v.string(),
			poster_path: v.nullable(v.string()),
			backdrop_path: v.nullable(v.string()),
			release_date: v.optional(v.nullable(v.string())),
			first_air_date: v.optional(v.nullable(v.string())),
			genre_ids: v.array(v.number()),
			popularity: v.number(),
			vote_average: v.number(),
			vote_count: v.number(),
			adult: v.boolean(),
			original_language: v.string(),
			media_type: v.picklist(['movie', 'tv']),
			credit_id: v.string(),
			department: v.string(),
			job: v.string(),
			episode_count: v.optional(v.number())
		})
	]))
});

export const PersonImagesSchema = v.object({
	id: v.number(),
	profiles: v.array(ImageSchema)
});

export const PersonExternalIdsSchema = v.object({
	id: v.number(),
	freebase_mid: v.nullable(v.string()),
	freebase_id: v.nullable(v.string()),
	imdb_id: v.nullable(v.string()),
	tvrage_id: v.nullable(v.number()),
	wikidata_id: v.nullable(v.string()),
	facebook_id: v.nullable(v.string()),
	instagram_id: v.nullable(v.string()),
	tiktok_id: v.nullable(v.string()),
	twitter_id: v.nullable(v.string()),
	youtube_id: v.nullable(v.string())
});

export type PersonBase = v.InferOutput<typeof PersonBaseSchema>;
export type PersonDetails = v.InferOutput<typeof PersonDetailsSchema>;
export type PersonListResponse = v.InferOutput<typeof PersonListResponseSchema>;
export type PersonMovieCredits = v.InferOutput<typeof PersonMovieCreditsSchema>;
export type PersonTvCredits = v.InferOutput<typeof PersonTvCreditsSchema>;
export type PersonCombinedCredits = v.InferOutput<typeof PersonCombinedCreditsSchema>;
export type PersonImages = v.InferOutput<typeof PersonImagesSchema>;
export type PersonExternalIds = v.InferOutput<typeof PersonExternalIdsSchema>;
