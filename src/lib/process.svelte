<script>
	// @ts-ignore
	import { connect, createDataItemSigner } from '@permaweb/aoconnect';
	/*const processId = 'ujbXm7CAkbQ4gqSsOMw8f7fe-Ry22agHU68fxd3JkQA';
	let messageId = '';
	const airToken = '2nfFJb8LIA69gwuLNcFQezSuw4CXPE4--U-j-7cxKOU';
	const waterToken = 'x7B1WmMJxh9UxRttjQ_gPZxI1BuLDmQzk3UDNgmqojM';*/

	// @ts-ignore
	const { result, results, message, spawn, monitor, unmonitor, dryrun } = connect({
		MU_URL: 'https://mu.ao-testnet.xyz',
		CU_URL: 'https://cu.ao-testnet.xyz',
		GATEWAY_URL: 'https://arweave.net'
	});

	// @ts-ignore
	export const send = async (processId,tags) => {
		// The only 2 mandatory parameters here are process and signer
		// connect to the extension
		// @ts-ignore
		const messageId = await message({
			/*
				The arweave TXID of the process, this will become the "target".
				This is the process the message is ultimately sent to.
			*/
			process: processId,
			// Tags that the process will use as input.
			tags: tags,
			// A signer function used to build the message "signature"
			// @ts-ignore
			signer: createDataItemSigner(window.arweaveWallet)
		})
			.then((value) => {
				console.log(value);
			})
			.catch(console.error);
		let result = await readMessage(messageId, processId);
        return result
	};

	// @ts-ignore
	const readMessage = async (messageId, processId) => {
		let { Messages, Spawns, Output, Error } = await result({
			// the arweave TXID of the message
			message: messageId,
			// the arweave TXID of the process
			process: processId
		});
		console.log(Messages);
		console.log(Spawns);
		console.log(Output);
		console.log(Error);
	};
</script>
