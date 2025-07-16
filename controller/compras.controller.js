const Compra = require('../model/Compras')

const cadastrar = async (req, res) => {
    const dados = req.body

    try {
        const valores = await Compra.create(dados)
        console.log('dados cadastrados com sucesso.');
        res.status(201).json(valores)
    } catch (err) {
        console.error('erro ao cadastrar os dados ', err);
        res.status(500).json({ message: 'erro ao cadastrar.', err })
    }
}

const listar = async (req, res) => {
    try {
        const valores = await Compra.findAll()
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

const apagar = async (req, res) => {
    const id = req.params.id

    try {
        const buscar = await Compra.findByPk(id)

        if (buscar) {
            const deletado = await Compra.destroy({ where: { id } })
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
        const buscar = await Compra.findByPk(id)

        if (buscar) {
            const atualizado = await Compra.update(dados, { where: { id } })
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

module.exports = { cadastrar, listar, apagar, atualizar }