<script lang="ts">
	import Tokens from "$lib/components/tokens.svelte"
	import Chat from "$lib/components/chat.svelte";
	import Chart from "$lib/components/chart.svelte";

	let item = {
		position: 1,
		name: 'Bitcoin',
		symbol: 'BTC',
		weight: 6
	};
	let tableArr = [item];
	let totalWeight = 100;
</script>

<div class="pr-18 pl-48">
	<div class="flex flex-row gap-x-16">
		<Chat/>
		<div>
			<Chart/>
		<Tokens/>
		</div>
	</div>
</div>