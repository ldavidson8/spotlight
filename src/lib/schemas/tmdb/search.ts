import * as v from 'valibot';
import { GenreSchema, PaginationSchema } from '$lib/schemas/common';
import { MovieBaseSchema } from './movie';
import { TvBaseSchema } from './tv';
import { PersonBaseSchema } from './person';

export const GenreListResponseSchema = v.object({
	genres: v.array(GenreSchema)
});

export const MultiSearchResultSchema = v.object({
	...PaginationSchema.entries,
	results: v.array(v.union([
		v.object({
			...MovieBaseSchema.entries,
			media_type: v.literal('movie')
		}),
		v.object({
			...TvBaseSchema.entries,
			media_type: v.literal('tv')
		}),
		v.object({
			id: v.number(),
			name: v.string(),
			original_name: v.string(),
			media_type: v.literal('person'),
			adult: v.boolean(),
			popularity: v.number(),
			gender: v.number(),
			known_for_department: v.string(),
			profile_path: v.nullable(v.string()),
			known_for: v.array(v.union([
				v.object({ ...MovieBaseSchema.entries, media_type: v.literal('movie') }),
				v.object({ ...TvBaseSchema.entries, media_type: v.literal('tv') })
			]))
		})
	]))
});

export const SearchMovieResponseSchema = v.object({
	...PaginationSchema.entries,
	results: v.array(MovieBaseSchema)
});

export const SearchTvResponseSchema = v.object({
	...PaginationSchema.entries,
	results: v.array(TvBaseSchema)
});

export const SearchPersonResponseSchema = v.object({
	...PaginationSchema.entries,
	results: v.array(PersonBaseSchema)
});

export type GenreListResponse = v.InferOutput<typeof GenreListResponseSchema>;
export type MultiSearchResult = v.InferOutput<typeof MultiSearchResultSchema>;
export type SearchMovieResponse = v.InferOutput<typeof SearchMovieResponseSchema>;
export type SearchTvResponse = v.InferOutput<typeof SearchTvResponseSchema>;
export type SearchPersonResponse = v.InferOutput<typeof SearchPersonResponseSchema>;
