<script lang='ts'>
  import Logo from "../../assets/logo.png"
  import { Button } from "$lib/components/ui/button";
</script>

<style global>
  @import 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css';
</style>

<nav class="bg-black text-white p-4 flex items-center justify-between">
  <div class="flex items-center space-x-2">
    <img src={Logo} alt="Logo" class="h-10 w-10">
    <div>
      <span class="font-bold text-xl">$STACK</span>
      <span class="text-sm">Pioneer Release</span>
    </div>
  </div>
  <div class="flex items-center space-x-8">
    <a href="#" class="hover:text-gray-400">GENESIS</a>
    <a href="#" class="hover:text-gray-400">PATHFINDER</a>
    <a href="#" class="hover:text-gray-400">VANGUARD</a>
    <a href="#" class="hover:text-gray-400">DEBUG</a>
    <a href="https://usdstack.gitbook.io/stack-whitepaper" class="hover:text-gray-400">WHITE-PAPER</a>
    <Button class="bg-[#A9E3AF] text-black py-2 px-4 rounded hover:bg-opacity-90">CONNECT WALLET</Button>
  </div>
</nav>
