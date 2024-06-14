import { writable } from 'svelte/store';

export let toAmount = writable(0);
export let toCurrency = writable('ETH');
export let fromAmount = writable(0);
export let fromCurrency = writable('BTC');
export let slippage = writable(0.5);
export let deadline = writable(20);
export let isExactIn = writable(true);