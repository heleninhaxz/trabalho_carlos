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

// Mostrar produtos na tabela
function mostrarProdutos(produtos, tabelaId, resultDivId) {
    const tabela = document.getElementById(tabelaId);
    const resultDiv = document.getElementById(resultDivId);
    tabela.innerHTML = '';
    const produtosArray = Array.isArray(produtos) ? produtos : [produtos];
    if (produtosArray.length === 0) {
        resultDiv.innerHTML = '<span class="error">Nenhum produto encontrado.</span>';
        return;
    }
    produtosArray.forEach(produto => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
  <td>${produto.id || ''}</td>
  <td>${produto.titulo || ''}</td>
  <td>${produto.descricao || ''}</td>
  <td>${produto.categoria || ''}</td>
  <td>${produto.preco ? produto.preco.toFixed(2) : ''}</td>
  <td>${produto.percentual_desconto ? produto.percentual_desconto.toFixed(2) : ''}</td>
  <td>${produto.estoque || ''}</td>
  <td>${produto.marca || ''}</td>
  <td><a href="${produto.imagem || ''}" target="_blank">${produto.imagem || ''}</a></td>
`;
        tabela.appendChild(linha);
    });
    resultDiv.innerHTML = 'Resultados exibidos.';
}

// Criar produto
function criarProduto() {
    const titulo = document.getElementById('titulo-criar').value.trim();
    const descricao = document.getElementById('descricao-criar').value.trim();
    const categoria = document.getElementById('categoria-criar').value.trim();
    const preco = document.getElementById('preco-criar').value;
    const percentual_desconto = document.getElementById('percentual-desconto-criar').value;
    const estoque = document.getElementById('estoque-criar').value;
    const marca = document.getElementById('marca-criar').value.trim();
    const imagem = document.getElementById('imagem-criar').value.trim();

    if (!titulo || !descricao || !categoria || !preco || !percentual_desconto || !estoque || !marca || !imagem) {
        document.getElementById('res-cadastrar-criar').innerHTML = `<span class="error">Preencha todos os campos! Campos ausentes: ${[
            !titulo && 'Título',
            !descricao && 'Descrição',
            !categoria && 'Categoria',
            !preco && 'Preço',
            !percentual_desconto && 'Percentual de Desconto',
            !estoque && 'Estoque',
            !marca && 'Marca',
            !imagem && 'Imagem'
        ].filter(Boolean).join(', ')}</span>`;
        return;
    }

    fetch('http://localhost:3000/produto', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            titulo,
            descricao,
            categoria,
            preco: parseFloat(preco),
            percentual_desconto: parseFloat(percentual_desconto),
            estoque: parseInt(estoque),
            marca,
            imagem
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
        .then(produto => {
            document.getElementById('res-cadastrar-criar').innerHTML = 'Produto criado!';
            document.getElementById('titulo-criar').value = '';
            document.getElementById('descricao-criar').value = '';
            document.getElementById('categoria-criar').value = '';
            document.getElementById('preco-criar').value = '';
            document.getElementById('percentual-desconto-criar').value = '';
            document.getElementById('estoque-criar').value = '';
            document.getElementById('marca-criar').value = '';
            document.getElementById('imagem-criar').value = '';
            mostrarProdutos([produto], 'tabela-criar', 'res-cadastrar-criar');
        })
        .catch(error => {
            console.error('Erro ao criar produto:', error);
            document.getElementById('res-cadastrar-criar').innerHTML = `<span class="error">Erro ao criar produto: ${error.message}</span>`;
        });
}

// Atualizar produto
function atualizarProduto() {
    const id = document.getElementById('id-atualizar').value.trim();
    const titulo = document.getElementById('titulo-atualizar').value.trim();
    const descricao = document.getElementById('descricao-atualizar').value.trim();
    const categoria = document.getElementById('categoria-atualizar').value.trim();
    const preco = document.getElementById('preco-atualizar').value;
    const percentual_desconto = document.getElementById('percentual-desconto-atualizar').value;
    const estoque = document.getElementById('estoque-atualizar').value;
    const marca = document.getElementById('marca-atualizar').value.trim();
    const imagem = document.getElementById('imagem-atualizar').value.trim();

    console.log('Valores do formulário de atualização:', {
        id, titulo, descricao, categoria, preco, percentual_desconto, estoque, marca, imagem
    });

    if (!id || !titulo || !descricao || !categoria || !preco || !percentual_desconto || !estoque || !marca || !imagem) {
        document.getElementById('res-cadastrar-atualizar').innerHTML = `<span class="error">Preencha todos os campos! Campos ausentes: ${[
            !id && 'ID',
            !titulo && 'Título',
            !descricao && 'Descrição',
            !categoria && 'Categoria',
            !preco && 'Preço',
            !percentual_desconto && 'Percentual de Desconto',
            !estoque && 'Estoque',
            !marca && 'Marca',
            !imagem && 'Imagem'
        ].filter(Boolean).join(', ')}</span>`;
        return;
    }

    fetch(`http://localhost:3000/produto/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            titulo,
            descricao,
            categoria,
            preco: parseFloat(preco),
            percentual_desconto: parseFloat(percentual_desconto),
            estoque: parseInt(estoque),
            marca,
            imagem
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
        .then(produto => {
            document.getElementById('res-cadastrar-atualizar').innerHTML = 'Produto atualizado!';
            limparFormularioAtualizar();
            mostrarProdutos([produto], 'tabela-atualizar', 'res-cadastrar-atualizar');
        })
        .catch(error => {
            console.error('Erro ao atualizar produto:', error);
            document.getElementById('res-cadastrar-atualizar').innerHTML = `<span class="error">Erro ao atualizar produto: ${error.message}</span>`;
        });
}

// Limpar formulário de atualização
function limparFormularioAtualizar() {
    document.getElementById('id-atualizar').value = '';
    document.getElementById('titulo-atualizar').value = '';
    document.getElementById('descricao-atualizar').value = '';
    document.getElementById('categoria-atualizar').value = '';
    document.getElementById('preco-atualizar').value = '';
    document.getElementById('percentual-desconto-atualizar').value = '';
    document.getElementById('estoque-atualizar').value = '';
    document.getElementById('marca-atualizar').value = '';
    document.getElementById('imagem-atualizar').value = '';
    document.getElementById('botao-cancelar').style.display = 'none';
    document.getElementById('res-cadastrar-atualizar').innerHTML = '';
    document.getElementById('tabela-atualizar').innerHTML = '';
}

// Apagar produto
function apagarProduto() {
    const id = document.getElementById('id-apagar').value.trim();
    if (!id) {
        document.getElementById('res-cadastrar-apagar').innerHTML = '<span class="error">Digite um ID para apagar!</span>';
        return;
    }

    // Validar se o ID é um número inteiro positivo
    const idNumber = parseInt(id);
    if (isNaN(idNumber) || idNumber <= 0) {
        document.getElementById('res-cadastrar-apagar').innerHTML = '<span class="error">O ID deve ser um número inteiro positivo!</span>';
        return;
    }

    console.log('Tentando apagar produto com ID:', idNumber);
    console.log('Enviando DELETE para:', `http://localhost:3000/produto/${idNumber}`);

    if (!confirm('Tem certeza que deseja apagar este produto?')) {
        return;
    }

    fetch(`http://localhost:3000/produto/${idNumber}`, {
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
            document.getElementById('res-cadastrar-apagar').innerHTML = 'Produto apagado com sucesso!';
            document.getElementById('id-apagar').value = '';
            document.getElementById('tabela-apagar').innerHTML = '';
        })
        .catch(error => {
            console.error('Erro ao apagar produto:', error);
            document.getElementById('res-cadastrar-apagar').innerHTML = `<span class="error">Erro ao apagar produto: ${error.message}</span>`;
        });
}

// Buscar por título
function buscarProdutosPorTitulo() {
    const titulo = document.getElementById('busca-titulo').value.trim();
    if (!titulo) {
        document.getElementById('res-cadastrar-titulo').innerHTML = '<span class="error">Digite um título para buscar!</span>';
        return;
    }
    fetch(`http://localhost:3000/produto/titulo/${titulo}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(produtos => {
            mostrarProdutos(produtos, 'tabela-titulo', 'res-cadastrar-titulo');
        })
        .catch(error => {
            console.error('Erro ao buscar por título:', error);
            document.getElementById('res-cadastrar-titulo').innerHTML = `<span class="error">Erro ao buscar produtos: ${error.message}</span>`;
        });
}

// Buscar por ID
function buscarProdutoPorId() {
    const id = document.getElementById('busca-id').value.trim();
    if (!id) {
        document.getElementById('res-cadastrar-id').innerHTML = '<span class="error">Digite um ID para buscar!</span>';
        return;
    }

    const idNumber = parseInt(id);
    if (isNaN(idNumber) || idNumber <= 0) {
        document.getElementById('res-cadastrar-id').innerHTML = '<span class="error">O ID deve ser um número inteiro positivo!</span>';
        return;
    }

    fetch(`http://localhost:3000/produto/id/${idNumber}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Produto não encontrado: ${response.status}`);
            }
            return response.json();
        })
        .then(produto => {
            mostrarProdutos([produto], 'tabela-id', 'res-cadastrar-id');
        })
        .catch(error => {
            console.error('Erro ao buscar por ID:', error);
            document.getElementById('res-cadastrar-id').innerHTML = `<span class="error">Erro ao buscar produto: ${error.message}</span>`;
        });
}

// Listar todos os produtos
function listarProdutos() {
    fetch('http://localhost:3000/produto')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(produtos => {
            mostrarProdutos(produtos, 'tabela-lista', 'res-cadastrar-lista');
        })
        .catch(error => {
            console.error('Erro ao listar produtos:', error);
            document.getElementById('res-cadastrar-lista').innerHTML = `<span class="error">Erro ao carregar produtos: ${error.message}</span>`;
        });
}

// Mostrar a seção "Criar" por padrão ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    showSection('criar');
});