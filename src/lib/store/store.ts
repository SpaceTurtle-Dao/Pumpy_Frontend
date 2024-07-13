import { writable, type Writable } from 'svelte/store';
import type { Pool } from '$lib/models/Pool.svelte';

export const loadingStore: Writable<boolean> = writable(false);
export const poolsStore: Writable<Array<Pool>> = writable([]);
export const pumpsStore: Writable<Array<Pool>> = writable([]);
