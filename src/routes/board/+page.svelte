<script lang="ts">
	import Board from '$lib/components/board.svelte';
	import { pumpsStore } from '$lib/store/store';
	import { fetchPumps, poolInfo } from '$lib/common/swappy';
	import { goto } from '$app/navigation';
	import { onMount } from 'svelte';

	const fetchData = async () => {
		let pumps = await fetchPumps();
		pumpsStore.set(pumps);
	};
	setInterval(fetchData, 1000);

	function startNewCoin() {
		goto('/createPump')
	}

	let visible = false;
	onMount(() => {
		visible = true;
	});
</script>

<div class="flex flex-col items-center">
    <button 
        on:click={startNewCoin}
        class="mb-4 px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-700 transition-colors duration-300"
    >
        [Create a New Coin]
    </button>
    <h1 
        class="text-4xl font-bold text-yellow-400 mb-6 uppercase tracking-wider
               animate-[fadeIn_1s_ease-out] motion-reduce:animate-none
               drop-shadow-[0_0_10px_rgba(255,215,0,0.8)]
               transition-all duration-300 ease-out transform hover:scale-105"
    >
        King of the Hill
    </h1>
    <Board />
</div>