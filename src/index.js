import app from './app.js';
import {sequelize} from './database/database.js'

//import './models/User.js';
//import './models/Pet.js';

async function main() {
    try {
        await sequelize.sync( {force: false} );
        console.log('Conexión con exito');
        app.listen(3000)
        console.log('server listening on port 3000')
    }catch(err) {
        console.error('No se pudo conectar: ', err);
    }

}

main();



