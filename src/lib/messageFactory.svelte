<script context="module" lang="ts">
	import type { TokenData } from "./models/TokenData.svelte";

	export const init = (
		tokenA: string,
		tokenB: string,
		bondingCurve: string,
	) => {
		return [
			{ name: 'Action', value: 'Init' },
			{ name: 'tokenA', value: tokenA},
			{ name: 'tokenB', value: tokenB},
			{ name: 'bondingCurve', value: bondingCurve},
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
			{ name: 'Action', value: 'add' },
			{ name: 'amountA', value: amountA },
			{ name: 'amountB', value: amountB },
		];
	};

	export const remove = (share: string) => {
		return [
			{ name: 'Action', value: 'remove' },
			{ name: 'share', value: share },
		];
	};

	export const swapA = (amount: string, slippage: string) => {
		return [
			{ name: 'Action', value: 'SwapBox' },
			{ name: 'amount', value: amount },
			{ name: 'slippage', value: slippage },
		];
	};

	export const swapB = (amount: string, slippage: string) => {
		return [
			{ name: 'Action', value: 'SwapBox' },
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
