<script context="module" lang="ts">
	import type { TokenData } from "./models/TokenData.svelte";;

	export const init = (
		tokenB: string,
		name: string,
		ticker: string,
		logo: string,
		denomination: string,
		bondingCurve: string,
		tokenProcess: string,
		poolProcess: string
	) => {
		return [
			{ name: 'Action', value: 'Init' },
			{ name: 'TokenB', value: tokenB},
			{ name: 'Name', value: name},
			{ name: 'Ticker', value: ticker},
			{ name: 'Logo', value: logo},
			{ name: 'Denomination', value: denomination},
			{ name: 'BondingCurve', value: bondingCurve},
			{ name: 'TokenProcess', value: tokenProcess},
			{ name: 'PoolProcess', value: poolProcess},
		];
	};

	export const initPool = (
		tokenA: string,
		tokenB: string,
		bondingCurve: string,
	) => {
		return [
			{ name: 'Action', value: 'Init' },
			{ name: 'TokenA', value: tokenA},
			{ name: 'TokenB', value: tokenB},
			{ name: 'BondingCurve', value: bondingCurve},
		];
	};

	export const pools = () => {
		return [
			{ name: 'Action', value: 'Pools' }
		];
	};

	export const pumps = (pool:string) => {
		return [
			{ name: 'Action', value: 'Pumps' },
			
		];
	};

	export const pool = () => {
		return [
			{ name: 'Action', value: 'Pool' },
			{ name: 'Pool', value: pool }
		];
	};

	export const initalLiquidity = (amountA: string, amountB: string) => {
		return [
			{ name: 'Action', value: 'InitalLiquidity' },
			{ name: 'amountA', value: amountA },
			{ name: 'amountB', value: amountB },
		];
	};

	export const add = (amountA: string, amountB: string) => {
		return [
			{ name: 'Action', value: 'Add' },
			{ name: 'amountA', value: amountA },
			{ name: 'amountB', value: amountB },
		];
	};

	export const remove = (share: string) => {
		return [
			{ name: 'Action', value: 'Remove' },
			{ name: 'share', value: share },
		];
	};

	export const swapA = (amount: string, slippage: string) => {
		return [
			{ name: 'Action', value: 'SwapA' },
			{ name: 'amount', value: amount },
			{ name: 'slippage', value: slippage },
		];
	};

	export const swapB = (amount: string, slippage: string) => {
		return [
			{ name: 'Action', value: 'SwapB' },
			{ name: 'amount', value: amount },
			{ name: 'slippage', value: slippage },
		];
	};

	export const balance = () => {
		return [{ name: 'Action', value: 'Balance' }];
	};

	export const info = () => {
		return [{ name: 'Action', value: 'Info' }];
	};

	/*export const withdrawB = (amount: string) => {
		return [
			{ name: 'Action', value: 'WithdrawBox' },
			{ name: 'Quantity', value: amount },
			{ name: 'isTokenA', value: "false" }
		];
	};

	export const withdrawA = (amount: string) => {
		return [
			{ name: 'Action', value: 'WithdrawBox' },
			{ name: 'Quantity', value: amount },
			{ name: 'isTokenA', value: "true" }
		];
	};*/
</script>
