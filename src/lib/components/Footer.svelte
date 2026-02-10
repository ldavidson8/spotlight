<script lang="ts">
	import IconCaretUp from '~icons/ph/caret-up-bold';
	import SimpleIconsGithub from '~icons/simple-icons/github';
	import ThemeToggle from './ThemeToggle.svelte';
	const year = new Date().getFullYear();
</script>

<footer class="relative w-full border-t">
	<div class="mx-auto max-w-6xl px-4 py-14">
		<div class="grid grid-cols-2 items-start gap-x-10 gap-y-6">
			<div>
				<h2 class="text-xl leading-tight font-semibold tracking-tight text-pretty">Spotlight</h2>
			</div>
			<div class="flex flex-col items-end">
				<nav aria-label="Footer primary" class="text-sm text-muted-foreground">
					<ul class="flex flex-wrap items-center justify-end gap-x-3">
						<li>
							<a href="/" class="transition-colors hover:text-primary">Home</a>
						</li>
						<li class="opacity-60">/</li>
						<li>
							<a href="/movies" class="transition-colors hover:text-primary">Discover</a>
						</li>
						<li class="opacity-60">/</li>
						<li>
							<a href="/tv" class="transition-colors hover:text-primary">Influence</a>
						</li>
						<li class="opacity-60">/</li>
						<li>
							<a href="/search" class="transition-colors hover:text-primary">Release</a>
						</li>
					</ul>
				</nav>
			</div>

			<div class="flex items-center">
				<div class="shrink-0">
					<ThemeToggle />
				</div>
			</div>

			<div class="flex items-center justify-end">
				<a
					href="https://github.com/ldavidson8/movie-spotlight"
					aria-label="GitHub"
					class="text-muted-foreground transition-colors duration-100 hover:text-primary"
				>
					<SimpleIconsGithub />
				</a>
			</div>
		</div>

		<div
			class="mt-12 flex items-start justify-between gap-4 border-t pt-6 text-xs text-muted-foreground sm:flex-row"
		>
			<p>
				Data provided by <a
					href="https://www.themoviedb.org/"
					class="underline hover:text-primary"
					target="_blank"
					rel="noopener noreferrer">TMDb</a
				>.
			</p>
			<div>&copy; {year}</div>
		</div>
	</div>
</footer>
