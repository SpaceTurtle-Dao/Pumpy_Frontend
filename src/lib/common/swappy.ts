import type { Pool } from '$lib/models/Pool.svelte';
import { send, createProcess, read } from '$lib/process';
import { pools, pumps } from '$lib/messageFactory.svelte';
import { PROCESS_ID } from './constants';

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
    let _pumps = [];
    try {
        // @ts-ignore
        let message = pumps();
        let result = await read(PROCESS_ID(), message, null);
        let json = JSON.parse(result[0].Data).message;
        console.log(json);
        for (const key in json) {
            _pumps.push(json[key]);
            console.log(json[key]);
        }
    } catch (e) {
        console.log(e);
    }
    return _pumps;
};