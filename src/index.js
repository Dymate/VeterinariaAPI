import app from './app.js';
import { sequelize } from './database/database.js'

async function main() {
    const port = process.PORT ?? 3001
    try {
        await sequelize.sync({ force: true });
        console.log('Conexión con exito');
        app.listen(port)
        console.log('server listening on port', port)
    } catch (err) {
        console.error('No se pudo conectar: ', err);
    }
}

main();
