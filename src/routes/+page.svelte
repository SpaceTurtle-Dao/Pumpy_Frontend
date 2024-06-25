<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import {send} from '$lib/process.svelte';
</script>

<Button on:click={connectWallet}>Connect Wallet</Button>
<Button on:click={init}>Init</Button>
<Button on:click={GetInfo}>GetInfo</Button>
<Button on:click={readMessage}>Read Message</Button>

<!--<Board />-->
