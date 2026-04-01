import * as v from 'valibot';
import { GenreSchema, ImageSchema, PaginationSchema, ProductionCompanySchema, ProductionCountrySchema, SpokenLanguageSchema } from '$lib/schemas/common';

export const MovieBaseSchema = v.object({
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
	video: v.boolean()
});

export const MovieDetailsSchema = v.object({
	id: v.number(),
	title: v.string(),
	original_title: v.string(),
	overview: v.string(),
	poster_path: v.nullable(v.string()),
	backdrop_path: v.nullable(v.string()),
	release_date: v.nullable(v.string()),
	genres: v.array(GenreSchema),
	popularity: v.number(),
	vote_average: v.number(),
	vote_count: v.number(),
	adult: v.boolean(),
	original_language: v.string(),
	video: v.boolean(),
	budget: v.number(),
	revenue: v.number(),
	runtime: v.nullable(v.number()),
	status: v.string(),
	tagline: v.nullable(v.string()),
	homepage: v.nullable(v.string()),
	imdb_id: v.nullable(v.string()),
	production_companies: v.array(ProductionCompanySchema),
	production_countries: v.array(ProductionCountrySchema),
	spoken_languages: v.array(SpokenLanguageSchema),
	belongs_to_collection: v.nullable(v.object({
		id: v.number(),
		name: v.string(),
		poster_path: v.nullable(v.string()),
		backdrop_path: v.nullable(v.string())
	}))
});

export const MovieListResponseSchema = v.object({
	...PaginationSchema.entries,
	results: v.array(MovieBaseSchema)
});

export const MovieCreditsSchema = v.object({
	id: v.number(),
	cast: v.array(v.object({
		id: v.number(),
		name: v.string(),
		character: v.string(),
		credit_id: v.string(),
		profile_path: v.nullable(v.string()),
		gender: v.nullable(v.number()),
		order: v.number()
	})),
	crew: v.array(v.object({
		id: v.number(),
		name: v.string(),
		credit_id: v.string(),
		profile_path: v.nullable(v.string()),
		gender: v.nullable(v.number()),
		department: v.string(),
		job: v.string()
	}))
});

export const MovieImagesSchema = v.object({
	id: v.number(),
	backdrops: v.array(ImageSchema),
	posters: v.array(ImageSchema)
});

export const MovieVideosSchema = v.object({
	id: v.number(),
	results: v.array(v.object({
		id: v.string(),
		iso_639_1: v.string(),
		iso_3166_1: v.string(),
		key: v.string(),
		name: v.string(),
		site: v.string(),
		size: v.number(),
		type: v.string(),
		official: v.boolean(),
		published_at: v.string()
	}))
});

export const MovieKeywordsSchema = v.object({
	id: v.number(),
	keywords: v.array(v.object({
		id: v.number(),
		name: v.string()
	}))
});

export type MovieBase = v.InferOutput<typeof MovieBaseSchema>;
export type MovieDetails = v.InferOutput<typeof MovieDetailsSchema>;
export type MovieListResponse = v.InferOutput<typeof MovieListResponseSchema>;
export type MovieCredits = v.InferOutput<typeof MovieCreditsSchema>;
export type MovieImages = v.InferOutput<typeof MovieImagesSchema>;
export type MovieVideos = v.InferOutput<typeof MovieVideosSchema>;
export type MovieKeywords = v.InferOutput<typeof MovieKeywordsSchema>;
