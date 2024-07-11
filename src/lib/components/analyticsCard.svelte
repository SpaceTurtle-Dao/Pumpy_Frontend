<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { ChevronDown, ChevronUp } from 'lucide-svelte';

    export let title: string;
	export let value: string;
    export let percentage: string;
    export let isUp: boolean;
</script>

<Card.Root
	data-x-chunk-name="dashboard-05-chunk-1"
	data-x-chunk-description="A stats card showing this week's total sales in USD, the percentage difference from last week, and a progress bar."
    class="w-full sm:w-auto sm:min-w-[18rem] max-w-sm"
>
	<Card.Header class="pb-2 sm:pb-3">
		<Card.Description class="text-sm sm:text-base">{title}</Card.Description>
	</Card.Header>
	<Card.Content class="flex flex-col space-y-1 sm:space-y-2">
		<Card.Title class="text-xl sm:text-2xl md:text-3xl">{value}</Card.Title>
	</Card.Content>
	<Card.Footer class="flex items-center gap-1 sm:gap-2">
		{#if isUp}
			<ChevronUp class="w-4 h-4 sm:w-5 sm:h-5" />
			<p class="text-xs sm:text-sm text-green-400">{percentage}%</p>
		{:else}
			<ChevronDown class="w-4 h-4 sm:w-5 sm:h-5" />
			<p class="text-xs sm:text-sm text-red-400">{percentage}%</p>
		{/if}
		<p class="text-xs sm:text-sm text-muted-foreground">1hr</p>
	</Card.Footer>
</Card.Root>