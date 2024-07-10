import type { ActorMethod } from '@dfinity/agent';
import type { IDL } from '@dfinity/candid';

export interface AllowanceRequest {
	id: bigint;
	to: string;
	from: string;
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
export interface AnalyticsData__1 {
	liquidty: bigint;
	weekVolume: bigint;
	marketCap: bigint;
	dayVolume: bigint;
	volume: bigint;
	price: bigint;
	hourVolume: bigint;
}
export interface ApproveRequest {
	id: bigint;
	to: string;
	amount: bigint;
}
export interface BalanceRequest {
	id: bigint;
	owner: string;
}
export interface BurnRequest {
	id: bigint;
	from: string;
	amount: bigint;
}
export type ENV = { PRODUCTION: null } | { DEVELOPMENT: null } | { STAGING: null };
export interface Image {
	blob: Uint8Array | number[];
	mimetype: string;
}
export interface Liquidity {
	id: bigint;
	owner: string;
	createdAt: Time;
	share: bigint;
}
export interface MintRequest {
	id: bigint;
	to: string;
	amount: bigint;
}
export type PoolId = { RUG: bigint } | { POOL: bigint } | { PUMP: bigint };
export interface PoolInfo {
	id: bigint;
	createdAt: Time;
	pair: [bigint, bigint];
	analytics: AnalyticsData;
	precision: bigint;
	swaps: bigint;
	tokenA: TokenInfo__1;
	tokenB: TokenInfo__1;
	totalShares: bigint;
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
export type TokenError =
	| {
			GenericError: { message: string; error_code: bigint };
	  }
	| { InsufficientAllowance: { balance: bigint } }
	| { Unauthorized: null }
	| { Slippage: bigint }
	| { InsufficientFunds: { balance: bigint } };
export interface TokenInfo {
	decimals: bigint;
	twitter: [] | [string];
	icon: string;
	name: string;
	createdAt: Time;
	minter: string;
	website: [] | [string];
	supply: bigint;
	discord: [] | [string];
	holders: bigint;
	transactions: bigint;
	telegram: [] | [string];
	symbol: string;
}
export interface TokenInfo__1 {
	decimals: bigint;
	twitter: [] | [string];
	icon: string;
	name: string;
	createdAt: Time;
	minter: string;
	website: [] | [string];
	supply: bigint;
	discord: [] | [string];
	holders: bigint;
	transactions: bigint;
	telegram: [] | [string];
	symbol: string;
}
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
export type TokenResult = { Ok: bigint } | { Err: TokenError };
export interface Transaction {
	id: bigint;
	to: string;
	from: string;
	createdAt: Time;
	amount: bigint;
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
export interface _SERVICE extends Pumpy {}
export declare const pumpy_idlFactory: IDL.InterfaceFactory;
export declare const init: (args: { IDL: typeof IDL }) => IDL.Type[];
