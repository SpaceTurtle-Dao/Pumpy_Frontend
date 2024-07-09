import { writable } from 'svelte/store';

const defaults = {
	'--border-radius': '3px',
	'--primary-bg': 'maroon',
	'--padding': '10px'
};

export const themeContextKey = {};
export const themeStore = writable(defaults);