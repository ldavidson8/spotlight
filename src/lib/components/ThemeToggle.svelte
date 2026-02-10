<script lang="ts">
	import { RadioGroup } from 'bits-ui';
	import IconSun from '~icons/ph/sun-bold';
	import IconMoon from '~icons/ph/moon-bold';
	import { themeStore } from '$lib/stores/theme.svelte';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';
	import { onMount } from 'svelte';

	type Theme = 'light' | 'dark';

	function getTheme(): Theme {
		return themeStore.theme;
	}
	function setThemeValue(newValue: Theme) {
		if (newValue === 'light' || newValue === 'dark') {
			themeStore.setTheme(newValue);
		}
	}

	onMount(() => {
		const handleKeydown = (event: KeyboardEvent) => {
			if (event.key === 'T' || event.key === 't') {
				const currentTheme = themeStore.theme;
				const newTheme: Theme = currentTheme === 'light' ? 'dark' : 'light';
				themeStore.setTheme(newTheme);
			}
		};

		document.addEventListener('keydown', handleKeydown);

		return () => {
			document.removeEventListener('keydown', handleKeydown);
		};
	});
</script>

<Tooltip.Provider>
	<Tooltip.Root delayDuration={0}>
		<Tooltip.Trigger>
			{#snippet child({ props })}
				<div {...props}>
					<RadioGroup.Root
						bind:value={getTheme, setThemeValue}
						orientation="horizontal"
						aria-label="Toggle theme"
						class="flex rounded-lg border p-0.5"
					>
						<RadioGroup.Item
							value="dark"
							class="flex h-[22px] w-6 items-center justify-center rounded-sm text-muted-foreground transition-colors duration-200 data-[state=checked]:bg-muted data-[state=checked]:text-foreground"
						>
							<IconMoon class="size-3 *:fill-current" />
						</RadioGroup.Item>

						<RadioGroup.Item
							value="light"
							class="flex h-[22px] w-6 items-center justify-center rounded-sm text-muted-foreground transition-colors duration-200 data-[state=checked]:bg-neutral-200 data-[state=checked]:text-foreground"
						>
							<IconSun class="size-3 *:fill-current" />
						</RadioGroup.Item>
					</RadioGroup.Root>
				</div>
			{/snippet}
		</Tooltip.Trigger>
		<Tooltip.Content sideOffset={8}>
			<span>
				Toggle theme&nbsp;
				<kbd
					class="pointer-events-none m-0 inline-flex min-w-auto items-stretch justify-center p-0 text-[10px] select-none"
				>
					<span
						class="inline-flex min-h-4 min-w-4 items-center justify-center rounded-sm border bg-muted text-center leading-normal font-medium text-muted-foreground"
					>
						T
					</span>
				</kbd>
			</span>
		</Tooltip.Content>
	</Tooltip.Root>
</Tooltip.Provider>
