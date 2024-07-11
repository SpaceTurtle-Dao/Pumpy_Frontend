<script lang='ts'>
  import Wallet from "./wallet.svelte";
  import Logo from '../../assets/logo.svelte';
</script>

<style global>
  @import 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css';
</style>

<nav class="bg-neutral text-white p-4 flex items-center justify-between">
  <div class="flex items-center space-x-2">
    <div class="size-10">
      <Logo/>
    </div>
    <div>
      <span class="font-bold text-xl">SwapBox</span>
    </div>
  </div>
  <div class="flex items-center space-x-8">
    <a href="#" class="hover:text-gray-400">DEBUG</a>
    <a href="" class="hover:text-gray-400">WHITE-PAPER</a>
    <Wallet/>
  </div>
</nav>
