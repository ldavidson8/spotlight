import { prerender, query } from '$app/server';
import { error } from '@sveltejs/kit';
import * as v from 'valibot';
import { env } from '$env/dynamic/private';

const ResultSchema = v.object({
	adult: v.boolean(),
	backdrop_path: v.string(),
	genre_ids: v.array(v.number()),
	id: v.number(),
	original_language: v.string(),
	original_title: v.string(),
	overview: v.string(),
	popularity: v.number(),
	poster_path: v.string(),
	release_date: v.string(),
	title: v.string(),
	video: v.boolean(),
	vote_average: v.number(),
	vote_count: v.number()
});

const MoviesResponseSchema = v.object({
	page: v.number(),
	results: v.array(ResultSchema),
	total_pages: v.number(),
	total_results: v.number()
});

const TMDB_BASE = 'https://api.themoviedb.org/3';

async function tmdbFetch(endpoint: string) {
	const res = await fetch(`${TMDB_BASE}${endpoint}`, {
		headers: {
			Authorization: `Bearer ${env.TMDB_BEARER_TOKEN}`,
			accept: 'application/json',
			'Cache-Control': 'max-age:3600'
		}
	});

	if (!res.ok) {
		throw error(500, `TMDB request failed: ${res.status}`);
	}

	const data = await res.json();
	return v.parse(MoviesResponseSchema, data);
}

async function tmdbFetchDetails(endpoint: string) {
	const res = await fetch(`${TMDB_BASE}${endpoint}`, {
		headers: {
			Authorization: `Bearer ${env.TMDB_BEARER_TOKEN}`,
			accept: 'application/json'
		}
	});

	if (res.status === 404) throw error(404, 'Movie not found');
	if (!res.ok) throw error(500, `TMDB request failed: ${res.status}`);

	const data = await res.json();
	return v.parse(MovieDetailsSchema, data);
}

export const getPopularMovies = prerender(async () => {
	return tmdbFetch('/movie/popular?language=en-US&page=1');
});

export const getNowPlayingMovies = query(async () => {
	return tmdbFetch('/movie/now_playing?language=en-US&page=1');
});

export const getTopRatedMovies = query(async () => {
	return tmdbFetch('/movie/top_rated?language=en-US&page=1');
});

export const getMovieById = query(v.string(), (id) => {
	return tmdbFetchDetails(`/movie/${id}?language=en-US`);
});

const MovieDetailsSchema = v.object({
	adult: v.boolean(),
	backdrop_path: v.union([v.string(), v.null()]),
	belongs_to_collection: v.union([
		v.object({
			id: v.number(),
			name: v.string(),
			poster_path: v.union([v.string(), v.null()]),
			backdrop_path: v.union([v.string(), v.null()])
		}),
		v.null()
	]),
	budget: v.number(),
	genres: v.array(v.object({ id: v.number(), name: v.string() })),
	homepage: v.union([v.string(), v.null()]),
	id: v.number(),
	imdb_id: v.union([v.string(), v.null()]),
	origin_country: v.array(v.string()),
	original_language: v.string(),
	original_title: v.string(),
	overview: v.string(),
	popularity: v.number(),
	poster_path: v.union([v.string(), v.null()]),
	production_companies: v.array(
		v.union([
			v.object({
				id: v.number(),
				logo_path: v.union([v.string(), v.null()]),
				name: v.string(),
				origin_country: v.string()
			}),
			v.object({
				id: v.number(),
				logo_path: v.null(),
				name: v.string(),
				origin_country: v.string()
			})
		])
	),
	production_countries: v.array(v.object({ iso_3166_1: v.string(), name: v.string() })),
	release_date: v.string(),
	revenue: v.number(),
	runtime: v.number(),
	spoken_languages: v.array(
		v.object({
			english_name: v.string(),
			iso_639_1: v.string(),
			name: v.string()
		})
	),
	status: v.string(),
	tagline: v.union([v.string(), v.null()]),
	title: v.string(),
	video: v.boolean(),
	vote_average: v.number(),
	vote_count: v.number()
});
