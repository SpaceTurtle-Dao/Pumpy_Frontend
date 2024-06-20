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

<Card.Root
	data-x-chunk-name="dashboard-07-chunk-5"
	data-x-chunk-description="A card with a call to action to archive the product"
>
	<Card.Header>
		<Card.Title>Luna</Card.Title>
	</Card.Header>
	<Card.Content class="flex flex-col justify-center space-y-6">
		<Card.Description>
			Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut
			labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco
			laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in
			voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat
			non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
		</Card.Description>
	</Card.Content>
	<Card.Footer class="flex justify-center">
		<div class="flex flex-row gap-6">
			<Button size="icon" class="bg-transparent rounded-full ">
				<SocialIcons
					alt=""
					network="twitter"
					fgColor="#eeeeee"
					bgColor="#111111"
					width="35"
					height="35"
				/>
			</Button>
			<Button size="icon" class="bg-transparent rounded-full">
				<SocialIcons
					alt=""
					network="discord"
					fgColor="#eeeeee"
					bgColor="#111111"
					width="35"
					height="35"
				/>
			</Button>
			<Button size="icon" class="bg-transparent rounded-full">
				<SocialIcons
					alt=""
					network="telegram"
					fgColor="#eeeeee"
					bgColor="#111111"
					width="35"
					height="35"
				/>
			</Button>
		</div>
	</Card.Footer>
</Card.Root>
