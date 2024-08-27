<script lang="ts">
	import File from 'lucide-svelte/icons/file';
	import Home from 'lucide-svelte/icons/home';
	import LineChart from 'lucide-svelte/icons/line-chart';
	import ListFilter from 'lucide-svelte/icons/list-filter';
	import Ellipsis from 'lucide-svelte/icons/ellipsis';
	import Package from 'lucide-svelte/icons/package';
	import Package2 from 'lucide-svelte/icons/package-2';
	import PanelLeft from 'lucide-svelte/icons/panel-left';
	import CirclePlus from 'lucide-svelte/icons/circle-plus';
	import Search from 'lucide-svelte/icons/search';
	import Settings from 'lucide-svelte/icons/settings';
	import ShoppingCart from 'lucide-svelte/icons/shopping-cart';
	import UsersRound from 'lucide-svelte/icons/users-round';

	import { Badge } from '$lib/components/ui/badge/index.js';
	import * as Breadcrumb from '$lib/components/ui/breadcrumb/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Sheet from '$lib/components/ui/sheet/index.js';
	import * as Table from '$lib/components/ui/table/index.js';
	import * as Tabs from '$lib/components/ui/tabs/index.js';
	import * as Tooltip from '$lib/components/ui/tooltip/index.js';

	interface Swap {
		owner: string;
		swapType: { [key: string]: null };
		tokenA: string;
		tokenB: string;
		createdAt: BigInt;
	}

	interface TokenInfo {
		symbol: string;
		decimals: number;
	}

	interface SwapCell {
		name: string;
		type: string;
		tokenA: string;
		tokenB: string;
		createdAt: string;
	}

	export let swaps: Array<Swap> = [
		{
			owner: 'abc123',
			swapType: { Buy: null },
			tokenA: '1000000000000000000',
			tokenB: '500000000000000000',
			createdAt: BigInt(Date.now() * 1000)
		},
		{
			owner: 'def456',
			swapType: { Sell: null },
			tokenA: '2000000000000000000',
			tokenB: '1000000000000000000',
			createdAt: BigInt(Date.now() * 1000)
		}
	];
	export let tokenA: TokenInfo = { symbol: 'ETH', decimals: 18 };
	export let tokenB: TokenInfo = { symbol: 'BTC', decimals: 8 };
	let swapCells: Array<SwapCell> = [];

	const decimals = (value: number) => {
		return Math.pow(10, value);
	};

	const NumberFormatter = (value: string, decimal: number) => {
		return parseFloat(parseFloat(value).toFixed(decimal)).toLocaleString('en', {
			useGrouping: true
		});
	};

	const setup = () => {
		let _swapCells: Array<SwapCell> = [];
		swaps.forEach((swap) => {
			let date = new Date(Number(swap.createdAt) / 1000);
			let formattedDate = date.toISOString().slice(0, 19).replace('T', ' ');
			let lastThree = swap.owner.slice(-3);
			let firstFive = swap.owner.slice(0, 5);
			let _tokenA = (Number(swap.tokenA) / decimals(tokenA.decimals)).toString();
			let _tokenB = (Number(swap.tokenB) / decimals(tokenB.decimals)).toString();

			let cell: SwapCell = {
				name: firstFive + lastThree,
				type: Object.keys(swap.swapType)[0],
				tokenA: NumberFormatter(_tokenA, 3),
				tokenB: NumberFormatter(_tokenB, 3),
				createdAt: formattedDate
			};
			_swapCells.push(cell);
		});
		swapCells = _swapCells;
	};
	setup();
</script>

<div class="flex flex-col p-4 space-y-4 bg-[#0f1123]">
	<main class="grid flex-1 items-start space-y-4">
		<Tabs.Root value="trades">
			<div class="flex items-center mb-4">
				<Tabs.List class="flex space-x-2 bg-[#1a1b2e] rounded-md p-1">
					<Tabs.Trigger value="trades" class="px-4 py-2 text-white rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">Trades</Tabs.Trigger>
					<Tabs.Trigger value="thread" class="px-4 py-2 text-white rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-50">Thread</Tabs.Trigger>
				</Tabs.List>
				<div class="ml-auto flex items-center gap-2 bg-[#1a1b2e] p-2 rounded-md">
					<DropdownMenu.Root>
						<DropdownMenu.Trigger asChild let:builder>
							<Button builders={[builder]} variant="outline" size="sm" class="h-8 gap-1 bg-[#252849] text-[#8e92b2] border-[#3d4279] hover:bg-[#3d4279] hover:text-white transition-colors duration-200">
								<ListFilter class="h-3.5 w-3.5" />
								<span class="sr-only sm:not-sr-only sm:whitespace-nowrap"> Filter </span>
							</Button>
						</DropdownMenu.Trigger>
						<DropdownMenu.Content align="end" class="bg-[#252849] text-[#8e92b2] border border-[#3d4279] rounded-md shadow-lg">
							<DropdownMenu.Label class="px-2 py-1 text-xs font-semibold">Filter by</DropdownMenu.Label>
							<DropdownMenu.Separator class="bg-[#3d4279]" />
							<DropdownMenu.CheckboxItem checked class="px-2 py-1 hover:bg-[#3d4279] hover:text-white transition-colors duration-200">Thread</DropdownMenu.CheckboxItem>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
					<Button size="sm" variant="outline" class="h-8 gap-1 bg-[#252849] text-[#8e92b2] border-[#3d4279] hover:bg-[#3d4279] hover:text-white transition-colors duration-200">
						<File class="h-3.5 w-3.5" />
						<span class="sr-only sm:not-sr-only sm:whitespace-nowrap"> Export </span>
					</Button>
				</div>
			</div>
			<Tabs.Content value="trades" class="bg-[#1a1b2e] rounded-lg overflow-hidden border border-[#2e3258] shadow-lg">
				<Card.Root class="overflow-x-auto">
					<Card.Header class="bg-[#252849] p-4">
						<Card.Title class="text-white text-lg font-semibold">Transactions</Card.Title>
						<Card.Description class="text-[#8e92b2]">(0 trades from people you follow)</Card.Description>
					</Card.Header>
					<Card.Content class="p-0">
						<Table.Root class="w-full">
							<Table.Header class="bg-[#252849]">
								<Table.Row>
									<Table.Head class="text-[#8e92b2] font-medium py-3 px-4">Name</Table.Head>
									<Table.Head class="text-[#8e92b2] font-medium py-3 px-4">Type</Table.Head>
									<Table.Head class="text-[#8e92b2] font-medium py-3 px-4 hidden md:table-cell">{tokenA.symbol.toUpperCase()}</Table.Head>
									<Table.Head class="text-[#8e92b2] font-medium py-3 px-4 hidden md:table-cell">{tokenB.symbol.toUpperCase()}</Table.Head>
									<Table.Head class="text-[#8e92b2] font-medium py-3 px-4 hidden md:table-cell">Created at</Table.Head>
									<Table.Head class="text-[#8e92b2] font-medium py-3 px-4">
										<span class="hidden md:inline">Transaction</span>
									</Table.Head>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								{#each swapCells as cell}
									<Table.Row class="border-t border-[#2e3258] hover:bg-[#252849] transition-colors duration-200">
										<Table.Cell class="text-white py-4 px-4">{cell.name}</Table.Cell>
										<Table.Cell class="py-4 px-4">
											<Badge variant="secondary" class="bg-[#3d4279] text-[#8e92b2]">{cell.type}</Badge>
										</Table.Cell>
										<Table.Cell class="text-white py-4 px-4 hidden md:table-cell">{cell.tokenA}</Table.Cell>
										<Table.Cell class="text-white py-4 px-4 hidden md:table-cell">{cell.tokenB}</Table.Cell>
										<Table.Cell class="text-white py-4 px-4 hidden md:table-cell">{cell.createdAt}</Table.Cell>
										<Table.Cell class="py-4 px-4">
											<Button size="icon" variant="ghost" class="text-[#8e92b2] hover:text-white hover:bg-[#3d4279] transition-colors duration-200">
												<Ellipsis class="h-4 w-4" />
											</Button>
										</Table.Cell>
									</Table.Row>
								{/each}
							</Table.Body>
						</Table.Root>
					</Card.Content>
					<Card.Footer class="bg-[#252849] p-4">
						<div class="text-xs text-[#8e92b2]">
							Showing <strong class="text-white">1-2</strong> of <strong class="text-white">2</strong> trades
						</div>
					</Card.Footer>
				</Card.Root>
			</Tabs.Content>
		</Tabs.Root>
	</main>
</div>