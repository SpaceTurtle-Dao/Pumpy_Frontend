<script lang="ts">
	import { onMount } from 'svelte';
	import { initJuno } from '@junobuild/core-peer';
	import '../app.css';
	import { env } from '$env/dynamic/public'
	let satelliteId = env.PUBLIC_SATELLITE;
	onMount(
		async () =>
			await initJuno({
				satelliteId: satelliteId || "g535m-yaaaa-aaaal-ajiia-cai",
				container: import.meta.env.VITE_CONTAINER,
				workers: {
					auth: true
				}
			})
	);
</script>

<slot />
