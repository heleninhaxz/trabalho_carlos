// Função para mostrar apenas a seção selecionada
function showSection(sectionId) {
    // Remover classe active de todas as seções e links
    document.querySelectorAll('.section').forEach(section => {
        section.classList.remove('active');
    });
    document.querySelectorAll('nav a').forEach(link => {
        link.classList.remove('active');
    });
    // Adicionar classe active à seção e link selecionados
    document.getElementById(sectionId).classList.add('active');
    document.getElementById(`nav-${sectionId}`).classList.add('active');
}

// Mostrar usuários na tabela
function mostrarUsuarios(usuarios, tabelaId, resultDivId) {
    const tabela = document.getElementById(tabelaId);
    const resultDiv = document.getElementById(resultDivId);
    tabela.innerHTML = '';
    // Garantir que usuarios seja um array
    const usuariosArray = Array.isArray(usuarios) ? usuarios : [usuarios];
    if (usuariosArray.length === 0) {
        resultDiv.innerHTML = '<span class="error">Nenhum usuário encontrado.</span>';
        return;
    }
    usuariosArray.forEach(usuario => {
        const linha = document.createElement('tr');
        linha.innerHTML = `
  <td>${usuario.id || ''}</td>
  <td>${usuario.nome || ''}</td>
  <td>${usuario.sobrenome || ''}</td>
  <td>${usuario.idade || ''}</td>
  <td>${usuario.email || ''}</td>
  <td>${usuario.telefone || ''}</td>
  <td>${usuario.endereco || ''}</td>
  <td>${usuario.cidade || ''}</td>
  <td>${usuario.estado || ''}</td>
  <td>${usuario.data_nascimento ? new Date(usuario.data_nascimento).toLocaleDateString('pt-BR') : ''}</td>
`;
        tabela.appendChild(linha);
    });
    resultDiv.innerHTML = 'Resultados exibidos.';
}

// Criar usuário
function criarUsuario() {
    const nome = document.getElementById('nome-criar').value;
    const sobrenome = document.getElementById('sobrenome-criar').value;
    const idade = document.getElementById('idade-criar').value;
    const email = document.getElementById('email-criar').value;
    const telefone = document.getElementById('telefone-criar').value;
    const endereco = document.getElementById('endereco-criar').value;
    const cidade = document.getElementById('cidade-criar').value;
    const estado = document.getElementById('estado-criar').value;
    const data_nascimento = document.getElementById('data-nascimento-criar').value;

    if (!nome || !sobrenome || !idade || !email || !telefone || !endereco || !cidade || !estado || !data_nascimento) {
        document.getElementById('res-cadastrar-criar').innerHTML = '<span class="error">Preencha todos os campos!</span>';
        return;
    }

    fetch('http://localhost:3000/usuario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, sobrenome, idade: parseInt(idade), email, telefone, endereco, cidade, estado, data_nascimento })
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(error => {
                    throw new Error(error.message || `Erro HTTP: ${response.status}`);
                });
            }
            return response.json();
        })
        .then(usuario => {
            document.getElementById('res-cadastrar-criar').innerHTML = 'Usuário criado!';
            document.getElementById('nome-criar').value = '';
            document.getElementById('sobrenome-criar').value = '';
            document.getElementById('idade-criar').value = '';
            document.getElementById('email-criar').value = '';
            document.getElementById('telefone-criar').value = '';
            document.getElementById('endereco-criar').value = '';
            document.getElementById('cidade-criar').value = '';
            document.getElementById('estado-criar').value = '';
            document.getElementById('data-nascimento-criar').value = '';
            mostrarUsuarios([usuario], 'tabela-criar', 'res-cadastrar-criar');
        })
        .catch(error => {
            console.error('Erro ao criar usuário:', error);
            document.getElementById('res-cadastrar-criar').innerHTML = `<span class="error">Erro ao criar usuário: ${error.message}</span>`;
        });
}

// Atualizar usuário
function atualizarUsuario() {
    const id = document.getElementById('id-atualizar').value.trim();
    const nome = document.getElementById('nome-atualizar').value.trim();
    const sobrenome = document.getElementById('sobrenome-atualizar').value.trim();
    const idade = document.getElementById('idade-atualizar').value;
    const email = document.getElementById('email-atualizar').value.trim();
    const telefone = document.getElementById('telefone-atualizar').value.trim();
    const endereco = document.getElementById('endereco-atualizar').value.trim();
    const cidade = document.getElementById('cidade-atualizar').value.trim();
    const estado = document.getElementById('estado-atualizar').value.trim();
    const data_nascimento = document.getElementById('data-nascimento-atualizar').value;

    // Log dos valores para depuração
    console.log('Valores do formulário de atualização:', {
        id, nome, sobrenome, idade, email, telefone, endereco, cidade, estado, data_nascimento
    });

    // Validação mais robusta: verificar se os campos estão preenchidos
    if (!id || nome === '' || sobrenome === '' || idade === '' || email === '' || telefone === '' || endereco === '' || cidade === '' || estado === '' || !data_nascimento) {
        document.getElementById('res-cadastrar-atualizar').innerHTML = `<span class="error">Preencha todos os campos! Campos ausentes: ${[
            !id && 'ID',
            nome === '' && 'Nome',
            sobrenome === '' && 'Sobrenome',
            idade === '' && 'Idade',
            email === '' && 'Email',
            telefone === '' && 'Telefone',
            endereco === '' && 'Endereço',
            cidade === '' && 'Cidade',
            estado === '' && 'Estado',
            !data_nascimento && 'Data de Nascimento'
        ].filter(Boolean).join(', ')}</span>`;
        return;
    }

    fetch(`http://localhost:3000/usuario/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nome, sobrenome, idade: parseInt(idade), email, telefone, endereco, cidade, estado, data_nascimento })
    })
        .then(response => {
            if (!response.ok) {
                return response.json().then(error => {
                    throw new Error(error.message || `Erro HTTP: ${response.status}`);
                });
            }
            return response.json();
        })
        .then(usuario => {
            document.getElementById('res-cadastrar-atualizar').innerHTML = 'Usuário atualizado!';
            limparFormularioAtualizar();
            mostrarUsuarios([usuario], 'tabela-atualizar', 'res-cadastrar-atualizar');
        })
        .catch(error => {
            console.error('Erro ao atualizar usuário:', error);
            document.getElementById('res-cadastrar-atualizar').innerHTML = `<span class="error">Erro ao atualizar usuário: ${error.message}</span>`;
        });
}

// Limpar formulário de atualização
function limparFormularioAtualizar() {
    document.getElementById('id-atualizar').value = '';
    document.getElementById('nome-atualizar').value = '';
    document.getElementById('sobrenome-atualizar').value = '';
    document.getElementById('idade-atualizar').value = '';
    document.getElementById('email-atualizar').value = '';
    document.getElementById('telefone-atualizar').value = '';
    document.getElementById('endereco-atualizar').value = '';
    document.getElementById('cidade-atualizar').value = '';
    document.getElementById('estado-atualizar').value = '';
    document.getElementById('data-nascimento-atualizar').value = '';
    document.getElementById('botao-cancelar').style.display = 'none';
    document.getElementById('res-cadastrar-atualizar').innerHTML = '';
    document.getElementById('tabela-atualizar').innerHTML = '';
}

// Apagar usuário
function apagarUsuario() {
    const id = document.getElementById('id-apagar').value.trim();
    if (!id) {
        document.getElementById('res-cadastrar-apagar').innerHTML = '<span class="error">Digite um ID para apagar!</span>';
        return;
    }

    console.log('Tentando apagar usuário com ID:', id);
    console.log('Enviando DELETE para:', `http://localhost:3000/usuario/${id}`);

    // Confirmar exclusão
    if (!confirm('Tem certeza que deseja apagar este usuário?')) {
        return;
    }

    fetch(`http://localhost:3000/usuario/${id}`, {
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
            return response.text(); // DELETE pode não retornar JSON
        })
        .then(text => {
            console.log('Resposta do corpo:', text || 'Nenhum conteúdo retornado');
            document.getElementById('res-cadastrar-apagar').innerHTML = 'Usuário apagado com sucesso!';
            document.getElementById('id-apagar').value = '';
            document.getElementById('tabela-apagar').innerHTML = '';
        })
        .catch(error => {
            console.error('Erro ao apagar usuário:', error);
            document.getElementById('res-cadastrar-apagar').innerHTML = `<span class="error">Erro ao apagar usuário: ${error.message}</span>`;
        });
}

// Buscar por nome
function buscarUsuariosPorNome() {
    const nome = document.getElementById('busca-nome').value.trim();
    if (!nome) {
        document.getElementById('res-cadastrar-nome').innerHTML = '<span class="error">Digite um nome para buscar!</span>';
        return;
    }
    fetch(`http://localhost:3000/usuario/nome/${nome}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(usuarios => {
            mostrarUsuarios(usuarios, 'tabela-nome', 'res-cadastrar-nome');
        })
        .catch(error => {
            console.error('Erro ao buscar por nome:', error);
            document.getElementById('res-cadastrar-nome').innerHTML = `<span class="error">Erro ao buscar usuários: ${error.message}</span>`;
        });
}

// Buscar por ID
function buscarUsuarioPorId() {
    const id = document.getElementById('busca-id').value.trim();
    if (!id) {
        document.getElementById('res-cadastrar-id').innerHTML = '<span class="error">Digite um ID para buscar!</span>';
        return;
    }
    fetch(`http://localhost:3000/usuario/id/${id}`)
        .then(response => {
            if (!response.ok) {
                throw new Error(`Usuário não encontrado: ${response.status}`);
            }
            return response.json();
        })
        .then(usuario => {
            mostrarUsuarios([usuario], 'tabela-id', 'res-cadastrar-id');
        })
        .catch(error => {
            console.error('Erro ao buscar por ID:', error);
            document.getElementById('res-cadastrar-id').innerHTML = `<span class="error">Erro ao buscar usuário: ${error.message}</span>`;
        });
}

// Listar todos os usuários
function listarUsuarios() {
    fetch('http://localhost:3000/usuario')
        .then(response => {
            if (!response.ok) {
                throw new Error(`Erro HTTP: ${response.status}`);
            }
            return response.json();
        })
        .then(usuarios => {
            mostrarUsuarios(usuarios, 'tabela-lista', 'res-cadastrar-lista');
        })
        .catch(error => {
            console.error('Erro ao listar usuários:', error);
            document.getElementById('res-cadastrar-lista').innerHTML = `<span class="error">Erro ao carregar usuários: ${error.message}</span>`;
        });
}

// Mostrar a seção "Criar" por padrão ao carregar a página
document.addEventListener('DOMContentLoaded', () => {
    showSection('criar');
});