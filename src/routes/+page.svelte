<script lang="ts">
	import Button from '$lib/components/ui/button/button.svelte';
	import TokenData from '$lib/models/TokenData.svelte';
	import Tag from '$lib/models/Tag.svelte';
	import {
		swapA,
		swapB,
		initalLiquidity,
		add,
		remove,
		info,
		balance,
		init,
		initPool
	} from '$lib/messageFactory.svelte';
	import { send, createProcess } from '$lib/process';

	// @ts-ignore
	import { connect, createDataItemSigner, spawn } from '@permaweb/aoconnect';
	// @ts-ignore


	const managerId = 'SvtUAMRanuDAb9VPCVDVI48LRCn7blXmaPtJcwMAaLI';
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

	const spawnedCount = async () => {
		try {
			// @ts-ignore
			let result = await send(managerId, [{ name: 'Action', value: 'SpawnedCount' }]);
			console.log(result);
		} catch (e) {
			console.log(e);
		}
	};

	const createPool = async () => {
		try {
			// @ts-ignore
			let message = initPool(airToken, waterToken, '100000000000');
			let result = await send(poolId, message,null);
			console.log(result);
		} catch (e) {
			console.log(e);
		}
	};

	const createPump = async () => {
		try {
			// @ts-ignore
			let tokenProcess = await createProcess(managerId);
			console.log('Token Process: ' + tokenProcess);
			let poolProcess = await createProcess(managerId);
			console.log('Pool Process: ' + poolProcess);
			var delayInMilliseconds = 5000; //5 second
			setTimeout(async function () {
				console.log("Initing Token")
				let message = init(
					waterToken,
					'Test',
					'Test',
					'8',
					'1000000',
					tokenProcess,
					poolProcess
				);
				let result = await send(managerId, message,null);
				console.log(result);
			}, delayInMilliseconds);
		} catch (e) {
			console.log(e);
		}
	};

	const swapTokenA = async () => {
		try {
			// @ts-ignore
			let message = swapA('100000', '100');
			let result = await send(poolId, message,null);
			console.log(result);
		} catch (e) {
			console.log(e);
		}
	};

	const swapTokenB = async () => {
		try {
			// @ts-ignore
			let message = swapB('10000', '100');
			let result = await send(poolId, message,null);
			console.log(result);
		} catch (e) {
			console.log(e);
		}
	};

	const getBalance = async () => {
		try {
			// @ts-ignore
			let result = await send(poolId, balance(),null);
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
			let result = await send(poolId, message,null);
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
			let result = await send(poolId, message,null);
			console.log(result);
		} catch (e) {
			console.log(e);
		}
	};

	const removeLiquidity = async () => {
		try {
			// @ts-ignore
			let message = remove('100');
			let result = await send(poolId, message,null);
			console.log(result);
		} catch (e) {
			console.log(e);
		}
	};

	const getInfo = async () => {
		try {
			// @ts-ignore
			let message = info();
			let result = await send('519RPbPUoo-7eIkBt3IFAI5ORP0p14q4DEuICIstN14', message,null);
			console.log(result);
		} catch (e) {
			console.log(e);
		}
	};
</script>

<Button on:click={getInfo}>Info</Button>
<Button on:click={createPool}>createPool</Button>
<Button on:click={spawnedCount}>SpawnedCount</Button>
<Button on:click={createPump}>CreatePump</Button>
<Button on:click={swapTokenA}>SwapA</Button>
<Button on:click={swapTokenB}>SwapB</Button>
<Button on:click={getBalance}>GetBalance</Button>
<Button on:click={addInitalLiquidity}>InitalLiquidity</Button>
<Button on:click={addLiquidity}>Add</Button>
<Button on:click={removeLiquidity}>Remove</Button>
