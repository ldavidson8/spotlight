import * as v from 'valibot';
import { GenreSchema, ImageSchema, PaginationSchema, ProductionCompanySchema, ProductionCountrySchema, SpokenLanguageSchema } from '$lib/schemas/common';

export const TvBaseSchema = v.object({
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
	origin_country: v.array(v.string())
});

export const TvDetailsSchema = v.object({
	id: v.number(),
	name: v.string(),
	original_name: v.string(),
	overview: v.string(),
	poster_path: v.nullable(v.string()),
	backdrop_path: v.nullable(v.string()),
	first_air_date: v.nullable(v.string()),
	genres: v.array(GenreSchema),
	popularity: v.number(),
	vote_average: v.number(),
	vote_count: v.number(),
	adult: v.boolean(),
	original_language: v.string(),
	origin_country: v.array(v.string()),
	episode_run_time: v.array(v.number()),
	in_production: v.boolean(),
	languages: v.array(v.string()),
	last_air_date: v.nullable(v.string()),
	last_episode_to_air: v.nullable(v.object({
		id: v.number(),
		name: v.string(),
		overview: v.string(),
		vote_average: v.number(),
		vote_count: v.number(),
		air_date: v.string(),
		episode_number: v.number(),
		production_code: v.string(),
		runtime: v.nullable(v.number()),
		season_number: v.number(),
		show_id: v.number(),
		still_path: v.nullable(v.string())
	})),
	next_episode_to_air: v.nullable(v.object({
		id: v.number(),
		name: v.string(),
		overview: v.string(),
		vote_average: v.number(),
		vote_count: v.number(),
		air_date: v.string(),
		episode_number: v.number(),
		production_code: v.string(),
		runtime: v.nullable(v.number()),
		season_number: v.number(),
		show_id: v.number(),
		still_path: v.nullable(v.string())
	})),
	networks: v.array(v.object({
		id: v.number(),
		logo_path: v.nullable(v.string()),
		name: v.string(),
		origin_country: v.string()
	})),
	number_of_episodes: v.number(),
	number_of_seasons: v.number(),
	production_companies: v.array(ProductionCompanySchema),
	production_countries: v.array(ProductionCountrySchema),
	seasons: v.array(v.object({
		air_date: v.nullable(v.string()),
		episode_count: v.number(),
		id: v.number(),
		name: v.string(),
		overview: v.string(),
		poster_path: v.nullable(v.string()),
		season_number: v.number()
	})),
	spoken_languages: v.array(SpokenLanguageSchema),
	status: v.string(),
	tagline: v.nullable(v.string()),
	type: v.string(),
	homepage: v.nullable(v.string())
});

export const TvListResponseSchema = v.object({
	...PaginationSchema.entries,
	results: v.array(TvBaseSchema)
});

export const TvCreditsSchema = v.object({
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

export const TvAggregateCreditsSchema = v.object({
	id: v.number(),
	cast: v.array(v.object({
		id: v.number(),
		name: v.string(),
		profile_path: v.nullable(v.string()),
		gender: v.nullable(v.number()),
		roles: v.array(v.object({
			credit_id: v.string(),
			character: v.string(),
			episode_count: v.number()
		})),
		total_episode_count: v.number(),
		order: v.number()
	})),
	crew: v.array(v.object({
		id: v.number(),
		name: v.string(),
		profile_path: v.nullable(v.string()),
		gender: v.nullable(v.number()),
		jobs: v.array(v.object({
			credit_id: v.string(),
			job: v.string(),
			episode_count: v.number()
		})),
		total_episode_count: v.number(),
		department: v.string()
	}))
});

export const TvImagesSchema = v.object({
	id: v.number(),
	backdrops: v.array(ImageSchema),
	posters: v.array(ImageSchema)
});

export const TvVideosSchema = v.object({
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

export const TvKeywordsSchema = v.object({
	id: v.number(),
	results: v.array(v.object({
		id: v.number(),
		name: v.string()
	}))
});

export const TvSeasonDetailsSchema = v.object({
	_id: v.string(),
	air_date: v.nullable(v.string()),
	episodes: v.array(v.object({
		air_date: v.string(),
		episode_number: v.number(),
		id: v.number(),
		name: v.string(),
		overview: v.string(),
		production_code: v.string(),
		runtime: v.nullable(v.number()),
		season_number: v.number(),
		show_id: v.number(),
		still_path: v.nullable(v.string()),
		vote_average: v.number(),
		vote_count: v.number(),
		crew: v.array(v.object({
			department: v.string(),
			job: v.string(),
			credit_id: v.string(),
			adult: v.boolean(),
			gender: v.nullable(v.number()),
			id: v.number(),
			known_for_department: v.string(),
			name: v.string(),
			original_name: v.string(),
			popularity: v.number(),
			profile_path: v.nullable(v.string())
		})),
		guest_stars: v.array(v.object({
			character: v.string(),
			credit_id: v.string(),
			order: v.number(),
			adult: v.boolean(),
			gender: v.nullable(v.number()),
			id: v.number(),
			known_for_department: v.string(),
			name: v.string(),
			original_name: v.string(),
			popularity: v.number(),
			profile_path: v.nullable(v.string())
		}))
	})),
	name: v.string(),
	overview: v.string(),
	id: v.number(),
	poster_path: v.nullable(v.string()),
	season_number: v.number()
});

export const TvEpisodeDetailsSchema = v.object({
	air_date: v.string(),
	crew: v.array(v.object({
		department: v.string(),
		job: v.string(),
		credit_id: v.string(),
		adult: v.boolean(),
		gender: v.nullable(v.number()),
		id: v.number(),
		known_for_department: v.string(),
		name: v.string(),
		original_name: v.string(),
		popularity: v.number(),
		profile_path: v.nullable(v.string())
	})),
	episode_number: v.number(),
	guest_stars: v.array(v.object({
		character: v.string(),
		credit_id: v.string(),
		order: v.number(),
		adult: v.boolean(),
		gender: v.nullable(v.number()),
		id: v.number(),
		known_for_department: v.string(),
		name: v.string(),
		original_name: v.string(),
		popularity: v.number(),
		profile_path: v.nullable(v.string())
	})),
	name: v.string(),
	overview: v.string(),
	id: v.number(),
	production_code: v.string(),
	runtime: v.nullable(v.number()),
	season_number: v.number(),
	still_path: v.nullable(v.string()),
	vote_average: v.number(),
	vote_count: v.number()
});

export type TvBase = v.InferOutput<typeof TvBaseSchema>;
export type TvDetails = v.InferOutput<typeof TvDetailsSchema>;
export type TvListResponse = v.InferOutput<typeof TvListResponseSchema>;
export type TvCredits = v.InferOutput<typeof TvCreditsSchema>;
export type TvAggregateCredits = v.InferOutput<typeof TvAggregateCreditsSchema>;
export type TvImages = v.InferOutput<typeof TvImagesSchema>;
export type TvVideos = v.InferOutput<typeof TvVideosSchema>;
export type TvKeywords = v.InferOutput<typeof TvKeywordsSchema>;
export type TvSeasonDetails = v.InferOutput<typeof TvSeasonDetailsSchema>;
export type TvEpisodeDetails = v.InferOutput<typeof TvEpisodeDetailsSchema>;
