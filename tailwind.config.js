import { stackedTheme } from './theme'
const { skeleton } = require('@skeletonlabs/tw-plugin');
/** @type {import('tailwindcss').Config} */


export default {
	content: ['./src/**/*.{html,js,svelte,ts}', require('path').join(require.resolve(
		'@skeletonlabs/skeleton'),
		'../**/*.{html,js,svelte,ts}'
	)],
	theme: {
		extend: {}
	},
	plugins: [
		// 4. Append the Skeleton plugin (after other plugins)
		skeleton({
			themes: { custom: [stackedTheme] }
		})
	]
};
