<script>
	// @ts-ignore
	import Button from '$lib/components/ui/button/button.svelte';
	import { connect, createDataItemSigner } from '@permaweb/aoconnect';
	const processId = "ujbXm7CAkbQ4gqSsOMw8f7fe-Ry22agHU68fxd3JkQA"
	let messageId = "";
	const airToken = "2nfFJb8LIA69gwuLNcFQezSuw4CXPE4--U-j-7cxKOU";
	const waterToken = "x7B1WmMJxh9UxRttjQ_gPZxI1BuLDmQzk3UDNgmqojM";
	// @ts-ignore
	const { result, results, message, spawn, monitor, unmonitor, dryrun } = connect({
		MU_URL: 'https://mu.ao-testnet.xyz',
		CU_URL: 'https://cu.ao-testnet.xyz',
		GATEWAY_URL: 'https://arweave.net'
	});

	// @ts-ignore
	const connectWallet = async () => {
		// @ts-ignore
		await window.arweaveWallet
			.connect(
				// request permissions to read the active address
				[
					'ACCESS_ADDRESS',
					'ACCESS_PUBLIC_KEY',
					'ACCESS_ALL_ADDRESSES',
					'SIGN_TRANSACTION',
					'ENCRYPT',
					'DECRYPT',
					'SIGNATURE',
					'ACCESS_ARWEAVE_CONFIG',
					'DISPATCH'
				],
				// provide some extra info for our app
				{
					name: 'Super Cool App',
					logo: 'https://arweave.net/jAvd7Z1CBd8gVF2D6ESj7SMCCUYxDX_z3vpp5aHdaYk'
				},
				// custom gateway
				{
					host: 'g8way.io',
					port: 443,
					protocol: 'https'
				}
			)
			.then(console.log)
			.catch(console.error);
	};

	// @ts-ignore
	const init = async () => {
		// The only 2 mandatory parameters here are process and signer
		// connect to the extension
		await message({
			/*
				The arweave TXID of the process, this will become the "target".
				This is the process the message is ultimately sent to.
			*/
			process: processId,
			// Tags that the process will use as input.
			tags: [
				{ name: 'Action', value: 'Init' },
				{ name: "TokenAProcess", value: airToken },
				{ name: "TokenBProcess", value: waterToken },
				{ name: "amountA", value: "0" },
				{ name: "amountB", value: "0" },
				{ name: "BondingCurve", value: "0" },
			],
			// A signer function used to build the message "signature"
			// @ts-ignore
			signer: createDataItemSigner(window.arweaveWallet)
		})
			.then((value) => {
				console.log(value);
				messageId = value;
			})
			.catch(console.error);
	};

	// @ts-ignore
	const GetInfo = async () => {
		// The only 2 mandatory parameters here are process and signer
		// connect to the extension
		await message({
			/*
				The arweave TXID of the process, this will become the "target".
				This is the process the message is ultimately sent to.
			*/
			process: processId,
			// Tags that the process will use as input.
			tags: [
				{ name: 'Action', value: 'GetInfo' }
			],
			// A signer function used to build the message "signature"
			// @ts-ignore
			signer: createDataItemSigner(window.arweaveWallet)
		})
			.then((value) => {
				console.log(value);
				messageId = value;
			})
			.catch(console.error);
	};

	// @ts-ignore
	const sendMessage = async () => {
		// The only 2 mandatory parameters here are process and signer
		// connect to the extension
		await message({
			/*
				The arweave TXID of the process, this will become the "target".
				This is the process the message is ultimately sent to.
			*/
			process: processId,
			// Tags that the process will use as input.
			tags: [
				{ name: 'Action', value: 'Init' },
				{ name: "TokenAProcess", value: airToken },
				{ name: "TokenBProcess", value: waterToken },
				{ name: "amountA", value: "100000" },
				{ name: "amountB", value: "100000" },
				{ name: "BondingCurve", value: "100000000" },
			],
			// A signer function used to build the message "signature"
			// @ts-ignore
			signer: createDataItemSigner(window.arweaveWallet)
		})
			.then((value) => {
				console.log(value);
				messageId = value;
			})
			.catch(console.error);
	};

	const readMessage = async () => {
		let { Messages, Spawns, Output, Error } = await result({
			// the arweave TXID of the message
			message: messageId,
			// the arweave TXID of the process
			process: processId
		});
		console.log(Messages)
		console.log(Spawns)
		console.log(Output)
		console.log(Error)
	};
</script>

<Button on:click={connectWallet}>Connect Wallet</Button>
<Button on:click={init}>Init</Button>
<Button on:click={GetInfo}>GetInfo</Button>
<Button on:click={readMessage}>Read Message</Button>

<!--<Board />-->
