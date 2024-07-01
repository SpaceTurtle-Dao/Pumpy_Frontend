<script lang="ts">
	import Navbar from '$lib/components/navbar.svelte';
	import { onMount } from 'svelte';
	import { initJuno } from '@junobuild/core-peer';
	import '../app.css';
	import { env } from '$env/dynamic/public'
	import { Toaster } from "$lib/components/ui/sonner";
	import Footer from '$lib/components/footer.svelte';
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

<Navbar />

<div class="min-h-screen p-10">
  <div class="flex space-x-6">
	<Toaster />
    <slot />
  </div>
</div>
<Footer />


