<!-- src/routes/board/+page.svelte -->
<script lang="ts">
  import Board from '$lib/components/board.svelte';
</script>

<style>
  .container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #000000; 
    padding: 10px;
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
