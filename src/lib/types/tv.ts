import type { PaginatedResponse, Genre } from '$lib/types/common';

export interface TVShow {
	id: number;
	name: string;
	original_name: string;
	overview: string;
	poster_path: string | null;
	backdrop_path: string | null;
	first_air_date: string;
	vote_average: number;
	vote_count: number;
	popularity: number;
	genre_ids: number[];
	origin_country: string[];
	original_language: string;
}

export interface TVDetail extends Omit<TVShow, 'genre_ids'> {
	genres: Genre[];
	number_of_seasons: number;
	number_of_episodes: number;
	status: string;
	tagline: string;
	episode_run_time: number[];
	seasons: Season[];
	created_by: Array<{ id: number; name: string; profile_path: string | null }>;
	networks: Array<{ id: number; name: string; logo_path: string | null }>;
	credits: any;
	videos: any;
	recommendations: TVListResponse;
	similar: TVListResponse;
}

export interface Season {
	id: number;
	season_number: number;
	name: string;
	overview: string;
	poster_path: string | null;
	air_date: string;
	episode_count: number;
}

export interface Episode {
	id: number;
	episode_number: number;
	season_number: number;
	name: string;
	overview: string;
	air_date: string;
	still_path: string | null;
	vote_average: number;
	runtime: number;
}

export interface SeasonDetail extends Season {
	episodes: Episode[];
}

export type TVListResponse = PaginatedResponse<TVShow>;
