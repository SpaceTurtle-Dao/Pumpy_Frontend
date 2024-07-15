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

<div class="flex flex-col w-full justify-center items-center space-y-4 sm:space-y-6 md:space-y-8 lg:space-y-10 px-2 sm:px-4">
    <div
        class="w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 md:gap-8"
    >
        {#each paginatedCards as card}
            <div class="w-full">
                <a href="/{card.id}" class="block h-full">
                    <Card.Root class="card-3d text-white p-2 sm:p-3 md:p-4 shadow-md h-full flex flex-col overflow-hidden relative">
                        <!-- King of the Hill Text -->
                        <div class="absolute top-0 left-0 right-0 bg-yellow-400 text-white text-xs font-bold py-1 px-2 text-center transform -translate-y-full">
                            King of the Hill
                        </div>
                        <Card.Header class="flex items-center space-x-2 mb-2">
                            <div class="relative">
                                <img src={card.image} alt={card.ticker} class="w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 rounded-full flex-shrink-0" />
                            </div>
                            <div class="flex-1 min-w-0">
                                <span class="text-xs sm:text-sm text-gray-400 block truncate">Created by {card.createdBy}</span>
                                <div class="text-green-400 font-semibold text-xs truncate">Market cap: {card.marketCap}</div>
                            </div>
                        </Card.Header>
                        <Card.Content class="flex-grow overflow-hidden">
                            <div class="font-semibold text-sm sm:text-base md:text-lg mb-1 sm:mb-2 truncate">{card.ticker}</div>
                            <div class="line-clamp-2 text-gray-300 text-xs sm:text-sm">
                                {card.description}
                            </div>
                        </Card.Content>
                    </Card.Root>
                </a>
            </div>
        {/each}
    </div>

    <div class="pagination-wrapper w-full overflow-x-auto py-2 sm:py-4">
        <Pagination.Root count={pools.length} {perPage} let:pages let:currentPage>
            <Pagination.Content class="flex justify-center items-center space-x-1 sm:space-x-2">
                <Pagination.Item class="hidden sm:block">
                    <Pagination.PrevButton
                        on:click={() => {
                            // @ts-ignore
                            goToPage(currentPage - 1);
                        }}
                        class="px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm bg-gray-700 rounded hover:bg-gray-600 transition-colors"
                    />
                </Pagination.Item>
                {#each pages as page (page.key)}
                    {#if page.type === 'ellipsis'}
                        <Pagination.Item class="hidden sm:block">
                            <Pagination.Ellipsis class="px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm" />
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
                                class="px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm rounded transition-colors
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
                        class="px-2 py-1 sm:px-3 sm:py-2 text-xs sm:text-sm bg-gray-700 rounded hover:bg-gray-600 transition-colors"
                    />
                </Pagination.Item>
            </Pagination.Content>
        </Pagination.Root>
    </div>
</div>