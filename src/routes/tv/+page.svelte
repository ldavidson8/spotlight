<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';
	import { localizeHref } from '$lib/paraglide/runtime.js';
	import {
		getTrendingTv,
		getAiringTodayTv,
		getOnTheAirTv,
		getTopRatedTv
	} from '$lib/remote/tv.remote';

	let trendingTv = $derived(getTrendingTv({ timeWindow: 'week' }));
	let airingToday = $derived(getAiringTodayTv());
	let onTheAir = $derived(getOnTheAirTv());
	let topRated = $derived(getTopRatedTv());
</script>

<svelte:head>
	<title>{m.page_tv_title()}</title>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 pt-20 pb-12 sm:px-6 lg:px-8">
	<h1 class="mb-8 text-3xl font-bold text-foreground">{m.page_tv_title()}</h1>

	<section class="mb-12">
		<h2 class="mb-4 text-xl font-semibold text-foreground">{m.sort_popularity_desc()}</h2>
		{#await trendingTv}
			<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
				{#each Array(10) as _}
					<div class="aspect-[2/3] animate-pulse rounded-lg bg-muted"></div>
				{/each}
			</div>
		{:then data}
			<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
				{#each data.results.slice(0, 10) as show (show.id)}
					<a
						href={localizeHref(`/tv/${show.id}`)}
						class="group overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-lg"
					>
						<div class="aspect-[2/3] bg-muted">
							{#if show.poster_path}
								<img
									src={`https://image.tmdb.org/t/p/w342${show.poster_path}`}
									alt={show.name}
									class="h-full w-full object-cover transition-transform group-hover:scale-105"
									loading="lazy"
								/>
							{:else}
								<div class="flex h-full items-center justify-center text-muted-foreground">
									No Image
								</div>
							{/if}
						</div>
						<div class="p-3">
							<h3 class="truncate text-sm font-medium text-foreground">{show.name}</h3>
							<p class="text-xs text-muted-foreground">
								{show.first_air_date?.split('-')[0] ?? 'TBA'}
							</p>
						</div>
					</a>
				{/each}
			</div>
		{/await}
	</section>

	<section class="mb-12">
		<h2 class="mb-4 text-xl font-semibold text-foreground">{m.page_tv_airing_today()}</h2>
		{#await airingToday}
			<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
				{#each Array(10) as _}
					<div class="aspect-[2/3] animate-pulse rounded-lg bg-muted"></div>
				{/each}
			</div>
		{:then data}
			<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
				{#each data.results.slice(0, 10) as show (show.id)}
					<a
						href={localizeHref(`/tv/${show.id}`)}
						class="group overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-lg"
					>
						<div class="aspect-[2/3] bg-muted">
							{#if show.poster_path}
								<img
									src={`https://image.tmdb.org/t/p/w342${show.poster_path}`}
									alt={show.name}
									class="h-full w-full object-cover transition-transform group-hover:scale-105"
									loading="lazy"
								/>
							{:else}
								<div class="flex h-full items-center justify-center text-muted-foreground">
									No Image
								</div>
							{/if}
						</div>
						<div class="p-3">
							<h3 class="truncate text-sm font-medium text-foreground">{show.name}</h3>
							<p class="text-xs text-muted-foreground">
								{show.first_air_date?.split('-')[0] ?? 'TBA'}
							</p>
						</div>
					</a>
				{/each}
			</div>
		{/await}
	</section>

	<section class="mb-12">
		<h2 class="mb-4 text-xl font-semibold text-foreground">{m.page_tv_on_the_air()}</h2>
		{#await onTheAir}
			<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
				{#each Array(10) as _}
					<div class="aspect-[2/3] animate-pulse rounded-lg bg-muted"></div>
				{/each}
			</div>
		{:then data}
			<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
				{#each data.results.slice(0, 10) as show (show.id)}
					<a
						href={localizeHref(`/tv/${show.id}`)}
						class="group overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-lg"
					>
						<div class="aspect-[2/3] bg-muted">
							{#if show.poster_path}
								<img
									src={`https://image.tmdb.org/t/p/w342${show.poster_path}`}
									alt={show.name}
									class="h-full w-full object-cover transition-transform group-hover:scale-105"
									loading="lazy"
								/>
							{:else}
								<div class="flex h-full items-center justify-center text-muted-foreground">
									No Image
								</div>
							{/if}
						</div>
						<div class="p-3">
							<h3 class="truncate text-sm font-medium text-foreground">{show.name}</h3>
							<p class="text-xs text-muted-foreground">
								{show.first_air_date?.split('-')[0] ?? 'TBA'}
							</p>
						</div>
					</a>
				{/each}
			</div>
		{/await}
	</section>

	<section>
		<h2 class="mb-4 text-xl font-semibold text-foreground">{m.page_tv_top_rated()}</h2>
		{#await topRated}
			<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
				{#each Array(10) as _}
					<div class="aspect-[2/3] animate-pulse rounded-lg bg-muted"></div>
				{/each}
			</div>
		{:then data}
			<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
				{#each data.results.slice(0, 10) as show (show.id)}
					<a
						href={localizeHref(`/tv/${show.id}`)}
						class="group overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-lg"
					>
						<div class="aspect-[2/3] bg-muted">
							{#if show.poster_path}
								<img
									src={`https://image.tmdb.org/t/p/w342${show.poster_path}`}
									alt={show.name}
									class="h-full w-full object-cover transition-transform group-hover:scale-105"
									loading="lazy"
								/>
							{:else}
								<div class="flex h-full items-center justify-center text-muted-foreground">
									No Image
								</div>
							{/if}
						</div>
						<div class="p-3">
							<h3 class="truncate text-sm font-medium text-foreground">{show.name}</h3>
							<p class="text-xs text-muted-foreground">
								{show.first_air_date?.split('-')[0] ?? 'TBA'}
							</p>
						</div>
					</a>
				{/each}
			</div>
		{/await}
	</section>
</div>
