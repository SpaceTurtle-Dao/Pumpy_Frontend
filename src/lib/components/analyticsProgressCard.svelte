<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Progress } from '$lib/components/ui/progress/index.js';

    export let value:string;
    export let title:string;

</script>

<Card.Root
	data-x-chunk-name="dashboard-05-chunk-1"
	data-x-chunk-description="A stats card showing this week's total sales in USD, the percentage difference from last week, and a progress bar."
    class="w-72"
>
	<Card.Header class="pb-2">
		<Card.Description>{title}</Card.Description>
		<Card.Title class="text-2xl"
			>{value}</Card.Title
		>
	</Card.Header>
	<Card.Content class="flex flex-col space-y-2">
		<div class="text-xs text-muted-foreground">25% bonded</div>
	</Card.Content>
	<Card.Footer>
		<Progress value={25} aria-label="25% increase" />
	</Card.Footer>
</Card.Root>
