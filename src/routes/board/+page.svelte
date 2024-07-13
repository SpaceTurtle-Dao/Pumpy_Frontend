<!-- src/routes/board/+page.svelte -->
<script lang="ts">
	import Board from '$lib/components/board.svelte';
	import { pumpsStore } from '$lib/store/store';
	import { fetchPumps } from '$lib/common/swappy';
	import type { Pool } from '$lib/models/Pool.svelte';
	const fetchData = async () => {
		let pumps = await fetchPumps();
		pumpsStore.set(pumps);
	};
	setInterval(fetchData, 5000);
</script>

<div class="w-screen h-screen bg-black-400 pt-5 pb-2.5">
	<p class="text-center text-4xl text-red-400 text-shadow shadow-red-500 font-bold mb-5">Board</p>
	<Board />
</div>
