const STORAGE_KEY = 'tmdb-origin-country';

function detectBrowserCountry(fallback = 'US'): string {
	if (typeof navigator === 'undefined') return fallback;

	const locales = navigator.languages?.length ? navigator.languages : [navigator.language];

	for (const locale of locales) {
		try {
			const region = new Intl.Locale(locale).region;
			if (region) return region.toUpperCase();
		} catch {
			/* continue */
		}

		const match = /-([A-Z]{2})$/i.exec(locale);
		if (match?.[1]) return match[1].toUpperCase();
	}

	return fallback;
}

function getInitialCountry(fallback = 'US'): string {
	if (typeof localStorage === 'undefined') return fallback;

	const stored = localStorage.getItem(STORAGE_KEY);
	if (stored) return stored.toUpperCase();

	const detected = detectBrowserCountry(fallback);
	localStorage.setItem(STORAGE_KEY, detected);
	return detected;
}

class CountryStore {
	#country = $state(getInitialCountry());

	get current() {
		return this.#country;
	}

	set current(value: string) {
		this.#country = value.toUpperCase();
		if (typeof localStorage !== 'undefined') {
			localStorage.setItem(STORAGE_KEY, this.#country);
		}
	}

	reset() {
		this.current = detectBrowserCountry();
	}
}

export const countryStore = new CountryStore();
