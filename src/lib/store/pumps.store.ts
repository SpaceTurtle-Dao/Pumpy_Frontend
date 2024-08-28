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
const mockPumps: Array<PoolInfo> = [
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
            twitter: ['@PumpToken1'],
            icon: 'https://example.com/pumptoken1.png',
            name: 'Pump Token 1',
            createdAt: Date.now() - 86400000, // One day ago
            minter: '0x1234567890123456789012345678901234567890',
            website: ['https://pumptoken1.com'],
            supply: BigInt(10000000),
            discord: ['https://discord.gg/pumptoken1'],
            holders: BigInt(5000),
            transactions: BigInt(20000),
            telegram: ['@PumpToken1TG'],
            symbol: 'PT1'
        },
        tokenB: {
            decimals: BigInt(8),
            twitter: [],
            icon: 'https://example.com/pumptoken2.png',
            name: 'Pump Token 2',
            createdAt: Date.now() - 172800000, // Two days ago
            minter: '0x0987654321098765432109876543210987654321',
            website: [],
            supply: BigInt(5000000),
            discord: [],
            holders: BigInt(2500),
            transactions: BigInt(10000),
            telegram: ['@PumpToken2TG'],
            symbol: 'PT2'
        },
        totalShares: BigInt(1000000)
    },
    {
        id: BigInt(2),
        createdAt: Date.now() - 604800000, // One week ago
        pair: [BigInt(500000), BigInt(1500000)],
        analytics: {
            liquidty: BigInt(3000000),
            weekVolume: BigInt(500000),
            marketCap: BigInt(7000000),
            dayVolume: BigInt(100000),
            volume: BigInt(2500000),
            price: BigInt(75),
            hourVolume: BigInt(5000)
        },
        precision: BigInt(12),
        swaps: BigInt(750),
        tokenA: {
            decimals: BigInt(12),
            twitter: ['@PumpToken3'],
            icon: 'https://example.com/pumptoken3.png',
            name: 'Pump Token 3',
            createdAt: Date.now() - 2592000000, // One month ago
            minter: '0xabcdef1234567890abcdef1234567890abcdef12',
            website: ['https://pumptoken3.com'],
            supply: BigInt(7500000),
            discord: ['https://discord.gg/pumptoken3'],
            holders: BigInt(3000),
            transactions: BigInt(15000),
            telegram: [],
            symbol: 'PT3'
        },
        tokenB: {
            decimals: BigInt(10),
            twitter: ['@PumpToken4'],
            icon: 'https://example.com/pumptoken4.png',
            name: 'Pump Token 4',
            createdAt: Date.now() - 5184000000,
            minter: '0x1234abcdef5678901234abcdef5678901234abcd',
            website: ['https://pumptoken4.com'],
            supply: BigInt(6000000),
            discord: [],
            holders: BigInt(2000),
            transactions: BigInt(8000),
            telegram: ['@PumpToken4TG'],
            symbol: 'PT4'
        },
        totalShares: BigInt(750000)
    }
];

export const pumpsStore: Writable<Array<PoolInfo>> = writable(mockPumps);