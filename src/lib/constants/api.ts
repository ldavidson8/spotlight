export const TMDB_IMAGE_BASE = 'https://image.tmdb.org/t/p';

export const IMAGE_SIZES = {
	poster: { sm: 'w185', md: 'w342', lg: 'w500', original: 'original' },
	backdrop: { sm: 'w300', md: 'w780', lg: 'w1280', original: 'original' },
	profile: { sm: 'w45', md: 'w185', lg: 'h632', original: 'original' }
} as const;
