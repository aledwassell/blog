<script lang="ts">
	import '../app.css';
	import favicon from '$lib/assets/favicon.ico';

	let { children } = $props();
</script>

<svelte:head>
	<title>aled wassell — blog</title>
	<meta name="description" content="Music, photos and videos by Aled Wassell" />
	<link rel="canonical" href="https://blog.aledwassell.dev" />

	<meta property="og:type" content="website" />
	<meta property="og:url" content="https://blog.aledwassell.dev" />
	<meta property="og:title" content="aled wassell — blog" />
	<meta property="og:description" content="Music, photos and videos by Aled Wassell" />

	<meta name="twitter:card" content="summary" />
	<meta name="twitter:title" content="aled wassell — blog" />
	<meta name="twitter:description" content="Music, photos and videos by Aled Wassell" />

	<link rel="icon" href={favicon} />
	<link rel="preconnect" href="https://fonts.googleapis.com" />
	<link rel="preconnect" href="https://fonts.gstatic.com" crossorigin="anonymous" />
	<link href="https://fonts.googleapis.com/css2?family=SUSE+Mono&display=swap" rel="stylesheet" />
</svelte:head>
{@render children()}
