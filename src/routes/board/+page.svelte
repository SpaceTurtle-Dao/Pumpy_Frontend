<script lang="ts">
	import Board from '$lib/components/board.svelte';
	import { pumpsStore } from '$lib/store/store';
	import { fetchPumps } from '$lib/common/swappy';
	const fetchData = async () => {
		let pumps = await fetchPumps();
		pumpsStore.set(pumps);
	};
	setInterval(fetchData, 1000);
</script>

<div class="min-h-screen bg-black-400 flex flex-col justify-center px-4 py-8 sm:px-6 lg:px-8">
	<h1 class="text-center text-2xl sm:text-3xl md:text-4xl text-red-400 text-shadow shadow-red-500 font-bold mb-4 sm:mb-6">Board</h1>
	<div class="flex-grow">
		<Board />
	</div>
</div>