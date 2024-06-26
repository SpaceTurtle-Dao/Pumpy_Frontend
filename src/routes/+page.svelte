<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import TokenData from '$lib/models/TokenData.svelte';
	import Tag from '$lib/models/Tag.svelte';
	import { init, info, balance } from '$lib/messageFactory.svelte';
	import { send } from '$lib/process';

	// @ts-ignore
	import { connect, createDataItemSigner } from '@permaweb/aoconnect';

	const processId = 'LwPbmMPpA0YQq0MbbURC3-idQaMVZBC1in_cVIDavjE';
	const airToken = '2nfFJb8LIA69gwuLNcFQezSuw4CXPE4--U-j-7cxKOU';
	const waterToken = 'x7B1WmMJxh9UxRttjQ_gPZxI1BuLDmQzk3UDNgmqojM';

	const tokenInfo = async (process: string) => {
		try {
			let obj = {};
			let result = await send(process, info());
			console.log(result)
			console.log(result[0].Tags)
			let tags = result[0].Tags;
			
			tags.forEach((tag: Tag) => {
				// @ts-ignore
				obj[tag.name] = tag.value;
			});
			// @ts-ignore
			let data: TokenData = {
				id: process,
				// @ts-ignore
				Name: obj.Name,
				// @ts-ignore
				Ticker: obj.Ticker,
				// @ts-ignore
				Logo: obj.Logo,
				// @ts-ignore
				Denomination: obj.Denomination,
				amount: "1000"
			};
			//console.log(tags);
			//console.log(obj);
			//console.log(data);
			return data;
		} catch (e) {
			console.log(e);
		}
	};

	const initSwap = async () => {
		try {
			let tokenA = await tokenInfo(airToken);
			let tokenB = await tokenInfo(waterToken);
			// @ts-ignore
			let message = init(tokenA, tokenB, "100000");
			let result = await send(processId, message);
			console.log(result);
		} catch (e) {
			console.log(e);
		}
	};

	const getBalance = async () => {
		try {

			// @ts-ignore
			let result = await send(processId, balance());
			console.log(result);
		} catch (e) {
			console.log(e);
		}
	};
</script>

<Button on:click={getBalance}>GetBalance</Button>
<Button on:click={initSwap}>Init</Button>
