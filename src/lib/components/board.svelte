<script lang="ts">
  import * as Card from "$lib/components/ui/card";
  import * as Pagination from "$lib/components/ui/pagination";
  import { pumpsStore, pumpyActor } from "$lib/store";
  import type {PoolInfo, Pumpy } from "$lib/declarations/pumpy/pumpy.did";
  
  interface PumpCard {
    id: string,
    createdBy: string,
    marketCap: number,
    ticker: string,
    description: string,
    image: string
  };

  let cards: Array<PumpCard> = [];
  let currentPage = 1;
  const perPage = 9;
  const totalCards = cards.length;
  const totalPages = Math.ceil(totalCards / perPage);
  let pumpy:Pumpy;

  let pools:Array<PoolInfo> = [];

  const setup = async () => {
    let _cards: Array<PumpCard> = [];
    pools = await pumpy.fetchPumps();
    console.log("Pools " + pools.length);
    for (let i = 0; i < pools.length; i++) {
      const pool = pools[i];
      _cards.push({
        id: pool.id.toString(),
        createdBy: pool.tokenA.minter,
        marketCap: Number(pool.analytics.marketCap),
        ticker: pool.tokenA.symbol,
        description: "Description",
        image: pool.tokenA.icon
      });
    }
    console.log("Cards " + _cards.length);
    cards = _cards;
  }

  pumpyActor.subscribe((value)=> {
    pumpy=value;
    setup();
  });
  

  function getCurrentPageCards() {
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    return cards.slice(start, end);
  }

</script>


<style>
  .card-3d {
    border: 1px solid white;
    background: linear-gradient(145deg, #1e1e1e, #2a2a2a);
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5), -4px -4px 8px rgba(255, 255, 255, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border-radius: 10px;
  }
  .card-3d:hover {
    transform: translateY(-10px);
    box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.7), -8px -8px 16px rgba(255, 255, 255, 0.2);
  }
  .pagination-wrapper {
    margin-top: 20px; /* Adjust the margin as needed */
  }
</style>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
  {#each cards as card}
  <a href="/{card.id}">
    <Card.Root class="card-3d text-white p-4 shadow-md">
      <Card.Header class="flex items-center space-x-2 mb-2">
        <img src={card.image} alt={card.ticker} class="w-12 h-12 rounded-full" />
        <div>
          <span class="text-sm text-gray-400">Created by {card.createdBy}</span>
          <div class="text-green-400 font-semibold text-xs">Market cap: {card.marketCap}</div>
        </div>
      </Card.Header>
      <Card.Content>
        <div class="font-semibold text-lg mb-2">{card.ticker}</div>
        <div class="text-gray-300 text-sm">{card.description}</div>
      </Card.Content>
    </Card.Root>
    </a>
  {/each}
 
</div>

<div class="pagination-wrapper">
  <Pagination.Root count={totalPages} perPage={1} let:pages let:currentPage>
    <Pagination.Content>
      <Pagination.Item>
        <Pagination.PrevButton />
      </Pagination.Item>
      {#each pages as page (page.key)}
        {#if page.type === "ellipsis"}
          <Pagination.Item>
            <Pagination.Ellipsis />
          </Pagination.Item>
        {:else}
          <Pagination.Item isVisible={currentPage == page.value}>
            <Pagination.Link {page} isActive={currentPage == page.value} on:click={() => currentPage = page.value}>
              {page.value}
            </Pagination.Link>
          </Pagination.Item>
        {/if}
      {/each}
      <Pagination.Item>
        <Pagination.NextButton />
      </Pagination.Item>
    </Pagination.Content>
  </Pagination.Root>
</div>
