import { stackedTheme } from './theme'
const { skeleton } = require('@skeletonlabs/tw-plugin');
/** @type {import('tailwindcss').Config} */
import forms from '@tailwindcss/forms';



export default {
	content: ['./src/**/*.{html,js,svelte,ts}', require('path').join(require.resolve(
		'@skeletonlabs/skeleton'),
		'../**/*.{html,js,svelte,ts}'
	)],
	theme: {
		extend: {}
	},
	plugins: [
		forms,
		skeleton({
			themes: { custom: [stackedTheme] }
		}),
	]
};
