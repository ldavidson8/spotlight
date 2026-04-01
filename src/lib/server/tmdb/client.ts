import { TMDB_BEARER_TOKEN } from '$env/static/private';
import { error } from '@sveltejs/kit';
import * as v from 'valibot';
import { TMDB_BASE_URL } from '$lib/constants';
import { getLocale } from '$lib/paraglide/runtime';

interface TmdbFetchOptions {
	params?: Record<string, string | number | boolean | undefined>;
	ttl?: number;
	signal?: AbortSignal;
	country?: string;
}

const TMDB_LANGUAGE_BY_LOCALE: Record<string, string> = {
	en: 'en-US',
	es: 'es-ES',
	fr: 'fr-FR'
};

function getTmdbLanguage(): string {
	const locale = getLocale();
	return TMDB_LANGUAGE_BY_LOCALE[locale] ?? locale;
}

function getTmdbCountry(country?: string): string {
	return country ?? 'US';
}

export async function tmdbFetch<T>(
	endpoint: string,
	schema: v.BaseSchema<unknown, T, v.BaseIssue<unknown>>,
	options: TmdbFetchOptions = {}
): Promise<T> {
	const { params, signal, country } = options;
	const language = getTmdbLanguage();
	const region = getTmdbCountry(country);
	const requestParams: Record<string, string | number | boolean | undefined> = {
		...params,
		language,
		region,
		watch_region: region
	};

	const queryParams = new URLSearchParams();
	for (const [key, value] of Object.entries(requestParams)) {
		if (value !== undefined) {
			queryParams.set(key, String(value));
		}
	}

	const queryString = queryParams.toString();
	const url = `${TMDB_BASE_URL}${endpoint}${queryString ? `?${queryString}` : ''}`;


	const fetcher = async (): Promise<T> => {
		const response = await fetch(url, {
			method: 'GET',
			headers: {
				'User-Agent': 'spotlight',
				Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
				'Content-Type': 'application/json'
			},
			signal
		});

		if (!response.ok) {
			const body = await response.text().catch(() => 'Unknown error');
			throw error(response.status, `TMDB API error: ${response.status} - ${body}`);
		}

		const json = await response.json();
		const result = v.safeParse(schema, json);

		if (!result.success) {
			console.error('TMDB schema validation failed:', v.flatten(result.issues));
			throw error(500, 'Invalid response from TMDB API');
		}

		return result.output;
	};

	return fetcher();
}
