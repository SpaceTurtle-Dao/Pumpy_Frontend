<script>
	let stats = [
		{ label: 'Users', value: '78.4K' },
		{ label: 'Projects', value: '27' },
		{ label: 'Files', value: '101' },
		{ label: 'Storage', value: '32' }
	];
</script>

// delete not used

<main class="bg-gray-100 min-h-screen">
	<header class="bg-white py-4 px-6 flex justify-between items-center shadow-md">
		<a href="#" class="flex items-center">
			<img src="cursor-logo.svg" alt="Cursor" class="w-8 h-8 mr-2" />
			<h1 class="text-lg font-bold">Cursor</h1>
		</a>
		<nav class="flex space-x-4">
			<a href="#" class="hover:text-gray-600">Home</a>
			<a href="#" class="hover:text-gray-600">Pricing</a>
			<a href="#" class="hover:text-gray-600">Blog</a>
			<button class="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded">
				Get Started
			</button>
		</nav>
	</header>

	<section class="container mx-auto py-16">
		<div class="text-center">
			<h1 class="text-4xl font-bold text-gray-800 mb-4">Your gateway to Arweave</h1>
			<p class="text-gray-600 text-lg max-w-xl mx-auto mb-8">
				A global, decentralised storage network built for permanence and truly lasting digital
				preservation.
			</p>
			<div class="flex justify-center space-x-4 mb-12">
				<button class="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded">
					Learn More
				</button>
				<button class="bg-indigo-500 hover:bg-indigo-600 text-white font-bold py-2 px-4 rounded">
					Get Started
				</button>
			</div>
		</div>

		<div class="grid grid-cols-1 md:grid-cols-4 gap-6">
			{#each stats as stat}
				<div class="bg-white rounded-md shadow-md p-6 text-center">
					<h2 class="text-xl font-bold text-gray-800 mb-2">{stat.label}</h2>
					<p class="text-gray-600 text-2xl font-bold">{stat.value}</p>
				</div>
			{/each}
		</div>
	</section>

	<footer class="bg-gray-800 text-white p-4 text-center">
		<p class="text-sm">&copy; 2023 Cursor. All rights reserved.</p>
	</footer>
</main>
