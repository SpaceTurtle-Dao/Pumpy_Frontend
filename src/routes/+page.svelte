<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import TokenData from '$lib/models/TokenData.svelte';
	import Tag from '$lib/models/Tag.svelte';
	import {
		initPool,
		swapA,
		swapB,
		initalLiquidity,
		add,
		remove,
		info,
		balance
	} from '$lib/messageFactory.svelte';
	import { send } from '$lib/process';

	// @ts-ignore
	import { connect, createDataItemSigner } from '@permaweb/aoconnect';

	//const managerId = 'HNIsIdCJzUINPhAsnTOY-7XgYW2ZKEXqzKR9lNg7rG4';
	const poolId = 'NJVmhqsCZ9DDReywzE5c0Ds4RjO5CPIebcdw-dk6P0k';
	const airToken = '2nfFJb8LIA69gwuLNcFQezSuw4CXPE4--U-j-7cxKOU';
	const waterToken = 'x7B1WmMJxh9UxRttjQ_gPZxI1BuLDmQzk3UDNgmqojM';

	/*const tokenInfo = async (process: string) => {
		try {
			let obj = {};
			let result = await send(process, info());
			console.log(result);
			console.log(result[0].Tags);
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
				amount: '1000'
			};
			//console.log(tags);
			//console.log(obj);
			//console.log(data);
			return data;
		} catch (e) {
			console.log(e);
		}
	};*/

	const init = async () => {
		try {
			// @ts-ignore
			let message = initPool(airToken, waterToken, '1000000000');
			let result = await send(poolId, message);
			console.log(result);
		} catch (e) {
			console.log(e);
		}
	};

	const swapTokenA = async () => {
		try {
			// @ts-ignore
			let message = swapA('10000', '100');
			let result = await send(poolId, message);
			console.log(result);
		} catch (e) {
			console.log(e);
		}
	};

	const swapTokenB = async () => {
		try {
			// @ts-ignore
			let message = swapB('10000', '100');
			let result = await send(poolId, message);
			console.log(result);
		} catch (e) {
			console.log(e);
		}
	};

	const getBalance = async () => {
		try {
			// @ts-ignore
			let result = await send(poolId, balance());
			console.log(result);
		} catch (e) {
			console.log(e);
		}
	};

	const addInitalLiquidity = async () => {
		try {
			console.log('boom');
			// @ts-ignore
			let message = initalLiquidity('100000', '100000');
			let result = await send(poolId, message);
			console.log(result);
		} catch (e) {
			console.log(e);
		}
	};

	const addLiquidity = async () => {
		try {
			console.log('boom');
			// @ts-ignore
			let message = add('100000', '100000');
			let result = await send(poolId, message);
			console.log(result);
		} catch (e) {
			console.log(e);
		}
	};

	const removeLiquidity = async () => {
		try {
			// @ts-ignore
			let message = remove('100');
			let result = await send(poolId, message);
			console.log(result);
		} catch (e) {
			console.log(e);
		}
	};
</script>

<Button on:click={init}>Init</Button>
<Button on:click={swapTokenA}>SwapA</Button>
<Button on:click={swapTokenB}>SwapB</Button>
<Button on:click={getBalance}>GetBalance</Button>
<Button on:click={addInitalLiquidity}>InitalLiquidity</Button>
<Button on:click={addLiquidity}>Add</Button>
<Button on:click={removeLiquidity}>Remove</Button>
