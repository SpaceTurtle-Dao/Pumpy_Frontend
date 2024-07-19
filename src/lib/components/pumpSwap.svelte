<script lang="ts">
	import { Button } from '$lib/components/ui/button/index.js';
	import * as Card from '$lib/components/ui/card/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';

	// Mock data for testing
	let pool = {
		id: '1',
		name: 'Test Pool'
	};

	let tokenA = {
		symbol: 'TOKA',
		icon: 'https://example.com/tokenA.png',
		decimals: BigInt(18)
	};

	let tokenB = {
		symbol: 'TOKB',
		icon: 'https://example.com/tokenB.png',
		decimals: BigInt(18)
	};

	let token = tokenA;
	let isLoading = false;
	let dialogOpen = false;
	let isTokenA = false;
	let isBuy = true;
	let slippage = 0.1;
	let amount = 0;

	function getPercentage(percentage: number, totalValue: number) {
		return percentage * totalValue;
	}

	const buy = async () => {
		console.log('Buying', amount, isTokenA ? tokenA.symbol : tokenB.symbol);
		// Implement buy logic here
	};

	const sell = async () => {
		console.log('Selling', amount, isTokenA ? tokenA.symbol : tokenB.symbol);
		// Implement sell logic here
	};

	const toggleToken = () => {
		isTokenA = !isTokenA;
		console.log('Toggled token');
	};

	const toggleBuy = () => {
		isTokenA = false;
		isBuy = true;
		console.log('Switched to Buy');
	};

	const toggleSell = () => {
		isTokenA = true;
		isBuy = false;
		console.log('Switched to Sell');
	};

	const toggleSlippage = () => {
		dialogOpen = !dialogOpen;
		console.log('Toggled slippage dialog');
	};

	const setSlippage = () => {
		console.log('Set slippage to', slippage);
		dialogOpen = false;
	};

	const swap = async () => {
		if (isBuy) {
			await buy();
		} else {
			await sell();
		}
		console.log('Swap executed');
	};
</script>

<Card.Root class="space-y-1 min-w-80">
	<Card.Header>
		<div class="flex flex-row gap-2">
			<Button class="w-full border-white border-1  " on:click={toggleBuy}>Buy</Button>
			<Button class="w-full border-white border-1 hover:border-red-600  " variant="secondary" on:click={toggleSell}>Sell</Button>
		</div>
	</Card.Header>
	<Card.Content>
		<div class="flex flex-col space-y-4">
			{#if isBuy}
				<div class="flex flex-row gap-6">
					<Button class="h-6 w-full" on:click={toggleToken}>
						switch to {isTokenA ? tokenB.symbol : tokenA.symbol}
					</Button>
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
			<Input type="number" placeholder="0.0" bind:value={amount} />
			<Avatar.Root class="hidden h-9 w-9 sm:flex">
				<Avatar.Image src={isTokenA ? tokenA.icon : tokenB.icon} alt="Token Icon" />
				<Avatar.Fallback>T</Avatar.Fallback>
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

<Dialog.Root bind:open={dialogOpen}>
	<Dialog.Content>
		<Dialog.Header class="space-y-6">
			<Dialog.Title>Set Slippage</Dialog.Title>
			<Input
				type="number"
				min="0"
				bind:value={slippage}
				id="slippage"
				placeholder="Slippage %"
				class="col-span-3"
			/>
			<Dialog.Description>
				Tip: Setting a small slippage helps protect your tokens from price fluctuations.
			</Dialog.Description>
		</Dialog.Header>
		<Dialog.Footer>
			<Button class="w-full" on:click={setSlippage}>Set Slippage</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>