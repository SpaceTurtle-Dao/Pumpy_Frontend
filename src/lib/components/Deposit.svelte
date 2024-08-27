<script lang="ts">
  import { fade } from 'svelte/transition';
  import { Button } from '$lib/components/ui/button/index.js';
  import { Input } from '$lib/components/ui/input/swap_index';
  import {Card} from '$lib/components/ui/card/index.js';
  import { Separator } from '$lib/components/ui/separator';
  import { WalletMinimal, Settings2, RotateCw, Wallet, WalletIcon } from 'lucide-svelte/icons';
  import { toast } from 'svelte-sonner';
  import { Avatar } from '$lib/components/ui/avatar/index.js';

  let balance = 1000;
  let amount: number | null = null;
  let showBalanceInfo = false;

  function deposit() {
    if (amount && amount > 0) {
      balance += amount;
      toast.success('Deposit Successful', {
        description: `Successfully deposited ${amount} coins.`
      });
      amount = null;
    } else {
      toast.error('Invalid Amount', {
        description: 'Please enter a valid amount to deposit.'
      });
    }
  }

  function withdraw() {
    if (amount && amount > 0 && amount <= balance) {
      balance -= amount;
      toast.success('Withdrawal Successful', {
        description: `Successfully withdrawn ${amount} coins.`
      });
      amount = null;
    } else if (amount && amount > balance) {
      toast.error('Insufficient Balance', {
        description: 'You do not have enough coins for this withdrawal.'
      });
    } else {
      toast.error('Invalid Amount', {
        description: 'Please enter a valid amount to withdraw.'
      });
    }
  }
</script>

<div class="py-24 w-full flex flex-col justify-center items-center bg min-h-screen">
  <div class="w-full max-w-md">
    <div class="flex flex-row justify-between pb-4">
      <Button
        variant="outline"
        class="h-10 w-10 border-none rounded-full hover:border-input text-blue-300 bg-blue-900/50 hover:bg-blue-800/70 hover:text-blue-100 text-xs transition-all duration-300 ease-in-out"
        size="icon"
      >
        <RotateCw class="h-5 w-5" />
      </Button>
      <Button
        variant="outline"
        class="h-10 w-10 border-none rounded-full hover:border-input text-blue-300 bg-blue-900/50 hover:bg-blue-800/70 hover:text-blue-100 text-xs transition-all duration-300 ease-in-out"
        size="icon"
      >
        <Settings2 class="h-5 w-5" />
      </Button>
    </div>
    <Card class="bg-blue-900/30 backdrop-blur-md border-blue-700/50 rounded-2xl px-6 py-8 shadow-xl border">
      <div class="mb-6">
        <div class="flex justify-between items-center mb-2">
          <label for="amount" class="block text-sm text-blue-200">Amount</label>
          <div class="flex space-x-2 items-center">
            <WalletMinimal class="h-4 w-4 text-blue-300" />
            <span class="text-sm text-blue-200">{balance.toFixed(2)} coins</span>
          </div>
        </div>
        <div class="flex items-center bg-blue-800/30 rounded-xl pl-4 py-4 space-x-2 w-full">
          <Input
            id="amount"
            class="text-blue-100 text-right text-2xl flex-1 focus:border-0 border-0 focus-visible:ring-offset-0 bg-transparent placeholder-blue-400"
            type="number"
            placeholder="0.00"
            bind:value={amount}
          />
        </div>
      </div>

      <div class="flex flex-row justify-center items-center mb-6 px-4 relative">
        <Separator class="bg-blue-700/50 basis-full" />
        <Button
          variant="outline"
          class="absolute border-2 rounded-full text-blue-300 hover:text-blue-100 bg-blue-900/70 hover:bg-blue-800 hover:border-blue-400 transition-all duration-300 ease-in-out transform hover:scale-110"
          size="icon"
        >
          <WalletIcon class="h-5 w-5" />
        </Button>
      </div>

      <div class="flex space-x-4 mb-6">
        <Button
          on:click={deposit}
          class="flex-1 py-4 bg-green-600 hover:bg-green-500 rounded-xl text-white font-bold text-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:ring-4 focus:ring-green-300"
        >
          DEPOSIT
        </Button>
        <Button
          on:click={withdraw}
          class="flex-1 py-4 bg-red-600 hover:bg-red-500 rounded-xl text-white font-bold text-lg transition-all duration-300 ease-in-out transform hover:scale-105 focus:ring-4 focus:ring-red-300"
        >
          WITHDRAW
        </Button>
      </div>

      <div class="text-center">
        <button
          class="text-blue-300 hover:text-blue-100 text-sm"
          on:click={() => showBalanceInfo = !showBalanceInfo}
        >
          {showBalanceInfo ? 'Hide' : 'Show'} balance info
        </button>
        {#if showBalanceInfo}
          <p transition:fade="{{ duration: 300 }}" class="mt-2 text-blue-200">
            Your current balance is {balance.toFixed(2)} coins
          </p>
        {/if}
      </div>
    </Card>
  </div>
</div>

<style>
  :global(body) {
    background-color: #0f172a;
  }
</style>