import { writable } from 'svelte/store';
import { type Pioneer, type PoolInfo, type TokenInfo } from '$lib/declarations/pioneer/pioneer.did';

export let toAmount = writable(0);
export let toCurrency = writable('ETH');
export let fromAmount = writable(0);
export let fromCurrency = writable('BTC');
export let slippage = writable(0.5);
export let deadline = writable(20);
export let isExactIn = writable(true);