<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	export let title: string;
	export let value: string;
    export let icon: string;
</script>

<Card.Root
	data-x-chunk-name="dashboard-05-chunk-1"
	data-x-chunk-description="A stats card showing this week's total sales in USD, the percentage difference from last week, and a progress bar."
    class="w-72"
>
	<Card.Header class="pb-2">
		<div class="flex flex-row gap-2">
			<Avatar.Root class="hidden h-9 w-9 sm:flex">
				<Avatar.Image src={icon} alt="Avatar" />
				<Avatar.Fallback>OM</Avatar.Fallback>
			</Avatar.Root>
			<Card.Description class="pt-2">{title}</Card.Description>
		</div>
	</Card.Header>
	<Card.Content class="flex flex-col space-y-2">
		<Card.Title class="text-4xl">{value}</Card.Title>
	</Card.Content>
</Card.Root>
