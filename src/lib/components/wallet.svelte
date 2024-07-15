<script>
	import SmallSpinner from '$lib/components/smallSpinner.svelte';
	const connectWallet = async () => {
		title = "Connecting";
		isLoading = true;
		// @ts-ignore
		await window.arweaveWallet
			.connect(
				// request permissions to read the active address
				[
					'ACCESS_ADDRESS',
					'ACCESS_PUBLIC_KEY',
					'ACCESS_ALL_ADDRESSES',
					'SIGN_TRANSACTION',
					'ENCRYPT',
					'DECRYPT',
					'SIGNATURE',
					'ACCESS_ARWEAVE_CONFIG',
					'DISPATCH'
				],
				// provide some extra info for our app
				{
					name: 'Super Cool App',
					logo: 'https://arweave.net/jAvd7Z1CBd8gVF2D6ESj7SMCCUYxDX_z3vpp5aHdaYk'
				},
				// custom gateway
				{
					host: 'g8way.io',
					port: 443,
					protocol: 'https'
				}
			)
			// @ts-ignore
			.then(console.log)
			.catch(console.error);
			title = "Connect Wallet";
			isLoading = false;
	};
	let title = 'Connect Wallet';
	let isLoading = false;
</script>

<!-- svelte-ignore empty-block -->
<button
	on:click={connectWallet}
	type="button"
	class="btn justify-center self-stretch px-4 py-2 text-sm text-black bg-emerald-200 rounded"
	tabindex="0"
>
	{#if isLoading}
		<div class="flex flex-row">
			{title}
			<div class="pl-2"><div class="pt-0.5"><SmallSpinner /></div></div>
		</div>
	{:else}
		{title}
	{/if}
</button>


