<script>
	let showMenu = false;
</script>

<header class=" text-white p-4 flex justify-between items-center">
	<div class="flex items-center">
		<!-- <img src="cursor-logo.svg" alt="SwapBox" class="w-10 h-10 mr-2" /> -->
		<h1 class="text-xl font-bold">SwapBox</h1>
	</div>

	<!-- <button class="md:hidden" on:click={() => (showMenu = !showMenu)}>
		<svg
			xmlns="http://www.w3.org/2000/svg"
			class="h-6 w-6"
			fill="none"
			viewBox="0 0 24 24"
			stroke="currentColor"
		>
			<path
				stroke-linecap="round"
				stroke-linejoin="round"
				stroke-width="2"
				d="M4 6h16M4 12h16M4 18h16"
			/>
		</svg>
	</button> -->

	<nav class="hidden md:flex">
		<ul class="flex space-x-6">
			<li>
				<a href="/swap" class="hover:text-gray-400">Swap</a>
			</li>
			<li>
				<a href="/create" class="hover:text-gray-400">Create</a>
			</li>
			<li>
				<a href="/docs" class="hover:text-gray-400">Docs</a>
			</li>
			<li>
				<a href="/blog" class="hover:text-gray-400">Blog</a>
			</li>
		</ul>
	</nav>

	<div class="hidden md:flex">
		<ul class="flex space-x-4">
			<li>
				<a href="/github" class="hover:text-gray-400">G</a>
			</li>
			<li>
				<a href="/discord" class="hover:text-gray-400">D</a>
			</li>
			<li>
				<a href="/x.com" class="hover:text-gray-400">X</a>
			</li>
		</ul>
	</div>
</header>

<div class=" p-4">
	<div class="text-center text-secondary font-light text-sm">Trade Carefully !!!</div>
</div>

<div
	class="hidden md:hidden absolute top-12 right-4 z-10 bg-gray-900 text-white p-4 rounded-md shadow-md"
	class:hidden={!showMenu}
>
	<ul class="flex flex-col space-y-4">
		<li>
			<a href="/swap" class="hover:text-gray-400">Swap</a>
		</li>
		<li>
			<a href="/create" class="hover:text-gray-400">Create</a>
		</li>
		<li>
			<a href="/docs" class="hover:text-gray-400">Docs</a>
		</li>
		<li>
			<a href="/blog" class="hover:text-gray-400">Blog</a>
		</li>
	</ul>
</div>

<footer class=" text-white p-4 text-center">
	<p class="text-sm">&copy; 2024 SwapBox. All rights reserved.</p>
</footer>
