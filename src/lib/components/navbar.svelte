<script lang='ts'>
  import Logo from "../../assets/sunny.jpeg"
  import Plug from "$lib/components/plug.svelte";
</script>

<style global>
  @import 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css';
</style>

<nav class="bg-black text-white p-4 flex items-center justify-between">
  <div class="flex items-center space-x-2">
    <img src={Logo} alt="Logo" class="h-10 w-10">
    <!--<div>
      <span class="font-bold text-xl">palceholder</span>
      <span class="text-sm">Pumpy Release</span>
    </div>-->
  </div>
  <div class="flex items-center space-x-8">
    <a href="#" class="hover:text-gray-400">DEBUG</a>
    <a href="" class="hover:text-gray-400">WHITE-PAPER</a>
    <Plug/>
  </div>
</nav>