<!-- src/routes/board/+page.svelte -->
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

<div class="h-screen bg-black-400 pt-5 pb-2.5">
	<p class="text-center text-4xl text-red-400 text-shadow shadow-red-500 font-bold mb-5">Board</p>
	<Board />
</div>
