export const pumpy_idlFactory = ({ IDL }) => {
  const ENV = IDL.Variant({
    'PRODUCTION' : IDL.Null,
    'DEVELOPMENT' : IDL.Null,
    'STAGING' : IDL.Null,
  });
  const PoolId = IDL.Variant({
    'RUG' : IDL.Nat,
    'POOL' : IDL.Nat,
    'PUMP' : IDL.Nat,
  });
  const TokenError = IDL.Variant({
    'GenericError' : IDL.Record({
      'message' : IDL.Text,
      'error_code' : IDL.Nat,
    }),
    'InsufficientAllowance' : IDL.Record({ 'balance' : IDL.Nat }),
    'Unauthorized' : IDL.Null,
    'Slippage' : IDL.Nat,
    'InsufficientFunds' : IDL.Record({ 'balance' : IDL.Nat }),
  });
  const TokenResult = IDL.Variant({ 'Ok' : IDL.Nat, 'Err' : TokenError });
  const AllowanceRequest = IDL.Record({
    'id' : IDL.Nat,
    'to' : IDL.Text,
    'from' : IDL.Text,
  });
  const ApproveRequest = IDL.Record({
    'id' : IDL.Nat,
    'to' : IDL.Text,
    'amount' : IDL.Nat,
  });
  const BalanceRequest = IDL.Record({ 'id' : IDL.Nat, 'owner' : IDL.Text });
  const Image = IDL.Record({
    'blob' : IDL.Vec(IDL.Nat8),
    'mimetype' : IDL.Text,
  });
  const TokenRequest__1 = IDL.Record({
    'decimals' : IDL.Nat,
    'twitter' : IDL.Opt(IDL.Text),
    'name' : IDL.Text,
    'minter' : IDL.Text,
    'website' : IDL.Opt(IDL.Text),
    'supply' : IDL.Nat,
    'discord' : IDL.Opt(IDL.Text),
    'image' : Image,
    'telegram' : IDL.Opt(IDL.Text),
    'symbol' : IDL.Text,
  });
  const MintRequest__1 = IDL.Record({
    'id' : IDL.Nat,
    'to' : IDL.Text,
    'amount' : IDL.Nat,
  });
  const PumpRequest = IDL.Record({
    'token' : IDL.Nat,
    'holder' : MintRequest__1,
    'tokenRequest' : TokenRequest__1,
  });
  const PoolRequest = IDL.Variant({
    'RUG' : TokenRequest__1,
    'POOL' : IDL.Tuple(IDL.Nat, IDL.Nat),
    'PUMP' : PumpRequest,
  });
  const TokenRequest = IDL.Record({
    'decimals' : IDL.Nat,
    'twitter' : IDL.Opt(IDL.Text),
    'name' : IDL.Text,
    'minter' : IDL.Text,
    'website' : IDL.Opt(IDL.Text),
    'supply' : IDL.Nat,
    'discord' : IDL.Opt(IDL.Text),
    'image' : Image,
    'telegram' : IDL.Opt(IDL.Text),
    'symbol' : IDL.Text,
  });
  const MintRequest = IDL.Record({
    'id' : IDL.Nat,
    'to' : IDL.Text,
    'amount' : IDL.Nat,
  });
  const Time = IDL.Int;
  const TokenInfo = IDL.Record({
    'decimals' : IDL.Nat,
    'twitter' : IDL.Opt(IDL.Text),
    'icon' : IDL.Text,
    'name' : IDL.Text,
    'createdAt' : Time,
    'minter' : IDL.Text,
    'website' : IDL.Opt(IDL.Text),
    'supply' : IDL.Nat,
    'discord' : IDL.Opt(IDL.Text),
    'holders' : IDL.Nat,
    'transactions' : IDL.Nat,
    'telegram' : IDL.Opt(IDL.Text),
    'symbol' : IDL.Text,
  });
  const PoolInfo = IDL.Record({
    'id' : IDL.Nat,
    'createdAt' : Time,
    'pair' : IDL.Tuple(IDL.Nat, IDL.Nat),
    'precision' : IDL.Nat,
    'swaps' : IDL.Nat,
    'totalShares' : IDL.Nat,
  });
  const Liquidity = IDL.Record({
    'id' : IDL.Nat,
    'owner' : IDL.Text,
    'createdAt' : Time,
    'share' : IDL.Nat,
  });
  const Transaction = IDL.Record({
    'id' : IDL.Nat,
    'to' : IDL.Text,
    'from' : IDL.Text,
    'createdAt' : Time,
    'amount' : IDL.Nat,
  });
  const Amount = IDL.Record({ 'value' : IDL.Nat, 'symbol' : IDL.Text });
  const Swap = IDL.Record({
    'id' : IDL.Nat,
    'buy' : Amount,
    'owner' : IDL.Text,
    'createdAt' : Time,
    'sell' : Amount,
  });
  const TransactionType = IDL.Variant({
    'Add' : Liquidity,
    'Approve' : Transaction,
    'Burn' : Transaction,
    'Lock' : Transaction,
    'Mint' : Transaction,
    'Swap' : Swap,
    'Remove' : Liquidity,
    'Transfer' : Transaction,
    'TransferFrom' : Transaction,
  });
  const TransferRequest = IDL.Record({
    'id' : IDL.Nat,
    'to' : IDL.Text,
    'amount' : IDL.Nat,
  });
  const TransferFromRequest = IDL.Record({
    'id' : IDL.Nat,
    'to' : IDL.Text,
    'from' : IDL.Text,
    'amount' : IDL.Nat,
  });
  const Pumpy = IDL.Service({
    'add' : IDL.Func([PoolId, IDL.Tuple(IDL.Nat, IDL.Nat)], [TokenResult], []),
    'allowance' : IDL.Func([AllowanceRequest], [IDL.Nat], ['query']),
    'approve' : IDL.Func([ApproveRequest], [TokenResult], []),
    'balance' : IDL.Func([BalanceRequest], [IDL.Nat], ['query']),
    'createPools' : IDL.Func(
        [IDL.Vec(PoolRequest)],
        [IDL.Vec(TokenResult)],
        [],
      ),
    'createTokens' : IDL.Func(
        [TokenRequest, IDL.Vec(MintRequest)],
        [IDL.Vec(TokenResult)],
        [],
      ),
    'fetchBalances' : IDL.Func(
        [],
        [IDL.Vec(IDL.Tuple(TokenInfo, IDL.Nat))],
        ['query'],
      ),
    'fetchHolders' : IDL.Func(
        [IDL.Nat, IDL.Nat, IDL.Nat],
        [IDL.Vec(IDL.Tuple(IDL.Text, IDL.Nat))],
        ['query'],
      ),
    'fetchPools' : IDL.Func([], [IDL.Vec(PoolInfo)], ['query']),
    'fetchTokens' : IDL.Func([], [IDL.Vec(TokenInfo)], ['query']),
    'fetchTransactions' : IDL.Func(
        [IDL.Nat, IDL.Nat, IDL.Nat],
        [IDL.Vec(TransactionType)],
        ['query'],
      ),
    'getCycles' : IDL.Func([], [IDL.Nat], ['query']),
    'getEquivalentTokenAEstimate' : IDL.Func([IDL.Nat, IDL.Nat], [IDL.Nat], []),
    'getEquivalentTokenBEstimate' : IDL.Func([IDL.Nat, IDL.Nat], [IDL.Nat], []),
    'getHeapSize' : IDL.Func([], [IDL.Nat], ['query']),
    'getMemorySize' : IDL.Func([], [IDL.Nat], ['query']),
    'getShares' : IDL.Func([IDL.Nat, IDL.Text], [IDL.Nat], ['query']),
    'getSwapTokenAEstimate' : IDL.Func([IDL.Nat, IDL.Nat], [IDL.Nat], []),
    'getSwapTokenAEstimateGivenTokenB' : IDL.Func(
        [IDL.Nat, IDL.Nat],
        [IDL.Nat],
        [],
      ),
    'getSwapTokenBEstimate' : IDL.Func([IDL.Nat, IDL.Nat], [IDL.Nat], []),
    'getSwapTokenBEstimateGivenTokenA' : IDL.Func(
        [IDL.Nat, IDL.Nat],
        [IDL.Nat],
        [],
      ),
    'getTransaction' : IDL.Func(
        [IDL.Nat, IDL.Nat],
        [IDL.Opt(TransactionType)],
        ['query'],
      ),
    'getWithdrawEstimate' : IDL.Func(
        [IDL.Nat, IDL.Nat],
        [IDL.Record({ 'shareA' : IDL.Nat, 'shareB' : IDL.Nat })],
        [],
      ),
    'lock' : IDL.Func([IDL.Nat], [TokenResult], []),
    'mint' : IDL.Func([IDL.Vec(MintRequest)], [IDL.Vec(TokenResult)], []),
    'poolInfo' : IDL.Func([IDL.Nat], [IDL.Opt(PoolInfo)], ['query']),
    'price' : IDL.Func([IDL.Nat], [IDL.Nat], []),
    'remove' : IDL.Func([PoolId, IDL.Nat], [TokenResult], []),
    'swapTokenA' : IDL.Func([PoolId, IDL.Nat, IDL.Nat], [TokenResult], []),
    'swapTokenB' : IDL.Func([PoolId, IDL.Nat, IDL.Nat], [TokenResult], []),
    'tokenInfo' : IDL.Func([IDL.Nat], [IDL.Opt(TokenInfo)], ['query']),
    'transfer' : IDL.Func([TransferRequest], [TokenResult], []),
    'transferFrom' : IDL.Func(
        [IDL.Vec(TransferFromRequest)],
        [IDL.Vec(TokenResult)],
        [],
      ),
  });
  return Pumpy;
};
export const init = ({ IDL }) => {
  const ENV = IDL.Variant({
    'PRODUCTION' : IDL.Null,
    'DEVELOPMENT' : IDL.Null,
    'STAGING' : IDL.Null,
  });
  return [ENV];
};
