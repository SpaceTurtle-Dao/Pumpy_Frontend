import { writable, type Writable } from 'svelte/store';
import type { ActorMethod } from '@dfinity/agent';

export interface PoolInfo {
	id: bigint;
	createdAt: number;
	pair: [bigint, bigint];
	analytics: AnalyticsData;
	precision: bigint;
	swaps: bigint;
	tokenA: TokenInfo__1;
	tokenB: TokenInfo__1;
	totalShares: bigint;
}

export interface AnalyticsData {
	liquidty: bigint;
	weekVolume: bigint;
	marketCap: bigint;
	dayVolume: bigint;
	volume: bigint;
	price: bigint;
	hourVolume: bigint;
}

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

export interface AllowanceRequest {
	id: bigint;
	to: string;
	from: string;
}

export interface Swap {
	id: bigint;
	owner: string;
	createdAt: Time;
	swapType: SwapType;
	tokenA: bigint;
	tokenB: bigint;
}
export type SwapType = { Buy: null } | { Sell: null };
export type Time = bigint;
export type Token = { ICP: null } | { CKUSDC: null } | { CKBTC: null } | { CKETH: null };
export type PoolId = { RUG: bigint } | { POOL: bigint } | { PUMP: bigint };


export type TokenResult = { Ok: bigint } | { Err: TokenError };

export type TokenError =
	| {
			GenericError: { message: string; error_code: bigint };
	  }
	| { InsufficientAllowance: { balance: bigint } }
	| { Unauthorized: null }
	| { Slippage: bigint }
	| { InsufficientFunds: { balance: bigint } 

};

export interface TokenRequest {
	decimals: bigint;
	twitter: [] | [string];
	name: string;
	minter: string;
	website: [] | [string];
	supply: bigint;
	discord: [] | [string];
	image: Image;
	telegram: [] | [string];
	symbol: string;
}

export type TransactionType =
	| { Add: Liquidity }
	| { Approve: Transaction }
	| { Burn: Transaction }
	| { Lock: Transaction }
	| { Mint: Transaction }
	| { Swap: Swap }
	| { Remove: Liquidity }
	| { Transfer: Transaction }
	| { TransferFrom: Transaction };

export interface Image {
	blob: Uint8Array | number[];
	mimetype: string;
}
export interface Liquidity {
	id: bigint;
	owner: string;
	createdAt: number;
	share: bigint;
}

export interface MintRequest {
	id: bigint;
	to: string;
	amount: bigint;
}

export interface Transaction {
	id: bigint;
	to: string;
	from: string;
	createdAt: number;
	amount: bigint;
}

export interface BalanceRequest {
    id: bigint;
    address: string;
};

export interface ApproveRequest {
	id: bigint;
	to: string;
	amount: bigint;
};

export interface TransferFromRequest {
	id: bigint;
	to: string;
	from: string;
	amount: bigint;
}

export interface TransferRequest {
	id: bigint;
	to: string;
	amount: bigint;
}

export interface BurnRequest {
	id: bigint;
	from: string;
	amount: bigint;
}

export interface TokenRequest__1 {
	decimals: bigint;
	twitter: [] | [string];
	name: string;
	minter: string;
	website: [] | [string];
	supply: bigint;
	discord: [] | [string];
	image: Image;
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

export type PoolRequest =
	| { RUG: TokenRequest__1 }
	| { POOL: [bigint, bigint] }
	| { PUMP: PumpRequest };
export interface PumpRequest {
	token: bigint;
	amount: [] | [[bigint, bigint]];
	tokenRequest: TokenRequest__1;
}

export interface Pumpy {
	add: ActorMethod<[PoolId, [bigint, bigint]], TokenResult>;
	allowance: ActorMethod<[AllowanceRequest], bigint>;
	approve: ActorMethod<[ApproveRequest], TokenResult>;
	balance: ActorMethod<[BalanceRequest], bigint>;
	burn: ActorMethod<[Array<BurnRequest>], Array<TokenResult>>;
	createPools: ActorMethod<[Array<PoolRequest>], Array<TokenResult>>;
	createTokens: ActorMethod<[TokenRequest, Array<MintRequest>], Array<TokenResult>>;
	deposit: ActorMethod<[Token, bigint], TokenResult>;
	fetchBalances: ActorMethod<[], Array<[TokenInfo, bigint]>>;
	fetchHolders: ActorMethod<[bigint, bigint, bigint], Array<[string, bigint]>>;
	fetchPoolTransactions: ActorMethod<[bigint, bigint, bigint], Array<TransactionType>>;
	fetchPools: ActorMethod<[], Array<PoolInfo>>;
	fetchPumps: ActorMethod<[], Array<PoolInfo>>;
	fetchTokens: ActorMethod<[], Array<TokenInfo>>;
	fetchTransactions: ActorMethod<[bigint, bigint, bigint], Array<TransactionType>>;
	getCycles: ActorMethod<[], bigint>;
	getEquivalentTokenAEstimate: ActorMethod<[bigint, bigint], bigint>;
	getEquivalentTokenBEstimate: ActorMethod<[bigint, bigint], bigint>;
	getHeapSize: ActorMethod<[], bigint>;
	getMemorySize: ActorMethod<[], bigint>;
	getShares: ActorMethod<[bigint, string], bigint>;
	getSwapTokenAEstimate: ActorMethod<[bigint, bigint], bigint>;
	getSwapTokenAEstimateGivenTokenB: ActorMethod<[bigint, bigint], bigint>;
	getSwapTokenBEstimate: ActorMethod<[bigint, bigint], bigint>;
	getSwapTokenBEstimateGivenTokenA: ActorMethod<[bigint, bigint], bigint>;
	getTransaction: ActorMethod<[bigint, bigint], [] | [TransactionType]>;
	getWithdrawEstimate: ActorMethod<[bigint, bigint], { shareA: bigint; shareB: bigint }>;
	lock: ActorMethod<[bigint], TokenResult>;
	mint: ActorMethod<[Array<MintRequest>], Array<TokenResult>>;
	poolAnalytics: ActorMethod<[bigint], [] | [AnalyticsData__1]>;
	poolInfo: ActorMethod<[bigint], [] | [PoolInfo]>;
	price: ActorMethod<[bigint], bigint>;
	pumpAnalytics: ActorMethod<[bigint], [] | [AnalyticsData__1]>;
	pumpInfo: ActorMethod<[bigint], [] | [PoolInfo]>;
	remove: ActorMethod<[PoolId, bigint], TokenResult>;
	swapTokenA: ActorMethod<[PoolId, bigint, bigint], TokenResult>;
	swapTokenB: ActorMethod<[PoolId, bigint, bigint], TokenResult>;
	testMint: ActorMethod<[MintRequest], TokenResult>;
	tokenInfo: ActorMethod<[bigint], [] | [TokenInfo]>;
	transfer: ActorMethod<[TransferRequest], TokenResult>;
	transferFrom: ActorMethod<[Array<TransferFromRequest>], Array<TokenResult>>;
	withdraw: ActorMethod<[Token, bigint], TokenResult>;
}

export const pumpyActor: Writable<Pumpy> = writable();

// Mock data for pools
const mockPools: PoolInfo[] = [
  {
    id: BigInt(1),
    createdAt: Date.now() - 86400000, // 1 day ago
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
      createdAt: Date.now() - 2592000000, // 30 days ago
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
      decimals: BigInt(6),
      twitter: [],
      icon: 'https://example.com/tokenB.png',
      name: 'Token B',
      createdAt: Date.now() - 5184000000, // 60 days ago
      minter: '0x0987654321098765432109876543210987654321',
      website: ['https://tokenB.com'],
      supply: BigInt(5000000),
      discord: [],
      holders: BigInt(2500),
      transactions: BigInt(10000),
      telegram: ['@TokenBTG'],
      symbol: 'TKB'
    },
    totalShares: BigInt(1000000)
  }
];

// Mock data for pumps (using the same structure as pools)
const mockPumps: PoolInfo[] = [
  // ... similar to mockPools, but with different values
];

// Mock data for tokens
const mockTokens: TokenInfo[] = [
  {
    decimals: BigInt(18),
    twitter: ['@Token1'],
    icon: 'https://example.com/token1.png',
    name: 'Token One',
    createdAt: Date.now() - 7776000000, // 90 days ago
    minter: '0xabcdef1234567890abcdef1234567890abcdef12',
    website: ['https://token1.com'],
    supply: BigInt(100000000),
    discord: ['https://discord.gg/token1'],
    holders: BigInt(10000),
    transactions: BigInt(50000),
    telegram: ['@Token1TG'],
    symbol: 'TK1'
  }
];

// Mock data for balances
const mockBalances: [TokenInfo, bigint][] = [
  [mockTokens[0], BigInt(1000000000000000000000)] // 1000 of Token One
];

// Mock implementation of Pumpy interface
const mockPumpy: Pumpy = {
  add: () => Promise.resolve({ Ok: BigInt(1000) }),
  allowance: () => Promise.resolve(BigInt(500)),
  approve: () => Promise.resolve({ Ok: BigInt(1) }),
  balance: () => Promise.resolve(BigInt(1000)),
  burn: () => Promise.resolve([{ Ok: BigInt(1) }]),
  createPools: () => Promise.resolve([{ Ok: BigInt(1) }]),
  createTokens: () => Promise.resolve([{ Ok: BigInt(1) }]),
  deposit: () => Promise.resolve({ Ok: BigInt(1000) }),
  fetchBalances: () => Promise.resolve(mockBalances),
  fetchHolders: () => Promise.resolve([['0x1234...', BigInt(1000)]]),
  fetchPoolTransactions: () => Promise.resolve([]),
  fetchPools: () => Promise.resolve(mockPools),
  fetchPumps: () => Promise.resolve(mockPumps),
  fetchTokens: () => Promise.resolve(mockTokens),
  fetchTransactions: () => Promise.resolve([]),
  getCycles: () => Promise.resolve(BigInt(1000000)),
  getEquivalentTokenAEstimate: () => Promise.resolve(BigInt(100)),
  getEquivalentTokenBEstimate: () => Promise.resolve(BigInt(200)),
  getHeapSize: () => Promise.resolve(BigInt(1024)),
  getMemorySize: () => Promise.resolve(BigInt(2048)),
  getShares: () => Promise.resolve(BigInt(500)),
  getSwapTokenAEstimate: () => Promise.resolve(BigInt(300)),
  getSwapTokenAEstimateGivenTokenB: () => Promise.resolve(BigInt(400)),
  getSwapTokenBEstimate: () => Promise.resolve(BigInt(500)),
  getSwapTokenBEstimateGivenTokenA: () => Promise.resolve(BigInt(600)),
  getTransaction: () => Promise.resolve(null),
  getWithdrawEstimate: () => Promise.resolve({ shareA: BigInt(100), shareB: BigInt(200) }),
  lock: () => Promise.resolve({ Ok: BigInt(1) }),
  mint: () => Promise.resolve([{ Ok: BigInt(1000) }]),
  poolAnalytics: () => Promise.resolve(null),
  poolInfo: () => Promise.resolve(null),
  price: () => Promise.resolve(BigInt(100)),
  pumpAnalytics: () => Promise.resolve(null),
  pumpInfo: () => Promise.resolve(null),
  remove: () => Promise.resolve({ Ok: BigInt(1) }),
  swapTokenA: () => Promise.resolve({ Ok: BigInt(1000) }),
  swapTokenB: () => Promise.resolve({ Ok: BigInt(2000) }),
  testMint: () => Promise.resolve({ Ok: BigInt(1000) }),
  tokenInfo: () => Promise.resolve(null),
  transfer: () => Promise.resolve({ Ok: BigInt(1) }),
  transferFrom: () => Promise.resolve([{ Ok: BigInt(1) }]),
  withdraw: () => Promise.resolve({ Ok: BigInt(1000) })
};

// Stores
export const poolsStore: Writable<PoolInfo[]> = writable(mockPools);
export const pumpsStore: Writable<PoolInfo[]> = writable(mockPumps);
export const tokensStore: Writable<TokenInfo[]> = writable(mockTokens);
export const balancesStore: Writable<[TokenInfo, bigint][]> = writable(mockBalances);
export const pumpyActor: Writable<Pumpy> = writable(mockPumpy);