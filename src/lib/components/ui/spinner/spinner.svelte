<script lang="ts">
	import { cn } from '$lib/utils.js';
	import IconSpinner from '~icons/ph/spinner-bold';
	import type { ComponentProps } from 'svelte';

	let { class: className, ...restProps }: ComponentProps<typeof IconSpinner> = $props();
</script>

<IconSpinner
	role="status"
	aria-label="Loading"
	class={cn('size-4 animate-spin', className)}
	{...restProps}
/>
