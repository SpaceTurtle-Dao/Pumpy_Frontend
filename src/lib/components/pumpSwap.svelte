<script lang="ts">
	import { page } from '$app/stores';
	import Chart from '$lib/components/chart.svelte';
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Progress } from '$lib/components/ui/progress/index.js';
	import Trades from '$lib/components/trades.svelte';
	import Holders from '$lib/components/holders.svelte';
	import Footer from '$lib/components/footer.svelte';
	// @ts-ignore
	import SocialIcons from '@rodneylab/svelte-social-icons';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { ChevronDown, ChevronUp } from 'lucide-svelte';
	import type { Principal } from '@dfinity/principal';
	import MediumSpinner from '$lib/components/mediumSpinner.svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import {
		pumpyActor,
		principalStore,
		loadingStore,
		poolsStore,
		pumpsStore,
		tokensStore,
		balancesStore
	} from '$lib/store';
	import type {
		MintRequest,
		Pumpy,
		PoolRequest,
		PumpRequest,
		TokenRequest,
		PoolInfo,
		TokenResult,
		TokenInfo,
		Transaction,
		TransactionType,
		Swap
	} from '$lib/declarations/pumpy/pumpy.did';

	let pumpy: Pumpy;
	export let pool: PoolInfo;
	export let tokenA: TokenInfo;
	export let tokenB: TokenInfo;
	let token: TokenInfo = tokenA;
	let isLoading = false;
	let dialogOpen = false;
	let isTokenA = false;
	let isBuy = true;
	let slippage = 0.1;
	let amount = 0;

	// Create our number formatter.
	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD'

		// These options are needed to round to whole numbers if that's what you want.
		//minimumFractionDigits: 0, // (this suffices for whole numbers, but will print 2500.10 as $2,500.1)
		//maximumFractionDigits: 0, // (causes 2500.99 to be printed as $2,501)
	});

	function relDiff(a: number, b: number) {
		return 100 * Math.abs((a - b) / ((a + b) / 2));
	}

	const NumberFormatter = (value: string, decimal: number) => {
		return parseFloat(parseFloat(value).toFixed(decimal)).toLocaleString('en', {
			useGrouping: true
		});
	};

	const decimals = (value: bigint) => {
		let _decimals = BigInt(1);
		for (let i = BigInt(0); i < value; i++) {
			_decimals = _decimals * BigInt(10);
		}

		return _decimals;
	};

	function getPercentage(percentage: string, totalValue: string) {
		return (Number(percentage) / 100) * Number(totalValue);
	}

	/*function calculatePercentage(x:bigint, y:bigint) {
		return (x / y) * BigInt(100);
	}*/

	const buy = async () => {
		console.log('buy');
		let poolId = { PUMP: pool.id };
		if (isTokenA) {
			let _amount = BigInt(amount) * decimals(tokenA.decimals);
			console.log("Amount: "+ _amount);
			let esitmate = await pumpy.getSwapTokenBEstimate(poolId, _amount);
			console.log(esitmate/decimals(tokenA.decimals));
			//let _slippage = esitmate - BigInt(Math.round(getPercentage(slippage.toString(), esitmate.toString())));
			/*console.log('Swapping');
			console.log(_amount + ' ' + tokenA.symbol + ' for ' + tokenB.symbol);
			console.log('slippage: ' + slippage + '%');
			console.log('slippage: ' + _slippage + ' ' + tokenB.symbol);
			console.log(
				'estimate: ' + esitmate + ' ' + tokenB.symbol
			);
			console.log(esitmate);
			console.log(BigInt(_slippage));*/
			//return await pumpy.swapTokenB({ PUMP: pool.id }, amount, _slippage);
		} else {
			let _amount = BigInt(amount) * decimals(tokenB.decimals);
			console.log(_amount);
			let esitmate = await pumpy.getSwapTokenAEstimate(poolId, _amount);
			console.log(esitmate)
			//let _slippage = esitmate - BigInt(Math.round(getPercentage(slippage.toString(), esitmate.toString())));
			/*console.log('Swapping');
			console.log(_amount + ' ' + tokenB.symbol + ' for ' + tokenA.symbol);
			console.log('slippage: ' + slippage + '%');
			console.log('slippage: ' + _slippage + ' ' + tokenA.symbol);
			console.log(
				'estimate: ' + esitmate + ' ' + tokenA.symbol
			);
			console.log(esitmate);
			console.log(_slippage);*/
			//return await pumpy.swapTokenB({ PUMP: pool.id }, amount, _slippage);
		}
	};

	const sell = async () => {
		console.log('sell');
		let poolId = { PUMP: pool.id };
		if (isTokenA) {
			let _amount = BigInt(amount) * decimals(tokenA.decimals);
			let esitmate = await pumpy.getSwapTokenAEstimate(poolId, _amount);
			let _slippage = esitmate - BigInt(Math.round(getPercentage(slippage.toString(), esitmate.toString())));
			console.log('Swapping');
			console.log(_amount + ' ' + tokenA.symbol + ' for ' + tokenB.symbol);
			console.log('slippage: ' + slippage + '%');
			console.log('slippage: ' + _slippage + ' ' + tokenB.symbol);
			console.log(
				'estimate: ' + esitmate + ' ' + tokenB.symbol
			);
			console.log(esitmate);
			console.log(_slippage);
			//return await pumpy.swapTokenA({ PUMP: pool.id }, amount, _slippage);
		} else {
			let _amount = BigInt(amount) * decimals(tokenB.decimals);
			let esitmate = await pumpy.getSwapTokenBEstimate(poolId, _amount);
			let _slippage = esitmate - BigInt(Math.round(getPercentage(slippage.toString(), esitmate.toString())));
			console.log('Swapping');
			console.log(_amount + ' ' + tokenB.symbol + ' for ' + tokenA.symbol);
			console.log('slippage: ' + slippage + '%');
			console.log('slippage: ' + _slippage + ' ' + tokenA.symbol);
			console.log(
				'estimate: ' + esitmate + ' ' + tokenA.symbol
			);
			console.log(esitmate);
			console.log(_slippage);
			//return await pumpy.swapTokenB({ PUMP: pool.id }, amount, _slippage);
		}
	};

	const toggleToken = async () => {
		isTokenA = !isTokenA;
		console.log('toggleToken');
	};

	const toggleBuy = async () => {
		isTokenA = false;
		isBuy = true;
		console.log('toggleBuy');
	};

	const toggleSell = async () => {
		isTokenA = true;
		isBuy = false;
		console.log('toggleSell');
	};

	const toggleSlippage = async () => {
		dialogOpen = !dialogOpen;
		console.log('toggleSlippage');
	};

	const setSlippage = async () => {
		console.log('slippage');
	};

	const swap = async () => {
		//let result: TokenResult;
		if (isBuy) {
			//result = await buy();
			await buy();
		} else {
			//result = await sell();
			await sell();
		}
		console.log('swap');
	};

	pumpyActor.subscribe((value) => {
		pumpy = value;
	});
</script>

<Card.Root class="space-y-1 min-w-80">
	<Card.Header>
		<div class="flex flex-row gap-2">
			<Button class="w-full" on:click={toggleBuy}>Buy</Button>
			<Button class="w-full" variant="secondary" on:click={toggleSell}>Sell</Button>
		</div>
	</Card.Header>
	<Card.Content>
		<div class="flex flex-col space-y-4">
			{#if isBuy}
				<div class="flex flex-row gap-6">
					{#if isTokenA}
						<Button class="h-6 w-full" on:click={toggleToken}>switch to {tokenB.symbol}</Button>
					{:else}
						<Button class="h-6 w-full" on:click={toggleToken}>switch to {tokenA.symbol}</Button>
					{/if}

					<Button class="h-6" on:click={toggleSlippage}>set max slippage</Button>
				</div>
			{:else}
				<div class="flex flex-row justify-end gap-6">
					<Button class="h-6" on:click={toggleSlippage}>set max slippage</Button>
				</div>
			{/if}
		</div>
	</Card.Content>
	<Card.Footer class="flex flex-col space-y-3">
		<div class="flex flex-row gap-2 w-full">
			<Input type="number" placeholder="0.0" bind:value={amount}></Input>
			<Avatar.Root class="hidden h-9 w-9 sm:flex">
				{#if isTokenA}
					<Avatar.Image src={tokenA.icon} alt="Avatar" />
				{:else}
					<Avatar.Image src={tokenB.icon} alt="Avatar" />
				{/if}
				<Avatar.Fallback>JL</Avatar.Fallback>
			</Avatar.Root>
		</div>
		{#if isBuy}
			{#if !isTokenA}
				<div class="flex flex-row gap-4">
					<Button variant="outline" size="sm">reset</Button>
					<Button variant="outline" size="sm">1 {tokenB.symbol}</Button>
					<Button variant="outline" size="sm">5 {tokenB.symbol}</Button>
					<Button variant="outline" size="sm">10 {tokenB.symbol}</Button>
				</div>
			{/if}
		{:else}
			<div class="flex flex-row gap-4">
				<Button variant="outline" size="sm">reset</Button>
				<Button variant="outline" size="sm">1 {tokenA.symbol}</Button>
				<Button variant="outline" size="sm">5 {tokenA.symbol}</Button>
				<Button variant="outline" size="sm">10 {tokenA.symbol}</Button>
			</div>
		{/if}
		<Button class="w-full" on:click={swap}>place trade</Button>
	</Card.Footer>
</Card.Root>
<div>
	<Dialog.Root bind:open={dialogOpen}>
		<Dialog.Content>
			<Dialog.Header class="space-y-6">
				<Dialog.Title>Set Slippage</Dialog.Title>
				{#if isTokenA}
					<Input
						type="number"
						min="0"
						bind:value={slippage}
						id="token"
						placeholder="{tokenA.symbol} 0.0"
						class="col-span-3"
					/>
				{:else}
					<Input
						type="number"
						min="0"
						bind:value={slippage}
						id="token"
						placeholder="{tokenB.symbol} 0.0"
						class="col-span-3"
					/>
				{/if}
				<Dialog.Description>
					tip: its optional but buying a small amount of tokens helps protect your tokens from
					snipers
				</Dialog.Description>
			</Dialog.Header>
			<Dialog.Footer>
				<Button class="w-full" on:click={setSlippage}>Close</Button>
			</Dialog.Footer>
		</Dialog.Content>
	</Dialog.Root>
</div>
