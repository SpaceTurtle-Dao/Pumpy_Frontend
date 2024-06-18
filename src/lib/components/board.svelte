<script lang="ts">
  import * as Card from "$lib/components/ui/card";
  import data from '$lib/data.json'; // Ensure to have the JSON data in a proper path

  export let cards = data;
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {#each cards as card}
    <Card.Root class="bg-gray-800 text-white p-4 rounded-xl border border-gray-700 shadow-md">
      <Card.Header class="flex items-center space-x-2 mb-2">
        <img src={card.image} alt={card.ticker} class="w-12 h-12 rounded-full" />
        <div>
          <span class="text-sm text-gray-400">Created by {card.createdBy}</span>
          <div class="text-green-400 font-semibold text-xs">market cap: {card.marketCap}</div>
        </div>
      </Card.Header>
      <Card.Content>
        <div class="text-sm mb-2">replies: {card.replies}</div>
        <div class="font-semibold text-lg mb-2">{card.ticker}</div>
        <div class="text-gray-300 text-sm">{card.description}</div>
      </Card.Content>
    </Card.Root>
  {/each}
</div>
