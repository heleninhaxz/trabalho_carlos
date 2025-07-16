function showSection(id) {
  let sections = document.getElementsByClassName('section');
  for (let i = 0; i < sections.length; i++) {
    sections[i].style.display = 'none';
  }
  document.getElementById(id).style.display = 'block';
}

function preencherTabela(compras, tabelaId) {
  let tabela = document.getElementById(tabelaId);
  tabela.innerHTML = '';
  for (let i = 0; i < compras.length; i++) {
    let c = compras[i];
    let linha = '<tr>' +
      '<td>' + (c.id || '') + '</td>' +
      '<td>' + (c.usuario_id || '') + '</td>' +
      '<td>' + (c.produto_id || '') + '</td>' +
      '<td>' + (c.quantidade || '') + '</td>' +
      '<td>' + (c.data_compra || '') + '</td>' +
      '<td>' + (c.preco_unitario || '') + '</td>' +
      '<td>' + (c.desconto_aplicado || '') + '</td>' +
      '<td>' + (c.preco_final || '') + '</td>' +
      '<td>' + (c.forma_pagamento || '') + '</td>' +
      '<td>' + (c.status_compra || '') + '</td>' +
      '</tr>';
    tabela.innerHTML += linha;
  }
}

function criarCompra() {
  let dados = {
    usuario_id: document.getElementById('usuario-id-criar').value,
    produto_id: document.getElementById('produto-id-criar').value,
    quantidade: document.getElementById('quantidade-criar').value,
    data_compra: document.getElementById('data-compra-criar').value,
    preco_unitario: document.getElementById('preco-unitario-criar').value,
    desconto_aplicado: document.getElementById('desconto-aplicado-criar').value,
    preco_final: document.getElementById('preco-final-criar').value,
    forma_pagamento: document.getElementById('forma-pagamento-criar').value,
    status_compra: document.getElementById('status-compra-criar').value
  };

  fetch('http://localhost:3000/compra', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        alert('Erro ao criar compra');
      }
    })
    .then(function (data) {
      if (data) {
        alert('Compra criada!');
        preencherTabela([data], 'tabela-criar');
        limparCampos('criar');
      }
    })
    .catch(function () {
      alert('Erro na requisição');
    });
}

function atualizarCompra() {
  let id = document.getElementById('id-atualizar').value;
  let dados = {
    usuario_id: document.getElementById('usuario-id-atualizar').value,
    produto_id: document.getElementById('produto-id-atualizar').value,
    quantidade: document.getElementById('quantidade-atualizar').value,
    data_compra: document.getElementById('data-compra-atualizar').value,
    preco_unitario: document.getElementById('preco-unitario-atualizar').value,
    desconto_aplicado: document.getElementById('desconto-aplicado-atualizar').value,
    preco_final: document.getElementById('preco-final-atualizar').value,
    forma_pagamento: document.getElementById('forma-pagamento-atualizar').value,
    status_compra: document.getElementById('status-compra-atualizar').value
  };

  fetch('http://localhost:3000/compra/' + id, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(dados)
  })
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        alert('Erro ao atualizar compra');
      }
    })
    .then(function (data) {
      if (data) {
        alert('Compra atualizada!');
        preencherTabela([data], 'tabela-atualizar');
        limparCampos('atualizar');
      }
    })
    .catch(function () {
      alert('Erro na requisição');
    });
}

function apagarCompra() {
  let id = document.getElementById('id-apagar').value;
  if (!confirm('Quer apagar mesmo?')) {
    return;
  }
  fetch('http://localhost:3000/compra/' + id, {
    method: 'DELETE'
  })
    .then(function (response) {
      if (response.ok) {
        alert('Compra apagada!');
        document.getElementById('tabela-apagar').innerHTML = '';
        document.getElementById('id-apagar').value = '';
      } else {
        alert('Erro ao apagar compra');
      }
    })
    .catch(function () {
      alert('Erro na requisição');
    });
}

function listarCompras() {
  fetch('http://localhost:3000/compra')
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        alert('Erro ao listar compras');
      }
    })
    .then(function (data) {
      if (data) {
        preencherTabela(data, 'tabela-lista');
      }
    })
    .catch(function () {
      alert('Erro na requisição');
    });
}

function limparCampos(sufixo) {
  let campos = document.querySelectorAll('[id$="-' + sufixo + '"]');
  for (let i = 0; i < campos.length; i++) {
    campos[i].value = '';
  }
}

window.onload = function () {
  showSection('criar');
};