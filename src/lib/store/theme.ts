import { writable } from 'svelte/store';

const defaults = {
	'--border-radius': '3px',
	'--primary-bg': 'maroon',
	'--padding': '10px',
	'primaryColor': '#007bff',
	'fontFamily': 'Roboto, sans-serif'
};

export const themeContextKey = {};
export const themeStore = writable(defaults);