import { createConnection, Connection, Repository } from 'typeorm';

export default class Database {
    private connection: Connection;

    async connect(): Promise<Connection> {
        if (this.connection) {
            return this.connection;
        }

        this.connection = await this.createConnection();

        return this.connection;
    }

    private createConnection(): Promise<Connection> {
        return createConnection({
            type: 'mysql',
            host: 'localhost',
            port: 3306,
            username: 'root',
            password: 'mju76yhn',
            database: 'flea',
            entities: [
                __dirname + '/../../modules/**/*.entity.ts'
            ],
            synchronize: true,
        });
    }
}

export {
    Repository,
};
