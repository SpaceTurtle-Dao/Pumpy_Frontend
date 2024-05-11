import type { ChartData } from "chart.js";
var sun = new Image(65,65);
sun.src = './sunny.jpeg';
export const data:ChartData = {
    labels: [10,9,8,7,6,5,4,3,2,1],
    datasets: [
      {
        pointStyle : sun,
        label: '',
        fill: true,
        backgroundColor: 'rgb(255, 99, 132)',
        borderColor: 'rgb(103 101 174)',
        borderCapStyle: 'butt',
        //pointBorderColor: 'rgb(205, 130,1 58)',
        //pointBackgroundColor: 'rgb(255, 255, 255)',
        //pointBorderWidth: 10,
        //pointHoverRadius: 5,
        //pointHoverBackgroundColor: 'rgb(0, 0, 0)',
        //pointHoverBorderColor: 'rgba(220, 220, 220,1)',
        pointHoverBorderWidth: 2,
        pointRadius: 25,
        pointHitRadius: 10,
        tension: 0.3,
        data: [1,2,3,4,5,5,4,3,2,1],
      }
    ],
  };
  