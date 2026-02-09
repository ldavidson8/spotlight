<script lang="ts">
	import { goto } from '$app/navigation';
	import SearchIcon from '~icons/lucide/search';

	import * as Command from '$lib/components/ui/command/index.js';

	let open = $state(false);

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key === '/' && !event.ctrlKey && !event.metaKey && !event.altKey) {
			event.preventDefault();
			open = !open;
		}
	}
</script>

<svelte:document onkeydown={handleKeyDown} />

<Command.Dialog shouldFilter={false} bind:open>
	<Command.Input placeholder="Search movies, TV shows, genres…" />
	<Command.List>
		<Command.Empty>No results found.</Command.Empty>
		<Command.Group heading="Pages">
			<Command.Item
				onSelect={() => {
					goto('/movie');
					open = false;
				}}
			>
				Movies
			</Command.Item>
			<Command.Item
				onSelect={() => {
					goto('/tv');
					open = false;
				}}
			>
				TV Shows
			</Command.Item>
			<Command.Item
				onSelect={() => {
					goto('/genres');
					open = false;
				}}
			>
				Genres
			</Command.Item>
			<Command.Item
				onSelect={() => {
					goto('/picker');
					open = false;
				}}
				>Picker
			</Command.Item>
		</Command.Group>
	</Command.List>
</Command.Dialog>

<!-- Trigger button (desktop) -->
<button
	class="hidden w-64 items-center gap-2 rounded-md border border-input bg-background px-3 py-2 text-sm text-muted-foreground hover:bg-accent hover:text-accent-foreground lg:flex"
	onclick={() => (open = true)}
>
	<SearchIcon />
	Search movies, shows…
	<kbd
		class="pointer-events-none m-0 inline-flex min-w-auto items-stretch justify-center p-0 text-[10px] select-none"
	>
		<span
			class="inline-flex min-h-4 min-w-4 items-center justify-center rounded-sm border bg-muted text-center leading-normal font-medium text-muted-foreground"
		>
			/
		</span>
	</kbd>
</button>
