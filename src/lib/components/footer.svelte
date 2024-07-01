<script lang="ts">
	import Logo from '../../assets/sunny.jpeg';
	// Add any necessary script logic here
</script>

<footer class="bg-white text-gray-500 p-4 flex justify-center">
	<div class="flex items-center space-x-12">
		<a href="/docs" class="hover:text-gray-700">DOCS</a>
		<a href="/debug" class="hover:text-gray-700">DEBUG</a>
		<div class="flex flex-col items-center mx-12">
			<img src={Logo} alt="Logo" class="h-8 w-8 mb-2" />
			<span class="font-bold text-xl text-black">Fundit.fun</span>
		</div>
		<a href="www.x.com" class="hover:text-gray-700">TWITTER</a>
		<a href="www.discord.com" class="hover:text-gray-700">DISCORD</a>
	</div>
</footer>

<style global>
	@import 'https://cdn.jsdelivr.net/npm/tailwindcss@2.2.19/dist/tailwind.min.css';
</style>
