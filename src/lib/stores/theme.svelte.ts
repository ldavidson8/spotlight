export type Theme = 'light' | 'dark' | 'auto';
export type ResolvedTheme = 'light' | 'dark';

const STORAGE_KEY = 'theme';

export class ThemeState {
	current: Theme = $state('auto');
	#systemPrefersDark: boolean = $state(false);

	/** Always resolves to 'light' or 'dark' — never 'auto' */
	resolved: ResolvedTheme = $derived(
		this.current === 'auto' ? (this.#systemPrefersDark ? 'dark' : 'light') : this.current
	);

	constructor() {
		// Guard: skip everything on the server
		if (typeof window === 'undefined') return;

		// 1. Hydrate from localStorage
		const stored = localStorage.getItem(STORAGE_KEY);
		if (stored === 'light' || stored === 'dark' || stored === 'auto') {
			this.current = stored;
		}

		// 2. Track system preference reactively
		const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
		this.#systemPrefersDark = mediaQuery.matches;

		mediaQuery.addEventListener('change', (e) => {
			this.#systemPrefersDark = e.matches;
		});

		// 3. Sync data-theme attribute whenever `resolved` changes
		//    (system preference change while on 'auto', or explicit toggle)
		$effect(() => {
			document.documentElement.setAttribute('data-theme', this.resolved);
		});
	}

	/**
	 * Set the theme and persist to localStorage.
	 */
	set(theme: Theme): void {
		this.current = theme;
		localStorage.setItem(STORAGE_KEY, theme);
	}

	/**
	 * Cycle through: light → dark → auto → light …
	 */
	cycle(): void {
		const order: Theme[] = ['light', 'dark', 'auto'];
		const next = order[(order.indexOf(this.current) + 1) % order.length];
		this.set(next);
	}
}
