<script lang="ts">
	let { data } = $props();
</script>

<main class="mx-auto max-w-3xl px-6 py-12">
	<h1 class="mb-10 text-2xl">Photos</h1>
	<div class="flex flex-col gap-12">
		{#each data.photos as photo}
			<article>
				<img
					src={photo.url}
					alt={photo.title}
					width={photo.width}
					height={photo.height}
					class="w-full"
				/>
				<div class="mt-3">
					{#if photo.title}
						<h2 class="text-base">{photo.title}</h2>
					{/if}
					{#if photo.description}
						<p class="mt-1 text-sm text-neutral-500">{photo.description}</p>
					{/if}
					{#if photo.dateTaken}
						<time class="mt-1 block text-xs text-neutral-600">
							{new Date(photo.dateTaken).toLocaleDateString('en-GB', {
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
