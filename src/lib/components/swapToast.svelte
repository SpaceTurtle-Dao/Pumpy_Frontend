<script lang="ts">
	import * as Card from '$lib/components/ui/card/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import SmallSpinner from './smallSpinner.svelte';
	import { CircleCheck, Ban, LoaderCircle } from 'lucide-svelte';
    import { toastTitleStore, toastDescriptionStore, toastSuccessStore, toastLoadingStore } from '$lib/store';
	let toastTitle = '';
	let toastDescription = '';
	let toastSuccess = false;
	let toastLoading = false;

    toastTitleStore.subscribe((value) => {
        toastTitle = value
    });

    toastDescriptionStore.subscribe((value) => {
        toastDescription = value
    });

    toastSuccessStore.subscribe((value) => {
        toastSuccess = value
    });

    toastLoadingStore.subscribe((value) => {
        toastLoading = value
    });

</script>

<div class="space-y-4">
	<h1 class="text-lg">{toastTitle}</h1>
	<p class="text-xs text-muted-foreground">
		{toastDescription}
	</p>
	<div class="flex flex-row gap-2">
		{#if toastLoading}
            <LoaderCircle class="mr-2 h-4 w-4 animate-spin" />
            <p class="text-xs text-muted-foreground">Processing Swap</p>
		{:else}
			{#if toastSuccess}
                <CircleCheck class="text-green-400" />
                <p class="text-base text-muted-foreground">Success</p>
		    {:else}
                <Ban />
                <p class="text-base text-muted-foreground">Error</p>
            {/if}
		{/if}
	</div>
</div>
