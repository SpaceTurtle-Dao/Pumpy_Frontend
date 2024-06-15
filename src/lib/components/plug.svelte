<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';

	// @ts-ignore
	import {
		pioneerActor,
		principalStore,
		loadingStore,
		poolsStore,
		tokensStore,
		balancesStore
	} from '$lib/store/store';
	import { pioneer_idlFactory } from '$lib/declarations/pioneer/pioneer.did';
	// @ts-ignore
	import { Principal } from '@dfinity/principal';
	// @ts-ignore
	import icblast from '@infu/icblast';
	import SmallSpinner from '$lib/components/smallSpinner.svelte';
	import { PIONEER_ID } from '$lib/common/constants';

	console.log(import.meta.env.MODE);

	const whitelist = [PIONEER_ID];

	let isConnected = false;
	let title = 'Connect Wallet';
	let isLoading = false;
	const setup = async () => {
		let ic = icblast();
		let pioneerQuery = await ic(PIONEER_ID);

		// @ts-ignore
		let pioneer = await window.ic.plug.createActor({
			canisterId: PIONEER_ID,
			interfaceFactory: pioneer_idlFactory
		});

		// @ts-ignore
		// console.log(pioneer.createCoin());
		let tokens = await pioneerQuery.fetchTokens();
		let pools = await pioneerQuery.fetchPools();
		let balances = await pioneer.fetchBalances();
		pioneerActor.set(pioneer);
		tokensStore.set(tokens);
		poolsStore.set(pools);
		balancesStore.set(balances);
	};

	async function requestConnect() {
		isLoading = true;
		title = 'Connecting';
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
			title = principal.toString().substring(0, 5) + '...' + principal.toString().substring(37, 42);
		} catch (e) {
			console.log(e);
		}
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
					await requestConnect();
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
		let pioneerQuery = await ic(PIONEER_ID);
		// @ts-ignore
		let tokens = await pioneerQuery.fetchTokens();
		let pools = await pioneerQuery.fetchPools();
		tokensStore.set(tokens);
		poolsStore.set(pools);
		console.log(tokens);
		console.log(pools);
	});
</script>

<!-- svelte-ignore empty-block -->
<button
	on:click={requestConnect}
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
