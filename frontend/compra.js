// Função para mostrar apenas a seção selecionada
function showSection(sectionId) {
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
    });
    document.getElementById(sectionId).classList.add('active');
    document.getElementById(`nav-${sectionId}`).classList.add('active');
}

// Mostrar compras na tabela
function mostrarCompras(compras, tabelaId, resultDivId) {
    const tabela = document.getElementById(tabelaId);
    const resultDiv = document.getElementById(resultDivId);
    tabela.innerHTML = '';
    const comprasArray = Array.isArray(compras) ? compras : [compras];
    if (comprasArray.length === 0) {
        resultDiv.innerHTML = '<span class="error">Nenhuma compra encontrada.</span>';
        return;
    }
    comprasArray.forEach(compra => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
  <td>${compra.id || ''}</td>
  <td>${compra.usuario_id || ''}</td>
  <td>${compra.produto_id || ''}</td>
  <td>${compra.quantidade || ''}</td>
  <td>${compra.data_compra ? new Date(compra.data_compra).toLocaleDateString('pt-BR') : ''}</td>
  <td>${compra.preco_unitario ? compra.preco_unitario.toFixed(2) : ''}</td>
  <td>${compra.desconto_aplicado ? compra.desconto_aplicado.toFixed(2) : ''}</td>
  <td>${compra.preco_final ? compra.preco_final.toFixed(2) : ''}</td>
  <td>${compra.forma_pagamento || ''}</td>
  <td>${compra.status_compra || ''}</td>
`;
        tabela.appendChild(linha);
    });
    resultDiv.innerHTML = 'Resultados exibidos.';
}

// Criar compra
function criarCompra() {
    const usuario_id = document.getElementById('usuario-id-criar').value;
    const produto_id = document.getElementById('produto-id-criar').value;
    const quantidade = document.getElementById('quantidade-criar').value;
    const data_compra = document.getElementById('data-compra-criar').value;
    const preco_unitario = document.getElementById('preco-unitario-criar').value;
    const desconto_aplicado = document.getElementById('desconto-aplicado-criar').value;
    const preco_final = document.getElementById('preco-final-criar').value;
    const forma_pagamento = document.getElementById('forma-pagamento-criar').value;
    const status_compra = document.getElementById('status-compra-criar').value;

    if (!usuario_id || !produto_id || !quantidade || !data_compra || !preco_unitario || !desconto_aplicado || !preco_final || !forma_pagamento || !status_compra) {
        document.getElementById('res-cadastrar-criar').innerHTML = `<span class="error">Preencha todos os campos! Campos ausentes: ${[
            !usuario_id && 'ID do Usuário',
            !produto_id && 'ID do Produto',
            !quantidade && 'Quantidade',
            !data_compra && 'Data da Compra',
            !preco_unitario && 'Preço Unitário',
            !desconto_aplicado && 'Desconto Aplicado',
            !preco_final && 'Preço Final',
            !forma_pagamento && 'Forma de Pagamento',
            !status_compra && 'Status da Compra'
        ].filter(Boolean).join(', ')}</span>`;
        return;
    }

    const usuarioIdNumber = parseInt(usuario_id);
    const produtoIdNumber = parseInt(produto_id);
    const quantidadeNumber = parseInt(quantidade);
    if (isNaN(usuarioIdNumber) || usuarioIdNumber <= 0 || isNaN(produtoIdNumber) || produtoIdNumber <= 0 || isNaN(quantidadeNumber) || quantidadeNumber <= 0) {
        document.getElementById('res-cadastrar-criar').innerHTML = '<span class="error">ID do Usuário, ID do Produto e Quantidade devem ser números inteiros positivos!</span>';
        return;
    }

    fetch('http://localhost:3000/compra', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            usuario_id: usuarioIdNumber,
            produto_id: produtoIdNumber,
            quantidade: quantidadeNumber,
            data_compra,
            preco_unitario: parseFloat(preco_unitario),
            desconto_aplicado: parseFloat(desconto_aplicado),
            preco_final: parseFloat(preco_final),
            forma_pagamento,
            status_compra
        })
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(error => {
                    throw new Error(error.message || `Erro HTTP: ${response.status}`);
                });
            }
            return response.json();
        })
        .then(compra => {
            document.getElementById('res-cadastrar-criar').innerHTML = 'Compra criada!';
            document.getElementById('usuario-id-criar').value = '';
            document.getElementById('produto-id-criar').value = '';
            document.getElementById('quantidade-criar').value = '';
            document.getElementById('data-compra-criar').value = '';
            document.getElementById('preco-unitario-criar').value = '';
            document.getElementById('desconto-aplicado-criar').value = '';
            document.getElementById('preco-final-criar').value = '';
            document.getElementById('forma-pagamento-criar').value = '';
            document.getElementById('status-compra-criar').value = '';
            mostrarCompras([compra], 'tabela-criar', 'res-cadastrar-criar');
        })
        .catch(error => {
            console.error('Erro ao criar compra:', error);
            document.getElementById('res-cadastrar-criar').innerHTML = `<span class="error">Erro ao criar compra: ${error.message}</span>`;
        });
}

// Atualizar compra
function atualizarCompra() {
    const id = document.getElementById('id-atualizar').value.trim();
    const usuario_id = document.getElementById('usuario-id-atualizar').value;
    const produto_id = document.getElementById('produto-id-atualizar').value;
    const quantidade = document.getElementById('quantidade-atualizar').value;
    const data_compra = document.getElementById('data-compra-atualizar').value;
    const preco_unitario = document.getElementById('preco-unitario-atualizar').value;
    const desconto_aplicado = document.getElementById('desconto-aplicado-atualizar').value;
    const preco_final = document.getElementById('preco-final-atualizar').value;
    const forma_pagamento = document.getElementById('forma-pagamento-atualizar').value;
    const status_compra = document.getElementById('status-compra-atualizar').value;

    console.log('Valores do formulário de atualização:', {
        id, usuario_id, produto_id, quantidade, data_compra, preco_unitario, desconto_aplicado, preco_final, forma_pagamento, status_compra
    });

    if (!id || !usuario_id || !produto_id || !quantidade || !data_compra || !preco_unitario || !desconto_aplicado || !preco_final || !forma_pagamento || !status_compra) {
        document.getElementById('res-cadastrar-atualizar').innerHTML = `<span class="error">Preencha todos os campos! Campos ausentes: ${[
            !id && 'ID',
            !usuario_id && 'ID do Usuário',
            !produto_id && 'ID do Produto',
            !quantidade && 'Quantidade',
            !data_compra && 'Data da Compra',
            !preco_unitario && 'Preço Unitário',
            !desconto_aplicado && 'Desconto Aplicado',
            !preco_final && 'Preço Final',
            !forma_pagamento && 'Forma de Pagamento',
            !status_compra && 'Status da Compra'
        ].filter(Boolean).join(', ')}</span>`;
        return;
    }

    const idNumber = parseInt(id);
    const usuarioIdNumber = parseInt(usuario_id);
    const produtoIdNumber = parseInt(produto_id);
    const quantidadeNumber = parseInt(quantidade);
    if (isNaN(idNumber) || idNumber <= 0 || isNaN(usuarioIdNumber) || usuarioIdNumber <= 0 || isNaN(produtoIdNumber) || produtoIdNumber <= 0 || isNaN(quantidadeNumber) || quantidadeNumber <= 0) {
        document.getElementById('res-cadastrar-atualizar').innerHTML = '<span class="error">ID, ID do Usuário, ID do Produto e Quantidade devem ser números inteiros positivos!</span>';
        return;
    }

    fetch(`http://localhost:3000/compra/${idNumber}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            usuario_id: usuarioIdNumber,
            produto_id: produtoIdNumber,
            quantidade: quantidadeNumber,
            data_compra,
            preco_unitario: parseFloat(preco_unitario),
            desconto_aplicado: parseFloat(desconto_aplicado),
            preco_final: parseFloat(preco_final),
            forma_pagamento,
            status_compra
        })
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(error => {
                    throw new Error(error.message || `Erro HTTP: ${response.status}`);
                });
            }
            return response.json();
        })
        .then(compra => {
            document.getElementById('res-cadastrar-atualizar').innerHTML = 'Compra atualizada!';
            limparFormularioAtualizar();
            mostrarCompras([compra], 'tabela-atualizar', 'res-cadastrar-atualizar');
        })
        .catch(error => {
            console.error('Erro ao atualizar compra:', error);
            document.getElementById('res-cadastrar-atualizar').innerHTML = `<span class="error">Erro ao atualizar compra: ${error.message}</span>`;
        });
}

// Limpar formulário de atualização
function limparFormularioAtualizar() {
    document.getElementById('id-atualizar').value = '';
    document.getElementById('usuario-id-atualizar').value = '';
    document.getElementById('produto-id-atualizar').value = '';
    document.getElementById('quantidade-atualizar').value = '';
    document.getElementById('data-compra-atualizar').value = '';
    document.getElementById('preco-unitario-atualizar').value = '';
    document.getElementById('desconto-aplicado-atualizar').value = '';
    document.getElementById('preco-final-atualizar').value = '';
    document.getElementById('forma-pagamento-atualizar').value = '';
    document.getElementById('status-compra-atualizar').value = '';
    document.getElementById('botao-cancelar').style.display = 'none';
    document.getElementById('res-cadastrar-atualizar').innerHTML = '';
    document.getElementById('tabela-atualizar').innerHTML = '';
}

// Apagar compra
function apagarCompra() {
    const id = document.getElementById('id-apagar').value.trim();
    if (!id) {
        document.getElementById('res-cadastrar-apagar').innerHTML = '<span class="error">Digite um ID para apagar!</span>';
        return;
    }

    const idNumber = parseInt(id);
    if (isNaN(idNumber) || idNumber <= 0) {
        document.getElementById('res-cadastrar-apagar').innerHTML = '<span class="error">O ID deve ser um número inteiro positivo!</span>';
        return;
    }

    console.log('Tentando apagar compra com ID:', idNumber);
    console.log('Enviando DELETE para:', `http://localhost:3000/compra/${idNumber}`);

    if (!confirm('Tem certeza que deseja apagar esta compra?')) {
        return;
    }

    fetch(`http://localhost:3000/compra/${idNumber}`, {
        method: 'DELETE',
        headers: { 'Content-Type': 'application/json' }
    })
        .then(response => {
            console.log('Resposta do servidor:', {
                status: response.status,
                statusText: response.statusText,
                ok: response.ok
            });
            if (!response.ok) {
                return response.text().then(text => {
                    let errorMessage;
                    try {
                        const error = JSON.parse(text);
                        errorMessage = error.message || `Erro HTTP: ${response.status}`;
                    } catch (e) {
                        errorMessage = text || `Erro HTTP: ${response.status}`;
                    }
                    throw new Error(errorMessage);
                });
            }
            return response.text();
        })
        .then(text => {
            console.log('Resposta do corpo:', text || 'Nenhum conteúdo retornado');
            document.getElementById('res-cadastrar-apagar').innerHTML = 'Compra apagada com sucesso!';
            document.getElementById('id-apagar').value = '';
            document.getElementById('tabela-apagar').innerHTML = '';
        })
        .catch(error => {
            console.error('Erro ao apagar compra:', error);
            document.getElementById('res-cadastrar-apagar').innerHTML = `<span class="error">Erro ao apagar compra: ${error.message}</span>`;
        });
}

// Listar todas as compras
function listarCompras() {
    fetch('http://localhost:3000/compra')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(compras => {
            mostrarCompras(compras, 'tabela-lista', 'res-cadastrar-lista');
        })
        .catch(error => {
            console.error('Erro ao listar compras:', error);
            document.getElementById('res-cadastrar-lista').innerHTML = `<span class="error">Erro ao carregar compras: ${error.message}</span>`;
        });
}

// Mostrar a seção "Criar" por padrão ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    showSection('criar');
});