export const SORT_OPTIONS = [
	{ value: 'popularity.desc', label: 'Most Popular' },
	{ value: 'popularity.asc', label: 'Least Popular' },
	{ value: 'vote_average.desc', label: 'Highest Rated' },
	{ value: 'vote_average.asc', label: 'Lowest Rated' },
	{ value: 'primary_release_date.desc', label: 'Newest' },
	{ value: 'primary_release_date.asc', label: 'Oldest' },
	{ value: 'revenue.desc', label: 'Highest Revenue' }
] as const;

export const DEFAULT_DISCOVER_FILTERS = {
	sort_by: 'popularity.desc',
	genres: '',
	from: '',
	to: '',
	rating_min: 0,
	rating_max: 10,
	language: '',
	page: 1
} as const;
