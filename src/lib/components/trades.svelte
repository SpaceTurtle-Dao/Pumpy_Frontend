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
	import type { Swap, TokenInfo } from '$lib/declarations/pumpy/pumpy.did';

	interface SwapCell {
		name: string;
		type: string;
		tokenA: string;
		tokenB: string;
		createdAt: string;
	}

	export let swaps: Array<Swap> = [];
	export let tokenA: TokenInfo;
	export let tokenB: TokenInfo;
	let swapCells: Array<SwapCell> = [];

	const decimals = (value: BigInt) => {
		let _decimals = 1;
		for (let i = 0; i < Number(value); i++) {
			_decimals = _decimals * 10;
		}

		return _decimals;
	};

	const NumberFormatter = (value:string, decimal:number) => {
		return parseFloat(parseFloat(value).toFixed(decimal)).toLocaleString('en', {
			useGrouping: true
		});
	};

	const setup = () => {
		let _swapCells: Array<SwapCell> = [];
		swaps.forEach((swap) => {
			let date = new Date(Number(swap.createdAt) / 1000);
			var year = date.toLocaleString('default', { year: 'numeric' });
			var month = date.toLocaleString('default', { month: '2-digit' });
			var day = date.toLocaleString('default', { day: '2-digit' });
			var hour = date.toLocaleString('default', { hour: '2-digit' });
			// Generate yyyy-mm-dd date string
			// @ts-ignore
			var formattedDate = year + '-' + month + '-' + day + '-' + hour;
			var lastThree = swap.owner.substring(swap.owner.length - 4, swap.owner.length);
			var firstFive = swap.owner.substring(0, 5);
      let _tokenA = (Number(swap.tokenA)/decimals(tokenA.decimals)).toString();
      let _tokenB = (Number(swap.tokenB)/decimals(tokenB.decimals)).toString();

			let cell: SwapCell = {
				name: firstFive + lastThree,
				type: Object.keys(swap.swapType)[0],
				tokenA: NumberFormatter(_tokenA,3),
				tokenB: NumberFormatter(_tokenB,3),
				createdAt: formattedDate
			};
			_swapCells.push(cell);
		});
		swapCells = _swapCells;
	};
	setup();
</script>

<div class="flex flex-col">
	<main class="grid flex-1 items-start">
		<Tabs.Root value="trades">
			<div class="flex items-center">
				<Tabs.List>
					<Tabs.Trigger value="trades">Trades</Tabs.Trigger>
					<Tabs.Trigger value="thread">Thread</Tabs.Trigger>
				</Tabs.List>
				<div class="ml-auto flex items-center gap-2">
					<DropdownMenu.Root>
						<DropdownMenu.Trigger asChild let:builder>
							<Button builders={[builder]} variant="outline" size="sm" class="h-8 gap-1">
								<ListFilter class="h-3.5 w-3.5" />
								<span class="sr-only sm:not-sr-only sm:whitespace-nowrap"> Filter </span>
							</Button>
						</DropdownMenu.Trigger>
						<DropdownMenu.Content align="end">
							<DropdownMenu.Label>Filter by</DropdownMenu.Label>
							<DropdownMenu.Separator />
							<DropdownMenu.CheckboxItem checked>Thread</DropdownMenu.CheckboxItem>
						</DropdownMenu.Content>
					</DropdownMenu.Root>
					<Button size="sm" variant="outline" class="h-8 gap-1">
						<File class="h-3.5 w-3.5" />
						<span class="sr-only sm:not-sr-only sm:whitespace-nowrap"> Export </span>
					</Button>
				</div>
			</div>
			<Tabs.Content value="trades">
				<Card.Root>
					<Card.Header>
						<Card.Title>Transactions</Card.Title>
						<Card.Description>(0 trades from people you follow)</Card.Description>
					</Card.Header>
					<Card.Content>
						<Table.Root>
							<Table.Header>
								<Table.Row>
									<Table.Head class="hidden w-[100px] sm:table-cell">
										<span class="sr-only">Image</span>
									</Table.Head>
									<Table.Head>Name</Table.Head>
									<Table.Head>Type</Table.Head>
									<Table.Head class="hidden md:table-cell">{tokenA.name.toUpperCase()}</Table.Head>
									<Table.Head class="hidden md:table-cell">{tokenB.name.toUpperCase()}</Table.Head>
									<Table.Head class="hidden md:table-cell">Created at</Table.Head>
									<Table.Head>
										<span class="hidden md:table-cell">Transaction</span>
									</Table.Head>
								</Table.Row>
							</Table.Header>
							<Table.Body>
								{#each swapCells as cell}
									<Table.Row>
										<Table.Cell class="hidden sm:table-cell">
											<img
												alt="Product example"
												class="aspect-square rounded-md object-cover"
												height="64"
												src="./sunny.jpeg"
												width="64"
											/>
										</Table.Cell>
										<Table.Cell class="font-medium">{cell.name}</Table.Cell>
										<Table.Cell>
											<Badge variant="secondary">{cell.type}</Badge>
										</Table.Cell>
										<Table.Cell class="hidden md:table-cell">{cell.tokenA}</Table.Cell>
										<Table.Cell class="hidden md:table-cell">{cell.tokenB}</Table.Cell>
										<Table.Cell class="hidden md:table-cell">{cell.createdAt}</Table.Cell>
										<Table.Cell>
											<DropdownMenu.Root>
												<DropdownMenu.Trigger asChild let:builder>
													<Button
														aria-haspopup="true"
														size="icon"
														variant="ghost"
														builders={[builder]}
													>
														<Ellipsis class="h-4 w-4" />
														<span class="sr-only">Toggle menu</span>
													</Button>
												</DropdownMenu.Trigger>
												<DropdownMenu.Content align="end">
													<DropdownMenu.Label>Actions</DropdownMenu.Label>
													<DropdownMenu.Item>Edit</DropdownMenu.Item>
													<DropdownMenu.Item>Delete</DropdownMenu.Item>
												</DropdownMenu.Content>
											</DropdownMenu.Root>
										</Table.Cell>
									</Table.Row>
								{/each}
							</Table.Body>
						</Table.Root>
					</Card.Content>
					<Card.Footer>
						<div class="text-xs text-muted-foreground">
							Showing <strong>1-10</strong> of <strong>32</strong> trades
						</div>
					</Card.Footer>
				</Card.Root>
			</Tabs.Content>
		</Tabs.Root>
	</main>
</div>
