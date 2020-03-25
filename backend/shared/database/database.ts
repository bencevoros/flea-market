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
        const dbParams: object = {
            host: process.env.DB_HOST ?? 'localhost',
            port: process.env.DB_PORT ?? '3306',
            username: process.env.DB_USERNAME ?? 'root',
            password: process.env.DB_PASSWORD ?? '',
            database: process.env.DB_NAME ?? 'database',
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
