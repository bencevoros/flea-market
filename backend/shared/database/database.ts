import { createConnection, Connection, Repository } from 'typeorm';

export default class Database {
    private connection: Connection;

    async connect(): Promise<Connection> {
        if (Database.prototype.connection) {
            return Database.prototype.connection;
        }

        Database.prototype.connection = await this.createConnection();
        await Database.prototype.connection.synchronize();

        return Database.prototype.connection;
    }

    private createConnection(): Promise<Connection> {
        const dbParams: object = {
            host: process.env.DB_HOST ?? "127.0.0.1",
            port: process.env.DB_PORT ?? '3306',
            username: process.env.DB_USERNAME ?? 'test',
            password: process.env.DB_PASSWORD ?? 'test',
            database: process.env.DB_NAME ?? 'test',
        };

        return createConnection({
            type: 'mysql',
            ...dbParams,
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
