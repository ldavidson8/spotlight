<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';
	import { localizeHref } from '$lib/paraglide/runtime.js';
	import { discoverAnimeMovies, discoverAnimeTv } from '$lib/remote/anime.remote';

	let animeMovies = $derived(discoverAnimeMovies({ sort_by: 'popularity.desc' }));
	let animeSeries = $derived(discoverAnimeTv({ sort_by: 'popularity.desc' }));
	let topRatedAnime = $derived(discoverAnimeMovies({ sort_by: 'vote_average.desc' }));
</script>

<svelte:head>
	<title>{m.page_anime_title()}</title>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 pt-20 pb-12 sm:px-6 lg:px-8">
	<h1 class="mb-8 text-3xl font-bold text-foreground">{m.page_anime_title()}</h1>

	<section class="mb-12">
		<h2 class="mb-4 text-xl font-semibold text-foreground">{m.page_anime_movies()}</h2>
		{#await animeMovies}
			<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
				{#each Array(10) as _}
					<div class="aspect-[2/3] animate-pulse rounded-lg bg-muted"></div>
				{/each}
			</div>
		{:then data}
			<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
				{#each data.results.slice(0, 10) as movie (movie.id)}
					<a
						href={localizeHref(`/movie/${movie.id}`)}
						class="group overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-lg"
					>
						<div class="aspect-[2/3] bg-muted">
							{#if movie.poster_path}
								<img
									src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
									alt={movie.title}
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
							<h3 class="truncate text-sm font-medium text-foreground">{movie.title}</h3>
							<p class="text-xs text-muted-foreground">
								{movie.release_date?.split('-')[0] ?? 'TBA'}
							</p>
						</div>
					</a>
				{/each}
			</div>
		{:catch error}
			<p class="text-destructive">{error.message}</p>
		{/await}
	</section>

	<section class="mb-12">
		<h2 class="mb-4 text-xl font-semibold text-foreground">{m.page_anime_series()}</h2>
		{#await animeSeries}
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
		{:catch error}
			<p class="text-destructive">{error.message}</p>
		{/await}
	</section>

	<section>
		<h2 class="mb-4 text-xl font-semibold text-foreground">{m.sort_rating_desc()}</h2>
		{#await topRatedAnime}
			<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
				{#each Array(10) as _}
					<div class="aspect-[2/3] animate-pulse rounded-lg bg-muted"></div>
				{/each}
			</div>
		{:then data}
			<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
				{#each data.results.slice(0, 10) as movie (movie.id)}
					<a
						href={localizeHref(`/movie/${movie.id}`)}
						class="group overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-lg"
					>
						<div class="aspect-[2/3] bg-muted">
							{#if movie.poster_path}
								<img
									src={`https://image.tmdb.org/t/p/w342${movie.poster_path}`}
									alt={movie.title}
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
							<h3 class="truncate text-sm font-medium text-foreground">{movie.title}</h3>
							<div class="flex items-center justify-between">
								<p class="text-xs text-muted-foreground">
									{movie.release_date?.split('-')[0] ?? 'TBA'}
								</p>
								<p class="text-xs font-medium text-primary">{movie.vote_average.toFixed(1)}</p>
							</div>
						</div>
					</a>
				{/each}
			</div>
		{:catch error}
			<p class="text-destructive">{error.message}</p>
		{/await}
	</section>
</div>
