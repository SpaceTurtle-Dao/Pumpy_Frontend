import { get, writable, type Writable } from "svelte/store";


interface SocialCard {
    description: string;
    title: string;
}

interface SocialIcon {
    alt: string;
    network: 'twitter' | 'discord' | 'telegram';
    fgColor: string;
    bgColor: string;
    width: string;
    height: string;
}

interface Progress {
    value: string;
    title: string;
    bondedPercentage: number;
}

//BalanceCard Interface
interface BalanceCard {
    title: string;
    value: string;
    icon: string;
}

interface AvatarInfo {
    imageSrc: string;
    altText: string;
    fallback: string;
}

interface CreatorCard {
    createdBy: string;
    avatar: AvatarInfo;
}

//Analytics Card
interface StatCard {
    title: string;
    value: string;
    percentage: string;
    isUp: boolean;
}

interface Pool {
    id: string;
    name: string;
}

interface Token {
    symbol: string;
    icon: string;
    decimals: bigint;
}

interface SwapState {
    isLoading: boolean;
    dialogOpen: boolean;
    isTokenA: boolean;
    isBuy: boolean;
    slippage: number;
    amount: number;
}

interface SwapComponentState {
    pool: Pool;
    tokenA: Token;
    tokenB: Token;
    swapState: SwapState;
}



interface HolderDistributionData {
  holders: Array<[string, bigint]>;
  token: TokenInfo;
  poolId: string;
}

interface HolderInfo {
  address: string;
  amount: bigint;
  percentage: number;
  type?: 'Bonding' | 'Dev' | undefined;
}

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