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
    import { poolInfo } from '$lib/common/swappy.svelte';

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

    // Added this for a cohesive color scheme
    const colors = {
        primary: '#6C5CE7',
        secondary: '#81ECEC',
        background: '#2D3436',
        cardBg: '#353B48',
        text: '#FFFFFF',
        accent: '#FFA502'
    };

</script>


<div class="container mx-auto p-4 bg-gray-900 min-h-screen text-white">
    {#if isLoading}
        <div class="flex justify-center items-center h-screen">
            <MediumSpinner />
        </div>
    {:else}
        <div class="flex flex-col lg:flex-row gap-8">
            <div class="lg:w-2/4 space-y-8">
                <div class="bg-gray-800 rounded-lg shadow-lg p-4">
                    <Chart />
                </div>
                <div class="bg-gray-800 rounded-lg shadow-lg p-4">
                    <Trades {swaps} />
                </div>
                <div class="bg-gray-800 rounded-lg shadow-lg p-4">
                    <Holders {holders} token={{ symbol: 'TOKENA' }} poolId="1" />
                </div>
            </div>

            <div class="lg:w-2/4 space-y-8">
                <div class="bg-gray-800 rounded-lg shadow-lg p-4">
                    <PumpSwap />
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <AnalyticsCard
                        title="Market Cap"
                        value={analyticsData.marketCap}
                        percentage={analyticsData.marketCapPercentage}
                        isUp={analyticsData.isMarketCapUp}
                        class="bg-gray-800 rounded-lg shadow-lg p-4"
                    />
                    <AnalyticsCard
                        title="Volume"
                        value={analyticsData.volume}
                        percentage={analyticsData.volumePercentage}
                        isUp={analyticsData.isVolumeUp}
                        class="bg-gray-800 rounded-lg shadow-lg p-4"
                    />
                    <AnalyticsProgressCard
                        title="Liquidity"
                        value={NumberFormatter(
                            (Number(analyticsData.liquidity) / decimals(BigInt(8))).toString(),
                            3
                        )}
                        class="bg-gray-800 rounded-lg shadow-lg p-4"
                    />
                    <AnalyticsProgressCard
                        title="King of the Hill Progress"
                        value={NumberFormatter(
                            (Number(analyticsData.liquidity) / decimals(BigInt(8))).toString(),
                            3
                        )}
                        class="bg-gray-800 rounded-lg shadow-lg p-4"
                    />
                </div>
                <div class="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <BalanceCard
                        icon="icon-path"
                        title="Token A"
                        value={NumberFormatter(tokenABalance, 3)}
                        class="bg-gray-800 rounded-lg shadow-lg p-4"
                    />
                    <BalanceCard
                        icon="icon-path"
                        title="Token B"
                        value={NumberFormatter(tokenBBalance, 3)}
                        class="bg-gray-800 rounded-lg shadow-lg p-4"
                    />
                    <CreatorCard class="bg-gray-800 rounded-lg shadow-lg p-4" />
                </div>
                <DescriptionCard 
                    title="Token A" 
                    description="TOKENA" 
                    class="bg-gray-800 rounded-lg shadow-lg p-4" 
                />
            </div>
        </div>
    {/if}
</div>