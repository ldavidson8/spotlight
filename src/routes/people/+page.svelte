<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';
	import { localizeHref } from '$lib/paraglide/runtime.js';
	import { getTrendingPeople, getPopularPeople } from '$lib/remote/people.remote';

	let popularPeople = $derived(getPopularPeople());
	let trendingPeople = $derived(getTrendingPeople({ timeWindow: 'week' }));
</script>

<svelte:head>
	<title>{m.page_people_title()}</title>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 pt-20 pb-12 sm:px-6 lg:px-8">
	<h1 class="mb-8 text-3xl font-bold text-foreground">{m.page_people_title()}</h1>

	<section class="mb-12">
		<h2 class="mb-4 text-xl font-semibold text-foreground">{m.sort_popularity_desc()}</h2>
		{#await trendingPeople}
			<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
				{#each Array(12) as _}
					<div class="aspect-[2/3] animate-pulse rounded-lg bg-muted"></div>
				{/each}
			</div>
		{:then data}
			<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
				{#each data.results.slice(0, 12) as person (person.id)}
					<a
						href={localizeHref(`/people/${person.id}`)}
						class="group overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-lg"
					>
						<div class="aspect-[2/3] bg-muted">
							{#if person.profile_path}
								<img
									src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
									alt={person.name}
									class="h-full w-full object-cover transition-transform group-hover:scale-105"
									loading="lazy"
								/>
							{:else}
								<div class="flex h-full items-center justify-center text-muted-foreground">
									No Photo
								</div>
							{/if}
						</div>
						<div class="p-2">
							<h3 class="truncate text-sm font-medium text-foreground">{person.name}</h3>
							<p class="truncate text-xs text-muted-foreground">{person.known_for_department}</p>
						</div>
					</a>
				{/each}
			</div>
		{:catch error}
			<p class="text-destructive">{error.message}</p>
		{/await}
	</section>

	<section>
		<h2 class="mb-4 text-xl font-semibold text-foreground">{m.page_people_popular()}</h2>
		{#await popularPeople}
			<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
				{#each Array(12) as _}
					<div class="aspect-[2/3] animate-pulse rounded-lg bg-muted"></div>
				{/each}
			</div>
		{:then data}
			<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
				{#each data.results.slice(0, 12) as person (person.id)}
					<a
						href={localizeHref(`/people/${person.id}`)}
						class="group overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-lg"
					>
						<div class="aspect-[2/3] bg-muted">
							{#if person.profile_path}
								<img
									src={`https://image.tmdb.org/t/p/w185${person.profile_path}`}
									alt={person.name}
									class="h-full w-full object-cover transition-transform group-hover:scale-105"
									loading="lazy"
								/>
							{:else}
								<div class="flex h-full items-center justify-center text-muted-foreground">
									No Photo
								</div>
							{/if}
						</div>
						<div class="p-2">
							<h3 class="truncate text-sm font-medium text-foreground">{person.name}</h3>
							<p class="truncate text-xs text-muted-foreground">{person.known_for_department}</p>
						</div>
					</a>
				{/each}
			</div>
		{:catch error}
			<p class="text-destructive">{error.message}</p>
		{/await}
	</section>
</div>
