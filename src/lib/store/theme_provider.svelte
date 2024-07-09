<script>
	import { themeStore, themeContextKey } from './theme';
	import { setContext } from 'svelte';

	$: $themeStore = { ...$themeStore };

	setContext(themeContextKey, { theme: themeStore });
</script>

<slot theme={$themeStore} />
