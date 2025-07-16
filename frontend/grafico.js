var botao = document.getElementById('gerar');

botao.onclick = function() {
  var start = Number(document.getElementById('start').value);
  var end = Number(document.getElementById('end').value);

  if ((end - start) < 10 && start != end && (end - start) > 0) {
    var ctx1 = document.getElementById('line-chart').getContext('2d');
    var ctx2 = document.getElementById('line-chart2').getContext('2d');

    fetch('http://localhost:3000/produto')
    .then(function(response) {
      return response.json();
    })
    .then(function(produtos) {
      var titulos = [];
      var estoques = [];
      for (var i = 0; i < produtos.length; i++) {
        if (i >= start && i <= end) {
          titulos.push(produtos[i].titulo);
          estoques.push(produtos[i].estoque);
        }
      }
      var chartExistente = Chart.getChart('line-chart');
      if (chartExistente) {
        chartExistente.destroy();
      }
      new Chart(ctx1, {
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
            y: { beginAtZero: true }
          }
        }
      });
    });

    fetch('http://localhost:3000/usuario')
    .then(function(response) {
      return response.json();
    })
    .then(function(usuarios) {
      var nomes = [];
      var idades = [];
      for (var i = 0; i < usuarios.length; i++) {
        if (i >= start && i <= end) {
          nomes.push(usuarios[i].nome);
          idades.push(usuarios[i].idade);
        }
      }
      var chartExistente2 = Chart.getChart('line-chart2');
      if (chartExistente2) {
        chartExistente2.destroy();
      }
      new Chart(ctx2, {
        type: 'bar',
        data: {
          labels: nomes,
          datasets: [{
            label: 'Usuários',
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
            y: { beginAtZero: true }
          }
        }
      });
    });
  } else {
    alert('Por favor, insira um intervalo válido (diferença menor que 10 e não iguais)');
  }
};