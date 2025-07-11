const Usuario = require('./Usuarios')
const Produto = require('./Produtos')
const Compra = require('./Compras')

Usuario.hasMany(Compra, {
    foreignKey: 'usuario_id',
    as: 'compraUser',
    onDelete: 'CASCADE'
})

Compra.belongsTo(Usuario, {
    foreignKey: 'usuario_id',
    as: 'usuarioComp',
    allowNull: false
})

Produto.hasMany(Compra, {
    foreignKey: 'produto_id',
    as: 'compraProd',
    onDelete: 'CASCADE'
})

Compra.belongsTo(Produto, {
    foreignKey: 'produto_id',
    as: 'produtoComp',
    allowNull: false
})

module.exports = { Usuario, Produto, Compra }