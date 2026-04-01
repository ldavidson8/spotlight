<script lang="ts">
	import IconChevronDown from '~icons/tabler/chevron-down';
	import IconSearch from '~icons/tabler/search';
	import IconSettings from '~icons/tabler/settings';
	import IconMenu from '~icons/tabler/menu-2';
	import IconX from '~icons/tabler/x';

	import Dropdown from './nav-dropdown.svelte';
	import MobileMenu from './MobileMenu.svelte';
	import CountrySelector from './CountrySelector.svelte';

	import { m } from '$lib/paraglide/messages.js';
	import { localizeHref } from '$lib/paraglide/runtime.js';
	import { page } from '$app/state';
	import { countryStore } from '$lib/stores/country.svelte';
	import { getCountries } from '$lib/remote/configuration.remote';

	let isMobileMenuOpen = $state(false);
	let isSettingsOpen = $state(false);
	let activeDropdown = $state<string | undefined>(undefined);

	// Fetch countries from the remote function
	const countriesQuery = getCountries();

	interface NavChild {
		name: string;
		href: string;
	}

	interface NavLink {
		name: string;
		href: string;
		hasDropdown: boolean;
		children?: NavChild[];
	}

	function getNavLinks(): NavLink[] {
		return [
			{ name: m.nav_home(), href: '/', hasDropdown: false },
			{ name: m.nav_movies(), href: '/movie', hasDropdown: false },
			{ name: m.nav_tv(), href: '/tv', hasDropdown: false },
			{ name: m.nav_anime(), href: '/anime', hasDropdown: false },
			{
				name: m.nav_discover(),
				href: '/discover',
				hasDropdown: true,
				children: [
					{ name: m.nav_discover(), href: '/discover' },
					{ name: m.nav_genres(), href: '/genres' },
					{ name: m.nav_people(), href: '/people' }
				]
			},
			{
				name: m.nav_my_lists(),
				href: '/watchlist',
				hasDropdown: true,
				children: [
					{ name: m.nav_watchlist(), href: '/watchlist' },
					{ name: m.nav_favorites(), href: '/favorites' }
				]
			}
		];
	}

	let navLinks = $derived.by(() => {
		page.url.pathname;
		return getNavLinks();
	});

	function handleDropdownOpen(name: string) {
		activeDropdown = name;
	}

	function handleDropdownClose(name: string) {
		if (activeDropdown === name) {
			activeDropdown = undefined;
		}
	}

	function closeAll() {
		isMobileMenuOpen = false;
		activeDropdown = undefined;
		isSettingsOpen = false;
	}

	function handleOpenSettings() {
		isMobileMenuOpen = false;
		isSettingsOpen = true;
	}

	$effect(() => {
		if (typeof document !== 'undefined') {
			if (isMobileMenuOpen && !isSettingsOpen) {
				document.body.style.overflow = 'hidden';
			} else {
				document.body.style.overflow = '';
			}
		}
	});

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape') {
			if (activeDropdown) {
				activeDropdown = undefined;
			} else if (isMobileMenuOpen) {
				isMobileMenuOpen = false;
			}
		}
	}

	let selectedCountry = $state(countryStore.current);

	$effect(() => {
		selectedCountry = countryStore.current;
	});

	$effect(() => {
		if (selectedCountry !== countryStore.current) {
			countryStore.current = selectedCountry;
		}
	});

	function handleCountrySelect(code: string) {
		selectedCountry = code;
	}
</script>

<svelte:window onkeydown={handleKeydown} />

<header
	class="fixed inset-x-0 top-0 z-50 border-b border-border bg-background transition-colors duration-200"
>
	<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
		<div class="flex h-16 items-center justify-between">
			<!-- Logo -->
			<div class="shrink-0">
				<a
					href={localizeHref('/')}
					class="text-2xl font-bold tracking-tighter text-foreground"
					onclick={closeAll}
				>
					spotlight
				</a>
			</div>

			<!-- Desktop Navigation (Center) -->
			<nav class="hidden items-center space-x-1 md:flex lg:space-x-2" aria-label="Main navigation">
				{#each navLinks as link (link.name)}
					{#if link.hasDropdown}
						<Dropdown
							name={link.name}
							isOpen={activeDropdown === link.name}
							onOpen={handleDropdownOpen}
							onClose={handleDropdownClose}
						>
							{#snippet trigger({ isOpen })}
								<span
									class="flex cursor-pointer items-center rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent/50 hover:text-foreground"
								>
									{link.name}
									<IconChevronDown
										class="ml-1 h-3.5 w-3.5 opacity-60 transition-transform duration-200 {isOpen
											? 'rotate-180'
											: ''}"
									/>
								</span>
							{/snippet}

							{#each link.children ?? [] as child (child.href)}
								<a
									href={localizeHref(child.href)}
									role="menuitem"
									class="flex items-center rounded-md px-3 py-2.5 text-sm text-popover-foreground/80 transition-colors hover:bg-muted hover:text-popover-foreground"
									onclick={() => (activeDropdown = undefined)}
								>
									{child.name}
								</a>
							{/each}
						</Dropdown>
					{:else}
						<a
							href={localizeHref(link.href)}
							class="flex items-center rounded-md px-3 py-2 text-sm font-medium text-foreground/80 transition-colors hover:bg-accent/50 hover:text-foreground"
							onmouseenter={() => (activeDropdown = undefined)}
						>
							{link.name}
						</a>
					{/if}
				{/each}
			</nav>

			<div class="hidden items-center space-x-2 md:flex">
				<a
					href={localizeHref('/search')}
					class="inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground/70 transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
					aria-label={m.nav_search()}
				>
					<IconSearch class="h-5 w-5" />
				</a>
				{#await countriesQuery then countries}
					<CountrySelector
						{countries}
						{selectedCountry}
						onSelect={handleCountrySelect}
						triggerClass="h-9 w-[150px]"
						contentAlign="end"
						contentWidth="w-[300px]"
					/>
				{/await}
			</div>

			<div class="flex items-center space-x-2 md:hidden">
				{#if !isMobileMenuOpen}
					<a
						href={localizeHref('/search')}
						class="inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground/70 transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
						aria-label={m.nav_search()}
					>
						<IconSearch class="h-5 w-5" />
					</a>
				{/if}

				<button
					onclick={() => {
						isMobileMenuOpen = !isMobileMenuOpen;
						activeDropdown = undefined;
					}}
					class="inline-flex h-9 w-9 items-center justify-center rounded-md text-foreground/70 transition-colors hover:bg-accent hover:text-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none"
					aria-expanded={isMobileMenuOpen}
					aria-label="Toggle navigation menu"
				>
					{#if isMobileMenuOpen}
						<IconX class="h-5 w-5" />
					{:else}
						<IconMenu class="h-5 w-5" />
					{/if}
				</button>
			</div>
		</div>
	</div>

	<!-- Mobile Menu -->
	{#if isMobileMenuOpen}
		<MobileMenu
			{navLinks}
			bind:activeDropdown
			onClose={closeAll}
			onOpenSettings={handleOpenSettings}
		/>
	{/if}
</header>
