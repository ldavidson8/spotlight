<script lang="ts">
	import Header from '$lib/components/Header.svelte';
	import '../app.css';
	import Footer from '$lib/components/Footer.svelte';
	import { pwaInfo } from 'virtual:pwa-info';
	import { onMount } from 'svelte';
	import { onNavigate } from '$app/navigation';

	onMount(async () => {
		if (pwaInfo) {
			const { registerSW } = await import('virtual:pwa-register');
			registerSW({
				immediate: true,
				onRegistered(r) {
					console.log('SW registered.');
				},
				onRegisterError(error) {
					console.error('SW registration failed:', error);
				}
			});
		}
	});

	const webManifestLink = $derived(pwaInfo ? pwaInfo.webManifest.linkTag : '');

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

<svelte:head>
	<title>Movie Spotlight</title>
	<meta name="description" content="A spotlight on your favorite movies" />
	<link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
	<link rel="icon" type="image/svg+xml" href="/favicon.svg" />
	<link rel="shortcut icon" href="/favicon.ico" />
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
	<meta name="apple-mobile-web-app-title" content="Spotlight" />
	<link rel="manifest" href="/site.webmanifest" />
	{@html webManifestLink}
</svelte:head>

<div class="flex w-full flex-col">
	<Header />
	<main class="flex min-h-[calc(100*1dvh)] flex-1 flex-col">
		{@render children?.()}
	</main>
	<Footer />
</div>
