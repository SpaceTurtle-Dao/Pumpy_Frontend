<script lang="ts">
  
  let scrollContainer:any;

  function scrollLeft() {
    scrollContainer.scrollBy({
      left: -300, // Adjust this value based on your card width
      behavior: 'smooth'
    });
  }

  function scrollRight() {
    scrollContainer.scrollBy({
      left: 300, // Adjust this value based on your card width
      behavior: 'smooth'
    });
  }
  
</script>

<style>
  .card-container {
    display: flex;
    gap: 3rem; /* Increase the gap between cards */
    background-color: #000000;
    padding: 2rem;
    overflow-x: auto;
    scroll-behavior: smooth;
  }

  .card {
    border-radius: 0.75rem;
    background-color: #252525;
    color: white;
    padding: 1rem;
    width: 300px; /* Adjust the width as needed */
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    border: 2px solid white; /* Add white border */
  }

  .progress-bar {
    height: 1rem;
    border-radius: 0.5rem;
    background-color: #34D399; /* Tailwind green-400 */
  }

  .progress-track {
    background-color: #3f3f3f;
    border-radius: 0.5rem;
  }

  .scroll-button {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: #252525;
    border: none;
    color: white;
    padding: 0.5rem;
    cursor: pointer;
    z-index: 10;
  }

  .scroll-button.left {
    left: 0;
  }

  .scroll-button.right {
    right: 0;
  }
</style>

<div class="relative">
  <button class="scroll-button left" on:click={scrollLeft}>‹</button>
  <button class="scroll-button right" on:click={scrollRight}>›</button>
  <div bind:this={scrollContainer} class="card-container">
    {#each Array(3) as _, i}
      <div class="card">
        <div class="text-gray-500 mb-2">29-03-2024</div>
        <div class="text-green-400 mb-2">Project Type</div>
        <h2 class="text-xl font-bold mb-4">PROJECT NAME HERE</h2>
        <p class="text-sm mb-4">
          "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua..."
        </p>
        <div class="text-sm mb-2">1024 $ICP VOLUME</div>
        <div class="text-sm mb-2">890 $ICP CONTRIBUTED</div>
        <div class="progress-track w-full h-4 mb-4 relative">
          <div class="progress-bar absolute top-0 left-0 w-4/5"></div>
        </div>
        <div class="text-sm">BONDING ENDS : 00:18:36:28</div>
      </div>
    {/each}
  </div>
</div>
