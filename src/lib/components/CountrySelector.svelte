<script lang="ts">
	import IconChevronDown from '~icons/tabler/chevron-down';
	import IconChevronRight from '~icons/tabler/chevron-right';
	import IconCheck from '~icons/tabler/check';

	import FlagUS from '~icons/circle-flags/us';
	import FlagGB from '~icons/circle-flags/gb';
	import FlagCA from '~icons/circle-flags/ca';
	import FlagAU from '~icons/circle-flags/au';
	import FlagDE from '~icons/circle-flags/de';
	import FlagFR from '~icons/circle-flags/fr';
	import FlagES from '~icons/circle-flags/es';
	import FlagIT from '~icons/circle-flags/it';
	import FlagJP from '~icons/circle-flags/jp';
	import FlagKR from '~icons/circle-flags/kr';
	import FlagBR from '~icons/circle-flags/br';
	import FlagMX from '~icons/circle-flags/mx';
	import FlagAR from '~icons/circle-flags/ar';
	import FlagCO from '~icons/circle-flags/co';
	import FlagIN from '~icons/circle-flags/in';
	import FlagCN from '~icons/circle-flags/cn';
	import FlagRU from '~icons/circle-flags/ru';
	import FlagSE from '~icons/circle-flags/se';
	import FlagNO from '~icons/circle-flags/no';
	import FlagDK from '~icons/circle-flags/dk';
	import FlagFI from '~icons/circle-flags/fi';
	import FlagNL from '~icons/circle-flags/nl';
	import FlagBE from '~icons/circle-flags/be';
	import FlagPL from '~icons/circle-flags/pl';
	import FlagTR from '~icons/circle-flags/tr';
	import FlagTH from '~icons/circle-flags/th';
	import FlagPH from '~icons/circle-flags/ph';
	import FlagID from '~icons/circle-flags/id';
	import FlagZA from '~icons/circle-flags/za';

	import * as Popover from '$lib/components/ui/popover/index.js';
	import * as Command from '$lib/components/ui/command/index.js';
	import { ScrollArea } from '$lib/components/ui/scroll-area/index.js';
	import type { Component } from 'svelte';

	const flagIcons: Record<string, Component> = {
		US: FlagUS,
		GB: FlagGB,
		CA: FlagCA,
		AU: FlagAU,
		DE: FlagDE,
		FR: FlagFR,
		ES: FlagES,
		IT: FlagIT,
		JP: FlagJP,
		KR: FlagKR,
		BR: FlagBR,
		MX: FlagMX,
		AR: FlagAR,
		CO: FlagCO,
		IN: FlagIN,
		CN: FlagCN,
		RU: FlagRU,
		SE: FlagSE,
		NO: FlagNO,
		DK: FlagDK,
		FI: FlagFI,
		NL: FlagNL,
		BE: FlagBE,
		PL: FlagPL,
		TR: FlagTR,
		TH: FlagTH,
		PH: FlagPH,
		ID: FlagID,
		ZA: FlagZA
	};

	interface Country {
		iso_3166_1: string;
		english_name: string;
	}

	interface Props {
		countries: Country[];
		selectedCountry: string;
		onSelect: (code: string) => void;
		triggerClass?: string;
		contentAlign?: 'start' | 'center' | 'end';
		contentWidth?: string;
		ariaLabelledby?: string;
		placeholder?: string;
	}

	let {
		countries,
		selectedCountry,
		onSelect,
		triggerClass = 'h-9 w-[150px]',
		contentAlign = 'end',
		contentWidth = 'w-[300px]',
		ariaLabelledby,
		placeholder = 'Search country...'
	}: Props = $props();

	let isOpen = $state(false);

	function handleSelect(code: string) {
		onSelect(code);
		isOpen = false;
	}

	let selectedCountryName = $derived(
		countries.find((c) => c.iso_3166_1 === selectedCountry)?.english_name ?? selectedCountry
	);

	let SelectedFlag = $derived(flagIcons[selectedCountry]);
</script>

<Popover.Root bind:open={isOpen}>
	<Popover.Trigger
		class="flex items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm text-foreground hover:bg-accent hover:text-accent-foreground focus-visible:ring-1 focus-visible:ring-ring focus-visible:outline-none {triggerClass}"
		aria-labelledby={ariaLabelledby}
	>
		<span class="flex items-center gap-2 truncate">
			{#if SelectedFlag}
				<SelectedFlag class="h-4 w-4 shrink-0 rounded-full" />
			{/if}
			<span class="truncate">{selectedCountryName}</span>
		</span>
		<IconChevronDown class="h-4 w-4 shrink-0 opacity-50" />
	</Popover.Trigger>
	<Popover.Content class="{contentWidth} p-0" align={contentAlign}>
		<Command.Root>
			<Command.Input {placeholder} />
			<Command.Empty>No country found.</Command.Empty>
			<Command.List class="max-h-none overflow-visible">
				<ScrollArea class="h-80">
					<Command.Group class="p-1">
						{#each countries as country (country.iso_3166_1)}
							{@const Flag = flagIcons[country.iso_3166_1]}

							<Command.Item
								value={country.english_name}
								onSelect={() => handleSelect(country.iso_3166_1)}
								class="flex cursor-pointer items-center justify-between gap-2 py-2.5"
							>
								<div class="flex items-center gap-3">
									{#if Flag}
										<Flag class="h-6 w-6 shrink-0 rounded-full shadow-sm" />
									{/if}
									<span class="text-sm font-medium">{country.english_name}</span>
								</div>
								{#if selectedCountry === country.iso_3166_1}
									<IconCheck class="h-5 w-5 text-primary" />
								{:else}
									<IconChevronRight class="h-5 w-5 text-muted-foreground opacity-30" />
								{/if}
							</Command.Item>
						{/each}
					</Command.Group>
				</ScrollArea>
			</Command.List>
		</Command.Root>
	</Popover.Content>
</Popover.Root>
