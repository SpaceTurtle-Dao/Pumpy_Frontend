import { writable } from 'svelte/store';
import { type Pumpy, type PoolInfo, type TokenInfo } from '$lib/declarations/pumpy/pumpy.did';

export let toAmount = writable(0);
export let fromAmount = writable(0);
export let toCurrency = writable<TokenInfo | null>(null);
export let fromCurrency = writable<TokenInfo | null>(null);
export let slippage = writable(0.5);
export let deadline = writable(10); //seconds
export let isExactIn = writable(true);