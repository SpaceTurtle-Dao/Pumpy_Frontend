<script>
	// @ts-nocheck

	import { Line } from 'svelte-chartjs';
	import { data } from './data';

	import {
		Chart as ChartJS,
		Title,
		Tooltip,
		Legend,
		LineElement,
		LinearScale,
		PointElement,
		CategoryScale
	} from 'chart.js';

	ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale);
</script>

<Line
	{data}
	options={{
		responsive: true,
		plugins: {
			legend: {
				display: false
			}
		},
		scales: {
            y: {
                min: 0,
                max: 6
            },
            x: {
                min: 0,
                max: 20
            },
        }
	}}
/>
