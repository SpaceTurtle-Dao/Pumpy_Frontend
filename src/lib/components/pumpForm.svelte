<script lang="ts">
	import { toast } from 'svelte-sonner';
	import { Input } from '$lib/components/ui/input/index.js';
	import { Textarea } from '$lib/components/ui/textarea';
	import type { Principal } from '@dfinity/principal';
	import MediumSpinner from './mediumSpinner.svelte';
	import { Button, buttonVariants } from '$lib/components/ui/button/index.js';
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import { Label } from '$lib/components/ui/label/index.js';
	import * as Select from '$lib/components/ui/select/index.js';
	import {
		loadingStore,
		poolsStore,
	} from '$lib/store/store';
	import {
		swapA,
		swapB,
		initalLiquidity,
		add,
		remove,
		info,
		balance,
		init,
		initPool
	} from '$lib/messageFactory.svelte';
	import { send, createProcess } from '$lib/process';
	import { upload } from '$lib/uploader';

	const managerId = 'jQHPzleOmT4ZJqdC0r77qKzudFjIM6d5ufjc0FX2JQI';
	//const poolId = 'NJVmhqsCZ9DDReywzE5c0Ds4RjO5CPIebcdw-dk6P0k';
	//const airToken = '2nfFJb8LIA69gwuLNcFQezSuw4CXPE4--U-j-7cxKOU';
	const waterToken = 'x7B1WmMJxh9UxRttjQ_gPZxI1BuLDmQzk3UDNgmqojM';

	interface Data {
		minter: string;
		name: string;
		ticker: string;
		description: string;
		icon: File;
		twitter: string;
		telegram: string;
		discord: string;
		website: string;
		supply: string;
		decimals: string;
		allocation: string;
		amount: string;
		token: string;
	}

	let isLoading = false;
	let isVisible = false;
	let principal: Principal;
	let buttonText = 'Show more options';
	let token = 0;
	let amountA: string;
	let amountB: string;
	let dialogOpen = false;
	let decimals = 100000000;

	let name = '';
	let ticker = '';
	let description = '';
	let telegram = '';
	let twitter = '';
	let discord = '';
	let website = '';
	let icon: FileList;
	let reader = new FileReader();
	let base64String = "";
	const tokens = [
		{ value: 0, label: 'ICP' },
		{ value: 1, label: 'ckBTC' },
		{ value: 2, label: 'ckETH' },
		{ value: 3, label: 'ckUSDC' }
	];

	reader.onload = function () {
		let result = reader.result as string
		base64String = result
		//base64String = result.replace('data:', '').replace(/^.+,/, '');
		// alert(imageBase64Stringsep);
		console.log(base64String);
	};

	const toggleVissible = () => {
		console.log('Boom');
		isVisible = !isVisible;
		if (isVisible) {
			buttonText = 'Hide more options';
		} else {
			buttonText = 'Show more options';
		}
	};

	

	/*const createToken = async () => {
		let tokenInfo = await pumpy.tokenInfo(BigInt(token));
		let _decimals = 1;
		for (let i = 0; i < Number(tokenInfo[0]?.decimals); i++) {
			_decimals = _decimals * 10;
		}
		let blob = Array.from(new Uint8Array(await icon[0].arrayBuffer()));
		let mimetype = icon[0].type;
		let tokenRequest: TokenRequest = {
			decimals: BigInt(0),
			image: { blob: blob, mimetype: mimetype },
			name: name,
			minter: principal.toString(),
			supply: BigInt(0),
			symbol: ticker,
			telegram: [telegram],
			twitter: [twitter],
			discord: [discord],
			website: [website],
			description: description
		};
		let request: PumpRequest = {
			token: BigInt(token),
			amount: [[BigInt(amountA) * BigInt(decimals), BigInt(amountB) * BigInt(_decimals)]],
			tokenRequest: tokenRequest
		};
		console.log('pump request');
		console.log(request);
		loadingStore.set(true);
		let result = await pumpy.createPools([{ PUMP: request }]);
		console.log(result);
		loadingStore.set(false);
		dialogOpen = false;
	};*/

	loadingStore.subscribe((value) => {
		isLoading = value;
	});

</script>

<div class="w-full flex flex-col justify-center items-center">
	{#if isLoading}
		<MediumSpinner />
	{:else}
		<div class="space-y-6">
			<div>
				<Label>name</Label>
				<Input
					class=" flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
					name="name"
					bind:value={name}
				/>
			</div>
			<div>
				<Label>ticker</Label>
				<Input
					class="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
					name="ticker"
					bind:value={ticker}
				/>
			</div>
			<div>
				<Label>description</Label>
				<Textarea
					class="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
					name="description"
					bind:value={description}
				/>
			</div>
			<div>
				<Label>icon</Label>
				<input
					class="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
					type="file"
					name="icon"
					id="icon"
					accept="image/png, image/jpeg, image/jpg, image/gif"
					bind:files={icon}
				/>
			</div>
			<div class="flex flex-col space-y-6">
				<Button class="w-36" variant="ghost" on:click={toggleVissible}>{buttonText}</Button>
			</div>
			{#if isVisible}
				<div>
					<Label>twitter</Label>
					<Input
						class="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
						name="twitter"
						type="url"
						bind:value={twitter}
					/>
				</div>
				<div>
					<Label>telegram</Label>
					<Input
						class="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
						name="telegram"
						type="url"
						bind:value={telegram}
					/>
				</div>
				<div>
					<Label>discord</Label>
					<Input
						class="flex h-10 rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
						name="discord"
						type="url"
						bind:value={discord}
					/>
				</div>
				<div>
					<Label>website</Label>
					<Input
						class="flex h-10  rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
						name="website"
						type="url"
						bind:value={website}
					/>
				</div>
			{/if}
			<Button
				class=""
				on:click={() => {
					dialogOpen = true;
				}}>Create Token</Button
			>
		</div>
		<div>
			<Dialog.Root bind:open={dialogOpen}>
				<Dialog.Content>
					<Dialog.Header>
						<Dialog.Title>Choose how many {ticker} you want to buy (optional)</Dialog.Title>
						<Dialog.Description>
							tip: its optional but buying a small amount of tokens helps protect your tokens from
							snipers
						</Dialog.Description>
					</Dialog.Header>
					<div class="grid gap-4 py-4">
						<div class="grid grid-cols-4 items-center gap-4">
							<Input
								type="number"
								min="0"
								bind:value={amountA}
								id="token"
								placeholder="{ticker} 0.0 (optional)"
								class="col-span-3"
							/>
							<Input
								type="number"
								min="0"
								bind:value={amountB}
								id="token"
								placeholder="0.0 (optional)"
								class="col-span-3"
							/>
							<Select.Root
								onSelectedChange={(v) => {
									if (v) {
										if (typeof v.value === 'number') {
											token = v.value;
										}
									}
								}}
								portal={null}
							>
								<Select.Trigger>
									<Select.Value placeholder="token" />
								</Select.Trigger>
								<Select.Content>
									<Select.Group>
										{#each tokens as token}
											<Select.Item value={token.value} label={token.label}
												>{token.label}</Select.Item
											>
										{/each}
									</Select.Group>
								</Select.Content>
								<Select.Input name="token" />
							</Select.Root>
						</div>
					</div>
					<Dialog.Footer>
						<Button class="" on:click={createPump}>Create Token</Button>
					</Dialog.Footer>
				</Dialog.Content>
			</Dialog.Root>
		</div>
	{/if}
</div>
