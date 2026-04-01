<script lang="ts">
	import { page } from '$app/state';

	const currentUrl = page.url.origin + page.url.pathname;

	type Props = {
		title?: string;
		description?: string;
		image?: string;
		type?: string;
		date?: string | undefined;
	};

	let {
		title = 'spotlight',
		description = 'Discover the latest movie releases and series',
		image = '',
		type = 'website',
		date = undefined
	}: Props = $props();
</script>

<svelte:head>
	<title>{title}</title>
	<meta name="robots" content="follow, index" />
	<meta content={description} name="description" />
	<meta property="og:url" content={currentUrl} />
	<link rel="canonical" href={currentUrl} />
	<meta property="og:type" content={type} />
	<meta property="og:site_name" content="spotlight" />
	<meta property="og:description" content={description} />
	<meta property="og:title" content={title} />
	<meta property="og:image" content={image} />
	<meta property="og:image:alt" content="spotlight Banner" />
	<meta name="twitter:card" content="summary_large_image" />
	<meta name="twitter:site" content="@spotlight" />
	<meta name="twitter:title" content={title} />
	<meta name="twitter:description" content={description} />
	<meta name="twitter:image" content={image} />
	{#if date}
		<meta property="article:published_time" content={date} />
	{/if}

	<link rel="icon" href="/favicon.ico" />
	<link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
	<link rel="icon" type="image/png" sizes="192x192" href="/icon-192.png" />
	<link rel="icon" type="image/png" sizes="512x512" href="/icon-512.png" />
</svelte:head>
