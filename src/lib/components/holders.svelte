<script lang="ts">
	import Activity from 'lucide-svelte/icons/activity';
	import ArrowUpRight from 'lucide-svelte/icons/arrow-up-right';
	import CircleUser from 'lucide-svelte/icons/circle-user';
	import CreditCard from 'lucide-svelte/icons/credit-card';
	import DollarSign from 'lucide-svelte/icons/dollar-sign';
	import Menu from 'lucide-svelte/icons/menu';
	import Package2 from 'lucide-svelte/icons/package-2';
	import Search from 'lucide-svelte/icons/search';
	import Users from 'lucide-svelte/icons/users';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { Badge } from '$lib/components/ui/badge/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import type { TokenInfo } from '$lib/declarations/pumpy/pumpy.did';

	export let holders: Array<[string, bigint]> = [];
	export let token: TokenInfo;
	export let poolId: string;

	function percentage(partialValue:number, totalValue:number) {
		return (100 * partialValue) / totalValue;
	};

</script>

<Card.Root
	data-x-chunk-name="dashboard-01-chunk-5"
	data-x-chunk-description="A card showing a list of recent sales with customer names and email addresses."
>
	<Card.Header>
		<Card.Title>Holder Distribution</Card.Title>
	</Card.Header>
	<Card.Content class="grid gap-8">
		{#each holders as holder}
		<div class="flex items-center gap-4">
			<Avatar.Root class="hidden h-9 w-9 sm:flex">
				<Avatar.Image src="luna.png" alt="Avatar" />
				<Avatar.Fallback>OM</Avatar.Fallback>
			</Avatar.Root>
			<div class="grid gap-1">
				{#if poolId == holder[0]}
					<p class="text-sm font-medium leading-none">Bonding</p>
				{/if}
				{#if token.minter == holder[0]}
					<p class="text-sm font-medium leading-none">Dev</p>
				{/if}
				<p class="text-sm text-muted-foreground truncate ...">{holder[0]}</p>
			</div>
			<div class="ml-auto font-medium">{percentage(Number(holder[1]), Number(token.supply))}%</div>
		</div>
		{/each}
	</Card.Content>
</Card.Root>
