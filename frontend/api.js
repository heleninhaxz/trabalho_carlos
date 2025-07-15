const inserir = document.getElementById('inserir');

inserir.addEventListener('click', () => {
    prod()
    user()
});

async function prod() {
    try {
        const response = await fetch('https://dummyjson.com/products');
        const { products } = await response.json();

        for (const produto of products) {
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

            try {
                const res = await fetch('http://localhost:3000/produto', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dados)
                });

                const resposta = await res.json();
                console.log('Produto inserido:', resposta);
            } catch (erroInterno) {
                console.error('Erro ao enviar produto:', dados.titulo, erroInterno);
            }

            // Espera 300ms antes de continuar (ajustável)
            await new Promise(resolve => setTimeout(resolve, 300));
        }

        console.log('✅ Todos os produtos foram enviados com sucesso!');
    } catch (erro) {
        console.error('❌ Erro ao buscar produtos da API externa:', erro);
    }
}

async function user() {
    try {
        const response = await fetch('https://dummyjson.com/users');
        const { users } = await response.json();

        for (const usuario of users) {
            // Formata data para 'YYYY-MM-DD'
            const dataFormatada = new Date(usuario.birthDate).toISOString().split('T')[0];

            const dados = {
                nome: usuario.firstName,
                sobrenome: usuario.lastName,
                idade: usuario.age,
                email: usuario.email,
                telefone: usuario.phone,
                endereco: usuario.address.address, // sem acento!
                cidade: usuario.address.city,
                estado: usuario.address.state,
                data_nascimento: dataFormatada
            };

            try {
                const res = await fetch('http://localhost:3000/usuario', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(dados)
                });

                const resposta = await res.json();

                if (res.ok) {
                    console.log(`✅ Usuário inserido: ${dados.nome} ${dados.sobrenome}`);
                } else {
                    console.error(`❌ Falha ao inserir: ${dados.nome} ${dados.sobrenome}`);
                    if (resposta.err?.errors) {
                        resposta.err.errors.forEach(e => {
                            console.error(`   • Campo "${e.path}": ${e.message}`);
                        });
                    } else {
                        console.error('   • Erro desconhecido:', resposta);
                    }
                }
            } catch (erroInterno) {
                console.error(`❌ Erro ao enviar usuário: ${dados.nome} ${dados.sobrenome}`, erroInterno);
            }

            // Aguarda 500ms entre os envios
            await new Promise(resolve => setTimeout(resolve, 500));
        }

        console.log('🎉 Todos os usuários foram processados!');
    } catch (erro) {
        console.error('❌ Erro ao buscar usuários da API externa:', erro);
    }
}