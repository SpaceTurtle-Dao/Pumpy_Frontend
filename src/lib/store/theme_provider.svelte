<script>
	import { themeStore, themeContextKey } from './theme';
	import { setContext } from 'svelte';
	export let theme = {};

	$: $themeStore = { ...$themeStore, ...theme };

	setContext(themeContextKey, { theme: themeStore });
</script>

<slot theme={$themeStore} />
yo copilot ?? 
