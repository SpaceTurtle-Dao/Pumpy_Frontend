import type { Pool } from '$lib/models/Pool.svelte';
import { send, createProcess, read } from '$lib/process';
import { info, init, pools, pumps } from '$lib/messageFactory.svelte';
import { PROCESS_ID } from './constants';
import type { Tag } from '$lib/models/Tag.svelte';
import { upload } from '$lib/uploader';
import { loadingStore } from '$lib/store/store';

export const fetchPumps = async () => {
    let _pools: Array<Pool> = [];
    let pools = await _fetchPumps();
    for (let i = 0; i < pools!.length; i++) {
        const _pump = pools![i];
        _pools.push({
            id: _pump.pool.pool,
            createdBy: _pump.pool.Minter,
            marketCap: _pump.analytics.marketCap,
            ticker: _pump.pool.Ticker,
            description: _pump.pool.Description,
            image: _pump.pool.Logo
        });
    }
    console.log('pools ' + _pools.length);
    return _pools;
};

const _fetchPumps = async () => {
    let _pools: Array<any> = [];
    try {
        // @ts-ignore
        let message = pumps();
        let result = await send(PROCESS_ID(), message);
        if (result == undefined) return _pools;
        console.log(result)
        let json = JSON.parse(result[0].Data).message;
        console.log(json);
        for (const key in json) {
            _pools.push(json[key]);
            console.log(json[key]);
        }
    } catch (e) {
        console.log(e);
    }
    return _pools;
};

export const tokenInfo = async (process: string) => {
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
};
export const createPump = async (icon:File,tokenB:string,name:string,ticker:string,description:string) => {
    loadingStore.set(true);
    try {
        // @ts-ignore
        let tokenProcess = await createProcess(PROCESS_ID());
        console.log('Token Process: ' + tokenProcess);
        let poolProcess = await createProcess(PROCESS_ID());
        console.log('Pool Process: ' + poolProcess);
        var delayInMilliseconds = 5000; //5 second
        //let blob = new Uint8Array(await icon[0].arrayBuffer());
        let url = await upload(await icon.arrayBuffer());
        //reader.readAsDataURL()
        //let data = base64String;
        setTimeout(async function () {
            console.log('Initing Token');
            let message = init(
                tokenB,
                name,
                ticker,
                url,
                description,
                '8',
                '1000000',
                tokenProcess,
                poolProcess
            );
            let result = await send(PROCESS_ID(), message);
            console.log(result);
        }, delayInMilliseconds);
    } catch (e) {
        console.log(e);
    }
    loadingStore.set(false);
};

/*export const createPool = async (TokenA,TokenB) => {
    try {
        // @ts-ignore
        let message = initPool(airToken, waterToken, '100000000000');
        let result = await send(poolId, message, null);
        console.log(result);
    } catch (e) {
        console.log(e);
    }
};

export const swapTokenA = async () => {
    try {
        // @ts-ignore
        let message = swapA('100000', '100');
        let result = await send(poolId, message, null);
        console.log(result);
    } catch (e) {
        console.log(e);
    }
};

export const swapTokenB = async () => {
    try {
        // @ts-ignore
        let message = swapB('10000', '100');
        let result = await send(poolId, message, null);
        console.log(result);
    } catch (e) {
        console.log(e);
    }
};

export const getBalance = async () => {
    try {
        // @ts-ignore
        let result = await send(poolId, balance(), null);
        console.log(result);
    } catch (e) {
        console.log(e);
    }
};

export const addInitalLiquidity = async () => {
    try {
        console.log('boom');
        // @ts-ignore
        let message = initalLiquidity('100000', '100000');
        let result = await send(poolId, message, null);
        console.log(result);
    } catch (e) {
        console.log(e);
    }
};

export const addLiquidity = async () => {
    try {
        console.log('boom');
        // @ts-ignore
        let message = add('100000', '100000');
        let result = await send(poolId, message, null);
        console.log(result);
    } catch (e) {
        console.log(e);
    }
};

export const removeLiquidity = async () => {
    try {
        // @ts-ignore
        let message = remove('100');
        let result = await send(poolId, message, null);
        console.log(result);
    } catch (e) {
        console.log(e);
    }
};

export const getInfo = async () => {
    try {
        // @ts-ignore
        let message = info();
        let result = await send('519RPbPUoo-7eIkBt3IFAI5ORP0p14q4DEuICIstN14', message);
        console.log(result)
    } catch (e) {
        console.log(e);
    }
};*/