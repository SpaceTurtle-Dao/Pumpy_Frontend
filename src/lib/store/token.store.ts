import { get, writable, type Writable } from "svelte/store";

export type TokenInfo = {
  decimals: bigint;
  twitter: [] | [string];
  icon: string;
  name: string;
  createdAt: BigInt;
  minter: string;
  website: [] | [string];
  supply: bigint;
  discord: [] | [string];
  holders: bigint;
  transactions: bigint;
  telegram: [] | [string];
  symbol: string;
};

const mockTokens: Array<TokenInfo> = [
  {
    decimals: BigInt(18),
    twitter: ['@MockToken1'],
    icon: 'https://example.com/mocktoken1.png',
    name: 'Mock Token 1',
    createdAt: BigInt(Date.now()),
    minter: '0x1234567890123456789012345678901234567890',
    website: ['https://mocktoken1.com'],
    supply: BigInt(1000000),
    discord: ['https://discord.gg/mocktoken1'],
    holders: BigInt(1000),
    transactions: BigInt(5000),
    telegram: ['@MockToken1TG'],
    symbol: 'MT1'
  },
  {
    decimals: BigInt(8),
    twitter: [],
    icon: 'https://example.com/mocktoken2.png',
    name: 'Mock Token 2',
    createdAt: BigInt(Date.now() - 86400000), // One day ago
    minter: '0x0987654321098765432109876543210987654321',
    website: [],
    supply: BigInt(500000),
    discord: [],
    holders: BigInt(500),
    transactions: BigInt(2000),
    telegram: [],
    symbol: 'MT2'
  }
];

export const tokensStore = writable<Array<TokenInfo>>(mockTokens);