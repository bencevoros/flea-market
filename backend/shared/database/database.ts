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
            host: process.env.DB_HOST ?? 'sql7.freemysqlhosting.net',
            port: process.env.DB_PORT ?? '3306',
            username: process.env.DB_USERNAME ?? 'sql7333495',
            password: process.env.DB_PASSWORD ?? '1h2yfAI91R',
            database: process.env.DB_NAME ?? 'sql7333495',
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
