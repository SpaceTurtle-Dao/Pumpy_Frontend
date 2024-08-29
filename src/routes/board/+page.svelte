<script lang="ts">
	import Board from '$lib/components/board.svelte';
	import { fetchPumps, poolInfo } from '$lib/common/swappy.svelte';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';
    setInterval(fetchPumps,500)
	function startNewCoin() {
		goto('/createPump')
	}

	let visible = false;
	onMount(() => {
		visible = true;
	});
</script>

<div class="flex flex-col items-center w-full px-4 sm:px-6 md:px-8 lg:px-12 xl:px-16 2xl:px-24">
    <button 
        on:click={startNewCoin}
        class="mb-4 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-300 text-sm sm:text-base"
    >
        [Create a New Coin]
    </button>
    <h1 class="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 via-yellow-300 to-yellow-500 mb-4 sm:mb-6 md:mb-8 uppercase tracking-widest
           animate-pulse
           drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]
           transition-all duration-300 ease-out transform hover:scale-105
           border-b-4 border-yellow-400 pb-2 text-center nova-mono-regular">
		King of the Hill
	</h1>
    <div class="w-full max-w-7xl">
        <Board />
    </div>
</div>