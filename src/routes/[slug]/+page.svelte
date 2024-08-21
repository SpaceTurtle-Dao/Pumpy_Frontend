<script lang="ts">
    //@ts-nocheck
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
        liquidity: string;
    }

    let pumpyCanisterId = 'dummy-canister-id';
    let id = $page.params.slug;
    let isLoading = true;
    let dialogOpen = false;
    let decimalsA = 100000000;
    let decimalsB = 100000000;
    let isTokenA = true;
    let isBuy = true;
    let slippage = BigInt(0);
    let amount = BigInt(0);
    let swaps: any[] = [];
    let analyticsData: AnalyticsData = {
        marketCap: '',
        marketCapPercentage: '',
        isMarketCapUp: false,
        volume: '',
        volumePercentage: '',
        isVolumeUp: false,
        liquidity: ''
    };
    let tokenABalance = '';
    let tokenBBalance = '';
    let holders: Array<[string, bigint]> = [];

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
        return Math.pow(10, Number(value));
    };

	const pooling = async (e)=>{
		const cool =  poolInfo("0W4oIx8rsCbejTcQJ2c7mSYj3zdFTEFrmNsFBHpuPE0");
		console.log("cool");
		console.log("cool" + cool?.JSON.stringify());

	}
    onMount(async () => {
        try {
            const pool = await poolInfo(id);
			console.log("pool");
			console.log("pool" + pool?.JSON.stringify());
			

            // Assuming the response structure
            if (pool) {
                analyticsData = {
                    marketCap: formatter.format(pool.marketCap),
                    marketCapPercentage: `${pool.marketCapPercentage}%`,
                    isMarketCapUp: pool.isMarketCapUp,
                    volume: formatter.format(pool.volume),
                    volumePercentage: `${pool.volumePercentage}%`,
                    isVolumeUp: pool.isVolumeUp,
                    liquidity: formatter.format(pool.liquidity)
                };

                tokenABalance = pool.tokenABalance;
                tokenBBalance = pool.tokenBBalance;
                holders = pool.holders;
                swaps = pool.swaps;
           asdfajsdf
        AlarmSmoke;dfjas; }
        } catch (error) {
            console.error('Error fetching pool info:', error);
        } finally {
            isLoading = false;
			// console.log(pool);
			
        }	
    });
</script>

<div class="sm:w-[109%] w-full text-white  p-3" >
    <!-- {#if isLoading}
        <div class="flex justify-center">
            <MediumSpinner />
        </div>
    {:else} -->
        <div class="flex sm:flex-row flex-col gap-5  ">
            <div class=" sm:space-y-4 ">
                <Chart />
                <Trades {swaps} />
            </div>

        
            <div class="basis-1/2 space-y-4">
                <div class="flex sm:flex-row flex-col gap-4">
                    <PumpSwap />
                    <div class="space-y-4">
                        <div class="flex flex-row gap-4">
                            <AnalyticsCard
                                title={'Market Cap'}
                                value={analyticsData.marketCap}
                                percentage={analyticsData.marketCapPercentage}
                                isUp={analyticsData.isMarketCapUp}
                                class="text-white"
                            />
                            <AnalyticsCard
                                title={'Volume'}
                                value={analyticsData.volume}
                                percentage={analyticsData.volumePercentage}
                                isUp={analyticsData.isVolumeUp}
                                class="text-white"
                            />
                        </div>
                        <div class="flex flex-row gap-4">
                            <AnalyticsProgressCard
                                title={'Liquidity'}
                                value={NumberFormatter(
                                    (Number(analyticsData.liquidity) / decimals(BigInt(8))).toString(),
                                    3
                                )}
                                class="text-white"
                            />
                            <AnalyticsProgressCard
                                title={'King of the kill progress'}
                                value={NumberFormatter(
                                    (Number(analyticsData.liquidity) / decimals(BigInt(8))).toString(),
                                    3
                                )}
                                class="text-white"
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
                            class="text-white"
                        />
                    </div>
                    <div class="basis-1/3">
                        <BalanceCard
                            icon={'icon-path'}
                            title={'Token B'}
                            value={NumberFormatter(tokenBBalance, 3)}
                            class="text-white"
                        />
                    </div>
                    <div class="basis-1/3">
                        <CreatorCard class="text-white" />
                    </div>
                </div>
                <DescriptionCard title={'Token A'} description={'TOKENA'} class="text-white" />
                <Holders {holders} token={{ symbol: 'TOKENA' }} poolId={'1'} class="text-white" />
            </div>
        </div>
    <!-- {/if} -->
</div>
<Footer class="w-screen h-screen" />
