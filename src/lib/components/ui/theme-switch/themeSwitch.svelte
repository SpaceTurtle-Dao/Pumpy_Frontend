<script lang="ts">
	import { browser } from '$app/environment';

	let darkMode = true;

	function handleSwitchDarkMode() {
		darkMode = !darkMode;

		localStorage.setItem('theme', darkMode ? 'dark' : 'light');

		darkMode
			? document.documentElement.classList.add('dark')
			: document.documentElement.classList.remove('dark');
	}

	if (browser) {
		if (
			localStorage.theme === 'dark' ||
			(!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)
		) {
			document.documentElement.classList.add('dark');
			darkMode = true;
		} else {
			document.documentElement.classList.remove('dark');
			darkMode = false;
		}
	}

	// import { onMount } from 'svelte'

	// // indicate if we're in dark mode or not
	// let dark: boolean

	// // hide the control until we've decided what the intial mode is
	// let hidden = true

	// onMount(() => {
	// 	// use the existence of the dark class on the html element for the initial value
	// 	dark = document.documentElement.classList.contains('dark')

	// 	// show UI controls
	// 	hidden = false

	// 	// listen for changes so we auto-adjust based on system settings
	// 	const matcher = window.matchMedia('(prefers-color-scheme: dark)')
	// 	matcher.addEventListener('change', handleChange)
	// 	return () => matcher.removeEventListener('change', handleChange)
	// })

	// function handleChange({ matches: dark }: MediaQueryListEvent) {
	// 	// only set if we haven't overridden the theme
	// 	if (!localStorage.theme) {
	// 		setMode(dark)
	// 	}
	// }

	// function toggle() {
	// 	setMode(!dark)
	// }

	// function setMode(value: boolean) {
	// 	dark = value

	// 	// update page styling
	// 	if (dark) {
	// 		document.documentElement.classList.add('dark')
	// 	} else {
	// 		document.documentElement.classList.remove('dark')
	// 	}

	// 	// store the theme as a local override
	// 	localStorage.theme = dark ? 'dark' : 'light'

	// 	// if the toggled-to theme matches the system defined theme, clear the local override
	// 	// this effectively provides a way to override or revert to "automatic" setting mode
	// 	if (window.matchMedia(`(prefers-color-scheme: ${localStorage.theme})`).matches) {
	// 		localStorage.removeItem('theme')
	// 	}
	// }
</script>

<div>
	<input checked={darkMode} on:click={handleSwitchDarkMode} type="checkbox" id="theme-toggle" />
	<label for="theme-toggle" />
</div>

<style lang="postcss">
	#theme-toggle {
		@apply invisible;
	}

	#theme-toggle + label {
		@apply inline-block cursor-pointer h-8 w-8 absolute   rounded-full duration-300 content-[''];
	}
</style>
