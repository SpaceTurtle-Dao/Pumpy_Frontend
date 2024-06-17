<script lang="ts">
	import { onMount } from 'svelte';
	import { Input } from '$lib/components/ui/input/index';
	import { Button } from '$lib/components/ui/button/index.js';
	import {
		ArrowUpDown,
		WalletMinimal,
		Settings2,
		Cog,
		Percent,
		RefreshCw
	} from 'lucide-svelte/icons';
	import SmallSpinner from './smallSpinner.svelte';
	import { PIONEER_ID } from '../common/constants';
	import type { TokenRequest, MintRequest } from '../declarations/pioneer/pioneer.did';
	import {
		fromAmount,
		toAmount,
		deadline,
		fromCurrency,
		isExactIn,
		slippage,
		toCurrency
	} from '../store/swap.store';

	import {
		pioneerActor,
		principalStore,
		loadingStore,
		poolsStore,
		tokensStore,
		balancesStore
	} from '$lib/store/store';
	import type { Pioneer, TokenInfo } from '$lib/api/pioneer.did';
	import type { Principal } from '@dfinity/principal';

	let tokens: Array<TokenInfo> = [];
	let pumpyActor: Pioneer;
	let principal: Principal;

	let _fromAmount;
	let _toAmount;
	let _deadline;
	let _toCurrency: TokenInfo;
	let _fromCurrency: TokenInfo;
	let _isExactIn;
	let _slippage;

	pioneerActor.subscribe((p) => {
		pumpyActor = p;
	});
	tokensStore.subscribe((t) => {
		tokens = t;
		if (_fromCurrency === undefined && tokens.length > 0) {
			_fromCurrency = tokens[0] ?? {};
		}
		if (_toCurrency === undefined) {
			_toCurrency = tokens[1] ?? {};
		}
	});
	principalStore.subscribe((p) => {
		principal = p;
	});

	fromAmount.subscribe((a) => {
		_fromAmount = a;
	});
	toAmount.subscribe((a) => {
		_toAmount = a;
	});
	deadline.subscribe((d) => {
		_deadline = d;
	});
	slippage.subscribe((s) => {
		_slippage = s;
	});
	isExactIn.subscribe((e) => {
		_isExactIn = e;
	});
	fromCurrency.subscribe((c) => {
		_fromCurrency = c!;
	});
	toCurrency.subscribe((c) => {
		_toCurrency = c!;
	});

	function mint() {
		pumpyActor.mint([
			{
				id: BigInt(0),
				to: principal.toString(),
				amount: BigInt(1000)
			}
		]);
	}

	function reverseuno() {}
	function setSlippage() {}

	function createCoin(): void {
		let tokenReq = {
			decimals: BigInt(8),
			tribute: 'sid',
			icon: '',
			name: 'Mango Coin',
			minter: '',
			symbol: 'MNGO'
		};
		let mintReq = {
			id: BigInt(0),
			to: '',
			amount: BigInt(2100000000)
		};
		pioneerActor.subscribe((p) => {
			var res = p.createTokens(tokenReq, [mintReq]);
			console.log(res);
			return res;
		});
	}
</script>

`
<div class="min-h-screen flex flex-col justify-center items-center">
	<div class="w-120 bg-surface-700 rounded-lg p-9 shadow-lg">
		<div class="flex justify-end mb-4">
			<Button
				variant="outline"
				class="h-7 w-9 border-none hover:border-input text-primary-700 bg-transparent hover:text-primary-50 0 text-xs"
				size="icon"
			>
				<RefreshCw class="h-5 w-5" />
			</Button>
			<Button
				variant="outline"
				class="h-7 w-9 border-none hover:border-input text-primary-700 bg-transparent hover:text-primary-50 0 text-xs"
				size="icon"
			>
				<Percent class="h-5 w-5" />
			</Button>
			<Button
				variant="outline"
				class="h-7 w-9 border-none hover:border-input text-primary-700 bg-transparent hover:text-primary-50 0 text-xs"
				size="icon"
			>
				<Settings2 class="h-5 w-5" />
			</Button>
		</div>

		<div class="mb-4">
			<div class="flex justify-between items-center mb-2">
				<label class="block mb-2 text-sm">You're paying</label>
				<div class="flex space-x-2">
					<WalletMinimal class="my-1 h-4 w-4" />
					<span class="text-sm my-1 h-6 text-xs">{100.0} {'ICP'}</span>
					<Button
						variant="outline"
						class="h-6 w-10 border-none hover:border-input bg-transparent hover:bg-secondary-600 text-xs"
						size="icon"
					>
						HALF
					</Button>
					<Button
						variant="outline"
						class="mx-5 my-0 h-6 w-9 border-none hover:border-input bg-transparent hover:bg-secondary-600 text-xs"
						size="icon"
					>
						MAX
					</Button>
				</div>
			</div>
			<div class="flex items-center bg-secondary-700 rounded-xl p-3 space-x-2 w-full max-w-lg">
				<div
					class="relative flex items-center bg-transparent hover:bg-secondary-600 text-primary-300 rounded-full px-2 py-1"
				>
					<img
						src={_fromCurrency?.icon ?? ''}
						alt={_fromCurrency?.name ?? ''}
						class="w-6 h-6 mr-2"
					/>
					<span class="text-lg">{_fromCurrency?.symbol ?? ''}</span>
					<select
						class="absolute inset-0 opacity-0 w-full cursor-pointer text-md"
						on:change={(e) => console.log(e)}
					>
						{#each tokens as token}
							<option value={token.symbol} selected={token.symbol === ''}>{token.symbol}</option>
						{/each}
					</select>
				</div>
				<Input
					class="input text-primary-100 text-right text-xl flex-1 focus:border-0 border-0 focus-visible:ring-offset-0"
					type="text"
					placeholder="0.00"
				/>
			</div>
		</div>

		<div class="flex justify-center mb-2 text-primary-700 hover:text-primary-300">
			<Button
				variant="outline"
				class="h-6 w-8 border-none hover:border bg-transparent hover:bg-secondary-600 text-primary-300"
				size="icon"
			>
				<ArrowUpDown class="h-4 w-4" />
			</Button>
		</div>

		<div class="mb-4">
			<label class="block mb-2 text-sm">To receive</label>
			<div class="flex items-center bg-secondary-700 rounded-xl p-3 space-x-2 w-full max-w-lg">
				<div
					class="relative flex items-center bg-transparent hover:bg-secondary-600 text-primary-300 rounded-full px-2 py-1"
				>
					<img src={_toCurrency?.icon ?? ''} alt={_toCurrency?.name ?? ''} class="w-6 h-6 mr-2" />
					<span class="text-lg">{_toCurrency?.symbol ?? ''}</span>
					<select
						class="absolute inset-0 opacity-0 w-full cursor-pointer text-md"
						on:change={(e) => console.log(e)}
					>
						{#each tokens as token}
							<option value={token.symbol} selected={token.symbol === ''}>{token.symbol}</option>
						{/each}
					</select>
				</div>
				<Input
					class="input text-primary-100 text-right text-xl flex-1 focus:border-0 border-0 focus-visible:ring-offset-0"
					type="text"
					placeholder="0.00"
				/>
			</div>
		</div>

		<div class="py-2">
			<Button
				class="w-full py-2 bg-tertiary-500 rounded hover:bg-tertiary-600 text-surface-700"
				on:click={() => {}}
			>
				SWAP
			</Button>
		</div>
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
	@import 'https://fonts.googleapis.com/icon?family=Material+Icons';

	.rounded-xl {
		border-radius: 12px;
	}
	.rounded-full {
		border-radius: 9999px;
	}
</style>
