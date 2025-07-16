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

// Funções JS para buscar dados e montar as tabelas (igual seu código original):

function mostrarUsuarios() {
    fetch('http://localhost:3000/usuario')
        .then(res => res.json())
        .then(usuarios => {
            let html = '<table>';
            html += '<thead><tr><th>Nome Completo</th><th>Idade</th><th>Email</th><th>Cidade</th><th>Estado</th></tr></thead><tbody>';

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

            html += '</tbody></table>';
            document.getElementById('tabela-usuario').innerHTML = html;
        })
        .catch(() => {
            document.getElementById('tabela-usuario').innerHTML = '<p class="res-cadastrar error">Erro ao carregar usuários.</p>';
        });
}

function mostrarProdutos() {
    fetch('http://localhost:3000/produto')
        .then(res => res.json())
        .then(produtos => {
            let html = '<table>';
            html += '<thead><tr><th>Título</th><th>Categoria</th><th>Preço</th><th>% Desconto</th></tr></thead><tbody>';

            produtos.forEach(p => {
                html += `<tr>
                            <td>${p.titulo}</td>
                            <td>${p.categoria}</td>
                            <td>R$ ${p.preco.toFixed(2)}</td>
                            <td>${p.percentual_desconto}%</td>
                        </tr>`;
            });

            html += '</tbody></table>';
            document.getElementById('tabela-produto').innerHTML = html;
        })
        .catch(() => {
            document.getElementById('tabela-produto').innerHTML = '<p class="res-cadastrar error">Erro ao carregar produtos.</p>';
        });
}

function mostrarCompras() {
    Promise.all([
        fetch('http://localhost:3000/compra').then(res => res.json()),
        fetch('http://localhost:3000/usuario').then(res => res.json()),
        fetch('http://localhost:3000/produto').then(res => res.json())
    ])
        .then(([compras, usuarios, produtos]) => {
            let html = '<table>';
            html += '<thead><tr><th>ID</th><th>Usuário</th><th>Produto</th><th>Quantidade</th><th>Data</th><th>Preço Final</th></tr></thead><tbody>';

            compras.forEach(c => {
                const usuario = usuarios.find(u => u.id === c.usuario_id);
                const produto = produtos.find(p => p.id === c.produto_id);

                const nomeUsuario = usuario ? `${usuario.nome} ${usuario.sobrenome}` : 'Desconhecido';
                const nomeProduto = produto ? produto.titulo : 'Desconhecido';

                html += `<tr>
                        <td>${c.id}</td>
                        <td>${nomeUsuario}</td>
                        <td>${nomeProduto}</td>
                        <td>${c.quantidade}</td>
                        <td>${formatarData(c.data_compra)}</td>
                        <td>R$ ${c.preco_final.toFixed(2)}</td>
                    </tr>`;
            });

            html += '</tbody></table>';
            document.getElementById('tabela-compra').innerHTML = html;
        })
        .catch(() => {
            document.getElementById('tabela-compra').innerHTML = '<p class="res-cadastrar error">Erro ao carregar compras.</p>';
        });
}

function formatarData(dataISO) {
    const data = new Date(dataISO);
    const dia = String(data.getDate()).padStart(2, '0');
    const mes = String(data.getMonth() + 1).padStart(2, '0');
    const ano = data.getFullYear();
    return `${dia}/${mes}/${ano}`;
}

function mostrarEstoqueCritico() {
    fetch('http://localhost:3000/produto')
        .then(res => res.json())
        .then(produtos => {
            const criticos = produtos.filter(p => p.estoque < 10);

            if (criticos.length === 0) {
                document.getElementById('tabela-estoque').innerHTML = '<p>Nenhum produto com estoque crítico.</p>';
                return;
            }

            let html = '<table>';
            html += '<thead><tr><th>Título</th><th>Estoque</th><th>Categoria</th></tr></thead><tbody>';

            criticos.forEach(p => {
                html += `<tr>
                            <td>${p.titulo}</td>
                            <td>${p.estoque}</td>
                            <td>${p.categoria}</td>
                        </tr>`;
            });

            html += '</tbody></table>';
            document.getElementById('tabela-estoque').innerHTML = html;
        })
        .catch(() => {
            document.getElementById('tabela-estoque').innerHTML = '<p class="res-cadastrar error">Erro ao carregar produtos.</p>';
        });
}

function mostrarRelatorioConsolidado() {
    Promise.all([
        fetch('http://localhost:3000/compra').then(res => res.json()),
        fetch('http://localhost:3000/usuario').then(res => res.json()),
        fetch('http://localhost:3000/produto').then(res => res.json())
    ])
        .then(([compras, usuarios, produtos]) => {
            let html = '<table>';
            html += `<thead><tr>
                        <th>Usuário</th>
                        <th>Produto</th>
                        <th>Quantidade</th>
                        <th>Data</th>
                        <th>Valor Final</th>
                        <th>Forma de Pagamento</th>
                        <th>Status</th>
                    </tr></thead><tbody>`;

            compras.forEach(c => {
                const usuario = usuarios.find(u => Number(u.id) === Number(c.usuario_id));
                const produto = produtos.find(p => Number(p.id) === Number(c.produto_id));

                const nomeUsuario = usuario ? `${usuario.nome} ${usuario.sobrenome}` : 'Desconhecido';
                const nomeProduto = produto ? produto.titulo : 'Desconhecido';

                html += `<tr>
                        <td>${nomeUsuario}</td>
                        <td>${nomeProduto}</td>
                        <td>${c.quantidade}</td>
                        <td>${formatarData(c.data_compra)}</td>
                        <td>R$ ${c.preco_final.toFixed(2)}</td>
                        <td>${c.forma_pagamento || '-'}</td>
                        <td>${c.status_compra || '-'}</td>
                    </tr>`;
            });

            html += '</tbody></table>';
            document.getElementById('tabela-consolidado').innerHTML = html;
        })
        .catch(() => {
            document.getElementById('tabela-consolidado').innerHTML = '<p class="res-cadastrar error">Erro ao carregar relatório.</p>';
        });
}