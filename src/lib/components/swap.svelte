<script lang="ts">
	type Token = {
		symbol: string;
		balance: number;
		logo: string;
	};

	let ethBalance: number = 0.0;
	let tokenBalance: number = 0.0;

	let amountToSwap: number = 0.0;
	let amountToReceive: number = 0.0;

	let selectedFromToken: Token | null = null;
	let selectedToToken: Token | null = null;

	const tokens: Token[] = [
		{ symbol: 'USDC', balance: 100.0, logo: 'path/to/usdc.png' },
		{ symbol: 'Mail', balance: 50.0, logo: 'path/to/mail.png' }
		// Add more tokens as needed
	];

	function selectFromToken(token: Token): void {
		selectedFromToken = token;
		calculateSwapResult();
	}

	function selectToToken(token: Token): void {
		selectedToToken = token;
		calculateSwapResult();
	}

	function calculateSwapResult(): void {
		if (selectedFromToken && selectedToToken && amountToSwap > 0) {
			// Example swap logic
			const rate = 1; // Example rate, replace with actual logic
			amountToReceive = amountToSwap * rate;
		} else {
			amountToReceive = 0.0;
		}
	}

	function connectWallet(): void {}
</script>

<div class="min-h-screen bg-primary flex flex-col justify-center items-center">
	<div class="w-96 bg-secondary rounded-lg p-6 shadow-lg">
		<div class="flex justify-between items-center mb-4">
			<button class="text-gray-400 hover:text-gray-600" on:click={connectWallet}>
				<span class="material-icons">refresh</span>
			</button>
			<div class="flex items-center space-x-2">
				<button class="text-gray-400 hover:text-gray-600">
					<span class="material-icons">percent</span>
				</button>
				<button class="text-gray-400 hover:text-gray-600">
					<span class="material-icons">settings</span>
				</button>
			</div>
		</div>

		<div class="mb-4">
			<label class="block mb-2 text-sm">You're paying</label>
			<div class="flex items-center bg- rounded p-2">
				<select
					class="bg-transparent flex-1 outline-none"
					on:change={(e) => selectFromToken(tokens[0])}
				>
					<option disabled selected>Select Token</option>
					{#each tokens as token}
						<option value={token.symbol}>{token.symbol}</option>
					{/each}
				</select>
				<input
					type="number"
					class="bg-transparent flex-1 outline-none ml-2"
					bind:value={amountToSwap}
					on:input={calculateSwapResult}
				/>
			</div>
		</div>

		<div class="flex justify-center mb-4">
			<span class="material-icons">swap_vert</span>
		</div>

		<div class="mb-4">
			<label class="block mb-2 text-sm">To receive</label>
			<div class="flex items-center bg-primary rounded p-2">
				<select
					class="bg-transparent flex-1 outline-none"
					on:change={(e) => selectToToken(tokens[0])}
				>
					<option disabled selected>Select Token</option>
					{#each tokens as token}
						<option value={token.symbol}>{token.symbol}</option>
					{/each}
				</select>
				<input
					type="number"
					class="bg-transparent flex-1 outline-none ml-2"
					bind:value={amountToReceive}
					disabled
				/>
			</div>
		</div>

		<button class="w-full py-2 bg-green-600 rounded hover:bg-green-700" on:click={connectWallet}
			>Connect Wallet</button
		>
	</div>

	<div class="mt-6 w-96 text-textSecondary">
		<div class="flex items-center justify-between">
			<div class="flex items-center space-x-2">
				<img src="path/to/sunny.png" alt="USDC" class="w-6 h-6" />
				<div>
					<p>USDC</p>
					<p class="text-xs">USD Coin</p>
				</div>
			</div>
			<div class="flex items-center space-x-2">
				<p>1</p>
				<p class="text-green-500">0%</p>
			</div>
		</div>
		<div class="flex items-center justify-between mt-2">
			<div class="flex items-center space-x-2">
				<img src="path/to/usdc.png" alt="Mail" class="w-6 h-6" />
				<div>
					<p>Mail</p>
					<p class="text-xs">SolMail</p>
				</div>
			</div>
			<div class="flex items-center space-x-2">
				<p>N/A</p>
				<p class="text-red-500">-7.17%</p>
			</div>
		</div>
	</div>
</div>

<style>
	@import 'https://fonts.googleapis.com/icon?family=Material+Icons';
</style>
