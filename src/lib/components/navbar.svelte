<script lang="ts">
	import Logo from '../../assets/logo.png';
	import Plug from '$lib/components/plug.svelte';
</script>

<nav class="bg-black text-white p-4 flex items-center justify-between">
	<div class="flex items-center space-x-2">
		<!-- <img src={Logo} alt="Logo" class="h-10 w-10" /> -->
		<span class="font-bold text-xl">:)</span>
		<div>
			<span class="font-bold text-xl">PUMPY</span>
			<!-- <span class="text-sm">Pioneer Release</span> -->
		</div>
	</div>
	<div class="flex items-center space-x-8">
		<a href="/create" class="hover:text-gray-400">CREATE</a>
		<a href="/swap" class="hover:text-gray-400">SWAP</a>
		<Plug />
	</div>
</nav>

<style global>
	@import 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css';
</style>
