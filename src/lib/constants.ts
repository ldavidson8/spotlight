export const TMDB_BASE_URL = 'https://api.themoviedb.org/3';
export const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';
export const EXTERNAL_RATINGS_WORKER_URL = 'https://ratings-scraper.your-worker.workers.dev';
export const ANILIST_API_URL = 'https://graphql.anilist.co';

export const IMAGE_SIZES = {
	poster: {
		small: 'w185',
		medium: 'w342',
		large: 'w500',
		original: 'original'
	},
	backdrop: {
		small: 'w300',
		medium: 'w780',
		large: 'w1280',
		original: 'original'
	},
	profile: {
		small: 'w45',
		medium: 'w185',
		large: 'h632',
		original: 'original'
	}
} as const;

export const SORT_OPTIONS = {
	'popularity.desc': 'Most Popular',
	'popularity.asc': 'Least Popular',
	'vote_average.desc': 'Highest Rated',
	'vote_average.asc': 'Lowest Rated',
	'primary_release_date.desc': 'Newest First',
	'primary_release_date.asc': 'Oldest First',
	'revenue.desc': 'Highest Revenue',
	'revenue.asc': 'Lowest Revenue',
	'original_title.asc': 'Title A-Z'
} as const;

export const MEDIA_TYPES = ['movie', 'tv', 'person'] as const;
