export const TMDB_ENDPOINTS = {
	// Configuration
	CONFIG: '/configuration',
	COUNTRIES: '/configuration/countries',
	LANGUAGES: '/configuration/languages',
	JOBS: '/configuration/jobs',
	PRIMARY_TRANSLATIONS: '/configuration/primary-translations',
	TIMEZONES: '/configuration/timezones',

	// Genres
	MOVIE_GENRES: '/genre/movie/list',
	TV_GENRES: '/genre/tv/list',

	// Movies
	MOVIE_DETAILS: (id: number) => `/movie/${id}`,
	MOVIE_CREDITS: (id: number) => `/movie/${id}/credits`,
	MOVIE_IMAGES: (id: number) => `/movie/${id}/images`,
	MOVIE_VIDEOS: (id: number) => `/movie/${id}/videos`,
	MOVIE_RECOMMENDATIONS: (id: number) => `/movie/${id}/recommendations`,
	MOVIE_SIMILAR: (id: number) => `/movie/${id}/similar`,
	MOVIE_REVIEWS: (id: number) => `/movie/${id}/reviews`,
	MOVIE_KEYWORDS: (id: number) => `/movie/${id}/keywords`,
	MOVIE_WATCH_PROVIDERS: (id: number) => `/movie/${id}/watch/providers`,
	DISCOVER_MOVIE: '/discover/movie',
	TRENDING_MOVIE: (window: string) => `/trending/movie/${window}`,
	NOW_PLAYING: '/movie/now-playing',
	POPULAR_MOVIES: '/movie/popular',
	TOP_RATED_MOVIES: '/movie/top_rated',
	UPCOMING: '/movie/upcoming',
	SEARCH_MOVIE: '/search/movie',

	// TV Series
	TV_DETAILS: (id: number) => `/tv/${id}`,
	TV_CREDITS: (id: number) => `/tv/${id}/credits`,
	TV_AGGREGATE_CREDITS: (id: number) => `/tv/${id}/aggregate_credits`,
	TV_IMAGES: (id: number) => `/tv/${id}/images`,
	TV_VIDEOS: (id: number) => `/tv/${id}/videos`,
	TV_RECOMMENDATIONS: (id: number) => `/tv/${id}/recommendations`,
	TV_SIMILAR: (id: number) => `/tv/${id}/similar`,
	TV_KEYWORDS: (id: number) => `/tv/${id}/keywords`,
	TV_WATCH_PROVIDERS: (id: number) => `/tv/${id}/watch/providers`,
	DISCOVER_TV: '/discover/tv',
	TRENDING_TV: (window: string) => `/trending/tv/${window}`,
	AIRING_TODAY: '/tv/airing_today',
	ON_THE_AIR: '/tv/on_the_air',
	POPULAR_TV: '/tv/popular',
	TOP_RATED_TV: '/tv/top_rated',
	SEARCH_TV: '/search/tv',

	// TV Seasons & Episodes
	TV_SEASON_DETAILS: (id: number, season: number) => `/tv/${id}/season/${season}`,
	TV_SEASON_CREDITS: (id: number, season: number) => `/tv/${id}/season/${season}/credits`,
	TV_EPISODE_DETAILS: (id: number, season: number, episode: number) =>
		`/tv/${id}/season/${season}/episode/${episode}`,

	// People
	PERSON_DETAILS: (id: number) => `/person/${id}`,
	PERSON_COMBINED_CREDITS: (id: number) => `/person/${id}/combined_credits`,
	PERSON_MOVIE_CREDITS: (id: number) => `/person/${id}/movie_credits`,
	PERSON_TV_CREDITS: (id: number) => `/person/${id}/tv_credits`,
	PERSON_IMAGES: (id: number) => `/person/${id}/images`,
	PERSON_EXTERNAL_IDS: (id: number) => `/person/${id}/external_ids`,
	POPULAR_PEOPLE: '/person/popular',
	TRENDING_PERSON: (window: string) => `/trending/person/${window}`,
	SEARCH_PERSON: '/search/person',

	// Search
	SEARCH_MULTI: '/search/multi',
	SEARCH_COLLECTION: '/search/collection',
	SEARCH_COMPANY: '/search/company',
	SEARCH_KEYWORD: '/search/keyword',

	// Networks
	NETWORK_DETAILS: (id: number) => `/network/${id}`,

	// Collections
	COLLECTION_DETAILS: (id: number) => `/collection/${id}`
} as const;
