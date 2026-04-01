import { TMDB_IMAGE_BASE, IMAGE_SIZES } from '$lib/constants';

export function posterUrl(
	path: string | null,
	size: keyof typeof IMAGE_SIZES.poster = 'medium'
): string {
	if (!path) return '/placeholder-poster.svg';
	return `${TMDB_IMAGE_BASE}/${IMAGE_SIZES.poster[size]}${path}`;
}

export function backdropUrl(
	path: string | null,
	size: keyof typeof IMAGE_SIZES.backdrop = 'large'
): string {
	if (!path) return '/placeholder-backdrop.svg';
	return `${TMDB_IMAGE_BASE}/${IMAGE_SIZES.backdrop[size]}${path}`;
}

export function profileUrl(
	path: string | null,
	size: keyof typeof IMAGE_SIZES.profile = 'medium'
): string {
	if (!path) return '/placeholder-profile.svg';
	return `${TMDB_IMAGE_BASE}/${IMAGE_SIZES.profile[size]}${path}`;
}
