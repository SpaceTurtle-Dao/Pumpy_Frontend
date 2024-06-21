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
		Swap,
		BalanceRequest
	} from '$lib/declarations/pumpy/pumpy.did';
	import PumpSwap from '$lib/components/pumpSwap.svelte';
	import AnalyticsCard from '$lib/components/analyticsCard.svelte';
	import CreatorCard from '$lib/components/creatorCard.svelte';
	import BalanceCard from '$lib/components/BalanceCard.svelte';
	import AnalyticsProgressCard from '$lib/components/analyticsProgressCard.svelte';
	import DescriptionCard from '$lib/components/descriptionCard.svelte';

	interface AnalyticsData {
		marketCap: string;
		marketCapPercentage: string;
		isMarketCapUp: boolean;
		volume: string;
		volumePercentage: string;
		isVolumeUp: boolean;
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
	let tokenABalance: string;
	let tokenBBalance: string;
	let holders: Array<[string, bigint]> = [];

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
			holders = await pumpy.fetchHolders(BigInt(pool.pair[0]), BigInt(0), BigInt(100));
			tokenA = _tokenA[0]!;
			tokenB = _tokenB[0]!;
			let balanceRequestA: BalanceRequest = {
				id: pool.pair[0],
				owner: principal.toString()
			};
			let balanceRequestB: BalanceRequest = {
				id: pool.pair[1],
				owner: principal.toString()
			};
			tokenABalance = (
				Number(await pumpy.balance(balanceRequestA)) / decimals(tokenA.decimals)
			).toString();
			tokenBBalance = (
				Number(await pumpy.balance(balanceRequestB)) / decimals(tokenB.decimals)
			).toString();
			decimalsA = decimals(tokenA.decimals);
			decimalsB = decimals(tokenB.decimals);
			//transactions = await pumpy.f
			let isVolumeUp: boolean;
			let isMarketCapUp: boolean = false;
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

	principalStore.subscribe((value) => {
		principal = value;
	});

	pumpyActor.subscribe((value) => {
		console.log("boom")
		pumpy = value;
		setup();
		console.log("stick")
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

<div class="w-full">
	{#if analyticsData == undefined}
		<div class="flex justify-center">
			<MediumSpinner />
		</div>
	{:else}
	<div class="flex flex-row gap-4">
		<div class="basis-1/2 space-y-4">
			<Chart />
			<Trades {swaps} tokenA={pool.tokenA} tokenB={pool.tokenB} />
		</div>
		<div class="basis-1/2 space-y-4">
			<div class="flex flex-row gap-4">
				<PumpSwap {pumpy} {pool} {tokenA} {tokenB} />
				<div class="space-y-4">
					<div class="flex flex-row gap-4">
						<AnalyticsCard
							title={'Market Cap'}
							value={analyticsData.marketCap}
							percentage={analyticsData.marketCapPercentage}
							isUp={analyticsData.isMarketCapUp}
						/>
						<AnalyticsCard
							title={'Volume'}
							value={analyticsData.volume}
							percentage={analyticsData.volumePercentage}
							isUp={analyticsData.isVolumeUp}
						/>
					</div>
					<div class="flex flex-row gap-4">
						<AnalyticsProgressCard
							title={'Liquidity'}
							value={NumberFormatter(
								(Number(pool.tokenA.supply) / decimals(pool.tokenA.decimals)).toString(),
								3
							)}
						/>
						<AnalyticsProgressCard
							title={'King of the kill progress'}
							value={NumberFormatter(
								(Number(pool.tokenA.supply) / decimals(pool.tokenA.decimals)).toString(),
								3
							)}
						/>
					</div>
				</div>
			</div>

			<div class="flex flex-row gap-4">
				<div class="basis-1/3">
					<BalanceCard
						icon={tokenA.icon}
						title={tokenA.name}
						value={NumberFormatter(tokenABalance, 3)}
					/>
				</div>
				<div class="basis-1/3">
					<BalanceCard
						icon={tokenB.icon}
						title={tokenB.name}
						value={NumberFormatter(tokenBBalance, 3)}
					/>
				</div>
				<div class="basis-1/3">
					<CreatorCard />
				</div>
			</div>
			<DescriptionCard title={tokenA.name} description={tokenA.description} />
			<Holders {holders} token={tokenA} poolId={pool.id.toString()}/>
		</div>
	</div>
	{/if}
	
</div>
