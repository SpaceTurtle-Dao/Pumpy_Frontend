import { writable, type Writable } from 'svelte/store';
import {type Pumpy, type PoolInfo, type TokenInfo} from '$lib/declarations/pumpy/pumpy.did';
import type { Principal } from '@dfinity/principal';

export let pumpyActor: Writable<Pumpy> = writable();
export let principalStore: Writable<Principal> = writable();
export let loadingStore: Writable<boolean> = writable(false);
export let poolsStore: Writable<Array<PoolInfo>> = writable();
export let pumpsStore: Writable<Array<PoolInfo>> = writable();
export let tokensStore: Writable<Array<TokenInfo>> = writable();
export let balancesStore: Writable<Array<[TokenInfo, bigint]>> = writable();