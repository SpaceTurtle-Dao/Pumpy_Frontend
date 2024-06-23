<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import MediumSpinner from '$lib/components/mediumSpinner.svelte';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { toast } from 'svelte-sonner';
	import {
		pumpyActor,
		toastTitleStore,
		toastDescriptionStore,
		toastSuccessStore,
		toastLoadingStore
	} from '$lib/store';
	import SwapToast from './swapToast.svelte';
	import LoaderCircle from 'lucide-svelte/icons/loader-circle';
	import type {
		Pumpy,
		PoolInfo,
		TokenInfo,
		BalanceRequest,
		TokenResult
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
	let isDisabled = false;
	let slippage = 0.1;
	let amount = 0;
	let status = 'Swap';

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

	async function estimateB(amount: bigint) {
		let balanceARequest: BalanceRequest = {
			id: pool.pair[0],
			owner: pool.id.toString()
		};

		let balanceBRequest: BalanceRequest = {
			id: pool.pair[1],
			owner: pool.id.toString()
		};
		let tokenA = await pumpy.balance(balanceARequest);
		let tokenB = await pumpy.balance(balanceBRequest);
		let price = tokenA * tokenB;
		let _tokenA = tokenA + amount;
		let _tokenB = price / _tokenA;
		let _amount = tokenB - _tokenB;
		return _amount;
	}

	async function estimateA(amount: bigint) {
		let balanceARequest: BalanceRequest = {
			id: pool.pair[0],
			owner: pool.id.toString()
		};

		let balanceBRequest: BalanceRequest = {
			id: pool.pair[1],
			owner: pool.id.toString()
		};
		let tokenA = await pumpy.balance(balanceARequest);
		let tokenB = await pumpy.balance(balanceBRequest);
		let price = tokenA * tokenB;
		let _tokenB = tokenB + amount;
		let _tokenA = price / _tokenB;
		let _amount = tokenA - _tokenA;
		return _amount;
	}

	/*function calculatePercentage(x:bigint, y:bigint) {
		return (x / y) * BigInt(100);
	}*/

	const buy = async () => {
		console.log('slippage: ' + slippage);
		let poolId = { PUMP: pool.id };
		let _amount = BigInt(amount) * decimals(tokenB.decimals);
		console.log('Amount: ' + _amount);
		let esitmate = await estimateA(_amount);
		let _slippage =
			esitmate - BigInt(Math.round(getPercentage(slippage.toString(), esitmate.toString())));
		let result = await pumpy.swapTokenB(poolId, _amount, _slippage);
		if ('Ok' in result) {
			toastLoadingStore.set(false);
			toastTitleStore.set('Transaction Confirmed');
			let description =
				'Successfully swapped ' +
				NumberFormatter(amount.toString(), 3) +
				' ' +
				tokenB.symbol.toUpperCase() +
				' for ' +
				NumberFormatter((esitmate / decimals(tokenA.decimals)).toString(), 3) +
				' ' +
				tokenA.symbol.toUpperCase();
			toastSuccessStore.set(true);
			toastDescriptionStore.set(description);
		} else {
			toastLoadingStore.set(false);
			toastSuccessStore.set(false);
		}
		toast(SwapToast);
		console.log(esitmate);
		console.log(_slippage);
		console.log(result);
	};

	const sell = async () => {
		console.log('slippage: ' + slippage);
		let poolId = { PUMP: pool.id };
		let _amount = BigInt(amount) * decimals(tokenA.decimals);
		console.log('Amount: ' + _amount);
		let esitmate = await estimateB(_amount);
		let _slippage =
			esitmate - BigInt(Math.round(getPercentage(slippage.toString(), esitmate.toString())));
		let result: TokenResult = await pumpy.swapTokenA(poolId, _amount, _slippage);
		if ('Ok' in result) {
			toastLoadingStore.set(false);
			toastTitleStore.set('Transaction Confirmed');
			let description =
				'Successfully swapped ' +
				NumberFormatter(amount.toString(), 3) +
				' ' +
				tokenA.symbol.toUpperCase() +
				' for ' +
				NumberFormatter((esitmate / decimals(tokenB.decimals)).toString(), 3) +
				' ' +
				tokenB.symbol.toUpperCase();
			toastSuccessStore.set(true);
			toastDescriptionStore.set(description);
		} else {
			toastLoadingStore.set(false);
			toastSuccessStore.set(false);
		}
		toast(SwapToast);
		console.log(esitmate);
		console.log(_slippage);
		console.log(result);
	};

	/*const toggleToken = async () => {
		isTokenA = !isTokenA;
		console.log('toggleToken');
	};*/

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
		isDisabled = true;
		status = 'Processing';
		toastTitleStore.set('');
		toastDescriptionStore.set('');
		toastTitleStore.set('Processing Swap');
		toastLoadingStore.set(true);
		toast(SwapToast);
		if (isBuy) {
			//result = await buy();
			await buy();
		} else {
			//result = await sell();
			await sell();
		}
		isDisabled = false;
		status = 'Swap';
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
			<div class="flex flex-row justify-end gap-6">
				<Button class="h-6" on:click={toggleSlippage}>set max slippage</Button>
			</div>
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
				<Button variant="outline" size="sm">10m {tokenA.symbol}</Button>
				<Button variant="outline" size="sm">50m {tokenA.symbol}</Button>
				<Button variant="outline" size="sm">100m {tokenA.symbol}</Button>
			</div>
		{/if}
		{#if isDisabled}
			<Button disabled class="w-full" on:click={swap}>
				<div class="flex flex-row gap-2">
					<LoaderCircle class="w-4 animate-spin" />
					<div class="pt-0.5">
						{status}
					</div>
				</div>
			</Button>
		{:else}
			<Button class="w-full" on:click={swap}>{status}</Button>
		{/if}
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
