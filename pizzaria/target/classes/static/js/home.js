 var ctx = document.getElementById('graficoBarras').getContext('2d');
        var myChart = new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Item 1', 'Item 2', 'Item 3', 'Item 4', 'Item 5'],
                datasets: [{
                    label: 'Quantidade',
                    data: [12, 19, 3, 5, 2],
                    backgroundColor: 'rgba(75, 192, 192, 0.2)', // Cor das barras
                    borderColor: 'white', // Cor das linhas das barras
                    borderWidth: 0.5 // Largura das linhas das barras
                }]
            },
            options: {
                scales: {
                    y: {
                        beginAtZero: true,
                        ticks: {
                            color: 'white' // Cor dos números do eixo Y
                        },
                        grid: {
                            color: 'white' // Cor das linhas do eixo Y
                        }
                    },
                    x: {
                        ticks: {
                            color: 'white' // Cor dos números do eixo X
                        },
                        grid: {
                            color: 'white' // Cor das linhas do eixo X
                        }
                    }
                }
            }
        });