// @ts-ignore
import { connect, createDataItemSigner } from '@permaweb/aoconnect';

// @ts-ignore
const { result, results, message, spawn, monitor, unmonitor, dryrun } = connect({
	MU_URL: 'https://mu.ao-testnet.xyz',
	CU_URL: 'https://cu.ao-testnet.xyz',
	GATEWAY_URL: 'https://arweave.net'
});

// @ts-ignore
export const send = async (processId, tags) => {
	// The only 2 mandatory parameters here are process and signer
	// connect to the extension
	// @ts-ignore
	let messageId = await message({
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
	});
	console.log(messageId);
	return await readMessage(messageId, processId);
	//return result
};

// @ts-ignore
const readMessage = async (messageId:string, processId:string) => {
	let { Messages, Spawns, Output, Error } = await result({
		// the arweave TXID of the message
		message: messageId,
		// the arweave TXID of the process
		process: processId
	});
	if(Error == undefined) return Messages
	//console.log(Messages);
	//console.log(Spawns);
	//console.log(Output);
	//console.log(Error);
	throw(Error)
};