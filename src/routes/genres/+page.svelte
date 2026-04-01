<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';
	import { localizeHref } from '$lib/paraglide/runtime.js';
	import { getMovieGenres, getTvGenres } from '$lib/remote/configuration.remote';

	let movieGenres = $derived(getMovieGenres());
	let tvGenres = $derived(getTvGenres());
</script>

<svelte:head>
	<title>{m.page_genres_title()}</title>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 pt-20 pb-12 sm:px-6 lg:px-8">
	<h1 class="mb-8 text-3xl font-bold text-foreground">{m.page_genres_title()}</h1>

	<section class="mb-12">
		<h2 class="mb-4 text-xl font-semibold text-foreground">{m.nav_movies()}</h2>
		{#await movieGenres}
			<div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
				{#each Array(18) as _}
					<div class="h-12 animate-pulse rounded-lg bg-muted"></div>
				{/each}
			</div>
		{:then data}
			<div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
				{#each data.genres as genre (genre.id)}
					<a
						href={localizeHref(`/movie?genre=${genre.id}`)}
						class="flex items-center justify-center rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
					>
						{genre.name}
					</a>
				{/each}
			</div>
		{:catch error}
			<p class="text-destructive">{error.message}</p>
		{/await}
	</section>

	<section>
		<h2 class="mb-4 text-xl font-semibold text-foreground">{m.nav_tv()}</h2>
		{#await tvGenres}
			<div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
				{#each Array(18) as _}
					<div class="h-12 animate-pulse rounded-lg bg-muted"></div>
				{/each}
			</div>
		{:then data}
			<div class="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
				{#each data.genres as genre (genre.id)}
					<a
						href={localizeHref(`/tv?genre=${genre.id}`)}
						class="flex items-center justify-center rounded-lg border border-border bg-card px-4 py-3 text-sm font-medium text-foreground transition-colors hover:bg-accent hover:text-accent-foreground"
					>
						{genre.name}
					</a>
				{/each}
			</div>
		{:catch error}
			<p class="text-destructive">{error.message}</p>
		{/await}
	</section>
</div>
