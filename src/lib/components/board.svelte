<script lang="ts">
	import * as Card from '$lib/components/ui/card';
	import * as Pagination from '$lib/components/ui/pagination';
	import type { Pool } from '$lib/models/Pool.svelte';
	import { send, createProcess } from '$lib/process';
  import { loadingStore, pumpsStore } from '$lib/store/store';
  
	let pools: Array<Pool> = [];
	let currentPage = 1;
	const perPage = 9;
	let totalPages: number;
  let isLoading = false;
  
  /*pumpsStore.subscribe((value) => {
    pools = value;
    totalPages = Math.ceil(pools.length / perPage);
  });*/

  loadingStore.subscribe((value) => {
    isLoading = value
  })

	$: paginatedpools = pools.slice((currentPage - 1) * perPage, currentPage * perPage);

	function goToPage(page: number) {
		currentPage = page;
	}
</script>

<!--<style>
  .card-3d {
    border: 1px solid white;
    background: linear-gradient(145deg, #1e1e1e, #2a2a2a);
    box-shadow: 4px 4px 8px rgba(0, 0, 0, 0.5), -4px -4px 8px rgba(255, 255, 255, 0.1);
    transition: transform 0.3s ease, box-shadow 0.3s ease;
    border-radius: 10px;
    height: 200px; /* Set a fixed height */
    display: flex;
    flex-direction: column;
  }
  .card-3d:hover {
    transform: translateY(-10px);
    box-shadow: 8px 8px 16px rgba(0, 0, 0, 0.7), -8px -8px 16px rgba(255, 255, 255, 0.2);
  }
  .card-content {
    flex-grow: 1;
    overflow: hidden;
    display: flex;
    flex-direction: column;
  }
  .card-description {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 3; /* Limit to 3 lines */
    -webkit-box-orient: vertical;
  }
  .pagination-wrapper {
    margin-top: 20px;
    position: sticky;
    bottom: 0;
    width: 100%;
    background-color: #000;
    padding: 10px 0;
    text-align: center;
  }
</style>-->

<div class="flex flex-col w-full justify-center items-center space-y-80">
	<div class="max-w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-10 gap-y-72">
		{#each paginatedpools as card}
			<div class="max-w-96 max-h-10 shadow-md">
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
							<div class="line-clamp-1 text-gray-300 text-sm card-description">
								{card.description}
							</div>
						</Card.Content>
					</Card.Root>
				</a>
			</div>
		{/each}
	</div>

	<div class="pagination-wrapper">
		<Pagination.Root count={pools.length} {perPage} let:pages let:currentPage>
			<Pagination.Content>
				<Pagination.Item>
					<Pagination.PrevButton on:click={() => {
            // @ts-ignore
            goToPage(currentPage - 1)
          }} />
				</Pagination.Item>
				{#each pages as page (page.key)}
					{#if page.type === 'ellipsis'}
						<Pagination.Item>
							<Pagination.Ellipsis />
						</Pagination.Item>
					{:else}
						<Pagination.Item>
							<Pagination.Link
								{page}
								isActive={currentPage === page.value}
								on:click={() => goToPage(page.value)}
							>
								{page.value}
							</Pagination.Link>
						</Pagination.Item>
					{/if}
				{/each}
				<Pagination.Item>
					<Pagination.NextButton on:click={() => {
            // @ts-ignore
            goToPage(currentPage + 1)
          }} />
				</Pagination.Item>
			</Pagination.Content>
		</Pagination.Root>
	</div>
</div>
