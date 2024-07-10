import { writable, type Writable } from "svelte/store";

export interface TokenInfo {
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

// Mock data
const mockBalances: Array<[TokenInfo, bigint]> = [
    [
        {
            decimals: BigInt(18),
            twitter: ['@Token1'],
            icon: 'https://example.com/token1.png',
            name: 'Token One',
            createdAt: Date.now() - 2592000000, // One month ago
            minter: '0x1234567890123456789012345678901234567890',
            website: ['https://token1.com'],
            supply: BigInt(1000000000),
            discord: ['https://discord.gg/token1'],
            holders: BigInt(50000),
            transactions: BigInt(200000),
            telegram: ['@Token1TG'],
            symbol: 'TKN1'
        },
        BigInt(1000000000000000000000) // 1000 tokens
    ],
    [
        {
            decimals: BigInt(6),
            twitter: [],
            icon: 'https://example.com/token2.png',
            name: 'Token Two',
            createdAt: Date.now() - 7776000000, // Three months ago
            minter: '0xabcdef1234567890abcdef1234567890abcdef12',
            website: [],
            supply: BigInt(500000000),
            discord: [],
            holders: BigInt(25000),
            transactions: BigInt(100000),
            telegram: ['@Token2TG'],
            symbol: 'TKN2'
        },
        BigInt(5000000000) // 5000 tokens
    ],
    [
        {
            decimals: BigInt(8),
            twitter: ['@Token3'],
            icon: 'https://example.com/token3.png',
            name: 'Token Three',
            createdAt: Date.now() - 15552000000, // Six months ago
            minter: '0x9876543210987654321098765432109876543210',
            website: ['https://token3.com'],
            supply: BigInt(100000000000),
            discord: ['https://discord.gg/token3'],
            holders: BigInt(100000),
            transactions: BigInt(500000),
            telegram: [],
            symbol: 'TKN3'
        },
        BigInt(250000000000) // 2500 tokens
    ]
];

export const balancesStore: Writable<Array<[TokenInfo, bigint]>> = writable(mockBalances);