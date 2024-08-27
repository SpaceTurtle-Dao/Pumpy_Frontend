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
    class="w-full sm:w-auto sm:min-w-[18rem] max-w-sm bg-gradient-to-br from-[#1e1e2f] to-[#2a2a42] rounded-lg shadow-lg p-6"
>
	<Card.Header class="pb-2 sm:pb-4">
		<Card.Description class="text-sm sm:text-base text-gray-400 uppercase tracking-wider">
            {title}
        </Card.Description>
	</Card.Header>
	<Card.Content class="flex flex-col space-y-1 sm:space-y-3">
		<Card.Title class="text-3xl sm:text-4xl font-bold text-white">
            {value}
        </Card.Title>
	</Card.Content>
	<Card.Footer class="flex items-center gap-2 mt-4">
		{#if isUp}
			<ChevronUp class="w-5 h-5 text-green-400" />
			<p class="text-sm sm:text-base font-semibold text-green-400">{percentage}%</p>
		{:else}
			<ChevronDown class="w-5 h-5 text-red-400" />
			<p class="text-sm sm:text-base font-semibold text-red-400">{percentage}%</p>
		{/if}
		<p class="text-sm sm:text-base text-gray-500">1hr</p>
	</Card.Footer>
</Card.Root>