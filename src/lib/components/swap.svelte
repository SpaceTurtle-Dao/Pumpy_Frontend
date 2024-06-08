<script lang="ts">
	import { Artemis } from 'artemis-web3-adapter';
	import { onMount } from 'svelte';

	onMount(() => {
		selectedToToken = tokens[0];
		selectedFromToken = tokens[1];
	});

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
		{
			symbol: 'ICP',
			balance: 23709837498.249898696,
			logo: 'https://cdn.sonic.ooo/icons/ryjl3-tyaaa-aaaaa-aaaba-cai'
		},
		{
			symbol: 'ckUSDC',
			balance: 2344120230.347923907,
			logo: 'https://cdn.sonic.ooo/icons/xevnm-gaaaa-aaaar-qafnq-cai'
		},
		{
			symbol: 'ICP',
			balance: 23709837498.249898696,
			logo: 'https://cdn.sonic.ooo/icons/ryjl3-tyaaa-aaaaa-aaaba-cai'
		},
		{
			symbol: 'ckUSDC',
			balance: 2344120230.347923907,
			logo: 'https://cdn.sonic.ooo/icons/xevnm-gaaaa-aaaar-qafnq-cai'
		},
		{
			symbol: 'ICP',
			balance: 23709837498.249898696,
			logo: 'https://cdn.sonic.ooo/icons/ryjl3-tyaaa-aaaaa-aaaba-cai'
		},
		{
			symbol: 'ckUSDC',
			balance: 2344120230.347923907,
			logo: 'https://cdn.sonic.ooo/icons/xevnm-gaaaa-aaaar-qafnq-cai'
		},
		{
			symbol: 'ICP',
			balance: 23709837498.249898696,
			logo: 'https://cdn.sonic.ooo/icons/ryjl3-tyaaa-aaaaa-aaaba-cai'
		},
		{
			symbol: 'ckUSDC',
			balance: 2344120230.347923907,
			logo: 'https://cdn.sonic.ooo/icons/xevnm-gaaaa-aaaar-qafnq-cai'
		}
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
		try {
			const connectObj = { whitelist: ['ryjl3-tyaaa-aaaaa-aaaba-cai'], host: 'https://icp0.io/' };
			const artemisWalletAdapter = new Artemis();
			var res = artemisWalletAdapter.connect('plug', connectObj);
			console.log(res);
		} catch (error) {
			console.error(error);
		}
	}
</script>

<div class="min-h-screen flex flex-col justify-center items-center">
	<div class="w-120 bg-surface-500 rounded-lg p-9 shadow-lg">
		<div class="flex justify-between items-center mb-4">
			<button class="text-primary-700 hover:text-primary-500" on:click={() => {}}>
				<span class="material-icons">refresh</span>
			</button>
			<div class="flex items-center space-x-2">
				<button class="text-primary-700 hover:text-primary-500">
					<span class="material-icons">percent</span>
				</button>
				<button class="text-primary-700 hover:text-primary-500">
					<span class="material-icons">settings</span>
				</button>
			</div>
		</div>

		<div class="mb-4">
			<label class="block mb-2 text-sm">You're paying</label>
			<div class="flex items-center bg-dark-gray rounded-xl p-3 space-x-2 w-full max-w-lg">
				<div class="relative flex items-center bg-custom-green text-white rounded-full px-4 py-2">
					<img src={selectedToToken?.logo} alt={selectedToToken?.symbol} class="w-6 h-6 mr-2" />
					<span>{selectedToToken?.symbol}</span>
					<span class="material-icons ml-2 text-custom-green-light">expand_more</span>
					<select
						class="absolute inset-0 opacity-0 w-full cursor-pointer"
						on:change={(e) => console.log(e)}
					>
						{#each tokens as token}
							<option value={token.symbol} selected={token.symbol === ''}>{token.symbol}</option>
						{/each}
					</select>
				</div>
				<input
					class="input bg-secondary-800 text-secondary text-right flex-1"
					type="text"
					placeholder="0.00"
				/>
			</div>
		</div>

		<div class="flex justify-center mb-4 text-primary-400 hover:text-primary-500">
			<span class="material-icons">swap_vert</span>
		</div>

		<div class="mb-4">
			<label class="block mb-2 text-sm">To receive</label>
			<div class="flex items-center bg-dark-gray rounded-xl p-3 space-x-2 w-full max-w-lg">
				<div class="relative flex items-center bg-secondary-600 text-white rounded-full px-4 py-1">
					<img src={selectedToToken?.logo} alt={selectedToToken?.symbol} class="w-6 h-6 mr-2" />
					<span>{selectedToToken?.symbol}</span>
					<span class="material-icons ml-2 text-custom-green-light">expand_more</span>
					<select
						class="absolute inset-0 opacity-0 w-full cursor-pointer"
						on:change={(e) => console.log(e)}
					>
						{#each tokens as token}
							<option value={token.symbol} selected={token.symbol === ''}>{token.symbol}</option>
						{/each}
					</select>
				</div>
				<input
					class="input bg-secondary-800 text-secondary text-right flex-1"
					type="text"
					placeholder="0.00"
				/>
				<!-- <input
					type="number"
					class="bg-transparent text-white text-right flex-1 outline-none"
					bind:value={amountToSwap}
					min="0"
				/> -->
			</div>
		</div>

		<button class="w-full py-2 bg-green-600 rounded hover:bg-green-700" on:click={connectWallet}
			>Connect Wallet</button
		>
	</div>

	<div class="mt-6 w-96 text-textSecondary">
		<div class="flex items-center justify-between">
			<div class="flex items-center space-x-2">
				<img src={tokens[0].logo} alt="USDC" class="w-6 h-6" />
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
				<img src={tokens[1].logo} alt="Mail" class="w-6 h-6" />
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

	.bg-dark-gray {
		background-color: #13151b; /* Dark Gray */
	}
	.bg-custom-green {
		background-color: #243c29; /* Custom Green */
	}
	.text-custom-green-light {
		color: #8cd98c; /* Light Green */
	}
	.rounded-xl {
		border-radius: 12px;
	}
	.rounded-full {
		border-radius: 9999px;
	}
</style>
