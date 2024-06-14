<script lang="ts">
	import Navbar from '$lib/components/navbar.svelte';
	import Footer from '$lib/components/footer.svelte';
	import FeaturedDAOs from '$lib/components/FeaturedDao.svelte';
	import { onMount } from 'svelte';
	import { initJuno } from '@junobuild/core-peer';
	import '../app.css';
	import { env } from '$env/dynamic/public'
	import Card from '$lib/components/card.svelte';
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

<div class="bg-black min-h-screen p-10">
  <div class="flex space-x-6">
    <Card />
    <Card />
    <Card />
  </div>
</div>
<Footer />


