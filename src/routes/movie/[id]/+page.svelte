<script lang="ts">
	import { getMovieById } from '$lib/api/data.remote';
	import { fade, fly } from 'svelte/transition';
	import IconStar from '~icons/ph/star-bold';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';

	let { params } = $props<{ params: { id: string } }>();

	const movie = $derived(await getMovieById(params.id));
	const imgBase = 'https://image.tmdb.org/t/p/w500';
</script>

<svelte:head>
	<title>{movie.title}</title>
</svelte:head>

{#if movie}
	<div
		in:fly={{ y: 20, duration: 600 }}
		class="mx-auto flex max-w-6xl flex-col gap-6 p-4 lg:flex-row lg:p-8"
	>
		<!-- Poster -->
		<div class="flex-shrink-0">
			<img
				src={imgBase + movie.poster_path}
				alt={movie.title}
				class="w-full rounded-2xl shadow-lg lg:w-80"
			/>
		</div>

		<!-- Content -->
		<Card.Root class="flex-1 rounded-2xl border bg-background/70 shadow-md backdrop-blur-md">
			<Card.Header>
				<Card.Title class="text-3xl font-bold">{movie.title}</Card.Title>
				{#if movie.tagline}<p class="text-muted-foreground">{movie.tagline}</p>{/if}
			</Card.Header>

			<Card.Content class="space-y-4">
				<!-- Rating -->
				<div class="flex items-center gap-2">
					<IconStar class="h-5 w-5 text-yellow-500" />
					<span class="font-medium">{movie.vote_average.toFixed(1)} / 10</span>
					<span class="text-sm text-muted-foreground">({movie.vote_count} votes)</span>
				</div>

				<!-- Genres -->
				{#if movie.genres && movie.genres.length > 0}
					<div class="flex flex-wrap gap-2">
						{#each movie.genres as genre}
							<Badge variant="secondary" class="rounded-full">{genre.name}</Badge>
						{/each}
					</div>
				{/if}

				<!-- Overview -->
				<p in:fade={{ delay: 200 }} class="leading-relaxed">
					{movie.overview}
				</p>

				<!-- Details Grid -->
				<div class="mt-4 grid grid-cols-2 gap-4 text-sm lg:grid-cols-3">
					<div><span class="font-semibold">Release:</span> {movie.release_date ?? '—'}</div>
					<div>
						<span class="font-semibold">Runtime:</span>
						{movie.runtime ? `${movie.runtime} min` : '—'}
					</div>
					<div>
						<span class="font-semibold">Language:</span>
						{movie.original_language ? movie.original_language.toUpperCase() : '—'}
					</div>
					{#if movie.budget}
						<div><span class="font-semibold">Budget:</span> ${movie.budget.toLocaleString()}</div>
					{/if}
					{#if movie.revenue}
						<div><span class="font-semibold">Revenue:</span> ${movie.revenue.toLocaleString()}</div>
					{/if}
				</div>

				<!-- CTA -->
				<Button class="mt-6 w-full lg:w-auto">Watch Trailer</Button>
			</Card.Content>
		</Card.Root>
	</div>
{:else}
	<div class="flex h-screen items-center justify-center">
		<span class="text-lg text-muted-foreground">Loading movie details...</span>
	</div>
{/if}
