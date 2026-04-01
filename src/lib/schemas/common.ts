import * as v from 'valibot';

export const ImageSchema = v.object({
	aspect_ratio: v.number(),
	height: v.nullable(v.number()),
	iso_639_1: v.nullable(v.string()),
	file_path: v.string(),
	vote_average: v.number(),
	vote_count: v.number(),
	width: v.nullable(v.number())
});

export const GenreSchema = v.object({
	id: v.number(),
	name: v.string()
});

export const ProductionCompanySchema = v.object({
	id: v.number(),
	logo_path: v.nullable(v.string()),
	name: v.string(),
	origin_country: v.string()
});

export const ProductionCountrySchema = v.object({
	iso_3166_1: v.string(),
	name: v.string()
});

export const SpokenLanguageSchema = v.object({
	english_name: v.string(),
	iso_639_1: v.string(),
	name: v.string()
});

export const PaginationSchema = v.object({
	page: v.number(),
	total_pages: v.number(),
	total_results: v.number()
});

export const TimeWindowSchema = v.picklist(['day', 'week']);

export type Image = v.InferOutput<typeof ImageSchema>;
export type Genre = v.InferOutput<typeof GenreSchema>;
export type ProductionCompany = v.InferOutput<typeof ProductionCompanySchema>;
export type ProductionCountry = v.InferOutput<typeof ProductionCountrySchema>;
export type SpokenLanguage = v.InferOutput<typeof SpokenLanguageSchema>;
export type Pagination = v.InferOutput<typeof PaginationSchema>;
export type TimeWindow = v.InferOutput<typeof TimeWindowSchema>;
