<script lang="ts">
	import { onMount } from 'svelte';
	import { initJuno } from '@junobuild/core-peer';
	import '../app.css';

	onMount(
		async () =>
			await initJuno({
				satelliteId: import.meta.env.VITE_SATELLITE_ID,
				container: import.meta.env.VITE_CONTAINER,
				workers: {
					auth: true
				}
			})
	);
</script>

<slot />
