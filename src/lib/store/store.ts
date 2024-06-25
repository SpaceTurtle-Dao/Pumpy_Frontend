import { writable, type Writable } from 'svelte/store';
import { type Pumpy, type PoolInfo, type TokenInfo } from '$lib/declarations/pumpy/pumpy.did';
import type { Principal } from '@dfinity/principal';

export const pumpyActor: Writable<Pumpy> = writable();
export const principalStore: Writable<Principal> = writable();
export const loadingStore: Writable<boolean> = writable(false);
export const poolsStore: Writable<Array<PoolInfo>> = writable();
export const pumpsStore: Writable<Array<PoolInfo>> = writable();
export const tokensStore: Writable<Array<TokenInfo>> = writable();
export const balancesStore: Writable<Array<[TokenInfo, bigint]>> = writable();
