const Produto = require('../model/Produtos')

const cadastrar = async (req, res) => {
    const dados = req.body

    try {
        const valores = await Produto.create(dados)
        console.log('dados cadastrados com sucesso.');
        res.status(201).json(valores)
    } catch (err) {
        console.error('erro ao cadastrar os dados ', err);
        res.status(500).json({ message: 'erro ao cadastrar.', err })
    }
}

const listar = async (req, res) => {
    try {
        const valores = await Produto.findAll()
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
        const valor = await Produto.findByPk(id)
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

const { Op, fn, col, where } = require('sequelize');

const buscarPorTitulo = async (req, res) => {
    const titulo = req.params.titulo.toLowerCase();

    try {
        const resultados = await Produto.findAll({
            where: where(
                fn('LOWER', col('titulo')),
                {
                    [Op.like]: `%${titulo}%`
                }
            )
        });

        if (resultados.length > 0) {
            console.log('dados encontrados com sucesso.');
            res.status(200).json(resultados);
        } else {
            console.log('nenhum dado encontrado com esse titulo.');
            res.status(404).json({ message: 'nenhum dado encontrado.' });
        }
    } catch (err) {
        console.error('erro ao buscar por titulo: ', err.message || err);
        res.status(500).json({ message: 'erro ao buscar por titulo.', error: err.message || err });
    }
};

const apagar = async (req, res) => {
    const id = req.params.id

    try {
        const deletado = await Produto.destroy({ where: { id } })

        if (deletado) {
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
        const buscar = await Produto.findByPk(id)
        
        if (buscar) {
            const atualizado = await Produto.update(dados, { where: { id } })
            console.log('dado atualizado com sucesso.')
            res.status(200).json(atualizado)
        } else {
            console.log('dado não encontrado para atualizar.')
            res.status(404).json({ message: 'dado não encontrado.' })
        }
    } catch (err) {
        console.error('erro ao atualizar o dado: ', err)
        res.status(500).json({ message: 'erro ao atualizar.', err })
    }
}

module.exports = { cadastrar, listar, buscarPorId, buscarPorTitulo, apagar, atualizar }