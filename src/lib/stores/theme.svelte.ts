import { browser } from '$app/environment';

type Theme = 'light' | 'dark';

class ThemeStore {
	private _theme = $state<Theme>('light');

	constructor() {
		if (browser) {
			this.initializeTheme();
		}
	}

	get theme() {
		return this._theme;
	}

	private initializeTheme() {
		// Read the theme as set by the early inline script (no-flash) or fallbacks
		const attr = document.documentElement.getAttribute('data-theme');
		const existing = attr === 'dark' || attr === 'light' ? (attr as Theme) : null;
		const savedTheme = localStorage.getItem('theme') as Theme | null;
		const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');

		if (existing) {
			this._theme = existing;
		} else if (savedTheme) {
			this._theme = savedTheme;
		} else if (prefersDark.matches) {
			this._theme = 'dark';
		}

		this.applyTheme();

		prefersDark.addEventListener('change', (e) => {
			if (!localStorage.getItem('theme')) {
				this._theme = e.matches ? 'dark' : 'light';
				this.applyTheme();
			}
		});
	}

	toggleTheme() {
		this._theme = this._theme === 'dark' ? 'light' : 'dark';
		this.applyTheme();
		this.saveTheme();
	}

	setTheme(theme: Theme) {
		this._theme = theme;
		this.applyTheme();
		this.saveTheme();
	}

	private saveTheme() {
		if (browser) {
			localStorage.setItem('theme', this._theme);
		}
	}

	private applyTheme() {
		if (browser) {
			const html = document.documentElement;
			if (this._theme === 'dark') {
				html.setAttribute('data-theme', 'dark');
				html.classList.add('dark');
			} else {
				html.setAttribute('data-theme', 'light');
				html.classList.remove('dark');
			}
		}
	}
}

export const themeStore = new ThemeStore();
