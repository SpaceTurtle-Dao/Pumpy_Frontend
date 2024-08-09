<script lang="ts">
  import { onMount } from 'svelte';
  import { toast } from 'svelte-sonner';
  import { Input } from '$lib/components/ui/input/swap_index';
  import { Button } from '$lib/components/ui/button/index.js';
  import { ArrowUpDown, WalletMinimal, Settings2, RotateCw } from 'lucide-svelte/icons';
  import SmallSpinner from './smallSpinner.svelte';
  import { loadingStore, poolsStore } from '$lib/store/store';
  import type { Principal } from '@dfinity/principal';
  import * as Card from '$lib/components/ui/card/index.js';
  import * as Avatar from '$lib/components/ui/avatar/index.js';
  import { ChevronDown, Settings, RefreshCw } from 'lucide-svelte';
  import { Separator } from '$lib/components/ui/separator';
  import { fade, fly } from 'svelte/transition';
  import { cubicOut } from 'svelte/easing';

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
  let principal: Principal;

  let fromAmount: number | null = null;
  let toAmount: number | null = null;
  let isProcessing = false;

  let _toCurrency: TokenInfo = sunny;
  let _fromCurrency: TokenInfo = luna;

  let swapDirection = 'down';
  let showRateInfo = false;

  function toggleSwap() {
    [_fromCurrency, _toCurrency] = [_toCurrency, _fromCurrency];
    [fromAmount, toAmount] = [toAmount, fromAmount];
    swapDirection = swapDirection === 'down' ? 'up' : 'down';
  }

  $: exchangeRate = fromAmount && toAmount ? (toAmount / fromAmount).toFixed(6) : '0.000000';

  async function getbalance() {
    return new Promise((resolve) => {
      setTimeout(() => resolve(true), 2000); // Simulate a 2-second delay
    });
  }

  async function swap() {
    if (!fromAmount || fromAmount <= 0) {
      toast.error('Invalid Token Amount', {
        description: 'Please enter a valid token amount for the "To receive" field.'
      });
      return;
    }

    isProcessing = true;
    toast.info('Processing Transaction', {
      description: 'Your transaction is being processed.'
    });

    try {
      await getbalance(); // Simulated API call
      isProcessing = false;
      toast.success('Transaction Confirmed', {
        description: `Successfully swapped ${_toCurrency} SOL for ${_fromCurrency} $PELF`,
        action: {
          label: 'View transaction',
          onClick: () => window.open('https://example.com', '_blank') // Replace with actual transaction link
        }
      });
    } catch (error) {
      isProcessing = false;
      toast.error('Transaction Failed', {
        description: 'There was an error processing your transaction.'
      });
    }
  }
</script>

<div class="py-24 w-full flex flex-col justify-center items-center bg-gradient-to-br min-h-screen">
  <div class="w-full max-w-md">
    <div class="flex flex-row justify-between pb-4">
      <Button
        variant="outline"
        class="h-10 w-10 border-none rounded-full hover:border-input text-blue-300 bg-blue-900/50 hover:bg-blue-800/70 hover:text-blue-100 text-xs transition-all duration-300 ease-in-out"
        size="icon"
      >
        <RotateCw class="h-5 w-5" />
      </Button>
      <div class="flex space-x-2">
        <Button
          variant="outline"
          class="h-10 border-none rounded-full hover:border-input text-blue-300 bg-blue-900/50 hover:bg-blue-800/70 hover:text-blue-100 text-xs transition-all duration-300 ease-in-out"
        >
          <div class="flex flex-row space-x-1 items-center">
            <Settings2 class="h-4 w-4" />
            <p>Max: 3%</p>
          </div>
        </Button>
        <Button
          variant="outline"
          class="h-10 w-10 border-none rounded-full hover:border-input text-blue-300 bg-blue-900/50 hover:bg-blue-800/70 hover:text-blue-100 text-xs transition-all duration-300 ease-in-out"
          size="icon"
        >
          <Settings class="h-5 w-5" />
        </Button>
      </div>
    </div>
    <Card.Root class="bg-blue-900/30 backdrop-blur-md border-blue-700/50 rounded-2xl px-6 py-8 shadow-xl border">
      <div class="mb-6">
        <div class="flex justify-between items-center mb-2">
          <label for="paying" class="block text-sm text-blue-200">You're paying</label>
          <div class="flex space-x-2 items-center">
            <WalletMinimal class="h-4 w-4 text-blue-300" />
            <span class="text-sm text-blue-200">{fromAmount || 0} {_fromCurrency.ticker}</span>
            <Button
              variant="outline"
              class="h-7 px-3 hover:border-blue-400 bg-blue-800/50 border-blue-600/50 rounded-lg hover:bg-blue-700/50 text-xs transition-all duration-300 ease-in-out"
            >
              <p class="text-blue-300">HALF</p>
            </Button>
            <Button
              variant="outline"
              class="h-7 px-3 hover:border-blue-400 bg-blue-800/50 border-blue-600/50 rounded-lg hover:bg-blue-700/50 text-xs transition-all duration-300 ease-in-out"
            >
              <p class="text-blue-300">MAX</p>
            </Button>
          </div>
        </div>
        <div class="flex items-center bg-blue-800/30 rounded-xl pl-4 py-4 space-x-2 w-full">
          {#if tokens !== undefined && tokens.length > 0}
            <div class="group space-x-2.5 border border-transparent relative flex items-center bg-blue-900/50 hover:bg-blue-800/70 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/30 text-blue-200 rounded-lg px-3 py-2 transition-all duration-300 ease-in-out">
              <Avatar.Root class="size-8">
                <Avatar.Image src={_fromCurrency.logo} alt={_fromCurrency.ticker} />
                <Avatar.Fallback>CN</Avatar.Fallback>
              </Avatar.Root>
              <span class="text-sm font-bold">{_fromCurrency.ticker}</span>
              <select
                class="absolute inset-0 opacity-0 w-full cursor-pointer text-md"
                on:change={(e) => console.log(e)}
              >
                {#each tokens as token}
                  <option value={token.ticker} selected={token.ticker === _fromCurrency.ticker}>{token.ticker}</option>
                {/each}
              </select>
              <div>
                <ChevronDown size="20" class="group-hover:text-blue-300 text-blue-400" />
              </div>
            </div>
          {:else}
            <div class="w-16 h-9 relative bg-blue-800/50 rounded-full px-2 py-1"></div>
          {/if}
          <Input
            id="paying"
            class="text-blue-100 text-right text-2xl flex-1 focus:border-0 border-0 focus-visible:ring-offset-0 bg-transparent placeholder-blue-400"
            type="number"
            placeholder="0.00"
            bind:value={fromAmount}
          />
        </div>
      </div>

      <div class="flex flex-row justify-center items-center mb-6 px-4 relative">
        <Separator class="bg-blue-700/50 basis-full" />
        <Button
          variant="outline"
          on:click={toggleSwap}
          class="absolute border-2 rounded-full text-blue-300 hover:text-blue-100 bg-blue-900/70 hover:bg-blue-800 hover:border-blue-400 transition-all duration-300 ease-in-out transform hover:scale-110"
          size="icon"
        >
          <ArrowUpDown class="h-5 w-5" />
        </Button>
      </div>

      <div class="mb-6">
        <!-- svelte-ignore a11y-label-has-associated-control -->
        <label class="block mb-2 text-sm text-blue-200">To receive</label>
        <div class="flex items-center bg-blue-800/30 rounded-xl pl-4 py-4 space-x-2 w-full">
          {#if tokens !== undefined && tokens.length > 0}
            <div class="group space-x-2.5 border border-transparent relative flex items-center bg-blue-900/50 hover:bg-blue-800/70 hover:border-blue-400 hover:shadow-lg hover:shadow-blue-500/30 text-blue-200 rounded-lg px-3 py-2 transition-all duration-300 ease-in-out">
              <Avatar.Root class="size-8">
                <Avatar.Image src={_toCurrency.logo} alt={_toCurrency.ticker} />
                <Avatar.Fallback>CN</Avatar.Fallback>
              </Avatar.Root>
              <span class="text-sm font-bold">{_toCurrency.ticker}</span>
              <select
                class="absolute inset-0 opacity-0 w-full cursor-pointer text-md"
                on:change={(e) => console.log(e)}
              >
                {#each tokens as token}
                  <option value={token.ticker} selected={token.ticker === _toCurrency.ticker}>{token.ticker}</option>
                {/each}
              </select>
              <div>
                <ChevronDown size="20" class="group-hover:text-blue-300 text-blue-400" />
              </div>
            </div>
          {:else}
            <div class="w-16 h-9 relative bg-blue-800/50 rounded-full px-2 py-1"></div>
          {/if}
          <Input
            class="text-blue-100 text-right text-2xl flex-1 focus:border-0 border-0 focus-visible:ring-offset-0 bg-transparent placeholder-blue-400"
            type="number"
            placeholder="0.00"
            bind:value={toAmount}
          />
        </div>
      </div>

      <div class="mb-6">
        <Button
          class="w-full py-4 bg-blue-600 hover:bg-blue-500 rounded-xl text-white font-bold text-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:ring-4 focus:ring-blue-300"
          on:click={swap}
        >
          {#if isProcessing}
            <SmallSpinner />
          {:else}
            SWAP
          {/if}
        </Button>
      </div>

      <div class="text-center">
        <button
          class="text-blue-300 hover:text-blue-100 text-sm"
          on:click={() => showRateInfo = !showRateInfo}
        >
          {showRateInfo ? 'Hide' : 'Show'} exchange rate
        </button>
        {#if showRateInfo}
          <p transition:fade="{{ duration: 300 }}" class="mt-2 text-blue-200">
            1 {_fromCurrency.ticker} = {exchangeRate} {_toCurrency.ticker}
          </p>
        {/if}
      </div>
    </Card.Root>
  </div>
</div>

<style>
  @import 'https://fonts.googleapis.com/icon?family=Material+Icons';

  :global(body) {
    background-color: #0f172a;
  }
</style>