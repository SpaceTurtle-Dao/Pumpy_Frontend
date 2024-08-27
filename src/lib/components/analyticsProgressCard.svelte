<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Progress } from '$lib/components/ui/progress/index.js';

    export let value: string;
    export let title: string;
</script>

<Card.Root
	data-x-chunk-name="dashboard-05-chunk-1"
	data-x-chunk-description="A stats card showing this week's total sales in USD, the percentage difference from last week, and a progress bar."
    class="w-full sm:w-auto sm:min-w-[18rem] max-w-sm bg-gradient-to-br from-[#1e1e2f] to-[#2a2a42] rounded-lg shadow-lg p-6"
>
	<Card.Header class="pb-2">
		<Card.Description class="text-sm text-gray-400 uppercase tracking-wider">{title}</Card.Description>
		<Card.Title class="text-3xl font-bold text-white">{value}</Card.Title>
	</Card.Header>
	<Card.Content class="flex flex-col space-y-2">
		<div class="text-xs text-gray-500">25% bonded</div>
	</Card.Content>
	<Card.Footer>
		<Progress value={25} class="h-2 rounded bg-gray-700" aria-label="25% increase" />
	</Card.Footer>
</Card.Root>
