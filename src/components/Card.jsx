import React from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title);

const data = {
    labels: Array.from({ length: 30 }, (_, i) => i + 1),
    datasets: [
        {
            label: 'Visitors Analytics',
            data: [100, 200, 150, 400, 300, 200, 250, 350, 100, 200, 150, 400, 300, 200, 250, 350, 100, 200, 150, 400, 300, 200, 250, 350],
            backgroundColor: 'rgba(54, 162, 235, 0.6)',
        },
    ],
};

function Chart() {
    return <Bar data={data} options={{ responsive: true }} />;
}

export default Chart;
