import { createConnection, Connection, Repository } from 'typeorm';

export default class Database {
    private connection: Connection;

    async connect(): Promise<Connection> {
        if (this.connection) {
            return this.connection;
        }

        this.connection = await this.createConnection();
        await this.connection.synchronize();

        return this.connection;
    }

    private createConnection(): Promise<Connection> {
        const dbParams: object = {
            host: process.env.DB_HOST ?? 'remotemysql.com',
            port: process.env.DB_PORT ?? '3306',
            username: process.env.DB_USERNAME ?? 'bMBKvDNiWG',
            password: process.env.DB_PASSWORD ?? '4hHrSSYv6n',
            database: process.env.DB_NAME ?? 'bMBKvDNiWG',
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
