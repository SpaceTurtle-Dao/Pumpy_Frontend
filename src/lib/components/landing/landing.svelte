<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { BackgroundBoxes } from '$lib/components/ui/boxes_a/index';
</script>

<div class="flex flex-col gap-2.5">
	<div
		class="relative flex h-30 w-full flex-col items-center justify-center overflow-hidden rounded-lg bg-transparent p-60"
	>
		<div
			class="pointer-events-none absolute inset-0 z-20 h-full w-full bg-primary [mask-image:radial-gradient(transparent,white)]"
		/>

		<BackgroundBoxes />
		<h2 class={cn('relative z-20 text-xl text-white md:text-4xl')}>SwapBox</h2>
		<p class="relative z-20 mt-2 text-center text-neutral-300">Simple Secure Swap</p>
	</div>
</div>
