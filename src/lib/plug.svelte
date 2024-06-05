<script>
	import { browser } from '$app/environment';
	import { onMount } from 'svelte';
	// @ts-ignore
	import { pioneerActor, principalStore } from '$lib/store';
	// @ts-ignore
	import { pioneer_idlFactory } from '$lib/declarations/pioneer/pioneer.did';
	// @ts-ignore
	import { Principal } from '@dfinity/principal';
	// @ts-ignore
	import icblast from "@infu/icblast";

	let pioneerid = '';

	switch (import.meta.env.MODE) {
		case 'development': {
			pioneerid = 'x2ble-2aaaa-aaaak-qiknq-cai';
			break;
		}
		case 'staging': {
			pioneerid = 'yxccl-myaaa-aaaak-qihga-cai';
			break;
		}
		case 'production': {
			pioneerid = 'ucgwg-baaaa-aaaak-qibva-cai';
			break;
		}
	};
	console.log(import.meta.env.MODE);
	// @ts-ignore
	console.log(pioneerid);

	// @ts-ignore
	const whitelist = [pioneerid];

	let isConnected = false;
	let title = 'Connect Wallet';

	const setup = async () => {
		// @ts-ignore
		let pioneer = await window.ic.plug.createActor({
			// @ts-ignore
			canisterId: pioneerid,
			interfaceFactory: pioneer_idlFactory
		});
		// @ts-ignore
		pioneerActor.set(pioneer);		
	};

	async function requestConnect() {
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
		}
	}
	// @ts-ignore
	// @ts-ignore
	// @ts-ignore
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
	
	});
</script>

<!-- svelte-ignore empty-block -->
<button
	on:click={requestConnect}
	type="button"
	class="btn justify-center self-stretch px-4 py-2 text-sm text-black bg-emerald-200 rounded"
	tabindex="0">{title}</button
>