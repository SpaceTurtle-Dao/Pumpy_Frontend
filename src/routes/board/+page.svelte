<script lang="ts">
  import Board from '$lib/components/board.svelte';
</script>

<style>
  .container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 20px 10px;
    max-width: 1400px;
    margin: 0 auto; 
  }

  .board-title {
    font-size: clamp(1.5rem, 5vw, 2.5rem);
    font-weight: bold;
    color: #ff007f;
    text-shadow: 0 0 10px rgba(255, 0, 127, 0.7);
    text-align: center;
    margin-bottom: 50px;
  }
</style>

<div class="container">
  <div class="board-title">Board</div>
  <Board />
</div>