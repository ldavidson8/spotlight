import type { PaginatedResponse, Genre } from './common';

export interface Movie {
	id: number;
	title: string;
	original_title: string;
	overview: string;
	poster_path: string | null;
	backdrop_path: string | null;
	release_date: string;
	vote_average: number;
	vote_count: number;
	popularity: number;
	genre_ids: number[];
	original_language: string;
	adult: boolean;
}

export interface MovieDetail extends Omit<Movie, 'genre_ids'> {
	genres: Genre[];
	runtime: number;
	budget: number;
	revenue: number;
	status: string;
	tagline: string;
	homepage: string;
	imdb_id: string;
	belongs_to_collection: {
		id: number;
		name: string;
		poster_path: string | null;
		backdrop_path: string | null;
	} | null;
	credits: { cast: CastMember[]; crew: CrewMember[] };
	videos: { results: Video[] };
	recommendations: MovieListResponse;
	similar: MovieListResponse;
}

export interface CastMember {
	id: number;
	name: string;
	character: string;
	profile_path: string | null;
	order: number;
}

export interface CrewMember {
	id: number;
	name: string;
	job: string;
	department: string;
	profile_path: string | null;
}

export interface Video {
	id: string;
	key: string;
	name: string;
	site: string;
	type: string;
	official: boolean;
}

export type MovieListResponse = PaginatedResponse<Movie>;
