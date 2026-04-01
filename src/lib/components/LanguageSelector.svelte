<!-- src/lib/components/LanguageSelector.svelte -->
<script lang="ts">
	import * as Select from '$lib/components/ui/select/index.js';
	import { m } from '$lib/paraglide/messages.js';
	import { getLocale, localizeHref, locales } from '$lib/paraglide/runtime.js';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	interface Props {
		id?: string;
		showLabel?: boolean;
	}

	let { id = 'language-selector', showLabel = true }: Props = $props();

	const LOCALE_NAMES: Record<string, string> = {
		en: 'English',
		es: 'Español',
		fr: 'Français'
	};

	let selectedLocale = $derived(getLocale());

	function handleLanguageChange(newLocale: string) {
		if (!newLocale) return;
		const href = localizeHref(`${page.url.pathname}${page.url.search}${page.url.hash}`, {
			locale: newLocale as (typeof locales)[number]
		});
		goto(href, { invalidateAll: true });
	}
</script>

<div class="space-y-3">
	{#if showLabel}
		<label for={id} class="text-sm font-medium text-foreground">
			{m.settings_language()}
		</label>
	{/if}
	<Select.Root type="single" value={selectedLocale} onValueChange={handleLanguageChange}>
		<Select.Trigger {id} class="w-full">
			{LOCALE_NAMES[selectedLocale] ?? selectedLocale}
		</Select.Trigger>
		<Select.Content>
			{#each locales as locale (locale)}
				<Select.Item value={locale} label={LOCALE_NAMES[locale] ?? locale}>
					{LOCALE_NAMES[locale] ?? locale}
				</Select.Item>
			{/each}
		</Select.Content>
	</Select.Root>
</div>
