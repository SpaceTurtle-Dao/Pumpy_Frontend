<script lang="ts">
  import { onMount } from 'svelte';
  import * as Card from "$lib/components/ui/card";
  import * as Pagination from "$lib/components/ui/pagination";

  interface PumpCard {
    id: string,
    createdBy: string,
    marketCap: number,
    ticker: string,
    description: string,
    image: string
  };

  const mockCards: Array<PumpCard> = [
    {
      id: "1",
      createdBy: "0x1234...5678",
      marketCap: 1000000,
      ticker: "PUMP",
      description: "The original pump token for decentralized liquidity",
      image: "src/assets/icp.png"
    },
    {
      id: "2",
      createdBy: "0xabcd...ef01",
      marketCap: 500000,
      ticker: "MOON",
      description: "To the moon and beyond with this high-yield token",
      image: "src/assets/luna.png"
    },
    {
      id: "3",
      createdBy: "0x2468...1357",
      marketCap: 750000,
      ticker: "ROCK",
      description: "Solid as a rock, stable gains for long-term hodlers",
      image: "src/assets/sunny.jpeg"
    },
    {
      id: "4",
      createdBy: "0xfedc...ba98",
      marketCap: 250000,
      ticker: "STAR",
      description: "Reach for the stars with this interstellar token",
      image: "src/assets/icp.png"
    },
    {
      id: "5",
      createdBy: "0x9876...5432",
      marketCap: 1500000,
      ticker: "DOGE",
      description: "Much wow, very crypto, such gains",
      image: "src/assets/sunny.jpeg"
    },
    {
      id: "6",
      createdBy: "0x1111...2222",
      marketCap: 300000,
      ticker: "WAVE",
      description: "Ride the wave of decentralized finance",
      image: "src/assets/sunny.jpeg"
    },
    {
      id: "7",
      createdBy: "0x3333...4444",
      marketCap: 900000,
      ticker: "FIRE",
      description: "Ignite your portfolio with blazing returns",
      image: "src/assets/sunny.jpeg"
    },
    {
      id: "8",
      createdBy: "0x5555...6666",
      marketCap: 600000,
      ticker: "ICE",
      description: "Cool, calm, and collected gains in any market",
      image: "src/assets/sunny.jpeg"
    },
    {
      id: "9",
      createdBy: "0x7777...8888",
      marketCap: 400000,
      ticker: "LEAF",
      description: "Grow your wealth with this eco-friendly token",
      image: "src/assets/sunny.jpeg"
    },
    {
      id: "10",
      createdBy: "0x9999...0000",
      marketCap: 1200000,
      ticker: "GOLD",
      description: "The digital gold standard for crypto investors",
      image: "src/assets/sunny.jpeg"
    }
  ];

  let cards: Array<PumpCard> = [];
  let currentPage = 1;
  const perPage = 9;
  let totalPages: number;

  const setup = () => {
    cards = mockCards;
    totalPages = Math.ceil(cards.length / perPage);
  }

  onMount(() => {
    setup();
  });

  $: paginatedCards = cards.slice((currentPage - 1) * perPage, currentPage * perPage);

  function goToPage(page: number) {
    currentPage = page;
  }
</script>

<div class="flex flex-col w-full justify-center items-center space-y-8 md:space-y-12 lg:space-y-16">
  <div class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-12 lg:gap-x-8 lg:gap-y-16">
    {#each paginatedCards as card}
      <div class="w-full shadow-md ">
        <a href="/{card.id}">
          <Card.Root class="card-3d text-white p-4 shadow-md">
            <Card.Header class="items-center space-x-2 mb-2">
              <img src={card.image} alt={card.ticker} class="w-12 h-12 rounded-full" />
              <div>
                <span class="text-sm text-gray-400">Created by {card.createdBy}</span>
                <div class="text-green-400 font-semibold text-xs">Market cap: {card.marketCap}</div>
              </div>
            </Card.Header>
            <Card.Content class="card-content">
              <div class="font-semibold text-lg mb-2">{card.ticker}</div>
              <div class="line-clamp-1 text-gray-300 text-sm card-description">{card.description}</div>
            </Card.Content>
          </Card.Root>
        </a>
      </div>
    {/each}
  </div>
  
  <div class="pagination-wrapper w-full overflow-x-auto py-4">
    <Pagination.Root 
      count={cards.length} 
      {perPage} 
      let:pages 
      let:currentPage
    >
      <Pagination.Content class="flex justify-center items-center space-x-1 sm:space-x-2">
        <Pagination.Item class="hidden sm:block">
          <Pagination.PrevButton 
            on:click={() => goToPage(currentPage - 1)}
            class="px-2 py-1 sm:px-3 sm:py-2 text-sm bg-gray-700 rounded hover:bg-gray-600 transition-colors"
          />
        </Pagination.Item>
        {#each pages as page (page.key)}
          {#if page.type === "ellipsis"}
            <Pagination.Item class="hidden sm:block">
              <Pagination.Ellipsis class="px-2 py-1 sm:px-3 sm:py-2 text-sm" />
            </Pagination.Item>
          {:else}
            <Pagination.Item>
              <Pagination.Link 
                {page} 
                isActive={currentPage === page.value}
                on:click={() => goToPage(page.value)}
                class="px-2 py-1 sm:px-3 sm:py-2 text-sm rounded transition-colors
                       {currentPage === page.value ? 'bg-blue-500 text-white' : 'bg-gray-700 hover:bg-gray-600'}"
              >
                {page.value}
              </Pagination.Link>
            </Pagination.Item>
          {/if}
        {/each}
        <Pagination.Item class="hidden sm:block">
          <Pagination.NextButton
            on:click={() => goToPage(currentPage + 1)}
            class="px-2 py-1 sm:px-3 sm:py-2 text-sm bg-gray-700 rounded hover:bg-gray-600 transition-colors"
          />
        </Pagination.Item>
      </Pagination.Content>
    </Pagination.Root>
  </div>
</div>