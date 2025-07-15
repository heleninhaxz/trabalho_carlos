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

function mostrarUsuarios() {
    fetch('http://localhost:3000/usuario')
        .then(res => res.json())
        .then(usuarios => {
            let html = '<table border="1">';
            html += '<tr><th>Nome Completo</th><th>Idade</th><th>Email</th><th>Cidade</th><th>Estado</th></tr>';
            
            usuarios.forEach(u => {
                const nomeCompleto = `${u.nome} ${u.sobrenome}`;
                html += `<tr>
                    <td>${nomeCompleto}</td>
                    <td>${u.idade}</td>
                    <td>${u.email}</td>
                    <td>${u.cidade}</td>
                    <td>${u.estado}</td>
                </tr>`;
            });

            html += '</table>';
            document.getElementById('tabela-usuario').innerHTML = html;
        })
        .catch(() => {
            document.getElementById('tabela-usuario').innerHTML = 'Erro ao carregar usuários.';
        });
}

function mostrarProdutos() {
    fetch('http://localhost:3000/produto')
        .then(res => res.json())
        .then(produtos => {
            let html = '<table border="1">';
            html += '<tr><th>Título</th><th>Categoria</th><th>Preço</th><th>% Desconto</th></tr>';
            
            produtos.forEach(p => {
                html += `<tr>
                    <td>${p.titulo}</td>
                    <td>${p.categoria}</td>
                    <td>R$ ${p.preco.toFixed(2)}</td>
                    <td>${p.percentual_desconto}%</td>
                </tr>`;
            });

            html += '</table>';
            document.getElementById('tabela-produto').innerHTML = html;
        })
        .catch(() => {
            document.getElementById('tabela-produto').innerHTML = 'Erro ao carregar produtos.';
        });
}

function mostrarCompras() {
    fetch('http://localhost:3000/compra')
        .then(res => res.json())
        .then(compras => {
            let html = '<table border="1">';
            html += '<tr><th>ID</th><th>ID Usuário</th><th>ID Produto</th><th>Quantidade</th><th>Data</th><th>Preço Final</th></tr>';
            
            compras.forEach(c => {
                html += `<tr>
                    <td>${c.id}</td>
                    <td>${c.usuario_id}</td>
                    <td>${c.produto_id}</td>
                    <td>${c.quantidade}</td>
                    <td>${formatarData(c.data_compra)}</td>
                    <td>R$ ${c.preco_final.toFixed(2)}</td>
                </tr>`;
            });

            html += '</table>';
            document.getElementById('tabela-compra').innerHTML = html;
        })
        .catch(() => {
            document.getElementById('tabela-compra').innerHTML = 'Erro ao carregar compras.';
        });
}

// Função para formatar a data em dd/mm/aaaa
function formatarData(dataISO) {
    const data = new Date(dataISO);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
}
