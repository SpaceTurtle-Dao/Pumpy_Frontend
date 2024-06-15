<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	// @ts-ignore
	import { pumpyActor,principalStore,loadingStore,poolsStore,tokensStore,balancesStore } from '$lib/store';
	import { pumpy_idlFactory } from '$lib/declarations/pumpy/pumpy.did';
	// @ts-ignore
	import { Principal } from '@dfinity/principal';
	// @ts-ignore
	import icblast from "@infu/icblast";
	import SmallSpinner from '$lib/components/smallSpinner.svelte';

	let pumpyCanisterId = '';

	switch (import.meta.env.MODE) {
		case 'development': {
			pumpyCanisterId = 'x2ble-2aaaa-aaaak-qiknq-cai';
			break;
		}
		case 'staging': {
			pumpyCanisterId = 'ucgwg-baaaa-aaaak-qibva-cai';
			break;
		}
		case 'production': {
			pumpyCanisterId = 'yxccl-myaaa-aaaak-qihga-cai';
			break;
		}
	};
	console.log(import.meta.env.MODE);
	console.log(pumpyCanisterId);

	const whitelist = [pumpyCanisterId];

	let isConnected = false;
	let title = 'Connect Wallet';
	let isLoading = false;
	const setup = async () => {
		let ic = icblast();
		let pumpyQuery = await ic(pumpyCanisterId);
		
		// @ts-ignore
		let pumpy = await window.ic.plug.createActor({
			canisterId: pumpyCanisterId,
			interfaceFactory: pumpy_idlFactory
		});
		
		// @ts-ignore
		let tokens = await pumpyQuery.fetchTokens();
		let pools = await pumpyQuery.fetchPools();
		let balances = await pumpy.fetchBalances()
		pumpyActor.set(pumpy);
		tokensStore.set(tokens);
		poolsStore.set(pools);
		balancesStore.set(balances);
		
	};

	async function requestConnect() {
		isLoading = true;
		title = "Connecting";
		try {
			// @ts-ignore
			await window.ic.plug.requestConnect([whitelist]);
			// @ts-ignore
			let principal = await window.ic.plug.agent.getPrincipal();
			console.log(principal.toString());
			principalStore.set(principal);
			await setup();
			isConnected = true;
			// @ts-ignore
			title = principal.toString().substring(0, 13) + '...';
		} catch (e) {
			console.log(e);
		};
		isLoading = false;
	}
	// @ts-ignore
	async function disconnect() {
		try {
			// @ts-ignore
			principal = await window.ic.plug.disconnect([whitelist]);
			title = 'Connect Wallet';
		} catch (e) {
			console.log(e);
		}
	}
	// @ts-ignore
	async function _isConnected() {
		if (browser) {
			try {
				// @ts-ignore
				isConnected = await window.ic.plug.isConnected();
				if (isConnected) {
					// @ts-ignore
					let _principal = await window.ic.plug.agent.getPrincipal();
					principalStore.set(_principal);
					await setup();
					// @ts-ignore
					title = _principal.toString().substring(0, 13) + '...';
					console.log(
						// @ts-ignore
						_principal.toString()
					);
				} else {
					await requestConnect()
				}
			} catch (e) {
				await requestConnect();
			}
		} else {
			false;
		}
	}
	// @ts-ignore
	function logout() {
		try {
		} catch (e) {
			console.log(e);
		}
	}
	onMount(async () => {
		let ic = icblast();
		let pumpyQuery = await ic(pumpyCanisterId);
		// @ts-ignore
		let tokens = await pumpyQuery.fetchTokens();
		let pools = await pumpyQuery.fetchPools();
		tokensStore.set(tokens);
		poolsStore.set(pools);
		console.log(tokens)
		console.log(pools)
	});
</script>

<!-- svelte-ignore empty-block -->
<button
	on:click={requestConnect}
	type="button"
	class="btn justify-center self-stretch px-4 py-2 text-sm text-black bg-emerald-200 rounded"
	tabindex="0">
	{#if isLoading}
	<div class="flex flex-row">{title } <div class="pl-2"><div class="pt-0.5"><SmallSpinner/></div></div></div>
	{:else}
	{title}
	{/if}
	</button
>
