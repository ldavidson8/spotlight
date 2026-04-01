<script lang="ts">
	import { page } from '$app/state';
	import { m } from '$lib/paraglide/messages.js';
	import { localizeHref } from '$lib/paraglide/runtime.js';
	import { getMovieById, getMovieCredits } from '$lib/remote/movies.remote';
	import { getTvById, getTvCredits } from '$lib/remote/tv.remote';

	let mediaType = $derived(page.url.searchParams.get('type') ?? 'movie');
	let showId = $derived(Number(page.params.id));

	let movie = $derived(mediaType === 'movie' ? getMovieById(showId) : null);
	let tvShow = $derived(mediaType === 'tv' ? getTvById(showId) : null);
</script>

<svelte:head>
	{#if movie}
		{#await movie then data}
			<title>{data.title} - {m.page_anime_title()}</title>
		{/await}
	{:else if tvShow}
		{#await tvShow then data}
			<title>{data.name} - {m.page_anime_title()}</title>
		{/await}
	{/if}
</svelte:head>

<div class="pt-16">
	{#if mediaType === 'movie' && movie}
		{#await movie}
			<div class="h-96 animate-pulse bg-muted"></div>
		{:then data}
			<div class="relative h-[50vh] w-full overflow-hidden">
				{#if data.backdrop_path}
					<img
						src={`https://image.tmdb.org/t/p/w1280${data.backdrop_path}`}
						alt={data.title}
						class="h-full w-full object-cover"
					/>
					<div
						class="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"
					></div>
				{:else}
					<div class="h-full w-full bg-muted"></div>
				{/if}
			</div>

			<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div class="relative -mt-32 flex flex-col gap-8 md:flex-row">
					<div class="shrink-0">
						{#if data.poster_path}
							<img
								src={`https://image.tmdb.org/t/p/w342${data.poster_path}`}
								alt={data.title}
								class="w-48 rounded-lg shadow-xl md:w-64"
							/>
						{:else}
							<div
								class="flex h-72 w-48 items-center justify-center rounded-lg bg-muted md:h-96 md:w-64"
							>
								<span class="text-muted-foreground">No Image</span>
							</div>
						{/if}
					</div>

					<div class="flex-1 pt-8 md:pt-16">
						<h1 class="mb-2 text-3xl font-bold text-foreground md:text-4xl">{data.title}</h1>
						{#if data.tagline}
							<p class="mb-4 text-lg text-muted-foreground italic">{data.tagline}</p>
						{/if}

						<div class="mb-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
							{#if data.release_date}
								<span>{m.detail_release_date()}: {data.release_date}</span>
							{/if}
							{#if data.runtime}
								<span>{m.detail_runtime()}: {data.runtime} min</span>
							{/if}
							<span>{m.detail_rating()}: {data.vote_average.toFixed(1)}/10</span>
						</div>

						{#if data.genres.length > 0}
							<div class="mb-6 flex flex-wrap gap-2">
								{#each data.genres as genre (genre.id)}
									<span
										class="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
										>{genre.name}</span
									>
								{/each}
							</div>
						{/if}

						{#if data.overview}
							<div>
								<h2 class="mb-2 text-lg font-semibold text-foreground">{m.detail_overview()}</h2>
								<p class="leading-relaxed text-muted-foreground">{data.overview}</p>
							</div>
						{/if}
					</div>
				</div>
			</div>
		{:catch error}
			<div class="mx-auto max-w-7xl px-4 pt-24 pb-12">
				<p class="text-destructive">{error.message}</p>
			</div>
		{/await}
	{:else if mediaType === 'tv' && tvShow}
		{#await tvShow}
			<div class="h-96 animate-pulse bg-muted"></div>
		{:then data}
			<div class="relative h-[50vh] w-full overflow-hidden">
				{#if data.backdrop_path}
					<img
						src={`https://image.tmdb.org/t/p/w1280${data.backdrop_path}`}
						alt={data.name}
						class="h-full w-full object-cover"
					/>
					<div
						class="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent"
					></div>
				{:else}
					<div class="h-full w-full bg-muted"></div>
				{/if}
			</div>

			<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
				<div class="relative -mt-32 flex flex-col gap-8 md:flex-row">
					<div class="shrink-0">
						{#if data.poster_path}
							<img
								src={`https://image.tmdb.org/t/p/w342${data.poster_path}`}
								alt={data.name}
								class="w-48 rounded-lg shadow-xl md:w-64"
							/>
						{:else}
							<div
								class="flex h-72 w-48 items-center justify-center rounded-lg bg-muted md:h-96 md:w-64"
							>
								<span class="text-muted-foreground">No Image</span>
							</div>
						{/if}
					</div>

					<div class="flex-1 pt-8 md:pt-16">
						<h1 class="mb-2 text-3xl font-bold text-foreground md:text-4xl">{data.name}</h1>
						{#if data.tagline}
							<p class="mb-4 text-lg text-muted-foreground italic">{data.tagline}</p>
						{/if}

						<div class="mb-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
							{#if data.first_air_date}
								<span>{m.detail_first_air_date()}: {data.first_air_date}</span>
							{/if}
							<span>{m.detail_seasons()}: {data.number_of_seasons}</span>
							<span>{m.detail_episodes()}: {data.number_of_episodes}</span>
							<span>{m.detail_rating()}: {data.vote_average.toFixed(1)}/10</span>
						</div>

						{#if data.genres.length > 0}
							<div class="mb-6 flex flex-wrap gap-2">
								{#each data.genres as genre (genre.id)}
									<span
										class="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary"
										>{genre.name}</span
									>
								{/each}
							</div>
						{/if}

						{#if data.overview}
							<div>
								<h2 class="mb-2 text-lg font-semibold text-foreground">{m.detail_overview()}</h2>
								<p class="leading-relaxed text-muted-foreground">{data.overview}</p>
							</div>
						{/if}
					</div>
				</div>
			</div>
		{:catch error}
			<div class="mx-auto max-w-7xl px-4 pt-24 pb-12">
				<p class="text-destructive">{error.message}</p>
			</div>
		{/await}
	{:else}
		<div class="mx-auto max-w-7xl px-4 pt-24 pb-12">
			<p class="text-muted-foreground">{m.error_not_found()}</p>
		</div>
	{/if}
</div>
