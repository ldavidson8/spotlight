<script lang="ts">
	import { fly } from 'svelte/transition';
	import { quintOut } from 'svelte/easing';
	import type { Snippet } from 'svelte';

	interface Props {
		name: string;
		isOpen: boolean;
		onOpen: (name: string) => void;
		onClose: (name: string) => void;
		trigger: Snippet<[{ isOpen: boolean }]>;
		children: Snippet;
		align?: 'left' | 'right';
		gap?: number;
		closeDelay?: number;
		minWidth?: string;
	}

	let {
		name,
		isOpen,
		onOpen,
		onClose,
		trigger,
		children,
		align = 'left',
		gap = 8,
		closeDelay = 150,
		minWidth = '200px'
	}: Props = $props();

	let isInsideTrigger = $state(false);
	let isInsideDropdown = $state(false);
	let isInsideBridge = $state(false);
	let closeTimeout: ReturnType<typeof setTimeout> | null = null;

	let containerRef: HTMLDivElement | undefined = $state();
	let triggerRef: HTMLButtonElement | undefined = $state();

	const dropdownId = `dropdown-${Math.random().toString(36).substring(2, 9)}`;

	function clearCloseTimeout() {
		if (closeTimeout) {
			clearTimeout(closeTimeout);
			closeTimeout = null;
		}
	}

	function scheduleClose() {
		clearCloseTimeout();
		closeTimeout = setTimeout(() => {
			if (!isInsideTrigger && !isInsideDropdown && !isInsideBridge) {
				onClose(name);
			}
		}, closeDelay);
	}

	function handleTriggerEnter() {
		clearCloseTimeout();
		isInsideTrigger = true;
		onOpen(name);
	}

	function handleTriggerLeave() {
		isInsideTrigger = false;
		scheduleClose();
	}

	function handleBridgeEnter() {
		clearCloseTimeout();
		isInsideBridge = true;
	}

	function handleBridgeLeave() {
		isInsideBridge = false;
		scheduleClose();
	}

	function handleDropdownEnter() {
		clearCloseTimeout();
		isInsideDropdown = true;
	}

	function handleDropdownLeave() {
		isInsideDropdown = false;
		scheduleClose();
	}

	function handleTriggerClick() {
		if (isOpen) {
			onClose(name);
		} else {
			onOpen(name);
		}
	}

	function handleKeydown(e: KeyboardEvent) {
		if (e.key === 'Escape' && isOpen) {
			e.preventDefault();
			forceClose();
			triggerRef?.focus();
		}
	}

	function handleFocusOut(e: FocusEvent) {
		const nextFocusTarget = e.relatedTarget as Node;
		if (containerRef && !containerRef.contains(nextFocusTarget)) {
			forceClose();
		}
	}

	export function forceClose() {
		clearCloseTimeout();
		isInsideTrigger = false;
		isInsideDropdown = false;
		isInsideBridge = false;
		onClose(name);
	}

	export function resetTracking() {
		clearCloseTimeout();
		isInsideTrigger = false;
		isInsideDropdown = false;
		isInsideBridge = false;
	}

	$effect(() => {
		return () => {
			clearCloseTimeout();
		};
	});
</script>

<!-- svelte-ignore a11y_no_static_element_interactions -->
<div
	bind:this={containerRef}
	class="relative"
	onkeydown={handleKeydown}
	onfocusout={handleFocusOut}
>
	<button
		type="button"
		bind:this={triggerRef}
		onmouseenter={handleTriggerEnter}
		onmouseleave={handleTriggerLeave}
		onclick={handleTriggerClick}
		aria-expanded={isOpen}
		aria-controls={dropdownId}
		class="w-full rounded-md text-left outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
	>
		{@render trigger({ isOpen })}
	</button>

	{#if isOpen}
		<div
			class="absolute top-full right-0 left-0"
			style="height: {gap + 4}px;"
			role="presentation"
			onmouseenter={handleBridgeEnter}
			onmouseleave={handleBridgeLeave}
		></div>

		<div
			id={dropdownId}
			class="absolute z-50"
			class:left-0={align === 'left'}
			class:right-0={align === 'right'}
			style="top: calc(100% + {gap}px);"
			transition:fly={{ y: -8, duration: 200, easing: quintOut }}
			onmouseenter={handleDropdownEnter}
			onmouseleave={handleDropdownLeave}
		>
			<div
				class="overflow-hidden rounded-lg border border-border bg-popover p-1.5 shadow-md"
				style="min-width: {minWidth};"
			>
				{@render children()}
			</div>
		</div>
	{/if}
</div>
