<script lang="ts">
	import { onMount } from 'svelte';

	let { data } = $props();

	const SCROLL_THRESHOLD = 250;

	function lerp(a: number, b: number, t: number) {
		return a + (b - a) * t;
	}

	onMount(() => {
		const header = document.getElementById('site-header') as HTMLElement;
		const title = document.getElementById('site-title') as HTMLElement;
		const subtitle = document.getElementById('site-subtitle') as HTMLElement;

		const handler = () => {
			const p = Math.min(window.scrollY / SCROLL_THRESHOLD, 1);
			header.style.paddingTop = `${lerp(48, 14, p)}px`;
			header.style.paddingBottom = `${lerp(48, 14, p)}px`;
			title.style.fontSize = `${lerp(5, 1.25, p)}rem`;
			subtitle.style.opacity = `${lerp(1, 0, p)}`;
			subtitle.style.marginTop = `${lerp(6, 0, p)}px`;
		};

		window.addEventListener('scroll', handler, { passive: true });
		return () => window.removeEventListener('scroll', handler);
	});
</script>

<header
	id="site-header"
	class="sticky top-0 z-10 px-6 text-center"
	style="background-color: var(--color-background); padding-top: 48px; padding-bottom: 48px;"
>
	<div class="mx-auto w-fit">
		<h1 id="site-title" class="font-bold" style="font-size: 5rem; line-height: 1;">
			blog<span class="text-pink-500">.</span>
		</h1>
		<p id="site-subtitle" class="text-right" style="font-size: 0.75rem; margin-top: 6px;">
			aledwassell.dev
		</p>
	</div>
</header>

<main class="mx-auto max-w-3xl px-6 py-12">
	<div class="flex flex-col gap-12">
		{#each data.items as item}
			<article>
				{#if item.type === 'photo'}
					<img src={item.url} alt={item.title} width={item.width} height={item.height} class="w-full" />
				{:else}
					<div class="relative w-full" style="padding-bottom: 56.25%;">
						<iframe
							src="https://www.youtube.com/embed/{item.videoId}"
							title={item.title}
							frameborder="0"
							allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
							allowfullscreen
							class="absolute inset-0 h-full w-full"
						></iframe>
					</div>
				{/if}
				<div class="mt-3">
					{#if item.title}
						<h2 class="text-base">{item.title}</h2>
					{/if}
					{#if item.description}
						<p class="mt-1 text-sm text-neutral-500">{item.description}</p>
					{/if}
					{#if item.date}
						<time class="mt-1 block text-xs text-neutral-600">
							{new Date(item.date).toLocaleDateString('en-GB', {
								day: 'numeric',
								month: 'long',
								year: 'numeric'
							})}
						</time>
					{/if}
				</div>
			</article>
		{/each}
	</div>
</main>
