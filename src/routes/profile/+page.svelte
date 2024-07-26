<script lang="ts">
	import { onMount } from 'svelte';
	import Logo from '../../assets/luna.png';

	let user = {
		username: '@NickK_01',
		followers: 0,
		avatar: 'path_to_avatar_image',
		likes: 0,
		mentions: 0,
		publicKey: '29T7wzxCJgYneK6f8KXX1r6cMo3ywLnSNkczedP7Rg1F'
	};

	onMount(async () => {
		// Fetch user data here (keep your existing logic)
		// user = {};
	});
</script>

<div class="bg-gray-800 text-white p-6 rounded-lg shadow-lg w-full">
	<div class="flex items-center mb-4">
		<img src={Logo} alt="User avatar" class="w-16 h-16 rounded-full mr-4" />
		<div>
			<h2 class="text-2xl font-bold">{user.username}</h2>
			<p class="text-sm text-gray-400">{user.followers} followers</p>
		</div>
	</div>

	<button
		class="bg-gray-700 hover:bg-gray-600 px-4 py-2 rounded-md text-sm transition duration-300 ease-in-out"
		>Edit profile</button
	>

	<div class="mt-4 space-y-2">
		<p class="text-sm">Likes received: {user.likes}</p>
		<p class="text-sm">Mentions received: {user.mentions}</p>
	</div>

	<div class="mt-4 bg-gray-700 p-3 rounded text-xs break-all">
		{user.publicKey}
	</div>

	<nav class="mt-6">
		<ul class="flex space-x-6 text-sm">
			<li class="text-green-400 cursor-pointer">coins held</li>
			<li class="cursor-pointer hover:text-green-400">replies</li>
			<li class="cursor-pointer hover:text-green-400">notifications</li>
			<li class="cursor-pointer hover:text-green-400">coins created</li>
			<li class="cursor-pointer hover:text-green-400">followers</li>
			<li class="cursor-pointer hover:text-green-400">following</li>
		</ul>
	</nav>

	<button
		class="mt-6 border border-gray-600 hover:bg-gray-700 px-4 py-2 rounded-md text-sm transition duration-300 ease-in-out"
		>Add coin</button
	>
</div>
