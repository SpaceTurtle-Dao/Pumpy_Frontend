<script>
	const links = [
		{ text: 'Pricing', href: '#' },
		{ text: 'Forum', href: '#' },
		{ text: 'Careers', href: '#' },
		{ text: 'Blog', href: '#' },
		{ text: 'Changelog', href: '#' },
		{ text: 'Privacy Policy', href: '#' },
		{ text: 'Terms of Service', href: '#' },
		{ text: 'Twitter', href: '#' },
		{ text: 'Company', href: '#' }
	];
</script>

<footer class="bg-black text-white py-4 px-6">
	<div class="container mx-auto">
		<div class="flex flex-col md:flex-row justify-between items-start md:items-center">
			<div class="flex items-center mb-4 md:mb-0">
				<img src="/path-to-your-logo.svg" alt="Cursor logo" class="h-8 w-8 mr-2" />
				<span class="text-xl font-bold">CURSOR</span>
			</div>
			<nav class="grid grid-cols-2 md:grid-cols-3 gap-x-8 gap-y-2">
				{#each links as link}
					<a href={link.href} class="hover:text-gray-300 transition-colors">{link.text}</a>
				{/each}
			</nav>
		</div>
		<div class="mt-6 flex flex-col md:flex-row justify-between items-center text-sm text-gray-400">
			<span>hi@cursor.com</span>
			<div class="mt-2 md:mt-0">
				<span class="mr-4">Made by Anysphere</span>
				<span>SOC 2 Certified</span>
			</div>
		</div>
	</div>
</footer>
