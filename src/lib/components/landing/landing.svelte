<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { BackgroundBoxes } from '$lib/components/ui/boxes_a/index';
	import { GradientAnimation } from '../ui/gradient_animation/index';
	import { BackgroundBeams } from '../ui/background_beams/index';
	import { EvervaultCard, Icon } from '$lib/components/ui/ever_vault/index';
	import Features from './features.svelte';
	import Footer from '../footer.svelte';
</script>

<div class="p-3 md:p-5 flex flex-col gap-2.5 max-w-[1440px] mx-auto min-h-[100vh]">
	<div class="w-full overflow-hidden rounded-md relative">
		<EvervaultCard text="Simple Secure Swap" />
	</div>
	<div class="w-full overflow-hidden rounded-md relative">
		<Features />
	</div>
	<div class="w-full overflow-hidden rounded-md relative">
		<Footer />
	</div>
</div>
