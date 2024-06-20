<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
</script>

<Card.Root
	data-x-chunk-name="dashboard-05-chunk-1"
	data-x-chunk-description="A stats card showing this week's total sales in USD, the percentage difference from last week, and a progress bar."
	class="w-72"
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
        <Button class="w-44" size="lg">Follow</Button>
    </Card.Content>
    <Card.Footer>
        <p class="text-sm text-muted-foreground truncate ...">
            43emf-jxwxr-zvbvb-vojch-3a6um-mhe2d-if2bh-wefw3-3g52d-gjfos-vqe
        </p>
    </Card.Footer>
</Card.Root>
