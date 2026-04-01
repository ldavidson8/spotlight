import * as v from 'valibot';

export const AnilistTitleSchema = v.object({
	romaji: v.nullable(v.string()),
	english: v.nullable(v.string()),
	native: v.nullable(v.string())
});

export const AnilistCoverImageSchema = v.object({
	extraLarge: v.nullable(v.string()),
	large: v.nullable(v.string()),
	medium: v.nullable(v.string()),
	color: v.nullable(v.string())
});

export const AnilistFuzzyDateSchema = v.object({
	year: v.nullable(v.number()),
	month: v.nullable(v.number()),
	day: v.nullable(v.number())
});

export const AnilistStudioSchema = v.object({
	id: v.number(),
	name: v.string(),
	isAnimationStudio: v.boolean(),
	siteUrl: v.nullable(v.string())
});

export const AnilistTagSchema = v.object({
	id: v.number(),
	name: v.string(),
	description: v.nullable(v.string()),
	category: v.nullable(v.string()),
	isGeneralSpoiler: v.boolean(),
	isMediaSpoiler: v.boolean(),
	isAdult: v.boolean()
});

export const AnilistBaseAnimeSchema = v.object({
	id: v.number(),
	idMal: v.nullable(v.number()),
	title: AnilistTitleSchema,
	type: v.picklist(['ANIME', 'MANGA']),
	format: v.nullable(v.picklist(['TV', 'TV_SHORT', 'MOVIE', 'SPECIAL', 'OVA', 'ONA', 'MUSIC', 'MANGA', 'NOVEL', 'ONE_SHOT'])),
	status: v.nullable(v.picklist(['FINISHED', 'RELEASING', 'NOT_YET_RELEASED', 'CANCELLED', 'HIATUS'])),
	description: v.nullable(v.string()),
	startDate: AnilistFuzzyDateSchema,
	endDate: AnilistFuzzyDateSchema,
	season: v.nullable(v.picklist(['WINTER', 'SPRING', 'SUMMER', 'FALL'])),
	seasonYear: v.nullable(v.number()),
	seasonInt: v.nullable(v.number()),
	episodes: v.nullable(v.number()),
	duration: v.nullable(v.number()),
	chapters: v.nullable(v.number()),
	volumes: v.nullable(v.number()),
	countryOfOrigin: v.nullable(v.string()),
	isLicensed: v.nullable(v.boolean()),
	source: v.nullable(v.picklist(['ORIGINAL', 'MANGA', 'LIGHT_NOVEL', 'VISUAL_NOVEL', 'VIDEO_GAME', 'OTHER', 'NOVEL', 'DOUJINSHI', 'ANIME', 'WEB_NOVEL', 'LIVE_ACTION', 'GAME', 'COMIC', 'MULTIMEDIA_PROJECT', 'PICTURE_BOOK'])),
	hashtag: v.nullable(v.string()),
	trailer: v.nullable(v.object({
		id: v.nullable(v.string()),
		site: v.nullable(v.string()),
		thumbnail: v.nullable(v.string())
	})),
	updatedAt: v.nullable(v.number()),
	coverImage: AnilistCoverImageSchema,
	bannerImage: v.nullable(v.string()),
	genres: v.array(v.string()),
	synonyms: v.array(v.string()),
	averageScore: v.nullable(v.number()),
	meanScore: v.nullable(v.number()),
	popularity: v.nullable(v.number()),
	isLocked: v.optional(v.boolean()),
	trending: v.optional(v.number()),
	favourites: v.nullable(v.number()),
	tags: v.optional(v.array(AnilistTagSchema)),
	isFavourite: v.optional(v.boolean()),
	isAdult: v.optional(v.boolean()),
	nextAiringEpisode: v.nullable(v.object({
		airingAt: v.number(),
		timeUntilAiring: v.number(),
		episode: v.number()
	})),
	studios: v.optional(v.object({
		edges: v.array(v.object({
			isMain: v.boolean(),
			node: AnilistStudioSchema
		}))
	})),
	recommendations: v.optional(v.object({
		nodes: v.array(v.object({
			mediaRecommendation: v.nullable(v.object({
				id: v.number(),
				title: AnilistTitleSchema,
				coverImage: AnilistCoverImageSchema
			}))
		}))
	}))
});

export const AnilistAnimeResponseSchema = v.object({
	Page: v.object({
		pageInfo: v.object({
			total: v.nullable(v.number()),
			perPage: v.number(),
			currentPage: v.number(),
			lastPage: v.number(),
			hasNextPage: v.boolean()
		}),
		media: v.array(AnilistBaseAnimeSchema)
	})
});

export const AnilistAnimeDetailsResponseSchema = v.object({
	Media: v.object({
		...AnilistBaseAnimeSchema.entries,
		characters: v.optional(v.object({
			edges: v.array(v.object({
				id: v.number(),
				role: v.picklist(['MAIN', 'SUPPORTING', 'BACKGROUND']),
				node: v.object({
					id: v.number(),
					name: v.object({
						full: v.string(),
						native: v.nullable(v.string()),
						alternative: v.array(v.string())
					}),
					image: v.object({
						large: v.nullable(v.string()),
						medium: v.nullable(v.string())
					})
				}),
				voiceActors: v.array(v.object({
					id: v.number(),
					name: v.object({
						full: v.string(),
						native: v.nullable(v.string())
					}),
					image: v.object({
						large: v.nullable(v.string()),
						medium: v.nullable(v.string())
					}),
					language: v.string()
				}))
			}))
		})),
		relations: v.optional(v.object({
			edges: v.array(v.object({
				id: v.number(),
				relationType: v.picklist(['ADAPTATION', 'PREQUEL', 'SEQUEL', 'PARENT', 'SIDE_STORY', 'CHARACTER', 'SUMMARY', 'ALTERNATIVE', 'SPIN_OFF', 'OTHER', 'SOURCE', 'COMPILATION', 'CONTAINS']),
				node: v.object({
					id: v.number(),
					title: AnilistTitleSchema,
					format: v.nullable(v.string()),
					type: v.picklist(['ANIME', 'MANGA']),
					status: v.nullable(v.string()),
					coverImage: AnilistCoverImageSchema
				})
			}))
		}))
	})
});

export type AnilistTitle = v.InferOutput<typeof AnilistTitleSchema>;
export type AnilistCoverImage = v.InferOutput<typeof AnilistCoverImageSchema>;
export type AnilistFuzzyDate = v.InferOutput<typeof AnilistFuzzyDateSchema>;
export type AnilistBaseAnime = v.InferOutput<typeof AnilistBaseAnimeSchema>;
export type AnilistAnimeResponse = v.InferOutput<typeof AnilistAnimeResponseSchema>;
export type AnilistAnimeDetailsResponse = v.InferOutput<typeof AnilistAnimeDetailsResponseSchema>;
