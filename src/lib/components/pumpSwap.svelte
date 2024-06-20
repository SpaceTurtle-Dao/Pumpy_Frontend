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

	interface AnalyticsData {
		marketCap: string;
		marketCapPercentage: string;
		isMarketCapUp: Boolean;
		volume: string;
		volumePercentage: string;
		isVolumeUp: Boolean;
		liquidy: string;
	}

	let id = $page.params.slug;
	let pumpy: Pumpy;
	let pool: PoolInfo;
	let tokenA: TokenInfo;
	let tokenB: TokenInfo;
	let principal: Principal;
	let isLoading = false;
	let dialogOpen = false;
	let decimalsA = 100000000;
	let decimalsB = 100000000;
	let isTokenA = true;
	let isBuy = true;
	let slippage = BigInt(0);
	let amount = BigInt(0);
	let swaps: Array<Swap> = [];
	let analyticsData: AnalyticsData;

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

	const setup = async () => {
		let _id = BigInt(id);
		let _pool: [] | [PoolInfo] = await pumpy.pumpInfo(_id);
		swaps = await pumpy.fetchPumpSwaps(_id, BigInt(0), BigInt(1000));
		if (_pool.length > 0) {
			pool = _pool[0]!;
			let _tokenA: [] | [TokenInfo] = await pumpy.tokenInfo(BigInt(pool.pair[0]));
			let _tokenB: [] | [TokenInfo] = await pumpy.tokenInfo(BigInt(pool.pair[1]));
			tokenA = _tokenA[0]!;
			tokenB = _tokenB[0]!;
			decimalsA = decimals(tokenA.decimals);
			decimalsB = decimals(tokenB.decimals);
			//transactions = await pumpy.f
			let isVolumeUp: Boolean;
			let isMarketCapUp: Boolean = false;
			if (pool.analytics.volume >= pool.analytics.hourVolume) {
				isVolumeUp = true;
			} else {
				isVolumeUp = false;
			}
			let marketCap = pool.analytics.marketCap / BigInt(decimalsB);
			let volume = pool.analytics.volume / BigInt(decimalsB);
			let liquidty = pool.analytics.liquidty / BigInt(decimalsB);

			analyticsData = {
				marketCap: formatter.format(marketCap),
				marketCapPercentage: '0',
				isMarketCapUp: isMarketCapUp,
				volume: formatter.format(volume),
				volumePercentage: relDiff(
					Number(pool.analytics.volume),
					Number(pool.analytics.hourVolume)
				).toString(),
				isVolumeUp: isVolumeUp,
				liquidy: formatter.format(liquidty)
			};
		}
	};

	pumpyActor.subscribe((value) => {
		pumpy = value;
		setup();
	});

	const decimals = (value: BigInt) => {
		let _decimals = 1;
		for (let i = 0; i < Number(value); i++) {
			_decimals = _decimals * 10;
		}

		return _decimals;
	};

	const buy = async () => {
		console.log('buy');
		if (isTokenA) {
			return await pumpy.swapTokenB({ PUMP: pool.id }, amount, slippage);
		} else {
			return await pumpy.swapTokenA({ PUMP: pool.id }, amount, slippage);
		}
	};

	const sell = async () => {
		console.log('sell');
		if (isTokenA) {
			return await pumpy.swapTokenA({ PUMP: pool.id }, amount, slippage);
		} else {
			return await pumpy.swapTokenB({ PUMP: pool.id }, amount, slippage);
		}
	};

	const toggleToken = async () => {
		isTokenA = !isTokenA;
		console.log('toggle');
	};

	const setSlippage = async () => {
		console.log('slippage');
	};

	const swap = async () => {
		let result: TokenResult;
		if (isBuy) {
			result = await buy();
		} else {
			result = await sell();
		}
		console.log('swap');
	};
</script>

<Card.Root class="space-y-1">
    <Card.Header>
        <div class="flex flex-row gap-2">
            <Button class="w-full" on:click={buy}>Buy</Button>
            <Button class="w-full" variant="secondary" on:click={sell}>Sell</Button>
        </div>
    </Card.Header>
    <Card.Content>
        <div class="flex flex-col space-y-4">
            <div class="flex flex-row justify-between">
                <Button class="h-6 " on:click={toggleToken}>switch to ICP</Button>
                <Button class="h-6" on:click={setSlippage}>set max slippage</Button>
            </div>
        </div>
    </Card.Content>
    <Card.Footer class="flex flex-col space-y-3">
        <div class="flex flex-row gap-2 w-full">
            <Input type="number" placeholder="0.0"></Input>
            <Avatar.Root class="hidden h-9 w-9 sm:flex">
                <Avatar.Image
                    src="https://img.cryptorank.io/coins/internet%20computer1620718852173.png"
                    alt="Avatar"
                />
                <Avatar.Fallback>JL</Avatar.Fallback>
            </Avatar.Root>
        </div>
        <div class="flex flex-row gap-4">
            <Button variant="outline" size="sm">reset</Button>
            <Button variant="outline" size="sm">1 ICP</Button>
            <Button variant="outline" size="sm">5 ICP</Button>
            <Button variant="outline" size="sm">10 ICP</Button>
        </div>
        <Button class="w-full" on:click={swap}>place trade</Button>
    </Card.Footer>
</Card.Root>