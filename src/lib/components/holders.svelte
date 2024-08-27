<script lang="ts">
    import { Badge } from '$lib/components/ui/badge/index.js';
    import * as Card from '$lib/components/ui/card/index.js';
    import * as Avatar from '$lib/components/ui/avatar/index.js';
    import { Progress } from '$lib/components/ui/progress/index.js';
    import type { TokenInfo } from '$lib/declarations/pumpy/pumpy.did';

    export let holders: Array<[string, bigint]> = [];
    export let token: TokenInfo;
    export let poolId: string;

    function percentage(partialValue: number, totalValue: number) {
        return ((100 * partialValue) / totalValue).toFixed(2);
    }

    function shortenAddress(address: string) {
        return `${address.slice(0, 6)}...${address.slice(-4)}`;
    }
</script>

<Card.Root
    data-x-chunk-name="dashboard-01-chunk-5"
    data-x-chunk-description="A card showing the distribution of token holders."
    class="w-full bg-gradient-to-br from-[#1e1e2f] to-[#2a2a42] rounded-lg shadow-lg p-4"
>
    <Card.Header>
        <Card.Title class="text-lg font-semibold text-white mb-4">Holder Distribution</Card.Title>
    </Card.Header>
    <Card.Content class="grid gap-4">
        {#each holders as holder, index}
            <div class="flex items-center gap-4 bg-[#2a2a42] p-3 rounded-lg hover:bg-[#3a3a52] transition-colors duration-200">
                <Avatar.Root class="h-10 w-10 bg-[#4a4a76] flex items-center justify-center">
                    <Avatar.Fallback class="text-white text-sm">{index + 1}</Avatar.Fallback>
                </Avatar.Root>
                <div class="grid gap-1 min-w-0 flex-1">
                    <div class="flex items-center gap-2">
                        {#if poolId == holder[0]}
                            <Badge class="bg-blue-500 text-white">Bonding</Badge>
                        {:else if token.minter == holder[0]}
                            <Badge class="bg-green-500 text-white">Dev</Badge>
                        {:else}
                            <Badge class="bg-gray-500 text-white">Holder</Badge>
                        {/if}
                        <p class="text-sm font-medium text-gray-300 truncate">{shortenAddress(holder[0])}</p>
                    </div>
                    <Progress value={Number(percentage(Number(holder[1]), Number(token.supply)))} class="h-2" />
                </div>
                <div class="ml-auto font-medium text-white">
                    {percentage(Number(holder[1]), Number(token.supply))}%
                </div>
            </div>
        {/each}
    </Card.Content>
</Card.Root>