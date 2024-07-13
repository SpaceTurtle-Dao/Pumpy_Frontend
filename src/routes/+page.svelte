<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import TokenData from '$lib/models/TokenData.svelte';
	import Tag from '$lib/models/Tag.svelte';
	import {
		swapA,
		swapB,
		initalLiquidity,
		add,
		remove,
		info,
		balance,
		init,
		initPool,
		pumps
	} from '$lib/messageFactory.svelte';
	import { send, createProcess } from '$lib/process';

	// @ts-ignore
	import { connect, createDataItemSigner, spawn, monitor, unmonitor } from '@permaweb/aoconnect';
	// @ts-ignore


	const managerId = 'jQHPzleOmT4ZJqdC0r77qKzudFjIM6d5ufjc0FX2JQI';
	const airToken = '2nfFJb8LIA69gwuLNcFQezSuw4CXPE4--U-j-7cxKOU';
	const waterToken = 'x7B1WmMJxh9UxRttjQ_gPZxI1BuLDmQzk3UDNgmqojM';

	
</script>

<!--<Button on:click={createPool}>createPool</Button>
<Button on:click={spawnedCount}>SpawnedCount</Button>
<Button on:click={swapTokenA}>SwapA</Button>
<Button on:click={swapTokenB}>SwapB</Button>-->
<!--<Button on:click={addInitalLiquidity}>InitalLiquidity</Button>
<Button on:click={addLiquidity}>Add</Button>
<Button on:click={removeLiquidity}>Remove</Button>--->
