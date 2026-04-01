<script lang="ts">
	import { m } from '$lib/paraglide/messages.js';
</script>

<svelte:head>
	<title>{m.page_watchlist_title()}</title>
</svelte:head>

<div class="mx-auto max-w-7xl px-4 pt-20 pb-12 sm:px-6 lg:px-8">
	<h1 class="mb-8 text-3xl font-bold text-foreground">{m.page_watchlist_title()}</h1>

	<div class="flex flex-col items-center justify-center py-16">
		<p class="text-lg text-muted-foreground">
			Your watchlist will appear here. Sign in to sync your watchlist across devices.
		</p>
	</div>
</div>
