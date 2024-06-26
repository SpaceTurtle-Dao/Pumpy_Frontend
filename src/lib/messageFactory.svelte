<script context="module" lang="ts">
	import type { TokenData } from "./models/TokenData.svelte";

	export const init = (
		tokenA: TokenData,
		tokenB: TokenData,
		bondingCurve: string,
	) => {
		let data = {
			bondingCurve:bondingCurve,
			tokenA:tokenA,
			tokenB:tokenB
		};
		let json = JSON.stringify(data);
		console.log(json);
		return [
			{ name: 'Action', value: 'Init' },
			{ name: 'data', value: json},
		];
	};
	export const add = (amountA: string, amountB: string) => {
		return [
			{ name: 'Action', value: 'LiquidityBox' },
			{ name: 'amountA', value: amountA },
			{ name: 'amountB', value: amountB },
			{ name: 'isAdd', value: true }
		];
	};

	export const remove = (share: string) => {
		return [
			{ name: 'Action', value: 'LiquidityBox' },
			{ name: 'share', value: share },
			{ name: 'isAdd', value: false }
		];
	};

	export const swapA = (amount: string, slippage: string) => {
		return [
			{ name: 'Action', value: 'SwapBox' },
			{ name: 'amount', value: amount },
			{ name: 'slippage', value: slippage },
			{ name: 'isTokenA', value: true }
		];
	};

	export const swapB = (amount: string, slippage: string) => {
		return [
			{ name: 'Action', value: 'SwapBox' },
			{ name: 'amount', value: amount },
			{ name: 'slippage', value: slippage },
			{ name: 'isTokenA', value: false }
		];
	};

	export const withdrawB = (amount: string) => {
		return [
			{ name: 'Action', value: 'WithdrawBox' },
			{ name: 'Quantity', value: amount },
			{ name: 'isTokenA', value: false }
		];
	};

	export const withdrawA = (amount: string) => {
		return [
			{ name: 'Action', value: 'WithdrawBox' },
			{ name: 'Quantity', value: amount },
			{ name: 'isTokenA', value: true }
		];
	};

	export const balance = () => {
		return [{ name: 'Action', value: 'BalanceBox' }];
	};

	export const info = () => {
		return [{ name: 'Action', value: 'Info' }];
	};
</script>
