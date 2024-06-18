<script lang="ts">
	import type { PageData } from './$types.js';
	import PumpForm from '$lib/components/pumpForm.svelte';
	export let data: PageData;
</script>

<PumpForm form={data.form} />
