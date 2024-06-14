import { writable, type Writable } from 'svelte/store';
import {type Pioneer} from '$lib/declarations/pioneer/pioneer.did';
import type { Principal } from '@dfinity/principal';

export let pioneerActor: Writable<Pioneer> = writable();
export let principalStore: Writable<Principal> = writable();
export let loadingStore: Writable<boolean> = writable();