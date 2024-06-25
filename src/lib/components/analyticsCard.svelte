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
    class="min-w-72"
>
	<Card.Header class="pb-2">
		<Card.Description>{title}</Card.Description>
	</Card.Header>
	{#if isUp}
		<Card.Content class="flex flex-col space-y-2">
			<Card.Title class="text-2xl">{value}</Card.Title>
		</Card.Content>
		<Card.Footer class="gap-2">
			<ChevronUp />
			<p class="text-xs text-green-400">{percentage}%</p>
			<p class="text-xs text-muted-foreground">1hr</p>
		</Card.Footer>
	{:else}
		<Card.Content class="flex flex-col space-y-2">
			<Card.Title class="text-2xl">{value}</Card.Title>
		</Card.Content>
		<Card.Footer class="gap-2">
			<ChevronDown />
			<p class="text-xs text-red-400">{percentage}%</p>
			<p class="text-xs text-muted-foreground">1hr</p>
		</Card.Footer>
	{/if}
</Card.Root>
