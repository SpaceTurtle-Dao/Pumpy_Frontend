import { writable } from 'svelte/store';

export const toAmount = writable(0);
export const toCurrency = writable('ETH');

export const fromAmount = writable(0);
export const fromCurrency = writable('BTC');


export const slippage = writable(0.5);

export const deadline = writable(20);

export const isExactIn = writable(true);