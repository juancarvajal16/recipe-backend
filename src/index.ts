import 'reflect-metadata'
import {startServer} from './app'
import { createConnection } from 'typeorm';

async function main() {

    createConnection().then(connection => {
        console.log('connected to database')
    }).catch(error => console.log(error));

    const app = await startServer();
    app.listen(3000);
    console.log('server on port', 3000)
}

main();