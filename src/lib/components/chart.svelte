<script>
    import { onMount } from 'svelte';
    import { createChart } from 'lightweight-charts';

    onMount(() => {
        function generateRandomCandlestickData(numCandles) {
            function getRandomPrice(basePrice, volatility) {
                return basePrice + (Math.random() - 0.5) * volatility;
            }

            const data = [];
            let basePrice = 100;
            const volatility = 5;

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
                var formattedDate = year + '-' + month + '-' + day + '-' + hour;
                data.push({
                    time: time,
                    open: Number(open.toFixed(2)),
                    high: Number(high.toFixed(2)),
                    low: Number(low.toFixed(2)),
                    close: Number(close.toFixed(2))
                });

                basePrice = close;
            }

            return data;
        }

        const numCandles = 1000;
        const candlestickData = generateRandomCandlestickData(numCandles);
        console.log(candlestickData);

        const chartOptions = {
            layout: { textColor: 'black', background: { type: 'solid', color: 'white' } }
        };

        const chart = createChart('container', {
            autoSize: true,
            layout: {
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

        candlestickSeries.setData(candlestickData);
        chart.timeScale().fitContent();
        chart.timeScale().scrollToPosition(5);
    });
</script>

<div id="container" class="w-full h-96 md:h-80 lg:h-64 xl:h-48"></div>







