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

<Card.Root class="space-y-4 min-w-80 bg-[#1a1b2e] border border-[#2e3258] rounded-lg shadow-lg">
	<Card.Header class="pb-2">
		<div class="flex flex-row gap-2">
			<Button 
				class="w-full text-white bg-[#3d4279] hover:bg-[#4d5299] transition-colors duration-200" 
				variant={isBuy ? "default" : "outline"}
				on:click={toggleBuy}
			>
				Buy
			</Button>
			<Button 
				class="w-full text-white bg-[#3d4279] hover:bg-[#4d5299] transition-colors duration-200" 
				variant={!isBuy ? "default" : "outline"}
				on:click={toggleSell}
			>
				Sell
			</Button>
		</div>
	</Card.Header>
	<Card.Content class="space-y-4">
		<div class="flex flex-col space-y-4">
			{#if isBuy}
				<div class="flex flex-row gap-2 justify-between">
					<Button class="h-8 text-sm bg-[#252849] hover:bg-[#3d4279] text-[#8e92b2] hover:text-white transition-colors duration-200" on:click={toggleToken}>
						Switch to {isTokenA ? tokenB.symbol : tokenA.symbol}
					</Button>
					<Button class="h-8 text-sm bg-[#252849] hover:bg-[#3d4279] text-[#8e92b2] hover:text-white transition-colors duration-200" on:click={toggleSlippage}>Set max slippage</Button>
				</div>
			{:else}
				<div class="flex flex-row justify-end">
					<Button class="h-8 text-sm bg-[#252849] hover:bg-[#3d4279] text-[#8e92b2] hover:text-white transition-colors duration-200" on:click={toggleSlippage}>Set max slippage</Button>
				</div>
			{/if}
		</div>
		<div class="flex flex-row gap-2 w-full">
			<Input type="number" placeholder="0.0" bind:value={amount} class="bg-[#252849] text-white border-[#3d4279] focus:border-[#4d5299] rounded-md" />
			<Avatar.Root class="h-10 w-10 flex">
				<Avatar.Image src={isTokenA ? tokenA.icon : tokenB.icon} alt="Token Icon" />
				<Avatar.Fallback class="bg-[#3d4279] text-white">{isTokenA ? tokenA.symbol[0] : tokenB.symbol[0]}</Avatar.Fallback>
			</Avatar.Root>
		</div>
	</Card.Content>
	<Card.Footer class="flex flex-col space-y-4 pt-2">
		{#if isBuy}
			{#if !isTokenA}
				<div class="flex flex-row gap-2 justify-between">
					<Button variant="outline" size="sm" class="flex-1 bg-[#252849] text-[#8e92b2] hover:bg-[#3d4279] hover:text-white border-[#3d4279] transition-colors duration-200">Reset</Button>
					<Button variant="outline" size="sm" class="flex-1 bg-[#252849] text-[#8e92b2] hover:bg-[#3d4279] hover:text-white border-[#3d4279] transition-colors duration-200">1 {tokenB.symbol}</Button>
					<Button variant="outline" size="sm" class="flex-1 bg-[#252849] text-[#8e92b2] hover:bg-[#3d4279] hover:text-white border-[#3d4279] transition-colors duration-200">5 {tokenB.symbol}</Button>
					<Button variant="outline" size="sm" class="flex-1 bg-[#252849] text-[#8e92b2] hover:bg-[#3d4279] hover:text-white border-[#3d4279] transition-colors duration-200">10 {tokenB.symbol}</Button>
				</div>
			{/if}
		{:else}
			<div class="flex flex-row gap-2 justify-between">
				<Button variant="outline" size="sm" class="flex-1 bg-[#252849] text-[#8e92b2] hover:bg-[#3d4279] hover:text-white border-[#3d4279] transition-colors duration-200">Reset</Button>
				<Button variant="outline" size="sm" class="flex-1 bg-[#252849] text-[#8e92b2] hover:bg-[#3d4279] hover:text-white border-[#3d4279] transition-colors duration-200">1 {tokenA.symbol}</Button>
				<Button variant="outline" size="sm" class="flex-1 bg-[#252849] text-[#8e92b2] hover:bg-[#3d4279] hover:text-white border-[#3d4279] transition-colors duration-200">5 {tokenA.symbol}</Button>
				<Button variant="outline" size="sm" class="flex-1 bg-[#252849] text-[#8e92b2] hover:bg-[#3d4279] hover:text-white border-[#3d4279] transition-colors duration-200">10 {tokenA.symbol}</Button>
			</div>
		{/if}
		<Button class="w-full bg-[#3d4279] hover:bg-[#4d5299] text-white transition-colors duration-200" on:click={swap}>Place Trade</Button>
	</Card.Footer>
</Card.Root>

<Dialog.Root bind:open={dialogOpen}>
	<Dialog.Content class="bg-[#1a1b2e] border border-[#2e3258] rounded-lg">
		<Dialog.Header class="space-y-6">
			<Dialog.Title class="text-white text-xl font-semibold">Set Slippage</Dialog.Title>
			<Input
				type="number"
				min="0"
				bind:value={slippage}
				id="slippage"
				placeholder="Slippage %"
				class="col-span-3 bg-[#252849] text-white border-[#3d4279] focus:border-[#4d5299] rounded-md"
			/>
			<Dialog.Description class="text-[#8e92b2]">
				Tip: Setting a small slippage helps protect your tokens from price fluctuations.
			</Dialog.Description>
		</Dialog.Header>
		<Dialog.Footer>
			<Button class="w-full bg-[#3d4279] hover:bg-[#4d5299] text-white transition-colors duration-200" on:click={setSlippage}>Set Slippage</Button>
		</Dialog.Footer>
	</Dialog.Content>
</Dialog.Root>