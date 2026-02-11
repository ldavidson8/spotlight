// src/lib/types/search.ts
import type { PaginatedResponse } from './common';

export interface MultiSearchResult {
	id: number;
	media_type: 'movie' | 'tv' | 'person';
	title?: string;
	name?: string;
	overview?: string;
	poster_path?: string | null;
	profile_path?: string | null;
	release_date?: string;
	first_air_date?: string;
	vote_average?: number;
	known_for_department?: string;
}

export type MultiSearchResponse = PaginatedResponse<MultiSearchResult>;
