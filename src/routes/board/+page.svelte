<!-- src/routes/board/+page.svelte -->
<script lang="ts">
  import Board from '$lib/components/board.svelte';
  import { pumpsStore } from '$lib/store/store';
	import { pumps } from '$lib/messageFactory.svelte';
	import { fetchPumps } from '$lib/common/swappy';
	const fetchData = async () => {
		let pumps = await fetchPumps();
		pumpsStore.set(pumps);
	}

	setInterval(fetchData, 5000);
</script>

<style>
  .container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #000000; 
    padding: 20px 10px; /* Add some padding to the top and bottom */
  }

  .board-title {
    font-size: 2rem;
    font-weight: bold;
    color: #ff007f;
    text-shadow: 0 0 10px rgba(255, 0, 127, 0.7); 
    text-align: center; 
    margin-bottom: 20px; 
  }
</style>

<div class="container">
  <div class="board-title">Board</div> 
  <Board />
</div>
