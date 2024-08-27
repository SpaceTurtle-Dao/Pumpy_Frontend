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
    class="w-full bg-gradient-to-br from-[#1e1e2f] to-[#2a2a42] rounded-lg shadow-lg p-4 flex flex-col justify-between"
>
    <Card.Header class="flex flex-row items-center justify-between space-y-0 pb-2">
        <Card.Title class="text-sm font-medium text-gray-400 uppercase tracking-wider">Balance</Card.Title>
        <Avatar.Root class="h-9 w-9 bg-gray-700 p-1">
            <Avatar.Image src={icon} alt="Token Icon" class="rounded-full" />
            <Avatar.Fallback class="text-white">TK</Avatar.Fallback>
        </Avatar.Root>
    </Card.Header>
    <Card.Content class="flex flex-col justify-center">
        <div class="text-2xl font-bold text-white">{value}</div>
        <p class="text-sm text-gray-500">{title}</p>
    </Card.Content>
</Card.Root>