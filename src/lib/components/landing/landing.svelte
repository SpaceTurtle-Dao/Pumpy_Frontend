<script lang="ts">
	import { cn } from '$lib/utils/cn';
	import { BackgroundBoxes } from '$lib/components/ui/boxes_a/index';
	import { GradientAnimation } from '../ui/gradient_animation/index';
	import { BackgroundBeams } from '../ui/background_beams/index';
	import { EvervaultCard, Icon } from '$lib/components/ui/ever_vault/index';
	import Features from './features.svelte';
	import Footer from '../footer.svelte';
</script>

<div class="flex-col gap-2.5">
	<div class="flex-initial max-h-80 min-h-60">
		<EvervaultCard text="Simple Secure Swap" />
	</div>
	<div class="flex-initial max-h-80 min-h-60">
		<Features />
	</div>
	<!-- <div class="flex-initial max-h-80 min-h-60">
		<Footer />
	</div> -->
</div>
