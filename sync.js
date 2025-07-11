const db = require('./db/conn')
const { Usuario, Produto, Compra } = require('./model/rel')

async function syncDataBase() {
    try {
        await db.sync({ force: true })
        console.log('Tabelas criadas e banco de dados sincronizado!!!');
    } catch (err) {
        console.error('Não Foi possivel criar as tabelas e sincronizar: ', err);
    } finally {
        await db.close()
        console.log('Banco de Dados finalizado!!!!!');
    }
}

syncDataBase()