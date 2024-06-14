import { writable, type Writable } from 'svelte/store';
import {type Pioneer, type PoolInfo, type TokenInfo} from '$lib/declarations/pioneer/pioneer.did';
import type { Principal } from '@dfinity/principal';

export let pioneerActor: Writable<Pioneer> = writable();
export let principalStore: Writable<Principal> = writable();
export let loadingStore: Writable<boolean> = writable();
export let poolsStore: Writable<Array<PoolInfo>> = writable();
export let tokensStore: Writable<Array<TokenInfo>> = writable();
export let balancesStore: Writable<Array<[TokenInfo, bigint]>> = writable();