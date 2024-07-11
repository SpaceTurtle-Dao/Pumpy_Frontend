import { writable, type Writable } from "svelte/store";

type Time = number;

export interface TokenInfo__1 {
    decimals: bigint;
    twitter: [] | [string];
    icon: string;
    name: string;
    createdAt: number; 
    minter: string;
    website: [] | [string];
    supply: bigint;
    discord: [] | [string];
    holders: bigint;
    transactions: bigint;
    telegram: [] | [string];
    symbol: string;
}

export interface AnalyticsData__1 {
    liquidty: bigint;
    weekVolume: bigint;
    marketCap: bigint;
    dayVolume: bigint;
    volume: bigint;
    price: bigint;
    hourVolume: bigint;
}

export interface PoolInfo {
    id: bigint;
    createdAt: Time;
    pair: [bigint, bigint];
    analytics: AnalyticsData__1;
    precision: bigint;
    swaps: bigint;
    tokenA: TokenInfo__1;
    tokenB: TokenInfo__1;
    totalShares: bigint;
}

// Mock data
const mockPools: Array<PoolInfo> = [
    {
        id: BigInt(1),
        createdAt: Date.now(),
        pair: [BigInt(1000000), BigInt(2000000)],
        analytics: {
            liquidty: BigInt(5000000),
            weekVolume: BigInt(1000000),
            marketCap: BigInt(10000000),
            dayVolume: BigInt(200000),
            volume: BigInt(5000000),
            price: BigInt(100),
            hourVolume: BigInt(10000)
        },
        precision: BigInt(18),
        swaps: BigInt(1000),
        tokenA: {
            decimals: BigInt(18),
            twitter: ['@TokenA'],
            icon: 'https://example.com/tokenA.png',
            name: 'Token A',
            createdAt: Date.now() - 86400000, // One day ago
            minter: '0x1234567890123456789012345678901234567890',
            website: ['https://tokenA.com'],
            supply: BigInt(10000000),
            discord: ['https://discord.gg/tokenA'],
            holders: BigInt(5000),
            transactions: BigInt(20000),
            telegram: ['@TokenATG'],
            symbol: 'TKA'
        },
        tokenB: {
            decimals: BigInt(8),
            twitter: [],
            icon: 'https://example.com/tokenB.png',
            name: 'Token B',
            createdAt: Date.now() - 172800000, // Two days ago
            minter: '0x0987654321098765432109876543210987654321',
            website: [],
            supply: BigInt(5000000),
            discord: [],
            holders: BigInt(2500),
            transactions: BigInt(10000),
            telegram: ['@TokenBTG'],
            symbol: 'TKB'
        },
        totalShares: BigInt(1000000)
    },
];

export const poolsStore: Writable<Array<PoolInfo>> = writable(mockPools);