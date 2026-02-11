import * as v from 'valibot';

export const SearchInput = v.object({
	query: v.pipe(v.string(), v.nonEmpty()),
	page: v.optional(v.number(), 1),
	type: v.optional(v.picklist(['multi', 'movie', 'tv', 'person']), 'multi'),
	year: v.optional(v.number())
});

export type SearchInput = v.InferInput<typeof SearchInput>;
