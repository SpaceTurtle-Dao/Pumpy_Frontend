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
	// @ts-ignore
	import icblast from '@infu/icblast';
	import { onMount } from 'svelte';
	import { pumpy_idlFactory } from '$lib/declarations/pumpy/pumpy.did';
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
		liquidity: string;
	}

	let pumpyCanisterId = '';

	switch (import.meta.env.MODE) {
		case 'development': {
			pumpyCanisterId = 'x2ble-2aaaa-aaaak-qiknq-cai';
			break;
		}
		case 'staging': {
			pumpyCanisterId = 'ucgwg-baaaa-aaaak-qibva-cai';
			break;
		}
		case 'production': {
			pumpyCanisterId = 'yxccl-myaaa-aaaak-qihga-cai';
			break;
		}
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
		//let _id = BigInt(id);
		let ic = icblast();
		let pumpyQuery = await ic(pumpyCanisterId, pumpy_idlFactory);
		console.log(pumpyQuery);
		pool = await pumpyQuery.pumpInfo(id);
		console.log(pool);
		swaps = await pumpyQuery.fetchPumpSwaps(id, 0, 1000);
		console.log(pool);
		tokenA = await pumpyQuery.tokenInfo(pool.pair[0]);
		tokenB = await pumpyQuery.tokenInfo(pool.pair[1]);
		holders = await pumpyQuery.fetchHolders(pool.pair[0], 0, 100);
		if (principal) {
			let balanceRequestA: BalanceRequest = {
				id: pool.pair[0],
				owner: principal.toString()
			};
			let balanceRequestB: BalanceRequest = {
				id: pool.pair[1],
				owner: principal.toString()
			};
			tokenABalance = (
				Number(await pumpyQuery.balance(balanceRequestA)) / decimals(tokenA.decimals)
			).toString();
			tokenBBalance = (
				Number(await pumpyQuery.balance(balanceRequestB)) / decimals(tokenB.decimals)
			).toString();
		} else {
			tokenABalance = '0';
			tokenBBalance = '0';
		}
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
		let marketCap = Number(pool.analytics.marketCap) / decimalsB;
		let volume = Number(pool.analytics.volume) / decimalsB;
		let liquidty = Number(pool.analytics.liquidty) / decimalsB;

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
			liquidity: formatter.format(liquidty)
		};
	};

	principalStore.subscribe((value) => {
		principal = value;
	});

	const decimals = (value: BigInt) => {
		let _decimals = 1;
		for (let i = 0; i < Number(value); i++) {
			_decimals = _decimals * 10;
		}

		return _decimals;
	};

	onMount(async () => {
		setup();
	});
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
				<div class="flex flex-row gap-2">
					<PumpSwap {pool} {tokenA} {tokenB} />
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
								value={analyticsData.liquidity}
							/>
							<AnalyticsProgressCard
								title={'King of the kill progress'}
								value={analyticsData.liquidity}
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
				<Holders {holders} token={tokenA} poolId={pool.id.toString()} />
			</div>
		</div>
	{/if}
</div>
