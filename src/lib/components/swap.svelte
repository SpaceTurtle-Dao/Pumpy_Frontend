<script lang="ts">
	type Token = {
		symbol: string;
		balance: number;
	};

	// on:change={(e) => selectToToken(tokens[e.target.selectedIndex])}

	let ethBalance: number = 0.038244848;
	let tokenBalance: number = 0.0;
	let amountToSwap: number = 12.0;
	let amountToReceive: number = 2124.249156;
	let selectedFromToken: Token | null = { symbol: 'SOL', balance: 0.038244848 };
	let selectedToToken: Token | null = { symbol: 'USDC', balance: 0.0 };
	let warningMessage: string = 'You need at least 0.00293516 SOL to pay for fees and deposits';
	let isWarning: boolean = true;

	const tokens: Token[] = [
		{ symbol: 'SOL', balance: 0.038244848 },
		{ symbol: 'USDC', balance: 0.0 }
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
			const rate = 177.020763; // Example rate, replace with actual logic
			amountToReceive = amountToSwap * rate;
		} else {
			amountToReceive = 0.0;
		}
	}

	function connectWallet(): void {
		// Add logic to connect wallet and fetch balances
		ethBalance = 0.038244848; // Example balance, replace with actual logic
	}

	function handleSwap(): void {
		// Add swap logic here
	}
</script>

<div class="min-h-screen bg-primary text-textPrimary flex justify-center items-center">
	<div class="w-96 bg-secondary rounded-lg p-6 shadow-lg">
		<div class="flex justify-between items-center mb-4">
			<h2 class="text-lg font-bold">Swap</h2>
			<button class="text-gray-400 hover:text-white" on:click={connectWallet}>
				<span class="material-icons">settings</span>
			</button>
		</div>

		<div class="mb-4">
			<label class="block mb-2 text-sm">You're paying</label>
			<div class="flex items-center bg-gray-700 rounded p-2 mb-2">
				<select class="bg-transparent flex-1 outline-none">
					{#each tokens as token, i}
						<option value={token.symbol} selected={token.symbol === selectedFromToken?.symbol}
							>{token.symbol}</option
						>
					{/each}
				</select>
				<input
					type="number"
					class="bg-transparent flex-1 outline-none ml-2"
					bind:value={amountToSwap}
					on:input={calculateSwapResult}
				/>
			</div>
			<div class="text-right text-sm text-gray-400">
				Balance: {selectedFromToken ? selectedFromToken.balance.toFixed(8) : 0}
			</div>
		</div>

		<div class="flex justify-center mb-4">
			<span class="material-icons">swap_vert</span>
		</div>

		<div class="mb-4">
			<label class="block mb-2 text-sm">To receive</label>
			<div class="flex items-center bg-gray-700 rounded p-2 mb-2">
				<select class="bg-transparent flex-1 outline-none">
					{#each tokens as token, i}
						<option value={token.symbol} selected={token.symbol === selectedToToken?.symbol}
							>{token.symbol}</option
						>
					{/each}
				</select>
				<input
					type="number"
					class="bg-transparent flex-1 outline-none ml-2"
					bind:value={amountToReceive}
					disabled
				/>
			</div>
			<div class="text-right text-sm text-gray-400">
				Balance: {selectedToToken ? selectedToToken.balance.toFixed(2) : 0}
			</div>
		</div>

		{#if isWarning}
			<div class="text-warning text-sm mb-4">{warningMessage}</div>
		{/if}

		<button
			class="w-full py-2 bg-red-600 rounded hover:bg-red-700"
			on:click={handleSwap}
			disabled={isWarning}>Insufficient {selectedFromToken?.symbol}</button
		>
	</div>
</div>

<!-- <script>
	let solAmount = 12;
	let usdcAmount = 2125.611638;
	let solPrice = 177.05185698;
	let usdcPrice = 1;
	let insufficientSol = true;
	let solNeeded = 0.00293516;

	function handleSwap() {
		if (!insufficientSol) {
			console.log('Swapped', solAmount, 'SOL for', usdcAmount, 'USDC');
		}
	}

	function handleMax() {
		solAmount = 0.038244848;
	}
</script>

<div class="min-h-screen bg-dark-bg text-white flex flex-col items-center justify-center">
	<header class="w-full bg-dark-card p-4 flex items-center justify-between">
		<div class="flex items-center space-x-2">
			<div class="bg-gray-600 p-2 rounded-full">
				<img src="/path/to/logo.png" alt="Logo" class="h-8 w-8" />
			</div>
			<h1 class="text-xl font-semibold">Jupiter</h1>
		</div>
		<div class="flex items-center space-x-4">
			<button class="bg-primary p-2 rounded text-sm">Priority: Fast</button>
			<div class="bg-gray-600 p-2 rounded-full">
				<img src="/path/to/avatar.png" alt="User" class="h-8 w-8" />
			</div>
		</div>
	</header>

	<main class="w-full max-w-2xl bg-dark-card p-6 rounded-lg shadow-lg mt-6">
		<div class="flex justify-between mb-4">
			<button class="bg-secondary px-4 py-2 rounded-md">Swap</button>
			<button class="bg-secondary px-4 py-2 rounded-md">Limit Order</button>
			<button class="bg-secondary px-4 py-2 rounded-md">DCA</button>
			<button class="bg-secondary px-4 py-2 rounded-md">Solana</button>
		</div>

		<div class="bg-gray-800 p-4 rounded-lg shadow-lg">
			<h1 class="text-xl font-semibold mb-4">Swap</h1>
			<div class="flex items-center mb-4">
				<div class="flex-1">
					<label for="solAmount" class="block mb-1">You're paying</label>
					<div class="flex items-center">
						<input
							id="solAmount"
							type="number"
							bind:value={solAmount}
							class="w-full p-2 bg-gray-700 rounded-md text-white"
						/>
						<button class="ml-2 p-2 bg-secondary rounded-md" on:click={handleMax}>MAX</button>
					</div>
					<p class="text-sm text-dark-text">{solAmount} SOL</p>
				</div>
			</div>
			<div class="flex items-center mb-6">
				<div class="flex-1">
					<label for="usdcAmount" class="block mb-1">To receive</label>
					<input
						id="usdcAmount"
						type="number"
						bind:value={usdcAmount}
						class="w-full p-2 bg-gray-700 rounded-md text-white"
					/>
					<p class="text-sm text-dark-text">{usdcAmount} USDC</p>
				</div>
			</div>
			<div class="bg-gray-600 p-2 rounded-md text-sm mb-4">
				<span class="bg-green-500 px-2 py-1 rounded">2 Splits + 4 Hops</span> via Lifinity, Phoenix,
				OpenBook V2, Orca
			</div>
			{#if insufficientSol}
				<div class="text-red-500 mb-4">
					You need at least {solNeeded} SOL to pay for fees and deposits
				</div>
			{/if}
			<button
				class="w-full p-3 bg-primary rounded-md text-white"
				on:click={handleSwap}
				disabled={insufficientSol}>Swap</button
			>
		</div>
	</main>

	<footer class="w-full bg-dark-card p-4 flex items-center justify-between mt-6">
		<div class="text-dark-text text-sm">1 SOL = 177.05185698 USDC</div>
		<div class="flex space-x-4">
			<div class="flex items-center space-x-2">
				<div class="bg-gray-600 p-2 rounded-full">
					<img src="/path/to/sol-logo.png" alt="SOL" class="h-6 w-6" />
				</div>
				<div class="text-sm">SOL</div>
				<div class="text-sm text-red-500">-1.91%</div>
			</div>
			<div class="flex items-center space-x-2">
				<div class="bg-gray-600 p-2 rounded-full">
					<img src="/path/to/usdc-logo.png" alt="USDC" class="h-6 w-6" />
				</div>
				<div class="text-sm">USDC</div>
				<div class="text-sm text-yellow-500">-0.01%</div>
			</div>
		</div>
	</footer>
</div> -->

<!-- <script lang="ts">
	type Token = {
		symbol: string;
		balance: number;
	};

	let ethBalance: number = 0.0;
	let tokenBalance: number = 0.0;
	let amountToSwap: number = 0.0;
	let amountToReceive: number = 0.0;
	let selectedFromToken: Token | null = null;
	let selectedToToken: Token | null = null;

	const tokens: Token[] = [
		{ symbol: 'ETH', balance: 1.234 },
		{ symbol: 'DAI', balance: 100.0 },
		{ symbol: 'USDC', balance: 50.0 }
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

	function connectWallet(): void {
		// Add logic to connect wallet and fetch balances
		ethBalance = 1.234; // Example balance, replace with actual logic
	}
</script>

<div class="p-4 bg-gray-800 rounded-lg w-96 mx-auto mt-10 text-white">
	<div class="flex justify-between items-center mb-4">
		<h2 class="text-lg font-bold">SWAP</h2>
		<button class="text-gray-400 hover:text-white" on:click={connectWallet}>
			<span class="material-icons">settings</span>
		</button>
	</div>

	<div class="mb-4">
		<label class="block mb-2 text-sm">From</label>
		<div class="flex items-center bg-gray-700 rounded p-2">
			<select class="bg-transparent flex-1 outline-none">
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
		<div class="text-right text-sm text-gray-400">
			Balance: {selectedFromToken ? selectedFromToken.balance : 0}
		</div>
	</div>

	<div class="flex justify-center mb-4">
		<span class="material-icons">swap_vert</span>
	</div>

	<div class="mb-4">
		<label class="block mb-2 text-sm">To</label>
		<div class="flex items-center bg-gray-700 rounded p-2">
			<select class="bg-transparent flex-1 outline-none">
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
		<div class="text-right text-sm text-gray-400">
			Balance: {selectedToToken ? selectedToToken.balance : 0}
		</div>
	</div>

	<div class="text-right mb-4">
		<span class="text-sm text-gray-400">~${amountToReceive.toFixed(2)}</span>
	</div>

	<button class="w-full py-2 bg-red-600 rounded hover:bg-red-700">Connect Wallet</button>
</div>

<style>
	@import 'https://fonts.googleapis.com/icon?family=Material+Icons';
</style> -->

<style>
	@import 'https://fonts.googleapis.com/icon?family=Material+Icons';
</style>
