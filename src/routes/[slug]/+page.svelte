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
	// import SocialIcons from '@rodneylab/svelte-social-icons';
	import * as Avatar from '$lib/components/ui/avatar/index.js';
	import { ChevronDown, ChevronUp } from 'lucide-svelte';
	import MediumSpinner from '$lib/components/mediumSpinner.svelte';
	import { onMount } from 'svelte';
	import PumpSwap from '$lib/components/pumpSwap.svelte';
	import AnalyticsCard from '$lib/components/analyticsCard.svelte';
	import CreatorCard from '$lib/components/creatorCard.svelte';
	import BalanceCard from '$lib/components/BalanceCard.svelte';
	import AnalyticsProgressCard from '$lib/components/analyticsProgressCard.svelte';
	import DescriptionCard from '$lib/components/descriptionCard.svelte';
	import { poolInfo } from '$lib/common/swappy';

	interface AnalyticsData {
		marketCap: string;
		marketCapPercentage: string;
		isMarketCapUp: boolean;
		volume: string;
		volumePercentage: string;
		isVolumeUp: boolean;
		liquidy: string;
	}

	let pumpyCanisterId = 'dummy-canister-id';

	let id = $page.params.slug;
	let isLoading = false;
	let dialogOpen = false;
	let decimalsA = 100000000;
	let decimalsB = 100000000;
	let isTokenA = true;
	let isBuy = true;
	let slippage = BigInt(0);
	let amount = BigInt(0);
	let swaps: any[] = [1, 2, 3, 4];
	let analyticsData: AnalyticsData = {
		marketCap: '$1,000,000',
		marketCapPercentage: '5%',
		isMarketCapUp: true,
		volume: '$500,000',
		volumePercentage: '2%',
		isVolumeUp: true,
		liquidy: '$200,000',
	};
	let tokenABalance = '1000';
	let tokenBBalance = '2000';
	let holders: Array<[string, bigint]> = [['0x123', BigInt(100)], ['0x456', BigInt(200)]];

	const formatter = new Intl.NumberFormat('en-US', {
		style: 'currency',
		currency: 'USD'
	});

	function relDiff(a: number, b: number) {
		return 100 * Math.abs((a - b) / ((a + b) / 2));
	}

	const NumberFormatter = (value: string, decimal: number) => {
		return parseFloat(parseFloat(value).toFixed(decimal)).toLocaleString('en', {
			useGrouping: true
		});
	};

	const decimals = (value: BigInt) => {
		let _decimals = 1;
		for (let i = 0; i < Number(value); i++) {
			_decimals = _decimals * 10;
		}

		return _decimals;
	};

		
	onMount(async () => {
		// Any initialization code here
		const pool = await poolInfo("SBCCXwwecBlDqRLUjb8dYABExTJXLieawf7m2aBJ-KY");
		
	});
</script>

<div class="w-full">
	<!-- {#if analyticsData == undefined}
		<div class="flex justify-center">
			<MediumSpinner />
		</div>
	{:else} -->
		<div class="flex flex-row gap-4">
			<div class="basis-1/2 space-y-4">
				<Chart />

				<Trades />
			</div>

			<div class="basis-1/2 space-y-4">
				<div class="flex flex-row gap-2">
					<PumpSwap  />
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
									(Number(1000000) / decimals(BigInt(8))).toString(),
									3
								)}
							/>
							<AnalyticsProgressCard
								title={'King of the kill progress'}
								value={NumberFormatter(
									(Number(1000000) / decimals(BigInt(8))).toString(),
									3
								)}
							/>
						</div>
					</div>
				</div>

				<div class="flex flex-row gap-4">
					<div class="basis-1/3">
						<BalanceCard
							icon={'icon-path'}
							title={'Token A'}
							value={NumberFormatter(tokenABalance, 3)}
						/>
					</div>
					<div class="basis-1/3">
						<BalanceCard
							icon={'icon-path'}
							title={'Token B'}
							value={NumberFormatter(tokenBBalance, 3)}
						/>
					</div>
					<div class="basis-1/3">
						<CreatorCard />
					</div>
				</div>
				<DescriptionCard title={'Token A'} description={'TOKENA'} />
				<Holders {holders} token={{ symbol: 'TOKENA' }} poolId={'1'} />
			</div>
		</div>
	<!-- {/if} -->
</div>
<Footer />
<!-- <SocialIcons /> -->
