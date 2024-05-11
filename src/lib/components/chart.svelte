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
		CategoryScale,
	} from 'chart.js';

	ChartJS.register(Title, Tooltip, Legend, LineElement, LinearScale, PointElement, CategoryScale);
</script>

<Line
	{data}
	options={{
        /*layout:{
            padding:{
              left: -8,
              right: -8,
              top: -20,
              bottom: -8,
            }
        },*/
		responsive: true,
		plugins: {
			legend: {
				display: false
			}
		},
		scales: {
            y: {
                grid:{
                    display:false
                },
                ticks:{
                    display:false
                },
                //beginZero:true,
            },
            x: {
                grid:{
                    display:false
                },
                ticks:{
                    display:false
                },
                //beginZero:true,
            },
        }
	}}
/>
