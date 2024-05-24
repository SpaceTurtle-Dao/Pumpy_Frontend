<script>
	import { onMount } from 'svelte';
	import '../../app.css'; // Import our Tailwind CSS styles

	let isMounted = false;

	onMount(() => {
		isMounted = true;
	});

	function handleLaunchApp() {
		console.log('Launching app!');
	}
</script>

<div class="flex h-screen">
	<div class="w-1/2 flex justify-center items-center pt-20">
		<!-- App name and launch button -->
		<h1 class="text-3xl font-bold">Simple Secure Swap</h1>
		<button
			on:click={handleLaunchApp}
			class="bg-orange-500 hover:bg-orange-700 text-white font-bold py-2 px-4 rounded"
		>
			Launch App
		</button>
	</div>

	<div class="w-1/2 flex justify-center items-center pt-20">
		<!-- Image on the right side -->
		<img src="https://via.placeholder.com/400x250" alt="App image" />
	</div>
</div>

<!-- Minimal app bar -->
<nav class="bg-gray-200 py-4 text-gray-700">
	<ul>
		<li><a href="#">Home</a></li>
		<li><a href="#">About</a></li>
		<li><a href="#">Contact</a></li>
	</ul>
</nav>

<!-- Footer -->
<footer class="bg-gray-200 py-4 text-gray-700">&copy; 2023 App Name</footer>
