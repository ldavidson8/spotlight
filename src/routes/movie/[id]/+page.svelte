<script lang="ts">
	import { page } from '$app/state';
	import { m } from '$lib/paraglide/messages.js';
	import { localizeHref } from '$lib/paraglide/runtime.js';
	import {
		getMovieById,
		getMovieCredits,
		getMovieRecommendations
	} from '$lib/remote/movies.remote';

	let movieId = $derived(Number(page.params.id));
	let movie = $derived(getMovieById(movieId));
	let credits = $derived(getMovieCredits(movieId));
	let recommendations = $derived(getMovieRecommendations({ id: movieId }));
</script>

<svelte:head>
	{#await movie then data}
		<title>{data.title} - {m.media_movie()}</title>
	{/await}
</svelte:head>

<div class="pt-16">
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
								<span class="rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
									{genre.name}
								</span>
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

			{#await credits then creditData}
				{#if creditData.cast.length > 0}
					<section class="mt-12">
						<h2 class="mb-4 text-xl font-semibold text-foreground">{m.detail_cast()}</h2>
						<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
							{#each creditData.cast.slice(0, 12) as person (person.id)}
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
										<p class="truncate text-sm font-medium text-foreground">{person.name}</p>
										<p class="truncate text-xs text-muted-foreground">{person.character}</p>
									</div>
								</a>
							{/each}
						</div>
					</section>
				{/if}
			{/await}

			{#await recommendations then recData}
				{#if recData.results.length > 0}
					<section class="mt-12 pb-12">
						<h2 class="mb-4 text-xl font-semibold text-foreground">{m.detail_recommendations()}</h2>
						<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
							{#each recData.results.slice(0, 10) as rec (rec.id)}
								<a
									href={localizeHref(`/movie/${rec.id}`)}
									class="group overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-lg"
								>
									<div class="aspect-[2/3] bg-muted">
										{#if rec.poster_path}
											<img
												src={`https://image.tmdb.org/t/p/w342${rec.poster_path}`}
												alt={rec.title}
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
										<h3 class="truncate text-sm font-medium text-foreground">{rec.title}</h3>
										<p class="text-xs text-muted-foreground">
											{rec.release_date?.split('-')[0] ?? 'TBA'}
										</p>
									</div>
								</a>
							{/each}
						</div>
					</section>
				{/if}
			{/await}
		</div>
	{:catch error}
		<div class="mx-auto max-w-7xl px-4 pt-24 pb-12">
			<p class="text-destructive">{error.message}</p>
		</div>
	{/await}
</div>
