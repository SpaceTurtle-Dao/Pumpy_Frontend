<script lang="ts">
	import type { PageData } from './$types.js';
	import PumpForm from '$lib/components/pumpForm.svelte';
	import Swap from '$lib/components/swap.svelte';
	export let data: PageData;
</script>

<!-- <PumpForm form={data.form} /> -->
<Swap />
