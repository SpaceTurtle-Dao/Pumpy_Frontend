<script lang="ts">
	import Navbar from '$lib/components/navbar.svelte';
	import Footer from '$lib/components/footer.svelte';
	import FeaturedDAOs from '/Users/nickk/Documents/Pioneer_Frontend/src/lib/components/FeaturedDao.svelte';
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
<!-- <main class="container mx-auto p-6">
  <FeaturedDAOs />
</main> -->
<Card />
<Footer />


