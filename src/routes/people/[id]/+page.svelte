<script lang="ts">
	import { page } from '$app/state';
	import { m } from '$lib/paraglide/messages.js';
	import { localizeHref } from '$lib/paraglide/runtime.js';
	import { getPersonById, getPersonCombinedCredits } from '$lib/remote/people.remote';

	let personId = $derived(Number(page.params.id));
	let person = $derived(getPersonById(personId));
	let credits = $derived(getPersonCombinedCredits(personId));
</script>

<svelte:head>
	{#await person then data}
		<title>{data.name} - {m.media_person()}</title>
	{/await}
</svelte:head>

<div class="pt-16">
	{#await person}
		<div class="h-96 animate-pulse bg-muted"></div>
	{:then data}
		<div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
			<div class="flex flex-col gap-8 pt-8 md:flex-row">
				<div class="shrink-0">
					{#if data.profile_path}
						<img
							src={`https://image.tmdb.org/t/p/w342${data.profile_path}`}
							alt={data.name}
							class="w-48 rounded-lg shadow-xl md:w-64"
						/>
					{:else}
						<div
							class="flex h-72 w-48 items-center justify-center rounded-lg bg-muted md:h-96 md:w-64"
						>
							<span class="text-muted-foreground">No Photo</span>
						</div>
					{/if}
				</div>

				<div class="flex-1">
					<h1 class="mb-4 text-3xl font-bold text-foreground md:text-4xl">{data.name}</h1>

					<div class="mb-6 flex flex-wrap gap-4 text-sm text-muted-foreground">
						{#if data.birthday}
							<span>{m.detail_born()}: {data.birthday}</span>
						{/if}
						{#if data.deathday}
							<span>{m.detail_died()}: {data.deathday}</span>
						{/if}
						{#if data.place_of_birth}
							<span>{m.detail_place_of_birth()}: {data.place_of_birth}</span>
						{/if}
						<span>{m.detail_popularity()}: {data.popularity.toFixed(0)}</span>
					</div>

					{#if data.known_for_department}
						<div class="mb-4">
							<span class="rounded-full bg-primary/10 px-3 py-1 text-sm font-medium text-primary">
								{data.known_for_department}
							</span>
						</div>
					{/if}

					{#if data.biography}
						<div>
							<h2 class="mb-2 text-lg font-semibold text-foreground">{m.detail_biography()}</h2>
							<p class="leading-relaxed whitespace-pre-line text-muted-foreground">
								{data.biography}
							</p>
						</div>
					{/if}
				</div>
			</div>

			{#await credits then creditData}
				{@const allCast = creditData.cast}
				{@const allCrew = creditData.crew}
				{@const combined = [...allCast, ...allCrew]}
				{@const uniqueCredits = combined.reduce(
					(acc, c) => {
						if (!acc.find((x) => x.id === c.id)) {
							acc.push(c);
						}
						return acc;
					},
					[] as typeof combined
				)}
				{@const sortedCredits = uniqueCredits
					.toSorted((a, b) => b.vote_average - a.vote_average)
					.slice(0, 12)}

				{#if sortedCredits.length > 0}
					<section class="mt-12 pb-12">
						<h2 class="mb-4 text-xl font-semibold text-foreground">{m.detail_known_for()}</h2>
						<div class="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
							{#each sortedCredits as credit (credit.id)}
								<a
									href={localizeHref(
										credit.media_type === 'movie' ? `/movie/${credit.id}` : `/tv/${credit.id}`
									)}
									class="group overflow-hidden rounded-lg border border-border bg-card transition-shadow hover:shadow-lg"
								>
									<div class="aspect-[2/3] bg-muted">
										{#if credit.poster_path}
											<img
												src={`https://image.tmdb.org/t/p/w185${credit.poster_path}`}
												alt={credit.title ?? credit.name ?? ''}
												class="h-full w-full object-cover transition-transform group-hover:scale-105"
												loading="lazy"
											/>
										{:else}
											<div class="flex h-full items-center justify-center text-muted-foreground">
												No Image
											</div>
										{/if}
									</div>
									<div class="p-2">
										<p class="truncate text-sm font-medium text-foreground">
											{credit.title ?? credit.name}
										</p>
										<p class="truncate text-xs text-muted-foreground">
											{'character' in credit ? credit.character : 'job' in credit ? credit.job : ''}
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
