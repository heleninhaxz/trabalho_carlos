const { DataTypes } = require('sequelize')
const db = require('../db/conn')

const Compra = db.define('compras', {
    id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true
    },
    usuario_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'usuarios',
            key: 'id'
        }
    },
    produto_id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        references: {
            model: 'produtos',
            key: 'id'
        }
    },
    quantidade: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    data_compra: {
        type: DataTypes.DATEONLY,
        allowNull: false
    },
    preco_unitario: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    desconto_aplicado: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    preco_final: {
        type: DataTypes.FLOAT,
        allowNull: false
    },
    forma_pagamento: {
        type: DataTypes.STRING,
        allowNull: false
    },
    status_compra: {
        type: DataTypes.STRING,
        allowNull: false
    }
}, {
    tableName: 'compras',
    timestamps: false
});

module.exports = Compra;