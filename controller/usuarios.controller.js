const Usuario = require('../model/Usuarios')

const cadastrar = async (req, res) => {
    const dados = req.body

    try {
        const valores = await Usuario.create(dados)
        console.log('dados cadastrados com sucesso.');
        res.status(201).json(valores)
    } catch (err) {
        console.error('erro ao cadastrar os dados ', err);
        res.status(500).json({ message: 'erro ao cadastrar.', err })
    }
}

const listar = async (req, res) => {
    try {
        const valores = await Usuario.findAll()
        if (valores) {
            console.log('dados listados com sucesso.');
            res.status(200).json(valores)
        } else {
            console.log('dados não encontrados.');
            res.status(404).json({ message: 'dados não encontrados.' })
        }
    } catch (err) {
        console.error('erro ao listar os dados: ', err);
        res.status(500).json({ message: 'erro ao listar.', err })
    }
}

const buscarPorId = async (req, res) => {
    const id = req.params.id

    try {
        const valor = await Usuario.findByPk(id)
        if (valor) {
            console.log('dado encontrado com sucesso.')
            res.status(200).json(valor)
        } else {
            console.log('dado não encontrado.')
            res.status(404).json({ message: 'dado não encontrado.' })
        }
    } catch (err) {
        console.error('erro ao buscar o dado: ', err)
        res.status(500).json({ message: 'erro ao buscar.', err })
    }
}

const sequelize = require('sequelize')

const buscarPorNome = async (req, res) => {
    try {
        const nome = req.params.nome.toLowerCase(); // pega tudo e converte todos os caracteres de uma string para letras minúsculas

        const resultados = await Usuario.findAll({
            where: {
                nome: {
                    [sequelize.Op.like]: `%${nome}%`
                }
            }
        });

        if (resultados.length > 0) {
            console.log('usuários encontrados com sucesso.');
            res.status(200).json(resultados);
        } else {
            console.log('nenhum usuário encontrado com esse nome.');
            res.status(404).json({ message: 'dado não encontrado.' });
        }
    } catch (err) {
        console.error('erro ao buscar por nome: ', err);
        res.status(500).json({ message: 'erro ao buscar por nome.', err });
    }
};

const apagar = async (req, res) => {
    const id = req.params.id

    try {
        const buscar = await Usuario.findByPk(id)

        if (buscar) {
            await Usuario.destroy({ where: { id } })
            console.log('dado apagado com sucesso.')
            res.status(200).json({ message: 'dado apagado com sucesso.' })
        } else {
            console.log('dado não encontrado para apagar.')
            res.status(404).json({ message: 'dado não encontrado.' })
        }
    } catch (err) {
        console.error('erro ao apagar o dado: ', err)
        res.status(500).json({ message: 'erro ao apagar.', err })
    }
}


const atualizar = async (req, res) => {
    const id = req.params.id
    const dados = req.body
    try {
        const buscar = await Usuario.findByPk(id)
        
        if (buscar) {
            const atualizado = await Usuario.update(dados, { where: { id } })
            res.status(200).json(atualizado)
            console.log('dado atualizado com sucesso.')
        } else {
            console.log('dado não encontrado para atualizar.')
            res.status(404).json({ message: 'dado não encontrado.' })
        }
    } catch (err) {
        console.error('erro ao atualizar o dado: ', err)
        res.status(500).json({ message: 'erro ao atualizar.', err })
    }
}

module.exports = { cadastrar, listar, buscarPorId, buscarPorNome, apagar, atualizar }