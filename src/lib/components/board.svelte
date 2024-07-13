<script lang="ts">
	import { onMount } from 'svelte';
	import * as Card from '$lib/components/ui/card';
	import * as Pagination from '$lib/components/ui/pagination';
	import type { Pool } from '$lib/models/Pool.svelte';
	import { pumpsStore } from '$lib/store/store';

	let pools: Array<Pool> = [];
	let currentPage = 1;
	const perPage = 9;
	let totalPages: number;
	let paginatedCards: Array<Pool> = [];
	pumpsStore.subscribe((value) => {
		pools = value;
		totalPages = Math.ceil(pools.length / perPage);
		paginatedCards = pools.slice((currentPage - 1) * perPage, currentPage * perPage);
	});

	onMount(() => {});

	function goToPage(page: number) {
		currentPage = page;
	}
</script>

<div class="flex flex-col w-full justify-center items-center space-y-8 md:space-y-12 lg:space-y-16">
	<div
		class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-4 gap-y-8 md:gap-x-6 md:gap-y-12 lg:gap-x-8 lg:gap-y-16"
	>
		{#each paginatedCards as card}
			<div class="w-full shadow-md">
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
</div>
