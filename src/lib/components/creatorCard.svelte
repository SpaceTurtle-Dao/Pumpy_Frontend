<script lang="ts">
    import { Button } from '$lib/components/ui/button/index.js';
    import * as Card from '$lib/components/ui/card/index.js';
    import * as Avatar from '$lib/components/ui/avatar/index.js';
</script>

<Card.Root
    data-x-chunk-name="dashboard-05-chunk-1"
    data-x-chunk-description="A stats card showing this week's total sales in USD, the percentage difference from last week, and a progress bar."
    class="w-full bg-gradient-to-br from-[#1e1e2f] to-[#2a2a42] rounded-lg shadow-lg p-4 flex flex-col justify-between"
>
    <Card.Header class="flex flex-col items-center">
        <Avatar.Root class="h-14 w-14 rounded-full bg-gray-700 p-1 mb-3">
            <Avatar.Image src="luna.png" alt="Avatar" class="rounded-full" />
            <Avatar.Fallback class="text-white">OM</Avatar.Fallback>
        </Avatar.Root>
        <Card.Description class="text-center text-gray-400 uppercase tracking-wider mb-1">
            Created By
        </Card.Description>
        <div class="text-sm text-gray-500 text-center mb-4">Luna</div>
    </Card.Header>
    <Card.Content class="flex justify-center">
        <Button class="w-full text-white bg-[#4a4a76] hover:bg-[#6363a5] border-none rounded-md">
            Follow
        </Button>
    </Card.Content>
</Card.Root>