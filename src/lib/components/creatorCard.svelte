<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
</script>

<Card.Root
	data-x-chunk-name="dashboard-05-chunk-1"
	data-x-chunk-description="A stats card showing this week's total sales in USD, the percentage difference from last week, and a progress bar."
	class="w-72 h-40"
>
	<Card.Header class="pb-0">
		<div class="flex flex-row gap-2">
			<Avatar.Root class="hidden h-9 w-9 sm:flex">
				<Avatar.Image src="luna.png" alt="Avatar" />
				<Avatar.Fallback>OM</Avatar.Fallback>
			</Avatar.Root>
			<div class="flex flex-col">
				<Card.Description>Created By</Card.Description>
				<div class="text-xs text-muted-foreground">Luna</div>
			</div>
		</div>

	</Card.Header>
	<Card.Content class="pt-8">
        <Button class="w-full" size="lg">Follow</Button>
    </Card.Content>
</Card.Root>
