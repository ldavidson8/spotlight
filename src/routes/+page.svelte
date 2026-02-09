<script lang="ts">
	import { getPopularMovies, getNowPlayingMovies, getTopRatedMovies } from '$lib/api/data.remote';
	import StarIcon from '~icons/lucide/star';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';

	const popular = getPopularMovies();
	const nowPlaying = getNowPlayingMovies();
	const topRated = getTopRatedMovies();

	function posterUrl(path: string | null | undefined) {
		return path ? `https://image.tmdb.org/t/p/w500${path}` : '/placeholder.jpg';
	}

	function backdropUrl(path: string | null | undefined) {
		return path ? `https://image.tmdb.org/t/p/original${path}` : '/placeholder.jpg';
	}
</script>

{#snippet SkeletonCard()}
	<Card.Root class="w-64 flex-shrink-0 animate-pulse overflow-hidden">
		<div class="h-96 w-full bg-muted"></div>
		<Card.Header>
			<Card.Title class="h-5 w-3/4 rounded bg-muted" />
		</Card.Header>
		<Card.Content>
			<div class="mb-2 h-4 w-full rounded bg-muted"></div>
			<div class="mb-2 h-4 w-5/6 rounded bg-muted"></div>
			<div class="flex items-center justify-between">
				<div class="h-5 w-20 rounded bg-muted"></div>
				<div class="h-5 w-10 rounded bg-muted"></div>
			</div>
		</Card.Content>
	</Card.Root>
{/snippet}

{#snippet CarouselSkeleton()}
	<div class="flex snap-x snap-mandatory gap-4 overflow-x-auto hide-scrollbars">
		{#each Array(6) as _}
			{@render SkeletonCard()}
		{/each}
	</div>
{/snippet}

<div class="min-h-screen bg-background">
	<!-- Hero Section -->
	<section class="relative mb-12 h-[60vh] overflow-hidden">
		<svelte:boundary>
			{#await nowPlaying then movies}
				{@const topMovie = movies.results[0]}
				<div class="relative h-full">
					<div
						class="absolute inset-0 bg-cover bg-center"
						style="background-image: url({backdropUrl(topMovie.backdrop_path)});"
					></div>
					<div
						class="absolute inset-0 bg-gradient-to-r from-black/80 via-black/50 to-transparent"
					></div>
					<div class="relative z-10 flex h-full items-center px-6 lg:px-12">
						<div class="max-w-2xl text-white">
							<h1 class="mb-4 text-4xl leading-tight font-bold md:text-5xl lg:text-5xl">
								{topMovie.title}
							</h1>
							<p class="mb-6 text-lg leading-relaxed text-balance text-gray-200 md:text-base">
								{topMovie.overview}
							</p>
							<div class="flex flex-wrap items-center gap-4">
								<Badge variant="secondary" class="text-sm">
									{topMovie.release_date}
								</Badge>
								<Badge class="text-sm">
									<StarIcon />
									<span>{topMovie.vote_average.toFixed(1)}</span>
								</Badge>
							</div>
						</div>
						<div class="ml-auto hidden lg:block">
							<img
								src={posterUrl(topMovie.poster_path)}
								alt={topMovie.title}
								class="h-96 w-64 rounded-lg shadow-2xl"
							/>
						</div>
					</div>
				</div>
			{/await}
			{#snippet pending()}
				<div class="flex h-full items-center justify-center bg-muted">
					<div class="text-center text-muted-foreground">
						<div class="mb-4 h-12 w-96 animate-pulse rounded bg-muted-foreground/20"></div>
						<div class="mb-2 h-4 w-80 animate-pulse rounded bg-muted-foreground/20"></div>
						<div class="mb-2 h-4 w-72 animate-pulse rounded bg-muted-foreground/20"></div>
						<div class="mb-2 h-4 w-64 animate-pulse rounded bg-muted-foreground/20"></div>
					</div>
				</div>
			{/snippet}
		</svelte:boundary>
	</section>

	<section class="mb-12">
		<h2 class="mb-6 text-3xl font-bold">Popular Movies</h2>
		<svelte:boundary>
			{#await popular then movies}
				<div class="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 hide-scrollbars">
					{#each movies.results as movie}
						<Card.Root
							class="w-64 flex-shrink-0 snap-center overflow-hidden transition-shadow duration-200 hover:shadow-lg"
						>
							<img
								src={posterUrl(movie.poster_path)}
								alt={movie.title}
								class="h-96 w-full object-cover"
							/>
							<Card.Header>
								<Card.Title class="truncate">{movie.title}</Card.Title>
							</Card.Header>
							<Card.Content>
								<p class="line-clamp-3 text-sm text-muted-foreground">{movie.overview}</p>
								<div class="mt-2 flex items-center justify-between">
									<Badge variant="secondary">{movie.release_date}</Badge>
									<Badge>{movie.vote_average.toFixed(1)}</Badge>
								</div>
							</Card.Content>
						</Card.Root>
					{/each}
				</div>
			{/await}
			{#snippet pending()}
				{@render CarouselSkeleton()}
			{/snippet}
		</svelte:boundary>
	</section>
	<section class="mb-12">
		<h2 class="mb-6 text-3xl font-bold">Now Playing</h2>
		<svelte:boundary>
			{#await nowPlaying then movies}
				<div class="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 hide-scrollbars">
					{#each movies.results as movie}
						<Card.Root
							class="w-64 flex-shrink-0 snap-center overflow-hidden transition-shadow duration-200 hover:shadow-lg"
						>
							<img
								src={posterUrl(movie.poster_path)}
								alt={movie.title}
								class="h-96 w-full object-cover"
							/>
							<Card.Header>
								<Card.Title class="truncate">{movie.title}</Card.Title>
							</Card.Header>
							<Card.Content>
								<p class="line-clamp-3 text-sm text-muted-foreground">{movie.overview}</p>
								<div class="mt-2 flex items-center justify-between">
									<Badge variant="secondary">{movie.release_date}</Badge>
									<Badge>{movie.vote_average.toFixed(1)}</Badge>
								</div>
							</Card.Content>
						</Card.Root>
					{/each}
				</div>
			{/await}
			{#snippet pending()}
				{@render CarouselSkeleton()}
			{/snippet}
		</svelte:boundary>
	</section>
	<section class="mb-12">
		<h2 class="mb-6 text-3xl font-bold">Top Rated</h2>
		<svelte:boundary>
			{#await topRated then movies}
				<div class="flex snap-x snap-mandatory gap-4 overflow-x-auto pb-4 hide-scrollbars">
					{#each movies.results as movie}
						<a href={`/movie/${movie.id}`}>
							<Card.Root
								class="w-64 flex-shrink-0 snap-center overflow-hidden transition-shadow duration-200 hover:shadow-lg"
							>
								<img
									src={posterUrl(movie.poster_path)}
									alt={movie.title}
									class="h-96 w-full object-cover"
								/>
								<Card.Header>
									<Card.Title class="truncate">{movie.title}</Card.Title>
								</Card.Header>
								<Card.Content>
									<p class="line-clamp-3 text-sm text-muted-foreground">{movie.overview}</p>
									<div class="mt-2 flex items-center justify-between">
										<Badge variant="secondary">{movie.release_date}</Badge>
										<Badge>{movie.vote_average.toFixed(1)}</Badge>
									</div>
								</Card.Content>
							</Card.Root>
						</a>
					{/each}
				</div>
			{/await}
			{#snippet pending()}
				{@render CarouselSkeleton()}
			{/snippet}
		</svelte:boundary>
	</section>
</div>
