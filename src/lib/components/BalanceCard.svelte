<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	export let title: string;
	export let value: string;
	export let icon: string;
</script>

<Card.Root
	data-x-chunk-name="dashboard-01-chunk-0"
	data-x-chunk-description="A card showing the total revenue in USD and the percentage difference from last month."
	class="h-40"
>
	<Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
		<Card.Title class="text-sm font-medium">Balance</Card.Title>
		<Avatar.Root class="hidden h-9 w-9 sm:flex">
			<Avatar.Image src={icon} alt="Avatar" />
			<Avatar.Fallback>OM</Avatar.Fallback>
		</Avatar.Root>
	</Card.Header>
	<Card.Content>
		<div class="text-2xl font-bold">{value}</div>
		<p class="text-xs text-muted-foreground">{title}</p>
	</Card.Content>

</Card.Root>
