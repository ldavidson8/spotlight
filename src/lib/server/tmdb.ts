import { TMDB_BEARER_TOKEN } from '$env/static/private';

const BASE = 'https://api.themoviedb.org/3';

export async function tmdb<T>(
	endpoint: string,
	params: Record<string, string | number | undefined> = {}
): Promise<T> {
	const url = new URL(`${BASE}${endpoint}`);

	for (const [key, value] of Object.entries(params)) {
		if (value !== undefined && value !== '') {
			url.searchParams.set(key, String(value));
		}
	}

	const res = await fetch(url.toString(), {
		headers: {
			Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
			'Content-Type': 'application/json',
			accept: 'application/json',
			'Cache-Control': 'max-age:3600'
		}
	});

	if (!res.ok) {
		throw new Error(`TMDB ${res.status}: ${res.statusText} — ${endpoint}`);
	}

	return res.json() as Promise<T>;
}
