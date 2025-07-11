const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Produto = db.define('produtos', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    titulo: {
        type: DataTypes.STRING,
        allowNull: false
    },
    descricao: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    categoria: {
        type: DataTypes.STRING,
        allowNull: false
    },
    preco: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    percentual_desconto: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    estoque: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    marca: {
        type: DataTypes.STRING,
        allowNull: false
    },
    imagem: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'produtos',
    timestamps: false
})

module.exports = Produto