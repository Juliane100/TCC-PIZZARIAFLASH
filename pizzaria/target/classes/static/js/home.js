var ctx = document.getElementById('graficoBarras').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro'],
        datasets: [{
            label: 'Quantidade',
            data: [12, 19, 3, 10, 4, 10, 16, 7, 10],
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'white',
            borderWidth: 1.5,
            yAxisID: 'y',
        }]
    },
    options: {
        scales: {
            y: {
                beginAtZero: true,
                ticks: {
                    color: 'white'
                },
                grid: {
                    color: 'white'
                }
            },
            x: {
                ticks: {
                    color: 'white'
                },
                grid: {
                    color: 'white'
                }
            }
        },
        plugins: {
            legend: {
                labels: {
                    fontColor: 'white'
                }
            }
        }
    }
});
