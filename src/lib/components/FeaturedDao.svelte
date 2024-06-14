<script lang="ts">
  import { onMount } from 'svelte';
  import Card from '$lib/components/FeaturedDao.svelte';

  let projects: String[] = [];

  // Simulate fetching data from backend
  onMount(async () => {
    const response = await fetch('/path/to/your/api');
    const data = await response.json();
    projects = data.projects;
  });
</script>

<div class="p-6">
  <h1 class="text-3xl font-bold text-white mb-6">Featured DAOs</h1>
  <div class="flex space-x-4 overflow-x-auto">
    {#each projects as project}
      <Card />
    {/each}
  </div>
</div>
