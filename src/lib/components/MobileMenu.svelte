<script lang="ts">
	import IconChevronRight from '~icons/tabler/chevron-right';
	import IconSearch from '~icons/tabler/search';
	import IconSettings from '~icons/tabler/settings';

	import { fade } from 'svelte/transition';
	import * as Accordion from '$lib/components/ui/accordion/index.js';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';

	import { m } from '$lib/paraglide/messages.js';
	import { localizeHref } from '$lib/paraglide/runtime.js';

	interface NavChild {
		name: string;
		href: string;
	}

	interface NavLink {
		name: string;
		href: string;
		hasDropdown: boolean;
		children?: NavChild[];
	}

	interface Props {
		navLinks: NavLink[];
		activeDropdown: string | undefined;
		onClose: () => void;
		onOpenSettings: () => void;
	}

	let { navLinks, activeDropdown = $bindable(), onClose, onOpenSettings }: Props = $props();
</script>

<div
	transition:fade={{ duration: 200 }}
	class="absolute top-16 left-0 flex h-[calc(100vh-4rem)] w-full flex-col bg-background md:hidden"
>
	<ScrollArea class="flex-1">
		<div class="px-4 py-2">
			<nav class="flex flex-col" aria-label="Mobile navigation">
				<Accordion.Root type="single" class="w-full" bind:value={activeDropdown}>
					{#each navLinks as link (link.name)}
						{#if link.hasDropdown}
							<Accordion.Item value={link.name} class="border-b border-border/40">
								<Accordion.Trigger
									class="py-4 text-base font-medium text-foreground hover:no-underline"
								>
									{link.name}
								</Accordion.Trigger>
								<Accordion.Content class="pb-0">
									<div class="mb-2 ml-2 flex flex-col border-l-2 border-muted pl-4">
										{#each link.children ?? [] as child (child.href)}
											<a
												href={localizeHref(child.href)}
												class="flex items-center py-3 text-sm font-medium text-foreground/70 transition-colors hover:text-foreground"
												onclick={onClose}
											>
												{child.name}
											</a>
										{/each}
									</div>
								</Accordion.Content>
							</Accordion.Item>
						{:else}
							<a
								href={localizeHref(link.href)}
								class="flex items-center justify-between border-b border-border/40 py-4 text-base font-medium text-foreground transition-colors"
								onclick={onClose}
							>
								{link.name}
								<IconChevronRight class="h-4 w-4 text-muted-foreground" />
							</a>
						{/if}
					{/each}
				</Accordion.Root>

				<a
					href={localizeHref('/search')}
					class="flex items-center justify-between border-b border-border/40 py-4 text-base font-medium text-foreground transition-colors"
					onclick={onClose}
				>
					<span class="flex items-center gap-2">{m.nav_search()}</span>
					<IconSearch class="h-4 w-4 text-muted-foreground" />
				</a>
			</nav>

			<div class="pt-8 pb-8">
				<button
					class="inline-flex h-11 w-full items-center justify-center gap-2 rounded-md border border-input bg-background px-8 text-sm font-medium text-foreground shadow-sm transition-colors hover:bg-accent hover:text-accent-foreground"
					onclick={onOpenSettings}
				>
					<IconSettings class="h-4 w-4" />
					{m.nav_settings()}
				</button>
			</div>
		</div>
	</ScrollArea>
</div>
