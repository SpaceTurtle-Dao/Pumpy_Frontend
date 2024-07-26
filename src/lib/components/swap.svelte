<script lang="ts">
	import { onMount } from 'svelte';
	import { Input } from '$lib/components/ui/input/swap_index';
	import { Button } from '$lib/components/ui/button/index.js';
	import {
		ArrowUpDown,
		WalletMinimal,
		Settings2,
		Cog,
		Percent,
		RefreshCw
	} from 'lucide-svelte/icons';
	import { toast } from 'svelte-sonner';
	import SmallSpinner from './smallSpinner.svelte';
	import { loadingStore, poolsStore } from '$lib/store/store';
	import type { Principal } from '@dfinity/principal';
	import * as Card from '$lib/components/ui/card/index.js';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { ChevronDown, Settings, RotateCw } from 'lucide-svelte';
	import { Separator } from '$lib/components/ui/separator';

	interface TokenInfo {
		ticker: string;
		name: string;
		logo: string;
		process: string;
	}

	let luna = {
		ticker: 'LUNA',
		name: 'Luna',
		process: '',
		logo: 'https://www.arweave.net/3ieM_AKlOihVmb5LZ_mhQQNH0Sw2XaRkZuKrsiGzRUc?ext=png'
	};

	let sunny = {
		ticker: 'SUN',
		name: 'Sunny',
		process: '',
		logo: 'https://www.arweave.net/CzrOUcB73-A0stPGIQf38mCQbXTnpflec0UVb8RZsxY?ext=png'
	};

	let tokens: Array<TokenInfo> = [luna, sunny];
	//let pumpy: Pumpy;
	let principal: Principal;

	let _fromAmount;
	let _toAmount;
	let _deadline;
	let _toCurrency: TokenInfo = sunny;
	let _fromCurrency: TokenInfo = luna;
	let _isExactIn;
	let _slippage;
</script>

<div class="py-24 w-full flex flex-col justify-center items-center">
	<div>
		<div class="flex flex-row justify-between pb-4">
			<Button
				variant="outline"
				class="h-7 w-7 border-none rounded-full hover:border-input  bg-background-400 hover:text-primary-400 0 text-xs "
				size="icon"
			>
				<RotateCw class="h-4 w-4" />
			</Button>
			<div>
				<Button
					variant="outline"
					class="h-7 border-none rounded-full hover:border-input  hover:text-primary-400 bg-background-400 text-xs"
				>
					<div class="flex flex-row space-x-1">
						<Settings2 class="h-4 w-4" />
						<p>Max: 3%</p>
					</div>
				</Button>
				<Button
					variant="outline"
					class="h-7 w-7 border-none rounded-full hover:border-input hover:text-primary-400 bg-background-400 text-xs"
					size="icon"
				>
					<Settings class="h-4 w-4" />
				</Button>
			</div>
		</div>
		<Card.Root class="bg-background-500 px-5 py-7 shadow-lg border-none">
			<div class="mb-4">
				<div class="flex justify-between items-center mb-2">
					<label for="sell" class="block mb-2 text-lg text-background-200">Sell</label>
					<div class="flex space-x-2">
						<WalletMinimal class="my-1 h-4 w-4 text-background-300" />
						<span class="my-1 h-6 text-xs text-background-200">{100.0} {'AO'}</span>
						<Button
							variant="outline"
							class="h-6 px-6 py-1 border-background-300 hover:border-primary-400 bg-background-500 hover:bg-background-500 text-xs text-background-200 hover:text-primary-400"
							size="icon"
						>
							<p>HALF</p>
						</Button>
						<Button
							variant="outline"
							class="h-6 px-6 py-1 border-background-300 hover:border-primary-400 bg-background-500 hover:bg-background-500 text-xs text-background-200 hover:text-primary-400"
							size="icon"
						>
							<p>MAX</p>
						</Button>
					</div>
				</div>
				<div
					class="flex items-center bg-background-700 rounded-xl pl-4 py-4 space-x-2 w-full max-w-lg"
				>
					{#if tokens !== undefined && tokens.length > 0}
						<div
							class="group space-x-2.5 border border-transparent relative flex items-center bg-background-400 hover:bg-backgrond-800 hover:border-primary-500 hover:shadow-md hover:shadow-primary-500 rounded-lg px-2.5 py-1.5"
						>
							<!-- <img src={_fromCurrency.icon} alt={_fromCurrency.ticker} class="w-6 h-6 mr-2" /> -->

							<Avatar.Root class="size-6">
								<Avatar.Image src={_fromCurrency.logo} alt={_fromCurrency.ticker} />
								<Avatar.Fallback>CN</Avatar.Fallback>
							</Avatar.Root>
							<span class="text-sm font-bold text-border-500">{_fromCurrency.ticker}</span>
							<select
								class="absolute inset-0 opacity-0 w-full cursor-pointer text-md"
								on:change={(e) => console.log(e)}
							>
								{#each tokens as token}
									<option value={token.ticker} selected={token.ticker === ''}>{token.ticker}</option
									>
								{/each}
							</select>
							<div>
								<ChevronDown size="15" class="group-hover:text-primary-500 text-border-500" />
							</div>
						</div>
					{:else}
						<div class="w-16 h-9 relative bg-background-400 rounded-full px-2 py-1"></div>
					{/if}
					<Input
						id="paying"
						class="text-white text-right text-xl flex-1 focus:border-0 border-0 focus-visible:ring-offset-0"
						type="text"
						placeholder="0.00"
					/>
				</div>
			</div>

			<div
				class="flex flex-row justify-center items-center mb-2 px-5 text-primary-700 hover:text-primary-300"
			>
				<Separator class="bg-background-800 basis-1/2" />
				<Button
					variant="outline"
					class="border-background-800 rounded-full  hover:border bg-transparent hover:border-primary-500 hover:shadow-primary-500 hover:text-primary-500 text-white"
					size="icon"
				>
					<ArrowUpDown class=" h-4 w-10" />
				</Button>
				<Separator class="bg-background-800 basis-1/2" />
			</div>

			<div class="mb-4">
				<label for="buy" class="block mb-2 text-base text-background-200">Buy</label>
				<div
					class="flex items-center bg-background-700 rounded-xl pl-3 py-4 space-x-2 w-full max-w-lg"
				>
					{#if tokens !== undefined && tokens.length > 0}
						<div
							class="group space-x-2.5 border border-transparent relative flex items-center bg-background-400 hover:bg-backgrond-800 hover:border-primary-500 hover:shadow hover:shadow-primary-500 rounded-lg px-2.5 py-1.5"
						>
							<Avatar.Root class="size-7">
								<Avatar.Image src={_toCurrency.logo} alt={_toCurrency.ticker} />
								<Avatar.Fallback>CN</Avatar.Fallback>
							</Avatar.Root>
							<!-- <img src={_toCurrency?.icon ?? ''} alt={_toCurrency?.name ?? ''} class="w-6 h-6 mr-2" /> -->
							<span class="text-sm font-bold text-border-500">{_toCurrency?.ticker ?? ''}</span>
							<select
								class="absolute inset-0 opacity-0 w-full cursor-pointer text-md"
								on:change={(e) => console.log(e)}
							>
								{#each tokens as token}
									<option value={token.ticker} selected={token.ticker === ''}>{token.ticker}</option
									>
								{/each}
							</select>
							<div>
								<ChevronDown size="15" class="group-hover:text-primary-500 text-border-500" />
							</div>
						</div>
					{:else}
						<div class="w-16 h-9 relative bg-background-400 rounded-full px-2 py-1"></div>
					{/if}
					<Input
						class="text-white text-right text-xl flex-1 focus:border-0 border-0 focus-visible:ring-offset-0"
						type="text"
						placeholder="0.00"
					/>
				</div>
			</div>

			<div class="py-2">
				<Button
					class="w-full h-16 py-2 bg-background-700 rounded-lg hover:bg-tertiary-600 text-surface-700"
					on:click={() => toast('Hello world')}
				>
					SWAP
				</Button>
			</div>
		</Card.Root>
	</div>

	<!-- <div class="mt-6 w-96 text-textSecondary">
		<div class="flex items-center justify-between">
			<div class="flex items-center space-x-2">
				<img src={tokens[0].logo} alt="USDC" class="w-6 h-6" />
				<div>
					<p>USDC</p>
					<p class="text-xs">USD Coin</p>
				</div>
			</div>
			<div class="flex items-center space-x-2">
				<p>1</p>
				<p class="text-green-500">0%</p>
			</div>
		</div>
		<div class="flex items-center justify-between mt-2">
			<div class="flex items-center space-x-2">
				<img src={tokens[1].logo} alt="Mail" class="w-6 h-6" />
				<div>
					<p>Mail</p>
					<p class="text-xs">SolMail</p>
				</div>
			</div>
			<div class="flex items-center space-x-2">
				<p>N/A</p>
				<p class="text-red-500">-7.17%</p>
			</div>
		</div>
	</div> -->
</div>

<style>
</style>
