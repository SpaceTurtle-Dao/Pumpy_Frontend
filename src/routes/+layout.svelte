<script lang="ts">
	import Navbar from '$lib/components/navbar.svelte';
	import { onMount } from 'svelte';
	import { initJuno } from '@junobuild/core-peer';
	import '../app.css';
	import { env } from '$env/dynamic/public';
	import { Toaster } from '$lib/components/ui/sonner';
	let satelliteId = env.PUBLIC_SATELLITE;

	onMount(
		async () =>
			await initJuno({
				satelliteId: satelliteId || 'g535m-yaaaa-aaaal-ajiia-cai',
				container: import.meta.env.VITE_CONTAINER,
				workers: {
					auth: true
				}
			})
	);
</script>

<div class="p-3 md:p-5 flex flex-col gap-2.5 max-w-[1440px] mx-auto min-h-[100vh]">
	<Toaster />
	<Navbar />
	<slot />
</div>
