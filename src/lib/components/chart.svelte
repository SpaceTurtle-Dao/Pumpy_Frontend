<script>
	import { onMount } from 'svelte';
	import { createChart } from 'lightweight-charts';

	onMount(() => {
		// @ts-ignore
		function generateRandomCandlestickData(numCandles) {
			// @ts-ignore
			function getRandomPrice(basePrice, volatility) {
				return basePrice + (Math.random() - 0.5) * volatility;
			}

			const data = [];
			let basePrice = 100; // starting price
			const volatility = 5; // max fluctuation of the price

			for (let i = 0; i < numCandles; i++) {
				const open = getRandomPrice(basePrice, volatility);
				const close = getRandomPrice(open, volatility);
				const high = Math.max(open, close) + Math.random() * volatility;
				const low = Math.min(open, close) - Math.random() * volatility;
				let time = new Date().getTime() + i * 60000;
				let date = new Date(time);
				var year = date.toLocaleString('default', { year: 'numeric' });
				var month = date.toLocaleString('default', { month: '2-digit' });
				var day = date.toLocaleString('default', { day: '2-digit' });
				var hour = date.toLocaleString('default', { hour: '2-digit' });
				// Generate yyyy-mm-dd date string
				// @ts-ignore
				// @ts-ignore
				var formattedDate = year + '-' + month + '-' + day + '-' + hour;
				data.push({
					time: time, // assuming each candle represents 1 minute
					open: Number(open.toFixed(2)),
					high: Number(high.toFixed(2)),
					low: Number(low.toFixed(2)),
					close: Number(close.toFixed(2))
				});

				basePrice = close; // next candle's base price starts from the current close price
			}

			return data;
		}

		// Usage example:
		const numCandles = 100;
		// @ts-ignore
		const candlestickData = generateRandomCandlestickData(numCandles);
		console.log(candlestickData);

		// @ts-ignore
		// @ts-ignore
		// @ts-ignore
		// @ts-ignore
		// @ts-ignore
		const chartOptions = {
			layout: { textColor: 'black', background: { type: 'solid', color: 'white' } }
		};
		//const chart = createChart(document.body, { width: 400, height: 300 });
		// @ts-ignore

		const chart = createChart('container', {
			//width: 1500,
			//height: 450,
            autoSize:true,
			layout: {
				// @ts-ignore
				background: { type: 'solid', color: 'black' },
				textColor: 'rgba(33, 56, 77, 1)'
			},
			localization: {
				locale: 'cn-CN'
			},
			grid: {
				vertLines: {
					color: 'rgba(197, 203, 206, 0.7)'
				},
				horzLines: {
					color: 'rgba(197, 203, 206, 0.7)'
				}
			},
			timeScale: {
				timeVisible: true,
				secondsVisible: false
			}
		});
		const candlestickSeries = chart.addCandlestickSeries({
			upColor: '#26a69a',
			downColor: '#ef5350',
			borderVisible: false,
			wickUpColor: '#26a69a',
			wickDownColor: '#ef5350'
		});
		// @ts-ignore
		candlestickSeries.setData(candlestickData);

		chart.timeScale().fitContent();
		// @ts-ignore
		chart.timeScale().scrollToPosition(5);
	});
</script>

<div id="container" class="w-full h-96"></div>
