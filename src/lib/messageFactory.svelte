<script lang="ts">
	export const init = async (
		tokenA: string,
		tokenB: string,
		amountA: string,
		amountB: string,
		BondingCurve: string,
		nameA: string,
		tickerA: string,
		logoA: string,
		denominationA: string,
		nameB: string,
		tickerB: string,
		logoB: string,
		denominationB: string
	) => {
		return [
			{ name: 'Action', value: 'Init' },
			{ name: 'TokenAProcess', value: tokenA },
			{ name: 'TokenBProcess', value: tokenB },
			{ name: 'amountA', value: amountA },
			{ name: 'amountB', value: amountB },
			{ name: 'BondingCurve', value: BondingCurve },
			{ name: 'NameA', value: nameA },
			{ name: 'TickerA', value: tickerA },
			{ name: 'LogoA', value: logoA },
			{ name: 'DenominationA', value: denominationA },
			{ name: 'NameB', value: nameB },
			{ name: 'TickerB', value: tickerB },
			{ name: 'LogoB', value: logoB },
			{ name: 'DenominationB', value: denominationB }
		];
	};
    export const add = async (
		amountA: string,
		amountB: string,
	) => {
		return [
			{ name: 'Action', value: 'LiquidityBox' },
			{ name: 'amountA', value: amountA },
			{ name: 'amountB', value: amountB },
			{ name: 'isAdd', value: true },
		];
	};

    export const remove = async (
		share: string,
	) => {
		return [
			{ name: 'Action', value: 'LiquidityBox' },
			{ name: 'share', value: share },
			{ name: 'isAdd', value: false },
		];
	};

    export const swapA = async (
		amount: string,
        slippage: string,
	) => {
		return [
			{ name: 'Action', value: 'LiquidityBox' },
			{ name: 'amount', value: amount },
            { name: 'slippage', value: slippage },
			{ name: 'isTokenA', value: true },
		];
	};
</script>
