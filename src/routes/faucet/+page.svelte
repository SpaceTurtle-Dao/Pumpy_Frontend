<script lang="ts">
	import { onMount } from 'svelte';
	import { Button } from '$lib/components/ui/button';
	import { Input } from '$lib/components/ui/input';

	// Dummy toast implementation
	const toast = {
		success: (message: string) => alert(`Success: ${message}`),
		error: (message: string) => alert(`Error: ${message}`)
	};

	// Dummy eligibility check
	async function isWalletEligible(walletAddress: string): Promise<boolean> {
		// Simulate checking eligibility (always eligible for now)
		await new Promise(resolve => setTimeout(resolve, 500));
		return Math.random() > 0.5; // 50% chance of being eligible
	}

	// Dummy faucet token retrieval
	async function getFaucetToken(walletAddress: string): Promise<void> {
		// Simulate token retrieval
		await new Promise(resolve => setTimeout(resolve, 1000));
		console.log(`Token sent to ${walletAddress}`);
	}

	let walletAddress = '';
	let isEligible = true;
	let isLoading = false;

	async function requestToken() {
		if (!walletAddress) {
			toast.error("Please enter a valid wallet address.");
			return;
		}

		isLoading = true;

		try {
			isEligible = await isWalletEligible(walletAddress);

			if (isEligible) {
				await getFaucetToken(walletAddress);
				toast.success("Token successfully sent to your wallet!");
			} else {
				toast.error("You have already claimed tokens in the last 24 hours. Please try again later.");
			}
		} catch (error) {
			toast.error("Failed to send token. Please try again later.");
			console.error(error);
		} finally {
			isLoading = false;
		}
	}

	onMount(() => {
		// Optionally, you can pre-fill the walletAddress if it's stored in local storage or URL params
	});
</script>

<style>
	@import url('https://fonts.googleapis.com/css2?family=Nova+Mono&display=swap');

	h1 {
		font-family: 'Nova Mono', monospace;
	}

	.text-white {
		color: white;
	}

	.button-outline {
		border: 2px solid;
		border-color: #7e22ce; /* purple-500 */
		background-color: transparent;
		color: white;
	}
</style>

<div class="min-h-screen flex flex-col justify-center items-center px-4 py-8 bg-black-400">
	<div class="w-full max-w-lg bg-gray-800 text-white rounded-lg shadow-lg p-8">
		<h1 class="text-3xl font-bold text-center mb-6 text-white">Swappy Token Faucet</h1>
		<p class="text-gray-400 text-center mb-8">Enter your wallet address to receive Swappy Tokens. You can claim tokens once every 24 hours.</p>
		
		<Input
			type="text"
			bind:value={walletAddress}
			placeholder="Paste your wallet address here"
			class="mb-4 w-full px-4 py-2 text-white rounded-lg"
		/>
		
		<Button
			on:click={requestToken}
			disabled={isLoading || !walletAddress}
			class="w-full px-4 py-2 button-outline rounded-lg hover:bg-purple-400 transition-colors duration-300"
		>
			{#if isLoading}
				<svg class="animate-spin h-5 w-5 mr-3" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
					<circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
					<path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z"></path>
				</svg>
				Processing...
			{:else}
				Get Swappy Token
			{/if}
		</Button>

		{#if !isEligible && !isLoading}
			<p class="text-red-500 text-center mt-4">You can only claim tokens once every 24 hours.</p>
		{/if}
	</div>
</div>
