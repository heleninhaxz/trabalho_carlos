const inserir = document.getElementById('inserir');
const status = document.getElementById('status');

inserir.addEventListener('click', () => {
    status.textContent = 'Enviando produtos...';
    prod();
});

function prod() {
    fetch('https://dummyjson.com/products')
        .then(res => res.json())
        .then(data => {
            const produtos = data.products;
            let enviados = 0;

            produtos.forEach(produto => {
                const dados = {
                    titulo: produto.title,
                    descricao: produto.description,
                    categoria: produto.category,
                    preco: produto.price,
                    percentual_desconto: produto.discountPercentage,
                    estoque: produto.stock,
                    marca: produto.brand || 'sem marca',
                    imagem: produto.thumbnail
                };

                fetch('http://localhost:3000/produto', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dados)
                })
                    .then(() => {
                        enviados++;
                        if (enviados === produtos.length) {
                            status.textContent = 'Produtos enviados. Enviando usuários...';
                            user();
                        }
                    })
                    .catch(err => {
                        console.error('Erro ao enviar produto:', dados.titulo, err);
                    });
            });
        })
        .catch(erro => {
            console.error('Erro ao buscar produtos:', erro);
        });
}

function user() {
    fetch('https://dummyjson.com/users')
        .then(res => res.json())
        .then(data => {
            const usuarios = data.users;
            let enviados = 0;

            usuarios.forEach(usuario => {
                const dataFormatada = new Date(usuario.birthDate).toISOString().split('T')[0];

                const dados = {
                    nome: usuario.firstName,
                    sobrenome: usuario.lastName,
                    idade: usuario.age,
                    email: usuario.email,
                    telefone: usuario.phone,
                    endereco: usuario.address.address,
                    cidade: usuario.address.city,
                    estado: usuario.address.state,
                    data_nascimento: dataFormatada
                };

                fetch('http://localhost:3000/usuario', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dados)
                })
                    .then(() => {
                        enviados++;
                        if (enviados === usuarios.length) {
                            status.textContent = 'Todos os dados foram enviados!';
                        }
                    })
                    .catch(err => {
                        console.error('Erro ao enviar usuário:', dados.nome, dados.sobrenome, err);
                    });
            });
        })
        .catch(erro => {
            console.error('Erro ao buscar usuários:', erro);
        });
}