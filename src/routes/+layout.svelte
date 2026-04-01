<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { page } from '$app/state';
	import '../app.css';
	import Navbar from '$lib/components/Navbar.svelte';
	import Seo from '$lib/components/Seo.svelte';
	import { ThemeState } from '$lib/stores/theme.svelte';
	import { setContext } from 'svelte';

	const theme = new ThemeState();
	setContext('theme', theme);

	onNavigate((navigation) => {
		if (!document.startViewTransition) return;

		return new Promise((resolve) => {
			document.startViewTransition(async () => {
				resolve();
				await navigation.complete;
			});
		});
	});
	let { children } = $props();
</script>

<Seo />

<Navbar />
<main>
	{#key page.url.pathname}
		{@render children()}
	{/key}
</main>
