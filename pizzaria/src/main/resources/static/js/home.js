var ctx = document.getElementById('myChart').getContext('2d');
var myChart = new Chart(ctx, {
    type: 'bar',
    data: {
        labels: ['segunda', 'terça', 'quarta', 'quinta', 'sexta', 'sábado', 'domingo'],
        datasets: [{
            label: 'Quantidade de Pedidos',
            data: [], 
            backgroundColor: 'rgba(54,54,54, 0.5)', 
            borderColor: 'rgba(245,245,245, 1)', 
            borderWidth: 1.9,
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


// Crie uma função para buscar os dados dos pedidos do seu serviço Spring
function buscarDadosPedidos() {
    fetch('/pedido/qtd-semana')
        .then(response => response.json())
        .then(data => {

            // Mapeie os dados recebidos para o formato correto para o gráfico
            const diasDaSemana = ['segunda-feira', 'terça-feira', 'quarta-feira', 'quinta-feira', 'sexta-feira', 'sábado', 'domingo'];
            const dadosDoGrafico = diasDaSemana.map(dia => data[dia] || 0);

            myChart.data.datasets[0].data = dadosDoGrafico;
            myChart.update();
        })
        .catch(error => {
            console.error('Erro ao buscar dados:', error);
        });
}

window.addEventListener('load', () => {
    buscarDadosPedidos();
});

setInterval(buscarDadosPedidos, 5000);
