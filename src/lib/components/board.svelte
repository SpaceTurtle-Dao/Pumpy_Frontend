<script lang="ts">
	import { onMount, onDestroy } from 'svelte';
	import * as Card from '$lib/components/ui/card';
	import * as Pagination from '$lib/components/ui/pagination';
	import { Badge } from '$lib/components/ui/badge';
  import { Button } from '$lib/components/ui/button';
	import type { Pool } from '$lib/models/Pool.svelte';
	import { pumpsStore } from '$lib/store/store';
  import { fetchPumps, poolInfo } from '$lib/common/swappy';
  import { Pools } from '$lib/store/pools.store';
  import Time, { svelteTime } from 'svelte-time';
  import { Input } from "$lib/components/ui/input/index.js";
  import { dayjs } from 'svelte-time';
  
  function findHighestLiquidityPool(pools: Array<Pool>): Pool | null {
    if (pools.length === 0) return null;
    return pools.reduce((max, pool) => pool.volume > max.volume ? pool : max);
  }

  let highestLiquidityPool: Pool | null = null;

  $: {
    highestLiquidityPool = findHighestLiquidityPool(pools);
    if (highestLiquidityPool) {
      pools = pools.filter(pool => pool !== highestLiquidityPool);
    }
    totalPages = Math.ceil(pools.length / perPage);
    updatePaginatedPools();
  }

  function formatNumber(num: number): string {
    if (num >= 1e6) return `$${(num / 1e6).toFixed(1)}M`;
    if (num >= 1e3) return `$${(num / 1e3).toFixed(0)}K`;
    return `$${num}`;
  }

	let pools: Array<Pool> = [];
  let currentPage = 1;
  const perPage = 9;
  let totalPages: number;
  let paginatedPools: Array<Pool> = [];
  let unsubscribe: () => void; // For store subscription

  // Commented out previous fetchPoolsInfo function
  // async function fetchPoolsInfo() {
  //       const fetchedPumps = await fetchPumps();
  //       pools = await Promise.all(fetchedPumps.map(async (pump) => {
  //           if (pump) {
  //               const poolDetails = await poolInfo(pump.processId);
  //               return {
  //                   ...pump,
  //                   ...poolDetails
  //               };
  //           }
  //           return null;
  //       }));
  //       pools = pools.filter(pool => pool !== null);
  //       totalPages = Math.ceil(pools.length / perPage);
  //       updatePaginatedPools();
  //       console.log("Pools @", pools[0])
  // }
	
  // pumpsStore.subscribe((value) => {
  //   pools = value;
  //   totalPages = Math.ceil(pools.length / perPage);
  //   updatePaginatedPools();
  // });

  function updatePaginatedPools() {
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    paginatedPools = pools.slice(start, end);
  }

  function updatePaginatedPools1() {
    const start = (currentPage - 1) * perPage;
    const end = start + perPage;
    paginatedPools = filteredPools.slice(start, end);
  }

  function goToPage(page: number) {
    currentPage = page;
    updatePaginatedPools();
  }

	// onMount(() => {
  //   updatePaginatedPools();
  // });

  // Commented out previous onMount
  // onMount(() => {
  //   fetchPoolsInfo();
  // });

  // New onMount using Pools store
  onMount(() => {
    unsubscribe = Pools.subscribe(value => {
      pools = value;
      totalPages = Math.ceil(pools.length / perPage);
      updatePaginatedPools();
    });
  });

  onDestroy(() => {
    if (unsubscribe) unsubscribe();
  });

  onMount(() => {
    totalPages = Math.ceil(pools.length / perPage);
    updatePaginatedPools();
  });

  let searchTerm = '';
  let filteredPools: Array<Pool> = [];

  function filterPools(pools: Array<Pool>, term: string): Array<Pool> {
    if (!term.trim()) return pools;
    return pools.filter(pool => 
      pool.name.toLowerCase().includes(term.toLowerCase())
    );
  }

  $: {
    filteredPools = filterPools(pools, searchTerm);
    if (searchTerm.trim() && filteredPools.length > 0) {
      // When searching, only keep the first result
      filteredPools = [filteredPools[0]];
    }
    totalPages = Math.ceil(filteredPools.length / perPage);
    updatePaginatedPools();
  }

</script>

  {#if highestLiquidityPool}
    <div class="mb-8">
      <Card.Root class="bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg flex flex-col h-full max-w-md mx-auto">
        <div class="p-4 flex-grow">
          <div class="flex items-start space-x-4 mb-4">
            <div class="relative flex-shrink-0">
              <img src={highestLiquidityPool.image} alt={highestLiquidityPool.name} class="w-16 h-16 rounded-full border-2 border-green-400" />
              <div class="absolute bottom-0 right-0 bg-green-400 rounded-full p-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
            </div>
            <div class="flex-grow min-w-0">
              <div class="flex justify-between items-start">
                <div class="truncate">
                  <h2 class="text-xl font-bold truncate saira-bold text-left">{highestLiquidityPool.name}</h2>
                  <p class="text-sm text-gray-400 truncate nova-mono-regular">{highestLiquidityPool.description}</p>
                </div>
                <div class="flex items-center space-x-1 text-purple-400 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>
                  <span>${highestLiquidityPool.price}</span>
                </div>
              </div>
              <div class="mt-2 flex items-center space-x-4 text-sm">
                <span class="text-gray-400 truncate"><Time relative live={500} timestamp={new Date(highestLiquidityPool.time)}></Time></span>
                <span class="text-green-400">↑ {highestLiquidityPool.holders}%</span>
                <span class="text-red-400">↓ {highestLiquidityPool.buyers}%</span>
              </div>
            </div>
          </div>
        </div>
        <div class="px-4 py-2 bg-gray-700 bg-opacity-50 mt-auto">
          <div class="flex justify-between items-center">
            <div class="flex space-x-2">
              <Button variant="ghost" class="p-1 hover:bg-gray-600 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="15"></line><line x1="15" y1="9" x2="9" y2="15"></line></svg>
              </Button>
              <Button variant="ghost" class="p-1 hover:bg-gray-600 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
              </Button>
              <Button variant="ghost" class="p-1 hover:bg-gray-600 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 16 16 12 12 8"></polyline><line x1="8" y1="12" x2="16" y2="12"></line></svg>
              </Button>
              <Button variant="ghost" class="p-1 hover:bg-gray-600 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
              </Button>
            </div>
            <div class="flex items-center space-x-4 text-sm">
              <div class="flex items-center space-x-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                <span>2</span>
              </div>
              <div class="flex items-center space-x-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                <span>{formatNumber(highestLiquidityPool.volume)}</span>
              </div>
              <div class="flex items-center space-x-1">
                <span>MC</span>
                <span>{formatNumber(highestLiquidityPool.marketCap)}</span>
              </div>
            </div>
          </div>
        </div>
      </Card.Root>
    </div>
  {/if}

  <div class="relative min-h-screen bg-black-400 flex flex-col px-4 py-8 sm:px-6 lg:px-8">
  <div class="flex justify-between items-end mb-8">
    <div class="relative">
      <input
        type="text"
        bind:value={searchTerm}
        placeholder="Search pools..."
        class="bg-gray-700 text-white rounded-full px-4 py-2 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
      />
      <svg
        class="absolute right-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 20 20"
        fill="currentColor"
      >
        <path
          fill-rule="evenodd"
          d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
          clip-rule="evenodd"
        />
      </svg>
    </div>
  </div>

  {#if filteredPools.length === 0}
    <div class="text-white text-center py-8">
      No results found for "{searchTerm}"
    </div>
  {:else if searchTerm.trim()}
    <!-- Display single card when searching -->
    <div class="mb-8">
      <Card.Root class="bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg flex flex-col h-full max-w-md mx-auto">
        <div class="p-4 flex-grow">
          <div class="flex items-start space-x-4 mb-4">
            <div class="relative flex-shrink-0">
              <img src={filteredPools[0].image} alt={filteredPools[0].name} class="w-16 h-16 rounded-full border-2 border-green-400" />
              <div class="absolute bottom-0 right-0 bg-green-400 rounded-full p-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
              </div>
            </div>
            <div class="flex-grow min-w-0">
              <div class="flex justify-between items-start">
                <div class="truncate">
                  <h2 class="text-xl font-bold truncate saira-bold text-left">{filteredPools[0].name}</h2>
                  <p class="text-sm text-gray-400 truncate nova-mono-regular">{filteredPools[0].description}</p>
                </div>
                <div class="flex items-center space-x-1 text-purple-400 flex-shrink-0">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>
                  <span>${filteredPools[0].price}</span>
                </div>
              </div>
              <div class="mt-2 flex items-center space-x-4 text-sm">
                <span class="text-gray-400 truncate"><Time relative live={500} timestamp={new Date(filteredPools[0].time)}></Time></span>
                <span class="text-green-400">↑ {filteredPools[0].holders}%</span>
                <span class="text-red-400">↓ {filteredPools[0].buyers}%</span>
              </div>
            </div>
          </div>
        </div>
        <div class="px-4 py-2 bg-gray-700 bg-opacity-50 mt-auto">
          <div class="flex justify-between items-center">
            <div class="flex space-x-2">
              <Button variant="ghost" class="p-1 hover:bg-gray-600 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="15"></line><line x1="15" y1="9" x2="9" y2="15"></line></svg>
              </Button>
              <Button variant="ghost" class="p-1 hover:bg-gray-600 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
              </Button>
              <Button variant="ghost" class="p-1 hover:bg-gray-600 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 16 16 12 12 8"></polyline><line x1="8" y1="12" x2="16" y2="12"></line></svg>
              </Button>
              <Button variant="ghost" class="p-1 hover:bg-gray-600 rounded">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
              </Button>
            </div>
            <div class="flex items-center space-x-4 text-sm">
              <div class="flex items-center space-x-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                <span>2</span>
              </div>
              <div class="flex items-center space-x-1">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                <span>{formatNumber(filteredPools[0].volume)}</span>
              </div>
              <div class="flex items-center space-x-1">
                <span>MC</span>
                <span>{formatNumber(filteredPools[0].marketCap)}</span>
              </div>
            </div>
          </div>
        </div>
      </Card.Root>
    </div>
  {/if}

  {#if filteredPools.length > 0 && !searchTerm.trim()}
    <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 auto-rows-fr">
      {#each paginatedPools as pool}
        <Card.Root class="bg-gray-800 text-white rounded-lg overflow-hidden shadow-lg flex flex-col h-full">
          <div class="p-4 flex-grow">
            <div class="flex items-start space-x-4 mb-4">
              <div class="relative flex-shrink-0">
                <img src={pool.image} alt={pool.name} class="w-16 h-16 rounded-full border-2 border-green-400" />
                <div class="absolute bottom-0 right-0 bg-green-400 rounded-full p-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polyline points="20 6 9 17 4 12"></polyline></svg>
                </div>
              </div>
              <div class="flex-grow min-w-0">
                <div class="flex justify-between items-start">
                  <div class="truncate">
                    <h2 class="text-xl font-bold truncate saira-bold text-left">{pool.name}</h2>
                    <p class="text-sm text-gray-400 truncate nova-mono-regular">{pool.description}</p>
                  </div>
                  <div class="flex items-center space-x-1 text-purple-400 flex-shrink-0">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z"></path></svg>
                    <span>${pool.price}</span>
                  </div>
                </div>
                <div class="mt-2 flex items-center space-x-4 text-sm">
                  <span class="text-gray-400 truncate"><Time relative live={500} timestamp={new Date(pool.time)}></Time></span>
                  <span class="text-green-400">↑ {pool.holders}%</span>
                  <span class="text-red-400">↓ {pool.buyers}%</span>
                </div>
              </div>
            </div>
          </div>
          <div class="px-4 py-2 bg-gray-700 bg-opacity-50 mt-auto">
            <div class="flex justify-between items-center">
              <div class="flex space-x-2">
                <Button variant="ghost" class="p-1 hover:bg-gray-600 rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect><line x1="9" y1="9" x2="15" y2="15"></line><line x1="15" y1="9" x2="9" y2="15"></line></svg>
                </Button>
                <Button variant="ghost" class="p-1 hover:bg-gray-600 rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                </Button>
                <Button variant="ghost" class="p-1 hover:bg-gray-600 rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><polyline points="12 16 16 12 12 8"></polyline><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                </Button>
                <Button variant="ghost" class="p-1 hover:bg-gray-600 rounded">
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path><polyline points="16 6 12 2 8 6"></polyline><line x1="12" y1="2" x2="12" y2="15"></line></svg>
                </Button>
              </div>
              <div class="flex items-center space-x-4 text-sm">
                <div class="flex items-center space-x-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path><circle cx="9" cy="7" r="4"></circle><path d="M23 21v-2a4 4 0 0 0-3-3.87"></path><path d="M16 3.13a4 4 0 0 1 0 7.75"></path></svg>
                  <span>2</span>
                </div>
                <div class="flex items-center space-x-1">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 17 12 22 22 17"></polyline><polyline points="2 12 12 17 22 12"></polyline></svg>
                  <span>{formatNumber(pool.volume)}</span>
                </div>
                <div class="flex items-center space-x-1">
                  <span>MC</span>
                  <span>{formatNumber(pool.marketCap)}</span>
                </div>
              </div>
            </div>
          </div>
        </Card.Root>
      {/each}
    </div>
  {/if}

</div>

<div class="pagination-wrapper w-full overflow-x-auto py-4">
  <Pagination.Root count={pools.length} {perPage} let:pages let:currentPage>
    <Pagination.Content class="flex justify-center items-center space-x-1 sm:space-x-2">
      <Pagination.Item class="hidden sm:block">
        <Pagination.PrevButton
          on:click={() => {
            // @ts-ignore
            goToPage(currentPage - 1);
          }}
          class="px-2 py-1 sm:px-3 sm:py-2 text-sm bg-gray-700 rounded hover:bg-gray-600 transition-colors"
        />
      </Pagination.Item>
      {#each pages as page (page.key)}
        {#if page.type === 'ellipsis'}
          <Pagination.Item class="hidden sm:block">
            <Pagination.Ellipsis class="px-2 py-1 sm:px-3 sm:py-2 text-sm" />
          </Pagination.Item>
        {:else}
          <Pagination.Item>
            <Pagination.Link
              {page}
              isActive={currentPage === page.value}
              on:click={() => {
                // @ts-ignore
                goToPage(page.value);
              }}
              class="px-2 py-1 sm:px-3 sm:py-2 text-sm rounded transition-colors
                  {currentPage === page.value
                ? 'bg-blue-500 text-white'
                : 'bg-gray-700 hover:bg-gray-600'}"
            >
              {page.value}
            </Pagination.Link>
          </Pagination.Item>
        {/if}
      {/each}
      <Pagination.Item class="hidden sm:block">
        <Pagination.NextButton
          on:click={() => {
            // @ts-ignore
            goToPage(currentPage + 1);
          }}
          class="px-2 py-1 sm:px-3 sm:py-2 text-sm bg-gray-700 rounded hover:bg-gray-600 transition-colors"
        />
      </Pagination.Item>
    </Pagination.Content>
  </Pagination.Root>
</div>