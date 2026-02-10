<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';

	import MenuIcon from '~icons/ph/list';
	import XIcon from '~icons/ph/x';
	import SearchIcon from '~icons/ph/magnifying-glass';
	import { fly } from 'svelte/transition';
	import { browser } from '$app/environment';
	import CommandSearch from './CommandSearch.svelte';

	let showMobileMenu = $state(false);
	let showMenuButton = $state(true);
	let lastScrollY = $state(0);
	let isTransitioning = $state(false);

	function toggleMobileMenu() {
		if (isTransitioning) return;
		isTransitioning = true;
		showMobileMenu = !showMobileMenu;

		setTimeout(() => {
			isTransitioning = false;
		}, 300);
	}

	$effect(() => {
		if (!browser || !document?.body) return;

		if (showMobileMenu) {
			document.body.style.overflow = 'hidden';
		} else {
			document.body.style.overflow = 'auto';
		}

		// Cleanup function
		return () => {
			if (browser && document?.body) {
				document.body.style.overflow = 'auto';
			}
		};
	});

	function handleScroll() {
		if (!browser || !window) return;

		const current = window.scrollY;

		if (current > lastScrollY) {
			showMenuButton = false;
		} else {
			showMenuButton = true;
		}

		lastScrollY = current;
	}

	$effect(() => {
		if (!browser || !window) return;

		lastScrollY = window.scrollY;
		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	});
</script>

<header class="fixed bottom-0 z-[9999] w-full lg:sticky lg:top-0">
	<div class="group hidden transition-all lg:block">
		<div class="relative z-10 hidden border-b bg-card transition-all lg:block">
			<div class="mx-auto flex w-full max-w-7xl items-center justify-between px-16">
				<div class="flex items-center gap-3">
					<nav>
						<ul class="hidden list-none items-center lg:flex">
							<li>
								<a href="/" class="px-3 py-1 text-sm font-medium">Home</a>
							</li>
							<li><a href="/movie" class="px-3 py-1 text-sm font-medium">Movies</a></li>
							<li><a href="/tv" class="px-3 py-1 text-sm font-medium">TV Shows</a></li>
							<li><a href="/genres" class="px-3 py-1 text-sm font-medium">Genres</a></li>
							<li><a href="/picker" class="px-3 py-1 text-sm font-medium">Picker</a></li>
						</ul>
					</nav>
				</div>
				<div class="flex items-center gap-3 py-3.5">
					<CommandSearch />
				</div>
			</div>
		</div>
	</div>
	{#if showMenuButton}
		<div
			in:fly={{ y: 100, duration: 250 }}
			out:fly={{ y: 100, duration: 250 }}
			class="relative z-10 flex w-full justify-center gap-2 pb-4 lg:hidden"
		>
			<Button onclick={toggleMobileMenu} variant="default" size="lg">
				{#if showMobileMenu}
					<XIcon class="size-5" /> Close
				{:else}
					<MenuIcon class="size-5" /> Menu
				{/if}
			</Button>
		</div>
	{/if}
	{#if showMobileMenu}
		<div
			in:fly={{ y: 100, duration: 200 }}
			out:fly={{ y: 100, duration: 200 }}
			class="hide-scrollbars fixed inset-0 flex flex-col justify-center-safe overflow-x-hidden overflow-y-scroll bg-background px-6 pt-8 pb-24"
		>
			<div>
				<div>
					<p class="py-3.5 text-sm font-medium uppercase">Menu</p>
					<ul>
						<li>
							<a class="flex w-full py-2 text-xl" href="/" onclick={() => (showMobileMenu = false)}
								>Movies</a
							>
						</li>
						<li>
							<a
								class="flex w-full py-2 text-xl"
								href="/tv"
								onclick={() => (showMobileMenu = false)}>TV Shows</a
							>
						</li>
						<li>
							<a
								class="flex w-full py-2 text-xl"
								href="/genres"
								onclick={() => (showMobileMenu = false)}>Genres</a
							>
						</li>
					</ul>
				</div>
			</div>
		</div>
	{/if}
</header>
<div class="mx-auto flex w-full max-w-7xl items-center px-6 py-6 lg:hidden">
	<a href="/">Spotlight</a>
	<ul class="flex grow justify-end gap-3">
		<Button variant="ghost" size="icon" onclick={() => console.log('clicked')}>
			<SearchIcon />
		</Button>
	</ul>
</div>
