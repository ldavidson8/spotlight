import { getRequestEvent } from '$app/server';

const DEFAULT_COUNTRY = 'US';

export function getRequestCountry(): string {
	const { cookies, locals } = getRequestEvent();
	
	// Check cookie first
	const countryCookie = cookies.get('tmdb-origin-country');
	if (countryCookie) {
		return countryCookie.toUpperCase();
	}
	
	// Then check locals (can be set in hooks)
	if (locals.country) {
		return (locals.country as string).toUpperCase();
	}
	
	return DEFAULT_COUNTRY;
}

export function getRequestLanguage(): string {
	const { locals } = getRequestEvent();
	
	if (locals.language) {
		return locals.language as string;
	}
	
	return 'en-US';
}
