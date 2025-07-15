const gerar = document.getElementById('gerar')

gerar.addEventListener('click', () => {

    const start = Number(document.getElementById('start').value)
    const end = Number(document.getElementById('end').value)

    if (((end - start) < 10) && (start != end)) {
        let ctx = document.getElementById('line-chart').getContext('2d');
        let ctx2 = document.getElementById('line-chart2').getContext('2d');

        fetch('http://localhost:3000/produto')
            .then(response => response.json())
            .then(produtos => {
                console.log(produtos);

                let titulos = []
                let estoques = []

                for (let i = 0; i < produtos.length; i++) {
                    if ((i >= start) && (i <= end)) {
                        titulos.push(produtos[i].titulo)
                        estoques.push(produtos[i].estoque)
                    }
                }

                const chartExistente = Chart.getChart('line-chart');
                if (chartExistente) {
                    chartExistente.destroy();
                }

                const meuGrafico = new Chart(ctx, {
                    type: 'bar',
                    data: {
                        labels: titulos,
                        datasets: [{
                            label: 'Produtos',
                            data: estoques,
                            backgroundColor: [
                                'rgba(54, 162, 235, 0.6)',
                                'rgba(255, 99, 132, 0.6)',
                                'rgba(255, 206, 86, 0.6)',
                                'rgba(75, 192, 192, 0.6)'
                            ],
                            borderColor: [
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 99, 132, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            })


        fetch('http://localhost:3000/usuario')
            .then(response => response.json())
            .then(usuarios => {
                console.log(usuarios);

                let nomes = []
                let idades = []

                for (let i = 0; i < usuarios.length; i++) {
                    if ((i >= start) && (i <= end)) {
                        nomes.push(usuarios[i].nome)
                        idades.push(usuarios[i].idade)
                    }
                }

                const chartExistente = Chart.getChart('line-chart2');
                if (chartExistente) {
                    chartExistente.destroy();
                }

                const meuGrafico2 = new Chart(ctx2, {
                    type: 'bar',
                    data: {
                        labels: nomes,
                        datasets: [{
                            label: 'Usuarios',
                            data: idades,
                            backgroundColor: [
                                'rgba(54, 162, 235, 0.6)',
                                'rgba(255, 99, 132, 0.6)',
                                'rgba(255, 206, 86, 0.6)',
                                'rgba(75, 192, 192, 0.6)'
                            ],
                            borderColor: [
                                'rgba(54, 162, 235, 1)',
                                'rgba(255, 99, 132, 1)',
                                'rgba(255, 206, 86, 1)',
                                'rgba(75, 192, 192, 1)'
                            ],
                            borderWidth: 1
                        }]
                    },
                    options: {
                        scales: {
                            y: {
                                beginAtZero: true
                            }
                        }
                    }
                });
            })
    } else {
        alert('não pode fazer assim')
    }
})

